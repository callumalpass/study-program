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
