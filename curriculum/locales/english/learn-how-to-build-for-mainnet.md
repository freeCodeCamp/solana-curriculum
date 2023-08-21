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

```

The `anchor-lang` dependency should have a `features` array with a value of `["init-if-needed"]`.

```js

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

```

The `TasksAccount` struct should have a `tasks` field.

```js

```

The `tasks` field should have a type of `Vec<Task>`.

```js

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

```

The `replacing_tasks` argument should have a type of `Vec<Task>`.

```js

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

```

The `ErrorCode` enum should have a `TaskNameTooShort` variant.

```js

```

The `ErrorCode` enum should have a `TaskIdNotUnique` variant.

```js

```

The `ErrorCode` enum should be annotated with `#[error_code]`.

```js

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

```

The `space` argument should be set to `8 + replacing_tasks.len() * (4 + (4 + 32) + 1)`.

```js

```

The `SaveTasks` struct should be annotated with `#[instruction(replacing_tasks: Vec<Task>)]`.

```js

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

```

The `user` field should have a type of `Signer<'info>`.

```js

```

The `user` field should be annotated with `#[account(mut)]`.

```js

```

The `tasks` field should be annotated with `#[account(payer = user)]`.

```js

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

```

The `tasks` field should be annotated with `#[account(bump)]`.

```js

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

```

The `system_program` field should have a type of `Program<'info, System>`.

```js

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

```

You should declare a `tasks` variable with value `ctx.accounts.tasks`.

```js

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

```

The `TaskNameTooShort` variant should be annotated with a message.

```js

```

The `TaskIdNotUnique` variant should be annotated with a message.

```js

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

```

You should import `Buffer` from `buffer`.

```js

```

## 30

### --description--

Within `app/` use `yarn` to install the `@solana/web3.js` package.

### --tests--

You should have `@solana/web3.js` in your `package.json` dependencies.

```js

```

## 31

### --description--

Under the `TODO:2` comment, declare a `PROGRAM_ID` variable, and assign it the value of the program's id as a `PublicKey`.

### --tests--

You should have `const PROGRAM_ID = new PublicKey("...")`.

```js

```

You should import `PublicKey` from `@solana/web3.js`.

```js

```

## 32

### --description--

Under the `TODO:3` comment, declare an `ENDPOINT` variable, and assign it the value of `import.meta.VITE_SOLANA_CONNECTION_URL` or default to `http://localhost:8899`.

**Note:** `import.meta.VITE_*` is a way to access environemnt variables in a Vitejs app during build time.

### --tests--

You should have `const ENDPOINT = import.meta.VITE_SOLANA_CONNECTION_URL || "http://localhost:8899";`.

```js

```

## 33

### --description--

Under the `TODO:4` comment, declare a `connection` variable, and assign it the value of a new `Connection` instance with the `ENDPOINT`, and choose a suitable commitment level for a production app.

### --tests--

You should have `const connection = new Connection(ENDPOINT, ...);`.

```js

```

The commitment config should be `"confirmed"` or `"finalized"`.

```js

```

You should import `Connection` from `@solana/web3.js`.

```js

```

## 34

### --description--

Within `app/` use `yarn` to install the `@solana/wallet-adapter-phantom` package.

### --tests--

You should have `@solana/wallet-adapter-phantom` in your `package.json` dependencies.

```js

```

## 35

### --description--

Under the `TODO:5` comment, declare a `wallet` variable as a new instance of the wallet adapter.

### --tests--

You should have `const wallet = new PhantomWalletAdapter;`.

```js

```

You should import `PhantomWalletAdapter` from `@solana/wallet-adapter-phantom`.

```js

```

## 36

### --description--

Within `app/` use `yarn` to install the `@coral-xyz/anchor` package.

### --tests--

You should have `@coral-xyz/anchor` in your `package.json` dependencies.

```js

```

## 37

### --description--

Under the `TODO:6` comment, declare a React context variable, `ProgramContext`, for the program in order to access the program throughout the application components.

```typescript
const MyContext = createContext<Type | null>(null);
```

### --tests--

You should have `const ProgramContext = createContext<Program<Todo> | null>(null);`.

```js

```

You should import `createContext` from `react`.

```js

```

You should import `Program` from `@coral-xyz/anchor`.

```js

```

## 38

### --description--

Under the `TODO:7` comment, declare a program state variable:

```typescript
const [program, setProgram] = useState<Type | null>(null);
```

### --tests--

You should have `const [program, setProgram] = useState<Program<Todo> | null>(null);`.

```js

```

You should import `useState` from `react`.

```js

```

## 39

### --description--

Under the `TODO:8` comment, connect to the wallet.

### --tests--

You should have `await wallet.connect()`.

```js

```

## 40

### --description--

Under the `TODO:9` comment, add an `if` statement with a condition to check if the wallet is actually connected. You can use the provided `isWalletConnected` function from `./utils.ts`.

### --tests--

You should have `if (isWalletConnected(wallet)) {}`.

```js

```

You should import `isWalletConnected` from `./utils`.

```js

```

## 41

### --description--

Under the `TODO:10` comment, and within the `if` statement, declare a `provider` variable as a new Anchor provider.

### --tests--

You should have `const provider = new AnchorProvider(connection, wallet, {})`.

```js

```

You should import `AnchorProvider` from `@coral-xyz/anchor`.

```js

```

## 42

### --description--

Under the `TODO:11` comment, and within the `if` statement, declare a `program` variable as an instance of an Anchor program.

### --tests--

You should have `const program = new Program(IDL, PROGRAM_ID, provider)`.

```js

```

You should import `IDL` from `../../target/types/todo`.

```js

```

## 43

### --description--

Under the `TODO:12` comment, and within the `if` statment, use the `setProgram` function to set the `program` state variable to `program`.

### --tests--

You should have `setProgram(program)`.

```js

```

## 44

### --description--

Under the `TODO:13` comment, conditionally either render the `Landing` page or the `LogIn` page based on whether the `program` is set:

```tsx
<>{condition ? <Landing /> : <LogIn connectWallet={connectWallet} />}</>
```

### --tests--

You should have `<>{program ? <Landing /> : LogIn connectWallet={connectWallet} />}</>`.

```js

```

## 45

### --description--

Under the `TODO:14` comment, replace the component fragment (`<></>`) with a context provider for the program:

```tsx
<ProgramContext.Provider value={program}></ProgramContext.Provider>
```

### --tests--

You should have `<ProgramContext.Provider value={program}>{program ? <Landing /> : LogIn connectWallet={connectWallet} />}</ProgramContext.Provider>`.

```js

```

## 46

### --description--

The `Landing` component fetches any tasks associated with a connected account, and handles the main logic for displaying ToDos.

Under the `TODO:15` comment, declare a `program` variable with the program context hook:

```js
const state = useContext(MyContext);
```

### --tests--

You should have `const program = useContext(ProgramContext)`.

```js

```

You should import `useContext` from `react`.

```js

```

## 47

### --description--

Under the `TODO:16` comment, add an `if` statement with a condition to check if the program exists.

### --tests--

You should have `if (program) {}`.

```js

```

## 48

### --description--

Under the `TODO:17` comment, and within the `if` statement, declare a `tasksPublicKey` variable with a value of the program derived address.

### --tests--

You should have `const [tasksPublicKey, _] = PublicKey.findProgramAddressSync([program.provider.publicKey.toBuffer()], PROGRAM_ID)`.

```js

```

## 49

### --description--

Under the `TODO:18` comment, and within the `if` statement, declare a `tasks` variable with a value of the program's task account.

### --tests--

You should have `const tasks = await program.account.tasksAccount.fetch(tasksPublicKey)`.

```js

```

## 50

### --description--

Under the `TODO:19` comment, and within the `if` statement, call the `setTasks` function with the tasks data.

### --tests--

You should have `setTasks(tasks.tasks)`.

```js

```

## 51

### --description--

Under the `TODO:20` comment, ensure the program exists, derive the program address, and save the `tasks` state to the program's task account.

### --tests--

You should have `if (program) { ... }`.

```js

```

You should have `const [tasksPublicKey, _] = PublicKey.findProgramAddressSync([program.provider.publicKey.toBuffer()], PROGRAM_ID)`.

```js

```

You should have `await program.methods.saveTasks(tasks).accounts({ tasks: tasksPublicKey }).rpc()`.

```js

```

## 52

### --description--

Your client app is finished!

Before testing, set the environment variables. Within `todo/` create a `.env` file, and add `VITE_SOLANA_CONNECTION_URL=http://localhost:8899`.

### --tests--

You should create a `todo/.env` file.

```js

```

You should set the `VITE_SOLANA_CONNECTION_URL` variable to `http://localhost:8899`.

```js

```

## 53

### --description--

Start a local Solana cluster with the program deployed.

Then, start the client app with `yarn dev` in the `app/` directory.

### --tests--

You should start a local Solana cluster.

```js

```

You should deploy the program to the local cluster.

```js

```

You should start the client app server.

```js

```

## 54

### --description--

Open the client app in your browser, and connect your Phantom wallet, and play with your app making a few transactions.

**Summary**

## --fcc-end--
