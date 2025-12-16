# Algebraic Properties

Regular expressions form an algebra with laws that allow manipulation and simplification. Understanding these properties enables proving equivalences and optimizing patterns.

## Fundamental Identities

### Union Laws
- **Commutative**: R | S ≡ S | R
- **Associative**: (R | S) | T ≡ R | (S | T)
- **Idempotent**: R | R ≡ R
- **Identity**: R | ∅ ≡ R
- **Annihilator**: R | Σ* ≡ Σ*

### Concatenation Laws
- **Associative**: (RS)T ≡ R(ST)
- **Identity**: εR ≡ Rε ≡ R
- **Annihilator**: ∅R ≡ R∅ ≡ ∅

### Kleene Star Laws
- **Idempotence**: (R*)* ≡ R*
- **Identity base**: ε* ≡ ε
- **Empty base**: ∅* ≡ ε
- **Unrolling**: R* ≡ ε | RR*
- **Right unrolling**: R* ≡ ε | R*R

## Distributive Laws

Left distribution:
- R(S | T) ≡ RS | RT

Right distribution:
- (R | S)T ≡ RT | ST

**Note**: Star does not distribute over union in general.

## Star Identities

More complex identities involving star:

- R*R* ≡ R*
- R⁺ ≡ RR* ≡ R*R
- R? ≡ ε | R
- (R*)* ≡ R*
- (R | S)* ≡ (R*S*)* ≡ (R* | S*)*
- (RS)*R ≡ R(SR)*

## Absorption Laws

When one pattern includes another:

- If L(R) ⊆ L(S), then R | S ≡ S
- ε | R* ≡ R*
- R | R* ≡ R*
- R | RR* ≡ R*

## Simplification Strategies

### Strategy 1: Factor Common Parts
RS | RT → R(S | T)

### Strategy 2: Apply Star Laws
RR* | ε → R*
R*R* → R*

### Strategy 3: Remove Redundancy
R | R → R
R | ∅ → R

### Strategy 4: Simplify Stars
(R*)* → R*
ε* → ε

## Example Simplifications

**Example 1**: Simplify (a* | b*)*
- (a* | b*)* ≡ (a | b)* (both describe all strings)

**Example 2**: Simplify a*a*
- a*a* ≡ a* (star is idempotent under concatenation)

**Example 3**: Simplify (a | ab)*
- (a | ab)* ≡ a(ε | b))* ≡ (a(b?))*  ≡ a*(ab*)*
- But also ≡ a* (since ab is covered by a followed by a*b*)

## Complete Axiomatization

Salomaa proved a complete axiom system for regex equality. Any true equivalence can be derived from:

1. Union/concatenation axioms above
2. R* = ε | RR* (fixed point)
3. If ε | SR ⊆ R then S*R ⊆ R (induction)

## Proving Equivalences

To prove R ≡ S:
1. Use algebraic laws to transform R to S
2. Or convert both to minimal DFAs and check isomorphism
3. Or use bisimulation/coinduction

## Non-Equivalences

Not everything that looks similar is equivalent:

- (R | S)* ≢ R* | S* in general
- (RS)* ≢ R*S* in general
- R(S | T) ≢ RS | T (T not absorbed)

## Application: Regex Optimization

Compilers can optimize regex by applying algebraic laws:

```
Original: aa* | a
Simplified: a⁺

Original: (a*b*)*
Simplified: (a | b)*

Original: a*ba*ba*
Cannot simplify much (already fairly minimal)
```

## Algebraic Decision Procedures

To decide if R ≡ S:
1. Compute minimal DFAs for R and S
2. Check if DFAs are isomorphic

This is decidable and runs in polynomial time relative to automaton size (though construction may be exponential).
