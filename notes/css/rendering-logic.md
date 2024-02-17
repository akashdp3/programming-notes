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

Let's see following example

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
</style>

<p>

</p>
```
