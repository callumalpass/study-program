---
id: math403-topic-5-7
title: "One-Point Compactification"
order: 7
---

# One-Point Compactification

The one-point compactification, also called the Alexandroff compactification, provides a canonical way to compactify locally compact spaces by adding a single "point at infinity." This elegant construction creates the smallest possible compactification and has beautiful geometric interpretations.

## Construction

**Definition:** Let X be a topological space. The **one-point compactification** of X is the space $X^* = X \cup \{\infty\}$ where $\infty$ is a point not in X (called the "point at infinity"), equipped with the following topology:

1. All open sets of X are open in $X^*$
2. A set $U \subseteq X^*$ containing $\infty$ is open if and only if $X^* \setminus U$ is a compact subset of X

Equivalently, the neighborhoods of $\infty$ are precisely the sets of the form $(X \setminus K) \cup \{\infty\}$ where K is a compact subset of X.

**Intuition:** The point $\infty$ is "far away" from every compact set in X. Any neighborhood of $\infty$ must contain everything outside some compact set—capturing the idea that $\infty$ is "at the end" of the space.

## Verification of the Topology

We verify that this defines a valid topology on $X^*$.

**Empty set and whole space:** The empty set is open (as in X). The whole space $X^*$ is open because $X^* \setminus X^* = \emptyset$ is compact.

**Unions:** If $\{U_\alpha\}$ are open in $X^*$:
- If none contain $\infty$, their union is open in X, hence open in $X^*$
- If some $U_\alpha$ contains $\infty$, then $X^* \setminus \bigcup U_\alpha \subseteq X^* \setminus U_\alpha$ is a closed subset of a compact set, hence compact

**Finite intersections:** If $U_1, \ldots, U_n$ are open in $X^*$:
- If none contain $\infty$, their intersection is open in X
- If all contain $\infty$, then $X^* \setminus (U_1 \cap \cdots \cap U_n) = (X^* \setminus U_1) \cup \cdots \cup (X^* \setminus U_n)$ is a finite union of compact sets, hence compact

## Basic Properties

**Theorem:** The one-point compactification $X^*$ is always compact.

*Proof:* Let $\mathcal{U}$ be an open cover of $X^*$. Some $U_0 \in \mathcal{U}$ contains $\infty$. By definition of the topology, $K = X^* \setminus U_0 = X \setminus U_0$ is a compact subset of X.

The sets $\{U \cap X : U \in \mathcal{U}\}$ form an open cover of K in X. By compactness of K, finitely many cover K: $K \subseteq U_1 \cup \cdots \cup U_n$.

Then $\{U_0, U_1, \ldots, U_n\}$ is a finite subcover of $\mathcal{U}$: we have $X^* = U_0 \cup K \subseteq U_0 \cup U_1 \cup \cdots \cup U_n$.

**Theorem:** X is open and dense in $X^*$ if and only if X is not compact.

*Proof:* X is always open in $X^*$ (by definition of the topology). X is dense iff $\overline{X} = X^*$ iff $\infty \in \overline{X}$ iff every neighborhood of $\infty$ meets X iff every set of the form $(X \setminus K) \cup \{\infty\}$ meets X iff X is not contained in any compact set K iff X is not compact.

**Theorem:** X is an open subspace of $X^*$ (the subspace topology on X from $X^*$ equals the original topology on X).

**Theorem:** $X^*$ is Hausdorff if and only if X is locally compact and Hausdorff.

*Proof sketch:*
- (⇒) If $X^*$ is Hausdorff, then X as a subspace is Hausdorff. For local compactness: separate $x \in X$ from $\infty$ by disjoint open sets U and V with $\infty \in V$. Then $X \setminus V$ is compact and is a compact neighborhood of x.
- (⇐) If X is locally compact Hausdorff, we can separate any two points. The key is separating $x \in X$ from $\infty$: take a compact neighborhood K of x, then X \setminus K separates them.

## Geometric Examples

### Example 1: One-Point Compactification of ℝ
$\mathbb{R}^* = \mathbb{R} \cup \{\infty\}$ is homeomorphic to the circle $S^1$.

The homeomorphism is given by **stereographic projection**. Place the circle in the plane with center at origin. Project from the north pole N = (0, 1) through a point on the circle to the x-axis. This gives a bijection between $S^1 \setminus \{N\}$ and $\mathbb{R}$. Identifying N with $\infty$ gives the homeomorphism.

**Geometric intuition:** As we travel along the real line toward $+\infty$ or $-\infty$, we approach the same point (the north pole). The real line "wraps around" to form a circle.

### Example 2: One-Point Compactification of ℝⁿ
$(\mathbb{R}^n)^*$ is homeomorphic to the n-sphere $S^n$.

Again, stereographic projection from the north pole of $S^n$ gives a homeomorphism $S^n \setminus \{N\} \to \mathbb{R}^n$. Adding the point at infinity corresponds to adding back the north pole.

### Example 3: One-Point Compactification of ℤ
The one-point compactification $\mathbb{Z}^*$ is homeomorphic to the space $\{0\} \cup \{1/n : n \in \mathbb{Z} \setminus \{0\}\}$ with the subspace topology from $\mathbb{R}$.

The integers correspond to $\{1/n\}$, and $\infty$ corresponds to 0 (the limit point that is approached by $1/n$ as $|n| \to \infty$).

### Example 4: One-Point Compactification of a Discrete Space
If X is an infinite discrete space, then $X^*$ has a peculiar topology: points of X are isolated, and neighborhoods of $\infty$ are cofinite subsets of $X^*$ containing $\infty$.

### Example 5: The Riemann Sphere
The **Riemann sphere** $\hat{\mathbb{C}} = \mathbb{C} \cup \{\infty\}$ is the one-point compactification of the complex plane. It is homeomorphic to $S^2$ and is the natural domain for:
- Möbius transformations $z \mapsto \frac{az + b}{cz + d}$
- Meromorphic functions (holomorphic functions that may have poles)
- Complex projective geometry ($\hat{\mathbb{C}} \cong \mathbb{CP}^1$)

## When One-Point Compactification Fails

**Theorem:** If X is not locally compact, then $X^*$ is not Hausdorff.

*Proof:* Suppose X is not locally compact at some point x. Every neighborhood of x meets $X \setminus K$ for every compact K. But neighborhoods of $\infty$ are of the form $(X \setminus K) \cup \{\infty\}$. So every neighborhood of x meets every neighborhood of $\infty$, and x and $\infty$ cannot be separated.

**Example:** $\mathbb{Q}^*$ is compact but not Hausdorff. No two distinct points (one rational, one $\infty$) can be separated by disjoint open sets.

## Comparison with Other Compactifications

### Stone-Čech Compactification
For a completely regular (Tychonoff) space X, the **Stone-Čech compactification** $\beta X$ is the "largest" compactification. It adds many points and has a universal property: every bounded continuous function $f: X \to \mathbb{R}$ extends uniquely to $\beta X$.

### One-Point Compactification
The one-point compactification is the "smallest" compactification that adds only a single point. It exists for any space but is only Hausdorff when X is locally compact.

**Relationship:** For locally compact Hausdorff spaces X, there is a canonical continuous surjection $\beta X \to X^*$ that collapses "everything at infinity" to a single point.

## Applications

### Extended Real Line
The **extended real line** $[-\infty, +\infty]$ is a two-point compactification of $\mathbb{R}$, adding separate points at $+\infty$ and $-\infty$. This is different from the one-point compactification, which identifies $+\infty$ and $-\infty$.

The extended real line is used extensively in measure theory and real analysis for handling limits that tend to infinity.

### Projective Spaces
Real projective space $\mathbb{RP}^n$ can be viewed as $\mathbb{R}^n$ compactified by adding a "hyperplane at infinity" $\mathbb{RP}^{n-1}$. This is a different compactification from the one-point compactification (which gives $S^n$).

### Complex Analysis
The Riemann sphere $\hat{\mathbb{C}}$ is essential in complex analysis. Möbius transformations act on $\hat{\mathbb{C}}$, mapping circles to circles (where "circles" include lines, which are circles through $\infty$).

## Functorial Properties

**Theorem:** If $f: X \to Y$ is a proper map between locally compact Hausdorff spaces (preimages of compact sets are compact), then f extends uniquely to a continuous map $f^*: X^* \to Y^*$ with $f^*(\infty_X) = \infty_Y$.

*Proof sketch:* Define $f^*(x) = f(x)$ for $x \in X$ and $f^*(\infty_X) = \infty_Y$. To check continuity at $\infty_X$: if V is a neighborhood of $\infty_Y$, then $Y \setminus V$ is compact, so $f^{-1}(Y \setminus V)$ is compact (f is proper), and $(X \setminus f^{-1}(Y \setminus V)) \cup \{\infty_X\}$ is a neighborhood of $\infty_X$ mapping into V.

This shows that one-point compactification is functorial with respect to proper maps.

## Key Takeaways

- The one-point compactification adds a single point $\infty$ with neighborhoods being complements of compact sets
- $X^*$ is always compact; it is Hausdorff iff X is locally compact Hausdorff
- Geometric examples: $\mathbb{R}^* \cong S^1$, $\mathbb{R}^n{}^* \cong S^n$, $\mathbb{C}^* = \hat{\mathbb{C}}$ (Riemann sphere)
- If X is not locally compact, $X^*$ is compact but not Hausdorff
- The one-point compactification is the "smallest" compactification
- Proper maps extend to one-point compactifications
