---
id: math204-t6-seq-properties
title: "Sequence Properties"
order: 2
---

# Sequence Properties and Limit Theorems

## Bounded Sequences

A sequence $\{a_n\}$ is said to be **bounded** if there exist real numbers $m$ and $M$ such that:
$$m \leq a_n \leq M \quad \text{for all } n$$

More specifically:
- A sequence is **bounded above** if there exists $M$ such that $a_n \leq M$ for all $n$
- A sequence is **bounded below** if there exists $m$ such that $a_n \geq m$ for all $n$

### Examples

1. The sequence $a_n = \frac{1}{n}$ is bounded: $0 < a_n \leq 1$ for all $n \geq 1$

2. The sequence $a_n = (-1)^n$ is bounded: $-1 \leq a_n \leq 1$ for all $n$

3. The sequence $a_n = n^2$ is bounded below by $1$ but not bounded above

### Theorem: Convergent Sequences are Bounded

If a sequence $\{a_n\}$ converges, then it is bounded.

**Proof**: Suppose $\lim_{n \to \infty} a_n = L$. Choose $\varepsilon = 1$. Then there exists $N$ such that for all $n > N$:
$$|a_n - L| < 1 \implies L - 1 < a_n < L + 1$$

Let $M = \max\{a_1, a_2, \ldots, a_N, L + 1\}$ and $m = \min\{a_1, a_2, \ldots, a_N, L - 1\}$.

Then $m \leq a_n \leq M$ for all $n$, so the sequence is bounded.

**Important Note**: The converse is NOT true. A bounded sequence need not converge. For example, $a_n = (-1)^n$ is bounded but does not converge.

## Monotonic Sequences

A sequence $\{a_n\}$ is called **monotonic** if it is either always increasing or always decreasing.

### Types of Monotonicity

1. **Increasing** (or **non-decreasing**): $a_n \leq a_{n+1}$ for all $n$
   - Example: $a_n = n$ or $a_n = 1 - \frac{1}{n}$

2. **Decreasing** (or **non-increasing**): $a_n \geq a_{n+1}$ for all $n$
   - Example: $a_n = \frac{1}{n}$ or $a_n = e^{-n}$

3. **Strictly increasing**: $a_n < a_{n+1}$ for all $n$

4. **Strictly decreasing**: $a_n > a_{n+1}$ for all $n$

### Testing for Monotonicity

To determine if a sequence is monotonic, you can:

1. **Compare consecutive terms**: Check if $a_{n+1} - a_n$ has a constant sign
   - If $a_{n+1} - a_n \geq 0$ for all $n$, the sequence is increasing
   - If $a_{n+1} - a_n \leq 0$ for all $n$, the sequence is decreasing

2. **Use the ratio test** (for positive sequences): Check if $\frac{a_{n+1}}{a_n}$ is always $\geq 1$ or always $\leq 1$

3. **Use derivatives** (if $a_n = f(n)$): Check if $f'(x) \geq 0$ or $f'(x) \leq 0$ for $x \geq 1$

### Example: Testing Monotonicity

Determine if $a_n = \frac{n}{n+1}$ is monotonic.

**Solution**: Consider the difference:
$$a_{n+1} - a_n = \frac{n+1}{n+2} - \frac{n}{n+1} = \frac{(n+1)^2 - n(n+2)}{(n+1)(n+2)}$$

$$= \frac{n^2 + 2n + 1 - n^2 - 2n}{(n+1)(n+2)} = \frac{1}{(n+1)(n+2)} > 0$$

Since $a_{n+1} - a_n > 0$ for all $n \geq 1$, the sequence is strictly increasing.

## Monotone Convergence Theorem

This is one of the most important theorems for sequences.

**Theorem**: If a sequence is monotonic and bounded, then it converges.

More specifically:
- If $\{a_n\}$ is increasing and bounded above, then it converges to $\sup\{a_n\}$
- If $\{a_n\}$ is decreasing and bounded below, then it converges to $\inf\{a_n\}$

### Example Application

Consider the sequence defined by:
$$a_1 = 1, \quad a_{n+1} = \sqrt{2 + a_n}$$

Show that this sequence converges and find its limit.

**Solution**:

*Step 1: Show the sequence is bounded above.*

We claim $a_n \leq 2$ for all $n$. Proof by induction:
- Base case: $a_1 = 1 \leq 2$ ✓
- Inductive step: If $a_n \leq 2$, then $a_{n+1} = \sqrt{2 + a_n} \leq \sqrt{2 + 2} = 2$ ✓

*Step 2: Show the sequence is increasing.*

We need to show $a_{n+1} \geq a_n$, or equivalently, $\sqrt{2 + a_n} \geq a_n$.

Squaring both sides (valid since both are positive):
$$2 + a_n \geq a_n^2 \iff a_n^2 - a_n - 2 \leq 0 \iff (a_n - 2)(a_n + 1) \leq 0$$

Since $a_n \geq 0$ and $a_n \leq 2$, this inequality holds, so the sequence is increasing.

*Step 3: Apply the Monotone Convergence Theorem.*

Since the sequence is increasing and bounded, it converges to some limit $L$.

*Step 4: Find the limit.*

Taking the limit of both sides of the recurrence relation:
$$L = \sqrt{2 + L}$$

Squaring: $L^2 = 2 + L \implies L^2 - L - 2 = 0 \implies (L-2)(L+1) = 0$

Since $L \geq 0$, we have $L = 2$.

## Limit Theorems

These theorems allow us to manipulate limits of sequences algebraically.

### Basic Limit Laws

If $\lim_{n \to \infty} a_n = L$ and $\lim_{n \to \infty} b_n = M$, then:

1. $\lim_{n \to \infty} (a_n \pm b_n) = L \pm M$

2. $\lim_{n \to \infty} c \cdot a_n = c \cdot L$ for any constant $c$

3. $\lim_{n \to \infty} (a_n \cdot b_n) = L \cdot M$

4. $\lim_{n \to \infty} \frac{a_n}{b_n} = \frac{L}{M}$ if $M \neq 0$

5. $\lim_{n \to \infty} (a_n)^p = L^p$ for rational $p$ (with appropriate restrictions)

### Composition with Continuous Functions

If $\lim_{n \to \infty} a_n = L$ and $f$ is continuous at $L$, then:
$$\lim_{n \to \infty} f(a_n) = f(L)$$

**Example**: If $\lim_{n \to \infty} a_n = 3$, then:
$$\lim_{n \to \infty} e^{a_n} = e^3, \quad \lim_{n \to \infty} \sin(a_n) = \sin(3), \quad \lim_{n \to \infty} \sqrt{a_n} = \sqrt{3}$$

## The Squeeze Theorem for Sequences

The **Squeeze Theorem** (also called the Sandwich Theorem or Pinching Theorem) is a powerful tool for finding limits.

**Theorem**: If $a_n \leq b_n \leq c_n$ for all $n \geq N$ (for some $N$), and if:
$$\lim_{n \to \infty} a_n = \lim_{n \to \infty} c_n = L$$

then:
$$\lim_{n \to \infty} b_n = L$$

### Example 1: Using the Squeeze Theorem

Find $\lim_{n \to \infty} \frac{\sin n}{n}$.

**Solution**: We know that $-1 \leq \sin n \leq 1$ for all $n$. Dividing by $n > 0$:
$$-\frac{1}{n} \leq \frac{\sin n}{n} \leq \frac{1}{n}$$

Since:
$$\lim_{n \to \infty} -\frac{1}{n} = 0 \quad \text{and} \quad \lim_{n \to \infty} \frac{1}{n} = 0$$

by the Squeeze Theorem:
$$\lim_{n \to \infty} \frac{\sin n}{n} = 0$$

### Example 2: More Complex Application

Find $\lim_{n \to \infty} \frac{n!}{n^n}$.

**Solution**: For $n \geq 2$, we can write:
$$\frac{n!}{n^n} = \frac{1 \cdot 2 \cdot 3 \cdots n}{n \cdot n \cdot n \cdots n} = \frac{1}{n} \cdot \frac{2}{n} \cdot \frac{3}{n} \cdots \frac{n}{n}$$

Each factor except the last is at most $1$, so:
$$0 < \frac{n!}{n^n} \leq \frac{1}{n}$$

Since $\lim_{n \to \infty} \frac{1}{n} = 0$, by the Squeeze Theorem:
$$\lim_{n \to \infty} \frac{n!}{n^n} = 0$$

### Example 3: Trigonometric Sequence

Find $\lim_{n \to \infty} \frac{\cos^2 n}{n^2 + 1}$.

**Solution**: Since $0 \leq \cos^2 n \leq 1$:
$$0 \leq \frac{\cos^2 n}{n^2 + 1} \leq \frac{1}{n^2 + 1}$$

As $n \to \infty$:
$$\lim_{n \to \infty} 0 = 0 \quad \text{and} \quad \lim_{n \to \infty} \frac{1}{n^2 + 1} = 0$$

Therefore:
$$\lim_{n \to \infty} \frac{\cos^2 n}{n^2 + 1} = 0$$

## Important Special Limits

Several limits appear frequently and are worth memorizing:

1. $\lim_{n \to \infty} \frac{1}{n^p} = 0$ for any $p > 0$

2. $\lim_{n \to \infty} \sqrt[n]{a} = 1$ for any $a > 0$

3. $\lim_{n \to \infty} \sqrt[n]{n} = 1$

4. $\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e$

5. $\lim_{n \to \infty} \frac{a^n}{n!} = 0$ for any constant $a$

6. $\lim_{n \to \infty} r^n = 0$ if $|r| < 1$

### Example Using Special Limits

Find $\lim_{n \to \infty} \frac{3^n}{n^{100}}$.

**Solution**: We can rewrite this as:
$$\frac{3^n}{n^{100}} = \left(\frac{3}{1}\right)^n \cdot \frac{1}{n^{100}}$$

For large $n$, the exponential term $3^n$ grows much faster than any polynomial $n^{100}$, so:
$$\lim_{n \to \infty} \frac{3^n}{n^{100}} = \infty$$

Alternatively, using L'Hôpital's Rule repeatedly (100 times) on $f(x) = \frac{3^x}{x^{100}}$ would show this limit is infinite.

## Key Takeaways

- Convergent sequences are always bounded, but bounded sequences need not converge
- Monotonic sequences that are bounded must converge
- The Squeeze Theorem is invaluable for sequences involving trigonometric or other oscillating functions
- Understanding these properties helps determine convergence without computing exact limits
