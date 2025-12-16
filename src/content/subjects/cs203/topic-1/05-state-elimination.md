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

## Practical Considerations

State elimination can produce exponentially large expressions. In practice:
- Use heuristics for elimination order
- Apply algebraic simplifications
- For matching, convert regex → NFA → DFA instead
