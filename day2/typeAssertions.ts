/**
 * Types assertions are used when you know better than typescript what type of object is gonna come
 * from somewhere then at that time you can go for type assertions.
 * in this we use "as" key word to specify what is that type is going to be;
 * you can also is it inside the angular braces as long as its not a tsx file;
 */

function returnSomething() {
    return [1,2,3]
}

const data = returnSomething() as number[];

const data2 = <number[]>returnSomething();

/**
 * Type Assertions only work when we try to convert type to more specific or less specific type but
 * this rule prevents impossible type coercions like below:
 */

const x = "hello" as number;

/**
 * This rule is very tightly conservative and won't allow more  complex coercions so at that time
 * you can use like below
 * 
 * const a = (expr as any) as T ;
 * 
 */

