const fs = require('fs');

let year = 2020;
let day = 1;

const args = process.argv.slice(2);

year = Number(args[0]);
day = Number(args[1]);

const path = `./${year}/Day ${day}`;

if (!fs.existsSync(path)) {
    console.log(`${year} - Jour ${day} non trouvé`);
    return;
}

const solver = require(path + `/script`);

const text = fs.readFileSync(path + `/input.txt`)
    .toString()
    .split('\n')
    .map(s => s.replace(/\r$/, ''));

solver.solve(text);