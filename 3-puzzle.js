import SearchTree from './search-tree.js';

class Puzzle extends SearchTree {
  static hash(state) {
    return state.data.order.join();
  }

  static makeStateData(a, b, c, d) {
    return { order: [a, b, c, d] };
  }

  generateDescendents(state, add) {
    let order = state.data.order;

    let add2 = (a, b, c, d) => add(order[a], order[b], order[c], order[d]);

    if (order[0] === 0 || order[1] === 0) {
      add2(1, 0, 2, 3);
    }

    if (order[0] === 0 || order[2] === 0) {
      add2(2, 1, 0, 3);
    }

    if (order[2] === 0 || order[3] === 0) {
      add2(0, 1, 3, 2);
    }

    if (order[1] === 0 || order[3] === 0) {
      add2(0, 3, 2, 1);
    }
  }
}

let puzzle = new Puzzle();
puzzle.run(Puzzle.makeStateData(1, 2, 3, 0));
