
interface AnimalKingDom {
    live():void;
}

interface Rabbit extends AnimalKingDom {
    dig(): void;
}

type Example = Rabbit extends AnimalKingDom ? number : string;
type Example2 = AnimalKingDom extends Rabbit ? number : string;


/**
 * In case of function overload where 
 *      we are having fixed arguments in overload and just differce in their types and based on input
 *      types we have different output types we can do as below
 */

interface IdLabel {
  id: number /* some fields */;
}

interface NameLabel {
  name: string /* other fields */;
}
   
  function createLabel(id: number): IdLabel;
  function createLabel(name: string): NameLabel;
  function createLabel(nameOrId: string | number): IdLabel | NameLabel;
  function createLabel(nameOrId: string | number): IdLabel | NameLabel {
    throw "unimplemented";
  }

  type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;

  function createLabelNew<T extends number | string>(nameOrId:T): NameOrId<T> {
    throw "unimplemented";
  }

  let a = createLabelNew("shubham");
  let b = createLabelNew(23);

  /**
   * Conditional Types constrains:
   *        conditions will help us to contrins types in the generics
   */

  type MessageOf<T> = T["message"];

  // we can make it more accurate type

  type Messageof<T extends {message: unknown}> = T["message"];
  
  interface Email {
    message:string
  }

  type EmailType = Messageof<Email>

  //we can also use it in conjuction with never like below

  type MessageOfNever<T> = T extends {message: unknown} ? T["message"] : never;
  
  type Temp = MessageOfNever<number>


  /**
   * 
   * Infering within conditional types:
   *       meaning we can infer the type of something using the infer key word inside the conditional types
   */

  type Flatten<Type> = Type extends Array<infer Item>? Item: Type;

  //this is bit better than what we have done above for Message types

  type GetReturnType<Type> = Type extends (...args: any[]) => infer Return ? Return : never;

  type NumTypo = GetReturnType<() => number>

  /**
   * conditions like below it will not be able exactly tell what is the return type 
   *  and that is ok i think
   */

declare function stringOrNum(x: string): number;
declare function stringOrNum(x: number): string;
declare function stringOrNum(x: string | number): string | number;
 
type T1 = ReturnType<typeof stringOrNum>;


/**
 * Distrubuted Conditional types:
 *  means for types like above if we provide distrubuted types i.e with union or something
 *  ex. string | number as a type it will give distribute result by default but we can improve it
 */

type ToArray<Type> = Type extends any ? Type[]: never;

type StringArrOrNumArr = ToArray<string | number>

//as you can see result is distributed in nature

//but we can change it by writing generic type

type ToArrNoDistribution<Type> = [Type] extends [any] ? Type[]: never;

type ImprovedStringNumArr = ToArrNoDistribution<string | number> ;