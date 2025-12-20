---
id: cs101-t3-returns
title: "Return Values and None"
order: 4
---

## Return Values

The `return` statement is how functions send values back to the code that called them. Understanding return values is essential for writing useful, reusable functions.

---

## The Basics of `return`

When a function executes a `return` statement, two things happen:
1. The function immediately stops executing
2. The specified value is sent back to the caller

```python
def add(a, b):
    return a + b

result = add(3, 5)  # result gets the value 8
print(result)       # 8
```

The return value can be used just like any other value:

```python
# Use in expressions
total = add(10, 20) + add(5, 5)  # 30 + 10 = 40

# Use in conditions
if add(2, 2) == 4:
    print("Math works!")

# Use in function calls
print(add(7, 3))  # Prints 10

# Use in data structures
results = [add(1, 1), add(2, 2), add(3, 3)]  # [2, 4, 6]
```

---

## Functions Without `return` Return `None`

If a function doesn't have a `return` statement, or reaches the end without returning, it automatically returns `None`:

```python
def say_hello(name):
    print(f"Hello, {name}!")
    # No return statement

result = say_hello("Alice")  # Prints "Hello, Alice!"
print(result)                # None
print(type(result))          # <class 'NoneType'>
```

A `return` with no value also returns `None`:

```python
def maybe_greet(name, should_greet):
    if should_greet:
        print(f"Hello, {name}!")
    return  # Explicit return with no value

result = maybe_greet("Bob", True)
print(result)  # None
```

### Why This Matters

This is why you should distinguish between functions that "do something" (side effects) and functions that "calculate something" (return values):

```python
# This function DOES something (prints)
def display_result(value):
    print(f"The result is: {value}")

# This function CALCULATES something (returns)
def calculate_result(a, b):
    return a * b

# Mixing them up causes bugs
total = display_result(42)     # total is None!
print(calculate_result(6, 7))  # 42 - this works
```

---

## Returning Multiple Values

Python can "return multiple values" by returning a tuple. This is actually just returning a single tuple, but Python makes it look like multiple values:

```python
def min_max(numbers):
    return min(numbers), max(numbers)

# Returns a tuple
result = min_max([3, 1, 4, 1, 5, 9])
print(result)        # (1, 9)
print(type(result))  # <class 'tuple'>

# Tuple unpacking - the common pattern
low, high = min_max([3, 1, 4, 1, 5, 9])
print(f"Min: {low}, Max: {high}")  # Min: 1, Max: 9
```

### Multiple Return Values in Practice

```python
def analyze_text(text):
    """Return word count, character count, and average word length."""
    words = text.split()
    word_count = len(words)
    char_count = len(text)
    avg_length = sum(len(w) for w in words) / word_count if words else 0
    return word_count, char_count, avg_length

words, chars, avg = analyze_text("Hello world")
print(f"Words: {words}, Chars: {chars}, Avg length: {avg:.1f}")
# Words: 2, Chars: 11, Avg length: 5.0
```

### Ignoring Some Return Values

If you don't need all returned values, use `_` as a placeholder:

```python
def get_user_info():
    return "alice", "alice@example.com", 25, "NYC"

name, email, _, _ = get_user_info()  # Ignore age and city
# or
name, *_ = get_user_info()  # Just get the first value
```

---

## Early Returns (Guard Clauses)

`return` immediately exits the function. This enables a powerful pattern called **guard clauses** - handling edge cases at the start of a function:

### Without Guard Clauses (Nested)

```python
def process_order(order):
    if order is not None:
        if order.items:
            if order.payment_valid:
                # Actually process the order
                total = calculate_total(order)
                charge_customer(order.customer, total)
                send_confirmation(order.customer)
                return "Order processed"
            else:
                return "Invalid payment"
        else:
            return "Order has no items"
    else:
        return "No order provided"
```

### With Guard Clauses (Flat)

```python
def process_order(order):
    if order is None:
        return "No order provided"
    if not order.items:
        return "Order has no items"
    if not order.payment_valid:
        return "Invalid payment"

    # Happy path - process the order
    total = calculate_total(order)
    charge_customer(order.customer, total)
    send_confirmation(order.customer)
    return "Order processed"
```

Guard clauses:
- Reduce nesting
- Make the "happy path" clearer
- Put error handling at the top where it's visible

### Validation Example

```python
def withdraw(balance, amount):
    # Guard clauses first
    if amount <= 0:
        return "Amount must be positive"
    if amount > balance:
        return "Insufficient funds"
    if amount > 1000:
        return "Exceeds daily limit"

    # Main logic (only reached if all checks pass)
    return balance - amount
```

---

## Pure Functions vs Side Effects

Understanding the difference between pure functions and functions with side effects helps you write better code.

### Pure Functions

A **pure function**:
- Depends only on its input parameters
- Always returns the same output for the same inputs
- Has no side effects (no printing, file writing, etc.)

```python
def add(a, b):
    return a + b

def celsius_to_fahrenheit(celsius):
    return (celsius * 9/5) + 32

def is_valid_email(email):
    return "@" in email and "." in email.split("@")[-1]
```

Benefits of pure functions:
- Easy to test (same input = same output)
- Easy to reason about (no hidden state)
- Safe to call multiple times
- Can be cached/memoized

### Functions with Side Effects

Functions with **side effects** interact with the outside world:

```python
def print_greeting(name):
    print(f"Hello, {name}!")  # Side effect: prints to console

def save_to_file(data, filename):
    with open(filename, "w") as f:
        f.write(data)  # Side effect: writes to file

def get_user_input():
    return input("Enter value: ")  # Side effect: reads from console
```

Side effects are necessary (your program needs to do something), but keep them separate from pure calculations when possible:

```python
# Separate pure calculation from side effect
def format_report(data):  # Pure - just calculates
    lines = [f"{k}: {v}" for k, v in data.items()]
    return "\n".join(lines)

def save_report(report, filename):  # Side effect - saves
    with open(filename, "w") as f:
        f.write(report)

# Use together
report = format_report(data)
save_report(report, "output.txt")
```

---

## Return Value Types

Functions should return consistent types. Avoid returning different types based on conditions:

```python
# Bad: returns int or string
def divide(a, b):
    if b == 0:
        return "Error"  # String
    return a / b        # Float

# Better: use exceptions or return None
def divide(a, b):
    if b == 0:
        return None
    return a / b

# Or raise an exception
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
```

### Using `None` as a Return Value

`None` is often used to indicate "no result" or "not found":

```python
def find_user(username, users):
    for user in users:
        if user["name"] == username:
            return user
    return None  # Explicit: not found

# Caller handles None
user = find_user("alice", users)
if user is not None:
    print(f"Found: {user['email']}")
else:
    print("User not found")
```

---

## The `return` vs `print` Decision

| Scenario | Use `return` | Use `print` |
|----------|--------------|-------------|
| Building reusable functions | ✓ | |
| Calculating values | ✓ | |
| Functions called by other functions | ✓ | |
| Displaying output to user | | ✓ |
| Debugging | | ✓ |
| Simple scripts | Sometimes | Sometimes |

```python
# Return: for reusable logic
def calculate_tax(amount, rate=0.08):
    return amount * rate

# Print: for user output
def display_receipt(items, total):
    print("=" * 30)
    for item in items:
        print(f"  {item}")
    print("=" * 30)
    print(f"Total: ${total:.2f}")

# Often combined
tax = calculate_tax(100)  # Calculate
print(f"Tax: ${tax:.2f}")  # Display
```

---

## Key Takeaways

- `return` sends a value back to the caller and exits the function
- Functions without `return` (or with bare `return`) return `None`
- Return multiple values using tuples: `return a, b, c`
- Use guard clauses (early returns) to handle edge cases first
- Pure functions (no side effects) are easier to test and reason about
- Return consistent types from functions
- Use `None` to indicate "no result" or "not found"
- Prefer `return` for reusable functions; `print` for user output

