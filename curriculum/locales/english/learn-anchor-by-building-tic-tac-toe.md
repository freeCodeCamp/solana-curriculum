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

The `#[account()]` attribute with an `init` parameter will create the account when required. The `AccountStruct` is a struct that will be used to deserialize the account data. The `AccountStruct` must implement the `AnchorSerialize` and `AnchorDeserialize` traits.

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

`derived_account` should be annotated with `payer = player_one`.

```js
assert.fail();
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
assert.fail();
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
assert.fail();
```

## 21

### --description--

Creating an account with `10` bytes allocated is great and all, but you do not actually know how much space you need until you have defined the `Game` struct representing the account data.

Define a public struct `Game`, and annotate it with `#[account]` to indicate it is a Solana account.

### --tests--

`pub struct Game` should exist in the `lib.rs` file.

```js
assert.fail();
```

`Game` should be annotated with `#[account]`.

```js
assert.fail();
```

## 22

### --description--

A game of tic-tac-toe consists of two players.

Keep track of the players, by adding a `players` field in `Game` with a type of `[Pubkey; 2]`.

### --tests--

`Game` should contain a field `players`.

```js
assert.fail();
```

`players` should be typed `[Pubkey; 2]`.

```js
assert.fail();
```

## 23

### --description--

Keep track of the current turn number, by adding a `turn` field in `Game` with a type of `u8`.

### --tests--

`Game` should contain a field `turn`.

```js
assert.fail();
```

`turn` should be typed `u8`.

```js
assert.fail();
```

## 24

### --description--

Keep track of the board state (the value of each tile), by adding a `board` field in `Game` with a type of `[[Option<Sign>; 3]; 3]`.

### --tests--

`Game` should contain a field `board`.

```js
assert.fail();
```

`board` should be typed `[[Option<Sign>; 3]; 3]`.

```js
assert.fail();
```

## 25

### --description--

Keep track of the current game condition, by adding a `state` field in `Game` with a type of `GameState`.

### --tests--

`Game` should contain a field `state`.

```js
assert.fail();
```

`state` should be typed `GameState`.

```js
assert.fail();
```

## 26

### --description--

Define a public enum `Sign` with variants `X` and `O`.

### --tests--

`pub enum Sign` should exist in the `lib.rs` file.

```js
assert.fail();
```

`Sign` should have a variant `X`.

```js
assert.fail();
```

`Sign` should have a variant `O`.

```js
assert.fail();
```

## 27

### --description--

Define a public enum `GameState` with variants `Active`, `Tie`, and `Won`. The `Won` variant should contain a named field `winner` with a type of `Pubkey`.

### --tests--

`pub enum GameState` should exist in the `lib.rs` file.

```js
assert.fail();
```

`GameState` should have a variant `Active`.

```js
assert.fail();
```

`GameState` should have a variant `Tie`.

```js
assert.fail();
```

`GameState` should have a variant `Won { winner: Pubkey }`.

```js
assert.fail();
```

## 28

### --description--

In order for Anchor to serialize and deserialize the `Game` account data, `GameState` and `Sign` must implement the `AnchorSerialize` and `AnchorDeserialize` traits.

Derive the `AnchorSerialize` and `AnchorDeserialize` traits for `GameState` and `Sign`.

### --tests--

`GameState` should be annotated with `#[derive(AnchorSerialize, AnchorDeserialize)]`.

```js
assert.fail();
```

`Sign` should be annotated with `#[derive(AnchorSerialize, AnchorDeserialize)]`.

```js
assert.fail();
```

## 29

### --description--

On top of `AnchorSerialize` and `AnchorDeserialize`, both `GameState` and `Sign` must also implement the `Clone` trait.

Derive the `Clone` trait for `GameState` and `Sign`.

### --tests--

`GameState` should be annotated with `#[derive(Clone)]`.

```js
assert.fail();
```

`Sign` should be annotated with `#[derive(Clone)]`.

```js
assert.fail();
```

## 30

### --description--

Finally, because `Sign` is within a slice, it must also implement the `Copy` trait.

Derive the `Copy` trait for `Sign`.

### --tests--

`Sign` should be annotated with `#[derive(Copy)]`.

```js
assert.fail();
```

## 31

### --description--

In order for an account to be created, the `System` program must be used. The `System` program is a built-in program that is available to all Solana programs, but must be annotated as needed in the context.

Add a public `system_program` field to the `SetupGame` struct, and type it as `Program<'info, System>`.

### --tests--

`SetupGame` should contain a field `system_program`.

```js
assert.fail();
```

`system_program` should be typed `Program<'info, System>`.

```js
assert.fail();
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

`Game` should be annotated with `#[account(size = 8 + (32*2) + (1) + ((1+1)*(3*3)) + (1+32))]`.

```js
assert.fail();
```

## 33

### --description--

**ATTENTION**: Your `lib.rs` file should have been seeded with all the game code. The game code is not relevant to Anchor, but you are still encouraged to read through it to understand how the game works.

Just a few things to fix. First, derive `PartialEq` for `GameState` and `Sign`.

### --tests--

`GameState` should be annotated with `#[derive(PartialEq)]`.

```js
assert.fail();
```

`Sign` should be annotated with `#[derive(PartialEq)]`.

```js
assert.fail();
```

### --seed--

#### --force--

#### --"tic-tac-toe/programs/tic-tac-toe/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("BUfb6FXLkiSpMnJnMR4Q5uGZYZkaNGytjhLwiiJQsE8F");

#[program]
pub mod tic_tac_toe {
    use super::*;

    pub fn setup_game(ctx: Context<SetupGame>, player_two: Pubkey) -> Result<()> {
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

#[derive(Accounts)]
pub struct Play<'info> {
    #[account(mut)]
    pub game: Account<'info, Game>,
    pub player: Signer<'info>,
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

**Note:** `num-derive` allows you to use `#[derive(FromPrimitive)]` on a struct or enum.

## --fcc-end--
