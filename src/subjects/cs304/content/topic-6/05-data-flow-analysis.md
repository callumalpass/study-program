# Data Flow Analysis

Data flow analysis is the foundation of many compiler optimizations. It systematically determines properties about how values flow through a program—where variables are defined, where those definitions reach, which variables are live, and what expressions are available. This information enables the compiler to safely perform transformations that improve performance while preserving program semantics.

## Fundamentals of Data Flow Analysis

Data flow analysis operates on a program's Control Flow Graph (CFG), where nodes represent basic blocks and edges represent control flow. The analysis computes facts about program properties at each program point by solving a system of equations derived from the program structure.

**Key Concepts**:

**Program Points**: Locations in the program where we want to know data flow facts. Typically, we analyze facts at the entry and exit of each basic block.

**Transfer Functions**: Describe how a basic block transforms data flow information from input to output. Each block has a transfer function that models its effect on the property being analyzed.

**Meet Operator**: Combines information from multiple predecessor blocks. Common meet operators are intersection (AND) and union (OR).

**Fixed Point Iteration**: Most data flow analyses are solved iteratively, repeatedly applying transfer functions until the solution converges (reaches a fixed point where no more changes occur).

## Framework for Data Flow Analysis

A data flow analysis framework consists of:

1. **Direction**: Forward (analyzing from entry to exit) or backward (analyzing from exit to entry)
2. **Domain**: The set of possible values for the data flow facts
3. **Transfer Function**: How each basic block transforms the facts
4. **Meet Operator**: How to combine facts from multiple paths
5. **Initial Values**: Starting values for the iterative computation

**Generic Iterative Algorithm**:

```
// Forward data flow analysis
for each basic block B:
    OUT[B] = ∅ or Universal Set (depending on analysis)

repeat until no changes:
    for each basic block B:
        IN[B] = meet(OUT[P]) for all predecessors P of B
        OUT[B] = transfer_function(IN[B], B)
```

## Reaching Definitions Analysis

Reaching definitions analysis determines, for each program point, which variable definitions might reach that point without being overwritten.

**Definition**: A definition of variable `x` reaches a point `p` if there exists a path from the definition to `p` where `x` is not redefined.

**Purpose**: Supports constant propagation, copy propagation, and use-def chains.

```c
// Example
int x = 5;      // Definition d1 of x
int y = x;      // d1 reaches here
if (condition) {
    x = 10;     // Definition d2 of x
} else {
    x = 20;     // Definition d3 of x
}
int z = x;      // d2 and d3 reach here (but not d1)
```

**Analysis Properties**:
- **Direction**: Forward
- **Domain**: Sets of definitions
- **Meet Operator**: Union (∪) - a definition reaches if it reaches via ANY path
- **Transfer Function**:
  ```
  OUT[B] = (IN[B] - KILL[B]) ∪ GEN[B]
  ```
  where GEN[B] is definitions generated in B, and KILL[B] is definitions killed (overwritten) by B

**Example Computation**:

```c
// Basic blocks with definitions
B1: x = 1;      // d1
    y = 2;      // d2

B2: if (cond)
    goto B3 else goto B4

B3: x = 3;      // d3

B4: y = 4;      // d4

B5: z = x + y;

// GEN and KILL sets:
B1: GEN = {d1, d2}, KILL = {d3, d4}
B3: GEN = {d3}, KILL = {d1}
B4: GEN = {d4}, KILL = {d2}

// After convergence:
IN[B5] = {d2, d3, d4} ∪ {d1, d4, d3}
       = {d1, d2, d3, d4}  (all definitions might reach)
```

## Live Variable Analysis

Live variable analysis determines which variables hold values that may be used in the future. A variable is live at a point if there exists a path to a use of the variable without an intervening definition.

**Definition**: Variable `x` is live at point `p` if there is a path from `p` to a use of `x` where `x` is not redefined.

**Purpose**: Supports dead code elimination and register allocation.

```c
// Example
int x = 5;      // x is live after this
int y = x + 2;  // x is used here, x dies, y becomes live
if (condition) {
    int z = y;  // y is used here
}
// y is dead here if not used later
```

**Analysis Properties**:
- **Direction**: Backward (analyze from uses back to definitions)
- **Domain**: Sets of variables
- **Meet Operator**: Union (∪) - a variable is live if it's live on ANY successor path
- **Transfer Function**:
  ```
  IN[B] = (OUT[B] - DEF[B]) ∪ USE[B]
  ```
  where USE[B] is variables used before being defined in B, and DEF[B] is variables defined in B

**Example Computation**:

```c
// B1
int a = 1;
int b = 2;

// B2: if (cond)

// B3
int c = a + b;

// B4
int d = a;

// B5 (after B3 and B4)
return c + d;

// Live variable analysis:
OUT[B3] = {c, d}  (live variables after B3)
IN[B3] = ({c, d} - {c}) ∪ {a, b} = {a, b, d}

OUT[B4] = {c, d}
IN[B4] = ({c, d} - {d}) ∪ {a} = {a, c}

OUT[B2] = IN[B3] ∪ IN[B4] = {a, b, c, d}
IN[B1] = ({a, b, c, d} - {a, b}) ∪ {} = {c, d}
```

## Available Expressions Analysis

Available expressions analysis determines which expressions have been computed and not subsequently invalidated (by modifications to their operands) at each program point.

**Definition**: Expression `e` is available at point `p` if on ALL paths from entry to `p`, expression `e` has been computed and none of its operands have been redefined.

**Purpose**: Supports common subexpression elimination.

```c
// Example
int a = x + y;      // x + y is available after this
int b = 2;
if (condition) {
    int c = x + y;  // x + y is available here (can reuse a)
    z = 5;
} else {
    x = 10;         // x + y becomes unavailable (x modified)
}
int d = x + y;      // x + y NOT available (not on all paths)
```

**Analysis Properties**:
- **Direction**: Forward
- **Domain**: Sets of expressions
- **Meet Operator**: Intersection (∩) - expression available only if available on ALL paths
- **Transfer Function**:
  ```
  OUT[B] = (IN[B] - KILL[B]) ∪ GEN[B]
  ```
  where GEN[B] is expressions computed in B, and KILL[B] is expressions using variables modified in B

**Example Computation**:

```c
// B1
a = x + y;      // Generates (x + y)

// B2: if (cond)

// B3
b = x + y;      // (x + y) is available in IN[B3]
c = a + b;      // Generates (a + b)

// B4
x = 5;          // Kills (x + y), (a + b)
d = x + y;      // Generates new (x + y)

// B5 (join point)
e = x + y;      // Is (x + y) available?

// Available expressions at IN[B5]:
// From B3: {(x + y), (a + b)}
// From B4: {(x + y)} (different x + y)
// Intersection: {} - (x + y) from B4 uses different x value
```

## Very Busy Expressions Analysis

Very busy expressions analysis is the opposite of available expressions. An expression is very busy at a point if it will be used on ALL paths from that point before any of its operands are redefined.

**Definition**: Expression `e` is very busy at point `p` if on ALL paths from `p`, expression `e` is evaluated before any operand of `e` is redefined.

**Purpose**: Supports code hoisting and partial redundancy elimination.

```c
// Example
if (condition) {
    // x + y is very busy here
    a = x + y;
} else {
    // x + y is very busy here
    b = x + y;
}
// We can hoist: temp = x + y before the if
```

**Analysis Properties**:
- **Direction**: Backward
- **Domain**: Sets of expressions
- **Meet Operator**: Intersection (∩) - expression is very busy only if busy on ALL paths
- **Transfer Function**:
  ```
  IN[B] = (OUT[B] - KILL[B]) ∪ USE[B]
  ```

## Constant Propagation Analysis

Constant propagation determines which variables have constant values at each program point. This is more complex than other analyses because it's not a simple set problem—we need to track specific values.

**Lattice Values**:
- **⊤ (Top)**: Variable has unknown/undefined value
- **c (Constant)**: Variable has specific constant value c
- **⊥ (Bottom)**: Variable has multiple possible values (not constant)

```c
// Example
int x = 5;      // x = 5
if (condition) {
    x = 5;      // x = 5
} else {
    x = 5;      // x = 5
}
int y = x;      // x = 5 here (same on all paths)

int a = 10;     // a = 10
if (condition) {
    a = 10;     // a = 10
} else {
    a = 20;     // a = 20
}
int b = a;      // a = ⊥ (multiple values)
```

**Meet Operator for Constants**:
```
⊤ ∧ c = c       (unknown meet constant = constant)
c ∧ c = c       (same constant meet same constant = constant)
c₁ ∧ c₂ = ⊥     (different constants = not constant)
⊥ ∧ x = ⊥       (not constant meet anything = not constant)
```

## Use-Def and Def-Use Chains

While not a data flow analysis per se, use-def and def-use chains are data structures built from reaching definitions that efficiently represent data flow relationships.

**Use-Def Chain**: For each use of a variable, points to all definitions that might reach that use.

**Def-Use Chain**: For each definition, points to all uses that the definition might reach.

```c
int x = 5;      // d1
int y = x;      // u1 (use of x)
x = 10;         // d2
int z = x;      // u2 (use of x)

// Use-Def chains:
u1 → {d1}       (use at y = x reaches definition d1)
u2 → {d2}       (use at z = x reaches definition d2)

// Def-Use chains:
d1 → {u1}       (definition x = 5 reaches use y = x)
d2 → {u2}       (definition x = 10 reaches use z = x)
```

## SSA Form and Data Flow

Static Single Assignment (SSA) form is an intermediate representation where each variable is assigned exactly once. This simplifies many data flow analyses by making def-use relationships explicit.

```c
// Original code
int x = 5;
if (condition) {
    x = 10;
} else {
    x = 20;
}
int y = x;

// SSA form
int x₁ = 5;
if (condition) {
    x₂ = 10;
} else {
    x₃ = 20;
}
x₄ = φ(x₂, x₃)  // φ function merges values from different paths
int y = x₄;
```

**Benefits for Data Flow**:
- Use-def chains are trivial (each use has exactly one definition)
- Many analyses become simpler
- Optimizations are easier to implement correctly

## Precision and Approximation

Data flow analyses make trade-offs between precision and cost:

**Flow-Sensitive**: Distinguishes between different program points (most common)

**Flow-Insensitive**: Computes a single fact for the entire function (faster but less precise)

**Context-Sensitive**: Distinguishes between different calling contexts for function calls (more expensive)

**Path-Sensitive**: Distinguishes between different paths through the program (most expensive)

Most practical analyses are flow-sensitive but not path-sensitive, using conservative approximations (over-approximation for "may" analyses, under-approximation for "must" analyses).

## Key Takeaways

- Data flow analysis systematically computes facts about how values flow through programs, enabling safe and effective optimizations.
- Reaching definitions identifies which variable definitions reach each program point, supporting constant and copy propagation.
- Live variable analysis determines which variables hold values that may be used later, enabling dead code elimination and register allocation.
- Available expressions analysis finds expressions that have been computed on all paths without operand modifications, enabling common subexpression elimination.
- Analyses are characterized by direction (forward/backward), domain, meet operator, and transfer function.
- Most analyses use fixed-point iteration, repeatedly updating facts until convergence.
- SSA form simplifies many data flow analyses by making def-use relationships explicit.
- Trade-offs between precision and cost lead to different analysis strategies: flow-sensitive vs. flow-insensitive, context-sensitive vs. context-insensitive.
