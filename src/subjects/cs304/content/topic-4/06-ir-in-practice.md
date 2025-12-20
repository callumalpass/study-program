# Intermediate Representations in Practice

While theoretical IR concepts provide the foundation, understanding how real-world compiler infrastructures implement and use IRs is essential for practical compiler development. This section examines three influential IR designs: LLVM IR, GCC's GIMPLE, and briefly surveys other practical IRs. We'll explore their design philosophies, concrete representations, and how they balance competing demands of expressiveness, efficiency, and analyzability.

## LLVM IR: A Modern Standard

LLVM (Low Level Virtual Machine) is arguably the most influential compiler infrastructure of the 21st century. Its IR has become a de facto standard, supported by hundreds of languages and serving as the target for diverse frontends.

### Design Philosophy

LLVM IR is designed to be:
- **Low-level but target-independent**: Abstracts away architecture-specific details while remaining close to machine code
- **Strongly typed**: Every value has a type, enabling type-based optimizations and safety checks
- **SSA-based**: All values are in SSA form, facilitating optimization
- **Three-form representation**: Exists as in-memory data structures, human-readable text, and compact bitcode

### Type System

LLVM has a rich type system:

**Primitive Types:**
```llvm
i1      ; 1-bit integer (boolean)
i8      ; 8-bit integer (byte/char)
i32     ; 32-bit integer
i64     ; 64-bit integer
float   ; 32-bit floating point
double  ; 64-bit floating point
```

**Derived Types:**
```llvm
[10 x i32]              ; array of 10 32-bit integers
i32*                    ; pointer to 32-bit integer
{i32, i8*, double}      ; structure type
<4 x float>             ; vector of 4 floats (SIMD)
```

**Function Types:**
```llvm
i32 (i32, i32)*         ; pointer to function taking two i32s, returning i32
```

### Basic Structure

LLVM programs consist of modules containing functions containing basic blocks containing instructions.

**Example: Simple Function**

C source:
```c
int add(int a, int b) {
    return a + b;
}
```

LLVM IR:
```llvm
define i32 @add(i32 %a, i32 %b) {
entry:
    %result = add i32 %a, %b
    ret i32 %result
}
```

Breaking this down:
- `define`: Function definition
- `i32`: Return type
- `@add`: Global function name (@ prefix for globals)
- `i32 %a, i32 %b`: Parameters (% prefix for local values)
- `entry:`: Basic block label
- `%result = add i32 %a, %b`: SSA assignment
- `ret i32 %result`: Return instruction

### Control Flow in LLVM IR

LLVM uses explicit terminators for basic blocks.

**Conditional Branch:**
```llvm
define i32 @max(i32 %a, i32 %b) {
entry:
    %cmp = icmp sgt i32 %a, %b        ; signed greater-than comparison
    br i1 %cmp, label %if.then, label %if.else

if.then:
    ret i32 %a

if.else:
    ret i32 %b
}
```

**Phi Nodes:**
```llvm
define i32 @abs(i32 %x) {
entry:
    %cmp = icmp slt i32 %x, 0
    br i1 %cmp, label %if.then, label %if.end

if.then:
    %neg = sub i32 0, %x
    br label %if.end

if.end:
    %result = phi i32 [ %neg, %if.then ], [ %x, %entry ]
    ret i32 %result
}
```

The phi node merges `%neg` (from `if.then`) and `%x` (from `entry`), with explicit labels showing which value comes from which predecessor.

### Memory Model

LLVM distinguishes between values (SSA registers) and memory (load/store operations).

**Allocation:**
```llvm
%ptr = alloca i32           ; allocate stack space for i32
store i32 42, i32* %ptr     ; store value to memory
%val = load i32, i32* %ptr  ; load value from memory
```

**Getelementptr (GEP)**: LLVM's sophisticated instruction for address calculation:

```llvm
; Struct: {i32, [10 x float], i8*}
%ptr = getelementptr {i32, [10 x float], i8*},
                     {i32, [10 x float], i8*}* %struct_ptr,
                     i32 0,     ; index into pointer (0 = no offset)
                     i32 1,     ; field 1 = [10 x float] array
                     i32 3      ; element 3 of array

; This computes: &struct_ptr->field1[3]
```

GEP performs type-aware pointer arithmetic, crucial for optimization because it preserves structural information.

### LLVM's Three Representations

**In-Memory (C++ objects)**: Compiler passes manipulate `llvm::Module`, `llvm::Function`, `llvm::Instruction` objects.

**Text (.ll files)**: Human-readable form for debugging and learning.

**Bitcode (.bc files)**: Compact binary serialization for distribution and linking. Apple's app store bitcode submission uses this.

### Metadata and Attributes

LLVM attaches metadata for optimizations, debugging, and semantics:

```llvm
!0 = !{!"debug info"}
!1 = !{!"optimization hint"}

define i32 @foo(i32* noalias %ptr) !dbg !0 {
    %val = load i32, i32* %ptr, !invariant.load !1
    ret i32 %val
}
```

- `noalias`: Pointer doesn't alias with others
- `!invariant.load`: Value won't change
- `!dbg`: Debug information

### LLVM Optimization Pipeline

LLVM organizes optimizations as passes operating on IR:

```
Source → Frontend → LLVM IR → Optimization Passes → Backend → Machine Code
                        ↓
                 [Inlining, SCCP, GVN, DCE, Loop opts, ...]
```

Common passes:
- **mem2reg**: Promotes memory to SSA registers
- **instcombine**: Simplifies instruction sequences
- **gvn**: Global value numbering
- **loop-unroll**: Unrolls loops
- **licm**: Loop-invariant code motion

## GCC's GIMPLE

GCC (GNU Compiler Collection) uses multiple IRs, with GIMPLE being the primary mid-level representation.

### Design Philosophy

GIMPLE is:
- **Simplified**: Three-address code with restricted operands
- **Tuples-based**: Instructions are tuples (operation + operands)
- **SSA and non-SSA forms**: Can operate in both modes
- **Language-independent**: Abstracts away source language details

### GIMPLE Forms

**High GIMPLE**: Just after parsing, still has complex expressions.

**Low GIMPLE**: Fully lowered, ready for optimization.

**GIMPLE SSA**: SSA form for most optimizations.

### Example Lowering

C source:
```c
int foo(int a, int b, int c) {
    return a + b * c;
}
```

GIMPLE (simplified):
```
foo (int a, int b, int c)
{
    int D.1;
    int D.2;

    D.1 = b * c;
    D.2 = a + D.1;
    return D.2;
}
```

Each complex expression is decomposed. `D.1`, `D.2` are compiler-generated temporaries.

### GIMPLE Statements

GIMPLE has a restricted set of statement types:

**Assignment:**
```
D.1 = a + b
```

**Conditional:**
```
if (a < b)
    goto <label>;
else
    goto <label>;
```

**Function Call:**
```
D.1 = foo(a, b);
```

**Labels and Gotos:**
```
<label>:
goto <label>;
```

### SSA in GIMPLE

GIMPLE can be converted to SSA form for optimizations:

```
# Before SSA
a = 1;
a = a + 2;
return a;

# After SSA
a_1 = 1;
a_2 = a_1 + 2;
return a_2;
```

Phi nodes at merge points:
```
if (cond)
    a_1 = 1;
else
    a_2 = 2;
a_3 = PHI <a_1, a_2>
return a_3;
```

### GCC Optimization Pipeline

```
Source → Parser → GENERIC → GIMPLE → SSA optimizations → RTL → Machine Code
                                 ↓
                          [VRP, PRE, DCE, Inlining, ...]
```

After GIMPLE optimizations, GCC lowers to RTL (Register Transfer Language), a low-level IR close to assembly, for final optimizations and code generation.

## Other Notable IRs

### Java Bytecode

**Purpose**: Platform-independent distribution format for Java.

**Characteristics:**
- Stack-based (not register-based)
- Strongly typed
- Class-file format with constant pool
- JIT compilers translate to machine code at runtime

**Example:**
```java
int add(int a, int b) {
    return a + b;
}
```

Bytecode:
```
iload_0      ; load local 0 (a) onto stack
iload_1      ; load local 1 (b) onto stack
iadd         ; pop two values, add, push result
ireturn      ; return int from stack
```

### WebAssembly (Wasm)

**Purpose**: Portable compilation target for web and beyond.

**Characteristics:**
- Stack-based with structured control flow
- Minimal type system (i32, i64, f32, f64)
- Designed for fast decoding and validation
- Both binary and text formats

**Example (text format):**
```wasm
(func $add (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add
)
```

### JVM Internal IRs

Modern JVMs (HotSpot, OpenJ9) use sophisticated IRs:

**HotSpot C2 Compiler (Sea-of-Nodes):**
- Graph-based IR where nodes represent operations
- Edges represent data and control dependencies
- Enables aggressive optimizations through graph transformations

**Graal IR:**
- Graph-based, similar to Sea-of-Nodes
- SSA-based
- Language-agnostic (supports Java, JavaScript, Python, Ruby, etc., via Truffle)

### MLIR (Multi-Level IR)

**Purpose**: Framework for building IRs and transformations.

**Innovation**: Instead of one IR, MLIR provides infrastructure for defining domain-specific IRs at various abstraction levels, with conversions between them.

**Example (toy dialect):**
```mlir
func @foo(%arg0: tensor<2x3xf64>) -> tensor<3x2xf64> {
    %0 = "toy.transpose"(%arg0) : (tensor<2x3xf64>) -> tensor<3x2xf64>
    return %0 : tensor<3x2xf64>
}
```

MLIR is used in TensorFlow, LLVM's new parallel IR, and various domain-specific compilers.

## Comparing IR Designs

| Feature | LLVM IR | GIMPLE | Java Bytecode | WebAssembly |
|---------|---------|---------|---------------|-------------|
| **Form** | SSA, register-based | Tuple, SSA optional | Stack-based | Stack-based |
| **Abstraction** | Low-level | Mid-level | High-level | Low-level |
| **Types** | Rich, explicit | Simple | Rich, class-based | Minimal |
| **Control Flow** | Unstructured (CFG) | Unstructured | Structured | Structured |
| **Target** | Native compilation | Native compilation | VM execution | VM/Native hybrid |
| **Optimization Level** | Extensive | Extensive | JIT-driven | JIT/AOT-driven |

## Practical Considerations

### Choosing an IR

**For new language implementations:**
- **Use LLVM IR** if targeting native code with state-of-the-art optimizations
- **Use JVM bytecode** if leveraging Java ecosystem and runtime
- **Use WebAssembly** if targeting web browsers or sandboxed environments
- **Build custom IR** only if domain-specific requirements can't be met by existing IRs

### IR Interoperability

Modern systems often use multiple IRs:
- **Rust**: High-level MIR (Mid-level IR) → LLVM IR
- **Swift**: SIL (Swift Intermediate Language) → LLVM IR
- **Kotlin**: Kotlin IR → JVM bytecode or LLVM IR (Kotlin/Native)

This allows language-specific optimizations on high-level IR before lowering to general-purpose IR.

### Debugging IR

Most IR implementations provide:
- **Text dumps**: Human-readable IR for inspection
- **Visualization**: Control flow graphs, dominator trees
- **Verification passes**: Ensure IR invariants (SSA validity, type correctness)

LLVM:
```bash
clang -S -emit-llvm source.c -o output.ll    # Generate text IR
opt -dot-cfg output.ll                       # Generate CFG visualization
```

GCC:
```bash
gcc -fdump-tree-all source.c                 # Dump GIMPLE at all stages
```

## Key Takeaways

- LLVM IR is a low-level, strongly-typed, SSA-based IR that has become a standard target for language implementations, offering three representations (in-memory, text, bitcode) and extensive optimization infrastructure
- LLVM's type system includes primitives, arrays, structures, pointers, vectors, and functions, with sophisticated instructions like getelementptr for type-aware address calculation
- GCC's GIMPLE is a tuple-based, three-address code IR that operates in both SSA and non-SSA forms, serving as GCC's primary optimization IR before lowering to RTL
- Java Bytecode is a stack-based, platform-independent IR for JVM execution, designed for compact distribution and JIT compilation at runtime
- WebAssembly is a stack-based IR with structured control flow and minimal types, designed for fast decoding and safe execution in web and embedded environments
- Different IRs make different trade-offs: LLVM prioritizes optimization power, GIMPLE emphasizes simplicity, bytecode formats prioritize portability and compact encoding
- Modern compiler infrastructures often use multiple IRs at different abstraction levels, allowing language-specific optimizations before lowering to general-purpose IRs
- MLIR provides infrastructure for building custom domain-specific IRs with well-defined transformations, representing a new paradigm beyond single-IR approaches
- When choosing an IR, consider target platform (native vs. VM), optimization requirements, ecosystem support, and whether domain-specific needs justify a custom IR
- Practical IR work requires understanding text formats, verification passes, and debugging tools like CFG visualization and intermediate dumps at various compilation stages
