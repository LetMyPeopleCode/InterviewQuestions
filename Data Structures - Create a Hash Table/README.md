# freeCodeCamp: Data Structures - Create a Hash Table

The hash table is much like the Map in that it's a key value store, except it hashes the keys to produce numerical indices within a specific range to improve search speed.

## Solution explained

### Kludge alert
In the beginning, I got frustrated, because I didn't really get the instruction to account for collisions. There are many ways to do that. 

The primary index can be the hash in either an array or as a property name in an object. Then the value would be a subarray of the specific hash keys and their values. Creating subarrays felt instinctively like it added complexity over using a better hashing algorithm.

So I decided to [Kirk vs. Kobayashi Maru](https://en.wikipedia.org/wiki/Kobayashi_Maru) the exercise a *teency* bit by making the hashes more unique. The hashing function adds up the character codes for each character in the key. That means any combination of those same characters will produce a colliding hash value. To keep things simple, I just multiplied the character codes by the position of the character. Now "yek" (y * 0, e * 1, k * 2) produces a different hash than "key" (k * 0, e * 1, y * 2). It's by no means perfect and could still produce collisions, but it works for the test set.

Then it became simple... each required function hashed the incoming key, then set a value for it as a property of the collection, read a value for it as a property of the collection, or deleted it as a property of the collection.

It passed their tests, but it just accounted for the collisions in their test set, not all the collisions that could still happen.

### The non-kludge(ish) solution

Then I thought back to a project from 15 years ago, where I was going to have to store a TON of files with unique file names. To make disk access simpler and faster, the directories indexed them by first two characters of the file name as a directory name, then second two characters as a subdirectory name. That gave me 1.679 million unique directory paths (which were only created as needed). It was based on research about how the file allocation tables worked and was intended to speed up file retrieval times.

So, after writing the solution above, I realized the idea of speeding up searches with the use of arrays and subarrays... or objects and subobjects... was a reasonable hypothesis.

The `add` function checks for a property of the `collection` object equal to the incoming hash. If there isn't one, it creates one and sets its value as a new empty object literal. Then it sets the key as a property name of the hash object and gives that property the requested value. I checked to see if a regular hashtable duplicated keys. It doesn't. So a repeat assignment to an existing key would overwrite the value.

The `remove` function was tricky, because it seems they're doing some inspection of the `collection` object. Emptying the object at the hash wasn't enough. If the hash object was empty, it needed to be removed as well to pass the tests. So it checks for an object with the hash value, quitting if that doesn't exist. Then it makes sure there's a value for that specific key, quitting if one doesn't exist. Then it deletes the key from the hash object. If the hash object is now empty, it deletes that too. It wasn't until I implemented the removal of the empty object that everything passed.

The `lookup` function checks for the existence of a hash object with that ID, then a property with the key value. If both exist and the value isn't `undefined`, it returns the value.

## Solution
```javascript
var called = 0;
var hash = string => {
  called++;
  var hashed = 0;
  for (var i = 0; i < string.length; i++) {
    hashed += string.charCodeAt(i);
  }
  return hashed;
};
var HashTable = function() {
  this.collection = {};
  this.add = (key, value) =>{
    let myid = hash(key);
    if(!this.collection.hasOwnProperty(myid)) this.collection[myid] = {};
    this.collection[myid][key] = value;
  }
  this.remove = (key) => {
    let myid = hash(key);
    if(!this.collection.hasOwnProperty(myid)) return null;
    let spot = this.collection[myid][key];
    if(spot == undefined) return null;
    delete this.collection[myid][key];
    if(Object.values(this.collection[myid]).length === 0) delete this.collection[myid];
  }
  this.lookup = (key) => {
    let myid = hash(key);
    if(!this.collection.hasOwnProperty(myid)) return null;
    let spot = this.collection[myid][key];
    if(spot == undefined) return null;
    return spot;  
  }
};
```