const solve = input => {
  // Partie 1
  console.log(parts(input, 1));

  // Partie 2
  console.log(parts(input, 999999));
}

const parts = (data, expansion) => {
  const map = data.map(line => line.split(""));
  const galaxies = [];
  const emptyLineX = [];
  const emptyLineY = [];
  let nbRow = data.length;
  let nbCol = data[0].length;
  let sum = 0;

  // Récupération des galaxies et détermination des lignes vides
  for (let x = 0; x < nbRow; x++) {
    let addColumn = true;

    for (let y = 0; y < nbCol; y++) {
      if (map[x][y] === "#") {
        addColumn = false;
        galaxies.push({ x, y });
      }
    }

    if (addColumn) {
      emptyLineX.push(x);
    }
  }

  // Détermination des colonnes vides
  for (let y = 0; y < nbCol; y++) {
    if (galaxies.every(galaxy => galaxy.y !== y)) {
      emptyLineY.push(y);
    }
  }

  for (let i = 0; i < galaxies.length - 1; i++) {
    const sourceGalaxy = galaxies[i];

    for (let j = i + 1; j < galaxies.length; j++) {
      const destGalaxy = galaxies[j];

      const nbExpansionX = emptyLineX.filter(x => {
        return (sourceGalaxy.x < destGalaxy.x && x > sourceGalaxy.x && x < destGalaxy.x) || (sourceGalaxy.x > destGalaxy.x && x < sourceGalaxy.x && x > destGalaxy.x);
      }).length * expansion;

      const nbExpansionY = emptyLineY.filter(y => {
        return (sourceGalaxy.y < destGalaxy.y && y > sourceGalaxy.y && y < destGalaxy.y) || (sourceGalaxy.y > destGalaxy.y && y < sourceGalaxy.y && y > destGalaxy.y);
      }).length * expansion;

      sum += Math.abs(destGalaxy.x - sourceGalaxy.x) + Math.abs(destGalaxy.y - sourceGalaxy.y) + nbExpansionX + nbExpansionY;
    }
  }

  return sum;
};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 10313550
 * 2ème partie : 611998089572
 */