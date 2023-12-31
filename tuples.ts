/**
 * Tuples are only part of TypeScript and not the javascript
 * its a specialised array with some restriction on it given by typescript
 * : [datatypes] represents the tuple and it restricts the order of data type and qualitity
 * Tuple in typescript don't have restriction over changing the value of it unlike python 
 */

// const user: (string | number)[] = ["hc"] //we might come across scinario where we want to restrict order of data types in array
let user: [string, number, boolean]

user = ["hello", 1234, true]
user = [...user, false]
//even those this is tuple we allowed to use array methods which is wrong

user.push(23)

console.log(user)

let num = [22, 56] as const;
export { }