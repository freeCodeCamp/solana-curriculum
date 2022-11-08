use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg,
    program_error::ProgramError, pubkey::Pubkey,
};

entrypoint!(process_instruction);

const BUF_LEN: usize = 280;

pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let mut accounts_iter = accounts.iter();
    if let Some(account) = accounts_iter.next() {
        if account.owner != program_id {
            msg!("Account info does not match program id");
            return Err(ProgramError::IncorrectProgramId);
        }
        // Get string out of instruction data
        let message = String::from_utf8(instruction_data.to_vec());
        if message.is_err() {
            msg!("Instruction data is not a valid string");
            return Err(ProgramError::InvalidInstructionData);
        }
        let message = message.unwrap();

        if message.len() > BUF_LEN {
            msg!("Instruction data is too long");
            return Err(ProgramError::InvalidInstructionData);
        }
        let correct_len_message = format!("{: <pad$}", message, pad = BUF_LEN);

        let message_account = MessageAccount {
            message: correct_len_message,
        };
        message_account.serialize(&mut &mut account.data.borrow_mut()[..])?;

        Ok(())
    } else {
        msg!("No accounts provided to message");
        return Err(ProgramError::NotEnoughAccountKeys);
    }
}

/// Define the type of state stored in accounts
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct MessageAccount {
    /// List of messages sent when calling the program
    pub message: String,
}

// Test process_instruction
#[cfg(test)]
mod test {
    // use borsh::BorshSerialize;

    use super::{process_instruction, AccountInfo, Pubkey};
    #[test]
    fn serilization_works() {
        let program_id = Pubkey::new_unique();
        let mut lam = 2;
        // let message_acc = MessageAccount {
        //     message: " ".repeat(BUF_LEN),
        // };

        // let mut data = message_acc.try_to_vec().unwrap();
        let mut data = [32u8; 284];
        // data[0] = 24;
        // data[1] = 1;
        // data[2] = 0;
        // data[3] = 0;
        // The above sets the first 4 bytes to 24, 1, 0, 0 which denotes the struct has 24 bytes and 1 field
        let account = AccountInfo::new(
            &program_id,
            false,
            true,
            &mut lam,
            &mut data,
            &program_id,
            false,
            2,
        );
        let accounts = vec![account];
        let instruction_data = "Test".as_bytes();
        let result = process_instruction(&program_id, &accounts, instruction_data);
        assert_eq!(result, Ok(()));
    }
}
