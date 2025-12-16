## Useful Loop Patterns (The Ones You'll Reuse Everywhere)

Once you know `for` and `while`, the next step is learning **patterns** - repeatable ways to solve common tasks. These patterns appear so frequently that recognizing them instantly makes programming much easier.

---

## Accumulator Pattern (Sum, Count, Build)

The accumulator pattern involves:
1. Initialize a variable before the loop
2. Update it inside the loop
3. Use the result after the loop

### Summing

```python
numbers = [3, 1, 4, 1, 5, 9]

# Manual accumulator
total = 0
for n in numbers:
    total += n
print(total)  # 23

# Python built-in (preferred when applicable)
print(sum(numbers))  # 23
```

### Counting

```python
words = ["apple", "a", "banana", "hi", "I"]

# Count short words (length <= 2)
short_count = 0
for word in words:
    if len(word) <= 2:
        short_count += 1
print(short_count)  # 3

# Alternative with sum() and generator expression
short_count = sum(1 for word in words if len(word) <= 2)
```

### Counting with a Dictionary

```python
text = "hello world"

# Count character frequencies
char_counts = {}
for char in text:
    if char in char_counts:
        char_counts[char] += 1
    else:
        char_counts[char] = 1
print(char_counts)  # {'h': 1, 'e': 1, 'l': 3, 'o': 2, ...}

# Cleaner with dict.get()
char_counts = {}
for char in text:
    char_counts[char] = char_counts.get(char, 0) + 1

# Even cleaner with collections.Counter
from collections import Counter
char_counts = Counter(text)
```

### Building a New List

```python
numbers = [1, 2, 3, 4, 5]

# Build list of squares
squares = []
for n in numbers:
    squares.append(n * n)
print(squares)  # [1, 4, 9, 16, 25]

# Later you'll learn list comprehensions - even cleaner:
squares = [n * n for n in numbers]
```

### Building a String

```python
words = ["Hello", "World", "Python"]

# Build a sentence
result = ""
for word in words:
    result += word + " "
result = result.strip()
print(result)  # "Hello World Python"

# Better: use join() (more efficient)
result = " ".join(words)
```

---

## Search Pattern (Find First / Find All)

### Find First Match

Stop as soon as you find what you're looking for:

```python
numbers = [10, 13, 15, 20, 25]

# Find first multiple of 5
first_multiple_of_5 = None
for n in numbers:
    if n % 5 == 0:
        first_multiple_of_5 = n
        break

if first_multiple_of_5 is not None:
    print(f"Found: {first_multiple_of_5}")  # Found: 10
else:
    print("No multiple of 5 found")
```

### Find First with `else` Clause

```python
numbers = [11, 13, 17, 19]

for n in numbers:
    if n % 5 == 0:
        print(f"Found: {n}")
        break
else:
    print("No multiple of 5 found")  # This runs
```

### Find All Matches

Collect all matching items:

```python
numbers = [10, 13, 15, 20, 25]

# Find all multiples of 5
multiples_of_5 = []
for n in numbers:
    if n % 5 == 0:
        multiples_of_5.append(n)
print(multiples_of_5)  # [10, 15, 20, 25]

# Later: list comprehension
multiples_of_5 = [n for n in numbers if n % 5 == 0]
```

### Find Index

```python
names = ["Alice", "Bob", "Charlie", "Diana"]

# Find index of first match
target = "Charlie"
found_index = -1
for i, name in enumerate(names):
    if name == target:
        found_index = i
        break

# Or use the built-in (raises error if not found)
found_index = names.index("Charlie")  # 2
```

---

## Filter Pattern (Keep Matching Items)

Filter creates a new collection with only items that pass a test:

```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Keep only even numbers
evens = []
for n in numbers:
    if n % 2 == 0:
        evens.append(n)
print(evens)  # [2, 4, 6, 8, 10]

# Later: list comprehension
evens = [n for n in numbers if n % 2 == 0]

# Or built-in filter()
evens = list(filter(lambda n: n % 2 == 0, numbers))
```

---

## Transform Pattern (Map)

Transform each item into something new:

```python
names = ["alice", "bob", "charlie"]

# Capitalize each name
capitalized = []
for name in names:
    capitalized.append(name.capitalize())
print(capitalized)  # ["Alice", "Bob", "Charlie"]

# Later: list comprehension
capitalized = [name.capitalize() for name in names]

# Or built-in map()
capitalized = list(map(str.capitalize, names))
```

---

## Menu Loop Pattern (Simple Text UI)

This combines loops and conditionals into a complete interactive program:

```python
balance = 0

while True:
    print("\n--- Bank Menu ---")
    print("1) Deposit")
    print("2) Withdraw")
    print("3) Check Balance")
    print("4) Quit")

    choice = input("Choose an option: ").strip()

    if choice == "1":
        amount = int(input("Deposit amount: "))
        if amount > 0:
            balance += amount
            print(f"Deposited ${amount}")
        else:
            print("Amount must be positive")

    elif choice == "2":
        amount = int(input("Withdraw amount: "))
        if amount > balance:
            print("Insufficient funds")
        elif amount <= 0:
            print("Amount must be positive")
        else:
            balance -= amount
            print(f"Withdrew ${amount}")

    elif choice == "3":
        print(f"Current balance: ${balance}")

    elif choice == "4":
        print("Goodbye!")
        break

    else:
        print("Invalid choice. Please try again.")
```

---

## State Tracking Pattern (Remember What Happened)

Track information as you iterate:

### Finding Maximum/Minimum

```python
temperatures = [18, 22, 19, 25, 21, 17]

# Find maximum
max_temp = temperatures[0]  # Initialize with first element
for temp in temperatures[1:]:  # Start from second element
    if temp > max_temp:
        max_temp = temp
print(f"Max: {max_temp}")  # Max: 25

# Built-in functions (preferred)
print(max(temperatures))  # 25
print(min(temperatures))  # 17
```

### Finding Maximum with Index

```python
scores = [85, 92, 78, 95, 88]

max_score = scores[0]
max_index = 0

for i, score in enumerate(scores):
    if score > max_score:
        max_score = score
        max_index = i

print(f"Best score: {max_score} at index {max_index}")  # 95 at index 3
```

### Tracking Previous Value

```python
numbers = [1, 3, 2, 5, 4, 6]

# Count how many times a number is greater than the previous
increases = 0
previous = numbers[0]

for current in numbers[1:]:
    if current > previous:
        increases += 1
    previous = current

print(f"Increased {increases} times")  # 4
```

### Running Total (Cumulative Sum)

```python
numbers = [1, 2, 3, 4, 5]

running_total = []
total = 0
for n in numbers:
    total += n
    running_total.append(total)

print(running_total)  # [1, 3, 6, 10, 15]
```

---

## Key Takeaways

- **Accumulator**: Initialize before loop, update inside, use after
- **Search**: Find first match (with `break`) or collect all matches
- **Filter**: Keep only items that pass a condition
- **Transform**: Convert each item to something new
- **Menu Loop**: `while True` with `break` for exit
- **State Tracking**: Remember previous values or running totals

These patterns become second nature with practice. Later, you'll learn Python shortcuts (list comprehensions, built-in functions) that make many of these even shorter, but understanding the loop form first is essential.
