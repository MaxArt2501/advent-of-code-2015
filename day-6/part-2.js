var grid = new Uint8ClampedArray(1e6);

var diff = { "turn on": 1, "turn off": -1, "toggle": 2 };

input.slice(0,-1).split("\n").forEach(instr => {
    let [ , action, x1, y1, x2, y2 ] = instr.match(/^(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)$/);

    for (let y = +y1; y2 - y >= 0; y++) {
        for (let x = +x1; x2 - x >= 0; x++) {
            grid[y * 1000 + x] += diff[action];
        }
    }
});

grid.reduce((sum, cur) => sum + cur);

// Explanation: this part isn't much different from the first one, so we're going to use a slightly different
// approach.
// First of all, we're using a `Uint8ClampedArray` instead of a `Uint8Array` because, when subtracting a number
// greater than the value, the result will be 0, and won't wrap down from 255. That's perfect for our specs!
// Moreover, we're taking advantage of ES6's "array destructuring", which is a nice way to assign multiple
// variables, similarly to PHP's `list` statement. You can even skip a variable assignment, as we do for the
// first one.
