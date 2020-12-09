const solve = input => {
  let instructions = input.map(line => {
    return line.split(" ");
  });

  console.log(part1(instructions));
  console.log(part2(instructions));
}

const part1 = instructions => {
  let index = 0;
  let accumulator = 0;
  let instProcessing = new Array(); // Liste des index des instructions traitées

  // Tant qu'une instruction n'est pas exécutée deux fois
  while (!instProcessing.includes(index)) {
    let sign = instructions[index][1].charAt(0);
    let number = Number(instructions[index][1].substring(1));

    instProcessing.push(index);

    switch (instructions[index][0]) {
      case "nop":
        index++;
        break;

      case "acc":
        accumulator = (sign === "-") ? accumulator - number : accumulator + number;
        index++;
        break;

      case "jmp":
        index = (sign === "-") ? index - number : index + number;
        break;

      default:
        break;
    }
  }

  return accumulator;
}


const part2 = instructions => {
  let index = 0;
  let instChange = new Array(); // Liste des index des instructions dont le swap a déjà été fait
  let accumulator = 0;

  // Tant que le traitement n'est pas terminé
  while (index < instructions.length) {
    index = 0;
    accumulator = 0;

    let inst = instructions.map(item => item.slice()); // Copie en profonfeur du tableau des instructions
    let instProcessing = new Array(); // Liste des index des instructions traitées
    let swapInst = false; // Permet de savoir si un swap a déjà été fait dans la séquence

    // Tant que le traitement n'est pas terminé et tant qu'une instruction n'est pas exécutée deux fois
    while (index < instructions.length && !instProcessing.includes(index)) {
      let sign = inst[index][1].charAt(0);
      let number = Number(inst[index][1].substring(1));

      instProcessing.push(index);

      switch (inst[index][0]) {
        case "nop":
          // Si le swap a déjà été fait sur cette instruction, alors comportement normal du "nop", sinon comportement du "jmp"
          if (swapInst || instChange.includes(index)) {
            index++;
          }
          else {
            inst[index][0] = "jmp";
            instChange.push(index);
            index = (sign === "-") ? index - number : index + number;
            swapInst = true;
          }

          break;

        case "acc":
          accumulator = (sign === "-") ? accumulator - number : accumulator + number;
          index++;

          break;

        case "jmp":
          // Si le swap a déjà été fait sur cette instruction, alors comportement normal du "jmp", sinon comportement du "nop"
          if (swapInst || instChange.includes(index)) {
            index = (sign === "-") ? index - number : index + number;
          }
          else {
            inst[index][0] = "nop";
            instChange.push(index);
            index++;
            swapInst = true;
          }

          break;

        default:
          break;
      }
    }
  }

  return accumulator;
}

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 1487
 * 2ème partie : 1607
 */
