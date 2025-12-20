# Memory Addressing in Assembly

Understanding how to access memory is fundamental to assembly programming. This section covers the various ways x86-64 assembly addresses memory, from simple register indirect access to complex multi-component addressing.

## Memory Operand Syntax

In x86-64, memory operands are written in square brackets. The general form is:

```
[base + index*scale + displacement]
```

Where:
- **base**: A register (RBX, RSI, RBP, etc.)
- **index**: A register (not RSP)
- **scale**: 1, 2, 4, or 8
- **displacement**: A constant value

All components are optional, but at least one must be present.

## Basic Addressing Modes

### Direct Addressing

Access memory at a fixed address:

```nasm
mov eax, [0x401000]       ; Load from absolute address
mov eax, [my_variable]    ; Load from labeled address
```

In 64-bit mode, absolute addresses have limitations. RIP-relative is preferred:

```nasm
mov eax, [rel my_variable]    ; RIP-relative (position-independent)
```

### Register Indirect

Access memory at the address contained in a register:

```nasm
mov rax, [rbx]            ; Load from address in RBX
mov [rdi], eax            ; Store to address in RDI
```

This is essential for pointer operations:

```c
int *p = &x;
int y = *p;    // mov eax, [rdx] where rdx holds p
```

### Base + Displacement

Add a constant offset to a register:

```nasm
mov eax, [rbx + 8]        ; Load from RBX + 8
mov eax, [rbp - 16]       ; Load from stack (local variable)
mov eax, [rdi + offset]   ; Access struct field
```

Common uses:
- Stack frame access: `[rbp - n]` for locals, `[rbp + n]` for arguments
- Structure field access: `[ptr + field_offset]`
- Array access with constant index: `[array + i*elem_size]`

### Indexed Addressing

Use two registers:

```nasm
mov eax, [rbx + rcx]      ; base + index (scale = 1)
mov eax, [rbx + rcx*4]    ; base + index * 4
mov eax, [rbx + rcx*8]    ; base + index * 8
```

The scale factor (1, 2, 4, or 8) matches common data sizes:
- Scale 1: byte arrays
- Scale 2: short/word arrays
- Scale 4: int/float arrays
- Scale 8: long/double/pointer arrays

### Full Form

Combine all components:

```nasm
mov eax, [rbx + rcx*4 + 100]   ; base + index*scale + displacement
```

Example: Accessing a 2D array `arr[i][j]` where elements are 4 bytes:

```nasm
; arr at [rdi], i in rsi, j in rdx
; arr[i][j] = arr + i*row_size + j*4
imul rax, rsi, ROW_SIZE   ; rax = i * row_size
mov eax, [rdi + rax + rdx*4]  ; arr[i][j]
```

## Segment Overrides

By default, data access uses the DS (data segment) register. You can override:

```nasm
mov eax, fs:[0]           ; Access thread-local storage
mov eax, gs:[0x28]        ; Stack canary (common on Linux)
```

In 64-bit mode, most segment registers are unused (base = 0), but FS and GS provide thread-local storage.

## Size Specifiers

When the operand size is ambiguous, specify it explicitly:

```nasm
mov byte [rbx], 10        ; Store 8-bit value
mov word [rbx], 1000      ; Store 16-bit value
mov dword [rbx], 100000   ; Store 32-bit value
mov qword [rbx], rax      ; Store 64-bit value
```

Required when:
- Storing an immediate to memory
- Using instructions that don't implicitly determine size

## RIP-Relative Addressing

In 64-bit mode, RIP-relative addressing is the standard for accessing global data:

```nasm
lea rax, [rip + message]   ; Get address of message
mov eax, [rip + counter]   ; Load value of counter
```

Advantages:
- Position-independent code (works regardless of load address)
- Required for shared libraries
- Efficient encoding (32-bit displacement instead of 64-bit absolute)

## Stack Addressing

The stack uses RSP (stack pointer) and optionally RBP (base pointer):

```nasm
; Typical function prologue
push rbp
mov rbp, rsp
sub rsp, 32              ; Allocate 32 bytes for locals

; Access locals relative to RBP
mov dword [rbp - 4], 10   ; First local (4 bytes)
mov dword [rbp - 8], 20   ; Second local (4 bytes)
mov qword [rbp - 16], rax ; Third local (8 bytes)

; Access parameters (if passed on stack)
mov rax, [rbp + 16]       ; First stack parameter

; Alternative: RSP-relative (no frame pointer)
mov dword [rsp + 0], 10
mov dword [rsp + 4], 20
```

## Memory Alignment

For performance (and sometimes correctness), data should be aligned:

| Data Size | Alignment |
|-----------|-----------|
| 1 byte | Any |
| 2 bytes | 2-byte boundary |
| 4 bytes | 4-byte boundary |
| 8 bytes | 8-byte boundary |
| 16 bytes (SSE) | 16-byte boundary |

Misaligned access:
- May be slower (crosses cache line boundary)
- May fault (SSE instructions on unaligned data)

```nasm
; Aligned move (requires 16-byte alignment)
movaps xmm0, [rdi]        ; Fault if rdi % 16 != 0

; Unaligned move (slower but always works)
movups xmm0, [rdi]        ; Works for any alignment
```

## Practical Examples

### Array Access

```nasm
; int sum = 0;
; for (int i = 0; i < n; i++) sum += arr[i];

    xor eax, eax          ; sum = 0
    xor ecx, ecx          ; i = 0
.loop:
    cmp ecx, edx          ; i < n?
    jge .done
    add eax, [rdi + rcx*4] ; sum += arr[i]
    inc ecx               ; i++
    jmp .loop
.done:
```

### Structure Access

```c
struct Point {
    int x;      // offset 0
    int y;      // offset 4
    double z;   // offset 8
};
```

```nasm
; Point *p in RDI
mov eax, [rdi + 0]        ; p->x
mov ebx, [rdi + 4]        ; p->y
movsd xmm0, [rdi + 8]     ; p->z
```

### Linked List Traversal

```c
struct Node {
    int value;        // offset 0
    struct Node *next; // offset 8 (aligned to pointer)
};
```

```nasm
; Node *p in RDI, find sum
    xor eax, eax          ; sum = 0
.loop:
    test rdi, rdi         ; while (p != NULL)
    jz .done
    add eax, [rdi]        ; sum += p->value
    mov rdi, [rdi + 8]    ; p = p->next
    jmp .loop
.done:
```

### String Operations

```nasm
; strlen implementation
strlen:
    mov rax, rdi          ; Save original pointer
.loop:
    cmp byte [rdi], 0     ; Check for null terminator
    je .done
    inc rdi               ; Move to next character
    jmp .loop
.done:
    sub rdi, rax          ; Length = current - original
    mov rax, rdi          ; Return length
    ret
```

## Common Mistakes

### Forgetting Size Specifier

```nasm
; WRONG: Size ambiguous
mov [rbx], 10

; RIGHT: Specify size
mov dword [rbx], 10
```

### Using RSP as Index

```nasm
; WRONG: RSP cannot be index register
mov eax, [rbx + rsp*4]

; RIGHT: Use another register
mov rax, rsp
mov eax, [rbx + rax*4]
```

### Mixing 32/64-bit in Addressing

```nasm
; Be careful with register sizes
mov eax, [ebx]            ; Uses only lower 32 bits of address!
mov eax, [rbx]            ; Uses full 64-bit address
```

## Key Takeaways

- Memory operands use brackets with optional base, index, scale, and displacement
- Scale factors (1, 2, 4, 8) match element sizes for efficient array access
- RIP-relative addressing is standard for global data in 64-bit mode
- Stack addressing uses RSP/RBP with negative offsets for locals
- Always specify size when moving immediates to memory
- Proper alignment improves performance and is required for some SIMD instructions
