# Solana - Build a Smart Contract

## 1

### --description--

You need to create a smart contract in Rust, deploy the contract to your localnet, and write a Nodejs script to interact with the contract.

**User Stories**

- You should generate a new keypair
  - The keypair should be stored in `wallet.json`
  - This keypair should be used to deploy the program account
  - The keypair should **not** use a BIP39 passphrase
- You should write a smart contract in Rust
  - The smart contract should be named `message`
  - The program should own a data account for storing a text message of 280 characters
  - The program should deserialize the `InstructionData` into a `String`, and store the string in the program data account
    - If the `String` length is greater than 280 characters, the program should return the `InvalidInstructionData` variant of `ProgramError`
    - The `InstructionData` should be padded with space characters to 280 characters
  - The program should be deployed to the localnet
- You should write a script interacting with the smart contract
  - The script should expect a string as a command line argument
    - This string should be sent as the instruction data when calling the smart contract
  - The script should use the account stored in `wallet.json` to pay for transactions
- You should have a local Solana cluster running at port `8899`

**NOTES:**

- All referenced paths are relative to `build-a-smart-contract/`

### --tests--

You should have a `wallet.json` file in the root of your project.

```js
const walletExists = __helpers.fileExists(join(__loc, 'wallet.json'));
assert.isTrue(walletExists, 'wallet.json should exist');
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
