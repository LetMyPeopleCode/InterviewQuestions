# freeCodeCamp: Data Structures - Reverse a Doubly Linked List

Finishing up the Linked List problems, this requires reversing a doubly linked list in place, adjusting the prev/next associations appropriately, and returning `null` if there are no elements to reverse.

## Solution Explained

This seemed REALLY easy. I thought: "create another doubly-linked list and spool the list in question back into it." And I would have gotten away with it too... actually, I did.

First, I wanted a length counter for convenience, so I added it. Then the list object needed an `add` method, which was not provided. For giggles, I wrote one from scratch instead of copying it from another exercise. I won't explain that logic.

Then I wrote the `reverse` method. First, I checked my lovely convenience `length` counter to return null if there are no items.

Then I created a new, empty doubly linked list inside the existing one, calling it `reversed`. 

Then I created a tracking variable called `old` to let me walk the list... backward from the `tail` object. Then a `while` loop until there was nothing in `old` (eventually `old = old.prev` would turn `old`'s value to `null` and stop the loop).

The loop adds the values from the current list to `reversed` in reverse order. The list's own `add` method creates all the new `next`/`prev` values in the proper sequence and relationship. When the loop is done, swap `reversed`'s `head` and `tail` values for the current list's and the list is reversed.

## Solution
```javascript
var DoublyLinkedList = function() {
  this.head = null;
  this.tail = null;
  // Only change code below this line
  var length = 0
  // create an add method, because I'll need it;
  this.add = (element) => {
    let piece = new Node( element, null);
    if(length === 0) {
      this.head = piece;
      this.tail = piece;
    } else {
      this.tail.next = piece;
      piece.prev = this.tail;
      this.tail = piece;
    }
    length++;
  }
  //create the reverse method
  this.reverse = () => {
    if(length === 0) return null;
    let reversed = new DoublyLinkedList();
    let old = this.tail;
    while(old){
      reversed.add(old.data);
      old = old.prev;
    }
    this.head = reversed.head;
    this.tail = reversed.tail;
  }
  // Only change code above this line
};
```