# Primer Design System

Primer is built for Github by Github.

### Reasons for creating Primer

- Familliar patterns (leads to better `User Experience`)
- Accessibility (leads to `Inclusion` i.e. people from different backgrounds)
- Helps in creating responsive-friendly and accessible designs
- Letting teams focus on bigger/business problems

## Component Lifecycle

### Experimental

Proof-of-concept components - Not recommended to use,

### Alpha

The component is ready for preliminary usage, breaking changes are expected.

- [ ] No external dependencies
- [ ] Customizable to different themes without touching APIs of the component
- [ ] Responsive
- [ ] Basic documentation
- [ ] Unit test coverage
- [ ] Regression coverage of different states (default and interactive)
- [ ] Accessibility (tested through [axe](https://www.deque.com/axe/))

### Beta

The component reaches maturity

- [ ] Component is being used in atleast 3 production application
- [ ] Detailed usage guidelines
- [ ] Reviewed by system designers
- [ ] Supports server-side rendering (SSR)
- [ ] Performant on it's own as well as does not affect other components

### Stable

The component is significantly mature

- [ ] No breaking changes for at least one month
- [ ] Documentation includes detailed information about all props, variations, accessibility guidelines and common scenarios
- [ ] Tooling is setup to prevent further use of alternatives

### Deprecated

The component will be removed in the future

- [ ] Documentation is created for deprecation
- [ ] Show warning to developers when using the component

### Removed

The component is removed

## Color

- Supports color modes (also can be called themes)
- Uses `design tokens` for colors
  - `Design tokens are a layer of abstraction that allows better maintainability, consistency and easy theming.`
- Color design tokens fall into three different categories
  - **Presentational**
    - To use colors as it is.
    - These colors are named by color and lightness. Ex, `scale.blue.5`.
    - Does not support theming.
  - **Functional**
    - To convey a meaning or state.
    - Ex. From functional perspective, green is used for positive messaging. Green shades are named with prefix `success`
    - Does not support theming // ? confirm
  - **Component**
    - To represent specific use case within component.
    - Ex, `button.bg` references from the system to be used as background of button component

### Color Accessibility

Contrast Requirements

- 4.5:1 for normal text
- 3:1 for large text (>24px)
- 3:1 for UI elements and graphics
- No contrast requirement for decorative and disabled elements

```
Colors used in components are tested to be designers while developing design system
```

## View Point

Minimum viewpoint support

- Minimum viewport width: 320px
- Minimum viewport height: 256px

Reference: https://www.w3.org/WAI/WCAG21/Understanding/reflow.html

## CSS Utilities

Just like tailwind, utility based css

- Utility classes should only one job and they should do it well.
- Recommended approach in overriding component styles
- Reduces the need to write custom styles

## Reponsiveness

| Breakpoint | Size   |
| ---------- | ------ |
| `xsmall`   | 320px  |
| `small`    | 544px  |
| `medium`   | 768px  |
| `large`    | 1012px |
| `xlarge`   | 1280px |
| `xxlarge`  | 1400px |

## Typography

- Typography design tokens use `rem` units for accessibility (browser zoom)
- Line height values are unitless and aligned to 4px grid.

## Dependencies

### Peer Dependencies

- react
- react-dom
- styled-components@5

### Server Side Rendering

- Uses `styled-components` SSR implementation to handle server-side and client-side rendering.

### Typescript

- Uses typescript type
- There is no seperate `@types/primer/react`. Types can be imported from same package i.e.`@primer/react`

### styled-system vs `sx prop`

## Color modes and color schemes

The `color mode` of an application is the theme (day, night etc) where `color scheme` refers to collection of colors that are associated with a paricular `color mode`.

For ex, the `light` scheme is displayed when the application is in `day` mode and the `dark` scheme is displayed in `night` mode.

`colorMode` can be used to set theme of the application in `ThemeProvider`

Ref: https://primer.style/react/theming#color-modes-and-color-schemes

## Theme Reference

Looks like they are following same pattern in theme object as instazen-ui or react-ui except for colors. From the first glance, it looks like colors are categorized based on their use in components.

For ex, avatar, overlay, outline, btn, input etc

There are repeated colors.

## Types of components

### Building Block Components

Building block components are basically atom components, basic in their functions and can be used together with other components.

Ex, `Button`, `Input`, `Link`, `Avatar`

### Pattern Components

Patterns components are basically molecules, which are basically built using multiple building block components.

### Helper Components

Helper components can be understood as layout components or HOCs.
