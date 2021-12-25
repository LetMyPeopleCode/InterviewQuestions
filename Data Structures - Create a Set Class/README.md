
# freeCodeCamp: Data Structures - Create a Set Class

"A set is like an array, but it cannot contain duplicate values." This class is supposed to simulate the ES6 `Set` object and the problem is to solve three methods:

- `add()`: add the value if it's not in the set and return true OR return false if it's already there.
- `remove()`: check if the value is in the set and remove it if so, returning true if it was removed, but false if it wasn't there.
- `size():` return the number of elements.

## Solution explained

First, I was a little miffed that they wrote the constructor poorly and I wasn't supposed to modify it. Why do I say poorly, because in the example of how the ES6 `Set` object, it takes an argument of an array of values and distributes them appropriately in the set. I was just disappointed that their "only code above/below this line" indicators did not ask or technically allow me to write a value distributor in the constructor. 

Because they provide the `this.dictionary` object and the `has()` method checks for a property with the same name as the value, I discerned I was supposed to use it to store incoming values as property names. I checked the [documentation for Javascript object `property accessors`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors) to make sure I could use numbers (like in their example). I could so long as they were characters in a string and not a `number` type.

At that point, the "add" seemed simple. Check for existence of a property with the same name as the incoming value using the object's `hasOwnProperty()` method. If it's there, return false. If not, create a property named with the value. 

But the property had to have a value. I just put in `true`. When I tested the `values()` method I saw that I wasn't showing the values I'd added as property names. I was showing the values I'd assigned to the property names. So I changed the assignment to have the submitted value on both sides (basically `this.dictionary['a'] = 'a'`).

The `remove` was a simple variation on `add`, but instead of adding the property, it got deleted.

Before I noticed the `this.length` variable in the constructor, I used this method to return the length.
> And the `size` used `Object.entries()` to get an array of *added* properties and returned its length.

But then I added code in the `add` and `remove` to increment and decrement `this.length` and updated the `size` method. I didn't do this to make my solution like their's. I thought about it and decided that returning a value from a property was less computationally intense than getting an array of all added values and then returning its length, and while it might add a smidge more to the computational weight of the `add` and `remove` methods, it was likely more efficient overall.

## Solution

```javascript
class Set {
/* THEIR code */
  constructor() {
    // Dictionary will hold the items of our set
    this.dictionary = {};
    this.length = 0;
  }

  // This method will check for the presence of an element and return true or false
  has(element) {
    return this.dictionary[element] !== undefined;
  }

  // This method will return all the values in the set
  values() {
    return Object.values(this.dictionary);
  }

/* MY code */
  add(val){
    if(this.dictionary.hasOwnProperty(val)) return false;
    this.dictionary[val.toString()] = val;
    this.length++;
    return true;
  }

  remove(val){
    if(this.dictionary.hasOwnProperty(val)){
      delete this.dictionary[val.toString()];
      this.length--;
      return true;
    }
    return false;
  }

  size(){
    return this.length;
  }
}
```