---
id: cs101-t7-pitfalls
title: "Pitfalls, Best Practices, Practice"
order: 7
---

## Common Pitfalls and Best Practices

Recursion is elegant but error-prone. This subtopic covers the most common mistakes, how to avoid them, and best practices for writing clean recursive code. We'll also provide practice exercises to solidify your understanding.

---

## Pitfall 1: Forgetting to Return the Recursive Result

One of the most common bugs is computing the recursive result but not returning it:

```python
# BUG: Missing return
def sum_list_broken(values):
    if len(values) == 0:
        return 0
    sum_list_broken(values[1:])  # Computed but not returned!

result = sum_list_broken([1, 2, 3])
print(result)  # None!
```

The function computes the recursive call but doesn't return its value. Fix:

```python
def sum_list(values):
    if len(values) == 0:
        return 0
    return values[0] + sum_list(values[1:])  # Return the result!
```

### Detection

If your recursive function returns `None` unexpectedly, check that all code paths (including the recursive case) have a `return` statement.

---

## Pitfall 2: Wrong Base Case

### Missing Base Case

```python
# BUG: No base case
def countdown(n):
    print(n)
    countdown(n - 1)  # Never stops

countdown(5)  # RecursionError
```

### Wrong Base Case Condition

```python
# BUG: Base case condition is wrong
def factorial(n):
    if n == 0:  # What about n == 1?
        return 1
    return n * factorial(n - 1)

# Works for positive n, but what about factorial(-1)?
# RecursionError: -1 → -2 → -3 → ... never reaches 0
```

Better:

```python
def factorial(n):
    if n <= 1:  # Catches 0, 1, and guards against negatives
        return 1
    return n * factorial(n - 1)
```

---

## Pitfall 3: Not Making Progress

The recursive call must move toward the base case:

```python
# BUG: Moving away from base case
def power_broken(base, exp):
    if exp == 0:
        return 1
    return base * power_broken(base, exp + 1)  # exp increases!

power_broken(2, 3)  # RecursionError
```

Fix:

```python
def power(base, exp):
    if exp == 0:
        return 1
    return base * power(base, exp - 1)  # exp decreases toward 0
```

---

## Pitfall 4: Expensive Operations in Recursive Calls

### Slicing Creates Copies

```python
# Each call creates a new list
def sum_list(values):
    if len(values) == 0:
        return 0
    return values[0] + sum_list(values[1:])  # values[1:] creates a copy
```

For a list of n elements, this creates n list copies, using O(n²) total space.

Better: Pass an index instead:

```python
def sum_list_efficient(values, index=0):
    if index >= len(values):
        return 0
    return values[index] + sum_list_efficient(values, index + 1)
```

This uses O(n) space (just the recursion stack).

### String Concatenation

```python
# BUG: Quadratic time due to string concatenation
def reverse_slow(s):
    if len(s) <= 1:
        return s
    return reverse_slow(s[1:]) + s[0]  # Creates many temporary strings
```

For better performance, use iteration or `''.join()` with a list.

---

## Pitfall 5: Hitting the Recursion Limit

Python's default recursion limit is around 1000:

```python
def deep_recursion(n):
    if n == 0:
        return
    deep_recursion(n - 1)

deep_recursion(500)   # OK
deep_recursion(2000)  # RecursionError
```

### Solutions

1. **Convert to iteration** (often the best solution)
2. **Increase the limit** (use carefully):
   ```python
   import sys
   sys.setrecursionlimit(10000)
   ```
3. **Use tail-call optimization manually** (advanced)

---

## Pitfall 6: Modifying Mutable Arguments

```python
# BUG: Modifying the original list
def filter_positive(numbers):
    if len(numbers) == 0:
        return []
    if numbers[0] > 0:
        numbers.pop(0)  # Modifies original!
        return [numbers[0]] + filter_positive(numbers)
    numbers.pop(0)
    return filter_positive(numbers)
```

This modifies the input list and has confusing behavior. Keep recursive functions pure:

```python
def filter_positive(numbers):
    if len(numbers) == 0:
        return []
    if numbers[0] > 0:
        return [numbers[0]] + filter_positive(numbers[1:])
    return filter_positive(numbers[1:])
```

---

## Best Practices

### 1. Always Define the Base Case First

```python
def recursive_function(arg):
    # Base case first - makes the stopping condition obvious
    if is_base_case(arg):
        return base_result

    # Then recursive case
    return combine(arg, recursive_function(smaller(arg)))
```

### 2. Ensure Clear Progress Toward Base Case

Before writing the recursive call, verify:
- The argument changes
- The change moves toward the base case
- The base case will eventually be reached

### 3. Keep Recursive Functions Small and Focused

Each recursive function should do one thing:

```python
# Good: Focused function
def tree_height(node):
    if node is None:
        return 0
    return 1 + max(tree_height(node.left), tree_height(node.right))

# Bad: Doing too much
def tree_everything(node):
    # Computes height, sum, count, and prints... confusing
    ...
```

### 4. Use Helper Functions for Complex Logic

```python
def binary_search(arr, target):
    """Public interface - clean and simple."""
    return _binary_search_helper(arr, target, 0, len(arr) - 1)

def _binary_search_helper(arr, target, low, high):
    """Private helper with extra parameters."""
    if low > high:
        return -1
    mid = (low + high) // 2
    if arr[mid] == target:
        return mid
    if arr[mid] < target:
        return _binary_search_helper(arr, target, mid + 1, high)
    return _binary_search_helper(arr, target, low, mid - 1)
```

### 5. Consider Iteration for Deep Recursion

If recursion depth could be large, iteration is safer:

```python
# Recursive - limited to ~1000 depth
def sum_recursive(n):
    if n <= 0:
        return 0
    return n + sum_recursive(n - 1)

# Iterative - no depth limit
def sum_iterative(n):
    total = 0
    for i in range(1, n + 1):
        total += i
    return total
```

### 6. Use Memoization When Appropriate

If you see overlapping subproblems, add caching:

```python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)
```

---

## Practice Exercises

Test your recursion skills with these exercises:

### Exercise 1: Sum of Digits

Write a recursive function that returns the sum of digits of a positive integer:

```python
digit_sum(123)    # 6 (1 + 2 + 3)
digit_sum(9999)   # 36
```

### Exercise 2: Count Occurrences

Write a recursive function to count occurrences of a character in a string:

```python
count_char("hello world", "l")  # 3
count_char("mississippi", "s")  # 4
```

### Exercise 3: Is Palindrome

Write a recursive function to check if a string is a palindrome:

```python
is_palindrome("racecar")  # True
is_palindrome("hello")    # False
```

### Exercise 4: Nested Sum

Write a recursive function to sum all numbers in a nested list:

```python
nested_sum([1, [2, 3], [4, [5, 6]]])  # 21
nested_sum([[[[1]]]])                  # 1
```

### Exercise 5: Binary Search

Implement recursive binary search that returns the index of a target, or -1 if not found:

```python
binary_search([1, 3, 5, 7, 9], 5)   # 2
binary_search([1, 3, 5, 7, 9], 4)   # -1
```

### Exercise 6: Fibonacci with Memoization

Implement Fibonacci with memoization and verify it's faster than the naive version:

```python
fib_memo(50)  # Should be instant
```

### Exercise 7: Flatten List

Write a recursive function to flatten a nested list of arbitrary depth:

```python
flatten([1, [2, [3, [4]]], 5])  # [1, 2, 3, 4, 5]
```

---

## Debugging Checklist

When your recursive function doesn't work:

1. **Does it have a base case?**
2. **Does the base case return the correct value?**
3. **Does the recursive case make progress toward the base case?**
4. **Does the recursive case return its result?**
5. **Are you modifying shared state incorrectly?**
6. **Is the recursion depth hitting Python's limit?**

Add tracing to see what's happening:

```python
def debug_function(n, depth=0):
    print("  " * depth + f"call({n})")
    if base_case:
        print("  " * depth + f"return {result}")
        return result
    ...
```

---

## Key Takeaways

- Always **return** the result of recursive calls
- Define the **base case first** and ensure it's correct
- Verify the recursive case **makes progress** toward the base case
- Avoid **expensive operations** (slicing, concatenation) in recursive calls
- Consider **iteration** for deep recursion
- Use **memoization** for overlapping subproblems
- Keep recursive functions **small and focused**
- **Test edge cases**: empty inputs, single elements, negative numbers
- **Trace execution** with print statements when debugging

