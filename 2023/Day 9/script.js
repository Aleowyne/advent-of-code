const solve = input => {
  // Partie 1
  console.log(part1(input));

  // Partie 2
  console.log(part2(input));
}

const part1 = (data) => {
  const map = [];
  let lastNumbers = [];
  let sum = 0;

  for (const line of data) {
    map.push(line.split(" ").map(Number));
  }

  for (let i = 0; i < map.length; i++) {
    const listNumbers = map[i];
    lastNumbers.push(listNumbers.at(-1));

    const diff = listNumbers.reduce((diff, current, index) => {
      if (index === 0) {
        return diff;
      }

      diff.push(current - listNumbers[index - 1]);
      return diff;
    }, []);

    // Ligne avec que des 0
    if (diff.every(num => num === 0)) {
      for (const num of lastNumbers) {
        sum += num;
      }
      lastNumbers = [];
    }
    else {
      map.splice(i + 1, 0, diff);
    }
  }

  return sum;
};



const part2 = (data) => {
  const map = [];
  let firstNumbers = [];
  let sum = 0;

  for (const line of data) {
    map.push(line.split(" ").map(Number));
  }

  for (let i = 0; i < map.length; i++) {
    const listNumbers = map[i];
    firstNumbers.push(listNumbers[0]);

    const diff = listNumbers.reduce((diff, current, index) => {
      if (index === 0) {
        return diff;
      }

      diff.push(current - listNumbers[index - 1]);
      return diff;
    }, []);

    // Ligne avec que des 0
    if (diff.every(num => num === 0)) {
      firstNumbers.reverse();
      let result = firstNumbers.shift();

      for (const num of firstNumbers) {
        result = num - result;
      }

      sum += result;
      firstNumbers = [];
    }
    else {
      map.splice(i + 1, 0, diff);
    }
  }

  return sum;
};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 1898776583
 * 2ème partie : 1100
 */