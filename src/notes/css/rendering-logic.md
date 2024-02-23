# Rendering Logic

## Introduction

The goal of `CSS` is to allow control over appearance and layout of your app's content.

- When we are starting with scratch with an `html` document, it comes with some built-in styles. These styles are browser specific.


## Basic terminology for CSS

```CSS
.error-text {
    margin: 32px;
}
```

In the above example, let's talk about different stuff:

The entire example is a `rule`. It consists of styles that need to be applied for a particular element.

Here a set of style is being applied to element with class `.error-text`.
- `.error-text` is a class selector.
- `margin: 32px` is called declaration. Within the declartion, `margin` is the property and `32px` is the value.

## Pseudo-classes

Pseudo classes basically help in styling different states of a particular `html` element.

Ex. when we want to change background color of button on hover, I will do something like this.

```CSS
button {
    color: blue;
}

button:hover {
    color: red;
}
```

Similar to this, there are other pseudo classes like `:focus`, `:checked`.

Note: Apart from different states, it is also possible to apply styles conditionally. Some of these examples are `first-child`, `last-child`, `first-of-type` and `last-of-type`.

<!-- TODO: write difference between `first-child` and `first-of-type` -->

## Pseudo-elements

Pseudo elements are like pseudo-classes, but they target `sub-elements` within the an element instead of different states.

For ex, i can apply style to a placeholder of an input.

```html
<style>
    input {
        font-size: 16px;
    }
    input::placeholder {
        color: red;
    }
</style>

<div>
    <input type="text" placeholder="This is a placeholder." />
</div>
```

## Inheritance

 elementLet's see following example

```html
<style>
    p {
        color: deeppink;
    }
</style>

<p>
    This is a <em>deeppink</em> text
</p>
```

As you can see, I have applied styles to `p` tag and there is `em` tag inside of `p`.

But the entire sentence `This is a deeppink text` is colored even through we haven't applied any style to `em`. This is because `em` inherits color property from it's parent i.e. `p` tag.

By default, Not all property is inhertable. Mostly typography related properties can be inherited. This is by design to improve developer experience (DX).

[List of CSS Properties that are inherited](https://www.sitepoint.com/css-inheritance-introduction/#list-css-properties-inherit)

`inherit` property can be used to force one element to inherit style from parent.

```html
<style>
    p {
        border: 1px solid deeppink;
    }
    em {
        border: inherit;
    }
</style>

<p>
    This is a <em>text</em>
</p>
```

## The Cascade / Specificity

When the browser needs to display any element on the screen, it first needs to figure out what all styles to apply to it. For that, it collects all styles that targets the particular element. Then, based on selector (how specific is the selector for the element), it applies relevant styles.

It can be thought of something like this:


```javascript
const appliedStyles = {
    ...inheritedStyles,
    ...tagStyles,
    ...classStyles,
    ...idStyles,
    ...inlineStyles,
    ...importantStyles
};
```

## Block & Inline Directions

CSS has two directions:

- `block` (vertical)
- `inline` (horizontal)

## The Box Model

The box model is a pattern using which browser dictates layout.

There are four aspects of box model

- Margin
- Border
- Padding
- Content

### Box Sizing

Box sizing basically defines how browser should adjust height and width of element relative to padding and border.

If `box-sizing` is set to `content-box`, defined height and width is set to the content of box model and padding, border are added on top of that.

```html
<style>
    section {
        width: 500px;
    }
    .box {
        width: 100%;
        padding: 20px;
        border: 4px solid;
    }
</style>
<section>
    <div class="box"></div>
</section>
```

This will create a container which will of width 548px and 48px height. If `.box` has `box-sizing` set to `border-box`, it will apply the width to the `Border box` (which includes border, padding and content) and content's dimension is adjusted accordingly.

```html
<style>
    section {
        width: 500px;
    }
    .box {
        width: 100%;
        padding: 20px;
        border: 4px solid;
        box-sizing: border-box;
    }
</style>
```

This ensures that the width of the container is set to 500px which is normally what we expect when applying dimension to any element.

It is recommended to apply following styles before starting any project:

```css
*,
*::before,
*::after {
    box-sizing: border-box;
}
```

### Border

- By default, border inherits `currentColor` as border color if `border-color` is not specified.
- Outline & Border look and work similarly expect that any change in `outline` does not effect the element layout.
- There is one property called `outline-offset` which can be used to add some space between outline and border.
- Outlines are basically used for focusing interactive elements for keyboard accessibility.

### Margin

- Unlike `padding` and `border`, `margin` can have negative values.
    - Using negative margins, we can change element's and its siblings position.
- `margin` can be set to `auto` which browser will interpret as filling up maximum available space.
    - This only works for horizontal margins. It does not have any effect on vertical margins.
    - For `auto` to work, element must have fixed width defined.

