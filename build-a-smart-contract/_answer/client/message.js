import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  TransactionInstruction
} from '@solana/web3.js';
import { readFile } from 'fs/promises';
import * as borsh from 'borsh';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export async function establishPayer() {
  const secretKeyString = await readFile('wallet.json', 'utf8');
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  return Keypair.fromSecretKey(secretKey);
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/message-keypair.json',
    'utf8'
  );
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  const keypair = Keypair.fromSecretKey(secretKey);
  return keypair.publicKey;
}

export async function getAccountPubkey(payer, programId) {
  return await PublicKey.createWithSeed(
    payer.publicKey,
    'seed-string',
    programId
  );
}

export async function checkProgram(
  connection,
  payer,
  programId,
  accountPubkey
) {
  const programAccountInfo = await connection.getAccountInfo(programId);
  if (programAccountInfo === null) {
    throw new Error('Program account info not found');
  }
  if (!programAccountInfo.executable) {
    throw new Error('Program account is not executable');
  }
  const dataAccountInfo = await connection.getAccountInfo(accountPubkey);
  if (dataAccountInfo === null) {
    await createAccount(connection, payer, programId, accountPubkey);
  }
}

class MessageAccount {
  constructor(fields) {
    this.message = fields?.message || ' '.repeat(280);
  }
}

const MessageSchema = new Map([
  [MessageAccount, { kind: 'struct', fields: [['message', 'string']] }]
]);

const ACCOUNT_SIZE = borsh.serialize(
  MessageSchema,
  new MessageAccount()
).length;

export async function createAccount(
  connection,
  payer,
  programId,
  accountPubkey
) {
  const lamports = await connection.getMinimumBalanceForRentExemption(
    ACCOUNT_SIZE
  );
  const transaction = new Transaction();
  const instruction = {
    basePubkey: payer.publicKey,
    fromPubkey: payer.publicKey,
    lamports,
    newAccountPubkey: accountPubkey,
    programId,
    seed: 'seed-string',
    space: ACCOUNT_SIZE
  };
  const tx = SystemProgram.createAccountWithSeed(instruction);
  transaction.add(tx);

  await sendAndConfirmTransaction(connection, transaction, [payer]);
}

export async function setMessage(
  connection,
  payer,
  programId,
  accountPubkey,
  message
) {
  const transaction = {
    keys: [{ pubkey: accountPubkey, isSigner: false, isWritable: true }],
    programId,
    data: Buffer.from(message)
  };
  const instruction = new TransactionInstruction(transaction);
  await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [payer]
  );
}

export async function getMessage(connection, accountPubkey) {
  const accountInfo = await connection.getAccountInfo(accountPubkey);
  const message = borsh.deserialize(
    MessageSchema,
    MessageAccount,
    accountInfo.data
  );
  return message.message;
}
