# Symbol Tables

A symbol table is a fundamental data structure in compiler design that stores information about identifiers (variables, functions, types, classes, etc.) encountered in the source program. The symbol table serves as the compiler's database for semantic analysis, maintaining associations between names and their attributes such as type, scope, memory location, and other properties needed for code generation and optimization.

## Purpose and Requirements

The symbol table supports several critical compiler operations:

- **Declaration processing**: Recording new identifiers and their properties
- **Name lookup**: Retrieving information about previously declared identifiers
- **Scope management**: Handling nested scopes and shadowing
- **Type checking**: Providing type information for semantic analysis
- **Code generation**: Supplying memory locations and calling conventions

Key performance requirements:
- **Fast insertion**: O(1) average case for adding new symbols
- **Fast lookup**: O(1) average case for finding symbols
- **Space efficiency**: Minimal memory overhead
- **Scope operations**: Efficient enter/exit scope operations

## Symbol Table Entries

Each entry in the symbol table typically contains:

```c
struct SymbolEntry {
    char* name;           // Identifier name
    SymbolType type;      // Data type
    ScopeLevel scope;     // Scope level
    int offset;           // Memory offset or address
    StorageClass storage; // static, auto, register, etc.
    bool initialized;     // Initialization status
    void* typeInfo;       // Pointer to detailed type information
    int lineNumber;       // Declaration location
    SymbolEntry* next;    // For chaining (in hash table)
};
```

For functions, additional information is needed:

```c
struct FunctionInfo {
    Type returnType;
    Parameter* parameters;
    int paramCount;
    bool isVariadic;
    bool isDefined;       // Declaration vs definition
    int labelNumber;      // For code generation
};
```

## Hash Table Implementation

Hash tables provide O(1) average-case lookup and insertion, making them the most common symbol table implementation.

### Basic Hash Table

```c
#define HASH_TABLE_SIZE 211  // Prime number reduces collisions

typedef struct SymbolTable {
    SymbolEntry* table[HASH_TABLE_SIZE];
    struct SymbolTable* parent;  // For nested scopes
    int scopeLevel;
} SymbolTable;

// Simple hash function
unsigned int hash(const char* name) {
    unsigned int h = 0;
    while (*name) {
        h = (h << 4) + *name++;
        unsigned int g = h & 0xF0000000;
        if (g) {
            h ^= g >> 24;
            h ^= g;
        }
    }
    return h % HASH_TABLE_SIZE;
}

// Insert a symbol
void insert(SymbolTable* table, const char* name, SymbolEntry* entry) {
    unsigned int index = hash(name);
    entry->next = table->table[index];
    table->table[index] = entry;
}

// Lookup a symbol (current scope only)
SymbolEntry* lookup_current_scope(SymbolTable* table, const char* name) {
    unsigned int index = hash(name);
    SymbolEntry* entry = table->table[index];

    while (entry != NULL) {
        if (strcmp(entry->name, name) == 0 &&
            entry->scope == table->scopeLevel) {
            return entry;
        }
        entry = entry->next;
    }
    return NULL;
}

// Lookup with scope chain traversal
SymbolEntry* lookup(SymbolTable* table, const char* name) {
    while (table != NULL) {
        SymbolEntry* entry = lookup_current_scope(table, name);
        if (entry != NULL) {
            return entry;
        }
        table = table->parent;  // Search parent scope
    }
    return NULL;
}
```

### Collision Resolution

**Chaining (Separate Chaining)**: Each hash table slot contains a linked list of entries that hash to the same index. This is simple and handles high load factors well.

**Open Addressing**: When a collision occurs, probe for the next available slot:
- **Linear probing**: Check indices h, h+1, h+2, ...
- **Quadratic probing**: Check h, h+1², h+2², ...
- **Double hashing**: Use a second hash function for probe increment

```c
// Linear probing example
int find_slot(SymbolTable* table, const char* name) {
    int index = hash(name);
    int i = 0;

    while (table->table[index] != NULL &&
           strcmp(table->table[index]->name, name) != 0) {
        index = (hash(name) + i) % HASH_TABLE_SIZE;
        i++;
        if (i >= HASH_TABLE_SIZE) {
            return -1;  // Table full
        }
    }
    return index;
}
```

## Scoped Symbol Tables

Most programming languages support nested scopes (blocks, functions, classes). The symbol table must handle scope entry/exit and implement proper name resolution.

### Stack of Symbol Tables

Maintain a stack of symbol tables, one per scope level:

```c
typedef struct ScopeStack {
    SymbolTable* scopes[MAX_SCOPE_DEPTH];
    int currentLevel;
} ScopeStack;

void enter_scope(ScopeStack* stack) {
    stack->currentLevel++;
    SymbolTable* newScope = create_symbol_table();
    newScope->parent = stack->scopes[stack->currentLevel - 1];
    newScope->scopeLevel = stack->currentLevel;
    stack->scopes[stack->currentLevel] = newScope;
}

void exit_scope(ScopeStack* stack) {
    // Optionally free or archive the scope
    stack->currentLevel--;
}

void insert_symbol(ScopeStack* stack, const char* name, SymbolEntry* entry) {
    SymbolTable* currentScope = stack->scopes[stack->currentLevel];
    insert(currentScope, name, entry);
}
```

### Single Hash Table with Scope Information

An alternative approach uses one hash table with scope markers:

```c
typedef struct ScopeMarker {
    int level;
    SymbolEntry* symbols;  // Symbols at this level
    struct ScopeMarker* next;
} ScopeMarker;

typedef struct ScopedSymbolTable {
    SymbolEntry* table[HASH_TABLE_SIZE];
    ScopeMarker* scopeStack;
    int currentLevel;
} ScopedSymbolTable;

void enter_scope(ScopedSymbolTable* table) {
    ScopeMarker* marker = malloc(sizeof(ScopeMarker));
    marker->level = ++table->currentLevel;
    marker->symbols = NULL;
    marker->next = table->scopeStack;
    table->scopeStack = marker;
}

void exit_scope(ScopedSymbolTable* table) {
    ScopeMarker* marker = table->scopeStack;

    // Remove all symbols at this level
    SymbolEntry* symbol = marker->symbols;
    while (symbol != NULL) {
        remove_from_hash(table, symbol);
        symbol = symbol->nextInScope;
    }

    table->scopeStack = marker->next;
    table->currentLevel--;
    free(marker);
}
```

## Name Resolution Strategies

### Static Scoping (Lexical Scoping)

Names are resolved based on the program's textual structure. Search proceeds from innermost to outermost scope:

```python
def resolve_name(name, current_scope):
    scope = current_scope
    while scope is not None:
        if name in scope.symbols:
            return scope.symbols[name]
        scope = scope.parent
    raise NameError(f"Undefined: {name}")
```

Example:
```c
int x = 10;           // Global scope

void foo() {
    int x = 20;       // Function scope (shadows global)
    {
        int x = 30;   // Block scope (shadows function)
        printf("%d", x);  // Prints 30
    }
    printf("%d", x);  // Prints 20
}
```

### Dynamic Scoping

Names are resolved based on runtime call stack (rare in modern languages):

```python
def resolve_dynamic(name, call_stack):
    for frame in reversed(call_stack):
        if name in frame.local_vars:
            return frame.local_vars[name]
    raise NameError(f"Undefined: {name}")
```

## Advanced Symbol Table Features

### Nested Type Definitions

For languages supporting nested type definitions:

```c
struct TypeEntry {
    char* typeName;
    TypeKind kind;  // struct, union, enum, typedef
    union {
        struct {
            SymbolTable* fields;  // Nested symbol table for fields
            int size;
        } structInfo;
        struct {
            Type* baseType;
        } typedefInfo;
    };
};
```

### Module and Namespace Support

```c
typedef struct Namespace {
    char* name;
    SymbolTable* symbols;
    Namespace* parent;
    Namespace** children;
    int childCount;
} Namespace;

// Qualified name lookup
SymbolEntry* lookup_qualified(Namespace* root, const char* qualifiedName) {
    // Parse "std::vector::iterator"
    char** components = split(qualifiedName, "::");
    Namespace* current = root;

    for (int i = 0; components[i+1] != NULL; i++) {
        current = find_child_namespace(current, components[i]);
        if (!current) return NULL;
    }

    return lookup(current->symbols, components[last]);
}
```

### Template/Generic Support

For languages with templates or generics:

```c
struct TemplateEntry {
    char* name;
    Parameter* typeParams;
    ASTNode* definition;
    HashMap* instantiations;  // Cache of instantiated versions
};

SymbolEntry* instantiate_template(TemplateEntry* tmpl, Type** args) {
    // Check cache
    SymbolEntry* cached = hashmap_get(tmpl->instantiations, args);
    if (cached) return cached;

    // Create new instantiation
    SymbolEntry* instance = clone_and_substitute(tmpl->definition, args);
    hashmap_put(tmpl->instantiations, args, instance);
    return instance;
}
```

## Optimization Techniques

### Perfect Hashing

For reserved keywords, use perfect hashing (no collisions):

```c
// Generated by gperf or similar tool
const struct Keyword keywords[] = {
    {"int", TOKEN_INT, 3},
    {"if", TOKEN_IF, 2},
    {"while", TOKEN_WHILE, 5},
    // ...
};

int keyword_hash(const char* str, int len) {
    // Perfect hash function (collision-free for keyword set)
    static const unsigned char asso_values[] = { /* ... */ };
    return len + asso_values[str[0]] + asso_values[str[len-1]];
}
```

### String Interning

Store only one copy of each identifier string:

```c
typedef struct StringPool {
    HashMap* strings;
} StringPool;

const char* intern_string(StringPool* pool, const char* str) {
    const char* interned = hashmap_get(pool->strings, str);
    if (interned) return interned;

    char* copy = strdup(str);
    hashmap_put(pool->strings, copy, copy);
    return copy;
}
```

Now string comparisons can use pointer equality instead of strcmp.

## Key Takeaways

- Symbol tables map identifiers to their semantic attributes (type, scope, location)
- Hash tables provide O(1) average-case insertion and lookup performance
- Collision resolution techniques include chaining and open addressing
- Scoped symbol tables support nested scopes through stacks or linked parent pointers
- Static scoping resolves names based on lexical structure, searching from innermost to outermost scope
- Symbol table entries store type, scope level, storage class, and other semantic information
- Advanced features include support for namespaces, nested types, and templates
- Optimization techniques include perfect hashing for keywords and string interning
- Proper scope management requires efficient enter/exit operations and shadowing support
- Symbol tables serve as the foundation for type checking, code generation, and optimization phases
