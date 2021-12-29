# freeCodeCamp: Data Structures - Perform a Subset Check on Two Sets of Data

Pass a set as an argument to an `isSubsetOf` method that tells you if all the elements in the primary set are in the submitted set (return `true`) or not (return `false`);

## Solution

This builds on the `Set()` class from prior exercises.

Get the value arrays of the two sets (`home` for containing set, `away` for visiting set).

Loop through `home` array. If any element is not in the `away` array, return `false` immediately and terminate the function. Do not pass "Go." Do not collect $200.

If the loop completes without a mismatch, return `true`.

## Solution note

This was disappointingly easy. I have a feeling some of these methods weren't to teach any new coding skills or even test them, but to help understand the most important methods of a standard `Set()` object. If so, this stuff really should have been in the `Algorithms and Data Structures` certification course, not hidden away in the interview questions collection.

Just my $.02.

## Code
```javascript
isSubsetOf(nset){
  let home = this.values();
  let away = nset.values();
  for(let i = 0; i < home.length; i++){
    if(away.indexOf(home[i]) === -1) return false
  }
  return true;
}
```