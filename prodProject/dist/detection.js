"use strict";
function detectType(val) {
    if (typeof val === "string")
        return val.toLowerCase();
}
function provideId(id) {
    if (!id) {
        console.log("Please Provide Id");
        return;
    }
    id.toLowerCase();
}
function isAdminAccount(account) {
    if ("isAdmin" in account) {
        return account.isAdmin;
    }
    return false;
}
/**
 * Using instanceof method for type narrowing
 * it is vary much similar to typeof but typeof only validates the default types
 * but instanceof validates if perticular object is instance of a class or not
 */
function logValue(x) {
    if (x instanceof Date) {
        console.log(x.toUTCString());
    }
    else {
        console.log(x.toUpperCase());
    }
}
/**
 *
 * as is used to make compiler think that a perticular object is another object
 * this can be use when we know that certain value will be more specific than the compiler
 * will know so we can use it to make compiler change its perspective about that value
 */
function isFish(pet) {
    return pet.swim !== undefined;
}
/**
 * in below function if we add pet is Fish as a return type then compiler will
 * be sure that it is the fish
 */
function isFishUpgraded(pet) {
    return pet.swim !== undefined;
}
function getFood(pet) {
    if (isFishUpgraded(pet)) {
        pet.swim(); // here you can we now compiler is identifying the pet as fish
    }
    if (isFish(pet)) {
        //pet.swim() // as you can see compiler still has't verified pet as a fish
        return "Fish Food";
    }
    else {
        return "Bird Food";
    }
}
class Temp {
    constructor(name) {
        this.name = name;
    }
}
function getTrueShape(shape) {
    if (shape.kind === "circle") {
        return Math.PI * shape.radius ** 2;
    }
    // return shape.side ** 2;
    // if(shape instanceof Temp) { // this also works if that is class and not a interface
    //     shape.name
    // }
}
/**
 * Suppose in future we added new Type in type Shape for ex Rectangle
 * then below code will not throw error and that's not what we want
 * we want our code to yell at us
 * so for that refere the below 2nd function
 */
function getArea(shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.side ** 2;
    }
}
function getAreaImproved(shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.side ** 2;
        case "rectangle":
            return shape.length * shape.width;
        default:
            const _exhaustiveCheck = shape; // now the code is thinking rectangle is not the never type which is great
            return _exhaustiveCheck; // and its yelling at us
    }
}
