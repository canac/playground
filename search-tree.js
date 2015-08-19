export default class SearchTree {
  static hash(state) {
    return JSON.stringify(state.data);
  }

  static makeStateData(...args) {
    return args;
  }

  static isTerminal(state) {
    return false;
  }

  generateTree(initialStateData) {
    this.states = new Map();
    this.generateStates(initialStateData);
  }

  printTree() {
    for (let [hash, state] of this.states) {
      console.log(`${hash} => ${state.descendents.map(state => this.constructor.hash(state)).join(' | ')}`);
    }
  }

  run(initialStateData) {
    this.generateTree(initialStateData);
    this.printTree();
  }

  generateDescendents(state, add) {
  }

  generateStates(stateData) {
    // Create a new state instance with the given state data
    let state = {
      descendents: [],
      data: stateData,
    };
    let hash = this.constructor.hash(state);

    // Record this state if it has not already been seen
    let existingState = this.states.get(hash);
    if (existingState) {
      return existingState;
    } else {
      this.states.set(hash, state);
    }

    // This is a terminal state, so abort
    if (this.constructor.isTerminal(state)) {
      return state;
    }

    let add = (...args) => {
      state.descendents.push(this.generateStates(this.constructor.makeStateData(...args)));
    };

    this.generateDescendents(state, add);

    return state;
  }
}
