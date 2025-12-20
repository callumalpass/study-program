# Exception Handling

Exception handling is a critical runtime mechanism that allows programs to respond to exceptional conditions by transferring control to designated handler code. Unlike simple error returns, exceptions can propagate across multiple function calls, unwinding the call stack until an appropriate handler is found. Implementing exception handling requires careful coordination between the compiler and runtime system to maintain correctness while minimizing overhead.

## Exception Handling Fundamentals

Exceptions represent a non-local control flow mechanism. When an exception is thrown, execution immediately transfers from the throw point to the nearest matching catch handler, potentially skipping many intervening function calls. During this transfer, the runtime must clean up resources, run destructors for automatic objects, and restore the execution state.

### Exception Semantics

Consider this C++ example:

```cpp
void process_data() {
    Resource r1("file1.txt");  // Constructor allocates resource
    Resource r2("file2.txt");

    if (error_condition()) {
        throw std::runtime_error("Processing failed");
    }

    // More processing
}

void caller() {
    try {
        process_data();
    } catch (const std::runtime_error &e) {
        std::cerr << "Error: " << e.what() << std::endl;
    }
}
```

When the exception is thrown, the runtime must:
1. Unwind the stack from `process_data` to `caller`
2. Call destructors for `r2` and `r1` in reverse order
3. Transfer control to the catch handler
4. Clean up exception objects when the handler completes

## Stack Unwinding

Stack unwinding is the process of walking up the call stack, cleaning up each frame, until a handler is found. The runtime must know which objects need destructors called and where handlers are located.

### Frame Information

Each function frame needs metadata describing:
- Local objects that require cleanup
- Try blocks and their associated handlers
- How to restore registers and find the previous frame

```c
// Simplified frame metadata structure
typedef struct cleanup_entry {
    void *object;           // Object to destroy
    void (*destructor)(void*);  // Destructor function
} CleanupEntry;

typedef struct frame_info {
    void *frame_pointer;
    void *return_address;
    CleanupEntry *cleanups;
    int cleanup_count;
    struct handler_info *handlers;
} FrameInfo;

typedef struct handler_info {
    void *try_start;        // Start of try block
    void *try_end;          // End of try block
    void *catch_handler;    // Handler code address
    int exception_type;     // Exception type ID
    struct handler_info *next;
} HandlerInfo;
```

## setjmp/longjmp Implementation

The simplest exception mechanism uses `setjmp` and `longjmp`, which save and restore the CPU register state. While this doesn't handle automatic cleanup, it illustrates the basic control flow.

```c
#include <setjmp.h>
#include <stdio.h>

// Exception context stack
#define MAX_EXCEPTION_CONTEXTS 32
static jmp_buf exception_contexts[MAX_EXCEPTION_CONTEXTS];
static int exception_context_top = -1;

typedef struct {
    int code;
    const char *message;
} Exception;

static Exception current_exception;

// Begin exception handling context
#define TRY \
    exception_context_top++; \
    if (setjmp(exception_contexts[exception_context_top]) == 0) {

#define CATCH \
    exception_context_top--; \
    } else {

#define END_TRY \
    exception_context_top--; \
    }

// Throw exception
void throw_exception(int code, const char *message) {
    current_exception.code = code;
    current_exception.message = message;

    if (exception_context_top >= 0) {
        longjmp(exception_contexts[exception_context_top], 1);
    } else {
        fprintf(stderr, "Uncaught exception: %s\n", message);
        exit(1);
    }
}

// Usage example
void divide(int a, int b) {
    if (b == 0) {
        throw_exception(1, "Division by zero");
    }
    printf("Result: %d\n", a / b);
}

int main() {
    TRY
        divide(10, 0);
        printf("After divide\n");
    CATCH
        printf("Caught exception: %s\n", current_exception.message);
    END_TRY

    return 0;
}
```

This approach is simple but has serious limitations:
- No automatic cleanup of resources
- No support for multiple exception types
- Cannot propagate exceptions across functions reliably
- Performance overhead even when no exception is thrown

## Table-Driven Exception Handling

Modern compilers use table-driven exception handling, which eliminates runtime overhead in the no-exception case. The compiler generates exception handling tables that describe the location of handlers and cleanup code.

### Exception Tables

The compiler generates tables mapping program counter ranges to handlers:

```c
// Exception handling table entry
typedef struct eh_entry {
    uintptr_t start_pc;     // Start of try region
    uintptr_t end_pc;       // End of try region
    uintptr_t landing_pad;  // Handler/cleanup code
    uintptr_t action;       // Action to take
} EHEntry;

// Exception handling table for a function
typedef struct eh_table {
    EHEntry *entries;
    int entry_count;
    void *personality;      // Personality function
} EHTable;
```

### Personality Function

The personality function is called during unwinding to determine what action to take for each frame. It examines the exception type and frame metadata to decide whether to handle the exception or continue unwinding.

```c
// Simplified personality function
typedef enum {
    EH_CONTINUE_UNWIND,     // Keep unwinding
    EH_INSTALL_HANDLER,     // Found handler, install it
    EH_CLEANUP              // Run cleanup code
} UnwindAction;

UnwindAction personality_function(
    int version,
    void *exception_object,
    void *context)
{
    // Get current instruction pointer
    uintptr_t ip = get_ip_from_context(context);

    // Find frame's exception table
    EHTable *table = find_eh_table(ip);

    // Search for matching entry
    for (int i = 0; i < table->entry_count; i++) {
        EHEntry *entry = &table->entries[i];

        if (ip >= entry->start_pc && ip < entry->end_pc) {
            // Check if this entry matches exception type
            if (exception_matches(exception_object, entry->action)) {
                // Found handler - set landing pad
                set_ip_in_context(context, entry->landing_pad);
                return EH_INSTALL_HANDLER;
            } else if (entry->action == CLEANUP_ACTION) {
                // Need to run cleanup
                set_ip_in_context(context, entry->landing_pad);
                return EH_CLEANUP;
            }
        }
    }

    return EH_CONTINUE_UNWIND;
}
```

### Two-Phase Unwinding

Many systems use two-phase unwinding for efficiency and correctness:

**Phase 1: Search Phase**
Walk the stack looking for a handler without modifying state. This determines if an exception will be caught.

```c
void *search_for_handler(void *exception_object) {
    void *context = get_current_context();

    while (context) {
        UnwindAction action = call_personality(context, exception_object);

        if (action == EH_INSTALL_HANDLER) {
            return context;  // Found handler
        }

        context = get_previous_context(context);
    }

    return NULL;  // No handler found
}
```

**Phase 2: Cleanup Phase**
Once a handler is found, unwind the stack again, this time running cleanup code.

```c
void cleanup_to_handler(void *exception_object, void *handler_context) {
    void *context = get_current_context();

    while (context != handler_context) {
        UnwindAction action = call_personality(context, exception_object);

        if (action == EH_CLEANUP) {
            // Run cleanup code (destructors)
            run_cleanup(context);
        }

        context = unwind_one_frame(context);
    }

    // Transfer control to handler
    transfer_to_handler(handler_context);
}
```

## Zero-Cost Exception Handling

The goal of zero-cost exceptions is to have no overhead when exceptions are not thrown. This is achieved by:

1. **No Registration**: Don't register/unregister handlers at runtime
2. **Table Lookup**: Find handlers through table searches during unwinding
3. **Compact Tables**: Use compressed formats to minimize memory overhead

```c
// Compact encoding for exception tables
// Uses ULEB128/SLEB128 encoding for space efficiency

typedef struct compact_eh_header {
    uint32_t landing_pad_base;
    uint8_t  type_table_encoding;
    uint32_t type_table_offset;
    uint8_t  call_site_encoding;
    uint32_t call_site_table_length;
} CompactEHHeader;

// Each call site entry describes a try region
typedef struct call_site_entry {
    uint32_t start_offset;      // From landing pad base
    uint32_t length;
    uint32_t landing_pad_offset;
    uint32_t action_index;
} CallSiteEntry;
```

## Exception Object Management

The runtime must manage exception objects properly, ensuring they remain valid during unwinding but are freed afterward.

```c
typedef struct exception_object {
    int type_id;
    void *exception_data;
    int ref_count;              // Reference counting
    void (*destructor)(void*);  // Exception destructor
} ExceptionObject;

ExceptionObject *create_exception(int type_id, void *data) {
    ExceptionObject *ex = malloc(sizeof(ExceptionObject));
    ex->type_id = type_id;
    ex->exception_data = data;
    ex->ref_count = 1;
    ex->destructor = get_type_destructor(type_id);
    return ex;
}

void throw_exception_object(ExceptionObject *ex) {
    void *handler = search_for_handler(ex);

    if (handler) {
        cleanup_to_handler(ex, handler);
        // Handler will release exception when done
    } else {
        // Uncaught exception
        terminate_with_exception(ex);
    }
}

void catch_exception(ExceptionObject *ex) {
    ex->ref_count++;  // Handler holds reference
}

void release_exception(ExceptionObject *ex) {
    if (--ex->ref_count == 0) {
        if (ex->destructor) {
            ex->destructor(ex->exception_data);
        }
        free(ex);
    }
}
```

## Exception Specifications and Optimization

Exception specifications (though deprecated in modern C++) help compilers optimize:

```cpp
// Function promises not to throw
void safe_function() noexcept {
    // Compiler can optimize more aggressively
    // No need to preserve exception handling metadata
}

// If exception escapes noexcept, std::terminate is called
void risky() noexcept {
    // Compiler inserts implicit try-catch around body
    try {
        might_throw();
    } catch (...) {
        std::terminate();
    }
}
```

## Key Takeaways

- Exception handling provides non-local control flow for error handling, requiring runtime support for stack unwinding and cleanup.
- Stack unwinding involves walking up call frames, running destructors, and searching for appropriate handlers.
- Simple setjmp/longjmp implementations provide basic exception control flow but lack automatic cleanup and have performance costs.
- Table-driven exception handling eliminates overhead in the no-exception case by storing handler information in compiler-generated tables.
- Two-phase unwinding searches for a handler first, then unwinds with cleanup, ensuring exception safety.
- Zero-cost exception handling achieves no overhead for normal execution by deferring all exception handling work to the exceptional path.
- Proper exception object management ensures exceptions remain valid during unwinding and are properly cleaned up afterward.
