## Introduction

Real programs need to persist data beyond their runtime. File Input/Output (I/O) lets your programs read data from files and save results for later use. This topic covers reading and writing text files, handling different file formats, and managing files safely.

**Learning Objectives:**
- Open, read, and write text files
- Use context managers for safe file handling
- Handle common file formats (text, CSV, JSON)
- Navigate the file system with os and pathlib
- Handle file-related errors gracefully
- Understand file paths and working directories

---

## Core Concepts

### Opening and Closing Files

The basic pattern for file operations:

```python
# Basic approach (not recommended)
file = open("data.txt", "r")
content = file.read()
file.close()  # Must remember to close!

# Better approach - context manager (recommended)
with open("data.txt", "r") as file:
    content = file.read()
# File automatically closed after the block
```

**Always use `with` statements** - they ensure files are closed even if errors occur.

### File Modes

```python
"r"   # Read (default) - file must exist
"w"   # Write - creates new or overwrites existing
"a"   # Append - adds to end of file
"r+"  # Read and write
"x"   # Exclusive creation - fails if file exists

# Add 'b' for binary mode
"rb"  # Read binary
"wb"  # Write binary
```

### Reading Files

```python
# Read entire file as string
with open("data.txt", "r") as file:
    content = file.read()
    print(content)

# Read all lines as list
with open("data.txt", "r") as file:
    lines = file.readlines()  # Includes newline at end of each line
    for line in lines:
        print(line.strip())  # Remove whitespace/newlines

# Read line by line (memory efficient for large files)
with open("data.txt", "r") as file:
    for line in file:
        print(line.strip())
```

### Writing Files

```python
# Write string to file (overwrites existing content!)
with open("output.txt", "w") as file:
    file.write("Hello, World!\n")
    file.write("Second line\n")

# Append to existing file
with open("log.txt", "a") as file:
    file.write("New log entry\n")
```

### Working with JSON Files

JSON is ideal for structured data:

```python
import json

# Reading JSON
with open("data.json", "r") as file:
    data = json.load(file)  # Parse JSON to Python dict/list
    print(data["name"])

# Writing JSON
person = {"name": "Alice", "age": 30, "hobbies": ["reading", "hiking"]}
with open("output.json", "w") as file:
    json.dump(person, file, indent=2)  # Pretty-print with indentation
```

---

## Common Mistakes and Debugging

### Mistake 1: Forgetting to Close Files

```python
# Wrong - file may stay open if error occurs
file = open("data.txt")
data = file.read()
# file.close()  # What if an error happens before this?

# Fix - always use context managers
with open("data.txt") as file:
    data = file.read()
# Automatically closed, even if error occurs
```

### Mistake 2: FileNotFoundError

```python
# Wrong - assumes file exists
with open("maybe_exists.txt", "r") as file:
    data = file.read()

# Fix - handle the error
try:
    with open("maybe_exists.txt", "r") as file:
        data = file.read()
except FileNotFoundError:
    print("File not found!")
    data = None
```

---

## Best Practices

1. **Always use context managers** (`with` statement)
2. **Specify encoding** explicitly (`encoding="utf-8"`)
3. **Use pathlib** for path manipulations instead of string operations
4. **Handle exceptions** for file operations

---

## Summary

You've learned to work with files in Python:

- **Open files** with context managers for automatic cleanup
- **File modes** control read/write/append behavior
- **Read methods**: `.read()`, `.readlines()`, iteration
- **Write methods**: `.write()`, `.writelines()`
- **JSON module** for structured data
- **pathlib** for modern path handling
