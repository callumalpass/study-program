## JSON Files (Structured Data)

**JSON** (JavaScript Object Notation) is a popular format for storing and exchanging structured data. Unlike CSV (which is best for flat tables), JSON excels at nested, hierarchical data - configurations, API responses, and complex records.

---

## What Is JSON?

JSON looks very similar to Python dictionaries and lists:

```json
{
    "name": "Alice",
    "age": 30,
    "active": true,
    "hobbies": ["reading", "hiking"],
    "address": {
        "city": "NYC",
        "zip": "10001"
    }
}
```

### JSON vs Python Syntax

JSON maps directly to Python types:

| JSON | Python |
|------|--------|
| `object {}` | `dict` |
| `array []` | `list` |
| `string ""` | `str` |
| `number` | `int` or `float` |
| `true` | `True` |
| `false` | `False` |
| `null` | `None` |

Note the differences:
- JSON uses `true`/`false`/`null` (lowercase)
- JSON strings use double quotes only (`"text"`)
- JSON doesn't support Python-specific types like `tuple`, `set`, or `datetime`

---

## Reading JSON Files

Use `json.load()` to read a JSON file into Python objects:

```python
import json

with open("data.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# data is now a Python dict/list
print(data["name"])
print(data["hobbies"][0])
print(data["address"]["city"])
```

### Handling Nested Data

JSON naturally represents hierarchical data:

```python
import json

# config.json:
# {
#     "database": {
#         "host": "localhost",
#         "port": 5432
#     },
#     "features": ["auth", "logging"]
# }

with open("config.json", "r", encoding="utf-8") as file:
    config = json.load(file)

db_host = config["database"]["host"]
first_feature = config["features"][0]
```

### Safe Access with `.get()`

Handle missing keys gracefully:

```python
import json

with open("data.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# May raise KeyError if 'email' doesn't exist
# email = data["email"]

# Safe access with default
email = data.get("email", "not provided")
```

---

## Writing JSON Files

Use `json.dump()` to write Python objects to a JSON file:

```python
import json

person = {
    "name": "Alice",
    "age": 30,
    "hobbies": ["reading", "hiking"],
    "active": True
}

with open("person.json", "w", encoding="utf-8") as file:
    json.dump(person, file)
```

### Pretty Printing

By default, `json.dump()` writes compact JSON. Use `indent` for readable formatting:

```python
import json

data = {
    "users": [
        {"name": "Alice", "age": 30},
        {"name": "Bob", "age": 25}
    ]
}

# Compact (hard to read)
with open("compact.json", "w", encoding="utf-8") as file:
    json.dump(data, file)
# {"users": [{"name": "Alice", "age": 30}, {"name": "Bob", "age": 25}]}

# Pretty printed (human readable)
with open("pretty.json", "w", encoding="utf-8") as file:
    json.dump(data, file, indent=2)
# {
#   "users": [
#     {
#       "name": "Alice",
#       "age": 30
#     },
#     ...
#   ]
# }
```

### Sorting Keys

For consistent output, sort keys alphabetically:

```python
import json

data = {"zebra": 1, "apple": 2, "mango": 3}

with open("sorted.json", "w", encoding="utf-8") as file:
    json.dump(data, file, indent=2, sort_keys=True)
```

---

## JSON Strings

Sometimes you need JSON as a string (for APIs, logging, etc.):

```python
import json

data = {"name": "Alice", "age": 30}

# Convert to JSON string
json_string = json.dumps(data)
print(json_string)  # '{"name": "Alice", "age": 30}'

# Parse JSON string back to Python
parsed = json.loads(json_string)
print(parsed["name"])  # "Alice"
```

- `json.dump()` writes to a file
- `json.dumps()` returns a string
- `json.load()` reads from a file
- `json.loads()` parses a string

---

## Common JSON Use Cases

### Configuration Files

```python
import json
from pathlib import Path

def load_config(config_path="config.json"):
    path = Path(config_path)
    if path.exists():
        with open(path, "r", encoding="utf-8") as file:
            return json.load(file)
    return {}  # Default empty config

def save_config(config, config_path="config.json"):
    with open(config_path, "w", encoding="utf-8") as file:
        json.dump(config, file, indent=2)

# Usage
config = load_config()
config["theme"] = "dark"
save_config(config)
```

### Saving Application State

```python
import json

def save_game(player_data, filename="savegame.json"):
    with open(filename, "w", encoding="utf-8") as file:
        json.dump(player_data, file, indent=2)

def load_game(filename="savegame.json"):
    try:
        with open(filename, "r", encoding="utf-8") as file:
            return json.load(file)
    except FileNotFoundError:
        return None

# Save game state
player = {
    "name": "Hero",
    "level": 15,
    "inventory": ["sword", "shield", "potion"],
    "position": {"x": 100, "y": 200}
}
save_game(player)

# Load game state
loaded_player = load_game()
if loaded_player:
    print(f"Welcome back, {loaded_player['name']}!")
```

### Working with Lists of Records

```python
import json

# Save a list of records
tasks = [
    {"id": 1, "title": "Buy groceries", "done": False},
    {"id": 2, "title": "Write report", "done": True},
    {"id": 3, "title": "Call mom", "done": False},
]

with open("tasks.json", "w", encoding="utf-8") as file:
    json.dump(tasks, file, indent=2)

# Load and process
with open("tasks.json", "r", encoding="utf-8") as file:
    tasks = json.load(file)

incomplete = [t for t in tasks if not t["done"]]
print(f"You have {len(incomplete)} incomplete tasks")
```

---

## Handling Non-JSON Types

Some Python types can't be directly serialized to JSON:

```python
import json
from datetime import datetime

data = {
    "timestamp": datetime.now(),  # datetime is not JSON serializable
    "tags": {"python", "json"},   # set is not JSON serializable
}

# This will raise TypeError
# json.dump(data, file)
```

### Solution: Convert Before Saving

```python
import json
from datetime import datetime

data = {
    "timestamp": datetime.now().isoformat(),  # Convert to string
    "tags": list({"python", "json"}),         # Convert set to list
}

with open("data.json", "w", encoding="utf-8") as file:
    json.dump(data, file, indent=2)
```

### Custom Serialization

For complex cases, use a custom encoder:

```python
import json
from datetime import datetime

class CustomEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        if isinstance(obj, set):
            return list(obj)
        return super().default(obj)

data = {
    "timestamp": datetime.now(),
    "tags": {"python", "json"}
}

json_string = json.dumps(data, cls=CustomEncoder, indent=2)
print(json_string)
```

---

## Error Handling

### File Not Found

```python
import json

try:
    with open("missing.json", "r", encoding="utf-8") as file:
        data = json.load(file)
except FileNotFoundError:
    data = {}  # Default value
```

### Invalid JSON

```python
import json

try:
    with open("broken.json", "r", encoding="utf-8") as file:
        data = json.load(file)
except json.JSONDecodeError as e:
    print(f"Invalid JSON: {e}")
    data = {}
```

---

## JSON vs CSV

| Feature | JSON | CSV |
|---------|------|-----|
| Structure | Nested/hierarchical | Flat table |
| Data types | Multiple | All strings |
| Human readable | With indentation | Yes |
| Best for | Config, APIs, complex data | Tabular data, spreadsheets |
| File size | Larger (more overhead) | Smaller |

---

## Key Takeaways

- JSON is ideal for nested, structured data
- `json.load()` reads from file; `json.loads()` parses string
- `json.dump()` writes to file; `json.dumps()` returns string
- Use `indent=2` for human-readable output
- JSON only supports basic types - convert `datetime`, `set`, etc.
- Use `try/except` for `FileNotFoundError` and `JSONDecodeError`
- JSON is perfect for config files, API data, and save states

