const solve = input => {
  const rope1 = new Rope(2);
  rope1.calculate(input);

  const rope2 = new Rope(10);
  rope2.calculate(input);
}

class Coordinate {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
}

class Rope {
  constructor(nbNodes) {
    this.nbNodes = nbNodes;
    this.positions = Array.from({ length: this.nbNodes }, e => new Coordinate());
    this.visitedPositions = new Set();
  }

  /**
   * Déplacement de la tête
   * @param {String} direction Direction de la tête
   */
  moveHeader(direction) {
    switch (direction) {
      case 'L':
        this.positions[0].x--;
        break;

      case 'R':
        this.positions[0].x++;
        break;

      case 'U':
        this.positions[0].y++;
        break;

      case 'D':
        this.positions[0].y--;
        break;

      default:
        break;
    }
  }

  /**
   * 
   * @param {Array} moves Les déplacements
   */
  calculate(moves) {
    moves.forEach(move => {
      const [direction, steps] = move.split(' ');

      for (let i = 0; i < steps; i++) {
        // Déplacement de la tête
        this.moveHeader(direction);

        for (let node = 1; node < this.nbNodes; node++) {
          // Détermination du vecteur entre le noeud en cours et le noeud précédent
          const deltaX = this.positions[node - 1].x - this.positions[node].x;
          const deltaY = this.positions[node - 1].y - this.positions[node].y;
          const delta = new Coordinate(deltaX, deltaY);

          // Récupération de l'axe ayant la plus grande différence de pas entre le noeud en cours et le noeud précédent
          const axis = Math.abs(delta.x) > Math.abs(delta.y) ? "x" : "y";

          // Rapprochement du noeud en cours vers le noeud précédent, s'il y a plus d'un pas entre les 2 noeuds
          if (Math.abs(delta[axis]) > 1) {
            this.positions[node][axis] += delta[axis] < 0 ? -1 : 1;

            const axis2 = axis === "x" ? "y" : "x";

            // Faire la même chose sur l'autre axe, s'il y a au moins un pas entre les 2 noeuds
            if (Math.abs(delta[axis2]) > 0) {
              this.positions[node][axis2] += delta[axis2] < 0 ? -1 : 1;
            }
          }
        }

        this.visitedPositions.add(`${this.positions[this.nbNodes - 1].x},${this.positions[this.nbNodes - 1].y}`);
      }
    });

    console.log(this.visitedPositions.size);
  }
}

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 6464
 * 2ème partie : 2604
 */