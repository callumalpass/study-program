## Writing Files

Writing is similar to reading, but you must choose the correct mode and be careful not to overwrite accidentally.

---

## Overwrite With `"w"`

```python
with open("output.txt", "w", encoding="utf-8") as file:
    file.write("Hello\n")
    file.write("Second line\n")
```

If `output.txt` already exists, it will be replaced.

---

## Append With `"a"`

```python
with open("log.txt", "a", encoding="utf-8") as file:
    file.write("New entry\n")
```

This is great for logs or continually adding results.

---

## Writing Lists of Lines

```python
lines = ["one\n", "two\n", "three\n"]
with open("lines.txt", "w", encoding="utf-8") as file:
    file.writelines(lines)
```

`writelines()` does not add newlines automatically—you include them yourself.

