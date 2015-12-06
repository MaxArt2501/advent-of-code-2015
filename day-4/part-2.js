var md5 = (string) => require("crypto").createHash("md5").update(string).digest("hex");

for (var i = 0; md5(input + i).slice(0, 6) !== "000000"; i++);

console.log(i);

// Explanation: now this will run for longer, but it shouldn't take more than a couple of minutes.
