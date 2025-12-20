---
id: cs203-t5-computation
title: "TM Computation"
order: 2
---

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

## Understanding the Yields Relation

The **yields** relation ($\vdash$) is fundamental to understanding TM computation. It describes a single step of the machine. The reflexive transitive closure ($\vdash^*$) represents zero or more steps.

For example, if we write $C_1 \vdash^* C_n$, we mean configuration $C_1$ can reach configuration $C_n$ in some number of steps (possibly zero).

### Formal Definition

More precisely:
- $C \vdash C$ means $C$ yields $C$ in exactly 1 step
- $C \vdash^* C$ means $C$ yields $C$ in 0 or more steps
- $C_1 \vdash^k C_2$ means $C_1$ yields $C_2$ in exactly $k$ steps

## Detailed Palindrome Example

Let's design and trace a TM that recognizes palindromes over $\{0, 1\}$.

**Strategy**: Match first and last symbols repeatedly, crossing them off until nothing remains.

**States**:
- $q_0$: Start/check state
- $q_1$: Saw 0, looking for matching 0 at end
- $q_2$: Saw 1, looking for matching 1 at end
- $q_3$: Scanning left to return
- $q_{\text{accept}}$: Accept state
- $q_{\text{reject}}$: Reject state

**Transition rules**:
- $\delta(q_0, 0) = (q_1, X, R)$ — Mark first 0
- $\delta(q_0, 1) = (q_2, X, R)$ — Mark first 1
- $\delta(q_0, X) = (q_0, X, R)$ — Skip already marked symbols
- $\delta(q_0, \sqcup) = (q_{\text{accept}}, \sqcup, R)$ — Empty string is palindrome
- $\delta(q_1, 0) = (q_1, 0, R)$ — Scan right over 0s
- $\delta(q_1, 1) = (q_1, 1, R)$ — Scan right over 1s
- $\delta(q_1, X) = (q_1, X, R)$ — Scan right over Xs
- $\delta(q_1, \sqcup) = (q_3, \sqcup, L)$ — Reached end, go back one
- $\delta(q_3, 0) = (q_0, X, L)$ — Mark last 0, return if matches
- $\delta(q_3, 1) = (q_{\text{reject}}, 1, R)$ — Last is 1, but first was 0, reject

(Similar rules for $q_2$ state)

**Trace on input "0110"**:

1. $q_0 0110 \vdash Xq_1 110$ — Mark first 0
2. $Xq_1 110 \vdash X1q_1 10$ — Scan right
3. $X1q_1 10 \vdash X11q_1 0$ — Continue right
4. $X11q_1 0 \vdash X110q_1 \sqcup$ — Reached end
5. $X110q_1 \sqcup \vdash X11q_3 0\sqcup$ — Back up one
6. $X11q_3 0\sqcup \vdash X1q_0 1X\sqcup$ — Last char is 0, matches! Mark it, return
7. $X1q_0 1X\sqcup \vdash XXq_2 1X\sqcup$ — Mark first 1 (from remaining)
8. $XXq_2 1X\sqcup \vdash XX1q_2 X\sqcup$ — Scan right
9. $XX1q_2 X\sqcup \vdash XX1Xq_2 \sqcup$ — Reached end
10. $XX1Xq_2 \sqcup \vdash XX1q_3 X\sqcup$ — Back up one
11. $XX1q_3 X\sqcup \vdash XXq_3 1X\sqcup$ — Skip X, go left
12. $XXq_3 1X\sqcup \vdash XXXq_0 X\sqcup$ — Last is 1, matches! Mark it
13. $XXXq_0 X\sqcup \vdash XXXXq_0 \sqcup$ — All marked, check for blanks
14. $XXXXq_0 \sqcup \vdash XXXXq_{\text{accept}} \sqcup$ — Accept!

## Computation Trees for Nondeterministic TMs

While we focus on deterministic TMs here, it's worth noting that nondeterministic TMs have **computation trees** rather than linear computation sequences. Each node represents a configuration, and branches represent nondeterministic choices.

An NTM accepts if **any** path in the tree leads to $q_{\text{accept}}$. This is fundamentally different from deterministic computation, though we'll see later that NTMs and deterministic TMs recognize the same class of languages.

## The Halting Problem Preview

The distinction between decidability and recognizability becomes crucial when we consider the **halting problem**: given a TM $M$ and input $w$, does $M$ halt on $w$?

This problem is **undecidable**—no TM can solve it for all possible inputs. This means there are fundamental limits to what algorithms can accomplish, which we'll explore more in later topics.

## Computation Complexity Measures

### Time Complexity Function

For a decider $M$, define $T_M(n)$ as:
$$T_M(n) = \max\{k \mid M \text{ halts in } k \text{ steps on some input of length } n\}$$

This is the worst-case running time over all inputs of length $n$.

### Space Complexity Function

Similarly, define $S_M(n)$ as:
$$S_M(n) = \max\{k \mid M \text{ uses } k \text{ tape cells on some input of length } n\}$$

This measures the maximum number of distinct tape cells visited during any computation on an input of length $n$.

## Practical Considerations

While configurations precisely describe TM computation, in practice we often work at a higher level of abstraction:

1. **High-level descriptions**: Describe algorithm in English
2. **Implementation-level descriptions**: Specify how to use the tape
3. **Formal descriptions**: Give complete transition function

Each level has its place: formal for theorems, implementation for design, high-level for intuition.

## Key Takeaways

- Configurations capture the complete state of a TM at any moment
- The yields relation ($\vdash$) describes single-step transitions
- Accepting computations end in $q_{\text{accept}}$, rejecting in $q_{\text{reject}}$
- Non-halting computations run forever without reaching a halting state
- **Decidability** requires halting on all inputs (accept or reject)
- **Recognizability** only requires accepting exactly the strings in the language
- Time and space complexity measure computational resource usage
- Computation sequences provide proofs of language membership
- Palindrome recognition demonstrates the strategy of matching and marking
- The yields relation's transitive closure ($\vdash^*$) represents multi-step computation
