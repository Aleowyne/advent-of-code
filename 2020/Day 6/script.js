const solve = input => {
  console.log(nbResponse1(input));
  console.log(nbResponse2(input));
}

// Partie 1
const nbResponse1 = input => {
  let response = new Array();

  return input.reduce((sum, line) => {
    // Lecture du groupe terminée
    if (line === "") {
      let setResponse = new Set(response);
      response = [];
      return sum + setResponse.size;
    }

    // Récupération des réponses d'une personne du groupe et les ajouter aux réponses du groupe
    response = response.concat(line.split("").map(item => {
      return item;
    }));

    return sum;
  }, 0);
}

// Partie 2
const nbResponse2 = input => {
  let response = new Array();
  let mapResponse = new Map();
  let nbPerson = 0;

  return input.reduce((sum, line) => {
    // Lecture du groupe terminée
    if (line === "") {
      // Création d'une Map pour déterminer le nombre de réponses à une question
      response.reduce((map, item) => {
        if (!map.get(item)) {
          map.set(item, 1);
        }
        else {
          map.set(item, map.get(item) + 1);
        }

        // Si le nombre de réponses à une question est égal au nombre de personnes dans le groupe, incrémentation du nombre final
        if (map.get(item) === nbPerson) {
          sum = sum + 1;
        }

        return map;
      }, new Map());

      response = [];
      mapResponse.clear();
      nbPerson = 0;
      return sum;
    }

    nbPerso++;

    // Récupération des réponses d'une personne du groupe et les ajouter aux réponses du groupe
    response = response.concat(line.split("").map(item => {
      return item;
    }));

    return sum;
  }, 0);
}

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 6714
 * 2ème partie : 3435
 */