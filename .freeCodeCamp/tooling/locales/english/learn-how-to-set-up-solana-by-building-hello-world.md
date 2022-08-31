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

assert.match(
  lastCommand,
  /sh -c "\$\(curl -sSfL https:\/\/release\.solana\.com\/v1\.11\.10\/install\)"/
);
```

## 3

### --description--

You will likely need to adjust the environment variable for your `PATH`, in order for you to use the `solana` alias.

If prompted in the terminal, update your `PATH` environment variable to include the Solana programs.

### --tests--

You should copy the given PATH command into your terminal.

```js
const terminalOut = await __helpers.getTerminalOutput();
const mat = terminalOut.match(/PATH=".*"/);
if (mat) {
  const lastCommand = await __helpers.getLastCommand();
  assert.match(lastCommand, mat);
}
```

## 4

### --description--

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

## 5

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

## 6

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

## 7

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

## 8

### --description--

View the your changed config settings.

### --tests--

You should view the config with `solana config get`.

```js
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /solana config get/);
```

## 9

### --description--

`solana config` reads and writes to the `.config/solana` directory.

View the config file contents in the terminal with:

```bash
cat ~/.config/solana/cli/config.yml
```

### --tests--

You should use `cat` to view the config file contents.

```js
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /cat ~\/\.config\/solana\/cli\/config.yml/);
```

## 10

### --description--

As this is your first time using the Solana CLI, you should generate a new keypair with:

```bash
solana-keygen new
```

### --tests--

You should run `solana-keygen new` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /solana-keygen new/);
```

## 11

### --description--

The `keypair_path` is the path to your Solana keypair used when making transactions.

View your keypair in the terminal with:

```bash
cat ~/.config/solana/id.json
```

### --tests--

You should use `cat` to view your keypair in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /cat ~\/\.config\/solana\/id\.json/);
```

## 12

### --description--

View/get your wallet public key with:

```bash
solana address
```

### --tests--

You should use `solana address` to view your public key.

```js
const lastCommand = await __helpers.getLastCommand();
assert.match(lastCommand, /solana address/);
```

## 13

### --description--

You have set your Solana config to use a locally hosted cluster, but do not have one running yet.

Open a new terminal, and start a Solana test validator with:

```bash
solana-test-validator
```

### --tests--

You should start a test validator with `solana-test-validator`.

```js
const temp = await __helpers.getTemp();
assert.match(temp, /solana-test-validator/);
```

## 14

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

You should make an RPC call using `curl`.

```js
const { stdout } = await __helpers.getCommandOutput('solana address');
const camperPublicKey = stdout.trim();
console.log('CAMPER PUBLIC KEY: ', camperPublicKey);
const toMatch = `curl -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getBalance", "params": ["${camperPublicKey}", { "commitment": "finalized" }]}' http://localhost:8899`;
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand.replace(/\s/g, ''), toMatch.replace(/\s/g, ''));
```

The RPC call should return a successful response. _Try again_

```js
const terminalOut = await __helpers.getTerminalOutput();
assert.match(terminalOut, /"result":/);
```

## 15

### --description--

It is not the best user experience using curl commands to interact with the network.

View your wallet's balance with:

```bash
solana balance <ACCOUNT_ADDRESS>
```

_Remember to replace `<ACCOUNT_ADDRESS>`_

### --tests--

You should use the command `solana balance <ACCOUNT_ADDRESS>`.

```js
const { stdout } = await __helpers.getCommandOutput('solana address');
const accountAddress = stdout.trim();
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, `solana balance ${accountAddress}`);
```

## 16

### --description--

You can see your balance is `0` ☹️.

Request an _airdrop_ of 1 SOL to your account with:

```bash
solana airdrop 1 <RECIPIENT_ACCOUNT_ADDRESS>
```

_Remember to replace `<RECIPIENT_ACCOUNT_ADDRESS>` with your public key_

### --tests--

You should use the above command to request an airdrop.

```js
const { stdout } = await __helpers.getCommandOutput('solana address');
const accountAddress = stdout.trim();
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, `solana airdrop 1 ${accountAddress}`);
```

Your account should have at least 1 SOL.

```js
const { stdout: stdout1 } = await __helpers.getCommandOutput('solana address');
const accountAddress = stdout1.trim();
const { stdout } = await __helpers.getCommandOutput(
  `solana balance ${accountAddress}`
);
const balance = stdout.trim()?.match(/\d+/)[0];
assert.isAtLeast(Number(balance), 1);
```

## 17

### --description--

### --tests--

## 18

### --description--

### --tests--
