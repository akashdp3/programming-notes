# Known Issues

These are the issues that might appear in future. This document will contain errors along with their possible solutions (or hints where to look for).

## Typescript

### Fixing "Duplicate identifier 'FormData'"

Ever since `@types/styled-components` version 4.1.19, it has had a dependency on both `@types/react` and `@types/react-native`. Unfortunately, those declarations clash; for more information, see [issue 33311](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33311) and [issue 33015](https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33015) in the DefinitelyTyped repo.

You may run into this conflict even if you're not importing anything from react-native or don't have it installed. This is because some package managers hoist packages to the top-level node_modules folder, and the TypeScript compiler automatically includes types from all folders in node_modules/@types by default.

The TypeScript compiler allows you to opt-out of this behavior [using the typeRoots and types configuration options](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#types-typeroots-and-types), and the best solution for this error — for now — seems to be to opt out the automatic inclusion of node_modules/@types and instead list the types you want to be included individually.

In your `tsconfig.json`, set the types array under the compilerOptions like so:

```json
{
  "compilerOptions": {
    "types": ["node", "react", "styled-components", "jest"]
  }
}
```

Of course, customize the array based on the @types/ packages you have installed for your project.

Ref: https://primer.style/react/getting-started#fixing-duplicate-identifier-formdata
