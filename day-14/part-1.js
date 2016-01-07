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

// Explanation: To compute the distance each reindeer has flown, we need to know the number of seconds they
// fly during the race time. Every reindeer have cycles of flight and rest, with a period that's the sum of
// their flight and rest times. For each cycles, each reindeer has flown for their respecitve flight periods.
// So each reindeer flies for their flight periods, multiplied by the number of complete cycles performed,
// plus a remainder of seconds that's maxed by their flight periods. Multiply this by their flight speed,
// and you'll get the distance flown by each reindeer.
