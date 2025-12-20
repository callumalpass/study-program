# Header Files

Header files are the foundation of modular C programming. They declare interfaces that allow separate source files to communicate while keeping implementations hidden.

## Purpose of Header Files

Headers serve several purposes:

1. **Declare interfaces** - Function prototypes, types, constants
2. **Enable separate compilation** - Compile files independently
3. **Provide documentation** - Interface specification
4. **Enable code reuse** - Share declarations across files

## Header File Contents

### What Belongs in Headers

```c
// mymodule.h

#ifndef MYMODULE_H
#define MYMODULE_H

// Type definitions
typedef struct {
    int x;
    int y;
} Point;

// Constants
#define MAX_POINTS 100
extern const double PI;

// Function prototypes
Point create_point(int x, int y);
double distance(Point a, Point b);
void print_point(Point p);

// Macro definitions
#define SQUARE(x) ((x) * (x))

#endif // MYMODULE_H
```

### What Belongs in Source Files

```c
// mymodule.c

#include "mymodule.h"
#include <stdio.h>
#include <math.h>

// Constant definition
const double PI = 3.14159265358979;

// Function implementations
Point create_point(int x, int y) {
    return (Point){x, y};
}

double distance(Point a, Point b) {
    int dx = b.x - a.x;
    int dy = b.y - a.y;
    return sqrt(dx*dx + dy*dy);
}

void print_point(Point p) {
    printf("(%d, %d)\n", p.x, p.y);
}
```

## Include Guards

### The Multiple Inclusion Problem

Without protection, headers can be included multiple times:

```c
// a.h
#include "common.h"

// b.h
#include "common.h"

// main.c
#include "a.h"
#include "b.h"  // common.h included twice!
```

### Traditional Include Guards

```c
#ifndef HEADER_NAME_H
#define HEADER_NAME_H

// Header contents

#endif // HEADER_NAME_H
```

Naming conventions:
- `MYPROJECT_MODULE_H`
- `_MODULE_H_`
- `MODULE_H_INCLUDED`

### Pragma Once

Modern alternative (non-standard but widely supported):

```c
#pragma once

// Header contents
```

Advantages:
- Simpler syntax
- Faster compilation (some compilers)
- No name collision risk

Disadvantages:
- Not part of C standard
- Can fail with symbolic links

## Include Syntax

### Angle Brackets vs Quotes

```c
#include <stdio.h>      // System headers - search system paths
#include "myheader.h"   // Local headers - search current directory first
```

### Include Paths

Compilers search paths in order:

```bash
# System headers (<>)
/usr/include
/usr/local/include

# Local headers ("")
Current directory
Then system paths
```

Specify additional paths:

```bash
gcc -I/path/to/headers source.c
```

## Header Organization

### Standard Layout

```c
// mymodule.h

#ifndef MYMODULE_H
#define MYMODULE_H

// 1. Other includes needed by this header
#include <stddef.h>
#include "types.h"

// 2. Preprocessor definitions
#define MYMODULE_VERSION "1.0"
#define MAX_SIZE 1024

// 3. Type definitions
typedef struct MyStruct MyStruct;  // Forward declaration

struct MyStruct {
    int value;
    char name[64];
};

// 4. Function prototypes
MyStruct* create_mystruct(const char* name);
void destroy_mystruct(MyStruct* s);
int get_value(const MyStruct* s);

// 5. Extern variable declarations
extern int global_count;

#endif // MYMODULE_H
```

## Forward Declarations

Declare types without defining them:

```c
// Forward declare struct
struct Node;
typedef struct Node Node;

// Can use pointers without full definition
Node* create_node(void);
void link_nodes(Node* a, Node* b);

// Full definition only needed in implementation
struct Node {
    int data;
    Node* next;
};
```

Benefits:
- Reduces compilation dependencies
- Speeds up builds
- Enables circular references

## Self-Contained Headers

Headers should be self-contained (include everything they need):

```c
// BAD - depends on prior includes
// point.h
struct Point {
    float x, y;
};
void print_point(Point p);  // Needs stdio.h

// GOOD - self-contained
// point.h
#ifndef POINT_H
#define POINT_H

#include <stdio.h>  // For FILE*

typedef struct {
    float x, y;
} Point;

void print_point(Point p);
void fprint_point(FILE* f, Point p);

#endif
```

## Common Mistakes

### Definitions in Headers

```c
// BAD - definition in header
// util.h
int global_counter = 0;  // Multiple definition error!

// GOOD - declaration in header, definition in source
// util.h
extern int global_counter;

// util.c
int global_counter = 0;
```

### Including Unnecessary Headers

```c
// BAD - heavy includes
#include <stdio.h>
#include <stdlib.h>
#include <string.h>  // Only used in .c file

// GOOD - minimal includes
// Only include what the header actually needs
```

### Circular Includes

```c
// a.h
#include "b.h"
struct A { B* b_ref; };

// b.h
#include "a.h"  // Circular!
struct B { A* a_ref; };

// SOLUTION - use forward declarations
// a.h
struct B;  // Forward declare
struct A { struct B* b_ref; };

// b.h
struct A;  // Forward declare
struct B { struct A* a_ref; };
```

## Best Practices

1. **Use include guards** on every header
2. **Keep headers minimal** - only what's needed
3. **Make headers self-contained**
4. **Use forward declarations** when possible
5. **Document the public interface**
6. **Include in source what source needs**

## Summary

Header files enable modular C programming:
- Declare interfaces for other files to use
- Use include guards to prevent multiple inclusion
- Keep declarations in headers, definitions in sources
- Use forward declarations to reduce dependencies
- Make headers self-contained and minimal
