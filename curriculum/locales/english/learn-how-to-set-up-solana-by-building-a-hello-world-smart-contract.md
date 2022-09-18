# Solana - Learn How to Set Up Solana by Building a Hello World Smart Contract

## 1

### --description--

Welcome to the Solana curriculum! For the duration of this project, you will be working in the `learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/` directory.

Open a new terminal, and change into the above directory.

_Note: Do not change the existing terminal_

### --tests--

You should use `cd` to change into the `learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/` directory.

```js
const cwdFile = await __helpers.getCWD();
const cwd = cwdFile.split('\n').filter(Boolean).pop();
assert.include(
  cwd,
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract'
);
```

## 2

### --description--

You will be using the Solana CLI to:

- Configure your cluster
- Create Keypairs
- Log useful information
- Deploy your on-chain program

Install the Solana CLI with:

```bash
sh -c "$(curl -sSfL https://release.solana.com/v1.11.10/install)"
```

### --tests--

You should run the above bash command to install the Solana CLI.

```js
const lastCommand = await __helpers.getLastCommand();

assert.match(
  lastCommand,
  /sh -c "\$\(curl -sSfL https:\/\/release\.solana\.com\/v1\.11\.10\/install\)"/
);
```

## 3

### --description--

You will likely need to adjust the environment variable for your `PATH`, in order for you to use the `solana` alias.

If prompted in the terminal, update your `PATH` environment variable to include the Solana programs.

**Note:** You need to manually click the _Run Tests_ button.

### --tests--

You should copy the given PATH command into your terminal.

```js
const terminalOut = await __helpers.getTerminalOutput();
const mat = terminalOut.match(/PATH=".*"/);
if (mat) {
  const lastCommand = await __helpers.getLastCommand();
  assert.match(lastCommand, mat);
}
```

## 4

### --description--

Confirm the Solana CLI is installed with:

```bash
solana --version
```

### --tests--

You should run `solana --version` in the console.

```js
const lastCommand = await __helpers.getLastCommand();

assert.match(lastCommand, /solana --version/);
```

## 5

### --description--

The Solana CLI is feature rich and has many commands.

View the list of commands with:

```bash
solana --help
```

### --tests--

You should see the list of commands.

```js
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /solana --help/);
```

## 6

### --description--

See the default Solana configuration by running:

```bash
solana config get
```

### --tests--

You should run `solana config get` in the console.

```js
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /solana config get/);
```

## 7

### --description--

The Solana network consists of multiple <dfn>clusters</dfn>:

- Devnet
- Testnet
- Mainnet

During the initial stages of development, you are most likely to be working on a local cluster.

Change your configuration to use `localhost` as the cluster:

```bash
solana config set --url localhost
```

### --tests--

You should set the configuration with `solana config set --url localhost`.

```js
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /solana config set --url localhost/);
```

## 8

### --description--

View the your changed config settings.

### --tests--

You should view the config with `solana config get`.

```js
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /solana config get/);
```

## 9

### --description--

`solana config` reads and writes to the `.config/solana` directory.

View the config file contents in the terminal with:

```bash
cat ~/.config/solana/cli/config.yml
```

### --tests--

You should use `cat` to view the config file contents.

```js
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /cat ~\/\.config\/solana\/cli\/config.yml/);
```

## 10

### --description--

As this is your first time using the Solana CLI, you should generate a new keypair with:

```bash
solana-keygen new
```

_Note:_ When prompted, hit _ENTER_ in the terminal to generate a keypair with an empty passphrase.

### --tests--

You should run `solana-keygen new` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /solana-keygen new/);
```

## 11

### --description--

The `keypair_path` is the path to your Solana keypair used when making transactions.

View your keypair in the terminal with:

```bash
cat ~/.config/solana/id.json
```

### --tests--

You should use `cat` to view your keypair in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /cat ~\/\.config\/solana\/id\.json/);
```

## 12

### --description--

View/get your wallet public key with:

```bash
solana address
```

### --tests--

You should use `solana address` to view your public key.

```js
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /solana address/);
```

## 13

### --description--

You have set your Solana config to use a locally hosted cluster, but do not have one running yet.

Open a new terminal, and start a Solana test validator with:

```bash
solana-test-validator
```

**Note:** You need to manually click the _Run Tests_ button.

### --tests--

The validator should be running at `http://localhost:8899`.

```js
const command = `curl -s -S http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout.trim());
  assert.include(jsonOut, { result: 'ok' }, 'The validator should have a "health" result of "ok"');
} catch (e) {
  assert.fail(e);
}
```

## 14

### --description--

Manually make an RPC call with:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1,"method":"getBalance","params":["your_address_public_key",{"commitment":"finalized"}]}' http://localhost:8899
```

_Remember to replace `your_address_public_key`_

### --tests--

The validator should be running at `http://localhost:8899`.

```js
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e);
}
```

You should make an RPC call using `curl`.

```js
const { stdout } = await __helpers.getCommandOutput('solana address');
const camperPublicKey = stdout.trim();
const toMatch = `curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getBalance", "params": ["${camperPublicKey}", { "commitment": "finalized" }]}' http://localhost:8899`;
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand.replace(/\s/g, ''), toMatch.replace(/\s/g, ''));
```

The RPC call should return a successful response. _Try again_

```js
const terminalOut = await __helpers.getTerminalOutput();
assert.match(terminalOut, /"result":/);
```

## 15

### --description--

It is not the best user experience using curl commands to interact with the network.

View your wallet's balance with:

```bash
solana balance <ACCOUNT_ADDRESS>
```

_Remember to replace `<ACCOUNT_ADDRESS>`_

### --tests--

The validator should be running at `http://localhost:8899`.

```js
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e);
}
```

You should use the command `solana balance <ACCOUNT_ADDRESS>`.

```js
const { stdout } = await __helpers.getCommandOutput('solana address');
const accountAddress = stdout.trim();
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, `solana balance ${accountAddress}`);
```

## 16

### --description--

You can see your balance is `500000000` 😲. Maybe that is not enough for yourself 😨.

Request an _airdrop_ of 1 SOL to your account with:

```bash
solana airdrop 1 <RECIPIENT_ACCOUNT_ADDRESS>
```

_Remember to replace `<RECIPIENT_ACCOUNT_ADDRESS>` with your public key_

### --tests--

The validator should be running at `http://localhost:8899`.

```js
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e);
}
```

You should use the above command to request an airdrop.

```js
const { stdout } = await __helpers.getCommandOutput('solana address');
const accountAddress = stdout.trim();
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, `solana airdrop 1 ${accountAddress}`);
```

Your account should have at least `500000001` SOL.

```js
const { stdout: stdout1 } = await __helpers.getCommandOutput('solana address');
const accountAddress = stdout1.trim();
const { stdout } = await __helpers.getCommandOutput(
  `solana balance ${accountAddress}`
);
const balance = stdout.trim()?.match(/\d+/)[0];
assert.isAtLeast(Number(balance), 500000001);
```

## 17

### --description--

Check out your balance.

### --tests--

The validator should be running at `http://localhost:8899`.

```js
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);

try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e);
}
```

You should use `solana balance <ACCOUNT_ADDRESS>` to check your balance.

```js
const { stdout } = await __helpers.getCommandOutput('solana address');
const accountAddress = stdout.trim();
const lastCommand = await __helpers.getLastCommand();

assert.include(lastCommand, `solana balance ${accountAddress}`);
```

## 18

### --description--

Open the `src/program-rust/src/lib.rs` file. This is where you will be developing your first Solana smart contract.

Start by importing the `solana_program` crate.

### --tests--

You should have `use solana_program;` in `src/program-rust/src/lib.rs`.

```js
const file = await __helpers.getFile(
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs'
);
assert.include(file, 'use solana_program;');
```

## 19

### --description--

When your smart contract is called, a function needs to be run.

Define a public function with the handle `process_instruction`.

### --tests--

You should define a **PUBLIC** function with the handle `process_instruction`.

```js
const file = await __helpers.getFile(
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs'
);

assert.match(file, /pub\s+fn\s+process_instruction\s*\(/s);
```

## 20

### --description--

In order to tell your program which function is the entrypoint for the contract, import the `entrypoint` macro from the `solana_program` crate, and pass `process_instruction` as the argument.

### --tests--

You should import `solana_program::entrypoint`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);

const variants = [
  /solana_program\s*::\s*entrypoint/,
  /solana_program\s*::\s*\{\s*entrypoint\s*\}/,
  /solana_program::prelude::\*/
];

const someMatch = variants.some(r => file.match(r));
assert.isTrue(someMatch, `Your code should match one of ${variants}`);
```

You should call the `entrypoint` macro in the root of your program.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);

assert.match(file, /entrypoint!\(/);
```

You should pass `process_instruction` as an argument: `entrypoint!(process_instruction);`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);

assert.match(file, /entrypoint!\(\s*process_instruction\s*\)/s);
```

## 21

### --description--

To make debugging your application easier, import the `msg` macro from `solana_program`, and use it to log the string slice `Hello World` to the console whenever `process_instruction` is called.

### --tests--

You should import `solana_program::msg;`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);

const variants = [
  /solana_program\s*::\s*msg/,
  /solana_program\s*::\s*\{[\s\S]*msg/,
  /solana_program::prelude::\*/
];

const someMatch = variants.some(r => file.match(r));
assert.isTrue(someMatch, `Your code should match one of ${variants}`);
```

You should call the `msg` macro within the `process_instruction` function.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);

assert.match(file, /msg!\(/);
```

You should pass `"Hello World"` to `msg` as an argument: `msg!("Hello World");`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);

assert.match(file, /msg!\(\s*"Hello World"\s*\)/s);
```

## 22

### --description--

Within `src/program-rust/`, run `cargo build` to try build your library. You should see an error, because an entrypoint function is supposed to take 3 arguments.

### --tests--

You should run `cargo build` within the `src/program-rust/` directory.

```js
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /cargo build/, 'Last command was incorrect');

const dir = await __helpers.getCWD();
const cwd = dir.split('\n').filter(Boolean).pop();
assert.match(
  cwd,
  /src\/program-rust\/?$/,
  "You should be in the 'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust' dir"
);
```

## 23

### --description--

The first argument an entrypoint function takes is a reference to a `Pubkey` which is the public key of the account the program was loaded into.

Add a parameter to the function definition named `program_id` with the correct type.

_Import the `Pubkey` struct from the `pubkey` module of `solana_program`._

### --tests--

You should have `use solana_program::pubkey::Pubkey;` in `src/program-rust/src/lib.rs`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);

const variants = [
  /solana_program\s*::\s*pubkey::Pubkey/,
  /solana_program\s*::\s*\{[\s\S]*pubkey::Pubkey/,
  /solana_program::prelude::\*/
];

const someMatch = variants.some(r => file.match(r));
assert.isTrue(someMatch, `Your code should match one of ${variants}`);
```

You should define `process_instruction` to have one parameter named `program_id`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(file, /process_instruction\s*\(\s*program_id\s*/s);
```

You should type `program_id` with `&Pubkey`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(file, /program_id\s*:\s*&Pubkey/s);
```

## 24

### --description--

The second argument an entrypoint function takes is a slice of accounts with which the program can interact.

Add a parameter to the function definition named `accounts` with the type `&[AccountInfo]`.

### --tests--

You should have `use solana_program::account_info::AccountInfo;` in `src/program-rust/src/lib.rs`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);

const variants = [
  /solana_program\s*::\s*account_info::AccountInfo/,
  /solana_program\s*::\s*\{[\s\S]*account_info::AccountInfo/,
  /solana_program::prelude::\*/
];

const someMatch = variants.some(r => file.match(r));
assert.isTrue(someMatch, `Your code should match one of ${variants}`);
```

You should define `process_instruction` to have a second parameter named `accounts`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(file, /process_instruction\s*\(.*?,\s*accounts/s);
```

You should type `accounts` with `&[AccountInfo]`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(file, /accounts\s*:\s*&\[\s*AccountInfo\s*\]/s);
```

## 25

### --description--

The third argument an entrypoint function takes is instruction data from the smart contract call.

Add a parameter to the function definition named `instruction_data` with the type `&[u8]`.

### --tests--

You should define `process_instruction` to have a third parameter named `instruction_data`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(file, /process_instruction\s*\(.*?,\s*instruction_data/s);
```

You should type `instruction_data` with `&[u8]`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(file, /instruction_data\s*:\s*&\[\s*u8\s*\]/s);
```

## 26

### --description--

Give your entrypoint function a return of `ProgramResult`. This type comes from the `entrypoint` module of `solana_program`.

Also, return an empty tuple wrapped in the `Ok` variant of the `Result` enum.

### --tests--

You should have `use solana_program::entrypoint::ProgramResult;` in `src/program-rust/src/lib.rs`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);

const variants = [
  /solana_program\s*::\s*entrypoint::ProgramResult/,
  /solana_program\s*::\s*\{[\s\S]*entrypoint::ProgramResult/,
  /solana_program::prelude::\*/
];

const someMatch = variants.some(r => file.match(r));
assert.isTrue(someMatch, `Your code should match one of ${variants}`);
```

You should define `process_instruction` to return `ProgramResult`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(file, /\)\s*->\s*ProgramResult\s*\{/s);
```

You should return `Ok(())` from `process_instruction`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(file, /Ok\s*\(\s*\(\s*\)\s*\)/s);
```

## 27

### --description--

Now that the entrypoint function definition is correct, rebuild your program to see if it compiles.

### --tests--

You should run `cargo build` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'cargo build');
```

You should be in the `src/program-rust` directory.

```js
const wds = await __helpers.getCWD();
const cwd = wds.split('\n').filter(Boolean).pop();
assert.match(cwd, /src\/program-rust\/?$/);
```

## 28

### --description--

Before deploying, build your program with:

```bash
cargo build-sbf --sbf-out-dir=../../dist/program
```

### --tests--

You should run the above command to build your program.

```js
const lastCommand = await __helpers.getLastCommand();
assert.match(
  lastCommand,
  /cargo build-sbf --sbf-out-dir=.*?/s
);
```

You should be in the `src/program-rust` directory.

```js
const wds = await __helpers.getCWD();
const cwd = wds.split('\n').filter(Boolean).pop();
assert.match(cwd, /src\/program-rust\/?$/);
```

## 29

### --description--

Your program is located in `dist/program/helloworld.so`. You can deploy it to your localnet with:

```bash
solana program deploy <PATH_TO_PROGRAM>
```

**NOTE:** `solana deploy <PATH_TO_PROGRAM>` will **not** work, because that deploys a non-upgradeable program.

### --tests--

The validator should be running at `http://localhost:8899`.

```js
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e);
}
```

You should run `solana program deploy dist/program/helloworld.so` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'solana program deploy dist/program/helloworld.so');
```

You should be in the `learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract` directory.

```js
const wds = await __helpers.getCWD();
const cwd = wds.split('\n').filter(Boolean).pop();
assert.match(
  cwd,
  /learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract\/?$/
);
```

## 30

### --description--

After deploying, your program id should be printed to the console.

View the program account with:

```bash
solana program show <PROGRAM_ID>
```

### --tests--

The validator should be running at `http://localhost:8899`.

```js
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e);
}
```

You should run `solana program show <PROGRAM_ID>` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'solana program show');
```

## 31

### --description--

To view the logs from an on-chain program, open a new terminal, and run:

```bash
solana logs
```

### --tests--

You should run `solana logs` in a new terminal.

```js
const terminalOut = await __helpers.getTerminalOutput();
assert.include(terminalOut, 'Streaming transaction logs');
```

## 32

### --description--

To call your program, run:

```bash
npm run call:hello-world
```

This will run the code in `src/client/`. Watch the `solana logs` terminal for the _'Program log'_ output.

### --tests--

The validator should be running at `http://localhost:8899`.

```js
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e);
}
```

You should run `npm run call:hello-world` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'npm run call:hello-world');
```

You should be in the `/learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract` directory.

```js
const wds = await __helpers.getCWD();
const cwd = wds.split('\n').filter(Boolean).pop();
assert.match(
  cwd,
  /learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract\/?$/
);
```

## 33

### --description--

Having a program that prints `Hello World` to the console is fun, but it is not very useful. Make it do something more interesting.

Within the `process_instruction` function, create an iterator over the `accounts`, and store the iterator in a variable named `accounts_iter`.

_Note: Make `accounts_iter` mutable_

### --tests--

You should have `let mut accounts_iter = accounts.iter();` in `src/program-rust/src/lib.rs`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(file, /let\s+mut\s+accounts_iter\s*=\s*accounts\.iter()\s*;/s);
```

## 34

### --description--

Safely access the next element of the `accounts_iter` collection with:

```rust
if let Some(account) = accounts_iter.next() {

}
```

Also, add an `else` clause to the `if let`, and use `msg` to log an appropriate message to the console.

### --tests--

You should have `if let Some(account) = accounts_iter.next() {}` in `src/program-rust/src/lib.rs`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(
  file,
  /if\s+let\s+Some\s*\(\s*account\s*\)\s*=\s*accounts_iter\.next\s*\(\s*\)\s*\{\s*\}/s
);
```

You should add an `else` clause with a call to the `msg` macro.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(file, /\}\s*else\s*\{\s*msg!\s*\(/s);
```

## 35

### --description--

Import the `ProgramResult` type from the `entrypoint` module of `solana_program`, and the `ProgramError` enum from the `program_error` module of `solana_program`.

Adjust the return type of `process_instruction` to be `ProgramResult`.

### --tests--

You should add a return type of `ProgramResult` to `process_instruction`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(file, /process_instruction\s*\(.*?\)\s*->\s*ProgramResult\s*\{/s);
```

## 36

### --description--

Be sure to call `Ok(())` when your function succeeds. Otherwise use the `NotEnoughAccountKeys` variant of `ProgramError` as the return for the `Err` variant of your function.

### --tests--

You should return `Ok(())` in the `if let` block of `process_instruction`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(file, /(?<=\.next\s*\(\s*\)\s*\{).*?Ok\(\s*\(\s*\)\s*\)\s*\}/s);
```

You should return `Err(ProgramError::NotEnoughAccountKeys)` in the `else` block of `process_instruction`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(
  file,
  /(?<=else\s*\{).*?Err\s*\(\s*ProgramError::NotEnoughAccountKeys\s*\)\s*\}/s
);
```

## 37

### --description--

Each `AccountInfo` element has an `owner` field which is the public key of the program that owns the account.

Add an `if` statement checking for the case where this field's value does **not** match the `program_id` value.

### --tests--

You should have `if account.owner != program_id {}` in `src/program-rust/src/lib.rs`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(
  file,
  /if\s+(account\.owner\s*!=\s*program_id)|(program_id\s*!=\s*account\.owner)\s*\{/s
);
```

## 38

### --description--

Within the `if` statement, use `msg` to log `Account info does not match program id` to the console.

### --tests--

You should have `msg!("Account info does not match program id");` in `src/program-rust/src/lib.rs`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(
  file,
  /msg!\s*\(\s*"Account info does not match program id"\s*\)\s*;/s
);
```

## 39

### --description--

Within the `if` statement, return the `IncorrectProgramId` variant of `ProgramError` as the `Err`.

### --tests--

You should return `Err(ProgramError::IncorrectProgramId)` in the `if` statement.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(
  file,
  /(?<=if.*?\{).*?Err\s*\(\s*ProgramError::IncorrectProgramId\s*\);?\s*\}/s
);
```

## 40

### --description--

In order to interact with the data associated with this smart contract account, you need to define a struct resembling the account data.

Define a struct named `GreetingAccount` with a public field named `counter` with a value of `u32`.

### --tests--

You should have `pub struct GreetingAccount { pub counter: u32 }` in the root of `src/program-rust/src/lib.rs`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(
  file,
  /pub\s+struct\s+GreetingAccount\s*\{\s*pub\s+counter\s*:\s*u32\s*\}/s
);
```

## 41

### --description--

Derive `BorshSerialize` and `BorshDeserialize` for your `GreetingAccount` struct to be able to serialize and deserilize the data in the account.

### --tests--

You should add `#[derive(BorshSerialize, BorshDeserialize)]` above `GreetingAccount`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(
  file.replace(/s+/, ''),
  /#\[derive\(BorshSerialize,BorshDeserialize\)\]pubstructGreetingAccount/s
);
```

## 42

### --description--

Deserialize the `data` in the `account` variable with:

```rust
GreetingAccount::try_from_slice(&account.data.borrow())?;
```

Assign this value to a mutable variable named `greeting_account`.

### --tests--

You should declare a mutable variable named `greeting_account`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(file, /let\s+mut\s+greeting_account\s*=/s);
```

You should assign `GreetingAccount::try_from_slice(&account.data.borrow())?;` to `greeting_account`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(
  file,
  /greeting_account\s*=\s*GreetingAccount::try_from_slice\s*\(\s*&account.data.borrow\s*\(\s*\)\s*\)\s*\?\s*;/s
);
```

## 43

### --description--

Increment the `counter` field of `greeting_account` by one.

### --tests--

You should have `greeting_account.counter += 1;` in `src/program-rust/src/lib.rs`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(file, /greeting_account\.counter\s*+=\s*1\s*;/s);
```

## 44

### --description--

Declare a new variable named `acc_data`, and assign it the value of `&mut account.data.borrow_mut()[..]`.

### --tests--

You should declare a new variable named `acc_data`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(file, /let\s+acc_data\s*=/s);
```

You should assign `&mut account.data.borrow_mut()[..]` to `acc_data`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(
  file,
  /acc_data\s*=\s*&mut\s+account\.data\.borrow_mut\s*\(\s*\)\s*\[\s*\.\.\s*\]\s*;/s
);
```

## 45

### --description--

Serialize the account data into your program with:

```rust
greeting_account.serialize(&mut acc_data.as_mut())?;
```

### --tests--

You should serialize the mutated data with `greeting_account.serialize(&mut acc_data.as_mut())?`.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(
  file,
  /greeting_account\.serialize\s*\(\s*&mut\s+acc_data\.as_mut\s*\(\s*\)\s*\)\s*\?\s*;/s
);
```

## 46

### --description--

Log the number of times the account has been greeted, using the `msg` macro.

### --tests--

You should use `msg` to log the number of times the account has been greeted.

```js
const filePath =
  'learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract/src/program-rust/src/lib.rs';
const file = await __helpers.getFile(filePath);
assert.match(file, /msg!\(/);
```

## 47

### --description--

Now that your program is complete, rebuild it.

### --tests--

You should run `cargo build-sbf --manifest-path=./src/program-rust/Cargo.toml --sbf-out-dir=dist/program` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(
  lastCommand,
  'cargo build-sbf --manifest-path=./src/program-rust/Cargo.toml --sbf-out-dir=dist/program'
);
```

You should be in the `src/program-rust` directory.

```js
const wds = await __helpers.getCWD();
const cwd = wds.split('\n').filter(Boolean).pop();
assert.match(cwd, /src\/program-rust\/?$/);
```

## 48

### --description--

Re-deploy your program to your local Solana cluster.

### --tests--

The validator should be running at `http://localhost:8899`.

```js
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e);
}
```

You should run `solana program deploy dist/program/helloworld.so` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'solana program deploy dist/program/helloworld.so');
```

You should be in the `src/program-rust` directory.

```js
const wds = await __helpers.getCWD();
const cwd = wds.split('\n').filter(Boolean).pop();
assert.match(cwd, /src\/program-rust\/?$/);
```

## 49

### --description--

Send a message to your program to increment the counter by running:

```bash
npm run call:increment
```

### --tests--

The validator should be running at `http://localhost:8899`.

```js
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e);
}
```

You should run `npm run call:increment` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'npm run call:increment');
```

You should be in the `/learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract` directory.

```js
const wds = await __helpers.getCWD();
const cwd = wds.split('\n').filter(Boolean).pop();
assert.match(
  cwd,
  /learn-how-to-set-up-solana-by-building-a-hello-world-smart-contract\/?$/
);
```

## 50

### --description--

Contratulations on finishing this project!

🎆

### --tests--

Well Done!

```js
assert.fail('All lessons for this project finished');
```

## --fcc-end--
