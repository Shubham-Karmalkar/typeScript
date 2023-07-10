
// const User = {
//     name: "shubham",
//     email: "karmalkarshubham22@gmail.com",
//     isActive: true
// }

// function createUser({ name: string, isPaid: boolean }) { }

// createUser({ name: "shubham", isPaid: false });

// // createUser({name:"shubham",isPaid: true, email: "kamralkarshubham22@gamilc.opmc"}) //error is comming stating that email can not be used

// let obj = {name:"shubham",isPaid: true, email: "kamralkarshubham22@gamilc.opmc"}
// createUser(obj); //no error is throw at this point of time this is the weird behaviour of javascript object in typescript


// function createCourse(): {} {
//     return {}
// }

/**
 * type Aliases:
 *  
 */

// type User = {
//     name:string,
//     isPaid: boolean, 
//     email: string,
//     isActive: boolean
// }

// function createUserNew(user: User): User {
//     return user
// }
// createUserNew({name:"", email:"", isActive: true, isPaid:true});

type User = {
    readonly _id : string, 
    name: string, 
    email: string,
    isActive: boolean,
    creditcardDetails?: number // ? represents that it is a optional value in the type
}

type cardNumber = {
    cardNum: string
}

type cardDate = {
    cardDate: string
}

// combining muiltlple types to create a new type
type cardDetails = cardNumber & cardDate & {
    cvv: number
}

let user: User = {
    _id: "233", 
    name: "shubham", 
    email: "karmalkar",
    isActive:false
}

user.email = "shbuahm@22gmail.com"
// user._id = "shubham"; // typescript feature which won't let use update this

export { }