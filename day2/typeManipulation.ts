/**
 * We can create new types using existing once and treating types as values.
 * Type manipulation is good as we want to change certains types based on some types if we create them 
 * differently and in big project it is had for everyone to know what needs to change for what,
 * by this way i.e type manipulation we can create type from types so doing change at one place will
 * automatically correct another
 * 
 * 
 * Topics:
 * 
 *      1. Generics
 *      2. KeyOf Type operator
 *      3. TypeOf Type operator
 *      4. Indexed Access Type
 *      5. Conditional Types
 *      6. Mapped Types
 *      7. Template literal Types
 */

/**
 * Generics:
 */

//Generic function

function returnSame<Type>(arg:Type): Type {
    return arg;
}

/**
 * Working with generic type variables i.e treat like you are going to get any type as argument
 */

function loggingIdentity<Type>(arg:Type):Type {
    console.log(arg.length);
    return arg;
}
//as you can see error above typescript wants us to treat it as any type can come in
//so it might be possinle some user might send the number while calling this function
//so better way to do this is as belows

function loggingIdentityUpdated<Type>(arg:Type[]): Type[] {
    console.log(arg.length);
    return arg
}

/**
 * Generic types
 *  we can create type of generic function type
 * 
 *  these are important as in terms of callback we might want it
 *  so for a higher order function which accepts a callback as a argument we can define the type
 *  of function which it is going to accept
 */

function identity<Type>(arg:Type): Type {
    return arg;
}

let myIdentity: <T>(val: T) => T = identity;
let myIdentityNew: {<T>(val: T): T} = identity;//this is also allowed

//so this is similar to writing first generic interface for the functions

interface GenericIdentityFn {
    <T>(arg: T): T;
}

let myId: GenericIdentityFn = identity;

// then we can move the type at interface level so we can decide which type it is going to accept

interface GenericId<Type> {
    (arg:Type): Type;
}

//below both ways are fine
let myNewIds: GenericId<number> = identity;
let myNewId= identity<number>;

interface FixedNumberType {
    (arg:number):number;
}

let myNewIdss: FixedNumberType = identity;

function exactType(arg:number): number {
    return arg;
}

let myGen: <T>(a1:T) =>T = exactType; //this type of type casting is not allowed same as java

/**
 * Generic Classes:
 *      Using generic classes we can make different different classes bases on the types 
 * 
 * NOTE:
 *  Classes has two sides to its types static side and instance side
 *  Generic Classes are generic over its instance side and not toward static side
 *  Static memebers can not use class type parameters
 */

class GenericTypeClass<Type> {//strictPropertyInitialization must be false
    zeroValue: Type;
    add: (x:Type, y:Type) => Type;
}

let numbericClass = new GenericTypeClass<number>();
numbericClass.add(0, 1);


/**
 * Generics constrains:
 * 
 */

//in earlier example compiler is not able to verify that passed type can have length property
// so sometimes we want to have generics across certains types 

function loggingIdentityNew<Type extends {length: number}>(arg: Type):Type {
    console.log(arg.length);
    return arg;
}

/**
 * Using type parameter in Generic constrains
 */

//Suppose you function want two argument one is object and another is any property from that object
//then we can use type parameter as constrin

function getPropertyValue<T, K extends keyof T>(obj:T, key:K) {
    return obj[key];
}
const propObj = {name: "shubham", lname: "kmarlakrea", age: 25};
getPropertyValue(propObj, "name")
getPropertyValue(propObj, "mname")


/**
 * Using class types in Generics:
 *      when using generics we might have factory function which might be returning a class
 *      so at that time we might need the class type i.e constructor defination
 */

function create<Type>(c: new () => Type ):Type {
    return new c();
}

// a more advance example will be 

class BeeKeeper {
    hasMask: boolean = true;
  }
   
  class ZooKeeper {
    nametag: string = "Mikle";
  }
   
  class Animals {
    numLegs: number = 4;
  }
   
  class Bees extends Animals {
    numLegs = 6;
    keeper: BeeKeeper = new BeeKeeper();
  }
   
  class Lions extends Animals {
    keeper: ZooKeeper = new ZooKeeper();
  }
   
  function createInstance<A extends Animals>(c: new () => A): A {
    return new c();
  }
   
  createInstance(Lions).keeper.nametag;
  createInstance(Bees).keeper.hasMask;


/**
 * Generic Parameter Defaults: 
 *      
 */


//earlier we had written
declare function createSomething(): Container<HTMLDivElement, HTMLDivElement[]>;
declare function createSomething<T extends HTMLElement>(element: T): Container<T, T[]>;
declare function createSomething<T extends HTMLElement, U extends HTMLElement>(
  element: T,
  children: U[]
): Container<T, U[]>


//with Generic parameter default we can write

declare function createSomethingUPdated<T extends HTMLElement = HTMLDivElement, U = T[]>(
    element?: T,
    children?: U
  ): Container<T, U>;
   
/**
 * KeyOf Operator:
 *  it take in object type and create or case string literal type
 */

type Point = {x: number, y: number};

type P = keyof Point

let ant: P = "x"

//if type has a string or number type signature it will return the type
//ex.

type Arrayish = {[n:number]: string};
type Arr = keyof Arrayish;


type Mapish = { [k: string]: boolean };
type M = keyof Mapish;

//here M is getting number | string as map[0] and map["0"] is same in javascript


/**
 * TypeOf : 
 *      JS already had typeof but it can also be useful in typescript to get the typeof some things to assgin
 *  
 *      normally this is not very useful but if you use it other type operator then its a different story
 */

let sss = "hello world";
let nnn: typeof sss;

type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>

// it is highely possible to do some mistakes like below

function f() {
    return {x: 10 , y: 23};
}
type PP = ReturnType<f>;
type PPP = ReturnType<typeof f>;

//but typescript has internally put some limit on it to void some mist usecases

function msgbox(str: string){
    return "hello world "+ str;
}

let completeMsg: typeof msgbox("hello")

/**
 * Indexed access types:
 *      it is pretty much similar to accessing value of a property inside a object
 *      only difference is that we are accessing property and getting its type that it
 */

type PersonDetails = {
    name: string
    age: number
    alive: boolean
}

type Age = PersonDetails["age"];
type NameOf = PersonDetails["name"];
type Alive = PersonDetails["alive"];

// we can also use it in combination with keyof

type I1 = PersonDetails[keyof PersonDetails];

type AliveOrName = "alive" | "name"

type I3 = PersonDetails[AliveOrName];

//another example

const MyArray = [
    { name: "Alice", age: 15 },
    { name: "Bob", age: 23 },
    { name: "Eve", age: 38 },
];

type InPerson = typeof MyArray[number]["age"]

//key thing to notice we can only do all these with types only 

const keyType = "alive";

type AlivePart2 = PersonDetails[keyType]


//but we can do like below

type correctKey = "alive";
type AlivePart3 = PersonDetails[correctKey];


