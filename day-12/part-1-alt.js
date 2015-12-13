input.match(/-?\d+/g).reduce((sum, number) => sum + (+number), 0);

// Explanation: if you read carefully the problem, you may notice it says "You will not encounter any
// strings containing numbers." We can exploit this by scanning the whole input for all the numbers,
// *without the need to parse the JSON*. A simple regular expression will do the trick.
// The rest is easy, we just have to sum all the resulting numbers
