---
id: cs102-t6-practical-patterns
title: "Practical Assembly Patterns"
order: 7
---

# Practical Assembly Patterns

This subtopic consolidates practical assembly programming patterns that appear throughout systems programming. These patterns bridge the gap between understanding individual instructions and writing or reading real assembly code.

## Common Idioms

### Register Clearing

Instead of loading zero:
```assembly
; Slow (may need memory access for constant)
MOV  eax, 0

; Fast (3 bytes, clears flags)
XOR  eax, eax
```

XOR with itself always produces zero and is the standard idiom.

### Testing for Zero

```assembly
; Standard way
CMP  eax, 0
JE   is_zero

; Faster (1 byte smaller)
TEST eax, eax
JZ   is_zero
```

`TEST` performs AND and sets flags but discards the result.

### Testing Single Bits

```assembly
; Check if bit 3 is set
TEST eax, 8      ; 8 = 0b1000
JNZ  bit3_set

; Check if bit 0 is set (even/odd)
TEST eax, 1
JZ   is_even
```

### Sign Extension

Extend a signed value to a larger size:

```assembly
; 8-bit to 32-bit (x86)
MOVSX eax, al    ; Sign-extend AL into EAX

; 32-bit to 64-bit (x86-64)
MOVSXD rax, eax  ; Sign-extend EAX into RAX

; Alternative: arithmetic right shift
SAR  eax, 31     ; All bits become sign bit
```

### Swap Two Values

Without temporary:
```assembly
; Using XOR (classic trick)
XOR  eax, ebx    ; eax = eax ^ ebx
XOR  ebx, eax    ; ebx = ebx ^ (eax ^ ebx) = original eax
XOR  eax, ebx    ; eax = (eax ^ ebx) ^ original eax = original ebx
```

## Arithmetic Patterns

### Multiply by Constant

Compilers optimize multiplications:

```assembly
; Multiply by 2
SHL  eax, 1         ; Left shift = × 2

; Multiply by 3
LEA  eax, [eax + eax*2]   ; eax = eax + 2*eax = 3*eax

; Multiply by 5
LEA  eax, [eax + eax*4]   ; eax = eax + 4*eax = 5*eax

; Multiply by 10
LEA  eax, [eax + eax*4]   ; eax = 5*eax
SHL  eax, 1               ; eax = 10*eax
```

`LEA` (Load Effective Address) does address math without memory access—useful for quick arithmetic.

### Divide by Power of 2

```assembly
; Unsigned divide by 8
SHR  eax, 3         ; Right shift = ÷ 8

; Signed divide by 8 (need adjustment for negatives)
MOV  ebx, eax
SAR  ebx, 31        ; ebx = sign bits (all 0s or all 1s)
AND  ebx, 7         ; If negative, ebx = 7; else 0
ADD  eax, ebx       ; Bias for correct rounding
SAR  eax, 3
```

### Modulo Power of 2

```assembly
; n % 8 (for unsigned)
AND  eax, 7         ; Keep only low 3 bits

; n % 16
AND  eax, 15
```

This only works for powers of 2.

### Absolute Value

```assembly
; Branchless absolute value
MOV  ebx, eax
SAR  ebx, 31        ; ebx = 0xFFFFFFFF if negative, 0 if positive
XOR  eax, ebx       ; Invert bits if negative
SUB  eax, ebx       ; Add 1 if was negative (subtracting -1)
```

This uses the identity: `-n = ~n + 1`.

## Control Flow Patterns

### If-Then-Else

```c
if (a > b) {
    x = c;
} else {
    x = d;
}
```

```assembly
    CMP  eax, ebx      ; a > b?
    JLE  else_branch   ; Jump if Less or Equal
    MOV  ecx, edx      ; x = c (then branch)
    JMP  end_if
else_branch:
    MOV  ecx, esi      ; x = d (else branch)
end_if:
```

### Conditional Move (Branchless)

```assembly
    CMP  eax, ebx
    MOV  ecx, edx      ; x = c (assume true)
    CMOVLE ecx, esi    ; If a <= b, x = d (override)
```

Avoids branch misprediction for unpredictable conditions.

### Switch Statement

Jump table implementation:
```c
switch (n) {
    case 0: handle0(); break;
    case 1: handle1(); break;
    case 2: handle2(); break;
    default: handleDefault();
}
```

```assembly
    CMP  eax, 2         ; Check bounds
    JA   default_case   ; If n > 2, default

    LEA  rbx, [jump_table]
    JMP  [rbx + rax*8]  ; Jump to table[n]

jump_table:
    .quad case0
    .quad case1
    .quad case2

case0:
    ; handle case 0
    JMP  end_switch
case1:
    ; handle case 1
    JMP  end_switch
case2:
    ; handle case 2
    JMP  end_switch
default_case:
    ; handle default
end_switch:
```

O(1) dispatch instead of O(n) comparisons.

### Counted Loop

```c
for (int i = 0; i < n; i++) { body; }
```

```assembly
    MOV  ecx, n         ; Counter
    TEST ecx, ecx       ; n == 0?
    JZ   loop_end
loop_start:
    ; body here (use ECX if needed)
    DEC  ecx            ; i-- (equivalent to counting down)
    JNZ  loop_start     ; If not zero, continue
loop_end:
```

Counting down to zero is often more efficient than comparing to n.

## Function Patterns

### Function Prologue (x86-64)

```assembly
function:
    PUSH rbp            ; Save old base pointer
    MOV  rbp, rsp       ; Set up stack frame
    SUB  rsp, 32        ; Allocate local variables

    ; Function body here
```

### Function Epilogue

```assembly
    ADD  rsp, 32        ; Or: MOV rsp, rbp
    POP  rbp
    RET
```

Or simply:
```assembly
    LEAVE               ; Equivalent to: MOV rsp, rbp; POP rbp
    RET
```

### Leaf Function (No Calls)

Leaf functions can skip the frame pointer:
```assembly
leaf_function:
    ; Don't need to set up rbp
    ; Use rsp-relative addressing for locals
    MOV  eax, [rsp + 8]   ; Access local variable
    ; ... do work ...
    RET
```

### Tail Call Optimization

```c
int factorial_tail(int n, int acc) {
    if (n == 0) return acc;
    return factorial_tail(n - 1, n * acc);  // Tail call
}
```

```assembly
factorial_tail:
    TEST edi, edi       ; n == 0?
    JZ   return_acc
    IMUL esi, edi       ; acc *= n
    DEC  edi            ; n--
    JMP  factorial_tail ; Tail call = jump, not call
return_acc:
    MOV  eax, esi
    RET
```

The recursive call becomes a jump—no stack growth.

## Memory Access Patterns

### Unaligned Access Check

```assembly
    TEST rdi, 7         ; Check if address aligned to 8 bytes
    JNZ  unaligned      ; If any low 3 bits set, unaligned
```

### Prefetch Hint

```assembly
    PREFETCHT0 [rdi + 128]   ; Hint: load this data into cache
    ; ... process current data ...
    ; By the time we need [rdi + 128], it's hopefully cached
```

### Memory Fence

For multi-threaded code:
```assembly
    MFENCE              ; Full memory barrier
    SFENCE              ; Store fence
    LFENCE              ; Load fence
```

## Bit Manipulation

### Population Count (Number of 1 Bits)

```assembly
    POPCNT eax, ebx     ; eax = number of 1 bits in ebx
```

Before POPCNT instruction existed, this required a loop or lookup table.

### Find First Set Bit

```assembly
    BSF  eax, ebx       ; Bit Scan Forward: find lowest set bit
    BSR  eax, ebx       ; Bit Scan Reverse: find highest set bit
    LZCNT eax, ebx      ; Leading Zero Count
    TZCNT eax, ebx      ; Trailing Zero Count
```

### Rotate

```assembly
    ROL  eax, 3         ; Rotate left by 3 bits
    ROR  eax, 5         ; Rotate right by 5 bits
```

Useful for cryptography and hashing.

## Debugging Patterns

### Breakpoint

```assembly
    INT3                ; Debugger breakpoint (1-byte)
```

Debuggers often patch this instruction into code.

### No Operation

```assembly
    NOP                 ; 1-byte no-op
    LEA  rax, [rax]     ; Multi-byte no-op (for alignment)
```

Used for alignment and as placeholders.

### Debug Print (via System Call)

```assembly
; Linux x86-64: write(1, msg, len)
    MOV  rax, 1         ; syscall: write
    MOV  rdi, 1         ; fd: stdout
    LEA  rsi, [msg]     ; buffer
    MOV  rdx, 12        ; length
    SYSCALL

msg: .ascii "Debug here\n"
```

## Performance-Critical Patterns

### Unrolled Loop

```assembly
; Instead of: process 1 element per iteration
; Process 4 elements per iteration
loop:
    ; Iteration 1
    MOV  eax, [rsi]
    ADD  [rdi], eax
    ADD  rsi, 4
    ADD  rdi, 4
    ; Iteration 2
    MOV  eax, [rsi]
    ADD  [rdi], eax
    ADD  rsi, 4
    ADD  rdi, 4
    ; ... iterations 3 and 4 ...

    SUB  ecx, 4
    JNZ  loop
```

Reduces loop overhead at the cost of code size.

### Duff's Device (Loop Unrolling with Fall-Through)

Handle non-multiple iterations:
```assembly
; Jump into the middle of unrolled loop based on count % 4
```

This is rare in hand-written assembly but interesting historically.

## Key Takeaways

- **XOR reg, reg** is the standard way to zero a register.
- **TEST** is preferred over **CMP with 0** for zero checks.
- **LEA** performs address arithmetic without memory access—useful for multiplication.
- **Shifts and masks** replace division/modulo for powers of 2.
- **Jump tables** implement switch statements in O(1) time.
- **Counting down to zero** is often more efficient than counting up.
- **Tail call optimization** turns recursive calls into jumps.
- **CMOV** (conditional move) avoids branch misprediction penalties.
- **Memory fences** ensure ordering in multi-threaded code.
- **Bit manipulation instructions** (POPCNT, BSF) solve problems that otherwise require loops.
- Recognizing these patterns makes reading assembly much easier.

