var ITERATIONS = 100;

// Creating the grid as a matrix of booleans.
var grid = input.slice(0, -1).split("\n").map(line => line.split("").map(ch => ch === "#"));

// Counts the number of alive neighbours of a given cell.
var countNeighbors = (grid, row, column) => {
    // This represents the surroundings of the cell (including the cell itself), limited by the grid's
    // boundaries. To be fair, taking a portion of the grid for every one of its cells may be a waste,
    // computationally speaking, but for our purposes it's fast enough, and makes things clearer.
    let block = grid
            .slice(Math.max(0, row - 1), Math.min(grid.length, row + 2))
            .map(line => line.slice(Math.max(0, column - 1), Math.min(line.length, column + 2)));

    // Sums the cell, subtracting the cell itself (the cell's value is converted to either 0 or 1).
    return block.reduce((sum, line) => sum + line.reduce((partial, cell) => cell + partial), 0) - grid[row][column];
};

// Checks if a cell should be on for the next iteration. If it was off, there must be 3 bulbs on around, but
// if it was on, there could also be two. Using the logic OR with the number of adjacent bulbs on and the
// state of the cell, then, it should be 3 for the cell to be on on the next step.
var isOn = (grid, row, column) => (countNeighbors(grid, row, column) | grid[row][column]) === 3;

var evolveGrid = (grid) => grid.map(
    (row, i) => row.map((cell, j) => isOn(grid, i, j))
);

for (var i = 0; i < ITERATIONS; i++)
    grid = evolveGrid(grid);

// If we convert the grid to a string, to get the number of bulbs switched on we just have to count
// the number of "true" sequences in the results, as we learnt to do on day 1.
(grid + "").split("true").length - 1;
