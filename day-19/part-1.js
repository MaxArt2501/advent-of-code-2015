// Let's split the two parts of the input.
var [ replInput, molecule ] = input.slice(0, -1).split("\n\n");

// We'll store the replacements in a hashmap, where the elements are the keys and the values are arrays of
// all the molecules that element can generate
var replacements = replInput.split("\n").reduce((object, line) => {
    let [ start, end ] = line.split(" => ");

    object[start] = [ ...(object[start] || []), end ];

    return object;
}, {});

// Using a set to avoid duplicated molecules
var molecules = new Set();

// We iterate through all the elements. We won't see any spare electrons, though.
for (var element in replacements) {
    // If we split the molecule with the element, we'll know where we can place each of the possible
    // replacements.
    var pieces = molecule.split(element);
    replacements[element].forEach(replacement => {
        pieces.slice(0, -1).forEach((piece, index) => {
            let newMolecule = pieces.slice(0, index + 1).join(element) + replacement + pieces.slice(index + 1).join(element);

            molecules.add(newMolecule);
        });
    });
}

molecules.size;
