## Common Mistakes

---

## `IndexError` and `KeyError`

```python
items = [1, 2, 3]
# items[3]  # IndexError

person = {"name": "Alice"}
# person["age"]  # KeyError

age = person.get("age", "Unknown")  # safe
```

---

## Modifying While Iterating

Don’t remove items from a list while iterating over it:

```python
numbers = [1, 2, 3, 4]
numbers = [n for n in numbers if n % 2 == 1]
```

---

## Accidental Shared Inner Lists

```python
# Bug
grid = [[0] * 3] * 2
```

Prefer:

```python
grid = [[0] * 3 for _ in range(2)]
```

---

## Practice Exercises

1. **Counts**: Count how many times each word appears in a list of words.
2. **Lookup**: Convert a list of `(name, score)` pairs into a dict.
3. **Filter**: Build a new list containing only items that match a condition.
4. **Top scorer**: Given a dict of names → scores, find the name with the highest score.
5. **2D grid**: Create a 5×5 grid filled with 0s and set the diagonal to 1.

