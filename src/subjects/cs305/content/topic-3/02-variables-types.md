# Variables and Data Types

Variables are containers for storing data values, and data types define what kind of values can be stored and manipulated. Understanding how to declare variables and work with different data types is fundamental to JavaScript programming. Modern JavaScript provides multiple ways to declare variables and supports various data types, from primitive values to complex objects.

## Variable Declaration

JavaScript offers three ways to declare variables: `var`, `let`, and `const`.

### const (Recommended Default)

Declares a constant reference that cannot be reassigned:

```javascript
const name = 'Alice';
const age = 30;
const PI = 3.14159;

name = 'Bob';  // Error: Assignment to constant variable
```

**Use const for**:
- Values that won't be reassigned
- Object and array references (content can still change)
- Most variables (use by default)

```javascript
const person = { name: 'Alice' };
person.name = 'Bob';  // Allowed (modifying content)
person = {};  // Error (reassigning reference)

const numbers = [1, 2, 3];
numbers.push(4);  // Allowed (modifying array)
numbers = [];  // Error (reassigning reference)
```

### let (Use When Reassignment Needed)

Declares a block-scoped variable that can be reassigned:

```javascript
let count = 0;
count = 1;  // Allowed
count = count + 1;  // Allowed

let message = 'Hello';
message = 'Goodbye';  // Allowed
```

**Use let for**:
- Loop counters
- Values that change over time
- Conditional assignments

```javascript
// Loop counter
for (let i = 0; i < 5; i++) {
    console.log(i);
}

// Conditional assignment
let greeting;
if (hour < 12) {
    greeting = 'Good morning';
} else {
    greeting = 'Good afternoon';
}
```

### var (Legacy, Avoid)

The old way to declare variables. Has function scope and hoisting issues:

```javascript
var oldWay = 'Avoid using var';
```

**Problems with var**:
- Function-scoped, not block-scoped
- Hoisting causes confusion
- Can be redeclared
- No error on duplicate declarations

```javascript
// Block scope issue
if (true) {
    var x = 10;
}
console.log(x);  // 10 (accessible outside block)

// Compare with let
if (true) {
    let y = 10;
}
console.log(y);  // Error: y is not defined
```

**Modern best practice**: Use `const` by default, `let` when reassignment is needed, avoid `var`.

## Variable Naming Rules

### Valid Names

```javascript
let name;
let firstName;
let first_name;
let _private;
let $element;
let age21;
let camelCase;
let PascalCase;
```

### Invalid Names

```javascript
let 123name;  // Can't start with number
let first-name;  // Hyphens not allowed
let let;  // Reserved keywords
let function;  // Reserved keywords
let class;  // Reserved keywords
```

### Naming Conventions

**camelCase** (recommended for variables and functions):
```javascript
const firstName = 'Alice';
let userAge = 30;
```

**PascalCase** (for classes):
```javascript
class UserAccount {}
```

**UPPER_SNAKE_CASE** (for constants):
```javascript
const MAX_USERS = 100;
const API_KEY = 'abc123';
```

**Descriptive names**:
```javascript
// Good
const userAge = 25;
const isLoggedIn = true;

// Bad
const a = 25;
const flag = true;
```

## Primitive Data Types

JavaScript has seven primitive types:

### 1. Number

Represents numeric values (integers and decimals):

```javascript
const integer = 42;
const decimal = 3.14;
const negative = -10;
const scientific = 2.5e6;  // 2,500,000

// Special numeric values
const infinity = Infinity;
const negInfinity = -Infinity;
const notANumber = NaN;  // Not a Number

// Number operations
const sum = 5 + 3;  // 8
const difference = 10 - 4;  // 6
const product = 6 * 7;  // 42
const quotient = 15 / 3;  // 5
const remainder = 17 % 5;  // 2
const power = 2 ** 3;  // 8
```

### 2. String

Represents text:

```javascript
const single = 'Single quotes';
const double = "Double quotes";
const backticks = `Backticks (template literals)`;

// String concatenation
const first = 'Hello';
const last = 'World';
const greeting = first + ' ' + last;  // "Hello World"

// Template literals (ES6+)
const name = 'Alice';
const age = 30;
const message = `My name is ${name} and I'm ${age} years old.`;

// Multi-line strings
const multiline = `
    This is
    a multi-line
    string
`;

// Escape characters
const quote = 'It\'s a nice day';
const newline = 'Line 1\nLine 2';
const tab = 'Column1\tColumn2';
```

### 3. Boolean

Represents true or false:

```javascript
const isTrue = true;
const isFalse = false;

// Boolean from comparisons
const isEqual = 5 === 5;  // true
const isGreater = 10 > 5;  // true
const isLess = 3 < 2;  // false

// Boolean in conditions
const isLoggedIn = true;
if (isLoggedIn) {
    console.log('Welcome back!');
}
```

### 4. Undefined

Variable declared but not assigned a value:

```javascript
let notAssigned;
console.log(notAssigned);  // undefined

function noReturn() {
    // No return statement
}
console.log(noReturn());  // undefined
```

### 5. Null

Intentional absence of value:

```javascript
let empty = null;  // Explicitly empty

// Difference from undefined
let notDefined;  // undefined (not assigned)
let cleared = null;  // null (intentionally empty)
```

### 6. Symbol (ES6+)

Unique identifier:

```javascript
const sym1 = Symbol('description');
const sym2 = Symbol('description');

console.log(sym1 === sym2);  // false (each symbol is unique)
```

### 7. BigInt (ES2020)

Large integers beyond Number's safe range:

```javascript
const bigNumber = 1234567890123456789012345678901234567890n;
const anotherBig = BigInt('9007199254740991');
```

## Complex Data Types

### Objects

Collections of key-value pairs:

```javascript
const person = {
    name: 'Alice',
    age: 30,
    city: 'New York'
};

// Access properties
console.log(person.name);  // "Alice"
console.log(person['age']);  // 30

// Modify properties
person.age = 31;
person.email = 'alice@example.com';
```

### Arrays

Ordered lists of values:

```javascript
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, 'two', true, null, { name: 'Alice' }];

// Access elements (0-indexed)
console.log(numbers[0]);  // 1
console.log(numbers[2]);  // 3

// Array length
console.log(numbers.length);  // 5
```

## Type Checking

### typeof Operator

```javascript
console.log(typeof 42);  // "number"
console.log(typeof 'Hello');  // "string"
console.log(typeof true);  // "boolean"
console.log(typeof undefined);  // "undefined"
console.log(typeof null);  // "object" (historical bug)
console.log(typeof { name: 'Alice' });  // "object"
console.log(typeof [1, 2, 3]);  // "object"
console.log(typeof function() {});  // "function"
console.log(typeof Symbol());  // "symbol"
console.log(typeof 123n);  // "bigint"
```

### Checking for Arrays

```javascript
const arr = [1, 2, 3];
console.log(Array.isArray(arr));  // true
console.log(Array.isArray({ name: 'Alice' }));  // false
```

## Type Coercion

JavaScript automatically converts between types:

### Implicit Coercion

```javascript
// String + Number → String
console.log('5' + 3);  // "53"
console.log('Hello' + 42);  // "Hello42"

// Number + Boolean → Number
console.log(5 + true);  // 6 (true = 1)
console.log(10 + false);  // 10 (false = 0)

// Comparison coercion
console.log('5' == 5);  // true (coerces to same type)
console.log('5' === 5);  // false (strict equality, no coercion)
```

### Explicit Conversion

```javascript
// To String
String(123);  // "123"
(42).toString();  // "42"
123 + '';  // "123"

// To Number
Number('123');  // 123
Number('abc');  // NaN
parseInt('42px');  // 42
parseFloat('3.14');  // 3.14
+'123';  // 123 (unary plus)

// To Boolean
Boolean(1);  // true
Boolean(0);  // false
Boolean('text');  // true
Boolean('');  // false
!!value;  // Double NOT (converts to boolean)
```

## Truthy and Falsy Values

### Falsy Values

These values coerce to `false`:

```javascript
false
0
-0
0n (BigInt zero)
'' (empty string)
null
undefined
NaN
```

### Truthy Values

Everything else is truthy:

```javascript
true
1 (any non-zero number)
'text' (any non-empty string)
[] (empty array)
{} (empty object)
function() {}
```

### Usage in Conditions

```javascript
const value = '';

if (value) {
    console.log('Truthy');
} else {
    console.log('Falsy');  // This runs
}

// Check for existence
const name = '';
if (name) {
    console.log('Name provided');
} else {
    console.log('No name');  // This runs
}
```

## Variable Scope

### Global Scope

Variables declared outside functions:

```javascript
const globalVar = 'Accessible everywhere';

function test() {
    console.log(globalVar);  // Can access
}
```

### Function Scope

Variables declared inside functions:

```javascript
function test() {
    const localVar = 'Only in function';
    console.log(localVar);  // Can access
}

console.log(localVar);  // Error: localVar is not defined
```

### Block Scope (let, const)

Variables limited to code blocks:

```javascript
if (true) {
    const blockVar = 'Only in block';
    console.log(blockVar);  // Can access
}

console.log(blockVar);  // Error: blockVar is not defined
```

## Practical Examples

### User Information

```javascript
const userName = 'Alice Johnson';
const userAge = 28;
const isSubscribed = true;
const accountBalance = 1234.56;
const lastLogin = null;  // Not logged in yet

console.log(`User: ${userName}`);
console.log(`Age: ${userAge}`);
console.log(`Subscribed: ${isSubscribed}`);
console.log(`Balance: $${accountBalance.toFixed(2)}`);
```

### Data Validation

```javascript
const email = 'user@example.com';
const password = '';

if (!email || !password) {
    console.log('Please fill in all fields');
}

const age = 17;
const canVote = age >= 18;
console.log(`Can vote: ${canVote}`);
```

### Type Conversion

```javascript
const input = '42';
const number = Number(input);

if (!isNaN(number)) {
    console.log('Valid number:', number);
} else {
    console.log('Invalid number');
}
```

## Common Pitfalls

### Confusing == and ===

```javascript
console.log('5' == 5);  // true (coerces types)
console.log('5' === 5);  // false (strict comparison)

// Always use ===
if (value === 5) {
    // Correct
}
```

### typeof null

```javascript
console.log(typeof null);  // "object" (historical bug)

// Check for null explicitly
if (value === null) {
    console.log('Value is null');
}
```

### NaN Comparison

```javascript
const result = NaN;
console.log(result === NaN);  // false (NaN never equals anything)

// Use isNaN()
console.log(isNaN(result));  // true
console.log(Number.isNaN(result));  // true (more reliable)
```

## Best Practices

**Use const by default**: Only use let when reassignment is needed.

**Use descriptive names**: `userAge` not `x`.

**Use === for comparisons**: Avoids type coercion issues.

**Check types explicitly**: Don't rely on implicit coercion.

**Initialize variables**: Avoid undefined values when possible.

**Use template literals**: Cleaner than string concatenation.

**Avoid global variables**: Use function or block scope.

## Conclusion

Variables and data types are the foundation of JavaScript programming. By using const as the default, let for reassignment, and avoiding var, you write cleaner, more predictable code. Understanding primitive types (number, string, boolean, undefined, null, symbol, bigint) and complex types (objects, arrays) enables you to store and manipulate data effectively. Master type coercion, use strict equality (===), and follow naming conventions for professional, maintainable JavaScript code.
