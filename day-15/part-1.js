var TEASPOONS = 100;

// Collecting the properties of each ingredients here.
var ings = input.slice(0, -1).split("\n").map(
    line => line.match(/(-?\d+).*?(-?\d+).*?(-?\d+).*?(-?\d+).*?(-?\d+)/).slice(1).map(Number)
);
// We're actually going to use a table of *properties* given by each ingredients. We just have to transpose
// the above matrix. We're cutting to 4 properties because we're not taking calories into considerations for
// now.
var props = ings[0].slice(0, 4).map((n, index) => ings.map(data => data[index]));

// Classic vector dot product. It multiplies the entries of two arrays in order, and sums the reuslts.
var dotProduct = (array1, array2) => array1.reduce((sum, entry, index) => sum + entry * array2[index], 0);

// Returns the score of the given amounts of ingredients.
var getScore = (...amounts) => props.reduce((prod, data) => prod * Math.max(0, dotProduct(amounts, data)), 1);

var maxScore = 0;

// We have 4 ingredients and a constraint (the amount of teaspoons), so sugar will be computed using that.
// A research like this could be a bit lengthy, but manageable in no more than a couple of seconds.
for (var sprinkles = 0; sprinkles <= TEASPOONS; sprinkles++) {
    for (var peanutButter = TEASPOONS - sprinkles; peanutButter >= 0; peanutButter--) {
        for (var frosting = TEASPOONS - sprinkles - peanutButter; frosting >= 0; frosting--) {
            var sugar = TEASPOONS - sprinkles - peanutButter - frosting,
                score = getScore(sprinkles, peanutButter, frosting, sugar);

            if (score > maxScore)
                maxScore = score;
        }
    }
}

maxScore;
