var wires = {},
    solved = {};

var resolveWire = (gate, source, value) => {
    if (typeof source === "string")
        if (source in solved) source = solved[source];
        else return null;

    if (typeof value === "string")
        if (value in solved) value = solved[value];
        else return null;

    switch (gate) {
        case "NOT": return 65535 - value;
        case "AND": return source & value;
        case "OR": return source | value;
        case "LSHIFT": return source << value;
        case "RSHIFT": return source >> value;
    }

    return value;
}

input.slice(0,-1).split("\n").forEach(instr => {
    let [ , source, gate, value, wire ] = instr.match(/^(?:([a-z\d]+) )?(?:(AND|OR|LSHIFT|RSHIFT|NOT) )?([a-z\d]+) -> ([a-z]+)$/);
    if (!isNaN(value)) value = +value;
    if (!isNaN(source)) source = +source;
    wires[wire] = [ gate, source, value ];
});

var wiresCount = Object.keys(wires).length;

// There's not much to say about the second part. All we need to do is to wrap the lazy evaluation cycle
// in a function, since it will be run twice.
var lazyEvaluateWires = () => {
    while (Object.keys(solved).length < wiresCount) {
        for (let wire in wires) {
            if (wire in solved) continue;

            let value = resolveWire(...wires[wire]);
            if (value !== null) {
                solved[wire] = value;
            }
        }
    }
}

lazyEvaluateWires();

// Between the two runs, we empty the `solved` map, leaving only a mocked value for wire `b`.
solved = { b: solved.a };

lazyEvaluateWires();

solved.a;
