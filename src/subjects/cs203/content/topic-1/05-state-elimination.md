---
id: cs203-t1-eliminate
title: "State Elimination"
order: 5
---

# State Elimination

**State elimination** is an algorithm that converts a finite automaton to an equivalent regular expression. This establishes that regular expressions and finite automata describe exactly the same class of languages.

## Generalized NFA (GNFA)

A **Generalized NFA** is like an NFA but allows regular expressions (not just symbols) on transitions. This is an intermediate representation used in state elimination.

Properties of GNFA:
- Single start state with no incoming edges
- Single accept state with no outgoing edges
- Start and accept states are different
- Every other state has transitions to/from all states (possibly ∅)

## Converting DFA/NFA to GNFA

1. Add a new start state with ε-transition to original start
2. Add a new accept state with ε-transitions from all original accepting states
3. If multiple transitions exist between states, combine them with union (|)
4. Add ∅ transitions where no transition exists

## The State Elimination Process

The key insight: we can remove states one by one while preserving the language. When removing state q:

For every pair of states p and r (where p → q and q → r):
- Old transitions: p --R1--> q --R2--> r with q --R3--> q loop
- New direct transition: p --R1(R3)*R2--> r

This accounts for:
- Entering q (R1)
- Looping zero or more times (R3*)
- Exiting q (R2)

## The Algorithm

```
state_elimination(FA):
    Convert FA to GNFA G

    while G has more than 2 states:
        Select a state q (not start or accept)

        For each pair (p, r) of remaining states:
            R_new = R(p,q) · R(q,q)* · R(q,r) | R(p,r)
            Update transition p → r to R_new

        Remove state q and its transitions

    Return the single transition from start to accept
```

## Example

Consider a DFA for "strings containing 01":

States: {start, seen0, accept}
Transitions:
- start --0--> seen0
- start --1--> start
- seen0 --0--> seen0
- seen0 --1--> accept
- accept --0,1--> accept

After converting to GNFA and eliminating seen0:
- start to accept: 0·0*·1

After eliminating nothing else needed, final regex: 1* · 0 · 0* · 1 · (0|1)*

Which simplifies to: (1|0)*01(0|1)*

## Order of Elimination

The order in which states are eliminated affects the size of the resulting expression but not its language. Some heuristics for choosing elimination order:

1. States with fewest transitions
2. States creating smallest new expressions
3. States not on many paths

## Correctness

**Theorem**: State elimination produces an equivalent regular expression.

**Proof sketch**: Each elimination step preserves the language. When one state remains (besides start and accept), the single transition is a regular expression for L.

## Converting Regex to NFA

The reverse direction uses **Thompson's construction**:

- **Base cases**:
  - ε: start --ε--> accept
  - a: start --a--> accept

- **Induction**:
  - R|S: new start with ε to both NFAs, both connect to new accept
  - RS: concatenate NFAs, first's accept ε-connects to second's start
  - R*: new start/accept with ε-connections for zero or more iterations

## Kleene's Theorem

**Theorem** (Kleene): A language is regular if and only if it is described by a regular expression.

**Proof**:
- Regex → FA: Thompson's construction
- FA → Regex: State elimination

This establishes the equivalence of the three characterizations:
1. Recognized by DFA
2. Recognized by NFA
3. Described by regular expression

## Detailed Worked Example

Convert the following DFA to a regular expression.

**DFA**: Accepts strings over {0,1} with an odd number of 1s.

States: $\{q_0, q_1\}$
- $q_0$: even number of 1s (start state)
- $q_1$: odd number of 1s (accepting state)

Transitions:
- $\delta(q_0, 0) = q_0$, $\delta(q_0, 1) = q_1$
- $\delta(q_1, 0) = q_1$, $\delta(q_1, 1) = q_0$

**Step 1**: Convert to GNFA
- Add new start state $q_s$ with $\varepsilon$-transition to $q_0$
- Add new accept state $q_f$ with $\varepsilon$-transition from $q_1$
- Add $\emptyset$ transitions where none exist

**Step 2**: Eliminate $q_0$

For path $q_s \to q_0 \to q_1$:
- $R(q_s, q_0) = \varepsilon$
- $R(q_0, q_0) = 0$ (loop)
- $R(q_0, q_1) = 1$
- New transition: $q_s \to q_1 = \varepsilon \cdot 0^* \cdot 1 = 0^*1$

For path $q_1 \to q_0 \to q_1$ (affects $q_1$'s loop):
- $R(q_1, q_0) = 1$
- $R(q_0, q_0) = 0$
- $R(q_0, q_1) = 1$
- Add to existing loop: $0 \mid 10^*1$

**Step 3**: Eliminate $q_1$

Final transition from $q_s$ to $q_f$:
- Enter $q_1$: $0^*1$
- Loop at $q_1$: $(0 \mid 10^*1)^*$
- Exit $q_1$: $\varepsilon$

**Result**: $0^*1(0 \mid 10^*1)^*$

This can be simplified to: $0^*1(0 \mid 10^*1)^*$ which describes strings with odd number of 1s.

## Step-by-Step Elimination Formula

When eliminating state $q_{rip}$, for each pair of states $(q_i, q_j)$ where $i \neq j$:

$$R_{new}(q_i, q_j) = R(q_i, q_j) \mid R(q_i, q_{rip}) \cdot R(q_{rip}, q_{rip})^* \cdot R(q_{rip}, q_j)$$

Breaking this down:
- **$R(q_i, q_j)$**: Direct path from $q_i$ to $q_j$ (may be $\emptyset$)
- **$R(q_i, q_{rip})$**: Enter the eliminated state
- **$R(q_{rip}, q_{rip})^*$**: Loop zero or more times
- **$R(q_{rip}, q_j)$**: Exit to $q_j$
- **Union ($\mid$)**: Either take direct path or go through $q_{rip}$

## Second Worked Example: Complex Automaton

**DFA**: Accepts strings ending in "01" over {0,1}.

States: $\{A, B, C\}$
- $A$: start state, no recent match
- $B$: just saw 0
- $C$: just saw "01" (accepting)

Transitions:
- From $A$: 0→B, 1→A
- From $B$: 0→B, 1→C
- From $C$: 0→B, 1→A

**Converting to GNFA**: Add $q_s$ and $q_f$.

**Eliminate A**:
- Path $q_s \to A \to B$: $\varepsilon \cdot 1^* \cdot 0 = 1^*0$
- Loop at B (via A): $0 \mid 11^*0$
- Path $B \to A \to B$: $1 \cdot 1^* \cdot 0 = 11^*0$

After eliminating A, update B's self-loop: $(0 \mid 11^*0)$

Continue elimination... Final regex: $(0|1)^*01$

## Algebraic Simplification

Regular expressions from state elimination often need simplification:

**Common identities**:
- $R \mid R = R$ (idempotence)
- $R \mid \emptyset = R$ (identity)
- $R \cdot \varepsilon = \varepsilon \cdot R = R$ (identity)
- $R \cdot \emptyset = \emptyset \cdot R = \emptyset$ (annihilation)
- $\varepsilon^* = \varepsilon$
- $\emptyset^* = \varepsilon$
- $(R^*)^* = R^*$
- $R^* = \varepsilon \mid RR^*$ (unfolding)

**Example simplification**:
- Original: $\varepsilon \mid (a \mid b)^*a(a \mid b)^*$
- Simplify: $(a \mid b)^*a(a \mid b)^*$

(Since $(a|b)^*$ already includes $\varepsilon$)

## Choosing Elimination Order

The order of elimination can dramatically affect expression size.

**Heuristic 1**: Eliminate states with fewest connections first.

**Heuristic 2**: Eliminate states that create small expressions.

**Example**: For a linear chain $q_0 \to q_1 \to q_2 \to q_3$:
- Eliminate middle states first: results in $(a \cdot b \cdot c)$
- Eliminate end states first: may create $(a \mid (b \mid c))$

**Bad order**: Can produce expressions exponentially larger than necessary.

**Good order**: Often produces expressions close to minimal.

## Connection to Thompson's Construction

State elimination and Thompson's construction are **inverses**:

**Thompson's construction**: Regex → NFA
- Build small NFAs for base cases
- Combine using ε-transitions
- Result: NFA with O(n) states for regex of size n

**State elimination**: NFA → Regex
- Start with NFA
- Eliminate states while preserving language
- Result: Regular expression (possibly large)

**Round trip**:
- Regex → NFA (Thompson) → DFA (subset construction) → Regex (state elimination)
- May not return to original regex (but describes same language!)

## Correctness Proof Sketch

**Theorem**: State elimination preserves language.

**Proof by induction** on number of states:

**Base case**: 2 states (just start and accept).
- The single transition label is a regex for L.

**Inductive case**: k+1 states.
- Choose any state $q$ (not start or accept)
- After eliminating $q$, the GNFA has k states
- For any string $w$:
  - If $w \in L$, some path accepts it
  - Either path avoids $q$, or goes through $q$ some number of times
  - The new regex captures both cases via union and Kleene star
  - Therefore $w$ is still accepted

By induction, the process preserves L until 2 states remain. $\square$

## Size Analysis

**Worst case**: Exponential blowup in expression size.

For an n-state DFA:
- Each elimination can **square** the expression size (in worst case)
- After n-2 eliminations, size could be $2^{2^n}$

**Typical case**: Polynomial growth
- Most real automata produce manageable expressions
- Algebraic simplification helps significantly

**Comparison**:
- DFA state count: n
- Regex from elimination: O(n³) symbols (typical)
- Regex from elimination: O(4^n) symbols (worst case)

## Applications Beyond Conversion

State elimination techniques apply to:

**DFA-to-Regex conversion**:
- Theoretical proofs about regular languages
- Generating regex from automata
- Understanding equivalence of models

**Model checking**:
- Computing reachability paths
- Generating counter-examples as regular expressions

**Automatic documentation**:
- Describing protocol behavior symbolically
- Generating human-readable summaries from state machines

## Practical Considerations

State elimination can produce exponentially large expressions. In practice:
- Use **heuristics** for elimination order (fewest edges, smallest expressions)
- Apply **algebraic simplifications** incrementally during elimination
- For matching, convert regex → NFA → DFA instead (state elimination rarely used for matching)
- Use **symbolic computation** tools to manage complex expressions
- Consider **alternative representations** (e.g., decision diagrams) for very large automata

The algorithm is primarily of **theoretical interest**, proving Kleene's theorem. For practical regex construction, designers usually write patterns directly rather than deriving them from automata.

## Key Takeaways

- State elimination converts finite automata to equivalent regular expressions
- GNFAs allow regex labels on transitions, simplifying the algorithm
- Eliminating a state creates paths that bypass it using concatenation and Kleene star
- The elimination order affects expression size but not the language
- Combined with Thompson's construction, proves regex and automata equivalence
- Kleene's theorem: Regular languages = DFA = NFA = Regex
- Worst-case exponential expression size, but often manageable in practice
- Primarily theoretical tool; practical regex design is usually manual
