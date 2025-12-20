## CSV Files (Comma-Separated Values)

**CSV** is one of the most common formats for tabular data - data organized in rows and columns like a spreadsheet. Each line is a row, and values are separated by commas. Python's built-in `csv` module handles the complexities that make manual parsing error-prone.

---

## What Is CSV?

A CSV file looks like this:

```
name,age,city
Alice,30,NYC
Bob,25,LA
Charlie,35,Chicago
```

Each row has the same fields, separated by commas. The first row is often a header with column names.

### Why Not Just Use `.split(",")`?

Manual parsing seems simple:

```python
line = "Alice,30,NYC"
parts = line.split(",")  # ['Alice', '30', 'NYC']
```

But CSV has edge cases:
- Values containing commas: `"Smith, Jr.",45,Boston`
- Values containing quotes: `"He said ""hello""",30,NYC`
- Empty values: `Alice,,NYC`
- Values with newlines: `"Line 1\nLine 2",30,NYC`

The `csv` module handles all these correctly.

---

## Reading CSV Files

### Basic Reading with `csv.reader`

```python
import csv

with open("data.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)  # Each row is a list of strings
```

Example output:
```
['name', 'age', 'city']
['Alice', '30', 'NYC']
['Bob', '25', 'LA']
```

### The `newline=""` Parameter

Always use `newline=""` when opening CSV files. This tells Python not to translate newlines, which the `csv` module needs to handle correctly.

```python
# Correct
with open("data.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.reader(file)
```

### Skipping the Header

```python
import csv

with open("data.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.reader(file)
    header = next(reader)  # Skip header row
    for row in reader:
        name, age, city = row
        print(f"{name} is {age} years old")
```

### Converting Types

CSV values are always strings. Convert as needed:

```python
import csv

with open("scores.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.reader(file)
    next(reader)  # Skip header

    for row in reader:
        name = row[0]
        score = int(row[1])   # Convert to int
        average = float(row[2])  # Convert to float
        print(f"{name}: {score} (avg: {average})")
```

---

## Reading CSV with Headers: `DictReader`

`csv.DictReader` returns each row as a dictionary, using the header as keys:

```python
import csv

with open("data.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row)
```

Output:
```
{'name': 'Alice', 'age': '30', 'city': 'NYC'}
{'name': 'Bob', 'age': '25', 'city': 'LA'}
```

### Accessing by Column Name

```python
import csv

with open("data.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(f"{row['name']} lives in {row['city']}")
```

This is more readable than accessing by index, and the code won't break if columns are reordered.

---

## Writing CSV Files

### Basic Writing with `csv.writer`

```python
import csv

data = [
    ["name", "score"],
    ["Alice", 95],
    ["Bob", 87],
    ["Charlie", 92],
]

with open("scores.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    for row in data:
        writer.writerow(row)
```

Or write all rows at once:

```python
import csv

data = [
    ["name", "score"],
    ["Alice", 95],
    ["Bob", 87],
    ["Charlie", 92],
]

with open("scores.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(data)
```

### Writing Dictionaries: `DictWriter`

```python
import csv

data = [
    {"name": "Alice", "score": 95},
    {"name": "Bob", "score": 87},
    {"name": "Charlie", "score": 92},
]

with open("scores.csv", "w", encoding="utf-8", newline="") as file:
    fieldnames = ["name", "score"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)

    writer.writeheader()  # Write the header row
    writer.writerows(data)
```

---

## Custom Delimiters

CSV doesn't have to use commas. Tab-separated (TSV) is common:

```python
import csv

# Reading tab-separated
with open("data.tsv", "r", encoding="utf-8", newline="") as file:
    reader = csv.reader(file, delimiter="\t")
    for row in reader:
        print(row)

# Writing semicolon-separated
with open("data.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file, delimiter=";")
    writer.writerow(["name", "score"])
```

---

## Handling Quoting

The `csv` module automatically handles values with special characters:

```python
import csv

data = [
    ["name", "quote"],
    ["Alice", 'He said "Hello"'],
    ["Bob", "Value, with, commas"],
]

with open("quotes.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(data)
```

Result:
```
name,quote
Alice,"He said ""Hello"""
Bob,"Value, with, commas"
```

The module automatically adds quotes where needed and escapes internal quotes.

---

## Processing CSV Data

### Filter Rows

```python
import csv

with open("data.csv", "r", encoding="utf-8", newline="") as infile, \
     open("filtered.csv", "w", encoding="utf-8", newline="") as outfile:

    reader = csv.DictReader(infile)
    writer = csv.DictWriter(outfile, fieldnames=reader.fieldnames)

    writer.writeheader()
    for row in reader:
        if int(row["age"]) >= 30:
            writer.writerow(row)
```

### Add a Column

```python
import csv

with open("input.csv", "r", encoding="utf-8", newline="") as infile:
    reader = csv.DictReader(infile)
    rows = list(reader)
    fieldnames = reader.fieldnames + ["status"]

with open("output.csv", "w", encoding="utf-8", newline="") as outfile:
    writer = csv.DictWriter(outfile, fieldnames=fieldnames)
    writer.writeheader()

    for row in rows:
        row["status"] = "active" if int(row["age"]) < 65 else "retired"
        writer.writerow(row)
```

### Aggregate Data

```python
import csv

total = 0
count = 0

with open("scores.csv", "r", encoding="utf-8", newline="") as file:
    reader = csv.DictReader(file)
    for row in reader:
        total += int(row["score"])
        count += 1

average = total / count if count > 0 else 0
print(f"Average score: {average:.1f}")
```

---

## Loading CSV into Memory

For small files, load everything into a list:

```python
import csv

def load_csv(filename):
    with open(filename, "r", encoding="utf-8", newline="") as file:
        reader = csv.DictReader(file)
        return list(reader)

data = load_csv("data.csv")
print(f"Loaded {len(data)} rows")

# Now you can process data multiple times
for row in data:
    print(row)
```

---

## Common Mistakes

### Forgetting `newline=""`

```python
# Bug on Windows - may create extra blank lines
with open("data.csv", "w", encoding="utf-8") as file:  # Missing newline=""
    writer = csv.writer(file)
    writer.writerows(data)

# Correct
with open("data.csv", "w", encoding="utf-8", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(data)
```

### Forgetting to Convert Types

```python
# Bug - comparing strings, not numbers
for row in reader:
    if row["age"] > 30:  # "25" > "3" is True!
        print(row)

# Fix - convert to int
for row in reader:
    if int(row["age"]) > 30:
        print(row)
```

---

## Key Takeaways

- CSV is for tabular data with rows and columns
- Use Python's `csv` module - don't parse manually with `.split(",")`
- Always use `newline=""` when opening CSV files
- `csv.reader` returns rows as lists; `csv.DictReader` returns dictionaries
- `csv.writer` writes lists; `csv.DictWriter` writes dictionaries
- The module handles quoting and special characters automatically
- All values are strings - convert to int/float as needed
- Use `delimiter` parameter for non-comma separators

