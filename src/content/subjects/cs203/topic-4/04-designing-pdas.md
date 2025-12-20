# Designing PDAs

Designing PDAs requires understanding how the stack can track structural information. Common patterns and techniques help construct correct automata.

## Design Principles

### 1. Stack as Counter
For counting languages like {aⁿbⁿ}:
- Push symbol for each 'a'
- Pop symbol for each 'b'
- Accept when counts match (stack empty)

### 2. Stack as Memory
For palindromes like {wwᴿ}:
- Push first half onto stack
- Pop and match second half
- Nondeterministically guess the middle

### 3. Stack for Nesting
For nested structures like balanced brackets:
- Push opening symbols
- Pop for matching closing symbols
- Stack tracks nesting depth and order

## Template: Matching Languages

For L = {aⁿbⁿ | n ≥ 1}:

```
States: {q_push, q_pop, q_accept}
Stack: {Z₀, A}

q_push: read 'a', push A
q_push → q_pop: read 'b', pop A (start matching)
q_pop: read 'b', pop A
q_pop → q_accept: ε, pop Z₀ (done)
```

## Template: Palindromes

For L = {wwᴿ | w ∈ {a,b}*}:

```
States: {q_push, q_pop}
Stack: {Z₀, A, B}

q_push: read 'a', push A; read 'b', push B
q_push → q_pop: ε (guess middle)
q_pop: read 'a', pop A; read 'b', pop B
q_pop: ε, pop Z₀ → accept
```

Nondeterminism guesses where the middle is.

## Template: Odd Palindromes

For L = {wcwᴿ | w ∈ {a,b}*} (c marks middle):

```
States: {q_push, q_pop}

q_push: read 'a', push A; read 'b', push B
q_push → q_pop: read 'c' (deterministic middle)
q_pop: read 'a', pop A; read 'b', pop B
```

The middle marker makes it deterministic!

## Template: Nested Structures

For balanced parentheses with types:

```
States: {q}
Stack: {Z₀, (, [, {}

q: read '(', push '('
q: read '[', push '['
q: read ')', pop '('
q: read ']', pop '['
Accept by empty stack
```

## Handling ε-productions

When grammar has S → ε:
- PDA needs to accept empty string
- Add ε-transition from start to accept

## Common Mistakes

1. **Forgetting stack bottom marker**: Can't detect when to stop
2. **Missing nondeterminism**: Some CFLs require guessing
3. **Wrong stack order**: Remember LIFO
4. **Incomplete transitions**: Handle all cases

## Debugging PDAs

Test with:
- Empty string (if in language)
- Shortest strings in L
- Shortest strings not in L
- Edge cases

Trace configurations step by step.

## Converting Design to Formal PDA

1. List states and their meanings
2. Define stack alphabet (what do you need to remember?)
3. Write transitions for each case
4. Verify: does every string in L have accepting computation?
5. Verify: does every accepting computation correspond to string in L?

## Example: {aⁱbʲcᵏ | i=j or j=k}

Requires nondeterminism:
- Guess which equality holds
- If i=j: match a's and b's
- If j=k: ignore a's, match b's and c's

Cannot be done deterministically—this language is not a DCFL.

## Detailed Design Example: Arithmetic Expressions

Let's design a PDA for balanced arithmetic expressions with operators and parentheses.

**Language:** Balanced expressions with $\{a, +, *, (, )\}$

**Design approach:**
- Use stack to track nested parentheses
- Treat $a$, $+$, $*$ as terminals that don't affect stack
- Push for each $($ and pop for each $)$

**PDA specification:**
- States: $Q = \{q_0, q_f\}$
- Stack: $\Gamma = \{Z_0, (\}$
- Accept by final state

**Transitions:**
- $\delta(q_0, a, Z_0) = \{(q_0, Z_0)\}$ — read operand
- $\delta(q_0, a, () = \{(q_0, ()\}$ — read operand (nested)
- $\delta(q_0, +, Z_0) = \{(q_0, Z_0)\}$ — read operator
- $\delta(q_0, +, () = \{(q_0, ()\}$ — read operator (nested)
- $\delta(q_0, *, Z_0) = \{(q_0, Z_0)\}$ — read operator
- $\delta(q_0, *, () = \{(q_0, ()\}$ — read operator (nested)
- $\delta(q_0, (, Z_0) = \{(q_0, (Z_0)\}$ — push opening paren
- $\delta(q_0, (, () = \{(q_0, (())\}$ — push nested paren
- $\delta(q_0, ), () = \{(q_0, \varepsilon)\}$ — match closing paren
- $\delta(q_0, \varepsilon, Z_0) = \{(q_f, Z_0)\}$ — accept

**Example computation** for "$(a+a)*a$":

$$
\begin{align*}
(q_0, (a+a)*a, Z_0) &\vdash (q_0, a+a)*a, (Z_0) && \text{push (} \\
&\vdash (q_0, +a)*a, (Z_0) && \text{read a} \\
&\vdash (q_0, a)*a, (Z_0) && \text{read +} \\
&\vdash (q_0, )*a, (Z_0) && \text{read a} \\
&\vdash (q_0, *a, Z_0) && \text{match ) with (} \\
&\vdash (q_0, a, Z_0) && \text{read *} \\
&\vdash (q_0, \varepsilon, Z_0) && \text{read a} \\
&\vdash (q_f, \varepsilon, Z_0) && \text{accept}
\end{align*}
$$

## Design Pattern: Counting with Limits

For languages requiring bounded counting, use distinct stack symbols.

**Example:** $L = \{a^n b^m c^n \mid n, m \geq 0\}$

**Strategy:**
1. Push $A$ for each $a$
2. Read all $b$'s without changing stack
3. Pop $A$ for each $c$
4. Accept when stack empties

**PDA:**
- States: $\{q_0, q_1, q_2\}$
- Stack: $\{Z_0, A\}$

**Transitions:**
- $\delta(q_0, a, Z_0) = \{(q_0, AZ_0)\}$ — start pushing
- $\delta(q_0, a, A) = \{(q_0, AA)\}$ — count a's
- $\delta(q_0, b, A) = \{(q_1, A)\}$ — switch to middle section
- $\delta(q_0, \varepsilon, Z_0) = \{(q_2, Z_0)\}$ — accept empty (n=0)
- $\delta(q_1, b, A) = \{(q_1, A)\}$ — skip b's
- $\delta(q_1, c, A) = \{(q_2, \varepsilon)\}$ — start matching c's
- $\delta(q_2, c, A) = \{(q_2, \varepsilon)\}$ — pop for each c
- $\delta(q_2, \varepsilon, Z_0) = \{(q_2, Z_0)\}$ — accept (final state)

## Design Pattern: Multiple Stack Symbols

When tracking different types of symbols, use multiple stack symbols.

**Example:** $L = \{w \in \{a,b\}^* \mid |w|_a = |w|_b\}$ (equal numbers of $a$'s and $b$'s)

**Strategy:**
- Use stack symbols $A$ and $B$
- Push $A$ when reading $a$ (if stack empty or top is $A$)
- Push $B$ when reading $b$ (if stack empty or top is $B$)
- Pop when opposite symbol read
- Accept when stack empty

**Key transitions:**
- $\delta(q, a, Z_0) = \{(q, AZ_0)\}$ — first $a$
- $\delta(q, a, A) = \{(q, AA)\}$ — more $a$'s
- $\delta(q, a, B) = \{(q, \varepsilon)\}$ — cancel with $b$
- $\delta(q, b, Z_0) = \{(q, BZ_0)\}$ — first $b$
- $\delta(q, b, B) = \{(q, BB)\}$ — more $b$'s
- $\delta(q, b, A) = \{(q, \varepsilon)\}$ — cancel with $a$

This design handles any interleaving of $a$'s and $b$'s.

## Common Pitfall: Determinism vs Nondeterminism

**Mistake:** Trying to make every PDA deterministic

Many CFLs **require** nondeterminism:
- $\{ww^R \mid w \in \{a,b\}^*\}$ — must guess middle
- $\{a^n b^n\} \cup \{a^n b^{2n}\}$ — must guess which pattern
- Palindromes without center marker

**When determinism works:**
- Clear markers separate phases
- No ambiguity about structure
- Single left-to-right pass suffices

## Design Strategy Summary

Follow this process for designing PDAs:

1. **Identify structure:** What needs to be remembered?
2. **Choose stack symbols:** What information must stack encode?
3. **Determine states:** What phases does processing have?
4. **Handle base cases:** Empty string, minimal examples
5. **Build transitions:** Connect states with appropriate stack operations
6. **Verify correctness:** Test on example strings (both accepting and rejecting)

## Advanced Example: Nested Comments

**Language:** Strings with properly nested $\{/ *\}$ and $\{* /\}$ comments

**Challenge:** Multi-character delimiters require careful state management

**Design:**
- States track: normal mode, seen '/', seen '*'
- Stack tracks nesting depth
- Push when entering comment, pop when exiting

This demonstrates that PDA design can involve complex state machines even with simple stack operations.

## Testing Your PDA

Always test with:

1. **Empty string** — if in language
2. **Minimal accepting strings** — shortest cases
3. **Boundary cases** — single symbol, two symbols
4. **Nested structures** — deeply nested examples
5. **Invalid strings** — near-misses that should reject
6. **Longer examples** — verify scaling

For each test case, **trace the computation** to verify correct behavior.

## Converting Informal Descriptions

When given informal language descriptions:

1. **Identify key constraints:**
   - Counting requirements → stack for counters
   - Matching requirements → push/pop pattern
   - Nesting requirements → stack tracks depth

2. **Determine nondeterminism needs:**
   - Guessing required? → nondeterministic
   - Clear structure? → possibly deterministic

3. **Choose acceptance mode:**
   - Natural empty point? → empty stack
   - Complex final condition? → final state

4. **Build incrementally:**
   - Start with simple cases
   - Add complexity gradually
   - Test at each step

## Key Takeaways

- Stack design determines what the PDA can remember
- States represent processing phases or modes
- Counting languages use stack as counter
- Matching languages use push/pop patterns
- Nesting languages leverage LIFO stack structure
- Many CFLs require nondeterminism for recognition
- Deterministic design works when structure is unambiguous
- Multiple stack symbols enable tracking different symbol types
- Testing with diverse examples validates PDA correctness
- Systematic design process: structure analysis → stack alphabet → states → transitions → verification
