# LR Parsing

LR parsing is the most powerful and general bottom-up parsing technique for deterministic context-free grammars. The term "LR(k)" indicates the parser reads input from Left to right, constructs a Rightmost derivation in reverse, and uses k tokens of lookahead. LR parsers can handle virtually all programming language constructs and detect syntax errors at the earliest possible point in the input stream.

## LR Parsing Framework

An LR parser consists of four components:

1. **Input buffer**: Contains the string to be parsed with an endmarker $
2. **Stack**: Holds a sequence of states (and optionally grammar symbols)
3. **Parsing table**: Contains ACTION and GOTO tables that guide parsing decisions
4. **Parsing driver**: Implements the LR parsing algorithm

The ACTION table determines whether to shift, reduce, accept, or report error based on the current state and input token. The GOTO table determines the next state after a reduction.

### LR Parsing Algorithm

```
Initialize:
    Push state s₀ onto stack
    Let a be the first input token

Loop:
    Let s be the state on top of stack
    Let ACTION[s, a] determine the action:

    If ACTION[s, a] = shift t:
        Push state t onto stack
        Advance to next input token

    If ACTION[s, a] = reduce A → β:
        Pop |β| states from stack
        Let t be the state now on top of stack
        Push GOTO[t, A] onto stack

    If ACTION[s, a] = accept:
        Parsing succeeds

    If ACTION[s, a] = error:
        Error recovery routine
```

The stack actually holds pairs (state, symbol), but the algorithm description often shows only states since symbols can be recovered from states.

## LR(0) Items

An LR(0) item is a production with a dot (•) at some position in the right-hand side. The dot indicates how much of the production has been recognized. For production A → β, the items are:

- A → • β (nothing recognized yet)
- A → α • γ (α recognized, expecting γ)
- A → β • (entire production recognized)

Items represent the parser's state in recognizing productions.

### Example: Items for E → E + T

The items are:
- E → • E + T
- E → E • + T
- E → E + • T
- E → E + T •

These items track the progress in recognizing an addition expression.

## Closure and Goto Operations

Two operations construct the canonical collection of LR(0) items:

### Closure Operation

The closure of a set of items adds all items implied by non-terminals following dots:

```
closure(I):
    J = I
    repeat:
        for each item A → α • B β in J:
            for each production B → γ:
                add B → • γ to J if not already present
    until no new items can be added
    return J
```

If an item has a dot before non-terminal B, the parser expects to recognize B next. Therefore, all productions for B (with dots at the beginning) are added.

### Goto Operation

The goto operation computes the state reached after recognizing a grammar symbol X:

```
goto(I, X):
    J = empty set
    for each item A → α • X β in I:
        add A → α X • β to J
    return closure(J)
```

This operation advances the dot past X in all items where X follows the dot, then computes the closure.

### Example: Constructing States

For the augmented grammar:

```
S' → S
S → ( S ) | ε
```

Starting with I₀ = closure({S' → • S}):

```
I₀: S' → • S
    S → • ( S )
    S → •

goto(I₀, S) = I₁:
    S' → S •

goto(I₀, '(') = I₂:
    S → ( • S )
    S → • ( S )
    S → •
```

Continuing this process generates all states.

## LR(0) Parsing

An LR(0) parser uses the canonical collection of LR(0) items to construct parsing tables. However, LR(0) grammars are quite restrictive: no state can contain both a complete item (A → β •) and an incomplete item expecting a shift.

### LR(0) Conflicts

Two types of conflicts prevent LR(0) parsing:

**Shift-reduce conflict**: A state contains both A → β • and B → α • a γ for some terminal a. The parser cannot decide whether to reduce by A → β or shift a.

**Reduce-reduce conflict**: A state contains both A → α • and B → β •. The parser cannot decide which production to use for reduction.

Most practical grammars have LR(0) conflicts, motivating more powerful variants.

## SLR(1) Parsing

Simple LR (SLR) parsing resolves conflicts by consulting FOLLOW sets. When a state contains a complete item A → β •, the parser only reduces by this production if the current input token is in FOLLOW(A).

### SLR(1) Table Construction

```
For each state I and production A → β:
    If A → β • is in I:
        For each terminal a in FOLLOW(A):
            ACTION[I, a] = reduce A → β

    If A → α • a β is in I and goto(I, a) = J:
        ACTION[I, a] = shift J

    If S' → S • is in I:
        ACTION[I, $] = accept

For each non-terminal A:
    If goto(I, A) = J:
        GOTO[I, A] = J
```

### Example: SLR(1) Tables

For the expression grammar:

```
E' → E
E → E + T | T
T → T * F | F
F → ( E ) | id
```

The states include:

```
I₀: E' → • E
    E → • E + T
    E → • T
    T → • T * F
    T → • F
    F → • ( E )
    F → • id

I₁: E' → E •
    E → E • + T
```

The ACTION table for I₁:
- ACTION[I₁, +] = shift (to state handling '+')
- ACTION[I₁, $] = accept

SLR(1) parsers handle more grammars than LR(0) but still have limitations.

## Canonical LR(1) Parsing

Canonical LR(1) parsing is the most powerful LR variant. It uses LR(1) items, which include a lookahead symbol: [A → α • β, a] where a is the lookahead terminal.

The item [A → α • β, a] means:
- The parser has recognized α
- It expects to recognize β next
- After recognizing the entire production, it will only reduce if the next input is a

### LR(1) Closure and Goto

The closure operation for LR(1) items:

```
closure(I):
    J = I
    repeat:
        for each item [A → α • B β, a] in J:
            for each production B → γ:
                for each terminal b in FIRST(β a):
                    add [B → • γ, b] to J if not present
    until no new items can be added
    return J
```

The lookahead for new items comes from FIRST(β a): symbols that can follow B when recognizing this particular occurrence.

### LR(1) Table Construction

Canonical LR(1) table construction is similar to SLR(1), but uses the lookahead in items:

```
If [A → β •, a] is in I:
    ACTION[I, a] = reduce A → β
```

The reduction only occurs when the lookahead matches exactly, providing more precise conflict resolution than SLR(1).

### Example: LR(1) States

For a grammar with SLR(1) conflicts, LR(1) splitting creates distinct states:

```
State I: [A → α •, a]
         [B → β •, b]
```

Even if productions A → α and B → β are identical, the different lookaheads a and b prevent reduce-reduce conflicts.

The cost is a much larger number of states: LR(1) parsers can have hundreds of states for moderately complex grammars.

## LALR(1) Parsing

Look-Ahead LR (LALR) parsing merges LR(1) states that differ only in lookahead symbols. This dramatically reduces the number of states while retaining most of LR(1)'s power.

### LALR(1) Construction

LALR(1) states are created by:
1. Construct the canonical LR(1) collection
2. Merge states with identical cores (items without lookaheads)
3. Combine the lookahead sets for merged items

### Example: LALR(1) Merging

If the LR(1) collection contains:

```
I₃: [A → α •, a]
I₇: [A → α •, b]
```

These merge into a single LALR state:

```
I₃₇: [A → α •, {a, b}]
```

The merged state handles both lookaheads, reducing the total number of states.

### LALR(1) Properties

LALR(1) parsing offers an attractive tradeoff:

**Efficiency**: Same number of states as SLR(1), much fewer than LR(1)

**Power**: Handles more grammars than SLR(1), nearly as many as LR(1)

**Error detection**: Detects errors as early as canonical LR(1)

The only limitation: LALR(1) can introduce reduce-reduce conflicts absent from LR(1). In practice, these rarely occur in real programming languages.

## Comparison of LR Variants

| Variant  | States   | Power     | Conflicts |
|----------|----------|-----------|-----------|
| LR(0)    | Fewest   | Weakest   | Most      |
| SLR(1)   | Fewest   | Moderate  | Some      |
| LALR(1)  | Moderate | Strong    | Rare      |
| LR(1)    | Most     | Strongest | Fewest    |

Most parser generators (like Yacc) use LALR(1) as the default, providing excellent power-to-efficiency ratio.

## Error Recovery

LR parsers support sophisticated error recovery:

**Panic mode**: Pop states from stack until finding one that can shift an error-recovery token.

**Phrase-level recovery**: Add error productions to the grammar for common mistakes.

**Error states**: Augment the parsing table with error recovery actions.

The early error detection of LR parsers (earliest possible in left-to-right scan) enables precise error reporting.

## Key Takeaways

- LR parsing is the most powerful practical bottom-up parsing technique
- LR parsers use states and tables to guide shift and reduce decisions
- LR(0) items track parsing progress with a dot marking the current position
- Closure adds items for productions of non-terminals following dots
- Goto computes the state reached after recognizing a grammar symbol
- LR(0) parsers are limited by shift-reduce and reduce-reduce conflicts
- SLR(1) uses FOLLOW sets to resolve some conflicts
- Canonical LR(1) uses lookahead symbols in items for maximum power
- LALR(1) merges LR(1) states with identical cores, balancing power and efficiency
- Most parser generators use LALR(1) as the default algorithm
