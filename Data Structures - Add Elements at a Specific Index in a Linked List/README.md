# freeCodeCamp: Data Structures - Add Elements at a Specific Index in a Linked List

Add an element to a linked list at an arbitrary location, manipulating the links to slot it in between two existing nodes (if `index` is greater than `0`) or starting/ending the list with it. Return false if the item could not be added because the index # is too big or negative and don't forget to update the list length.

## Solution Explained

The first thing I do is kick back as `false` any requests that won't fit in the list (index is negative or too small). Though it wasn't required to pass the tests, I also added a safety check that the index *is* a number. Sadly "e" compared to a number (greater than, less than, equal to) will return false, meaning a request to add a node at index "e" would get past this check... and it really shouldn't.

Next, because any other situation will require a new node and increasing the list length, I do those first. If I was feeling really assiduous, I'd put the length increase at the end and wrap the rest in a `try/catch`.

At this point there are three possible operations:
 1. **Insert at beginning** (index === 0): Put the current `head` in the `next` property of the new element, then make the new element `head`.
 2. **Insert at the end** (index === length): Because the list is zero-indexed like an array, an `index` value of 4 would get the node appended to the end of a 4-element list. As the remaining code for the list object, provided by freeCodeCamp, does not have a function for returning a specifically indexed element in the list, I have to walk the list to the final element and then place the new one in its `next` property.
 3. **Insert in the middle** (whatever's left): The past three tests (too big/small, end, beginning) have ruled out all other cases except after the first element and before the final. In this case, I walk the list to the specific index, keeping track of the node before it in a variable named `prenode`. The new node swaps in as `prenode`'s `next` and puts the node that was at that index in its `next`. 

## Solution
```javascript
this.addAt = function(index, el) {
  // test for useless indices
  if(index < 0 || index > length || typeof index !== "number") return false;
  // doing these once to avoid repeating in every if block
  length++;
  var top = new Node();
  top.element = el;
  //update list
  if(index === 0) {
    top.next = head;
    head = top;
  } else if(index === length){
    let node = head;
    while(node.next !== null){
      node = node.next;
    }
    node.next = top;
  } else {
    let count = 0;
    let node = head;
    let prenode = {};
    while(count < index){
      prenode = node;
      node = node.next;
      count ++;
    }
    top.next = node;
    prenode.next = top;
  }
}
```