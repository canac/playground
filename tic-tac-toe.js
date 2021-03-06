import GameTree from './game-tree.js';

class TicTacToe extends GameTree {
  static hash(state) {
    return state.data.grid.join('');
  }

  static makeStateData(grid, currentPlayer) {
    return { grid, currentPlayer };
  }

  static utility(state) {
    const lines = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // top column
      [1, 4, 7], // middle column
      [2, 5, 8], // bottom column
      [0, 4, 8], // first diagonal
      [2, 4, 6], // second diagonal
    ];

    const grid = state.data.grid;
    let utility = null;
    lines.forEach(line => {
      const [ first, second, third ] = [grid[line[0]], grid[line[1]], grid[line[2]]];
      if (first !== 0 && first === second && first === third) {
        // The game is over if the first, second, and third cells in the grid are equal and non-empty
        utility = first === 1 ? 1 : -1;
      }
    });

    if (utility) {
      return utility;
    }

    // The game is a draw if every cell is non-empty, and it is uncompleted otherwise
    return grid.every(cell => cell !== 0) ? 0 : null;
  }

  generateDescendents(state, add) {
    const { grid, currentPlayer } = state.data;
    const nextPlayer = currentPlayer === 1 ? 2 : 1;

    grid.forEach((value, index) => {
      if (value === 0) {
        const newGrid = grid.slice();
        newGrid[index] = currentPlayer;
        add(newGrid, nextPlayer);
      }
    });
  }
}

const game = new TicTacToe();
game.generateTree(TicTacToe.makeStateData(Array(9).fill(0), 1));
console.log(`Root node minimax value is ${game.minimax()}`);
