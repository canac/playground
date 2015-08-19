import SearchTree from './search-tree.js';

export default class GameTree extends SearchTree {
  static utility(state) {
    return null;
  }

  static isTerminal(state) {
    return state.utility !== null;
  }

  getState(stateData) {
    const state = super.getState(stateData);
    if (typeof state.utility === 'undefined') {
      state.utility = this.constructor.utility(state);
    }

    return state;
  }

  // Calculate the minimax value of the root node
  minimax() {
    const [ rootNode ] = this.states.values();
    return this.calculateMinimax(rootNode, 0);
  }

  // Calculate and return the minimax value of the node
  // Use max on even depth and min on odd depth
  calculateMinimax(node, depth) {
    if (node.utility !== null) {
      // This is a terminal node, so return the utility directly
      return node.utility;
    }

    // Run max if or min over the node's descendents
    const func = depth % 2 === 0 ? Math.max : Math.min;
    return func(...node.descendents.map(node => this.calculateMinimax(node, depth + 1)));
  }
}
