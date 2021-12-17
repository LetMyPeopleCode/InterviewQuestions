# freeCodeCamp: Algorithms - Inventory Update

We have two 2-dimensional arrays in the form of `[[count, "product1"], [count, "product2"],...]`.
The task is to compare them. Where a product exists in both arrays, add the sum of the two counts and the product name in the final array. If the item is unique to either array, add it to the final array. Return the final array, alphabetically sorted by product name.

Example: `updateInventory([[2, "Socks"], [4, "Shoes"]], [[4, "Socks], [6, "Tents"]])`

Result: `[[4, "Shoes"], [6, "Socks], [6, "Tents"]]`

## Solution explained
The first thing I did was check whether `Array.prototype.indexOf()` had an argument for looking deeper than one level. It didn't. So I created a quick function to do a 2-dimensional `indexOf()`, but highly constrained to the known format. That might cause some brittleness in the long run, but the tight coupling made sense in this case for readability and efficiency.

Next, I filled a new array (`final`) with the contents of `arr1`, because JavaScript passes arrays by reference. Before I decided to keep it, I ran [a quick test](../quickTests/array-pass-reference.js). What that means is to do this in a functional way, I had to create a copy of the array and perform my changes/adds on it to avoid mutating the incoming arrays and created unintended side effects.

Then it was simply a matter of checking if each element in `arr2` existed in `final` using the 2-dimensional `indexOf()` function. If one did, update that element in `final` with the new count. If not, add the element to it.

Then pass a comparison function to `Array.prototype.sort()` to sort the array alphabetically on the product names.

Then return `final`.


## Solution
```javascript
function updateInventory(arr1, arr2) {
    // let's not mutate the arrays - keep it functional
    let final = [...arr1];
    for(let i in arr2){
      let spot = indexOf2d(arr2[i][1], final);
      if(spot !== -1){
        final[spot] = ([final[spot][0] + arr2[i][0], arr2[i][1]]);
      } else {
        final.push(arr2[i]);
      }
  }
    final.sort(function (x, y) {
    let a = x[1].toUpperCase(),
      b = y[1].toUpperCase();
    return a === b ? 0 : a > b ? 1 : -1;
    });

    return final;
}

// 2 dimensional array indexOf (*simplified*)
function indexOf2d(str, arr1){
  for(let i in arr1){
    if(arr1[i][1] === str) return i;
  }
  return -1;
}
```
