# Lazy Evaluation

Lazy evaluation is an evaluation strategy that delays the computation of expressions until their values are actually needed. This powerful feature enables working with infinite data structures, improves performance by avoiding unnecessary computation, and allows elegant expression of algorithms that would be awkward or impossible with strict evaluation.

## Strict vs Lazy Evaluation

### Strict (Eager) Evaluation

Most languages evaluate arguments before calling functions:

```python
# Python is strict
def first(x, y):
    return x

# Both arguments are evaluated before the call
first(1, 1/0)  # Raises ZeroDivisionError!

# The expensive computation happens even though result is unused
first(1, expensive_computation())  # Wastes time
```

### Lazy (Non-Strict) Evaluation

With lazy evaluation, arguments are only evaluated when needed:

```haskell
-- Haskell is lazy
first :: a -> b -> a
first x y = x

first 1 (error "crash!")  -- Returns 1, no error!
first 1 (expensiveComputation)  -- expensiveComputation never runs
```

## How Lazy Evaluation Works

### Thunks

Lazy languages wrap unevaluated expressions in "thunks":

```
-- Expression: let x = 1 + 2 in x * x

-- With lazy evaluation:
x = <thunk: 1 + 2>     -- Not computed yet
x * x                   -- Now we need x
= <thunk: 1 + 2> * <thunk: 1 + 2>  -- Force first thunk
= 3 * <thunk: 1 + 2>   -- Share the result
= 3 * 3                 -- Thunk was already evaluated
= 9
```

### Sharing

Results are cached to avoid recomputation:

```haskell
-- Without sharing, this would compute fib twice
let x = fib 100 in x + x

-- With sharing:
-- x = <thunk: fib 100>
-- First use: evaluate thunk, get result, update x to 354224848179261915075
-- Second use: x is already evaluated, just return the value
```

## Infinite Data Structures

Lazy evaluation enables defining and working with infinite structures:

```haskell
-- Infinite list of natural numbers
nats :: [Integer]
nats = 0 : map (+1) nats
-- nats = 0 : 1 : 2 : 3 : ...

-- Infinite list of ones
ones :: [Integer]
ones = 1 : ones

-- Fibonacci sequence
fibs :: [Integer]
fibs = 0 : 1 : zipWith (+) fibs (tail fibs)
-- fibs = 0 : 1 : 1 : 2 : 3 : 5 : 8 : ...

-- Take only what we need
take 10 fibs  -- [0,1,1,2,3,5,8,13,21,34]
```

### Prime Sieve

The Sieve of Eratosthenes expressed elegantly:

```haskell
primes :: [Integer]
primes = sieve [2..]
  where
    sieve (p:xs) = p : sieve [x | x <- xs, x `mod` p /= 0]

-- Get the first 20 primes
take 20 primes  -- [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71]

-- Get primes until 100
takeWhile (< 100) primes
```

## Control Flow as Data

Lazy evaluation blurs the distinction between control flow and data:

```haskell
-- if-then-else as a function
if' :: Bool -> a -> a -> a
if' True  t _ = t
if' False _ f = f

-- Works because f is not evaluated when condition is True
if' True 1 (error "boom!")  -- Returns 1

-- Infinite search that terminates when answer found
find :: (a -> Bool) -> [a] -> Maybe a
find p [] = Nothing
find p (x:xs)
    | p x       = Just x
    | otherwise = find p xs

-- Searches infinite list, stops at first match
find (== 42) [1..]  -- Just 42
```

### Short-Circuit Evaluation

Boolean operations can short-circuit naturally:

```haskell
(&&) :: Bool -> Bool -> Bool
True  && x = x
False && _ = False

(||) :: Bool -> Bool -> Bool
True  || _ = True
False || x = x

-- Second argument not evaluated if not needed
False && (error "never happens")  -- Returns False
True || (error "never happens")   -- Returns True
```

## Lazy I/O

Haskell extends laziness to I/O operations:

```haskell
-- Read file contents lazily
processFile :: FilePath -> IO ()
processFile path = do
    contents <- readFile path  -- Returns immediately
    -- File is read on-demand as contents is consumed
    let lineCount = length (lines contents)
    print lineCount

-- Interact processes stdin lazily
main = interact (unlines . map processLine . lines)
-- Processes input line-by-line as it arrives
```

## Costs of Laziness

### Space Leaks

Unevaluated thunks can accumulate:

```haskell
-- Naive sum builds huge chain of thunks
badSum :: [Int] -> Int
badSum [] = 0
badSum (x:xs) = x + badSum xs

-- badSum [1,2,3]
-- = 1 + badSum [2,3]
-- = 1 + (2 + badSum [3])
-- = 1 + (2 + (3 + badSum []))
-- = 1 + (2 + (3 + 0))  -- Now we can finally compute!
```

### Strictness Annotations

Force evaluation when needed:

```haskell
-- seq forces first argument before returning second
seq :: a -> b -> b

-- Strict version using accumulator
goodSum :: [Int] -> Int
goodSum = go 0
  where
    go acc []     = acc
    go acc (x:xs) = let acc' = acc + x
                    in acc' `seq` go acc' xs

-- BangPatterns extension
{-# LANGUAGE BangPatterns #-}
goodSum :: [Int] -> Int
goodSum = go 0
  where
    go !acc []     = acc
    go !acc (x:xs) = go (acc + x) xs
```

### Strict Data

Strict fields in data types:

```haskell
-- Lazy fields (default)
data Point = Point Double Double

-- Strict fields
data StrictPoint = StrictPoint !Double !Double

-- Creating a StrictPoint forces both arguments immediately
```

## Call-by-Need vs Call-by-Name

**Call-by-name**: Re-evaluate argument each time it's used
**Call-by-need** (lazy): Evaluate once, share the result

```haskell
-- With call-by-name (hypothetical)
let x = expensive() in x + x  -- Evaluates expensive() twice

-- With call-by-need (Haskell)
let x = expensive() in x + x  -- Evaluates expensive() once, shares result
```

## Implementing Laziness

Languages can implement laziness in different ways.

### Thunk Representation

```c
// Conceptual representation of a thunk
struct Thunk {
    enum { UNEVALUATED, EVALUATED } state;
    union {
        struct { Function* code; Environment* env; } unevaluated;
        Value* result;
    };
};

Value* force(Thunk* t) {
    if (t->state == UNEVALUATED) {
        t->result = evaluate(t->code, t->env);
        t->state = EVALUATED;
    }
    return t->result;
}
```

### Lazy in Strict Languages

Some strict languages support explicit laziness:

```scala
// Scala lazy val
lazy val expensive = {
    println("Computing...")
    computeExpensiveValue()
}
// "Computing..." only printed on first access

// By-name parameters
def logIf(condition: Boolean, message: => String): Unit = {
    if (condition) println(message)  // message only evaluated if condition true
}
```

```python
# Python generators are lazy
def naturals():
    n = 0
    while True:
        yield n
        n += 1

# Compute on demand
gen = naturals()
next(gen)  # 0
next(gen)  # 1
```

## Benefits of Laziness

### Modularity

Separate generation from consumption:

```haskell
-- Generate all possibilities
allMoves :: GameState -> [Move]
allMoves = ...  -- Potentially huge or infinite

-- Consume only what's needed
bestMove :: GameState -> Move
bestMove state = head $ sortBy (comparing score) $ allMoves state
-- Only generates/evaluates moves until best is found
```

### Compositional Algorithms

```haskell
-- Minimum of a list using sort (sounds inefficient!)
minimum :: Ord a => [a] -> a
minimum = head . sort

-- With lazy evaluation, sort only does enough work
-- to find the smallest element: O(n) not O(n log n)!
```

## Key Takeaways

- Lazy evaluation delays computation until results are needed
- Thunks represent unevaluated expressions; sharing avoids recomputation
- Infinite data structures become practical and elegant
- Control flow can be expressed as regular function application
- Space leaks are a potential pitfall; strictness annotations help
- Call-by-need evaluates once and shares; call-by-name re-evaluates
- Laziness improves modularity by separating generation from consumption
- Strict languages can add explicit laziness through special constructs

Lazy evaluation is not free—there's overhead in creating and managing thunks. But when used appropriately, it enables elegant solutions that would be impossible or awkward with strict evaluation. Understanding when laziness helps and when strictness is needed is a key skill for functional programmers.
