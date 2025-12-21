---
id: cs102-t6-arrays-memory
title: "Arrays and Memory Operations"
order: 6
---

# Arrays and Memory Operations in Assembly

High-level languages hide the mechanics of array access, but in assembly, every element access becomes explicit address calculation. This subtopic connects abstract data structures to concrete machine operations, showing how loops, arrays, and memory work at the instruction level.

## Array Layout in Memory

An array is a contiguous block of memory. Each element is accessed by computing its address:

```
address = base_address + (index × element_size)
```

For a 32-bit integer array at base address 0x1000:

```
Array: int arr[5] = {10, 20, 30, 40, 50};

Address     Value      Element
─────────────────────────────
0x1000      10         arr[0]
0x1004      20         arr[1]
0x1008      30         arr[2]
0x100C      40         arr[3]
0x1010      50         arr[4]
```

Elements are 4 bytes apart (sizeof(int) = 4).

## Accessing Array Elements

### Direct Access (Known Index)

To access `arr[3]`:

```assembly
; Assume arr base address is in R1
MOV  R2, [R1 + 12]   ; R2 = arr[3]
                     ; 12 = 3 × 4 (index × element_size)
```

The offset 12 is computed at compile time.

### Indexed Access (Variable Index)

For `arr[i]` where i is in a register:

```assembly
; R1 = base address, R2 = index i
SHL  R3, R2, 2       ; R3 = i × 4 (shift left by 2 = multiply by 4)
ADD  R3, R1, R3      ; R3 = base + offset
MOV  R4, [R3]        ; R4 = arr[i]
```

Or with scaled addressing modes (x86):
```assembly
; eax = base, ecx = index
MOV  edx, [eax + ecx*4]   ; edx = arr[ecx]
```

The `*4` scaling is built into x86 addressing modes.

## Addressing Modes for Arrays

Different architectures provide different support for array access:

### x86/x86-64 Addressing Modes

```assembly
; base + index*scale + displacement
MOV  eax, [ebx]              ; Simple base
MOV  eax, [ebx + 8]          ; Base + displacement
MOV  eax, [ebx + ecx]        ; Base + index
MOV  eax, [ebx + ecx*4]      ; Base + scaled index
MOV  eax, [ebx + ecx*4 + 8]  ; Base + scaled index + displacement
```

The scale factor can be 1, 2, 4, or 8—convenient for byte, short, int, or long arrays.

### ARM Addressing

ARM uses simpler addressing but can pre/post-update the base:

```assembly
LDR  R0, [R1, R2]         ; R0 = mem[R1 + R2]
LDR  R0, [R1, R2, LSL #2] ; R0 = mem[R1 + R2*4]
LDR  R0, [R1, #16]        ; R0 = mem[R1 + 16]
LDR  R0, [R1], #4         ; R0 = mem[R1], then R1 += 4
LDR  R0, [R1, #4]!        ; R1 += 4, then R0 = mem[R1]
```

The post-increment (`R1 += 4` after load) is useful for sequential array traversal.

## Loop Patterns

### Counter-Based Loop

Sum array elements:

```c
int sum = 0;
for (int i = 0; i < n; i++) {
    sum += arr[i];
}
```

In assembly:
```assembly
; R1 = base address, R2 = n, R3 = sum (starts 0), R4 = counter i
    MOV  R3, 0           ; sum = 0
    MOV  R4, 0           ; i = 0
loop:
    CMP  R4, R2          ; compare i with n
    BGE  done            ; if i >= n, exit

    LSL  R5, R4, 2       ; R5 = i * 4
    ADD  R5, R1, R5      ; R5 = &arr[i]
    LDR  R6, [R5]        ; R6 = arr[i]
    ADD  R3, R3, R6      ; sum += arr[i]

    ADD  R4, R4, 1       ; i++
    B    loop            ; repeat
done:
    ; sum is in R3
```

### Pointer-Based Loop

More efficient: increment pointer instead of recomputing address:

```c
int sum = 0;
int *p = arr;
int *end = arr + n;
while (p < end) {
    sum += *p++;
}
```

In assembly:
```assembly
; R1 = arr, R2 = n, R3 = sum
    MOV  R3, 0           ; sum = 0
    LSL  R4, R2, 2       ; R4 = n * 4 (byte count)
    ADD  R4, R1, R4      ; R4 = end pointer
loop:
    CMP  R1, R4          ; compare current with end
    BGE  done

    LDR  R5, [R1], #4    ; R5 = *p, then p += 4
    ADD  R3, R3, R5      ; sum += *p
    B    loop
done:
```

This eliminates the multiply-by-4 inside the loop—the pointer just advances by 4 each iteration.

## Multi-Dimensional Arrays

2D arrays are stored in row-major order (C convention):

```c
int matrix[3][4];  // 3 rows, 4 columns

// Layout in memory:
// matrix[0][0], matrix[0][1], matrix[0][2], matrix[0][3],
// matrix[1][0], matrix[1][1], matrix[1][2], matrix[1][3],
// matrix[2][0], matrix[2][1], matrix[2][2], matrix[2][3]
```

### Address Calculation

For `matrix[row][col]`:
```
address = base + (row × num_cols + col) × element_size
```

For matrix[3][4] with element at [1][2]:
```
offset = (1 × 4 + 2) × 4 = 6 × 4 = 24 bytes
```

### Assembly for 2D Access

```assembly
; R1 = base, R2 = row, R3 = col, R4 = num_cols (4)
MUL  R5, R2, R4      ; R5 = row × num_cols
ADD  R5, R5, R3      ; R5 = row × num_cols + col
LSL  R5, R5, 2       ; R5 = offset in bytes
ADD  R5, R1, R5      ; R5 = address
LDR  R6, [R5]        ; R6 = matrix[row][col]
```

## String Operations

Strings are char arrays with a null terminator.

### String Length (strlen)

```c
int strlen(char *s) {
    int len = 0;
    while (*s++) len++;
    return len;
}
```

In assembly:
```assembly
strlen:
    MOV  R2, 0           ; len = 0
loop:
    LDRB R3, [R0], #1    ; R3 = *s, then s++
    CMP  R3, 0           ; check for null
    BEQ  done
    ADD  R2, R2, 1       ; len++
    B    loop
done:
    MOV  R0, R2          ; return len
    RET
```

`LDRB` loads a single byte (char).

### String Copy (strcpy)

```assembly
strcpy:
    ; R0 = dest, R1 = src
loop:
    LDRB R2, [R1], #1    ; R2 = *src++
    STRB R2, [R0], #1    ; *dest++ = R2
    CMP  R2, 0           ; null terminator?
    BNE  loop            ; if not, continue
    RET
```

## Block Memory Operations

### Memory Copy (memcpy)

Copy n bytes from source to destination:

```assembly
memcpy:
    ; R0 = dest, R1 = src, R2 = n
    CMP  R2, 0
    BEQ  done
loop:
    LDRB R3, [R1], #1    ; load byte, increment src
    STRB R3, [R0], #1    ; store byte, increment dest
    SUBS R2, R2, 1       ; n--
    BNE  loop
done:
    RET
```

### Optimized Block Copy

Real implementations use word-sized operations:

```assembly
; Copy 4 bytes at a time
memcpy_fast:
    LSR  R4, R2, 2       ; R4 = n / 4 (word count)
word_loop:
    CBZ  R4, byte_loop   ; if no words left, handle remaining bytes
    LDR  R3, [R1], #4    ; load word, src += 4
    STR  R3, [R0], #4    ; store word, dest += 4
    SUB  R4, R4, 1
    B    word_loop
byte_loop:
    AND  R4, R2, #3      ; R4 = n % 4 (remaining bytes)
    ; ... handle remaining bytes one at a time
```

Modern CPUs have special instructions (REP MOVSB on x86) that are even faster.

## Memory Fill

Set a block of memory to a value:

```assembly
memset:
    ; R0 = dest, R1 = value, R2 = n
    CMP  R2, 0
    BEQ  done
loop:
    STRB R1, [R0], #1    ; *dest++ = value
    SUBS R2, R2, 1
    BNE  loop
done:
    RET
```

## Stack-Based Arrays

Local arrays are allocated on the stack:

```c
void func() {
    int arr[10];  // 40 bytes on stack
    arr[0] = 5;
}
```

```assembly
func:
    SUB  SP, SP, #40     ; Allocate 40 bytes on stack

    MOV  R0, #5
    STR  R0, [SP]        ; arr[0] = 5

    ADD  SP, SP, #40     ; Deallocate
    RET
```

Stack arrays are accessed relative to the stack pointer (SP).

## Performance Considerations

### Sequential Access Is Fast

```c
for (int i = 0; i < n; i++) sum += arr[i];  // Good: sequential
for (int i = n-1; i >= 0; i--) sum += arr[i];  // OK: still sequential
```

Hardware prefetchers recognize sequential patterns.

### Random Access Is Slow

```c
for (int i = 0; i < n; i++) sum += arr[rand() % n];  // Bad: random
```

Each access may miss the cache.

### Stride Matters

```c
for (int i = 0; i < n; i += 64) sum += arr[i];  // Poor: 64-element stride
```

Large strides skip over cache lines, reducing cache efficiency.

## Key Takeaways

- Arrays are contiguous memory; element address = base + index × size.
- **Addressing modes** support array access: base + offset, base + index × scale.
- **Pointer-based loops** can be more efficient than index-based loops.
- **2D arrays** use row-major order: address = base + (row × cols + col) × size.
- **Strings** are null-terminated char arrays; length requires scanning.
- **Block operations** (memcpy, memset) are optimized to use word-sized transfers.
- **Stack arrays** are accessed relative to SP; heap arrays via pointers.
- **Sequential access** is fast due to caching and prefetching; random access is slow.
- Understanding array access patterns at the assembly level explains performance characteristics.

