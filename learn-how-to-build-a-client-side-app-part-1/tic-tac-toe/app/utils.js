const errorsEl = document.getElementById('errors');
const spinnerEl = document.getElementById('spinner');

const tableBodyEl = document.querySelector('tbody');
const tdEls = tableBodyEl.querySelectorAll('td');

/**
 * @param {{x: {}}|{ o: {}} | null} tile
 * @returns 'X' | 'O' | ''
 */
export function tileToString(tile) {
  if (tile?.x) {
    return 'X';
  }
  if (tile?.o) {
    return 'O';
  }
  return '';
}

/**
 *
 * @param {({x: {}}| { o: {}} | null)[][]} board
 */
export function setTiles(board) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const tile = board[i][j];
      const tileEl = tdEls[i * 3 + j];
      tileEl.textContent = tileToString(tile);
    }
  }
}

/**
 * @param {Error | undefined} error
 */
export function displayError(error) {
  if (error) {
    console.error(error);
    errorsEl.innerText = error.message;
  } else {
    errorsEl.innerText = '';
  }
}

/**
 * @param {number} id
 * @returns {{row: number; column: number}}
 */
export function idToTile(id) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const tile = tdEls[i * 3 + j];
      if (tile.id === id) {
        return { row: i, column: j };
      }
    }
  }
}

export function showLoader() {
  spinnerEl.classList.remove('hidden');
}

export function removeLoader() {
  spinnerEl.classList.add('hidden');
}
