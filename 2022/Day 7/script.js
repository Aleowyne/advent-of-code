const solve = input => {
  let system = new System(input);

  // Partie 1
  console.log(part1(system));

  // Partie 2
  console.log(part2(system));
}


class Directory {
  constructor(name, parent = null) {
    this.name = name;
    this.size = 0;
    this.parent = parent;
    this.children = [];
  }

  addChild(childDirectory) {
    this.children.push(childDirectory);
  }

  addSize(size) {
    this.size += size;

    if (!this.parent) {
      return;
    }
    this.parent.addSize(size);
  }
}

class System {
  constructor(instructions) {
    this.directories = [];
    this.queueDirectories = [];
    this.createArbo(instructions);
  }

  // Création de l'arborescence des dossiers/fichiers
  createArbo(instructions) {
    for (const instruction of instructions) {
      // Dans le cas d'une commande "ls" ou dans le cas d'un dossier
      if (this.isCmdList(instruction) || this.isDirectory(instruction)) {
        continue;
      }

      // Dans le cas d'une commande "cd"
      this.processCmdChdir(instruction);

      // Dans le cas d'un fichier
      this.processFile(instruction);
    }
  }

  // Commande "cd"
  processCmdChdir(instruction) {
    const cmd = instruction.match(/\$ cd (.+)/);

    if (cmd) {
      const [, directory] = cmd;

      switch (directory) {
        // Retour au dossier parent
        case '..':
          this.upDirectory();
          break;

        // Nouveau dossier
        default:
          this.addDirectory(directory);
          break;
      }
    }
  }

  // Ligne indiquant qu'il y a un fichier
  processFile(instruction) {
    const file = instruction.match(/(\d+) .+/);

    if (file) {
      const [, sizeFile] = file;
      this.addSizeCurrentDir(Number(sizeFile));
    }
  }

  // Commande "ls"
  isCmdList(instruction) {
    const cmd = instruction.match(/\$ ls/);
    return cmd ? true : false;
  }

  // Ligne indiquant qu'il y a un dossier
  isDirectory(instruction) {
    const cmd = instruction.match(/dir \w+/);
    return cmd ? true : false;
  }


  // Récupération du dossier courant
  getCurrentDirectory() {
    return this.queueDirectories.at(-1) || '';
  }

  // Ajout d'un dossier
  addDirectory(name) {
    let currentDirectory = this.getCurrentDirectory();

    // Création du nouveau dossier avec comme parent le dossier courant
    const directory = new Directory(name, currentDirectory);
    this.directories.push(directory);

    if (currentDirectory) {
      // Ajout du nouveau dossier comme un enfant du dossier courant
      currentDirectory.addChild(directory);
    }

    this.queueDirectories.push(directory);
  }

  // Revenir au dossier parent
  upDirectory() {
    this.queueDirectories.pop();
  }

  // Incrémentation de la taille du dossier
  addSizeCurrentDir(size) {
    let currentDirectory = this.getCurrentDirectory();

    // Ajout de la taille dans les dossiers parents
    currentDirectory.addSize(size);
  }
}


/**
* Partie 1
*/
const part1 = (system) => {
  return system.directories.reduce((sum, directory) => {
    if (directory.size > 100000) {
      return sum;
    }

    return sum + directory.size;
  }, 0);
};

/**
 * Partie 2
 */
const part2 = (system) => {
  const rootDirectory = system.directories[0];
  const unusedSize = 70000000 - rootDirectory.size;
  const overSize = 30000000 - unusedSize;
  let sizeToDelete = rootDirectory.size;

  system.directories.forEach((directory) => {
    if (directory.size < sizeToDelete && directory.size >= overSize) {
      sizeToDelete = directory.size;
    }
  });

  return sizeToDelete;
};

module.exports = { solve };

/**
 * Résultats :
 * 1ère partie : 1908462
 * 2ème partie : 3979145
 */