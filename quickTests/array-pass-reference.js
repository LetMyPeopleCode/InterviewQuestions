function mutator(arr1){
  arr1.push("f");
}

let c = ["d", "e"];
mutator(c);
// if the array was passed by reference c will have 3 elements
console.log((c.length > 2) ? "Mutated" : "Not Mutated", c);
