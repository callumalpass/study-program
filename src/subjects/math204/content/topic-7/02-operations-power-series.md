---
id: math204-t7-operations
title: "Operations on Power Series"
order: 2
---

# Operations on Power Series

One of the most powerful features of power series is that they behave like polynomials: you can add, subtract, multiply, differentiate, and integrate them term by term. These operations allow us to build new series from known ones, making it possible to find power series representations for complex functions without computing derivatives from scratch.

## Term-by-Term Differentiation

**Theorem (Differentiation of Power Series):** If $f(x) = \sum_{n=0}^{\infty} c_n (x - a)^n$ has radius of convergence $R > 0$, then $f$ is differentiable on $(a - R, a + R)$ and:

$$f'(x) = \sum_{n=1}^{\infty} n c_n (x - a)^{n-1}$$

Moreover, the derivative has the same radius of convergence $R$.

**Key Points:**
- Differentiate each term individually as if it were a polynomial
- The constant term $c_0$ disappears (derivative of constant is zero)
- The index starts at $n = 1$ instead of $n = 0$
- The radius of convergence is preserved

**Example 1:** Differentiate $f(x) = \sum_{n=0}^{\infty} x^n = 1 + x + x^2 + x^3 + \cdots$

We know this equals $\frac{1}{1-x}$ for $|x| < 1$. Differentiating term by term:

$$f'(x) = \sum_{n=1}^{\infty} n x^{n-1} = 1 + 2x + 3x^2 + 4x^3 + \cdots$$

We can verify this equals $\frac{d}{dx}\left[\frac{1}{1-x}\right] = \frac{1}{(1-x)^2}$ for $|x| < 1$.

**Example 2:** Find a power series for $\frac{1}{(1-x)^2}$ using differentiation.

Start with:
$$\frac{1}{1-x} = \sum_{n=0}^{\infty} x^n$$

Differentiate both sides:
$$\frac{1}{(1-x)^2} = \sum_{n=1}^{\infty} n x^{n-1}$$

We can reindex by letting $m = n - 1$:
$$\frac{1}{(1-x)^2} = \sum_{m=0}^{\infty} (m+1) x^m$$

Or keep the original form:
$$\frac{1}{(1-x)^2} = 1 + 2x + 3x^2 + 4x^3 + \cdots$$

**Example 3:** Find a power series for $\frac{1}{(1+x)^2}$.

From $\frac{1}{1-x} = \sum_{n=0}^{\infty} x^n$, substitute $-x$:
$$\frac{1}{1+x} = \sum_{n=0}^{\infty} (-x)^n = \sum_{n=0}^{\infty} (-1)^n x^n$$

Differentiate:
$$-\frac{1}{(1+x)^2} = \sum_{n=1}^{\infty} (-1)^n n x^{n-1}$$

Therefore:
$$\frac{1}{(1+x)^2} = \sum_{n=1}^{\infty} (-1)^{n+1} n x^{n-1} = 1 - 2x + 3x^2 - 4x^3 + \cdots$$

## Term-by-Term Integration

**Theorem (Integration of Power Series):** If $f(x) = \sum_{n=0}^{\infty} c_n (x - a)^n$ has radius of convergence $R > 0$, then $f$ is integrable on $(a - R, a + R)$ and:

$$\int f(x)\, dx = C + \sum_{n=0}^{\infty} \frac{c_n}{n+1} (x - a)^{n+1}$$

The integrated series also has radius of convergence $R$.

**Key Points:**
- Integrate each term individually
- Add a constant of integration $C$
- Each power increases by 1
- Each coefficient is divided by the new power

**Example 4:** Find a power series for $\ln(1 + x)$.

We know:
$$\frac{1}{1+x} = \sum_{n=0}^{\infty} (-1)^n x^n = 1 - x + x^2 - x^3 + \cdots$$

for $|x| < 1$. Integrate both sides:

$$\ln(1 + x) = C + \sum_{n=0}^{\infty} \frac{(-1)^n}{n+1} x^{n+1}$$

Setting $x = 0$ gives $\ln(1) = 0 = C$, so $C = 0$.

$$\ln(1 + x) = \sum_{n=0}^{\infty} \frac{(-1)^n}{n+1} x^{n+1}$$

Reindexing with $m = n + 1$:
$$\ln(1 + x) = \sum_{m=1}^{\infty} \frac{(-1)^{m-1}}{m} x^m = \sum_{m=1}^{\infty} \frac{(-1)^{m+1}}{m} x^m$$

$$\ln(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \cdots$$

**Example 5:** Find a power series for $\arctan x$.

We know:
$$\frac{1}{1+x^2} = \sum_{n=0}^{\infty} (-1)^n x^{2n} = 1 - x^2 + x^4 - x^6 + \cdots$$

Since $\frac{d}{dx}[\arctan x] = \frac{1}{1+x^2}$, we integrate:

$$\arctan x = C + \sum_{n=0}^{\infty} \frac{(-1)^n}{2n+1} x^{2n+1}$$

Setting $x = 0$ gives $\arctan(0) = 0 = C$, so:

$$\arctan x = \sum_{n=0}^{\infty} \frac{(-1)^n}{2n+1} x^{2n+1} = x - \frac{x^3}{3} + \frac{x^5}{5} - \frac{x^7}{7} + \cdots$$

This converges for $|x| \leq 1$ (can be shown by testing endpoints).

## Addition and Subtraction

Power series with the same center can be added or subtracted term by term.

**Theorem:** If $f(x) = \sum_{n=0}^{\infty} a_n x^n$ converges for $|x| < R_1$ and $g(x) = \sum_{n=0}^{\infty} b_n x^n$ converges for $|x| < R_2$, then:

$$f(x) \pm g(x) = \sum_{n=0}^{\infty} (a_n \pm b_n) x^n$$

for $|x| < \min\{R_1, R_2\}$.

**Example 6:** Find a series for $e^x \cos x$ using addition (we'll see a better method with multiplication).

If we knew series for $e^x \cos x$ and other related functions, we could combine them. But this motivates multiplication.

## Multiplication

Power series can be multiplied like polynomials, collecting terms with the same power.

**Theorem (Cauchy Product):** If $f(x) = \sum_{n=0}^{\infty} a_n x^n$ and $g(x) = \sum_{n=0}^{\infty} b_n x^n$ both converge absolutely for $|x| < R$, then:

$$f(x) \cdot g(x) = \sum_{n=0}^{\infty} c_n x^n$$

where $c_n = \sum_{k=0}^{n} a_k b_{n-k} = a_0 b_n + a_1 b_{n-1} + a_2 b_{n-2} + \cdots + a_n b_0$.

**Example 7:** Find the first few terms of $e^x \sin x$.

$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$$
$$\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots$$

Multiply:
$$e^x \sin x = \left(1 + x + \frac{x^2}{2} + \frac{x^3}{6} + \cdots\right)\left(x - \frac{x^3}{6} + \cdots\right)$$

- Coefficient of $x$: $1 \cdot 1 = 1$
- Coefficient of $x^2$: $1 \cdot 0 + 1 \cdot 1 = 1$
- Coefficient of $x^3$: $1 \cdot (-\frac{1}{6}) + 1 \cdot 0 + \frac{1}{2} \cdot 1 = -\frac{1}{6} + \frac{1}{2} = \frac{1}{3}$
- Coefficient of $x^4$: $1 \cdot 0 + 1 \cdot (-\frac{1}{6}) + \frac{1}{2} \cdot 0 + \frac{1}{6} \cdot 1 = 0$

$$e^x \sin x = x + x^2 + \frac{x^3}{3} + \cdots$$

## Substitution

If $\sum_{n=0}^{\infty} c_n x^n$ converges for $|x| < R$, then $\sum_{n=0}^{\infty} c_n [u(x)]^n$ converges when $|u(x)| < R$.

**Example 8:** Find a power series for $e^{-x^2}$.

Start with:
$$e^x = \sum_{n=0}^{\infty} \frac{x^n}{n!}$$

Substitute $-x^2$ for $x$:
$$e^{-x^2} = \sum_{n=0}^{\infty} \frac{(-x^2)^n}{n!} = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n}}{n!}$$

$$e^{-x^2} = 1 - x^2 + \frac{x^4}{2!} - \frac{x^6}{3!} + \frac{x^8}{4!} - \cdots$$

This converges for all $x$ (since the original series had $R = \infty$).

**Example 9:** Find a power series for $\sin(x^2)$.

$$\sin x = \sum_{n=0}^{\infty} \frac{(-1)^n x^{2n+1}}{(2n+1)!}$$

Substitute $x^2$:
$$\sin(x^2) = \sum_{n=0}^{\infty} \frac{(-1)^n (x^2)^{2n+1}}{(2n+1)!} = \sum_{n=0}^{\infty} \frac{(-1)^n x^{4n+2}}{(2n+1)!}$$

$$\sin(x^2) = x^2 - \frac{x^6}{3!} + \frac{x^{10}}{5!} - \frac{x^{14}}{7!} + \cdots$$

**Example 10:** Find a power series for $\frac{x}{1 - x^3}$.

Start with:
$$\frac{1}{1-x} = \sum_{n=0}^{\infty} x^n$$

Substitute $x^3$:
$$\frac{1}{1-x^3} = \sum_{n=0}^{\infty} (x^3)^n = \sum_{n=0}^{\infty} x^{3n}$$

Multiply by $x$:
$$\frac{x}{1-x^3} = x \sum_{n=0}^{\infty} x^{3n} = \sum_{n=0}^{\infty} x^{3n+1}$$

$$\frac{x}{1-x^3} = x + x^4 + x^7 + x^{10} + \cdots$$

## Composition

For more complex compositions, substitute the entire series.

**Example 11:** Find the first few terms of $e^{\sin x}$.

$$e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$$
$$\sin x = x - \frac{x^3}{6} + \frac{x^5}{120} - \cdots$$

Substitute:
$$e^{\sin x} = 1 + \left(x - \frac{x^3}{6} + \cdots\right) + \frac{1}{2}\left(x - \frac{x^3}{6} + \cdots\right)^2 + \frac{1}{6}\left(x - \frac{x^3}{6} + \cdots\right)^3 + \cdots$$

Computing $(\sin x)^2 = x^2 + O(x^4)$ and $(\sin x)^3 = x^3 + O(x^5)$:

$$e^{\sin x} = 1 + x + \frac{x^2}{2} - \frac{x^3}{6} + \frac{x^3}{6} + \cdots = 1 + x + \frac{x^2}{2} - \frac{x^4}{8} + \cdots$$

## Division

Power series can be divided by long division or by finding the reciprocal.

**Example 12:** Express $\frac{1}{1-x-x^2}$ as a power series.

Let $f(x) = 1 - x - x^2$ and find $g(x) = \sum_{n=0}^{\infty} a_n x^n$ such that $f(x) g(x) = 1$.

$$(1 - x - x^2)(a_0 + a_1 x + a_2 x^2 + a_3 x^3 + \cdots) = 1$$

Expanding and matching coefficients:
- $x^0$: $a_0 = 1$
- $x^1$: $a_1 - a_0 = 0 \Rightarrow a_1 = 1$
- $x^2$: $a_2 - a_1 - a_0 = 0 \Rightarrow a_2 = 2$
- $x^3$: $a_3 - a_2 - a_1 = 0 \Rightarrow a_3 = 3$
- $x^n$: $a_n = a_{n-1} + a_{n-2}$ (Fibonacci recurrence!)

$$\frac{1}{1-x-x^2} = 1 + x + 2x^2 + 3x^3 + 5x^4 + 8x^5 + 13x^6 + \cdots$$

The coefficients are the Fibonacci numbers!

## Strategy for Building New Series

1. **Start with known series:** $\frac{1}{1-x}$, $e^x$, $\sin x$, $\cos x$
2. **Use substitution** to modify the argument: replace $x$ with $-x$, $x^2$, $2x$, etc.
3. **Differentiate or integrate** to transform the function
4. **Multiply by $x^n$** or constants to shift or scale
5. **Add/subtract** known series
6. **Multiply** series when needed
7. **Verify the interval of convergence** for the final result

## Summary

- **Differentiate term by term:** $\frac{d}{dx}\sum c_n x^n = \sum n c_n x^{n-1}$
- **Integrate term by term:** $\int \sum c_n x^n\, dx = C + \sum \frac{c_n}{n+1} x^{n+1}$
- **Radius of convergence is preserved** under differentiation and integration
- **Add/subtract** series with the same center
- **Multiply** using the Cauchy product
- **Substitute** $u(x)$ for $x$ when $|u(x)| < R$
- **These operations build new series from known ones**, avoiding tedious derivative calculations
- **Always check the interval of convergence** after performing operations
