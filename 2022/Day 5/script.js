const solve = input => {
  const nbStack = 9;

  // Partie 1
  console.log(supplyStack('9000', nbStack, input));

  // Partie 2
  console.log(supplyStack('9001', nbStack, input));
}


class Stock {
  constructor(nbStack) {
    this.stacks = Array.from({ length: nbStack }, () => new Stack());
  }
}

class Stack {
  constructor() {
    this.crates = [];
  }

  // Ajout d'une caisse en bas de la pile
  addBottom(crate) {
    this.crates.unshift(crate);
  }

  // Récupération d'une caisse en haut de la pile
  getTop() {
    return this.crates.pop();
  }

  // Déplacement de plusieurs caisses d'une pile à une autre, en plusieurs fois
  moveCrate9000(nbCrates, toStack) {
    while (nbCrates !== 0) {
      const crate = this.getTop();
      toStack.crates.push(crate);
      nbCrates--;
    }
  }

  // Déplacement de plusieurs caisses d'une pile à une autre, en une seule fois
  moveCrate9001(nbCrates, toStack) {
    const crates = this.crates.splice(-nbCrates, nbCrates);
    toStack.crates.push(...crates);
  }
}


const supplyStack = (cratesMover, nbStack, lines) => {
  let stock = new Stock(nbStack);

  for (const line of lines) {
    if (!line || line.charAt(1) === '1') {
      continue;
    }

    // Récupération des instructions de déplacement
    const instructions = line.match(/move (\d+) from (\d+) to (\d+)/);

    if (instructions) {
      const [, nbCrates, fromStack, toStack] = instructions;

      if (cratesMover === '9001') {
        stock.stacks[fromStack - 1].moveCrate9001(nbCrates, stock.stacks[toStack - 1]);
      }
      else {
        stock.stacks[fromStack - 1].moveCrate9000(nbCrates, stock.stacks[toStack - 1]);
      }
      continue;
    }

    // Récupération des caisses
    const stacks = line.matchAll(/((?<crate>\[\w\]|\s{3})\s?)/g);

    let i = 0;

    // Création des piles de caisses
    for (const stack of stacks) {
      const crate = stack.groups.crate.charAt(1);

      if (crate !== ' ') {
        stock.stacks[i].addBottom(crate);
      }

      i++;
    }
  }

  return stock.stacks.reduce((result, stack) => {
    return result + stack.getTop();
  }, '');
};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : MQSHJMWNH
 * 2ème partie : LLWJRBHVZ
 */