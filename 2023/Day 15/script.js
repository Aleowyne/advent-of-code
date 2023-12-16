const solve = input => {
  // Partie 1
  console.log(part1(input));

  // Partie 2
  console.log(part2(input));
}

const calculateCurrentValue = (str) => {
  let currentValue = 0;

  for (let i = 0; i < str.length; i++) {
    currentValue += str.charCodeAt(i);
    currentValue *= 17;
    currentValue %= 256;
  }

  return currentValue;
}

const part1 = (data) => {
  return data[0].split(",").reduce((sum, str) => {
    return sum + calculateCurrentValue(str);
  }, 0);
};

const part2 = (data) => {
  const boxes = new Array(256).fill(0).map(() => new Array());

  for (const str of data[0].split(",")) {
    if (str.includes("=")) {
      const [label, focalLength] = str.split("=");
      const boxIndex = calculateCurrentValue(label);
      const updateIndex = boxes[boxIndex].findIndex(item => item.label === label);

      if (updateIndex === -1) {
        boxes[boxIndex].push({ label, focalLength });
      }
      else {
        boxes[boxIndex][updateIndex].focalLength = focalLength;
      }
    }
    else if (str.includes("-")) {
      const label = str.split("-")[0];
      const boxIndex = calculateCurrentValue(label);
      const deleteIndex = boxes[boxIndex].findIndex(item => item.label === label);

      if (deleteIndex !== -1) {
        boxes[boxIndex].splice(deleteIndex, 1);
      }
    }
  }

  let sum = boxes.reduce((total, box, boxIndex) => {
    return total + box.reduce((sum, item, slotIndex) => {
      return sum + (boxIndex + 1) * (slotIndex + 1) * Number(item.focalLength);
    }, 0);
  }, 0);

  return sum;
};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 516657
 * 2ème partie : 210906
 */