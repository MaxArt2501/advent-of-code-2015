var LITERS = 150;

var allSizes = input.match(/\d+/g).map(Number),
    // Time to keep track of the lowest amount of containers
    minCounter = Infinity,
    totalCount = 0;

// This function isn't a one-liner anymore, and now it looks way clearer.
var ways = (count, remaining, sizes) => {
    if (remaining) {
        // If there's still eggnog, but we already have a better solution, we're outta here
        if (count >= minCounter) return;

        // Else, we cycle through the remaining containers and call the function again.
        sizes.forEach((size, i) => {
            if (remaining >= size)
                ways(count + 1, remaining - size, sizes.slice(i + 1));
        });
    } else if (count < minCounter) {
        minCounter = count;
        totalCounter = 1;
    } else totalCounter++;
};

ways(0, LITERS, allSizes);

totalCounter;
