const solve = input => {
  // Partie 1
  console.log(part1(input));

  // Partie 2
  console.log(part2(input));
}

class Mapping {
  constructor(source, dest, length) {
    this.source = source;
    this.dest = dest;
    this.length = length;
  }
}

class Seed {
  constructor(start, length) {
    this.start = start;
    this.end = start + length - 1;
  }
}

const part1 = (data) => {
  let seeds = [];
  let indexMap = -1;
  const maps = new Array(7).fill(0).map(() => new Array());

  for (let indexLine = 0; indexLine < data.length; indexLine++) {
    const line = data[indexLine];

    // Seeds
    if (indexLine === 0) {
      seeds = line.split(": ")[1].split(" ").map(Number);
    }
    // Ligne vide
    else if (line === "") {
      indexMap++;
    }
    // Mapping
    else {
      let [destStart, sourceStart, rangeLength] = line.split(" ").map(Number);

      if (!isNaN(destStart)) {
        maps[indexMap].push(new Mapping(sourceStart, destStart, rangeLength));
      }
    }
  }

  let min = Infinity;

  for (const seed of seeds) {
    let search = seed;

    for (const map of maps) {
      const mapping = map.find(item => search >= item.source && search < item.source + item.length);

      if (mapping) {
        search = mapping.dest + (search - mapping.source);
      }
    }

    min = Math.min(min, search);
  }

  return min;
};

const part2 = (data) => {
  let seeds = [];
  let indexMap = -1;
  const maps = new Array(7).fill(0).map(() => new Array());

  for (let indexLine = 0; indexLine < data.length; indexLine++) {
    const line = data[indexLine];

    // Seeds
    if (indexLine === 0) {
      const allSeeds = line.split(": ")[1].split(" ").map(Number);

      for (let i = 0; i < allSeeds.length; i += 2) {
        seeds.push(new Seed(allSeeds[i], allSeeds[i + 1]));
      }
    }
    // Ligne vide
    else if (line === "") {
      indexMap++;
    }
    // Mapping
    else {
      let [destStart, sourceStart, rangeLength] = line.split(" ").map(Number);

      if (!isNaN(destStart)) {
        maps[indexMap].push(new Mapping(sourceStart, destStart, rangeLength));
      }
    }
  }

  maps.reverse();

  const maxLocation = maps[maps.length - 1].reduce((max, map) => {
    return Math.max(max, map.dest + map.length);
  }, 0);

  let min = -1;

  for (let location = 0; location < maxLocation && min === -1; location++) {
    let search = location;

    for (const map of maps) {
      const mapping = map.find(item => search >= item.dest && search < item.dest + item.length);

      if (mapping) {
        search = mapping.source + (search - mapping.dest);
      }
    }

    for (const seed of seeds) {
      if (search >= seed.start && search <= seed.end) {
        min = location;
        break;
      }
    }
  }

  return min;
};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 218513636
 * 2ème partie : 81956384
 */