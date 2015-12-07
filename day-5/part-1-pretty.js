var hasEnoughVowels = string => string.split(/[aeiou]/).length > 3,
    hasDoubleLetters = string => string.match(/(.)\1/) !== null,
    hasNoNaughtyStrings = string => !["ab","cd","pq","xy"].some(bad => string.includes(bad));

input
    .slice(0, -1)
    .split("\n")
    .filter(hasEnoughVowels)
    .filter(hasDoubleLetters)
    .filter(hasNoNaughtyStrings)
    .length;

// Explanation: there, now it's understandable.
