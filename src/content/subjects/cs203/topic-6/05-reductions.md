# Reduction Techniques

**Reductions** transfer undecidability from known undecidable problems to new problems. If problem A reduces to problem B, then B is at least as hard as A.

## Intuition

A reduction shows: "If we could solve B, we could solve A."

If A is undecidable and A reduces to B, then B must be undecidable too.

## Mapping Reductions

A **mapping reduction** from A to B (written A ≤_m B) is a computable function f where:

w ∈ A ⟺ f(w) ∈ B

Key properties:
- f is total (defined on all inputs)
- f is computable
- f preserves membership

## Using Mapping Reductions

**Theorem**: If A ≤_m B and B is decidable, then A is decidable.

**Contrapositive**: If A ≤_m B and A is undecidable, then B is undecidable.

## Reduction Template

To prove B undecidable via reduction from A:

1. Know A is undecidable (e.g., A_TM, HALT)
2. Define computable f: inputs of A → inputs of B
3. Prove: w ∈ A ⟺ f(w) ∈ B
4. Conclude B is undecidable

## Example: HALT to E_TM

E_TM = {⟨M⟩ | L(M) = ∅}

**Reduction from HALT**:

Given ⟨M, w⟩, construct M':
```
M'(x):
  Run M on w (ignoring x)
  Accept
```

If M halts on w: M' accepts everything → L(M') ≠ ∅
If M loops on w: M' accepts nothing → L(M') = ∅

f(⟨M, w⟩) = ⟨M'⟩

⟨M, w⟩ ∈ HALT ⟺ ⟨M'⟩ ∉ E_TM

This shows Ē_TM is undecidable, hence E_TM is undecidable.

## Example: A_TM to EQ_TM

EQ_TM = {⟨M₁, M₂⟩ | L(M₁) = L(M₂)}

**Reduction from A_TM**:

Given ⟨M, w⟩, construct:
- M₁: Always reject
- M₂: Run M on w, then accept current input

L(M₁) = ∅ always
L(M₂) = Σ* if M accepts w, else ∅

⟨M, w⟩ ∈ A_TM ⟺ L(M₂) = Σ* ≠ ∅ = L(M₁)
⟨M, w⟩ ∉ A_TM ⟺ L(M₂) = ∅ = L(M₁)

f(⟨M, w⟩) = ⟨M₁, M₂⟩

⟨M, w⟩ ∈ A_TM ⟺ ⟨M₁, M₂⟩ ∉ EQ_TM

EQ_TM is undecidable.

## Turing Reductions

A stronger notion: A ≤_T B if A is decidable given oracle for B.

**Oracle TM**: TM with "black box" that answers membership in B.

A ≤_T B allows multiple queries, adaptive queries.

## Relationship

A ≤_m B implies A ≤_T B (mapping reduction is special case).

Converse is false: A ≤_T B does not imply A ≤_m B.

## Properties of Reductions

Mapping reductions are:
- **Reflexive**: A ≤_m A (identity function)
- **Transitive**: A ≤_m B and B ≤_m C implies A ≤_m C

## m-Completeness

A is **m-complete** for a class if:
- A is in the class
- Every problem in the class reduces to A

A_TM is m-complete for recognizable languages.

## Reduction Strategies

Common approaches:
1. Encode problem instance into TM behavior
2. Use simulation (run M on w as subroutine)
3. Modify input/output of existing TMs

## Limits of Reductions

Reductions only work one direction:
- A ≤_m B and B decidable → A decidable
- A ≤_m B and A undecidable → B undecidable

Cannot conclude A decidable from B undecidable!
