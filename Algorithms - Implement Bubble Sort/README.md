# freeCodeCamp: Algorithms - Implement Bubble Sort

I've had 8 different blogs since 1995, two of which still exist, though only one gets updated at all. Back in July of 2019, on the blog I most recently took offline, I did a couple of blog posts on some basic sort algorithms (bubble and selection). My [Bubble Sort post is still available on the Wayback Machine](https://web.archive.org/web/20200814051253/https://yiddish.ninja/javascript-bubble-sort-in-the-fewest-lines/).

In nearly 30 months, I've completely forgotten how to even explain a bubble sort, much less implement it, because if you don't reinforce something repeatedly, the memory of it degrades. I remembered I did the blog post, but that's it.

All I've copied is the explanation of how the sort works: "Basically, a bubble sort function walks through an array, comparing each value to its right-hand neighbor and swapping them if the neighbor is smaller."

This will walk through the array until it makes a complete pass without having to do a swap. Because of the number of operations for most sorts, it's one of the least efficient sorts.

## Solution Explained

First I set a `swaps` variable to 1 to make sure the outer loop ran at least once. Internally, the loop sets `swaps` to 0, so when it encounters a sorted array, it won't run again.

Then an internal loop that will loop from index 0 to the second-to-last index of the array. Since the comparison compares ahead, there's no sense in going to the last element since there's nothing to compare it to. 

If `arr[i]` is greater than `arr[i+1]`, swap them. For that, I create a temporary variable to hold the current index value so it's not clobbered when I move the value of index `i+1` into index `i`. If a swap occurs, it increments `swaps`, which will require another iteration of the outer loop. When no swaps occur, the outer loop terminates and the function returns the sorted array.

## Solution note

It's worth looking at my [2019 bubble sort in the fewest lines](https://web.archive.org/web/20200814051253/https://yiddish.ninja/javascript-bubble-sort-in-the-fewest-lines/) solution, because it's 13 lines vs the 15 here.

In that, I eliminated one line by using a `do... while` loop, instead of a `while` loop, which ensures at least one run of the outer loop and removes the need to initialize or set a value for `swaps` outside of the loop.

I eliminated another line by using `Array.prototype.forEach()` to walk the array, because it will provide both the index and the value of that index as arguments to the callback function, removing the need for a line declaring `curr` as a temporary value holder.

Is the 2019 version any faster? Dunno. Testing that feels like testing whether adding a rear spoiler will improve the 0-60 time of a minivan. Maybe, but does it matter?

I believe the 15 line version might be a *little* more readable to a beginner.

## Solution

```javascript
function bubbleSort(array) {
  let swaps = 1;
  while (swaps > 0){
    swaps = 0;
    for(let i = 0; i < array.length - 1; i++){
      if(array[i]>array[i+1]){
        let curr = array[i];
        array[i] = array[i+1];
        array[i+1] = curr;
        swaps++;
      }
    }
  }
  return array;
}
```