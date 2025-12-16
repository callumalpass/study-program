# LL(1) Parsing

LL(1) parsing represents a systematic, table-driven approach to top-down syntax analysis. The name LL(1) indicates that the parser reads input from Left to right, produces a Leftmost derivation, and uses 1 token of lookahead to make parsing decisions. This technique transforms the parsing problem into a simple table lookup, enabling efficient and predictable parser implementation.

## LL(1) Parsing Overview

An LL(1) parser consists of:
- An input buffer holding the string to be parsed
- A stack holding grammar symbols (both terminals and non-terminals)
- A parsing table M[A, a] that maps (non-terminal, terminal) pairs to productions
- A parsing program that drives the process

The parser operates by comparing the top of the stack with the current input token. If they match (both terminals), it pops the stack and advances input. If the stack top is a non-terminal, it looks up the appropriate production in the parsing table and expands the non-terminal.

## FIRST Sets

The FIRST set of a grammar symbol or string α, denoted FIRST(α), is the set of terminals that can appear as the first symbol of strings derivable from α. If α can derive the empty string, then ε is also in FIRST(α).

### Computing FIRST Sets

The algorithm for computing FIRST sets proceeds as follows:

**For terminal a**: FIRST(a) = {a}

**For non-terminal A**:
1. If A → ε is a production, add ε to FIRST(A)
2. For each production A → X₁X₂...Xₙ:
   - Add all non-ε symbols from FIRST(X₁) to FIRST(A)
   - If ε is in FIRST(X₁), add non-ε symbols from FIRST(X₂)
   - Continue until finding Xᵢ where ε is not in FIRST(Xᵢ), or reaching the end
   - If all X₁...Xₙ can derive ε, add ε to FIRST(A)

**For a string X₁X₂...Xₙ**:
- Apply the same logic as for productions: start with FIRST(X₁) and continue through the string as long as symbols can derive ε

### Example: Computing FIRST Sets

Consider the grammar:

```
E → T E'
E' → + T E' | ε
T → F T'
T' → * F T' | ε
F → ( E ) | id
```

Computing FIRST sets:

```
FIRST(F) = {(, id}
FIRST(T') = {*, ε}
FIRST(T) = FIRST(F) = {(, id}
FIRST(E') = {+, ε}
FIRST(E) = FIRST(T) = {(, id}
```

For compound strings:
```
FIRST(T E') = FIRST(T) = {(, id}
FIRST(+ T E') = {+}
FIRST(* F T') = {*}
```

## FOLLOW Sets

The FOLLOW set of a non-terminal A, denoted FOLLOW(A), is the set of terminals that can appear immediately after A in valid derivations. FOLLOW sets are only defined for non-terminals, never for terminals.

### Computing FOLLOW Sets

The algorithm for computing FOLLOW sets:

1. Add $ (end-of-input marker) to FOLLOW(S), where S is the start symbol
2. For each production A → αBβ:
   - Add all non-ε symbols in FIRST(β) to FOLLOW(B)
   - If ε is in FIRST(β) (or β is empty), add FOLLOW(A) to FOLLOW(B)
3. Repeat step 2 until no changes occur

### Example: Computing FOLLOW Sets

For the same grammar:

```
FOLLOW(E) = {), $}    # End of input or before ')'
FOLLOW(E') = {), $}   # Same as E (E → T E')
FOLLOW(T) = {+, ), $} # FIRST(E') ∪ FOLLOW(E')
FOLLOW(T') = {+, ), $} # Same as T (T → F T')
FOLLOW(F) = {*, +, ), $} # FIRST(T') ∪ FOLLOW(T')
```

The reasoning:
- E is the start symbol, so $ is in FOLLOW(E)
- E → T E' means FOLLOW(E') includes FOLLOW(E)
- E' → + T E' means FOLLOW(T) includes FIRST(E') = {+}
- T → F T' means FOLLOW(F) includes FIRST(T') = {*}

## Constructing LL(1) Parsing Tables

The parsing table M[A, a] determines which production to use when non-terminal A is on the stack and terminal a is the current input. The table is constructed using FIRST and FOLLOW sets:

**For each production A → α**:
1. For each terminal a in FIRST(α), add A → α to M[A, a]
2. If ε is in FIRST(α):
   - For each terminal b in FOLLOW(A), add A → α to M[A, b]
   - If $ is in FOLLOW(A), add A → α to M[A, $]

### Example: Parsing Table

For the expression grammar, the parsing table is:

```
       |  id      |  +      |  *      |  (      |  )      |  $
-------|---------|---------|---------|---------|---------|--------
E      | E→TE'   |         |         | E→TE'   |         |
E'     |         | E'→+TE' |         |         | E'→ε    | E'→ε
T      | T→FT'   |         |         | T→FT'   |         |
T'     |         | T'→ε    | T'→*FT' |         | T'→ε    | T'→ε
F      | F→id    |         |         | F→(E)   |         |
```

Each cell contains at most one entry. Multiple entries in a cell indicate the grammar is not LL(1).

## LL(1) Parsing Algorithm

The parsing algorithm maintains a stack and processes input tokens:

```
Initialize:
    Push $ onto stack
    Push start symbol onto stack
    Let a be the first input token

Loop:
    Let X be the top stack symbol

    If X is a terminal:
        If X matches a:
            Pop X from stack
            Advance to next input token
        Else:
            Error

    Else if X is a non-terminal:
        If M[X, a] contains production X → Y₁Y₂...Yₖ:
            Pop X from stack
            Push Yₖ, Yₖ₋₁, ..., Y₁ onto stack (in that order)
        Else if M[X, a] contains X → ε:
            Pop X from stack
        Else:
            Error

    Else if X is $:
        If a is $:
            Accept
        Else:
            Error
```

### Example: Parsing Trace

Parse `id + id` with the expression grammar:

```
Stack          Input       Action
$E             id+id$      Apply E → T E'
$E'T           id+id$      Apply T → F T'
$E'T'F         id+id$      Apply F → id
$E'T'id        id+id$      Match id
$E'T'          +id$        Apply T' → ε
$E'            +id$        Apply E' → + T E'
$E'T+          +id$        Match +
$E'T           id$         Apply T → F T'
$E'T'F         id$         Apply F → id
$E'T'id        id$         Match id
$E'T'          $           Apply T' → ε
$E'            $           Apply E' → ε
$              $           Accept
```

## LL(1) Grammar Conditions

A grammar is LL(1) if its parsing table has no conflicts (multiple entries in the same cell). This requires:

**Condition 1**: For productions A → α | β, FIRST(α) and FIRST(β) must be disjoint.

**Condition 2**: If A has production A → α where ε is in FIRST(α), then FIRST(α) and FOLLOW(A) must be disjoint.

These conditions ensure the parser can uniquely determine which production to apply based solely on the current lookahead token.

## Non-LL(1) Grammars

Some grammars are not LL(1):

**Left-recursive grammars**: Productions like E → E + T create conflicts. They must be transformed.

**Ambiguous grammars**: Multiple parse trees mean multiple derivations, precluding unique parsing decisions.

**Common prefixes**: Productions A → α β₁ | α β₂ require left factoring.

### Example of Non-LL(1) Grammar

Consider:

```
S → a A | a B
A → b
B → b
```

Both productions for S have FIRST = {a}. The parser cannot decide which to use when seeing 'a'. Left factoring resolves this:

```
S → a S'
S' → A | B
A → b
B → b
```

## Error Recovery in LL(1) Parsers

LL(1) parsers can implement error recovery:

**Panic mode**: When M[A, a] is empty, pop A from the stack or skip input token a until synchronization is achieved.

**Synchronizing tokens**: Designate certain tokens (semicolons, keywords) as synchronization points where parsing can resume.

**Error productions**: Add productions to handle common errors, like missing semicolons.

## Implementation Considerations

LL(1) parsers can be implemented efficiently:

**Table size**: The table size is O(|N| × |T|), where N is non-terminals and T is terminals.

**Parsing time**: Linear in input length: O(n) where n is the number of tokens.

**Space**: Stack depth is bounded by the length of the longest right-hand side times input size in worst case.

**Code generation**: Parser generators can automatically produce LL(1) parsers from grammar specifications.

## Key Takeaways

- LL(1) parsers use one token of lookahead to determine which production to apply
- FIRST sets contain terminals that can begin strings derivable from a grammar symbol
- FOLLOW sets contain terminals that can appear immediately after a non-terminal
- The parsing table maps (non-terminal, lookahead) pairs to productions
- A grammar is LL(1) if its parsing table contains no conflicts
- LL(1) parsing operates in linear time with a stack and parsing table
- Left recursion and common prefixes must be eliminated for LL(1) grammars
- FIRST and FOLLOW sets are computed iteratively until reaching a fixed point
- Empty productions require special handling using FOLLOW sets
- LL(1) parsers support efficient error detection and recovery strategies
