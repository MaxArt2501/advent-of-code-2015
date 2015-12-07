var md5 = (string) => require("crypto").createHash("md5").update(string).digest("hex");

for (var i = 0; md5(input + i).slice(0, 5) !== "00000"; i++);

console.log(i);

// Explanation: I'm not very fond of this puzzle, as it basically consists in brute force to find the answer.
// It involves calculating hashes using MD5, which is available in node.js in the native crypto module, but
// it's not in a browser environment. There's `window.crypto.subtle.digest`, but MD5 support has been removed
// as it's not considered secure (quite a silly reason if you ask me, since MD5 can be used for other things
// too).
// What we have here is a PHP-esque `md5` function that fills our needs. You can replace it with an
// implementation of your choice if you want, for example, to run the solution in a browser.
// The interesting part here is probably the odd usage of `for`, with no body and an unusual cycling
// condition.
