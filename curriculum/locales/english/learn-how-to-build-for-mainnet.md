# Solana - Learn How to Build for Mainnet

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

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
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

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
```

## 4

### --description--

A "task" will be saved into a new PDA.

Within the `SaveTasks` struct, add a public `tasks` account with a type of `Account<'info, TasksAccount>`.

### --tests--

The `SaveTasks` struct should have a `pub tasks` field.

```js
const saveTasks = __librs.match(/struct\s+SaveTasks[^{]*{([^}]*)}/s)?.[1];
assert.match(saveTasks, /pub\s+tasks/);
```

The `tasks` field should be annotated with `#[account()]`.

```js
const saveTasks = __librs.match(/struct\s+SaveTasks[^{]*{([^}]*)}/s)?.[1];
assert.match(saveTasks, /#\[\s*account\(/);
```

The `tasks` field should have a type of `Account<'info, TasksAccount>`.

```js
const saveTasks = __librs.match(/struct\s+SaveTasks[^{]*{([^}]*)}/s)?.[1];
assert.match(
  saveTasks,
  /pub\s+tasks\s*:\s*Account\s*<\s*'info\s*,\s*TasksAccount\s*>/
);
```

The `SaveTasks` struct should be generic over a lifetime of `'info`.

```js
assert.match(__librs, /struct\s+SaveTasks\s*<\s*'info\s*>/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SaveTasks {}
```

## 5

### --description--

The `save_task` instruction handle will be the only instruction handle in the program. So, the data account should be initialized only _if needed_.

Anchor provides an `init_if_needed` argument for this purpose. Pass it as an argument to the `account` attribute macro, and add `init-if-needed` as a feature to the `anchor-lang` dependency in the `Cargo.toml` file.

### --tests--

The `tasks` field should be annotated with `#[account(init_if_needed)]`.

```js
const saveTasks = __librs.match(
  /struct\s+SaveTasks\s*<\s*'info\s*>\s*{([^}]*)}/s
)?.[1];
assert.match(saveTasks, /#\[\s*account\s*\(\s*init_if_needed\s*\)\s*\]/);
```

The `anchor-lang` dependency should have a `features` array with a value of `["init-if-needed"]`.

```js
const cargoToml = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/Cargo.toml`
);
assert.match(cargoToml, /features\s*=\s*\[\s*"init-if-needed"\s*\]/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SaveTasks<'info> {
    #[account()]
    pub tasks: Account<'info, TasksAccount>
}
```

## 6

### --description--

Define a public `TasksAccount` struct with a `tasks` field of type `Vec<Task>`. Remember to annotate it as an account.

### --tests--

The `TasksAccount` struct should be annotated with `#[account]`.

```js
assert.match(__librs, /#\[\s*account\s*\]\s*pub\s+struct\s+TasksAccount/);
```

The `TasksAccount` struct should have a `tasks` field.

```js
const tasksAccount = __librs.match(
  /pub\s+struct\s+TasksAccount[^{]*{([^}]*)}/s
)?.[1];
assert.match(tasksAccount, /pub\s+tasks/);
```

The `tasks` field should have a type of `Vec<Task>`.

```js
const tasksAccount = __librs.match(
  /pub\s+struct\s+TasksAccount[^{]*{([^}]*)}/s
)?.[1];
assert.match(tasksAccount, /pub\s+tasks\s*:\s*Vec\s*<\s*Task\s*>/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed)]
    pub tasks: Account<'info, TasksAccount>
}
```

#### --"learn-how-to-get-off-localhost/todo/programs/todo/Cargo.toml"--

```toml
[package]
name = "todo"
version = "0.1.0"
description = "A todo list program"
edition = "2021"

[lib]
crate-type = ["cdylib", "lib"]
name = "todo"

[features]
no-entrypoint = []
no-idl = []
no-log-ix-name = []
cpi = ["no-entrypoint"]
default = []

[dependencies]
anchor-lang = { version = "0.28.0", features = ["init-if-needed"] }
```

## 7

### --description--

Define a public `Task` struct with an `id` file of type `u32`, a `name` field of type `String`, and a `completed` field of type `bool`.

### --tests--

The `Task` struct should have an `id` field.

```js
const task = __librs.match(/pub\s+struct\s+Task[^{]*{([^}]*)}/s)?.[1];
assert.match(task, /pub\s+id/);
```

The `id` field should have a type of `u32`.

```js
const task = __librs.match(/pub\s+struct\s+Task[^{]*{([^}]*)}/s)?.[1];
assert.match(task, /pub\s+id\s*:\s*u32/);
```

The `Task` struct should have a `name` field.

```js
const task = __librs.match(/pub\s+struct\s+Task[^{]*{([^}]*)}/s)?.[1];
assert.match(task, /pub\s+name/);
```

The `name` field should have a type of `String`.

```js
const task = __librs.match(/pub\s+struct\s+Task[^{]*{([^}]*)}/s)?.[1];
assert.match(task, /pub\s+name\s*:\s*String/);
```

The `Task` struct should have a `completed` field.

```js
const task = __librs.match(/pub\s+struct\s+Task[^{]*{([^}]*)}/s)?.[1];
assert.match(task, /pub\s+completed/);
```

The `completed` field should have a type of `bool`.

```js
const task = __librs.match(/pub\s+struct\s+Task[^{]*{([^}]*)}/s)?.[1];
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed)]
    pub tasks: Account<'info, TasksAccount>
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>
}
```

## 8

### --description--

Derive the necessary traits for the `Task` struct.

### --tests--

The `Task` struct should be annotated with `#[derive(AnchorSerialize, AnchorDeserialize, Clone)]`.

```js
assert.match(
  __librs,
  /#\[\s*derive\s*\(\s*AnchorSerialize\s*,\s*AnchorDeserialize\s*,\s*Clone\s*\)\s*\]\s*pub\s+struct\s+Task/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed)]
    pub tasks: Account<'info, TasksAccount>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}
```

## 9

### --description--

The `save_tasks` instruction handle will take a `replacing_tasks` argument of type `Vec<Task>`.

Add the expected argument.

### --tests--

The `save_tasks` instruction handle should have a `replacing_tasks` argument.

```js
assert.match(
  __libr.rs,
  /pub\s+fn\s+save_tasks\s*\(\s*ctx:\s*Context<\s*SaveTasks\s*>,\s*replacing_tasks/s
);
```

The `replacing_tasks` argument should have a type of `Vec<Task>`.

```js
assert.match(
  __libr.rs,
  /pub\s+fn\s+save_tasks\s*\(\s*ctx:\s*Context<\s*SaveTasks\s*>,\s*replacing_tasks\s*:\s*Vec\s*<\s*Task\s*>\s*\)/s
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed)]
    pub tasks: Account<'info, TasksAccount>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}
```

## 10

### --description--

Create a public `ErrorCode` enum with the following variants: `TaskNameTooLong`, `TaskNameTooShort`, and `TaskIdNotUnique`

### --tests--

The `ErrorCode` enum should have a `TaskNameTooLong` variant.

```js
const errorCode = __librs.match(/pub\s+enum\s+ErrorCode\s*{([^}]*)}/s)?.[1];
assert.match(errorCode, /TaskNameTooLong/);
```

The `ErrorCode` enum should have a `TaskNameTooShort` variant.

```js
const errorCode = __librs.match(/pub\s+enum\s+ErrorCode\s*{([^}]*)}/s)?.[1];
assert.match(errorCode, /TaskNameTooShort/);
```

The `ErrorCode` enum should have a `TaskIdNotUnique` variant.

```js
const errorCode = __librs.match(/pub\s+enum\s+ErrorCode\s*{([^}]*)}/s)?.[1];
assert.match(errorCode, /TaskIdNotUnique/);
```

The `ErrorCode` enum should be annotated with `#[error_code]`.

```js
assert.match(
  __librs,
  /#\[\s*error_code\s*\]\s*pub\s+enum\s+ErrorCode\s*{([^}]*)}/s
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed)]
    pub tasks: Account<'info, TasksAccount>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}
```

## 11

### --description--

Within the `save_tasks` instruction handle, return an error if any of the task names are greater than 32 characters.

### --tests--

The `save_tasks` instruction handle should return `Err(ErrorCode::TaskNameTooLong.into())` if any of the task names are greater than 32 characters.

```js
const saveTasks = __librs.match(
  /pub\s+fn\s+save_tasks\s*\(\s*ctx:\s*Context<\s*SaveTasks\s*>,\s*replacing_tasks\s*:\s*Vec\s*<\s*Task\s*>\s*\)\s*->\s*Result\s*<\s*()\s*>\s*{(.*?)Ok\(\(\)\)/s
)?.[1];
assert.match(
  saveTasks,
  /Err\s*\(\s*ErrorCode::TaskNameTooLong\s*\)\s*\.\s*into\s*\(\s*\)/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed)]
    pub tasks: Account<'info, TasksAccount>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}

#[error_code]
pub enum ErrorCode {
    TaskNameTooLong,
    TaskNameTooShort,
    TaskIdNotUnique,
}
```

## 12

### --description--

Within the `save_tasks` instruction handle, return an error if any of the task names are less than 1 character.

### --tests--

The `save_tasks` instruction handle should return `Err(ErrorCode::TaskNameTooShort.into())` if any of the task names are less than 1 character.

```js
const saveTasks = __librs.match(
  /pub\s+fn\s+save_tasks\s*\(\s*ctx:\s*Context<\s*SaveTasks\s*>,\s*replacing_tasks\s*:\s*Vec\s*<\s*Task\s*>\s*\)\s*->\s*Result\s*<\s*()\s*>\s*{(.*?)Ok\(\(\)\)/s
)?.[1];
assert.match(
  saveTasks,
  /Err\s*\(\s*ErrorCode::TaskNameTooShort\s*\)\s*\.\s*into\s*\(\s*\)/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        // Check that the task name is not too long.
        for task in replacing_tasks.iter() {
            if task.name.len() > 32 {
                return Err(ErrorCode::TaskNameTooLong.into());
            }
        }
        Ok(())
    }
}

#[derive(Accounts)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed)]
    pub tasks: Account<'info, TasksAccount>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}

#[error_code]
pub enum ErrorCode {
    TaskNameTooLong,
    TaskNameTooShort,
    TaskIdNotUnique,
}
```

## 13

### --description--

Within the `save_tasks` instruction handle, return an error if any of the task ids are not unique.

### --tests--

The `save_tasks` instruction handle should return `Err(ErrorCode::TaskIdNotUnique.into())` if any of the task ids are not unique.

```js
const saveTasks = __librs.match(
  /pub\s+fn\s+save_tasks\s*\(\s*ctx:\s*Context<\s*SaveTasks\s*>,\s*replacing_tasks\s*:\s*Vec\s*<\s*Task\s*>\s*\)\s*->\s*Result\s*<\s*()\s*>\s*{(.*?)Ok\(\(\)\)/s
)?.[1];
assert.match(
  saveTasks,
  /Err\s*\(\s*ErrorCode::TaskIdNotUnique\s*\)\s*\.\s*into\s*\(\s*\)/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        // Check that the task name is not too long.
        for task in replacing_tasks.iter() {
            if task.name.len() > 32 {
                return Err(ErrorCode::TaskNameTooLong.into());
            }
        }

        // Check that the task name is not too short.
        for task in replacing_tasks.iter() {
            if task.name.len() < 1 {
                return Err(ErrorCode::TaskNameTooShort.into());
            }
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed)]
    pub tasks: Account<'info, TasksAccount>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}

#[error_code]
pub enum ErrorCode {
    TaskNameTooLong,
    TaskNameTooShort,
    TaskIdNotUnique,
}
```

## 14

### --description--

When initializing the `TasksAccount` account, set the `space` argument to:

```markdown
<DISCRIMINANT_SIZE> + replacing_tasks.len() \* <TASK_SIZE>
```

### --tests--

The `SaveTasks` struct `tasks` field should be annotated with `#[account(space = ...)]`.

```js
const saveTasks = __librs.match(/struct\s+SaveTasks[^{]*{([^}]*)}/s)?.[1];
assert.match(saveTasks, /\s*space\s*=\s*\]/);
```

The `space` argument should be set to `8 + replacing_tasks.len() * (4 + (4 + 32) + 1)`.

```js
const saveTasks = __librs.match(/struct\s+SaveTasks[^{]*{([^}]*)}/s)?.[1];
assert.match(
  saveTasks,
  /\s*space\s*=\s*8\s*\+\s*replacing_tasks\.len\s*\(\s*\)\s*\*\s*\(\s*4\s*\+\s*\(\s*4\s*\+\s*32\s*\)\s*\+\s*1\s*\)/
);
```

The `SaveTasks` struct should be annotated with `#[instruction(replacing_tasks: Vec<Task>)]`.

```js
assert.match(
  __librs,
  /#\[instruction\s*\(\s*replacing_tasks\s*:\s*Vec\s*<\s*Task\s*>\s*\)\s*\]/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        // Check that the task name is not too long.
        for task in replacing_tasks.iter() {
            if task.name.len() > 32 {
                return Err(ErrorCode::TaskNameTooLong.into());
            }
        }

        // Check that the task name is not too short.
        for task in replacing_tasks.iter() {
            if task.name.len() < 1 {
                return Err(ErrorCode::TaskNameTooShort.into());
            }
        }

        // Check that the task id is unique.
        for (i, task) in replacing_tasks.iter().enumerate() {
            for (j, other_task) in replacing_tasks.iter().enumerate() {
                if i != j && task.id == other_task.id {
                    return Err(ErrorCode::TaskIdNotUnique.into());
                }
            }
        }

        Ok(())
    }
}

#[derive(Accounts)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed)]
    pub tasks: Account<'info, TasksAccount>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}

#[error_code]
pub enum ErrorCode {
    TaskNameTooLong,
    TaskNameTooShort,
    TaskIdNotUnique,
}
```

## 15

### --description--

Set the payer of the `TasksAccount` account to `user`, and declare a public `user` field of type `Signer<'info>` within the `SaveTasks` struct.

### --tests--

The `SaveTasks` struct should have a `pub user` field.

```js
const saveTasks = __librs.match(/struct\s+SaveTasks[^{]*{([^}]*)}/s)?.[1];
assert.match(saveTasks, /pub\s+user/);
```

The `user` field should have a type of `Signer<'info>`.

```js
const saveTasks = __librs.match(/struct\s+SaveTasks[^{]*{([^}]*)}/s)?.[1];
assert.match(saveTasks, /pub\s+user\s*:\s*Signer\s*<\s*'\s*info\s*>\s*,/);
```

The `user` field should be annotated with `#[account(mut)]`.

```js
const saveTasks = __librs.match(/struct\s+SaveTasks[^{]*{([^}]*)}/s)?.[1];
assert.match(saveTasks, /#[^#]*account\s*\(\s*mut\s*\)/);
```

The `tasks` field should be annotated with `#[account(payer = user)]`.

```js
const saveTasks = __librs.match(/struct\s+SaveTasks[^{]*{([^}]*)}/s)?.[1];
assert.match(saveTasks, /payer\s*=\s*user/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        // Check that the task name is not too long.
        for task in replacing_tasks.iter() {
            if task.name.len() > 32 {
                return Err(ErrorCode::TaskNameTooLong.into());
            }
        }

        // Check that the task name is not too short.
        for task in replacing_tasks.iter() {
            if task.name.len() < 1 {
                return Err(ErrorCode::TaskNameTooShort.into());
            }
        }

        // Check that the task id is unique.
        for (i, task) in replacing_tasks.iter().enumerate() {
            for (j, other_task) in replacing_tasks.iter().enumerate() {
                if i != j && task.id == other_task.id {
                    return Err(ErrorCode::TaskIdNotUnique.into());
                }
            }
        }

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(replacing_tasks: Vec<Task>)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed, space = 8 + replacing_tasks.len() * (4 + (4 + 32) + 1))]
    pub tasks: Account<'info, TasksAccount>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}

#[error_code]
pub enum ErrorCode {
    TaskNameTooLong,
    TaskNameTooShort,
    TaskIdNotUnique,
}
```

## 16

### --description--

Seeing as each ToDo will be related to a specific user, set the seeds of the `TasksAccount` account to the user public key, and tell Anchor to generate the bump seed.

### --tests--

The `tasks` field should be annotated with `#[account(seeds = [user.key().as_ref()])]`.

```js
const saveTasks = __librs.match(/struct\s+SaveTasks[^{]*{([^}]*)}/s)?.[1];
assert.match(
  saveTasks,
  /seeds\s*=\s*\[\s*user\.key\s*\(\s*\)\s*\.\s*as_ref\s*\(\s*\)\s*\]/
);
```

The `tasks` field should be annotated with `#[account(bump)]`.

```js
const saveTasks = __librs.match(/struct\s+SaveTasks[^{]*{([^}]*)}/s)?.[1];
assert.match(saveTasks, /bump/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        // Check that the task name is not too long.
        for task in replacing_tasks.iter() {
            if task.name.len() > 32 {
                return Err(ErrorCode::TaskNameTooLong.into());
            }
        }

        // Check that the task name is not too short.
        for task in replacing_tasks.iter() {
            if task.name.len() < 1 {
                return Err(ErrorCode::TaskNameTooShort.into());
            }
        }

        // Check that the task id is unique.
        for (i, task) in replacing_tasks.iter().enumerate() {
            for (j, other_task) in replacing_tasks.iter().enumerate() {
                if i != j && task.id == other_task.id {
                    return Err(ErrorCode::TaskIdNotUnique.into());
                }
            }
        }

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(replacing_tasks: Vec<Task>)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed, space = 8 + replacing_tasks.len() * (4 + (4 + 32) + 1), payer = user)]
    pub tasks: Account<'info, TasksAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}

#[error_code]
pub enum ErrorCode {
    TaskNameTooLong,
    TaskNameTooShort,
    TaskIdNotUnique,
}
```

## 17

### --description--

Include the necessary program to initialize a data account owned by your program.

### --tests--

The `SaveTasks` struct should have a `pub system_program` field.

```js
const saveTasks = __librs.match(/struct\s+SaveTasks[^{]*{([^}]*)}/s)?.[1];
assert.match(saveTasks, /pub\s+system_program/);
```

The `system_program` field should have a type of `Program<'info, System>`.

```js
const saveTasks = __librs.match(/struct\s+SaveTasks[^{]*{([^}]*)}/s)?.[1];
assert.match(
  saveTasks,
  /pub\s+system_program\s*:\s*Program\s*<\s*'\s*info\s*,\s*System\s*>\s*,/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        // Check that the task name is not too long.
        for task in replacing_tasks.iter() {
            if task.name.len() > 32 {
                return Err(ErrorCode::TaskNameTooLong.into());
            }
        }

        // Check that the task name is not too short.
        for task in replacing_tasks.iter() {
            if task.name.len() < 1 {
                return Err(ErrorCode::TaskNameTooShort.into());
            }
        }

        // Check that the task id is unique.
        for (i, task) in replacing_tasks.iter().enumerate() {
            for (j, other_task) in replacing_tasks.iter().enumerate() {
                if i != j && task.id == other_task.id {
                    return Err(ErrorCode::TaskIdNotUnique.into());
                }
            }
        }

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(replacing_tasks: Vec<Task>)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed, space = 8 + replacing_tasks.len() * (4 + (4 + 32) + 1), payer = user, seeds = [user.key().as_ref()], bump)]
    pub tasks: Account<'info, TasksAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}

#[error_code]
pub enum ErrorCode {
    TaskNameTooLong,
    TaskNameTooShort,
    TaskIdNotUnique,
}
```

## 18

### --description--

As the number of tasks stored can vary between saves, the account size needs to reallocate to the correct amount of space.

Within the `save_tasks` instruction handle, add an `if` statement to check if the `tasks` account `tasks` data length is not equal to the `replacing_tasks` length.

### --tests--

The `save_tasks` instruction handle should have `if tasks.tasks.len() != replacing_tasks.len() {}`.

```js
const saveTasks = __librs.match(
  /pub\s+fn\s+save_tasks\s*\(\s*ctx:\s*Context<\s*SaveTasks\s*>,\s*replacing_tasks\s*:\s*Vec\s*<\s*Task\s*>\s*\)\s*->\s*Result\s*<\s*()\s*>\s*{(.*?)Ok\(\(\)\)/s
)?.[1];
assert.match(
  saveTasks,
  /if\s+tasks\.tasks\.len\s*\(\s*\)\s*!=\s*replacing_tasks\.len\s*\(\s*\)\s*{}/
);
```

You should declare a `tasks` variable with value `ctx.accounts.tasks`.

```js
const saveTasks = __librs.match(
  /pub\s+fn\s+save_tasks\s*\(\s*ctx:\s*Context<\s*SaveTasks\s*>,\s*replacing_tasks\s*:\s*Vec\s*<\s*Task\s*>\s*\)\s*->\s*Result\s*<\s*()\s*>\s*{(.*?)Ok\(\(\)\)/s
)?.[1];
assert.match(saveTasks, /let\s+tasks\s*=\s*ctx\.accounts\.tasks\s*;/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        // Check that the task name is not too long.
        for task in replacing_tasks.iter() {
            if task.name.len() > 32 {
                return Err(ErrorCode::TaskNameTooLong.into());
            }
        }

        // Check that the task name is not too short.
        for task in replacing_tasks.iter() {
            if task.name.len() < 1 {
                return Err(ErrorCode::TaskNameTooShort.into());
            }
        }

        // Check that the task id is unique.
        for (i, task) in replacing_tasks.iter().enumerate() {
            for (j, other_task) in replacing_tasks.iter().enumerate() {
                if i != j && task.id == other_task.id {
                    return Err(ErrorCode::TaskIdNotUnique.into());
                }
            }
        }

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(replacing_tasks: Vec<Task>)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed, space = 8 + replacing_tasks.len() * (4 + (4 + 32) + 1), payer = user, seeds = [user.key().as_ref()], bump)]
    pub tasks: Account<'info, TasksAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}

#[error_code]
pub enum ErrorCode {
    TaskNameTooLong,
    TaskNameTooShort,
    TaskIdNotUnique,
}
```

## 19

### --description--

Within the `if` statement, declare a `new_space` variable with the new **total** size of the `tasks` account with the `replacing_tasks` data.

### --tests--

The `new_space` variable should be declared with a value of `8 + replacing_tasks.len() * (4 + (4 + 32) + 1)`.

```js
const saveTasks = __librs.match(
  /pub\s+fn\s+save_tasks\s*\(\s*ctx:\s*Context<\s*SaveTasks\s*>,\s*replacing_tasks\s*:\s*Vec\s*<\s*Task\s*>\s*\)\s*->\s*Result\s*<\s*()\s*>\s*{(.*?)Ok\(\(\)\)/s
)?.[1];
assert.match(
  saveTasks,
  /let\s+new_space\s*=\s*8\s*\+\s*replacing_tasks\.len\s*\(\s*\)\s*\*\s*\(\s*4\s*\+\s*\(\s*4\s*\+\s*32\s*\)\s*\+\s*1\s*\)/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        // Check that the task name is not too long.
        for task in replacing_tasks.iter() {
            if task.name.len() > 32 {
                return Err(ErrorCode::TaskNameTooLong.into());
            }
        }

        // Check that the task name is not too short.
        for task in replacing_tasks.iter() {
            if task.name.len() < 1 {
                return Err(ErrorCode::TaskNameTooShort.into());
            }
        }

        // Check that the task id is unique.
        for (i, task) in replacing_tasks.iter().enumerate() {
            for (j, other_task) in replacing_tasks.iter().enumerate() {
                if i != j && task.id == other_task.id {
                    return Err(ErrorCode::TaskIdNotUnique.into());
                }
            }
        }

        let tasks = &mut ctx.accounts.tasks;

        if tasks.tasks.len() != replacing_tasks.len() {}

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(replacing_tasks: Vec<Task>)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed, space = 8 + replacing_tasks.len() * (4 + (4 + 32) + 1), payer = user, seeds = [user.key().as_ref()], bump)]
    pub tasks: Account<'info, TasksAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}

#[error_code]
pub enum ErrorCode {
    TaskNameTooLong,
    TaskNameTooShort,
    TaskIdNotUnique,
}
```

## 20

### --description--

With the new space, the new rent exemption can be calculated:

```rust
let minimum_balance: u64 = Rent::get()?.minimum_balance(space);
```

Use the `new_space` to calculate the new rent exemption, and assign it to a `new_minimum_balance` variable.

### --tests--

The `new_minimum_balance` variable should be declared with a value of `Rent::get()?.minimum_balance(new_space)`.

```js
const saveTasks = __librs.match(
  /pub\s+fn\s+save_tasks\s*\(\s*ctx:\s*Context<\s*SaveTasks\s*>,\s*replacing_tasks\s*:\s*Vec\s*<\s*Task\s*>\s*\)\s*->\s*Result\s*<\s*()\s*>\s*{(.*?)Ok\(\(\)\)/s
)?.[1];
assert.match(
  saveTasks,
  /let\s+new_minimum_balance\s*=\s*Rent\s*::\s*get\s*\(\s*\)\s*\?\s*\.\s*minimum_balance\s*\(\s*new_space\s*\)/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        // Check that the task name is not too long.
        for task in replacing_tasks.iter() {
            if task.name.len() > 32 {
                return Err(ErrorCode::TaskNameTooLong.into());
            }
        }

        // Check that the task name is not too short.
        for task in replacing_tasks.iter() {
            if task.name.len() < 1 {
                return Err(ErrorCode::TaskNameTooShort.into());
            }
        }

        // Check that the task id is unique.
        for (i, task) in replacing_tasks.iter().enumerate() {
            for (j, other_task) in replacing_tasks.iter().enumerate() {
                if i != j && task.id == other_task.id {
                    return Err(ErrorCode::TaskIdNotUnique.into());
                }
            }
        }

        let tasks = &mut ctx.accounts.tasks;

        if tasks.tasks.len() != replacing_tasks.len() {
            let new_space = 8 + 4 + (4 + 32) + 1 * replacing_tasks.len();
        }

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(replacing_tasks: Vec<Task>)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed, space = 8 + replacing_tasks.len() * (4 + (4 + 32) + 1), payer = user, seeds = [user.key().as_ref()], bump)]
    pub tasks: Account<'info, TasksAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}

#[error_code]
pub enum ErrorCode {
    TaskNameTooLong,
    TaskNameTooShort,
    TaskIdNotUnique,
}
```

## 21

### --description--

An `Account` is just a wrapper around `AccountInfo`. The `tasks` account info is needed to get its current balance, and adjust the balance to the new minimum balance.

```rust
let account_info = &ctx.accounts.account.to_account_info();
```

Declare a `tasks_account_info` variable, and assign it the `tasks` account info.

### --tests--

The `tasks_account_info` variable should be declared with a value of `tasks.to_account_info()`.

```js
const saveTasks = __librs.match(
  /pub\s+fn\s+save_tasks\s*\(\s*ctx:\s*Context<\s*SaveTasks\s*>,\s*replacing_tasks\s*:\s*Vec\s*<\s*Task\s*>\s*\)\s*->\s*Result\s*<\s*()\s*>\s*{(.*?)Ok\(\(\)\)/s
)?.[1];
assert.match(
  saveTasks,
  /let\s+tasks_account_info\s*=\s*tasks\s*\.to_account_info\s*\(\s*\)/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        // Check that the task name is not too long.
        for task in replacing_tasks.iter() {
            if task.name.len() > 32 {
                return Err(ErrorCode::TaskNameTooLong.into());
            }
        }

        // Check that the task name is not too short.
        for task in replacing_tasks.iter() {
            if task.name.len() < 1 {
                return Err(ErrorCode::TaskNameTooShort.into());
            }
        }

        // Check that the task id is unique.
        for (i, task) in replacing_tasks.iter().enumerate() {
            for (j, other_task) in replacing_tasks.iter().enumerate() {
                if i != j && task.id == other_task.id {
                    return Err(ErrorCode::TaskIdNotUnique.into());
                }
            }
        }

        let tasks = &mut ctx.accounts.tasks;

        if tasks.tasks.len() != replacing_tasks.len() {
            let new_space = 8 + 4 + (4 + 32) + 1 * replacing_tasks.len();
            let new_minimum_balance = Rent::get()?.minimum_balance(new_space);
        }

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(replacing_tasks: Vec<Task>)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed, space = 8 + replacing_tasks.len() * (4 + (4 + 32) + 1), payer = user, seeds = [user.key().as_ref()], bump)]
    pub tasks: Account<'info, TasksAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}

#[error_code]
pub enum ErrorCode {
    TaskNameTooLong,
    TaskNameTooShort,
    TaskIdNotUnique,
}
```

## 22

### --description--

To get the difference in balance, the `saturating_sub` method can be used on the `new_minimum_balance` to ensure the balance is not negative.

Use `saturating_sub` to subtract `tasks_account_info.lamports()` from `new_minimum_balance`, and assign it to a `lamports_diff` variable.

### --tests--

The `lamports_diff` variable should be declared with a value of `new_minimum_balance.saturating_sub(tasks_account_info.lamports())`.

```js
const saveTasks = __librs.match(
  /pub\s+fn\s+save_tasks\s*\(\s*ctx:\s*Context<\s*SaveTasks\s*>,\s*replacing_tasks\s*:\s*Vec\s*<\s*Task\s*>\s*\)\s*->\s*Result\s*<\s*()\s*>\s*{(.*?)Ok\(\(\)\)/s
)?.[1];
assert.match(
  saveTasks,
  /let\s+lamports_diff\s*=\s*new_minimum_balance\s*\.\s*saturating_sub\s*\(\s*tasks_account_info\s*\.\s*lamports\s*\(\s*\)\s*\)/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        // Check that the task name is not too long.
        for task in replacing_tasks.iter() {
            if task.name.len() > 32 {
                return Err(ErrorCode::TaskNameTooLong.into());
            }
        }

        // Check that the task name is not too short.
        for task in replacing_tasks.iter() {
            if task.name.len() < 1 {
                return Err(ErrorCode::TaskNameTooShort.into());
            }
        }

        // Check that the task id is unique.
        for (i, task) in replacing_tasks.iter().enumerate() {
            for (j, other_task) in replacing_tasks.iter().enumerate() {
                if i != j && task.id == other_task.id {
                    return Err(ErrorCode::TaskIdNotUnique.into());
                }
            }
        }

        let tasks = &mut ctx.accounts.tasks;

        if tasks.tasks.len() != replacing_tasks.len() {
            let new_space = 8 + 4 + (4 + 32) + 1 * replacing_tasks.len();
            let new_minimum_balance = Rent::get()?.minimum_balance(new_space);
            let tasks_account_info = tasks.to_account_info();
        }

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(replacing_tasks: Vec<Task>)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed, space = 8 + replacing_tasks.len() * (4 + (4 + 32) + 1), payer = user, seeds = [user.key().as_ref()], bump)]
    pub tasks: Account<'info, TasksAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}

#[error_code]
pub enum ErrorCode {
    TaskNameTooLong,
    TaskNameTooShort,
    TaskIdNotUnique,
}
```

## 23

### --description--

A mutable account's balance can be adjusted by mutably borrowing its lamports and adjusting them:

```rust
**ctx.accounts.mutable_account.to_account_info().try_borrow_mut_lamports()? = 1;
```

Subtract the `lamports_diff` from the `user` account.

### --tests--

You should have `**ctx.accounts.user.to_account_info().try_borrow_mut_lamports()? -= lamports_diff;`.

```js
const saveTasks = __librs.match(
  /pub\s+fn\s+save_tasks\s*\(\s*ctx:\s*Context<\s*SaveTasks\s*>,\s*replacing_tasks\s*:\s*Vec\s*<\s*Task\s*>\s*\)\s*->\s*Result\s*<\s*()\s*>\s*{(.*?)Ok\(\(\)\)/s
)?.[1];
assert.match(
  saveTasks,
  /\*\*ctx\.accounts\.user\.to_account_info\s*\(\s*\)\s*\.\s*try_borrow_mut_lamports\s*\(\s*\)\s*\?\s*-=\s*lamports_diff\s*;/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        // Check that the task name is not too long.
        for task in replacing_tasks.iter() {
            if task.name.len() > 32 {
                return Err(ErrorCode::TaskNameTooLong.into());
            }
        }

        // Check that the task name is not too short.
        for task in replacing_tasks.iter() {
            if task.name.len() < 1 {
                return Err(ErrorCode::TaskNameTooShort.into());
            }
        }

        // Check that the task id is unique.
        for (i, task) in replacing_tasks.iter().enumerate() {
            for (j, other_task) in replacing_tasks.iter().enumerate() {
                if i != j && task.id == other_task.id {
                    return Err(ErrorCode::TaskIdNotUnique.into());
                }
            }
        }

        let tasks = &mut ctx.accounts.tasks;

        if tasks.tasks.len() != replacing_tasks.len() {
            let new_space = 8 + 4 + (4 + 32) + 1 * replacing_tasks.len();
            let new_minimum_balance = Rent::get()?.minimum_balance(new_space);
            let tasks_account_info = tasks.to_account_info();
            let lamports_diff = new_minimum_balance.saturating_sub(tasks_account_info.lamports());
        }

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(replacing_tasks: Vec<Task>)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed, space = 8 + replacing_tasks.len() * (4 + (4 + 32) + 1), payer = user, seeds = [user.key().as_ref()], bump)]
    pub tasks: Account<'info, TasksAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}

#[error_code]
pub enum ErrorCode {
    TaskNameTooLong,
    TaskNameTooShort,
    TaskIdNotUnique,
}
```

## 24

### --description--

Now, add the `lamports_diff` to the `tasks` account.

### --tests--

You should have `**tasks_account_info.try_borrow_mut_lamports()? += lamports_diff;`.

```js
const saveTasks = __librs.match(
  /pub\s+fn\s+save_tasks\s*\(\s*ctx:\s*Context<\s*SaveTasks\s*>,\s*replacing_tasks\s*:\s*Vec\s*<\s*Task\s*>\s*\)\s*->\s*Result\s*<\s*()\s*>\s*{(.*?)Ok\(\(\)\)/s
)?.[1];
assert.match(
  saveTasks,
  /\*\*tasks_account_info\s*\.\s*try_borrow_mut_lamports\s*\(\s*\)\s*\?\s*\+=\s*lamports_diff\s*;/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        // Check that the task name is not too long.
        for task in replacing_tasks.iter() {
            if task.name.len() > 32 {
                return Err(ErrorCode::TaskNameTooLong.into());
            }
        }

        // Check that the task name is not too short.
        for task in replacing_tasks.iter() {
            if task.name.len() < 1 {
                return Err(ErrorCode::TaskNameTooShort.into());
            }
        }

        // Check that the task id is unique.
        for (i, task) in replacing_tasks.iter().enumerate() {
            for (j, other_task) in replacing_tasks.iter().enumerate() {
                if i != j && task.id == other_task.id {
                    return Err(ErrorCode::TaskIdNotUnique.into());
                }
            }
        }

        let tasks = &mut ctx.accounts.tasks;

        if tasks.tasks.len() != replacing_tasks.len() {
            let new_space = 8 + 4 + (4 + 32) + 1 * replacing_tasks.len();
            let new_minimum_balance = Rent::get()?.minimum_balance(new_space);
            let tasks_account_info = tasks.to_account_info();
            let lamports_diff = new_minimum_balance.saturating_sub(tasks_account_info.lamports());

            **ctx
                .accounts
                .user
                .to_account_info()
                .try_borrow_mut_lamports()? -= lamports_diff;
        }

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(replacing_tasks: Vec<Task>)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed, space = 8 + replacing_tasks.len() * (4 + (4 + 32) + 1), payer = user, seeds = [user.key().as_ref()], bump)]
    pub tasks: Account<'info, TasksAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}

#[error_code]
pub enum ErrorCode {
    TaskNameTooLong,
    TaskNameTooShort,
    TaskIdNotUnique,
}
```

## 25

### --description--

Now that the `tasks` account has the correct balance, the `realloc` method can be called to reallocate the account's data:

```rust
account_info.realloc(new_space, zero_initialize_memory)?;
```

The `realloc` method takes the new space, and a boolean to <dfn title="If true, the new memory is ensured to not have any old, stale data left behind from previous use.">zero-initialize</dfn> the new memory.

Call `realloc` on the `tasks_account_info` with the `new_space` and `false`.

### --tests--

You should have `tasks_account_info.realloc(new_space, false)?;`.

```js
const saveTasks = __librs.match(
  /pub\s+fn\s+save_tasks\s*\(\s*ctx:\s*Context<\s*SaveTasks\s*>,\s*replacing_tasks\s*:\s*Vec\s*<\s*Task\s*>\s*\)\s*->\s*Result\s*<\s*()\s*>\s*{(.*?)Ok\(\(\)\)/s
)?.[1];
assert.match(
  saveTasks,
  /tasks_account_info\s*\.\s*realloc\s*\(\s*new_space\s*,\s*false\s*\)\s*\?/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        // Check that the task name is not too long.
        for task in replacing_tasks.iter() {
            if task.name.len() > 32 {
                return Err(ErrorCode::TaskNameTooLong.into());
            }
        }

        // Check that the task name is not too short.
        for task in replacing_tasks.iter() {
            if task.name.len() < 1 {
                return Err(ErrorCode::TaskNameTooShort.into());
            }
        }

        // Check that the task id is unique.
        for (i, task) in replacing_tasks.iter().enumerate() {
            for (j, other_task) in replacing_tasks.iter().enumerate() {
                if i != j && task.id == other_task.id {
                    return Err(ErrorCode::TaskIdNotUnique.into());
                }
            }
        }

        let tasks = &mut ctx.accounts.tasks;

        if tasks.tasks.len() != replacing_tasks.len() {
            let new_space = 8 + 4 + (4 + 32) + 1 * replacing_tasks.len();
            let new_minimum_balance = Rent::get()?.minimum_balance(new_space);
            let tasks_account_info = tasks.to_account_info();
            let lamports_diff = new_minimum_balance.saturating_sub(tasks_account_info.lamports());

            **ctx
                .accounts
                .user
                .to_account_info()
                .try_borrow_mut_lamports()? -= lamports_diff;
            **tasks_account_info.try_borrow_mut_lamports()? += lamports_diff;
        }

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(replacing_tasks: Vec<Task>)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed, space = 8 + replacing_tasks.len() * (4 + (4 + 32) + 1), payer = user, seeds = [user.key().as_ref()], bump)]
    pub tasks: Account<'info, TasksAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}

#[error_code]
pub enum ErrorCode {
    TaskNameTooLong,
    TaskNameTooShort,
    TaskIdNotUnique,
}
```

## 26

### --description--

After the `if` statement, set the `tasks` account's `tasks` data to `replacing_tasks`.

### --tests--

You should have `tasks.tasks = replacing_tasks;`.

```js
const saveTasks = __librs.match(
  /pub\s+fn\s+save_tasks\s*\(\s*ctx:\s*Context<\s*SaveTasks\s*>,\s*replacing_tasks\s*:\s*Vec\s*<\s*Task\s*>\s*\)\s*->\s*Result\s*<\s*()\s*>\s*{(.*?)Ok\(\(\)\)/s
)?.[1];
assert.match(saveTasks, /tasks\s*\.\s*tasks\s*=\s*replacing_tasks\s*;/);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        // Check that the task name is not too long.
        for task in replacing_tasks.iter() {
            if task.name.len() > 32 {
                return Err(ErrorCode::TaskNameTooLong.into());
            }
        }

        // Check that the task name is not too short.
        for task in replacing_tasks.iter() {
            if task.name.len() < 1 {
                return Err(ErrorCode::TaskNameTooShort.into());
            }
        }

        // Check that the task id is unique.
        for (i, task) in replacing_tasks.iter().enumerate() {
            for (j, other_task) in replacing_tasks.iter().enumerate() {
                if i != j && task.id == other_task.id {
                    return Err(ErrorCode::TaskIdNotUnique.into());
                }
            }
        }

        let tasks = &mut ctx.accounts.tasks;

        if tasks.tasks.len() != replacing_tasks.len() {
            let new_space = 8 + 4 + (4 + 32) + 1 * replacing_tasks.len();
            let new_minimum_balance = Rent::get()?.minimum_balance(new_space);
            let tasks_account_info = tasks.to_account_info();
            let lamports_diff = new_minimum_balance.saturating_sub(tasks_account_info.lamports());

            **ctx
                .accounts
                .user
                .to_account_info()
                .try_borrow_mut_lamports()? -= lamports_diff;
            **tasks_account_info.try_borrow_mut_lamports()? += lamports_diff;

            tasks_account_info.realloc(new_space, false)?;
        }

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(replacing_tasks: Vec<Task>)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed, space = 8 + replacing_tasks.len() * (4 + (4 + 32) + 1), payer = user, seeds = [user.key().as_ref()], bump)]
    pub tasks: Account<'info, TasksAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}

#[error_code]
pub enum ErrorCode {
    TaskNameTooLong,
    TaskNameTooShort,
    TaskIdNotUnique,
}
```

## 27

### --description--

Lastly within the `save_tasks` instruction handle, adjust the `if` statement conditional to only realloc if the replacing tasks space is less than the currently allocated space.

### --tests--

The `if` statement conditional should be `if tasks.tasks.len() < replacing_tasks.len() {`.

```js
const saveTasks = __librs.match(
  /pub\s+fn\s+save_tasks\s*\(\s*ctx:\s*Context<\s*SaveTasks\s*>,\s*replacing_tasks\s*:\s*Vec\s*<\s*Task\s*>\s*\)\s*->\s*Result\s*<\s*()\s*>\s*{(.*?)Ok\(\(\)\)/s
)?.[1];
assert.match(
  saveTasks,
  /if\s+tasks\s*\.\s*tasks\s*\.\s*len\s*\(\s*\)\s*<\s*replacing_tasks\s*\.\s*len\s*\(\s*\)\s*{/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        // Check that the task name is not too long.
        for task in replacing_tasks.iter() {
            if task.name.len() > 32 {
                return Err(ErrorCode::TaskNameTooLong.into());
            }
        }

        // Check that the task name is not too short.
        for task in replacing_tasks.iter() {
            if task.name.len() < 1 {
                return Err(ErrorCode::TaskNameTooShort.into());
            }
        }

        // Check that the task id is unique.
        for (i, task) in replacing_tasks.iter().enumerate() {
            for (j, other_task) in replacing_tasks.iter().enumerate() {
                if i != j && task.id == other_task.id {
                    return Err(ErrorCode::TaskIdNotUnique.into());
                }
            }
        }

        let tasks = &mut ctx.accounts.tasks;

        if tasks.tasks.len() != replacing_tasks.len() {
            let new_space = 8 + 4 + (4 + 32) + 1 * replacing_tasks.len();
            let new_minimum_balance = Rent::get()?.minimum_balance(new_space);
            let tasks_account_info = tasks.to_account_info();
            let lamports_diff = new_minimum_balance.saturating_sub(tasks_account_info.lamports());

            **ctx
                .accounts
                .user
                .to_account_info()
                .try_borrow_mut_lamports()? -= lamports_diff;
            **tasks_account_info.try_borrow_mut_lamports()? += lamports_diff;

            tasks_account_info.realloc(new_space, false)?;
        }

        tasks.tasks = replacing_tasks;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(replacing_tasks: Vec<Task>)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed, space = 8 + replacing_tasks.len() * (4 + (4 + 32) + 1), payer = user, seeds = [user.key().as_ref()], bump)]
    pub tasks: Account<'info, TasksAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}

#[error_code]
pub enum ErrorCode {
    TaskNameTooLong,
    TaskNameTooShort,
    TaskIdNotUnique,
}
```

## 28

### --description--

Finally for the program, use the `msg` attribute macro to add human-readable error messages to the `ErrorCode` enum:

```rust
#[error_code]
enum MyErrorEnum {
    #[msg("My error message")]
    MyError,
}
```

### --tests--

The `TaskNameTooLong` variant should be annotated with a message.

```js
const errorCode = __librs.match(
  /#\[error_code\]\s*pub\s+enum\s+ErrorCode\s*{([\s\S]*?)}/
)?.[1];
assert.match(
  errorCode,
  /#[\s\n]*msg\s*\(\s*"[\w\s]{1,}"\)\s*\n\s*TaskNameTooLong\s*,/
);
```

The `TaskNameTooShort` variant should be annotated with a message.

```js
const errorCode = __librs.match(
  /#\[error_code\]\s*pub\s+enum\s+ErrorCode\s*{([\s\S]*?)}/
)?.[1];
assert.match(
  errorCode,
  /#[\s\n]*msg\s*\(\s*"[\w\s]{1,}"\)\s*\n\s*TaskNameTooShort\s*,/
);
```

The `TaskIdNotUnique` variant should be annotated with a message.

```js
const errorCode = __librs.match(
  /#\[error_code\]\s*pub\s+enum\s+ErrorCode\s*{([\s\S]*?)}/
)?.[1];
assert.match(
  errorCode,
  /#[\s\n]*msg\s*\(\s*"[\w\s]{1,}"\)\s*\n\s*TaskIdNotUnique\s*,/
);
```

### --before-all--

```js
const __librs = await __helpers.getFile(
  `${project.dashedName}/todo/programs/todo/src/lib.rs`
);
global.__librs = __librs;
```

### --after-all--

```js
delete global.__librs;
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        // Check that the task name is not too long.
        for task in replacing_tasks.iter() {
            if task.name.len() > 32 {
                return Err(ErrorCode::TaskNameTooLong.into());
            }
        }

        // Check that the task name is not too short.
        for task in replacing_tasks.iter() {
            if task.name.len() < 1 {
                return Err(ErrorCode::TaskNameTooShort.into());
            }
        }

        // Check that the task id is unique.
        for (i, task) in replacing_tasks.iter().enumerate() {
            for (j, other_task) in replacing_tasks.iter().enumerate() {
                if i != j && task.id == other_task.id {
                    return Err(ErrorCode::TaskIdNotUnique.into());
                }
            }
        }

        let tasks = &mut ctx.accounts.tasks;

        if tasks.tasks.len() < replacing_tasks.len() {
            let new_space = 8 + 4 + (4 + 32) + 1 * replacing_tasks.len();
            let new_minimum_balance = Rent::get()?.minimum_balance(new_space);
            let tasks_account_info = tasks.to_account_info();
            let lamports_diff = new_minimum_balance.saturating_sub(tasks_account_info.lamports());

            **ctx
                .accounts
                .user
                .to_account_info()
                .try_borrow_mut_lamports()? -= lamports_diff;
            **tasks_account_info.try_borrow_mut_lamports()? += lamports_diff;

            tasks_account_info.realloc(new_space, false)?;
        }

        tasks.tasks = replacing_tasks;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(replacing_tasks: Vec<Task>)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed, space = 8 + replacing_tasks.len() * (4 + (4 + 32) + 1), payer = user, seeds = [user.key().as_ref()], bump)]
    pub tasks: Account<'info, TasksAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}

#[error_code]
pub enum ErrorCode {
    TaskNameTooLong,
    TaskNameTooShort,
    TaskIdNotUnique,
}
```

## 29

### --description--

Build the program to get the IDL for your client app.

### --tests--

You should build the program.

```js
const { access, constants } = await import('fs/promises');
// See if `target/types/todo.ts` exists
await access(
  join(project.dashedName, 'todo/target/types/todo.ts'),
  constants.F_OK
);
```

### --seed--

#### --"learn-how-to-get-off-localhost/todo/programs/todo/src/lib.rs"--

```rust
use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        // Check that the task name is not too long.
        for task in replacing_tasks.iter() {
            if task.name.len() > 32 {
                return Err(ErrorCode::TaskNameTooLong.into());
            }
        }

        // Check that the task name is not too short.
        for task in replacing_tasks.iter() {
            if task.name.len() < 1 {
                return Err(ErrorCode::TaskNameTooShort.into());
            }
        }

        // Check that the task id is unique.
        for (i, task) in replacing_tasks.iter().enumerate() {
            for (j, other_task) in replacing_tasks.iter().enumerate() {
                if i != j && task.id == other_task.id {
                    return Err(ErrorCode::TaskIdNotUnique.into());
                }
            }
        }

        let tasks = &mut ctx.accounts.tasks;

        if tasks.tasks.len() < replacing_tasks.len() {
            let new_space = 8 + 4 + (4 + 32) + 1 * replacing_tasks.len();
            let new_minimum_balance = Rent::get()?.minimum_balance(new_space);
            let tasks_account_info = tasks.to_account_info();
            let lamports_diff = new_minimum_balance.saturating_sub(tasks_account_info.lamports());

            **ctx
                .accounts
                .user
                .to_account_info()
                .try_borrow_mut_lamports()? -= lamports_diff;
            **tasks_account_info.try_borrow_mut_lamports()? += lamports_diff;

            tasks_account_info.realloc(new_space, false)?;
        }

        tasks.tasks = replacing_tasks;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(replacing_tasks: Vec<Task>)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed, space = 8 + replacing_tasks.len() * (4 + (4 + 32) + 1), payer = user, seeds = [user.key().as_ref()], bump)]
    pub tasks: Account<'info, TasksAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct TasksAccount {
    pub tasks: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    pub name: String,
    pub completed: bool,
}

#[error_code]
pub enum ErrorCode {
    #[msg("The task name must be less than 32 characters.")]
    TaskNameTooLong,
    #[msg("The task name must be at least 1 character.")]
    TaskNameTooShort,
    #[msg("The task id must be unique.")]
    TaskIdNotUnique,
}
```

## 30

### --description--

With the program complete, the client app can be wired to use it. The `app/` directory has a React app built with Vite. If you do not know React, do not worry; very little of the integration is React-specific.

Within `app/src/app.tsx`, under the `TODO:1` comment, attach the `Buffer` to the `window`.

### --tests--

You should have `window.Buffer = Buffer`.

```js
const expectedCodeString = 'window.Buffer = Buffer;';
const actualCodestring = __babelisedCode.generate(__babelisedCode.parsedCode, {
  compact: true
});
assert.include(actualCodestring, expectedCodeString);
```

You should import `Buffer` from `buffer`.

```js
const importDeclaration = __babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === 'buffer';
});
assert.exists(importDeclaration, 'You should import from `buffer`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(importSpecifiers, 'Buffer');
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
global.__babelisedCode = new __helpers.Babeliser(codeString);
```

### --after-all--

```js
delete global.__babelisedCode;
```

## 31

### --description--

Within `app/` use `yarn` to install the `@solana/web3.js` package.

### --tests--

You should have `@solana/web3.js` in your `package.json` dependencies.

```js
const packageJson = JSON.parse(
  await __helpers.getFile(join(project.dashedName, 'todo/app/package.json'))
);
assert.property(
  packageJson.dependencies,
  '@solana/web3.js',
  'The `package.json` file should have a `@solana/web3.js` dependency.'
);
```

## 32

### --description--

Under the `TODO:2` comment, declare a `PROGRAM_ID` variable, and assign it the value of the program's id as a `PublicKey`.

### --tests--

You should have `const PROGRAM_ID = new PublicKey("...")`.

```js
const { stdout } = await __helpers.getCommandOutput(
  'anchor keys list',
  `${project.dashedName}/todo`
);
const expectedProgramId = stdout.match(/[^\s]{44}/)?.[0];
const actualProgramId = __babelisedCode.parsedCode.match(
  /PublicKey\(("|'|`)([^'"`]+)\1\)/
)?.[2];
assert.equal(actualProgramId, expectedProgramId);
```

You should import `PublicKey` from `@solana/web3.js`.

```js
const importDeclaration = __babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === '@solana/web3.js';
});
assert.exists(importDeclaration, 'You should import from `@solana/web3.js`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(importSpecifiers, 'PublicKey');
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
global.__babelisedCode = new __helpers.Babeliser(codeString);
```

### --after-all--

```js
delete global.__babelisedCode;
```

## 33

### --description--

Under the `TODO:3` comment, declare an `ENDPOINT` variable, and assign it the value of `import.meta.VITE_SOLANA_CONNECTION_URL` or default to `http://localhost:8899`.

**Note:** `import.meta.VITE_*` is a way to access environemnt variables in a Vitejs app during build time.

### --tests--

You should have `const ENDPOINT = import.meta.VITE_SOLANA_CONNECTION_URL || "http://localhost:8899";`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
assert.match(
  codeString,
  /const\s+ENDPOINT\s*=\s*import\.meta\.VITE_SOLANA_CONNECTION_URL\s*\|\|/
);
```

## 34

### --description--

Under the `TODO:4` comment, declare a `connection` variable, and assign it the value of a new `Connection` instance with the `ENDPOINT`, and choose a suitable commitment level for a production app.

### --tests--

You should have `const connection = new Connection(ENDPOINT, ...);`.

```js
const variableDeclaration = __babelisedCode
  .getVariableDeclarations()
  .find(v => {
    return v.declarations?.[0]?.id?.name === 'connection';
  });
assert.exists(
  variableDeclaration,
  'A variable named `connection` should exist'
);
const newExpression = variableDeclaration.declarations?.[0]?.init;
const callee = newExpression?.callee;
assert.equal(callee?.name, 'Connection');
const arguments = newExpression?.arguments;
assert.equal(arguments?.[0]?.name, 'ENDPOINT');
```

The commitment config should be `"confirmed"` or `"finalized"`.

```js
const variableDeclaration = __babelisedCode
  .getVariableDeclarations()
  .find(v => {
    return v.declarations?.[0]?.id?.name === 'connection';
  });
assert.exists(
  variableDeclaration,
  'A variable named `connection` should exist'
);
const newExpression = variableDeclaration.declarations?.[0]?.init;
const arguments = newExpression?.arguments;
assert.include(['confirmed', 'finalized'], arguments?.[1]?.value);
```

You should import `Connection` from `@solana/web3.js`.

```js
const importDeclaration = __babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === '@solana/web3.js';
});
assert.exists(importDeclaration, 'You should import from `@solana/web3.js`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(importSpecifiers, 'Connection');
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
global.__babelisedCode = new __helpers.Babeliser(codeString);
```

### --after-all--

```js
delete global.__babelisedCode;
```

## 35

### --description--

Within `app/` use `yarn` to install the `@solana/wallet-adapter-phantom` package.

### --tests--

You should have `@solana/wallet-adapter-phantom` in your `package.json` dependencies.

```js
const packageJson = JSON.parse(
  await __helpers.getFile(join(project.dashedName, 'todo/app/package.json'))
);
assert.property(
  packageJson.dependencies,
  '@solana/wallet-adapter-phantom',
  'The `package.json` file should have a `@solana/wallet-adapter-phantom` dependency.'
);
```

## 36

### --description--

Under the `TODO:5` comment, declare a `wallet` variable as a new instance of the Phantom wallet adapter.

### --tests--

You should have `const wallet = new PhantomWalletAdapter()`.

```js
const variableDeclaration = __babelisedCode
  .getVariableDeclarations()
  .find(v => {
    return v.declarations?.[0]?.id?.name === 'wallet';
  });
assert.exists(variableDeclaration, 'A variable named `wallet` should exist');
const newExpression = variableDeclaration.declarations?.[0]?.init;
const callee = newExpression?.callee;
assert.equal(callee?.name, 'PhantomWalletAdapter');
```

You should import `PhantomWalletAdapter` from `@solana/wallet-adapter-phantom`.

```js
const importDeclaration = __babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === '@solana/wallet-adapter-phantom';
});
assert.exists(
  importDeclaration,
  'There should be an import from `@solana/wallet-adapter-phantom`'
);
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(importSpecifiers, 'PhantomWalletAdapter');
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
global.__babelisedCode = new __helpers.Babeliser(codeString);
```

### --after-all--

```js
delete global.__babelisedCode;
```

## 37

### --description--

Within `app/` use `yarn` to install the `@coral-xyz/anchor` package.

### --tests--

You should have `@coral-xyz/anchor` in your `package.json` dependencies.

```js
const packageJson = JSON.parse(
  await __helpers.getFile(join(project.dashedName, 'todo/app/package.json'))
);
assert.property(
  packageJson.dependencies,
  '@coral-xyz/anchor',
  'The `package.json` file should have a `@coral-xyz/anchor` dependency.'
);
```

## 38

### --description--

Under the `TODO:6` comment, declare a React context variable, `ProgramContext`, for the program in order to access the program throughout the application components.

```typescript
const MyContext = createContext<Type | null>(null);
```

### --tests--

You should have `const ProgramContext = createContext<Program<Todo> | null>(null);`.

```js
const variableDeclaration = __babelisedCode
  .getVariableDeclarations()
  .find(v => {
    return v.declarations?.[0]?.id?.name === 'ProgramContext';
  });
assert.exists(
  variableDeclaration,
  'A variable named `ProgramContext` should exist'
);
const callExpression = variableDeclaration.declarations?.[0]?.init;
const { callee, arguments, typeParameters } = callExpression;
assert.equal(callee?.name, 'createContext');
const arguements = callExpression?.arguments;
assert.equal(arguements?.[0]?.value, null);
```

You should import `createContext` from `react`.

```js
const importDeclaration = __babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === 'react';
});
assert.exists(importDeclaration, 'There should be an import from `react`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(importSpecifiers, 'createContext');
```

You should import `Program` from `@coral-xyz/anchor`.

```js
const importDeclaration = __babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === '@coral-xyz/anchor';
});
assert.exists(
  importDeclaration,
  'There should be an import from `@coral-xyz/anchor`'
);
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(importSpecifiers, 'Program');
```

### --before-all--

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
global.__babelisedCode = new __helpers.Babeliser(codeString);
```

### --after-all--

```js
delete global.__babelisedCode;
```

## 39

### --description--

Under the `TODO:7` comment, declare a program state variable:

```typescript
const [program, setProgram] = useState<Type | null>(null);
```

### --tests--

You should have `const [program, setProgram] = useState<Program<Todo> | null>(null);`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
assert.match(
  codeString,
  /const\s*\[\s*program\s*,\s*setProgram\s*\]\s*=\s*useState\s*<\s*Program\s*<\s*Todo\s*>\s*\|\s*null\s*>\s*\(\s*null\s*\)/
);
```

## 40

### --description--

Under the `TODO:8` comment, connect to the wallet.

### --tests--

You should have `await wallet.connect()`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
assert.match(codeString, /await\s+wallet\s*\.\s*connect\s*\(\s*\)/);
```

## 41

### --description--

Under the `TODO:9` comment, add an `if` statement with a condition to check if the wallet is actually connected. You can use the provided `isWalletConnected` function from `./utils.ts`.

### --tests--

You should have `if (isWalletConnected(wallet)) {}`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
assert.match(
  codeString,
  /if\s*\(\s*isWalletConnected\s*\(\s*wallet\s*\)\s*\)\s*{\s*}/
);
```

You should import `isWalletConnected` from `./utils`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === './utils';
});
assert.exists(importDeclaration, 'There should be an import from `./utils`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(importSpecifiers, 'isWalletConnected');
```

## 42

### --description--

Under the `TODO:10` comment, and within the `if` statement, declare a `provider` variable as a new Anchor provider.

### --tests--

You should have `const provider = new AnchorProvider(connection, wallet, {})`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
assert.match(
  codeString,
  /const\s+provider\s*=\s*new\s+AnchorProvider\s*\(\s*connection\s*,\s*wallet\s*,\s*\{\s*\}\s*\)/
);
```

You should import `AnchorProvider` from `@coral-xyz/anchor`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === '@coral-xyz/anchor';
});
assert.exists(
  importDeclaration,
  'There should be an import from `@coral-xyz/anchor`'
);
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(importSpecifiers, 'AnchorProvider');
```

## 43

### --description--

Under the `TODO:11` comment, and within the `if` statement, declare a `program` variable as an instance of an Anchor program.

### --tests--

You should have `const program = new Program(IDL, PROGRAM_ID, provider)`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
assert.match(
  codeString,
  /const\s+program\s*=\s*new\s+Program\s*\(\s*IDL\s*,\s*PROGRAM_ID\s*,\s*provider\s*\)/
);
```

You should import `IDL` from `../../target/types/todo`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === '../../target/types/todo';
});
assert.exists(
  importDeclaration,
  'There should be an import from `../../target/types/todo`'
);
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(importSpecifiers, 'IDL');
```

## 44

### --description--

Under the `TODO:12` comment, and within the `if` statment, use the `setProgram` function to set the `program` state variable to `program`.

### --tests--

You should have `setProgram(program)`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
assert.match(codeString, /setProgram\s*\(\s*program\s*\)/);
```

## 45

### --description--

Under the `TODO:13` comment, conditionally either render the `Landing` page or the `LogIn` page based on whether the `program` is set:

```tsx
<>{condition ? <Landing /> : <LogIn connectWallet={connectWallet} />}</>
```

### --tests--

You should have `<>{program ? <Landing /> : LogIn connectWallet={connectWallet} />}</>`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
assert.match(
  codeString,
  /<>\s*\{\s*program\s*\?\s*<\s*Landing\s*\/\s*>\s*:\s*<\s*LogIn\s*connectWallet\s*=\s*\{\s*connectWallet\s*\}\s*\/\s*>\s*\}\s*<\/>/
);
```

## 46

### --description--

Under the `TODO:14` comment, replace the component fragment (`<></>`) with a context provider for the program:

```tsx
<ProgramContext.Provider value={program}></ProgramContext.Provider>
```

### --tests--

You should have `<ProgramContext.Provider value={program}>{program ? <Landing /> : LogIn connectWallet={connectWallet} />}</ProgramContext.Provider>`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
assert.match(
  codeString,
  /<\s*ProgramContext\s*\.\s*Provider\s*value\s*=\s*\{\s*program\s*\}\s*>\s*\{\s*program\s*\?\s*<\s*Landing\s*\/\s*>\s*:\s*<\s*LogIn\s*connectWallet\s*=\s*\{\s*connectWallet\s*\}\s*\/\s*>\s*\}\s*<\/\s*ProgramContext\s*\.\s*Provider\s*>/
);
```

## 47

### --description--

The `Landing` component fetches any tasks associated with a connected account, and handles the main logic for displaying ToDos.

Under the `TODO:15` comment, declare a `program` variable with the program context hook:

```js
const state = useContext(MyContext);
```

### --tests--

You should have `const program = useContext(ProgramContext)`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
assert.match(
  codeString,
  /const\s+program\s*=\s*useContext\s*\(\s*ProgramContext\s*\)/
);
```

You should import `useContext` from `react`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
const babelisedCode = new __helpers.Babeliser(codeString);
const importDeclaration = babelisedCode.getImportDeclarations().find(i => {
  return i.source.value === 'react';
});
assert.exists(importDeclaration, 'There should be an import from `react`');
const importSpecifiers = importDeclaration.specifiers.map(s => s.imported.name);
assert.include(importSpecifiers, 'useContext');
```

## 48

### --description--

Under the `TODO:16` comment, add an `if` statement with a condition to check if the program exists.

### --tests--

You should have `if (program) {}`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
assert.match(codeString, /if\s*\(\s*program\s*\)\s*{\s*}/);
```

## 49

### --description--

Under the `TODO:17` comment, and within the `if` statement, declare a `tasksPublicKey` variable with a value of the program derived address.

### --tests--

You should have `const [tasksPublicKey, _] = PublicKey.findProgramAddressSync([program.provider.publicKey.toBuffer()], PROGRAM_ID)`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
assert.match(
  codeString,
  /const\s*\[\s*tasksPublicKey\s*,\s*_\s*\]\s*=\s*PublicKey\s*\.\s*findProgramAddressSync\s*\(\s*\[\s*program\s*\.\s*provider\s*\.\s*publicKey\s*\.\s*toBuffer\s*\(\s*\)\s*\]\s*,\s*PROGRAM_ID\s*\)/
);
```

## 50

### --description--

Under the `TODO:18` comment, and within the `if` statement, declare a `tasks` variable with a value of the program's task account.

### --tests--

You should have `const tasks = await program.account.tasksAccount.fetch(tasksPublicKey)`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
assert.match(
  codeString,
  /const\s*tasks\s*=\s*await\s*program\s*\.\s*account\s*\.\s*tasksAccount\s*\.\s*fetch\s*\(\s*tasksPublicKey\s*\)/
);
```

## 51

### --description--

Under the `TODO:19` comment, and within the `if` statement, call the `setTasks` function with the tasks data.

### --tests--

You should have `setTasks(tasks.tasks)`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
assert.match(codeString, /setTasks\s*\(\s*tasks\s*\.\s*tasks\s*\)/);
```

## 52

### --description--

Under the `TODO:20` comment, ensure the program exists, derive the program address, and save the `tasks` state to the program's task account.

### --tests--

You should have `if (program) { ... }`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
assert.match(codeString, /if\s*\(\s*program\s*\)\s*{/);
```

You should have `const [tasksPublicKey, _] = PublicKey.findProgramAddressSync([program.provider.publicKey.toBuffer()], PROGRAM_ID)`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
assert.match(
  codeString,
  /const\s*\[\s*tasksPublicKey\s*,\s*_\s*\]\s*=\s*PublicKey\s*\.\s*findProgramAddressSync\s*\(\s*\[\s*program\s*\.\s*provider\s*\.\s*publicKey\s*\.\s*toBuffer\s*\(\s*\)\s*\]\s*,\s*PROGRAM_ID\s*\)/
);
```

You should have `await program.methods.saveTasks(tasks).accounts({ tasks: tasksPublicKey }).rpc()`.

```js
const codeString = await __helpers.getFile(
  join(project.dashedName, 'todo/app/src/app.tsx')
);
assert.match(
  codeString,
  /await\s*program\s*\.\s*methods\s*\.\s*saveTasks\s*\(\s*tasks\s*\)\s*\.\s*accounts\s*\(\s*\{\s*tasks\s*:\s*tasksPublicKey\s*\}\s*\)\s*\.\s*rpc\s*\(\s*\)/
);
```

## 53

### --description--

Your client app is finished!

Before testing, set the environment variables. Within `todo/` create a `.env` file, and add `VITE_SOLANA_CONNECTION_URL=http://localhost:8899`.

### --tests--

You should create a `todo/.env` file.

```js
const { access, constants } = await import('fs/promises');
await access(join(project.dashedName, 'todo/.env'), constants.F_OK);
```

You should set the `VITE_SOLANA_CONNECTION_URL` variable to `http://localhost:8899`.

```js
const { readFile } = await import('fs/promises');
const envFile = await readFile(join(project.dashedName, 'todo/.env'), 'utf8');
assert.match(
  envFile,
  /VITE_SOLANA_CONNECTION_URL\s*=\s*['`"]?http:\/\/localhost:8899/
);
```

## 54

### --description--

Start a local Solana cluster with the program deployed.

Then, start the client app with `yarn dev` in the `app/` directory.

### --tests--

You should start a local Solana cluster.

```js
const command = `curl http://localhost:8899 -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
try {
  const jsonOut = JSON.parse(stdout);
  assert.deepInclude(jsonOut, { result: 'ok' });
} catch (e) {
  assert.fail(e, 'Try running `solana-test-validator` in a separate terminal');
}
```

You should deploy the program to the local cluster.

```js
const command = `curl http://127.0.0.1:8899 -X POST -H "Content-Type: application/json" -d '
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getProgramAccounts",
    "params": [
      "BPFLoader2111111111111111111111111111111111", {
        "encoding": "base64",
        "dataSlice": {
          "length": 0,
          "offset": 0
        }
      }
    ]
}'`;
const { stdout, stderr } = await __helpers.getCommandOutput(command);
const { stdout: keys } = await __helpers.getCommandOutput(
  'anchor keys list',
  `${project.dashedName}/todo`
);
const expectedProgramId = keys.match(/[^\s]{44}/)?.[0];
try {
  const jsonOut = JSON.parse(stdout);
  assert.exists(jsonOut.result.find(r => r.pubkey === expectedProgramId));
} catch (e) {
  assert.fail(
    e,
    `Try running \`solana-test-validator --bpf-program ${expectedProgramId} ./target/deploy/todo.so --reset\``
  );
}
```

You should start the client app server.

```js
const response = await fetch('http://localhost:5173');
assert.equal(response.status, 200, 'The server should be running.');
```

## 55

### --description--

Open the client app in your browser, and connect your Phantom wallet, and play with your app making a few transactions.

### --tests--

You should perform a few transactions using the client interface.

```js
const { Connection, PublicKey } = await import('@solana/web3.js');
const connection = new Connection('http://localhost:8899', 'confirmed');

const { stdout: keys } = await __helpers.getCommandOutput(
  'anchor keys list',
  `${project.dashedName}/todo`
);
const expectedProgramId = keys.match(/[^\s]{44}/)?.[0];
const pubkey = new PublicKey(expectedProgramId);
const transactions = await connection.getConfirmedSignaturesForAddress2(pubkey);
assert.isAtLeast(
  transactions,
  2,
  'Try using the client interface and your wallet to make a few transactions'
);
```

## --fcc-end--
