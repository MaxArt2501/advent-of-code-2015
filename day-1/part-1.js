input.split("(").length - input.split(")").length;

// Yes, it's *that* simple.
// Explanation: a simple way to count the number of occurrences of a substring in a string is to split the string
// using the substring, ang get the length of the resulting array. It will coincide with the number of occurrences,
// plus one.
// Example:
//     "abracadabra"
//         .split("a")      // => [ "", "br", "c", "d", "br", "" ]
//         .length          // => 6
