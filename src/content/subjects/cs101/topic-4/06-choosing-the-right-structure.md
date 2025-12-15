## Choosing Between List and Dictionary

Use a **list** when:
- order matters
- you need duplicates
- you mostly iterate through all items

Use a **dict** when:
- you need fast lookup by key (e.g. username → profile)
- your data naturally has “labels” (keys)

---

## A Tiny Performance Intuition (Big-O Basics)

At a high level:

- List lookup by index: fast (approximately O(1))
- Searching a list for a value: slower (O(n))
- Dict lookup by key: fast (approximately O(1))

Example:

```python
names = ["alice", "bob", "charlie"]

# O(n) search
if "bob" in names:
    print("found")

scores = {"alice": 10, "bob": 7}

# O(1) lookup by key
print(scores["bob"])
```

This is a major reason dictionaries are so important.

---

## Related Structures You’ll Meet

- **tuple**: ordered, immutable (good for fixed groups)
- **set**: unordered collection of unique items (great for membership tests)

```python
unique_names = set(["alice", "bob", "alice"])  # {"alice", "bob"}
```

