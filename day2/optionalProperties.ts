/**
 * 
 * @param obj
 * this is littile buggy as accessing the lname property doesn't cause any error even in typescript 
 * 
 */

function printName(obj: { fname: string; lname?: string }) {

    console.log(obj.lname?.toUpperCase());
}

printName({fname: "shubham"})
