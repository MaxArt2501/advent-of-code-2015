// This puzzle is quite reminiscent of the ninth day: collect the data and find the best order.
// The main difference is that we have a round table, so the first and the last element of the list are
// connected too. This means that, if `n` is the number of elements, there are many equivalent dispositions
// among the usual n! permutations. For example, the list `[ "A", "B", "C", "D" ]` is equivalent to
// `[ "B", "C", "D", "A" ]` and also all the other permutations that are obtained from the first one by
// *rotating* its elements. This greatly reduces (by `n`) the number of permutations that we need to inspect.
// Moreover, also `[ "D", "C", "B", "A" ]` and all its rotations are equivalent to `[ "A", "B", "C", "D" ]`,
// since their elements are just listed backwards, and thus producing the same result.
// Now, taking care of the rotational equivalence is pretty easy: all we have to do is to consider the first
// element as "fixed" and freely permutate the other `n - 1` ones, so we'll have to check (n - 1)!
// permutations. But for the symmetrical equivalence things are harder, and for the sake of simplicity we'll
// left them out. We'll do the work twice... oh well.

// Collecting the names, which are the only words with a capital first letter in the input. This technique
// to reduce the array to a list of unique elements has been explained on day 9,
var names = [ ...new Set(input.match(/([A-Z][a-z]+)/g)) ];

// // We're preparing a table of the happiness variation for each couple of near persons. We won't get a
// symmetric table this time, though, as we're not talking about distances anymore.
var happiness = names.reduce((obj, name) => Object.assign(obj, { [name]: {} }), {});

// Now we fill the table. Regular expressions and array desctructuring in action again. Yes, it's pretty
// clear that regular expressions are an effective (and efficient, too) way to extract data from structured
// strings.
input.slice(0, -1).split("\n").forEach(line => {
    let [ , name, sign, difference, next ]
            = line.match(/^(\w+) would (gain|lose) (\d+) happiness units by sitting next to (\w+)\.$/);

    // Adjusting the sign of the happiness variation
    happiness[name][next] = difference * (sign === "gain" ? 1 : -1);
});

// This function returns the total happiness variation for a given list of persons.
var computeHappiness = (list) => list.reduce(
    (sum, name, i) => sum
            + happiness[name][list[(i || list.length) - 1]]
            + happiness[name][list[(i + 1) % list.length]],
0);

// Permutating the elements with a recursive function...
var getMaxHappiness = (list, remaining) => {
    if (remaining.length === 1)
        return computeHappiness([ ...list, remaining[0] ]);

    return Math.max(...remaining.map(
        (name, i) => getMaxHappiness([ ...list, name ], [ ...remaining.slice(0, i), ...remaining.slice(i + 1) ])
    ));
}

// As said before, we're staing with a "fixed" element in the first positions.
getMaxHappiness([ names[0] ], names.slice(1));
