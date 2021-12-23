# freeCodeCamp: Algorithms - Implement Binary Search

In this implementation of a binary search, you're presented a sorted array of values and a target value to find within it.

Find the approximate halfway point (by length) of the array, using `Math.floor(array.length/2)`. Then extract a middle number. If that number is higher than the target value, recursively pass an array with the values to the left of that number back to the binary search function. If it's lower, pass an array with the values to the right. If it's equal, return an array with just that number.

When you've found the number and it passes back up the recursion chain, concatenate the middle values onto the left side as it passes back up the chain of recursion. Return an array that traces the path through the middle numbers to the found number. If the number isn't found, return "Value Not Found."

## Solution Explained

First, the prior sorts said you can't use `Array.prototype.sort()`, but this search didn't explicitly prohibit `Array.prototype.indexOf()`. Instead they get you with having to "show your work" by passing the path of middle numbers it took to get to the target value.

Start by getting the `half`way point and the `middle` value. Note how the `middle` index is `half` minus `(1 - searchList.length%2`). In cases where the length is even, `1 - searchList.length%2` will be 1. Where length is odd, it'll be 0. That's because for even-length lists, halfway exists between two letters and you should grab the one on the left. For odd-length lists, you get the index of the one in the middle and don't have to change the `half` value.

Next, check if `middle` equals the `value` agrument OR if the incoming array is 1 item long and matches the `value`. If so, return an array containing the value. If the array has a length of 1 and the one item doesn't match the target, OR the array has a length of 0, return the error message to start percolating up the recursion chain.

Next assign the appropriate array chunk to `nextpass` (if the value's higher than the middle, assign the group of bigger numbers, else assign the smaller group); 

Pass `nextpass` and the value down the chain of recursion. If an array object comes back, tack the middle number onto the left, and return it. If "No Such Value" comes up, keep it moving.

When the recursions are done, you have your answer.


## Solution

```javascript
function binarySearch(searchList, value) {
  let half = Math.floor(searchList.length/2);
  let middle = searchList[half-(1-searchList.length%2)];
  if((middle === value) || (searchList.length === 1 && searchList[0] === value)) {
    return [value];
  } else if (searchList.length === 1 && searchList[0] !== value || searchList.length == 0){
    return "Value Not Found";
  }

  let nextpass = (middle < value) ? searchList.slice(-half) : searchList.slice(0,half-(1-searchList.length%2)); 
  let res = binarySearch(nextpass,value);
  if(typeof res === "object"){
    return [middle, ...res];
  } 
  return res;  
}
```