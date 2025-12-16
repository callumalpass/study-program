# Instruction Selection

Instruction selection transforms intermediate representation (IR) into target machine instructions. This critical compilation phase determines the quality of generated code by choosing instruction sequences that are both correct and efficient. The challenge lies in mapping high-level operations to low-level machine instructions while minimizing instruction count, register usage, and execution time.

## The Instruction Selection Problem

Given an intermediate representation and a target instruction set, instruction selection must find an optimal mapping from IR operations to machine instructions.

### IR Representation

Compilers typically represent programs as expression trees or directed acyclic graphs (DAGs):

```
       =
      / \
     a   +
        / \
       *   d
      / \
     b   c

Represents: a = (b * c) + d
```

Each node represents an operation; edges represent data dependencies. The instruction selector must cover this tree with machine instructions.

### Instruction Templates

Machine instructions are represented as templates that match tree patterns:

```
ADD reg, reg       ; Matches: + with two register operands
LOAD reg, [addr]   ; Matches: memory load
IMUL reg, reg, imm ; Matches: * with register and immediate

x86 examples:
add  rax, rbx      ; rax = rax + rbx
imul rax, rcx, 5   ; rax = rcx * 5
lea  rax, [rbx+rcx*4] ; rax = rbx + rcx * 4
```

Each template has a cost (instruction count, latency, code size) and produces a result in a register.

## Tree Matching Algorithms

Instruction selection can be formulated as finding a minimum-cost tiling of the IR tree with instruction templates.

### Tree Pattern Matching

Consider selecting instructions for `a = (b * c) + d`:

```
Option 1: Separate multiply and add
  mov  rax, b
  imul rax, c      ; rax = b * c
  add  rax, d      ; rax = rax + d
  mov  a, rax
  Cost: 4 instructions

Option 2: Use LEA (x86-specific)
  mov  rax, b
  lea  rax, [rax + d*1]  ; rax = rax + d (if applicable)
  ; Not applicable here due to multiply
```

The matcher must consider all valid tilings and select the minimum cost covering.

### Dynamic Programming Solution

Tree matching uses bottom-up dynamic programming to find optimal instruction sequences:

```python
def select_instructions(node):
    if node is None:
        return None

    # Process children first (bottom-up)
    left = select_instructions(node.left)
    right = select_instructions(node.right)

    # Find all templates matching this node
    best_cost = infinity
    best_instruction = None

    for template in matching_templates(node):
        cost = template.cost
        if left:
            cost += left.cost
        if right:
            cost += right.cost

        if cost < best_cost:
            best_cost = cost
            best_instruction = template

    return Instruction(best_instruction, left, right, best_cost)
```

This algorithm guarantees optimal instruction selection for tree-structured IR.

### Tree Grammars

Instruction selection can be formalized using tree grammars where non-terminals represent addressing modes and computation states:

```
Grammar for simple expression evaluation:

reg → CONST(c)              [mov reg, c]      cost=1
reg → MEM(addr)             [load reg, addr]  cost=3
reg → ADD(reg, reg)         [add reg, reg]    cost=1
reg → MUL(reg, reg)         [imul reg, reg]   cost=3
addr → reg                  [use reg as addr] cost=0
addr → ADD(addr, CONST)     [addr + offset]   cost=0

Non-terminal "reg" represents a value in a register
Non-terminal "addr" represents an addressing mode
```

Tree grammar-based generators (like BURG, iburg) automatically generate instruction selectors from specifications.

## Tiling Strategies

Tiling refers to covering the IR tree with instruction tiles (templates). Different strategies balance optimality with compilation speed.

### Optimal Tiling

Dynamic programming finds the globally optimal tiling:

```
Expression: a = (b + c) * (d + e)

IR Tree:
       *
      / \
     +   +
    / \ / \
   b  c d  e

Optimal tiling for x86:
  mov  rax, b
  add  rax, c      ; rax = b + c
  mov  rbx, d
  add  rbx, e      ; rbx = d + e
  imul rax, rbx    ; rax = rax * rbx
  mov  a, rax

Cost: 6 instructions
```

Optimal tiling guarantees minimum cost but requires examining all possible tilings.

### Maximal Munch

Maximal munch (greedy tiling) selects the largest matching template at each step, proceeding top-down or bottom-up.

**Algorithm**:
1. Start at tree root (or leaves for bottom-up)
2. Find the largest template matching the current subtree
3. Emit the instruction and mark covered nodes
4. Recursively process uncovered subtrees

**Example**:
```c
// C code: a[i] = a[i] + 1

IR Tree (simplified):
      =
     / \
   []   +
   / \  / \
  a  i []  1
       / \
      a  i

x86 maximal munch:
; Large tile: array load, increment, store
mov  rax, [a]           ; Load array base
mov  rbx, i             ; Load index
mov  rcx, [rax+rbx*8]   ; Load a[i]
inc  rcx                ; Increment
mov  [rax+rbx*8], rcx   ; Store a[i]
```

Maximal munch is fast but not always optimal. It may miss opportunities where smaller tiles combine more efficiently.

### Advantages and Limitations

**Optimal Tiling**:
- Guarantees minimum cost
- Handles complex instruction sets well
- Slow for large programs (exponential worst case)

**Maximal Munch**:
- Fast, linear-time complexity
- Simple implementation
- May generate suboptimal code for complex patterns

Modern compilers often use maximal munch for speed, then apply peephole optimization to improve local instruction sequences.

## Advanced Instruction Selection

### DAG-Based Selection

Programs contain common subexpressions better represented as DAGs than trees:

```c
// Common subexpression: b * c used twice
x = (b * c) + d;
y = (b * c) - e;

DAG representation:
       =      =
      / \    / \
     x   +  y   -
        / \    / \
       *   d  *   e  ← Same node (b * c)
      / \
     b   c
```

DAG-based selection computes `b * c` once and reuses the result:

```x86asm
mov  rax, b
imul rax, c        ; rax = b * c
mov  rbx, rax
add  rbx, d        ; rbx = (b * c) + d
mov  x, rbx
mov  rcx, rax      ; Reuse b * c
sub  rcx, e        ; rcx = (b * c) - e
mov  y, rcx
```

This requires tracking which values remain in registers between statements.

### Instruction Selection with Side Effects

Instructions may have side effects (setting flags, memory ordering) that complicate selection:

```x86asm
; x86 arithmetic sets condition flags
add  rax, rbx      ; Sets ZF, SF, CF, OF flags
jz   label         ; Jump if zero flag set

; Must preserve flags if used:
cmp  rax, rbx      ; Sets flags
add  rcx, rdx      ; Overwrites flags!
je   label         ; Uses flags from cmp (WRONG!)

; Correct version:
cmp  rax, rbx      ; Sets flags
je   label         ; Use flags immediately
add  rcx, rdx      ; Now safe to modify flags
```

The selector must track flag lifetimes and insert register saves or reorder instructions to preserve semantics.

### Complex Addressing Modes

Modern architectures offer complex addressing modes that combine multiple operations:

```x86asm
; x86 addressing: [base + index*scale + displacement]
mov  rax, [rbx + rcx*8 + 16]

Encodes: rax = *(rbx + rcx * 8 + 16)

Can represent:
- Array access: a[i] where rbx = &a[0], rcx = i, scale = sizeof(element)
- Struct field: p->field where rbx = p, displacement = offset
- Combined: array[i].field
```

Instruction selection must recognize these patterns in the IR:

```
Pattern:  LOAD(ADD(ADD(base, MUL(index, scale)), offset))
Template: mov reg, [base + index*scale + offset]
```

Effective pattern matching significantly reduces instruction count.

## Macro Expansion

Some IR operations don't map directly to single instructions and require expansion into instruction sequences.

### Division by Constants

Division is expensive (20-40 cycles on x86). Division by constant powers of two becomes right shift:

```c
// C code
int x = y / 8;

// IR: DIV(y, 8)

// x86 instruction selection
sar  rax, 3        ; Arithmetic right shift by 3 (divide by 2^3 = 8)
```

Division by other constants uses multiplication by reciprocal:

```c
// C code
int x = y / 7;

// IR: DIV(y, 7)

// x86 instruction sequence (approximation)
mov  rax, y
mov  rdx, 0x2492492492492493   ; Magic constant (reciprocal * 2^64)
imul rdx                        ; Multiply
sar  rdx, 2                     ; Adjust
```

The magic constant `m = ⌈2^(n+l) / d⌉` allows computing `⌊x/d⌋ ≈ ⌊(x * m) / 2^(n+l)⌋`.

### Function Calls

Function calls expand into prologue, argument passing, call, and epilogue sequences:

```c
// C code
result = foo(a, b, c);

// Expands to (x86-64 System V ABI):
mov  rdi, a        ; First argument
mov  rsi, b        ; Second argument
mov  rdx, c        ; Third argument
call foo           ; Call function
mov  result, rax   ; Get return value
```

The instruction selector must know calling conventions and generate appropriate code.

## Retargetable Instruction Selection

Modern compilers support multiple architectures through retargetable instruction selectors.

### LLVM Approach

LLVM uses TableGen to specify target instruction patterns:

```tablegen
// ARM64 pattern example
def : Pat<(add GPR64:$Rn, GPR64:$Rm),
          (ADDXrr GPR64:$Rn, GPR64:$Rm)>;

def : Pat<(add GPR64:$Rn, (imm:$imm)),
          (ADDXri GPR64:$Rn, imm:$imm)>;

// Pattern with complex transformation
def : Pat<(mul GPR64:$Rn, (imm:$imm)),
          (multiply_immediate GPR64:$Rn, imm:$imm)>,
      Requires<[IsValidMultiplyImmediate]>;
```

TableGen generates C++ instruction selector code from these declarative specifications, enabling rapid retargeting to new architectures.

## Key Takeaways

- Instruction selection maps IR operations to target machine instructions, fundamentally determining code quality
- The problem reduces to minimum-cost tree tiling, solvable optimally via dynamic programming
- Tree grammars formalize instruction selection with non-terminals representing addressing modes and computation states
- Maximal munch provides fast, greedy tiling but may miss optimal sequences; optimal tiling guarantees minimum cost at higher compilation cost
- DAG-based selection exploits common subexpressions by computing shared values once and reusing results
- Complex addressing modes enable compact code by combining operations like array indexing and struct field access into single instructions
- Macro expansion handles operations without direct instruction mappings, like constant division using reciprocal multiplication
- Retargetable selectors use declarative specifications (tree grammars, pattern matchers) to generate target-specific code automatically
