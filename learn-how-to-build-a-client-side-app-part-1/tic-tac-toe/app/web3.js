import { AnchorProvider, Program, setProvider } from '@coral-xyz/anchor';
import { Wallet } from './wallet.js';
import { IDL } from '../target/types/tic_tac_toe';
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import * as buffer from 'buffer';
import { idToTile, setTiles } from './utils.js';

const turnEl = document.getElementById('turn');
const playerTurnEl = document.getElementById('player-turn');
const playerOnePublicKeyEl = document.getElementById('player-one-public-key');
const playerTwoPublicKeyEl = document.getElementById('player-two-public-key');
const gameIdEl = document.getElementById('game-id');
const gamePublicKeyEl = document.getElementById('game-public-key');

window.Buffer = buffer.Buffer;
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

export async function handlePlay(id) {
  const tile = idToTile(id);

  await updateBoard();

  const keypair = Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(sessionStorage.getItem('keypair')))
  );
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

export async function startGame() {
  sessionStorage.setItem('gameId', gameIdEl.value);

  const player_one_publicKey = new PublicKey(playerOnePublicKeyEl.value);
  const gamePublicKey = deriveGamePublicKey(
    player_one_publicKey,
    gameIdEl.value,
    PROGRAM_ID
  );
  sessionStorage.setItem('gamePublicKey', gamePublicKey.toString());

  gamePublicKeyEl.value = gamePublicKey;

  const player_two_publicKey = new PublicKey(playerTwoPublicKeyEl.value);
  const gameId = sessionStorage.getItem('gameId');
  const keypair = Keypair.fromSecretKey(
    new Uint8Array(JSON.parse(sessionStorage.getItem('keypair')))
  );
  await program.methods
    .setupGame(player_two_publicKey, gameId)
    .accounts({
      player: keypair.publicKey,
      game: gamePublicKey
    })
    .signers([keypair])
    .rpc();
  await updateBoard();
}

export async function joinGame() {
  sessionStorage.setItem('gamePublicKey', gamePublicKeyEl.value);

  await updateBoard();
}

export async function getGameAccount() {
  const gamePublicKey = new PublicKey(sessionStorage.getItem('gamePublicKey'));
  const gameData = await program.account.game.fetch(gamePublicKey);
  turnEl.textContent = gameData.turn;
  playerTurnEl.textContent = gameData.turn % 2 === 0 ? 'O' : 'X';
  return gameData;
}

export async function updateBoard() {
  const gameAccount = await getGameAccount();
  const board = gameAccount.board;

  setTiles(board);
}
