var x = 0,
    y = 0,
    visited = {};

input.split("")
    .forEach(function(ch) {
        if (ch === "^") y--;
        if (ch === ">") x++;
        if (ch === "v") y++;
        if (ch === "<") x--;
        visited[[ x, y ]]  = true;
    });

Object.keys(visited).length;

// Explanation: this is a nicer version of the solution of the first part. It's also an ES5 verison, so
// it uses a plain object instead of a `Set` to keep track of the visited houses. Also keep in mind that
// every key is a string, so `[ 5, 3 ]` -> `"5,3"` when used as a key.
