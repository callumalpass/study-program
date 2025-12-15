## `while` Loops (Repeat Until Something Changes)

`while` loops repeat as long as a condition stays `True`.

```python
count = 0
while count < 3:
    print(count)
    count += 1
```

---

## Avoiding Infinite Loops

Every `while` loop needs a clear way to stop. A common mistake is forgetting to update the variables used in the condition:

```python
# Bug: count never changes → infinite loop
count = 0
while count < 3:
    print(count)
```

Fix it by changing `count` inside the loop:

```python
count = 0
while count < 3:
    print(count)
    count += 1
```

---

## Sentinel Loops (Keep Going Until “Quit”)

A sentinel value is a special value that ends the loop.

```python
while True:
    command = input("Enter command (or 'quit'): ").strip().lower()
    if command == "quit":
        break
    print(f"Running: {command}")
```

This is one of the most common “real program” loop patterns.

---

## Input Validation Loops

Instead of rejecting invalid input once, you can keep asking:

```python
while True:
    text = input("Enter an integer: ").strip()
    if text.isdigit():
        number = int(text)
        break
    print("Try again: please enter digits only.")
```

---

## `break` and `continue`

`break` exits the loop immediately:

```python
while True:
    n = int(input("Enter a positive number: "))
    if n > 0:
        break
```

`continue` skips to the next iteration:

```python
for n in range(6):
    if n % 2 == 0:
        continue
    print(n)  # prints odd numbers only
```

---

## Loop `else` (Runs Only If No `break`)

Python loops can have an `else`. It runs only if the loop ends normally:

```python
numbers = [2, 4, 6, 9, 10]

for n in numbers:
    if n % 2 == 1:
        print("Found odd:", n)
        break
else:
    print("No odd numbers found")
```

This is most useful for “search” loops.

