## Variable Naming Rules

Python has specific rules for naming variables. Understanding these rules will help you write clean, readable code and avoid syntax errors.

### Valid Variable Names

```python
# Valid variable names
user_name = "Bob"      # Snake case (recommended style)
userName = "Bob"       # Camel case (works but not preferred in Python)
_private = 42          # Can start with underscore
count2 = 10            # Can contain numbers (but not at start)
MAX_SIZE = 100         # All caps for constants
```

### Invalid Variable Names

```python
# Invalid variable names - these will cause errors!
# 2count = 10          # Cannot start with a number
# user-name = "Bob"    # Cannot contain hyphens
# class = "Math"       # Cannot use reserved keywords
# my variable = 5      # Cannot contain spaces
```

### Reserved Keywords

Python has keywords that are reserved for the language itself. You cannot use these as variable names:

```python
# These are all reserved keywords - don't use them as variable names:
# and, as, assert, async, await, break, class, continue, def, del,
# elif, else, except, False, finally, for, from, global, if, import,
# in, is, lambda, None, nonlocal, not, or, pass, raise, return,
# True, try, while, with, yield
```

You can check if a word is a keyword:

```python
import keyword
print(keyword.iskeyword('class'))  # True
print(keyword.iskeyword('name'))   # False
```

---

## Python Naming Conventions (PEP 8)

**PEP 8** is Python's official style guide. Following these conventions makes your code more readable and consistent with the broader Python community.

### Variables and Functions: snake_case

```python
# Good - snake_case
user_name = "Alice"
total_count = 42
is_valid = True

def calculate_total():
    pass

# Avoid - camelCase or PascalCase for variables
userName = "Alice"      # Works but not Pythonic
TotalCount = 42         # Reserved for class names
```

### Constants: UPPER_SNAKE_CASE

```python
# Constants (values that shouldn't change)
MAX_CONNECTIONS = 100
PI = 3.14159
DEFAULT_TIMEOUT = 30
DATABASE_URL = "localhost:5432"
```

### Private Variables: Leading Underscore

```python
# Single underscore: "internal use" hint
_internal_cache = {}

# Double underscore: name mangling (advanced)
__private_value = "secret"
```

---

## Best Practices for Naming

### 1. Use Descriptive Names

```python
# Bad - unclear what these represent
x = 25
n = "Alice"
t = 98.6

# Good - clear and descriptive
user_age = 25
user_name = "Alice"
body_temperature = 98.6
```

### 2. Be Consistent

Pick a naming style and stick with it throughout your project:

```python
# Consistent naming
first_name = "Alice"
last_name = "Smith"
email_address = "alice@example.com"

# Inconsistent - avoid this
firstName = "Alice"
last_name = "Smith"
EmailAddress = "alice@example.com"
```

### 3. Avoid Single Letters (Except for Loops)

```python
# Acceptable - loop counters
for i in range(10):
    print(i)

for x, y in coordinates:
    print(f"Point: ({x}, {y})")

# Not recommended for general variables
a = calculate_something()  # What does 'a' represent?
```

### 4. Don't Shadow Built-ins

```python
# Bad - shadows built-in functions
list = [1, 2, 3]       # Now you can't use list()
str = "hello"          # Now you can't use str()
type = "admin"         # Now you can't use type()

# Good - use descriptive alternatives
items = [1, 2, 3]
message = "hello"
user_type = "admin"
```

---

## Key Takeaways

- Variable names can contain letters, numbers, and underscores
- Names cannot start with a number or contain spaces/hyphens
- Use `snake_case` for variables and functions (PEP 8)
- Use `UPPER_SNAKE_CASE` for constants
- Choose descriptive names that explain the variable's purpose
- Don't use Python reserved keywords or built-in function names
