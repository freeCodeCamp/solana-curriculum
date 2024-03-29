# Solana - Learn How to Build a Client-Side App: Part 2

## 1

### --description--

In this project, you will learn how to use the Phantom wallet browser extension to connect to your local validator, connect your wallet to a dApp, and sign transactions.

Change into the `learn-how-to-build-a-client-side-app-part-2/` directory in a new terminal.

### --tests--

You should be in the `learn-how-to-build-a-client-side-app-part-2/` directory.

```js
const cwd = await __helpers.getLastCWD();
const dirRegex = new RegExp(`${project.dashedName}/?$`);
assert.match(cwd, dirRegex);
```

## 2

### --description--

You have been started out with the same Tic-Tac-Toe Anchor program as the last project.

Previously, you manually copy-pasted the player keypairs into the client app. This is both insecure and a poor user experience.

Instead, install the `@solana/wallet-adapter-phantom` package in `app/` to handle connecting to the Phantom Wallet - a multi-chain wallet.

### --tests--

You should have `@solana/wallet-adapter-phantom` in `app/package.json`.

```js
const packageJson = JSON.parse(
  await __helpers.getFile(join(project.dashedName, 'app/package.json'))
);
assert.property(
  packageJson.dependencies,
  '@solana/wallet-adapter-phantom',
  'The `package.json` file should have a `@solana/wallet-adapter-phantom` dependency.'
);
```

## 3

### --description--

Within `web3.js`, replace the `Wallet` import with `PhantomWalletAdapter` from `@solana/wallet-adapter-phantom`.

### --tests--

You should not import `Wallet` from `./wallet.js`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === './wallet.js';
});
assert.notExists(importDeclaration, 'You should not import from `./wallet.js`');
```

You should import `PhantomWalletAdapter` from `@solana/wallet-adapter-phantom`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === '@solana/wallet-adapter-phantom';
});
assert.exists(
  importDeclaration,
  'You should import from `@solana/wallet-adapter-phantom`'
);
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(
  importSpecifiers,
  'PhantomWalletAdapter',
  '`PhantomWalletAdapter` should be imported from `@solana/wallet-adapter-phantom`'
);
```

## 4

### --description--

Within the `connectWallet` function, delete all the keypair logic, and assign `wallet` a new instance of `PhantomWalletAdapter`.

### --tests--

You should remove the `keypairArr` declaration from `connectWallet`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.id.name === 'keypairArr');
assert.notExists(
  variableDeclaration,
  'You should remove the `keypairArr` declaration from `connectWallet`'
);
```

You should remove the `uint` declaration from `connectWallet`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.id.name === 'uint');
assert.notExists(
  variableDeclaration,
  'You should remove the `uint` declaration from `connectWallet`'
);
```

You should remove the `keypair` declaration from `connectWallet`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.id.name === 'keypair');
assert.notExists(
  variableDeclaration,
  'You should remove the `keypair` declaration from `connectWallet`'
);
```

You should have `const wallet = new PhantomWalletAdapter()` within `connectWallet`.

```js
const expectedCodeString = `const wallet=new PhantomWalletAdapter()`;
const actualCodeString = babelisedCode.generate(babelisedCode.parsedCode, {
  compact: true
});
assert.include(actualCodeString, expectedCodeString);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const babelisedConnectWallet = new __helpers.Babeliser(
  babelisedCode.generate(
    babelisedCode
      .getFunctionDeclarations()
      .find(f => f.id.name === 'connectWallet')
  )
);
global.babelisedCode = babelisedConnectWallet;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 5

### --description--

Similarly, remove all the keypair logic within the `startGame` function.

### --tests--

You should remove the `keypairStr` declaration from `startGame`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.id.name === 'keypairStr');
assert.notExists(
  variableDeclaration,
  'A `keypairStr` declaration should not exist in `startGame`'
);
```

You should remove the `keypairArr` declaration from `startGame`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.id.name === 'keypairArr');
assert.notExists(
  variableDeclaration,
  'A `keypairArr` declaration should not exist in `startGame`'
);
```

You should remove the `uint8Array` declaration from `startGame`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.id.name === 'uint8Array');
assert.notExists(
  variableDeclaration,
  'A `uint8Array` declaration should not exist in `startGame`'
);
```

You should remove the `keypair` declaration from `startGame`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.id.name === 'keypair');
assert.notExists(
  variableDeclaration,
  'A `keypair` declaration should not exist in `startGame`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const babelisedConnectWallet = new __helpers.Babeliser(
  babelisedCode.generate(
    babelisedCode
      .getFunctionDeclarations()
      .find(f => f.id.name === 'connectWallet')
  )
);
global.babelisedCode = babelisedConnectWallet;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 6

### --description--

The Phantom Browser Extension injects a global `window.phantom` object into the browser. This object contains the chains and public keys of the currently connected wallet.

Within `startGame`, set the `playerOne` account public key to `window.phantom.solana.publicKey`.

### --tests--

You should have `.accounts({playerOne:window.phantom.solana.publicKey})` within `startGame`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const babelisedStartGame = new __helpers.Babeliser(
  babelisedCode.generate(
    babelisedCode.getFunctionDeclarations().find(f => f.id.name === 'startGame')
  )
);
const expectedCodeString = `.accounts({playerOne:window.phantom.solana.publicKey})`;
const actualCodeString = babelisedStartGame.generate(
  babelisedStartGame.parsedCode,
  { compact: true }
);
assert.include(actualCodeString, expectedCodeString);
```

## 7

### --description--

Within `startGame`, seeing as the wallet is handling the signing, remove the `keypair` as a `signer` to the rpc call.

### --tests--

You should remove `.signers([keypair])` from `startGame`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const babelisedStartGame = new __helpers.Babeliser(
  babelisedCode.generate(
    babelisedCode.getFunctionDeclarations().find(f => f.id.name === 'startGame')
  )
);
const expectedCodeString = `.signers([keypair])`;
const actualCodeString = babelisedStartGame.generate(
  babelisedStartGame.parsedCode,
  { compact: true }
);
assert.notInclude(actualCodeString, expectedCodeString);
```

## 8

### --description--

Within `startGame`, remove the keypair logic from the `handlePlay` function.

### --tests--

You should remove the `keypairStr` declaration from `handlePlay`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.id.name === 'keypairStr');
assert.notExists(
  variableDeclaration,
  'A `keypairStr` declaration should not exist in `handlePlay`'
);
```

You should remove the `keypairArr` declaration from `handlePlay`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.id.name === 'keypairArr');
assert.notExists(
  variableDeclaration,
  'A `keypairArr` declaration should not exist in `handlePlay`'
);
```

You should remove the `uint8Array` declaration from `handlePlay`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.id.name === 'uint8Array');
assert.notExists(
  variableDeclaration,
  'A `uint8Array` declaration should not exist in `handlePlay`'
);
```

You should remove the `keypair` declaration from `handlePlay`.

```js
const variableDeclaration = babelisedCode
  .getVariableDeclarations()
  .find(v => v.id.name === 'keypair');
assert.notExists(
  variableDeclaration,
  'A `keypair` declaration should not exist in `handlePlay`'
);
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const babelisedConnectWallet = new __helpers.Babeliser(
  babelisedCode.generate(
    babelisedCode
      .getFunctionDeclarations()
      .find(f => f.id.name === 'connectWallet')
  )
);
global.babelisedCode = babelisedConnectWallet;
```

### --after-all--

```js
delete global.babelisedCode;
```

## 9

### --description--

Within `handlePlay`, remove the `keypair` as a `signer` to the rpc call.

### --tests--

You should remove `.signers([keypair])` from `handlePlay`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const babelisedHandlePlay = new __helpers.Babeliser(
  babelisedCode.generate(
    babelisedCode
      .getFunctionDeclarations()
      .find(f => f.id.name === 'handlePlay')
  )
);
const expectedCodeString = `.signers([keypair])`;
const actualCodeString = babelisedHandlePlay.generate(
  babelisedHandlePlay.parsedCode,
  { compact: true }
);
assert.notInclude(actualCodeString, expectedCodeString);
```

## 10

### --description--

Within `handlePlay`, set the `player` account public key to the public key of the wallet.

### --tests--

You should have `.accounts({player:window.phantom.solana.publicKey})` within `handlePlay`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'app/web3.js')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const babelisedHandlePlay = new __helpers.Babeliser(
  babelisedCode.generate(
    babelisedCode
      .getFunctionDeclarations()
      .find(f => f.id.name === 'handlePlay')
  )
);
const expectedCodeString = `.accounts({player:window.phantom.solana.publicKey})`;
const actualCodeString = babelisedHandlePlay.generate(
  babelisedHandlePlay.parsedCode,
  { compact: true }
);
assert.include(actualCodeString, expectedCodeString);
```

## 11

### --description--

The proceeding lessons do not have any tests. Follow the instructions, and once you are confident you have completed the task, type `done` in the terminal.

Type `done` in the terminal to move on to the next lesson.

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 12

### --description--

Within a browser, navigate to https://phantom.app/ to install the Phantom browser extension.

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 13

### --description--

Click the "Download" button, and follow your browser's instructions to add the extension.

![Phantom browser extension download page](../../images/phantom/image.png)

<style>
  img {
    width: 100%;
  }
</style>

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 14

### --description--

After installing the extension, click the Phantom icon in your browser's toolbar to set up your wallet.

Create a password, and click "Continue".

![Phantom browser extension password creation](../../images/phantom/image-2.png)

<style>
  img {
    width: 100%;
  }
</style>

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 15

### --description--

Take note of your secret recovery phrase. This is the only way to recover your wallet if you forget your password, and can be used to import your wallet into other browsers/platforms. Then, click "Continue".

![Phantom browser extension secret recovery phrase](../../images/phantom/image-3.png)

<style>
  img {
    width: 100%;
  }
</style>

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 16

### --description--

Finish reading the setup information, and click the Phantom icon in your browser's toolbar to open the extension.

![Phantom browser extension setup information](../../images/phantom/image-4.png)

<style>
  img {
    width: 100%;
  }
</style>

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 17

### --description--

You should a UI similar to:

![Phantom browser extension landing page](../../images/phantom/image-5.png)

<style>
  img {
    width: 100%;
  }
</style>

Open the menubar by clicking the three dots in the top left corner.

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 18

### --description--

Open the settings page:

![Phantom browser extension settings button](../../images/phantom/image-6.png)

<style>
  img {
    width: 100%;
  }
</style>

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 19

### --description--

Click the "Developer Settings" button.

![Phantom browser extension developer settings button](../../images/phantom/image-7.png)

<style>
  img {
    width: 100%;
  }
</style>

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 20

### --description--

Enable the "Testnet Mode" in order to connect to your local validator.

![Phantom browser extension testnet mode](../../images/phantom/image-8.png)

<style>
  img {
    width: 100%;
  }
</style>

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 21

### --description--

Click the Solana network button.

![Phantom browser extension solana network button](../../images/phantom/image-9.png)

<style>
  img {
    width: 100%;
  }
</style>

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 22

### --description--

Select the "Solana Localnet" option.

![Phantom browser extension solana localnet option](../../images/phantom/image-10.png)

<style>
  img {
    width: 100%;
  }
</style>

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 23

### --description--

From the menubar, click the account to edit it.

![Phantom browser extension account button](../../images/phantom/image-12.png)

<style>
  img {
    width: 100%;
  }
</style>

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 24

### --description--

Change the account name to `Player 1` to help you keep track of it.

![Phantom browser extension account name](../../images/phantom/image-12.png)

<style>
  img {
    width: 100%;
  }
</style>

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 25

### --description--

Within your terminal, start a local validator, being sure to deploy the `tic_tac_toe.so` program at the same time.

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

The mess program should be deployed.

```js
const command = `curl http://127.0.0.1:8899 -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getProgramAccounts",
    "params": [
      "BPFLoader2111111111111111111111111111111111", {
        "encoding": "base64",
        "dataSlice": {
          "length": 0,
          "offset": 0
        }
      }
    ]
}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
const programId = '5xGwZASoE5ZgxKgaisJNaGTGzMKzjyyBGv9FCUtu2m1c';
try {
  const jsonOut = JSON.parse(stdout);
  assert.exists(jsonOut.result.find(r => r.pubkey === programId));
} catch (e) {
  assert.fail(
    e,
    `Try running \`solana-test-validator --bpf-program ${programId} tic_tac_toe.so --reset\``
  );
}
```

Within the Phantom browser extension, click on your account name to get your Solana public key:

![Phantom browser extension account public key](../../images/phantom/image-13.png)

<style>
  img {
    width: 100%;
  }
</style>

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 26

### --description--

Within your terminal, airdrop to your account.

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 27

### --description--

Within the `app/` directory, start the client app server with `yarn dev`.

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 28

### --description--

Within your browser, navigate to http://localhost:5173/. You should see the client app.

Connect your wallet to the app by clicking the "Connect Wallet" button.

![Phantom browser extension connect wallet button](../../images/phantom/image-14.png)

<style>
  img {
    width: 100%;
  }
</style>

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 29

### --description--

Within the Phantom browser extension, create a second Solana account:

![Phantom browser extension create account button](../../images/phantom/image-15.png)

<style>
  img {
    width: 100%;
  }
</style>

![Phantom browser extension create account button](../../images/phantom/image-16.png)

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 30

### --description--

Rename the second account to `Player 2`:

![Phantom browser extension rename account button](../../images/phantom/image-17.png)

<style>
  img {
    width: 100%;
  }
</style>

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 31

### --description--

Within your terminal, airdrop to the second account.

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 32

### --description--

Within the Phantom browser extension, ensure you are on your `Player 1` account.

Within the client app, add the two public keys and any game id.

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 33

### --description--

Within the client app, click the start game button.

The Phantom browser extension should prompt you to approve the transaction. Approve it.

![Phantom browser extension approve transaction](../../images/phantom/image-19.png)

<style>
  img {
    width: 100%;
  }
</style>

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 34

### --description--

Once the game is started, you can play the game by opening a second browser window, and connecting to the second account.

![Phantom browser extension connect wallet button](../../images/phantom/image-18.png)

![Phantom browser extension approve transaction](../../images/phantom/image-19.png)

<style>
  img {
    width: 100%;
  }
</style>

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 35

### --description--

Congratulations on finishing this project! Feel free to play with your code.

**Summary**:

1. Install the wallet adapter/s: `@solana/wallet-adapter-<WALLET>`
2. Navigate to https://phantom.app/
3. Install the Phantom browser extension
4. Start a local validator:

```bash
solana-test-validator --bpf-program <PROGRAM_ID> ./tic_tac_toe.so --reset
```

5. Airdrop to your wallet account
6. Connect your wallet to your app

🎆

Once you are done, enter `done` in the terminal.

### --tests--

You should enter `done` in the terminal

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## --fcc-end--
