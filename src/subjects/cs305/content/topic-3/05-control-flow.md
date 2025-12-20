# Control Flow in JavaScript

Control flow determines the order in which code executes. JavaScript provides various control structures including conditional statements (if/else, switch), loops (for, while, do-while), and modern iterators. Understanding control flow is essential for writing logic that responds to different conditions and processes collections of data.

## Conditional Statements

### if Statement

Executes code if a condition is true:

```javascript
const age = 18;

if (age >= 18) {
    console.log('You are an adult');
}
```

### if...else Statement

Executes one block if true, another if false:

```javascript
const age = 16;

if (age >= 18) {
    console.log('You are an adult');
} else {
    console.log('You are a minor');
}
```

### if...else if...else Statement

Multiple conditions:

```javascript
const score = 85;

if (score >= 90) {
    console.log('Grade: A');
} else if (score >= 80) {
    console.log('Grade: B');
} else if (score >= 70) {
    console.log('Grade: C');
} else if (score >= 60) {
    console.log('Grade: D');
} else {
    console.log('Grade: F');
}
```

### Nested if Statements

```javascript
const age = 25;
const hasLicense = true;

if (age >= 18) {
    if (hasLicense) {
        console.log('You can drive');
    } else {
        console.log('You need a license');
    }
} else {
    console.log('You are too young to drive');
}
```

### Truthy and Falsy Values

JavaScript evaluates values in boolean contexts:

```javascript
const name = 'Alice';

if (name) {  // Truthy
    console.log('Name is provided');
}

const emptyString = '';
if (!emptyString) {  // Falsy
    console.log('String is empty');
}

// Falsy values: false, 0, '', null, undefined, NaN
// Everything else is truthy
```

### Ternary Operator

Concise conditional expression:

```javascript
const age = 20;
const status = age >= 18 ? 'adult' : 'minor';
console.log(status);  // 'adult'

// Nested ternary (use sparingly)
const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'F';

// Better as if/else when complex
let grade;
if (score >= 90) grade = 'A';
else if (score >= 80) grade = 'B';
else if (score >= 70) grade = 'C';
else grade = 'F';
```

## Switch Statement

Multiple conditions based on value:

```javascript
const day = 'Monday';

switch (day) {
    case 'Monday':
        console.log('Start of work week');
        break;
    case 'Tuesday':
    case 'Wednesday':
    case 'Thursday':
        console.log('Midweek');
        break;
    case 'Friday':
        console.log('End of work week');
        break;
    case 'Saturday':
    case 'Sunday':
        console.log('Weekend!');
        break;
    default:
        console.log('Invalid day');
}
```

### Switch with Multiple Cases

```javascript
const month = 'February';

switch (month) {
    case 'January':
    case 'March':
    case 'May':
    case 'July':
    case 'August':
    case 'October':
    case 'December':
        console.log('31 days');
        break;
    case 'April':
    case 'June':
    case 'September':
    case 'November':
        console.log('30 days');
        break;
    case 'February':
        console.log('28 or 29 days');
        break;
    default:
        console.log('Invalid month');
}
```

### Switch vs if/else

Use **switch** when:
- Comparing same variable to multiple values
- Values are discrete (not ranges)
- Many cases (more readable than long if/else chain)

Use **if/else** when:
- Complex conditions
- Range comparisons
- Different variables in each condition

## Loops

### for Loop

Repeats a block of code a specified number of times:

```javascript
for (let i = 0; i < 5; i++) {
    console.log(i);  // 0, 1, 2, 3, 4
}

// Iterate backwards
for (let i = 5; i > 0; i--) {
    console.log(i);  // 5, 4, 3, 2, 1
}

// Iterate with step
for (let i = 0; i < 10; i += 2) {
    console.log(i);  // 0, 2, 4, 6, 8
}
```

### for Loop with Arrays

```javascript
const fruits = ['apple', 'banana', 'orange'];

for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// Iterate backwards
for (let i = fruits.length - 1; i >= 0; i--) {
    console.log(fruits[i]);
}
```

### while Loop

Repeats while condition is true:

```javascript
let count = 0;

while (count < 5) {
    console.log(count);
    count++;
}

// User input example
let input = '';
while (input !== 'quit') {
    input = prompt('Enter command (or "quit" to exit):');
    console.log(`You entered: ${input}`);
}
```

### do...while Loop

Executes at least once, then repeats while condition is true:

```javascript
let count = 0;

do {
    console.log(count);
    count++;
} while (count < 5);

// Menu example
let choice;
do {
    choice = prompt('1. Option A\n2. Option B\n3. Exit');
    // Process choice
} while (choice !== '3');
```

### for...of Loop (ES6+)

Iterates over iterable objects (arrays, strings, etc.):

```javascript
const fruits = ['apple', 'banana', 'orange'];

for (const fruit of fruits) {
    console.log(fruit);
}

// With strings
const word = 'hello';
for (const char of word) {
    console.log(char);  // h, e, l, l, o
}

// With index
for (const [index, fruit] of fruits.entries()) {
    console.log(`${index}: ${fruit}`);
}
```

### for...in Loop

Iterates over object properties:

```javascript
const person = { name: 'Alice', age: 30, city: 'New York' };

for (const key in person) {
    console.log(`${key}: ${person[key]}`);
}

// Can be used with arrays (but for...of is preferred)
const arr = ['a', 'b', 'c'];
for (const index in arr) {
    console.log(`${index}: ${arr[index]}`);
}
```

## Loop Control

### break Statement

Exits a loop immediately:

```javascript
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        break;  // Exit loop when i is 5
    }
    console.log(i);  // 0, 1, 2, 3, 4
}

// Find first even number
const numbers = [1, 3, 7, 8, 9, 10];
let firstEven;

for (const num of numbers) {
    if (num % 2 === 0) {
        firstEven = num;
        break;
    }
}
console.log(firstEven);  // 8
```

### continue Statement

Skips to next iteration:

```javascript
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
        continue;  // Skip even numbers
    }
    console.log(i);  // 1, 3, 5, 7, 9
}

// Skip empty values
const values = [1, null, 3, undefined, 5];
for (const val of values) {
    if (!val) {
        continue;
    }
    console.log(val);  // 1, 3, 5
}
```

### Labeled Statements

Break or continue outer loops:

```javascript
outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            break outer;  // Break out of both loops
        }
        console.log(`i=${i}, j=${j}`);
    }
}

// With continue
outer: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (j === 1) {
            continue outer;  // Continue outer loop
        }
        console.log(`i=${i}, j=${j}`);
    }
}
```

## Modern Array Iterators

### forEach()

Execute function for each element:

```javascript
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});

// Can't break or continue
// Use for...of if you need break/continue
```

### map()

Transform each element, return new array:

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

const users = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 }
];
const names = users.map(user => user.name);
console.log(names);  // ['Alice', 'Bob']
```

### filter()

Keep elements that pass test:

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens);  // [2, 4, 6, 8, 10]

const users = [
    { name: 'Alice', age: 30, active: true },
    { name: 'Bob', age: 25, active: false },
    { name: 'Charlie', age: 35, active: true }
];
const activeUsers = users.filter(user => user.active);
console.log(activeUsers);
```

### reduce()

Reduce array to single value:

```javascript
const numbers = [1, 2, 3, 4, 5];

// Sum
const sum = numbers.reduce((total, num) => total + num, 0);
console.log(sum);  // 15

// Product
const product = numbers.reduce((total, num) => total * num, 1);
console.log(product);  // 120

// Max value
const max = numbers.reduce((max, num) => num > max ? num : max);
console.log(max);  // 5

// Count occurrences
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});
console.log(count);  // { apple: 3, banana: 2, orange: 1 }
```

### find() and findIndex()

Find first element that passes test:

```javascript
const numbers = [5, 12, 8, 130, 44];

const found = numbers.find(num => num > 10);
console.log(found);  // 12

const index = numbers.findIndex(num => num > 10);
console.log(index);  // 1

const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
];
const user = users.find(u => u.id === 2);
console.log(user);  // { id: 2, name: 'Bob' }
```

### some() and every()

Test if elements pass condition:

```javascript
const numbers = [1, 2, 3, 4, 5];

// some() - at least one passes
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven);  // true

// every() - all pass
const allPositive = numbers.every(num => num > 0);
console.log(allPositive);  // true

const allEven = numbers.every(num => num % 2 === 0);
console.log(allEven);  // false
```

## Practical Examples

### Grade Calculator

```javascript
function calculateGrade(score) {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
}

const scores = [95, 82, 76, 54, 88];
const grades = scores.map(score => ({
    score,
    grade: calculateGrade(score)
}));

console.log(grades);
```

### FizzBuzz

```javascript
for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) {
        console.log('FizzBuzz');
    } else if (i % 3 === 0) {
        console.log('Fizz');
    } else if (i % 5 === 0) {
        console.log('Buzz');
    } else {
        console.log(i);
    }
}
```

### Filter and Sort

```javascript
const products = [
    { name: 'Laptop', price: 999, category: 'electronics' },
    { name: 'Shirt', price: 29, category: 'clothing' },
    { name: 'Phone', price: 699, category: 'electronics' },
    { name: 'Shoes', price: 89, category: 'clothing' }
];

// Filter electronics under $1000
const affordable = products
    .filter(p => p.category === 'electronics' && p.price < 1000)
    .sort((a, b) => a.price - b.price);

console.log(affordable);
```

### Statistics

```javascript
const numbers = [5, 12, 8, 130, 44, 23, 67];

const sum = numbers.reduce((a, b) => a + b, 0);
const average = sum / numbers.length;
const max = Math.max(...numbers);
const min = Math.min(...numbers);

console.log('Sum:', sum);
console.log('Average:', average);
console.log('Max:', max);
console.log('Min:', min);
```

## Best Practices

**Use array methods over loops**: map, filter, reduce are cleaner and more functional.

**Use for...of for arrays**: More readable than traditional for loops.

**Use const in loops**: Prevents accidental reassignment.

**Avoid nested loops**: Can cause performance issues with large datasets.

**Use meaningful variable names**: `user` not `u`, `index` not `i` in forEach.

**Early return/continue**: Reduce nesting in conditionals.

```javascript
// Good: Early return
function processUser(user) {
    if (!user.active) return;
    if (!user.email) return;

    // Process active user with email
}

// Less good: Nested
function processUser(user) {
    if (user.active) {
        if (user.email) {
            // Process
        }
    }
}
```

## Common Mistakes

**Infinite loops**: Forgetting to update loop condition.

```javascript
// Infinite loop!
let i = 0;
while (i < 10) {
    console.log(i);
    // Forgot: i++
}
```

**Off-by-one errors**: Using wrong comparison operator.

```javascript
// Wrong: skips last element
for (let i = 0; i < arr.length - 1; i++) {}

// Correct
for (let i = 0; i < arr.length; i++) {}
```

**Modifying array during iteration**: Can cause unexpected behavior.

```javascript
// Problematic
const arr = [1, 2, 3, 4, 5];
for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
        arr.splice(i, 1);  // Modifies array during iteration
    }
}

// Better: filter
const arr = [1, 2, 3, 4, 5];
const filtered = arr.filter(num => num % 2 !== 0);
```

**Using for...in with arrays**: Use for...of instead.

```javascript
// Avoid
const arr = [1, 2, 3];
for (const i in arr) {
    console.log(arr[i]);
}

// Prefer
for (const value of arr) {
    console.log(value);
}
```

## Conclusion

Control flow structures are fundamental to programming logic. Master conditional statements (if/else, switch) for decision-making, loops (for, while) for repetition, and modern iterators (map, filter, reduce) for array processing. Use break and continue for flow control, and leverage array methods for cleaner, more functional code. Understanding when to use each control structure enables you to write efficient, readable JavaScript that handles complex logic elegantly.
