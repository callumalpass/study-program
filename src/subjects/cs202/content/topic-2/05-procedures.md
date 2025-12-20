# Procedures and the Call Stack

Procedures (functions) are the building blocks of modular programs. Understanding how they work at the assembly level—including calling conventions, stack frames, and register usage—is essential for systems programming, debugging, and performance optimization.

## The Call Stack

The **call stack** is a region of memory used for:
- Return addresses (where to continue after function returns)
- Function parameters (when not passed in registers)
- Local variables
- Saved register values

The stack grows **downward** on x86 (from high addresses to low addresses):

```
High Address
┌─────────────────────┐
│   Previous frames   │
├─────────────────────┤
│   Return address    │ ← Pushed by CALL
├─────────────────────┤
│   Saved RBP         │ ← Pushed by callee
├─────────────────────┤ ← RBP points here
│   Local variable 1  │
│   Local variable 2  │
│   ...               │
├─────────────────────┤ ← RSP points here
│   (free space)      │
└─────────────────────┘
Low Address
```

## CALL and RET Instructions

### CALL - Call Procedure

```nasm
call my_function
```

This instruction:
1. Pushes the return address (address of next instruction) onto the stack
2. Jumps to the function address

Equivalent to:
```nasm
push rip + 5          ; Push return address (approximately)
jmp my_function
```

### RET - Return from Procedure

```nasm
ret
```

This instruction:
1. Pops the return address from the stack
2. Jumps to that address

Equivalent to:
```nasm
pop temp
jmp temp
```

## System V AMD64 Calling Convention

The **System V AMD64 ABI** is used on Linux, macOS, and other Unix-like systems.

### Argument Passing

**Integer/Pointer arguments** (in order):
1. RDI
2. RSI
3. RDX
4. RCX
5. R8
6. R9
7. Stack (right-to-left)

**Floating-point arguments**:
1. XMM0 - XMM7
8. Stack

```nasm
; Calling: result = func(1, 2, 3, 4, 5, 6, 7, 8)
push 8                    ; 8th argument on stack
push 7                    ; 7th argument on stack
mov r9d, 6                ; 6th argument
mov r8d, 5                ; 5th argument
mov ecx, 4                ; 4th argument
mov edx, 3                ; 3rd argument
mov esi, 2                ; 2nd argument
mov edi, 1                ; 1st argument
call func
add rsp, 16               ; Clean up stack arguments
```

### Return Values

| Type | Register(s) |
|------|-------------|
| Integer (up to 64 bits) | RAX |
| Integer (up to 128 bits) | RDX:RAX |
| Floating-point | XMM0 |
| Float pair | XMM0:XMM1 |
| Struct (small) | RAX, RDX |
| Struct (large) | Hidden pointer in RDI |

### Register Preservation

**Callee-saved** (function must preserve):
- RBX, RBP, R12, R13, R14, R15

**Caller-saved** (may be clobbered by call):
- RAX, RCX, RDX, RSI, RDI, R8, R9, R10, R11

```nasm
my_function:
    push rbx              ; Save callee-saved
    push r12
    push r13

    ; ... function body ...
    ; Can freely use rbx, r12, r13

    pop r13               ; Restore in reverse order
    pop r12
    pop rbx
    ret
```

### Stack Alignment

The stack must be **16-byte aligned** before CALL:

```nasm
main:
    sub rsp, 8            ; Align stack (CALL will push 8 bytes)
    call printf           ; Stack now 16-byte aligned
    add rsp, 8
    ret
```

## Stack Frame Setup

### Standard Prologue

```nasm
my_function:
    push rbp              ; Save old frame pointer
    mov rbp, rsp          ; Establish new frame
    sub rsp, N            ; Allocate N bytes for locals (N % 16 == 0)
```

### Standard Epilogue

```nasm
    mov rsp, rbp          ; Deallocate locals
    pop rbp               ; Restore frame pointer
    ret
```

Or use the `leave` instruction:

```nasm
    leave                 ; Equivalent to: mov rsp, rbp; pop rbp
    ret
```

### Frame Pointer Omission

Many compilers omit the frame pointer for optimization:

```nasm
; Without frame pointer
my_function:
    sub rsp, 40           ; Allocate locals + alignment
    ; Access locals via RSP: [rsp+0], [rsp+8], etc.
    add rsp, 40
    ret
```

Benefits:
- One more register available (RBP)
- Slightly faster function calls

Drawbacks:
- Harder to debug (stack traces less reliable)
- Exception handling more complex

## Complete Function Example

```c
// C function
int calculate(int a, int b, int c) {
    int x = a + b;
    int y = x * c;
    return y;
}
```

```nasm
; Assembly implementation
calculate:
    ; Arguments: a=edi, b=esi, c=edx
    ; Leaf function, no prologue needed

    add edi, esi          ; x = a + b
    imul eax, edi, edx    ; y = x * c (but actually use edi directly)
    ; Wait, let's be more direct:

calculate:
    lea eax, [rdi + rsi]  ; x = a + b
    imul eax, edx         ; y = x * c
    ret                   ; Return y in eax
```

## Calling External Functions

When calling C library functions:

```nasm
section .data
    fmt db "Value: %d", 10, 0

section .text
    extern printf

print_value:
    push rbp
    mov rbp, rsp

    ; printf(fmt, value)
    lea rdi, [rel fmt]    ; First arg: format string
    mov esi, 42           ; Second arg: value
    xor eax, eax          ; AL = 0 (no floating-point args)
    call printf

    pop rbp
    ret
```

Note: `AL` must contain the number of vector registers used for variadic functions.

## Recursive Functions

Recursion works naturally with the call stack:

```nasm
; int factorial(int n)
factorial:
    cmp edi, 1            ; if (n <= 1)
    jle .base_case

    push rdi              ; Save n
    dec edi               ; n - 1
    call factorial        ; factorial(n-1)
    pop rdi               ; Restore n
    imul eax, edi         ; result = n * factorial(n-1)
    ret

.base_case:
    mov eax, 1            ; return 1
    ret
```

## Tail Call Optimization

When a function ends with a call, we can reuse the stack frame:

```c
int foo(int x) {
    return bar(x + 1);    // Tail call
}
```

```nasm
; Without optimization
foo:
    inc edi
    call bar
    ret

; With tail call optimization
foo:
    inc edi
    jmp bar               ; Reuse our stack frame
```

The `jmp` replaces `call` + `ret`, saving stack space and enabling infinite recursion.

## Stack Canaries (Security)

Compilers insert canaries to detect buffer overflows:

```nasm
my_function:
    push rbp
    mov rbp, rsp
    sub rsp, 32

    ; Insert canary
    mov rax, [fs:0x28]    ; Get canary from TLS
    mov [rbp-8], rax      ; Store on stack

    ; ... function body ...

    ; Check canary
    mov rax, [rbp-8]
    xor rax, [fs:0x28]
    jnz .stack_smashed

    leave
    ret

.stack_smashed:
    call __stack_chk_fail
```

## Key Takeaways

- CALL pushes return address and jumps; RET pops and returns
- System V AMD64 passes first 6 integer args in RDI, RSI, RDX, RCX, R8, R9
- Callee must preserve RBX, RBP, R12-R15
- Stack must be 16-byte aligned before CALL
- Frame pointer (RBP) enables easy local variable access but can be omitted
- Tail call optimization converts final calls to jumps, saving stack space
- Understanding calling conventions is essential for interoperability and debugging
