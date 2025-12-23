---
id: cs103-t2-intro
title: "Introduction to Encapsulation"
order: 1
---

## Introduction to Encapsulation

Imagine a bank vault: you can deposit and withdraw money through the teller window, but you can't walk into the vault and rearrange the cash yourself. This is the essence of encapsulation—controlling access to an object's internal state through a well-defined interface.

Encapsulation is the first pillar of OOP that you'll truly internalize and use daily. While you've seen classes that bundle data and methods together, encapsulation goes further: it's about *protecting* that data and *controlling* how it's accessed. A well-encapsulated class prevents invalid states and allows you to change internal implementation without affecting code that depends on your class.

---

## Why Encapsulation Matters

Encapsulation is one of the four pillars of OOP. It solves critical problems that emerge as codebases grow:

### 1. Data Protection
Without encapsulation, any code can modify object state in invalid ways:
```python
account.balance = -5000  # Disaster! No validation
account.balance = "lots of money"  # Type corruption
user.age = -10  # Biologically impossible
product.price = 0  # Business logic violation
```

With encapsulation, you can enforce invariants—rules that must always be true about your object's state.

### 2. Implementation Freedom
When internal details are hidden, you can change them without breaking code that uses your class:
```python
# Version 1: balance stored as float
self.balance = 1000.50

# Version 2: balance stored as integer cents (to avoid float errors)
self._balance_cents = 100050

# External code still calls account.balance and gets the right value
# because it goes through a property that converts as needed
```

This is crucial for maintaining long-lived codebases where you need to evolve implementations without coordinating changes across all users of your class.

### 3. Easier Maintenance
Clear boundaries make code easier to understand and modify. When you see a leading underscore (`_balance`), you know that attribute is internal. When you see a public method, you know it's part of the class's contract.

This also helps with debugging: if balance becomes invalid, you know it happened through one of the public methods, not through random assignment somewhere in the codebase.

### 4. Better APIs
Encapsulation forces you to think about the interface you're providing. What operations make sense? What should be hidden? A class with a clear, minimal interface is easier to understand and use correctly than one that exposes all its internals.

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

1. **Python's access control conventions** (`_name`, `__name`) and when to use each
2. **The `@property` decorator** for controlled attribute access with getter/setter syntax
3. **Validation in setters** to protect data integrity and enforce business rules
4. **Read-only and computed properties** that calculate values on demand
5. **Lazy initialization** for expensive computations that shouldn't run until needed
6. **Common mistakes** and how to avoid them in real-world code

By the end of this topic, you'll be able to design classes that protect their internal state while providing clean, intuitive interfaces.

---

## The Principle

> "Ask, don't touch" — Instead of reaching into an object and manipulating its data directly, ask the object to do it for you through its methods.

This principle leads to more robust, maintainable code. The object is responsible for keeping itself in a valid state. When you call `account.withdraw(100)`, the account can check if the withdrawal is valid, update the balance, log the transaction, and notify listeners—all things that wouldn't happen if you just wrote `account.balance -= 100`.

---

## Encapsulation vs Information Hiding

These terms are sometimes used interchangeably, but they have subtle differences:

- **Encapsulation** is bundling data and methods that operate on that data into a single unit (a class)
- **Information hiding** is restricting access to the internal details of that bundle

In practice, we usually mean both when we say "encapsulation." We want classes that contain their own data *and* control how that data is accessed.

---

## Common Mistakes to Avoid

Before diving deeper, here are pitfalls you'll learn to avoid:

1. **Making everything public** because "it's easier" — leads to fragile code
2. **Over-privatizing** with double underscores everywhere — usually unnecessary in Python
3. **Exposing mutable internal collections** — lets external code modify your state
4. **Inconsistent naming conventions** — confuses users about what's public vs internal

---

## Key Takeaways

- Encapsulation controls access to internal state through a defined interface
- It protects data, allows implementation changes, and improves API design
- Python uses conventions and properties rather than strict enforcement
- Separate what a class does (interface) from how it does it (implementation)
- The "ask, don't touch" principle leads to more maintainable code
- Good encapsulation makes debugging easier by limiting where state can change
