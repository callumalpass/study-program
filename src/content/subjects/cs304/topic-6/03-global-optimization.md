# Global Optimization

Global optimization extends beyond individual basic blocks to analyze and optimize entire functions. Unlike local optimization, which can use simple single-pass algorithms, global optimization must reason about control flow, multiple execution paths, and the interaction between different parts of a function. These optimizations often provide substantial performance improvements but require more sophisticated analysis techniques.

## Control Flow Analysis

Before performing global optimizations, the compiler constructs a Control Flow Graph (CFG) representing the function's structure. Each node in the CFG is a basic block, and edges represent possible control flow between blocks.

```c
int example(int x) {
    int result = 0;           // Block 1 (Entry)

    if (x > 0) {              // Block 1 exit
        result = x * 2;       // Block 2
    } else {
        result = x * 3;       // Block 3
    }

    return result;            // Block 4 (Exit)
}

// CFG:
//     [Block 1]
//      /     \
// [Block 2] [Block 3]
//      \     /
//     [Block 4]
```

Understanding the CFG structure is essential for determining where variables are defined, where their values are used, and which optimizations are safe to apply.

## Common Subexpression Elimination (CSE)

Common Subexpression Elimination identifies expressions that are computed multiple times with the same operand values and replaces redundant computations with references to a previously computed value.

**Basic CSE Example**:

```c
// Before
int a = b + c;
int d = e * f;
int g = b + c;      // Same as a (if b and c unchanged)
int h = e * f;      // Same as d (if e and f unchanged)

// After CSE
int a = b + c;
int d = e * f;
int g = a;          // Reuse a
int h = d;          // Reuse d
```

**Global CSE Across Basic Blocks**:

```c
// Before
int compute(int x, int y) {
    int a = x + y;

    if (condition) {
        int b = x + y;      // Same as a
        return b * 2;
    } else {
        int c = x + y;      // Same as a
        return c * 3;
    }
}

// After CSE
int compute(int x, int y) {
    int a = x + y;

    if (condition) {
        return a * 2;       // Reuse a
    } else {
        return a * 3;       // Reuse a
    }
}
```

**CSE Requirements**:
1. The expression must be **available** at the use point (computed on all paths and operands unchanged)
2. Operands must not be modified between the original computation and the reuse
3. The optimization must be **profitable** (saves more than the cost of storing the value)

**Limitations**:

```c
// CSE is unsafe here
int a = x + y;
x = 10;             // x modified!
int b = x + y;      // Different value than a
```

## Copy Propagation (Global)

Global copy propagation extends the local version to work across basic blocks, replacing uses of copied variables with their source values.

```c
// Before
int x = computation();
int y = x;              // Copy
if (condition) {
    int z = y + 5;      // Use copy
} else {
    int w = y * 2;      // Use copy
}

// After copy propagation
int x = computation();
int y = x;              // May become dead if no other uses
if (condition) {
    int z = x + 5;      // Use original
} else {
    int w = x * 2;      // Use original
}
```

**Reaching Definitions Analysis**: To perform global copy propagation safely, the compiler must determine which definitions of a variable "reach" each use. A definition reaches a use if there exists a path from the definition to the use where the variable is not redefined.

```c
// Complex example
void foo(int x) {
    int a = x;          // Definition 1 of a
    if (condition1) {
        a = x * 2;      // Definition 2 of a
    }
    // At this point, either definition 1 or 2 reaches here
    int b = a;          // Cannot safely propagate x
}
```

## Dead Code Elimination (Global)

Global dead code elimination removes code that computes values that are never used anywhere in the function. This requires **live variable analysis** to determine which variables hold values that might be used later.

**Simple Dead Code**:

```c
// Before
int a = x + y;
int b = a * 2;      // b is never used
int c = z + 5;
return c;

// After DCE
int a = x + y;      // a might be dead too
int c = z + 5;
return c;
```

**Dead Code Across Branches**:

```c
// Before
int result = 0;
if (condition) {
    int temp = compute();   // temp is dead
    result = 42;
} else {
    result = 100;
}
return result;

// After DCE
int result = 0;
if (condition) {
    result = 42;
} else {
    result = 100;
}
return result;
```

**Unreachable Code Elimination**:

```c
// Before
int foo(int x) {
    if (true) {
        return 1;
    }
    return 2;           // Unreachable
}

// After
int foo(int x) {
    return 1;
}
```

**Side Effects**: Dead code elimination must preserve operations with side effects:

```c
// Cannot eliminate even if result unused
int x = printf("Hello\n");      // Side effect: I/O
int y = volatileRead();         // Side effect: volatile access
int z = functionWithSideEffect(); // Side effect: may modify global state
```

## Code Motion

Code motion moves computations to different locations in the CFG where they may execute more efficiently or less frequently.

**Moving Invariant Code Out of Conditionals**:

```c
// Before
if (condition) {
    int a = x + y;      // Computed only sometimes
    process(a);
} else {
    int a = x + y;      // Same computation
    handle(a);
}

// After (if x and y are not modified)
int a = x + y;          // Computed once
if (condition) {
    process(a);
} else {
    handle(a);
}
```

**Sinking Computations**: Moving computations later to reduce register pressure or avoid unnecessary work:

```c
// Before
int a = expensive_computation();
if (rare_condition) {
    use(a);
}
// a is not used if rare_condition is false

// After (sink the computation)
if (rare_condition) {
    int a = expensive_computation();
    use(a);
}
```

## Sparse Conditional Constant Propagation (SCCP)

SCCP combines constant propagation with dead code elimination by simultaneously tracking which code is reachable and which variables have constant values.

```c
// Before
int x = 5;
int y;
if (x > 10) {       // Always false
    y = 20;
} else {
    y = 30;
}
int z = y + x;

// After SCCP
// Recognizes that x is constant, condition is always false,
// true branch is unreachable, y is constant 30
int x = 5;
int y = 30;
int z = 35;
```

**Advantages of SCCP**:
- More powerful than separate passes of constant propagation and dead code elimination
- Handles interdependencies between constants and control flow
- Reaches a fixed point in fewer iterations

## Partial Redundancy Elimination (PRE)

Partial Redundancy Elimination is a powerful optimization that subsumes several other optimizations including CSE, code motion, and loop-invariant code motion. An expression is partially redundant if it's computed multiple times on some (but not necessarily all) paths.

```c
// Before
int result;
if (condition) {
    int a = x + y;      // Computed here
    result = a;
} else {
    result = z;
}
int b = x + y;          // Computed again (partially redundant)
return result + b;

// After PRE
int temp;
if (condition) {
    temp = x + y;
    result = temp;
} else {
    result = z;
    temp = x + y;       // Move computation here
}
return result + temp;   // Now fully redundant
```

PRE works by:
1. **Anticipability**: Determining where an expression can be computed earlier
2. **Availability**: Tracking where expressions are available
3. **Insertion**: Adding computations on paths where they're needed but not available
4. **Replacement**: Using the stored results

## Global Value Numbering (GVN)

Global Value Numbering extends local value numbering to work across basic blocks, using dominator trees and SSA form (Static Single Assignment) for efficient implementation.

```c
// In SSA form
// Before
x1 = a + b
if (condition) {
    y1 = a + b      // Same value as x1
    z1 = y1 * 2
} else {
    y2 = c + d
    z2 = y2 * 3
}
y3 = φ(y1, y2)
w = a + b           // Same value as x1

// After GVN
x1 = a + b
if (condition) {
    z1 = x1 * 2     // Reuse x1
} else {
    y2 = c + d
    z2 = y2 * 3
}
y3 = φ(x1, y2)
w = x1              // Reuse x1
```

## Jump Threading

Jump threading optimizes conditional branches by duplicating code to create specialized paths when the outcome of a condition is known from context.

```c
// Before
if (x > 0) {
    flag = true;
} else {
    flag = false;
}

if (flag) {         // Outcome depends on first condition
    doSomething();
}

// After jump threading
if (x > 0) {
    flag = true;
    doSomething();  // Thread directly to this
} else {
    flag = false;
    // Skip doSomething()
}
```

## Tail Merging

Tail merging identifies identical code sequences at the end of different basic blocks and merges them to reduce code size.

```c
// Before
if (condition) {
    compute1();
    finalize();     // Identical tail
    cleanup();      // Identical tail
} else {
    compute2();
    finalize();     // Identical tail
    cleanup();      // Identical tail
}

// After tail merging
if (condition) {
    compute1();
} else {
    compute2();
}
finalize();         // Merged
cleanup();          // Merged
```

## Key Takeaways

- Global optimization analyzes entire functions using Control Flow Graphs to reason about multiple execution paths.
- Common Subexpression Elimination identifies and eliminates redundant computations across basic blocks, requiring availability analysis.
- Copy propagation replaces uses of copied variables with their sources, using reaching definitions analysis.
- Dead code elimination removes unused computations, requiring live variable analysis to determine what's needed.
- Code motion relocates computations to execute less frequently or more efficiently, balancing redundancy and speculation.
- Partial Redundancy Elimination is a unifying framework that subsumes CSE, code motion, and other optimizations.
- Global Value Numbering efficiently detects equivalent expressions across blocks, especially effective in SSA form.
- These optimizations require sophisticated data flow analysis to ensure correctness and profitability.
