# Styled System

Ref: https://github.com/styled-system/styled-system

According to it's documentation, it is

```
Responsive, theme-based style props for building design systems with React.
```

## Problems it is trying to solve

- The main aim of this is to make the process of styling components more convenient, consistent and efficient.
- Provides better way to handle
  - Consistent API(or props) to handle component styling
  - Better and efficient way to handle responsive styles
  - Faster frontend development
  - More consistent UI

## How it solves

The foundation of `styled-system` is [Design Graph](design-graph.md). It contains four parts

#### Scales

- These are basically design tokens.
- Defines `typography`, `colors`, `icons` and `spacings`
- Subset of design tokens that map to specific CSS style properties. For example, typography tokens can map to font-size, font-weight and line-height scales.

#### Theme

- Collection of `scales` that are maintained in `theme.ts`
- Can have multiple version of themes (ex, light, dark, dim)
- Recommended to conform to https://system-ui.com/theme
- Ex: https://github.com/rangle/radius/blob/d21532c3cfa05137dd71f0b0601f44e5d40d57d8/packages/ds/src/theme.ts

```javascript
import { lighten, darken } from "polished";

export const fonts = {
  body: '"Helvetica Neue", Roboto, sans-serif',
  heading: '"Roboto", sans-serif',
  monospace: "Menlo, monospace",
};

export const fontSizes = [
  "0.625rem",
  "0.75rem",
  "1rem",
  "1.125rem",
  "1.25rem",
  "1.5rem",
  "1.75rem",
  "2rem",
  "2.5rem",
  "3rem",
];

export const fontWeights = {
  regular: 400,
  medium: 500,
  bold: 700,
};

export const lineHeights = {
  solid: 1,
  title: 1.25,
  copy: 1.5,
};

export const letterSpacings = {
  default: "normal",
  tracked: "0.04em",
};

export const space = [0, 4, 8, 16, 32, 64, 128, 256, 512];
export const sizes = [8, 16, 32, 64, 128, 256, 512, 768, 1024, 1536];

export const breakpoints = ["40em", "56em", "64em"];

export default {
  light: {
    space,
    sizes,
    fonts,
    fontSizes,
    fontWeights,
    lineHeights,
    letterSpacings,
    breakpoints,
    colors: {
      brand: {
        primary: "#012E86",
        secondary: "#0064D9",
        accent: "#DB7C00",
        muted: "#C6DAF7",
      },
      ui: {
        primary: "#262626",
        secondary: "#757575",
        tertiary: "#F1F1F1",
        quaternary: "#FFFFFF",
        disabled: "#DEDEDE",
        error: "#D0421B",
        success: "#138000",
      },
      bg: {
        primary: "#FFFFFF",
        secondary: "#F1F1F1",
      },
      text: {
        primary: "#262626",
        secondary: "#757575",
        disabled: "#9C9C9C",
        inverse: "#FFFFFF",
        error: "#D0421B",
        success: "#138000",
      },
      highlights: {
        primaryHighlight: darken(0.1, "#012E86"),
        primaryExtraHighlight: darken(0.2, "#012E86"),
        bgHighlight: darken(0.1, "#FFFFFF"),
      },
    },
  },
  dark: {
    space,
    sizes,
    fonts,
    fontSizes,
    fontWeights,
    lineHeights,
    letterSpacings,
    breakpoints,
    colors: {
      brand: {
        primary: "#298DFF",
        secondary: "#7CAEE8",
        accent: "#FDB447",
        muted: "#B7CBEA",
      },
      ui: {
        primary: "#FFFFFF",
        secondary: "#A1A1A1",
        tertiary: "#3C3C3C",
        quaternary: "#262626",
        disabled: "#242424",
        error: "#FF4D4D",
        success: "#1CBD00",
      },
      bg: {
        primary: "#111111",
        secondary: "#262626",
      },
      text: {
        primary: "#FFFFFF",
        secondary: "#A1A1A1",
        disabled: "#525252",
        inverse: "#262626",
        error: "#FF4D4D",
        success: "#1CBD00",
      },
      highlights: {
        primaryHighlight: lighten(0.1, "#298DFF"),
        primaryExtraHighlight: lighten(0.2, "#298DFF"),
        bgHighlight: lighten(0.1, "#111111"),
      },
    },
  },
};
```

#### Components

Components mean general UI components. Ex, button, input etc

A basic text component can look something like this:

```typescript
import styled from "styled-components";

import { space, layout, color } from "styled-system";

export const Text = styled.p(space, color);
```

The above component can be rendered as follows:

```jsx
<Text color="text.primary">Hello World</Text>
```

#### Variants

In components, there are scenarios where a component can have multiple variants. For example, in any frontend application, for texts, there are atleast two variants i.e. `title` and `body`. `styled-system` has a way to define variants for any component. It looks something like this.

Let's add `title` and `body` variants to above button component

```jsx
const textVariants = variant({
  variants: {
    title: {
      fontSize: 4,
      lineHeight: "title",
    },
    body: {
      fontSize: 2,
      lineHeight: "copy",
    },
  },
});

export const Text = styled.p(
  textVariants,
  compose(space, color, layout, flexbox, border, position, typography)
);
```

This component can be used as:

```jsx
<Text variant="title">This is the title</Text>
<Text variant="body">This is the title</Text>
```
