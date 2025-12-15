## Defining and Calling Functions

Define a function with `def` and then call it by using parentheses.

```python
def say_hello():
    print("Hello!")

say_hello()
```

---

## Parameters vs Arguments

- **Parameter**: the variable name in the function definition
- **Argument**: the value you pass when calling the function

```python
def greet(name):      # name is a parameter
    print("Hi", name)

greet("Alice")        # "Alice" is an argument
```

---

## Functions Should Usually Return Values

Printing is great for scripts, but returning is better for reusable functions:

```python
def area(width, height):
    return width * height

print(area(3, 4))  # caller prints if it wants
```

---

## The `pass` Placeholder

When sketching code, `pass` lets you define structure before details:

```python
def not_implemented_yet():
    pass
```

