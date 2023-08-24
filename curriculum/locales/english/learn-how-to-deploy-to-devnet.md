# Solana - Learn How to Deploy to Devnet

## 1

### --description--

You have been started with the same programa and app as the previous project. This time, you will deploy it to the public Devnet!

First, start by ensuring it still works locally:

1. Install all dependencies
2. Build the program
3. Start a local Solana cluster
   3.1 Deploy the program to the local cluster
4. Start the client server
5. Test the program

### --tests--

You should run `yarn` in the `learn-how-to-deploy-to-devnet/todo/` directory to install all dependencies.

```js

```

You should run `anchor build` in the `learn-how-to-deploy-to-devnet/todo/` directory to build the program.

```js

```

You should have a local cluster running at `http://localhost:8899`.

```js

```

You should deploy the program to the local cluster.

```js

```

You should run `yarn dev` in the `learn-how-to-deploy-to-devnet/todo/app/` directory to start the client server.

```js

```

You should perform some transactions using the client app.

```js

```

## 2

### --description--

It is often good practice to _vet_ a public program befor using it. In the best case scenario, you can vet the source code yourself to ensure it is safe.

With programs deployed as bytecode, it is difficult to determine what the program does. Anchor provides a tool to help you verify a program matches the source code:

```bash
anchor verify <PROGRAM_ID>
```

Provided you have the supposed source code for a program, you can run that command in the program directory to verify it is the source code for the public program id.

Verify the program you deployed to the local cluster matches its source code.

### --tests--

You should run `anchor verify "9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2"` in the `learn-how-to-deploy-to-devnet/todo/programs/todo` directory to verify the program.

```js

```

## 2

### --description--

In order to work with the public Devnet, you will need to create a wallet. Instead of creating a wallet directly in Phantom, create a wallet using the Solana CLI. However, in order for this wallet to be compatible with Phantom, you will need to create the wallet using the `--derivation-path` flag.

A derivation path is a way to create a wallet that is compatible with other wallets. Phantom uses the derivation path `m/44'/501'/0'/0'` to create wallets.

Save this wallet to `learn-how-to-deploy-to-devnet/todo/wallet.json`.

### --tests--

You should run `solana-keygen new --outfile wallet.json --derivation-path` in the `learn-how-to-deploy-to-devnet/todo/` directory to create a wallet.

```js

```

## 3

### --description--

Now, to work on the Devnet, change your Solana config to use the Devnet URL.

### --tests--

You should run `solana config set --url devnet`.

```js

```

## 4

### --description--

In order to deploy to Devnet, you will need to have enough SOL to pay for the transaction fees.

As Devnet is considered a testing network, you can get SOL by requesting an airdrop to your public key.

Airdrop 2 SOL to your public key.

### --tests--

You should run `solana airdrop 2 --keypair wallet.json` in the `learn-how-to-deploy-to-devnet/todo/` directory to airdrop 1 SOL to your public key.

```js

```

## 4

### --description--

Now that you have a wallet with SOL, you can deploy the program to Devnet.

First, adjust the `Anchor.toml` file so the `provider.cluster` points to Devnet.

### --tests--

You should have `cluster = "devnet"` in the `learn-how-to-deploy-to-devnet/todo/Anchor.toml` file.

```js

```

## 5

### --description--

Adjust the wallet path in the `Anchor.toml` file to point to the wallet you created.

### --tests--

You should have `wallet = "./wallet.json"` in the `learn-how-to-deploy-to-devnet/todo/Anchor.toml` file.

```js

```

## 6

### --description--

Add a `[programs.devnet]` section to the `Anchor.toml` file, and add a `todo` key with the value of the program id you will deploy to.

### --tests--

You should have a `[programs.devnet]` section in the `learn-how-to-deploy-to-devnet/todo/Anchor.toml` file.

```js

```

You should have a `todo = "9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2"` key in the `[programs.devnet]` section.

```js

```

## 7

### --description--

Use the Anchor CLI to deploy the program to Devnet. _This should fail_.

### --tests--

You should run `anchor deploy` in the `learn-how-to-deploy-to-devnet/todo/` directory and see an error.

```js

```

## 8

### --description--

You do not have enough funds to pay for the program deployment transactions. You will need to airdrop more SOL to your wallet.

Airdrop 2 SOL to your `wallet.json` account. _This should fail_.

### --tests--

You should run `solana airdrop 2 --keypair wallet.json` in `learn-how-to-deploy-to-devnet/todo/`.

```js

```

## 9

### --description--

You have been rate limited by the Solana Devnet. You can wait a few minutes before airdropping again, or:

```bash
# Create a temporary wallet
todo/ $ solana-keygen new --outfile temp.json --derivation-path
# Airdrop 2 SOL to the temporary wallet
todo/ $ solana airdrop 2 --keypair temp.json
# Set the Solana CLI to use the temporary wallet
todo/ $ solana config set --keypair temp.json
# Transfer 1.95 SOL from the temporary wallet to your wallet
todo/ $ solana transfer 1.95 wallet.json
```

### --tests--

Your `wallet.json` account should have `3.95` SOL.

```js

```

## 10

### --description--

Deploy the program to Devnet.

_This usually takes a few minutes to complete._

### --tests--

You should run `anchor deploy` in the `learn-how-to-deploy-to-devnet/todo/` directory.

```js

```

## 11

### --description--

Verify the program matches the source code.

### --tests--

You should run `anchor verify "9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2"` in the `learn-how-to-deploy-to-devnet/todo/programs/todo` directory to verify the program.

```js

```

## 12

### --description--

With your program deployed, ensure your `.env` file has the correct program id and cluster endpoint.

Then start the app client server.

### --tests--

You should run `yarn dev` in the `learn-how-to-deploy-to-devnet/todo/app/` directory.

```js

```

## 13

### --description--

In your browser, import your wallet into Phantom:

![add account](../../images/devnet/image.png)

![use your secret recovery phrase](../../images/devnet/image-1.png)

After inputting your secret recovery phrase, you should see your wallet in Phantom.

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 14

### --description--

Open the app in your browser, and perform some transactions.

### --tests--

You should type `done` in the terminal.

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## 15

### --description--

Congratulations! You have deployed your program to Devnet!

**Summary**

1. Adjust all config files to use Devnet
2. Create a wallet using the Solana CLI
3. Airdrop SOL to your wallet
4. Use `anchor verify` to verify any programs you use match their source code
5. Deploy the program to Devnet
6. Share your app with others

🎆

Once you are done, enter `done` in the terminal.

### --tests--

You should enter `done` in the terminal

```js
const lastCommand = await __helpers.getLastCommand();
assert.include(lastCommand, 'done');
```

## --fcc-end--
