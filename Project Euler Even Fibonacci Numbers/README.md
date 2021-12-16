# Project Euler: Even Fibonacci Numbers

Create a set of fibonacci numbers that are less than or equal to `n` and return the sum of only the even numbers. Fibonacci adds the current number to the prior number in the sequence. So a sequence would be `1, 1, 2, 3, 5, 8, 13...`. In that sequence, only 2 and 8 are even, so the answer would be 10. 

## Solution Explained

The tricky part with these problems is that I keep wanting to use map, filter, and reduce, but those are array functions. I'm being passed a number. The effort to make the numbers into an array and then later run an array operation on them would not be beneficial.

To derive the fibonacci numbers below `n` requires 4 variables, 3 that need to function-scoped (existing outside the loop iteration scope), one that can be loop-iteration-scoped.

First declare 3 variables, one to hold the result, one equal to one, one equal to 0.

Then start a while loop that will keep running until the next fibonacci number will be greater than `n`.

At the end of the iteration, `last` must equal the starting value (`fib`) that started the iteration, so the starting value is assigned to `hold`. Add `fib` and `last` to get the next fibonacci value, then assign the initial value to last.

Finally, use `fib mod 2 === 0` to test for it being an even number, and if so, add it to the `result`. 

When done, return the `result`.

## Solution
function fiboEvenSum(n) {
  let result = 0, fib = 1, last = 0;
  while (fib + last <= n) {
    let hold = fib;
    fib = fib + last;
    last = hold;
    if(fib % 2 === 0) result += fib;
  }
    return result;
}