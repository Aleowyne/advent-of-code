const solve = input => {
  // Partie 1
  console.log(part1(input));

  // Partie 2
  console.log(part2(input));
}

const part1 = (data) => {
  let sum = 0;

  data.forEach(line => {
    const [firstPart, secondPart] = line.split(":")[1].split("|");
    const winningNumbers = firstPart.trim().replace(/\s+/g, " ").split(" ");
    const ourNumbers = secondPart.trim().replace(/\s+/g, " ").split(" ");

    let score = 0;

    ourNumbers.forEach(number => {
      if (winningNumbers.includes(number)) {
        score = score === 0 ? 1 : score * 2;
      }
    });

    sum += score;
  });

  return sum;
};

const part2 = (data) => {
  let sum = 0;
  let cardsArray = new Array(data.length + 10).fill(0);

  data.forEach((line, index) => {
    const [firstPart, secondPart] = line.split(":")[1].split("|");
    const winningNumbers = firstPart.trim().replace(/\s+/g, " ").split(" ");
    const ourNumbers = secondPart.trim().replace(/\s+/g, " ").split(" ");
    let i = index + 1;
    cardsArray[i]++;
    let nbCards = cardsArray[i];
    i++;

    ourNumbers.forEach(number => {
      if (winningNumbers.includes(number)) {
        cardsArray[i] += nbCards;
        i++;
      }
    });

    sum += cardsArray[index + 1];
  });

  return sum;
};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 25651
 * 2ème partie : 19499881
 */