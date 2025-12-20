---
id: cs105-t4-functions
title: "Structures and Functions"
order: 2
---

# Structures and Functions

Structures and functions work together to create modular, organized code. Understanding how to pass structures to functions and return them is essential for effective C programming.

## Passing Structures by Value

When you pass a structure to a function, a copy is made:

```c
typedef struct {
    int x;
    int y;
} Point;

void printPoint(Point p) {
    printf("(%d, %d)\n", p.x, p.y);
}

void tryToModify(Point p) {
    p.x = 999;  // Modifies the copy only!
}

int main() {
    Point pt = {10, 20};
    printPoint(pt);      // (10, 20)
    tryToModify(pt);
    printPoint(pt);      // Still (10, 20)!
    return 0;
}
```

**Implications:**
- Original structure is unchanged
- Copying large structures is expensive
- Safe: function can't accidentally modify original

## Passing Structures by Pointer

For efficiency or to modify the original, pass a pointer:

```c
void modifyPoint(Point *p) {
    p->x = 100;  // Arrow operator for pointer access
    p->y = 200;
}

void printPointPtr(const Point *p) {
    printf("(%d, %d)\n", p->x, p->y);
}

int main() {
    Point pt = {10, 20};
    printPointPtr(&pt);   // (10, 20)
    modifyPoint(&pt);
    printPointPtr(&pt);   // (100, 200)
    return 0;
}
```

## The Arrow Operator (->)

When you have a pointer to a structure, use `->` instead of `.`:

```c
Point *ptr = &pt;

// These are equivalent:
ptr->x = 50;
(*ptr).x = 50;

// Arrow operator is cleaner
printf("%d\n", ptr->x);
```

## Using const for Read-Only Access

Prevent accidental modification while avoiding copy overhead:

```c
void displayPerson(const Person *p) {
    printf("Name: %s, Age: %d\n", p->name, p->age);
    // p->age = 100;  // ERROR: p points to const
}
```

**Best practice**: Use `const` pointers for functions that only read data.

## Returning Structures

Functions can return structures by value:

```c
Point createPoint(int x, int y) {
    Point p = {x, y};
    return p;  // Returns a copy
}

Point addPoints(Point a, Point b) {
    Point result;
    result.x = a.x + b.x;
    result.y = a.y + b.y;
    return result;
}

int main() {
    Point p1 = createPoint(10, 20);
    Point p2 = createPoint(30, 40);
    Point sum = addPoints(p1, p2);  // (40, 60)
    return 0;
}
```

## Returning via Output Parameter

Alternative pattern using pointer parameter:

```c
void createPoint(int x, int y, Point *result) {
    result->x = x;
    result->y = y;
}

int main() {
    Point p;
    createPoint(10, 20, &p);
    return 0;
}
```

This avoids copying and makes error handling easier.

## Dynamic Structure Allocation

Allocate structures on the heap:

```c
Point *createPointDynamic(int x, int y) {
    Point *p = malloc(sizeof(Point));
    if (p != NULL) {
        p->x = x;
        p->y = y;
    }
    return p;  // Caller must free!
}

int main() {
    Point *p = createPointDynamic(10, 20);
    if (p) {
        printf("(%d, %d)\n", p->x, p->y);
        free(p);
    }
    return 0;
}
```

## Arrays of Structures

```c
void printStudents(const Student students[], int count) {
    for (int i = 0; i < count; i++) {
        printf("%s: %.1f\n", students[i].name, students[i].gpa);
    }
}

double averageGPA(const Student students[], int count) {
    double sum = 0;
    for (int i = 0; i < count; i++) {
        sum += students[i].gpa;
    }
    return sum / count;
}
```

## Structure Initialization Functions

Common pattern for complex structures:

```c
typedef struct {
    char name[50];
    int age;
    char email[100];
} Contact;

void initContact(Contact *c, const char *name, int age, const char *email) {
    strncpy(c->name, name, sizeof(c->name) - 1);
    c->name[sizeof(c->name) - 1] = '\0';
    c->age = age;
    strncpy(c->email, email, sizeof(c->email) - 1);
    c->email[sizeof(c->email) - 1] = '\0';
}

Contact *createContact(const char *name, int age, const char *email) {
    Contact *c = malloc(sizeof(Contact));
    if (c) {
        initContact(c, name, age, email);
    }
    return c;
}
```

## Practical Example: Rectangle Operations

```c
typedef struct {
    double x, y, width, height;
} Rectangle;

double area(const Rectangle *r) {
    return r->width * r->height;
}

double perimeter(const Rectangle *r) {
    return 2 * (r->width + r->height);
}

int contains(const Rectangle *r, double x, double y) {
    return x >= r->x && x <= r->x + r->width &&
           y >= r->y && y <= r->y + r->height;
}

void scale(Rectangle *r, double factor) {
    r->width *= factor;
    r->height *= factor;
}

int main() {
    Rectangle rect = {0, 0, 10, 5};

    printf("Area: %.1f\n", area(&rect));        // 50.0
    printf("Perimeter: %.1f\n", perimeter(&rect)); // 30.0
    printf("Contains (5,2): %d\n", contains(&rect, 5, 2)); // 1

    scale(&rect, 2);
    printf("New area: %.1f\n", area(&rect));   // 200.0

    return 0;
}
```

## Key Takeaways

- Pass by value copies the structure (safe but potentially slow)
- Pass by pointer for efficiency or to modify original
- Use `->` to access members through a pointer
- Use `const` pointers for read-only parameters
- Functions can return structures by value
- Dynamic allocation requires caller to free
- Initialization functions help construct complex structures

Structures and functions together enable object-oriented-style programming in C. Next, we'll explore nested structures.
