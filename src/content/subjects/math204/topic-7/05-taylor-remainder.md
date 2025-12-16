# Taylor's Remainder and Error Estimation

When we approximate a function $f(x)$ with its Taylor polynomial $T_n(x)$, we introduce an error. Taylor's Remainder Theorem quantifies this error precisely, allowing us to determine how many terms we need for a desired accuracy and to verify that a Taylor series actually converges to its generating function.

## The Remainder

**Definition:** The **remainder** (or error) of the $n$th-degree Taylor approximation is:
$$R_n(x) = f(x) - T_n(x)$$

where $T_n(x) = \sum_{k=0}^{n} \frac{f^{(k)}(a)}{k!}(x - a)^k$ is the Taylor polynomial.

**Key Questions:**
1. How large is $R_n(x)$?
2. Does $R_n(x) \to 0$ as $n \to \infty$?

The second question determines whether the Taylor series converges to $f(x)$.

## Taylor's Remainder Theorem (Lagrange Form)

**Theorem:** If $f$ has $n+1$ continuous derivatives on an interval containing $a$ and $x$, then:

$$R_n(x) = \frac{f^{(n+1)}(c)}{(n+1)!}(x - a)^{n+1}$$

for some $c$ between $a$ and $x$.

**Interpretation:** The remainder looks like the "next term" in the Taylor series, but with the $(n+1)$st derivative evaluated at some unknown point $c$ instead of at $a$.

**Important:** We usually don't know the exact value of $c$, but we can bound $|f^{(n+1)}(c)|$ to get an error estimate.

## Using the Remainder to Estimate Error

To estimate $|R_n(x)|$:

1. Find an upper bound $M$ such that $|f^{(n+1)}(c)| \leq M$ for all $c$ between $a$ and $x$
2. Compute:
$$|R_n(x)| \leq \frac{M}{(n+1)!}|x - a|^{n+1}$$

This gives the maximum possible error.

### Example 1: Approximating $e^x$ at $x = 1$

Approximate $e$ using the Taylor polynomial $T_3(x)$ of $e^x$ at $a = 0$.

$$T_3(1) = 1 + 1 + \frac{1}{2!} + \frac{1}{3!} = 1 + 1 + 0.5 + 0.166\overline{6} = 2.666\overline{6}$$

**Error Estimate:**
The fourth derivative of $e^x$ is $e^x$, so:
$$R_3(1) = \frac{e^c}{4!} \cdot 1^4 = \frac{e^c}{24}$$

where $0 < c < 1$. Since $e^c < e^1 < 3$ for $c < 1$:
$$|R_3(1)| \leq \frac{3}{24} = 0.125$$

So $e \approx 2.666\overline{6} \pm 0.125$, meaning $2.54 < e < 2.79$.

(The actual value is $e \approx 2.71828$, which indeed falls in this range.)

### Example 2: How many terms for $e^{0.5}$ accurate to 6 decimal places?

We want $|R_n(0.5)| < 0.0000005 = 5 \times 10^{-7}$.

$$|R_n(0.5)| = \frac{e^c}{(n+1)!}(0.5)^{n+1}$$

where $0 < c < 0.5$, so $e^c < e^{0.5} < 2$.

$$|R_n(0.5)| < \frac{2}{(n+1)!}(0.5)^{n+1}$$

We need:
$$\frac{2}{(n+1)!}(0.5)^{n+1} < 5 \times 10^{-7}$$

Testing values:
- $n = 4$: $\frac{2}{5!}(0.5)^5 = \frac{2}{120} \cdot \frac{1}{32} = 0.000521$ (too large)
- $n = 5$: $\frac{2}{6!}(0.5)^6 = \frac{2}{720} \cdot \frac{1}{64} = 0.0000434$ (too large)
- $n = 6$: $\frac{2}{7!}(0.5)^7 = \frac{2}{5040} \cdot \frac{1}{128} = 0.00000310$ (too large)
- $n = 7$: $\frac{2}{8!}(0.5)^8 = \frac{2}{40320} \cdot \frac{1}{256} = 0.000000194$ (small enough!)

We need $n = 7$, so 8 terms total.

### Example 3: Approximating $\sin(0.1)$ with error less than $10^{-5}$

The Maclaurin series for $\sin x$ is:
$$\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots$$

For small $x$, the series converges rapidly. The $(n+1)$st derivative of $\sin x$ is $\pm \sin c$ or $\pm \cos c$, so:
$$|f^{(n+1)}(c)| \leq 1$$

Thus:
$$|R_n(0.1)| \leq \frac{1}{(n+1)!}(0.1)^{n+1}$$

For $n = 1$ (using just $T_1(x) = x$):
$$|R_1(0.1)| \leq \frac{1}{2!}(0.1)^2 = 0.005$$

This is already much smaller than $10^{-5}$, so:
$$\sin(0.1) \approx 0.1$$

with error less than $0.005$. But we want error less than $10^{-5} = 0.00001$.

For $n = 3$ (using $T_3(x) = x - \frac{x^3}{6}$):
$$|R_3(0.1)| \leq \frac{1}{5!}(0.1)^5 = \frac{1}{120} \cdot 10^{-5} = 8.33 \times 10^{-8}$$

This is well below $10^{-5}$, so:
$$\sin(0.1) \approx 0.1 - \frac{0.001}{6} \approx 0.0998333$$

with error less than $10^{-7}$.

(Actual value: $\sin(0.1) \approx 0.0998334166...$)

## Convergence of Taylor Series

**Theorem:** The Taylor series $\sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x - a)^n$ converges to $f(x)$ if and only if:
$$\lim_{n \to \infty} R_n(x) = 0$$

This is the fundamental criterion for a Taylor series to represent its function.

### Example 4: Proving $e^x$ equals its Taylor series

For $f(x) = e^x$ centered at $a = 0$:
$$R_n(x) = \frac{e^c}{(n+1)!}x^{n+1}$$

for some $c$ between 0 and $x$.

**Case 1:** $x > 0$. Then $0 < c < x$, so $e^c < e^x$:
$$|R_n(x)| = \frac{e^c}{(n+1)!}x^{n+1} < \frac{e^x}{(n+1)!}x^{n+1}$$

Since $\lim_{n \to \infty} \frac{x^{n+1}}{(n+1)!} = 0$ for any fixed $x$ (by ratio test), we have:
$$\lim_{n \to \infty} R_n(x) = 0$$

**Case 2:** $x < 0$. Then $x < c < 0$, so $e^c < e^0 = 1$:
$$|R_n(x)| = \frac{e^c}{(n+1)!}|x|^{n+1} < \frac{1}{(n+1)!}|x|^{n+1} \to 0$$

Therefore, the Taylor series for $e^x$ converges to $e^x$ for all $x$.

### Example 5: Why doesn't $f(x) = e^{-1/x^2}$ equal its Taylor series at 0?

Consider:
$$f(x) = \begin{cases} e^{-1/x^2} & x \neq 0 \\ 0 & x = 0 \end{cases}$$

It can be shown (with careful analysis) that $f^{(n)}(0) = 0$ for all $n$. Thus, the Maclaurin series is:
$$\sum_{n=0}^{\infty} \frac{f^{(n)}(0)}{n!}x^n = 0$$

But $f(x) \neq 0$ for $x \neq 0$! What went wrong?

The remainder $R_n(x)$ does not approach 0. Even though all derivatives at 0 are zero, the derivatives grow extremely rapidly away from 0, and the Lagrange form of the remainder remains bounded away from 0.

This example shows that having a Taylor series doesn't guarantee it converges to the function.

## Alternating Series Error Bound

For **alternating series** (like $\sin x$, $\cos x$, $\ln(1+x)$, $\arctan x$), there's a simpler error estimate:

**Alternating Series Remainder Theorem:** If the series alternates and the terms decrease in absolute value, then:
$$|R_n(x)| \leq |a_{n+1}|$$

The error is no larger than the first omitted term.

### Example 6: Approximating $\ln(1.5)$

$$\ln(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} - \frac{x^4}{4} + \cdots$$

For $x = 0.5$:
$$\ln(1.5) = 0.5 - \frac{0.25}{2} + \frac{0.125}{3} - \frac{0.0625}{4} + \cdots$$
$$= 0.5 - 0.125 + 0.0416\overline{6} - 0.015625 + \cdots$$

Using the first three terms:
$$T_3(0.5) = 0.5 - 0.125 + 0.0416\overline{6} \approx 0.4166\overline{6}$$

Error estimate:
$$|R_3(0.5)| \leq \frac{(0.5)^4}{4} = 0.015625$$

So $\ln(1.5) \approx 0.417 \pm 0.016$, meaning $0.401 < \ln(1.5) < 0.433$.

(Actual value: $\ln(1.5) \approx 0.4054651...$)

### Example 7: How many terms for $\cos(1)$ to 4 decimal places?

$$\cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \frac{x^8}{8!} - \cdots$$

For $x = 1$:
$$\cos(1) = 1 - \frac{1}{2} + \frac{1}{24} - \frac{1}{720} + \frac{1}{40320} - \cdots$$

We want error less than $0.00005 = 5 \times 10^{-5}$.

The next term after $\frac{1}{720}$ is $\frac{1}{40320} \approx 0.0000248 < 5 \times 10^{-5}$.

So we need terms through $\frac{x^6}{6!}$:
$$\cos(1) \approx 1 - 0.5 + 0.04166\overline{6} - 0.001388\overline{8} = 0.5402\overline{7}$$

(Actual: $\cos(1) \approx 0.5403023...$)

## Summary of Error Estimation

**Lagrange Remainder (General Method):**
$$|R_n(x)| \leq \frac{M}{(n+1)!}|x - a|^{n+1}$$
where $M$ is an upper bound on $|f^{(n+1)}(c)|$ between $a$ and $x$.

**Alternating Series (When Applicable):**
$$|R_n(x)| \leq |a_{n+1}|$$
The error is bounded by the first omitted term.

**Convergence Criterion:**
The Taylor series equals $f(x)$ if and only if $\lim_{n \to \infty} R_n(x) = 0$.

## Practical Strategy

1. Identify how many terms you need for desired accuracy
2. Use Lagrange remainder or alternating series bound
3. Find an upper bound for the $(n+1)$st derivative
4. Solve the inequality $|R_n(x)| < \epsilon$ for $n$
5. Compute $T_n(x)$ using that many terms

## Summary

- **Remainder** $R_n(x) = f(x) - T_n(x)$ measures the error in Taylor approximation
- **Lagrange form:** $R_n(x) = \frac{f^{(n+1)}(c)}{(n+1)!}(x - a)^{n+1}$ for some $c$ between $a$ and $x$
- To estimate error, bound $|f^{(n+1)}(c)|$ on the interval
- Taylor series converges to $f(x)$ when $\lim_{n \to \infty} R_n(x) = 0$
- **Alternating series** have simpler bound: error $\leq$ first omitted term
- Use remainder estimates to determine how many terms achieve desired accuracy
- Factorials grow so fast that series like $e^x$, $\sin x$, $\cos x$ converge rapidly
