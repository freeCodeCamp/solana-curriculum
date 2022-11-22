use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg,
    program_error::ProgramError, pubkey::Pubkey,
};

entrypoint!(process_instruction);

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    msg!("Hello World");

    let mut accounts_iter = accounts.iter();
    if let Some(account) = accounts_iter.next() {
        if account.owner != program_id {
            msg!("Account info does not match program id");
            return Err(ProgramError::IncorrectProgramId);
        }

        let mut greeting_account = GreetingAccount::try_from_slice(&account.data.borrow())?;

        greeting_account.counter += 1;
        let acc_data = &mut account.data.borrow_mut()[..];
        greeting_account.serialize(&mut acc_data.as_mut())?;

        msg!("Greeted {} time(s)!", greeting_account.counter);

        Ok(())
    } else {
        msg!("No accounts provided to say hello to");
        return Err(ProgramError::NotEnoughAccountKeys);
    }
}

/// Define the type of state stored in accounts
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct GreetingAccount {
    /// number of greetings
    pub counter: u32,
}
