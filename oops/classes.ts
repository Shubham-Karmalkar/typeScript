/**
 * NOTE: Never User Arrow Function as Methods inside the classes Never.
 */

class SamplePoint {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

//here x and y are fields and strictInitialization is set to false;
//field without any visibility is by default public in nature.
/**
 * Typescript does not analyze methods invoked to initialize the members of the class i.e if you have
 * strict initialization on and you are invoking function inside constructor to set fields that is
 * not valid initialization and you will still get the error.
 * reason for this behaviour is that the member which extends this class might override this
 * method
 */

//but if you definately initialize the field through means of other than constructor then
// you can do as below

class OkGreet {
  name!: string; //this won't throw compiler error even if strictInialization is true;
}

//readonly will help to create readonly property and if we have getter only then that will readonly propertys

class newGreeter {
  readonly name: string;
}

/**
 * Constructors
 *  classs constructors are very much similar to functions we can add parameter, types, default values,
 *  overloads. etc.
 * 
 * difference between constructor and functions:
 *  1. constructor can't have type parameters
 *  2. constructors can't have return type anotation
 */

class NewPoint {
  x: string;
  y: string;
  //below is the constructor overloading
  constructor(x: string, y: string);
  constructor(z: string);
  constructor(xz: string, y?:any) {
    //do something
  }

}


/**
 * Super() calls:
 *  calling the super is important as we have to bind the public propeties of the base class to the current
 *  object and then we can access this.
 */


/**
 * Methods:
 *      apart from same type features as functions typescript doesn't has anything else to offer more.
 *      
 */

/**
 * Getters/ Setters:
 *      its very rare in javscript to use getters and setters without and additional logic. if you 
 *      don't have any additional logic you can keep those fields are public
 * 
 * some inference rules:
 *      if get exist but set not exists then it is readonly property.
 * 
 *      if the type of set parameter is not defined it takes it up from the getters return type.
 * 
 *      getters and setters must have the same member visibility.
 */

class Thing {
    _size = 0;


    get size(): number {
        return this._size;
    }

    set size(value: number) {
        this._size = value;
    }
}

let thing = new Thing();


/**
 * Index Signatures: 
 *      just like objects index signature we can specify the class's index signature.
 */

class SignatureClass {
    [s: string]: boolean | ((...args:any[]) => void);

    check(s: string){
        return "something i am returning";
    }
}

const signature = new SignatureClass();

let objNew = signature.check("something")


/**
 * Class Heritage:
 *      implements 
 *      extends
 * 
 * implements: 
 *      you can use an interface cluse to check if class members correctly satisfies interface requirements.
 */


// interface Pingable {
//     ping():void;
// }

// class Sonar implements Pingable {

//     ping(){
//         console.log('pinged the Sonar class');
//     }
// }

// but cautions methods of interface doesn't delever method property and its types to child implementations
//look at the example below


// interface Pingable {
//     ping(str: number):void;
// }

// class Sonar implements Pingable {

//     ping(str){// thsi is giving implesitely any type
//         console.log('pinged the Sonar class');
//     }
// }

/**
 * Implementation of interface with optional propetry does not create it in the child class
 */

interface OptionalProp {
    x: string
    y?: string
}

class OptionImple implements OptionalProp {
    x="hellow";
}

const c = new OptionImple();
// c.y = "something to be added";  // error is given that is we can't add it even though its optional;



/**
 * extends Clause
 *      classes can extends from the base class and a derived class has all the properties of the
 *      base class
 */

class AnimalKingdom {
    move(){
        console.log('moving the animal');
    }
}

class Dog extends AnimalKingdom {
    woof(){
        console.log('barking from the dog');
    }
    move(){//overriding the parent class method that is we are creating new property in nearest prototype
        console.log("moving the dog");
    }
}

let dog = new Dog();

// dog.move()

/**
 * It is very common to and legal to refer to a derived class instance through a base class refernce
 * for ex.
 */

let dog2: AnimalKingdom = new Dog();

// dog2.move()

/**
 * If derived class doesn't follow the base contract it throws the error;
 */

class Cat extends AnimalKingdom{

    // move(val: string){//we get compiler error like this;

    // }
}


/**
 * Type only Fields Declarations
 * when we have target >= ES2022 or useDefineForClassFields is true, class fields are initialised
 * after parent class constructor completes, overwriting any value in the parent class. This can be
 * a problem when you only want to re-declare a field more accurately that the parent field.
 * To handle this case we can use declare to indicate typescript that there should be no runtime 
 * effect for this field declaration
 */

interface Cars {
    dateOfBirth: string;
}

interface Audi extends Cars {
    engineType: string
}

class CarsCollection {
    typeOfCars: Cars;
    constructor(type: Cars){
        this.typeOfCars = type;
    }
}

class AudiCollection extends CarsCollection {
    declare typeOfCars:Audi;//using declare not it is not throwing the error
    // typeOfCars:Audi//this is called type only field declaration as we are only declaring the type of variable
    constructor(typeOfCars: Audi){
        super(typeOfCars);
    }
}


let colectionAudi = new AudiCollection({engineType: "big enging", dateOfBirth: "today"});
let dataset = colectionAudi.typeOfCars
console.log(dataset)



/**
 * Initialization Order:
 *  the order of initialization of clases in terms of inheritance
 * 
 * Order:
 *      1. the base class fields are initialized
 *      2. the base class's constructor runs
 *      3. the derived classe's fields are initialized
 *      4. the derived classes's constructor runs;
 */

class SuperBasicClass {
    name = "super base class";

    constructor(){
        console.log("initialized the super base classs");
    }
}

class SuperDerivedClass extends SuperBasicClass {
    derivedName = "super derived class"
    constructor() {
        super()
        console.log("intializing the derived classs");
    }
}



let superDerivedClass = new SuperDerivedClass();

/**
 * Member Visibility
 *  public : default modifier => access to everyone
 *  private: => access to itself or inside that class only
 *  protected: => access to child or subclasses
 */


/**
 * Exposer of the protected memebers.
 */

class ExposerBase {
    protected m = 10;
}

class ExposerDervied extends ExposerBase {
    m = 15;// thing to take care is that this field is public in nature
    constructor(){
        super();
        console.log(this.m)
    }
}

let exposer = new ExposerDervied();
console.log(exposer.m);


/**
 * Cross herircy protected access:
 *  if we have Base class and we have two derived classes as D1 and D2
 *  and base class has a protected property called x and similary D1  also has protected property x
 *  now D2's method is trying to access property "x" of D2 instance(i.e inherited) and D1 instance in typescript
 *  it cannot access x property of D1 instance and will throw error in typescript
 *  but in languages like JAVA its legal and in c# and c++ its illegal just like typescript
 */


/**
 * Cross, instance private access:
 *  Typescript allows cross instance can allow each others private properties
 * 
 * *this way is invalid in Ruby.
 * but allowed in many langugages like c#,c++,php,swift
 */

class CrossInstance {
    private x= 10;

    public changeX(val:number){
        this.x = val;
    }

    public isSame(other:CrossInstance){
        return this.x === other.x
    }
}

let instanceOne = new CrossInstance();
let instanceTwo = new CrossInstance();

console.log("is same: ", instanceTwo.isSame(instanceOne));
//as above you can seee instanceTwo was able to access private property of instanceone

/**
 * Caveats:
 * 
 * 
 * [NOTE]: Always remember that private & protected variables don't have any effect at runtime
 *          meaning those are only useful for complietime. so if you do your object JSON.strigify(obj)
 *          or if you try to access it, it is accesible you.
 *          To overcome this issue we can use you can either go with the weakMaps or use # notion of javasript
 *  
 *          but thing is if you use "#" typescript convert it to Weak Maps if you compiling to ES2021 or less.
 */


class PrivateFields {
    #somePrivate = "12342341324";
}

const privateMemeber = new PrivateFields();
console.log(JSON.stringify(privateMemeber))


