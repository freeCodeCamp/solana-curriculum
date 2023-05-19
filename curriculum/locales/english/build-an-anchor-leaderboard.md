# Solana - Build an Anchor Leaderboard

## 1

<!-- TODO: The tests might need to be a lot more integrated - less unit -like -->

### --description--

You are developing an on-chain game called _Rock Destroyer_. You will be writing the program logic for the game leaderboard using the Anchor framework, as well as writing tests to ensure the program logic is correct.

You will be working entirely within the `build-an-anchor-leaderboard/rock-destroyer` directory. The `rock-destroyer` directory is an Anchor boilerplate project with a front-end already set up.

### User Stories

#### Setup

1. You should generate a new keypair and store it in a file called `game-owner.json`.
2. You should store the public key of the game owner in the `GAME_OWNER_PUBKEY` environment variable in the `.env` file.
3. You should store the program id in the `PROGRAM_ID` environment variable in the `.env` file.

#### Program

1. You should add the correct program id to the `programs.localnet.rock_destroyer` key in the `Anchor.toml` file.
2. You should add the correct program id to the `declare_id!` call in the `lib.rs` file.

**`initialize_leaderboard`**

1. The `rock_destroyer` program should expose an `initialize_leaderboard` instruction handler.
2. The `initialize_leaderboard` instruction handler should take a context generic over an `InitializeLeaderboard` accounts struct.
3. The `initialize_leaderboard` instruction handler should initialize the `leaderboard` account with the `players` field set to an empty vector.

**`InitializeLeaderboard`**

1. The `leaderboard` account should be initialized, if it does not already exist.
   - This should be payed for by the `game_owner` account
   - The correct amount of space for 5 players should be allocated
   - The PDA should be seeded with `"leaderboard"` and the `game_owner` public key
2. The `game_owner` account should be a signer.
   - The following constraints should be enforced:
     - The account should be mutable
     - The account public key should match the `GAME_OWNER_PUBKEY` environment variable
     - The account owner should be the system program

**`new_game`**

1. The `rock_destroyer` program should expose a `new_game` instruction handler.
2. The `new_game` instruction handler should take a context generic over a `NewGame` accounts struct.
3. The `new_game` instruction handler should take a `String` argument.
4. The `new_game` instruction handler should transfer 1 SOL from the `user` account to the `game_owner` account.[^1]
5. The `new_game` instruction handler should add a new `Player` to the leaderboard with:
   - `username` set to the `String` argument
   - `pubkey` set to the `user` account public key
   - `score` set to `0`
   - `has_payed` set to `true`
6. If the leaderboard is full, the player with the lowest score should be replaced.

**`NewGame`**

1. The `user` account should be a signer.
   - The following constraints should be enforced:
     - The account should be mutable
2. The `game_owner` account should be an unchecked account.
   - The following constraints should be enforced:
     - The account should be mutable
     - The account public key should match the `GAME_OWNER_PUBKEY` environment variable
     - The account owner should be the system program
3. The `leaderboard` account should be mutable.

**`add_player_to_leaderboard`**

1. The `rock_destroyer` program should expose an `add_player_to_leaderboard` instruction handler.
2. The `add_player_to_leaderboard` instruction handler should take a context generic over an `AddPlayerToLeaderboard` accounts struct.
3. The `add_player_to_leaderboard` instruction handler should take a `u64` argument.
4. The player matching the user account public key should be updated with:
   - `score` set to the `u64` argument
   - `has_payed` set to `false`
5. If no player matching the user account public key exists and has payed, an Anchor error variant of `PlayerNotFound` should be returned.

**`AddPlayerToLeaderboard`**

1. The `leaderboard` account should be mutable.
2. The `user` account should be a signer.
   - The following constraints should be enforced:
     - The account should be mutable

#### Tests

1. There should be an `it` block named `"initializes leaderboard"`.

- Call the `initialize_leaderboard` instruction
- Assert the `leaderboard` account equals `{ players: [] }`

2. There should be an `it` block named `"creates a new game"`.

- Call the `new_game` instruction with a `username` argument of `"camperbot"`
- Assert the `leaderboard` account has at least one player
- Assert the player has the correct `username`
- Assert the player has the correct `pubkey`
- Assert the player has a `hasPayed` value of `true`
- Assert the player has a `score` value of `0`
- Assert the balance of the `user` account has decreased by at least 1 SOL (_remember transaction fees_)

3. There should be an `it` block named `"adds a player to the leaderboard"`.

- Call the `add_player_to_leaderboard` instruction with an argument of `100`
- Assert a player has a `score` value of `100`
- Assert a player has a `hasPayed` value of `false`

4. There should be an `it` block named `"

- Assert the `PlayerNotFound` error variant is returned when the `user` account has not payed

#### Types

<details>
  <summary><code>InitializeLeaderboard</code></summary>

```rust
leaderboard: Account<'info, Leaderboard>,
game_owner: Signer<'info>,
system_program: Program<'info, System>,
```

</details>

<details>
  <summary><code>NewGame</code></summary>

```rust
user: Signer<'info>,
game_owner: AccountInfo<'info>,
leaderboard: Account<'info, Leaderboard>,
system_program: Program<'info, System>,
```

</details>

<details>
  <summary><code>AddPlayerToLeaderboard</code></summary>

```rust
leaderboard: Account<'info, Leaderboard>,
user: Signer<'info>,
```

</details>

<details>
  <summary><code>Leaderboard</code></summary>

```rust
players: Vec<Player>
```

</details>

<details>
  <summary><code>Player</code></summary>

```rust
username: String, // max length 32
pubkey: Pubkey,
score: u64,
has_payed: bool,
```

</details>

### Notes

- `.env`
  - `GAME_OWNER_PUBKEY` - the public key of the game owner 😅
  - `PROGRAM_ID` - the public key of the program
- You should not add any external dependencies to the `package.json` file for the tests
  - You have access to `chai`
- Many tests rely on previous user stories being correctly implemented

[^1]: Hint: You can use the `transfer` function from the `system_instruction` module in the `solana_program` crate.

<!-- TODO: To test, copy whole app to ./__test/rock-destroyer/ dir -->
<!--       Seed `lib.rs` with different versions of program, and see when tests fail -->
<!-- For each test:
1. Check for existance of `lockfile` in project
2. If lockfile exists, wait until repoll
3. Else, add lockfile, and perform test
4. Remove lockfile -->

### --tests--

You should generate a new keypair and store it in a file called `game-owner.json`.

```js
// 1
assert.fail();
```

You should store the public key of the game owner in the `GAME_OWNER_PUBKEY` environment variable in the `.env` file.

```js
// 2
assert.fail();
```

You should store the program id in the `PROGRAM_ID` environment variable in the `.env` file.

```js
// 3
assert.fail();
```

You should add the correct program id to the `programs.localnet.rock_destroyer` key in the `Anchor.toml` file.

```js
// 4
assert.fail();
```

You should add the correct program id to the `declare_id!` call in the `lib.rs` file.

```js
// 5
assert.fail();
```

The `rock_destroyer` program should expose an `initialize_leaderboard` instruction handler.

```js
// 6
assert.fail();
```

The `initialize_leaderboard` instruction handler should take a context generic over an `InitializeLeaderboard` accounts struct.

```js
// 7
assert.fail();
```

The `initialize_leaderboard` instruction handler should initialize the `leaderboard` account with the `players` field set to an empty vector.

```js
// 8
assert.fail();
```

The `leaderboard` account should be initialized, if it does not already exist.

```js
// 9
assert.fail();
```

The initalization of the `leaderboard` account should be payed for by the `game_owner` account.

```js
// 10
assert.fail();
```

The correct amount of space for 5 players should be allocated for the `leaderboard` account.

```js
// 11
assert.fail();
```

The PDA should be seeded with `"leaderboard"` and the `game_owner` public key.

```js
// 12
assert.fail();
```

The `game_owner` account public key should be asserted to match the `GAME_OWNER_PUBKEY` environment variable.

```js
// 13
assert.fail();
```

The `game_owner` account owner should be asserted to be the system program.

```js
// 14
assert.fail();
```

The `rock_destroyer` program should expose a `new_game` instruction handler.

```js
// 15
assert.fail();
```

The `new_game` instruction handler should take a context generic over a `NewGame` accounts struct.

```js
// 16
assert.fail();
```

The `new_game` instruction handler should take a `String` argument.

```js
// 17
assert.fail();
```

The `new_game` instruction handler should transfer 1 SOL from the `user` account to the `game_owner` account.

```js
// 18
assert.fail();
```

The `new_game` instruction handler should add a new `Player` to the leaderboard with:

```js
// 19
assert.fail();
```

The `username` field of the new `Player` should be set to the `String` argument.

```js
// 20
assert.fail();
```

The `pubkey` field of the new `Player` should be set to the `user` account public key.

```js
// 21
assert.fail();
```

The `score` field of the new `Player` should be set to `0`.

```js
// 22
assert.fail();
```

The `has_payed` field of the new `Player` should be set to `true`.

```js
// 23
assert.fail();
```

If the leaderboard is full, the player with the lowest score should be replaced.

```js
// 24
assert.fail();
```

The `NewGame` `game_owner` account should be asserted to match the `GAME_OWNER_PUBKEY` environment variable.

```js
// 25
assert.fail();
```

The `NewGame` `game_owner` account owner should be asserted to be the system program.

```js
// 26
assert.fail();
```

The `rock_destroyer` program should expose an `add_player_to_leaderboard` instruction handler.

```js
// 27
assert.fail();
```

The `add_player_to_leaderboard` instruction handler should take a context generic over an `AddPlayerToLeaderboard` accounts struct.

```js
// 28
assert.fail();
```

The `add_player_to_leaderboard` instruction handler should take a `u64` argument.

```js
// 29
assert.fail();
```

The player matching the user account public key should be updated with a `score` set to the `u64` argument.

```js
// 30
assert.fail();
```

The player matching the user account public key should be updated with a `has_payed` set to `false`.

```js
// 31
assert.fail();
```

If no player matching the user account public key exists and has payed, an Anchor error variant of `PlayerNotFound` should be returned.

```js
// 32
assert.fail();
```

There should be an `it` block named `"initializes leaderboard"`.

```js
// 33
assert.fail();
```

The `"initializes leaderboard"` `it` block should call the `initialize_leaderboard` instruction.

```js
// 34
assert.fail();
```

The `"initializes leaderboard"` `it` block should assert the `leaderboard` account equals `{ players: [] }`.

```js
// 35
assert.fail();
```

There should be an `it` block named `"creates a new game"`.

```js
// 36
assert.fail();
```

The `"creates a new game"` `it` block should call the `new_game` instruction with a `username` argument of `"camperbot"`.

```js
// 37
assert.fail();
```

The `"creates a new game"` `it` block should assert the `leaderboard` account has at least one player.

```js
// 38
assert.fail();
```

The `"creates a new game"` `it` block should assert the player has the correct `username`.

```js
// 39
assert.fail();
```

The `"creates a new game"` `it` block should assert the player has the correct `pubkey`.

```js
// 40
assert.fail();
```

The `"creates a new game"` `it` block should assert the player has a `hasPayed` value of `true`.

```js
// 41
assert.fail();
```

The `"creates a new game"` `it` block should assert the player has a `score` value of `0`.

```js
// 42
assert.fail();
```

The `"creates a new game"` `it` block should assert the balance of the `user` account has decreased by at least 1 SOL.

```js
// 43
assert.fail();
```

There should be an `it` block named `"adds a player to the leaderboard"`.

```js
// 44
assert.fail();
```

The `"adds a player to the leaderboard"` `it` block should call the `add_player_to_leaderboard` instruction with an argument of `100`.

```js
// 45
assert.fail();
```

The `"adds a player to the leaderboard"` `it` block should assert a player has a `score` value of `100`.

```js
// 46
assert.fail();
```

The `"adds a player to the leaderboard"` `it` block should assert a player has a `hasPayed` value of `false`.

```js
// 47
assert.fail();
```

There should be an `it` block named `"throws an error when the user has not payed"`.

```js
// 48
assert.fail();
```

The `"throws an error when the user has not payed"` `it` block should assert the `PlayerNotFound` error variant is returned when the `user` account has not payed.

```js
// 49
assert.fail();
```

### --before-all--

```js
const { access, constants, rm, cp, writeFile } = await import('fs/promises');
const __projectDir = 'build-an-anchor-leaderboard/rock-destroyer';
const __testDir = 'build-an-anchor-leaderboard/__test/rock-destroyer';
const codeString = await __helpers.getFile(
  './' + join(__projectDir, 'tests/index.ts')
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});

async function __createTestDir() {
  // Remove old test dir
  await rm(__testDir, { recursive: true, force: true });
  // Create new test dir
  await cp(__projectDir, __testDir, { recursive: true });
}

async function __pollForLockfile() {
  const cb = async () => {
    return await access(join(__testDir, 'lockfile'), constants.F_OK)
      .then(() => true)
      .catch(() => false);
  };
  await __helpers.controlWrapper(cb, { timeout: 20_000, stepSize: 250 });
}

async function __removeLockfile() {
  await rm(join(__testDir, 'lockfile', { force: true }));
}

async function __createLockfile() {
  await writeFile(join(__testDir, 'lockfile'), '');
}

global.__projectDir = __projectDir;
global.__testDir = __testDir;
global.babelisedCode = babelisedCode;

global.__pollForLockfile = __pollForLockfile;
global.__removeLockfile = __removeLockfile;
global.__createLockfile = __createLockfile;
```

### --after-all--

```js
delete global.__projectDir;
delete global.__testDir;
delete global.babelisedCode;

// Remove any lockfiles
await __removeLockfile();

delete global.__pollForLockfile;
delete global.__removeLockfile;
delete global.__createLockfile;
```

## --fcc-end--
