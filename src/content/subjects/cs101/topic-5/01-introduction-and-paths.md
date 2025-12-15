## File I/O: Persisting Data

When your program ends, variables disappear. File Input/Output (I/O) lets you:

- Load data from a file (configuration, datasets, saved progress)
- Save results for later (reports, logs, exported data)

To work with files confidently, you need two key ideas:

1. **Paths**: where is the file?
2. **File handling**: how do we open/read/write safely?

---

## Paths: Relative vs Absolute

- **Absolute path**: starts at the root of the file system (or drive), e.g. `/home/user/data.txt`
- **Relative path**: relative to your current working directory, e.g. `data.txt` or `data/data.txt`

If your program “can’t find” a file, it’s often because you’re not in the directory you think you are.

---

## `pathlib` (Modern Path Handling)

`pathlib.Path` makes working with paths easier than string concatenation.

```python
from pathlib import Path

data_dir = Path("data")
file_path = data_dir / "scores.txt"

print(file_path)         # data/scores.txt
print(file_path.exists())  # True/False
```

`pathlib` works across operating systems (Windows/macOS/Linux).

