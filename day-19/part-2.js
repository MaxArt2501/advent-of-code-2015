// THIS SOLUTIONS IS TEMPORARY AS IT TAKES WAY TOO LONG ON COMMON JAVASCRIPT ENVIRONMENTS
// I'll come up with a better solution later.
var [ replInput, target ] = input.slice(0, -1).split("\n\n");

var molecule = "e";

// We'll store the replacements in a hashmap, where the molecules are the *keys* and the creating elements
// are the *values*. In fact, the resulting molecules are all distinct.
var folds = replInput.split("\n").reduce((object, line) => {
    let [ atom, replacement ] = line.split(" => ");

    object[replacement] = atom;

    return object;
}, {});

var sequences = Object.keys(folds).sort((a, b) => b.length - a.length);

var crosses = (molecule, sequence, index, other) => {
    if (sequence === other)
        return molecule.indexOf(other, index + 1 - other.length) < index
                || molecule.lastIndexOf(other, index + (other.length << 1) - 1) > index;

    return molecule
            .substr(index + 1 - other.length, sequence.length + (other.length - 1 << 1))
            .indexOf(other) > -1;
};

var foldWith = (molecule, sequence) => {
    let lastIndex = 0, index, count = 0;

    while ((index = molecule.indexOf(sequence, lastIndex)) > -1) {
        if (!sequences.some(crosses.bind(null, molecule, sequence, index))) {
            count++;
            molecule = molecule.slice(0, index) + "{" + folds[sequence] + "}" + molecule.slice(index + sequence.length);
        }
        lastIndex = index + 1;
    }

    return [ molecule, count ];
};

// Reduce a molecule applying back "safe" replacements (i.e., subsequences that couldn't have been obtained
// in other ways than that single replacement).
var optimizeMolecule = (molecule) => {
    let count = 0, oldCount;

    do {
        oldCount = count;

        sequences.forEach(sequence => {
            let result = foldWith(molecule, sequence);

            molecule = result[0];
            count += result[1];
        });

        // console.log(molecule.match(/[A-Z][a-z]?/g).length, count, molecule);
        molecule = molecule.replace(/[\{\}]/g, "");
    } while (oldCount < count);

    return [ molecule, count ];
};

var result = optimizeMolecule(target);
// console.log(result);

target = result[0];
count = result[1];

var minIterations = target.match(/[A-Z][a-z]?/g).length;

var foldDown = (molecule, count) => {
    if (molecule === "e")
        minIterations = count;

    if (count >= minIterations) return;
    // if (count >= 50) return;

    // let attempts = 0;
    for (let sequence of sequences) {
        let lastIndex = 0, index;

        while ((index = molecule.indexOf(sequence, lastIndex)) > -1) {
            let newMolecule = molecule.slice(0, index) + folds[sequence] + molecule.slice(index + sequence.length);

            foldDown(newMolecule, count + 1);

            lastIndex = index + 1;
            // attempts++;
        }
    }

    // if (!attempts) {
    //     console.log("Dead end: " + molecule);
    // }
};

