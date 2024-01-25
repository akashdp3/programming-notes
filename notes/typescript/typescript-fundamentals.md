## Introduction

### What is `typescript`?

```markdown
It is a `open-source` project that is maintained by Microsoft. It is syntactic superset of `Javascript`.
```

### What is type checking?

`Is type y equivalent to type x ?` -> `Does the type of y fit within the type of x ?`

### Why types are a big deal

It allows developers to leave more of their intent on itself.

Ex.

```typescript
function add(a: number, b: number): number {
  return a + b; // tserror: Assignment of type 'String' is not assignable to parameter of type 'number'
}
add(3, "4");
```

### Typescript Advantages

- `Typescript` moves common runtime programming error to compile time.
- Javascript does not give warning about possible errors. Even worse, It fails with unexpected result which programmer might not be aware of. **In putting in simple words, programmers get to know about the fail right at the moment when problematic thing happen**.
- Typescript introduces constraint which helps by throwing warning and errors in compile time

## tsconfig.json

```json
{
  "compilerOptions": {
    "outDir": "dist", // outDir(Output Directory) - where do you want to store the compiled(ts -> js) output
    "declaration": true, // declaration - Creats type declaration file `.d.ts`
    "target": "ES2015", // target - Javascirpt version you want your ts code to compiled to. Ex. ES2015, ES2017, ES2020
    "module": "commonjs",
    "moduleResolution": "node"
  },
  "include": ["src"]
}
```

### Important points

- with config `declaration` defined to true, the tsc or typescript compiler creates a type file (`<fileName>.d.ts`) along with a `js` file

## Variables and Values

### `const` and `let` declaration

When a variable is defined as constant and a value is assigned to it. So automatically typescript considers the variable's type of that value.

Ex

```typescript
let temperature = 6; // Type of temperature is number. It is not defined anywhere. But TS infers it from the value.
const humidity = 79; // Type of humidity is 79 itself.
const location = "Mumbai"; // Type of name is "Mumbai" itself
```

Let's do some operation on above variables

```typescript
temperature = 23; // VALID
temperature = "warm"; // ERROR: type-checking
temperature = humidity; // VALID

humidity = temperature; // ERROR: Cannot assign to 'humidity' because it is a constant
humidity = 78; // ERROR: Cannot assign to 'humidity' because it is a constant
humidity = 79; // ERROR: Cannot assign to 'humidity' because it is a constant
```

It's clear that `typescript` does not allow assigning value to `const` variable. Now let's check what happens when we define a variable as let, but assign type as const.

it will look something like this:

```typescript
let humidity = 79 as const; // (same as `let humidity = 79 as 79;` It's called literal type.)
let temperature = 6;

humidity = temperature; // ERROR: Type 'number' is not assignable to '79'
humidity = 78; // ERROR: Type '78' is not assignable to type '79'
humidity = 79; // VALID: humidity's type is 79 and number `79` has type `79`.
```

## Implicit `any` and type annotations

- If a variable is declared, but not initialized, `typescript` implicitly treats it a `any` type.
- `any` can be thought of as a type that can accept any type that is possible to create in typescript.

```typescript
let startTime = new Date();
let endTime;

setTimeout(() => {
  endTime = 0;
  endTime = new Date();
}, 500);
```

Basically we haven't declared type for `endTime`, also we haven't initialized it. Anthing typescript can't figure out, it by default assigns `any` type to that variable.

## Type Casting

- Type casting is basically defining type of value explicitely
- Sometimes `typescript` objects to some cases of casting. For ex, `null as 79` is invalid. As long as values are reasonably compatible, `typescript` will allow to perform the casting.

```typescript
const humidity = 79 as number; // VALID: 79 and number are compatible
const date = "oops" as Date; // ERROR: value and type are incompatible

const date = "oops" as any as Date; // VALID: type "oops" -> any -> Date. Can useful in tests, but should not be used in code
```

## Functions & Return Types

```javascript
function add(a, b) {
  return a + b;
}

add(3, 4);
```

Let's add types to the above `javascript` code:

```typescript
function add(a: number, b: number): number {
  return a + b;
}

add(3, 4);
```

## Objects & Property Types

Below is a normal object we are defining.

```typescript
const myCar = {
  make: "Toyota",
  model: "Corolla",
  year: 2002,
};
```

`Typescript` automatically defines `myCar`'s type to something as below:

```typescript
const myCar: {
  make: string;
  model: string;
  year: string;
};
```

Same as normal function, objects can be passed to any function as argument. Typescript checks types in argument and makes sure if the arguments are being used properly or not.

```typescript
function printCar(car: { make: string; model: string; year: number }) {
  console.log(car.chargeVoltage); // ERROR: since chargeVoltage does not exist on the type defined
  console.log(`${car.make} ${car.model} ${car.year}`); // VALID
}
```

In addition to this, there is a usecase where some of the properties of the argument can be optional. For ex, `chargeVoltage` is not applicable to petrol/diesel cars, but it is must-have property in electric cars.

```typescript
function printCar(car: {
  make: string;
  model: string;
  year: number;
  chargeVoltage?: number; // Optional property. It accompines with operator `?`
}) {
  if (typeof car.chargeVoltage === "number") {
    console.log(car.chargeVoltage); // VALID
  }
  console.log(`${car.make} ${car.model} ${car.year}`); // VALID
}
```

## Index Signature

In the above example, we are defining types for values for javascript object. There is also a way to type the keys too. Possible types can be string and numbers. It can be defined as below:

Suppose we are trying to define type for below object:

```typescript
const members = {
  Akash: {
    country: "India",
    city: "Pune",
  },
  Akanksha: {
    country: "India",
    city: "Bangalore",
  },
};
```

Type of the above object can be defined as:

```typescript
type members: {
  [k: string]: {
    country: string;
    city: string;
  }
}
```

## readonly

It tells typescript to treat the variable as immutable. It is helpful when you dont want change the value of arrays.

## Static vs dynamic

Sorting type systems as either static or dynamic has to do with whether type-checking is performed at compile time or not. `Typescript's type system is static.`

Dynamic type systems perform their "type equivalence" evaluation purely at runtime. Javascript, python, ruby, perl and PHP fall into this category. It is also called duck typing.

## Union and Intersection Types

It more depends on the type of values a particular type can accept.

### Union Types (|)

```typescript
type oneThroughFive = { 1, 2, 3, 4, 5 }
type evens = { 2, 4, 6, 8 }

oneThroughFive | evens -> { 1, 2, 3, 4, 5, 6, 8 }
```

{ 1, 2, 3, 4, 5, 6, 8 } are values `oneThroughFive | events` can accept.

```typescript
const humidity = 79;

type OneThroughFive = 1 | 2 | 3 | 4 | 5;
let lowNumber: OneThroughFive = 3; // VALID
lowNumber = 8; // ERROR

type Evens = 2 | 4 | 6 | 8;
let evenNumber: Evens = 2; // VALID
evenNumber = 5; // ERROR

let evenOrLowNumbers = 5 as Evens | OneThroughFive;
```

Let's try some examples:

```typescript
function flipCoin(): "heads" | "tails" {
  if (Math.random() > 0.5) return "heads";
  return "tails";
}
```

```typescript
const success = ["success", { name: "Akashdeep Samantra", email: "akash.samantra@gmail.com }] as const;
cosnt error = ["error", new Error("Something went wrong")] as const;

function getUserInfo() {
  if (flipCoin() === "heads") {
    return success;
  } else {
    return fail;
  }
}

const outcome = getUserInfo();

const [first, second] = outcome;
/**
 * type of first: "success" | "error"
 * type of second: { readonly name: "Akashdeep Samantra", readonly email: "akash.samantra@gmail.com" } | Error
* /

```

### Discriminated Unions

```typescript
const outcome = getUserInfo();

if (first === "error") {
  /**
   * type of second: Error - Since typescript understands when first is "error", second will only be Error and nothing else
   */
} else {
  /**
   * type of second: { readonly name: "Akashdeep Samantra", readonly email: "akash.samantra@gmail.com" } - same reason as above
   */
}
```

```
TypeScript understands that the first and second positions of our tuple are linked. What we are seeing here is sometimes referred to as a discriminated or “tagged” union type.
```

### Intersection Types (&)

```typescript
type oneThroughFive = { 1, 2, 3, 4, 5 }
type evens = { 2, 4, 6, 8 }

oneThroughFive & events -> { 2, 4 }
```

```
Essentially, & means “anything that is in both sets” in terms of the allowed values, and because of this, we can use “any of the behavior definitely present on members of either set”.
```

## Interfaces and Type Aliases

These are two mechanisms that `typescript` allows us to give names to our type and pass it as `javascript` values.

- It reduces noise in code. It allows us to create a cental place where we can define types and use it across the application.
- These types gets removed on compile-time.

### Types

```typescript
type Amount = {
  currency: string;
  value: number;
};

function printAmount(amt: Amount) {
  console.log(amt);
}
```

```typescript
type specialDate = Date & { getDescription(): string }; // Merges Date object and { getDescription(): string }

const newYearsEve: SpecialDate = Object.assigne(new Date(), {
  getDescription: () => "Last day of the year",
});
newYearsEve.getDescription(); // VALID
```

### Interfaces

- Interfaces are being used for inheritance

Let's refer to a javascript classes

```javascript
class AnimalsThatEat {
  eat() {}
}

class Cat extends AnimalsThatEat {
  meow() {}
}
```

Let's try to use same login in typescript inheritance

```typescript
interface Animal {
  isAlive(): boolean;
}

interface Mammal extends Animal {
  getFurOrHairColor(): string;
}

interface Hamster extends Mammal {
  squeak(): string;
}

function careForHamster(h: Hamster) {
  /**
   * h gets all methods from all three interfaces
   */
}
```

```typescript
interface AnimalLike {
  eat(food: string): void;
}

class Dog implements AnimalLike {
  eat(food: string): void {
    console.log("Dog eating food");
  }

  bark() {
    return "woof";
  }
}
```

`implement`

- It is a contact that a class has to adhere to.
- It defines what instance of a class look like.
- A class can `extend` one class and `implement` multiple interfaces.

`implement` and `extends` can be used together.

```typescript
class Animal {}

interface AnimalLike {
  eat(food: string): void;
}

interface CanBark {
  bark(): string;
}

class Dog extend Animal implements AnimalLike, CanBark {
  bark() {
    return "woof"
  }

  eat(food: string) {
    console.log("Dog eating food")
  }
}
```

```
In scenarios where inherited class implements multiple interfaces, the instance of class has to satisfy all interfaces.
```

A class can only implement an object type or intersection of object types with statically known members.

```typescript
type CanJump = {
  jumpToHeight(): string;
};

type CanBark2 = number | { bark(): string };

class Dog implements CanJump, CanBark2 {
  jumpToHeight() {
    return "1.8 meter";
  }
} // ERROR: since CanBark2 is enforcing a number type
```

```
Basically, DO NOT USE types for what you use interface for.
```

### Open Interfaces

Interfaces can be redeclared, the result is that all declared types are combined and the combined type is treated for type checking. It is special feature for `interface`. Same is not valid for `type` declaration

For interfaces:

```typescript
interface AnimalLike {
  isAlive(): string;
}

// VALID
interface AnimalLike {
  canJump(): boolean;
}
```

For types:

```typescript
type AnimalLike = {
  isAlive(): string;
};

// ERROR
type AnimalLike = {
  canJump(): boolean;
};
```

### Recursive types

```typescript
type NestedNumbers = number | NestedNumbers[];

const val: NestedNumbers = [3, 4, [5, 6, [7], 59], 221]; // VALID
```

## Type Queries

### keyOf

Ex.

```typescript
const contact = {
  name: "Ashley",
  email: "ashley@example.com",
};

type WhatIwant = "name" | "email";
type howIcanget = keyof typeof contact;
// keyof = Object.keys() for types
// typeof = "get me type of this value"
```

Ex.

```typescript
type DatePropertyNames = keyof Date;

type DateStringPropertyNames = DatePropertyNames & string;
type DateSymbolPropertyNames = DatePropertyNames & symbol;
```

### typeof

```typescript
async function main() {
  const apiResponse = await Promise.all([
    fetch("https://example.com"),
    Promise.resovle("Titanium White"),
  ]);

  type ApiResponseType = typeof apiResponse;
}
```
