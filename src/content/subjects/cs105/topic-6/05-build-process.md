# Build Process

Understanding the C build process is essential for debugging compilation errors, optimizing builds, and managing complex projects. The process transforms source code into executable programs through several distinct phases.

## Compilation Stages

### Overview

```
Source Code (.c, .h)
        ↓
   Preprocessor (-E)
        ↓
Preprocessed Source (.i)
        ↓
    Compiler (-S)
        ↓
  Assembly Code (.s)
        ↓
   Assembler (-c)
        ↓
  Object Files (.o)
        ↓
     Linker
        ↓
  Executable
```

### Stage 1: Preprocessing

The preprocessor handles directives:

```bash
gcc -E source.c -o source.i
```

Operations:
- Include file expansion
- Macro replacement
- Conditional compilation
- Comment removal

### Stage 2: Compilation

Translates C to assembly:

```bash
gcc -S source.c -o source.s
```

Output is human-readable assembly:

```asm
main:
    pushq   %rbp
    movq    %rsp, %rbp
    movl    $0, %eax
    popq    %rbp
    ret
```

### Stage 3: Assembly

Assembler creates object code:

```bash
gcc -c source.c -o source.o
# Or from assembly:
as source.s -o source.o
```

Object files contain:
- Machine code
- Symbol table
- Relocation information

### Stage 4: Linking

Combines object files into executable:

```bash
gcc source.o -o program
# Or explicitly:
ld source.o -o program -lc
```

The linker:
- Resolves symbol references
- Combines code sections
- Links libraries
- Creates executable format

## Separate Compilation

### Why Separate Compilation?

- **Faster builds** - Only recompile changed files
- **Modularity** - Independent components
- **Collaboration** - Different developers work on different files
- **Code reuse** - Create libraries

### Example Project

```
project/
├── main.c
├── math.c
├── math.h
├── util.c
└── util.h
```

```c
// math.h
#ifndef MATH_H
#define MATH_H
int add(int a, int b);
int multiply(int a, int b);
#endif

// math.c
#include "math.h"
int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

// main.c
#include "math.h"
#include "util.h"
int main() {
    printf("%d\n", add(3, 4));
    return 0;
}
```

### Building Separately

```bash
# Compile each file to object
gcc -c main.c -o main.o
gcc -c math.c -o math.o
gcc -c util.c -o util.o

# Link all objects
gcc main.o math.o util.o -o program
```

## Libraries

### Static Libraries (.a)

Archive of object files, linked at compile time:

```bash
# Create static library
ar rcs libmath.a math.o util.o

# Link with library
gcc main.o -L. -lmath -o program
```

Advantages:
- Single executable file
- No runtime dependencies
- Faster execution

Disadvantages:
- Larger executables
- Must rebuild to update library

### Shared Libraries (.so)

Linked at runtime:

```bash
# Create shared library
gcc -shared -fPIC math.c util.c -o libmath.so

# Link with shared library
gcc main.c -L. -lmath -o program

# Run (need library path)
LD_LIBRARY_PATH=. ./program
```

Advantages:
- Smaller executables
- Shared memory between processes
- Update without recompiling

Disadvantages:
- Runtime dependency
- Slightly slower startup

## Compiler Flags

### Optimization Levels

```bash
gcc -O0 source.c  # No optimization (default)
gcc -O1 source.c  # Basic optimization
gcc -O2 source.c  # Standard optimization
gcc -O3 source.c  # Aggressive optimization
gcc -Os source.c  # Optimize for size
gcc -Og source.c  # Optimize for debugging
```

### Warning Flags

```bash
gcc -Wall source.c       # Common warnings
gcc -Wextra source.c     # Extra warnings
gcc -Werror source.c     # Warnings as errors
gcc -pedantic source.c   # Strict standard compliance
gcc -Wall -Wextra -Werror -pedantic source.c  # Maximum strictness
```

### Debug Information

```bash
gcc -g source.c    # Debug symbols
gcc -g3 source.c   # Maximum debug info
gcc -ggdb source.c # GDB-specific format
```

### Standard Selection

```bash
gcc -std=c89 source.c   # ANSI C
gcc -std=c99 source.c   # C99
gcc -std=c11 source.c   # C11
gcc -std=c17 source.c   # C17
gcc -std=gnu11 source.c # C11 + GNU extensions
```

## Common Linker Errors

### Undefined Reference

```
undefined reference to 'function_name'
```

Causes:
- Missing object file
- Missing library
- Function not defined

### Multiple Definition

```
multiple definition of 'variable_name'
```

Causes:
- Definition in header (not just declaration)
- Same symbol in multiple object files

## Examining Files

### Object Files

```bash
nm object.o        # List symbols
objdump -d obj.o   # Disassemble
readelf -a obj.o   # ELF information
```

### Symbol Types

```
T - Text (code) section, global
t - Text section, local
D - Data section, global
U - Undefined (needs linking)
```

## Best Practices

1. **Enable warnings** - `-Wall -Wextra`
2. **Use debug builds** for development
3. **Optimize** only for release
4. **Separate interface from implementation**
5. **Minimize rebuilds** with proper dependencies
6. **Use libraries** for reusable code

## Summary

The C build process:
1. **Preprocessing** - Text transformation
2. **Compilation** - C to assembly
3. **Assembly** - Assembly to machine code
4. **Linking** - Combine into executable

Understanding each stage helps diagnose errors and optimize builds.
