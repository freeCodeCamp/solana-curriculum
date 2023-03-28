import __helpers from '../node_modules/@freecodecamp/freecodecamp-os/.freeCodeCamp/tooling/test-utils.js';
import { logover } from '../node_modules/@freecodecamp/freecodecamp-os/.freeCodeCamp/tooling/logger.js';
import { ROOT } from '../node_modules/@freecodecamp/freecodecamp-os/.freeCodeCamp/tooling/env.js';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { Babeliser as B } from 'babeliser';
import * as web3 from '@solana/web3.js';
import * as borsh from 'borsh';

export async function rustTest(path, filePath, test, cb) {
  const PATH_TO_FILE = join(ROOT, filePath);
  const T_ATTR = '#[test]';
  const testString = `${T_ATTR}\n${test}`;

  const fileContents = await __helpers.getFile(filePath);

  const fileWithTest = fileContents + '\n\n\n' + testString;

  let std;

  try {
    writeFileSync(PATH_TO_FILE, fileWithTest, 'utf-8');

    std = await __helpers.getCommandOutput('cargo test --lib', path);
  } catch (e) {
    logover.debug(e);
  } finally {
    const ensureFileContents = fileContents.replace(testString, '');
    writeFileSync(PATH_TO_FILE, ensureFileContents, 'utf-8');
    await cb(std.stdout, std.stderr);
  }
}

export const Babeliser = B;

// Test wallet: 8rK533RnqBtNPxwCHsPLZe8H89DwZxo3MhhEo4pKCfAw
// Program ID: FxcSjVwaWZPkNndA6RS9yZTjomF69AS1JZs6kvuEEp8v
// ProgramData Address: 34QiTA3zqEQ72mfmtANBu5M4zguBs9Xa4QCCyXcZQKnG
// Program Data Account: 3nyLatY115wbvw1FfafD3Q7Djuz2J2iY6Md6VNsBMFYp
export async function getCamperKeypair() {
  const secretKeyString = await __helpers.getFile(join(__loc, 'wallet.json'));
  const secretKey = JSON.parse(secretKeyString);
  const int8secretKey = new Uint8Array(secretKey);
  return web3.Keypair.fromSecretKey(int8secretKey);
}

export async function getSOFile() {
  const dir = await __helpers.getDirectory(join(__loc, 'dist', 'program'));
  for (const file of dir) {
    if (file.endsWith('.so')) {
      return file;
    }
  }
}
export async function getProgramJSONFile() {
  const dir = await __helpers.getDirectory(join(__loc, 'dist', 'program'));
  for (const file of dir) {
    if (file.endsWith('.json')) {
      return file;
    }
  }
}
export async function getProgramKeypair() {
  const jsonFile = await getProgramJSONFile();
  const json = await __helpers.getFile(
    join(__loc, 'dist', 'program', jsonFile)
  );
  const keypair = JSON.parse(json);
  const int8keypair = new Uint8Array(keypair);
  return web3.Keypair.fromSecretKey(int8keypair);
}
export async function getDataAccountPublicKey() {
  const keypair = await getCamperKeypair();
  const programKeypair = await getProgramKeypair();
  const programId = programKeypair.publicKey;
  const dataAccount = await web3.PublicKey.createWithSeed(
    keypair.publicKey,
    'fcc-seed',
    programId
  );
  return dataAccount;
}
export function establishConnection() {
  return new web3.Connection('http://localhost:8899');
}

class MessageAccount {
  constructor(fields) {
    this.message = fields?.message || ' '.repeat(280);
  }
}

const MessageSchema = new Map([
  [MessageAccount, { kind: 'struct', fields: [['message', 'string']] }]
]);

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
  const instruction = new web3.TransactionInstruction(transaction);
  await web3.sendAndConfirmTransaction(
    connection,
    new web3.Transaction().add(instruction),
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
