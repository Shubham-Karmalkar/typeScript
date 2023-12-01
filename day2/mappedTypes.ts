/**
 * When you Don't want to repeat yourself, sometimes a type needs to be based on another type
 * it makes use of index signature and keyof these both things
 * this is used to declare type of properties which are not declared ahead of time
 */

type OnlyBoolsAndNumber = {
    [key: string]: boolean | number
}

const confirms: OnlyBoolsAndNumber =  {
    name: true
}

//Mapped types is generic type which uses union of PropertyKey used by "keyof" to iterate through key to create
//types

type OptaionsFlag<Type> = {
    [Property in keyof Type]: boolean
}

type Features = {
    darkMode: () => void
    newUserProfile: () => void;
}

type FeatureOptions = OptaionsFlag<Features>;

/**
 * Mapping modifiers:
 *  there two mapping modifiers readonly and ? respectively
 *  using - and + we can add or remove those
 */

type CreateMutable<Type> = {
    -readonly [Prop in keyof Type]:Type[Prop]
};

type LockAccount = {
    readonly id: string
    readonly name: string
}

type UnlockedAccount = CreateMutable<LockAccount>;

//similarly for optional type assirtions

type Concrete<Type> = {
    [Prop in keyof Type]-?: Type[Prop]
}

type MayBeUser = {
    name?:string
    id?:string
    age?:number
}

type ConfirmUser = Concrete<MayBeUser>;

/**
 * Key remapping:
 *  we can alter they keys of existing type to create new type this requires us to use "as" cluse
 *  what make it more powerful is that we can leverage power of template literals
 */

type HasPropAsString<T> = {
    [Prop in keyof T]: string
} 

//here we are needed to do string & Prop to make compiler sure that it is going to be string at all costs

type CreateNewKey<Type> = {
    [Prop in keyof Type as `get_${string & Prop}` ]: Type[Prop]
}

type CreateGetters<Type> = {
    [Prop in keyof Type as `get${Capitalize<string & Prop>}` ]: () => Type[Prop]
}

interface Person {
    name: string
    age: number
    location: string
}

type LazyPerson = CreateGetters<Person>;

/**
 * We can exclude the certain keys from the properties 
 */

type RemoveKindField<Type, Prop> = {
    [Property in keyof Type as Exclude<Property, Prop>]: Type[Property];
}

interface Circle {
    kind: "circle";
    radius: number;
}

type Keys = keyof Circle;

type KindlessCircle = RemoveKindField<Circle, "kind">;

/**
 * We can also map over arbitrary unions, not just normal but any unions
 * this is the special case where we can use only in without conjuction with keyof
 * and reason for that here Events is considered to an array kind of thing 
 */

type EventConfig< Events extends { kind : string } > = {
    [Prop in Events as Prop["kind"] ]: string
}

//we can use mapped types in conjuction with the conditional types


type ConditionaMapper<Type> = {
    [Property in keyof Type]: Type[Property] extends {pii: true} ? true : false;
}
