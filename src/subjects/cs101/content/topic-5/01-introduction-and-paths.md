---
id: cs101-t5-paths
title: "Introduction and Paths"
order: 1
---

## File I/O: Persisting Data

When your program ends, all variables disappear. Every number calculated, every list built, every piece of data processed - gone. **File Input/Output (I/O)** solves this problem by letting your programs read data from files and write data back to them.

File I/O enables you to:
- **Load data** - Read configuration files, import datasets, restore saved progress
- **Save results** - Write reports, export processed data, create logs
- **Exchange information** - Share data between programs or users

Almost every real-world program uses files. Understanding file I/O is essential for building useful software.

---

## The Two Key Concepts

To work with files confidently, you need to understand two fundamental ideas:

1. **Paths**: Where is the file located on the filesystem?
2. **File handling**: How do we open, read, write, and close files safely?

This subtopic focuses on paths. Later subtopics cover the mechanics of reading and writing.

---

## What Is a Path?

A **path** is the address of a file on your computer. Just like a street address tells you where a house is, a path tells your program where to find a file.

```
/home/alice/projects/myapp/data/scores.txt
```

This path tells us:
- The file is named `scores.txt`
- It's in the `data` folder
- Which is in the `myapp` folder
- Which is in the `projects` folder
- Which is in `alice`'s home directory
- Which is at the root of the filesystem (`/`)

---

## Absolute vs Relative Paths

There are two types of paths:

### Absolute Paths

An **absolute path** specifies the complete location from the root of the filesystem:

```python
# Linux/macOS absolute paths start with /
"/home/alice/documents/data.txt"
"/Users/bob/Desktop/report.csv"

# Windows absolute paths start with a drive letter
"C:\\Users\\Alice\\Documents\\data.txt"
"D:\\Projects\\myapp\\config.json"
```

Absolute paths always point to the same location, regardless of where your program is running.

### Relative Paths

A **relative path** specifies a location relative to the **current working directory** (where your program is running):

```python
# Relative paths don't start with / or a drive letter
"data.txt"           # File in current directory
"data/scores.txt"    # File in data/ subdirectory
"../config.txt"      # File in parent directory
"../../shared/db.json"  # File two directories up, then into shared/
```

### Which to Use?

| Situation | Recommended |
|-----------|-------------|
| Files bundled with your code | Relative paths |
| User-specified files | Absolute paths |
| System files | Absolute paths |
| Config files in your project | Relative paths |

Relative paths make your code more portable - it works on different machines without changing paths.

---

## The "File Not Found" Problem

The most common file error: **the file exists, but your program can't find it**.

This usually happens because your program's working directory isn't where you think it is:

```python
# You expect this to work...
with open("data.txt", "r") as f:
    content = f.read()

# But you get:
# FileNotFoundError: [Errno 2] No such file or directory: 'data.txt'
```

The file might be there, but your program is running from a different directory.

### Checking the Current Directory

```python
import os

# See where Python thinks you are
print(os.getcwd())  # e.g., "/home/alice/projects"

# List files in current directory
print(os.listdir("."))
```

### Common Causes

1. **Running from IDE vs terminal** - IDEs often set a different working directory
2. **Running from different locations** - `python myapp/main.py` vs `cd myapp && python main.py`
3. **Typos in path** - Case matters on Linux/macOS; `Data.txt` ≠ `data.txt`

---

## `pathlib`: Modern Path Handling

Python's `pathlib` module provides an object-oriented way to work with paths. It's cleaner and more reliable than string manipulation.

### Creating Paths

```python
from pathlib import Path

# Create path objects
data_dir = Path("data")
file_path = Path("data/scores.txt")

# Use / operator to build paths (works on all platforms!)
data_dir = Path("data")
file_path = data_dir / "scores.txt"
config_path = data_dir / "config" / "settings.json"

print(file_path)  # data/scores.txt (or data\scores.txt on Windows)
```

The `/` operator is the key advantage - it works correctly on Windows, macOS, and Linux.

### Checking If Files Exist

```python
from pathlib import Path

path = Path("data/scores.txt")

# Does it exist?
print(path.exists())      # True or False

# Is it a file?
print(path.is_file())     # True if it's a file

# Is it a directory?
print(path.is_dir())      # True if it's a directory
```

### Getting Path Components

```python
from pathlib import Path

path = Path("/home/alice/documents/report.txt")

print(path.name)      # "report.txt" - just the filename
print(path.stem)      # "report" - filename without extension
print(path.suffix)    # ".txt" - the extension
print(path.parent)    # /home/alice/documents - the directory
print(path.parts)     # ('/', 'home', 'alice', 'documents', 'report.txt')
```

### Creating Directories

```python
from pathlib import Path

# Create a single directory
Path("output").mkdir(exist_ok=True)  # exist_ok prevents error if it exists

# Create nested directories
Path("output/reports/2024").mkdir(parents=True, exist_ok=True)
```

### Listing Files

```python
from pathlib import Path

# List all items in a directory
for item in Path("data").iterdir():
    print(item)

# List only files matching a pattern
for txt_file in Path("data").glob("*.txt"):
    print(txt_file)

# Recursive search (all subdirectories)
for py_file in Path(".").glob("**/*.py"):
    print(py_file)
```

---

## Getting the Script's Directory

A common pattern: locate files relative to your Python script, not the working directory:

```python
from pathlib import Path

# Get the directory containing this script
SCRIPT_DIR = Path(__file__).parent.resolve()

# Now build paths relative to it
data_path = SCRIPT_DIR / "data" / "scores.txt"
config_path = SCRIPT_DIR / "config.json"

# This works regardless of where you run the script from
with open(data_path) as f:
    content = f.read()
```

`__file__` is the path to the current Python file. `.parent` gets its directory. `.resolve()` makes it absolute.

---

## Path Comparison and Normalization

```python
from pathlib import Path

# Paths can be compared
path1 = Path("data/scores.txt")
path2 = Path("data/../data/scores.txt")

# They point to the same location
print(path1.resolve() == path2.resolve())  # True

# Resolve cleans up .. and makes absolute
messy = Path("./data/../data/./scores.txt")
print(messy.resolve())  # /home/user/project/data/scores.txt
```

---

## Cross-Platform Compatibility

Paths look different on different systems:
- Linux/macOS: `/home/alice/data.txt`
- Windows: `C:\Users\Alice\data.txt`

`pathlib` handles this automatically:

```python
from pathlib import Path

# This works on ALL platforms:
path = Path("data") / "reports" / "2024" / "january.csv"

# DON'T do this (Windows-specific):
path = "data\\reports\\2024\\january.csv"

# DON'T do this either (Linux-specific):
path = "data/reports/2024/january.csv"
```

Always use `Path` and the `/` operator for portable code.

---

## Common Path Patterns

```python
from pathlib import Path

# Find all Python files in a project
python_files = list(Path(".").glob("**/*.py"))

# Get unique file extensions in a directory
extensions = {f.suffix for f in Path("data").iterdir() if f.is_file()}

# Find the most recently modified file
files = Path("logs").glob("*.log")
latest = max(files, key=lambda f: f.stat().st_mtime)

# Create output path with same name but different extension
input_path = Path("data/report.csv")
output_path = input_path.with_suffix(".json")  # data/report.json
```

---

## Key Takeaways

- File I/O lets programs persist data beyond their execution
- Paths are addresses that tell your program where files are located
- **Absolute paths** specify complete locations from the root
- **Relative paths** are relative to the current working directory
- "File not found" usually means wrong working directory, not missing file
- Use `pathlib.Path` for modern, cross-platform path handling
- The `/` operator builds paths that work on all operating systems
- Use `Path(__file__).parent` to find files relative to your script
- Always check `path.exists()` before trying to open files you're not sure about

