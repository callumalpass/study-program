---
id: cs105-t4-defining
title: "Defining Structures"
order: 1
---

# Defining Structures

Structures (structs) allow you to group related data of different types under a single name. They're C's primary mechanism for creating custom data types and are fundamental to organizing complex programs.

## Basic Structure Definition

Define a structure using the `struct` keyword:

```c
struct Point {
    int x;
    int y;
};
```

This creates a new type called `struct Point` with two integer members.

## Declaring Structure Variables

```c
struct Point p1;           // Declare a Point variable
struct Point p2, p3;       // Declare multiple

// Initialize at declaration
struct Point origin = {0, 0};
struct Point corner = {100, 200};
```

## Accessing Members

Use the dot operator (`.`) to access structure members:

```c
struct Point p;
p.x = 10;
p.y = 20;

printf("Point: (%d, %d)\n", p.x, p.y);
```

## Using typedef

`typedef` creates an alias, eliminating the need to write `struct` every time:

```c
typedef struct {
    int x;
    int y;
} Point;

// Now you can use just 'Point':
Point p1;
Point p2 = {5, 10};
```

You can also typedef a named struct:

```c
typedef struct Point {
    int x;
    int y;
} Point;

// Both work:
struct Point p1;
Point p2;
```

## Initialization Methods

### Positional Initialization
```c
struct Person {
    char name[50];
    int age;
    float height;
};

struct Person alice = {"Alice", 30, 5.6};
```

### Designated Initializers (C99)
```c
struct Person bob = {
    .name = "Bob",
    .age = 25,
    .height = 5.9
};

// Order doesn't matter:
struct Person charlie = {
    .height = 6.1,
    .name = "Charlie",
    .age = 28
};
```

### Partial Initialization
```c
struct Person unknown = {"Unknown"};
// age and height are initialized to 0
```

## Structures with Arrays

Structures can contain arrays:

```c
struct Student {
    char name[50];
    int scores[5];
    float average;
};

struct Student s = {
    "Alice",
    {85, 90, 78, 92, 88},
    86.6
};

printf("First score: %d\n", s.scores[0]);
```

## Structures with Pointers

```c
struct Book {
    char *title;     // Pointer to string
    char *author;
    int year;
};

struct Book b1;
b1.title = "The C Programming Language";
b1.author = "Kernighan & Ritchie";
b1.year = 1978;
```

**Caution**: When using pointer members, you're responsible for memory management.

## Anonymous Structures

Structures without names are useful in specific contexts:

```c
struct {
    int x;
    int y;
} point;  // Single variable of anonymous struct type

point.x = 10;
```

This creates one variable but no reusable type.

## Structure Assignment

Unlike arrays, structures can be assigned directly:

```c
struct Point p1 = {10, 20};
struct Point p2;

p2 = p1;  // Copies all members

printf("p2: (%d, %d)\n", p2.x, p2.y);  // (10, 20)
```

This performs a **shallow copy**—pointer members copy the address, not the data.

## Comparing Structures

You cannot compare structures with `==`:

```c
struct Point p1 = {10, 20};
struct Point p2 = {10, 20};

// WRONG: Won't compile
// if (p1 == p2) { ... }

// CORRECT: Compare member by member
if (p1.x == p2.x && p1.y == p2.y) {
    printf("Points are equal\n");
}
```

Or use `memcmp` (but beware of padding):

```c
if (memcmp(&p1, &p2, sizeof(struct Point)) == 0) {
    printf("Structures are identical\n");
}
```

## Common Patterns

### Rectangle from Points
```c
typedef struct {
    Point topLeft;
    Point bottomRight;
} Rectangle;

Rectangle rect = {{0, 0}, {100, 100}};
printf("Width: %d\n", rect.bottomRight.x - rect.topLeft.x);
```

### Date Structure
```c
typedef struct {
    int day;
    int month;
    int year;
} Date;

Date today = {15, 6, 2024};
```

### Employee Record
```c
typedef struct {
    int id;
    char name[50];
    char department[30];
    double salary;
    Date hireDate;
} Employee;
```

## Key Takeaways

- Structures group related data of different types
- Use `typedef` to avoid writing `struct` repeatedly
- Access members with the dot operator (`.`)
- Designated initializers improve readability
- Structure assignment copies all members (shallow)
- Structures cannot be compared with `==`
- Structures form the basis for complex data organization

Structures are essential for modeling real-world entities in C. Next, we'll explore how to use structures with functions.
