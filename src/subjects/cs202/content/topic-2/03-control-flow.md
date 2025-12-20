# Control Flow in Assembly

High-level control structures like if/else, loops, and switch statements must be implemented using jumps and conditional branches at the assembly level. Understanding these translations helps you read compiler output and write efficient low-level code.

## Conditional Statements

### Simple If Statement

**C code**:
```c
if (x > 0) {
    y = 1;
}
```

**Assembly**:
```nasm
    cmp dword [x], 0      ; Compare x with 0
    jle skip              ; If x <= 0, skip the body
    mov dword [y], 1      ; y = 1
skip:
```

### If-Else Statement

**C code**:
```c
if (x > y) {
    z = x;
} else {
    z = y;
}
```

**Assembly**:
```nasm
    mov eax, [x]
    cmp eax, [y]          ; Compare x and y
    jle else_branch       ; If x <= y, go to else
    mov [z], eax          ; z = x
    jmp end_if            ; Skip else
else_branch:
    mov eax, [y]
    mov [z], eax          ; z = y
end_if:
```

### Optimized with Conditional Move

```nasm
    mov eax, [x]          ; Assume x
    mov ecx, [y]          ; Load y
    cmp eax, ecx          ; Compare
    cmovle eax, ecx       ; If x <= y, use y
    mov [z], eax          ; Store result
```

This avoids branches, which is often faster due to branch prediction penalties.

### Compound Conditions (AND)

**C code**:
```c
if (x > 0 && x < 10) {
    // body
}
```

**Assembly** (short-circuit evaluation):
```nasm
    cmp dword [x], 0
    jle skip              ; If x <= 0, skip (first condition false)
    cmp dword [x], 10
    jge skip              ; If x >= 10, skip (second condition false)
    ; body here
skip:
```

### Compound Conditions (OR)

**C code**:
```c
if (x < 0 || x > 100) {
    // body
}
```

**Assembly**:
```nasm
    cmp dword [x], 0
    jl do_body            ; If x < 0, execute body
    cmp dword [x], 100
    jle skip              ; If x <= 100, skip body
do_body:
    ; body here
skip:
```

## Loop Structures

### While Loop

**C code**:
```c
while (x > 0) {
    x--;
}
```

**Assembly**:
```nasm
while_start:
    cmp dword [x], 0      ; Check condition
    jle while_end         ; If x <= 0, exit loop
    dec dword [x]         ; x--
    jmp while_start       ; Repeat
while_end:
```

### Do-While Loop

**C code**:
```c
do {
    x--;
} while (x > 0);
```

**Assembly**:
```nasm
do_start:
    dec dword [x]         ; x--
    cmp dword [x], 0      ; Check condition
    jg do_start           ; If x > 0, repeat
```

Do-while is more efficient: condition checked at end means one less jump per iteration.

### For Loop

**C code**:
```c
for (int i = 0; i < 10; i++) {
    sum += array[i];
}
```

**Assembly**:
```nasm
    xor ecx, ecx          ; i = 0
    xor eax, eax          ; sum = 0
for_loop:
    cmp ecx, 10           ; i < 10?
    jge for_end           ; If not, exit
    add eax, [array + ecx*4]  ; sum += array[i]
    inc ecx               ; i++
    jmp for_loop
for_end:
```

### Optimized Loop with Counter

Counting down to zero is often more efficient:

```nasm
    mov ecx, 10           ; Counter
    xor eax, eax          ; sum = 0
    lea rsi, [array]      ; Pointer to array
loop_start:
    add eax, [rsi]        ; sum += *ptr
    add rsi, 4            ; ptr++
    dec ecx               ; counter--
    jnz loop_start        ; If counter != 0, continue
```

Advantages:
- `dec ecx` sets zero flag directly
- No separate comparison needed
- Slightly fewer instructions per iteration

### Loop Unrolling

Processing multiple elements per iteration:

```nasm
    mov ecx, 10           ; Process 10*4 = 40 elements
    xor eax, eax
unrolled_loop:
    add eax, [rsi]
    add eax, [rsi+4]
    add eax, [rsi+8]
    add eax, [rsi+12]
    add rsi, 16           ; Advance by 4 elements
    dec ecx
    jnz unrolled_loop
```

Benefits:
- Fewer loop overhead instructions
- Better instruction-level parallelism
- More predictable memory access patterns

## Switch Statements

### Jump Table Implementation

For switch with consecutive case values:

**C code**:
```c
switch (x) {
    case 0: /* ... */ break;
    case 1: /* ... */ break;
    case 2: /* ... */ break;
    default: /* ... */
}
```

**Assembly**:
```nasm
    cmp eax, 2            ; Check range
    ja default_case       ; If x > 2, go to default

    lea rcx, [jump_table]
    jmp [rcx + rax*8]     ; Jump to address in table

section .data
jump_table:
    dq case_0
    dq case_1
    dq case_2

section .text
case_0:
    ; Handle case 0
    jmp switch_end
case_1:
    ; Handle case 1
    jmp switch_end
case_2:
    ; Handle case 2
    jmp switch_end
default_case:
    ; Handle default
switch_end:
```

### Chain of Comparisons

For sparse case values:

```nasm
    cmp eax, 5
    je case_5
    cmp eax, 100
    je case_100
    cmp eax, 1000
    je case_1000
    jmp default_case
```

Compilers choose between jump tables and comparison chains based on case density.

## Function Calls and Returns

### Basic Call/Return

```nasm
; Calling a function
    call my_function      ; Push return address, jump to function

; Function definition
my_function:
    ; ... function body ...
    ret                   ; Pop return address, jump to it
```

### Passing Arguments (System V AMD64 ABI)

For Linux/macOS x86-64:

```nasm
; Call: result = add(5, 3)
    mov edi, 5            ; First argument
    mov esi, 3            ; Second argument
    call add
    ; Result in eax

; Function: int add(int a, int b)
add:
    lea eax, [rdi + rsi]  ; Return a + b
    ret
```

**Integer arguments**: RDI, RSI, RDX, RCX, R8, R9, then stack
**Return value**: RAX (and RDX for 128-bit)

### Stack Frame Management

For functions with local variables:

```nasm
my_function:
    push rbp              ; Save old base pointer
    mov rbp, rsp          ; Set up new frame
    sub rsp, 32           ; Allocate local space (16-byte aligned)

    ; Access locals: [rbp-8], [rbp-16], etc.
    ; Access arguments (if spilled): [rbp+16], [rbp+24], etc.

    mov rsp, rbp          ; Deallocate locals
    pop rbp               ; Restore old base pointer
    ret
```

### Preserving Registers

Callee-saved registers must be preserved:

```nasm
my_function:
    push rbx              ; Save callee-saved registers
    push r12
    push r13

    ; ... use rbx, r12, r13 freely ...

    pop r13               ; Restore in reverse order
    pop r12
    pop rbx
    ret
```

**Callee-saved** (preserve): RBX, RBP, R12-R15
**Caller-saved** (may be clobbered): RAX, RCX, RDX, RSI, RDI, R8-R11

## Branch Prediction Hints

Modern CPUs predict branch outcomes. You can provide hints:

```nasm
    cmp eax, 0
    jz likely_path        ; Use jz for expected path

; Or with explicit hints (rarely used):
    db 0x2E               ; Branch not taken hint
    jz unlikely_path
    db 0x3E               ; Branch taken hint
    jnz likely_path
```

Better approach: organize code so the expected path falls through:

```nasm
    cmp eax, 0
    jnz error_case        ; Unexpected case branches away
    ; ... expected path continues here ...
```

## Example: Binary Search

```nasm
; int binary_search(int *arr, int n, int target)
; RDI = arr, ESI = n, EDX = target
; Returns index or -1
binary_search:
    xor eax, eax          ; left = 0
    lea ecx, [rsi-1]      ; right = n - 1

.loop:
    cmp eax, ecx          ; while (left <= right)
    jg .not_found

    lea r8d, [rax+rcx]    ; left + right
    shr r8d, 1            ; mid = (left + right) / 2

    mov r9d, [rdi+r8*4]   ; arr[mid]
    cmp r9d, edx          ; Compare with target
    je .found
    jl .go_right

    lea ecx, [r8-1]       ; right = mid - 1
    jmp .loop

.go_right:
    lea eax, [r8+1]       ; left = mid + 1
    jmp .loop

.found:
    mov eax, r8d          ; Return mid
    ret

.not_found:
    mov eax, -1           ; Return -1
    ret
```

## Key Takeaways

- High-level control structures translate to compare-and-jump patterns
- Conditional moves can eliminate branches for simple selections
- Counting down to zero simplifies loop termination checks
- Jump tables provide O(1) switch statement for dense cases
- Function calls follow ABI conventions for arguments and register preservation
- Branch prediction affects performance; organize for expected paths
