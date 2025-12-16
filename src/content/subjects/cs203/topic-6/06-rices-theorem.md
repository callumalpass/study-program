# Rice's Theorem

**Rice's Theorem** is a sweeping undecidability result: any non-trivial semantic property of Turing machines is undecidable.

## Properties of TMs

A **property** P of TMs is a set of TMs:
- M ∈ P means M has property P
- P is a property of the language L(M)

## Trivial vs Non-Trivial

A property P is **trivial** if:
- P = ∅ (no TMs have it), or
- P = all TMs (every TM has it)

A property is **non-trivial** if some TMs have it and some don't.

## Semantic vs Syntactic

**Semantic property**: Depends on the language L(M), not the TM's structure.

If L(M₁) = L(M₂), then M₁ ∈ P ⟺ M₂ ∈ P.

**Syntactic property**: Depends on TM structure (states, transitions).

Rice's Theorem applies only to semantic properties.

## The Theorem

**Rice's Theorem**: Every non-trivial semantic property of TMs is undecidable.

Equivalently: For any non-trivial property P of r.e. languages:
{⟨M⟩ | L(M) ∈ P} is undecidable.

## Examples of Undecidable Properties

All undecidable by Rice's Theorem:
- Does L(M) = ∅? (emptiness)
- Does L(M) = Σ*? (universality)
- Is L(M) finite?
- Is L(M) regular?
- Is L(M) context-free?
- Does L(M) contain a specific string w?

## Proof Sketch

**Proof** (assuming ε ∉ L for any M ∈ P):

1. Let M_∅ reject all inputs (L(M_∅) = ∅)
2. Since P is non-trivial, some M_P ∈ P
3. Reduce from A_TM to P:

Given ⟨M, w⟩, construct M':
```
M'(x):
  Run M on w
  If M accepts, run M_P on x and return result
  (If M loops, M' loops)
```

- If M accepts w: L(M') = L(M_P), so M' ∈ P
- If M doesn't accept w: L(M') = ∅, so M' ∉ P

This reduces A_TM to P. Since A_TM is undecidable, P is undecidable.

## What Rice's Theorem Doesn't Cover

**Syntactic properties** may be decidable:
- Does M have exactly 5 states? (Decidable)
- Does M ever move left? (Decidable)
- Does M have a transition on symbol 'a'? (Decidable)

These depend on TM structure, not language.

## Practical Implications

No algorithm can determine:
- If a program prints "Hello"
- If a program uses all its functions
- If a program's output satisfies a specification
- If two programs do the same thing

Any non-trivial behavior question is undecidable.

## Applications

Rice's Theorem implies:
- Perfect virus detection is impossible
- Complete code optimization is impossible
- Full program equivalence checking is impossible
- Automatic specification verification is impossible

## Workarounds

Despite undecidability:
- **Approximation**: Sound but incomplete checking
- **Restrictions**: Decidable subclasses
- **Interactive proofs**: Human-guided verification
- **Testing**: Partial correctness evidence

## Relationship to Halting

Rice's Theorem generalizes halting problem:
- Halting: "Does M halt?" (non-trivial semantic property)
- Rice: Any such property is undecidable

## The Semi-Decidable Cases

Some properties are recognizable even if undecidable:
- Non-emptiness: {⟨M⟩ | L(M) ≠ ∅} is recognizable
- Search for accepting computation

Others are not recognizable:
- Emptiness complement: need to verify no string accepted
