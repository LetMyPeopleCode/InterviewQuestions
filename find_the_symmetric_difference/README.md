# freeCodeCamp: Find the Symmetric Difference

The concept is to find the numbers in two arrays that do not repeat in both. So `[1 , 2]` and `[2, 3]` would produce [1,3]. If you're comparing more than 2 arrays, you compare the next array (and beyond) to the result of the last comparison. So `[1 , 2]`, `[2, 3]`, and `[2, 4]` would produce `[1, 2, 3, 4]` because 2 is filtered out of the first comparison, it isn't in the set being compared to the third, so it comes back.

## Solution explained

First, the `args` argument only gives you the first array submitted as an argument. It should just be ignored. use the `arguments` object instead to get an array of all the arguments.

Second, create an array(`result`) to hold the results.

Now we run through the `arguments` array with a loop (`i`). Start by filtering duplicates from the array using the spread operator and `Set` function. 

With another loop (`j`), check each number in the filtered set to see if it appears in `return`. If it's not there, add it with `push`. If it's already there, remove it with `slice`.

The result of the first pass of the loop will add the first array to the loop in its entirety. The result of each successive pass will perform a symmetric compare between the next array (`arguments[i]`) with the `result` array.

Last, do a sort on `result` (requiring the function we pass to `result.sort()` as an argument to ensure a numeric sort) because the tests require the result to be sorted to pass.

## Solution

```javascript
function sym(args) {
  let result = [];
  for(let i in arguments){
    let filtered = [... new Set(arguments[i])];
    for(let j in filtered){
      let number = filtered[j];  
      if(result.indexOf(number) === -1){
          result.push(number);
        } else {
          result.splice(result.indexOf(number), 1);
        }
      }
    }
  result.sort(function(a, b) {
    return a - b;
  });
  return result;
}
```