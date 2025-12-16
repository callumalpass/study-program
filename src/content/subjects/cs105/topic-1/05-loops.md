# Loops

Loops enable repetitive execution of code blocks. C provides three loop constructs, each suited to different situations.

## The for Loop

The `for` loop is ideal when you know in advance how many iterations you need:

```c
for (initialization; condition; update) {
    // Loop body
}
```

Example:

```c
for (int i = 0; i < 5; i++) {
    printf("%d\n", i);
}
// Output: 0, 1, 2, 3, 4
```

The three parts:
1. **Initialization**: Runs once before the loop starts
2. **Condition**: Checked before each iteration; loop continues while true
3. **Update**: Runs after each iteration

You can iterate in different ways:

```c
// Count down
for (int i = 10; i >= 0; i--) {
    printf("%d...\n", i);
}

// Skip by 2
for (int i = 0; i < 100; i += 2) {
    printf("%d is even\n", i);
}

// Multiple variables
for (int i = 0, j = 10; i < j; i++, j--) {
    printf("i=%d, j=%d\n", i, j);
}
```

## The while Loop

The `while` loop continues while a condition is true. Use it when you don't know how many iterations you'll need:

```c
while (condition) {
    // Loop body
}
```

Example:

```c
int num = 1;
while (num <= 100) {
    printf("%d\n", num);
    num *= 2;  // 1, 2, 4, 8, 16, 32, 64
}
```

Reading input until a sentinel value:

```c
int value;
printf("Enter numbers (0 to stop):\n");
scanf("%d", &value);

while (value != 0) {
    printf("You entered: %d\n", value);
    scanf("%d", &value);
}
```

## The do-while Loop

The `do-while` loop executes the body at least once, then checks the condition:

```c
do {
    // Loop body (executes at least once)
} while (condition);
```

This is perfect for input validation:

```c
int choice;
do {
    printf("Enter a number between 1 and 10: ");
    scanf("%d", &choice);
} while (choice < 1 || choice > 10);

printf("Valid input: %d\n", choice);
```

Compare with `while`:

```c
// while: condition checked BEFORE first execution
int x = 10;
while (x < 5) {
    printf("%d\n", x);  // Never executes
}

// do-while: body executes FIRST, then condition checked
int y = 10;
do {
    printf("%d\n", y);  // Prints 10
} while (y < 5);
```

## Loop Control Statements

**break** exits the loop immediately:

```c
for (int i = 0; i < 100; i++) {
    if (i == 5) {
        break;  // Exit loop when i reaches 5
    }
    printf("%d\n", i);
}
// Output: 0, 1, 2, 3, 4
```

**continue** skips to the next iteration:

```c
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) {
        continue;  // Skip even numbers
    }
    printf("%d\n", i);
}
// Output: 1, 3, 5, 7, 9
```

## Nested Loops

Loops can be nested for multi-dimensional operations:

```c
// Multiplication table
for (int i = 1; i <= 10; i++) {
    for (int j = 1; j <= 10; j++) {
        printf("%4d", i * j);
    }
    printf("\n");
}
```

`break` and `continue` only affect the innermost loop:

```c
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (j == 1) break;  // Only breaks inner loop
        printf("(%d,%d) ", i, j);
    }
    printf("\n");
}
// Output:
// (0,0)
// (1,0)
// (2,0)
```

To break out of multiple loops, use a flag or goto:

```c
// Using a flag
int found = 0;
for (int i = 0; i < 10 && !found; i++) {
    for (int j = 0; j < 10 && !found; j++) {
        if (matrix[i][j] == target) {
            printf("Found at (%d, %d)\n", i, j);
            found = 1;
        }
    }
}
```

## Infinite Loops

Sometimes you want a loop that runs forever (until explicitly broken):

```c
// Using for
for (;;) {
    // Run until break
}

// Using while
while (1) {
    // Run until break
}
```

Useful for event loops and servers:

```c
while (1) {
    char command[100];
    printf("> ");
    scanf("%s", command);

    if (strcmp(command, "quit") == 0) {
        break;
    }

    processCommand(command);
}
```

## Common Loop Patterns

**Accumulator**:
```c
int sum = 0;
for (int i = 1; i <= 100; i++) {
    sum += i;
}
printf("Sum 1-100: %d\n", sum);  // 5050
```

**Search**:
```c
int numbers[] = {4, 8, 15, 16, 23, 42};
int target = 16;
int found = -1;

for (int i = 0; i < 6; i++) {
    if (numbers[i] == target) {
        found = i;
        break;
    }
}

if (found >= 0) {
    printf("Found at index %d\n", found);
}
```

**Counting**:
```c
char str[] = "Hello, World!";
int vowels = 0;

for (int i = 0; str[i] != '\0'; i++) {
    char c = str[i];
    if (c == 'a' || c == 'e' || c == 'i' ||
        c == 'o' || c == 'u' ||
        c == 'A' || c == 'E' || c == 'I' ||
        c == 'O' || c == 'U') {
        vowels++;
    }
}
printf("Vowels: %d\n", vowels);
```

**Processing Arrays**:
```c
int arr[] = {1, 2, 3, 4, 5};
int size = sizeof(arr) / sizeof(arr[0]);

// Find maximum
int max = arr[0];
for (int i = 1; i < size; i++) {
    if (arr[i] > max) {
        max = arr[i];
    }
}
```

## Loop Pitfalls

**Off-by-one errors**:
```c
// WRONG: Accesses arr[5] which doesn't exist
for (int i = 0; i <= 5; i++) {
    printf("%d\n", arr[i]);
}

// CORRECT: Use < not <=
for (int i = 0; i < 5; i++) {
    printf("%d\n", arr[i]);
}
```

**Infinite loop by mistake**:
```c
// WRONG: i will overflow and wrap around
for (unsigned int i = 10; i >= 0; i--) {
    // Infinite loop! unsigned can't be negative
}

// CORRECT: Use signed int for countdown
for (int i = 10; i >= 0; i--) {
    // Works correctly
}
```

**Modifying loop variable**:
```c
// BAD: Confusing and error-prone
for (int i = 0; i < 10; i++) {
    if (someCondition) {
        i++;  // Don't do this
    }
}
```

## Key Takeaways

- `for` loops: Use when iteration count is known
- `while` loops: Use when iteration count is unknown
- `do-while` loops: Use when you need at least one execution
- `break` exits the loop; `continue` skips to next iteration
- Be careful with loop bounds to avoid off-by-one errors
- Nested loops multiply iterations—watch for performance
- Use meaningful loop variable names beyond just `i`, `j`, `k`

Loops and conditionals form the backbone of program logic. Next, we'll learn how to organize code into reusable functions.
