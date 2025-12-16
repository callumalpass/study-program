# CSS Introduction

CSS (Cascading Style Sheets) is the language used to style and layout web pages. While HTML provides the structure and content, CSS controls the visual presentation—colors, fonts, spacing, layouts, animations, and responsive design. Understanding CSS is essential for creating visually appealing, professional, and user-friendly websites.

## What is CSS?

CSS is a stylesheet language that describes how HTML elements should be displayed. It separates presentation from content, allowing you to style multiple pages with a single stylesheet and maintain consistent design across an entire website.

CSS works by selecting HTML elements and applying style rules to them. A basic CSS rule consists of a selector and a declaration block:

```css
selector {
    property: value;
    property: value;
}
```

Example:

```css
h1 {
    color: blue;
    font-size: 32px;
    text-align: center;
}
```

This rule selects all `<h1>` elements and makes them blue, 32 pixels tall, and center-aligned.

## History of CSS

CSS has evolved significantly since its inception:

**CSS 1 (1996)**: The first CSS specification introduced basic styling properties like fonts, colors, and text alignment.

**CSS 2 (1998)**: Added positioning, z-index, media types, and improved layout capabilities.

**CSS 2.1 (2011)**: A revision that fixed errors and removed poorly supported features from CSS 2.

**CSS 3 (2012-present)**: The current version, released as modular specifications. Introduced border-radius, shadows, gradients, transitions, animations, flexbox, grid, and custom properties (variables).

CSS 3 is modular, meaning features are developed and released independently rather than as one large specification. This allows browsers to implement features incrementally.

## CSS Syntax

CSS consists of rulesets with this structure:

```css
selector {
    property: value;
    property: value;
}
```

**Selector**: Identifies which HTML elements to style.

**Property**: The aspect you want to change (color, font-size, margin).

**Value**: The setting for that property.

**Declaration**: A property-value pair.

**Declaration block**: All declarations within the curly braces.

```css
/* Selector: p */
/* Property: color */
/* Value: red */
p {
    color: red;           /* Declaration */
    font-size: 16px;      /* Another declaration */
}
/* Everything in {} is the declaration block */
```

### CSS Comments

Comments explain code and are ignored by browsers:

```css
/* This is a single-line comment */

/*
This is a
multi-line
comment
*/

p {
    color: blue;  /* Inline comment */
}
```

## Ways to Link CSS

There are three methods to apply CSS to HTML: inline, internal, and external.

### Inline CSS

CSS written directly in an HTML element's `style` attribute:

```html
<p style="color: red; font-size: 18px;">This paragraph is red.</p>
```

**When to use**: Rarely. Only for quick tests or email templates (which have limited CSS support).

**Disadvantages**:
- Hard to maintain
- No separation of concerns
- Can't be reused
- Overrides other CSS (high specificity)

### Internal CSS

CSS written in a `<style>` tag within the HTML document's `<head>`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Internal CSS Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
        }

        h1 {
            color: navy;
            text-align: center;
        }

        p {
            color: #333;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <h1>Welcome</h1>
    <p>This page uses internal CSS.</p>
</body>
</html>
```

**When to use**: Single-page websites, prototypes, or when page-specific styles are needed.

**Advantages**:
- No extra HTTP request
- Styles are contained within one file

**Disadvantages**:
- Can't be shared across multiple pages
- Makes HTML files larger

### External CSS (Recommended)

CSS written in separate `.css` files and linked to HTML:

**styles.css**:
```css
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
}

h1 {
    color: navy;
    text-align: center;
    margin: 20px 0;
}

p {
    color: #333;
    line-height: 1.6;
    padding: 0 20px;
}
```

**index.html**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>External CSS Example</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Welcome</h1>
    <p>This page uses external CSS.</p>
</body>
</html>
```

**Advantages**:
- Clean separation of content and presentation
- One stylesheet can style multiple pages
- Browser caching improves performance
- Easier to maintain and update
- Allows team collaboration (HTML and CSS developers can work separately)

**When to use**: Always, for production websites.

### Multiple Stylesheets

You can link multiple CSS files:

```html
<head>
    <link rel="stylesheet" href="reset.css">
    <link rel="stylesheet" href="typography.css">
    <link rel="stylesheet" href="layout.css">
    <link rel="stylesheet" href="components.css">
</head>
```

Stylesheets are applied in order, with later rules overriding earlier ones if they have the same specificity.

### @import Rule

You can import one CSS file into another:

```css
/* main.css */
@import url('reset.css');
@import url('typography.css');

body {
    background-color: white;
}
```

**Note**: `@import` can slow down page loading because files are loaded sequentially. Multiple `<link>` tags are generally preferred.

## Basic CSS Properties

Here are some fundamental CSS properties:

### Colors

```css
/* Keyword */
p {
    color: red;
}

/* Hexadecimal */
h1 {
    color: #ff0000;
    color: #f00;  /* Shorthand */
}

/* RGB */
div {
    color: rgb(255, 0, 0);
}

/* RGBA (with transparency) */
span {
    color: rgba(255, 0, 0, 0.5);  /* 50% transparent red */
}

/* HSL (Hue, Saturation, Lightness) */
a {
    color: hsl(0, 100%, 50%);
}

/* HSLA (with transparency) */
button {
    color: hsla(0, 100%, 50%, 0.5);
}
```

### Backgrounds

```css
body {
    background-color: #f0f0f0;
    background-image: url('background.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

/* Shorthand */
body {
    background: #f0f0f0 url('bg.jpg') no-repeat center/cover;
}
```

### Text Styling

```css
p {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    font-weight: bold;      /* or 100-900 */
    font-style: italic;
    text-align: center;     /* left, right, center, justify */
    text-decoration: underline;
    text-transform: uppercase;  /* lowercase, capitalize */
    line-height: 1.6;
    letter-spacing: 2px;
}
```

### Sizing

```css
div {
    width: 300px;
    height: 200px;
    max-width: 100%;
    min-height: 150px;
}
```

### Spacing

```css
/* Margin (space outside element) */
div {
    margin: 20px;                    /* All sides */
    margin: 10px 20px;               /* Top/bottom, left/right */
    margin: 10px 20px 30px 40px;     /* Top, right, bottom, left */
    margin-top: 10px;
}

/* Padding (space inside element) */
div {
    padding: 20px;
    padding: 10px 20px;
    padding: 10px 20px 30px 40px;
    padding-left: 15px;
}
```

## CSS Units

CSS supports various measurement units:

### Absolute Units

**px (pixels)**: Fixed size, most common:
```css
font-size: 16px;
```

**pt (points)**: Used in print, 1pt = 1/72 inch:
```css
font-size: 12pt;
```

### Relative Units

**em**: Relative to parent element's font size:
```css
/* If parent is 16px, 2em = 32px */
font-size: 2em;
```

**rem**: Relative to root element's font size:
```css
/* If root is 16px, 2rem = 32px */
font-size: 2rem;
```

**%**: Percentage of parent:
```css
width: 50%;  /* Half of parent's width */
```

**vw, vh**: Viewport width/height:
```css
width: 50vw;   /* 50% of viewport width */
height: 100vh; /* 100% of viewport height */
```

**vmin, vmax**: Smaller/larger of viewport dimensions:
```css
font-size: 5vmin;  /* 5% of smaller viewport dimension */
```

## The Cascade

The "Cascading" in CSS means styles can come from multiple sources, and conflicts are resolved based on:

### 1. Origin

1. User agent styles (browser defaults)
2. User styles (browser settings)
3. Author styles (your CSS)
4. Author `!important` declarations
5. User `!important` declarations

### 2. Specificity

More specific selectors override less specific ones:

```css
/* Specificity: 0,0,1 (one element) */
p {
    color: blue;
}

/* Specificity: 0,1,0 (one class) */
.highlight {
    color: red;
}

/* Specificity: 1,0,0 (one ID) */
#intro {
    color: green;
}
```

The paragraph with `id="intro"` will be green (highest specificity).

### 3. Source Order

When specificity is equal, the last rule wins:

```css
p {
    color: blue;
}

p {
    color: red;  /* This wins */
}
```

## CSS Best Practices

**Use external stylesheets**: Keep CSS separate from HTML.

**Organize your CSS**: Group related styles, use comments.

**Use meaningful class names**: Descriptive, not presentational.

```css
/* Good */
.error-message { color: red; }

/* Bad */
.red-text { color: red; }
```

**Avoid inline styles**: Use classes instead.

**Use shorthand properties**: More concise and readable.

```css
/* Instead of */
margin-top: 10px;
margin-right: 20px;
margin-bottom: 10px;
margin-left: 20px;

/* Use */
margin: 10px 20px;
```

**Minimize use of !important**: It makes debugging harder.

**Use CSS variables for repeated values**: Easier to maintain.

```css
:root {
    --primary-color: #007bff;
}

button {
    background-color: var(--primary-color);
}
```

## Browser Developer Tools

All modern browsers include developer tools for inspecting and debugging CSS:

**Chrome/Edge**: F12 or Ctrl+Shift+I (Cmd+Option+I on Mac)

**Firefox**: F12 or Ctrl+Shift+I (Cmd+Option+I on Mac)

**Safari**: Cmd+Option+I (enable Developer menu first)

Developer tools let you:
- Inspect element styles
- See which rules apply and why
- Edit CSS in real-time
- Test different values
- Debug layout issues

## Complete Example

**index.html**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Introduction</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Welcome to CSS</h1>
    </header>

    <main>
        <p class="intro">CSS controls the visual presentation of web pages.</p>
        <p>With CSS, you can style text, layout elements, and create responsive designs.</p>
    </main>

    <footer>
        <p>&copy; 2025 CSS Guide</p>
    </footer>
</body>
</html>
```

**styles.css**:
```css
/* Reset default margin/padding */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Body styles */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
}

/* Header */
header {
    background-color: #007bff;
    color: white;
    padding: 20px;
    text-align: center;
}

header h1 {
    font-size: 2.5rem;
}

/* Main content */
main {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.intro {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 20px;
}

p {
    margin-bottom: 15px;
}

/* Footer */
footer {
    text-align: center;
    padding: 20px;
    background-color: #333;
    color: white;
    margin-top: 40px;
}
```

## Conclusion

CSS is the styling language of the web, transforming plain HTML into visually rich, engaging experiences. By understanding CSS syntax, linking methods, basic properties, and the cascade, you have the foundation for creating beautiful, maintainable stylesheets. As you progress, you'll learn advanced selectors, layout techniques like flexbox and grid, and responsive design principles that make modern web development powerful and flexible.
