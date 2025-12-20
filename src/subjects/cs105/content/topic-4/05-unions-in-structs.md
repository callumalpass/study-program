# Unions in Structures

Combining unions with structures enables powerful data modeling patterns including variant types, memory-efficient storage, and type-safe discriminated unions.

## Embedded Unions

### Basic Pattern

```c
struct Value {
    int type;
    union {
        int integer;
        double floating;
        char* string;
    } data;
};

void print_value(struct Value* v) {
    switch (v->type) {
        case 0: printf("%d\n", v->data.integer); break;
        case 1: printf("%f\n", v->data.floating); break;
        case 2: printf("%s\n", v->data.string); break;
    }
}
```

### Anonymous Unions (C11)

```c
struct Value {
    int type;
    union {
        int integer;
        double floating;
        char* string;
    };  // No name - members accessed directly
};

struct Value v;
v.type = 0;
v.integer = 42;  // Direct access
```

## Tagged Union Pattern

### Type-Safe Variant

```c
typedef enum {
    VAL_INT,
    VAL_FLOAT,
    VAL_STRING,
    VAL_ARRAY
} ValueType;

typedef struct Value Value;

struct Value {
    ValueType type;
    union {
        int64_t integer;
        double floating;
        char* string;
        struct {
            Value* items;
            size_t count;
        } array;
    };
};

Value make_int(int64_t n) {
    return (Value){ .type = VAL_INT, .integer = n };
}

Value make_string(const char* s) {
    return (Value){ .type = VAL_STRING, .string = strdup(s) };
}
```

### Safe Accessors

```c
bool value_is_int(const Value* v) {
    return v->type == VAL_INT;
}

int64_t value_get_int(const Value* v) {
    assert(v->type == VAL_INT);
    return v->integer;
}

bool value_try_get_int(const Value* v, int64_t* out) {
    if (v->type != VAL_INT) return false;
    *out = v->integer;
    return true;
}
```

## Memory Optimization

### Reusing Space

```c
struct Node {
    struct Node* next;
    int type;
    union {
        int leaf_value;           // Leaf nodes
        struct {
            struct Node* left;
            struct Node* right;
        } children;               // Internal nodes
    };
};
```

### Compact Messages

```c
struct Message {
    uint8_t type;
    uint8_t flags;
    uint16_t length;
    union {
        struct { uint32_t user_id; char name[60]; } login;
        struct { uint32_t room_id; char text[60]; } chat;
        struct { uint32_t error_code; char msg[60]; } error;
    };
};

// All message types fit in same space
_Static_assert(sizeof(struct Message) == 68, "Message size check");
```

## Bit Fields with Unions

### Multiple Views

```c
union IPAddress {
    uint32_t raw;
    struct {
        uint8_t a, b, c, d;
    } octets;
    uint8_t bytes[4];
};

union IPAddress ip;
ip.raw = 0xC0A80001;  // 192.168.0.1
printf("%d.%d.%d.%d\n",
       ip.octets.a, ip.octets.b,
       ip.octets.c, ip.octets.d);
```

### Hardware Registers

```c
union ControlRegister {
    uint32_t raw;
    struct {
        uint32_t enable : 1;
        uint32_t mode : 3;
        uint32_t speed : 4;
        uint32_t status : 8;
        uint32_t reserved : 16;
    } bits;
};
```

## Polymorphism in C

### Object-Oriented Pattern

```c
typedef struct Shape Shape;
typedef void (*DrawFunc)(Shape*);
typedef double (*AreaFunc)(Shape*);

struct Shape {
    DrawFunc draw;
    AreaFunc area;
    union {
        struct { double radius; } circle;
        struct { double width, height; } rectangle;
        struct { double base, height; } triangle;
    };
};

double circle_area(Shape* s) {
    return 3.14159 * s->circle.radius * s->circle.radius;
}

double rectangle_area(Shape* s) {
    return s->rectangle.width * s->rectangle.height;
}

Shape make_circle(double r) {
    return (Shape){
        .draw = circle_draw,
        .area = circle_area,
        .circle = { .radius = r }
    };
}
```

## Event Systems

### Event Union

```c
typedef enum {
    EVENT_MOUSE_MOVE,
    EVENT_MOUSE_CLICK,
    EVENT_KEY_PRESS,
    EVENT_KEY_RELEASE,
    EVENT_RESIZE
} EventType;

typedef struct {
    EventType type;
    uint32_t timestamp;
    union {
        struct { int x, y; } mouse_move;
        struct { int x, y, button; } mouse_click;
        struct { int keycode, modifiers; } key;
        struct { int width, height; } resize;
    };
} Event;

void handle_event(Event* e) {
    switch (e->type) {
        case EVENT_MOUSE_MOVE:
            update_cursor(e->mouse_move.x, e->mouse_move.y);
            break;
        case EVENT_KEY_PRESS:
            process_key(e->key.keycode, e->key.modifiers);
            break;
        // ...
    }
}
```

## Serialization

### Network Protocol

```c
struct Packet {
    uint8_t version;
    uint8_t type;
    uint16_t payload_length;
    union {
        struct { uint32_t seq; uint8_t data[500]; } data_packet;
        struct { uint32_t seq_ack; } ack_packet;
        struct { uint8_t code; char message[503]; } error_packet;
    } payload;
};

void serialize_packet(struct Packet* p, uint8_t* buffer) {
    buffer[0] = p->version;
    buffer[1] = p->type;
    memcpy(buffer + 2, &p->payload_length, 2);
    memcpy(buffer + 4, &p->payload, p->payload_length);
}
```

## Best Practices

### Always Use Type Tag

```c
// BAD - no way to know which member is valid
union BadValue {
    int i;
    float f;
};

// GOOD - type tag indicates valid member
struct GoodValue {
    enum { INT, FLOAT } type;
    union { int i; float f; };
};
```

### Validate Before Access

```c
double get_as_float(struct Value* v) {
    switch (v->type) {
        case VAL_INT: return (double)v->integer;
        case VAL_FLOAT: return v->floating;
        default:
            fprintf(stderr, "Cannot convert to float\n");
            abort();
    }
}
```

### Memory Management

```c
void value_destroy(Value* v) {
    switch (v->type) {
        case VAL_STRING:
            free(v->string);
            break;
        case VAL_ARRAY:
            for (size_t i = 0; i < v->array.count; i++) {
                value_destroy(&v->array.items[i]);
            }
            free(v->array.items);
            break;
    }
}
```

## Summary

Unions in structures enable:
- Type-safe variant types
- Memory-efficient storage
- Protocol parsing
- Event handling
- Polymorphic patterns

Always pair with type tag and validate before access.
