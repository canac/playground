const expression = ''; // put real expression here
const clauses = new Set(expression.split(' & ').map(clause =>
  new Set(clause.split(' | ').map(literal => {
    const negated = literal.slice(0, 1) === '!';
    return {
      symbol: negated ? literal.slice(1) : literal,
      value: !negated,
    };
  }))
));

function serializeLiteral(literal) {
  return `${literal.value ? '' : '!'}${literal.symbol}`;
}

function serializeClause(literals) {
  return [...literals].map(literal => serializeLiteral(literal)).join(' | ');
}

function serializeClauses(clauses) {
  return [...clauses].map(literals => `(${serializeClause(literals)})`).join(' & ');
}

function firstRest(first, ...rest) {
  return [first, rest];
}

function findPureSymbol(symbols, clauses, model) {
  const pureSymbols = new Map();
  const impureSymbols = new Set();
  for (let clause of clauses) {
    for (let literal of clause) {
      // Ignore symbols already known to be impure
      if (!impureSymbols.has(literal.symbol)) {
        if (pureSymbols.has(literal.symbol)) {
          // This symbol has been encountered already
          if (literal.value !== pureSymbols.get(literal.symbol).value) {
            // Found mismatched values, so mark it as an impure symbol
            pureSymbols.delete(literal.symbol);
            impureSymbols.add(literal.symbol);
          }
        } else {
          // This symbol has not been encountered already, so add it as a pure symbol candidate
          pureSymbols.set(literal.symbol, literal);
        }
      }
    }
  }

  for (let [key, pureSymbol] of pureSymbols) {
    return pureSymbol;
  }

  return null;
}

function findUnitClause(symbols, clauses, model) {
  for (let clause of clauses) {
    if (clause.size === 1) {
      const [firstLiteral] = clause;
      return firstLiteral;
    }
  }

  return null;
}

function ddpl(clauses, symbols, model, depth=0) {
  // Normalize clauses
  clauses = new Set([...clauses].map(literals => new Set(literals)));
  for (let clause of clauses) {
    for (let literal of clause) {
      if (model.has(literal.symbol)) {
        // This symbol is assigned a value in the model
        const modelValue = model.get(literal.symbol);
        if (literal.value === modelValue) {
          // The literal evaluates to true, making the entire clause true, so remove it from the set of clauses
          clauses.delete(clause);
          break;
        } else {
          // The literal evaluates to false, so remove it from the set of literals
          clause.delete(literal);
        }
      }
    }

    if (clause.size === 0) {
      // The clause is empty, which means that it evaluates to false,
      // so the entire expression is evaluates to false as well
      return false;
    }
  }

  console.log(depth);
  console.log(serializeClauses(clauses));
  console.log(symbols);
  console.log(model);
  console.log('-'.repeat(20));

  if (clauses.size === 0) {
    // No clauses remain, which means that they all evaluated to true,
    // so the entire expression is evaluates to true as well
    return true;
  }

  const pureSymbol = findPureSymbol(symbols, clauses, model);
  if (pureSymbol !== null) {
    console.log(`Found pure symbol ${serializeLiteral(pureSymbol)}`);
    const newSymbols = new Set(symbols);
    newSymbols.delete(pureSymbol.symbol);
    const newModel = new Map(model);
    newModel.set(pureSymbol.symbol, pureSymbol.value);
    return ddpl(clauses, newSymbols, newModel, depth + 1);
  }

  const unitClause = findUnitClause(symbols, clauses, model);
  if (unitClause !== null) {
    console.log(`Found unit clause ${serializeLiteral(unitClause)}`);
    const newSymbols = new Set(symbols);
    newSymbols.delete(unitClause.symbol);
    const newModel = new Map(model);
    newModel.set(unitClause.symbol, unitClause.value);
    return ddpl(clauses, newSymbols, newModel, depth + 1);
  }

  const [symbol, rest] = firstRest(...symbols);
  const newSymbols = new Set(rest);
  const tryValue = value => {
    console.log(`Trying ${symbol} = ${value}`);
    const newModel = new Map(model);
    newModel.set(symbol, value);
    return ddpl(clauses, newSymbols, newModel, depth + 1);
  };

  return tryValue(true) || tryValue(false);
}

const success = ddpl(clauses, new Set('ABCDEF'), new Map());
console.log(`Success: ${success}`);
