# Solana - Build an Anchor Leaderboard

## 1

<!-- TODO: Thinking about removing the client (`app`) -->
<!-- TODO: The tests might need to be a lot more integrated - less unit -like -->

### --description--

You are developing an on-chain game called _Rock Destroyer_. You will be writing the program logic for the game leaderboard using the Anchor framework, as well as writing tests to ensure the program logic is correct.

You will be working entirely within the `build-an-anchor-leaderboard/rock-destroyer` directory. The `rock-destroyer` directory is an Anchor boilerplate project with a front-end already set up.

### User Stories

#### Setup

1. You should generate a new keypair and store it in a file called `game-owner.json`.
2. You should store the public key of the game owner in the `GAME_OWNER_PUBKEY` environment variable in the `.env` file.
3. You should store the program id in the `PROGRAM_ID` environment variable in the `.env` file.
4. You should start a local solana cluster and store the url in the `SOLANA_CONNECTION_URL` environment variable in the `.env` file.

#### Program

1. You should add the correct program id to the `programs.localnet.rock_destroyer` key in the `Anchor.toml` file.
2. You should add the correct program id to the `declare_id!` call in the `lib.rs` file.
3. The `rock_destroyer` program should expose an `initialize_leaderboard` instruction handler.
<!-- - The `initialize_leaderboard` instruction handler should take a context generic over an `InitializeLeaderboard` instruction. -->
4. The `rock_destroyer` program should expose a `new_game` instruction handler.
5. The `rock_destroyer` program should expose an `add_player_to_leaderboard` instruction handler.

#### Tests

### Commands

### Notes

- `.env`
  - `GAME_OWNER_PUBKEY` - the public key of the game owner 😅
  - `PROGRAM_ID` - the public key of the program
  - `SOLANA_CONNECTION_URL` - the url of the Solana cluster

### --tests--

First test

```js
assert.fail();
```

### --before-all--

```js
const __projectDir = 'build-an-anchor-leaderboard/rock-destroyer';
const codeString = await __helpers.getFile(
  './' + join(__projectDir, 'tests/index.ts')
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});

global.__projectDir = __projectDir;
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.__projectDir;
delete global.babelisedCode;
```

## --fcc-end--
