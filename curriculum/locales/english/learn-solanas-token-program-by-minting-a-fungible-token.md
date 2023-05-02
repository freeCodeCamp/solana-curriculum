# Solana - Learn Solana's Token Program by Minting a Fungible Token

## 1

### --description--

In this project, you will learn how to create a <dfn title="A digitally transferable asset whose supply is alterable.">fungible token</dfn> on the Solana blockchain. You will be able to create your own token, and mint an unlimited supply of that token. You will be able to send your tokens to other Solana wallets.

For the duration of this project, you will be working in the `learn-solanas-token-program-by-minting-a-fungible-token/` directory.

Change into the above directory in a new bash terminal.

### --tests--

You can use `cd` to change into the `learn-solanas-token-program-by-minting-a-fungible-token/` directory.

```js
const cwdFile = await __helpers.getCWD();
const cwd = cwdFile.split('\n').filter(Boolean).pop();
assert.include(cwd, 'learn-solanas-token-program-by-minting-a-fungible-token');
```

## 2

### --description--

Previously, you interacted with the _System Program_ to create accounts. Now, you will interact with the _Token Program_ to work with fungible tokens.

Creating a <dfn title="A digitally transferable asset whose supply is alterable.">fungible token</dfn> on Solana requires the following steps:

1. Creating a _Mint_ account
2. Creating a _Token_ account
3. Minting tokens

Create a file named `create-mint-account.js`.

### --tests--

You should have a `create-mint-account.js` file.

```js
const fileExists = __helpers.fileExists(
  'learn-solanas-token-program-by-minting-a-fungible-token/create-mint-account.js'
);
assert.isTrue(fileExists);
```

## 3

### --description--

Within `create-mint-account.js`, declare a variable `connection`, and assign it a new instance of the `Connection` class. Pass in your local Solana RPC URL as the first argument.

### --tests--

You should have `const connection = new Connection('http://localhost:8899');` in `create-mint-account.js`.

```js
const connectionVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'connection');
assert.exists(
  connectionVariableDeclaration,
  'You should declare a variable named `connection`'
);
const newExpression = connectionVariableDeclaration.declarations[0].init;
assert.equal(
  newExpression.callee.name,
  'Connection',
  'You should initialise `connection` with a new `Connection`'
);
assert.equal(
  newExpression.arguments[0].value,
  'http://localhost:8899',
  "You should create a new connection with `new Connection('http://localhost:8899')`"
);
```

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

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/create-mint-account.js'
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
touch create-mint-account.js
```

## 4

### --description--

You will need the `@solana/spl-token` package, as well as the `@solana/web3.js` package to interact with the _Token Program_.

Install both packages using `npm`.

### --tests--

You should have at least version `1.70.0` of `@solana/web3.js` added to the `package.json` dependencies.

```js
const packageJson = JSON.parse(
  await __helpers.getFile(
    './learn-solanas-token-program-by-minting-a-fungible-token/package.json'
  )
);
const web3Version = packageJson.dependencies?.['@solana/web3.js'];
assert.exists(
  web3Version,
  'You should have `@solana/web3.js` in your dependencies'
);
// Manually check SemVer is at least 1.70.0
const web3VersionParts = web3Version.split('.').map(p => p.replace(/\D/g, ''));
assert.isAtLeast(
  parseInt(web3VersionParts[0]),
  1,
  '`@solana/web3.js` should have a major version of at least 1'
);
assert.isAtLeast(
  parseInt(web3VersionParts[1]),
  70,
  '`@solana/web3.js` should have a minor version of at least 70'
);
assert.isAtLeast(
  parseInt(web3VersionParts[2]),
  0,
  '`@solana/web3.js` should have a patch version of at least 0'
);
```

You should have at least version `0.3.6` of `@solana/spl-token` added to the `package.json` dependencies.

```js
const packageJson = JSON.parse(
  await __helpers.getFile(
    './learn-solanas-token-program-by-minting-a-fungible-token/package.json'
  )
);
const splTokenVersion = packageJson.dependencies?.['@solana/spl-token'];
assert.exists(
  splTokenVersion,
  'You should have `@solana/spl-token` in your dependencies'
);
// Manually check SemVer is at least 0.3.6
const splTokenVersionParts = splTokenVersion
  .split('.')
  .map(p => p.replace(/\D/g, ''));
assert.isAtLeast(
  parseInt(splTokenVersionParts[0]),
  0,
  '`@solana/spl-token` should have a major version of at least 0'
);
assert.isAtLeast(
  parseInt(splTokenVersionParts[1]),
  3,
  '`@solana/spl-token` should have a minor version of at least 3'
);
assert.isAtLeast(
  parseInt(splTokenVersionParts[2]),
  6,
  '`@solana/spl-token` should have a patch version of at least 6'
);
```

### --seed--

#### --"create-mint-account.js"--

```js
import { Connection } from '@solana/web3.js';

const connection = new Connection('http://localhost:8899');
```

## 5

### --description--

Creating a Mint Account requires another account to pay the fees.

Import the `payer` variable from `utils.js`.

### --tests--

You should have `import { payer } from './utils.js';` in `create-mint-account.js`.

```js
const utilsImportDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === './utils.js';
});
assert.exists(utilsImportDeclaration, 'You should import from `./utils.js`');
const payerImportSpecifier = utilsImportDeclaration.specifiers.find(s => {
  return s.imported.name === 'payer';
});
assert.exists(
  payerImportSpecifier,
  'You should import `payer` from `./utils.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/create-mint-account.js'
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
npm install @solana/web3.js @solana/spl-token
```

## 6

### --description--

The `payer` variable is a `Keypair` constructed from a `wallet.json` file.

Use `solana-keygen` to create a new keypair, and save it to a file named `wallet.json`. You will be prompted to enter a passphrase. You can leave this blank.

### --tests--

You should have a `wallet.json` file in the `learn-solanas-token-program-by-minting-a-fungible-token/` directory.

```js
const walletJsonExists = __helpers.fileExists(
  'learn-solanas-token-program-by-minting-a-fungible-token/wallet.json'
);
assert.isTrue(walletJsonExists, 'The `wallet.json` file should exist');
const walletJson = JSON.parse(
  await __helpers.getFile(
    'learn-solanas-token-program-by-minting-a-fungible-token/wallet.json'
  )
);
assert.isArray(
  walletJson,
  'The `wallet.json` file should be an array of numbers.\nRun `solana-keygen new --outfile wallet.json` to create a new keypair.'
);
```

### --seed--

#### --"create-mint-account.js"--

```js
import { Connection } from '@solana/web3.js';
import { payer } from './utils.js';

const connection = new Connection('http://localhost:8899');
```

## 7

### --description--

A Mint Account also requires a _mint authority_ which is an account that controls the minting of the token. You will set the payer to be the mint authority.

Within `create-mint-account.js`, declare a variable `mintAuthority`, and set it equal to the `payer` public key.

### --tests--

You should have `const mintAuthority = payer.publicKey;` in `create-mint-account.js`.

```js
const mintAuthorityDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => {
    return v.declarations?.[0]?.id?.name === 'mintAuthority';
  });
assert.exists(
  mintAuthorityDeclaration,
  'A variable named `mintAuthority` should exist'
);
const mintAuthorityMemberExpression =
  mintAuthorityDeclaration.declarations?.[0]?.init;
assert.exists(
  mintAuthorityMemberExpression,
  'The `mintAuthority` variable should have an initialiser'
);
assert.equal(
  mintAuthorityMemberExpression.object?.name,
  'payer',
  'The `mintAuthority` variable should be initialised with `payer.publicKey`'
);
assert.equal(
  mintAuthorityMemberExpression.property?.name,
  'publicKey',
  'The `mintAuthority` variable should be initialised with `payer.publicKey`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/create-mint-account.js'
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
solana-keygen new --no-bip39-passphrase --silent --outfile wallet.json
```

## 8

### --description--

A Mint Account requires a _freeze authority_ which is an account that controls the <dfn title="Freezing a token account prevents that account from receiving/transfering the associated token.">freezing of token accounts</dfn>. You will set the payer to be the freeze authority.

Within `create-mint-account.js`, declare a variable `freezeAuthority`, and set it equal to the `payer` public key.

### --tests--

You should have `const freezeAuthority = payer.publicKey;` in `create-mint-account.js`.

```js
const freezeAuthorityDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => {
    return v.declarations?.[0]?.id?.name === 'freezeAuthority';
  });
assert.exists(
  freezeAuthorityDeclaration,
  'A variable named `freezeAuthority` should exist'
);
const freezeAuthorityMemberExpression =
  freezeAuthorityDeclaration.declarations?.[0]?.init;
assert.exists(
  freezeAuthorityMemberExpression,
  'The `freezeAuthority` variable should have an initialiser'
);
assert.equal(
  freezeAuthorityMemberExpression.object?.name,
  'payer',
  'The `freezeAuthority` variable should be initialised with `payer.publicKey`'
);
assert.equal(
  freezeAuthorityMemberExpression.property?.name,
  'publicKey',
  'The `freezeAuthority` variable should be initialised with `payer.publicKey`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/create-mint-account.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"create-mint-account.js"--

```js
import { Connection } from '@solana/web3.js';
import { payer } from './utils.js';

const connection = new Connection('http://localhost:8899');

const mintAuthority = payer.publicKey;
```

## 9

### --description--

Import the `createMint` function from `@solana/spl-token`, to create and initialize a new Mint Account:

```typescript
createMint(
  connection: Connection,
  payer: Signer,
  mintAuthority: PublicKey,
  freezeAuthority: PublicKey | null,
  decimals: number
): Promise<PublicKey>
```

Call the `createMint` function, passing in logical arguments. Store the awaited result in a variable named `mint`.

The _decimals_ value is the number of decimal places the token will have. Set the decimals to `9` - the same as the native SOL token:

<div style="margin:auto;display:table;">

| Decimals | Smallest Token Unit |
| :------: | :-----------------: |
|    0     |          1          |
|    1     |         0.1         |
|   ...    |         ...         |
|    9     |     0.000000001     |

</div>

### --tests--

You should import `createMint` from `@solana/spl-token`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === '@solana/spl-token';
});
assert.exists(
  importDeclaration,
  'An import from `@solana/spl-token` should exist'
);
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(
  importSpecifiers,
  'createMint',
  '`createMint` should be imported from `@solana/spl-token`'
);
```

You should have `const mint = await createMint(connection, payer, mintAuthority, freezeAuthority, 9);` in `create-mint-account.js`.

```js
const mintDeclaration = babelisedCode.getVariableDeclarations().find(v => {
  return v.declarations?.[0]?.id?.name === 'mint';
});
assert.exists(mintDeclaration, 'A variable named `mint` should exist');
const mintAwaitExpression = mintDeclaration.declarations?.[0]?.init;
assert.equal(
  mintAwaitExpression.type,
  'AwaitExpression',
  'The `createMint` call should be awaited'
);
const createMintCallExpression = mintAwaitExpression.argument;
assert.equal(
  createMintCallExpression.callee.name,
  'createMint',
  'The `mint` variable should be initialised with the `createMint` function'
);
const createMintArguments = createMintCallExpression.arguments;
assert.equal(
  createMintArguments.length,
  5,
  'The `createMint` function should be called with 5 arguments'
);
const [
  connectionArgument,
  payerArgument,
  mintAuthorityArgument,
  freezeAuthorityArgument,
  decimalsArgument
] = createMintArguments;
assert.equal(
  connectionArgument.name,
  'connection',
  'The first argument to `createMint` should be `connection`'
);
assert.equal(
  payerArgument.name,
  'payer',
  'The second argument to `createMint` should be `payer`'
);
assert.equal(
  mintAuthorityArgument.name,
  'mintAuthority',
  'The third argument to `createMint` should be `mintAuthority`'
);
assert.equal(
  freezeAuthorityArgument.name,
  'freezeAuthority',
  'The fourth argument to `createMint` should be `freezeAuthority`'
);
assert.equal(
  decimalsArgument.value,
  9,
  'The fifth argument to `createMint` should be `9`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/create-mint-account.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"create-mint-account.js"--

```js
import { Connection } from '@solana/web3.js';
import { payer } from './utils.js';

const connection = new Connection('http://localhost:8899');

const mintAuthority = payer.publicKey;
const freezeAuthority = payer.publicKey;
```

## 10

### --description--

The `createMint` function returns the public key of the newly-created Mint Account.

Log the base-58 representation of `mint` to the console.

### --tests--

You should use the `toBase58` method on `mint`.

```js
const mintMemberExpression = babelisedCode
  .getType('MemberExpression')
  .find(m => {
    return m.object?.name === 'mint' && m.property?.name === 'toBase58';
  });
assert.exists(
  mintMemberExpression,
  'The `mint` variable should have a `toBase58` method called on it'
);
```

You can have `console.log(mint.toBase58());` in `create-mint-account.js`.

```js
const consoleLogCallExpression = babelisedCode
  .getType('CallExpression')
  .find(c => {
    return (
      c.callee?.object?.name === 'console' && c.callee?.property?.name === 'log'
    );
  });
assert.exists(consoleLogCallExpression, 'A `console.log` call should exist');
const consoleLogArguments = consoleLogCallExpression.arguments;
// Assert one of the arguments is the `mint.toBase58()` call
const mintToBase58CallExpression = consoleLogArguments.find(a => {
  return (
    a.type === 'CallExpression' &&
    a.callee.object.name === 'mint' &&
    a.callee.property.name === 'toBase58'
  );
});
assert.exists(
  mintToBase58CallExpression,
  'One of the arguments to `console.log` should be `mint.toBase58()`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/create-mint-account.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"create-mint-account.js"--

```js
import { Connection } from '@solana/web3.js';
import { payer } from './utils.js';
import { createMint } from '@solana/spl-token';

const connection = new Connection('http://localhost:8899');

const mintAuthority = payer.publicKey;
const freezeAuthority = payer.publicKey;

const mint = await createMint(
  connection,
  payer,
  mintAuthority,
  freezeAuthority,
  9
);
```

## 11

### --description--

Start a local Solana cluster. Ensure the RPC URL is set to `http://localhost:8899`.

### --tests--

Your Solana config RPC URL should be set to `http://localhost:8899`.

```js
const command = `solana config get json_rpc_url`;
await new Promise(res => setTimeout(() => res(), 2000));
const { stdout, stderr } = await __helpers.getCommandOutput(command);
assert.include(
  stdout,
  'http://localhost:8899',
  'Try running `solana config set --url localhost`'
);
```

You should run `solana-test-validator` in a separate terminal.

```js
await new Promise(res => setTimeout(() => res(), 2000));
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e, 'Try running `solana-test-validator` in a separate terminal');
}
```

### --seed--

#### --"create-mint-account.js"--

```js
import { Connection } from '@solana/web3.js';
import { payer } from './utils.js';
import { createMint } from '@solana/spl-token';

const connection = new Connection('http://localhost:8899');

const mintAuthority = payer.publicKey;
const freezeAuthority = payer.publicKey;

const mint = await createMint(
  connection,
  payer,
  mintAuthority,
  freezeAuthority,
  9
);

console.log('Token Unique Identifier:', mint.toBase58());
```

## 12

### --description--

Airdrop some SOL to the payer account to pay for the transaction fees:

```bash
solana airdrop <amount_of_sol> ./wallet.json
```

### --tests--

The `wallet.json` account should have at least 2 SOL.

```js
const { stdout } = await __helpers.getCommandOutput(
  `solana balance ./learn-solanas-token-program-by-minting-a-fungible-token/wallet.json`
);
const balance = stdout.trim()?.match(/\d+/)?.[0];
assert.isAtLeast(
  parseInt(balance),
  2,
  'The `wallet.json` account should have at least 2 SOL'
);
```

The validator should be running at `http://localhost:8899`.

```js
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e, 'Try running `solana-test-validator` in a separate terminal');
}
```

## 13

### --description--

Run the `create-mint-account.js` script:

```bash
node create-mint-account.js
```

<details>
  <summary>NOTE: Error</summary>

If this command fails with the below error, wait a few seconds and run it again - transactions (e.g. Airdrops) take a few seconds to be finalised.

```bash
/workspace/solana-curriculum/learn-solanas-token-program-by-minting-a-fungible-token/node_modules/@solana/web3.js/lib/index.cjs.js:9754
      throw new SendTransactionError('failed to send transaction: ' + res.error.message, logs);
            ^

SendTransactionError: failed to send transaction: Transaction simulation failed: Attempt to debit an account but found no record of a prior credit.
```

</details>

### --tests--

You should run `node create-mint-account.js` in a terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(
  lastCommand,
  'node create-mint-account.js',
  'You should run `node create-mint-account.js` in a terminal'
);
```

The output of `node create-mint-account.js` should include the base-58 representation of the Mint Account.

```js
const terminalOutput = await __helpers.getTerminalOutput();
assert.match(terminalOutput, /[A-z0-9]{44}/);
```

The validator should be running at `http://localhost:8899`.

```js
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e, 'Try running `solana-test-validator` in a separate terminal');
}
```

## 14

### --description--

The output should include the base-58 representation of the Mint Account. In other words, the mint account's public key address.

Copy this address, and paste it into the `MINT_ADDRESS_58` variable in `utils.js`. Then, uncomment the `mintAddress` export statement.

### --tests--

You should have `const MINT_ADDRESS_58 = '...';` in `utils.js`.

```js
// TODO: Note that seed cannot add this...
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'MINT_ADDRESS_58');
assert.exists(
  variableDeclaration,
  'The `MINT_ADDRESS_58` variable is should exist'
);
const value = variableDeclaration.declarations?.[0]?.init?.value;
assert.isString(value, 'The `MINT_ADDRESS_58` value should be a string');
assert.isNotEmpty(value, 'The `MINT_ADDRESS_58` value should not be empty');
```

You should uncomment `export const mintAddress = new PublicKey(MINT_ADDRESS_58);` in `utils.js`.

```js
const exportStatement = babelisedCode
  .getType('ExportNamedDeclaration')
  .find(e => e.declaration?.declarations?.[0]?.id?.name === 'mintAddress');
assert.exists(
  exportStatement,
  'The `mintAddress` export statement should be UNCOMMENTED'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/utils.js'
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['importAssertions']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 15

### --description--

Now that you have created a _Mint Account_, you need to create a _Token Account_.

A _Token Account_ is owned by another account, and holds tokens of a specific mint.

Create a new file named `create-token-account.js`.

### --tests--

You can use `touch` to create a file named `create-token-account.js`.

```js
const fileExists = await __helpers.fileExists(
  'learn-solanas-token-program-by-minting-a-fungible-token/create-token-account.js'
);
assert.isTrue(fileExists);
```

## 16

### --description--

Within `create-token-account.js`, declare a variable `connection`, and assign it a new instance of the `Connection` class. Pass in your local Solana RPC URL as the first argument.

### --tests--

You should have `const connection = new Connection('http://localhost:8899');` in `create-token-account.js`.

```js
const connectionVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'connection');
assert.exists(
  connectionVariableDeclaration,
  'A `connection` variable should be declared'
);
const newExpression = connectionVariableDeclaration.declarations[0].init;
assert.equal(
  newExpression.callee?.name,
  'Connection',
  '`connection` should be initialised with a new `Connection`'
);
assert.equal(
  newExpression.arguments?.[0]?.value,
  'http://localhost:8899',
  "A new connection should be created with `new Connection('http://localhost:8899')`"
);
```

You should import `Connection` from `@solana/web3.js`.

```js
const solanaWeb3ImportDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => {
    return i.source.value === '@solana/web3.js';
  });
assert.exists(
  solanaWeb3ImportDeclaration,
  'An import from `@solana/web3.js` should exist'
);
const connectionImportSpecifier = solanaWeb3ImportDeclaration.specifiers.find(
  s => {
    return s.imported.name === 'Connection';
  }
);
assert.exists(
  connectionImportSpecifier,
  '`Connection` should be imported from `@solana/web3.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/create-token-account.js'
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
touch create-token-account.js
```

## 17

### --description--

Within `create-token-account.js`, import `payer` and `mintAddress` from `utils.js`.

### --tests--

You should import `payer` from `utils.js`.

```js
const utilsImportDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === './utils.js';
});
assert.exists(
  utilsImportDeclaration,
  'An import from `./utils.js` should exist'
);
const payerImportSpecifiers = utilsImportDeclaration.specifiers.map(s => {
  return s.imported.name;
});
assert.include(
  payerImportSpecifiers,
  'payer',
  '`payer` should be imported from `./utils.js`'
);
```

You should import `mintAddress` from `utils.js`.

```js
const utilsImportDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === './utils.js';
});
assert.exists(
  utilsImportDeclaration,
  'An import from `./utils.js` should exist'
);
const mintAddressImportSpecifiers = utilsImportDeclaration.specifiers.map(s => {
  return s.imported.name;
});
assert.include(
  mintAddressImportSpecifiers,
  'mintAddress',
  '`mintAddress` should be imported from `./utils.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/create-token-account.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"create-token-account.js"--

```js
import { Connection } from '@solana/web3.js';

const connection = new Connection('http://localhost:8899');
```

## 18

### --description--

Import the `getOrCreateAssociatedTokenAccount` function from `@solana/spl-token`, to retrieve an associated token account, or create it if it does not exist:

```typescript
getOrCreateAssociatedTokenAccount(
  connection: Connection,
  payer: Signer, // Payer for this transaction
  mint: PublicKey, // Address of the associated token mint
  owner: PublicKey // Address of the account to own the token account
): Promise<Account>
```

Call the `getOrCreateAssociatedTokenAccount` function, passing in logical arguments. Store the awaited result in a variable named `tokenAccount`.

Use the `payer` account as the owner of the token account.

### --tests--

You should have `const tokenAccount = await getOrCreateAssociatedTokenAccount(...);` in `create-token-account.js`.

```js
const tokenAccountVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'tokenAccount');
assert.exists(
  tokenAccountVariableDeclaration,
  'A `tokenAccount` variable should be declared'
);
const awaitExpression = tokenAccountVariableDeclaration.declarations[0].init;
assert.exists(
  awaitExpression,
  'The `tokenAccount` variable should be initialised with an `await` expression'
);
const callExpression = awaitExpression.argument;
assert.exists(
  callExpression,
  'The `tokenAccount` variable should be initialised with a call expression'
);
const callee = callExpression.callee;
assert.equal(
  callee.name,
  'getOrCreateAssociatedTokenAccount',
  'The `tokenAccount` variable should be initialised with a call expression to `getOrCreateAssociatedTokenAccount`'
);
```

You should import `getOrCreateAssociatedTokenAccount` from `@solana/spl-token`.

```js
const splTokenImportDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => {
    return i.source.value === '@solana/spl-token';
  });
assert.exists(
  splTokenImportDeclaration,
  'An import from `@solana/spl-token` should exist'
);
const getOrCreateAssociatedTokenAccountImportSpecifiers =
  splTokenImportDeclaration.specifiers.map(s => {
    return s.imported.name;
  });
assert.include(
  getOrCreateAssociatedTokenAccountImportSpecifiers,
  'getOrCreateAssociatedTokenAccount',
  '`getOrCreateAssociatedTokenAccount` should be imported from `@solana/spl-token`'
);
```

You should pass in order: `connection`, `payer`, `mintAddress`, and `payer.publicKey` as arguments to `getOrCreateAssociatedTokenAccount`.

```js
const getOrCreateAssociatedTokenAccountCallExpression = babelisedCode
  .getType('CallExpression')
  .find(c => c.callee.name === 'getOrCreateAssociatedTokenAccount');
assert.exists(
  getOrCreateAssociatedTokenAccountCallExpression,
  'A call expression to `getOrCreateAssociatedTokenAccount` should exist'
);
const [arg1, arg2, arg3, arg4] =
  getOrCreateAssociatedTokenAccountCallExpression.arguments;
assert.equal(
  arg1.name,
  'connection',
  'The first argument to `getOrCreateAssociatedTokenAccount` should be `connection`'
);
assert.equal(
  arg2.name,
  'payer',
  'The second argument to `getOrCreateAssociatedTokenAccount` should be `payer`'
);
assert.equal(
  arg3.name,
  'mintAddress',
  'The third argument to `getOrCreateAssociatedTokenAccount` should be `mintAddress`'
);
assert.nestedPropertyVal(arg4, 'object.name', 'payer');
assert.nestedPropertyVal(arg4, 'property.name', 'publicKey');
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/create-token-account.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"create-token-account.js"--

```js
import { Connection } from '@solana/web3.js';
import { payer, mintAddress } from './utils.js';

const connection = new Connection('http://localhost:8899');
```

## 19

### --description--

Within `create-token-account.js`, log the base-58 representation of the `tokenAccount` address to the console.

### --tests--

You should have `console.log(tokenAccount.address.toBase58());` in `create-token-account.js`.

```js
const consoleLogCallExpression = babelisedCode
  .getType('CallExpression')
  .find(c => {
    return (
      c.callee.object?.name === 'console' && c.callee.property?.name === 'log'
    );
  });
assert.exists(consoleLogCallExpression, 'A `console.log` call should exist');
const consoleLogArguments = consoleLogCallExpression.arguments;
// Assert one of the arguments is the `mint.toBase58()` call
const mintToBase58CallExpression = consoleLogArguments.find(a => {
  return (
    a.type === 'CallExpression' &&
    a.callee?.object?.object?.name === 'tokenAccount' &&
    a.callee?.object?.property?.name === 'address' &&
    a.callee?.property?.name === 'toBase58'
  );
});
assert.exists(
  mintToBase58CallExpression,
  'One of the arguments to `console.log` should be `tokenAccount.publicKey.toBase58()`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/create-token-account.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"create-token-account.js"--

```js
import { Connection } from '@solana/web3.js';
import { payer, mintAddress } from './utils.js';
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';

const connection = new Connection('http://localhost:8899');

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mintAddress,
  payer.publicKey
);
```

## 20

### --description--

Run the `create-token-account.js` script:

```bash
node create-token-account.js
```

### --tests--

You should run `node create-token-account.js` in a terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(
  lastCommand,
  'node create-token-account.js',
  'Try running `node create-token-account.js` in a terminal'
);
```

The output of `node create-token-account.js` should include the base-58 representation of the Token Account.

```js
const terminalOutput = await __helpers.getTerminalOutput();
assert.match(terminalOutput, /[A-z0-9]{44}/);
```

The validator should be running at `http://localhost:8899`.

```js
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e, 'Try running `solana-test-validator` in a separate terminal');
}
```

### --seed--

#### --"create-token-account.js"--

```js
import { Connection } from '@solana/web3.js';
import { payer, mintAddress } from './utils.js';

const connection = new Connection('http://localhost:8899');

const tokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mintAddress,
  payer.publicKey
);

console.log('Token Account Address:', tokenAccount.publicKey.toBase58());
```

## 21

### --description--

The output should include the base-58 representation of the Token Account. In other words, the token account's public key address.

Copy this address, and paste it into the `TOKEN_ACCOUNT_58` variable in `utils.js`. Then, uncomment the `tokenAccount` variable.

### --tests--

You should have `const TOKEN_ACCOUNT_58 = '...';` in `utils.js`.

```js
// TODO: Note that seed cannot add this...
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'TOKEN_ACCOUNT_58');
assert.exists(
  variableDeclaration,
  'The `TOKEN_ACCOUNT_58` variable is should exist'
);
const value = variableDeclaration.declarations?.[0]?.init?.value;
assert.isString(value, 'The `TOKEN_ACCOUNT_58` value should be a string');
assert.isNotEmpty(value, 'The `TOKEN_ACCOUNT_58` value should not be empty');
```

You should uncomment `export const tokenAccount = new PublicKey(TOKEN_ACCOUNT_58);` in `utils.js`.

```js
const exportStatement = babelisedCode
  .getType('ExportNamedDeclaration')
  .find(e => e.declaration?.declarations?.[0]?.id?.name === 'tokenAccount');
assert.exists(
  exportStatement,
  'The `tokenAccount` export statement should be UNCOMMENTED'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/utils.js'
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['importAssertions']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 22

### --description--

Run the `create-token-account.js` script again:

```bash
node create-token-account.js
```

### --tests--

You should run `node create-token-account.js` in a terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(
  lastCommand,
  'node create-token-account.js',
  'Try running `node create-token-account.js` in a terminal'
);
```

The validator should be running at `http://localhost:8899`.

```js
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e, 'Try running `solana-test-validator` in a separate terminal');
}
```

## 23

### --description--

Seeing as there is already an associated token account for the `payer` account, the `getOrCreateAssociatedTokenAccount` function will return the existing token account.

To see what a token account looks like, create a new file called `get-token-account.js`:

### --tests--

You should have a `get-token-account.js` file.

```js
const fileExists = await __helpers.fileExists(
  'learn-solanas-token-program-by-minting-a-fungible-token/get-token-account.js'
);
assert.isTrue(fileExists);
```

## 24

### --description--

Within `get-token-account.js`, declare a variable `connection`, and assign it a new instance of the `Connection` class. Pass in your local Solana RPC URL as the first argument.

### --tests--

You should have `const connection = new Connection('http://localhost:8899');` in `get-token-account.js`.

```js
const connectionVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'connection');
assert.exists(
  connectionVariableDeclaration,
  'A `connection` variable should be declared'
);
const newExpression = connectionVariableDeclaration.declarations[0].init;
assert.equal(
  newExpression.callee.name,
  'Connection',
  '`connection` should be initialised with a new `Connection`'
);
assert.equal(
  newExpression.arguments[0].value,
  'http://localhost:8899',
  "A new connection should be created with `new Connection('http://localhost:8899')`"
);
```

You should import `Connection` from `@solana/web3.js`.

```js
const solanaWeb3ImportDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => {
    return i.source.value === '@solana/web3.js';
  });
assert.exists(
  solanaWeb3ImportDeclaration,
  'An import from `@solana/web3.js` should exist'
);
const connectionImportSpecifier = solanaWeb3ImportDeclaration.specifiers.find(
  s => {
    return s.imported.name === 'Connection';
  }
);
assert.exists(
  connectionImportSpecifier,
  '`Connection` should be imported from `@solana/web3.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/get-token-account.js'
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
touch get-token-account.js
```

## 25

### --description--

Within `get-token-account.js`, create a new `PublicKey` from the first command-line argument, and assign it to a variable called `userPublicKey`.

### --tests--

You should have `const userPublicKey = new PublicKey(process.argv[2]);` in `get-token-account.js`.

```js
const userPublicKeyVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'userPublicKey');
assert.exists(
  userPublicKeyVariableDeclaration,
  'A `userPublicKey` variable should be declared'
);
const newExpression = userPublicKeyVariableDeclaration.declarations?.[0]?.init;
assert.equal(
  newExpression?.callee?.name,
  'PublicKey',
  '`userPublicKey` should be initialised with a new `PublicKey`'
);
const processArgvMemberExpression = newExpression?.arguments?.[0];
assert.equal(
  processArgvMemberExpression?.object?.object?.name,
  'process',
  '`PublicKey` should be initialised with `process...`'
);
assert.equal(
  processArgvMemberExpression?.object?.property?.name,
  'argv',
  '`PublicKey` should be initialised with `process.argv...`'
);
assert.equal(
  processArgvMemberExpression?.property?.value,
  '2',
  '`PublicKey` should be initialised with `process.argv[2]`'
);
```

You should import `PublicKey` from `@solana/web3.js`.

```js
const solanaWeb3ImportDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => {
    return i.source.value === '@solana/web3.js';
  });
assert.exists(
  solanaWeb3ImportDeclaration,
  'An import from `@solana/web3.js` should exist'
);
const specifiers = solanaWeb3ImportDeclaration.specifiers.map(
  s => s.imported.name
);
assert.include(
  specifiers,
  'PublicKey',
  '`PublicKey` should be imported from `@solana/web3.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/get-token-account.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"get-token-account.js"--

```js
import { Connection } from '@solana/web3.js';

const connection = new Connection('http://localhost:8899');
```

## 26

### --description--

Import the `getAssociatedTokenAddress` function from `@solana/spl-token`, to get the address of the associated token account for a given mint and owner:

```typescript
getAssociatedTokenAddress(
  mint: PublicKey,
  owner: PublicKey
): Promise<PublicKey>;
```

Call the `getAssociatedTokenAddress` function, passing in the `mintAddress` (from `utils.js`) and `userPublicKey` variables as arguments. Assign the result to a variable called `tokenAddress`.

### --tests--

You should have `const tokenAddress = await getAssociatedTokenAddress(mintAddress, userPublicKey);` in `get-token-account.js`.

```js
const tokenAddressVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'tokenAddress');
assert.exists(
  tokenAddressVariableDeclaration,
  'A `tokenAddress` variable should be declared'
);
const awaitExpression = tokenAddressVariableDeclaration.declarations?.[0]?.init;
assert.equal(
  awaitExpression?.type,
  'AwaitExpression',
  '`tokenAddress` should be initialised with an `await` expression'
);
const getAssociatedTokenAddressCallExpression = awaitExpression?.argument;
assert.equal(
  getAssociatedTokenAddressCallExpression?.callee?.name,
  'getAssociatedTokenAddress',
  '`tokenAddress` should be initialised with `getAssociatedTokenAddress(...)`'
);
const [mintAddressIdentifier, userPublicKeyIdentifier] =
  getAssociatedTokenAddressCallExpression?.arguments;
assert.equal(
  mintAddressIdentifier?.name,
  'mintAddress',
  '`getAssociatedTokenAddress` should be called with `mintAddress` as the first argument'
);
assert.equal(
  userPublicKeyIdentifier?.name,
  'userPublicKey',
  '`getAssociatedTokenAddress` should be called with `userPublicKey` as the second argument'
);
```

You should import `getAssociatedTokenAddress` from `@solana/spl-token`.

```js
const splTokenImportDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => {
    return i.source.value === '@solana/spl-token';
  });
assert.exists(
  splTokenImportDeclaration,
  'An import from `@solana/spl-token` should exist'
);
const specifiers = splTokenImportDeclaration.specifiers.map(
  s => s.imported.name
);
assert.include(
  specifiers,
  'getAssociatedTokenAddress',
  '`getAssociatedTokenAddress` should be imported from `@solana/spl-token`'
);
```

You should import `mintAddress` from `./utils.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === './utils.js';
});
assert.exists(importDeclaration, 'An import from `./utils.js` should exist');
const specifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(
  specifiers,
  'mintAddress',
  '`mintAddress` should be imported from `./utils.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/get-token-account.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"get-token-account.js"--

```js
import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('http://localhost:8899');

const tokenAccountPublicKey = new PublicKey(process.argv[2]);
```

## 27

### --description--

Import the `getAccount` function from `@solana/spl-token`, to get the account information for a given token account:

```typescript
getAccount(
  connection: Connection,
  address: PublicKey
): Promise<Account>;
```

Call the `getAccount` function, passing in the `connection` and `tokenAddress` variables as arguments. Assign the result to a variable called `tokenAccount`.

### --tests--

You should have `const tokenAccount = await getAccount(connection, tokenAddress);` in `get-token-account.js`.

```js
const tokenAccountVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'tokenAccount');
assert.exists(
  tokenAccountVariableDeclaration,
  'A `tokenAccount` variable should be declared'
);
const awaitExpression = tokenAccountVariableDeclaration.declarations?.[0]?.init;
assert.equal(
  awaitExpression?.type,
  'AwaitExpression',
  '`tokenAccount` should be initialised with an `await` expression'
);
const getAccountCallExpression = awaitExpression?.argument;
assert.equal(
  getAccountCallExpression?.callee?.name,
  'getAccount',
  '`tokenAccount` should be initialised with `getAccount(...)`'
);
const [connectionIdentifier, tokenAddressIdentifier] =
  getAccountCallExpression?.arguments;
assert.equal(
  connectionIdentifier?.name,
  'connection',
  '`getAccount` should be called with `connection` as the first argument'
);
assert.equal(
  tokenAddressIdentifier?.name,
  'tokenAddress',
  '`getAccount` should be called with `tokenAddress` as the second argument'
);
```

You should import `getAccount` from `@solana/spl-token`.

```js
const splTokenImportDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => {
    return i.source.value === '@solana/spl-token';
  });
assert.exists(
  splTokenImportDeclaration,
  'An import from `@solana/spl-token` should exist'
);
const specifiers = splTokenImportDeclaration.specifiers.map(
  s => s.imported.name
);
assert.include(
  specifiers,
  'getAccount',
  '`getAccount` should be imported from `@solana/spl-token`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/get-token-account.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"get-token-account.js"--

```js
import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { mintAddress } from './utils.js';

const connection = new Connection('http://localhost:8899');

const userPublicKey = new PublicKey(process.argv[2]);

const tokenAddress = await getAssociatedTokenAddress(
  mintAddress,
  userPublicKey
);
```

## 28

### --description--

Print the `tokenAccount` variable to the console.

### --tests--

You should have `console.log(tokenAccount);` in `get-token-account.js`.

```js
const consoleLogCallExpression = babelisedCode
  .getType('CallExpression')
  .find(c => {
    return (
      c.callee.object?.name === 'console' && c.callee.property?.name === 'log'
    );
  });
assert.exists(consoleLogCallExpression, 'A `console.log` call should exist');
const consoleLogArguments = consoleLogCallExpression.arguments;
// Assert one of the arguments is `tokenAccount`
const tokenAccountIdent = consoleLogArguments.find(a => {
  return a.name === 'tokenAccount';
});
assert.exists(
  tokenAccountIdent,
  'One of the arguments to `console.log` should be `tokenAccount`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/get-token-account.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"get-token-account.js"--

```js
import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token';
import { mintAddress } from './utils.js';

const connection = new Connection('http://localhost:8899');

const userPublicKey = new PublicKey(process.argv[2]);

const tokenAddress = await getAssociatedTokenAddress(
  mintAddress,
  userPublicKey
);

const tokenAccount = await getAccount(connection, tokenAddress);
```

## 29

### --description--

Run the `get-token-account.js` script, passing in the public key of the `payer` account as the first argument:

```bash
solana address --keypair ./wallet.json # to get the public key
node get-token-account.js <public_key>
```

### --tests--

You should run `node get-token-account.js <public_key>` in the terminal.

```js
const wallet = JSON.parse(
  await __helpers.getFile(
    './learn-solanas-token-program-by-minting-a-fungible-token/wallet.json'
  )
);
const secretKey = Uint8Array.from(wallet);
const { Keypair } = await import('@solana/web3.js');
const payer = Keypair.fromSecretKey(secretKey);

const command = `node get-token-account.js ${payer.publicKey.toString()}`;
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, command, `The last command should be '${command}'`);
```

The validator should be running at `http://localhost:8899`.

```js
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e, 'Try running `solana-test-validator` in a separate terminal');
}
```

### --seed--

#### --"get-token-account.js"--

```js
import { Connection, PublicKey } from '@solana/web3.js';
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token';
import { mintAddress } from './utils.js';

const connection = new Connection('http://localhost:8899');

const userPublicKey = new PublicKey(process.argv[2]);

const tokenAddress = await getAssociatedTokenAddress(
  mintAddress,
  userPublicKey
);

const tokenAccount = await getAccount(connection, tokenAddress);

console.log('Token Account:', tokenAccount);
```

## 30

### --description--

The `tokenAccount` variable should have an `amount` property, which is the number of tokens held by the account.

Currently, the token account has no tokens, because none have been minted into the account.

Create a file named `mint.js`.

### --tests--

You should have a file named `mint.js`.

```js
const mintFileExists = await __helpers.fileExists(
  'learn-solanas-token-program-by-minting-a-fungible-token/mint.js'
);
assert.isTrue(mintFileExists, 'A file named `mint.js` should exist');
```

## 31

### --description--

Within `mint.js`, declare a variable `connection`, and assign it a new instance of the `Connection` class. Pass in your local Solana RPC URL as the first argument.

### --tests--

You should have `const connection = new Connection('http://localhost:8899');` in `mint.js`.

```js
const connectionVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'connection');
assert.exists(
  connectionVariableDeclaration,
  'A `connection` variable should be declared'
);
const newExpression = connectionVariableDeclaration.declarations[0].init;
assert.equal(
  newExpression.callee.name,
  'Connection',
  '`connection` should be initialised with a new `Connection`'
);
assert.equal(
  newExpression.arguments[0].value,
  'http://localhost:8899',
  "A new connection should be created with `new Connection('http://localhost:8899')`"
);
```

You should import `Connection` from `@solana/web3.js`.

```js
const solanaWeb3ImportDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => {
    return i.source.value === '@solana/web3.js';
  });
assert.exists(
  solanaWeb3ImportDeclaration,
  'An import from `@solana/web3.js` should exist'
);
const connectionImportSpecifier = solanaWeb3ImportDeclaration.specifiers.find(
  s => {
    return s.imported.name === 'Connection';
  }
);
assert.exists(
  connectionImportSpecifier,
  '`Connection` should be imported from `@solana/web3.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/mint.js'
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
touch mint.js
```

## 32

### --description--

Import the `mintTo` function from `@solana/spl-token`, to mint tokens into a token account:

```typescript
mintTo(
  connection: Connection,
  payer: Signer,
  mint: PublicKey,
  destination: PublicKey,
  authority: PublicKey | Signer,
  amount: number | bigint
): Promise
```

Call and await the `mintTo` function, passing in the `connection`, `payer`, `mintAddress`, `tokenAccount`, `mintAuthority`, and `1_000_000_000` variables as arguments.

### --tests--

You should have `await mintTo(connection, payer, mintAddress, tokenAccount, mintAuthority, 1_000_000_000);` in `mint.js`.

```js
const expressionStatement = babelisedCode
  .getExpressionStatements()
  .find(
    e =>
      e.expression.type === 'AwaitExpression' &&
      e.expression.argument?.callee?.name === 'mintTo'
  );
assert.exists(
  expressionStatement,
  'An `await mintTo(...)` expression should exist'
);
const mintToArguments = expressionStatement.expression.argument.arguments;
const [
  connectionArgument,
  payerArgument,
  mintAddressArgument,
  tokenAccountArgument,
  mintAuthorityArgument,
  amountArgument
] = mintToArguments;
assert.equal(
  connectionArgument?.name,
  'connection',
  'The first argument to `mintTo` should be `connection`'
);
assert.equal(
  payerArgument?.name,
  'payer',
  'The second argument to `mintTo` should be `payer`'
);
assert.equal(
  mintAddressArgument?.name,
  'mintAddress',
  'The third argument to `mintTo` should be `mintAddress`'
);
assert.equal(
  tokenAccountArgument?.name,
  'tokenAccount',
  'The fourth argument to `mintTo` should be `tokenAccount`'
);
assert.equal(
  mintAuthorityArgument?.name,
  'mintAuthority',
  'The fifth argument to `mintTo` should be `mintAuthority`'
);
assert.equal(
  amountArgument?.value,
  1_000_000_000,
  'The sixth argument to `mintTo` should be `1_000_000_000`'
);
```

You should import `mintTo` from `@solana/spl-token`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === '@solana/spl-token';
});
assert.exists(
  importDeclaration,
  'An import from `@solana/spl-token` should exist'
);
const importSpecifiers = importDeclaration.specifiers.map(s => {
  return s.imported.name;
});
assert.include(
  importSpecifiers,
  'mintTo',
  '`mintTo` should be imported from `@solana/spl-token`'
);
```

You should import `payer` from `./utils.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === './utils.js';
});
assert.exists(importDeclaration, 'An import from `./utils.js` should exist');
const specifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(
  specifiers,
  'payer',
  '`payer` should be imported from `./utils.js`'
);
```

You should import `mintAddress` from `./utils.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === './utils.js';
});
assert.exists(importDeclaration, 'An import from `./utils.js` should exist');
const specifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(
  specifiers,
  'mintAddress',
  '`mintAddress` should be imported from `./utils.js`'
);
```

You should import `tokenAccount` from `./utils.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === './utils.js';
});
assert.exists(importDeclaration, 'An import from `./utils.js` should exist');
const specifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(
  specifiers,
  'tokenAccount',
  '`tokenAccount` should be imported from `./utils.js`'
);
```

You should import `mintAuthority` from `./utils.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === './utils.js';
});
assert.exists(importDeclaration, 'An import from `./utils.js` should exist');
const specifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(
  specifiers,
  'mintAuthority',
  '`mintAuthority` should be imported from `./utils.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/mint.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"mint.js"--

```js
import { Connection } from '@solana/web3.js';

const connection = new Connection('http://localhost:8899');
```

## 33

### --description--

Run the `mint.js` script:

```bash
node mint.js
```

### --tests--

You should run `node mint.js` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(
  lastCommand,
  'node mint.js',
  'Try running `node mint.js` in the terminal'
);
```

The validator should be running at `http://localhost:8899`.

```js
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e, 'Try running `solana-test-validator` in a separate terminal');
}
```

### --seed--

#### --"mint.js"--

```js
import { Connection } from '@solana/web3.js';
import { mintTo } from '@solana/spl-token';
import { payer, mintAddress, tokenAccount, mintAuthority } from './utils.js';

const connection = new Connection('http://localhost:8899');

await mintTo(
  connection,
  payer,
  mintAddress,
  tokenAccount,
  mintAuthority,
  1_000_000_000
);
```

## 34

### --description--

Run the `get-token-account.js` script again, passing in the public key of the `payer` account as the first argument.

### --tests--

You should run `node get-token-account.js <public_key>` in the terminal.

```js
const wallet = JSON.parse(
  await __helpers.getFile(
    './learn-solanas-token-program-by-minting-a-fungible-token/wallet.json'
  )
);
const secretKey = Uint8Array.from(wallet);
const { Keypair } = await import('@solana/web3.js');
const payer = Keypair.fromSecretKey(secretKey);

const command = `node get-token-account.js ${payer.publicKey.toString()}`;
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, command, `The last command should be '${command}'`);
```

The validator should be running at `http://localhost:8899`.

```js
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e, 'Try running `solana-test-validator` in a separate terminal');
}
```

## 35

### --description--

The token account should have an `amount` of `1000000000n`. Note that this means the account has a total of 1 token, because the token has 9 decimals - the same way an account with `1_000_000_000 lamports` means it has `1 SOL`.

To see the total number of tokens minted, create a file named `get-token-info.js`.

### --tests--

You should have a file named `get-token-info.js`.

```js
const fileExists = await __helpers.fileExists(
  'learn-solanas-token-program-by-minting-a-fungible-token/get-token-info.js'
);
assert.isTrue(fileExists, 'A file named `get-token-info.js` should exist');
```

## 36

### --description--

Within `get-token-info.js`, declare a variable `connection`, and assign it a new instance of the `Connection` class. Pass in your local Solana RPC URL as the first argument.

### --tests--

You should have `const connection = new Connection('http://localhost:8899');` in `get-token-info.js`.

```js
const connectionVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'connection');
assert.exists(
  connectionVariableDeclaration,
  'A `connection` variable should be declared'
);
const newExpression = connectionVariableDeclaration.declarations[0].init;
assert.equal(
  newExpression.callee.name,
  'Connection',
  '`connection` should be initialised with a new `Connection`'
);
assert.equal(
  newExpression.arguments[0].value,
  'http://localhost:8899',
  "A new connection should be created with `new Connection('http://localhost:8899')`"
);
```

You should import `Connection` from `@solana/web3.js`.

```js
const solanaWeb3ImportDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => {
    return i.source.value === '@solana/web3.js';
  });
assert.exists(
  solanaWeb3ImportDeclaration,
  'An import from `@solana/web3.js` should exist'
);
const connectionImportSpecifier = solanaWeb3ImportDeclaration.specifiers.find(
  s => {
    return s.imported.name === 'Connection';
  }
);
assert.exists(
  connectionImportSpecifier,
  '`Connection` should be imported from `@solana/web3.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/get-token-info.js'
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
touch get-token-info.js
```

## 37

### --description--

Import the `getMint` function from `@solana/spl-token`, to get the token information:

```typescript
getMint(
  connection: Connection,
  address: PublicKey
): Promise<Mint>
```

Call the `getMint` function, passing in the `connection` and `mintAddress` variables as arguments, and assign the awaited result to a variable `mint`.

### --tests--

You should have `const mint = await getMint(connection, mintAddress);` in `get-token-info.js`.

```js
const mintVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'mint');
assert.exists(mintVariableDeclaration, 'A `mint` variable should be declared');
const awaitExpression = mintVariableDeclaration.declarations[0].init;
assert.equal(
  awaitExpression.type,
  'AwaitExpression',
  '`mint` should be initialised with an await expression'
);
const callExpression = awaitExpression.argument;
assert.equal(
  callExpression.callee.name,
  'getMint',
  '`mint` should be initialised with a call to `getMint`'
);
assert.equal(
  callExpression.arguments[0].name,
  'connection',
  '`getMint` should be called with `connection` as the first argument'
);
assert.equal(
  callExpression.arguments[1].name,
  'mintAddress',
  '`getMint` should be called with `mintAddress` as the second argument'
);
```

You should import `getMint` from `@solana/spl-token`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === '@solana/spl-token';
});
assert.exists(
  importDeclaration,
  'An import from `@solana/spl-token` should exist'
);
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(
  importSpecifiers,
  'getMint',
  '`getMint` should be imported from `@solana/spl-token`'
);
```

You should import `mintAddress` from `./utils.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === './utils.js';
});
assert.exists(importDeclaration, 'An import from `./utils.js` should exist');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(
  importSpecifiers,
  'mintAddress',
  '`mintAddress` should be imported from `./utils.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/get-token-info.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"get-token-info.js"--

```js
import { Connection } from '@solana/web3.js';

const connection = new Connection('http://localhost:8899');
```

## 38

### --description--

Log the `mint` variable to the console.

### --tests--

You should have `console.log(mint);` in `get-token-info.js`.

```js
const consoleLogCallExpression = babelisedCode
  .getType('CallExpression')
  .find(c => {
    return (
      c.callee.object?.name === 'console' && c.callee.property?.name === 'log'
    );
  });
assert.exists(consoleLogCallExpression, 'A `console.log` call should exist');
const consoleLogArguments = consoleLogCallExpression.arguments;
// Assert one of the arguments is `mint`
const mintIdent = consoleLogArguments.find(a => {
  return a.name === 'mint';
});
assert.exists(
  mintIdent,
  'One of the arguments to `console.log` should be `mint`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/get-token-info.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"get-token-info.js"--

```js
import { Connection } from '@solana/web3.js';
import { getMint } from '@solana/spl-token';

const connection = new Connection('http://localhost:8899');

const mint = await getMint(connection, mintAddress);
```

## 39

### --description--

Run the `get-token-info.js` script:

```bash
node get-token-info.js
```

### --tests--

You should run `node get-token-info.js` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(
  lastCommand,
  'node get-token-info.js',
  'Try running `node get-token-info.js` in the terminal'
);
```

The validator should be running at `http://localhost:8899`.

```js
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e, 'Try running `solana-test-validator` in a separate terminal');
}
```

### --seed--

#### --"get-token-info.js"--

```js
import { Connection } from '@solana/web3.js';
import { getMint } from '@solana/spl-token';
import { mintAddress } from './utils.js';

const connection = new Connection('http://localhost:8899');

const mint = await getMint(connection, mintAddress);

console.log(mint);
```

## 40

### --description--

The output should show a `supply` property of `1000000000n`, which means the total number of tokens minted is `1_000_000_000 / 9 = 1`.

Mint at least 2 more tokens to the `payer` account.

### --tests--

You should run `node mint.js` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.equal(
  lastCommand,
  'node mint.js',
  'Try running `node mint.js` in the terminal'
);
```

The `payer` account should have a balance of at least `3_000_000_000`.

```js
const wallet = JSON.parse(
  await __helpers.getFile(
    './learn-solanas-token-program-by-minting-a-fungible-token/wallet.json'
  )
);
const secretKey = Uint8Array.from(wallet);
const { Keypair } = await import('@solana/web3.js');
const payer = Keypair.fromSecretKey(secretKey);

const { Connection } = await import('@solana/web3.js');
const { TOKEN_PROGRAM_ID } = await import('@solana/spl-token');

const connection = new Connection('http://localhost:8899');
const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
  payer.publicKey,
  {
    programId: TOKEN_PROGRAM_ID
  }
);

const { tokenAmount } = tokenAccounts?.value?.[0]?.account?.data?.parsed?.info;
assert.isAtLeast(tokenAmount?.uiAmount, 3);
```

The total supply of tokens should be at least `3_000_000_000`.

```js
const { mintAddress } = await __helpers.importSansCache(
  '../learn-solanas-token-program-by-minting-a-fungible-token/utils.js'
);
const { getMint } = await import('@solana/spl-token');
const { Connection } = await import('@solana/web3.js');
const connection = new Connection('http://localhost:8899');

const mint = await getMint(connection, mintAddress);
assert.isAtLeast(mint.supply, 3_000_000_000);
```

The validator should be running at `http://localhost:8899`.

```js
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e, 'Try running `solana-test-validator` in a separate terminal');
}
```

## 41

### --description--

Now that your token has been minted and is in circulation, you can transfer tokens from one account to another.

Create a file named `transfer.js`.

### --tests--

You should have a file named `transfer.js`.

```js
const transferFileExists = __helpers.fileExists(
  'learn-solanas-token-program-by-minting-a-fungible-token/transfer.js'
);
assert.isTrue(transferFileExists, 'A `transfer.js` file should exist');
```

## 42

### --description--

Within `transfer.js`, declare a variable `connection`, and assign it a new instance of the `Connection` class. Pass in your local Solana RPC URL as the first argument.

### --tests--

You should have `const connection = new Connection('http://localhost:8899');` in `transfer.js`.

```js
const connectionVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'connection');
assert.exists(
  connectionVariableDeclaration,
  'A `connection` variable should be declared'
);
const newExpression = connectionVariableDeclaration.declarations[0].init;
assert.equal(
  newExpression.callee.name,
  'Connection',
  '`connection` should be initialised with a new `Connection`'
);
assert.equal(
  newExpression.arguments[0].value,
  'http://localhost:8899',
  "A new connection should be created with `new Connection('http://localhost:8899')`"
);
```

You should import `Connection` from `@solana/web3.js`.

```js
const solanaWeb3ImportDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => {
    return i.source.value === '@solana/web3.js';
  });
assert.exists(
  solanaWeb3ImportDeclaration,
  'An import from `@solana/web3.js` should exist'
);
const connectionImportSpecifier = solanaWeb3ImportDeclaration.specifiers.find(
  s => {
    return s.imported.name === 'Connection';
  }
);
assert.exists(
  connectionImportSpecifier,
  '`Connection` should be imported from `@solana/web3.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/transfer.js'
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
touch transfer.js
```

## 43

### --description--

From the first command-line argument, create a new `PublicKey` instance, and assign it to a variable `fromTokenAccountPublicKey`.

### --tests--

You should have `const fromTokenAccountPublicKey = new PublicKey(process.argv[2]);` in `transfer.js`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'fromTokenAccountPublicKey');
assert.exists(
  variableDeclaration,
  'A `fromTokenAccountPublicKey` variable should be declared'
);
const newExpression = variableDeclaration.declarations?.[0]?.init;
assert.equal(
  newExpression?.callee?.name,
  'PublicKey',
  '`fromTokenAccountPublicKey` should be initialised with a new `PublicKey`'
);
const processArgvMemberExpression = newExpression?.arguments?.[0];
assert.equal(
  processArgvMemberExpression?.object?.object?.name,
  'process',
  '`PublicKey` should be initialised with `process...`'
);
assert.equal(
  processArgvMemberExpression?.object?.property?.name,
  'argv',
  '`PublicKey` should be initialised with `process.argv...`'
);
assert.equal(
  processArgvMemberExpression?.property?.value,
  '2',
  '`PublicKey` should be initialised with `process.argv[2]`'
);
```

You should import `PublicKey` from `@solana/web3.js`.

```js
const solanaWeb3ImportDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => {
    return i.source.value === '@solana/web3.js';
  });
assert.exists(
  solanaWeb3ImportDeclaration,
  'An import from `@solana/web3.js` should exist'
);
const importSpecifiers = solanaWeb3ImportDeclaration.specifiers.map(s => {
  return s.imported.name;
});
assert.include(
  importSpecifiers,
  'PublicKey',
  '`PublicKey` should be imported from `@solana/web3.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/transfer.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/transfer.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"transfer.js"--

```js
import { Connection } from '@solana/web3.js';

const connection = new Connection('http://localhost:8899');
```

## 44

### --description--

Generate a new keypair, and assign it to a variable `toWallet`.

### --tests--

You should have `const toWallet = Keypair.generate();` in `transfer.js`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'toWallet');
assert.exists(variableDeclaration, 'A `toWallet` variable should be declared');
const generateMemberExpression =
  variableDeclaration.declarations?.[0]?.init?.callee;
assert.equal(
  generateMemberExpression?.object?.name,
  'Keypair',
  '`toWallet` should be initialised with `Keypair.generate()`'
);
assert.equal(
  generateMemberExpression?.property?.name,
  'generate',
  '`toWallet` should be initialised with `Keypair.generate()`'
);
```

You should import `Keypair` from `@solana/web3.js`.

```js
const solanaWeb3ImportDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => {
    return i.source.value === '@solana/web3.js';
  });
assert.exists(
  solanaWeb3ImportDeclaration,
  'An import from `@solana/web3.js` should exist'
);
const importSpecifiers = solanaWeb3ImportDeclaration.specifiers.map(s => {
  return s.imported.name;
});
assert.include(
  importSpecifiers,
  'Keypair',
  '`Keypair` should be imported from `@solana/web3.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/transfer.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"transfer.js"--

```js
import { Connection, PublicKey } from '@solana/web3.js';

const connection = new Connection('http://localhost:8899');

const fromTokenAccountPublicKey = new PublicKey(process.argv[2]);
```

## 45

### --description--

Import the `getOrCreateAssociatedTokenAccount` function from `@solana/spl-token`, to get (create) the token account of the `toWallet` address:

```typescript
getOrCreateAssociatedTokenAccount(
  connection: Connection,
  payer: Signer,
  mint: PublicKey,
  owner: PublicKey
): Promise<Account>
```

Call the function, passing in order: `connection`, `payer`, `mintAddress`, and the public key of `toWallet` as arguments. Assign the awaited result to a variable `toTokenAccount`.

### --tests--

You should have `const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, payer, mintAddress, toWallet.publicKey);` in `transfer.js`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'toTokenAccount');
assert.exists(
  variableDeclaration,
  'A `toTokenAccount` variable should be declared'
);
const awaitExpression = variableDeclaration.declarations?.[0]?.init;
assert.equal(
  awaitExpression?.type,
  'AwaitExpression',
  '`toTokenAccount` should be initialised with an `await` expression'
);
const callExpression = awaitExpression?.argument;
assert.equal(
  callExpression?.callee?.name,
  'getOrCreateAssociatedTokenAccount',
  '`toTokenAccount` should be initialised with `getOrCreateAssociatedTokenAccount()`'
);
const [
  connectionArgument,
  payerArgument,
  mintAddressArgument,
  toWalletPublicKeyArgument
] = callExpression?.arguments;
assert.equal(
  connectionArgument?.name,
  'connection',
  'The first argument of `getOrCreateAssociatedTokenAccount()` should be `connection`'
);
assert.equal(
  payerArgument?.name,
  'payer',
  'The second argument of `getOrCreateAssociatedTokenAccount()` should be `payer`'
);
assert.equal(
  mintAddressArgument?.name,
  'mintAddress',
  'The third argument of `getOrCreateAssociatedTokenAccount()` should be `mintAddress`'
);
assert.equal(
  toWalletPublicKeyArgument?.object?.name,
  'toWallet',
  'The fourth argument of `getOrCreateAssociatedTokenAccount()` should be `toWallet.publicKey`'
);
assert.equal(
  toWalletPublicKeyArgument?.property?.name,
  'publicKey',
  'The fourth argument of `getOrCreateAssociatedTokenAccount()` should be `toWallet.publicKey`'
);
```

You should import `getOrCreateAssociatedTokenAccount` from `@solana/spl-token`.

```js
const splTokenImportDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => {
    return i.source.value === '@solana/spl-token';
  });
assert.exists(
  splTokenImportDeclaration,
  'An import from `@solana/spl-token` should exist'
);
const importSpecifiers = splTokenImportDeclaration.specifiers.map(s => {
  return s.imported.name;
});
assert.include(
  importSpecifiers,
  'getOrCreateAssociatedTokenAccount',
  '`getOrCreateAssociatedTokenAccount` should be imported from `@solana/spl-token`'
);
```

You should import `payer` from `./utils.js`.

```js
const utilsImportDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === './utils.js';
});
assert.exists(
  utilsImportDeclaration,
  'An import from `./utils.js` should exist'
);
const importSpecifiers = utilsImportDeclaration.specifiers.map(s => {
  return s.imported.name;
});
assert.include(
  importSpecifiers,
  'payer',
  '`payer` should be imported from `./utils.js`'
);
```

You should import `mintAddress` from `./utils.js`.

```js
const utilsImportDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === './utils.js';
});
assert.exists(
  utilsImportDeclaration,
  'An import from `./utils.js` should exist'
);
const importSpecifiers = utilsImportDeclaration.specifiers.map(s => {
  return s.imported.name;
});
assert.include(
  importSpecifiers,
  'mintAddress',
  '`mintAddress` should be imported from `./utils.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/transfer.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"transfer.js"--

```js
import { Connection, PublicKey, Keypair } from '@solana/web3.js';

const connection = new Connection('http://localhost:8899');

const fromTokenAccountPublicKey = new PublicKey(process.argv[2]);

const toWallet = Keypair.generate();
```

## 46

### --description--

Import the `getAccount` function from `@solana/spl-token`, to get the owner of the `fromTokenAccountPublicKey` account:

```typescript
getAccount(
  connection: Connection,
  address: PublicKey
): Promise<Account>
```

Call the function, passing in order: `connection`, and `fromTokenAccountPublicKey` as arguments. Assign the awaited result to a variable `fromWallet`.

### --tests--

You should have `const fromWallet = await getAccount(connection, fromTokenAccountPublicKey);` in `transfer.js`.

```js
const variableDeclarations = babelisedCode.getVariableDeclarations();
const fromWalletVariableDeclaration = variableDeclarations.find(v => {
  return v.declarations?.[0]?.id?.name === 'fromWallet';
});
assert.exists(fromWalletVariableDeclaration, '`fromWallet` should be declared');
const awaitExpression = fromWalletVariableDeclaration.declarations?.[0]?.init;
assert.equal(
  awaitExpression?.type,
  'AwaitExpression',
  '`fromWallet` should be initialised with `await`'
);
const callExpression = awaitExpression?.argument;
assert.equal(
  callExpression?.callee?.name,
  'getAccount',
  '`fromWallet` should be initialised with `await getAccount()`'
);
const [connectionArgument, fromTokenAccountPublicKeyArgument] =
  callExpression?.arguments;
assert.equal(
  connectionArgument?.name,
  'connection',
  'The first argument of `getAccount()` should be `connection`'
);
assert.equal(
  fromTokenAccountPublicKeyArgument?.name,
  'fromTokenAccountPublicKey',
  'The second argument of `getAccount()` should be `fromTokenAccountPublicKey`'
);
```

You should import `getAccount` from `@solana/spl-token`.

```js
const splTokenImportDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => {
    return i.source.value === '@solana/spl-token';
  });
assert.exists(
  splTokenImportDeclaration,
  'An import from `@solana/spl-token` should exist'
);
const importSpecifiers = splTokenImportDeclaration.specifiers.map(s => {
  return s.imported.name;
});
assert.include(
  importSpecifiers,
  'getAccount',
  '`getAccount` should be imported from `@solana/spl-token`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/transfer.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"transfer.js"--

```js
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import { payer, mintAddress } from './utils.js';

const connection = new Connection('http://localhost:8899');

const fromTokenAccountPublicKey = new PublicKey(process.argv[2]);

const toWallet = Keypair.generate();

const toTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mintAddress,
  toWallet.publicKey
);
```

## 47

### --description--

Assign the `owner` property of `fromWallet` to a variable `owner`.

### --tests--

You should have `const owner = fromWallet.owner;` in `transfer.js`.

```js
const variableDeclarations = babelisedCode.getVariableDeclarations();
const ownerVariableDeclaration = variableDeclarations.find(v => {
  return v.declarations?.[0]?.id?.name === 'owner';
});
assert.exists(ownerVariableDeclaration, '`owner` should be declared');
const memberExpression = ownerVariableDeclaration.declarations?.[0]?.init;
assert.equal(
  memberExpression?.object?.name,
  'fromWallet',
  '`owner` should be initialised with `fromWallet`'
);
assert.equal(
  memberExpression?.property?.name,
  'owner',
  '`owner` should be initialised with `fromWallet.owner`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/transfer.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"transfer.js"--

```js
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import {
  getOrCreateAssociatedTokenAccount,
  getAccount
} from '@solana/spl-token';
import { payer, mintAddress } from './utils.js';

const connection = new Connection('http://localhost:8899');

const fromTokenAccountPublicKey = new PublicKey(process.argv[2]);

const toWallet = Keypair.generate();

const toTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mintAddress,
  toWallet.publicKey
);

const fromWallet = await getAccount(connection, fromTokenAccountPublicKey);
```

## 48

### --description--

Cast the second command-line argument to a number, and assign it to a variable `amount`. This will be used as the amount of tokens to transfer.

### --tests--

You should have `const amount = Number(process.argv[3]);` in `transfer.js`.

```js
const variableDeclaration = babelisedCode.getVariableDeclarations().find(v => {
  return v.declarations?.[0]?.id?.name === 'amount';
});
assert.exists(variableDeclaration, '`amount` should be declared');
const callExpression = variableDeclaration.declarations?.[0]?.init;
assert.equal(
  callExpression?.callee?.name,
  'Number',
  '`amount` should be initialised with `Number()`'
);
const processArgvArgument = callExpression?.arguments?.[0];
assert.equal(
  processArgvArgument?.object?.object?.name,
  'process',
  '`amount` should be initialised with `Number(process.argv[3])`'
);
assert.equal(
  processArgvArgument?.object?.property?.name,
  'argv',
  '`amount` should be initialised with `Number(process.argv[3])`'
);
assert.equal(
  processArgvArgument?.property?.value,
  3,
  '`amount` should be initialised with `Number(process.argv[3])`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/transfer.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"transfer.js"--

```js
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import {
  getOrCreateAssociatedTokenAccount,
  getAccount
} from '@solana/spl-token';
import { payer, mintAddress } from './utils.js';

const connection = new Connection('http://localhost:8899');

const fromTokenAccountPublicKey = new PublicKey(process.argv[2]);

const toWallet = Keypair.generate();

const toTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mintAddress,
  toWallet.publicKey
);

const fromWallet = await getAccount(connection, fromTokenAccountPublicKey);

const owner = fromWallet.owner;
```

## 49

### --description--

Import the `transfer` function from `@solana/spl-token`, to transfer tokens from the `fromTokenAccountPublicKey` account to the `toTokenAccount` account:

```typescript
transfer(
  connection: Connection,
  payer: Signer,
  source: PublicKey,
  destination: PublicKey,
  owner: PublicKey | Signer,
  amount: number | bigint
): Promise
```

Call the function, passing in order: `connection`, `payer`, `fromTokenAccountPublicKey`, the `address` of `toTokenAccount`, `owner`, and `amount` as arguments.

### --tests--

You should have `await transfer(connection, payer, fromTokenAccountPublicKey, toTokenAccount.address, owner, amount);` in `transfer.js`.

```js
const expressionStatement = babelisedCode
  .getExpressionStatements()
  .find(
    e =>
      e.expression.type === 'AwaitExpression' &&
      e.expression.argument.callee.name === 'transfer'
  );
assert.exists(
  expressionStatement,
  'An `await transfer(...)` expression should exist'
);
const transferArgs = expressionStatement.expression.argument.arguments;
const [
  connectionArgument,
  payerArgument,
  fromTokenAccountPublicKeyArgument,
  toTokenAccountMemberExpression,
  ownerArgument,
  amountArgument
] = transferArgs;

assert.equal(
  connectionArgument.name,
  'connection',
  'The first argument to `transfer` should be `connection`'
);
assert.equal(
  payerArgument.name,
  'payer',
  'The second argument to `transfer` should be `payer`'
);
assert.equal(
  fromTokenAccountPublicKeyArgument.name,
  'fromTokenAccountPublicKey',
  'The third argument to `transfer` should be `fromTokenAccountPublicKey`'
);
assert.equal(
  toTokenAccountMemberExpression.object.name,
  'toTokenAccount',
  'The fourth argument to `transfer` should be `toTokenAccount.address`'
);
assert.equal(
  toTokenAccountMemberExpression.property.name,
  'address',
  'The fourth argument to `transfer` should be `toTokenAccount.address`'
);
assert.equal(
  ownerArgument.name,
  'owner',
  'The fifth argument to `transfer` should be `owner`'
);
assert.equal(
  amountArgument.name,
  'amount',
  'The sixth argument to `transfer` should be `amount`'
);
```

You should import `transfer` from `@solana/spl-token`.

```js
const importDeclaration = babelisedCode
  .getImportDeclarations()
  .find(i => i.source.value === '@solana/spl-token');
assert.exists(
  importDeclaration,
  'An import from `@solana/spl-token` should exist'
);
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(
  importSpecifiers,
  'transfer',
  'An import from `@solana/spl-token` should import `transfer`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/transfer.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"transfer.js"--

```js
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import {
  getOrCreateAssociatedTokenAccount,
  getAccount
} from '@solana/spl-token';
import { payer, mintAddress } from './utils.js';

const connection = new Connection('http://localhost:8899');

const fromTokenAccountPublicKey = new PublicKey(process.argv[2]);

const toWallet = Keypair.generate();

const toTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mintAddress,
  toWallet.publicKey
);

const fromWallet = await getAccount(connection, fromTokenAccountPublicKey);

const owner = fromWallet.owner;

const amount = Number(process.argv[3]);
```

## 50

### --description--

Add the following to the end of the file, to log the result of the transfer:

```js
console.log(
  `Transferred ${amount} tokens from ${fromTokenAccountPublicKey.toBase58()} to ${toTokenAccount.address.toBase58()}`
);
```

### --tests--

You should add the above code to the end of `transfer.js`.

```js
const transferFile = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/transfer.js'
);
assert.match(
  transferFile,
  /console\.log\s*\(\s*`Transferred \${\s*amount\s*} tokens from \${\s*fromTokenAccountPublicKey\.toBase58\s*\(\s*\)\s*} to \${\s*toTokenAccount\.address\.toBase58\s*\(\s*\)\s*}`\s*\)\s*;?/,
  'The code to log the result of the transfer should exist'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-solanas-token-program-by-minting-a-fungible-token/transfer.js'
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --"transfer.js"--

```js
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import {
  getOrCreateAssociatedTokenAccount,
  getAccount,
  transfer
} from '@solana/spl-token';
import { payer, mintAddress } from './utils.js';

const connection = new Connection('http://localhost:8899');

const fromTokenAccountPublicKey = new PublicKey(process.argv[2]);

const toWallet = Keypair.generate();

const toTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mintAddress,
  toWallet.publicKey
);

const fromWallet = await getAccount(connection, fromTokenAccountPublicKey);

const owner = fromWallet.owner;

const amount = Number(process.argv[3]);

await transfer(
  connection,
  payer,
  fromTokenAccountPublicKey,
  toTokenAccount.address,
  owner,
  amount
);
```

## 51

### --description--

Run the `transfer.js` script passing in the token account public key for `./wallet.json`, and any amount of tokens to transfer:

```bash
$ node get-token-account.js <wallet.json_public_key> # Get wallet.json token account address
$ node transfer.js <token_account_public_key> <amount>
```

### --tests--

You should run the `transfer.js` script.

```js
const { tokenAccount } = await __helpers.importSansCache(
  '../learn-solanas-token-program-by-minting-a-fungible-token/utils.js'
);
const commandRe = new RegExp(`node transfer.js ${tokenAccount.toBase58()} \d+`);
const lastCommand = await __helpers.getLastCommand();
assert.match(
  lastCommand,
  commandRe,
  `The last command should match '${commandRe}'`
);
```

The validator should be running at `http://localhost:8899`.

```js
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e, 'Try running `solana-test-validator` in a separate terminal');
}
```

### --seed--

#### --"transfer.js"--

```js
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import {
  getOrCreateAssociatedTokenAccount,
  getAccount,
  transfer
} from '@solana/spl-token';
import { payer, mintAddress } from './utils.js';

const connection = new Connection('http://localhost:8899');

const fromTokenAccountPublicKey = new PublicKey(process.argv[2]);

const toWallet = Keypair.generate();

const toTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mintAddress,
  toWallet.publicKey
);

const fromWallet = await getAccount(connection, fromTokenAccountPublicKey);

const owner = fromWallet.owner;

const amount = Number(process.argv[3]);

await transfer(
  connection,
  payer,
  fromTokenAccountPublicKey,
  toTokenAccount.address,
  owner,
  amount
);

console.log(
  `Transferred ${amount} tokens from ${fromTokenAccountPublicKey.toBase58()} to ${toTokenAccount.address.toBase58()}`
);
```

## 52

### --description--

Contratulations on finishing this project! Feel free to play with your code.

**Summary**

- A _Mint Account_ is an account typically owned by an organisation who commissions the token, and keeps track of the supply of tokens
- A _Token Account_ is an account typically owned by an individual, and keeps track of the tokens held by that individual
- Minting tokens involves the _minting authority_ authorising a payer to create tokens and transfer them to a _Token Account_

🎆

Once you are done, enter `done` in the terminal.

### --tests--

You should enter `done` in the terminal

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## --fcc-end--
