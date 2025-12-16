# Operational Semantics

Operational semantics defines the meaning of programs by specifying how they execute on an abstract machine. This approach describes computation as a sequence of state transitions, making it intuitive for programmers and invaluable for implementation and debugging.

## Small-Step Operational Semantics

Small-step semantics, also called structural operational semantics or transition semantics, describes computation as a sequence of individual reduction steps. Each step represents the smallest atomic computation, and the overall program execution is the transitive closure of these steps.

Consider a simple expression language with arithmetic and variables. A small-step semantics defines transitions of the form `⟨e, σ⟩ → ⟨e', σ'⟩`, meaning that expression `e` in state `σ` reduces in one step to expression `e'` in state `σ'`.

For example, evaluation rules might include:

```
⟨n, σ⟩ → ⟨n, σ⟩  (numbers are values)

⟨x, σ⟩ → ⟨σ(x), σ⟩  (variable lookup)

⟨e1, σ⟩ → ⟨e1', σ'⟩
─────────────────────────  (left operand reduces)
⟨e1 + e2, σ⟩ → ⟨e1' + e2, σ'⟩

⟨e2, σ⟩ → ⟨e2', σ'⟩
─────────────────────────  (right operand reduces when left is value)
⟨v1 + e2, σ⟩ → ⟨v1 + e2', σ'⟩

─────────────────────────  (addition of values)
⟨n1 + n2, σ⟩ → ⟨n1+n2, σ⟩
```

These rules specify left-to-right evaluation order. To evaluate `(2 + 3) + 4`, we would perform the following sequence:

```
⟨(2 + 3) + 4, σ⟩ → ⟨5 + 4, σ⟩ → ⟨9, σ⟩
```

Small-step semantics excels at modeling fine-grained control flow, concurrent execution, and non-terminating programs. Because it explicitly represents intermediate states, we can reason about programs that don't terminate or that interleave with other computations.

For an imperative language with statements, we might have rules like:

```
⟨skip, σ⟩ → σ  (skip does nothing)

⟨e, σ⟩ → ⟨e', σ'⟩
─────────────────────────  (evaluate expression first)
⟨x := e, σ⟩ → ⟨x := e', σ'⟩

─────────────────────────  (assignment of value)
⟨x := v, σ⟩ → σ[x ↦ v]

⟨s1, σ⟩ → ⟨s1', σ'⟩
─────────────────────────  (execute first statement)
⟨s1; s2, σ⟩ → ⟨s1'; s2, σ'⟩

─────────────────────────  (first statement complete)
⟨skip; s2, σ⟩ → ⟨s2, σ⟩
```

The key advantage of small-step semantics is its flexibility and precision. We can model exactly what happens at each point in execution, including error states, divergence, and interaction with the environment.

## Big-Step Operational Semantics

Big-step semantics, also called natural semantics or evaluation semantics, describes the overall result of evaluating an expression or executing a statement in a single step. Rather than showing intermediate computation steps, big-step semantics directly relates inputs to outputs.

The judgment form for big-step semantics is typically `⟨e, σ⟩ ⇓ ⟨v, σ'⟩`, meaning that expression `e` evaluated in state `σ` produces value `v` and final state `σ'`.

Rules for our arithmetic language would look like:

```
─────────────────  (number evaluates to itself)
⟨n, σ⟩ ⇓ ⟨n, σ⟩

─────────────────  (variable lookup)
⟨x, σ⟩ ⇓ ⟨σ(x), σ⟩

⟨e1, σ⟩ ⇓ ⟨n1, σ1⟩   ⟨e2, σ1⟩ ⇓ ⟨n2, σ2⟩
──────────────────────────────────  (addition)
⟨e1 + e2, σ⟩ ⇓ ⟨n1+n2, σ2⟩
```

Notice how the addition rule directly specifies the complete evaluation: first evaluate `e1`, then evaluate `e2` in the resulting state, then add the values. The intermediate steps are implicit.

For imperative statements:

```
─────────────────  (skip)
⟨skip, σ⟩ ⇓ σ

⟨e, σ⟩ ⇓ ⟨v, σ'⟩
─────────────────────────  (assignment)
⟨x := e, σ⟩ ⇓ σ'[x ↦ v]

⟨s1, σ⟩ ⇓ σ'   ⟨s2, σ'⟩ ⇓ σ''
─────────────────────────────  (sequence)
⟨s1; s2, σ⟩ ⇓ σ''

⟨e, σ⟩ ⇓ ⟨true, σ'⟩   ⟨s1, σ'⟩ ⇓ σ''
─────────────────────────────────────  (if-then-else, true case)
⟨if e then s1 else s2, σ⟩ ⇓ σ''

⟨e, σ⟩ ⇓ ⟨false, σ'⟩   ⟨s2, σ'⟩ ⇓ σ''
─────────────────────────────────────  (if-then-else, false case)
⟨if e then s1 else s2, σ⟩ ⇓ σ''
```

Big-step semantics is more concise than small-step semantics and often easier to work with for proving properties about complete program executions. However, it has limitations: it cannot easily model non-termination, concurrency, or observe intermediate states.

## Comparing Small-Step and Big-Step

The choice between small-step and big-step semantics depends on what properties you want to analyze. Small-step semantics is better for:

- Modeling concurrent or interactive programs
- Reasoning about non-terminating programs
- Analyzing time complexity (count reduction steps)
- Implementing interpreters with debugging capabilities
- Specifying languages with fine-grained control flow (exceptions, continuations)

Big-step semantics is better for:

- Proving correctness of complete program runs
- Simpler proofs about deterministic sequential programs
- Understanding high-level program behavior
- Easier to read and write for simple languages

For example, modeling a while loop reveals the differences:

**Small-step approach:**
```
⟨while e do s, σ⟩ → ⟨if e then (s; while e do s) else skip, σ⟩
```

**Big-step approach:**
```
⟨e, σ⟩ ⇓ ⟨false, σ'⟩
─────────────────────────  (loop exits)
⟨while e do s, σ⟩ ⇓ σ'

⟨e, σ⟩ ⇓ ⟨true, σ'⟩   ⟨s, σ'⟩ ⇓ σ''   ⟨while e do s, σ''⟩ ⇓ σ'''
────────────────────────────────────────────────────────────────  (loop continues)
⟨while e do s, σ⟩ ⇓ σ'''
```

The small-step version shows how the loop "unrolls" one iteration at a time. The big-step version recursively specifies the complete loop execution. Notice that neither handles infinite loops naturally - small-step would have an infinite reduction sequence, while big-step would have no derivation at all.

## Structural Rules and Evaluation Contexts

A powerful technique in operational semantics is the use of evaluation contexts to factor out the specification of evaluation order. An evaluation context is an expression with a hole, written `E[·]`, that specifies where the next reduction should occur.

For our expression language, evaluation contexts might be:

```
E ::= [·] | E + e | v + E
```

This says that the reduction position can be: at the top level, in the left operand of addition, or in the right operand when the left is already a value.

We can then give a single congruence rule:

```
e → e'
─────────────
E[e] → E[e']
```

This states that if `e` reduces to `e'`, then `e` can reduce to `e'` wherever it appears in an evaluation context. This approach makes evaluation order explicit and easier to modify. To change from left-to-right to right-to-left evaluation, we simply swap the context rules.

Evaluation contexts are particularly useful for specifying languages with complex control flow, such as exceptions or first-class continuations, where reduction might occur in non-local positions within the program.
