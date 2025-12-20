# CFG to PDA Conversion

Every context-free language is accepted by some PDA. The conversion simulates leftmost derivations on the stack.

## Two Construction Methods

### Top-Down (LL-style)
Predict productions, match terminals.
Stack holds expected symbols.

### Bottom-Up (LR-style)
Shift input, reduce by productions.
Stack holds parsed symbols.

## Top-Down Construction

Given CFG G = (V, Σ, R, S), construct PDA M:

**States**: {q} (single state!)
**Stack alphabet**: Γ = V ∪ Σ ∪ {Z₀}
**Initial stack**: Z₀S (start symbol on top)

**Transitions**:

1. **Variable expansion**: For each A → α in R:
   - δ(q, ε, A) includes (q, α)
   - Nondeterministically choose production

2. **Terminal matching**: For each a ∈ Σ:
   - δ(q, a, a) = {(q, ε)}
   - Match and pop

3. **Accept**: δ(q, ε, Z₀) = {(q_f, ε)}

Accept by reaching q_f (or empty stack).

## Example: Expression Grammar

Grammar:
- E → E + T | T
- T → T * F | F
- F → (E) | id

PDA transitions:
- δ(q, ε, E) = {(q, E+T), (q, T)}
- δ(q, ε, T) = {(q, T*F), (q, F)}
- δ(q, ε, F) = {(q, (E)), (q, id)}
- δ(q, +, +) = {(q, ε)}
- δ(q, *, *) = {(q, ε)}
- etc.

## Tracing Computation

For input "id + id":

```
Stack: Z₀E     Input: id+id
Apply E → E+T
Stack: Z₀E+T   Input: id+id
Apply E → T
Stack: Z₀T+T   Input: id+id
Apply T → F
Stack: Z₀F+T   Input: id+id
Apply F → id
Stack: Z₀id+T  Input: id+id
Match id
Stack: Z₀+T    Input: +id
Match +
Stack: Z₀T     Input: id
Apply T → F
Stack: Z₀F     Input: id
Apply F → id
Stack: Z₀id    Input: id
Match id
Stack: Z₀      Input: ε
Accept!
```

## Extended PDA Construction

For practical parsing, modify:

1. Convert grammar to GNF first
2. Each production A → aα becomes:
   - δ(q, a, A) = {(q, α)}
3. This is deterministic for LL grammars

## Correctness

**Theorem**: L(M) = L(G)

**Proof sketch**:
- Each accepting computation corresponds to leftmost derivation
- Stack tracks remaining sentential form
- Input consumed matches derived terminals

## Alternative: Bottom-Up

Shift-reduce PDA:
- Shift: push input onto stack
- Reduce: match pattern, replace with variable

More complex but basis for LR parsing.

## Size Analysis

Given CFG G with:
- |V| variables
- |R| productions
- Maximum production length m

PDA has:
- O(1) states (just q)
- O(|V| + |Σ|) stack symbols
- O(|R|) transitions

Linear in grammar size!

## Comparison of Directions

| Direction | Complexity | Practical Use |
|-----------|------------|---------------|
| CFG → PDA | Linear | Parsing algorithms |
| PDA → CFG | Exponential | Theoretical |

## Main Theorem

**Theorem**: A language is context-free iff it is accepted by some PDA.

**Proof**:
- CFG → PDA: Top-down construction
- PDA → CFG: Variable [p,A,q] construction

This establishes equivalence of the two models.

## Complete Worked Example

Let's convert a grammar for arithmetic expressions to a PDA.

**Grammar G:**
- $E \to E + T \mid T$
- $T \to T * F \mid F$
- $F \to (E) \mid a$

**Constructed PDA:**
- Single state: $q$
- Stack alphabet: $\Gamma = \{Z_0, E, T, F, +, *, (, ), a\}$
- Start: $(q, w, Z_0E)$ (with $E$ on top)
- Accept: by empty stack or reaching $(q, \varepsilon, Z_0)$

**Transitions for productions:**

For $E \to E + T$:
- $\delta(q, \varepsilon, E) \ni (q, E+T)$ — expand $E$ to $E+T$

For $E \to T$:
- $\delta(q, \varepsilon, E) \ni (q, T)$ — expand $E$ to $T$

For $T \to T * F$:
- $\delta(q, \varepsilon, T) \ni (q, T*F)$

For $T \to F$:
- $\delta(q, \varepsilon, T) \ni (q, F)$

For $F \to (E)$:
- $\delta(q, \varepsilon, F) \ni (q, (E))$

For $F \to a$:
- $\delta(q, \varepsilon, F) \ni (q, a)$

**Transitions for terminals:**
- $\delta(q, +, +) = \{(q, \varepsilon)\}$ — match $+$
- $\delta(q, *, *) = \{(q, \varepsilon)\}$ — match $*$
- $\delta(q, (, () = \{(q, \varepsilon)\}$ — match $($
- $\delta(q, ), )) = \{(q, \varepsilon)\}$ — match $)$
- $\delta(q, a, a) = \{(q, \varepsilon)\}$ — match $a$

**Computation trace for "a+a":**

$$
\begin{align*}
(q, a+a, Z_0E) &\vdash (q, a+a, Z_0E+T) && \text{expand } E \to E+T \\
&\vdash (q, a+a, Z_0T+T) && \text{expand } E \to T \\
&\vdash (q, a+a, Z_0F+T) && \text{expand } T \to F \\
&\vdash (q, a+a, Z_0a+T) && \text{expand } F \to a \\
&\vdash (q, +a, Z_0+T) && \text{match } a \\
&\vdash (q, a, Z_0T) && \text{match } + \\
&\vdash (q, a, Z_0F) && \text{expand } T \to F \\
&\vdash (q, a, Z_0a) && \text{expand } F \to a \\
&\vdash (q, \varepsilon, Z_0) && \text{match } a \\
&\vdash \text{accept!} && \text{stack has only } Z_0
\end{align*}
$$

## Understanding the Stack as a Parse Tree

The stack contents represent the **frontier of the leftmost derivation**:

When stack is $Z_0E+T$, reading $a$:
- Current sentential form: $E + T$
- Leftmost variable: $E$
- Must expand $E$ to derive string starting with $a$

The PDA simulates leftmost derivation by:
1. Expanding leftmost variable (nondeterministically choosing production)
2. Matching terminals with input
3. Repeating until input consumed

## Converting to Greibach Normal Form

For more efficient PDAs, first convert grammar to **Greibach Normal Form (GNF)**:
- Every production: $A \to a\alpha$ where $a$ is terminal, $\alpha$ is variables

**Benefits:**
- Each transition reads exactly one input symbol
- More deterministic behavior possible
- Easier to implement

**Example GNF grammar for $\{a^n b^n\}$:**
- $S \to aSB \mid ab$
- $B \to b$

**Resulting PDA:**
- $\delta(q, a, S) = \{(q, SB)\}$ — read $a$, push $SB$
- $\delta(q, a, S) = \{(q, b)\}$ — read $a$, push $b$ (base case)
- $\delta(q, b, b) = \{(q, \varepsilon)\}$ — read $b$, pop
- $\delta(q, b, B) = \{(q, \varepsilon)\}$ — read $b$, pop

Notice: every transition reads input (no $\varepsilon$-moves on input).

## Bottom-Up Parsing Approach

Alternative construction using **shift-reduce** strategy:

**Idea:**
- Shift input symbols onto stack
- Reduce when right-hand side of production appears
- Accept when stack contains only start symbol

**For grammar $S \to aSb \mid \varepsilon$:**

States: $\{q_{shift}, q_{reduce}\}$

**Shift transitions:**
- $\delta(q_{shift}, a, Z_0) = \{(q_{shift}, aZ_0)\}$
- $\delta(q_{shift}, a, X) = \{(q_{shift}, aX)\}$ for any $X$
- $\delta(q_{shift}, b, X) = \{(q_{shift}, bX)\}$ for any $X$

**Reduce transitions:**
- $\delta(q_{reduce}, \varepsilon, bSa) = \{(q_{reduce}, S)\}$ — reduce by $S \to aSb$
- $\delta(q_{reduce}, \varepsilon, \varepsilon) = \{(q_{reduce}, S)\}$ — reduce by $S \to \varepsilon$

This approach underlies LR parsing, used in industrial parser generators.

## Deterministic Parsing with LL Grammars

For **LL(1) grammars** (predictive parsing), the PDA can be made deterministic:

**Requirements:**
- No left recursion
- No ambiguity
- Distinct FIRST sets for productions of same variable

**Example LL(1) grammar:**
- $S \to aSb \mid c$

**Deterministic PDA:**
- $\delta(q, a, S) = \{(q, aSb)\}$ — only choice for $a$
- $\delta(q, c, S) = \{(q, c)\}$ — only choice for $c$
- $\delta(q, a, a) = \{(q, \varepsilon)\}$
- $\delta(q, b, b) = \{(q, \varepsilon)\}$
- $\delta(q, c, c) = \{(q, \varepsilon)\}$

No nondeterminism needed—grammar structure determines choices.

## Parsing Ambiguous Grammars

**Ambiguous grammars** lead to multiple parse trees for some strings.

**Example:** $E \to E + E \mid E * E \mid a$

PDA construction:
- Multiple productions for $E$
- Nondeterministically choose which to apply
- Multiple accepting computations for same string

Different accepting paths correspond to different parse trees.

**Solution for compilers:**
- Rewrite grammar to be unambiguous
- Use precedence rules in parser
- Prefer deterministic grammars (LL or LR)

## Handling Left Recursion

**Left-recursive grammar:** $E \to E + T$

**Problem:** PDA might infinite-loop on $\varepsilon$-transitions
- Expand $E \to E + T$
- Expand $E \to E + T$ again
- Never makes progress

**Solution:** Eliminate left recursion first
- Transform to: $E \to TE'$, $E' \to +TE' \mid \varepsilon$
- Now PDA makes progress

## Complexity and Efficiency

**Time complexity for general CFG:**
- Nondeterministic PDA: exponential paths
- Practical parsing (CYK, Earley): $O(n^3)$

**Time complexity for deterministic grammar:**
- DPDA: $O(n)$ linear time
- LL(1): $O(n)$ with recursive descent
- LR(1): $O(n)$ with shift-reduce parser

This efficiency makes deterministic PDAs practical for compilers.

## Converting Back: PDA to CFG

The reverse direction (PDA to CFG) is covered in another section, but key points:
- Uses variables $[p, A, q]$
- Exponential grammar size
- Rarely used in practice

The CFG → PDA direction is far more practical and commonly used.

## Real-World Application: Parser Generators

Tools like **YACC** and **Bison** use this construction:

1. User provides CFG (with action code)
2. Tool generates PDA (as parsing tables)
3. PDA processes input, building parse tree
4. Action code executes during parsing

The theoretical CFG-to-PDA conversion is the foundation of modern parsing technology.

## Proof of Correctness

**Theorem:** The constructed PDA accepts string $w$ iff the grammar derives $w$.

**Proof sketch:**

**Forward direction:** $(q, w, Z_0S) \vdash^* (q, \varepsilon, Z_0) \Rightarrow S \Rightarrow^* w$

By induction on computation length:
- Each variable expansion matches a production
- Each terminal match confirms derivation step
- Final configuration means complete derivation

**Reverse direction:** $S \Rightarrow^* w \Rightarrow (q, w, Z_0S) \vdash^* (q, \varepsilon, Z_0)$

By induction on derivation length:
- Each production use becomes variable expansion
- Each terminal in derivation gets matched
- Complete derivation becomes accepting computation

## Extensions and Variations

**Augmented PDAs:**
- Add semantic actions to transitions
- Build abstract syntax tree during parsing
- Perform type checking on the fly

**Optimized constructions:**
- Combine ε-transitions
- Merge states where possible
- Pre-compute parse tables

These optimizations make practical parsers much faster than naive PDA simulation.

## Key Takeaways

- CFG to PDA conversion is straightforward and efficient
- Top-down construction uses single state with stack holding sentential form
- Variables expand nondeterministically; terminals match input
- Stack represents frontier of leftmost derivation
- GNF grammars yield more efficient PDAs
- Bottom-up approach underlies shift-reduce (LR) parsing
- LL(1) grammars enable deterministic predictive parsing
- Construction is linear in grammar size (unlike reverse direction)
- Foundation for parser generators like YACC and Bison
- Together with PDA-to-CFG, proves CFG ≡ PDA equivalence
