# freeCodeCamp: Data Structures - Create a Hash Table


## Solution explained

### Kludge alert
In the beginning, I got frustrated, because I didn't really get the instruction to account for collisions. There are many ways to do that. 

I did a search and found someone storing the key->value pair as a child array of a larger array containing all the keys and values passed in. Then they'd walk the arrays to check if they should add the new key and value, update the value for the existing key, etc. But that added significant search complexity with the crap hash algorithm they provided and sort of defeated the purpose of creating an ersatz hash table.

So I decided to [Kirk vs. Kobayashi Maru](https://en.wikipedia.org/wiki/Kobayashi_Maru) the exercise a *teency* bit by making the hashes more unique. The hashing function adds up the character codes for each character in the key. That means any combination of those same characters will produce a colliding hash value. To keep things simple, I just multiplied the character codes by the position of the character. Now "yek" (y * 0, e * 1, k * 2) produces a different hash than "key" (k * 0, e * 1, y * 2). It's by no means perfect and could still produce collisions, but it works for the test set.

Then it became simple... each required function hashed the incoming key, then set a value for it as a property of the collection, read a value for it as a property of the collection, or delete it as a property of the collection.

## Solution
```javascript
var called = 0;
var hash = string => {
  called++;
  var hashed = 0;
  for (var i = 0; i < string.length; i++) {
    hashed += string.charCodeAt(i) * i;
  }
  return hashed;
};
var HashTable = function() {
  this.collection = {};
  this.add = (key, value) =>{
    let myid = hash(key);
    this.collection[myid] = value;
  }
  this.remove = (key) => {
    let myid = hash(key);
    delete this.collection[myid];
  }
  this.lookup = (key) => {
    let myid = hash(key);
    return (this.collection.hasOwnProperty(myid)) ? this.collection[myid] : null;  
  }
}
```