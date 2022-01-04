# freeCodeCamp: Data Structures - Create a Linked List Class

This starts a linked list class and then asks you to create an `add` method that keeps in mind the `length` and `head` properties of the object the class creates as well as the `next` value of the nodes stored within it.

## A wrong solution that passed

The first thing that occurred to me was: "Where the heck am I supposed to store the nodes???" 

Two options occurred: use an array or a hash table. I used an array and everything worked out, tests passed. 

What didn't occur to me was that the `head` node was the storage and each node stored its `next` neighbor, both in a correct solution AND in this one.

```javascript
 this.add = function(element){
    // Only change code below this line
    if(this.store === undefined) this.store = [];
    let temp = new Node(element);
    this.store.push(temp);
    if(length === 0){
      head = this.store[0];
    } else {
      this.store[length-1].next = this.store[length]
    }
    length++;
    // Only change code above this line
  };
```

I'm creating the node (and the array if it doesn't exist), putting it in the array, then pulling it back out of the array to be the `next` value of the prior node (if there is a prior node). The funny thing is that the list would remain intact even if I clobbered the array, because the `node` objects are passed by reference, not value. 

What does that mean? Passing by reference means when I put a node into the `next` property, I'm not copying it out of the array, nor am I passing its location in the array, but I'm storing the node object's location in memory, so even if the order of the array changes or the array itself is clobbered, the node still exists in the `next` property of the parent object.

Quick demo of how that works...

```javascript
let f = [];
f.push({"help": "me"});
let b = f[0];
console.log(b)
f = null;
console.log(b)
```

The object still exists because it's still assigned to a variable (`b`) keeping the garbage collector from removing it. So in my solution, the array is absolutely pointless except as a cheat to reference the order of the nodes. It also means I'm creating a whole mess and adding complexity to future management of the list if I keep using it for that purpose.

## Solution explained

The one thing the array did was make it faster/easier to find the last node based on the size variable. But, as I said, that was a bit of a cheat.

In the updated version, we still create a new node from the element and make it the `head` if there isn't one.

If there is a `head` node, we iterate through its children to find the last one. Because it doesn't have a built-in iterator, we construct it with the `while` loop. When it finds the node with `null` as its `next` value, it puts the newly created node in that node's `next` property. Then, regardless of where the node was placed, the list length is increased by 1.

And that also passes. It also doesn't require me to update parts of future exercises to implement an unnecessary array which would also need to be manipulated for `remove` operations.

## Solution
```javascript
  this.add = function(element){
    // Only change code below this line
    let node = new Node(element);
    if(head === null){
      head = node;
    } else {
      let b = head;
      while(b.next !== null){
        b = b.next;
      }
      b.next = node;
    }
    length++;
    // Only change code above this line
  };
```