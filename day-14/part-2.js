// For the first time, we have to *completely* refactor our solution! Now we have to make the reindeers
// actually "race".
var RACE_DURATION = 2503;

var reindeers = input.slice(0, -1).split("\n").map(line => {
    let [ , speed, flying, resting ]
            = line.match(/^\w+ can fly (\d+) km\/s for (\d+) seconds, but then must rest for (\d+) seconds\.$/);

    return {
        speed: +speed,
        flying: +flying,
        period: +flying + (+resting),
        distance: 0,
        points: 0
    };
});

var isFlying = (reindeer, time) => time % reindeer.period < reindeer.flying;

for (var time = 0; time < RACE_DURATION; time++) {
    let distances = reindeers.map(reindeer => {
        if (isFlying(reindeer, time))
            reindeer.distance += reindeer.speed;

        return reindeer.distance;
    });
    var front = Math.max(...distances);

    reindeers.forEach(reindeer => {
        if (reindeer.distance === front)
            reindeer.points++;
    });
}

Math.max(...reindeers.map(reindeer => reindeer.points));

// Explanation: ... later.
