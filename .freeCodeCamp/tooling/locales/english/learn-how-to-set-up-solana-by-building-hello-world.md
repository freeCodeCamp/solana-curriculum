# Solana - Learn How to Set Up Solana by Building Hello World

## 1

### --description--

Welcome to the Solana curriculum! For the duration of this project, you will be working in the `learn-how-to-set-up-solana-by-building-hello-world/` directory.

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

### --description--

The Solana CLI is feature rich and has many commands.

View the list of commands with:

```bash
solana --help
```

### --tests--

You should see the list of commands.

```js
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /solana --help/);
```

## 4

### --description--

See the default Solana configuration by running

```bash
solana config get
```

### --tests--

You should see the default configuration.

```js
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /solana config get/);
```

## 5

### --description--

The Solana network consists of multiple <dfn>clusters</dfn>:

- Devnet
- Testnet
- Mainnet

During the initial stages of development, you are most likely to be working on a local cluster.

**Instruction**

Change your configuration to use `localhost` as the cluster:

```bash
solana config set --url localhost
```

### --tests--

You should set the configuration with `solana config set --url localhost`.

```js
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /solana config set --url localhost/);
```

## 6

### --description--

Some

### --tests--

Test

```js

```
