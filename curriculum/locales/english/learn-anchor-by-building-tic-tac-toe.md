# Solana - Learn Anchor by Building Tic-Tac-Toe

## 1

### --description--

Previously, you built and deployed a program (smart contract) to the Solana blockchain using the native `solana_program` crate. In this project, you will use the Anchor framework to build and deploy a program to the Solana blockchain.

Anchor offers quick and convenient tools and modules for building and deploying programs.

Open a new terminal, and install the Anchor Version Manager (AVM) to get started.

```bash
cargo install --git https://github.com/coral-xyz/anchor avm --locked --force
```

### --tests--

You should have `avm` installed.

```js
assert.fail();
```

## 2

### --description--

Anchor Version Manager is a tool for using multiple versions of the Anchor CLI.

Use `avm` to install the latest version of the Anchor CLI.

```bash
avm install latest
```

**Note:** Technically, this step is not necessary as the latest version of the Anchor CLI is installed by default.

### --tests--

You should have the latest version of the Anchor CLI installed.

```js
assert.fail();
```

## 3

### --description--

Instruct `avm` to use the latest version of the Anchor CLI.

```bash
avm use latest
```

### --tests--

You should be using the latest version of the Anchor CLI.

```js
assert.fail();
```

## 4

### --description--

Verify you are using the latest version of the Anchor CLI.

```bash
anchor --version
```

### --tests--

You should see version `0.27` printed to the console.

```js
assert.fail();
```

## 5

### --description--

You will be building a Tic-Tac-Toe game on the Solana blockchain.

Within `learn-anchor-by-building-tic-tac-toe/`, create a new project named `tic-tac-toe`:

```bash
anchor init --no-git tic-tac-toe
```

**Note:** The `--no-git` flag is used to prevent the project from being initialized as a git repository.

### --tests--

You should be in the `learn-anchor-by-building-tic-tac-toe` directory.

```js
assert.fail();
```

You should have a `tic-tac-toe` directory.

```js
assert.fail();
```

## 6

### --description--

Anchor has created a `tic-tac-toe` directory with the following structure:

```bash
tic-tac-toe/
├── app/
├── migrations/
│   └── deploy.ts
├── programs/
│   └── tic-tac-toe/
│       ├── src/
│       │   └── lib.rs
│       ├── Cargo.toml
│       └── Xargo.toml
├── tests/
│   └── tic-tac-toe.ts
├── Anchor.toml
├── Cargo.toml
├── package.json
├── tsconfig.json
└── yarn.lock
```

In your terminal, change into the `tic-tac-toe` directory.

### --tests--

You should be in the `tic-tac-toe` directory.

```js
assert.fail();
```

## 7

### --description--

The `app` directory is a placeholder for a web app that would interact with the program. The `migrations/deploy.ts` script is run on `anchor migrate`. The `programs` directory contains all the programs (smart contracts) that will be deployed to the Solana blockchain. The `tests` directory contains the client-side tests for your programs.

You will be mostly working in `programs/tic_tac_toe/src/lib.rs` and `tests/tic_tac_toe.ts`.

Get the program id (public key) of the `tic-tac-toe` program:

```bash
anchor keys list
```

### --tests--

The public key of your `tic-tac-toe` program should be printed to the console.

```js
assert.fail();
```

## 8

### --description--

Copy the program id, and replace the default values with it in two locations:

1. The string value within the `declare_id` macro in `programs/tic-tac-toe/src/lib.rs`
2. The `tic_tac_toe` key within `Anchor.toml`

### --tests--

The `lib.rs` file should contain the program id within the `declare_id!()` call.

```js
assert.fail();
```

The `Anchor.toml` file should contain the program id as the value for the `tic_tac_toe` key.

```js
assert.fail();
```

## 9

### --description--

## --fcc-end--
