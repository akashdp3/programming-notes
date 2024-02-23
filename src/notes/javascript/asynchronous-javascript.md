# Aynchronous Javascript

## Introduction

### Javascript Code Execution

```javascript
const num = 3;

function multipleBy2(inputNumber) {
  const result = inputNumber * 2;
  return result;
}

const name = "Will";
```

As soon as we start running code, we start creating a javascript `execution context`.

- **Thread of execution**: Parsing and executing the code line after line
- **Live memory of variables with data**: Also known as Global Variable Enviornment

#### Javascript on encountering a function:

- Whenever `javascript` encounters function, it stores entire `function` body into the function name.
- When any function is invoked, a brand new execution context is being created. In this execution context, we have separate `thread of execution` and separate `memory`.
- This `memory` is specific to this said `function`. Also the `function` has access to `outer and global memory`.

## Javascript Asynchronicity

Core or pure javascript consists of three parts:

1. Thread of execution
2. Execution context
3. Local or Global memory

These functionalities help in executing code written javascript. But this still is not enough. In modern web development, `asynchronous` operations are as important and the pure javascript does not support these since javascript is a `single threaded languages

For these `asynchronous` operations, `javascript` makes use of functionalities in browser. These are called `Browser APIs`. For example, when some data is fetched through some API, `fetch` method of `Browser APIs` is being used inside javascript.

### Web Browser APIs / Node Background Threads

`Web Browser APIs` does not live in javascript engine. They live in browser. For example, `setTimeout` is a browser API and whenever it is used in javascript, it basically refers to the the `Web Browser Feature` i.e. timer.

### Callback Queue

- Callback Queue is the queue where Browser APIs push functions or callbacks which are to be executed through the javascript engine.
- It's javascript engine feature, not a browser feature.

### Microtask Queue

- Microtask queue is the queue where all promise related callback gets pushed.
- `Event Loop` priotizes tasks in microtask queue before moving to callback queue.

### Event Loop

- Event loop is the process which constants keeps track if some function is waiting in the callback queue or microtask queue, if callstack is empty. If the process finds the callstack to be empty and there are some functions that are waiting to be executed, it take the front function and pushes it to the callstack for execution.
- It's javascript engine feature, not a browser feature.

## Promises

### How Promises work

```javascript
console.log("Me First");
const promise = new Promise((resolve, reject) => {
  console.log("First");
  setTimeout(() => {
    resolve("Hello World");
  }, 1000);
  console.log("Last");
});

promise.then((res) => console.log(res));
```

**Javascript Exectution Context**

- `Javascript Execution Context` executes lines of code from top to bottom. It executes one line at a time and it can do only one thing at a time.
- Whenever `javascript` encounters any asynchronous operation, it calls the relevant browser api (where the operation is handled separately from `javascript`) and moves on to execute next lines of code.

**Line 1**
- In the above example, javascript executes the first line of code i.e. `console.log("Me First")` and logs `Me First` string to browser console.

**Line 2**
- In the second line, first it creates a variable `promise` (with initial value `undefined`) and then creates a promise instace.
- `Javascript` then goes on and executes the callback passed to the promise. It is gonna log `First`, call browser api `timer` to perform `setTimeout` (asynchronously) and log `Last`.
- It returns a promise object to be stored in `promise` variable i.e.


```json
{
   value: undefined,
   onFulfillment: [],
   onRejection: []
}
```

**Line 3**

- `Javascript` encounters `promise.then()` method. By looking at the syntax, it seems that javascript executes the  `.then` method after promise is resolved. But that is not the case. `Promise.then` is just a method which takes a callback and pushes the same to `onFulfillment` array.
- Similarly, whenever we do `promise.catch`, it pushed the callback to `onRejection` array.
- After promise is resolved and some value is assigned to `value` property of the promise object, depending on the type of settlement, it executes callbacks in `onFulfillment` or `onRejection` array.

**Asynchronous Operation**

- In `Line 2`, we called `setTimeout` function with a callback. It should get resolved after `1000ms`. After that, the callback is pushed to callback queue which event loop is going to push to the callstack.
- Thus, `javascript` will encounter `resolve("Hello World")`. By executing this line, `javascript` resolves the relevant promise.

## Iterators

Javascript iterators are objects with `next` method that when called returns the next element from the stream or flow of data.

```javascript
function createFlow(array) {
    let i = 0;
    return {
        next: function() {
            const element = array[i];
            i++;
            return element;
        }
    }
}

const element = createFlow([1, 2, 3]);
console.log(element.next()) // LOG: 1
console.log(element.next()) // LOG: 2
console.log(element.next()) // LOG: 3
console.log(element.next()) // LOG: undefined
```

## Generators

```javascript
function* createFlow() {
    const number = 10;
    const newNumber = yield number;
    yield 5 + newNumber;
    yield 6;
}

const element = createFlow();
console.log(element.next()) // LOG: 10
console.log(element.next(2)) // LOG: 7
```

## Async/Await


