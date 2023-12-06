const solve = input => {
  // Partie 1
  console.log(part1(input));

  // Partie 2
  console.log(part2(input));
}

const part1 = (data) => {
  let courseTimes = data[0].split(/\s+/g).map(Number);
  courseTimes.shift();

  let courseDistances = data[1].split(/\s+/g).map(Number);
  courseDistances.shift();

  const ways = new Array(courseTimes.length).fill(0);

  for (let i = 0; i < courseTimes.length; i++) {
    for (let time = 1; time < courseTimes[i]; time++) {
      if (time * (courseTimes[i] - time) > courseDistances[i]) {
        ways[i]++;
      }
    }
  }

  return ways.reduce((acc, nbWay) => acc * nbWay, 1);
};

const part2 = (data) => {
  let courseTime = +data[0].replace(/\w+:/, "").replace(/\s+/g, "");
  let courseDistance = +data[1].replace(/\w+:/, "").replace(/\s+/g, "");
  let nbWays = 0;

  if (courseTime % 2 === 0 && Math.pow(Math.ceil(courseTime / 2), 2) > courseDistance) {
    nbWays++;
  }

  for (let time = 1; time < courseTime / 2; time++) {
    if (time * (courseTime - time) > courseDistance) {
      nbWays += 2;
    }
  }

  return nbWays;
};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 449550
 * 2ème partie : 28360140
 */

