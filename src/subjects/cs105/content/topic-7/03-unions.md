---
id: cs105-t7-unions
title: "Unions"
order: 3
---

# Unions

Unions are a C feature that allows multiple members to share the same memory location. This enables type punning, memory reinterpretation, and space-efficient variant types.

## Union Basics

### Definition

All members of a union occupy the same memory:

```c
union Data {
    int i;
    float f;
    char str[20];
};

printf("Size: %zu\n", sizeof(union Data));  // 20 (size of largest member)
```

### Memory Layout

```
Union Data (20 bytes total):
+-------------------+
|    i (4 bytes)    |
|    f (4 bytes)    |   All share same starting address
|  str (20 bytes)   |
+-------------------+
```

### Basic Usage

```c
union Data data;

data.i = 42;
printf("Integer: %d\n", data.i);

data.f = 3.14f;
printf("Float: %f\n", data.f);

strcpy(data.str, "Hello");
printf("String: %s\n", data.str);

// Warning: data.i and data.f are now garbage!
```

## Type Punning

### Viewing Memory Differently

```c
union FloatBits {
    float f;
    uint32_t bits;
};

union FloatBits fb;
fb.f = 1.0f;
printf("Bits of 1.0f: 0x%08X\n", fb.bits);  // 0x3F800000
```

### IEEE 754 Float Inspection

```c
void inspect_float(float f) {
    union {
        float f;
        uint32_t bits;
    } u = { .f = f };

    uint32_t sign = (u.bits >> 31) & 1;
    uint32_t exponent = (u.bits >> 23) & 0xFF;
    uint32_t mantissa = u.bits & 0x7FFFFF;

    printf("Sign: %u, Exponent: %u, Mantissa: 0x%06X\n",
           sign, exponent, mantissa);
}
```

### Fast Inverse Square Root (Historical)

```c
// Famous Quake III algorithm
float fast_inv_sqrt(float x) {
    union {
        float f;
        uint32_t i;
    } conv = { .f = x };

    conv.i = 0x5F3759DF - (conv.i >> 1);
    conv.f *= 1.5f - (x * 0.5f * conv.f * conv.f);
    return conv.f;
}
```

## Variant Types

### Tagged Union Pattern

```c
typedef enum {
    TYPE_INT,
    TYPE_FLOAT,
    TYPE_STRING
} ValueType;

typedef struct {
    ValueType type;
    union {
        int i;
        float f;
        char* str;
    } data;
} Value;

void print_value(Value* v) {
    switch (v->type) {
        case TYPE_INT:
            printf("Int: %d\n", v->data.i);
            break;
        case TYPE_FLOAT:
            printf("Float: %f\n", v->data.f);
            break;
        case TYPE_STRING:
            printf("String: %s\n", v->data.str);
            break;
    }
}

// Usage
Value v;
v.type = TYPE_INT;
v.data.i = 42;
print_value(&v);
```

### JSON-like Value Type

```c
typedef enum {
    JSON_NULL,
    JSON_BOOL,
    JSON_NUMBER,
    JSON_STRING,
    JSON_ARRAY,
    JSON_OBJECT
} JsonType;

typedef struct JsonValue JsonValue;
typedef struct JsonArray JsonArray;
typedef struct JsonObject JsonObject;

struct JsonValue {
    JsonType type;
    union {
        bool boolean;
        double number;
        char* string;
        JsonArray* array;
        JsonObject* object;
    };
};
```

## Anonymous Unions (C11)

### Direct Member Access

```c
struct Point3D {
    union {
        struct { float x, y, z; };
        float coords[3];
    };
};

struct Point3D p = { .x = 1.0f, .y = 2.0f, .z = 3.0f };
printf("x=%f, coords[0]=%f\n", p.x, p.coords[0]);  // Both 1.0
```

### Event System

```c
typedef struct {
    int type;
    union {
        struct { int x, y; } mouse;
        struct { int key, mod; } keyboard;
        struct { int width, height; } resize;
    };
} Event;

void handle_event(Event* e) {
    switch (e->type) {
        case EVENT_MOUSE:
            printf("Mouse at %d, %d\n", e->mouse.x, e->mouse.y);
            break;
        case EVENT_KEY:
            printf("Key %d with mod %d\n", e->keyboard.key, e->keyboard.mod);
            break;
    }
}
```

## Network Protocol Parsing

### Packet Header

```c
typedef struct {
    uint8_t version;
    uint8_t type;
    uint16_t length;
    union {
        struct {
            uint32_t src_ip;
            uint32_t dst_ip;
        } ipv4;
        struct {
            uint8_t src_ip[16];
            uint8_t dst_ip[16];
        } ipv6;
    } addr;
} PacketHeader;
```

### Endian Conversion

```c
union Endian {
    uint32_t value;
    uint8_t bytes[4];
};

uint32_t read_be32(const uint8_t* data) {
    union Endian e;
    e.bytes[0] = data[0];  // MSB
    e.bytes[1] = data[1];
    e.bytes[2] = data[2];
    e.bytes[3] = data[3];  // LSB
    return __builtin_bswap32(e.value);  // Convert to host order
}
```

## Hardware Register Access

### Memory-Mapped I/O

```c
typedef union {
    uint32_t raw;
    struct {
        uint32_t enable : 1;
        uint32_t mode : 2;
        uint32_t speed : 3;
        uint32_t reserved : 26;
    } bits;
} ControlRegister;

volatile ControlRegister* ctrl = (ControlRegister*)0x40000000;
ctrl->bits.enable = 1;
ctrl->bits.mode = 2;
```

## Undefined Behavior Considerations

### Strict Aliasing

Type punning through unions is well-defined in C, but:

```c
// OK in C
union { int i; float f; } u;
u.f = 1.0f;
int bits = u.i;  // Well-defined in C

// AVOID - pointer casting violates strict aliasing
float f = 1.0f;
int bits = *(int*)&f;  // Undefined behavior!
```

### Use memcpy for Safety

```c
// Guaranteed safe alternative
float f = 1.0f;
uint32_t bits;
memcpy(&bits, &f, sizeof(bits));
```

## Best Practices

1. **Always use tagged unions** for variant types
2. **Document which member is valid**
3. **Initialize before use**
4. **Prefer memcpy** for type punning in critical code
5. **Be aware of alignment** and padding
6. **Use anonymous unions** for cleaner syntax (C11)

## Common Mistakes

### Reading Wrong Member

```c
union Data d;
d.f = 3.14f;
printf("%d\n", d.i);  // Garbage! Not the integer 3
```

### Forgetting Tag Update

```c
Value v;
v.type = TYPE_INT;
v.data.i = 42;

v.data.f = 3.14f;
// Forgot: v.type = TYPE_FLOAT;
print_value(&v);  // Will print garbage as int!
```

## Summary

Unions provide:
- Memory sharing between types
- Type punning for bit manipulation
- Variant/discriminated types
- Hardware register access
- Network protocol parsing

Use carefully with proper type tracking and documentation.
