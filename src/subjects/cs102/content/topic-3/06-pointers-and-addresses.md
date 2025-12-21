---
id: cs102-t3-pointers-addresses
title: "Pointers and Addresses"
order: 6
---

# Pointers and Addresses

Memory is a large array of bytes, each with a unique numeric address. Pointers are variables that hold these addresses, enabling programs to work with data indirectly. Understanding how addresses are represented and manipulated at the binary level is essential for systems programming, debugging, and understanding how high-level constructs like arrays and objects actually work.

## Memory as a Byte Array

From the hardware's perspective, memory is simply a sequence of bytes numbered from 0 upward:

```
Address     Contents
─────────────────────
0x00000000  [byte 0]
0x00000001  [byte 1]
0x00000002  [byte 2]
...
0x7FFFFFFF  [byte 2,147,483,647]
...
```

Each address is itself a number—on 32-bit systems, addresses are 32-bit unsigned integers (0 to 4,294,967,295). On 64-bit systems, addresses are 64 bits, though typically only 48 bits are used for actual addressing.

## What Is a Pointer?

A **pointer** is a variable whose value is a memory address. In C:

```c
int x = 42;      // x stores the value 42
int *p = &x;     // p stores the ADDRESS of x
```

If `x` is stored at address `0x7ffeefbff5c0`, then `p` contains the value `0x7ffeefbff5c0`.

### Pointer Size

The size of a pointer depends on the architecture:

| System | Pointer Size | Address Range |
|--------|--------------|---------------|
| 32-bit | 4 bytes | 0 to 4 GB |
| 64-bit | 8 bytes | 0 to 16 EB (theoretical) |

On 64-bit Linux, typical addresses look like `0x00007fff5fbff5c0`—using about 48 bits of the available 64.

## Address Arithmetic

Pointers support arithmetic, but with type-aware scaling:

```c
int arr[10];   // Array of 10 ints, each 4 bytes
int *p = arr;  // p points to arr[0]

p + 1          // Points to arr[1], 4 bytes higher
p + 5          // Points to arr[5], 20 bytes higher
```

At the binary level:
```
If p = 0x1000, and sizeof(int) = 4:
  p + 1 = 0x1000 + 4 = 0x1004
  p + 5 = 0x1000 + 20 = 0x1014
```

The compiler multiplies the offset by the element size:
```
address = base + (index × sizeof(element))
```

### Array Indexing Equivalence

In C, `arr[i]` is literally defined as `*(arr + i)`:

```c
arr[3] == *(arr + 3)  // Both access the 4th element
3[arr] == *(3 + arr)  // Also valid (addition is commutative)!
```

This is why array indexing in C starts at 0—element 0 has offset 0.

## Pointer Representation in Memory

A pointer is stored just like any other integer:

```
Variable p at address 0x7ffeefbff5b0:
  Contains: 0x00007ffeefbff5c0 (the address of x)

In little-endian memory:
  0x7ffeefbff5b0: c0 f5 bf ef ff 7f 00 00
```

The "type" of a pointer exists only at compile time—at runtime, it's just 8 bytes holding an address.

## NULL Pointers

The null pointer represents "no valid address" and is typically zero:

```c
int *p = NULL;  // p contains 0x0000000000000000
```

Dereferencing NULL causes a segmentation fault:
```c
*p = 10;  // CRASH: accessing address 0x0000000000000000
```

Operating systems reserve the low memory pages specifically to catch null pointer dereferences.

### NULL vs Uninitialized

```c
int *p;        // UNINITIALIZED - contains garbage
int *q = NULL; // INITIALIZED to NULL
```

Uninitialized pointers contain whatever bits happened to be in memory—potentially valid-looking addresses that cause subtle bugs.

## Pointer Dereferencing

Dereferencing reads or writes the memory at the pointed-to address:

```c
int x = 42;
int *p = &x;

int y = *p;   // Read: y gets value at address in p (42)
*p = 100;     // Write: value at address in p becomes 100
```

At the assembly level:
```assembly
; Assuming p is in register rax
MOV  rbx, [rax]    ; Read: rbx = *(p)
MOV  [rax], 100    ; Write: *p = 100
```

The brackets indicate memory access at the address in the register.

## Double Pointers

A pointer to a pointer stores the address of a pointer:

```c
int x = 42;
int *p = &x;      // p points to x
int **pp = &p;    // pp points to p

**pp = 100;       // Same as *p = 100, same as x = 100
```

Memory layout:
```
Address         Variable   Value
0x7fff...000    x          42
0x7fff...008    p          0x7fff...000 (address of x)
0x7fff...010    pp         0x7fff...008 (address of p)
```

Double pointers are common for:
- Modifying pointer arguments in functions
- 2D arrays (array of pointers)
- Linked data structures (changing head pointers)

## Pointer Type Information

At runtime, a pointer is just an address—there's no type information stored. The type only matters for:

1. **Arithmetic scaling**: `char *p; p+1` advances 1 byte; `int *p; p+1` advances 4 bytes
2. **Dereferencing interpretation**: `*p` reads different amounts depending on type
3. **Compile-time type checking**: Prevents obvious errors

```c
int x = 0x12345678;
int *ip = &x;
char *cp = (char *)&x;

*ip;      // Reads 4 bytes: 0x12345678
*cp;      // Reads 1 byte: 0x78 (little-endian)
*(cp+1);  // Reads 1 byte: 0x56
```

## Void Pointers

`void *` is a generic pointer that can hold any address:

```c
void *generic = &x;  // OK for any type
int *specific = (int *)generic;  // Cast back to use
```

You cannot dereference `void *` directly—the compiler doesn't know the size. Common uses:
- `malloc()` returns `void *`
- Generic data structure implementations
- Memory comparison functions (`memcpy`, `memcmp`)

## Function Pointers

Functions have addresses too:

```c
int add(int a, int b) { return a + b; }

int (*fp)(int, int) = add;  // fp holds address of add()
int result = fp(3, 4);      // Calls add(3, 4) through fp
```

Function pointers enable:
- Callbacks
- Plugin architectures
- Virtual function dispatch (how OOP polymorphism works)

In memory, `fp` is just an address like any other pointer—it points to the machine code bytes of the function.

## Common Pointer Bugs

### Dangling Pointers

Pointer to memory that's been freed:

```c
int *p = malloc(sizeof(int));
*p = 42;
free(p);
// p is now dangling—it still contains the old address
*p = 100;  // UNDEFINED BEHAVIOR: writing to freed memory
```

### Buffer Overflows

Accessing beyond allocated bounds:

```c
int arr[10];
int *p = arr;
*(p + 10) = 42;  // Buffer overflow! arr[10] doesn't exist
```

This can overwrite other variables, return addresses, or crash.

### Type Confusion

Interpreting memory as the wrong type:

```c
float f = 3.14;
int *p = (int *)&f;
printf("%d\n", *p);  // Prints IEEE-754 bits interpreted as int: 1078523331
```

Sometimes useful (examining float bit patterns), often a bug.

## Addresses in Debugging

Debuggers display addresses constantly:

```
(gdb) print &x
$1 = (int *) 0x7ffeefbff5c0

(gdb) print p
$2 = (int *) 0x7ffeefbff5c0

(gdb) x/4xb 0x7ffeefbff5c0
0x7ffeefbff5c0:  0x2a  0x00  0x00  0x00   // 42 in little-endian
```

Understanding that addresses are just numbers makes debugging output meaningful.

## Key Takeaways

- **Memory is a byte array** numbered by addresses; pointers hold these addresses.
- **Pointer size** depends on architecture: 4 bytes (32-bit) or 8 bytes (64-bit).
- **Pointer arithmetic** scales by element size: `int *p + 1` advances by `sizeof(int)` bytes.
- **Array indexing** is pointer arithmetic: `arr[i]` equals `*(arr + i)`.
- **NULL** (zero) represents an invalid address; dereferencing it crashes.
- **At runtime**, a pointer has no type—it's just an address value.
- **Void pointers** can hold any address but can't be dereferenced directly.
- **Function pointers** hold addresses of code, enabling callbacks and dynamic dispatch.
- **Common bugs**: dangling pointers, buffer overflows, type confusion.
- Understanding pointers as addresses demystifies low-level programming and debugging.

