## Iterating Over Lists

Direct iteration is the most common and readable:

```python
numbers = [10, 20, 30]
for n in numbers:
    print(n)
```

If you need index + value, use `enumerate()`:

```python
for i, n in enumerate(numbers):
    print(i, n)
```

---

## List Comprehensions

List comprehensions create new lists concisely:

```python
squares = [n * n for n in range(5)]          # [0, 1, 4, 9, 16]
evens = [n for n in range(10) if n % 2 == 0] # filter
```

### Comprehension vs Loop

Comprehensions are great when:
- the logic is short
- you’re transforming/filtering a list

Prefer a normal `for` loop when:
- the logic is long
- you need debugging prints
- you’re building multiple outputs

---

## Nested Comprehensions (Use Carefully)

```python
pairs = [(i, j) for i in range(3) for j in range(2)]
# (0,0) (0,1) (1,0) (1,1) (2,0) (2,1)
```

If it becomes hard to read, switch to nested loops.

