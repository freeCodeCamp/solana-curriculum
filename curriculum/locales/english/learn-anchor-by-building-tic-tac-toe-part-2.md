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

At the top of the `it` callback, generate three new keypairs, and assign them to three new variables: `playerOne`, `playerTwo`, and `gameKeypair`.

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

The `gameKeypair` variable should be declared.

```js
assert.fail();
```

The `gameKeypair` variable should be assigned `Keypair.generate()`.

```js
assert.fail();
```

The `Keypair` class should be imported from `@solana/web3.js`.

```js
assert.fail();
```

## 6

### --description--

Pass the public key of `playerTwo` as an argument to the `setupGame` instruction call.

### --tests--

`tests/tic-tac-toe.ts` should have `const tx = await program.methods.setupGame(playerTwo.publicKey).rpc();`.

```js
assert.fail();
```

## 7

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

## 8

### --description--

Run the tests, using the local validator you just started:

```bash
anchor test --skip-local-validator
```

### --tests--

`anchor test` should error with `Error Code: TryingToInitPayerAsProgramAccount`.

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

## 9

### --description--

You called `setupGame` without passing in any accounts. So, Anchor tried to create the `game` account using the transaction payer - your local Solana wallet.

Chain a `.accounts` call to the `setupGame` call, and pass in:

```typescript
{
  game: gameKeypair.publicKey,
  playerOne: playerOne.publicKey,
}
```

### --tests--

`tests/tic-tac-toe.ts` should have `const tx = await program.methods.setupGame(playerTwo.publicKey).accounts({ game: gameKeypair.publicKey, playerOne: playerOne.publicKey }).rpc();`.

```js
assert.fail();
```

## 10

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

## 11

### --description--

Seeing as the `game` and `playerOne` accounts are mutated (e.g. funds taken for fees, data changed), these accounts need to sign the transaction.

Chain a `.signers` call to the `setupGame` call, and pass in an array of the `gameKeypair` and `playerOne` keypairs.

### --tests--

`tests/tic-tac-toe.ts` should have `const tx = await program.methods.setupGame(playerTwo.publicKey).accounts({ game: gameKeypair.publicKey, playerOne: playerOne.publicKey }).signers([gameKeypair, playerOne]).rpc();`.

```js
assert.fail();
```

## 12

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

## 13

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

## 14

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

## 15

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

## 16

### --description--

To clarify what is happening behind the scenes when Anchor calls your program, split your instruction and transaction up into two lines:

```typescript
const ix = program.methods.<PROGRAM_METHOD>(<PROGRAM_METHOD_ARGS>).accounts(<PROGRAM_METHOD_ACCOUNTS>).signers(<PROGRAM_METHOD_SIGNERS>);
await ix.rpc();
```

### --tests--

`tests/tic-tac-toe.ts` should have `const ix = program.methods.setupGame(playerTwo.publicKey).accounts({ game: gameKeypair.publicKey, playerOne: playerOne.publicKey }).signers([gameKeypair, playerOne]);`.

```js
assert.fail();
```

`tests/tic-tac-toe.ts` should have `await ix.rpc();`.

```js
assert.fail();
```

## 17

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

## 18

### --description--

After the transaction is sent, you can fetch an account's data to see if it was correctly set up:

```typescript
const accountData = await program.account.<ACCOUNT_NAME>.fetch(<ACCOUNT_PUBLIC_KEY>);
```

Declare a variable `gameData` and assign it the `game` account's data.

### --tests--

`tests/tic-tac-toe.ts` should have `const gameData = await program.account.game.fetch(gameKeypair.publicKey);`.

```js
assert.fail();
```

## 19

### --description--

Assert the `game` account has a `turn` property equal to `1`.

_Hint:_ The boilerplate created by Anchor comes with `chai.js`.

### --tests--

`tests/tic-tac-toe.ts` should throw if `gameData.turn !== 1`.

```js
assert.fail();
```

## 20

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

## 21

### --description--

Assert the `game` account has a `state` property equal to `active: {}`.

### --tests--

`tests/tic-tac-toe.ts` should throw if `gameData.state.active !== {}`.

```js
assert.fail();
```

## 22

### --description--

Assert the `game` account has a `board` property equal to a 3x3 array of `null` values.

### --tests--

`tests/tic-tac-toe.ts` should throw if `gameData.board !== [[null,null,null],[null,null,null],[null,null,null]]`.

```js
assert.fail();
```

## 23

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

## 24

### --description--

Run the tests again to see the error.

### --tests--

You should run `anchor test --skip-local-validator`.

```js
assert.fail();
```

The tests should fail ❌.

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

## 25

### --description--

One of the main benefits with PDAs is the owner is the program. So, it does not need to sign transactions mutating it within the owner program.

Remove the `gameKeypair` from the signers array.

### --tests--

`tests/tic-tac-toe.ts` should not have `gameKeypair` in the signers array.

```js
assert.fail();
```

## 26

### --description--

Run the tests again. You will see another error.

### --tests--

You should run `anchor test --skip-local-validator`.

```js
assert.fail();
```

The tests should fail ❌.

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

Anchor is failing the test, because you are passing in a public key for the `game` account that does not match the one generated by the program. You need to pass in the public key generated by the program.

Now, PDA's will make more sense - they can be <dfn title="You can generate the same public key before the program is initialized">repeatably, programmatically generated</dfn>:

```typescript
const [pda, bump] = PublicKey.findProgramAddressSync(
  [anchor.utils.bytes.utf8.encode(seed), publicKey.toBuffer()],
  program.programId
);
```

Remove the `gameKeypair` variable, destructure a variable `gamePublicKey` from `PublicKey.findProgramAddressSync`, using `"game"` and the payer's public key as seeds.

<!-- TODO: Change `lib.rs` to not use PDA from seeds and bump. Player can only play once as player_one -->

## --fcc-end--
