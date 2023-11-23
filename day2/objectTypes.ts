/**
 * we can set readonly property for objects though it won't do anything at run time but property can't be
 * written during type checking
 */

interface SomeType {
    readonly prop: string;
}

function doSomething(obj: SomeType) {
    obj.prop = "shubahm";
}

/**
 * as this value is not writing but, doesn't mean we cannot mutate its internal values i.e if
 * prop is an object then we cannot assign a value to it but we can mutate internal properties of it.
 */

interface Home {
    readonly data: {hasPool: boolean; age:number}
}

function increaseHomeAge(home: Home) {
    home.data.age = 12;
    home.data = {
        hasPool: false,
        age: 23
    }
}

/**
 * Typescript doesn't differentiate between the two type if either of them has readonly and other not.
 */

interface Person {
    name:string
    age: number
}

interface ReadOnlyPerson {
    readonly name: string
    readonly age: number
}

let writablePerson: Person = {name: "shubham", age: 25};

let readOnlyPerson: ReadOnlyPerson = writablePerson;
console.log(readOnlyPerson.age);
writablePerson.age++;
console.log(readOnlyPerson.age);


/**
 * Index Signatures:
 *  for all the objects we don't know all the possible key names ahead of time but we do know their type 
 *  at such cases we use index sigatures
 *  
 *  only some types are allowed for index signatures i.e string, number, symbol
 */

interface StringArray {
    [index: number]: string
}

/**
 * indexing signature state the general rule for all the propery types in that type of object, so
 * if certain property is not following the general rule then compiler yells
 * * generally we think this will be useful for the remaining parameters types and key decision but the
 * way we are using it is wrong this talks about the types of all the properties inside that type 
 */

interface Basic {
    [x:string]:number
    [Y:number]:string
}

type NumberIndex = {
    [x:number]: string
}

type StringIndex = {
    [x:string] : number
}

type Combined = NumberIndex & StringIndex;

let userData:Combined  = {
    name: 1,
    2:"schoole"
}

//below is the way we can resolve it
interface SomeType {
    [x:string]:number | string
    [x:number]:string 
}


interface Manual {
    age: number
    [x:string]: string | number
}
const dlist = {
    name: "shubham",
    23: "age"
}

/**
 * Excess property checks:
 *  Object literals have special treatment of type checking in typescript i.e more in depth
 *  but passing object as variable has less type checking
 * 
 */

interface SquareConfig {
    color?:string
    width?:number
}

function createArea(shape:SquareConfig) {
    return {
        color: shape.color,
        area: shape.width? shape.width ** 2 : 20
    }
}

let areaConfig = {
    colour:"blue",
    width:25
}

createArea(areaConfig)//this is not giving error

createArea({ // this is giving error
    colour:"red",
    width:25
})

createArea({ // this is work around
    colour:"red",
    width:25
} as SquareConfig)

/**
 * There are scenarios where you want to add exccess properties which you can do like below
 */

interface RectConfig {
    color?:string
    width?:number
    [x:string]:any
}

function createRectArea(shape: RectConfig) {
    return {
        color:shape.color,
        area: shape.width,
        opacity:shape.opacity
    }
}

createRectArea({
    widths:23,
    opacity:"2.3",
    colour:"string"
})

//But be warn some spelling correction of color is a bug which needed to be resolved
//and as long as we are having one property matching it won't yell at us.
//for simple things like above we should use work around instead we should resolve those



/**
 * Extending Types:
 *  Sometimes we want to create new type which is extension of existing type i.e might be having new property
 *  etc for that we can extend propties liek below
 */

interface BasicAddress {
    name?:string
    street:string
    city: string
    country: string
}

interface PostalAddress extends BasicAddress {
    unit: number
}

// we can also extend from multipe types

interface Color {
    color:string
}

interface Circle {
    radius: number
}

interface ColorfulCircle extends Color, Circle {

}

type Gate = {
    color:string,
    radius: number
}

type Name = Color & Circle

class Dates implements Gate {
    constructor(
        public color: string,
        public radius: number
    ){}
}

/**
 * Generic Object Types
 */

// interface Box {
//     content:any//we don't know before hand what will be the property type of content
// }

//but above code lead to problem of any type assignement and not type safe so we can have

interface Box {
    content:unknown//this will lead us to use assertions extensively as a safetly
    //but it will lead multiple unrequired checks even if we know the exact value at the moment
}

let x1:Box = {
    content:"Hello there"
}

if(typeof x1.content === "string") {
    console.log(x1.content.toUpperCase())
}
console.log((x1.content as string).toUpperCase())

//above extra code can we removed 

interface BoxUpgrade<Type> {
    content:Type
}

let x2:BoxUpgrade<string> = {
    content:"ehllow "
}

console.log(x2.content.toUpperCase());


//many function overloading are not even required if we have same number of parameters with different types

//there many other useCases of type alises like below
type OrNull<Type> = Type | null // this can be used as a type in function / anywhere to void writing this many times


/**
 * Array Types:
 *  Array is a type also a type that's why we are able to use Array<string> like this and also has 
 *  short hand string[];
 *  1. readonly Array
 *  2. tuple 
 *  3. readOnlyTuple types
 * 
 * readonly array are useful inside function where we want to restrict mutation of the array
 */

type ReadOnlyArray<T> = readonly T[];


let userNames: ReadOnlyArray<string> = ["shubahm", "rohan", "ajay"];
userNames[0] = "ritik";
userNames.push("someting");

// also we cannot assign readonly data to mutable type ex.

let uNameList: readonly string[] = ["shubham", "rohan", "sushma"]
let bNameList: string[]  = ["abhi", "ajay", "nikhil"]

bNameList = uNameList

//but vise versa is allowed
uNameList = bNameList

/**
 * Tuple array: feature it provides over normal array is that its length won't change to some extend
 *  and feature over readonly array is that we know at which position what data type will be there and we 
 * can update the values also
 *  it has not representation at runtime
 */

type StringNumberTuple = [string, number]

let nameAdd:StringNumberTuple = ["shubham", 23]

nameAdd[2] = "something";

nameAdd.push("something")

let newData = [...nameAdd] as const;

newData[2];

/**
 * Tuple can also have optional property
 */

type NewTuple = [string, number, boolean?]
let num:NewTuple = ["shubham", 23, true]

let dataUpdated = num[2] ? num[2] : false

type ReadOnlyTuple = readonly [string, number]

/**
 * We can't pass readonly tuple to any to a mutable tuple
 * adding as const converts the list to a readonly tuple;
 */

const originCo = [3,4] as const

function markPoint([x,y]:[number, number]) {
    return x+y;
}

markPoint(originCo)//here as you can see markPoint don't guarantee unmutability

