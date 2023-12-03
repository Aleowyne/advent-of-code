const SYMBOL = /[^.]/;
const DIRECTIONS = [
  [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]
];

const solve = input => {
  // Partie 1
  console.log(part1(input));

  // Partie 2
  console.log(part2(input));
}

const part1 = (data) => {
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    let number = "";
    let adjacentCaracters = [];

    for (let j = 0; j < data[i].length; j++) {
      // Cas où il y a un caractère autre qu'un chiffre :
      // S'il y a au moins un symbole autour du nombre, alors le nombre est un "part number"
      if (isNaN(data[i][j])) {
        if (number !== "" && adjacentCaracters.some((item) => isNaN(item) && SYMBOL.test(item))) {
          sum += +number;
        }

        number = "";
        adjacentCaracters = [];
      }

      // Cas d'un chiffre : 
      // Ajout du chiffre au nombre + récupération des caractères autour de ce chiffre
      else {
        number += data[i][j];

        for (const [x, y] of DIRECTIONS) {
          const row = i + x;
          const col = j + y;

          if (row >= 0 && row < data.length
            && col >= 0 && col < data[i].length) {
            adjacentCaracters.push(data[row][col]);
          }
          else {
            adjacentCaracters.push(".");
          }
        }
      }
    }

    // Cas où le nombre est à la fin de la ligne :
    // S'il y a au moins un symbole autour du nombre, alors le nombre est un "part number"
    if (number !== "" && adjacentCaracters.some((item) => isNaN(item) && SYMBOL.test(item))) {
      sum += +number;
    }
  }

  return sum;
};

class Coordinates {
  constructor(x, y, number) {
    this.x = x;
    this.y = y;
    this.nbNumber = 1;
    this.product = number;
  }

  setProduct(number) {
    this.nbNumber++;
    this.product *= number;
  }
}

const calculateProduct = (productsByCoordinates, number, coordinates) => {
  if (number !== "") {
    coordinates.forEach(coordinate => {
      let [x, y] = coordinate.split(';');
      let element = productsByCoordinates.find(element => element.x === x && element.y === y);

      if (element) {
        element.setProduct(+number);
      }
      else {
        productsByCoordinates.push(new Coordinates(x, y, +number));
      }
    });
  }
}

const part2 = (data) => {
  let productsByCoordinates = [];

  for (let i = 0; i < data.length; i++) {
    let number = '';
    let coordinates = new Set();

    for (let j = 0; j < data[i].length; j++) {
      // Cas où il y a un caractère autre qu'un chiffre
      if (isNaN(data[i][j])) {
        calculateProduct(productsByCoordinates, number, coordinates);
        number = "";
        coordinates.clear();
      }

      // Cas d'un chiffre : 
      // Ajout du chiffre au nombre + récupération des coordonnées autour de ce chiffre où il y a un "*"
      else {
        number += data[i][j];

        for (const [x, y] of DIRECTIONS) {
          const row = i + x;
          const col = j + y;

          if (row >= 0 && row < data.length
            && col >= 0 && col < data[i].length
            && data[row][col] === '*') {
            coordinates.add(`${row};${col}`);
          }
        }
      }
    }

    // Cas où le nombre est à la fin de la ligne
    calculateProduct(productsByCoordinates, number, coordinates);
  }

  let sum = 0;

  productsByCoordinates.forEach(coordinate => {
    if (coordinate.nbNumber > 1) {
      sum += coordinate.product;
    }
  })

  return sum;
};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 526404
 * 2ème partie : 84399773
 */