## Common Pitfalls

---

## Forgetting to Return the Recursive Result

```python
def sum_list_broken(values):
    if len(values) == 0:
        return 0
    sum_list_broken(values[1:])  # missing return
```

Fix:

```python
def sum_list(values):
    if len(values) == 0:
        return 0
    return values[0] + sum_list(values[1:])
```

---

## Slicing Can Be Costly

Examples like `values[1:]` create new lists each time. For large lists, consider passing an index instead (more advanced).

---

## Best Practices

1. Always define a base case.
2. Ensure each call moves toward the base case.
3. Keep recursive functions small and clear.
4. Watch recursion depth; switch to iteration if needed.
5. Use memoization when repeated work appears.

---

## Practice Exercises

1. Write a recursive function to compute the sum of digits of an integer.
2. Write a recursive function to check if a string is a palindrome.
3. Write a recursive binary search and test it on sorted lists.
4. Write a recursive function to count items in a nested list.
5. Implement Fibonacci with memoization and compare speed to the slow version.

