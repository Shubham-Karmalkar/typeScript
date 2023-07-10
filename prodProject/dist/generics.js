"use strict";
/**
 * need for creation of generics
 */
const scoreList = [];
const names = [];
//we want a function which should work for all the data types which might lead to creating multiple functions
function identityOne(val) {
    return val;
}
//problem with below function is that is not very correct it might take int and return string
function identityTwo(val) {
    return val;
}
//this will resolve the issue
function identityThree(val) {
    return val;
}
// identityThree(3) // we can do this directly as this is not custom data type
function identityFour(val) {
    return val;
}
// below syntax must be used when you are trying with your custom data type for default
// data types you can call the function directly. ex. identityFour(true)
identityFour({ brand: "brand", type: 3 });
function getSearchProducts(products) {
    //some database operations
    const myIndex = 3;
    return products[myIndex];
}
// Arrow FUnction way
const getMoreSearch = (products) => {
    //do some database operations
    const myIndex = 4;
    return products[myIndex];
};
//below you will <T,>  comman in generic this is written by mostly react develper to specify
// that this is generics and not the JSX or any html tag
// const getMoreSearch = <T,>(products: T[]): T => {
//     //do some database operations
//     const myIndex = 4
//     return products[myIndex]
// }
function anotherFunction(products, count) {
    return products[0];
}
class Sellable {
    constructor() {
        this.card = [];
    }
    addToCart(product) {
        this.card.push(product);
    }
}
//this way we can also create multiple use cases where some command code in two differnt class we 
// can combile in one new class
const courseSellable = new Sellable();
courseSellable.addToCart({ name: "shbuham", author: "karmalkar", subject: "" });
class Animal {
    constructor() {
        this.name = "animal";
    }
}
class Bee extends Animal {
    constructor() {
        super();
        this.name = "bee";
    }
    makeSound() {
        console.log("bee ... bee...");
    }
}
class Lion extends Animal {
    constructor() {
        super();
        this.name = "Lion";
    }
    makeSound() {
        console.log("roar... roar..");
    }
}
function generateInstance(c) {
    return new c();
}
console.log(generateInstance(Lion).name);
/**
 * what is (new() => T ) in above code learn more
 */ 
