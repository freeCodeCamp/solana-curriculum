use anchor_lang::prelude::*;

declare_id!("9a43FDYE3S98dfN1rPAeavJT6MzBUEuF3bdX94zihQG2");

const TASK_SIZE: usize = 4 + (4 + 32) + 1;

#[program]
pub mod todo {
    use super::*;

    pub fn save_tasks(ctx: Context<SaveTasks>, replacing_tasks: Vec<Task>) -> Result<()> {
        let tasks = &mut ctx.accounts.tasks;

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

        // If length of tasks is not equal to the length of replacing_tasks, then
        // reallocate the tasks account.
        if tasks.tasks.len() < replacing_tasks.len() {
            let new_space = 8 + TASK_SIZE * replacing_tasks.len();

            let new_minimum_balance = Rent::get()?.minimum_balance(new_space);

            let tasks_account_info = tasks.to_account_info();

            let lamports_diff = new_minimum_balance.saturating_sub(tasks_account_info.lamports());
            **ctx
                .accounts
                .user
                .to_account_info()
                .try_borrow_mut_lamports()? -= lamports_diff;
            **tasks_account_info.try_borrow_mut_lamports()? += lamports_diff;

            // Allocate the new space for the tasks account.
            tasks_account_info.realloc(new_space, false)?;
        }

        tasks.tasks = replacing_tasks;

        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(replacing_tasks: Vec<Task>)]
pub struct SaveTasks<'info> {
    #[account(init_if_needed, space = 8 + replacing_tasks.len() * TASK_SIZE, payer = user, seeds = [user.key().as_ref()], bump)]
    pub tasks: Account<'info, TasksAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(Debug)]
pub struct TasksAccount {
    tasks: Vec<Task>,
}

#[derive(Debug, AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Task {
    pub id: u32,
    /// The name of the task. Max 32 characters, min 1 character.
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
