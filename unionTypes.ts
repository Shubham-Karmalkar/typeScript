let score: number | string = 33;

score = "44";

type User = {
    name: string,
    id: number
}

type Admin = {
    username: string,
    id: number
}

let shubham: User | Admin = {name:"shubham", id: 1234}

shubham = {username: "shubham", id: 345}


function getDbId(id: number | string ) {
    console.log("db id is: ", id)
    //id.toLowerCase()// this gives error as id can be any of them so if we add validation then this error goes
}

getDbId("shubham")
getDbId(3)

//array

const data: number[] = [1, 2, 3, 4]
const data2: string[] = ["1", "2", "3", "4"]
const data3: (string | number)[] = ["1", "2", "3", 2]


let seatAllotMent: "aiesl" | "window" | "middle"

// seatAllotMent = "last"

export { }