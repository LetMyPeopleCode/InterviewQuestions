# freeCodeCamp: Data Structures - Create and Add to Sets in ES6

Sets were added to JavaScript with ES6. So this exercise was to use JavaScript's native `Set` object and its add method.

## Solution Explained

First, this required writing a single line of code (the one starting with `set.add(...)`). It could have been three lines, but you'll see how that worked out in a moment.

Second, the explanation in the exercise is misleading.

Unfortunately `set.add([4,5,6])` doesn't add the individual elements of the array to the set. It adds the whole array to the set as a single element. The constructor may iterate through arrays, but the add method didn't.

I tested it in a new browser tab in the console to make sure it wasn't just some funky `Set()` polyfill they were using.

So when adding `["Taco", "Cat", "Awesome"]` resulted in `[1, 2, 3, ["Taco", "Cat", "Awesome"]]`, I realized I had to add each word, one at a time.

For giggles, I tried chaining the add statements to keep it single line. And it worked.

## Solution
```javascript
function checkSet() {
  var set = new Set([1, 2, 3, 3, 2, 1, 2, 3, 1]);
  set.add("Taco").add("Cat").add("Awesome");
  console.log(Array.from(set));
  return set;
}
```

