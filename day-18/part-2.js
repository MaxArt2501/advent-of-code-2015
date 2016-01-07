var ITERATIONS = 100;

var grid = input.slice(0, -1).split("\n").map(line => line.split("").map(ch => ch === "#")),
    lastRow = grid.length - 1,
    lastCol = grid[0].length - 1;

// Force the corners' states to on.
grid[0][0] = grid[0][lastCol] = grid[lastRow][0] = grid[lastRow][lastCol] = true;

var countNeighbors = (grid, row, column) => {
    let block = grid
            .slice(Math.max(0, row - 1), Math.min(grid.length, row + 2))
            .map(line => line.slice(Math.max(0, column - 1), Math.min(line.length, column + 2)));

    return block.reduce((sum, line) => sum + line.reduce((partial, cell) => cell + partial), 0) - grid[row][column];
};

var isOn = (grid, row, column) => {
    // If we're on the corners, they'll always be on.
    if ((row === 0 || row === lastRow) && (column === 0 || column === lastCol))
        return true;

    return (countNeighbors(grid, row, column) | grid[row][column]) === 3;
};

var evolveGrid = (grid) => grid.map(
    (row, i) => row.map((cell, j) => isOn(grid, i, j))
);

for (var i = 0; i < ITERATIONS; i++)
    grid = evolveGrid(grid);

(grid + "").split("true").length - 1;
