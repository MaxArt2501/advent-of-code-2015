// For the first time, we have to *completely* refactor our solution! Now we have to make the reindeers
// actually "race".
var RACE_DURATION = 2503;

// We collect the data about the reindeers here, including their cycle periods. We don't actually need to
// know their resting times. In these objects, we'll also store the distance flown and the points gained.
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

// Determines if a reindeer is flying at a given time (in seconds). We only need to check if the time is in
// the middle of the reindeer's flight time, which happens at the beginning of its cycle period.
var isFlying = (reindeer, time) => time % reindeer.period < reindeer.flying;

// We will simulate the whole race at every second, everything other attempt whould be over-complicated for
// just 2503 iterations.
for (var time = 0; time < RACE_DURATION; time++) {
    // Computing the distance each reindeer has flown so far.
    let distances = reindeers.map(reindeer => {
        if (isFlying(reindeer, time))
            reindeer.distance += reindeer.speed;

        return reindeer.distance;
    });
    // The leading reindeer(s) has flown this much.
    var front = Math.max(...distances);

    // If a reindeer is leading, it gets a point.
    reindeers.forEach(reindeer => {
        if (reindeer.distance === front)
            reindeer.points++;
    });
}

Math.max(...reindeers.map(reindeer => reindeer.points));
