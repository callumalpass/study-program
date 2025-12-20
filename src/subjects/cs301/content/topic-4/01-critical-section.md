# The Critical Section Problem

The critical section problem is fundamental to concurrent programming. This subtopic covers the problem definition, requirements for solutions, and basic approaches.

## The Problem

When multiple processes or threads access shared data concurrently, the outcome depends on execution order—a **race condition**.

```c
// Shared variable
int counter = 0;

// Thread 1                    // Thread 2
counter++;                     counter++;

// Expected: counter = 2
// Possible: counter = 1 (race condition!)
```

### Why Race Conditions Occur

```
counter++ is not atomic:

Thread 1:                     Thread 2:
1. load counter (0)
2. increment (1)
                              3. load counter (0)
                              4. increment (1)
5. store counter (1)
                              6. store counter (1)

Final value: 1 (should be 2)
```

## Critical Section Definition

A **critical section** is a code segment that accesses shared resources and must not be executed by more than one process at a time.

```c
// General structure
do {
    // Entry section - request permission to enter

    // CRITICAL SECTION
    // Access shared resources

    // Exit section - signal leaving critical section

    // Remainder section
    // Non-critical code
} while (true);
```

## Requirements for Solutions

A valid solution must satisfy three requirements:

### 1. Mutual Exclusion

Only one process can execute in its critical section at any time.

```
Process P1: [----critical section----]
Process P2:                           [----critical section----]
           ←────────────────────────→
           Not overlapping = correct
```

### 2. Progress

If no process is in its critical section and some processes wish to enter, only processes not in their remainder section can participate in deciding who enters next, and this decision cannot be postponed indefinitely.

```c
// Bad example - no progress
bool turn = false;

// Process 0
while (turn != 0);  // Wait forever if P1 not running
// critical section
turn = 1;
```

### 3. Bounded Waiting

There must be a bound on the number of times other processes can enter their critical sections after a process requests entry and before that request is granted.

```
P0 requests entry
P1 enters (1)
P2 enters (2)
P1 enters (3)
...
P0 eventually must be allowed to enter
```

## Naive Approaches (That Don't Work)

### Attempt 1: Disable Interrupts

```c
void enter_critical_section() {
    disable_interrupts();
}

void exit_critical_section() {
    enable_interrupts();
}
```

Problems:
- Only works on single processor
- User process shouldn't control interrupts
- Doesn't work for multiprocessors

### Attempt 2: Lock Variable

```c
bool lock = false;

void enter_critical_section() {
    while (lock);  // Wait while locked
    lock = true;   // Set lock
}

void exit_critical_section() {
    lock = false;
}
```

**Problem: Race condition in the lock itself!**

```
P1: while(lock);     // lock is false
P2: while(lock);     // lock is still false!
P1: lock = true;
P2: lock = true;     // Both in critical section!
```

### Attempt 3: Strict Alternation

```c
int turn = 0;

// Process 0
while (turn != 0);  // Wait
// critical section
turn = 1;

// Process 1
while (turn != 1);  // Wait
// critical section
turn = 0;
```

**Problem: Violates progress requirement**
- P0 must wait for P1 even if P1 is not interested
- Processes must alternate strictly

## Software Solutions

### Peterson's Solution (Two Processes)

A correct software solution for two processes:

```c
bool flag[2] = {false, false};
int turn;

void enter_critical_section(int i) {
    int j = 1 - i;          // Other process
    flag[i] = true;         // I want to enter
    turn = j;               // But I'll let you go first
    while (flag[j] && turn == j);  // Wait if other wants in
                                    // and it's their turn
}

void exit_critical_section(int i) {
    flag[i] = false;        // I'm done
}
```

**Why it works:**

1. **Mutual Exclusion**: Both processes can only be in CS if `flag[0] && flag[1]`, but then `turn` determines who waits.

2. **Progress**: If only one wants in, it enters immediately. If both want in, `turn` decides.

3. **Bounded Waiting**: After P0 exits, it sets `flag[0] = false`, allowing P1 to enter.

### Proof of Correctness

```
Case 1: Only P0 wants to enter
  flag[0] = true
  turn = 1
  while(flag[1] && turn == 1)  // false && ... = false
  // P0 enters immediately

Case 2: Both want to enter, P0 sets turn last
  P0: flag[0] = true
  P1: flag[1] = true
  P1: turn = 0
  P0: turn = 1        // P0 sets turn last
  P0: while(true && turn == 1)  // P0 waits
  P1: while(true && turn == 1)  // false, P1 enters
```

### Bakery Algorithm (N Processes)

Lamport's Bakery Algorithm for n processes:

```c
bool choosing[N];
int number[N];

void enter_critical_section(int i) {
    choosing[i] = true;
    number[i] = max(number[0], ..., number[N-1]) + 1;
    choosing[i] = false;

    for (int j = 0; j < N; j++) {
        while (choosing[j]);  // Wait if j is choosing

        // Wait if j has smaller number, or same number but lower id
        while (number[j] != 0 &&
               (number[j] < number[i] ||
                (number[j] == number[i] && j < i)));
    }
}

void exit_critical_section(int i) {
    number[i] = 0;
}
```

Like taking a number at a bakery—lowest number gets served first.

## Hardware Support for Synchronization

Modern processors provide atomic instructions:

### Test-and-Set

```c
// Atomic instruction
bool test_and_set(bool* target) {
    bool rv = *target;
    *target = true;
    return rv;
}

// Using test_and_set
bool lock = false;

void enter_critical_section() {
    while (test_and_set(&lock));  // Spin until lock acquired
}

void exit_critical_section() {
    lock = false;
}
```

### Compare-and-Swap (CAS)

```c
// Atomic instruction
int compare_and_swap(int* ptr, int expected, int new_value) {
    int actual = *ptr;
    if (actual == expected) {
        *ptr = new_value;
    }
    return actual;
}

// Using CAS
int lock = 0;

void enter_critical_section() {
    while (compare_and_swap(&lock, 0, 1) != 0);
}

void exit_critical_section() {
    lock = 0;
}
```

### Bounded Waiting with Test-and-Set

```c
bool waiting[N];
bool lock = false;

void enter_critical_section(int i) {
    waiting[i] = true;
    bool key = true;

    while (waiting[i] && key) {
        key = test_and_set(&lock);
    }
    waiting[i] = false;
}

void exit_critical_section(int i) {
    int j = (i + 1) % N;

    // Find next waiting process
    while (j != i && !waiting[j]) {
        j = (j + 1) % N;
    }

    if (j == i) {
        lock = false;  // No one waiting
    } else {
        waiting[j] = false;  // Pass lock to next
    }
}
```

## Summary

The critical section problem is fundamental to concurrent programming:
- Race conditions occur when shared data access order matters
- Solutions must provide mutual exclusion, progress, and bounded waiting
- Naive approaches (disable interrupts, simple locks) have flaws
- Peterson's solution works for two processes
- Bakery algorithm generalizes to n processes
- Hardware atomic instructions provide efficient solutions
- These primitives form the foundation for higher-level synchronization
