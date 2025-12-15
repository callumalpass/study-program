## Design by Contract

Design by Contract is a methodology where classes define clear **contracts**: promises about what they require (preconditions), what they guarantee (postconditions), and what's always true (invariants).

---

## The Contract Metaphor

Think of a class as offering a service contract:

**If you (the caller) provide:**
- Valid inputs (preconditions)

**I (the class) guarantee:**
- Valid outputs (postconditions)
- Internal consistency (invariants)

```python
class BankAccount:
    """
    Contract:
    - Precondition: Withdrawal amount must be positive
    - Precondition: Withdrawal amount <= balance
    - Postcondition: New balance = old balance - amount
    - Invariant: Balance is never negative
    """

    def __init__(self, balance=0):
        self._balance = balance

    def withdraw(self, amount):
        # Check preconditions
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self._balance:
            raise ValueError("Insufficient funds")

        # Perform operation
        self._balance -= amount

        # Postcondition is implicit: balance decreased by amount
        # Invariant maintained: balance >= 0
        return amount
```

---

## Preconditions

What must be true *before* a method runs:

```python
class Calculator:
    def divide(self, a, b):
        """
        Preconditions:
        - a and b must be numbers
        - b must not be zero
        """
        if not isinstance(a, (int, float)) or not isinstance(b, (int, float)):
            raise TypeError("Arguments must be numbers")
        if b == 0:
            raise ValueError("Cannot divide by zero")

        return a / b

    def square_root(self, x):
        """
        Precondition: x must be non-negative
        """
        if x < 0:
            raise ValueError("Cannot compute square root of negative number")
        return x ** 0.5
```

---

## Postconditions

What is guaranteed *after* a method runs:

```python
class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        """
        Postconditions:
        - Stack size increases by 1
        - Top of stack is the pushed item
        """
        old_size = len(self._items)
        self._items.append(item)

        # Verify postconditions (usually just documented, not checked)
        assert len(self._items) == old_size + 1
        assert self._items[-1] == item

    def pop(self):
        """
        Precondition: Stack must not be empty
        Postconditions:
        - Stack size decreases by 1
        - Returns the previously top item
        """
        if not self._items:
            raise IndexError("Cannot pop from empty stack")
        return self._items.pop()
```

---

## Invariants

What must *always* be true about an object:

```python
class SortedList:
    """
    Invariant: Items are always sorted in ascending order
    """

    def __init__(self):
        self._items = []

    def add(self, item):
        """Add item while maintaining sorted order."""
        # Use binary search for efficiency
        import bisect
        bisect.insort(self._items, item)
        self._check_invariant()

    def remove(self, item):
        """Remove item while maintaining sorted order."""
        self._items.remove(item)
        self._check_invariant()

    def _check_invariant(self):
        """Verify invariant holds (usually for debugging)."""
        for i in range(len(self._items) - 1):
            assert self._items[i] <= self._items[i + 1], "Invariant violated!"

    def __iter__(self):
        return iter(self._items)
```

---

## Contracts and Inheritance

Contracts have rules for inheritance:

### Preconditions: Can Only Be Weakened
Children can accept *more* inputs, not fewer:

```python
class Shape:
    def resize(self, factor):
        """Precondition: factor > 0"""
        if factor <= 0:
            raise ValueError("Factor must be positive")

class FlexibleShape(Shape):
    def resize(self, factor):
        """Precondition: factor != 0 (weaker, allows negatives)"""
        if factor == 0:
            raise ValueError("Factor cannot be zero")
        # Negative factors could mean "flip"
```

### Postconditions: Can Only Be Strengthened
Children can guarantee *more*, not less:

```python
class FileWriter:
    def write(self, data):
        """Postcondition: Data is written"""
        # ...

class ValidatingFileWriter(FileWriter):
    def write(self, data):
        """
        Postcondition: Data is written AND validated
        (Stronger guarantee)
        """
        self.validate(data)
        super().write(data)
```

---

## Defensive Programming

Check contracts even when callers should follow them:

```python
class UserService:
    def create_user(self, username, email):
        """
        Create a new user.

        Args:
            username: Non-empty string, alphanumeric
            email: Valid email format

        Returns:
            User object

        Raises:
            ValueError: If preconditions violated
        """
        # Defensive checks
        if not username or not username.isalnum():
            raise ValueError("Username must be non-empty alphanumeric")
        if '@' not in email or '.' not in email:
            raise ValueError("Invalid email format")

        # Proceed with creation
        user = User(username, email)
        self.repository.save(user)
        return user
```

---

## Type Hints as Contracts

Type hints express contracts that type checkers can verify:

```python
from typing import List, Optional

def find_user(user_id: int) -> Optional['User']:
    """
    Contract expressed through types:
    - Input: must be an int
    - Output: either a User or None
    """
    pass

def process_items(items: List[str]) -> List[str]:
    """
    Contract:
    - Input: list of strings
    - Output: list of strings
    """
    pass
```

---

## Documenting Contracts

Use docstrings to make contracts explicit:

```python
class PriorityQueue:
    """
    A priority queue that maintains items in priority order.

    Invariants:
        - Items are always ordered by priority (highest first)
        - Size is always >= 0

    Thread Safety:
        - Not thread-safe. External synchronization required.
    """

    def enqueue(self, item, priority):
        """
        Add an item with given priority.

        Args:
            item: The item to add
            priority: Integer priority (higher = more urgent)

        Preconditions:
            - priority must be an integer

        Postconditions:
            - Queue size increases by 1
            - Item is in queue at correct priority position
        """
        pass

    def dequeue(self):
        """
        Remove and return the highest priority item.

        Preconditions:
            - Queue must not be empty

        Postconditions:
            - Queue size decreases by 1
            - Returns the item that had highest priority

        Raises:
            IndexError: If queue is empty
        """
        pass
```

---

## Key Takeaways

- Contracts define what a class promises and requires
- Preconditions: what callers must provide
- Postconditions: what the class guarantees
- Invariants: what's always true about the object
- Children can weaken preconditions, strengthen postconditions
- Document contracts clearly in docstrings
- Type hints help express and check contracts
