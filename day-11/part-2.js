// Oh. So we have to run `findNextPassword` twice.
// Big deal.

var letterBase = "abcdefghijklmnopqrstuvwxyz",
    normalBase = "0123456789abcdefghijklmnop";

var bigCheck = /012|123|234|345|456|567|678|789|89a|9ab|abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop/,
    mediumCheck = /(.)\1.*?(.)\2/,
    smallCheck = /[8ad]/;

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

findNextPassword(findNextPassword(input));
