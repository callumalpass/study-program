# Covering Spaces

Covering spaces provide a powerful tool for studying the fundamental group and classifying spaces with the same local structure but different global topology.

## Definition

**Definition:** A **covering map** is a continuous surjection $p: \tilde{X} \to X$ such that every point $x \in X$ has an open neighborhood U where $p^{-1}(U)$ is a disjoint union of open sets, each mapped homeomorphically onto U by p.

The sets in $p^{-1}(U)$ are called **sheets** over U.

**Definition:** $\tilde{X}$ is called a **covering space** of X.

## Examples

### Example 1: The Circle
$p: \mathbb{R} \to S^1$ given by $p(t) = e^{2\pi i t}$ is a covering map.
- Each point has infinitely many preimages
- This is the **universal cover** of $S^1$

### Example 2: n-fold Cover of Circle
$p_n: S^1 \to S^1$ given by $p_n(z) = z^n$ is an n-fold covering.

### Example 3: Real Projective Space
$p: S^n \to \mathbb{RP}^n$ given by $p(x) = [x]$ is a 2-fold covering.

### Example 4: Torus
$p: \mathbb{R}^2 \to T^2$ given by $p(x,y) = (e^{2\pi ix}, e^{2\pi iy})$ is a covering map.

## Lifting Properties

**Theorem (Path Lifting):** Given a covering $p: \tilde{X} \to X$, a path $\gamma$ in X, and a point $\tilde{x}_0 \in p^{-1}(\gamma(0))$, there exists a unique lift $\tilde{\gamma}$ in $\tilde{X}$ with $\tilde{\gamma}(0) = \tilde{x}_0$.

**Theorem (Homotopy Lifting):** A homotopy of paths lifts uniquely given an initial lift.

**Theorem (General Lifting):** A map $f: Y \to X$ lifts to $\tilde{f}: Y \to \tilde{X}$ if and only if $f_*(\pi_1(Y)) \subseteq p_*(\pi_1(\tilde{X}))$.

## The Monodromy Action

**Definition:** For a covering $p: \tilde{X} \to X$ and basepoint $x_0$, the **monodromy action** of $\pi_1(X, x_0)$ on the fiber $p^{-1}(x_0)$ is:
$$[\gamma] \cdot \tilde{x} = \tilde{\gamma}(1)$$
where $\tilde{\gamma}$ is the lift of $\gamma$ starting at $\tilde{x}$.

## Classification of Covering Spaces

**Theorem:** For a "nice" space X (connected, locally path-connected, semi-locally simply connected):

1. Covering spaces of X correspond to subgroups of $\pi_1(X)$
2. The covering corresponding to subgroup H has:
   $$\pi_1(\tilde{X}) \cong H$$
3. The number of sheets equals $[\pi_1(X) : H]$

## The Universal Cover

**Definition:** The **universal cover** is the simply connected covering space.

**Properties:**
- Corresponds to the trivial subgroup
- Covers all other covering spaces
- Unique up to isomorphism

**Examples:**
- Universal cover of $S^1$ is $\mathbb{R}$
- Universal cover of $T^2$ is $\mathbb{R}^2$
- Universal cover of $\mathbb{RP}^n$ is $S^n$

## Deck Transformations

**Definition:** A **deck transformation** (covering transformation) is a homeomorphism $\phi: \tilde{X} \to \tilde{X}$ with $p \circ \phi = p$.

**Theorem:** Deck transformations form a group $\text{Deck}(\tilde{X}/X)$.

**Theorem (Normal Coverings):** If $p_*(\pi_1(\tilde{X}))$ is normal in $\pi_1(X)$, then:
$$\text{Deck}(\tilde{X}/X) \cong \pi_1(X) / p_*(\pi_1(\tilde{X}))$$

**Corollary:** For the universal cover:
$$\text{Deck}(\tilde{X}/X) \cong \pi_1(X)$$

## Applications

### Galois Theory Analogy
The theory of covering spaces parallels Galois theory:
- Covers ↔ Field extensions
- $\pi_1$ ↔ Galois group
- Universal cover ↔ Algebraic closure

### Computing Fundamental Groups
Covering spaces help compute $\pi_1$: if we know the universal cover and its deck transformations, we know $\pi_1$.

### Existence of Maps
Covering space theory determines when maps between spaces can be lifted or extended.
