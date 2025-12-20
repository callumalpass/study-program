## Properties: The `@property` Decorator

The `@property` decorator is Python's elegant solution for controlled attribute access. It lets you define methods that behave like attributes, providing the flexibility of methods with the clean syntax of direct access.

---

## Why Properties?

Consider this evolution:

### Version 1: Direct Attribute
```python
class Circle:
    def __init__(self, radius):
        self.radius = radius

c = Circle(5)
print(c.radius)  # 5
c.radius = 10
```

### Version 2: Oh no, we need validation!
```python
# Option A: Break all existing code
class Circle:
    def get_radius(self):
        return self._radius

    def set_radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

# All code must change from c.radius to c.get_radius()
```

### Version 3: Properties to the rescue!
```python
class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

# Existing code still works!
c = Circle(5)
print(c.radius)  # 5
c.radius = 10    # Uses setter with validation
```

---

## Anatomy of a Property

A complete property has three parts:

```python
class Temperature:
    def __init__(self, celsius):
        self._celsius = celsius

    @property
    def celsius(self):
        """Getter: called when you read the attribute"""
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        """Setter: called when you assign to the attribute"""
        if value < -273.15:
            raise ValueError("Temperature below absolute zero!")
        self._celsius = value

    @celsius.deleter
    def celsius(self):
        """Deleter: called when you delete the attribute"""
        print("Resetting temperature...")
        self._celsius = 0
```

Usage:
```python
temp = Temperature(25)
print(temp.celsius)      # Getter: 25

temp.celsius = 30        # Setter with validation
temp.celsius = -300      # Raises ValueError!

del temp.celsius         # Deleter: prints message, resets to 0
```

---

## Getter-Only Properties

Omit the setter to create read-only attributes:

```python
class Person:
    def __init__(self, first_name, last_name):
        self._first_name = first_name
        self._last_name = last_name

    @property
    def full_name(self):
        """Read-only computed property"""
        return f"{self._first_name} {self._last_name}"

p = Person("Alice", "Smith")
print(p.full_name)      # "Alice Smith"
p.full_name = "Bob"     # AttributeError: can't set attribute
```

---

## Computed Properties

Properties can compute values on demand:

```python
class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    @property
    def area(self):
        return self.width * self.height

    @property
    def perimeter(self):
        return 2 * (self.width + self.height)

    @property
    def is_square(self):
        return self.width == self.height

rect = Rectangle(4, 5)
print(rect.area)       # 20 (computed)
print(rect.perimeter)  # 18 (computed)
print(rect.is_square)  # False
```

---

## Properties with Validation

The most common use case—validate before storing:

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
        if "@" not in value or "." not in value:
            raise ValueError("Invalid email address")
        self._email = value.lower()  # Normalize

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if not isinstance(value, int) or value < 0:
            raise ValueError("Age must be a positive integer")
        self._age = value

# Validation happens automatically
user = User("Alice@Example.com", 25)
print(user.email)  # "alice@example.com" (normalized)

user.age = -5      # Raises ValueError
user.email = "bad" # Raises ValueError
```

---

## Interdependent Properties

Properties can depend on and modify each other:

```python
class Temperature:
    def __init__(self, celsius=0):
        self._celsius = celsius

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32

    @fahrenheit.setter
    def fahrenheit(self, value):
        self._celsius = (value - 32) * 5/9

    @property
    def kelvin(self):
        return self._celsius + 273.15

# Set in any unit, read in any unit
temp = Temperature()
temp.celsius = 100
print(temp.fahrenheit)  # 212.0
print(temp.kelvin)      # 373.15

temp.fahrenheit = 32
print(temp.celsius)     # 0.0
```

---

## The `property()` Function

`@property` is syntactic sugar for the `property()` function:

```python
class Circle:
    def __init__(self, radius):
        self._radius = radius

    def _get_radius(self):
        return self._radius

    def _set_radius(self, value):
        self._radius = value

    # Equivalent to using @property decorator
    radius = property(_get_radius, _set_radius)
```

The decorator syntax is cleaner for most cases.

---

## When to Use Properties

### Good Uses:
- **Validation:** Ensure values are valid before storing
- **Computed attributes:** Values derived from other attributes
- **Lazy loading:** Expensive computations deferred until needed
- **API compatibility:** Adding logic without changing interface

### Avoid When:
- **Expensive operations:** Properties should feel like attribute access (fast)
- **Side effects:** Properties shouldn't do unexpected things like network calls
- **No benefit:** Don't wrap attributes that need no logic

```python
# UNNECESSARY - just use a plain attribute
class Point:
    def __init__(self, x, y):
        self._x = x

    @property
    def x(self):
        return self._x

    @x.setter
    def x(self, value):
        self._x = value  # No validation, no logic - pointless!
```

---

## Key Takeaways

- `@property` creates methods that behave like attributes
- Use getter-only properties for read-only/computed values
- Add setter with `@name.setter` for validation
- Properties maintain backward compatibility when adding logic
- Keep properties fast—expensive operations should be methods
- Don't create trivial properties that add no value
