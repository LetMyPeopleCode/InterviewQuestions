# freeCodeCamp: Data Structures - Work with Nodes in a Linked List

A linked list is like an ordered array where each node is linked to the node after it. It has information on the node it links to, but nothing else. It's not aware of what node is behind it or what nodes exist beyond the one ahead of it.

## Solution explained

Normally, with something with so few lines of code, I'd simply skip it in this repo, but linked lists have a special significance for me.

When I interviewed to be a tech writer for AWS, I was asked to solve a problem using linked lists in the technical interview. As I hadn't used them before, I asked the interviewer to explain what one was. Then I worked out the logic of solving the problem based on his explanation. 

I got the job. Obviously it wasn't all down to my performance on the technical interview, but note that instead of trying to BS or getting defensive, I was simply honest that I wasn't familiar with the concept. Now, would that fly in a coding interview? I don't know. Would that have flown if we weren't both older, bearded, cis-het, white males. But I was interviewing for a role where my job would be to learn new APIs and procedures, understand how they worked, and then explain them to other people. So it's possible that my willingness to admit the gap in my knowledge and then my ability to work with the interviewer's explanation on the fly actually earned me points.

The task was to create two new nodes and then link them up with the existing sequence. That includes making sure that the last node in the prior sequence was linked to the first new node.

## Solution
```javascript
var Node = function(element) {
  this.element = element;
  this.next = null;
};
var Kitten = new Node('Kitten');
var Puppy = new Node('Puppy');

Kitten.next = Puppy;
// Only change code below this line
var Cat = new Node ('Cat');
var Dog = new Node ('Dog');
Puppy.next = Cat;
Cat.next = Dog;
```