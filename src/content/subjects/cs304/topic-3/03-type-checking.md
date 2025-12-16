# Type Checking

Type checking is a critical component of semantic analysis that verifies type correctness of programs according to the language's type system rules. A type system assigns types to program constructs and enforces constraints to prevent type errors—operations applied to incompatible types. Type checking can occur statically (at compile time) or dynamically (at runtime), with static type checking being the focus of compiler semantic analysis.

## Type Systems Fundamentals

A type system consists of:

- **Type expressions**: Representations of types (basic types, constructors)
- **Type rules**: Rules for assigning types to expressions
- **Type equivalence**: Determining when two types are the same
- **Type checking rules**: Verifying type correctness of operations

### Basic Types and Type Constructors

Basic types are primitive types provided by the language:

```
Basic types: int, float, char, bool, void
```

Type constructors build complex types from simpler ones:

```
Array:    array(T, n)       // Array of n elements of type T
Pointer:  pointer(T)        // Pointer to type T
Record:   record((n₁:T₁, n₂:T₂, ...))  // Structure/record
Function: T₁ × T₂ × ... → T  // Function type
```

Example type expressions:
```
int x;                    // Type: int
int a[10];               // Type: array(int, 10)
int* p;                  // Type: pointer(int)
struct {int x; float y;} // Type: record((x:int, y:float))
int (*f)(float, float);  // Type: pointer(float × float → int)
```

## Static Type Checking

Static type checking verifies type correctness before program execution. The compiler assigns types to all expressions and validates operations.

### Type Checking Expressions

Type checking rules for arithmetic expressions:

```
E → num               { E.type = int }
E → fnum              { E.type = float }
E → id                { E.type = lookup(id.name).type }

E → E₁ + E₂          { if (E₁.type == int && E₂.type == int)
                         E.type = int
                       else if (E₁.type == float && E₂.type == float)
                         E.type = float
                       else if (E₁.type == int && E₂.type == float)
                         E.type = float  // Implicit coercion
                       else
                         error("Type mismatch in +") }
```

Implementation example:

```c
Type check_binary_expr(BinaryExpr* expr) {
    Type left_type = check_expr(expr->left);
    Type right_type = check_expr(expr->right);

    switch (expr->op) {
        case OP_ADD:
        case OP_SUB:
        case OP_MUL:
        case OP_DIV:
            if (left_type == TYPE_INT && right_type == TYPE_INT)
                return TYPE_INT;
            if ((left_type == TYPE_FLOAT || left_type == TYPE_INT) &&
                (right_type == TYPE_FLOAT || right_type == TYPE_INT))
                return TYPE_FLOAT;
            type_error("Arithmetic operation on non-numeric types");
            break;

        case OP_LT:
        case OP_GT:
        case OP_LE:
        case OP_GE:
            if (!is_comparable(left_type, right_type))
                type_error("Comparison of incompatible types");
            return TYPE_BOOL;

        case OP_EQ:
        case OP_NE:
            if (!is_equality_comparable(left_type, right_type))
                type_error("Equality test on incompatible types");
            return TYPE_BOOL;
    }
}
```

### Type Checking Statements

Assignment statement type checking:

```c
void check_assignment(AssignStmt* stmt) {
    Type lhs_type = check_lvalue(stmt->target);
    Type rhs_type = check_expr(stmt->value);

    if (!is_assignable(lhs_type, rhs_type)) {
        if (can_coerce(rhs_type, lhs_type)) {
            // Insert implicit coercion
            stmt->value = create_cast_expr(stmt->value, lhs_type);
        } else {
            type_error("Cannot assign %s to %s",
                      type_name(rhs_type), type_name(lhs_type));
        }
    }
}
```

Function call type checking:

```c
Type check_function_call(CallExpr* call) {
    SymbolEntry* func = lookup(call->function_name);
    if (func->kind != SYMBOL_FUNCTION) {
        type_error("%s is not a function", call->function_name);
    }

    FunctionType* ftype = func->function_type;

    if (call->arg_count != ftype->param_count) {
        type_error("Function expects %d arguments, got %d",
                  ftype->param_count, call->arg_count);
    }

    for (int i = 0; i < call->arg_count; i++) {
        Type arg_type = check_expr(call->args[i]);
        Type param_type = ftype->param_types[i];

        if (!is_compatible(arg_type, param_type)) {
            if (can_coerce(arg_type, param_type)) {
                call->args[i] = create_cast_expr(call->args[i], param_type);
            } else {
                type_error("Argument %d: expected %s, got %s",
                          i+1, type_name(param_type), type_name(arg_type));
            }
        }
    }

    return ftype->return_type;
}
```

## Type Equivalence

Determining when two types are equivalent is fundamental to type checking. Two main approaches exist:

### Structural Equivalence

Two types are structurally equivalent if they have the same structure:

```c
bool structurally_equivalent(Type* t1, Type* t2) {
    if (t1->kind != t2->kind) return false;

    switch (t1->kind) {
        case TYPE_INT:
        case TYPE_FLOAT:
        case TYPE_CHAR:
        case TYPE_BOOL:
            return true;  // Basic types match

        case TYPE_POINTER:
            return structurally_equivalent(t1->base_type, t2->base_type);

        case TYPE_ARRAY:
            return t1->array_size == t2->array_size &&
                   structurally_equivalent(t1->element_type, t2->element_type);

        case TYPE_RECORD:
            if (t1->field_count != t2->field_count) return false;
            for (int i = 0; i < t1->field_count; i++) {
                if (strcmp(t1->fields[i].name, t2->fields[i].name) != 0)
                    return false;
                if (!structurally_equivalent(t1->fields[i].type,
                                            t2->fields[i].type))
                    return false;
            }
            return true;

        case TYPE_FUNCTION:
            if (!structurally_equivalent(t1->return_type, t2->return_type))
                return false;
            if (t1->param_count != t2->param_count) return false;
            for (int i = 0; i < t1->param_count; i++) {
                if (!structurally_equivalent(t1->param_types[i],
                                            t2->param_types[i]))
                    return false;
            }
            return true;
    }
}
```

Example in C-like syntax:
```c
struct A { int x; float y; };
struct B { int x; float y; };  // Structurally equivalent to A
struct C { float y; int x; };  // NOT structurally equivalent (different order)
```

### Name Equivalence

Two types are name-equivalent only if they have the same name or originate from the same type declaration:

```c
bool name_equivalent(Type* t1, Type* t2) {
    return t1->type_id == t2->type_id;
}
```

Each type declaration gets a unique identifier:

```c
struct A { int x; float y; };  // type_id = 1
struct B { int x; float y; };  // type_id = 2
typedef struct A AliasA;       // type_id = 1 (refers to A)

// Under name equivalence:
// A and B are different types (different type_ids)
// A and AliasA are the same type (same type_id)
```

C uses name equivalence for structs and unions, structural equivalence for pointers and arrays.

## Type Coercion and Conversion

Type coercion automatically converts values from one type to another. Compilers must determine which coercions are safe and insert explicit conversion operations.

### Implicit Coercion

Widening conversions that don't lose information:

```c
bool can_coerce(Type from, Type to) {
    if (from == to) return true;

    // Numeric widening
    if (from == TYPE_INT && to == TYPE_FLOAT) return true;
    if (from == TYPE_FLOAT && to == TYPE_DOUBLE) return true;

    // Pointer to base class (inheritance)
    if (is_pointer(from) && is_pointer(to)) {
        Type* base_from = from->base_type;
        Type* base_to = to->base_type;
        return is_subtype(base_from, base_to);
    }

    return false;
}

Expr* insert_coercion(Expr* expr, Type target_type) {
    Type source_type = expr->type;

    if (source_type == TYPE_INT && target_type == TYPE_FLOAT) {
        return create_cast_node(CAST_INT_TO_FLOAT, expr);
    }

    return expr;
}
```

### Explicit Conversion (Casting)

Explicit conversions specified by the programmer:

```c
Type check_cast_expr(CastExpr* cast) {
    Type source_type = check_expr(cast->expr);
    Type target_type = cast->target_type;

    // Check if cast is legal
    if (!is_castable(source_type, target_type)) {
        type_error("Cannot cast %s to %s",
                  type_name(source_type), type_name(target_type));
    }

    // Warn about narrowing conversions
    if (is_narrowing(source_type, target_type)) {
        warning("Narrowing conversion from %s to %s may lose information",
               type_name(source_type), type_name(target_type));
    }

    return target_type;
}
```

## Type Checking in Object-Oriented Languages

Object-oriented languages introduce subtyping and polymorphism:

### Subtype Checking

```c
bool is_subtype(Type* sub, Type* super) {
    if (sub == super) return true;

    // Check direct inheritance
    if (sub->kind == TYPE_CLASS) {
        Type* parent = sub->parent_class;
        while (parent != NULL) {
            if (parent == super) return true;
            parent = parent->parent_class;
        }
    }

    // Check interface implementation
    for (int i = 0; i < sub->interface_count; i++) {
        if (sub->interfaces[i] == super) return true;
    }

    return false;
}
```

### Method Resolution

```c
Method* resolve_method(Type* receiver_type, const char* method_name) {
    Type* current = receiver_type;

    while (current != NULL) {
        Method* method = lookup_method(current, method_name);
        if (method != NULL) {
            return method;
        }
        current = current->parent_class;
    }

    type_error("Method %s not found in %s or its superclasses",
              method_name, type_name(receiver_type));
}

Type check_method_call(MethodCallExpr* call) {
    Type receiver_type = check_expr(call->receiver);
    Method* method = resolve_method(receiver_type, call->method_name);

    // Check argument types (similar to function call checking)
    check_arguments(call->args, method->param_types);

    return method->return_type;
}
```

## Advanced Type Checking Features

### Generic/Template Type Checking

```c
Type check_generic_instantiation(GenericType* generic, Type** type_args) {
    // Verify type arguments satisfy constraints
    for (int i = 0; i < generic->param_count; i++) {
        Type* arg = type_args[i];
        Constraint* constraint = generic->constraints[i];

        if (!satisfies_constraint(arg, constraint)) {
            type_error("Type %s does not satisfy constraint for parameter %s",
                      type_name(arg), generic->param_names[i]);
        }
    }

    // Instantiate generic type with concrete type arguments
    return instantiate_generic(generic, type_args);
}
```

### Type Checking with Type Inference

Some languages infer types without explicit annotations:

```c
Type infer_expr_type(Expr* expr) {
    switch (expr->kind) {
        case EXPR_INT_LITERAL:
            return TYPE_INT;

        case EXPR_VAR:
            return lookup_var_type(expr->var_name);

        case EXPR_LAMBDA: {
            // Infer lambda type from usage context
            Type* param_types = infer_parameter_types(expr);
            Type return_type = infer_body_type(expr->body);
            return create_function_type(param_types, return_type);
        }
    }
}
```

## Key Takeaways

- Type checking verifies that operations are applied to compatible types according to language rules
- Static type checking occurs at compile time, catching type errors before execution
- Type expressions represent types using basic types and type constructors (array, pointer, record, function)
- Structural equivalence compares type structure; name equivalence compares type identities
- Type coercion automatically converts values between types when safe and permitted
- Function call type checking verifies argument count and types match parameter specifications
- Object-oriented type checking includes subtype checking and method resolution through inheritance chains
- Implicit coercions handle widening conversions; explicit casts handle potentially unsafe conversions
- Generic/template type checking verifies type arguments satisfy constraints before instantiation
- Proper type checking improves program reliability by detecting errors at compile time rather than runtime
