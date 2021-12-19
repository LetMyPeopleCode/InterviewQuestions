function solve24 (numStr) {
  let nums = numStr.split('').map(x => parseInt(x));
  // quick tests
  if (nums.reduce((val, cur)=> val + cur) == 24) return nums.join('+');
  if (nums.reduce((val, cur)=> val * cur) == 24) return nums.join('*');
  // nope, lets continue
  let opsSet = [];
  let parens = [[0,4],[2,6],[4,8],[0,6],[2,8],'']; // possible parens positions
  opsCombos(numStr.length - 1, ["+","-","*","/"], opsSet);
  //split string for quick tests AND to sanitize into ints *only*
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


console.log(solve24("1127"))
