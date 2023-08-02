import { PublicKey } from '@solana/web3.js';
import { displayError, removeLoader, showLoader } from './utils';
import {
  PROGRAM_ID,
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

connectWalletBtnEl.addEventListener('click', async ev => {
  ev.preventDefault();
  displayError();
  showLoader();
  try {
    // TODO: Connect to wallet
    await connectWallet();

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
playerOnePublicKeyEl.addEventListener('change', e => {
  const playerOnePublicKey = e.target.value;
  sessionStorage.setItem('playerOnePublicKey', playerOnePublicKey);
});

playerTwoPublicKeyEl.addEventListener('change', e => {
  const playerTwoPublicKey = e.target.value;
  sessionStorage.setItem('playerTwoPublicKey', playerTwoPublicKey);
});

gameIdEl.addEventListener('change', e => {
  const gameId = e.target.value;
  sessionStorage.setItem('gameId', gameId);
  const gamePublicKey = deriveGamePublicKey(
    new PublicKey(playerOnePublicKeyEl.value),
    gameId,
    PROGRAM_ID
  );
  sessionStorage.setItem('gamePublicKey', gamePublicKey.toBase58());
});
