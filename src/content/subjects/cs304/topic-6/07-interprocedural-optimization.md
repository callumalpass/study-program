# Interprocedural Optimization

Interprocedural optimization analyzes and transforms programs across function boundaries, considering the entire program rather than individual functions in isolation. While intraprocedural optimizations (operating within single functions) are valuable, many optimization opportunities only become visible when examining how functions interact. Interprocedural optimization is essential for extracting maximum performance from modern software.

## The Need for Interprocedural Analysis

Optimizing functions in isolation misses important opportunities:

```c
// Without interprocedural analysis
int square(int x) {
    return x * x;
}

int compute(int a) {
    int result = square(5);     // Argument is constant!
    return result + a;
}

// Intraprocedural optimization can't see that square always receives 5
// Interprocedural optimization can propagate this constant

// After interprocedural constant propagation and inlining
int compute(int a) {
    int result = 5 * 5;         // Constant folding
    return 25 + a;              // Further simplified
}
```

**Challenges**:
- **Scale**: Analyzing entire programs is computationally expensive
- **Separate Compilation**: Functions may be compiled separately, limiting available information
- **Dynamic Dispatch**: Virtual functions, function pointers complicate analysis
- **Libraries**: External library code may not be available for analysis

## Function Inlining

Function inlining replaces a function call with the function body, eliminating call overhead and exposing optimization opportunities.

**Basic Inlining**:

```c
// Before inlining
inline int add(int a, int b) {
    return a + b;
}

int compute(int x, int y) {
    int sum = add(x, y);
    return sum * 2;
}

// After inlining
int compute(int x, int y) {
    int sum = x + y;            // Function body substituted
    return sum * 2;             // Further optimization possible
}

// After local optimization
int compute(int x, int y) {
    return (x + y) * 2;         // More opportunities visible
}
```

**Benefits of Inlining**:
1. **Eliminate call overhead**: No function call instruction, stack frame setup, parameter passing
2. **Expose optimizations**: Caller context enables constant propagation, dead code elimination
3. **Better register allocation**: Variables from caller and callee can share registers
4. **Enable further inlining**: Inlined code may contain more inlining opportunities

**Costs of Inlining**:
1. **Code bloat**: Each call site gets a copy of the function body
2. **Instruction cache pressure**: Larger code may not fit in instruction cache
3. **Compilation time**: More code to analyze and optimize

**Inlining Heuristics**:

```c
// Good candidates for inlining
inline int max(int a, int b) {      // Small function
    return (a > b) ? a : b;
}

// Called once from single location
static int helper(int x) {
    return x * 2 + 1;
}
void caller() {
    int result = helper(5);         // Inline: no code size increase
}

// Poor candidates for inlining
void large_function() {
    // 200 lines of code
    // Many local variables
    // Complex control flow
}

void hot_path() {
    for (int i = 0; i < 1000000; i++) {
        large_function();           // Don't inline: massive code bloat
    }
}
```

**Common Heuristics**:
- Inline functions below a size threshold (e.g., 30 instructions)
- Inline functions called once (no code size increase)
- Inline functions in hot code paths (profile-guided)
- Don't inline recursive functions (unbounded growth)
- Inline more aggressively at higher optimization levels

**Recursive Inlining**:

```c
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// Partial inlining (one level)
int factorial(int n) {
    if (n <= 1) return 1;
    return n * (                        // First call inlined
        (n-1 <= 1) ? 1 : (n-1) * factorial(n-2)
    );
}
```

## Interprocedural Constant Propagation

Interprocedural constant propagation tracks constant values across function boundaries, enabling constant folding and dead code elimination.

```c
// Example
const int LIMIT = 100;

int check_limit(int value) {
    return value < LIMIT;           // LIMIT is constant
}

void process(int x) {
    if (check_limit(x)) {
        // ...
    }
}

// After interprocedural constant propagation
int check_limit(int value) {
    return value < 100;             // Constant propagated
}

void process(int x) {
    if (x < 100) {                  // After inlining
        // ...
    }
}
```

**Interprocedural Analysis Requirements**:
- Build call graph (who calls whom)
- Propagate constants along call edges
- Handle indirect calls conservatively
- Iterate until fixed point (for recursive call structures)

## Tail Call Optimization

A tail call is a function call that is the last operation before returning. Tail call optimization transforms tail calls into jumps, eliminating stack frame overhead.

**Tail Call Identification**:

```c
// Tail call - last operation is returning the call result
int factorial_tail(int n, int acc) {
    if (n <= 1) return acc;
    return factorial_tail(n - 1, n * acc);  // Tail call
}

// NOT a tail call - call result is used in computation
int factorial_not_tail(int n) {
    if (n <= 1) return 1;
    return n * factorial_not_tail(n - 1);   // Not tail: multiply after return
}
```

**Tail Call Optimization Transformation**:

```c
// Before optimization (recursive tail call)
int factorial_tail(int n, int acc) {
    if (n <= 1) return acc;
    return factorial_tail(n - 1, n * acc);
}

// After tail call optimization (converted to loop)
int factorial_tail(int n, int acc) {
    while (1) {
        if (n <= 1) return acc;
        int new_n = n - 1;
        int new_acc = n * acc;
        n = new_n;              // Update parameters
        acc = new_acc;
        // Jump to beginning (no new stack frame)
    }
}
```

**Benefits**:
- **Constant stack space**: No stack growth for recursive tail calls
- **Performance**: Jump is faster than call/return
- **Enables functional programming patterns**: Tail recursion is as efficient as loops

**Tail Call Variants**:

```c
// Tail recursion (same function)
void countdown(int n) {
    if (n == 0) return;
    printf("%d\n", n);
    countdown(n - 1);           // Tail recursive
}

// Tail call to different function
int even(int n);
int odd(int n);

int even(int n) {
    if (n == 0) return 1;
    return odd(n - 1);          // Tail call to different function
}

int odd(int n) {
    if (n == 0) return 0;
    return even(n - 1);         // Mutually recursive tail call
}
```

## Cloning and Specialization

Function cloning creates specialized versions of functions for specific calling contexts, enabling more aggressive optimization.

```c
// Original function
int compute(int x, int mode) {
    if (mode == 0) {
        return x * 2;
    } else {
        return x * 3;
    }
}

void caller1() {
    int result = compute(value, 0);     // Always mode == 0
}

void caller2() {
    int result = compute(value, 1);     // Always mode == 1
}

// After cloning and specialization
int compute_mode0(int x) {              // Specialized for mode == 0
    return x * 2;
}

int compute_mode1(int x) {              // Specialized for mode == 1
    return x * 3;
}

void caller1() {
    int result = compute_mode0(value);  // Call specialized version
}

void caller2() {
    int result = compute_mode1(value);  // Call specialized version
}
```

**When to Clone**:
- Parameter values are constant or have limited range at call sites
- Different call sites have different optimization opportunities
- Benefits outweigh code size increase

## Interprocedural Dead Code Elimination

Identifies and removes functions, parameters, and return values that are never used.

**Dead Function Elimination**:

```c
// Function never called
static void unused_helper() {
    // ...
}

static void used_function() {
    // Does not call unused_helper
}

// After analysis: unused_helper is removed
```

**Dead Parameter Elimination**:

```c
// Before
int compute(int x, int y, int z) {
    return x + y;               // z is never used
}

void caller() {
    int result = compute(1, 2, expensive_computation());
}

// After dead parameter elimination
int compute(int x, int y) {     // z parameter removed
    return x + y;
}

void caller() {
    int result = compute(1, 2); // No longer computes third argument
}
```

**Dead Return Value Elimination**:

```c
// Before
int compute(int x) {
    printf("Computing\n");
    return x * 2;               // Return value unused by all callers
}

void caller() {
    compute(5);                 // Result not used
}

// After optimization (converted to void)
void compute(int x) {
    printf("Computing\n");      // Side effect preserved
    // Return removed
}

void caller() {
    compute(5);
}
```

## Whole Program Optimization and Link-Time Optimization (LTO)

Whole program optimization analyzes the entire program together, rather than compiling files separately.

**Traditional Separate Compilation**:
```
file1.c → compile → file1.o
file2.c → compile → file2.o
file3.c → compile → file3.o
file1.o + file2.o + file3.o → link → executable
```

Optimizations limited to each file individually.

**Link-Time Optimization**:
```
file1.c → compile → file1.bc (intermediate representation)
file2.c → compile → file2.bc
file3.c → compile → file3.bc
file1.bc + file2.bc + file3.bc → optimize → link → executable
```

All code visible to optimizer at link time.

**LTO Capabilities**:

```c
// file1.c
int helper(int x) {
    return x * 2;
}

// file2.c
extern int helper(int x);

int main() {
    return helper(5);           // With LTO: can inline across files
}

// After LTO
int main() {
    return 5 * 2;               // Inlined and constant folded
}
```

**Trade-offs**:
- **Pros**: Maximum optimization opportunities, better inlining decisions, more dead code eliminated
- **Cons**: Longer link times, higher memory usage, build system complexity

## Interprocedural Alias Analysis

Determines what memory locations functions may read or modify, enabling more aggressive optimization.

**Mod-Ref Analysis**: Computes which variables each function may modify (Mod) or reference (Ref).

```c
int global_x;
int global_y;

void foo() {
    global_x = 5;               // Modifies global_x
}

void bar() {
    int temp = global_y;        // References global_y
}

void caller() {
    int local_x = global_x;
    foo();                      // May modify global_x
    int local_y = global_x;     // Must reload (may have changed)
    bar();                      // Doesn't modify global_x
    int local_z = global_x;     // Can reuse local_y (no modification)
}
```

**Escape Analysis**: Determines whether pointers to local variables escape the function (passed to other functions, stored in globals, returned).

```c
// Pointer escapes
int* returns_escape() {
    int local = 5;
    return &local;              // Escapes via return (dangling pointer!)
}

// Pointer doesn't escape
void no_escape() {
    int local = 5;
    int* p = &local;
    *p = 10;                    // Local only, can optimize aggressively
}

// Benefits of knowing pointer doesn't escape:
// - Can promote to register
// - Can eliminate loads/stores
// - Can reorder operations more freely
```

## Devirtualization

Devirtualization optimizes virtual function calls by determining the exact target function, enabling inlining.

```cpp
class Base {
public:
    virtual int compute(int x) { return x; }
};

class Derived : public Base {
public:
    int compute(int x) override { return x * 2; }
};

void process(Base* obj) {
    int result = obj->compute(5);   // Virtual call
}

// If interprocedural analysis determines obj is always Derived*
void process(Base* obj) {
    int result = 10;                // Devirtualized, inlined, constant folded
}
```

**Class Hierarchy Analysis (CHA)**: Uses type hierarchy to narrow possible targets.

**Rapid Type Analysis (RTA)**: Considers only classes actually instantiated.

## Profile-Guided Optimization (PGO)

Uses runtime profiling data to guide interprocedural decisions.

**Process**:
1. Compile with instrumentation
2. Run program on representative inputs
3. Collect profile data (call frequencies, branch probabilities)
4. Recompile using profile data to guide optimizations

**PGO-Guided Inlining**:

```c
void hot_function() {
    small_helper();             // Called 1,000,000 times (profile data)
}

void cold_function() {
    another_helper();           // Called 10 times (profile data)
}

// PGO inlines small_helper (hot path) but not another_helper (cold path)
```

**Benefits**:
- Better inlining decisions (inline hot paths)
- Better code layout (put hot code together)
- Better branch prediction hints

## Key Takeaways

- Interprocedural optimization analyzes and transforms programs across function boundaries, exposing opportunities invisible to intraprocedural analysis.
- Function inlining eliminates call overhead and enables further optimizations but must balance performance gains against code size increases.
- Interprocedural constant propagation tracks constant values across calls, enabling constant folding and dead code elimination across the program.
- Tail call optimization converts tail-recursive calls to loops, enabling constant stack space and better performance.
- Function cloning creates specialized versions for different calling contexts, trading code size for optimization opportunities.
- Dead code elimination at interprocedural scope removes unused functions, parameters, and return values.
- Link-Time Optimization (LTO) performs whole-program analysis at link time, maximizing optimization opportunities across translation units.
- Escape analysis determines pointer scope, enabling more aggressive optimizations for non-escaping values.
- Profile-Guided Optimization uses runtime data to make better optimization decisions, especially for inlining and code layout.
