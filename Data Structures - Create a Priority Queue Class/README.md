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

With `enqueue`, I set a tracking variable, `pushed` to false. Then I walk the existing collection. If we reach an element with a larger priority number, the incoming element is spliced in right before it. If there are multiple priority 1 elements and the incoming element is priority 1, it will get inserted between the last priority 1 element and the first priority 2 element. For purposes of the queue, each priority level should still be FIFO. If it's inserted, the tracking variable becomes true and the loop is broken.

If the tracking variable is still false after that, it means one of two things:

1. There is nothing in the queue with a larger priority number.
2. There's just nothing in the queue.

In either case, it can be pushed onto the end of the queue.

With `dequeue`, we're only supposed to return its value, not its priority. Same with `front`. The rest are pretty easy to figure out.

## Solution

```javascript
function PriorityQueue () {
  this.collection = [];
  this.printCollection = () => console.log(this.collection);
  this.enqueue = (el) => {
    let pushed = false;
    for(let i = 0; i < this.collection.length; i++){
      if(this.collection[i][1] > el[1]){
        this.collection.splice(i,0,el);
        pushed = true;
        break;
      }
    }
    if(!pushed) this.collection.push(el)
  }
  this.dequeue = () => this.collection.shift()[0];
  this.front = () => this.collection[0][0];
  this.isEmpty = () => (this.collection.length === 0) ? true : false;
  this.size = () => this.collection.length;
}
```