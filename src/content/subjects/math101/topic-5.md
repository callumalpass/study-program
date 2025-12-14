## Introduction

Functions are a special type of relation that assign exactly one output to every input. They are central to calculus, linear algebra, and computer science (think "methods" or "subroutines").

**Learning Objectives:**
- Define Domain, Codomain, and Range
- Identify Injective (One-to-One), Surjective (Onto), and Bijective functions
- Compose functions
- Find Inverse functions
- Understand Floor and Ceiling functions

---

## Core Concepts

### Definition
A function $f: A \to B$ assigns each $a \in A$ to a unique $b \in B$.
- **Domain:** Set $A$.
- **Codomain:** Set $B$.
- **Range (Image):** The set of actual values mapped to {f(a) | a \in A}. Note: Range $\subseteq$ Codomain.

### Types of Functions

1.  **Injective (One-to-One):**
    Distinct inputs map to distinct outputs.
    $\\forall x, y \in A, f(x) = f(y) \implies x = y$.
    *Horizontal Line Test passes (at most 1 intersection).*

2.  **Surjective (Onto):**
    Every element in the codomain is "hit" by the function.
    $\\forall b \in B, \exists a \in A$ such that $f(a) = b$.
    *Range = Codomain.*

3.  **Bijective:**
    Both Injective and Surjective.
    A perfect one-to-one correspondence.
    *Only bijective functions have inverses.*

### Composition
$(f \circ g)(x) = f(g(x))$.
Order matters! $(f \circ g)$ usually $\neq (g \circ f)$.

### Inverse Functions
If $f: A \to B$ is bijective, $f^{-1}: B \to A$ exists.
$f(a) = b \iff f^{-1}(b) = a$.

---

## Common Patterns and Idioms

### Floor and Ceiling
Used constantly in CS (e.g., analyzing algorithms).
- **Floor ($\\lfloor x \\rfloor$):** Greatest integer $\le x$.
  - $\lfloor 2.9 \\rfloor = 2$
- **Ceiling ($\\lceil x \\rceil$):** Smallest integer $\ge x$.
  - $\\lceil 2.1 \\rceil = 3$

### Pigeonhole Principle
If $k+1$ objects are placed into $k$ boxes, at least one box contains 2 or more objects.
*Simple but powerful proof technique.*

---

## Common Mistakes and Debugging

### Mistake 1: Codomain vs Range
They are not the same!
$f(x) = x^2$ from $\\mathbb{R} \to \\mathbb{R}$.
- Codomain: All real numbers.
- Range: Non-negative real numbers $[0, \infty)$.
Therefore, it is not surjective.

### Mistake 2: Inverse of Non-Bijective Functions
You cannot define a standard inverse if the function is not one-to-one (ambiguity) or not onto (undefined inputs).

---

## Summary

- **Functions** are deterministic mappings.
- **Injection/Surjection/Bijection** describe how the domain maps to the codomain.
- **Composition** chains functions together.
- **Inverse** reverses the process (only for bijections).
