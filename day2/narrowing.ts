/**
 * Defination: 
 *  In code we can add special type checks called Type Guards, this way of refining types to more
 *  specific types than declared(earlier) is called narrowing.
 */

/**
 * 
 * @param padding 
 * @param input 
 * @returns string
 * here in below code as you can we we narrowed down the most accurate types to do 
 * some operation on the data this is nothing but the narrowing.
 */
function padLeft(padding: number | string, input: string): string {
    if(typeof padding === "number"){
        return " ".repeat(padding) + input ;
    }
    return padding + input ;
}
 

/**
 * Truthiness narrowing
 *  In this we narrow cases with null, undefined, "", NaN, 0, 0n all falsy values
 * as example below:
 *  you see by using thruthiness check we did handled the falsy values errors.
 */

function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {//here check first condition of if 
    console.log(strs);
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}


/**
 * Equality Narrowing.
 *  by using the operators(===, !==, ==, !=) we can narrow down the types
 */

function example(x: string | number, y: string | boolean){
    if(x === y){
        //as here you can see the types of x and y and the common type in these two is string
        //so the typescript atomatically know the and don't give error when we tries to 
        //use the string method on both of them in this if branch.
        x.toUpperCase();
        y.toLowerCase();
    }
}

/**
 * Similarly you can use != null operator to remove out null as well as undefined.
 */


/**
 * "In" Operator Narrowing.
 *  Javascript provides the in operator for checking if certain property exists in a certain object 
 *  or union type or not.Typescript uses this to narrow down the types.
 */

type Fish = {swim: () => void};
type Bird = {fly: () => void};

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    animal.swim();
  } else {
    animal.fly();
  }
}


/**
 * insteanceOf Narrowing:
 *  this can also be used for type Narrowing.Specifiacally we will use this in classes.
 */

function logValue(x: Date | string) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    } else {
        console.log(x.toUpperCase());
    }

}

/**
 * Assignments: 
 *  TypeScript can narrow down the types based on the assingments also.
 */

let x = Math.random() < 0.5 ? 10 : "hello world";

x = 1;

console.log(x);

x = "hellow";

console.log(x)

// x = false; // this will give error.

/**
 * Control Flow Analysis
 *  its not just like we are going through if guard for type checking and moving ahead
 *  something more than this is going on here. Typescript moves along with complete Control flow
 *  where the code is moving and how it is analyzing the data types where we are returning
 *  etc.
 *  Typescript predicate on the basis of code also that where what type of a variable is going to
 *  be.
 */

/**
 * 
 * @param padding 
 * @param input 
 * @returns 
 * 
 * in below function as we are returning from the first if block that's why typescript 
 * was able to confirmly decide the padding after the if block is a string thus
 * helping in the narrowing down the type of the padding.
 * 
 * this analysis of the code on the basis of rechability is called the Control Flow Analysis.
 * 
 * When a varialbe is analysed, control flow can split off and re-merge over and over again and
 * the variable can be observed to have a different type at each point.
 * for this statement you can check the Topic "Assignment" above
 */
function padLeftNew(padding: number | string, input: string): string {
    if(typeof padding === "number"){
        return " ".repeat(padding) + input ;
    }
    return padding + input ;
}

/**
 * Use Type Predicates.
 *  to verify the something we can write user-defined type guards, we simply need to define a 
 *  function  whole return type is a "type predicate".
 *  for this pupose we will be using "is" operator. 
 */

//this line animal is Fish is the most important part which will help any if condition 
//to make sure that this is a fish for sure.
function isFish(animal: Fish | Bird): animal is Fish {
    return (animal as Fish).swim !== undefined ;
}

/**
 * Discriminated Unions:
 *  This is also known as tagged union or algebric data type, is a type composed of 
 *  of multiple distinct types combined using a common discrimination property.
 * 
 * So basically you need a special variable which will act as discriminant in between all those 
 * cobined properties.
 * for this you use the "type" and "interface" along the side.
 * Discriminted property is usually a literal type(a specific value) that uniquely identifies each
 * variant.
 * 
 * Below is the one example. 
 */

interface Circle {
    kind: "circle";
    radius: number;
}

interface Square {
    kind: "square";
    sideLength: number;
}

interface Rectangle {
    kind: "rectangle";
    length: number;
    width: number;
}

type Shape = Square | Circle | Rectangle ;

function getTrueShape(shape: Shape) {
    if(shape.kind === "circle"){
        return console.log("its a circle");
    }
    console.log("its a square");
}

/**
 * Now upto this point you understood narrowing very clearly
 * now suppose you came to the point where that variable can not be narrowed futhur down
 * In those cases, Typescript will use a never type to represent a state which shouldn't exist
 * we will see an example for this but before lets understand what is Exhaustinveness Checking.
 */

/**
 * Exhaustiveness checking:
 *  speciallity of "never" is that it can be assinged to every type but no other type can be 
 *  assigned to never type, we can assign never type to itself only.
 * 
 * So we can use this never type in switch cases where we will be thrown an error if we haven't
 * convered the all the possible switch cases. This is called the Exhaustiveness Checking which
 * ensures that all the possible cases are being checked. 
 */

function getArea(shape: Shape) {
    switch(shape.kind) {
        case "circle":
            return console.log("its a circle");
        case "square":
            return console.log("its a square");
        default:
            const _exhaustiveCheck: never = shape;
            return _exhaustiveCheck;
    }
}

//as you can see in above example that we have not covered the rectangle case that's why it is 
//yelling at us which is great which make sure that our functinality is never broken;

//Whenever we extend our functionality it will give us reminder that something is wrong







export {}