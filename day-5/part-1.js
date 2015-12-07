input.slice(0, -1).split("\n").filter(string => string.split(/[aeiou]/).length > 3 && string.match(/(.)\1/) && !["ab","cd","pq","xy"].some(bad => string.includes(bad))).length;

// Explanation: boy, do I love one-liners?
// There's nothing much to explain, actually, as we're just merely counting the number of "nice" strings by
// performing three tests on them. Counting the vowels is quite straightforward as explained in the first
// day's solution to the first part; checking for double letters is simple too using backreferences in a
// regular expression; finally, we're checking for the presence of a given substring using the ES2015's
// `includes` string method.
