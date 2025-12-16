# TM Computation

Turing machine computation involves sequences of configurations connected by the transition function. Understanding computation is key to analyzing TM behavior.

## Configuration Representation

A configuration encodes the complete machine state:
- Current state
- Tape contents
- Head position

Standard notation: w₁qw₂
- Tape contains w₁w₂ (rest is blank)
- Machine is in state q
- Head is on first symbol of w₂

## Initial Configuration

For input w, the initial configuration is:

q₀w

- Machine in start state q₀
- Tape contains input w
- Head on leftmost symbol of w

## Computation Sequences

A **computation** is a sequence of configurations:

C₀ ⊢ C₁ ⊢ C₂ ⊢ ... ⊢ Cₙ

Where each step follows from the transition function.

## Accepting Computation

M accepts w if there exists a computation:

q₀w ⊢* uq_acceptv

For some strings u, v.

## Rejecting Computation

M rejects w if:

q₀w ⊢* uq_rejectv

For some strings u, v.

## Non-halting Computation

M may run forever on input w:
- Never reaches q_accept or q_reject
- Infinite computation sequence
- Input is neither accepted nor rejected

## Example Computation

TM for {w#w | w ∈ {0,1}*}

Input: "01#01"

```
q₀01#01
Xq₁1#01    (mark first 0)
X1q₂#01    (scan right)
X1#q₃01    (cross #)
X1#Xq₄1    (find and mark matching 0)
X1q₅#X1    (scan left)
Xq₅1#X1    (continue left)
q₅X1#X1    (find marker)
Xq₀1#X1    (back to start)
XXq₁#X1    (mark 1)
...
q_accept   (eventually)
```

## Decidability

A TM M **decides** language L if:
- M accepts all w ∈ L
- M rejects all w ∉ L
- M always halts

L is **decidable** (recursive) if some TM decides it.

## Recognizability

A TM M **recognizes** language L if:
- M accepts exactly the strings in L
- M may not halt on strings not in L

L is **recognizable** (r.e.) if some TM recognizes it.

## Computation as Proof

Accepting computation = proof that w ∈ L

Each configuration follows logically from the previous.
The sequence witnesses membership.

## Time Complexity

**Running time** on input w:
- Number of steps until halt
- May be infinite (non-halting)

Time complexity: worst-case over inputs of length n.

## Space Complexity

**Space used** on input w:
- Number of distinct tape cells visited
- At least |w| (input length)

## Tracing Computations

For debugging/analysis:
1. Start with q₀w
2. Apply δ to get next configuration
3. Repeat until halt (or give up)

## Multi-tape Simulation

Single-tape TM can simulate multi-tape:
- Interleave tape contents
- Mark head positions
- Slower by polynomial factor
