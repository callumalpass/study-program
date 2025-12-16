## Dictionaries (Key → Value Lookups)

A **dictionary** (or "dict") maps unique **keys** to **values**. Unlike lists, which use numeric indices, dictionaries let you look up values using meaningful keys like names, IDs, or any immutable object.

```python
person = {"name": "Alice", "age": 30, "city": "NYC"}
```

Dictionaries are one of Python's most important and frequently used data structures, perfect for:
- Storing related data with named fields
- Fast lookups by key (like a real dictionary looks up definitions by word)
- Counting and grouping data
- Configuration and settings

---

## Creating Dictionaries

### Literal Syntax

```python
# Empty dictionary
empty = {}
also_empty = dict()

# With initial values
person = {"name": "Alice", "age": 30}
scores = {"alice": 95, "bob": 87, "charlie": 92}

# Keys can be any immutable type
coordinates = {(0, 0): "origin", (1, 0): "right", (0, 1): "up"}
```

### From Other Data

```python
# From list of tuples
pairs = [("name", "Alice"), ("age", 30)]
person = dict(pairs)  # {"name": "Alice", "age": 30}

# From zip
keys = ["a", "b", "c"]
values = [1, 2, 3]
d = dict(zip(keys, values))  # {"a": 1, "b": 2, "c": 3}

# From keyword arguments
person = dict(name="Alice", age=30)  # {"name": "Alice", "age": 30}
```

---

## Accessing Values

### Square Bracket Notation

```python
person = {"name": "Alice", "age": 30}

print(person["name"])  # "Alice"
print(person["age"])   # 30
```

If the key doesn't exist, you get a `KeyError`:

```python
print(person["email"])  # KeyError: 'email'
```

### The `.get()` Method (Safe Access)

`.get()` returns `None` (or a default) if the key doesn't exist:

```python
person = {"name": "Alice", "age": 30}

# Returns None if key missing
email = person.get("email")
print(email)  # None

# Returns default value if key missing
email = person.get("email", "unknown@example.com")
print(email)  # "unknown@example.com"

# Key exists - returns the value
name = person.get("name", "Anonymous")
print(name)  # "Alice"
```

### Choosing Between `[]` and `.get()`

| Use `[]` when... | Use `.get()` when... |
|------------------|---------------------|
| Key should exist | Key might not exist |
| Missing key is an error | Missing key should return default |
| You want the program to crash on bugs | You want to handle missing data gracefully |

```python
# [] - when key must exist
def get_user_name(user_dict):
    return user_dict["name"]  # Crash if no name - probably a bug

# .get() - when key might be missing
def display_email(user_dict):
    email = user_dict.get("email", "No email provided")
    print(email)
```

---

## Adding and Updating Values

### Adding New Keys

```python
person = {"name": "Alice"}

# Add new key-value pairs
person["age"] = 30
person["city"] = "NYC"

print(person)  # {"name": "Alice", "age": 30, "city": "NYC"}
```

### Updating Existing Keys

```python
person = {"name": "Alice", "age": 30}

# Update existing key
person["age"] = 31

print(person)  # {"name": "Alice", "age": 31}
```

The syntax is the same for adding and updating. If the key exists, it's updated. If not, it's added.

### The `.update()` Method

Update multiple keys at once:

```python
person = {"name": "Alice"}

# Add/update multiple keys
person.update({"age": 30, "city": "NYC"})
print(person)  # {"name": "Alice", "age": 30, "city": "NYC"}

# Can also use keyword arguments
person.update(email="alice@example.com", active=True)
```

---

## Removing Keys

```python
person = {"name": "Alice", "age": 30, "city": "NYC"}

# del - remove key (raises KeyError if missing)
del person["city"]
print(person)  # {"name": "Alice", "age": 30}

# pop() - remove and return value
age = person.pop("age")
print(age)      # 30
print(person)   # {"name": "Alice"}

# pop() with default - won't raise error if missing
email = person.pop("email", None)
print(email)    # None

# clear() - remove all keys
person.clear()
print(person)   # {}
```

---

## Checking Key Existence

Use `in` to check if a key exists:

```python
person = {"name": "Alice", "age": 30}

print("name" in person)    # True
print("email" in person)   # False
print("email" not in person)  # True

# Common pattern: check before accessing
if "email" in person:
    print(person["email"])
else:
    print("No email on file")
```

---

## What Can Be a Key?

Keys must be **hashable** (immutable). This includes:
- Strings ✓
- Numbers (int, float) ✓
- Tuples (containing only hashable items) ✓
- Booleans ✓
- `None` ✓

Keys **cannot** be:
- Lists ✗
- Dictionaries ✗
- Sets ✗

```python
# Valid keys
valid = {
    "string_key": 1,
    42: "number key",
    (1, 2): "tuple key",
    True: "bool key",
    None: "none key"
}

# Invalid - will raise TypeError
# invalid = {[1, 2]: "list can't be key"}  # TypeError: unhashable type: 'list'
```

### Why This Restriction?

Dictionaries use a hash table internally. Keys must be hashable so Python can quickly compute where to store and find them. Mutable objects (like lists) can't be hashed reliably because their contents can change.

---

## Values Can Be Anything

While keys are restricted, values can be any Python object:

```python
data = {
    "numbers": [1, 2, 3],           # List as value
    "nested": {"a": 1, "b": 2},     # Dict as value
    "function": len,                 # Function as value
    "mixed": [1, "two", {"three": 3}]  # Complex nested value
}

print(data["numbers"][0])      # 1
print(data["nested"]["a"])     # 1
print(data["function"]("hi"))  # 2
```

---

## Dictionary Order

In Python 3.7+, dictionaries maintain **insertion order**. Items are stored in the order they were added:

```python
d = {}
d["first"] = 1
d["second"] = 2
d["third"] = 3

for key in d:
    print(key)
# first
# second
# third
```

This is guaranteed behavior in modern Python.

---

## Dictionary Length and Empty Check

```python
person = {"name": "Alice", "age": 30}

print(len(person))  # 2 (number of key-value pairs)

# Check if empty
if person:
    print("Has data")

if not person:
    print("Empty")

# After clearing
person.clear()
print(len(person))  # 0
print(bool(person))  # False
```

---

## Practical Examples

### User Profile

```python
user = {
    "username": "alice",
    "email": "alice@example.com",
    "active": True,
    "login_count": 42
}

# Access and update
user["login_count"] += 1
print(f"Welcome back, {user['username']}!")
```

### Configuration

```python
config = {
    "debug": False,
    "host": "localhost",
    "port": 8080,
    "database": {
        "name": "myapp",
        "user": "admin"
    }
}

# Nested access
db_name = config["database"]["name"]
```

### Counting

```python
text = "hello world"
counts = {}

for char in text:
    counts[char] = counts.get(char, 0) + 1

print(counts)  # {'h': 1, 'e': 1, 'l': 3, 'o': 2, ' ': 1, 'w': 1, 'r': 1, 'd': 1}
```

---

## Key Takeaways

- Dictionaries map unique keys to values: `{key: value}`
- Access with `[]` (raises `KeyError`) or `.get()` (returns default)
- Add/update with `dict[key] = value` or `.update()`
- Remove with `del`, `.pop()`, or `.clear()`
- Check membership with `in`: `if key in dict`
- Keys must be hashable (immutable): strings, numbers, tuples
- Values can be any type, including nested dictionaries
- Modern Python dicts maintain insertion order
- Dictionaries excel at fast lookups by meaningful keys

