const solve = input => {

  // Partie 1
  console.log(getNbChar(input[0], 4));

  // Partie 2
  console.log(getNbChar(input[0], 14));
}


const getNbChar = (buffer, lengthMarker) => {
  let sum = 0;
  const endMarker = buffer.length - lengthMarker;

  for (let start = 0; start <= endMarker; start++) {
    const end = start + lengthMarker;
    const marker = new Set(buffer.slice(start, end));

    // Si le marqueur est trouvé
    if (marker.size === lengthMarker) {
      sum += end;
      break;
    }
  }

  return sum;
};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 1542
 * 2ème partie : 3153
 */