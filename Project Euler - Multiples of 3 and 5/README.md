# freeCodeCamp: Project Euler - Multiples of 3 and 5

By the name, I immediately thought this was fizz-buzz, but it's a bit different. In a set of all natural numbers below the argument, provide the sum of all the numbers that are multiples of 3 and 5.

## Solution Explained

The logic is simple, add up all the numbers where `i mod 3` or `i mod 5` equals zero. For the less experienced, the percent character is modulus operator, which provides the remainder of a division operation. `4 % 2` is 0 and `5 % 2` is 1. So any time `num1 % num2 === 0`, `num 1` is a multiple of `num2`.

Start by declaring the two variables the function will use, eliminating the need for another `let` in the loop declaration. Scoping `i` to the function instead of the loop needs to be a conscious choice, not habit, though. I did it for one less `let`.

Then you just add every value that passes the `mod 3 or mod five equals zero` test to a result integer. You need to declare an initial value for `result` as the values that gets added will not coerce it to an integer.


### The Solution
```javascript
function multiplesOf3and5(number) {
  let result = 0, i;
  for(i = 1 ; i < number; i++){
    if(i%3 === 0 || i%5 === 0) result += i;
  }
    return result;
}
```