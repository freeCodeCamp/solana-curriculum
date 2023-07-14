/// Order:
/// 1. Player 1 creates a game
/// 2. Player 1 plays turn 1
/// 3. Player 2 joins the game, and plays turn 2

// A1CtJVsEgzNooAs61G6oXJFe6u2DPdeCN2rPQv7uD2rp
// 7rXVBiruXJ1BqnW3Evbs6uDwbAWhCiAZ7kfvDAydNFfR
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Wallet } from './wallet.js';
import { IDL } from '../target/types/tic_tac_toe';
import { Connection, PublicKey, Keypair } from '@solana/web3.js';

const gameIdEl = document.getElementById('game-id');
const startGameBtnEl = document.getElementById('start-game');
const tableBodyEl = document.querySelector('tbody');
const tdEls = tableBodyEl.querySelectorAll('td');
const keypairEl = document.getElementById('keypair');
const errorsEl = document.getElementById('errors');
const joinGameBtnEl = document.getElementById('join-game');
const gamePublicKeyEl = document.getElementById('game-public-key');
const playerOnePublicKeyEl = document.getElementById('player-one-public-key');
const playerTwoPublicKeyEl = document.getElementById('player-two-public-key');
const connectWalletBtnEl = document.getElementById('connect-wallet');
const spinnerEl = document.getElementById('spinner');

let gameId = '';
let gamePublicKey = '';
let program = {};
let keypair = {};

// TODO: Camper
const PROGRAM_ID = new PublicKey(
  '5xGwZASoE5ZgxKgaisJNaGTGzMKzjyyBGv9FCUtu2m1c'
);

// TODO: Camper
const connection = new Connection('http://localhost:8899', 'confirmed');

function connectWallet() {
  const keypairStr = keypairEl.value;
  if (!keypairStr) {
    throw new Error('No keypair provided');
  }
  keypair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(keypairStr)));
  const wallet = new Wallet(keypair);
  const provider = new AnchorProvider(connection, wallet);
  program = new Program(IDL, PROGRAM_ID, provider);
}

connectWalletBtnEl.addEventListener('click', ev => {
  ev.preventDefault();
  try {
    showLoader();
    connectWallet();
    connectWalletBtnEl.style.backgroundColor = 'green';
    displayError({ message: '' });
  } catch (e) {
    displayError(e);
  } finally {
    removeLoader();
  }
});

tdEls.forEach(tdEl => {
  tdEl.addEventListener('click', async e => {
    e.preventDefault();
    const id = e.target.id;
    console.log(`Clicked ${id}`);
    const tile = idToTile(id);
    showLoader();
    try {
      // Update board
      await updateBoard();
      // Fixture
      const game = getGameAccount();

      // Might not be player's turn
      // Might not be valid tile
      await program.methods
        .play(tile)
        .accounts({
          player: keypair.publicKey,
          game
        })
        .signers([keypair])
        .rpc();
    } catch (e) {
      displayError(e);
    } finally {
      removeLoader();
    }
  });
});

function idToTile(id) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const tile = tdEls[i * 3 + j];
      if (tile.id === id) {
        return { row: i, column: j };
      }
    }
  }
}

const a = new TextEncoder();

/// 1. Check if a GameId was provided
/// 2. Check if keypair was provided
/// 2. Check if a game with gameId exists
/// 3. Create a game if it doesn't exist
/// 4. Start/join the game
async function startGame(e) {
  e.preventDefault();
  if (!keypair) {
    throw new Error('No wallet connected');
  }
  gameId = gameIdEl.value;
  if (!gameId) {
    throw new Error('No Game ID provided');
  }
  const player_one_publicKey = new PublicKey(playerOnePublicKeyEl.value);
  gamePublicKey = PublicKey.findProgramAddressSync(
    [a.encode('game'), player_one_publicKey.toBuffer(), a.encode(gameId)],
    program.programId
  )?.[0];
  gamePublicKeyEl.value = gamePublicKey;
  const player_two_publicKey = new PublicKey(playerTwoPublicKeyEl.value);
  await program.methods
    .setupGame(player_two_publicKey, gameId)
    .accounts({
      player: keypair.publicKey,
      game: gamePublicKey
    })
    .signers([keypair])
    .rpc();
  await updateBoard();
  console.log('Started Game');
}

async function joinGame(e) {
  e.preventDefault();
  if (!keypair) {
    throw new Error('No keypair provided');
  }
  gamePublicKey = gamePublicKeyEl.value;
  if (!gamePublicKey) {
    throw new Error('No game public key provided');
  }
  await updateBoard();
  console.log('Joined Game');
}

startGameBtnEl.addEventListener('click', async e => {
  try {
    showLoader();
    await startGame(e);
  } catch (e) {
    displayError(e);
  } finally {
    removeLoader();
  }
});

joinGameBtnEl.addEventListener('click', async e => {
  try {
    showLoader();
    await joinGame(e);
  } catch (e) {
    displayError(e);
  } finally {
    removeLoader();
  }
});

function displayError(e) {
  console.error(e);
  errorsEl.innerText = e.message;
}

async function getGameAccount() {
  console.log('a');
  const gameData = await program.account.game.fetch(gamePublicKey);
  return gameData;
}

async function updateBoard() {
  const gameAccount = await getGameAccount();
  const board = gameAccount.board;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const tile = board[i][j];
      const tileEl = tdEls[i * 3 + j];
      tileEl.textContent = tileToString(tile);
    }
  }
}

function tileToString(tile) {
  if (tile.x) {
    return 'X';
  }
  if (tile.o) {
    return 'O';
  }
  return '';
}

function showLoader() {
  spinnerEl.classList.remove('hidden');
}

function removeLoader() {
  spinnerEl.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', async e => {
  // TODO
});
