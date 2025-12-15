## JSON Files (Structured Data)

JSON is great for structured data that looks like nested dictionaries/lists.

Python ↔ JSON mapping:

- dict ↔ object
- list ↔ array
- str ↔ string
- int/float ↔ number
- True/False ↔ true/false
- None ↔ null

---

## Reading JSON

```python
import json

with open("data.json", "r", encoding="utf-8") as file:
    data = json.load(file)

print(data["name"])
```

---

## Writing JSON

```python
import json

person = {"name": "Alice", "age": 30, "hobbies": ["reading", "hiking"]}

with open("output.json", "w", encoding="utf-8") as file:
    json.dump(person, file, indent=2)
```

`indent=2` makes the JSON easier for humans to read.

---

## Common Mistake: Non-JSON Types

Some Python types (like `set`) can’t be directly written as JSON:

```python
import json

data = {"tags": {"python", "files"}}
# json.dumps(data)  # TypeError: set is not JSON serializable
```

Fix by converting:

```python
data = {"tags": list({"python", "files"})}
```

