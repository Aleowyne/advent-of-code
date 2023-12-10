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
  // console.log(part2(input));
}

const part1 = (data) => {
  const map = [];
  let xStart, yStart, nbRow, nbCol, max = 0;

  for (let x = 0; x < data.length; x++) {
    const line = data[x].split("");
    map.push(line);

    const y = line.findIndex(caracter => caracter === "S");

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



const part2 = (data) => {

};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 6842
 * 2ème partie : 
 */