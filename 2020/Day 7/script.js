let setBags = new Set();
let sumBags = 0;

const solve = input => {
  console.log(part1(input));
  console.log(part2(input));
}

const part1 = input => {
  let bags = new Array();

  input.forEach(line => {
    // Récupération des sacs (sac parent "contain" sacs enfants)
    let listBags = Array.from(line.matchAll(/[, ]*[0-9]* ?([a-z ]*) bag[s]?/g));

    // Récupération du sac parent
    let parentBag = listBags[0][1];

    // Suppression du sac parent
    listBags.shift();

    // Assignation du sac parent au sac enfant
    listBags.forEach(bag => {
      if (bags[bag[1]] === undefined) {
        bags[bag[1]] = new Array(parentBag);
      }
      else {
        bags[bag[1]].push(parentBag);
      }
    });
  });

  getBagsInBag(Object.entries(bags), ["shiny gold"]);

  return setBags.size - 1; // Ne pas compter le premier sac, car il correspond à celui que nous cherchons
}

/**
 * Récupération de la liste des sacs où peut être stocké un sac donné
 * @param {Array} bags Liste des sacs ([sac enfant, [sac parent 1, sac parent 2 ...]]) 
 * @param {Array} searchBags Liste des sacs à rechercher
 */
const getBagsInBag = (bags, searchBags) => {
  searchBags.forEach(searchBag => {
    setBags.add(searchBag);

    // Recherche des sacs parents d'un sac donné
    let parentBags = bags.find(bag => bag[0] === searchBag);

    // Tant que le sac donné à des parents
    if (parentBags !== undefined) {
      getBagsInBag(bags, parentBags[1]);
    }
  });
}


const part2 = input => {
  let bags = new Array();

  input.forEach(line => {
    let listBags = Array.from(line.matchAll(/[, ]*([0-9]*) ?([a-z ]*) bag[s]?/g));

    // Récupération du sac parent
    let parentBag = listBags[0][2];

    // Suppression du sac parent
    listBags.shift();

    // Assignation des sacs enfants au sac parent
    listBags.forEach(bag => {
      if (bags[parentBag] === undefined) {
        bags[parentBag] = new Array(`${bag[1]}-${bag[2]}`);
      }
      else {
        bags[parentBag].push(`${bag[1]}-${bag[2]}`);
      }
    });
  });

  getNbBags(Object.entries(bags), ["1-shiny gold"]);

  return sumBags;
}


/**
 * Calcul du nombre de sacs dans un sac donné
 * @param {Array} bags Liste des sacs ([sac parent, [sac enfant 1, sac enfant 2 ...]]) 
 * @param {Array} searchBags Liste des sacs à rechercher
 */
const getNbBags = (bags, searchBags) => {
  searchBags.forEach(searchBag => {
    // Récupération du nombre de sacs parent et du nom du sac parent
    [nbParentBag, nameParentBag] = searchBag.split("-");

    // Recherche des sacs enfants d'un sac donné
    let childBags = bags.find(bag => bag[0] === nameParentBag);

    // Tant que le sac donné à des enfants
    if (childBags !== undefined) {
      let nbChildBags = 0;

      // Mise à jour du nombre de sacs enfants
      childBags = childBags[1].map(bag => {
        let [nb, nameBag] = bag.split("-");
        let nbBag = Number(nb) * Number(nbParentBag);

        nbChildBags += nbBag;

        return `${nbBag}-${nameBag}`;
      });

      sumBags += nbChildBags;

      // Traitement des sacs enfants
      getNbBags(bags, childBags);
    }
  });
}

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 197
 * 2ème partie : 85324
 */
