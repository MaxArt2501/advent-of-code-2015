var countNumbers = obj => {
    let array = Array.isArray(obj) ? obj : Object.keys(obj).map(key => obj[key]);

    return array.reduce((sum, item) => {
        let value = 0;
        if (typeof item === "number")
            value = item;
        else if (typeof item === "object")
            value = countNumbers(item);

        return sum + value;
    }, 0);
};

countNumbers(JSON.parse(input));

// Explanation: here, we just parse the input and walk it down, adding all the numbers we find and calling
// the function recursively when the item is either an array or an object (`typeof item === "object"` works
// for both cases). `countNumbers` always takes an iterable as the argument: if it's a plain object, we
// get the array of all the values.
