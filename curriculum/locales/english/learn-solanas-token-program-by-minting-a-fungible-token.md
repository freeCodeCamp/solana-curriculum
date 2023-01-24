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
const packageJson = await import(
  'learn-solanas-token-program-by-minting-a-fungible-token/package.json'
);
const web3Version = packageJson.dependencies['@solana/web3.js'];
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
const splTokenVersion = packageJson.dependencies['@solana/spl-token'];
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
    return v.id.name === 'mintAuthority';
  });
assert.exists(
  mintAuthorityDeclaration,
  'A variable named `mintAuthority` should exist'
);
const mintAuthorityMemberExpression = mintAuthorityDeclaration.init;
assert.exists(
  mintAuthorityMemberExpression,
  'The `mintAuthority` variable should have an initialiser'
);
assert.equal(
  mintAuthorityMemberExpression.object.name,
  'payer',
  'The `mintAuthority` variable should be initialised with `payer.publicKey`'
);
assert.equal(
  mintAuthorityMemberExpression.property.name,
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
    return v.id.name === 'freezeAuthority';
  });
assert.exists(
  freezeAuthorityDeclaration,
  'A variable named `freezeAuthority` should exist'
);
const freezeAuthorityMemberExpression = freezeAuthorityDeclaration.init;
assert.exists(
  freezeAuthorityMemberExpression,
  'The `freezeAuthority` variable should have an initialiser'
);
assert.equal(
  freezeAuthorityMemberExpression.object.name,
  'payer',
  'The `freezeAuthority` variable should be initialised with `payer.publicKey`'
);
assert.equal(
  freezeAuthorityMemberExpression.property.name,
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

You should have `const mint = await createMint(connection, payer, mintAuthority, freezeAuthority, 9);` in `create-mint-account.js`.

```js
const mintDeclaration = babelisedCode.getVariableDeclarations().find(v => {
  return v.id.name === 'mint';
});
assert.exists(mintDeclaration, 'A variable named `mint` should exist');
const mintAwaitExpression = mintDeclaration.init;
assert.exists(mintAwaitExpression, 'The `createMint` call should be awaited');
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
    return m.object.name === 'mint' && m.property.name === 'toBase58';
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
      c.callee.object.name === 'console' && c.callee.property.name === 'log'
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

You should run `solana-test-validator` in a separate terminal.

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

### --tests--

You should run `node create-mint-account.js` in a terminal.

```js

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

Copy this address, and paste it into the `MINT_ADDRESS_58` variable in `utils.js`.

### --tests--

You should have `const MINT_ADDRESS_58 = '...';` in `utils.js`.

```js
// TODO: Note that seed cannot add this...
```

## 15

### --description--

Now that you have created a _Mint Account_, you need to create a _Token Account_.

A _Token Account_ is owned by another account, and holds tokens of a specific mint.

Create a new file named `create-token-account.js`.

### --tests--

You can use `touch` to create a file named `create-token-account.js`.

```js
const fileExists = await __helpers.fileExists('create-token-account.js');
assert.isTrue(fileExists);
```

## 16

### --description--

Within `create-token-account.js`, declare a variable `connection`, and assign it a new instance of the `Connection` class. Pass in your local Solana RPC URL as the first argument.

### --tests--

You should have `const connection = new Connection('http://localhost:8899');` in `create-token-account.js`.

```js

```

You should import `Connection` from `@solana/web3.js`.

```js

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

```

You should import `mintAddress` from `utils.js`.

```js

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

```

You should import `getOrCreateAssociatedTokenAccount` from `@solana/spl-token`.

```js

```

You should pass in order: `connection`, `payer`, `mintAddress`, and `payer.publicKey` as arguments to `getOrCreateAssociatedTokenAccount`.

```js

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

You should have `console.log(tokenAccount.publicKey.toBase58());` in `create-token-account.js`.

```js

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

Copy this address, and paste it into the `TOKEN_ACCOUNT_58` variable in `utils.js`.

### --tests--

You should have `const TOKEN_ACCOUNT_58 = '...';` in `utils.js`.

```js

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
const fileExists = await __helpers.fileExists('get-token-account.js');
assert.isTrue(fileExists);
```

## 24

### --description--

Within `get-token-account.js`, declare a variable `connection`, and assign it a new instance of the `Connection` class. Pass in your local Solana RPC URL as the first argument.

### --tests--

You should have `const connection = new Connection('http://localhost:8899');` in `get-token-account.js`.

```js

```

You should import `Connection` from `@solana/web3.js`.

```js

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

```

You should import `PublicKey` from `@solana/web3.js`.

```js

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

```

You should import `getAssociatedTokenAddress` from `@solana/spl-token`.

```js

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

```

You should import `getAccount` from `@solana/spl-token`.

```js

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
solana address -k ./wallet.json # to get the public key
node get-token-account.js <public_key>
```

### --tests--

You should run `node get-token-account.js <public_key>` in the terminal.

```js

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

The `tokenAccount` variable should have a `amount` property, which is the number of tokens held by the account.

Currently, the token account has no tokens, because none have been minted into the account.

Create a file named `mint.js`.

### --tests--

You should have a file named `mint.js`.

```js

```

## 31

### --description--

Within `mint.js`, declare a variable `connection`, and assign it a new instance of the `Connection` class. Pass in your local Solana RPC URL as the first argument.

### --tests--

You should have `const connection = new Connection('http://localhost:8899');` in `mint.js`.

```js

```

You should import `Connection` from `@solana/web3.js`.

```js

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

Call the `mintTo` function, passing in the `connection`, `payer`, `mintPublicKey`, `tokenAccountPublicKey`, `mintAuthorityPublicKey`, and `1_000_000_000` variables as arguments.

### --tests--

You should have `await mintTo(connection, payer, mintPublicKey, tokenAccountPublicKey, mintAuthorityPublicKey, 1_000_000_000);` in `mint.js`.

```js

```

You should import `mintTo` from `@solana/spl-token`.

```js

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
import {
  payer,
  mintPublicKey,
  tokenAccountPublicKey,
  mintAuthorityPublicKey
} from './utils.js';

const connection = new Connection('http://localhost:8899');

await mintTo(
  connection,
  payer,
  mintPublicKey,
  tokenAccountPublicKey,
  mintAuthorityPublicKey,
  1_000_000_000
);
```

## 34

### --description--

Run the `get-token-account.js` script again, passing in the public key of the `payer` account as the first argument.

### --tests--

You should run `node get-token-account.js <public_key>` in the terminal.

```js

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

```

## 36

### --description--

Within `get-token-info.js`, declare a variable `connection`, and assign it a new instance of the `Connection` class. Pass in your local Solana RPC URL as the first argument.

### --tests--

You should have `const connection = new Connection('http://localhost:8899');` in `get-token-info.js`.

```js

```

You should import `Connection` from `@solana/web3.js`.

```js

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

Call the `getMint` function, passing in the `connection` and `mintPublicKey` variables as arguments, and assign the awaited result to a variable `mint`.

### --tests--

You should have `const mint = await getMint(connection, mintPublicKey);` in `get-token-info.js`.

```js

```

You should import `getMint` from `@solana/spl-token`.

```js

```

You should import `mintPublicKey` from `./utils.js`.

```js

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

```

### --seed--

#### --"get-token-info.js"--

```js
import { Connection } from '@solana/web3.js';
import { getMint } from '@solana/spl-token';

const connection = new Connection('http://localhost:8899');

const mint = await getMint(connection, mintPublicKey);
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
import { mintPublicKey } from './utils.js';

const connection = new Connection('http://localhost:8899');

const mint = await getMint(connection, mintPublicKey);

console.log(mint);
```

## 40

### --description--

The output should show a `supply` property of `1000000000n`, which means the total number of tokens minted is `1_000_000_000 / 9 = 1`.

Mint 2 more tokens to the `payer` account.

### --tests--

You should run `node mint.js` in the terminal.

```js

```

The `payer` account should have a balance of at least `3_000_000_000`.

```js

```

The total supply of tokens should be `3_000_000_000`.

```js

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

```

## 42

### --description--

Within `transfer.js`, declare a variable `connection`, and assign it a new instance of the `Connection` class. Pass in your local Solana RPC URL as the first argument.

### --tests--

You should have `const connection = new Connection('http://localhost:8899');` in `transfer.js`.

```js

```

You should import `Connection` from `@solana/web3.js`.

```js

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

```

You should import `PublicKey` from `@solana/web3.js`.

```js

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

```

You should import `Keypair` from `@solana/web3.js`.

```js

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

Call the function, passing in order: `connection`, `payer`, `mintPublicKey`, and the public key of `toWallet` as arguments. Assign the awaited result to a variable `toTokenAccount`.

### --tests--

You should have `const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, payer, mintPublicKey, toWallet.publicKey);` in `transfer.js`.

```js

```

You should import `getOrCreateAssociatedTokenAccount` from `@solana/spl-token`.

```js

```

You should import `payer` from `./utils.js`.

```js

```

You should import `mintPublicKey` from `./utils.js`.

```js

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

```

You should import `getAccount` from `@solana/spl-token`.

```js

```

### --seed--

#### --"transfer.js"--

```js
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import { payer, mintPublicKey } from './utils.js';

const connection = new Connection('http://localhost:8899');

const fromTokenAccountPublicKey = new PublicKey(process.argv[2]);

const toWallet = Keypair.generate();

const toTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mintPublicKey,
  toWallet.publicKey
);
```

## 47

### --description--

Assign the `owner` property of `fromWallet` to a variable `owner`.

### --tests--

You should have `const owner = fromWallet.owner;` in `transfer.js`.

```js

```

### --seed--

#### --"transfer.js"--

```js
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import {
  getOrCreateAssociatedTokenAccount,
  getAccount
} from '@solana/spl-token';
import { payer, mintPublicKey } from './utils.js';

const connection = new Connection('http://localhost:8899');

const fromTokenAccountPublicKey = new PublicKey(process.argv[2]);

const toWallet = Keypair.generate();

const toTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mintPublicKey,
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

```

### --seed--

#### --"transfer.js"--

```js
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import {
  getOrCreateAssociatedTokenAccount,
  getAccount
} from '@solana/spl-token';
import { payer, mintPublicKey } from './utils.js';

const connection = new Connection('http://localhost:8899');

const fromTokenAccountPublicKey = new PublicKey(process.argv[2]);

const toWallet = Keypair.generate();

const toTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mintPublicKey,
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

```

You should import `transfer` from `@solana/spl-token`.

```js

```

### --seed--

#### --"transfer.js"--

```js
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import {
  getOrCreateAssociatedTokenAccount,
  getAccount
} from '@solana/spl-token';
import { payer, mintPublicKey } from './utils.js';

const connection = new Connection('http://localhost:8899');

const fromTokenAccountPublicKey = new PublicKey(process.argv[2]);

const toWallet = Keypair.generate();

const toTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mintPublicKey,
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
import { payer, mintPublicKey } from './utils.js';

const connection = new Connection('http://localhost:8899');

const fromTokenAccountPublicKey = new PublicKey(process.argv[2]);

const toWallet = Keypair.generate();

const toTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mintPublicKey,
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

Run the `transfer.js` script passing in the `wallet.json` public key and any amount of tokens to transfer:

```bash
$ node transfer.js <wallet.json_public_key> <amount>
```

### --tests--

You should run the `transfer.js` script.

```js

```

The associated token account of `wallet.json` should have a lower balance than before.

```js

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
import { payer, mintPublicKey } from './utils.js';

const connection = new Connection('http://localhost:8899');

const fromTokenAccountPublicKey = new PublicKey(process.argv[2]);

const toWallet = Keypair.generate();

const toTokenAccount = await getOrCreateAssociatedTokenAccount(
  connection,
  payer,
  mintPublicKey,
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
