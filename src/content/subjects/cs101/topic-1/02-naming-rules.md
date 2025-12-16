## Variable Naming Rules

Python has specific rules for naming variables. Understanding these rules will help you write clean, readable code and avoid syntax errors. Good naming is one of the most important skills in programming - it makes your code self-documenting and easier for others (and your future self) to understand.

### The Three Rules for Valid Names

Python enforces three simple rules for variable names:

1. **Must start with a letter or underscore** - not a number
2. **Can only contain letters, numbers, and underscores** - no spaces, hyphens, or special characters
3. **Cannot be a reserved keyword** - Python reserves certain words for its own use

### Valid Variable Names

```python
# Valid variable names
user_name = "Bob"      # Snake case (recommended style)
userName = "Bob"       # Camel case (works but not preferred in Python)
_private = 42          # Can start with underscore
count2 = 10            # Can contain numbers (but not at start)
MAX_SIZE = 100         # All caps for constants
x = 5                  # Single letters work (but usually not recommended)
data_2024 = []         # Numbers anywhere except the start
```

### Invalid Variable Names

```python
# Invalid variable names - these will cause errors!
# 2count = 10          # Cannot start with a number
# user-name = "Bob"    # Cannot contain hyphens (looks like subtraction)
# class = "Math"       # Cannot use reserved keywords
# my variable = 5      # Cannot contain spaces
# user@email = "x"     # Cannot contain special characters
```

When you try to use an invalid name, Python raises a `SyntaxError`:

```python
# This causes: SyntaxError: invalid syntax
2count = 10
```

### Reserved Keywords

Python has 35 keywords that are reserved for the language itself. You cannot use these as variable names because Python uses them for control flow, logic, and other core language features:

```python
# These are all reserved keywords - don't use them as variable names:
# False, None, True, and, as, assert, async, await, break, class,
# continue, def, del, elif, else, except, finally, for, from, global,
# if, import, in, is, lambda, nonlocal, not, or, pass, raise, return,
# try, while, with, yield
```

You can programmatically check if a word is a keyword:

```python
import keyword

print(keyword.iskeyword('class'))  # True
print(keyword.iskeyword('name'))   # False

# List all keywords
print(keyword.kwlist)
```

---

## Python Naming Conventions (PEP 8)

**PEP 8** is Python's official style guide, maintained by the Python community. Following these conventions makes your code more readable and consistent with the broader Python ecosystem. While not enforced by the interpreter, following PEP 8 is considered a best practice.

### Variables and Functions: snake_case

Use lowercase words separated by underscores:

```python
# Good - snake_case (Pythonic)
user_name = "Alice"
total_count = 42
is_valid = True
max_retry_attempts = 3

def calculate_total():
    pass

def get_user_by_id(user_id):
    pass

# Avoid - camelCase or PascalCase for variables
userName = "Alice"      # Works but not Pythonic
TotalCount = 42         # Reserved for class names
```

### Constants: UPPER_SNAKE_CASE

Constants are values that shouldn't change during program execution. While Python doesn't enforce immutability, using uppercase signals intent:

```python
# Constants (values that shouldn't change)
MAX_CONNECTIONS = 100
PI = 3.14159
DEFAULT_TIMEOUT = 30
DATABASE_URL = "localhost:5432"
SECONDS_PER_HOUR = 3600
```

### Private Variables: Leading Underscore

Python doesn't have true private variables, but naming conventions signal intent:

```python
# Single underscore: "internal use" hint to other programmers
_internal_cache = {}
_helper_function = lambda x: x * 2

# Double underscore: triggers name mangling (advanced, for classes)
class MyClass:
    __private_value = "secret"  # Becomes _MyClass__private_value
```

---

## Best Practices for Naming

### 1. Use Descriptive Names

Variable names should describe what they contain, not how they're used:

```python
# Bad - unclear what these represent
x = 25
n = "Alice"
t = 98.6
d = {}

# Good - clear and descriptive
user_age = 25
user_name = "Alice"
body_temperature_fahrenheit = 98.6
employee_records = {}
```

The extra typing pays off in readability. Code is read far more often than it's written.

### 2. Be Consistent

Pick a naming style and stick with it throughout your project. Inconsistency creates confusion:

```python
# Consistent naming - easy to follow
first_name = "Alice"
last_name = "Smith"
email_address = "alice@example.com"
phone_number = "555-1234"

# Inconsistent - confusing and error-prone
firstName = "Alice"
last_name = "Smith"
EmailAddress = "alice@example.com"
phoneNum = "555-1234"
```

### 3. Avoid Single Letters (Except for Loops)

Single-letter variables are acceptable in specific contexts but should be avoided elsewhere:

```python
# Acceptable - conventional loop counters
for i in range(10):
    print(i)

for x, y in coordinates:
    print(f"Point: ({x}, {y})")

# Mathematical formulas where convention applies
area = pi * r ** 2  # 'r' for radius is conventional

# Not recommended for general variables
a = calculate_something()  # What does 'a' represent?
```

### 4. Don't Shadow Built-ins

Python has many built-in functions. Using their names as variables breaks access to them:

```python
# Bad - shadows built-in functions
list = [1, 2, 3]       # Now you can't use list()
str = "hello"          # Now you can't use str()
type = "admin"         # Now you can't use type()
id = 12345             # Now you can't use id()
input = "data"         # Now you can't use input()

# Good - use descriptive alternatives
items = [1, 2, 3]
message = "hello"
user_type = "admin"
user_id = 12345
user_input = "data"
```

If you accidentally shadow a built-in, you can recover it:

```python
list = [1, 2, 3]  # Shadowed
del list          # Remove the shadow
list()            # Built-in works again
```

### 5. Consider Name Length

Names should be long enough to be descriptive but not so long they're cumbersome:

```python
# Too short - unclear
fn = "Alice"
ct = 42

# Too long - cumbersome
the_first_name_of_the_current_user = "Alice"
total_count_of_items_in_shopping_cart = 42

# Just right - clear and concise
first_name = "Alice"
cart_item_count = 42
```

### 6. Use Meaningful Prefixes

Prefixes can add context and prevent naming collisions:

```python
# Boolean variables often start with is_, has_, can_, should_
is_active = True
has_permission = False
can_edit = True
should_retry = False

# Counts often end with _count
user_count = 150
error_count = 3

# Collections often use plural nouns
users = []
email_addresses = {}
```

---

## Key Takeaways

- Variable names can contain letters, numbers, and underscores
- Names cannot start with a number or contain spaces/hyphens
- Use `snake_case` for variables and functions (PEP 8 standard)
- Use `UPPER_SNAKE_CASE` for constants
- Choose descriptive names that explain the variable's purpose
- Don't use Python reserved keywords or built-in function names
- Consistent naming across your project improves readability
- Single-letter names are acceptable only for loop counters and mathematical conventions
- Name length should balance clarity with conciseness
