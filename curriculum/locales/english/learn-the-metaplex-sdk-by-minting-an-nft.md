# Solana - Learn the Metaplex SDK by Minting an NFT

## 1

### --description--

In this project, you will learn how to use the Metaplex JavaScript SDK to mint a <dfn title="A digitally transferable asset whose supply is 1">Non-Fungible Token (NFT)</dfn> on the Solana blockchain. You will learn how to add metadata to your NFT, and how to upload your NFT somewhere it can be viewed by others.

For the duration of this project, you will be working in the `learn-the-metaplex-sdk-by-minting-an-nft/` directory.

Change into the above directory in a new bash terminal.

### --tests--

You can use `cd` to change into the `learn-the-metaplex-sdk-by-minting-an-nft/` directory.

```js
const cwdFile = await __helpers.getCWD();
const cwd = cwdFile.split('\n').filter(Boolean).pop();
assert.include(cwd, 'learn-the-metaplex-sdk-by-minting-an-nft');
```

## 2

### --description--

So far, you have interacted with the _System Program_, created and deployed your own program, and interacted with the _Token Program_. Now, you will interact with the _Metaplex Token Program_ to mint your NFT.

Starting from the same code as the previous project, you will change the the way the mint account is created, and the way the token is minted such that it is an NFT.

Create a new keypair in a file called `wallet.json`.

### --tests--

You should have a `wallet.json` file in the `learn-the-metaplex-sdk-my-minting-an-nft/` directory.

```js
const walletJsonExists = __helpers.fileExists(
  'learn-the-metaplex-sdk-by-minting-an-nft/wallet.json'
);
assert.isTrue(walletJsonExists, 'The `wallet.json` file should exist');
const walletJson = JSON.parse(
  await __helpers.getFile(
    'learn-the-metaplex-sdk-by-minting-an-nft/wallet.json'
  )
);
assert.isArray(
  walletJson,
  'The `wallet.json` file should be an array of numbers.\nRun `solana-keygen new --outfile wallet.json` to create a new keypair.'
);
```

## 3

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

## 4

### --description--

Use the Solana CLI to get the public key of the wallet you created. Put this public key in the `env.WALLET_ADDRESS` property of the `package.json` file.

### --tests--

The `package.json` file should have a `env.WALLET_ADDRESS` property.

```js
const packageJson = JSON.parse(
  await __helpers.getFile(
    'learn-the-metaplex-sdk-by-minting-an-nft/package.json'
  )
);
assert.property(
  packageJson,
  'env',
  'The `package.json` file should have an `env` property.'
);
assert.property(
  packageJson.env,
  'WALLET_ADDRESS',
  'The `package.json` file should have an `env.WALLET_ADDRESS` property.'
);
```

The `env.WALLET_ADDRESS` property should match the public key of `wallet.json`.

```js
const command =
  'solana address -k learn-the-metaplex-sdk-by-minting-an-nft/wallet.json';
const { stdout, stderr } = await __helpers.getCommandOutput(command);
const walletAddress = stdout.trim();
assert.equal(
  packageJson.env.WALLET_ADDRESS,
  walletAddress,
  'The `env.WALLET_ADDRESS` property should match the public key of `wallet.json`.'
);
```

## 5

### --description--

<!-- 1. Create mint account -->

Following the same steps to create a fungible token, now a mint account for your NFT needs to be created.

Seeing as NFT's are not divisible - you cannot own 0.1 of an NFT - the decimal argument of the `createMint` call needs to be changed. Within `spl-program/create-mint-account.js`, change the decimal place argument to `0`.

### --tests--

The `createMint` call within `spl-program/create-mint-account.js` should have a decimal place argument of `0`.

```js

```

## 6

### --description--

Another properties of NFT's is that there is only one of each NFT. This means that the `mintTo` call needs to be changed to mint only one token.

Within `spl-program/mint.js`, change the `amount` argument of the `mintTo` call to `1`.

### --tests--

The `mintTo` call within `spl-program/mint.js` should have an `amount` argument of `1`.

```js

```

## 7

### --description--

Once the NFT has been minted to an account, the mint authority needs to be removed from the mint account. The mint authority is the only account that can mint more tokens. If the mint authority is removed, then no more tokens can be minted.

Within `spl-program/mint.js`, import the `setAuthority` function from `@solana/spl-token`, to change the mint authority.

```typescript
setAuthority(
  connection: Connection,
  payer: Signer,
  account: PublicKey,
  currentAuthority: Signer | PublicKey,
  authorityType: AuthorityType, // Import this enum from @solana/spl-token!
  newAuthority: PublicKey | null
): Promise
```

Call and await the `setAuthority` function, passing in the `connection`, `payer`, `mintAddress`, `mintAuthority`, `AuthorityType.MintTokens`, and `null` arguments.

### --tests--

You should have `await setAuthority(connection, payer, mintAddress, mintAuthority, AuthorityType.MintTokens, null);` in `spl-program/mint.js`.

```js
const expressionStatement = babelisedCode
  .getExpressionStatements()
  .find(
    e =>
      e.expression.type === 'AwaitExpression' &&
      e.expression.argument?.callee?.name === 'setAuthority'
  );
assert.exists(
  expressionStatement,
  'An `await setAuthority(...)` expression should exist'
);
const setAuthorityArguments = expressionStatement.expression.argument.arguments;
const [
  connectionArgument,
  payerArgument,
  mintAddressArgument,
  mintAuthorityArgument,
  authorityTypeMemberExpressionArgument,
  nullArgument
] = setAuthorityArguments;
assert.equal(
  connectionArgument?.name,
  'connection',
  'The first argument to `setAuthority` should be `connection`'
);
assert.equal(
  payerArgument?.name,
  'payer',
  'The second argument to `setAuthority` should be `payer`'
);
assert.equal(
  mintAddressArgument?.name,
  'mintAddress',
  'The third argument to `setAuthority` should be `mintAddress`'
);
assert.equal(
  mintAuthorityArgument?.name,
  'mintAuthority',
  'The fourth argument to `setAuthority` should be `mintAuthority`'
);
assert.equal(
  authorityTypeMemberExpressionArgument?.object?.name,
  'AuthorityType',
  'The fifth argument to `setAuthority` should be `AuthorityType.MintTokens`'
);
assert.equal(
  authorityTypeMemberExpressionArgument?.property?.name,
  'MintTokens',
  'The fifth argument to `setAuthority` should be `AuthorityType.MintTokens`'
);
assert.equal(
  nullArgument?.type,
  'NullLiteral',
  'The sixth argument to `setAuthority` should be `null`'
);
```

You should import `setAuthority` from `@solana/spl-token`.

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
  'setAuthority',
  '`setAuthority` should be imported from `@solana/spl-token`'
);
```

You should import `AuthorityType` from `@solana/spl-token`.

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
  'AuthorityType',
  '`AuthorityType` should be imported from `@solana/spl-token`'
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

## 8

### --description--

With those small changes, you can now mint an NFT!

Run the following to create the mint account:

```bash
node spl-program/create-mint-account.js
```

### --tests--

You should run `node spl-program/create-mint-account.js` in the terminal.

```js

```

The command should succeed.

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

## 9

### --description--

Put the mint address in `env.MINT_ACCOUNT_ADDRESS` in the `package.json` file.

### --tests--

The `package.json` file should have a `env.MINT_ACCOUNT_ADDRESS` property.

```js
const packageJson = JSON.parse(
  await __helpers.getFile(
    'learn-the-metaplex-sdk-by-minting-an-nft/package.json'
  )
);
assert.property(
  packageJson,
  'env',
  'The `package.json` file should have an `env` property.'
);
assert.property(
  packageJson.env,
  'MINT_ACCOUNT_ADDRESS',
  'The `package.json` file should have an `env.MINT_ACCOUNT_ADDRESS` property.'
);
```

The `env.MINT_ACCOUNT_ADDRESS` property should match an NFT owned by `wallet.json`.

```js
const command =
  'solana address -k learn-the-metaplex-sdk-by-minting-an-nft/wallet.json';
const { stdout, stderr } = await __helpers.getCommandOutput(command);
const walletAddress = stdout.trim();

const packageJson = JSON.parse(
  await __helpers.getFile(
    'learn-the-metaplex-sdk-by-minting-an-nft/package.json'
  )
);
assert.property(
  packageJson,
  'env',
  'The `package.json` file should have an `env` property.'
);

assert.equal(
  packageJson.env.WALLET_ADDRESS,
  walletAddress,
  'The `env.WALLET_ADDRESS` property should match the public key of `wallet.json`.'
);

try {
  const { Connection } = await import('@solana/web3.js');
  const { TOKEN_PROGRAM_ID } = await import('@solana/spl-token');
  const connection = new Connection('http://127.0.0.1:8899');

  const mintAccounts = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID,
    {
      filters: [
        {
          dataSize: 82
        },
        {
          memcmp: {
            offset: 4,
            bytes: packageJson.env.MINT_ADDRESS
          }
        }
      ]
    }
  );

  const mintAccount = mintAccounts.find(
    ({ pubkey }) => pubkey === packageJson.env.MINT_ADDRESS
  );
  assert.exists(
    mintAccount,
    'The `env.MINT_ACCOUNT_ADDRESS` property should match an NFT owned by `wallet.json`.'
  );
} catch (e) {
  assert.fail(e);
}
```

## 10

### --description--

Run the following to create the token account:

```bash
node spl-program/create-token-account.js
```

### --tests--

You should run `node spl-program/create-token-account.js` in the terminal.

```js

```

The command should succeed.

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

## 11

### --description--

Put the token account address in `env.TOKEN_ACCOUNT_ADDRESS` in the `package.json` file.

### --tests--

The `package.json` file should have a `env` property.

```js
const packageJson = JSON.parse(
  await __helpers.getFile(
    'learn-the-metaplex-sdk-by-minting-an-nft/package.json'
  )
);
assert.property(
  packageJson,
  'env',
  'The `package.json` file should have an `env` property.'
);
```

The `package.json` file should have a `env.TOKEN_ACCOUNT_ADDRESS` property.

```js
const packageJson = JSON.parse(
  await __helpers.getFile(
    'learn-the-metaplex-sdk-by-minting-an-nft/package.json'
  )
);
assert.property(
  packageJson.env,
  'TOKEN_ACCOUNT_ADDRESS',
  'The `package.json` file should have an `env` property.'
);
```

The `env.TOKEN_ACCOUNT_ADDRESS` property should match an NFT owned by `wallet.json`.

```js
const command =
  'solana address -k learn-the-metaplex-sdk-by-minting-an-nft/wallet.json';
const { stdout, stderr } = await __helpers.getCommandOutput(command);
const walletAddress = stdout.trim();

const packageJson = JSON.parse(
  await __helpers.getFile(
    'learn-the-metaplex-sdk-by-minting-an-nft/package.json'
  )
);
assert.property(
  packageJson,
  'env',
  'The `package.json` file should have an `env` property.'
);

assert.equal(
  packageJson.env.WALLET_ADDRESS,
  walletAddress,
  'The `env.WALLET_ADDRESS` property should match the public key of `wallet.json`.'
);

try {
  const { Connection } = await import('@solana/web3.js');
  const { TOKEN_PROGRAM_ID } = await import('@solana/spl-token');
  const connection = new Connection('http://127.0.0.1:8899');

  const tokenAccounts = await connection.getParsedProgramAccounts(
    TOKEN_PROGRAM_ID,
    {
      filters: [
        {
          dataSize: 165
        },
        {
          memcmp: {
            offset: 32,
            bytes: packageJson.env.WALLET_ADDRESS
          }
        }
      ]
    }
  );

  const tokenAccount = tokenAccount.find(
    ({ pubkey }) => pubkey === packageJson.env.TOKEN_ACCOUNT_ADDRESS
  );
  assert.exists(
    mintAccount,
    'The `env.TOKEN_ACCOUNT_ADDRESS` property should match an NFT owned by `wallet.json`.'
  );
  assert.equal(
    tokenAccount.account.data.parsed.info.mint,
    packageJson.env.MINT_ACCOUNT_ADDRESS,
    'The `env.TOKEN_ACCOUNT_ADDRESS` should be associated with the `env.MINT_ACCOUNT_ADDRESS`.'
  );
} catch (e) {
  assert.fail(e);
}
```

## 12

### --description--

Run the following to mint the NFT to the token account:

```bash
node spl-program/mint.js
```

### --tests--

You should run `node spl-program/mint.js` in the terminal.

```js
// Test command is run in correct directory
```

The command should succeed.

```js
// Test authority is null
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

Run the following to confirm the NFT has no mint authority, and has a total supply of 1:

```bash
node spl-program/get-token-info.js
```

### --tests--

You should run `node spl-program/get-token-info.js` in the terminal.

```js
// Test command is run in correct directory
```

The command should succeed.

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

You often hear about NFTs being odd pictures of a cat, but what if you wanted to associate more information with the NFT? For example, you could associate a name, description, and image with the NFT. This is where metadata comes in.

The metadata file is stored on IPFS, and the NFT is associated with the metadata file by storing the IPFS hash in the NFT's data field.

There are many accounts and files involved in the process of creating an NFT with metadata. Metaplex has a JavaScript SDK which provides common functionality for creating NFTs with metadata.

Install version `0.18.1` of `@metaplex-foundation/js`.

### --tests--

You should install `@metaplex-foundation/js` version `0.18.1`.

```js
const packageJson = JSON.parse(
  await __helpers.getFile(
    'learn-the-metaplex-sdk-by-minting-an-nft/package.json'
  )
);
assert.property(
  packageJson.dependencies,
  '@metaplex-foundation/js',
  'The `package.json` file should have a `@metaplex-foundation/js` dependency.'
);
assert.equal(
  packageJson.dependencies['@metaplex-foundation/js'],
  '0.18.1',
  'Try running `npm install --save-exact @metaplex-foundation/js@0.18.1` in the terminal.'
);
```

## 15

### --description--

Create a file called `create-nft.js`.

### --tests--

You should create a file called `create-nft.js`.

```js
const fileExists = __helpers.fileExists(
  'learn-the-metaplex-sdk-by-minting-an-nft/create-nft.js'
);
assert.isTrue(
  fileExists,
  'The `learn-the-metaplex-sdk-by-minting-an-nft/create-nft.js` file should exist.'
);
```

## 16

### --description--

Within `create-nft.js`, create a `connection` variable set to a new `Connection` of your local Solana validator.

### --tests--

You should have `const connection = new Connection('http://127.0.0.1:8899');` in `create-nft.js`.

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
  'http://127.0.0.1:8899',
  "You should create a new connection with `new Connection('http://127.0.0.1:8899')`"
);
```

You should import `Connection` from `@solana/web3.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === '@solana/web3.js';
});
assert.exists(importDeclaration, 'You should import from `@solana/web3.js`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(
  importSpecifiers,
  'Connection',
  '`Connection` should be imported from `@solana/spl-token`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  'learn-the-metaplex-sdk-by-minting-an-nft/create-nft.js'
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

Import the `Metaplex` class from the Metaplex SDK, create a `metaplex` variable, and set it to:

```js
Metaplex.make();
```

### --tests--

You should have `const metaplex = Metaplex.make();` in `create-nft.js`.

```js

```

You should import `Metaplex` from `@metaplex-foundation/js`.

```js

```

## 18

### --description--

The `make` method on the `Metaplex` class expects a `Connection` that will be used to communicate with the cluster.

Pass the `connection` variable to the `make` method.

### --tests--

You should have `const metaplex = Metaplex.make(connection);` in `create-nft.js`.

```js

```

## 19

### --description--

The `Metaplex` class has chainable `use` methods that allow you to configure the `Metaplex` instance with `MetaplexPlugin` implementations.

Configure the `Metaplex` instance to use the wallet keypair as the primary identity for transactions:

```js
Metaplex.make(connection).use(keypairIdentity(WALLET_KEYPAIR));
```

The `keypairIdentity` function takes a `Keypair` and returns a `MetaplexPlugin`, and is exported from `@metaplex-foundation/js`.

The `WALLET_KEYPAIR` variable is a `Keypair` created from the `wallet.json` file,a nd is already exported from `utils.js`.

### --tests--

You should have `const metaplex = Metaplex.make(connection).use(keypairIdentity(WALLET_KEYPAIR));` in `create-nft.js`.

```js

```

You should import `keypairIdentity` from `@metaplex-foundation/js`.

```js

```

You should import `WALLET_KEYPAIR` from `utils.js`.

```js

```

## 20

The final configuration required is the _storage driver_ that will be used to store the NFT's metadata. This is because the NFT's metadata is not stored on-chain, but rather in a separate, often cheaper, storage system.

Some common metadata storage locations are:

- IPFS
- Arweave
- AWS

For the purpose of testing, and to avoid having to pay for storage, you can use the `localStorage` driver which will generate random URLs and keep track of their content in a local server.

Configure the `Metaplex` instance to use the `localStorage` driver.

### --tests--

You should have `const metaplex = Metaplex.make(connection).use(keypairIdentity(WALLET_KEYPAIR)).use(localStorage());` in `create-nft.js`.

```js

```

You should import `localStorage` from `utils.js`.

```js

```

## 21

### --description--

The storage driver takes an object with a `baseUrl` property, which is the base URL that will be used to generate the metadata URLs.

Set the `baseUrl` to `http://127.0.0.1:3001`.

### --tests--

You should have `const metaplex = Metaplex.make(connection).use(keypairIdentity(WALLET_KEYPAIR)).use(localStorage({ baseUrl: 'http://127.0.0.1:3001' }));` in `create-nft.js`.

```js

```

## 22

### --description--

You can use any image you want for your NFT, but one is provided for you in the `assets` folder.

Declare a variable `imageBuffer`, and set it to the contents of the `assets/pic.png` file. You can use the `fs` module to read the file.

### --tests--

You can use `const imageBuffer = readFile('assets/pic.png');` in `create-nft.js`.

```js

```

You should import one of the file-reading API.

```js
// fs, fs/promises
// readFileSync, readFile, read
```

## 23

### --description--

The `@metaplex-foundation/js` module exports a `toMetaplexFile` function:

```typescript
toMetaplexFile(
  content: MetaplexFileContent,
  fileName: string
): MetaplexFile
```

The `MetaplexFile` type contains useful metadata about the file which is useful for your NFT's metadata.

Declare a `file` variable, and set it to the result of calling `toMetaplexFile` with the `imageBuffer` and the filename `pic.png`.

### --tests--

You should have `const file = toMetaplexFile(imageBuffer, 'pic.png');` in `create-nft.js`.

```js

```

You should import `toMetaplexFile` from `@metaplex-foundation/js`.

```js

```

## 24

### --description--

The `Metaplex` class has a `storage` method that returns the storage driver configured earlier. The storage driver has an `upload` method that takes a `MetaplexFile` and returns a `Promise` that resolves to a `string` containing the URL of the uploaded file.

Declare an `image` variable, and set it to the result of awaiting `metaplex.storage().upload(file)`.

### --tests--

You should have `const image = await metaplex.storage().upload(file);` in `create-nft.js`.

```js

```

## 25

### --description--

With the URL to the uploaded image, you can upload the NFT's metadata. The `Metaplex` class has an `nfts` method that returns many useful methods for working with NFT's. One of these methods is `uploadMetadata`

<!-- Fail to run `metaplex.nfts().create()` because of missing program -->

<!-- `.create` will take care of creating the mint account, the associated token account, the metadata PDA and the original edition PDA (a.k.a. the master edition) for you. -->

<!-- 5. Get dump of metaplex_token_program from mainnet -->

<!-- 6. Deploy dump to local cluster -->

<!-- 7. Start a local cluster with program deployed: `npm run start:validator` -->

## 99

### --description--

**Summary**

The main differences between NFT's and fungible tokens are:

- NFT's are not divisible
- Only one NFT of a mint can exist
- No more NFT's can be minted once the mint authority is removed

## --fcc-end--
