# Calling Conventions

Calling conventions define the low-level interface for function calls, specifying how arguments are passed, how return values are communicated, which registers must be preserved, and how the stack is managed. These conventions ensure binary compatibility between separately-compiled code and form the foundation of the Application Binary Interface (ABI).

## The Role of Calling Conventions

When a function is called, the caller and callee must agree on:

1. **Argument passing**: Where to place function parameters (registers, stack, or both)
2. **Return values**: How to communicate results back to the caller
3. **Register preservation**: Which registers the callee must save and restore
4. **Stack management**: How to set up and tear down stack frames
5. **Cleanup responsibility**: Who removes arguments from the stack

Without standardized conventions, code from different compilers or languages couldn't interoperate.

### Example Function Call

```c
// C code
int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(5, 10);
    return result;
}
```

The calling convention determines the exact assembly generated for this call.

## x86-64 System V ABI

The System V ABI is used on Unix-like systems (Linux, macOS, BSD) for x86-64 architecture.

### Parameter Passing

**Integer/Pointer Arguments** (first six in registers):
```
Argument Position | Register
------------------|----------
1st               | RDI
2nd               | RSI
3rd               | RDX
4th               | RCX
5th               | R8
6th               | R9
7th and beyond    | Stack (right-to-left)
```

**Floating-Point Arguments** (first eight in registers):
```
XMM0, XMM1, XMM2, XMM3, XMM4, XMM5, XMM6, XMM7
```

### Example with Registers

```c
long foo(long a, long b, long c, long d, long e, long f, long g, long h) {
    return a + b + c + d + e + f + g + h;
}
```

Generated assembly:
```asm
foo:
    ; Arguments: a=RDI, b=RSI, c=RDX, d=RCX, e=R8, f=R9
    ; g and h on stack at [rsp+8] and [rsp+16]
    add  rdi, rsi      ; a + b
    add  rdi, rdx      ; + c
    add  rdi, rcx      ; + d
    add  rdi, r8       ; + e
    add  rdi, r9       ; + f
    add  rdi, [rsp+8]  ; + g
    add  rdi, [rsp+16] ; + h
    mov  rax, rdi      ; Return value in RAX
    ret
```

### Return Values

- **Integer/pointer results**: RAX (64-bit), or RDX:RAX (128-bit)
- **Floating-point results**: XMM0 (or XMM0:XMM1 for complex types)
- **Large structures**: Caller allocates space; address passed as hidden first argument in RDI

```c
// Large structure return
struct Big {
    long data[100];
};

struct Big get_big() {
    struct Big result;
    // Fill result...
    return result;
}

// Translated to:
void get_big(struct Big *hidden_ret) {
    // Fill *hidden_ret...
}

// Caller:
struct Big b;
get_big(&b);  // Hidden pointer passed in RDI
```

### Register Preservation

**Caller-saved (volatile)**: Caller must save if needed across calls
```
RAX, RCX, RDX, RSI, RDI, R8, R9, R10, R11
XMM0-XMM15
```

**Callee-saved (non-volatile)**: Callee must preserve
```
RBX, RBP, R12, R13, R14, R15
```

Example:
```asm
caller:
    mov  rbx, 42       ; RBX is callee-saved
    mov  rdi, 5        ; RDI is caller-saved (argument)
    call foo
    ; RBX still contains 42 here
    ; RDI may have been destroyed
    ret

foo:
    push rbx           ; Save callee-saved register
    mov  rbx, rdi      ; Use RBX
    ; ... computation
    pop  rbx           ; Restore
    ret
```

### Stack Alignment

The stack must be 16-byte aligned before `call` instructions:

```asm
; Stack alignment example
main:
    ; RSP is 16-byte aligned on entry
    sub  rsp, 8        ; Allocate space (maintain alignment)
    call foo           ; CALL pushes 8-byte return address
    ; Inside foo, RSP is again 16-byte aligned
    add  rsp, 8
    ret
```

Misaligned stacks cause crashes with SSE instructions that require alignment.

## x86-64 Microsoft ABI

Windows uses a different convention:

### Parameter Passing

**First Four Arguments**:
```
RCX, RDX, R8, R9 (integers/pointers)
XMM0, XMM1, XMM2, XMM3 (floating-point)
```

**Fifth and beyond**: Stack (left-to-right)

### Shadow Space

Caller must reserve 32 bytes of "shadow space" on stack for the callee to spill register arguments:

```asm
; Calling foo(1, 2, 3, 4, 5, 6)
sub  rsp, 48          ; 32 bytes shadow space + 16 bytes for args 5,6
mov  rcx, 1
mov  rdx, 2
mov  r8, 3
mov  r9, 4
mov  qword [rsp+32], 5   ; 5th argument
mov  qword [rsp+40], 6   ; 6th argument
call foo
add  rsp, 48
```

### Register Preservation

**Caller-saved**: RAX, RCX, RDX, R8, R9, R10, R11, XMM0-XMM5

**Callee-saved**: RBX, RBP, RDI, RSI, RSP, R12-R15, XMM6-XMM15

Note: RDI and RSI are callee-saved on Windows but caller-saved on System V.

## ARM64 (AArch64) Procedure Call Standard

ARM64 uses a clean, register-rich calling convention.

### Parameter Passing

**Integer/Pointer Arguments**:
```
X0, X1, X2, X3, X4, X5, X6, X7 (first eight arguments)
Remaining arguments on stack
```

**Floating-Point Arguments**:
```
V0-V7 (first eight floating-point arguments)
```

### Register Roles

```
X0-X7    - Arguments and return values
X8       - Indirect result location register
X9-X15   - Temporary registers (caller-saved)
X16-X17  - Intra-procedure-call temporary (IP0, IP1)
X18      - Platform register (reserved)
X19-X28  - Callee-saved registers
X29      - Frame pointer (FP)
X30      - Link register (LR, holds return address)
SP       - Stack pointer
```

### Example ARM64 Function

```c
long add(long a, long b) {
    return a + b;
}
```

```asm
add:
    add  x0, x0, x1    ; x0 = x0 + x1 (return value already in x0)
    ret                ; Return (branch to address in LR)
```

### Link Register

ARM64 uses a link register (X30/LR) instead of pushing return address to stack:

```asm
caller:
    mov  x0, 5
    bl   foo           ; Branch-and-link: LR = PC+4, PC = foo
    ; Returns here

foo:
    ; LR contains return address
    ret                ; Branches to address in LR
```

For nested calls, save LR to stack:

```asm
foo:
    stp  x29, x30, [sp, #-16]!  ; Save FP and LR, pre-decrement SP
    bl   bar                      ; Call another function
    ldp  x29, x30, [sp], #16      ; Restore FP and LR, post-increment SP
    ret
```

## Variadic Functions

Functions with variable arguments (like `printf`) require special handling.

### x86-64 System V Variadic Calls

Caller passes the number of floating-point arguments in AL:

```c
printf("%d %f %s", 42, 3.14, "hello");
```

```asm
; Integer arguments: 42 in RSI
; Float arguments: 3.14 in XMM0
; String argument: "hello" address in RDX
mov  rdi, format_string
mov  rsi, 42
movsd xmm0, [float_3_14]
mov  rdx, hello_string
mov  al, 1              ; One floating-point argument
call printf
```

### va_list Implementation

The compiler generates code for `va_arg` to walk the argument list:

```c
int sum(int count, ...) {
    va_list args;
    va_start(args, count);

    int total = 0;
    for (int i = 0; i < count; i++) {
        total += va_arg(args, int);
    }

    va_end(args);
    return total;
}
```

`va_list` typically contains:
- Pointer to stack arguments
- Number of register arguments used
- Saved register argument area

## Tail Call Optimization

A tail call (function call as the last action) can be optimized into a jump:

```c
int factorial_helper(int n, int acc) {
    if (n <= 1)
        return acc;
    return factorial_helper(n - 1, n * acc);  // Tail call
}
```

Without optimization:
```asm
factorial_helper:
    cmp  rdi, 1
    jg   .recursive
    mov  rax, rsi
    ret
.recursive:
    mov  rax, rdi
    dec  rdi
    imul rsi, rax
    call factorial_helper  ; Regular call (pushes return address)
    ret
```

With tail call optimization:
```asm
factorial_helper:
    cmp  rdi, 1
    jg   .recursive
    mov  rax, rsi
    ret
.recursive:
    mov  rax, rdi
    dec  rdi
    imul rsi, rax
    jmp  factorial_helper  ; Tail call becomes jump (no stack growth)
```

The `jmp` reuses the current stack frame, preventing stack overflow for deep recursion.

## Position-Independent Code (PIC)

Shared libraries must be loadable at any address, requiring position-independent code.

### Global Offset Table (GOT)

External data accesses go through the GOT:

```c
extern int global_var;

int get_global() {
    return global_var;
}
```

PIC assembly (x86-64):
```asm
get_global:
    mov  rax, [rip + global_var@GOTPCREL]  ; Load GOT entry address
    mov  eax, [rax]                         ; Load actual value
    ret
```

The GOT is fixed up by the dynamic linker at load time.

### Procedure Linkage Table (PLT)

External function calls go through the PLT:

```asm
    call external_func@PLT
```

The PLT provides a level of indirection allowing lazy binding (resolving symbols on first use).

## Special Calling Conventions

### fastcall

Uses more registers for arguments:
- x86: ECX, EDX for first two arguments
- Reduces stack usage and improves performance

### vectorcall (Microsoft)

Optimized for passing vector/SIMD types:
- First six vector arguments in XMM0-XMM5
- Used in high-performance numeric code

### thiscall (C++)

For non-static member functions, the `this` pointer is passed specially:
- x86 Microsoft: `this` in ECX
- x86-64: `this` as first argument (in RDI/RCX depending on ABI)

```cpp
class Foo {
    int x;
public:
    int get() { return x; }
};

// Compiled as:
int Foo_get(Foo *this) {
    return this->x;
}
```

## Compiler Code Generation

The compiler must generate calling sequences for both caller and callee:

### Caller Responsibilities

```c
result = foo(a, b, c);
```

Generated code:
1. Save caller-saved registers if live across call
2. Place arguments in registers/stack per convention
3. Align stack if necessary
4. Execute `call` instruction
5. Retrieve return value from designated register
6. Clean up stack arguments if required
7. Restore caller-saved registers

### Callee Responsibilities

```c
int foo(int a, int b, int c) {
    // Function body
}
```

Generated code:
1. **Prologue**: Save frame pointer, allocate stack frame, save callee-saved registers
2. Copy register arguments to stack if needed (for address-taken parameters)
3. Execute function body
4. Place return value in designated register
5. **Epilogue**: Restore callee-saved registers, restore frame pointer, deallocate stack frame
6. Return to caller

Example prologue/epilogue:
```asm
foo:
    ; Prologue
    push rbp
    mov  rbp, rsp
    sub  rsp, 32       ; Allocate 32 bytes for locals
    push rbx           ; Save callee-saved register

    ; Function body
    ; ...

    ; Epilogue
    pop  rbx           ; Restore callee-saved register
    mov  rsp, rbp      ; Deallocate locals
    pop  rbp           ; Restore frame pointer
    ret
```

## Key Takeaways

- Calling conventions standardize function call interfaces, specifying argument passing, return values, register preservation, and stack management
- x86-64 System V ABI (Unix/Linux) passes first six integer arguments in RDI, RSI, RDX, RCX, R8, R9; Microsoft ABI uses RCX, RDX, R8, R9 with mandatory 32-byte shadow space
- ARM64 provides eight argument registers (X0-X7) and uses a link register (LR) for return addresses instead of stack-based return addresses
- Register preservation divides registers into caller-saved (volatile, caller must preserve) and callee-saved (non-volatile, callee must preserve)
- Large structures are returned via hidden pointer arguments; variadic functions require special handling to walk variable argument lists
- Tail call optimization converts final function calls into jumps, reusing stack frames and enabling unbounded recursion
- Position-independent code uses GOT for data and PLT for functions to enable shared libraries loadable at arbitrary addresses
- Compilers generate caller sequences (argument setup, call, result retrieval) and callee sequences (prologue, body, epilogue) according to the target ABI
