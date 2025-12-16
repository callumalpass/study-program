# Environments, Closures, and Lexical Scoping

Environments manage the binding of names to values during program execution, while closures enable functions to capture and carry their defining environment with them. Together, these concepts form the foundation for implementing variables, functions, and scope in interpreters.

## Environments: Mapping Names to Values

An environment (also called a symbol table or scope) is a data structure that maps variable names to their values or locations. It's the interpreter's memory of what names mean at any point in program execution.

The simplest environment is a dictionary:

```python
class Environment:
    def __init__(self):
        self.bindings = {}

    def define(self, name, value):
        self.bindings[name] = value

    def lookup(self, name):
        if name in self.bindings:
            return self.bindings[name]
        raise NameError(f"Undefined variable: {name}")

    def update(self, name, value):
        if name in self.bindings:
            self.bindings[name] = value
        else:
            raise NameError(f"Cannot assign to undefined variable: {name}")
```

This flat environment works for languages without nested scopes. For more complex languages, we need hierarchical environments to support nested scopes.

## Nested Environments and Scope Chains

Most languages support nested scopes where inner scopes can access outer scope variables:

```python
x = 10        # Global scope
def outer():
    y = 20    # outer function scope
    def inner():
        z = 30  # inner function scope
        return x + y + z  # Access all three scopes
    return inner()
```

We implement this with linked environments, where each environment has a parent:

```python
class Environment:
    def __init__(self, parent=None):
        self.bindings = {}
        self.parent = parent

    def define(self, name, value):
        self.bindings[name] = value

    def lookup(self, name):
        if name in self.bindings:
            return self.bindings[name]
        elif self.parent is not None:
            return self.parent.lookup(name)
        else:
            raise NameError(f"Undefined variable: {name}")

    def update(self, name, value):
        if name in self.bindings:
            self.bindings[name] = value
        elif self.parent is not None:
            self.parent.update(name, value)
        else:
            raise NameError(f"Cannot assign to undefined variable: {name}")
```

Lookup proceeds outward through the scope chain until the name is found or we reach the outermost scope. This implements lexical scoping where variable resolution follows the static structure of the program.

Creating nested scopes:

```python
def eval_function_call(func, args, current_env):
    # Create new environment for function body
    func_env = Environment(parent=func.closure_env)

    # Bind parameters to arguments
    for param, arg in zip(func.params, args):
        func_env.define(param, arg)

    # Evaluate function body in new environment
    return eval_block(func.body, func_env)
```

## Lexical vs Dynamic Scoping

The scoping rule determines which binding a name refers to. Two main approaches exist:

**Lexical Scoping** (static scoping) resolves names based on where they're written in the source code. The scope chain follows the syntactic nesting structure. This is what we implemented above.

```python
x = 1

def foo():
    print(x)  # Which x?

def bar():
    x = 2
    foo()

bar()  # Prints 1 with lexical scoping
```

With lexical scoping, `x` in `foo` refers to the global `x` because `foo` is defined in the global scope.

**Dynamic Scoping** resolves names based on the call stack at runtime. Variables refer to the most recent binding on the call stack.

```python
# With dynamic scoping
x = 1

def foo():
    print(x)  # Looks up call stack

def bar():
    x = 2
    foo()

bar()  # Prints 2 with dynamic scoping
```

With dynamic scoping, `x` in `foo` refers to the `x` defined in `bar` because `bar` called `foo`.

**Implementation of Dynamic Scoping**:

```python
# Global call stack
call_stack = []

def eval_function_call_dynamic(func, args):
    # Create environment with current top of stack as parent
    func_env = Environment(parent=call_stack[-1] if call_stack else None)

    # Bind parameters
    for param, arg in zip(func.params, args):
        func_env.define(param, arg)

    # Push environment onto call stack
    call_stack.append(func_env)
    try:
        result = eval_block(func.body, func_env)
    finally:
        call_stack.pop()

    return result
```

**Why Lexical Scoping Dominates**:

Modern languages overwhelmingly use lexical scoping because:

1. **Predictability**: You can determine what a name refers to by reading the code
2. **Modularity**: Functions are self-contained, not affected by caller's variables
3. **Optimization**: Compilers can resolve bindings statically
4. **Reasoning**: Easier to understand program behavior

Dynamic scoping is rare (early Lisp, some shell scripts) but has niche uses for implementing context-dependent behavior.

## Closures: Functions with Captured Environments

A closure is a function bundled with its defining environment. It "closes over" free variables (variables used but not defined in the function).

```python
def make_counter():
    count = 0
    def increment():
        nonlocal count
        count += 1
        return count
    return increment

counter = make_counter()
print(counter())  # 1
print(counter())  # 2
print(counter())  # 3
```

Each call to `make_counter` creates a new `count` variable and a new closure that captures it. The closure maintains access to `count` even after `make_counter` returns.

**Implementation of Closures**:

```python
class Closure:
    def __init__(self, params, body, env):
        self.params = params
        self.body = body
        self.env = env  # Captured environment

def eval_lambda(params, body, defining_env):
    # Create closure capturing current environment
    return Closure(params, body, defining_env)

def eval_call(func, args):
    if isinstance(func, Closure):
        # Create new environment with closure's environment as parent
        call_env = Environment(parent=func.env)

        # Bind parameters
        for param, arg in zip(func.params, args):
            call_env.define(param, arg)

        # Evaluate body
        return eval_expr(func.body, call_env)
```

The key insight: when creating a function, we capture the current environment. When calling the function, we use that captured environment as the parent, not the caller's environment.

## Closure Examples and Patterns

Closures enable powerful programming patterns:

**Encapsulation and Data Hiding**:
```javascript
function makeBankAccount(initial) {
    let balance = initial;  // Private variable

    return {
        deposit: function(amount) {
            balance += amount;
            return balance;
        },
        withdraw: function(amount) {
            if (amount <= balance) {
                balance -= amount;
                return balance;
            }
            throw new Error("Insufficient funds");
        },
        getBalance: function() {
            return balance;
        }
    };
}

const account = makeBankAccount(100);
account.deposit(50);   // 150
account.withdraw(30);  // 120
// No direct access to balance variable
```

**Partial Application and Currying**:
```javascript
function multiply(x) {
    return function(y) {
        return x * y;
    };
}

const double = multiply(2);
const triple = multiply(3);

console.log(double(5));  // 10
console.log(triple(5));  // 15
```

**Callbacks with Context**:
```python
def create_button_handler(button_id):
    def handler(event):
        print(f"Button {button_id} clicked")
        # button_id is captured from outer scope
    return handler

button1.onclick = create_button_handler(1)
button2.onclick = create_button_handler(2)
```

**Iterators and Generators**:
```python
def make_range(start, end):
    current = start
    def next():
        nonlocal current
        if current < end:
            value = current
            current += 1
            return value
        raise StopIteration
    return next
```

## Environment Implementation Strategies

Different implementation strategies optimize for different use cases:

**Association Lists**: Simple linked list of (name, value) pairs:
```scheme
'((x . 10) (y . 20) (z . 30))
```
Simple but O(n) lookup time.

**Hash Tables**: Fast O(1) lookup but higher overhead:
```python
self.bindings = {}  # Python dict
```

**De Bruijn Indices**: Replace names with numbers indicating scope distance:
```
λ λ 1 + 0  # Instead of λx λy x + y
```
Eliminates name lookup entirely, but less readable.

**Flat Closures**: Capture only needed variables, not entire environment:
```python
class FlatClosure:
    def __init__(self, params, body, captures):
        self.params = params
        self.body = body
        self.captures = captures  # Only captured variables
```

This is more memory-efficient than capturing the entire environment chain.

**Display or Static Links**: Maintain array of environment references for each scope level:
```python
class FrameDisplay:
    def __init__(self):
        self.frames = []  # frames[i] is environment at nesting level i

    def lookup(self, level, offset):
        return self.frames[level].bindings[offset]
```

Allows O(1) variable access when nesting level is known statically.

## Mutable vs Immutable Environments

Some languages use immutable environments where each binding creates a new environment:

```haskell
extend :: Env -> Name -> Value -> Env
extend env name value = Env (Map.insert name value (bindings env)) (parent env)
```

Benefits:
- Thread-safe
- Easy to implement undo/backtracking
- Supports time-travel debugging

Drawbacks:
- More allocation
- Can't naturally express mutable variables

Most interpreters use mutable environments with mutable bindings for performance and to support variable mutation.

## Handling Recursive Functions

Recursive functions pose a challenge: the function needs to refer to itself, but it doesn't exist yet when we're defining it.

**Explicit Fix Point**:
```python
def eval_letrec(name, func_def, body, env):
    # Create placeholder
    func_env = Environment(parent=env)
    func_env.define(name, None)

    # Evaluate function in environment containing itself
    func = eval_lambda(func_def, func_env)

    # Update binding to actual function
    func_env.update(name, func)

    # Evaluate body
    return eval_expr(body, func_env)
```

**Mutual Recursion**: Multiple functions referring to each other:
```python
def eval_letrec_multi(bindings, body, env):
    # Create environment with all names bound to placeholders
    new_env = Environment(parent=env)
    for name, _ in bindings:
        new_env.define(name, None)

    # Evaluate all functions in shared environment
    for name, func_def in bindings:
        func = eval_lambda(func_def, new_env)
        new_env.update(name, func)

    # Evaluate body
    return eval_expr(body, new_env)
```

This allows functions to refer to each other during their definitions, enabling mutually recursive functions.
