---
title: "Floating-Point Representation"
description: "Understanding how computers represent real numbers using floating-point arithmetic and the IEEE 754 standard"
---

# Floating-Point Representation

Floating-point representation is the foundation of numerical computation, determining how computers store and manipulate real numbers with finite precision.

## The IEEE 754 Standard

The IEEE 754 standard defines the most widely used floating-point representation. A floating-point number is represented as:

$$x = \pm m \times \beta^e$$

where:
- $m$ is the **mantissa** (or significand)
- $\beta$ is the **base** (typically 2)
- $e$ is the **exponent**

### Single Precision (32-bit)

Single precision uses 32 bits divided as:
- 1 bit for sign
- 8 bits for exponent (biased by 127)
- 23 bits for mantissa (with implicit leading 1)

The value is computed as:

$$x = (-1)^s \times 1.f \times 2^{e-127}$$

where $s$ is the sign bit, $f$ is the fractional part, and $e$ is the biased exponent.

**Range**: Approximately $10^{-38}$ to $10^{38}$

**Machine epsilon**: $\epsilon \approx 2^{-23} \approx 5.96 \times 10^{-8}$

### Double Precision (64-bit)

Double precision uses 64 bits:
- 1 bit for sign
- 11 bits for exponent (biased by 1023)
- 52 bits for mantissa

$$x = (-1)^s \times 1.f \times 2^{e-1023}$$

**Range**: Approximately $10^{-308}$ to $10^{308}$

**Machine epsilon**: $\epsilon \approx 2^{-52} \approx 2.22 \times 10^{-16}$

## Machine Epsilon

Machine epsilon ($\epsilon_{mach}$) is the smallest positive number such that:

$$fl(1 + \epsilon_{mach}) > 1$$

where $fl(x)$ denotes the floating-point representation of $x$.

For a binary system with $p$ bits of precision:

$$\epsilon_{mach} = 2^{-(p-1)}$$

Machine epsilon characterizes the relative precision of floating-point arithmetic.

## Normalized and Denormalized Numbers

### Normalized Numbers

Normal floating-point numbers have an implicit leading 1 in the mantissa:

$$x = (-1)^s \times 1.bbbb... \times 2^e$$

This maximizes precision by ensuring the most significant bit is always 1.

### Denormalized Numbers (Subnormals)

When the exponent field is zero, numbers are denormalized:

$$x = (-1)^s \times 0.bbbb... \times 2^{e_{min}}$$

Denormalized numbers fill the gap between zero and the smallest normalized number, providing **gradual underflow**.

## Special Values

IEEE 754 defines special bit patterns:

1. **Positive/Negative Zero**: Sign bit differs, exponent and mantissa are zero
2. **Positive/Negative Infinity**: Exponent all 1s, mantissa all 0s
3. **NaN (Not a Number)**: Exponent all 1s, mantissa non-zero
   - Quiet NaN: Most significant mantissa bit is 1
   - Signaling NaN: Most significant mantissa bit is 0

## Rounding Modes

IEEE 754 specifies five rounding modes:

1. **Round to nearest, ties to even** (default): Rounds to the nearest representable value; if exactly halfway, rounds to the value with an even least significant bit
2. **Round toward zero** (truncation): Rounds toward zero
3. **Round toward $+\infty$**: Rounds upward
4. **Round toward $-\infty$**: Rounds downward
5. **Round to nearest, ties away from zero**: Rounds to nearest; if halfway, rounds away from zero

The default mode minimizes bias in repeated operations.

## Representation Gaps

The gap between consecutive floating-point numbers varies with magnitude:

$$\text{gap}(x) = |x| \times \epsilon_{mach}$$

For a number near $2^k$, the gap is approximately $2^{k-52}$ (in double precision).

### Density Distribution

Floating-point numbers are:
- **Uniformly spaced** within each exponent range
- **Logarithmically distributed** across all exponents
- **Denser** near zero
- **Sparser** near the overflow threshold

## Python Implementation

```python
import numpy as np
import struct

def float_to_bits(f):
    """Convert a float to its bit representation."""
    s = struct.pack('>f', f)
    return struct.unpack('>l', s)[0]

def double_to_bits(d):
    """Convert a double to its bit representation."""
    s = struct.pack('>d', d)
    return struct.unpack('>q', s)[0]

def analyze_float(x, precision='double'):
    """Analyze the floating-point representation of a number."""
    if precision == 'single':
        bits = float_to_bits(np.float32(x))
        exp_bits = 8
        mant_bits = 23
        bias = 127
    else:  # double
        bits = double_to_bits(np.float64(x))
        exp_bits = 11
        mant_bits = 52
        bias = 1023

    # Extract components
    sign = (bits >> (exp_bits + mant_bits)) & 1
    exponent = (bits >> mant_bits) & ((1 << exp_bits) - 1)
    mantissa = bits & ((1 << mant_bits) - 1)

    # Interpret
    if exponent == 0:
        if mantissa == 0:
            value_type = "Zero"
            actual_exp = None
        else:
            value_type = "Denormalized"
            actual_exp = 1 - bias
    elif exponent == (1 << exp_bits) - 1:
        if mantissa == 0:
            value_type = "Infinity"
            actual_exp = None
        else:
            value_type = "NaN"
            actual_exp = None
    else:
        value_type = "Normalized"
        actual_exp = exponent - bias

    return {
        'sign': '-' if sign else '+',
        'exponent_bits': exponent,
        'exponent_actual': actual_exp,
        'mantissa_bits': mantissa,
        'type': value_type,
        'bits_total': bits
    }

# Machine epsilon calculation
def compute_machine_epsilon(precision='double'):
    """Compute machine epsilon experimentally."""
    if precision == 'single':
        dtype = np.float32
    else:
        dtype = np.float64

    eps = dtype(1.0)
    while dtype(1.0) + dtype(eps/2.0) != dtype(1.0):
        eps = dtype(eps / 2.0)

    return eps

# Demonstrate floating-point properties
def demonstrate_fp_properties():
    """Demonstrate key floating-point properties."""
    print("Machine Epsilon (Double):", np.finfo(np.float64).eps)
    print("Machine Epsilon (Single):", np.finfo(np.float32).eps)
    print("Computed Epsilon (Double):", compute_machine_epsilon('double'))
    print("Computed Epsilon (Single):", compute_machine_epsilon('single'))
    print()

    # Analyze some numbers
    test_values = [1.0, 0.1, -5.5, 0.0, np.inf, np.nan]
    for val in test_values:
        print(f"\nAnalyzing {val}:")
        result = analyze_float(val)
        print(f"  Sign: {result['sign']}")
        print(f"  Type: {result['type']}")
        print(f"  Exponent (biased): {result['exponent_bits']}")
        print(f"  Exponent (actual): {result['exponent_actual']}")
        print(f"  Mantissa bits: {result['mantissa_bits']}")

# Gap between consecutive floats
def next_float(x, direction='up'):
    """Return the next representable float."""
    if direction == 'up':
        return np.nextafter(x, np.inf)
    else:
        return np.nextafter(x, -np.inf)

def analyze_gaps():
    """Analyze gaps between consecutive floating-point numbers."""
    test_points = [1.0, 10.0, 100.0, 1000.0, 1e10, 1e100]

    print("Gaps between consecutive floating-point numbers:")
    print(f"{'Value':<12} {'Next Up':<25} {'Gap':<15} {'Relative Gap'}")
    print("-" * 80)

    for x in test_points:
        next_up = next_float(x, 'up')
        gap = next_up - x
        rel_gap = gap / x
        print(f"{x:<12.2e} {next_up:<25.17e} {gap:<15.5e} {rel_gap:<15.5e}")

# Demonstrate catastrophic cancellation
def demonstrate_cancellation():
    """Show loss of precision in subtraction of nearly equal numbers."""
    print("\nCatastrophic Cancellation Example:")
    print("Computing (1 + ε) - 1 for small ε\n")

    epsilons = [1e-10, 1e-15, 1e-16, 1e-17]
    for eps in epsilons:
        result = (1.0 + eps) - 1.0
        error = abs(result - eps) / eps if eps != 0 else 0
        print(f"ε = {eps:.2e}: Result = {result:.20e}, Relative Error = {error:.2e}")

if __name__ == "__main__":
    demonstrate_fp_properties()
    print("\n" + "="*80 + "\n")
    analyze_gaps()
    print("\n" + "="*80)
    demonstrate_cancellation()
```

## Key Properties and Limitations

### Associativity Violation

Floating-point arithmetic is **not associative**:

$$(a + b) + c \neq a + (b + c)$$

Example:
```python
a, b, c = 1e16, 1.0, -1e16
print((a + b) + c)  # 0.0
print(a + (b + c))  # 1.0
```

### Distributivity Violation

Floating-point arithmetic is **not distributive**:

$$a \times (b + c) \neq a \times b + a \times c$$

### No Multiplicative Inverse

$$x \times (1/x) \neq 1$$

in general, due to rounding errors.

## Practical Implications

### 1. Comparison Hazards

Never use exact equality for floating-point numbers:

```python
# Bad
if x == 0.1:
    pass

# Good
if abs(x - 0.1) < 1e-10:
    pass

# Better
if abs(x - 0.1) < np.finfo(float).eps * max(abs(x), 0.1):
    pass
```

### 2. Summation Order Matters

```python
# Accumulating small numbers
values = [1.0] + [1e-10] * 10000000

# Poor accuracy
sum_forward = sum(values)

# Better accuracy
sum_sorted = sum(sorted(values))

print(f"Forward sum: {sum_forward}")
print(f"Sorted sum: {sum_sorted}")
print(f"Exact value: {1.0 + 10000000 * 1e-10}")
```

### 3. Guard Digits

Extra precision in intermediate calculations (guard digits) reduces error accumulation.

## Interval Arithmetic

One approach to handle floating-point uncertainty is **interval arithmetic**:

```python
class Interval:
    def __init__(self, lower, upper):
        self.lower = np.nextafter(lower, -np.inf)
        self.upper = np.nextafter(upper, np.inf)

    def __add__(self, other):
        return Interval(self.lower + other.lower,
                       self.upper + other.upper)

    def __mul__(self, other):
        products = [
            self.lower * other.lower,
            self.lower * other.upper,
            self.upper * other.lower,
            self.upper * other.upper
        ]
        return Interval(min(products), max(products))

    def __repr__(self):
        return f"[{self.lower}, {self.upper}]"

# Example usage
a = Interval(1.0, 1.0)
b = Interval(0.1, 0.1)
result = a + b + b + b + b + b + b + b + b + b + b
print(f"0.1 added 10 times: {result}")
print(f"Contains 1.0? {result.lower <= 1.0 <= result.upper}")
```

## Summary

Floating-point representation is a compromise between range, precision, and efficiency. Understanding its limitations is crucial for:

- Avoiding numerical instabilities
- Designing robust algorithms
- Interpreting computational results
- Debugging unexpected behavior

Key takeaways:
1. Finite precision causes rounding errors
2. Not all real numbers are representable
3. Arithmetic operations may not preserve mathematical properties
4. Algorithm design must account for floating-point behavior
5. Machine epsilon characterizes relative precision
