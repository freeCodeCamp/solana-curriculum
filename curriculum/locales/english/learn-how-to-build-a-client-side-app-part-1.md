# Solana - Learn How to Build a Client-Side App: Part 1

## 1

### --description--

Previously, you built, tested, and deployed a Tic-Tac-Toe program. In this project, you will learn how to write a client-side application that interacts with your program API.

Open a new terminal, and cd into the `learn-how-to-build-a-client-side-app-part-1/tic-tac-toe/` directory.

### --tests--

You should be in the `learn-how-to-build-a-client-side-app-part-1/tic-tac-toe/` directory.

```js
const cwd = await __helpers.getLastCWD();
const dirRegex = new RegExp(`${project.dashedName}/tic-tac-toe/?$`);
assert.match(cwd, dirRegex);
```

## 2

### --description--

Add the correct program public key to the `programs/tic-tac-toe/src/lib.rs` and `Anchor.toml` files.

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

## 3

### --description--

Build the program.

### --tests

The program should successfully build.

```js
const { access, constants } = await import('fs/promises');
try {
  await access(
    `${project.dashedName}/tic-tac-toe/target/deploy/tic_tac_toe.so`,
    constants.F_OK
  );
} catch (e) {
  assert.fail(
    `Try running \`anchor build\` in the \`tic-tac-toe\` directory:\n\n${JSON.stringify(
      e,
      null,
      2
    )}`
  );
}
```

## 4

### --description--

You have been started out with boilerplate client-side code in the `app/` directory.

In the terminal, change into the `app/` directory.

### --tests--

Your current working directory should be `learn-how-to-build-a-client-side-app-part-1/tic-tac-toe/app/` directory.

```js
const cwd = await __helpers.getLastCWD();
const dirRegex = new RegExp(`${project.dashedName}/tic-tac-toe/app/?$`);
assert.match(cwd, dirRegex);
```

## 5

### --description--

Within `app/`, create a `web3.js` file for all of your Solana and Anchor code.

### --tests--

You should have a `learn-how-to-build-a-client-side-app-part-1/tic-tac-toe/app/web3.js` file.

```js
const { access, constants } = await import('fs/promises');
await access(join(project.dashedName, 'tic-tac-toe/app/web3.js'));
```

## 6

### --description--

Within `web3.js`, export a named variable `PROGRAM_OD`, and set it to the public key of your program.

### --tests--

You should have `export const PROGRAM_ID = new PublicKey(...)`.

```js

```

## 7

### --description--

Within `app/` use `yarn` to install `@solana/web3.js@1.78`.

### --tests--

You should install version `1.78` of the `@solana/web3.js` package.

```js

```

## 8

### --description--

Within `web3.js`, import the `PublicKey` class.

### --tests--

You should have `import { PublicKey } from "@solana/web3.js"`.

```js

```

## 9

### --description--

Generally, a browser-based client app follows the following workflow to interact with Solana programs:

1. Client connects to user wallet
2. Client builds a transaction
3. User signs the transaction
4. Client sends transaction to network

Within `web3.js`, export a named function `connectWallet`.

### --tests--

You should have `export function connectWallet() {}`.

```js

```

## 10

### --description--

For your Tic-Tac-Toe program, the first transaction to build is the `setup_game` instruction.

Within, `web3.js`, export a named function `startGame`.

### --tests--

You should have `export function startGame() {}`.

```js

```

## 11

### --description--

Another transaction to build is the `play` instruction.

Within `web3.js`, export a named function `handlePlay`.

### --tests--

You should have `export function handlePlay() {}`.

```js

```

## 12

### --description--

In order to send transactions to the network, the client has to connect to the network.

Within `web3.js`, declare a variable named `connection`, and set it to connect with the default port of a local validator.

### --tests--

You should have `const connection = new Connection("http://localhost:8899")`.

```js

```

You should import `Connection` from `@solana/web3.js`.

```js

```

## 13

### --description--

Each program game state account requires a game id. This id is used to find the program address on the <dfn title="">ed25519 curve</dfn>.

Within `web3.js`, export a named function `deriveGamePublicKey` that expects three arguments: `playerOnePublicKey`, `gameId`, and `programId`.

### --tests--

You should have `export function deriveGamePublicKey(playerOnePublicKey, gameId, programId) {}`.

```js

```

## 14

### --description--

Two players are required.

Within `tic-tac-toe/`, create two keypairs: `player-one.json` and `player-two.json`

### --tests--

You should have a `learn-how-to-build-a-client-side-app-part-1/tic-tac-toe/player-one.json` file.

```js

```

The `player-one.json` file should contain a valid keypair.

```js

```

You should have a `learn-how-to-build-a-client-side-app-part-1/tic-tac-toe/player-two.json` file.

```js

```

The `player-two.json` file should contain a valid keypair.

```js

```

## 15

### --description--

Within `app/`, run `yarn dev` in your terminal to serve your app. Open your browser to the localhost shown in the output.

Pay attention to the required inputs for the game.

### --tests--

You should have your app served at `http://localhost:5173`.

```js

```

## 16

### --description--

Typically, connecting to a wallet involves using browser API to connect to a wallet browser extension. _You will do this in the next project._

For this project, you will directly input the keypair array. For convienience, the UI includes the keypairs you created in the previous step for easy copy-pasting, which is then stored in the browser's session storage.

Within the `connectWallet` function, create a keypair from the session storage:

```js
const keypairStr = sessionStorage.getItem('keypair');
const keypairArr = JSON.parse(keypairStr);
const uint8Arr = new Uint8Array(keypairArr);
const keypair = Keypair.fromSecretKey(uint8Arr);
```

### --tests--

You should have the above code within the `connectWallet` function.

```js

```

You should import `Keypair` from `@solana/web3.js`.

```js

```

## 17

### --description--

Typically, wallet vendors provide interfaces and plugins to interact with their wallet. For this project, a `Wallet` class is provided to simulate the wallet interface.

Within the `connectWallet` function, create a new `Wallet` instance assigned to a `wallet` variable.

### --tests--

You should have `const wallet = new Wallet(keypair);`.

```js

```

## 18

### --description--

Anchor expects a `Provider` instance to be passed to the `Program` constructor. The `Provider` instance is used to sign transactions based on the provided wallet.

Within the `connectWallet` function, declare a `provider` variable set to:

```js
const provider = new AnchorProvider(connection, wallet, {});
```

**Note:** The empty `{}` options property prevents the default `AnchorProvider` options from being used which only work on Nodejs clients.

### --tests--

You should have the above code within the `connectWallet` function.

```js

```

You should import `AnchorProvider` from `@coral-xyz/anchor`.

```js

```

## 19

### --description--

Install the `@coral-xyz/anchor@0.28` package.

### --tests--

You should install version `0.28` of the `@coral-xyz/anchor` package.

```js

```

## 20

### --description--

To tell Anchor which provider to use for all transactions, use the `setProvider` function from `@coral-xyz/anchor` and pass it the `provider` variable.

### --tests--

You should have `setProvider(provider)` within the `connectWallet` function.

```js

```

You should import `setProvider` from `@coral-xyz/anchor`.

```js

```

## 21

### --description--

Within the `connectWallet` function, declare a `program` variable set to:

```js
new Program(IDL, PROGRAM_ID, provider);
```

### --tests--

You should have the above code within the `connectWallet` function.

```js

```

## 22

### --description--

Import the `IDL` generated by Anchor.

### --tests--

You should have `import { IDL } from "../target/types/tic_tac_toe";`.

```js

```

## 23

### --description--

To make the program available globally, attach it to the `window`.

### --tests--

You should have `window.program = program` in `connectWallet`.

```js

```

## 24

### --description--

Now, within the `app/index.js` file, call the `connectWallet` function in the `connectWalletBtnEl` event listener callback at the indicated comment.

### --tests--

## --fcc-end--
