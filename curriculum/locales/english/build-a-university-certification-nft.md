# Solana - Build a University Certification NFT

## 1

### --description--

You have been contacted by Solana University to build an NFT that will be used to certify students who have completed their course. You will be building an NFT that will be minted by the university and will be used to certify students who have completed their course.

**User Stories**

1. You should generate a new keypair and store it in a file called `solana-university-wallet.json`
2. You should use the `solana-university-wallet.json` keypair as the payer for all transactions
3. You should generate two more keypairs stored in `student-1.json` and `student-2.json`
4. You should deploy the Metaplex Token Metadata program to your local Solana cluster
5. You should use the provided `localStorage` function in `utils.js` for the Metaplex storage driver
6. You should export a function named `uploadFile` from `index.js` with the signature defined in `index.d.ts`
   1. `uploadFile` should upload the provided `metaplexFile` parameter to the storage driver
   2. `uploadFile` should upload metadata consiting of the image URL returned from the storage driver, and the `fileName` property of the `metaplexFile`
   3. `uploadFile` should use the provided `payer` parameter as the fee payer for the metadata upload transaction
7. You should export a function named `createMintAccount` from `index.js` with the signature defined in `index.d.ts`
   1. `createMintAccount` should create and initialise a new NFT mint, using the provided `payer` parameter as the fee payer, mint authority, and freeze authority
8. You should export a function named `getMintAccounts` from `index.js` with the signature defined in `index.d.ts`
   1. `getMintAccounts` should return all mint accounts owned by the provided `payer` parameter
9. You should export a function named `createTokenAccount` from `index.js` with the signatrure defined in `index.d.ts`
   1. `createTokenAccount` should get or create an associated token account for the provided `ownerAddress` parameter
   2. `createTokenAccount` should use the provided `payer` parameter to pay for the transaction fee
   3. `createTokenAccount` should use the provided `mintAddress` parameter as the mint associated with the token account
10. You should export a function named `mintToken` from `index.js` with the signature defined in `index.d.ts`
    1. `mintToken` should mint an NFT to the associated token account of the provided <!-- NAME OF STANDARD ACCOUNT --> (`ownerAddress`), using the existing mint account (`mintAddress`)
    2. `mintToken` should use the provided `uri` parameter to point to the JSON metadata
    3. `mintToken` should use the provided `year` parameter to give the NFT a `name` of `SOL-{year}`
    4. `mintToken` should mint an NFT with `0` royalties when resold
    5. `mintToken` should mint an NFT with a `symbol` of `SOLU`
    6. `mintToken` should mint an NFT that is set to immutable
    7. `mintToken` should mint an NFT owned by the associated token account of the provided <!-- NAME OF STANDARD ACCOUNT --> (`ownerAddress`)
    8. `mintToken` should mint an NFT with an update authority set to the provided `payer` parameter
    9. `mintToken` should mint an NFT with an mint authority set to the provided `payer` parameter

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

### --tests--

You should deploy the Metaplex Token Metadata program to the local Solana cluster.

```js

```

The `~/.config/solana/cli/config.yml` file should have the URL set to `localhost`.

```js

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

The local storage driver should be running at `http://localhost:3002`.

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

```

The `uploadFile` function should match the `index.d.ts` signature definition.

```js

```

The `index.js` file should export a `createMintAccount` function.

```js

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

```

The `getMintAccounts` function should match the `index.d.ts` signature definition.

```js

```

The `getMintAccounts` function should return all mint accounts owned by the `payer` argument type `ParsedProgramAccounts`.

```js

```

The `index.js` file should export a `createTokenAccount` function.

```js

```

The `createTokenAccount` function should match the `index.d.ts` signature definition.

```js

```

The `index.js` file should export a `mintToken` function.

```js

```

The `mintToken` function should match the `index.d.ts` signature definition.

```js

```

## --fcc-end--
