# Solana - Build a Client Side App

## 1

### --description--

You are developing a client-side app to interact with the `mess.so` program.

The `mess.so` program consists of a `chat` account that stores a list of <= 20 messages.

You will be working entirely within the `build-a-client-side-app/` directory.

### User Stories

1. You should generate two new keypairs stored in `messer-1.json` and `messer-2.json`.
2. You should deploy the `mess.so` program to a local Solana validator.
3. You should airdrop SOL into each of the two keypairs.
4. You should initialize the `chat` account, by calling the `init` instruction.
   1. The payer should be one of the two keypairs.
5. You should send at least 20 messages using your client app.
   1. At least 5 messages should be sent from each of the two keypairs.

#### Types

- The `mess` program IDL is stored in `mess.ts`.

### Notes

- The `mess.so` program id is `TODO`.
- The `chat` account has a seed of `"global"`.

### --tests--

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

The mess program should be deployed.

```js
const command = `curl http://127.0.0.1:8899 -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getProgramAccounts",
    "params": [
      "BPFLoader2111111111111111111111111111111111", {
        "encoding": "base64",
        "dataSlice": {
          "length": 0,
          "offset": 0
        }
      }
    ]
}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
const expectedProgramId = '8D2EQasXmadK7bWhRPrkryhAGYtERQzzGMJVGiisUqqh';
try {
  const jsonOut = JSON.parse(stdout);
  assert.exists(jsonOut.result.find(r => r.pubkey === expectedProgramId));
} catch (e) {
  assert.fail(
    e,
    `Try running \`solana-test-validator --bpf-program ${expectedProgramId} mess.so --reset\``
  );
}
```

There should be a keypair named `messer-1.json`.

```js

```

There should be a keypair named `messer-2.json`.

```js

```

The `messer-1.json` keypair should have a balance greater than 0 SOL.

```js

```

The `messer-2.json` keypair should have a balance greater than 0 SOL.

```js

```

The `chat` account should be initialized.

```js

```

The `messer-1.json` keypair should have sent at least 5 messages.

```js

```

The `messer-2.json` keypair should have sent at least 5 messages.

```js

```

At least 20 messages should have been sent.

```js

```

## --fcc-end--
