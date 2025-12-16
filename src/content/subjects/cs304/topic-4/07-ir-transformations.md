# IR Transformations and Canonicalization

Intermediate representations are not just passive data structures—they are the substrate upon which compiler optimizations operate. IR transformations systematically modify programs to improve performance, reduce code size, or prepare for subsequent compilation phases. This section explores common IR transformations, canonicalization techniques, and the principles that make transformations both correct and effective.

## Transformation Correctness

Before examining specific transformations, we must establish what makes a transformation correct.

### Semantic Preservation

A transformation is **semantically correct** if it preserves program behavior. For all valid inputs, the transformed program must produce the same observable outputs as the original.

**Observable behavior** includes:
- Return values
- Side effects (I/O, memory writes visible to other code)
- Termination properties (if original terminates, transformed version should too)

**Challenges:**
- Floating-point operations: IEEE 754 semantics are subtle (NaN propagation, signed zeros)
- Undefined behavior: C/C++ undefined behavior allows aggressive optimizations but risks changing "working" buggy code
- Concurrency: Transformations must respect memory models in multi-threaded contexts

### Profitability

A transformation is **profitable** if it improves some metric:
- Execution time (most common goal)
- Code size (for embedded systems, caches)
- Memory usage
- Power consumption

Transformations may be correct but unprofitable in specific contexts. Compilers use heuristics, profiling data, or machine learning to decide when to apply transformations.

## Canonicalization

Canonicalization transforms semantically equivalent IR into a standard form, simplifying subsequent analysis and optimization.

### Expression Canonicalization

**Constant Ordering**: Place constants on the right side of commutative operations.

Before:
```
t1 = 5 + x
t2 = y + 3
```

After:
```
t1 = x + 5
t2 = y + 3
```

This makes pattern matching easier: optimizations looking for "x + constant" don't need to check "constant + x".

**Strength Reduction**: Replace expensive operations with cheaper equivalents.

```
; Before
t1 = x * 2

; After
t1 = x + x

; Or even better
t1 = x << 1    ; left shift (multiply by 2)
```

```
; Before
t1 = x / 8

; After
t1 = x >> 3    ; arithmetic right shift (divide by 8)
```

**Algebraic Simplification**: Apply algebraic identities.

```
x + 0 → x
x * 1 → x
x * 0 → 0
x - x → 0
x / 1 → x
x & 0 → 0
x | 0 → x
x ^ x → 0
```

Extended examples:
```
; Before
t1 = a * 0 + b

; After
t1 = b
```

```
; Before
t1 = (x + 5) - 5

; After
t1 = x
```

### Control Flow Canonicalization

**Empty Block Elimination**: Remove basic blocks containing only a jump.

Before:
```
B1: goto B2
B2: goto B3
B3: x = y + 1
```

After:
```
B1: goto B3
B3: x = y + 1
```

Block B2 is eliminated, and references to B2 are redirected to B3.

**Block Merging**: Combine blocks when one has a single successor and that successor has a single predecessor.

Before:
```
B1: x = a + b
    goto B2

B2: y = x * 2
    return y
```

After:
```
B1: x = a + b
    y = x * 2
    return y
```

**Critical Edge Splitting**: Insert empty blocks on critical edges (from multi-successor to multi-predecessor blocks).

Before:
```
    B1
   /  \
  B2  B3
   \  /
    B4
```

B1→B4 and B2→B4 are critical edges (B1 has multiple successors, B4 has multiple predecessors).

After:
```
    B1
   /  \
  B2  B3
   |   |
  B5  B6
   \  /
    B4
```

This simplifies code insertion (e.g., when breaking SSA, copies can be inserted in B5/B6 instead of complex splitting logic).

## Common IR Transformations

### Constant Folding

Evaluate constant expressions at compile time.

```
; Before
t1 = 2 + 3
t2 = t1 * 4
t3 = t2 - 8

; After
t3 = 12
```

**Constant Propagation**: Replace variable uses with their constant values.

```
; Before
x = 5
y = x + 3
z = x * y

; After
x = 5
y = 8
z = 40
```

In SSA form, constant propagation is particularly effective because each variable has exactly one definition.

### Copy Propagation

Replace uses of copied variables with their sources.

```
; Before
a = b
c = a + 1

; After
c = b + 1
```

If `a` is not used elsewhere, it becomes dead and can be eliminated.

### Dead Code Elimination (DCE)

Remove code that doesn't affect program output.

**Trivial DCE**: Remove assignments to variables never used.

```
; Before
t1 = a + b    ; t1 never used
x = c + d

; After
x = c + d
```

**Aggressive DCE**: Remove code only reachable through dead code.

SSA form simplifies DCE: if an SSA variable has no uses, its definition is dead (unless it has side effects like I/O or function calls with side effects).

### Common Subexpression Elimination (CSE)

Avoid recomputing the same expression.

```
; Before
t1 = a + b
t2 = c * d
t3 = a + b    ; same as t1
x = t3 + t2

; After
t1 = a + b
t2 = c * d
x = t1 + t2
```

**Local CSE**: Within a basic block. Simple and fast.

**Global CSE (Global Value Numbering - GVN)**: Across basic blocks. More powerful but complex.

SSA form enables efficient GVN: if two expressions use the same SSA variables and operators, they're guaranteed equivalent (no intervening assignments possible).

### Loop-Invariant Code Motion (LICM)

Move computations that don't change in a loop outside the loop.

```
; Before
loop:
    t1 = a + b    ; a and b not modified in loop
    arr[i] = t1 * i
    i = i + 1
    if i < n goto loop

; After
t1 = a + b
loop:
    arr[i] = t1 * i
    i = i + 1
    if i < n goto loop
```

This reduces the number of additions from n to 1.

**Requirements:**
- Expression is invariant (operands not modified in loop)
- Movement is safe (doesn't change exception behavior)
- Target block dominates all loop exits (ensures expression always executes)

### Loop Unrolling

Replicate loop body to reduce iteration overhead and enable further optimizations.

```
; Before
for (i = 0; i < 100; i++) {
    arr[i] = i * 2;
}

; After (unroll factor 4)
for (i = 0; i < 100; i += 4) {
    arr[i]   = i * 2;
    arr[i+1] = (i+1) * 2;
    arr[i+2] = (i+2) * 2;
    arr[i+3] = (i+3) * 2;
}
```

**Benefits:**
- Reduces loop overhead (fewer branch instructions)
- Exposes instruction-level parallelism
- Enables vectorization

**Costs:**
- Increased code size
- Potential instruction cache pressure
- Requires cleanup code for non-multiple trip counts

### Inlining

Replace function calls with the function body.

```
; Before
function add(a, b) {
    return a + b;
}

x = add(y, z);

; After
t1 = y + z
x = t1
```

**Benefits:**
- Eliminates call overhead
- Exposes more optimization opportunities (caller and callee code can be optimized together)
- Enables interprocedural optimizations

**Costs:**
- Code size increase
- Compilation time increase
- Potential instruction cache misses

Heuristics consider function size, call frequency, and optimization opportunities.

### Scalar Replacement of Aggregates (SROA)

Replace structures/arrays with individual scalar variables.

```
; Before
struct Point { int x, y; } p;
p.x = 1;
p.y = 2;
return p.x + p.y;

; After
x = 1
y = 2
return x + y
```

This promotes memory operations to register operations, enabling further optimizations.

### Tail Call Optimization

Convert tail calls (calls as the last operation before return) into jumps.

```
; Before
function factorial(n, acc) {
    if (n <= 1) return acc;
    return factorial(n - 1, n * acc);
}

; After (conceptual transformation)
function factorial(n, acc) {
start:
    if (n <= 1) return acc;
    acc = n * acc;
    n = n - 1;
    goto start;
}
```

This eliminates stack frame allocation for tail-recursive functions, enabling constant stack space usage.

## Advanced Transformations

### Vectorization

Transform scalar operations into vector (SIMD) operations.

```
; Before
for (i = 0; i < n; i++) {
    c[i] = a[i] + b[i];
}

; After (vectorized, 4-element vectors)
for (i = 0; i < n; i += 4) {
    v1 = load_vector(&a[i]);
    v2 = load_vector(&b[i]);
    v3 = add_vector(v1, v2);
    store_vector(&c[i], v3);
}
```

Modern CPUs can process 4, 8, or more elements simultaneously with SIMD instructions.

### Partial Redundancy Elimination (PRE)

Generalization of CSE and LICM: eliminate redundant computations by moving and reusing results.

```
; Before
    if (cond) {
        x = a + b;
    }
    y = a + b;    ; redundant if cond true, but not if false

; After
    if (cond) {
        x = a + b;
        t = x;
    } else {
        t = a + b;
    }
    y = t;
```

Now `a + b` is computed exactly once on every path.

### Sparse Conditional Constant Propagation (SCCP)

Combines constant propagation with dead code elimination, propagating constants through φ functions and conditionals.

```
; Before
x = 5
if (x > 3) {
    y = x + 1    ; x is always 5 here
} else {
    y = x - 1    ; unreachable
}

; After
x = 5
y = 6            ; condition always true, else branch removed
```

SCCP discovers that the else branch is unreachable based on constant propagation through the condition.

### Loop Fusion

Merge adjacent loops that iterate over the same range.

```
; Before
for (i = 0; i < n; i++) {
    a[i] = b[i] + 1;
}
for (i = 0; i < n; i++) {
    c[i] = a[i] * 2;
}

; After
for (i = 0; i < n; i++) {
    a[i] = b[i] + 1;
    c[i] = a[i] * 2;
}
```

**Benefits:**
- Reduces loop overhead
- Improves cache locality
- Enables further optimizations

## Transformation Phases and Ordering

Transformations interact in complex ways. Order matters.

### Fixed-Point Iteration

Many optimizations enable others. Compilers apply transformations repeatedly until no further changes occur (a fixed point).

Example:
1. Constant folding produces constants
2. Constant propagation uses those constants
3. Dead code elimination removes now-unused code
4. Repeat until no changes

### Phase Ordering Problem

Different orders produce different results:

```
; Original
t1 = x + 0
t2 = t1 * 1
y = t2

; Order 1: Algebraic simplification, then copy propagation
t1 = x         ; x + 0 → x
t2 = t1        ; t1 * 1 → t1
y = x          ; propagate

; Order 2: Copy propagation, then algebraic simplification
; No change initially, then:
y = (x + 0) * 1 → y = x * 1 → y = x
```

Both reach the same result, but intermediate steps differ. Some orderings are more efficient or enable more optimizations.

### Common Compiler Pass Ordering

Typical optimizing compiler (simplified):

1. **Early optimizations**: Inlining, SROA (expose more optimization opportunities)
2. **Canonicalization**: Expression and control flow normalization
3. **SSA construction**: Convert to SSA form
4. **SSA optimizations**: SCCP, GVN, DCE, LICM, etc.
5. **Loop optimizations**: Unrolling, vectorization, fusion
6. **Late optimizations**: CSE, PRE, dead store elimination
7. **SSA destruction**: Convert out of SSA
8. **Code generation**: Instruction selection, register allocation, scheduling

## Practical Considerations

### Transformation Infrastructure

Modern compilers provide frameworks for writing transformations:

**LLVM Pass Manager**: Manages dependencies, ordering, and execution of transformation passes.

**Visitor Pattern**: Traverse IR, applying transformations at each node.

**Pattern Matching**: Declaratively specify transformation patterns.

### Debugging Transformations

**Dump IR**: Output IR before and after each transformation.

**Verification Passes**: Check IR invariants after each transformation.

**Bisection**: If a transformation introduces bugs, binary search through passes to identify the culprit.

**Reduced Test Cases**: Minimize failing programs to isolate transformation bugs.

### Performance Tuning

**Profile-Guided Optimization (PGO)**: Use runtime profiling to guide transformations:
- Inline hot functions
- Unroll frequently-executed loops
- Optimize for common branch directions

**Compile-Time Budget**: Limit optimization time for large programs or interactive compilation.

## Key Takeaways

- IR transformations must preserve semantics (produce same observable behavior) while improving performance, code size, or other metrics; correctness is fundamental, profitability is context-dependent
- Canonicalization standardizes semantically equivalent IR into uniform forms (constants on right, strength reduction, algebraic simplification), simplifying pattern matching and subsequent optimizations
- Common transformations include constant folding/propagation, copy propagation, dead code elimination, common subexpression elimination, loop-invariant code motion, and loop unrolling
- SSA form significantly simplifies many transformations by making def-use chains explicit and guaranteeing single assignment points for each variable
- Advanced transformations like vectorization (SIMD), partial redundancy elimination, sparse conditional constant propagation, and loop fusion require sophisticated analysis but can dramatically improve performance
- Transformations interact and enable each other, requiring fixed-point iteration and careful phase ordering; different orders can produce different results and optimization effectiveness
- Typical compiler pipelines order transformations from early high-level optimizations (inlining, SROA) through SSA optimizations to late low-level optimizations before code generation
- Control flow canonicalization includes empty block elimination, block merging, and critical edge splitting, which simplify analysis and enable further transformations
- Loop optimizations (invariant code motion, unrolling, fusion) are crucial for performance, exploiting the fact that loops often dominate execution time
- Practical transformation development requires robust infrastructure (pass managers, visitor patterns), debugging tools (IR dumps, verification passes), and performance tuning (PGO, compile-time budgets)
