# Solana - Build an Anchor Leaderboard

## 1

### --description--

You are developing an on-chain game called _Rock Destroyer_. You will be writing the program logic for the game leaderboard using the Anchor framework, as well as writing tests to ensure the program logic is correct.

You will be working entirely within the `build-an-anchor-leaderboard/rock-destroyer` directory. The `rock-destroyer` directory is an Anchor boilerplate project with a front-end already set up.

### User Stories

#### Setup

1. You should generate a new keypair and store it in a file called `game-owner.json`.
2. You should add the correct program id to the `programs.localnet.rock_destroyer` key in the `Anchor.toml` file.

#### Program

1. You should add the correct program id to the `declare_id!` call in the `lib.rs` file.

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
     - The account public key should match the `game-owner.json` file public key
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
     - The account public key should match the `game-owner.json` file public key
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

- You should not add any external dependencies to the `package.json` file for the tests
  - You have access to `chai`
- Many tests rely on previous user stories being correctly implemented

[^1]: Hint: You can use the `transfer` function from the `system_instruction` module in the `solana_program` crate.

### --tests--

You should generate a new keypair and store it in a file called `game-owner.json`.

```js
try {
  const fileExists = await __fsp.access(
    __path.join(__projectDir, './game-owner.json'),
    __fsp.constants.F_OK
  );
} catch (e) {
  assert.fail(e);
}
```

You should add the correct program id to the `programs.localnet.rock_destroyer` key in the `Anchor.toml` file.

```js
const anchorToml = await __fsp.readFile(
  __path.join(__projectDir, 'Anchor.toml'),
  'utf-8'
);
const actualProgramId = anchorToml.match(/rock_destroyer = "(.*)"/)?.[1];
const { stdout } = await __helpers.getCommandOutput(
  'anchor keys list',
  __projectDir
);
const expectedProgramId = stdout.match(/rock_destroyer: (.*)/)?.[1];
assert.equal(actualProgramId, expectedProgramId);
```

You should add the correct program id to the `declare_id!` call in the `lib.rs` file.

```js
const librs = await __fsp.readFile(
  __path.join(__projectDir, 'programs/rock-destroyer/src/lib.rs'),
  'utf-8'
);
const actualProgramId = librs.match(/declare_id\!\((.*)\)/)?.[1];
const { stdout } = await __helpers.getCommandOutput(
  'anchor keys list',
  __projectDir
);
const expectedProgramId = stdout.match(/rock_destroyer: (.*)/)?.[1];
assert.equal(actualProgramId.replaceAll(/['"`]/g), expectedProgramId);
```

The `rock_destroyer` program should expose an `initialize_leaderboard` instruction handler.

```js
const testDir = await __createTestDir(4);
await __buildTestDir(4);
const { RockDestroyer } = await __helpers.importSansCache(
  __path.join(testDir, 'target/types/rock_destroyer')
);
const ixs = RockDestroyer.instructions;
const initializeLeaderboardIx = ixs.find(
  ix => ix.name === 'initializeLeaderboard'
);
assert.exists(
  initializeLeaderboardIx,
  'The `RockDestroyer` object in `target/types/rock_destroyer` should have an `instructions[].name` property equal to `initializeLeaderboard`'
);
```

The `initialize_leaderboard` instruction handler should take a context generic over an `InitializeLeaderboard` accounts struct.

```js
const testDir = await __createTestDir(5);
await __buildTestDir(5);
const { RockDestroyer } = await __helpers.importSansCache(
  __path.join(testDir, 'target/types/rock_destroyer')
);
const ixs = RockDestroyer.instructions;
const initializeLeaderboardIx = ixs.find(
  ix => ix.name === 'initializeLeaderboard'
);
const accounts = initializeLeaderboardIx.accounts;
assert.deepInclude(accounts, {
  name: 'leaderboard',
  isMut: true,
  isSigner: false
});
assert.deepInclude(accounts, {
  name: 'gameOwner',
  isMut: true,
  isSigner: true
});
assert.deepInclude(accounts, {
  name: 'systemProgram',
  isMut: false,
  isSigner: false
});
```

The `rock_destroyer` program should expose a `new_game` instruction handler.

```js
const testDir = await __createTestDir(4);
await __buildTestDir(4);
const { RockDestroyer } = await __helpers.importSansCache(
  __path.join(testDir, 'target/types/rock_destroyer')
);
const ixs = RockDestroyer.instructions;
const newGameIx = ixs.find(ix => ix.name === 'newGame');
assert.exists(
  newGameIx,
  'The `RockDestroyer` object in `target/types/rock_destroyer` should have an `instructions[].name` property equal to `newGame`'
);
```

The `new_game` instruction handler should take a context generic over a `NewGame` accounts struct.

```js
const testDir = await __createTestDir(6);
await __buildTestDir(6);
const { RockDestroyer } = await __helpers.importSansCache(
  __path.join(testDir, 'target/types/rock_destroyer')
);
const ixs = RockDestroyer.instructions;
const newGameIx = ixs.find(ix => ix.name === 'newGame');
const accounts = newGameIx.accounts;
assert.deepInclude(accounts, {
  name: 'user',
  isMut: true,
  isSigner: true
});
assert.deepInclude(accounts, {
  name: 'leaderboard',
  isMut: true,
  isSigner: false
});
assert.deepInclude(accounts, {
  name: 'gameOwner',
  isMut: true,
  isSigner: false
});
assert.deepInclude(accounts, {
  name: 'systemProgram',
  isMut: false,
  isSigner: false
});
```

The `rock_destroyer` program should expose an `add_player_to_leaderboard` instruction handler.

```js
const testDir = await __createTestDir(4);
await __buildTestDir(4);
const { RockDestroyer } = await __helpers.importSansCache(
  __path.join(testDir, 'target/types/rock_destroyer')
);
const ixs = RockDestroyer.instructions;
const initializeLeaderboardIx = ixs.find(
  ix => ix.name === 'addPlayerToLeaderboard'
);
assert.exists(
  initializeLeaderboardIx,
  'The `RockDestroyer` object in `target/types/rock_destroyer` should have an `instructions[].name` property equal to `addPlayerToLeaderboard`'
);
```

The `add_player_to_leaderboard` instruction handler should take a context generic over an `AddPlayerToLeaderboard` accounts struct.

```js
const testDir = await __createTestDir(7);
await __buildTestDir(7);
const { RockDestroyer } = await __helpers.importSansCache(
  __path.join(testDir, 'target/types/rock_destroyer')
);
const ixs = RockDestroyer.instructions;
const ix = ixs.find(ix => ix.name === 'addPlayerToLeaderboard');
const accounts = ix.accounts;
assert.deepInclude(accounts, {
  name: 'leaderboard',
  isMut: true,
  isSigner: false
});
assert.deepInclude(accounts, {
  name: 'user',
  isMut: true,
  isSigner: true
});
```

There should be an `it` block named `"initializes leaderboard"`.

```js
const callExpressions = babelisedCode
  .getType('CallExpression')
  .filter(c => {
    return;
    c.callee?.name === 'it';
  })
  .map(c => c.arguments?.[1]?.value);
assert.include(callExpressions, 'initializes leaderboard');
```

There should be an `it` block named `"creates a new game"`.

```js
const callExpressions = babelisedCode
  .getType('CallExpression')
  .filter(c => {
    return;
    c.callee?.name === 'it';
  })
  .map(c => c.arguments?.[1]?.value);
assert.include(callExpressions, 'creates a new game');
```

There should be an `it` block named `"adds a player to the leaderboard"`.

```js
const callExpressions = babelisedCode
  .getType('CallExpression')
  .filter(c => {
    return;
    c.callee?.name === 'it';
  })
  .map(c => c.arguments?.[1]?.value);
assert.include(callExpressions, 'adds a player to the leaderboard');
```

There should be an `it` block named `"throws an error when the user has not payed"`.

```js
const callExpressions = babelisedCode
  .getType('CallExpression')
  .filter(c => {
    return;
    c.callee?.name === 'it';
  })
  .map(c => c.arguments?.[1]?.value);
assert.include(callExpressions, 'throws an error when the user has not payed');
```

### --before-all--

```js
const __fsp = await import('fs/promises');
const __path = await import('path');
const __projectDir = 'build-an-anchor-leaderboard/_answer/rock-destroyer';
const __testDir = 'build-an-anchor-leaderboard/__test/rock-destroyer';
const codeString = await __helpers.getFile(
  './' + join(__projectDir, 'tests/index.ts')
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});

async function __createTestDir(num) {
  const testDir = `${__testDir}-${num}`;
  // Remove old test dir
  logover.debug('Removing old test dir');
  await __fsp.rm(testDir, { recursive: true, force: true });
  // Create new test dir
  logover.debug('Creating new test dir');
  await __fsp.cp(__projectDir, testDir, { recursive: true });
  return testDir;
}

async function __buildTestDir(num) {
  const { stdout, stderr } = await __helpers.getCommandOutput(
    'anchor build',
    `${__testDir}-${num}`
  );
  if (stderr) {
    throw new Error(stderr);
  }
  return stdout;
}

global.__projectDir = __projectDir;
global.__testDir = __testDir;
global.__fsp = __fsp;
global.__path = __path;
global.__buildTestDir = __buildTestDir;
global.__createTestDir = __createTestDir;
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.__projectDir;
delete global.__testDir;
delete global.__fsp;
delete global.__path;
delete global.babelisedCode;

delete global.__buildTestDir;
delete global.__createTestDir;
```

## --fcc-end--
