## Opening Files Safely

Before you can read or write a file, you need to **open** it. Python's `open()` function creates a connection between your program and a file on disk. But there's a critical rule: **always close files when you're done**.

---

## The Problem with Manual Closing

You could open and close files manually:

```python
file = open("data.txt", "r")
content = file.read()
file.close()  # Don't forget this!
```

But this approach has a serious problem. If an error occurs before `close()`:

```python
file = open("data.txt", "r")
content = file.read()
process(content)      # If this crashes...
file.close()          # ...this never runs!
```

The file stays open. Open files consume system resources, and operating systems limit how many files a program can have open. In long-running programs, this causes resource leaks.

---

## The `with` Statement (Context Manager)

The **context manager** pattern solves this problem elegantly:

```python
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
    # File is automatically closed when block ends
```

When the `with` block ends - whether normally or due to an error - Python automatically closes the file. This is guaranteed, even if an exception is raised.

```python
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
    raise ValueError("Something went wrong!")
    # File STILL gets closed properly
```

**Always use `with open(...)` for file operations.** There's almost never a good reason not to.

---

## The `open()` Function

The basic syntax:

```python
open(path, mode, encoding=...)
```

- `path`: The file path (string or `Path` object)
- `mode`: How to open the file (read, write, etc.)
- `encoding`: How to interpret text (usually `"utf-8"`)

---

## File Modes

The mode determines what operations are allowed and how the file is treated:

### Read Mode: `"r"`

Opens for reading. The file **must exist**:

```python
# Read mode - file must exist
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()

# If file doesn't exist: FileNotFoundError
```

This is the default mode if you don't specify one.

### Write Mode: `"w"`

Opens for writing. **Creates the file if it doesn't exist. Overwrites if it does!**

```python
# Write mode - creates or OVERWRITES
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Hello, World!\n")

# WARNING: Any existing content is DELETED
```

This is the most dangerous mode - it silently destroys existing files.

### Append Mode: `"a"`

Opens for appending. Creates if doesn't exist. Adds to end if it does:

```python
# Append mode - creates or adds to end
with open("log.txt", "a", encoding="utf-8") as file:
    file.write("New log entry\n")

# Existing content is preserved
```

Perfect for log files or accumulating data.

### Exclusive Create: `"x"`

Opens for writing, but **fails if file already exists**:

```python
# Exclusive create - fails if file exists
try:
    with open("new_file.txt", "x", encoding="utf-8") as file:
        file.write("This is a new file\n")
except FileExistsError:
    print("File already exists!")
```

Use this to avoid accidentally overwriting important files.

### Read and Write: `"r+"`

Opens for both reading and writing. File must exist:

```python
with open("data.txt", "r+", encoding="utf-8") as file:
    content = file.read()
    file.write("Additional content")
```

---

## Mode Summary Table

| Mode | Read | Write | Create | Truncate | Position |
|------|------|-------|--------|----------|----------|
| `"r"` | ✓ | | | | Start |
| `"w"` | | ✓ | ✓ | ✓ | Start |
| `"a"` | | ✓ | ✓ | | End |
| `"x"` | | ✓ | Must create | | Start |
| `"r+"` | ✓ | ✓ | | | Start |
| `"w+"` | ✓ | ✓ | ✓ | ✓ | Start |
| `"a+"` | ✓ | ✓ | ✓ | | End |

---

## Text vs Binary Mode

By default, files are opened in **text mode** - Python handles converting bytes to strings and normalizing line endings.

For non-text files (images, PDFs, executables), use **binary mode** by adding `"b"`:

```python
# Text mode (default) - for .txt, .csv, .json, .py, .html
with open("data.txt", "r", encoding="utf-8") as file:
    text = file.read()  # Returns str

# Binary mode - for images, PDFs, audio, etc.
with open("image.png", "rb") as file:
    data = file.read()  # Returns bytes
```

Binary modes: `"rb"`, `"wb"`, `"ab"`, `"r+b"`, etc.

For CS101, we focus on text files. Binary mode is needed for working with media files or network protocols.

---

## Encoding: Making Sense of Text

Text files store bytes, not characters. **Encoding** defines how characters map to bytes.

### Why UTF-8?

UTF-8 is the universal standard:
- Supports all languages and symbols (emoji too!)
- Compatible with ASCII
- The default for the web and modern systems

```python
# Always specify encoding for text files
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
```

### The Encoding Problem

Without specifying encoding, Python uses your system's default (which varies):

```python
# DON'T DO THIS - behavior varies by system
with open("data.txt", "r") as file:  # No encoding specified
    content = file.read()

# DO THIS - explicit and portable
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
```

### Handling Encoding Errors

Sometimes files contain invalid characters:

```python
# Strict (default) - raises error on invalid bytes
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()  # UnicodeDecodeError if invalid

# Replace invalid characters with ?
with open("data.txt", "r", encoding="utf-8", errors="replace") as file:
    content = file.read()

# Ignore invalid characters
with open("data.txt", "r", encoding="utf-8", errors="ignore") as file:
    content = file.read()
```

---

## Line Endings and `newline`

Different operating systems use different line endings:
- Unix/Linux/macOS: `\n` (LF - Line Feed)
- Windows: `\r\n` (CR+LF - Carriage Return + Line Feed)
- Old macOS: `\r` (CR)

Python's text mode handles this automatically - it converts all line endings to `\n` when reading and converts `\n` to the platform-appropriate ending when writing.

### The `newline` Parameter

For CSV files, you often want to disable this automatic conversion:

```python
# For CSV files, use newline=""
import csv

with open("data.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(["name", "score"])
```

This is explained more in the CSV subtopic.

---

## Checking Before Opening

Before opening a file, you might want to check if it exists:

```python
from pathlib import Path

path = Path("data.txt")

if path.exists():
    with open(path, "r", encoding="utf-8") as file:
        content = file.read()
else:
    print("File not found")

# Or handle the exception
try:
    with open("data.txt", "r", encoding="utf-8") as file:
        content = file.read()
except FileNotFoundError:
    print("File not found")
```

---

## Multiple Files

You can open multiple files in one `with` statement:

```python
# Open two files at once
with open("input.txt", "r", encoding="utf-8") as infile, \
     open("output.txt", "w", encoding="utf-8") as outfile:
    for line in infile:
        outfile.write(line.upper())
```

Both files are guaranteed to close when the block ends.

---

## Common Mistakes

### Forgetting `with`

```python
# Bad - file might not close
file = open("data.txt")
content = file.read()
# Forgot file.close()!

# Good - file always closes
with open("data.txt") as file:
    content = file.read()
```

### Using Wrong Mode

```python
# Oops - "w" deletes existing content!
with open("important_data.txt", "w") as file:
    file.write("New data")  # Old data is gone!

# Use "a" to append, or "x" to safely create new
```

### Forgetting Encoding

```python
# May fail with special characters
with open("data.txt", "r") as file:  # Missing encoding
    content = file.read()

# Always specify
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
```

---

## Key Takeaways

- Always use `with open(...) as file:` to ensure files close properly
- Specify encoding explicitly: `encoding="utf-8"`
- Mode `"r"` reads (file must exist)
- Mode `"w"` writes (overwrites existing!)
- Mode `"a"` appends (adds to end)
- Mode `"x"` creates (fails if exists)
- Use `"rb"`, `"wb"` for binary files (images, etc.)
- Python handles line ending differences automatically in text mode
- Use `newline=""` for CSV files

