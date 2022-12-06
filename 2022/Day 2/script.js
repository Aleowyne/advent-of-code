const pointRound = {
  WIN: 6,
  DRAW: 3,
  LOSE: 0,
}

const pointShape = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
}

const shape = {
  A: pointShape.ROCK,
  B: pointShape.PAPER,
  C: pointShape.SCISSORS,
  X: pointShape.ROCK,
  Y: pointShape.PAPER,
  Z: pointShape.SCISSORS,
}

const roundStrategy = {
  'A Y': pointRound.WIN,
  'B Z': pointRound.WIN,
  'C X': pointRound.WIN,
  'A X': pointRound.DRAW,
  'B Y': pointRound.DRAW,
  'C Z': pointRound.DRAW,
  'A Z': pointRound.LOSE,
  'B X': pointRound.LOSE,
  'C Y': pointRound.LOSE,
}


const solve = input => {
  // Partie 1
  console.log(sumPoint1(input));

  // Partie 2
  console.log(sumPoint2(input));
}


/**
 * Somme des points pour la partie 1
 */
const sumPoint1 = (strategies) => {
  return strategies.reduce((sumPoint, strategy) => {
    const [, me] = strategy.split(' ');
    return sumPoint + roundStrategy[strategy] + shape[me];
  }, 0);
}


/**
 * Somme des points pour la partie 2
 */
const sumPoint2 = (strategies) => {
  return strategies.reduce((sumPoint, strategy) => {
    const [opponent, objective] = strategy.split(' ');

    let me = '';

    switch (objective) {
      // On doit perdre
      case 'X':
        me = (opponent === 'A' ? 'C' : String.fromCharCode(opponent.charCodeAt(0) - 1));
        return sumPoint + pointRound.LOSE + shape[me];

      // Match nul
      case 'Y':
        return sumPoint + pointRound.DRAW + shape[opponent];

      // On doit gagner
      case 'Z':
        me = (opponent === 'C' ? 'A' : String.fromCharCode(opponent.charCodeAt(0) + 1));
        return sumPoint + pointRound.WIN + shape[me];

      default:
        return sumPoint;
    }
  }, 0);
}

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 8890
 * 2ème partie : 10238
 */