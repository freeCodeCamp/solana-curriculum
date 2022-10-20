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

You should run `npm run build` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.equal(lastCommand, 'npm run build');
```

You should be in the `learn-how-to-interact-with-on-chain-programs` directory.

```js
const cwdFile = await __helpers.getCWD();
const cwd = cwdFile.split('\n').filter(Boolean).pop();
assert.include(
  cwd,
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract'
);
```

## 2

### --description--

Within the `src` directory, create a directory named `client` to hold your code.

### --tests--

You should have a `src/client` directory.

```js
const pathExists = __helpers.fileExists(
  'learn-how-to-interact-with-on-chain-programs/src/client'
);
assert.isTrue(pathExists, 'You should have a `src/client` directory.');
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
const pathExists = __helpers.fileExists(
  'learn-how-to-interact-with-on-chain-programs/src/client/main.js'
);
assert.isTrue(pathExists, 'You should have a `src/client/main.js` file.');
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
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/main.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
const mainFunctionDeclaration = babelisedCode.getFunctionDeclaration('main');
assert.exists(
  mainFunctionDeclaration,
  'You should have a function named `main`'
);
assert(
  mainFunctionDeclaration.async,
  'main should be an asynchronous function'
);
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
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/main.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
const mainExpressionStatement = babelisedCode.getExpressionStatement('main');
assert.exists(mainExpressionStatement, 'You should call `main`');
assert.equal(
  mainExpressionStatement.expression.type,
  'AwaitExpression',
  'You should call `main` with `await`'
);
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

You should have `console.log("Saying 'hello' to a Solana account")` within `main`.

```js
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/main.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
const consoleLogExpressionStatement =
  babelisedCode.getExpressionStatement('console.log');
assert.exists(
  consoleLogExpressionStatement,
  'You should have a `console.log` statement'
);
assert.equal(
  consoleLogExpressionStatement.scope.join('.'),
  'global.main',
  'The console.log should be within the main function'
);
assert.equal(
  consoleLogExpressionStatement.expression?.arguments?.[0]?.value,
  "Saying 'hello' to a Solana account",
  'You should have `console.log("Saying \'hello\' to a Solana account")`'
);
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
const pathExists = __helpers.fileExists(
  'learn-how-to-interact-with-on-chain-programs/src/client/hello-world.js'
);
assert.isTrue(
  pathExists,
  'You should have a `src/client/hello-world.js` file.'
);
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
const establishConnectionFunctionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => {
    return f.id.name === 'establishConnection';
  });
assert.exists(
  establishConnectionFunctionDeclaration,
  'You should define a function named `establishConnection` in `src/client/hello-world.js`'
);
```

You should define `establishConnection` as being asynchronous.

```js
const establishConnectionFunctionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => {
    return f.id.name === 'establishConnection';
  });
assert.exists(
  establishConnectionFunctionDeclaration,
  'You should define a function named `establishConnection` in `src/client/hello-world.js`'
);
assert.isTrue(
  establishConnectionFunctionDeclaration.async,
  'establishConnection should be an asynchronous function'
);
```

You should export `establishConnection` as a named export.

```js
const establishConnectionFunctionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => {
    return f.id.name === 'establishConnection';
  });
assert.exists(
  establishConnectionFunctionDeclaration,
  'You should define a function named `establishConnection` in `src/client/hello-world.js`'
);

const establishConnectionExportNamedDeclaration = babelisedCode
  .getType('ExportNamedDeclaration')
  .find(e => {
    const name = e.declaration?.id?.name;
    return name === 'establishConnection';
  });
assert.exists(
  establishConnectionExportNamedDeclaration,
  'You should export `establishConnection` as a named export'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/hello-world.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
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
const packageJsonFile = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/package.json'
);
const packageJson = JSON.parse(packageJsonFile);
assert.exists(
  packageJson.dependencies?.['@solana/web3.js'],
  'You should have `@solana/web3.js` in your `package.json` dependencies field.'
);
```

You should install at least version `1.63`.

```js
const packageJsonFile = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/package.json'
);
const packageJson = JSON.parse(packageJsonFile);
assert.exists(
  packageJson.dependencies?.['@solana/web3.js'],
  'You should have `@solana/web3.js` in your `package.json` dependencies field.'
);
const version = packageJson.dependencies?.['@solana/web3.js'];
const versionSansRange = version.replace(/[\^\*\~]/g, '');
const versionSansPatch = versionSansRange.replace(/(?<=\.\d+)\.\d+$/, '');
const numberVersion = Number(versionSansPatch);
assert.isAtLeast(
  numberVersion,
  1.63,
  'You should install at least version `1.63`'
);
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
const solanaWeb3ImportDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => {
    return i.source.value === '@solana/web3.js';
  });
assert.exists(
  solanaWeb3ImportDeclaration,
  'You should import from `@solana/web3.js`'
);
const connectionImportSpecifier = solanaWeb3ImportDeclaration.specifiers.find(
  s => {
    return s.imported.name === 'Connection';
  }
);
assert.exists(
  connectionImportSpecifier,
  'You should import `Connection` from `@solana/web3.js`'
);
```

You should create a new connection with `new Connection('http://localhost:8899')`.

```js
const newConnectionExpression = babelisedCode
  .getType('NewExpression')
  .find(e => {
    return e.callee.name === 'Connection';
  });
assert.exists(
  newConnectionExpression,
  'You should create a new connection with `new Connection()`'
);
assert.equal(
  newConnectionExpression.scope.join(),
  'global,establishConnection',
  'You should create the new connection within the `establishConnection` function'
);
assert.equal(
  newConnectionExpression.arguments[0].value,
  'http://localhost:8899',
  "You should create a new connection with `new Connection('http://localhost:8899')`"
);
```

Your `establishConnection` function should return the new connection.

```js
const establishConnectionFunctionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => {
    return f.id.name === 'establishConnection';
  });
assert.exists(
  establishConnectionFunctionDeclaration,
  'You should define a function named `establishConnection` in `src/client/hello-world.js`'
);
const returnStatement = establishConnectionFunctionDeclaration.body.body.find(
  s => {
    return s.type === 'ReturnStatement';
  }
);
assert.exists(
  returnStatement,
  'Your `establishConnection` function should return the new connection'
);

// TODO: Can probably just run the function to see what it returns...
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/hello-world.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
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

You should have `const connection = await establishConnection()` in `main.js`.

```js
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/main.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
const connectionVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => {
    return v.declarations?.[0]?.id?.name === 'connection';
  });
assert.exists(
  connectionVariableDeclaration,
  'You should declare a variable named `connection` in `main.js`'
);
assert.equal(
  connectionVariableDeclaration.scope.join(),
  'global,main',
  'You should declare the `connection` variable within the `main` function'
);
const awaitExpression = connectionVariableDeclaration?.declarations?.[0]?.init;
assert.exists(
  awaitExpression,
  'You should give `connection` a value of `await establishConnection()`'
);
assert.equal(
  awaitExpression?.argument?.callee?.name,
  'establishConnection',
  'You should give `connection` a value of `await establishConnection()`'
);
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
const establishPayerFunctionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => {
    return f.id?.name === 'establishPayer';
  });
assert.exists(
  establishPayerFunctionDeclaration,
  'You should define a function named `establishPayer` in `src/client/hello-world.js`'
);
```

You should define `establishPayer` as being asynchronous.

```js
const establishPayerFunctionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => {
    return f.id?.name === 'establishPayer';
  });
assert.isTrue(
  establishPayerFunctionDeclaration.async,
  'You should define `establishPayer` as being asynchronous'
);
```

You should export `establishPayer` as a named export.

```js
const establishPayerExportNamedDeclaration = babelisedCode
  .getType('ExportNamedDeclaration')
  .find(e => {
    const name = e.declaration?.id?.name;
    return name === 'establishPayer';
  });
assert.exists(
  establishPayerExportNamedDeclaration,
  'You should export `establishPayer` as a named export'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/hello-world.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
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
const { Keypair } = await __helpers.importSansCache(
  '../learn-how-to-interact-with-on-chain-programs/node_modules/@solana/web3.js/lib/index.cjs.js'
);
const { establishPayer } = await __helpers.importSansCache(
  '../learn-how-to-interact-with-on-chain-programs/src/client/hello-world.js'
);
const keypair = await establishPayer();
assert.exists(keypair, 'You should return the result of `Keypair.generate()`');
assert.instanceOf(
  keypair,
  Keypair,
  'You should return the result of `Keypair.generate()`'
);
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
const getProgramIdFunctionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => {
    return f.id.name === 'getProgramId';
  });
assert.exists(
  getProgramIdFunctionDeclaration,
  'You should define a function named `getProgramId` in `src/client/hello-world.js`'
);
```

You should define `getProgramId` as asynchronous.

```js
const getProgramIdFunctionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => {
    return f.id.name === 'getProgramId';
  });
assert.isTrue(
  getProgramIdFunctionDeclaration.async,
  'You should define `getProgramId` as being asynchronous'
);
```

You should export `getProgramId` as a named export.

```js
const getProgramIdExportNamedDeclaration = babelisedCode
  .getType('ExportNamedDeclaration')
  .find(e => {
    const name = e.declaration?.id?.name;
    return name === 'getProgramId';
  });
assert.exists(
  getProgramIdExportNamedDeclaration,
  'You should export `getProgramId` as a named export'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/hello-world.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
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

The program id is its public key. You can derive it from the program's keypair.

<!-- TODO: createKeypairFromFile is not a function from solana 🤦‍♂️ remove for utility -->

Within `getProgramId`, declare a variable `secretKeyString`, and assign it the value of:

```js
await readFile(<PATH_TO_KEYPAIR_JSON>, 'utf8');
```

Where `<PATH_TO_KEYPAIR_JSON>` is the path to the keypair json file.

### --tests--

You should import `readFile` from `fs/promises`.

```js
const readFileImportDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => {
    return i.source.value === 'fs/promises';
  });
assert.exists(
  readFileImportDeclaration,
  'You should import `readFile` from `fs/promises`'
);
```

You should define a variable named `secretKeyString`.

```js
const secretKeyStringVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => {
    return v.declarations[0].id.name === 'secretKeyString';
  });
assert.exists(
  secretKeyStringVariableDeclaration,
  'You should define a variable named `secretKeyString`'
);
```

`secretKeyString` should be assigned the result of `readFile`.

```js
const secretKeyStringVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => {
    return v.declarations[0].id.name === 'secretKeyString';
  });
const awaitExpression = secretKeyStringVariableDeclaration.declarations[0].init;
assert.exists(
  awaitExpression,
  '`secretKeyString` should be assigned the result of awaiting `readFile`'
);
const readFileCallExpression = awaitExpression.argument;
assert.equal(
  readFileCallExpression.callee.name,
  'readFile',
  '`secretKeyString` should be assigned the result of awaiting `readFile`'
);
```

You should pass `dist/program/hello-world-keypair.json` as the first argument to `readFile`.

```js
const readFileCallExpression = babelisedCode
  .getType('CallExpression')
  .find(c => {
    return c.callee.name === 'readFile';
  });
assert.exists(
  readFileCallExpression,
  'You should pass `dist/program/hello-world-keypair.json` as the first argument to `readFile`'
);
const firstArgument = readFileCallExpression.arguments?.[0]?.value;
const urlToAssert = new URL(firstArgument, 'file://');
assert.equal(
  readFileCallExpression.arguments[0].value,
  'dist/program/helloworld-keypair.json',
  'You should pass `dist/program/hello-world-keypair.json` as the first argument to `readFile`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/hello-world.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
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

Within `getProgramId`, define a variable `secretKey`, and assign it the value of:

```js
Uint8Array.from(JSON.parse(secretKeyString));
```

### --tests--

You should define a variable named `secretKey`.

```js
const secretKeyVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => {
    return v.declarations?.[0]?.id?.name === 'secretKey';
  });
assert.exists(
  secretKeyVariableDeclaration,
  'You should define a variable named `secretKey`'
);
```

`secretKey` should be assigned the result of `Uint8Array.from`.

```js
const secretKeyVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => {
    return v.declarations?.[0]?.id?.name === 'secretKey';
  });
const callExpression = secretKeyVariableDeclaration?.declarations?.[0]?.init;
const uintMemberExpression = callExpression?.callee;
assert.equal(
  uintMemberExpression?.object?.name,
  'Uint8Array',
  '`secretKey` should be assigned the result of `Uint8Array.from`'
);
assert.equal(
  uintMemberExpression?.property?.name,
  'from',
  '`secretKey` should be assigned the result of `Uint8Array.from`'
);
```

You should pass the result of `JSON.parse(secretKeyString)` as the first argument to `Uint8Array.from`.

```js
const secretKeyVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => {
    return v.declarations?.[0]?.id?.name === 'secretKey';
  });
const callExpression = secretKeyVariableDeclaration?.declarations?.[0]?.init;
const jsonCallExpression = callExpression?.arguments?.[0];
const jsonMemberExpression = jsonCallExpression?.callee;
assert.equal(
  jsonMemberExpression?.object?.name,
  'JSON',
  'You should pass the result of `JSON.parse(secretKeyString)` as the first argument to `Uint8Array.from`'
);
assert.equal(
  jsonMemberExpression?.property?.name,
  'parse',
  'You should pass the result of `JSON.parse(secretKeyString)` as the first argument to `Uint8Array.from`'
);
assert.equal(
  jsonCallExpression?.arguments?.[0]?.name,
  'secretKeyString',
  'You should pass the result of `JSON.parse(secretKeyString)` as the first argument to `Uint8Array.from`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/hello-world.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 17

### --description--

Within `getProgramId`, define a variable `keypair`, and assign it the value of calling the `fromSecretKey` method on `Keypair`, passing `secretKey` as the first argument.

### --tests--

You should define a variable named `keypair`.

```js
const keypairVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => {
    return v.declarations?.[0]?.id?.name === 'keypair';
  });
assert.exists(
  keypairVariableDeclaration,
  'You should define a variable named `keypair`'
);
assert.equal(
  keypairVariableDeclaration.scope.join(),
  'global,getProgramId',
  'You should define `keypair` within `getProgramId`'
);
```

`keypair` should be assigned the result of calling the `fromSecretKey` method on `Keypair`.

```js
const keypairVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => {
    return v.declarations?.[0]?.id?.name === 'keypair';
  });
const callExpression = keypairVariableDeclaration?.declarations?.[0]?.init;
const fromSecretKeyMemberExpression = callExpression?.callee;
assert.equal(
  fromSecretKeyMemberExpression?.object?.name,
  'Keypair',
  '`keypair` should be assigned the result of calling the `fromSecretKey` method on `Keypair`'
);
assert.equal(
  fromSecretKeyMemberExpression?.property?.name,
  'fromSecretKey',
  '`keypair` should be assigned the result of calling the `fromSecretKey` method on `Keypair`'
);
```

You should pass `secretKey` as the first argument to `fromSecretKey`.

```js
const keypairVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => {
    return v.declarations?.[0]?.id?.name === 'keypair';
  });
const callExpression = keypairVariableDeclaration?.declarations?.[0]?.init;
const secretKeyArgument = callExpression?.arguments?.[0];
assert.equal(
  secretKeyArgument?.name,
  'secretKey',
  'You should pass `secretKey` as the first argument to `fromSecretKey`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/hello-world.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 18

### --description--

Within `getProgramId`, return the `publicKey` property of `keypair`.

### --tests--

You should return the `publicKey` property of `keypair`.

```js
const returnStatement = babelisedCode.getFunctionDeclarations().find(f => {
  return f.id?.name === 'getProgramId';
});
const blockStatement = returnStatement?.body?.body;
const returnExpression = blockStatement?.find(b => {
  return b.type === 'ReturnStatement';
});
assert.equal(
  returnExpression?.argument?.object?.name,
  'keypair',
  'You should return the `publicKey` property of `keypair`'
);
assert.equal(
  returnExpression?.argument?.property?.name,
  'publicKey',
  'You should return the `publicKey` property of `keypair`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/hello-world.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 19

### --description--

In Solana, program accounts (smart contracts) are stateless. As such, separate accounts (data accounts) need to be created to persist data.

Within `hello-world.js`, export an asynchronous function with the handle `getAccountPubkey`. This function should expect two arguments: `payer` and `programId`.

### --tests--

You should define a function with the handle `getAccountPubkey`.

```js
const getAccountPubkeyFunctionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => {
    return f.id.name === 'getAccountPubkey';
  });
assert.exists(
  getAccountPubkeyFunctionDeclaration,
  'You should define a function with the handle `getAccountPubkey`'
);
```

You should define `getAccountPubkey` as asynchronous.

```js
const getAccountPubkeyFunctionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => {
    return f.id.name === 'getAccountPubkey';
  });
assert.isTrue(
  getAccountPubkeyFunctionDeclaration.async,
  'You should define `getAccountPubkey` as asynchronous'
);
```

You should define `getAccountPubkey` with a first parameter `payer`.

```js
const getAccountPubkeyFunctionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => {
    return f.id.name === 'getAccountPubkey';
  });
const firstParameter = getAccountPubkeyFunctionDeclaration.params[0];
assert.exists(
  firstParameter,
  'You should define `getAccountPubkey` to accept a first argument'
);
assert.equal(
  firstParameter.name,
  'payer',
  'You should define `getAccountPubkey` with a first parameter `payer`'
);
```

You should define `getAccountPubkey` with a second parameter `programId`.

```js
const getAccountPubkeyFunctionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => {
    return f.id.name === 'getAccountPubkey';
  });
const secondParameter = getAccountPubkeyFunctionDeclaration.params[1];
assert.exists(
  secondParameter,
  'You should define `getAccountPubkey` to accept a second argument'
);
assert.equal(
  secondParameter.name,
  'programId',
  'You should define `getAccountPubkey` with a second parameter `programId`'
);
```

You should export `getAccountPubkey` as a named export.

```js
const getAccountPubkeyExportDeclaration = babelisedCode
  .getExportNamedDeclarations()
  .find(e => {
    return e.declaration.id.name === 'getAccountPubkey';
  });
assert.exists(
  getAccountPubkeyExportDeclaration,
  'You should export `getAccountPubkey` as a named export'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/hello-world.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
delete global.babelisedCode;
global.babelisedCode = babelisedCode;
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
  return createKeypairFromFile('../../dist/program/helloworld-keypair.json')
    .publicKey;
}
```

## 20

### --description--

Within `getAccountPubkey`, use the `createWithSeed` function on the `PublicKey` class from `@solana/web3.js` to create a public key, passing in the following arguments:

1. `payer.publicKey`
2. Any string of your choosing which will act as the seed
3. `programId`

Then, return the awaited result.

### --tests--

You should import `PublicKey` from `@solana/web3.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === '@solana/web3.js';
});
assert.exists(
  importDeclaration,
  'You should import `PublicKey` from `@solana/web3.js`'
);
```

You should call `PublicKey.createWithSeed` within `getAccountPubkey`.

```js
const createWithSeedCallExpression = babelisedCode
  .getCallExpressions()
  .find(c => {
    return c.callee.property.name === 'createWithSeed';
  });
assert.exists(
  createWithSeedCallExpression,
  'You should call `PublicKey.createWithSeed`'
);
assert.equal(
  createWithSeedCallExpression.scope.join(),
  'global,getAccountPubkey',
  'You should call `PublicKey.createWithSeed` within `getAccountPubkey`'
);
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

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/hello-world.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
delete global.babelisedCode;
global.babelisedCode = babelisedCode;
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

## 21

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

## 22

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

## 23

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

## 24

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

## 25

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
  const accountInfo = await connection.getAccountInfo(accountPubkey);
  if (accountInfo === null) {
    throw new Error('Program data account does not exist');
  }
}
```

## 26

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

## 27

### --description--

You can estimate the cost of creating a program data account of size `10000` bytes by using the following CLI command:

```bash
solana rent 10000
```

### --tests--

You should run `solana rent 10000` in the terminal.

```js

```

## 28

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

## 29

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

## 30

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

## 31

### --description--

Within `createAccount`, replace the hard-coded value of `10000` with the `ACCOUNT_SIZE` constant.

### --tests--

You should replace the hard-coded value of `10000` with the `ACCOUNT_SIZE` constant.

```js

```

## 32

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

## 33

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

## 34

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

## 35

### --description--

Within `createAccount`, pass `transaction` as the argument to the `createAccountWithSeed` call.

### --tests--

You should have `SystemProgram.createAccountWithSeed(transaction)` within `transaction.add`.

```js

```

## 36

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

## 37

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

## 38

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

## 39

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

## 40

### --description--

Within `sayHello`, define an `instruction` variable to be a new instance `TransactionInstruction` from `@solana/web3.js`. The constructor expects your transaction object as an argument.

### --tests--

You should define a variable named `instruction`.

```js

```

You should give `instruction` a value of `new TransactionInstruction(transaction)`.

```js

```

## 41

### --description--

Now, send and confirm the transaction.

### --tests--

You should call `sendAndConfirmTransaction` within `sayHello`.

```js

```

Calling `sayHello` should send the correct transaction with `sendAndConfirmTransaction(connection, new Transaction().add(instruction), [payer])`.

```js

```

## 42

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

## 43

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

## 44

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

## 45

### --description--

Within `main`, ensure the program account is deployed, and the program data account is created.

### --tests--

You should call `await checkProgram(connection, payer, programId, accountPubkey)` within `main`.

```js

```

## 46

### --description--

Within `main`, say hello to the program.

### --tests--

You should call `await sayHello(connection, payer, programId, accountPubkey)` within `main`.

```js

```

## 47

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

## 48

### --description--

Within `getHelloCount`, create a `accountInfo` variable with the correct value.

### --tests--

You should define a variable named `accountInfo`.

```js

```

You should assign `accountInfo` the value of `await connection.getAccountInfo(accountPubkey)`.

```js

```

## 49

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

## 50

### --description--

Within `getHelloCount`, return the `counter` property of the `greeting` variable.

### --tests--

You should return the `counter` property of `greeting`.

```js

```

## 51

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

## 52

### --description--

Within `main`, log the `helloCount` variable value.

### --tests--

You should log the `helloCount` variable value.

```js

```

## 53

### --description--

Use Nodejs to execute the `main.js` script.

### --tests--

You should run `node src/client/main.js` in the terminal.

```js

```

## --fcc-end
