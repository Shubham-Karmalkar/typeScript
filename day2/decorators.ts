/**
 * Decorators:
 * 
 *      Decorators are features to add new functionality to existing one.
 * 
 * Order:
 * 
 *      if we have multiple decorators applied then evalution/execution starts from the top decorator
 *      and go all the way to below and execution of functions ends in reverse order
 *      ex.
 *          @f1
 *          @f2
 *          main() {}
 *          now f1 will start executing then inside it f2 starts execution and inside it main will get 
 *          completely executed and execution of f2 end and then at last execution of f1 will end.
 * 
 *          this is how the normally execution context of Javascript works which is nothing but the behaviour
 *          of Stack last in fist out. Controller will be passed on to the next functions.
 * 
 * 
 * Decoration Factories:
 *      Decoration factories are nothing but a function call which will return the decorator
 * 
 *      ex. @f1()
 *          main() {}
 *      here f1 will return the decorator
 * 
 * 
 * Decorator Application: 
 *      ex. @f1
 *          @f2
 *          main() {}
 *          then (f1.f2)(main) ===> f1(f2(main))
 * 
 */


function f1() {
    console.log("f1: is evaluated")
    return (target:any, propertykey: any, descriptor: any) => {
        console.log("f1: is resolved")
    }
}

function f2() {
    console.log("f2: is evaluated")
    return (target:any, propertykey: any, descriptor: any) => {
        console.log("f2: is resolved")
    }
}


class ExampleClass {

    constructor() {

    }
    @f1()
    @f2()
    method1() {
        console.log("executed the main() method")
    }
}

new ExampleClass().method1();
//execution will be like below:
/**
 *  f1: is evaluated
    f2: is evaluated
    f2: is resolved
    f1: is resolved
    executed the main() method


    this shows that main will be executed in the end
 */



/**
 * Class Decorators: 
 *  Class decorators is applied to constructor of the class and can be used to observe, modify or replace
 *  a class definition.
 * 
 *  The Expression of the class decorator will be called at the runtime with the constructor of the 
 *  class as its only argument
 * 
 *  If the class decorator return a function it will replace the class declaration with provided 
 *  constructor function
 *  
 */

function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class BugReport {
    type = "report";
    title: string;

    constructor(t: string) {
        this.title = t;
    }

    method() {
        console.log("something");
    }
}
BugReport.prototype.type = "something else"

let bug = new BugReport("some new bug");

bug.method();
console.log(bug.type)

/**
 * Method Decorators:
 *      the Decorator for methods are applied to the property descriptor of the methods.
 *      a method decorator can not be used in declaration file, on an overload, or in any other 
 *      ambient context such as declare class
 * 
 *      the expression for method will be called at run time as a function with following three arguments
 *          1. Either the constructor function of the class for a static member, or the prototype of the 
 *              class for an instance member.
 *          2. The name of the  member,
 *          3. the property Descriptor for the member
 *         NOTE: property Descriptor will be undefined for the target less than ES5
 * 
 *      if the method decorator returns a value then it will be used as Property Descriptor
 *          i.e we can replace function defination.
 * 
 *      Proptry Descriptor are nothing but some meta data regarding the properties of the object
 * 
 *      ex.  object1 = {
                        property1: 42,
                    };

            propertyDescriptor = {proptry1: { value: 42, writable: true, enumerable: true, configurable: true }}
 */

function exDecorator() {
    return function (target: any, propertyKey: any, descriptor:any){
        console.log("target: ", target)
        console.log("propertyKey: ", propertyKey)
        console.log("descriptor: ", descriptor)
    }
}


class UserNew {
    constructor(
    public name = "shubham"){}
    
    @exDecorator()
    exFunc(username: string, image: string, age: number) {
    
    }

    @exDecorator()
    static exFunc2(username: string, image: string, age: number) {
    
    }
}


let user = new UserNew()

user.exFunc("shubham", "something", 25);
UserNew.exFunc2("shubham", "something", 25);


/**
 * 
 * Accessor Decorators: (Accessors are ex. getters and setters)
 *      the accessor decorator are applied to the property descriptor for the accessor and can be used to 
 *      observe, modify or replace an accessors's definations.
 * 
 * NOTE: Typescript disallow decorating get and set accessor for a single member. instead all the access
 * decorator must be applied to members in the document order, this is because decorators are applied to 
 * Proerty Descriptor, which combines get and set accessor and not seperately.
 * 
 * Decorator will get below properties:
 *          1. Either the constructor function of the class for a static member, or the prototype of the 
 *              class for an instance member.
 *          2. The name of the  member,
 *          3. the property Descriptor for the member
 * 
 * this is very much similar to method decorators
 *  
 */


/**
 * 
 * Property Decorators:
 *      Property Decorators will have below properties:
 *          1. Either the construction function if its a static memebers or prototype of the class
 *              for an instance member.
 *          2. The name of the member.
 * 
 *      Property Descriptor is not provided as an argument to a property decorator.
 *      Currentl there is no mechanism to observe or modify the initializer of instance property
 *      Property Decorator are only used if that a specific property name is been declared for class or not.
 * 
 */

// below propety help us maintain data that we passed at the time of decorator
//below library is helpful to maintain meta data till the time instance is created.
import "reflect-metadata";

const formatMetadataKey = Symbol("format");
function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}
function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}

class Greeter {
    @format("Hello, %s")
    greeting: string;
    constructor(message: string) {
      this.greeting = message;
    }
    greet() {
      let formatString = getFormat(this, "greeting");
      return formatString.replace("%s", this.greeting);
    }
  }

let greet = new Greeter("Good Morning")

console.log(greet.greet());

/**
 * Parameter Decorator: 
 *      parameter decorator is applied to the function of class constructor or method declaration
 *      
 *      these decorator will get below arguments:
 *          1. Either construction function of class for static memeber or the prototype for instance
 *          2. The name of member.
 *          3. The Ordinal Index of parameter in the functions parameter list.
 * 
 * NOTE: A parameter decorator can only be used to observer that a parameter has been declared on a method.
 *      return value of parameter decorator is also ignored.
 * 
 *     this is very much similar to propetry decorator.
 * 
 */

class ParamDeco {
    
    constructor(public title: string) {}

    @printValidate
    print(@required name: string, @required lname: string) {
        console.log("your name is: ", name);
    }

}

function required(target: any, propertyKey:any, parametetIndex:number) {
    console.log("inside Required: ", target, propertyKey, parametetIndex);
    if(!target.uniqId) {
        target.uniqId = Symbol(propertyKey);// now this uniq value will be available for the others like function and props
    }
    const require = (value: any) => {
        if(!value) throw Error("Value Must be Present")
    }
    const existing = Reflect.getOwnMetadata(target.uniqId, target, propertyKey) || {func:require, indexes: []};
    existing.indexes.push(parametetIndex);
    Reflect.defineMetadata(target.uniqId, existing, target, propertyKey);
}

function printValidate(target:any, propertyName: string, descriptor: any) {
    console.log("inside printValidate: ", target, propertyName, descriptor)
    let method = descriptor.value;

    descriptor.value = function () {
        let metadata = Reflect.getOwnMetadata(target.uniqId, target, propertyName);
        for (let parameterIndex of metadata.indexes) {
            console.log("evaluting index: ", parameterIndex, arguments[parameterIndex]);
            metadata.func(arguments[parameterIndex]);
        }
        console.log("metadata: ", metadata);
        return method?.apply(this, arguments);
    }
}


class NewBee {

    main(@required happy: boolean) {

    }
}

let pa = new ParamDeco("Hero");
let pa2 = new NewBee();
console.log("symbo: ", (pa as any).symbol)

console.log("uid: ", (pa as any).uniqId == (pa2 as any).uniqId)
pa.print("shubham", "");

pa.print("shubham", "karmalkar");
