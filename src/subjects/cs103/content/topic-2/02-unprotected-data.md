---
id: cs103-t2-unprotected
title: "The Problem with Unprotected Data"
order: 2
---

## The Problem with Unprotected Data

Before learning how to protect data, let's understand why it matters. Unprotected data leads to bugs, invalid states, and maintenance nightmares.

---

## The Vulnerable Class

Consider a bank account with no protection:

```python
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.balance = balance

account = BankAccount("Alice", 1000)
```

Everything is public. Anyone can do anything:

```python
# Set invalid balance
account.balance = -5000

# Set wrong type
account.balance = "lots of money"

# Change owner (identity theft!)
account.owner = "Hacker"
```

---

## Real-World Consequences

### Invalid State
```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

rect = Rectangle(10, 5)
rect.width = -3  # Invalid! But allowed
print(rect.area())  # -15 (nonsensical)
```

### Broken Invariants
An **invariant** is a condition that must always be true. Without protection, invariants get violated:

```python
class DateRange:
    def __init__(self, start, end):
        self.start = start
        self.end = end

    def duration(self):
        return self.end - self.start

range = DateRange(date(2024, 1, 1), date(2024, 12, 31))
range.end = date(2023, 1, 1)  # end before start!
# Invariant violated: end >= start
```

### Inconsistent State
```python
class User:
    def __init__(self, email):
        self.email = email
        self.username = email.split('@')[0]

user = User("alice@example.com")
user.email = "bob@example.com"
# Now user.username is still "alice" but email is bob's!
```

---

## The Coupling Problem

When external code depends on internal structure, changes become dangerous:

```python
# Version 1: Temperature in Celsius
class Thermostat:
    def __init__(self):
        self.temperature = 20  # Celsius

# External code assumes Celsius
thermostat = Thermostat()
if thermostat.temperature > 30:
    print("Too hot!")
```

What if you need to change to Fahrenheit internally? All external code breaks.

```python
# Version 2: Changed to Fahrenheit internally
class Thermostat:
    def __init__(self):
        self.temperature = 68  # Now Fahrenheit!

# Old code is now wrong
if thermostat.temperature > 30:  # 30°F is freezing!
    print("Too hot!")
```

---

## The Testing Problem

Unprotected data makes testing harder:

```python
class ShoppingCart:
    def __init__(self):
        self.items = []
        self.total = 0

    def add_item(self, item, price):
        self.items.append(item)
        self.total += price

# Test: verify total after adding items
cart = ShoppingCart()
cart.add_item("Book", 20)
cart.add_item("Pen", 5)
assert cart.total == 25  # Passes

# But someone can break it:
cart.total = 999  # External modification
# Now the cart is in an inconsistent state
```

---

## The Maintenance Nightmare

Large codebases with unprotected data become fragile:

```python
class Order:
    def __init__(self):
        self.status = "pending"
        self.items = []
        self.payment_id = None

# Hundreds of places in the codebase do this:
order.status = "shipped"
order.status = "completed"

# Now you want to add logging when status changes...
# You have to find and modify EVERY place that sets status!
```

With encapsulation, there's one place to make changes:

```python
class Order:
    def __init__(self):
        self._status = "pending"

    def set_status(self, new_status):
        print(f"Status changing: {self._status} -> {new_status}")
        self._status = new_status

# Now logging is automatic everywhere
```

---

## Signs You Need Encapsulation

Watch for these code smells:

1. **External validation:** Code outside the class checks if values are valid
```python
# Bad: Validation scattered everywhere
if user.age >= 0:
    user.age = new_age
```

2. **Multiple places setting the same attribute:**
```python
# Found in 20 different files:
order.status = "completed"
```

3. **Defensive copying:** External code makes copies to avoid corruption
```python
# Worried about modification
items_copy = list(cart.items)
```

4. **Comments warning about internal state:**
```python
class Config:
    # WARNING: Don't modify _cache directly!
    _cache = {}
```

---

## The Solution Preview

Encapsulation provides controlled access:

```python
class BankAccount:
    def __init__(self, owner, balance):
        self._owner = owner
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit must be positive")
        self._balance += amount

    def withdraw(self, amount):
        if amount > self._balance:
            raise ValueError("Insufficient funds")
        self._balance -= amount
```

Now balance can only change through controlled methods with validation.

---

## Key Takeaways

- Unprotected data leads to invalid states and broken invariants
- Direct attribute access creates tight coupling to implementation
- Changes to internal structure break external code
- Testing becomes harder when state can be modified externally
- Encapsulation centralizes control and enables safe changes
