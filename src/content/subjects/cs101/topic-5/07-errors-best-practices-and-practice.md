## Handling File Errors

File work often fails due to missing files, permissions, or invalid formats.

```python
try:
    with open("missing.txt", "r", encoding="utf-8") as file:
        content = file.read()
except FileNotFoundError:
    print("File not found")
```

---

## Best Practices

1. Always use `with open(...)` so files close reliably.
2. Use `encoding="utf-8"` for text.
3. Use `pathlib.Path` for paths.
4. Prefer `csv` / `json` modules for structured data.
5. Handle exceptions at the right level (don’t hide bugs).

---

## Practice Exercises

1. Read a text file and count the number of lines and words.
2. Read `scores.csv` (name,score) and compute the average score.
3. Write a program that appends a timestamped line to `log.txt`.
4. Store a list of tasks in `tasks.json` (load, add, save).
5. Write a “copy file” program that reads one file and writes its contents to another.

