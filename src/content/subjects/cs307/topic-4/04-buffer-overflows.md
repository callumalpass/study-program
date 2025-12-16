# Buffer Overflows

## Introduction

Buffer overflow vulnerabilities occur when a program writes more data to a buffer than it can hold, causing data to overflow into adjacent memory locations. This can corrupt data, crash programs, or allow attackers to execute arbitrary code. Understanding buffer overflows is critical for defensive programming, especially in systems languages like C and C++.

This lesson focuses on understanding buffer overflows from a defensive perspective - how to recognize vulnerable patterns, prevent them through secure coding practices, and utilize modern protection mechanisms.

## Understanding Memory Layout

Before diving into buffer overflows, it's essential to understand how program memory is organized.

### Stack Memory Layout

```c
/*
Stack memory layout (grows downward):

Higher Memory Addresses
+------------------+
| Command-line     |
| arguments & env  |
+------------------+
| Stack            |
| (local vars,     |
|  return addrs)   |
|        |         |
|        v         |
+------------------+
| Heap             |
|        ^         |
|        |         |
+------------------+
| BSS (uninit)     |
+------------------+
| Data (init)      |
+------------------+
| Text (code)      |
+------------------+
Lower Memory Addresses
*/

// Stack frame for a function call:
/*
+------------------+  <- Higher addresses
| Previous frame   |
+------------------+
| Return address   |  <- Overwrite this to hijack control
+------------------+
| Saved frame ptr  |
+------------------+
| Local variables  |  <- Buffer overflow starts here
+------------------+  <- Lower addresses
*/
```

## Stack-Based Buffer Overflows

Stack buffer overflows are the most common type, occurring when a program writes beyond the bounds of a stack-allocated buffer.

### Vulnerable Pattern

```c
// VULNERABLE - Classic buffer overflow
#include <stdio.h>
#include <string.h>

void vulnerable_function(char *user_input) {
    char buffer[64];  // 64-byte buffer on stack

    // Dangerous: strcpy doesn't check buffer size
    strcpy(buffer, user_input);  // VULNERABILITY

    printf("You entered: %s\n", buffer);
}

int main(int argc, char *argv[]) {
    if (argc > 1) {
        vulnerable_function(argv[1]);
    }
    return 0;
}

/*
Attack scenario:
./program "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"

This writes 80 'A's into a 64-byte buffer, overflowing into:
- Saved frame pointer
- Return address
- Other stack data

Attacker can overwrite return address to redirect execution.
*/
```

### Secure Implementation: Bounds Checking

```c
// SECURE - Proper bounds checking
#include <stdio.h>
#include <string.h>

#define BUFFER_SIZE 64

void secure_function(const char *user_input) {
    char buffer[BUFFER_SIZE];

    // Method 1: Use strncpy with size limit
    strncpy(buffer, user_input, BUFFER_SIZE - 1);
    buffer[BUFFER_SIZE - 1] = '\0';  // Ensure null termination

    printf("You entered: %s\n", buffer);
}

void secure_function_v2(const char *user_input) {
    char buffer[BUFFER_SIZE];
    size_t input_len = strlen(user_input);

    // Method 2: Explicit length check before copy
    if (input_len >= BUFFER_SIZE) {
        fprintf(stderr, "Input too long (max %d chars)\n", BUFFER_SIZE - 1);
        return;
    }

    strcpy(buffer, user_input);  // Safe now, after validation
    printf("You entered: %s\n", buffer);
}

void secure_function_v3(const char *user_input) {
    char buffer[BUFFER_SIZE];

    // Method 3: Use snprintf for automatic bounds checking
    snprintf(buffer, BUFFER_SIZE, "%s", user_input);

    printf("You entered: %s\n", buffer);
}

int main(int argc, char *argv[]) {
    if (argc > 1) {
        secure_function(argv[1]);
    }
    return 0;
}
```

### Safe String Functions Reference

```c
// Comparison of unsafe vs. safe string functions

// UNSAFE FUNCTIONS - NEVER USE WITH UNTRUSTED INPUT
strcpy(dest, src);          // No bounds checking
strcat(dest, src);          // No bounds checking
sprintf(dest, fmt, ...);    // No bounds checking
gets(buffer);               // No way to limit input - NEVER USE

// SAFE ALTERNATIVES
strncpy(dest, src, n);      // Limited copy
strncat(dest, src, n);      // Limited concatenation
snprintf(dest, n, fmt, ...);// Limited formatted output
fgets(buffer, n, stdin);    // Limited input with size parameter

// Example: Safe string operations
void demonstrate_safe_operations(void) {
    char dest[32];
    char src[] = "This is a long string that might overflow";

    // Safe copy
    strncpy(dest, src, sizeof(dest) - 1);
    dest[sizeof(dest) - 1] = '\0';

    // Safe concatenation
    char append[] = " more text";
    size_t remaining = sizeof(dest) - strlen(dest) - 1;
    strncat(dest, append, remaining);

    // Safe formatted output
    int value = 42;
    snprintf(dest, sizeof(dest), "Value: %d", value);
}
```

## Integer Overflows Leading to Buffer Overflows

Integer overflows can lead to buffer overflows when size calculations wrap around.

### Vulnerable Pattern

```c
// VULNERABLE - Integer overflow
#include <stdlib.h>
#include <string.h>

void *allocate_and_copy_vulnerable(size_t count, size_t size) {
    // Dangerous: count * size might overflow
    size_t total = count * size;

    void *buffer = malloc(total);
    if (buffer == NULL) {
        return NULL;
    }

    // If multiplication overflowed, buffer is too small
    // Subsequent operations will overflow the buffer
    return buffer;
}

/*
Attack scenario:
count = 0x80000000 (2^31)
size = 2

count * size = 0x100000000, but on 32-bit systems this wraps to 0
malloc(0) might return a small buffer
Subsequent writes will overflow
*/
```

### Secure Implementation: Integer Overflow Checking

```c
// SECURE - Check for integer overflow
#include <stdlib.h>
#include <stdint.h>
#include <stdio.h>
#include <limits.h>

// Safe multiplication with overflow detection
int safe_multiply(size_t a, size_t b, size_t *result) {
    // Check for overflow before multiplication
    if (a > 0 && b > SIZE_MAX / a) {
        return -1;  // Would overflow
    }

    *result = a * b;
    return 0;  // Success
}

void *allocate_and_copy_secure(size_t count, size_t size, const void *data) {
    size_t total;

    // Check for integer overflow
    if (safe_multiply(count, size, &total) != 0) {
        fprintf(stderr, "Integer overflow detected\n");
        return NULL;
    }

    // Additional sanity check
    if (total > SIZE_MAX / 2) {
        fprintf(stderr, "Allocation too large\n");
        return NULL;
    }

    void *buffer = malloc(total);
    if (buffer == NULL) {
        fprintf(stderr, "Allocation failed\n");
        return NULL;
    }

    memcpy(buffer, data, total);
    return buffer;
}

// Alternative: Use compiler built-ins (GCC/Clang)
void *allocate_secure_builtin(size_t count, size_t size) {
    size_t total;

#if defined(__GNUC__) && __GNUC__ >= 5
    // Use GCC built-in overflow checking
    if (__builtin_mul_overflow(count, size, &total)) {
        fprintf(stderr, "Integer overflow detected\n");
        return NULL;
    }
#else
    if (safe_multiply(count, size, &total) != 0) {
        return NULL;
    }
#endif

    return malloc(total);
}
```

## Heap-Based Buffer Overflows

Heap overflows occur when dynamically allocated buffers are overflowed.

### Vulnerable Pattern

```c
// VULNERABLE - Heap buffer overflow
#include <stdlib.h>
#include <string.h>

typedef struct {
    char name[32];
    int privilege_level;
} User;

void process_user_vulnerable(const char *user_name) {
    User *user = malloc(sizeof(User));

    // Dangerous: No length check
    strcpy(user->name, user_name);  // Can overflow into privilege_level

    // Attacker can overflow name to overwrite privilege_level
    if (user->privilege_level == 0) {
        printf("Regular user: %s\n", user->name);
    } else {
        printf("Admin user: %s\n", user->name);
    }

    free(user);
}
```

### Secure Implementation: Heap Safety

```c
// SECURE - Protected heap operations
#include <stdlib.h>
#include <string.h>
#include <stdio.h>

typedef struct {
    char name[32];
    int privilege_level;
    uint32_t canary;  // Guard value to detect overflow
} User;

#define CANARY_VALUE 0xDEADBEEF

User *create_user_secure(const char *user_name, int privilege) {
    User *user = malloc(sizeof(User));
    if (user == NULL) {
        return NULL;
    }

    // Initialize canary
    user->canary = CANARY_VALUE;
    user->privilege_level = privilege;

    // Safe copy with bounds checking
    strncpy(user->name, user_name, sizeof(user->name) - 1);
    user->name[sizeof(user->name) - 1] = '\0';

    return user;
}

int validate_user(const User *user) {
    // Check canary to detect overflow
    if (user->canary != CANARY_VALUE) {
        fprintf(stderr, "SECURITY: Buffer overflow detected!\n");
        return -1;
    }
    return 0;
}

void process_user_secure(const char *user_name) {
    User *user = create_user_secure(user_name, 0);
    if (user == NULL) {
        return;
    }

    // Validate before use
    if (validate_user(user) != 0) {
        free(user);
        return;
    }

    if (user->privilege_level == 0) {
        printf("Regular user: %s\n", user->name);
    } else {
        printf("Admin user: %s\n", user->name);
    }

    free(user);
}
```

## Modern Protection Mechanisms

Modern operating systems and compilers provide multiple layers of protection against buffer overflows.

### Stack Canaries (Stack Guards)

```c
// Compiler-generated stack protection
// Compile with: gcc -fstack-protector-strong program.c

void protected_function(char *input) {
    /*
    Compiler inserts code like:

    void protected_function(char *input) {
        unsigned long canary = __stack_chk_guard;  // Random value
        char buffer[64];

        // ... function code ...

        if (canary != __stack_chk_guard) {
            __stack_chk_fail();  // Abort if canary corrupted
        }
    }
    */

    char buffer[64];
    strcpy(buffer, input);  // Still vulnerable, but overflow detected
    printf("Data: %s\n", buffer);

    // Compiler checks canary before returning
    // If buffer overflow corrupted canary, program aborts
}

// Compilation options:
// -fstack-protector-all     : Protect all functions
// -fstack-protector-strong  : Protect functions with vulnerable patterns
// -fstack-protector         : Protect functions with char arrays > 8 bytes
```

### Address Space Layout Randomization (ASLR)

```c
/*
ASLR randomizes memory addresses at runtime:

- Stack base address randomized
- Heap base address randomized
- Library load addresses randomized
- Executable load address randomized (PIE)

This makes it harder for attackers to predict addresses
needed for exploitation.
*/

#include <stdio.h>

void demonstrate_aslr(void) {
    static int global_var = 42;
    int stack_var = 42;
    int *heap_var = malloc(sizeof(int));

    printf("Global variable: %p\n", (void*)&global_var);
    printf("Stack variable:  %p\n", (void*)&stack_var);
    printf("Heap variable:   %p\n", (void*)heap_var);
    printf("Function:        %p\n", (void*)&demonstrate_aslr);

    free(heap_var);

    // Run this program multiple times:
    // With ASLR: Addresses change each run
    // Without ASLR: Addresses are constant
}

// Enable PIE (Position Independent Executable):
// gcc -fPIE -pie program.c
```

### Data Execution Prevention (DEP/NX)

```c
/*
DEP/NX marks memory pages as either writable OR executable, not both:

- Stack: Writable, NOT executable
- Heap: Writable, NOT executable
- Code: Executable, NOT writable

This prevents shellcode execution on the stack/heap.

Enable in GCC:
gcc -z noexecstack program.c

Check if binary has NX:
execstack -q ./program  # Should show 'X-'
readelf -l ./program | grep GNU_STACK
*/
```

## Secure Coding Practices

### Input Validation

```c
// Comprehensive input validation
#include <stdio.h>
#include <string.h>
#include <ctype.h>

#define MAX_INPUT_SIZE 256

typedef enum {
    VALIDATE_OK = 0,
    VALIDATE_TOO_LONG,
    VALIDATE_INVALID_CHARS,
    VALIDATE_EMPTY
} ValidateResult;

ValidateResult validate_input(const char *input, size_t max_len) {
    size_t len;

    // Check for NULL
    if (input == NULL) {
        return VALIDATE_EMPTY;
    }

    // Check length
    len = strlen(input);
    if (len == 0) {
        return VALIDATE_EMPTY;
    }
    if (len >= max_len) {
        return VALIDATE_TOO_LONG;
    }

    // Check for valid characters (example: alphanumeric + some punctuation)
    for (size_t i = 0; i < len; i++) {
        if (!isalnum(input[i]) && input[i] != ' ' &&
            input[i] != '.' && input[i] != '-' && input[i] != '_') {
            return VALIDATE_INVALID_CHARS;
        }
    }

    return VALIDATE_OK;
}

void process_validated_input(const char *input) {
    char buffer[MAX_INPUT_SIZE];

    // Validate before processing
    switch (validate_input(input, MAX_INPUT_SIZE)) {
        case VALIDATE_OK:
            strncpy(buffer, input, sizeof(buffer) - 1);
            buffer[sizeof(buffer) - 1] = '\0';
            printf("Valid input: %s\n", buffer);
            break;

        case VALIDATE_TOO_LONG:
            fprintf(stderr, "Error: Input too long\n");
            break;

        case VALIDATE_INVALID_CHARS:
            fprintf(stderr, "Error: Invalid characters in input\n");
            break;

        case VALIDATE_EMPTY:
            fprintf(stderr, "Error: Empty input\n");
            break;
    }
}
```

### Safe Memory Management

```c
// Defensive memory management practices
#include <stdlib.h>
#include <string.h>

// Safe allocation wrapper
void *safe_malloc(size_t size) {
    // Reject unreasonable sizes
    if (size == 0 || size > SIZE_MAX / 2) {
        return NULL;
    }

    void *ptr = malloc(size);
    if (ptr == NULL) {
        fprintf(stderr, "Allocation failed for size %zu\n", size);
        return NULL;
    }

    // Initialize to zero for security
    memset(ptr, 0, size);
    return ptr;
}

// Safe realloc wrapper
void *safe_realloc(void *ptr, size_t old_size, size_t new_size) {
    // Validate sizes
    if (new_size == 0 || new_size > SIZE_MAX / 2) {
        return NULL;
    }

    void *new_ptr = realloc(ptr, new_size);
    if (new_ptr == NULL) {
        // Original pointer still valid
        return NULL;
    }

    // Zero out new memory if growing
    if (new_size > old_size) {
        memset((char*)new_ptr + old_size, 0, new_size - old_size);
    }

    return new_ptr;
}

// Safe deallocation
void safe_free(void **ptr) {
    if (ptr != NULL && *ptr != NULL) {
        free(*ptr);
        *ptr = NULL;  // Prevent use-after-free
    }
}

// Example usage
void demonstrate_safe_allocation(void) {
    char *buffer = safe_malloc(128);
    if (buffer == NULL) {
        return;
    }

    // Use buffer...
    strncpy(buffer, "Safe data", 127);

    // Safe cleanup
    safe_free((void**)&buffer);

    // buffer is now NULL, can't be accidentally reused
}
```

## Modern Language Alternatives

Higher-level languages provide automatic memory safety:

### Python Example

```python
# Python: No buffer overflow possible
def process_input(user_input):
    # Strings are dynamically sized
    # No manual memory management
    # Bounds checking automatic

    buffer = user_input[:64]  # Safe truncation
    print(f"You entered: {buffer}")

# Memory safety guaranteed by runtime
```

### Rust Example

```rust
// Rust: Memory safety guaranteed at compile time
fn process_input(user_input: &str) {
    // Compiler enforces bounds checking
    let mut buffer = String::with_capacity(64);

    // Safe: Will truncate if needed
    if user_input.len() > 64 {
        buffer.push_str(&user_input[..64]);
    } else {
        buffer.push_str(user_input);
    }

    println!("You entered: {}", buffer);

    // No buffer overflows possible
    // Compiler catches out-of-bounds access
}

// Accessing beyond bounds causes panic (safe failure)
// or compile error if detected statically
```

## Detection and Testing

### Static Analysis

```bash
# Use static analysis tools to detect vulnerabilities

# Clang Static Analyzer
clang --analyze program.c

# Cppcheck
cppcheck --enable=all program.c

# Flawfinder
flawfinder program.c

# Example issues detected:
# - Use of unsafe functions (strcpy, sprintf, gets)
# - Potential buffer overflows
# - Integer overflows
```

### Dynamic Analysis

```bash
# AddressSanitizer: Detect memory errors at runtime
gcc -fsanitize=address -g program.c -o program
./program

# Valgrind: Memory debugger
valgrind --leak-check=full --show-leak-kinds=all ./program

# Both tools detect:
# - Buffer overflows
# - Use-after-free
# - Memory leaks
# - Invalid memory access
```

## Summary

Buffer overflows remain a critical security vulnerability, especially in systems programming. Defense requires multiple layers: secure coding practices, input validation, use of safe functions, compiler protections (stack canaries, ASLR, DEP), and when possible, using memory-safe languages. Understanding these vulnerabilities helps developers write more secure code and recognize dangerous patterns during code review.

## Key Takeaways

- Always validate input length before copying to buffers
- Use safe string functions (strncpy, snprintf, fgets)
- Check for integer overflows in size calculations
- Enable compiler protections (stack protector, ASLR, PIE, NX)
- Use static and dynamic analysis tools
- Implement defense-in-depth with canaries and validation
- Consider memory-safe languages for new projects
- Never use dangerous functions: strcpy, strcat, sprintf, gets
- Initialize and zero sensitive memory
- Use safe memory management wrappers
