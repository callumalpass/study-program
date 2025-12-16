# IR Lowering: Translating High-Level Constructs

IR lowering, also called IR elaboration or desugaring, is the process of translating high-level language constructs into simpler, more primitive IR operations. This transformation bridges the semantic gap between source languages and executable code, making complex language features explicit and amenable to optimization and code generation. Understanding lowering strategies is essential for implementing language features correctly and efficiently.

## What is IR Lowering?

Lowering transforms abstract, high-level operations into sequences of lower-level operations that more directly correspond to machine capabilities. This process:

- **Eliminates language abstractions**: Features like classes, exceptions, or closures are expressed in terms of primitive operations
- **Makes implicit operations explicit**: Hidden costs (memory allocation, type conversions, bounds checking) become visible
- **Simplifies subsequent compilation phases**: Optimization and code generation work with a smaller, more uniform set of operations

Lowering typically happens in stages, with multiple IR levels at progressively lower abstractions.

## Lowering Control Structures

High-level control structures provide readability and structure but must be reduced to conditional and unconditional jumps for execution.

### If-Then-Else

The canonical if-statement:
```c
if (condition) {
    then_block
} else {
    else_block
}
```

**Standard Lowering:**
```
    t1 = evaluate(condition)
    ifFalse t1 goto L_else
    then_block
    goto L_end
L_else:
    else_block
L_end:
    ; continue
```

**Optimized (no else clause):**
```c
if (condition) {
    then_block
}
```

```
    t1 = evaluate(condition)
    ifFalse t1 goto L_end
    then_block
L_end:
    ; continue
```

### While Loops

**Source:**
```c
while (condition) {
    body
}
```

**Standard Lowering (test before loop):**
```
L_test:
    t1 = evaluate(condition)
    ifFalse t1 goto L_end
    body
    goto L_test
L_end:
```

**Alternative (test at end, requires do-while semantics):**
```
    goto L_test
L_body:
    body
L_test:
    t1 = evaluate(condition)
    if t1 goto L_body
```

### For Loops

**Source:**
```c
for (init; condition; update) {
    body
}
```

**Lowering:**
```
    init
L_test:
    t1 = evaluate(condition)
    ifFalse t1 goto L_end
    body
    update
    goto L_test
L_end:
```

This makes the initialization, testing, and update steps explicit, revealing optimization opportunities (e.g., loop-invariant code motion on init or update).

### Switch Statements

Switch statements can be lowered in multiple ways depending on case density and range.

**Source:**
```c
switch (x) {
    case 1: A; break;
    case 2: B; break;
    case 3: C; break;
    default: D;
}
```

**Linear Search (sparse cases):**
```
    if x == 1 goto L_A
    if x == 2 goto L_B
    if x == 3 goto L_C
    goto L_D
L_A: A
     goto L_end
L_B: B
     goto L_end
L_C: C
     goto L_end
L_D: D
L_end:
```

**Jump Table (dense cases):**
```
    if x < 1 || x > 3 goto L_D
    t1 = x - 1              ; normalize to 0-based
    t2 = t1 * 8             ; pointer size (assuming 64-bit)
    t3 = &jump_table + t2
    goto *t3                ; indirect jump

jump_table: [L_A, L_B, L_C]

L_A: A
     goto L_end
L_B: B
     goto L_end
L_C: C
     goto L_end
L_D: D
L_end:
```

**Hybrid**: For partially dense cases, use binary search or a combination of jump tables and linear search.

## Lowering Data Structures

High-level data structures must be lowered to memory operations.

### Arrays

**Multi-dimensional Arrays:**

Source:
```c
int A[10][20];
x = A[i][j];
```

**Row-major lowering:**
```
    t1 = i * 20             ; row size
    t2 = t1 + j             ; linear index
    t3 = t2 * 4             ; element size (int = 4 bytes)
    t4 = &A + t3            ; element address
    x = *t4                 ; load
```

This exposes the address calculation, enabling optimizations like strength reduction (converting multiplication to addition in loops).

**Bounds Checking:**

Safe languages insert bounds checks:
```
    if i < 0 || i >= 10 goto bounds_error
    if j < 0 || j >= 20 goto bounds_error
    ; ... array access as above
```

Optimizing compilers try to eliminate redundant checks (e.g., loop induction variable ranges).

### Structures/Records

**Source:**
```c
struct Point {
    int x;  // offset 0
    int y;  // offset 4
};

Point p;
p.y = 10;
```

**Lowering:**
```
    t1 = &p + 4             ; offset of y field
    *t1 = 10                ; store
```

Field access becomes address arithmetic. Alignment and padding are made explicit at this level.

### Objects and Virtual Calls

Object-oriented features require substantial lowering.

**Virtual Method Call:**

Source:
```java
obj.method(arg);
```

**Lowering (assuming vtable dispatch):**
```
    t1 = *obj               ; load vtable pointer (first field)
    t2 = t1 + 16            ; offset of method (method index * pointer size)
    t3 = *t2                ; load method address
    call t3(obj, arg)       ; indirect call with 'this' pointer
```

This makes dynamic dispatch explicit, revealing costs and enabling optimizations like devirtualization (converting virtual calls to direct calls when the type is statically known).

## Lowering Expressions

Complex expressions are decomposed into primitive operations.

### Short-Circuit Evaluation

**Source:**
```c
if (a && b) {
    then_part
}
```

**Lowering:**
```
    ifFalse a goto L_false
    ifFalse b goto L_false
    then_part
    goto L_end
L_false:
    ; ...
L_end:
```

The second condition is only evaluated if the first is true, making the short-circuit semantics explicit.

### Ternary Operator

**Source:**
```c
x = condition ? true_expr : false_expr;
```

**Lowering:**
```
    ifFalse condition goto L_false
    t1 = true_expr
    goto L_assign
L_false:
    t1 = false_expr
L_assign:
    x = t1
```

Both branches compute a value stored in the same temporary, then assigned to x.

### Type Conversions

Implicit conversions become explicit operations.

**Source:**
```c
int i = 42;
double d = i;  // implicit int-to-double conversion
```

**Lowering:**
```
    i = 42
    t1 = int_to_double(i)
    d = t1
```

Different conversions (widening, narrowing, signed/unsigned) map to different low-level operations, some requiring multiple instructions.

## Lowering Advanced Features

More sophisticated language features require complex lowering strategies.

### Closures and First-Class Functions

Closures (functions that capture variables from their defining scope) require creating data structures to hold captured variables.

**Source:**
```javascript
function outer(x) {
    function inner(y) {
        return x + y;
    }
    return inner;
}
```

**Lowering (simplified):**
```
function outer(x):
    env = allocate(closure_env)     ; heap allocation
    env.x = x                        ; store captured variable
    closure = allocate(closure)
    closure.code = &inner_code       ; function pointer
    closure.env = env                ; environment pointer
    return closure

inner_code(closure, y):              ; implicit closure parameter
    env = closure.env
    x = env.x                        ; load captured variable
    return x + y
```

This transforms closures into pairs of function pointer and environment, making the cost of capturing variables explicit.

### Exception Handling

Exception handling requires maintaining handler tables and stack unwinding mechanisms.

**Source:**
```java
try {
    risky_operation();
} catch (Exception e) {
    handle(e);
}
```

**Lowering (conceptual):**
```
    push_exception_handler(L_catch, Exception)
    call risky_operation
    pop_exception_handler
    goto L_end

L_catch:                            ; exception handler
    e = get_exception()
    call handle(e)
L_end:
```

Real implementations use exception tables mapping program counter ranges to handler addresses, avoiding overhead in the non-exceptional path.

### Generators/Coroutines

Generators require state machines to suspend and resume execution.

**Source:**
```python
def counter(n):
    i = 0
    while i < n:
        yield i
        i += 1
```

**Lowering (state machine):**
```
struct counter_state {
    int state;  // 0 = start, 1 = after_yield, 2 = done
    int i;
    int n;
}

function counter_next(gen_state):
    switch gen_state.state:
        case 0: goto L_start
        case 1: goto L_after_yield
        case 2: return END

L_start:
    gen_state.i = 0
L_loop:
    if gen_state.i >= gen_state.n goto L_done
    gen_state.state = 1
    return gen_state.i              ; yield

L_after_yield:
    gen_state.i = gen_state.i + 1
    goto L_loop

L_done:
    gen_state.state = 2
    return END
```

Each yield point becomes a state, with the state variable controlling control flow on resumption.

## Lowering Memory Management

Memory allocation and deallocation strategies must be made explicit.

### Stack Allocation

Local variables typically use stack allocation:

**Source:**
```c
void foo() {
    int x;
    int arr[100];
    // ...
}
```

**Lowering:**
```
foo:
    sp = sp - 404           ; allocate (100 * 4 + 4 bytes)
    ; x is at [sp+0]
    ; arr is at [sp+4]
    ; ...
    sp = sp + 404           ; deallocate
    return
```

### Heap Allocation

Dynamic allocation calls runtime allocator:

**Source:**
```c
int* p = malloc(sizeof(int));
```

**Lowering:**
```
    t1 = call malloc(4)
    p = t1
```

Garbage-collected languages may insert write barriers:

**Source:**
```java
obj.field = value;
```

**Lowering (with GC write barrier):**
```
    t1 = &obj + field_offset
    *t1 = value
    call gc_write_barrier(obj, value)  ; notify GC of pointer write
```

## Progressive Lowering Strategies

Modern compilers use multiple lowering stages:

1. **High-level IR**: Close to source, with language-specific constructs (classes, exceptions, etc.)
2. **Mid-level IR**: Generic control flow and data operations, but still relatively abstract
3. **Low-level IR**: Close to machine code, with explicit memory operations and calling conventions

Each stage enables optimizations appropriate to that abstraction level. High-level optimizations (inlining, devirtualization) work on high-level IR; low-level optimizations (register allocation, instruction scheduling) work on low-level IR.

## Key Takeaways

- IR lowering transforms high-level language constructs into simpler, lower-level operations, making abstractions explicit and enabling optimization
- Control structures (if, while, for, switch) are lowered to conditional and unconditional jumps, with strategy choices (jump tables vs. linear search) affecting performance
- Data structure access (arrays, structs, objects) becomes explicit address arithmetic and memory operations, exposing optimization opportunities
- Multi-dimensional arrays lower to linearized address calculations; objects lower to vtable lookups for virtual calls and field offsets for member access
- Short-circuit evaluation, ternary operators, and type conversions receive explicit control flow or conversion operations during lowering
- Advanced features like closures lower to heap-allocated environments and function pointers; exceptions lower to handler tables and stack unwinding
- Generators and coroutines become state machines with explicit state variables controlling suspension and resumption points
- Memory management (stack allocation, heap allocation, GC barriers) is made explicit during lowering, revealing costs and enabling analysis
- Progressive lowering through multiple IR levels allows optimizations at appropriate abstraction levels, from high-level semantic optimizations to low-level machine-specific transformations
- Effective lowering balances preserving information for optimization with simplifying the IR for efficient analysis and code generation
