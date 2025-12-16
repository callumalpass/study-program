# JIT Compilation

Just-In-Time (JIT) compilation bridges the gap between interpreted and ahead-of-time compiled code by compiling bytecode or intermediate representations to native machine code during program execution. This enables optimizations based on actual runtime behavior while maintaining the portability and security benefits of virtual machine execution. Modern JIT compilers can produce code that rivals or exceeds statically compiled code through aggressive optimization based on runtime profiling.

## JIT Compilation Fundamentals

A JIT compiler translates bytecode or intermediate code to native machine code at runtime. Unlike static compilation which happens once before execution, JIT compilation occurs during execution, allowing optimization decisions based on actual program behavior.

### Basic JIT Architecture

```c
// JIT compiler structure
typedef struct {
    void *code_cache;           // Executable memory for compiled code
    size_t code_cache_size;
    size_t code_cache_used;

    HashMap *compiled_functions; // Maps bytecode addr -> native code
    Profiler *profiler;          // Tracks hot functions/loops
} JITCompiler;

// Compile bytecode to native code
typedef void (*NativeFunction)(void);

NativeFunction jit_compile(JITCompiler *jit, Instruction *bytecode, int length) {
    // Allocate space in code cache
    void *code_ptr = jit->code_cache + jit->code_cache_used;

    // Translate bytecode to machine code
    CodeBuffer buffer;
    codebuffer_init(&buffer, code_ptr);

    for (int i = 0; i < length; i++) {
        emit_native_code(&buffer, &bytecode[i]);
    }

    // Make memory executable
    make_executable(code_ptr, buffer.size);

    jit->code_cache_used += buffer.size;

    return (NativeFunction)code_ptr;
}
```

### Mixed-Mode Execution

Most JIT systems start by interpreting code and compile hot paths:

```c
// Function state tracking
typedef enum {
    STATE_INTERPRETED,      // Currently interpreted
    STATE_COMPILING,        // Being compiled
    STATE_COMPILED          // Native code available
} FunctionState;

typedef struct {
    Instruction *bytecode;
    int length;
    FunctionState state;
    void *native_code;
    int invocation_count;
    int compile_threshold;
} Function;

void execute_function(JITCompiler *jit, Function *func) {
    func->invocation_count++;

    if (func->state == STATE_COMPILED) {
        // Fast path: execute native code
        NativeFunction native = (NativeFunction)func->native_code;
        native();
    } else if (func->invocation_count > func->compile_threshold) {
        // Trigger compilation
        func->state = STATE_COMPILING;
        func->native_code = jit_compile(jit, func->bytecode, func->length);
        func->state = STATE_COMPILED;

        // Execute newly compiled code
        ((NativeFunction)func->native_code)();
    } else {
        // Slow path: interpret
        interpret(func->bytecode, func->length);
    }
}
```

## Code Generation

The JIT emits native machine code dynamically:

```c
// x86-64 code generation example
typedef struct {
    uint8_t *code;
    size_t capacity;
    size_t size;
} CodeBuffer;

// Emit instruction bytes
void emit_bytes(CodeBuffer *buf, const uint8_t *bytes, size_t count) {
    memcpy(buf->code + buf->size, bytes, count);
    buf->size += count;
}

// Emit ADD instruction: add rax, rbx
void emit_add_rax_rbx(CodeBuffer *buf) {
    uint8_t instr[] = {0x48, 0x01, 0xD8};  // REX.W ADD r/m64, r64
    emit_bytes(buf, instr, sizeof(instr));
}

// Emit MOV instruction: mov rax, imm64
void emit_mov_rax_imm(CodeBuffer *buf, int64_t value) {
    uint8_t instr[] = {0x48, 0xB8};  // REX.W MOV r64, imm64
    emit_bytes(buf, instr, sizeof(instr));
    emit_bytes(buf, (uint8_t*)&value, sizeof(value));
}

// Compile simple bytecode instruction
void emit_native_code(CodeBuffer *buf, Instruction *instr) {
    switch (instr->op) {
        case OP_PUSH:
            // Push constant: mov rax, imm; push rax
            emit_mov_rax_imm(buf, instr->operand);
            emit_bytes(buf, (uint8_t[]){0x50}, 1);  // PUSH rax
            break;

        case OP_ADD:
            // Pop two values, add, push result
            emit_bytes(buf, (uint8_t[]){0x5B}, 1);  // POP rbx
            emit_bytes(buf, (uint8_t[]){0x58}, 1);  // POP rax
            emit_add_rax_rbx(buf);
            emit_bytes(buf, (uint8_t[]){0x50}, 1);  // PUSH rax
            break;

        // Other opcodes...
    }
}
```

## Optimization Techniques

JIT compilers perform optimizations based on runtime information:

### Type Specialization

Generate specialized code for observed types:

```c
// Generic add function (slow)
Value add_generic(Value a, Value b) {
    if (a.type == TYPE_INT && b.type == TYPE_INT) {
        return make_int(a.int_val + b.int_val);
    } else if (a.type == TYPE_FLOAT || b.type == TYPE_FLOAT) {
        return make_float(to_float(a) + to_float(b));
    }
    // Other cases...
}

// JIT specializes for observed types
void emit_specialized_add(CodeBuffer *buf, ValueType type) {
    if (type == TYPE_INT) {
        // Generate fast integer add
        emit_bytes(buf, (uint8_t[]){0x5B}, 1);     // POP rbx
        emit_bytes(buf, (uint8_t[]){0x58}, 1);     // POP rax
        emit_add_rax_rbx(buf);                      // ADD rax, rbx
        emit_bytes(buf, (uint8_t[]){0x50}, 1);     // PUSH rax
    } else if (type == TYPE_FLOAT) {
        // Generate floating-point add using SSE
        // MOVSD xmm0, [rsp]; MOVSD xmm1, [rsp+8]; ADDSD xmm0, xmm1
        // ...
    }
}
```

### Inline Caching in JIT

JIT compilers use inline caches to optimize polymorphic operations:

```c
// Generated code with inline cache
void jit_emit_method_call(CodeBuffer *buf, int method_id) {
    // Inline cache structure stored in generated code
    static InlineCache cache = {0, NULL};

    // Generated assembly (pseudo-code):
    //   mov rax, [object]          ; Load object
    //   mov rbx, [rax + type_offset]  ; Load type ID
    //   cmp rbx, [cache.type]       ; Compare with cached type
    //   jne slow_path               ; If different, take slow path
    //   call [cache.method]         ; Fast path: direct call
    //   jmp done
    // slow_path:
    //   call lookup_method          ; Lookup method
    //   mov [cache.type], rbx       ; Update cache
    //   mov [cache.method], rax
    //   call rax
    // done:
}
```

### Loop Optimization

JIT compilers can optimize hot loops:

```c
// Example: array sum loop
for (int i = 0; i < n; i++) {
    sum += array[i];
}

// JIT can:
// 1. Eliminate bounds checks if it proves array access is safe
// 2. Vectorize using SIMD instructions
// 3. Unroll the loop
void emit_optimized_loop(CodeBuffer *buf) {
    // Vectorized sum using SSE (pseudo-code)
    //   xorps xmm0, xmm0           ; sum = 0
    //   mov rcx, 0                  ; i = 0
    // loop:
    //   cmp rcx, n
    //   jge done
    //   movdqu xmm1, [array + rcx*4]  ; Load 4 elements
    //   addps xmm0, xmm1               ; Add to sum
    //   add rcx, 4                     ; i += 4
    //   jmp loop
    // done:
    //   haddps xmm0, xmm0             ; Horizontal add
    //   haddps xmm0, xmm0
}
```

## Tracing JITs

Tracing JITs record execution paths and compile frequently executed traces:

```c
typedef struct {
    Instruction *trace;
    int length;
    int execution_count;
    void *native_code;
} Trace;

typedef struct {
    bool recording;
    Instruction *record_buffer;
    int record_length;
    int record_start_pc;
} TraceRecorder;

// Record executed instructions
void trace_instruction(TraceRecorder *recorder, Instruction instr) {
    if (!recorder->recording)
        return;

    recorder->record_buffer[recorder->record_length++] = instr;

    // Stop recording at backward branch (loop)
    if (instr.op == OP_JUMP && instr.operand < recorder->record_start_pc) {
        finish_trace(recorder);
    }
}

// Compile recorded trace
Trace *finish_trace(TraceRecorder *recorder) {
    Trace *trace = malloc(sizeof(Trace));
    trace->length = recorder->record_length;
    trace->trace = malloc(trace->length * sizeof(Instruction));
    memcpy(trace->trace, recorder->record_buffer,
           trace->length * sizeof(Instruction));

    // Compile trace to native code
    trace->native_code = jit_compile_trace(trace);

    recorder->recording = false;
    return trace;
}
```

Tracing JITs excel at optimizing loops because they see the actual execution path, enabling:
- Guard elimination for type checks that always succeed
- Dead code elimination for branches never taken
- More aggressive inlining

## Tiered Compilation

Modern JIT systems use multiple tiers of compilation:

```c
typedef enum {
    TIER_INTERPRETER,       // Simple interpreter
    TIER_BASELINE,          // Fast, unoptimized JIT
    TIER_OPTIMIZED          // Slow, aggressive optimization
} CompilationTier;

typedef struct {
    CompilationTier tier;
    void *code[3];          // Code for each tier
    int invocation_count;
    ProfileData *profile;
} TieredFunction;

void execute_tiered(TieredFunction *func) {
    func->invocation_count++;

    if (func->tier == TIER_INTERPRETER) {
        interpret(func->bytecode);

        if (func->invocation_count > BASELINE_THRESHOLD) {
            // Tier up to baseline JIT
            func->code[TIER_BASELINE] = compile_baseline(func);
            func->tier = TIER_BASELINE;
        }
    } else if (func->tier == TIER_BASELINE) {
        ((NativeFunction)func->code[TIER_BASELINE])();

        // Collect profile data
        update_profile(func->profile);

        if (func->invocation_count > OPTIMIZED_THRESHOLD) {
            // Tier up to optimizing JIT
            func->code[TIER_OPTIMIZED] =
                compile_optimized(func, func->profile);
            func->tier = TIER_OPTIMIZED;
        }
    } else {
        ((NativeFunction)func->code[TIER_OPTIMIZED])();
    }
}
```

Tiers balance compilation time vs. execution speed:
- **Tier 0 (Interpreter)**: No compilation cost, slow execution
- **Tier 1 (Baseline JIT)**: Fast compilation, reasonable performance
- **Tier 2 (Optimizing JIT)**: Slow compilation, excellent performance

## Deoptimization

Optimized code may make assumptions that later become invalid, requiring deoptimization:

```c
// Optimized code assumes object has type T
void optimized_function() {
    // Guard: check assumption still holds
    if (object->type != T) {
        deoptimize();
    }

    // Fast path using T-specific code
    process_as_type_T(object);
}

// Deoptimization transfers back to interpreter
void deoptimize() {
    // Reconstruct interpreter state from JIT state
    restore_stack_frame();
    restore_locals();

    // Return to interpreter
    current_function->tier = TIER_INTERPRETER;
    longjmp(interpreter_entry, 1);
}
```

## On-Stack Replacement (OSR)

OSR allows transitioning from interpreted to compiled code mid-execution:

```c
// Hot loop detected during interpretation
void interpret_with_osr() {
    while (pc < code_length) {
        // Check if we should OSR
        if (is_hot_loop(pc) && has_compiled_version(pc)) {
            // Transfer to compiled code
            void *compiled = get_compiled_version(pc);

            // Map interpreter state to compiled state
            save_interpreter_state();

            // Jump into compiled code
            ((void (*)(InterpreterState*))compiled)(interpreter_state);

            // Return here when compiled code finishes
            restore_interpreter_state();
            return;
        }

        execute_instruction(code[pc++]);
    }
}
```

## Profiling for JIT

Accurate profiling guides optimization:

```c
typedef struct {
    int call_count;
    int *branch_counts;      // For each branch
    TypeProfile *type_profiles;  // For each polymorphic operation
} ProfileData;

// Profile-guided optimization
void compile_with_profile(Function *func, ProfileData *profile) {
    for (int i = 0; i < func->length; i++) {
        if (func->bytecode[i].op == OP_BRANCH) {
            // Use profile data for branch prediction
            if (profile->branch_counts[i] > 0.9 * func->invocation_count) {
                // Branch almost always taken - optimize for that
                emit_predicted_branch(i, true);
            }
        }

        if (is_polymorphic_op(func->bytecode[i].op)) {
            // Specialize for common types
            TypeProfile *tp = &profile->type_profiles[i];
            if (tp->dominant_type_frequency > 0.95) {
                emit_specialized_op(tp->dominant_type);
            }
        }
    }
}
```

## Key Takeaways

- JIT compilation translates bytecode to native code at runtime, enabling platform portability while achieving native performance.
- Mixed-mode execution starts with interpretation and progressively compiles hot code, balancing startup time with peak performance.
- JIT compilers use runtime profiling to guide optimizations, specializing code for observed types and execution patterns.
- Tracing JITs record actual execution paths through loops, enabling aggressive optimization of hot traces.
- Tiered compilation uses multiple optimization levels, quickly generating baseline code then later applying expensive optimizations to hot functions.
- Deoptimization and on-stack replacement enable transitioning between optimization levels when assumptions change or code becomes hot.
- Modern JIT compilers can match or exceed ahead-of-time compiled code through speculative optimization based on runtime behavior.
