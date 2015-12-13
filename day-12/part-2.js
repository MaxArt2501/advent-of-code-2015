var countNonRedNumbers = obj => {
    let array;
    if (Array.isArray(obj))
        array = obj;
    else {
        array = Object.keys(obj).map(key => obj[key]);
        if (array.includes("red")) return 0;
    }

    return array.reduce((sum, item) => {
        let value = 0;
        if (typeof item === "number")
            value = item;
        else if (typeof item === "object")
            value = countNonRedNumbers(item);

        return sum + value;
    }, 0);
};

countNonRedNumbers(JSON.parse(input));

// Explanation: trying to use regular expressions again is nothing but an inane effort... Until Javascript
// will support "recursive regular expressions", that is.
// So let's just do what the problem says: if the argument is an object, and has `"red"` among its values,
// just return 0; otherwise, behave as the first part.
