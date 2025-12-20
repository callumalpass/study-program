# Process Operations

Processes are created, terminated, and managed through specific operations. This subtopic covers the system calls and mechanisms for process lifecycle management.

## Process Creation

### The fork() System Call

In Unix/Linux, processes are created using `fork()`, which creates a child process by duplicating the parent:

```c
#include <unistd.h>
#include <stdio.h>
#include <sys/wait.h>

int main() {
    pid_t pid;
    int x = 10;

    pid = fork();

    if (pid < 0) {
        // Error
        fprintf(stderr, "Fork failed\n");
        return 1;
    } else if (pid == 0) {
        // Child process
        x = 20;
        printf("Child: x = %d, PID = %d\n", x, getpid());
    } else {
        // Parent process
        x = 30;
        printf("Parent: x = %d, Child PID = %d\n", x, pid);
        wait(NULL);  // Wait for child
    }

    return 0;
}
```

Output:
```
Parent: x = 30, Child PID = 1234
Child: x = 20, PID = 1234
```

### fork() Behavior

After `fork()`:
- Child gets exact copy of parent's address space
- Both have independent copies of variables
- Both continue execution after the fork call
- Return values differ: 0 to child, child's PID to parent

```
Before fork():
┌────────────────┐
│    Process     │
│    PID: 100    │
│    x = 10      │
└────────────────┘

After fork():
┌────────────────┐    ┌────────────────┐
│    Parent      │    │     Child      │
│    PID: 100    │    │    PID: 101    │
│    x = 30      │    │    x = 20      │
│ fork() = 101   │    │ fork() = 0     │
└────────────────┘    └────────────────┘
```

### Copy-on-Write (COW)

Modern systems don't physically copy memory during fork. Instead:

1. Parent and child share same physical pages
2. Pages marked read-only
3. On write attempt, page fault occurs
4. Only then is the page copied

```c
// Without COW: fork() copies all pages immediately
// With COW: pages copied only when modified

pid_t pid = fork();
// At this point, parent and child share memory pages

if (pid == 0) {
    // Child modifies data - triggers COW
    large_array[0] = 42;  // Only this page is copied
}
```

Benefits of COW:
- Much faster fork() for large processes
- Many child processes never modify parent data
- Essential for fork-exec pattern

### exec() Family

The `exec()` family replaces the current process image with a new program:

```c
#include <unistd.h>

int main() {
    pid_t pid = fork();

    if (pid == 0) {
        // Child: execute a different program
        char *args[] = {"ls", "-l", "/home", NULL};

        // Various exec variants:
        execl("/bin/ls", "ls", "-l", "/home", NULL);
        execlp("ls", "ls", "-l", "/home", NULL);
        execv("/bin/ls", args);
        execvp("ls", args);

        // exec only returns on error
        perror("exec failed");
        exit(1);
    } else {
        // Parent waits
        wait(NULL);
    }

    return 0;
}
```

### exec() Variants

| Function | Path | Arguments | Environment |
|----------|------|-----------|-------------|
| execl | Full path | List | Inherited |
| execlp | PATH search | List | Inherited |
| execle | Full path | List | Specified |
| execv | Full path | Array | Inherited |
| execvp | PATH search | Array | Inherited |
| execve | Full path | Array | Specified |

## Process Termination

### Normal Termination

```c
#include <stdlib.h>

int main() {
    // Method 1: return from main
    return 0;

    // Method 2: call exit()
    exit(0);

    // Method 3: call _exit() (no cleanup)
    _exit(0);
}
```

**exit() vs _exit()**:
- `exit()`: Calls atexit handlers, flushes stdio buffers
- `_exit()`: Immediate termination, no cleanup

```c
void cleanup() {
    printf("Cleaning up...\n");
}

int main() {
    atexit(cleanup);  // Register cleanup function

    exit(0);  // cleanup() will be called
    // _exit(0);  // cleanup() would NOT be called
}
```

### Abnormal Termination

```c
#include <signal.h>
#include <stdlib.h>

// Terminate via signal
kill(getpid(), SIGKILL);

// Abort (generates SIGABRT)
abort();

// Assertion failure
assert(condition);  // Calls abort() if false
```

### Parent-Child Termination

**wait() and waitpid()**:

```c
#include <sys/wait.h>

int main() {
    pid_t pid = fork();

    if (pid == 0) {
        // Child
        sleep(2);
        exit(42);
    } else {
        // Parent
        int status;

        // Wait for any child
        pid_t child = wait(&status);

        // Or wait for specific child
        // pid_t child = waitpid(pid, &status, 0);

        if (WIFEXITED(status)) {
            printf("Child %d exited with %d\n",
                   child, WEXITSTATUS(status));
        }
    }

    return 0;
}
```

### Status Macros

```c
int status;
wait(&status);

// Normal termination
if (WIFEXITED(status)) {
    int exit_code = WEXITSTATUS(status);
}

// Terminated by signal
if (WIFSIGNALED(status)) {
    int signal = WTERMSIG(status);
}

// Stopped (not terminated)
if (WIFSTOPPED(status)) {
    int signal = WSTOPSIG(status);
}
```

## Zombie and Orphan Processes

### Zombie Processes

A **zombie** is a terminated process whose parent hasn't called `wait()`:

```c
int main() {
    if (fork() == 0) {
        // Child terminates immediately
        exit(0);
    }

    // Parent doesn't call wait()
    // Child becomes zombie
    sleep(60);  // Zombie exists during this time

    return 0;
}
```

View zombies: `ps aux | grep Z`

```
USER  PID  STAT COMMAND
user  1234 Z    [child] <defunct>
```

### Preventing Zombies

```c
// Method 1: Always wait() for children
while (wait(NULL) > 0);

// Method 2: Double fork
if (fork() == 0) {
    if (fork() == 0) {
        // Grandchild - actual work
        // Orphaned immediately, adopted by init
        do_work();
        exit(0);
    }
    exit(0);  // Child exits immediately
}
wait(NULL);  // Reap child, grandchild handled by init

// Method 3: Ignore SIGCHLD
signal(SIGCHLD, SIG_IGN);  // Children auto-reaped
```

### Orphan Processes

An **orphan** is a process whose parent has terminated:

```c
int main() {
    if (fork() == 0) {
        // Child
        sleep(5);
        // By now, parent is gone
        printf("My parent is now: %d\n", getppid());
        // Will print 1 (init) or systemd PID
    }
    // Parent exits immediately
    return 0;
}
```

Orphans are adopted by init (PID 1), which reaps them when they terminate.

## Process Hierarchy

Processes form a tree structure:

```
                    init (PID 1)
                         │
        ┌────────────────┼────────────────┐
        │                │                │
      login          sshd            systemd
        │                │
      bash           sshd
        │                │
    ┌───┴───┐          bash
    │       │            │
   vim     gcc          top
```

```c
// View process tree
// pstree command

// In code
printf("My PID: %d\n", getpid());
printf("Parent PID: %d\n", getppid());
printf("Session ID: %d\n", getsid(0));
printf("Process group: %d\n", getpgrp());
```

## Process Groups and Sessions

```c
#include <unistd.h>

// Create new process group
setpgid(0, 0);  // Make self the group leader

// Create new session
setsid();  // Make self the session leader

// Send signal to process group
kill(-pgid, SIGTERM);  // Negative PID = group
```

## Summary

Process operations are fundamental to OS functionality:
- fork() creates processes through duplication
- Copy-on-write optimizes fork performance
- exec() loads new programs into processes
- exit() terminates processes with cleanup
- wait() retrieves child termination status
- Zombies occur when parents don't wait
- Orphans are adopted by init process
- Processes form hierarchical tree structures
