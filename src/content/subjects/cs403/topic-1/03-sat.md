# Boolean Satisfiability: SAT, 3-SAT, CNF, and DPLL

## Introduction

The Boolean Satisfiability Problem (SAT) is the prototypical NP-complete problem and the foundation of computational complexity theory. SAT asks a deceptively simple question: given a Boolean formula, does there exist an assignment of truth values to variables that makes the formula evaluate to true?

Despite being proven NP-complete in 1971, SAT has become one of the most practical and widely-used NP-complete problems. Modern SAT solvers can handle formulas with millions of variables and are used in hardware verification, software testing, cryptanalysis, scheduling, and many other applications.

## Boolean Formulas and Satisfiability

### Boolean Variables and Operations

A **Boolean variable** takes values from $\{0, 1\}$ or equivalently $\{\text{false}, \text{true}\}$.

**Basic operations:**
- **NOT** ($\neg$): $\neg x$ is true iff $x$ is false
- **AND** ($\land$): $x \land y$ is true iff both $x$ and $y$ are true
- **OR** ($\lor$): $x \lor y$ is true iff at least one of $x$ or $y$ is true

**Derived operations:**
- **IMPLIES** ($\Rightarrow$): $x \Rightarrow y \equiv \neg x \lor y$
- **IFF** ($\Leftrightarrow$): $x \Leftrightarrow y \equiv (x \Rightarrow y) \land (y \Rightarrow x)$
- **XOR** ($\oplus$): $x \oplus y \equiv (x \land \neg y) \lor (\neg x \land y)$
- **NAND**: $x \uparrow y \equiv \neg(x \land y)$
- **NOR**: $x \downarrow y \equiv \neg(x \lor y)$

### Literals and Clauses

A **literal** is either a variable $x$ (positive literal) or its negation $\neg x$ (negative literal).

A **clause** is a disjunction (OR) of literals:
$$C = l_1 \lor l_2 \lor \cdots \lor l_k$$

Examples:
- $(x_1 \lor \neg x_2 \lor x_3)$ is a clause with 3 literals
- $(x)$ is a unit clause with 1 literal
- $(\neg x \lor \neg y)$ is a clause with 2 literals

A clause is satisfied if at least one of its literals evaluates to true.

### The SAT Problem

**Problem**: Boolean Satisfiability (SAT)

**Input**: A Boolean formula $\phi$ in propositional logic

**Question**: Does there exist a truth assignment $\alpha: \text{vars}(\phi) \to \{0, 1\}$ such that $\phi$ evaluates to true?

**Example**:
$$\phi = (x_1 \lor x_2) \land (\neg x_1 \lor x_3) \land (\neg x_2 \lor \neg x_3)$$

**Solution**: $\alpha(x_1) = 1, \alpha(x_2) = 0, \alpha(x_3) = 1$ satisfies $\phi$:
- $(x_1 \lor x_2) = (1 \lor 0) = 1$ ✓
- $(\neg x_1 \lor x_3) = (0 \lor 1) = 1$ ✓
- $(\neg x_2 \lor \neg x_3) = (1 \lor 0) = 1$ ✓

Therefore, $\phi$ is satisfiable.

## Conjunctive Normal Form (CNF)

### Definition

A Boolean formula is in **Conjunctive Normal Form (CNF)** if it is a conjunction (AND) of clauses:

$$\phi = C_1 \land C_2 \land \cdots \land C_m$$

where each $C_i$ is a disjunction of literals.

**Example**:
$$(x_1 \lor x_2 \lor \neg x_3) \land (\neg x_1 \lor x_4) \land (x_2 \lor \neg x_4 \lor x_5)$$

### Why CNF?

CNF is the standard form for SAT because:

1. **Universality**: Every Boolean formula can be converted to CNF
2. **Simplicity**: Easy to check satisfiability of individual clauses
3. **Locality**: Each clause is an independent constraint
4. **Algorithm design**: Many SAT algorithms work directly on CNF

### Converting to CNF

#### Method 1: Truth Table

For a formula $\phi$ with $n$ variables:
1. Construct the truth table ($2^n$ rows)
2. For each row where $\phi$ is false, create a clause that rules out that assignment
3. Take the conjunction of all such clauses

**Example**: Convert $\phi = x_1 \Rightarrow (x_2 \land x_3)$ to CNF

Truth table:
| $x_1$ | $x_2$ | $x_3$ | $\phi$ |
|-------|-------|-------|--------|
| 0     | 0     | 0     | 1      |
| 0     | 0     | 1     | 1      |
| 0     | 1     | 0     | 1      |
| 0     | 1     | 1     | 1      |
| 1     | 0     | 0     | 0      | ← Clause: $(\neg x_1 \lor x_2 \lor x_3)$
| 1     | 0     | 1     | 0      | ← Clause: $(\neg x_1 \lor x_2 \lor \neg x_3)$... Wait, this is wrong

Actually, for each row where $\phi$ is false, we create a clause of literals that rules out that assignment:
- Row $(1, 0, 0)$: Clause $(\neg x_1 \lor x_2 \lor x_3)$
- Row $(1, 0, 1)$: Clause $(\neg x_1 \lor x_2 \lor \neg x_3)$
- Row $(1, 1, 0)$: Clause $(\neg x_1 \lor \neg x_2 \lor x_3)$

But this is inefficient. Better method:

#### Method 2: Algebraic Conversion

1. **Eliminate implications**: $x \Rightarrow y \equiv \neg x \lor y$
2. **Eliminate biconditionals**: $x \Leftrightarrow y \equiv (x \Rightarrow y) \land (y \Rightarrow x)$
3. **Push negations inward** (De Morgan's laws):
   - $\neg(x \land y) \equiv \neg x \lor \neg y$
   - $\neg(x \lor y) \equiv \neg x \land \neg y$
   - $\neg \neg x \equiv x$
4. **Distribute OR over AND**:
   - $x \lor (y \land z) \equiv (x \lor y) \land (x \lor z)$

**Example**: Convert $(x_1 \lor (x_2 \land x_3))$

Already in CNF? No, we have OR over AND.

Apply distribution:
$$x_1 \lor (x_2 \land x_3) \equiv (x_1 \lor x_2) \land (x_1 \lor x_3)$$

Now in CNF: $(x_1 \lor x_2) \land (x_1 \lor x_3)$

**Example 2**: Convert $\neg((x_1 \land x_2) \lor (x_3 \land x_4))$

Apply De Morgan:
$$\neg((x_1 \land x_2) \lor (x_3 \land x_4)) \equiv \neg(x_1 \land x_2) \land \neg(x_3 \land x_4)$$

Apply De Morgan again:
$$\equiv (\neg x_1 \lor \neg x_2) \land (\neg x_3 \lor \neg x_4)$$

Now in CNF.

#### Method 3: Tseitin Transformation

The distribution method can cause exponential blow-up. The **Tseitin transformation** adds auxiliary variables to keep formula size linear.

**Idea**: For each sub-formula, introduce a new variable and add clauses enforcing the equivalence.

**Example**: Convert $(x_1 \land x_2) \lor (x_3 \land x_4)$

Introduce variables:
- $y_1 \Leftrightarrow (x_1 \land x_2)$
- $y_2 \Leftrightarrow (x_3 \land x_4)$
- $y_3 \Leftrightarrow (y_1 \lor y_2)$

Encode each equivalence as CNF:
- $y_1 \Leftrightarrow (x_1 \land x_2)$:
  - $(\neg y_1 \lor x_1) \land (\neg y_1 \lor x_2)$ (if $y_1$ then $x_1$ and $x_2$)
  - $(y_1 \lor \neg x_1 \lor \neg x_2)$ (if $x_1$ and $x_2$ then $y_1$)

- $y_2 \Leftrightarrow (x_3 \land x_4)$:
  - $(\neg y_2 \lor x_3) \land (\neg y_2 \lor x_4) \land (y_2 \lor \neg x_3 \lor \neg x_4)$

- $y_3 \Leftrightarrow (y_1 \lor y_2)$:
  - $(\neg y_3 \lor y_1 \lor y_2) \land (y_3 \lor \neg y_1) \land (y_3 \lor \neg y_2)$

Final formula: $y_3 \land$ (all the equivalence clauses)

Size: $O(n)$ instead of potentially $O(2^n)$.

## 3-SAT

### Definition

**3-SAT** is SAT restricted to formulas in CNF where each clause has exactly 3 literals.

**Example**:
$$(x_1 \lor x_2 \lor \neg x_3) \land (\neg x_1 \lor x_2 \lor x_4) \land (x_3 \lor \neg x_4 \lor x_5)$$

### NP-Completeness of 3-SAT

**Theorem**: 3-SAT is NP-complete.

We showed the reduction from SAT to 3-SAT in the previous section. The key insight is that any clause can be transformed to an equivalent set of 3-clauses:

- **1 literal** $(l)$: Convert to $(l \lor y \lor z) \land (l \lor y \lor \neg z) \land (l \lor \neg y \lor z) \land (l \lor \neg y \lor \neg z)$
- **2 literals** $(l_1 \lor l_2)$: Convert to $(l_1 \lor l_2 \lor y) \land (l_1 \lor l_2 \lor \neg y)$
- **3 literals**: Keep as is
- **k > 3 literals** $(l_1 \lor \cdots \lor l_k)$: Convert to $(l_1 \lor l_2 \lor y_1) \land (\neg y_1 \lor l_3 \lor y_2) \land \cdots$

### Variants of SAT

**2-SAT**: Each clause has at most 2 literals
- **In P**: Solvable in linear time using strongly connected components
- **Not NP-complete** (unless P = NP)

**Horn-SAT**: Each clause has at most one positive literal
- **In P**: Solvable in linear time using unit propagation
- **Used in logic programming** (Prolog)

**XOR-SAT**: Each clause is an XOR of variables
- **In P**: Solvable using Gaussian elimination
- **Linear algebraic structure**

**MAX-SAT**: Maximize the number of satisfied clauses
- **NP-hard**: Even for 2-SAT
- **Approximation algorithms** exist

**XSAT** (Exact SAT): Each clause must have exactly one true literal
- **NP-complete**: Reduction from 3-SAT

## The DPLL Algorithm

The **Davis-Putnam-Logemann-Loveland (DPLL)** algorithm is the foundation of modern SAT solvers. It's a backtracking search with intelligent pruning.

### Core Ideas

1. **Unit propagation**: If a clause has only one unassigned literal, assign it to satisfy the clause
2. **Pure literal elimination**: If a variable appears only positively (or only negatively), assign it appropriately
3. **Backtracking**: Try assigning a variable, and backtrack if it leads to contradiction

### Algorithm

```
function DPLL(φ):
    // Base cases
    if φ is empty (all clauses satisfied):
        return SATISFIABLE

    if φ contains an empty clause:
        return UNSATISFIABLE

    // Unit propagation
    while φ contains a unit clause (l):
        φ := assign(φ, l, true)

    // Pure literal elimination
    while φ contains a pure literal l:
        φ := assign(φ, l, true)

    // Choose a variable to branch on
    choose an unassigned variable x in φ

    // Try assigning x to true
    if DPLL(assign(φ, x, true)) == SATISFIABLE:
        return SATISFIABLE

    // Try assigning x to false
    if DPLL(assign(φ, x, false)) == SATISFIABLE:
        return SATISFIABLE

    return UNSATISFIABLE
```

### Unit Propagation

**Unit clause**: A clause with only one unassigned literal.

If $(l)$ is a unit clause, we must assign $l = \text{true}$ to satisfy the clause.

**Propagation**: After assigning $l = \text{true}$:
1. Remove all clauses containing $l$ (satisfied)
2. Remove $\neg l$ from all clauses (literal is false)

**Example**:
$$\phi = (x_1 \lor x_2) \land (x_1) \land (\neg x_1 \lor x_3)$$

Unit clause: $(x_1)$, so assign $x_1 = \text{true}$

After propagation:
- Remove $(x_1 \lor x_2)$ (satisfied by $x_1$)
- Remove $(x_1)$ (satisfied)
- Remove $\neg x_1$ from $(\neg x_1 \lor x_3)$, leaving $(x_3)$

New formula: $(x_3)$ (another unit clause!)

Propagate $x_3 = \text{true}$: $\phi$ is satisfied.

### Pure Literal Elimination

**Pure literal**: A literal that appears only in one polarity (either always positive or always negative).

If $x$ is pure positive (appears as $x$ but never $\neg x$), assign $x = \text{true}$.

If $x$ is pure negative (appears as $\neg x$ but never $x$), assign $x = \text{false}$.

**Example**:
$$\phi = (x_1 \lor x_2) \land (\neg x_1 \lor x_3) \land (x_2 \lor x_4)$$

Variable $x_4$ appears only positively, so assign $x_4 = \text{true}$.

After elimination: $\phi = (x_1 \lor x_2) \land (\neg x_1 \lor x_3)$

Variable $x_3$ appears only positively, so assign $x_3 = \text{true}$.

After elimination: $\phi = (x_1 \lor x_2)$

Now $x_1$ and $x_2$ are both pure positive. Assign both to true: $\phi$ is satisfied.

### Complexity Analysis

**Worst-case**: $O(2^n)$ where $n$ is the number of variables.

**Why**: In the worst case, the algorithm tries all $2^n$ possible assignments.

However, unit propagation and pure literal elimination significantly prune the search space in practice.

### Example Trace

Solve $\phi = (x_1 \lor x_2 \lor x_3) \land (\neg x_1 \lor \neg x_2) \land (\neg x_1 \lor \neg x_3) \land (\neg x_2 \lor \neg x_3)$

**Step 1**: No unit clauses, no pure literals. Choose $x_1$.

**Branch 1**: Try $x_1 = \text{true}$
- Propagate: Remove $(x_1 \lor x_2 \lor x_3)$
- Remove $\neg x_1$ from $(\neg x_1 \lor \neg x_2)$, leaving $(\neg x_2)$ (unit clause)
- Remove $\neg x_1$ from $(\neg x_1 \lor \neg x_3)$, leaving $(\neg x_3)$ (unit clause)
- Formula: $(\neg x_2) \land (\neg x_3) \land (\neg x_2 \lor \neg x_3)$

Propagate $\neg x_2$ (assign $x_2 = \text{false}$):
- Remove $(\neg x_2)$
- Remove $(\neg x_2 \lor \neg x_3)$
- Formula: $(\neg x_3)$

Propagate $\neg x_3$ (assign $x_3 = \text{false}$):
- Remove $(\neg x_3)$
- Formula is empty: SATISFIABLE!

**Solution**: $x_1 = \text{true}, x_2 = \text{false}, x_3 = \text{false}$

Verify:
- $(x_1 \lor x_2 \lor x_3) = (\text{true} \lor \text{false} \lor \text{false}) = \text{true}$ ✓
- $(\neg x_1 \lor \neg x_2) = (\text{false} \lor \text{true}) = \text{true}$ ✓
- $(\neg x_1 \lor \neg x_3) = (\text{false} \lor \text{true}) = \text{true}$ ✓
- $(\neg x_2 \lor \neg x_3) = (\text{true} \lor \text{true}) = \text{true}$ ✓

## Modern SAT Solving

### Conflict-Driven Clause Learning (CDCL)

Modern SAT solvers use **CDCL**, which extends DPLL with:

1. **Conflict analysis**: When a conflict occurs, analyze the implication graph to learn a new clause
2. **Non-chronological backtracking**: Backtrack to the decision level that caused the conflict
3. **Clause database management**: Keep learned clauses, but periodically delete less useful ones

**Example**: Suppose we have:
$$\phi = (x_1 \lor x_2) \land (\neg x_1 \lor x_3) \land (\neg x_2 \lor \neg x_3) \land (\neg x_1 \lor \neg x_3)$$

Decision: $x_1 = \text{true}$ (decision level 1)
- Implies: $x_3 = \text{true}$ (from $\neg x_1 \lor x_3$)

Decision: $x_2 = \text{true}$ (decision level 2)
- Conflict: $(\neg x_2 \lor \neg x_3)$ is violated

**Conflict analysis**:
- $\neg x_2$ and $\neg x_3$ are required
- $x_3$ was implied by $x_1$
- Therefore, $\neg x_1$ is required

**Learned clause**: $(\neg x_1)$

Backtrack to decision level 0, and propagate $x_1 = \text{false}$.

### Heuristics

**Variable selection**: Which variable to branch on?
- **VSIDS** (Variable State Independent Decaying Sum): Track variable activity in conflicts
- **Phase saving**: Remember previous assignments to guide future choices

**Clause deletion**: Which learned clauses to keep?
- **LBD** (Literal Block Distance): Measure clause "glue" (how many decision levels it spans)
- Keep clauses with low LBD

### Performance

Modern SAT solvers (like MiniSat, Glucose, CryptoMiniSat) can:
- Solve industrial instances with millions of variables
- Prove unsatisfiability for hard random formulas
- Handle formulas from hardware verification, software testing, and scheduling

## Applications of SAT

### Hardware Verification

**Problem**: Verify that a circuit implements a specification.

**Encoding**:
- Variables represent wire values at different time steps
- Clauses enforce gate behavior
- Add constraints for specification
- Check if the circuit can violate the specification (satisfiability)

### Software Bounded Model Checking

**Problem**: Find bugs in programs within $k$ steps.

**Encoding**:
- Variables represent program state at each step
- Clauses encode program semantics (assignments, branches)
- Add assertion violations as satisfiable targets

### Cryptanalysis

**Problem**: Break a cryptographic hash or cipher.

**Encoding**:
- Variables represent key bits and intermediate values
- Clauses encode the encryption algorithm
- Add known plaintext/ciphertext pairs
- Solve for the key

### Scheduling and Planning

**Problem**: Assign tasks to resources over time.

**Encoding**:
- Variables represent task-resource-time assignments
- Clauses enforce constraints (precedence, capacity)
- Find a satisfying assignment

## Conclusion

SAT is the foundation of computational complexity theory and a practical tool for solving real-world problems. Understanding SAT, CNF, and DPLL is essential for:

1. **Theoretical complexity**: Proving NP-completeness results
2. **Algorithm design**: Building solvers and reductions
3. **Practical applications**: Leveraging modern SAT solvers for verification, testing, and optimization

The journey from the Cook-Levin theorem to modern CDCL solvers demonstrates how theoretical insights can lead to powerful practical tools.
