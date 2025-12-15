## `if`, `elif`, `else` (Branching)

Conditionals let your program choose one path out of many.

```python
temperature = 75

if temperature > 85:
    print("Hot")
elif temperature > 65:
    print("Nice")
else:
    print("Cold")
```

Key ideas:
- Conditions are checked top-to-bottom.
- Only the first matching branch runs.
- `else` is optional and catches “everything else”.

---

## Nested Conditionals (And How to Avoid Them)

You *can* nest `if` statements:

```python
age = 20
has_ticket = True

if age >= 18:
    if has_ticket:
        print("Enter")
    else:
        print("Need a ticket")
else:
    print("Too young")
```

But deep nesting gets hard to read.

### Guard Clauses (Return Early)

Guard clauses reduce nesting by handling “bad cases” first:

```python
def enter_event(age, has_ticket):
    if age < 18:
        return "Too young"
    if not has_ticket:
        return "Need a ticket"
    return "Enter"
```

This pattern is common in real code: validate inputs early, return early, keep the “happy path” at the bottom.

---

## Conditional Expressions (Ternary)

When you need a small choice inside an expression, Python has a conditional expression:

```python
age = 17
label = "adult" if age >= 18 else "minor"
```

Use this only when it improves readability; long ternaries become confusing.

---

## Pattern: Input Validation

Many programs need to validate user input before continuing:

```python
text = input("Enter your age: ")
if not text.isdigit():
    print("Please enter digits only.")
else:
    age = int(text)
    if age < 0:
        print("Age cannot be negative.")
    else:
        print(f"Age accepted: {age}")
```

Later, you’ll usually combine this with a `while` loop to keep asking until valid.

---

## Using `match/case` (Python 3.10+)

If you have many `elif` branches based on a single value, Python’s `match/case` can be cleaner:

```python
command = "start"

match command:
    case "start":
        print("Starting...")
    case "stop":
        print("Stopping...")
    case _:
        print("Unknown command")
```

It’s not required for CS101, but it’s good to know it exists.

