/// Order:
/// 1. Player 1 creates a game
/// 2. Player 1 plays turn 1
/// 3. Player 2 joins the game, and plays turn 2

import { Connection, PublicKey } from '@solana/web3.js';

const gameIdEl = document.getElementById('game-id');
const startGameBtnEl = document.getElementById('start-game');
const tableBodyEl = document.querySelector('tbody');
const tdEls = tableBodyEl.querySelectorAll('td');

let gameId = '';
let gamePublicKey = '';

// Fixture
const globalGame = {
  board: [
    [{ x: {} }, { o: {} }, {}],
    [{}, { o: {} }, {}],
    [{ o: {} }, { x: {} }, { x: {} }]
  ]
};
const playerOne = {
  publicKey: {
    toBuffer: () => {
      return Buffer.from('playerOne');
    }
  }
};
const player = {
  publicKey: 'player'
};

// Fixture
const workspace = {
  TicTacToe: {
    methods: {
      play: function (tile) {
        console.log(`Playing ${JSON.stringify(tile)}`);
        globalGame.board[tile.row][tile.column] = { x: {} };
        globalGame.board[(tile.row + 1) % 3][(tile.column + 1) % 3] = { o: {} };
        return workspace.TicTacToe.methods;
      },
      accounts: function (args) {
        return workspace.TicTacToe.methods;
      },
      signers: function (args) {
        return workspace.TicTacToe.methods;
      },
      rpc: async function () {
        await updateBoard();
        await new Promise(resolve => setTimeout(resolve, 1000));
        return workspace.TicTacToe.methods;
      }
    },
    account: {
      game: {
        fetch: async () => globalGame
      }
    }
  },
  programId: '11'
};
const program = workspace.TicTacToe;

tdEls.forEach(tdEl => {
  tdEl.addEventListener('click', async e => {
    e.preventDefault();
    const id = e.target.id;
    console.log(`Clicked ${id}`);
    const tile = idToTile(id);

    // Fixture
    const game = {};

    await program.methods
      .play(tile)
      .accounts({
        player: player.publicKey,
        game
      })
      .signers([player])
      .rpc();
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
/// 2. Check if a game with gameId exists
/// 3. Create a game if it doesn't exist
/// 4. Start/join the game
async function startGame(e) {
  e.preventDefault();
  showLoader(tableBodyEl);
  gameId = gameIdEl.value;
  gamePublicKey = PublicKey.findProgramAddressSync(
    [
      toUint8Array('game'),
      playerOne.publicKey.toBuffer(),
      toUint8Array(gameId)
    ],
    program.programId
  );
  await updateBoard();
  removeLoader(tableBodyEl);
  console.log('Starting Game');
}

startGameBtnEl.addEventListener('click', startGame);

async function getGameAccount() {
  const gameData = await program.account.game.fetch(gamePublicKey);
  return gameData;
}

async function updateBoard() {
  const gameAccount = await getGameAccount();
  const board = gameAccount.board;

  await new Promise(resolve => setTimeout(resolve, 1000));
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
