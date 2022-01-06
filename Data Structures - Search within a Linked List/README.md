# Data Structures - Search within a Linked List


## Solution Explained



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