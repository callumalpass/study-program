# JavaScript Functions

Functions are reusable blocks of code that perform specific tasks. They're fundamental to JavaScript programming, enabling code organization, reusability, and abstraction. Understanding function declarations, expressions, arrow functions, parameters, return values, and scope is essential for writing clean, maintainable JavaScript.

## What are Functions?

Functions are named pieces of code that:
- Perform a specific task
- Can be called multiple times
- Accept input (parameters)
- Return output (return values)
- Create their own scope

```javascript
function greet() {
    console.log('Hello!');
}

greet();  // Calls the function → "Hello!"
```

## Function Declarations

The traditional way to define functions:

```javascript
function functionName(parameters) {
    // Function body
    return value;
}
```

### Basic Example

```javascript
function sayHello() {
    console.log('Hello, World!');
}

sayHello();  // "Hello, World!"
```

### With Parameters

```javascript
function greet(name) {
    console.log(`Hello, ${name}!`);
}

greet('Alice');  // "Hello, Alice!"
greet('Bob');    // "Hello, Bob!"
```

### With Return Value

```javascript
function add(a, b) {
    return a + b;
}

const result = add(5, 3);
console.log(result);  // 8

// Use directly
console.log(add(10, 20));  // 30
```

### Multiple Parameters

```javascript
function createPerson(firstName, lastName, age) {
    return {
        firstName: firstName,
        lastName: lastName,
        age: age
    };
}

const person = createPerson('Alice', 'Johnson', 30);
console.log(person);  // { firstName: 'Alice', lastName: 'Johnson', age: 30 }
```

## Function Expressions

Functions can be assigned to variables:

```javascript
const greet = function(name) {
    return `Hello, ${name}!`;
};

console.log(greet('Alice'));  // "Hello, Alice!"
```

### Named Function Expressions

```javascript
const factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);  // Can reference itself by name
};

console.log(factorial(5));  // 120
```

## Arrow Functions (ES6+)

Concise syntax for function expressions:

```javascript
// Traditional function expression
const add = function(a, b) {
    return a + b;
};

// Arrow function
const add = (a, b) => {
    return a + b;
};

// Concise arrow function (implicit return)
const add = (a, b) => a + b;
```

### Arrow Function Syntax

```javascript
// No parameters
const greet = () => console.log('Hello!');

// One parameter (parentheses optional)
const square = x => x * x;
const double = (x) => x * 2;

// Multiple parameters
const add = (a, b) => a + b;

// Multiple statements (need braces and explicit return)
const calculate = (a, b) => {
    const sum = a + b;
    const product = a * b;
    return { sum, product };
};

// Returning object (wrap in parentheses)
const createPerson = (name, age) => ({ name, age });
```

### When to Use Arrow Functions

**Good for**:
- Short, simple functions
- Callbacks
- Array methods (map, filter, reduce)

**Avoid for**:
- Methods that need `this` context
- Functions used as constructors
- Functions needing `arguments` object

```javascript
// Good: Array callback
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);

// Good: Short function
const isEven = n => n % 2 === 0;

// Avoid: Object methods (this binding differs)
const person = {
    name: 'Alice',
    greet: () => console.log(`Hello, ${this.name}`)  // 'this' doesn't work as expected
};
```

## Function Parameters

### Default Parameters

```javascript
function greet(name = 'Guest') {
    console.log(`Hello, ${name}!`);
}

greet('Alice');  // "Hello, Alice!"
greet();         // "Hello, Guest!"

// With multiple defaults
function createUser(name = 'Anonymous', role = 'user') {
    return { name, role };
}

console.log(createUser());                 // { name: 'Anonymous', role: 'user' }
console.log(createUser('Alice'));          // { name: 'Alice', role: 'user' }
console.log(createUser('Bob', 'admin'));   // { name: 'Bob', role: 'admin' }
```

### Rest Parameters

Collect remaining arguments into an array:

```javascript
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3));        // 6
console.log(sum(1, 2, 3, 4, 5));  // 15

// With regular parameters
function greet(greeting, ...names) {
    return `${greeting}, ${names.join(' and ')}!`;
}

console.log(greet('Hello', 'Alice', 'Bob', 'Charlie'));
// "Hello, Alice and Bob and Charlie!"
```

### Destructuring Parameters

```javascript
// Object destructuring
function createUser({ name, age, city }) {
    console.log(`${name}, ${age}, from ${city}`);
}

createUser({ name: 'Alice', age: 30, city: 'New York' });
// "Alice, 30, from New York"

// Array destructuring
function getCoordinates([x, y]) {
    console.log(`X: ${x}, Y: ${y}`);
}

getCoordinates([10, 20]);  // "X: 10, Y: 20"

// With defaults
function setupConfig({ theme = 'light', fontSize = 16 } = {}) {
    console.log(`Theme: ${theme}, Font: ${fontSize}px`);
}

setupConfig();                      // "Theme: light, Font: 16px"
setupConfig({ theme: 'dark' });     // "Theme: dark, Font: 16px"
```

## Return Values

### Basic Return

```javascript
function multiply(a, b) {
    return a * b;
}

const result = multiply(5, 3);
console.log(result);  // 15
```

### Early Return

```javascript
function isEligible(age) {
    if (age < 18) {
        return false;  // Early exit
    }
    return true;
}

// Cleaner version
function isEligible(age) {
    if (age < 18) return false;
    return true;
}

// Even cleaner
function isEligible(age) {
    return age >= 18;
}
```

### Multiple Return Paths

```javascript
function grade(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
}

console.log(grade(95));  // "A"
console.log(grade(75));  // "C"
```

### Returning Objects

```javascript
function createPoint(x, y) {
    return {
        x: x,
        y: y,
        toString() {
            return `(${x}, ${y})`;
        }
    };
}

// Shorthand property names
function createPoint(x, y) {
    return { x, y };
}
```

### No Return

Functions without return statements return `undefined`:

```javascript
function logMessage(msg) {
    console.log(msg);
    // No return statement
}

const result = logMessage('Hello');
console.log(result);  // undefined
```

## Function Scope

### Local Variables

Variables declared in functions are local:

```javascript
function example() {
    const localVar = 'Only inside function';
    console.log(localVar);  // Works
}

example();
console.log(localVar);  // Error: localVar is not defined
```

### Closure

Functions can access variables from outer scopes:

```javascript
function outer() {
    const outerVar = 'I am outer';

    function inner() {
        console.log(outerVar);  // Can access outer variable
    }

    inner();
}

outer();  // "I am outer"
```

### Practical Closure Example

```javascript
function createCounter() {
    let count = 0;

    return {
        increment() {
            count++;
            return count;
        },
        decrement() {
            count--;
            return count;
        },
        getCount() {
            return count;
        }
    };
}

const counter = createCounter();
console.log(counter.increment());  // 1
console.log(counter.increment());  // 2
console.log(counter.getCount());   // 2
console.log(counter.decrement());  // 1
```

## Higher-Order Functions

Functions that take other functions as arguments or return functions:

### Accepting Functions

```javascript
function operate(a, b, operation) {
    return operation(a, b);
}

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

console.log(operate(5, 3, add));       // 8
console.log(operate(5, 3, multiply));  // 15
```

### Returning Functions

```javascript
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

## Callback Functions

Functions passed as arguments:

```javascript
function processUser(user, callback) {
    console.log(`Processing ${user}...`);
    callback(user);
}

processUser('Alice', (name) => {
    console.log(`${name} processed successfully!`);
});

// Array methods with callbacks
const numbers = [1, 2, 3, 4, 5];

// forEach
numbers.forEach(n => console.log(n));

// map
const doubled = numbers.map(n => n * 2);

// filter
const evens = numbers.filter(n => n % 2 === 0);

// reduce
const sum = numbers.reduce((total, n) => total + n, 0);
```

## IIFE (Immediately Invoked Function Expression)

Functions that execute immediately:

```javascript
(function() {
    console.log('This runs immediately!');
})();

// With parameters
(function(name) {
    console.log(`Hello, ${name}!`);
})('Alice');

// Arrow function IIFE
(() => {
    console.log('Arrow IIFE');
})();
```

## Practical Examples

### Calculator

```javascript
const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : 'Error: Division by zero'
};

console.log(calculator.add(10, 5));       // 15
console.log(calculator.divide(10, 2));    // 5
console.log(calculator.divide(10, 0));    // "Error: Division by zero"
```

### Form Validation

```javascript
function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

function validateForm(email, password) {
    if (!validateEmail(email)) {
        return { valid: false, error: 'Invalid email' };
    }
    if (!validatePassword(password)) {
        return { valid: false, error: 'Password must be at least 8 characters' };
    }
    return { valid: true };
}

console.log(validateForm('test@example.com', 'password123'));
// { valid: true }
console.log(validateForm('invalid-email', 'short'));
// { valid: false, error: 'Invalid email' }
```

### Array Utilities

```javascript
const findMax = arr => Math.max(...arr);
const findMin = arr => Math.min(...arr);
const average = arr => arr.reduce((sum, n) => sum + n, 0) / arr.length;

const numbers = [5, 2, 8, 1, 9, 3];
console.log(findMax(numbers));  // 9
console.log(findMin(numbers));  // 1
console.log(average(numbers));  // 4.666...
```

## Best Practices

**Use descriptive names**: `calculateTotal` not `calc`.

**Keep functions small**: One function, one purpose.

**Use arrow functions for callbacks**: Cleaner, more concise.

**Use default parameters**: Avoid checking for undefined.

**Return early**: Reduce nesting and improve readability.

**Avoid side effects**: Functions should be predictable.

**Document complex functions**: Add comments explaining purpose.

**Use const for functions**: Prevents accidental reassignment.

```javascript
// Good
const calculateTax = (amount, rate = 0.1) => amount * rate;

// Less good
function calc(a, r) {
    if (r === undefined) r = 0.1;
    return a * r;
}
```

## Common Mistakes

**Forgetting return**: Function returns undefined.

```javascript
function add(a, b) {
    a + b;  // Missing return!
}
```

**Confusing function declarations and expressions**: Declarations are hoisted.

```javascript
greet();  // Works (hoisted)
function greet() {
    console.log('Hello');
}

greet2();  // Error: greet2 is not a function
const greet2 = function() {
    console.log('Hello');
};
```

**Arrow function and this**: Arrow functions don't have their own `this`.

```javascript
const obj = {
    value: 42,
    getValue: () => this.value  // 'this' doesn't refer to obj
};
```

## Conclusion

Functions are the building blocks of JavaScript programs. Master function declarations, expressions, and arrow functions to write clean, reusable code. Understand parameters (including rest and destructuring), return values, scope, and closures to leverage JavaScript's full power. Use higher-order functions and callbacks to create flexible, composable code. Follow best practices like small, focused functions with descriptive names, and you'll write maintainable, professional JavaScript.
