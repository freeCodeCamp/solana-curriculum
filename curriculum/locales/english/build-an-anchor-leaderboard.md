# Solana - Build an Anchor Leaderboard

## 1

### --description--

You are developing an on-chain game called _Rock Destroyer_. You will be writing the program logic for the game leaderboard using the Anchor framework, as well as writing tests to ensure the program logic is correct.

**User Stories**

**Commands**

**Notes**

### --tests--

First test

```js
assert.fail();
```

### --before-all--

```js
const __projectDir = 'build-an-anchor-leaderboard/rock-destroyer';
const codeString = await __helpers.getFile(
  './' + join(__projectDir, 'tests/index.ts')
);
const babelisedCode = new __helpers.Babeliser(codeString, {
  plugins: ['typescript']
});

global.__projectDir = __projectDir;
global.babelisedCode = babelisedCode;
```

### --after-all--

```js
delete global.__projectDir;
delete global.babelisedCode;
```

## --fcc-end--
