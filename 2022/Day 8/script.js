const solve = input => {
  const forest = new Forest();
  forest.createArrayOfTrees(input);
  forest.explore();
}


class Forest {
  constructor() {
    this.trees = [];
    this.currentTree = 0;
    this.nbNoBlockedTreesLeft = 0;
    this.nbNoBlockedTreesRight = 0;
    this.nbNoBlockedTreesTop = 0;
    this.nbNoBlockedTreesBottom = 0;
  }

  /**
   * Hauteur de la forêt
   * @returns La hauteur de la forêt
   */
  getHeight() {
    return this.trees.length;
  }

  /**
   * Largeur de la forêt
   * @returns La largeur de la forêt
   */
  getWidth() {
    return this.trees[0].length;
  }

  /**
   * Nettoyage du nombre d'arbres bloquants
   */
  clearBlockedTrees() {
    this.nbNoBlockedTreesLeft = 0;
    this.nbNoBlockedTreesRight = 0;
    this.nbNoBlockedTreesTop = 0;
    this.nbNoBlockedTreesBottom = 0;
  }

  /**
   * Création de la forêt sous forme de tableau
   * @param {Array} forest La forêt
   */
  createArrayOfTrees(forest) {
    forest.forEach(treesLine => {
      const treesArray = treesLine.split('').map(tree => Number(tree));
      this.trees.push(treesArray);
    });
  }

  /**
   * Trouver si un arbre bloque la vue d'un arbre dans une direction 
   * Et compter le nombre d'arbre visibles à partir d'un arbre 
   * @param {Number} i Index i
   * @param {Number} j index j
   * @param {String} direction Direction vers laquelle regarder 
   * @returns un booléen indiquant si la vue est obstruée
   */
  findBlockTree(i, j, direction) {
    if (i < 0 || j < 0
      || i === this.getHeight()
      || j === this.getWidth()) {

      return false;
    }

    switch (direction) {
      // Vers le haut
      case 'T':
        this.nbNoBlockedTreesTop++;
        break;

      // Vers le bas
      case 'B':
        this.nbNoBlockedTreesBottom++;
        break;

      // Vers la gauche
      case 'L':
        this.nbNoBlockedTreesLeft++;
        break;

      // Vers la droite
      case 'R':
        this.nbNoBlockedTreesRight++;
        break;

      default:
        break;
    }

    if (this.currentTree <= this.trees[i][j]) {
      return true;
    }

    switch (direction) {
      // Vers le haut
      case 'T':
        return this.findBlockTree(i - 1, j, direction);

      // Vers le bas
      case 'B':
        return this.findBlockTree(i + 1, j, direction);

      // Vers la gauche
      case 'L':
        return this.findBlockTree(i, j - 1, direction);

      // Vers la droite
      case 'R':
        return this.findBlockTree(i, j + 1, direction);

      default:
        return false;
    }
  }

  /**
   * Exploration de la forêt
   */
  explore() {
    let nbTrees = 0;
    let maxScenicScore = 0;

    for (let i = 1; i < this.getHeight() - 1; i++) {
      for (let j = 1; j < this.getWidth() - 1; j++) {
        this.clearBlockedTrees();
        this.currentTree = this.trees[i][j];

        const isTopBlocked = this.findBlockTree(i - 1, j, 'T');
        const isBottomBlocked = this.findBlockTree(i + 1, j, 'B')
        const isLeftBlocked = this.findBlockTree(i, j - 1, 'L')
        const isRightBlocked = this.findBlockTree(i, j + 1, 'R');

        // Si au moins un arbre ne bloque pas la vue de l'arbre contrôlé, alors l'arbre est visible de l'extérieur
        if (!(isTopBlocked && isBottomBlocked && isLeftBlocked && isRightBlocked)) {
          nbTrees += 1;
        }

        const scenicScore = this.nbNoBlockedTreesLeft * this.nbNoBlockedTreesRight
          * this.nbNoBlockedTreesTop * this.nbNoBlockedTreesBottom;

        if (maxScenicScore < scenicScore) {
          maxScenicScore = scenicScore;
        }

      }
    }

    // Partie 1
    console.log(nbTrees + (this.getHeight() + this.getWidth()) * 2 - 4);

    // Partie 2
    console.log(maxScenicScore);
  }
}

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 1794
 * 2ème partie : 199272
 */