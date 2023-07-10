

function addTwo(num: number): number {
    return num + 2;
}

function getUpper(val: string) {
    return val.toUpperCase();
}

function signUpUser(name: string, email: string, isPaid: boolean) {

}

let loginUser = (name: string, email: string, isPaid: boolean = false) => { }

addTwo(5);
getUpper('4');

signUpUser("Shubham", "karmalkarshubham22@gmail.com", true);

loginUser("h", "h@h.com");

function getValue(myVal: number): boolean | string {
    if (myVal > 5) return true;
    return "200 OK"
}

const getHello = (s: string): string => {
    return '';
}

const heros = ["thor", "spiderman", "ironman"];

heros.map((hero): string => {
    return `hero is ${hero}`;
})

function consoleError(error: string): void {
    console.log(error);
}


/**
 * never return type:
 * it says function never return anything it will just throw error or will stop execution of program
*/


function handleError(error: string): never {
    throw Error(error)
}


export { }

