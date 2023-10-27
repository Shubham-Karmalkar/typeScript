/**
 * Functions can also be declared as type as below
 */

type GreetingFunction = (a: string) => void ;

function greeter(fn: GreetingFunction){
    //do something
}
greeter((a: string) => console.log(a));

//apart from being callable functions are also objects in javascript means we can have properties on them
//properties of function are declared with function alias but can be with object type
type DescribleFunction = {
    description: string;
    (someArg: number): boolean;//here not method name that means its type of a function
}

function doSomething(fn: DescribleFunction) {
    console.log(fn.description + "returned the value: " + fn(6));
}

function myFunction(abc: number) {
    return abc > 3;
}

myFunction.description = "default value";

doSomething(myFunction);


/**
 * Construct Signature
 * : these function are called Construct Signature because they usually create new Object.
 * : we use new key word in this to specifify such constructor type.
 */

type SomeConstructor = {
    new (someArg: string): Object;
}

function fn(ctor: SomeConstructor) {
    return new ctor("Hello World");
}


/**
 * Generics
 *  => we can pass the types to help in access with returned typed value
 *  => these functions we can use multiple times with different types
 */

function firstFunction<Type>(arr: Type[]): Type | undefined {
    return arr[0];
}

const s = firstFunction(["a", "b", "c"]);//here you can see, we didn't pass the type itself but still it picked it correctly
const n = firstFunction([1,2,3]);
const u = firstFunction([]);

//above type is not specified but it is inferred or chosen by typescript


//we can also have multiple types as well

function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func);
}

const parsed = map(["1", "2", "3"], (n) => parseInt(n));

/**
 * Constraints
 *  => in function along with type we can add constraints which will help us use the functions
 *  in generic way with accuracy of specific data type which we want to work on
 *  => sometimes generic functions work on all type of types which we want to constrain
 * we use "extends" key word on type to specify some more details.
 */

function longest<Type extends {length: number}>(a: Type, b: Type) {
    if(a.length >= b.length) {
        return a;
    }
    return b;
}

const longestArr = longest([1,2], [1,2,3]);
//below line of code throws error as it doesn't have length property
// const notOk = longest(10, 1000);


function minimumLength<Type extends {length: number}>(obj: Type, minimum: number): Type {
    if(obj.length >= minimum){
        return obj;
    }
    return {length: minimum};//this is not letting us do this as not only input can be object but also array or string which can cause issue;
}

/**
 * Speicifying the Type Arguments
 */

function combine<T>(arr1: T[], arr2: T[]): T[] {
    return arr1.concat(arr2);
}
combine([1,2,3], ["Hellow", "how are you"]);// this causes issue so you can manuall specify the types
combine<number | string>([1,2,3], ["Shubham", "karmalar"])

/**
 * Guidelines for writing Good Generic functions
 * 1. always use fewer type parameters as possible in function defination.
 * 2. it is always better two have relation in two type parameters.
 */

//good generics example
function firstElement1<Type>(arr: Type[]) {
  return arr[0];
}
//bad generics example
function firstElement2<Type extends any[]>(arr: Type) {
  return arr[0];
}

//good generics example
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}
//bad generics example
//below Func parameter doesn'e relate two type parameters which is a red flag
function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}

/**
 * Optional parameters 
 * use "?"  for optional parameters of functions.
 * or we can also use the default values of the field to avoid this issue if use is passing undefined as the value.
 * when writing the function callback type never use optional parameter unless you are intended to do so.
 */


/**
 * Function Overloads
 * suppose you want to write the function which can create date using either timestamp, string or month,day, year
 * to do this we write multiple function signatures followed by body of the function
 * note: as below you can see d3 is giving error so third function is not actually the signature 
 *  its a defination of above two function signature that's why we can't call 3rd function
 *  and it throws error
 * imp: it might be possible to think that why to write this code instead why not to write the 
 *      3rd function directly but thing is compiler won't throw error as d3 if we do that
 *      it will accept it, which we might want to restrict so its a way to restrict the way function
 *      is going to be used.
 *      but on thinking more about it, it might feel its best use is in case of having multiple variable parameters count
 *      and not in having same count of parameter with possible multiple types and same return type.
 */

function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?:number, y?:number): Date {
    if (d !== undefined && y !== undefined) {
       return new Date(y, mOrTimestamp, d);
    } else {
        return new Date(mOrTimestamp);
    }
}

const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);

/**
 * Implementation signature must be compatible with overload signature
 */
//below example is not compatible
function fns(x: boolean): void;
function fns(x: number): void;
function fns(x: boolean): void {

}


function fnt(x: boolean): string;
function fnt(x: number): number;
function fnt(x: boolean | number) {
    return "Oops";
}

/**
 * Writing Good Overloads
 *  1. if same number of arguments are present in all overload signatures and same return type then we should not use
 *      Overloads.
 *  2. always prefer parameters with union types instead of overloads when possible
 */

function len(x: string): number;
function len(x: any[]): number;
function len(x: any) {
    return x.length;
}

//this is throwing an error because typescript can only resolve a function call to a single signature overload;
len(Math.random() > 0.5 ? "hello" : [0]);
// as both the overload signatures have the same no. of argument and same return type so 
//instead we can write non-overload version of function

function lenNew(x: any[] | string) {
    x.length;
}

lenNew(Math.random() > 0.5 ? "hello" : [0]);



