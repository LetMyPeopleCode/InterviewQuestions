# freeCodeCamp: Algorithms - Implement Quick Sort

Let's use their description...
> In this method, a pivot value is chosen in the original array. The array is then partitioned into two subarrays of values less than and greater than the pivot value. We then combine the result of recursively calling the quick sort algorithm on both sub-arrays. This continues until the base case of an empty or single-item array is reached, which we return.

## Solution Explained

First I declare the variables. Note there are three new arrays declared.

For the pivot, I tried to grab the value in the approximate middle of the array. I could have gone with their suggestion of using the first or last value, but I'm a rebel.

Then it was a matter of breaking up the array. Values smaller than the pivot go to `arr1`, bigger than it go to `arr3`, and all instances of the pivot value go into `arr2`. `arr2` needs to be an array because the pivot value may occur more than once and we're not supposed to filter out duplicates.

Once everything's broken up, `arr1` and `arr3` go recursively back to the `quickSort` function if they've got more than 1 element. Otherwise they're preserved. When/if the values come back from recursion, the sorted `arr1` (smaller than the pivot) is concatenated with `arr2` (pivot(s)) and `arr3` (bigger than the pivot) and returned. 

## Solution notes

The implementation of this stymied me for a bit because of the instruction to partition everything into two arrays that were less than or greater than the pivot value. The pivot value would get dropped. I made one partition greater than or equal to the pivot and that caused *issues* with the main test case.

If the pivot value was the smallest number, or there was more than one instance of the same number in a partitioned array, voila, endless loop. I added checks to make sure the numbers in the incoming array weren't all equal and the pivot wasn't the smallest number. Then it worked, but those checks seemed inefficient. It had to walk the array two-to-three times on each iteration of the recursion.

It passed the automated tests, though, and I had even written the write-up, but hadn't committed and pushed. Then I had to stop for a call, and when I came back, I got an inspiration. What if I didn't pass the pivot? So I refactored for NOT putting the pivot in either partition and got this shorter, less complex version.

Sometimes, when it feels like you're banging your head against the wall, a 15 minute break can do wonders for your perspective.

## Solution
```javascript
function quickSort(arr) {
  let pivot, arr1 = [], arr2 = [], arr3 = [];
  pivot = arr[Math.floor(arr.length/2)];
  for(let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      arr1.push(arr[i]);
    } else if (arr[i] === pivot) {
      arr2.push(arr[i]);
    } else if (arr[i] > pivot) {
      arr3.push(arr[i]);
    }
  }
  arr1 = (arr1.length < 2) ? arr1 : quickSort(arr1);
  arr3 = (arr3.length < 2) ? arr3 : quickSort(arr3);
  let newarr = arr1.concat(arr2, arr3)
  return newarr;
}
```
