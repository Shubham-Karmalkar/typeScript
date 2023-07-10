/**
 * Literal Types, we can use this when we want to have fixed set of value to be use by the variable
 * 
 * use can use union for this and then it will allow only fixed types of values.
 */

// type Data = {
//     s: string;
//     alignment: "left" | "right" | "middle";
// }

function printText(s: string, alignment: "left" | "right" | "middle") {

}

const obj = {s: "shubham", alignment: "left"};

printText(obj.s, obj.alignment);
/**
 * as you can see above error is coming as typescript considers alignment in obj has type string and 
 * its value is "left" so which can be updated after declaration that's why type script is throwing 
 * the error.
 * From this it can be concluded type script considers types as values as well to be verified
 * so to overcome this we can use below methods
 */


printText(obj.s, obj.alignment as "left");

const newObj = {s: "karmlkar", alignment: "left" as "left"};

printText(newObj.s, newObj.alignment);

/**
 * another way is that you can convert whole object to a constant
 * it will convert the entire object to a TypeLiteral
 */

const req = {s: "amit", alignment: "right"} as const;

printText(req.s, req.alignment);