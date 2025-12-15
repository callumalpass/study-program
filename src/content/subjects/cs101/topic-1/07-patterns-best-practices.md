## Common Patterns and Idioms

Python has elegant ways to solve common programming tasks. Learning these patterns will make your code more concise and readable.

### Swapping Variables

Python has an elegant way to swap values without a temporary variable:

```python
a = 5
b = 10

# Traditional way (with temp variable)
temp = a
a = b
b = temp

# Pythonic way
a, b = b, a  # Now a=10, b=5

# This works because Python evaluates the right side first,
# creating a tuple (b, a), then unpacks it to a, b
```

### Multiple Assignment

Assign multiple variables at once:

```python
# Assign same value to multiple variables
x = y = z = 0

# Assign different values in one line
x, y, z = 1, 2, 3
name, age, city = "Alice", 30, "NYC"

# Unpack from a list or tuple
coordinates = (10, 20)
x, y = coordinates

# Ignore values you don't need with underscore
first, _, last = "Alice Bob Smith".split()
print(first, last)  # "Alice Smith"
```

### Checking Types

Use `type()` for debugging and `isinstance()` for checking:

```python
value = 42
print(type(value))              # <class 'int'>
print(isinstance(value, int))   # True
print(isinstance(value, (int, float)))  # True - check multiple types
```

### Default Values with or

```python
# Use 'or' to provide default values
name = user_input or "Anonymous"  # Uses "Anonymous" if user_input is falsy

# Be careful with 0 or False as valid values
count = user_count or 10  # Bug: if user_count is 0, uses 10!

# Better approach for values that might be 0/False
count = 10 if user_count is None else user_count
```

---

## String Formatting (f-strings)

The modern way to embed variables in strings:

```python
name = "Alice"
age = 30
message = f"My name is {name} and I am {age} years old."
# Output: "My name is Alice and I am 30 years old."

# You can include expressions
price = 19.99
print(f"Total: ${price * 1.1:.2f}")  # "Total: $21.99"

# Format specifications
number = 42
print(f"{number:05d}")   # "00042" (zero-padded to 5 digits)
print(f"{number:>10}")   # "        42" (right-aligned in 10 chars)
print(f"{number:<10}")   # "42        " (left-aligned)
print(f"{number:^10}")   # "    42    " (centered)

# Thousands separator
big = 1234567
print(f"{big:,}")        # "1,234,567"

# Percentages
ratio = 0.756
print(f"{ratio:.1%}")    # "75.6%"
```

---

## Common Mistakes and Debugging

### Mistake 1: Using Undefined Variables

```python
# Wrong - using a variable before defining it
print(username)  # NameError: name 'username' is not defined

# Fix - define the variable first
username = "Alice"
print(username)
```

### Mistake 2: Type Mismatches

```python
# Wrong - can't concatenate string and integer
age = 25
message = "I am " + age + " years old"  # TypeError!

# Fix - convert to string
message = "I am " + str(age) + " years old"

# Or better, use f-strings
message = f"I am {age} years old"
```

### Mistake 3: Integer Division Confusion

```python
# In Python 3, division always returns float
result = 5 / 2   # 2.5 (float)
result = 4 / 2   # 2.0 (still float!)

# Use // for integer division
result = 5 // 2  # 2 (integer)
```

### Mistake 4: Modifying Strings

```python
# Strings are immutable - you can't change them in place
name = "Alice"
# name[0] = "B"  # TypeError!

# Fix - create a new string
name = "B" + name[1:]  # "Blice"
```

### Mistake 5: Comparing with = Instead of ==

```python
# Wrong - this is assignment, not comparison
# if x = 5:  # SyntaxError in Python (thankfully!)

# Correct - use == for comparison
if x == 5:
    print("x is 5")
```

### Mistake 6: Float Comparison

```python
# Wrong - float precision issues
if 0.1 + 0.2 == 0.3:  # False!
    print("Equal")

# Fix - use approximate comparison
import math
if math.isclose(0.1 + 0.2, 0.3):
    print("Equal")  # This works

# Or compare with tolerance
tolerance = 1e-9
if abs((0.1 + 0.2) - 0.3) < tolerance:
    print("Equal")
```

---

## Best Practices

### 1. Use Descriptive Names

```python
# Bad - unclear
x = 25
n = "Alice"
t = 98.6

# Good - clear and descriptive
user_age = 25
user_name = "Alice"
body_temperature = 98.6
```

### 2. Follow Naming Conventions

```python
# Variables and functions: snake_case
user_name = "Alice"
def calculate_total():
    pass

# Constants: UPPER_CASE
MAX_CONNECTIONS = 100
PI = 3.14159

# Classes: PascalCase (you'll learn this later)
class UserAccount:
    pass
```

### 3. Initialize Variables Before Use

Define variables at the top of their scope:

```python
# Good - clear initialization
total = 0
count = 0
items = []

for item in data:
    total += item.price
    count += 1
    items.append(item.name)
```

### 4. Use Type Hints for Clarity (Optional)

```python
# Type hints make code more readable and enable better IDE support
age: int = 25
name: str = "Alice"
prices: list[float] = [19.99, 29.99, 39.99]
is_valid: bool = True

def greet(name: str) -> str:
    return f"Hello, {name}!"
```

### 5. Prefer f-strings Over Concatenation

```python
# Avoid - hard to read
message = "Hello, " + name + "! You have " + str(count) + " messages."

# Good - f-string
message = f"Hello, {name}! You have {count} messages."
```

### 6. Don't Use Single Letters (Except Loop Counters)

```python
# Acceptable for loops
for i in range(10):
    print(i)

# Not recommended for variables
a = calculate_something()  # What is 'a'?

# Better
average_score = calculate_average(scores)
```

---

## Summary

You've learned the foundations of working with data in Python:

- **Variables** store data using the assignment operator (`=`)
- **Four basic types**: `int` (whole numbers), `float` (decimals), `str` (text), `bool` (True/False)
- **Dynamic typing** means Python determines types automatically
- **Type conversion** uses `int()`, `float()`, `str()`, `bool()`
- **f-strings** are the modern way to format strings with variables

**Key takeaways:**
- Always use descriptive, snake_case variable names
- Be mindful of types when doing operations
- Use `type()` and `isinstance()` to debug type-related errors
- Learn the Pythonic patterns - they make code cleaner and more efficient

---

## Further Exploration

Ready for more? Try these challenges:
- What happens when you add very large integers? (Python handles them!)
- Explore more string methods: `.upper()`, `.lower()`, `.split()`, `.strip()`
- Learn about `None` - Python's way of representing "no value"
- Investigate the `decimal` module for precise financial calculations
