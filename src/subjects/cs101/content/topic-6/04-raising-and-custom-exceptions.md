## Raising Exceptions: Signaling Errors Yourself

So far we've handled exceptions raised by Python. But you can also **raise** exceptions yourself when your code detects a problem. This is essential for writing functions that communicate errors clearly to their callers. Well-placed exceptions make bugs surface early and error messages meaningful.

---

## The `raise` Statement

Use `raise` to signal that something has gone wrong:

```python
def set_age(age):
    if age < 0:
        raise ValueError("Age cannot be negative")
    return age

# Usage
set_age(25)   # Works fine
set_age(-5)   # Raises: ValueError: Age cannot be negative
```

The `raise` statement immediately stops the function and propagates the exception to the caller. The caller can then handle it or let it propagate further.

### Syntax

```python
raise ExceptionType("error message")
```

Choose an appropriate exception type and provide a clear message:

```python
def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero")
    return a / b

def get_item(items, index):
    if index < 0 or index >= len(items):
        raise IndexError(f"Index {index} out of range [0, {len(items)})")
    return items[index]
```

---

## Why Raise Exceptions?

### 1. Fail Fast and Loud

Raising exceptions makes problems visible immediately:

```python
def process_data(data):
    if data is None:
        raise ValueError("data cannot be None")
    # Process data...

# Without the check, you might get a confusing error later
# AttributeError: 'NoneType' object has no attribute 'items'
# With the check, you get a clear error at the source
```

### 2. Validate Preconditions

Document and enforce what your function expects:

```python
def calculate_average(numbers):
    if not numbers:
        raise ValueError("Cannot calculate average of empty list")
    return sum(numbers) / len(numbers)
```

### 3. Communicate to Callers

Exceptions tell callers exactly what went wrong:

```python
def withdraw(account, amount):
    if amount <= 0:
        raise ValueError("Withdrawal amount must be positive")
    if amount > account.balance:
        raise ValueError(f"Insufficient funds: tried to withdraw {amount}, balance is {account.balance}")
    account.balance -= amount
```

---

## Choosing Exception Types

Use built-in exceptions that match the problem:

| Exception | When to Use |
|-----------|------------|
| `ValueError` | Correct type but invalid value |
| `TypeError` | Wrong type passed |
| `KeyError` | Expected dictionary key missing |
| `IndexError` | Index out of range |
| `RuntimeError` | Generic runtime problem |
| `NotImplementedError` | Method not yet implemented |

```python
def parse_email(email):
    if not isinstance(email, str):
        raise TypeError(f"email must be a string, got {type(email).__name__}")
    if "@" not in email:
        raise ValueError(f"Invalid email format: {email}")
    return email.split("@")

def connect(host, port):
    if port < 1 or port > 65535:
        raise ValueError(f"Port must be 1-65535, got {port}")
```

### When in Doubt, Use `ValueError`

`ValueError` is the most common choice for "the input doesn't make sense":

```python
def set_volume(level):
    if not 0 <= level <= 100:
        raise ValueError(f"Volume must be 0-100, got {level}")
```

---

## Custom Exceptions

When built-in exceptions aren't specific enough, create your own:

```python
class InvalidEmailError(Exception):
    """Raised when an email address is invalid."""
    pass

class InsufficientFundsError(Exception):
    """Raised when a withdrawal exceeds the balance."""
    pass
```

### Creating Custom Exceptions

Custom exceptions inherit from `Exception`:

```python
class ValidationError(Exception):
    """Base class for validation errors."""
    pass

class InvalidUsernameError(ValidationError):
    """Raised when a username doesn't meet requirements."""
    pass

class InvalidPasswordError(ValidationError):
    """Raised when a password doesn't meet requirements."""
    pass
```

### Using Custom Exceptions

```python
def validate_username(username):
    if len(username) < 3:
        raise InvalidUsernameError("Username must be at least 3 characters")
    if not username.isalnum():
        raise InvalidUsernameError("Username must be alphanumeric")
    return username

def validate_password(password):
    if len(password) < 8:
        raise InvalidPasswordError("Password must be at least 8 characters")
    if not any(c.isdigit() for c in password):
        raise InvalidPasswordError("Password must contain at least one digit")
    return password
```

### Catching Custom Exceptions

Custom exceptions let callers handle specific error types:

```python
try:
    validate_username(username)
    validate_password(password)
    create_account(username, password)
except InvalidUsernameError as e:
    print(f"Username problem: {e}")
except InvalidPasswordError as e:
    print(f"Password problem: {e}")
except ValidationError as e:
    # Catches any validation error
    print(f"Validation failed: {e}")
```

---

## Adding Data to Exceptions

Custom exceptions can carry additional data:

```python
class HTTPError(Exception):
    """Exception for HTTP errors with status code."""

    def __init__(self, message, status_code):
        super().__init__(message)
        self.status_code = status_code

class InsufficientFundsError(Exception):
    """Raised when withdrawal exceeds balance."""

    def __init__(self, requested, available):
        message = f"Requested {requested}, but only {available} available"
        super().__init__(message)
        self.requested = requested
        self.available = available
```

Using exceptions with data:

```python
try:
    response = fetch_url(url)
except HTTPError as e:
    if e.status_code == 404:
        print("Page not found")
    elif e.status_code == 500:
        print("Server error")

try:
    withdraw(account, 1000)
except InsufficientFundsError as e:
    shortfall = e.requested - e.available
    print(f"Need {shortfall} more to complete withdrawal")
```

---

## Re-raising Exceptions

Sometimes you want to catch an exception, do something, and then re-raise it:

```python
def process_file(path):
    try:
        with open(path) as f:
            return parse(f.read())
    except FileNotFoundError:
        print(f"Warning: {path} not found")
        raise  # Re-raise the same exception
```

Use bare `raise` to preserve the original traceback. Don't do `raise e` - that loses traceback information.

### Chaining Exceptions

Python 3 supports exception chaining to show the original cause:

```python
def load_config(path):
    try:
        with open(path) as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        raise ConfigError(f"Invalid config file: {path}") from e
```

This produces a traceback showing both exceptions:

```
Traceback (most recent call last):
  File "...", line 4, in load_config
    return json.load(f)
json.JSONDecodeError: Expecting value: line 1 column 1

The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "...", line 10, in main
    config = load_config("config.json")
ConfigError: Invalid config file: config.json
```

---

## Exception Best Practices

### Raise Early, Handle Late

Detect problems as soon as possible, but handle them at the right level:

```python
def validate_order(order):
    # Raise early: detect problems immediately
    if not order.items:
        raise ValueError("Order must have at least one item")
    if order.total < 0:
        raise ValueError("Order total cannot be negative")

def process_order(order):
    validate_order(order)  # Let exceptions propagate
    # ... process ...

def handle_order_request(order):
    # Handle late: at the appropriate level
    try:
        process_order(order)
        return {"status": "success"}
    except ValueError as e:
        return {"status": "error", "message": str(e)}
```

### Use Specific Exceptions

The more specific the exception, the better the error handling:

```python
# Too generic - hard to handle differently
raise Exception("Something went wrong")

# Better - caller can handle specifically
raise InvalidEmailError("Email must contain @")
raise DuplicateUserError(f"User {username} already exists")
```

### Include Helpful Messages

Exception messages should help fix the problem:

```python
# Unhelpful
raise ValueError("Invalid input")

# Helpful
raise ValueError(f"Expected positive integer, got {value!r}")
raise ValueError(f"Port must be 1-65535, got {port}")
```

### Don't Use Exceptions for Flow Control

Exceptions are for exceptional situations, not normal program flow:

```python
# Bad: using exception for normal flow
def find_user(users, name):
    for user in users:
        if user.name == name:
            raise UserFound(user)  # Don't do this!

# Good: return normally
def find_user(users, name):
    for user in users:
        if user.name == name:
            return user
    return None
```

---

## Key Takeaways

- Use `raise` to signal errors your code detects
- Choose exception types that match the problem (`ValueError`, `TypeError`, etc.)
- Create **custom exceptions** for domain-specific errors
- Custom exceptions can carry **additional data** like error codes
- Use bare `raise` to re-raise and preserve tracebacks
- Use `raise ... from e` to chain exceptions
- **Raise early** (detect problems immediately) and **handle late** (at the right level)
- Include **helpful messages** that explain what went wrong and how to fix it

