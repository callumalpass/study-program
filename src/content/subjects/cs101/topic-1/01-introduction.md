## Introduction

Welcome to your first step in learning Python programming! In this topic, you'll learn how computers store and manipulate information through variables and data types. By the end, you'll be able to create variables, understand Python's core data types, and convert between them confidently.

**Learning Objectives:**
- Create and name variables following Python conventions
- Identify and use the four basic data types: int, float, str, and bool
- Convert between data types using type casting
- Use the type() function to inspect variable types
- Understand how Python handles dynamic typing

---

## What Are Variables?

Variables are named containers that store data in your program's memory. Think of them as labeled boxes where you can put information and retrieve it later using the label (the variable name).

```python
# Creating variables is simple - just use the assignment operator (=)
age = 25
name = "Alice"
temperature = 98.6
is_student = True
```

Unlike some programming languages, Python doesn't require you to declare a variable's type before using it. Python figures out the type automatically based on the value you assign - this is called **dynamic typing**.

### How Assignment Works

When you write `age = 25`, Python:
1. Creates an integer object with value `25` in memory
2. Creates a variable name `age` that points to that object
3. Any time you use `age`, Python looks up what it points to

```python
# Variables can be reassigned to new values
count = 10
print(count)  # Output: 10

count = 20
print(count)  # Output: 20

# They can even change type (dynamic typing)
value = 42        # value is an int
value = "hello"   # now value is a string - Python allows this!
```

### Variables vs. Values

It's important to understand that variables are **references** to values, not the values themselves:

```python
a = 5
b = a      # b now points to the same value as a
print(b)   # Output: 5

a = 10     # a now points to a new value
print(b)   # Output: 5 (b still points to the original value)
```

---

## Key Takeaways

- Variables store data using the assignment operator (`=`)
- Python uses **dynamic typing** - types are determined automatically
- Variable names are references to values in memory
- You can reassign variables to new values (and even new types)
