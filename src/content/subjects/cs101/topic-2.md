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