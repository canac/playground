let states = [];

let stringify = state => `${state.wa},${state.nt},${state.q},${state.nsw},${state.v},${state.sa},${state.t}`;

// Generate all valid states
const colors = ['r', 'g', 'b', 'y'];
colors.forEach(wa => {
  colors.forEach(nt => {
    colors.forEach(q => {
      colors.forEach(nsw => {
        colors.forEach(v => {
          colors.forEach(sa => {
            colors.forEach(t => {
              if (sa === wa || sa === nt || sa === q || sa === nsw || sa === v || wa === nt || nt === q || q === nsw || nsw === v) {
                return;
              }

              states.push({ wa, nt, q, nsw, v, sa, t });
            });
          });
        });
      });
    });
  });
});

states.forEach(state => {
  console.log(stringify(state));
});

console.log(`${states.length} solutions`);
