## Introduction

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

Conditional statements let your program make decisions. The basic structure uses `if`, `elif` (else if), and `else`:

```python
temperature = 75

if temperature > 85:
    print("It's hot outside!")
elif temperature > 65:
    print("Nice weather!")
elif temperature > 45:
    print("It's a bit chilly.")
else:
    print("It's cold!")
```

**Key points:**
- The condition after `if` or `elif` must evaluate to True or False
- Indentation (4 spaces) defines the code block
- Only ONE branch executes - Python checks from top to bottom and stops at the first True condition
- `else` catches everything that didn't match above (optional)

### Comparison Operators

These operators compare values and return True or False:

```python
x = 10
y = 5

x == y    # Equal to: False
x != y    # Not equal to: True
x > y     # Greater than: True
x < y     # Less than: False
x >= y    # Greater than or equal: True
x <= y    # Less than or equal: False
```

### Logical Operators

Combine multiple conditions:

```python
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
```

### Truthiness (What Counts as True/False?)

In `if` and `while` conditions, Python converts values to a boolean automatically.

**Falsy values** (treated as `False`):
- `False`
- `None`
- `0`, `0.0`
- `""` (empty string)
- `[]`, `{}`, `set()` (empty containers)

Everything else is truthy:

```python
if "hello":
    print("Non-empty strings are truthy")

items = []
if not items:
    print("Empty lists are falsy")
```

### Short-Circuit Evaluation (and/or)

Python evaluates conditions left-to-right and stops as soon as it knows the answer.

```python
# If the left side of "and" is False, Python doesn't evaluate the right side.
user = None
if user is not None and user.get("name") == "Alice":
    print("Alice")

# If the left side of "or" is True, Python doesn't evaluate the right side.
is_admin = True
if is_admin or expensive_check():
    print("Access granted")
```

### Operator Precedence and Chained Comparisons

Conditions can get hard to read if you rely on precedence rules. Use parentheses for clarity:

```python
score = 72
passed = (score >= 50) and (score <= 100)
```

Python also supports chained comparisons:

```python
age = 20
if 18 <= age < 65:
    print("Working age")
```

### Nested Conditionals and Guard Clauses

Deep nesting makes code harder to follow. Prefer “guard clauses” that return/continue early:

```python
def print_discount_price(price, has_coupon):
    if price <= 0:
        print("Invalid price")
        return

    if not has_coupon:
        print(price)
        return

    print(price * 0.9)
```

### For Loops

For loops iterate over a sequence (list, string, range, etc.):

```python
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
```

### The range() Function

`range()` generates a sequence of numbers:

```python
range(5)         # 0, 1, 2, 3, 4
range(1, 6)      # 1, 2, 3, 4, 5
range(0, 10, 2)  # 0, 2, 4, 6, 8
range(10, 0, -1) # 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 (countdown)
```

### While Loops

While loops repeat as long as a condition is True:

```python
count = 0
while count < 5:
    print(count)
    count += 1  # Don't forget to update the condition!
# Output: 0, 1, 2, 3, 4
```

### Sentinel Loops and Input Validation

`while` loops are great when you don’t know how many times you’ll repeat. A common pattern is “keep asking until valid”:

```python
while True:
    text = input("Enter an integer: ")
    if text.isdigit():
        number = int(text)
        break
    print("Please enter digits only.")

print(f"You entered {number}")
```

### Loop `else` (Often Overlooked)

In Python, `for` and `while` can have an `else` block. It runs only if the loop finishes normally (not via `break`):

```python
numbers = [2, 4, 6, 9, 10]

for n in numbers:
    if n % 2 == 1:
        print(f"Found odd number: {n}")
        break
else:
    print("No odd numbers found")
```

### The `pass` Statement

`pass` is a placeholder statement that does nothing. It’s useful while sketching structure:

```python
if some_condition:
    pass  # TODO: implement later
```

### Break and Continue

Control loop execution:

```python
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
```

---

## Common Patterns and Idioms

### Enumerate for Index and Value

Get both the index and value when iterating:

```python
fruits = ["apple", "banana", "cherry"]
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
# Output:
# 0: apple
# 1: banana
# 2: cherry
```

### Nested Loops

Loops inside loops:

```python
for i in range(3):
    for j in range(3):
        print(f"({i}, {j})", end=" ")
    print()  # New line after inner loop
# Output:
# (0, 0) (0, 1) (0, 2)
# (1, 0) (1, 1) (1, 2)
# (2, 0) (2, 1) (2, 2)
```

### Accumulator Patterns (Counting, Summing, Building)

Many loops “accumulate” a result:

```python
# Sum
numbers = [3, 1, 4]
total = 0
for n in numbers:
    total += n

# Count items matching a condition
words = ["apple", "a", "banana", "hi"]
short_count = 0
for w in words:
    if len(w) <= 2:
        short_count += 1

# Build a new list
squares = []
for i in range(5):
    squares.append(i * i)
```

### Searching Patterns (Find First / Find All)

```python
numbers = [10, 13, 15, 20]

# Find first multiple of 5
first = None
for n in numbers:
    if n % 5 == 0:
        first = n
        break

# Find all multiples of 5
all_multiples = []
for n in numbers:
    if n % 5 == 0:
        all_multiples.append(n)
```

---

## Common Mistakes and Debugging

### Mistake 1: Infinite Loops

```python
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
```

### Mistake 2: Off-by-One Errors

```python
# Wrong - range(5) gives 0-4, not 1-5
for i in range(5):
    print(i)  # Prints 0, 1, 2, 3, 4

# Fix - use range(1, 6) for 1-5
for i in range(1, 6):
    print(i)  # Prints 1, 2, 3, 4, 5
```

### Mistake 3: Comparing to True/False Explicitly

```python
items = []

# Not ideal
if items == []:
    print("Empty")

# Better (uses truthiness)
if not items:
    print("Empty")
```

### Mistake 4: Overly Complex Conditions

```python
# Hard to read
if (age >= 18 and has_license and (not is_suspended) and (score > 50 or is_admin)):
    ...

# Better: name intermediate conditions
is_eligible_age = age >= 18
has_access = is_admin or score > 50
can_drive = is_eligible_age and has_license and (not is_suspended) and has_access
```

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
- **break** exits a loop early; **continue** skips to the next iteration

**Key takeaways:**
- Use truthiness (`if items:` / `if not items:`) to write clean conditions
- Prefer guard clauses and named intermediate variables for readability
- Use `for ... else` when “not found” is meaningful and you’re using `break` to exit early

---

## Practice Exercises

1. **FizzBuzz**: Print numbers 1–100, but print `"Fizz"` for multiples of 3, `"Buzz"` for multiples of 5, and `"FizzBuzz"` for both.
2. **Number guessing**: Randomly choose a number 1–100 and loop until the user guesses it.
3. **Menu loop**: Repeatedly show options (view/add/quit) until the user quits.
4. **Find-first / find-all**: Given a list of integers, find the first negative number, and also build a list of all negative numbers.

---

## Further Exploration

- Learn about `any()` and `all()` for compact condition checks over lists.
- Explore `match/case` (Python 3.10+) as an alternative to long `if/elif` chains.
