input.slice(0, -1).split("\n").reduce((sum, string) => sum + string.length - eval(string).length, 0);

// Explanation: this has been surprisingly easy, as Javascript offers several methods to escape a string,
// including some that fit our specifications.
// We used `eval` here - which is normally avoided for a series of security and performance issues, but for our
// task it's fine. As an alterntive, we could have used `JSON.parse`, but the string needed some tweaks first,
// as `JSON.parse` can't parse `\x##` sequences. But it parses `\u####` Unicode sequences, so a solution would
// have been `string.replace(/\\x([a-f\d]{2})/g, "\\u00$1")`
