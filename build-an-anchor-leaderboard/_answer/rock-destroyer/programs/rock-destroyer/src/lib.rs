use anchor_lang::prelude::*;
use std::str::FromStr;

declare_id!("");

const GAME_OWNER_PUBKEY: &'static str = std::env!(
    "GAME_OWNER_PUBKEY",
    "GAME_OWNER_PUBKEY environment variable not set"
);

#[program]
pub mod rock_destroyer {
    use super::*;

    /// Initialises the leaderboard with 5 empty slots
    pub fn initialise_leaderboard(ctx: Context<InitialiseLeaderboard>) -> Result<()> {
        let leaderboard = &mut ctx.accounts.leaderboard;

        // Initialise leaderboard
        leaderboard.players = vec![];

        Ok(())
    }

    /// Starts a new game:
    /// - Creates a new player account
    /// - Pays the game owner 0.5 SOL
    /// - Initialises the player account
    pub fn new_game(ctx: Context<NewGame>, username: String) -> Result<()> {
        let leaderboard = &mut ctx.accounts.leaderboard;
        let game_owner = &mut ctx.accounts.game_owner;
        let user = &mut ctx.accounts.user;

        let lams = 500_000_000;

        let ix = anchor_lang::solana_program::system_instruction::transfer(
            &user.key(),
            &game_owner.key(),
            lams,
        );
        anchor_lang::solana_program::program::invoke(
            &ix,
            &[user.to_account_info(), game_owner.to_account_info()],
        )?;

        // Reduce string to 24 bytes
        let username = username.chars().take(32).collect::<String>();

        // Initialise player account
        let player = Player {
            username,
            pubkey: *user.key,
            score: 0,
            has_payed: true,
        };

        // Add player to leaderboard
        // If the leaderboard is full, remove the lowest score that has not payed
        if leaderboard.players.len() == 101 {
            let mut lowest_score = u64::MAX;
            let mut lowest_score_index = 0;
            for (i, player) in leaderboard.players.iter().enumerate() {
                if player.score < lowest_score && !player.has_payed {
                    lowest_score = player.score;
                    lowest_score_index = i;
                }
            }
            leaderboard.players[lowest_score_index] = player;
        } else {
            leaderboard.players.push(player);
        }

        Ok(())
    }

    /// Adds player to leaderboard
    /// NOTE: username can appear multiple times in the leaderboard
    pub fn add_player_to_leaderboard(
        ctx: Context<AddPlayerToLeaderboard>,
        score: u64,
    ) -> Result<()> {
        let user = &mut ctx.accounts.user;
        let leaderboard = &mut ctx.accounts.leaderboard;

        // Find players in leaderboard associated with user
        let mut players = leaderboard
            .players
            .iter_mut()
            .filter(|player| player.pubkey == *user.key);

        // Check if any players have payed
        let mut player = players
            .find(|player| player.has_payed)
            .ok_or(AnchError::PlayerNotFound)?;

        // Update player score
        player.score = score;
        player.has_payed = false;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitialiseLeaderboard<'info> {
    #[account(init, payer = game_owner, space = 8 + (4 + 24 + 32 + 8 + 1) * 101, seeds = [b"leaderboard", game_owner.key().as_ref()], bump)]
    pub leaderboard: Account<'info, Leaderboard>,
    #[account(mut, constraint = game_owner.key() == Pubkey::from_str(GAME_OWNER_PUBKEY)
    .expect("Invalid game owner pubkey"), constraint = anchor_lang::solana_program::system_program::check_id(&game_owner.owner))]
    pub game_owner: Signer<'info>,
    system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct NewGame<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    /// CHECK: The game owner is only here to receive funds
    /// A constraint is used to ensure that the game owner is the same as the one specified in the program
    #[account(mut, constraint = game_owner.key() == Pubkey::from_str(GAME_OWNER_PUBKEY)
    .expect("Invalid game owner pubkey"), constraint = anchor_lang::solana_program::system_program::check_id(&game_owner.owner))]
    pub game_owner: AccountInfo<'info>,
    #[account(mut)]
    pub leaderboard: Account<'info, Leaderboard>,
    system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AddPlayerToLeaderboard<'info> {
    #[account(mut)]
    pub leaderboard: Account<'info, Leaderboard>,
    #[account(mut)]
    pub user: Signer<'info>,
}

#[account]
pub struct Leaderboard {
    /// A list of the top 100 player pubkeys
    /// Includes 101 players to allow for the case where a player has payed but has not yet been added to the leaderboard
    pub players: Vec<Player>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Debug)]
pub struct Player {
    /// The username of the player (max 24 bytes)
    pub username: String,
    pub pubkey: Pubkey,
    pub score: u64,
    pub has_payed: bool,
}

#[error_code]
pub enum AnchError {
    #[msg("Player not found")]
    PlayerNotFound,
}
