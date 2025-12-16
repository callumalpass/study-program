# Pointer Pitfalls and Common Bugs

Pointers are powerful but dangerous. Many of C's notorious bugs—crashes, security vulnerabilities, and mysterious behavior—stem from pointer misuse. Understanding these pitfalls helps you write safer code.

## Uninitialized Pointers

Using a pointer before initializing it is undefined behavior:

```c
int *ptr;              // Contains garbage address
*ptr = 10;             // CRASH or corruption!
printf("%d\n", *ptr);  // CRASH or garbage!
```

**Prevention**: Always initialize pointers:

```c
int *ptr = NULL;       // Safe initial value
int x;
int *ptr2 = &x;        // Points to valid memory
```

## Null Pointer Dereference

Accessing memory through a NULL pointer crashes your program:

```c
int *ptr = NULL;
*ptr = 5;        // CRASH! Segmentation fault

// Real-world example
int *findValue(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) return &arr[i];
    }
    return NULL;  // Not found
}

int main() {
    int nums[] = {1, 2, 3};
    int *result = findValue(nums, 3, 99);
    printf("%d\n", *result);  // CRASH if 99 not found!
    return 0;
}
```

**Prevention**: Always check for NULL:

```c
int *result = findValue(nums, 3, 99);
if (result != NULL) {
    printf("%d\n", *result);
} else {
    printf("Not found\n");
}
```

## Dangling Pointers

A dangling pointer points to memory that has been freed or is no longer valid:

```c
// After free
int *ptr = malloc(sizeof(int));
*ptr = 42;
free(ptr);
// ptr still holds the address, but memory is freed
*ptr = 100;  // UNDEFINED BEHAVIOR! Use-after-free

// After scope exit
int* createDangling() {
    int local = 42;
    return &local;  // local destroyed on return
}

int *ptr = createDangling();
printf("%d\n", *ptr);  // UNDEFINED! May work, may crash
```

**Prevention**:
```c
free(ptr);
ptr = NULL;  // Mark as invalid

// Or use static/heap memory for returned pointers
static int value = 42;  // Lives beyond function
return &value;
```

## Memory Leaks

Forgetting to free allocated memory causes leaks:

```c
void leaky() {
    int *ptr = malloc(1000);
    // ... use ptr ...
    return;  // Memory leaked! Never freed
}

// Called repeatedly = memory grows without bound
for (int i = 0; i < 1000000; i++) {
    leaky();  // Eventually exhausts memory
}
```

**Prevention**:
```c
void noLeak() {
    int *ptr = malloc(1000);
    if (ptr == NULL) return;
    // ... use ptr ...
    free(ptr);  // Always free what you allocate
}
```

## Buffer Overflow

Writing beyond array bounds corrupts memory:

```c
char buffer[10];
strcpy(buffer, "This string is way too long!");  // Overflow!

int arr[5];
arr[10] = 42;  // Writes to memory you don't own!
```

This is a major security vulnerability. **Prevention**:
```c
char buffer[10];
strncpy(buffer, input, sizeof(buffer) - 1);
buffer[sizeof(buffer) - 1] = '\0';  // Ensure null termination
```

## Double Free

Freeing the same memory twice causes undefined behavior:

```c
int *ptr = malloc(sizeof(int));
free(ptr);
free(ptr);  // UNDEFINED! May crash or corrupt heap
```

**Prevention**:
```c
free(ptr);
ptr = NULL;  // Now safe to "free" again (free(NULL) is valid)
```

## Type Confusion

Using wrong pointer types leads to misinterpretation:

```c
int x = 0x41424344;  // "DCBA" in ASCII
char *cp = (char*)&x;
printf("%c\n", *cp);  // Prints 'D' on little-endian

// Dangerous: treating int array as char array
int nums[4] = {1, 2, 3, 4};
char *str = (char*)nums;
printf("%s\n", str);  // Garbage or crash
```

## Pointer to Wrong Type

```c
double d = 3.14;
int *ip = (int*)&d;      // Treating double memory as int
printf("%d\n", *ip);     // Prints garbage (part of double's bits)

*ip = 42;                // Corrupts the double!
printf("%f\n", d);       // No longer 3.14
```

## Off-by-One Errors

Very common when iterating with pointers:

```c
int arr[5] = {1, 2, 3, 4, 5};

// WRONG: Goes one past the end
for (int *p = arr; p <= arr + 5; p++) {  // <= should be <
    printf("%d\n", *p);  // Last iteration reads garbage
}

// CORRECT
for (int *p = arr; p < arr + 5; p++) {
    printf("%d\n", *p);
}
```

## Increment/Dereference Confusion

Operator precedence can be tricky:

```c
int arr[] = {10, 20, 30};
int *p = arr;

// What does each expression mean?
*p++    // Returns *p, then increments p (postfix has higher precedence)
(*p)++  // Increments the value at p
++*p    // Increments value at p, returns new value
*++p    // Increments p, then dereferences
```

**Prevention**: Use parentheses to make intent clear:
```c
*(p++)   // Clearly: dereference, then increment pointer
(*p)++   // Clearly: increment the value
```

## Comparing Pointers Incorrectly

```c
char *str1 = "hello";
char *str2 = "hello";

// WRONG: Compares addresses, not contents
if (str1 == str2) {  // May or may not be true!
    printf("Equal\n");
}

// CORRECT: Compare contents
if (strcmp(str1, str2) == 0) {
    printf("Equal\n");
}
```

## Debugging Tips

**Use tools**:
- **Valgrind**: Detects memory leaks, invalid access, uninitialized values
- **AddressSanitizer**: Fast memory error detector (compile with -fsanitize=address)
- **Static analyzers**: Catch issues at compile time

**Defensive coding**:
```c
// Initialize everything
int *ptr = NULL;

// Check allocations
ptr = malloc(size);
if (ptr == NULL) {
    // Handle error
    return -1;
}

// Validate array bounds
if (index >= 0 && index < size) {
    arr[index] = value;
}

// Null after free
free(ptr);
ptr = NULL;

// Check parameters
void process(int *data, int size) {
    if (data == NULL || size <= 0) {
        return;  // Invalid input
    }
    // ...
}
```

## Key Takeaways

- Initialize all pointers (to NULL or valid address)
- Always check for NULL before dereferencing
- Set pointers to NULL after freeing
- Never return pointers to local variables
- Check array bounds religiously
- Use memory debugging tools (Valgrind, ASan)
- When in doubt, add explicit NULL checks and bounds checks

Understanding these pitfalls is the first step to avoiding them. In the next section, we'll explore advanced pointer techniques.
