# Virtual Machines

Virtual machines provide an abstraction layer between compiled code and physical hardware, enabling portability, security, and dynamic optimization. Rather than compiling directly to machine code for a specific processor, languages like Java, Python, and WebAssembly compile to bytecode for a virtual machine. This bytecode is then either interpreted or compiled to native code at runtime. Understanding virtual machine design is crucial for implementing modern programming languages and runtime systems.

## Virtual Machine Architectures

Virtual machines can be categorized by how they represent computation and manage state. The two primary models are stack-based and register-based architectures.

### Stack-Based Virtual Machines

Stack machines maintain an operand stack where operations pop their arguments and push results. This design simplifies bytecode generation and produces compact code.

```c
// Stack VM instruction set
typedef enum {
    OP_PUSH,    // Push constant onto stack
    OP_POP,     // Pop value from stack
    OP_ADD,     // Pop two values, push sum
    OP_SUB,     // Pop two values, push difference
    OP_MUL,     // Pop two values, push product
    OP_LOAD,    // Load local variable onto stack
    OP_STORE,   // Store top of stack to local variable
    OP_CALL,    // Call function
    OP_RETURN,  // Return from function
} OpCode;

typedef struct {
    OpCode op;
    int operand;  // Optional operand (for PUSH, LOAD, STORE, etc.)
} Instruction;

// Stack VM state
typedef struct {
    int *stack;
    int stack_top;
    int *locals;       // Local variables
    Instruction *code;
    int pc;            // Program counter
} StackVM;

// Execute one instruction
void stack_vm_step(StackVM *vm) {
    Instruction instr = vm->code[vm->pc++];

    switch (instr.op) {
        case OP_PUSH:
            vm->stack[++vm->stack_top] = instr.operand;
            break;

        case OP_ADD: {
            int b = vm->stack[vm->stack_top--];
            int a = vm->stack[vm->stack_top--];
            vm->stack[++vm->stack_top] = a + b;
            break;
        }

        case OP_SUB: {
            int b = vm->stack[vm->stack_top--];
            int a = vm->stack[vm->stack_top--];
            vm->stack[++vm->stack_top] = a - b;
            break;
        }

        case OP_MUL: {
            int b = vm->stack[vm->stack_top--];
            int a = vm->stack[vm->stack_top--];
            vm->stack[++vm->stack_top] = a * b;
            break;
        }

        case OP_LOAD:
            vm->stack[++vm->stack_top] = vm->locals[instr.operand];
            break;

        case OP_STORE:
            vm->locals[instr.operand] = vm->stack[vm->stack_top--];
            break;

        // Additional cases for CALL, RETURN, etc.
    }
}
```

Example bytecode for expression `(a + b) * c`:
```
LOAD 0      // Load local 0 (a)
LOAD 1      // Load local 1 (b)
ADD         // a + b
LOAD 2      // Load local 2 (c)
MUL         // (a + b) * c
```

Stack machines excel at compact code representation. The JVM and WebAssembly are stack-based.

### Register-Based Virtual Machines

Register machines explicitly name registers in instructions, similar to physical CPUs. This reduces the number of instructions but increases instruction size.

```c
// Register VM instruction set
typedef enum {
    REG_LOADK,   // Load constant to register
    REG_MOVE,    // Copy between registers
    REG_ADD,     // Add two registers, store in third
    REG_SUB,     // Subtract registers
    REG_MUL,     // Multiply registers
    REG_CALL,    // Call function
    REG_RETURN,  // Return from function
} RegOpCode;

typedef struct {
    RegOpCode op;
    int dest;       // Destination register
    int src1;       // First source register
    int src2;       // Second source register or immediate
} RegInstruction;

// Register VM state
typedef struct {
    int *registers;
    int num_registers;
    RegInstruction *code;
    int pc;
} RegisterVM;

// Execute one instruction
void register_vm_step(RegisterVM *vm) {
    RegInstruction instr = vm->code[vm->pc++];

    switch (instr.op) {
        case REG_LOADK:
            vm->registers[instr.dest] = instr.src1;
            break;

        case REG_MOVE:
            vm->registers[instr.dest] = vm->registers[instr.src1];
            break;

        case REG_ADD:
            vm->registers[instr.dest] =
                vm->registers[instr.src1] + vm->registers[instr.src2];
            break;

        case REG_SUB:
            vm->registers[instr.dest] =
                vm->registers[instr.src1] - vm->registers[instr.src2];
            break;

        case REG_MUL:
            vm->registers[instr.dest] =
                vm->registers[instr.src1] * vm->registers[instr.src2];
            break;

        // Additional cases
    }
}
```

Example bytecode for `(a + b) * c`:
```
ADD R3, R0, R1    // R3 = a + b
MUL R4, R3, R2    // R4 = R3 * c
```

Register machines like Lua's VM can execute fewer instructions for the same computation. They map more naturally to physical CPUs.

## Bytecode Interpreters

Interpreters execute bytecode instruction by instruction. Efficient interpretation is critical for languages that don't use JIT compilation.

### Switch-Based Dispatch

The simplest interpreter uses a switch statement:

```c
void interpret(StackVM *vm) {
    while (1) {
        Instruction instr = vm->code[vm->pc++];

        switch (instr.op) {
            case OP_PUSH:
                vm->stack[++vm->stack_top] = instr.operand;
                break;

            case OP_ADD: {
                int b = vm->stack[vm->stack_top--];
                int a = vm->stack[vm->stack_top--];
                vm->stack[++vm->stack_top] = a + b;
                break;
            }

            case OP_RETURN:
                return;

            // Other cases...
        }
    }
}
```

Switch-based dispatch is simple but suffers from indirect branch misprediction and poor instruction cache utilization.

### Threaded Code

Threaded interpreters use an array of function pointers, one per opcode, improving dispatch performance:

```c
// Direct threaded interpreter
void **compile_to_threaded_code(Instruction *bytecode, int length) {
    void **threaded = malloc(length * sizeof(void*));

    for (int i = 0; i < length; i++) {
        threaded[i] = dispatch_table[bytecode[i].op];
    }

    return threaded;
}

// Dispatch table
void *dispatch_table[] = {
    &&op_push,
    &&op_pop,
    &&op_add,
    &&op_sub,
    &&op_mul,
    // ...
};

// Interpreter loop using computed goto
void interpret_threaded(void **code, StackVM *vm) {
    #define DISPATCH() goto *code[vm->pc++]
    #define NEXT_OP() DISPATCH()

    DISPATCH();

op_push:
    vm->stack[++vm->stack_top] = ((Instruction*)code[vm->pc])->operand;
    NEXT_OP();

op_add: {
    int b = vm->stack[vm->stack_top--];
    int a = vm->stack[vm->stack_top--];
    vm->stack[++vm->stack_top] = a + b;
    NEXT_OP();
}

// Other operation labels...

    #undef DISPATCH
    #undef NEXT_OP
}
```

Computed gotos (a GCC extension) enable efficient direct jumps between instruction handlers.

### Superinstructions

Superinstructions fuse common instruction sequences into single instructions:

```c
// Common pattern: LOAD, LOAD, ADD
typedef enum {
    // Basic ops
    OP_PUSH,
    OP_ADD,
    // Superinstructions
    OP_LOAD_LOAD_ADD,  // Fused: load two locals and add
} SuperOpCode;

case OP_LOAD_LOAD_ADD: {
    int idx1 = instr.operand >> 16;
    int idx2 = instr.operand & 0xFFFF;
    vm->stack[++vm->stack_top] = vm->locals[idx1] + vm->locals[idx2];
    break;
}
```

Superinstructions reduce dispatch overhead and enable more optimization opportunities.

## Memory Management in Virtual Machines

VMs typically provide automatic memory management:

```c
// Simple object representation
typedef struct {
    int type_id;
    int size;
    int marked;      // For GC
    char data[];
} VMObject;

// Allocation in VM
VMObject *vm_alloc(StackVM *vm, int type_id, int size) {
    if (vm->heap_used + size > vm->heap_size) {
        vm_garbage_collect(vm);

        if (vm->heap_used + size > vm->heap_size) {
            vm_error("Out of memory");
            return NULL;
        }
    }

    VMObject *obj = (VMObject *)(vm->heap + vm->heap_used);
    obj->type_id = type_id;
    obj->size = size;
    obj->marked = 0;

    vm->heap_used += sizeof(VMObject) + size;

    return obj;
}
```

## Security and Sandboxing

VMs provide security through controlled execution:

```c
// Bytecode verification
bool verify_bytecode(Instruction *code, int length) {
    int stack_depth = 0;
    int max_stack = 0;

    for (int i = 0; i < length; i++) {
        switch (code[i].op) {
            case OP_PUSH:
                stack_depth++;
                if (stack_depth > max_stack)
                    max_stack = stack_depth;
                break;

            case OP_ADD:
            case OP_SUB:
            case OP_MUL:
                if (stack_depth < 2)
                    return false;  // Stack underflow
                stack_depth--;
                break;

            case OP_LOAD:
                if (code[i].operand < 0 || code[i].operand >= num_locals)
                    return false;  // Invalid local access
                stack_depth++;
                break;

            // Verify all instructions
        }
    }

    return true;
}
```

Verification ensures:
- No stack overflow/underflow
- Valid memory access
- Type safety
- No illegal operations

## Calling Conventions

VMs define how functions are called and how parameters are passed:

```c
// Stack-based calling convention
void vm_call(StackVM *vm, int func_index, int arg_count) {
    // Save current frame
    CallFrame frame;
    frame.return_pc = vm->pc;
    frame.locals = vm->locals;
    frame.stack_base = vm->stack_top - arg_count;

    push_call_frame(vm, &frame);

    // Set up new frame
    vm->pc = vm->functions[func_index].code_offset;
    vm->locals = &vm->stack[vm->stack_top - arg_count + 1];

    // Arguments are now in locals[0..arg_count-1]
}

void vm_return(StackVM *vm) {
    int return_value = vm->stack[vm->stack_top];

    CallFrame frame = pop_call_frame(vm);

    // Restore previous frame
    vm->pc = frame.return_pc;
    vm->locals = frame.locals;
    vm->stack_top = frame.stack_base;

    // Push return value
    vm->stack[++vm->stack_top] = return_value;
}
```

## Optimizations

VMs employ various optimizations:

### Inline Caching

Cache method lookup results:

```c
// Inline cache for method calls
typedef struct {
    int cached_type;
    void *cached_method;
} InlineCache;

void vm_call_method(VMObject *obj, int method_id, InlineCache *cache) {
    if (cache->cached_type == obj->type_id) {
        // Fast path: cached
        call_method(cache->cached_method);
    } else {
        // Slow path: lookup and cache
        void *method = lookup_method(obj->type_id, method_id);
        cache->cached_type = obj->type_id;
        cache->cached_method = method;
        call_method(method);
    }
}
```

### Constant Folding

Evaluate constant expressions at load time:

```c
// Before: PUSH 2, PUSH 3, ADD
// After:  PUSH 5
```

## Key Takeaways

- Virtual machines provide platform abstraction, enabling portability and security through controlled execution environments.
- Stack-based VMs use an operand stack, producing compact bytecode, while register-based VMs explicitly name registers, reducing instruction count.
- Bytecode interpreters execute VM instructions through dispatch mechanisms, with threaded code and computed gotos improving performance over simple switch statements.
- Superinstructions fuse common instruction sequences to reduce dispatch overhead and enable optimization.
- VM security relies on bytecode verification to prevent stack overflow, invalid memory access, and type violations.
- Inline caching and other optimizations bridge the performance gap between interpreted and compiled code.
- Modern VMs combine interpretation with JIT compilation for optimal performance across different execution phases.
