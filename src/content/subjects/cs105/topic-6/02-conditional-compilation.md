# Conditional Compilation

Conditional compilation allows different code to be compiled based on preprocessor conditions. This enables platform-specific code, debug builds, feature toggles, and configurable software.

## Basic Directives

### `#if`, `#elif`, `#else`, `#endif`

```c
#define VERSION 2

#if VERSION == 1
    printf("Version 1\n");
#elif VERSION == 2
    printf("Version 2\n");
#else
    printf("Unknown version\n");
#endif
```

### `#ifdef` and `#ifndef`

Test whether a macro is defined:

```c
#ifdef DEBUG
    printf("Debug mode enabled\n");
#endif

#ifndef BUFFER_SIZE
    #define BUFFER_SIZE 1024
#endif
```

Equivalent forms:

```c
#ifdef MACRO      // Equivalent to: #if defined(MACRO)
#ifndef MACRO     // Equivalent to: #if !defined(MACRO)
```

## The `defined` Operator

Combine multiple conditions:

```c
#if defined(LINUX) || defined(BSD)
    #include <unistd.h>
#elif defined(WINDOWS)
    #include <windows.h>
#endif

#if defined(DEBUG) && !defined(NDEBUG)
    // Debug code
#endif
```

## Common Use Cases

### Debug Builds

```c
#ifdef DEBUG
    #define DEBUG_LOG(msg) fprintf(stderr, "[DEBUG] %s\n", msg)
    #define ASSERT(cond) assert(cond)
#else
    #define DEBUG_LOG(msg) ((void)0)
    #define ASSERT(cond) ((void)0)
#endif
```

### Platform-Specific Code

```c
#if defined(_WIN32) || defined(_WIN64)
    #define PLATFORM_WINDOWS
    #include <windows.h>
    void sleep_ms(int ms) { Sleep(ms); }
#elif defined(__linux__)
    #define PLATFORM_LINUX
    #include <unistd.h>
    void sleep_ms(int ms) { usleep(ms * 1000); }
#elif defined(__APPLE__)
    #define PLATFORM_MACOS
    #include <unistd.h>
    void sleep_ms(int ms) { usleep(ms * 1000); }
#else
    #error "Unsupported platform"
#endif
```

### Feature Flags

```c
// config.h
#define FEATURE_LOGGING 1
#define FEATURE_ENCRYPTION 0
#define FEATURE_COMPRESSION 1

// main.c
#if FEATURE_LOGGING
    #include "logging.h"
#endif

#if FEATURE_ENCRYPTION
    #include "encryption.h"
#endif
```

### API Versioning

```c
#define API_VERSION 3

#if API_VERSION >= 2
    void new_function(void);
#endif

#if API_VERSION >= 3
    void newest_function(void);
#endif

// Deprecation warnings
#if API_VERSION < 2
    #warning "API version 1 is deprecated"
#endif
```

## Compiler Detection

Detect specific compilers:

```c
#if defined(__GNUC__)
    #define COMPILER "GCC"
    #define UNUSED __attribute__((unused))
#elif defined(_MSC_VER)
    #define COMPILER "MSVC"
    #define UNUSED __pragma(warning(suppress: 4100))
#elif defined(__clang__)
    #define COMPILER "Clang"
    #define UNUSED __attribute__((unused))
#else
    #define COMPILER "Unknown"
    #define UNUSED
#endif
```

## `#error` and `#warning`

Generate compiler messages:

```c
#ifndef CONFIG_DEFINED
    #error "Configuration not defined! Include config.h first."
#endif

#if BUFFER_SIZE < 256
    #warning "Buffer size is very small"
#endif
```

## `#pragma`

Compiler-specific directives:

```c
// Suppress warnings
#pragma GCC diagnostic push
#pragma GCC diagnostic ignored "-Wunused-variable"
int unused_var;
#pragma GCC diagnostic pop

// Structure packing
#pragma pack(push, 1)
struct PackedData {
    char a;
    int b;
};
#pragma pack(pop)

// Mark code sections
#pragma region Initialization
// ... code ...
#pragma endregion
```

## Arithmetic in Conditions

Preprocessor supports integer arithmetic:

```c
#define MAJOR 2
#define MINOR 5
#define VERSION ((MAJOR * 100) + MINOR)

#if VERSION >= 205
    // Code for version 2.5+
#endif

#if (BUFFER_SIZE % 4) != 0
    #error "Buffer size must be multiple of 4"
#endif
```

## Nested Conditionals

```c
#ifdef FEATURE_A
    #ifdef FEATURE_B
        // Both A and B enabled
    #else
        // Only A enabled
    #endif
#else
    #ifdef FEATURE_B
        // Only B enabled
    #else
        // Neither enabled
    #endif
#endif
```

## Best Practices

### Use Meaningful Names

```c
// BAD
#ifdef X
    // ...
#endif

// GOOD
#ifdef ENABLE_LOGGING
    // ...
#endif
```

### Centralize Configuration

```c
// config.h - single point of truth
#define DEBUG_BUILD 1
#define ENABLE_LOGGING 1
#define PLATFORM_LINUX 1
#define MAX_CONNECTIONS 100
```

### Document Conditions

```c
/*
 * ENABLE_ENCRYPTION: Enable AES encryption for data storage
 * Requires: OpenSSL library
 * Default: disabled
 */
#ifndef ENABLE_ENCRYPTION
    #define ENABLE_ENCRYPTION 0
#endif
```

### Avoid Deep Nesting

```c
// Instead of deep nesting, combine conditions:
#if defined(DEBUG) && defined(VERBOSE) && !defined(QUIET)
    // Debug verbose mode
#endif
```

## Common Patterns

### Include Once Pattern

```c
// Before include guards were standard
#ifndef MYHEADER_H
#define MYHEADER_H

// Header contents

#endif // MYHEADER_H
```

### Extern "C" for C++

```c
#ifdef __cplusplus
extern "C" {
#endif

// C function declarations

#ifdef __cplusplus
}
#endif
```

## Summary

Conditional compilation enables:
- Debug vs release builds
- Platform-specific implementations
- Feature toggles and configuration
- Compiler and version detection
- Graceful degradation
- API versioning

Use it to create portable, configurable, and maintainable code.
