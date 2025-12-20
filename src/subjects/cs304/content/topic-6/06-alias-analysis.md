# Alias Analysis

Alias analysis is a fundamental compiler analysis that determines whether two pointer expressions or references may refer to the same memory location. In languages with pointers, references, or dynamic memory allocation, alias analysis is essential for enabling optimizations—without it, the compiler must conservatively assume that any pointer dereference might affect any memory location, severely limiting optimization opportunities.

## The Aliasing Problem

Aliasing occurs when multiple pointer expressions or references can access the same memory location. This creates challenges for optimization because the compiler must ensure that transformations don't change program behavior when memory is accessed through different names.

```c
// Simple aliasing example
int x = 5;
int *p = &x;
int *q = &x;    // p and q are aliases (point to same location)

*p = 10;        // Modifies x through p
int y = *q;     // Reads x through q (y = 10)

// Without alias analysis, compiler cannot determine that *q reads
// the value written to *p
```

**Why Aliasing Matters for Optimization**:

```c
// Example showing optimization opportunity
void foo(int *a, int *b, int *c) {
    *a = 1;
    *b = 2;
    *c = *a;    // Can we optimize *c = 1?
}

// If a and b might alias, then *a might have value 2 at the third line
// If we can prove a and b don't alias, we can optimize to *c = 1
```

Without alias information, compilers must assume the worst case:

```c
// Conservative assumption without alias analysis
int compute(int *p, int *q) {
    int x = *p;     // Load from p
    *q = 10;        // Store to q (might modify *p if p and q alias!)
    return x + *p;  // Must reload from p (can't reuse x)
}

// With alias analysis proving p and q don't alias
int compute(int *p, int *q) {
    int x = *p;     // Load from p
    *q = 10;        // Store to q (doesn't affect *p)
    return x + x;   // Can reuse x (optimized to 2*x)
}
```

## May-Alias vs Must-Alias

Alias analysis distinguishes between different degrees of aliasing certainty:

**May-Alias**: Two pointers may refer to the same location—there exists some program path or input where they alias. This is a conservative approximation.

**Must-Alias**: Two pointers definitely refer to the same location on all program paths. This is a stronger property.

**No-Alias (Must-Not-Alias)**: Two pointers definitely refer to different locations on all program paths.

```c
// May-alias example
void example1(int *p, int *q) {
    // p and q may alias (no information about calling context)
    *p = 1;
    *q = 2;
    // Cannot assume *p still equals 1
}

// Must-alias example
void example2(int *p) {
    int *q = p;     // q must alias p
    *p = 1;
    *q = 2;
    // We know *p equals 2 (q and p are same location)
}

// Must-not-alias example
void example3(void) {
    int a, b;
    int *p = &a;
    int *q = &b;    // p and q must not alias (different local variables)
    *p = 1;
    *q = 2;
    // We know *p still equals 1
}
```

## Address-Taken Analysis

The simplest form of alias analysis determines which variables have their addresses taken. Variables whose addresses are never taken cannot be aliased through pointers.

```c
int x = 5;      // Address not taken - cannot be aliased
int y = 10;
int *p = &y;    // y's address is taken - may be aliased

x = 20;         // Compiler knows only x is affected
*p = 30;        // May affect any address-taken variable
```

**Algorithm**:
1. Scan the program for all address-of operations (&variable)
2. Mark those variables as "address-taken"
3. Variables not marked can only be accessed directly (not through pointers)

**Optimization Impact**:

```c
void foo(int *ptr) {
    int local1 = 0;     // Address never taken
    int local2 = 5;     // Address taken below
    int *p = &local2;

    *ptr = 1;           // May affect local2, but NOT local1
    local1++;           // Can optimize: compiler knows local1 not affected
}
```

## Type-Based Alias Analysis (TBAA)

Type-Based Alias Analysis uses type information to determine that pointers of incompatible types cannot alias. This relies on type-based aliasing rules in languages like C and C++.

**C/C++ Aliasing Rules**: A pointer of type T* cannot alias a pointer of type U* unless:
- T and U are compatible types
- One type is a character type (char, unsigned char, etc.)
- One type is void*

```c
void foo(int *p, float *q) {
    // TBAA: int* and float* cannot alias
    *p = 42;
    *q = 3.14f;
    // Compiler knows *p still equals 42
}

void bar(int *p, char *q) {
    // char* CAN alias anything (exception to rule)
    *p = 42;
    *q = 100;
    // Must assume *p might be modified
}

// Struct field analysis
struct A { int x; };
struct B { int y; };

void baz(struct A *a, struct B *b) {
    // TBAA: struct A* and struct B* cannot alias
    a->x = 10;
    b->y = 20;
    // Compiler knows a->x still equals 10
}
```

**Limitations**: Type punning and casts can violate these assumptions:

```c
// Type punning (undefined behavior in C/C++, but possible)
int x = 42;
float y = *(float*)&x;  // Violates type-based aliasing rules

// Compilers often provide flags to disable TBAA optimizations
// if code relies on type punning: -fno-strict-aliasing in GCC
```

## Flow-Sensitive vs Flow-Insensitive Analysis

**Flow-Insensitive Analysis**: Computes a single alias set for the entire function, ignoring control flow and statement order.

```c
// Flow-insensitive analysis
void foo(int *p) {
    int x;
    int *q;

    q = &x;         // q aliases x (for entire function)
    *q = 5;

    q = p;          // q also aliases p (for entire function)
    *q = 10;

    // Flow-insensitive: q may alias both x and p everywhere
}
```

**Flow-Sensitive Analysis**: Distinguishes different program points, tracking how alias relationships change.

```c
// Flow-sensitive analysis
void foo(int *p) {
    int x;
    int *q;

    q = &x;         // At this point: q aliases x only
    *q = 5;         // Affects x

    q = p;          // Now: q aliases p only (not x anymore)
    *q = 10;        // Affects p (not x)

    // Flow-sensitive: knows q aliases different things at different points
}
```

Flow-sensitive analysis is more precise but more expensive.

## Points-To Analysis

Points-to analysis computes, for each pointer variable, the set of memory locations (or abstract locations) that the pointer may point to.

**Representation**: For each pointer p, compute pts(p) = set of possible pointees.

```c
int x, y;
int *p, *q;

p = &x;         // pts(p) = {x}
q = &y;         // pts(q) = {y}

if (condition) {
    p = &y;     // pts(p) = {x, y} (after merge)
}

q = p;          // pts(q) = pts(p) = {x, y}
```

**Anderson's Analysis (Inclusion-Based)**:

Represents pointer assignments as set constraints:
- `p = &x` generates constraint: `{x} ⊆ pts(p)`
- `p = q` generates constraint: `pts(q) ⊆ pts(p)`
- `p = *q` generates constraint: `∀o ∈ pts(q), pts(o) ⊆ pts(p)`
- `*p = q` generates constraint: `∀o ∈ pts(p), pts(q) ⊆ pts(o)`

Solve constraints iteratively until fixed point.

**Steensgaard's Analysis (Unification-Based)**:

More efficient but less precise. Treats pointer assignments as equalities rather than inclusions:
- `p = q` generates constraint: `pts(p) = pts(q)` (unify points-to sets)

```c
int a, b, c;
int *p, *q, *r;

p = &a;         // pts(p) = {a}
q = &b;         // pts(q) = {b}
r = p;          // pts(r) = pts(p) = {a}

// Anderson's: pts(p) = {a}, pts(q) = {b}, pts(r) = {a}

p = q;          // Anderson's: pts(p) = {a, b}
                // Steensgaard's: unify pts(p), pts(q), pts(r) = {a, b}

// Anderson's (more precise): pts(p) = {a, b}, pts(q) = {b}, pts(r) = {a}
// Steensgaard's (less precise): pts(p) = pts(q) = pts(r) = {a, b}
```

## Context-Sensitive Analysis

Context-sensitive analysis distinguishes between different calling contexts of a function, providing more precision for interprocedural analysis.

```c
int global;

void store(int *p, int value) {
    *p = value;
}

void caller1() {
    int x;
    store(&x, 10);      // In this context, p points to x
}

void caller2() {
    int y;
    store(&y, 20);      // In this context, p points to y
}

// Context-insensitive: pts(p in store) = {x, y}
// Context-sensitive:
//   - In caller1 context: pts(p) = {x}
//   - In caller2 context: pts(p) = {y}
```

**Call String Approach**: Distinguish contexts by call stack (sequence of call sites).

**Cloning**: Create specialized copies of functions for different contexts.

## Field-Sensitive Analysis

Field-sensitive analysis distinguishes between different fields of structures, providing more precision for structure types.

```c
struct Point {
    int x;
    int y;
};

struct Point p;
int *px = &p.x;
int *py = &p.y;

*px = 10;
*py = 20;

// Field-insensitive: px and py both point to p (may alias)
// Field-sensitive: px points to p.x, py points to p.y (don't alias)
```

## Heap Analysis

Heap analysis extends points-to analysis to handle dynamically allocated memory, typically by creating abstract locations representing allocation sites.

```c
int *p = malloc(sizeof(int));   // Allocsite 1
int *q = malloc(sizeof(int));   // Allocsite 2

// Abstract locations: h1 (allocsite 1), h2 (allocsite 2)
// pts(p) = {h1}
// pts(q) = {h2}

int *r;
if (condition) {
    r = p;      // pts(r) = {h1}
} else {
    r = q;      // pts(r) = {h2}
}
// pts(r) = {h1, h2} after merge
```

**Allocation-Site Abstraction**: Each allocation site represents all objects allocated there.

```c
for (int i = 0; i < n; i++) {
    int *p = malloc(sizeof(int));   // Same allocsite for all iterations
}
// All allocations map to single abstract location (imprecise but scalable)
```

## Practical Alias Analysis

Real compilers use combinations of techniques:

**GCC**: Uses points-to analysis with various refinements, including:
- Type-based analysis (TBAA)
- Escape analysis (determining if pointers escape function scope)
- Mod-ref analysis (what memory each function may modify or reference)

**LLVM**: Provides multiple alias analysis passes:
- BasicAA: Type-based, local reasoning
- TBAA: Type-based alias analysis
- SCEV-AA: Uses scalar evolution for array indexing
- Global AA: Interprocedural analysis
- Can chain multiple analyses for better precision

## Precision vs. Cost Trade-offs

More precise analysis is more expensive:

| Analysis Type | Precision | Cost | Use Case |
|---------------|-----------|------|----------|
| Address-taken | Low | Very Low | Quick baseline |
| Type-based | Medium | Low | Production compilers |
| Flow-insensitive | Medium | Medium | Interprocedural |
| Flow-sensitive | High | High | Critical functions |
| Context-sensitive | Very High | Very High | Research/specialized |

## Impact on Optimizations

Alias analysis enables or improves:
- **Common subexpression elimination**: Can reuse loads if no aliasing stores intervene
- **Dead store elimination**: Can eliminate stores if subsequent store definitely overwrites
- **Loop optimizations**: Can move loads outside loops if no aliasing stores in loop
- **Vectorization**: Can parallelize if no loop-carried dependencies through aliasing
- **Register allocation**: Can keep values in registers longer if no aliasing writes

## Key Takeaways

- Alias analysis determines whether pointers may refer to the same memory location, which is critical for enabling optimizations in languages with pointers.
- May-alias analysis conservatively identifies possible aliasing, while must-alias identifies definite aliasing.
- Type-Based Alias Analysis uses type information to rule out aliasing between incompatible types.
- Points-to analysis computes sets of possible targets for each pointer, with Anderson's analysis being more precise and Steensgaard's being more efficient.
- Flow-sensitive analysis tracks how alias relationships change through the program, while flow-insensitive analysis computes single summaries.
- Context-sensitive analysis distinguishes different calling contexts for more precise interprocedural results.
- Practical compilers use multiple alias analysis techniques in combination, trading precision for scalability.
- The precision-cost trade-off is central: more precise analysis enables better optimization but requires more compilation time.
