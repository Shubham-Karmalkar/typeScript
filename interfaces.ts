
/**
 * Interface feels much similar to type in typescript
 */
interface User {
    readonly dbId: number,
    email: string,
    userId: number,
    googleId?: string
    // startTrail: () => string
    startTrail(): string

    getCoupon(couponname: string, value: number): number
}

//this is called the RE-OPENING of the interface. We can not do like below for the type aliase
//by reopening we can add differnt new fileds to it
interface User {
    githubToken: string
}

interface Admin extends User {
    role: "admin" | "ta" | "learner"
}

const shubham: Admin = {dbId: 33, email: "karmlkar", userId: 23434,
 githubToken: "shbham2343",
 role: "admin",
 startTrail: () => "shubham",
 getCoupon: (name: "shubham", off: 45) => 23 //here you can we variable names can be different

};

shubham.email = "karmalkarshubham22@gmail.com";

export {}