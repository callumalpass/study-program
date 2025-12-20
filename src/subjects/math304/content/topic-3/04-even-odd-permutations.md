---
title: "Even and Odd Permutations"
description: "Classification of permutations by parity and the sign homomorphism"
---

# Even and Odd Permutations

## Transpositions

**Definition**: A **transposition** is a 2-cycle that swaps two elements.

Every transposition has the form $(a\,b)$ where $a \neq b$.

**Properties**:
- $(a\,b)^2 = \text{id}$ (swapping twice returns to original)
- $(a\,b) = (b\,a)$ (order doesn't matter)
- Order: $|(a\,b)| = 2$

### Example

$(3\,7)$ swaps 3 and 7, leaving all else fixed.

In $S_8$:
$$(3\,7) = \begin{pmatrix} 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 \\ 1 & 2 & 7 & 4 & 5 & 6 & 3 & 8 \end{pmatrix}$$

## Expressing Permutations as Products of Transpositions

**Theorem**: Every permutation can be written as a product of transpositions.

**Proof**: Sufficient to show every cycle can be written as product of transpositions:
$$(a_1\,a_2\,\ldots\,a_k) = (a_1\,a_k)(a_1\,a_{k-1})\cdots(a_1\,a_3)(a_1\,a_2)$$

Check: This sends $a_1 \to a_2$, $a_2 \to a_3$, ..., $a_k \to a_1$ as required. $\square$

### Example 1

$(1\,2\,3\,4) = (1\,4)(1\,3)(1\,2)$

Verification:
- $1 \xrightarrow{(1\,2)} 2 \xrightarrow{(1\,3)} 2 \xrightarrow{(1\,4)} 2$ ✓
- Wait, let me recompute right-to-left:
- $1 \xrightarrow{(1\,2)} 2 \xrightarrow{(1\,3)} 2 \xrightarrow{(1\,4)} 2$
- $2 \xrightarrow{(1\,2)} 1 \xrightarrow{(1\,3)} 3 \xrightarrow{(1\,4)} 3$ ✓
- $3 \xrightarrow{(1\,2)} 3 \xrightarrow{(1\,3)} 1 \xrightarrow{(1\,4)} 4$ ✓
- $4 \xrightarrow{(1\,2)} 4 \xrightarrow{(1\,3)} 4 \xrightarrow{(1\,4)} 1$ ✓

### Example 2

$(1\,3\,5) = (1\,5)(1\,3)$

$(2\,4\,6\,7) = (2\,7)(2\,6)(2\,4)$

## Non-Uniqueness

Decomposition into transpositions is NOT unique!

### Example 3

$(1\,2\,3) = (1\,3)(1\,2)$ (2 transpositions)

But also:
$(1\,2\,3) = (2\,3)(1\,3)(1\,2)(2\,3)$ (4 transpositions)

Apply identity $(2\,3)(2\,3) = \text{id}$ twice.

**Observation**: Same permutation can be expressed with different numbers of transpositions!

## Parity of Transpositions

**Theorem (Parity Theorem)**: Although a permutation can be written as a product of transpositions in many ways, the **parity** (even/odd number) of transpositions is always the same.

**Proof (sketch using determinants)**: Consider the effect on the determinant of an $n \times n$ matrix. Each transposition of rows multiplies the determinant by $-1$. Since the determinant is well-defined, the parity must be consistent. $\square$

**Alternative proof using inversions** (covered later).

## Even and Odd Permutations

**Definition**: A permutation is:
- **Even** if it can be written as a product of an even number of transpositions
- **Odd** if it can be written as a product of an odd number of transpositions

### Examples

**Even permutations**:
- $\text{id}$ (zero transpositions, $0$ is even)
- $(1\,2)(3\,4)$ (two transpositions)
- $(1\,2\,3) = (1\,3)(1\,2)$ (two transpositions)

**Odd permutations**:
- $(1\,2)$ (one transposition)
- $(1\,2\,3\,4) = (1\,4)(1\,3)(1\,2)$ (three transpositions)

## Determining Parity from Cycle Type

**Theorem**: A $k$-cycle is even if $k$ is odd, and odd if $k$ is even.

**Proof**: $(a_1\,\ldots\,a_k) = (a_1\,a_k)\cdots(a_1\,a_2)$ is a product of $k-1$ transpositions.
- If $k$ is odd, then $k-1$ is even → even permutation
- If $k$ is even, then $k-1$ is odd → odd permutation

$\square$

**Mnemonic**: The parity is OPPOSITE to what you might expect!

### Example 4

- $(1\,2\,3)$: 3-cycle (odd length) → even permutation
- $(1\,2\,3\,4)$: 4-cycle (even length) → odd permutation
- $(1\,2)$: 2-cycle (even length) → odd permutation

## Parity of Products

**Theorem**: For disjoint cycles:
$$\sigma = \sigma_1 \sigma_2 \cdots \sigma_m$$
is even iff an even number of the $\sigma_i$ are odd.

**Proof**: Count total transpositions. Even + even = even, even + odd = odd, etc. $\square$

### Example 5

$\sigma = (1\,2\,3)(4\,5)(6\,7\,8\,9)$

Parities:
- $(1\,2\,3)$: even (odd length)
- $(4\,5)$: odd (even length)
- $(6\,7\,8\,9)$: odd (even length)

Two odd cycles → $\sigma$ is even.

Verify: $(1\,2\,3) = (1\,3)(1\,2)$ (2 transp.), $(4\,5)$ (1 transp.), $(6\,7\,8\,9) = (6\,9)(6\,8)(6\,7)$ (3 transp.). Total: $2 + 1 + 3 = 6$ transpositions (even). ✓

## The Sign Function

**Definition**: The **sign** (or **signature**) of permutation $\sigma$ is:
$$\text{sgn}(\sigma) = \begin{cases} +1 & \text{if } \sigma \text{ is even} \\ -1 & \text{if } \sigma \text{ is odd} \end{cases}$$

### Properties

**Theorem**: The sign function is a homomorphism:
$$\text{sgn}(\sigma \tau) = \text{sgn}(\sigma) \cdot \text{sgn}(\tau)$$

**Proof**:
- Even $\circ$ even = even: $(+1)(+1) = +1$ ✓
- Even $\circ$ odd = odd: $(+1)(-1) = -1$ ✓
- Odd $\circ$ even = odd: $(-1)(+1) = -1$ ✓
- Odd $\circ$ odd = even: $(-1)(-1) = +1$ ✓

$\square$

**Corollary**: $\text{sgn}: S_n \to \{-1, +1\} \cong \mathbb{Z}_2$ is a group homomorphism.

## Computing Sign

**Formula using inversions**:
$$\text{sgn}(\sigma) = (-1)^{\text{number of inversions}}$$

An **inversion** is a pair $(i, j)$ with $i < j$ but $\sigma(i) > \sigma(j)$.

### Example 6

$\sigma = \begin{pmatrix} 1 & 2 & 3 & 4 \\ 3 & 1 & 4 & 2 \end{pmatrix}$

Inversions:
- $(1,2)$: $\sigma(1)=3 > \sigma(2)=1$ ✓
- $(1,4)$: $\sigma(1)=3 > \sigma(4)=2$ ✓
- $(2,3)$: $\sigma(2)=1 < \sigma(3)=4$ ✗
- $(2,4)$: $\sigma(2)=1 < \sigma(4)=2$ ✗
- $(3,4)$: $\sigma(3)=4 > \sigma(4)=2$ ✓

Total: 3 inversions → $\text{sgn}(\sigma) = (-1)^3 = -1$ (odd).

Verify with cycles: $\sigma = (1\,3\,4\,2)$ (4-cycle, even length → odd permutation). ✓

## Proportion of Even/Odd Permutations

**Theorem**: In $S_n$ (for $n \geq 2$), exactly half the permutations are even and half are odd.

**Proof**: The sign homomorphism $\text{sgn}: S_n \to \{-1,+1\}$ is surjective ($(1\,2)$ maps to $-1$). By the First Isomorphism Theorem (covered later), $|S_n|/|A_n| = 2$, where $A_n$ is the kernel (even permutations). Thus $|A_n| = n!/2$. $\square$

## The Alternating Group

**Definition**: $A_n = \{\sigma \in S_n : \text{sgn}(\sigma) = 1\}$ is the **alternating group**.

**Properties**:
- $A_n$ is a subgroup of $S_n$ (kernel of sign homomorphism)
- $|A_n| = n!/2$
- $A_n$ is normal in $S_n$
- $A_n$ is simple for $n \geq 5$ (no nontrivial normal subgroups)

### Small Alternating Groups

**$A_3$**: Even permutations in $S_3$:
$$A_3 = \{\text{id}, (1\,2\,3), (1\,3\,2)\} \cong \mathbb{Z}_3$$

**$A_4$**: $|A_4| = 24/2 = 12$. Elements include identity, 3-cycles, and double transpositions like $(1\,2)(3\,4)$.

**$A_5$**: $|A_5| = 120/2 = 60$. This group is simple and related to the icosahedron.

## Applications

**Solvability of Polynomials**: Galois theory uses $A_5$ to prove quintic equations have no general solution by radicals.

**Rubik's Cube**: Legal positions correspond to even permutations.

**15-Puzzle**: Solvable configurations are even permutations.

## Summary

Key results:
- Every permutation = product of transpositions
- Parity (even/odd) is well-defined
- $k$-cycle is even iff $k$ is odd
- $\text{sgn}: S_n \to \mathbb{Z}_2$ is a homomorphism
- $A_n$ contains exactly half of $S_n$
- $|A_n| = n!/2$

Understanding parity is crucial for studying symmetric and alternating groups.
