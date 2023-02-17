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

Within `spl-program/mint-token.js`, change the `amount` argument of the `mintTo` call to `1`.

### --tests--

The `mintTo` call within `spl-program/mint-token.js` should have an `amount` argument of `1`.

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

<!-- 2. Create token account -->

<!-- 3. Mint token -->

## --fcc-end--
