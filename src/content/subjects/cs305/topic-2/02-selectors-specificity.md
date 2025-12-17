# CSS Selectors and Specificity

Selectors are patterns that identify which HTML elements to style. Understanding selectors and specificity is crucial for writing efficient, maintainable CSS and avoiding conflicts when multiple rules target the same element. Mastering these concepts allows you to precisely target elements and control which styles take precedence.

## Basic Selectors

### Universal Selector

The asterisk (*) selects all elements:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

Useful for CSS resets but can impact performance if overused.

### Type Selector (Element Selector)

Selects all elements of a specific type:

```css
p {
    color: blue;
}

h1 {
    font-size: 2rem;
}

div {
    border: 1px solid gray;
}
```

### Class Selector

Selects elements with a specific class attribute. Prefix with a dot (.):

```css
.highlight {
    background-color: yellow;
}

.error {
    color: red;
    font-weight: bold;
}
```

HTML:
```html
<p class="highlight">This is highlighted.</p>
<span class="error">Error message</span>
```

Elements can have multiple classes:

```html
<p class="highlight error">Highlighted error</p>
```

```css
.highlight {
    background-color: yellow;
}

.error {
    color: red;
}
/* Element gets both styles */
```

### ID Selector

Selects a single element with a specific ID. Prefix with hash (#):

```css
#header {
    background-color: navy;
}

#main-content {
    padding: 20px;
}
```

HTML:
```html
<div id="header">Header</div>
<main id="main-content">Content</main>
```

**Important**: IDs should be unique per page. Use classes for styling multiple elements.

### Attribute Selector

Selects elements based on attributes:

```css
/* Elements with specific attribute */
[disabled] {
    opacity: 0.5;
}

/* Exact attribute value */
[type="text"] {
    border: 1px solid blue;
}

/* Attribute contains value */
[class*="btn"] {
    padding: 10px;
}

/* Attribute starts with value */
[href^="https"] {
    color: green;
}

/* Attribute ends with value */
[href$=".pdf"] {
    background: url('pdf-icon.png') no-repeat;
}

/* Attribute contains word */
[class~="active"] {
    font-weight: bold;
}

/* Attribute starts with value followed by hyphen */
[lang|="en"] {
    color: blue;
}
```

Examples:
```html
<input type="text" class="form-input">     <!-- Matched by [type="text"] -->
<button class="btn-primary">Click</button>  <!-- Matched by [class*="btn"] -->
<a href="https://example.com">Link</a>      <!-- Matched by [href^="https"] -->
<a href="document.pdf">PDF</a>              <!-- Matched by [href$=".pdf"] -->
```

## Combinators

Combinators show relationships between selectors.

### Descendant Combinator (space)

Selects elements that are descendants of another element:

```css
div p {
    color: blue;
}
```

Selects all `<p>` elements inside `<div>`, regardless of depth:

```html
<div>
    <p>Selected</p>
    <section>
        <p>Also selected</p>
    </section>
</div>
```

### Child Combinator (>)

Selects direct children only:

```css
div > p {
    color: blue;
}
```

```html
<div>
    <p>Selected (direct child)</p>
    <section>
        <p>Not selected (grandchild)</p>
    </section>
</div>
```

### Adjacent Sibling Combinator (+)

Selects the immediately following sibling:

```css
h1 + p {
    font-weight: bold;
}
```

```html
<h1>Heading</h1>
<p>This paragraph is selected (immediately follows h1)</p>
<p>This paragraph is not selected</p>
```

### General Sibling Combinator (~)

Selects all following siblings:

```css
h1 ~ p {
    color: gray;
}
```

```html
<h1>Heading</h1>
<p>Selected</p>
<div>Not a paragraph</div>
<p>Also selected (any following sibling p)</p>
```

## Pseudo-Classes

Pseudo-classes select elements based on state or position:

### Link and Interaction States

```css
/* Unvisited link */
a:link {
    color: blue;
}

/* Visited link */
a:visited {
    color: purple;
}

/* Mouse hover */
a:hover {
    color: red;
    text-decoration: underline;
}

/* Active (being clicked) */
a:active {
    color: orange;
}

/* Keyboard focus */
input:focus {
    outline: 2px solid blue;
    border-color: blue;
}
```

**LVHA Order**: Link, Visited, Hover, Active. This order matters for correct functionality.

### Form States

```css
/* Enabled input */
input:enabled {
    background-color: white;
}

/* Disabled input */
input:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
}

/* Checked checkbox/radio */
input:checked {
    background-color: green;
}

/* Valid input */
input:valid {
    border-color: green;
}

/* Invalid input */
input:invalid {
    border-color: red;
}

/* Required field */
input:required {
    border-left: 3px solid red;
}

/* Optional field */
input:optional {
    border-left: 3px solid gray;
}
```

### Structural Pseudo-Classes

```css
/* First child */
p:first-child {
    font-weight: bold;
}

/* Last child */
p:last-child {
    margin-bottom: 0;
}

/* Only child */
p:only-child {
    text-align: center;
}

/* nth-child */
li:nth-child(2) {
    color: blue;  /* Second li */
}

li:nth-child(odd) {
    background-color: #f0f0f0;  /* Odd rows */
}

li:nth-child(even) {
    background-color: white;  /* Even rows */
}

li:nth-child(3n) {
    color: red;  /* Every third item */
}

/* nth-of-type */
p:nth-of-type(2) {
    color: green;  /* Second p element */
}

/* First of type */
p:first-of-type {
    font-size: 1.2rem;
}

/* Last of type */
p:last-of-type {
    margin-bottom: 0;
}
```

### Other Useful Pseudo-Classes

```css
/* Element without a class */
div:not(.special) {
    border: 1px solid gray;
}

/* Root element (html) */
:root {
    --primary-color: blue;
}

/* Empty elements */
p:empty {
    display: none;
}
```

## Pseudo-Elements

Pseudo-elements style specific parts of elements. Use double colon (::) syntax:

```css
/* First letter */
p::first-letter {
    font-size: 2rem;
    font-weight: bold;
    float: left;
}

/* First line */
p::first-line {
    font-weight: bold;
    color: blue;
}

/* Before element content */
h1::before {
    content: "→ ";
    color: red;
}

/* After element content */
h1::after {
    content: " ←";
    color: red;
}

/* Selection highlight */
::selection {
    background-color: yellow;
    color: black;
}

/* Placeholder text */
input::placeholder {
    color: #999;
    font-style: italic;
}
```

## Grouping Selectors

Apply the same styles to multiple selectors:

```css
h1, h2, h3 {
    font-family: Arial, sans-serif;
    color: navy;
}

.error, .warning, .info {
    padding: 10px;
    border-radius: 4px;
}
```

## Specificity Calculation

When multiple rules target the same element, specificity determines which styles apply. Specificity is calculated as a four-part value: (inline, IDs, classes/attributes/pseudo-classes, elements/pseudo-elements).

### Specificity Formula

Specificity is calculated using the formula:

$$S = (a, b, c, d)$$

Where:
- $a$ = inline styles (1 if present, 0 otherwise)
- $b$ = number of ID selectors
- $c$ = number of class selectors, attribute selectors, and pseudo-classes
- $d$ = number of type selectors and pseudo-elements

The specificity value is compared left-to-right: $(1,0,0,0) > (0,5,0,0) > (0,0,10,0)$

### Specificity Values

```css
/* Specificity: (0,0,0,1) */
p {
    color: blue;
}

/* Specificity: (0,0,1,0) */
.text {
    color: red;
}

/* Specificity: (0,1,0,0) */
#main {
    color: green;
}

/* Inline style: (1,0,0,0) */
<p style="color: purple;">
```

### Specificity Examples

```css
/* 0,0,0,1 - one element */
p { }

/* 0,0,1,0 - one class */
.intro { }

/* 0,1,0,0 - one ID */
#header { }

/* 0,0,1,1 - one class, one element */
p.intro { }

/* 0,0,2,0 - two classes */
.intro.highlight { }

/* 0,1,1,1 - one ID, one class, one element */
div#main.content { }

/* 0,0,2,2 - two classes, two elements */
ul.nav li.active { }

/* 0,1,0,1 - one ID, one element */
#header h1 { }

/* 0,0,3,3 - three classes, three elements */
nav.main ul.menu li.item { }
```

### Specificity Order

Higher specificity wins:

```css
/* Specificity: 0,0,0,1 */
p {
    color: blue;
}

/* Specificity: 0,0,1,0 - WINS */
.text {
    color: red;
}
```

The paragraph with `class="text"` will be red.

### Specificity Tie

When specificity is equal, the last rule wins:

```css
.text {
    color: blue;
}

.text {
    color: red;  /* WINS (last rule) */
}
```

### The !important Override

`!important` overrides all other declarations, regardless of specificity:

```css
p {
    color: blue !important;
}

#intro {
    color: red;  /* Doesn't apply, blue wins due to !important */
}
```

**Avoid !important**: It makes debugging difficult and creates specificity wars. Use only as a last resort.

### Calculating Specificity

Count each type of selector:

```css
/* div.container nav.menu li.active a:hover */
/* Elements: div, nav, li, a = 4 */
/* Classes: .container, .menu, .active = 3 */
/* Pseudo-classes: :hover = 1 (counts as class) */
/* Total: (0,0,4,4) - 0 IDs, 0+3+1=4 classes/pseudo-classes, 4 elements */
```

#### Specificity Calculation Example

For selector `div#header.main nav ul.menu li.active:hover`:

$$S = (a, b, c, d)$$

Counting each component:
- $a = 0$ (no inline styles)
- $b = 1$ (one ID: `#header`)
- $c = 1 + 1 + 1 + 1 = 4$ (classes: `.main`, `.menu`, `.active`, pseudo-class: `:hover`)
- $d = 4$ (elements: `div`, `nav`, `ul`, `li`)

$$S = (0, 1, 4, 4)$$

Correct calculation:
- Inline styles: $(1,0,0,0)$
- IDs: $(0,1,0,0)$
- Classes, attributes, pseudo-classes: $(0,0,1,0)$
- Elements, pseudo-elements: $(0,0,0,1)$

### Specificity Calculator Example

```css
/* Which color wins? */

p { color: blue; }                    /* 0,0,0,1 */
.text { color: red; }                 /* 0,0,1,0 - WINS if class exists */
#intro { color: green; }              /* 0,1,0,0 - WINS if ID exists */
div p { color: purple; }              /* 0,0,0,2 */
div.container p { color: orange; }    /* 0,0,1,2 */
```

For `<p class="text" id="intro">`:
- The `#intro` rule wins (0,1,0,0 is highest)

## Best Practices

**Use classes for styling**: More flexible and reusable than IDs.

**Avoid excessive specificity**: Keep selectors simple for easier maintenance.

```css
/* Bad (too specific) */
div#container nav.main-nav ul li a.link { }

/* Good (simpler) */
.nav-link { }
```

**Avoid !important**: Indicates poor CSS architecture.

**Use meaningful class names**: Describe purpose, not appearance.

```css
/* Good */
.error-message { }
.primary-button { }

/* Bad */
.red-text { }
.big-blue-btn { }
```

**Organize selectors logically**: Group related styles.

```css
/* Layout */
.container { }
.grid { }

/* Components */
.button { }
.card { }

/* Utilities */
.text-center { }
.mt-20 { }
```

**Leverage cascade**: Let simpler rules apply, override only when necessary.

```css
/* Base styles */
button {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
}

/* Specific variations */
.button-primary {
    background-color: blue;
    color: white;
}
```

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Selectors and Specificity</title>
    <style>
        /* Universal selector */
        * {
            box-sizing: border-box;
        }

        /* Element selector */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }

        /* Class selector */
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }

        /* ID selector */
        #header {
            background-color: navy;
            color: white;
            padding: 20px;
        }

        /* Descendant combinator */
        .menu li {
            list-style: none;
            display: inline-block;
        }

        /* Child combinator */
        .menu > li {
            margin-right: 15px;
        }

        /* Pseudo-class */
        a:hover {
            color: red;
        }

        /* Pseudo-element */
        .intro::first-letter {
            font-size: 2rem;
            font-weight: bold;
        }

        /* Attribute selector */
        [type="text"] {
            border: 1px solid #ccc;
            padding: 8px;
        }

        /* Multiple selectors */
        h1, h2, h3 {
            color: navy;
        }

        /* Specificity example */
        p { color: blue; }              /* 0,0,0,1 */
        .text { color: red; }           /* 0,0,1,0 - wins */
        #intro { color: green; }        /* 0,1,0,0 - wins over .text */
    </style>
</head>
<body>
    <div id="header">
        <h1>CSS Selectors</h1>
        <ul class="menu">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
        </ul>
    </div>

    <div class="container">
        <p class="intro text" id="intro">
            This paragraph demonstrates selector specificity.
        </p>
        <input type="text" placeholder="Enter text">
    </div>
</body>
</html>
```

## Conclusion

CSS selectors and specificity are fundamental to effective styling. By mastering basic selectors, combinators, pseudo-classes, and pseudo-elements, you can precisely target any element. Understanding specificity helps you write predictable CSS that scales well and avoids conflicts. Use classes for most styling, keep specificity low, and organize your CSS logically for maximum maintainability.
