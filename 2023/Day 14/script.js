const solve = input => {
  // Partie 1
  console.log(part1(input));

  // Partie 2
  // console.log(part2(input));
}

const part1 = (data) => {
  let row = data.length;
  let currentRowByCol = new Array(data[0].length).fill(row);
  let sum = 0;

  for (const line of data) {
    const letters = line.split('');

    for (let i = 0; i < letters.length; i++) {
      if (letters[i] === 'O') {
        sum += currentRowByCol[i];
        currentRowByCol[i] -= 1;
      }

      if (letters[i] === '#') {
        currentRowByCol[i] = row - 1;
      }
    }

    row--;
  }

  return sum;
};

const part2 = (data) => {

};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 106997
 * 2ème partie : 
 */