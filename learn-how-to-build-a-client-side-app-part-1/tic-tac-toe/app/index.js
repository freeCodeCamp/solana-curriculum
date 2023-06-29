const gameIdEl = document.getElementById('game-id');
const startGameBtnEl = document.getElementById('start-game');
const tableBodyEl = document.querySelector('tbody');

let gameId = '';
let gamePublicKey = '';
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
const PublicKey = {
  findProgramAddressSync: (args, programId) => {
    return args;
  }
};
const Buffer = {
  from: (str, encoding) => {
    return str;
  }
};

const tdEls = tableBodyEl.querySelectorAll('td');

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

    //Fixture
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

async function startGame(e) {
  e.preventDefault();
  showLoader(tableBodyEl);
  gameId = gameIdEl.value;
  gamePublicKey = PublicKey.findProgramAddressSync(
    [Buffer.from('game'), playerOne.publicKey.toBuffer(), Buffer.from(gameId)],
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

document.addEventListener('DOMContentLoaded', async () => {
  // TODO
});
