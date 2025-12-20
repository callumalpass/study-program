# Evaluation Strategies

Evaluation strategies determine when and how function arguments are evaluated and passed to functions. This seemingly simple choice has profound implications for language semantics, performance, and expressiveness. Different strategies enable different programming patterns and affect which programs terminate, how memory is used, and how side effects behave.

## Call by Value (Eager Evaluation)

Call by value, also known as eager evaluation or strict evaluation, evaluates all function arguments before the function is invoked. The function receives the computed values, not the expressions that produced them.

Consider the function call `f(2 + 3, 4 * 5)`:
1. Evaluate `2 + 3` to get `5`
2. Evaluate `4 * 5` to get `20`
3. Call `f` with values `5` and `20`

Most mainstream languages use call by value: C, Java, Python, JavaScript, Ruby, and Go. It's intuitive because it matches how we think about mathematical functions and provides predictable performance characteristics.

**Implementation in an Interpreter**:
```python
def eval_call(func_expr, arg_exprs, env):
    # Evaluate function expression
    func = eval_expr(func_expr, env)

    # Evaluate all arguments (call by value)
    arg_values = [eval_expr(arg, env) for arg in arg_exprs]

    # Apply function to values
    return apply_function(func, arg_values)
```

Call by value has important properties:

**Predictable Evaluation Order**: Arguments are evaluated left-to-right (in most languages), making side effects predictable:
```c
int x = 0;
f(x++, x++, x++);  // Arguments are 0, 1, 2 (left-to-right)
```

**No Repeated Evaluation**: Each argument expression is evaluated exactly once, regardless of how many times the function uses the parameter:
```python
def use_twice(x):
    return x + x

result = use_twice(expensive_computation())
# expensive_computation() is called once
```

**Simplicity**: Functions work with values, not expressions. The implementation doesn't need to track unevaluated expressions.

However, call by value has limitations:

**Unnecessary Work**: If an argument isn't used, its evaluation was wasted:
```python
def conditional(cond, then_val, else_val):
    if cond:
        return then_val
    else:
        return else_val

result = conditional(True, cheap(), expensive())
# expensive() is evaluated even though it's not needed
```

**Cannot Express Infinite Structures**: All elements must be computed:
```python
# Cannot create infinite list in strict language
def naturals():
    return [0, 1, 2, 3, ...]  # Would never finish evaluating
```

**Short-Circuit Operators are Special**: Languages must special-case boolean operators:
```python
False and expensive()  # expensive() not evaluated
True or expensive()    # expensive() not evaluated
```

These operators can't be ordinary functions under call by value because that would evaluate all arguments.

## Call by Reference

Call by reference passes a reference to the argument variable rather than its value. The function can modify the caller's variable through this reference.

```cpp
void swap(int& x, int& y) {
    int temp = x;
    x = y;
    y = temp;
}

int a = 1, b = 2;
swap(a, b);
// Now a = 2, b = 1
```

True call by reference (as in C++) is relatively rare. More common is "call by value where the value is a reference":

```python
def modify_list(lst):
    lst.append(42)

my_list = [1, 2, 3]
modify_list(my_list)
# my_list is now [1, 2, 3, 42]
```

Python passes object references by value - the function receives a copy of the reference, not a reference to the variable itself. This distinction matters:

```python
def reassign(lst):
    lst = [99]  # Rebinds local parameter, doesn't affect caller

my_list = [1, 2, 3]
reassign(my_list)
# my_list is still [1, 2, 3]
```

**Implementation Considerations**:
Call by reference requires tracking variable locations (memory addresses or environment positions) rather than just values:

```python
class Reference:
    def __init__(self, env, name):
        self.env = env
        self.name = name

    def get(self):
        return self.env.lookup(self.name)

    def set(self, value):
        self.env.update(self.name, value)

def eval_call_by_reference(func, arg_exprs, env):
    # Create references to argument variables
    arg_refs = []
    for arg in arg_exprs:
        if isinstance(arg, Variable):
            arg_refs.append(Reference(env, arg.name))
        else:
            # Can't pass expression by reference
            raise Error("Reference requires variable")

    return apply_function(func, arg_refs)
```

## Call by Name (Lazy Evaluation)

Call by name passes unevaluated argument expressions to functions. Each time the parameter is used, the expression is re-evaluated in the caller's environment.

Consider:
```
def use_twice(x):
    return x + x

result = use_twice(print("hello"))
```

With call by name, `print("hello")` is evaluated twice, printing "hello" twice.

Algol-60 used call by name, leading to famous examples demonstrating its subtleties:

```algol
procedure swap(a, b);
    integer a, b;
    integer temp;
begin
    temp := a;
    a := b;
    b := temp;
end;

integer array[1:10];
integer i = 1;
swap(array[i], i);
```

With call by name, this doesn't swap values as expected! When executing `a := b`, it evaluates to `array[i] := i`, setting `array[1] = 1`. Then `i := temp` sets `i = 1`, leaving `array[1] = 1` unchanged!

**Implementation with Thunks**:
Call by name is implemented using thunks - closures that capture the argument expression and environment:

```python
class Thunk:
    def __init__(self, expr, env):
        self.expr = expr
        self.env = env

    def force(self):
        return eval_expr(self.expr, self.env)

def eval_call_by_name(func, arg_exprs, env):
    # Wrap arguments in thunks
    thunks = [Thunk(arg, env) for arg in arg_exprs]

    # Function body forces thunks when needed
    return apply_function(func, thunks)

def eval_variable(var, env):
    value = env.lookup(var.name)
    if isinstance(value, Thunk):
        return value.force()
    return value
```

Call by name enables powerful abstraction capabilities. You can define control structures as ordinary functions:

```
def my_if(condition, then_branch, else_branch):
    if condition:
        return then_branch
    else:
        return else_branch

my_if(x > 0, print("positive"), print("negative"))
# Only one branch executes
```

However, call by name has serious performance problems - the same expression might be re-evaluated many times.

## Call by Need (Lazy Evaluation with Memoization)

Call by need improves on call by name by caching the result of each thunk's first evaluation. Subsequent accesses return the cached value without re-evaluation.

Haskell uses call by need for all evaluation. This enables elegant programming with infinite data structures:

```haskell
naturals = [0..]  -- Infinite list
take 10 naturals  -- [0,1,2,3,4,5,6,7,8,9]

fibs = 0 : 1 : zipWith (+) fibs (tail fibs)
-- Infinite Fibonacci sequence
```

**Implementation with Memoizing Thunks**:
```python
class MemoThunk:
    def __init__(self, expr, env):
        self.expr = expr
        self.env = env
        self.value = None
        self.evaluated = False

    def force(self):
        if not self.evaluated:
            self.value = eval_expr(self.expr, self.env)
            self.evaluated = True
            # Release expr and env for garbage collection
            self.expr = None
            self.env = None
        return self.value
```

Call by need guarantees:
- Each expression is evaluated at most once
- Evaluation happens only when needed
- Later accesses are as fast as with call by value

This enables powerful programming patterns:

**Infinite Data Structures**:
```haskell
primes = sieve [2..]
  where
    sieve (p:xs) = p : sieve [x | x <- xs, x `mod` p /= 0]

take 10 primes  -- First 10 primes efficiently
```

**Automatic Short-Circuiting**:
```haskell
-- All functions are automatically short-circuiting
myAnd x y = if x then y else False

myAnd False (error "boom")  -- Returns False, no error
```

**Delayed Computation**:
```haskell
expensiveList = map expensiveFunction [1..1000000]
-- List isn't computed yet

head expensiveList
-- Only first element computed
```

However, lazy evaluation has drawbacks:

**Space Leaks**: Unevaluated thunks accumulate in memory:
```haskell
foldl (+) 0 [1..1000000]
-- Builds huge thunk: (((0 + 1) + 2) + 3) + ...
-- Requires O(n) space before evaluating
```

**Unpredictable Performance**: Hard to reason about when evaluation occurs:
```haskell
length (filter expensive_predicate huge_list)
-- When does expensive_predicate run?
```

**Debugging Challenges**: Stack traces don't correspond to call order. Side effects occur in unexpected order.

## Comparison and Trade-offs

Different evaluation strategies suit different contexts:

| Strategy | Pros | Cons | Best For |
|----------|------|------|----------|
| Call by Value | Simple, predictable, efficient | Can't express infinite structures | General-purpose programming |
| Call by Reference | Efficient mutation | Aliasing complexity | Systems programming |
| Call by Name | Maximum laziness, powerful abstraction | Re-evaluation overhead | Educational, macro systems |
| Call by Need | Lazy + efficient, infinite structures | Space leaks, unpredictable timing | Functional programming |

Some languages combine strategies:

**Scala**: Strict by default, explicit lazy parameters:
```scala
def conditional[A](cond: Boolean, thenBranch: => A, elseBranch: => A): A =
  if (cond) thenBranch else elseBranch
```

**Python**: Strict, but generators provide lazy sequences:
```python
def naturals():
    n = 0
    while True:
        yield n
        n += 1

for i in naturals():  # Generates values on demand
    if i > 10: break
```

**OCaml**: Strict, but explicit lazy values:
```ocaml
let rec fibs = lazy (0 :: lazy (1 :: lazy (zipWith (+) fibs (tail fibs))))
```

## Implementation Strategies

Modern implementations often use hybrid approaches:

**Optimistic Evaluation**: Start evaluating eagerly, but track dependencies so work can be discarded if not needed.

**Speculative Evaluation**: Evaluate likely-needed arguments in parallel on spare cores.

**Profile-Guided Optimization**: Use runtime profiling to identify which arguments are typically used and evaluate those eagerly.

These strategies attempt to get the benefits of multiple evaluation strategies while minimizing their drawbacks.
