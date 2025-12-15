## Dictionaries (Key → Value Lookups)

A dictionary maps **unique keys** to values.

```python
person = {"name": "Alice", "age": 30}
```

---

## Accessing Values

```python
person["name"]  # "Alice"
```

If the key doesn’t exist, this raises `KeyError`. Safer option:

```python
person.get("email")              # None
person.get("email", "Unknown")   # default value
```

---

## Adding and Updating

```python
person["city"] = "NYC"  # add
person["age"] = 31      # update
```

---

## What Can Be a Key?

Keys must be hashable (immutable types like strings, numbers, tuples).

```python
scores = {("Alice", 1): 10}  # tuple key is OK

# Not allowed:
# bad = {[1, 2]: "nope"}     # list is unhashable
```

