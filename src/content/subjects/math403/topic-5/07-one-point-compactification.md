# One-Point Compactification

The one-point compactification, also called the Alexandroff compactification, provides a canonical way to compactify locally compact spaces by adding a single "point at infinity."

## Construction

**Definition:** Let X be a topological space. The **one-point compactification** of X is the space $X^* = X \cup \{\infty\}$ where $\infty$ is a point not in X, with topology:
- All open sets of X are open in $X^*$
- For each compact subset K of X, $(X \setminus K) \cup \{\infty\}$ is open in $X^*$

The neighborhoods of $\infty$ are exactly the sets whose complement in X is compact.

## Basic Properties

**Theorem:** $X^*$ is always compact.

*Proof:* Let $\mathcal{U}$ be an open cover of $X^*$. Some $U_0 \in \mathcal{U}$ contains $\infty$. Then $X \setminus U_0$ is compact in X. Cover it by finitely many sets from $\mathcal{U}$. Together with $U_0$, these form a finite subcover.

**Theorem:** X is dense in $X^*$ if and only if X is not compact.

**Theorem:** X is open in $X^*$.

**Theorem:** $X^*$ is Hausdorff if and only if X is locally compact and Hausdorff.

## Examples

### Example 1: One-Point Compactification of ℝ
$\mathbb{R}^* = \mathbb{R} \cup \{\infty\}$ is homeomorphic to the circle $S^1$.

The homeomorphism can be given by stereographic projection from the North pole.

### Example 2: One-Point Compactification of ℝⁿ
$(\mathbb{R}^n)^*$ is homeomorphic to the n-sphere $S^n$.

### Example 3: One-Point Compactification of ℤ
$\mathbb{Z}^* = \mathbb{Z} \cup \{\infty\}$ is homeomorphic to $\{0\} \cup \{1/n : n \in \mathbb{Z}, n \neq 0\}$.

### Example 4: One-Point Compactification of a Discrete Space
If X is an infinite discrete space, $X^*$ has the cofinite topology near $\infty$.

## When Does One-Point Compactification Fail?

**Theorem:** If X is not locally compact, then $X^*$ is not Hausdorff.

*Example:* $\mathbb{Q}^*$ is compact but not Hausdorff.

## Comparison with Other Compactifications

### Stone-Čech Compactification
For a completely regular space X, the Stone-Čech compactification $\beta X$ is the "largest" compactification. It adds many points and has universal properties.

### One-Point Compactification
The one-point compactification is the "smallest" compactification that adds only one point. It exists for any space but is only Hausdorff when X is locally compact.

**Relationship:** For locally compact Hausdorff spaces, there is a continuous surjection $\beta X \to X^*$.

## Applications

### Extended Real Line
The extended real line $[-\infty, +\infty]$ is a two-point compactification of $\mathbb{R}$. The one-point compactification identifies $+\infty$ and $-\infty$.

### Riemann Sphere
The Riemann sphere $\hat{\mathbb{C}} = \mathbb{C} \cup \{\infty\}$ is the one-point compactification of $\mathbb{C}$. It's the natural domain for Möbius transformations.

### Projective Space
Real projective space $\mathbb{RP}^n$ can be viewed as $\mathbb{R}^n$ compactified by adding a "hyperplane at infinity."

## Functorial Properties

**Theorem:** If $f: X \to Y$ is a proper map between locally compact Hausdorff spaces, then f extends uniquely to a continuous map $f^*: X^* \to Y^*$.
