# Axiomatic Semantics and Hoare Logic

Axiomatic semantics focuses on proving program correctness by specifying the relationship between program statements and logical assertions. Rather than describing how programs execute or what values they produce, axiomatic semantics characterizes what properties hold before and after program execution.

## Hoare Triples and Assertions

The foundation of axiomatic semantics is the Hoare triple, written as `{P} S {Q}`, where:
- `P` is the precondition - an assertion about the program state that must hold before executing statement `S`
- `S` is a program statement or sequence of statements
- `Q` is the postcondition - an assertion about the program state that will hold after executing `S` (if execution terminates)

For example, `{x = 5} y := x + 1 {y = 6}` states that if `x` equals 5 before the assignment, then `y` will equal 6 afterward. More generally, `{x = n} y := x + 1 {y = n + 1}` captures the relationship for any initial value of `x`.

Assertions are logical formulas that can reference program variables. They typically use first-order logic with arithmetic, allowing expressions like:
- `x > 0` - simple inequality
- `x = y + z` - arithmetic relationships
- `∀i. 0 ≤ i < n → a[i] ≥ 0` - properties of arrays
- `length(list) = n ∧ sorted(list)` - complex data structure properties

A Hoare triple is valid (or partially correct) if, whenever the precondition holds and we execute the statement from that state, if execution terminates, the postcondition will hold. This is called partial correctness because it says nothing about whether the program terminates.

Total correctness adds the requirement that execution must terminate. We write `[P] S [Q]` for total correctness, meaning that from any state satisfying `P`, executing `S` will terminate in a state satisfying `Q`.

## Inference Rules for Hoare Logic

Hoare logic defines inference rules that allow us to derive valid Hoare triples compositionally. Each programming language construct has associated proof rules.

**Assignment Rule:**
```
{P[e/x]} x := e {P}
```

This rule works backward: to achieve postcondition `P` after the assignment `x := e`, we need precondition `P[e/x]`, which is `P` with every occurrence of `x` replaced by expression `e`.

Example: To prove `{?} x := x + 1 {x > 5}`, we substitute `x + 1` for `x` in the postcondition:
```
{x + 1 > 5} x := x + 1 {x > 5}
which simplifies to:
{x > 4} x := x + 1 {x > 5}
```

**Sequence Rule:**
```
{P} S1 {Q}    {Q} S2 {R}
────────────────────────
{P} S1; S2 {R}
```

To prove a property about a sequence of statements, find an intermediate assertion `Q` that holds after `S1` and serves as the precondition for `S2`.

Example:
```
{x = 5} y := x {y = 5}    {y = 5} z := y + 1 {z = 6}
──────────────────────────────────────────────────────
{x = 5} y := x; z := y + 1 {z = 6}
```

**Conditional Rule:**
```
{P ∧ e} S1 {Q}    {P ∧ ¬e} S2 {Q}
─────────────────────────────────
{P} if e then S1 else S2 {Q}
```

For the then-branch, we can assume `e` is true in addition to `P`. For the else-branch, we assume `e` is false.

Example proving that absolute value works:
```
{true ∧ x ≥ 0} y := x {y = |x|}
{true ∧ x < 0} y := -x {y = |x|}
────────────────────────────────────
{true} if x ≥ 0 then y := x else y := -x {y = |x|}
```

**While Loop Rule:**
```
{P ∧ e} S {P}
──────────────────────────
{P} while e do S {P ∧ ¬e}
```

The assertion `P` is called a loop invariant - it holds before the loop, remains true after each iteration, and holds when the loop exits. After the loop, we additionally know that the loop condition `e` is false.

Finding loop invariants is the key challenge in verifying loops. The invariant must be:
- Initially true: `P` holds before entering the loop
- Preserved by each iteration: `{P ∧ e} S {P}`
- Strong enough: `P ∧ ¬e` implies the desired postcondition

## Loop Invariants and Verification

Consider verifying a loop that computes factorial:

```c
// Compute n!
{n ≥ 0}
i := 1;
fact := 1;
while i ≤ n do
    fact := fact * i;
    i := i + 1;
{fact = n!}
```

We need a loop invariant that:
1. Is true initially (after `i := 1; fact := 1`)
2. Is maintained by each iteration
3. Implies `fact = n!` when `i > n`

A suitable invariant is: `P ≡ fact = i! ∧ 1 ≤ i ≤ n + 1`

Let's verify this works:

**Initially true**: After `i := 1; fact := 1`, we have `fact = 1 = 0! = (i-1)!` and `i = 1`, so the invariant holds with a slight adjustment: `fact = (i-1)!`.

**Preserved by iteration**: Assume `P ∧ i ≤ n`. After `fact := fact * i`, we have `fact = (i-1)! * i = i!`. After `i := i + 1`, we have `fact = (i-1)!` again (in terms of the new `i`). So `P` still holds.

**Implies postcondition**: When the loop exits, `i > n` and `P` hold, so `i = n + 1` and `fact = (i-1)! = n!`.

This demonstrates the power of loop invariants: they reduce reasoning about an unbounded number of loop iterations to checking three local conditions.

## Weakest Precondition Calculus

An alternative formulation of axiomatic semantics uses weakest preconditions. For statement `S` and postcondition `Q`, the weakest precondition `wp(S, Q)` is the weakest (most general) condition that guarantees executing `S` from any state satisfying it will result in a state satisfying `Q`.

The relationship to Hoare triples is: `{P} S {Q}` is valid if and only if `P ⇒ wp(S, Q)`.

Weakest precondition rules work forward from the postcondition:

```
wp(x := e, Q) = Q[e/x]

wp(S1; S2, Q) = wp(S1, wp(S2, Q))

wp(if e then S1 else S2, Q) =
    (e ⇒ wp(S1, Q)) ∧ (¬e ⇒ wp(S2, Q))

wp(while e do S, Q) = P where P is the weakest invariant such that:
    (P ∧ ¬e ⇒ Q) ∧ (P ∧ e ⇒ wp(S, P))
```

Weakest preconditions are particularly useful for automated verification because they provide a mechanical way to generate verification conditions.

## Verification Conditions and Automated Verification

The verification condition (VC) approach reduces program verification to proving logical formulas. Given a program annotated with preconditions, postconditions, and loop invariants, we systematically generate VCs whose validity implies program correctness.

For a program:
```
{P}
S1;
while e do
    {I}  // loop invariant
    S2;
{Q}
```

We generate VCs:
1. Precondition establishes first invariant: `P ⇒ wp(S1, I)`
2. Invariant is preserved: `I ∧ e ⇒ wp(S2, I)`
3. Invariant and exit condition imply postcondition: `I ∧ ¬e ⇒ Q`

These VCs are pure logical formulas without program statements. We can use automated theorem provers like Z3, CVC4, or Alt-Ergo to check their validity.

Modern verification tools like Dafny, Why3, and Frama-C use this approach. Programmers annotate their code with specifications, the tool generates VCs, and automated provers attempt to discharge them. If the provers succeed, the program is proved correct. If they fail, the programmer must either strengthen the annotations or prove the VCs manually.

## Soundness and Completeness of Hoare Logic

Hoare logic is sound: if we can derive `{P} S {Q}`, then the triple is semantically valid. This means our proof system doesn't allow proving false statements.

For deterministic while programs over arithmetic, Hoare logic is also relatively complete: if `{P} S {Q}` is semantically valid and the assertions are expressible in the logic, then we can derive it in Hoare logic. However, this assumes we can prove all valid arithmetic formulas, which is undecidable by Godel's theorem.

In practice, incompleteness means that some correct programs cannot be verified automatically. We might need to add auxiliary lemmas, strengthen invariants, or use more powerful logics.

## Extensions and Applications

Modern program verification extends Hoare logic in several ways:

**Separation Logic** adds support for reasoning about heap-allocated data structures, pointers, and aliasing. It introduces the separating conjunction `P * Q`, meaning `P` and `Q` hold for disjoint parts of the heap.

**Rely-Guarantee Logic** handles concurrent programs by specifying what each thread relies on from the environment and what it guarantees to the environment.

**Permission-based Logics** track ownership and access rights to resources, enabling modular verification of complex systems.

These advanced logics build on the Hoare logic foundation, extending it to handle the complexities of real-world software while maintaining compositionality and mechanical verification.
