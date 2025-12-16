## Scope (Where Variables Live)

Scope determines where a variable can be accessed in your program. Understanding scope helps you avoid bugs where variables have unexpected values or don't exist when you expect them to.

---

## What Is Scope?

When you create a variable, it exists only in a certain region of your code - its **scope**. Variables created inside a function exist only inside that function:

```python
def greet():
    message = "Hello"  # 'message' exists only inside greet()
    print(message)

greet()        # Works: prints "Hello"
print(message) # NameError: 'message' is not defined
```

The variable `message` is **local** to the `greet` function. Once the function ends, the variable is gone.

### Local vs Global

```python
greeting = "Hello"  # Global: exists everywhere

def say_hi():
    name = "Alice"  # Local: exists only in say_hi
    print(f"{greeting}, {name}!")

say_hi()      # "Hello, Alice!"
print(greeting)  # "Hello" - global accessible
print(name)      # NameError - local variable not accessible
```

---

## The LEGB Rule

When Python looks up a variable name, it searches in a specific order called **LEGB**:

1. **L**ocal: The current function
2. **E**nclosing: Any outer functions (for nested functions)
3. **G**lobal: The module level (top of the file)
4. **B**uilt-in: Python's built-in names (`len`, `print`, `sum`, etc.)

Python searches in this order and uses the first match it finds.

### LEGB Example

```python
x = "global"  # Global scope

def outer():
    x = "enclosing"  # Enclosing scope

    def inner():
        x = "local"  # Local scope
        print(x)     # Which x?

    inner()

outer()  # Prints "local"
```

Let's trace how Python finds `x` inside `inner()`:
1. **Local**: Is `x` defined in `inner()`? Yes → Use "local"

If we remove the local definition:

```python
def outer():
    x = "enclosing"

    def inner():
        print(x)  # No local x

    inner()

outer()  # Prints "enclosing"
```

Python searches:
1. **Local**: No `x` in `inner()`
2. **Enclosing**: Found `x` in `outer()` → Use "enclosing"

### Built-in Scope

Built-in names are always available:

```python
def my_function():
    numbers = [1, 2, 3, 4, 5]
    return sum(numbers)  # 'sum' found in Built-in scope

print(my_function())  # 'print' also from Built-in
```

---

## Variable Shadowing

A local variable can "shadow" (hide) a global variable with the same name:

```python
x = 10  # Global

def show_x():
    x = 20  # Local - shadows the global
    print(f"Inside function: {x}")

show_x()               # Inside function: 20
print(f"Outside: {x}") # Outside: 10 - global unchanged
```

The global `x` still exists and still equals 10. The function just has its own separate `x`.

### Shadowing Can Cause Bugs

```python
data = [1, 2, 3]  # Global list

def process():
    data = []  # Oops! Created a new local, didn't modify global
    data.append(4)
    print(f"Inside: {data}")

process()          # Inside: [4]
print(f"Outside: {data}")  # Outside: [1, 2, 3] - unchanged!
```

---

## Nested Functions and Closures

Functions can be defined inside other functions:

```python
def outer(x):
    def inner(y):
        return x + y  # inner can access x from outer
    return inner

add_five = outer(5)  # Returns inner function with x=5
print(add_five(3))   # 8 (5 + 3)
print(add_five(10))  # 15 (5 + 10)
```

### What Is a Closure?

When an inner function "remembers" variables from its enclosing function even after the outer function has finished, that's called a **closure**:

```python
def make_multiplier(factor):
    def multiply(x):
        return x * factor  # 'factor' is remembered
    return multiply

double = make_multiplier(2)
triple = make_multiplier(3)

print(double(5))  # 10
print(triple(5))  # 15
```

The function `multiply` "closes over" the variable `factor`. Each time we call `make_multiplier`, we create a new closure with a different `factor` value.

### Practical Closure Example

```python
def make_counter():
    count = 0

    def increment():
        nonlocal count  # See next section
        count += 1
        return count

    return increment

counter = make_counter()
print(counter())  # 1
print(counter())  # 2
print(counter())  # 3
```

The inner function maintains its own private `count` variable.

---

## `global` and `nonlocal` Keywords

Sometimes you need to modify a variable from an outer scope. Python provides two keywords for this.

### The `global` Keyword

To modify a global variable inside a function, use `global`:

```python
count = 0

def increment():
    global count
    count += 1

print(count)  # 0
increment()
print(count)  # 1
increment()
print(count)  # 2
```

Without `global`, Python would create a new local variable:

```python
count = 0

def increment():
    count = count + 1  # Error! 'count' referenced before assignment

increment()  # UnboundLocalError
```

Python sees `count = ...` and assumes `count` is local, but then you try to read it before assigning.

### The `nonlocal` Keyword

For nested functions, `nonlocal` lets you modify a variable in the enclosing (but not global) scope:

```python
def outer():
    x = 10

    def inner():
        nonlocal x
        x += 1
        print(f"Inner: {x}")

    inner()
    print(f"Outer: {x}")

outer()
# Inner: 11
# Outer: 11
```

---

## Why Avoid `global`?

Using `global` makes code harder to understand and test:

```python
# Bad: uses global state
total = 0

def add_to_total(value):
    global total
    total += value

add_to_total(5)
add_to_total(3)
print(total)  # 8 - but where did this come from?
```

The function's behavior depends on hidden state. Better approach:

```python
# Good: explicit inputs and outputs
def add_to_total(current_total, value):
    return current_total + value

total = 0
total = add_to_total(total, 5)
total = add_to_total(total, 3)
print(total)  # 8 - clear data flow
```

### When `global` Might Be OK

- Module-level configuration constants
- Caches (with careful design)
- Very simple scripts

Even then, consider alternatives like classes or function parameters.

---

## Common Scope Mistakes

### Mistake 1: Modifying Global Without `global`

```python
score = 0

def add_points(points):
    score += points  # UnboundLocalError!

add_points(10)
```

Fix: Use `global` or return the new value.

### Mistake 2: Assuming Assignment Creates a Local

```python
items = []

def add_item(item):
    items.append(item)  # This works! Modifying, not reassigning

def clear_items():
    items = []  # Creates a local! Doesn't clear global

add_item("apple")
print(items)   # ['apple']
clear_items()
print(items)   # ['apple'] - still there!
```

`.append()` modifies the existing list. `items = []` creates a new local variable.

### Mistake 3: Late Binding in Closures

```python
functions = []
for i in range(3):
    functions.append(lambda: i)

print(functions[0]())  # 2 - not 0!
print(functions[1]())  # 2 - not 1!
print(functions[2]())  # 2

# Fix: capture the value
functions = []
for i in range(3):
    functions.append(lambda i=i: i)  # Default argument captures value
```

---

## Key Takeaways

- **Scope** determines where variables can be accessed
- **LEGB**: Python searches Local → Enclosing → Global → Built-in
- Local variables shadow (hide) global variables with the same name
- **Closures**: Inner functions can "remember" variables from outer functions
- Use `global` to modify global variables (but avoid when possible)
- Use `nonlocal` to modify variables in enclosing (not global) scopes
- Prefer passing values in and returning values out over using `global`
- Watch out for the late binding closure gotcha in loops

