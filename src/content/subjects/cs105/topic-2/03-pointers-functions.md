# Pointers and Functions

Pointers enable powerful function capabilities in C: modifying caller variables, returning multiple values, and passing large data structures efficiently. Understanding pass-by-reference is essential for effective C programming.

## Pass by Value vs Pass by Reference

C always passes arguments by value—functions receive copies:

```c
void tryToDouble(int x) {
    x = x * 2;  // Modifies local copy only
}

int main() {
    int num = 10;
    tryToDouble(num);
    printf("%d\n", num);  // Still 10!
    return 0;
}
```

To modify the original, pass its address (pass by reference):

```c
void actuallyDouble(int *x) {
    *x = *x * 2;  // Modifies value at the address
}

int main() {
    int num = 10;
    actuallyDouble(&num);  // Pass address
    printf("%d\n", num);   // Now 20!
    return 0;
}
```

## The Classic Swap Function

The swap function demonstrates pass-by-reference perfectly:

```c
// WRONG: Swaps copies, not originals
void badSwap(int a, int b) {
    int temp = a;
    a = b;
    b = temp;
}

// CORRECT: Swaps values at addresses
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 5, y = 10;

    badSwap(x, y);
    printf("x=%d, y=%d\n", x, y);  // x=5, y=10 (unchanged)

    swap(&x, &y);
    printf("x=%d, y=%d\n", x, y);  // x=10, y=5 (swapped!)

    return 0;
}
```

## Returning Multiple Values

C functions can only return one value, but pointers enable "returning" multiple:

```c
// Return min and max through pointers
void findMinMax(int arr[], int size, int *min, int *max) {
    *min = arr[0];
    *max = arr[0];

    for (int i = 1; i < size; i++) {
        if (arr[i] < *min) *min = arr[i];
        if (arr[i] > *max) *max = arr[i];
    }
}

int main() {
    int numbers[] = {5, 2, 8, 1, 9, 3};
    int minimum, maximum;

    findMinMax(numbers, 6, &minimum, &maximum);
    printf("Min: %d, Max: %d\n", minimum, maximum);  // Min: 1, Max: 9

    return 0;
}
```

## Modifying Arrays in Functions

Arrays are already passed as pointers, so modifications affect the original:

```c
void doubleElements(int *arr, int size) {
    for (int i = 0; i < size; i++) {
        arr[i] *= 2;  // Modifies original array
    }
}

int main() {
    int nums[] = {1, 2, 3, 4, 5};
    doubleElements(nums, 5);
    // nums is now {2, 4, 6, 8, 10}
    return 0;
}
```

## Returning Pointers from Functions

Functions can return pointers, but be careful about what you return:

```c
// DANGEROUS: Returns pointer to local variable
int* badFunction() {
    int x = 42;
    return &x;  // x is destroyed when function returns!
}

// SAFE: Returns pointer to static variable
int* getCounter() {
    static int count = 0;
    count++;
    return &count;
}

// SAFE: Returns pointer to dynamically allocated memory
int* createArray(int size) {
    int *arr = malloc(size * sizeof(int));
    return arr;  // Caller must free this!
}

// SAFE: Returns pointer passed as argument
int* findElement(int *arr, int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            return &arr[i];
        }
    }
    return NULL;
}
```

**Golden Rule**: Never return a pointer to a local variable.

## const Pointers

Use `const` to indicate what shouldn't be modified:

```c
// Can't modify the string contents
void printString(const char *str) {
    // str[0] = 'X';  // ERROR: can't modify
    printf("%s\n", str);  // OK: reading is fine
}

// Can't modify the pointer itself
void process(int *const ptr) {
    *ptr = 100;  // OK: can modify value
    // ptr++;    // ERROR: can't modify pointer
}

// Can't modify either
void readOnly(const int *const ptr) {
    // *ptr = 5;   // ERROR
    // ptr++;      // ERROR
    printf("%d\n", *ptr);  // OK
}
```

Best practice: Use `const` for pointers you don't intend to modify through.

## Input/Output Parameters

A common pattern is using output parameters:

```c
// Returns success/failure, outputs value through pointer
int parseInt(const char *str, int *result) {
    if (str == NULL || *str == '\0') {
        return 0;  // Failure
    }

    *result = 0;
    int sign = 1;

    if (*str == '-') {
        sign = -1;
        str++;
    }

    while (*str >= '0' && *str <= '9') {
        *result = *result * 10 + (*str - '0');
        str++;
    }

    *result *= sign;
    return 1;  // Success
}

int main() {
    int value;
    if (parseInt("-123", &value)) {
        printf("Parsed: %d\n", value);  // -123
    }
    return 0;
}
```

## Arrays of Pointers as Parameters

For processing multiple strings:

```c
void printStrings(char *strings[], int count) {
    for (int i = 0; i < count; i++) {
        printf("%s\n", strings[i]);
    }
}

int main() {
    char *names[] = {"Alice", "Bob", "Charlie"};
    printStrings(names, 3);
    return 0;
}
```

## Modifying Pointers in Functions

To modify a pointer itself (not what it points to), use a pointer to pointer:

```c
void allocateArray(int **ptr, int size) {
    *ptr = malloc(size * sizeof(int));
}

int main() {
    int *arr = NULL;
    allocateArray(&arr, 10);  // arr now points to allocated memory

    // Use arr...

    free(arr);
    return 0;
}
```

## Common Patterns

**Error handling with output parameter:**
```c
int divide(int a, int b, int *result) {
    if (b == 0) {
        return -1;  // Error code
    }
    *result = a / b;
    return 0;  // Success
}
```

**Chained modification:**
```c
void increment(int *value) {
    (*value)++;
}

void incrementTwice(int *value) {
    increment(value);
    increment(value);
}
```

## Key Takeaways

- Pass pointers to modify variables in the caller's scope
- Arrays naturally decay to pointers when passed to functions
- Never return pointers to local (automatic) variables
- Use `const` to document and enforce read-only access
- Output parameters enable "returning" multiple values
- Use pointer-to-pointer to modify a pointer in a function

Pointers and functions together form the foundation for building complex data structures and efficient programs. Next, we'll explore pointer pitfalls and common bugs.
