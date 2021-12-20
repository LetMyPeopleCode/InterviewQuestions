# freeCodeCamp: Algorithms - Implement Selection Sort

A selection sort starts with the first value in a list, then finds the smallest value in the *rest* of the list. If that smallest value is smaller than the first value, it swaps them. It continues on down the list, swapping values where applicable. When it reaches the end, the list is sorted.  

## Solution Explained

This time I start the outer loop with `Array.prototype.forEach()` and everything but the return statement is part of the callback function for it.

I initialize a separate variable, `swapper`, to hold the index of the lowest value in this sweep and I set its value to the index.

The interior loop goes from the next value in the array to the last. If the value at index `i` is less than the value at index `swapper`, the value of i is assigned to `swapper`.

After the run of the interior loop, if a lower value was encountered (`swapper !== index`), the values at `index` and `swapper` are swapped.

When the `forEach` loop is done, the array is sorted.

## Solution notes

I just want to gripe a moment. I do not like using `array` as a variable/argument name, since `Array` is an object type and basically a class (i.e. `let f = new Array()`). But freeCodeCamp sticks you with it. An accidental assignment to `Array` instead of `array` could cause problems. I don't think you should use the lowercase name for any data type as a variable name. But that's just my opinion.

## Solution
```javascript
function selectionSort(array) {
  array.forEach((value, index)=>{
    let swapper = index;
    for(let i = index+1; i < array.length; i++){
      if (array[i] < array[swapper]) {
        swapper = i;
      }
    }
    if(swapper !== index){
      array[index] = array[swapper];
      array[swapper] = value;
    }
  });
  return array;
}
```