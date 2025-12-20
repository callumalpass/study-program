---
id: cs105-t1-intro
title: "Introduction to C Programming"
order: 1
---

# Introduction to C Programming

C is one of the most influential programming languages ever created. Developed in 1972 by Dennis Ritchie at Bell Labs, C has shaped the computing world in ways that few other technologies have. Understanding C gives you insight into how computers actually work and provides a foundation for learning virtually any other programming language.

## Why Learn C?

C sits at a unique position in the programming language hierarchy. It's low-level enough to give you direct control over hardware and memory, yet high-level enough to write readable, maintainable code. This balance makes C ideal for:

- **Operating Systems**: Linux, Windows, and macOS are largely written in C
- **Embedded Systems**: Microcontrollers, IoT devices, and firmware
- **Game Engines**: Performance-critical components of games
- **Compilers and Interpreters**: Including Python's reference implementation
- **Database Systems**: MySQL, PostgreSQL, and SQLite

Learning C also makes you a better programmer overall. You'll understand concepts like memory management, pointers, and system calls that higher-level languages abstract away.

## Your First C Program

Every C journey begins with the classic "Hello, World!" program:

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

Let's break down each component:

**`#include <stdio.h>`** - This is a preprocessor directive that includes the Standard Input/Output library. The `stdio.h` header file provides functions like `printf()` for output and `scanf()` for input.

**`int main()`** - Every C program must have a `main` function. This is where program execution begins. The `int` indicates that `main` returns an integer value.

**`printf("Hello, World!\n");`** - This function prints text to the console. The `\n` is an escape sequence representing a newline character.

**`return 0;`** - This returns the value 0 to the operating system, indicating successful program completion. Non-zero values typically indicate errors.

## The Compilation Process

Unlike interpreted languages like Python, C is a compiled language. Your source code goes through several stages before becoming an executable:

1. **Preprocessing**: Handles directives starting with `#` (like `#include` and `#define`)
2. **Compilation**: Converts C code to assembly language
3. **Assembly**: Converts assembly to machine code (object files)
4. **Linking**: Combines object files with library code to create the executable

To compile a program using GCC (GNU Compiler Collection):

```bash
gcc hello.c -o hello
./hello
```

The `-o hello` flag specifies the output filename. Without it, GCC creates a file named `a.out` by default.

## C Program Structure

A typical C program follows this structure:

```c
// 1. Preprocessor directives
#include <stdio.h>
#include <stdlib.h>
#define MAX_SIZE 100

// 2. Global declarations (use sparingly)
int globalCounter = 0;

// 3. Function prototypes
void greet(char *name);
int add(int a, int b);

// 4. Main function
int main() {
    // Local variables
    int result;

    // Program logic
    greet("Alice");
    result = add(5, 3);
    printf("Result: %d\n", result);

    return 0;
}

// 5. Function definitions
void greet(char *name) {
    printf("Hello, %s!\n", name);
}

int add(int a, int b) {
    return a + b;
}
```

## Comments in C

Comments help document your code and are ignored by the compiler:

```c
// Single-line comment

/* Multi-line comment
   can span several lines */

int x = 5;  // Inline comment after code
```

Use comments to explain *why* you're doing something, not *what* you're doing. The code itself shows what; comments should provide context.

## Common Escape Sequences

C uses backslash escape sequences for special characters:

| Sequence | Meaning |
|----------|---------|
| `\n` | Newline |
| `\t` | Tab |
| `\\` | Backslash |
| `\"` | Double quote |
| `\'` | Single quote |
| `\0` | Null character |

## Key Takeaways

- C is a compiled, procedural language that provides low-level hardware access
- Every C program starts execution from the `main()` function
- The `#include` directive brings in library functionality
- Compilation transforms source code into machine-executable programs
- Comments document code without affecting execution
- Understanding C fundamentals helps you become a better programmer in any language

In the next section, we'll explore C's type system and learn how to declare and use variables effectively.
