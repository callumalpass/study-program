# Objects and Arrays in JavaScript

Objects and arrays are fundamental data structures in JavaScript. Objects store collections of key-value pairs, while arrays store ordered lists of values. Understanding how to create, manipulate, and destructure objects and arrays is essential for working with data in JavaScript applications.

## Objects

Objects are collections of properties (key-value pairs):

```javascript
const person = {
    name: 'Alice',
    age: 30,
    city: 'New York'
};
```

### Creating Objects

**Object literal** (most common):

```javascript
const user = {
    username: 'alice123',
    email: 'alice@example.com',
    isActive: true
};
```

**new Object()** syntax (less common):

```javascript
const user = new Object();
user.username = 'alice123';
user.email = 'alice@example.com';
```

**Object.create()**:

```javascript
const prototype = { greet() { console.log('Hello'); } };
const obj = Object.create(prototype);
```

### Accessing Properties

**Dot notation**:

```javascript
const person = { name: 'Alice', age: 30 };
console.log(person.name);  // "Alice"
console.log(person.age);   // 30
```

**Bracket notation**:

```javascript
console.log(person['name']);  // "Alice"

// Useful for dynamic property names
const property = 'age';
console.log(person[property]);  // 30

// Useful for properties with spaces or special characters
const obj = {
    'first name': 'Alice',
    'user-email': 'alice@example.com'
};
console.log(obj['first name']);  // "Alice"
```

### Adding and Modifying Properties

```javascript
const person = { name: 'Alice' };

// Add new property
person.age = 30;
person['city'] = 'New York';

// Modify existing property
person.name = 'Alice Johnson';

console.log(person);
// { name: 'Alice Johnson', age: 30, city: 'New York' }
```

### Deleting Properties

```javascript
const person = { name: 'Alice', age: 30, city: 'New York' };

delete person.age;

console.log(person);  // { name: 'Alice', city: 'New York' }
```

### Object Methods

Functions as object properties:

```javascript
const calculator = {
    add: function(a, b) {
        return a + b;
    },
    subtract(a, b) {  // Shorthand method syntax
        return a - b;
    },
    multiply: (a, b) => a * b  // Arrow function
};

console.log(calculator.add(5, 3));       // 8
console.log(calculator.subtract(10, 4)); // 6
console.log(calculator.multiply(6, 7));  // 42
```

### this Keyword

Refers to the object the method belongs to:

```javascript
const person = {
    name: 'Alice',
    age: 30,
    greet() {
        console.log(`Hello, I'm ${this.name} and I'm ${this.age} years old.`);
    }
};

person.greet();  // "Hello, I'm Alice and I'm 30 years old."
```

**Note**: Arrow functions don't have their own `this`:

```javascript
const person = {
    name: 'Alice',
    greet: () => {
        console.log(this.name);  // 'this' doesn't refer to person
    }
};
```

### Nested Objects

```javascript
const person = {
    name: 'Alice',
    age: 30,
    address: {
        street: '123 Main St',
        city: 'New York',
        zip: '10001'
    }
};

console.log(person.address.city);  // "New York"
console.log(person['address']['zip']);  // "10001"
```

### Checking for Properties

```javascript
const person = { name: 'Alice', age: 30 };

// in operator
console.log('name' in person);  // true
console.log('email' in person); // false

// hasOwnProperty
console.log(person.hasOwnProperty('name'));  // true

// Optional chaining (?.)
console.log(person?.email?.address);  // undefined (no error)
```

### Object Iteration

```javascript
const person = { name: 'Alice', age: 30, city: 'New York' };

// for...in loop
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

// Object.keys()
const keys = Object.keys(person);
console.log(keys);  // ['name', 'age', 'city']

// Object.values()
const values = Object.values(person);
console.log(values);  // ['Alice', 30, 'New York']

// Object.entries()
const entries = Object.entries(person);
console.log(entries);
// [['name', 'Alice'], ['age', 30], ['city', 'New York']]

entries.forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});
```

### Object Methods

```javascript
// Object.assign() - copy properties
const target = { a: 1 };
const source = { b: 2, c: 3 };
Object.assign(target, source);
console.log(target);  // { a: 1, b: 2, c: 3 }

// Spread operator (preferred)
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const combined = { ...obj1, ...obj2 };
console.log(combined);  // { a: 1, b: 2, c: 3, d: 4 }

// Object.freeze() - prevent modifications
const frozen = Object.freeze({ name: 'Alice' });
frozen.name = 'Bob';  // Silently fails (strict mode throws error)
console.log(frozen.name);  // 'Alice'

// Object.seal() - prevent adding/removing properties
const sealed = Object.seal({ name: 'Alice' });
sealed.name = 'Bob';  // Allowed
sealed.age = 30;      // Silently fails
delete sealed.name;   // Silently fails
```

## Arrays

Ordered collections of values:

```javascript
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, 'two', true, null, { name: 'Alice' }];
```

### Creating Arrays

```javascript
// Array literal (most common)
const fruits = ['apple', 'banana', 'orange'];

// Array constructor
const numbers = new Array(1, 2, 3, 4, 5);

// Array.of()
const arr = Array.of(1, 2, 3);

// Array.from() - create from iterable
const str = 'hello';
const chars = Array.from(str);  // ['h', 'e', 'l', 'l', 'o']
```

### Accessing Elements

```javascript
const fruits = ['apple', 'banana', 'orange'];

// By index (0-based)
console.log(fruits[0]);  // 'apple'
console.log(fruits[1]);  // 'banana'

// Last element
console.log(fruits[fruits.length - 1]);  // 'orange'

// at() method (ES2022)
console.log(fruits.at(0));   // 'apple'
console.log(fruits.at(-1));  // 'orange' (negative index from end)
```

### Array Length

```javascript
const fruits = ['apple', 'banana', 'orange'];
console.log(fruits.length);  // 3

// Modify length
fruits.length = 2;
console.log(fruits);  // ['apple', 'banana']

fruits.length = 5;
console.log(fruits);  // ['apple', 'banana', empty × 3]
```

### Adding Elements

```javascript
const fruits = ['apple', 'banana'];

// push() - add to end
fruits.push('orange');
console.log(fruits);  // ['apple', 'banana', 'orange']

// unshift() - add to beginning
fruits.unshift('mango');
console.log(fruits);  // ['mango', 'apple', 'banana', 'orange']

// Direct assignment
fruits[4] = 'grape';
console.log(fruits);  // ['mango', 'apple', 'banana', 'orange', 'grape']
```

### Removing Elements

```javascript
const fruits = ['apple', 'banana', 'orange', 'mango'];

// pop() - remove from end
const last = fruits.pop();
console.log(last);    // 'mango'
console.log(fruits);  // ['apple', 'banana', 'orange']

// shift() - remove from beginning
const first = fruits.shift();
console.log(first);   // 'apple'
console.log(fruits);  // ['banana', 'orange']

// splice() - remove from specific position
fruits.splice(1, 1);  // Remove 1 element at index 1
console.log(fruits);  // ['banana']

// delete (leaves empty slot, avoid)
delete fruits[0];
console.log(fruits);  // [empty, 'orange']
```

### Array Methods

#### Transformation Methods

```javascript
const numbers = [1, 2, 3, 4, 5];

// map() - transform each element
const doubled = numbers.map(n => n * 2);
console.log(doubled);  // [2, 4, 6, 8, 10]

// filter() - keep elements that pass test
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);  // [2, 4]

// reduce() - reduce to single value
const sum = numbers.reduce((total, n) => total + n, 0);
console.log(sum);  // 15

// forEach() - execute function for each element
numbers.forEach(n => console.log(n * 2));
```

#### Searching Methods

```javascript
const fruits = ['apple', 'banana', 'orange', 'banana'];

// indexOf() - first occurrence
console.log(fruits.indexOf('banana'));  // 1
console.log(fruits.indexOf('grape'));   // -1 (not found)

// lastIndexOf() - last occurrence
console.log(fruits.lastIndexOf('banana'));  // 3

// includes() - check if exists
console.log(fruits.includes('apple'));  // true
console.log(fruits.includes('grape'));  // false

// find() - first element that passes test
const numbers = [5, 12, 8, 130, 44];
const found = numbers.find(n => n > 10);
console.log(found);  // 12

// findIndex() - index of first element that passes test
const index = numbers.findIndex(n => n > 10);
console.log(index);  // 1

// some() - at least one passes test
const hasEven = numbers.some(n => n % 2 === 0);
console.log(hasEven);  // true

// every() - all pass test
const allEven = numbers.every(n => n % 2 === 0);
console.log(allEven);  // false
```

#### Sorting and Reversing

```javascript
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// sort() - sorts in place (converts to strings!)
numbers.sort();
console.log(numbers);  // [1, 1, 2, 3, 4, 5, 6, 9]

// sort with compare function (for numbers)
numbers.sort((a, b) => a - b);  // Ascending
numbers.sort((a, b) => b - a);  // Descending

// reverse() - reverses in place
numbers.reverse();
console.log(numbers);  // [6, 2, 9, 5, 1, 4, 1, 3]
```

#### Joining and Slicing

```javascript
const fruits = ['apple', 'banana', 'orange'];

// join() - create string from array
const str = fruits.join(', ');
console.log(str);  // "apple, banana, orange"

// slice() - extract portion (doesn't modify original)
const sliced = fruits.slice(1, 3);
console.log(sliced);  // ['banana', 'orange']
console.log(fruits);  // ['apple', 'banana', 'orange'] (unchanged)

// splice() - modify array (add/remove elements)
const removed = fruits.splice(1, 1, 'mango', 'grape');
console.log(removed);  // ['banana']
console.log(fruits);   // ['apple', 'mango', 'grape', 'orange']

// concat() - merge arrays
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = arr1.concat(arr2);
console.log(merged);  // [1, 2, 3, 4]

// Spread operator (preferred)
const combined = [...arr1, ...arr2];
console.log(combined);  // [1, 2, 3, 4]
```

### Multi-Dimensional Arrays

```javascript
const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

console.log(matrix[0][0]);  // 1
console.log(matrix[1][2]);  // 6
console.log(matrix[2][1]);  // 8

// Iterate
matrix.forEach(row => {
    row.forEach(value => {
        console.log(value);
    });
});
```

## Destructuring

Extract values from objects and arrays:

### Object Destructuring

```javascript
const person = { name: 'Alice', age: 30, city: 'New York' };

// Basic destructuring
const { name, age } = person;
console.log(name);  // 'Alice'
console.log(age);   // 30

// Rename variables
const { name: personName, age: personAge } = person;
console.log(personName);  // 'Alice'

// Default values
const { name, country = 'USA' } = person;
console.log(country);  // 'USA'

// Nested destructuring
const user = {
    name: 'Bob',
    address: {
        city: 'Boston',
        zip: '02101'
    }
};

const { address: { city, zip } } = user;
console.log(city);  // 'Boston'
console.log(zip);   // '02101'

// Rest properties
const { name, ...rest } = person;
console.log(rest);  // { age: 30, city: 'New York' }
```

### Array Destructuring

```javascript
const numbers = [1, 2, 3, 4, 5];

// Basic destructuring
const [first, second] = numbers;
console.log(first);   // 1
console.log(second);  // 2

// Skip elements
const [a, , c] = numbers;
console.log(a);  // 1
console.log(c);  // 3

// Default values
const [x, y, z = 0] = [1, 2];
console.log(z);  // 0

// Rest elements
const [head, ...tail] = numbers;
console.log(head);  // 1
console.log(tail);  // [2, 3, 4, 5]

// Swapping variables
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y);  // 2, 1
```

### Destructuring in Function Parameters

```javascript
// Object parameters
function createUser({ name, age, city = 'Unknown' }) {
    console.log(`${name}, ${age}, from ${city}`);
}

createUser({ name: 'Alice', age: 30 });
// "Alice, 30, from Unknown"

// Array parameters
function sum([a, b, c]) {
    return a + b + c;
}

console.log(sum([1, 2, 3]));  // 6
```

## Practical Examples

### Shopping Cart

```javascript
const cart = [
    { id: 1, name: 'Laptop', price: 999, quantity: 1 },
    { id: 2, name: 'Mouse', price: 25, quantity: 2 },
    { id: 3, name: 'Keyboard', price: 75, quantity: 1 }
];

// Calculate total
const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
console.log(`Total: $${total}`);  // Total: $1124

// Get item names
const items = cart.map(item => item.name);
console.log(items);  // ['Laptop', 'Mouse', 'Keyboard']

// Find expensive items
const expensive = cart.filter(item => item.price > 50);
console.log(expensive);
```

### User Management

```javascript
const users = [
    { id: 1, name: 'Alice', role: 'admin', active: true },
    { id: 2, name: 'Bob', role: 'user', active: true },
    { id: 3, name: 'Charlie', role: 'user', active: false }
];

// Find admin
const admin = users.find(user => user.role === 'admin');
console.log(admin);

// Active users
const activeUsers = users.filter(user => user.active);
console.log(activeUsers);

// User names
const names = users.map(user => user.name);
console.log(names);  // ['Alice', 'Bob', 'Charlie']

// Check if any inactive
const hasInactive = users.some(user => !user.active);
console.log(hasInactive);  // true
```

## Best Practices

**Use const for arrays and objects**: Prevents reassignment.

**Use array methods over loops**: map, filter, reduce are cleaner.

**Use destructuring**: Makes code more readable.

**Use spread operator**: Cleaner than concat or Object.assign.

**Avoid modifying arrays directly**: Use methods that return new arrays.

**Use meaningful names**: Descriptive property and variable names.

## Common Mistakes

**Modifying array during iteration**: Can cause issues.

**Confusing map and forEach**: map returns new array, forEach doesn't.

**Mutating original array**: Some methods modify in place (sort, reverse).

**Forgetting array is 0-indexed**: First element is index 0, not 1.

**Using == instead of ===**: Type coercion issues.

## Conclusion

Objects and arrays are fundamental to JavaScript programming. Objects store key-value pairs for structured data, while arrays hold ordered collections. Master object and array methods (map, filter, reduce, find), destructuring for clean value extraction, and the spread operator for copying and merging. These data structures, combined with their powerful methods, enable you to manipulate and transform data effectively in modern JavaScript applications.
