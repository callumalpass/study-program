# Memory Safety

Memory safety vulnerabilities remain a critical security concern. This subtopic covers memory safety concepts, common vulnerabilities, and defensive techniques including safe languages, bounds checking, and exploit mitigation mechanisms.

## Memory Safety Concepts

### Memory Safety Properties

```
Safe Memory Access requires:

┌──────────────────────────────────────────────────┐
│ 1. Spatial Safety                                │
│    - Access only allocated memory                │
│    - No buffer overflows/underflows              │
│    - No out-of-bounds array access               │
├──────────────────────────────────────────────────┤
│ 2. Temporal Safety                               │
│    - Access only valid memory                    │
│    - No use-after-free                           │
│    - No double-free                              │
│    - No dangling pointers                        │
├──────────────────────────────────────────────────┤
│ 3. Type Safety                                   │
│    - Memory interpreted as correct type          │
│    - No arbitrary type casts                     │
│    - Proper object lifetime management           │
└──────────────────────────────────────────────────┘
```

## Common Memory Vulnerabilities

### Buffer Overflow Example (C)

```c
// VULNERABLE CODE - For educational purposes only
#include <stdio.h>
#include <string.h>

// Stack buffer overflow
void vulnerable_function(char* user_input) {
    char buffer[64];

    // VULNERABLE: No bounds checking
    strcpy(buffer, user_input);  // Buffer overflow if input > 64 bytes

    printf("You entered: %s\n", buffer);
}

// Heap buffer overflow
void heap_overflow_vulnerable() {
    char* buffer = malloc(64);

    // VULNERABLE: Can write past allocated size
    gets(buffer);  // Never use gets()!

    free(buffer);
}

// Use-after-free
void use_after_free_vulnerable() {
    char* ptr = malloc(100);
    free(ptr);

    // VULNERABLE: Using freed memory
    strcpy(ptr, "data");  // Use-after-free
}

// SAFE ALTERNATIVES

void safe_function(const char* user_input) {
    char buffer[64];

    // SAFE: Bounds-checked copy
    strncpy(buffer, user_input, sizeof(buffer) - 1);
    buffer[sizeof(buffer) - 1] = '\0';  // Ensure null termination

    printf("You entered: %s\n", buffer);
}

void safe_heap_allocation(const char* user_input, size_t input_len) {
    // Check input length first
    if (input_len >= 1000) {
        fprintf(stderr, "Input too large\n");
        return;
    }

    // Allocate sufficient space
    char* buffer = malloc(input_len + 1);
    if (buffer == NULL) {
        fprintf(stderr, "Allocation failed\n");
        return;
    }

    // Safe copy with explicit length
    memcpy(buffer, user_input, input_len);
    buffer[input_len] = '\0';

    // Use buffer...

    // Clean up
    free(buffer);
    buffer = NULL;  // Prevent use-after-free
}
```

## Memory-Safe Languages

### Rust: Safety Without Garbage Collection

```rust
// Rust provides memory safety through ownership and borrowing

fn safe_string_operations() {
    // Ownership: each value has exactly one owner
    let s1 = String::from("hello");

    // Move: ownership transferred to s2
    let s2 = s1;
    // s1 is no longer valid - prevents use-after-free

    // Borrowing: temporary access without ownership
    let s3 = String::from("world");
    print_string(&s3);  // Borrow s3
    println!("{}", s3);  // s3 still valid

    // Mutable borrowing: only one mutable reference at a time
    let mut s4 = String::from("mutable");
    modify_string(&mut s4);
}

fn print_string(s: &String) {
    // Immutable borrow
    println!("{}", s);
}

fn modify_string(s: &mut String) {
    // Mutable borrow
    s.push_str(" modified");
}

// Bounds checking: automatic
fn safe_array_access() {
    let arr = [1, 2, 3, 4, 5];

    // Safe: bounds checked at runtime
    let index = 10;
    match arr.get(index) {
        Some(value) => println!("Value: {}", value),
        None => println!("Index out of bounds")
    }

    // This would panic (caught at runtime):
    // let value = arr[10];
}

// No null pointers: use Option<T>
fn safe_null_handling(user_id: u32) -> Option<String> {
    // Instead of returning NULL/null
    if user_id == 0 {
        None  // Explicit absence
    } else {
        Some(format!("User {}", user_id))
    }
}

// Usage requires explicit handling
fn use_optional() {
    match safe_null_handling(0) {
        Some(name) => println!("Found: {}", name),
        None => println!("Not found")
    }
}

// Lifetime annotations prevent dangling references
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    // Compiler ensures returned reference lives long enough
    if x.len() > y.len() { x } else { y }
}
```

### Python: Automatic Memory Management

```python
# Python provides memory safety through:
# 1. Automatic memory management (garbage collection)
# 2. Bounds checking on all array/list access
# 3. Strong dynamic typing

class MemorySafeOperations:
    """Python's built-in memory safety"""

    def safe_list_operations(self):
        """Automatic bounds checking"""
        data = [1, 2, 3, 4, 5]

        # Safe: raises IndexError if out of bounds
        try:
            value = data[10]
        except IndexError:
            print("Index out of bounds (safely caught)")

        # Safe: slice operations never overflow
        subset = data[2:100]  # Returns [3, 4, 5], doesn't crash

    def no_manual_memory_management(self):
        """No manual allocation/deallocation"""
        # Automatic allocation
        large_list = [0] * 1000000

        # Automatic deallocation when no longer referenced
        # No need to free()

    def no_dangling_references(self):
        """References are safe"""
        obj = {"key": "value"}
        ref1 = obj
        ref2 = obj

        # All references valid until garbage collected
        # No use-after-free possible

    def type_safety(self):
        """Strong typing prevents type confusion"""
        number = 42
        text = "hello"

        # Can't accidentally treat string as integer
        # This would raise TypeError:
        # result = number + text

# Note: Python still vulnerable to logic bugs and injection attacks
# Memory safety ≠ complete security
```

## Bounds Checking

### Runtime Bounds Checking

```c
// Manual bounds checking in C
#include <stddef.h>
#include <string.h>
#include <errno.h>

// Safe string copy with explicit bounds
int safe_strcpy(char* dest, size_t dest_size, const char* src) {
    if (dest == NULL || src == NULL) {
        errno = EINVAL;
        return -1;
    }

    size_t src_len = strlen(src);

    // Check bounds before copy
    if (src_len >= dest_size) {
        errno = ERANGE;
        return -1;
    }

    memcpy(dest, src, src_len + 1);  // +1 for null terminator
    return 0;
}

// Safe array access with bounds checking
int safe_array_access(int* array, size_t array_size, size_t index, int* out) {
    if (array == NULL || out == NULL) {
        return -1;
    }

    // Explicit bounds check
    if (index >= array_size) {
        return -1;  // Out of bounds
    }

    *out = array[index];
    return 0;
}

// Safe buffer operations
typedef struct {
    char* data;
    size_t size;
    size_t capacity;
} SafeBuffer;

SafeBuffer* buffer_create(size_t capacity) {
    SafeBuffer* buf = malloc(sizeof(SafeBuffer));
    if (buf == NULL) return NULL;

    buf->data = malloc(capacity);
    if (buf->data == NULL) {
        free(buf);
        return NULL;
    }

    buf->size = 0;
    buf->capacity = capacity;
    return buf;
}

int buffer_append(SafeBuffer* buf, const char* data, size_t len) {
    if (buf == NULL || data == NULL) return -1;

    // Bounds check
    if (buf->size + len > buf->capacity) {
        return -1;  // Would overflow
    }

    memcpy(buf->data + buf->size, data, len);
    buf->size += len;
    return 0;
}

void buffer_destroy(SafeBuffer* buf) {
    if (buf != NULL) {
        free(buf->data);
        free(buf);
    }
}
```

## Address Space Layout Randomization (ASLR)

ASLR randomizes memory addresses to make exploitation harder.

### Understanding ASLR

```
Without ASLR (Predictable):        With ASLR (Random):
┌──────────────────────┐           ┌──────────────────────┐
│ Stack: 0xbfffe000    │           │ Stack: 0x7fff5e2d000 │ ← Random
├──────────────────────┤           ├──────────────────────┤
│ Heap:  0x08050000    │           │ Heap:  0x5621ab8000  │ ← Random
├──────────────────────┤           ├──────────────────────┤
│ Libs:  0xb7e00000    │           │ Libs:  0x7f8c4e3000  │ ← Random
├──────────────────────┤           ├──────────────────────┤
│ Code:  0x08048000    │           │ Code:  0x5555554000  │ ← Random
└──────────────────────┘           └──────────────────────┘

Attacker knows exact addresses    Attacker must guess addresses
Easy to exploit                    Exploitation much harder
```

### Enabling ASLR (Linux)

```python
import subprocess
import os

class ASLRManager:
    """Manage ASLR settings (educational)"""

    @staticmethod
    def check_aslr_status():
        """Check current ASLR setting"""
        try:
            with open('/proc/sys/kernel/randomize_va_space', 'r') as f:
                value = int(f.read().strip())

            aslr_modes = {
                0: "Disabled (INSECURE)",
                1: "Conservative randomization",
                2: "Full randomization (RECOMMENDED)"
            }

            return aslr_modes.get(value, "Unknown")

        except Exception as e:
            return f"Error checking ASLR: {e}"

    @staticmethod
    def demonstrate_aslr():
        """Demonstrate ASLR by showing different addresses"""
        import ctypes

        # Print address of a variable multiple times
        for i in range(5):
            # Fork a new process to see randomization
            pid = os.fork()

            if pid == 0:  # Child process
                x = ctypes.c_int(42)
                print(f"Run {i+1}: Variable address = {ctypes.addressof(x):016x}")
                os._exit(0)
            else:  # Parent process
                os.wait()

        print("\nWith ASLR enabled, these addresses should be different")

# Position Independent Executable (PIE)
# Compile with: gcc -fPIE -pie program.c -o program
# Makes code randomized too, not just stack/heap/libraries
```

## Stack Canaries

Stack canaries detect buffer overflows before they can corrupt return addresses.

### Stack Canary Mechanism

```
Normal Stack Frame:               Stack Frame with Canary:
┌────────────────────┐           ┌────────────────────┐
│ Return Address     │           │ Return Address     │
├────────────────────┤           ├────────────────────┤
│ Saved Frame Ptr    │           │ Saved Frame Ptr    │
├────────────────────┤           ├────────────────────┤
│                    │           │ Canary Value       │ ← Random value
│                    │           ├────────────────────┤
│ Local Variables    │           │ Local Variables    │
│                    │           │                    │
│ Buffer[64]         │           │ Buffer[64]         │
└────────────────────┘           └────────────────────┘

Buffer overflow:                 Buffer overflow:
┌────────────────────┐           ┌────────────────────┐
│ ATTACKER CODE ←───┐│           │ ATTACKER CODE      │
├──────────────────┐││           ├────────────────────┤
│ OVERFLOW DATA    │││           │ CORRUPTED CANARY   │ ← Detected!
├──────────────────┘││           ├────────────────────┤
│ AAAAAAAAAAAAAAAAA││           │ AAAAAAAAAAAAAAAAAA │
│ AAAAAAAAAAAAAAAAA││           │ AAAAAAAAAAAAAAAAAA │
└───────────────────┘│           └────────────────────┘
     Exploited                   Program aborts before
                                 attacker code runs
```

### Compiler Stack Protection

```bash
# Enable stack protection (GCC/Clang)
gcc -fstack-protector-strong program.c -o program

# Options:
# -fstack-protector-all: Protect all functions (slowest, most secure)
# -fstack-protector-strong: Protect functions with buffers/arrays
# -fstack-protector: Protect functions with vulnerable buffers only
# (none): No protection (INSECURE)
```

```c
// Example with stack protection
#include <stdio.h>
#include <string.h>

// Compiled with -fstack-protector-strong
void protected_function(char* input) {
    char buffer[64];

    // Canary placed before buffer
    // If overflow occurs, canary is corrupted
    strcpy(buffer, input);  // Still bad practice!

    // On function return:
    // 1. Check if canary was modified
    // 2. If yes: abort program (prevent exploitation)
    // 3. If no: return normally
}

// Stack smashing detected: <program> terminated
// Aborted (core dumped)
```

## Data Execution Prevention (DEP/NX)

DEP marks memory regions as either writable OR executable, never both.

### Understanding DEP

```
Without DEP:                      With DEP (NX bit):
┌──────────────────────┐         ┌──────────────────────┐
│ Stack:               │         │ Stack:               │
│ - Writable           │         │ - Writable           │
│ - Executable ⚠️       │         │ - NOT executable ✓   │
├──────────────────────┤         ├──────────────────────┤
│ Heap:                │         │ Heap:                │
│ - Writable           │         │ - Writable           │
│ - Executable ⚠️       │         │ - NOT executable ✓   │
├──────────────────────┤         ├──────────────────────┤
│ Code:                │         │ Code:                │
│ - Read-only          │         │ - Read-only          │
│ - Executable         │         │ - Executable         │
└──────────────────────┘         └──────────────────────┘

Attacker can inject        Injected code cannot
and execute shellcode      execute (access violation)
```

## Safe Programming Practices

### Memory-Safe C++ (Modern)

```cpp
#include <vector>
#include <string>
#include <memory>
#include <optional>

class MemorySafeCpp {
public:
    // Use std::vector instead of raw arrays
    void safe_dynamic_array() {
        std::vector<int> data = {1, 2, 3, 4, 5};

        // Bounds-checked access
        try {
            int value = data.at(10);  // Throws out_of_range
        } catch (const std::out_of_range& e) {
            // Handle error
        }

        // Automatic memory management
        // No manual delete needed
    }

    // Use std::string instead of char*
    void safe_strings() {
        std::string name = "Alice";

        // Safe concatenation (no buffer overflow)
        name += " Smith";

        // Automatic memory management
        // No strcpy/strcat vulnerabilities
    }

    // Use smart pointers instead of raw pointers
    void safe_pointers() {
        // Unique pointer: exclusive ownership
        std::unique_ptr<int> ptr1 = std::make_unique<int>(42);

        // Automatic deletion when out of scope
        // No memory leaks or use-after-free

        // Shared pointer: reference counted
        std::shared_ptr<int> ptr2 = std::make_shared<int>(100);
        std::shared_ptr<int> ptr3 = ptr2;  // Reference count = 2

        // Deleted when last reference destroyed
    }

    // Use std::optional instead of null pointers
    std::optional<std::string> find_user(int user_id) {
        if (user_id == 0) {
            return std::nullopt;  // Explicit absence
        }
        return "User" + std::to_string(user_id);
    }

    void use_optional() {
        auto result = find_user(0);

        if (result.has_value()) {
            std::string name = result.value();
        } else {
            // Handle absence
        }
    }
};
```

## Summary

Memory safety is critical for preventing exploitation:

- **Memory-Safe Languages**: Rust, Python, Java provide built-in memory safety
- **Bounds Checking**: Validate array/buffer access before use
- **ASLR**: Randomize memory layout to make exploitation harder
- **Stack Canaries**: Detect buffer overflows before return address corruption
- **DEP/NX**: Mark memory as writable OR executable, preventing shellcode execution
- **Safe Libraries**: Use bounds-checked functions (strncpy vs strcpy)
- **Modern C++**: Use std::vector, std::string, smart pointers instead of raw pointers

Memory safety vulnerabilities remain common in C/C++ code. When possible, use memory-safe languages. When using C/C++, enable all available protections (ASLR, stack canaries, DEP) and use safe programming practices.
