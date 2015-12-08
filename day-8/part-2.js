input.slice(0, -1).split("\n").reduce((sum, string) => sum + JSON.stringify(string).length - string.length, 0);

// Explanation: now `JSON.stringify` come in handy to escape our string. It would have translated escapable
// characters to Unicode sequences (`\u####`), but not in the case of double quotes and backslashes, which is
// all our input has.
