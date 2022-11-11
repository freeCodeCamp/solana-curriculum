# Solana - Build a Smart Contract

## 1

### --description--

You need to create a smart contract in Rust, deploy the contract to your localnet, and write a Nodejs script to interact with the contract.

**User Stories**

- You should generate a new keypair
  - The keypair should be stored in `wallet.json`
  - The keypair should be used to deploy the program account
  - The keypair should **not** use a BIP39 passphrase
- You should write a smart contract in Rust
  - The smart contract should be named `message`
  - The program should own a data account for storing a text message of 280 characters
  - The program should deserialize the `InstructionData` into a `String`, and store the string in the program data account
    - If the `String` length is greater than 280 characters, the program should return the `InvalidInstructionData` variant of `ProgramError`
    - The `InstructionData` should be padded with space characters to 280 characters
  - The program should be built using `cargo-build-sbf`
    - The resulting `.so` and `.json` files should be stored in the `dist/program/` directory
- You should write a script interacting with the smart contract
  - The script should expect a string as a command line argument
    - The string should be sent as the instruction data when calling the smart contract
  - The script should use the account stored in `wallet.json` to pay for transactions
  - The script should create a program data account, if one does not already exist
- You should have a local Solana cluster running at port `8899`
  - The program should be deployed to the local cluster
  - The program data account should be created on the local cluster

**NOTES:**

- All referenced paths are relative to `build-a-smart-contract/`

### --tests--

You should have a `wallet.json` file in the root of your project.

```js
const walletExists = __helpers.fileExists(join(__loc, 'wallet.json'));
assert.isTrue(walletExists, 'wallet.json should exist');
```

You should have a local Solana cluster running at port `8899`.

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

You should have a `dist/program/` directory.

```js
const distExists = __helpers.fileExists(join(__loc, 'dist'));
assert.isTrue(distExists, 'dist/ should exist');
const programExists = __helpers.fileExists(join(__loc, 'dist', 'program'));
assert.isTrue(programExists, 'dist/program/ should exist');
```

You should have a `.so` file in the `dist/program/` directory.

```js
const dir = await __helpers.getDirector(join(__loc, 'dist', 'program'));
let program;
for (const file of dir) {
  if (file.endsWith('.so')) {
    program = file;
  }
}
assert.exists(program, 'dist/program/ should have a .so file');
```

You should have a `.json` file in the `dist/program/` directory.

```js
const dir = await __helpers.getDirector(join(__loc, 'dist', 'program'));
let keypair;
for (const file of dir) {
  if (file.endsWith('.json')) {
    keypair = file;
  }
}
assert.exists(keypair, 'dist/program/ should have a .json file');
```

### --before-all--

```js
global.__loc = 'build-a-smart-contract';
```

### --after-all--

```js
delete global.__loc;
```

## --fcc-end--
