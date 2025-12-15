## Parameters in Depth

Python gives you several ways to define and pass parameters. Knowing these lets you write clean APIs and call functions clearly.

---

## Positional Arguments

Arguments are matched to parameters by position:

```python
def add(a, b):
    return a + b

add(3, 5)  # a=3, b=5
```

---

## Keyword Arguments

Arguments can also be passed by name (order doesn’t matter then):

```python
def describe_pet(animal, name, age):
    return f"{name} is a {age}-year-old {animal}"

describe_pet(animal="dog", name="Rex", age=5)
describe_pet("dog", age=5, name="Rex")  # positional must come first
```

Keyword arguments:
- improve readability
- make it harder to accidentally swap values

---

## Default Values

Default values make parameters optional:

```python
def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

greet("Alice")
greet("Bob", greeting="Good morning")
```

### The Mutable Default Trap

Never use a mutable object (like a list or dict) as a default:

```python
# Bug: same list reused across calls
def add_item(item, items=[]):
    items.append(item)
    return items
```

Correct pattern:

```python
def add_item(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
```

---

## `*args` (Any Number of Positional Arguments)

```python
def average(*numbers):
    return sum(numbers) / len(numbers)

average(10, 20, 30)  # 20.0
```

Inside the function, `numbers` is a tuple.

---

## `**kwargs` (Any Number of Keyword Arguments)

```python
def print_profile(**info):
    for key, value in info.items():
        print(f"{key}: {value}")

print_profile(name="Alice", city="NYC", enrolled=True)
```

Inside the function, `info` is a dictionary.

---

## Unpacking Arguments

You can unpack a list/tuple into positional arguments:

```python
values = (3, 5)
add(*values)  # same as add(3, 5)
```

And unpack a dict into keyword arguments:

```python
data = {"animal": "dog", "name": "Rex", "age": 5}
describe_pet(**data)
```

