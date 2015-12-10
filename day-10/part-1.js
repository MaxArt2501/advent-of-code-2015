for(let i = 0; i < 40; i++) {
    let re = /(\d)\1*/g,
        string = "",
        result;

    while (result = re.exec(input))
        string += result[0].length + result[1];

    input = string;
}

input.length;

// Explanation: regular expressions and backreferences to the rescue again! We first capture a digit, then
// all the following occurrences of the same number. What we get from `exec` is an array of two elements -
// the first is the sequence, the second is the digit we captured. That's all we need, sweet!
// So we just have to keep on parsing the input string and build the next iteration of the string in the
// meanwhile. Do this 40 times, and we're done.
// If you watched the video suggested in the text, you'd know that you can get a rough exstimate of the final
// length by multiplying the length of the initial input (10) to Conway's constant (~1.303577269...) raised
// to the power of 40, and you'd get something like 403154. I actually got something lower than that, but it
// greatly depends on the input.
