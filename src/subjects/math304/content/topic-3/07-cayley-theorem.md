---
title: "Cayley's Theorem"
description: "Every finite group is isomorphic to a subgroup of a symmetric group"
---

# Cayley's Theorem

## Statement

**Cayley's Theorem**: Every group $G$ is isomorphic to a subgroup of the symmetric group $\text{Sym}(G)$ of all permutations of $G$. If $|G| = n$, then $G$ is isomorphic to a subgroup of $S_n$.

This remarkable result shows symmetric groups are **universal** - they contain copies of all other groups.

## Left Regular Representation

**Definition**: For $g \in G$, define **left multiplication** by $g$ as the function $\lambda_g: G \to G$:
$$\lambda_g(h) = gh$$

**Lemma**: Each $\lambda_g$ is a permutation of $G$ (bijective function $G \to G$).

**Proof**:
- **Injective**: If $\lambda_g(h_1) = \lambda_g(h_2)$, then $gh_1 = gh_2$, so $h_1 = h_2$ (cancellation).
- **Surjective**: For any $h \in G$, we have $\lambda_g(g^{-1}h) = g(g^{-1}h) = h$.

Therefore $\lambda_g$ is bijective. $\square$

## The Homomorphism

Define $\phi: G \to \text{Sym}(G)$ by $\phi(g) = \lambda_g$.

**Theorem**: $\phi$ is an injective homomorphism.

**Proof**:

**Homomorphism**: For $g_1, g_2 \in G$ and any $h \in G$:
$$\phi(g_1 g_2)(h) = \lambda_{g_1 g_2}(h) = (g_1 g_2)h = g_1(g_2 h) = \lambda_{g_1}(\lambda_{g_2}(h)) = (\lambda_{g_1} \circ \lambda_{g_2})(h)$$

Therefore $\phi(g_1 g_2) = \phi(g_1) \circ \phi(g_2)$. ✓

**Injective**: If $\phi(g) = \phi(e)$, then $\lambda_g = \lambda_e$. Applying to $e \in G$:
$$\lambda_g(e) = ge = g = e = \lambda_e(e)$$

Therefore $g = e$, so $\text{ker}(\phi) = \{e\}$, making $\phi$ injective. $\square$

**Conclusion**: $G \cong \phi(G) \leq \text{Sym}(G)$.

If $|G| = n$, we can identify $G$ with $\{1, 2, \ldots, n\}$, giving $G \cong \phi(G) \leq S_n$. $\square$

## Examples

### Example 1: $\mathbb{Z}_3$

$G = \{0, 1, 2\}$ under addition mod 3.

Left multiplication permutations:
- $\lambda_0 = \text{id} = \begin{pmatrix} 0 & 1 & 2 \\ 0 & 1 & 2 \end{pmatrix}$
- $\lambda_1 = \begin{pmatrix} 0 & 1 & 2 \\ 1 & 2 & 0 \end{pmatrix} = (0\,1\,2)$ in cycle notation
- $\lambda_2 = \begin{pmatrix} 0 & 1 & 2 \\ 2 & 0 & 1 \end{pmatrix} = (0\,2\,1)$

Relabel $0 \to 1, 1 \to 2, 2 \to 3$:
$$\phi(\mathbb{Z}_3) = \{e, (1\,2\,3), (1\,3\,2)\} = A_3 \leq S_3$$

### Example 2: Klein Four-Group

$V_4 = \{e, a, b, ab\}$ with $a^2 = b^2 = (ab)^2 = e$.

Left multiplications:
- $\lambda_e = e$
- $\lambda_a = (e\,a)(b\,ab)$ (swaps $e \leftrightarrow a$ and $b \leftrightarrow ab$)
- $\lambda_b = (e\,b)(a\,ab)$
- $\lambda_{ab} = (e\,ab)(a\,b)$

After relabeling $e \to 1, a \to 2, b \to 3, ab \to 4$:
$$\phi(V_4) = \{e, (1\,2)(3\,4), (1\,3)(2\,4), (1\,4)(2\,3)\} \leq S_4$$

This is the double-transposition subgroup of $A_4$.

### Example 3: $D_3$

$D_3 = \{e, r, r^2, s, sr, sr^2\}$

Since $|D_3| = 6 = |S_3|$, we get $D_3 \cong S_3$.

The left regular representation gives $D_3 \cong S_6$, but a cleverer labeling of triangle vertices shows $D_3 \cong S_3$ directly.

## Significance

**Universal Property**: Symmetric groups "contain" all finite groups (up to isomorphism).

**Classification**: To understand all groups of order $n$, look for subgroups of $S_n$.

**Limitation**: Not all subgroups of $S_n$ arise as regular representations. Some groups embed more efficiently than Cayley's theorem suggests.

**Example**: $\mathbb{Z}_4$ embeds in $S_4$ via Cayley (order 4), but also embeds in $S_4$ as $\langle (1\,2\,3\,4) \rangle$.

## Refinement: Minimal Faithful Permutation Representation

**Question**: What is the smallest $n$ such that $G$ embeds in $S_n$?

**Example**: $D_n$ embeds in $S_n$ (permuting vertices), which is smaller than $S_{2n}$ (Cayley's bound).

**Theorem**: Every group of order $n$ embeds in $S_n$ (Cayley), but the minimal $m$ can be much smaller.

## Group Actions

Cayley's theorem is a special case of group actions. Any action of $G$ on set $X$ gives homomorphism $G \to \text{Sym}(X)$.

The left regular representation is the action of $G$ on itself by left multiplication.

## Infinite Groups

Cayley's theorem extends to infinite groups: every group $G$ embeds in $\text{Sym}(G)$.

**Example**: $\mathbb{Z}$ embeds in $\text{Sym}(\mathbb{Z})$ via $\lambda_n(m) = n + m$ (translation).

## Historical Note

Arthur Cayley (1821-1895) proved this theorem in 1854, establishing that abstract groups could all be realized concretely as permutation groups. This was before the modern axiomatic definition of groups!

## Applications

**Representation Theory**: Cayley's theorem is the starting point for studying how groups act on sets and vector spaces.

**Computational Group Theory**: Algorithms often represent groups as permutation groups (GAP, Magma software).

**Galois Theory**: Galois groups act as permutations of roots of polynomials.

## Proof Summary

1. Define $\lambda_g(h) = gh$ (left multiplication)
2. Show each $\lambda_g$ is a permutation
3. Show $g \mapsto \lambda_g$ is a homomorphism
4. Show it's injective
5. Conclude $G \cong \text{Image} \leq \text{Sym}(G)$

## Comparison: Right Multiplication

Can also use **right multiplication** $\rho_g(h) = hg^{-1}$ (note inverse!).

This gives **right regular representation**, also faithful.

Why $g^{-1}$? To make it a homomorphism: $\rho_{g_1 g_2}(h) = h(g_1 g_2)^{-1} = hg_2^{-1}g_1^{-1} = \rho_{g_1}(\rho_{g_2}(h))$.

## Summary

Cayley's Theorem:
- Every group embeds in a symmetric group
- Proof via left regular representation
- Shows symmetric groups are universal
- Fundamental bridge between abstract and concrete groups
- Basis for representation theory

This result demonstrates the central importance of symmetric groups in understanding all of group theory.
