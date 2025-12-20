## Integers (int)

Integers are whole numbers without decimal points. They can be positive, negative, or zero. In Python, integers are one of the most commonly used data types, perfect for counting, indexing, and any situation requiring exact whole number values.

```python
count = 42
negative = -17
zero = 0
big_number = 1_000_000  # Underscores improve readability

print(type(count))  # Output: <class 'int'>
```

### Integer Features

Python integers have **unlimited precision** - they can be as large as your computer's memory allows. This sets Python apart from languages like C or Java, which have fixed-size integers that can overflow:

```python
# Python handles arbitrarily large integers
huge = 12345678901234567890123456789
print(huge)  # Works perfectly!

# Calculate a large factorial - no overflow!
import math
print(math.factorial(100))  # A 158-digit number!

# In many other languages, this would cause overflow errors
big_product = 2 ** 1000  # 2 raised to the 1000th power - still works!
```

### Integer Operations

Python provides all standard arithmetic operators for integers:

```python
a = 15
b = 4

# Basic arithmetic
print(a + b)   # Addition: 19
print(a - b)   # Subtraction: 11
print(a * b)   # Multiplication: 60

# Division operations - pay attention to these!
print(a / b)   # True division: 3.75 (always returns float!)
print(a // b)  # Floor division: 3 (rounds down to integer)
print(a % b)   # Modulo (remainder): 3

# Exponentiation
print(a ** b)  # Power: 50625 (15⁴)

# Compound assignment operators
x = 10
x += 5   # Same as x = x + 5, now x is 15
x -= 3   # Same as x = x - 3, now x is 12
x *= 2   # Same as x = x * 2, now x is 24
x //= 4  # Same as x = x // 4, now x is 6
```

### Floor Division and Modulo

The floor division (`//`) and modulo (`%`) operators are especially useful:

```python
# Floor division always rounds DOWN (toward negative infinity)
print(17 // 5)    # 3
print(-17 // 5)   # -4 (not -3! rounds toward negative infinity)

# Modulo gives the remainder
print(17 % 5)     # 2 (17 = 5*3 + 2)

# Practical uses
hours = 137 // 60    # Convert minutes to hours: 2
minutes = 137 % 60   # Remaining minutes: 17

# Check if a number is even or odd
number = 42
if number % 2 == 0:
    print("Even")
else:
    print("Odd")
```

These operations are related by the division algorithm: for any integers $a$ and $b$ (with $b \neq 0$):

$$a = b \times (a \mathbin{//} b) + (a \bmod b)$$

For example, with $a = 17$ and $b = 5$:

$$17 = 5 \times 3 + 2$$

### Integer Bases

Python can represent integers in different number bases:

```python
# Different representations of the same number (255)
decimal = 255
binary = 0b11111111    # Binary (base 2) - prefix 0b
octal = 0o377          # Octal (base 8) - prefix 0o
hexadecimal = 0xFF     # Hexadecimal (base 16) - prefix 0x

print(decimal == binary == octal == hexadecimal)  # True

# Convert to different string representations
print(bin(255))  # '0b11111111'
print(oct(255))  # '0o377'
print(hex(255))  # '0xff'

# Parse strings in different bases
print(int('1010', 2))   # 10 (binary to decimal)
print(int('FF', 16))    # 255 (hex to decimal)
```

---

## Floating-Point Numbers (float)

Floats are numbers with decimal points. They represent real numbers but with limited precision due to how computers store them internally using the IEEE 754 standard.

```python
price = 19.99
pi = 3.14159
scientific = 2.5e-3  # Scientific notation: 0.0025

print(type(price))  # Output: <class 'float'>
```

### Creating Floats

There are several ways to create float values:

```python
# Direct assignment
temperature = 98.6

# From integers (automatic conversion)
x = 5.0         # Explicitly a float
y = float(5)    # Convert integer to float

# Scientific notation: e means "times 10 to the power of"
speed_of_light = 3e8       # 3 × 10⁸ = 300,000,000
planck_constant = 6.626e-34  # 6.626 × 10⁻³⁴
avogadro = 6.022e23        # 6.022 × 10²³ (Avogadro's number)

print(speed_of_light)     # 300000000.0
print(planck_constant)    # 6.626e-34
```

### Float Precision Warning

**This is critical to understand**: Floats have limited precision due to how computers store them in binary. This can cause surprising results:

```python
# Precision issues with floats
print(0.1 + 0.2)         # 0.30000000000000004 (not exactly 0.3!)
print(0.1 + 0.2 == 0.3)  # False!

# Why? 0.1 cannot be represented exactly in binary floating-point
# It's like trying to write 1/3 in decimal: 0.333333...

# For comparisons, use a tolerance
def nearly_equal(a, b, tolerance=1e-9):
    return abs(a - b) < tolerance

print(nearly_equal(0.1 + 0.2, 0.3))  # True

# Or use math.isclose()
import math
print(math.isclose(0.1 + 0.2, 0.3))  # True

# For financial calculations, use the decimal module
from decimal import Decimal
print(Decimal('0.1') + Decimal('0.2'))  # 0.3 (exact)
```

### Float Operations

```python
x = 10.5
y = 3.0

# Arithmetic works the same as integers
print(x + y)   # 13.5
print(x - y)   # 7.5
print(x * y)   # 31.5
print(x / y)   # 3.5
print(x // y)  # 3.0 (floor division, but still returns a float!)
print(x % y)   # 1.5 (modulo works with floats too)
print(x ** y)  # 1157.625
```

### Useful Float Methods and Functions

```python
import math

x = 3.7

# Rounding
print(round(x))        # 4 (round to nearest integer)
print(round(x, 1))     # 3.7 (round to 1 decimal place)
print(math.floor(x))   # 3 (always round down)
print(math.ceil(x))    # 4 (always round up)
print(math.trunc(x))   # 3 (truncate toward zero)

# Other useful functions
print(abs(-3.5))       # 3.5 (absolute value)
print(math.sqrt(16))   # 4.0 (square root)
print(math.pow(2, 3))  # 8.0 (power, returns float)
```

### Special Float Values

Python floats can represent special mathematical values:

```python
import math

# Infinity
positive_inf = float('inf')
negative_inf = float('-inf')
print(positive_inf > 1e308)  # True
print(positive_inf + 1)      # inf (infinity plus anything is still infinity)
print(1 / positive_inf)      # 0.0

# Not a Number (NaN) - represents undefined results
nan = float('nan')
print(nan == nan)       # False! NaN is not equal to anything, including itself
print(math.isnan(nan))  # True - use this to check for NaN

# Check for infinity
print(math.isinf(positive_inf))  # True
print(math.isfinite(3.14))       # True
```

---

## Mixing Integers and Floats

When you combine integers and floats in operations, Python automatically converts to float (this is called "type promotion"):

```python
integer_val = 5
float_val = 2.0

result = integer_val + float_val
print(result)       # 7.0
print(type(result)) # <class 'float'>

# Division always returns float (even with integers)
print(10 / 2)       # 5.0 (not 5!)
print(type(10 / 2)) # <class 'float'>

# Use floor division for integer result
print(10 // 2)      # 5
print(type(10 // 2)) # <class 'int'>
```

---

## When to Use Each Type

| Situation | Use |
|-----------|-----|
| Counting items | `int` |
| Array indices | `int` |
| Measurements | `float` |
| Scientific calculations | `float` |
| Money (exact) | `Decimal` |
| Ratios and percentages | `float` |

---

## Key Takeaways

- **Integers** are whole numbers with unlimited precision in Python
- **Floats** are decimal numbers with limited precision (~15-17 significant digits)
- Division `/` always returns a float; use `//` for integer division
- Be careful with float precision in comparisons - use `math.isclose()` or a tolerance
- Use underscores in large numbers for readability: `1_000_000`
- Scientific notation uses `e`: `2.5e-3` means `0.0025`
- For exact decimal arithmetic (like money), use the `decimal` module
- When mixing ints and floats, the result is always a float
