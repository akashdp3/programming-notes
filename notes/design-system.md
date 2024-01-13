# Design System

## Component Hierarchy

Not all components are built the same way. A component might be created using styled-components or a combination of styled-components and Styled System or as a composition of other components. I recommend using the following hierarchy to reason as to what technique to use for creating components.

- **Elements** are basic reusable building blocks of the system.
- **Patterns** are reusable building blocks made up of elements or other patterns.
- **Features** are a set of patterns, elements, & styles that come together to support a specific user task. Sometimes referred to as container components.
- **Layouts** are how features come together to form a page.

```
The design system would generally be limited to Elements and Patterns. Ideally, you should define Features and Layouts in the application.
```

```note
Note, this is a framework for guiding architectural choices. I do not recommend categorizing components in code. A component might start as an Element and evolve into a Pattern. Category based folder structure leads to unnecessary overhead and can hinder this natural evolution.
```
