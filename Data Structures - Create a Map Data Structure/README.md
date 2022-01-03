# freeCodeCamp: Data Structures - Create a Map Data Structure

Beginning the section to cover maps and hash tables. Maps are Key->Value pairs for easy lookup.

In this exercise, we use a JavaScript object literal (`this.collection`) as our datastore for the items. The assignment tasks us with creating add, remove, get, has, values, size, and clear methods.

## Solution Explained

I started with a simple function to implement `add()`.

```javascript
var Map = function() {
  this.collection = {};
  this.add = (key, value) => {this.collection[key] = value;};
};

let b = new Map();
b.add("foo","bar");
console.log(b.collection.foo);
```

This worked, but note that I was able to use `b.collection.<key>` to get the value. That's because `collection` is not a "private" variable and it's where the actual values are stored. One of the reasons for creating all the methods is to keep people from trying/needing to access the `collection` object directly. But it's better if it's created as a private variable, so the collection object cannot be manipulated directly from outside the `Map` object.

The simplest way to do that is to remove `this.` from definining it and declare it with `let`. But then you have NO visibility into the object without a `get()` method. That's as easy as adding a line.

```javascriptlet
var Map = function() {
  let collection = {};
  this.add = (key, value) => {collection[key] = value};
  this.get = (key) => collection[key];
};

let b = new Map();
console.log(b.add("foo","bar"));
console.log(b.get("foo"));
```

I'll finish up the rest without adding the growing code here. Every operation is a one-line function. With fat-arrow functions, if you wrap the operation in curly braces, it returns `undefined` and performs the action. If you don't, it returns the result of the operation. Thus write operations get wrapped, but read operations don't.

`remove` uses the `delete` operator to remove the property instead of just assigning it a value of undefined or null, because those will leave the property.

`has` uses the collection object's built-in `hasOwnProperty()` method. **This is a security problem**, though, because there are no safeguards in the class to prevent methods like that from being overwritten as a key->value pair with the `add` method. That could then be exploited to potentially crash an app using this.

`clear` just overwrites the old `collection` object with a new one.

`values` and `size` both use the `Object.values` method to get an array of the values and pass it back with either the array of values or its length.

## Solution note

The next exercise (which I skip in this collection) is to create an ES6 Map object. One of the stupid things they do in this exercise is have us use `add` to add values, while the ES6 convention is to use `set`.

## Solution
```javascript
var Map = function() {
  let collection = {};
  this.add = (key, value) => {collection[key] = value;};
  this.get = (key) =>  collection[key];
  this.remove = (key) => {delete collection[key];};
  this.has = (key) => collection.hasOwnProperty(key);
  this.clear = () => {collection = {};};
  this.values = () => Object.values(collection);
  this.size = () => Object.values(collection).length;
};
```