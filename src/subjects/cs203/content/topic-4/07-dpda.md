# Deterministic PDAs

A **Deterministic PDA (DPDA)** has at most one choice at each step. DPDAs are less powerful than NPDAs but important for efficient parsing.

## Definition

A PDA M = (Q, Σ, Γ, δ, q₀, Z₀, F) is **deterministic** if for all q ∈ Q, a ∈ Σ, X ∈ Γ:

1. |δ(q, a, X)| + |δ(q, ε, X)| ≤ 1

This means:
- At most one transition on each (q, a, X)
- If δ(q, ε, X) is non-empty, then δ(q, a, X) is empty for all a

## No ε-Conflict

Key restriction: Cannot choose between reading input and not reading input.

If ε-transition exists from (q, X), no other transition from (q, X).

## DPDA vs NPDA

| Aspect | DPDA | NPDA |
|--------|------|------|
| Computation | Single path | Multiple paths |
| Efficiency | Linear time | Polynomial (CYK) |
| Power | Less | More |
| Parsing | LL, LR languages | All CFLs |

## Languages Not Recognized by DPDAs

**Example**: L = {wwᴿ | w ∈ {a,b}*}

Requires guessing the middle—no deterministic way to know when first half ends.

**Example**: L = {aⁿbⁿ} ∪ {aⁿb²ⁿ}

After reading a's, cannot deterministically choose which pattern to match.

## Deterministic CFLs

A language L is a **Deterministic CFL (DCFL)** if some DPDA accepts L.

Properties:
- DCFLs ⊊ CFLs (proper subset)
- DCFLs closed under complement
- DCFLs not closed under union, intersection

## Important DCFLs

Most programming language syntax is deterministic:
- Arithmetic expressions (with unambiguous grammar)
- Balanced parentheses
- aⁿbⁿ (but not wwᴿ)

## Acceptance Mode Matters

For DPDAs:
- Final state acceptance: More languages
- Empty stack acceptance: Fewer languages

**Theorem**: L has DPDA by empty stack iff L$ has DPDA by final state.

Adding end-marker $ makes them equivalent.

## LR Grammars

An unambiguous CFG is **LR** if it can be parsed by a DPDA (bottom-up, left-to-right, rightmost derivation).

Properties:
- LR ⊂ unambiguous CFGs
- Every LR grammar has equivalent DPDA
- Basis for LR parsing (yacc, bison)

## LL Grammars

A CFG is **LL** if it can be parsed by a predictive parser (top-down, left-to-right, leftmost derivation).

Properties:
- LL ⊂ LR ⊂ DCFL
- Simpler to implement
- Recursive descent parsing

## DPDA Closure Properties

DCFLs are:
- Closed under complement
- Closed under intersection with regular languages
- Not closed under union
- Not closed under intersection
- Not closed under concatenation
- Not closed under Kleene star

## Parsing Complexity

| Grammar Class | Parser | Time |
|---------------|--------|------|
| LR | DPDA | O(n) |
| General CFG | Earley | O(n³) |
| Ambiguous | GLR | O(n³) |

## Prefix Property

DPDA accepting by empty stack can only accept prefix-free languages (no string is prefix of another in L).

This is because accepting computation leaves no choice for continuation.

## Practical Importance

DPDAs underlie:
- Compiler front-ends
- Programming language parsers
- Configuration file parsers
- Protocol validators

Linear-time parsing makes them practical for real use.

## Complete DPDA Example

Let's design a DPDA for $L = \{a^n b^n \mid n \geq 1\}$ accepting by final state:

**DPDA specification:**
- States: $Q = \{q_0, q_1, q_2\}$
- Alphabet: $\Sigma = \{a, b\}$
- Stack: $\Gamma = \{Z_0, A\}$
- Start state: $q_0$
- Accept state: $F = \{q_2\}$

**Deterministic transitions:**
- $\delta(q_0, a, Z_0) = \{(q_0, AZ_0)\}$ — push first $a$
- $\delta(q_0, a, A) = \{(q_0, AA)\}$ — push more $a$'s
- $\delta(q_0, b, A) = \{(q_1, \varepsilon)\}$ — switch to popping mode
- $\delta(q_1, b, A) = \{(q_1, \varepsilon)\}$ — pop for each $b$
- $\delta(q_1, \varepsilon, Z_0) = \{(q_2, Z_0)\}$ — accept when matched

**Determinism verification:**

For each $(q, a, X)$, at most one transition exists:
- From $(q_0, a, Z_0)$: only one choice — push $A$
- From $(q_0, a, A)$: only one choice — push $A$
- From $(q_0, b, A)$: only one choice — switch to $q_1$
- From $(q_1, b, A)$: only one choice — pop
- From $(q_1, \varepsilon, Z_0)$: only one choice — accept
- No $\varepsilon$-transition conflicts with input transitions

**Computation on "aabb":**

| Step | State | Input | Stack | Action |
|------|-------|-------|-------|--------|
| 0 | $q_0$ | aabb | $Z_0$ | Initial |
| 1 | $q_0$ | abb | $AZ_0$ | Push $A$ |
| 2 | $q_0$ | bb | $AAZ_0$ | Push $A$ |
| 3 | $q_1$ | b | $AZ_0$ | Pop $A$, switch mode |
| 4 | $q_1$ | ε | $Z_0$ | Pop $A$ |
| 5 | $q_2$ | ε | $Z_0$ | Accept |

At each step, exactly one transition applies—fully deterministic.

## Why Some CFLs Require Nondeterminism

**Palindromes without markers:** $L = \{ww^R \mid w \in \{a,b\}^*\}$

**Problem:** No way to deterministically identify the middle
- Must guess where first half ends
- No lookahead can determine this
- Requires nondeterministic choice

**Proof that DPDA cannot accept:** Uses pumping-like arguments showing any DPDA either:
1. Guesses middle too early (rejects valid strings)
2. Guesses middle too late (accepts invalid strings)
3. Never guesses middle (rejects everything)

This language is CFL but not DCFL.

## DCFL Closure Properties Explained

**Closed under complement:**

Given DPDA $M$ for $L$, construct DPDA $M'$ for $\overline{L}$:
1. Make $M$ total (add transitions for all cases)
2. Swap accepting and non-accepting states
3. Handle blocked configurations as rejecting

This works because determinism means every string has exactly one computation path.

**Not closed under union:**

**Example:** $L_1 = \{a^n b^n c^m \mid n,m \geq 0\}$ and $L_2 = \{a^n b^m c^m \mid n,m \geq 0\}$

Both $L_1$ and $L_2$ are DCFLs, but $L_1 \cup L_2$ is not a DCFL (can be proven using closure properties and decidability results).

## Acceptance Mode Comparison for DPDAs

**Empty stack acceptance limitations:**

Consider $L = \{a^n b^n \mid n \geq 0\}$:

**By final state (DPDA):**
- Easy to accept $\varepsilon$ (start in accepting state)
- Can maintain bottom marker
- Deterministically transition to accept state

**By empty stack (DPDA):**
- Problem with $\varepsilon$: stack starts non-empty
- Must deterministically detect "done"
- Prefix property restriction applies

**Theorem:** DPDA with final state acceptance is strictly more powerful than DPDA with empty stack acceptance.

However, adding end-marker $ makes them equivalent:
- $L$ accepted by DPDA (empty stack) iff $L$$ accepted by DPDA (final state)

## LR Parsing and DPDAs

**LR(k) grammars** are exactly those parseable by DPDAs:

**LR(1) parsing:**
- Deterministic bottom-up (shift-reduce) parsing
- Single symbol lookahead
- Table-driven PDA implementation

**Example LR(1) grammar:**
```
E → E + T | T
T → T * F | F
F → (E) | id
```

After eliminating left recursion and constructing LR parse table:
- Each table entry has at most one action
- Shift or reduce determined by current state + lookahead
- Implements DPDA

**Parser generator tools:**
- YACC/Bison: generate LR(1) DPDA tables
- ANTLR: generates LL(k) DPDA
- Both achieve $O(n)$ parsing

## LL Parsing and DPDAs

**LL(k) grammars** also correspond to DPDAs:

**LL(1) parsing:**
- Predictive top-down parsing
- Single symbol lookahead
- Recursive descent implementation

**Example LL(1) grammar:**
```
S → A B
A → a A | ε
B → b B | ε
```

**Corresponding DPDA:**
- Look at next input symbol
- Deterministically choose which production to apply
- No backtracking needed

**LL hierarchy:** LL(0) ⊂ LL(1) ⊂ LL(k) ⊂ LR(0) ⊂ LR(1) ⊂ DCFL ⊂ CFL

## Practical DPDA Design Guidelines

**When designing DPDAs:**

1. **Ensure determinism:**
   - No overlapping transitions for same $(q, a, X)$
   - No $\varepsilon$-transition when input transition exists
   - Every configuration has at most one applicable transition

2. **Use lookahead effectively:**
   - Make decisions based on next input symbol
   - Design states to encode decision context

3. **Handle end-of-input:**
   - Use final state acceptance (more flexible)
   - Or add explicit end marker $

4. **Avoid ambiguity:**
   - Grammar must be unambiguous
   - Structure must be deterministically recognizable

## Complexity Classes and DPDAs

**DCFL** (Deterministic Context-Free Languages) occupy an interesting position:

- **Strictly contains** regular languages
- **Strictly contained in** context-free languages
- **Closed under** complement (unlike CFLs)
- **Not closed under** union, intersection, Kleene star

This makes DCFLs an important intermediate class between regular and context-free languages.

## Decidability Results for DPDAs

Several problems are decidable for DPDAs but not for general PDAs:

**Decidable for DPDAs:**
- Emptiness: Is $L(M) = \emptyset$?
- Membership: Is $w \in L(M)$? ($O(n)$ time)
- Equivalence with another DPDA
- Regularity: Is $L(M)$ regular?

**Practical impact:**
- Can verify parser correctness
- Can optimize parser implementation
- Can detect ambiguities

## Converting NPDAs to DPDAs

**Not always possible!** Many CFLs have no DPDA.

**When possible:**
- Eliminate nondeterminism through construction
- Similar to NFA to DFA (subset construction)
- May increase states exponentially
- Only works for DCFLs

**How to tell if language is DCFL:**
- Try to design DPDA directly
- Use closure properties
- Check for known non-DCFL patterns

## Real Compilers and DPDAs

Modern compilers use DPDA-based parsing:

**Compilation pipeline:**
1. **Lexical analysis:** Regular expressions (DFA)
2. **Syntax analysis:** CFG (DPDA via LR or LL)
3. **Semantic analysis:** Attributed grammars
4. **Code generation:** Template-based

**Why DPDAs matter:**
- $O(n)$ parsing time (essential for large programs)
- Deterministic error messages
- Efficient implementation
- Predictable performance

## Key Takeaways

- DPDAs have at most one applicable transition per configuration
- Essential restriction: no $\varepsilon$-transition when input transition exists
- DPDAs accept DCFLs, a proper subset of CFLs
- Linear-time parsing makes DPDAs practical for real applications
- Final state acceptance more powerful than empty stack for DPDAs
- DCFLs closed under complement but not union
- LR and LL parsing both implement DPDAs
- Not all CFLs can be accepted by DPDAs (e.g., even-length palindromes)
- Modern compilers rely heavily on DPDA-based parsing
- Parser generators like YACC produce DPDA implementations
