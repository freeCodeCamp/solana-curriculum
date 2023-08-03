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
try {
  const jsonOut = JSON.parse(stdout);
  assert.exists(jsonOut.result.find(r => r.pubkey === __programId));
} catch (e) {
  assert.fail(
    e,
    `Try running \`solana-test-validator --bpf-program ${__programId} mess.so --reset\``
  );
}
```

There should be a keypair named `messer-1.json`.

```js
const { access, constants } = await import('fs/promises');
await access(join(project.dashedName, 'messer-1.json'), constants.F_OK);

try {
  const { Keypair } = await import('@solana/web3.js');
  const keypair = Keypair.fromSecretKey(Uint8Array.from(__messer1_json));
} catch (e) {
  assert.fail(e, 'Try running `solana-keygen new --outfile messer-1.json`.');
}
```

There should be a keypair named `messer-2.json`.

```js
const { access, constants } = await import('fs/promises');
await access(join(project.dashedName, 'messer-2.json'), constants.F_OK);

try {
  const { Keypair } = await import('@solana/web3.js');
  const keypair = Keypair.fromSecretKey(Uint8Array.from(__messer2_json));
} catch (e) {
  assert.fail(e, 'Try running `solana-keygen new --outfile messer-2.json`.');
}
```

The `messer-1.json` keypair should have a balance greater than 0 SOL.

```js
const { stdout } = await __helpers.getCommandOutput(
  `solana balance ${project.dashedName}/messer-1.json`
);
const balance = stdout.trim()?.match(/\d+/)?.[0];
assert.isAbove(
  parseInt(balance),
  0,
  'Try running `solana airdrop 1 ./messer-1.json`.'
);
```

The `messer-2.json` keypair should have a balance greater than 0 SOL.

```js
const { stdout } = await __helpers.getCommandOutput(
  `solana balance ${project.dashedName}/messer-2.json`
);
const balance = stdout.trim()?.match(/\d+/)?.[0];
assert.isAbove(
  parseInt(balance),
  0,
  'Try running `solana airdrop 1 ./messer-2.json`.'
);
```

The `chat` account should be initialized.

```js
const accountInfo = await __connection.getAccountInfo(__chatPublicKey);
assert.exists(accountInfo);
```

The `messer-1.json` keypair should have sent at least 5 messages.

```js
const pubkey = __messer1_keypair.publicKey;
const chatData = await program.account.chat.fetch(pubkey);
const messages = chatData.messages.filter(m => m.sender.equals(pubkey));
assert.isAtLeast(messages.length, 5);
```

The `messer-2.json` keypair should have sent at least 5 messages.

```js
const pubkey = __messer2_keypair.publicKey;
const chatData = await program.account.chat.fetch(pubkey);
const messages = chatData.messages.filter(m => m.sender.equals(pubkey));
assert.isAtLeast(messages.length, 5);
```

At least 20 messages should have been sent.

```js
const chatData = await program.account.chat.fetch(__chatPublicKey);
assert.isAtLeast(chatData.messages.length, 20);
```

### --before-all--

```js
const { AnchorProvider, setProvider, Program } = await import(
  '@coral-xyz/anchor'
);
const { PublicKey, Connection, Keypair } = await import('@solana/web3.js');

setProvider(AnchorProvider.env());
const IDL = JSON.parse(await __helpers.getFile('mess.json'));
const PROGRAM_ID = new PublicKey(
  '8D2EQasXmadK7bWhRPrkryhAGYtERQzzGMJVGiisUqqh'
);
const program = new Program(IDL, PROGRAM_ID);

const connection = new Connection('http://localhost:8899', 'confirmed');

const [chatPublicKey, _] = PublicKey.findProgramAddressSync(
  [Buffer.from('global')],
  new PublicKey('8D2EQasXmadK7bWhRPrkryhAGYtERQzzGMJVGiisUqqh')
);

try {
  const messer1_keypair = JSON.parse(
    await __helpers.getFile(join(project.dashedName, 'messer-1.json'))
  );
  const messer2_keypair = JSON.parse(
    await __helpers.getFile(join(project.dashedName, 'messer-2.json'))
  );
  global.__messer1_json = messer1_keypair;
  global.__messer2_json = messer2_keypair;

  const keypair1 = Keypair.fromSecretKey(Uint8Array.from(__messer1_keypair));
  const keypair2 = Keypair.fromSecretKey(Uint8Array.from(__messer2_keypair));

  global.__messer1_keypair = keypair1;
  global.__messer2_keypair = keypair2;
} catch (e) {
  logover.warn(
    'You need to create two keypairs. Try running `solana-keygen new --outfile messer-1.json` and `solana-keygen new --outfile messer-2.json`.',
    e
  );
}

global.__chatPublicKey = chatPublicKey;
global.__connection = connection;
global.__programId = PROGRAM_ID;
global.__program = program;
```

### --after-all--

```js
delete global.__messer1_keypair;
delete global.__messer2_keypair;
delete global.__chatPublicKey;
delete global.__messer1_json;
delete global.__messer2_json;
delete global.__connection;
delete global.__programId;
delete global.__program;
```

## --fcc-end--
