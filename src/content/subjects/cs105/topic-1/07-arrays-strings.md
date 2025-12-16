# Arrays and Strings

Arrays are collections of elements of the same type stored in contiguous memory. Strings in C are simply arrays of characters with a special terminator. Understanding these data structures is fundamental to C programming.

## Array Basics

Declare arrays with a fixed size:

```c
int numbers[5];           // Array of 5 integers (uninitialized)
int scores[5] = {85, 90, 78, 92, 88};  // Initialized
int zeros[100] = {0};     // First element 0, rest auto-initialized to 0
int auto_size[] = {1, 2, 3, 4};  // Size inferred as 4
```

Access elements using zero-based indexing:

```c
int arr[5] = {10, 20, 30, 40, 50};

printf("%d\n", arr[0]);   // 10 (first element)
printf("%d\n", arr[4]);   // 50 (last element)

arr[2] = 35;              // Modify third element
```

**Warning**: C doesn't check array bounds. Accessing `arr[5]` compiles but causes undefined behavior:

```c
int arr[5] = {1, 2, 3, 4, 5};
printf("%d\n", arr[10]);  // Compiles! But reads garbage/crashes
arr[10] = 100;            // Compiles! But corrupts memory
```

## Array Size

Calculate array size using `sizeof`:

```c
int arr[] = {1, 2, 3, 4, 5};
int size = sizeof(arr) / sizeof(arr[0]);  // 5
```

**Important**: This only works where the array is declared. When passed to functions, arrays decay to pointers:

```c
void printSize(int arr[]) {
    // WRONG: sizeof(arr) is pointer size, not array size
    int size = sizeof(arr) / sizeof(arr[0]);  // Usually 2 or 1
}
```

Always pass array size as a separate parameter.

## Iterating Over Arrays

```c
int arr[] = {10, 20, 30, 40, 50};
int size = 5;

// Forward iteration
for (int i = 0; i < size; i++) {
    printf("%d ", arr[i]);
}

// Reverse iteration
for (int i = size - 1; i >= 0; i--) {
    printf("%d ", arr[i]);
}
```

## Common Array Operations

**Finding Maximum/Minimum**:
```c
int findMax(int arr[], int size) {
    int max = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}
```

**Sum and Average**:
```c
double average(int arr[], int size) {
    int sum = 0;
    for (int i = 0; i < size; i++) {
        sum += arr[i];
    }
    return (double)sum / size;
}
```

**Linear Search**:
```c
int search(int arr[], int size, int target) {
    for (int i = 0; i < size; i++) {
        if (arr[i] == target) {
            return i;  // Found at index i
        }
    }
    return -1;  // Not found
}
```

**Reversing an Array**:
```c
void reverse(int arr[], int size) {
    for (int i = 0; i < size / 2; i++) {
        int temp = arr[i];
        arr[i] = arr[size - 1 - i];
        arr[size - 1 - i] = temp;
    }
}
```

## Strings in C

Strings are character arrays terminated by the null character `'\0'`:

```c
char greeting[] = "Hello";  // Actually stores: H e l l o \0

// Equivalent to:
char greeting[] = {'H', 'e', 'l', 'l', 'o', '\0'};
```

The null terminator marks the end of the string. Without it, string functions don't know where to stop.

```c
char word[10] = "Hi";
// word contains: H i \0 ? ? ? ? ? ? ?
// Only first 3 positions are meaningful
```

## String Operations

Include `<string.h>` for string functions:

```c
#include <string.h>

char str[] = "Hello";

// Length (not counting null terminator)
int len = strlen(str);  // 5

// Copy
char dest[20];
strcpy(dest, str);  // dest is now "Hello"

// Concatenate
strcat(dest, " World");  // dest is now "Hello World"

// Compare
int result = strcmp("abc", "abd");  // Negative (abc < abd)
result = strcmp("abc", "abc");      // 0 (equal)
result = strcmp("abd", "abc");      // Positive (abd > abc)
```

**Warning**: These functions don't check buffer sizes. Use safer alternatives when available:

```c
// Dangerous - no bounds checking
strcpy(dest, src);

// Safer - limits copy to n-1 characters
strncpy(dest, src, sizeof(dest) - 1);
dest[sizeof(dest) - 1] = '\0';  // Ensure null termination
```

## Reading Strings

```c
char name[50];

// scanf stops at whitespace
scanf("%s", name);  // "John Doe" becomes just "John"

// fgets reads entire line (safer)
fgets(name, sizeof(name), stdin);
// Note: fgets includes the newline character
```

Remove trailing newline from fgets:

```c
char input[100];
fgets(input, sizeof(input), stdin);

// Remove newline if present
size_t len = strlen(input);
if (len > 0 && input[len-1] == '\n') {
    input[len-1] = '\0';
}
```

## Character Operations

Characters are small integers. Use `<ctype.h>` for character functions:

```c
#include <ctype.h>

char c = 'A';

isalpha(c);   // True if letter
isdigit(c);   // True if digit
isspace(c);   // True if whitespace
isupper(c);   // True if uppercase
islower(c);   // True if lowercase

toupper('a'); // Returns 'A'
tolower('A'); // Returns 'a'
```

**Convert string to uppercase**:
```c
void toUpperCase(char *str) {
    for (int i = 0; str[i] != '\0'; i++) {
        str[i] = toupper(str[i]);
    }
}
```

## String Iteration

Iterate until you hit the null terminator:

```c
char str[] = "Hello";

// Using index
for (int i = 0; str[i] != '\0'; i++) {
    printf("%c ", str[i]);
}

// Using pointer (preview of Topic 2)
for (char *p = str; *p != '\0'; p++) {
    printf("%c ", *p);
}
```

**Count vowels**:
```c
int countVowels(char *str) {
    int count = 0;
    for (int i = 0; str[i] != '\0'; i++) {
        char c = tolower(str[i]);
        if (c == 'a' || c == 'e' || c == 'i' ||
            c == 'o' || c == 'u') {
            count++;
        }
    }
    return count;
}
```

## Multi-dimensional Arrays

C supports multi-dimensional arrays:

```c
int matrix[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

printf("%d\n", matrix[1][2]);  // 7

// Iterate over 2D array
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 4; j++) {
        printf("%d ", matrix[i][j]);
    }
    printf("\n");
}
```

Memory layout is row-major (rows are contiguous):

```
matrix[0][0], matrix[0][1], matrix[0][2], matrix[0][3],
matrix[1][0], matrix[1][1], matrix[1][2], matrix[1][3],
matrix[2][0], matrix[2][1], matrix[2][2], matrix[2][3]
```

## Array of Strings

An array of strings is a 2D character array:

```c
char names[3][20] = {
    "Alice",
    "Bob",
    "Charlie"
};

for (int i = 0; i < 3; i++) {
    printf("Hello, %s!\n", names[i]);
}
```

## Key Takeaways

- Arrays store fixed-size collections of same-type elements
- Indexing is zero-based; bounds aren't checked
- Strings are null-terminated character arrays
- Use `strlen`, `strcpy`, `strcat`, `strcmp` for string operations
- Always ensure buffers are large enough (prevent overflow)
- Pass array size as a separate parameter to functions
- `sizeof(array)` only works where the array is declared
- Multi-dimensional arrays are stored in row-major order

Arrays and strings form the foundation for more complex data structures. In Topic 2, we'll explore pointers—which provide a deeper understanding of how arrays actually work in memory.
