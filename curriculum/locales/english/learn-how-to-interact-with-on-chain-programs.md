# Solana - Learn How to Interact with On-Chain Programs

## 1

### --description--

Previously, you developed a smart contract that kept count of the number of times it was invoked.

Now, you will develop a client to call your smart contract.

Start by building your smart contract with:

```bash
npm run build
```

### --tests--

You should run `npm run build` in `learn-how-to-interact-with-on-chain-programs`.

```js

```

## 2

### --description--

Within the `src` directory, create a directory named `client` to hold your code.

### --tests--

You should have a `src/client` directory.

```js

```

### --seed--

#### --cmd--

```bash
npm run build
```

## 3

### --description--

Within the `src/client` directory, create a file named `main.js` which will be the entrypoint of your program.

### --tests--

You should have a `src/client/main.js` file.

```js

```

### --seed--

#### --cmd--

```bash
mkdir src/client
```

## 4

### --description--

Within `src/client/main.js`, create an asynchronous function named `main`.

### --tests--

You should have an asynchronous function with the handle `main`.

```js

```

### --seed--

#### --cmd--

```bash
touch src/client/main.js
```

## 5

### --description--

Call your `main` function, awaiting the process before exiting.

### --tests--

You should call `main` with `await`.

```js

```

### --seed--

#### --"src/client/main.js"--

```js
async function main() {}
```

## 6

### --description--

Within the `main` function, log to the console the string `Saying 'hello' to a Solana account`.

### --tests--

You should have `console.log("Saying 'hello' to a Solana account")`.

```js

```

### --seed--

#### --"src/client/main.js"--

```js
async function main() {}

await main();
```

## 7

### --description--

Alongside the entrypoint for this program, you will need a module to hold all the methods needed to interact with your smart contract.

Within the `src/client` directory, create a file named `hello-world.js`.

### --tests--

You should have a `src/client/hello-world.js` file.

```js

```

### --seed--

#### --"src/client/main.js"--

```js
async function main() {
  console.log("Saying 'hello' to a Solana account");
}

await main();
```

## 8

### --description--

Within `hello-world.js`, export an asynchronous function named `establishConnection`.

### --tests--

You should define a function named `establishConnection` in `src/client/hello-world.js`.

```js

```

You should define `establishConnection` as being asynchronous.

```js

```

You should export `establishConnection` as a named export.

```js

```

### --seed--

#### --cmd--

```bash
touch src/client/hello-world.js
```

## 9

### --description--

The `web3.js` module from Solana provides all the functionality you will need to interact with the Solana blockchain.

Install the `@solana/web3.js` module.

### --tests--

You should have `@solana/web3.js` in your `package.json` dependencies field.

```js

```

You should install at least version `1.63`.

```js

```

### --seed--

#### --"src/client/hello-world.js"--

```js
export async function establishConnection() {}
```

## 10

### --description--

Within `establishConnection`, connect to your local cluster, using the `Connection` class from the `@solana/web3.js` module.

Return this new connection from `establishConnection`.

### --tests--

You should import `Connection` from `@solana/web3.js`.

```js

```

You should create a new connection with `new Connection('http://localhost:8899')`.

```js

```

Your `establishConnection` function should return the new connection.

```js

```

### --seed--

#### --cmd--

```bash
npm install @solana/web3.js
```

## 11

### --description--

Within the `main` function in `main.js`, make a call to `establishConnection`, and store the value in a variable named `connection`.

### --tests--

You should have `const connection = await establishConnection()` in `main.js.

```js

```

### --seed--

#### --"src/client/hello-world.js"--

```js
import { Connection } from '@solana/web3.js';

export async function establishConnection() {
  return new Connection('http://localhost:8899');
}
```

## 12

### --description--

Creating transactions takes compute power. So, an account has to pay for any transaction made.

Within `hello-world.js`, export an asynchronous function named `establishPayer`.

### --tests--

You should define a function with the handle `establishPayer`.

```js

```

You should define `establishPayer` as being asynchronous.

```js

```

You should export `establishPayer` as a named export.

```js

```

### --seed--

#### --"src/client/main.js"--

```js
async function main() {
  console.log("Saying 'hello' to a Solana account");
  const connection = await establishConnection();
}

await main();
```

## 13

### --description--

Within `establishPayer`, generate a new keypair, using the `Keypair` class from `@solana/web3.js`.

Return this keypair.

### --tests--

You should return the result of `Keypair.generate()`.

```js

```

### --seed--

#### --"src/client/hello-world.js"--

```js
import { Connection } from '@solana/web3.js';

export async function establishConnection() {
  return new Connection('http://localhost:8899');
}

export async function establishPayer() {}
```

## 14

### --description--

Interacting with an on-chain program requires its program id.

Within `hello-world.js`, export an asynchronous function with the handle `getProgramId`.

### --tests--

You should define a function with the handle `getProgramId`.

```js

```

You should define `getProgramId` as asynchronous.

```js

```

You should export `getProgramId` as a named export.

```js

```

### --seed--

#### --"src/client/hello-world.js"--

```js
import { Connection, Keypair } from '@solana/web3.js';

export async function establishConnection() {
  return new Connection('http://localhost:8899');
}

export async function establishPayer() {
  return Keypair.generate();
}
```

## 15

### --description--

The program id is its public key.

Within `getProgramId`, use the `createKeypairFromFile` function from `@solana/web3.js` to get the program keypair, passing in the path to the `dist/program/helloworld-keypair.json` file as an argument.

Then, return the public key.

### --tests--

You should import `createKeypairFromFile` from `@solana/web3.js`.

```js

```

You should return the `publicKey` property of the keypair.

```js

```

### --seed--

#### --"src/client/hello-world.js"--

```js
import { Connection, Keypair } from '@solana/web3.js';

export async function establishConnection() {
  return new Connection('http://localhost:8899');
}

export async function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {}
```

## 16

### --description--

In Solana, program accounts (smart contracts) are stateless. As such, separate accounts (data accounts) need to be created to persist data.

Within `hello-world.js`, export an asynchronous function with the handle `getAccountPubkey`. This function should expect two arguments: `payer` and `programId`.

### --tests--

You should define a function with the handle `getAccountPubkey`.

```js

```

You should define `getAccountPubkey` as asynchronous.

```js

```

You should define `getAccountPubkey` with a first parameter `payer`.

```js

```

You should define `getAccountPubkey` with a second parameter `programId`.

```js

```

You should export `getAccountPubkey` as a named export.

```js

```

### --seed--

#### --"src/client/hello-world.js"--

```js
import { Connection, Keypair, createKeypairFromFile } from '@solana/web3.js';

export async function establishConnection() {
  return new Connection('http://localhost:8899');
}

export async function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  return createKeypairFromFile(
    path.join(__dirname, '../../dist/program/helloworld-keypair.json')
  ).publicKey;
}
```

## 17

### --description--

Within `getAccountPubkey`, use the `createWithSeed` function on the `PublicKey` class from `@solana/web3.js` to create a public key, passing in the following arguments:

1. `payer.publicKey`
2. Any string of your choosing which will act as the seed
3. `programId`

Then, return the awaited result.

### --tests--

You should import `PublicKey` from `@solana/web3.js`.

```js

```

You should call `PublicKey.createWithSeed` within `getAccountPubkey`.

```js

```

You should pass `payer.publicKey` as the first argument to `createWithSeed`.

```js

```

You should pass a string as the second argument to `createWithSeed`.

```js

```

You should pass `programId` as the third argument to `createWithSeed`.

```js

```

You should return the result of `await PublicKey.createWithSeed`.

```js

```

### --seed--

#### --"src/client/hello-world.js"--

```js
import { Connection, Keypair, createKeypairFromFile } from '@solana/web3.js';

export async function establishConnection() {
  return new Connection('http://localhost:8899');
}

export async function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  return createKeypairFromFile(
    path.join(__dirname, '../../dist/program/helloworld-keypair.json')
  ).publicKey;
}

export async function getAccountPubkey(payer, programId) {}
```

## 18

### --description--

Creating a transaction interacting with a non-existent account still costs _lamports_ (one lamport is the minimum token value divisible). So, it is best to double-check the program account exists.

Within `hello-world.js`, define and export a function with the following signature:

```typescript
function checkProgram(
  connection: Connection,
  payer: Keypair,
  programId: PublicKey,
  accountPubkey: PublicKey
): Promise<void>;
```

### --tests--

You should define a function with the handle `checkProgram`.

```js

```

You should define `checkProgram` with a first parameter named `connection`.

```js

```

You should define `checkProgram` with a second parameter named `payer`.

```js

```

You should define `checkProgram` with a third parameter named `programId`.

```js

```

You should define `checkProgram` with a fourth parameter named `accountPubkey`.

```js

```

You should define `checkProgram` to be a named export.

```js

```

You should define `checkProgram` to be asynchronous.

```js

```

### --seed--

#### --"src/client/hello-world.js"--

```js
import {
  Connection,
  Keypair,
  createKeypairFromFile,
  PublicKey
} from '@solana/web3.js';

export async function establishConnection() {
  return new Connection('http://localhost:8899');
}

export async function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  return createKeypairFromFile(
    path.join(__dirname, '../../dist/program/helloworld-keypair.json')
  ).publicKey;
}

export async function getAccountPubkey(payer, programId) {
  return PublicKey.createWithSeed(payer.publicKey, 'hello-world', programId);
}
```

## 19

### --description--

Within, `checkProgram`, use the `getAccountInfo` method on `connection` to get the **program account** information _if any exists_. The `getAccountInfo` method expects a `PublicKey` as an argument.

If the result is equal to `null`, throw an `Error` with a string message.

### --tests--

`checkProgram` should throw an `Error` instance, if `await connection.getAccountInfo(programId)` returns `null`.

```js

```

### --seed--

#### --"src/client/hello-world.js"--

```js
import {
  Connection,
  Keypair,
  createKeypairFromFile,
  PublicKey
} from '@solana/web3.js';

export async function establishConnection() {
  return new Connection('http://localhost:8899');
}

export async function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  return createKeypairFromFile(
    path.join(__dirname, '../../dist/program/helloworld-keypair.json')
  ).publicKey;
}

export async function getAccountPubkey(payer, programId) {
  return PublicKey.createWithSeed(payer.publicKey, 'hello-world', programId);
}

export async function checkProgram(
  connection,
  payer,
  programId,
  accountPubkey
) {}
```

## 20

### --description--

Within `checkProgram`, make use of the `executable` property of the `AccountInfo` result to throw an `Error` if the program account is not executable.

### --tests--

`checkProgram` should throw an `Error` instance, if the program account `executable` property equals `false`.

```js

```

### --seed--

#### --"src/client/hello-world.js"--

```js
import {
  Connection,
  Keypair,
  createKeypairFromFile,
  PublicKey
} from '@solana/web3.js';

export async function establishConnection() {
  return new Connection('http://localhost:8899');
}

export async function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  return createKeypairFromFile(
    path.join(__dirname, '../../dist/program/helloworld-keypair.json')
  ).publicKey;
}

export async function getAccountPubkey(payer, programId) {
  return PublicKey.createWithSeed(payer.publicKey, 'hello-world', programId);
}

export async function checkProgram(
  connection,
  payer,
  programId,
  accountPubkey
) {
  const programInfo = await connection.getAccountInfo(programId);
  if (programInfo === null) {
    throw new Error('Program account does not exist');
  }
}
```

## 21

### --description--

If this is the first time the program account is being invoked, it will not own a _data account_ to store any state.

Within `checkProgram`, get the account info of the program **data** account, _if any exists_. If the result is equal to `null`, throw an `Error` with a string message.

### --tests--

`checkProgram` should throw an `Error` instance, if the program **data account** does not exist.

```js

```

### --seed--

#### --"src/client/hello-world.js"--

```js
import {
  Connection,
  Keypair,
  createKeypairFromFile,
  PublicKey
} from '@solana/web3.js';

export async function establishConnection() {
  return new Connection('http://localhost:8899');
}

export async function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  return createKeypairFromFile(
    path.join(__dirname, '../../dist/program/helloworld-keypair.json')
  ).publicKey;
}

export async function getAccountPubkey(payer, programId) {
  return PublicKey.createWithSeed(payer.publicKey, 'hello-world', programId);
}

export async function checkProgram(
  connection,
  payer,
  programId,
  accountPubkey
) {
  const programInfo = await connection.getAccountInfo(programId);
  if (programInfo === null) {
    throw new Error('Program account does not exist');
  }
  if (!programInfo.executable) {
    throw new Error('Program account is not executable');
  }
}
```

## 22

### --description--

Instead of throwing when a program data account is not found, you can create the account.

Within `hello-world.js`, define and export a function with the following signature:

```javascript
function createAccount(connection: Connection, payer: Keypair, programId: PublicKey, accountPubkey: PublicKey): Promise<void>
```

### --tests--

You should define a function with the handle `createAccount`.

```js

```

You should define `createAccount` with a first parameter named `connection`.

```js

```

You should define `createAccount` with a second parameter named `payer`.

```js

```

You should define `createAccount` with a third parameter named `programId`.

```js

```

You should define `createAccount` with a fourth parameter named `accountPubkey`.

```js

```

You should define `createAccount` to be a named export.

```js

```

You should define `createAccount` to be asynchronous.

```js

```

## 23

### --description--

Storing data on accounts costs a _rent_ fee. This fee is paid in _lamports_ and is calculated based on the size of the account. The `getMinimumBalanceForRentExemption` method on the `Connection` class can be used to calculate the rent fee payable to prevent an account from being purged.

Within `createAccount`, use the `getMinimumBalanceForRentExemption` method on `connection` to get the minimum balance required to create an account with a size of `10000` bytes. Store this in a variable named `lamports`.

### --tests--

You should call `connection.getMinimumBalanceForRentExemption` within `createAccount`.

```js

```

You should pass `10000` as the first argument to `getMinimumBalanceForRentExemption`.

```js

```

You should await the result of `getMinimumBalanceForRentExemption`.

```js

```

You should assign the value to a variable named `lamports`.

```js

```

## 24

### --description--

You can estimate the cost of creating a program data account of size `10000` bytes by using the following CLI command:

```bash
solana rent 10000
```

### --tests--

You should run `solana rent 10000` in the terminal.

```js

```

## 25

### --description--

Randomly guessing the size of your account might not always be best.

Within `hello-world.js`, define an `ACCOUNT_SIZE` constant, and set its value to:

```javascript
borsh.serialize(HelloWorldSchema, new HelloWorldAccount()).length;
```

### --tests--

You should define a constant named `ACCOUNT_SIZE` in the `hello-world.js` file.

```js

```

You should set the value of `ACCOUNT_SIZE` to `borsh.serialize(HelloWorldSchema, new HelloWorldAccount()).length`.

```js

```

## 26

### --description--

Define a class named `HelloWorldAccount` whose constructor takes a single parameter named `fields`.

Then, assign the value of `fields.counter` to a property named `counter` on the instance.

### --tests--

You should define a class named `HelloWorldAccount`.

```js

```

You should define a constructor for `HelloWorldAccount` with a single parameter named `fields`.

```js

```

You should assign the value of `fields.counter` to `this.counter`.

```js

```

## 27

### --description--

Define a variable named `HelloWorldSchema` and set its value to:

```javascript
new Map([
  [HelloWorldAccount, { kind: 'struct', fields: [['counter', 'u32']] }]
]);
```

This is a _schema_ that matches the definition of the `GreetingAccount` struct in `src/program-rust/src/lib.rs`.

### --tests--

You should define a variable named `HelloWorldSchema`.

```js

```

You should set the value of `HelloWorldSchema` to the given schema.

```js

```

## 28

### --description--

Within `createAccount`, replace the hard-coded value of `10000` with the `ACCOUNT_SIZE` constant.

### --tests--

You should replace the hard-coded value of `10000` with the `ACCOUNT_SIZE` constant.

```js

```

## 29

### --description--

In order to create the program data account, you need to define a `Transaction` that will be signed by the `payer` and sent to the network.

Within `createAccount`, create a new `Transaction` instance and store it in a variable named `transaction`.

### --tests--

You should create a new `Transaction` instance within `createAccount`.

```js

```

You should store the result in a variable named `transaction`.

```js

```

## 30

### --description--

Within `createAccount`, create a new variable named `instruction`, and set its value to:

```javascript
{
  basePubkey: payer.publicKey,
  fromPubkey: payer.publicKey,
  lamports,
  newAccountPubkey: accountPubkey,
  programId,
  seed: <SAME_SEED_USED_IN_GET_ACCOUNT_PUBKEY_FUNCTION>,
  space: ACCOUNT_SIZE,
}
```

### --tests--

You should create a new variable named `instruction` within `createAccount`.

```js

```

You should set the value of `instruction` to the given object.

```js

```

You should use the same seed you used in the `getAccountPubkey` function.

```js

```

## 31

### --description--

Within `createAccount`, use the `add` method on `transaction` to add an instruction to create the program data account.

This instruction should be created using the `createAccountWithSeed` function on the `SystemProgram` class from `@solana/web3.js`.

### --tests--

You should call `transaction.add` within `createAccount`.

```js

```

You should call `SystemProgram.createAccountWithSeed` within `transaction.add`.

```js

```

## 32

### --description--

Within `createAccount`, pass `transaction` as the argument to the `createAccountWithSeed` call.

### --tests--

You should have `SystemProgram.createAccountWithSeed(transaction)` within `transaction.add`.

```js

```

## 33

### --description--

You have created a transaction, but need to send it to the network.

Await the `sendAndConfirmTransaction` function from `@solana/web3.js` to send the transaction to the network. This function expects at least three arguments:

- `connection`
- `transaction`
- An array of _signers_ (use the `payer` as the only signer)

### --tests--

You should call `sendAndConfirmTransaction` within `createAccount`.

```js

```

You should pass `connection` as the first argument.

```js

```

You should pass `transaction` as the second argument.

```js

```

You should pass `[payer]` as the third argument.

```js

```

You should await the result of `sendAndConfirmTransaction`.

```js

```

### --seed--

#### --"src/client/hello-world.js"--

```js
import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction
} from '@solana/web3.js';
import { createKeypairFromFile } from '../_answer/client/utils';

export async function establishConnection() {
  return new Connection('http://localhost:8899');
}

export async function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const keypair = await createKeypairFromFile(
    '../../dist/program/helloworld-keypair.json'
  );
  return keypair.publicKey;
}

export async function getAccountPubkey(payer, programId) {
  return await PublicKey.createWithSeed(payer.publicKey, 'hello', programId);
}

export async function checkProgram(
  connection,
  payer,
  programId,
  accountPubkey
) {
  const accountInfo = await connection.getAccountInfo(programId);
  if (!accountInfo === null) {
    throw new Error('Program not found');
  }
  if (!accountInfo.executable) {
    throw new Error('Program not executable');
  }
  const programDataInfo = await connection.getAccountInfo(accountPubkey);
  if (!programDataInfo === null) {
    throw new Error('Program data account not found');
  }
}

class HelloWorldAccount {
  constructor(fields) {
    this.counter = fields.counter;
  }
}

const HelloWorldSchema = new Map([
  [HelloWorldAccount, { kind: 'struct', fields: [['counter', 'u32']] }]
]);

const ACCOUNT_SIZE = borsh.serialize(
  HelloWorldSchema,
  new HelloWorldAccount()
).length;

export async function createAccount(
  connection,
  payer,
  programId,
  accountPubkey
) {
  const lamports = await connection.getMinimunBalanceForRentExemption(
    ACCOUNT_SIZE
  );
  const transaction = new Transaction();
  const instruction = {
    basPubkey: payer.publicKey,
    fromPubkey: payer.publicKey,
    lamports,
    newAccountPubkey: accountPubkey,
    programId,
    seed: 'hello',
    space: ACCOUNT_SIZE
  };
  transaction.add(SystemProgram.createAccountWithSeed(instruction));

  await sendAndConfirmTransaction(connection, transaction, [payer]);
}
```

## 34

### --description--

Within `checkProgram`, instead of throwing an error when the program data account is not found, create the program data account.

### --tests--

You should call `createAccount` within `checkProgram`.

```js

```

You should pass `connection` as the first argument.

```js

```

You should pass `payer` as the second argument.

```js

```

You should pass `programId` as the third argument.

```js

```

You should pass `accountPubkey` as the fourth argument.

```js

```

You should await the result of `createAccount`.

```js

```

## 35

### --description--

Within `hello-world.js`, export an asynchronous function named `sayHello` with the following signature:

```javascript
function sayHello(
  connection,
  payer,
  programId,
  accountPubkey,
): Promise<void>
```

### --tests--

You should define a function with the handle `sayHello`.

```js

```

You should define `sayHello` with a first parameter named `connection`.

```js

```

You should define `sayHello` with a second parameter named `payer`.

```js

```

You should define `sayHello` with a third parameter named `programId`.

```js

```

You should define `sayHello` with a fourth parameter named `accountPubkey`.

```js

```

You should define `sayHello` as an asynchronous function.

```js

```

You should define `sayHello` to be a named export.

```js

```

## 36

### --description--

To say hello to your smart contract, you need to send a transaction with some data.

Within `sayHello`, create an `transaction` variable with a value of:

```javascript
{
  keys: [{ pubkey: accountPubkey, isSigner: false, isWritable: true }],
  programId,
  data: Buffer.alloc(0),
}
```

_The `data` field is empty because the program does not do anything with it._

### --tests--

You should define a variable named `transaction`.

```js

```

You should give `transaction` a value of the above object literal.

```js

```

## 37

### --description--

Within `sayHello`, define an `instruction` variable to be a new instance `TransactionInstruction` from `@solana/web3.js`. The constructor expects your transaction object as an argument.

### --tests--

You should define a variable named `instruction`.

```js

```

You should give `instruction` a value of `new TransactionInstruction(transaction)`.

```js

```

## 38

### --description--

Now, send and confirm the transaction.

### --tests--

You should call `sendAndConfirmTransaction` within `sayHello`.

```js

```

Calling `sayHello` should send the correct transaction with `sendAndConfirmTransaction(connection, new Transaction().add(instruction), [payer])`.

```js

```

## 39

### --description--

Within `main.js` in the `main` function, create a variable named `programId` and use the function you created to assign it the program id.

### --tests--

You should define a variable named `programId`.

```js

```

You should assign `programId` the value of `await getProgramId()`.

```js

```

You should import `getProgramId` from `./hello-world.js`.

```js

```

## 40

### --description--

Within `main`, create a variable named `payer` and use the function you created to assign it the payer.

### --tests--

You should define a variable named `payer`.

```js

```

You should assign `payer` the value of `await establishPayer(connection)`.

```js

```

You should import `establishPayer` from `./hello-world.js`.

```js

```

## 41

### --description--

Within `main`, create a variable named `accountPubkey` and use the function you created to assign it the account pubkey.

### --tests--

You should define a variable named `accountPubkey`.

```js

```

You should assign `accountPubkey` the value of `await getAccountPubkey(payer, programId)`.

```js

```

You should import `getAccountPubkey` from `./hello-world.js`.

```js

```

## 42

### --description--

Within `main`, ensure the program account is deployed, and the program data account is created.

### --tests--

You should call `await checkProgram(connection, payer, programId, accountPubkey)` within `main`.

```js

```

## 43

### --description--

Within `main`, say hello to the program.

### --tests--

You should call `await sayHello(connection, payer, programId, accountPubkey)` within `main`.

```js

```

## 44

### --description--

Now that you can say hello to the program, you will want to find out how many times the program has been said hello to.

Within `hello-world.js`, export an asynchronous function named `getHelloCount` with the following signature:

```javascript
function getHelloCount(
  connection,
  accountPubkey,
): Promise<number>
```

### --tests--

You should define a function with the handle `getHelloCount`.

```js

```

You should define `getHelloCount` with a first parameter named `connection`.

```js

```

You should define `getHelloCount` with a second parameter named `accountPubkey`.

```js

```

You should define `getHelloCount` as an asynchronous function.

```js

```

You should define `getHelloCount` to be a named export.

```js

```

## 45

### --description--

Within `getHelloCount`, create a `accountInfo` variable with the correct value.

### --tests--

You should define a variable named `accountInfo`.

```js

```

You should assign `accountInfo` the value of `await connection.getAccountInfo(accountPubkey)`.

```js

```

## 46

### --description--

In order to read the data from an account, you need to deserialize it based on the program's schema.

Within `getHelloCount`, create a `greeting` variable with a value of:

```javascript
borsh.deserialize(<SCHEMA>, <CLASS_TYPE>, <ACCOUNT_DATA>)
```

### --tests--

You should define a variable named `greeting`.

```js

```

You should give `greeting` a value of `borsh.deserialize(HelloWorldSchema, HelloWorldAccount, accountInfo.data)`.

```js

```

## 47

### --description--

Within `getHelloCount`, return the `counter` property of the `greeting` variable.

### --tests--

You should return the `counter` property of `greeting`.

```js

```

## 48

### --description--

Within `main.js` in the `main` function, get the hello count, and store it in a variable named `helloCount`.

### --tests--

You should define a variable named `helloCount`.

```js

```

You should assign `helloCount` the value of `await getHelloCount(connection, accountPubkey)`.

```js

```

You should import `getHelloCount` from `./hello-world.js`.

```js

```

## 49

### --description--

Within `main`, log the `helloCount` variable value.

### --tests--

You should log the `helloCount` variable value.

```js

```

## 50

### --description--

Use Nodejs to execute the `main.js` script.

### --tests--

You should run `node src/client/main.js` in the terminal.

```js

```

## --fcc-end
