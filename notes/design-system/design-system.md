# Design System Architecture

Ref: https://varun.ca/styled-system-revisited/

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

## Forwarding Refs

Each component should return a single HTML element that accepts all HTML props, including className, style and accessibility attributes. Which means you need to consider ref forwarding.

Encapsulation is desirable for application-level components (Features), it can be inconvenient for highly reusable “leaf” components like FancyButton or MyTextInput. These components tend to be used throughout the application in a similar manner as a regular DOM button and input, and accessing their DOM nodes may be unavoidable for managing focus, selection, or animations.

Ref forwarding is an opt-in feature that lets some components take a ref they receive, and pass it further down (in other words, “forward” it) to a child.

## Polymorphic Components

keeping the styling same they allow you to render a different HTML tag or a different custom component.

## styled-system

The foundation of `styled-system` API is the [Design Graph](/notes/design-system/design-graph.md) - constaint based system of organizing styles in UI design. There are four parts in it.
