## Introduction

### What is `typescript`?

```markdown
It is a `open-source` project that is maintained by Microsoft. It is syntactic superset of `Javascript`.
```

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

### tsconfig.json

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

##### Important points

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

### Implicit `any` and type annotations

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

### Type Casting

- Type casting is basically defining type of value explicitely
- Sometimes `typescript` objects to some cases of casting. For ex, `null as 79` is invalid. As long as values are reasonably compatible, `typescript` will allow to perform the casting.

```typescript
const humidity = 79 as number; // VALID: 79 and number are compatible
const date = "oops" as Date; // ERROR: value and type are incompatible

const date = "oops" as any as Date; // VALID: type "oops" -> any -> Date. Can useful in tests, but should not be used in code
```

### Functions & Return Types

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

### Objects & Property Types

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

### Index Signature

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

### readonly

It tells typescript to treat the variable as immutable. It is helpful when you dont want change the value of arrays.
