"use strict";
// class User {
//     name: string
//     email: string //what ever which is not marked is public ex. name, email
//     readonly city: string = "Beed"
//     private houseName: string = "Pitaji Wonder"
//     constructor(name: string, email: string) {
//         this.name = name;
//         this.email = email;
//     }
// }
// shubham.houseName //get the error
//another way professional people write the above class will be same as below
class User {
    constructor(name, email, id) {
        this.name = name;
        this.email = email;
        this.id = id;
        this._courseCount = 1;
        this.city = "Beed";
    }
    deleteToken() {
        console.log("Token deleted");
    }
    get getAppleEmail() {
        return `apple${this.email}`;
    }
    get courseCount() {
        return this._courseCount;
    }
    set courseCount(value) {
        this._courseCount = value;
    }
}
// const shubham = new User("shubham", "karmlkarshubham22@gmail.com", "2343");
// // shubham.deleteToken()
// shubham.courseCount = 33;
// console.log(shubham.courseCount)
class tempUser {
    constructor(name) {
        this.name = name;
        this._courseCount = 1;
    }
}
class SubUser extends User {
    constructor() {
        super(...arguments);
        this.isFamily = true;
    }
}
// class SubUser extends tempUser {
//     isFamily: boolean = true
//     updateTheCourseCount(){
//         this._courseCount = 3
//     }
// }
//in below scinario we will be able to update the variable as protected let variable to be accessed 
// by parent itself and its child
const shubham = new SubUser("shubham", "karmlkarshubham22@gmail.com", "2343");
shubham.courseCount = 22;
console.log(shubham.courseCount);
