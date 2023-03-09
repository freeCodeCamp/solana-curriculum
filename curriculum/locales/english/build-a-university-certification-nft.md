# Solana - Build a University Certification NFT

## 1

### --description--

You have been contacted by Solana University to build an NFT that will be used to certify students who have completed their course. You will be building an NFT that will be minted by the university and will be used to certify students who have completed their course.

**User Stories**

1. You should generate a new keypair and store it in a file called `solana-university-wallet.json`
2. You should use the `

**Types**

```typescript
payer: Signer;
mintAddress: PublicKey;
ownerAddress: PublicKey;

type ParsedProgramAccounts = {
  pubkey: PublicKey;
  account: AccountInfo<ParsedAccountData | Buffer>;
}[];
```

**Commands**

| Command                | Description                           |
| ---------------------- | ------------------------------------- |
| `npm run start:server` | Start the local storage driver        |
| `npm run start:client` | Start the Solana University dashboard |

**Notes**

- You should work entirely within the `build-a-university-certification-nft` directory.

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

The local storage driver should be running at `http://127.0.0.1:3001`.

```js
try {
  const res = await fetch('http://127.0.0.1:3001/ping');
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

The `index.js` file should export a `uploadFile` function.

```js

```

The `uploadFile` function should expect a `MetaplexFile` as an argument.

```js

```

The `index.js` file should export a `createMintAccount` function.

```js

```

The `createMintAccount` function should expect `{payer}` as an argument.

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

The `getMintAccounts` function should expect `{payer}` as an argument.

```js

```

The `getMintAccounts` function should return all mint accounts owned by the `payer` argument type `ParsedProgramAccounts`.

```js

```

The `index.js` file should export a `createTokenAccount` function.

```js

```

The `createTokenAccount` function should expect `{payer, mintAddress, ownerAddress}` as an argument.

```js

```

The `index.js` file should export a `mintToken` function.

```js

```

The `mintToken` function should expect `{payer, mintAddress, ownerAddress}` as an argument.

```js

```

## --fcc-end--
