import {
  Keypair,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  SystemProgram,
  TransactionInstruction,
  Transaction,
  sendAndConfirmTransaction
} from '@solana/web3.js';
import { existsSync } from 'fs';
import { resolve, join } from 'path';
import * as borsh from 'borsh';

import { getPayer, getRpcUrl, createKeypairFromFile } from './utils';

const GREETING_SEED = 'hello';

/**
 * Path to program files
 */
const PROGRAM_PATH = resolve(__dirname, '../../dist/program');

/**
 * Path to program shared object file which should be deployed on chain.
 * This file is created when running either:
 *   - `npm run build:program-c`
 *   - `npm run build:program-rust`
 */
const PROGRAM_SO_PATH = join(PROGRAM_PATH, 'helloworld.so');

/**
 * Path to the keypair of the deployed program.
 * This file is created when running `solana program deploy dist/program/helloworld.so`
 */
const PROGRAM_KEYPAIR_PATH = join(PROGRAM_PATH, 'helloworld-keypair.json');

/**
 * The state of an account managed by the hello world program
 */
class HelloWorldAccount {
  counter = 0;
  constructor(fields: { counter: number } | undefined = undefined) {
    if (fields) {
      this.counter = fields.counter;
    }
  }
}

/**
 * Borsh schema definition for hello world accounts
 */
const HelloWorldSchema = new Map([
  [HelloWorldAccount, { kind: 'struct', fields: [['counter', 'u32']] }]
]);

/**
 * The expected size of each hello world account.
 */
const ACCOUNT_SIZE = borsh.serialize(
  HelloWorldSchema,
  new HelloWorldAccount()
).length;

/**
 * Establish a connection to the cluster
 */
export async function establishConnection(): Promise<Connection> {
  const rpcUrl = await getRpcUrl();
  const connection = new Connection(rpcUrl, 'confirmed');
  const version = await connection.getVersion();
  console.log('Connection to cluster established:', rpcUrl, version);
  return connection;
}

/**
 * Establish an account to pay for everything
 */
export async function establishPayer(connection: Connection): Promise<Keypair> {
  const payer = await getPayer();

  let lamports = await connection.getBalance(payer.publicKey);

  console.log(
    `Using account ${payer.publicKey.toBase58()} containing ${
      lamports / LAMPORTS_PER_SOL
    } SOL to pay for fees.`
  );
  return payer;
}

export async function getProgramId(): Promise<PublicKey> {
  try {
    const programKeypair = await createKeypairFromFile(PROGRAM_KEYPAIR_PATH);
    return programKeypair.publicKey;
  } catch (err) {
    const errMsg = (err as Error).message;
    throw new Error(
      `Failed to read program keypair at '${PROGRAM_KEYPAIR_PATH}' due to error: ${errMsg}. Program may need to be deployed with \`solana program deploy dist/program/helloworld.so\``
    );
  }
}

export async function getAccountPubkey(
  payer: Keypair,
  programId: PublicKey
): Promise<PublicKey> {
  // Derive the address (public key) of a hello world account from the program so that it's easy to find later.
  return await PublicKey.createWithSeed(
    payer.publicKey,
    GREETING_SEED,
    programId
  );
}

/**
 * Check if the hello world BPF program has been deployed
 */
export async function checkProgram(
  connection: Connection,
  payer: Keypair,
  programId: PublicKey,
  accountPubkey: PublicKey
): Promise<void> {
  // Check if the program has been deployed
  const programInfo = await connection.getAccountInfo(programId);
  if (programInfo === null) {
    if (existsSync(PROGRAM_SO_PATH)) {
      throw new Error(
        'Program needs to be deployed with `solana program deploy dist/program/helloworld.so`'
      );
    } else {
      throw new Error('Program needs to be built and deployed');
    }
  } else if (!programInfo.executable) {
    throw new Error(`Program is not executable`);
  }
  console.log(`Using program ${programId.toBase58()}`);

  // Check if the hello world account has already been created
  const greetedAccount = await connection.getAccountInfo(accountPubkey);
  if (greetedAccount === null) {
    await createAccount(connection, payer, programId, accountPubkey);
  }
}

export async function createAccount(
  connection: Connection,
  payer: Keypair,
  programId: PublicKey,
  accountPubkey: PublicKey
): Promise<void> {
  console.log(
    `Creating account ${accountPubkey.toBase58()} to say hello to...`
  );
  const lamports = await connection.getMinimumBalanceForRentExemption(
    ACCOUNT_SIZE
  );

  const transaction = new Transaction().add(
    SystemProgram.createAccountWithSeed({
      fromPubkey: payer.publicKey,
      basePubkey: payer.publicKey,
      seed: GREETING_SEED,
      newAccountPubkey: accountPubkey,
      lamports,
      space: ACCOUNT_SIZE,
      programId
    })
  );
  await sendAndConfirmTransaction(connection, transaction, [payer]);
}

/**
 * Say hello
 */
export async function sayHello(
  connection: Connection,
  payer: Keypair,
  programId: PublicKey,
  accountPubkey: PublicKey
): Promise<void> {
  console.log(`Saying hello to: ${accountPubkey.toBase58()}`);
  const instruction = new TransactionInstruction({
    keys: [{ pubkey: accountPubkey, isSigner: false, isWritable: true }],
    programId,
    data: Buffer.alloc(0) // All instructions are hellos
  });
  await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [payer]
  );
}

/**
 * Report the number of times the hello world account has been said hello to
 */
export async function reportGreetings(
  connection: Connection,
  accountPubkey: PublicKey
): Promise<void> {
  const accountInfo = await connection.getAccountInfo(accountPubkey);
  if (accountInfo === null) {
    throw 'Error: cannot find the hello world account';
  }
  const greeting = borsh.deserialize(
    HelloWorldSchema,
    HelloWorldAccount,
    accountInfo.data
  );
  console.log(
    `${accountPubkey.toBase58()} has been said "hello" to ${
      greeting.counter
    } time(s)`
  );
}
