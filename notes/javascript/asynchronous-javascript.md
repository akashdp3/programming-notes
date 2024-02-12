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


