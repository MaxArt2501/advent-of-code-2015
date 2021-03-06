var names = [ ...new Set(input.match(/([A-Z][a-z]+)/g)) ];

var happinessMap = names.reduce((obj, name) => Object.assign(obj, { [name]: {} }), {});

input.slice(0, -1).split("\n").forEach(line => {
    let [ , name, sign, difference, next ] = line.match(/^(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)\.$/);

    happinessMap[name][next] = difference * (sign === "gain" ? 1 : -1);
});

// For the second part we have to change things slightly: we have to actually keep track of the optimal
// disposition, then for each pair of folks sitting near each other compute the change of happiness (CoH)
// that the pair produces. That's because when we fill ourselves in the table between two persons, we'll
// reduce the CoH generated by the pair to zero.
// So, in order to get the solution for the second part, we'll have to find the *lowest* CoH between two
// persons sitting next each other, and subtract it from the previous result. Easy-peasy!

// So this function will calculate the CoH between a person and the one of their right (or the left, whatever
// you imagine it) for each person in the list.
var computeProximityHappiness = (list) => list.map(
    (name, i) => happinessMap[name][list[(i || list.length) - 1]]
            + happinessMap[list[(i || list.length) - 1]][name]
);

// We're keeping track the maximum CoH and the optimal arrangement in scoped variables. It's just easier
// this way.
var maxHappiness = -Infinity,
    optimalDisposition;

var computeDispositions = (list, remaining) => {
    if (remaining.length === 1) {
        let disposition = [ ...list, remaining[0] ],
            // We're computing the total CoH here
            happiness = computeProximityHappiness(disposition).reduce((sum, amount) => sum + amount);

        if (happiness > maxHappiness) {
            maxHappiness = happiness;
            optimalDisposition = disposition;
        }
    } else remaining.forEach(
        (name, i) => computeDispositions([ ...list, name ], [ ...remaining.slice(0, i), ...remaining.slice(i + 1) ])
    );
}

computeDispositions([ names[0] ], names.slice(1));

// We're subtracing the lowest CoH in the optimal arrangement from the total CoH.
maxHappiness - Math.min(...computeProximityHappiness(optimalDisposition));
