const solve = input => {
  let maxId = 0;
  let listId = new Array();

  for (let line of input) {
    line = place(line, {});

    // Calcul de l'ID de la carte d'embarquement
    let id = line.minLine * 8 + line.minColumn;

    listId.push(id);

    // Détermination de l'ID max
    maxId = id > maxId ? id : maxId;
  }

  console.log(maxId);

  // Tri croissant
  listId.sort((a, b) => a - b);

  // Récupération de l'ID manquant = Notre emplacement
  for (let id = 0; id <= listId.length; id++) {
    if (listId[id] !== listId[id + 1] - 1) {
      console.log(listId[id]+1);
      return;
    }
  }
}

/**
 * Détermination de la place (ligne, colonne) d'une personne selon sa carte d'embarquement
 * @param {string} line Ligne du fichier
 * @param {object} param1 N° ligne minimum et maximum, N° colonne minimum et maximum
 */
const place = (line, { minLine = 0, maxLine = 127, minColumn = 0, maxColumn = 7 }) => {

  switch (line.charAt(0)) {
    // Moitié inférieure pour les lignes
    case 'F':
      maxLine = Math.floor(maxLine - (maxLine - minLine) / 2);
      minLine = line.length === 4 ? maxLine : minLine;
      break;

    // Moitié supérieure pour les lignes
    case 'B':
      minLine = Math.ceil(minLine + (maxLine - minLine) / 2);
      maxLine = line.length === 4 ? minLine : maxLine;
      break;

    // Moitié inférieure pour les colonnes
    case 'L':
      maxColumn = Math.floor(maxColumn - (maxColumn - minColumn) / 2);
      minColumn = line.length === 1 ? maxColumn : minColumn;
      break;

    // Moitié supérieure pour les colonnes
    case 'R':
      minColumn = Math.ceil(minColumn + (maxColumn - minColumn) / 2);
      maxColumn = line.length === 1 ? minColumn : maxColumn;
      break;

    default:
      break;
  }

  // Fin de la ligne
  if (line.length === 1) {
    return ({ minLine, maxLine, minColumn, maxColumn });
  }

  return place(line.slice(1), { minLine, maxLine, minColumn, maxColumn });
}

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 816
 * 2ème partie : 539
 */