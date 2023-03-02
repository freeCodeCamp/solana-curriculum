# Solana - Build a University Certification NFT

## 1

### --description--

You have been contacted by Solana University to build an NFT that will be used to certify students who have completed their course. You will be building an NFT that will be minted by the university and will be used to certify students who have completed their course.

**User Stories**

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

## --fcc-end--
