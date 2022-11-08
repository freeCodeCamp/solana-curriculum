import {
  checkProgram,
  establishConnection,
  establishPayer,
  getAccountPubkey,
  getMessage,
  getProgramId,
  setMessage
} from './message.js';

const MESSAGE = process.argv[2];

if (MESSAGE) {
  await main();
} else {
  console.warn('Expected a message to send as an argument');
  throw new Error('No message provided');
}

async function main() {
  console.log(`Setting message: ${MESSAGE}`);
  const connection = establishConnection();
  const programId = await getProgramId();
  const payer = await establishPayer();
  const accountPubkey = await getAccountPubkey(payer, programId);
  await checkProgram(connection, payer, programId, accountPubkey);
  await setMessage(connection, payer, programId, accountPubkey, MESSAGE);
  const message = await getMessage(connection, accountPubkey);
  console.log(`Message: ${message}`);
}
