let states = [];

let stringify = state => `${state.m},${state.c},${state.b}`;

// Generate all valid states
for (let m = 0; m <= 3; ++m) {
  for (let c = 0; c <= 3; ++c) {
    ['b', 'x'].forEach(b => {
      if (m === c || m === 0 || m === 3) {
        if (!(m === 0 && c === 0 && b === 'b') && !(m === 3 && c === 3 && b === 'x')) {
          states.push({ m, c, b });
        }
      }
    });
  }
}

states.reverse().forEach(state => {
  state.descendents = states.filter(state2 => {
    let deltaM = state.b === 'b' ? (state.m - state2.m) : (state2.m - state.m);
    let deltaC = state.b === 'b' ? (state.c - state2.c) : (state2.c - state.c);
    let deltaP = deltaM + deltaC;
    if (state.b === state2.b) {
      // The boat must move
      return false;
    } else if (deltaM < 0 || deltaC < 0) {
      // A negative number of people cannot be moved
      return false;
    } else if (deltaP < 1 || deltaP > 2) {
      // The boat must contain 1 or 2 people
      return false;
    }

    return true;
  }).map(stringify);

  if (state.descendents.length > 0) {
    console.log(`${stringify(state)} => ${state.descendents.join(' | ')}`);
  }
});
