# freeCodeCamp: Data Structures - Create a Queue Class

This is a simple queueing class. Queues operate on a FIFO method and are useful for being able to take in information or instructions as they come, then process them as capability is available. It's important enough in programming that one of Amazon's earliest AWS services was SQS (Simple Queue Service).

Rather than manipulating an array directly, the class creates the array as its private variable and then you manipulate the array through the queue-flavored class methods. 

As in the stack class, you get the bare bones of the private array and a `print` function. You must add `enqueue`, `dequeue`, `front`, `size`, and `isEmpty` methods.

## Solution explained

The methods are pretty simple. We `push` on new items at the end to `enqueue` and `shift` off items from the front to `dequeue`. The code shouldn't be hard to read.

## Solution

```javascript
function Queue() {
  var collection = [];
  this.print = function() {
    console.log(collection);
  };
  this.enqueue = (el) => {
    collection.push(el);
  }
  this.dequeue = () => {
    return collection.shift();
  }
  this.front = () =>{
    return collection[0];
  }
  this.size = () => {
    return collection.length
  }
  this.isEmpty = () => {
    return (collection.length === 0) ? true : false;
  }
}
```