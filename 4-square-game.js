import SearchTree from './search-tree.js';

class Puzzle extends SearchTree {
  static hash(state) {
    return `${state.data.a}${state.data.b}${state.data.turn}`;
  }

  static makeStateData(a, b, turn) {
    return { a, b, turn };
  }

  static isTerminal(state) {
    return state.data.a === 4 || state.data.b === 1;
  }

  generateDescendents(state, add) {
    let { a, b, turn } = state.data;
    let nextTurn = turn === 'a' ? 'b' : 'a';

    let add2 = (a, b) => add(a, b, nextTurn);

    if (turn === 'a') {
      // It is A's turn
      if (a > 1) {
        // Move right
        add2(a - 1, b);
      }

      if (a > 2 && a === b + 1) {
        // Jump right
        add2(a - 2, b);
      }

      if (a < 4) {
        // Move left
        add2(a + 1, b);
      }

      if (a < 3 && a === b - 1) {
        // Jump left
        add2(a + 2, b);
      }
    } else {
      // It is B's turn
      if (b > 1) {
        // Move right
        add2(a, b - 1);
      }

      if (b > 2 && b === a + 1) {
        // Jump right
        add2(a, b - 2);
      }

      if (b < 4) {
        // Move left
        add2(a, b + 1);
      }

      if (b < 3 && b === a - 1) {
        // Jump left
        add2(a, b + 2);
      }
    }
  }
}

let puzzle = new Puzzle();
puzzle.run(Puzzle.makeStateData(1, 4, 'a'));
