const solve = input => {
  const mapTree = input.map(item => {
    return item.split("");
  });

  // Partie 1 : Nombre d'arbres avec un décalage de 3 vers la droite et de 1 vers le bas
  console.log(calculNbTree(input, 3, 1));

  /* Partie 2 : Nombre d'arbres avec un décalage de :
     => 1 vers la droite et de 1 vers le bas
     => 3 vers la droite et de 1 vers le bas
     => 5 vers la droite et de 1 vers le bas
     => 7 vers la droite et de 1 vers le bas
     => 1 vers la droite et de 2 vers le bas
     Les nombres récupérés sont ensuite multipliés */
  console.log(
    calculNbTree(input, 1, 1)
    * calculNbTree(input, 3, 1)
    * calculNbTree(input, 5, 1)
    * calculNbTree(input, 7, 1)
    * calculNbTree(input, 1, 2)
  );
}

/**
 * Calcule le nombre d'arbres sur une "map" en fonction d'une pente
 * @param {array} input Tableau d'élements
 * @param {integer} rightOffset Décalage vers la droite
 * @param {integer} bottomOffset Décalage vers le bas
 */
const calculNbTree = (input, rightOffset, bottomOffset) => {
  let index = 0;

  return input.reduce((nbTree, line, indexLine) => {
    // Gestion du décalage vers le bas
    if (indexLine % bottomOffset !== 0) {
      return nbTree;
    }

    // Fin de la ligne => Retour au début de la ligne en recalculant l'index
    if (line[index] === undefined) {
      index -= line.length;
    }

    // Incrémentation du nombre d'arbres
    if (line[index] === "#") {
      index += rightOffset;
      return nbTree + 1;
    }

    index += rightOffset;
    return nbTree;
  }, 0);
}

module.exports = { solve };


/**
 * Résultats :
 * 1ère partie : 257
 * 2ème partie : 1744787392
 */