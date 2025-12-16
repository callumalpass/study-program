## Docstrings (Function Documentation)

A **docstring** is a string that documents what a function does. It appears as the first statement in a function and is accessible via `help()` and IDE tooltips. Well-documented functions are easier to use and maintain.

---

## Basic Docstring Syntax

A docstring is a string literal (usually triple-quoted) that immediately follows the function definition:

```python
def calculate_area(width, height):
    """Calculate the area of a rectangle."""
    return width * height

def greet(name):
    """Return a greeting message for the given name."""
    return f"Hello, {name}!"
```

### Accessing Docstrings

```python
help(calculate_area)
# Output:
# Help on function calculate_area:
# calculate_area(width, height)
#     Calculate the area of a rectangle.

print(calculate_area.__doc__)
# "Calculate the area of a rectangle."
```

IDEs also display docstrings when you hover over function calls.

---

## Multi-Line Docstrings

For more complex functions, use a multi-line docstring that describes parameters, return values, and behavior:

```python
def calculate_bmi(weight_kg, height_m):
    """
    Calculate Body Mass Index (BMI).

    BMI is calculated as weight in kilograms divided by height
    in meters squared.

    Args:
        weight_kg: Weight in kilograms (must be positive)
        height_m: Height in meters (must be positive)

    Returns:
        BMI value as a float

    Raises:
        ValueError: If weight or height is not positive

    Example:
        >>> calculate_bmi(70, 1.75)
        22.857142857142858
    """
    if weight_kg <= 0 or height_m <= 0:
        raise ValueError("Weight and height must be positive")
    return weight_kg / (height_m ** 2)
```

### Common Docstring Sections

| Section | Purpose |
|---------|---------|
| Summary | One-line description (first line) |
| Extended description | More detail about behavior |
| Args/Parameters | Document each parameter |
| Returns | What the function returns |
| Raises | Exceptions the function may raise |
| Example | Usage examples |
| Notes | Additional information |

---

## Docstring Styles

Several conventions exist for formatting docstrings. Pick one and be consistent.

### Google Style

```python
def fetch_data(url, timeout=30):
    """Fetch data from a URL.

    Args:
        url: The URL to fetch from.
        timeout: Request timeout in seconds. Defaults to 30.

    Returns:
        The response body as a string.

    Raises:
        ConnectionError: If the URL is unreachable.
        TimeoutError: If the request exceeds the timeout.
    """
    pass
```

### NumPy Style

```python
def fetch_data(url, timeout=30):
    """
    Fetch data from a URL.

    Parameters
    ----------
    url : str
        The URL to fetch from.
    timeout : int, optional
        Request timeout in seconds (default is 30).

    Returns
    -------
    str
        The response body as a string.

    Raises
    ------
    ConnectionError
        If the URL is unreachable.
    """
    pass
```

### reStructuredText Style

```python
def fetch_data(url, timeout=30):
    """Fetch data from a URL.

    :param url: The URL to fetch from.
    :type url: str
    :param timeout: Request timeout in seconds.
    :type timeout: int
    :returns: The response body as a string.
    :rtype: str
    :raises ConnectionError: If the URL is unreachable.
    """
    pass
```

---

## Naming and Design Guidelines

Good function names make code self-documenting. Combined with docstrings, they make functions easy to understand and use.

### Use Verb-Based Names

Functions *do* things, so their names should be verbs or verb phrases:

```python
# Good: action-oriented names
def calculate_total(items):
    pass

def validate_email(email):
    pass

def send_notification(user, message):
    pass

def is_valid_password(password):
    pass  # 'is_' prefix for boolean returns

def get_user_by_id(user_id):
    pass  # 'get_' for retrieval functions

# Bad: noun-only names (what does it DO?)
def total(items):
    pass

def email(address):
    pass
```

### Keep Parameters Minimal

Too many parameters make functions hard to use:

```python
# Hard to use: what order? what do they mean?
def create_user(name, email, age, city, country, role, active, verified):
    pass

# Better: use a dictionary or data class
def create_user(user_data):
    """
    Create a user from a dictionary.

    Args:
        user_data: Dict with keys 'name', 'email', and optional
                   'age', 'city', 'country', 'role', 'active', 'verified'
    """
    pass

# Or use keyword arguments with defaults
def create_user(name, email, *, age=None, city=None, role="user"):
    pass
```

---

## Type Hints (Optional, but Helpful)

Type hints describe the expected types of parameters and return values. Python doesn't enforce them at runtime, but tools like IDEs and type checkers use them.

### Basic Type Hints

```python
def greet(name: str) -> str:
    return f"Hello, {name}!"

def add(a: int, b: int) -> int:
    return a + b

def is_adult(age: int) -> bool:
    return age >= 18
```

The syntax is:
- `parameter: type` for parameters
- `-> type` for return values

### Common Types

```python
from typing import Optional, Union

def process_number(n: int) -> float:
    return n * 1.5

def process_text(s: str) -> str:
    return s.upper()

def process_flag(flag: bool) -> None:
    if flag:
        print("Flag is set")

def process_list(items: list[int]) -> int:
    return sum(items)

def process_dict(data: dict[str, int]) -> list[str]:
    return list(data.keys())
```

### `Optional` and `Union`

```python
from typing import Optional, Union

# Optional: can be the type OR None
def find_user(user_id: int) -> Optional[dict]:
    """Return user dict or None if not found."""
    pass

# Union: can be one of several types
def process(value: Union[int, str]) -> str:
    return str(value)

# Python 3.10+ allows | for Union
def process(value: int | str) -> str:
    return str(value)
```

### Type Hints with Default Values

```python
def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}!"

def repeat(text: str, times: int = 1) -> str:
    return text * times
```

---

## Type Hints for Complex Types

```python
from typing import Callable, Iterable

# Function that takes a function as argument
def apply_twice(func: Callable[[int], int], value: int) -> int:
    return func(func(value))

# Function that takes any iterable
def first_item(items: Iterable[str]) -> str:
    return next(iter(items))

# Type alias for readability
UserId = int
UserDict = dict[str, str]

def get_user(user_id: UserId) -> UserDict:
    pass
```

---

## Benefits of Type Hints

### IDE Support

With type hints, your IDE can:
- Autocomplete method names
- Warn about type mismatches
- Show parameter types on hover

### Static Type Checking

Tools like `mypy` catch type errors before runtime:

```python
def add(a: int, b: int) -> int:
    return a + b

result = add("hello", "world")  # mypy error: expected int, got str
```

### Self-Documentation

Type hints serve as documentation that stays in sync with the code:

```python
def fetch_users(active_only: bool = True) -> list[dict[str, str]]:
    """Fetch users from database."""
    pass

# The signature tells you: returns a list of dicts with string keys and values
```

---

## Combining Docstrings and Type Hints

Use both for maximum clarity:

```python
def calculate_discount(price: float, discount_percent: float) -> float:
    """
    Calculate the discounted price.

    Args:
        price: Original price in dollars
        discount_percent: Discount as a percentage (0-100)

    Returns:
        The price after applying the discount

    Example:
        >>> calculate_discount(100.0, 20)
        80.0
    """
    return price * (1 - discount_percent / 100)
```

Type hints show *what types*, docstrings explain *what it means*.

---

## Key Takeaways

- Docstrings document what functions do; write them for any non-trivial function
- Use triple-quoted strings immediately after the function definition
- Include: summary, parameters, return value, exceptions, examples
- Choose a docstring style (Google, NumPy, reST) and be consistent
- Name functions with verbs: `calculate_`, `get_`, `is_`, `validate_`
- Type hints specify expected types: `def func(x: int) -> str`
- Type hints enable better IDE support and static type checking
- Combine docstrings and type hints for the clearest documentation

