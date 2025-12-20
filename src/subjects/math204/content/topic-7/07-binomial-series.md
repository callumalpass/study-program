# The Binomial Series

The binomial series generalizes the binomial theorem from integer exponents to arbitrary real (and even complex) exponents. It provides power series representations for functions like $\sqrt{1+x}$, $\frac{1}{1+x}$, and $(1+x)^{2/3}$, which are essential in approximation theory, numerical analysis, and applied mathematics.

## The Binomial Theorem (Integer Exponents)

You already know that for a positive integer $n$:

$$(1 + x)^n = \sum_{k=0}^{n} \binom{n}{k} x^k = \binom{n}{0} + \binom{n}{1}x + \binom{n}{2}x^2 + \cdots + \binom{n}{n}x^n$$

where the **binomial coefficient** is:
$$\binom{n}{k} = \frac{n!}{k!(n-k)!}$$

**Key features:**
- The series is finite (terminates at $k = n$)
- Converges for all $x$ (it's a polynomial)
- Coefficients are always integers

**Example:** $(1 + x)^3 = 1 + 3x + 3x^2 + x^3$

## The Binomial Series (General Exponents)

When $p$ is not a non-negative integer, the binomial series is:

$$(1 + x)^p = \sum_{n=0}^{\infty} \binom{p}{n} x^n$$

where the **generalized binomial coefficient** is:

$$\binom{p}{n} = \frac{p(p-1)(p-2)\cdots(p-n+1)}{n!}$$

More explicitly:
$$\binom{p}{0} = 1$$
$$\binom{p}{1} = p$$
$$\binom{p}{2} = \frac{p(p-1)}{2!}$$
$$\binom{p}{3} = \frac{p(p-1)(p-2)}{3!}$$
$$\binom{p}{n} = \frac{p(p-1)(p-2)\cdots(p-n+1)}{n!}$$

**Full expansion:**
$$(1 + x)^p = 1 + px + \frac{p(p-1)}{2!}x^2 + \frac{p(p-1)(p-2)}{3!}x^3 + \cdots$$

**Interval of convergence:** $|x| < 1$ for any real $p$ (can be shown by ratio test)

**Key difference from integer case:**
- The series is infinite (never terminates unless $p$ is a non-negative integer)
- Converges only for $|x| < 1$
- Coefficients are not generally integers

## Deriving the Binomial Series

We can derive this as a Taylor series. Let $f(x) = (1 + x)^p$.

**Derivatives:**
- $f(x) = (1 + x)^p$
- $f'(x) = p(1 + x)^{p-1}$
- $f''(x) = p(p-1)(1 + x)^{p-2}$
- $f'''(x) = p(p-1)(p-2)(1 + x)^{p-3}$
- $f^{(n)}(x) = p(p-1)(p-2)\cdots(p-n+1)(1 + x)^{p-n}$

**Evaluate at $x = 0$:**
- $f^{(n)}(0) = p(p-1)(p-2)\cdots(p-n+1)$

**Taylor series:**
$$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!}x^n = \sum_{n=0}^{\infty} \frac{p(p-1)(p-2)\cdots(p-n+1)}{n!}x^n$$

This is precisely the binomial series.

## Common Special Cases

### Case 1: $p = -1$ (Geometric Series)

$$(1 + x)^{-1} = \frac{1}{1+x} = \sum_{n=0}^{\infty} \binom{-1}{n} x^n$$

Computing coefficients:
$$\binom{-1}{n} = \frac{(-1)(-2)(-3)\cdots(-n)}{n!} = \frac{(-1)^n \cdot n!}{n!} = (-1)^n$$

$$(1 + x)^{-1} = 1 - x + x^2 - x^3 + x^4 - \cdots = \sum_{n=0}^{\infty} (-1)^n x^n$$

This recovers the geometric series for $\frac{1}{1+x}$.

### Case 2: $p = -2$

$$(1 + x)^{-2} = \frac{1}{(1+x)^2} = \sum_{n=0}^{\infty} \binom{-2}{n} x^n$$

$$\binom{-2}{n} = \frac{(-2)(-3)(-4)\cdots(-n-1)}{n!} = \frac{(-1)^n (n+1)!}{n!} = (-1)^n (n+1)$$

$$(1 + x)^{-2} = 1 - 2x + 3x^2 - 4x^3 + 5x^4 - \cdots = \sum_{n=0}^{\infty} (-1)^n (n+1) x^n$$

### Case 3: $p = \frac{1}{2}$ (Square Root)

$$(1 + x)^{1/2} = \sqrt{1 + x} = 1 + \frac{1}{2}x + \frac{(1/2)(-1/2)}{2!}x^2 + \frac{(1/2)(-1/2)(-3/2)}{3!}x^3 + \cdots$$

Computing coefficients:
$$\binom{1/2}{1} = \frac{1}{2}$$
$$\binom{1/2}{2} = \frac{(1/2)(-1/2)}{2} = -\frac{1}{8}$$
$$\binom{1/2}{3} = \frac{(1/2)(-1/2)(-3/2)}{6} = \frac{1}{16}$$
$$\binom{1/2}{4} = \frac{(1/2)(-1/2)(-3/2)(-5/2)}{24} = -\frac{5}{128}$$

$$\sqrt{1 + x} = 1 + \frac{1}{2}x - \frac{1}{8}x^2 + \frac{1}{16}x^3 - \frac{5}{128}x^4 + \cdots$$

### Case 4: $p = -\frac{1}{2}$ (Reciprocal Square Root)

$$(1 + x)^{-1/2} = \frac{1}{\sqrt{1 + x}} = 1 - \frac{1}{2}x + \frac{3}{8}x^2 - \frac{5}{16}x^3 + \frac{35}{128}x^4 - \cdots$$

### Case 5: $p = \frac{1}{3}$ (Cube Root)

$$(1 + x)^{1/3} = 1 + \frac{1}{3}x - \frac{1}{9}x^2 + \frac{5}{81}x^3 - \frac{10}{243}x^4 + \cdots$$

## Applications

### Example 1: Approximating $\sqrt{1.2}$

Use $(1 + x)^{1/2}$ with $x = 0.2$:

$$\sqrt{1.2} = 1 + \frac{1}{2}(0.2) - \frac{1}{8}(0.04) + \frac{1}{16}(0.008) - \cdots$$

$$= 1 + 0.1 - 0.005 + 0.0005 - \cdots$$

$$\approx 1.0955$$

(Actual: $\sqrt{1.2} \approx 1.0954451...$)

### Example 2: Approximating $\frac{1}{\sqrt{1.1}}$

Use $(1 + x)^{-1/2}$ with $x = 0.1$:

$$\frac{1}{\sqrt{1.1}} = 1 - \frac{1}{2}(0.1) + \frac{3}{8}(0.01) - \frac{5}{16}(0.001) + \cdots$$

$$= 1 - 0.05 + 0.00375 - 0.0003125 + \cdots$$

$$\approx 0.9534$$

(Actual: $\frac{1}{\sqrt{1.1}} \approx 0.9534626...$)

### Example 3: Expanding $(1 - x^2)^{-1/2}$

This appears in calculus when integrating $\frac{1}{\sqrt{1-x^2}}$ (the derivative of $\arcsin x$).

Using $(1 + u)^{-1/2}$ with $u = -x^2$:

$$(1 - x^2)^{-1/2} = 1 + \frac{1}{2}x^2 + \frac{3}{8}x^4 + \frac{5}{16}x^6 + \cdots$$

Integrating:
$$\arcsin x = \int (1 - x^2)^{-1/2}\, dx = x + \frac{x^3}{6} + \frac{3x^5}{40} + \frac{5x^7}{112} + \cdots$$

### Example 4: Estimating $\sqrt[3]{9}$

Write $\sqrt[3]{9} = \sqrt[3]{8 \cdot \frac{9}{8}} = 2\sqrt[3]{1 + 1/8} = 2(1 + 1/8)^{1/3}$.

Use $(1 + x)^{1/3}$ with $x = 1/8 = 0.125$:

$$(1.125)^{1/3} = 1 + \frac{1}{3}(0.125) - \frac{1}{9}(0.015625) + \cdots$$

$$= 1 + 0.041667 - 0.001736 + \cdots \approx 1.03993$$

$$\sqrt[3]{9} \approx 2 \times 1.03993 = 2.07986$$

(Actual: $\sqrt[3]{9} \approx 2.08008...$)

## Generalizing Beyond $(1+x)^p$

To find series for $(a + bx)^p$, factor:

$$(a + bx)^p = a^p \left(1 + \frac{b}{a}x\right)^p = a^p \sum_{n=0}^{\infty} \binom{p}{n} \left(\frac{b}{a}x\right)^n$$

### Example 5: Expanding $(4 + x)^{1/2}$

$$(4 + x)^{1/2} = 4^{1/2}\left(1 + \frac{x}{4}\right)^{1/2} = 2\left(1 + \frac{x}{4}\right)^{1/2}$$

$$= 2\left[1 + \frac{1}{2}\left(\frac{x}{4}\right) - \frac{1}{8}\left(\frac{x}{4}\right)^2 + \cdots\right]$$

$$= 2 + \frac{x}{4} - \frac{x^2}{64} + \cdots$$

## Pattern Recognition in Coefficients

For $(1+x)^p$:

**Numerators:** Products of $(p - k)$ for $k = 0, 1, 2, \ldots$
- $\binom{p}{1} = p$
- $\binom{p}{2} = \frac{p(p-1)}{2}$
- $\binom{p}{3} = \frac{p(p-1)(p-2)}{6}$

**Sign alternation:** When $p < 0$, terms alternate in sign starting from the second term. When $0 < p < 1$, terms eventually alternate.

**Decay rate:** For $|x| < 1$, later terms become negligible rapidly.

## Radius of Convergence

Using the ratio test on $(1+x)^p = \sum \binom{p}{n} x^n$:

$$\lim_{n \to \infty} \left|\frac{\binom{p}{n+1}}{\binom{p}{n}}\right| = \lim_{n \to \infty} \left|\frac{p-n}{n+1}\right| = 1$$

Therefore $R = 1$, and the series converges for $|x| < 1$ (diverges for $|x| > 1$).

At the endpoints $x = \pm 1$, convergence depends on $p$ and must be checked separately.

## Historical Note

The binomial series was discovered by Isaac Newton around 1665 and represents one of the first major generalizations beyond polynomials. It played a crucial role in the development of calculus and infinite series theory.

Newton used it to find series for functions like $\sqrt{1+x}$ and thereby to compute areas, solve equations, and develop numerical methods—all before the formal invention of Taylor series!

## Summary

- **Binomial series:** $(1+x)^p = \sum_{n=0}^{\infty} \binom{p}{n} x^n$ for any real $p$
- **Generalized binomial coefficient:** $\binom{p}{n} = \frac{p(p-1)\cdots(p-n+1)}{n!}$
- **Converges for** $|x| < 1$ when $p$ is not a non-negative integer
- **Special cases:** $p = -1$ (geometric), $p = 1/2$ (square root), $p = -1/2$ (reciprocal square root)
- **Applications:** Approximating roots, expanding rational powers, integrating complex functions
- For $(a + bx)^p$, factor out $a^p$ and use $(1 + \frac{b}{a}x)^p$
- Newton discovered this before Taylor series, making it historically significant
- Enables expansion of any function of the form $(1+x)^p$ as a power series
