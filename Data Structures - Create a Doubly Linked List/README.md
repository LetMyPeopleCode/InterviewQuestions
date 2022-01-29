# freeCodeCamp: Data Structures - Create a Doubly Linked List

This takes the linked list up a level and adds linking backward and forward with `head` and `tail` objects for the list, and `prev` and `next` properties in each node, so it can be iterated through from either side.

This adds complexity when adding or removing nodes, because you have to keep track of more connections.

## Solution Explained

I included the whole code from the exercise window, because if you're reading this without reading that, it's not going to be clear how nodes are defined.

First I create a "private" `length` variable for convenience. Also, if it's important to track in a singly linked list, it should be doubly important in a doubly linked list. Okay, maybe not that important, but I couldn't resist a bad pun and it is useful as a shortcut.

For adding, the only major consideration is if it's the first element. If it is, it gets added as the `head` node and has null for `prev` and `next`. Otherwise, walk to the end, set the last node as its `prev` and set it as the last node's `next`. And in all cases the new node becomes the `tail` node. Then increase the length.

For removing, it's a bit more complex, because this requires removing by value, not index, and ALL instances of the value are removed. The value could be at the start, middle, or end of the list. each location requiring slightly different handling.

First, the `remove` function checks if the list even has any elements using the lovely private `length` variable. If it doesn't, it returns `null`.

Next, it sets a variable `list` to the `head` object and starts walking the list to see if the value is there. It *could* start from the `tail` and walk backward, but that's not required and doing it that way might be more confusing to read.

This uses a `while(list)` loop, because when `list.next` is `null` and `list` is advanced to it, it will stop, but it runs all the way from the head element to the tail element.

First it checks if the `element` value matches the `data` value of the node. 

> You might have noticed in their prior singly link lists exercises, they used `element` for the node value property, but in this one they use `data`. That's a minor inconsistency, but one you'd want to avoid if you could. If you're using two different property names in two different objects to refer to the same thing, it can be confusing to whomever inherits your code. 

If the value matches, it has three different methods for handling it:
 1. **It's the head node** (`list.prev === null`): Make the `head` node's `next` value the `head` node. While the tests don't test for this, I also check whether that empties the list. If it doesn't, make the new `head` node's `prev` value `null`. If it does, make the list's `tail` value `null` too.

 2. **It's the tail node** (`list.next === null`): This removes the node by making the previous node's `next` node `null` and assigns the previous node to `tail`. It doesn't need to worry about the prior node's `prev` value, because thanks to `else if`, it isn't the `head` node.

 3. **It's not the head or tail node** (anything else): Simply splices the node out by assigning it's `prev` to the `next` element's `prev` and assigning it's `next` to the previous element's `next`.

## Solution
```javascript
var Node = function(data, prev) {
  this.data = data;
  this.prev = prev;
  this.next = null;
};
var DoublyLinkedList = function() {
  this.head = null;
  this.tail = null;
  // Only change code below this line
  var length = 0;

  this.add = (element) => {
    let node = new Node(element, null);
    if(length === 0) {
      this.head = node;
    } else {
      let list = this.head;
      while(list.next !== null) {
        list = list.next;
      }
      node.prev = list;
      list.next = node;
    }
    this.tail = node;
    length++;
  }

  this.remove = (element) => {
    if(length === 0) return null;
    let list = this.head;
    while(list){
      if(list.data === element){
        console.log(list, this.head, this.tail, element)
        length--;
        if(list.prev === null){ // meaning this is the head
          this.head = list.next;
          if (this.head !== null) {
            this.head.prev = null;
          } else {
            this.tail = null;
          }
        } else if(list.next === null) { // meaning this is the tail 
          list.prev.next = null;
          this.tail = list.prev
        } else {
          list.next.prev = list.prev;
          list.prev.next = list.next
        }
      }
    list = list.next;
    }
  }
  // Only change code above this line
};
```