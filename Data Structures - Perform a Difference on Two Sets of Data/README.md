# freeCodeCamp: Data Structures - Perform a Diff on Two Sets of Data

Add a `difference` method to the growing `Set()` class from previous exercises that takes a set as an argument and returns a new set that contains the items in `this` that are not in the argument set.

## Solution Explained

I started by getting arrays containing the values of the containing set (`home`) and the visiting set (`away`), using each set's `value` method.

Then a new set to contain the diff, because that's the spec.

Walk the `home` array, using `indexOf()` to check for the presence of each element in the `away` array, adding any elements that return `-1` (no match found) to the new set with its `add()` method.

When the array-walking loop finishes, return the `diff` set.

## Solution Notes

I could have made this look fancier by using a `filter()` operation to reduce `home` to its distinct elements and chained a `map()` operation to that to put the filtered items in the new set. I decided it might degrade performance. Why?

- Filter has to run the loop, the comparison, AND an extra operation to change the array.
- Then map has to run a new loop through the resulting array. 

This runs one loop and has no array manipulation, so while seeming more simplistic and less fancy, it actually reduces unnecessary operations.

## Solution
```javascript
difference(nset){
  let home = this.values();
  let away = nset.values();
  let diff = new Set();
  for(let i = 0; i<home.length; i++){
    if(away.indexOf(home[i])===-1){
      diff.add(home[i]);
    }
  }
  return diff;
}
```