## Return Values

`return` sends a value back to the caller.

```python
def add(a, b):
    return a + b

result = add(3, 5)
```

---

## Returning `None`

If a function doesn’t explicitly return a value, it returns `None`:

```python
def say_hi(name):
    print(f"Hi, {name}!")

value = say_hi("Alice")
print(value)  # None
```

This is why mixing “printing” and “returning” can be confusing.

---

## Multiple Return Values (Tuple Packing/Unpacking)

Python can “return multiple values” by returning a tuple:

```python
def min_max(numbers):
    return min(numbers), max(numbers)

low, high = min_max([3, 1, 4])
```

---

## Early Returns (Guard Clauses)

Guard clauses reduce nesting and make logic clearer:

```python
def withdraw(balance, amount):
    if amount <= 0:
        return "Amount must be positive"
    if amount > balance:
        return "Insufficient funds"
    return balance - amount
```

---

## Pure Functions vs Side Effects

A **pure function** depends only on its inputs and returns an output (no printing, no file writes):

```python
def c_to_f(c):
    return (c * 9/5) + 32
```

Functions with **side effects** interact with the outside world (printing, reading input, writing files):

```python
def prompt_age():
    return int(input("Age: "))
```

Both are useful, but pure functions are easier to test and reuse.

