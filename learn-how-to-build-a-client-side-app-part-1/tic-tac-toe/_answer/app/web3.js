import { AnchorProvider, Program, setProvider } from '@coral-xyz/anchor';
import { Wallet } from './wallet.js';
import { IDL } from '../target/types/tic_tac_toe';
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import { Buffer } from 'buffer';
import { idToTile, setTiles } from './utils.js';

const turnEl = document.getElementById('turn');
const playerTurnEl = document.getElementById('player-turn');

window.Buffer = Buffer;
window.program = null;

export const PROGRAM_ID = new PublicKey(
  '5xGwZASoE5ZgxKgaisJNaGTGzMKzjyyBGv9FCUtu2m1c'
);

export const connection = new Connection('http://localhost:8899', 'processed');

export function connectWallet() {
  const keypairArr = sessionStorage.getItem('keypair');
  const uint = new Uint8Array(JSON.parse(keypairArr));
  const keypair = Keypair.fromSecretKey(uint);
  const wallet = new Wallet(keypair);
  const provider = new AnchorProvider(connection, wallet, {});
  setProvider(provider);
  const program = new Program(IDL, PROGRAM_ID, provider);
  window.program = program;
}

export async function startGame() {
  const gameId = sessionStorage.getItem('gameId');
  const playerOnePublicKey = new PublicKey(
    sessionStorage.getItem('playerOnePublicKey')
  );
  const playerTwoPublicKey = new PublicKey(
    sessionStorage.getItem('playerTwoPublicKey')
  );
  const gamePublicKey = deriveGamePublicKey(
    playerOnePublicKey,
    gameId,
    PROGRAM_ID
  );
  sessionStorage.setItem('gamePublicKey', gamePublicKey.toString());

  const keypairStr = sessionStorage.getItem('keypair');
  const keypairArr = JSON.parse(keypairStr);
  const uint8Arr = new Uint8Array(keypairArr);
  const keypair = Keypair.fromSecretKey(uint8Arr);
  await program.methods
    .setupGame(playerTwoPublicKey, gameId)
    .accounts({
      player: keypair.publicKey,
      game: gamePublicKey
    })
    .signers([keypair])
    .rpc();
  await updateBoard();
}

export async function handlePlay(id) {
  const tile = idToTile(id);

  await updateBoard();

  const keypairStr = sessionStorage.getItem('keypair');
  const keypairArr = JSON.parse(keypairStr);
  const uint8Arr = new Uint8Array(keypairArr);
  const keypair = Keypair.fromSecretKey(uint8Arr);
  const gamePublicKey = new PublicKey(sessionStorage.getItem('gamePublicKey'));
  await program.methods
    .play(tile)
    .accounts({
      player: keypair.publicKey,
      game: gamePublicKey
    })
    .signers([keypair])
    .rpc();
  await updateBoard();
}

const a = new TextEncoder();

export function deriveGamePublicKey(playerOnePublicKey, gameId, programId) {
  const [gamePublicKey, _] = PublicKey.findProgramAddressSync(
    [a.encode('game'), playerOnePublicKey.toBuffer(), a.encode(gameId)],
    programId
  );
  return gamePublicKey;
}

export async function getGameAccount() {
  const gamePublicKey = new PublicKey(sessionStorage.getItem('gamePublicKey'));
  const gameData = await program.account.game.fetch(gamePublicKey);
  turnEl.textContent = gameData.turn;
  playerTurnEl.textContent = gameData.turn % 2 === 0 ? 'O' : 'X';
  return gameData;
}

export async function updateBoard() {
  const gameData = await getGameAccount();
  const board = gameData.board;

  setTiles(board);
}
