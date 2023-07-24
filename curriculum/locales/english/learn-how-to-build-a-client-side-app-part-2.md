# Solana - Learn How to Build a Client-Side App: Part 2

## 1

### --description--

In this project, you will learn how to use the Phantom wallet browser extension to connect to your local validator, connect your wallet to a dApp, and sign transactions.

Change into the `learn-how-to-build-a-client-side-app-part-2/` directory in a new terminal.

### --tests--

You should be in the `learn-how-to-build-a-client-side-app-part-2/tic-tac-toe/` directory.

```js
const cwd = await __helpers.getLastCWD();
const dirRegex = new RegExp(`${project.dashedName}/tic-tac-toe/?$`);
assert.match(cwd, dirRegex);
```

## 2

### --description--

You have been started out with the same Tic-Tac-Toe Anchor program as the last project.

Previously, you manually copy-pasted the player keypairs into the client app. This is both insecure and a poor user experience.

## --fcc-end--
