/// Order:
/// 1. Player 1 creates a game
/// 2. Player 1 plays turn 1
/// 3. Player 2 joins the game, and plays turn 2

// A1CtJVsEgzNooAs61G6oXJFe6u2DPdeCN2rPQv7uD2rp
// 7rXVBiruXJ1BqnW3Evbs6uDwbAWhCiAZ7kfvDAydNFfR
import { AnchorProvider, Program, setProvider } from '@coral-xyz/anchor';
import { Wallet } from './wallet.js';
import { IDL } from '../target/types/tic_tac_toe';
import { Connection, PublicKey, Keypair } from '@solana/web3.js';
import * as buffer from 'buffer';
import player_one_keypair from '../player-one.json';
import player_two_keypair from '../player-two.json';

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
const keypairsEl = document.getElementById('keypairs');

const turnEl = document.getElementById('turn');
const playerTurnEl = document.getElementById('player-turn');

let gameId = '';
let gamePublicKey = '';
let program = {};
let keypair = {};

// TODO: Camper - teach gotcha
window.Buffer = buffer.Buffer;

// TODO: Camper
const PROGRAM_ID = new PublicKey(
  '5xGwZASoE5ZgxKgaisJNaGTGzMKzjyyBGv9FCUtu2m1c'
);

// TODO: Camper
// TODO: Show how using `finalized` takes much longer to propagate than `processed`
const connection = new Connection('http://localhost:8899', 'processed');

// TODO: Camper
function connectWallet() {
  const keypairStr = keypairEl.value;
  if (!keypairStr) {
    throw new Error('No keypair provided');
  }
  keypair = Keypair.fromSecretKey(new Uint8Array(JSON.parse(keypairStr)));
  const wallet = new Wallet(keypair);
  const provider = new AnchorProvider(connection, wallet, {});
  setProvider(provider);
  program = new Program(IDL, PROGRAM_ID, provider);
}

connectWalletBtnEl.addEventListener('click', ev => {
  ev.preventDefault();
  try {
    showLoader();
    // TODO: Camper
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
  // TODO: Camper
  tdEl.addEventListener('click', async e => {
    e.preventDefault();
    const id = e.target.id;
    const tile = idToTile(id);
    showLoader();
    try {
      // Update board
      await updateBoard();

      // Might not be player's turn
      // Might not be valid tile
      await program.methods
        .play(tile)
        .accounts({
          player: keypair.publicKey,
          game: gamePublicKey
        })
        .signers([keypair])
        .rpc();
      await updateBoard();
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

// TODO: Camper - Teach about Gotcha here - no buffer in browser
const a = new TextEncoder();

// TODO: Camper
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
}

// TODO: Camper
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
}

startGameBtnEl.addEventListener('click', async e => {
  try {
    showLoader();
    // TODO: Camper
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
    // TODO: Camper
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

// TODO: Camper
async function getGameAccount() {
  const gameData = await program.account.game.fetch(gamePublicKey);
  turnEl.textContent = gameData.turn;
  playerTurnEl.textContent = gameData.turn % 2 === 0 ? 'O' : 'X';
  return gameData;
}

async function updateBoard() {
  // TODO: Camper
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
  if (tile?.x) {
    return 'X';
  }
  if (tile?.o) {
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
  startWithPossibleValues();

  const interval = setInterval(async () => {
    try {
      showLoader();
      // TODO: Camper
      if (program && gamePublicKey) {
        await updateBoard();
      }
    } catch (e) {
      console.error(e);
    } finally {
      removeLoader();
    }
  }, 3000);

  setTimeout(() => {
    clearInterval(interval);
  }, 300_000);
  return () => {
    clearInterval(interval);
  };
});

function startWithPossibleValues() {
  const player_one_publicKey = 'A1CtJVsEgzNooAs61G6oXJFe6u2DPdeCN2rPQv7uD2rp';
  const player_two_publicKey = '7rXVBiruXJ1BqnW3Evbs6uDwbAWhCiAZ7kfvDAydNFfR';

  playerOnePublicKeyEl.value = player_one_publicKey;
  playerTwoPublicKeyEl.value = player_two_publicKey;

  const keypairs = [player_one_keypair, player_two_keypair];
  keypairs.forEach((keypair, i) => {
    const li = document.createElement('li');
    const code = document.createElement('code');
    const pre = document.createElement('pre');
    pre.appendChild(code);
    code.textContent = JSON.stringify(keypair);
    li.textContent = `Player ${i + 1} Public Key: `;

    li.appendChild(pre);

    keypairsEl.appendChild(li);
  });
}

gameIdEl.addEventListener('change', e => {
  const [gamePubKey, _] = PublicKey.findProgramAddressSync(
    [
      a.encode('game'),
      new PublicKey(playerOnePublicKeyEl.value).toBuffer(),
      a.encode(e.target.value)
    ],
    PROGRAM_ID
  );
  gamePublicKeyEl.value = gamePubKey;
});
