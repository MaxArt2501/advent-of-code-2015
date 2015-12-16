var TEASPOONS = 100;

var ings = input.slice(0, -1).split("\n").map(
    line => line.match(/(-?\d+).*?(-?\d+).*?(-?\d+).*?(-?\d+).*?(-?\d+)/).slice(1).map(Number)
);

var maxScore = 0;

for (var sprinkles = 0; sprinkles <= TEASPOONS; sprinkles++) {
    for (var peanutButter = TEASPOONS - sprinkles; peanutButter >= 0; peanutButter--) {
        for (var frosting = TEASPOONS - sprinkles - peanutButter; frosting >= 0; frosting--) {
            var sugar = TEASPOONS - sprinkles - peanutButter - frosting,
                score = Math.max(0, sprinkles * ings[0][0] + peanutButter * ings[1][0] + frosting * ings[2][0] + sugar * ings[3][0])
                        * Math.max(0, sprinkles * ings[0][1] + peanutButter * ings[1][1] + frosting * ings[2][1] + sugar * ings[3][1])
                        * Math.max(0, sprinkles * ings[0][2] + peanutButter * ings[1][2] + frosting * ings[2][2] + sugar * ings[3][2])
                        * Math.max(0, sprinkles * ings[0][3] + peanutButter * ings[1][3] + frosting * ings[2][3] + sugar * ings[3][3]);
            if (score > maxScore)
                maxScore = score;
        }
    }
}

maxScore;
