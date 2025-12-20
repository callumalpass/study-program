---
id: cs202-t2-debug
title: "Debugging Assembly"
order: 7
---

# Debugging Assembly Programs

Debugging assembly code requires different tools and techniques than high-level languages. This section covers essential debugging strategies, tools like GDB, and common issues you'll encounter when working with assembly.

## Debugging Tools

### GDB (GNU Debugger)

GDB is the primary tool for debugging assembly on Linux. Start it with:

```bash
gdb ./program
```

### Essential GDB Commands

**Running and stopping**:
```
run                    # Start program
continue (c)           # Continue after breakpoint
step (s)               # Execute one instruction (step into)
next (n)               # Execute one instruction (step over calls)
stepi (si)             # Step one machine instruction
nexti (ni)             # Next machine instruction (over calls)
finish                 # Run until current function returns
quit (q)               # Exit GDB
```

**Breakpoints**:
```
break main             # Break at function
break *0x401000        # Break at address
break *main+10         # Break at offset from function
info breakpoints       # List breakpoints
delete 1               # Delete breakpoint 1
disable 1              # Disable breakpoint 1
enable 1               # Enable breakpoint 1
```

**Examining state**:
```
info registers         # Show all registers
print $rax             # Print RAX value
print/x $rax           # Print RAX in hexadecimal
print/t $rax           # Print RAX in binary
x/10xg $rsp            # Examine 10 quad-words at RSP (hex)
x/10i $rip             # Disassemble 10 instructions at RIP
x/s address            # Examine as string
```

**Memory examination formats**:
```
x/Nfu address
N = count
f = format (x=hex, d=decimal, s=string, i=instruction)
u = unit (b=byte, h=half, w=word, g=giant/8-byte)
```

### GDB Assembly Mode

Set GDB to assembly-friendly mode:

```
(gdb) set disassembly-flavor intel
(gdb) layout asm           # Show assembly window
(gdb) layout regs          # Show registers window
(gdb) focus asm            # Focus on assembly window
```

### Debugging Session Example

```bash
$ gdb ./myprogram
(gdb) set disassembly-flavor intel
(gdb) break _start
(gdb) run
Breakpoint 1, 0x0000000000401000 in _start ()
(gdb) layout asm
(gdb) info registers
(gdb) si                   # Step one instruction
(gdb) print/x $rax
(gdb) x/4xg $rsp           # Examine stack
(gdb) continue
```

## Common Debugging Scenarios

### Tracing Execution

Add visible markers to trace control flow:

```nasm
section .data
    trace1 db "Entered function", 10, 0
    trace2 db "Loop iteration", 10, 0

section .text
trace_message:
    ; Save all registers we'll use
    push rax
    push rdi
    push rsi
    push rdx

    mov rax, 1            ; write
    mov rdi, 1            ; stdout
    ; rsi = message (set by caller)
    ; rdx = length (set by caller)
    syscall

    pop rdx
    pop rsi
    pop rdi
    pop rax
    ret
```

### Examining the Stack

To debug stack issues:

```
(gdb) x/20xg $rsp          # Show 20 quad-words from stack
(gdb) info frame           # Show current stack frame
(gdb) backtrace            # Show call stack
```

Visual stack representation:
```
(gdb) x/8xg $rsp
0x7fffffffe000: 0x0000000000000001    <- Top of stack
0x7fffffffe008: 0x00007fffffffe1a8
0x7fffffffe010: 0x0000000000000000
0x7fffffffe018: 0x0000000000401040    <- Return address
```

### Register Watchpoints

Monitor when a register changes:

```
(gdb) watch $rax           # Break when RAX changes
(gdb) rwatch *0x404000     # Break on read from address
(gdb) awatch *0x404000     # Break on read or write
```

## Common Assembly Bugs

### 1. Off-by-One Errors in Loops

**Symptom**: Loop runs one too many or too few times

```nasm
; BUG: Counts to 11 instead of 10
    mov ecx, 10
loop_start:
    ; ... loop body ...
    dec ecx
    jnz loop_start        ; Stops when ecx=0, ran 10 times (correct)

; BUG: Using wrong comparison
    mov ecx, 0
loop_start:
    cmp ecx, 10
    jge done              ; Should be jg for 0-9
    ; ... loop body ...
    inc ecx
    jmp loop_start
```

### 2. Stack Misalignment

**Symptom**: SIGSEGV when calling functions, especially printf

```nasm
; BUG: Stack not aligned before call
main:
    call printf           ; Crash! Stack not 16-byte aligned

; FIX: Ensure alignment
main:
    push rbp              ; Align stack
    mov rbp, rsp
    call printf           ; OK
    pop rbp
    ret
```

### 3. Forgetting to Preserve Registers

**Symptom**: Caller's data corrupted after function call

```nasm
; BUG: RBX not preserved
my_func:
    mov rbx, rdi          ; Clobbers caller's RBX!
    ; ...
    ret

; FIX: Save and restore
my_func:
    push rbx              ; Save callee-saved register
    mov rbx, rdi
    ; ...
    pop rbx               ; Restore
    ret
```

### 4. Sign Extension Issues

**Symptom**: Large unexpected values when loading smaller data

```nasm
; BUG: Loading signed byte as unsigned
    movzx eax, byte [data]  ; 0xFF becomes 255
    ; But if data should be -1...

; FIX: Use sign extension for signed data
    movsx eax, byte [data]  ; 0xFF becomes -1 (0xFFFFFFFF)
```

### 5. Memory Size Mismatch

**Symptom**: Wrong values read/written

```nasm
; BUG: Writing 32 bits when 64 expected
    mov rax, 0x123456789ABCDEF0
    mov [buffer], eax     ; Only writes lower 32 bits!

; FIX: Use correct size
    mov [buffer], rax     ; Writes all 64 bits
```

### 6. Incorrect Conditional Jump

**Symptom**: Wrong branch taken

```nasm
; BUG: Using signed comparison for unsigned values
    mov eax, 0xFFFFFFFF   ; -1 signed, max unsigned
    cmp eax, 10
    jl less               ; True! -1 < 10 (signed)
    ; But with unsigned, 0xFFFFFFFF > 10

; FIX: Use unsigned comparison
    jb less               ; False - 0xFFFFFFFF is not below 10
```

## Debugging Strategies

### Binary Search for Bugs

When a program crashes, narrow down the location:

1. Add a breakpoint halfway through
2. If crash occurs before breakpoint, bug is in first half
3. If crash occurs after, bug is in second half
4. Repeat until found

### Print Debugging

Insert write syscalls to trace execution:

```nasm
section .data
    marker db ">>> CHECKPOINT 1", 10
    marker_len equ $ - marker

section .text
checkpoint:
    push rax
    push rdi
    push rsi
    push rdx
    mov rax, 1
    mov rdi, 1
    lea rsi, [rel marker]
    mov rdx, marker_len
    syscall
    pop rdx
    pop rsi
    pop rdi
    pop rax
    ret
```

### Comparing Expected vs Actual

At each step, verify:
- Register values match expectations
- Memory contents are correct
- Flags are set appropriately

```
(gdb) print $rax          # Should be 42
$1 = 42
(gdb) print $eflags       # Check flags
$2 = [ CF PF ZF ]
```

## Using strace

`strace` traces system calls:

```bash
$ strace ./myprogram
execve("./myprogram", ["./myprogram"], 0x7ffd...) = 0
write(1, "Hello", 5)                    = 5
exit(0)                                 = ?
```

Useful for:
- Verifying syscall arguments
- Finding which syscall fails
- Understanding program behavior

## Using objdump

Disassemble to verify instruction encoding:

```bash
$ objdump -d -M intel myprogram

0000000000401000 <_start>:
  401000:       b8 01 00 00 00          mov    eax,0x1
  401005:       bf 01 00 00 00          mov    edi,0x1
  40100a:       48 8d 35 ef 0f 00 00    lea    rsi,[rip+0xfef]
```

## Key Takeaways

- GDB is essential for assembly debugging; learn `stepi`, `info registers`, and `x` commands
- Use `layout asm` and `layout regs` for a visual debugging experience
- Common bugs: stack alignment, register preservation, sign extension, size mismatches
- Add checkpoints for tracing execution flow
- Use strace to debug system call issues
- Verify instruction encoding with objdump
- Always check both the expected and actual state at each step
