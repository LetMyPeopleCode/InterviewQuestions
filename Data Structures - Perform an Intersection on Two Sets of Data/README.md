# freeCodeCamp: Data Structures - Perform an Intersection on Two Sets of Data

This time, instead of combining two sets into a new set, the task is to create a new set containing the matching values in two sets. This builds on all the set-related exercises and only requires writing one function to add to the functions written in previous exercises.

## Solution explained

Get the values in the incoming set.

Create a new set to store the matches.

Walk the values of the incoming set, comparing them to the existing dictionary using `Object.prototype.hasOwnProperty()`. If they match, use the `add()` function to put them in the `matches` set.

Return the `matches` set.

## Notes

This annoyed me for one reason. They never specified the returned value had to be a set, just a "collection," and the written example of how it should work showed the result as an array. So I originally had `matches` as an array and `push`ed the matching values onto it.

The tests failed and it wasn't obvious why. I checked the forums and found someone discussing their issue, which they fixed by returning `setname` instead of `setname.values()` (which would be an array). So that implied a set needed to be returned. The fix was simple... change `[]` to `new Set()` for initializing `matches` and change `push` to `add` for adding the matches to it. 

The instructions should have been clear that the function should return a set object, not an array object.

## Solution
```javascript
  intersection(newset){
    let vals = newset.values();
    let matches = new Set();
    for(let i in vals){
      if(this.dictionary.hasOwnProperty(vals[i])) matches.add(vals[i]);
    }
    return matches;
  }
```