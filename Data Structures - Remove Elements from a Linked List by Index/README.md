# freeCodeCamp: Data Structures - Remove Elements from a Linked List by Index

Unlike the prior exercise to remove by element value, this removes by index. It must...
 - Return the element from the removed node (if there is one).
 - Reduce the length by one if a node is removed.
 - Return `null` if the index is "either negative or greater than or equal to the length"

## Solution explained

The last bullet above was a bit of a gimme. They could just have said to return `null` if the index value was out of range, but they basically give you the comparison factors for an out-of-range value.

Also, they suggest tracking a `currentIndex` value to know where you are in the list and they even remind you to keep count with it at the end of the instructions. Guess what? That value is going to be function scoped and their tests don't track it. It's also *not necessary*.

First, the function checks if the index value is 0. If so, it copies the element value, replaces `head` with its `next` value, reduces `length` by one, and returns the copied element. This covers multiple test cases because it handles a single-node list as well as replacing the 0 node in a multi-node list. Since `head.next` is `null` in a single-node list, replacing `head` with it and reducing `length` by one effectively resets the list.

Second, it checks if the value is out of range and returns `null` if it is. I could potentially make this function slightly more efficient by making that the first check.

Third, if neither of those ran, it's been established that `index` is not 0 nor out of range. Variables are created to hold the current and previous node and the `for` loop walks those variables `index` steps up from `head`. When the loop finishes, the node at the index is in `b` and it's prior node is in `past`. `b.next` is assigned to `past.next`, effectively cutting `b` out of the list. The `length` is reduced by one, and since the removed node is still referenced in `b`, `b.element` can be returned. `b` won't be cleared of that orphaned node object until the function completes and releases `b` for garbage collection. 

## Solution
```javascript
  this.removeAt = (index) => {
    if(index === 0){
      let el = head.element;
      head = head.next;
      length--;
      return el;
    } else if (index < 0 || index >= length){
      return null;
    } else {
      let b = head;
      let past;
      for(var i = 0; i < index; i++){
        past = b;
        b = b.next;
      }
      past.next = b.next;
      length--;
      return(b.element)
    }
  }
```