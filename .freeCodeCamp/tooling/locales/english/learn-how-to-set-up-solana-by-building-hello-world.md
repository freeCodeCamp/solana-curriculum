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

Install the Solana CLI with:

```bash
sh -c "$(curl -sSfL https://release.solana.com/v1.11.10/install)"
```

### --tests--

You should run the above bash command to install the Solana CLI.

```js
const lastCommand = await __helpers.getLastCommand();

assert.match(lastCommand, /sh -c "$(curl -sSfL https://release.solana.com/v1.11.10/install)"/);
```

## 3

### --description--

You will likely need to adjust the environment variable for your `PATH`, in order for you to use the `solana` alias.

If prompted in the terminal, update your `PATH` environment variable to include the Solana programs.

### --tests--

TODO: Test for terminal output containing PATH prompt.

```js
assert(true);
```

## 4

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

```js

```

## 8

### --description--

As this is your first time using the Solana CLI, you should generate a new keypair with:

```bash
solana-keygen new
```

### --tests--

You should run `solana-keygen new` in the terminal.

```js

```

## 9

### --description--

The `keypair_path` is the path to your Solana keypair used when making transactions.

View your keypair in the terminal with:

```bash
cat ~/.config/solana/id.json
```

### --tests--

You should view your keypair in the terminal with the above command.

```js

```

## 10

### --description--

View/get your wallet public key is with:

```bash
solana address
```

### --tests--

You should use `solana address` to view your public key.

```js

```

## 8

### --description--

You have set your Solana config to use a locally hosted cluster, but do not have one running yet.

Open a new terminal, and start a Solana test validator with:

```bash
solana-test-validator
```

### --tests--

You should start a test validator with `solana-test-validator`.

```js

```

## 8

### --description--

<!-- TODO: These terms are new, and difficult to explain in a few words. Remove this lesson? -->

- The `json_rpc_url` value is the fullnode endpoint _RPC_ calls will be made.
- The `websocket_url` value is the fullnode _PubSub_ WebSocket endpoint.

Manually make an RPC call with:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getBalance", "params": ["your_address_public_key", { "commitment": "finalized" }]}' http://localhost:8899
```

_Remember to replace `your_address_public_key`_

### --tests--

You can use `solana address` to get your public key.

```js

```

You should make an RPC call using `curl`.

```js

```

The RPC call should return a successful response.

```js

```

## 10

### --description--

You can see your balance is `0`. This is sad.

Request an _airdrop_ of tokens to your account with:

```bash

```

### --tests--

You should use the above command to request an airdrop.

```js

```

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
