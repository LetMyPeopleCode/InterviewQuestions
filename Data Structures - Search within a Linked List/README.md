# Data Structures - Search within a Linked List

In this exercise, the task is to add three methods to the linked list class to examine the contents.
 - `isEmpty()` - Does the list have any nodes. True if so, otherwise false.
 - `indexOf()` - Where does this element exist in the list? Index # if it does, -1 if it doesn't.
 - `elementAt()` - What value is at this index? Value if there is one, undefined if not.

## Solution Explained
`isEmpty()` was easy. It just returns a ternary. If `head` equals `null`, it's empty, otherwise not.

`indexOf()` sets a `count` variable to 0 and a `current` variable to `head`. As long as the `current.element` value doesn't match the submitted value *and* the `current.next` value isn't null, it keeps incrementing the counter and stepping to the next node.

The `while` loop ends when `current` has a matching element or it's the last node. It then uses a ternary operator to determine if it should return the count variable (which will be the index if matched) or -1 (which will mean it reached the last node with no match). This took a bit because I was messing with comparing `count` to `length`, but then I had to remove the `current.next` check from the `while` loop conditions and put it inside the loop (after incrementing the count) to break the loop when it hit the end. While the `current.element` check in the ternary feels redundant, it saves a line of code and adds no operations.

For `elementAt`, the trick was remembering that the middle condition of the loop declaration had to evaluate to true for the loop to run, not to end. So I initially made the mistake of making the middle condition `i == index`. Don't know why. Brain fart, I guess.

First it checks if the requested index is out of range. If so, it returns `undefined` immediately. Then if index is 0, it returns the `head` element and quits. If it hasn't quit yet, it walks down the nodes `index` more times, then returns the element there.

## Solution
```javascript
  this.isEmpty = () => (head === null) ? true:false
  
  this.indexOf = (el) => {
    let count = 0;
    let current = head;
    while(current.element !== el && current.next !==null){
      count++;
      current = current.next;
    }
    return(current.element === el) ? count : -1;
  }
  
  this.elementAt = (index) => {
    if(index + 1 > length) return undefined;
    if(index === 0) return head.element
    let current = head;
    for(let i = 0; i < index; i++){
      current = current.next
    }
    return current.element;
  }