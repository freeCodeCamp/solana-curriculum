# Solana - Learn How to Set Up Solana by Building Hello World

## 1

### --description--

Welcome to the Solana curriculum! For the duration of this project, you will be working in the `learn-how-to-set-up-solana-by-building-hello-world/` directory.

**Instruction**

Start by changing into the above directory.

### --tests--

You should be in the `learn-how-to-set-up-solana-by-building-hello-world/` directory.

```js
assert(true);
```

## 2

### --description--

You will be using the Solana CLI to:

- Configure your cluster
- Create Keypairs
- Log useful information
- Deploy your on-chain program

**Instruction**

Confirm the Solana CLI is installed with:

```bash
solana --version
```

### --tests--

You should run `solana --version` in the console.

```js
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /solana --version/);
```

## 3
