## Introduction

Functions are a special type of relation that assign exactly one output to every input. They are central to calculus, linear algebra, and computer science (think "methods" or "subroutines"). Understanding functions mathematically helps you reason about code, analyze algorithms, and design systems.

**Why This Matters:**
Every method in programming is a function (or tries to be). Understanding injections, surjections, and bijections helps with database design (one-to-one vs one-to-many), cryptography (invertible functions), and algorithm analysis. The concepts of domain and range map directly to type systems.

**Learning Objectives:**
- Define Domain, Codomain, and Range
- Identify Injective (One-to-One), Surjective (Onto), and Bijective functions
- Compose functions
- Find Inverse functions
- Understand Floor and Ceiling functions

---

## Core Concepts

### Definition of a Function

A **function** $f: A \to B$ is a relation from $A$ to $B$ where every element of $A$ is related to **exactly one** element of $B$.

**Notation:** $f: A \to B$, $f(a) = b$, or $a \mapsto b$

**Two requirements:**
1. **Total:** Every element of $A$ has an output (no undefined inputs)
2. **Well-defined:** Each input gives exactly one output (no ambiguity)

### Domain, Codomain, and Range

For $f: A \to B$:

| Term | Definition | Example for $f(x) = x^2$ from $\mathbb{R} \to \mathbb{R}$ |
|------|------------|----------------------------------------|
| **Domain** | Set $A$ (all valid inputs) | $\mathbb{R}$ (all real numbers) |
| **Codomain** | Set $B$ (possible outputs declared) | $\mathbb{R}$ (all real numbers) |
| **Range (Image)** | $\{f(a) \mid a \in A\}$ (actual outputs) | $[0, \infty)$ (non-negative reals) |

**Key distinction:** Range $\subseteq$ Codomain, but they may not be equal!

### Types of Functions

#### Injective (One-to-One)

Different inputs always give different outputs.

$$\forall x, y \in A: f(x) = f(y) \Rightarrow x = y$$

**Equivalently:** No two inputs map to the same output.

**Horizontal Line Test:** A function is injective if every horizontal line intersects its graph at most once.

**Examples:**
- $f(x) = 2x + 1$ (Injective ✓)
- $f(x) = x^2$ from $\mathbb{R} \to \mathbb{R}$ (Not injective: $f(-2) = f(2) = 4$)
- $f(x) = x^2$ from $[0, \infty) \to \mathbb{R}$ (Injective ✓)

#### Surjective (Onto)

Every element in the codomain is "hit" by at least one input.

$$\forall b \in B, \exists a \in A: f(a) = b$$

**Equivalently:** Range = Codomain.

**Examples:**
- $f(x) = 2x + 1$ from $\mathbb{R} \to \mathbb{R}$ (Surjective ✓)
- $f(x) = x^2$ from $\mathbb{R} \to \mathbb{R}$ (Not surjective: no $x$ gives $f(x) = -1$)
- $f(x) = x^2$ from $\mathbb{R} \to [0, \infty)$ (Surjective ✓)

#### Bijective (One-to-One Correspondence)

Both injective AND surjective.

**Key property:** Bijective functions have inverses!

A bijection establishes a perfect pairing between elements of $A$ and $B$.

**Examples:**
- $f(x) = 2x + 1$ from $\mathbb{R} \to \mathbb{R}$ (Bijective ✓)
- $f(x) = x^3$ from $\mathbb{R} \to \mathbb{R}$ (Bijective ✓)

### Summary Table

| Property | Meaning | "Arrow Diagram" Rule |
|----------|---------|---------------------|
| Function | Each input has exactly one output | Every left element has exactly one arrow out |
| Injective | Different inputs → different outputs | No two arrows point to same right element |
| Surjective | Every output is used | Every right element has at least one arrow in |
| Bijective | Perfect one-to-one matching | Every right element has exactly one arrow in |

### Function Composition

If $f: A \to B$ and $g: B \to C$, then $g \circ f: A \to C$ is defined by:

$$(g \circ f)(x) = g(f(x))$$

**Read right to left:** Apply $f$ first, then $g$.

**Example:**
- $f(x) = x + 1$
- $g(x) = x^2$
- $(g \circ f)(x) = g(f(x)) = g(x + 1) = (x + 1)^2$
- $(f \circ g)(x) = f(g(x)) = f(x^2) = x^2 + 1$

**Note:** $g \circ f \neq f \circ g$ in general!

**Properties preserved under composition:**
- Injective $\circ$ Injective = Injective
- Surjective $\circ$ Surjective = Surjective
- Bijective $\circ$ Bijective = Bijective

### Inverse Functions

If $f: A \to B$ is **bijective**, then $f^{-1}: B \to A$ exists and satisfies:

$$f(a) = b \Leftrightarrow f^{-1}(b) = a$$

**Properties:**
- $f^{-1}(f(a)) = a$ for all $a \in A$
- $f(f^{-1}(b)) = b$ for all $b \in B$
- $(f^{-1})^{-1} = f$
- $(g \circ f)^{-1} = f^{-1} \circ g^{-1}$

**Finding inverses:**
1. Write $y = f(x)$
2. Solve for $x$ in terms of $y$
3. Replace $x$ with $f^{-1}(y)$

**Example:** $f(x) = 2x + 3$
1. $y = 2x + 3$
2. $x = \frac{y - 3}{2}$
3. $f^{-1}(y) = \frac{y - 3}{2}$

### Special Functions

#### Floor and Ceiling

Used constantly in computer science (array indexing, algorithm analysis).

**Floor:** $\lfloor x \rfloor$ = greatest integer $\leq x$
- $\lfloor 2.7 \rfloor = 2$
- $\lfloor -2.7 \rfloor = -3$
- $\lfloor 5 \rfloor = 5$

**Ceiling:** $\lceil x \rceil$ = smallest integer $\geq x$
- $\lceil 2.3 \rceil = 3$
- $\lceil -2.3 \rceil = -2$
- $\lceil 5 \rceil = 5$

**Useful identities:**
- $\lfloor x \rfloor \leq x < \lfloor x \rfloor + 1$
- $\lceil x \rceil - 1 < x \leq \lceil x \rceil$
- $\lfloor -x \rfloor = -\lceil x \rceil$

---

## Common Patterns and Idioms

### The Pigeonhole Principle

If $f: A \to B$ and $|A| > |B|$, then $f$ cannot be injective.

**Contrapositive:** If $f$ is injective, then $|A| \leq |B|$.

**Example:** If 13 people are in a room, at least 2 share a birth month (12 months, 13 people).

### Cardinality and Functions

For finite sets:
- Injection exists from $A$ to $B$ $\Rightarrow$ $|A| \leq |B|$
- Surjection exists from $A$ to $B$ $\Rightarrow$ $|A| \geq |B|$
- Bijection exists from $A$ to $B$ $\Leftrightarrow$ $|A| = |B|$

### Identity Function

$\text{id}_A: A \to A$ defined by $\text{id}_A(x) = x$

- $f \circ \text{id}_A = f$
- $\text{id}_B \circ f = f$

---

## Common Mistakes and Debugging

### Mistake 1: Codomain vs Range
They are NOT the same!

$f(x) = x^2$ from $\mathbb{R} \to \mathbb{R}$:
- Codomain: $\mathbb{R}$ (all reals)
- Range: $[0, \infty)$ (non-negative reals only)

This function is NOT surjective because Range $\neq$ Codomain.

### Mistake 2: Inverse of Non-Bijective Functions

You can't define a standard inverse if:
- Not injective: Multiple inputs give same output—which one does inverse choose?
- Not surjective: Some outputs have no corresponding input—inverse is undefined there.

**Workaround:** Restrict domain/codomain to make it bijective.

### Mistake 3: Composition Order

$(g \circ f)(x) = g(f(x))$, NOT $f(g(x))$!

Think: "Apply $f$ first, then $g$" but write "$g$ after $f$."

### Mistake 4: Assuming $f(A) = B$

Just because a function is $f: A \to B$ doesn't mean every element of $B$ is actually output. The range might be smaller than the codomain.

---

## Best Practices

1. **Specify domain and codomain:** $f(x) = x^2$ behaves differently on $\mathbb{R}$ vs $[0, \infty)$.

2. **Check injectivity with the definition:** If $f(x_1) = f(x_2)$, does it follow that $x_1 = x_2$?

3. **Check surjectivity by solving:** Given $y \in B$, can you find $x \in A$ with $f(x) = y$?

4. **Draw arrow diagrams for small examples:** Makes properties visually obvious.

5. **Remember composition order:** Right to left—inner function first.

---

## Real-World Applications

**Programming:**
```python
# Composition
def f(x):
    return x + 1

def g(x):
    return x * 2

def g_compose_f(x):
    return g(f(x))  # Apply f first, then g

# In functional style
from functools import reduce
compose = lambda f, g: lambda x: f(g(x))
```

**Cryptography:**
- Encryption must be bijective (to allow decryption)
- $E: \text{Plaintext} \to \text{Ciphertext}$
- $D = E^{-1}: \text{Ciphertext} \to \text{Plaintext}$

**Hash Functions:**
- $H: \text{Data} \to \text{Hash}$
- Surjective (every hash value is possible)
- NOT injective (collisions exist—different data, same hash)

**Database Keys:**
- Primary key → Record is a bijection
- Foreign key relationships can be injective (one-to-one) or not (one-to-many)

**Type Systems:**
```typescript
// Function types in TypeScript
const double: (x: number) => number = x => x * 2;
// Domain: number, Codomain: number
```

---

## Summary

- **Functions** assign exactly one output to each input.
- **Domain** = valid inputs; **Codomain** = declared outputs; **Range** = actual outputs.
- **Injective:** Different inputs → different outputs.
- **Surjective:** Every output is hit. Range = Codomain.
- **Bijective:** Both. Has an inverse.
- **Composition:** $(g \circ f)(x) = g(f(x))$—apply inner function first.
- **Inverse:** Only bijective functions have inverses.

---

## Further Exploration

- **Partial Functions:** Functions that may be undefined on some inputs. Common in programming.
- **Cardinality of Infinite Sets:** Bijections prove sets have "same size." $|\mathbb{N}| = |\mathbb{Q}|$ but $|\mathbb{N}| < |\mathbb{R}|$.
- **Higher-Order Functions:** Functions that take or return functions. Foundation of functional programming.
- **Lambda Calculus:** A formal system based entirely on functions. Foundation of computation theory.
