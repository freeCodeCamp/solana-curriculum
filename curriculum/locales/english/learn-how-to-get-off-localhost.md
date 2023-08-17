# Solana - Learn How to Get Off Localhost

## 1

### --description--

You have been started off with an Anchor full-stack boilerplate.

In this project, you will develop and prepare a program for deployment on the Solana blockchain.

Start by changing into the `learn-how-to-get-off-localhost/todo/` directory.

### --tests--

You should be in the `learn-how-to-get-off-localhost/todo/` directory.

```js
const cwd = await __helpers.getLastCWD();
const dirRegex = new RegExp(`${project.dashedName}/todo/?$`);
assert.match(cwd, dirRegex);
```

## 2

### --description--

Within `programs/todo/src/lib.rs`, start by renaming the `initialize` instruction handle to `save_tasks`.

### --tests--

The `initialize` instruction handle should be renamed to `save_tasks`.

```js
const librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
assert.match(librs, /pub fn save_tasks/);
assert.notMatch(librs, /pub fn initialize/);
```

## 3

### --description--

Rename the `Initialize` context to `SaveTasks`.

### --tests--

The `Initialize` struct should be renamed to `SaveTasks`.

```js
const librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
assert.match(librs, /pub struct SaveTasks/);
assert.notMatch(librs, /pub struct Initialize/);
```

The `Initialize` context should be renamed to `SaveTasks`.

```js
const librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
assert.match(librs, /Context<SaveTasks>/);
assert.notMatch(librs, /Context<Initialize>/);
```

## 4

### --description--

A "task" will be saved into a new PDA.

Within the `SaveTasks` struct, add a public `tasks` account with a type of `Account<'info, TasksAccount>`.

### --tests--

The `SaveTasks` struct should have a `pub tasks` field.

```js

```

The `tasks` field should be annotated with `#[account()]`.

```js

```

The `tasks` field should have a type of `Account<'info, TasksAccount>`.

```js

```

The `SaveTasks` struct should be generic over a lifetime of `'info`.

```js

```

## 5

### --description--

The `save_task` instruction handle will be the only instruction handle in the program. So, the data account should be initialized only _if needed_.

Anchor provides an `init_if_needed` argument for this purpose. Pass it as an argument to the `account` attribute macro, and add `init-if-needed` as a feature to the `anchor-lang` dependency in the `Cargo.toml` file.

### --tests--

The `tasks` field should be annotated with `#[account(init_if_needed)]`.

```js

```

The `anchor-lang` dependency should have a `features` array with a value of `["init-if-needed"]`.

```js

```

## 6

### --description--

Define a public `TasksAccount` struct with a `tasks` field of type `Vec<Task>`. Remember to annotate it as an account.

### --tests--

The `TasksAccount` struct should be annotated with `#[account]`.

```js

```

The `TasksAccount` struct should have a `tasks` field.

```js

```

The `tasks` field should have a type of `Vec<Task>`.

```js

```

## 7

### --description--

Define a public `Task` struct with an `id` file of type `u32`, a `name` field of type `String`, and a `completed` field of type `bool`.

### --tests--

The `Task` struct should have an `id` field.

```js

```

The `id` field should have a type of `u32`.

```js

```

The `Task` struct should have a `name` field.

```js

```

The `name` field should have a type of `String`.

```js

```

The `Task` struct should have a `completed` field.

```js

```

The `completed` field should have a type of `bool`.

```js

```

## 8

### --description--

Derive the necessary traits for the `Task` struct.

### --tests--

The `Task` struct should be annotated with `#[derive(AnchorSerialize, AnchorDeserialize, Clone)]`.

```js

```

## 9

### --description--

The `save_tasks` instruction handle takes a `replacing_tasks` argument of type `Vec<Task>`.

## 50

### --description--

**Summary**

## --fcc-end--
