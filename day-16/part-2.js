var matches = {
    children: (quantity) => quantity === 3,
    cats: (quantity) => quantity > 7,
    samoyeds: (quantity) => quantity === 2,
    pomeranians: (quantity) => quantity < 3,
    akitas: (quantity) => quantity === 0,
    vizslas: (quantity) => quantity === 0,
    goldfish: (quantity) => quantity < 5,
    trees: (quantity) => quantity > 3,
    cars: (quantity) => quantity === 2,
    perfumes: (quantity) => quantity === 1
};

input.slice(0, -1).split("\n").findIndex(line => {
    let things = line.match(/ \w+: \d+/g);

    return things.every(thing => {
        let [ entity, quantity ] = thing.slice(1).split(": ");

        return matches[entity](+quantity);
    });
}) + 1;

// Explanation: little has changes since the first part, just that instead of checking if two quantities are
// equal, we have a matching function for each kinf of item. That will take care of the odd behaviour of the
// retroencabulator.
