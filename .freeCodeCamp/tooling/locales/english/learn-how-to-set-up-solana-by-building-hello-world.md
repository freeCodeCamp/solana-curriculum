# Solana - Learn How to Set Up Solana by Building Hello World

## 1

### --description--

Welcome to the Solana curriculum! For the duration of this project, you will be working in the `learn-how-to-set-up-solana-by-building-hello-world/` directory.

Start by changing into the above directory.

### --tests--

You should be in the `learn-how-to-set-up-solana-by-building-hello-world/` directory.

```js
const cwdFile = await __helpers.getCWD();
const cwd = cwdFile.split('\n').filter(Boolean).pop();
assert.include(cwd, 'learn-how-to-set-up-solana-by-building-hello-world');
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

await new Promise(resolve => setTimeout(resolve, 2500));

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

See the default Solana configuration by running:

```bash
solana config get
```

### --tests--

You should run `solana config get` in the console.

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

View the your config settings with:

```bash
solana config get
```

### --tests--

Test

```js

```

## 7

### --description--

`solana config` reads and writes to the `.config/solana` directory.

View the config file contents in the terminal with:

```bash
cat ~/.config/solana/cli/config.yml
```

### --tests--

## 8

### --description--

- The `json_rpc_url` value is the fullnode endpoint _RPC_ calls will be made.
- The `websocket_url` value is the fullnode _PubSub_ WebSocket endpoint.

Manually make an RPC call with:

```bash
curl todo
```

### --tests--

## 9

### --description--

The `keypair_path` is the path to your Solana keypair used when making transactions.

View your keypair in the terminal with:

```bash
cat ~/.config/solana/id.json
```

### --tests--

## 10

### --description--

The `address_labels` value describes ...

### --tests--

## 11

### --description--

The `commitment` value determines the level of scrutnity with which to confirm the information in a response from the network.

Common values are:

- `processed`
- `confirmed`
- `finalized`

TODO: Do something?

### --tests--

## 12

### --description--

### --tests--
