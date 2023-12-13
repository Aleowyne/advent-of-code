const solve = input => {
  // Partie 1
  console.log(part1(input));

  // Partie 2
  // console.log(part2(input));
}

const getMirrorIndex = (pattern) => {
  for (let i = 0; i < pattern.length - 1; i++) {
    if (pattern[i] === pattern[i + 1]) {
      let topIndex = i;
      let bottomIndex = i + 1;

      while (topIndex >= 0 && bottomIndex < pattern.length) {
        if (pattern[topIndex] !== pattern[bottomIndex]) {
          break;
        }

        topIndex--;
        bottomIndex++;
      }

      if (topIndex < 0 || bottomIndex >= pattern.length) {
        return i;
      }
    }
  }

  return -1;
};

const part1 = (data) => {
  const patternsHorizontal = [];
  let pattern = [];
  let sum = 0;

  for (const line of data) {
    if (line === "") {
      patternsHorizontal.push(pattern);
      pattern = [];
    }
    else {
      pattern.push(line);
    }
  }

  for (const patternHorizontal of patternsHorizontal) {
    const patternVertical = patternHorizontal[0].split("").map((_, y) =>
      patternHorizontal.map((pattern) => pattern[y]).join("")
    );

    sum += (getMirrorIndex(patternHorizontal) + 1) * 100;
    sum += getMirrorIndex(patternVertical) + 1;
  }

  return sum;
};

const part2 = (data) => {

};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 30802
 * 2ème partie : 
 */