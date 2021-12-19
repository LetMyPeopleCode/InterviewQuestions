# freeCodeCamp: Rosetta Code - 24 game

The game is to take a string of 4 digits and determine how to make them total up to 24 using plus, minus, times, divide, and parentheses. People play this game sort of like Sudoku as a mental exercise.

The code should return a solution or "no solution exists."

### Note:

In their list of test values and what they should return, it says:

> `solve24("4878")` should return `(7-8/8)*4` or `4*(7-8/8)`

There are more possible results than those two and my solution returns one that's different. I was afraid it would fail the tests, but the test accepts any expression that evaluates to 24, not just the two listed. I noted that test condition could be worded better, because it caused me some anxiety before I just went ahead and ran the tests anyway.

## Solution explained

Wow, did this take a while. First I had to figure out the logic of how it would work in broad strokes, then the logic of how to implement the broad strokes.

I thought "there must be some elegant way of solving this without brute force." I looked for a formula, but just saw a bunch of brute force solutions. I tried not to read them and copy them, though. If this was going to require brute force, so be it, but I had to work out how to do that.

### How to brute force it

The first task was to create a set of all the possible combinations of the numbers. For that, I was able to borrow the `allCombos()` function from the [No Repeats Please](../Algorithms%20-%20No%20Repeats%20Please) exercise. They're not kidding that the exercises can build upon each other. 

Building a set of all the different possible combos of operations was different, because any of the operators could repeat and the number of operators was dependent on the length of the string. I banged my head against trying to do it as nested loops for an hour before I gave up and wrote a recursive function to do it. It was funny because the recursive function (`opsCombos()`) was pretty easy to write once I decided to do it that way.

Last, we needed a way to apply all the possible parentheses positions. I was tired and had written most of the code by this time, so I just calculated the possible positions for a 4-digit string by hand and made an array of them.

### Let's walk the code

First, I split the incoming string into an array of its component numbers and sanitize it by casting each character to an integer. While it's in that state, I also test it with all plus operators and all times operators since those will return the same result no matter the order of the numbers.

Any string of digits that will hit one of those two ways returns the answer immediately and exits. So "1234" or "6114" or "4569" will return a result super fast.

I run a function to generate all the possible sets of operations (`opsCombos()`). It was easiest (to my mind at the time) to pass the function an array to add them to rather than returning the array, but I believe on further reflection I'll realize it was a kludge.

I insert the array of possible parentheses locations. If this was generating the set dynamically based on the length of the input string, that would require another function AND a more complex method for applying them. 

Then create the set of all possible combinations of the numbers in the string (`allCombos()`).

Next I loop through the number combos, sending them to `makeExpr()` along with the operations set and the set of parentheses locations.

### How `makeExpr()` works

In a 4-digit string, there are 24 possible combos (4 * 3 * 2 * 1), so this will run up to 24 times.

Once called, it takes the 4 digit string, and starts looping through the sets of operators ('+++', '++-'...). It creates a new string by iteratively adding the first number + the first operator, then the second, etc.

That string is evaluated as an expression. If it doesn't return 24, the 6 possible parentheses positions are looped through, applied by slicing up the expression and constructing a new expression with parentheses around the slices. Each of those is tested after it's created.

If any expression (with or without parentheses) evaluates to 24, it's returned to the main function. If none work for any of the 384 possible expressions (64 operator sets * 6 parentheses sets), it returns "none".

If an expression is returned, the main function returns it. If "none" is returned, the main function loop iterates and another of the 24 variations is sent to `makeExpr()`.

If all 24 are tried and no expression has been returned, the "no solution exists" result is returned.

## Interesting notes

### Bigger strings work

Although this does not dynamically generate all the possible positions of parentheses for strings larger than four characters, it's possible to get results for *some* strings longer than 4 digits.

`12340` returns `(1+2+3)*4+0`
`11156` returns `(1+1)*(1+5+6)`
`11156111` returns `(1+1+1)*5+6+1+1+1`

While it doesn't evaluate all the possible parenthetical placements, it is able to solve a number of larger strings with the ones it knows how to apply.

### Something to try

This could also be rigged to return all the possible solutions. In its current state, it returns the first one that works, but it does so to maximize speed. Once a solution is known, why go through ALL the remaining possible combinations. But if speed were not a concern, it could generate and return them all.

That said, freeCodeCamp has a limiter on the functions. If it's taking too long to brute force the result (more than about 5 or 6 seconds), it will return a timeout error. You can see that by using `1111111`. I don't know if that's dependent on the speed of the system on which you're running the browser or the JS interpreter (like V8 vs SpiderMonkey), but that's the behavior on mine.

### How I could speed it up more

At first blush, it seems I could rewrite the `allCombos` function to test a variant as soon as it's composed. While four digits only have 24 possible variants, five have 120, six have 720, seven have 5040. The longer the string, the longer it takes just to compose our sets of possible digit combos.

## Solution

```javascript
function solve24 (numStr) {
  //split string for quick tests AND to sanitize into ints *only*
  let nums = numStr.split('').map(x => parseInt(x));
  // quick tests
  if (nums.reduce((val, cur)=> val + cur) == 24) return nums.join('+');
  if (nums.reduce((val, cur)=> val * cur) == 24) return nums.join('*');
  // nope, lets continue and build a set of all the possible operations
  let opsSet = [];
  opsCombos(numStr.length - 1, ["+","-","*","/"], opsSet);
  // too tired to make a non-brittle parens set - only works for 4 char num strings
  let parens = [[0,4],[2,6],[4,8],[0,6],[2,8],''];
  //join nums and get full set of num combos
  nums = allCombos(nums.join(''))
  for(let i in nums){
    let res = makeExpr(nums[i],opsSet,parens);
    if(res !== "none") return res;
  }
  return "no solution exists";
}

function makeExpr(str,ops,parens = []){
  for(let i in ops){
    let expr = "";
    for(let x = 0; x < str.length; x++){
      expr += str[x] + ((ops[i][x] !== undefined) ? ops[i][x] : "");
    }
    if(eval(expr) === 24) return expr;
    if(/\*/.test(expr)||/\//.test(expr)){
      for(let z = 0; z < parens.length; z++){
        let newexp;
        if(parens[z] === ''){
          newexp = "(" + expr.slice(0,3) + ")" + expr.slice(3,4) + "(" + expr.slice(4) + ")";
        } else {
          newexp = expr.slice(0, parens[z][0]) + "(" + expr.slice(parens[z][0], parens[z][1]-1) + ")" + expr.slice(parens[z][1]-1);
        }
        if(eval(newexp) === 24) return newexp;
      }
    }
  }
  return "none"
}


function allCombos(str){
  //borrowed from Algorithms: No Repeats Please
  if (str.length < 2 ) return str
  let full_set = [] 
  for (let i = 0; i < str.length; i++){
    let first = str[i]
    let rest = str.slice(0, i) + str.slice(i + 1, str.length)
    for (let index of allCombos(rest)){
      full_set.push(first + index) 
    }
  }
  return full_set
}

function opsCombos(num, ops, result, str = ""){
  for(let i = 0; i < ops.length; i++){
    let temp = str + ops[i];
    if(temp.length === num){
      result.push(temp)
    } else {
      opsCombos(num, ops, result, temp)
    }
  }
  return true;
}
```
