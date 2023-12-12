const solve = input => {
  // Partie 1
  console.log(part1(input));

  // Partie 2
  // console.log(part2(input));
}

const getPossibilities = (str, index = 0, current = "", possibilities = []) => {
  if (index === str.length) {
    possibilities.push(current);
    return possibilities;
  }

  if (str[index] === "?") {
    getPossibilities(str, index + 1, `${current}.`, possibilities);
    getPossibilities(str, index + 1, `${current}#`, possibilities);
  } else {
    getPossibilities(str, index + 1, `${current}${str[index]}`, possibilities);
  }

  return possibilities;
};

const part1 = (data) => {
  let sum = 0;

  for (const line of data) {
    const [spring, group] = line.split(" ");
    const possibilities = getPossibilities(spring);
    let regexStr = "^\\.*";

    regexStr += group.split(",").reduce((accStr, num, index) => {
      if (index === 0) {
        return `${accStr}#{${num}}`;
      }

      return `${accStr}\\.+#{${num}}`;
    }, "");

    regexStr += "\\.*$";
    let regex = new RegExp(regexStr);

    for (const possibility of possibilities) {
      if (regex.test(possibility)) {
        sum++;
      }
    }
  }

  return sum;
};


const part2 = (data) => {
  let sum = 0;

  for (const line of data) {
    const [spring, group] = line.split(" ");

    const repeatedSpring = Array(5).fill(spring).join('?');
    const repeatedGroup = Array(5).fill(group).join(',');

    sum += getArrangements(repeatedSpring, repeatedGroup);
  }

  return sum;
};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 7163
 * 2ème partie : 
 */