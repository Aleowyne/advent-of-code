const solve = input => {
  // Changement du type de données (string => number)
  let data = input.map(item => Number(item));

  // Partie 1
  console.log(maxCalories(data));

  // Partie 2
  console.log(
    caloriesByElf(data)
      .slice(0, 3)
      .reduce((a, b) => a + b, 0));
}

/**
 * Récupère le nombre de calories max parmi les paquetages des elfes
 */
const maxCalories = (caloriesItems) => {
  let maxCalories = 0;

  caloriesItems.reduce((sumCalories, currentCalories) => {
    if (!currentCalories) {
      maxCalories = Math.max(maxCalories, sumCalories);
      return 0;
    }

    return sumCalories + currentCalories;
  }, 0)

  return maxCalories;
}

/**
 * Calcule le nombre de calories par elfe
 */
const caloriesByElf = (caloriesItems) => {
  let caloriesByElf = [];

  caloriesItems.reduce((sumCalories, currentCalories) => {
    if (!currentCalories) {
      caloriesByElf.push(sumCalories);
      return 0;
    }

    return sumCalories + currentCalories;
  }, 0)

  caloriesByElf.sort((a, b) => b - a);

  return caloriesByElf;
}

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 69912
 * 2ème partie : 208180
 */