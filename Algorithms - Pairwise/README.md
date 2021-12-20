# freeCodeCamp: Algorithms - Pairwise

Given an array of elements and a number *as* arguments, return the sum of the indices of pairs in the array that add up to the number. Once an index is used, it's inelligible to be used again.

## Solution Explained

Start by creating the array `used` to hold all the index numbers that have been paired.

Then start a loop through the array. If `i` is already in `used`, `continue` (a.k.a. skip to the next iteration of the loop).

Then start a loop for all the remaining elements in the array after the `i` index, represented by `j`. If a value of `j` is in the `used` array, skip to the next iteration of the internal loop. If the `arr[i]` and `arr[j]` values add up to `arg`, push `i` and `j` to the `used` array and `break` to stop the `j` loop altogether and move on to the next iteration of the external `i` loop.

When that's complete, if `used` is empty, return 0. If not, return the result of a `reduce` function that sums `used`.

## Solution notes

Three things I got wrong an had to fix. 

1. I declared the `i` loop as `for (let i of arr)`, but that passes `i` into the loop as a string, not a number, and type coercion would make `i + j` a string, rather than an integer. Rather than mess around with recasting it to an integer, using the more classic loop declaration was the most concise fix.

2. I just pushed `i` and `j` to `used` without a `break`, which let that index value of `i` keep looping through the rest of the array and potentially matching a second time. This failed the `[1,1,1] , 2` arguments test, because `used` ended up as `[0, 1, 0, 2]` instead of the `[0, 1]` it should have been. Adding the `break` made sure it stopped the internal loop and went to the next iteration of the external loop.

3. The `[], 100` test failed because the `reduce` function on an empty array does not return 0. Adding the length test before returning the sum solved that.

Though item 1 broke every test, items 2 and 3 show the value of a good set of tests. Good tests make for good code, because they *can* catch the edge cases you might not otherwise catch in the heat of coding.

## Solution

```javascript
function pairwise(arr, arg) {
  let used = [];
  for(let i = 0; i < arr.length; i++){
    if(used.indexOf(i) !== -1) continue;
    for (let j = i+1; j < arr.length; j++){
      if(used.indexOf(j) !== -1) continue;
      if(arr[i] + arr[j] === arg) {
        used.push(i, j);
        break;
      }
    }
  }
  if(used.length == 0) return 0;
  return (used.reduce((x, y)=> x + y))
}
```