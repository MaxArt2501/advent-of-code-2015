// Oh boy, the good old travelling salesman problem. It's one of the most notorius NP-hard problems around.
// Fortunately, in our case we're limited to 8 cities, so we should get the solution in a blink.

// First of all, we get the names of all the cities. All we have to do is to conveniently split the input
// removing all the " to " and " = ##\n" strings: easily done with a regular expression.
// Then we have to remove all the doubles: we can take advantage of a `Set` for the task, using our raw list
// of cities as the input. To convert the set back to an array, we use `Array.from`.
var cities = Array.from(new Set(input.split(/ = \d+\n| to /).slice(0, -1)));

// We store the distances between cities here, as a nice nested hashmap. So, for example,
// `distances.London.Dublin = 464`.
var distances = cities.reduce((obj, city) => Object.assign(obj, { [city]: {} }), {});

// Now we parse the input. Array destructuring allows us to get the source, the destination and the distance
// all in one hit. Then we build the `distances` map.
input.slice(0,-1).split("\n").forEach(line => {
    let [ , source, destination, distance ] = line.match(/^(\w+) to (\w+) = (\d+)$/);

    distances[source][destination] =
        distances[destination][source] = +distance;
});

// Now this is the function that gets the minimum total distance. It's very simple and it's based on brute
// force, so it has complexity O(n!). There are algorithms (like Held–Karp) that do better... but I don't
// know if I have the patience to implement it :) (it's quite complex, to be honest).
// As I said, with just 8 cities we won't encounter any time-constraint problem.
var getMinDistance = (remaining, lastCity = null) => {
    var minDistance = Infinity;
    for (let i = 0; i < remaining.length; i++) {
        let city = remaining[i],
            distance = lastCity != null ? distances[lastCity][city] : 0;

        if (remaining.length > 1)
            // The spread operator can be used to create new array, instead of the boring `concat` method.
            distance += getMinDistance([ ...remaining.slice(0, i), ...remaining.slice(i + 1) ], city);

        if (distance < minDistance)
            minDistance = distance;
    }

    return minDistance;
}

getMinDistance(cities);
