const validFields = new Array('byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid');

const solve = input => {
  console.log(nbValidPassport1(input));
  console.log(nbValidPassport2(input));
}

// Partie 1
const nbValidPassport1 = input => {
  let validPassportFields = new Array();

  return input.reduce((sum, item) => {
    // Lecture du passeport terminé
    if (item === "") {
      let setFields = new Set(validPassportFields);
      setFields.delete("");
      validPassportFields = [];
      return setFields.size === validFields.length ? sum + 1 : sum;
    }

    // Récupération des champs valides du passeport
    validPassportFields = validPassportFields.concat(item.split(" ").map(item => {
      return validFields.includes(item.split(":")[0]) ? item.split(":")[0] : "";
    }));

    return sum;
  }, 0);
}

// Partie 2
const nbValidPassport2 = input => {
  let validPassportFields = new Array();

  return input.reduce((sum, item) => {
    // Lecture du passeport terminé
    if (item === "") {
      let setFields = new Set(validPassportFields);
      setFields.delete("");
      validPassportFields = [];
      return setFields.size === validFields.length ? sum + 1 : sum;
    }

    // Récupération des champs valides du passeport
    validPassportFields = validPassportFields.concat(item.split(" ").map(item => {
      const [field, value] = item.split(":");

      switch (field) {
        // Nombre entre 1920 et 2002
        case "byr":
          return value >= 1920 && value <= 2002 ? field : "";

        // Nombre entre 2010 et 2020
        case "iyr":
          return value >= 2010 && value <= 2020 ? field : "";

        // Nombre entre 2020 et 2030
        case "eyr":
          return value >= 2020 && value <= 2030 ? field : "";

        // 150cm à 193cm ou 59in à 76in
        case "hgt":
          [left, right] = value.split("cm");
          if (right !== undefined) {
            return left >= 150 && left <= 193 ? field : "";
          }

          [left, right] = value.split("in");
          if (right !== undefined) {
            return left >= 59 && left <= 76 ? field : "";
          }

          return "";

        // Commence par #, puis 6 chiffres (0-9) ou 6 lettres (a-z)
        case "hcl":
          const regexHair = new RegExp("^#[a-z0-9]{6}$");
          return regexHair.test(value) ? field : "";

        // Contient une des valeurs suivantes : amb, blu, brn, gry, grn, hzl, oth
        case "ecl":
          const validValues = new Array('amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth');
          return validValues.includes(value) ? field : "";

        // 9 chiffres
        case "pid":
          const regexPID = new RegExp("^[0-9]{9}$");
          return regexPID.test(value) ? field : "";

        default:
          return "";
      }
    }));

    return sum;
  }, 0);
}

module.exports = { solve };


/**
 * Résultats :
 * 1ère partie : 196
 * 2ème partie : 114
 */