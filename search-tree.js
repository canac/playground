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

  // Lookup or create the state from the provided state data
  getState(stateData) {
    let state = {
      descendents: [],
      expanded: false,
      data: stateData,
    };
    let hash = this.constructor.hash(state);

    // Record this state if it has not already been seen
    let existingState = this.states.get(hash);
    if (existingState) {
      return existingState;
    } else {
      this.states.set(hash, state);
      return state;
    }
  }

  generateStates(stateData) {
    let state = this.getState(stateData);
    if (state.expanded) {
      // This node has already been expanded, so ignore it
      return state;
    }

    // Mark the node as expanded
    state.expanded = true;

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
