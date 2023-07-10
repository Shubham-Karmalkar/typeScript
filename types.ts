/**
 * Type aliases
 * there are many types in typescript
 * 1. Number
 * 2. String
 * 3. Boolean
 * 4. Null
 * 5. Undefined
 * 6. Void
 * 7. Object
 * 8. Array
 * 9. Tuples
 * 10. Any(more javascriptish in nature)
 * 11. Never
 * 12. unknown
 * 10. etc...
 */


/**
 * Sytax
 * let variableName: type = value
 * 
 * almost all the types in typescript are lowercase
 */

//string
let greetings: string = "Hello Shubham";
greetings = greetings.toLowerCase()
console.log(greetings);
 
//number
let userId: number = 333.345

//boolean
let isLoggedIn: boolean = false

//any
/**
 * any is not the good type, mostly you want to avoid it
 * it just avoids making type check of variable
 */
let hero;

function getHero(){
    return "thorfin";
}
hero = getHero()

type Animal = {
    name: string
}
//this is how we can extend the TYPE ALIASES
type Bear = Animal & {
    isWhite: boolean
}

export {}