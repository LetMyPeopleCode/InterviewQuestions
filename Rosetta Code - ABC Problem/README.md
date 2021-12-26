# Rosetta Code - ABC Problem

Given a set of wooden blocks, each containing two letters (set provided in the freeCodeCamp write-up), determine if you can make a word without having to re-use any blocks.

Word may be submitted in any case, so tests should be case-insensitive.

## Solution Explained

My solution feels a bit brute-forcey, but it works.

First, I had to take their "sample" list and convert it to an array, which I did in Notepad++ with 3 global searches:
- replace "(" with "['"
- replace " " with "','"
- replace ")\r\n" with "],"

I wrapped that in another set of brackets and assigned it to a variable called `blocks`.

Then I convert the incoming string to all upper-case to match the letters on the blocks.

Then I do an outer loop (`i`) to loop through the letters in the word. For each iteration/letter, a variable (`found`) is set to `false`.

Then an inner loop (`n`) to loop through the blocks.

For each block a quick `indexOf()` operation determines if the letter is in it. If so, the block is removed from the array with a `splice`, `found` is set to `true`, and the inner loop terminates.

If `found` is still false when the inner loop terminates, it returns `false`. If not, the next iteration of the outer loop proceeds. If the outer loop completes without returning `false`, it returns `true`.

### Some thoughts

I originally thought I could optimize to maximize letter availability, but any letter that seems to repeat also seems to repeat the same pair... B & O, A & N, F & S, C & P. Taking the first block with O vs the second would make no difference.

Second, I thought I might optimize the indexing of the letters, so words starting with Z or M wouldn't have to walk the whole array, but as brute-forcey as my solution felt, optimizing it further felt yak-shavey. 

## Solution
```javascript
function canMakeWord(word) {
  
  let blocks = [['B','O'],['X','K'],['D','Q'],['C','P'],['N','A'],['G','T'],['R','E'],['T','G'],['Q','D'],['F','S'],['J','W'],['H','U'],['V','I'],['A','N'],['O','B'],['E','R'],['F','S'],['L','Y'],['P','C'],['Z','M']];
  
  word = word.toUpperCase();

  for(let i in word){
    let found = false;
    for(let n in blocks){
      if(blocks[n].indexOf(word[i]) !== -1){
        blocks.splice(n,1);
        found = true;
        break;
      }
    }
    if(!found) return false;
  }
  return true;
}
```