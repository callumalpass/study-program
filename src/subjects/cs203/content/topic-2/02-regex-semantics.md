---
id: cs203-t2-semantics
title: "Regex Semantics"
order: 2
---

# Semantics and Language Definition

The semantics of regular expressions defines exactly which strings belong to the language described by an expression. Understanding these semantics is crucial for correctly designing and reasoning about patterns.

## Denotational Semantics

The meaning of a regular expression R is defined as a language L(R) ⊆ Σ*. This is the **denotational semantics**—the expression denotes a set.

### Base Cases

| Expression | L(Expression) |
|------------|---------------|
| ε | {ε} |
| ∅ | {} |
| a (for a ∈ Σ) | {a} |

### Recursive Cases

For regular expressions R and S:

| Expression | L(Expression) |
|------------|---------------|
| R \| S | L(R) ∪ L(S) |
| RS | {xy \| x ∈ L(R), y ∈ L(S)} |
| R* | ⋃_{i≥0} L(R)^i |

Where L(R)^0 = {ε} and L(R)^(i+1) = L(R) · L(R)^i.

## Properties of Operations

### Union Properties
- **Commutative**: R | S ≡ S | R
- **Associative**: (R | S) | T ≡ R | (S | T)
- **Identity**: R | ∅ ≡ R
- **Idempotent**: R | R ≡ R

### Concatenation Properties
- **Associative**: (RS)T ≡ R(ST)
- **Identity**: εR ≡ Rε ≡ R
- **Annihilator**: ∅R ≡ R∅ ≡ ∅

### Kleene Star Properties
- ε* ≡ ε
- ∅* ≡ ε
- (R*)* ≡ R*
- R* ≡ ε | RR*
- R* ≡ ε | R*R

### Mixed Properties
- **Distributive** (left): R(S | T) ≡ RS | RT
- **Distributive** (right): (R | S)T ≡ RT | ST
- R*R* ≡ R*
- (R | ε)* ≡ R*

## String Matching

A string w **matches** regular expression R if w ∈ L(R).

To determine if w matches R:
1. Check if w can be decomposed according to R's structure
2. Each part must match the corresponding subexpression

## Structural Induction

Many properties of regular expressions are proved by **structural induction**:

**Base cases**: Prove for ε, ∅, and each symbol a.

**Inductive cases**: Assuming property holds for R and S, prove for:
- R | S
- RS
- R*

## Example: Proving R ∪ ∅ ≡ R

For any string w:
- w ∈ L(R | ∅) iff w ∈ L(R) ∪ L(∅)
- = w ∈ L(R) ∪ {}
- = w ∈ L(R)

Therefore L(R | ∅) = L(R), so R | ∅ ≡ R.

## Ambiguity in Matching

A string may match an expression in multiple ways:

Example: "ab" matches (a|ab)(b|ε) in two ways:
1. "a" matches (a|ab), "b" matches (b|ε)
2. "ab" matches (a|ab), "ε" matches (b|ε)

This ambiguity doesn't affect whether a string is accepted, but matters for pattern extraction.

## Operational Semantics

An alternative view: define how to **execute** a regex match.

The derivative of R with respect to symbol a (written ∂_a R) gives the regex for suffixes after reading a:

- ∂_a(ε) = ∅
- ∂_a(b) = ε if a = b, else ∅
- ∂_a(R | S) = ∂_a R | ∂_a S
- ∂_a(RS) = (∂_a R)S | ν(R)(∂_a S)
- ∂_a(R*) = (∂_a R)R*

Where ν(R) = ε if ε ∈ L(R), else ∅.

## Matching Algorithm via Derivatives

```
matches(w, R):
    if w is empty:
        return ε ∈ L(R)  # nullable(R)
    else:
        return matches(w[1:], derivative(w[0], R))
```

This provides a direct implementation from semantics.

## Semantic Equivalence

Two expressions are equivalent if their semantics agree. Key equivalences:

- (R | S)* ≡ (R*S*)*
- R*(SR*)* ≡ (R | S)*
- (RS)*R ≡ R(SR)*

## Detailed Examples

### Example 1: Computing L(R) Step by Step

For R = $(a \mid b)^*ab$, compute L(R):

**Step 1**: Identify subexpressions:
- $L(a) = \{a\}$
- $L(b) = \{b\}$

**Step 2**: Compute union:
- $L(a \mid b) = L(a) \cup L(b) = \{a, b\}$

**Step 3**: Apply Kleene star:
- $L((a \mid b)^*) = \{\varepsilon, a, b, aa, ab, ba, bb, aaa, ...\}$ (all strings over {a,b})

**Step 4**: Concatenate with $ab$:
- $L((a \mid b)^*ab) = \{w \cdot ab \mid w \in \{a,b\}^*\}$
- = {ab, aab, bab, aaab, abab, baab, bbab, ...}
- = {strings ending in ab}

### Example 2: Proving Equivalence Using Semantics

**Claim**: $(a^*b^*)^* \equiv (a \mid b)^*$

**Proof**:
- $L(a^*) = \{\varepsilon, a, aa, aaa, ...\}$
- $L(b^*) = \{\varepsilon, b, bb, bbb, ...\}$
- $L(a^*b^*) = \{a^i b^j \mid i, j \geq 0\}$ (any number of a's followed by b's)
- $L((a^*b^*)^*) = $ finite concatenations of strings from $a^*b^*$

Consider string "baba":
- In $(a \mid b)^*$: clearly matched (any mix of a's and b's)
- In $(a^*b^*)^*$: matched as $b \cdot a \cdot b \cdot a$ where each is from $a^*b^*$

Both describe exactly the set of all strings over {a,b}, so they're equivalent.

### Example 3: Non-Equivalent Expressions

**Claim**: $(ab)^* \not\equiv a^*b^*$

**Counterexample**:
- String "aabb" ∈ $L(a^*b^*)$ (two a's, then two b's)
- String "aabb" ∉ $L((ab)^*)$ (cannot be formed by repeating "ab")
- Therefore, the languages differ

## Nullable Function

A crucial concept in semantics is whether ε ∈ L(R):

**Definition**: $\nu(R) = \begin{cases} \varepsilon & \text{if } \varepsilon \in L(R) \\ \emptyset & \text{otherwise} \end{cases}$

Computing nullable:
- $\nu(\varepsilon) = \varepsilon$
- $\nu(\emptyset) = \emptyset$
- $\nu(a) = \emptyset$ for any symbol $a$
- $\nu(R \mid S) = \nu(R) \mid \nu(S)$
- $\nu(RS) = \nu(R) \cdot \nu(S)$
- $\nu(R^*) = \varepsilon$

**Example**: Is ε ∈ $L((a \mid \varepsilon)^*b^*c)$?
- $(a \mid \varepsilon)^*$ is nullable (contains ε)
- $b^*$ is nullable
- $c$ is not nullable
- Concatenation: not nullable (since c is required)

## Derivatives and Operational Semantics

The **derivative** $\partial_a R$ gives the regex for strings that match after reading symbol $a$.

**Detailed Example**: Compute $\partial_a((ab)^*)$

**Step 1**: Apply star rule:
- $\partial_a((ab)^*) = \partial_a(ab) \cdot (ab)^*$

**Step 2**: Apply concatenation rule:
- $\partial_a(ab) = (\partial_a a) \cdot b \mid \nu(a) \cdot \partial_a(b)$
- $= \varepsilon \cdot b \mid \emptyset \cdot \partial_a(b)$
- $= b \mid \emptyset = b$

**Step 3**: Combine:
- $\partial_a((ab)^*) = b(ab)^*$

This makes intuitive sense: after reading 'a' from $(ab)^*$, we must read 'b', then repeat.

## Practical Implications

### Matching Algorithm Efficiency

The derivative-based approach enables:
1. **Lazy evaluation**: compute derivatives only as needed
2. **Memoization**: cache computed derivatives
3. **Direct implementation**: no intermediate NFA

### Disambiguation Strategies

When multiple matches exist, implementations use:
- **Leftmost-longest**: prefer longer matches, ties broken by leftmost
- **POSIX**: specified by POSIX regex standard
- **Greedy**: match as much as possible (default in most languages)
- **Lazy**: match as little as possible (using *?, +?, etc.)

**Example**: String "aab" matching $(a \mid aa)(b \mid ab)$
- Greedy: matches as "a" + "ab"
- Alternative: matches as "aa" + "b"

Both are valid, but disambiguation chooses one.

## Structural Properties

### Compositionality

Semantics is **compositional**: $L(R)$ depends only on $L$ of subexpressions:
- $L(R \mid S) = L(R) \cup L(S)$
- $L(RS) = L(R) \cdot L(S)$
- $L(R^*) = L(R)^*$

This enables:
- **Modular reasoning**: understand parts independently
- **Bottom-up construction**: build complex patterns from simple ones
- **Substitution**: replace subexpressions with equivalents

### Fixed Points

Kleene star satisfies the fixed-point equation:
$$R^* = \varepsilon \mid R \cdot R^*$$

This is the **least fixed point**: smallest language satisfying the equation.

**Proof**:
- $L(R^*) = \{\varepsilon\} \cup L(R) \cdot L(R^*)$ (by unrolling)
- Substituting repeatedly: $L(R^*) = \bigcup_{i=0}^{\infty} L(R)^i$

## Key Takeaways

- The **denotational semantics** of a regex R is the language L(R) ⊆ Σ* that it denotes
- **Base cases** map primitive expressions (ε, ∅, symbols) to simple languages, while **recursive cases** use set operations (union, concatenation, star)
- Regular expression operations have **algebraic properties** (commutativity, associativity, idempotence, etc.) that enable manipulation and simplification
- **Structural induction** is the standard proof technique for establishing properties about all regular expressions
- A string may **match ambiguously** (multiple derivations), but this doesn't affect membership—only extraction matters
- The **nullable function** ν(R) determines whether ε ∈ L(R), crucial for many algorithms
- **Brzozowski derivatives** provide an **operational semantics**: ∂_a R gives the regex for suffixes after reading 'a'
- Derivatives enable **direct matching algorithms** without constructing explicit automata
- Practical implementations must handle **disambiguation** (greedy vs. lazy, leftmost-longest, POSIX rules)
- Semantics is **compositional**: the meaning of complex expressions depends only on the meaning of their parts
