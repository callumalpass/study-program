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
