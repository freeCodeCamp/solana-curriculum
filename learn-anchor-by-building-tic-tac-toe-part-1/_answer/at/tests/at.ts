import {
  Program,
  setProvider,
  AnchorProvider,
  workspace,
  utils
} from '@coral-xyz/anchor';
import { At } from '../target/types/at';
import { expect } from 'chai';
import { Keypair, PublicKey } from '@solana/web3.js';

describe('at', () => {
  // Configure the client to use the local cluster.
  setProvider(AnchorProvider.env());

  const program = workspace.At as Program<At>;
  const programProvider = program.provider as AnchorProvider;

  it('setup game!', async () => {
    // const gameKeypair = Keypair.generate();

    // const playerOne = programProvider.wallet;
    const playerOne = Keypair.generate();
    const playerTwo = Keypair.generate();

    const [gamePublicKey, _bump] = PublicKey.findProgramAddressSync(
      [utils.bytes.utf8.encode('game'), playerOne.publicKey.toBuffer()],
      program.programId
    );

    console.log('ACCOUNTS:');
    console.log(gamePublicKey.toBase58());
    console.log(playerOne.publicKey.toBase58());
    console.log(playerTwo.publicKey.toBase58());

    // Airdrop to playerOne
    const sg = await programProvider.connection.requestAirdrop(
      playerOne.publicKey,
      1_000_000_000
    );
    await programProvider.connection.confirmTransaction(sg);

    await program.methods
      .setupGame(playerTwo.publicKey)
      .accounts({
        game: gamePublicKey,
        playerOne: playerOne.publicKey
      })
      .signers([playerOne])
      .rpc();

    const gameData = await program.account.game.fetch(gamePublicKey);

    expect(gameData.turn).to.equal(1);
    expect(gameData.players).to.eql([playerOne.publicKey, playerTwo.publicKey]);

    expect(gameData.state).to.eql({ active: {} });
    expect(gameData.board).to.eql([
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);
  });
});
