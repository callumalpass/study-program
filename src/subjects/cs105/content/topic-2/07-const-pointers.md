---
id: cs105-t2-const
title: "Const and Pointers"
order: 7
---

# Const and Pointers

The `const` keyword with pointers creates different types of immutability. Understanding these distinctions is crucial for writing correct, safe C code and for reading library APIs.

## Four Types of Pointer Const-ness

### Non-const Pointer to Non-const Data

```c
int value = 10;
int* ptr = &value;

*ptr = 20;      // OK - can modify data
ptr = &other;   // OK - can change what ptr points to
```

This is the default: both the pointer and the data it points to can be modified.

### Pointer to Const Data (const int*)

```c
int value = 10;
const int* ptr = &value;  // or: int const* ptr

*ptr = 20;      // ERROR - cannot modify through ptr
ptr = &other;   // OK - can change what ptr points to

value = 20;     // OK - value itself isn't const
```

The pointer can be changed, but you cannot modify the data through this pointer. Note that `const int*` and `int const*` are equivalent.

### Const Pointer to Non-const Data (int* const)

```c
int value = 10;
int* const ptr = &value;

*ptr = 20;      // OK - can modify data
ptr = &other;   // ERROR - cannot change what ptr points to
```

The pointer itself cannot be changed, but you can modify the data it points to.

### Const Pointer to Const Data (const int* const)

```c
int value = 10;
const int* const ptr = &value;

*ptr = 20;      // ERROR - cannot modify data
ptr = &other;   // ERROR - cannot change pointer
```

Neither the pointer nor the data can be modified through this pointer.

## Reading Pointer Declarations

Read pointer declarations from right to left:

```c
int* ptr;               // ptr is a pointer to int
const int* ptr;         // ptr is a pointer to const int
int* const ptr;         // ptr is a const pointer to int
const int* const ptr;   // ptr is a const pointer to const int
```

The rule: `const` applies to what's immediately to its left (or right if nothing is to the left).

## Function Parameters

### Pointer to Const for Input Parameters

```c
// String length - doesn't modify string
size_t strlen(const char* s);

// Search - doesn't modify haystack
char* strstr(const char* haystack, const char* needle);

// Print array - doesn't modify it
void print_array(const int* arr, int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
}
```

Using `const` for input parameters:
- Documents intent (function won't modify data)
- Allows passing const data
- Enables compiler optimizations

### Non-const for Output Parameters

```c
// Modifies the buffer
size_t read_file(const char* filename, char* buffer, size_t size);

// Swaps values through pointers
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}
```

## Const Correctness

### Assigning Const to Non-const

```c
const int* cp = &value;
int* p = cp;  // WARNING: discards const qualifier

// This is dangerous because:
*p = 100;     // Modifies supposedly const data!
```

Compilers warn but don't error on this. Never ignore const warnings.

### Assigning Non-const to Const (Safe)

```c
int* p = &value;
const int* cp = p;  // OK - adding const is safe

// Now cp restricts access
*cp = 100;  // ERROR
*p = 100;   // Still OK through p
```

Adding const restrictions is always safe.

## Const in Structures

### Const Members

```c
typedef struct {
    int id;
    const char* name;  // Pointer to const string
} Record;

void print_record(const Record* r) {
    // r->name = "new";  // OK - changing pointer, not string
    // r->id = 5;        // ERROR - r is const
}
```

### Mutable Through Pointer

```c
typedef struct {
    int count;
    int* data;
} Container;

void access(const Container* c) {
    c->data[0] = 10;  // OK! data points to non-const
    // c->count = 5;  // ERROR - c is const
}
```

Even when the struct is const, data pointed to by members isn't.

## Cast Away Const (Dangerous)

```c
const int value = 42;
int* ptr = (int*)&value;  // Cast away const
*ptr = 100;               // UNDEFINED BEHAVIOR!
```

Modifying a truly const object is undefined behavior. The compiler may have optimized assuming it never changes.

```c
// Sometimes necessary for legacy APIs
void legacy_function(char* str);  // Doesn't modify, but not const

void wrapper(const char* str) {
    legacy_function((char*)str);  // Cast required
    // Only safe if legacy_function really doesn't modify
}
```

## Const with Arrays

### Array of Const Elements

```c
const int arr[5] = {1, 2, 3, 4, 5};
arr[0] = 10;  // ERROR - elements are const

// When passed to functions:
void func(const int arr[]);  // Array elements are const
void func(const int* arr);   // Equivalent
```

### Const Array (Fixed Address)

```c
int arr[5] = {1, 2, 3, 4, 5};
// arr = other_arr;  // ERROR - arrays can't be reassigned anyway
arr[0] = 10;         // OK

// This is already how arrays work in C
```

## Const in Return Values

### Returning Pointer to Const

```c
const char* get_error_message(int code) {
    switch (code) {
        case 1: return "File not found";
        case 2: return "Permission denied";
        default: return "Unknown error";
    }
}

// Caller can't modify the string (string literals are const)
const char* msg = get_error_message(1);
// msg[0] = 'x';  // ERROR
```

### Returning Const Pointer (Unusual)

```c
int* const get_buffer(void) {
    static int buffer[100];
    return buffer;
}

int* const buf = get_buffer();
buf[0] = 42;      // OK - data isn't const
// buf = other;   // ERROR - pointer is const
```

## Best Practices

### Use Const Liberally

```c
// Good: clearly shows intent
void process_data(const int* data, size_t n);
const char* get_name(const Person* p);

// Bad: unclear if data is modified
void process_data(int* data, size_t n);
```

### Const in Complex Declarations

```c
// Array of pointers to const char (string table)
const char* const messages[] = {
    "Error",
    "Warning",
    "Info"
};
// messages[0] = "x";    // ERROR - pointer is const
// messages[0][0] = 'x'; // ERROR - data is const

// Pointer to array of const int
const int (*ptr)[10];
```

## Summary

Const with pointers provides compile-time protection:
- `const int*` - can't modify data through pointer
- `int* const` - can't change what pointer points to
- `const int* const` - neither can be changed
- Use const for input parameters
- Never cast away const unless absolutely necessary
- Const correctness catches bugs at compile time
