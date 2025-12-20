---
title: "Multidimensional Integration"
description: "Comprehensive guide to numerical methods for multidimensional integration including Monte Carlo and sparse grids"
---

# Multidimensional Integration

## Introduction

Multidimensional integration extends numerical integration to functions of multiple variables, computing integrals of the form:

$$I = \int_{\Omega} f(\mathbf{x}) d\mathbf{x} = \int_{x_1^{\text{min}}}^{x_1^{\text{max}}} \int_{x_2^{\text{min}}}^{x_2^{\text{max}}} \cdots \int_{x_d^{\text{min}}}^{x_d^{\text{max}}} f(x_1, x_2, \ldots, x_d) dx_d \cdots dx_2 dx_1$$

where $\Omega \subset \mathbb{R}^d$ is the integration domain and $d$ is the dimension. Such integrals arise ubiquitously in scientific computing, including statistical mechanics (partition functions), quantum physics (expectation values), Bayesian statistics (marginal likelihoods), computer graphics (rendering equations), and finance (option pricing).

The fundamental challenge in multidimensional integration is the **curse of dimensionality**: the computational cost of traditional methods grows exponentially with dimension. For instance, using $n$ points per dimension in a $d$-dimensional integral requires $n^d$ total function evaluations. With $n=100$ and $d=10$, this means $10^{20}$ evaluations - clearly impractical.

This section explores various strategies for multidimensional integration, from simple product rules to sophisticated Monte Carlo methods and sparse grids that mitigate the curse of dimensionality.

## Mathematical Formulation

### Product Rules (Tensor Product Quadrature)

The most straightforward approach extends 1D quadrature rules via tensor products. Given a 1D quadrature rule:

$$\int_a^b f(x)dx \approx \sum_{i=1}^n w_i f(x_i)$$

The $d$-dimensional product rule is:

$$\int_{\Omega} f(\mathbf{x})d\mathbf{x} \approx \sum_{i_1=1}^n \sum_{i_2=1}^n \cdots \sum_{i_d=1}^n w_{i_1} w_{i_2} \cdots w_{i_d} f(x_{i_1}, x_{i_2}, \ldots, x_{i_d})$$

**Computational Cost**: $O(n^d)$ function evaluations.

**Accuracy**: If the 1D rule has order $p$ (error $\sim h^p$), the product rule also has order $p$ but with $h = 1/n^{1/d}$ for fixed total points.

### Monte Carlo Integration

Monte Carlo methods use random sampling to estimate integrals:

$$\int_{\Omega} f(\mathbf{x})d\mathbf{x} \approx \frac{V(\Omega)}{N} \sum_{i=1}^N f(\mathbf{x}_i)$$

where $\mathbf{x}_i$ are uniformly random points in $\Omega$ and $V(\Omega)$ is the volume of $\Omega$.

**Key Properties**:
- **Dimension Independence**: Convergence rate $O(N^{-1/2})$ independent of dimension $d$
- **Probabilistic Error**: Error bounds hold with high probability, not deterministically
- **Variance Reduction**: Techniques like importance sampling can significantly improve efficiency

### Quasi-Monte Carlo Methods

Quasi-Monte Carlo (QMC) replaces random points with low-discrepancy sequences (Sobol, Halton, Latin hypercube):

$$\int_{[0,1]^d} f(\mathbf{x})d\mathbf{x} \approx \frac{1}{N} \sum_{i=1}^N f(\mathbf{x}_i)$$

**Convergence**: $O((\log N)^d / N)$ for smooth integrands - better than Monte Carlo for moderate dimensions.

### Sparse Grids (Smolyak Algorithm)

Sparse grids combat the curse of dimensionality by selectively combining tensor products of 1D rules:

$$\mathcal{A}^d_q = \sum_{|\mathbf{k}|_1 = q}^{q+d-1} (-1)^{q+d-1-|\mathbf{k}|_1} \binom{d-1}{q+d-1-|\mathbf{k}|_1} (U_{k_1} \otimes \cdots \otimes U_{k_d})$$

where $U_k$ are nested 1D quadrature rules and $|\mathbf{k}|_1 = k_1 + \cdots + k_d$.

**Computational Cost**: $O(n (\log n)^{d-1})$ for $n$ points - exponentially better than full tensor products.

**Accuracy**: Nearly optimal for functions with bounded mixed derivatives.

## Curse of Dimensionality

The curse of dimensionality manifests in several ways:

1. **Exponential Growth**: Grid-based methods require $n^d$ points
2. **Volume Concentration**: In high dimensions, most volume concentrates near boundaries
3. **Distance Concentration**: All points become approximately equidistant
4. **Sampling Difficulty**: Random points become sparse, covering space poorly

**Example**: To achieve error $\epsilon = 10^{-3}$ in dimension $d$:
- **Trapezoidal rule**: Requires $\sim (1/\epsilon)^{d/2}$ points
  - $d=2$: ~1,000 points
  - $d=5$: ~100,000,000 points
  - $d=10$: ~$10^{15}$ points (impossible)
- **Monte Carlo**: Requires $\sim 1/\epsilon^2 = 10^6$ points regardless of $d$

## Python Implementation

```python
import numpy as np
from scipy import integrate
from scipy.stats import qmc
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

def product_rule_2d(f, a, b, c, d, nx=50, ny=50):
    """
    Integrate 2D function using product of trapezoidal rules.

    Parameters:
    -----------
    f : callable
        Function f(x, y) to integrate
    a, b : float
        x-axis integration limits
    c, d : float
        y-axis integration limits
    nx, ny : int
        Number of points in x and y directions

    Returns:
    --------
    result : float
        Approximate integral value
    """
    x = np.linspace(a, b, nx)
    y = np.linspace(c, d, ny)
    X, Y = np.meshgrid(x, y)

    # Evaluate function on grid
    Z = f(X, Y)

    # Apply trapezoidal rule in both dimensions
    # First integrate over y for each x
    integral_y = np.trapz(Z, y, axis=0)
    # Then integrate over x
    result = np.trapz(integral_y, x)

    return result

def product_rule_nd(f, bounds, n_points=20):
    """
    Integrate d-dimensional function using product rule.

    Parameters:
    -----------
    f : callable
        Function f(x1, x2, ..., xd) accepting array of shape (d,)
    bounds : list of tuples
        [(x1_min, x1_max), (x2_min, x2_max), ..., (xd_min, xd_max)]
    n_points : int
        Number of points per dimension

    Returns:
    --------
    result : float
        Approximate integral value
    """
    d = len(bounds)

    # Create 1D grids for each dimension
    grids = [np.linspace(bounds[i][0], bounds[i][1], n_points) for i in range(d)]

    # Create meshgrid (works for arbitrary dimensions)
    mesh = np.meshgrid(*grids, indexing='ij')

    # Evaluate function on grid
    # Stack coordinates into shape (n^d, d)
    points = np.stack([m.ravel() for m in mesh], axis=1)
    values = np.array([f(p) for p in points]).reshape([n_points] * d)

    # Integrate using trapezoidal rule iteratively
    result = values
    for i in range(d):
        result = np.trapz(result, grids[d - 1 - i], axis=d - 1 - i)

    return result

def monte_carlo_integrate(f, bounds, N=10000, return_std=False):
    """
    Monte Carlo integration using uniform random sampling.

    Parameters:
    -----------
    f : callable
        Function to integrate
    bounds : list of tuples
        Integration bounds [(x1_min, x1_max), ..., (xd_min, xd_max)]
    N : int
        Number of random samples
    return_std : bool
        If True, also return standard error estimate

    Returns:
    --------
    result : float
        Approximate integral value
    std_error : float (if return_std=True)
        Standard error estimate
    """
    d = len(bounds)

    # Generate uniform random samples
    samples = np.random.uniform(
        low=[b[0] for b in bounds],
        high=[b[1] for b in bounds],
        size=(N, d)
    )

    # Evaluate function at sample points
    values = np.array([f(s) for s in samples])

    # Compute volume of integration domain
    volume = np.prod([b[1] - b[0] for b in bounds])

    # Monte Carlo estimate
    result = volume * np.mean(values)

    if return_std:
        std_error = volume * np.std(values) / np.sqrt(N)
        return result, std_error
    else:
        return result

def quasi_monte_carlo_integrate(f, bounds, N=10000, sequence='sobol'):
    """
    Quasi-Monte Carlo integration using low-discrepancy sequences.

    Parameters:
    -----------
    f : callable
        Function to integrate
    bounds : list of tuples
        Integration bounds
    N : int
        Number of samples
    sequence : str
        Type of sequence ('sobol', 'halton', 'latin_hypercube')

    Returns:
    --------
    result : float
        Approximate integral value
    """
    d = len(bounds)

    # Generate low-discrepancy sequence
    if sequence == 'sobol':
        sampler = qmc.Sobol(d, scramble=True)
    elif sequence == 'halton':
        sampler = qmc.Halton(d, scramble=True)
    elif sequence == 'latin_hypercube':
        sampler = qmc.LatinHypercube(d)
    else:
        raise ValueError(f"Unknown sequence type: {sequence}")

    # Generate samples in [0, 1]^d
    samples_unit = sampler.random(N)

    # Scale to actual bounds
    lower = np.array([b[0] for b in bounds])
    upper = np.array([b[1] for b in bounds])
    samples = qmc.scale(samples_unit, lower, upper)

    # Evaluate function
    values = np.array([f(s) for s in samples])

    # Compute volume and estimate
    volume = np.prod(upper - lower)
    result = volume * np.mean(values)

    return result

def importance_sampling_integrate(f, proposal_pdf, proposal_sampler, bounds, N=10000):
    """
    Monte Carlo integration with importance sampling.

    Parameters:
    -----------
    f : callable
        Function to integrate
    proposal_pdf : callable
        Probability density function of proposal distribution
    proposal_sampler : callable
        Function that generates samples from proposal distribution
    bounds : list of tuples
        Integration bounds (for reference, actual sampling uses proposal)
    N : int
        Number of samples

    Returns:
    --------
    result : float
        Approximate integral value
    """
    d = len(bounds)

    # Generate samples from proposal distribution
    samples = proposal_sampler(N)

    # Compute importance weights: f(x) / p(x)
    weights = np.array([f(s) / proposal_pdf(s) for s in samples])

    # Estimate integral
    result = np.mean(weights)

    return result

def adaptive_monte_carlo(f, bounds, target_error=1e-3, max_samples=1000000, batch_size=1000):
    """
    Adaptive Monte Carlo that samples until target error is reached.

    Parameters:
    -----------
    f : callable
        Function to integrate
    bounds : list of tuples
        Integration bounds
    target_error : float
        Target standard error
    max_samples : int
        Maximum number of samples
    batch_size : int
        Number of samples to add per iteration

    Returns:
    --------
    result : float
        Approximate integral value
    N : int
        Total samples used
    error : float
        Final error estimate
    """
    d = len(bounds)
    volume = np.prod([b[1] - b[0] for b in bounds])

    values_list = []
    N = 0

    while N < max_samples:
        # Generate batch of samples
        samples = np.random.uniform(
            low=[b[0] for b in bounds],
            high=[b[1] for b in bounds],
            size=(batch_size, d)
        )

        # Evaluate function
        batch_values = np.array([f(s) for s in samples])
        values_list.extend(batch_values)
        N += batch_size

        # Compute current estimate and error
        values = np.array(values_list)
        result = volume * np.mean(values)
        error = volume * np.std(values) / np.sqrt(N)

        # Check convergence
        if error < target_error:
            return result, N, error

    print(f"Warning: Reached max_samples={max_samples}, target error not achieved")
    return result, N, error

# Example 1: 2D Integration - Product Rule vs Monte Carlo
print("Example 1: 2D Integration ∬(x² + y²) dx dy over [0,1]×[0,1]")
print("-" * 70)

def f_2d(x, y):
    return x**2 + y**2

# Exact value: ∫₀¹ ∫₀¹ (x² + y²) dy dx = ∫₀¹ (x² + 1/3) dx = 1/3 + 1/3 = 2/3
exact_2d = 2/3

# Product rule
result_product = product_rule_2d(f_2d, 0, 1, 0, 1, nx=100, ny=100)
print(f"Product rule (100×100):  {result_product:.10f}")
print(f"Error:                   {abs(result_product - exact_2d):.2e}")

# Monte Carlo
result_mc, std_mc = monte_carlo_integrate(
    lambda x: f_2d(x[0], x[1]),
    [(0, 1), (0, 1)],
    N=10000,
    return_std=True
)
print(f"Monte Carlo (N=10000):   {result_mc:.10f} ± {std_mc:.2e}")
print(f"Error:                   {abs(result_mc - exact_2d):.2e}")

# Quasi-Monte Carlo
result_qmc = quasi_monte_carlo_integrate(
    lambda x: f_2d(x[0], x[1]),
    [(0, 1), (0, 1)],
    N=10000,
    sequence='sobol'
)
print(f"Quasi-MC Sobol (N=10000): {result_qmc:.10f}")
print(f"Error:                    {abs(result_qmc - exact_2d):.2e}")
print(f"Exact value:              {exact_2d:.10f}")
print()

# Example 2: Higher-Dimensional Integration
print("Example 2: 5D Integration ∫∫∫∫∫ exp(-||x||²) over [-1,1]⁵")
print("-" * 70)

def f_5d(x):
    """Gaussian-like function in 5D"""
    return np.exp(-np.sum(x**2))

bounds_5d = [(-1, 1)] * 5

# Monte Carlo
result_mc_5d, std_mc_5d = monte_carlo_integrate(f_5d, bounds_5d, N=100000, return_std=True)
print(f"Monte Carlo (N=100000):   {result_mc_5d:.6f} ± {std_mc_5d:.4f}")

# Quasi-Monte Carlo with different sequences
result_sobol = quasi_monte_carlo_integrate(f_5d, bounds_5d, N=100000, sequence='sobol')
print(f"QMC Sobol (N=100000):     {result_sobol:.6f}")

result_halton = quasi_monte_carlo_integrate(f_5d, bounds_5d, N=100000, sequence='halton')
print(f"QMC Halton (N=100000):    {result_halton:.6f}")

result_lhs = quasi_monte_carlo_integrate(f_5d, bounds_5d, N=100000, sequence='latin_hypercube')
print(f"QMC Latin Hyp (N=100000): {result_lhs:.6f}")

# Reference using scipy
result_scipy, error_scipy = integrate.nquad(
    lambda x1, x2, x3, x4, x5: np.exp(-(x1**2 + x2**2 + x3**2 + x4**2 + x5**2)),
    bounds_5d
)
print(f"SciPy nquad (reference):  {result_scipy:.6f} ± {error_scipy:.4f}")
print()

# Example 3: Adaptive Monte Carlo
print("Example 3: Adaptive Monte Carlo with target error = 1e-3")
print("-" * 70)

def f_adaptive(x):
    return np.sin(x[0]) * np.cos(x[1]) * np.exp(-x[2]**2)

bounds_adaptive = [(0, np.pi), (0, np.pi), (-2, 2)]

result_adaptive, N_used, error_achieved = adaptive_monte_carlo(
    f_adaptive,
    bounds_adaptive,
    target_error=1e-3,
    max_samples=1000000,
    batch_size=1000
)

print(f"Result:           {result_adaptive:.6f}")
print(f"Samples used:     {N_used}")
print(f"Error achieved:   {error_achieved:.4f}")
print()

# Example 4: Convergence comparison
print("Example 4: Convergence Rate Comparison (2D)")
print("-" * 70)

def f_conv(x):
    return np.exp(-(x[0]**2 + x[1]**2))

bounds_conv = [(-2, 2), (-2, 2)]

# Exact value (approximately, using high-accuracy quad)
exact_conv, _ = integrate.nquad(lambda x, y: np.exp(-(x**2 + y**2)), bounds_conv)

# Test different sample sizes
sample_sizes = [100, 500, 1000, 5000, 10000, 50000]
errors_mc = []
errors_qmc = []

for N in sample_sizes:
    # Monte Carlo
    result_mc = monte_carlo_integrate(f_conv, bounds_conv, N=N)
    errors_mc.append(abs(result_mc - exact_conv))

    # Quasi-Monte Carlo
    result_qmc = quasi_monte_carlo_integrate(f_conv, bounds_conv, N=N, sequence='sobol')
    errors_qmc.append(abs(result_qmc - exact_conv))

print(f"{'N':>8} {'MC Error':>15} {'QMC Error':>15}")
print("-" * 40)
for i, N in enumerate(sample_sizes):
    print(f"{N:8d} {errors_mc[i]:15.6e} {errors_qmc[i]:15.6e}")
```

## Worked Example: Computing Volume of High-Dimensional Sphere

Compute the volume of a unit sphere in $d$ dimensions:

$$V_d = \int_{||x|| \leq 1} d\mathbf{x}$$

**Analytical Formula**: $V_d = \frac{\pi^{d/2}}{\Gamma(d/2 + 1)}$

**Step 1**: Recognize this is a geometric problem well-suited for Monte Carlo.

**Step 2**: Convert to integral over hypercube $[-1,1]^d$:

$$V_d = \int_{[-1,1]^d} \mathbb{1}_{||x|| \leq 1}(\mathbf{x}) d\mathbf{x}$$

where $\mathbb{1}$ is the indicator function.

**Step 3**: Apply Monte Carlo:

```python
from scipy.special import gamma

def sphere_volume_monte_carlo(d, N=100000):
    """Estimate volume of unit sphere in d dimensions using Monte Carlo"""
    # Generate uniform random points in [-1, 1]^d
    points = np.random.uniform(-1, 1, size=(N, d))

    # Count points inside unit sphere
    distances = np.linalg.norm(points, axis=1)
    inside = np.sum(distances <= 1)

    # Volume of hypercube is 2^d
    hypercube_volume = 2**d
    sphere_volume = hypercube_volume * (inside / N)

    return sphere_volume

# Test for various dimensions
print("Sphere Volume Estimation vs Exact Values")
print("-" * 60)
print(f"{'Dim':>4} {'Monte Carlo':>15} {'Exact':>15} {'Error':>12}")
print("-" * 60)

for d in [2, 3, 4, 5, 6, 8, 10]:
    mc_volume = sphere_volume_monte_carlo(d, N=1000000)
    exact_volume = np.pi**(d/2) / gamma(d/2 + 1)
    error = abs(mc_volume - exact_volume) / exact_volume * 100

    print(f"{d:4d} {mc_volume:15.6f} {exact_volume:15.6f} {error:11.2f}%")
```

**Step 4**: Analysis. Notice Monte Carlo maintains consistent accuracy across dimensions, while grid-based methods would become intractable.

## Variance Reduction Techniques

### 1. Importance Sampling

Choose proposal distribution $p(x)$ that concentrates samples where $f$ is large:

$$\int f(x)dx = \int \frac{f(x)}{p(x)} p(x)dx \approx \frac{1}{N} \sum_{i=1}^N \frac{f(x_i)}{p(x_i)}$$

where $x_i \sim p$.

**Optimal Choice**: $p(x) \propto |f(x)|$ minimizes variance.

### 2. Stratified Sampling

Divide domain into strata, sample from each:

$$\int_{\Omega} f(x)dx = \sum_{i=1}^M \int_{\Omega_i} f(x)dx \approx \sum_{i=1}^M \frac{V(\Omega_i)}{N_i} \sum_{j=1}^{N_i} f(x_{ij})$$

where $\Omega = \bigcup_{i=1}^M \Omega_i$ (disjoint).

### 3. Control Variates

Use correlated function $g$ with known integral:

$$\int f(x)dx = \int [f(x) - g(x)]dx + \int g(x)dx$$

If $f$ and $g$ are highly correlated, variance of $f - g$ is much smaller.

## Practical Considerations

1. **Dimension Selection**:
   - $d \leq 4$: Product rules often competitive
   - $4 < d \leq 10$: Quasi-Monte Carlo or sparse grids
   - $d > 10$: Monte Carlo methods dominate

2. **Smoothness Requirements**:
   - Product rules and sparse grids require smooth integrands
   - Monte Carlo handles discontinuities well
   - Singularities require special treatment in all methods

3. **Error Estimation**:
   - Monte Carlo provides statistical error estimates
   - Deterministic methods require extrapolation or comparison

4. **Parallelization**:
   - Monte Carlo is embarrassingly parallel
   - Product rules can be parallelized over grid points
   - Communication overhead minimal for both

5. **Function Evaluation Cost**:
   - If $f$ is expensive, minimize evaluations (use QMC or adaptive methods)
   - If $f$ is cheap, Monte Carlo's simplicity is advantageous

## Sparse Grids in Practice

While full sparse grid implementation is complex, the key idea is combining 1D rules efficiently:

**Example**: 2D sparse grid at level 3 uses points:
- Level (1,1): 1 point
- Level (1,2), (2,1): 2+2 = 4 points
- Level (1,3), (2,2), (3,1): 3+3+3 = 9 points

Total: ~14 points instead of $3^2 = 9$ for product rule at comparable accuracy.

For $d$ dimensions and level $\ell$, sparse grids use $O(2^\ell \ell^{d-1})$ points with accuracy comparable to $O(2^{\ell d})$ product rule.

## Key Takeaways

- Multidimensional integration faces the curse of dimensionality: exponential cost growth with dimension
- Product rules (tensor products) work well for low dimensions but become intractable for $d > 4$
- Monte Carlo methods have dimension-independent convergence $O(N^{-1/2})$, making them ideal for high dimensions
- Quasi-Monte Carlo uses low-discrepancy sequences for faster convergence in moderate dimensions
- Sparse grids achieve near-optimal accuracy with exponentially fewer points than product rules
- Variance reduction techniques (importance sampling, stratified sampling, control variates) dramatically improve Monte Carlo efficiency
- Method selection depends critically on dimension, smoothness, and computational budget
- For $d > 10$, Monte Carlo methods are typically the only practical option

## Common Mistakes

- **Using product rules for high dimensions** without considering exponential cost
- **Insufficient samples in Monte Carlo** leading to large variance (need $N \sim 1/\epsilon^2$ for error $\epsilon$)
- **Ignoring boundary effects** in quasi-Monte Carlo sequences
- **Applying sparse grids to non-smooth functions** where smoothness assumptions fail
- **Not using variance reduction** when problem structure allows it
- **Misinterpreting probabilistic error bounds** as deterministic guarantees
- **Forgetting to scale low-discrepancy sequences** from unit cube to actual domain
- **Using crude Monte Carlo when importance sampling** could provide orders of magnitude improvement
- **Overlooking parallelization opportunities** in embarrassingly parallel Monte Carlo calculations
- **Not testing convergence** by comparing results with different sample sizes
