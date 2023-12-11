const DIRECTIONS = [
  {
    origin: "S",
    targets: [
      [0, 1, '-'], [0, 1, 'J'], [0, 1, '7'],
      [1, 0, '|'], [1, 0, 'L'], [1, 0, 'J'],
      [0, -1, '-'], [0, -1, 'L'], [0, -1, 'F'],
      [-1, 0, '|'], [-1, 0, '7'], [-1, 0, 'F']
    ]
  },
  {
    origin: "|",
    targets: [
      [1, 0, '|'], [1, 0, 'L'], [1, 0, 'J'],
      [-1, 0, '|'], [-1, 0, '7'], [-1, 0, 'F']
    ]
  },
  {
    origin: "-",
    targets: [
      [0, 1, '-'], [0, 1, 'J'], [0, 1, '7'],
      [0, -1, '-'], [0, -1, 'L'], [0, -1, 'F'],
    ]
  },
  {
    origin: "L",
    targets: [
      [0, 1, '-'], [0, 1, 'J'], [0, 1, '7'],
      [-1, 0, '|'], [-1, 0, '7'], [-1, 0, 'F']
    ]
  },
  {
    origin: "J",
    targets: [
      [0, -1, '-'], [0, -1, 'L'], [0, -1, 'F'],
      [-1, 0, '|'], [-1, 0, '7'], [-1, 0, 'F']
    ]
  },
  {
    origin: "7",
    targets: [
      [1, 0, '|'], [1, 0, 'L'], [1, 0, 'J'],
      [0, -1, '-'], [0, -1, 'L'], [0, -1, 'F']
    ]
  },
  {
    origin: "F",
    targets: [
      [0, 1, '-'], [0, 1, 'J'], [0, 1, '7'],
      [1, 0, '|'], [1, 0, 'L'], [1, 0, 'J']
    ]
  }
];

const solve = input => {
  // Partie 1
  console.log(part1(input));

  // Partie 2
  console.log(part2(input));
}

const part1 = (data) => {
  const map = [];
  let xStart, yStart, nbRow, nbCol, max = 0;

  for (let x = 0; x < data.length; x++) {
    const line = data[x].split("");
    map.push(line);

    const y = line.indexOf("S");

    if (y !== -1) {
      xStart = x;
      yStart = y;
      nbRow = data.length;
      nbCol = line.length;
    }
  }

  const neighboors = [{ x: xStart, y: yStart, value: "S" }];
  map[xStart][yStart] = 0;

  for (const neighboor of neighboors) {
    const directions = DIRECTIONS.find((direction) => direction.origin === neighboor.value).targets;

    for (const [dirX, dirY, valueTarget] of directions) {
      const row = neighboor.x + dirX;
      const col = neighboor.y + dirY;

      if (row >= 0 && row < nbRow
        && col >= 0 && col < nbCol
        && valueTarget === map[row][col]) {

        neighboors.push({ x: row, y: col, value: map[row][col] });
        map[row][col] = map[neighboor.x][neighboor.y] + 1;
        max = Math.max(map[row][col], max);
      }
    }
  }

  return max;
};

// Algo "Even-odd rule" : pour trouver si un point est dans un polygone
const isPointInPath = (x, y, poly) => {
  let find = false;
  let j = poly.length - 1;

  for (let i = 0; i < poly.length; i++) {
    if (x === poly[i][0] && y === poly[i][1]) {
      return true;
    }

    if ((poly[i][1] > y) !== (poly[j][1] > y)) {
      const slope = (x - poly[i][0]) * (poly[j][1] - poly[i][1]) - (poly[j][0] - poly[i][0]) * (y - poly[i][1]);

      if (slope === 0) {
        return true;
      }

      if ((slope < 0) !== (poly[j][1] < poly[i][1])) {
        find = !find;
      }
    }
    j = i;
  }

  return find;
}

const part2 = (data) => {
  const map = [];
  let xStart, yStart, nbRow, nbCol, sum = 0;

  for (let x = 0; x < data.length; x++) {
    const line = data[x].split("");
    map.push(line);

    const y = line.indexOf("S");

    if (y !== -1) {
      xStart = x;
      yStart = y;
      nbRow = data.length;
      nbCol = line.length;
    }
  }

  const neighboors = [{ x: xStart, y: yStart, value: "S" }];
  map[xStart][yStart] = 0;
  const poly = [[xStart, yStart]];

  for (const neighboor of neighboors) {
    const directions = DIRECTIONS.find((direction) => direction.origin === neighboor.value).targets;

    for (const [dirX, dirY, valueTarget] of directions) {
      const row = neighboor.x + dirX;
      const col = neighboor.y + dirY;

      if (row >= 0 && row < nbRow
        && col >= 0 && col < nbCol
        && valueTarget === map[row][col]) {

        neighboors.push({ x: row, y: col, value: map[row][col] });
        map[row][col] = map[neighboor.x][neighboor.y] + 1;
        poly.push([row, col]);
        break;
      }
    }
  }

  for (let x = 0; x < nbRow; x++) {
    for (let y = 0; y < nbCol; y++) {
      if ((isNaN(map[x][y]) || map[x][y] === '7') && isPointInPath(x, y, poly)) {
        map[x][y] = "I";
        sum++;
      }
    }
  }

  return sum;
};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 6842
 * 2ème partie : 393
 */