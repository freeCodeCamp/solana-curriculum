# Solana - Learn How to Interact with an On-Chain Program

## 1

### --description--

Previously, you developed a smart contract that kept count of the number of times it was invoked.

Now, you will develop a client to call your smart contract.

Start by building your smart contract with:

```bash
npm run build
```

### --tests--

You should run `npm run build` in `learn-how-to-interact-with-an-on-chain-program`.

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

### --tests--

## 16

### --description--

This script is going to require a few utility functions.

Within `src/client`, create a file named `utils.js`.

### --tests--

You should have a `src/client/utils.js` file.

```js

```

## 17

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

## 18

### --description--

### --tests--

## --fcc-end
