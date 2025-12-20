# Normal Forms

**Normal forms** are restricted grammar formats that simplify analysis and parsing while preserving expressive power. Every CFG can be converted to normal form.

## Chomsky Normal Form (CNF)

A grammar is in **Chomsky Normal Form** if every production has one of these forms:
- A → BC (two variables)
- A → a (single terminal)
- S → ε (only for start symbol, if ε ∈ L)

## Converting to CNF

### Step 1: Eliminate ε-productions
Remove A → ε rules (except S → ε if needed):
- Find nullable variables: those deriving ε
- For each rule B → αAβ with nullable A, add B → αβ
- Remove all A → ε except S → ε

### Step 2: Eliminate unit productions
Remove A → B rules:
- Find all pairs (A, B) where A ⇒* B using only unit productions
- For each A ⇒* B and B → α (non-unit), add A → α
- Remove all unit productions

### Step 3: Convert long productions
For A → X₁X₂...Xₖ with k > 2:
- Replace with A → X₁A₁, A₁ → X₂A₂, ..., Aₖ₋₂ → Xₖ₋₁Xₖ

### Step 4: Replace terminals
For A → X₁X₂ where some Xᵢ is terminal a:
- Add new rule Cₐ → a
- Replace terminal a with Cₐ

## CNF Example

Original:
- S → AB | aB
- A → aab
- B → Ac

After conversion:
- S → AB | CB
- A → Ca Ca Cb (becomes A → CaD, D → CaCb)
- B → AC'  where C' represents c
- Ca → a, Cb → b, Cc → c

## Greibach Normal Form (GNF)

A grammar is in **Greibach Normal Form** if every production has form:
- A → aα where a is terminal and α ∈ V*

Every production starts with exactly one terminal.

## Converting to GNF

1. First convert to CNF
2. Order variables A₁, A₂, ..., Aₙ
3. Transform so Aᵢ → Aⱼα only when j > i
4. Eliminate left recursion
5. Back-substitute to get GNF

## Left Recursion Elimination

**Direct left recursion**: A → Aα | β

Replace with:
- A → βA'
- A' → αA' | ε

**Indirect left recursion**: A ⇒⁺ Aα

Requires ordering variables and systematic elimination.

## Why Normal Forms?

### CNF Benefits
- Simplified parsing algorithms (CYK)
- Proof techniques (induction on tree height)
- Exactly 2n-1 steps to derive string of length n

### GNF Benefits
- One terminal per step
- Exactly n steps for length n
- Natural for top-down parsing

## Size Blowup

Converting to CNF can increase grammar size:
- Original: O(|G|)
- After CNF: O(|G|²) worst case

GNF can be worse: O(|G|⁴)

## Preservation of Language

**Theorem**: For any CFG G, there exists:
- CNF grammar G' with L(G') = L(G) - {ε}, or L(G') = L(G) if S → ε allowed
- GNF grammar G'' with L(G'') = L(G) - {ε}

## Applications

| Form | Application |
|------|-------------|
| CNF | CYK parsing algorithm |
| CNF | Pumping lemma proofs |
| GNF | Top-down parsing |
| GNF | Language theory proofs |

## Complete CNF Conversion Example

Let's work through a detailed example of converting a grammar to Chomsky Normal Form.

**Original Grammar**:
```
S → ASA | aB
A → B | S
B → b | ε
```

### Step 1: Eliminate ε-productions

Find nullable variables: B is nullable (B → ε), so A is nullable (A → B), so S is nullable (S → ASA with both A's nullable).

For each production with nullable variables, add versions without them:
- S → ASA becomes: S → ASA | SA | AS | S
- S → aB becomes: S → aB | a
- A → B becomes: A → B | ε (but we'll remove A → ε)
- A → S remains: A → S

After removing ε-productions:
```
S → ASA | SA | AS | S | aB | a
A → B | S
B → b
```

### Step 2: Eliminate unit productions

Find unit pairs:
- S ⇒* S (trivial, remove)
- A ⇒* B, A ⇒* S
- S ⇒* A, S ⇒* B, S ⇒* S

For A ⇒* B and B → b, add A → b
For A ⇒* S and S → ASA | SA | AS | aB | a, add these to A
For S ⇒* A and A rules, add those to S
For S ⇒* B and B → b, add S → b

After eliminating unit productions:
```
S → ASA | SA | AS | aB | a | b
A → b | ASA | SA | AS | aB | a
B → b
```

### Step 3: Convert long productions (length > 2)

For S → ASA (length 3):
- Replace with S → AX₁ and X₁ → SA

For S → aB (terminal + variable):
- First handle terminal: S → C_aB where C_a → a
- Then it's already length 2

After this step:
```
S → AX₁ | SA | AS | C_aB | a | b
X₁ → SA
A → b | AX₁ | SA | AS | C_aB | a
B → b
C_a → a
```

### Step 4: Replace terminals in length-2 productions

All terminals in productions with variables need replacement:
- SA, AS are already variable-only
- C_aB is already handled

**Final CNF Grammar**:
```
S → AX₁ | SA | AS | C_aB | a | b
X₁ → SA
A → AX₁ | SA | AS | C_aB | a | b
B → b
C_a → a
```

This grammar is now in Chomsky Normal Form with all productions of form A → BC or A → a.

## GNF Conversion Example

Converting to Greibach Normal Form is more complex. Here's a simplified example.

**Starting CNF Grammar**:
```
A₁ → A₂A₃ | a
A₂ → A₁A₃ | b
A₃ → A₁A₂ | c
```

### Step 1: Eliminate left recursion for A₂

A₂ → A₁A₃ | b expands to:
- A₁ = A₂A₃ gives A₂ → A₂A₃A₃ | aA₃ | b
- This has left recursion A₂ → A₂A₃A₃

Apply left recursion elimination:
- A₂ → aA₃ | b | aA₃A₂' | bA₂'
- A₂' → A₃A₃A₂' | A₃A₃

### Step 2: Substitute to get terminal-first

Continue this process systematically, ensuring each production starts with a terminal.

**Final result** (simplified):
```
A₁ → aα | bβ | cγ
A₂ → aα' | bβ' | cγ'
A₃ → aα'' | bβ'' | cγ''
```

Where α, β, γ represent variable strings.

## Normal Forms Comparison

| Feature | Original CFG | CNF | GNF |
|---------|-------------|-----|-----|
| Production forms | Any | A → BC or A → a | A → aα |
| Terminal placement | Anywhere | Alone or absent | Always first |
| Max length | Unbounded | 2 | Unbounded |
| Derivation length | Variable | Exactly 2n-1 for length n | Exactly n for length n |
| Parsing efficiency | Variable | O(n³) with CYK | O(n) for LL(1) |

## CYK Parsing with CNF

The CYK (Cocke-Younger-Kasami) algorithm leverages CNF structure for efficient parsing.

**Algorithm**:
1. Create table T[i,j] for all substrings
2. Base case: T[i,1] contains variables that derive w[i]
3. Recursive case: T[i,j] contains variables A where A → BC, B ∈ T[i,k], C ∈ T[i+k,j-k]
4. Accept if S ∈ T[1,n]

**Time Complexity**: O(n³|G|)

**Example**: For string "aab" with CNF grammar
```
S → AB | BC
A → BA | a
B → CC | b
C → AB | a
```

Build table bottom-up:
- T[1,1] = {A, C} (derive "a")
- T[2,1] = {A, C} (derive "a")
- T[3,1] = {B} (derive "b")
- T[1,2] = {S, C} (combinations of T[1,1] and T[2,1])
- ...continue until T[1,3]

## Practical Considerations

### When to Use Normal Forms

**Use CNF when**:
- Implementing CYK parser
- Proving theoretical properties
- Analyzing grammar structure

**Use GNF when**:
- Building LL parsers
- Analyzing left-to-right parsing
- Converting to pushdown automata

**Use neither when**:
- Grammar is already suitable for parser generator
- Readability is priority
- Manual grammar maintenance needed

### Size Explosion Problem

Normal form conversions can dramatically increase grammar size:

**Original**: 5 productions
**After CNF**: 20+ productions (4x increase common)
**After GNF**: 50+ productions (10x increase possible)

This affects:
- Parser generator performance
- Grammar maintainability
- Error message quality
- Parse tree complexity

## Relationship to Pushdown Automata

**Theorem**: Every CNF grammar can be converted to a PDA in O(|G|) time.

**Construction**:
1. For A → BC, push C then B when seeing A
2. For A → a, pop A when reading a
3. Accept if stack empties

**Theorem**: Every GNF grammar can be converted to a PDA that makes exactly n moves for strings of length n.

This tight correspondence makes GNF useful for PDA analysis.

## Advanced: Other Normal Forms

### Operator Normal Form
Used for expression grammars with operator precedence built-in.

### Extended BNF (EBNF)
Not a theoretical normal form, but practical:
- Allows repetition: A → B*
- Allows optional: A → B?
- Allows grouping: A → (B | C)D

### Kuroda Normal Form
For context-sensitive grammars:
- A → BC
- AB → CD
- A → a

## Historical Context

- **Chomsky Normal Form**: Introduced by Noam Chomsky in 1959
- **Greibach Normal Form**: Developed by Sheila Greibach in 1965
- **CYK Algorithm**: Independently discovered by Cocke (1960), Younger (1967), and Kasami (1965)

These forms revolutionized parsing theory and remain fundamental to formal language theory.

## Key Takeaways

- Chomsky Normal Form restricts productions to A → BC or A → a, enabling efficient parsing
- Converting to CNF involves eliminating ε-productions, unit productions, and normalizing production lengths
- Greibach Normal Form requires every production to start with a terminal followed by variables
- CNF enables the O(n³) CYK parsing algorithm for arbitrary context-free grammars
- Normal form conversions can significantly increase grammar size (4-10x growth common)
- CNF derivations have exactly 2n-1 steps for strings of length n; GNF derivations have exactly n steps
- Normal forms are theoretical tools—practical parsers often use extended or optimized grammar forms
- The choice of normal form depends on the application: CNF for CYK, GNF for top-down parsing
- Every CFG can be converted to both CNF and GNF while preserving the language (except possibly ε)
- Understanding normal forms is essential for grammar analysis, parsing algorithm design, and theoretical proofs
