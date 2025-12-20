---
id: math204-t6-sequences-def
title: "Sequences Definition"
order: 1
---

# Sequences: Definition and Convergence

## Introduction to Sequences

A **sequence** is an ordered list of numbers that follows a specific pattern or rule. Formally, a sequence is a function whose domain is the set of positive integers. We typically denote a sequence as $\{a_n\}$ or $(a_n)_{n=1}^{\infty}$, where $a_n$ represents the $n$-th term of the sequence.

For example, the sequence $\{a_n\} = \left\{\frac{1}{n}\right\}$ gives us:
$$a_1 = 1, \quad a_2 = \frac{1}{2}, \quad a_3 = \frac{1}{3}, \quad a_4 = \frac{1}{4}, \ldots$$

## Notation and Terminology

The general term $a_n$ is called the **$n$-th term** of the sequence. The subscript $n$ is called the **index**, and it typically starts at $n = 1$, though it can start at any integer value depending on the context.

Common ways to define a sequence include:

1. **Explicit formula**: $a_n = f(n)$ for some function $f$
   - Example: $a_n = \frac{(-1)^n}{n^2}$

2. **Recursive formula**: Each term is defined in terms of previous terms
   - Example: $a_1 = 1, \quad a_n = 2a_{n-1} + 1$ for $n \geq 2$

3. **Listing terms**: Simply writing out the first several terms
   - Example: $1, \frac{1}{2}, \frac{1}{3}, \frac{1}{4}, \ldots$

## Limit of a Sequence

The most important concept for sequences is the idea of a **limit**. Intuitively, a sequence has a limit $L$ if the terms $a_n$ get arbitrarily close to $L$ as $n$ becomes large.

### Formal Definition

We say that the sequence $\{a_n\}$ **converges** to the limit $L$, written as:
$$\lim_{n \to \infty} a_n = L$$

if for every $\varepsilon > 0$, there exists a positive integer $N$ such that:
$$|a_n - L| < \varepsilon \quad \text{whenever} \quad n > N$$

This definition captures the idea that no matter how small we make $\varepsilon$ (representing our tolerance for error), we can always find a point in the sequence (at index $N$) beyond which all terms are within $\varepsilon$ of $L$.

### Geometric Interpretation

Imagine drawing a horizontal band of width $2\varepsilon$ centered at $L$, extending from $L - \varepsilon$ to $L + \varepsilon$. The sequence converges to $L$ if, no matter how narrow we make this band, eventually all terms of the sequence (beyond some index $N$) lie within this band.

## Convergence and Divergence

A sequence is said to be **convergent** if it has a finite limit. Otherwise, the sequence is **divergent**.

### Types of Divergence

1. **Divergence to infinity**: $\lim_{n \to \infty} a_n = \infty$
   - Example: $a_n = n^2$ diverges to infinity

2. **Divergence to negative infinity**: $\lim_{n \to \infty} a_n = -\infty$
   - Example: $a_n = -n^3$ diverges to negative infinity

3. **Oscillating divergence**: The sequence oscillates without approaching any value
   - Example: $a_n = (-1)^n$ oscillates between $-1$ and $1$

## Examples of Limits

### Example 1: Simple Rational Function

Find $\lim_{n \to \infty} \frac{3n + 2}{5n - 1}$.

**Solution**: Divide both numerator and denominator by the highest power of $n$ (which is $n$):
$$\lim_{n \to \infty} \frac{3n + 2}{5n - 1} = \lim_{n \to \infty} \frac{3 + \frac{2}{n}}{5 - \frac{1}{n}}$$

As $n \to \infty$, both $\frac{2}{n}$ and $\frac{1}{n}$ approach $0$:
$$= \frac{3 + 0}{5 - 0} = \frac{3}{5}$$

### Example 2: Exponential Decay

Find $\lim_{n \to \infty} \frac{1}{2^n}$.

**Solution**: As $n$ increases, $2^n$ grows without bound, so $\frac{1}{2^n}$ approaches $0$:
$$\lim_{n \to \infty} \frac{1}{2^n} = 0$$

This is a classic example of exponential decay.

### Example 3: Alternating Sequence

Find $\lim_{n \to \infty} \frac{(-1)^n}{n}$.

**Solution**: The sequence alternates in sign, but the magnitude $\frac{1}{n}$ approaches $0$. Since:
$$\left|\frac{(-1)^n}{n}\right| = \frac{1}{n} \to 0$$

we can conclude:
$$\lim_{n \to \infty} \frac{(-1)^n}{n} = 0$$

### Example 4: Higher Degree Polynomial Ratio

Find $\lim_{n \to \infty} \frac{n^2 - 3n + 1}{2n^2 + 5}$.

**Solution**: Divide both numerator and denominator by $n^2$:
$$\lim_{n \to \infty} \frac{n^2 - 3n + 1}{2n^2 + 5} = \lim_{n \to \infty} \frac{1 - \frac{3}{n} + \frac{1}{n^2}}{2 + \frac{5}{n^2}}$$

As $n \to \infty$, all terms with $n$ in the denominator approach $0$:
$$= \frac{1 - 0 + 0}{2 + 0} = \frac{1}{2}$$

### Example 5: Square Root Expression

Find $\lim_{n \to \infty} \frac{\sqrt{n^2 + n}}{n + 1}$.

**Solution**: Factor out $n^2$ from inside the square root:
$$\frac{\sqrt{n^2 + n}}{n + 1} = \frac{\sqrt{n^2(1 + \frac{1}{n})}}{n + 1} = \frac{n\sqrt{1 + \frac{1}{n}}}{n + 1}$$

Divide numerator and denominator by $n$:
$$= \frac{\sqrt{1 + \frac{1}{n}}}{1 + \frac{1}{n}}$$

Taking the limit:
$$\lim_{n \to \infty} \frac{\sqrt{1 + \frac{1}{n}}}{1 + \frac{1}{n}} = \frac{\sqrt{1 + 0}}{1 + 0} = 1$$

## Important Limit Rules

If $\lim_{n \to \infty} a_n = L$ and $\lim_{n \to \infty} b_n = M$, then:

1. **Sum Rule**: $\lim_{n \to \infty} (a_n + b_n) = L + M$

2. **Difference Rule**: $\lim_{n \to \infty} (a_n - b_n) = L - M$

3. **Constant Multiple Rule**: $\lim_{n \to \infty} ca_n = cL$ for any constant $c$

4. **Product Rule**: $\lim_{n \to \infty} (a_n \cdot b_n) = L \cdot M$

5. **Quotient Rule**: $\lim_{n \to \infty} \frac{a_n}{b_n} = \frac{L}{M}$ (provided $M \neq 0$)

6. **Power Rule**: $\lim_{n \to \infty} (a_n)^p = L^p$ (for appropriate values of $p$ and $L$)

## Connection to Functions

If $f(x)$ is a function defined for all real numbers $x \geq 1$, and $a_n = f(n)$, then:
$$\text{If } \lim_{x \to \infty} f(x) = L, \text{ then } \lim_{n \to \infty} a_n = L$$

This allows us to use L'Hôpital's Rule and other techniques from continuous functions to evaluate sequence limits.

### Example Using L'Hôpital's Rule

Find $\lim_{n \to \infty} \frac{\ln n}{n}$.

**Solution**: Consider $f(x) = \frac{\ln x}{x}$. This is an $\frac{\infty}{\infty}$ indeterminate form, so we can apply L'Hôpital's Rule:
$$\lim_{x \to \infty} \frac{\ln x}{x} = \lim_{x \to \infty} \frac{\frac{1}{x}}{1} = \lim_{x \to \infty} \frac{1}{x} = 0$$

Therefore:
$$\lim_{n \to \infty} \frac{\ln n}{n} = 0$$

## Uniqueness of Limits

An important theorem states that if a sequence converges, its limit is **unique**. That is, a sequence cannot converge to two different values simultaneously.

**Proof Sketch**: Suppose $\{a_n\}$ converges to both $L$ and $M$ with $L \neq M$. Choose $\varepsilon = \frac{|L - M|}{2} > 0$. By the definition of convergence, there exist indices $N_1$ and $N_2$ such that for $n > \max\{N_1, N_2\}$, we have both $|a_n - L| < \varepsilon$ and $|a_n - M| < \varepsilon$. But this leads to a contradiction via the triangle inequality, proving that $L = M$.

## Key Takeaways

- Sequences are ordered lists of numbers indexed by positive integers
- A sequence converges to $L$ if its terms get arbitrarily close to $L$ as $n \to \infty$
- Convergent sequences have unique limits
- Many limit laws from calculus apply to sequences
- We can often treat sequences as discrete versions of continuous functions
