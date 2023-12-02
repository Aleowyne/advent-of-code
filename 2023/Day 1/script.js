const WORD_TO_NUMBER = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

const solve = input => {
  // Partie 1
  console.log(part1(input));

  // Partie 2
  console.log(part2(input));
}

const part1 = (data) => {
  let sum = 0;

  data.forEach((item) => {
    let firstMatch = item.match(/(\d)/);
    let lastMatch = item.match(/.*(\d)/);
    let firstNumber = firstMatch?.[1] ?? '0';
    let lastNumber = lastMatch?.[1] ?? '0';

    sum += +(firstNumber + lastNumber);
  });

  return sum;
};

const part2 = (data) => {
  let sum = 0;

  data.forEach((item) => {
    let firstMatch = item.match(/(one|two|three|four|five|six|seven|eight|nine|\d)/);
    let lastMatch = item.match(/.*(one|two|three|four|five|six|seven|eight|nine|\d)/);
    let firstNumber = firstMatch ? WORD_TO_NUMBER[firstMatch[1]] ?? firstMatch[1] : '0';
    let lastNumber = lastMatch ? WORD_TO_NUMBER[lastMatch[1]] ?? lastMatch[1] : '0';

    sum += +(firstNumber + lastNumber);
  });

  return sum;
};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 55029
 * 2ème partie : 55686
 */