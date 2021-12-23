# freeCodeCamp - Create a Priority Queue Class

A priority queue takes an argument of an array containing two values, the item to be queued and its priority in the queue. So if the queue has a few priority two elements then gets a priority 1 element, it goes to the front of the queue.

Their instructions...
> You will need to add an enqueue method for adding items with a priority, a dequeue method for removing and returning items, a size method to return the number of items in the queue, a front method to return the element at the front of the queue, and finally an isEmpty method that will return true if the queue is empty or false if it is not.
>
> The enqueue should accept items with the format shown above (['human', 1]) where 1 represents the priority. dequeue and front should return only the item's name, not its priority.

## Solution explained

First, after multiple exercises in which they made the collection a "private" variable of the function, they made it public by initializing and using it as `this.collection`. That makes it an accessible property of the priority queue object, which could cause side effects. The `enqueue`, `dequeue`, `size`, and `front` methods are setters and getters. They're there for a reason.

That gripe aside, it also screwed me up because I didn't notice that shift, wrote the whole thing with just `collection` and it failed ALL the functional tests.

First I changed their `printCollection` function to a fat arrow function for more consistency.

With `enqueue`, I set a variable for the length of the array, because it's used a LOT.

First check if the queue is empty or the priority number of the incoming element is greater than or equal to the priority number of the final element in the queue. If either is true, we can save some time, pop it on the end, and end the function.

If the function's still going, walk the array until we find an element with a priority number that's bigger than the one in the incoming element, then insert the incoming element right before it.

With `dequeue`, we're only supposed to return its value, not its priority. Same with `front`. The rest are pretty easy to figure out.

## Solution

```javascript
function PriorityQueue () {
  this.collection = [];
  this.printCollection = () => console.log(this.collection);
  this.enqueue = (el) => {
    let len = this.collection.length;
    if(len == 0 || this.collection[len-1][1] <= el[1]){
      console.log("first or biggest", this.collection, el)
      this.collection.push(el);
      return undefined;
    }
    for(let i = 0; i < len; i++){
      if(this.collection[i][1] > el[1]){
        this.collection.splice(i,0,el);
        break;
      }
    }
  }
  this.dequeue = () => this.collection.shift()[0];
  this.front = () => this.collection[0][0];
  this.isEmpty = () => (this.collection.length === 0) ? true : false;
  this.size = () => this.collection.length;
}
```