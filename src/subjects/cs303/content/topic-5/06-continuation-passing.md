# Continuation-Passing Style Interpreters

Continuation-passing style (CPS) is a powerful technique for implementing interpreters that makes control flow explicit. Rather than using the implementation language's call stack, CPS interpreters pass around continuations - explicit representations of "what to do next." This enables implementing advanced control features like exceptions, coroutines, and time-traveling debuggers.

## Understanding Continuations

A continuation represents the rest of the computation. When evaluating an expression, the continuation describes what should be done with the result. Instead of returning values directly, functions pass results to their continuation.

Consider evaluating `2 + 3 * 4`:
1. Evaluate `2`, then continue with: add it to `3 * 4`
2. Evaluate `3 * 4`, then continue with: add `2` to it
3. Evaluate `3`, then continue with: multiply it by `4`
4. Evaluate `4`, then continue with: multiply `3` by it

In direct style (normal programming), we write:
```python
def eval_expr(expr):
    if isinstance(expr, Num):
        return expr.value
    elif isinstance(expr, Add):
        left = eval_expr(expr.left)
        right = eval_expr(expr.right)
        return left + right
```

In continuation-passing style:
```python
def eval_expr(expr, cont):
    if isinstance(expr, Num):
        cont(expr.value)
    elif isinstance(expr, Add):
        eval_expr(expr.left, lambda left:
            eval_expr(expr.right, lambda right:
                cont(left + right)))
```

Instead of returning the result, we pass it to the continuation `cont`. The continuation parameter makes "what to do next" explicit.

## Basic CPS Interpreter Structure

Let's build a CPS interpreter for an expression language:

```python
# Continuation type: functions from values to final results
# cont :: Value -> Result

def eval_expr(expr, env, cont):
    if isinstance(expr, Num):
        # Base case: pass value to continuation
        return cont(expr.value)

    elif isinstance(expr, Var):
        # Look up variable and continue
        value = env.lookup(expr.name)
        return cont(value)

    elif isinstance(expr, BinOp):
        # Evaluate left operand
        return eval_expr(expr.left, env, lambda left:
            # After getting left, evaluate right operand
            eval_expr(expr.right, env, lambda right:
                # After getting both, apply operator and continue
                cont(apply_op(expr.op, left, right))))

    elif isinstance(expr, If):
        # Evaluate condition
        return eval_expr(expr.condition, env, lambda cond_val:
            # Choose branch based on condition
            eval_expr(
                expr.then_branch if cond_val else expr.else_branch,
                env,
                cont
            ))
```

To run the interpreter, we provide an initial continuation (often the identity function):

```python
def run(expr, env):
    return eval_expr(expr, env, lambda x: x)
```

## Why CPS? Control Flow Benefits

CPS makes several advanced control flow features straightforward to implement:

**Early Return / Exceptions**: We can jump to any continuation, bypassing intermediate computation:

```python
def eval_expr(expr, env, cont, error_cont):
    if isinstance(expr, Throw):
        # Evaluate exception value and jump to error handler
        return eval_expr(expr.value, env, error_cont, error_cont)

    elif isinstance(expr, Try):
        # Evaluate body with custom error continuation
        def handle_error(error_val):
            # Bind exception to handler variable and evaluate handler
            handler_env = env.extend(expr.handler_var, error_val)
            return eval_expr(expr.handler, handler_env, cont, error_cont)

        return eval_expr(expr.body, env, cont, handle_error)

    elif isinstance(expr, Div):
        return eval_expr(expr.left, env, lambda left:
            eval_expr(expr.right, env, lambda right:
                error_cont("Division by zero") if right == 0
                else cont(left / right),
            error_cont),
        error_cont)

    # ... other expressions pass error_cont through ...
```

Now we can throw and catch exceptions without language support:

```python
try:
    10 / 0
catch e:
    print("Error:", e)
```

**First-Class Continuations**: Some languages (Scheme's `call/cc`, Racket's delimited continuations) expose continuations as first-class values:

```python
class Continuation:
    def __init__(self, cont):
        self.cont = cont

def eval_expr(expr, env, cont):
    # ... other cases ...

    elif isinstance(expr, CallCC):
        # call/cc: pass current continuation as a function to expr.func
        escape = lambda value: cont(value)
        return eval_expr(expr.func, env, lambda func:
            apply_function(func, [Continuation(escape)], env, cont))

# Usage: call/cc can escape from computation
def example():
    call/cc(lambda escape:
        begin(
            print("Before"),
            escape(42),  # Jumps out, returning 42
            print("After")  # Never executed
        ))
```

## Implementing Loops with CPS

While loops become explicit tail recursion in CPS:

```python
def eval_stmt(stmt, env, cont):
    if isinstance(stmt, While):
        # Define loop function that checks condition and recurses
        def loop():
            return eval_expr(stmt.condition, env, lambda cond_val:
                # If true, execute body and loop again
                eval_stmt(stmt.body, env, lambda _: loop())
                if cond_val
                # If false, continue after loop
                else cont(None))

        return loop()

    elif isinstance(stmt, Block):
        # Execute statements in sequence
        def exec_sequence(stmts):
            if not stmts:
                return cont(None)
            return eval_stmt(stmts[0], env, lambda _:
                exec_sequence(stmts[1:]))

        return exec_sequence(stmt.statements)
```

Notice there's no actual looping construct in the interpreter - the loop is implemented as recursive continuation calls.

## Call Stack vs Continuation Stack

Direct style interpreters use the implementation language's call stack. CPS interpreters make the continuation stack explicit:

**Direct Style**:
```python
def eval(expr):
    # Python's stack frame
    left = eval(expr.left)   # Recursive call pushes stack frame
    right = eval(expr.right) # Another stack frame
    return left + right      # Returns pop stack frames
```

**CPS Style**:
```python
def eval(expr, cont):
    # No stack frames! All calls are tail calls
    eval(expr.left, lambda left:
        eval(expr.right, lambda right:
            cont(left + right)))
```

In CPS, every call is a tail call - we never return to the caller. The continuation captures what would be the rest of the stack in direct style.

This has important implications:
- **Stack Overflow Prevention**: CPS with trampoline eliminates stack overflow
- **Explicit Control**: We can save/restore continuations for debugging
- **Non-local Jumps**: Easy to implement exceptions, backtracking, coroutines

## Defunctionalization: Making Continuations Concrete

Lambda functions in continuations can be inefficient. Defunctionalization converts them to data structures:

Instead of:
```python
eval(expr.left, lambda left:
    eval(expr.right, lambda right:
        cont(left + right)))
```

Use continuation data types:
```python
class AddRightCont:
    def __init__(self, right_expr, env, cont):
        self.right_expr = right_expr
        self.env = env
        self.cont = cont

    def apply(self, left_value):
        return eval_expr(self.right_expr, self.env,
            AddBothCont(left_value, self.cont))

class AddBothCont:
    def __init__(self, left_value, cont):
        self.left_value = left_value
        self.cont = cont

    def apply(self, right_value):
        return self.cont.apply(self.left_value + right_value)

class HaltCont:
    def apply(self, value):
        return value

def eval_expr(expr, env, cont):
    if isinstance(expr, Add):
        return eval_expr(expr.left, env,
            AddRightCont(expr.right, env, cont))
    # ...
```

Now continuations are explicit data structures we can inspect, serialize, and manipulate.

## Trampolining: Eliminating Stack Usage

Even in CPS, deeply nested continuation calls can overflow the stack. A trampoline bounces between continuation calls without growing the stack:

```python
class Bounce:
    def __init__(self, thunk):
        self.thunk = thunk

def trampoline(result):
    while isinstance(result, Bounce):
        result = result.thunk()
    return result

# Modify interpreter to return bounces
def eval_expr(expr, env, cont):
    if isinstance(expr, Num):
        return Bounce(lambda: cont(expr.value))

    elif isinstance(expr, Add):
        return Bounce(lambda:
            eval_expr(expr.left, env, lambda left:
                Bounce(lambda:
                    eval_expr(expr.right, env, lambda right:
                        Bounce(lambda: cont(left + right))))))
```

Run with:
```python
result = trampoline(eval_expr(expr, env, lambda x: x))
```

The trampoline iteratively executes each bounce, preventing stack growth.

## Time-Traveling Debugger

CPS enables powerful debugging by reifying control flow:

```python
history = []

def eval_expr_debug(expr, env, cont):
    # Save state before each evaluation
    state = {'expr': expr, 'env': env.snapshot(), 'cont': cont}
    history.append(state)

    # Normal evaluation
    result = eval_expr(expr, env, cont)

    return result

def rewind(steps):
    # Go back in history
    if steps > len(history):
        steps = len(history)

    state = history[-steps]

    # Resume from saved state
    return eval_expr_debug(state['expr'], state['env'].restore(), state['cont'])
```

Users can step backward and forward through execution, examine any historical state, and even modify values and continue from earlier points.

## CPS Transformation

We can mechanically transform any direct-style program to CPS:

**Rules**:
1. Add continuation parameter to every function
2. Pass results to continuation instead of returning
3. In function applications, evaluate arguments, then pass to continuation

Example transformation:
```python
# Direct style
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n - 1)

# CPS style
def factorial_cps(n, cont):
    if n == 0:
        cont(1)
    else:
        factorial_cps(n - 1, lambda result:
            cont(n * result))
```

This transformation can be automated by compilers, enabling advanced optimizations and control flow features while the programmer writes normal code.

## Practical Applications

CPS interpreters power several important systems:

**Scheme and Racket**: Implement `call/cc` and delimited continuations through CPS
**JavaScript Async/Await**: Compiled to CPS with continuation callbacks
**Web Servers**: Suspend request handlers and resume when I/O completes
**Game Engines**: Pause and resume scripts at any point

While CPS adds complexity, it provides unmatched power for implementing advanced control flow, making it essential for sophisticated language implementations.
