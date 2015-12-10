// Sorry to disappoint, but just iterate 10 more times for the second part. Moving on...
for(let i = 0; i < 50; i++) {
    let re = /(\d)\1*/g,
        string = "",
        result;

    while (result = re.exec(input))
        string += result[0].length + result[1];

    input = string;
}

input.length;
