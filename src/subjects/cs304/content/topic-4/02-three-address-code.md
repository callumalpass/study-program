# Three-Address Code

Three-Address Code (TAC) is one of the most widely used intermediate representations in compiler design. Its simplicity, uniformity, and resemblance to assembly language make it an ideal target for both code generation from high-level languages and subsequent optimization and machine code generation. This section explores TAC's structure, implementation strategies, and practical applications.

## What is Three-Address Code?

Three-Address Code is a linear IR where each instruction performs a single operation and has at most three operands. The name derives from the typical format: at most one operator and up to three addresses (variables or constants).

### General TAC Instruction Format

```
x = y op z
```

Where:
- `x` is the destination (result) address
- `y` and `z` are source addresses (operands)
- `op` is an operator (+, -, *, /, etc.)

This format imposes a key constraint: complex expressions must be broken into sequences of simple operations, each storing its result in a temporary variable.

### Common TAC Instruction Types

**Arithmetic and Logic Operations:**
```
t1 = a + b        ; addition
t2 = c - d        ; subtraction
t3 = e * f        ; multiplication
t4 = g / h        ; division
t5 = x & y        ; bitwise AND
t6 = !p           ; logical NOT (unary)
```

**Copy Instructions:**
```
x = y             ; simple assignment
t1 = 42           ; constant assignment
```

**Unconditional Jumps:**
```
goto L1           ; jump to label L1
```

**Conditional Jumps:**
```
if x < y goto L2           ; conditional jump
if x == 0 goto L3          ; zero test
ifFalse p goto L4          ; conditional on boolean
```

**Indexed Assignments:**
```
x = y[i]          ; array load: x = *(y + i)
x[i] = y          ; array store: *(x + i) = y
```

**Pointer Operations:**
```
x = &y            ; address-of
x = *p            ; pointer dereference
*p = x            ; store through pointer
```

**Function Calls:**
```
param x           ; push parameter
param y
t = call f, 2     ; call function f with 2 parameters
return x          ; return value
```

## Generating Three-Address Code

Translating high-level language constructs to TAC requires systematic approaches, typically implemented through syntax-directed translation during semantic analysis or in a dedicated IR generation phase.

### Expression Translation

Expressions are translated bottom-up, generating temporaries for intermediate results.

**Source Code:**
```c
x = (a + b) * (c - d) + e;
```

**TAC Translation:**
```
t1 = a + b
t2 = c - d
t3 = t1 * t2
t4 = t3 + e
x = t4
```

The compiler generates a unique temporary for each subexpression result. Temporaries can be reused after their values are no longer needed, determined through liveness analysis.

### Control Flow Translation

Control structures are translated using labels and conditional/unconditional jumps.

**If-Then-Else:**

Source:
```c
if (x < y) {
    a = b + c;
} else {
    a = b - c;
}
```

TAC:
```
    if x < y goto L1
    goto L2
L1: t1 = b + c
    a = t1
    goto L3
L2: t2 = b - c
    a = t2
L3: ; continue
```

**While Loop:**

Source:
```c
while (i < n) {
    sum = sum + a[i];
    i = i + 1;
}
```

TAC:
```
L1: if i >= n goto L2
    t1 = i * 4        ; assuming 4-byte ints
    t2 = a + t1       ; address calculation
    t3 = *t2          ; load a[i]
    sum = sum + t3
    i = i + 1
    goto L1
L2: ; continue
```

### Short-Circuit Evaluation

Boolean expressions with short-circuit semantics require careful translation.

Source:
```c
if (x != 0 && y / x > 10) {
    // ...
}
```

TAC:
```
    if x == 0 goto L_false
    t1 = y / x
    if t1 <= 10 goto L_false
    ; then-branch code
    goto L_end
L_false:
    ; else-branch or continue
L_end:
```

The second condition is only evaluated if the first succeeds, preventing division by zero.

## Implementation Strategies

TAC can be implemented using various data structures, each with different trade-offs for memory usage, generation speed, and manipulation efficiency.

### Quadruples

Quadruples represent each instruction as a four-field record: (operator, operand1, operand2, result).

**Structure:**
```
struct Quadruple {
    OpCode op;
    Address arg1;
    Address arg2;
    Address result;
}
```

**Example: `x = a + b * c`**

| Index | op   | arg1 | arg2 | result |
|-------|------|------|------|--------|
| 0     | *    | b    | c    | t1     |
| 1     | +    | a    | t1   | t2     |
| 2     | =    | t2   | -    | x      |

**Advantages:**
- Explicit representation; easy to understand and debug
- Straightforward to traverse and modify
- Each instruction independently accessible via index
- Good for optimization passes that reorder or delete instructions

**Disadvantages:**
- Memory overhead (four fields per instruction)
- Names/addresses stored redundantly
- Moving instructions requires updating references

### Triples

Triples eliminate the result field by using instruction positions as implicit temporary names. Each triple has (operator, operand1, operand2).

**Structure:**
```
struct Triple {
    OpCode op;
    Address arg1;
    Address arg2;
}
```

**Example: `x = a + b * c`**

| Index | op   | arg1 | arg2 |
|-------|------|------|------|
| 0     | *    | b    | c    |
| 1     | +    | a    | (0)  |
| 2     | =    | (1)  | x    |

Instruction results are referenced by position (e.g., `(0)` refers to the result of instruction 0).

**Advantages:**
- More compact than quadruples (25% memory savings)
- No need to generate explicit temporary names
- Natural for expression DAGs

**Disadvantages:**
- Instruction reordering is complex (requires updating all position references)
- Difficult to insert or delete instructions
- Less suitable for optimization phases that heavily modify code

### Indirect Triples

Indirect triples solve the reordering problem by introducing an indirection layer: an array of pointers to triples.

**Structure:**
- Array of triples (as above)
- Separate array of instruction pointers

**Example:**

Triples table:
| Index | op   | arg1 | arg2 |
|-------|------|------|------|
| 0     | *    | b    | c    |
| 1     | +    | a    | (0)  |
| 2     | =    | (1)  | x    |

Instruction sequence:
```
[0] -> triple[0]
[1] -> triple[1]
[2] -> triple[2]
```

To reorder, modify the instruction array without touching triples:
```
[0] -> triple[1]
[1] -> triple[0]
[2] -> triple[2]
```

**Advantages:**
- Combines compactness of triples with reordering flexibility
- Instruction insertion/deletion only modifies pointer array
- Preserves triple references through reordering

**Disadvantages:**
- Additional memory for pointer array
- Indirection overhead when accessing instructions
- More complex implementation

## Practical Considerations

### Temporary Management

Compilers generate many temporaries during TAC generation. Effective temporary management is crucial for both memory efficiency and subsequent register allocation.

**Temporary Naming Strategies:**
- Sequential numbering: t1, t2, t3, ...
- Hierarchical naming based on expression structure
- Reuse temporaries when their lifetimes don't overlap

**Liveness Analysis** determines when temporaries can be reused:

```
t1 = a + b    ; t1 born
t2 = c + d    ; t2 born
t3 = t1 * t2  ; t1 and t2 die, t3 born
x = t3        ; t3 dies
```

After `t3 = t1 * t2`, both `t1` and `t2` are dead (never used again) and their storage can be reclaimed.

### Symbol Table Integration

TAC generation requires access to symbol table information:
- Variable types (for type-specific operations)
- Array sizes (for bounds checking, if included)
- Function signatures (for call instruction generation)
- Scope information (for proper variable access)

### Optimization Opportunities

TAC's simplicity facilitates numerous optimizations:

**Constant Folding:**
```
; Before
t1 = 2 + 3
t2 = t1 * 4
x = t2

; After
x = 20
```

**Copy Propagation:**
```
; Before
t1 = x
t2 = t1 + y

; After
t2 = x + y
```

**Dead Code Elimination:**
```
; Before
t1 = a + b    ; t1 never used
x = c + d

; After
x = c + d
```

**Common Subexpression Elimination:**
```
; Before
t1 = a + b
t2 = a + b
x = t1 * t2

; After
t1 = a + b
x = t1 * t1
```

## From TAC to Machine Code

TAC serves as an ideal starting point for machine code generation:

1. **Instruction Selection**: Map TAC operations to machine instructions (may be one-to-one or require multiple machine instructions)
2. **Register Allocation**: Assign temporaries and variables to physical registers
3. **Instruction Scheduling**: Reorder instructions to minimize pipeline stalls
4. **Peephole Optimization**: Local optimizations on short instruction sequences

Many compilers perform these steps iteratively, using TAC as the stable representation between passes.

## Key Takeaways

- Three-Address Code is a linear IR where each instruction contains at most one operator and three addresses, simplifying analysis and code generation
- TAC breaks complex expressions into sequences of simple operations, each storing results in temporaries, making dependencies explicit
- Common TAC instruction types include arithmetic/logic operations, copies, jumps (conditional and unconditional), array indexing, pointer operations, and function calls
- Control structures (if-then-else, loops) are translated to TAC using labels and conditional/unconditional jumps
- Quadruples use four-field records (op, arg1, arg2, result) with explicit temporaries; triples use three fields with implicit position-based results; indirect triples add a pointer array for efficient reordering
- Quadruples are easier to manipulate but use more memory; triples are more compact but harder to reorder; indirect triples balance both concerns
- TAC generation requires systematic translation of expressions (bottom-up with temporaries) and control flow (using labels and jumps)
- TAC's uniform structure facilitates optimizations like constant folding, copy propagation, dead code elimination, and common subexpression elimination
- Effective temporary management and integration with symbol tables are critical for practical TAC implementation
