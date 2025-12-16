# Functional Programming Fundamentals

Functional programming is a programming paradigm that treats computation as the evaluation of mathematical functions and avoids changing state and mutable data. This approach leads to code that is often more predictable, testable, and easier to reason about than imperative alternatives.

## What Makes Programming Functional?

Functional programming is characterized by several core principles that distinguish it from imperative programming:

### Functions as First-Class Citizens

In functional programming, functions can be passed as arguments, returned from other functions, and assigned to variables:

```haskell
-- Functions can be passed around like any other value
applyTwice :: (a -> a) -> a -> a
applyTwice f x = f (f x)

increment :: Int -> Int
increment n = n + 1

result = applyTwice increment 5  -- Result: 7
```

### Pure Functions

A pure function always produces the same output for the same input and has no side effects:

```python
# Pure function - same input always gives same output
def add(a, b):
    return a + b

# Impure function - depends on external state
counter = 0
def impure_count():
    global counter
    counter += 1
    return counter
```

### Immutability

Data structures are not modified; instead, new structures are created:

```javascript
// Imperative mutation
const arr = [1, 2, 3];
arr.push(4);  // Modifies arr in place

// Functional approach
const arr = [1, 2, 3];
const newArr = [...arr, 4];  // Creates new array
```

## Referential Transparency

A key property of functional programs is referential transparency: an expression can be replaced with its value without changing program behavior.

```haskell
-- Referentially transparent
let x = 2 + 3 in x * x
-- Can be rewritten as:
let x = 5 in x * x
-- Or directly as:
5 * 5

-- Not referentially transparent (if impure)
let x = readLine() in x ++ x
-- Cannot replace readLine() with its "value" - each call may differ
```

This property enables equational reasoning—proving program properties by substituting equals for equals.

## Expression-Oriented Programming

Functional languages favor expressions over statements. Everything returns a value:

```scala
// Scala - if is an expression
val result = if (x > 0) "positive" else "non-positive"

// Pattern matching is an expression
val description = shape match {
  case Circle(r) => s"Circle with radius $r"
  case Rectangle(w, h) => s"Rectangle $w x $h"
}
```

Compare to statement-oriented imperative code:

```java
// Java - if is a statement
String result;
if (x > 0) {
    result = "positive";
} else {
    result = "non-positive";
}
```

## Function Composition

Building complex functions from simpler ones is fundamental to FP:

```haskell
-- Basic composition
(.) :: (b -> c) -> (a -> b) -> (a -> c)
(f . g) x = f (g x)

-- Example: processing pipeline
processText :: String -> String
processText = toUpper . trim . removeSpaces

-- Equivalent to:
processText s = toUpper (trim (removeSpaces s))
```

### Point-Free Style

Functions can be defined without mentioning their arguments:

```haskell
-- Pointed style (explicit argument)
sumSquares xs = sum (map (^2) xs)

-- Point-free style (no explicit argument)
sumSquares = sum . map (^2)
```

## Declarative vs Imperative

Functional code describes what to compute, not how:

```python
# Imperative: how to sum squares
def sum_squares_imperative(numbers):
    total = 0
    for n in numbers:
        total += n * n
    return total

# Functional: what we want
def sum_squares_functional(numbers):
    return sum(x * x for x in numbers)

# Even more declaratively with map/reduce
from functools import reduce
sum_squares = lambda numbers: reduce(lambda acc, x: acc + x*x, numbers, 0)
```

## Recursion Over Iteration

Functional programming favors recursion over loops:

```haskell
-- Computing factorial
factorial :: Integer -> Integer
factorial 0 = 1
factorial n = n * factorial (n - 1)

-- List operations via recursion
length :: [a] -> Int
length [] = 0
length (_:xs) = 1 + length xs

sum :: Num a => [a] -> a
sum [] = 0
sum (x:xs) = x + sum xs
```

### Tail Recursion

For efficiency, tail-recursive functions can be optimized to loops:

```haskell
-- Not tail recursive (builds up stack)
factorial n = n * factorial (n - 1)

-- Tail recursive (constant stack space)
factorial n = go n 1
  where
    go 0 acc = acc
    go n acc = go (n - 1) (n * acc)
```

## Data Transformation Pipelines

FP excels at data transformation through pipelines:

```elixir
# Elixir pipe operator
result = data
|> filter(&active?/1)
|> map(&transform/1)
|> sort_by(&(&1.date))
|> take(10)

# Equivalent to:
# take(10, sort_by(map(filter(data, &active?/1), &transform/1), &(&1.date)))
```

```javascript
// JavaScript method chaining
const result = users
  .filter(u => u.active)
  .map(u => u.name)
  .sort()
  .slice(0, 10);
```

## Benefits of Functional Programming

### Testability

Pure functions are trivially testable—no mocking required:

```python
# Easy to test - no setup, no side effects
def test_add():
    assert add(2, 3) == 5
    assert add(-1, 1) == 0
    assert add(0, 0) == 0
```

### Parallelization

Pure functions can be safely executed in parallel:

```haskell
-- These can run in parallel since they're independent
parMap :: (a -> b) -> [a] -> [b]
parMap f xs = runPar $ parMap f xs

results = parMap expensiveComputation largeDataSet
```

### Reasoning and Debugging

With no hidden state changes, behavior is predictable:

```haskell
-- We can reason about this function in isolation
-- Its behavior depends ONLY on its inputs
processOrder :: Order -> Customer -> ProcessedOrder
processOrder order customer = ...
```

### Composition

Small, focused functions compose into larger solutions:

```haskell
-- Build complex behavior from simple parts
validateAndProcess :: Input -> Either Error Output
validateAndProcess = process . validate . parse
```

## Challenges of Functional Programming

### Performance Concerns

Immutability can seem wasteful, but functional data structures are designed for efficient updates:

```haskell
-- Persistent data structures share structure
let list1 = [1, 2, 3]
let list2 = 0 : list1  -- list2 shares list1's memory
```

### Learning Curve

Different thinking is required:

```haskell
-- Imperative thinking: "loop through and modify"
-- Functional thinking: "transform and produce new"

-- Instead of modifying elements, map to new values
modifiedList = map transform originalList
```

### I/O and Side Effects

Real programs need side effects; FP languages handle this explicitly:

```haskell
-- Haskell separates pure and impure code via the IO monad
main :: IO ()
main = do
    name <- getLine          -- Impure: reads input
    let greeting = greet name -- Pure computation
    putStrLn greeting        -- Impure: writes output

greet :: String -> String    -- Pure function
greet name = "Hello, " ++ name ++ "!"
```

## Key Takeaways

- Functional programming treats computation as function evaluation
- Pure functions have no side effects and always return the same output for the same input
- Immutability means creating new data rather than modifying existing data
- Referential transparency enables equational reasoning
- Functions are first-class values that can be passed and returned
- Composition builds complex functions from simpler ones
- Recursion replaces iteration for repetitive computation
- FP enables testability, parallelization, and easier reasoning
- Modern languages increasingly incorporate functional features

Functional programming isn't all-or-nothing. Even in primarily imperative languages, applying functional principles like pure functions, immutability, and composition leads to more maintainable code.
