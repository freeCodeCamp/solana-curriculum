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

Within the `src/client` directory, create a file named `main.js` which will be the entrypoint of your script.

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
const mainFunctionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'main');
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
  mainExpressionStatement?.expression?.type,
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
const arg = consoleLogExpressionStatement?.expression?.arguments?.[0];
const code = babelisedCode.generateCode(arg);
assert.match(
  code,
  /("|'|`)Saying ("|'|`)hello\2 to a Solana account\1/,
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

Within `hello-world.js`, export a function named `establishConnection`.

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
export function establishConnection() {}
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
const { Connection } = await __helpers.importSansCache(
  '../learn-how-to-interact-with-on-chain-programs/node_modules/@solana/web3.js/lib/index.cjs.js'
);
const { establishConnection } = await __helpers.importSansCache(
  '../learn-how-to-interact-with-on-chain-programs/src/client/hello-world.js'
);
const connection = await establishConnection();
assert.instanceOf(
  connection,
  Connection,
  'Your `establishConnection` function should return the new connection'
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
npm install @solana/web3.js
```

## 11

### --description--

Within the `main` function in `main.js`, make a call to `establishConnection`, and store the value in a variable named `connection`.

### --tests--

You should have `const connection = establishConnection()` in `main.js`.

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
const init = connectionVariableDeclaration?.declarations?.[0]?.init;
assert.exists(
  init,
  'You should initialise the `connection` variable in `main.js`'
);
assert.equal(
  init?.callee?.name,
  'establishConnection',
  'You should initialise the `connection` variable with `establishConnection()`'
);
```

### --seed--

#### --"src/client/hello-world.js"--

```js
import { Connection } from '@solana/web3.js';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}
```

## 12

### --description--

Creating transactions takes compute power. So, an account has to pay for any transaction made.

Within `hello-world.js`, export a function named `establishPayer`.

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
import { establishConnection } from './hello-world.js';

async function main() {
  console.log("Saying 'hello' to a Solana account");
  const connection = establishConnection();
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

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {}
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

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}
```

## 15

### --description--

The program id is its public key. You can derive it from the program's keypair.

Within `getProgramId`, declare a variable `secretKeyString`, and assign it the value of:

```js
await readFile(<PATH_TO_KEYPAIR_JSON>, 'utf8');
```

Where `<PATH_TO_KEYPAIR_JSON>` is the keypair json file path (relative to this project's root) created when building the smart contract.

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
    return v.declarations?.[0]?.id?.name === 'secretKeyString';
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
    return v.declarations?.[0]?.id?.name === 'secretKeyString';
  });
const awaitExpression =
  secretKeyStringVariableDeclaration?.declarations?.[0]?.init;
assert.exists(
  awaitExpression,
  '`secretKeyString` should be assigned the result of awaiting `readFile`'
);
const readFileCallExpression = awaitExpression?.argument;
assert.equal(
  readFileCallExpression?.callee?.name,
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
  readFileCallExpression?.arguments?.[0]?.value,
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

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
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

### --seed--

#### --"src/client/hello-world.js"--

```js
import { Connection, Keypair } from '@solana/web3.js';
import { readFile } from 'fs/promises';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
    'utf8'
  );
}
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

### --seed--

#### --"src/client/hello-world.js"--

```js
import { Connection, Keypair } from '@solana/web3.js';
import { readFile } from 'fs/promises';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
    'utf8'
  );
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
}
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

### --seed--

#### --"src/client/hello-world.js"--

```js
import { Connection, Keypair } from '@solana/web3.js';
import { readFile } from 'fs/promises';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
    'utf8'
  );
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  const keypair = Keypair.fromSecretKey(secretKey);
}
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
  getAccountPubkeyFunctionDeclaration?.async,
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
const firstParameter = getAccountPubkeyFunctionDeclaration?.params?.[0];
assert.exists(
  firstParameter,
  'You should define `getAccountPubkey` to accept a first argument'
);
assert.equal(
  firstParameter?.name,
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
const secondParameter = getAccountPubkeyFunctionDeclaration?.params?.[1];
assert.exists(
  secondParameter,
  'You should define `getAccountPubkey` to accept a second argument'
);
assert.equal(
  secondParameter?.name,
  'programId',
  'You should define `getAccountPubkey` with a second parameter `programId`'
);
```

You should export `getAccountPubkey` as a named export.

```js
const getAccountPubkeyExportDeclaration = babelisedCode
  .getType('ExportNamedDeclaration')
  .find(e => {
    return e.declaration?.id?.name === 'getAccountPubkey';
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
import { readFile } from 'fs/promises';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
    'utf8'
  );
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  const keypair = Keypair.fromSecretKey(secretKey);
  return keypair.publicKey;
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
  return i.source?.value === '@solana/web3.js';
});
const specifier = importDeclaration?.specifiers?.find(s => {
  return s.local?.name === 'PublicKey';
});
assert.exists(
  specifier,
  'You should import `PublicKey` from `@solana/web3.js`'
);
```

You should call `PublicKey.createWithSeed` within `getAccountPubkey`.

```js
const createWithSeedCallExpression = babelisedCode
  .getType('CallExpression')
  .find(c => {
    return c.callee?.property?.name === 'createWithSeed';
  });
assert.exists(
  createWithSeedCallExpression,
  'You should call `PublicKey.createWithSeed`'
);
assert.equal(
  createWithSeedCallExpression?.scope?.join(),
  'global,getAccountPubkey',
  'You should call `PublicKey.createWithSeed` within `getAccountPubkey`'
);
assert.equal(
  createWithSeedCallExpression?.callee?.object?.name,
  'PublicKey',
  "You should use `PublicKey`'s `createWithSeed` function"
);
```

You should pass `payer.publicKey` as the first argument to `createWithSeed`.

```js
const publicKeyCallExpression = babelisedCode
  .getType('CallExpression')
  .find(c => {
    return c.callee?.property?.name === 'createWithSeed';
  });
const payerPropertyAccessExpression = publicKeyCallExpression?.arguments?.[0];
assert.exists(
  payerPropertyAccessExpression,
  'You should pass a the first argument to `createWithSeed`'
);
assert.equal(
  payerPropertyAccessExpression?.object?.name,
  'payer',
  'You should pass `payer.publicKey` as the first argument to `createWithSeed`'
);
assert.equal(
  payerPropertyAccessExpression?.property?.name,
  'publicKey',
  'You should call `publicKey` on `payer`'
);
```

You should pass a string as the second argument to `createWithSeed`.

```js
const createWithSeedCallExpression = babelisedCode
  .getType('CallExpression')
  .find(c => {
    return c.callee?.property?.name === 'createWithSeed';
  });
const secondArgument = createWithSeedCallExpression?.arguments?.[1];
assert.exists(
  secondArgument,
  'You should pass a second argument to `createWithSeed`'
);
assert.equal(
  secondArgument.type,
  'StringLiteral',
  'You should pass a string as the second argument to `createWithSeed`'
);
```

You should pass `programId` as the third argument to `createWithSeed`.

```js
const createWithSeedCallExpression = babelisedCode
  .getType('CallExpression')
  .find(c => {
    return c.callee?.property?.name === 'createWithSeed';
  });
const programIdPropertyAccessExpression =
  createWithSeedCallExpression?.arguments?.[2];
assert.exists(
  programIdPropertyAccessExpression,
  'You should pass a third argument to `createWithSeed`'
);
assert.equal(
  programIdPropertyAccessExpression?.name,
  'programId',
  'You should pass `programId` as the third argument to `createWithSeed`'
);
```

You should return the result of `await PublicKey.createWithSeed`.

```js
const getAccountPubkeyFunctionDeclaration = babelisedCode
  .getType('FunctionDeclaration')
  .find(f => {
    return f.id?.name === 'getAccountPubkey';
  });
const returnStatement = getAccountPubkeyFunctionDeclaration?.body?.body?.find(
  b => {
    return b.type === 'ReturnStatement';
  }
);
assert.exists(returnStatement, 'You should return within `getAccountPubkey`');
const awaitExpression = returnStatement?.argument;
assert.equal(
  awaitExpression?.type,
  'AwaitExpression',
  'You should await the result of `PublicKey.createWithSeed`'
);
const memberExpression = awaitExpression?.argument?.callee;
assert.equal(
  memberExpression?.object?.name,
  'PublicKey',
  'You should return `await PublicKey...`'
);
assert.equal(
  memberExpression?.property?.name,
  'createWithSeed',
  'You should return `PublicKey.createWithSeed(...)`'
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
import { readFile } from 'fs/promises';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
    'utf8'
  );
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  const keypair = Keypair.fromSecretKey(secretKey);
  return keypair.publicKey;
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
const checkProgramFunctionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => {
    return f.id?.name === 'checkProgram';
  });
assert.exists(
  checkProgramFunctionDeclaration,
  'You should define a function with the handle `checkProgram`'
);
```

You should define `checkProgram` with a first parameter named `connection`.

```js
const checkProgramFunctionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => {
    return f.id?.name === 'checkProgram';
  });
const firstParameter = checkProgramFunctionDeclaration?.params?.[0];
assert.exists(
  firstParameter,
  'You should define `checkProgram` to expect at least one argument'
);
assert.equal(
  firstParameter?.name,
  'connection',
  'You should define `checkProgram` with a first parameter named `connection`'
);
```

You should define `checkProgram` with a second parameter named `payer`.

```js
const checkProgramFunctionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => {
    return f.id?.name === 'checkProgram';
  });
const secondParameter = checkProgramFunctionDeclaration?.params?.[1];
assert.exists(
  secondParameter,
  'You should define `checkProgram` to expect at least two arguments'
);
assert.equal(
  secondParameter?.name,
  'payer',
  'You should define `checkProgram` with a second parameter named `payer`'
);
```

You should define `checkProgram` with a third parameter named `programId`.

```js
const checkProgramFunctionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => {
    return f.id?.name === 'checkProgram';
  });
const thirdParameter = checkProgramFunctionDeclaration?.params?.[2];
assert.exists(
  thirdParameter,
  'You should define `checkProgram` to expect at least three arguments'
);
assert.equal(
  thirdParameter?.name,
  'programId',
  'You should define `checkProgram` with a third parameter named `programId`'
);
```

You should define `checkProgram` with a fourth parameter named `accountPubkey`.

```js
const checkProgramFunctionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => {
    return f.id?.name === 'checkProgram';
  });
const fourthParameter = checkProgramFunctionDeclaration?.params?.[3];
assert.exists(
  fourthParameter,
  'You should define `checkProgram` to expect at least four arguments'
);
assert.equal(
  fourthParameter?.name,
  'accountPubkey',
  'You should define `checkProgram` with a fourth parameter named `accountPubkey`'
);
```

You should define `checkProgram` to be a named export.

```js
const exportNamedDeclaration = babelisedCode
  .getType('ExportNamedDeclaration')
  .find(d => {
    return d.declaration?.id?.name === 'checkProgram';
  });
assert.exists(
  exportNamedDeclaration,
  'You should define `checkProgram` to be a named export'
);
```

You should define `checkProgram` to be asynchronous.

```js
const checkProgramFunctionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => {
    return f.id?.name === 'checkProgram';
  });
assert.isTrue(
  checkProgramFunctionDeclaration?.async,
  'You should define `checkProgram` to be asynchronous'
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
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { readFile } from 'fs/promises';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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
```

## 22

### --description--

Within, `checkProgram`, use the `getAccountInfo` method on `connection` to get the **program account** information _if any exists_. The `getAccountInfo` method expects a `PublicKey` as an argument.

If the result is equal to `null`, throw an `Error` with a string message.

### --tests--

`checkProgram` should throw an `Error` instance, if `await connection.getAccountInfo(programId)` returns `null`.

```js
const { checkProgram } = await __helpers.importSansCache(
  '../learn-how-to-interact-with-on-chain-programs/src/client/hello-world.js'
);
const payer = {};
const programId = {};
const accountPubkey = 'accountPubkey';
const connection = {
  getAccountInfo: async a =>
    a === accountPubkey
      ? assert.fail('incorrect parameter passed to `getAccountInfo`')
      : null
};
try {
  await checkProgram(connection, payer, programId, accountPubkey);
  assert.fail(
    '`checkProgram` should throw an `Error` instance, if `await connection.getAccountInfo(programId)` returns `null`'
  );
} catch (e) {
  if (e instanceof AssertionError) {
    throw e;
  }
  assert.instanceOf(e, Error);
}
```

### --seed--

#### --"src/client/hello-world.js"--

```js
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { readFile } from 'fs/promises';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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
) {}
```

## 23

### --description--

Within `checkProgram`, make use of the `executable` property of the `AccountInfo` result to throw an `Error` if the program account is not executable.

### --tests--

`checkProgram` should throw an `Error` instance, if the program account `executable` property equals `false`.

```js
const { checkProgram } = await __helpers.importSansCache(
  '../learn-how-to-interact-with-on-chain-programs/src/client/hello-world.js'
);
const connection = {
  getAccountInfo: async () => ({
    executable: true
  })
};
const payer = {};
const programId = {};
const accountPubkey = {};
// Should NOT throw if is executable
try {
  await checkProgram(connection, payer, programId, accountPubkey);
} catch (e) {
  assert.fail(
    '`checkProgram` should NOT throw an `Error` instance, if the program account `executable` property IS `true`'
  );
}
// Should throw if is NOT executable
connection.getAccountInfo = async () => ({
  executable: false
});
try {
  await checkProgram(connection, payer, programId, accountPubkey);
  assert.fail(
    '`checkProgram` should throw an `Error` instance, if the program account `executable` property equals `false`'
  );
} catch (e) {
  if (e instanceof AssertionError) {
    throw e;
  }
  assert.instanceOf(e, Error);
}
```

### --seed--

#### --"src/client/hello-world.js"--

```js
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { readFile } from 'fs/promises';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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
}
```

## 24

### --description--

If this is the first time the program account is being invoked, it will not own a _data account_ to store any state.

Within `checkProgram`, get the account info of the program **data** account, _if any exists_. If the result is equal to `null`, throw an `Error` with a string message.

### --tests--

`checkProgram` should throw an `Error` instance, if the program **data account** does not exist.

```js
const { checkProgram } = await __helpers.importSansCache(
  '../learn-how-to-interact-with-on-chain-programs/src/client/hello-world.js'
);
const connection = {
  getAccountInfo: async flip =>
    flip
      ? null
      : {
          executable: true
        }
};
const payer = {};
const programId = false;
let accountPubkey = true;
try {
  await checkProgram(connection, payer, programId, accountPubkey);
  assert.fail(
    '`checkProgram` should throw an `Error` instance, if the program data account does not exist'
  );
} catch (e) {
  if (e instanceof AssertionError) {
    throw e;
  }
  assert.instanceOf(e, Error);
}
// Should NOT throw if data account exists
accountPubkey = false;
try {
  await checkProgram(connection, payer, programId, accountPubkey);
} catch (e) {
  assert.fail(
    '`checkProgram` should NOT throw an `Error` instance, if the program **data account** exists'
  );
}
```

### --seed--

#### --"src/client/hello-world.js"--

```js
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { readFile } from 'fs/promises';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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
}
```

## 25

### --description--

Instead of throwing when a program data account is not found, you can create the account.

Within `hello-world.js`, define and export a function with the following signature:

```javascript
function createAccount(
  connection: Connection,
  payer: Keypair,
  programId: PublicKey,
  accountPubkey: PublicKey
): Promise<void>
```

### --tests--

You should define a function with the handle `createAccount`.

```js
const functionDeclaration = babelisedCode.getFunctionDeclarations().find(f => {
  return f.id?.name === 'createAccount';
});
assert.exists(
  functionDeclaration,
  'You should define a function with the handle `createAccount`'
);
```

You should define `createAccount` with a first parameter named `connection`.

```js
const functionDeclaration = babelisedCode.getFunctionDeclarations().find(f => {
  return f.id?.name === 'createAccount';
});
const firstParameter = functionDeclaration?.params?.[0];
assert.exists(
  firstParameter,
  'You should define `createAccount` to expect at least one argument'
);
assert.equal(
  firstParameter?.name,
  'connection',
  'You should define `createAccount` with a first parameter named `connection`'
);
```

You should define `createAccount` with a second parameter named `payer`.

```js
const functionDeclaration = babelisedCode.getFunctionDeclarations().find(f => {
  return f.id?.name === 'createAccount';
});
const secondParameter = functionDeclaration?.params?.[1];
assert.exists(
  secondParameter,
  'You should define `createAccount` to expect at least two arguments'
);
assert.equal(
  secondParameter?.name,
  'payer',
  'You should define `createAccount` with a second parameter named `payer`'
);
```

You should define `createAccount` with a third parameter named `programId`.

```js
const functionDeclaration = babelisedCode.getFunctionDeclarations().find(f => {
  return f.id?.name === 'createAccount';
});
const thirdParameter = functionDeclaration?.params?.[2];
assert.exists(
  thirdParameter,
  'You should define `createAccount` to expect at least three arguments'
);
assert.equal(
  thirdParameter?.name,
  'programId',
  'You should define `createAccount` with a third parameter named `programId`'
);
```

You should define `createAccount` with a fourth parameter named `accountPubkey`.

```js
const functionDeclaration = babelisedCode.getFunctionDeclarations().find(f => {
  return f.id?.name === 'createAccount';
});
const fourthParameter = functionDeclaration?.params?.[3];
assert.exists(
  fourthParameter,
  'You should define `createAccount` to expect at least four arguments'
);
assert.equal(
  fourthParameter?.name,
  'accountPubkey',
  'You should define `createAccount` with a fourth parameter named `accountPubkey`'
);
```

You should define `createAccount` to be a named export.

```js
const exportNamedDeclaration = babelisedCode
  .getType('ExportNamedDeclaration')
  .find(e => {
    return e.declaration?.id?.name === 'createAccount';
  });
assert.exists(
  exportNamedDeclaration,
  'You should define `createAccount` to be a named export'
);
```

You should define `createAccount` to be asynchronous.

```js
const functionDeclaration = babelisedCode.getFunctionDeclarations().find(f => {
  return f.id?.name === 'createAccount';
});
assert.isTrue(
  functionDeclaration?.async,
  'You should define `createAccount` to be asynchronous'
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
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { readFile } from 'fs/promises';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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
    throw new Error('Data account info not found');
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
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.object?.name === 'connection' &&
    c.callee?.property?.name === 'getMinimumBalanceForRentExemption'
  );
});
assert.exists(
  callExpression,
  'You should call `connection.getMinimumBalanceForRentExemption`'
);
assert.include(
  callExpression?.scope?.join(),
  'global,createAccount',
  '`connection.getMinimumBalanceForRentExemption()` should be within `createAccount`'
);
```

You should pass `10000` as the first argument to `getMinimumBalanceForRentExemption`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.object?.name === 'connection' &&
    c.callee?.property?.name === 'getMinimumBalanceForRentExemption'
  );
});
assert.equal(
  callExpression?.arguments?.[0]?.value,
  10000,
  'You should pass `10000` as the first argument to `getMinimumBalanceForRentExemption`'
);
```

You should await the result of `getMinimumBalanceForRentExemption`.

```js
const awaitExpression = babelisedCode.getType('AwaitExpression').find(a => {
  return (
    a.argument?.callee?.object?.name === 'connection' &&
    a.scope?.join().includes('global,createAccount')
  );
});
assert.exists(
  awaitExpression,
  'You should await the result of `connection.getMinimumBalanceForRentExemption(10000)`'
);
assert.equal(
  awaitExpression.type,
  'AwaitExpression',
  'You should await the result of `connection.getMinimumBalanceForRentExemption(10000)`'
);
```

You should assign the value to a variable named `lamports`.

```js
const variableDeclaration = babelisedCode.getVariableDeclarations().find(v => {
  return v.declarations?.[0]?.id?.name === 'lamports';
});
assert.exists(
  variableDeclaration,
  'You should assign the value to a variable named `lamports`'
);
assert.equal(
  variableDeclaration?.scope?.join(),
  'global,createAccount',
  '`lamports` should be defined within `createAccount`'
);
const awaitExpression = variableDeclaration?.declarations?.[0]?.init;
assert.equal(
  awaitExpression?.argument?.callee?.object?.name,
  'connection',
  '`lamports` should be assigned the result of `connection.getMinimumBalanceForRentExemption(10000)`'
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
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { readFile } from 'fs/promises';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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
    throw new Error('Data account info not found');
  }
}

export async function createAccount(
  connection,
  payer,
  programId,
  accountPubkey
) {}
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
const lastCommand = await __helpers.getLastCommand();
assert.equal(lastCommand?.trim(), 'solana rent 10000');
```

### --seed--

#### --"src/client/hello-world.js"--

```js
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { readFile } from 'fs/promises';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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
    throw new Error('Data account info not found');
  }
}

export async function createAccount(
  connection,
  payer,
  programId,
  accountPubkey
) {
  const lamports = await connection.getMinimumBalanceForRentExemption(10000);
}
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
const variableDeclaration = babelisedCode.getVariableDeclarations().find(v => {
  return v.declarations?.[0]?.id?.name === 'ACCOUNT_SIZE';
});
assert.exists(
  variableDeclaration,
  'You should define a constant named `ACCOUNT_SIZE`'
);
assert.equal(
  variableDeclaration?.scope?.join(),
  'global',
  '`ACCOUNT_SIZE` should be defined in the global scope'
);
assert.equal(
  variableDeclaration?.kind,
  'const',
  '`ACCOUNT_SIZE` should be defined as a constant'
);
```

You should set the value of `ACCOUNT_SIZE` to `borsh.serialize(HelloWorldSchema, new HelloWorldAccount()).length`.

```js
const variableDeclaration = babelisedCode.getVariableDeclarations().find(v => {
  return v.declarations?.[0]?.id?.name === 'ACCOUNT_SIZE';
});
const memberExpression = variableDeclaration?.declarations?.[0]?.init;
const callExpression = memberExpression?.object;
assert.equal(
  callExpression?.callee?.object?.name,
  'borsh',
  '`ACCOUNT_SIZE` should use `borsh`'
);
assert.equal(
  callExpression?.callee?.property?.name,
  'serialize',
  '`ACCOUNT_SIZE` should use `borsh.serialize`'
);
assert.equal(
  callExpression?.arguments?.[0]?.name,
  'HelloWorldSchema',
  '`ACCOUNT_SIZE` should use `borsh.serialize(HelloWorldSchema, ...)`'
);
const newExpression = callExpression?.arguments?.[1];
assert.equal(
  newExpression?.callee?.name,
  'HelloWorldAccount',
  '`ACCOUNT_SIZE` should use `borsh.serialize(..., new HelloWorldAccount())`'
);
assert.equal(
  newExpression?.type,
  'NewExpression',
  '`HelloWorldAccount()` should be instantiated with `new`'
);
assert.equal(
  memberExpression?.property?.name,
  'length',
  '`ACCOUNT_SIZE` should use `borsh.serialize(...).length`'
);
```

You should import `borsh` from `borsh`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source?.value === 'borsh';
});
assert.exists(importDeclaration, 'You should import from `borsh`');
const importNamespaceSpecifier = importDeclaration?.specifiers?.find(s => {
  return s.type === 'ImportNamespaceSpecifier';
});
assert.exists(
  importNamespaceSpecifier,
  'You should import `borsh` as a namespace: `import * as borsh from "borsh"`'
);
assert.equal(
  importNamespaceSpecifier?.local?.name,
  'borsh',
  'You should import `borsh` as a namespace named `borsh`: `import * as borsh from "borsh"`'
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

## 29

### --description--

Define a class named `HelloWorldAccount` whose constructor takes a single parameter named `fields`.

Then, assign the value of `fields.counter` to a property named `counter` on the instance, on the condition `fields` exists.

### --tests--

You should define a class named `HelloWorldAccount`.

```js
const classDeclaration = babelisedCode.getType('ClassDeclaration').find(c => {
  return c.id?.name === 'HelloWorldAccount';
});
assert.exists(
  classDeclaration,
  'You should define a class named `HelloWorldAccount`'
);
assert.equal(
  classDeclaration?.scope?.join(),
  'global',
  '`HelloWorldAccount` should be defined in the global scope'
);
```

You should define a constructor for `HelloWorldAccount` with a single parameter named `fields`.

```js
const classDeclaration = babelisedCode.getType('ClassDeclaration').find(c => {
  return c.id?.name === 'HelloWorldAccount';
});
const constructor = classDeclaration?.body?.body?.find(m => {
  return m.kind === 'constructor';
});
assert.exists(
  constructor,
  'You should define a constructor for `HelloWorldAccount`'
);
assert.equal(
  constructor?.params?.length,
  1,
  'The constructor for `HelloWorldAccount` should take a single parameter'
);
assert.equal(
  constructor?.params?.[0]?.name,
  'fields',
  'The constructor for `HelloWorldAccount` should take a single parameter named `fields`'
);
```

You should assign the value of `fields.counter` to `this.counter` only if `fields` is not `undefined`.

```js
const classDeclaration = babelisedCode.getType('ClassDeclaration').find(c => {
  return c.id?.name === 'HelloWorldAccount';
});
const constructor = classDeclaration?.body?.body?.find(m => {
  return m.kind === 'constructor';
});

const code = babelisedCode.generateCode(classDeclaration);

const testCode = `
${code}
const t = new HelloWorldAccount();
`;

try {
  const res = eval(testCode);
} catch (e) {
  assert.fail(
    `The constructor for \`HelloWorldAccount\` should not throw an error when called without any arguments.`
  );
}

// assert.fail('TODO: node-bug');
```

You should declare `HelloWorldAccount` before `ACCOUNT_SIZE`.

```js
const classDeclaration = babelisedCode.getType('ClassDeclaration').find(c => {
  return c.id?.name === 'HelloWorldAccount';
});
const variableDeclaration = babelisedCode.getVariableDeclarations().find(v => {
  return v.declarations?.[0]?.id?.name === 'ACCOUNT_SIZE';
});
assert.isBelow(
  classDeclaration?.end,
  variableDeclaration?.start,
  '`HelloWorldAccount` should be declared before `ACCOUNT_SIZE`'
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
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { readFile } from 'fs/promises';
import * as borsh from 'borsh';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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
    throw new Error('Data account info not found');
  }
}

export async function createAccount(
  connection,
  payer,
  programId,
  accountPubkey
) {
  const lamports = await connection.getMinimumBalanceForRentExemption(10000);
}

const ACCOUNT_SIZE = borsh.serialize(
  HelloWorldSchema,
  new HelloWorldAccount()
).length;
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
const variableDeclaration = babelisedCode.getVariableDeclarations().find(v => {
  return v.declarations?.[0]?.id?.name === 'HelloWorldSchema';
});
assert.exists(
  variableDeclaration,
  'You should define a variable named `HelloWorldSchema`'
);
assert.equal(
  variableDeclaration?.scope?.join(),
  'global',
  '`HelloWorldSchema` should be defined in the global scope'
);
```

You should set the value of `HelloWorldSchema` to the given schema.

```js
const variableDeclaration = babelisedCode.getVariableDeclarations().find(v => {
  return v.declarations?.[0]?.id?.name === 'HelloWorldSchema';
});
const newExpression = variableDeclaration?.declarations?.[0]?.init;
assert.equal(
  newExpression?.callee?.name,
  'Map',
  '`HelloWorldSchema` should use `Map(...)`'
);
assert.equal(
  newExpression?.type,
  'NewExpression',
  '`HelloWorldSchema` should be set to `new Map(...)`'
);
const arrayExpressionOne = newExpression?.arguments?.[0];
assert.equal(
  arrayExpressionOne?.type,
  'ArrayExpression',
  '`HelloWorldSchema` should use `Map([ ... ])`'
);
const arrayExpressionTwo = arrayExpressionOne?.elements?.[0];
assert.equal(
  arrayExpressionTwo?.type,
  'ArrayExpression',
  '`HelloWorldSchema` should use `Map([ [ ... ] ])`'
);
assert.equal(
  arrayExpressionTwo?.elements?.[0]?.name,
  'HelloWorldAccount',
  '`HelloWorldSchema` should use `Map([ [ HelloWorldAccount, ... ] ])`'
);
const objectExpression = arrayExpressionTwo?.elements?.[1];
assert.equal(
  objectExpression?.type,
  'ObjectExpression',
  '`HelloWorldSchema` should use `Map([ [ HelloWorldAccount, { ... } ] ])`'
);
const kindObjectProperty = objectExpression?.properties?.[0];
assert.equal(
  kindObjectProperty?.key?.name,
  'kind',
  '`HelloWorldSchema` should use `Map([ [ HelloWorldAccount, { kind: ... } ] ])`'
);
assert.equal(
  kindObjectProperty?.value?.value,
  'struct',
  '`HelloWorldSchema` should use `Map([ [ HelloWorldAccount, { kind: "struct" } ] ])`'
);
const fieldsObjectProperty = objectExpression?.properties?.[1];
assert.equal(
  fieldsObjectProperty?.key?.name,
  'fields',
  '`HelloWorldSchema` should use `Map([ [ HelloWorldAccount, { fields: ... } ] ])`'
);
assert.equal(
  fieldsObjectProperty?.value?.type,
  'ArrayExpression',
  '`HelloWorldSchema` should use `Map([ [ HelloWorldAccount, { fields: [ ... ] } ] ])`'
);
const arrayExpressionThree = fieldsObjectProperty?.value?.elements?.[0];
assert.equal(
  arrayExpressionThree?.type,
  'ArrayExpression',
  '`HelloWorldSchema` should use `Map([ [ HelloWorldAccount, { fields: [ [ ... ] ] } ] ])`'
);
assert.equal(
  arrayExpressionThree?.elements?.[0]?.value,
  'counter',
  '`HelloWorldSchema` should use `Map([ [ HelloWorldAccount, { fields: [ [ "counter", ... ] ] } ] ])`'
);
assert.equal(
  arrayExpressionThree?.elements?.[1]?.value,
  'u32',
  '`HelloWorldSchema` should use `Map([ [ HelloWorldAccount, { fields: [ [ "counter", "u32" ] ] } ] ])`'
);
```

You should declare `HelloWorldSchema` before `ACCOUNT_SIZE`.

```js
const hello = babelisedCode.getVariableDeclarations().find(v => {
  return v.declarations?.[0]?.id?.name === 'HelloWorldSchema';
});
const account = babelisedCode.getVariableDeclarations().find(v => {
  return v.declarations?.[0]?.id?.name === 'ACCOUNT_SIZE';
});

assert.isBelow(
  hello?.end,
  account?.start,
  '`HelloWorldSchema` should be declared before `ACCOUNT_SIZE`'
);
```

You should declare `HelloWorldSchema` after `HelloWorldAccount`.

```js
const schema = babelisedCode.getVariableDeclarations().find(v => {
  return v.declarations?.[0]?.id?.name === 'HelloWorldSchema';
});
const clas = babelisedCode.getType('ClassDeclaration').find(c => {
  return c.id?.name === 'HelloWorldAccount';
});

assert.isAbove(
  schema?.start,
  clas?.end,
  '`HelloWorldSchema` should be declared after `HelloWorldAccount`'
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

```javascript
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { readFile } from 'fs/promises';
import * as borsh from 'borsh';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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
    throw new Error('Data account info not found');
  }
}

export async function createAccount(
  connection,
  payer,
  programId,
  accountPubkey
) {
  const lamports = await connection.getMinimumBalanceForRentExemption(10000);
}

class HelloWorldAccount {
  constructor(fields) {
    if (fields) {
      this.counter = fields.counter;
    }
  }
}

const ACCOUNT_SIZE = borsh.serialize(
  HelloWorldSchema,
  new HelloWorldAccount()
).length;
```

## 31

### --description--

Within `createAccount`, replace the hard-coded value of `10000` with the `ACCOUNT_SIZE` constant.

### --tests--

You should replace the hard-coded value of `10000` with the `ACCOUNT_SIZE` constant.

```js
const createAccountFunctionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => {
    return f.id?.name === 'createAccount';
  });
const variableDeclaration = createAccountFunctionDeclaration?.body?.body?.find(
  v => {
    return v.declarations?.[0]?.id?.name === 'lamports';
  }
);
const awaitExpression = variableDeclaration?.declarations?.[0]?.init;
assert.equal(
  awaitExpression?.argument?.arguments?.[0]?.name,
  'ACCOUNT_SIZE',
  'You should replace the hard-coded value of `10000` with the `ACCOUNT_SIZE` constant'
);
```

You should declare `ACCOUNT_SIZE` before `createAccount`.

```js
const account = babelisedCode.getVariableDeclarations().find(v => {
  return v.declarations?.[0]?.id?.name === 'ACCOUNT_SIZE';
});
const createAccount = babelisedCode.getFunctionDeclarations().find(f => {
  return f.id?.name === 'createAccount';
});

const { end } = account;
const { start } = createAccount;

const { line: accountLine } = babelisedCode.getLineAndColumnFromIndex(end);
const { line: createAccountLine } =
  babelisedCode.getLineAndColumnFromIndex(start);

assert.isBelow(
  accountLine,
  createAccountLine,
  `'ACCOUNT_SIZE' declared on line ${accountLine}, but should be declared before ${createAccountLine}`
);

// Check HelloWorldSchema and HelloWorldAccount are declared before ACCOUNT_SIZE
const schema = babelisedCode.getVariableDeclarations().find(v => {
  return v.declarations?.[0]?.id?.name === 'HelloWorldSchema';
});
const clas = babelisedCode.getType('ClassDeclaration').find(c => {
  return c.id?.name === 'HelloWorldAccount';
});

assert.isBelow(
  schema?.end,
  account.start,
  '`HelloWorldSchema` should be declared before `ACCOUNT_SIZE`'
);
assert.isBelow(
  clas?.end,
  account.start,
  '`HelloWorldAccount` should be declared before `ACCOUNT_SIZE`'
);
// HelloWorldAccount should be declared before HelloWorldSchema
assert.isBelow(
  clas?.end,
  schema?.start,
  '`HelloWorldAccount` should be declared before `HelloWorldSchema`'
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

```javascript
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { readFile } from 'fs/promises';
import * as borsh from 'borsh';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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
    throw new Error('Data account info not found');
  }
}

export async function createAccount(
  connection,
  payer,
  programId,
  accountPubkey
) {
  const lamports = await connection.getMinimumBalanceForRentExemption(10000);
}

class HelloWorldAccount {
  constructor(fields) {
    if (fields) {
      this.counter = fields.counter;
    }
  }
}

const HelloWorldSchema = new Map([
  [HelloWorldAccount, { kind: 'struct', fields: [['counter', 'u32']] }]
]);

const ACCOUNT_SIZE = borsh.serialize(
  HelloWorldSchema,
  new HelloWorldAccount()
).length;
```

## 32

### --description--

In order to create the program data account, you need to define a `Transaction` that will be signed by the `payer` and sent to the network.

Within `createAccount`, create a new `Transaction` instance and store it in a variable named `transaction`.

_Be sure to import the `Transaction` class from `@solana/web3.js`_

### --tests--

You should create a new `Transaction` instance within `createAccount`.

```js
const transactionNewExpression = babelisedCode
  .getType('NewExpression')
  .find(n => {
    return n.callee?.name === 'Transaction';
  });
assert.exists(
  transactionNewExpression,
  'You should create a new `Transaction`'
);
assert.equal(
  transactionNewExpression?.scope?.join(),
  'global,createAccount,transaction',
  'You should create a new `Transaction` instance within `createAccount`'
);
```

You should store the result in a variable named `transaction`.

```js
const transactionVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => {
    return (
      v.declarations?.[0]?.id?.name === 'transaction' &&
      v.scope?.join() === 'global,createAccount'
    );
  });
assert.exists(
  transactionVariableDeclaration,
  'You should define a variable named `transaction`'
);
const newExpression = transactionVariableDeclaration?.declarations?.[0]?.init;
assert.equal(
  newExpression?.callee?.name,
  'Transaction',
  '`transaction` should be initialised with `new Transaction()`'
);
```

You should import `Transaction` from `@solana/web3.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(e => {
  return (
    e.source?.value === '@solana/web3.js' &&
    e.specifiers?.find(s => s.imported?.name === 'Transaction')
  );
});
assert.exists(
  importDeclaration,
  '`Transaction` should be imported from `@solana/web3.js`'
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
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { readFile } from 'fs/promises';
import * as borsh from 'borsh';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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
    throw new Error('Data account info not found');
  }
}

class HelloWorldAccount {
  constructor(fields) {
    if (fields) {
      this.counter = fields.counter;
    }
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
  const lamports = await connection.getMinimumBalanceForRentExemption(
    ACCOUNT_SIZE
  );
}
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
const variableDeclaration = babelisedCode.getVariableDeclarations().find(v => {
  return (
    v.declarations?.[0]?.id?.name === 'instruction' &&
    v.scope?.join() === 'global,createAccount'
  );
});
assert.exists(
  variableDeclaration,
  'You should define a variable named `instruction`'
);
```

You should set the value of `instruction` to the given object.

```js
const instructionVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => {
    return (
      v.declarations?.[0]?.id?.name === 'instruction' &&
      v.scope?.join() === 'global,createAccount'
    );
  });
const { end } = instructionVariableDeclaration;

assert.fail('TODO: use node-bug');
```

You should use the same seed you used in the `getAccountPubkey` function.

```js
assert.fail('TODO: use node-bug');
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
import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js';
import { readFile } from 'fs/promises';
import * as borsh from 'borsh';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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
    throw new Error('Data account info not found');
  }
}

class HelloWorldAccount {
  constructor(fields) {
    if (fields) {
      this.counter = fields.counter;
    }
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
  const lamports = await connection.getMinimumBalanceForRentExemption(
    ACCOUNT_SIZE
  );
  const transaction = new Transaction();
}
```

## 34

### --description--

TODO: Describe the System Program

Within `createAccount`, use the `createAccountWithSeed` method on the `SystemProgram` class from `@solana/web3.js`. Store the return in a variable named `tx`.

### --tests--

You should call `SystemProgram.createAccountWithSeed` within `createAccount`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.object?.name === 'SystemProgram' &&
    c.callee?.property?.name === 'createAccountWithSeed'
  );
});
assert.exists(
  callExpression,
  'You should call `SystemProgram.createAccountWithSeed`'
);
assert.include(
  callExpression?.scope?.join(),
  'global,createAccount',
  '`SystemProgram.CreateAccountWithSeed()` should be within `createAccount`'
);
```

You should pass `instruction` as the first argument to `createAccountWithSeed`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.object?.name === 'SystemProgram' &&
    c.callee?.property?.name === 'createAccountWithSeed'
  );
});
assert.equal(
  callExpression?.arguments?.[0]?.value,
  'instruction',
  '`instruction` should be the first argument to `createAccountWithSeed`'
);
```

You should assign the value to a variable named `tx`.

```js
const variableDeclaration = babelisedCode.getVariableDeclarations().find(v => {
  return v.declarations?.[0]?.id?.name === 't';
});
assert.exists(variableDeclaration, 'A `tx` variable declaration should exist');
assert.equal(
  variableDeclaration?.scope?.join(),
  'global,createAccount',
  '`tx` should be defined within `createAccount`'
);
const expression = variableDeclaration?.declarations?.[0]?.init;
assert.equal(
  expression?.argument?.callee?.object?.name,
  'SystemProgram',
  '`lamports` should be assigned the result of `SystemProgram.createAccountWithSeed(instruction)`'
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
import { Connection, Keypair, PublicKey, Transaction } from '@solana/web3.js';
import { readFile } from 'fs/promises';
import * as borsh from 'borsh';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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
    throw new Error('Data account info not found');
  }
}

class HelloWorldAccount {
  constructor(fields) {
    if (fields) {
      this.counter = fields.counter;
    }
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
}
```

## 35

### --description--

Within `createAccount`, use the `add` method on `transaction` to add the transaction with the instruction to create the program data account.

### --tests--

You should call `transaction.add` within `createAccount`.

```js
const expressionStatement = babelisedCode.getExpressionStatements().find(e => {
  return (
    e.expression?.callee?.property?.name === 'add' &&
    e.expression?.callee?.object?.name === 'transaction' &&
    e.scope?.join() === 'global,createAccount'
  );
});
assert.exists(
  expressionStatement,
  'You should call `transaction.add` within `createAccount`'
);
```

You should pass `tx` as the first argument to `transaction.add`.

```js
const expressionStatement = babelisedCode.getExpressionStatements().find(e => {
  return (
    e.expression?.callee?.property?.name === 'add' &&
    e.expression?.callee?.object?.name === 'transaction' &&
    e.scope?.join() === 'global,createAccount'
  );
});
const callExpression = expressionStatement?.expression?.arguments?.[0];
assert.fail('TODO');
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
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram
} from '@solana/web3.js';
import { readFile } from 'fs/promises';
import * as borsh from 'borsh';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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
    throw new Error('Data account info not found');
  }
}

class HelloWorldAccount {
  constructor(fields) {
    if (fields) {
      this.counter = fields.counter;
    }
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
}
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
const expressionStatement = babelisedCode.getExpressionStatements().find(e => {
  return (
    e.expression?.callee?.name === 'sendAndConfirmTransaction' &&
    e.scope.join() === 'global,createAccount'
  );
});
assert.exists(
  expressionStatement,
  'You should call `sendAndConfirmTransaction` within `createAccount`'
);
```

You should pass `connection` as the first argument.

```js
const expressionStatement = babelisedCode.getExpressionStatements().find(e => {
  return (
    e.expression?.callee?.name === 'sendAndConfirmTransaction' &&
    e.scope?.join() === 'global,createAccount'
  );
});
const callExpression = expressionStatement?.expression;
assert.equal(
  callExpression?.arguments?.[0]?.name,
  'connection',
  'You should pass `connection` as the first argument to `sendAndConfirmTransaction`'
);
```

You should pass `transaction` as the second argument.

```js
const expressionStatement = babelisedCode.getExpressionStatements().find(e => {
  return (
    e.expression?.callee?.name === 'sendAndConfirmTransaction' &&
    e.scope?.join() === 'global,createAccount'
  );
});
const callExpression = expressionStatement?.expression;
assert.equal(
  callExpression?.arguments?.[1]?.name,
  'transaction',
  'You should pass `transaction` as the second argument to `sendAndConfirmTransaction`'
);
```

You should pass `[payer]` as the third argument.

```js
const expressionStatement = babelisedCode.getExpressionStatements().find(e => {
  return (
    e.expression?.callee?.name === 'sendAndConfirmTransaction' &&
    e.scope?.join() === 'global,createAccount'
  );
});
const callExpression = expressionStatement?.expression;
assert.equal(
  callExpression?.arguments?.[2]?.elements?.[0]?.name,
  'payer',
  'You should pass `[payer]` as the third argument to `sendAndConfirmTransaction`'
);
```

You should await the result of `sendAndConfirmTransaction`.

```js
const expressionStatement = babelisedCode.getExpressionStatements().find(e => {
  return (
    e.expression?.callee?.name === 'sendAndConfirmTransaction' &&
    e.scope?.join() === 'global,createAccount'
  );
});
assert.equal(
  expressionStatement?.expression?.await,
  true,
  'You should await the result of `sendAndConfirmTransaction`'
);
```

You should import `sendAndConfirmTransaction` from `@solana/web3.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(e => {
  return (
    e.source?.value === '@solana/web3.js' &&
    e.specifiers?.find(s => s.imported?.name === 'sendAndConfirmTransaction')
  );
});
assert.exists(
  importDeclaration,
  'You should import `sendAndConfirmTransaction` from `@solana/web3.js`'
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
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram
} from '@solana/web3.js';
import { readFile } from 'fs/promises';
import * as borsh from 'borsh';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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
    throw new Error('Data account info not found');
  }
}

class HelloWorldAccount {
  constructor(fields) {
    if (fields) {
      this.counter = fields.counter;
    }
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
}
```

## 37

### --description--

Within `checkProgram`, instead of throwing an error when the program data account is not found, create the program data account.

### --tests--

You should no longer throw an error when the program data account is not found.

```js
const { checkProgram } = await __helpers.importSansCache(
  '../learn-how-to-interact-with-on-chain-programs/src/client/hello-world.js'
);

const connection = {
  getAccountInfo: a => (a === 'accountPubkey' ? null : { executable: true }),
  getMinimumBalanceForRentExemption: s => 10
};
const payer = {
  publicKey: 'payer'
};
const programId = 'programId';
const accountPubkey = 'accountPubkey';
try {
  await checkProgram(connection, payer, programId, accountPubkey);
} catch (e) {
  if (!(e instanceof TypeError)) {
    assert.fail(
      'You should no longer throw an error when the program data account is not found'
    );
  }
}
```

You should call `createAccount` within `checkProgram`.

```js
const expressionStatement = babelisedCode.getExpressionStatements().find(e => {
  return (
    e.expression?.argument?.callee?.name === 'createAccount' &&
    e.scope?.join() === 'global,checkProgram'
  );
});
assert.exists(
  expressionStatement,
  'You should call `createAccount` within `checkProgram`'
);
```

You should pass `connection` as the first argument.

```js
const expressionStatement = babelisedCode.getExpressionStatements().find(e => {
  return (
    e.expression?.argument?.callee?.name === 'createAccount' &&
    e.scope?.join() === 'global,checkProgram'
  );
});
const callExpression = expressionStatement?.expression?.argument;
assert.equal(
  callExpression?.arguments?.[0]?.name,
  'connection',
  'You should pass `connection` as the first argument'
);
```

You should pass `payer` as the second argument.

```js
const expressionStatement = babelisedCode.getExpressionStatements().find(e => {
  return (
    e.expression?.argument?.callee?.name === 'createAccount' &&
    e.scope?.join() === 'global,checkProgram'
  );
});
const callExpression = expressionStatement?.expression?.argument;
assert.equal(
  callExpression?.arguments?.[1]?.name,
  'payer',
  'You should pass `payer` as the second argument'
);
```

You should pass `programId` as the third argument.

```js
const expressionStatement = babelisedCode.getExpressionStatements().find(e => {
  return (
    e.expression?.argument?.callee?.name === 'createAccount' &&
    e.scope?.join() === 'global,checkProgram'
  );
});
const callExpression = expressionStatement?.expression?.argument;
assert.equal(
  callExpression?.arguments?.[2]?.name,
  'programId',
  'You should pass `programId` as the third argument'
);
```

You should pass `accountPubkey` as the fourth argument.

```js
const expressionStatement = babelisedCode.getExpressionStatements().find(e => {
  return (
    e.expression?.argument?.callee?.name === 'createAccount' &&
    e.scope?.join() === 'global,checkProgram'
  );
});
const callExpression = expressionStatement?.expression?.argument;
assert.equal(
  callExpression?.arguments?.[3]?.name,
  'accountPubkey',
  'You should pass `accountPubkey` as the fourth argument'
);
```

You should await the result of `createAccount`.

```js
const expressionStatement = babelisedCode.getExpressionStatements().find(e => {
  return (
    e.expression?.argument?.callee?.name === 'createAccount' &&
    e.scope?.join() === 'global,checkProgram'
  );
});
const callExpression = expressionStatement?.expression;
assert.equal(
  callExpression?.type,
  'AwaitExpression',
  'You should await the result of `createAccount`'
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
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction
} from '@solana/web3.js';
import { readFile } from 'fs/promises';
import * as borsh from 'borsh';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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
    throw new Error('Data account info not found');
  }
}

class HelloWorldAccount {
  constructor(fields) {
    if (fields) {
      this.counter = fields.counter;
    }
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
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'sayHello');
assert.exists(
  functionDeclaration,
  'You should define a function with the handle `sayHello`'
);
```

You should define `sayHello` with a first parameter named `connection`.

```js
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'sayHello');
const parameter = functionDeclaration?.params?.[0];
assert.equal(
  parameter?.name,
  'connection',
  'You should define `sayHello` with a first parameter named `connection`'
);
```

You should define `sayHello` with a second parameter named `payer`.

```js
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'sayHello');
const parameter = functionDeclaration?.params?.[1];
assert.equal(
  parameter?.name,
  'payer',
  'You should define `sayHello` with a second parameter named `payer`'
);
```

You should define `sayHello` with a third parameter named `programId`.

```js
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'sayHello');
const parameter = functionDeclaration?.params?.[2];
assert.equal(
  parameter?.name,
  'programId',
  'You should define `sayHello` with a third parameter named `programId`'
);
```

You should define `sayHello` with a fourth parameter named `accountPubkey`.

```js
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'sayHello');
const parameter = functionDeclaration?.params?.[3];
assert.equal(
  parameter?.name,
  'accountPubkey',
  'You should define `sayHello` with a fourth parameter named `accountPubkey`'
);
```

You should define `sayHello` as an asynchronous function.

```js
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'sayHello');
assert.isTrue(
  functionDeclaration?.async,
  'You should define `sayHello` as an asynchronous function'
);
```

You should define `sayHello` to be a named export.

```js
const exportNamedDeclaration = babelisedCode
  .getType('ExportNamedDeclaration')
  .find(e => e.declaration?.id?.name === 'sayHello');
assert.exists(
  exportNamedDeclaration,
  'You should define `sayHello` to be a named export'
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
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction
} from '@solana/web3.js';
import { readFile } from 'fs/promises';
import * as borsh from 'borsh';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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

class HelloWorldAccount {
  constructor(fields) {
    if (fields) {
      this.counter = fields.counter;
    }
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
const variableDeclaration = babelisedCode.getVariableDeclarations().find(v => {
  return (
    v.declarations?.[0]?.id?.name === 'transaction' &&
    v.scope.join() === 'global,sayHello'
  );
});
assert.exists(
  variableDeclaration,
  'You should define a variable named `transaction`, within `sayHello`'
);
```

You should give `transaction` a value of the above object literal.

```js
assert.fail('TODO: test interpretted value');
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
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction
} from '@solana/web3.js';
import { readFile } from 'fs/promises';
import * as borsh from 'borsh';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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

class HelloWorldAccount {
  constructor(fields) {
    if (fields) {
      this.counter = fields.counter;
    }
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

export async function sayHello(connection, payer, programId, accountPubkey) {}
```

## 40

### --description--

Within `sayHello`, define an `instruction` variable to be a new instance `TransactionInstruction` from `@solana/web3.js`. The constructor expects your transaction object as an argument.

### --tests--

You should define a variable named `instruction`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(
    v =>
      v.declarations?.[0]?.id?.name === 'instruction' &&
      v.scope.join() === 'global,sayHello'
  );
assert.exists(
  variableDeclaration,
  'You should define a variable named `instruction`, within `sayHello`'
);
```

You should give `instruction` a value of `new TransactionInstruction(transaction)`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(
    v =>
      v.declarations?.[0]?.id?.name === 'instruction' &&
      v.scope.join() === 'global,sayHello'
  );
const newExpression = variableDeclaration?.declarations?.[0]?.init;
assert.exists(
  newExpression,
  'You should give `instruction` a value of `new ...`'
);
assert.equal(
  newExpression?.callee?.name,
  'TransactionInstruction',
  'You should give `instruction` a value of `new TransactionInstruction`'
);

const transactionArgument = newExpression?.arguments?.[0];
assert.equal(
  transactionArgument?.name,
  'transaction',
  'You should give `instruction` a value of `new TransactionInstruction(transaction)`'
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
import {
  Connection,
  Keypair,
  PublicKey,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction
} from '@solana/web3.js';
import { readFile } from 'fs/promises';
import * as borsh from 'borsh';

export function establishConnection() {
  return new Connection('http://localhost:8899');
}

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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

class HelloWorldAccount {
  constructor(fields) {
    if (fields) {
      this.counter = fields.counter;
    }
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

export async function sayHello(connection, payer, programId, accountPubkey) {
  const transaction = {
    keys: [{ pubkey: accountPubkey, isSigner: false, isWritable: true }],
    programId,
    data: Buffer.alloc(0)
  };
}
```

## 41

### --description--

Now, send and confirm the transaction.

### --tests--

You should call `sendAndConfirmTransaction` within `sayHello`.

```js
const expressionStatement = babelisedCode.getExpressionStatements().find(e => {
  return (
    e.expression?.argument?.callee?.name === 'sendAndConfirmTransaction' &&
    e.scope.join() === 'global,sayHello'
  );
});
assert.exists(
  expressionStatement,
  'You should call `sendAndConfirmTransaction` within `sayHello`'
);
```

Calling `sayHello` should send the correct transaction with `sendAndConfirmTransaction(connection, new Transaction().add(instruction), [payer])`.

```js
assert.fail(
  'TODO: use node-bug to test function. spy on sendAndConfirmTransaction'
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

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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

class HelloWorldAccount {
  constructor(fields) {
    if (fields) {
      this.counter = fields.counter;
    }
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

export async function sayHello(connection, payer, programId, accountPubkey) {
  const transaction = {
    keys: [{ pubkey: accountPubkey, isSigner: false, isWritable: true }],
    programId,
    data: Buffer.alloc(0)
  };
  const instruction = new TransactionInstruction(transaction);
}
```

## 42

### --description--

Within `main.js` in the `main` function, create a variable named `programId` and use the function you created to assign it the program id.

### --tests--

You should define a variable named `programId`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(
    v =>
      v.declarations?.[0]?.id?.name === 'programId' &&
      v.scope.join() === 'global,main'
  );
assert.exists(
  variableDeclaration,
  'You should define a variable named `programId`, within `main`'
);
```

You should assign `programId` the value of `await getProgramId()`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(
    v =>
      v.declarations?.[0]?.id?.name === 'programId' &&
      v.scope.join() === 'global,main'
  );
const awaitExpression = variableDeclaration?.declarations?.[0]?.init;
assert.equal(awaitExpression?.type, 'AwaitExpression');
assert.equal(
  awaitExpression?.argument?.callee?.name,
  'getProgramId',
  'You should assign `programId` the value of `await getProgramId()`'
);
```

You should import `getProgramId` from `./hello-world.js`.

```js
const importDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => i.source.value === './hello-world.js');
assert.exists(importDeclaration, 'You should import from `./hello-world.js`');
const importSpecifier = importDeclaration?.specifiers?.find(
  s => s.imported.name === 'getProgramId'
);
assert.exists(
  importSpecifier,
  'You should import `getProgramId` from `./hello-world.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/main.js'
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

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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

class HelloWorldAccount {
  constructor(fields) {
    if (fields) {
      this.counter = fields.counter;
    }
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

export async function sayHello(connection, payer, programId, accountPubkey) {
  const transaction = {
    keys: [{ pubkey: accountPubkey, isSigner: false, isWritable: true }],
    programId,
    data: Buffer.alloc(0)
  };
  const instruction = new TransactionInstruction(transaction);
  await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [payer]
  );
}
```

## 43

### --description--

Within `main`, create a variable named `payer` and use the function you created to assign it the payer.

### --tests--

You should define a variable named `payer`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(
    v =>
      v.declarations?.[0]?.id?.name === 'payer' &&
      v.scope.join() === 'global,main'
  );
assert.exists(
  variableDeclaration,
  'You should define a variable named `payer`, within `main`'
);
```

You should assign `payer` the value of `establishPayer()`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(
    v =>
      v.declarations?.[0]?.id?.name === 'payer' &&
      v.scope.join() === 'global,main'
  );
const callExpression = variableDeclaration?.declarations?.[0]?.init;
assert.equal(
  callExpression?.callee?.name,
  'establishPayer',
  'You should assign `payer` the value of `await establishPayer(connection)`'
);
```

You should import `establishPayer` from `./hello-world.js`.

```js
const importDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => i.source.value === './hello-world.js');
assert.exists(importDeclaration, 'You should import from `./hello-world.js`');
const importSpecifier = importDeclaration?.specifiers?.find(
  s => s.imported.name === 'establishPayer'
);
assert.exists(
  importSpecifier,
  'You should import `establishPayer` from `./hello-world.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/main.js'
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
import { establishConnection, getProgramId } from './hello-world.js';

async function main() {
  console.log(`Saying 'hello' to a Solana account`);
  const connection = establishConnection();
  const programId = await getProgramId();
}

await main();
```

## 44

### --description--

Within `main`, create a variable named `accountPubkey` and use the function you created to assign it the account pubkey.

### --tests--

You should define a variable named `accountPubkey`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(
    v =>
      v.declarations?.[0]?.id?.name === 'accountPubkey' &&
      v.scope.join() === 'global,main'
  );
assert.exists(
  variableDeclaration,
  'You should define a variable named `accountPubkey`, within `main`'
);
```

You should assign `accountPubkey` the value of `await getAccountPubkey(payer, programId)`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(
    v =>
      v.declarations?.[0]?.id?.name === 'accountPubkey' &&
      v.scope.join() === 'global,main'
  );
const awaitExpression = variableDeclaration?.declarations?.[0]?.init;
assert.equal(awaitExpression?.type, 'AwaitExpression');
assert.equal(
  awaitExpression?.argument?.callee?.name,
  'getAccountPubkey',
  'You should assign `accountPubkey` the value of `await getAccountPubkey(payer, programId)`'
);
```

You should import `getAccountPubkey` from `./hello-world.js`.

```js
const importDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => i.source.value === './hello-world.js');
assert.exists(importDeclaration, 'You should import from `./hello-world.js`');
const importSpecifier = importDeclaration?.specifiers?.find(
  s => s.imported.name === 'getAccountPubkey'
);
assert.exists(
  importSpecifier,
  'You should import `getAccountPubkey` from `./hello-world.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/main.js'
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
import {
  establishConnection,
  establishPayer,
  getProgramId
} from './hello-world.js';

async function main() {
  console.log(`Saying 'hello' to a Solana account`);
  const connection = establishConnection();
  const programId = await getProgramId();
  const payer = establishPayer();
}

await main();
```

## 45

### --description--

Within `main`, ensure the program account is deployed, and the program data account is created.

### --tests--

You should call `await checkProgram(connection, payer, programId, accountPubkey)` within `main`.

```js
const expressionStatement = babelisedCode
  .getExpressionStatements()
  .find(e => e.expression?.argument?.callee?.name === 'checkProgram');
assert.exists(expressionStatement, 'You should call `checkProgram`');
assert.equal(
  expressionStatement?.scope?.join(),
  'global,main',
  'You should call `checkProgram` within `main`'
);
const awaitExpression = expressionStatement?.expression;
assert.equal(awaitExpression?.type, 'AwaitExpression');
const args = awaitExpression?.argument?.arguments;
const [connection, payer, programId, accountPubkey] = args;
assert.equal(
  connection?.name,
  'connection',
  '`connection` should be the first argument'
);
assert.equal(payer?.name, 'payer', '`payer` should be the second argument');
assert.equal(
  programId?.name,
  'programId',
  '`programId` should be the third argument'
);
assert.equal(
  accountPubkey?.name,
  'accountPubkey',
  '`accountPubkey` should be the fourth argument'
);
```

You should import `checkProgram` from `./hello-world.js`.

```js
const importDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => i.source.value === './hello-world.js');
assert.exists(importDeclaration, 'You should import from `./hello-world.js`');
const importSpecifier = importDeclaration?.specifiers?.find(
  s => s.imported.name === 'checkProgram'
);
assert.exists(
  importSpecifier,
  'You should import `checkProgram` from `./hello-world.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/main.js'
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
import {
  establishConnection,
  establishPayer,
  getAccountPubkey,
  getProgramId
} from './hello-world.js';

async function main() {
  console.log(`Saying 'hello' to a Solana account`);
  const connection = establishConnection();
  const programId = await getProgramId();
  const payer = establishPayer();
  const accountPubkey = await getAccountPubkey(payer, programId);
}

await main();
```

## 46

### --description--

Within `main`, say hello to the program.

### --tests--

You should call `await sayHello(connection, payer, programId, accountPubkey)` within `main`.

```js
const expressionStatement = babelisedCode
  .getExpressionStatements()
  .find(e => e.expression?.argument?.callee?.name === 'sayHello');
assert.exists(expressionStatement, 'You should call `sayHello`');
assert.equal(
  expressionStatement?.scope?.join(),
  'global,main',
  'You should call `sayHello` within `main`'
);
const awaitExpression = expressionStatement?.expression;
assert.equal(awaitExpression?.type, 'AwaitExpression');
const args = awaitExpression?.argument?.arguments;
const [connection, payer, programId, accountPubkey] = args;
assert.equal(
  connection?.name,
  'connection',
  '`connection` should be the first argument'
);
assert.equal(payer?.name, 'payer', '`payer` should be the second argument');
assert.equal(
  programId?.name,
  'programId',
  '`programId` should be the third argument'
);
assert.equal(
  accountPubkey?.name,
  'accountPubkey',
  '`accountPubkey` should be the fourth argument'
);
```

You should import `sayHello` from `./hello-world.js`.

```js
const importDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => i.source.value === './hello-world.js');
assert.exists(importDeclaration, 'You should import from `./hello-world.js`');
const importSpecifier = importDeclaration?.specifiers?.find(
  s => s.imported.name === 'sayHello'
);
assert.exists(
  importSpecifier,
  'You should import `sayHello` from `./hello-world.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/main.js'
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
import {
  checkProgram,
  establishConnection,
  establishPayer,
  getAccountPubkey,
  getProgramId
} from './hello-world.js';

async function main() {
  console.log(`Saying 'hello' to a Solana account`);
  const connection = establishConnection();
  const programId = await getProgramId();
  const payer = establishPayer();
  const accountPubkey = await getAccountPubkey(payer, programId);
  await checkProgram(connection, payer, programId, accountPubkey);
}

await main();
```

## 47

### --description--

Test your script by using `node` to run it.

### --tests--

You should run `node src/client/main.js` from the `learn-how-to-interact-with-on-chain-programs` directory.

```js
const lastCommand = __helpers.getLastCommand();
assert.equal(
  lastCommand.trim(),
  'node src/client/main.js',
  'You should run `node src/client/main.js` from the `learn-how-to-interact-with-on-chain-programs` directory'
);
```

### --seed--

#### --"src/client/main.js"--

```js
import {
  checkProgram,
  establishConnection,
  establishPayer,
  getAccountPubkey,
  getProgramId,
  sayHello
} from './hello-world.js';

async function main() {
  console.log(`Saying 'hello' to a Solana account`);
  const connection = establishConnection();
  const programId = await getProgramId();
  const payer = establishPayer();
  const accountPubkey = await getAccountPubkey(payer, programId);
  await checkProgram(connection, payer, programId, accountPubkey);
  await sayHello(connection, payer, programId, accountPubkey);
}

await main();
```

## 48

### --description--

Now that you can say hello to the program, you will want to find out how many times the program has been said "hello" to.

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
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'getHelloCount');
assert.exists(
  functionDeclaration,
  'You should define a function with the handle `getHelloCount`'
);
```

You should define `getHelloCount` with a first parameter named `connection`.

```js
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'getHelloCount');
const [connection] = functionDeclaration?.params;
assert.equal(
  connection?.name,
  'connection',
  'You should define `getHelloCount` with a first parameter named `connection`'
);
```

You should define `getHelloCount` with a second parameter named `accountPubkey`.

```js
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'getHelloCount');
const [, accountPubkey] = functionDeclaration?.params;
assert.equal(
  accountPubkey?.name,
  'accountPubkey',
  'You should define `getHelloCount` with a second parameter named `accountPubkey`'
);
```

You should define `getHelloCount` as an asynchronous function.

```js
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'getHelloCount');
assert.isTrue(
  functionDeclaration?.async,
  'You should define `getHelloCount` as an asynchronous function'
);
```

You should define `getHelloCount` to be a named export.

```js
const exportNamedDeclaration = babelisedCode
  .getType('ExportNamedDeclaration')
  .find(e => e.declaration?.id?.name === 'getHelloCount');
assert.exists(
  exportNamedDeclaration,
  'You should define `getHelloCount` to be a named export'
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

## 49

### --description--

Within `getHelloCount`, create an `accountInfo` variable with a value of the account info for the public key passed as a parameter.

### --tests--

You should define a variable named `accountInfo`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(
    v =>
      v.declarations?.[0]?.id?.name === 'accountInfo' &&
      v.scope.join() === 'global,getHelloCount'
  );
assert.exists(
  variableDeclaration,
  'You should define a variable named `accountInfo`'
);
```

You should assign `accountInfo` the value of `await connection.getAccountInfo(accountPubkey)`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(
    v =>
      v.declarations?.[0]?.id?.name === 'accountInfo' &&
      v.scope.join() === 'global,getHelloCount'
  );
const awaitExpression = variableDeclaration?.declarations[0]?.init;
const callExpression = awaitExpression?.argument;
assert.equal(
  callExpression?.callee?.object?.name,
  'connection',
  'You should assign `accountInfo` the value of `await connection.getAccountInfo(accountPubkey)`'
);
assert.equal(
  callExpression?.callee?.property?.name,
  'getAccountInfo',
  'You should assign `accountInfo` the value of `await connection.getAccountInfo(accountPubkey)`'
);
assert.equal(
  callExpression?.arguments?.[0]?.name,
  'accountPubkey',
  'You should assign `accountInfo` the value of `await connection.getAccountInfo(accountPubkey)`'
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

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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

class HelloWorldAccount {
  constructor(fields) {
    if (fields) {
      this.counter = fields.counter;
    }
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

export async function sayHello(connection, payer, programId, accountPubkey) {
  const transaction = {
    keys: [{ pubkey: accountPubkey, isSigner: false, isWritable: true }],
    programId,
    data: Buffer.alloc(0)
  };
  const instruction = new TransactionInstruction(transaction);
  await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [payer]
  );
}

export async function getHelloCount(connection, accountPubkey) {}
```

## 50

### --description--

In order to read the data from an account, you need to deserialize it based on the program's schema.

Within `getHelloCount`, create a `greeting` variable with a value of:

```javascript
borsh.deserialize(<SCHEMA>, <CLASS_TYPE>, <ACCOUNT_DATA>)
```

### --tests--

You should define a variable named `greeting`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(
    v =>
      v.declarations[0].id.name === 'greeting' &&
      v.scope.join() === 'global,getHelloCount'
  );
assert.exists(
  variableDeclaration,
  'You should define a variable named `greeting`'
);
```

You should give `greeting` a value of `borsh.deserialize(HelloWorldSchema, HelloWorldAccount, accountInfo.data)`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(
    v =>
      v.declarations[0].id.name === 'greeting' &&
      v.scope.join() === 'global,getHelloCount'
  );
const callExpression = variableDeclaration?.declarations[0]?.init;
assert.equal(
  callExpression?.callee?.object?.name,
  'borsh',
  'You should give `greeting` a value of `borsh...()`'
);
assert.equal(
  callExpression?.callee?.property?.name,
  'deserialize',
  'You should give `greeting` a value of `borsh.deserialize()`'
);
assert.equal(
  callExpression?.arguments[0]?.name,
  'HelloWorldSchema',
  'You should give `greeting` a value of `borsh.deserialize(HelloWorldSchema)`'
);
assert.equal(
  callExpression?.arguments[1]?.name,
  'HelloWorldAccount',
  'You should give `greeting` a value of `borsh.deserialize(, HelloWorldAccount)`'
);
assert.equal(
  callExpression?.arguments[2]?.object?.name,
  'accountInfo',
  'You should give `greeting` a value of `borsh.deserialize(, , accountInfo.data)`'
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

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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

class HelloWorldAccount {
  constructor(fields) {
    if (fields) {
      this.counter = fields.counter;
    }
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

export async function sayHello(connection, payer, programId, accountPubkey) {
  const transaction = {
    keys: [{ pubkey: accountPubkey, isSigner: false, isWritable: true }],
    programId,
    data: Buffer.alloc(0)
  };
  const instruction = new TransactionInstruction(transaction);
  await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [payer]
  );
}

export async function getHelloCount(connection, accountPubkey) {
  const accountInfo = await connection.getAccountInfo(accountPubkey);
}
```

## 51

### --description--

Within `getHelloCount`, return the `counter` property of the `greeting` variable.

### --tests--

You should return the `counter` property of `greeting`.

```js
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'getHelloCount');
const returnStatement = functionDeclaration?.body?.body?.find(
  b => b.type === 'ReturnStatement'
);
assert.exists(returnStatement, '`getHelloCount` should return');
assert.equal(
  returnStatement?.argument?.object?.name,
  'greeting',
  'You should return the `counter` property of `greeting`'
);
assert.equal(
  returnStatement?.argument?.property?.name,
  'counter',
  'You should return the `counter` property of `greeting`'
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

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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

class HelloWorldAccount {
  constructor(fields) {
    if (fields) {
      this.counter = fields.counter;
    }
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

export async function sayHello(connection, payer, programId, accountPubkey) {
  const transaction = {
    keys: [{ pubkey: accountPubkey, isSigner: false, isWritable: true }],
    programId,
    data: Buffer.alloc(0)
  };
  const instruction = new TransactionInstruction(transaction);
  await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [payer]
  );
}

export async function getHelloCount(connection, accountPubkey) {
  const accountInfo = await connection.getAccountInfo(accountPubkey);
  const greeting = borsh.deserialize(
    HelloWorldSchema,
    HelloWorldAccount,
    accountInfo.data
  );
}
```

## 52

### --description--

Within `main.js` in the `main` function, get the hello count, and store it in a variable named `helloCount`.

### --tests--

You should define a variable named `helloCount`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(
    v =>
      v.declarations?.[0]?.id?.name === 'helloCount' &&
      v.scope.join() === 'global,main'
  );
assert.exists(
  variableDeclaration,
  'You should define a variable named `helloCount`'
);
```

You should assign `helloCount` the value of `await getHelloCount(connection, accountPubkey)`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(
    v =>
      v.declarations?.[0]?.id?.name === 'helloCount' &&
      v.scope.join() === 'global,main'
  );
const awaitExpression = variableDeclaration?.declarations[0]?.init;
const callExpression = awaitExpression?.argument;
assert.equal(
  callExpression?.callee?.name,
  'getHelloCount',
  'You should assign `helloCount` the value of `await getHelloCount`'
);
assert.equal(
  callExpression?.arguments[0]?.name,
  'connection',
  'You should assign `helloCount` the value of `await getHelloCount(connection, ...)`'
);
assert.equal(
  callExpression?.arguments[1]?.name,
  'accountPubkey',
  'You should assign `helloCount` the value of `await getHelloCount(..., accountPubkey)`'
);
```

You should import `getHelloCount` from `./hello-world.js`.

```js
const importDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => i.source.value === './hello-world.js');
const importSpecifier = importDeclaration?.specifiers?.find(
  s => s.imported.name === 'getHelloCount'
);
assert.exists(
  importSpecifier,
  'You should import `getHelloCount` from `./hello-world.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/main.js'
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

export function establishPayer() {
  return Keypair.generate();
}

export async function getProgramId() {
  const secretKeyString = await readFile(
    'dist/program/helloworld-keypair.json',
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

class HelloWorldAccount {
  constructor(fields) {
    if (fields) {
      this.counter = fields.counter;
    }
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

export async function sayHello(connection, payer, programId, accountPubkey) {
  const transaction = {
    keys: [{ pubkey: accountPubkey, isSigner: false, isWritable: true }],
    programId,
    data: Buffer.alloc(0)
  };
  const instruction = new TransactionInstruction(transaction);
  await sendAndConfirmTransaction(
    connection,
    new Transaction().add(instruction),
    [payer]
  );
}

export async function getHelloCount(connection, accountPubkey) {
  const accountInfo = await connection.getAccountInfo(accountPubkey);
  const greeting = borsh.deserialize(
    HelloWorldSchema,
    HelloWorldAccount,
    accountInfo.data
  );
  return greeting.counter;
}
```

## 53

### --description--

Within `main`, log the `helloCount` variable value.

### --tests--

You should log the `helloCount` variable value.

```js
const expressionStatement = babelisedCode.getExpressionStatements().find(e => {
  const callExpression = e.expression;
  const object = callExpression?.callee?.object;
  const property = callExpression?.callee?.property;
  const helloCountInArgs = callExpression?.arguments?.some(
    a =>
      a.name === 'helloCount' ||
      a.expressions?.find(e => e.name === 'helloCount')
  );
  return (
    object?.name === 'console' &&
    ['log', 'info', 'error', 'debug', 'table'].includes(property?.name) &&
    helloCountInArgs
  );
});
assert.exists(
  expressionStatement,
  'You should log the `helloCount` variable value'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-how-to-interact-with-on-chain-programs/src/client/main.js'
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
import {
  checkProgram,
  establishConnection,
  establishPayer,
  getAccountPubkey,
  getHelloCount,
  getProgramId,
  sayHello
} from './hello-world.js';

async function main() {
  console.log(`Saying 'hello' to a Solana account`);
  const connection = establishConnection();
  const programId = await getProgramId();
  const payer = establishPayer();
  const accountPubkey = await getAccountPubkey(payer, programId);
  await checkProgram(connection, payer, programId, accountPubkey);
  await sayHello(connection, payer, programId, accountPubkey);
  const helloCount = await getHelloCount(connection, accountPubkey);
}

await main();
```

## 54

### --description--

Use Nodejs to execute the `main.js` script.

### --tests--

You should run `node src/client/main.js` in the terminal.

```js
const lastCommand = __helpers.getLastCommand();
assert.equal(
  lastCommand.trim(),
  'node src/client/main.js',
  'You should run `node src/client/main.js` in the terminal'
);
```

### --seed--

#### --"src/client/main.js"--

```js
import {
  checkProgram,
  establishConnection,
  establishPayer,
  getAccountPubkey,
  getHelloCount,
  getProgramId,
  sayHello
} from './hello-world.js';

async function main() {
  console.log(`Saying 'hello' to a Solana account`);
  const connection = establishConnection();
  const programId = await getProgramId();
  const payer = establishPayer();
  const accountPubkey = await getAccountPubkey(payer, programId);
  await checkProgram(connection, payer, programId, accountPubkey);
  await sayHello(connection, payer, programId, accountPubkey);
  const helloCount = await getHelloCount(connection, accountPubkey);
  console.log(`Hello count: ${helloCount}`);
}

await main();
```

## 55

### --description--

Contratulations on finishing this project! Feel free to play with your code.

🎆

Once you are done, enter `done` in the terminal.

### --tests--

You should enter `done` in the terminal

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## --fcc-end
