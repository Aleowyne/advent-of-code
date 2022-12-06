const solve = input => {
  // Changement du type de données (string => number)
  let data = input.map(item => Number(item));
  let solvePart1;

  for (let index = 0; index < data.length - 25; index++) {
    if (!part1(data.slice(index, index + 26))) {
      solvePart1 = data[index + 25];
      break;
    };
  }

  console.log(solvePart1);

  for (let index = 0; index < data.length; index++) {
    let range = part2(data.slice(index), solvePart1);

    if (range !== undefined) {
      console.log(Math.min(...range) + Math.max(...range));
      break;
    }
  }
}

const part1 = input => {
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 25; j++) {
      if (input[i] + input[j] === input[25]) {
        return true;
      }
    }
  }

  return false;
}


const part2 = (input, searchSum) => {
  let sum = 0;
  let range = new Array();

  for (let item of input) {
    sum += item;
    range.push(item);

    if (sum === searchSum) {
      return range;
    }
    else if (sum > searchSum) {
      return;
    }
  }
}


module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 552655238
 * 2ème partie : 70672245
 */