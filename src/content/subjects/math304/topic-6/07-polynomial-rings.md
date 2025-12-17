---
title: "Polynomial Rings"
description: "Introduction to polynomial rings and their properties"
---

# Polynomial Rings

## Definition

**Definition**: For ring $R$, the **polynomial ring** $R[x]$ consists of polynomials:
$$f(x) = a_n x^n + a_{n-1} x^{n-1} + \cdots + a_1 x + a_0$$
where $a_i \in R$.

**Operations**: Standard polynomial addition and multiplication.

## Properties

**Theorem**: If $R$ is a ring, then $R[x]$ is a ring.

**Theorem**: If $R$ is commutative, so is $R[x]$.

**Theorem**: If $R$ has unity 1, then $R[x]$ has unity (constant polynomial 1).

**Theorem**: If $R$ is an integral domain, so is $R[x]$.

## Degree

**Definition**: $\deg(f) = $ highest power of $x$ with non-zero coefficient.

**Properties**:
- $\deg(f + g) \leq \max(\deg f, \deg g)$
- $\deg(fg) = \deg f + \deg g$ (in integral domains)

## Division Algorithm

**Theorem**: If $F$ is a field and $f, g \in F[x]$ with $g \neq 0$, exist unique $q, r \in F[x]$ such that:
$$f = qg + r \quad \text{where } \deg r < \deg g$$

Polynomial long division works in $F[x]$.

## Irreducible Polynomials

**Definition**: Non-constant $f \in F[x]$ is **irreducible** over $F$ if it cannot be factored into polynomials of lower degree.

**Examples**:
- $x^2 + 1$ irreducible over $\mathbb{R}$ (but factors over $\mathbb{C}$)
- $x^2 - 2$ irreducible over $\mathbb{Q}$ (but factors over $\mathbb{R}$)

## Applications

- Constructing field extensions
- Galois theory
- Algebraic geometry
- Coding theory

## Summary

- $R[x]$: polynomials with coefficients in $R$
- Inherits many properties from $R$
- Division algorithm in $F[x]$ (fields)
- Irreducible polynomials are "prime" elements
- Foundation for advanced algebra

Polynomial rings are fundamental structures connecting algebra, geometry, and number theory.
