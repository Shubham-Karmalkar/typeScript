/**
 * There are some rare primitives in javascript
 * as bigint and symbol
 */

// const hundered: bigint = BigInt(100);

/**
 * Symbols are another universal monsters then are unique in complete system even if you create another symbole with same value it will still be not equal
 */

const sym1: symbol = Symbol("shubham");

const sym2: symbol = Symbol("shubham");

console.log(sym1 === sym2);//it will be false
console.log(sym1)