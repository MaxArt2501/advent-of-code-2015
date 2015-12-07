input.slice(0, -1).split("\n").filter(string => string.match(/(..).*?\1/) && string.match(/(.).\1/)).length;

// Explanation: because *these* rules aren't ridiculous at all..
// Anyway, regular expressions and backreferences to the rescue again. There's nothing much to add with
// respect to the first part, really, except the slightly more advanced use of regular expressions, but this
// isn't really the place to explain them. There are many nice guides outside, for there rest there's still
// Stack Overflow.
