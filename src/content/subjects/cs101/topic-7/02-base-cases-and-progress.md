## Base Cases and Progress Toward the Base Case

The most common source of bugs in recursive code is getting the base case wrong - either missing it entirely, or writing a recursive case that never reaches it. Understanding these two requirements is essential for writing correct recursive functions.

---

## The Base Case: When to Stop

The base case is the condition where the function returns a result directly without making any recursive calls. It represents the simplest version of the problem - one that has an obvious, immediate answer.

```python
def factorial(n):
    if n <= 1:        # Base case
        return 1
    return n * factorial(n - 1)  # Recursive case
```

Without a base case, recursion never ends:

```python
def broken_countdown(n):
    print(n)
    broken_countdown(n - 1)  # No base case - runs forever (until crash)

broken_countdown(5)
# Prints: 5, 4, 3, 2, 1, 0, -1, -2, ...
# Eventually: RecursionError: maximum recursion depth exceeded
```

### Choosing Base Cases

Ask yourself: "What's the simplest possible input? What should the function return for it?"

| Problem | Natural Base Case |
|---------|-------------------|
| Factorial of n | n = 0 or n = 1 → return 1 |
| Sum of a list | Empty list → return 0 |
| Length of a list | Empty list → return 0 |
| Reverse a string | Empty or single char → return the string |
| Find in nested structure | Not a container → check the item |

### Multiple Base Cases

Some problems have more than one base case:

```python
def fibonacci(n):
    if n == 0:        # First base case
        return 0
    if n == 1:        # Second base case
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)
```

Fibonacci needs two base cases because the recursive case uses both `n-1` and `n-2`.

---

## Progress: Moving Toward the Base Case

The recursive case must change the problem in a way that moves toward the base case. If it doesn't, the base case is never reached.

### Wrong Direction

```python
def factorial_broken(n):
    if n == 0:
        return 1
    return n * factorial_broken(n + 1)  # WRONG: moves away from base case

factorial_broken(5)
# Calls: factorial(5) → factorial(6) → factorial(7) → ...
# Never reaches n == 0, crashes with RecursionError
```

### Right Direction

```python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)  # Correct: moves toward base case

factorial(5)
# Calls: factorial(5) → factorial(4) → factorial(3) → factorial(2) → factorial(1)
# Reaches base case, returns correctly
```

### Verifying Progress

Before writing a recursive function, verify:

1. **Base case exists**: There's at least one condition that returns without recursing
2. **Progress is made**: Each recursive call changes the argument toward the base case
3. **Base case is reachable**: The combination of initial inputs and progress guarantees the base case will eventually be true

```python
def sum_list(values):
    # Base case: empty list
    if len(values) == 0:
        return 0

    # Progress: values[1:] is shorter than values
    # After len(values) calls, we reach an empty list
    return values[0] + sum_list(values[1:])
```

---

## Common Base Case Patterns

### Numeric Countdown

For functions that count down:

```python
def power(base, exp):
    if exp == 0:       # Base case: anything^0 = 1
        return 1
    return base * power(base, exp - 1)  # exp decreases by 1 each call
```

### Collection Becomes Empty

For functions processing lists or strings:

```python
def contains(items, target):
    if len(items) == 0:     # Base case: empty, not found
        return False
    if items[0] == target:  # Base case: found it
        return True
    return contains(items[1:], target)  # Shrink the list
```

### Tree Reaches Leaf

For tree-like structures:

```python
def tree_sum(node):
    if node is None:        # Base case: empty tree
        return 0
    # Recurse on children
    return node.value + tree_sum(node.left) + tree_sum(node.right)
```

---

## Defensive Base Cases

Sometimes you need base cases for edge cases that might not be obvious:

```python
def safe_factorial(n):
    # Handle unexpected inputs
    if n < 0:
        raise ValueError("Factorial undefined for negative numbers")
    if n <= 1:
        return 1
    return n * safe_factorial(n - 1)
```

### Handling Multiple Input Types

When processing nested structures, handle both container and non-container cases:

```python
def deep_sum(data):
    """Sum all numbers in a potentially nested structure."""
    if isinstance(data, (int, float)):  # Base case: it's a number
        return data
    if not hasattr(data, '__iter__'):   # Base case: not iterable
        return 0
    return sum(deep_sum(item) for item in data)

deep_sum([1, [2, [3, 4]], 5])  # 15
```

---

## Debugging Base Case Problems

### Symptom: RecursionError

If you get `RecursionError: maximum recursion depth exceeded`, either:
1. The base case is missing
2. The recursive case doesn't progress toward the base case
3. The input is too large for Python's recursion limit

### Symptom: Wrong Results

If the function returns but gives wrong answers, the base case might return the wrong value:

```python
# Bug: base case returns wrong value
def length_broken(items):
    if len(items) == 0:
        return 1  # Should be 0!
    return 1 + length_broken(items[1:])

length_broken([1, 2, 3])  # Returns 4 instead of 3
```

### Debugging Strategy

Add print statements to trace execution:

```python
def factorial_debug(n, depth=0):
    indent = "  " * depth
    print(f"{indent}factorial({n})")

    if n <= 1:
        print(f"{indent}→ returning 1 (base case)")
        return 1

    result = n * factorial_debug(n - 1, depth + 1)
    print(f"{indent}→ returning {result}")
    return result

factorial_debug(4)
```

Output:
```
factorial(4)
  factorial(3)
    factorial(2)
      factorial(1)
      → returning 1 (base case)
    → returning 2
  → returning 6
→ returning 24
```

---

## Multiple Paths to Base Case

Some recursive functions have multiple recursive calls, each on a different path to the base case:

```python
def binary_search(arr, target, low, high):
    if low > high:          # Base case: not found
        return -1

    mid = (low + high) // 2

    if arr[mid] == target:  # Base case: found
        return mid
    elif arr[mid] < target:
        return binary_search(arr, target, mid + 1, high)  # Search right
    else:
        return binary_search(arr, target, low, mid - 1)   # Search left
```

Both recursive calls reduce the search space, guaranteeing progress toward one of the base cases.

---

## Testing Base Cases

Always test your recursive functions with:

1. **The base case directly**: Does `factorial(0)` return 1?
2. **One step above base case**: Does `factorial(1)` work?
3. **A typical case**: Does `factorial(5)` return 120?
4. **Edge cases**: What about `factorial(-1)`?

```python
def test_factorial():
    assert factorial(0) == 1   # Base case
    assert factorial(1) == 1   # Also base case
    assert factorial(5) == 120 # Typical case
    assert factorial(10) == 3628800  # Larger case
```

---

## Key Takeaways

- Every recursive function needs at least one **base case** that returns without recursing
- The **recursive case** must make progress toward the base case
- Wrong direction in the recursive case leads to `RecursionError`
- Common base cases: zero/one for numbers, empty for collections, None/leaf for trees
- Add **defensive base cases** for edge cases and invalid inputs
- Use **tracing with print statements** to debug recursive functions
- **Test the base case directly** and one step above it
- If the base case returns the wrong value, all results will be wrong

