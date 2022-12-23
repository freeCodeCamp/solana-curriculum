# Solana - Learn Solana's Token Program by Minting a Fungible Token

## 1

### --description--

In this project, you will learn how to create a <dfn title="A digitally transferable asset whose supply is alterable.">fungible token</dfn> on the Solana blockchain. You will be able to create your own token, and mint an unlimited supply of that token. You will be able to send your tokens to other Solana wallets.

For the duration of this project, you will be working in the `learn-solanas-token-program-by-minting-a-fungible-token/` directory.

Change into the above directory in a new bash terminal.

### --tests--

You should use `cd` to change into the `learn-solanas-token-program-by-minting-a-fungible-token/` directory.

```js
const cwdFile = await __helpers.getCWD();
const cwd = cwdFile.split('\n').filter(Boolean).pop();
assert.include(cwd, 'learn-solanas-token-program-by-minting-a-fungible-token');
```

## 2

### --description--

Previously, you interacted with the _System Program_ to create accounts. Now, you will interact with the _Token Program_ to work with fungible tokens.

Creating a <dfn title="A digitally transferable asset whose supply is alterable.">fungible token</dfn> on Solana requires the following steps:

1. Creating a _Mint_ account
2. Creating a _Token_ account
3. Minting tokens

### --tests--

## --fcc-end--
