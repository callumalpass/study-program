# Deadlock Recovery

Once deadlock is detected, the system must recover. This subtopic covers process termination, resource preemption, and checkpoint/rollback recovery strategies.

## Recovery Overview

Two main approaches:
1. **Process Termination**: Kill processes to break the cycle
2. **Resource Preemption**: Take resources from processes

```
Deadlock detected
        │
        ├─────────────────────────────────┐
        │                                 │
        ↓                                 ↓
Process Termination              Resource Preemption
        │                                 │
        ├─────┐                           ├─────┐
        ↓     ↓                           ↓     ↓
      Kill  Kill                      Preempt  Rollback
       All   One                     Resources  Process
```

## Process Termination

### Abort All Deadlocked Processes

```c
void abort_all_deadlocked(bool* deadlocked, int n) {
    for (int i = 0; i < n; i++) {
        if (deadlocked[i]) {
            kill(process_pids[i], SIGKILL);
            release_all_resources(i);
        }
    }
}
```

**Advantages:**
- Guaranteed to break deadlock
- Simple to implement

**Disadvantages:**
- Loses all work done by killed processes
- May need to restart significant computation

### Abort One Process at a Time

```c
void abort_one_at_a_time(bool* deadlocked, int n) {
    while (has_deadlock(deadlocked, n)) {
        int victim = select_victim(deadlocked, n);

        kill(process_pids[victim], SIGKILL);
        release_all_resources(victim);
        deadlocked[victim] = false;

        // Re-run detection to see if deadlock broken
        detect_deadlock(/* ... */, deadlocked);
    }
}
```

**Advantages:**
- Minimizes total work lost
- May break deadlock with fewer terminations

**Disadvantages:**
- Higher overhead (repeated detection)
- Takes longer to recover

### Victim Selection Criteria

```c
typedef struct {
    int pid;
    int priority;
    int cpu_time_used;      // Don't waste computation
    int resources_held;     // Impact on others
    int time_to_complete;   // Almost done?
    bool is_interactive;    // User impact
    int checkpoint_age;     // Can we rollback?
} ProcessInfo;

int calculate_victim_cost(ProcessInfo* p) {
    int cost = 0;

    // Favor killing low priority processes
    cost += (10 - p->priority) * 10;

    // Prefer processes that used less CPU
    cost += p->cpu_time_used / 1000;

    // Consider resources held (more = more impact)
    cost -= p->resources_held * 5;

    // Don't kill processes almost done
    if (p->time_to_complete < 100) {
        cost += 50;
    }

    // Protect interactive processes
    if (p->is_interactive) {
        cost += 100;
    }

    // Prefer processes with recent checkpoint
    if (p->checkpoint_age < 60) {
        cost -= 20;
    }

    return cost;
}

int select_victim(ProcessInfo* processes, bool* deadlocked, int n) {
    int min_cost = INT_MAX;
    int victim = -1;

    for (int i = 0; i < n; i++) {
        if (deadlocked[i]) {
            int cost = calculate_victim_cost(&processes[i]);
            if (cost < min_cost) {
                min_cost = cost;
                victim = i;
            }
        }
    }

    return victim;
}
```

## Resource Preemption

### Preemption Strategy

Take resources from processes without killing them:

```c
void preempt_resources(int victim, int* resources_needed) {
    // Save victim's state
    save_process_state(victim);

    // Take required resources
    for (int r = 0; r < num_resources; r++) {
        if (resources_needed[r] > 0) {
            int taken = min(resources_needed[r],
                          allocation[victim][r]);
            allocation[victim][r] -= taken;
            available[r] += taken;
            resources_needed[r] -= taken;
        }
    }

    // Mark victim as waiting for preempted resources
    mark_waiting(victim);
}
```

### Which Resources to Preempt?

Not all resources can be preempted:

```
Preemptable:
- CPU (context switch)
- Memory pages (swap to disk)
- File locks (with rollback)

Non-preemptable:
- Printer mid-job
- Tape drive mid-write
- Network connection mid-transfer
```

### Selecting Resources

```c
int select_resource_to_preempt(int* deadlocked_procs, int n_deadlocked) {
    // Find resource that would break cycle
    for (int r = 0; r < num_resources; r++) {
        // Try preempting this resource type
        int new_available = available[r];

        for (int i = 0; i < n_deadlocked; i++) {
            int pid = deadlocked_procs[i];
            new_available += allocation[pid][r];
        }

        // Check if this breaks deadlock
        if (would_break_deadlock(r, new_available)) {
            return r;
        }
    }

    return -1;  // Need to preempt multiple resources
}
```

## Checkpoint and Rollback

### Process Checkpointing

Save process state periodically for recovery:

```c
typedef struct {
    int pid;
    void* memory_image;
    size_t memory_size;
    int* file_descriptors;
    int num_fds;
    void* registers;
    time_t checkpoint_time;
} Checkpoint;

Checkpoint* create_checkpoint(int pid) {
    Checkpoint* cp = malloc(sizeof(Checkpoint));
    cp->pid = pid;
    cp->checkpoint_time = time(NULL);

    // Save memory
    cp->memory_size = get_process_memory_size(pid);
    cp->memory_image = malloc(cp->memory_size);
    copy_process_memory(pid, cp->memory_image);

    // Save file descriptors
    cp->num_fds = get_num_fds(pid);
    cp->file_descriptors = malloc(cp->num_fds * sizeof(int));
    copy_fd_table(pid, cp->file_descriptors);

    // Save registers
    cp->registers = malloc(sizeof(RegisterSet));
    save_registers(pid, cp->registers);

    return cp;
}

void rollback_to_checkpoint(int pid, Checkpoint* cp) {
    // Restore memory
    restore_process_memory(pid, cp->memory_image, cp->memory_size);

    // Restore file descriptors
    restore_fd_table(pid, cp->file_descriptors, cp->num_fds);

    // Restore registers (including PC)
    restore_registers(pid, cp->registers);

    // Process will re-execute from checkpoint
}
```

### Checkpoint Placement

```c
// Automatic checkpointing
void checkpoint_scheduler() {
    while (1) {
        sleep(CHECKPOINT_INTERVAL);

        for (int i = 0; i < num_processes; i++) {
            if (should_checkpoint(i)) {
                create_and_store_checkpoint(i);
            }
        }
    }
}

bool should_checkpoint(int pid) {
    // Checkpoint if:
    // 1. Significant work done since last checkpoint
    if (cpu_time_since_checkpoint(pid) > WORK_THRESHOLD) {
        return true;
    }

    // 2. About to enter critical region
    if (entering_critical_section(pid)) {
        return true;
    }

    // 3. Holding resources that may be preempted
    if (holds_scarce_resources(pid)) {
        return true;
    }

    return false;
}
```

### Rollback for Deadlock Recovery

```c
void recover_with_rollback(int* deadlocked, int n) {
    int victim = select_victim(deadlocked, n);

    // Find most recent checkpoint
    Checkpoint* cp = find_checkpoint(victim);

    if (cp != NULL) {
        // Release resources acquired after checkpoint
        release_resources_after_checkpoint(victim, cp);

        // Rollback process
        rollback_to_checkpoint(victim, cp);

        printf("Process %d rolled back to checkpoint\n", victim);
    } else {
        // No checkpoint, must terminate
        terminate_process(victim);
    }
}
```

## Starvation Prevention

Same process might be selected as victim repeatedly:

```c
typedef struct {
    int pid;
    int rollback_count;
} RollbackHistory;

RollbackHistory history[MAX_PROCESSES];

int select_victim_fair(bool* deadlocked, int n) {
    int min_cost = INT_MAX;
    int victim = -1;

    for (int i = 0; i < n; i++) {
        if (deadlocked[i]) {
            int cost = calculate_victim_cost(&processes[i]);

            // Increase cost based on rollback history
            cost += history[i].rollback_count * ROLLBACK_PENALTY;

            if (cost < min_cost) {
                min_cost = cost;
                victim = i;
            }
        }
    }

    // Update history
    if (victim >= 0) {
        history[victim].rollback_count++;
    }

    return victim;
}
```

## Combined Strategy

```c
typedef enum {
    ABORT_ALL,
    ABORT_ONE,
    PREEMPT,
    ROLLBACK
} RecoveryMethod;

void recover_from_deadlock(bool* deadlocked, int n) {
    RecoveryMethod method = choose_recovery_method(deadlocked, n);

    switch (method) {
        case ABORT_ALL:
            // Fast but expensive - use when many processes deadlocked
            abort_all_deadlocked(deadlocked, n);
            break;

        case ABORT_ONE:
            // Use when few processes deadlocked
            abort_one_at_a_time(deadlocked, n);
            break;

        case PREEMPT:
            // Use when resources are preemptable
            preempt_until_resolved(deadlocked, n);
            break;

        case ROLLBACK:
            // Use when checkpoints available
            rollback_until_resolved(deadlocked, n);
            break;
    }
}

RecoveryMethod choose_recovery_method(bool* deadlocked, int n) {
    int num_deadlocked = count_deadlocked(deadlocked, n);

    // Many processes - abort all is faster
    if (num_deadlocked > n / 2) {
        return ABORT_ALL;
    }

    // Check if we can preempt
    if (all_resources_preemptable(deadlocked, n)) {
        return PREEMPT;
    }

    // Check for checkpoints
    if (checkpoints_available(deadlocked, n)) {
        return ROLLBACK;
    }

    // Default to terminating one at a time
    return ABORT_ONE;
}
```

## Recovery Cost Analysis

```
Method          | Work Lost | Time | Complexity
----------------|-----------|------|------------
Abort All       | Maximum   | Fast | Low
Abort One       | Minimum   | Slow | Medium
Preemption      | Variable  | Med  | High
Rollback        | Minimal   | Med  | High

Recommended based on:
- Frequency of deadlocks
- Cost of process restart
- Availability of checkpoints
- Resource preemptability
```

## Summary

Deadlock recovery breaks the deadlock after detection:
- **Process termination**: Kill one or all deadlocked processes
- **Resource preemption**: Take resources forcibly
- **Checkpoint/rollback**: Restore to earlier state
- Victim selection balances fairness and efficiency
- Must prevent starvation of repeatedly-selected victims
- Combined strategies adapt to different situations
- Trade-off between recovery time and work lost
- Checkpointing enables more graceful recovery
