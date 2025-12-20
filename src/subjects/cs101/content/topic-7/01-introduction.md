---
id: cs101-t7-intro
title: "Recursion: Big Picture"
order: 1
---

## Recursion: Solving Problems by Solving Smaller Problems

Recursion is one of the most powerful ideas in programming. A recursive function is one that calls itself, breaking a problem into smaller versions of the same problem until reaching a simple case that can be solved directly. While this might sound circular, recursion is a legitimate and elegant problem-solving technique used throughout computer science.

---

## What Is Recursion?

Recursion is when a function calls itself as part of its own execution. This isn't infinite or paradoxical because each call works on a smaller or simpler version of the problem, eventually reaching a case that doesn't need any more recursive calls.

The key insight is that many problems have **self-similar structure** - they can be defined in terms of smaller versions of themselves. For example, the sum of a list is the first element plus the sum of the rest. A folder's contents include files and other folders (which themselves contain files and folders).

```python
def countdown(n):
    if n <= 0:          # Base case: stop here
        print("Blastoff!")
        return

    print(n)
    countdown(n - 1)    # Recursive case: call with smaller n

countdown(5)
# Output:
# 5
# 4
# 3
# 2
# 1
# Blastoff!
```

---

## The Two Essential Parts

Every recursive function needs exactly two parts:

### 1. Base Case (When to Stop)

The base case is the simplest version of the problem that can be answered directly without any more recursion. Without a base case, the function would call itself forever.

```python
def factorial(n):
    if n <= 1:        # Base case
        return 1      # 0! = 1 and 1! = 1
    return n * factorial(n - 1)
```

The base case for factorial is when `n` is 0 or 1, because we know those values directly.

### 2. Recursive Case (How to Reduce)

The recursive case breaks the problem into a smaller version and calls the function again. Critically, the recursive call must move toward the base case, not away from it.

```python
def sum_list(numbers):
    if len(numbers) == 0:  # Base case: empty list sums to 0
        return 0
    return numbers[0] + sum_list(numbers[1:])  # First + sum of rest
```

Each recursive call works on a smaller list, eventually reaching the empty list.

---

## How to Think Recursively

Recursive thinking requires a shift in perspective. Instead of thinking about how to perform every step, you trust that the recursive call will handle the smaller problem correctly.

### The Leap of Faith

When writing recursive code, assume your function already works for smaller inputs. Your job is just to:
1. Handle the base case
2. Reduce the current problem to a smaller one
3. Combine the result appropriately

```python
def length(items):
    # Base case: empty list has length 0
    if not items:
        return 0

    # Recursive case: length is 1 + length of rest
    # Trust that length(items[1:]) correctly returns the length of the rest
    return 1 + length(items[1:])
```

You don't need to trace through every call mentally. Trust the recursion.

### Breaking Down a Problem

Ask yourself: "If I knew the answer for a smaller version of this problem, how would I use it to solve the current problem?"

For example, to reverse a string:
- If I knew how to reverse everything except the first character...
- I could put the first character at the end

```python
def reverse(s):
    if len(s) <= 1:
        return s
    return reverse(s[1:]) + s[0]  # Reverse the rest, append first char
```

---

## When Recursion Shines

Recursion is particularly elegant for problems with inherent self-similar structure:

### Hierarchical Data

Trees, nested lists, file systems, and organizational charts all have recursive structure:

```python
def flatten(nested_list):
    """Flatten a nested list to a single level."""
    result = []
    for item in nested_list:
        if isinstance(item, list):
            result.extend(flatten(item))  # Recursively flatten sublists
        else:
            result.append(item)
    return result

flatten([1, [2, 3, [4, 5]], 6])  # [1, 2, 3, 4, 5, 6]
```

### Divide-and-Conquer Algorithms

Many efficient algorithms work by dividing problems in half:
- **Binary search**: Look in the left or right half
- **Merge sort**: Sort each half, then merge
- **Quicksort**: Partition around a pivot, sort each side

### Mathematical Definitions

Many mathematical concepts are defined recursively:
- **Factorial**: n! = n × (n-1)!
- **Fibonacci**: F(n) = F(n-1) + F(n-2)
- **Power**: x^n = x × x^(n-1)

Recursive code often directly mirrors these definitions.

---

## When Iteration Is Better

Recursion isn't always the best choice. Prefer iteration when:

### The Problem Is Simple Accumulation

Counting, summing, or building a result step by step is often clearer with a loop:

```python
# Iterative - simpler and more efficient
def factorial_iter(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result

# Recursive - works but less efficient in Python
def factorial_rec(n):
    if n <= 1:
        return 1
    return n * factorial_rec(n - 1)
```

### Recursion Depth Could Be Large

Python has a recursion limit (typically around 1000 calls). Deep recursion causes `RecursionError`:

```python
def count_down(n):
    if n == 0:
        return
    count_down(n - 1)

count_down(10000)  # RecursionError: maximum recursion depth exceeded
```

For problems with potentially deep recursion, iteration is safer.

### Performance Matters

Each recursive call has overhead: creating a new stack frame, passing arguments. For simple operations, iteration is faster. We'll explore this more in the performance subtopic.

---

## A Visual Metaphor

Think of recursion like Russian nesting dolls (matryoshka). To count all the dolls:

1. If the doll is empty (base case), you have 1 doll
2. Otherwise, count the dolls inside (recursive call) and add 1

Each doll contains smaller dolls, until you reach the smallest one. Then you work your way back out, combining the counts.

---

## Recursion vs Iteration

Any recursive algorithm can be rewritten iteratively, and vice versa. However, some problems are much more naturally expressed one way:

| Problem Type | Better Approach |
|--------------|-----------------|
| Tree traversal | Recursion |
| Nested structures | Recursion |
| Simple counting/accumulation | Iteration |
| Following a linked structure | Either |
| Divide and conquer | Recursion |
| Performance-critical, deep | Iteration |

The choice often comes down to clarity. Use whichever makes your code easier to understand and maintain.

---

## Key Takeaways

- **Recursion** is when a function calls itself to solve smaller versions of a problem
- Every recursive function needs a **base case** (when to stop) and a **recursive case** (how to reduce)
- The recursive case must **progress toward the base case**
- Use the **leap of faith**: trust that the recursive call handles smaller problems correctly
- Recursion excels for **hierarchical data**, **divide-and-conquer**, and **self-similar structures**
- Prefer **iteration** for simple accumulation, deep recursion, or performance-critical code
- Python has a recursion limit (~1000 calls) - deep recursion causes `RecursionError`

