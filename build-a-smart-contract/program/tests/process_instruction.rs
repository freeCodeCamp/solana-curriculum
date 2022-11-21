extern crate message;
use message::process_instruction;
use borsh::BorshDeserialize;

use solana_program::{account_info::AccountInfo, program_error::ProgramError, pubkey::Pubkey};

#[derive(BorshDeserialize, Debug)]
pub struct MessageStructForTest {
    pub message: String
}

#[test]
fn owner_not_program_id() {
    let program_id = Pubkey::new_unique();
    let owner = Pubkey::new_unique();
    let mut data = vec![0; 284];
    let mut lam = 2;
    let account_info = AccountInfo::new(
        &program_id,
        false,
        true,
        &mut lam,
        &mut data,
        &owner,
        false,
        2,
    );
    let accounts = vec![account_info];
    let instruction_data = vec![];
    let result = process_instruction(&program_id, &accounts, &instruction_data);
    assert_eq!(result, Err(ProgramError::IncorrectProgramId));
}

#[test]
fn instruction_is_deserialized() {
    let program_id = Pubkey::new_unique();
    let mut data = vec![0; 284];
    let mut lam = 2;
    let account_info = AccountInfo::new(
        &program_id,
        false,
        true,
        &mut lam,
        &mut data,
        &program_id,
        false,
        2,
    );
    let accounts = vec![account_info];
    let instruction_data = "Hello World!".as_bytes();
    let _result = process_instruction(&program_id, &accounts, &instruction_data);
    let data = MessageStructForTest::try_from_slice(String::from_utf8(accounts[0].data.borrow().to_vec()).unwrap().as_bytes()).unwrap();
    let fmt = format!("{: <280}", "Hello World!");
    assert_eq!(fmt, data.message);
}

#[test]
fn instruction_not_string() {
    let program_id = Pubkey::new_unique();
    let mut data = vec![0; 284];
    let mut lam = 2;
    let account_info = AccountInfo::new(
        &program_id,
        false,
        true,
        &mut lam,
        &mut data,
        &program_id,
        false,
        2,
    );
    let accounts = vec![account_info];
    let instruction_data = vec![0, 159, 146, 150];
    let result = process_instruction(&program_id, &accounts, &instruction_data);
    assert_eq!(result, Err(ProgramError::InvalidInstructionData));
}

#[test]
fn instruction_too_long() {
    let program_id = Pubkey::new_unique();
    let mut data = vec![0; 284];
    let mut lam = 2;
    let account_info = AccountInfo::new(
        &program_id,
        false,
        true,
        &mut lam,
        &mut data,
        &program_id,
        false,
        2,
    );
    let accounts = vec![account_info];
    let instruction_data = vec![0; 281];
    let result = process_instruction(&program_id, &accounts, &instruction_data);
    assert_eq!(result, Err(ProgramError::InvalidInstructionData));
}

#[test]
fn no_accounts() {
    let program_id = Pubkey::new_unique();
    let accounts = vec![];
    let instruction_data = vec![];
    let result = process_instruction(&program_id, &accounts, &instruction_data);
    assert_eq!(result, Err(ProgramError::NotEnoughAccountKeys));
}

#[test]
fn instruction_data_padded() {
    let program_id = Pubkey::new_unique();
    let mut data = vec![0; 284];
    let mut lam = 2;
    let account_info = AccountInfo::new(
        &program_id,
        false,
        true,
        &mut lam,
        &mut data,
        &program_id,
        false,
        2,
    );
    let accounts = vec![account_info];
    let instruction_data = "Hello World!".as_bytes();
    let _result = process_instruction(&program_id, &accounts, &instruction_data);
    let account_data = accounts[0].data.borrow();
    assert_eq!(account_data.len(), 284);
}

#[test]
fn success() {
    let program_id = Pubkey::new_unique();
    let mut data = vec![0; 284];
    let mut lam = 2;
    let account_info = AccountInfo::new(
        &program_id,
        false,
        true,
        &mut lam,
        &mut data,
        &program_id,
        false,
        2,
    );
    let accounts = vec![account_info];
    let instruction_data = "Hello World!".as_bytes();
    let result = process_instruction(&program_id, &accounts, &instruction_data);
    assert_eq!(result, Ok(()));
}
