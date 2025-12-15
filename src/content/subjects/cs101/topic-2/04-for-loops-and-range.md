## `for` Loops and `range()`

`for` loops are for iterating over sequences (iterables). They are ideal when you want to process each item in a collection.

```python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
```

---

## `range()` (Counting Loops)

`range()` produces a sequence of integers (commonly used for counting):

```python
range(5)         # 0,1,2,3,4
range(2, 6)      # 2,3,4,5
range(0, 10, 2)  # 0,2,4,6,8
range(10, 0, -1) # 10,9,8,7,6,5,4,3,2,1
```

Common patterns:

```python
# Repeat something N times
for _ in range(3):
    print("Hi")

# Index-based loop (sometimes needed)
names = ["A", "B", "C"]
for i in range(len(names)):
    print(i, names[i])
```

---

## Prefer Direct Iteration Over Indexing

If you don’t need the index, iterate directly:

```python
names = ["A", "B", "C"]
for name in names:
    print(name)
```

If you need *both* index and value, use `enumerate()`:

```python
names = ["A", "B", "C"]
for i, name in enumerate(names):
    print(i, name)
```

---

## Iterating Over Dictionaries

When you loop over a dictionary, you loop over keys by default:

```python
person = {"name": "Alice", "age": 30}

for key in person:
    print(key, person[key])
```

More explicit options:

```python
for key in person.keys():
    ...

for value in person.values():
    ...

for key, value in person.items():
    print(key, value)
```

---

## Parallel Iteration With `zip()`

`zip()` pairs up items from multiple lists:

```python
names = ["Alice", "Bob"]
scores = [10, 12]

for name, score in zip(names, scores):
    print(name, score)
```

If lists are different lengths, `zip()` stops at the shortest.

---

## Nested Loops (2D Work)

Nested loops are useful for grids, tables, and combinations:

```python
for row in range(3):
    for col in range(4):
        print(f"({row},{col})", end=" ")
    print()
```

Be cautious: nested loops multiply work (3×4 = 12 iterations here).

