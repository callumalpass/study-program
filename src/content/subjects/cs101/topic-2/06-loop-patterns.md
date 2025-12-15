## Useful Loop Patterns (The Ones You’ll Reuse Everywhere)

Once you know `for` and `while`, the next step is learning *patterns*—repeatable ways to solve common tasks.

---

## Accumulators (Sum, Count, Build)

### Summing

```python
numbers = [3, 1, 4]
total = 0
for n in numbers:
    total += n
```

### Counting

```python
words = ["apple", "a", "banana", "hi"]
short_count = 0
for w in words:
    if len(w) <= 2:
        short_count += 1
```

### Building a New List

```python
squares = []
for i in range(5):
    squares.append(i * i)
```

These patterns become even shorter later using list comprehensions, but understanding the loop form first is important.

---

## Searching (Find First / Find All)

### Find First Match

```python
numbers = [10, 13, 15, 20]
first_multiple_of_5 = None

for n in numbers:
    if n % 5 == 0:
        first_multiple_of_5 = n
        break
```

### Find All Matches

```python
numbers = [10, 13, 15, 20]
multiples_of_5 = []

for n in numbers:
    if n % 5 == 0:
        multiples_of_5.append(n)
```

---

## Menu Loops (Simple Text UI)

```python
balance = 0

while True:
    print("1) Deposit")
    print("2) Withdraw")
    print("3) Quit")
    choice = input("Choose: ").strip()

    if choice == "1":
        amount = int(input("Amount: "))
        balance += amount
    elif choice == "2":
        amount = int(input("Amount: "))
        if amount > balance:
            print("Insufficient funds")
        else:
            balance -= amount
    elif choice == "3":
        break
    else:
        print("Invalid choice")

print("Final balance:", balance)
```

This combines branching, loops, and input validation into a real program structure.

---

## State Tracking (Remembering What Happened So Far)

Loops often need to track state:

```python
temperatures = [18, 20, 19, 22, 21]
max_temp = temperatures[0]

for t in temperatures:
    if t > max_temp:
        max_temp = t

print("Max:", max_temp)
```

This is a general pattern: pick an initial “best” value, then improve it as you iterate.

