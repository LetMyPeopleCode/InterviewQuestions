# freeCodeCamp: Algorithms - Implement Merge Sort

The merge sort works similar to the selection sort in that it starts by splitting the array, but this time it's in half or as close as you can get. No other action is done. It just gets split recursively until it's 1 value or 0 values. As the split arrays are returned, they're merged by the merge function, which returns a sorted array. As the recursion percolates back up, the arrays are always sorted, so it's relatively simple to create a sorted merge. 

## Solution explained

The instructions suggested creating one function to do the merging (`merge()`) and one to be the controller/splitter (`mergeSort()`).

In `mergeSort()`, if the incoming array is 1 or 0 in length, return it. That actually begins the upward merging.

Next determine a halfway point and split the array. I use `Math.floor` to round down the split of odd numbers, then use `arr.length % 2` to get a 0 for even lengths and 1 for odd. This provides a 3/2 split for 5 values, 4/3 for 7, etc.

Next, `mergeSort()` is called again recursively on each array as arguments of `merge()`. This will keep splitting the array until there's just an array of zero or 1 length to return. As they come back, they'll be progressively merged and get passed back up the chain of recursion until everything's been merged back into one array.

The `merge()` function takes 2 *sorted* arrays and combines them into a sorted array.

While both of them have at least one element, each array's `[0]` value is compared. The lower one is removed and added to the new array. Once one has hit 0 elements, anything remaining in the other gets tacked on to the end. Because each incoming array has already been sorted, those remaining values are larger than anything else in the merged array and are in order.

## Solution
function mergeSort(arr) {
  if(arr.length <=1) return arr;
  let half = Math.floor(arr.length/2);
  let arr1 = arr.slice(0,half + arr.length % 2);
  let arr2 = arr.slice(-half)
  let merged = merge(mergeSort(arr1), mergeSort(arr2));
  return merged;
}

function merge(arr1, arr2){
  let merged = [];
  while(arr1.length > 0 && arr2.length > 0){
    if(arr1[0] < arr2[0]){
      merged.push(arr1.shift())
    } else {
      merged.push(arr2.shift())
    }
  }
  if(arr2.length > 0) merged = merged.concat(arr2);
  if(arr1.length > 0) merged = merged.concat(arr1);
  return merged
}