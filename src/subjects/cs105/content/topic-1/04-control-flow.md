---
id: cs105-t1-control-flow
title: "Control Flow Statements"
order: 4
---

# Control Flow Statements

Control flow statements determine which code executes based on conditions. They're the decision-making constructs that make programs dynamic and responsive.

## The if Statement

The simplest conditional structure executes code only when a condition is true:

```c
if (temperature > 100) {
    printf("Water is boiling\n");
}
```

Remember: in C, any non-zero value is considered true, and zero is false.

```c
int count = 5;
if (count) {  // True because count != 0
    printf("Count is non-zero\n");
}
```

## The if-else Statement

Execute one block or another based on a condition:

```c
if (age >= 18) {
    printf("You can vote\n");
} else {
    printf("Too young to vote\n");
}
```

## The if-else if-else Chain

Test multiple conditions in sequence:

```c
if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
} else if (score >= 70) {
    grade = 'C';
} else if (score >= 60) {
    grade = 'D';
} else {
    grade = 'F';
}
```

Conditions are tested in order—once one is true, remaining conditions aren't checked. Place more specific conditions first.

## Nested Conditionals

You can nest if statements, but deep nesting reduces readability:

```c
// Deeply nested - hard to follow
if (isLoggedIn) {
    if (hasPermission) {
        if (resourceExists) {
            accessResource();
        }
    }
}

// Better - use logical AND
if (isLoggedIn && hasPermission && resourceExists) {
    accessResource();
}

// Or use early returns (in functions)
if (!isLoggedIn) return;
if (!hasPermission) return;
if (!resourceExists) return;
accessResource();
```

## The switch Statement

For comparing a single value against multiple constants, `switch` is cleaner than many if-else chains:

```c
switch (dayOfWeek) {
    case 1:
        printf("Monday\n");
        break;
    case 2:
        printf("Tuesday\n");
        break;
    case 3:
        printf("Wednesday\n");
        break;
    case 4:
        printf("Thursday\n");
        break;
    case 5:
        printf("Friday\n");
        break;
    case 6:
    case 7:
        printf("Weekend!\n");
        break;
    default:
        printf("Invalid day\n");
}
```

**Critical**: Don't forget `break`! Without it, execution "falls through" to the next case:

```c
int x = 1;
switch (x) {
    case 1:
        printf("One\n");
        // No break - falls through!
    case 2:
        printf("Two\n");
        break;
}
// Output: "One" AND "Two"
```

Fall-through can be intentional (like the weekend example above), but always comment it:

```c
case 6:
case 7:
    // Fall through - both are weekend
    printf("Weekend!\n");
    break;
```

## Switch Limitations

The `switch` statement has restrictions:
- Only works with integer types (including char)
- Case values must be compile-time constants
- Cannot use ranges or expressions

```c
// These are INVALID:
switch (name) { ... }           // Can't switch on strings
case x:                         // Variable not allowed
case 1..10:                     // Ranges not allowed
case a + b:                     // Expressions not allowed

// These are VALID:
switch (ch) {
    case 'A':                   // Character constant
    case 65:                    // Integer constant
    case 'A' + 1:              // Constant expression (evaluates at compile time)
}
```

## Conditional Expression Gotchas

Be careful with these common mistakes:

**Assignment vs Comparison**:
```c
if (x = 0) {  // WRONG: assigns 0 to x, always false
    // Never executes
}

if (x == 0) {  // CORRECT: compares x to 0
    // Executes when x is 0
}

// Defensive technique: put constant first
if (0 == x) {  // Compiler error if you accidentally use =
    // ...
}
```

**Dangling Else**:
```c
// Which 'if' does the 'else' belong to?
if (a > 0)
    if (b > 0)
        printf("Both positive\n");
else
    printf("a is not positive... or is it?\n");

// The else belongs to the NEAREST if (the inner one)!
// Use braces to make intent clear:
if (a > 0) {
    if (b > 0) {
        printf("Both positive\n");
    }
} else {
    printf("a is not positive\n");
}
```

## Boolean Logic in Conditions

Combine conditions effectively:

```c
// Check range
if (x >= 0 && x <= 100) {
    printf("x is in valid range\n");
}

// Check multiple values
if (ch == 'y' || ch == 'Y') {
    printf("User confirmed\n");
}

// Negate complex conditions
if (!(x >= 0 && x <= 100)) {
    printf("x is out of range\n");
}

// De Morgan's Laws: the above is equivalent to
if (x < 0 || x > 100) {
    printf("x is out of range\n");
}
```

## Practical Patterns

**Input Validation**:
```c
char choice;
printf("Continue? (y/n): ");
scanf(" %c", &choice);

if (choice == 'y' || choice == 'Y') {
    continueProcessing();
} else if (choice == 'n' || choice == 'N') {
    exitProgram();
} else {
    printf("Invalid choice\n");
}
```

**Menu Selection**:
```c
int option;
printf("1. New Game\n2. Load Game\n3. Options\n4. Quit\n");
scanf("%d", &option);

switch (option) {
    case 1:
        newGame();
        break;
    case 2:
        loadGame();
        break;
    case 3:
        showOptions();
        break;
    case 4:
        quit();
        break;
    default:
        printf("Please enter 1-4\n");
}
```

**Error Handling Pattern**:
```c
FILE *file = fopen("data.txt", "r");
if (file == NULL) {
    printf("Error: Could not open file\n");
    return 1;  // Exit with error code
}
// Continue with file operations...
```

## Key Takeaways

- `if` statements execute code conditionally based on boolean expressions
- `else if` chains test multiple mutually exclusive conditions
- `switch` is cleaner for comparing one value against many constants
- Always use `break` in switch cases (unless fall-through is intentional)
- Use braces consistently to avoid dangling else problems
- Non-zero values are true; zero is false
- Prefer clear, explicit conditions over clever shortcuts

Control flow combined with loops (covered next) enables you to write programs that can handle any computational task.
