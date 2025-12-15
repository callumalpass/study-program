## CSV Files (Comma-Separated Values)

CSV is a common format for tabular data (spreadsheets). Python’s `csv` module handles quoting and edge cases better than manual `split(",")`.

---

## Reading CSV

```python
import csv

with open("scores.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)  # list of strings
```

### Reading CSV With Headers

```python
import csv

with open("scores.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row["name"], int(row["score"]))
```

---

## Writing CSV

```python
import csv

rows = [
    ["name", "score"],
    ["Alice", 10],
    ["Bob", 7],
]

with open("scores.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(rows)
```

`newline=""` avoids blank lines on some platforms.

