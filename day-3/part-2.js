input.split("")
    .reduce((data, ch, i) => {
        let p = i & 1;
        if (ch === "^") data.y[p]--;
        if (ch === ">") data.x[p]++;
        if (ch === "v") data.y[p]++;
        if (ch === "<") data.x[p]--;
        data.visited.add(data.x[p] + "," + data.y[p]);

        return data;
    }, {
        x: [ 0, 0 ],
        y: [ 0, 0 ],
        visited: new Set
    }).visited.size;

// Explanation: now we have to track Robo-Santa's movements too. No problem though, as now the `x` and `y`
// properties of `data` are now arrays of two integers, keeping the coordinates of the two gift deliverers.
// Santa's instructions are the ones at odd positions, while Robo-Santa's are the ones in the even (or
// vice-versa - it doesn't really matter). The `Set` object will stay unique.
// We get which one between Santa and Robo-Santa is moving by just getting the parity `p` of the index of
// our input, and updating the corresponding coordinates.
