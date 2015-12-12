// Since Santa is treating his passwords as some kind of base 26 numbers, we'll do the same. So first we
// should convert the password to a number. Javascript's `parseInt` function takes a second argument as
// the base of the parsed number, and we can use any integer between 2 and 36. But since the digits in
// bases over 10 are the common Arab numbers plus Latin letters starting from "a", we should first
// convert the password to the "right" digits, then eventually convert it back.

// Similarly, `Number.prototype.toString` takes an integer between 2 and 36 to convert the number to the
// given base.

// These strings will help our conversions. Santa's passwords use the `letterBase` digit set, while math
// commonly use the `normalBase` set. Each digit has a corresponding character in the other set.
var letterBase = "abcdefghijklmnopqrstuvwxyz",
    normalBase = "0123456789abcdefghijklmnop";

// These regular expressions are needed to check our password. The `bigCheck` regex is a programmer's
// abomination, but it's ultimately the *fastest* way to check if the password has three letters in scale.
// That's the shameful truth, that regular expressions are ugly, poorly maintenable and scary, but if well
// used they're one of the greatest great tool in development.
var bigCheck = /012|123|234|345|456|567|678|789|89a|9ab|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop/,
    mediumCheck = /(.)\1.*?(.)\2/,
    smallCheck = /[8ad]/;

// This is the function that finds the next password given one.
// Some optimizations could have been done, especially for passwords that contain forbidden letters (for
// example, if we encounter "abghiaaa", we can skip directly to "abghjaaa" because of "i"), but this is
// fast enough for our needs.
var findNextPassword = (password) => {
    // Converting the password to a number
    var pwdNum = parseInt(password.replace(/./g, ch => normalBase[letterBase.indexOf(ch)]), 26),
        newPwd;

    do {
        pwdNum++;
        newPwd = pwdNum.toString(26);
    } while (!bigCheck.test(newPwd) || smallCheck.test(newPwd) || !mediumCheck.test(newPwd));

    // Return the password converted to Santa's standards
    return newPwd.replace(/./g, ch => letterBase[normalBase.indexOf(ch)]);
};

findNextPassword(input);
