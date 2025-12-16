import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  {
    id: 'cs305-t3-ex01',
    subjectId: 'cs305',
    topicId: 'cs305-topic-3',
    title: 'Basic Function Declaration',
    difficulty: 1,
    description: 'Create a function that takes two numbers and returns their sum.',
    starterCode: `// Create a function to add two numbers
function add(a, b) {
  // Your code here
}`,
    solution: `function add(a, b) {
  return a + b;
}`,
    testCases: [
      { input: 'add(5, 3)', expectedOutput: '8', isHidden: false, description: 'Should add 5 and 3' },
      { input: 'add(10, -5)', expectedOutput: '5', isHidden: false, description: 'Should handle negative numbers' },
      { input: 'add(0, 0)', expectedOutput: '0', isHidden: false, description: 'Should handle zeros' }
    ],
    hints: [
      'Use the return keyword to return a value',
      'The + operator adds numbers together',
      'Function parameters are like variables'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t3-ex02',
    subjectId: 'cs305',
    topicId: 'cs305-topic-3',
    title: 'Arrow Function Syntax',
    difficulty: 1,
    description: 'Convert a regular function to an arrow function that multiplies two numbers.',
    starterCode: `// Create an arrow function to multiply
const multiply = // Your code here`,
    solution: `const multiply = (a, b) => a * b;`,
    testCases: [
      { input: 'multiply(4, 5)', expectedOutput: '20', isHidden: false, description: 'Should multiply 4 and 5' },
      { input: 'multiply(7, 3)', expectedOutput: '21', isHidden: false, description: 'Should multiply 7 and 3' }
    ],
    hints: [
      'Arrow functions use => syntax',
      'Single expression arrow functions have implicit return',
      'Syntax: (params) => expression'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t3-ex03',
    subjectId: 'cs305',
    topicId: 'cs305-topic-3',
    title: 'Array Map Method',
    difficulty: 1,
    description: 'Use the map method to double all numbers in an array.',
    starterCode: `// Double all numbers in an array
function doubleNumbers(numbers) {
  // Your code here
}`,
    solution: `function doubleNumbers(numbers) {
  return numbers.map(num => num * 2);
}`,
    testCases: [
      { input: 'doubleNumbers([1, 2, 3, 4])', expectedOutput: '[2, 4, 6, 8]', isHidden: false, description: 'Should double all numbers' },
      { input: 'doubleNumbers([5, 10])', expectedOutput: '[10, 20]', isHidden: false, description: 'Should work with different numbers' }
    ],
    hints: [
      'map() creates a new array by transforming each element',
      'map() takes a callback function as argument',
      'The callback receives each element as parameter'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t3-ex04',
    subjectId: 'cs305',
    topicId: 'cs305-topic-3',
    title: 'Array Filter Method',
    difficulty: 1,
    description: 'Use the filter method to get only even numbers from an array.',
    starterCode: `// Filter even numbers
function getEvenNumbers(numbers) {
  // Your code here
}`,
    solution: `function getEvenNumbers(numbers) {
  return numbers.filter(num => num % 2 === 0);
}`,
    testCases: [
      { input: 'getEvenNumbers([1, 2, 3, 4, 5, 6])', expectedOutput: '[2, 4, 6]', isHidden: false, description: 'Should return only even numbers' },
      { input: 'getEvenNumbers([7, 8, 9, 10])', expectedOutput: '[8, 10]', isHidden: false, description: 'Should work with different numbers' }
    ],
    hints: [
      'filter() creates a new array with elements that pass a test',
      'Use modulo operator (%) to check for even numbers',
      'num % 2 === 0 checks if a number is even'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t3-ex05',
    subjectId: 'cs305',
    topicId: 'cs305-topic-3',
    title: 'Object Property Access',
    difficulty: 2,
    description: 'Create a function that takes a person object and returns their full name.',
    starterCode: `// Get full name from person object
function getFullName(person) {
  // person has firstName and lastName properties
  // Your code here
}`,
    solution: `function getFullName(person) {
  return \`\${person.firstName} \${person.lastName}\`;
}`,
    testCases: [
      { input: 'getFullName({firstName: "John", lastName: "Doe"})', expectedOutput: 'John Doe', isHidden: false, description: 'Should return full name' },
      { input: 'getFullName({firstName: "Jane", lastName: "Smith"})', expectedOutput: 'Jane Smith', isHidden: false, description: 'Should work with different names' }
    ],
    hints: [
      'Access object properties with dot notation',
      'Use template literals for string concatenation',
      'Template literals use backticks and ${} syntax'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t3-ex06',
    subjectId: 'cs305',
    topicId: 'cs305-topic-3',
    title: 'Array Reduce Method',
    difficulty: 2,
    description: 'Use the reduce method to sum all numbers in an array.',
    starterCode: `// Sum all numbers using reduce
function sumArray(numbers) {
  // Your code here
}`,
    solution: `function sumArray(numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}`,
    testCases: [
      { input: 'sumArray([1, 2, 3, 4, 5])', expectedOutput: '15', isHidden: false, description: 'Should sum all numbers' },
      { input: 'sumArray([10, 20, 30])', expectedOutput: '60', isHidden: false, description: 'Should work with different numbers' }
    ],
    hints: [
      'reduce() reduces an array to a single value',
      'First parameter is accumulator, second is current value',
      'The second argument to reduce() is the initial value'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t3-ex07',
    subjectId: 'cs305',
    topicId: 'cs305-topic-3',
    title: 'Object Destructuring',
    difficulty: 2,
    description: 'Use object destructuring to extract properties from an object.',
    starterCode: `// Extract name and age using destructuring
function getUserInfo(user) {
  // user has name, age, and email properties
  // Return only name and age as object
  // Your code here
}`,
    solution: `function getUserInfo(user) {
  const { name, age } = user;
  return { name, age };
}`,
    testCases: [
      { input: 'getUserInfo({name: "Alice", age: 25, email: "alice@example.com"})', expectedOutput: '{name: "Alice", age: 25}', isHidden: false, description: 'Should extract name and age' }
    ],
    hints: [
      'Destructuring syntax: const { prop1, prop2 } = object',
      'Destructuring extracts properties into variables',
      'Use shorthand syntax for returning objects'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t3-ex08',
    subjectId: 'cs305',
    topicId: 'cs305-topic-3',
    title: 'Spread Operator with Arrays',
    difficulty: 2,
    description: 'Use the spread operator to combine two arrays.',
    starterCode: `// Combine two arrays using spread
function combineArrays(arr1, arr2) {
  // Your code here
}`,
    solution: `function combineArrays(arr1, arr2) {
  return [...arr1, ...arr2];
}`,
    testCases: [
      { input: 'combineArrays([1, 2], [3, 4])', expectedOutput: '[1, 2, 3, 4]', isHidden: false, description: 'Should combine arrays' },
      { input: 'combineArrays(["a"], ["b", "c"])', expectedOutput: '["a", "b", "c"]', isHidden: false, description: 'Should work with strings' }
    ],
    hints: [
      'Spread operator is ...',
      'Spread unpacks array elements',
      'Syntax: [...array1, ...array2]'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t3-ex09',
    subjectId: 'cs305',
    topicId: 'cs305-topic-3',
    title: 'Array Find Method',
    difficulty: 3,
    description: 'Use the find method to locate a user by ID in an array of user objects.',
    starterCode: `// Find user by ID
function findUserById(users, id) {
  // users is array of objects with id property
  // Your code here
}`,
    solution: `function findUserById(users, id) {
  return users.find(user => user.id === id);
}`,
    testCases: [
      { input: 'findUserById([{id: 1, name: "Alice"}, {id: 2, name: "Bob"}], 2)', expectedOutput: '{id: 2, name: "Bob"}', isHidden: false, description: 'Should find user with id 2' },
      { input: 'findUserById([{id: 5, name: "Charlie"}], 5)', expectedOutput: '{id: 5, name: "Charlie"}', isHidden: false, description: 'Should find correct user' }
    ],
    hints: [
      'find() returns the first element that matches',
      'Returns undefined if no match found',
      'Use comparison operator === to match id'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t3-ex10',
    subjectId: 'cs305',
    topicId: 'cs305-topic-3',
    title: 'Default Parameters',
    difficulty: 3,
    description: 'Create a function with default parameters for greeting a user.',
    starterCode: `// Greet user with default greeting
function greet(name, greeting) {
  // greeting should default to "Hello"
  // Your code here
}`,
    solution: `function greet(name, greeting = "Hello") {
  return \`\${greeting}, \${name}!\`;
}`,
    testCases: [
      { input: 'greet("Alice")', expectedOutput: 'Hello, Alice!', isHidden: false, description: 'Should use default greeting' },
      { input: 'greet("Bob", "Hi")', expectedOutput: 'Hi, Bob!', isHidden: false, description: 'Should use custom greeting' }
    ],
    hints: [
      'Default parameters: function(param = defaultValue)',
      'Default value is used when argument is undefined',
      'Use template literals for string formatting'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t3-ex11',
    subjectId: 'cs305',
    topicId: 'cs305-topic-3',
    title: 'Array Some and Every',
    difficulty: 3,
    description: 'Use some() and every() methods to check array conditions.',
    starterCode: `// Check if all numbers are positive and if any are greater than 10
function checkNumbers(numbers) {
  // Return object with allPositive and anyGreaterThan10 properties
  // Your code here
}`,
    solution: `function checkNumbers(numbers) {
  return {
    allPositive: numbers.every(num => num > 0),
    anyGreaterThan10: numbers.some(num => num > 10)
  };
}`,
    testCases: [
      { input: 'checkNumbers([1, 5, 15, 20])', expectedOutput: '{allPositive: true, anyGreaterThan10: true}', isHidden: false, description: 'Should check conditions correctly' },
      { input: 'checkNumbers([2, 4, 6, 8])', expectedOutput: '{allPositive: true, anyGreaterThan10: false}', isHidden: false, description: 'Should handle no numbers > 10' }
    ],
    hints: [
      'every() returns true if all elements pass the test',
      'some() returns true if at least one element passes',
      'Both take a callback function as argument'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t3-ex12',
    subjectId: 'cs305',
    topicId: 'cs305-topic-3',
    title: 'Rest Parameters',
    difficulty: 3,
    description: 'Create a function that accepts any number of arguments using rest parameters.',
    starterCode: `// Calculate average of any number of arguments
function average(...numbers) {
  // Your code here
}`,
    solution: `function average(...numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}`,
    testCases: [
      { input: 'average(10, 20, 30)', expectedOutput: '20', isHidden: false, description: 'Should calculate average of 3 numbers' },
      { input: 'average(5, 15)', expectedOutput: '10', isHidden: false, description: 'Should work with 2 numbers' }
    ],
    hints: [
      'Rest parameters use ... syntax',
      'Collects remaining arguments into an array',
      'Use reduce() to sum, then divide by length'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t3-ex13',
    subjectId: 'cs305',
    topicId: 'cs305-topic-3',
    title: 'Object Methods and This',
    difficulty: 4,
    description: 'Create an object with methods that use the "this" keyword.',
    starterCode: `// Create a counter object with increment and getValue methods
function createCounter() {
  // Your code here
}`,
    solution: `function createCounter() {
  return {
    value: 0,
    increment() {
      this.value++;
      return this.value;
    },
    getValue() {
      return this.value;
    }
  };
}`,
    testCases: [
      { input: 'const c = createCounter(); c.increment(); c.getValue()', expectedOutput: '1', isHidden: false, description: 'Should increment and return value' },
      { input: 'const c = createCounter(); c.increment(); c.increment(); c.getValue()', expectedOutput: '2', isHidden: false, description: 'Should handle multiple increments' }
    ],
    hints: [
      'Use "this" to refer to the current object',
      'Method shorthand: methodName() {}',
      'Arrow functions don\'t have their own "this"'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t3-ex14',
    subjectId: 'cs305',
    topicId: 'cs305-topic-3',
    title: 'Array Chaining Methods',
    difficulty: 4,
    description: 'Chain multiple array methods to transform data.',
    starterCode: `// Get names of users over 18, sorted alphabetically
function getAdultNames(users) {
  // users is array of {name, age} objects
  // Your code here
}`,
    solution: `function getAdultNames(users) {
  return users
    .filter(user => user.age > 18)
    .map(user => user.name)
    .sort();
}`,
    testCases: [
      { input: 'getAdultNames([{name: "Bob", age: 20}, {name: "Alice", age: 17}, {name: "Charlie", age: 25}])', expectedOutput: '["Bob", "Charlie"]', isHidden: false, description: 'Should filter, map, and sort' }
    ],
    hints: [
      'Chain methods by calling one after another',
      'filter() first to get adults',
      'map() to extract names, sort() to alphabetize'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t3-ex15',
    subjectId: 'cs305',
    topicId: 'cs305-topic-3',
    title: 'Template Literals and Expressions',
    difficulty: 4,
    description: 'Create a function that generates HTML using template literals with embedded expressions.',
    starterCode: `// Generate user card HTML
function generateUserCard(user) {
  // user has name, email, and age properties
  // Return HTML string
  // Your code here
}`,
    solution: `function generateUserCard(user) {
  return \`<div class="user-card">
  <h2>\${user.name}</h2>
  <p>Email: \${user.email}</p>
  <p>Age: \${user.age}</p>
  <p>Status: \${user.age >= 18 ? 'Adult' : 'Minor'}</p>
</div>\`;
}`,
    testCases: [
      { input: 'generateUserCard({name: "Alice", email: "alice@example.com", age: 25})', expectedOutput: '<div class="user-card">', isHidden: false, description: 'Should generate HTML' },
      { input: 'generateUserCard({name: "Bob", email: "bob@example.com", age: 16})', expectedOutput: 'Status: Minor', isHidden: false, description: 'Should show Minor for age < 18' }
    ],
    hints: [
      'Template literals support multiline strings',
      'Use ${} for expressions and variables',
      'Ternary operator: condition ? trueValue : falseValue'
    ],
    language: 'javascript'
  },
  {
    id: 'cs305-t3-ex16',
    subjectId: 'cs305',
    topicId: 'cs305-topic-3',
    title: 'Advanced Object Manipulation',
    difficulty: 5,
    description: 'Create a function that merges multiple objects, transforms values, and computes derived properties.',
    starterCode: `// Merge product data and calculate total price
function processProducts(baseProduct, updates, quantity) {
  // Merge baseProduct and updates
  // Add totalPrice = price * quantity
  // Add discount property (10% if quantity > 10)
  // Your code here
}`,
    solution: `function processProducts(baseProduct, updates, quantity) {
  const merged = { ...baseProduct, ...updates };
  const totalPrice = merged.price * quantity;
  const discount = quantity > 10 ? 0.1 : 0;
  const finalPrice = totalPrice * (1 - discount);

  return {
    ...merged,
    quantity,
    totalPrice,
    discount: discount * 100,
    finalPrice
  };
}`,
    testCases: [
      { input: 'processProducts({name: "Widget", price: 10}, {color: "blue"}, 5)', expectedOutput: '{name: "Widget", price: 10, color: "blue", quantity: 5, totalPrice: 50, discount: 0, finalPrice: 50}', isHidden: false, description: 'Should merge and calculate without discount' },
      { input: 'processProducts({name: "Gadget", price: 20}, {}, 15)', expectedOutput: '10', isHidden: true, description: 'Should apply 10% discount for quantity > 10' }
    ],
    hints: [
      'Use spread operator to merge objects',
      'Later properties override earlier ones',
      'Calculate derived properties step by step',
      'Return a new object with all properties'
    ],
    language: 'javascript'
  }
];
