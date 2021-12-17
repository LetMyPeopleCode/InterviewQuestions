# Quick Tests

This is a folder for some test scripts I wrote along the way to confirm something I thought I knew, but wasn't completely sure of.

## Scripts

### [How do JavaScript arrays get passed by default?](array-pass-reference.js)
Are arrays passed into functions by value or reference? If by reference, then operations on the array in the function will mutate it. 

I wanted to be sure my Inventory Update solution wouldn't create side effects. I recalled it was by reference, but wasn't 100% sure. 

Googled it and ran into dense discussions on the meanings of "value" and "reference." It was faster to pass a simple array and see if a function would mutate it. It did. I had proof I was right so I could justify the extra step of copying one array into a new one by value using the spread operator.
