# freeCodeCamp: Data Structures - Perform a Union on Two Sets

The exercise here is to create a `union()` method that takes another set as an argument and returns a new set with the unique values in both sets.

## Solution explained

Since the [Create a Set Class](../Data%20Structures%20-%20Create%20a%20Set%20Class) contains all the code for creating the class, I'm just presenting the `union()` method below.

Essentially this just requires using the set's own `add` method to add the values from the set in the argument. And if I did that adding them with `this.add()` and returned `this`, it passed the tests. But as I thought about the wording to return a *new* set, I realized that my solution *smelled*. It would return *a* set, but it would be the set that had its `union` method used and that set would be modified.

I wasn't sure if you could create a new instance of a class within itself, but once the object that does that is created, it stands separate from the class AND the class is ostensibly complete. So why not try? And it worked.

First I create a new `Set` object, then I use `Object.assign()` to copy the dictionary by value from the current set to the new one. Then I just had to change the rest of the code to use the `add` method of the new set instead of `this`. 

After I did that, I wondered which of the two ways was most like the method in the ES6 `Set`. [The `Set` documentation at MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) doesn't have a `union` method in the `Set` object. Instead, they provide demo code to do a union.

Apparently, if you provide an existing ES6 `Set` object as an argument when you instantiate a new ES6 `Set` object, the new set is a copy of the old one and now you can add all the values to the new one.

So, while this JS `Set` is not like *the* JS `Set`, the sample `union` function at MDN did generate an entirely new `Set` object to hold the union, so this way seems to be the most correct.

## Solution
```javascript
/* Just the union method */ 
  union(nextset){
    let newset = new Set();
    Object.assign(newset.dictionary, this.dictionary)
    let merge = nextset.values();
    for(let i in merge){
      newset.add(merge[i]);
    }
    return newset;
  }
```