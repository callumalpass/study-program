# Functions

Functions are the building blocks of modular C programs. They allow you to break complex problems into smaller, manageable pieces that can be developed, tested, and reused independently.

## Function Basics

A function has four parts: return type, name, parameters, and body:

```c
returnType functionName(parameterList) {
    // Function body
    return value;  // if returnType is not void
}
```

Example:

```c
int add(int a, int b) {
    return a + b;
}

// Usage
int result = add(5, 3);  // result = 8
```

## Function Declaration vs Definition

A **declaration** (prototype) tells the compiler a function exists:

```c
int add(int a, int b);  // Declaration only
```

A **definition** provides the actual implementation:

```c
int add(int a, int b) {  // Definition
    return a + b;
}
```

Place declarations at the top of your file or in header files:

```c
#include <stdio.h>

// Function declarations (prototypes)
int add(int a, int b);
void greet(char *name);
double calculateArea(double radius);

int main() {
    int sum = add(5, 3);
    greet("Alice");
    double area = calculateArea(2.5);
    return 0;
}

// Function definitions
int add(int a, int b) {
    return a + b;
}

void greet(char *name) {
    printf("Hello, %s!\n", name);
}

double calculateArea(double radius) {
    return 3.14159 * radius * radius;
}
```

## Return Types

Functions can return any type, or `void` for no return:

```c
int getMax(int a, int b) {
    return (a > b) ? a : b;
}

double average(int arr[], int size) {
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += arr[i];
    }
    return (double)sum / size;
}

void printMessage(char *msg) {  // void = no return value
    printf("%s\n", msg);
    // No return statement needed (but "return;" is valid)
}
```

**Early Return**: Functions can return at any point:

```c
int findIndex(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            return i;  // Found - return early
        }
    }
    return -1;  // Not found
}
```

## Parameters and Arguments

**Parameters** are variables in the function definition. **Arguments** are values passed when calling:

```c
// x and y are parameters
int multiply(int x, int y) {
    return x * y;
}

// 5 and 3 are arguments
int product = multiply(5, 3);
```

**Pass by Value**: C passes arguments by value—functions receive copies:

```c
void tryToModify(int x) {
    x = 100;  // Modifies local copy only
}

int main() {
    int num = 5;
    tryToModify(num);
    printf("%d\n", num);  // Still 5!
    return 0;
}
```

To modify the original, pass a pointer (covered in Topic 2):

```c
void actuallyModify(int *x) {
    *x = 100;  // Modifies original
}

int main() {
    int num = 5;
    actuallyModify(&num);
    printf("%d\n", num);  // Now 100
    return 0;
}
```

## Arrays as Parameters

Arrays decay to pointers when passed to functions:

```c
// These are equivalent:
void processArray(int arr[], int size);
void processArray(int *arr, int size);

// You MUST pass the size separately
void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int main() {
    int numbers[] = {1, 2, 3, 4, 5};
    printArray(numbers, 5);
    return 0;
}
```

Arrays can be modified inside functions (they're passed as pointers):

```c
void doubleElements(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        arr[i] *= 2;  // Modifies original array
    }
}
```

## Local and Global Variables

**Local variables** exist only within their function:

```c
void func() {
    int local = 10;  // Created when func() is called
    // ...
}  // Destroyed when func() returns
```

**Global variables** exist throughout program execution:

```c
int globalCounter = 0;  // Global - accessible everywhere

void increment() {
    globalCounter++;  // Can access global
}

int main() {
    increment();
    printf("%d\n", globalCounter);  // 1
    return 0;
}
```

**Best Practice**: Minimize global variables. They make code harder to understand and debug.

## Static Variables

Static local variables persist between function calls:

```c
void countCalls() {
    static int count = 0;  // Initialized once, persists
    count++;
    printf("Called %d times\n", count);
}

int main() {
    countCalls();  // Called 1 times
    countCalls();  // Called 2 times
    countCalls();  // Called 3 times
    return 0;
}
```

## Recursion

Functions can call themselves:

```c
// Factorial: n! = n * (n-1) * ... * 1
int factorial(int n) {
    if (n <= 1) {         // Base case
        return 1;
    }
    return n * factorial(n - 1);  // Recursive case
}

// factorial(5) = 5 * factorial(4)
//              = 5 * 4 * factorial(3)
//              = 5 * 4 * 3 * factorial(2)
//              = 5 * 4 * 3 * 2 * factorial(1)
//              = 5 * 4 * 3 * 2 * 1 = 120
```

Every recursive function needs:
1. **Base case**: Condition that stops recursion
2. **Recursive case**: Calls itself with a simpler problem

```c
// Fibonacci sequence
int fibonacci(int n) {
    if (n <= 0) return 0;     // Base case
    if (n == 1) return 1;     // Base case
    return fibonacci(n - 1) + fibonacci(n - 2);  // Recursive
}
```

**Warning**: Recursion can be inefficient. The above Fibonacci has exponential time complexity. Use iteration or memoization for performance-critical code.

## Function Design Principles

**Single Responsibility**: Each function should do one thing well:

```c
// BAD: Does too much
void processData(int data[], int size) {
    // Read from file
    // Validate data
    // Calculate statistics
    // Write to output
    // Send email notification
}

// GOOD: Separate concerns
void readData(int data[], int *size);
int validateData(int data[], int size);
double calculateMean(int data[], int size);
void writeResults(double mean);
```

**Meaningful Names**: Function names should describe what they do:

```c
// BAD
int f(int a[], int n);
void process(char *s);

// GOOD
int findMaximum(int arr[], int size);
void convertToUppercase(char *str);
```

**Keep Functions Short**: If a function is too long, split it up.

## Key Takeaways

- Functions encapsulate reusable blocks of code
- Declare functions before use (prototypes at top)
- C passes arguments by value—use pointers to modify originals
- Arrays decay to pointers when passed to functions
- Minimize global variables; prefer passing parameters
- Static variables persist between function calls
- Recursion needs base cases to terminate
- Design functions to do one thing well

Functions are essential for writing maintainable code. In the next section, we'll explore arrays and strings—fundamental data structures in C.
