## Introduction

As programs grow, classes often need to work together without knowing the exact concrete types involved. **Abstraction** helps you design around *what something can do* (its interface/contract) rather than *what it is* (its concrete class). In Python, you can express interfaces through abstract base classes (ABCs), protocols, and careful API design.

## Learning Objectives

- Explain abstraction and why it reduces coupling
- Define and use abstract base classes with `abc.ABC` and `@abstractmethod`
- Use `super()` and the template method pattern to share algorithm structure
- Contrast nominal typing (ABCs) with structural typing (Protocols / duck typing)
- Decide when to use an interface vs a concrete class

## Core Concepts

### Abstraction: Design by Contract

An abstraction is a promise: “If you give me something that behaves like a `Storage`, I can save and load data.” Code built on an abstraction is easier to extend because new implementations can be plugged in without changing callers.

### Abstract Base Classes (ABCs)

ABCs let you define a *required set of methods* that subclasses must implement.

```python
from abc import ABC, abstractmethod

class Storage(ABC):
    @abstractmethod
    def save(self, key: str, value: str) -> None:
        raise NotImplementedError

    @abstractmethod
    def load(self, key: str) -> str | None:
        raise NotImplementedError

class InMemoryStorage(Storage):
    def __init__(self):
        self._data: dict[str, str] = {}

    def save(self, key: str, value: str) -> None:
        self._data[key] = value

    def load(self, key: str) -> str | None:
        return self._data.get(key)
```

If a subclass forgets a required method, Python prevents instantiation.

### The Template Method Pattern (Shared Algorithm Shape)

Often you want subclasses to customize *steps* of an algorithm while keeping the overall structure the same.

```python
from abc import ABC, abstractmethod

class Report(ABC):
    def render(self) -> str:
        title = self.title()
        body = self.body()
        return f"=== {title} ===\n{body}\n"

    @abstractmethod
    def title(self) -> str:
        raise NotImplementedError

    @abstractmethod
    def body(self) -> str:
        raise NotImplementedError

class SalesReport(Report):
    def title(self) -> str:
        return "Sales"

    def body(self) -> str:
        return "Total: $1234"
```

`render()` is the template method: subclasses fill in the blanks.

### Protocols and Structural Typing (Pythonic Interfaces)

Sometimes you don’t need inheritance at all. You can accept “anything that has the right methods”.

```python
from typing import Protocol

class Writer(Protocol):
    def write(self, text: str) -> None: ...

def log(writer: Writer, message: str) -> None:
    writer.write(message + "\n")

class ConsoleWriter:
    def write(self, text: str) -> None:
        print(text, end="")

log(ConsoleWriter(), "Hello")
```

This is **structural typing**: compatibility is based on methods/attributes, not explicit inheritance.

## Common Mistakes

- Treating an ABC as a “fancy base class” and putting lots of unrelated logic inside it
- Making interfaces too large (“god interfaces”) so every implementation has to stub irrelevant methods
- Forgetting to call `super().__init__()` in cooperative inheritance chains
- Using inheritance to reuse code when composition would be clearer

## Best Practices

- Keep interfaces small and focused (one responsibility)
- Prefer composition when you only need to reuse behavior, not represent an “is-a” relationship
- Use ABCs when you need runtime checks (`isinstance(x, Storage)`) or shared template logic
- Use Protocols when you want flexible, duck-typed interfaces without forcing inheritance

## Summary

- Abstraction reduces coupling by coding to capabilities rather than concrete classes.
- ABCs enforce required methods and enable shared algorithm structure (template method).
- Protocols (structural typing) express “has the right methods” without inheritance.
- Good abstractions are small, stable, and easy to implement.

