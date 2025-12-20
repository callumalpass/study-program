---
id: cs105-t6-multifile
title: "Multi-file Projects"
order: 7
---

# Multi-file Projects

Organizing C code across multiple files is essential for maintainable, scalable projects. This section covers best practices for project structure, module design, and code organization.

## Why Multiple Files?

### Benefits

1. **Modularity** - Logical separation of concerns
2. **Maintainability** - Easier to navigate and modify
3. **Reusability** - Modules can be shared across projects
4. **Compilation speed** - Only rebuild changed files
5. **Collaboration** - Multiple developers work simultaneously
6. **Testing** - Unit test individual modules

### Single File Problems

Large single-file projects suffer from:
- Long compilation times
- Difficult navigation
- Merge conflicts
- No encapsulation
- Hard to test

## Project Structure

### Basic Layout

```
project/
├── Makefile
├── README.md
├── include/
│   ├── config.h
│   ├── util.h
│   └── math.h
├── src/
│   ├── main.c
│   ├── util.c
│   └── math.c
├── tests/
│   ├── test_util.c
│   └── test_math.c
└── build/
    └── (generated files)
```

### Larger Projects

```
project/
├── Makefile
├── CMakeLists.txt
├── include/
│   └── project/
│       ├── config.h
│       ├── types.h
│       └── public_api.h
├── src/
│   ├── core/
│   │   ├── core.c
│   │   └── core_internal.h
│   ├── util/
│   │   ├── util.c
│   │   ├── string.c
│   │   └── util_internal.h
│   └── main.c
├── tests/
├── docs/
├── examples/
└── third_party/
```

## Module Design

### Module Structure

Each module consists of:
- **Header (.h)** - Public interface
- **Source (.c)** - Implementation
- **Internal header** - Private declarations (optional)

```c
// math.h - Public interface
#ifndef MATH_H
#define MATH_H

typedef struct Vector Vector;

Vector* vector_create(double x, double y);
void vector_destroy(Vector* v);
double vector_length(const Vector* v);
Vector* vector_add(const Vector* a, const Vector* b);

#endif

// math_internal.h - Private declarations
#ifndef MATH_INTERNAL_H
#define MATH_INTERNAL_H

#include "math.h"

struct Vector {
    double x;
    double y;
};

#endif

// math.c - Implementation
#include "math_internal.h"
#include <stdlib.h>
#include <math.h>

Vector* vector_create(double x, double y) {
    Vector* v = malloc(sizeof(Vector));
    if (v) {
        v->x = x;
        v->y = y;
    }
    return v;
}

void vector_destroy(Vector* v) {
    free(v);
}

double vector_length(const Vector* v) {
    return sqrt(v->x * v->x + v->y * v->y);
}
```

### Opaque Pointers

Hide implementation details:

```c
// list.h
typedef struct List List;  // Forward declaration only

List* list_create(void);
void list_destroy(List* list);
void list_append(List* list, int value);
int list_get(const List* list, size_t index);

// list.c
struct List {
    int* data;
    size_t size;
    size_t capacity;
};
// Implementation hidden from users
```

## File Naming Conventions

### Common Patterns

```
module.h      - Public header
module.c      - Implementation
module_p.h    - Private/internal header
module_test.c - Unit tests
```

### Prefixes and Suffixes

```
types.h       - Type definitions
config.h      - Configuration
debug.h       - Debug utilities
*_internal.h  - Internal headers
*_impl.c      - Implementation details
```

## Include Organization

### Header Include Order

```c
// source.c

// 1. Own header (verifies self-containment)
#include "mymodule.h"

// 2. Standard library headers
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// 3. System/platform headers
#include <unistd.h>

// 4. Third-party library headers
#include <openssl/ssl.h>

// 5. Project headers
#include "util.h"
#include "config.h"
```

### Include What You Use

Each file includes what it needs directly:

```c
// BAD - relying on transitive includes
#include "bigheader.h"  // Happens to include stdio.h

// GOOD - explicit dependencies
#include <stdio.h>
#include "bigheader.h"
```

## Static Functions and Variables

### File-Scope Encapsulation

Use `static` to limit visibility:

```c
// util.c

// Private helper function
static int parse_digit(char c) {
    return c - '0';
}

// Private variable
static int call_count = 0;

// Public function
int parse_number(const char* str) {
    call_count++;
    int result = 0;
    while (*str) {
        result = result * 10 + parse_digit(*str++);
    }
    return result;
}
```

### Internal Linkage

```c
// Only visible in this file
static const int MAX_RETRIES = 3;
static void helper_function(void);

// Visible to other files (external linkage)
int public_function(void);
extern int shared_variable;
```

## Error Handling Across Files

### Error Codes

```c
// errors.h
typedef enum {
    ERR_OK = 0,
    ERR_NULL_PTR = -1,
    ERR_OUT_OF_MEMORY = -2,
    ERR_INVALID_ARG = -3,
    ERR_IO_FAILURE = -4
} ErrorCode;

const char* error_string(ErrorCode code);
```

### Per-Module Errors

```c
// network_errors.h
typedef enum {
    NET_OK = 0,
    NET_CONNECTION_FAILED = -100,
    NET_TIMEOUT = -101,
    NET_DNS_FAILURE = -102
} NetworkError;
```

## Initialization and Cleanup

### Module Init Pattern

```c
// database.h
int database_init(const char* connection_string);
void database_shutdown(void);
bool database_is_initialized(void);

// database.c
static bool initialized = false;
static Connection* conn = NULL;

int database_init(const char* connection_string) {
    if (initialized) return ERR_ALREADY_INITIALIZED;
    conn = connect(connection_string);
    if (!conn) return ERR_CONNECTION_FAILED;
    initialized = true;
    return ERR_OK;
}

void database_shutdown(void) {
    if (initialized) {
        disconnect(conn);
        conn = NULL;
        initialized = false;
    }
}
```

## Testing Multi-file Projects

### Test Organization

```c
// tests/test_math.c
#include "math.h"
#include <assert.h>

void test_vector_length(void) {
    Vector* v = vector_create(3.0, 4.0);
    assert(vector_length(v) == 5.0);
    vector_destroy(v);
}

int main(void) {
    test_vector_length();
    printf("All tests passed!\n");
    return 0;
}
```

### Building Tests

```makefile
test: test_math
	./test_math

test_math: tests/test_math.c src/math.c
	$(CC) $(CFLAGS) $^ -o $@ -lm
```

## Best Practices

1. **One module per concept** - Clear responsibilities
2. **Minimize public interface** - Hide implementation
3. **Use opaque pointers** - Prevent tight coupling
4. **Include guards always** - Prevent double inclusion
5. **Self-contained headers** - Include what you need
6. **Static for private** - File-scope encapsulation
7. **Consistent naming** - Prefix module functions

## Summary

Multi-file projects require:
- Clear directory structure
- Well-defined module interfaces
- Proper use of headers
- Static for encapsulation
- Consistent conventions

Good organization pays dividends as projects grow.
