var LITERS = 150;
var allSizes = input.match(/\d+/g).map(Number);

var ways = (remaining, sizes) => remaining ? sizes.reduce((tot, size, i) => remaining >= size ? tot + ways(remaining - size, sizes.slice(i + 1)) : tot, 0) : 1;

ways(LITERS, allSizes);

// Explanation: the `ways` function can seem a little obscure, but it's just a recursive function that counts
// the number of ways to reach the remaining amount of eggnog with the given containers.
// If the remaining liters are 0, then there's only a way to settle it: no containers. That's where the
// recursion stops.
// On the other hand, if the amount is positive, we iterate through the given containers, we see if they
// aren't too big, and we call the function again with a scaled down amount, and the containers from that
// index onward.
