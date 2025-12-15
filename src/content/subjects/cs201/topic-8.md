# Algorithm Correctness and Completeness

## Introduction

It's not enough for code to run; it must be correct. "It works on my machine" or "it passed 5 test cases" is not a proof. In critical systems (medical, aerospace, financial), we need mathematical guarantees.

Furthermore, some problems are inherently "hard". Understanding which problems cannot be solved efficiently is crucial so you don't waste time trying to optimize the impossible. This leads us to **P vs NP**.

## Learning Objectives

By the end of this topic, you will be able to:
1.  Use **Loop Invariants** to prove iterative algorithms correct.
2.  Use **Induction** to prove recursive algorithms correct.
3.  Define the complexity classes **P**, **NP**, **NP-Complete**, and **NP-Hard**.
4.  Understand the concept of **Reductions**.

## Core Concepts

### 1. Proving Correctness: Loop Invariants

A loop invariant is a property that holds true:
1.  **Initialization:** Before the loop starts.
2.  **Maintenance:** At the start of every iteration.
3.  **Termination:** When the loop ends, the invariant + termination condition implies correctness.

**Example: Insertion Sort**
*Invariant:* The subarray `arr[0..i-1]` consists of the elements originally in `arr[0..i-1]`, but in sorted order.

### 2. Proving Correctness: Induction

For recursion, we use strong induction.
1.  **Base Case:** Show it works for $n=0$ or $n=1$.
2.  **Hypothesis:** Assume it works for all $k < n$.
3.  **Step:** Prove that if it works for smaller inputs, it works for $n$.

### 3. Complexity Classes

-   **P (Polynomial Time):** Problems solvable in $O(n^k)$. (Sorting, Shortest Path). Efficient.
-   **NP (Nondeterministic Polynomial):** Problems where a solution can be *verified* in polynomial time. (Sudoku, Traveling Salesman).
    *   *Note:* P is a subset of NP. (If you can solve it fast, you can verify it fast).
-   **NP-Complete:** The hardest problems in NP. If you solve *one* NP-Complete problem in Polynomial time, you solve *all* NP problems in Polynomial time (P = NP).
    *   Examples: 3-SAT, Traveling Salesman Decision, Knapsack Decision.
-   **NP-Hard:** At least as hard as NP-Complete, but might not be in NP (maybe you can't even verify the solution fast).

### 4. Reductions

To prove a problem $B$ is hard, we take a known hard problem $A$ and show we can transform (reduce) $A$ into $B$.
"If I could solve $B$ efficiently, I could use it to solve $A$ efficiently."
Since $A$ is hard, $B$ must also be hard.

## Common Mistakes

1.  **Confusing NP with "Not Polynomial":** NP stands for *Nondeterministic Polynomial*. It does not mean "Non-Polynomial". Many NP problems might be solvable in P; we just don't know yet (P vs NP).
2.  **Proving by Example:** "It worked for these inputs" is testing, not proving. Proofs must hold for *all* inputs.
3.  **Incomplete Loop Invariants:** Choosing an invariant that is true but doesn't actually prove the goal (e.g., "i increases by 1").

## Best Practices

-   **Write Invariants in Comments:** For complex loops, comment what is true at the start of the loop. It helps debugging.
-   **Recognize NP-Complete Problems:** If your boss asks for an algorithm to schedule shifts optimally satisfying 50 complex constraints, recognize it's likely NP-Complete. Don't try to find an $O(n^2)$ solution. Use heuristics, approximations (Greedy), or solvers.

## Summary

-   **Correctness:** Proved via Invariants and Induction.
-   **Efficiency:** Measured by Big-O.
-   **Feasibility:** Defined by P vs NP.

This topic bridges the gap between "coding" and "computer science". It gives you the limits of computation.
