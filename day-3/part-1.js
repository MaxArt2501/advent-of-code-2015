input.split("")
    .reduce((data, ch) => {
        if (ch === "^") data.y--;
        if (ch === ">") data.x++;
        if (ch === "v") data.y++;
        if (ch === "<") data.x--;
        data.visited.add(data.x + "," + data.y);

        return data;
    }, {
        x: 0,
        y: 0,
        visited: new Set
    }).visited.size;

// Explanation: I admit I performed a little stunt here, keeping everything in just one instruction, but
// it just happens that I begin writing my solutions as one-liners...
// The trick here is to pass a `data` object to `reduce` and return it with every iteration with updated
// values.
// Basically we're keeping track of Santa's location using the `x` and `y`, and adding them to a `Set`
// object which will nicely keep our elements unique (yes, using the keys of a plain object would have
// worked too).
