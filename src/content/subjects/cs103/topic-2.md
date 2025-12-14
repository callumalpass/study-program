## Introduction

Imagine a bank vault: you can deposit and withdraw money through the teller window, but you can't walk into the vault and rearrange the cash yourself. This is the essence of encapsulation—controlling access to an object's internal state through a well-defined interface.

**Why This Matters:**
Encapsulation is one of the four pillars of OOP. It protects your data from accidental corruption, allows you to change internal implementation without breaking external code, and makes your classes easier to use correctly. Without encapsulation, bugs multiply as code grows.

**Learning Objectives:**
- Understand why restricting direct access to data is important
- Use Python naming conventions for access control (public, protected, private)
- Implement getters and setters using the `@property` decorator
- Add validation logic to protect data integrity
- Recognize the difference between interface and implementation

---

## Core Concepts

### The Problem: Unprotected Data

Without encapsulation, any code can modify object state in invalid ways:

```python
class BankAccount:
    def __init__(self, balance):
        self.balance = balance

account = BankAccount(1000)
account.balance = -5000  # Disaster! No validation
account.balance = "lots of money"  # Type corruption
```

### Python's Access Control Conventions

Python doesn't enforce access control like Java or C++. Instead, it uses naming conventions:

| Convention | Example | Meaning |
|------------|---------|---------|
| No prefix | `self.name` | Public - use freely |
| Single underscore | `self._name` | Protected - internal use suggested |
| Double underscore | `self.__name` | Private - name mangling applied |

```python
class Employee:
    def __init__(self, name, salary):
        self.name = name           # Public
        self._department = "HR"    # Protected (hint: don't touch)
        self.__salary = salary     # Private (name-mangled)

    def get_salary(self):
        return self.__salary

emp = Employee("Alice", 50000)
print(emp.name)           # Works: "Alice"
print(emp._department)    # Works but discouraged: "HR"
print(emp.__salary)       # AttributeError!
print(emp._Employee__salary)  # Works but NEVER do this: 50000
```

### Name Mangling Explained

When you use `__name`, Python transforms it to `_ClassName__name`. This prevents accidental access and name collisions in subclasses—but it's not true security.

```python
class Parent:
    def __init__(self):
        self.__secret = "parent secret"

class Child(Parent):
    def __init__(self):
        super().__init__()
        self.__secret = "child secret"  # Different variable!

c = Child()
print(c._Parent__secret)  # "parent secret"
print(c._Child__secret)   # "child secret"
```

### Properties: The Pythonic Way

The `@property` decorator lets you define methods that look like attributes. This is Python's preferred approach to encapsulation.

```python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def celsius(self):
        """Getter for celsius"""
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        """Setter with validation"""
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value

    @property
    def fahrenheit(self):
        """Computed property (read-only)"""
        return self._celsius * 9/5 + 32

temp = Temperature(25)
print(temp.celsius)      # 25 - uses getter
print(temp.fahrenheit)   # 77.0 - computed

temp.celsius = 30        # Uses setter with validation
temp.celsius = -300      # Raises ValueError!
```

### Read-Only Properties

Omit the setter to create read-only attributes:

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @property
    def area(self):
        return 3.14159 * self._radius ** 2

c = Circle(5)
print(c.area)    # 78.53975
c.area = 100     # AttributeError: can't set attribute
```

### Delete Properties

You can also control deletion:

```python
class ManagedResource:
    def __init__(self):
        self._data = "important data"

    @property
    def data(self):
        return self._data

    @data.deleter
    def data(self):
        print("Cleaning up resource...")
        self._data = None

r = ManagedResource()
del r.data  # Prints: Cleaning up resource...
```

---

## Common Patterns and Idioms

### Validation in Setters

Always validate data before storing it:

```python
class User:
    def __init__(self, email, age):
        self.email = email  # Uses setter
        self.age = age      # Uses setter

    @property
    def email(self):
        return self._email

    @email.setter
    def email(self, value):
        if "@" not in value:
            raise ValueError("Invalid email address")
        self._email = value

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if not isinstance(value, int) or value < 0:
            raise ValueError("Age must be a positive integer")
        self._age = value
```

### Lazy Initialization

Compute expensive values only when first accessed:

```python
class DataAnalyzer:
    def __init__(self, data):
        self._data = data
        self._statistics = None

    @property
    def statistics(self):
        if self._statistics is None:
            print("Computing statistics (expensive)...")
            self._statistics = {
                'mean': sum(self._data) / len(self._data),
                'max': max(self._data),
                'min': min(self._data)
            }
        return self._statistics

analyzer = DataAnalyzer([1, 2, 3, 4, 5])
# Statistics not computed yet
print(analyzer.statistics)  # Now computed
print(analyzer.statistics)  # Cached, not recomputed
```

### Encapsulating Collections

When returning mutable collections, return copies to prevent external modification:

```python
class Gradebook:
    def __init__(self):
        self._grades = {}

    def add_grade(self, student, grade):
        if student not in self._grades:
            self._grades[student] = []
        self._grades[student].append(grade)

    @property
    def grades(self):
        # Return a copy to prevent external modification
        return dict(self._grades)

    def get_student_grades(self, student):
        # Return a copy of the list
        return list(self._grades.get(student, []))
```

---

## Common Mistakes and Pitfalls

### Mistake 1: Using Properties Without Benefit

Don't create trivial getters/setters that add no value:

```python
# Unnecessary - just use a public attribute
class Point:
    def __init__(self, x, y):
        self._x = x
        self._y = y

    @property
    def x(self):
        return self._x

    @x.setter
    def x(self, value):
        self._x = value  # No validation, no logic - pointless!
```

**Fix:** Only use properties when you need validation, computation, or logging.

### Mistake 2: Inconsistent Access

Don't mix direct access and property access:

```python
class Account:
    def __init__(self, balance):
        self._balance = balance

    @property
    def balance(self):
        return self._balance

    def deposit(self, amount):
        self._balance += amount  # Direct access - bypasses any setter logic
```

**Fix:** Always use the property interface internally too:
```python
@balance.setter
def balance(self, value):
    if value < 0:
        raise ValueError("Balance cannot be negative")
    self._balance = value

def deposit(self, amount):
    self.balance = self.balance + amount  # Uses property
```

### Mistake 3: Exposing Internal Implementation

```python
class TodoList:
    def __init__(self):
        self._items = []

    def get_items(self):
        return self._items  # DANGER: returns actual list!

todo = TodoList()
items = todo.get_items()
items.append("Hacked!")  # Modifies internal state!
```

**Fix:** Return copies or use immutable types.

---

## Best Practices

1. **Start public, add protection as needed:** Don't over-engineer. Make attributes public until you need validation or computation.

2. **Use `_single_underscore` for internal APIs:** This signals "internal use" without the complexity of name mangling.

3. **Reserve `__double_underscore` for name collision prevention:** Use it sparingly, mainly in inheritance hierarchies.

4. **Properties should be cheap:** Getting a property shouldn't trigger expensive operations (use methods for that).

5. **Document your interface:** Make it clear which attributes and methods are meant for external use.

6. **Be consistent:** If one attribute uses a property, similar attributes probably should too.

---

## Real-World Applications

**Configuration Management:**
```python
class Config:
    def __init__(self):
        self._debug = False
        self._log_level = "INFO"

    @property
    def debug(self):
        return self._debug

    @debug.setter
    def debug(self, value):
        self._debug = value
        if value:
            self._log_level = "DEBUG"  # Auto-adjust related setting
```

**Data Validation in APIs:**
```python
class APIRequest:
    @property
    def headers(self):
        return dict(self._headers)  # Defensive copy

    def add_header(self, key, value):
        if not key.strip():
            raise ValueError("Header key cannot be empty")
        self._headers[key] = value
```

**ORM Models (like Django/SQLAlchemy):**
```python
class User:
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    @property
    def is_admin(self):
        return "admin" in self._roles
```

---

## Further Exploration

- **Descriptors:** The mechanism behind `@property`. Learn `__get__`, `__set__`, `__delete__`.
- **Data Classes with field():** Use `field(repr=False)` for encapsulation in dataclasses.
- **Abstract Properties:** Combine `@property` with `@abstractmethod` for interface contracts.
- **`__slots__`:** Restrict what attributes can be added to instances for memory efficiency and safety.
