# freeCodeCamp: Algorithms - Implement Insertion Sort

Taking an array as an argument, create a sorted array with the first element, then inspect the next element and swap it backward into the sorted array until it's in sorted position. Continue with all the elements in the submitted array until they're all sorted, then return the sorted array.

## Solution explained

First start the sorted array with the first element of the submitted array.

Then start walking the submitted array from index 1. If the value from the submitted array is bigger than, or equal to, the last element in the sorted array, `push` it on the end and `continue` to the next iteration. If it's smaller than or equal to the first element, `unshift` it onto the beginning of the sorted array and `continue` to the next iteration.

If it's not the *current* smallest or largest value, triggering the conditions above. Walk backward through the array by looping backward from the last index to 0. If it's smaller than the value at index `x` AND larger than the value at index `x-1` OR it's equal to the value at index `x`, a splice operation pops it in before index `x` then `break`s the loop because there's no need to walk backward further. 

When the outer loop is done, return the sorted array.

## Solution Note

I'm not sure if my solution explicitly follows the rules because of the "swap it backward" wording. In bubble sorting and selection sorting, I literally swapped two values in an array (multiple times). In this one, I'm directly inserting it at the evaluated best place with `unshift`, `splice`, or `push`. But since this is called an "insertion" sort, it's my opinion that was the most efficient way to follow the spirit of the instructions, if not the letter.

## Solution
```javascript
function insertionSort(arr) {
  let newarr =[arr[0]];
  for(let i = 1; i< arr.length; i++) {
    if(arr[i] >= newarr[newarr.length - 1]){
      newarr.push(arr[i]);
      continue;
    } else if (arr[i] <= newarr[0]) {
      newarr.unshift(arr[i]);
      continue;
    }
    for(let x = newarr.length - 1; x >= 0 ; x--){
      if(arr[i] > newarr[x - 1] && arr[i] < newarr[x] || arr[i] === newarr[x]){
        newarr.splice(x, 0, arr[i]);
        break;
      }
    }
  }
  return newarr;
}
```