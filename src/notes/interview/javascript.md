## Basic Javascript

### Q1. What is hoisting?

Ans. Hoisting is a javascript technique in which all variable and function declarations are moved to top of the scope.

```javascript
function printName() {
  console.log(name); // Output: Undefined.
  var name = "John Doe";
}

printName();
```

It works great with `var`. But new declaration syntax like `let` and `const`, it will through a `Reference Error`. Let's use the same example, but with `let`;

```javascript
function printName() {
  console.log(name): // Output: REFERENCE ERROR
  let name = "John Doe";
}
```

Just like the previous example, `name` is hoisted to the top of the function block, but unlike `var`, it is not initialized to `undefined`. So while accessing it before declaration causes `REFERENCE ERROR`. It is also called `Temperal Dead Zone`.

### Q2. What's currying?

Ans. Currying is a function programming technique where a function with multiple arguments can be transformed into sequence of functions with one or more arguments.

Ex.

```javascript
const sumThreeNumbers = (a, b, c) => {
  return a + b + c;
};

sumThreeNumbers(1, 2, 3);
```

With currying technique, the above function can be transformed into something like this:

```javascript
const someFunction = (a) => (b) => (c) => {
  return a + b + c;
};

sumThreeNumbers(1)(2)(3);
```

Same feature can be represented in traditional function

```javascript
function sumThreeNumbers(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

sumThreeNumbers(1)(2)(3);
```

## Functional Javascript

### Q1. What is closure?

Ans. `Closure` is basically combination of a function and it's lexical enviornment the function is part of. In other words, it is the javascript technique through which inner function has access to properties of outer function.

Ex,

```javascript
function outerFunction() {
  const name = "John Doe";

  return function innerFunction() {
    console.log(name);
  };
}

const func = outerFunction();
func(); // Output: "John Doe"
```

In other programming languages, all properties defined in a function exist just for the duration of function execution. After the function is executed, all corresspondig properties gets deallocated, But in case of javascript, functions create closures which consists of any local variables that were accessible to the function during declaration. These variables arestored in a function's hidden property called `[scope]`. This is not directly accessible, but accessible inside the function.

For the above example, if `func` is console logged, you can see something like this

```json
{
  constructor: {
    arguments: null,
    caller: null,
    length: 0,
    name: "innerFunction",
    prototype: { constructor: f },
    [[FunctionLocation]]: <Location>,
    [[Prototype]]: f (),
    [[Scopes]]: {
      Closure (outerFunction) { name: "John Doe" }
    }
  }
}
```

### Q2. What will happen when there are multiple functions being returned and all returned functions has access to the same property of outerFunction?

Ans. Let's take an example:

```javascript
function outerFunction() {
  let counter = 0;

  const innerFunction1 = function() {
    counter += 1;
    console.log("Counter : ", counter);
  }

  const innerFunction2 = function() {
    counter += 1;
    console.log("Counter : ", counter);
  }

  return { innerFunction1, innerFunction2 };
}

const myFuncs = outerFunction();

myFuncs.innerFunction1(); // Counter : 1
myFuncs.innerFunction2(): // Counter : 2
```

From the above example, it shows that even though there are multiple inner functions, javascript creates one closure of `outerFunction` instead of creating copy for each function.

### Q3. Real world usage for closures

- `Closure` can be treated as abstraction mechanism that allows for separation of concerns between inner implementation and interface it provides to outside.
- Wherever we want a variable whose state can be persisted and that variable should not be globally accessible. For example, if we want a certain button to be clicked maximum 3 times, it's better to keep track of counter using closure instead of using javascript state or variables.

### Q4. `map` Polyfill

```javascript
const array = [1, 3, 5, 4, 3];

Array.prototype.customMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i += 1) {
    result.push(callback(this[i]));
  }
  return result;
};

console.log(array.customMap((x) => x + 1));
```

### Q5. `filter` Polyfill

```javascript
const array = [1, 3, 5, 4, 3];

Array.prototype.customFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i += 1) {
    if (callback(this[i])) {
      result.push(this[i]);
    }
  }
  return result;
};

console.log(array.customFilter((x) => x < 4));
```

### Q6. `reduce` Polyfill

```javascript
const array = [1, 3, 5, 4, 3];

Array.prototype.customReduce = function (callback, initialValue) {
  let result = initialValue;

  for (let i = 0; i < this.length; i += 1) {
    result = callback(result, this[i]);
  }

  return result;
};

console.log(array.customReduce((acc, cur) => acc + cur, 10));
```

### Q7. What is inheritance?

Ans. In javascript, there is no concept of class inheritance. The class introduced in ES6 is basically prototype inheritance under the hood. Prototype inheritance is way through which one object can access property of another object.

There are two properties in object i.e. `_proto_` and `prototype`. `_proto_` can store reference of another object and in-turn access properties of the said object. This prototype chain will continue until a object which has null in `_proto_`.

```javascript
const vahicle = {
  speed: "",
  usage: "Transport people and/or goods",
};

const car = Object.create(vahicle);
console.log(car.usage); // Transport people and/or goods
```

Using construction function

```javascript
function Bike(model, color) {
  this.model = model;
  this.color = color;
}

Bike.prototype.getDetails = function () {
  return `${this.model} - ${this.color}`;
};
```

Same class can be written in `class` syntax.

```javascript
class Bike {
  constructor(model, color) {
    this.model = model;
    this.color = color;
  }

  getDetails() {
    return `${this.model} - ${this.color}`;
  }
}
```

## Javascript Asynchronicity

### Q1. Javascript is a single threaded language. How does asynchronous operation happen in javascript?

Ans. Javascript is a single threaded language. In addition to javascript engine, browser have also some Browser APIs. These browser APIs are primariliy responsible for the async operations.

For example, whenever we use `fetch` function to get some data from server, we are performing an async operation. `fetch` is a browser API which gets executed outside of javascript. There are several things in play here. This operation happens in Browser API instead of javascript exeuction context. At the same time, the thread of exeuction moves to next line of code to execute. In browser, when fetch is successful, it pushes a message to `callback queue`.

#### Callback queue

- `Callback queue` is the queue where asynchronous function (which are to be executed) are pushed.
- It is a javascript feature, not a browser feature.

#### Event Loop

- `Event Loop`, as the name denotes, is a process which runs in loop and it checks whether there are any asynchronous function that is waiting to be executed and checks if javascript callstack is empty. If it finds some async function waiting and callstack is empty, it pushed the said callback/function to callstack for it to be executed.

### Q2. Async/Await vs Promises

Ans.
