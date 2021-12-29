# freeCodeCamp: Data Structures - Remove items from a set in ES6

The instructions in this exercise were to create a set with the values 1-5 in it, then remove 2 and 5 with it's `delete` method and return the resulting set.

## Solution Explained

The function declaration and the return statement are theirs.

First, create the initial set. I still cringe at them using the lowercase version of the class name as a variable name, but they'd had `var set = null` to correct into the proper expression.

Second, I checked the [`Set.prototype.delete` docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) at MDN. It did not appear to take multiple arguments. I tried it anyway. It didn't.

In the previous exercise, I was able to chain `add` operations, but `delete` does not support chaining. So I removed the numbers one at a time.

## Solution
```javascript
function checkSet(){
  var set = new Set([1,2,3,4,5]);
  set.delete(2);
  set.delete(5);
  return set;   
}
```