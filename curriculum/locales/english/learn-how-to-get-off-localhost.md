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

### --tests--

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

### --tests--

## 50

### --description--

**Summary**

## --fcc-end--

```

```
