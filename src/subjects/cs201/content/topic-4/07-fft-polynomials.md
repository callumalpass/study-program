---
id: cs201-t4-fft
title: "FFT and Polynomial Multiplication"
order: 7
---

# Fast Fourier Transform and Polynomial Multiplication

The Fast Fourier Transform (FFT) is arguably the most important algorithm of the twentieth century. Its applications span signal processing, image compression, cryptography, scientific computing, and telecommunications. At its core, FFT solves polynomial multiplication in O(n log n) time instead of O(n²)—an asymptotic improvement that enables real-time audio processing, efficient multiplication of large integers, and countless other applications.

The key insight is representation change. In coefficient form, polynomial multiplication requires O(n²) work—computing each coefficient of the product requires summing O(n) terms. In point-value form (the polynomial evaluated at n points), multiplication is O(n)—just multiply corresponding values. The FFT provides O(n log n) conversion between representations, making the detour through point-value form faster than direct multiplication.

The mathematical elegance lies in choosing evaluation points wisely. Arbitrary points would require O(n²) evaluation. But the roots of unity—complex numbers evenly spaced on the unit circle—have recursive structure that enables divide and conquer. The n-th roots of unity squared give the (n/2)-th roots, reducing evaluation at n points to two evaluations at n/2 points. This recursive structure is the heart of FFT's efficiency.

## The Problem

Multiply two polynomials:
```
A(x) = a₀ + a₁x + a₂x² + ... + aₙ₋₁xⁿ⁻¹
B(x) = b₀ + b₁x + b₂x² + ... + bₙ₋₁xⁿ⁻¹
C(x) = A(x) × B(x) = c₀ + c₁x + ... + c₂ₙ₋₂x²ⁿ⁻²
```

### Naive Approach

```python
def multiply_naive(A, B):
    n = len(A) + len(B) - 1
    C = [0] * n

    for i in range(len(A)):
        for j in range(len(B)):
            C[i + j] += A[i] * B[j]

    return C
```

**Time**: O(n²)—each coefficient requires summing products.

## Key Insight: Point-Value Representation

A polynomial of degree n-1 is uniquely determined by n points.

**Coefficient form**: (a₀, a₁, ..., aₙ₋₁)

**Point-value form**: {(x₀, A(x₀)), (x₁, A(x₁)), ..., (xₙ₋₁, A(xₙ₋₁))}

### Multiplication in Point-Value Form

If A and B are in point-value form at the same points:
```
C(xᵢ) = A(xᵢ) × B(xᵢ)
```

Point-wise multiplication is O(n)!

### The Strategy

1. **Evaluate**: Convert A and B to point-value form
2. **Multiply**: Point-wise multiplication O(n)
3. **Interpolate**: Convert back to coefficient form

Challenge: Evaluation and interpolation are each O(n²) naively.

## The Discrete Fourier Transform

Evaluate polynomial at special points: roots of unity.

### Roots of Unity

The n-th roots of unity are:
```
ωₙ = e^(2πi/n) = cos(2π/n) + i·sin(2π/n)
```

The n roots are: ω⁰ₙ, ω¹ₙ, ω²ₙ, ..., ωⁿ⁻¹ₙ

**Key properties**:
- ωⁿₙ = 1 (returns to 1)
- ωⁿ/²ₙ = -1 (halfway is -1)
- Roots are evenly spaced on unit circle

### The DFT

DFT of (a₀, a₁, ..., aₙ₋₁):

```
yₖ = Σⱼ aⱼ · ωⁿᵏʲ
```

This is exactly evaluating A(x) at x = ωᵏₙ.

## The Fast Fourier Transform

FFT computes DFT in O(n log n) using divide and conquer.

### Divide by Even/Odd

Split A(x) into even and odd powers:
```
A(x) = A_even(x²) + x · A_odd(x²)
```

Where:
```
A_even(y) = a₀ + a₂y + a₄y² + ...
A_odd(y)  = a₁ + a₃y + a₅y² + ...
```

### Key Observation

Evaluating A at ω⁰ₙ, ω¹ₙ, ..., ωⁿ⁻¹ₙ requires evaluating A_even and A_odd at:
```
(ω⁰ₙ)² = ω⁰ₙ/₂
(ω¹ₙ)² = ω¹ₙ/₂
...
```

Only n/2 distinct values—the (n/2)-th roots of unity!

### The Algorithm

```python
import cmath

def fft(a):
    n = len(a)

    if n == 1:
        return a

    # Split into even and odd
    a_even = a[0::2]
    a_odd = a[1::2]

    # Recursive FFT
    y_even = fft(a_even)
    y_odd = fft(a_odd)

    # Combine
    y = [0] * n
    omega_n = cmath.exp(2j * cmath.pi / n)
    omega = 1

    for k in range(n // 2):
        y[k] = y_even[k] + omega * y_odd[k]
        y[k + n // 2] = y_even[k] - omega * y_odd[k]
        omega *= omega_n

    return y
```

### Analysis

**Recurrence**: T(n) = 2T(n/2) + O(n)

**Solution**: T(n) = O(n log n)

## Inverse FFT

Convert point-value back to coefficients.

**Remarkable fact**: IFFT is almost identical to FFT!

```python
def ifft(y):
    n = len(y)

    # FFT with conjugate roots
    a = fft([yi.conjugate() for yi in y])

    # Scale and conjugate
    return [ai.conjugate() / n for ai in a]
```

**Why it works**: The DFT matrix is unitary (up to scaling).

## Complete Polynomial Multiplication

```python
def multiply_fft(A, B):
    # Pad to power of 2
    n = 1
    while n < len(A) + len(B):
        n *= 2

    A = A + [0] * (n - len(A))
    B = B + [0] * (n - len(B))

    # Transform to point-value
    A_fft = fft(A)
    B_fft = fft(B)

    # Point-wise multiply
    C_fft = [a * b for a, b in zip(A_fft, B_fft)]

    # Transform back
    C = ifft(C_fft)

    # Round to handle floating point
    return [round(c.real) for c in C]
```

**Total time**: O(n log n)

## Practical Considerations

### Numerical Stability

Floating-point errors accumulate. Use higher precision for sensitive applications.

### Number Theoretic Transform (NTT)

For integer polynomials, use modular arithmetic to avoid floating point:
- Work modulo prime p
- Use primitive roots instead of complex roots
- Exact computation, faster

```python
def ntt(a, p, g):
    """NTT using prime p and primitive root g"""
    n = len(a)
    omega = pow(g, (p - 1) // n, p)
    # ... similar to FFT but modular arithmetic
```

### Cooley-Tukey In-Place

Iterative version with O(1) extra space:

```python
def fft_iterative(a):
    n = len(a)

    # Bit-reversal permutation
    for i in range(n):
        j = bit_reverse(i, log2(n))
        if i < j:
            a[i], a[j] = a[j], a[i]

    # Butterfly operations
    length = 2
    while length <= n:
        omega_n = cmath.exp(2j * cmath.pi / length)
        for i in range(0, n, length):
            omega = 1
            for j in range(length // 2):
                t = omega * a[i + j + length // 2]
                u = a[i + j]
                a[i + j] = u + t
                a[i + j + length // 2] = u - t
                omega *= omega_n
        length *= 2

    return a
```

## Applications

### Big Integer Multiplication

Treat digits as polynomial coefficients:
- 123 × 456 = (1x² + 2x + 3)(4x² + 5x + 6) evaluated at x = 10
- O(n log n) for n-digit numbers
- Used in cryptography libraries

### Signal Processing

Convolution of signals:
- Time domain: O(n²)
- Frequency domain: O(n log n)
- Audio/image filtering

### String Matching

Pattern matching via convolution:
- Encode pattern and text as polynomials
- Match count at each position via multiplication

### Solving PDEs

Spectral methods use FFT for:
- Efficient derivative computation
- Solving Poisson equation
- Fluid dynamics simulations

## Complexity Comparison

| Operation | Naive | FFT-based |
|-----------|-------|-----------|
| Polynomial multiplication | O(n²) | O(n log n) |
| Big integer multiplication | O(n²) | O(n log n) |
| Convolution | O(n²) | O(n log n) |
| All-pairs multiplication | O(n²) | O(n log n) |

## Summary

The FFT transforms the seemingly O(n²) problem of polynomial multiplication into O(n log n) through three insights:

1. **Representation change**: Point-value form enables O(n) multiplication
2. **Special points**: Roots of unity have recursive structure
3. **Divide and conquer**: Even/odd splitting reduces to half-size problems

The FFT is arguably the most important algorithm of the 20th century, with applications spanning signal processing, cryptography, scientific computing, and beyond.
