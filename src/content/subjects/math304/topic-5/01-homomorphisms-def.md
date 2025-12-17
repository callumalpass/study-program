---
title: "Homomorphism Definition"
description: "Introduction to group homomorphisms and their basic properties"
---

# Homomorphism Definition

## Introduction

Group homomorphisms are the structure-preserving maps between groups, playing the same fundamental role in group theory that continuous functions play in topology or linear transformations play in linear algebra. They allow us to compare groups, understand their relationships, and transfer properties from one group to another.

## Formal Definition

**Definition (Group Homomorphism)**: Let $(G, \ast)$ and $(H, \cdot)$ be groups. A function $\phi: G \to H$ is a **group homomorphism** if for all $a, b \in G$:

$$\phi(a \ast b) = \phi(a) \cdot \phi(b)$$

This single condition encapsulates the entire notion of "structure-preservation": the image of a product equals the product of images.

**Notation**: When the operations are clear from context, we write simply $\phi(ab) = \phi(a)\phi(b)$.

## Fundamental Examples

### Example 1: The Determinant Map

The determinant function $\det: GL_n(\mathbb{R}) \to \mathbb{R}^*$ is one of the most important homomorphisms in mathematics:

$$\det(AB) = \det(A) \cdot \det(B)$$

This maps the general linear group (invertible $n \times n$ matrices under multiplication) to the multiplicative group of nonzero real numbers. The kernel of this homomorphism is the special linear group $SL_n(\mathbb{R})$, consisting of matrices with determinant 1.

### Example 2: Sign Homomorphism

The sign function $\text{sgn}: S_n \to \{-1, +1\}$ assigns to each permutation its sign (parity):

$$\text{sgn}(\sigma \tau) = \text{sgn}(\sigma) \cdot \text{sgn}(\tau)$$

For instance, $\text{sgn}((1\,2)) = -1$ and $\text{sgn}((1\,2)(3\,4)) = (-1)(-1) = +1$. The kernel is $A_n$, the alternating group of even permutations.

### Example 3: Modular Reduction

Define $\phi: \mathbb{Z} \to \mathbb{Z}_n$ by $\phi(k) = k \bmod n$. This is a homomorphism because:

$$\phi(a + b) = (a + b) \bmod n = (a \bmod n) + (b \bmod n) = \phi(a) + \phi(b)$$

This formalizes the familiar process of "reducing modulo $n$."

### Example 4: Exponential Map

The exponential function $\exp: (\mathbb{R}, +) \to (\mathbb{R}^+, \cdot)$ defined by $\exp(x) = e^x$ is a homomorphism:

$$\exp(x + y) = e^{x+y} = e^x \cdot e^y = \exp(x) \cdot \exp(y)$$

This shows that the additive structure of $\mathbb{R}$ corresponds to the multiplicative structure of positive reals.

### Example 5: Inclusion Map

For any subgroup $H \leq G$, the inclusion map $\iota: H \to G$ defined by $\iota(h) = h$ is a homomorphism. This is trivially true since the group operation is the same in both groups.

### Example 6: Power Maps

For any group $G$ and fixed integer $n$, the map $\phi: G \to G$ defined by $\phi(g) = g^n$ is a homomorphism if and only if $G$ is abelian.

**Proof**: We need $\phi(ab) = \phi(a)\phi(b)$, i.e., $(ab)^n = a^n b^n$. For $n = 2$: $(ab)^2 = abab$ and $a^2b^2 = aabb$. These are equal if and only if $ab = ba$. $\square$

## Fundamental Properties of Homomorphisms

The following theorem establishes that homomorphisms preserve all the essential group structure.

**Theorem 1 (Basic Properties)**: Let $\phi: G \to H$ be a group homomorphism. Then:

1. $\phi(e_G) = e_H$ (identity maps to identity)
2. $\phi(a^{-1}) = \phi(a)^{-1}$ (inverses map to inverses)
3. $\phi(a^n) = \phi(a)^n$ for all $n \in \mathbb{Z}$
4. If $K \leq G$, then $\phi(K) \leq H$ (images of subgroups are subgroups)
5. If $N \triangleleft G$, then $\phi(N) \triangleleft \phi(G)$ (images of normal subgroups are normal in the image)

**Proof**:

(1) We have $\phi(e_G) = \phi(e_G \ast e_G) = \phi(e_G) \cdot \phi(e_G)$. Multiplying both sides by $\phi(e_G)^{-1}$ on the right:
$$e_H = \phi(e_G)$$

(2) We have:
$$e_H = \phi(e_G) = \phi(a \ast a^{-1}) = \phi(a) \cdot \phi(a^{-1})$$
Similarly, $e_H = \phi(a^{-1}) \cdot \phi(a)$. By uniqueness of inverses, $\phi(a^{-1}) = \phi(a)^{-1}$.

(3) For $n > 0$, use induction. Base case $n = 1$ is trivial. If $\phi(a^n) = \phi(a)^n$, then:
$$\phi(a^{n+1}) = \phi(a^n \cdot a) = \phi(a^n) \cdot \phi(a) = \phi(a)^n \cdot \phi(a) = \phi(a)^{n+1}$$

For $n = 0$: $\phi(a^0) = \phi(e_G) = e_H = \phi(a)^0$. For $n < 0$: $\phi(a^n) = \phi((a^{-n})^{-1}) = \phi(a^{-n})^{-1} = (\phi(a)^{-n})^{-1} = \phi(a)^n$.

(4) Let $K \leq G$. Then $\phi(K) = \{\phi(k) : k \in K\} \subseteq H$. Check:
- Non-empty: $e_H = \phi(e_G) \in \phi(K)$ since $e_G \in K$
- Closure: If $\phi(k_1), \phi(k_2) \in \phi(K)$, then $\phi(k_1)\phi(k_2) = \phi(k_1 k_2) \in \phi(K)$
- Inverses: If $\phi(k) \in \phi(K)$, then $\phi(k)^{-1} = \phi(k^{-1}) \in \phi(K)$ since $k^{-1} \in K$

(5) Exercise (follows from normality condition). $\square$

## Types of Homomorphisms

We distinguish homomorphisms by their injectivity and surjectivity properties:

**Definition**: Let $\phi: G \to H$ be a homomorphism.
- $\phi$ is a **monomorphism** if it is injective (one-to-one)
- $\phi$ is an **epimorphism** if it is surjective (onto)
- $\phi$ is an **isomorphism** if it is bijective (both injective and surjective)
- $\phi$ is an **endomorphism** if $G = H$ (a homomorphism from a group to itself)
- $\phi$ is an **automorphism** if it is an isomorphism from $G$ to $G$

## Isomorphisms

**Definition (Group Isomorphism)**: A homomorphism $\phi: G \to H$ is an **isomorphism** if there exists a homomorphism $\psi: H \to G$ such that:
- $\psi \circ \phi = \text{id}_G$ (identity on $G$)
- $\phi \circ \psi = \text{id}_H$ (identity on $H$)

Equivalently, $\phi$ is bijective.

**Notation**: We write $G \cong H$ (read "$G$ is isomorphic to $H$") if there exists an isomorphism between them.

**Theorem 2**: If $\phi: G \to H$ is an isomorphism, then $\phi^{-1}: H \to G$ is also an isomorphism.

**Proof**: We need to show that $\phi^{-1}$ is a homomorphism. Let $h_1, h_2 \in H$. Since $\phi$ is surjective, there exist unique $g_1, g_2 \in G$ with $\phi(g_1) = h_1$ and $\phi(g_2) = h_2$. Then:

$$\phi^{-1}(h_1 h_2) = \phi^{-1}(\phi(g_1)\phi(g_2)) = \phi^{-1}(\phi(g_1 g_2)) = g_1 g_2 = \phi^{-1}(h_1) \phi^{-1}(h_2)$$

Therefore $\phi^{-1}$ is a homomorphism. $\square$

**Theorem 3**: Isomorphism is an equivalence relation on the class of all groups.

**Proof**:
- Reflexive: $\text{id}_G: G \to G$ is an isomorphism
- Symmetric: If $\phi: G \to H$ is an isomorphism, then $\phi^{-1}: H \to G$ is an isomorphism
- Transitive: If $\phi: G \to H$ and $\psi: H \to K$ are isomorphisms, then $\psi \circ \phi: G \to K$ is an isomorphism
$\square$

### Example 7: Chinese Remainder Theorem

Define $\phi: \mathbb{Z}_6 \to \mathbb{Z}_2 \times \mathbb{Z}_3$ by:
$$\phi(k) = (k \bmod 2, k \bmod 3)$$

This is an isomorphism. For instance:
- $\phi(0) = (0, 0)$
- $\phi(1) = (1, 1)$
- $\phi(2) = (0, 2)$
- $\phi(3) = (1, 0)$
- $\phi(4) = (0, 1)$
- $\phi(5) = (1, 2)$

We can verify it's a homomorphism: $\phi(2 + 3) = \phi(5) = (1, 2) = (0, 2) + (1, 0) = \phi(2) + \phi(3)$.

More generally, if $\gcd(m, n) = 1$, then $\mathbb{Z}_{mn} \cong \mathbb{Z}_m \times \mathbb{Z}_n$.

### Example 8: Cyclic Groups

All cyclic groups of the same order are isomorphic. Specifically, any cyclic group of order $n$ is isomorphic to $\mathbb{Z}_n$, and any infinite cyclic group is isomorphic to $\mathbb{Z}$.

If $G = \langle g \rangle$ is cyclic of order $n$, define $\phi: \mathbb{Z}_n \to G$ by $\phi(k) = g^k$. This is an isomorphism.

## Image and Kernel (Preview)

Two subgroups naturally associated with any homomorphism $\phi: G \to H$:

**Image**:
$$\text{Im}(\phi) = \phi(G) = \{\phi(g) : g \in G\} \subseteq H$$

**Kernel**:
$$\ker(\phi) = \{g \in G : \phi(g) = e_H\} = \phi^{-1}(\{e_H\})$$

**Theorem 4**:
1. $\text{Im}(\phi) \leq H$ (the image is a subgroup)
2. $\ker(\phi) \triangleleft G$ (the kernel is a normal subgroup)

**Proof of (2)**: We verify normality. First, $\ker(\phi) \leq G$ by the subgroup test. For normality, let $k \in \ker(\phi)$ and $g \in G$. Then:

$$\phi(gkg^{-1}) = \phi(g)\phi(k)\phi(g^{-1}) = \phi(g) \cdot e_H \cdot \phi(g)^{-1} = \phi(g)\phi(g)^{-1} = e_H$$

Thus $gkg^{-1} \in \ker(\phi)$, so $\ker(\phi) \triangleleft G$. $\square$

## Criterion for Injectivity

**Theorem 5 (Injectivity Criterion)**: A homomorphism $\phi: G \to H$ is injective if and only if $\ker(\phi) = \{e_G\}$.

**Proof**:
($\Rightarrow$) Suppose $\phi$ is injective. If $g \in \ker(\phi)$, then $\phi(g) = e_H = \phi(e_G)$. By injectivity, $g = e_G$. Thus $\ker(\phi) = \{e_G\}$.

($\Leftarrow$) Suppose $\ker(\phi) = \{e_G\}$. If $\phi(a) = \phi(b)$, then:
$$e_H = \phi(a)\phi(b)^{-1} = \phi(a)\phi(b^{-1}) = \phi(ab^{-1})$$

Therefore $ab^{-1} \in \ker(\phi) = \{e_G\}$, so $ab^{-1} = e_G$, giving $a = b$. Thus $\phi$ is injective. $\square$

## Composition of Homomorphisms

**Theorem 6**: The composition of homomorphisms is a homomorphism.

**Proof**: Let $\phi: G \to H$ and $\psi: H \to K$ be homomorphisms. Then for $a, b \in G$:
$$(\psi \circ \phi)(ab) = \psi(\phi(ab)) = \psi(\phi(a)\phi(b)) = \psi(\phi(a))\psi(\phi(b)) = (\psi \circ \phi)(a)(\psi \circ \phi)(b)$$
$\square$

## Summary

Group homomorphisms are the fundamental structure-preserving maps in group theory:

- **Definition**: $\phi(ab) = \phi(a)\phi(b)$ for all $a, b \in G$
- **Properties**: Preserve identities, inverses, powers, subgroup structure
- **Image**: $\text{Im}(\phi) \leq H$ always
- **Kernel**: $\ker(\phi) \triangleleft G$ always
- **Injectivity**: $\phi$ injective $\Leftrightarrow$ $\ker(\phi) = \{e_G\}$
- **Isomorphism**: Bijective homomorphism; preserves all group-theoretic properties

The study of homomorphisms allows us to understand how groups relate to one another and provides the foundation for quotient groups and the Isomorphism Theorems.
