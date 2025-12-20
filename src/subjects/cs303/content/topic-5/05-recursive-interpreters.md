# Recursive Interpreters

Recursive descent interpretation is the most natural and widely-used technique for implementing interpreters. The interpreter's structure mirrors the language's grammar, with each language construct handled by a corresponding interpreter function. This elegant correspondence makes recursive interpreters both intuitive to write and easy to understand.

## The Recursive Descent Pattern

The core idea is simple: to interpret a compound expression, recursively interpret its subexpressions and combine the results. Each syntactic category has an interpretation function that pattern-matches on the expression structure.

For an expression language:

```python
def eval_expr(expr, env):
    # Numbers evaluate to themselves
    if isinstance(expr, Num):
        return expr.value

    # Variables look up their values in the environment
    elif isinstance(expr, Var):
        return env.lookup(expr.name)

    # Binary operations: evaluate operands, apply operator
    elif isinstance(expr, BinOp):
        left_val = eval_expr(expr.left, env)
        right_val = eval_expr(expr.right, env)
        return apply_binop(expr.op, left_val, right_val)

    # Function calls: evaluate function and arguments, apply
    elif isinstance(expr, Call):
        func = eval_expr(expr.func, env)
        args = [eval_expr(arg, env) for arg in expr.args]
        return apply_function(func, args, env)

    else:
        raise InterpreterError(f"Unknown expression type: {type(expr)}")
```

This structure is recursive in two senses:
1. The function calls itself on subexpressions (recursive function)
2. The language can contain recursive constructs (recursive expressions)

## Statements and Control Flow

Statement interpretation follows the same pattern but focuses on effects rather than values:

```python
def eval_stmt(stmt, env):
    if isinstance(stmt, Assignment):
        value = eval_expr(stmt.expr, env)
        env.update(stmt.var, value)
        return None

    elif isinstance(stmt, If):
        condition = eval_expr(stmt.condition, env)
        if is_truthy(condition):
            return eval_stmt(stmt.then_branch, env)
        elif stmt.else_branch:
            return eval_stmt(stmt.else_branch, env)
        return None

    elif isinstance(stmt, While):
        while True:
            condition = eval_expr(stmt.condition, env)
            if not is_truthy(condition):
                break
            eval_stmt(stmt.body, env)
        return None

    elif isinstance(stmt, Block):
        # Create new scope for block
        block_env = Environment(parent=env)
        result = None
        for s in stmt.statements:
            result = eval_stmt(s, block_env)
            if isinstance(result, ReturnValue):
                return result
        return result

    elif isinstance(stmt, Return):
        value = eval_expr(stmt.expr, env)
        return ReturnValue(value)  # Special marker for returns

    else:
        raise InterpreterError(f"Unknown statement type: {type(stmt)}")
```

Notice how the interpreter structure directly reflects the language semantics:
- `if` statements evaluate the condition and choose a branch
- `while` loops repeatedly execute the body while the condition holds
- Blocks create new scopes and execute statements sequentially

## Function Definition and Application

Functions are first-class values that capture their defining environment:

```python
class Function:
    def __init__(self, params, body, closure_env):
        self.params = params
        self.body = body
        self.closure_env = closure_env

def eval_function_def(params, body, defining_env):
    return Function(params, body, defining_env)

def apply_function(func, args, call_env):
    if not isinstance(func, Function):
        raise TypeError(f"Cannot call non-function: {func}")

    if len(args) != len(func.params):
        raise TypeError(f"Expected {len(func.params)} args, got {len(args)}")

    # Create new environment extending closure environment
    func_env = Environment(parent=func.closure_env)

    # Bind parameters to arguments
    for param, arg in zip(func.params, args):
        func_env.define(param, arg)

    # Execute function body
    result = eval_stmt(func.body, func_env)

    # Extract return value if present
    if isinstance(result, ReturnValue):
        return result.value
    else:
        return None  # Implicit return None
```

This implements lexical scoping: functions execute in their defining environment (closure), not the calling environment.

## Handling Recursion

The interpreter naturally handles recursive functions because it maintains a call stack through Python's own call stack. When a function calls itself:

```python
def factorial(n):
    if n <= 1:
        return 1
    else:
        return n * factorial(n - 1)

result = factorial(5)
```

The interpreter's execution:
1. `eval_call(factorial, [5])` creates environment with `n = 5`
2. Evaluates body, reaches `factorial(n - 1)`
3. `eval_call(factorial, [4])` creates new environment with `n = 4`
4. This continues until `n = 1`
5. Returns unwind: `1`, then `2 * 1`, then `3 * 2`, then `4 * 6`, then `5 * 24`

Each recursive call creates a new environment, so the different values of `n` don't interfere. The recursive calls are actual recursive calls in the interpreter implementation.

However, this has a limitation: the interpreter's recursion depth is limited by the implementation language's stack size. Deep recursion can cause stack overflow:

```python
factorial(10000)  # May cause stack overflow
```

## Tail Call Optimization

Tail calls are function calls in tail position - the call's result is immediately returned without further computation. Tail recursive functions can be optimized to reuse the current stack frame rather than creating a new one.

A tail-recursive factorial:
```python
def factorial_tail(n, acc=1):
    if n <= 1:
        return acc
    else:
        return factorial_tail(n - 1, n * acc)
```

The call to `factorial_tail(n - 1, n * acc)` is in tail position - its result is returned directly.

**Implementing Tail Call Optimization**:

```python
class TailCall:
    def __init__(self, func, args):
        self.func = func
        self.args = args

def apply_function(func, args, call_env):
    # Initial call
    current_func = func
    current_args = args

    while True:
        # Create environment and bind parameters
        func_env = Environment(parent=current_func.closure_env)
        for param, arg in zip(current_func.params, current_args):
            func_env.define(param, arg)

        # Execute body
        result = eval_stmt(current_func.body, func_env)

        # If result is a tail call, loop instead of recursing
        if isinstance(result, TailCall):
            current_func = result.func
            current_args = result.args
            # Loop continues with new function and args
        else:
            # Not a tail call, return result
            if isinstance(result, ReturnValue):
                return result.value
            return None
```

We need to detect tail calls during interpretation:

```python
def eval_stmt(stmt, env, tail_position=False):
    if isinstance(stmt, Return):
        value = eval_expr(stmt.expr, env)

        # Check if return value is a function call in tail position
        if tail_position and isinstance(stmt.expr, Call):
            func = eval_expr(stmt.expr.func, env)
            args = [eval_expr(arg, env) for arg in stmt.expr.args]
            return TailCall(func, args)

        return ReturnValue(value)

    # ... other statement types
```

With this optimization, tail-recursive functions can recurse indefinitely without stack overflow.

## Error Handling and Stack Traces

When errors occur, we want helpful error messages with stack traces. We maintain an explicit call stack:

```python
call_stack = []

class CallFrame:
    def __init__(self, func_name, args, location):
        self.func_name = func_name
        self.args = args
        self.location = location  # Source file location

def apply_function(func, args, call_env):
    # Push call frame
    frame = CallFrame(func.name, args, func.location)
    call_stack.append(frame)

    try:
        # Execute function
        func_env = Environment(parent=func.closure_env)
        for param, arg in zip(func.params, args):
            func_env.define(param, arg)
        result = eval_stmt(func.body, func_env)

        if isinstance(result, ReturnValue):
            return result.value
        return None

    except InterpreterError as e:
        # Add stack trace information
        e.add_trace(frame)
        raise

    finally:
        # Pop call frame
        call_stack.pop()
```

When an error occurs, we can generate a stack trace:

```python
class InterpreterError(Exception):
    def __init__(self, message):
        self.message = message
        self.trace = []

    def add_trace(self, frame):
        self.trace.insert(0, frame)

    def format_trace(self):
        lines = [self.message]
        for frame in self.trace:
            lines.append(f"  at {frame.func_name} ({frame.location})")
        return "\n".join(lines)
```

This produces readable error messages:
```
NameError: Undefined variable 'x'
  at inner (example.py:5)
  at outer (example.py:8)
  at main (example.py:11)
```

## Interpreting Different Language Paradigms

The recursive descent pattern adapts to different language paradigms:

**Functional Languages**: Emphasize expression evaluation, immutable data, and higher-order functions:

```python
def eval_expr(expr, env):
    # ... basic cases ...

    elif isinstance(expr, Lambda):
        return Function(expr.params, expr.body, env)

    elif isinstance(expr, Let):
        # let x = e1 in e2
        value = eval_expr(expr.binding, env)
        new_env = Environment(parent=env)
        new_env.define(expr.var, value)
        return eval_expr(expr.body, new_env)

    elif isinstance(expr, Match):
        # Pattern matching
        value = eval_expr(expr.scrutinee, env)
        for pattern, branch in expr.cases:
            bindings = match_pattern(pattern, value)
            if bindings is not None:
                new_env = env.extend_multiple(bindings)
                return eval_expr(branch, new_env)
        raise MatchError("No pattern matched")
```

**Object-Oriented Languages**: Add objects, classes, and methods:

```python
class Object:
    def __init__(self, class_ref, fields):
        self.class_ref = class_ref
        self.fields = fields  # name -> value

def eval_method_call(obj, method_name, args, env):
    # Look up method in object's class
    method = obj.class_ref.lookup_method(method_name)

    # Create environment with 'self' bound to object
    method_env = Environment(parent=method.closure_env)
    method_env.define('self', obj)

    # Bind parameters
    for param, arg in zip(method.params, args):
        method_env.define(param, arg)

    # Execute method body
    return eval_stmt(method.body, method_env)
```

**Logic Programming**: Implement search and backtracking:

```python
def eval_query(goal, env):
    if isinstance(goal, Atom):
        # Try to unify with each fact/rule
        for clause in knowledge_base:
            bindings = unify(goal, clause.head, env)
            if bindings is not None:
                # Found a match
                yield bindings

    elif isinstance(goal, Conjunction):
        # A ∧ B: solve A, then solve B with A's bindings
        for bindings1 in eval_query(goal.left, env):
            env1 = env.extend(bindings1)
            for bindings2 in eval_query(goal.right, env1):
                yield {**bindings1, **bindings2}
```

The recursive descent pattern provides a flexible foundation that naturally extends to diverse programming paradigms.

## Performance Considerations

Naive recursive interpreters are slow (10-100x slower than compiled code), but several optimizations help:

**Bytecode Compilation**: Compile AST to bytecode before interpretation
**Inline Caching**: Cache method lookups and type checks
**Constant Folding**: Evaluate constant expressions during parsing
**JIT Compilation**: Compile hot code paths to native code

Even without these optimizations, recursive interpreters are valuable for:
- Prototyping new language designs
- Educational purposes
- Embedded domain-specific languages
- Configuration languages where performance isn't critical
