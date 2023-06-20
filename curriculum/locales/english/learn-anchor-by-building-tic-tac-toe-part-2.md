# Solana - Learn How to Test an Anchor Program: Part 2

## 1

### --description--

In the previous project, you used Anchor to create a program with instructions to play a game of Tic-Tac-Toe. This same program has been carried over as the boilerplate for this project.

Anchor automatically generated some test boilerplate for the `tic-tac-toe` program in the `tests/` directory. You will be mostly working in this directory.

Within a new terminal, change into the `tic-tac-toe` directory.

### --tests--

You should be in the `tic-tac-toe` directory.

```js
const cwd = await __helpers.getLastCWD();
const dirRegex = new RegExp(`${project.dashedName}/?$`);
assert.match(cwd, dirRegex);
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
const variableDeclaration = babelisedCode.getVariableDeclarations().find(v => {
  return v.declarations?.[0]?.id?.name === 'programProvider';
});
assert.exists(
  variableDeclaration,
  'A variable named `programProvider` should exist'
);
```

The `programProvider` variable should be assigned `program.provider as AnchorProvider`.

```js
const variableDeclaration = babelisedCode.getVariableDeclarations().find(v => {
  return v.declarations?.[0]?.id?.name === 'programProvider';
});
assert.exists(
  variableDeclaration,
  'A variable named `programProvider` should exist'
);
const tAsExpression = variableDeclaration.declarations?.[0]?.init;
const { object, property } = tAsExpression.expression;
assert.equal(
  object.name,
  'program',
  'The `programProvider` variable should be assigned `program.provider`'
);
assert.equal(
  property.name,
  'provider',
  'The `programProvider` variable should be assigned `program.provider`'
);
const tAnnotation = tAsExpression.typeAnnotation;
assert.equal(
  tAnnotation.typeName.name,
  'AnchorProvider',
  'The `programProvider` variable should be assigned `program.provider as AnchorProvider`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

### --seed--

#### --force--

#### --"learn-anchor-by-building-tic-tac-toe-part-2/tic-tac-toe/tests/tic-tac-toe.ts"--

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
const isFile = __helpers.fileExists(
  `${project.dashedName}/tic-tac-toe/target/types/tic_tac_toe.ts`
);
assert.isTrue(isFile);
```

## 4

### --description--

Within the `it` callback, change the `initialize` call to `setupGame`.

### --tests--

`tests/tic-tac-toe.ts` should have `const tx = await program.methods.setupGame().rpc();`.

```js
const memberExpression = babelisedCode.getType('MemberExpression').find(m => {
  return (
    m.object?.object?.name === 'program' &&
    m.object?.property?.name === 'methods'
  );
});
assert.exists(memberExpression, '`program.methods.` should exist');
const { property } = memberExpression;
assert.equal(
  property.name,
  'setupGame',
  '`program.methods.setupGame` should exist'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 5

### --description--

Now, you need to create the accounts to pass to the `setupGame` instruction handler.

At the top of the `it` callback, generate two new keypairs, and assign them to two new variables: `playerOne`, and `playerTwo`.

### --tests--

The `playerOne` variable should be declared.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclarationNames = blockStatement?.body?.map(v => {
  return v?.declarations?.[0]?.id?.name;
});
assert.include(
  variableDeclarationNames,
  'playerOne',
  'A variable named `playerOne` should exist'
);
```

The `playerOne` variable should be assigned `Keypair.generate()`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.name === 'playerOne';
});
assert.exists(variableDeclaration, 'A variable named `playerOne` should exist');
const memberExpression_playerOne =
  variableDeclaration.declarations?.[0]?.init?.callee;
const { property, object } = memberExpression_playerOne;
assert.equal(
  object.name,
  'Keypair',
  'The `playerOne` variable should be assigned `Keypair.generate()`'
);
assert.equal(
  property.name,
  'generate',
  'The `playerOne` variable should be assigned `Keypair.generate()`'
);
```

The `playerTwo` variable should be declared.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclarationNames = blockStatement?.body?.map(v => {
  return v?.declarations?.[0]?.id?.name;
});
assert.include(
  variableDeclarationNames,
  'playerTwo',
  'A variable named `playerTwo` should exist'
);
```

The `playerTwo` variable should be assigned `Keypair.generate()`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.name === 'playerTwo';
});
assert.exists(variableDeclaration, 'A variable named `playerTwo` should exist');
const memberExpression_playerTwo =
  variableDeclaration.declarations?.[0]?.init?.callee;
const { property, object } = memberExpression_playerTwo;
assert.equal(
  object.name,
  'Keypair',
  'The `playerTwo` variable should be assigned `Keypair.generate()`'
);
assert.equal(
  property.name,
  'generate',
  'The `playerTwo` variable should be assigned `Keypair.generate()`'
);
```

The `Keypair` class should be imported from `@solana/web3.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source?.value === '@solana/web3.js';
});
assert.exists(
  importDeclaration,
  'An import from `@solana/web3.js` should exist'
);

const specifierNames = importDeclaration.specifiers?.map(s => {
  return s?.local?.name;
});
assert.include(
  specifierNames,
  'Keypair',
  'The `Keypair` class should be imported from `@solana/web3.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 6

### --description--

Within the `it` callback, create a new `gameId` variable, and assign it a value of `"game-1"`.

### --tests--

The `gameId` variable should be declared.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclarationNames = blockStatement?.body?.map(v => {
  return v?.declarations?.[0]?.id?.name;
});
assert.include(
  variableDeclarationNames,
  'gameId',
  'A variable named `gameId` should exist'
);
```

The `gameId` variable should be assigned `"game-1"`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.name === 'gameId';
});
assert.exists(variableDeclaration, 'A variable named `gameId` should exist');
const { value } = variableDeclaration.declarations?.[0]?.init;
assert.equal(
  value,
  'game-1',
  'The `gameId` variable should be assigned `"game-1"`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
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

`tests/tic-tac-toe.ts` should have `const [gamePublicKey, _] = PublicKey.findProgramAddressSync([Buffer.from('game'), payer.publicKey.toBuffer(), Buffer.from(gameId)], program.programId);`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeString = `const[gamePublicKey,_]=PublicKey.findProgramAddressSync([Buffer.from('game'),payer.publicKey.toBuffer(),Buffer.from(gameId)],program.programId)`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 8

### --description--

Pass the public key of `playerTwo` as an argument to the `setupGame` instruction call.

### --tests--

`tests/tic-tac-toe.ts` should have `const tx = await program.methods.setupGame(playerTwo.publicKey).rpc();`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeString = `const tx=await program.methods.setupGame(playerTwo.publicKey).rpc()`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 9

### --description--

Pass `gameId` as the second argument to the `setupGame` instruction call.

### --tests--

`tests/tic-tac-toe.ts` should have `const tx = await program.methods.setupGame(playerTwo.publicKey, gameId).rpc();`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeString = `const tx=await program.methods.setupGame(playerTwo.publicKey,gameId).rpc()`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
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
const terminalOut = await __helpers.getTerminalOutput();
assert.include(terminalOut, 'Error: Invalid arguments: game not provided');
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
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeString = `const tx=await program.methods.setupGame(playerTwo.publicKey,gameId).accounts({game:gamePublicKey,playerOne:playerOne.publicKey}).rpc()`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 13

### --description--

Run the tests again.

### --tests--

You `anchor test --skip-local-validator` test should error with `Error: Signature verification failed`.

```js
const terminalOut = await __helpers.getTerminalOutput();
assert.include(terminalOut, 'Error: Signature verification failed');
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
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeString = `const tx=await program.methods.setupGame(playerTwo.publicKey,gameId).accounts({game:gamePublicKey,playerOne:playerOne.publicKey}).signers([playerOne]).rpc()`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 15

### --description--

Run the tests again.

### --tests--

The `anchor test --skip-local-validator` test should error with `Error: failed to send transaction`.

```js
const terminalOut = await __helpers.getTerminalOutput();
assert.include(terminalOut, 'Error: failed to send transaction');
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
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeStrings = [
  `const sg=await programProvider.connection.requestAirdrop(playerOne.publicKey,1_000_000_000)`,
  `const sg=await programProvider.connection.requestAirdrop(playerOne.publicKey,1000000000)`
];

const promises = expectedCodeStrings.map((expectedCodeString, index) => {
  return new Promise((resolve, reject) => {
    try {
      assert.include(actualCodeString, expectedCodeString);
      resolve(index + 1);
    } catch (e) {
      reject(e);
    }
  });
});

await Promise.any(promises);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
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
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeString = `await programProvider.connection.confirmTransaction(sg)`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 18

### --description--

Finally, run the tests again.

### --tests--

The `anchor test --skip-local-validator` tests should pass ✅.

```js
const terminalOutput = await __helpers.getTerminalOutput();
assert.include(terminalOutput, '1 passing');
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
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.name === 'tx';
});
assert.exists(variableDeclaration, 'A variable named `tx` should exist');
const actualCodeString = babelisedCode.generateCode(variableDeclaration, {
  compact: true
});
const expectedCodeString = `const ix=program.methods.setupGame(playerTwo.publicKey,gameId).accounts({game:gamePublicKey,playerOne:playerOne.publicKey}).signers([playerOne])`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

`tests/tic-tac-toe.ts` should have `await ix.rpc();`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeString = `await ix.rpc()`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 20

### --description--

Run the tests again to ensure everything still works.

### --tests--

The `anchor test --skip-local-validator` test should pass ✅.

```js
const terminalOutput = await __helpers.getTerminalOutput();
assert.include(terminalOutput, '1 passing');
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
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[0]?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.name === 'gameData';
});
assert.exists(variableDeclaration, 'A variable named `gameData` should exist');
const actualCodeString = babelisedCode.generateCode(variableDeclaration, {
  compact: true
});
const expectedCodeString = `const gameData=await program.account.game.fetch(gamePublicKey)`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 22

### --description--

Assert the `game` account has a `turn` property equal to `1`.

_Hint:_ The boilerplate created by Anchor comes with `chai.js`.

### --tests--

`tests/tic-tac-toe.ts` should throw if `gameData.turn !== 1`.

```js
// Get all code in the `it` callback
// Remove everything defined before `const gameData`, and remove the `gameData` declaration
// Eval with fixture `gameData`, `playerOne`, and `playerTwo`
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const ind = blockStatement?.body?.findIndex(v => {
  return v?.declarations?.[0]?.id?.name === 'gameData';
});
blockStatement?.body?.splice(0, ind + 1);
const assertionCodeString = babelisedCode.generateCode(blockStatement);

// Bring chai and `chai.expect` into scope for eval
const chai = await import('chai');
const { expect } = chai;
try {
  const gameData = {
    turn: 0
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
  assert(false, 'fcc');
} catch (e) {
  assert.notEqual(e.message, 'fcc', 'The `it` callback should throw');
  logover.debug(e);
}
try {
  await eval(`(async () => {
    const gameData= {
      turn: 1
    };
    ${assertionCodeString}
  })()`);
} catch (e) {
  assert.fail(e, 'The `it` callback should not throw');
}
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 23

### --description--

Assert the `game` account has a `players` property equal to an array of the public keys of `playerOne` and `playerTwo`.

### --tests--

`tests/tic-tac-toe.ts` should throw if `gameData.players[0] !== playerOne.publicKey`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[0]?.body;
const ind = blockStatement?.body?.findIndex(v => {
  return v?.declarations?.[0]?.id?.name === 'gameData';
});
blockStatement?.body?.splice(0, ind + 1);
const assertionCodeString = babelisedCode.generateCode(blockStatement);

// Bring chai and `chai.expect` into scope for eval
const chai = await import('chai');
const { expect } = chai;
try {
  const playerOne = { publicKey: 'playerOne' };
  const playerTwo = { publicKey: 'playerTwo' };
  const gameData = {
    turn: 1,
    players: ['notPlayerOne', playerTwo.publicKey]
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
  assert(false, 'fcc');
} catch (e) {
  assert.notEqual(e.message, 'fcc', 'The `it` callback should throw');
  logover.debug(e);
}
try {
  const playerOne = { publicKey: 'playerOne' };
  const playerTwo = { publicKey: 'playerTwo' };
  const gameData = {
    turn: 1,
    players: [playerOne.publicKey, playerTwo.publicKey]
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
} catch (e) {
  assert.fail(e, 'The `it` callback should not throw');
}
```

`tests/tic-tac-toe.ts` should throw if `gameData.players[1] !== playerTwo.publicKey`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[0]?.body;
const ind = blockStatement?.body?.findIndex(v => {
  return v?.declarations?.[0]?.id?.name === 'gameData';
});
blockStatement?.body?.splice(0, ind + 1);
const assertionCodeString = babelisedCode.generateCode(blockStatement);

// Bring chai and `chai.expect` into scope for eval
const chai = await import('chai');
const { expect } = chai;
try {
  const playerOne = { publicKey: 'playerOne' };
  const playerTwo = { publicKey: 'playerTwo' };
  const gameData = {
    turn: 1,
    players: [playerOne.publicKey, 'notPlayerOne']
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
  assert(false, 'fcc');
} catch (e) {
  assert.notEqual(e.message, 'fcc', 'The `it` callback should throw');
  logover.debug(e);
}
try {
  const playerOne = { publicKey: 'playerOne' };
  const playerTwo = { publicKey: 'playerTwo' };
  const gameData = {
    turn: 1,
    players: [playerOne.publicKey, playerTwo.publicKey]
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
} catch (e) {
  assert.fail(e, 'The `it` callback should not throw');
}
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 24

### --description--

Assert the `game` account has a `state` property equal to `active: {}`.

### --tests--

`tests/tic-tac-toe.ts` should throw if `gameData.state.active !== {}`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[0]?.body;
const ind = blockStatement?.body?.findIndex(v => {
  return v?.declarations?.[0]?.id?.name === 'gameData';
});
blockStatement?.body?.splice(0, ind + 1);
const assertionCodeString = babelisedCode.generateCode(blockStatement);

// Bring chai and `chai.expect` into scope for eval
const chai = await import('chai');
const { expect } = chai;
try {
  const playerOne = { publicKey: 'playerOne' };
  const playerTwo = { publicKey: 'playerTwo' };
  const gameData = {
    turn: 1,
    players: [playerOne.publicKey, playerTwo.publicKey],
    state: {
      active: ''
    }
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
  assert(false, 'fcc');
} catch (e) {
  assert.notEqual(
    e.message,
    'fcc',
    "The `it` callback should throw when `gameData.state.active == ''"
  );
  logover.debug(e);
}
try {
  const playerOne = { publicKey: 'playerOne' };
  const playerTwo = { publicKey: 'playerTwo' };
  const gameData = {
    turn: 1,
    players: [playerOne.publicKey, playerTwo.publicKey],
    state: {
      active: {}
    }
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
} catch (e) {
  assert.fail(
    e,
    'The `it` callback should not throw when `gameData.state.active == {}'
  );
}
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 25

### --description--

Assert the `game` account has a `board` property equal to a 3x3 array of `null` values.

### --tests--

`tests/tic-tac-toe.ts` should throw if `gameData.board !== [[null,null,null],[null,null,null],[null,null,null]]`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it';
});
const blockStatement = callExpression?.arguments?.[0]?.body;
const ind = blockStatement?.body?.findIndex(v => {
  return v?.declarations?.[0]?.id?.name === 'gameData';
});
blockStatement?.body?.splice(0, ind + 1);
const assertionCodeString = babelisedCode.generateCode(blockStatement);

// Bring chai and `chai.expect` into scope for eval
const chai = await import('chai');
const { expect } = chai;
try {
  const playerOne = { publicKey: 'playerOne' };
  const playerTwo = { publicKey: 'playerTwo' };
  const gameData = {
    turn: 1,
    players: [playerOne.publicKey, playerTwo.publicKey],
    state: {
      active: {}
    },
    board: [
      [false, null, null],
      [null, null, null],
      [null, null, null]
    ]
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
  assert(false, 'fcc');
} catch (e) {
  assert.notEqual(
    e.message,
    'fcc',
    'The `it` callback should throw when `gameData.state.board == [[false,null,null],[null,null,null],[null,null,null]]'
  );
  logover.debug(e);
}
try {
  const playerOne = { publicKey: 'playerOne' };
  const playerTwo = { publicKey: 'playerTwo' };
  const gameData = {
    turn: 1,
    players: [playerOne.publicKey, playerTwo.publicKey],
    state: {
      active: {}
    },
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
} catch (e) {
  assert.fail(
    e,
    'The `it` callback should not throw when `gameData.state.board == [[null,null,null],[null,null,null],[null,null,null]]'
  );
}
```

## 26

### --description--

Run the tests again to ensure everything still works.

### --tests--

The `anchor test --skip-local-validator` test should pass ✅.

```js
const terminalOutput = await __helpers.getTerminalOutput();
assert.include(terminalOutput, '1 passing');
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
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'describe';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeStrings = [
  `it('has player one win',async()=>{})`,
  `it("has player one win",async()=>{})`
];

const promises = expectedCodeStrings.map((expectedCodeString, index) => {
  return new Promise((resolve, reject) => {
    try {
      assert.include(actualCodeString, expectedCodeString);
      resolve(index + 1);
    } catch (e) {
      reject(e);
    }
  });
});

await Promise.any(promises);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 28

### --description--

Within the second `it` callback, generate two keypairs, and assign them to new variables `playerOne` and `playerTwo`.

### --tests--

`tests/tic-tac-toe.ts` should have `const playerOne = Keypair.generate();`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.name === 'playerOne';
});
assert.exists(variableDeclaration, 'A variable named `playerOne` should exist');
const actualCodeString = babelisedCode.generateCode(variableDeclaration, {
  compact: true
});
const expectedCodeString = `const playerOne=Keypair.generate()`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

`tests/tic-tac-toe.ts` should have `const playerTwo = Keypair.generate();`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.name === 'playerTwo';
});
assert.exists(variableDeclaration, 'A variable named `playerTwo` should exist');
const actualCodeString = babelisedCode.generateCode(variableDeclaration, {
  compact: true
});
const expectedCodeString = `const playerTwo=Keypair.generate()`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 29

### --description--

Declare a variable `gameId`, and assign `"game-2"` to it.

### --tests--

`tests/tic-tac-toe.ts` should have `const gameId = "game-2";`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.name === 'gameId';
});
assert.exists(variableDeclaration, 'A variable named `gameId` should exist');
const actualCodeString = babelisedCode.generateCode(variableDeclaration, {
  compact: true
});
const expectedCodeString = `const gameId="game-2"`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 30

### --description--

Destructure a `gamePublicKey` variable from deriving the program address.

### --tests--

`tests/tic-tac-toe.ts` should have `const [gamePublicKey] = await PublicKey.findProgramAddress([Buffer.from("game"),playerOne.publicKey.toBuffer(),Buffer.from(gameId)], program.programId);`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.elements?.[0]?.name === 'gamePublicKey';
});
assert.exists(
  variableDeclaration,
  'A variable named `gamePublicKey` should be destructured'
);
const awaitExpression = variableDeclaration?.declarations?.[0]?.init;
const actualCodeString = babelisedCode.generateCode(awaitExpression, {
  compact: true
});
const expectedCodeStrings = [
  `await PublicKey.findProgramAddress([Buffer.from("game"),playerOne.publicKey.toBuffer(),Buffer.from(gameId)],program.programId)`,
  `await PublicKey.findProgramAddress([Buffer.from('game'),playerOne.publicKey.toBuffer(),Buffer.from(gameId)],program.programId)`
];

const promises = expectedCodeStrings.map((expectedCodeString, index) => {
  return new Promise((resolve, reject) => {
    try {
      assert.include(actualCodeString, expectedCodeString);
      resolve(index + 1);
    } catch (e) {
      reject(e);
    }
  });
});

await Promise.any(promises);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 31

### --description--

Request an airdrop for the first player, and await confirmation.

### --tests--

`tests/tic-tac-toe.ts` should have `const sg = await programProvider.connection.requestAirdrop(playerOne.publicKey, 1_000_000_000)`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.name === 'sg';
});
assert.exists(variableDeclaration, 'A variable named `sg` should exist');
const actualCodeString = babelisedCode.generateCode(variableDeclaration, {
  compact: true
});
const expectedCodeStrings = [
  `const sg=await programProvider.connection.requestAirdrop(playerOne.publicKey,1_000_000_000)`,
  `const sg=await programProvider.connection.requestAirdrop(playerOne.publicKey,1000000000)`
];

const promises = expectedCodeStrings.map((expectedCodeString, index) => {
  return new Promise((resolve, reject) => {
    try {
      assert.include(actualCodeString, expectedCodeString);
      resolve(index + 1);
    } catch (e) {
      reject(e);
    }
  });
});

await Promise.any(promises);
```

`tests/tic-tac-toe.ts` should have `await programProvider.connection.confirmTransaction(sg);`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeString = `await programProvider.connection.confirmTransaction(sg)`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 32

### --description--

Call your program's `setupGame` method, passing in the required arguments, and adding the necessary accounts and signers.

### --tests--

`tests/tic-tac-toe.ts` should have `await program.methods.setupGame(playerTwo.publicKey, gameId).accounts({ game: gamePublicKey, playerOne: playerOne.publicKey }).signers([playerOne]).rpc();`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeString = `await program.methods.setupGame(playerTwo.publicKey,gameId).accounts({game:gamePublicKey,playerOne:playerOne.publicKey}).signers([playerOne]).rpc()`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 33

### --description--

Fetch the `game` account's data, and assign it to a variable `gameData`.

### --tests--

`tests/tic-tac-toe.ts` should have `const gameData = await program.account.game.fetch(gamePublicKey);`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.name === 'gameData';
});
assert.exists(variableDeclaration, 'A variable named `gameData` should exist');
const actualCodeString = babelisedCode.generateCode(variableDeclaration, {
  compact: true
});
const expectedCodeString = `const gameData=await program.account.game.fetch(gamePublicKey)`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 34

### --description--

Assert the `game` account has a `turn` property equal to `1`.

### --tests--

`tests/tic-tac-toe.ts` should throw if `gameData.turn !== 1`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const ind = blockStatement?.body?.findIndex(v => {
  return v?.declarations?.[0]?.id?.name === 'gameData';
});
blockStatement?.body?.splice(0, ind + 1);
const assertionCodeString = babelisedCode.generateCode(blockStatement);

// Bring chai and `chai.expect` into scope for eval
const chai = await import('chai');
const { expect } = chai;
try {
  const gameData = {
    turn: 0
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
  assert(false, 'fcc');
} catch (e) {
  assert.notEqual(e.message, 'fcc', 'The `it` callback should throw');
  logover.debug(e);
}
try {
  const gameData = {
    turn: 1
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
} catch (e) {
  assert.fail(e, 'The `it` callback should not throw');
}
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 35

### --description--

Now, to play a move, call the `play` method of your program. Pass in `{ row: 0, column: 0 }` as the tile to play.

### --tests--

`tests/tic-tac-toe.ts` should have `await program.methods.play({ row: 0, column: 0 });`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeStrings = [
  `await program.methods.play({row:0,column:0})`,
  `await program.methods.play({column:0,row:0})`
];

const promises = expectedCodeStrings.map((expectedCodeString, index) => {
  return new Promise((resolve, reject) => {
    try {
      assert.include(actualCodeString, expectedCodeString);
      resolve(index + 1);
    } catch (e) {
      reject(e);
    }
  });
});

await Promise.any(promises);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 36

### --description--

Off of the `play` method call, chain a call to `accounts`, passing in the `game` and correct `player` public keys.

### --tests--

`tests/tic-tac-toe.ts` should have `await program.methods.play({ row: 0, column: 0 }).accounts({ game: gamePublicKey, player: playerOne.publicKey });`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeStrings = [
  `await program.methods.play({row:0,column:0}).accounts({game:gamePublicKey,player:playerOne.publicKey})`,
  `await program.methods.play({column:0,row:0}).accounts({game:gamePublicKey,player:playerOne.publicKey})`,
  `await program.methods.play({row:0,column:0}).accounts({player:playerOne.publicKey,game:gamePublicKey})`,
  `await program.methods.play({column:0,row:0}).accounts({player:playerOne.publicKey,game:gamePublicKey})`
];

const promises = expectedCodeStrings.map((expectedCodeString, index) => {
  return new Promise((resolve, reject) => {
    try {
      assert.include(actualCodeString, expectedCodeString);
      resolve(index + 1);
    } catch (e) {
      reject(e);
    }
  });
});

await Promise.any(promises);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 37

### --description--

Off of the `accounts` method call, chain a call to `signers`, passing in the correct keypair.

### --tests--

`tests/tic-tac-toe.ts` should have `await program.methods.play({ row: 0, column: 0 }).accounts({ game: gamePublicKey, player: playerOne.publicKey }).signers([playerOne]);`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeStrings = [
  `await program.methods.play({row:0,column:0}).accounts({game:gamePublicKey,player:playerOne.publicKey}).signers([playerOne])`,
  `await program.methods.play({column:0,row:0}).accounts({game:gamePublicKey,player:playerOne.publicKey}).signers([playerOne])`,
  `await program.methods.play({row:0,column:0}).accounts({player:playerOne.publicKey,game:gamePublicKey}).signers([playerOne])`,
  `await program.methods.play({column:0,row:0}).accounts({player:playerOne.publicKey,game:gamePublicKey}).signers([playerOne])`
];

const promises = expectedCodeStrings.map((expectedCodeString, index) => {
  return new Promise((resolve, reject) => {
    try {
      assert.include(actualCodeString, expectedCodeString);
      resolve(index + 1);
    } catch (e) {
      reject(e);
    }
  });
});

await Promise.any(promises);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 38

### --description--

Off of the `signers` method call, chain the `rpc` method call in order to send the transaction to the network.

### --tests--

`tests/tic-tac-toe.ts` should have `await program.methods.play({ row: 0, column: 0 }).accounts({ game: gamePublicKey, player: playerOne.publicKey }).signers([playerOne]).rpc();`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const awaitExpression = callExpression?.arguments?.[1]?.body?.body?.[0];
const actualCodeString = babelisedCode.generateCode(awaitExpression, {
  compact: true
});
const expectedCodeStrings = [
  `await program.methods.play({row:0,column:0}).accounts({game:gamePublicKey,player:playerOne.publicKey}).signers([playerOne]).rpc()`,
  `await program.methods.play({column:0,row:0}).accounts({game:gamePublicKey,player:playerOne.publicKey}).signers([playerOne]).rpc()`,
  `await program.methods.play({row:0,column:0}).accounts({player:playerOne.publicKey,game:gamePublicKey}).signers([playerOne]).rpc()`,
  `await program.methods.play({column:0,row:0}).accounts({player:playerOne.publicKey,game:gamePublicKey}).signers([playerOne]).rpc()`
];

const promises = expectedCodeStrings.map((expectedCodeString, index) => {
  return new Promise((resolve, reject) => {
    try {
      assert.include(actualCodeString, expectedCodeString);
      resolve(index + 1);
    } catch (e) {
      reject(e);
    }
  });
});

await Promise.any(promises);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 39

### --description--

After the `play` method call, fetch the `game` account's data, and assign it to a variable `gameData2`.

### --tests--

`tests/tic-tac-toe.ts` should have `const gameData2 = await program.account.game.fetch(gamePublicKey);`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.name === 'gameData2';
});
assert.exists(variableDeclaration, 'A variable named `gameData2` should exist');
const actualCodeString = babelisedCode.generateCode(variableDeclaration, {
  compact: true
});
const expectedCodeString = `const gameData2=await program.account.game.fetch(gamePublicKey)`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 40

### --description--

Assert the `game` account has a `turn` property equal to `2`.

### --tests--

`tests/tic-tac-toe.ts` should throw if `gameData2.turn !== 2`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const ind = blockStatement?.body?.findIndex(v => {
  return v?.declarations?.[0]?.id?.name === 'gameData2';
});
blockStatement?.body?.splice(0, ind + 1);
const assertionCodeString = babelisedCode.generateCode(blockStatement);

// Bring chai and `chai.expect` into scope for eval
const chai = await import('chai');
const { expect } = chai;
try {
  const gameData2 = {
    turn: 1
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
  assert(false, 'fcc');
} catch (e) {
  assert.notEqual(e.message, 'fcc', 'The `it` callback should throw');
  logover.debug(e);
}
try {
  const gameData2 = {
    turn: 2
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
} catch (e) {
  assert.fail(e, 'The `it` callback should not throw');
}
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 41

### --description--

Assert the `game` account has a `board` property equal to `[[{x:{}}, null, null], [null, null, null], [null, null, null]]`.

**Note:** The Rust code uses an enum to denote `X` and `O` tiles. This is deserialized to a JavaScript object with a single key, `x` or `o`, depending on the tile. This is why the `x` tile is represented as `{x:{}}` in the assertion.

### --tests--

`tests/tic-tac-toe.ts` should throw if `gameData2.board !== [[{x:{}}, null, null], [null, null, null], [null, null, null]]`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const ind = blockStatement?.body?.findIndex(v => {
  return v?.declarations?.[0]?.id?.name === 'gameData2';
});
blockStatement?.body?.splice(0, ind + 1);
const assertionCodeString = babelisedCode.generateCode(blockStatement);

// Bring chai and `chai.expect` into scope for eval
const chai = await import('chai');
const { expect } = chai;
try {
  const gameData2 = {
    turn: 2,
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
  assert(false, 'fcc');
} catch (e) {
  assert.notEqual(e.message, 'fcc', 'The `it` callback should throw');
  logover.debug(e);
}
try {
  const gameData2 = {
    turn: 2,
    board: [
      [{ x: {} }, null, null],
      [null, null, null],
      [null, null, null]
    ]
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
} catch (e) {
  assert.fail(e, 'The `it` callback should not throw');
}
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 42

### --description--

Assert the `game` account has a `state` property equal to `{ active: {} }`.

### --tests--

`tests/tic-tac-toe.ts` should throw if `gameData2.state !== { active: {} }`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const ind = blockStatement?.body?.findIndex(v => {
  return v?.declarations?.[0]?.id?.name === 'gameData2';
});
blockStatement?.body?.splice(0, ind + 1);
const assertionCodeString = babelisedCode.generateCode(blockStatement);

// Bring chai and `chai.expect` into scope for eval
const chai = await import('chai');
const { expect } = chai;
try {
  const gameData2 = {
    turn: 2,
    board: [
      [{ x: {} }, null, null],
      [null, null, null],
      [null, null, null]
    ],
    state: { won: { winner: playerOne.publicKey } }
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
  assert(false, 'fcc');
} catch (e) {
  assert.notEqual(e.message, 'fcc', 'The `it` callback should throw');
  logover.debug(e);
}
try {
  const gameData2 = {
    turn: 2,
    board: [
      [{ x: {} }, null, null],
      [null, null, null],
      [null, null, null]
    ],
    state: { active: {} }
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
} catch (e) {
  assert.fail(e, 'The `it` callback should not throw');
}
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 43

### --description--

Run the tests to see if everything is working as expected.

### --tests--

The `anchor test --skip-local-validator` tests should pass ✅.

```js
const terminalOutput = await __helpers.getTerminalOutput();
assert.include(terminalOutput, '2 passing');
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
const functionDeclaration = babelisedCode
  .getType('FunctionDeclaration')
  .find(f => {
    return f?.id?.name === 'play';
  });
assert.exists(functionDeclaration, 'A function named `play` should exist');
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 45

### --description--

Cut the `play` call from the `it` block, and paste it into the `play` function, as well as the `fetch` call and subsequent assertions.

Change the arugments to use the `play` function parameters, and rename `gameData2` to `gameData`.

### --tests--

`tests/tic-tac-toe.ts` should have a `play` function that calls `await program.methods.play(tile).accounts({player: player.publicKey, game}).signers([player]).rpc();`

```js
const functionDeclaration = babelisedCode
  .getType('FunctionDeclaration')
  .find(f => {
    return f?.id?.name === 'play';
  });
const blockStatement = functionDeclaration?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeStrings = [
  `await program.methods.play(tile).accounts({player:player.publicKey,game}).signers([player]).rpc()`,
  `await program.methods.play(tile).accounts({game,player:player.publicKey}).signers([player]).rpc()`
];

const promises = expectedCodeStrings.map((expectedCodeString, index) => {
  return new Promise((resolve, reject) => {
    try {
      assert.include(actualCodeString, expectedCodeString);
      resolve(index + 1);
    } catch (e) {
      reject(e);
    }
  });
});

await Promise.any(promises);
```

`tests/tic-tac-toe.ts` should have a `play` function that calls `const gameData = await program.account.game.fetch(game);`

```js
const functionDeclaration = babelisedCode
  .getType('FunctionDeclaration')
  .find(f => {
    return f?.id?.name === 'play';
  });
const blockStatement = functionDeclaration?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.name === 'gameData';
});
assert.exists(variableDeclaration, 'A variable named `gameData` should exist');
const actualCodeString = babelisedCode.generateCode(variableDeclaration, {
  compact: true
});
const expectedCodeString = `const gameData=await program.account.game.fetch(game)`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

`tests/tic-tac-toe.ts` should have a `play` function that asserts `gameData.turn === expectedTurn`.

```js
const functionDeclaration = babelisedCode
  .getType('FunctionDeclaration')
  .find(f => {
    return f?.id?.name === 'play';
  });
const blockStatement = functionDeclaration?.body;
const ind = blockStatement?.body?.findIndex(v => {
  return v?.declarations?.[0]?.id?.name === 'gameData';
});
blockStatement?.body?.splice(0, ind + 1);
const assertionCodeString = babelisedCode.generateCode(blockStatement);

// Bring chai and `chai.expect` into scope for eval
const chai = await import('chai');
const { expect } = chai;
try {
  const expectedTurn = 1;
  const expectedGameState = { active: {} };
  const expectedBoard = [
    [{ x: {} }, null, null],
    [null, null, null],
    [null, null, null]
  ];
  const gameData = {
    turn: 0,
    board: expectedBoard,
    state: expectedGameState
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
  assert(false, 'fcc');
} catch (e) {
  assert.notEqual(e.message, 'fcc', 'The `it` callback should throw');
  logover.debug(e);
}
try {
  const expectedTurn = 1;
  const expectedGameState = { active: {} };
  const expectedBoard = [
    [{ x: {} }, null, null],
    [null, null, null],
    [null, null, null]
  ];
  const gameData = {
    turn: expectedTurn,
    board: expectedBoard,
    state: expectedGameState
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
} catch (e) {
  assert.fail(e, 'The `it` callback should not throw');
}
```

`tests/tic-tac-toe.ts` should have a `play` function that asserts `gameData.state === expectedGameState`.

```js
const functionDeclaration = babelisedCode
  .getType('FunctionDeclaration')
  .find(f => {
    return f?.id?.name === 'play';
  });
const blockStatement = functionDeclaration?.body;
const ind = blockStatement?.body?.findIndex(v => {
  return v?.declarations?.[0]?.id?.name === 'gameData';
});
blockStatement?.body?.splice(0, ind + 1);
const assertionCodeString = babelisedCode.generateCode(blockStatement);

// Bring chai and `chai.expect` into scope for eval
const chai = await import('chai');
const { expect } = chai;
try {
  const expectedTurn = 1;
  const expectedGameState = { won: { winner: playerOne.publicKey } };
  const expectedBoard = [
    [{ x: {} }, null, null],
    [null, null, null],
    [null, null, null]
  ];
  const gameData = {
    turn: expectedTurn,
    board: expectedBoard,
    state: { active: {} }
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
  assert(false, 'fcc');
} catch (e) {
  assert.notEqual(e.message, 'fcc', 'The `it` callback should throw');
  logover.debug(e);
}
try {
  const expectedTurn = 1;
  const expectedGameState = { active: {} };
  const expectedBoard = [
    [{ x: {} }, null, null],
    [null, null, null],
    [null, null, null]
  ];
  const gameData = {
    turn: expectedTurn,
    board: expectedBoard,
    state: expectedGameState
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
} catch (e) {
  assert.fail(e, 'The `it` callback should not throw');
}
```

`tests/tic-tac-toe.ts` should have a `play` function that asserts `gameData.board === expectedBoard`.

```js
const functionDeclaration = babelisedCode
  .getType('FunctionDeclaration')
  .find(f => {
    return f?.id?.name === 'play';
  });
const blockStatement = functionDeclaration?.body;
const ind = blockStatement?.body?.findIndex(v => {
  return v?.declarations?.[0]?.id?.name === 'gameData';
});
blockStatement?.body?.splice(0, ind + 1);
const assertionCodeString = babelisedCode.generateCode(blockStatement);

// Bring chai and `chai.expect` into scope for eval
const chai = await import('chai');
const { expect } = chai;
try {
  const expectedTurn = 1;
  const expectedGameState = { active: {} };
  const expectedBoard = [
    [{ x: {} }, null, null],
    [null, null, null],
    [null, null, null]
  ];
  const gameData = {
    turn: expectedTurn,
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ],
    state: expectedGameState
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
  assert(false, 'fcc');
} catch (e) {
  assert.notEqual(e.message, 'fcc', 'The `it` callback should throw');
  logover.debug(e);
}
try {
  const expectedTurn = 1;
  const expectedGameState = { active: {} };
  const expectedBoard = [
    [{ x: {} }, null, null],
    [null, null, null],
    [null, null, null]
  ];
  const gameData = {
    turn: expectedTurn,
    board: expectedBoard,
    state: expectedGameState
  };
  await eval(`(async () => {
    ${assertionCodeString}
  })()`);
} catch (e) {
  assert.fail(e, 'The `it` callback should not throw');
}
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 46

### --description--

Back within the second `it` callback, use the `play` function to play that same move for `playerOne`.

### --tests--

`tests/tic-tac-toe.ts` should call `await play(program, gamePublicKey, playerOne, { row: 0, column: 0 }, 2, { active: {} }, [[{x:{}}, null, null], [null, null, null], [null, null, null]]);`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeStrings = [
  `await play(program,gamePublicKey,playerOne,{row:0,column:0},2,{active:{}},[[{x:{}},null,null],[null,null,null],[null,null,null]])`,
  `await play(program,gamePublicKey,playerOne,{column:0,row:0},2,{active:{}},[[{x:{}},null,null],[null,null,null],[null,null,null]])`
];

const promises = expectedCodeStrings.map((expectedCodeString, index) => {
  return new Promise((resolve, reject) => {
    try {
      assert.include(actualCodeString, expectedCodeString);
      resolve(index + 1);
    } catch (e) {
      reject(e);
    }
  });
});

await Promise.any(promises);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 47

### --description--

Run the tests to confirm everything is still working.

### --tests--

The `anchor test --skip-local-validator` tests should pass ✅.

```js
const terminalOutput = await __helpers.getTerminalOutput();
assert.include(terminalOutput, '2 passing');
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
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeStrings = [
  `await play(program,gamePublicKey,playerTwo,{row:1,column:0},3,{active:{}},[[{x:{}},null,null],[{o:{}},null,null],[null,null,null]])`,
  `await play(program,gamePublicKey,playerTwo,{column:0,row:1},3,{active:{}},[[{x:{}},null,null],[{o:{}},null,null],[null,null,null]])`
];

const promises = expectedCodeStrings.map((expectedCodeString, index) => {
  return new Promise((resolve, reject) => {
    try {
      assert.include(actualCodeString, expectedCodeString);
      resolve(index + 1);
    } catch (e) {
      reject(e);
    }
  });
});

await Promise.any(promises);
```

`tests/tic-tac-toe.ts` should call `await play(program, gamePublicKey, playerOne, {row:0,column:1}, 4, {active:{}}, [[{x:{}},{x:{}},null],[{o:{}},null,null],[null,null,null]]);`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeStrings = [
  `await play(program,gamePublicKey,playerOne,{row:0,column:1},4,{active:{}},[[{x:{}},{x:{}},null],[{o:{}},null,null],[null,null,null]])`,
  `await play(program,gamePublicKey,playerOne,{column:1,row:0},4,{active:{}},[[{x:{}},{x:{}},null],[{o:{}},null,null],[null,null,null]])`
];

const promises = expectedCodeStrings.map((expectedCodeString, index) => {
  return new Promise((resolve, reject) => {
    try {
      assert.include(actualCodeString, expectedCodeString);
      resolve(index + 1);
    } catch (e) {
      reject(e);
    }
  });
});

await Promise.any(promises);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 49

### --description--

Run the tests to confirm everything is still working.

### --tests--

The `anchor test --skip-local-validator` tests should pass ✅.

```js
const terminalOutput = await __helpers.getTerminalOutput();
assert.include(terminalOutput, '2 passing');
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
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeStrings = [
  `await play(program,gamePublicKey,playerTwo,{row:1,column:1},5,{active:{}},[[{x:{}},{x:{}},null],[{o:{}},{o:{}},null],[null,null,null]])`,
  `await play(program,gamePublicKey,playerTwo,{column:1,row:1},5,{active:{}},[[{x:{}},{x:{}},null],[{o:{}},{o:{}},null],[null,null,null]])`
];

const promises = expectedCodeStrings.map((expectedCodeString, index) => {
  return new Promise((resolve, reject) => {
    try {
      assert.include(actualCodeString, expectedCodeString);
      resolve(index + 1);
    } catch (e) {
      reject(e);
    }
  });
});

await Promise.any(promises);
```

`tests/tic-tac-toe.ts` should call `await play(program, gamePublicKey, playerOne, {row:0,column:2}, 5, {won:{winner:playerOne.publicKey}}, [[{x:{}},{x:{}},{x:{}}],[{o:{}},{o:{}},null],[null,null,null]]);`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' && c.arguments?.[0]?.value === 'has player one win'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeStrings = [
  `await play(program,gamePublicKey,playerOne,{row:0,column:2},5,{won:{winner:playerOne.publicKey}},[[{x:{}},{x:{}},{x:{}}],[{o:{}},{o:{}},null],[null,null,null]])`,
  `await play(program,gamePublicKey,playerOne,{column:2,row:0},5,{won:{winner:playerOne.publicKey}},[[{x:{}},{x:{}},{x:{}}],[{o:{}},{o:{}},null],[null,null,null]])`
];

const promises = expectedCodeStrings.map((expectedCodeString, index) => {
  return new Promise((resolve, reject) => {
    try {
      assert.include(actualCodeString, expectedCodeString);
      resolve(index + 1);
    } catch (e) {
      reject(e);
    }
  });
});

await Promise.any(promises);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 51

### --description--

Run the tests to confirm everything is still working.

### --tests--

The `anchor test --skip-local-validator` tests should pass ✅.

```js
const terminalOutput = await __helpers.getTerminalOutput();
assert.include(terminalOutput, '2 passing');
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

Within the `describe` callback, create a new `it` call with a title of `"handles ties"`, and an asynchroneous callback.

### --tests--

`tests/tic-tac-toe.ts` should have a `describe` callback that calls `it` with a title of `"handles ties"`.

```js
const callExpressions = babelisedCode.getType('CallExpression').filter(c => {
  return c.callee?.name === 'it';
});
assert.include(
  callExpressions.map(c => c.arguments?.[0]?.value),
  'handles ties'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 53

### --description--

Within the `"handles ties"` callback, set up a new game similarly to the previous tests, but with a `gameId` of `"game-3"`.

### --tests--

A `playerOne` variable should be declared and assigned `Keypair.generate()`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it' && c.arguments?.[0]?.value === 'handles ties';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.name === 'playerOne';
});
assert.exists(variableDeclaration, 'A variable named `playerOne` should exist');
const actualCodeString = babelisedCode.generateCode(variableDeclaration, {
  compact: true
});
const expectedCodeString = `const playerOne=Keypair.generate()`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

A `playerTwo` variable should be declared and assigned `Keypair.generate()`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it' && c.arguments?.[0]?.value === 'handles ties';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.name === 'playerTwo';
});
assert.exists(variableDeclaration, 'A variable named `playerTwo` should exist');
const actualCodeString = babelisedCode.generateCode(variableDeclaration, {
  compact: true
});
const expectedCodeString = `const playerTwo=Keypair.generate()`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

A `gameId` variable should be declared and assigned `"game-3"`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it' && c.arguments?.[0]?.value === 'handles ties';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.name === 'gameId';
});
assert.exists(variableDeclaration, 'A variable named `gameId` should exist');
const actualCodeString = babelisedCode.generateCode(variableDeclaration, {
  compact: true
});
const expectedCodeString = `const gameId="game-3"`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

A `gamePublicKey` variable should be destructed from a `PublicKey.findProgramAddressSync` call.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it' && c.arguments?.[0]?.value === 'handles ties';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.elements?.[0]?.name === 'gamePublicKey';
});
assert.exists(
  variableDeclaration,
  'A variable named `gamePublicKey` should be destructured'
);
const awaitExpression = variableDeclaration?.declarations?.[0]?.init;
const actualCodeString = babelisedCode.generateCode(awaitExpression, {
  compact: true
});
const expectedCodeStrings = [
  `await PublicKey.findProgramAddress([Buffer.from("game"),playerOne.publicKey.toBuffer(),Buffer.from(gameId)],program.programId)`,
  `await PublicKey.findProgramAddress([Buffer.from('game'),playerOne.publicKey.toBuffer(),Buffer.from(gameId)],program.programId)`
];

const promises = expectedCodeStrings.map((expectedCodeString, index) => {
  return new Promise((resolve, reject) => {
    try {
      assert.include(actualCodeString, expectedCodeString);
      resolve(index + 1);
    } catch (e) {
      reject(e);
    }
  });
});

await Promise.any(promises);
```

An airdrop should be requested and confirmed for `playerOne`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it' && c.arguments?.[0]?.value === 'handles ties';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const babelisedCode2 = new __helpers.Babeliser(actualCodeString, {
  plugins: ['typescript']
});
const callExpression2 = babelisedCode2.getType('CallExpression').find(c => {
  return c.callee?.object?.object?.name === 'programProvider';
});
assert.exists(callExpression2, 'Airdrop should be requested for playerOne');
```

The `setupGame` method should be called on the program.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it' && c.arguments?.[0]?.value === 'handles ties';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeString = `await program.methods.setupGame(playerTwo.publicKey,gameId).accounts({game:gamePublicKey,playerOne:playerOne.publicKey}).signers([playerOne]).rpc()`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 54

### --description--

Within the `"handles ties"` callback, use the `play` function to play the game until the players tie each other.

### --tests--

The `"handles ties"` callback should all `play` until a tie.

```js
// Get all tile plays in `it` callback
// Compare to possible tie board states
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return c.callee?.name === 'it' && c.arguments?.[0]?.value === 'handles ties';
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const plays = blockStatement?.body?.filter(v => {
  return v.expression?.argument?.callee?.name === 'play';
});
const assertionCodeString = babelisedCode.generateCode({
  type: 'BlockStatement',
  body: plays,
  directives: []
});

let program,
  gamePublicKey,
  playerOne = 1,
  playerTwo = 2;
const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];
const play = (p, g, pl, tile) => {
  board[tile.row][tile.column] = pl;
};
await eval(`(async () => {${assertionCodeString}})()`);

function checkTie(board) {
  for (const row of board) {
    for (const column of row) {
      if (column === null) {
        return false;
      }
    }
  }

  for (let i = 0; i < board.length; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return false;
    }
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      return false;
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return false;
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return false;
    }
  }
  return true;
}

assert.isTrue(checkTie(board));
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 55

### --description--

Run the tests to confirm everything is still working.

### --tests--

The `anchor test --skip-local-validator` tests should pass ✅.

```js
const terminalOutput = await __helpers.getTerminalOutput();
assert.include(terminalOutput, '3 passing');
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

## 56

### --description--

Within the `describe` callback, create a new `it` call with a title of `"handles invalid plays"`, and an asynchroneous callback.

### --tests--

`tests/tic-tac-toe.ts` should have a `describe` callback that calls `it` with a title of `"handles invalid plays"`.

```js
const callExpressions = babelisedCode.getType('CallExpression').filter(c => {
  return c.callee?.name === 'it';
});
assert.include(
  callExpressions.map(c => c.arguments?.[0]?.value),
  'handles invalid plays'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 57

### --description--

Within the `"handles invalid plays"` callback, set up a new game similarly to the previous tests, but with a `gameId` of `"game-4"`.

### --tests--

A `playerOne` variable should be declared and assigned `Keypair.generate()`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.name === 'playerOne';
});
assert.exists(variableDeclaration, 'A variable named `playerOne` should exist');
const actualCodeString = babelisedCode.generateCode(variableDeclaration, {
  compact: true
});
const expectedCodeString = `const playerOne=Keypair.generate()`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

A `playerTwo` variable should be declared and assigned `Keypair.generate()`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.name === 'playerTwo';
});
assert.exists(variableDeclaration, 'A variable named `playerTwo` should exist');
const actualCodeString = babelisedCode.generateCode(variableDeclaration, {
  compact: true
});
const expectedCodeString = `const playerTwo=Keypair.generate()`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

A `gameId` variable should be declared and assigned `"game-4"`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.name === 'gameId';
});
assert.exists(variableDeclaration, 'A variable named `gameId` should exist');
const actualCodeString = babelisedCode.generateCode(variableDeclaration, {
  compact: true
});
const expectedCodeStrings = [`const gameId="game-4"`, `const gameId='game-4'`];

const promises = expectedCodeStrings.map((expectedCodeString, index) => {
  return new Promise((resolve, reject) => {
    try {
      assert.include(actualCodeString, expectedCodeString);
      resolve(index + 1);
    } catch (e) {
      reject(e);
    }
  });
});

await Promise.any(promises);
```

A `gamePublicKey` variable should be destructed from a `PublicKey.findProgramAddressSync` call.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const variableDeclaration = blockStatement?.body?.find(v => {
  return v?.declarations?.[0]?.id?.elements?.[0]?.name === 'gamePublicKey';
});
assert.exists(
  variableDeclaration,
  'A variable named `gamePublicKey` should be destructured'
);
const awaitExpression = variableDeclaration?.declarations?.[0]?.init;
const actualCodeString = babelisedCode.generateCode(awaitExpression, {
  compact: true
});
const expectedCodeStrings = [
  `await PublicKey.findProgramAddress([Buffer.from("game"),playerOne.publicKey.toBuffer(),Buffer.from(gameId)],program.programId)`,
  `await PublicKey.findProgramAddress([Buffer.from('game'),playerOne.publicKey.toBuffer(),Buffer.from(gameId)],program.programId)`
];

const promises = expectedCodeStrings.map((expectedCodeString, index) => {
  return new Promise((resolve, reject) => {
    try {
      assert.include(actualCodeString, expectedCodeString);
      resolve(index + 1);
    } catch (e) {
      reject(e);
    }
  });
});

await Promise.any(promises);
```

An airdrop should be requested and confirmed for `playerOne`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const babelisedCode2 = new __helpers.Babeliser(actualCodeString, {
  plugins: ['typescript']
});
const callExpression2 = babelisedCode2.getType('CallExpression').find(c => {
  return c.callee?.object?.object?.name === 'programProvider';
});
assert.exists(callExpression2, 'Airdrop should be requested for playerOne');
```

The `setupGame` method should be called on the program.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeString = `await program.methods.setupGame(playerTwo.publicKey,gameId).accounts({game:gamePublicKey,playerOne:playerOne.publicKey}).signers([playerOne]).rpc()`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 58

### --description--

Within the `"handles invalid plays"` callback, use the `play` function to have player one place an `X` in the top left corner.

### --tests--

`tests/tic-tac-toe.ts` should have `await play(program, gamePublicKey, playerOne, {row:1,column:0}, 2, {active:{}}, [[{x:{}},null,null],[null,null,null],[null,null,null]]);`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const actualCodeString = babelisedCode.generateCode(blockStatement, {
  compact: true
});
const expectedCodeStrings = [
  `await play(program,gamePublicKey,playerOne,{row:1,column:0},2,{active:{}},[[{x:{}},null,null],[null,null,null],[null,null,null]])`,
  `await play(program,gamePublicKey,playerOne,{column:0,row:1},2,{active:{}},[[{x:{}},null,null],[null,null,null],[null,null,null]])`
];

const promises = expectedCodeStrings.map((expectedCodeString, index) => {
  return new Promise((resolve, reject) => {
    try {
      assert.include(actualCodeString, expectedCodeString);
      resolve(index + 1);
    } catch (e) {
      reject(e);
    }
  });
});

await Promise.any(promises);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 59

### --description--

To test whether the `play` instruction handle correctly throws an error when a player tries to play out of turn, wrap a `play` call in a `try...catch` block.

The `try` should throw an error if the `play` call does not throw an error.

### --tests--

`tests/tic-tac-toe.ts` should have `await play(program, gamePublicKey, playerOne, {row:1,column:0}, 2, {active:{}}, [[{x:{}},null,null],[null,null,null],[null,null,null]]);` in the `try` block.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatement = blockStatement?.body?.find(v => {
  return v?.block?.type === 'TryStatement';
});
assert.exists(tryStatement, 'A try statement should exist');
const actualCodeString = babelisedCode.generateCode(tryStatement, {
  compact: true
});
const expectedCodeString = `try{await play(program,gamePublicKey,playerOne,{row:1,column:0},2,{active:{}},[[{x:{}},null,null],[null,null,null],[null,null,null]])}catch(e){}`;
assert.deepInclude(actualCodeString, expectedCodeString);
```

`tests/tic-tac-toe.ts` should have a `try` block that throws if `play` does not throw.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatement = blockStatement?.body?.find(v => {
  return v?.block?.type === 'TryStatement';
});
const tryBlock = tryStatement?.block;
const actualCodeString = babelisedCode.generateCode(tryBlock, {
  compact: true
});

const chai = await import('chai');
const { expect } = chai;
const play = () => {};
let program, gamePublicKey, playerOne, playerTwo;
try {
  await eval(`(async () => {
    ${actualCodeString}
  })()`);
  assert.fail('fcc');
} catch (e) {
  assert.notEqual(
    e.message,
    'fcc',
    'Try block should throw if `play` does not throw'
  );
}
```

## 60

### --description--

Within the `catch` block, assert the caught error is an instance of `AnchorError`.

### --tests--

`tests/tic-tac-toe.ts` should have a `catch` block that asserts `e instanceof AnchorError`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatement = blockStatement?.body?.find(v => {
  return v?.block?.type === 'TryStatement';
});
const catchBlock = tryStatement?.handler?.body;
const actualCodeString = babelisedCode.generateCode(catchBlock, {
  compact: true
});
const errorParameterName = tryStatement?.handler?.param?.name;

const chai = await import('chai');
const { expect } = chai;
class AnchorError {
  constructor() {
    this.error = {
      errorCode: {
        code: 'NotPlayersTurn',
        number: 6003
      },
      comparedValues: []
    };
  }
}
let program, playerOne, playerTwo;
let __error = new AnchorError();
try {
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
} catch (e) {
  assert.fail(e, 'Catch block should not throw with an `AnchorError`');
}
try {
  await eval(`(async () => {
    let ${errorParameterName} = ${'Not an AnchorError'};
  ${actualCodeString}
})()`);
  assert.fail('fcc');
} catch (e) {
  assert.notEqual(
    e.message,
    'fcc',
    'Catch block should throw without an `AnchorError`'
  );
}
```

`AnchorError` should be imported from `@coral-xyz/anchor`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source?.value === '@coral-xyz/anchor';
});
assert.exists(
  importDeclaration,
  'An import from `@coral-xyz/anchor` should exist'
);

const specifierNames = importDeclaration.specifiers?.map(s => {
  return s?.local?.name;
});
assert.include(
  specifierNames,
  'AnchorError',
  'The `Keypair` class should be imported from `@solana/web3.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 61

### --description--

Anchor deserializes any Rust enum annotated with `error_code` into a JavaScript object consisting of a numeric code, and a string name matching the pascalcase enum variant.

Within the `catch` block, assert the caught error has an `error.errorCode.code` property equal to `"NotPlayersTurn"`, and an `error.errorCode.number` property equal to `6003`.

### --tests--

`tests/tic-tac-toe.ts` should have a `catch` block that asserts `e.errorCode.code === "NotPlayersTurn"`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatement = blockStatement?.body?.find(v => {
  return v?.block?.type === 'TryStatement';
});
const catchBlock = tryStatement?.handler?.body;
const actualCodeString = babelisedCode.generateCode(catchBlock, {
  compact: true
});
const errorParameterName = tryStatement?.handler?.param?.name;

const chai = await import('chai');
const { expect } = chai;
class AnchorError {
  constructor() {
    this.error = {
      errorCode: {
        code: 'NotPlayersTurn',
        number: 6003
      },
      comparedValues: []
    };
  }
}
let program, playerOne, playerTwo;
let __error = new AnchorError();
try {
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
} catch (e) {
  assert.fail(e, 'Catch block should not throw');
}
try {
  __error.error.errorCode.code = 'fcc';
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
  assert.fail('fcc');
} catch (e) {
  assert.notEqual(e.message, 'fcc', 'Catch block should throw');
}
```

`tests/tic-tac-toe.ts` should have a `catch` block that asserts `e.errorCode.number === 6003`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatement = blockStatement?.body?.find(v => {
  return v?.block?.type === 'TryStatement';
});
const catchBlock = tryStatement?.handler?.body;
const actualCodeString = babelisedCode.generateCode(catchBlock, {
  compact: true
});
const errorParameterName = tryStatement?.handler?.param?.name;

const chai = await import('chai');
const { expect } = chai;
class AnchorError {
  constructor() {
    this.error = {
      errorCode: {
        code: 'NotPlayersTurn',
        number: 6003
      },
      comparedValues: []
    };
  }
}
let program, playerOne, playerTwo;
let __error = new AnchorError();
try {
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
} catch (e) {
  assert.fail(e, 'Catch block should not throw');
}
try {
  __error.error.errorCode.number = 6000;
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
  assert.fail('fcc');
} catch (e) {
  assert.notEqual(e.message, 'fcc', 'Catch block should throw');
}
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/tests/tic-tac-toe.ts`
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 62

### --description--

If you have multiple programs, or a function involves multiple program calls, the Anchor error also provides a `program` property, which is the program that threw the error.

Within the `catch` block, assert the program that threw the error is equal to `program.programId`.

### --tests--

`tests/tic-tac-toe.ts` should have a `catch` block that asserts `e.program === program.programId`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatement = blockStatement?.body?.find(v => {
  return v?.block?.type === 'TryStatement';
});
const catchBlock = tryStatement?.handler?.body;
const actualCodeString = babelisedCode.generateCode(catchBlock, {
  compact: true
});
const errorParameterName = tryStatement?.handler?.param?.name;

const chai = await import('chai');
const { expect } = chai;
class AnchorError {
  constructor() {
    this.error = {
      errorCode: {
        code: 'NotPlayersTurn',
        number: 6003
      },
      comparedValues: []
    };
    this.program = {
      programId: 1
    };
  }
}
let program = { programId: 1 },
  playerOne,
  playerTwo;
let __error = new AnchorError();
try {
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
} catch (e) {
  assert.fail(e, 'Catch block should not throw');
}
try {
  program.programId = 2;
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
  assert.fail('fcc');
} catch (e) {
  assert.notEqual(e.message, 'fcc', 'Catch block should throw');
}
```

## 63

### --description--

Within the `"handles invalid plays"` callback, add another `try...catch` block testing for the case where a player tries to play in a tile that is out of bounds.

### --tests--

The `"handles invalid plays"` callback should have a second `try...catch` block.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatements = blockStatement?.body?.filter(v => {
  return v?.block?.type === 'TryStatement';
});
const tryStatement2 = tryStatements?.[1];
assert.exists(tryStatement2);
```

The `try` block should call `play` with an invalid tile.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatements = blockStatement?.body?.filter(v => {
  return v?.block?.type === 'TryStatement';
});
const tryStatement2 = tryStatements?.[1];
assert.exists(tryStatement2, "A second `try...catch` block should exist");
const tryBlock = tryStatement2?.block;
const actualCodeString = babelisedCode.generateCode(tryBlock, {
  compact: true
});

const chai = await import('chai');
const { expect } = chai;
const play = (p,g,pl,t) => {
  const {row, column} = t;
  assert.exists(row, "`row` should exist);
  assert.exists(column, "`column` should exist");
  const isRowOut = row >= 3 || row < 0;
  const isColumnOut = column >= 3 || column < 0;
  assert(isRowOut || isColumnOut, "`row` and/or `column` should be out of bounds");
};
let program, gamePublicKey, playerOne, playerTwo;
await eval(`(async () => {
  ${actualCodeString}
})()`);
```

The `try` block should throw if the `play` call does not throw.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatements = blockStatement?.body?.filter(v => {
  return v?.block?.type === 'TryStatement';
});
const tryStatement2 = tryStatements?.[1];
assert.exists(tryStatement2, 'A second `try...catch` block should exist');
const tryBlock = tryStatement2?.block;
const actualCodeString = babelisedCode.generateCode(tryBlock, {
  compact: true
});

const chai = await import('chai');
const { expect } = chai;
const play = () => {};
let program, gamePublicKey, playerOne, playerTwo;
try {
  await eval(`(async () => {
    ${actualCodeString}
  })()`);
  assert.fail('fcc');
} catch (e) {
  assert.notEqual(
    e.message,
    'fcc',
    'The `try` block should throw, if `play` does not'
  );
}
```

The `catch` block should assert the error is an instance of `AnchorError`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatements = blockStatement?.body?.filter(v => {
  return v?.block?.type === 'TryStatement';
});
const tryStatement2 = tryStatements?.[1];
assert.exists(tryStatement2, 'A second `try...catch` block should exist');
const catchBlock = tryStatement2?.handler?.body;
const actualCodeString = babelisedCode.generateCode(catchBlock, {
  compact: true
});
const errorParameterName = tryStatement2?.handler?.param?.name;

const chai = await import('chai');
const { expect } = chai;
class AnchorError {
  constructor() {
    this.error = {
      errorCode: {
        code: 'TileOutOfBounds',
        number: 6000
      },
      comparedValues: []
    };
  }
}
let program, playerOne, playerTwo;
let __error = new AnchorError();
try {
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
} catch (e) {
  assert.fail(e, 'Catch block should not throw with an `AnchorError`');
}
try {
  await eval(`(async () => {
    let ${errorParameterName} = ${'Not an AnchorError'};
  ${actualCodeString}
})()`);
  assert.fail('fcc');
} catch (e) {
  assert.notEqual(
    e.message,
    'fcc',
    'Catch block should throw without an `AnchorError`'
  );
}
```

The `catch` block should assert the error has an `error.errorCode.number` property equal to `6000`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatements = blockStatement?.body?.filter(v => {
  return v?.block?.type === 'TryStatement';
});
const tryStatement2 = tryStatements?.[1];
assert.exists(tryStatement2, 'A second `try...catch` block should exist');
const catchBlock = tryStatement2?.handler?.body;
const actualCodeString = babelisedCode.generateCode(catchBlock, {
  compact: true
});
const errorParameterName = tryStatement2?.handler?.param?.name;

const chai = await import('chai');
const { expect } = chai;
class AnchorError {
  constructor() {
    this.error = {
      errorCode: {
        code: 'TileOutOfBounds',
        number: 6000
      },
      comparedValues: []
    };
  }
}
let program, playerOne, playerTwo;
let __error = new AnchorError();
try {
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
} catch (e) {
  assert.fail(e, 'Catch block should not throw');
}
try {
  __error.error.errorCode.number = 6003;
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
  assert.fail('fcc');
} catch (e) {
  assert.notEqual(e.message, 'fcc', 'Catch block should throw');
}
```

The `catch` block should assert the error has an `error.errorCode.code` property equal to `"TileOutOfBounds"`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatements = blockStatement?.body?.filter(v => {
  return v?.block?.type === 'TryStatement';
});
const tryStatement2 = tryStatements?.[1];
assert.exists(tryStatement2, 'A second `try...catch` block should exist');
const catchBlock = tryStatement2?.handler?.body;
const actualCodeString = babelisedCode.generateCode(catchBlock, {
  compact: true
});
const errorParameterName = tryStatement2?.handler?.param?.name;

const chai = await import('chai');
const { expect } = chai;
class AnchorError {
  constructor() {
    this.error = {
      errorCode: {
        code: 'TileOutOfBounds',
        number: 6000
      },
      comparedValues: []
    };
  }
}
let program, playerOne, playerTwo;
let __error = new AnchorError();
try {
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
} catch (e) {
  assert.fail(e, 'Catch block should not throw');
}
try {
  __error.error.errorCode.code = 'fcc';
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
  assert.fail('fcc');
} catch (e) {
  assert.notEqual(e.message, 'fcc', 'Catch block should throw');
}
```

## 64

### --description--

Within the `"handles invalid plays"` callback, add another `try...catch` block testing for the case where a player tries to play in a tile that is already occupied.

### --tests--

The `"handles invalid plays"` callback should have a third `try...catch` block.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatements = blockStatement?.body?.filter(v => {
  return v?.block?.type === 'TryStatement';
});
const tryStatement3 = tryStatements?.[2];
assert.exists(tryStatement3);
```

The `try` block should call `play` with a tile position that is already occupied.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatements = blockStatement?.body?.filter(v => {
  return v?.block?.type === 'TryStatement';
});
const tryStatement3 = tryStatements?.[2];
assert.exists(tryStatement3);
assert.exists(tryStatement3, "A third `try...catch` block should exist");
const tryBlock = tryStatement3?.block;
const actualCodeString = babelisedCode.generateCode(tryBlock, {
  compact: true
});

const chai = await import('chai');
const { expect } = chai;
const play = (p,g,pl,t) => {
  const {row, column} = t;
  assert.exists(row, "`row` should exist);
  assert.exists(column, "`column` should exist");
  const isRowOut = row === 0 || row  === 1;
  const isColumnOut = column === 0;
  assert(isRowOut && isColumnOut, "`row` and `column` should already be occupied");
};
let program, gamePublicKey, playerOne, playerTwo;
await eval(`(async () => {
  ${actualCodeString}
})()`);
```

The `try` block should throw if the `play` call does not throw.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatements = blockStatement?.body?.filter(v => {
  return v?.block?.type === 'TryStatement';
});
const tryStatement3 = tryStatements?.[2];
assert.exists(tryStatement3);
assert.exists(tryStatement3, 'A third `try...catch` block should exist');
const tryBlock = tryStatement3?.block;
const actualCodeString = babelisedCode.generateCode(tryBlock, {
  compact: true
});

const chai = await import('chai');
const { expect } = chai;
const play = () => {};
let program, gamePublicKey, playerOne, playerTwo;
try {
  await eval(`(async () => {
    ${actualCodeString}
  })()`);
  assert.fail('fcc');
} catch (e) {
  assert.notEqual(
    e.message,
    'fcc',
    'The `try` block should throw, if `play` does not'
  );
}
```

The `catch` block should assert the error is an instance of `AnchorError`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatements = blockStatement?.body?.filter(v => {
  return v?.block?.type === 'TryStatement';
});
const tryStatement3 = tryStatements?.[2];
const catchBlock = tryStatement3?.handler?.body;
const actualCodeString = babelisedCode.generateCode(catchBlock, {
  compact: true
});
const errorParameterName = tryStatement3?.handler?.param?.name;

const chai = await import('chai');
const { expect } = chai;
class AnchorError {
  constructor() {
    this.error = {
      errorCode: {
        code: 'TileAlreadySet',
        number: 6001
      },
      comparedValues: []
    };
  }
}
let program, playerOne, playerTwo;
let __error = new AnchorError();
try {
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
} catch (e) {
  assert.fail(e, 'Catch block should not throw with an `AnchorError`');
}
try {
  await eval(`(async () => {
    let ${errorParameterName} = ${'Not an AnchorError'};
  ${actualCodeString}
})()`);
  assert.fail('fcc');
} catch (e) {
  assert.notEqual(
    e.message,
    'fcc',
    'Catch block should throw without an `AnchorError`'
  );
}
```

The `catch` block should assert the error has an `error.errorCode.number` property equal to `6001`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatements = blockStatement?.body?.filter(v => {
  return v?.block?.type === 'TryStatement';
});
const tryStatement3 = tryStatements?.[2];
assert.exists(tryStatement3, 'A third `try...catch` block should exist');
const catchBlock = tryStatement3?.handler?.body;
const actualCodeString = babelisedCode.generateCode(catchBlock, {
  compact: true
});
const errorParameterName = tryStatement3?.handler?.param?.name;

const chai = await import('chai');
const { expect } = chai;
class AnchorError {
  constructor() {
    this.error = {
      errorCode: {
        code: 'TileAlreadySet',
        number: 6001
      },
      comparedValues: []
    };
  }
}
let program, playerOne, playerTwo;
let __error = new AnchorError();
try {
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
} catch (e) {
  assert.fail(e, 'Catch block should not throw');
}
try {
  __error.error.errorCode.number = 6003;
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
  assert.fail('fcc');
} catch (e) {
  assert.notEqual(e.message, 'fcc', 'Catch block should throw');
}
```

The `catch` block should assert the error has an `error.errorCode.code` property equal to `"TileAlreadySet"`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatements = blockStatement?.body?.filter(v => {
  return v?.block?.type === 'TryStatement';
});
const tryStatement3 = tryStatements?.[2];
assert.exists(tryStatement3, 'A third `try...catch` block should exist');
const catchBlock = tryStatement3?.handler?.body;
const actualCodeString = babelisedCode.generateCode(catchBlock, {
  compact: true
});
const errorParameterName = tryStatement3?.handler?.param?.name;

const chai = await import('chai');
const { expect } = chai;
class AnchorError {
  constructor() {
    this.error = {
      errorCode: {
        code: 'TileAlreadySet',
        number: 6001
      },
      comparedValues: []
    };
  }
}
let program, playerOne, playerTwo;
let __error = new AnchorError();
try {
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
} catch (e) {
  assert.fail(e, 'Catch block should not throw');
}
try {
  __error.error.errorCode.code = 'fcc';
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
  assert.fail('fcc');
} catch (e) {
  assert.notEqual(e.message, 'fcc', 'Catch block should throw');
}
```

## 65

### --description--

Within the `"handles invalid plays"` callback, call the `play` function as many times as necessary to have a player win the game.

### --tests--

All `play` calls outwith `try...catch` blocks should result in a win.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const plays = blockStatement?.body?.filter(v => {
  return v.expression?.argument?.callee?.name === 'play';
});
const assertionCodeString = babelisedCode.generateCode({
  type: 'BlockStatement',
  body: plays,
  directives: []
});

let program,
  gamePublicKey,
  playerOne = 1,
  playerTwo = 4;
const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];
const play = (p, g, pl, tile) => {
  board[tile.row][tile.column] = pl;
};
await eval(`(async () => {${assertionCodeString}})()`);

function checkWin(board) {
  // All rows
  board.forEach(r => {
    const rowSum = r.reduce((acc, curr) => curr && acc + curr, 0);
    if (rowSum === playerOne * 3 || rowSum === playerTwo * 3) {
      return true;
    }
  });
  // All columns
  for (let i = 0; i < board.length; i++) {
    const columnSum = board[0][i] + board[1][i] + board[2][i];
    if (columnSum === playerOne * 3 || columnSum === playerTwo * 3) {
      return true;
    }
  }

  for (let i = 0; i < board.length; i++) {
    if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
      return true;
    }
    if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
      return true;
    }
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      return true;
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      return true;
    }
  }
  return false;
}

assert.isTrue(checkWin(board), `Found board of: ${JSON.stringify(board)}`);
```

## 66

### --description--

Within the `"handles invalid plays"` callback, add another `try...catch` block testing for the case where a player tries to play after the game is over.

### --tests--

The `"handles invalid plays"` callback should have a fourth `try...catch` block.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatements = blockStatement?.body?.filter(v => {
  return v?.block?.type === 'TryStatement';
});
const tryStatement4 = tryStatements?.[3];
assert.exists(tryStatement4);
```

The `try` block should call `play` after the game is over.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatements = blockStatement?.body?.filter(v => {
  return v?.block?.type === 'TryStatement';
});
const tryStatement4 = tryStatements?.[3];
assert.exists(tryStatement4);
assert.exists(tryStatement4, "A fourth `try...catch` block should exist");
const tryBlock = tryStatement4?.block;
const actualCodeString = babelisedCode.generateCode(tryBlock, {
  compact: true
});

const chai = await import('chai');
const { expect } = chai;
const play = (p,g,pl,t) => {
  const {row, column} = t;
  assert.exists(row, "`row` should exist);
  assert.exists(column, "`column` should exist");
};
let program, gamePublicKey, playerOne, playerTwo;
await eval(`(async () => {
  ${actualCodeString}
})()`);
```

The `try` block should throw if the `play` call does not throw.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatements = blockStatement?.body?.filter(v => {
  return v?.block?.type === 'TryStatement';
});
const tryStatement4 = tryStatements?.[3];
assert.exists(tryStatement4);
assert.exists(tryStatement4, 'A fourth `try...catch` block should exist');
const tryBlock = tryStatement4?.block;
const actualCodeString = babelisedCode.generateCode(tryBlock, {
  compact: true
});

const chai = await import('chai');
const { expect } = chai;
const play = () => {};
let program, gamePublicKey, playerOne, playerTwo;
try {
  await eval(`(async () => {
    ${actualCodeString}
  })()`);
  assert.fail('fcc');
} catch (e) {
  assert.notEqual(
    e.message,
    'fcc',
    'The `try` block should throw, if `play` does not'
  );
}
```

The `catch` block should assert the error is an instance of `AnchorError`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatements = blockStatement?.body?.filter(v => {
  return v?.block?.type === 'TryStatement';
});
const tryStatement4 = tryStatements?.[3];
const catchBlock = tryStatement4?.handler?.body;
const actualCodeString = babelisedCode.generateCode(catchBlock, {
  compact: true
});
const errorParameterName = tryStatement4?.handler?.param?.name;

const chai = await import('chai');
const { expect } = chai;
class AnchorError {
  constructor() {
    this.error = {
      errorCode: {
        code: 'TileAlreadySet',
        number: 6001
      },
      comparedValues: []
    };
  }
}
let program, playerOne, playerTwo;
let __error = new AnchorError();
try {
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
} catch (e) {
  assert.fail(e, 'Catch block should not throw with an `AnchorError`');
}
try {
  await eval(`(async () => {
    let ${errorParameterName} = ${'Not an AnchorError'};
  ${actualCodeString}
})()`);
  assert.fail('fcc');
} catch (e) {
  assert.notEqual(
    e.message,
    'fcc',
    'Catch block should throw without an `AnchorError`'
  );
}
```

The `catch` block should assert the error has an `error.errorCode.number` property equal to `6002`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatements = blockStatement?.body?.filter(v => {
  return v?.block?.type === 'TryStatement';
});
const tryStatement4 = tryStatements?.[3];
assert.exists(tryStatement4, 'A fourth `try...catch` block should exist');
const catchBlock = tryStatement4?.handler?.body;
const actualCodeString = babelisedCode.generateCode(catchBlock, {
  compact: true
});
const errorParameterName = tryStatement4?.handler?.param?.name;

const chai = await import('chai');
const { expect } = chai;
class AnchorError {
  constructor() {
    this.error = {
      errorCode: {
        code: 'GameAlreadyOver',
        number: 6002
      },
      comparedValues: []
    };
  }
}
let program, playerOne, playerTwo;
let __error = new AnchorError();
try {
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
} catch (e) {
  assert.fail(e, 'Catch block should not throw');
}
try {
  __error.error.errorCode.number = 6003;
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
  assert.fail('fcc');
} catch (e) {
  assert.notEqual(e.message, 'fcc', 'Catch block should throw');
}
```

The `catch` block should assert the error has an `error.errorCode.code` property equal to `"GameAlreadyOver"`.

```js
const callExpression = babelisedCode.getType('CallExpression').find(c => {
  return (
    c.callee?.name === 'it' &&
    c.arguments?.[0]?.value === 'handles invalid plays'
  );
});
const blockStatement = callExpression?.arguments?.[1]?.body;
const tryStatements = blockStatement?.body?.filter(v => {
  return v?.block?.type === 'TryStatement';
});
const tryStatement4 = tryStatements?.[3];
assert.exists(tryStatement4, 'A fourth `try...catch` block should exist');
const catchBlock = tryStatement4?.handler?.body;
const actualCodeString = babelisedCode.generateCode(catchBlock, {
  compact: true
});
const errorParameterName = tryStatement4?.handler?.param?.name;

const chai = await import('chai');
const { expect } = chai;
class AnchorError {
  constructor() {
    this.error = {
      errorCode: {
        code: 'GameAlreadyOver',
        number: 6002
      },
      comparedValues: []
    };
  }
}
let program, playerOne, playerTwo;
let __error = new AnchorError();
try {
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
} catch (e) {
  assert.fail(e, 'Catch block should not throw');
}
try {
  __error.error.errorCode.code = 'fcc';
  await eval(`(async () => {
    let ${errorParameterName} = ${__error};
  ${actualCodeString}
})()`);
  assert.fail('fcc');
} catch (e) {
  assert.notEqual(e.message, 'fcc', 'Catch block should throw');
}
```

## 67

### --description--

**Summary**

- The Anchor `workspace` contains all the programs in your project
- Each program has a `methods` property containing all the program's instructions
  - The `accounts` method is used to pass in all the required public keys for the chained instruction
  - The `signers` method is used to pass in all the keypairs for the chained instruction
  - The `rpc` method sends the transaction to the Solana cluster
- Each program has an `account` property containing all the program's accounts
  - An account's data can be fetched with: `program.account.<ACCOUNT_NAME>.fetch(<ACCOUNT_PUBKEY>)`
- Program Derived Addresses are used to programmatically generate a public key for an account
  - The `PublicKey.findProgramAddressSync` method can be used to derive a PDA

🎆

Once you are done, enter `done` in the terminal.

### --tests--

You should enter `done` in the terminal

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## --fcc-end--
