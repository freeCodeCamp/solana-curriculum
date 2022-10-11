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

## 3

### --description--

Within the `src/client` directory, create a file named `main.js` which will be the entrypoint of your program.

### --tests--

You should have a `src/client/main.js` file.

```js

```

## 4

### --description--

Within `src/client/main.js`, create an asynchronous function named `main`.

### --tests--

You should have an asynchronous function with the handle `main`.

```js

```

## 5

### --description--

Call your `main` function, awaiting the process before exiting.

### --tests--

You should call `main` with `await`.

```js

```

## 6

### --description--

Within the `main` function, log to the console the string `Saying 'hello' to a Solana account`.

### --tests--

You should have `console.log("Saying 'hello' to a Solana account")`.

```js

```

## 7

### --description--

Alongside the entrypoint for this program, you will need a module to hold all the methods needed to interact with your smart contract.

Within the `src/client` directory, create a file named `hello-world.js`.

### --tests--

You should have a `src/client/hello-world.js` file.

```js

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

## 11

### --description--

Within the `main` function in `main.js`, make a call to `establishConnection`, and store the value in a variable named `connection`.

### --tests--

You should have `const connection = await establishConnection()` in `main.js.

```js

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

## 13

### --description--

Within `establishPayer`, generate a new keypair, using the `Keypair` class from `@solana/web3.js`.

Return this keypair.

### --tests--

You should return the result of `Keypair.generate()`.

```js

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

## 19

### --description--

Within, `checkProgram`, use the `getAccountInfo` method on `connection` to get the **program account** information _if any exists_. The `getAccountInfo` method expects a `PublicKey` as an argument.

If the result is equal to `null`, throw an `Error` with a string message.

### --tests--

`checkProgram` should throw an `Error` instance, if `await connection.getAccountInfo(programId)` returns `null`.

```js

```

## 20

### --description--

Within `checkProgram`, make use of the `executable` property of the `AccountInfo` result to throw an `Error` if the program account is not executable.

### --tests--

`checkProgram` should throw an `Error` instance, if the program account `executable` property equals `false`.

```js

```

## 21

### --description--

If this is the first time the program account is being invoked, it will not own a _data account_ to store any state.

Within `checkProgram`, get the account info of the program **data** account, _if any exists_. If the result is equal to `null`, throw an `Error` with a string message.

### --tests--

`checkProgram` should throw an `Error` instance, if the program **data account** does not exist.

```js

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

Define a class named `HelloWorldAccount` whose contstructor takes a single parameter named `fields`.

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

This script is going to require a few utility functions.

Within `src/client`, create a file named `utils.js`.

### --tests--

You should have a `src/client/utils.js` file.

```js

```

## 33

### --description--

Within `utils.js`, export an asynchronous function named `getRpcUrl`.

### --tests--

You should define a function named `getRpcUrl` in `src/client/utils.js`.

```js

```

You should define `getRpcUrl` as being asynchronous.

```js

```

You should export `getRpcUrl` as a named export.

```js

```

## 34

### --description--

### --tests--

## --fcc-end
