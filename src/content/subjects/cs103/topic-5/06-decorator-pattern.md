## The Decorator Pattern

**Problem:** You want to add behavior to objects dynamically, without modifying their class or using inheritance for every combination of features.

**Solution:** Wrap objects with decorator classes that add functionality while maintaining the same interface.

---

## The Problem with Inheritance

Imagine a coffee shop with options:

```python
# Inheritance explosion!
class Coffee: pass
class CoffeeWithMilk(Coffee): pass
class CoffeeWithSugar(Coffee): pass
class CoffeeWithMilkAndSugar(Coffee): pass
class CoffeeWithMilkAndSugarAndWhip(Coffee): pass
# ... endless combinations
```

Every combination needs a new class. The Decorator pattern solves this.

---

## Classic Decorator Pattern

```python
class Coffee:
    def cost(self):
        return 2.00

    def description(self):
        return "Coffee"

class CoffeeDecorator:
    def __init__(self, coffee):
        self._coffee = coffee

    def cost(self):
        return self._coffee.cost()

    def description(self):
        return self._coffee.description()

class MilkDecorator(CoffeeDecorator):
    def cost(self):
        return self._coffee.cost() + 0.50

    def description(self):
        return self._coffee.description() + ", Milk"

class SugarDecorator(CoffeeDecorator):
    def cost(self):
        return self._coffee.cost() + 0.25

    def description(self):
        return self._coffee.description() + ", Sugar"

class WhipDecorator(CoffeeDecorator):
    def cost(self):
        return self._coffee.cost() + 0.75

    def description(self):
        return self._coffee.description() + ", Whip"

# Build up orders dynamically
order = Coffee()
order = MilkDecorator(order)
order = SugarDecorator(order)
order = SugarDecorator(order)  # Double sugar!
order = WhipDecorator(order)

print(order.description())  # Coffee, Milk, Sugar, Sugar, Whip
print(f"${order.cost():.2f}")  # $3.75
```

---

## Decorator Pattern vs Python Decorators

They're related but different:

**Decorator Pattern:** Wraps objects to add behavior
```python
wrapped_obj = Decorator(original_obj)
```

**Python `@decorator`:** Wraps functions to add behavior
```python
@my_decorator
def my_function():
    pass
```

Python's `@decorator` syntax is actually the Decorator pattern applied to functions!

---

## Python Function Decorators

```python
def log_calls(func):
    """Decorator that logs function calls."""
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}...")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

@log_calls
def add(a, b):
    return a + b

add(3, 4)
# Calling add...
# add returned 7
```

---

## Stacking Decorators

Multiple decorators stack (execute from bottom to top):

```python
def bold(func):
    def wrapper():
        return f"<b>{func()}</b>"
    return wrapper

def italic(func):
    def wrapper():
        return f"<i>{func()}</i>"
    return wrapper

@bold
@italic
def greet():
    return "Hello"

print(greet())  # <b><i>Hello</i></b>
# italic runs first, then bold wraps the result
```

---

## Decorator with Parameters

```python
def repeat(times):
    """Decorator factory that repeats function calls."""
    def decorator(func):
        def wrapper(*args, **kwargs):
            results = []
            for _ in range(times):
                results.append(func(*args, **kwargs))
            return results
        return wrapper
    return decorator

@repeat(3)
def say_hello(name):
    return f"Hello, {name}!"

print(say_hello("Alice"))
# ['Hello, Alice!', 'Hello, Alice!', 'Hello, Alice!']
```

---

## Class-Based Decorator

```python
class Retry:
    """Decorator that retries failed operations."""

    def __init__(self, max_attempts=3, exceptions=(Exception,)):
        self.max_attempts = max_attempts
        self.exceptions = exceptions

    def __call__(self, func):
        def wrapper(*args, **kwargs):
            for attempt in range(self.max_attempts):
                try:
                    return func(*args, **kwargs)
                except self.exceptions as e:
                    if attempt == self.max_attempts - 1:
                        raise
                    print(f"Attempt {attempt + 1} failed, retrying...")
        return wrapper

@Retry(max_attempts=3, exceptions=(ConnectionError,))
def fetch_data(url):
    # Might fail due to network issues
    import random
    if random.random() < 0.7:
        raise ConnectionError("Network error")
    return "Data"

result = fetch_data("http://example.com")
```

---

## Object Decorator for Streams

```python
class Stream:
    def write(self, data):
        raise NotImplementedError

class FileStream(Stream):
    def __init__(self, filename):
        self.filename = filename

    def write(self, data):
        with open(self.filename, 'a') as f:
            f.write(data)

class StreamDecorator(Stream):
    def __init__(self, stream):
        self._stream = stream

    def write(self, data):
        self._stream.write(data)

class EncryptedStream(StreamDecorator):
    def write(self, data):
        encrypted = f"[ENCRYPTED]{data}[/ENCRYPTED]"
        self._stream.write(encrypted)

class CompressedStream(StreamDecorator):
    def write(self, data):
        compressed = f"[COMPRESSED]{data}[/COMPRESSED]"
        self._stream.write(compressed)

class BufferedStream(StreamDecorator):
    def __init__(self, stream, buffer_size=100):
        super().__init__(stream)
        self.buffer = []
        self.buffer_size = buffer_size

    def write(self, data):
        self.buffer.append(data)
        if len(self.buffer) >= self.buffer_size:
            self.flush()

    def flush(self):
        self._stream.write(''.join(self.buffer))
        self.buffer = []

# Compose features
stream = FileStream("output.txt")
stream = EncryptedStream(stream)
stream = CompressedStream(stream)
stream.write("Sensitive data")
# File contains: [COMPRESSED][ENCRYPTED]Sensitive data[/ENCRYPTED][/COMPRESSED]
```

---

## functools.wraps

Preserve function metadata when decorating:

```python
from functools import wraps

def my_decorator(func):
    @wraps(func)  # Preserves __name__, __doc__, etc.
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def documented_function():
    """This is my docstring."""
    pass

print(documented_function.__name__)  # 'documented_function' (not 'wrapper')
print(documented_function.__doc__)   # 'This is my docstring.'
```

---

## When to Use Decorator Pattern

**Good use cases:**
- Adding optional features to objects
- Logging, caching, validation
- Composing behaviors flexibly
- Avoiding class explosion from feature combinations

**Avoid when:**
- Features are always required (use inheritance)
- Simple function calls suffice
- Order of decoration matters critically

---

## Key Takeaways

- Decorator pattern wraps objects to add behavior
- Avoids inheritance explosion for feature combinations
- Python `@decorator` is the pattern applied to functions
- Use `functools.wraps` to preserve function metadata
- Decorators can be stacked for multiple behaviors
- Great for cross-cutting concerns: logging, caching, auth
