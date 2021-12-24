# freeCodeCamp: Data Structures - Create a Circular Queue

A circular queue allows you to specify a size for easier memory management. It's initialized with a set number of slots. Each write operation fills a slot, each read operation empties a slot. And the slots get used in a round-robin order. If there are four slots, it goes 0, 1, 2, 3, 4, 0, 1, 2... It loops around to the beginning when it hits the end.

The rules of this exercise were that data couldn't be overwritten, so if the queue is full, data must be read to make room. If there's no data to read or no free slots to fill, the en/dequeue operation should return `null`.

## Solution explained

The exercise only permitted/required writing the `enqueue` and `dequeue` functions. I actually had to run it with some console.log statements to see what format the incoming data would use. It was just numbers.

It also helped to think of this as a buffer for streaming, like their description text suggested.

The functions were really very similar. 
 - Check to see if the space was open (`enqueue`) or full (`dequeue`).
 - If so: 
   - Write or read the data as needed.
   - If a read operation, purge the data in the space.
   - Increment the write/read head, wrapping at the end.
 - If not:
   - return `null`

That passed the tests.

## Solution
```javascript
class CircularQueue {
  constructor(size) {

    this.queue = [];
    this.read = 0;
    this.write = 0;
    this.max = size - 1;

    while (size > 0) {
      this.queue.push(null);
      size--;
    }
  }

  print() {
    return this.queue;
  }

  enqueue(item) {
    if(this.queue[this.write] === null){
      this.queue[this.write] = item;
      this.write++;
      if(this.write > this.max) this.write = 0;
      return item;
    }
    return null;
  }

  dequeue() {
    if(this.queue[this.read] !== null){
      let item = this.queue[this.read];
      this.queue[this.read] = null;
      this.read++;
      if(this.read > this.max) this.read = 0;
      return item;
    }
    return null;
  }
}
```