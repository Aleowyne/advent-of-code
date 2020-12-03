const solve = input => {
  // 1ère partie
  const data = input.filter(item => {
    [letter, word] = item.split(": ");
    [high, letter] = letter.split(" ");
    [low, high] = high.split("-");

    const regex = RegExp(`${letter}`, "g");
    const resultMatch = word.match(regex);

    return low <= resultMatch?.length && resultMatch?.length <= high;
  });
 
  console.log(data.length);

  // 2ème partie
  const dataTwo = input.filter(item => {
    [letter, word] = item.split(": ");
    [pos2, letter] = letter.split(" ");
    [pos1, pos2] = pos2.split("-");

    // Utilisation du XOR
    return (word.charAt(pos1-1) === letter && word.charAt(pos2-1) !== letter) || (word.charAt(pos1-1) !== letter && word.charAt(pos2-1) === letter);
  });

  console.log(dataTwo.length);
}

module.exports = { solve };


/**
 * Résultats : 
 * 1ère partie : 398
 * 2ème partie : 562
 */