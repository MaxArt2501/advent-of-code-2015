# Advent of Code 2015

I'm participating to the [Advent of Code](http://adventofcode.com/), a nice little puzzle game for developers. It consists in solving a couple of Christmas-related programming puzzles, and it doesn't matter what language you're choosing as long as you get the solution. I warmly suggest to give it a try yourself! In the meanwhile, I'll post my solution the *next* day a puzzle has been published.

I'll be using the language protagonist of the last years, which is Javascript. I still don't know if it's the right language for *all* the riddles, but I'll give it a try anyway. So far, it's gone pretty well.

I'm not afraid to use bleeding-edge ES6+ features, and I'll actually try to dive into some of the newest features. Each solution file will suppose a variable named `input` which contains the input of the riddle.

To get the input for the puzzles, you'll have to log in to the site above and get your own source. I'll add an `input.txt` file in each directory with a sample input to work with. If you're getting the input in a browser window from the game's site, you can open your developer tools of choice and set

```js
var input = document.body.textContent;
```

Be warned, though, that not every solution can be executed on the browser's console, as some are meant to be run on node.js. Anyway, I'm using Chrome 48 to test my code, with flags for experimental Javascript enabled. This allows me to use some of the latest features without the need of a transpiler.

## SPOILER ALERT

I'm publishing my solutions online, each in their own `day-##` directory, which will also contain the texts of the puzzles. The solutions are merely meant to be a reference for comparison, to see the tricks I'm using and, eventually, to discuss about improvements and new ideas.

So, if you still haven't found the solution and wish to do it on your own, this is the due **SPOILER ALERT**.
