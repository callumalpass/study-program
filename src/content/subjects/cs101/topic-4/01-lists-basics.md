## Lists (Ordered, Mutable Collections)

A list stores items in a specific order and lets you modify that order and the items inside it.

```python
numbers = [10, 20, 30]
names = ["Alice", "Bob", "Charlie"]
mixed = [1, "hi", True, 3.14]
```

---

## Indexing (0-Based)

```python
names = ["Alice", "Bob", "Charlie"]

names[0]   # "Alice"
names[1]   # "Bob"
names[-1]  # "Charlie" (last item)
```

If you use an invalid index, you get `IndexError`.

---

## Mutability (Lists Can Change)

```python
numbers = [1, 2, 3]
numbers[0] = 99
print(numbers)  # [99, 2, 3]
```

This is different from strings, which are immutable.

---

## Common List Methods

```python
items = ["a", "b"]

items.append("c")     # add to end
items.insert(1, "x")  # insert at index

items.remove("b")     # remove first occurrence
last = items.pop()    # remove and return last item

items.sort()          # sort in place
items.reverse()       # reverse in place
```

**Tip:** `sort()` changes the list. `sorted(items)` returns a new list.

