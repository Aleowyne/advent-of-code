const solve = input => {
  // Partie 1
  console.log(part1(input));

  // Partie 2
  console.log(part2(input));
}


class Elf {
  constructor(pair) {
    [this.start, this.end] = pair.split('-');
    this.start = Number(this.start);
    this.end = Number(this.end);
  }

  // Une paire contenue entièrement dans une autre paire
  isContained(elf) {
    return this.start <= elf.start && this.end >= elf.end;
  }

  // Chevauchement simple de deux paires
  hasOverlap(elf) {
    return this.start >= elf.start && this.start <= elf.end;
  }
}

/**
 * Partie 1
 */
const part1 = (pairs) => {
  return pairs.reduce((sum, pair) => {
    const [firstInterval, secondInterval] = pair.split(',');
    const firstElf = new Elf(firstInterval);
    const secondElf = new Elf(secondInterval);

    if (firstElf.isContained(secondElf) || secondElf.isContained(firstElf)) {
      sum++;
    }

    return sum;
  }, 0);
};

/**
 * Partie 2
 */
const part2 = (pairs) => {
  return pairs.reduce((sum, pair) => {
    const [firstInterval, secondInterval] = pair.split(',');
    const firstElf = new Elf(firstInterval);
    const secondElf = new Elf(secondInterval);

    if (firstElf.hasOverlap(secondElf) || secondElf.hasOverlap(firstElf)) {
      sum++;
    }

    return sum;
  }, 0);
};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 431
 * 2ème partie : 823
 */