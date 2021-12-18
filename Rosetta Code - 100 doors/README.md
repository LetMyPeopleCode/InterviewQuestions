# Rosetta Code: 100 doors
In this exercise, we receive a number of doors. It's 100 in the title, but the function gets passed a number of doors, so it should be able to handle an arbitrary # of doors.

We start with all `n` doors closed. On the first pass, you toggle every door to the opposite of its state (closed becomes open, open becomes closed). We iterate the toggle `n` times. Let's call the iteration count `c`. Applying the toggle to every `c`th door on each iteration, until on the final iteration, it's only applied to door `n`.  

Then return a set with *only* the numbers of the doors that are open.

## Solution Explained

You have to start with an array of `n` doors. Easy enough to create a 100-element array with `Array(100)`, but filling it... I wanted to see if there was a more efficient way to do this than a loop through. Turns out there's a `fill` method on arrays. It's worth checking [`Array.protytpe.fill()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill#browser_compatibility) compatibility, though, since it's not available on IE or node < 4.0.0.

Then start a loop from 1 to `numDoors`. Start counting at 1 because it's used as a step value for the interior loop.

The interior loop starts at `i`, so when you're going with every second item, the second loop starts with the second item (i - 1), and so on. It's one of those lovely parts of the iteration starting from 1 and the index values starting from 0. Somewhere you have to do some mathematical gymnastics to make them work together.

While I was writing this, I had to take a "bio-break," and while I did, I wondered if using a boolean would be more memory efficient than using 0 and 1 as representations of `true/false`. A little research later and it seemed they'll both use the same amount of memory depending on the platform, possibly a little less for the boolean. But it occurred to me that the booleans might make it more readable too, so I refactored with booleans.

In the interior loop, examine door `j-1` (first loop: 0, 1, 2, 3..., second loop: 1, 3, 5, 7...). Remember, arrays are zero-indexed. Then using a ternary operator, "flip the bit." I use that term because a boolean is essentially a representation of the value of a single byte: on or off, 1 or 0, true or false. Since I started programming at 11, I literally "grew up" with that concept and lingo.

When it's all done, we run a loop through the array to identify the index values of all the open doors, add 1 to each to get the `n`th value, and push the value to the array that gets returned.

## Solution

```javascript
function getFinalOpenedDoors(numDoors) {
  let doors = new Array(numDoors).fill(false);
  for(let i = 1; i <= numDoors; i++){
    for(let j = i; j <= numDoors; j += i){
      doors[ j - 1 ] = (doors[ j - 1 ] === false) ? true : false;
    }
  }
  let open = [];
  for(let i in doors){
    if(doors[ i ]) open.push(parseInt( i ) + 1 );
  }
  return(open)
}
```