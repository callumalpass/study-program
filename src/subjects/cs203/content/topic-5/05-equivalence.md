---
id: cs203-t5-equivalence
title: "Variant Equivalence"
order: 5
---

# Equivalence of TM Variants

All Turing machine variants are computationally equivalent—they recognize the same class of languages. This robustness supports the Church-Turing thesis.

## Simulation

Model A **simulates** model B if:
- A can mimic any computation of B
- B accepts w ⟺ A accepts w

If A simulates B and B simulates A, they're **equivalent**.

## Multi-Tape → Single-Tape

**Theorem**: A k-tape TM can be simulated by a single-tape TM.

**Construction**:
1. Represent k tapes on one tape:
   - Separate by # delimiter
   - Mark head positions with dots

2. Format: #ẇ₁...#ẇ₂...#...#ẇₖ...#

3. To simulate one step:
   - Scan to find all head positions
   - Record symbols under heads
   - Compute new state and actions
   - Scan again to update tape and heads

**Time overhead**: O(t²) for t-step original computation (scanning adds factor of tape length).

## NTM → Deterministic TM

**Theorem**: Every NTM can be simulated by a deterministic TM.

**Construction** (BFS approach):
1. Generate all possible computation paths level by level
2. Use multiple tapes:
   - Tape 1: Input (preserved)
   - Tape 2: Current simulation
   - Tape 3: Current path address

3. For each path address:
   - Copy input to tape 2
   - Follow path (sequence of choices)
   - If accepts, accept; if rejects/blocks, try next path

**Time overhead**: O(d^t) where d is max branching and t is steps (exponential).

## Two-Way vs One-Way Tape

**Theorem**: Two-way infinite tape TM equivalent to one-way.

**Construction** (folding):
- Map position i to position 2i (positive half)
- Map position -i to position 2i+1 (negative half)
- Transitions adjusted for the interleaving

## Stay-Put Option

**Theorem**: TM with stay option (L, R, S) equivalent to standard (L, R only).

**Construction**: Replace δ(q, a) = (r, b, S) with:
- δ(q, a) = (q', b, R)
- δ(q', c) = (r, c, L) for all c

Move right then left to stay in place.

## Multi-Head TM

**Theorem**: k-head single-tape TM equivalent to standard TM.

**Construction**: Track head positions with markers, similar to multi-tape simulation.

## RAM to TM

Random Access Machines simulate TMs:
- Tape encoded in registers
- Head position in register

TMs simulate RAMs:
- Registers encoded on tape
- Indirect addressing via search

Polynomial overhead in both directions.

## Counter Machines

**Theorem**: 2-counter machine equivalent to TM.

**Construction**:
- Encode tape contents as single integer n
- Position p encoded in integer m
- Operations simulate TM steps

Counter machines with 1 counter are weaker (can't count properly).

## Post Systems

**Theorem**: Post's correspondence problem equivalent to TM halting.

Various string rewriting systems equivalent to TMs.

## Lambda Calculus

**Theorem**: Lambda calculus equivalent to TMs.

Church's formalism for computation equals Turing's.

## Significance

The equivalence of all these models suggests:
1. **Robustness**: "Computation" is fundamental
2. **Church-Turing thesis** is well-founded
3. **Proofs** can use convenient variants
4. **Results** transfer between models

Any reasonable model of computation has the same power.

## Detailed Multi-Tape to Single-Tape Construction

Let's work through the complete simulation in detail for a 3-tape TM.

**Original 3-tape TM**:
- Tape 1: "abc"
- Tape 2: "xy"
- Tape 3: (empty)
- Heads at positions: 2, 1, 0

**Encoded on single tape**:
```
#aḃc#xẏ#˙#
```

Where the dot marks head positions.

**Simulation steps**:

1. **Scan phase**: Move right across entire tape, recording dotted symbols
   - Found: b (tape 1), y (tape 2), blank (tape 3)

2. **Lookup phase**: Consult original transition function
   - $\delta(q, b, y, \sqcup) = (q', b', y', z, L, R, R)$

3. **Update phase**: Scan tape again, updating symbols and moving dots
   - Replace b with b', move dot left: #aḃ'c
   - Replace y with y', move dot right: #xy'˙
   - Write z, move dot right: #˙z#

4. **Result**:
```
#aḃ'c#xy'˙#˙z#
```

The simulation continues this process for each step of the original TM.

**Correctness argument**: The single-tape configuration after $k$ steps perfectly encodes the 3-tape configuration after $k$ steps, maintaining the simulation invariant.

## Detailed NTM to Deterministic Simulation

Let's trace the BFS simulation of an NTM on a specific input.

**Example NTM**: Recognizes strings with a substring "01"
- State $q_0$: Nondeterministically guess we're at the "01" substring, or keep scanning
- $\delta(q_0, 0) = \{(q_0, 0, R), (q_1, 0, R)\}$ — Either keep scanning or start matching
- $\delta(q_1, 1) = \{(q_{\text{accept}}, 1, R)\}$ — Found "01"!

**Input**: "001"

**Computation tree**:
```
                q₀001
               /     \
         q₀001(scan) q₁01(match)
            /   \         |
      q₀01    q₁01      q₀1
         ...     ...   /    \
                   q₀1(scan) q₁1(match-fail)
                     ...       (no transition)
```

**BFS simulation**:
- Depth 0: Try $q_0 001$
- Depth 1: Try both branches: scan to $q_0 01$, and match to $q_1 01$
- Depth 2: From $q_1 01$, reach $q_{\text{accept}}$ — ACCEPT!

The deterministic simulator explores all these paths systematically, accepting as soon as any path accepts.

## Complexity of Equivalence

The equivalence results have important complexity implications:

### Time Complexity

| Variant | Simulation Overhead | Original Time $T(n)$ | Simulated Time |
|---------|-------------------|---------------------|----------------|
| k-tape to 1-tape | Quadratic | $T(n)$ | $O(T(n)^2)$ |
| NTM to DTM | Exponential | $T(n)$ | $O(c^{T(n)})$ |
| 2-way to 1-way | Constant | $T(n)$ | $O(T(n))$ |
| Stay option | Constant | $T(n)$ | $O(T(n))$ |

### Space Complexity

| Variant | Simulation Overhead | Original Space $S(n)$ | Simulated Space |
|---------|-------------------|---------------------|----------------|
| k-tape to 1-tape | Linear | $S(n)$ | $O(k \cdot S(n))$ |
| NTM to DTM | Polynomial | $S(n)$ | $O(S(n))$ |

The space overhead for NTM simulation is surprisingly small (polynomial, not exponential) because we reuse tape space between paths.

## Proving Equivalence: General Strategy

To prove two models $A$ and $B$ are equivalent:

1. **Show $A$ simulates $B$**: Any language accepted by $B$ is accepted by $A$
2. **Show $B$ simulates $A$**: Any language accepted by $A$ is accepted by $B$
3. **Conclude**: The models are equivalent (recognize same language class)

For TM variants, we typically show both directions simulate the standard TM.

## Church-Turing Thesis and Equivalence

The equivalence results provide strong evidence for the Church-Turing thesis:

**Observation**: Every reasonable computational model proposed has been proved equivalent to Turing machines:
- Turing machines (1936)
- Lambda calculus (Church, 1936)
- Recursive functions (Gödel, 1934)
- Post systems (Post, 1936)
- Register machines (1960s)
- Random access machines (1960s)
- Modern programming languages (1950s-present)

**Conclusion**: This convergence suggests TMs capture something fundamental about computation itself.

## Non-Equivalent Models

Some models are **not** equivalent to TMs:

**Weaker models**:
- Finite automata (recognize only regular languages)
- Pushdown automata (recognize only context-free languages)
- Linear bounded automata (recognize context-sensitive languages)

**Stronger models** (with oracles or infinite time):
- Oracle Turing machines (with halting oracle)
- Infinite time Turing machines
- These are theoretical constructs, not physically realizable

## Practical Implications

The equivalence results have practical consequences:

1. **Programming language design**: Any Turing-complete language can compute the same functions
2. **Algorithm portability**: An algorithm in one model translates to any other
3. **Complexity analysis**: Can use the most convenient model
4. **Compiler theory**: High-level languages compile to machine code without losing power

## Historical Context

The equivalence results were discovered gradually:

- **1936**: Turing shows TM equivalent to lambda calculus (Church's model)
- **1950s**: Multi-tape TMs introduced and proved equivalent
- **1960s**: Nondeterministic TMs and their equivalence established
- **1970s**: Random access machines proved equivalent

Each new model initially raised the question: "Is this more powerful?" The answer was always "No," strengthening confidence in the Church-Turing thesis.

## Encoding Schemes

The equivalence proofs rely on encoding one model's configurations in another's:

**Key insight**: Since both models are discrete and finitary (finite alphabets, finite states), configurations can be encoded as strings, which can be written on tape.

This is fundamental to the Universal Turing Machine construction and to the theory of computability.

## Key Takeaways

- All reasonable computational models are equivalent in power
- Simulation proves equivalence by showing mutual recognition of languages
- Multi-tape to single-tape simulation has $O(T^2)$ time overhead
- NTM to deterministic simulation has exponential time but polynomial space overhead
- The time and space overhead matters for complexity theory, not computability
- The robustness of TM equivalence strongly supports Church-Turing thesis
- Equivalence allows choosing the most convenient model for each proof
- Non-equivalent models (FSA, PDA) are genuinely weaker
- Oracle and infinite-time models are genuinely stronger but not physically realizable
- Encoding schemes are key to proving equivalence between different models
- Historical convergence of independent models to TM equivalent strengthens the thesis
