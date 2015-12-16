var TEASPOONS = 100,
    CALORIES = 500;

var ings = input.slice(0, -1).split("\n").map(
    line => line.match(/(-?\d+).*?(-?\d+).*?(-?\d+).*?(-?\d+).*?(-?\d+)/).slice(1).map(Number)
);

var maxScore = 0;

var xLimit = Math.min(TEASPOONS, CALORIES / ings[0][4]);

for (var x = 0; x <= xLimit; x++) {
    var xCalories = x * ings[0][4],
        yLimit = Math.min(TEASPOONS - x, (CALORIES - xCalories) / ings[1][4]);
    for (var y = yLimit; y >= 0; y--) {
        var yCalories = y * ings[1][4],
            remainingTeaspoons = TEASPOONS - x - y,
            remainingCalories = CALORIES - xCalories - yCalories;

        if ((remainingCalories - ings[3][4] * remainingTeaspoons) % (ings[2][4] - ings[3][4])) continue;

        var z = (remainingCalories - ings[3][4] * remainingTeaspoons) / (ings[2][4] - ings[3][4]),
            w = TEASPOONS - x - y - z,
            score = Math.max(0, x * ings[0][0] + y * ings[1][0] + z * ings[2][0] + w * ings[3][0])
                    * Math.max(0, x * ings[0][1] + y * ings[1][1] + z * ings[2][1] + w * ings[3][1])
                    * Math.max(0, x * ings[0][2] + y * ings[1][2] + z * ings[2][2] + w * ings[3][2])
                    * Math.max(0, x * ings[0][3] + y * ings[1][3] + z * ings[2][3] + w * ings[3][3]);
        if (score > maxScore)
            maxScore = score;
    }
}

maxScore;
