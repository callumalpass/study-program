## Integers (int)

Integers are whole numbers without decimal points. They can be positive, negative, or zero.

```python
count = 42
negative = -17
zero = 0
big_number = 1_000_000  # Underscores improve readability

print(type(count))  # Output: <class 'int'>
```

### Integer Features

Python integers have **unlimited precision** - they can be as large as your computer's memory allows:

```python
# Python handles arbitrarily large integers
huge = 12345678901234567890123456789
print(huge)  # Works perfectly!

# Scientific calculations with big numbers
factorial_100 = 93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000
```

### Integer Operations

```python
a = 15
b = 4

# Basic arithmetic
print(a + b)   # Addition: 19
print(a - b)   # Subtraction: 11
print(a * b)   # Multiplication: 60

# Division operations
print(a / b)   # True division: 3.75 (always returns float!)
print(a // b)  # Floor division: 3 (rounds down to integer)
print(a % b)   # Modulo (remainder): 3

# Exponentiation
print(a ** b)  # Power: 50625 (15^4)
```

### Integer Bases

Python can represent integers in different bases:

```python
# Different representations of the same number
decimal = 255
binary = 0b11111111    # Binary (base 2)
octal = 0o377          # Octal (base 8)
hexadecimal = 0xFF     # Hexadecimal (base 16)

print(decimal == binary == octal == hexadecimal)  # True

# Convert to different string representations
print(bin(255))  # '0b11111111'
print(oct(255))  # '0o377'
print(hex(255))  # '0xff'
```

---

## Floating-Point Numbers (float)

Floats are numbers with decimal points. They represent real numbers but with limited precision.

```python
price = 19.99
pi = 3.14159
scientific = 2.5e-3  # Scientific notation: 0.0025

print(type(price))  # Output: <class 'float'>
```

### Scientific Notation

For very large or very small numbers, use scientific notation:

```python
# Scientific notation: e means "times 10 to the power of"
speed_of_light = 3e8       # 3 × 10^8 = 300,000,000
planck_constant = 6.626e-34  # 6.626 × 10^-34

print(speed_of_light)     # 300000000.0
print(planck_constant)    # 6.626e-34
```

### Float Precision Warning

Floats have limited precision due to how computers store them. This can cause surprising results:

```python
# Precision issues with floats
print(0.1 + 0.2)         # 0.30000000000000004 (not exactly 0.3!)
print(0.1 + 0.2 == 0.3)  # False!

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
print(x // y)  # 3.0 (floor division, but still a float!)
print(x % y)   # 1.5 (modulo works with floats too)
print(x ** y)  # 1157.625
```

### Special Float Values

Python floats can represent special mathematical values:

```python
import math

# Infinity
positive_inf = float('inf')
negative_inf = float('-inf')
print(positive_inf > 1e308)  # True

# Not a Number (NaN)
nan = float('nan')
print(nan == nan)  # False! NaN is not equal to anything, including itself
print(math.isnan(nan))  # True - use this to check for NaN
```

---

## Mixing Integers and Floats

When you combine integers and floats in operations, Python automatically converts to float:

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

## Key Takeaways

- **Integers** are whole numbers with unlimited precision
- **Floats** are decimal numbers with limited precision
- Division `/` always returns a float; use `//` for integer division
- Be careful with float precision in comparisons
- Use underscores in large numbers for readability: `1_000_000`
- Scientific notation uses `e`: `2.5e-3` means `0.0025`
