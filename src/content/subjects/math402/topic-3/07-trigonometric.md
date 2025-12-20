---
title: "Trigonometric Interpolation"
description: "Interpolation using trigonometric polynomials for periodic functions and Fourier analysis"
---

# Trigonometric Interpolation

Trigonometric interpolation approximates periodic functions using sines and cosines, forming the foundation of Fourier analysis and spectral methods. This approach is particularly effective for periodic data and signals.

## Introduction

While polynomial interpolation works well for general functions, **periodic functions** are better approximated using **trigonometric polynomials**. Examples include:

- **Signal processing**: Audio signals, electrical waveforms
- **Time series**: Seasonal data, daily temperature cycles
- **Physical phenomena**: Pendulum motion, planetary orbits
- **Image processing**: JPEG compression uses discrete cosine transform

Trigonometric interpolation naturally respects periodicity and avoids the endpoint oscillations that plague polynomial methods.

## Trigonometric Polynomials

A **trigonometric polynomial** of degree $n$ has the form:

$$T_n(x) = \frac{a_0}{2} + \sum_{k=1}^{n} \left(a_k \cos(kx) + b_k \sin(kx)\right)$$

This can also be written using complex exponentials:

$$T_n(x) = \sum_{k=-n}^{n} c_k e^{ikx}$$

where $c_k$ are complex coefficients related to $a_k$ and $b_k$ by:
- $c_0 = a_0/2$
- $c_k = (a_k - ib_k)/2$ for $k > 0$
- $c_{-k} = (a_k + ib_k)/2$ for $k > 0$

The function $T_n(x)$ is **$2\pi$-periodic**: $T_n(x + 2\pi) = T_n(x)$.

## Interpolation Problem

Given $2n+1$ equally spaced points on $[0, 2\pi)$:

$$x_j = \frac{2\pi j}{2n+1}, \quad j = 0, 1, \ldots, 2n$$

and corresponding function values $f_j = f(x_j)$, find the trigonometric polynomial $T_n(x)$ such that:

$$T_n(x_j) = f_j \quad \text{for all } j$$

**Existence and Uniqueness**: Such a trigonometric polynomial of degree $\leq n$ exists and is unique.

## Discrete Fourier Transform (DFT)

The coefficients $c_k$ are given by the **Discrete Fourier Transform**:

$$c_k = \frac{1}{2n+1} \sum_{j=0}^{2n} f_j e^{-ikx_j} = \frac{1}{2n+1} \sum_{j=0}^{2n} f_j e^{-2\pi ijk/(2n+1)}$$

for $k = -n, -n+1, \ldots, n$.

The **inverse DFT** reconstructs the function:

$$f_j = \sum_{k=-n}^{n} c_k e^{ikx_j}$$

### Real-Valued Formulas

For real-valued functions, use cosine and sine coefficients:

$$a_k = \frac{2}{2n+1} \sum_{j=0}^{2n} f_j \cos(kx_j), \quad k = 0, 1, \ldots, n$$

$$b_k = \frac{2}{2n+1} \sum_{j=0}^{2n} f_j \sin(kx_j), \quad k = 1, 2, \ldots, n$$

with $a_0$ divided by 2 in the formula for $T_n(x)$.

## Fast Fourier Transform (FFT)

Direct computation of DFT requires $O(N^2)$ operations for $N = 2n+1$ points. The **Fast Fourier Transform (FFT)** reduces this to $O(N \log N)$ using a divide-and-conquer algorithm.

FFT is most efficient when $N$ is a power of 2, leading to the common choice $N = 2^m$ sample points.

## Implementation

```python
import numpy as np
import matplotlib.pyplot as plt

def trigonometric_interpolation(x_data, f_data):
    """
    Trigonometric interpolation using FFT.

    Parameters:
    - x_data: equally spaced points on [0, 2π)
    - f_data: function values at x_data

    Returns:
    - coeffs: complex Fourier coefficients
    """
    N = len(f_data)

    # Compute DFT using FFT
    coeffs = np.fft.fft(f_data) / N

    return coeffs

def evaluate_trig_poly(coeffs, x):
    """
    Evaluate trigonometric polynomial at points x.

    Parameters:
    - coeffs: complex Fourier coefficients from DFT
    - x: evaluation points

    Returns:
    - T(x): interpolated values
    """
    N = len(coeffs)
    n = (N - 1) // 2  # degree of trig polynomial

    # Rearrange coefficients from FFT ordering to [-n, ..., n]
    c = np.concatenate([coeffs[N//2+1:], coeffs[:N//2+1]])

    # Evaluate sum
    result = np.zeros_like(x, dtype=complex)
    for k in range(-n, n+1):
        result += c[k+n] * np.exp(1j * k * x)

    return np.real(result)  # Should be real for real input

# Example: Interpolate periodic function
N = 16
x_data = np.linspace(0, 2*np.pi, N, endpoint=False)
f_data = np.sin(3*x_data) + 0.5*np.cos(5*x_data)

coeffs = trigonometric_interpolation(x_data, f_data)

# Evaluate on fine grid
x_fine = np.linspace(0, 2*np.pi, 500)
f_true = np.sin(3*x_fine) + 0.5*np.cos(5*x_fine)
f_interp = evaluate_trig_poly(coeffs, x_fine)

plt.figure(figsize=(10, 6))
plt.plot(x_fine, f_true, 'b-', linewidth=2, label='True function')
plt.plot(x_fine, f_interp, 'r--', linewidth=2, label='Trigonometric interpolation')
plt.plot(x_data, f_data, 'ko', markersize=8, label='Data points')
plt.xlabel('x')
plt.ylabel('f(x)')
plt.title('Trigonometric Interpolation')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

print(f"Maximum error: {np.max(np.abs(f_true - f_interp)):.10f}")
```

## Worked Example

**Problem**: Find the trigonometric polynomial interpolating $f(x) = \cos(2x)$ at $N = 5$ equally spaced points on $[0, 2\pi)$.

**Solution**:

Sample points: $x_j = \frac{2\pi j}{5}$ for $j = 0, 1, 2, 3, 4$.

Function values:
- $f_0 = \cos(0) = 1$
- $f_1 = \cos(4\pi/5) \approx -0.809$
- $f_2 = \cos(8\pi/5) \approx 0.309$
- $f_3 = \cos(12\pi/5) \approx 0.309$
- $f_4 = \cos(16\pi/5) \approx -0.809$

For $N = 5$, we have degree $n = 2$ (since $2n+1 = 5$).

Compute DFT coefficients:
$$c_k = \frac{1}{5}\sum_{j=0}^4 f_j e^{-2\pi ijk/5}$$

For $k = 0$:
$$c_0 = \frac{1}{5}(1 - 0.809 + 0.309 + 0.309 - 0.809) = 0$$

For $k = 2$ and $k = -2$:
Due to the symmetry of $\cos(2x)$, we expect $c_2 = c_{-2} = 1/2$ and other coefficients to be zero.

The interpolating polynomial is:
$$T_2(x) = \frac{1}{2}e^{2ix} + \frac{1}{2}e^{-2ix} = \cos(2x)$$

This exactly recovers the original function because $\cos(2x)$ is already a trigonometric polynomial of degree 2!

## Aliasing and Nyquist Frequency

A critical concept in trigonometric interpolation is **aliasing**: high-frequency components can masquerade as low frequencies when sampled.

For $N$ sample points, we can uniquely represent frequencies up to $k = n = (N-1)/2$. This is the **Nyquist frequency**.

Frequencies $k > n$ are **aliased** to lower frequencies. For example, with $N = 5$ points:
- $\cos(7x)$ is indistinguishable from $\cos(3x)$ at the sample points
- Both have $k = 7 \equiv 3 \pmod{5}$

**Nyquist-Shannon sampling theorem**: To accurately represent a signal with maximum frequency $f_{max}$, sample at least $2f_{max}$ times per period.

## Comparison with Polynomial Interpolation

Consider interpolating $f(x) = \sin(x)$ on $[0, 2\pi]$:

```python
def compare_interpolations():
    """Compare polynomial and trigonometric interpolation."""
    N = 10
    x_data = np.linspace(0, 2*np.pi, N, endpoint=False)
    f_data = np.sin(x_data)

    x_fine = np.linspace(0, 2*np.pi, 500)
    f_true = np.sin(x_fine)

    # Polynomial interpolation
    poly_coeffs = np.polyfit(x_data, f_data, N-1)
    f_poly = np.polyval(poly_coeffs, x_fine)

    # Trigonometric interpolation
    trig_coeffs = trigonometric_interpolation(x_data, f_data)
    f_trig = evaluate_trig_poly(trig_coeffs, x_fine)

    # Plot
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5))

    ax1.plot(x_fine, f_true, 'b-', linewidth=2, label='True')
    ax1.plot(x_fine, f_poly, 'r--', linewidth=2, label='Polynomial')
    ax1.plot(x_data, f_data, 'ko', markersize=6)
    ax1.set_title(f'Polynomial: max error = {np.max(np.abs(f_true - f_poly)):.4f}')
    ax1.legend()
    ax1.grid(True, alpha=0.3)

    ax2.plot(x_fine, f_true, 'b-', linewidth=2, label='True')
    ax2.plot(x_fine, f_trig, 'g--', linewidth=2, label='Trigonometric')
    ax2.plot(x_data, f_data, 'ko', markersize=6)
    ax2.set_title(f'Trigonometric: max error = {np.max(np.abs(f_true - f_trig)):.4e}')
    ax2.legend()
    ax2.grid(True, alpha=0.3)

    plt.tight_layout()
    plt.show()

compare_interpolations()
```

For periodic functions, trigonometric interpolation typically provides **vastly superior** accuracy.

## Properties

1. **Exactness for trigonometric polynomials**: If $f(x)$ is a trig polynomial of degree $\leq n$, interpolation recovers it exactly
2. **Periodicity preservation**: $T_n(x)$ is automatically periodic
3. **Spectral accuracy**: Error decreases exponentially for smooth periodic functions
4. **Orthogonality**: Basis functions $e^{ikx}$ are orthogonal on equally spaced points
5. **FFT efficiency**: $O(N \log N)$ computation for $N$ points

## Error Analysis

For a $2\pi$-periodic function $f$ with $m$ continuous derivatives:

$$\max_{x} |f(x) - T_n(x)| \leq \frac{C}{n^m} \max_{x} |f^{(m)}(x)|$$

For infinitely differentiable functions, convergence is **spectral** (faster than any polynomial rate).

However, for non-periodic functions forced into $[0, 2\pi]$, **Gibbs phenomenon** occurs: oscillations near discontinuities that don't vanish as $n \to \infty$.

## Applications

1. **Signal processing**: Audio/video compression, filtering, spectrum analysis
2. **Fourier analysis**: Heat equation, wave equation, quantum mechanics
3. **Image processing**: JPEG uses discrete cosine transform (related to DFT)
4. **Numerical PDEs**: Spectral methods for periodic boundary conditions
5. **Time series analysis**: Identifying periodicities, seasonality
6. **Communications**: Modulation, OFDM, channel estimation

## Key Takeaways

- **Trigonometric interpolation** uses sines and cosines instead of polynomials
- Natural for **periodic functions** and **periodic data**
- Coefficients computed via **Discrete Fourier Transform (DFT)**
- **FFT algorithm** enables $O(N \log N)$ computation
- **Spectral accuracy**: exponentially fast convergence for smooth functions
- **Aliasing** occurs when sampling rate is too low (violates Nyquist criterion)
- Superior to polynomial interpolation for **periodic signals**
- Foundation of **Fourier analysis** and **spectral methods**

## Common Mistakes

1. **Using for non-periodic data**: Trigonometric interpolation assumes periodicity; forcing non-periodic data causes endpoint mismatch
2. **Wrong sample spacing**: Must use **equally spaced** points for standard DFT formulas
3. **Insufficient samples**: Need $N \geq 2n+1$ points for degree $n$ trig polynomial
4. **Ignoring aliasing**: High frequencies masquerade as low frequencies if undersampled
5. **FFT size mismatch**: FFT is most efficient for $N = 2^m$; padding may be needed
6. **Gibbs phenomenon**: Near discontinuities, oscillations persist regardless of $n$
7. **Complex vs real**: DFT produces complex coefficients even for real input; extract real part for evaluation
