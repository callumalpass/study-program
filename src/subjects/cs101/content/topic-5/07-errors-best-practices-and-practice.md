---
id: cs101-t5-errors
title: "Errors, Best Practices, Practice"
order: 7
---

## Handling File Errors

File operations often fail. Files go missing, permissions get denied, disks fill up, and data gets corrupted. Robust programs anticipate these failures and handle them gracefully.

---

## Common File Errors

### FileNotFoundError

The file doesn't exist:

```python
# File doesn't exist
with open("missing.txt", "r") as file:
    content = file.read()
# FileNotFoundError: [Errno 2] No such file or directory: 'missing.txt'
```

### PermissionError

You don't have permission to access the file:

```python
# No read permission
with open("/etc/shadow", "r") as file:  # Unix system file
    content = file.read()
# PermissionError: [Errno 13] Permission denied: '/etc/shadow'
```

### IsADirectoryError

Trying to open a directory as a file:

```python
with open("/home/user", "r") as file:
    content = file.read()
# IsADirectoryError: [Errno 21] Is a directory: '/home/user'
```

### FileExistsError

With mode `"x"`, file already exists:

```python
with open("existing.txt", "x") as file:
    file.write("data")
# FileExistsError: [Errno 17] File exists: 'existing.txt'
```

---

## Handling Errors with try/except

### Basic Error Handling

```python
try:
    with open("data.txt", "r", encoding="utf-8") as file:
        content = file.read()
except FileNotFoundError:
    print("File not found!")
    content = ""
```

### Multiple Exception Types

```python
try:
    with open("data.txt", "r", encoding="utf-8") as file:
        content = file.read()
except FileNotFoundError:
    print("File not found")
    content = ""
except PermissionError:
    print("Permission denied")
    content = ""
except IOError as e:
    print(f"I/O error: {e}")
    content = ""
```

### Catching All File Errors

```python
try:
    with open("data.txt", "r", encoding="utf-8") as file:
        content = file.read()
except OSError as e:
    # OSError is the base class for most file errors
    print(f"Could not read file: {e}")
    content = ""
```

---

## Checking Before Opening

### Using pathlib

```python
from pathlib import Path

path = Path("data.txt")

if not path.exists():
    print("File not found")
elif not path.is_file():
    print("Not a regular file")
else:
    with open(path, "r", encoding="utf-8") as file:
        content = file.read()
```

### Check vs Exception

There's debate about checking first vs catching exceptions:

**Check First (LBYL - Look Before You Leap):**
```python
if path.exists():
    with open(path) as f:
        content = f.read()
```

**Catch Exception (EAFP - Easier to Ask Forgiveness than Permission):**
```python
try:
    with open(path) as f:
        content = f.read()
except FileNotFoundError:
    content = ""
```

Python generally favors EAFP because:
- It's atomic (no race condition between check and use)
- It's often cleaner
- It handles unexpected errors

---

## Best Practices for File I/O

### 1. Always Use `with` Statements

```python
# Good - file closes automatically
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()

# Bad - might not close on error
file = open("data.txt", "r")
content = file.read()
file.close()
```

### 2. Always Specify Encoding

```python
# Good - explicit encoding
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()

# Bad - uses system default (varies!)
with open("data.txt", "r") as file:
    content = file.read()
```

### 3. Use `pathlib.Path` for Paths

```python
from pathlib import Path

# Good - works on all platforms
data_path = Path("data") / "scores.txt"

# Bad - platform-specific
data_path = "data/scores.txt"  # Fails on Windows
data_path = "data\\scores.txt"  # Fails on Unix
```

### 4. Use Appropriate Modules for Structured Data

```python
# Good - use csv module for CSV files
import csv
with open("data.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.reader(file)
    for row in reader:
        process(row)

# Bad - manual parsing is error-prone
with open("data.csv", "r", encoding="utf-8") as file:
    for line in file:
        parts = line.strip().split(",")  # Breaks on quoted commas
```

### 5. Handle Exceptions at the Right Level

```python
# Good - handle at appropriate level, let others propagate
def load_config(path):
    """Load config or return defaults."""
    try:
        with open(path, "r", encoding="utf-8") as file:
            return json.load(file)
    except FileNotFoundError:
        return {}  # Reasonable default

# Bad - hiding all errors
def load_config(path):
    try:
        with open(path, "r", encoding="utf-8") as file:
            return json.load(file)
    except Exception:  # Catches everything, hides bugs
        return {}
```

### 6. Use Temporary Files for Safe Writing

```python
import tempfile
import os

def safe_write(filename, content):
    # Write to temp file first
    dir_name = os.path.dirname(filename) or "."
    fd, temp_path = tempfile.mkstemp(dir=dir_name)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as file:
            file.write(content)
        os.replace(temp_path, filename)  # Atomic rename
    except:
        os.unlink(temp_path)  # Clean up temp file
        raise
```

---

## Complete Example: Robust File Processing

```python
import json
from pathlib import Path

def load_data(filepath):
    """Load JSON data with proper error handling."""
    path = Path(filepath)

    if not path.exists():
        print(f"File not found: {filepath}")
        return None

    try:
        with open(path, "r", encoding="utf-8") as file:
            return json.load(file)
    except json.JSONDecodeError as e:
        print(f"Invalid JSON in {filepath}: {e}")
        return None
    except PermissionError:
        print(f"Permission denied: {filepath}")
        return None
    except OSError as e:
        print(f"Error reading {filepath}: {e}")
        return None

def save_data(filepath, data):
    """Save JSON data with proper error handling."""
    path = Path(filepath)

    # Ensure parent directory exists
    path.parent.mkdir(parents=True, exist_ok=True)

    try:
        with open(path, "w", encoding="utf-8") as file:
            json.dump(data, file, indent=2)
        return True
    except PermissionError:
        print(f"Permission denied: {filepath}")
        return False
    except OSError as e:
        print(f"Error writing {filepath}: {e}")
        return False

# Usage
data = load_data("config.json")
if data:
    data["updated"] = True
    if save_data("config.json", data):
        print("Saved successfully")
```

---

## Practice Exercises

Build your file I/O skills with these exercises:

### Exercise 1: Line and Word Counter

Read a text file and count:
- Total lines
- Non-empty lines
- Total words
- Unique words

### Exercise 2: CSV Average Calculator

Read a CSV file with columns `name,score` and:
- Print each student's score
- Calculate and print the average score
- Find the highest and lowest scores

### Exercise 3: Log File Appender

Create a function that appends timestamped messages to a log file:
```python
log_message("User logged in")
# Appends: [2024-01-15 10:30:45] User logged in
```

### Exercise 4: Task Manager

Build a simple task manager using JSON:
- Load tasks from `tasks.json`
- Add new tasks
- Mark tasks as complete
- Save tasks back to the file

### Exercise 5: File Copier

Write a program that:
- Takes source and destination filenames
- Copies the content from source to destination
- Handles errors (source missing, destination exists)
- Reports success or failure

---

## Key Takeaways

- File operations can fail - always consider error handling
- Common errors: `FileNotFoundError`, `PermissionError`, `IsADirectoryError`
- Use `try/except` to handle file errors gracefully
- Python favors EAFP (try first, handle errors) over LBYL (check first)
- Always use `with` statements for automatic cleanup
- Always specify `encoding="utf-8"` for text files
- Use `pathlib.Path` for cross-platform path handling
- Use `csv` and `json` modules for structured data
- Handle exceptions at the appropriate level - don't hide bugs

