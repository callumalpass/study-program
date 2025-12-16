# JavaScript Basics

JavaScript is the programming language of the web, enabling interactivity, dynamic content, and complex functionality in web applications. While HTML provides structure and CSS controls presentation, JavaScript adds behavior—handling user interactions, manipulating the DOM, making API calls, and creating rich, interactive experiences.

## What is JavaScript?

JavaScript is a high-level, interpreted programming language that runs in web browsers and on servers (Node.js). Despite its name, JavaScript is unrelated to Java. It's a versatile language used for:

- Web development (frontend and backend)
- Mobile app development
- Desktop applications
- Game development
- Server-side programming
- IoT and embedded systems

JavaScript is an essential skill for modern web developers, ranking as one of the most popular programming languages worldwide.

## History of JavaScript

**1995**: Brendan Eich created JavaScript in just 10 days while working at Netscape. Originally called Mocha, then LiveScript, it was renamed JavaScript for marketing reasons.

**1997**: ECMAScript standardization began. ECMAScript is the official specification; JavaScript is the most popular implementation.

**1999**: ECMAScript 3 released with regular expressions, better string handling, and exception handling.

**2009**: ECMAScript 5 (ES5) introduced strict mode, JSON support, and array methods like forEach, map, and filter.

**2015**: ECMAScript 6 (ES6/ES2015) was a major update with arrow functions, classes, modules, promises, let/const, template literals, and destructuring.

**2016-Present**: Annual ECMAScript releases add incremental improvements (ES2016, ES2017, ES2018, etc.).

Modern JavaScript (ES6+) is dramatically more powerful and developer-friendly than early versions.

## Where to Write JavaScript

### Inline JavaScript (Not Recommended)

JavaScript directly in HTML attributes:

```html
<button onclick="alert('Clicked!')">Click Me</button>
```

**Avoid this**: Mixes behavior with structure, hard to maintain, and poses security risks.

### Internal JavaScript

JavaScript in `<script>` tags within HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Internal JavaScript</title>
</head>
<body>
    <button id="btn">Click Me</button>

    <script>
        document.getElementById('btn').addEventListener('click', function() {
            alert('Button clicked!');
        });
    </script>
</body>
</html>
```

Scripts can go in `<head>` or before the closing `</body>` tag. Placing them at the end of `<body>` ensures the DOM is loaded before the script runs.

### External JavaScript (Recommended)

JavaScript in separate `.js` files:

**script.js**:
```javascript
document.getElementById('btn').addEventListener('click', function() {
    alert('Button clicked!');
});
```

**index.html**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>External JavaScript</title>
</head>
<body>
    <button id="btn">Click Me</button>
    <script src="script.js"></script>
</body>
</html>
```

**Benefits**:
- Separation of concerns
- Code reusability
- Browser caching
- Easier maintenance
- Better organization

### Script Loading Attributes

**defer**: Downloads script in parallel, executes after DOM parsing:

```html
<script src="script.js" defer></script>
```

**async**: Downloads and executes script as soon as available:

```html
<script src="analytics.js" async></script>
```

**Default**: Blocks HTML parsing while downloading and executing.

Use `defer` for scripts that need DOM access, `async` for independent scripts like analytics.

## The Console

The browser console is essential for JavaScript development. It displays errors, logs, and allows interactive JavaScript execution.

### Accessing the Console

**Chrome/Edge**: F12 or Ctrl+Shift+J (Cmd+Option+J on Mac)

**Firefox**: F12 or Ctrl+Shift+K (Cmd+Option+K on Mac)

**Safari**: Cmd+Option+C (enable Developer menu first)

### Console Methods

```javascript
// Log messages
console.log('Hello World');
console.log('Value:', 42);
console.log('Multiple', 'values', 123);

// Informational messages
console.info('This is information');

// Warnings
console.warn('This is a warning');

// Errors
console.error('This is an error');

// Clear console
console.clear();

// Tables (for arrays/objects)
const users = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 }
];
console.table(users);

// Timing operations
console.time('loop');
for (let i = 0; i < 1000000; i++) {}
console.timeEnd('loop');

// Grouping logs
console.group('User Details');
console.log('Name: Alice');
console.log('Age: 30');
console.groupEnd();

// Assertions
console.assert(2 + 2 === 4, 'Math works');
console.assert(2 + 2 === 5, 'Math is broken!');  // Shows error

// Count occurrences
console.count('counter');
console.count('counter');
console.count('counter');
console.countReset('counter');
```

### Using the Console REPL

The console provides a Read-Eval-Print Loop for testing JavaScript:

```javascript
// Try expressions
2 + 2  // 4
'Hello ' + 'World'  // "Hello World"

// Define variables
let name = 'Alice';
console.log(name);  // "Alice"

// Test functions
function greet(name) {
    return `Hello, ${name}!`;
}
greet('Bob');  // "Hello, Bob!"

// Access DOM elements
document.querySelector('h1');  // Returns h1 element
```

## JavaScript Syntax Basics

### Statements and Semicolons

JavaScript statements typically end with semicolons:

```javascript
let x = 5;
console.log(x);
```

Semicolons are technically optional (automatic semicolon insertion), but using them is recommended for clarity and avoiding edge cases:

```javascript
// Works but risky
let x = 5
console.log(x)

// Recommended
let x = 5;
console.log(x);
```

### Comments

```javascript
// Single-line comment

/*
Multi-line
comment
*/

/**
 * Documentation comment
 * Describes function purpose
 */
function example() {
    // Function code
}
```

### Case Sensitivity

JavaScript is case-sensitive:

```javascript
let myVariable = 10;
let MyVariable = 20;  // Different variable
let myvariable = 30;  // Different variable

console.log(myVariable);  // 10
```

### Whitespace

JavaScript ignores extra whitespace (except in strings):

```javascript
let x=5+3;  // Valid
let x = 5 + 3;  // Same, more readable

let message='Hello';  // Valid
let message = 'Hello';  // More readable
```

## Basic JavaScript Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Basics</title>
</head>
<body>
    <h1>JavaScript Demo</h1>
    <button id="greetBtn">Greet</button>
    <p id="output"></p>

    <script>
        // Get button element
        const button = document.getElementById('greetBtn');

        // Get output paragraph
        const output = document.getElementById('output');

        // Add click event listener
        button.addEventListener('click', function() {
            // Get current time
            const now = new Date();
            const hours = now.getHours();

            // Determine greeting
            let greeting;
            if (hours < 12) {
                greeting = 'Good morning!';
            } else if (hours < 18) {
                greeting = 'Good afternoon!';
            } else {
                greeting = 'Good evening!';
            }

            // Display greeting
            output.textContent = greeting;

            // Log to console
            console.log('Greeting displayed:', greeting);
        });
    </script>
</body>
</html>
```

## Strict Mode

Strict mode catches common coding mistakes and prevents unsafe actions:

```javascript
'use strict';

// This would fail in strict mode
x = 10;  // Error: x is not defined

// Must declare variables
let x = 10;  // Correct
```

Enable strict mode for better error checking and safer code.

## JavaScript in the Browser

### The Window Object

The global object in browsers:

```javascript
console.log(window);

// Properties
window.innerWidth;  // Browser width
window.innerHeight;  // Browser height
window.location.href;  // Current URL

// Methods
window.alert('Hello');
window.confirm('Are you sure?');
window.prompt('Enter name:');
```

### The Document Object

Represents the HTML document:

```javascript
document.title;  // Page title
document.body;  // Body element
document.querySelector('h1');  // First h1 element
document.querySelectorAll('p');  // All p elements
```

### Events

JavaScript responds to user actions:

```javascript
// Click event
button.addEventListener('click', function() {
    console.log('Button clicked!');
});

// Keyboard event
document.addEventListener('keydown', function(event) {
    console.log('Key pressed:', event.key);
});

// Mouse event
element.addEventListener('mouseover', function() {
    console.log('Mouse over element');
});
```

## Common Beginner Mistakes

**Forgetting semicolons**: Can cause issues in some cases.

**Mixing let, const, and var**: Use `const` by default, `let` when reassignment needed.

**Not using strict mode**: Catches common errors.

**Inline event handlers**: Use `addEventListener` instead.

**Not checking the console**: Always check for errors.

**Case sensitivity errors**: `getElementById` not `getElementByID`.

**Trying to access DOM before it loads**: Use `defer` or place scripts at end of body.

## Development Tools

**Browser DevTools**: Essential for debugging (F12).

**Console**: Test code, debug, view logs.

**Elements/Inspector**: View and modify DOM.

**Network Tab**: Monitor requests and responses.

**Sources/Debugger**: Set breakpoints, step through code.

## Best Practices

**Use external JavaScript files**: Keep code organized.

**Place scripts at end of body or use defer**: Ensures DOM is loaded.

**Use meaningful variable names**: `userAge` not `x`.

**Comment your code**: Explain complex logic.

**Use strict mode**: Catch errors early.

**Check the console regularly**: Find and fix errors quickly.

**Indent properly**: Makes code readable.

**Use const by default**: Only use let when reassignment needed.

## First Program

**hello.js**:
```javascript
'use strict';

// Log to console
console.log('Hello, JavaScript!');

// Display alert
alert('Welcome to JavaScript');

// Get user input
const name = prompt('What is your name?');

// Greet user
if (name) {
    console.log(`Hello, ${name}!`);
    document.body.innerHTML = `<h1>Hello, ${name}!</h1>`;
} else {
    console.log('Hello, stranger!');
}
```

**index.html**:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First JavaScript Program</title>
</head>
<body>
    <script src="hello.js" defer></script>
</body>
</html>
```

## Learning Resources

**MDN Web Docs**: Comprehensive JavaScript documentation.

**JavaScript.info**: Modern JavaScript tutorial.

**Console**: Practice in browser console.

**CodePen/JSFiddle**: Online code playgrounds.

## Conclusion

JavaScript is the language of web interactivity, transforming static HTML and CSS into dynamic, responsive applications. By understanding where to write JavaScript (preferably external files), using the console for debugging and testing, and following best practices like strict mode and meaningful naming, you build a solid foundation for learning this essential language. JavaScript opens the door to frontend frameworks, backend development with Node.js, and countless other programming opportunities.
