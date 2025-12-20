---
id: cs301-t1-pcb
title: "Process Control Block"
order: 2
---

# Process Control Block

The Process Control Block (PCB) is the data structure the operating system uses to store all information about a process. This subtopic examines PCB structure and its role in process management.

## What is the PCB?

The **Process Control Block** (PCB), also called the **task control block**, is a data structure maintained by the operating system for each process. It contains all the information needed to manage the process and allow context switching between processes.

## PCB Structure

```
┌─────────────────────────────────────────┐
│         Process Control Block           │
├─────────────────────────────────────────┤
│  Process State: Running/Ready/Waiting   │
├─────────────────────────────────────────┤
│  Process ID (PID): Unique identifier    │
├─────────────────────────────────────────┤
│  Program Counter: Next instruction      │
├─────────────────────────────────────────┤
│  CPU Registers: All register values     │
├─────────────────────────────────────────┤
│  CPU Scheduling Info: Priority, queues  │
├─────────────────────────────────────────┤
│  Memory Management Info: Page tables    │
├─────────────────────────────────────────┤
│  Accounting Info: CPU time, limits      │
├─────────────────────────────────────────┤
│  I/O Status: Open files, devices        │
└─────────────────────────────────────────┘
```

### PCB Fields Explained

**Process State**: Current state of the process (new, ready, running, waiting, terminated). Determines which queue the process belongs to.

**Process ID (PID)**: Unique integer identifier assigned to each process. Used by the OS and applications to reference specific processes.

**Program Counter**: Address of the next instruction to execute. Saved during context switch and restored when process resumes.

**CPU Registers**: Contents of all processor registers including:
- General-purpose registers (accumulator, index registers)
- Stack pointer
- Condition codes (status flags)
- These must be saved and restored during context switches

**CPU Scheduling Information**:
- Process priority
- Pointers to scheduling queues
- Scheduling parameters (time slice, deadline for real-time)

**Memory Management Information**:
- Base and limit registers
- Page tables or segment tables
- Memory allocated to the process

**Accounting Information**:
- CPU time used
- Time limits
- Process number
- Job or account numbers

**I/O Status Information**:
- List of open files
- List of I/O devices allocated
- Outstanding I/O requests

## Linux Implementation

In Linux, the PCB is implemented as the `task_struct` structure defined in `<linux/sched.h>`:

```c
struct task_struct {
    volatile long state;           // Process state
    void *stack;                   // Kernel stack pointer

    pid_t pid;                     // Process ID
    pid_t tgid;                    // Thread group ID

    struct task_struct *parent;   // Parent process
    struct list_head children;    // List of children
    struct list_head sibling;     // Sibling list

    struct mm_struct *mm;          // Memory descriptor

    struct files_struct *files;    // Open file information

    unsigned int policy;           // Scheduling policy
    int prio, static_prio;        // Priority values

    cputime_t utime, stime;       // User/system CPU time

    // Many more fields...
};
```

### Accessing Process Information in Linux

The `/proc` filesystem exposes process information:

```bash
# View process status
cat /proc/1234/status

# View memory maps
cat /proc/1234/maps

# View open files
ls -l /proc/1234/fd

# View command line
cat /proc/1234/cmdline
```

From C code:

```c
#include <stdio.h>
#include <unistd.h>

int main() {
    printf("PID: %d\n", getpid());
    printf("Parent PID: %d\n", getppid());
    printf("User ID: %d\n", getuid());
    printf("Group ID: %d\n", getgid());
    return 0;
}
```

## PCB and Context Switching

When the CPU switches from one process to another, the PCB plays a crucial role:

```
Process P0                   Operating System                  Process P1
   │                               │                               │
   │  executing                    │                               │
   │ ──────────────────────────→   │                               │
   │                    interrupt/system call                      │
   │                               │                               │
   │                     save state to PCB0                        │
   │                               │                               │
   │                     reload state from PCB1                    │
   │                               │                               │
   │                               │ ──────────────────────────→   │
   │                               │                    executing  │
   │                               │                               │
   │                    interrupt/system call                      │
   │                               │                               │
   │                     save state to PCB1                        │
   │                               │                               │
   │                     reload state from PCB0                    │
   │                               │                               │
   │ ←──────────────────────────   │                               │
   │  executing                    │                               │
```

### Context Switch Steps

1. **Save State**: Store current process's CPU registers, program counter, and other state in its PCB
2. **Update PCB**: Change process state from running to ready or waiting
3. **Move PCB**: Place the PCB in the appropriate queue
4. **Select Next Process**: Scheduler selects process from ready queue
5. **Update New PCB**: Change new process's state to running
6. **Restore State**: Load CPU registers and program counter from new process's PCB
7. **Resume Execution**: Continue executing the new process

### Context Switch Overhead

Context switching has overhead costs:
- Time to save and restore registers
- TLB flush (memory management)
- Cache effects (cold cache after switch)
- Pipeline flush

Typical context switch time: 1-10 microseconds on modern systems.

## PCB Organization

Operating systems organize PCBs in various data structures:

```c
// Array-based (fixed maximum processes)
struct task_struct process_table[MAX_PROCESSES];

// Linked list (dynamic)
struct list_head {
    struct list_head *next, *prev;
};

// Hash table (fast lookup by PID)
struct hlist_head pid_hash[PID_HASH_SIZE];
```

### Process Queues

PCBs are linked into multiple queues:

```
Ready Queue:
  ┌─────┐   ┌─────┐   ┌─────┐   ┌─────┐
  │PCB 1│→→→│PCB 2│→→→│PCB 3│→→→│PCB 4│→→→ NULL
  └─────┘   └─────┘   └─────┘   └─────┘

Device Queues (one per device):
  Disk:    PCB 5 →→→ PCB 8 →→→ NULL
  Network: PCB 6 →→→ PCB 7 →→→ NULL
```

## Practical Example

Creating a simple process manager:

```c
#include <stdio.h>
#include <stdlib.h>

#define MAX_PROCESSES 100

typedef enum { NEW, READY, RUNNING, WAITING, TERMINATED } State;

typedef struct {
    int pid;
    State state;
    int priority;
    int program_counter;
    int cpu_time_used;
    // Simplified - real PCB has much more
} PCB;

PCB process_table[MAX_PROCESSES];
int process_count = 0;

int create_process(int priority) {
    if (process_count >= MAX_PROCESSES) return -1;

    PCB *new_pcb = &process_table[process_count];
    new_pcb->pid = process_count;
    new_pcb->state = NEW;
    new_pcb->priority = priority;
    new_pcb->program_counter = 0;
    new_pcb->cpu_time_used = 0;

    process_count++;
    return new_pcb->pid;
}
```

## Summary

The Process Control Block is the operating system's central data structure for process management:
- Contains all information needed to manage a process
- Enables context switching by storing/restoring process state
- Organized in queues for scheduling and I/O management
- Implementation varies by OS but contains similar information
- Efficient PCB management is crucial for system performance
