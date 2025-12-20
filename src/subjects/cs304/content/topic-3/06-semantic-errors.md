# Semantic Errors

Semantic errors are violations of a programming language's static semantic rules that cannot be detected during lexical analysis or parsing. Unlike syntax errors, which concern the grammatical structure of code, semantic errors involve meaning: incorrect types, undefined variables, violated scope rules, and other contextual issues. Detecting and reporting semantic errors clearly is crucial for compiler quality and developer productivity.

## Categories of Semantic Errors

Semantic errors fall into several major categories, each requiring different detection and reporting strategies.

### Type Errors

Type errors occur when operations are applied to incompatible types or when type constraints are violated:

**Arithmetic type mismatch**:
```c
int x = 5;
char* s = "hello";
int result = x + s;  // Error: cannot add int and char*
```

**Assignment type mismatch**:
```c
int x;
float y = 3.14;
x = y;  // Warning: implicit conversion loses precision
```

**Function argument type mismatch**:
```c
void print_int(int n) { printf("%d", n); }
print_int("hello");  // Error: expected int, got char*
```

**Return type mismatch**:
```c
int get_value() {
    return "error";  // Error: returning char* from function returning int
}
```

Detection example:

```c
void check_assignment(AssignStmt* stmt) {
    Type lhs_type = infer_type(stmt->target);
    Type rhs_type = infer_type(stmt->value);

    if (!types_compatible(lhs_type, rhs_type)) {
        if (is_implicit_conversion(rhs_type, lhs_type)) {
            if (is_narrowing_conversion(rhs_type, lhs_type)) {
                warning(stmt->location,
                       "Implicit narrowing conversion from %s to %s",
                       type_name(rhs_type), type_name(lhs_type));
            }
        } else {
            error(stmt->location,
                 "Cannot assign %s to variable of type %s",
                 type_name(rhs_type), type_name(lhs_type));
        }
    }
}
```

### Name Resolution Errors

These errors occur when identifiers cannot be resolved or are used incorrectly:

**Undefined variable**:
```c
int x = y + 1;  // Error: 'y' undeclared
```

**Redeclaration in same scope**:
```c
int x = 5;
int x = 10;  // Error: redeclaration of 'x'
```

**Use before declaration** (in languages requiring forward declaration):
```c
int x = y;
int y = 10;  // Error: 'y' used before declaration
```

Detection:

```c
void check_variable_use(VarExpr* expr) {
    SymbolEntry* entry = lookup(expr->name);

    if (entry == NULL) {
        error(expr->location,
             "Undefined variable: '%s'", expr->name);

        // Suggest similar names for better diagnostics
        char** suggestions = find_similar_names(expr->name, 3);
        if (suggestions[0] != NULL) {
            note(expr->location, "Did you mean: %s?", suggestions[0]);
        }
        return;
    }

    if (entry->declaration_line > expr->location.line) {
        error(expr->location,
             "Variable '%s' used before declaration", expr->name);
    }

    // Mark as used for unused variable warnings
    entry->is_used = true;
}
```

### Scope Violations

Scope violations involve incorrect access to entities based on visibility rules:

**Access to out-of-scope variable**:
```c
void foo() {
    int x = 10;
}

void bar() {
    printf("%d", x);  // Error: 'x' not in scope
}
```

**Invalid access to private members**:
```java
class Example {
    private int x;
}

// In another class
Example e = new Example();
e.x = 5;  // Error: 'x' is private
```

**Goto into block with declarations**:
```c
goto skip;
int x = 10;
skip:
printf("%d", x);  // Error: jumping past initialization
```

### Control Flow Errors

Errors related to control flow statements:

**Break/continue outside loop**:
```c
if (condition) {
    break;  // Error: break not in loop or switch
}
```

**Missing return statement**:
```c
int get_value(int x) {
    if (x > 0) {
        return x;
    }
    // Error: control reaches end of non-void function
}
```

**Unreachable code**:
```c
int foo() {
    return 42;
    printf("Never executes");  // Warning: unreachable code
}
```

Detection using control flow analysis:

```c
typedef enum { RETURNS, FALLS_THROUGH, MAY_RETURN } FlowBehavior;

FlowBehavior analyze_control_flow(Stmt* stmt) {
    switch (stmt->kind) {
        case STMT_RETURN:
            return RETURNS;

        case STMT_IF: {
            IfStmt* if_stmt = (IfStmt*)stmt;
            FlowBehavior then_flow = analyze_control_flow(if_stmt->then_branch);

            if (if_stmt->else_branch == NULL) {
                return MAY_RETURN;
            }

            FlowBehavior else_flow = analyze_control_flow(if_stmt->else_branch);

            if (then_flow == RETURNS && else_flow == RETURNS) {
                return RETURNS;
            }
            return MAY_RETURN;
        }

        case STMT_BLOCK: {
            BlockStmt* block = (BlockStmt*)stmt;
            FlowBehavior last_behavior = FALLS_THROUGH;

            for (int i = 0; i < block->stmt_count; i++) {
                FlowBehavior behavior = analyze_control_flow(block->stmts[i]);

                if (last_behavior == RETURNS && i > 0) {
                    warning(block->stmts[i]->location,
                           "Unreachable code detected");
                }

                last_behavior = behavior;
            }

            return last_behavior;
        }

        default:
            return FALLS_THROUGH;
    }
}

void check_function_returns(FunctionDecl* func) {
    if (func->return_type == TYPE_VOID) {
        return;  // Void functions don't need explicit return
    }

    FlowBehavior behavior = analyze_control_flow(func->body);

    if (behavior != RETURNS) {
        error(func->location,
             "Not all paths return a value in function '%s'", func->name);
    }
}
```

### Modifier and Qualifier Errors

Errors involving storage classes, qualifiers, and modifiers:

**Invalid modifier combinations**:
```c
static extern int x;  // Error: conflicting storage classes
```

**Const violation**:
```c
const int x = 10;
x = 20;  // Error: assignment to const variable
```

**Modifying rvalue**:
```c
int foo() { return 5; }
foo() = 10;  // Error: lvalue required as left operand
```

## Error Detection Strategies

### Multiple Passes

Complex semantic checks often require multiple passes:

```c
void semantic_analysis(Program* prog) {
    // Pass 1: Collect all declarations
    SymbolTable* symbols = create_symbol_table();
    collect_declarations(prog, symbols);

    // Pass 2: Resolve types
    resolve_types(prog, symbols);

    // Pass 3: Type check expressions
    type_check(prog, symbols);

    // Pass 4: Control flow analysis
    analyze_control_flow(prog);

    // Pass 5: Unused variable detection
    check_unused_variables(symbols);
}
```

### Attribute Grammars

Use synthesized and inherited attributes to propagate semantic information:

```
Stmt → if ( Expr ) Stmt₁ else Stmt₂
{
    check_type(Expr.type, BOOL);
    Stmt₁.in_loop = Stmt.in_loop;
    Stmt₂.in_loop = Stmt.in_loop;
    Stmt.returns = Stmt₁.returns && Stmt₂.returns;
}

Stmt → break
{
    if (!Stmt.in_loop) {
        error("break outside loop");
    }
    Stmt.returns = false;
}
```

### Data Flow Analysis

Detect semantic errors requiring program flow understanding:

```c
// Detecting potentially uninitialized variables
typedef struct {
    HashSet* definitely_initialized;
    HashSet* maybe_initialized;
} InitializationState;

InitializationState* analyze_initialization(Stmt* stmt, InitializationState* state) {
    switch (stmt->kind) {
        case STMT_ASSIGN: {
            AssignStmt* assign = (AssignStmt*)stmt;
            if (is_simple_var(assign->target)) {
                hashset_add(state->definitely_initialized, assign->target->name);
            }
            break;
        }

        case STMT_IF: {
            IfStmt* if_stmt = (IfStmt*)stmt;
            InitializationState* then_state = clone_state(state);
            InitializationState* else_state = clone_state(state);

            then_state = analyze_initialization(if_stmt->then_branch, then_state);
            else_state = analyze_initialization(if_stmt->else_branch, else_state);

            // Merge: variable is definitely initialized if initialized in both branches
            state->definitely_initialized =
                set_intersection(then_state->definitely_initialized,
                               else_state->definitely_initialized);

            // Variable might be initialized if initialized in either branch
            state->maybe_initialized =
                set_union(then_state->maybe_initialized,
                         else_state->maybe_initialized);
            break;
        }

        case STMT_VAR_USE: {
            VarExpr* var = (VarExpr*)stmt;
            if (!hashset_contains(state->definitely_initialized, var->name)) {
                if (hashset_contains(state->maybe_initialized, var->name)) {
                    warning(var->location,
                           "Variable '%s' may be uninitialized", var->name);
                } else {
                    error(var->location,
                         "Variable '%s' is used uninitialized", var->name);
                }
            }
            break;
        }
    }

    return state;
}
```

## Error Reporting Best Practices

### Clear and Specific Messages

Poor error message:
```
Error: type error on line 42
```

Good error message:
```
Error: incompatible types in assignment
  --> main.c:42:5
   |
42 |     x = "hello";
   |         ^^^^^^^ expected 'int', found 'char*'
   |
note: variable 'x' declared here
  --> main.c:10:5
   |
10 |     int x;
   |         ^
```

Implementation:

```c
void type_error(Location loc, const char* expected, const char* actual) {
    fprintf(stderr, "Error: incompatible types in assignment\n");
    fprintf(stderr, "  --> %s:%d:%d\n", loc.filename, loc.line, loc.column);

    // Print source line with caret
    char* source_line = get_source_line(loc.filename, loc.line);
    fprintf(stderr, "   |\n");
    fprintf(stderr, "%2d | %s\n", loc.line, source_line);
    fprintf(stderr, "   | ");

    for (int i = 0; i < loc.column - 1; i++) {
        fprintf(stderr, " ");
    }
    fprintf(stderr, "^ expected '%s', found '%s'\n", expected, actual);
}
```

### Error Recovery

Continue compilation after errors to find multiple issues:

```c
Type check_expr_with_recovery(Expr* expr) {
    Type result = check_expr(expr);

    if (result == TYPE_ERROR) {
        // Return error type to avoid cascading errors
        return TYPE_ERROR;
    }

    return result;
}

void check_binary_op(BinaryExpr* expr) {
    Type left = check_expr_with_recovery(expr->left);
    Type right = check_expr_with_recovery(expr->right);

    // If either operand has error type, skip this check
    if (left == TYPE_ERROR || right == TYPE_ERROR) {
        expr->type = TYPE_ERROR;
        return;
    }

    if (!are_compatible_for_op(expr->op, left, right)) {
        error(expr->location,
             "Invalid operands to binary %s: '%s' and '%s'",
             op_name(expr->op), type_name(left), type_name(right));
        expr->type = TYPE_ERROR;
        return;
    }

    expr->type = result_type(expr->op, left, right);
}
```

### Contextual Information

Provide context to help users understand errors:

```c
void report_function_call_error(CallExpr* call, Type expected, Type actual) {
    error(call->location,
         "Type mismatch in argument %d to function '%s'",
         call->arg_index, call->function_name);

    fprintf(stderr, "  Expected: %s\n", type_name(expected));
    fprintf(stderr, "  Got:      %s\n", type_name(actual));

    // Show function signature
    SymbolEntry* func = lookup(call->function_name);
    fprintf(stderr, "\nNote: function declared as:\n");
    fprintf(stderr, "  %s\n", format_function_signature(func));
    fprintf(stderr, "  at %s:%d\n",
           func->location.filename, func->location.line);
}
```

### Suggestions for Fixes

```c
void report_undefined_variable(const char* name, Location loc) {
    error(loc, "Undefined variable: '%s'", name);

    // Find similar names using edit distance
    char** suggestions = find_similar_names(name, 3);

    if (suggestions[0] != NULL) {
        note(loc, "Did you mean '%s'?", suggestions[0]);
    }

    // Check if declared in outer scope
    SymbolEntry* outer = lookup_in_outer_scope(name);
    if (outer != NULL) {
        note(loc, "A variable named '%s' exists in an outer scope", name);
        note(outer->location, "Declared here");
    }
}

char** find_similar_names(const char* target, int max_suggestions) {
    char** suggestions = malloc(sizeof(char*) * (max_suggestions + 1));
    int count = 0;

    SymbolEntry** all_symbols = get_all_symbols_in_scope();

    for (int i = 0; all_symbols[i] != NULL && count < max_suggestions; i++) {
        int distance = levenshtein_distance(target, all_symbols[i]->name);

        // Suggest if edit distance is small
        if (distance <= 2) {
            suggestions[count++] = all_symbols[i]->name;
        }
    }

    suggestions[count] = NULL;
    return suggestions;
}
```

## Key Takeaways

- Semantic errors violate static semantic rules: type mismatches, undefined names, scope violations
- Type errors occur when operations receive incompatible types or violate type constraints
- Name resolution errors include undefined variables, redeclarations, and use-before-declaration
- Control flow analysis detects missing returns, unreachable code, and break/continue violations
- Multiple compilation passes enable different semantic checks: declarations, types, control flow
- Error recovery strategies prevent cascading errors by assigning error types to failed expressions
- Clear error messages should show location, expected vs actual types, and relevant context
- Suggestions improve usability: similar names via edit distance, typo detection
- Data flow analysis tracks initialization, const violations, and other stateful properties
- Quality error reporting significantly impacts developer productivity and compiler usability
