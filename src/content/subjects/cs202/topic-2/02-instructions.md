# Assembly Instructions and Operations

The core of assembly programming is understanding the instructions available. This section covers the fundamental x86-64 instructions grouped by category, with examples showing their practical use.

## Data Movement Instructions

Data movement is the most common operation in assembly programs.

### MOV - Move Data

The `mov` instruction copies data from source to destination:

```nasm
mov rax, rbx          ; Register to register
mov rax, 42           ; Immediate to register
mov rax, [rbx]        ; Memory to register
mov [rbx], rax        ; Register to memory
mov qword [rbx], 42   ; Immediate to memory (size required)
```

**Important**: You cannot move memory to memory directly. Use a register as intermediate:
```nasm
; WRONG: mov [dest], [source]
; RIGHT:
mov rax, [source]
mov [dest], rax
```

### LEA - Load Effective Address

`lea` calculates an address without accessing memory:

```nasm
lea rax, [rbx+rcx*4]      ; rax = rbx + rcx*4 (address calculation)
lea rax, [rip+label]      ; Load address of label (position-independent)
```

This is useful for:
- Address calculations without memory access
- Arithmetic (multiply by 3, 5, 9 using scaled indexing)
- Getting addresses for function calls

```nasm
lea rax, [rbx+rbx*2]      ; rax = rbx * 3
lea rax, [rbx+rbx*4]      ; rax = rbx * 5
```

### PUSH and POP - Stack Operations

```nasm
push rax          ; RSP -= 8; [RSP] = RAX
pop rbx           ; RBX = [RSP]; RSP += 8
```

The stack grows downward (toward lower addresses) on x86.

### XCHG - Exchange

```nasm
xchg rax, rbx     ; Swap rax and rbx
```

This is atomic for memory operands (has implicit LOCK prefix).

### CMOVcc - Conditional Move

Move only if condition is met:

```nasm
cmovz rax, rbx    ; Move if zero flag set
cmovg rax, rbx    ; Move if greater (signed)
cmova rax, rbx    ; Move if above (unsigned)
```

## Arithmetic Instructions

### ADD and SUB

```nasm
add rax, rbx      ; rax = rax + rbx
add rax, 10       ; rax = rax + 10
sub rcx, rdx      ; rcx = rcx - rdx
```

Flags affected: CF, OF, SF, ZF, AF, PF

### INC and DEC

```nasm
inc rax           ; rax = rax + 1
dec rbx           ; rbx = rbx - 1
```

Note: These don't affect the carry flag (CF), which can matter for multi-precision arithmetic.

### NEG - Negate

```nasm
neg rax           ; rax = -rax (two's complement)
```

### MUL and IMUL - Multiplication

**Unsigned multiplication (MUL)**:
```nasm
mul rbx           ; RDX:RAX = RAX * RBX (128-bit result)
```

**Signed multiplication (IMUL)**:
```nasm
imul rbx          ; RDX:RAX = RAX * RBX
imul rax, rbx     ; RAX = RAX * RBX (truncated)
imul rax, rbx, 10 ; RAX = RBX * 10
```

### DIV and IDIV - Division

**Unsigned division**:
```nasm
; Divide RDX:RAX by operand
mov rdx, 0        ; Clear upper bits
mov rax, 100      ; Dividend
mov rbx, 7        ; Divisor
div rbx           ; RAX = quotient (14), RDX = remainder (2)
```

**Signed division**:
```nasm
mov rax, -100
cqo               ; Sign-extend RAX into RDX:RAX
mov rbx, 7
idiv rbx          ; RAX = -14, RDX = -2
```

## Logical Instructions

### AND, OR, XOR, NOT

```nasm
and rax, rbx      ; rax = rax & rbx
or rax, 0xFF      ; Set lower 8 bits
xor rax, rax      ; Clear rax (faster than mov rax, 0)
not rax           ; rax = ~rax (bitwise complement)
```

**Common patterns**:
```nasm
and rax, 0xF      ; Mask to lower 4 bits
or rax, 0x80      ; Set bit 7
xor rax, rbx      ; Toggle bits where rbx has 1s
test rax, rax     ; Check if zero (sets flags without modifying)
```

### TEST - Logical Compare

```nasm
test rax, rax     ; AND without storing result, just sets flags
jz is_zero        ; Jump if rax was zero
```

## Shift and Rotate Instructions

### Logical Shifts

```nasm
shl rax, 4        ; Shift left 4 bits (multiply by 16)
shr rax, 2        ; Shift right 2 bits (unsigned divide by 4)
```

### Arithmetic Shift Right

```nasm
sar rax, 2        ; Preserves sign bit (signed divide by 4)
```

### Rotates

```nasm
rol rax, 4        ; Rotate left
ror rax, 4        ; Rotate right
rcl rax, 1        ; Rotate left through carry
rcr rax, 1        ; Rotate right through carry
```

## Comparison and Jump Instructions

### CMP - Compare

```nasm
cmp rax, rbx      ; Compute rax - rbx, set flags, discard result
```

### Conditional Jumps

After `cmp` or other flag-setting instruction:

| Instruction | Condition | Meaning |
|-------------|-----------|---------|
| `je` / `jz` | ZF=1 | Equal / Zero |
| `jne` / `jnz` | ZF=0 | Not equal / Not zero |
| `jg` / `jnle` | ZF=0 and SF=OF | Greater (signed) |
| `jge` / `jnl` | SF=OF | Greater or equal (signed) |
| `jl` / `jnge` | SF≠OF | Less (signed) |
| `jle` / `jng` | ZF=1 or SF≠OF | Less or equal (signed) |
| `ja` / `jnbe` | CF=0 and ZF=0 | Above (unsigned) |
| `jae` / `jnb` | CF=0 | Above or equal (unsigned) |
| `jb` / `jnae` | CF=1 | Below (unsigned) |
| `jbe` / `jna` | CF=1 or ZF=1 | Below or equal (unsigned) |

### Unconditional Jump

```nasm
jmp label         ; Jump to label
jmp rax           ; Jump to address in rax
```

## String Instructions

String instructions operate on sequences of bytes/words:

```nasm
; Move string: copy RCX bytes from RSI to RDI
cld               ; Clear direction flag (forward)
mov rcx, 100      ; Count
rep movsb         ; Repeat move byte

; Compare strings
repe cmpsb        ; Repeat while equal, compare bytes

; Scan for value
mov al, 0         ; Value to find
mov rcx, 1000     ; Maximum count
repne scasb       ; Find AL in [RDI]
```

## Set Instructions

Set a byte based on flags:

```nasm
cmp rax, rbx
sete al           ; AL = 1 if equal, 0 otherwise
setg bl           ; BL = 1 if greater (signed)
```

## Example: Maximum of Two Numbers

```nasm
; int max(int a, int b)
; Arguments: a in EDI, b in ESI
; Return: max in EAX
max:
    cmp edi, esi      ; Compare a and b
    mov eax, edi      ; Assume a is max
    cmovl eax, esi    ; If a < b, use b instead
    ret
```

## Example: String Length

```nasm
; size_t strlen(const char *s)
; Argument: pointer in RDI
; Return: length in RAX
strlen:
    mov rax, -1       ; Counter starts at -1
.loop:
    inc rax           ; Increment counter
    cmp byte [rdi+rax], 0  ; Check for null
    jne .loop         ; Continue if not null
    ret
```

## Example: Array Sum

```nasm
; int sum(int *arr, int n)
; Arguments: arr in RDI, n in ESI
; Return: sum in EAX
sum:
    xor eax, eax      ; sum = 0
    test esi, esi     ; if n <= 0
    jle .done         ; return 0
.loop:
    add eax, [rdi]    ; sum += *arr
    add rdi, 4        ; arr++ (int is 4 bytes)
    dec esi           ; n--
    jnz .loop         ; continue if n != 0
.done:
    ret
```

## Key Takeaways

- MOV is the most common instruction; LEA calculates addresses without memory access
- Arithmetic instructions set flags for subsequent conditional operations
- Logical instructions are essential for bit manipulation and testing
- Shifts multiply/divide by powers of 2 efficiently
- CMP sets flags; conditional jumps branch based on flags
- String instructions with REP prefix handle sequences efficiently
- Conditional move (CMOVcc) avoids branches for simple selections
