## Writing Files

Writing files is how your program saves results, creates reports, logs activity, and exports data. The principles are similar to reading, but you must be careful about **which mode you use** and **how you format your output**.

---

## Writing Modes Recap

The mode you choose determines what happens to existing content:

| Mode | Behavior |
|------|----------|
| `"w"` | **Overwrite** - Creates new file or erases existing content |
| `"a"` | **Append** - Creates new file or adds to end of existing |
| `"x"` | **Exclusive** - Creates new file or fails if file exists |

---

## Basic Writing with `.write()`

The `.write()` method writes a string to the file:

```python
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Hello, World!\n")
    file.write("This is line 2.\n")
    file.write("This is line 3.\n")
```

**Important:** `.write()` does NOT add newlines automatically. You must include `\n` yourself.

### Overwriting Existing Files

Mode `"w"` erases everything in an existing file:

```python
# First run: creates file
with open("data.txt", "w", encoding="utf-8") as file:
    file.write("Original content\n")

# Second run: REPLACES everything
with open("data.txt", "w", encoding="utf-8") as file:
    file.write("New content\n")

# data.txt now contains only "New content\n"
```

Be careful! Mode `"w"` can accidentally destroy important data.

---

## Appending with Mode `"a"`

Mode `"a"` preserves existing content and adds to the end:

```python
# First run
with open("log.txt", "a", encoding="utf-8") as file:
    file.write("First entry\n")

# Second run - adds to end
with open("log.txt", "a", encoding="utf-8") as file:
    file.write("Second entry\n")

# log.txt now contains both entries
```

### Use Cases for Appending

- **Log files** - Add new events without losing history
- **Data collection** - Accumulate results over time
- **User activity** - Record actions as they happen

### A Simple Logger

```python
from datetime import datetime

def log_message(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with open("app.log", "a", encoding="utf-8") as file:
        file.write(f"[{timestamp}] {message}\n")

log_message("Application started")
log_message("User logged in")
log_message("Processing complete")
```

---

## Safe Creation with Mode `"x"`

Mode `"x"` prevents accidental overwrites:

```python
from pathlib import Path

filename = "important_data.txt"

# This will fail if file already exists
try:
    with open(filename, "x", encoding="utf-8") as file:
        file.write("New data\n")
    print("File created successfully")
except FileExistsError:
    print(f"Error: {filename} already exists!")
```

### Check Before Writing

Another approach - check first:

```python
from pathlib import Path

path = Path("output.txt")

if path.exists():
    response = input(f"{path} exists. Overwrite? (y/n): ")
    if response.lower() != "y":
        print("Operation cancelled")
        exit()

with open(path, "w", encoding="utf-8") as file:
    file.write("Data to save\n")
```

---

## Writing Multiple Lines

### Using Multiple `.write()` Calls

```python
lines = ["First line", "Second line", "Third line"]

with open("output.txt", "w", encoding="utf-8") as file:
    for line in lines:
        file.write(line + "\n")
```

### Using `.writelines()`

`.writelines()` writes a list of strings, but does NOT add newlines:

```python
# Must include \n in each string
lines = ["First line\n", "Second line\n", "Third line\n"]

with open("output.txt", "w", encoding="utf-8") as file:
    file.writelines(lines)
```

Or add newlines with a comprehension:

```python
lines = ["First line", "Second line", "Third line"]

with open("output.txt", "w", encoding="utf-8") as file:
    file.writelines(line + "\n" for line in lines)
```

### Using `print()` with `file=`

You can redirect `print()` to a file:

```python
with open("output.txt", "w", encoding="utf-8") as file:
    print("First line", file=file)
    print("Second line", file=file)
    print("Number:", 42, file=file)
```

This is convenient because `print()` adds newlines automatically and handles formatting.

---

## Formatting Output

### Using f-strings

```python
name = "Alice"
score = 95.5
rank = 1

with open("report.txt", "w", encoding="utf-8") as file:
    file.write(f"Name: {name}\n")
    file.write(f"Score: {score:.1f}\n")
    file.write(f"Rank: {rank}\n")
```

### Building Complex Output

```python
data = [
    {"name": "Alice", "score": 95},
    {"name": "Bob", "score": 87},
    {"name": "Charlie", "score": 92},
]

with open("scores.txt", "w", encoding="utf-8") as file:
    file.write("=" * 30 + "\n")
    file.write("STUDENT SCORES REPORT\n")
    file.write("=" * 30 + "\n\n")

    for student in data:
        file.write(f"{student['name']}: {student['score']}\n")

    average = sum(s['score'] for s in data) / len(data)
    file.write(f"\nAverage: {average:.1f}\n")
```

### Formatted Tables

```python
data = [
    ("Alice", 95, "A"),
    ("Bob", 87, "B"),
    ("Charlie", 92, "A"),
]

with open("table.txt", "w", encoding="utf-8") as file:
    # Header
    file.write(f"{'Name':<15} {'Score':>5} {'Grade':>5}\n")
    file.write("-" * 27 + "\n")

    # Data rows
    for name, score, grade in data:
        file.write(f"{name:<15} {score:>5} {grade:>5}\n")
```

Output:
```
Name              Score Grade
---------------------------
Alice                95     A
Bob                  87     B
Charlie              92     A
```

---

## Writing and Reading Together

### Process and Save

```python
# Read input, process, write output
with open("input.txt", "r", encoding="utf-8") as infile:
    content = infile.read()

# Process the content
processed = content.upper()

# Write result
with open("output.txt", "w", encoding="utf-8") as outfile:
    outfile.write(processed)
```

### Copy with Transformation

```python
with open("input.txt", "r", encoding="utf-8") as infile, \
     open("output.txt", "w", encoding="utf-8") as outfile:
    for line_num, line in enumerate(infile, start=1):
        outfile.write(f"{line_num:4}: {line}")
```

---

## Creating Backup Files

Before overwriting, create a backup:

```python
from pathlib import Path
import shutil

def safe_write(filename, content):
    path = Path(filename)

    # Create backup if file exists
    if path.exists():
        backup = path.with_suffix(".bak")
        shutil.copy(path, backup)

    # Write new content
    with open(path, "w", encoding="utf-8") as file:
        file.write(content)

safe_write("data.txt", "New content\n")
```

---

## Atomic Writes

For critical data, write to a temporary file first, then rename:

```python
from pathlib import Path
import os

def atomic_write(filename, content):
    path = Path(filename)
    temp_path = path.with_suffix(".tmp")

    # Write to temporary file
    with open(temp_path, "w", encoding="utf-8") as file:
        file.write(content)

    # Atomic rename (safe even if crash during write)
    os.replace(temp_path, path)

atomic_write("important.txt", "Critical data\n")
```

---

## Flushing to Disk

By default, Python buffers writes for efficiency. To force immediate writing:

```python
with open("log.txt", "w", encoding="utf-8") as file:
    file.write("Important message\n")
    file.flush()  # Force write to disk now
```

Or use `flush=True` with `print()`:

```python
with open("log.txt", "w", encoding="utf-8") as file:
    print("Important message", file=file, flush=True)
```

---

## Common Mistakes

### Forgetting Newlines

```python
# Bug: all on one line
with open("out.txt", "w", encoding="utf-8") as file:
    file.write("Line 1")
    file.write("Line 2")
# Result: "Line 1Line 2"

# Fix: add \n
with open("out.txt", "w", encoding="utf-8") as file:
    file.write("Line 1\n")
    file.write("Line 2\n")
```

### Accidental Overwrite

```python
# Oops - mode "w" deletes existing content!
with open("important.txt", "w", encoding="utf-8") as file:
    file.write("New data")

# Use "a" to append, or check before writing
```

### Writing Outside `with` Block

```python
# Bug: file is closed, write fails
with open("out.txt", "w", encoding="utf-8") as file:
    pass

file.write("Too late!")  # ValueError: I/O operation on closed file
```

---

## Key Takeaways

- Mode `"w"` overwrites files - be careful with existing data!
- Mode `"a"` appends to files - perfect for logs
- Mode `"x"` fails if file exists - prevents accidental overwrites
- `.write()` does NOT add newlines - always include `\n`
- `.writelines()` takes a list but adds NO newlines
- `print(..., file=f)` is convenient for formatted output
- Use f-strings for formatted data
- Create backups before overwriting important files
- Use atomic writes for critical data

