import { Topic } from '../../../core/types';

export const cs101Topics: Topic[] = [
  {
    id: 'cs101-topic-1',
    title: 'Variables and Data Types',
    content: `## Introduction

Welcome to your first step in learning Python programming! In this topic, you'll learn how computers store and manipulate information through variables and data types. By the end, you'll be able to create variables, understand Python's core data types, and convert between them confidently.

**Learning Objectives:**
- Create and name variables following Python conventions
- Identify and use the four basic data types: int, float, str, and bool
- Convert between data types using type casting
- Use the type() function to inspect variable types
- Understand how Python handles dynamic typing

---

## Core Concepts

### What Are Variables?

Variables are named containers that store data in your program's memory. Think of them as labeled boxes where you can put information and retrieve it later using the label (the variable name).

\`\`\`python
# Creating variables is simple - just use the assignment operator (=)
age = 25
name = "Alice"
temperature = 98.6
is_student = True
\`\`\`

Unlike some programming languages, Python doesn't require you to declare a variable's type before using it. Python figures out the type automatically based on the value you assign - this is called **dynamic typing**.

### Variable Naming Rules

Python has specific rules for naming variables:

\`\`\`python
# Valid variable names
user_name = "Bob"      # Snake case (recommended style)
userName = "Bob"       # Camel case (works but not preferred)
_private = 42          # Can start with underscore
count2 = 10            # Can contain numbers (but not at start)

# Invalid variable names - these will cause errors!
# 2count = 10          # Cannot start with a number
# user-name = "Bob"    # Cannot contain hyphens
# class = "Math"       # Cannot use reserved keywords
\`\`\`

**Convention:** Python programmers use \`snake_case\` for variable names (lowercase with underscores). This is defined in PEP 8, Python's style guide.

### The Four Basic Data Types

Python has four fundamental data types you'll use constantly:

**1. Integers (int)** - Whole numbers without decimal points

\`\`\`python
count = 42
negative = -17
zero = 0
big_number = 1_000_000  # Underscores improve readability

print(type(count))  # Output: <class 'int'>
\`\`\`

**2. Floating-Point Numbers (float)** - Numbers with decimal points

\`\`\`python
price = 19.99
pi = 3.14159
scientific = 2.5e-3  # Scientific notation: 0.0025

print(type(price))  # Output: <class 'float'>
\`\`\`

**3. Strings (str)** - Text enclosed in quotes

\`\`\`python
single = 'Hello'           # Single quotes
double = "World"           # Double quotes (same as single)
multiline = """This is
a multiline
string"""                  # Triple quotes for multiple lines

# String operations
greeting = "Hello" + " " + "World"  # Concatenation
repeated = "Ha" * 3                  # Repetition: "HaHaHa"
length = len(greeting)               # Length: 11
\`\`\`

**4. Booleans (bool)** - True or False values

\`\`\`python
is_active = True
has_permission = False

# Booleans from comparisons
is_adult = age >= 18      # True if age is 18 or more
is_empty = len(name) == 0  # True if name has no characters
\`\`\`

### Type Conversion (Casting)

You can convert between types using built-in functions:

\`\`\`python
# String to number
age_str = "25"
age_int = int(age_str)      # 25 (integer)
price_float = float("19.99")  # 19.99 (float)

# Number to string
count = 42
count_str = str(count)      # "42" (string)

# To boolean
bool(1)      # True (any non-zero number is True)
bool(0)      # False
bool("")     # False (empty string)
bool("Hi")   # True (non-empty string)

# Be careful with invalid conversions!
# int("hello")  # ValueError - can't convert text to int
# int("3.14")   # ValueError - use float() first, then int()
\`\`\`

---

## Common Patterns and Idioms

### Swapping Variables

Python has an elegant way to swap values without a temporary variable:

\`\`\`python
a = 5
b = 10
a, b = b, a  # Now a=10, b=5
\`\`\`

### Multiple Assignment

Assign multiple variables at once:

\`\`\`python
x, y, z = 1, 2, 3
name, age, city = "Alice", 30, "NYC"
\`\`\`

### Checking Types

Use \`type()\` for debugging and \`isinstance()\` for checking:

\`\`\`python
value = 42
print(type(value))              # <class 'int'>
print(isinstance(value, int))   # True
print(isinstance(value, (int, float)))  # True - check multiple types
\`\`\`

### String Formatting (f-strings)

The modern way to embed variables in strings:

\`\`\`python
name = "Alice"
age = 30
message = f"My name is {name} and I am {age} years old."
# Output: "My name is Alice and I am 30 years old."

# You can include expressions
price = 19.99
print(f"Total: \${price * 1.1:.2f}")  # "Total: $21.99"
\`\`\`

---

## Common Mistakes and Debugging

### Mistake 1: Using Undefined Variables

\`\`\`python
# Wrong - using a variable before defining it
print(username)  # NameError: name 'username' is not defined

# Fix - define the variable first
username = "Alice"
print(username)
\`\`\`

### Mistake 2: Type Mismatches

\`\`\`python
# Wrong - can't concatenate string and integer
age = 25
message = "I am " + age + " years old"  # TypeError!

# Fix - convert to string
message = "I am " + str(age) + " years old"
# Or better, use f-strings
message = f"I am {age} years old"
\`\`\`

### Mistake 3: Integer Division Confusion

\`\`\`python
# In Python 3, division always returns float
result = 5 / 2   # 2.5 (float)
result = 4 / 2   # 2.0 (still float!)

# Use // for integer division
result = 5 // 2  # 2 (integer)
\`\`\`

### Mistake 4: Modifying Strings

\`\`\`python
# Strings are immutable - you can't change them in place
name = "Alice"
# name[0] = "B"  # TypeError!

# Fix - create a new string
name = "B" + name[1:]  # "Blice"
\`\`\`

---

## Best Practices

1. **Use descriptive names**: \`user_age\` is better than \`x\` or \`a\`

2. **Follow naming conventions**: Use \`snake_case\` for variables, \`UPPER_CASE\` for constants

3. **Initialize variables before use**: Define variables at the top of their scope

4. **Use type hints for clarity** (optional but helpful):
\`\`\`python
age: int = 25
name: str = "Alice"
\`\`\`

5. **Prefer f-strings** over concatenation or .format()

6. **Don't use single letters** except for loop counters (\`i\`, \`j\`) or coordinates (\`x\`, \`y\`)

---

## Summary

You've learned the foundations of working with data in Python:

- **Variables** store data using the assignment operator (\`=\`)
- **Four basic types**: \`int\` (whole numbers), \`float\` (decimals), \`str\` (text), \`bool\` (True/False)
- **Dynamic typing** means Python determines types automatically
- **Type conversion** uses \`int()\`, \`float()\`, \`str()\`, \`bool()\`
- **f-strings** are the modern way to format strings with variables

**Key takeaways:**
- Always use descriptive, snake_case variable names
- Be mindful of types when doing operations
- Use \`type()\` to debug type-related errors

---

## Further Exploration

Ready for more? Try these challenges:
- What happens when you add very large integers? (Python handles them!)
- Explore string methods: \`.upper()\`, \`.lower()\`, \`.split()\`, \`.strip()\`
- Learn about \`None\` - Python's way of representing "no value"`,
    quizIds: ['cs101-quiz-1', 'cs101-quiz-1b', 'cs101-quiz-1c'],
    exerciseIds: ['cs101-exercise-1', 'cs101-t1-ex02', 'cs101-t1-ex03', 'cs101-t1-ex04', 'cs101-t1-ex05', 'cs101-t1-ex06', 'cs101-t1-ex07', 'cs101-t1-ex08', 'cs101-t1-ex09', 'cs101-t1-ex10', 'cs101-t1-ex11', 'cs101-t1-ex12', 'cs101-t1-ex13', 'cs101-t1-ex14', 'cs101-t1-ex15', 'cs101-t1-ex16']
  },
  {
    id: 'cs101-topic-2',
    title: 'Control Flow (if/else, loops)',
    content: `## Introduction

Programs become truly powerful when they can make decisions and repeat actions. Control flow statements let your code choose different paths based on conditions and execute code multiple times without repetition. This topic covers the essential building blocks: conditional statements and loops.

**Learning Objectives:**
- Write conditional statements using if, elif, and else
- Understand comparison and logical operators
- Create for loops to iterate over sequences
- Use while loops for condition-based repetition
- Control loop execution with break and continue
- Avoid common pitfalls like infinite loops

---

## Core Concepts

### Conditional Statements

Conditional statements let your program make decisions. The basic structure uses \`if\`, \`elif\` (else if), and \`else\`:

\`\`\`python
temperature = 75

if temperature > 85:
    print("It's hot outside!")
elif temperature > 65:
    print("Nice weather!")
elif temperature > 45:
    print("It's a bit chilly.")
else:
    print("It's cold!")
\`\`\`

**Key points:**
- The condition after \`if\` or \`elif\` must evaluate to True or False
- Indentation (4 spaces) defines the code block
- Only ONE branch executes - Python checks from top to bottom and stops at the first True condition
- \`else\` catches everything that didn't match above (optional)

### Comparison Operators

These operators compare values and return True or False:

\`\`\`python
x = 10
y = 5

x == y    # Equal to: False
x != y    # Not equal to: True
x > y     # Greater than: True
x < y     # Less than: False
x >= y    # Greater than or equal: True
x <= y    # Less than or equal: False
\`\`\`

### Logical Operators

Combine multiple conditions:

\`\`\`python
age = 25
has_license = True

# AND - both must be True
if age >= 18 and has_license:
    print("You can drive!")

# OR - at least one must be True
if age < 13 or age > 65:
    print("Discount available!")

# NOT - inverts the boolean
if not has_license:
    print("You need a license first.")
\`\`\`

### For Loops

For loops iterate over a sequence (list, string, range, etc.):

\`\`\`python
# Iterate over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Iterate over a string
for char in "Hello":
    print(char)

# Iterate over a range of numbers
for i in range(5):      # 0, 1, 2, 3, 4
    print(i)

for i in range(2, 6):   # 2, 3, 4, 5
    print(i)

for i in range(0, 10, 2):  # 0, 2, 4, 6, 8 (step of 2)
    print(i)
\`\`\`

### The range() Function

\`range()\` generates a sequence of numbers:

\`\`\`python
range(5)         # 0, 1, 2, 3, 4
range(1, 6)      # 1, 2, 3, 4, 5
range(0, 10, 2)  # 0, 2, 4, 6, 8
range(10, 0, -1) # 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 (countdown)
\`\`\`

### While Loops

While loops repeat as long as a condition is True:

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1  # Don't forget to update the condition!
# Output: 0, 1, 2, 3, 4
\`\`\`

### Break and Continue

Control loop execution:

\`\`\`python
# break - exit the loop immediately
for i in range(10):
    if i == 5:
        break  # Stop when i reaches 5
    print(i)
# Output: 0, 1, 2, 3, 4

# continue - skip to next iteration
for i in range(5):
    if i == 2:
        continue  # Skip printing 2
    print(i)
# Output: 0, 1, 3, 4
\`\`\`

---

## Common Patterns and Idioms

### Enumerate for Index and Value

Get both the index and value when iterating:

\`\`\`python
fruits = ["apple", "banana", "cherry"]
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
# Output:
# 0: apple
# 1: banana
# 2: cherry
\`\`\`

### Nested Loops

Loops inside loops:

\`\`\`python
for i in range(3):
    for j in range(3):
        print(f"({i}, {j})", end=" ")
    print()  # New line after inner loop
# Output:
# (0, 0) (0, 1) (0, 2)
# (1, 0) (1, 1) (1, 2)
# (2, 0) (2, 1) (2, 2)
\`\`\`

---

## Common Mistakes and Debugging

### Mistake 1: Infinite Loops

\`\`\`python
# Wrong - count never changes, loop runs forever!
count = 0
while count < 5:
    print(count)
    # Missing: count += 1

# Fix - always update the condition variable
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

### Mistake 2: Off-by-One Errors

\`\`\`python
# Wrong - range(5) gives 0-4, not 1-5
for i in range(5):
    print(i)  # Prints 0, 1, 2, 3, 4

# Fix - use range(1, 6) for 1-5
for i in range(1, 6):
    print(i)  # Prints 1, 2, 3, 4, 5
\`\`\`

---

## Best Practices

1. **Prefer for loops** when you know the number of iterations
2. **Use while loops** when the end condition is dynamic
3. **Keep loop bodies simple** - extract complex logic into functions
4. **Avoid deep nesting** - more than 3 levels is hard to read
5. **Use enumerate()** instead of manual index tracking

---

## Summary

You've learned how to control the flow of your programs:

- **if/elif/else** for making decisions based on conditions
- **Comparison operators** (==, !=, <, >, <=, >=) return True or False
- **Logical operators** (and, or, not) combine conditions
- **for loops** iterate over sequences with a known length
- **while loops** repeat while a condition is True
- **break** exits a loop early; **continue** skips to the next iteration`,
    quizIds: ['cs101-quiz-2', 'cs101-quiz-2b', 'cs101-quiz-2c'],
    exerciseIds: ['cs101-exercise-2', 'cs101-t2-ex02', 'cs101-t2-ex03', 'cs101-t2-ex04', 'cs101-t2-ex05', 'cs101-t2-ex06', 'cs101-t2-ex07', 'cs101-t2-ex08', 'cs101-t2-ex09', 'cs101-t2-ex10', 'cs101-t2-ex11', 'cs101-t2-ex12', 'cs101-t2-ex13', 'cs101-t2-ex14', 'cs101-t2-ex15', 'cs101-t2-ex16']
  },
  {
    id: 'cs101-topic-3',
    title: 'Functions',
    content: `## Introduction

Functions are the building blocks of organized, reusable code. Instead of writing the same code multiple times, you write it once in a function and call it whenever needed. This topic covers everything from basic function definition to advanced concepts like scope and lambda functions.

**Learning Objectives:**
- Define and call functions with parameters
- Return values from functions
- Understand variable scope (local vs global)
- Use default and keyword arguments
- Write docstrings to document functions
- Create simple lambda functions

---

## Core Concepts

### Defining Functions

Use the \`def\` keyword to create a function:

\`\`\`python
def greet():
    print("Hello, World!")

# Call the function
greet()  # Output: Hello, World!
\`\`\`

### Parameters and Arguments

Functions can accept input through parameters:

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")  # Output: Hello, Alice!
greet("Bob")    # Output: Hello, Bob!

# Multiple parameters
def add(a, b):
    print(f"{a} + {b} = {a + b}")

add(3, 5)  # Output: 3 + 5 = 8
\`\`\`

### Return Values

Functions can send data back using \`return\`:

\`\`\`python
def add(a, b):
    return a + b

result = add(3, 5)
print(result)  # Output: 8
\`\`\`

### Default Arguments

Provide default values for optional parameters:

\`\`\`python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")                # Output: Hello, Alice!
greet("Bob", "Good morning")  # Output: Good morning, Bob!
\`\`\`

### Variable Scope

Variables have different visibility depending on where they're defined:

\`\`\`python
# Global variable
message = "Hello"

def greet():
    # Local variable - only exists inside this function
    name = "Alice"
    print(f"{message}, {name}!")  # Can read global variable

greet()           # Output: Hello, Alice!
# print(name)     # NameError! name is not defined here
\`\`\`

---

## Common Patterns and Idioms

### Docstrings

Document your functions:

\`\`\`python
def calculate_bmi(weight_kg, height_m):
    """
    Calculate Body Mass Index (BMI).

    Args:
        weight_kg: Weight in kilograms
        height_m: Height in meters

    Returns:
        BMI value as a float
    """
    return weight_kg / (height_m ** 2)
\`\`\`

### Lambda Functions

Small anonymous functions for simple operations:

\`\`\`python
# Regular function
def square(x):
    return x ** 2

# Equivalent lambda
square = lambda x: x ** 2

# Often used with sorted
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
sorted_numbers = sorted(numbers, key=lambda x: -x)  # Descending
\`\`\`

---

## Common Mistakes and Debugging

### Mistake 1: Forgetting to Return

\`\`\`python
# Wrong - function returns None implicitly
def add(a, b):
    result = a + b
    # Missing return!

total = add(3, 5)
print(total)  # Output: None

# Fix - return the result
def add(a, b):
    return a + b
\`\`\`

### Mistake 2: Mutable Default Arguments

\`\`\`python
# Wrong - the list is shared between calls!
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item(1))  # [1]
print(add_item(2))  # [1, 2] - Unexpected!

# Fix - use None and create new list
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
\`\`\`

---

## Best Practices

1. **One function, one job** - Functions should do one thing well
2. **Descriptive names** - Use verbs: \`calculate_total()\`, \`get_user()\`, \`is_valid()\`
3. **Keep functions short** - If over 20-30 lines, consider splitting
4. **Always add docstrings** for public functions
5. **Return values, don't print** - Let the caller decide what to do with results

---

## Summary

You've learned the fundamentals of Python functions:

- **Define functions** with \`def\` keyword
- **Parameters** receive input; **return** sends output back
- **Default arguments** make parameters optional
- **Keyword arguments** improve readability
- **Scope** determines where variables are visible
- **Lambda** creates small anonymous functions`,
    quizIds: ['cs101-quiz-3', 'cs101-quiz-3b', 'cs101-quiz-3c'],
    exerciseIds: ['cs101-exercise-3', 'cs101-t3-ex02', 'cs101-t3-ex03', 'cs101-t3-ex04', 'cs101-t3-ex05', 'cs101-t3-ex06', 'cs101-t3-ex07', 'cs101-t3-ex08', 'cs101-t3-ex09', 'cs101-t3-ex10', 'cs101-t3-ex11', 'cs101-t3-ex12', 'cs101-t3-ex13', 'cs101-t3-ex14', 'cs101-t3-ex15', 'cs101-t3-ex16']
  },
  {
    id: 'cs101-topic-4',
    title: 'Lists and Dictionaries',
    content: `## Introduction

Lists and dictionaries are Python's most powerful built-in data structures. Lists store ordered sequences of items, while dictionaries store key-value pairs for fast lookups. Mastering these structures is essential for handling real-world data.

**Learning Objectives:**
- Create and manipulate lists with various methods
- Understand list indexing and slicing
- Use list comprehensions for concise transformations
- Create and access dictionary key-value pairs
- Iterate over lists and dictionaries effectively
- Choose the right data structure for different problems

---

## Core Concepts

### Lists: Ordered Collections

Lists store multiple items in a specific order:

\`\`\`python
# Creating lists
numbers = [1, 2, 3, 4, 5]
fruits = ["apple", "banana", "cherry"]
mixed = [1, "hello", 3.14, True]  # Can mix types
empty = []

# Accessing elements (0-indexed)
print(fruits[0])   # "apple" (first element)
print(fruits[-1])  # "cherry" (last element)
print(fruits[-2])  # "banana" (second to last)
\`\`\`

### List Slicing

Extract portions of a list with \`[start:end:step]\`:

\`\`\`python
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(numbers[2:5])    # [2, 3, 4] (indices 2, 3, 4)
print(numbers[:3])     # [0, 1, 2] (first 3)
print(numbers[7:])     # [7, 8, 9] (from index 7 to end)
print(numbers[::2])    # [0, 2, 4, 6, 8] (every 2nd)
print(numbers[::-1])   # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0] (reversed)
\`\`\`

### Modifying Lists

Lists are mutable - you can change them:

\`\`\`python
fruits = ["apple", "banana", "cherry"]

# Change an element
fruits[1] = "blueberry"  # ["apple", "blueberry", "cherry"]

# Add elements
fruits.append("date")    # Add to end
fruits.insert(1, "fig")  # Insert at index 1

# Remove elements
fruits.remove("apple")   # Remove first occurrence
last = fruits.pop()      # Remove and return last item
first = fruits.pop(0)    # Remove and return item at index
\`\`\`

### List Comprehensions

Create lists with concise syntax:

\`\`\`python
# Traditional approach
squares = []
for x in range(5):
    squares.append(x ** 2)

# List comprehension (same result)
squares = [x ** 2 for x in range(5)]  # [0, 1, 4, 9, 16]

# With condition (filter)
evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]
\`\`\`

### Dictionaries: Key-Value Pairs

Dictionaries store data with unique keys:

\`\`\`python
# Creating dictionaries
person = {
    "name": "Alice",
    "age": 30,
    "city": "NYC"
}

# Accessing values
print(person["name"])      # "Alice"
print(person.get("age"))   # 30
print(person.get("job", "Unknown"))  # "Unknown" (default if key missing)
\`\`\`

### Modifying Dictionaries

\`\`\`python
person = {"name": "Alice", "age": 30}

# Add or update
person["email"] = "alice@example.com"  # Add new key
person["age"] = 31                      # Update existing

# Remove
del person["age"]                # Remove key
email = person.pop("email")      # Remove and return value

# Other methods
keys = person.keys()             # All keys
values = person.values()         # All values
items = person.items()           # All key-value pairs as tuples
\`\`\`

---

## Common Mistakes and Debugging

### Mistake 1: Index Out of Range

\`\`\`python
fruits = ["apple", "banana", "cherry"]
# print(fruits[3])  # IndexError! Valid indices are 0, 1, 2

# Fix - check length first
if len(fruits) > 3:
    print(fruits[3])
\`\`\`

### Mistake 2: KeyError in Dictionaries

\`\`\`python
person = {"name": "Alice"}
# print(person["age"])  # KeyError: 'age'

# Fix - use .get() with default
print(person.get("age", "Unknown"))  # "Unknown"
\`\`\`

---

## Summary

You've mastered Python's essential data structures:

- **Lists** are ordered, mutable sequences accessed by index
- **Slicing** extracts portions: \`list[start:end:step]\`
- **List comprehensions** create lists concisely: \`[expr for x in seq]\`
- **Dictionaries** store key-value pairs for fast lookups
- **Iteration** works with \`for...in\` and \`enumerate()\``,
    quizIds: ['cs101-quiz-4', 'cs101-quiz-4b', 'cs101-quiz-4c'],
    exerciseIds: ['cs101-exercise-4', 'cs101-t4-ex02', 'cs101-t4-ex03', 'cs101-t4-ex04', 'cs101-t4-ex05', 'cs101-t4-ex06', 'cs101-t4-ex07', 'cs101-t4-ex08', 'cs101-t4-ex09', 'cs101-t4-ex10', 'cs101-t4-ex11', 'cs101-t4-ex12', 'cs101-t4-ex13', 'cs101-t4-ex14', 'cs101-t4-ex15', 'cs101-t4-ex16']
  },
  {
    id: 'cs101-topic-5',
    title: 'File I/O',
    content: `## Introduction

Real programs need to persist data beyond their runtime. File Input/Output (I/O) lets your programs read data from files and save results for later use. This topic covers reading and writing text files, handling different file formats, and managing files safely.

**Learning Objectives:**
- Open, read, and write text files
- Use context managers for safe file handling
- Handle common file formats (text, CSV, JSON)
- Navigate the file system with os and pathlib
- Handle file-related errors gracefully
- Understand file paths and working directories

---

## Core Concepts

### Opening and Closing Files

The basic pattern for file operations:

\`\`\`python
# Basic approach (not recommended)
file = open("data.txt", "r")
content = file.read()
file.close()  # Must remember to close!

# Better approach - context manager (recommended)
with open("data.txt", "r") as file:
    content = file.read()
# File automatically closed after the block
\`\`\`

**Always use \`with\` statements** - they ensure files are closed even if errors occur.

### File Modes

\`\`\`python
"r"   # Read (default) - file must exist
"w"   # Write - creates new or overwrites existing
"a"   # Append - adds to end of file
"r+"  # Read and write
"x"   # Exclusive creation - fails if file exists

# Add 'b' for binary mode
"rb"  # Read binary
"wb"  # Write binary
\`\`\`

### Reading Files

\`\`\`python
# Read entire file as string
with open("data.txt", "r") as file:
    content = file.read()
    print(content)

# Read all lines as list
with open("data.txt", "r") as file:
    lines = file.readlines()  # Includes newline at end of each line
    for line in lines:
        print(line.strip())  # Remove whitespace/newlines

# Read line by line (memory efficient for large files)
with open("data.txt", "r") as file:
    for line in file:
        print(line.strip())
\`\`\`

### Writing Files

\`\`\`python
# Write string to file (overwrites existing content!)
with open("output.txt", "w") as file:
    file.write("Hello, World!\\n")
    file.write("Second line\\n")

# Append to existing file
with open("log.txt", "a") as file:
    file.write("New log entry\\n")
\`\`\`

### Working with JSON Files

JSON is ideal for structured data:

\`\`\`python
import json

# Reading JSON
with open("data.json", "r") as file:
    data = json.load(file)  # Parse JSON to Python dict/list
    print(data["name"])

# Writing JSON
person = {"name": "Alice", "age": 30, "hobbies": ["reading", "hiking"]}
with open("output.json", "w") as file:
    json.dump(person, file, indent=2)  # Pretty-print with indentation
\`\`\`

---

## Common Mistakes and Debugging

### Mistake 1: Forgetting to Close Files

\`\`\`python
# Wrong - file may stay open if error occurs
file = open("data.txt")
data = file.read()
# file.close()  # What if an error happens before this?

# Fix - always use context managers
with open("data.txt") as file:
    data = file.read()
# Automatically closed, even if error occurs
\`\`\`

### Mistake 2: FileNotFoundError

\`\`\`python
# Wrong - assumes file exists
with open("maybe_exists.txt", "r") as file:
    data = file.read()

# Fix - handle the error
try:
    with open("maybe_exists.txt", "r") as file:
        data = file.read()
except FileNotFoundError:
    print("File not found!")
    data = None
\`\`\`

---

## Best Practices

1. **Always use context managers** (\`with\` statement)
2. **Specify encoding** explicitly (\`encoding="utf-8"\`)
3. **Use pathlib** for path manipulations instead of string operations
4. **Handle exceptions** for file operations

---

## Summary

You've learned to work with files in Python:

- **Open files** with context managers for automatic cleanup
- **File modes** control read/write/append behavior
- **Read methods**: \`.read()\`, \`.readlines()\`, iteration
- **Write methods**: \`.write()\`, \`.writelines()\`
- **JSON module** for structured data
- **pathlib** for modern path handling`,
    quizIds: ['cs101-quiz-5', 'cs101-quiz-5b', 'cs101-quiz-5c'],
    exerciseIds: ['cs101-exercise-5', 'cs101-t5-ex02', 'cs101-t5-ex03', 'cs101-t5-ex04', 'cs101-t5-ex05', 'cs101-t5-ex06', 'cs101-t5-ex07', 'cs101-t5-ex08', 'cs101-t5-ex09', 'cs101-t5-ex10', 'cs101-t5-ex11', 'cs101-t5-ex12', 'cs101-t5-ex13', 'cs101-t5-ex14', 'cs101-t5-ex15', 'cs101-t5-ex16']
  }
];
