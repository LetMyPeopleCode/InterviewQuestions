# freeCodeCamp: Data Structures - Create a Stack Class

This is the first item I'm adding from the Data Structures section of the freeCodeCamp Interview Questions. Honestly, this whole section should have been a lesson in the Data Structures and Algorithms, because it has more of a lesson-like structure. It starts with a two line solution... creating a 64-byte buffer and an Int32Array from it.

This is the second item in the lesson on stacks and the first where there's more than 2 lines of code to write. It's not any great shakes. They start a stack class with a `collection` variable and a `print` method. You fill in five more methods... `push`, `pop`, `peek`, `isEmpty`, and `clear`. 

## Solution explained

Not much to explain. The functions are pretty clear.

## Solution

```javascript
function Stack() {
  var collection = [];
  this.print = function() {
    console.log(collection);
  };
  this.push = (el) => {
    collection.push(el);
  }
  this.pop = () => {
    return collection.pop();    
  }
  this.peek = () => {
    return collection[collection.length -1];
  }
  this.isEmpty = () => {
    return (collection.length === 0) ? true : false;
  }
  this.clear = () => {
    collection = [];
  }
}