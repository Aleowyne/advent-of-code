const solve = input => {
  // Changement du type de données (string => number)
  let data = input.map(item => Number(item));

  // Tri croissant
  data.sort((a, b) => a - b);

  calcul(data, 3, 0, 1);
}

/**
 * Calcule le produit de "nb" élements d'un tableau si la somme de ces éléments est égale à 2020
 * @param {array} input Liste d'éléments
 * @param {integer} nb Nombre d'élements du tableau à utiliser pour le calcul
 * @param {integer} sum Somme des "nb" éléments
 * @param {integer} prod Produit des "nb" éléments
 */
const calcul = (input, nb, sum, prod) => {
  nb--;

  for (let item of input) {
    if (nb !== 0) {
      if (calcul(input.slice(1), nb, sum + item, prod * item)) {
        return true;
      }
    }
    else {
      // La somme des éléments est égale à 2020
      if (sum + item === 2020) {
        console.log(prod * item);
        return true;
      }
      // Comme les éléments sont triés, pas besoin de continuer le calcul, car il sera supérieur à 2020
      else if (sum + item > 2020) {
        return false;
      }
    }
  }
}

module.exports = { solve };

/**
 * Résultats :
 * Avec deux éléments : 1007104
 * Avec trois éléments : 18847752
 */