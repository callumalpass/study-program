---
id: cs301-t1-context
title: "Context Switching"
order: 4
---

# Context Switching

Context switching is the mechanism by which the CPU switches from executing one process to another. This subtopic examines the context switch mechanism, its overhead, and optimization strategies.

## What is Context Switching?

A **context switch** occurs when the operating system saves the state of the currently running process and restores the state of the next process to run. This enables time-sharing, allowing multiple processes to share a single CPU.

## Context Switch Trigger Events

Context switches occur due to:

1. **Interrupt**: Timer interrupt for time-slicing, I/O completion
2. **System Call**: Process requests OS service
3. **Signal**: Process receives a signal
4. **Exception**: Hardware exception (page fault, divide by zero)

```c
// Process voluntarily yields CPU
void yield_example() {
    // Do some work
    sched_yield();  // Voluntary context switch
    // Continue after being rescheduled
}

// Timer interrupt triggers preemption
// (handled by OS kernel)
void timer_interrupt_handler() {
    save_current_context();
    schedule();  // Select next process
    restore_context();
}
```

## Context Switch Steps

The detailed steps of a context switch:

### Step 1: Save Current Context

```c
// Conceptual code - actual implementation is in assembly
void save_context(PCB *current) {
    // Save CPU registers
    current->registers.eax = get_register(EAX);
    current->registers.ebx = get_register(EBX);
    current->registers.ecx = get_register(ECX);
    // ... save all registers

    // Save program counter
    current->pc = get_instruction_pointer();

    // Save stack pointer
    current->sp = get_stack_pointer();

    // Save processor status
    current->flags = get_flags();

    // Update state
    current->state = READY;  // or WAITING
}
```

### Step 2: Select Next Process

```c
PCB* select_next_process() {
    // Run scheduling algorithm
    PCB *next = scheduler_select();

    if (next == NULL) {
        // No process ready - run idle process
        next = idle_process;
    }

    return next;
}
```

### Step 3: Restore New Context

```c
void restore_context(PCB *next) {
    // Update state
    next->state = RUNNING;

    // Switch address space (if different process)
    if (current_page_table != next->page_table) {
        load_page_table(next->page_table);
        flush_tlb();  // Expensive!
    }

    // Restore CPU registers
    set_register(EAX, next->registers.eax);
    set_register(EBX, next->registers.ebx);
    // ... restore all registers

    // Restore stack pointer
    set_stack_pointer(next->sp);

    // Jump to saved program counter
    jump_to(next->pc);
}
```

## x86 Assembly Example

Actual context switch code (simplified x86):

```asm
; Save context of current process
switch_context:
    ; Save general-purpose registers
    push eax
    push ebx
    push ecx
    push edx
    push esi
    push edi
    push ebp

    ; Save stack pointer to current PCB
    mov eax, [current_pcb]
    mov [eax + PCB_SP], esp

    ; Load stack pointer from new PCB
    mov eax, [next_pcb]
    mov esp, [eax + PCB_SP]

    ; Restore general-purpose registers
    pop ebp
    pop edi
    pop esi
    pop edx
    pop ecx
    pop ebx
    pop eax

    ret  ; Return to new process
```

## Context Switch Overhead

Context switching has significant overhead:

### Direct Costs

1. **Register Save/Restore**: ~100 cycles
2. **Kernel Mode Transition**: ~100-1000 cycles
3. **Scheduler Execution**: Variable

### Indirect Costs

1. **TLB Flush**: Address space change invalidates TLB entries
   - Can cause thousands of TLB misses

2. **Cache Pollution**: New process has cold cache
   - Data cache misses
   - Instruction cache misses

3. **Pipeline Flush**: CPU pipeline must be cleared

### Measured Overhead

Typical context switch times:
- Linux on modern x86: 1-5 microseconds (direct)
- Including cache effects: 10-100+ microseconds

```c
// Measuring context switch time
#include <time.h>
#include <unistd.h>

void measure_context_switch() {
    int fd[2];
    pipe(fd);

    struct timespec start, end;

    if (fork() == 0) {
        // Child
        char c;
        for (int i = 0; i < 10000; i++) {
            read(fd[0], &c, 1);
            write(fd[1], &c, 1);
        }
    } else {
        // Parent
        clock_gettime(CLOCK_MONOTONIC, &start);

        char c = 'x';
        for (int i = 0; i < 10000; i++) {
            write(fd[1], &c, 1);
            read(fd[0], &c, 1);
        }

        clock_gettime(CLOCK_MONOTONIC, &end);

        long ns = (end.tv_sec - start.tv_sec) * 1000000000L +
                  (end.tv_nsec - start.tv_nsec);
        printf("Avg context switch: %ld ns\n", ns / 20000);
    }
}
```

## Optimization Strategies

### Hardware Support

Modern CPUs provide features to reduce context switch overhead:

**Tagged TLB**: TLB entries tagged with process ID (ASID)
- No need to flush TLB on context switch
- Different processes can have entries simultaneously

**Separate Register Sets**: Some architectures have multiple register banks
- Switch to different bank instead of save/restore

### Software Optimizations

**Lazy FPU Context Switch**:
```c
// Don't save FPU registers unless process uses them
void context_switch(PCB *from, PCB *to) {
    if (from->used_fpu) {
        save_fpu_state(from);
    }

    disable_fpu();  // Will trap on first FPU use

    // ... other context switch code ...
}

void fpu_trap_handler() {
    enable_fpu();
    restore_fpu_state(current_process);
    current_process->used_fpu = true;
}
```

**Address Space ID (ASID)**:
```c
void switch_address_space(PCB *to) {
    if (to->asid == INVALID_ASID) {
        to->asid = allocate_asid();
    }

    // Load page table with ASID - no TLB flush needed
    load_page_table_with_asid(to->page_table, to->asid);
}
```

## Threads vs Process Context Switch

Thread context switches within the same process are faster:

| Aspect | Process Switch | Thread Switch |
|--------|----------------|---------------|
| Address space | Must change | Same |
| TLB | May need flush | No flush |
| Page table | Must reload | No reload |
| Registers | Save/restore | Save/restore |
| Cache | Cold | Often warm |

```c
// Thread context switch (within same process)
void thread_switch(Thread *from, Thread *to) {
    // Only save/restore registers and stack
    save_registers(from);
    from->stack_pointer = get_sp();

    set_sp(to->stack_pointer);
    restore_registers(to);

    // No address space change needed!
}
```

## Linux Context Switch

In Linux, context switch is handled by `schedule()`:

```c
// Simplified Linux scheduler path
void schedule(void) {
    struct task_struct *prev, *next;

    prev = current;
    next = pick_next_task();  // Scheduling algorithm

    if (prev != next) {
        context_switch(prev, next);
    }
}

void context_switch(struct task_struct *prev,
                   struct task_struct *next) {
    // Switch address space
    switch_mm(prev->mm, next->mm);

    // Switch register state
    switch_to(prev, next);
}
```

## Summary

Context switching is essential for multiprogramming but has costs:
- Direct overhead: saving/restoring CPU state
- Indirect overhead: TLB, cache, pipeline effects
- Hardware features like tagged TLBs reduce overhead
- Thread switches are faster than process switches
- Optimization strategies include lazy FPU switching and ASIDs
- Modern systems achieve context switches in microseconds
