---
id: cs103-t2-validation
title: "Validation Patterns"
order: 5
---

## Validation in Setters

One of the most powerful uses of properties is data validation. By validating in setters, you ensure your objects always maintain a valid state.

---

## Basic Validation Pattern

```python
class Product:
    def __init__(self, name, price):
        self.name = name    # Uses setter
        self.price = price  # Uses setter

    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        if not value or not value.strip():
            raise ValueError("Name cannot be empty")
        self._name = value.strip()

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        if not isinstance(value, (int, float)):
            raise TypeError("Price must be a number")
        if value < 0:
            raise ValueError("Price cannot be negative")
        self._price = float(value)
```

**Key pattern:** Call setters in `__init__` to validate initial values.

---

## Type Validation

Ensure attributes have the correct type:

```python
class Person:
    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if not isinstance(value, int):
            raise TypeError(f"Age must be int, got {type(value).__name__}")
        if value < 0 or value > 150:
            raise ValueError("Age must be between 0 and 150")
        self._age = value
```

---

## Range Validation

Constrain values to valid ranges:

```python
class Thermostat:
    MIN_TEMP = 10
    MAX_TEMP = 35

    @property
    def temperature(self):
        return self._temperature

    @temperature.setter
    def temperature(self, value):
        if value < self.MIN_TEMP:
            raise ValueError(f"Temperature cannot be below {self.MIN_TEMP}°C")
        if value > self.MAX_TEMP:
            raise ValueError(f"Temperature cannot exceed {self.MAX_TEMP}°C")
        self._temperature = value
```

---

## Format Validation

Validate strings match expected formats:

```python
import re

class Contact:
    @property
    def email(self):
        return self._email

    @email.setter
    def email(self, value):
        pattern = r'^[\w\.-]+@[\w\.-]+\.\w+$'
        if not re.match(pattern, value):
            raise ValueError(f"Invalid email format: {value}")
        self._email = value.lower()

    @property
    def phone(self):
        return self._phone

    @phone.setter
    def phone(self, value):
        # Remove non-digits
        digits = re.sub(r'\D', '', value)
        if len(digits) != 10:
            raise ValueError("Phone must have 10 digits")
        self._phone = digits
```

---

## Enum/Choice Validation

Restrict to a set of allowed values:

```python
class Order:
    VALID_STATUSES = {'pending', 'processing', 'shipped', 'delivered', 'cancelled'}

    @property
    def status(self):
        return self._status

    @status.setter
    def status(self, value):
        if value not in self.VALID_STATUSES:
            raise ValueError(
                f"Invalid status '{value}'. "
                f"Must be one of: {', '.join(self.VALID_STATUSES)}"
            )
        self._status = value
```

---

## Cross-Field Validation

Sometimes validation depends on multiple fields:

```python
class DateRange:
    def __init__(self, start, end):
        self._start = None
        self._end = None
        self.start = start
        self.end = end

    @property
    def start(self):
        return self._start

    @start.setter
    def start(self, value):
        if self._end is not None and value > self._end:
            raise ValueError("Start date cannot be after end date")
        self._start = value

    @property
    def end(self):
        return self._end

    @end.setter
    def end(self, value):
        if self._start is not None and value < self._start:
            raise ValueError("End date cannot be before start date")
        self._end = value
```

---

## Normalization in Setters

Setters can normalize data, not just validate:

```python
class User:
    @property
    def username(self):
        return self._username

    @username.setter
    def username(self, value):
        if not value:
            raise ValueError("Username required")
        # Normalize: lowercase, strip whitespace, limit length
        normalized = value.lower().strip()[:50]
        if len(normalized) < 3:
            raise ValueError("Username must be at least 3 characters")
        self._username = normalized

    @property
    def tags(self):
        return self._tags

    @tags.setter
    def tags(self, value):
        # Accept string or list, normalize to list of lowercase strings
        if isinstance(value, str):
            value = [t.strip() for t in value.split(',')]
        self._tags = [t.lower() for t in value if t]
```

---

## Validation with Custom Exceptions

Create specific exception types for better error handling:

```python
class ValidationError(Exception):
    """Base class for validation errors."""
    pass

class InvalidEmailError(ValidationError):
    """Raised when email format is invalid."""
    pass

class InvalidAgeError(ValidationError):
    """Raised when age is out of valid range."""
    pass

class Person:
    @property
    def email(self):
        return self._email

    @email.setter
    def email(self, value):
        if "@" not in value:
            raise InvalidEmailError(f"'{value}' is not a valid email")
        self._email = value

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if value < 0 or value > 150:
            raise InvalidAgeError(f"Age {value} is not valid (0-150)")
        self._age = value

# Usage
try:
    person = Person()
    person.email = "invalid"
except InvalidEmailError as e:
    print(f"Email error: {e}")
except InvalidAgeError as e:
    print(f"Age error: {e}")
```

---

## Internal Consistency

Use validation to maintain internal consistency:

```python
class ShoppingCart:
    def __init__(self):
        self._items = []
        self._total = 0

    @property
    def items(self):
        return list(self._items)  # Return copy

    def add_item(self, item, price):
        if price < 0:
            raise ValueError("Price cannot be negative")
        self._items.append({'item': item, 'price': price})
        self._total += price

    def remove_item(self, item):
        for i, entry in enumerate(self._items):
            if entry['item'] == item:
                self._total -= entry['price']
                self._items.pop(i)
                return
        raise ValueError(f"Item '{item}' not in cart")

    @property
    def total(self):
        return self._total  # Always consistent with items
```

---

## Key Takeaways

- Validate in setters to ensure objects stay valid
- Call setters from `__init__` to validate initial values
- Normalize data (lowercase, strip, etc.) alongside validation
- Use cross-field validation when properties depend on each other
- Create custom exception types for specific error handling
- Keep internal state consistent through controlled modification
