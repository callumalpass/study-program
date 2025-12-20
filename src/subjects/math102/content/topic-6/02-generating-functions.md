---
id: math102-t6-genfunc
title: "Generating Functions"
order: 2
---

# Generating Functions

Generating functions are a powerful tool for solving counting problems. They transform sequences into formal power series, enabling algebraic manipulation of combinatorial objects.

## Definition and Basics

### Ordinary Generating Function (OGF)

For sequence a₀, a₁, a₂, ..., the **ordinary generating function** is:

$$A(x) = \sum_{n=0}^{\infty} a_n x^n = a_0 + a_1 x + a_2 x^2 + \cdots$$

The coefficients encode the sequence; we extract [xⁿ]A(x) = aₙ.

### Basic Examples

**Geometric series:** For aₙ = 1:
$$\frac{1}{1-x} = 1 + x + x^2 + x^3 + \cdots$$

**Powers of c:** For aₙ = cⁿ:
$$\frac{1}{1-cx} = 1 + cx + c^2x^2 + \cdots$$

**Binomial series:**
$$(1+x)^n = \sum_{k=0}^{n} \binom{n}{k} x^k$$

## Basic Operations

### Addition
If A(x) generates (aₙ) and B(x) generates (bₙ):
$$A(x) + B(x) \text{ generates } (a_n + b_n)$$

### Scalar Multiplication
$$c \cdot A(x) \text{ generates } (c \cdot a_n)$$

### Shifting
$$x^k A(x) \text{ generates } (0, 0, \ldots, 0, a_0, a_1, \ldots)$$
(k leading zeros)

### Differentiation
$$A'(x) \text{ generates } ((n+1)a_{n+1})$$

### Integration
$$\int_0^x A(t) dt \text{ generates } (0, a_0, a_1/2, a_2/3, \ldots)$$

## Product of Generating Functions

The **Cauchy product**:
$$A(x) \cdot B(x) = \sum_{n=0}^{\infty} c_n x^n$$
where $c_n = \sum_{k=0}^{n} a_k b_{n-k}$

This is the **convolution** of sequences.

### Application: Counting Combinations

**Problem:** Count ways to select from two types of items.

If A(x) encodes ways to select type-A items and B(x) encodes type-B:
- [xⁿ](A(x)·B(x)) = ways to select n items total

## Solving Recurrences

### Example: Fibonacci

F₀ = 0, F₁ = 1, Fₙ = Fₙ₋₁ + Fₙ₋₂

Let F(x) = ΣFₙxⁿ.

Multiply recurrence by xⁿ and sum:
$$F(x) - F_0 - F_1 x = x(F(x) - F_0) + x^2 F(x)$$
$$F(x) - x = xF(x) + x^2 F(x)$$
$$F(x)(1 - x - x^2) = x$$
$$F(x) = \frac{x}{1 - x - x^2}$$

### Partial Fractions

Factor: 1 - x - x² = -(x - φ)(x - ψ) where φ = (1+√5)/2, ψ = (1-√5)/2

$$F(x) = \frac{1}{\sqrt{5}}\left(\frac{1}{1-\phi x} - \frac{1}{1-\psi x}\right)$$

Extract coefficients:
$$F_n = \frac{\phi^n - \psi^n}{\sqrt{5}}$$

This is **Binet's formula**.

## Common Generating Functions

| Sequence | OGF |
|----------|-----|
| 1, 1, 1, ... | 1/(1-x) |
| 1, 2, 3, ... | 1/(1-x)² |
| 1, 0, 1, 0, ... | 1/(1-x²) |
| aⁿ | 1/(1-ax) |
| C(n,k) (fixed k) | xᵏ/(1-x)^{k+1} |
| Fibonacci | x/(1-x-x²) |
| Catalan | (1-√(1-4x))/(2x) |

## Exponential Generating Functions

For sequences where order matters:

$$\hat{A}(x) = \sum_{n=0}^{\infty} a_n \frac{x^n}{n!}$$

### Key Property

Product of EGFs:
$$[\frac{x^n}{n!}](\hat{A}(x)\hat{B}(x)) = \sum_{k=0}^{n} \binom{n}{k} a_k b_{n-k}$$

### Examples

$$e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!}$$
generates aₙ = 1 (counts labeled structures).

$$e^{e^x - 1}$$
generates Bell numbers (partitions of labeled set).

## Solving Counting Problems

### Coin Change Problem

**Problem:** Count ways to make n cents using pennies (1¢), nickels (5¢), dimes (10¢).

Each coin type contributes a factor:
$$G(x) = \frac{1}{1-x} \cdot \frac{1}{1-x^5} \cdot \frac{1}{1-x^{10}}$$

[xⁿ]G(x) = number of ways to make n cents.

### Integer Partitions

**Problem:** Count partitions of n (ways to write n as sum of positive integers).

$$P(x) = \prod_{k=1}^{\infty} \frac{1}{1-x^k}$$

Each factor allows any number of parts equal to k.

### Compositions

**Problem:** Count ordered ways to write n as sum of positive integers.

$$C(x) = \frac{x}{1-2x}$$

[xⁿ]C(x) = 2^{n-1} for n ≥ 1.

## Advanced Techniques

### Lagrange Inversion

If y = xφ(y) for formal power series, then:
$$[x^n]y^k = \frac{k}{n}[y^{n-k}]\phi(y)^n$$

### Snake Oil Method

To evaluate sums, find a generating function containing the sum as a coefficient.

### Coefficient Extraction

For rational GFs, use partial fractions.
For algebraic GFs (satisfying polynomial equation), use singularity analysis.

## Asymptotic Analysis

### Growth of Coefficients

For A(x) = P(x)/Q(x) with Q(r) = 0 (smallest root):
$$a_n \sim c \cdot r^{-n}$$

### Catalan Number Asymptotics

$$C_n \sim \frac{4^n}{n^{3/2}\sqrt{\pi}}$$

## Applications

### Probability Generating Functions

For random variable X taking non-negative integers:
$$G_X(x) = \sum_{k=0}^{\infty} P(X=k) x^k = E[x^X]$$

**Properties:**
- E[X] = G'(1)
- Var(X) = G''(1) + G'(1) - (G'(1))²
- Sum of independent variables: multiply PGFs

### Combinatorial Enumeration

Generating functions elegantly count:
- Trees (Cayley's formula)
- Graphs by edges
- Permutations by cycles
- Partitions by part size

## Summary

Generating functions:
- Transform sequences into algebraic objects
- Enable solving recurrences via algebra
- OGFs for unordered selection, EGFs for labeled/ordered
- Product corresponds to convolution/selection
- Powerful for asymptotic analysis
