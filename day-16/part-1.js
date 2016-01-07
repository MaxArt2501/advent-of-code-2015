var RESULT = {
    children: 3,
    cats: 7,
    samoyeds: 2,
    pomeranians: 3,
    akitas: 0,
    vizslas: 0,
    goldfish: 5,
    trees: 3,
    cars: 2,
    perfumes: 1
};

input.slice(0, -1).split("\n").findIndex(line => {
    let things = line.match(/ \w+: \d+/g);

    return things.every(thing => {
        let [ entity, quantity ] = thing.slice(1).split(": ");

        return RESULT[entity] === +quantity;
    });
}) + 1;

// Explanation: we just have to find the first (and, presumably, the last) Aunt Sue that matches the amounts
// given by the machine. There's actually nothing much to explain here...
