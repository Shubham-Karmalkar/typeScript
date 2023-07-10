/**
 * need for creation of generics
 */

const scoreList: Array<number> = []
const names: Array<string> = []

//we want a function which should work for all the data types which might lead to creating multiple functions
function identityOne(val: boolean | number): boolean | number {
    return val;
}
//problem with below function is that is not very correct it might take int and return string
function identityTwo(val: any): any {
    return val
}

//this will resolve the issue
function identityThree<Type>(val: Type): Type {
    return val
}

// identityThree(3) // we can do this directly as this is not custom data type

function identityFour<T>(val: T): T {
    return val;
}

interface Bottle {
    brand: string,
    type: number
}
// below syntax must be used when you are trying with your custom data type for default
// data types you can call the function directly. ex. identityFour(true)
identityFour<Bottle>({ brand: "brand", type: 3 })

function getSearchProducts<T>(products: T[]): T {
    //some database operations
    const myIndex = 3
    return products[myIndex]
}

// Arrow FUnction way

const getMoreSearch = <T>(products: T[]): T => {
    //do some database operations

    const myIndex = 4

    return products[myIndex]
}

//below you will <T,>  comman in generic this is written by mostly react develper to specify
// that this is generics and not the JSX or any html tag
// const getMoreSearch = <T,>(products: T[]): T => {
//     //do some database operations

//     const myIndex = 4

//     return products[myIndex]
// }


function anotherFunction<T, U extends number>(products: T[], count: U): T {
    return products[0]
}

// anotherFunction(["string"], "stirng")// you can do this way this will extend datat type but 
//its kind of add as its working bit opposite of functionality of generics
// and it is also true that we can write this  as below
/**
 * function anotherFunction<T, number>(products: T[], count: U): T {
        return products[0]
    }
 */

interface Quiz {
    name: string
    type: string
}

interface Course {
    name: string
    author: string
    subject: string
}

class Sellable<T>{
    public card: T[] = []

    addToCart(product: T){
        this.card.push(product)
    }
}

//this way we can also create multiple use cases where some command code in two differnt class we 
// can combile in one new class

const courseSellable = new Sellable<Course>()
courseSellable.addToCart({name: "shbuham", author: "karmalkar", subject: ""})


class Animal {
    name: string = "animal";
}

class Bee extends Animal {
    constructor(){
        super()
        this.name = "bee"
    }

    makeSound(): void {
        console.log("bee ... bee...")
    }

}


class Lion extends Animal {
    constructor(){
        super()
        this.name = "Lion"
    }

    makeSound(): void {
        console.log("roar... roar..")
    }

}

function generateInstance<T extends Animal>(c: new () => T): T {
    return new c()
}

console.log(generateInstance(Lion).name)

/**
 * what is (new() => T ) in above code learn more
 */