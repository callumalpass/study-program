---
id: cs101-t3-params
title: "Parameters, *args, **kwargs"
order: 3
---

## Parameters in Depth

Python offers flexible ways to define function parameters and pass arguments. Understanding these options lets you write cleaner APIs and call functions more clearly. This subtopic covers positional arguments, keyword arguments, default values, and the special `*args` and `**kwargs` syntax.

---

## Positional Arguments

The simplest way to pass arguments is by position. Arguments are matched to parameters in order:

```python
def describe_pet(animal, name, age):
    return f"{name} is a {age}-year-old {animal}"

# Arguments matched by position
describe_pet("dog", "Rex", 5)    # animal="dog", name="Rex", age=5
describe_pet("cat", "Whiskers", 3)  # animal="cat", name="Whiskers", age=3
```

Position matters! Swapping arguments changes the meaning:

```python
describe_pet("Rex", "dog", 5)  # animal="Rex", name="dog", age=5
# Output: "dog is a 5-year-old Rex" - wrong!
```

### When Positional Arguments Work Well

Positional arguments are best when:
- The order is natural and obvious (like `min(a, b)` or `range(start, stop)`)
- There are few parameters (1-3)
- The purpose of each argument is clear from context

---

## Keyword Arguments

You can also pass arguments by name. This is called using **keyword arguments**:

```python
def describe_pet(animal, name, age):
    return f"{name} is a {age}-year-old {animal}"

# Same result, but clearer at the call site
describe_pet(animal="dog", name="Rex", age=5)
describe_pet(name="Rex", animal="dog", age=5)  # Order doesn't matter
describe_pet(age=5, name="Rex", animal="dog")  # Any order works
```

### Mixing Positional and Keyword Arguments

You can mix both styles, but positional arguments must come first:

```python
describe_pet("dog", name="Rex", age=5)     # OK
describe_pet("dog", "Rex", age=5)          # OK
describe_pet(animal="dog", "Rex", 5)       # SyntaxError!
```

### Why Use Keyword Arguments?

Keyword arguments provide several benefits:

**Clarity**: The meaning is explicit at the call site:

```python
# What does False mean here?
send_email(message, recipient, False, True)

# Much clearer
send_email(message, recipient, html=False, urgent=True)
```

**Safety**: Harder to accidentally swap values:

```python
# Easy to mix up width and height
create_rectangle(100, 50)

# Impossible to confuse
create_rectangle(width=100, height=50)
```

**Self-Documentation**: Code reads like documentation.

---

## Default Values

Default values make parameters optional. If the caller doesn't provide a value, the default is used:

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

greet("Alice")                    # "Hello, Alice!"
greet("Bob", "Good morning")      # "Good morning, Bob!"
greet("Charlie", greeting="Hi")   # "Hi, Charlie!"
```

### Rules for Default Values

1. Parameters with defaults must come after parameters without defaults:

```python
def greet(greeting="Hello", name):  # SyntaxError!
    pass

def greet(name, greeting="Hello"):  # Correct
    pass
```

2. You can have multiple parameters with defaults:

```python
def format_price(amount, currency="$", decimals=2):
    return f"{currency}{amount:.{decimals}f}"

format_price(19.99)                    # "$19.99"
format_price(19.99, "€")               # "€19.99"
format_price(19.99, decimals=0)        # "$20"
format_price(19.99, "£", 1)            # "£20.0"
```

### The Mutable Default Trap

**Never use a mutable object (list, dict, set) as a default value.** This is one of Python's most common gotchas:

```python
# BUG: Same list is reused across all calls!
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item("apple"))   # ['apple']
print(add_item("banana"))  # ['apple', 'banana'] - NOT ['banana']!
print(add_item("cherry"))  # ['apple', 'banana', 'cherry']
```

The default list is created once when the function is defined, not each time it's called. All calls share the same list.

**The correct pattern:**

```python
def add_item(item, items=None):
    if items is None:
        items = []  # Create a new list each call
    items.append(item)
    return items

print(add_item("apple"))   # ['apple']
print(add_item("banana"))  # ['banana'] - correct!
```

This applies to any mutable type:

```python
# Bad
def update_config(setting, config={}):
    config[setting] = True
    return config

# Good
def update_config(setting, config=None):
    if config is None:
        config = {}
    config[setting] = True
    return config
```

---

## `*args`: Variable Positional Arguments

Sometimes you want a function to accept any number of arguments. Use `*args` to collect extra positional arguments into a tuple:

```python
def sum_all(*numbers):
    total = 0
    for n in numbers:
        total += n
    return total

sum_all(1, 2)           # 3
sum_all(1, 2, 3, 4, 5)  # 15
sum_all()               # 0
```

Inside the function, `numbers` is a tuple containing all the arguments.

### Combining `*args` with Regular Parameters

```python
def greet_all(greeting, *names):
    for name in names:
        print(f"{greeting}, {name}!")

greet_all("Hello", "Alice", "Bob", "Charlie")
# Hello, Alice!
# Hello, Bob!
# Hello, Charlie!
```

The regular parameter (`greeting`) is filled first, then the rest go into `*args`.

### Real-World Example

```python
def average(*values):
    if len(values) == 0:
        return 0
    return sum(values) / len(values)

print(average(85, 90, 78))      # 84.33...
print(average(100, 95, 92, 88)) # 93.75
```

---

## `**kwargs`: Variable Keyword Arguments

Use `**kwargs` to accept any number of keyword arguments. They're collected into a dictionary:

```python
def print_profile(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

print_profile(name="Alice", age=25, city="NYC")
# name: Alice
# age: 25
# city: NYC

print_profile(title="Engineer", company="Tech Corp", years=5)
# title: Engineer
# company: Tech Corp
# years: 5
```

### Combining Regular Parameters with `**kwargs`

```python
def create_user(username, password, **extra):
    user = {
        "username": username,
        "password": password,
    }
    user.update(extra)
    return user

user = create_user("alice", "secret123", email="alice@example.com", role="admin")
# {'username': 'alice', 'password': 'secret123', 'email': 'alice@example.com', 'role': 'admin'}
```

---

## The Full Parameter Order

When combining all types, they must appear in this order:

1. Regular positional parameters
2. `*args`
3. Keyword-only parameters (after `*args`)
4. `**kwargs`

```python
def complex_function(a, b, *args, option=True, **kwargs):
    print(f"a={a}, b={b}")
    print(f"args={args}")
    print(f"option={option}")
    print(f"kwargs={kwargs}")

complex_function(1, 2, 3, 4, 5, option=False, extra="data", more="stuff")
# a=1, b=2
# args=(3, 4, 5)
# option=False
# kwargs={'extra': 'data', 'more': 'stuff'}
```

---

## Unpacking Arguments

You can also go the other direction - unpack a list or dict into function arguments.

### Unpacking Lists/Tuples with `*`

```python
def add(a, b, c):
    return a + b + c

values = [1, 2, 3]
add(*values)  # Same as add(1, 2, 3)

coordinates = (10, 20, 30)
add(*coordinates)  # Same as add(10, 20, 30)
```

### Unpacking Dicts with `**`

```python
def describe_pet(animal, name, age):
    return f"{name} is a {age}-year-old {animal}"

pet_info = {"animal": "dog", "name": "Rex", "age": 5}
describe_pet(**pet_info)  # Same as describe_pet(animal="dog", name="Rex", age=5)
```

### Practical Use Case

```python
# Config dict to function arguments
config = {
    "host": "localhost",
    "port": 8080,
    "debug": True,
}

def start_server(host, port, debug=False):
    print(f"Starting server on {host}:{port}, debug={debug}")

start_server(**config)
```

---

## Keyword-Only Arguments

Parameters after `*` or `*args` can only be passed as keyword arguments:

```python
def safe_divide(a, b, *, return_float=True):
    result = a / b
    if return_float:
        return float(result)
    return int(result)

safe_divide(10, 3, return_float=True)   # OK
safe_divide(10, 3, True)                 # TypeError! Must use keyword
```

This forces callers to be explicit, improving code clarity.

---

## Key Takeaways

- Positional arguments are matched by order; keyword arguments by name
- Default values make parameters optional (put them last)
- **Never use mutable defaults** (lists, dicts) - use `None` and create inside
- `*args` collects extra positional arguments into a tuple
- `**kwargs` collects extra keyword arguments into a dict
- `*` unpacks sequences; `**` unpacks dictionaries
- Parameters after `*` are keyword-only
- Order: regular → `*args` → keyword-only → `**kwargs`

