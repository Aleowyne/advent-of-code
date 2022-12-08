const solve = input => {
  // Partie 1
  console.log(part1(input));

  // Partie 2
  console.log(part2(input));
}


/**
 * Partie 1
 */
const part1 = (bags) => {
  return bags.reduce((sum, bag) => {
    let firstHalf = bag.slice(0, bag.length / 2).split('');
    let secondHalf = bag.slice(bag.length / 2).split('');
    let sumBag = 0;

    for (const letter of firstHalf) {
      if (secondHalf.includes(letter)) {
        // Si la lettre est une minuscule
        if (letter === letter.toLowerCase()) {
          sumBag += letter.charCodeAt() - 96;
        }
        // Si la lettre est une majuscule
        else {
          sumBag += letter.charCodeAt() - 38;
        }
        break;
      }
    }

    return sum + sumBag;

  }, 0);
};

/**
 * Partie 2
 */
const part2 = (bags) => {
  let group = [];
  let sumBag = 0;

  bags.forEach(bag => {
    group.push(bag.split(''));

    // Groupe de 3 sacs
    if (group.length === 3) {
      group.sort((a, b) => a.length < b.length);

      for (const letter of group[0]) {
        if (group[1].includes(letter) && group[2].includes(letter)) {
          // Si la lettre est une minuscule
          if (letter === letter.toLowerCase()) {
            sumBag += letter.charCodeAt() - 96;
          }
          // Si la lettre est une majuscule
          else {
            sumBag += letter.charCodeAt() - 38;
          }
          break;
        }
      }

      group = [];
    }
  });

  return sumBag;
};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 7597
 * 2ème partie : 2607
 */