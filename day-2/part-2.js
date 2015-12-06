input.slice(0, -1)
    .split("\n")
    .reduce((prev, string) => {
        let sizes = string.split("x"),
            volume = sizes.reduce((prod, size) => prod * size),
            perimeter = 2 * (size.reduce((sum, size) => sum - (-size)) - Math.max(...sizes));

        return prev + volume + perimeter;
    }, 0);

// Explanation: now we actually need the volume. The trick to get the smallest perimeter is to sum all
// the sizes, then subtract the largest one, finally doubling the result. Easy peasy.
