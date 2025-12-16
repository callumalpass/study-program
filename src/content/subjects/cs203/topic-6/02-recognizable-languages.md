# Turing-Recognizable Languages

A language is **Turing-recognizable** (recursively enumerable, r.e.) if some TM accepts exactly the strings in the language, though it may not halt on strings outside the language.

## Formal Definition

A language L is **Turing-recognizable** if there exists a TM M such that:

L = {w | M accepts w}

Note: M may loop forever on w ∉ L.

## Alternative Names

- Recursively enumerable (r.e.)
- Semi-decidable
- Computably enumerable (c.e.)

## Recognizer vs Decider

| TM Type | On w ∈ L | On w ∉ L |
|---------|----------|----------|
| Recognizer | Accept | Reject or loop |
| Decider | Accept | Reject |

Every decider is a recognizer, but not every recognizer is a decider.

## Why "Recursively Enumerable"?

L is r.e. iff there's an algorithm that enumerates L:
- Prints strings w₁, w₂, w₃, ...
- Every w ∈ L eventually appears
- May print strings multiple times
- May never terminate if L is infinite

## Relationship to Decidable

**Theorem**: L is decidable iff both L and L̄ are recognizable.

**Proof**:
(⇒) If L is decidable, M decides it. M is a recognizer for L. Flip accept/reject for recognizer of L̄.

(⇐) If M₁ recognizes L and M₂ recognizes L̄:
- Run M₁ and M₂ in parallel
- One must eventually accept
- Accept/reject based on which accepts

## Recognizable but Not Decidable

Some languages are recognizable but not decidable:
- Halting problem: {⟨M, w⟩ | M halts on w}
- Universal language: {⟨M, w⟩ | M accepts w}

For these, we can recognize membership but not non-membership.

## Not Recognizable

Some languages are not even recognizable:
- Complement of halting problem
- {⟨M⟩ | M does not accept ⟨M⟩}

## Closure Properties

Recognizable languages are closed under:
- Union (run in parallel, accept if either accepts)
- Intersection (run in parallel, accept if both accept)
- Concatenation
- Kleene star

**Not closed under** complement (key difference from decidable).

## Dovetailing

To recognize union L₁ ∪ L₂:
- Simulate M₁ and M₂ step by step
- Run 1 step of M₁, 1 step of M₂
- Run 2 steps of M₁, 2 steps of M₂
- ...
- Accept if either accepts

This **dovetailing** ensures we don't get stuck on one infinite computation.

## Enumeration View

L is recognizable iff L is the domain of some computable function:

L = {w | f(w) is defined}

## Semi-Decidability Interpretation

"Semi-decidable" = can confirm membership, not non-membership.

Practical example:
- Can verify a proof is valid: accept
- Cannot enumerate all possible proofs to confirm "no proof exists"

## Projection

If R ⊆ Σ* × Σ* is a decidable relation:
- L = {x | ∃y: (x,y) ∈ R} is recognizable

Search for witness y; if found, accept.

## Examples

Recognizable:
- All decidable languages
- {⟨M, w⟩ | M accepts w}
- {⟨M⟩ | L(M) ≠ ∅}

Not recognizable:
- {⟨M⟩ | M does not halt on ε}
- Complement of halting problem
