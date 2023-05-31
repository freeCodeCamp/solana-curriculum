# Solana - Learn Anchor by Building Tic-Tac-Toe: Part 1

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
const { stdout } = await __helpers.getCommandOutput('avm --version');
assert.include(stdout, 'avm');
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
const { stdout } = await __helpers.getCommandOutput('avm list');
assert.include(stdout, '(latest, installed, current)');
```

## 3

### --description--

Instruct `avm` to use the latest version of the Anchor CLI:

```bash
avm use latest
```

### --tests--

You should be using the latest version of the Anchor CLI.

```js
const { stdout } = await __helpers.getCommandOutput('avm list');
assert.include(stdout, '(latest, installed, current)');
```

## 4

### --description--

Verify you are using the latest version of the Anchor CLI:

```bash
anchor --version
```

### --tests--

You should see version `0.27` printed to the console.

```js
// TODO: Might want to future-proof this in case of a new version.
const terminalOut = await __helpers.getTerminalOutput();
assert.include(terminalOut, '0.27');
```

## 5

### --description--

You will be building a Tic-Tac-Toe game on the Solana blockchain.

Within `learn-anchor-by-building-tic-tac-toe-part-1/`, create a new project named `tic-tac-toe`:

```bash
anchor init --no-git tic-tac-toe
```

**Note:** The `--no-git` flag is used to prevent the project from being initialized as a git repository.

### --tests--

You should be in the `learn-anchor-by-building-tic-tac-toe-part-1` directory.

```js
const cwd = await __helpers.getLastCWD();
const dirRegex = new RegExp(`${project.dashedName}/?$`);
assert.match(cwd, dirRegex);
```

You should run `anchor init --no-git tic-tac-toe` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.equal(lastCommand.trim(), 'anchor init --no-git tic-tac-toe');
```

You should have a `tic-tac-toe` directory.

```js
const exists = __helpers.fileExists(`${project.dashedName}/tic-tac-toe`);
assert.isTrue(exists);
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
const cwd = await __helpers.getLastCWD();
const dirRegex = new RegExp(`${project.dashedName}/tic-tac-toe/?$`);
assert.match(cwd, dirRegex);
```

## 7

### --description--

The `app` directory is a placeholder for a web app that would interact with the program. The `migrations/deploy.ts` script is run on `anchor migrate`. The `programs` directory contains all the programs (smart contracts) that will be deployed to the Solana blockchain. The `tests` directory contains the client-side tests for your programs.

You will be mostly working in `programs/tic_tac_toe/src/lib.rs`.

Get the program id (public key) of the `tic-tac-toe` program:

```bash
anchor keys list
```

### --tests--

The public key of your `tic-tac-toe` program should be printed to the console.

```js
const { stdout } = await __helpers.getCommandOutput(
  'anchor keys list',
  `${project.dashedName}/tic-tac-toe`
);
const publicKey = stdout.match(/[^\s]{44}/)[0];

const terminalOut = await __helpers.getTerminalOutput();
assert.include(terminalOut, publicKey);
```

You should be in the `tic-tac-toe` directory.

```js
const cwd = await __helpers.getLastCWD();
const dirRegex = new RegExp(`${project.dashedName}/tic-tac-toe/?$`);
assert.match(cwd, dirRegex);
```

## 8

### --description--

TODO: BROKEN - This now works (does not error), but someone else should confirm.

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

The `anchor test` command should error ❌.

```js
const terminalOut = await __helpers.getTerminalOutput();
assert.include(terminalOut, 'Error: failed to send transaction');
```

You should be in the `tic-tac-toe` directory.

```js
const cwd = await __helpers.getLastCWD();
const dirRegex = new RegExp(`${project.dashedName}/tic-tac-toe/?$`);
assert.match(cwd, dirRegex);
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

With the local validator running, pass the `--skip-local-validator` flag to tell Anchor to not start its own local validator when running tests.

### --tests--

The `anchor test --skip-local-validator` command should error.

```js
const terminalOut = await __helpers.getTerminalOutput();
assert.include(terminalOut, 'Error: AnchorError occurred.');
```

You should be in the `tic-tac-toe` directory.

```js
const cwd = await __helpers.getLastCWD();
const dirRegex = new RegExp(`${project.dashedName}/tic-tac-toe/?$`);
assert.match(cwd, dirRegex);
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
const { stdout } = await __helpers.getCommandOutput(
  'anchor keys list',
  `${project.dashedName}/tic-tac-toe`
);
const publicKey = stdout.match(/[^\s]{44}/)?.[0];

const terminalOut = await __helpers.getTerminalOutput();
assert.include(terminalOut, publicKey);
```

You should be in the `tic-tac-toe` directory.

```js
const cwd = await __helpers.getLastCWD();
const dirRegex = new RegExp(`${project.dashedName}/tic-tac-toe/?$`);
assert.match(cwd, dirRegex);
```

## 12

### --description--

Copy the program id, and replace the default values with it in two locations:

1. The string value within the `declare_id` macro in `programs/tic-tac-toe/src/lib.rs`
2. The `tic_tac_toe` key within `Anchor.toml`

### --tests--

The `lib.rs` file should contain the program id within the `declare_id!()` call.

```js
const librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
const { stdout } = await __helpers.getCommandOutput(
  'anchor keys list',
  `${project.dashedName}/tic-tac-toe`
);
const expectedProgramId = stdout.match(/[^\s]{44}/)?.[0];
const actualProgramId = librs.match(/declare_id!\("([^\)]+)"\)/)?.[1];
assert.equal(actualProgramId, expectedProgramId);
```

The `Anchor.toml` file should contain the program id as the value for the `tic_tac_toe` key.

```js
const toml = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/Anchor.toml`
);
const { stdout } = await __helpers.getCommandOutput(
  'anchor keys list',
  `${project.dashedName}/tic-tac-toe`
);
const expectedProgramId = stdout.match(/[^\s]{44}/)?.[0];
const actualProgramId = toml.match(/tic_tac_toe = "([^\"]+)"/)?.[1];
assert.equal(actualProgramId, expectedProgramId);
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
const terminalOut = await __helpers.getTerminalOutput();
assert.include(terminalOut, '1 passing');
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
assert.match(__librs, /fn setup_game/);
```

The `initialize` function should not exist in the `lib.rs` file.

```js
assert.notMatch(__librs, /fn initialize/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 15

### --description--

The `Initialize` struct is annotated to derive `Accounts`. This means that the `Initialize` struct will be used to deserialize the accounts passed into the `setup_game` function. If a client does not pass in the correct accounts, the deserialization will fail. This is one of the ways that Anchor ensures that the client is passing in the correct accounts.

Rename the `Initialize` struct to `SetupGame`.

### --tests--

The `SetupGame` struct should exist in the `lib.rs` file.

```js
assert.match(__librs, /struct SetupGame/);
```

The `setup_game` function should take a `Context<SetupGame>` as an argument.

```js
assert.match(__librs, /pub fn setup_game/);
assert.match(__librs, /ctx: Context<SetupGame>/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
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

The `#[account()]` attribute with an `init` parameter will create the account when required. The `AccountStruct` is a struct that will be used to deserialize the account data. The `AccountStruct` must implement the `AnchorSerialize` and `AnchorDeserialize` traits.

Within `SetupGame`, add a public field `game` with a type of `Account<'info, Game>`. Annotate the field such that it is initialized when required.

### --tests--

`SetupGame` should contain a field `game`.

```js
assert.match(__librs, /pub game:/);
```

`game` should be typed `Account<'info, Game>`.

```js
assert.match(__librs, /pub game: Account<'info\s*,\s*Game>/);
```

`game` should be annotated with `#[account(init)]`.

```js
assert.match(__librs, /#\[\s*account\s*\(\s*init\s*\)\s*\]\s*pub game:/);
```

`SetupGame` should be punctuated with a lifetime `'info`.

```js
assert.match(__librs, /pub struct SetupGame\s*<'info>/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 17

### --description--

When an account is initialized, another account must pay for the rent and transaction fees.

Declare another account in `SetupGame` called `player_one`. Give `player_one` a type of `Signer<'info>`.

**Note:** The `Signer` trait is a special trait that indicates the account is a signer. This is required for lamports to be transferred **from** the account.

### --tests--

`SetupGame` should contain a field `player_one`.

```js
assert.match(__librs, /pub player_one:/);
```

`player_one` should be typed `Signer<'info>`.

```js
assert.match(__librs, /pub player_one: Signer\s*<'info>/);
```

`player_one` should be annotated with `#[account()]`.

```js
assert.match(__librs, /#\[\s*account\s*\(\s*\)\s*\]\s*pub player_one:/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 18

### --description--

Now, mark the `player_one` account as the payer for the `game` account:

```rust
#[derive(Accounts)]
pub struct AccountsInContext<'info> {
    #[account(
        init,
        payer = payer_account
    )]
    pub derived_account: Account<'info, AccountStruct>,
    #[account()]
    pub payer_account: Signer<'info>
}
```

### --tests--

`game` should be annotated with `payer = player_one`.

```js
const librs = (
  await __helpers.getFile(
    `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
  )
)?.replaceAll(/[ \t]{2,}/g, ' ');
assert.match(
  librs,
  /#\[\s*account\s*\(\s*init\s*,\s*payer\s*=\s*player_one\s*\)\s*\]\s*pub game:/
);
```

## 19

### --description--

In order for any data in an account to be changed, the account must be mutable:

```rust
#[account(mut)]
pub mutable_account: Signer<'info>
```

Mark the `player_one` account as mutable.

### --tests--

`player_one` should be annotated with `#[account(mut)]`.

```js
const librs = (
  await __helpers.getFile(
    `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
  )
)?.replaceAll(/[ \t]{2,}/g, ' ');
assert.match(librs, /#\[\s*account\s*\(\s*mut\s*\)\s*\]\s*pub player_one:/);
```

## 20

### --description--

The `#[account(init)]` attribute will create the account when required. However, the account must be rent exempt, and have enough space to store any data expected:

```rust
#[account(init, space = <AMOUNT_IN_BYTES>)]
pub derived_account: Account<'info, AccountStruct>
```

Add a `space` parameter to the `game` account with a value of `10`. This means the account will be initialised with 10 bytes of space.

### --tests--

`game` should be annotated with `space = 10`.

```js
const librs = (
  await __helpers.getFile(
    `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
  )
)?.replaceAll(/[ \t]{2,}/g, ' ');
assert.match(
  librs,
  /#\[\s*account\s*\([^\)]*?space\s*=\s*10[^\)]*?\)]\s*pub game:/
);
```

## 21

### --description--

Creating an account with `10` bytes allocated is great and all, but you do not actually know how much space you need until you have defined the `Game` struct representing the account data.

Define a public struct `Game`, and annotate it with `#[account]` to indicate it is a Solana account.

### --tests--

`pub struct Game` should exist in the `lib.rs` file.

```js
assert.match(__librs, /pub struct Game/);
```

`Game` should be annotated with `#[account]`.

```js
assert.match(__librs, /#\[\s*account\s*\]\s*pub struct Game/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 22

### --description--

A game of tic-tac-toe consists of two players.

Keep track of the players, by adding a `players` field in `Game` with a type of `[Pubkey; 2]`.

### --tests--

`Game` should contain a field `players`.

```js
const game = __librs.match(/pub struct Game\s*{([^}]*)}/s)?.[1];
assert.match(game, /players:/);
```

`players` should be typed `[Pubkey; 2]`.

```js
assert.match(__librs, /players: \[\s*Pubkey\s*;\s*2\s*\]/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 23

### --description--

Keep track of the current turn number, by adding a `turn` field in `Game` with a type of `u8`.

### --tests--

`Game` should contain a field `turn`.

```js
const game = __librs.match(/pub struct Game\s*{([^}]*)}/s)?.[1];
assert.match(game, /turn:/);
```

`turn` should be typed `u8`.

```js
assert.match(__librs, /turn: u8/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 24

### --description--

Keep track of the board state (the value of each tile), by adding a `board` field in `Game` with a type of `[[Option<Sign>; 3]; 3]`.

### --tests--

`Game` should contain a field `board`.

```js
const game = __librs.match(/pub struct Game\s*{([^}]*)}/s)?.[1];
assert.match(game, /board:/);
```

`board` should be typed `[[Option<Sign>; 3]; 3]`.

```js
assert.match(
  __librs,
  /board: \[\[\s*Option\s*<\s*Sign\s*>\s*;\s*3\s*\]\s*;\s*3\s*\]/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 25

### --description--

Keep track of the current game condition, by adding a `state` field in `Game` with a type of `GameState`.

### --tests--

`Game` should contain a field `state`.

```js
const game = __librs.match(/pub struct Game\s*{([^}]*)}/s)?.[1];
assert.match(game, /state:/);
```

`state` should be typed `GameState`.

```js
assert.match(__librs, /state: GameState/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 26

### --description--

Define a public enum `Sign` with variants `X` and `O`.

### --tests--

`pub enum Sign` should exist in the `lib.rs` file.

```js
assert.match(__librs, /pub enum Sign/);
```

`Sign` should have a variant `X`.

```js
const sign = __librs.match(/pub enum Sign\s*{([^}]*)}/s)?.[1];
assert.match(sign, /X/);
```

`Sign` should have a variant `O`.

```js
const sign = __librs.match(/pub enum Sign\s*{([^}]*)}/s)?.[1];
assert.match(sign, /O/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 27

### --description--

Define a public enum `GameState` with variants `Active`, `Tie`, and `Won`. The `Won` variant should contain a named field `winner` with a type of `Pubkey`.

### --tests--

`pub enum GameState` should exist in the `lib.rs` file.

```js
assert.match(__librs, /pub enum GameState/);
```

`GameState` should have a variant `Active`.

```js
const gameState = __librs.match(/pub enum GameState\s*{([^}]*)}/s)?.[1];
assert.match(gameState, /Active/);
```

`GameState` should have a variant `Tie`.

```js
const gameState = __librs.match(/pub enum GameState\s*{([^}]*)}/s)?.[1];
assert.match(gameState, /Tie/);
```

`GameState` should have a variant `Won { winner: Pubkey }`.

```js
const gameState = __librs.match(
  /pub enum GameState ({[\s\S]*?({[\s\S]*?}[\s\S]*?}|}))/s
)?.[1];
assert.match(gameState, /Won\s*{\s*winner:\s*Pubkey\s*,?\s*}/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 28

### --description--

In order for Anchor to serialize and deserialize the `Game` account data, `GameState` and `Sign` must implement the `AnchorSerialize` and `AnchorDeserialize` traits.

Derive the `AnchorSerialize` and `AnchorDeserialize` traits for `GameState` and `Sign`.

### --tests--

`GameState` should be annotated with `#[derive(AnchorSerialize, AnchorDeserialize)]`.

```js
assert.match(
  __librs,
  /#\[\s*derive\s*\(\s*AnchorSerialize\s*,\s*AnchorDeserialize\s*\)\s*\]\s*pub enum GameState/
);
```

`Sign` should be annotated with `#[derive(AnchorSerialize, AnchorDeserialize)]`.

```js
assert.match(
  __librs,
  /#\[\s*derive\s*\(\s*AnchorSerialize\s*,\s*AnchorDeserialize\s*\)\s*\]\s*pub enum Sign/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 29

### --description--

On top of `AnchorSerialize` and `AnchorDeserialize`, both `GameState` and `Sign` must also implement the `Clone` trait.

Derive the `Clone` trait for `GameState` and `Sign`.

### --tests--

`GameState` should be annotated with `#[derive(Clone)]`.

```js
assert.match(
  __librs,
  /#\[\s*derive\s*\([^\]]*?Clone[^\]]*?\)\s*\]\s*pub enum GameState/
);
```

`Sign` should be annotated with `#[derive(Clone)]`.

```js
assert.match(
  __librs,
  /#\[\s*derive\s*\([^\]]*?Clone[^\]]*?\)\s*\]\s*pub enum Sign/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 30

### --description--

Finally, because `Sign` is within a slice, it must also implement the `Copy` trait.

Derive the `Copy` trait for `Sign`.

### --tests--

`Sign` should be annotated with `#[derive(Copy)]`.

```js
const librs = (
  await __helpers.getFile(
    `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
  )
)?.replaceAll(/[ \t]{2,}/g, ' ');
assert.match(
  librs,
  /#\[\s*derive\s*\([^\]]*?Copy[^\]]*?\)\s*\]\s*pub enum Sign/
);
```

## 31

### --description--

In order for an account to be created, the `System` program must be used. The `System` program is a built-in program that is available to all Solana programs, but must be annotated as needed in the context.

Add a public `system_program` field to the `SetupGame` struct, and type it as `Program<'info, System>`.

### --tests--

`SetupGame` should contain a field `system_program`.

```js
const setupGame = __librs.match(
  /pub struct SetupGame\s*<'info\s*>\s*{([^}]*?)}/s
)?.[1];
assert.match(setupGame, /system_program:/);
```

`system_program` should be typed `Program<'info, System>`.

```js
const setupGame = __librs.match(
  /pub struct SetupGame\s*<'info\s*>\s*{([^}]*)}/s
)?.[1];
assert.match(setupGame, /system_program: Program\s*<\s*'info\s*,\s*System\s*>/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 32

### --description--

Now that `Game` is fully defined, its size can be determined. Doing so involves summing the size of each field, and adding 8 bytes for the account <dfn title="a uniquely identifiable octet to help Anchor find an account">discriminator</dfn>.

For `Game`:

| Field   | Unit Size | Quantity | Total Size |
| ------- | --------- | -------- | ---------- |
| players | 32        | 2        | 64         |
| turn    | 1         | 1        | 1          |
| board   | 1 + 1     | 3 \* 3   | 18         |
| state   | 1 + 32    | 1        | 33         |

Anchor provides a table of sizes for each Rust type: `https://www.anchor-lang.com/docs/space`

Replace the `10` bytes allocated for the `Game` account with the correct size.

### --tests--

The `game` field in `SetupGame` should be annotated with `#[account(space = 8 + (32*2) + (1) + ((1+1)*(3*3)) + (1+32))]`.

```js
const librs = (
  await __helpers.getFile(
    `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
  )
)?.replaceAll(/[ \t]{2,}/g, ' ');

const setupGame = librs.match(
  /pub struct SetupGame\s*<'info\s*>\s*{([^}]*)}/s
)?.[1];
const mat = setupGame?.match(
  /#\[\s*account\s*\([^\]]*?space\s*=\s*([^\]]+?)\s*\)\s*\]\s*pub game:/
)?.[1];
assert.exists(
  mat,
  `game field should be annotated with #[account(space = <SIZE>)]`
);
const math = eval(mat);
assert.equal(
  math,
  8 + 32 * 2 + 1 + (1 + 1) * (3 * 3) + (1 + 32),
  `space should sum up to correct size`
);
```

## 33

### --description--

TODO: freecodecamp-os breaks this, by seeding the step on any change 🤦‍♂️

**ATTENTION**: Your `lib.rs` file should have been seeded with all the game code. The game code is not relevant to Anchor, but you are still encouraged to read through it to understand how the game works.

Just a few things to fix. First, derive `PartialEq` for `GameState` and `Sign`.

### --tests--

`GameState` should be annotated with `#[derive(PartialEq)]`.

```js
logover.warn(__librs);
assert.match(
  __librs,
  /#\[\s*derive\s*\([^\]]*?PartialEq[^\]]*?\)\s*\]\s*pub enum GameState/
);
```

`Sign` should be annotated with `#[derive(PartialEq)]`.

```js
assert.match(
  __librs,
  /#\[\s*derive\s*\([^\]]*?PartialEq[^\]]*?\)\s*\]\s*pub enum Sign/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --force--

#### --"learn-anchor-by-building-tic-tac-toe-part-1/tic-tac-toe/programs/tic-tac-toe/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("BUfb6FXLkiSpMnJnMR4Q5uGZYZkaNGytjhLwiiJQsE8F");

#[program]
pub mod tic_tac_toe {
    use super::*;

    pub fn setup_game(ctx: Context<SetupGame>) -> Result<()> {
      Ok(())
    }
}

#[derive(Accounts)]
pub struct SetupGame<'info> {
    #[account(init, payer = player_one, space = 8 + Game::MAXIMUM_SIZE)]
    pub game: Account<'info, Game>,
    #[account(mut)]
    pub player_one: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Game {
    players: [Pubkey; 2],          // (32 * 2)
    turn: u8,                      // 1
    board: [[Option<Sign>; 3]; 3], // 9 * (1 + 1) = 18
    state: GameState,              // 32 + 1
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub enum GameState {
    Active,
    Tie,
    Won { winner: Pubkey },
}

#[derive(
    AnchorSerialize,
    AnchorDeserialize,
    Copy,
    Clone,
)]
pub enum Sign {
    X,
    O,
}

/// A tile on the game board.
pub struct Tile {
    row: u8,
    column: u8,
}

impl Game {
    pub const MAXIMUM_SIZE: usize = (32 * 2) + 1 + ((1 + 1) * 9) + (1 + 32);

    pub fn start(&mut self, players: [Pubkey; 2]) -> Result<()> {
        // TODO: Ensure the game is not already started.

        self.players = players;
        self.turn = 1;
        Ok(())
    }

    pub fn is_active(&self) -> bool {
        self.state == GameState::Active
    }

    fn current_player_index(&self) -> usize {
        ((self.turn - 1) % 2) as usize
    }

    pub fn current_player(&self) -> Pubkey {
        self.players[self.current_player_index()]
    }

    pub fn play(&mut self, tile: &Tile) -> Result<()> {
        // TODO: Ensure the game is active.

        match tile {
            tile @ Tile {
                row: 0..=2,
                column: 0..=2,
            } => match self.board[tile.row as usize][tile.column as usize] {
                Some(_) => {
                  // TODO: Return an error that the tile is already set.
                  return Err();
                },
                None => {
                    self.board[tile.row as usize][tile.column as usize] =
                        Some(Sign::from_usize(self.current_player_index()).unwrap());
                }
            },
            _ => {
              // TODO: Return an error that the tile is out of bounds.
              return Err();
            },
        }

        self.update_state();

        if GameState::Active == self.state {
            self.turn += 1;
        }

        Ok(())
    }

    fn is_winning_trio(&self, trio: [(usize, usize); 3]) -> bool {
        let [first, second, third] = trio;
        self.board[first.0][first.1].is_some()
            && self.board[first.0][first.1] == self.board[second.0][second.1]
            && self.board[first.0][first.1] == self.board[third.0][third.1]
    }

    fn update_state(&mut self) {
        for i in 0..=2 {
            // three of the same in one row
            if self.is_winning_trio([(i, 0), (i, 1), (i, 2)]) {
                self.state = GameState::Won {
                    winner: self.current_player(),
                };
                return;
            }
            // three of the same in one column
            if self.is_winning_trio([(0, i), (1, i), (2, i)]) {
                self.state = GameState::Won {
                    winner: self.current_player(),
                };
                return;
            }
        }

        // three of the same in one diagonal
        if self.is_winning_trio([(0, 0), (1, 1), (2, 2)])
            || self.is_winning_trio([(0, 2), (1, 1), (2, 0)])
        {
            self.state = GameState::Won {
                winner: self.current_player(),
            };
            return;
        }

        // reaching this code means the game has not been won,
        // so if there are unfilled tiles left, it's still active
        for row in 0..=2 {
            for column in 0..=2 {
                if self.board[row][column].is_none() {
                    return;
                }
            }
        }

        // game has not been won
        // game has no more free tiles
        // -> game ends in a tie
        self.state = GameState::Tie;
    }
}

```

## 34

### --description--

Second, in order to be able to match the correct `Sign` variant with the current player, `num_traits::FromPrimitive` should be derived for `Sign`.

To derive `FromPrimitive`, you need to add `num-traits` and `num-derive` to the dependencies in `programs/tic-tac-toe/Cargo.toml`.

**Note:** `num-derive` enables the use of `#[derive(FromPrimitive)]` on a struct or enum.

### --tests--

You should add `num-traits` to the dependencies in `programs/tic-tac-toe/Cargo.toml`.

```js
assert.match(__cargo_toml, /num-traits/);
```

You should add `num-derive` to the dependencies in `programs/tic-tac-toe/Cargo.toml`.

```js
assert.match(__cargo_toml, /num-derive/);
```

### --before-all--

```js
const __cargo_toml = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/Cargo.toml`
);
global.__cargo_toml = __cargo_toml?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__cargo_toml;
```

## 35

### --description--

Now, derive `num_derive::FromPrimitive` for `Sign`.

### --tests--

`Sign` should derive `num_derive::FromPrimitive`.

```js
assert.match(
  __librs,
  /#\[\s*derive\s*\([^\]]*?num_derive\s*::\s*FromPrimitive[^\]]*?\)\s*\]\s*pub enum Sign/
);
```

`num_traits::FromPrimitive` should be brought into the module scope.

```js
assert.match(__librs, /use num_traits::FromPrimitive;/);
```

`num_derive` should be brought into the module scope.

```js
assert.match(__librs, /use num_derive/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 36

### --description--

The third fix is to add errors to the `play` method.

Define a public enum `TicTacToeError` with the variants `TileAlreadySet` and `TileOutOfBounds`.

### --tests--

A `TicTacToeError` enum should be defined.

```js
assert.match(__librs, /pub enum TicTacToeError/);
```

`TicTacToeError` should have the variant `TileAlreadySet`.

```js
const ticTacToeError = __librs.match(
  /pub enum TicTacToeError\s*{([^}]*)}/s
)?.[1];
assert.match(ticTacToeError, /TileAlreadySet/);
```

`TicTacToeError` should have the variant `TileOutOfBounds`.

```js
const ticTacToeError = __librs.match(
  /pub enum TicTacToeError\s*{([^}]*)}/s
)?.[1];
assert.match(ticTacToeError, /TileOutOfBounds/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 37

### --description--

In the appropriate location, return the `TileAlreadySet` error.

### --tests--

The first `return Err()` should return the `TileAlreadySet` error.

```js
const librs = await __helpers
  .getFile(`${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`)
  ?.replaceAll(/[ \t]{2,}/g, ' ');

const firstReturnErr = librs.match(/return Err\s*\(([^\)]*?)\),/)?.[1];
assert.match(firstReturnErr, /TicTacToeError\s*::\s*TileAlreadySet/);
```

## 38

### --description--

Anchor does not understand the type `TicTacToeError` yet. To convert it into an error Anchor understands, use the `error_code` attribute macro above the `TicTacToeError` enum.

```rust
#[error_code]
pub enum MyCustomError { ... }
```

### --tests--

Your `TicTacToeError` enum should have the `error_code` attribute macro.

```js
const librs = await __helpers
  .getFile(`${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`)
  ?.replaceAll(/[ \t]{2,}/g, ' ');

assert.match(librs, /#\[\s*error_code\s*\]\s*pub enum TicTacToeError/);
```

## 39

### --description--

Convert the `TileAlreadySet` error into an `anchor_lang::error::Error` by calling the derived `into` method on it.

### --tests--

You should have `return Err(TicTacToeError::TileAlreadySet.into());`.

```js
const librs = await __helpers
  .getFile(`${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`)
  ?.replaceAll(/[ \t]{2,}/g, ' ');

const firstReturnErr = librs.match(/return Err\s*\(([^\)]*?)\),/)?.[1];

assert.match(
  firstReturnErr,
  /TicTacToeError\s*::\s*TileAlreadySet\s*.\s*into\(\)/
);
```

## 40

### --description--

In the appropriate location, return the `TileOutOfBounds` error.

### --tests--

The second `return Err()` should return the `TileOutOfBounds` error.

```js
const secondReturnErr = [
  ...__librs.matchAll(/return Err\s*\(([^\)]*?)\),/g)
]?.[1]?.[1];
assert.match(secondReturnErr, /TicTacToeError\s*::\s*TileOutOfBounds/);
```

The `TileOutOfBounds` error should be converted into an `anchor_lang::error::Error`.

```js
const secondReturnErr = [
  ...__librs.matchAll(/return Err\s*\(([^\)]*?)\),/g)
]?.[1]?.[1];
assert.match(
  secondReturnErr,
  /TicTacToeError\s*::\s*TileOutOfBounds\s*.\s*into\(\)/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 41

### --description--

Another way to return an error is to use the `require!` macro:

```rust
require!(condition, MyCustomError::MyCustomErrorVariant);
```

In the appropriate location, use the `require!` macro to return early if the game state is not `Active`. Add the following variant and return with `TicTacToeError::GameAlreadyOver`.

### --tests--

The `require!` macro should be used to return early if the game state is not `Active`.

```js
// `require!(` comes after `-> Result<()> {`, and before `match tile {`
const playFunction = __librs.match(
  /pub fn play\s*\(([^\)]*?)\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^}]*)}/s
)?.[2];
assert.match(playFunction, /require!\(/);
```

The `require!` condition should use the provided `is_active` method.

```js
const playFunction = __librs.match(
  /pub fn play\s*\(([^\)]*?)\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^}]*)}/s
)?.[2];
const requireCondition = playFunction?.match(
  /require!\s*\(([^\)]*?)\)\s*;\s*match\s*tile\s*{/
)?.[1];
assert.match(requireCondition, /self\s*.\s*is_active\s*\(\s*\)/);
```

The `require!` macro should return the `GameAlreadyOver` error.

```js
const playFunction = __librs.match(
  /pub fn play\s*\(([^\)]*?)\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^}]*)}/s
)?.[2];
const requireCondition = playFunction?.match(
  /require!\s*\(([^\)]*?)\)\s*;\s*match\s*tile\s*{/
)?.[1];
assert.match(requireCondition, /TickTacToeError\s*::\s*GameAlreadyOver/);
```

The `TicTacToeError` enum should have the variant `GameAlreadyOver`.

```js
const ticTacToeError = __librs.match(
  /pub enum TicTacToeError\s*{([^}]*)}/s
)?.[1];
assert.match(ticTacToeError, /GameAlreadyOver/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 42

### --description--

The final _TODO_ in the game logic is to return early if the `start` method is called when the `turn` is greater than `0`.

Within the `start` method, use the `require_eq!` macro to return early if the `turn` is not equal to `0`. Add the following variant and return with `TicTacToeError::GameAlreadyStarted`.

### --tests--

The `require_eq!` macro should be used to return early if the `turn` is not equal to `0`.

```js
const startFn = __librs.match(
  /pub fn start\s*\(([^\)]*?)\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^}]*)}/s
)?.[2];
const requireEq = startFn?.match(/require_eq!\s*\(([^\)]*?)\)\s*;/)?.[1];
assert.exists(requireEq, '`require_eq!` should be called');
assert.match(
  requireEq,
  /self\s*.\s*turn\s*,\s*0/,
  '`require_eq!` should be called with `self.turn` and `0`'
);
```

The `require_eq!` macro should return the `GameAlreadyStarted` error.

```js
const startFn = __librs.match(
  /pub fn start\s*\(([^\)]*?)\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^}]*)}/s
)?.[2];
const requireEq = startFn?.match(/require_eq!\s*\(([^\)]*?)\)\s*;/)?.[1];
assert.match(
  requireEq,
  /TicTacToeError\s*::\s*GameAlreadyStarted/,
  'the third argument to `require_eq!` should be `TicTacToeError::GameAlreadyStarted`'
);
```

The `TicTacToeError` enum should have the variant `GameAlreadyStarted`.

```js
const ticTacToeError = __librs.match(
  /pub enum TicTacToeError\s*{([^}]*)}/s
)?.[1];
assert.match(ticTacToeError, /GameAlreadyStarted/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 43

### --description--

Focussing your attention back to the program, the Context provides all the accounts as defined in the generic passed to `Context`. These accounts can be accessed by name:

```rust
#[derive(Accounts)]
pub struct AccountsStruct<'info> {
    pub account_1: AccountInfo<'info>,
    pub account_2: AccountInfo<'info>,
    pub account_3: ProgramAccount<'info, TicTacToe>,
}
pub fn instruction_handler(ctx: Context<AccountsStruct>) -> Result<()> {
    let account_1 = &ctx.accounts.account_1;
    let account_2 = &ctx.accounts.account_2;
    let account_3 = &ctx.accounts.account_3;
}
```

Within the `setup_game` instruction handler, declare a variable `player_one` and assign the corresponding account reference to it.

### --tests--

The `player_one` variable should be declared.

```js
const setupGame = __librs.match(
  /pub fn setup_game\s*\([^\)]*?\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^\}]*)\}/
)?.[1];
assert.match(setupGame, /let\s*player_one/);
```

The `player_one` variable should be assigned `&ctx.accounts.player_one`.

```js
const setupGame = __librs.match(
  /pub fn setup_game\s*\([^\)]*?\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^\}]*)\}/
)?.[1];
const playerOne = setupGame?.match(/let\s*player_one\s*=\s*([^\;]*?)\;/)?.[1];
assert.match(playerOne, /&\s*ctx\.accounts\.player_one/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 44

### --description--

Setting up the game requires three steps:

1. The public address of the first player
2. The public address of the second player
3. To call the `start` method on the `game` account

Withing `setup_game` declare a variable `player_one_pubkey` and assign the return of the `key` method provided by the `player_one` account to it.

### --tests--

The `player_one_pubkey` variable should be declared.

```js
const setupGame = __librs.match(
  /pub fn setup_game\s*\([^\)]*?\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^\}]*)\}/
)?.[1];
assert.match(setupGame, /let\s*player_one_pubkey/);
```

The `player_one_pubkey` variable should be assigned `player_one.key()`.

```js
const setupGame = __librs.match(
  /pub fn setup_game\s*\([^\)]*?\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^\}]*)\}/
)?.[1];
const playerOnePubkey = setupGame?.match(
  /let\s*player_one_pubkey\s*=\s*([^\;]*?)\;/
)?.[1];
assert.match(playerOnePubkey, /player_one\s*.\s*key\s*\(\s*\)/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 45

### --description--

Instruction handlers can be called with arguments, and the values accessed through parameters:

```rust
pub fn instruction_handler(ctx: Context<AccountsStruct>, arg1: u8, arg2: u8) -> Result<()> {}
```

In order to get the second player's public key, add a `player_two_pubkey` parameter to the `setup_game` instruction handler. Type it with `Pubkey`.

### --tests--

The `setup_game` instruction handler should have a `player_two_pubkey` parameter.

```js
const setupGame = __librs.match(
  /pub fn setup_game\s*\(([^\)]*?)\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^\}]*)\}/
)?.[1];
assert.match(setupGame, /player_two_pubkey\s*:/);
```

The `player_two_pubkey` parameter should be of type `Pubkey`.

```js
const setupGame = __librs.match(
  /pub fn setup_game\s*\(([^\)]*?)\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^\}]*)\}/
)?.[1];
assert.match(setupGame, /player_two_pubkey\s*:\s*Pubkey/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 46

### --description--

Within the `setup_game` instruction handler, declare a variable `game`, and assign a mutable reference to the `game` account to it.

### --tests--

The `game` variable should be declared.

```js
const setupGame = __librs.match(
  /pub fn setup_game\s*\([^\)]*?\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^\}]*)\}/
)?.[1];
assert.match(setupGame, /let\s*game/);
```

The `game` variable should be assigned `&mut ctx.accounts.game`.

```js
const setupGame = __librs.match(
  /pub fn setup_game\s*\([^\)]*?\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^\}]*)\}/
)?.[1];
const game = setupGame?.match(/let\s+game\s*=\s*([^\;]*?)\;/)?.[1];
assert.match(game, /&\s*mut\s+ctx\.accounts\.game/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 47

### --description--

Within the `setup_game` instruction handler, replace the `Ok(())` witha call to the `start` method on the `game` account, passing in the `player_one_pubkey` and `player_two_pubkey` variables in the expected format.

### --tests--

`setup_game` should have `game.start([player_one_pubkey, player_two_pubkey])`.

```js
const librs = await __helpers
  .getFile(`${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`)
  ?.replaceAll(/[ \t]{2,}/g, ' ');

const setupGame = librs.match(
  /pub fn setup_game\s*\(([^\)]*?)\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^\}]*)}/s
)?.[2];
assert.match(
  setupGame,
  /game\s*.\s*start\s*\(\s*\[\s*player_one_pubkey\s*,\s*player_two_pubkey\s*\]\s*\)/
);
```

## 48

### --description--

Currently, the first player has to provide a separate keypair for the `game` account. Then, the first player would also need to share this with the second player in order for them to play.

Instead, you can make use of a PDA to generate a deterministic address for the `game` account:

```rust
#[derive(Accounts)]
pub struct InitialisePDAAccount<'info> {
    #[account(
      init,
      payer = payer,
      seeds = [b"<SEED>", payer.key().as_ref()],
      bump
      )
    ]
    pub pda_account: Account<'info, PDAAccount>,
}
```

Within `lib.rs`, initialize the `game` account using two seeds: the first the byte string `"game"`, and the second the payer's public key.

### --tests--

`SetupGame` should annotate the `game` field with `#[account(seeds = [b"game", player_one.key().as_ref()])]`.

```js
const librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
const setupGameStruct = librs.match(/struct\s*SetupGame\s*{([^\}]*)}/s)?.[1];
const accountAttribute = setupGameStruct?.match(
  /#\[account\s*\(([^\]]*?)\]\s*pub\s*game/
)?.[1];
assert.match(
  accountAttribute,
  /seeds\s*=\s*\[\s*b"game"\s*,\s*player_one\s*.\s*key\s*\(\s*\)\s*.\s*as_ref\s*\(\s*\)\s*\]/
);
```

## 49

### --description--

The seeds are used to hash the address of the `game` account. Being a PDA, the address is deterministic, meaning that the same seeds will always produce the same address. Also, the produced public key must **not** be on the <dfn title="an elliptic curve compatible with 32-byte slices to generate.">ed25519 curve</dfn>.

To ensure this, an extra seed is added. This is called the <dfn title="an extra seed used to push an address off of a curve.">bump seed</dfn>.

Explicitly tell Anchor to generate the bump seed, by annotating the `game` field with `#[account(bump)]`.

### --tests--

`SetupGame` should annotate the `game` field with `#[account(bump)]`.

```js
const librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
const setupGameStruct = librs.match(/struct\s*SetupGame\s*{([^\}]*)}/s)?.[1];
const accountAttribute = setupGameStruct?.match(
  /#\[account\s*\(([^\]]*?)\]\s*pub\s*game/
)?.[1];
assert.match(accountAttribute, /bump/);
```

## 50

### --description--

Run the tests to see if the `setup_game` instruction handler is working correctly.

### --tests--

The test for `setup_game` should pass for `anchor test --skip-local-validator`.

```js
const terminalOutput = await __helpers.getTerminalOutput();
assert.include(terminalOutput, '1 passing');
```

You should be in the `tic-tac-toe` directory.

```js
const cwd = await __helpers.getLastCWD();
const dirRegex = new RegExp(`${project.dashedName}/tic-tac-toe/?$`);
assert.match(cwd, dirRegex);
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

### --seed--

#### --force--

#### --"tic-tac-toe/tests/tic-tac-toe.ts"--

```typescript
import {
  AnchorError,
  Program,
  AnchorProvider,
  setProvider,
  workspace
} from '@coral-xyz/anchor';
import { TicTacToe } from '../target/types/tic_tac_toe';
import { expect } from 'chai';
import { Keypair, PublicKey } from '@solana/web3.js';

describe('tic-tac-toe', () => {
  // Configure the client to use the local cluster.
  setProvider(AnchorProvider.env());

  const program = workspace.TicTacToe as Program<TicTacToe>;
  const programProvider = program.provider as AnchorProvider;

  it('initializes a game', async () => {
    const playerOne = Keypair.generate();
    const playerTwo = Keypair.generate();

    const [gamePublicKey, _] = PublicKey.findProgramAddressSync(
      [Buffer.from('game'), playerOne.publicKey.toBuffer()],
      program.programId
    );

    // Airdrop to playerOne
    const sg = await programProvider.connection.requestAirdrop(
      playerOne.publicKey,
      1_000_000_000
    );
    await programProvider.connection.confirmTransaction(sg);

    await program.methods
      .setupGame(playerTwo.publicKey)
      .accounts({
        game: gamePublicKey,
        playerOne: playerOne.publicKey
      })
      .signers([playerOne])
      .rpc();

    const gameData = await program.account.game.fetch(gamePublicKey);

    expect(gameData.turn).to.equal(1);
    expect(gameData.players).to.eql([playerOne.publicKey, playerTwo.publicKey]);

    expect(gameData.state).to.eql({ active: {} });
    expect(gameData.board).to.eql([
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);
  });
});
```

## 51

### --description--

Using a constant string, and the first player's public key as seeds only allows one game to be played. Dynamic seeds can be added to the `game` account to allow for multiple games to be played with the same player accounts, using the `instruction` attribute:

```rust
pub fn initialize(ctx: Context<Init>, arg_1: String, arg_2: u8) -> Result<()> {}

#[derive(Accounts)]
#[instruction(arg_1: String, arg_2: u8)]
pub struct Init<'info> {
    #[account(
      init,
      payer = payer,
      seeds = [arg_1.as_bytes(), payer.key().as_ref(), arg_2],
      bump
    )]
    pub pda: Account<'info, Game>,
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}
```

The `instruction` attribute provides access to the instruction's arugments. You have to list them in the same order as in the instruction but you can omit all arguments after the last one you need.

Within `lib.rs`, add a third parameter `game_id` of type `String` to the `setup_game` instruction handler.

### --tests--

The `setup_game` instruction handler should have a `game_id` parameter.

```js
const setupGame = __librs.match(
  /pub fn setup_game\s*\(([^\)]*?)\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^\}]*)\}/s
)?.[1];
assert.match(setupGame, /game_id\s*:/);
```

The `game_id` parameter should be of type `String`.

```js
const setupGame = __librs.match(
  /pub fn setup_game\s*\(([^\)]*?)\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^\}]*)\}/s
)?.[1];
assert.match(setupGame, /game_id\s*:\s*String/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 52

### --description--

Within `lib.rs`, annotate the `SetupGame` struct with the `instruction` attribute, passing in the required parameters to access the `game_id` parameter.

### --tests--

The `SetupGame` struct should be annotated with `#[instruction(player_two_pubkey: Pubkey, game_id: String)]`.

```js
const librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
assert.match(
  librs,
  /(?<=#\[\s*instruction\s*\(\s*player_two_pubkey\s*:\s*Pubkey\s*,\s*game_id\s*:\s*String\s*\)\s*])\s*pub\s+struct\s+SetupGame/
);
```

## 53

### --description--

Within `lib.rs`, add the `game_id` parameter as a seed to the `seeds` value of the `game` account.

### --tests--

The `game` field should be annotated with `#[account(seeds = [b"game", player_one.key().as_ref(), game_id.as_bytes()])]`.

```js
const librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
const setupGameStruct = librs.match(/struct\s*SetupGame\s*{([^\}]*)}/s)?.[1];
const accountAttribute = setupGameStruct?.match(
  /#\[account\s*\(([^\]]*?)\]\s*pub\s*game/
)?.[1];
assert.match(
  accountAttribute,
  /seeds\s*=\s*\[\s*b"game"\s*,\s*player_one\s*.\s*key\s*\(\s*\)\s*.\s*as_ref\s*\(\s*\)\s*,\s*game_id\s*.\s*as_bytes\s*\(\s*\)\s*\]/
);
```

## 54

### --description--

To prevent Rust from complaining about the `game_id` parameter not being used, prefix it with an underscore.

### --tests--

The `game_id` parameter should be prefixed with an underscore in the `setup_game` instruction handler.

```js
const setupGame = __librs.match(
  /pub fn setup_game\s*\(([^\)]*?)\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^\}]*)\}/
)?.[1];
assert.match(setupGame, /_game_id\s*:/);
```

The `game_id` parameter should be prefixed with an underscore in the `instruction` attribute.

```js
const setupGame = __librs.match(
  /pub fn setup_game\s*\(([^\)]*?)\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^\}]*)\}/
)?.[1];
const instructionAttribute = setupGame?.match(
  /#\[instruction\s*\(([^\]]*?)\)\s*\]/
)?.[1];
assert.match(instructionAttribute, /_game_id\s*:\s*String/);
```

The `game_id` parameter should be prefixed with an underscore in the `game` account's `seeds` value.

```js
const setupGameStruct = __librs.match(/struct\s*SetupGame\s*{([^\}]*)}/s)?.[1];
const accountAttribute = setupGameStruct?.match(
  /#\[account\s*\(([^\]]*?)\]\s*pub\s*game/
)?.[1];
assert.match(
  accountAttribute,
  /seeds\s*=\s*\[\s*b"game"\s*,\s*player_one\s*.\s*key\s*\(\s*\)\s*.\s*as_ref\s*\(\s*\)\s*,\s*_game_id\s*.\s*as_bytes\s*\(\s*\)\s*\]/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 55

### --description--

Run the tests to see if the `setup_game` instruction handler is working correctly.

### --tests--

The test for `setup_game` should pass when `anchor test --skip-local-validator`.

```js
const terminalOutput = await __helpers.getTerminalOutput();
assert.include(terminalOutput, '1 passing');
```

You should be in the `tic-tac-toe` directory.

```js
const cwd = await __helpers.getLastCWD();
const dirRegex = new RegExp(`${project.dashedName}/tic-tac-toe/?$`);
assert.match(cwd, dirRegex);
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

### --seed--

#### --force--

#### --"tic-tac-toe/tests/tic-tac-toe.ts"--

```typescript
import {
  AnchorError,
  Program,
  AnchorProvider,
  setProvider,
  workspace
} from '@coral-xyz/anchor';
import { TicTacToe } from '../target/types/tic_tac_toe';
import { expect } from 'chai';
import { Keypair, PublicKey } from '@solana/web3.js';

describe('tic-tac-toe', () => {
  // Configure the client to use the local cluster.
  setProvider(AnchorProvider.env());

  const program = workspace.TicTacToe as Program<TicTacToe>;
  const programProvider = program.provider as AnchorProvider;

  it('initializes a game', async () => {
    const playerOne = Keypair.generate();
    const playerTwo = Keypair.generate();

    const gameId = 'game-1';

    const [gamePublicKey, _] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('game'),
        playerOne.publicKey.toBuffer(),
        Buffer.from(gameId)
      ],
      program.programId
    );

    // Airdrop to playerOne
    const sg = await programProvider.connection.requestAirdrop(
      playerOne.publicKey,
      1_000_000_000
    );
    await programProvider.connection.confirmTransaction(sg);

    await program.methods
      .setupGame(playerTwo.publicKey, gameId)
      .accounts({
        game: gamePublicKey,
        playerOne: playerOne.publicKey
      })
      .signers([playerOne])
      .rpc();

    const gameData = await program.account.game.fetch(gamePublicKey);

    expect(gameData.turn).to.equal(1);
    expect(gameData.players).to.eql([playerOne.publicKey, playerTwo.publicKey]);

    expect(gameData.state).to.eql({ active: {} });
    expect(gameData.board).to.eql([
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);
  });
});
```

## 56

### --description--

Within `lib.rs`, define another instruction handler called `play`. It should take a `ctx` parameter of type `Context<Play>`, and return a `Result<()>`.

### --tests--

The `play` instruction handler should be defined.

```js
assert.match(__librs, /pub fn play\s*\([^\)]*?\)/);
```

The `play` instruction handler should take a `ctx` parameter of type `Context<Play>`.

```js
const playFn = __librs.match(/pub fn play\s*\(([^\)]*?)\)/)?.[1];
assert.match(playFn, /ctx\s*:\s*Context\s*<\s*Play\s*>/);
```

The `play` instruction handler should return a `Result<()>`.

```js
const playReturn = __librs.match(/pub fn play\s*\([^\)]*?\)([^\{]*){/)?.[1];
assert.match(playReturn, /->\s*Result\s*<\s*\(\s*\)\s*>\s*/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 57

### --description--

Within `lib.rs`, define a new public struct `Play` that implements the `Accounts` trait.

### --tests--

The `Play` struct should be defined.

```js
assert.match(__librs, /pub struct Play/);
```

The `Play` struct should implement the `Accounts` trait.

```js
assert.match(
  __librs,
  /(?<=#\[derive\s*\(\s*Accounts\s*\)\s*\])\s*pub struct Play/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 58

### --description--

The `play` instruction handler will need access to the `game` account.

Within `Play`, define a field called `game` of type `Account<'info, Game>`.

### --tests--

The `game` field should be defined.

```js
const playStruct = __librs.match(/pub struct Play[^\{]*?{([^\}]*)}/)?.[1];
assert.match(playStruct, /game\s*:/);
```

The `game` field should be of type `Account<'info, Game>`.

```js
const playStruct = __librs.match(/pub struct Play[^\{]*?{([^\}]*?)}/)?.[1];
assert.match(playStruct, /game\s*:\s*Account\s*<\s*'info\s*,\s*Game\s*>/);
```

The `Play` struct should take a generic lifetime parameter `'info`.

```js
assert.match(__librs, /pub struct Play\s*<'info>/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 59

### --description--

The `play` instruction handler will need access to the player who called it.

Within `Play`, define a field called `player` of type `Signer<'info>`.

### --tests--

The `player` field should be defined.

```js
const playStruct = __librs.match(/pub struct Play[^\{]*?{([^\}]*)}/)?.[1];
assert.match(playStruct, /player\s*:/);
```

The `player` field should be of type `Signer<'info>`.

```js
const playStruct = __librs.match(/pub struct Play[^\{]*?{([^\}]*?)}/)?.[1];
assert.match(playStruct, /player\s*:\s*Signer\s*<\s*'info\s*>/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 60

### --description--

Within the `play` instruction handler, declare a variable `game`, and assign a mutable reference to the `game` account to it.

### --tests--

The `game` variable should be declared.

```js
const playFn = __librs.match(
  /pub fn play\s*\([^\)]*?\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^\}]*)\}/
)?.[1];
assert.match(playFn, /let game/);
```

The `game` variable should be assigned `&mut ctx.accounts.game`.

```js
const playFn = __librs.match(
  /pub fn play\s*\([^\)]*?\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^\}]*)\}/
)?.[1];
assert.match(playFn, /let game\s*=\s*&\s*mut\s*ctx\s*.\s*accounts\s*.\s*game/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 61

### --description--

Along with the `require!` macro, Anchor provides a `require_keys_eq!` macro. This macro takes two public keys, and ensures they are equal:

```rust
require_keys_eq!(
  ctx.accounts.account_1.key(),
  ctx.accounts.account_2.key(),
  OptionalCustomError::MyError
);
```

**Note:** This is specifically provided, because the `require_eq!` macro should not be used to compare public keys.

Within the `play` instruction handler, use the `require_keys_eq!` macro to ensure the expected current player is the same as the player who called the instruction.

### --tests--

`play` should have `require_keys_eq!(game.current_player(), ctx.accounts.player.key());`.

```js
const librs = await __helpers
  .getFile(`${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`)
  ?.replaceAll(/[ \t]{2,}/g, ' ');
const playFn = librs.match(
  /pub fn play\s*\([^\)]*?\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^\}]*)\}/
)?.[1];
assert.match(
  playFn,
  /require_keys_eq\s*!\s*\(\s*game\s*.\s*current_player\s*\(\s*\)\s*,\s*ctx\s*.\s*accounts\s*.\s*player\s*.\s*key\s*\(\s*\)\s*\)/
);
```

## 62

### --description--

Add a third argument of `TicTacToeError::NotPlayersTurn` to the `require_keys_eq!` macro. Also, define the `NotPlayersTurn` error variant in the `TicTacToeError` enum.

### --tests--

`play` should have `require_keys_eq!(game.current_player(), ctx.accounts.player.key(), TicTacToeError::NotPlayersTurn);`.

```js
const playFn = __librs.match(
  /pub fn play\s*\([^\)]*?\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^\}]*)\}/
)?.[1];
assert.match(
  playFn,
  /require_keys_eq\s*!\s*\(\s*game\s*.\s*current_player\s*\(\s*\)\s*,\s*ctx\s*.\s*accounts\s*.\s*player\s*.\s*key\s*\(\s*\)\s*,\s*TicTacToeError\s*::\s*NotPlayersTurn\s*\)/
);
```

`TicTacToeError` should have a `NotPlayersTurn` variant.

```js
const ticTacToError = __librs.match(/enum\s*TicTacToeError\s*{([^\}]*)}/)?.[1];
assert.match(ticTacToError, /NotPlayersTurn/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
global.__librs = __librs?.replaceAll(/[ \t]{2,}/g, ' ');
```

### --after-all--

```js
delete global.__librs;
```

## 63

### --description--

Within the `play` instruction handler, call the `play` method on the `game` account. Pass in a reference to a variable `tile`.

### --tests--

`play` should have `game.play(&tile);`.

```js
const librs = await __helpers
  .getFile(`${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`)
  ?.replaceAll(/[ \t]{2,}/g, ' ');
const playFn = librs.match(
  /pub fn play\s*\([^\)]*?\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^\}]*)\}/
)?.[1];
assert.match(playFn, /game\s*.\s*play\s*\(\s*&\s*tile\s*\)/);
```

## 64

### --description--

Adjust the `play` instruction handler signature to take a `tile` parameter of type `Tile`.

### --tests--

`play` should take a `tile` parameter of type `Tile`.

```js
const playFnParams = __librs.match(
  /pub fn play\s*\(([^\)]*?)\)\s*->\s*Result\s*<\s*\(\)\s*>\s*{([^\}]*)\}/
)?.[1];
assert.match(playFnParams, /tile\s*:\s*Tile/);
```

## 65

### --description--

Run the tests.

### --tests--

The tests for the `play` instruction handler should error ❌.

```js
const terminalOutput = await __helpers.getTerminalOutput();
assert.include(terminalOutput, '3 failing');
```

You should be in the `tic-tac-toe` directory.

```js
const cwd = await __helpers.getLastCWD();
const dirRegex = new RegExp(`${project.dashedName}/tic-tac-toe/?$`);
assert.match(cwd, dirRegex);
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

### --seed--

#### --force--

#### --"tic-tac-toe/tests/tic-tac-toe.ts"--

```typescript
import {
  AnchorError,
  Program,
  AnchorProvider,
  setProvider,
  workspace
} from '@coral-xyz/anchor';
import { TicTacToe } from '../target/types/tic_tac_toe';
import { expect } from 'chai';
import { Keypair, PublicKey } from '@solana/web3.js';

describe('tic-tac-toe', () => {
  // Configure the client to use the local cluster.
  setProvider(AnchorProvider.env());

  const program = workspace.TicTacToe as Program<TicTacToe>;
  const programProvider = program.provider as AnchorProvider;

  it('initializes a game', async () => {
    const playerOne = Keypair.generate();
    const playerTwo = Keypair.generate();

    const gameId = 'game-1';

    const [gamePublicKey, _] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('game'),
        playerOne.publicKey.toBuffer(),
        Buffer.from(gameId)
      ],
      program.programId
    );

    // Airdrop to playerOne
    const sg = await programProvider.connection.requestAirdrop(
      playerOne.publicKey,
      1_000_000_000
    );
    await programProvider.connection.confirmTransaction(sg);

    await program.methods
      .setupGame(playerTwo.publicKey, gameId)
      .accounts({
        game: gamePublicKey,
        playerOne: playerOne.publicKey
      })
      .signers([playerOne])
      .rpc();

    const gameData = await program.account.game.fetch(gamePublicKey);

    expect(gameData.turn).to.equal(1);
    expect(gameData.players).to.eql([playerOne.publicKey, playerTwo.publicKey]);

    expect(gameData.state).to.eql({ active: {} });
    expect(gameData.board).to.eql([
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);
  });

  it('has player one win', async () => {
    const playerOne = Keypair.generate();
    const playerTwo = Keypair.generate();

    const gameId = 'game-2';

    const [gamePublicKey, _bump] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('game'),
        playerOne.publicKey.toBuffer(),
        Buffer.from(gameId)
      ],
      program.programId
    );

    // Airdrop to playerOne
    const sg = await programProvider.connection.requestAirdrop(
      playerOne.publicKey,
      1_000_000_000
    );
    await programProvider.connection.confirmTransaction(sg);

    await program.methods
      .setupGame(playerTwo.publicKey, gameId)
      .accounts({
        game: gamePublicKey,
        playerOne: playerOne.publicKey
      })
      .signers([playerOne])
      .rpc();

    let gameData = await program.account.game.fetch(gamePublicKey);

    expect(gameData.turn).to.equal(1);

    await play(
      program,
      gamePublicKey,
      playerOne,
      { row: 0, column: 0 },
      2,
      { active: {} },
      [
        [{ x: {} }, null, null],
        [null, null, null],
        [null, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerTwo,
      { row: 1, column: 0 },
      3,
      { active: {} },
      [
        [{ x: {} }, null, null],
        [{ o: {} }, null, null],
        [null, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerOne,
      { row: 0, column: 1 },
      4,
      { active: {} },
      [
        [{ x: {} }, { x: {} }, null],
        [{ o: {} }, null, null],
        [null, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerTwo,
      { row: 1, column: 1 },
      5,
      { active: {} },
      [
        [{ x: {} }, { x: {} }, null],
        [{ o: {} }, { o: {} }, null],
        [null, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerOne,
      { row: 0, column: 2 },
      5,
      { won: { winner: playerOne.publicKey } },
      [
        [{ x: {} }, { x: {} }, { x: {} }],
        [{ o: {} }, { o: {} }, null],
        [null, null, null]
      ]
    );
  });

  it('handles ties', async () => {
    const playerOne = Keypair.generate();
    const playerTwo = Keypair.generate();

    const gameId = 'game-3';

    const [gamePublicKey, _bump] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('game'),
        playerOne.publicKey.toBuffer(),
        Buffer.from(gameId)
      ],
      program.programId
    );

    // Airdrop to playerOne
    const sg = await programProvider.connection.requestAirdrop(
      playerOne.publicKey,
      1_000_000_000
    );
    await programProvider.connection.confirmTransaction(sg);

    await program.methods
      .setupGame(playerTwo.publicKey, gameId)
      .accounts({
        game: gamePublicKey,
        playerOne: playerOne.publicKey
      })
      .signers([playerOne])
      .rpc();

    let gameState = await program.account.game.fetch(gamePublicKey);
    expect(gameState.turn).to.equal(1);

    await play(
      program,
      gamePublicKey,
      playerOne,
      { row: 0, column: 0 },
      2,
      { active: {} },
      [
        [{ x: {} }, null, null],
        [null, null, null],
        [null, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerTwo,
      { row: 1, column: 1 },
      3,
      { active: {} },
      [
        [{ x: {} }, null, null],
        [null, { o: {} }, null],
        [null, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerOne,
      { row: 2, column: 0 },
      4,
      { active: {} },
      [
        [{ x: {} }, null, null],
        [null, { o: {} }, null],
        [{ x: {} }, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerTwo,
      { row: 1, column: 0 },
      5,
      { active: {} },
      [
        [{ x: {} }, null, null],
        [{ o: {} }, { o: {} }, null],
        [{ x: {} }, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerOne,
      { row: 1, column: 2 },
      6,
      { active: {} },
      [
        [{ x: {} }, null, null],
        [{ o: {} }, { o: {} }, { x: {} }],
        [{ x: {} }, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerTwo,
      { row: 0, column: 1 },
      7,
      { active: {} },
      [
        [{ x: {} }, { o: {} }, null],
        [{ o: {} }, { o: {} }, { x: {} }],
        [{ x: {} }, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerOne,
      { row: 2, column: 1 },
      8,
      { active: {} },
      [
        [{ x: {} }, { o: {} }, null],
        [{ o: {} }, { o: {} }, { x: {} }],
        [{ x: {} }, { x: {} }, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerTwo,
      { row: 2, column: 2 },
      9,
      { active: {} },
      [
        [{ x: {} }, { o: {} }, null],
        [{ o: {} }, { o: {} }, { x: {} }],
        [{ x: {} }, { x: {} }, { o: {} }]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerOne,
      { row: 0, column: 2 },
      9,
      { tie: {} },
      [
        [{ x: {} }, { o: {} }, { x: {} }],
        [{ o: {} }, { o: {} }, { x: {} }],
        [{ x: {} }, { x: {} }, { o: {} }]
      ]
    );
  });

  it('handles invalid plays', async () => {
    const playerOne = Keypair.generate();
    const playerTwo = Keypair.generate();

    const gameId = 'game-4';

    const [gamePublicKey, _bump] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('game'),
        playerOne.publicKey.toBuffer(),
        Buffer.from(gameId)
      ],
      program.programId
    );

    // Airdrop to playerOne
    const sg = await programProvider.connection.requestAirdrop(
      playerOne.publicKey,
      1_000_000_000
    );
    await programProvider.connection.confirmTransaction(sg);

    await program.methods
      .setupGame(playerTwo.publicKey, gameId)
      .accounts({
        game: gamePublicKey,
        playerOne: playerOne.publicKey
      })
      .signers([playerOne])
      .rpc();

    let gameData = await program.account.game.fetch(gamePublicKey);

    expect(gameData.turn).to.equal(1);

    await play(
      program,
      gamePublicKey,
      playerOne,
      { row: 0, column: 0 },
      2,
      { active: {} },
      [
        [{ x: {} }, null, null],
        [null, null, null],
        [null, null, null]
      ]
    );

    try {
      await play(
        program,
        gamePublicKey,
        playerOne, // same player in subsequent turns
        // change sth about the tx because
        // duplicate tx that come in too fast
        // after each other may get dropped
        { row: 1, column: 0 },
        2,
        { active: {} },
        [
          [{ x: {} }, null, null],
          [null, null, null],
          [null, null, null]
        ]
      );
      chai.assert(false, "should've failed but didn't ");
    } catch (_err) {
      expect(_err).to.be.instanceOf(AnchorError);
      const err: AnchorError = _err;
      expect(err.error.errorCode.code).to.equal('NotPlayersTurn');
      expect(err.error.errorCode.number).to.equal(6003);
      expect(err.program.equals(program.programId)).is.true;
      expect(err.error.comparedValues).to.deep.equal([
        playerTwo.publicKey,
        playerOne.publicKey
      ]);
    }

    try {
      await play(
        program,
        gamePublicKey,
        playerTwo,
        { row: 5, column: 1 }, // out of bounds row
        3,
        { active: {} },
        [
          [{ x: {} }, null, null],
          [null, null, null],
          [null, null, null]
        ]
      );
      chai.assert(false, "should've failed but didn't ");
    } catch (_err) {
      expect(_err).to.be.instanceOf(AnchorError);
      const err: AnchorError = _err;
      expect(err.error.errorCode.number).to.equal(6000);
      expect(err.error.errorCode.code).to.equal('TileOutOfBounds');
    }

    try {
      await play(
        program,
        gamePublicKey,
        playerTwo,
        { row: 0, column: 0 },
        3,
        { active: {} },
        [
          [{ x: {} }, null, null],
          [null, null, null],
          [null, null, null]
        ]
      );
      chai.assert(false, "should've failed but didn't ");
    } catch (_err) {
      expect(_err).to.be.instanceOf(AnchorError);
      const err: AnchorError = _err;
      expect(err.error.errorCode.number).to.equal(6001);
      expect(err.error.errorCode.code).to.equal('TileAlreadySet');
    }

    await play(
      program,
      gamePublicKey,
      playerTwo,
      { row: 1, column: 0 },
      3,
      { active: {} },
      [
        [{ x: {} }, null, null],
        [{ o: {} }, null, null],
        [null, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerOne,
      { row: 0, column: 1 },
      4,
      { active: {} },
      [
        [{ x: {} }, { x: {} }, null],
        [{ o: {} }, null, null],
        [null, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerTwo,
      { row: 1, column: 1 },
      5,
      { active: {} },
      [
        [{ x: {} }, { x: {} }, null],
        [{ o: {} }, { o: {} }, null],
        [null, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerOne,
      { row: 0, column: 2 },
      5,
      { won: { winner: playerOne.publicKey } },
      [
        [{ x: {} }, { x: {} }, { x: {} }],
        [{ o: {} }, { o: {} }, null],
        [null, null, null]
      ]
    );

    try {
      await play(
        program,
        gamePublicKey,
        playerOne,
        { row: 0, column: 2 },
        6,
        { won: { winner: playerOne.publicKey } },
        [
          [{ x: {} }, { x: {} }, null],
          [{ o: {} }, { o: {} }, null],
          [null, null, null]
        ]
      );
      chai.assert(false, "should've failed but didn't ");
    } catch (_err) {
      expect(_err).to.be.instanceOf(AnchorError);
      const err: AnchorError = _err;
      expect(err.error.errorCode.number).to.equal(6002);
      expect(err.error.errorCode.code).to.equal('GameAlreadyOver');
    }
  });
});

async function play(
  program: Program<TicTacToe>,
  game: PublicKey,
  player: Keypair,
  tile: { row: number; column: number },
  expectedTurn: number,
  expectedGameState:
    | { active: {} }
    | { won: { winner: PublicKey } }
    | { tie: {} },
  expectedBoard: Array<Array<{ x: {} } | { o: {} } | null>>
) {
  await program.methods
    .play(tile)
    .accounts({
      player: player.publicKey,
      game
    })
    .signers([player])
    .rpc();

  const gameData = await program.account.game.fetch(game);

  expect(gameData.turn).to.equal(expectedTurn);
  expect(gameData.state).to.eql(expectedGameState);
  expect(gameData.board).to.eql(expectedBoard);
}
```

## 66

### --description--

The tests failed, because a mutable reference to the `game` account is required, but the account is not marked as `mut`.

Mark the `game` account as `mut`.

### --tests--

The `Play` struct should have `game` annotated with `#[account(mut)]`.

```js
const librs = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/programs/tic-tac-toe/src/lib.rs`
);
const playStruct = librs.match(/pub\s+struct\s+Play[^\{]*?{([^\}]*)}/)?.[1];
assert.match(
  playStruct,
  /#[\s\n]*account[\s\n]*\([\s\n]*mut[\s\n]*\)\s*pub\s+game/
);
```

## 67

### --description--

Run the tests to ensure everything is working as expected.

### --tests--

All tests should pass for the `anchor test --skip-local-validator` command ✅.

```js
const terminalOutput = await __helpers.getTerminalOutput();
assert.include(terminalOutput, '4 passing');
```

You should be in the `tic-tac-toe` directory.

```js
const cwd = await __helpers.getLastCWD();
const dirRegex = new RegExp(`${project.dashedName}/tic-tac-toe/?$`);
assert.match(cwd, dirRegex);
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

## 68

### --description--

**Summary**

- Derive `Accounts` for context structs
- Annotate custom accounts with `#[account]`
- Annotate custom errors with `#[error_code]`
- Use the `instruction` attribute to access the instruction data
- Anchor provides various account constraints:
  - `init` - Initialises an account, setting the owner field of the created account to the currently executing program
  - `mut` - Checks the given account is mutable, and persists any state changes
- The `Account` struct verifies program ownership
- The `Signer` struct verifies the account in the transaction also signed the transaction
- The `Program` struct validates the account provided is the given program

🎆

Once you are done, enter `done` in the terminal.

### --tests--

You should enter `done` in the terminal

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## --fcc-end--
