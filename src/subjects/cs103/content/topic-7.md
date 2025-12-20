## Introduction

Object-oriented code is easiest to maintain when it follows clear design principles. In this topic, you’ll learn how to choose between inheritance and composition, apply core design heuristics (like SOLID), and test OOP code effectively. The goal isn’t “perfect architecture”—it’s **code that stays easy to change**.

## Learning Objectives

- Choose inheritance vs composition for a given problem
- Apply SOLID principles to improve maintainability
- Recognize and reduce coupling between classes
- Write unit tests for classes (including collaboration between objects)
- Refactor toward cleaner interfaces without changing behavior

## Core Concepts

### Composition Over Inheritance

Inheritance is powerful, but it can create fragile hierarchies. Composition models “has-a” relationships and often leads to simpler designs.

```python
class EmailSender:
    def send(self, to: str, subject: str, body: str) -> None:
        print(f"Sending email to {to}: {subject}")

class UserNotifier:
    def __init__(self, sender: EmailSender):
        self._sender = sender

    def welcome(self, email: str) -> None:
        self._sender.send(email, "Welcome", "Thanks for signing up!")
```

`UserNotifier` *has a* sender; you can swap implementations without changing the notifier.

### SOLID (Practical View)

- **S**ingle Responsibility: one reason to change
- **O**pen/Closed: extend behavior without modifying stable code
- **L**iskov Substitution: subclasses must remain valid substitutes
- **I**nterface Segregation: small interfaces beat giant ones
- **D**ependency Inversion: depend on abstractions, not concrete details

You don’t “apply SOLID” all at once; you use it to spot design pressure and guide refactors.

### Dependency Injection (DI)

Pass dependencies in rather than creating them inside the class. DI improves testability and reduces coupling.

Bad (hard to test):

```python
class PaymentService:
    def charge(self, amount: int) -> None:
        gateway = RealGateway()  # Hard-coded
        gateway.charge(amount)
```

Better:

```python
class PaymentService:
    def __init__(self, gateway):
        self._gateway = gateway

    def charge(self, amount: int) -> None:
        self._gateway.charge(amount)
```

### Testing OOP Code

Good unit tests focus on behavior and public APIs:

- Assert results/state changes (e.g., `balance` decreases)
- Assert interactions for collaborators (e.g., sender called once)
- Use fakes/stubs for external systems (email, databases)

Example (simple “fake” dependency):

```python
class FakeSender:
    def __init__(self):
        self.sent = []

    def send(self, to, subject, body):
        self.sent.append((to, subject, body))

sender = FakeSender()
notifier = UserNotifier(sender)
notifier.welcome("a@example.com")
assert sender.sent == [("a@example.com", "Welcome", "Thanks for signing up!")]
```

## Common Mistakes

- Using inheritance as the default tool for reuse (leading to deep, brittle class trees)
- Exposing internal state (public attributes everywhere), making changes risky
- Writing tests that depend on implementation details (private attributes, exact internal method calls)
- Creating “manager” classes that do everything instead of small, focused objects

## Best Practices

- Start simple; refactor when you feel real design pressure
- Prefer composition for optional features/behaviors (strategies, policies, plugins)
- Keep constructors cheap (don’t do network/file work in `__init__`)
- Test public behavior; use fakes for slow or external dependencies

## Summary

- Composition often produces more flexible designs than inheritance.
- SOLID is a checklist for spotting maintainability issues, not a rigid rulebook.
- Dependency injection improves testability and reduces coupling.
- Well-tested OOP code focuses on behavior and stable public interfaces.

