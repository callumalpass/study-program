# Intermediate Representations: An Overview

Intermediate Representations (IRs) form the backbone of modern compiler design, serving as the critical bridge between source code and machine code. Understanding IRs is essential for compiler construction, optimization, and code generation. This overview explores the fundamental concepts, motivations, and classifications of IRs in compiler design.

## Why Use Intermediate Representations?

The traditional view of a compiler as a simple source-to-target translator obscures the sophisticated internal machinery that makes modern compilers both powerful and maintainable. IRs solve several critical problems in compiler design.

### Decoupling Frontend and Backend

Without an IR, a compiler supporting M source languages and N target architectures would require M × N implementations. By introducing an IR layer, this reduces to M + N implementations: M frontends translating source languages to IR, and N backends translating IR to target code. This modularity is exemplified by compiler infrastructures like LLVM, where hundreds of languages compile to LLVM IR, which then targets dozens of architectures.

### Enabling Optimization

Source code is designed for human readability, not analysis. Machine code is constrained by architectural details. IRs strike a balance, providing a representation amenable to analysis and transformation. Most optimization passes operate on IR rather than source or assembly code.

Consider a simple expression: `a + b * c + d`. In source form, precedence rules and syntax complicate analysis. In IR, the computation structure becomes explicit, enabling optimizations like common subexpression elimination and algebraic simplification.

### Progressive Lowering

Modern compilers often use multiple IRs at different abstraction levels. High-level IRs preserve source-level semantics (types, control structures), enabling language-specific optimizations. Low-level IRs expose machine-level details (registers, memory layout), enabling target-specific optimizations. This progressive lowering allows each optimization to work at the most appropriate abstraction level.

## High-Level vs Low-Level IR

IRs exist on a spectrum from high-level (close to source) to low-level (close to machine code). The choice of abstraction level involves fundamental trade-offs.

### High-Level Intermediate Representations

High-level IRs maintain rich semantic information from the source language. They typically preserve:

- Type information and type hierarchies
- Structured control flow (loops, conditionals with clear nesting)
- High-level operations (array access, field selection, method calls)
- Scope and symbol information

**Example: High-Level IR for Object-Oriented Code**

```
class Point {
    field x: int
    field y: int

    method distance(other: Point): float {
        dx = this.x - other.x
        dy = this.y - other.y
        return sqrt(dx*dx + dy*dy)
    }
}
```

High-level IRs facilitate optimizations like:
- Inlining based on call graphs
- Type-based alias analysis
- Dead code elimination using scope information
- Loop transformations using structured control flow

The primary disadvantage is complexity: maintaining rich semantic information requires sophisticated data structures and analysis algorithms.

### Low-Level Intermediate Representations

Low-level IRs approach machine code abstractions, exposing implementation details while remaining architecture-independent. They typically feature:

- Simple, uniform instruction formats
- Explicit memory operations
- Unstructured control flow (labels and jumps)
- Minimal type information
- Explicit representation of calling conventions

**Example: Low-Level IR for the Same Code**

```
_Point_distance:
    t1 = load [this + 0]      ; load this.x
    t2 = load [other + 0]     ; load other.x
    t3 = t1 - t2              ; dx
    t4 = load [this + 4]      ; load this.y
    t5 = load [other + 4]     ; load other.y
    t6 = t4 - t5              ; dy
    t7 = t3 * t3              ; dx*dx
    t8 = t6 * t6              ; dy*dy
    t9 = t7 + t8
    t10 = call sqrt(t9)
    return t10
```

Low-level IRs enable optimizations like:
- Register allocation
- Instruction scheduling
- Peephole optimization
- Machine-specific instruction selection

The simplicity of low-level IRs makes them easier to process, but the loss of high-level information can prevent certain optimizations.

## Graphical vs Linear Representations

IRs can be represented as graphs (nodes and edges) or as linear sequences (instruction lists). Each approach has distinct advantages.

### Graphical Representations

Graphical IRs use nodes for operations and edges for data or control flow. Common forms include:

**Abstract Syntax Trees (ASTs)**: Represent program structure hierarchically. Each node corresponds to a language construct (expression, statement, declaration).

**Directed Acyclic Graphs (DAGs)**: Like ASTs but allow sharing of common subexpressions. For `(a + b) * (a + b)`, a DAG represents `a + b` once, with both multiplication operands pointing to it.

**Control Flow Graphs (CFGs)**: Nodes represent basic blocks (straight-line code sequences), edges represent possible control flow paths.

**Data Flow Graphs (DFGs)**: Nodes represent operations, edges represent data dependencies.

**Example: DAG for Expression Optimization**

```
For expression: x = (a + b) * (a + b) - (a + b)

      (-)
     /   \
   (*)   (+)
   / \     |
 (+) (+)<--+  (reused node)
 / \ / \
a  b a  b
```

The DAG reveals that `a + b` is computed three times in the source but needs computation only once.

**Advantages of Graphical IRs:**
- Make data and control dependencies explicit
- Facilitate analysis algorithms (dominance, reachability)
- Natural representation for certain optimizations
- Support non-linear traversal patterns

**Disadvantages:**
- Complex to manipulate (node insertion, deletion)
- Harder to serialize for inter-pass communication
- Less intuitive for programmers to read

### Linear Representations

Linear IRs represent programs as sequences of instructions, similar to assembly language but at higher abstraction levels.

**Example: Linear IR (Three-Address Code)**

```
t1 = a + b
t2 = t1 * t1
t3 = t2 - t1
x = t3
```

**Advantages of Linear IRs:**
- Simple to generate and manipulate
- Easy to serialize and deserialize
- Familiar to programmers (resembles assembly)
- Straightforward instruction scheduling

**Disadvantages:**
- Dependencies implicit (require analysis to extract)
- Order-dependent semantics can complicate reordering
- May require auxiliary data structures (CFGs) for analysis

### Hybrid Approaches

Many modern compilers use hybrid representations: linear instruction sequences organized into graphical structures. A CFG with basic blocks exemplifies this: within each basic block, instructions are linear; the overall program structure is a graph.

## Design Considerations for IRs

Choosing or designing an IR involves balancing multiple criteria:

**Expressiveness**: Can the IR represent all necessary language features and optimizations?

**Analyzability**: How easily can compilers extract information (dependencies, types, control flow)?

**Transformability**: How easily can optimizations modify the IR?

**Compactness**: How much memory does the IR consume?

**Readability**: Can humans understand and debug IR programs?

**Target Independence**: How divorced is the IR from specific machine architectures?

Different compiler phases may use different IRs optimized for their specific needs. The art of compiler design includes selecting the right IR for each phase and managing transitions between IRs.

## Key Takeaways

- Intermediate Representations decouple compiler frontends from backends, reducing implementation complexity from M × N to M + N for multiple languages and targets
- IRs enable sophisticated optimizations by providing representations more amenable to analysis than source code and more flexible than machine code
- High-level IRs preserve semantic information for language-specific optimizations; low-level IRs expose machine-level details for target-specific optimizations
- Graphical IRs (ASTs, DAGs, CFGs) make dependencies explicit and facilitate graph algorithms, while linear IRs (three-address code) are simpler to generate and manipulate
- Modern compilers often employ multiple IRs at different abstraction levels, progressively lowering from high-level to low-level representations
- IR design involves trade-offs between expressiveness, analyzability, transformability, compactness, readability, and target independence
- The choice of IR fundamentally shapes what optimizations are feasible and how efficiently the compiler can perform them
