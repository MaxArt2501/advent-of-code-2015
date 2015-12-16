// In the end, it's all about computing the distance that each reindeer has flown after 2503 seconds.
var RACE_DURATION = 2503;

var distances = input.slice(0, -1).split("\n").map(line => {
    let [ , speed, flying, resting ]
            = line.match(/^\w+ can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\.$/),
        period = +flying + (+resting),
        cycles = Math.floor(RACE_DURATION / period),
        remaining = RACE_DURATION % period;

    return speed * (flying * cycles + Math.min(remaining, flying));
});

Math.max(...distances);

// Explanation: ... later.
