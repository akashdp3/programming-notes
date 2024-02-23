# Design Technologist - Amazon

## Introduction

## Javascript

### Functional Programming

#### Q. What's functional programming?

Ans. `Functional programming` is an approach to software development for creating maintainable software by composing pure functions. In other words, it is building softwares by composing functions.

#### Q. Polyfills for `map`, `filter` and `reduce`

Ans.

** Polyfills `map` **

```javascript
const myMap = function(callback) {
    const result = [];

    for (let i = 0; i < this.length; i += 1) {
        result.push(callback(this[i], i));
    }

    return result;
}

Array.prototype.myMap = myMap;

console.log([1, 2, 3].myMap(x => x * 2)); // OUTPUT: [2, 4, 6]
```

** Polyfills for `filter` **

```javascript
const myFilter = function(callback) {
    const result = [];

    for (let i = 0; i < this.length; i += 1) {
        if (callback(this[i], i)) {
            result.push(this[i]);
        }
    }

    return result;
}

Array.prototype.myFilter = myFilter;

console.log([1, 2, 3, 4, 5, 6].myFilter(x => x > 2)); // OUTPUT: [3, 4, 5, 6]
```

** Polyfills for `reduce` **

```javascript
const myReduce = function(callback, initialValue) {
    let result = initialValue || 0;

    for (let i = 0; i < this.length; i += 1) {
        result = callback(this[i], result);
    }

    return result;
}

Array.prototype.myReduce = myReduce;

console.log([1, 2, 3, 4].myReduce((acc, curr) => acc + curr)); // OUTPUT: 10
console.log([1, 2, 3, 4].myReduce((acc, curr) => acc + curr, 10)); // OUTPUT: 20
```

#### Q. What's composition?

Ans. `Composition` is the method of creating a feature by using multiple sub-features. `Javascript` and `React` (or any other modern frontend frameworks) use concept of composition to build features. For ex, `React` builds bigger component by using/re-using smaller components. Similarly, in `Javascript` functional programming, we can build a function using other functions.

#### Q. Can you explain about closures?

Ans. `Closure` is basically compination of a function and the lexical enviornment that is attached to said function. In other words, if there are outer and inner functions, inner function can have access to the properties of outer function even after outer function is out of the picture.

Ex.
```javascript
function outerFunction() {
    const name = "akash";

    return function() {
        console.log(name);
    }
}

const func = outerFunction();
func() // LOG: "akash"
```

In the above example, we can see that the returned (or inner function) have access to the `name` property of outerFunction even after javascript exits the `outerFunction`'s execution context.

Whenever a function is returned from somewhere, `javascript` creates a `closure` for the outerFunction and attaches to the returned function. If there were multiple returned functions, it attaches the same closure for all functions. All returned functions will share the same closure.

If we were to log the function, we can find the colsure inside a hidden property `[[scope]]`.

### Javascript Asynchronicity

#### Q. How does javascript execute any code snippet?

Ans. `Javascript` has three components for code execution:

1. Execution Context
2. Thread of Execution
3. Memory

- Whenever it starts exeuction, it begins from global exeuction context.
- It exeuctes line by line from top to bottom.
- If a variable or function declarion is encountered, it allocates some memory in global scope/memory.
    - For functions, it stores entire function body (probaly in binary) in memory. In this stage, it does not know what's in the function body.
- When a function call is invoked, it finds the function by it's name and executes the code.
    - While it starts executing the function, it creates a brand new execution context and local memory.
    - When function returns something, it deletes the execution context as well as the local memory. The thread of execution returns to the global execution context and starts executing next lines of code.

#### Q. Javascript is a single threaded language. How does it handle asynchronous tasks?

Ans. `Javascript` is single threaded language. It can not execute multiple programs at the same time. There are several ways it handles `async` tasks.


