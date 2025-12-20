---
id: cs101-t5-read
title: "Reading Patterns"
order: 3
---

## Reading Files

Once you've opened a file, you need to read its contents. Python provides several methods for reading, and choosing the right one depends on your file size and what you need to do with the data.

---

## Read the Entire File: `.read()`

The simplest approach reads the entire file into a single string:

```python
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()

print(content)
print(type(content))  # <class 'str'>
print(len(content))   # Total characters
```

### When to Use `.read()`

- **Small files** that fit comfortably in memory
- When you need the **entire content at once**
- Files under a few megabytes

### When NOT to Use

- Large files (hundreds of MB or more)
- When you only need certain lines
- When processing line by line

### Reading Partial Content

You can specify how many characters to read:

```python
with open("data.txt", "r", encoding="utf-8") as file:
    first_100 = file.read(100)  # Read first 100 characters
    next_50 = file.read(50)     # Read next 50 characters
```

Each call to `.read()` continues from where the last one stopped.

---

## Read All Lines: `.readlines()`

Returns a **list of strings**, one per line:

```python
with open("data.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()

print(lines)  # ['First line\n', 'Second line\n', 'Third line\n']
print(len(lines))  # Number of lines
```

**Note:** Each line includes the newline character `\n`.

### Processing Lines

```python
with open("data.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()

for line in lines:
    # strip() removes leading/trailing whitespace (including \n)
    clean_line = line.strip()
    print(f"Line: '{clean_line}'")
```

### When to Use `.readlines()`

- When you need random access to lines by index
- When you need to know the total line count before processing
- Small to medium files

---

## Stream Line-by-Line (Best for Large Files)

The most memory-efficient way is to iterate over the file object directly:

```python
with open("data.txt", "r", encoding="utf-8") as file:
    for line in file:
        line = line.strip()
        print(line)
```

This is a **streaming** approach:
- Only one line is in memory at a time
- Works with files of any size
- Cannot go backwards or access by index

### Why This Works

File objects are **iterators**. When you iterate over them, they yield one line at a time. This is Python's recommended way to process text files.

### Practical Example: Processing a Log File

```python
error_count = 0
with open("server.log", "r", encoding="utf-8") as file:
    for line in file:
        if "ERROR" in line:
            error_count += 1
            print(line.strip())

print(f"Total errors: {error_count}")
```

This can process gigabyte-sized log files without running out of memory.

---

## Read a Single Line: `.readline()`

Reads one line at a time:

```python
with open("data.txt", "r", encoding="utf-8") as file:
    first_line = file.readline()
    second_line = file.readline()
    third_line = file.readline()
```

Returns an empty string `""` at end of file:

```python
with open("data.txt", "r", encoding="utf-8") as file:
    while True:
        line = file.readline()
        if not line:  # Empty string means EOF
            break
        print(line.strip())
```

### When to Use `.readline()`

- Reading specific lines from the beginning
- Implementing custom parsing logic
- When you need explicit control over reading

---

## Comparison of Methods

| Method | Memory | Use Case |
|--------|--------|----------|
| `.read()` | Entire file in memory | Small files, need all at once |
| `.readlines()` | All lines in memory | Need random access to lines |
| `for line in file` | One line at a time | Large files, sequential processing |
| `.readline()` | One line at a time | Custom control over reading |

---

## Skipping Lines

### Skip the Header Line

```python
with open("data.csv", "r", encoding="utf-8") as file:
    header = file.readline()  # Read and discard header
    for line in file:         # Process remaining lines
        print(line.strip())
```

### Skip Empty Lines

```python
with open("data.txt", "r", encoding="utf-8") as file:
    for line in file:
        line = line.strip()
        if not line:  # Skip empty lines
            continue
        print(line)
```

### Skip Comment Lines

```python
with open("config.txt", "r", encoding="utf-8") as file:
    for line in file:
        line = line.strip()
        if line.startswith("#"):  # Skip comments
            continue
        if not line:  # Skip empty lines
            continue
        print(line)
```

---

## Parsing Simple Structured Text

Many text files have a consistent structure you can parse:

### Comma-Separated Values (Manual Parsing)

```python
# File: scores.txt
# Alice,85
# Bob,92
# Charlie,78

results = []
with open("scores.txt", "r", encoding="utf-8") as file:
    for line in file:
        line = line.strip()
        if not line:
            continue
        name, score_text = line.split(",")
        results.append({"name": name, "score": int(score_text)})

print(results)
# [{'name': 'Alice', 'score': 85}, ...]
```

### Key-Value Pairs

```python
# File: config.txt
# host=localhost
# port=8080
# debug=true

config = {}
with open("config.txt", "r", encoding="utf-8") as file:
    for line in file:
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        key, value = line.split("=", 1)  # Split at first = only
        config[key.strip()] = value.strip()

print(config)
# {'host': 'localhost', 'port': '8080', 'debug': 'true'}
```

### Fixed-Width Fields

```python
# File: data.txt
# Alice     85  A
# Bob       92  A
# Charlie   78  B

results = []
with open("data.txt", "r", encoding="utf-8") as file:
    for line in file:
        name = line[0:10].strip()
        score = int(line[10:14].strip())
        grade = line[14:16].strip()
        results.append({"name": name, "score": score, "grade": grade})
```

**Note:** For real-world structured data, prefer the `csv` and `json` modules covered in later subtopics.

---

## Reading with Error Handling

Files can have problems: missing lines, wrong format, encoding issues:

```python
results = []
errors = []

with open("data.txt", "r", encoding="utf-8") as file:
    for line_num, line in enumerate(file, start=1):
        line = line.strip()
        if not line:
            continue

        try:
            name, score_text = line.split(",")
            score = int(score_text)
            results.append({"name": name, "score": score})
        except ValueError as e:
            errors.append(f"Line {line_num}: {e} - '{line}'")

if errors:
    print("Errors encountered:")
    for error in errors:
        print(f"  {error}")

print(f"Successfully parsed: {len(results)} records")
```

---

## Checking File Content

### Count Lines, Words, Characters

```python
with open("document.txt", "r", encoding="utf-8") as file:
    content = file.read()

lines = content.splitlines()
words = content.split()
chars = len(content)

print(f"Lines: {len(lines)}")
print(f"Words: {len(words)}")
print(f"Characters: {chars}")
```

### Find Lines Containing Text

```python
with open("log.txt", "r", encoding="utf-8") as file:
    matches = [line.strip() for line in file if "ERROR" in line]

print(f"Found {len(matches)} error lines")
for match in matches:
    print(match)
```

---

## Reading Binary Files

For non-text files, use binary mode:

```python
# Read image file
with open("image.png", "rb") as file:
    data = file.read()

print(type(data))  # <class 'bytes'>
print(len(data))   # File size in bytes
print(data[:10])   # First 10 bytes
```

---

## Key Takeaways

- `.read()` loads entire file into one string - use for small files
- `.readlines()` returns a list of lines - use when you need random access
- `for line in file` streams line-by-line - best for large files
- `.readline()` reads one line - for custom reading control
- Lines include `\n` - use `.strip()` to remove whitespace
- Skip empty lines with `if not line: continue`
- Use `enumerate(file, start=1)` for line numbers during error reporting
- For real structured data, prefer `csv` and `json` modules
- Use binary mode (`"rb"`) for non-text files

