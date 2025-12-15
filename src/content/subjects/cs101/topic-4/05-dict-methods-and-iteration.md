## Iterating Over Dictionaries

Looping over a dict gives keys by default:

```python
person = {"name": "Alice", "age": 30}
for key in person:
    print(key, person[key])
```

More explicit patterns:

```python
for key in person.keys():
    ...

for value in person.values():
    ...

for key, value in person.items():
    print(key, value)
```

---

## Useful Dictionary Methods

```python
data = {"a": 1, "b": 2}

data.pop("a")           # remove and return value
data.pop("missing", 0)  # default if missing

data.update({"c": 3})   # merge/overwrite keys
```

### `setdefault()` (Initialize If Missing)

```python
counts = {}
for letter in "banana":
    counts.setdefault(letter, 0)
    counts[letter] += 1
```

Later you’ll also see `collections.defaultdict` for this pattern (advanced).

---

## Dictionary Comprehensions

```python
nums = [1, 2, 3, 4]
squares = {n: n * n for n in nums}
```

---

## Sorting Dictionary Data

Dictionaries preserve insertion order in modern Python, but you often want to sort keys/values:

```python
scores = {"bob": 7, "alice": 10, "charlie": 8}

for name in sorted(scores):
    print(name, scores[name])

for name, score in sorted(scores.items(), key=lambda item: item[1], reverse=True):
    print(name, score)
```

