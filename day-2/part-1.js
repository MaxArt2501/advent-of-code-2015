input.slice(0, -1)
    .split("\n")
    .reduce((prev, string) => {
        let sizes = string.split("x"),
            volume = sizes.reduce((prod, size) => prod * size);

        return prev
            + 2 * sizes.reduce((sum, size) => sum + volume/size, 0)
            + volume/Math.max(...sizes);
    }, 0);

// Explanation: you can squeeze everything in one line, but it'd be quite hard to understand.
// First of all, we have to tranform the input in something more manageable, so we nibble the last line feed
// and split the lines. Now we have an array of strings like "6x10x13".
// Then we use `reduce` to get a total sum out of the paper needed. We use a couple of helper variables, namely
// `sizes` (which is merely the array of the sizes of the box), and `volume` (of the box). In fact, we can get
// the surface area of a side of the box dividing the volume by the remaining size.
// This explains the last addition too, which is the volume divided by the largest size, resulting in the
// smallest side's area.
