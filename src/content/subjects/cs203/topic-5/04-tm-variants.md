# TM Variants

Various Turing machine variants have been proposed. Despite their differences, all are equivalent in computational power to the standard TM.

## Multi-Tape Turing Machines

A **k-tape TM** has k separate tapes, each with its own head:
- Transition depends on all k symbols under heads
- Each head can move independently
- First tape contains input; others start blank

**Transition**: δ(q, a₁, ..., aₖ) = (r, b₁, ..., bₖ, D₁, ..., Dₖ)

## Multi-Tape Equivalence

**Theorem**: Every k-tape TM can be simulated by a single-tape TM.

**Proof sketch**:
- Encode k tapes on one tape with separators
- Mark head positions with special symbols
- Simulate each step by scanning the entire tape
- Slowdown: O(t²) time for t-step computation

## Nondeterministic Turing Machines

A **Nondeterministic TM (NTM)** allows multiple transitions:

δ: Q × Γ → P(Q × Γ × {L, R})

NTM accepts if **any** computation path accepts.

## NTM Equivalence

**Theorem**: Every NTM can be simulated by a deterministic TM.

**Proof sketch**:
- Systematically explore all computation paths
- Use breadth-first search to avoid infinite paths
- Exponential slowdown: O(2^t) time worst case

## Two-Way Infinite Tape

Tape infinite in both directions (standard version has one-way infinite tape).

**Equivalence**: Simulate by folding tape at origin—interleave positive and negative positions.

## Multiple Heads

Single tape, multiple read/write heads.

**Equivalence**: Track head positions with markers.

## Read-Only Input Tape

Separate read-only input tape, plus work tape(s).

Equivalent; just don't write on the input section of a single-tape TM.

## Stay Option

Allow head to stay put (not just L/R):

δ: Q × Γ → Q × Γ × {L, R, S}

**Equivalence**: S transition can be simulated by R then L.

## Multidimensional Tape

Tape is 2D grid (or higher dimension).

**Equivalence**: Map 2D positions to 1D using diagonal enumeration or other bijection.

## Queue Machines

Replace stack with queue (FIFO).

**Equivalent to TM**: Can simulate tape with two queues.

## Counter Machines

k counters holding non-negative integers.
Operations: increment, decrement, test for zero.

**Equivalence**:
- Two counters suffice to simulate TM (encode tape as integer)
- One counter is not enough

## Random Access Machines (RAM)

Model closer to real computers:
- Numbered registers
- Arithmetic operations
- Indirect addressing

**Equivalent to TM** (polynomial slowdown).

## Implications of Equivalence

All these variants recognize the same languages:
- Recursively enumerable (r.e.) languages
- Adding features doesn't increase power
- Simplifying doesn't decrease power

This robustness suggests TMs capture "computation" fundamentally.

## Why Variants Matter

- **Theory**: Standard TM is canonical
- **Proofs**: Use most convenient variant
- **Complexity**: Some variants affect time/space bounds

Multi-tape TMs are often used in complexity theory for cleaner bounds.
