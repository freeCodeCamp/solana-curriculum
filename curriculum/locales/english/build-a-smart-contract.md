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
  - The program should be written in `program/src/lib.rs`
  - The program should exort a `process_instruction` function with the `solana_program::entrypoint` parameter signature
  - The program should return the `NotEnoughAccountKeys` variant of `ProgramError` if the number of accounts is less than 1
  - The program should return the `IncorrectProgramId` variant of `ProgramError` if the account owner does not match the program id
  - The program should own a data account for storing a text message of 280 characters
    - The program data account should hold data in the form of:
      ```rust
      struct MessageAccount {
        message: String,
      }
      ```
  - The program should deserialize the `InstructionData` into a `String`, and store the string in the program data account
    - If the `InstructionData` is not deserializable into a `String`, the program should return the `InvalidInstructionData` variant of `ProgramError`
    - If the `String` length is greater than 280 characters, the program should return the `InvalidInstructionData` variant of `ProgramError`
    - The `InstructionData` should be padded with space characters to 280 characters
  - The program should be built using `cargo-build-sbf`
    - The resulting `.so` and `.json` files should be stored in the `dist/program/` directory
- You should write a script interacting with the smart contract
  - The script entrypoint should be `client/main.js`
  - The script should expect a string as a command line argument
    - If no argument is provided, the script should throw an error with the message `"No message provided"`
    - The string should be sent as the instruction data when calling the smart contract
  - The script should use the account stored in `wallet.json` to pay for transactions
  - The script should use the `dist/program/` keypair file to get the program id
  - The script should create a program data account, if one does not already exist
    - The program data account public key should be created using `"fcc-seed"` as the seed
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
const dir = await __helpers.getDirectory(join(__loc, 'dist', 'program'));
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
const dir = await __helpers.getDirectory(join(__loc, 'dist', 'program'));
let keypair;
for (const file of dir) {
  if (file.endsWith('.json')) {
    keypair = file;
  }
}
assert.exists(keypair, 'dist/program/ should have a .json file');
```

You should deploy the `.so` file as an executable program to the local net.

```js
const programKeypair = await __helpers.getProgramKeypair();
assert.exists(programKeypair, 'dist/program/ does not have a .json file');
const programId = programKeypair.publicKey;
const connection = __helpers.establishConnection();
assert.exists(connection, 'unable to establish connection to localnet');
const programAccountInfo = await connection.getAccountInfo(programId);
assert.exists(programAccountInfo, 'Program not deployed to the local net');
assert.equal(
  programAccountInfo.executable,
  true,
  'Program is not deployed as an executable'
);
```

The owner of the program account should be the associated account of the `wallet.json` keypair.

```js
const camperKeypair = await __helpers.getCamperKeypair();
assert.exists(camperKeypair, 'wallet.json does not exist');
const connection = __helpers.establishConnection();
assert.exists(connection, 'unable to establish connection to localnet');
const camperAccount = await connection.getAccountInfo(camperKeypair.publicKey);
assert.exists(camperAccount, 'wallet.json does not have an associated account');
const programKeypair = await __helpers.getProgramKeypair();
assert.exists(programKeypair, 'dist/program/ does not have a .json file');
const programId = programKeypair.publicKey;
const programAccountInfo = await connection.getAccountInfo(programId);
assert.exists(programAccountInfo, 'Program not deployed to the local net');
assert.equal(
  programAccountInfo.executable,
  true,
  'Program is not deployed as an executable'
);
const { stdout, stderr } = await __helpers.getCommandOutput(
  `solana program show ${programId}`
);
assert.include(stdout, 'Authority:', "Program owner not found, run 'solana program show <program_id>' and make sure there's an 'Authority' ID");
const authority = stdout.match(/Authority: \S+/gm)
assert.equal(
  authority[0].split(' ')[1],
  camperKeypair.publicKey.toBase58(),
  'Program account owner does not match the wallet.json account owner'
);
```

The program should return the `IncorrectProgramId` variant of `ProgramError` if the account owner does not match the program id.

```js
// Should pass `owner_not_program_id` test
const { stdout, stderr } = await __helpers.getCommandOutput(
  `cargo test owner_not_program_id`, `${__loc}/program`
);
assert.include(stdout, 'test owner_not_program_id ... ok');
```

The program should return the `NotEnoughAccountKeys` variant of `ProgramError` if the number of account keys is less than 1.

```js
// Should pass `no_accounts` test
const { stdout, stderr } = await __helpers.getCommandOutput(
  `cargo test no_accounts`, `${__loc}/program`
);
assert.include(stdout, 'test no_accounts ... ok');
```

The program should own a data account for storing a text message of 280 characters.

```js
const programKeypair = await __helpers.getProgramKeypair();
assert.exists(programKeypair, 'dist/program/ does not have a .json file');
const programId = programKeypair.publicKey;
const connection = __helpers.establishConnection();
assert.exists(connection, 'unable to establish connection to localnet');
const dataAccountPublicKey = await __helpers.getDataAccountPublicKey();
assert.exists(dataAccountPublicKey, 'Unable to get data account public key');
const dataAccountInfo = await connection.getAccountInfo(dataAccountPublicKey);
assert.exists(dataAccountInfo, 'Data account does not exist');
assert.equal(
  dataAccountInfo.owner.toBase58(),
  programId.toBase58(),
  'Data account owner does not match program id'
);
```

The data account should be created using the `wallet.json` public key, `"fcc-seed"` as the seed, and the program id as the owner.

```js
const expectedDataAccountPublicKey = await __helpers.getDataAccountPublicKey();
assert.exists(
  expectedDataAccountPublicKey,
  'Unable to get data account public key'
);
```

The program should deserialize the `InstructionData` into a `String`, and store the string in the program data account.

```js
// Should pass `instruction_is_deserialized` test
const { stdout, stderr } = await __helpers.getCommandOutput(
  `cargo test instruction_is_deserialized`, `${__loc}/program`
);
assert.include(stdout, 'test instruction_is_deserialized ... ok');
```

If the `InstructionData` is not deserializable into a `String`, the program should return the `InvalidInstructionData` variant of `ProgramError`.

```js
// Should pass `instruction_not_string` test
const { stdout, stderr } = await __helpers.getCommandOutput(
  `cargo test instruction_not_string`, `${__loc}/program`
);
assert.include(stdout, 'test instruction_not_string ... ok');
```

If the `String` length is greater than 280 characters, the program should return the `InvalidInstructionData` variant of `ProgramError`.

```js
// Should pass `instruction_too_long` test
const { stdout, stderr } = await __helpers.getCommandOutput(
  `cargo test instruction_too_long`, `${__loc}/program`
);
assert.include(stdout, 'test instruction_too_long ... ok');
```

The `InstructionData` should be padded with space characters to 280 characters.

```js
// Should pass `instruction_data_padded` test
const { stdout, stderr } = await __helpers.getCommandOutput(
  `cargo test instruction_data_padded`, `${__loc}/program`
);
assert.include(stdout, 'test instruction_data_padded ... ok');
```

You should write a `client/main.js` script interacting with the smart contract.

```js
const clientExists = await __helpers.fileExists(join(__loc, 'client'));
assert.isTrue(clientExists, 'client/ does not exist');
const mainExists = await __helpers.fileExists(join(__loc, 'client', 'main.js'));
assert.isTrue(mainExists, 'client/main.js does not exist');
```

Calling `node client/main.js` should throw an error with the message `"No message provided"`.

```js
const { stdout, stderr } = await __helpers.getCommandOutput(
  `node client/main.js`, __loc
);
assert.include(stderr, 'No message provided');
```

Calling `node client/main.js "Test string"` should change the message stored in the program data account.

```js
const { stdout, stderr } = await __helpers.getCommandOutput(
  `node client/main.js "Test string"`, __loc
);
const connection = __helpers.establishConnection();
assert.exists(connection, 'unable to establish connection to localnet');
const dataAccountPublicKey = await __helpers.getDataAccountPublicKey();
assert.exists(dataAccountPublicKey, 'Unable to get data account public key');
const message = await __helpers.getMessage(connection, dataAccountPublicKey);
assert.include(message, 'Test string');
assert.equal(message, 'Test string'.padEnd(280, ' '));
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
