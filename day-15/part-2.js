var TEASPOONS = 100,
    CALORIES = 500;

var ings = input.slice(0, -1).split("\n").map(
    line => line.match(/(-?\d+).*?(-?\d+).*?(-?\d+).*?(-?\d+).*?(-?\d+)/).slice(1).map(Number)
);
var props = ings[0].slice(0, 4).map((n, index) => ings.map(data => data[index]));

var dotProduct = (array1, array2) => array1.reduce((sum, entry, index) => sum + entry * array2[index], 0),
    getScore = (...amounts) => props.reduce((prod, data) => prod * Math.max(0, dotProduct(amounts, data)), 1);

var maxScore = 0;

// Now we have *two* constraints (the amount of calories), so we can compute *two* parameters out of the
// other two, *and* limit the number of teaspoons for each ingredient with the remaining amount of calories,
// sparing us a lot of iterations. This part is, in fact, much quicker.
var sprinkleLimit = Math.min(TEASPOONS, CALORIES / ings[0][4]);

for (var sprinkles = 0; sprinkles <= sprinkleLimit; sprinkles++) {
    var sprinkleCalories = sprinkles * ings[0][4],
        peanutButterLimit = Math.min(TEASPOONS - sprinkles, (CALORIES - sprinkleCalories) / ings[1][4]);
    for (var peanutButter = peanutButterLimit; peanutButter >= 0; peanutButter--) {
        var peanutButterCalories = peanutButter * ings[1][4],
            remainingTeaspoons = TEASPOONS - sprinkles - peanutButter,
            remainingCalories = CALORIES - sprinkleCalories - peanutButterCalories;

        // We don't match the amount of calories: let's skip this solution.
        if ((remainingCalories - ings[3][4] * remainingTeaspoons) % (ings[2][4] - ings[3][4])) continue;

        // Using the constraint on calories to compute the amount of teaspoons of frosting. If this is
        // confusing, just do the math starting from the system of two linear equations in 4 variables
        // the the problem gives you:
        //        SP +     PB +     FR +     SU = 100
        //    spC*SP + pbC*PB + frC*FR + suC*SU = 500
        var frosting = (remainingCalories - ings[3][4] * remainingTeaspoons) / (ings[2][4] - ings[3][4]),
            sugar = TEASPOONS - sprinkles - peanutButter - frosting,
            score = getScore(sprinkles, peanutButter, frosting, sugar);

        if (score > maxScore)
            maxScore = score;
    }
}

maxScore;
