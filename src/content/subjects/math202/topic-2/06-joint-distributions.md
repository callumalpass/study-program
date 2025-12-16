# Joint Distributions

So far we've studied single random variables in isolation. In practice, we often deal with multiple random variables simultaneously—stock prices and interest rates, height and weight, temperature and humidity. Joint distributions provide the framework for analyzing relationships between random variables.

## Joint Probability Mass Function (Discrete)

For discrete random variables $X$ and $Y$, the **joint PMF** is:

$$p_{X,Y}(x,y) = P(X = x, Y = y)$$

This gives the probability that $X = x$ AND $Y = y$ occur simultaneously.

### Properties of Joint PMFs

1. **Non-negativity:** $p_{X,Y}(x,y) \geq 0$ for all $x, y$

2. **Normalization:** $\sum_x \sum_y p_{X,Y}(x,y) = 1$

### Example 1: Two Dice

Roll two fair dice. Let $X$ be the result of the first die and $Y$ the result of the second.

For fair dice:
$$p_{X,Y}(i,j) = \frac{1}{36} \quad \text{for } i,j \in \{1,2,3,4,5,6\}$$

$$p_{X,Y}(i,j) = 0 \quad \text{otherwise}$$

This represents **independence**: the outcome of one die doesn't affect the other.

### Example 2: Dependent Random Variables

Draw two cards from a deck without replacement. Let:
- $X = 1$ if first card is an ace, 0 otherwise
- $Y = 1$ if second card is an ace, 0 otherwise

$$p_{X,Y}(1,1) = P(\text{both aces}) = \frac{4}{52} \cdot \frac{3}{51} = \frac{12}{2652} = \frac{1}{221}$$

$$p_{X,Y}(1,0) = P(\text{first ace, second not}) = \frac{4}{52} \cdot \frac{48}{51} = \frac{192}{2652} = \frac{16}{221}$$

$$p_{X,Y}(0,1) = P(\text{first not ace, second ace}) = \frac{48}{52} \cdot \frac{4}{51} = \frac{192}{2652} = \frac{16}{221}$$

$$p_{X,Y}(0,0) = P(\text{neither ace}) = \frac{48}{52} \cdot \frac{47}{51} = \frac{2256}{2652} = \frac{188}{221}$$

Notice these probabilities sum to 1, and the variables are **dependent** (knowing the first card affects probabilities for the second).

## Joint Probability Density Function (Continuous)

For continuous random variables $X$ and $Y$, the **joint PDF** $f_{X,Y}(x,y)$ satisfies:

$$P((X,Y) \in A) = \iint_A f_{X,Y}(x,y) \, dx \, dy$$

for any region $A$ in the plane.

### Properties of Joint PDFs

1. **Non-negativity:** $f_{X,Y}(x,y) \geq 0$ for all $x, y$

2. **Normalization:** $\int_{-\infty}^{\infty} \int_{-\infty}^{\infty} f_{X,Y}(x,y) \, dx \, dy = 1$

### Example 3: Uniform Distribution on a Square

$X$ and $Y$ are uniformly distributed on $[0,1] \times [0,1]$:

$$f_{X,Y}(x,y) = \begin{cases}
1 & \text{if } 0 \leq x \leq 1, 0 \leq y \leq 1 \\
0 & \text{otherwise}
\end{cases}$$

**Verification:**
$$\int_0^1 \int_0^1 1 \, dx \, dy = 1$$ ✓

**Computing probabilities:**

$$P(X + Y \leq 1) = \int_0^1 \int_0^{1-x} 1 \, dy \, dx = \int_0^1 (1-x) \, dx = \left[x - \frac{x^2}{2}\right]_0^1 = \frac{1}{2}$$

### Example 4: Triangular Support

$$f_{X,Y}(x,y) = \begin{cases}
2 & \text{if } 0 \leq y \leq x \leq 1 \\
0 & \text{otherwise}
\end{cases}$$

**Verification:**
$$\int_0^1 \int_0^x 2 \, dy \, dx = \int_0^1 2x \, dx = [x^2]_0^1 = 1$$ ✓

This represents a triangular region where $Y \leq X$ (both in $[0,1]$).

## Marginal Distributions

From a joint distribution, we can recover the individual distributions called **marginals**.

### Marginal PMF (Discrete)

$$p_X(x) = \sum_y p_{X,Y}(x,y)$$

$$p_Y(y) = \sum_x p_{X,Y}(x,y)$$

We sum over all possible values of the other variable.

### Marginal PDF (Continuous)

$$f_X(x) = \int_{-\infty}^{\infty} f_{X,Y}(x,y) \, dy$$

$$f_Y(y) = \int_{-\infty}^{\infty} f_{X,Y}(x,y) \, dx$$

We integrate out the other variable.

### Example 5: Marginals from Example 4

From $f_{X,Y}(x,y) = 2$ on $0 \leq y \leq x \leq 1$:

**Marginal of $X$:**

For $0 \leq x \leq 1$:
$$f_X(x) = \int_0^x 2 \, dy = 2x$$

For $x < 0$ or $x > 1$: $f_X(x) = 0$

**Marginal of $Y$:**

For $0 \leq y \leq 1$:
$$f_Y(y) = \int_y^1 2 \, dx = 2(1-y)$$

For $y < 0$ or $y > 1$: $f_Y(y) = 0$

Notice that $X$ and $Y$ have different marginal distributions!

## Independence

Random variables $X$ and $Y$ are **independent** if:

$$p_{X,Y}(x,y) = p_X(x) \cdot p_Y(y) \quad \text{(discrete)}$$

$$f_{X,Y}(x,y) = f_X(x) \cdot f_Y(y) \quad \text{(continuous)}$$

for all $x, y$.

**Intuition:** Knowing the value of $X$ gives no information about $Y$ and vice versa.

### Equivalent Characterization

$X$ and $Y$ are independent if and only if the joint distribution factors:

$$f_{X,Y}(x,y) = g(x) \cdot h(y)$$

for some functions $g$ and $h$.

### Example 6: Testing Independence

**Case 1:** $f_{X,Y}(x,y) = 6xy$ on $0 \leq x \leq 1, 0 \leq y \leq 1$

This factors as $f_{X,Y}(x,y) = (6x) \cdot y$, suggesting independence might hold (after finding marginals).

Find marginals:
$$f_X(x) = \int_0^1 6xy \, dy = 6x \cdot \frac{1}{2} = 3x$$

$$f_Y(y) = \int_0^1 6xy \, dx = y \cdot 3 = 3y$$

Check: $f_X(x) \cdot f_Y(y) = 3x \cdot 3y = 9xy \neq 6xy$

So they are **not independent** (the factorization must match exactly).

**Case 2:** Uniform on square from Example 3

$$f_{X,Y}(x,y) = 1 = 1 \cdot 1 = f_X(x) \cdot f_Y(y)$$

where $f_X(x) = 1$ for $x \in [0,1]$ and $f_Y(y) = 1$ for $y \in [0,1]$.

They are **independent**.

**Case 3:** Example 4 with triangular support

The support region $\{(x,y): 0 \leq y \leq x \leq 1\}$ is not a rectangle.

If $X$ and $Y$ were independent, the support would be a product $A \times B$.

They are **not independent**.

**Rule of thumb:** If the support is not rectangular (with sides parallel to axes), the variables cannot be independent.

## Functions of Joint Random Variables

Given $X$ and $Y$, we might want to find the distribution of $Z = g(X,Y)$.

### Expected Value

$$E[g(X,Y)] = \sum_x \sum_y g(x,y) p_{X,Y}(x,y) \quad \text{(discrete)}$$

$$E[g(X,Y)] = \int_{-\infty}^{\infty} \int_{-\infty}^{\infty} g(x,y) f_{X,Y}(x,y) \, dx \, dy \quad \text{(continuous)}$$

### Example 7: Expected Product

For the uniform distribution on $[0,1] \times [0,1]$:

$$E[XY] = \int_0^1 \int_0^1 xy \cdot 1 \, dx \, dy = \int_0^1 x \, dx \int_0^1 y \, dy = \frac{1}{2} \cdot \frac{1}{2} = \frac{1}{4}$$

Note: $E[X] = E[Y] = \frac{1}{2}$, so $E[XY] = E[X] \cdot E[Y]$, consistent with independence.

### Convolution

For independent $X$ and $Y$, the distribution of $Z = X + Y$ is given by **convolution**:

**Discrete:**
$$p_Z(z) = \sum_x p_X(x) p_Y(z - x)$$

**Continuous:**
$$f_Z(z) = \int_{-\infty}^{\infty} f_X(x) f_Y(z - x) \, dx$$

### Example 8: Sum of Uniform Random Variables

Let $X, Y \sim \text{Uniform}[0,1]$ independent. Find the PDF of $Z = X + Y$.

$$f_Z(z) = \int_{-\infty}^{\infty} f_X(x) f_Y(z-x) \, dx$$

For this to be non-zero, we need:
- $0 \leq x \leq 1$
- $0 \leq z - x \leq 1 \implies z - 1 \leq x \leq z$

**Case 1:** $0 \leq z \leq 1$

Integration limits: $\max(0, z-1) = 0$ to $\min(1, z) = z$

$$f_Z(z) = \int_0^z 1 \cdot 1 \, dx = z$$

**Case 2:** $1 < z \leq 2$

Integration limits: $\max(0, z-1) = z-1$ to $\min(1, z) = 1$

$$f_Z(z) = \int_{z-1}^1 1 \cdot 1 \, dx = 1 - (z-1) = 2 - z$$

**Result:**
$$f_Z(z) = \begin{cases}
z & \text{if } 0 \leq z \leq 1 \\
2 - z & \text{if } 1 < z \leq 2 \\
0 & \text{otherwise}
\end{cases}$$

This is a triangular distribution!

## Conditional Distributions

The **conditional PMF** of $X$ given $Y = y$ is:

$$p_{X|Y}(x|y) = \frac{p_{X,Y}(x,y)}{p_Y(y)}$$

provided $p_Y(y) > 0$.

Similarly, the **conditional PDF** is:

$$f_{X|Y}(x|y) = \frac{f_{X,Y}(x,y)}{f_Y(y)}$$

provided $f_Y(y) > 0$.

**Interpretation:** This is the distribution of $X$ when we know $Y = y$.

### Example 9: Conditional Distribution

From Example 4, with $f_{X,Y}(x,y) = 2$ on $0 \leq y \leq x \leq 1$:

We found $f_Y(y) = 2(1-y)$ for $0 \leq y \leq 1$.

For fixed $y \in [0,1]$ and $y \leq x \leq 1$:

$$f_{X|Y}(x|y) = \frac{2}{2(1-y)} = \frac{1}{1-y}$$

This is $\text{Uniform}[y, 1]$—given $Y = y$, $X$ is uniform on the remaining interval.

## Summary

- **Joint PMF/PDF** $p_{X,Y}(x,y)$ or $f_{X,Y}(x,y)$ describes the distribution of multiple random variables
- **Marginal distributions** are obtained by summing/integrating over other variables
- **Independence:** $f_{X,Y}(x,y) = f_X(x) f_Y(y)$
- Non-rectangular support implies dependence
- **Expected values:** $E[g(X,Y)]$ computed using joint distribution
- **Convolution:** Distribution of sum of independent RVs
- **Conditional distributions:** $f_{X|Y}(x|y) = \frac{f_{X,Y}(x,y)}{f_Y(y)}$
