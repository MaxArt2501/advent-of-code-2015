// Now things are getting a little more complicated, so explanations are given on the code.
// By the way, if you don't know the reference for Bobby Tables, this uber-famous xkcd comic strip will
// solve the mystery: https://xkcd.com/327/

// This will hold the instructions to get the wires' values. It's a simple hash map where the keys will be
// the names of the wires, and the values are arrays of three elements. The first element will be the gate
// type ("AND", "OR", "NOT", "LSHIFT" or "RSHIFT"), the second will be the first operand of the logic gate
// (often called "source" thoughout the code) and the third will be the second operand ("value").
// The "source" and "gate" elements may be undefined (in case of a NOT gate or a direct assignment).
// For example:
// "x LSHIFT 2 -> y"  // wires.y = [ "LSHIFT", "x", 2 ]
// "NOT f -> g"       // wires.g = [ "NOT", undefined, "f" ]
// "c -> d"           // wired.d = [ undefined, undefined, "c" ]
var wires = {},
// This will hold the wires' resolved values.
    solved = {};

// This simple function will try to evaluate a gate's output, given the gate's type and its operands.
// The operands can be either integers, or names of wires that have already been solved, or else the
// result will be null.
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

    // If the gate is missing, it's a direct assignment
    return value;
}

// This is where we parse the input. A regular expression and array destructuring do the trick to find
// the desired values for the gate type and the "source" and "value" operands.
input.slice(0,-1).split("\n").forEach(instr => {
    let [ , source, gate, value, wire ] = instr.match(/^(?:([a-z\d]+) )?(?:(AND|OR|LSHIFT|RSHIFT|NOT) )?([a-z\d]+) -> ([a-z]+)$/);
    if (!isNaN(value)) value = +value;
    if (!isNaN(source)) source = +source;
    wires[wire] = [ gate, source, value ];
});

// We have this many wires - we must solve this many values!
var wiresCount = Object.keys(wires).length;

// And now we start evaluating the wires' values. It's a lazy evaluation, so we solve the wires that we
// can first, leaving the others to the next iteration. We stop when all the wires have been solved.
// There shouldn't be any circular reference in the input, so there's no need for an extra check.
while (Object.keys(solved).length < wiresCount) {
    for (let wire in wires) {
        if (wire in solved) continue;

        let value = resolveWire(...wires[wire]);
        if (value !== null) {
            solved[wire] = value;
        }
    }
}

solved.a;
