# Register Allocation

Register allocation assigns program variables to the limited set of physical registers available on the target machine. This phase critically impacts performance: register accesses are 100x faster than memory accesses, making effective register allocation one of the most important compiler optimizations.

## The Register Allocation Problem

Modern processors provide 16-32 general-purpose registers, but programs often use hundreds or thousands of variables. The register allocator must:

1. **Map variables to registers**: Assign frequently-used variables to registers
2. **Minimize spills**: Store excess variables in memory when registers are exhausted
3. **Insert spill code**: Generate loads/stores for spilled variables
4. **Respect interference**: Ensure simultaneously-live variables occupy different registers

### Live Ranges and Interference

A variable's **live range** spans from its definition to its last use:

```c
int x = a + b;    // x defined here
int y = c + d;    // y defined here
int z = x + y;    // x and y last used here; z defined
return z * 2;     // z last used here
```

```
Variable  | Live Range
----------|------------------
x         | [1, 3]
y         | [2, 3]
z         | [3, 4]
```

Variables **interfere** when their live ranges overlap. `x` and `y` interfere (both live at line 3), so they need different registers. `x` and `z` don't interfere, so they can share a register.

### Register Pressure

**Register pressure** measures the maximum number of simultaneously-live variables. If register pressure exceeds available registers, some variables must be **spilled** to memory:

```c
// High register pressure example
r1 = a + b;
r2 = c + d;
r3 = e + f;
r4 = g + h;
// If only 3 registers available, must spill one of r1-r4
r5 = r1 + r2;
r6 = r3 + r4;
return r5 + r6;
```

## Graph Coloring Allocation

The classic approach to register allocation models the problem as graph coloring.

### Interference Graph

Construct a graph where:
- Nodes represent variables (or virtual registers)
- Edges connect variables with overlapping live ranges (interfering variables)

```c
// Example program
a = ...
b = ...
c = a + b
d = c + 1
e = d + b
return e
```

```
Live ranges:
a: [1, 3]
b: [2, 5]
c: [3, 4]
d: [4, 5]
e: [5, 6]

Interference graph:
    a --- b
    |     |
    c     d
          |
          e

Interferences:
- a and b (overlap at [2,3])
- a and c (overlap at [3])
- b and d (overlap at [4,5])
- d and e (overlap at [5])
```

### K-Coloring

Register allocation becomes graph k-coloring where k is the number of available registers. Assign colors (registers) such that no two adjacent nodes share the same color.

For k=3 registers:
```
Color assignment:
a → R1
b → R2
c → R3  (doesn't interfere with R1, R2)
d → R1  (doesn't interfere with R1, reuse a's register)
e → R3  (doesn't interfere with R3, reuse c's register)
```

### Chaitin's Algorithm

Chaitin's algorithm (1982) pioneered graph-coloring register allocation:

```python
def chaitin_allocate(interference_graph, k):
    stack = []
    graph = interference_graph.copy()

    # Simplification: remove nodes with < k neighbors
    while True:
        node = find_node_with_degree_less_than(graph, k)
        if node is None:
            break
        stack.append(node)
        graph.remove(node)

    # Potential spill: if graph non-empty, spill a node
    if not graph.is_empty():
        spill = select_spill_candidate(graph)
        stack.append(spill)
        graph.remove(spill)
        # Repeat simplification
        return chaitin_allocate(graph, k)

    # Selection: assign colors (registers) by popping stack
    coloring = {}
    while stack:
        node = stack.pop()
        neighbor_colors = {coloring[n] for n in node.neighbors if n in coloring}
        available = {1, 2, ..., k} - neighbor_colors
        if available:
            coloring[node] = available.pop()
        else:
            # Actual spill needed
            spill_variable(node)

    return coloring
```

**Key insight**: A node with degree < k can always be colored after its neighbors are colored (at least one color remains available). Removing such nodes simplifies the graph.

### Spilling

When all nodes have degree ≥ k, spilling is necessary. Select a spill candidate based on:

- **Spill cost**: Execution frequency of the variable (avoid spilling loop variables)
- **Degree**: High-degree nodes free more simplification opportunities
- **Live range length**: Shorter live ranges cost less to spill

After spilling, rewrite code with loads/stores:

```c
// Before spilling x
x = a + b;
y = x + c;
z = x + y;

// After spilling x to stack offset [rbp-8]
[rbp-8] = a + b;    // Store
y = [rbp-8] + c;    // Load
z = [rbp-8] + y;    // Load
```

Spilling introduces new live ranges for temporaries holding loaded values, requiring re-allocation (iterate until no spills needed).

### Iterated Register Coalescing

Briggs, Chaitin, and George extended the algorithm with **coalescing**: merging nodes connected by move instructions to eliminate redundant copies.

```c
// Before coalescing
x = ...
y = x      // Move instruction
z = y + 1

// After coalescing x and y into single variable
x = ...
z = x + 1  // y eliminated
```

Coalescing reduces interference graph size but must ensure the resulting graph remains k-colorable. **Conservative coalescing** only merges nodes if the merged node has < k high-degree neighbors.

## Linear Scan Allocation

Linear scan (Poletto & Sarkar, 1999) trades optimality for speed, making it popular for JIT compilers.

### Algorithm

```python
def linear_scan_allocate(intervals, k):
    # Sort intervals by start point
    intervals.sort(key=lambda i: i.start)

    active = []  # Currently active intervals
    free_registers = {R1, R2, ..., Rk}
    allocation = {}

    for interval in intervals:
        # Expire old intervals
        active = [a for a in active if a.end >= interval.start]
        for expired in old_active:
            free_registers.add(allocation[expired])

        if free_registers:
            # Allocate a free register
            reg = free_registers.pop()
            allocation[interval] = reg
            active.append(interval)
        else:
            # Spill: choose interval with furthest end point
            spill = max(active + [interval], key=lambda i: i.end)
            if spill == interval:
                spill_interval(interval)
            else:
                # Spill an active interval and take its register
                allocation[interval] = allocation[spill]
                active.remove(spill)
                active.append(interval)
                spill_interval(spill)
```

### Advantages and Limitations

**Advantages**:
- Fast: O(n log n) time vs. graph coloring's exponential worst case
- Simple implementation, no graph construction
- Suitable for JIT compilation with time constraints

**Limitations**:
- Less optimal than graph coloring (~10-15% more spills)
- Doesn't coalesce moves
- Sensitive to interval order

Modern linear scan variants add:
- **Second-chance allocation**: Retry spill candidates with different registers
- **Hole filling**: Use register gaps within live ranges
- **Range splitting**: Split intervals at optimal points

## Live Range Splitting

Splitting variables' live ranges into smaller segments enables better allocation by reducing interference.

### Split Points

Identify optimal split points:

```c
// Long live range with gap
x = a + b;     // x defined
// ... many lines without x
y = c + d;     // y needs a register
// ... more code
z = x + 1;     // x used again

// Split x's live range
x = a + b;
[spill] = x;   // Store after definition
y = c + d;     // y uses x's register
x = [spill];   // Reload before use
z = x + 1;
```

Splitting at loop boundaries is particularly effective:

```c
// Before splitting
for (int i = 0; i < n; i++) {
    x = a[i];  // x live across entire loop
    for (int j = 0; j < m; j++) {
        y = b[j] + c[j];  // High register pressure
    }
    d[i] = x;
}

// After splitting (spill x around inner loop)
for (int i = 0; i < n; i++) {
    x = a[i];
    [spill] = x;  // Spill outside inner loop
    for (int j = 0; j < m; j++) {
        y = b[j] + c[j];  // More registers available
    }
    x = [spill];  // Reload after inner loop
    d[i] = x;
}
```

### Decoupled Live Ranges

Split variables into multiple live ranges that can be allocated independently:

```c
// Original
x = input;
// ... 100 lines of code
y = x + 1;
// ... 100 more lines
z = x + 2;

// Split into x1, x2
x1 = input;
// ... code
y = x1 + 1;
[spill] = x1;  // Spill between uses
// ... code
x2 = [spill];  // Different virtual register
z = x2 + 2;
```

`x1` and `x2` are allocated separately, potentially to different registers or with different spill decisions.

### Range Splitting Strategies

**Loop-based**: Always split around nested loops to reduce inner loop register pressure.

**Spill everywhere**: Split at all definition and use points:
```c
[spill] = expr;  // Store after every definition
reg = [spill];   // Load before every use
```
Then optimize by eliminating redundant spill code.

**Optimal splitting**: Use dynamic programming to find minimum-cost split points considering:
- Spill code cost (weighted by execution frequency)
- Register pressure at each program point
- Available registers in each region

## Advanced Techniques

### SSA-Based Allocation

Static Single Assignment (SSA) form simplifies register allocation:

```c
// Before SSA
x = a + b;
x = x + 1;
y = x + c;

// SSA form
x1 = a + b;
x2 = x1 + 1;
y1 = x2 + c;
```

Each variable is defined exactly once, making live ranges disjoint by construction. Interference is simpler to compute: variables interfere if one is live at the definition of the other.

SSA also enables **aggressive coalescing** through φ-functions:

```c
if (cond)
    x1 = a;
else
    x2 = b;
x3 = φ(x1, x2);  // Merge x1 and x2
y = x3 + c;

// Coalesce x1, x2, x3 to single register
```

### Rematerialization

Instead of spilling expensive-to-compute values, **rematerialize** (recompute) them:

```c
// Spilling approach
x = &global_array;
[spill] = x;
// ... code
x = [spill];
y = x[i];

// Rematerialization (cheaper)
x = &global_array;
// ... code
x = &global_array;  // Recompute address
y = x[i];
```

Rematerialization is profitable when:
- Recomputation cost < memory load cost
- Value can be recomputed (constants, addresses, simple expressions)

### Pre-Allocation

Some values must occupy specific registers:
- Function arguments (calling convention)
- Return values
- Special instructions (x86 division uses rdx:rax)

**Pre-allocation** assigns these before general allocation:

```x86asm
; Division requires rax, rdx
mov rax, dividend
cqo              ; Sign-extend rax to rdx:rax
idiv divisor     ; rax = quotient, rdx = remainder
```

The allocator treats pre-allocated registers as unavailable during those live ranges.

## Key Takeaways

- Register allocation assigns program variables to limited physical registers, critically impacting performance through 100x faster register access versus memory
- The problem reduces to graph k-coloring where nodes are variables, edges are interferences, and k is the register count
- Chaitin's algorithm uses simplification (removing low-degree nodes), potential spilling, and selection phases to achieve optimal coloring
- Linear scan allocation provides O(n log n) fast allocation by processing intervals in start-point order, ideal for JIT compilation despite being less optimal
- Live range splitting divides variable lifetimes into smaller segments, reducing interference and register pressure, particularly effective around loop boundaries
- Spilling stores variables to memory when registers are exhausted; spill candidate selection considers execution frequency and degree to minimize performance impact
- SSA form simplifies interference computation and enables aggressive coalescing through φ-functions with disjoint live ranges
- Advanced techniques like rematerialization (recomputing instead of spilling) and pre-allocation (reserving registers for ABI requirements) further optimize register usage
