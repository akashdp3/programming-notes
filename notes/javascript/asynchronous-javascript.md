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

These functionalities help in executing code written javascript. But this still is not enough. In modern web development, `asynchronous` operations are as important and the pure javascript does not support these since javascript is a `single threaded language`.

For these `asynchronous` operations, `javascript` makes use of functionalities in browser. These are called `Browser APIs`. For example, when some data is fetched through some API, `fetch` method of `Browser APIs` is being used inside javascript.

### Web Browser APIs / Node Background Threads

`Web Browser APIs` does not live in javascript engine. They live in browser. For example, `setTimeout` is a browser API and whenever it is used in javascript, it basically refers to the the `Web Browser Feature` i.e. timer.

### Callback Queue

- Callback Queue is the queue where Browser APIs push functions or callbacks which are to be executed through the javascript engine.
- It's javascript engine feature, not a browser feature.

### Event Loop

- Event loop is the process which constants keeps track if some function is waiting in the callback queue, if callstack is empty. If the process finds the callstack to be empty and there are some functions that are waiting to be executed, it take the front function and pushes it to the callstack for execution.
- It's javascript engine feature, not a browser feature.

## Promises

### How Promises work

```javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Hello World");
  }, 1000);
});

promise.then((res) => console.log(res));
```

- When any promise is defined, it does two things:
  - First, it spins off the aynsc operation (that is passed to it)
  - Second, it returns a `Promise` placeholder (which in-turn gets assigned to `promise` constant)
- The returned promise object looks something like this: `{ value: undefined, onFulfilled: [], onRejected: [] }`.
- Javascript goes on executing the `synchronous` code.:
