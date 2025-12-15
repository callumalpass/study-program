## Reading Files

There are multiple ways to read, depending on file size and what you need.

---

## Read the Entire File

Good for small files:

```python
with open("data.txt", "r", encoding="utf-8") as file:
    content = file.read()
```

---

## Read All Lines

This returns a list of strings (each line includes `\n`):

```python
with open("data.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()

for line in lines:
    print(line.strip())
```

---

## Stream Line-by-Line (Best for Large Files)

```python
with open("data.txt", "r", encoding="utf-8") as file:
    for line in file:
        line = line.strip()
        if not line:
            continue
        print(line)
```

This is memory-efficient because it doesn’t load the entire file at once.

---

## Parsing Simple Structured Text

Example: a file containing `name,score`:

```python
results = []
with open("scores.txt", "r", encoding="utf-8") as file:
    for line in file:
        name, score_text = line.strip().split(",")
        results.append((name, int(score_text)))
```

In real projects, prefer CSV/JSON for structured data, but it’s useful to understand what they do under the hood.

