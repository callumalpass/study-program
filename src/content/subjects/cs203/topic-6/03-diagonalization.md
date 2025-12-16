# Diagonalization

**Diagonalization** is a proof technique showing that certain objects cannot exist. It's the key method for proving undecidability, originating in Cantor's work on infinite sets.

## Cantor's Diagonal Argument

**Theorem**: The real numbers are uncountable.

**Proof**:
1. Assume reals are countable: r₁, r₂, r₃, ...
2. Construct new real d:
   - d's i-th digit differs from rᵢ's i-th digit
3. d ≠ rᵢ for all i (differs in i-th position)
4. Contradiction! d should be in the list.

## The Diagonal Method

General pattern:
1. Assume enumeration exists: x₁, x₂, x₃, ...
2. Construct new object d that differs from each xᵢ
3. d should be in the list but isn't
4. Contradiction proves no such enumeration exists

## Applying to Languages

There are uncountably many languages over Σ = {0,1}:
- Each language is a subset of Σ*
- Correspond to binary sequences (membership of w₁, w₂, ...)
- Uncountably many binary sequences

But there are only countably many TMs:
- Each TM has finite description
- Can enumerate all TM descriptions

**Conclusion**: Most languages are not Turing-recognizable!

## Proving A_TM Undecidable

A_TM = {⟨M, w⟩ | M accepts w}

**Theorem**: A_TM is undecidable.

**Proof by diagonalization**:

1. Assume decider H exists: H(⟨M, w⟩) accepts iff M accepts w

2. Construct TM D:
   - On input ⟨M⟩:
   - Run H(⟨M, ⟨M⟩⟩)
   - Do opposite: accept if H rejects, reject if H accepts

3. Consider D on ⟨D⟩:
   - D(⟨D⟩) accepts ⟺ H(⟨D, ⟨D⟩⟩) rejects ⟺ D rejects ⟨D⟩
   - Contradiction!

4. H cannot exist. A_TM is undecidable.

## Self-Reference

The proof crucially uses self-reference:
- D runs on its own description
- Creates paradox like "this statement is false"

## Halting Problem

HALT_TM = {⟨M, w⟩ | M halts on w}

**Theorem**: HALT_TM is undecidable.

**Proof**: If HALT_TM were decidable, we could decide A_TM:
1. Check if M halts on w
2. If yes, simulate and return result
3. If no, reject

Contradiction to A_TM being undecidable.

## The Diagonal Language

D_diag = {⟨M⟩ | M does not accept ⟨M⟩}

This language is not recognizable (self-reference creates paradox).

Its complement {⟨M⟩ | M accepts ⟨M⟩} is recognizable but not decidable.

## Generality of Diagonalization

Diagonalization proves:
- Most languages are not computable
- Many specific problems are undecidable
- Limits of formal systems (Gödel)

## Computation Table

Visualize as infinite table:
- Row i: TM Mᵢ
- Column j: Input wⱼ
- Entry (i,j): 1 if Mᵢ accepts wⱼ

Diagonal: entries (i,i) = Mᵢ on its own encoding

D_diag accepts ⟨Mᵢ⟩ iff Mᵢ does not accept ⟨Mᵢ⟩ (flip diagonal).

No row matches D_diag: differs in at least position i.
