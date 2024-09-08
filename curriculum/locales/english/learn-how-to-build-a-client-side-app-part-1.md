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

### --tests--

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

Within `web3.js`, export a named variable `PROGRAM_ID`, and set it to the public key of your program.

### --tests--

You should have `export const PROGRAM_ID = new PublicKey(...)`.

```js
const codeString = await __helpers.getFile(
  `${project.dashedName}/tic-tac-toe/app/web3.js`
);
const babelisedCode = new __helpers.Babeliser(codeString);
const actualCodeString = babelisedCode.generateCode(babelisedCode.parsedCode, {
  compact: true
});

const { stdout } = await __helpers.getCommandOutput(
  'anchor keys list',
  `${project.dashedName}/tic-tac-toe`
);
const expectedProgramId = stdout.match(/[^\s]{44}/)?.[0];
const expectedCodeStrings = [
  `export const PROGRAM_ID=new PublicKey('${expectedProgramId}');`,
  `export const PROGRAM_ID=new PublicKey("${expectedProgramId}");`
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

## 7

### --description--

Within `app/` use `yarn` to install `@solana/web3.js@1.78`.

### --tests--

You should install version `1.78` of the `@solana/web3.js` package.

```js
const packageJson = JSON.parse(
  await __helpers.getFile(
    join(project.dashedName, 'tic-tac-toe/app/package.json')
  )
);
assert.property(
  packageJson.dependencies,
  '@solana/web3.js',
  'The `package.json` file should have a `@solana/web3.js` dependency.'
);
assert.equal(
  packageJson.dependencies['@solana/web3.js'],
  '1.78',
  'Try running `yarn add @solana/web3.js@1.78` in the terminal.'
);
```

## 8

### --description--

Within `web3.js`, import the `PublicKey` class.

### --tests--

You should have `import { PublicKey } from "@solana/web3.js"`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === '@solana/web3.js';
});
assert.exists(importDeclaration, 'You should import from `@solana/web3.js`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(
  importSpecifiers,
  'PublicKey',
  '`PublicKey` should be imported from `@solana/web3.js`'
);
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
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const exportDeclaration = babelisedCode
  .getType('ExportNamedDeclaration')
  .find(e => {
    return e.declaration?.id?.name === 'connectWallet';
  });
assert.exists(exportDeclaration, 'You should export `connectWallet`');
```

## 10

### --description--

For your Tic-Tac-Toe program, the first transaction to build is the `setup_game` instruction.

Within, `web3.js`, export a named, async function `startGame`.

### --tests--

You should have `export async function startGame() {}`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const exportDeclaration = babelisedCode
  .getType('ExportNamedDeclaration')
  .find(e => {
    return e.declaration?.id?.name === 'startGame';
  });
assert.exists(exportDeclaration, 'You should export `startGame`');
assert.isTrue(exportDeclaration.declaration.async);
```

## 11

### --description--

Another transaction to build is the `play` instruction.

Within `web3.js`, export a named, async function `handlePlay` that expects an `id` argument.

### --tests--

You should have `export async function handlePlay(id) {}`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const exportDeclaration = babelisedCode
  .getType('ExportNamedDeclaration')
  .find(e => {
    return e.declaration?.id?.name === 'handlePlay';
  });
assert.exists(exportDeclaration, 'You should export `handlePlay`');
```

## 12

### --description--

In order to send transactions to the network, the client has to connect to the network.

Within `web3.js`, declare a variable named `connection`, and set it to connect with the default port of a local validator.

### --tests--

You should have `const connection = new Connection("http://localhost:8899")`.

```js
const connectionVariableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.declarations?.[0]?.id?.name === 'connection');
assert.exists(
  connectionVariableDeclaration,
  'You should declare a variable named `connection`'
);
const newExpression = connectionVariableDeclaration.declarations[0].init;
assert.equal(
  newExpression.callee.name,
  'Connection',
  'You should initialise `connection` with a new `Connection`'
);
assert.equal(
  newExpression.arguments[0].value,
  'http://localhost:8899',
  "You should create a new connection with `new Connection('http://localhost:8899')`"
);
```

You should import `Connection` from `@solana/web3.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === '@solana/web3.js';
});
assert.exists(importDeclaration, 'You should import from `@solana/web3.js`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(
  importSpecifiers,
  'Connection',
  '`Connection` should be imported from `@solana/web3.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 13

### --description--

Each program game state account requires a game id. This id is used to find the program address on the <dfn title="">ed25519 curve</dfn>.

Within `web3.js`, export a named function `deriveGamePublicKey` that expects two arguments: `playerOnePublicKey` and `gameId`.

### --tests--

You should have `export function deriveGamePublicKey(playerOnePublicKey, gameId) {}`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const exportDeclaration = babelisedCode
  .getType('ExportNamedDeclaration')
  .find(e => {
    return e.declaration?.id?.name === 'deriveGamePublicKey';
  });
assert.exists(exportDeclaration, 'You should export `deriveGamePublicKey`');
```

## 14

### --description--

Two players are required.

Within `tic-tac-toe/`, create two keypairs: `player-one.json` and `player-two.json`

### --tests--

You should have a `learn-how-to-build-a-client-side-app-part-1/tic-tac-toe/player-one.json` file.

```js
const { access, constants } = await import('fs/promises');
await access(
  join(project.dashedName, 'tic-tac-toe/player-one.json'),
  constants.F_OK
);
```

The `player-one.json` file should contain a valid keypair.

```js
const keyjson = JSON.parse(
  await __helpers.getFile(
    join(project.dashedName, 'tic-tac-toe/player-one.json')
  )
);
try {
  const { Keypair } = await import('@solana/web3.js');
  const keypair = Keypair.fromSecretKey(new Uint8Array(keyjson));
} catch (e) {
  assert.fail(
    `Try running \`solana-keygen new --outfile player-one.json\` in the \`tic-tac-toe\` directory:\n\n${JSON.stringify(
      e,
      null,
      2
    )}`
  );
}
```

You should have a `learn-how-to-build-a-client-side-app-part-1/tic-tac-toe/player-two.json` file.

```js
const { access, constants } = await import('fs/promises');
await access(
  join(project.dashedName, 'tic-tac-toe/player-two.json'),
  constants.F_OK
);
```

The `player-two.json` file should contain a valid keypair.

```js
const keyjson = JSON.parse(
  await __helpers.getFile(
    join(project.dashedName, 'tic-tac-toe/player-two.json')
  )
);
try {
  const { Keypair } = await import('@solana/web3.js');
  const keypair = Keypair.fromSecretKey(new Uint8Array(keyjson));
} catch (e) {
  assert.fail(
    `Try running \`solana-keygen new --outfile player-two.json\` in the \`tic-tac-toe\` directory:\n\n${JSON.stringify(
      e,
      null,
      2
    )}`
  );
}
```

## 15

### --description--

Within `app/`, run `yarn dev` in your terminal to serve your app. Open your browser to the localhost shown in the output.

Pay attention to the required inputs for the game.

### --tests--

You should have your app served at `http://localhost:5173`.

```js
const response = await fetch('http://localhost:5173');
assert.equal(response.status, 200, 'The server should be running.');
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
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'connectWallet');
assert.exists(
  functionDeclaration,
  'You should declare a function named `connectWallet`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});

const expectedCodeStrings = [
  `const keypairStr=sessionStorage.getItem('keypair');const keypairArr=JSON.parse(keypairStr);const uint8Arr=new Uint8Array(keypairArr);const keypair=Keypair.fromSecretKey(uint8Arr);`,
  `const keypairStr=sessionStorage.getItem("keypair");const keypairArr=JSON.parse(keypairStr);const uint8Arr=new Uint8Array(keypairArr);const keypair=Keypair.fromSecretKey(uint8Arr);`
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

You should import `Keypair` from `@solana/web3.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === '@solana/web3.js';
});
assert.exists(importDeclaration, 'You should import from `@solana/web3.js`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(
  importSpecifiers,
  'Keypair',
  '`Keypair` should be imported from `@solana/web3.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 17

### --description--

Typically, wallet vendors provide interfaces and plugins to interact with their wallet. For this project, a `Wallet` class is provided to simulate the wallet interface.

Within the `connectWallet` function, create a new `Wallet` instance assigned to a `wallet` variable.

### --tests--

You should have `const wallet = new Wallet(keypair);`.

```js
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'connectWallet');
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedString = `const wallet=new Wallet(keypair);`;
assert.include(actualCodeString, expectedString);
```

You should import `Wallet` from `./wallet.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === './wallet.js';
});
assert.exists(importDeclaration, 'You should import from `./wallet.js`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(
  importSpecifiers,
  'Wallet',
  '`Wallet` should be imported from `./wallet.js`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
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
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'connectWallet');
assert.exists(
  functionDeclaration,
  'You should declare a function named `connectWallet`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeString = `const provider=new AnchorProvider(connection,wallet,{});`;
assert.include(actualCodeString, expectedCodeString);
```

You should import `AnchorProvider` from `@coral-xyz/anchor`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === '@coral-xyz/anchor';
});
assert.exists(importDeclaration, 'You should import from `@coral-xyz/anchor`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(
  importSpecifiers,
  'AnchorProvider',
  '`AnchorProvider` should be imported from `@coral-xyz/anchor`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 19

### --description--

Install the `@coral-xyz/anchor@0.28` package.

### --tests--

You should install version `0.28` of the `@coral-xyz/anchor` package.

```js
const packageJson = JSON.parse(
  await __helpers.getFile(
    join(project.dashedName, 'tic-tac-toe/app/package.json')
  )
);
assert.property(
  packageJson.dependencies,
  '@coral-xyz/anchor',
  'The `package.json` file should have a `@coral-xyz/anchor` dependency.'
);
assert.equal(
  packageJson.dependencies['@coral-xyz/anchor'],
  '0.28',
  'Try running `yarn add @coral-xyz/anchor@0.28` in the terminal.'
);
```

## 20

### --description--

To tell Anchor which provider to use for all transactions, use the `setProvider` function from `@coral-xyz/anchor` and pass it the `provider` variable.

### --tests--

You should have `setProvider(provider)` within the `connectWallet` function.

```js
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'connectWallet');
assert.exists(
  functionDeclaration,
  'You should declare a function named `connectWallet`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeString = `setProvider(provider);`;
assert.include(actualCodeString, expectedCodeString);
```

You should import `setProvider` from `@coral-xyz/anchor`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === '@coral-xyz/anchor';
});
assert.exists(importDeclaration, 'You should import from `@coral-xyz/anchor`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(
  importSpecifiers,
  'setProvider',
  '`setProvider` should be imported from `@coral-xyz/anchor`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
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
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'connectWallet');
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedString = `const program=new Program(IDL,PROGRAM_ID,provider);`;
assert.include(actualCodeString, expectedString);
```

## 22

### --description--

Import the `IDL` generated by Anchor.

### --tests--

You should have `import { IDL } from "../target/types/tic_tac_toe";`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === '../target/types/tic_tac_toe';
});
assert.exists(importDeclaration, 'You should import from `../target/types`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(importSpecifiers, 'IDL', '`IDL` should be imported');
```

## 23

### --description--

To make the program available globally, attach it to the `window`.

### --tests--

You should have `window.program = program` in `connectWallet`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const actualCodeString = babelisedCode.generateCode(babelisedCode.parsedCode, {
  compact: true
});
const expectedCodeString = `window.program=program;`;
assert.include(actualCodeString, expectedCodeString);
```

## 24

### --description--

Now, within the `app/index.js` file, call the `connectWallet` function in the `connectWalletBtnEl` event listener callback at the indicated comment.

### --tests--

You should add `connectWallet()` below the `// TODO: Connect to wallet` comment.

```js
const callExpression = babelisedCode
  .getType('CallExpression')
  .find(c => c.callee.object.name === 'connectWalletBtnEl');
const tryStatementBlock = callExpression.arguments[1]?.body?.body?.find(
  s => s.type === 'TryStatement'
)?.block;
const actualCodeString = babelisedCode.generateCode(tryStatementBlock, {
  compact: true
});
const expectedCodeString = `connectWallet()`;
assert.include(actualCodeString, expectedCodeString);
```

You should import `connectWallet` from `./web3.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === './web3.js';
});
assert.exists(importDeclaration, 'You should import from `./web3.js`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(
  importSpecifiers,
  'connectWallet',
  '`connectWallet` should be imported'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/index.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 25

### --description--

Within the `startGame` function in `web3.js`, declare a `gameId` variable set to the `"gameId"` session storage item.

### --tests--

You should have `const gameId = sessionStorage.getItem("gameId");` within the `startGame` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);

const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'startGame');
assert.exists(
  functionDeclaration,
  'You should declare a function named `startGame`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeStrings = [
  `const gameId=sessionStorage.getItem("gameId")`,
  `const gameId=sessionStorage.getItem('gameId')`
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

## 26

### --description--

Within the `startGame` function, declare a `playerOnePublicKey` variable set to the PublicKey instance with the `"playerOnePublicKey"` session storage item passed as an argument.

### --tests--

You should have `const playerOnePublicKey = new PublicKey(sessionStorage.getItem("playerOnePublicKey"));` within the `startGame` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);

const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'startGame');
assert.exists(
  functionDeclaration,
  'You should declare a function named `startGame`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeStrings = [
  `const playerOnePublicKey=new PublicKey(sessionStorage.getItem("playerOnePublicKey"))`,
  `const playerOnePublicKey=new PublicKey(sessionStorage.getItem('playerOnePublicKey'))`
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

## 27

### --description--

Within the `startGame` function, declare a `playerTwoPublicKey` variable set to the PublicKey instance with the `"playerTwoPublicKey"` session storage item passed as an argument.

### --tests--

You should have `const playerTwoPublicKey = new PublicKey(sessionStorage.getItem("playerTwoPublicKey"));` within the `startGame` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);

const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'startGame');
assert.exists(
  functionDeclaration,
  'You should declare a function named `startGame`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeStrings = [
  `const playerTwoPublicKey=new PublicKey(sessionStorage.getItem("playerTwoPublicKey"))`,
  `const playerTwoPublicKey=new PublicKey(sessionStorage.getItem('playerTwoPublicKey'))`
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

## 28

### --description--

Within the `startGame` function, declare a `gamePublicKey` variable set to the result of calling the `deriveGamePublicKey` function with the `playerOnePublicKey` and `gameId` variables.

### --tests--

You should have `const gamePublicKey = await deriveGamePublicKey(playerOnePublicKey, gameId);` within the `startGame` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);

const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'startGame');
assert.exists(
  functionDeclaration,
  'You should declare a function named `startGame`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeStrings = [
  `const gamePublicKey=await deriveGamePublicKey(playerOnePublicKey,gameId)`,
  `const gamePublicKey=await deriveGamePublicKey(playerOnePublicKey,gameId)`
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

## 29

### --description--

Within the `startGame` function, set the `"gamePublicKey"` session storage item to the `gamePublicKey` variable value.

### --tests--

You should have `sessionStorage.setItem("gamePublicKey", gamePublicKey.toString());` within the `startGame` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);

const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'startGame');
assert.exists(
  functionDeclaration,
  'You should declare a function named `startGame`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeStrings = [
  `sessionStorage.setItem("gamePublicKey",gamePublicKey.toString())`,
  `sessionStorage.setItem('gamePublicKey',gamePublicKey.toString())`
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

## 30

### --description--

Within the `startGame` function, declare a `keypairStr` variable set to the `"keypair"` session storage item.

### --tests--

You should have `const keypairStr = sessionStorage.getItem("keypair");` within the `startGame` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);

const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'startGame');
assert.exists(
  functionDeclaration,
  'You should declare a function named `startGame`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeStrings = [
  `const keypairStr=sessionStorage.getItem("keypair")`,
  `const keypairStr=sessionStorage.getItem('keypair')`
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

## 31

### --description--

Within the `startGame` function, declare a `keypairArr` variable set to the result of calling `JSON.parse` with the `keypairStr` variable.

### --tests--

You should have `const keypairArr = JSON.parse(keypairStr);` within the `startGame` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);

const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'startGame');
assert.exists(
  functionDeclaration,
  'You should declare a function named `startGame`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeStrings = [
  `const keypairArr=JSON.parse(keypairStr)`,
  `const keypairArr=JSON.parse(keypairStr)`
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

## 32

### --description--

Within the `startGame` function, declare a `uint8Arr` variable set to a new `Uint8Array` with the `keypairArr` variable.

### --tests--

You should have `const uint8Arr = new Uint8Array(keypairArr);` within the `startGame` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);

const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'startGame');
assert.exists(
  functionDeclaration,
  'You should declare a function named `startGame`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeString = `const uint8Arr=new Uint8Array(keypairArr)`;
assert.include(actualCodeString, expectedCodeString);
```

## 33

### --description--

Within the `startGame` function, declare a `keypair` variable set to the result of calling `Keypair.fromSecretKey` with the `uint8Arr` variable.

### --tests--

You should have `const keypair = Keypair.fromSecretKey(uint8Arr);` within the `startGame` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);

const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'startGame');
assert.exists(
  functionDeclaration,
  'You should declare a function named `startGame`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeString = `const keypair=Keypair.fromSecretKey(uint8Arr)`;
assert.include(actualCodeString, expectedCodeString);
```

## 34

### --description--

Within the `startGame` function, call the `setupGame` instruction attaching the necessary accounts and signers.

### --tests--

You should have `await program.methods.setupGame(playerTwoPublicKey, gameId).accounts({ player:keypair.publicKey, game:gamePublicKey }).signers([keypair]).rpc()` within the `startGame` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);

const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'startGame');
assert.exists(
  functionDeclaration,
  'You should declare a function named `startGame`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeString = `await program.methods.setupGame(playerTwoPublicKey,gameId).accounts({player:keypair.publicKey,game:gamePublicKey}).signers([keypair]).rpc()`;
assert.include(actualCodeString, expectedCodeString);
```

## 35

### --description--

Deriving the public key requires converting the inputs to buffers. Also, the `@coral-xyz/anchor` internals make use of buffers for the transactions.

The browser does not have a Buffer class. Instead, you will need to install the `buffer` package, and attach it to the `window`.

Install the `buffer` package in the `app/` directory.

### --tests--

You should install the `buffer` package.

```js
const packageJson = JSON.parse(
  await __helpers.getFile(
    join(project.dashedName, 'tic-tac-toe/app/package.json')
  )
);
assert.property(
  packageJson.dependencies,
  'buffer',
  'The `package.json` file should have a `buffer` dependency.'
);
```

## 36

### --description--

Within the `web3.js` file, import the `Buffer` class named export from the `buffer` package.

### --tests--

You should have `import { Buffer } from "buffer";` within the `web3.js` file.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === 'buffer';
});
assert.exists(importDeclaration, 'You should import from `buffer`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(importSpecifiers, 'Buffer', '`Buffer` should be imported');
```

## 37

### --description--

Within the `web3.js` file, attach the `Buffer` class to the `window` using the same name.

### --tests--

You should have `window.Buffer = Buffer;` within the `web3.js` file.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
assert.match(codeString, /window\.Buffer\s*=\s*Buffer/);
```

## 38

### --description--

Within the `deriveGamePublicKey` function, use the `PublicKey.findProgramAddressSync` function to derive the game public key from the `playerOnePublicKey` and `gameId` parameters. Return the public key.

_Remember all the seeds defined for the `tic-tac-toe` program_

### --tests--

You should have `return PublicKey.findProgramAddressSync([Buffer.from("game"), playerOnePublicKey.toBuffer(), Buffer.from(gameId)], PROGRAM_ID)[0];` within the `deriveGamePublicKey` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'deriveGamePublicKey');
assert.exists(
  functionDeclaration,
  'You should declare a function named `deriveGamePublicKey`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeString = `return PublicKey.findProgramAddressSync([Buffer.from("game"),playerOnePublicKey.toBuffer(),Buffer.from(gameId)],PROGRAM_ID)[0]`;
assert.include(actualCodeString, expectedCodeString);
```

## 39

### --description--

Within `web3.js`, declare a an async `getGameAccount` function.

### --tests--

You should have `async function getGameAccount() {}` within the `web3.js` file.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
assert.match(
  codeString,
  /async\s+function\s+getGameAccount\s*\(\s*\)\s*\{\s*\}/
);
```

## 40

### --description--

Within the `getGameAccount` function, declare a `gamePublicKey` variable set to the `"gamePublicKey"` session storage item passed to the `PublicKey` constructor.

### --tests--

You should have `const gamePublicKey = new PublicKey(sessionStorage.getItem("gamePublicKey"));` within the `getGameAccount` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'getGameAccount');
assert.exists(
  functionDeclaration,
  'You should declare a function named `getGameAccount`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeStrings = [
  `const gamePublicKey=new PublicKey(sessionStorage.getItem("gamePublicKey"))`,
  `const gamePublicKey=new PublicKey(sessionStorage.getItem('gamePublicKey'))`
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

## 41

### --description--

Within the `getGameAccount` function, declare a `gameData` variable set to the result of awaiting a fetch to the `program` variable's `game` account.

### --tests--

You should have `const gameData = await program.account.game.fetch(gamePublicKey);` within the `getGameAccount` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'getGameAccount');
assert.exists(
  functionDeclaration,
  'You should declare a function named `getGameAccount`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeString = `const gameData=await program.account.game.fetch(gamePublicKey)`;
assert.include(actualCodeString, expectedCodeString);
```

## 42

### --description--

<!-- TODO: at end, add features of `turnEl.textContent = ... and playerTurnEl.textContent = ...` -->

Within the `getGameAccount` function, return the `gameData` variable.

### --tests--

You should have `return gameData;` within the `getGameAccount` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'getGameAccount');
assert.exists(
  functionDeclaration,
  'You should declare a function named `getGameAccount`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeString = `return gameData`;
assert.include(actualCodeString, expectedCodeString);
```

## 43

### --description--

Seeing as the game is played by multiple players, the client needs to have the latest game state.

Within the `web3.js` file, declare and export an async `updateBoard` function.

### --tests--

You should have `export async function updateBoard() {}` within the `web3.js` file.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
assert.match(
  codeString,
  /export\s+async\s+function\s+updateBoard\s*\(\s*\)\s*\{\s*\}/
);
```

## 44

### --description--

Within the `updateBoard` function, declare a `gameData` variable set to the result of calling the `getGameAccount` function.

### --tests--

You should have `const gameData = await getGameAccount();` within the `updateBoard` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'updateBoard');
assert.exists(
  functionDeclaration,
  'You should declare a function named `updateBoard`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeString = `const gameData=await getGameAccount()`;
assert.include(actualCodeString, expectedCodeString);
```

## 45

### --description--

Within the `updateBoard` function, declare a `board` variable set to the `gameData.board` property.

### --tests--

You should have `const board = gameData.board;` within the `updateBoard` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'updateBoard');
assert.exists(
  functionDeclaration,
  'You should declare a function named `updateBoard`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeString = `const board=gameData.board`;
assert.include(actualCodeString, expectedCodeString);
```

## 46

### --description--

A utility function has been provided that takes the `board` array, and sets the HTML elements to the correct values.

Within the `web3.js` file, import the `setTiles` function from `./utils.js`, and call it within the `updateBoard` function with the `board` variable.

### --tests--

You should have `setTiles(board);` within the `updateBoard` function.

```js
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'updateBoard');
assert.exists(
  functionDeclaration,
  'You should declare a function named `updateBoard`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeString = `setTiles(board)`;
assert.include(actualCodeString, expectedCodeString);
```

You should import `setTiles` from `./utils.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === './utils.js';
});
assert.exists(importDeclaration, 'You should import from `./utils.js`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(importSpecifiers, 'setTiles', '`setTiles` should be imported');
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 47

### --description--

At the end of the `startGame` function, call the `updateBoard` function to ensure after the play, the board is updated.

### --tests--

You should have `await updateBoard();` at the end of the `startGame` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'startGame');
assert.exists(
  functionDeclaration,
  'You should declare a function named `startGame`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeString = `await updateBoard()`;
assert.include(actualCodeString, expectedCodeString);
```

## 48

### --description--

Within the `index.js` file, in the `startGameBtnEl` event listener callback, call the `startGame` function at the indicated comment.

### --tests--

You should have `await startGame();` below `// TODO: Create a new game`.

```js
const callExpression = babelisedCode
  .getType('CallExpression')
  .find(c => c.callee?.object?.name === 'startGameBtnEl');
const tryStatementBlock = callExpression.arguments[1]?.body?.body?.find(
  s => s.type === 'TryStatement'
)?.block;
const actualCodeString = babelisedCode.generateCode(tryStatementBlock, {
  compact: true
});
const expectedCodeString = `await startGame()`;
assert.include(actualCodeString, expectedCodeString);
```

You should import `startGame` from `./web3.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === './web3.js';
});
assert.exists(importDeclaration, 'You should import from `./web3.js`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(importSpecifiers, 'startGame', '`startGame` should be imported');
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/index.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 49

### --description--

Within the `index.js` file, in the `joinGameBtnEl` event listener callback, call the `updateBoard` function at the indicated comment.

### --tests--

You should have `await updateBoard();` below `// TODO: Join an existing game`.

```js
const callExpression = babelisedCode
  .getType('CallExpression')
  .find(c => c.callee.object?.name === 'joinGameBtnEl');
const tryStatementBlock = callExpression.arguments[1]?.body?.body?.find(
  s => s.type === 'TryStatement'
)?.block;
const actualCodeString = babelisedCode.generateCode(tryStatementBlock, {
  compact: true
});
const expectedCodeString = `await updateBoard()`;
assert.include(actualCodeString, expectedCodeString);
```

You should import `updateBoard` from `./web3.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === './web3.js';
});
assert.exists(importDeclaration, 'You should import from `./web3.js`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(
  importSpecifiers,
  'updateBoard',
  '`updateBoard` should be imported'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/index.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 50

### --description--

Within the `index.js` file, in the `DOMContentLoaded` event listener callback, call the `updateBoard` function at the indicated comment only if the `"gamePublicKey"` session storage item and `program` exist.

### --tests--

You should have `if (program && sessionStorage.getItem("gamePublicKey")) {await updateBoard();}` below `// TODO: If program and gamePublicKey exist, update board`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/index.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const callExpression = babelisedCode
  .getType('CallExpression')
  .find(
    c =>
      c.callee.object?.name === 'document' &&
      c.callee.property?.name === 'addEventListener'
  );
const newBabelisedCode = new __helpers.Babeliser(
  babelisedCode.generateCode(callExpression)
);
const tryStatement = newBabelisedCode.getType('TryStatement')?.[0];
const tryStatementBlock = tryStatement.block;
const actualCodeString = babelisedCode.generateCode(tryStatementBlock, {
  compact: true
});
const expectedCodeStrings = [
  `if(program&&sessionStorage.getItem("gamePublicKey")){await updateBoard()`,
  `if(sessionStorage.getItem("gamePublicKey")&&program){await updateBoard()`
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

## 51

### --description--

Within `web3.js` initialize `window.program` to `null`.

### --tests--

You should have `window.program = null;` within the `web3.js` file.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
assert.match(codeString, /window\.program\s*=\s*null/);
```

## 52

### --description--

Within the `handlePlay` function in `web3.js`, use the utility function `idToTile` to convert the `id` parameter to a `tile` variable.

### --tests--

You should have `const tile = idToTile(id);` within the `handlePlay` function.

```js
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'handlePlay');
assert.exists(
  functionDeclaration,
  'You should declare a function named `handlePlay`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeString = `const tile=idToTile(id)`;
assert.include(actualCodeString, expectedCodeString);
```

You should import `idToTile` from `./utils.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === './utils.js';
});
assert.exists(importDeclaration, 'You should import from `./utils.js`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(importSpecifiers, 'idToTile', '`idToTile` should be imported');
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 53

### --description--

Within the `handlePlay` function, declare a `keypair` variable set to an instance of the correct `Keypair` value.

### --tests--

You should have `const keypair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(sessionStorage.getItem("keypair"))));` within the `handlePlay` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'handlePlay');
assert.exists(
  functionDeclaration,
  'You should declare a function named `handlePlay`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeStrings = [
  `const keypair=Keypair.fromSecretKey(new Uint8Array(JSON.parse(sessionStorage.getItem("keypair"))))`,
  `const keypair=Keypair.fromSecretKey(new Uint8Array(JSON.parse(sessionStorage.getItem('keypair'))))`
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

## 54

### --description--

Within the `handlePlay` function, declare a `gamePublicKey` variable set to the `"gamePublicKey"` session storage item passed to the `PublicKey` constructor.

### --tests--

You should have `const gamePublicKey = new PublicKey(sessionStorage.getItem("gamePublicKey"));` within the `handlePlay` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'handlePlay');
assert.exists(
  functionDeclaration,
  'You should declare a function named `handlePlay`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeString = `const gamePublicKey=new PublicKey(sessionStorage.getItem("gamePublicKey"))`;
assert.include(actualCodeString, expectedCodeString);
```

## 55

### --description--

Within the `handlePlay` function, call the `play` instruction attaching the necessary accounts and signers.

### --tests--

You should have `await program.methods.play(tile).accounts({ player: keypair.publicKey, game: gamePublicKey }).signers([keypair]).rpc();` within the `handlePlay` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'handlePlay');
assert.exists(
  functionDeclaration,
  'You should declare a function named `handlePlay`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeString = `await program.methods.play(tile).accounts({player:keypair.publicKey,game:gamePublicKey}).signers([keypair]).rpc()`;
assert.include(actualCodeString, expectedCodeString);
```

## 56

### --description--

Within the `handlePlay` function, call the `updateBoard` function.

### --tests--

You should have `await updateBoard();` within the `handlePlay` function.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const functionDeclaration = babelisedCode
  .getFunctionDeclarations()
  .find(f => f.id.name === 'handlePlay');
assert.exists(
  functionDeclaration,
  'You should declare a function named `handlePlay`'
);
const actualCodeString = babelisedCode.generateCode(functionDeclaration, {
  compact: true
});
const expectedCodeString = `await updateBoard()`;
assert.include(actualCodeString, expectedCodeString);
```

## 57

### --description--

Within the `index.js` file, in the `tdEl` event listener callback, call the `handlePlay` function at the indicated comment. Remember to pass in the `id` of the `tdEl` element.

### --tests--

You should have `await handlePlay(event.target.id);` below `// TODO: Play tile`.

```js
const callExpression = babelisedCode
  .getType('CallExpression')
  .find(c => c.callee.object?.name === 'tdEl');
const tryStatementBlock = callExpression.arguments[1]?.body?.body?.find(
  s => s.type === 'TryStatement'
)?.block;
const actualCodeString = babelisedCode.generateCode(tryStatementBlock, {
  compact: true
});
const expectedCodeString = `handlePlay(event.target.id)`;
assert.include(actualCodeString, expectedCodeString);
```

You should import `handlePlay` from `./web3.js`.

```js
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === './web3.js';
});
assert.exists(importDeclaration, 'You should import from `./web3.js`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(
  importSpecifiers,
  'handlePlay',
  '`handlePlay` should be imported'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'tic-tac-toe/app/index.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 58

### --description--

Start the Solana local validator, and deploy the tic-tac-toe program.

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

The tic-tac-toe program should be deployed.

```js
const command = `curl http://127.0.0.1:8899 -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getProgramAccounts",
    "params": [
      "BPFLoaderUpgradeab1e11111111111111111111111", {
        "encoding": "base64",
        "dataSlice": {
          "length": 0,
          "offset": 0
        }
      }
    ]
}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
const { stdout: keys } = await __helpers.getCommandOutput(
  'anchor keys list',
  `${project.dashedName}/tic-tac-toe`
);
const expectedProgramId = keys.match(/[^\s]{44}/)?.[0];
try {
  const jsonOut = JSON.parse(stdout);
  assert.exists(jsonOut.result.find(r => r.pubkey === expectedProgramId));
} catch (e) {
  assert.fail(
    e,
    `Try running \`solana-test-validator --bpf-program ${expectedProgramId} ./target/deploy/tic_tac_toe.so --reset\``
  );
}
```

## 59

### --description--

Start the Solana local validator, and initialize your two player accounts with funds.

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

The `player-one.json` account should have at least 1 SOL.

```js
const { stdout } = await __helpers.getCommandOutput(
  `solana balance ${project.dashedName}/tic-tac-toe/player-one.json`
);
const balance = stdout.trim()?.match(/\d+/)?.[0];
assert.isAtLeast(
  parseInt(balance),
  1,
  'Try running `solana airdrop 1 ./player-one.json` within `tic-tac-toe/`'
);
```

The `player-two.json` account should have at least 1 SOL.

```js
const { stdout } = await __helpers.getCommandOutput(
  `solana balance ${project.dashedName}/tic-tac-toe/player-two.json`
);
const balance = stdout.trim()?.match(/\d+/)?.[0];
assert.isAtLeast(
  parseInt(balance),
  1,
  'Try running `solana airdrop 1 ./player-one.json` within `tic-tac-toe/`'
);
```

## 60

### --description--

Then, opening your browser to the port your app is served on, you should now be able to play a game.

**NOTE:** Open one tab for each player, add the necessary keypairs, choose a game id, start a game with player one, join the game with player two, then start playing.

### --tests--

The `player-one.json` account should make at least one transaction.

```js
const { Connection, PublicKey } = await import('@solana/web3.js');
const connection = new Connection('http://localhost:8899', 'confirmed');

const { stdout } = await __helpers.getCommandOutput(
  `solana address -k ${project.dashedName}/tic-tac-toe/player-one.json`
);
const pubkey = new PublicKey(stdout.trim());
const transactions = await connection.getSignaturesForAddress(pubkey);
// 2 is used because the first transaction is likely an airdrop
assert.isAtLeast(transactions.length, 2, 'Try playing a game with player one');
```

The `player-two.json` account should make at least one transaction.

```js
const { Connection, PublicKey } = await import('@solana/web3.js');
const connection = new Connection('http://localhost:8899', 'confirmed');

const { stdout } = await __helpers.getCommandOutput(
  `solana address -k ${project.dashedName}/tic-tac-toe/player-two.json`
);
const pubkey = new PublicKey(stdout.trim());
const transactions = await connection.getSignaturesForAddress(pubkey);
// 2 is used because the first transaction is likely an airdrop
assert.isAtLeast(transactions.length, 2, 'Try playing a game with player one');
```

## 61

### --description--

Within `web3.js`, you create a new `Connection` with the default level of commitment, _confirmed_:

```js
new Connetion('http://localhost:8899', 'confirmed');
```

_Commitment_ refers to the level of confidence you have that a transaction will be included in a block. The higher the level of commitment, the longer it takes for a transaction to be confirmed.

Play different games changing the level of commitment to see what affect that has on the speed the board updates propagate.

Once you are done, enter `done` in the terminal.

### --tests--

You should enter `done` in the terminal

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 62

### --description--

Congratulations on finishing this project! Feel free to play with your code.

**Summary**

Interacting with your Anchor program in the browser involves:

- Building the program IDL
- Attaching `Buffer` to the `window`
- Connecting to a user's wallet
- Creating and settings the provider
- Defining your Anchor `Program`
- For apps involving shared state between multiple users, it is important to understand the required commitment level for a transaction

Minimal code example:

```javascript
import { AnchorProvider, Program, setProvider } from '@coral-xyz/anchor';
import { Connection, PublicKey } from '@solana/web3.js';
import { IDL } from '../path/to/program/idl';
import { Buffer } from 'buffer';

window.Buffer = Buffer;

const connection = new Connection('network', 'commitment');
const PROGRAM_ID = new PublicKey('program_publickey');

// Wallet is an interface defined by Anchor, but specific to different vendors
const wallet = new Wallet();
const provider = new AnchorProvider(connection, wallet, {});
setProvider(provider);
const program = new Program(IDL, PROGRAM_ID, provider);
```

🎆

Once you are done, enter `done` in the terminal.

### --tests--

You should enter `done` in the terminal

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## --fcc-end--
