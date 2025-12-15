## Recursion: Solving Problems by Solving Smaller Problems

Recursion is when a function calls itself. It’s useful when a problem can be described in terms of smaller versions of itself.

Every recursive function needs:

1. **Base case**: the simplest case where we stop recursing
2. **Recursive case**: the step that reduces the problem and calls the function again

---

## A Tiny Example: Countdown

```python
def countdown(n):
    if n <= 0:          # base case
        print("Blastoff!")
        return

    print(n)
    countdown(n - 1)    # recursive case
```

The key is that `n` moves toward the base case on every call.

---

## When Recursion Is a Good Fit

Recursion is natural for:
- problems with self-similar structure (nested lists, tree-like data)
- divide-and-conquer algorithms (binary search, merge sort)
- traversing file systems or hierarchical data

Iteration is often better when:
- the solution is simple counting/accumulating
- recursion depth could be very large

