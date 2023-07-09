/// Order:
/// 1. Player 1 creates a game
/// 2. Player 1 plays turn 1
/// 3. Player 2 joins the game, and plays turn 2
import { Program } from '@coral-xyz/anchor';
import { IDL } from '../target/idl/tic_tac_toe';
import { Connection, PublicKey, Keypair } from '@solana/web3.js';

const gameIdEl = document.getElementById('game-id');
const startGameBtnEl = document.getElementById('start-game');
const tableBodyEl = document.querySelector('tbody');
const tdEls = tableBodyEl.querySelectorAll('td');
const keypairEl = document.getElementById('keypair');
const errorsEl = document.getElementById('errors');
const joinGameBtnEl = document.getElementById('join-game');
const gamePublicKeyEl = document.getElementById('game-public-key');

let gameId = '';
let gamePublicKey = '';
let keypair = {};

// TODO: Camper
const PROGRAM_ID = new PublicKey(
  '9GigwZ232VNW38tZmMzeLJjo3yPbyDQ92LvhoKbKRTNB'
);

// TODO: Camper
const program = new Program(IDL, PROGRAM_ID);

tdEls.forEach(tdEl => {
  tdEl.addEventListener('click', async e => {
    e.preventDefault();
    const id = e.target.id;
    console.log(`Clicked ${id}`);
    const tile = idToTile(id);

    // Update board
    await updateBoard();
    // Fixture
    const game = getGameAccount();

    try {
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

const { encode: toUint8Array } = new TextEncoder();

/// 1. Check if a GameId was provided
/// 2. Check if keypair was provided
/// 2. Check if a game with gameId exists
/// 3. Create a game if it doesn't exist
/// 4. Start/join the game
async function startGame(e) {
  e.preventDefault();
  showLoader(tableBodyEl);
  keypair = keypairEl.value;
  if (!keypair) {
    removeLoader(tableBodyEl);
    throw new Error('No keypair provided');
  }
  gameId = gameIdEl.value;
  if (!gameId) {
    removeLoader(tableBodyEl);
    throw new Error('No Game ID provided');
  }
  gamePublicKey = PublicKey.findProgramAddressSync(
    [toUint8Array('game'), keypair.publicKey.toBuffer(), toUint8Array(gameId)],
    program.programId
  );
  gamePublicKeyEl.value = gamePublicKey;
  await updateBoard();
  removeLoader(tableBodyEl);
  console.log('Started Game');
}

async function joinGame(e) {
  e.preventDefault();
  showLoader(tableBodyEl);
  const keypair = Keypair.fromSecretKey(Uint8Array.from(keypairEl.value));
  if (!keypair) {
    removeLoader(tableBodyEl);
    throw new Error('No keypair provided');
  }
  gamePublicKey = gamePublicKeyEl.value;
  if (!gamePublicKey) {
    removeLoader(tableBodyEl);
    throw new Error('No game public key provided');
  }
  await updateBoard();
  removeLoader(tableBodyEl);
  console.log('Joined Game');
}

startGameBtnEl.addEventListener('click', async e => {
  try {
    await startGame(e);
  } catch (e) {
    displayError(e);
  }
});

joinGameBtnEl.addEventListener('click', async e => {
  try {
    await joinGame(e);
  } catch (e) {
    displayError(e);
  }
});

function displayError(e) {
  errorsEl.innerText = e.message;
}

async function getGameAccount() {
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

function showLoader(el) {
  el.classList.add('loader');
}

function removeLoader(el) {
  el.classList.remove('loader');
}

document.addEventListener('DOMContentLoaded', async e => {
  // TODO
});
