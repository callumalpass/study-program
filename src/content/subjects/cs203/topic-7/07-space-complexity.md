# Space Complexity

**Space complexity** measures memory usage of computation. It provides a different perspective on computational resources, sometimes more relevant than time.

## Definition

For TM M on input w, **space used** is the number of distinct tape cells visited.

The **space complexity** of M is function s: ℕ → ℕ:
s(n) = max{cells M uses on input w : |w| = n}

## Space Complexity Classes

**SPACE(f(n))** = languages decidable using O(f(n)) space.

**NSPACE(f(n))** = languages decidable by NTM using O(f(n)) space.

## Important Classes

### L (Logarithmic Space)
**L** = SPACE(log n)

Very restrictive: can't even write down the input!
Uses separate read-only input tape.

### NL (Nondeterministic Log Space)
**NL** = NSPACE(log n)

### PSPACE
**PSPACE** = ⋃_k SPACE(n^k)

All polynomial-space problems.

### NPSPACE
**NPSPACE** = ⋃_k NSPACE(n^k)

## Savitch's Theorem

**Theorem**: NSPACE(f(n)) ⊆ SPACE(f(n)²) for f(n) ≥ log n

**Corollary**: NPSPACE = PSPACE

Nondeterminism doesn't help much for space!

## Space Hierarchy

**Theorem**: For space-constructible f(n):
SPACE(f(n)) ⊊ SPACE(f(n) · log f(n))

More space means strictly more power.

## Relationships

L ⊆ NL ⊆ P ⊆ NP ⊆ PSPACE ⊆ EXPTIME

Known separations:
- L ⊊ PSPACE (space hierarchy)
- P ⊊ EXPTIME (time hierarchy)

Unknown:
- L vs NL
- P vs NP
- NP vs PSPACE

## PSPACE-Complete Problems

A problem is **PSPACE-complete** if:
1. In PSPACE
2. Every PSPACE problem reduces to it (in polynomial time)

### TQBF (True Quantified Boolean Formulas)
∀x₁∃x₂∀x₃... φ(x₁,...,xₙ)

Is the quantified formula true?

TQBF is PSPACE-complete.

### Game Problems
Many two-player games are PSPACE-complete:
- Generalized chess (arbitrary board size)
- Generalized Go
- Generalized checkers

### Planning Problems
AI planning with polynomial plan length is PSPACE-complete.

## L-Complete Problems

**PATH** (directed s-t connectivity) is NL-complete.
**2-SAT** is NL-complete.

## Time-Space Tradeoffs

**Theorem**: SPACE(f(n)) ⊆ TIME(2^O(f(n)))

Space can be "converted" to time (exponentially).

**Theorem**: TIME(f(n)) ⊆ SPACE(f(n))

Time bounds space linearly.

## Sublinear Space

For space less than n (input length):
- Need read-only input tape
- Working tape has limited space
- Still useful for streaming algorithms

## Immerman-Szelepcsényi Theorem

**Theorem**: NL = coNL

Nondeterministic log space is closed under complement!

Contrasts with NP, where NP = coNP is open.

## Space in Practice

Space often more constraining than time:
- Memory limited
- Cache effects matter
- Streaming data can't store everything

Space-efficient algorithms are valuable.

## Summary: Complexity Landscape

```
EXPTIME
   |
PSPACE = NPSPACE
   |
  NP
   |
   P
   |
  NL = coNL
   |
   L
```

Many containments known; equalities unknown.
