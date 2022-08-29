import {
  establishConnection,
  establishPayer,
  checkProgram,
  sayHello,
  reportGreetings,
  getProgramId,
  getAccountPubkey
} from './hello_world';

async function main() {
  console.log("Let's say hello to a Solana account...");

  // Establish connection to the cluster
  const connection = await establishConnection();

  // Get the program ID of the hello world program
  const programId = await getProgramId();

  // Determine who pays for the fees
  const payer = await establishPayer(connection, programId);

  const accountPubkey = await getAccountPubkey(payer, programId);

  // Check if the program has been deployed
  await checkProgram(connection, payer, programId, accountPubkey);

  // Say hello to an account
  await sayHello(connection, payer, programId, accountPubkey);

  // Find out how many times that account has been greeted
  await reportGreetings(connection, accountPubkey);

  console.log('Success');
}

main().then(
  () => process.exit(),
  err => {
    console.error(err);
    process.exit(-1);
  }
);
