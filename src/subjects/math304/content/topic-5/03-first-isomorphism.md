---
title: "First Isomorphism Theorem"
description: "The fundamental theorem connecting homomorphisms, kernels, and quotients"
---

# First Isomorphism Theorem

## Introduction

The First Isomorphism Theorem is one of the most important results in abstract algebra. It establishes a fundamental relationship between homomorphisms, kernels, and quotient groups, showing that every homomorphism can be factored through a quotient by its kernel. This theorem appears in various forms throughout mathematics and provides a powerful tool for constructing and understanding isomorphisms.

## Statement of the Theorem

**First Isomorphism Theorem**: Let $\phi: G \to H$ be a group homomorphism. Then:

$$G/\ker(\phi) \cong \text{Im}(\phi)$$

Moreover, the isomorphism is explicitly given by the map $\overline{\phi}: G/\ker(\phi) \to \text{Im}(\phi)$ defined by:

$$\overline{\phi}(g\ker(\phi)) = \phi(g)$$

This map is well-defined, and it is a bijective homomorphism (an isomorphism).

## Proof

Let $N = \ker(\phi)$ to simplify notation. We must prove that $\overline{\phi}: G/N \to \text{Im}(\phi)$ is an isomorphism.

### Step 1: Well-Definedness

We first verify that $\overline{\phi}$ is well-defined. Since cosets can have multiple representatives, we must show that if $g_1 N = g_2 N$, then $\phi(g_1) = \phi(g_2)$.

Suppose $g_1 N = g_2 N$. Then $g_1 g_2^{-1} \in N = \ker(\phi)$, so:
$$\phi(g_1 g_2^{-1}) = e_H$$

Therefore:
$$\phi(g_1) = \phi(g_1) \cdot e_H = \phi(g_1) \cdot \phi(g_2^{-1})^{-1} = \phi(g_1) \cdot (\phi(g_2)^{-1})^{-1} = \phi(g_1) \cdot \phi(g_2)^{-1} \cdot \phi(g_2) = e_H \cdot \phi(g_2) = \phi(g_2)$$

Wait, let me recalculate more carefully:
$$e_H = \phi(g_1 g_2^{-1}) = \phi(g_1)\phi(g_2^{-1}) = \phi(g_1)\phi(g_2)^{-1}$$

Multiplying both sides by $\phi(g_2)$ on the right:
$$\phi(g_2) = \phi(g_1)$$

Thus $\overline{\phi}$ is well-defined. ✓

### Step 2: Homomorphism

We verify that $\overline{\phi}$ preserves the group operation. Let $g_1N, g_2N \in G/N$:

$$\begin{align}
\overline{\phi}(g_1 N \cdot g_2 N) &= \overline{\phi}((g_1 g_2)N) \\
&= \phi(g_1 g_2) \\
&= \phi(g_1) \phi(g_2) \\
&= \overline{\phi}(g_1 N) \cdot \overline{\phi}(g_2 N)
\end{align}$$

Therefore $\overline{\phi}$ is a homomorphism. ✓

### Step 3: Injectivity

We show $\ker(\overline{\phi}) = \{N\}$ (the identity of $G/N$).

Suppose $\overline{\phi}(gN) = e_H$. Then $\phi(g) = e_H$, so $g \in \ker(\phi) = N$. Therefore $gN = N$, the identity coset.

Conversely, $\overline{\phi}(N) = \phi(e_G) = e_H$.

Thus $\ker(\overline{\phi}) = \{N\}$, so $\overline{\phi}$ is injective. ✓

### Step 4: Surjectivity

We show that every element of $\text{Im}(\phi)$ is in the image of $\overline{\phi}$.

Let $h \in \text{Im}(\phi)$. By definition, there exists $g \in G$ such that $\phi(g) = h$. Then:
$$\overline{\phi}(gN) = \phi(g) = h$$

Therefore $h \in \text{Im}(\overline{\phi})$, proving surjectivity. ✓

### Conclusion

Since $\overline{\phi}: G/\ker(\phi) \to \text{Im}(\phi)$ is a bijective homomorphism, it is an isomorphism. $\square$

## Intuitive Meaning

The First Isomorphism Theorem says:

**"If you quotient out the kernel, you eliminate exactly the redundancy in the homomorphism, leaving a bijection."**

More precisely:
- The kernel measures how much the homomorphism "collapses" elements together
- The quotient $G/\ker(\phi)$ identifies all elements that map to the same place
- After this identification, the natural map becomes an isomorphism onto the image

## Fundamental Examples

### Example 1: Sign Homomorphism

Consider $\text{sgn}: S_n \to \{-1, +1\}$ with:
- $\ker(\text{sgn}) = A_n$ (alternating group)
- $\text{Im}(\text{sgn}) = \{-1, +1\} \cong \mathbb{Z}_2$

**First Isomorphism Theorem**:
$$S_n/A_n \cong \mathbb{Z}_2$$

This tells us that the quotient of the symmetric group by the alternating group is a cyclic group of order 2. The two cosets are:
- $A_n$ (even permutations)
- $(1\,2)A_n$ (odd permutations)

For $S_3$: The cosets are $\{e, (1\,2\,3), (1\,3\,2)\}$ and $\{(1\,2), (1\,3), (2\,3)\}$.

### Example 2: Determinant

Consider $\det: GL_n(\mathbb{R}) \to \mathbb{R}^*$ with:
- $\ker(\det) = SL_n(\mathbb{R})$ (matrices with determinant 1)
- $\text{Im}(\det) = \mathbb{R}^*$ (all nonzero reals, since det is surjective)

**First Isomorphism Theorem**:
$$GL_n(\mathbb{R})/SL_n(\mathbb{R}) \cong \mathbb{R}^*$$

This isomorphism is given by $A \cdot SL_n(\mathbb{R}) \mapsto \det(A)$.

### Example 3: Modular Arithmetic

Consider $\phi: \mathbb{Z} \to \mathbb{Z}_n$ defined by $\phi(k) = k \bmod n$ with:
- $\ker(\phi) = n\mathbb{Z}$ (multiples of $n$)
- $\text{Im}(\phi) = \mathbb{Z}_n$

**First Isomorphism Theorem**:
$$\mathbb{Z}/n\mathbb{Z} \cong \mathbb{Z}_n$$

This is the fundamental result that justifies writing $\mathbb{Z}_n$ for the integers modulo $n$. The quotient group $\mathbb{Z}/n\mathbb{Z}$ and the cyclic group $\mathbb{Z}_n$ are "the same thing" (isomorphic).

For $n = 3$, the cosets are:
- $3\mathbb{Z} = \{\ldots, -3, 0, 3, \ldots\} \leftrightarrow 0$
- $1 + 3\mathbb{Z} = \{\ldots, -2, 1, 4, \ldots\} \leftrightarrow 1$
- $2 + 3\mathbb{Z} = \{\ldots, -1, 2, 5, \ldots\} \leftrightarrow 2$

### Example 4: Exponential Map

Consider $\exp: \mathbb{R} \to \mathbb{R}^+$ defined by $\exp(x) = e^x$ with:
- $\ker(\exp) = \{0\}$ (only 0 maps to 1)
- $\text{Im}(\exp) = \mathbb{R}^+$ (all positive reals)

**First Isomorphism Theorem**:
$$\mathbb{R}/\{0\} \cong \mathbb{R} \cong \mathbb{R}^+$$

Since the kernel is trivial, the quotient is isomorphic to the original group, confirming that $\exp$ is an isomorphism.

### Example 5: Complex Exponential

Consider $\exp: \mathbb{R} \to S^1$ defined by $\exp(\theta) = e^{i\theta}$ (unit circle in $\mathbb{C}$) with:
- $\ker(\exp) = 2\pi\mathbb{Z}$ (multiples of $2\pi$)
- $\text{Im}(\exp) = S^1$

**First Isomorphism Theorem**:
$$\mathbb{R}/2\pi\mathbb{Z} \cong S^1$$

This shows that the unit circle is isomorphic to the real line "wrapped around" with period $2\pi$.

### Example 6: Projection onto Product Component

Consider $\pi_1: \mathbb{Z}_6 \to \mathbb{Z}_2$ defined by $\pi_1(x) = x \bmod 2$ with:
- $\ker(\pi_1) = \{0, 2, 4\} \cong \mathbb{Z}_3$
- $\text{Im}(\pi_1) = \mathbb{Z}_2$

**First Isomorphism Theorem**:
$$\mathbb{Z}_6/\{0, 2, 4\} \cong \mathbb{Z}_2$$

The quotient has 2 cosets:
- $\{0, 2, 4\} \leftrightarrow 0$
- $\{1, 3, 5\} \leftrightarrow 1$

## Applications

### Application 1: Constructing Quotient Groups

To understand the structure of $G/N$ for normal $N \triangleleft G$, find a homomorphism $\phi: G \to H$ with $\ker(\phi) = N$. Then $G/N \cong \text{Im}(\phi)$.

**Example**: To understand $\mathbb{Z}/6\mathbb{Z}$, use $\phi: \mathbb{Z} \to \mathbb{Z}_6$ with $\ker(\phi) = 6\mathbb{Z}$. Then $\mathbb{Z}/6\mathbb{Z} \cong \mathbb{Z}_6$.

### Application 2: Proving Isomorphisms

Often it's easier to construct a homomorphism and apply the FIT than to directly construct an isomorphism.

**Example**: To prove $\mathbb{Z}_{12}/\langle 4 \rangle \cong \mathbb{Z}_4$, define $\phi: \mathbb{Z}_{12} \to \mathbb{Z}_4$ by $\phi(x) = x \bmod 4$. Then:
- $\ker(\phi) = \{0, 4, 8\} = \langle 4 \rangle$
- $\text{Im}(\phi) = \mathbb{Z}_4$

By FIT: $\mathbb{Z}_{12}/\langle 4 \rangle \cong \mathbb{Z}_4$.

### Application 3: Counting Elements

For finite groups, the FIT gives:
$$|G/\ker(\phi)| = |\text{Im}(\phi)|$$

Combined with Lagrange's Theorem: $|G| = |\ker(\phi)| \cdot |\text{Im}(\phi)|$.

**Example**: For $\text{sgn}: S_4 \to \mathbb{Z}_2$:
- $|S_4| = 24$
- $|\text{Im}(\text{sgn})| = 2$
- Therefore $|\ker(\text{sgn})| = |A_4| = 12$
- Confirming: $|S_4/A_4| = 2 = |\mathbb{Z}_2|$

### Application 4: Simplifying Proofs

Many properties of quotient groups become obvious via the FIT.

**Example**: Is $\mathbb{Z}/n\mathbb{Z}$ cyclic? Yes, because $\mathbb{Z}_n$ is cyclic, and $\mathbb{Z}/n\mathbb{Z} \cong \mathbb{Z}_n$ by FIT.

## Commutative Diagram

The First Isomorphism Theorem can be visualized as a commutative diagram:

```
        φ
    G -----> Im(φ)
    |         ≈
  π |         | φ̄
    |         |
    v         v
  G/ker(φ) -> Im(φ)
        φ̄
```

Where:
- $\pi: G \to G/\ker(\phi)$ is the natural projection $\pi(g) = g\ker(\phi)$
- $\overline{\phi}: G/\ker(\phi) \to \text{Im}(\phi)$ is the induced isomorphism
- The diagram commutes: $\phi = \overline{\phi} \circ \pi$

This says every homomorphism factors uniquely through the quotient by its kernel.

## Canonical Decomposition

**Corollary (Canonical Decomposition)**: Every homomorphism $\phi: G \to H$ can be factored as:

$$G \xrightarrow{\text{surjection}} G/\ker(\phi) \xrightarrow{\text{isomorphism}} \text{Im}(\phi) \xrightarrow{\text{injection}} H$$

Where:
1. $G \to G/\ker(\phi)$ is the natural projection (surjective)
2. $G/\ker(\phi) \to \text{Im}(\phi)$ is the isomorphism from FIT
3. $\text{Im}(\phi) \to H$ is inclusion (injective)

This decomposition separates the "collapsing" (projection), "restructuring" (isomorphism), and "embedding" (inclusion) aspects of any homomorphism.

## Connection to Normal Subgroups

**Theorem**: Every normal subgroup arises as the kernel of some homomorphism.

**Proof**: Let $N \triangleleft G$. Define the natural projection $\pi: G \to G/N$ by $\pi(g) = gN$. This is a surjective homomorphism with $\ker(\pi) = N$. $\square$

**Converse**: Every kernel is a normal subgroup (proven earlier).

**Conclusion**: The concepts "normal subgroup" and "kernel of homomorphism" are equivalent:
$$\{N : N \triangleleft G\} \leftrightarrow \{\ker(\phi) : \phi \text{ is a homomorphism from } G\}$$

## Advanced Example

**Example 7**: Consider the homomorphism $\phi: \mathbb{Z} \times \mathbb{Z} \to \mathbb{Z}$ defined by $\phi((a, b)) = a + b$.

**Kernel**: $\ker(\phi) = \{(a, b) : a + b = 0\} = \{(a, -a) : a \in \mathbb{Z}\}$

This is the "anti-diagonal" subgroup isomorphic to $\mathbb{Z}$.

**Image**: $\text{Im}(\phi) = \mathbb{Z}$ (surjective since $\phi((n, 0)) = n$)

**First Isomorphism Theorem**:
$$(\mathbb{Z} \times \mathbb{Z})/\{(a, -a) : a \in \mathbb{Z}\} \cong \mathbb{Z}$$

The quotient collapses all pairs $(a, b)$ with the same sum to a single equivalence class.

## Summary

The **First Isomorphism Theorem** establishes:

$$G/\ker(\phi) \cong \text{Im}(\phi)$$

**Key Insights**:
- The kernel measures redundancy in a homomorphism
- Quotienting by the kernel eliminates this redundancy
- The resulting map is an isomorphism onto the image
- Every homomorphism factors: projection → isomorphism → inclusion

**Applications**:
- Constructing and understanding quotient groups
- Proving isomorphisms between groups
- Relating group-theoretic properties across homomorphisms
- Providing canonical decomposition of any homomorphism

**Fundamental Connection**:
- Normal subgroups $\leftrightarrow$ Kernels of homomorphisms
- Quotient groups $\leftrightarrow$ Images of homomorphisms

The First Isomorphism Theorem is the cornerstone of group theory, connecting the concepts of homomorphisms, kernels, normal subgroups, and quotients into a unified framework. It demonstrates that "modding out" by the kernel is precisely what's needed to convert any homomorphism into an isomorphism.
