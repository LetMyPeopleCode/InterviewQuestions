# freeCodeCamp: No Repeats Please

You get a string like `"aab"` and have to find all the possible combinations, then remove all the combinations where two characters repeat. The trick is the statement "assume that all characters in the provided string are unique." That means you have to treat every character as a unique token and base your answer on a set with every possible permutation of those tokens, even if some permutations repeat.

Then from that set provide the number of strings without consecutively repeated characters, even if the strings themselves repeat. So for `aab`, there are 6 permutations: `aab, aab, aba, aba, baa, baa`, the only ones without consecutively repeating characters are `aba` and `aba`, so the answer is 2.

## Solution explained

I broke it into two functions for manageability, one to generate a set of all combinations, then one to compare them.

The one that generates all the combos is `allcombos()` and uses recursion. I'll admit that I had to look up someone else's answer on how to generate the set, but by describing it, I'm hoping I'm not only helping someone else understand what's going on, but helping myself. 

So let's walk through the progress of `allcombos()` with the simple string of `aab`. I'll represent the letters as A(1), A(2), and B.

- We start our first loop iteration with `A(1)` as `first` and `A(2)B` as `rest`.
  - `A(2)B` gets sent to `allcombos()`.
    - `A(2)` becomes `first`, `B` becomes `rest`.
      - `B` gets sent to `allcombos()`
      - `B` gets returned (because it's less than 2 in length)
    - `A(2)`+`B` gets pushed to `full_set` in the `A(2)B` loop's scope. `full_set` == `['A(2)B']`.
    - Loop iterates and `B` becomes `first`, `A(2)` becomes `rest`.
      - `A(2)` gets sent to `allcombos()`
      - `A(2)` gets returned (because it's less than 2 in length)
    - `B` + `A(2)` gets pushed to `full_set` in the `A(2)B` loop's scope. `full_set` == `['A(2)B', 'BA(2)]`.
  - In the top level loop's scope `A(1)` + `A(2)B` and `A(1)` + `BA(2)` get pushed to `full_set`. `full_set` == `['A(1)A(2)B', 'A(1)BA(2)]`
- We start our second loop iteration with `B` as `first` and `A(1)A(2)` as `rest`.
- ...

I'm not a natural at recursion, so it was a little difficult to wrap my head around and still sort of is, but there you have it.

Once we have the full set, then we just loop through the combos and loop through each combo's letters comparing each to the one before it. For a string of length `n`, there are `n-1` comparisons, since the first letter has nothing before it.
```text
str[1] == str[0]
str[2] == str[1] 
```

If either one of these matches is true, move onto the next string. If none are, increment the count of qualifying strings by one. For the six strings in `aab`'s permutations, the counts are:

- On the two instances of `aab` it matches on the first comparison, stops checking, and nothing's added to the count (0 qualifying, 2 comparisons). 
- On the two of `aba`, neither of the two comparisons match and one is added to the count for each (2 qualifying, 4 comparisons). 
- On the two of `baa`, the match happens on the second comparison and zero is added to the count (0 qualifying, 4 comparisons)

For a total of 2 qualifying and 10 comparisons.

I probably need a buddy-edit as a sanity check to see if all that makes sense to anyone but me.

## Solution

```javascript
function allcombos(str){
  if (str.length < 2 ) return str

  let full_set = [] 
    
  for (let i = 0; i < str.length; i++){
    let first = str[i]
    let rest = str.slice(0, i) + str.slice(i + 1, str.length)
    for (let index of allcombos(rest)){
      full_set.push(first + index) 
    }
  }
  return full_set
}

function permAlone(str) {
  let full = allcombos(str);
  let final = 0;
  for(let i in full){
    let isgood = true;
    for(let j = 1; j < full[i].length; j++){
      if(full[i][j] === full[i][j-1]){
        isgood = false;
        break;
      }
    }
    if (isgood) final++;
  }
  return final;
}
```