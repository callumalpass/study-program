## `try` / `except` (Catching Exceptions)

`try` lets you attempt something risky, and `except` lets you handle specific errors.

```python
try:
    number = int(input("Enter a number: "))
    print(100 / number)
except ValueError:
    print("That wasn't a number.")
except ZeroDivisionError:
    print("Cannot divide by zero.")
```

---

## Catch Specific Exceptions

Avoid catching everything unless you have a very good reason:

```python
try:
    ...
except Exception as e:
    print("Something went wrong:", e)
```

Catching broad exceptions can hide real bugs and make debugging harder.

---

## Capturing the Exception Object

```python
try:
    int("hi")
except ValueError as e:
    print("Conversion failed:", e)
```

---

## `else` and `finally`

`else` runs only if no exception happened.
`finally` runs no matter what (success or failure).

```python
try:
    file = open("data.txt", "r", encoding="utf-8")
    content = file.read()
except FileNotFoundError:
    content = ""
else:
    print("Read ok")
finally:
    try:
        file.close()
    except NameError:
        pass
```

In real code, prefer `with open(...)` instead of manual close.

