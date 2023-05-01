import {
  AnchorError,
  Program,
  AnchorProvider,
  setProvider,
  workspace
} from '@coral-xyz/anchor';
import { TicTacToe } from '../../target/types/tic_tac_toe';
import { expect } from 'chai';
import { Keypair, PublicKey } from '@solana/web3.js';

describe('tic-tac-toe', () => {
  // Configure the client to use the local cluster.
  setProvider(AnchorProvider.env());

  const program = workspace.TicTacToe as Program<TicTacToe>;
  const programProvider = program.provider as AnchorProvider;

  xit('initializes a game', async () => {
    const playerOne = Keypair.generate();
    const playerTwo = Keypair.generate();

    const gameId = 'game-1';

    const [gamePublicKey, _] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('game'),
        playerOne.publicKey.toBuffer(),
        Buffer.from(gameId)
      ],
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
      .setupGame(playerTwo.publicKey, gameId)
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

  it('has player one win', async () => {
    const playerOne = Keypair.generate();
    const playerTwo = Keypair.generate();

    const gameId = 'game-2';

    const [gamePublicKey, _bump] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('game'),
        playerOne.publicKey.toBuffer(),
        Buffer.from(gameId)
      ],
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
      .setupGame(playerTwo.publicKey, gameId)
      .accounts({
        game: gamePublicKey,
        playerOne: playerOne.publicKey
      })
      .signers([playerOne])
      .rpc();

    let gameData = await program.account.game.fetch(gamePublicKey);

    expect(gameData.turn).to.equal(1);

    await play(
      program,
      gamePublicKey,
      playerOne,
      { row: 0, column: 0 },
      2,
      { active: {} },
      [
        [{ x: {} }, null, null],
        [null, null, null],
        [null, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerTwo,
      { row: 1, column: 0 },
      3,
      { active: {} },
      [
        [{ x: {} }, null, null],
        [{ o: {} }, null, null],
        [null, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerOne,
      { row: 0, column: 1 },
      4,
      { active: {} },
      [
        [{ x: {} }, { x: {} }, null],
        [{ o: {} }, null, null],
        [null, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerTwo,
      { row: 1, column: 1 },
      5,
      { active: {} },
      [
        [{ x: {} }, { x: {} }, null],
        [{ o: {} }, { o: {} }, null],
        [null, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerOne,
      { row: 0, column: 2 },
      5,
      { won: { winner: playerOne.publicKey } },
      [
        [{ x: {} }, { x: {} }, { x: {} }],
        [{ o: {} }, { o: {} }, null],
        [null, null, null]
      ]
    );
  });

  xit('handles ties', async () => {
    const playerOne = Keypair.generate();
    const playerTwo = Keypair.generate();

    const gameId = 'game-3';

    const [gamePublicKey, _bump] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('game'),
        playerOne.publicKey.toBuffer(),
        Buffer.from(gameId)
      ],
      program.programId
    );

    // Airdrop to playerOne
    const sg = await programProvider.connection.requestAirdrop(
      playerOne.publicKey,
      1_000_000_000
    );
    await programProvider.connection.confirmTransaction(sg);

    await program.methods
      .setupGame(playerTwo.publicKey, gameId)
      .accounts({
        game: gamePublicKey,
        playerOne: playerOne.publicKey
      })
      .signers([playerOne])
      .rpc();

    let gameState = await program.account.game.fetch(gamePublicKey);
    expect(gameState.turn).to.equal(1);

    await play(
      program,
      gamePublicKey,
      playerOne,
      { row: 0, column: 0 },
      2,
      { active: {} },
      [
        [{ x: {} }, null, null],
        [null, null, null],
        [null, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerTwo,
      { row: 1, column: 1 },
      3,
      { active: {} },
      [
        [{ x: {} }, null, null],
        [null, { o: {} }, null],
        [null, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerOne,
      { row: 2, column: 0 },
      4,
      { active: {} },
      [
        [{ x: {} }, null, null],
        [null, { o: {} }, null],
        [{ x: {} }, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerTwo,
      { row: 1, column: 0 },
      5,
      { active: {} },
      [
        [{ x: {} }, null, null],
        [{ o: {} }, { o: {} }, null],
        [{ x: {} }, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerOne,
      { row: 1, column: 2 },
      6,
      { active: {} },
      [
        [{ x: {} }, null, null],
        [{ o: {} }, { o: {} }, { x: {} }],
        [{ x: {} }, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerTwo,
      { row: 0, column: 1 },
      7,
      { active: {} },
      [
        [{ x: {} }, { o: {} }, null],
        [{ o: {} }, { o: {} }, { x: {} }],
        [{ x: {} }, null, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerOne,
      { row: 2, column: 1 },
      8,
      { active: {} },
      [
        [{ x: {} }, { o: {} }, null],
        [{ o: {} }, { o: {} }, { x: {} }],
        [{ x: {} }, { x: {} }, null]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerTwo,
      { row: 2, column: 2 },
      9,
      { active: {} },
      [
        [{ x: {} }, { o: {} }, null],
        [{ o: {} }, { o: {} }, { x: {} }],
        [{ x: {} }, { x: {} }, { o: {} }]
      ]
    );

    await play(
      program,
      gamePublicKey,
      playerOne,
      { row: 0, column: 2 },
      9,
      { tie: {} },
      [
        [{ x: {} }, { o: {} }, { x: {} }],
        [{ o: {} }, { o: {} }, { x: {} }],
        [{ x: {} }, { x: {} }, { o: {} }]
      ]
    );
  });

  xit('handles invalid plays', async () => {
    const playerOne = Keypair.generate();
    const playerTwo = Keypair.generate();

    const gameId = 'game-4';

    const [gamePublicKey, _bump] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('game'),
        playerOne.publicKey.toBuffer(),
        Buffer.from(gameId)
      ],
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
      .setupGame(playerTwo.publicKey, gameId)
      .accounts({
        game: gamePublicKey,
        playerOne: playerOne.publicKey
      })
      .signers([playerOne])
      .rpc();

    let gameData = await program.account.game.fetch(gamePublicKey);

    expect(gameData.turn).to.equal(1);

    await play(
      program,
      gamePublicKey,
      playerOne,
      { row: 0, column: 0 },
      2,
      { active: {} },
      [
        [{ x: {} }, null, null],
        [null, null, null],
        [null, null, null]
      ]
    );

    try {
      await play(
        program,
        gamePublicKey,
        playerOne, // same player in subsequent turns
        // change sth about the tx because
        // duplicate tx that come in too fast
        // after each other may get dropped
        { row: 1, column: 0 },
        2,
        { active: {} },
        [
          [{ x: {} }, null, null],
          [null, null, null],
          [null, null, null]
        ]
      );
      chai.assert(false, "should've failed but didn't ");
    } catch (_err) {
      expect(_err).to.be.instanceOf(AnchorError);
      const err: AnchorError = _err;
      expect(err.error.errorCode.code).to.equal('NotPlayersTurn');
      expect(err.error.errorCode.number).to.equal(6003);
      expect(err.program.equals(program.programId)).is.true;
      expect(err.error.comparedValues).to.deep.equal([
        playerTwo.publicKey,
        playerOne.publicKey
      ]);
    }

    try {
      await play(
        program,
        gamePublicKey,
        playerTwo,
        { row: 5, column: 1 }, // out of bounds row
        2,
        { active: {} },
        [
          [{ x: {} }, { x: {} }, null],
          [{ o: {} }, null, null],
          [null, null, null]
        ]
      );
      chai.assert(false, "should've failed but didn't ");
    } catch (_err) {
      expect(_err).to.be.instanceOf(AnchorError);
      const err: AnchorError = _err;
      expect(err.error.errorCode.number).to.equal(6000);
      expect(err.error.errorCode.code).to.equal('TileOutOfBounds');
    }

    try {
      await play(
        program,
        gamePublicKey,
        playerOne,
        { row: 0, column: 0 },
        2,
        { active: {} },
        [
          [{ x: {} }, { x: {} }, null],
          [{ o: {} }, { o: {} }, null],
          [null, null, null]
        ]
      );
      chai.assert(false, "should've failed but didn't ");
    } catch (_err) {
      expect(_err).to.be.instanceOf(AnchorError);
      const err: AnchorError = _err;
      expect(err.error.errorCode.number).to.equal(6001);
    }

    try {
      await play(
        program,
        gamePublicKey,
        playerOne,
        { row: 0, column: 2 },
        2,
        { won: { winner: playerOne.publicKey } },
        [
          [{ x: {} }, { x: {} }, { x: {} }],
          [{ o: {} }, { o: {} }, null],
          [null, null, null]
        ]
      );
      chai.assert(false, "should've failed but didn't ");
    } catch (_err) {
      expect(_err).to.be.instanceOf(AnchorError);
      const err: AnchorError = _err;
      expect(err.error.errorCode.number).to.equal(6002);
    }
  });
});

async function play(
  program: Program<TicTacToe>,
  game: PublicKey,
  player: Keypair,
  tile: { row: number; column: number },
  expectedTurn: number,
  expectedGameState:
    | { active: {} }
    | { won: { winner: PublicKey } }
    | { tie: {} },
  expectedBoard: Array<Array<{ x: {} } | { o: {} } | null>>
) {
  await program.methods
    .play(tile)
    .accounts({
      player: player.publicKey,
      game
    })
    .signers([player])
    .rpc();

  const gameData = await program.account.game.fetch(game);

  expect(gameData.turn).to.equal(expectedTurn);
  expect(gameData.state).to.eql(expectedGameState);
  expect(gameData.board).to.eql(expectedBoard);
}
