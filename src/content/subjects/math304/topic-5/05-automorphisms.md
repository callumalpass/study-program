---
title: "Automorphisms"
description: "Automorphisms and the automorphism group of a group"
---

# Automorphisms

## Introduction

An automorphism is a symmetry of a group's structure—an isomorphism from a group to itself. While isomorphisms compare different groups, automorphisms reveal the internal symmetries of a single group. The collection of all automorphisms forms a group that encodes deep information about the original group's structure.

## Definition

**Definition**: An **automorphism** of a group $G$ is an isomorphism $\phi: G \to G$.

Equivalently, $\phi$ is a bijective homomorphism from $G$ to itself.

**Examples of automorphisms**:
- Identity map: $\phi(g) = g$ for all $g \in G$
- Inversion (if $G$ abelian): $\phi(g) = g^{-1}$
- Conjugation: $\phi(g) = aga^{-1}$ for fixed $a \in G$

## The Automorphism Group

**Theorem 1**: The set $\text{Aut}(G)$ of all automorphisms of $G$ forms a group under composition of functions.

**Proof**: We verify the group axioms.

**Closure**: If $\phi, \psi \in \text{Aut}(G)$, then $\phi \circ \psi$ is a composition of homomorphisms (hence a homomorphism) and a composition of bijections (hence bijective). Therefore $\phi \circ \psi \in \text{Aut}(G)$. ✓

**Associativity**: Function composition is always associative. ✓

**Identity**: The identity map $\text{id}_G: g \mapsto g$ is an automorphism, and it serves as the identity element of $\text{Aut}(G)$. ✓

**Inverses**: If $\phi \in \text{Aut}(G)$, then $\phi$ is bijective, so $\phi^{-1}$ exists. Moreover, $\phi^{-1}$ is a homomorphism (proved earlier), hence an automorphism. We have $\phi \circ \phi^{-1} = \phi^{-1} \circ \phi = \text{id}_G$. ✓

Therefore $\text{Aut}(G)$ is a group. $\square$

## Examples of Automorphism Groups

### Example 1: $\text{Aut}(\mathbb{Z})$

Any automorphism $\phi: \mathbb{Z} \to \mathbb{Z}$ is determined by $\phi(1)$.

Since $\phi$ is a homomorphism: $\phi(n) = \phi(1 + \cdots + 1) = n\phi(1)$.

For $\phi$ to be surjective, $\phi(1)$ must generate $\mathbb{Z}$. The only generators are $\pm 1$.

Thus automorphisms are:
- $\phi_+: n \mapsto n$ (identity)
- $\phi_-: n \mapsto -n$ (negation)

Therefore $\text{Aut}(\mathbb{Z}) \cong \mathbb{Z}_2 = \{1, -1\}$ under multiplication.

### Example 2: $\text{Aut}(\mathbb{Z}_n)$

An automorphism $\phi: \mathbb{Z}_n \to \mathbb{Z}_n$ is determined by $\phi(1)$.

For $\phi$ to be an isomorphism, $\phi(1)$ must generate $\mathbb{Z}_n$. This happens iff $\gcd(\phi(1), n) = 1$.

Therefore there are $\phi(n)$ automorphisms (where $\phi$ denotes Euler's totient function).

Define $\psi_k: \mathbb{Z}_n \to \mathbb{Z}_n$ by $\psi_k(x) = kx$ for $\gcd(k, n) = 1$.

This gives: $\text{Aut}(\mathbb{Z}_n) \cong U(n)$ (the group of units modulo $n$).

**For $n = 8$**: $U(8) = \{1, 3, 5, 7\}$ under multiplication mod 8, which is isomorphic to $\mathbb{Z}_2 \times \mathbb{Z}_2$ (Klein four-group).

**For $n = p$ prime**: $U(p) = \{1, 2, \ldots, p-1\}$ is cyclic of order $p-1$. Thus $\text{Aut}(\mathbb{Z}_p) \cong \mathbb{Z}_{p-1}$.

### Example 3: $\text{Aut}(V_4)$

Let $V_4 = \mathbb{Z}_2 \times \mathbb{Z}_2 = \{e, a, b, ab\}$ (Klein four-group) where all non-identity elements have order 2.

Any automorphism must permute the three non-identity elements $\{a, b, ab\}$ (cannot map any to $e$ except $e$ itself).

Any permutation of $\{a, b, ab\}$ extends to an automorphism. For instance:
- $\phi(a) = b, \phi(b) = a, \phi(ab) = ab$
- $\psi(a) = a, \psi(b) = ab, \psi(ab) = b$

There are $3! = 6$ permutations, giving $|\text{Aut}(V_4)| = 6$.

Therefore $\text{Aut}(V_4) \cong S_3$.

## Inner Automorphisms

**Definition**: For $g \in G$, the **inner automorphism** induced by $g$ is $\phi_g: G \to G$ defined by:
$$\phi_g(x) = gxg^{-1}$$

This is conjugation by $g$.

**Theorem 2**: Every inner automorphism is an automorphism.

**Proof**:
**Homomorphism**:
$$\phi_g(xy) = g(xy)g^{-1} = gx(g^{-1}g)yg^{-1} = (gxg^{-1})(gyg^{-1}) = \phi_g(x)\phi_g(y)$$
✓

**Bijection**: The inverse is $\phi_{g^{-1}}$ since:
$$\phi_{g^{-1}}(\phi_g(x)) = g^{-1}(gxg^{-1})g = x$$
✓

Therefore $\phi_g \in \text{Aut}(G)$. $\square$

**Notation**: The set of inner automorphisms is denoted $\text{Inn}(G)$.

### Properties of Inner Automorphisms

**Theorem 3**: $\text{Inn}(G)$ is a normal subgroup of $\text{Aut}(G)$.

**Proof**:
**Subgroup**:
- Identity: $\phi_e = \text{id}_G \in \text{Inn}(G)$
- Closure: $\phi_g \circ \phi_h = \phi_{gh}$ (verify: $\phi_g(\phi_h(x)) = g(hxh^{-1})g^{-1} = (gh)x(gh)^{-1} = \phi_{gh}(x)$)
- Inverses: $(\phi_g)^{-1} = \phi_{g^{-1}} \in \text{Inn}(G)$

**Normality**: For any $\psi \in \text{Aut}(G)$ and $\phi_g \in \text{Inn}(G)$:
$$(\psi \circ \phi_g \circ \psi^{-1})(x) = \psi(g \psi^{-1}(x) g^{-1}) = \psi(g)\psi(\psi^{-1}(x))\psi(g^{-1}) = \psi(g) \cdot x \cdot \psi(g)^{-1} = \phi_{\psi(g)}(x)$$

Thus $\psi \phi_g \psi^{-1} = \phi_{\psi(g)} \in \text{Inn}(G)$, proving normality. ✓

$\square$

## Connection to Center

**Theorem 4**: $\text{Inn}(G) \cong G/Z(G)$ where $Z(G)$ is the center of $G$.

**Proof**: Define $\Phi: G \to \text{Inn}(G)$ by $\Phi(g) = \phi_g$.

**Homomorphism**: $\Phi(gh) = \phi_{gh} = \phi_g \circ \phi_h = \Phi(g) \circ \Phi(h)$. ✓

**Kernel**:
$$\ker(\Phi) = \{g \in G : \phi_g = \text{id}_G\} = \{g \in G : gxg^{-1} = x \text{ for all } x\} = Z(G)$$

The kernel is exactly the center (elements that commute with everything). ✓

**Image**: $\text{Im}(\Phi) = \{\phi_g : g \in G\} = \text{Inn}(G)$ by definition. ✓

By the First Isomorphism Theorem:
$$G/\ker(\Phi) \cong \text{Im}(\Phi)$$
$$G/Z(G) \cong \text{Inn}(G)$$
$\square$

**Corollary**: If $G$ is abelian, then $\text{Inn}(G) = \{\text{id}_G\}$ (trivial).

**Proof**: For abelian $G$, $Z(G) = G$, so $\text{Inn}(G) \cong G/G = \{e\}$. $\square$

### Example 4: $\text{Inn}(S_3)$

For $S_3$, the center is $Z(S_3) = \{e\}$ (no element commutes with all others).

Therefore: $\text{Inn}(S_3) \cong S_3/\{e\} \cong S_3$.

This means $|\text{Inn}(S_3)| = 6$.

But wait—can we also compute $|\text{Aut}(S_3)|$?

Actually, for $n \neq 6$, all automorphisms of $S_n$ are inner, so $\text{Aut}(S_3) = \text{Inn}(S_3) \cong S_3$.

## Outer Automorphisms

**Definition**: The **outer automorphism group** is:
$$\text{Out}(G) = \text{Aut}(G)/\text{Inn}(G)$$

This measures automorphisms that are "genuinely different" from conjugation.

**Example 5**: For abelian groups, all inner automorphisms are trivial, so:
$$\text{Out}(G) = \text{Aut}(G)/\{\text{id}\} \cong \text{Aut}(G)$$

For $\mathbb{Z}_6$: $\text{Out}(\mathbb{Z}_6) \cong \text{Aut}(\mathbb{Z}_6) \cong U(6) = \{1, 5\} \cong \mathbb{Z}_2$.

**Example 6**: The exceptional case $S_6$.

For most $n$, $\text{Aut}(S_n) = \text{Inn}(S_n) \cong S_n$, so $\text{Out}(S_n)$ is trivial.

However, $S_6$ has outer automorphisms! $|\text{Out}(S_6)| = 2$, meaning $\text{Aut}(S_6)$ is strictly larger than $S_6$.

This is a remarkable exceptional phenomenon in group theory.

## Fixed Points and Characteristic Subgroups

**Definition**: A subgroup $H \leq G$ is **characteristic** if $\phi(H) = H$ for all $\phi \in \text{Aut}(G)$.

**Examples of characteristic subgroups**:
- $Z(G)$ (center)
- $[G, G]$ (commutator subgroup)
- $G^{(n)}$ (derived series)
- Frattini subgroup $\Phi(G)$

**Theorem 5**: Characteristic subgroups are normal.

**Proof**: If $H$ is characteristic, then for any $g \in G$, the inner automorphism $\phi_g$ satisfies $\phi_g(H) = H$. This means $gHg^{-1} = H$, so $H \triangleleft G$. $\square$

**Note**: Normal subgroups need not be characteristic. For instance, in $V_4 = \{e, a, b, ab\}$, each subgroup $\langle a \rangle$ is normal, but automorphisms can map $a \mapsto b$.

## Computing Automorphisms: Systematic Approach

To find $\text{Aut}(G)$:

1. **Identify generators**: Find generators $g_1, \ldots, g_k$ of $G$
2. **Determine constraints**: Automorphisms must preserve orders and relations
3. **Count possibilities**: How many ways can we map generators while preserving structure?
4. **Verify**: Check that candidate maps extend to well-defined automorphisms

**Example 7**: Find $\text{Aut}(\mathbb{Z}_2 \times \mathbb{Z}_2)$ = $\text{Aut}(V_4)$ systematically.

$V_4$ is generated by any two of its three non-identity elements. All have order 2.

Any automorphism $\phi$ must:
- Map $e \mapsto e$
- Permute elements of order 2

If $\phi(a) = a$ and $\phi(b) = b$, then $\phi = \text{id}$.

If $\phi(a) = b$, then since $ab$ has order 2 and $\phi(a)\phi(b) = \phi(ab)$:
- If $\phi(b) = a$, then $\phi(ab) = ba = ab$
- If $\phi(b) = ab$, then $\phi(ab) = b(ab) = a$

Systematically enumerating gives 6 automorphisms, confirming $\text{Aut}(V_4) \cong S_3$.

## Summary

**Automorphisms**:
- Isomorphisms from $G$ to itself
- Encode internal symmetries
- $\text{Aut}(G)$ forms a group under composition

**Inner Automorphisms**:
- Conjugation: $\phi_g(x) = gxg^{-1}$
- $\text{Inn}(G) \triangleleft \text{Aut}(G)$
- $\text{Inn}(G) \cong G/Z(G)$

**Outer Automorphisms**:
- $\text{Out}(G) = \text{Aut}(G)/\text{Inn}(G)$
- Measure "non-conjugation" symmetries
- Usually trivial, but exceptional cases exist (e.g., $S_6$)

**Key Examples**:
- $\text{Aut}(\mathbb{Z}) \cong \mathbb{Z}_2$
- $\text{Aut}(\mathbb{Z}_n) \cong U(n)$
- $\text{Aut}(V_4) \cong S_3$

Automorphisms reveal the deepest symmetries within a group's structure and provide powerful tools for classification and analysis.
