import { CodingExercise } from '../../../../core/types';

export const topic4Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'cs105-exercise-4',
    subjectId: 'cs105',
    topicId: 'cs105-topic-4',
    title: 'Student Record Structure',
    difficulty: 2,
    description: 'Define a structure to store student information (name, ID, GPA) and create a function to print student details.',
    starterCode: '#include <stdio.h>\n#include <string.h>\n\n// Define Student structure here\n\nvoid printStudent(struct Student s) {\n    // Print student details\n}\n\nint main() {\n    struct Student s1;\n    strcpy(s1.name, "John Doe");\n    s1.id = 12345;\n    s1.gpa = 3.8;\n    \n    printStudent(s1);\n    return 0;\n}',
    testCases: [
    ],
    hints: ['Define a struct with char array for name, int for id, and float for gpa', 'Use printf with appropriate format specifiers', 'Use %.2f to print GPA with 2 decimal places'],
    solution: '#include <stdio.h>\n#include <string.h>\n\nstruct Student {\n    char name[50];\n    int id;\n    float gpa;\n};\n\nvoid printStudent(struct Student s) {\n    printf("Name: %s\\n", s.name);\n    printf("ID: %d\\n", s.id);\n    printf("GPA: %.2f", s.gpa);\n}\n\nint main() {\n    struct Student s1;\n    strcpy(s1.name, "John Doe");\n    s1.id = 12345;\n    s1.gpa = 3.8;\n    \n    printStudent(s1);\n    return 0;\n}',
    language: 'c'
  },
  {
    id: 'cs105-t4-ex02',
    subjectId: 'cs105',
    topicId: 'cs105-topic-4',
    title: 'Point Structure',
    difficulty: 1,
    description: 'Define a Point structure with x, y coordinates. Calculate distance between two points.',
    starterCode: '#include <stdio.h>\n#include <math.h>\n\n// Define Point structure\n\nfloat distance(struct Point p1, struct Point p2) {\n    // Calculate Euclidean distance\n}\n\nint main() {\n    struct Point a = {0, 0};\n    struct Point b = {3, 4};\n    printf("Distance: %.2f", distance(a, b));\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <math.h>\n\nstruct Point {\n    float x;\n    float y;\n};\n\nfloat distance(struct Point p1, struct Point p2) {\n    float dx = p2.x - p1.x;\n    float dy = p2.y - p1.y;\n    return sqrt(dx*dx + dy*dy);\n}\n\nint main() {\n    struct Point a = {0, 0};\n    struct Point b = {3, 4};\n    printf("Distance: %.2f", distance(a, b));\n    return 0;\n}',
    testCases: [
    ],
    hints: ['Distance = sqrt((x2-x1)^2 + (y2-y1)^2)', 'Use math.h for sqrt()'],
    language: 'c'
  },
  {
    id: 'cs105-t4-ex03',
    subjectId: 'cs105',
    topicId: 'cs105-topic-4',
    title: 'Structure with Typedef',
    difficulty: 1,
    description: 'Use typedef to create a Rectangle type and calculate its area.',
    starterCode: '#include <stdio.h>\n\n// Use typedef to define Rectangle\n\nint area(Rectangle r) {\n    // Return area\n}\n\nint main() {\n    Rectangle rect = {5, 3};\n    printf("Area: %d", area(rect));\n    return 0;\n}',
    solution: '#include <stdio.h>\n\ntypedef struct {\n    int width;\n    int height;\n} Rectangle;\n\nint area(Rectangle r) {\n    return r.width * r.height;\n}\n\nint main() {\n    Rectangle rect = {5, 3};\n    printf("Area: %d", area(rect));\n    return 0;\n}',
    testCases: [
    ],
    hints: ['typedef struct {...} Name;', 'Then use Name instead of struct Name'],
    language: 'c'
  },
  {
    id: 'cs105-t4-ex04',
    subjectId: 'cs105',
    topicId: 'cs105-topic-4',
    title: 'Pointer to Structure',
    difficulty: 2,
    description: 'Use arrow operator to modify structure through a pointer.',
    starterCode: '#include <stdio.h>\n\ntypedef struct {\n    int x;\n    int y;\n} Point;\n\nvoid movePoint(Point *p, int dx, int dy) {\n    // Move point by dx, dy using arrow operator\n}\n\nint main() {\n    Point p = {5, 10};\n    movePoint(&p, 3, -2);\n    printf("Point: (%d, %d)", p.x, p.y);\n    return 0;\n}',
    solution: '#include <stdio.h>\n\ntypedef struct {\n    int x;\n    int y;\n} Point;\n\nvoid movePoint(Point *p, int dx, int dy) {\n    p->x += dx;\n    p->y += dy;\n}\n\nint main() {\n    Point p = {5, 10};\n    movePoint(&p, 3, -2);\n    printf("Point: (%d, %d)", p.x, p.y);\n    return 0;\n}',
    testCases: [
    ],
    hints: ['Use -> for pointer to struct', 'p->x is same as (*p).x'],
    language: 'c'
  },
  {
    id: 'cs105-t4-ex05',
    subjectId: 'cs105',
    topicId: 'cs105-topic-4',
    title: 'Nested Structures',
    difficulty: 3,
    description: 'Create a Person structure containing an Address structure.',
    starterCode: '#include <stdio.h>\n#include <string.h>\n\n// Define Address structure\n// Define Person structure containing Address\n\nvoid printPerson(Person p) {\n    // Print name and full address\n}\n\nint main() {\n    Person p;\n    strcpy(p.name, "Alice");\n    strcpy(p.addr.street, "123 Main St");\n    strcpy(p.addr.city, "Boston");\n    \n    printPerson(p);\n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    char street[50];\n    char city[30];\n} Address;\n\ntypedef struct {\n    char name[30];\n    Address addr;\n} Person;\n\nvoid printPerson(Person p) {\n    printf("Name: %s\\n", p.name);\n    printf("Address: %s, %s", p.addr.street, p.addr.city);\n}\n\nint main() {\n    Person p;\n    strcpy(p.name, "Alice");\n    strcpy(p.addr.street, "123 Main St");\n    strcpy(p.addr.city, "Boston");\n    \n    printPerson(p);\n    return 0;\n}',
    testCases: [
    ],
    hints: ['Define inner struct first', 'Access with p.addr.city'],
    language: 'c'
  },
  {
    id: 'cs105-t4-ex06',
    subjectId: 'cs105',
    topicId: 'cs105-topic-4',
    title: 'Array of Structures',
    difficulty: 2,
    description: 'Create an array of Product structures and find the most expensive one.',
    starterCode: '#include <stdio.h>\n\ntypedef struct {\n    char name[20];\n    float price;\n} Product;\n\nint findMostExpensive(Product products[], int n) {\n    // Return index of most expensive\n}\n\nint main() {\n    Product products[3] = {\n        {"Apple", 1.50},\n        {"Bread", 2.75},\n        {"Milk", 3.00}\n    };\n    \n    int idx = findMostExpensive(products, 3);\n    printf("Most expensive: %s ($%.2f)", products[idx].name, products[idx].price);\n    return 0;\n}',
    solution: '#include <stdio.h>\n\ntypedef struct {\n    char name[20];\n    float price;\n} Product;\n\nint findMostExpensive(Product products[], int n) {\n    int maxIdx = 0;\n    for (int i = 1; i < n; i++) {\n        if (products[i].price > products[maxIdx].price) {\n            maxIdx = i;\n        }\n    }\n    return maxIdx;\n}\n\nint main() {\n    Product products[3] = {\n        {"Apple", 1.50},\n        {"Bread", 2.75},\n        {"Milk", 3.00}\n    };\n    \n    int idx = findMostExpensive(products, 3);\n    printf("Most expensive: %s ($%.2f)", products[idx].name, products[idx].price);\n    return 0;\n}',
    testCases: [
    ],
    hints: ['Track index of maximum', 'Access with products[i].price'],
    language: 'c'
  },
  {
    id: 'cs105-t4-ex07',
    subjectId: 'cs105',
    topicId: 'cs105-topic-4',
    title: 'Self-Referential Structure (Linked List Node)',
    difficulty: 4,
    description: 'Define a Node structure for a linked list and create a simple 3-node list.',
    starterCode: '#include <stdio.h>\n#include <stdlib.h>\n\n// Define Node with int data and pointer to next Node\n\nvoid printList(struct Node *head) {\n    // Print all values\n}\n\nint main() {\n    // Create 3 nodes: 1 -> 2 -> 3\n    // Print the list\n    // Free memory\n    \n    return 0;\n}',
    solution: '#include <stdio.h>\n#include <stdlib.h>\n\nstruct Node {\n    int data;\n    struct Node *next;\n};\n\nvoid printList(struct Node *head) {\n    struct Node *current = head;\n    while (current != NULL) {\n        printf("%d ", current->data);\n        current = current->next;\n    }\n}\n\nint main() {\n    struct Node *n1 = malloc(sizeof(struct Node));\n    struct Node *n2 = malloc(sizeof(struct Node));\n    struct Node *n3 = malloc(sizeof(struct Node));\n    \n    n1->data = 1; n1->next = n2;\n    n2->data = 2; n2->next = n3;\n    n3->data = 3; n3->next = NULL;\n    \n    printList(n1);\n    \n    free(n1); free(n2); free(n3);\n    return 0;\n}',
    testCases: [
    ],
    hints: ['struct Node contains struct Node *next', 'Last node\'s next is NULL'],
    language: 'c'
  },
  {
    id: 'cs105-t4-ex08',
    subjectId: 'cs105',
    topicId: 'cs105-topic-4',
    title: 'Structure Size and Padding',
    difficulty: 3,
    description: 'Explore structure padding by comparing sizes of different struct arrangements.',
    starterCode: '#include <stdio.h>\n\nstruct A {\n    char c;\n    int i;\n    char d;\n};\n\nstruct B {\n    char c;\n    char d;\n    int i;\n};\n\nint main() {\n    printf("Size of struct A: %zu\\n", sizeof(struct A));\n    printf("Size of struct B: %zu\\n", sizeof(struct B));\n    // Explain why they differ!\n    return 0;\n}',
    solution: '#include <stdio.h>\n\nstruct A {\n    char c;\n    int i;\n    char d;\n};\n\nstruct B {\n    char c;\n    char d;\n    int i;\n};\n\nint main() {\n    printf("Size of struct A: %zu\\n", sizeof(struct A));\n    printf("Size of struct B: %zu\\n", sizeof(struct B));\n    // A has padding after c and d for alignment\n    // B groups chars together, less padding needed\n    return 0;\n}',
    testCases: [
    ],
    hints: ['int requires 4-byte alignment', 'Padding is added between members'],
    language: 'c'
  }
];
