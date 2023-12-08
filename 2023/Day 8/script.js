const REGEX_FINISH_A = /..A/;
const REGEX_FINISH_Z = /..Z/;

const solve = input => {
  // Partie 1
  console.log(part1(input));

  // Partie 2
  console.log(part2(input));
}

const part1 = (data) => {
  const directions = data[0].split("");

  const nodes = data.slice(2).map((line) => {
    const [_, origin, left, right] = line.match(/(.{3}) = \((.{3}), (.{3})\)/);
    return { origin, left, right };
  });

  let finish = false;
  let cursor = "AAA";
  let nbSteps = 0;

  while (!finish) {
    for (const direction of directions) {
      const node = nodes.find((node) => node.origin === cursor);
      cursor = direction === "L" ? node.left : node.right;
      nbSteps++;

      if (cursor === "ZZZ") {
        finish = true;
        break;
      }
    }
  }

  return nbSteps;
};

// Calcul du PGCD et du PPCM de deux nombres
const calculatePGCD = (a, b) => b === 0 ? a : calculatePGCD(b, a % b);
const calculatePPCM = (a, b) => (a * b) / calculatePGCD(a, b);

const part2 = (data) => {
  const directions = data[0].split("");
  let cursors = [];

  const nodes = data.slice(2).map((line) => {
    const [_, origin, left, right] = line.match(/(.{3}) = \((.{3}), (.{3})\)/);

    if (REGEX_FINISH_A.test(origin)) {
      cursors.push(origin);
    }

    return { origin, left, right };
  });

  let finish = false;
  let nbSteps = 0;
  let nbtotalSteps = 1;

  while (!finish) {
    for (const direction of directions) {
      let cursorsTmp = [];
      nbSteps++;

      for (const cursor of cursors) {
        const node = nodes.find((node) => node.origin === cursor);
        const newCursor = direction === "L" ? node.left : node.right;

        if (REGEX_FINISH_Z.test(newCursor)) {
          nbtotalSteps = calculatePPCM(nbtotalSteps, nbSteps);
        }
        else {
          cursorsTmp.push(newCursor);
        }
      }

      cursors = cursorsTmp;

      if (cursors.length === 0) {
        finish = true;
        break;
      }
    }
  }

  return nbtotalSteps;
};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 24253
 * 2ème partie : 12357789728873
 */