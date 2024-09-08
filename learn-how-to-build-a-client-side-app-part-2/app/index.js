import { Keypair, PublicKey } from '@solana/web3.js';
import player_one_keypair from '../player-one.json';
import player_two_keypair from '../player-two.json';
import { displayError, removeLoader, showLoader } from './utils';
import {
  connectWallet,
  deriveGamePublicKey,
  handlePlay,
  startGame,
  updateBoard
} from './web3';

const gameIdEl = document.getElementById('game-id');
const startGameBtnEl = document.getElementById('start-game');
const tableBodyEl = document.querySelector('tbody');
const tdEls = tableBodyEl.querySelectorAll('td');
const joinGameBtnEl = document.getElementById('join-game');
const playerOnePublicKeyEl = document.getElementById('player-one-public-key');
const playerTwoPublicKeyEl = document.getElementById('player-two-public-key');
const connectWalletBtnEl = document.getElementById('connect-wallet');
const keypairEl = document.getElementById('keypair');
const keypairsEl = document.getElementById('keypairs');
const gamePublicKeyEl = document.getElementById('game-public-key');

connectWalletBtnEl.addEventListener('click', ev => {
  ev.preventDefault();
  displayError();
  showLoader();
  try {
    const keypair = keypairEl.value;
    sessionStorage.setItem('keypair', keypair);

    // TODO: Connect to wallet
    connectWallet();

    connectWalletBtnEl.style.backgroundColor = 'green';
  } catch (e) {
    displayError(e);
  } finally {
    removeLoader();
  }
});

startGameBtnEl.addEventListener('click', async event => {
  event.preventDefault();
  displayError();
  showLoader();
  try {
    // TODO: Create a new game
    await startGame();
  } catch (e) {
    displayError(e);
  } finally {
    removeLoader();
  }
});

joinGameBtnEl.addEventListener('click', async event => {
  event.preventDefault();
  displayError();
  showLoader();
  try {
    // TODO: Join an existing game
    await updateBoard();
  } catch (e) {
    displayError(e);
  } finally {
    removeLoader();
  }
});

tdEls.forEach(tdEl => {
  tdEl.addEventListener('click', async event => {
    event.preventDefault();
    displayError();
    showLoader();
    try {
      // TODO: Play tile
      await handlePlay(event.target.id);
    } catch (e) {
      displayError(e);
    } finally {
      removeLoader();
    }
  });
});

document.addEventListener('DOMContentLoaded', async _event => {
  startWithPossibleValues();

  const interval = setInterval(async () => {
    showLoader();
    try {
      // TODO: If program and gamePublicKey exist, update board
      const gamePublicKey = sessionStorage.getItem('gamePublicKey');
      if (program && gamePublicKey) {
        await updateBoard();
      }
    } catch (e) {
      console.debug(e);
    } finally {
      removeLoader();
    }
  }, 3000);

  // A game of tic-tac-toe should not last long,
  // but for development this is commented out
  // setTimeout(() => {
  //   clearInterval(interval);
  // }, 300_000);
  return () => {
    clearInterval(interval);
  };
});

// ---------------------
// CONVENIENCE FUNCTIONS
// ---------------------

function startWithPossibleValues() {
  const player_one_publicKey = Keypair.fromSecretKey(
    new Uint8Array(player_one_keypair)
  ).publicKey.toBase58();
  const player_two_publicKey = Keypair.fromSecretKey(
    new Uint8Array(player_two_keypair)
  ).publicKey.toBase58();

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

async function setGamePublicKey() {
  if (PublicKey.isOnCurve(playerOnePublicKeyEl.value)) {
    const gamePublicKey = await deriveGamePublicKey(
      new PublicKey(playerOnePublicKeyEl.value),
      gameIdEl.value,
    );
    sessionStorage.setItem('gamePublicKey', gamePublicKey.toBase58());
    gamePublicKeyEl.value = gamePublicKey.toBase58();
  }
}

playerOnePublicKeyEl.addEventListener('input', async e => {
  const playerOnePublicKey = e.target.value;
  sessionStorage.setItem('playerOnePublicKey', playerOnePublicKey);
  await setGamePublicKey();
});

playerTwoPublicKeyEl.addEventListener('input', e => {
  const playerTwoPublicKey = e.target.value;
  sessionStorage.setItem('playerTwoPublicKey', playerTwoPublicKey);
});

gameIdEl.addEventListener('input', async e => {
  const gameId = e.target.value;
  sessionStorage.setItem('gameId', gameId);
  await setGamePublicKey();
});
