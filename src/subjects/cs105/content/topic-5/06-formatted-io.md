---
id: cs105-t5-formatted
title: "Formatted I/O"
order: 6
---

# Formatted I/O

Formatted I/O functions provide powerful text parsing and generation capabilities. Understanding format specifiers and their options is essential for robust input/output handling.

## Printf Family

### Basic Functions

```c
printf(format, ...);           // Write to stdout
fprintf(file, format, ...);    // Write to file
sprintf(str, format, ...);     // Write to string (unsafe!)
snprintf(str, n, format, ...); // Write to string (safe)
```

### Format Specifiers

```c
printf("%d\n", 42);        // Decimal integer
printf("%i\n", 42);        // Integer (same as %d)
printf("%u\n", 42u);       // Unsigned integer
printf("%ld\n", 42L);      // Long integer
printf("%lld\n", 42LL);    // Long long integer
printf("%zu\n", sizeof(x)); // size_t

printf("%f\n", 3.14);      // Float/double
printf("%e\n", 3.14);      // Scientific notation
printf("%g\n", 3.14);      // Shorter of %f or %e

printf("%c\n", 'A');       // Character
printf("%s\n", "hello");   // String

printf("%p\n", ptr);       // Pointer address
printf("%x\n", 255);       // Hexadecimal (lowercase)
printf("%X\n", 255);       // Hexadecimal (uppercase)
printf("%o\n", 8);         // Octal
printf("%%\n");            // Literal percent sign
```

### Width and Precision

```c
// Minimum width
printf("[%10d]\n", 42);     // [        42]
printf("[%-10d]\n", 42);    // [42        ]

// Precision for floats (digits after decimal)
printf("[%.2f]\n", 3.14159); // [3.14]
printf("[%10.2f]\n", 3.14);  // [      3.14]

// Precision for strings (max chars)
printf("[%.5s]\n", "hello world"); // [hello]

// Dynamic width/precision
printf("[%*d]\n", 10, 42);        // Width from argument
printf("[%.*f]\n", 3, 3.14159);   // Precision from argument
printf("[%*.*f]\n", 10, 2, 3.14); // Both from arguments
```

### Flags

```c
printf("[%+d]\n", 42);     // [+42] - always show sign
printf("[% d]\n", 42);     // [ 42] - space for positive
printf("[%08d]\n", 42);    // [00000042] - zero padding
printf("[%-8d]\n", 42);    // [42      ] - left align
printf("[%#x]\n", 255);    // [0xff] - alternate form
printf("[%#o]\n", 8);      // [010] - alternate form
```

## Scanf Family

### Basic Functions

```c
scanf(format, ...);           // Read from stdin
fscanf(file, format, ...);    // Read from file
sscanf(str, format, ...);     // Read from string
```

### Reading Data

```c
int n;
double x;
char name[50];

scanf("%d", &n);           // Read integer
scanf("%lf", &x);          // Read double (note: lf not f!)
scanf("%49s", name);       // Read string (with limit!)
scanf("%49[^\n]", name);   // Read line (up to 49 chars)
```

### Return Value

```c
// scanf returns number of items successfully read
int count = scanf("%d %d %d", &a, &b, &c);
if (count != 3) {
    printf("Error: expected 3 integers\n");
}

// Check for EOF
if (scanf("%d", &n) == EOF) {
    printf("End of input\n");
}
```

### Scansets

```c
char word[50];
char line[100];

scanf("%49[a-z]", word);        // Only lowercase letters
scanf("%49[0-9]", word);        // Only digits
scanf("%49[^,\n]", word);       // Until comma or newline
scanf("%99[^\n]%*c", line);     // Read line, skip newline
```

### Suppressing Assignment

```c
int year, month, day;

// Skip unwanted fields with *
scanf("%d-%d-%d", &year, &month, &day);    // 2024-06-15
scanf("%*s %d", &n);   // Skip word, read int
```

## Safe String Operations

### snprintf

```c
char buffer[100];

// Always safe - won't overflow
int len = snprintf(buffer, sizeof(buffer),
                   "Name: %s, Age: %d", name, age);

if (len >= sizeof(buffer)) {
    printf("Output truncated!\n");
}
```

### Avoiding Buffer Overflow

```c
// DANGEROUS
char buf[10];
sprintf(buf, "%s", user_input);  // May overflow!

// SAFE
char buf[10];
snprintf(buf, sizeof(buf), "%s", user_input);

// Even safer with scanf
char name[50];
scanf("%49s", name);  // Leave room for null terminator
```

## Error Handling

### Check Return Values

```c
FILE* f = fopen("data.txt", "r");
int x, y;

if (fscanf(f, "%d %d", &x, &y) != 2) {
    fprintf(stderr, "Invalid input format\n");
    fclose(f);
    return -1;
}
```

### Clear Input Buffer

```c
// After failed scanf, clear the buffer
void clear_input_buffer(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF);
}

int n;
while (scanf("%d", &n) != 1) {
    printf("Please enter a valid integer: ");
    clear_input_buffer();
}
```

## Parsing Complex Formats

### CSV Parsing

```c
void parse_csv_line(const char* line) {
    char name[50];
    int age;
    double salary;

    if (sscanf(line, "%49[^,],%d,%lf", name, &age, &salary) == 3) {
        printf("Name: %s, Age: %d, Salary: %.2f\n",
               name, age, salary);
    }
}
```

### Date Parsing

```c
void parse_date(const char* str) {
    int year, month, day;

    // Try different formats
    if (sscanf(str, "%d-%d-%d", &year, &month, &day) == 3 ||
        sscanf(str, "%d/%d/%d", &month, &day, &year) == 3) {
        printf("Date: %04d-%02d-%02d\n", year, month, day);
    } else {
        printf("Unrecognized date format\n");
    }
}
```

## Printf Format String Building

### Dynamic Format Strings

```c
void print_table(int* data, int rows, int cols) {
    // Calculate column width
    int max = find_max(data, rows * cols);
    int width = snprintf(NULL, 0, "%d", max) + 1;

    // Build format string
    char fmt[20];
    snprintf(fmt, sizeof(fmt), "%%%dd", width);

    for (int r = 0; r < rows; r++) {
        for (int c = 0; c < cols; c++) {
            printf(fmt, data[r * cols + c]);
        }
        printf("\n");
    }
}
```

## Best Practices

1. **Always limit string reads** - Use width specifiers
2. **Check return values** - Validate successful reads
3. **Use snprintf** - Never sprintf
4. **Clear buffers** - After read failures
5. **Handle EOF** - Check for end of input

```c
// Robust integer reading
bool read_int(int* value) {
    if (scanf("%d", value) != 1) {
        clear_input_buffer();
        return false;
    }
    return true;
}
```

## Summary

Formatted I/O provides powerful text handling:
- printf/scanf families for flexible formatting
- Format specifiers control representation
- Width and precision for alignment
- Safe functions (snprintf) prevent overflows
- Return values indicate success/failure
- Scansets enable complex parsing
