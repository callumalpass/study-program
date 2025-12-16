# Loop Optimization

Loops are among the most important targets for compiler optimization because they typically account for the majority of a program's execution time. A computation performed inside a loop body may execute thousands or millions of times, so even small improvements can yield substantial performance gains. Loop optimizations aim to reduce the overhead of loop control, minimize redundant computations, and improve memory access patterns.

## Loop Structure and Terminology

Understanding loop structure is essential for applying optimizations effectively. A **natural loop** has a single entry point (the header) and at least one back edge that jumps from within the loop back to the header.

```c
// Simple natural loop
for (int i = 0; i < n; i++) {    // Header: loop test
    body[i] = compute(i);        // Loop body
}

// While loop structure
int i = 0;                        // Preheader (initialization)
while (i < n) {                   // Header
    body[i] = compute(i);         // Body
    i++;                          // Body (increment)
}
```

**Loop Components**:
- **Header**: The first basic block of the loop, which dominates all other blocks in the loop
- **Preheader**: A block inserted before the loop header to hold loop-invariant code
- **Latch**: The block containing the back edge to the header
- **Exit**: Blocks that lead outside the loop
- **Loop Body**: All blocks within the loop

## Loop-Invariant Code Motion (LICM)

Loop-Invariant Code Motion identifies computations that produce the same result on every loop iteration and moves them outside the loop to execute only once.

**Basic LICM**:

```c
// Before
for (int i = 0; i < n; i++) {
    int limit = n * 2;          // Invariant: same value every iteration
    int offset = base + delta;  // Invariant: if base and delta don't change
    array[i] = i + limit;
}

// After LICM (moved to preheader)
int limit = n * 2;
int offset = base + delta;
for (int i = 0; i < n; i++) {
    array[i] = i + limit;
}
```

**Conditions for LICM**:
1. The computation must be invariant (operands don't change in the loop)
2. The target variable must be assigned only once in the loop
3. The block containing the computation must dominate all loop exits (or the result isn't used after the loop)
4. Moving the code must not introduce exceptions or side effects

**Complex Example**:

```c
// Before
for (int i = 0; i < n; i++) {
    for (int j = 0; j < m; j++) {
        int factor = n * m;     // Invariant in both loops
        int outer = n * 2;      // Invariant in inner loop
        array[i][j] = i * j * factor + outer;
    }
}

// After nested LICM
int factor = n * m;             // Moved outside both loops
for (int i = 0; i < n; i++) {
    int outer = n * 2;          // Moved outside inner loop
    for (int j = 0; j < m; j++) {
        array[i][j] = i * j * factor + outer;
    }
}
```

**Profitability Considerations**: LICM is not always beneficial:

```c
// May not be profitable
for (int i = 0; i < n; i++) {
    if (rare_condition[i]) {
        int expensive = heavy_computation();  // Invariant but rarely used
        use(expensive);
    }
}
// If rare_condition is usually false, moving expensive computation
// outside the loop would execute it even when not needed
```

## Induction Variable Analysis and Strength Reduction

An **induction variable** is a variable whose value forms an arithmetic progression through loop iterations. The most obvious induction variable is the loop counter itself, but derived induction variables are also common.

**Basic Induction Variables (BIV)**: Variables incremented or decremented by a constant amount each iteration.

**Derived Induction Variables (DIV)**: Variables whose values are linear functions of basic induction variables.

```c
// Before
for (int i = 0; i < n; i++) {      // i is a BIV
    int j = i * 4;                 // j is a DIV: j = 4*i + 0
    int k = i * 4 + 10;            // k is a DIV: k = 4*i + 10
    array[j] = k;
}

// After induction variable optimization
int j = 0;                         // Initialize j
int k = 10;                        // Initialize k
for (int i = 0; i < n; i++) {
    array[j] = k;
    j = j + 4;                     // Increment j by 4 (cheaper than multiply)
    k = k + 4;                     // Increment k by 4
}
```

**Strength Reduction for Induction Variables**: Replace multiplications with additions.

```c
// Before: Array indexing with multiplication
for (int i = 0; i < n; i++) {
    sum += array[i * sizeof(int)];  // Multiply on each iteration
}

// After: Strength reduction
int index = 0;
for (int i = 0; i < n; i++) {
    sum += array[index];
    index += sizeof(int);            // Add instead of multiply
}
```

**Induction Variable Elimination**: Sometimes induction variables can be eliminated entirely.

```c
// Before: Two induction variables
for (int i = 0; i < n; i++) {
    int j = i * 2;
    process(j);
}

// After: Single induction variable
for (int j = 0; j < n * 2; j += 2) {
    process(j);
}
```

## Loop Unrolling

Loop unrolling replicates the loop body multiple times, reducing loop overhead and creating opportunities for instruction-level parallelism.

**Basic Unrolling**:

```c
// Before
for (int i = 0; i < 100; i++) {
    array[i] = i * 2;
}

// After unrolling by factor of 4
int i;
for (i = 0; i < 100; i += 4) {
    array[i]   = i * 2;
    array[i+1] = (i+1) * 2;
    array[i+2] = (i+2) * 2;
    array[i+3] = (i+3) * 2;
}
// Handle remaining iterations (if 100 not divisible by 4)
```

**Benefits of Unrolling**:
1. **Reduced loop overhead**: Fewer branch instructions, counter updates, and condition tests
2. **Instruction-level parallelism**: Independent operations can execute in parallel on superscalar processors
3. **Register optimization**: More opportunities for register allocation
4. **Software pipelining**: Enables overlapping of operations from different iterations

**Unrolling with Cleanup Code**:

```c
// Unroll factor 4 with cleanup
int i = 0;
for (; i < n - 3; i += 4) {        // Main unrolled loop
    sum += array[i];
    sum += array[i+1];
    sum += array[i+2];
    sum += array[i+3];
}
for (; i < n; i++) {                // Cleanup loop for remaining elements
    sum += array[i];
}
```

**Trade-offs**:
- **Code size increase**: Unrolling increases the size of the executable
- **Instruction cache pressure**: Large unrolled loops may not fit in instruction cache
- **Diminishing returns**: Unrolling by 8 or 16 may not be better than unrolling by 4

## Loop Fusion (Loop Jamming)

Loop fusion combines multiple adjacent loops that iterate over the same range into a single loop, reducing loop overhead and improving cache locality.

```c
// Before: Two separate loops
for (int i = 0; i < n; i++) {
    a[i] = b[i] + c[i];
}
for (int i = 0; i < n; i++) {
    d[i] = a[i] * 2;
}

// After fusion
for (int i = 0; i < n; i++) {
    a[i] = b[i] + c[i];
    d[i] = a[i] * 2;             // Can use a[i] immediately (better cache locality)
}
```

**Requirements**:
- Loops must have the same iteration count
- No loop-carried dependencies that prevent fusion
- Fusion must not increase register pressure excessively

## Loop Fission (Loop Distribution)

Loop fission is the opposite of fusion—it splits a single loop into multiple loops. This can improve performance by:
- Enabling vectorization of parts of the loop
- Reducing register pressure
- Improving cache behavior

```c
// Before: Single loop with unrelated computations
for (int i = 0; i < n; i++) {
    a[i] = b[i] + c[i];          // Memory-bound
    x += compute_expensive(i);    // Compute-bound
}

// After fission
for (int i = 0; i < n; i++) {
    a[i] = b[i] + c[i];          // Better vectorization opportunity
}
for (int i = 0; i < n; i++) {
    x += compute_expensive(i);    // Can be optimized independently
}
```

## Loop Interchange (Loop Permutation)

Loop interchange reorders nested loops to improve cache locality by accessing memory in a more cache-friendly pattern.

```c
// Before: Poor cache locality (column-major access in row-major array)
for (int j = 0; j < N; j++) {
    for (int i = 0; i < M; i++) {
        sum += matrix[i][j];     // Accessing with stride N (poor locality)
    }
}

// After interchange: Better cache locality
for (int i = 0; i < M; i++) {
    for (int j = 0; j < N; j++) {
        sum += matrix[i][j];     // Accessing with stride 1 (good locality)
    }
}
```

**Impact on Cache Performance**: In C/C++, arrays are stored in row-major order. Accessing matrix[i][j] with varying i (inner loop) provides better spatial locality than varying j.

## Loop Tiling (Loop Blocking)

Loop tiling breaks a loop's iteration space into smaller blocks (tiles) that fit in cache, dramatically improving cache hit rates for large datasets.

```c
// Before: Poor cache behavior for large matrices
for (int i = 0; i < N; i++) {
    for (int j = 0; j < N; j++) {
        for (int k = 0; k < N; k++) {
            C[i][j] += A[i][k] * B[k][j];
        }
    }
}

// After tiling (with tile size T)
for (int ii = 0; ii < N; ii += T) {
    for (int jj = 0; jj < N; jj += T) {
        for (int kk = 0; kk < N; kk += T) {
            // Process T×T tile
            for (int i = ii; i < min(ii+T, N); i++) {
                for (int j = jj; j < min(jj+T, N); j++) {
                    for (int k = kk; k < min(kk+T, N); k++) {
                        C[i][j] += A[i][k] * B[k][j];
                    }
                }
            }
        }
    }
}
```

## Loop Vectorization

Modern processors have SIMD (Single Instruction, Multiple Data) instructions that process multiple data elements simultaneously. Loop vectorization transforms scalar loops to use these instructions.

```c
// Before: Scalar loop
for (int i = 0; i < n; i++) {
    c[i] = a[i] + b[i];
}

// After vectorization (conceptual, using 4-wide SIMD)
int i = 0;
for (; i < n - 3; i += 4) {
    // Process 4 elements at once with SIMD instruction
    vec4 va = load_vec4(&a[i]);
    vec4 vb = load_vec4(&b[i]);
    vec4 vc = add_vec4(va, vb);
    store_vec4(&c[i], vc);
}
for (; i < n; i++) {            // Scalar cleanup
    c[i] = a[i] + b[i];
}
```

**Vectorization Requirements**:
- No loop-carried dependencies
- Memory accesses must be contiguous or have predictable patterns
- Operations must be supported by SIMD instructions

## Loop Unswitching

Loop unswitching moves loop-invariant conditionals outside the loop by duplicating the loop body.

```c
// Before: Condition tested on every iteration
for (int i = 0; i < n; i++) {
    if (flag) {                  // Loop-invariant condition
        a[i] = compute1(i);
    } else {
        a[i] = compute2(i);
    }
}

// After unswitching
if (flag) {
    for (int i = 0; i < n; i++) {
        a[i] = compute1(i);
    }
} else {
    for (int i = 0; i < n; i++) {
        a[i] = compute2(i);
    }
}
```

**Trade-off**: Increases code size but eliminates branch mispredictions and enables better optimization of each version.

## Key Takeaways

- Loops are prime optimization targets because they execute repeatedly, amplifying the benefit of even small improvements.
- Loop-invariant code motion eliminates redundant computations by hoisting them outside loops.
- Induction variable optimization replaces expensive operations (multiplication) with cheaper ones (addition) for variables that change predictably.
- Loop unrolling reduces overhead and exposes instruction-level parallelism but increases code size.
- Loop fusion and fission restructure loops to improve cache locality and enable other optimizations.
- Loop interchange and tiling dramatically improve cache performance for nested loops operating on multi-dimensional arrays.
- Vectorization leverages SIMD instructions to process multiple data elements simultaneously.
- These optimizations often interact—applying one may enable or enhance others.
