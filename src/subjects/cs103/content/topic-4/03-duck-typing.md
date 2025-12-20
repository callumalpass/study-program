---
id: cs103-t4-duck-typing
title: "Duck Typing"
order: 3
---

## Duck Typing

Python doesn't require explicit interfaces or inheritance for polymorphism. If an object has the right methods, it works. This is called duck typing: "If it walks like a duck and quacks like a duck, then it must be a duck."

---

## The Essence of Duck Typing

You don't check what something *is*—you check what it can *do*:

```python
class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

class Robot:
    def speak(self):
        return "Beep boop!"

class Person:
    def speak(self):
        return "Hello!"

# No common parent class needed!
def make_it_speak(thing):
    print(thing.speak())

make_it_speak(Dog())     # Woof!
make_it_speak(Cat())     # Meow!
make_it_speak(Robot())   # Beep boop!
make_it_speak(Person())  # Hello!
```

---

## Contrast with Nominal Typing

In languages like Java, you need explicit interfaces:

```java
// Java - need explicit interface
interface Speakable {
    String speak();
}

class Dog implements Speakable { ... }
class Robot implements Speakable { ... }

void makeSpeak(Speakable thing) {
    System.out.println(thing.speak());
}
```

Python doesn't need this ceremony:

```python
# Python - just have the method
class Dog:
    def speak(self):
        return "Woof!"

class Robot:  # No interface declaration needed
    def speak(self):
        return "Beep!"

def make_speak(thing):
    print(thing.speak())  # Just call it
```

---

## Built-in Duck Typing

Python's built-in functions use duck typing:

```python
# len() works with anything that has __len__
class MyCollection:
    def __init__(self, items):
        self._items = items

    def __len__(self):
        return len(self._items)

coll = MyCollection([1, 2, 3, 4, 5])
print(len(coll))  # 5 - duck typing!

# iter() works with anything that has __iter__
class Countdown:
    def __init__(self, start):
        self.start = start

    def __iter__(self):
        return iter(range(self.start, 0, -1))

for num in Countdown(5):
    print(num)  # 5, 4, 3, 2, 1
```

---

## File-Like Objects

A classic example of duck typing:

```python
import io

def process_file(f):
    """Works with any file-like object."""
    for line in f:
        print(line.strip().upper())

# Real file
with open("data.txt") as f:
    process_file(f)

# String pretending to be a file
fake_file = io.StringIO("hello\nworld\n")
process_file(fake_file)

# Network response with file-like interface
import urllib.request
with urllib.request.urlopen("http://example.com") as response:
    process_file(response)
```

---

## EAFP: Easier to Ask Forgiveness than Permission

Duck typing pairs naturally with EAFP style:

```python
# LBYL (Look Before You Leap) - not Pythonic
def process(obj):
    if hasattr(obj, 'read'):
        data = obj.read()
    else:
        raise TypeError("Object must have read method")

# EAFP (Easier to Ask Forgiveness) - Pythonic
def process(obj):
    try:
        data = obj.read()
    except AttributeError:
        raise TypeError("Object must have read method")
```

---

## Duck Typing for Testing

Create test doubles without inheritance:

```python
class RealEmailSender:
    def send(self, to, subject, body):
        # Actually sends email
        smtp_connection.send_email(to, subject, body)

class FakeEmailSender:
    def __init__(self):
        self.sent_emails = []

    def send(self, to, subject, body):
        # Just records the email
        self.sent_emails.append({
            'to': to,
            'subject': subject,
            'body': body
        })

# Function works with either - duck typing!
def notify_user(email_sender, user):
    email_sender.send(
        user.email,
        "Welcome!",
        f"Hello {user.name}!"
    )

# Test with fake
fake_sender = FakeEmailSender()
notify_user(fake_sender, test_user)
assert len(fake_sender.sent_emails) == 1
```

---

## When Duck Typing Fails

Duck typing fails at runtime, not compile time:

```python
def calculate_area(shape):
    return shape.area()

class NotAShape:
    pass

obj = NotAShape()
calculate_area(obj)  # AttributeError: 'NotAShape' has no attribute 'area'
```

This is a trade-off:
- **Pro:** More flexible, less boilerplate
- **Con:** Errors discovered at runtime

---

## Protecting Against Duck Typing Errors

### Document expected behavior:
```python
def process(reader):
    """
    Process data from a reader.

    Args:
        reader: Any object with a read() method that returns str
    """
    data = reader.read()
```

### Use hasattr for optional features:
```python
def save(storage, data):
    if hasattr(storage, 'backup'):
        storage.backup()
    storage.save(data)
```

### Use protocols (typed duck typing):
```python
from typing import Protocol

class Reader(Protocol):
    def read(self) -> str: ...

def process(reader: Reader) -> None:
    data = reader.read()  # Type checker knows this is safe
```

---

## Duck Typing Best Practices

1. **Document expected methods** in docstrings
2. **Use descriptive error messages** when duck typing fails
3. **Consider protocols** for complex interfaces
4. **Test thoroughly** since errors are runtime

---

## Key Takeaways

- Duck typing: if it has the method, it works
- No explicit interfaces or inheritance needed
- Python's built-in functions use duck typing extensively
- EAFP style complements duck typing
- Trade-off: flexibility vs runtime errors
- Use protocols for typed duck typing (Python 3.8+)
