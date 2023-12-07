const TYPES = [
  /(.)\1{4}/, // Five of a kind
  /(.)\1{3}/, // Four of a kind
  /((.)\2{2}(.)\3|(.)\4(.)\5{2})/, // Full house
  /(.)\1{2}/, // Three of a kind
  /(.)\1.*(.)\2/, // Two pair
  /(.)\1/, // One pair
];

const CARD = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
const CARD_WITH_JOKER = ["A", "K", "Q", "T", "9", "8", "7", "6", "5", "4", "3", "2", "J"];

const solve = input => {
  // Partie 1
  console.log(part1(input));

  // Partie 2
  console.log(part2(input));
}

const part1 = (data) => {
  const hands = [];

  for (const line of data) {
    const [cards, bidAmount] = line.split(" ");
    const sortedCards = cards.split("").sort().join("");
    let strength = 0;

    while (strength < TYPES.length && !TYPES[strength].test(sortedCards)) {
      strength++;
    }

    strength = strength === TYPES.length ? TYPES.length : strength;

    hands.push({ strength, cards, bidAmount: +bidAmount });
  }

  hands.sort((a, b) => {
    if (a.strength !== b.strength) {
      return b.strength - a.strength;
    }

    for (let i = 0; i < 5; i++) {
      if (a.cards[i] !== b.cards[i]) {
        return CARD.indexOf(b.cards[i]) - CARD.indexOf(a.cards[i]);
      }
    }

    return 0;
  });

  return hands.reduce((acc, hand, index) => acc + (index + 1) * hand.bidAmount, 0);
};


const part2 = (data) => {
  const hands = [];

  for (const line of data) {
    const [cards, bidAmount] = line.split(" ");
    let uniqueCards = new Set(["0"]);
    let bestStrength = TYPES.length;

    // Recherche des lettres pouvant remplacer le joker
    if (cards === "JJJJJ") {
      uniqueCards = new Set(["A"]);
    }
    else if (cards.includes("J")) {
      uniqueCards = new Set(cards.replaceAll("J", "").split(""));
    }

    for (let uniqueCard of uniqueCards) {
      const sortedCards = cards.replaceAll("J", uniqueCard).split("").sort().join("");

      for (let strength = 0; strength < TYPES.length; strength++) {
        let type = TYPES[strength];

        if (type.test(sortedCards) && strength < bestStrength) {
          bestStrength = strength;
          break;
        }
      }
    }

    hands.push({ strength: bestStrength, cards, bidAmount: +bidAmount });
  }

  hands.sort((a, b) => {
    if (a.strength !== b.strength) {
      return b.strength - a.strength;
    }

    for (let i = 0; i < 5; i++) {
      if (a.cards[i] !== b.cards[i]) {
        return CARD_WITH_JOKER.indexOf(b.cards[i]) - CARD_WITH_JOKER.indexOf(a.cards[i]);
      }
    }

    return 0;
  });

  return hands.reduce((acc, hand, index) => acc + (index + 1) * hand.bidAmount, 0);
};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 251106089
 * 2ème partie : 249620106
 */