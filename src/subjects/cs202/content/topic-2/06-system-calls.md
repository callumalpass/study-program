---
id: cs202-t2-syscalls
title: "System Calls"
order: 6
---

# System Calls and OS Interface

**System calls** (syscalls) are the interface between user programs and the operating system kernel. They provide essential services like file I/O, process management, and memory allocation that programs cannot perform directly.

## What Are System Calls?

User programs run in **user mode** with restricted privileges. They cannot:
- Access hardware directly
- Execute privileged instructions
- Access kernel memory
- Modify system state

To perform these operations, programs must request services from the kernel through system calls. The CPU switches to **kernel mode**, executes the requested operation, then returns to user mode.

```
User Program                    Kernel
    │                              │
    │ syscall instruction          │
    ├─────────────────────────────►│
    │                              │ Execute privileged
    │                              │ operation
    │◄─────────────────────────────┤
    │ Return to user mode          │
    │                              │
```

## System Call Mechanism on x86-64 Linux

### The SYSCALL Instruction

Modern x86-64 Linux uses the `syscall` instruction:

```nasm
mov rax, syscall_number   ; Which syscall to invoke
mov rdi, arg1             ; First argument
mov rsi, arg2             ; Second argument
mov rdx, arg3             ; Third argument
mov r10, arg4             ; Fourth argument (note: r10, not rcx!)
mov r8, arg5              ; Fifth argument
mov r9, arg6              ; Sixth argument
syscall                   ; Invoke kernel
; Return value in RAX, -errno on error
```

**Important**: The fourth argument uses R10, not RCX (which is clobbered by syscall).

### Return Values

- **Success**: RAX contains result (e.g., bytes read, file descriptor)
- **Error**: RAX contains -errno (negative error code)

```nasm
syscall
test rax, rax
js .error                 ; Jump if negative (error)
```

## Common System Calls

### read (syscall 0)

```nasm
; ssize_t read(int fd, void *buf, size_t count)
mov rax, 0                ; syscall number: read
mov rdi, 0                ; fd: stdin
mov rsi, buffer           ; buffer address
mov rdx, 1024             ; max bytes to read
syscall
; RAX = bytes read, or -errno
```

### write (syscall 1)

```nasm
; ssize_t write(int fd, const void *buf, size_t count)
mov rax, 1                ; syscall number: write
mov rdi, 1                ; fd: stdout
lea rsi, [rel message]    ; buffer address
mov rdx, msg_len          ; bytes to write
syscall
; RAX = bytes written, or -errno
```

### open (syscall 2)

```nasm
; int open(const char *pathname, int flags, mode_t mode)
mov rax, 2                ; syscall number: open
lea rdi, [rel filename]   ; path
mov rsi, 0                ; flags: O_RDONLY
mov rdx, 0                ; mode (ignored for O_RDONLY)
syscall
; RAX = file descriptor, or -errno
```

Common flags:
- `O_RDONLY` = 0
- `O_WRONLY` = 1
- `O_RDWR` = 2
- `O_CREAT` = 0x40
- `O_TRUNC` = 0x200

### close (syscall 3)

```nasm
; int close(int fd)
mov rax, 3                ; syscall number: close
mov rdi, rbx              ; file descriptor
syscall
```

### exit (syscall 60)

```nasm
; void exit(int status)
mov rax, 60               ; syscall number: exit
mov rdi, 0                ; exit code: success
syscall
; Does not return
```

### mmap (syscall 9)

```nasm
; void *mmap(void *addr, size_t length, int prot,
;            int flags, int fd, off_t offset)
mov rax, 9                ; syscall number: mmap
xor rdi, rdi              ; addr: NULL (let kernel choose)
mov rsi, 4096             ; length: one page
mov rdx, 3                ; prot: PROT_READ | PROT_WRITE
mov r10, 0x22             ; flags: MAP_PRIVATE | MAP_ANONYMOUS
mov r8, -1                ; fd: -1 (anonymous)
xor r9, r9                ; offset: 0
syscall
; RAX = mapped address, or -errno
```

## Complete Example: Echo Program

```nasm
section .data
    prompt db "Enter text: "
    prompt_len equ $ - prompt

section .bss
    buffer resb 256

section .text
    global _start

_start:
    ; write prompt
    mov rax, 1            ; write
    mov rdi, 1            ; stdout
    lea rsi, [rel prompt]
    mov rdx, prompt_len
    syscall

    ; read input
    mov rax, 0            ; read
    mov rdi, 0            ; stdin
    lea rsi, [rel buffer]
    mov rdx, 256
    syscall
    mov r12, rax          ; Save bytes read

    ; write output
    mov rax, 1            ; write
    mov rdi, 1            ; stdout
    lea rsi, [rel buffer]
    mov rdx, r12          ; Write same number of bytes
    syscall

    ; exit
    mov rax, 60
    xor rdi, rdi
    syscall
```

## File Operations Example

```nasm
section .data
    filename db "output.txt", 0
    message db "Hello from assembly!", 10
    msg_len equ $ - message

section .bss
    fd resq 1

section .text
    global _start

_start:
    ; open file (create if doesn't exist)
    mov rax, 2                ; open
    lea rdi, [rel filename]
    mov rsi, 0x41             ; O_WRONLY | O_CREAT
    mov rdx, 0644o            ; Mode: rw-r--r--
    syscall
    test rax, rax
    js .error
    mov [rel fd], rax         ; Save file descriptor

    ; write to file
    mov rax, 1                ; write
    mov rdi, [rel fd]
    lea rsi, [rel message]
    mov rdx, msg_len
    syscall

    ; close file
    mov rax, 3                ; close
    mov rdi, [rel fd]
    syscall

    ; exit success
    mov rax, 60
    xor rdi, rdi
    syscall

.error:
    ; exit with error code
    mov rax, 60
    mov rdi, 1
    syscall
```

## System Call Table (Linux x86-64)

| Number | Name | Arguments |
|--------|------|-----------|
| 0 | read | fd, buf, count |
| 1 | write | fd, buf, count |
| 2 | open | pathname, flags, mode |
| 3 | close | fd |
| 9 | mmap | addr, len, prot, flags, fd, offset |
| 11 | munmap | addr, len |
| 12 | brk | addr |
| 39 | getpid | - |
| 57 | fork | - |
| 59 | execve | filename, argv, envp |
| 60 | exit | status |
| 61 | wait4 | pid, status, options, rusage |

## Error Handling

System calls return negative values on error:

```nasm
syscall
cmp rax, -4096            ; Check for error range
ja .error                 ; If RAX > -4096 (unsigned), it's negative

; Or more simply:
test rax, rax
js .error                 ; Jump if sign flag set (negative)
```

Common error codes:
- `-EPERM` (-1): Permission denied
- `-ENOENT` (-2): No such file or directory
- `-EIO` (-5): I/O error
- `-EBADF` (-9): Bad file descriptor
- `-ENOMEM` (-12): Out of memory
- `-EACCES` (-13): Access denied
- `-EINVAL` (-22): Invalid argument

## Interfacing with C Library

Instead of direct syscalls, you can use the C library:

```nasm
section .data
    fmt db "Result: %d", 10, 0

section .text
    extern printf
    extern exit

    global main

main:
    push rbp
    mov rbp, rsp

    ; Call printf
    lea rdi, [rel fmt]
    mov esi, 42
    xor eax, eax              ; No floating-point args
    call printf

    ; Call exit
    xor edi, edi
    call exit
```

Advantages of C library:
- Portable across systems
- Handles details (buffering, error handling)
- Familiar interface

Disadvantages:
- Larger executable (linked library)
- Slight overhead
- Must follow C calling convention

## Key Takeaways

- System calls are the interface between user programs and the kernel
- x86-64 Linux uses the `syscall` instruction with arguments in specific registers
- Return value is in RAX; negative values indicate errors
- Common syscalls: read(0), write(1), open(2), close(3), exit(60)
- Direct syscalls create minimal executables but are OS-specific
- C library functions provide portable wrappers around syscalls
- Understanding syscalls is essential for systems programming and security
