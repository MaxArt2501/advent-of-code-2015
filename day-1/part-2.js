input.split("").findIndex(function(ch) { return (this.floor += ch === "(" ? 1 : -1) < 0; }, { floor: 0 }) + 1;

// Explanation: a one-liner again.
// `findIndex` is an ES2015 array method that will return the index of the first element that matches a given condition.
// The condition is that the floor's number is negative. To avoid setting a variable external to the loop, we take
// advantage of the second argument of `findIndex`, which will result in the `this` object inside of the callback function.
// That's why we can't use an arrow function here: we need `this` to be defined.
//
// Finally, we add 1 to the result because the list of elevator instructions is 1-based.
