# Solana - Learn Anchor by Building Tic-Tac-Toe

## 1

### --description--

Previously, you built and deployed a program (smart contract) to the Solana blockchain using the native `solana_program` crate. In this project, you will use the Anchor framework to build and deploy a program to the Solana blockchain.

Anchor offers quick and convenient tools and modules for building and deploying programs.

Open a new terminal, and install the Anchor Version Manager (AVM) to get started.

```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
```

### --tests--

You should have `avm` installed.

```js
assert.fail();
```

## 2

### --description--

Anchor Version Manager is a tool for using multiple versions of the Anchor CLI.

Use `avm` to install the latest version of the Anchor CLI.

```bash
avm install latest
```

**Note:** Technically, this step is not necessary as the latest version of the Anchor CLI is installed by default.

### --tests--

You should have the latest version of the Anchor CLI installed.

```js
assert.fail();
```

## 3

### --description--

Instruct `avm` to use the latest version of the Anchor CLI.

```bash
avm use latest
```

### --tests--

You should be using the latest version of the Anchor CLI.

```js
assert.fail();
```

## 4

### --description--

Verify you are using the latest version of the Anchor CLI.

```bash
anchor --version
```

### --tests--

You should see version `0.27` printed to the console.

```js
assert.fail();
```

## 5

### --description--

You will be building a Tic-Tac-Toe game on the Solana blockchain.

Within `learn-anchor-by-building-tic-tac-toe/`, create a new project named `tic-tac-toe`:

```bash
anchor init --no-git tic-tac-toe
```

**Note:** The `--no-git` flag is used to prevent the project from being initialized as a git repository.

### --tests--

You should be in the `learn-anchor-by-building-tic-tac-toe` directory.

```js
assert.fail();
```

You should have a `tic-tac-toe` directory.

```js
assert.fail();
```

## 6

### --description--

Anchor has created a `tic-tac-toe` directory with the following structure:

```bash
tic-tac-toe/
├── app/
├── migrations/
│   └── deploy.ts
├── programs/
│   └── tic-tac-toe/
│       ├── src/
│       │   └── lib.rs
│       ├── Cargo.toml
│       └── Xargo.toml
├── tests/
│   └── tic-tac-toe.ts
├── Anchor.toml
├── Cargo.toml
├── package.json
├── tsconfig.json
└── yarn.lock
```

In your terminal, change into the `tic-tac-toe` directory.

### --tests--

You should be in the `tic-tac-toe` directory.

```js
assert.fail();
```

## 7

### --description--

The `app` directory is a placeholder for a web app that would interact with the program. The `migrations/deploy.ts` script is run on `anchor migrate`. The `programs` directory contains all the programs (smart contracts) that will be deployed to the Solana blockchain. The `tests` directory contains the client-side tests for your programs.

You will be mostly working in `programs/tic_tac_toe/src/lib.rs` and `tests/tic_tac_toe.ts`.

Get the program id (public key) of the `tic-tac-toe` program:

```bash
anchor keys list
```

### --tests--

The public key of your `tic-tac-toe` program should be printed to the console.

```js
assert.fail();
```

You should be in the `tic-tac-toe` directory.

```js
assert.fail();
```

## 8

### --description--

The Anchor CLI provides an `anchor test` command that:

1. Builds all programs
2. Starts a local Solana cluster
3. Deploys the programs to the cluster
4. Calls the `test` script in the `scripts` table in `Anchor.toml`
5. Cleans up the local Solana cluster

Run the `anchor test` command:

```bash
anchor test
```

### --tests--

The `anchor test` command should error.

```js
assert.fail();
```

You should be in the `tic-tac-toe` directory.

```js
assert.fail();
```

## 9

### --description--

You should see the following error:

```bash
Error: failed to send transaction: Transaction simulation failed: This program may not be used for executing instructions
```

For your program, you will need to manually start a local Solana validator. Do so, in a new terminal.

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

## 10

### --description--

With the local validator running, use the `--skip-local-validator` flag to tell Anchor to not start its own local validator.

### --tests--

The `anchor test --skip-local-validator` command should error.

```js
assert.fail();
```

You should be in the `tic-tac-toe` directory.

```js
assert.fail();
```

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

## 11

### --description--

You should see the following error:

```bash
Error: AnchorError occurred. Error Code: DeclaredProgramIdMismatch. Error Number: 4100. Error Message: The declared program id does not match the actual program id.
```

Double-check the program id in the `Anchor.toml` file.

Run `anchor keys list` again to see if it matches the `programs.localnet.tic_tac_toe` value.

### --tests--

You should run `anchor keys list` and see the program id printed to the console.

```js
assert.fail();
```

You should be in the `tic-tac-toe` directory.

```js
assert.fail();
```

## 12

### --description--

Copy the program id, and replace the default values with it in two locations:

1. The string value within the `declare_id` macro in `programs/tic-tac-toe/src/lib.rs`
2. The `tic_tac_toe` key within `Anchor.toml`

### --tests--

The `lib.rs` file should contain the program id within the `declare_id!()` call.

```js
assert.fail();
```

The `Anchor.toml` file should contain the program id as the value for the `tic_tac_toe` key.

```js
assert.fail();
```

## 13

### --description--

Run the test command again:

```bash
anchor test --skip-local-validator
```

### --tests--

The `anchor test --skip-local-validator` command should succeed.

```js
assert.fail();
```

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

## 14

### --description--

Shifting focus to the `lib.rs` file, you will see a few similarities to the native Solana program development workflow.

Instead of an entrypoint function, the `program` attribute defines the module containing all instruction handlers defining all entries into a Solana program.

The `initialize` function is an instruction handler. It is a function that takes a `Context` as an argument. The context contains the program id, and the accounts passed into the function. Anchor expects all accounts to be fully declared as inputs to the handler.

Rename the `initialize` function to `setup_game`.

### --tests--

The `setup_game` function should exist in the `lib.rs` file.

```js
assert.fail();
```

## 15

### --description--

The `Initialize` struct is annotated to derive `Accounts`. This means that the `Initialize` struct will be used to deserialize the accounts passed into the `setup_game` function. If a client does not pass in the correct accounts, the deserialization will fail. This is one of the ways that Anchor ensures that the client is passing in the correct accounts.

Rename the `Initialize` struct to `SetupGame`.

### --tests--

The `SetupGame` struct should exist in the `lib.rs` file.

```js
assert.fail();
```

The `setup_game` function should take a `Context<SetupGame>` as an argument.

```js
assert.fail();
```

## 16

### --description--

Setting up the game will require creating an account to store the game state. This account will be owned by the system program, and will be created with a program derived address (PDA).

You could manually calculate the rent required, validate a passed in account can pay, create the account, and send the create transaction. However, Anchor provides a convenient attribute macro to automate this process:

```rust
#[derive(Accounts)]
pub struct AccountsInContext<'info> {
    #[account(init)]
    pub derived_account: Account<'info, AccountStruct>
}
```

The `#[account(init)]` attribute will create the account when required. The `AccountStruct` is a struct that will be used to deserialize the account data. The `AccountStruct` must implement the `AnchorSerialize` and `AnchorDeserialize` traits.

Within `SetupGame`, add a public field `game` with a type of `Account<'info, Game>`. Annotate the field such that it is initialized when required.

### --tests--

`SetupGame` should contain a field `game`.

```js
assert.fail();
```

`game` should be typed `Account<'info, Game>`.

```js
assert.fail();
```

`game` should be annotated with `#[account(init)]`.

```js
assert.fail();
```

`SetupGame` should be punctuated with a lifetime `'info`.

```js
assert.fail();
```

## 17

### --description--

When an account is initialized, another account must pay for the rent and transaction fees.

Declare another account in `SetupGame` called `player_one`. Give `player_one` a type of `Signer<'info>`.

**Note:** The `Signer` trait is a special trait that indicates that the account is a signer. This is required for lamports to be transferred **from** the account.

### --tests--

`SetupGame` should contain a field `player_one`.

```js
assert.fail();
```

`player_one` should be typed `Signer<'info>`.

```js
assert.fail();
```

`player_one` should be annotated with `#[account()]`.

```js
assert.fail();
```

## 18

### --description--

## --fcc-end--
