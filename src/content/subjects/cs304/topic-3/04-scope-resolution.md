# Scope Resolution

Scope resolution is the process by which a compiler determines which declaration a particular identifier refers to when multiple declarations with the same name exist in different scopes. This process is fundamental to semantic analysis and directly impacts how variables, functions, types, and other program entities are resolved during compilation. Proper scope resolution ensures that each identifier reference binds to the correct declaration according to the language's scoping rules.

## Scoping Concepts

A scope is a region of program text where a binding between a name and an entity is valid. The scope rules of a programming language determine:

- **Binding creation**: When and where names become bound to entities
- **Visibility**: Which declarations are accessible at a given point
- **Shadowing**: How inner declarations hide outer ones with the same name
- **Lifetime**: How long bindings remain valid

### Scope Levels

Most languages organize scopes hierarchically:

```
Global scope          // File or program level
  Function scope      // Function parameters and local variables
    Block scope       // Compound statement blocks
      Block scope     // Nested blocks
```

Example illustrating nested scopes:

```c
int x = 1;              // Global scope

void foo(int x) {       // Function scope (shadows global x)
    int y = 2;          // Function scope

    if (x > 0) {
        int y = 3;      // Block scope (shadows function y)
        int z = 4;      // Block scope
        printf("%d %d %d\n", x, y, z);  // Uses: param, local, local
    }

    printf("%d %d\n", x, y);  // Uses: param, function local
    // printf("%d", z);       // Error: z not visible here
}
```

## Lexical Scoping (Static Scoping)

Lexical scoping, also called static scoping, resolves names based on the program's textual structure. Name resolution follows the program's lexical nesting, searching from the innermost scope outward to enclosing scopes.

### Scope Resolution Algorithm

Basic lexical scope resolution:

```c
SymbolEntry* resolve_name(const char* name, Scope* current_scope) {
    Scope* scope = current_scope;

    while (scope != NULL) {
        SymbolEntry* entry = lookup_in_scope(scope, name);
        if (entry != NULL) {
            return entry;
        }
        scope = scope->parent;  // Move to enclosing scope
    }

    // Name not found in any scope
    semantic_error("Undefined identifier: %s", name);
    return NULL;
}
```

Implementation with scope chain:

```c
typedef struct Scope {
    HashMap* symbols;        // Symbols declared in this scope
    struct Scope* parent;    // Enclosing scope
    ScopeKind kind;         // Global, function, block, etc.
    int level;              // Nesting level
} Scope;

typedef struct ScopeManager {
    Scope* current_scope;
    Scope* global_scope;
} ScopeManager;

void enter_scope(ScopeManager* mgr, ScopeKind kind) {
    Scope* new_scope = create_scope();
    new_scope->parent = mgr->current_scope;
    new_scope->kind = kind;
    new_scope->level = mgr->current_scope->level + 1;
    mgr->current_scope = new_scope;
}

void exit_scope(ScopeManager* mgr) {
    Scope* old_scope = mgr->current_scope;
    mgr->current_scope = old_scope->parent;
    // Optionally free old_scope or keep for later analysis
}

void declare_symbol(ScopeManager* mgr, const char* name, SymbolEntry* entry) {
    // Check for redeclaration in current scope
    if (hashmap_contains(mgr->current_scope->symbols, name)) {
        semantic_error("Redeclaration of '%s' in the same scope", name);
    }

    hashmap_put(mgr->current_scope->symbols, name, entry);
    entry->scope = mgr->current_scope;
}
```

### Scope Entry and Exit During Compilation

The compiler enters and exits scopes while traversing the AST:

```c
void analyze_block(BlockStmt* block, ScopeManager* mgr) {
    enter_scope(mgr, SCOPE_BLOCK);

    for (int i = 0; i < block->stmt_count; i++) {
        analyze_statement(block->stmts[i], mgr);
    }

    exit_scope(mgr);
}

void analyze_function(FunctionDecl* func, ScopeManager* mgr) {
    // Declare function name in current scope
    declare_symbol(mgr, func->name, create_function_entry(func));

    // Enter function scope for parameters and body
    enter_scope(mgr, SCOPE_FUNCTION);

    // Declare parameters
    for (int i = 0; i < func->param_count; i++) {
        declare_symbol(mgr, func->params[i]->name,
                      create_param_entry(func->params[i]));
    }

    // Analyze function body
    analyze_block(func->body, mgr);

    exit_scope(mgr);
}
```

## Name Resolution Strategies

### Most Closely Nested Rule

When multiple declarations with the same name exist, the most closely nested (innermost) declaration takes precedence:

```c
int x = 10;

void foo() {
    int x = 20;      // Shadows global x

    {
        int x = 30;  // Shadows function x
        printf("%d", x);  // Prints 30 (innermost x)
    }

    printf("%d", x);  // Prints 20 (function x)
}

printf("%d", x);     // Prints 10 (global x)
```

### Block-Level Declarations

Languages vary in where declarations are allowed:

**C89 style**: Declarations only at block beginning:
```c
void foo() {
    int x, y;        // Must declare at top
    x = 10;
    // int z;        // Error: declaration after statement
}
```

**C99/C++/Java style**: Declarations anywhere in block:
```c
void foo() {
    int x = 10;
    printf("%d", x);
    int y = 20;      // OK: declaration anywhere
    printf("%d", y);
}
```

The compiler must track declaration positions to enforce these rules.

## Advanced Scoping Features

### Function Scope for Labels

In C, labels have function scope (visible throughout the entire function):

```c
void foo() {
    if (condition)
        goto end;    // Forward reference OK

    // ... code ...

end:                 // Label visible from entire function
    return;
}
```

Implementation:

```c
void analyze_function(FunctionDecl* func, ScopeManager* mgr) {
    // First pass: collect all labels
    HashMap* labels = collect_labels(func->body);

    // Second pass: verify goto targets
    verify_gotos(func->body, labels);

    // Continue with normal analysis
    analyze_function_body(func->body, mgr);
}
```

### Namespace and Module Scoping

Languages with modules or namespaces introduce additional scoping layers:

```c
// Namespace scope hierarchy
namespace std {
    namespace chrono {
        class duration { /* ... */ };
    }
}

// Resolution requires qualified name lookup
Type* resolve_qualified_name(const char* qualified_name, Scope* current) {
    char** components = split(qualified_name, "::");

    Scope* scope = find_namespace(current, components[0]);

    for (int i = 1; components[i+1] != NULL; i++) {
        scope = find_nested_namespace(scope, components[i]);
        if (scope == NULL) {
            semantic_error("Namespace not found: %s", components[i]);
        }
    }

    return lookup_in_scope(scope, components[last_index]);
}
```

### Using Declarations and Imports

Import statements bring names into scope:

```python
# Python import resolution
import_table = {}

def handle_import(import_stmt):
    if import_stmt.kind == "import":
        # import module
        module = load_module(import_stmt.module_name)
        import_table[import_stmt.module_name] = module

    elif import_stmt.kind == "from_import":
        # from module import name1, name2
        module = load_module(import_stmt.module_name)
        for name in import_stmt.names:
            if name not in module.exports:
                error(f"{name} not found in {module.name}")
            import_table[name] = module.exports[name]

def resolve_with_imports(name, current_scope):
    # Check local scopes first
    result = resolve_name(name, current_scope)
    if result:
        return result

    # Check imports
    if name in import_table:
        return import_table[name]

    error(f"Undefined name: {name}")
```

## Function Overloading Resolution

When a language supports function overloading, name resolution must consider signatures:

```c
typedef struct OverloadSet {
    char* name;
    FunctionDecl** overloads;
    int count;
} OverloadSet;

FunctionDecl* resolve_overloaded_call(const char* name, Type** arg_types,
                                      int arg_count, Scope* scope) {
    OverloadSet* overloads = lookup_overload_set(scope, name);
    if (overloads == NULL) {
        semantic_error("No function named '%s'", name);
    }

    // Find exact match
    for (int i = 0; i < overloads->count; i++) {
        FunctionDecl* func = overloads->overloads[i];
        if (exact_match(func->param_types, arg_types, arg_count)) {
            return func;
        }
    }

    // Find match with implicit conversions
    FunctionDecl* best_match = NULL;
    int best_score = -1;

    for (int i = 0; i < overloads->count; i++) {
        FunctionDecl* func = overloads->overloads[i];
        int score = match_with_conversions(func->param_types, arg_types,
                                          arg_count);
        if (score > best_score) {
            best_score = score;
            best_match = func;
        }
    }

    if (best_match == NULL) {
        semantic_error("No matching overload for call to '%s'", name);
    }

    return best_match;
}

int match_with_conversions(Type** param_types, Type** arg_types, int count) {
    int score = 0;

    for (int i = 0; i < count; i++) {
        if (types_equal(param_types[i], arg_types[i])) {
            score += 1000;  // Exact match
        } else if (can_convert(arg_types[i], param_types[i])) {
            score += 100;   // Conversion available
        } else {
            return -1;      // No match
        }
    }

    return score;
}
```

### Operator Overloading

Operator resolution follows similar rules:

```cpp
Expr* resolve_operator(TokenKind op, Expr* left, Expr* right) {
    Type* left_type = left->type;
    Type* right_type = right->type;

    // Check for built-in operator
    if (has_builtin_operator(op, left_type, right_type)) {
        return create_builtin_op(op, left, right);
    }

    // Check for overloaded operator
    char* operator_name = get_operator_function_name(op);
    FunctionDecl* overload = resolve_operator_overload(
        operator_name, left_type, right_type
    );

    if (overload != NULL) {
        return create_operator_call(overload, left, right);
    }

    semantic_error("No operator '%s' for types %s and %s",
                  token_name(op), type_name(left_type), type_name(right_type));
}
```

## Template and Generic Name Resolution

Generic types and functions require special resolution:

```c
// Two-phase name resolution for templates
typedef struct TemplateScope {
    Scope* definition_scope;    // Scope where template is defined
    Scope* instantiation_scope; // Scope where template is instantiated
} TemplateScope;

void resolve_template_name(const char* name, TemplateScope* tscope) {
    // Dependent names: resolved at instantiation time
    if (is_dependent_name(name, tscope->template_params)) {
        defer_resolution(name, tscope->instantiation_scope);
        return;
    }

    // Non-dependent names: resolved at definition time
    SymbolEntry* entry = resolve_name(name, tscope->definition_scope);
    if (entry == NULL) {
        semantic_error("Undefined name in template: %s", name);
    }
}
```

## Closure and Lexical Capture

Languages with closures must resolve captured variables:

```python
def outer():
    x = 10      # Captured by closure

    def inner():
        print(x)    # References outer's x
        # x = 20    # Would create new local, not modify outer's x
        nonlocal x  # Needed to modify outer's x
        x = 20

    return inner
```

Implementation:

```c
typedef struct Closure {
    FunctionDecl* function;
    CapturedVar** captured_vars;
    int capture_count;
} Closure;

Closure* analyze_closure(FunctionDecl* func, Scope* enclosing_scope) {
    Closure* closure = create_closure(func);

    // Find all free variables (referenced but not declared locally)
    HashSet* free_vars = find_free_variables(func->body);

    for each name in free_vars {
        SymbolEntry* entry = resolve_name(name, enclosing_scope);
        if (entry == NULL) {
            semantic_error("Undefined variable captured: %s", name);
        }

        // Add to capture list
        add_captured_var(closure, entry);

        // Mark original variable as captured
        entry->is_captured = true;
    }

    return closure;
}
```

## Handling Forward References

Some languages allow forward references to entities declared later:

```c
// Function forward reference
void foo() {
    bar();      // Forward reference to bar
}

void bar() {
    // ...
}
```

Multi-pass resolution handles this:

```c
void analyze_program(Program* prog) {
    // Pass 1: Collect all function declarations
    for (int i = 0; i < prog->decl_count; i++) {
        if (prog->decls[i]->kind == DECL_FUNCTION) {
            declare_function_signature(prog->decls[i]);
        }
    }

    // Pass 2: Analyze function bodies
    for (int i = 0; i < prog->decl_count; i++) {
        if (prog->decls[i]->kind == DECL_FUNCTION) {
            analyze_function_body(prog->decls[i]);
        }
    }
}
```

## Key Takeaways

- Scope resolution determines which declaration an identifier refers to when multiple same-named declarations exist
- Lexical scoping resolves names based on textual nesting, searching from innermost to outermost scope
- The most closely nested rule ensures inner declarations shadow outer ones with the same name
- Scope managers maintain a stack or tree of scopes, entering and exiting as the compiler traverses the AST
- Function overloading requires signature matching to select the correct function from multiple candidates
- Namespace and module systems introduce additional scoping layers requiring qualified name lookup
- Closure analysis identifies and captures free variables from enclosing scopes
- Forward references may require multi-pass resolution to handle declarations used before definition
- Template and generic resolution may defer name binding until instantiation time
- Proper scope resolution is essential for correct semantic analysis and prevents name conflicts
