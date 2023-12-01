type World = "world";
type HelloWorld = `Hello ${World}`;

/**
 * We can also use unions for this which act as cross multiplication 
 * 
 */

type EmailLocalId = "welcom_email" | "email_heading"
type FooterLocalId = "footer_title" | "footer_sendoff"

type AllLocalIds = `${EmailLocalId | FooterLocalId}_id`;

/**
 * For Each interpolated position in the template literals, the unions are cross multiplied
 */

type Lang = "en" | "marathi" | "hindi" ;

type LocalMessageIds = `${Lang}_${AllLocalIds}`;


/**
 * Power of string literal types comes in picture when we have to create new types 
 * based on the existing types
 */

const passedObj = {
    firstName: "shubham",
    lastName: "karmalkar",
    age: 25
}

/**
 * We want to create a function which will add on function on each propety of this object which accespts
 * a callback as a function.
 */

//we also want to have a return type to delcare for this functions

function makeWatchObject<Type>(obj: Type) {
    let newObj:any = {...obj};
    newObj.on = <T extends keyof Type>(prop: `${string & T}Changed`,callback: Type[T]) => {
        console.log("doing something")
    }
    return newObj;
}
const madeNewObj = makeWatchObject(passedObj);
//but this not giving proper type support we need to create type

type PropEventSource<Type> = {
    on(event: `${string & keyof Type}Changed`, callback: () => void): void
}

function makeWatchObject1<Type>(obj: Type): Type & PropEventSource<Type> {
    let newObj:any = {...obj};
    newObj.on = <T extends keyof Type>(prop: `${string & T}Changed`,callback: Type[T]) => {
        console.log("doing something")
    }
    return newObj;
}

const madeNewOne = makeWatchObject1(passedObj);
madeNewOne.on("firstNameChanged", () => {})

//but we also want callback to have propert value as per the type

type PropEventSourceUpdated<Type> = {
    on<Key extends string & keyof Type>(arg: `${Key}Changed`, callback: (arg: Type[Key]) => void): void;
}

type PropEvent<Type> = {//this is not proper
    on(arg: `${string & keyof Type}Changed` , callback: (arg: Type[keyof Type]) => void):void
}

function makeWatchObjectUpdated<Type>(obj: Type): Type & PropEvent<Type> {
    let newObj:any = {...obj};
    newObj.on = <T extends keyof Type>(prop: `${string & T}Changed`,callback: Type[T]) => {
        console.log("doing something")
    }
    return newObj;
}

const madeNewSecond = makeWatchObjectUpdated(passedObj);

madeNewSecond.on("firstNameChanged", newName => {

})

madeNewSecond.on("ageChanged", age => {

})


/**
 * Intensic String Manipulation Type
 */

//UpperCase
type Worlds = "worlds"
type UpperWorld = Uppercase<Worlds>

//LowerCase
type LowerWorld = Lowercase<UpperWorld>

//capitalize
type CapitalWorld = Capitalize<Worlds>

//uncapitalize

type UncapitalWorld = Uncapitalize<CapitalWorld>

