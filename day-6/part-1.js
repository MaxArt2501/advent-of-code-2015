var grid = new Uint8Array(1e6);

var lightAction = (action, x1, y1, x2, y2) => {
    for (let y = +y1; y2 - y >= 0; y++) {
        for (let x = +x1; x2 - x >= 0; x++) {
            let index = y * 1000 + x;
            grid[index] = action === "toggle"
                    ? 1 - grid[index]
                    : action === "turn on";
        }
    }
};

input.slice(0,-1).split("\n").forEach(instr => {
    lightAction(...instr.match(/^(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)$/).slice(1));
});

grid.reduce((sum, cur) => sum + cur);

// Explanation: we have to do something less compact this time, basically because we need those `for` cycles
// (using `for` seems so awkward in these days when functional programming is ruling all over Javascript).
// The interesting part here is using ES2015's "spread operator" (`...`) to fill in the arguments for the
// function `lightAction`.
// Also, to save resources and hopefully gain speed, we're using a `Uint8Array` object to store the lights'
// state. A linear array, that is, since it's quite simple to convert 2D coordinates to a 1D index.
