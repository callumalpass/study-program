# Selecting Elements

Selecting elements from the DOM is one of the most fundamental operations in web development. JavaScript provides several methods to find and access elements, each with different use cases and performance characteristics.

## The getElementById Method

The most performant way to select a single element by its unique ID attribute.

```javascript
const header = document.getElementById('main-header');
console.log(header); // Returns the element or null if not found
```

```html
<header id="main-header">
  <h1>My Website</h1>
</header>

<script>
  const header = document.getElementById('main-header');

  if (header) {
    console.log(header.tagName); // "HEADER"
    console.log(header.id); // "main-header"
  } else {
    console.log('Element not found');
  }
</script>
```

Key points:
- Only returns a single element (IDs should be unique)
- Returns `null` if no element is found
- Very fast because browsers maintain an internal ID index
- No need for the `#` prefix (unlike CSS selectors)

## The querySelector Method

Returns the first element that matches a CSS selector. This is incredibly flexible and uses the same syntax as CSS.

```javascript
// By ID
const header = document.querySelector('#main-header');

// By class
const button = document.querySelector('.btn-primary');

// By tag
const paragraph = document.querySelector('p');

// Complex selectors
const firstLink = document.querySelector('nav a.active');
const input = document.querySelector('input[type="email"]');
```

```html
<nav>
  <a href="/" class="active">Home</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
</nav>

<script>
  // Get the first link
  const firstLink = document.querySelector('nav a');
  console.log(firstLink.textContent); // "Home"

  // Get the active link
  const activeLink = document.querySelector('nav a.active');
  console.log(activeLink.href);

  // Get a specific attribute
  const emailInput = document.querySelector('input[type="email"]');

  // Descendant selector
  const navHome = document.querySelector('nav > a:first-child');

  // Pseudo-class selector
  const lastParagraph = document.querySelector('p:last-of-type');
</script>
```

## The querySelectorAll Method

Returns all elements that match a CSS selector as a NodeList (array-like object).

```javascript
const allButtons = document.querySelectorAll('.btn');
const allListItems = document.querySelectorAll('ul li');
const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
```

```html
<ul id="menu">
  <li class="item">Home</li>
  <li class="item">About</li>
  <li class="item">Services</li>
  <li class="item">Contact</li>
</ul>

<script>
  const items = document.querySelectorAll('.item');

  console.log(items.length); // 4
  console.log(items instanceof NodeList); // true

  // Iterate using forEach
  items.forEach((item, index) => {
    console.log(`${index}: ${item.textContent}`);
  });

  // Convert to array for more methods
  const itemsArray = Array.from(items);
  const filtered = itemsArray.filter(item =>
    item.textContent.includes('e')
  );

  // Or using spread operator
  const itemsArray2 = [...items];
  const mapped = itemsArray2.map(item => item.textContent.toUpperCase());
</script>
```

## Legacy Selection Methods

These older methods are still supported but `querySelector` and `querySelectorAll` are generally preferred.

### getElementsByClassName

Returns a live HTMLCollection of elements with the specified class name.

```javascript
const buttons = document.getElementsByClassName('btn');
console.log(buttons.length);

// Note: The collection is live - it updates automatically
const container = document.getElementById('container');
container.innerHTML += '<button class="btn">New Button</button>';
console.log(buttons.length); // Increased by 1
```

### getElementsByTagName

Returns a live HTMLCollection of elements with the specified tag name.

```javascript
const paragraphs = document.getElementsByTagName('p');
const allElements = document.getElementsByTagName('*'); // All elements

for (let p of paragraphs) {
  console.log(p.textContent);
}
```

### getElementsByName

Returns a live NodeList of elements with the specified name attribute (mainly for form elements).

```javascript
const radios = document.getElementsByName('gender');
radios.forEach(radio => {
  if (radio.checked) {
    console.log('Selected:', radio.value);
  }
});
```

## Selecting Within a Context

You can call selection methods on any element, not just the document.

```javascript
const sidebar = document.getElementById('sidebar');

// Only search within the sidebar
const sidebarLinks = sidebar.querySelectorAll('a');
const sidebarHeading = sidebar.querySelector('h2');
```

```html
<div id="main-content">
  <article>
    <h2>Article Title</h2>
    <p class="intro">Introduction paragraph</p>
    <p>Main content</p>
  </article>
</div>

<aside id="sidebar">
  <h2>Related Links</h2>
  <ul>
    <li><a href="#">Link 1</a></li>
    <li><a href="#">Link 2</a></li>
  </ul>
</aside>

<script>
  // Get only links within the sidebar
  const sidebar = document.getElementById('sidebar');
  const sidebarLinks = sidebar.querySelectorAll('a');
  console.log(sidebarLinks.length); // 2

  // Get only paragraphs within the article
  const article = document.querySelector('article');
  const articleParagraphs = article.querySelectorAll('p');
  console.log(articleParagraphs.length); // 2
</script>
```

## Advanced Selector Techniques

### Attribute Selectors

```javascript
// Exact match
const emailInputs = document.querySelectorAll('[type="email"]');

// Contains
const externalLinks = document.querySelectorAll('a[href*="http"]');

// Starts with
const secureLinks = document.querySelectorAll('a[href^="https"]');

// Ends with
const pdfLinks = document.querySelectorAll('a[href$=".pdf"]');

// Has attribute
const requiredInputs = document.querySelectorAll('input[required]');
```

### Pseudo-Classes

```javascript
// First and last child
const firstItem = document.querySelector('li:first-child');
const lastItem = document.querySelector('li:last-child');

// Nth child
const thirdItem = document.querySelector('li:nth-child(3)');
const evenItems = document.querySelectorAll('li:nth-child(even)');
const oddItems = document.querySelectorAll('li:nth-child(odd)');

// Not selector
const unvisitedLinks = document.querySelectorAll('a:not(.visited)');

// Checked inputs
const checkedInputs = document.querySelectorAll('input:checked');

// Disabled elements
const disabledButtons = document.querySelectorAll('button:disabled');
```

### Combining Selectors

```javascript
// Multiple selectors (OR)
const elements = document.querySelectorAll('h1, h2, h3');

// Descendant (space)
const navLinks = document.querySelectorAll('nav a');

// Direct child (>)
const directChildren = document.querySelectorAll('.container > div');

// Adjacent sibling (+)
const nextElement = document.querySelector('h1 + p');

// General sibling (~)
const allSiblings = document.querySelectorAll('h1 ~ p');
```

## Practical Example: Dynamic Navigation

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Navigation Demo</title>
  <style>
    .active {
      font-weight: bold;
      color: #007bff;
    }
    .disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  </style>
</head>
<body>
  <nav id="main-nav">
    <a href="#home" class="nav-link active">Home</a>
    <a href="#about" class="nav-link">About</a>
    <a href="#services" class="nav-link">Services</a>
    <a href="#contact" class="nav-link disabled">Contact</a>
  </nav>

  <div id="content">
    <h1>Welcome</h1>
    <p class="intro">Introduction text</p>
    <p>Main content</p>
  </div>

  <script>
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    console.log(`Found ${navLinks.length} navigation links`);

    // Get only enabled links
    const enabledLinks = document.querySelectorAll('.nav-link:not(.disabled)');
    console.log(`${enabledLinks.length} links are enabled`);

    // Get the active link
    const activeLink = document.querySelector('.nav-link.active');
    console.log(`Active link: ${activeLink.textContent}`);

    // Get links by href attribute
    const aboutLink = document.querySelector('a[href="#about"]');
    console.log('About link:', aboutLink);

    // Get all paragraph elements within content
    const contentDiv = document.getElementById('content');
    const paragraphs = contentDiv.querySelectorAll('p');
    console.log(`Content has ${paragraphs.length} paragraphs`);

    // Get the first paragraph specifically
    const introParagraph = contentDiv.querySelector('p.intro');
    console.log('Intro:', introParagraph.textContent);

    // Select all elements with href starting with #
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      console.log(`Anchor: ${link.href}`);
    });
  </script>
</body>
</html>
```

## Performance Comparison

```javascript
// Performance test (run in browser console)
console.time('getElementById');
for (let i = 0; i < 10000; i++) {
  document.getElementById('main-header');
}
console.timeEnd('getElementById');

console.time('querySelector');
for (let i = 0; i < 10000; i++) {
  document.querySelector('#main-header');
}
console.timeEnd('querySelector');

// getElementById is typically 2-3x faster
```

## Best Practices

1. Use `getElementById` when selecting by ID for best performance
2. Use `querySelector` for flexibility with complex selectors
3. Use `querySelectorAll` when you need multiple elements
4. Cache selectors in variables to avoid repeated DOM queries
5. Use context-specific selection to narrow search scope
6. Prefer specific selectors over broad ones for better performance

```javascript
// Bad - repeated DOM queries
document.querySelector('.button').style.color = 'red';
document.querySelector('.button').style.padding = '10px';
document.querySelector('.button').textContent = 'Click me';

// Good - cache the element
const button = document.querySelector('.button');
button.style.color = 'red';
button.style.padding = '10px';
button.textContent = 'Click me';
```

## Summary

JavaScript provides multiple ways to select DOM elements, each with its own strengths:

- `getElementById()` - Fastest, for single elements with IDs
- `querySelector()` - Flexible, uses CSS selectors, returns first match
- `querySelectorAll()` - Returns all matches as a NodeList
- Legacy methods still work but are generally less preferred

Understanding these methods and when to use each one is essential for efficient DOM manipulation.
