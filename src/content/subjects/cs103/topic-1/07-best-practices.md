## Best Practices and Common Mistakes

Writing good object-oriented code isn't just about knowing the syntax—it's about following patterns that make code maintainable and avoiding pitfalls that cause bugs. This section covers essential practices and common mistakes.

---

## Best Practice 1: Keep Classes Focused

Each class should have a single, clear responsibility. If you find yourself describing a class with "and," it might need splitting.

```python
# BAD: User class does too many things
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

    def send_email(self, message):
        # Email sending logic
        pass

    def generate_report(self):
        # Report generation logic
        pass

    def save_to_database(self):
        # Database logic
        pass

# BETTER: Separate concerns
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email

class EmailService:
    def send(self, user, message):
        pass

class UserRepository:
    def save(self, user):
        pass
```

---

## Best Practice 2: Initialize All Attributes in `__init__`

Don't add attributes in random methods—it makes objects unpredictable:

```python
# BAD: Attribute added later
class Player:
    def __init__(self, name):
        self.name = name

    def start_game(self):
        self.score = 0  # First appearance of score

    def get_score(self):
        return self.score  # Error if start_game wasn't called!

# GOOD: All attributes initialized in __init__
class Player:
    def __init__(self, name):
        self.name = name
        self.score = 0  # Always exists

    def start_game(self):
        self.score = 0  # Reset
```

---

## Best Practice 3: Use Meaningful Names

Names should communicate intent:

```python
# BAD: Vague names
class D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def calc(self):
        return self.x * self.y

# GOOD: Clear names
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def calculate_area(self):
        return self.width * self.height
```

**Naming conventions:**
- **Classes:** Nouns (Dog, BankAccount, HttpRequest)
- **Methods:** Verbs (bark, deposit, send_request)
- **Attributes:** Nouns describing data (name, balance, headers)

---

## Best Practice 4: Always Implement `__repr__`

Makes debugging much easier:

```python
class User:
    def __init__(self, id, name):
        self.id = id
        self.name = name

    def __repr__(self):
        return f"User(id={self.id}, name={self.name!r})"

users = [User(1, "Alice"), User(2, "Bob")]
print(users)  # [User(id=1, name='Alice'), User(id=2, name='Bob')]
# Much better than: [<__main__.User object at 0x...>, ...]
```

---

## Best Practice 5: Use Type Hints

Type hints improve readability and enable better IDE support:

```python
class BankAccount:
    def __init__(self, owner: str, balance: float = 0) -> None:
        self.owner = owner
        self.balance = balance

    def deposit(self, amount: float) -> float:
        self.balance += amount
        return self.balance

    def can_withdraw(self, amount: float) -> bool:
        return self.balance >= amount
```

---

## Common Mistake 1: Forgetting `self`

The most common Python OOP error:

```python
# WRONG: Missing self
class Counter:
    def __init__(self):
        count = 0  # Local variable, lost after __init__!

    def increment(self):
        count += 1  # NameError: 'count' is not defined

# CORRECT
class Counter:
    def __init__(self):
        self.count = 0

    def increment(self):
        self.count += 1
```

---

## Common Mistake 2: Mutable Default Arguments

Already covered, but worth repeating:

```python
# WRONG: Shared mutable default
class Group:
    def __init__(self, members=[]):
        self.members = members

# CORRECT: Use None
class Group:
    def __init__(self, members=None):
        self.members = members if members is not None else []
```

This applies to all mutable types: lists, dicts, sets, and custom objects.

---

## Common Mistake 3: Modifying Class Variables via Instances

```python
class Config:
    debug = False

c1 = Config()
c1.debug = True    # Creates INSTANCE variable!
c2 = Config()
print(c2.debug)    # False - class variable unchanged

# CORRECT: Modify through class
Config.debug = True
```

---

## Common Mistake 4: Deep Nesting in Methods

Keep methods simple and focused:

```python
# BAD: Deeply nested, hard to follow
class Processor:
    def process(self, data):
        if data:
            if self.is_valid(data):
                for item in data:
                    if item.active:
                        if item.value > 0:
                            # Do something
                            pass

# BETTER: Use early returns and helper methods
class Processor:
    def process(self, data):
        if not data or not self.is_valid(data):
            return

        for item in self._get_processable_items(data):
            self._process_item(item)

    def _get_processable_items(self, data):
        return [item for item in data if item.active and item.value > 0]

    def _process_item(self, item):
        # Process single item
        pass
```

---

## Common Mistake 5: Exposing Internal State

Don't let external code break your object's invariants:

```python
# RISKY: Internal list exposed
class TodoList:
    def __init__(self):
        self._items = []

    def get_items(self):
        return self._items  # External code can modify!

todo = TodoList()
items = todo.get_items()
items.append("Hacked!")  # Modifies internal state!

# SAFER: Return a copy
def get_items(self):
    return list(self._items)  # Returns a copy
```

---

## Properties for Computed Attributes

Use `@property` for attributes that are computed, not stored:

```python
class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def area(self):
        return 3.14159 * self.radius ** 2

    @property
    def diameter(self):
        return self.radius * 2

c = Circle(5)
print(c.area)      # 78.53975 - looks like attribute, is computed
print(c.diameter)  # 10
```

---

## Summary Checklist

When writing classes, verify:

- [ ] Class has a single, clear responsibility
- [ ] All attributes initialized in `__init__`
- [ ] Names are meaningful (class=noun, method=verb)
- [ ] `__repr__` is implemented for debugging
- [ ] No mutable default arguments
- [ ] `self` used consistently for instance attributes
- [ ] Class variables modified through class name, not instances
- [ ] Internal state protected from external modification
- [ ] Methods are focused and not deeply nested
- [ ] Type hints added for clarity

---

## Key Takeaways

- Keep classes focused on one responsibility
- Initialize all attributes in `__init__`
- Use meaningful names and implement `__repr__`
- Avoid mutable default arguments
- Modify class variables through the class, not instances
- Protect internal state from external modification
- Use properties for computed attributes
