# Type Qualifiers

Type qualifiers modify how variables can be accessed and help compilers optimize code. The three main qualifiers are `const`, `volatile`, and `restrict`.

## The const Qualifier

### Basic Usage

`const` indicates a value that shouldn't be modified:

```c
const int MAX_SIZE = 100;
// MAX_SIZE = 200;  // Error: cannot modify const

const double PI = 3.14159265358979;
```

### const with Pointers

There are three combinations:

```c
// 1. Pointer to const data (data is read-only)
const int* ptr1;
int const* ptr2;  // Same as ptr1

int x = 10;
ptr1 = &x;
// *ptr1 = 20;  // Error: can't modify data through ptr1
ptr1 = &y;     // OK: can change what ptr1 points to

// 2. const pointer (pointer is read-only)
int* const ptr3 = &x;
*ptr3 = 20;    // OK: can modify data
// ptr3 = &y;  // Error: can't change ptr3

// 3. const pointer to const data (both read-only)
const int* const ptr4 = &x;
// *ptr4 = 20; // Error
// ptr4 = &y;  // Error
```

### Reading Pointer Declarations

Read right-to-left:

```c
const int* p;      // p is pointer to int that is const
int* const p;      // p is const pointer to int
const int* const p; // p is const pointer to int that is const
```

### const Parameters

Indicate function won't modify arguments:

```c
// Promise not to modify the string
size_t strlen(const char* str);

// Promise not to modify the array
void print_array(const int* arr, size_t len) {
    for (size_t i = 0; i < len; i++) {
        printf("%d ", arr[i]);
    }
}
```

### const Return Values

```c
const char* get_error_message(int code) {
    static const char* messages[] = {
        "Success",
        "Invalid argument",
        "Out of memory"
    };
    return messages[code];
}

const char* msg = get_error_message(1);
// msg[0] = 'i';  // Error: can't modify
```

### Casting Away const

Possible but dangerous:

```c
const int x = 10;
int* ptr = (int*)&x;
*ptr = 20;  // Undefined behavior!
```

## The volatile Qualifier

### Purpose

`volatile` tells the compiler a variable may change unexpectedly:
- Hardware registers
- Variables modified by signal handlers
- Variables shared between threads (with caveats)

### Memory-Mapped I/O

```c
// Hardware register at fixed address
volatile uint32_t* const STATUS_REG = (uint32_t*)0x40000000;

// Wait for device ready
while (!(*STATUS_REG & READY_BIT)) {
    // Without volatile, compiler might optimize this to infinite loop
}
```

### Signal Handlers

```c
volatile sig_atomic_t signal_received = 0;

void handler(int sig) {
    signal_received = 1;
}

int main() {
    signal(SIGINT, handler);

    while (!signal_received) {
        // Without volatile, loop might not see the change
        do_work();
    }

    return 0;
}
```

### What volatile Does NOT Do

`volatile` does NOT provide:
- Atomicity
- Memory barriers
- Thread safety

```c
// WRONG: volatile is not enough for thread safety
volatile int counter = 0;

// Thread 1
counter++;  // Not atomic!

// Thread 2
counter++;  // Race condition!

// CORRECT: use atomic types or mutexes
#include <stdatomic.h>
atomic_int counter = 0;
atomic_fetch_add(&counter, 1);  // Thread-safe
```

## The restrict Qualifier

### Purpose

`restrict` (C99) promises that a pointer is the only way to access its data:

```c
void copy(int* restrict dest, const int* restrict src, size_t n) {
    // Compiler knows dest and src don't overlap
    for (size_t i = 0; i < n; i++) {
        dest[i] = src[i];
    }
}
```

### Optimization Benefits

Without restrict:
```c
void add_arrays(int* a, int* b, int* c, int n) {
    for (int i = 0; i < n; i++) {
        a[i] = b[i] + c[i];
        // Compiler must reload b[i] and c[i] each iteration
        // because 'a' might alias 'b' or 'c'
    }
}
```

With restrict:
```c
void add_arrays(int* restrict a, int* restrict b, int* restrict c, int n) {
    for (int i = 0; i < n; i++) {
        a[i] = b[i] + c[i];
        // Compiler can optimize freely - no aliasing possible
    }
}
```

### memcpy vs memmove

```c
// memcpy uses restrict - assumes no overlap
void* memcpy(void* restrict dest, const void* restrict src, size_t n);

// memmove handles overlap - no restrict
void* memmove(void* dest, const void* src, size_t n);
```

### Violating restrict

```c
int arr[10];
copy(arr, arr + 5, 5);  // OK: no overlap

copy(arr, arr + 2, 5);  // Undefined behavior!
// Despite restrict promise, pointers overlap
```

## Combining Qualifiers

### const volatile

For read-only hardware registers:

```c
// Hardware status register - read-only, may change
const volatile uint32_t* STATUS = (uint32_t*)0x40000000;

uint32_t status = *STATUS;  // Can read
// *STATUS = 0;  // Error: const prevents writing
```

### Multiple Qualifiers

```c
// Constant pointer to volatile data
volatile int* const ptr = (int*)0x40000000;
*ptr = 10;    // OK: data is modifiable
// ptr = &x;  // Error: pointer is const
```

## _Atomic Qualifier (C11)

### Atomic Operations

```c
#include <stdatomic.h>

_Atomic int counter = 0;

// Or using typedef
atomic_int counter2 = 0;

// Thread-safe operations
atomic_fetch_add(&counter, 1);
int value = atomic_load(&counter);
atomic_store(&counter, 0);
```

## Best Practices

### Use const Liberally

```c
// Parameters you won't modify
void process(const Data* data);

// Return values that shouldn't be modified
const char* get_name(void);

// Local variables that shouldn't change
const int buffer_size = calculate_size();
```

### Use volatile Sparingly

Only use volatile for:
- Memory-mapped hardware
- Signal handlers
- setjmp/longjmp scenarios

### Use restrict for Performance

```c
// High-performance numeric code
void matrix_multiply(double* restrict C,
                     const double* restrict A,
                     const double* restrict B,
                     int n);
```

## Summary

Type qualifiers provide:
- `const` - Compile-time immutability
- `volatile` - Prevent optimization for external changes
- `restrict` - Enable aliasing optimizations
- `_Atomic` - Thread-safe atomic operations

Use them appropriately to write safer, faster code.
