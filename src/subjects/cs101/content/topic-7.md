## Introduction

Recursion is a powerful problem-solving technique where a function calls itself to solve smaller instances of the same problem. While it can seem magical at first, understanding recursion unlocks elegant solutions to many programming challenges.

**Learning Objectives:**
- Understand how recursive functions work
- Identify base cases and recursive cases
- Trace through recursive function execution
- Convert between iterative and recursive solutions
- Recognize when recursion is appropriate
- Avoid common recursion pitfalls

---

## Core Concepts

### What Is Recursion?

A recursive function is one that calls itself. Every recursive function needs:
1. **Base case(s)**: When to stop recursing (the simplest case)
2. **Recursive case**: How to break the problem into smaller pieces

```python
def countdown(n):
    # Base case: stop when we reach 0
    if n <= 0:
        print("Blastoff!")
        return

    # Recursive case: print n, then countdown from n-1
    print(n)
    countdown(n - 1)

countdown(5)  # Prints: 5, 4, 3, 2, 1, Blastoff!
```

### Classic Example: Factorial

The factorial of n (written n!) is n × (n-1) × (n-2) × ... × 1.

```python
def factorial(n):
    # Base case: 0! = 1 and 1! = 1
    if n <= 1:
        return 1

    # Recursive case: n! = n × (n-1)!
    return n * factorial(n - 1)

print(factorial(5))  # 120 (5 × 4 × 3 × 2 × 1)
```

### How Recursion Works: The Call Stack

Each function call creates a new "frame" on the call stack:

```python
factorial(4)
├── 4 * factorial(3)
│   ├── 3 * factorial(2)
│   │   ├── 2 * factorial(1)
│   │   │   └── returns 1  (base case)
│   │   └── returns 2 * 1 = 2
│   └── returns 3 * 2 = 6
└── returns 4 * 6 = 24
```

### Fibonacci Sequence

Each Fibonacci number is the sum of the two before it: 0, 1, 1, 2, 3, 5, 8, 13, ...

```python
def fibonacci(n):
    # Base cases
    if n == 0:
        return 0
    if n == 1:
        return 1

    # Recursive case: fib(n) = fib(n-1) + fib(n-2)
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(7))  # 13
```

### Sum of a List

```python
def sum_list(numbers):
    # Base case: empty list sums to 0
    if len(numbers) == 0:
        return 0

    # Recursive case: first element + sum of rest
    return numbers[0] + sum_list(numbers[1:])

print(sum_list([1, 2, 3, 4, 5]))  # 15
```

### String Reversal

```python
def reverse_string(s):
    # Base case: empty or single character
    if len(s) <= 1:
        return s

    # Recursive case: last char + reverse of rest
    return s[-1] + reverse_string(s[:-1])

print(reverse_string("hello"))  # "olleh"
```

### Counting Down and Up

```python
def count_down_up(n):
    if n == 0:
        print("Bottom!")
        return

    print(f"Going down: {n}")
    count_down_up(n - 1)
    print(f"Going up: {n}")

count_down_up(3)
# Output:
# Going down: 3
# Going down: 2
# Going down: 1
# Bottom!
# Going up: 1
# Going up: 2
# Going up: 3
```

---

## Recursion vs Iteration

Many problems can be solved either way:

```python
# Iterative factorial
def factorial_iterative(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

# Recursive factorial
def factorial_recursive(n):
    if n <= 1:
        return 1
    return n * factorial_recursive(n - 1)
```

### When to Use Recursion

Recursion is natural for:
- Tree and graph traversal
- Divide-and-conquer algorithms
- Problems with recursive structure (fractals, nested data)
- When the recursive solution is much clearer

Iteration is often better for:
- Simple counting or accumulation
- Performance-critical code
- When recursion depth could be very large

---

## Common Recursion Patterns

### Pattern 1: Reduce to Simpler Case

```python
def power(base, exp):
    if exp == 0:
        return 1
    return base * power(base, exp - 1)

print(power(2, 5))  # 32
```

### Pattern 2: Divide and Conquer

```python
def binary_search(arr, target, low, high):
    if low > high:
        return -1  # Not found

    mid = (low + high) // 2

    if arr[mid] == target:
        return mid
    elif arr[mid] < target:
        return binary_search(arr, target, mid + 1, high)
    else:
        return binary_search(arr, target, low, mid - 1)
```

### Pattern 3: Accumulator Pattern

```python
def sum_digits(n, total=0):
    if n == 0:
        return total
    return sum_digits(n // 10, total + n % 10)

print(sum_digits(12345))  # 15 (1+2+3+4+5)
```

### Pattern 4: Multiple Recursive Calls

```python
def count_paths(m, n):
    """Count paths in an m×n grid from top-left to bottom-right,
    moving only right or down."""
    if m == 1 or n == 1:
        return 1
    return count_paths(m - 1, n) + count_paths(m, n - 1)

print(count_paths(3, 3))  # 6
```

---

## Common Mistakes and Debugging

### Mistake 1: Missing Base Case

```python
# Wrong - infinite recursion!
def countdown_broken(n):
    print(n)
    countdown_broken(n - 1)  # Never stops!

# Fixed
def countdown_fixed(n):
    if n <= 0:  # Base case
        return
    print(n)
    countdown_fixed(n - 1)
```

### Mistake 2: Base Case Never Reached

```python
# Wrong - base case is never reached
def factorial_broken(n):
    if n == 0:
        return 1
    return n * factorial_broken(n + 1)  # Goes wrong direction!

# Fixed
def factorial_fixed(n):
    if n <= 1:
        return 1
    return n * factorial_fixed(n - 1)  # Approaches base case
```

### Mistake 3: Not Returning Recursive Result

```python
# Wrong - loses the result
def sum_list_broken(numbers):
    if len(numbers) == 0:
        return 0
    sum_list_broken(numbers[1:])  # Missing return!

# Fixed
def sum_list_fixed(numbers):
    if len(numbers) == 0:
        return 0
    return numbers[0] + sum_list_fixed(numbers[1:])  # Return the result
```

### Mistake 4: Inefficient Recursion

```python
# Inefficient - recalculates same values many times
def fib_slow(n):
    if n <= 1:
        return n
    return fib_slow(n - 1) + fib_slow(n - 2)

# Better - use memoization
def fib_fast(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_fast(n - 1, memo) + fib_fast(n - 2, memo)
    return memo[n]
```

---

## Tracing Recursive Calls

To debug recursion, trace the calls with indentation:

```python
def factorial_traced(n, depth=0):
    indent = "  " * depth
    print(f"{indent}factorial({n})")

    if n <= 1:
        print(f"{indent}returning 1")
        return 1

    result = n * factorial_traced(n - 1, depth + 1)
    print(f"{indent}returning {result}")
    return result

factorial_traced(4)
```

Output:
```
factorial(4)
  factorial(3)
    factorial(2)
      factorial(1)
      returning 1
    returning 2
  returning 6
returning 24
```

---

## Best Practices

1. **Always define a base case** - Every recursive function needs one
2. **Ensure progress toward base case** - Each recursive call should be simpler
3. **Trust the recursion** - Assume the recursive call works correctly
4. **Consider stack depth** - Python has a recursion limit (~1000 by default)
5. **Use memoization for efficiency** - Cache results of expensive calculations
6. **Trace calls when debugging** - Print with indentation to visualize

---

## Summary

You've learned how recursion works in Python:

- **Recursive functions** call themselves to solve smaller problems
- **Base cases** prevent infinite recursion
- **Recursive cases** break problems into smaller pieces
- **The call stack** tracks each function call
- **Common patterns** include reduce, divide-and-conquer, and accumulator
- **Iteration vs recursion** each have their strengths
- **Debugging recursion** requires tracing through the call stack
