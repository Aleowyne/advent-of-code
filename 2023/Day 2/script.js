const BAG_CONTENT = {
  red: 12,
  green: 13,
  blue: 14
};

const solve = input => {
  // Partie 1
  console.log(part1(input));

  // Partie 2
  console.log(part2(input));
}

const part1 = (data) => {
  let sum = 0;

  data.forEach(line => {
    let gameOver = false;
    const [game, gameContent] = line.split(': ');
    const gameNumber = game.match(/(\d+)/)[1];
    const bags = gameContent.replaceAll(';', ',');
    const cubes = bags.split(', ');

    for (const cube of cubes) {
      const [number, color] = cube.split(' ');

      if (BAG_CONTENT[color] < +number) {
        gameOver = true;
        break;
      }
    }

    if (!gameOver) {
      sum += +gameNumber;
    }
  });

  return sum;
};

const part2 = (data) => {
  let sum = 0;

  data.forEach(line => {
    let maxNbColor = {
      red: 0,
      green: 0,
      blue: 0
    };

    const gameContent = line.split(': ')[1];
    const bags = gameContent.replaceAll(';', ',');
    const cubes = bags.split(', ');

    cubes.forEach(cube => {
      const [number, color] = cube.split(' ');
      maxNbColor[color] = Math.max(maxNbColor[color], number);
    });

    sum += Object.values(maxNbColor).reduce((power, current) => power * current, 1);
  });

  return sum;
};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 2204
 * 2ème partie : 71036
 */