---
title: "Quotient Rings"
description: "Construction and properties of quotient rings"
---

# Quotient Rings

## Definition

**Definition**: If $I$ is an ideal of ring $R$, the **quotient ring** $R/I$ has:
- Elements: cosets $r + I = \{r + a : a \in I\}$
- Addition: $(r + I) + (s + I) = (r + s) + I$
- Multiplication: $(r + I)(s + I) = rs + I$

**Theorem**: $R/I$ is a ring.

## Examples

### Example 1: $\mathbb{Z}/n\mathbb{Z} = \mathbb{Z}_n$

Integers modulo $n$ as quotient ring.

### Example 2: Polynomial Quotients

$\mathbb{R}[x]/\langle x^2 + 1 \rangle \cong \mathbb{C}$

Identifies $x$ with $i$ (since $x^2 + 1 = 0$ in quotient).

## Properties

**First Isomorphism Theorem**: $R/\ker(\phi) \cong \text{Im}(\phi)$ for ring homomorphism $\phi$.

**Maximal Ideals**: $R/I$ is a field iff $I$ is maximal.

**Prime Ideals**: $R/I$ is integral domain iff $I$ is prime.

## Applications

- Constructing new rings/fields
- Studying ring structure
- Connections to algebraic geometry

## Summary

- Quotient rings: $R/I$ for ideal $I$
- Operations on cosets well-defined
- Structure determined by ideal type
- Isomorphism theorems apply

Quotient rings generalize quotient groups to rings.
