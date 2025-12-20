---
id: cs105-t7-enums
title: "Enumerations"
order: 4
---

# Enumerations

Enumerations (enums) define named integer constants, improving code readability and type safety. They're essential for representing fixed sets of related values like states, options, and error codes.

## Basic Enums

### Definition

```c
enum Color {
    RED,      // 0
    GREEN,    // 1
    BLUE      // 2
};

enum Color c = RED;
printf("Color: %d\n", c);  // 0
```

### Explicit Values

```c
enum HttpStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500
};
```

### Mixed Assignment

```c
enum Priority {
    LOW = 1,
    MEDIUM,     // 2 (auto-incremented)
    HIGH,       // 3
    CRITICAL = 10,
    EMERGENCY   // 11
};
```

## Enum as Type

### Type Safety

```c
enum Direction { NORTH, SOUTH, EAST, WEST };
enum Color { RED, GREEN, BLUE };

enum Direction dir = NORTH;
enum Color col = RED;

// Warning: different enum types (in strict compilers)
dir = RED;  // Compiles, but logically wrong
```

### Typedef Pattern

```c
typedef enum {
    STATE_IDLE,
    STATE_RUNNING,
    STATE_PAUSED,
    STATE_STOPPED
} State;

State current_state = STATE_IDLE;
```

## Practical Patterns

### State Machines

```c
typedef enum {
    PARSER_START,
    PARSER_IN_TAG,
    PARSER_IN_ATTR,
    PARSER_IN_VALUE,
    PARSER_ERROR
} ParserState;

ParserState parse_next(ParserState state, char c) {
    switch (state) {
        case PARSER_START:
            if (c == '<') return PARSER_IN_TAG;
            return PARSER_START;
        case PARSER_IN_TAG:
            if (c == ' ') return PARSER_IN_ATTR;
            if (c == '>') return PARSER_START;
            return PARSER_IN_TAG;
        // ... more cases
        default:
            return PARSER_ERROR;
    }
}
```

### Error Codes

```c
typedef enum {
    ERR_SUCCESS = 0,
    ERR_INVALID_ARGUMENT = -1,
    ERR_OUT_OF_MEMORY = -2,
    ERR_FILE_NOT_FOUND = -3,
    ERR_PERMISSION_DENIED = -4,
    ERR_NETWORK_FAILURE = -5
} ErrorCode;

const char* error_to_string(ErrorCode err) {
    switch (err) {
        case ERR_SUCCESS: return "Success";
        case ERR_INVALID_ARGUMENT: return "Invalid argument";
        case ERR_OUT_OF_MEMORY: return "Out of memory";
        case ERR_FILE_NOT_FOUND: return "File not found";
        case ERR_PERMISSION_DENIED: return "Permission denied";
        case ERR_NETWORK_FAILURE: return "Network failure";
        default: return "Unknown error";
    }
}
```

### Option Flags

```c
typedef enum {
    OPT_NONE = 0,
    OPT_VERBOSE = (1 << 0),    // 1
    OPT_DEBUG = (1 << 1),      // 2
    OPT_FORCE = (1 << 2),      // 4
    OPT_RECURSIVE = (1 << 3)   // 8
} Options;

void process(Options opts) {
    if (opts & OPT_VERBOSE) {
        printf("Verbose mode enabled\n");
    }
    if (opts & OPT_DEBUG) {
        printf("Debug mode enabled\n");
    }
}

// Combine flags
process(OPT_VERBOSE | OPT_DEBUG);
```

## Enum Iteration

### Using Array of Values

```c
typedef enum {
    DAY_MONDAY,
    DAY_TUESDAY,
    DAY_WEDNESDAY,
    DAY_THURSDAY,
    DAY_FRIDAY,
    DAY_SATURDAY,
    DAY_SUNDAY,
    DAY_COUNT  // Sentinel for iteration
} Day;

for (Day d = DAY_MONDAY; d < DAY_COUNT; d++) {
    printf("Day %d\n", d);
}
```

### String Lookup Table

```c
const char* day_names[] = {
    [DAY_MONDAY] = "Monday",
    [DAY_TUESDAY] = "Tuesday",
    [DAY_WEDNESDAY] = "Wednesday",
    [DAY_THURSDAY] = "Thursday",
    [DAY_FRIDAY] = "Friday",
    [DAY_SATURDAY] = "Saturday",
    [DAY_SUNDAY] = "Sunday"
};

printf("Today is %s\n", day_names[DAY_MONDAY]);
```

## X-Macro Pattern

### Auto-Generate Enum and Strings

```c
#define DAYS(X) \
    X(MONDAY) \
    X(TUESDAY) \
    X(WEDNESDAY) \
    X(THURSDAY) \
    X(FRIDAY) \
    X(SATURDAY) \
    X(SUNDAY)

// Generate enum
#define X(name) DAY_##name,
typedef enum { DAYS(X) DAY_COUNT } Day;
#undef X

// Generate string array
#define X(name) #name,
const char* day_strings[] = { DAYS(X) };
#undef X

// Usage
Day d = DAY_FRIDAY;
printf("%s\n", day_strings[d]);  // "FRIDAY"
```

## Enum Size

### Default Size

Enums are typically `int` sized:

```c
enum Small { A, B, C };
printf("Size: %zu\n", sizeof(enum Small));  // Usually 4
```

### Packed Enums (GCC/Clang)

```c
enum __attribute__((packed)) TinyEnum {
    VAL_A, VAL_B, VAL_C
};
printf("Size: %zu\n", sizeof(enum TinyEnum));  // May be 1
```

### Fixed Underlying Type (C23)

```c
// C23 feature
enum Color : uint8_t {
    RED, GREEN, BLUE
};
```

## Enum in Structures

### Compact Layout

```c
typedef struct {
    uint8_t type;    // Store enum as smaller type
    uint8_t flags;
    uint16_t length;
} Header;

// But use full enum for type safety in code
typedef enum { TYPE_A, TYPE_B, TYPE_C } Type;

Header h;
h.type = (uint8_t)TYPE_A;
```

## Forward Declaration

```c
// Forward declare enum (requires explicit size in C)
enum Status;  // Not standard, but some compilers support it

// Better: use typedef and forward declare struct
typedef struct StatusStruct StatusStruct;
```

## Common Mistakes

### Missing Break in Switch

```c
// BUG: falls through to GREEN case
switch (color) {
    case RED:
        handle_red();
    case GREEN:  // Missing break!
        handle_green();
        break;
}
```

### Out of Range Values

```c
enum Color { RED, GREEN, BLUE };
enum Color c = 42;  // Compiles, but invalid!

// Defensive programming
if (c < RED || c > BLUE) {
    handle_error();
}
```

### Comparing Different Enums

```c
enum Color { RED, GREEN, BLUE };
enum Size { SMALL, MEDIUM, LARGE };

// This compiles and RED == SMALL (both 0)
if (RED == SMALL) {  // Logically wrong!
    // ...
}
```

## Best Practices

1. **Use ALL_CAPS** for enum constants
2. **Add prefix** to avoid collisions: `COLOR_RED`, `STATE_IDLE`
3. **Include COUNT sentinel** for iteration
4. **Create string conversion** functions
5. **Use typedef** for cleaner declarations
6. **Handle default case** in switches
7. **Validate enum values** from external sources

## Summary

Enumerations provide:
- Named constants for readability
- Semantic grouping of related values
- Compile-time type checking
- Switch statement support
- Foundation for state machines

Use enums to replace magic numbers and create self-documenting code.
