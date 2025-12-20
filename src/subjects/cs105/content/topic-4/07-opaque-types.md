# Opaque Types

Opaque types hide implementation details from users, providing encapsulation in C. This pattern is essential for creating maintainable libraries and APIs.

## The Opaque Pointer Pattern

### Concept

Users see only a pointer; the structure definition is hidden:

```c
// public.h - User sees this
typedef struct Database Database;

Database* db_open(const char* path);
void db_close(Database* db);
int db_query(Database* db, const char* sql);

// private.c - Implementation hidden
struct Database {
    int connection_id;
    char* path;
    void* internal_handle;
    // Users cannot access these!
};
```

### Benefits

1. **Encapsulation** - Users cannot access internals
2. **ABI Stability** - Change internals without breaking users
3. **Compile Firewall** - Changes don't require user recompilation
4. **Information Hiding** - Implementation is truly private

## Implementation Pattern

### Header File (Public)

```c
// list.h
#ifndef LIST_H
#define LIST_H

#include <stddef.h>

// Forward declaration only - no definition
typedef struct List List;

// Create and destroy
List* list_create(void);
void list_destroy(List* list);

// Operations
void list_append(List* list, int value);
int list_get(List* list, size_t index);
size_t list_size(List* list);
void list_remove(List* list, size_t index);

#endif
```

### Source File (Private)

```c
// list.c
#include "list.h"
#include <stdlib.h>

// Full definition - hidden from users
struct List {
    int* data;
    size_t size;
    size_t capacity;
};

List* list_create(void) {
    List* list = malloc(sizeof(List));
    if (!list) return NULL;

    list->data = malloc(sizeof(int) * 16);
    list->size = 0;
    list->capacity = 16;
    return list;
}

void list_destroy(List* list) {
    if (list) {
        free(list->data);
        free(list);
    }
}

void list_append(List* list, int value) {
    if (list->size >= list->capacity) {
        list->capacity *= 2;
        list->data = realloc(list->data, sizeof(int) * list->capacity);
    }
    list->data[list->size++] = value;
}

int list_get(List* list, size_t index) {
    return list->data[index];
}

size_t list_size(List* list) {
    return list->size;
}
```

### User Code

```c
// main.c
#include "list.h"

int main() {
    List* mylist = list_create();

    list_append(mylist, 10);
    list_append(mylist, 20);
    list_append(mylist, 30);

    for (size_t i = 0; i < list_size(mylist); i++) {
        printf("%d\n", list_get(mylist, i));
    }

    // mylist->size = 100;  // ERROR: incomplete type
    // Cannot access internals!

    list_destroy(mylist);
    return 0;
}
```

## Internal Header Pattern

### For Multiple Implementation Files

```c
// list_internal.h - Only for implementation files
#ifndef LIST_INTERNAL_H
#define LIST_INTERNAL_H

#include "list.h"

struct List {
    int* data;
    size_t size;
    size_t capacity;
};

// Internal helper functions
void list_grow(List* list);
void list_validate(List* list);

#endif
```

```c
// list.c
#include "list_internal.h"
// Has access to struct definition

// list_helpers.c
#include "list_internal.h"
// Also has access
```

## Handle-Based API

### Using Integer Handles

```c
// database.h
typedef int DatabaseHandle;

DatabaseHandle db_open(const char* path);
void db_close(DatabaseHandle handle);
int db_query(DatabaseHandle handle, const char* sql);

// database.c
#define MAX_DATABASES 100

static struct {
    bool in_use;
    char path[256];
    void* connection;
} databases[MAX_DATABASES];

DatabaseHandle db_open(const char* path) {
    for (int i = 0; i < MAX_DATABASES; i++) {
        if (!databases[i].in_use) {
            databases[i].in_use = true;
            strcpy(databases[i].path, path);
            databases[i].connection = connect(path);
            return i;
        }
    }
    return -1;  // No slots available
}
```

## PIMPL Pattern (Pointer to Implementation)

### Public Structure with Hidden Implementation

```c
// widget.h
typedef struct WidgetImpl WidgetImpl;

typedef struct {
    int id;
    const char* name;
    WidgetImpl* impl;  // Private implementation
} Widget;

Widget* widget_create(const char* name);
void widget_destroy(Widget* w);
void widget_draw(Widget* w);

// widget.c
struct WidgetImpl {
    // All the messy internals
    void* render_context;
    float transform[16];
    int vertex_count;
    float* vertices;
};
```

## Factory Functions

### Controlled Creation

```c
// shape.h
typedef struct Shape Shape;

// Factory functions - only way to create shapes
Shape* shape_create_circle(double radius);
Shape* shape_create_rectangle(double width, double height);
Shape* shape_create_triangle(double base, double height);

void shape_destroy(Shape* shape);
double shape_area(Shape* shape);
void shape_draw(Shape* shape);
```

## Versioning and Compatibility

### Stable ABI

```c
// Version 1.0
struct Widget {
    int x, y;
};

// Version 2.0 - Added field, but ABI unchanged for opaque type
struct Widget {
    int x, y;
    int width, height;  // New fields!
};

// Users don't recompile - they only use Widget*
```

### Breaking Changes Avoided

Without opaque types:
```c
// User code compiles against struct definition
Widget w;
w.x = 10;
// If Widget changes, user must recompile
```

With opaque types:
```c
// User code only uses pointer
Widget* w = widget_create();
widget_set_x(w, 10);
// Widget can change freely
```

## Error Handling

### NULL Checks

```c
Database* db_open(const char* path) {
    if (!path) return NULL;

    Database* db = malloc(sizeof(Database));
    if (!db) return NULL;

    db->path = strdup(path);
    if (!db->path) {
        free(db);
        return NULL;
    }

    return db;
}
```

### Error Codes

```c
typedef enum {
    DB_OK = 0,
    DB_ERROR_NULL_PTR = -1,
    DB_ERROR_NOT_FOUND = -2,
    DB_ERROR_INVALID = -3
} DbError;

DbError db_query(Database* db, const char* sql, Result** out) {
    if (!db) return DB_ERROR_NULL_PTR;
    if (!sql) return DB_ERROR_NULL_PTR;
    // ...
    return DB_OK;
}
```

## Best Practices

1. **Always use factory functions** - Never expose struct size
2. **Provide cleanup function** - Users can't know what to free
3. **Document ownership** - Who frees what?
4. **Use const correctly** - `const Shape*` for read-only access
5. **Validate parameters** - Users might pass garbage

```c
void list_append(List* list, int value) {
    if (!list) {
        fprintf(stderr, "list_append: NULL list\n");
        return;
    }
    // ...
}
```

## Summary

Opaque types provide:
- True encapsulation in C
- ABI stability
- Clean public interfaces
- Implementation freedom

Essential pattern for libraries and maintainable APIs.
