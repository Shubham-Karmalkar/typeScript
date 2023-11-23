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
    private _courseCount = 1
    readonly city: string = "Beed"
    
    constructor(
        public name: string,
        public email: string,
        private id: string
        ) {
        }
        
    private deleteToken() {
       console.log("Token deleted") 
    }

    getAdress(){
        return "this is full address"
    }

    get getAppleEmail(): string { //this is the getter method
        return `apple${this.email}`
    }
    
    get courseCount(): number {
        return this._courseCount;
    }
    
    set courseCount(value: number) {//setter won't accept any return type if we try to put
        this._courseCount = value
    }
}
// const shubhams = new User("shubham", "karmlkarshubham22@gmail.com", "2343");
// console.log(JSON.stringify(shubhams))
// console.log((Object.keys(shubhams)))
// console.log(shubhams.getAdress())

// // shubham.deleteToken()
// shubham.courseCount = 33;
// console.log(shubham.courseCount)

class tempUser {
    protected _courseCount:number = 1
    constructor(
        public name: string
    ){

    }
}

class SubUser extends User {
    isFamily: boolean = true
    
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
shubham.courseCount = 22
console.log(shubham.courseCount)