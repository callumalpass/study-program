## Opening Files Safely (Use `with`)

Always prefer the context manager form:

```python
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
```

When the `with` block ends, the file is automatically closed (even if an error happens).

---

## File Modes (Read/Write/Append)

Common modes:

- `"r"`: read (file must exist)
- `"w"`: write (overwrite or create)
- `"a"`: append (create if missing)
- `"x"`: create only (fail if exists)
- `"r+"`: read/write

Binary modes add `"b"` (e.g. `"rb"`, `"wb"`), but CS101 focuses mainly on text.

---

## Encoding and Newlines

Text files have an encoding; UTF-8 is the standard default:

```python
with open("notes.txt", "r", encoding="utf-8") as file:
    ...
```

When writing CSV on Windows, it’s common to use `newline=""` (explained in the CSV subtopic).

