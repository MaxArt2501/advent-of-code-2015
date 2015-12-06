// Nicer version of part 2's solution.
// We're using the external `floor` variable here to make things clearer.

var floor = 0;

input.split("")
    .findIndex(c => {
        floor += c === "(" ? 1 : -1;
        return floor < 0;
    })
    + 1;
