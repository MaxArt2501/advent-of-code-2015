// A little change here: instead of `Array.from`, we can just use the spread operator to get an array out
// of a `Set`.
var cities = [ ...new Set(input.split(/ = \d+\n| to /).slice(0, -1)) ];

var distances = cities.reduce((obj, city) => Object.assign(obj, { [city]: {} }), {});

input.slice(0,-1).split("\n").forEach(line => {
    let [ , source, destination, distance ] = line.match(/^(\w+) to (\w+) = (\d+)$/);

    distances[source][destination] =
        distances[destination][source] = +distance;
});

// Now we're reuqested the *maximum* total distance... Easy peasy, with a slight change in the recursive
// function.
var getMaxDistance = (remaining, lastCity = null) => {
    var maxDistance = 0;
    for (let i = 0; i < remaining.length; i++) {
        let city = remaining[i],
            distance = lastCity != null ? distances[lastCity][city] : 0;

        if (remaining.length > 1)
            distance += getMaxDistance([ ...remaining.slice(0, i), ...remaining.slice(i + 1) ], city);

        if (distance > maxDistance)
            maxDistance = distance;
    }

    return maxDistance;
}

getMaxDistance(cities);
