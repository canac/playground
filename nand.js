let nand = function(p, q) {
  return !(p && q);
};

let funcs = {
  reference: {
    t(p, q) {
      return true;
    },

    f(p, q) {
      return false;
    },

    p(p, q) {
      return p;
    },

    q(p, q) {
      return q;
    },

    notp(p, q) {
      return !p;
    },

    notq(p, q) {
      return !q;
    },

    and(p, q) {
      return p && q;
    },

    or(p, q) {
      return p || q;
    },

    xor(p, q) {
      return p !== q;
    },

    nand(p, q) {
      return !(p && q);
    },

    nor(p, q) {
      return !(p || q);
    },

    xnor(p, q) {
      return p === q;
    },
  },

  nand: {
    t(p, q) {
      return nand(p, nand(p, p));
    },

    f(p, q) {
      let r = nand(p, nand(p, p));
      return nand(r, r);
    },

    p(p, q) {
      let r = nand(p, p);
      return nand(r, r);
    },

    q(p, q) {
      let r = nand(q, q);
      return nand(r, r);
    },

    notp(p, q) {
      return nand(p, p);
    },

    notq(p, q) {
      return nand(q, q);
    },

    and(p, q) {
      let r = nand(p, q);
      return nand(r, r);
    },

    or(p, q) {
      return nand(nand(p, p), nand(q, q));
    },

    xor(p, q) {
      let r = nand(p, q);
      return nand(nand(p, r), nand(q, r));
    },

    nand(p, q) {
      return nand(p, q);
    },

    nor(p, q) {
      let r = nand(nand(p, p), nand(q, q));
      return nand(r, r);
    },

    xnor(p, q) {
      let r = nand(p, q);
      let s = nand(nand(p, r), nand(q, r));
      return nand(s, s);
    },
  },
};

// For each defined function
for (let name of Object.keys(funcs.reference)) {
  let different = false;

  // For each possible value of p and q
  for (let p of [true, false]) {
    for (let q of [true, false]) {
      // Ensure that the reference function and the nand-based function match
      if (funcs.reference[name](p, q) !== funcs.nand[name](p, q)) {
        different = true;
      }
    }
  }

  // Output the validity of the nand-based function
  console.log(`${different ? 'Invalid' : 'Valid'} for ${name}`);
}
