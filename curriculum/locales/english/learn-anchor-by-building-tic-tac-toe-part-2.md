# Solana - Learn How to Test an Anchor Program: Part 2

## 1

### --description--

In the previous project, you used Anchor to create a program with instructions to play a game of Tic-Tac-Toe. This same program has been carried over as the boilerplate for this project.

Anchor automatically generated some test boilerplate for the `tic-tac-toe` program in the `tests/` directory. You will be mostly working in this directory.

Within a new terminal, change into the `tic-tac-toe` directory.

### --tests--

You should be in the `tic-tac-toe` directory.

```js
assert.fail();
```

## 2

### --description--

The boilerplate includes a `program` variable that uses the generated `TicTacToe` IDL to create a program instance. The program can send transactions, fetch deserialized accounts, decode instruction data, subscribe to account changes, and listen to events.

Within `tic-tac-toe/tests/tic-tac-toe.ts`, immediately below the `program` variable declaration, declare a `programProvider` variable and assign the following to it:

```typescript
program.provider as AnchorProvider;
```

### --tests--

The `programProvider` variable should be declared.

```js
assert.fail();
```

The `programProvider` variable should be assigned `program.provider as AnchorProvider`.

```js
assert.fail();
```

### --seed--

#### --force--

#### --"tic-tac-toe/tests/tic-tac-toe.ts"--

```typescript
import {
  AnchorProvider,
  workspace,
  setProvider,
  Program
} from '@coral-xyz/anchor';
import { TicTacToe } from '../target/types/tic_tac_toe';

describe('TicTacToe', () => {
  // Configure the client to use the local cluster.
  setProvider(AnchorProvider.env());

  const program = workspace.TicTacToe as Program<TicTacToe>;

  it('Is initialized!', async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log('Your transaction signature', tx);
  });
});
```

## 3

### --description--

To get autocomplete for the program, build your program with:

```bash
anchor build
```

Anchor creates an IDL from your program, and stores it in the `target/types/tic_tac_toe.ts` file.

### --tests--

The `target/types/tic_tac_toe.ts` file should exist.

```js
assert.fail();
```

## 4

### --description--

Within the `it` callback, change the `initialize` call to `setupGame`.

### --tests--

`tests/tic-tac-toe.ts` should have `const tx = await program.methods.setupGame().rpc();`.

```js
assert.fail();
```

## 5

### --description--

Now, you need to create the accounts to pass to the `setupGame` instruction handler.

At the top of the `it` callback, generate two new keypairs, and assign them to two new variables: `playerOne`, and `playerTwo`.

### --tests--

The `playerOne` variable should be declared.

```js
assert.fail();
```

The `playerOne` variable should be assigned `Keypair.generate()`.

```js
assert.fail();
```

The `playerTwo` variable should be declared.

```js
assert.fail();
```

The `playerTwo` variable should be assigned `Keypair.generate()`.

```js
assert.fail();
```

The `Keypair` class should be imported from `@solana/web3.js`.

```js
assert.fail();
```

## 6

### --description--

Within the `it` callback, create a new `gameId` variable, and assign it a value of `"game-1"`.

### --tests--

The `gameId` variable should be declared.

```js
assert.fail();
```

The `gameId` variable should be assigned `"game-1"`.

```js
assert.fail();
```

## 7

### --description--

Now, PDA's will make more sense - they can be <dfn title="You can generate the same public key before the program is initialized">repeatably, programmatically generated</dfn>:

```typescript
const [pda, bump] = PublicKey.findProgramAddressSync(
  [Buffer.from(seed)],
  program.programId
);
```

Destructure a variable `gamePublicKey` from `PublicKey.findProgramAddressSync`, using `"game"`, the payer's public key, and `gameId` as seeds.

### --tests--

`tests/tic-tac-toe.ts` should have `const [gamePublicKey, _] = PublicKey.findProgramAddressSync([Buffer.from("game"), payer.publicKey.toBuffer(), Buffer.from(gameId)], program.programId);`.

```js
assert.fail();
```

## 8

### --description--

Pass the public key of `playerTwo` as an argument to the `setupGame` instruction call.

### --tests--

`tests/tic-tac-toe.ts` should have `const tx = await program.methods.setupGame(playerTwo.publicKey).rpc();`.

```js
assert.fail();
```

## 9

### --description--

Pass `gameId` as the second argument to the `setupGame` instruction call.

### --tests--

`tests/tic-tac-toe.ts` should have `const tx = await program.methods.setupGame(playerTwo.publicKey, gameId).rpc();`.

```js
assert.fail();
```

## 10

### --description--

In a new terminal, start a clean local cluster:

```bash
solana-test-validator --reset
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
  assert.fail(e, 'Try running `solana-test-validator` in a separate terminal');
}
```

## 11

### --description--

Run the tests, using the local validator you just started:

```bash
anchor test --skip-local-validator
```

### --tests--

`anchor test` should error with `Error: Invalid arguments: game not provided`.

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

## 12

### --description--

You called `setupGame` without passing in any accounts. So, Anchor tried to create the `game` account using the transaction payer - your local Solana wallet.

Chain a `.accounts` call to the `setupGame` call, and pass in:

```typescript
{
  game: gamePublicKey,
  playerOne: playerOne.publicKey,
}
```

### --tests--

`tests/tic-tac-toe.ts` should have `const tx = await program.methods.setupGame(playerTwo.publicKey, gameId).accounts({ game: gamePublicKey, playerOne: playerOne.publicKey }).rpc();`.

```js
assert.fail();
```

## 13

### --description--

Run the tests again.

### --tests--

You should run `anchor test --skip-local-validator`.

```js
assert.fail();
```

The test should error with `Error: Signature verification failed`.

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

Seeing as the `game` and `playerOne` accounts are mutated (e.g. funds taken for fees, data changed), these accounts need to sign the transaction.

However, one of the main benefits with PDAs is the owner is the program. So, a PDA does not need to sign transactions mutating it within the owner program.

Chain a `.signers` call to the `setupGame` call, and pass in an array of the `playerOne` keypair.

### --tests--

`tests/tic-tac-toe.ts` should have `const tx = await program.methods.setupGame(playerTwo.publicKey, gameId).accounts({ game: gamePublicKey, playerOne: playerOne.publicKey }).signers([playerOne]).rpc();`.

```js
assert.fail();
```

## 15

### --description--

Run the tests again.

### --tests--

You should run `anchor test --skip-local-validator`.

```js
assert.fail();
```

The test should error with `Error: failed to send transaction`.

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

## 16

### --description--

This time, the transaction failed, because `playerOne` is used as the payer, but has not even been added to the blockchain, let alone have any funds 😱

Within the `it` callback, before the transaction is sent, declare a variable `sg` and assign the transaction signature for requesting an airdrop of 1 SOL to `playerOne`:

```typescript
await programProvider.connection.requestAirdrop(<PUBLIC_KEY>, <AMOUNT_IN_LAMPORTS>);
```

### --tests--

`tests/tic-tac-toe.ts` should have `const sg = await programProvider.connection.requestAirdrop(playerOne.publicKey, 1_000_000_000);`.

```js
assert.fail();
```

## 17

### --description--

Before trying to spend any funds, you need to ensure the transaction has been confirmed.

Below the `requestAirdrop` call, add:

```typescript
await programProvider.connection.confirmTransaction(<TRANSACTION_SIGNATURE>);
```

### --tests--

`tests/tic-tac-toe.ts` should have `await programProvider.connection.confirmTransaction(sg);`.

```js
assert.fail();
```

## 18

### --description--

Finally, run the tests again.

### --tests--

You should run `anchor test --skip-local-validator`.

```js
assert.fail();
```

The tests should pass ✅.

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

## 19

### --description--

To clarify what is happening behind the scenes when Anchor calls your program, split your instruction and transaction up into two lines:

```typescript
const ix = program.methods.<PROGRAM_METHOD>(<PROGRAM_METHOD_ARGS>).accounts(<PROGRAM_METHOD_ACCOUNTS>).signers(<PROGRAM_METHOD_SIGNERS>);
await ix.rpc();
```

### --tests--

`tests/tic-tac-toe.ts` should have `const ix = program.methods.setupGame(playerTwo.publicKey, gameId).accounts({ game: gamePublicKey, playerOne: playerOne.publicKey }).signers([playerOne]);`.

```js
assert.fail();
```

`tests/tic-tac-toe.ts` should have `await ix.rpc();`.

```js
assert.fail();
```

## 20

### --description--

Run the tests again to ensure everything still works.

### --tests--

You should run `anchor test --skip-local-validator`.

```js
assert.fail();
```

The tests should pass ✅.

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

## 21

### --description--

After the transaction is sent, you can fetch an account's data to see if it was correctly set up:

```typescript
const accountData = await program.account.<ACCOUNT_NAME>.fetch(<ACCOUNT_PUBLIC_KEY>);
```

Declare a variable `gameData` and assign it the `game` account's data.

### --tests--

`tests/tic-tac-toe.ts` should have `const gameData = await program.account.game.fetch(gamePublicKey);`.

```js
assert.fail();
```

## 22

### --description--

Assert the `game` account has a `turn` property equal to `1`.

_Hint:_ The boilerplate created by Anchor comes with `chai.js`.

### --tests--

`tests/tic-tac-toe.ts` should throw if `gameData.turn !== 1`.

```js
assert.fail();
```

## 23

### --description--

Assert the `game` account has a `players` property equal to an array of the public keys of `playerOne` and `playerTwo`.

### --tests--

`tests/tic-tac-toe.ts` should throw if `gameData.players[0] !== playerOne.publicKey`.

```js
assert.fail();
```

`tests/tic-tac-toe.ts` should throw if `gameData.players[1] !== playerTwo.publicKey`.

```js
assert.fail();
```

## 24

### --description--

Assert the `game` account has a `state` property equal to `active: {}`.

### --tests--

`tests/tic-tac-toe.ts` should throw if `gameData.state.active !== {}`.

```js
assert.fail();
```

## 25

### --description--

Assert the `game` account has a `board` property equal to a 3x3 array of `null` values.

### --tests--

`tests/tic-tac-toe.ts` should throw if `gameData.board !== [[null,null,null],[null,null,null],[null,null,null]]`.

```js
assert.fail();
```

## 26

### --description--

Run the tests again to ensure everything still works.

### --tests--

You should run `anchor test --skip-local-validator`.

```js
assert.fail();
```

The tests should pass ✅.

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

## 27

### --description--

Within the `tic-tac-toe.ts` file, within the `describe` callback, add a new `it` function call with a title of `"has player one win"`, and an empty, asynchronous callback function.

### --tests--

`tests/tic-tac-toe.ts` should have `it('has player one win', async () => {});`.

```js
assert.fail();
```

## 28

### --description--

Within the second `it` callback, generate two keypairs, and assign them to new variables `playerOne` and `playerTwo`.

### --tests--

`tests/tic-tac-toe.ts` should have `const playerOne = Keypair.generate();`.

```js
assert.fail();
```

`tests/tic-tac-toe.ts` should have `const playerTwo = Keypair.generate();`.

```js
assert.fail();
```

## 29

### --description--

Declare a variable `gameId`, and assign `"game-2"` to it.

### --tests--

`tests/tic-tac-toe.ts` should have `const gameId = "game-2";`.

```js
assert.fail();
```

## 30

### --description--

Destructure a `gamePublicKey` variable from deriving the program address.

### --tests--

`tests/tic-tac-toe.ts` should have `const [gamePublicKey] = await PublicKey.findProgramAddress([Buffer.from("game"),playerOne.publicKey.toBuffer(),Buffer.from(gameId)], program.programId);`.

```js
assert.fail();
```

## 31

### --description--

Request an airdrop for the first player, and await confirmation.

### --tests--

`tests/tic-tac-toe.ts` should have `const sg = await programProvider.connection.requestAirdrop(playerOne.publicKey, 1_000_000_000)`.

```js
assert.fail();
```

`tests/tic-tac-toe.ts` should have `await programProvider.connection.confirmTransaction(sg);`.

```js
assert.fail();
```

## 32

### --description--

Call your program's `setupGame` method, passing in the required arguments, and adding the necessary accounts and signers.

### --tests--

`tests/tic-tac-toe.ts` should have `await program.methods.setupGame(playerTwo.publicKey, gameId).accounts({ game: gamePublicKey, playerOne: playerOne.publicKey }).signers([playerOne]).rpc();`.

```js
assert.fail();
```

## 33

### --description--

Fetch the `game` account's data, and assign it to a variable `gameData`.

### --tests--

`tests/tic-tac-toe.ts` should have `const gameData = await program.account.game.fetch(gamePublicKey);`.

```js
assert.fail();
```

## 34

### --description--

Assert the `game` account has a `turn` property equal to `1`.

### --tests--

`tests/tic-tac-toe.ts` should throw if `gameData.turn !== 1`.

```js
assert.fail();
```

## 35

### --description--

Now, to play a move, call the `play` method of your program. Pass in `{ row: 0, column: 0 }` as the tile to play.

### --tests--

`tests/tic-tac-toe.ts` should have `await program.methods.play({ row: 0, column: 0 });`.

```js
assert.fail();
```

## 36

### --description--

Off of the `play` method call, chain a call to `accounts`, passing in the `game` and correct `player` public keys.

### --tests--

`tests/tic-tac-toe.ts` should have `await program.methods.play({ row: 0, column: 0 }).accounts({ game: gamePublicKey, player: playerOne.publicKey });`.

```js
assert.fail();
```

## 37

### --description--

Off of the `accounts` method call, chain a call to `signers`, passing in the correct keypair.

### --tests--

`tests/tic-tac-toe.ts` should have `await program.methods.play({ row: 0, column: 0 }).accounts({ game: gamePublicKey, player: playerOne.publicKey }).signers([playerOne]);`.

```js
assert.fail();
```

## 38

### --description--

Off of the `signers` method call, chain the `rpc` method call in order to send the transaction to the network.

### --tests--

`tests/tic-tac-toe.ts` should have `await program.methods.play({ row: 0, column: 0 }).accounts({ game: gamePublicKey, player: playerOne.publicKey }).signers([playerOne]).rpc();`.

```js
assert.fail();
```

## 39

### --description--

After the `play` method call, fetch the `game` account's data, and assign it to a variable `gameData2`.

### --tests--

`tests/tic-tac-toe.ts` should have `const gameData2 = await program.account.game.fetch(gamePublicKey);`.

```js
assert.fail();
```

## 40

### --description--

Assert the `game` account has a `turn` property equal to `2`.

### --tests--

`tests/tic-tac-toe.ts` should throw if `gameData2.turn !== 2`.

```js
assert.fail();
```

## 41

### --description--

Assert the `game` account has a `board` property equal to `[[{x:{}}, null, null], [null, null, null], [null, null, null]]`.

**Note:** The Rust code uses an enum to denote `X` and `O` tiles. This is deserialized to a JavaScript object with a single key, `x` or `o`, depending on the tile. This is why the `x` tile is represented as `{x:{}}` in the assertion.

### --tests--

`tests/tic-tac-toe.ts` should throw if `gameData2.board !== [[{x:{}}, null, null], [null, null, null], [null, null, null]]`.

```js
assert.fail();
```

## 42

### --description--

Assert the `game` account has a `state` property equal to `{ active: {} }`.

### --tests--

`tests/tic-tac-toe.ts` should throw if `gameData2.state !== { active: {} }`.

```js
assert.fail();
```

## 43

### --description--

Run the tests to see if everything is working as expected.

### --tests--

You should run `anchor test --skip-local-validator`.

```js
assert.fail();
```

The tests should pass ✅.

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

## 44

### --description--

You will be making many of these `play` calls. So, abstract the logic into a function.

Outwith the `describe` call, define an async function `play` with the following signature:

```ts
async function play(
  program: Program<TicTacToe>,
  game: PublicKey,
  player: Keypair,
  tile: { row: number; column: number },
  expectedTurn: number,
  extectedGameState:
    | { active: {} }
    | { won: { winner: PublicKey } }
    | { tied: {} },
  expectedBoard: Array<Array<{ x: {} } | { o: {} } | null>>
): Promise<void>;
```

### --tests--

`tests/tic-tac-toe.ts` should have an async function `play` with the correct signature.

```js
assert.fail();
```

## 45

### --description--

Cut the `play` call from the `it` block, and paste it into the `play` function, as well as the `fetch` call and subsequent assertions.

Change the arugments to use the `play` function parameters, and rename `gameData2` to `gameData`.

### --tests--

`tests/tic-tac-toe.ts` should have a `play` function that calls `await program.methods.play(tile).accounts({player: player.publicKey, game}).signers([player]).rpc();`

```js
assert.fail();
```

`tests/tic-tac-toe.ts` should have a `play` function that calls `const gameData = await program.account.game.fetch(game);`

```js
assert.fail();
```

`tests/tic-tac-toe.ts` should have a `play` function that asserts `gameData.turn === expectedTurn`.

```js
assert.fail();
```

`tests/tic-tac-toe.ts` should have a `play` function that asserts `gameData.state === expectedGameState`.

```js
assert.fail();
```

`tests/tic-tac-toe.ts` should have a `play` function that asserts `gameData.board === expectedBoard`.

```js
assert.fail();
```

## 46

### --description--

Back within the second `it` callback, use the `play` function to play that same move for `playerOne`.

### --tests--

`tests/tic-tac-toe.ts` should call `await play(program, gamePublicKey, playerOne, { row: 0, column: 0 }, 2, { active: {} }, [[{x:{}}, null, null], [null, null, null], [null, null, null]]);`.

```js
assert.fail();
```

## 47

### --description--

Run the tests to confirm everything is still working.

### --tests--

You should run `anchor test --skip-local-validator`.

```js
assert.fail();
```

The tests should pass ✅.

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

## 48

### --description--

Call the play function two more times. Once for player two at `{row: 1, column: 0}`, and once for player one at `{row: 0, column: 1}`.

### --tests--

`tests/tic-tac-toe.ts` should call `await play(program, gamePublicKey, playerTwo, {row:1,column:0}, 3, {active:{}}, [[{x:{}},null,null],[{o:{}},null,null],[null,null,null]]);`.

```js
assert.fail();
```

`tests/tic-tac-toe.ts` should call `await play(program, gamePublicKey, playerOne, {row:0,column:1}, 4, {active:{}}, [[{x:{}},{x:{}},null],[{o:{}},null,null],[null,null,null]]);`.

```js
assert.fail();
```

## 49

### --description--

Run the tests to confirm everything is still working.

### --tests--

You should run `anchor test --skip-local-validator`.

```js
assert.fail();
```

The tests should pass ✅.

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

## 50

### --description--

Call the play function two more times. Once for player two at `{row: 1, column: 1}`, and once for player one at `{row: 0, column: 2}`.

### --tests--

`tests/tic-tac-toe.ts` should call `await play(program, gamePublicKey, playerTwo, {row:1,column:1}, 5, {active:{}}, [[{x:{}},{x:{}},null],[{o:{}},{o:{}},null],[null,null,null]]);`.

```js
assert.fail();
```

`tests/tic-tac-toe.ts` should call `await play(program, gamePublicKey, playerOne, {row:0,column:2}, 5, {won:{winner:playerOne.publicKey}}, [[{x:{}},{x:{}},{x:{}}],[{o:{}},{o:{}},null],[null,null,null]]);`.

```js
assert.fail();
```

## 51

### --description--

Run the tests to confirm everything is still working.

### --tests--

You should run `anchor test --skip-local-validator`.

```js
assert.fail();
```

The tests should pass ✅.

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

## 52

### --description--

To test whether the `play` method correctly throws an error when a player tries to play out of turn, wrap a `play` call in a `try...catch` block.

The `try` should throw an error if the `play` call does not throw an error.

### --tests--

`tests/tic-tac-toe.ts` should have `await play(program, gamePublicKey, playerOne, {row:1,column:0}, 2, {acive:{}}, [[{x:{}},null,null],[null,null,null],[null,null,null]]);` in the `try` block.

```js
assert.fail();
```

`tests/tic-tac-toe.ts` should have a `try...catch` block that throws if `play` does not throw.

```js
assert.fail();
```

## 53

### --description--

Within the `describe` callback, create a new `it` call with a title of `"handles ties"`, and an asynchroneous callback.

### --tests--

`tests/tic-tac-toe.ts` should have a `describe` callback that calls `it` with a title of `"handles ties"`.

```js
assert.fail();
```

## 54

### --description--

Within the `"handles ties"` callback, set up a new game similarly to the previous tests, but with a `gameId` of `"game-3"`.

### --tests--

A `playerOne` variable should be declared and assigned `Keypair.generate()`.

```js
assert.fail();
```

A `playerTwo` variable should be declared and assigned `Keypair.generate()`.

```js
assert.fail();
```

A `gameId` variable should be declared and assigned `"game-3"`.

```js
assert.fail();
```

A `gamePublicKey` variable should be destructed from a `PublicKey.findProgramAddressSync` call.

```js
assert.fail();
```

An airdrop should be requested and confirmed for `playerOne`.

```js
assert.fail();
```

The `setupGame` method should be called on the program.

```js
assert.fail();
```

<!-- TODO: Add tie gameplay -->

## 55

### --description--

Within the `catch` block, assert the caught error is an instance of `AnchorError`.

### --tests--

`tests/tic-tac-toe.ts` should have a `catch` block that asserts `e instanceof AnchorError`.

```js
assert.fail();
```

`AnchorError` should be imported from `@coral-xyz/anchor`.

```js
assert.fail();
```

## 56

### --description--

Anchor deserializes any Rust enum annotated with `error_code` into a JavaScript object consisting of a numeric code, and a string name matching the pascalcase enum variant.

Within the `catch` block, assert the caught error has an `error.errorCode.code` property equal to `"NotPlayersTurn"`, and an `error.errorCode.number` property equal to `6003`.

### --tests--

`tests/tic-tac-toe.ts` should have a `catch` block that asserts `e.errorCode.code === "NotPlayersTurn"`.

```js
assert.fail();
```

`tests/tic-tac-toe.ts` should have a `catch` block that asserts `e.errorCode.number === 6003`.

```js
assert.fail();
```

## 57

### --description--

If you have multiple programs, or a function involves multiple program calls, the Anchor error also provides a `program` property, which is the program that threw the error.

Within the `catch` block, assert the program that threw the error is equal to `program.programId`.

### --tests--

`tests/tic-tac-toe.ts` should have a `catch` block that asserts `e.program === program.programId`.

```js
assert.fail();
```

## --fcc-end--
