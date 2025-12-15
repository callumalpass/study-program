## Introduction to Encapsulation

Imagine a bank vault: you can deposit and withdraw money through the teller window, but you can't walk into the vault and rearrange the cash yourself. This is the essence of encapsulation—controlling access to an object's internal state through a well-defined interface.

---

## Why Encapsulation Matters

Encapsulation is one of the four pillars of OOP. It solves critical problems:

### 1. Data Protection
Without encapsulation, any code can modify object state in invalid ways:
```python
account.balance = -5000  # Disaster! No validation
account.balance = "lots of money"  # Type corruption
```

### 2. Implementation Freedom
When internal details are hidden, you can change them without breaking code that uses your class:
```python
# Today: balance stored as float
# Tomorrow: balance stored as integer cents
# External code doesn't need to change!
```

### 3. Easier Maintenance
Clear boundaries make code easier to understand and modify. You know exactly what can affect internal state.

### 4. Better APIs
Encapsulation forces you to think about the interface you're providing. What operations make sense? What should be hidden?

---

## Interface vs Implementation

A key concept in encapsulation is separating **what** a class does (interface) from **how** it does it (implementation):

```python
class EmailSender:
    # Interface: what users of this class see
    def send(self, to, subject, body):
        """Send an email to the specified address."""
        self._validate_email(to)
        self._format_message(subject, body)
        self._transmit()

    # Implementation: hidden details
    def _validate_email(self, email):
        # Validation logic...
        pass

    def _format_message(self, subject, body):
        # Formatting logic...
        pass

    def _transmit(self):
        # Network transmission...
        pass
```

Users of `EmailSender` only need to know about `send()`. The implementation details can change freely.

---

## Encapsulation in Python

Unlike Java or C++, Python doesn't have strict access modifiers (public, private, protected). Instead, Python uses:

1. **Naming conventions** to signal intent
2. **Properties** to control attribute access
3. **Trust and documentation** rather than enforcement

This follows Python's philosophy: "We're all consenting adults here." The language guides you toward good practices without forcing them.

---

## What You'll Learn

In this topic, you'll master:

1. **Python's access control conventions** (`_name`, `__name`)
2. **The `@property` decorator** for controlled attribute access
3. **Validation in setters** to protect data integrity
4. **Read-only and computed properties**
5. **Lazy initialization** for expensive computations
6. **Common mistakes** and how to avoid them

---

## The Principle

> "Ask, don't touch" — Instead of reaching into an object and manipulating its data directly, ask the object to do it for you through its methods.

This principle leads to more robust, maintainable code. The object is responsible for keeping itself in a valid state.

---

## Key Takeaways

- Encapsulation controls access to internal state through a defined interface
- It protects data, allows implementation changes, and improves API design
- Python uses conventions and properties rather than strict enforcement
- Separate what a class does (interface) from how it does it (implementation)
