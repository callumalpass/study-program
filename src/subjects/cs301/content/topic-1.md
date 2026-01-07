# Process Management

Welcome to the foundation of operating systems! In this topic, you'll learn how operating systems create, manage, and terminate processes—the fundamental units of execution. By the end, you'll understand process lifecycle, memory layout, and the mechanisms that enable multitasking.

**Learning Objectives:**
- Distinguish between programs and processes
- Describe the five process states and their transitions
- Explain the structure and purpose of the Process Control Block (PCB)
- Implement process creation and termination using fork() and exec()
- Understand context switching and its overhead
- Compare shared memory and message passing IPC mechanisms

---

## Core Concepts

### What is a Process?

A **process** is a program in execution. While a program is a passive entity—a file containing instructions stored on disk—a process is an active entity with a program counter, allocated memory, and system resources.

```
Program (passive)              Process (active)
+----------------+            +------------------+
|  Instructions  |  load &    |      Stack       | ← Local variables
|     (code)     |  execute   |        ↓         |
+----------------+  ─────→    |                  |
                              |        ↑         |
                              |      Heap        | ← Dynamic memory
                              +------------------+
                              |      Data        | ← Global variables
                              +------------------+
                              |      Text        | ← Program code
                              +------------------+
```

A single program can spawn multiple processes—for example, each browser tab is typically a separate process running the same browser executable.

### Process Memory Layout

Every process has four distinct memory regions:

```c
// Example showing memory regions
#include <stdio.h>
#include <stdlib.h>

int global_var = 42;              // Data section (initialized)
int uninitialized_global;         // BSS section (uninitialized)

void function(int param) {        // param is on stack
    int local_var = 10;           // Stack section
    int *heap_ptr = malloc(100);  // Heap section
    // This function's code is in text section
    free(heap_ptr);
}

int main() {
    function(5);
    return 0;
}
```

**Text Section**: Read-only executable code, shared among all instances of the same program.

**Data Section**: Global and static variables with explicit initial values.

**Heap**: Grows upward, used for dynamic allocation (malloc, new).

**Stack**: Grows downward, holds function calls, local variables, and return addresses.

### The Five Process States

Processes transition through these states during their lifetime:

| State | Description |
|-------|-------------|
| **New** | Process is being created, resources allocated |
| **Ready** | Waiting in queue to be assigned to a processor |
| **Running** | Currently executing on the CPU |
| **Waiting** | Blocked, waiting for I/O or an event |
| **Terminated** | Finished execution, resources being deallocated |

**Key Transitions:**
- New → Ready: Process admitted to ready queue
- Ready → Running: Scheduler dispatches process
- Running → Ready: Timer interrupt or preemption
- Running → Waiting: Process requests I/O
- Waiting → Ready: I/O operation completes
- Running → Terminated: Process calls exit or receives signal

### Process Control Block (PCB)

The operating system maintains a **Process Control Block** for each process:

```c
struct pcb {
    int pid;                    // Unique process identifier
    int state;                  // Current process state
    unsigned long pc;           // Program counter
    unsigned long registers[16]; // CPU register values
    int priority;               // Scheduling priority
    struct mm_struct *memory;   // Memory management info
    struct files_struct *files; // Open file descriptors
    int cpu_time;               // Accounting information
};
```

The PCB enables context switching—when the CPU switches processes, it saves the running process's state to its PCB and loads the next process's state from its PCB.

---

## Creating and Managing Processes

### The fork() System Call

On Unix systems, `fork()` creates a new process by duplicating the parent:

```c
#include <unistd.h>
#include <stdio.h>
#include <sys/wait.h>

int main() {
    int value = 5;
    pid_t pid = fork();

    if (pid < 0) {
        perror("Fork failed");
        return 1;
    } else if (pid == 0) {
        // Child process
        value += 10;
        printf("Child: value = %d (PID: %d)\n", value, getpid());
    } else {
        // Parent process
        wait(NULL);  // Wait for child to finish
        printf("Parent: value = %d (PID: %d)\n", value, getpid());
    }
    return 0;
}
```

Output:
```
Child: value = 15 (PID: 1235)
Parent: value = 5 (PID: 1234)
```

**Key point:** After fork(), parent and child have separate address spaces—changes in one don't affect the other.

### The exec() Family

`exec()` replaces the current process image with a new program:

```c
#include <unistd.h>
#include <stdio.h>
#include <sys/wait.h>

int main() {
    pid_t pid = fork();

    if (pid == 0) {
        // Child: replace with 'ls' command
        execlp("/bin/ls", "ls", "-l", NULL);
        // If exec returns, it failed
        perror("exec failed");
        return 1;
    } else {
        wait(NULL);
        printf("Child finished\n");
    }
    return 0;
}
```

Common variants:
- `execl()`: List of arguments
- `execv()`: Vector (array) of arguments
- `execlp()` / `execvp()`: Search PATH for executable

### Process Termination

Processes terminate via `exit()` or by returning from main():

```c
#include <sys/wait.h>

int main() {
    pid_t pid = fork();

    if (pid == 0) {
        exit(42);  // Child exits with status 42
    } else {
        int status;
        wait(&status);
        if (WIFEXITED(status)) {
            printf("Child exited with code: %d\n",
                   WEXITSTATUS(status));
        }
    }
    return 0;
}
```

---

## Common Patterns and Idioms

### Fork-Exec Pattern

The standard pattern for running external programs:

```c
pid_t pid = fork();
if (pid == 0) {
    exec...();  // Replace child with new program
    exit(1);    // Only reached if exec fails
} else {
    wait(NULL); // Parent waits for child
}
```

### Daemon Process Pattern

Creating a background service:

```c
pid_t pid = fork();
if (pid > 0) exit(0);        // Parent exits
setsid();                     // Create new session
close(STDIN_FILENO);          // Close standard streams
close(STDOUT_FILENO);
close(STDERR_FILENO);
// Daemon continues running...
```

### Process Pool Pattern

For handling multiple requests efficiently:

```c
#define NUM_WORKERS 4

for (int i = 0; i < NUM_WORKERS; i++) {
    if (fork() == 0) {
        while (1) {
            // Wait for and handle requests
            handle_request();
        }
    }
}
// Parent monitors worker processes
```

---

## Common Mistakes and Debugging

### Mistake 1: Zombie Processes

A zombie occurs when a child terminates but the parent doesn't call `wait()`:

```c
// Wrong - creates zombie
if (fork() == 0) {
    exit(0);  // Child exits
}
// Parent continues without wait()
sleep(60);  // Zombie exists for 60 seconds

// Correct - reap child
if (fork() == 0) {
    exit(0);
}
wait(NULL);  // Parent reaps child
```

Check for zombies: `ps aux | grep Z`

### Mistake 2: Fork in Loop

Be careful with fork() in loops:

```c
// Wrong - creates 2^3 = 8 processes!
for (int i = 0; i < 3; i++) {
    fork();
}

// Correct - only parent creates children
for (int i = 0; i < 3; i++) {
    if (fork() == 0) {
        do_work();
        exit(0);  // Child must exit
    }
}
```

### Mistake 3: Not Checking fork() Return Value

```c
// Wrong - ignores errors
fork();

// Correct - handle errors
pid_t pid = fork();
if (pid < 0) {
    perror("fork failed");
    exit(1);
}
```

### Mistake 4: Race Conditions

Parent and child execute concurrently—don't assume execution order:

```c
// The order of these prints is non-deterministic
if (fork() == 0) {
    printf("Child\n");
} else {
    printf("Parent\n");
}
```

---

## Best Practices

1. **Always check return values** of fork(), exec(), and wait()

2. **Always reap children** to prevent zombies—use wait(), waitpid(), or set up SIGCHLD handler

3. **Use _exit() in child after fork()** when exec() fails to avoid running cleanup handlers twice

4. **Minimize memory before fork()** since the entire address space is copied (or use vfork() for immediate exec)

5. **Close unneeded file descriptors** after fork() in both parent and child

6. **Use wait() status macros**: WIFEXITED(), WEXITSTATUS(), WIFSIGNALED(), etc.

---

## Summary

You've learned the essentials of process management in operating systems:

- **Process vs Program**: Processes are programs in execution with their own memory and resources
- **Memory Layout**: Text (code), Data (globals), Heap (dynamic), Stack (local)
- **Process States**: New → Ready → Running → Waiting/Terminated
- **PCB**: Operating system's data structure containing all process information
- **fork()**: Creates a child process by duplicating the parent
- **exec()**: Replaces process image with a new program
- **wait()**: Parent waits for and reaps terminated children

**Key takeaways:**
- A process is more than just code—it includes state, memory, and resources
- fork() and exec() together enable launching new programs
- Proper cleanup with wait() prevents zombie processes

---

## Further Exploration

Ready to dive deeper? Explore these topics:
- Inspect `/proc/[pid]/` on Linux to see PCB information in action
- Trace process creation with `strace` to see system calls
- Experiment with `pstree` to visualize process hierarchies
- Study Copy-on-Write (COW) optimization for fork()
