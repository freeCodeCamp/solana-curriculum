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
