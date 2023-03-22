# Solana - Build a University Certification NFT

## 1

### --description--

You have been contacted by Solana University to build an NFT that will be used to certify students who have completed their course. You will be building an NFT that will be minted by the university and will be used to certify students who have completed their course.

**User Stories**

1. You should generate a new keypair and store it in a file called `solana-university-wallet.json`
2. You should use the `solana-university-wallet.json` keypair as the payer for all transactions
3. You should generate two more keypairs stored in `student-1.json` and `student-2.json`
4. You should deploy the Metaplex Token Metadata program to your local Solana cluster
5. You should create a connection to your local cluster which should be used for all transactions
6. You should use the provided `localStorage` function in `utils.js` for the Metaplex storage driver
7. You should export a function named `uploadFile` from `index.js` with the signature defined in `index.d.ts`
   1. `uploadFile` should upload the provided `metaplexFile` parameter to the storage driver
   2. `uploadFile` should upload metadata consiting of the image URL returned from the storage driver, and the `fileName` property of the `metaplexFile`
   3. `uploadFile` should use the provided `payer` parameter as the fee payer for the metadata upload transaction
8. You should export a function named `createMintAccount` from `index.js` with the signature defined in `index.d.ts`
   1. `createMintAccount` should create and initialise a new NFT mint, using the provided `payer` parameter as the fee payer, mint authority, and freeze authority
9. You should export a function named `getMintAccounts` from `index.js` with the signature defined in `index.d.ts`
   1. `getMintAccounts` should return all mint accounts owned by the provided `payer` parameter
10. You should export a function named `createTokenAccount` from `index.js` with the signatrure defined in `index.d.ts`
11. `createTokenAccount` should get or create an associated token account for the provided `ownerAddress` parameter
12. `createTokenAccount` should use the provided `payer` parameter to pay for the transaction fee
13. `createTokenAccount` should use the provided `mintAddress` parameter as the mint associated with the token account
14. You should export a function named `mintToken` from `index.js` with the signature defined in `index.d.ts`
    1. `mintToken` should mint an NFT to the associated token account of the provided account (`ownerAddress`), using the existing mint account (`mintAddress`)
    2. `mintToken` should use the provided `uri` parameter to point to the JSON metadata
    3. `mintToken` should use the provided `year` parameter to give the NFT a `name` of `SOL-{year}`
    4. `mintToken` should mint an NFT with `0` royalties when resold
    5. `mintToken` should mint an NFT with a `symbol` of `SOLU`
    6. `mintToken` should mint an NFT that is set to immutable
    7. `mintToken` should mint an NFT owned by the associated token account of the provided account (`ownerAddress`)
    8. `mintToken` should mint an NFT with an update authority set to the provided `payer` parameter
    9. `mintToken` should mint an NFT with an mint authority set to the provided `payer` parameter
15. You should export a function named `getNFTs` from `index.js` with the signature defined in `index.d.ts`
    1. `getNFTs` should return all NFTs owned by the provided `ownerAddress` parameter
    2. `getNFTs` should use the provided `payer` parameter to pay for the transaction fee
16. You should use the Solana Univeristy Dashboard (`client/` _see below_) to create a new mint account
    1. The `payer` should be the `solana-university-wallet.json` keypair
17. You should use the Solana University Dashboard to create two token accounts associated with the new mint account, and owned by `student-1.json` and `student-2.json` respectively
18. You should use the Solana University Dashboard to upload a metaplex file to the storage driver
    1. You can use any image file for this, but one is provided: `solanaLogoMark.png`
19. You should use the Solana University Dashboard to mint one token to each new token account

**Types**

The expected signatures for your functions are visible in the `index.d.ts` file. This file should **not** be modified.

**Commands**

| Command                | Description                           |
| ---------------------- | ------------------------------------- |
| `npm run start:server` | Start the local storage driver        |
| `npm run start:client` | Start the Solana University dashboard |

**Notes**

- You should work entirely within the `build-a-university-certification-nft` directory.
- You can use provided Solana University dashboard (`client/`) to test and play around with your code.
- Useful links to API documentation:
  - [Solana JS SDK](https://solana-labs.github.io/solana-web3.js/)
  - [Metaplex JS SDK](https://github.com/metaplex-foundation/js)

### --tests--

You should deploy the Metaplex Token Metadata program to the local Solana cluster.

```js
const command = `curl http://127.0.0.1:8899 -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getProgramAccounts",
    "params": [
      "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
    ]
}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, {
    result: [
      {
        account: {
          owner: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
        }
      }
    ]
  });
} catch (e) {
  assert.fail(
    e,
    'Try running `solana-test-validator --bpf-program metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s ./mlp_token.so --reset`'
  );
}
```

The `~/.config/solana/cli/config.yml` file should have the URL set to `localhost`.

```js
const file = await __helpers.readFile('~/.config/solana/cli/config.yml');
const toMatch = 'json_rpc_url: http://localhost:8899';
assert.include(file, toMatch);
```

The validator should be running at `http://127.0.0.1:8899`.

```js
const command = `curl http://127.0.0.1:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e, 'Try running `solana-test-validator` in a separate terminal');
}
```

The local storage driver should be running at `http://localhost:3002/`.

```js
try {
  const res = await fetch('http://localhost:3002/status/ping');
  // Response should be 200 with text "pong"
  if (res.status === 200) {
    const text = await res.text();
    if (text !== 'pong') {
      throw new Error(`Expected response text "pong", got ${text}`);
    }
  } else {
    throw new Error(`Expected status code 200, got ${res.status}`);
  }
} catch (e) {
  assert.fail(e);
}
```

You should create a new keypair named `student-1.json`.

```js

```

You should create a new keypair named `student-2.json`.

```js

```

You should create a new keypair named `solana-university-wallet.json`.

```js

```

The `index.js` file should export a `uploadFile` function.

```js
const { uploadFile } = await __helpers.importSansCache(
  join(__projectDir, 'index.js')
);
assert.isFunction(uploadFile);
```

The `uploadFile` function should match the `index.d.ts` signature definition.

```js

```

The `index.js` file should export a `createMintAccount` function.

```js
const { createMintAccount } = await __helpers.importSansCache(
  join(__projectDir, 'index.js')
);
assert.isFunction(createMintAccount);
```

The `createMintAccount` function should match the `index.d.ts` signature definition.

```js

```

The `createMintAccount` function should create a new mint account for an NFT.

```js
// `payer` should be payer
// `payer` should be mint authority and freeze authority
// The mint should have 0 decimal places
```

The `createMintAccount` function should return the `PublicKey` of the mint account.

```js

```

The `index.js` file should export a `getMintAcconuts` function.

```js
const { getMintAccounts } = await __helpers.importSansCache(
  join(__projectDir, 'index.js')
);
assert.isFunction(getMintAccounts);
```

The `getMintAccounts` function should match the `index.d.ts` signature definition.

```js

```

The `getMintAccounts` function should return all mint accounts owned by the `payer` argument type `ParsedProgramAccounts`.

```js

```

The `index.js` file should export a `createTokenAccount` function.

```js
const { createTokenAccount } = await __helpers.importSansCache(
  join(__projectDir, 'index.js')
);
assert.isFunction(createTokenAccount);
```

The `createTokenAccount` function should match the `index.d.ts` signature definition.

```js

```

The `index.js` file should export a `mintToken` function.

```js
const { mintToken } = await __helpers.importSansCache(
  join(__projectDir, 'index.js')
);
assert.isFunction(mintToken);
```

The `mintToken` function should match the `index.d.ts` signature definition.

```js

```

The `index.js` file should export a `getNFTs` function.

```js
const { getNFTs } = await __helpers.importSansCache(
  join(__projectDir, 'index.js')
);
assert.isFunction(getNFTs);
```

The `getNFTs` function should match the `index.d.ts` signature definition.

```js

```

### --before-all--

```js
const __projectDir = 'build-a-university-certification-nft';
global.__projectDir = __projectDir;
```

### --after-all--

```js
delete global.__projectDir;
```

## --fcc-end--
