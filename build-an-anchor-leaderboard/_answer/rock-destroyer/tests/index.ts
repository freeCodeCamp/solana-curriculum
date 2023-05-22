import * as anchor from '@coral-xyz/anchor';
import { expect } from 'chai';
import { Program } from '@coral-xyz/anchor';
import { RockDestroyer } from '../target/types/rock_destroyer';
import { PublicKey, Keypair } from '@solana/web3.js';

describe('anch', () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.RockDestroyer as Program<RockDestroyer>;
  const user = Keypair.generate();

  function getPDA(seed: string, publicKey: PublicKey): PublicKey {
    const [pda, _] = PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode(seed), publicKey.toBuffer()],
      program.programId
    );
    return pda;
  }

  console.log('Game Owner: ', provider.wallet.publicKey.toBase58());

  before(async () => {
    const adtx = await program.provider.connection.requestAirdrop(
      user.publicKey,
      1_000_000_000
    );
    console.log(
      '[AIRDROP] Confirming transaction: ',
      adtx,
      'for',
      user.publicKey.toBase58()
    );
    await program.provider.connection.confirmTransaction(adtx, 'finalized');
  });

  it('initialises leaderboard', async () => {
    const leaderboardPubkey = getPDA('leaderboard', provider.wallet.publicKey);

    const tx = await program.methods
      .initialiseLeaderboard()
      .accounts({
        gameOwner: provider.wallet.publicKey,
        leaderboard: leaderboardPubkey
      })
      .rpc();

    console.log('[INITIALISE LEADERBOARD] Confirming transaction: ', tx);
    await program.provider.connection.confirmTransaction(tx, 'finalized');

    const leaderboard = await program.account.leaderboard.fetch(
      leaderboardPubkey
    );

    console.log('Leaderboard', leaderboard);

    expect(leaderboard).deep.equal({ players: [] });
  });

  it('creates a new game', async () => {
    const leaderboardPubkey = getPDA('leaderboard', provider.wallet.publicKey);

    const gameOwnerBalanceBeforeNewGame =
      await program.provider.connection.getBalance(provider.wallet.publicKey);

    const tx = await program.methods
      .newGame('shaun')
      .accounts({
        gameOwner: provider.wallet.publicKey,
        user: user.publicKey,
        leaderboard: leaderboardPubkey
      })
      .signers([user])
      .rpc({ skipPreflight: true });

    console.log('[NEW GAME] Confirming transaction: ', tx);
    await program.provider.connection.confirmTransaction(tx, 'finalized');

    const leaderboard = await program.account.leaderboard.fetch(
      leaderboardPubkey
    );

    console.log('Leaderboard', leaderboard);

    expect(leaderboard.players.length).greaterThanOrEqual(1);

    const userPlayers = leaderboard.players.filter(
      p => p.pubkey.toBase58() === user.publicKey.toBase58()
    );

    expect(userPlayers.length).greaterThanOrEqual(1);

    const player = userPlayers.find(p => p.hasPayed);

    expect(player).not.undefined;
    expect(player.pubkey).deep.equal(user.publicKey);
    expect(player.username).equal('shaun');
    expect(player.hasPayed).equal(true);
    expect(player.score.toNumber()).equal(0);

    // Check balance has reduced by at least 500_000_000 lamports*
    // * at least, because the transaction fees are also deducted
    const userBalance = await program.provider.connection.getBalance(
      user.publicKey
    );
    expect(userBalance).lessThanOrEqual(500_000_000);

    // Check that the game owner has received the 100_000_000 lamports
    // Check is approximate because the transaction fees as provider are deducted
    const gameOwnerBalanceAfter = await program.provider.connection.getBalance(
      provider.wallet.publicKey
    );

    expect(gameOwnerBalanceAfter).approximately(
      gameOwnerBalanceBeforeNewGame + 500_000_000,
      20_000
    );
  });

  it('adds a player to the leaderboard', async () => {
    const leaderboardPubkey = getPDA('leaderboard', provider.wallet.publicKey);

    const tx = await program.methods
      .addPlayerToLeaderboard(new anchor.BN(100))
      .accounts({
        user: user.publicKey,
        leaderboard: leaderboardPubkey
      })
      .signers([user])
      .rpc({ skipPreflight: true });

    console.log('[ADD PLAYER TO LEADERBOARD] Confirming transaction: ', tx);
    await program.provider.connection.confirmTransaction(tx, 'finalized');

    const leaderboard = await program.account.leaderboard.fetch(
      leaderboardPubkey
    );

    console.log('Leaderboard', leaderboard);

    expect(leaderboard.players.length).greaterThanOrEqual(1);

    const userPlayers = leaderboard.players.filter(
      p => p.pubkey.toBase58() === user.publicKey.toBase58()
    );

    expect(userPlayers.length).greaterThanOrEqual(1);

    const player = userPlayers.find(p => !p.hasPayed);

    expect(player).not.undefined;
    expect(player.score.toNumber()).equal(100);
    expect(player.pubkey).deep.equal(user.publicKey);
    expect(player.username).equal('shaun');
    expect(player.hasPayed).equal(false);
  });
});
