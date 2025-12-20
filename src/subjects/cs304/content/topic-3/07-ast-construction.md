# AST Construction

The Abstract Syntax Tree (AST) is a hierarchical representation of the syntactic structure of source code that abstracts away concrete syntax details like parentheses, semicolons, and whitespace. Unlike parse trees, which mirror grammar productions exactly, ASTs contain only semantically significant information. AST construction typically occurs during or immediately after parsing, creating the primary data structure for semantic analysis, optimization, and code generation.

## AST vs Parse Tree

Parse trees (concrete syntax trees) directly reflect grammar derivations, while ASTs capture semantic structure:

**Expression**: `3 + 4 * 5`

**Parse Tree** (following grammar productions):
```
Expr
├── Expr
│   └── Term
│       └── Factor
│           └── 3
├── +
└── Term
    ├── Term
    │   └── Factor
    │       └── 4
    ├── *
    └── Factor
        └── 5
```

**AST** (semantic structure):
```
BinaryOp(+)
├── Literal(3)
└── BinaryOp(*)
    ├── Literal(4)
    └── Literal(5)
```

The AST eliminates unnecessary nodes and focuses on semantic relationships.

## AST Node Types

A typical AST defines node types for different language constructs:

### Expression Nodes

```c
typedef enum {
    EXPR_LITERAL,
    EXPR_VARIABLE,
    EXPR_BINARY_OP,
    EXPR_UNARY_OP,
    EXPR_CALL,
    EXPR_INDEX,
    EXPR_MEMBER,
    EXPR_CAST
} ExprKind;

typedef struct Expr {
    ExprKind kind;
    Type* type;          // Filled in during type checking
    Location location;   // Source location for error reporting
    union {
        struct {
            LiteralKind lit_kind;
            union {
                int int_val;
                double float_val;
                char* string_val;
                bool bool_val;
            };
        } literal;

        struct {
            char* name;
        } variable;

        struct {
            BinaryOp op;
            struct Expr* left;
            struct Expr* right;
        } binary;

        struct {
            UnaryOp op;
            struct Expr* operand;
        } unary;

        struct {
            struct Expr* function;
            struct Expr** args;
            int arg_count;
        } call;

        struct {
            struct Expr* array;
            struct Expr* index;
        } index;

        struct {
            struct Expr* object;
            char* member_name;
        } member;
    };
} Expr;
```

### Statement Nodes

```c
typedef enum {
    STMT_EXPR,
    STMT_BLOCK,
    STMT_IF,
    STMT_WHILE,
    STMT_FOR,
    STMT_RETURN,
    STMT_DECL,
    STMT_ASSIGN
} StmtKind;

typedef struct Stmt {
    StmtKind kind;
    Location location;
    union {
        struct {
            Expr* expr;
        } expr_stmt;

        struct {
            struct Stmt** stmts;
            int stmt_count;
        } block;

        struct {
            Expr* condition;
            struct Stmt* then_branch;
            struct Stmt* else_branch;
        } if_stmt;

        struct {
            Expr* condition;
            struct Stmt* body;
        } while_stmt;

        struct {
            struct Stmt* init;
            Expr* condition;
            Expr* increment;
            struct Stmt* body;
        } for_stmt;

        struct {
            Expr* value;
        } return_stmt;

        struct {
            char* name;
            Type* type;
            Expr* initializer;
        } decl;

        struct {
            Expr* target;
            Expr* value;
        } assign;
    };
} Stmt;
```

### Declaration Nodes

```c
typedef struct FunctionDecl {
    char* name;
    Type* return_type;
    Parameter** parameters;
    int param_count;
    Stmt* body;
    Location location;
} FunctionDecl;

typedef struct StructDecl {
    char* name;
    Field** fields;
    int field_count;
    Location location;
} StructDecl;

typedef struct Program {
    FunctionDecl** functions;
    int function_count;
    StructDecl** structs;
    int struct_count;
    Stmt** global_stmts;
    int global_stmt_count;
} Program;
```

## AST Construction During Parsing

### Bottom-Up Parsing (LR/LALR)

In bottom-up parsers, AST nodes are built during reductions and placed on a semantic stack parallel to the parsing stack:

```c
// Yacc/Bison example
%union {
    int int_val;
    char* str_val;
    Expr* expr;
    Stmt* stmt;
}

%token <int_val> INT_LITERAL
%token <str_val> IDENTIFIER
%type <expr> expr
%type <stmt> stmt

%%

expr:
    INT_LITERAL
    { $$ = create_int_literal($1); }

  | IDENTIFIER
    { $$ = create_variable_expr($1); }

  | expr '+' expr
    { $$ = create_binary_expr(OP_ADD, $1, $3); }

  | expr '*' expr
    { $$ = create_binary_expr(OP_MUL, $1, $3); }

  | '(' expr ')'
    { $$ = $2; }  // Parentheses don't appear in AST
  ;

stmt:
    expr ';'
    { $$ = create_expr_stmt($1); }

  | IF '(' expr ')' stmt ELSE stmt
    { $$ = create_if_stmt($3, $5, $7); }

  | RETURN expr ';'
    { $$ = create_return_stmt($2); }
  ;
```

Helper functions to create AST nodes:

```c
Expr* create_binary_expr(BinaryOp op, Expr* left, Expr* right) {
    Expr* expr = malloc(sizeof(Expr));
    expr->kind = EXPR_BINARY_OP;
    expr->binary.op = op;
    expr->binary.left = left;
    expr->binary.right = right;
    expr->location = merge_locations(left->location, right->location);
    return expr;
}

Stmt* create_if_stmt(Expr* condition, Stmt* then_branch, Stmt* else_branch) {
    Stmt* stmt = malloc(sizeof(Stmt));
    stmt->kind = STMT_IF;
    stmt->if_stmt.condition = condition;
    stmt->if_stmt.then_branch = then_branch;
    stmt->if_stmt.else_branch = else_branch;
    stmt->location = condition->location;
    return stmt;
}
```

### Top-Down Parsing (Recursive Descent)

Recursive descent parsers build AST nodes as they parse:

```c
Expr* parse_primary() {
    Token tok = current_token();

    if (tok.type == TOKEN_INT_LITERAL) {
        advance();
        return create_int_literal(tok.int_value);
    }

    if (tok.type == TOKEN_IDENTIFIER) {
        char* name = tok.string_value;
        advance();
        return create_variable_expr(name);
    }

    if (tok.type == TOKEN_LPAREN) {
        advance();  // Skip '('
        Expr* expr = parse_expression();
        expect(TOKEN_RPAREN);  // Skip ')'
        return expr;  // Parentheses not in AST
    }

    error("Expected primary expression");
}

Expr* parse_multiplicative() {
    Expr* left = parse_primary();

    while (current_token().type == TOKEN_STAR ||
           current_token().type == TOKEN_SLASH) {
        BinaryOp op = (current_token().type == TOKEN_STAR) ? OP_MUL : OP_DIV;
        advance();
        Expr* right = parse_primary();
        left = create_binary_expr(op, left, right);
    }

    return left;
}

Expr* parse_additive() {
    Expr* left = parse_multiplicative();

    while (current_token().type == TOKEN_PLUS ||
           current_token().type == TOKEN_MINUS) {
        BinaryOp op = (current_token().type == TOKEN_PLUS) ? OP_ADD : OP_SUB;
        advance();
        Expr* right = parse_multiplicative();
        left = create_binary_expr(op, left, right);
    }

    return left;
}

Stmt* parse_if_statement() {
    expect(TOKEN_IF);
    expect(TOKEN_LPAREN);
    Expr* condition = parse_expression();
    expect(TOKEN_RPAREN);

    Stmt* then_branch = parse_statement();
    Stmt* else_branch = NULL;

    if (current_token().type == TOKEN_ELSE) {
        advance();
        else_branch = parse_statement();
    }

    return create_if_stmt(condition, then_branch, else_branch);
}
```

## AST Traversal Patterns

### Visitor Pattern

The visitor pattern separates algorithms from the AST structure, making it easy to add new operations:

```c
typedef struct ASTVisitor {
    void* (*visit_binary_expr)(struct ASTVisitor* visitor, Expr* expr);
    void* (*visit_literal_expr)(struct ASTVisitor* visitor, Expr* expr);
    void* (*visit_variable_expr)(struct ASTVisitor* visitor, Expr* expr);
    void* (*visit_if_stmt)(struct ASTVisitor* visitor, Stmt* stmt);
    void* (*visit_while_stmt)(struct ASTVisitor* visitor, Stmt* stmt);
    // ... more visit methods
    void* context;  // Visitor-specific data
} ASTVisitor;

void* accept_expr(Expr* expr, ASTVisitor* visitor) {
    switch (expr->kind) {
        case EXPR_BINARY_OP:
            return visitor->visit_binary_expr(visitor, expr);
        case EXPR_LITERAL:
            return visitor->visit_literal_expr(visitor, expr);
        case EXPR_VARIABLE:
            return visitor->visit_variable_expr(visitor, expr);
        // ... more cases
    }
}

void* accept_stmt(Stmt* stmt, ASTVisitor* visitor) {
    switch (stmt->kind) {
        case STMT_IF:
            return visitor->visit_if_stmt(visitor, stmt);
        case STMT_WHILE:
            return visitor->visit_while_stmt(visitor, stmt);
        // ... more cases
    }
}
```

Example visitor implementation for pretty-printing:

```c
void* print_binary_expr(ASTVisitor* visitor, Expr* expr) {
    printf("(");
    accept_expr(expr->binary.left, visitor);
    printf(" %s ", op_symbol(expr->binary.op));
    accept_expr(expr->binary.right, visitor);
    printf(")");
    return NULL;
}

void* print_literal_expr(ASTVisitor* visitor, Expr* expr) {
    if (expr->literal.lit_kind == LIT_INT) {
        printf("%d", expr->literal.int_val);
    } else if (expr->literal.lit_kind == LIT_STRING) {
        printf("\"%s\"", expr->literal.string_val);
    }
    return NULL;
}

ASTVisitor create_print_visitor() {
    ASTVisitor visitor = {
        .visit_binary_expr = print_binary_expr,
        .visit_literal_expr = print_literal_expr,
        .visit_variable_expr = print_variable_expr,
        // ... initialize all visit methods
    };
    return visitor;
}
```

### Recursive Traversal

Simple recursive functions work well for straightforward traversals:

```c
void count_nodes(Expr* expr, int* count) {
    (*count)++;

    switch (expr->kind) {
        case EXPR_BINARY_OP:
            count_nodes(expr->binary.left, count);
            count_nodes(expr->binary.right, count);
            break;

        case EXPR_UNARY_OP:
            count_nodes(expr->unary.operand, count);
            break;

        case EXPR_CALL:
            count_nodes(expr->call.function, count);
            for (int i = 0; i < expr->call.arg_count; i++) {
                count_nodes(expr->call.args[i], count);
            }
            break;

        case EXPR_LITERAL:
        case EXPR_VARIABLE:
            // Leaf nodes, no recursion
            break;
    }
}
```

### Iterative Traversal

For very deep ASTs, iterative traversal prevents stack overflow:

```c
void traverse_iterative(Expr* root) {
    Stack* stack = create_stack();
    push(stack, root);

    while (!is_empty(stack)) {
        Expr* expr = pop(stack);

        // Process node
        process_expr(expr);

        // Push children (in reverse order for left-to-right processing)
        switch (expr->kind) {
            case EXPR_BINARY_OP:
                push(stack, expr->binary.right);
                push(stack, expr->binary.left);
                break;

            case EXPR_UNARY_OP:
                push(stack, expr->unary.operand);
                break;

            // ... more cases
        }
    }

    destroy_stack(stack);
}
```

## AST Transformations

ASTs are often transformed during compilation:

### Desugaring

Convert syntactic sugar to core constructs:

```c
// Transform: for (init; cond; incr) body
// Into: { init; while (cond) { body; incr; } }

Stmt* desugar_for_loop(Stmt* for_stmt) {
    Stmt* init = for_stmt->for_stmt.init;
    Expr* condition = for_stmt->for_stmt.condition;
    Expr* increment = for_stmt->for_stmt.increment;
    Stmt* body = for_stmt->for_stmt.body;

    // Create { body; incr; }
    Stmt** while_body_stmts = malloc(sizeof(Stmt*) * 2);
    while_body_stmts[0] = body;
    while_body_stmts[1] = create_expr_stmt(increment);
    Stmt* while_body = create_block_stmt(while_body_stmts, 2);

    // Create while (cond) { body; incr; }
    Stmt* while_stmt = create_while_stmt(condition, while_body);

    // Create { init; while(...) }
    Stmt** block_stmts = malloc(sizeof(Stmt*) * 2);
    block_stmts[0] = init;
    block_stmts[1] = while_stmt;

    return create_block_stmt(block_stmts, 2);
}
```

### Optimization

AST-level optimizations:

```c
// Constant folding
Expr* optimize_expr(Expr* expr) {
    if (expr->kind != EXPR_BINARY_OP) {
        return expr;
    }

    Expr* left = optimize_expr(expr->binary.left);
    Expr* right = optimize_expr(expr->binary.right);

    // If both operands are constants, evaluate at compile time
    if (left->kind == EXPR_LITERAL && right->kind == EXPR_LITERAL &&
        left->literal.lit_kind == LIT_INT && right->literal.lit_kind == LIT_INT) {

        int left_val = left->literal.int_val;
        int right_val = right->literal.int_val;
        int result;

        switch (expr->binary.op) {
            case OP_ADD: result = left_val + right_val; break;
            case OP_SUB: result = left_val - right_val; break;
            case OP_MUL: result = left_val * right_val; break;
            case OP_DIV:
                if (right_val == 0) return expr;  // Keep for runtime error
                result = left_val / right_val;
                break;
            default: return expr;
        }

        return create_int_literal(result);
    }

    return expr;
}
```

## Memory Management

AST nodes must be properly allocated and freed:

```c
// Reference-counted nodes
typedef struct ASTNode {
    int ref_count;
    // ... node data
} ASTNode;

void retain_node(ASTNode* node) {
    if (node) node->ref_count++;
}

void release_node(ASTNode* node) {
    if (!node) return;

    if (--node->ref_count == 0) {
        // Recursively release children
        release_children(node);
        free(node);
    }
}

// Arena allocation (all nodes freed together)
typedef struct Arena {
    char* memory;
    size_t used;
    size_t capacity;
} Arena;

void* arena_alloc(Arena* arena, size_t size) {
    if (arena->used + size > arena->capacity) {
        // Expand arena
    }
    void* ptr = arena->memory + arena->used;
    arena->used += size;
    return ptr;
}

void arena_free_all(Arena* arena) {
    free(arena->memory);
    arena->used = 0;
}
```

## Key Takeaways

- ASTs represent semantic structure, eliminating syntax-only elements like parentheses and semicolons
- AST nodes are typically built during parsing, either in bottom-up reductions or recursive descent
- Node types include expressions, statements, declarations, and program-level constructs
- The visitor pattern separates traversal logic from AST structure, enabling modular operations
- Recursive traversal is simple but may stack overflow; iterative traversal uses explicit stacks
- AST transformations include desugaring syntactic sugar and performing optimizations
- Memory management strategies include reference counting and arena allocation
- Location information in AST nodes enables precise error reporting during semantic analysis
- ASTs serve as the primary data structure for semantic analysis, optimization, and code generation
- Well-designed AST representations balance expressiveness, memory efficiency, and ease of traversal
