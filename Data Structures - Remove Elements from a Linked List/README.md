freeCodeCamp: Data Structures - Remove Elements from a Linked List

In this exercise, we implement the removal of an element of a linked list. If the first element is being removed, the second becomes `head`. If any subsequent element is removed, the `next` property of the prior element must be adjusted so the remaining nodes aren't orphaned. Also, a proper `length` must be maintained.

## Solution explained

The first operation is to see if the `head` element matches the request. If so, we simply make the `head` element `head.next`.

If that doesn't pan out, then we walk the rest of the list. The best way to do this, IMO, is with a `do... while` loop, so every node is tested, including the last one. A `while` loop with the `next !== null` condition would quit before the last node was tested, but `do... while` doesn't test for the `next` value until *after** the node has been tested.

Manipulating `head` directly at this point becomes dangerous, so a pointer to the `head` node is assigned to a variable `b`, so b can be manipulated.

As the loop iterates each time `a` becomes the previously examined node and `b` becomes the next node in the list. If `b`'s element matches the submitted element, `b`'s `next` value becomes `a`'s `next` value, effectively removing `b` without breaking the chain, `length` is reduced by one, and the loop breaks.

**Breaking the loop is a decision I didn't take lightly.** Was the `remove` function supposed to be "greedy" (remove all instances of the incoming value) or not (just remove the first instance). I Googled that question, and I found conflicting opinions. If I break the loop, it removes the first matching element. If I let the loop continue, it would remove all matching elements. I chose to break it. 

It would be easy to implement a second argument to the method that is true/false, greedy if it's true, not greedy if it's false, and defaulting to false. But that was out of scope.

## Solution
```javascript
  this.remove = function(element){
    if(head.element === element){
      head = head.next;
      length--;
    } else {
      let b = head;
      do {
        let a = b;
        b = b.next;
        if (b.element === element) {
            a.next = b.next;
            length--;
            break;
        }
      } while (b.next !== null);
    }
  };
```