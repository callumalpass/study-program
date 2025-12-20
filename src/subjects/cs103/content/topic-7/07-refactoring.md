---
id: cs103-t7-refactoring
title: "Refactoring"
order: 7
---

## Refactoring OOP Code

Refactoring is improving code structure without changing its behavior. With tests in place, you can confidently reshape code to be cleaner, more maintainable, and easier to extend.

---

## What Is Refactoring?

Refactoring means:
- Changing internal structure
- Keeping external behavior identical
- Making small, safe steps
- Running tests after each change

```python
# Before refactoring
def process_order(order):
    # Calculate total
    total = 0
    for item in order['items']:
        total += item['price'] * item['quantity']

    # Apply discount
    if total > 100:
        total *= 0.9

    # Format output
    return f"Total: ${total:.2f}"

# After refactoring - same behavior, better structure
class OrderProcessor:
    def process(self, order: dict) -> str:
        total = self._calculate_total(order['items'])
        discounted = self._apply_discount(total)
        return self._format_output(discounted)

    def _calculate_total(self, items: list) -> float:
        return sum(item['price'] * item['quantity'] for item in items)

    def _apply_discount(self, total: float) -> float:
        if total > 100:
            return total * 0.9
        return total

    def _format_output(self, total: float) -> str:
        return f"Total: ${total:.2f}"
```

---

## The Refactoring Workflow

1. **Ensure tests exist** - You need tests to verify behavior doesn't change
2. **Make one small change** - Extract method, rename variable, etc.
3. **Run tests** - Verify nothing broke
4. **Repeat** - Continue with next improvement

Never skip step 3. If tests fail, undo and try a smaller step.

---

## Common Refactoring Patterns

### Extract Method

Pull code into a named method:

```python
# Before
class Report:
    def generate(self, data):
        # Header
        output = "=" * 50 + "\n"
        output += "SALES REPORT\n"
        output += "=" * 50 + "\n"

        # Body
        for item in data:
            output += f"{item['name']}: ${item['amount']}\n"

        # Footer
        total = sum(item['amount'] for item in data)
        output += "-" * 50 + "\n"
        output += f"Total: ${total}\n"

        return output

# After
class Report:
    def generate(self, data):
        return (
            self._header() +
            self._body(data) +
            self._footer(data)
        )

    def _header(self) -> str:
        return "=" * 50 + "\n" + "SALES REPORT\n" + "=" * 50 + "\n"

    def _body(self, data: list) -> str:
        return "".join(f"{item['name']}: ${item['amount']}\n" for item in data)

    def _footer(self, data: list) -> str:
        total = sum(item['amount'] for item in data)
        return "-" * 50 + "\n" + f"Total: ${total}\n"
```

### Extract Class

Split a class doing too much:

```python
# Before - does too much
class User:
    def __init__(self, name, street, city, zip_code):
        self.name = name
        self.street = street
        self.city = city
        self.zip_code = zip_code

    def full_address(self):
        return f"{self.street}\n{self.city}, {self.zip_code}"

    def mailing_label(self):
        return f"{self.name}\n{self.full_address()}"

# After - address extracted
class Address:
    def __init__(self, street: str, city: str, zip_code: str):
        self.street = street
        self.city = city
        self.zip_code = zip_code

    def full(self) -> str:
        return f"{self.street}\n{self.city}, {self.zip_code}"

class User:
    def __init__(self, name: str, address: Address):
        self.name = name
        self.address = address

    def mailing_label(self) -> str:
        return f"{self.name}\n{self.address.full()}"
```

### Replace Conditional with Polymorphism

```python
# Before - conditional logic
class Bird:
    def __init__(self, type: str):
        self.type = type

    def get_speed(self) -> float:
        if self.type == "european":
            return 35.0
        elif self.type == "african":
            return 40.0
        elif self.type == "norwegian_blue":
            return 0.0  # Dead parrot
        raise ValueError(f"Unknown bird: {self.type}")

# After - polymorphism
class Bird:
    def get_speed(self) -> float:
        raise NotImplementedError

class EuropeanSwallow(Bird):
    def get_speed(self) -> float:
        return 35.0

class AfricanSwallow(Bird):
    def get_speed(self) -> float:
        return 40.0

class NorwegianBlueParrot(Bird):
    def get_speed(self) -> float:
        return 0.0  # It's pining for the fjords
```

### Introduce Parameter Object

Group related parameters:

```python
# Before - many parameters
def create_event(name, start_date, end_date, start_time, end_time, location):
    pass

# After - grouped into object
@dataclass
class DateTimeRange:
    start_date: date
    end_date: date
    start_time: time
    end_time: time

def create_event(name: str, when: DateTimeRange, location: str):
    pass
```

### Replace Inheritance with Composition

```python
# Before - inheritance for code reuse
class HTMLLogger(FileLogger):
    def log(self, message):
        super().log(f"<p>{message}</p>")

# After - composition
class HTMLFormatter:
    def format(self, message: str) -> str:
        return f"<p>{message}</p>"

class Logger:
    def __init__(self, writer, formatter=None):
        self._writer = writer
        self._formatter = formatter

    def log(self, message: str) -> None:
        if self._formatter:
            message = self._formatter.format(message)
        self._writer.write(message)

# Usage
html_logger = Logger(FileWriter("log.html"), HTMLFormatter())
```

---

## Refactoring Safely

### Write Tests First

Before refactoring, ensure you have tests:

```python
class TestOrderProcessor:
    def test_calculates_total(self):
        processor = OrderProcessor()
        result = processor.process({'items': [
            {'price': 10, 'quantity': 2},
            {'price': 5, 'quantity': 1}
        ]})
        assert "$25.00" in result

    def test_applies_discount_over_100(self):
        processor = OrderProcessor()
        result = processor.process({'items': [
            {'price': 50, 'quantity': 3}  # $150 -> $135 with discount
        ]})
        assert "$135.00" in result
```

### Make Small Changes

```python
# Step 1: Extract one method
# Run tests

# Step 2: Extract another method
# Run tests

# Step 3: Rename for clarity
# Run tests

# Never: Extract 5 methods, rename everything, restructure
# Then: Wonder why tests fail
```

### Use IDE Refactoring Tools

Modern IDEs can:
- Rename symbols safely (updates all references)
- Extract methods/classes
- Inline variables/methods
- Move methods between classes

These are safer than manual editing.

---

## Code Smells That Need Refactoring

| Smell | Refactoring |
|-------|-------------|
| Long method | Extract Method |
| Large class | Extract Class |
| Long parameter list | Introduce Parameter Object |
| Duplicated code | Extract Method/Class |
| Switch statements | Replace with Polymorphism |
| Feature envy | Move Method |
| Data clumps | Extract Class |

---

## When NOT to Refactor

- **Code works and rarely changes** - Don't fix what isn't broken
- **No tests exist** - Write tests first, then refactor
- **Deadline pressure** - Technical debt can wait (document it)
- **You don't understand the code** - Understand first, refactor second

---

## Refactoring vs Rewriting

**Refactoring:**
- Small, incremental changes
- Tests pass throughout
- Can stop anytime
- Low risk

**Rewriting:**
- Replace everything at once
- Tests may not apply
- All or nothing
- High risk

Prefer refactoring. Complete rewrites are rarely necessary and often fail.

---

## Key Takeaways

- Refactoring improves structure without changing behavior
- Tests are essential for safe refactoring
- Make small changes and test frequently
- Common patterns: Extract Method/Class, Replace Conditional with Polymorphism
- Use IDE tools when possible
- Refactor when you feel code smells, not preemptively
- Prefer refactoring over rewriting
