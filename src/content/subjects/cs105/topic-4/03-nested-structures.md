# Nested and Self-Referential Structures

Structures can contain other structures, enabling hierarchical data modeling. Self-referential structures, where a structure contains a pointer to its own type, are the foundation of linked data structures.

## Nested Structures

A structure can contain another structure as a member:

```c
typedef struct {
    int day;
    int month;
    int year;
} Date;

typedef struct {
    char name[50];
    Date birthDate;
    Date hireDate;
} Employee;
```

### Accessing Nested Members

Use multiple dots to drill down:

```c
Employee emp;
strcpy(emp.name, "Alice");
emp.birthDate.day = 15;
emp.birthDate.month = 6;
emp.birthDate.year = 1990;
emp.hireDate.day = 1;
emp.hireDate.month = 3;
emp.hireDate.year = 2020;

printf("%s was born on %d/%d/%d\n",
       emp.name,
       emp.birthDate.month,
       emp.birthDate.day,
       emp.birthDate.year);
```

### Initialization

```c
Employee emp = {
    "Bob",
    {20, 8, 1985},      // birthDate
    {15, 1, 2018}       // hireDate
};

// With designated initializers:
Employee emp2 = {
    .name = "Charlie",
    .birthDate = {.day = 10, .month = 4, .year = 1992},
    .hireDate = {.day = 5, .month = 9, .year = 2021}
};
```

### Pointers to Nested Structures

```c
Employee *empPtr = &emp;

// Access nested members through pointer:
empPtr->birthDate.year = 1991;

// Or with pointer to nested structure:
Date *datePtr = &empPtr->birthDate;
datePtr->month = 7;
```

## Self-Referential Structures

A structure containing a pointer to its own type:

```c
typedef struct Node {
    int data;
    struct Node *next;  // Pointer to same type
} Node;
```

**Note**: You must use `struct Node` inside the definition because `Node` (the typedef) isn't complete yet.

## Linked List Example

```c
typedef struct Node {
    int data;
    struct Node *next;
} Node;

// Create nodes
Node *head = malloc(sizeof(Node));
head->data = 10;
head->next = malloc(sizeof(Node));
head->next->data = 20;
head->next->next = malloc(sizeof(Node));
head->next->next->data = 30;
head->next->next->next = NULL;

// Traverse the list
Node *current = head;
while (current != NULL) {
    printf("%d -> ", current->data);
    current = current->next;
}
printf("NULL\n");
// Output: 10 -> 20 -> 30 -> NULL
```

## Binary Tree Example

```c
typedef struct TreeNode {
    int data;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

TreeNode *createNode(int data) {
    TreeNode *node = malloc(sizeof(TreeNode));
    if (node) {
        node->data = data;
        node->left = NULL;
        node->right = NULL;
    }
    return node;
}

// Build a tree:
//       5
//      / \
//     3   7
TreeNode *root = createNode(5);
root->left = createNode(3);
root->right = createNode(7);
```

## Doubly Linked List

```c
typedef struct DNode {
    int data;
    struct DNode *prev;
    struct DNode *next;
} DNode;
```

## Complex Nested Example: University Model

```c
typedef struct {
    char street[100];
    char city[50];
    char state[3];
    char zip[10];
} Address;

typedef struct {
    char firstName[30];
    char lastName[30];
    Address address;
    char phone[15];
} Person;

typedef struct {
    Person info;
    int studentId;
    float gpa;
    char major[50];
} Student;

typedef struct {
    Person info;
    int employeeId;
    char department[50];
    double salary;
} Professor;

typedef struct {
    char name[100];
    char code[10];
    int credits;
    Professor *instructor;
    Student *students;
    int studentCount;
} Course;
```

### Using the Complex Model

```c
Student s = {
    .info = {
        .firstName = "Alice",
        .lastName = "Smith",
        .address = {
            .street = "123 Main St",
            .city = "Springfield",
            .state = "IL",
            .zip = "62701"
        },
        .phone = "555-1234"
    },
    .studentId = 12345,
    .gpa = 3.8,
    .major = "Computer Science"
};

printf("%s %s (ID: %d)\n",
       s.info.firstName,
       s.info.lastName,
       s.studentId);
printf("Lives in %s, %s\n",
       s.info.address.city,
       s.info.address.state);
```

## Forward Declaration

When structures reference each other:

```c
// Forward declaration
struct B;

struct A {
    int value;
    struct B *partner;  // Can use pointer to incomplete type
};

struct B {
    int value;
    struct A *partner;
};
```

## Memory Considerations

Nested structures are stored contiguously:

```c
typedef struct {
    char name[20];    // 20 bytes
    Date birthday;    // 12 bytes (3 ints)
} Person;             // Total: at least 32 bytes (may have padding)
```

Self-referential structures use pointers, so they're fixed size:

```c
typedef struct Node {
    int data;         // 4 bytes
    struct Node *next; // 8 bytes (64-bit pointer)
} Node;               // Total: typically 16 bytes (with padding)
```

## Key Takeaways

- Structures can contain other structures as members
- Access nested members with multiple dot operators
- Self-referential structures contain pointers to their own type
- Use `struct TypeName` inside the definition (not typedef)
- Linked lists, trees, and graphs use self-referential structures
- Forward declarations allow mutual references between structures
- Nested structures store data inline; self-referential use pointers

These patterns are essential for building complex data structures. Next, we'll explore memory layout and padding.
