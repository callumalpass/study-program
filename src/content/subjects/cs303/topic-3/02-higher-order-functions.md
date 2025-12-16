# Higher-Order Functions

Higher-order functions (HOFs) are functions that take other functions as arguments or return functions as results. They are the cornerstone of functional programming, enabling powerful abstractions that separate concerns and promote code reuse.

## What Are Higher-Order Functions?

A function is higher-order if it:
1. Takes one or more functions as parameters, or
2. Returns a function as its result, or
3. Both

```haskell
-- Takes a function as parameter
map :: (a -> b) -> [a] -> [b]

-- Returns a function
add :: Int -> (Int -> Int)
add x = \y -> x + y

-- Both: takes and returns functions
compose :: (b -> c) -> (a -> b) -> (a -> c)
compose f g = \x -> f (g x)
```

## The Classic Trio: Map, Filter, Reduce

Three fundamental HOFs form the basis of functional data processing.

### Map: Transform Each Element

Map applies a function to every element of a collection:

```python
# Python map
numbers = [1, 2, 3, 4, 5]
squares = list(map(lambda x: x ** 2, numbers))
# Result: [1, 4, 9, 16, 25]

# Using list comprehension (Pythonic)
squares = [x ** 2 for x in numbers]
```

```haskell
-- Haskell map
map :: (a -> b) -> [a] -> [b]
map _ []     = []
map f (x:xs) = f x : map f xs

-- Usage
squares = map (^2) [1, 2, 3, 4, 5]
-- Result: [1, 4, 9, 16, 25]
```

### Filter: Select Elements

Filter keeps elements that satisfy a predicate:

```javascript
// JavaScript filter
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(x => x % 2 === 0);
// Result: [2, 4, 6]
```

```haskell
-- Haskell filter
filter :: (a -> Bool) -> [a] -> [a]
filter _ []     = []
filter p (x:xs)
    | p x       = x : filter p xs
    | otherwise = filter p xs

evens = filter even [1..10]
-- Result: [2, 4, 6, 8, 10]
```

### Reduce (Fold): Combine Elements

Reduce combines all elements into a single value:

```python
from functools import reduce

# Sum using reduce
numbers = [1, 2, 3, 4, 5]
total = reduce(lambda acc, x: acc + x, numbers, 0)
# Result: 15

# Finding maximum
maximum = reduce(lambda acc, x: x if x > acc else acc, numbers, float('-inf'))
```

```haskell
-- Haskell fold
foldl :: (b -> a -> b) -> b -> [a] -> b
foldl _ acc []     = acc
foldl f acc (x:xs) = foldl f (f acc x) xs

-- Sum
sum = foldl (+) 0 [1, 2, 3, 4, 5]
-- Result: 15
```

## Left vs Right Folds

The direction of folding affects both semantics and performance:

```haskell
-- Left fold: ((((0 + 1) + 2) + 3) + 4) + 5
foldl (+) 0 [1,2,3,4,5] = 15

-- Right fold: 1 + (2 + (3 + (4 + (5 + 0))))
foldr (+) 0 [1,2,3,4,5] = 15

-- For non-associative operations, order matters
foldl (-) 0 [1,2,3]  -- ((0 - 1) - 2) - 3 = -6
foldr (-) 0 [1,2,3]  -- 1 - (2 - (3 - 0)) = 2
```

Right folds can work with infinite lists if the combining function is lazy:

```haskell
-- This works! Stops when it finds the first match
any p = foldr (\x acc -> p x || acc) False

any even [1,3,5,7,8,9,...]  -- Returns True at 8
```

## Function Composition

Composition creates pipelines of transformations:

```haskell
-- Composition operator
(.) :: (b -> c) -> (a -> b) -> (a -> c)
(f . g) x = f (g x)

-- Building pipelines
processText :: String -> String
processText = unwords . map toUpper . words

-- Example: "hello world" -> ["hello", "world"] -> ["HELLO", "WORLD"] -> "HELLO WORLD"
```

```javascript
// JavaScript composition utility
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

const processText = compose(
  text => text.join(' '),
  words => words.map(w => w.toUpperCase()),
  text => text.split(' ')
);
```

## Partial Application and Currying

### Currying

Currying transforms a function of multiple arguments into a sequence of single-argument functions:

```haskell
-- All Haskell functions are automatically curried
add :: Int -> Int -> Int
add x y = x + y

-- Same as:
add :: Int -> (Int -> Int)
add = \x -> \y -> x + y

-- Partial application
addFive :: Int -> Int
addFive = add 5

addFive 3  -- Result: 8
```

### Partial Application

Partial application fixes some arguments of a function:

```python
from functools import partial

def greet(greeting, name):
    return f"{greeting}, {name}!"

say_hello = partial(greet, "Hello")
say_hello("Alice")  # "Hello, Alice!"
```

```javascript
// JavaScript partial application
const partial = (fn, ...args) => (...moreArgs) => fn(...args, ...moreArgs);

const greet = (greeting, name) => `${greeting}, ${name}!`;
const sayHello = partial(greet, "Hello");
sayHello("Alice");  // "Hello, Alice!"
```

## Common Higher-Order Functions

### zipWith

Combines two lists using a function:

```haskell
zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
zipWith _ [] _ = []
zipWith _ _ [] = []
zipWith f (x:xs) (y:ys) = f x y : zipWith f xs ys

-- Example
zipWith (+) [1,2,3] [10,20,30]  -- [11, 22, 33]
zipWith (,) [1,2,3] "abc"       -- [(1,'a'), (2,'b'), (3,'c')]
```

### takeWhile and dropWhile

Process elements while a condition holds:

```haskell
takeWhile (< 5) [1,2,3,4,5,6,7]  -- [1, 2, 3, 4]
dropWhile (< 5) [1,2,3,4,5,6,7]  -- [5, 6, 7]
```

### any and all

Test if any/all elements satisfy a predicate:

```python
numbers = [2, 4, 6, 8]
all_even = all(x % 2 == 0 for x in numbers)  # True
any_odd = any(x % 2 != 0 for x in numbers)   # False
```

### find and findIndex

Search for elements:

```javascript
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Carol", age: 35 }
];

const bob = users.find(u => u.name === "Bob");
const bobIndex = users.findIndex(u => u.name === "Bob");
```

## Building Abstractions with HOFs

### Iteration Abstractions

```python
# Instead of manual loops
result = []
for item in items:
    if condition(item):
        result.append(transform(item))

# Use HOFs
result = [transform(item) for item in items if condition(item)]
# Or:
result = list(map(transform, filter(condition, items)))
```

### Error Handling

```javascript
// Maybe/Optional patterns
const safeDivide = (a, b) => b === 0 ? null : a / b;

const map = (fn) => (maybe) => maybe === null ? null : fn(maybe);
const flatMap = (fn) => (maybe) => maybe === null ? null : fn(maybe);

// Chain operations safely
const result = [10]
  .map(x => safeDivide(x, 2))
  .flatMap(x => x === null ? [] : [x])
  .map(x => x * 2);
```

### Resource Management

```python
# Using HOFs for resource management
def with_file(filename, mode, action):
    f = open(filename, mode)
    try:
        return action(f)
    finally:
        f.close()

# Usage
content = with_file("data.txt", "r", lambda f: f.read())
```

## Performance Considerations

### Fusion

Compilers can optimize chains of HOFs:

```haskell
-- Naive: creates intermediate lists
sum (map (*2) (filter even [1..1000000]))

-- With fusion: single pass, no intermediate structures
-- The compiler transforms this automatically
```

### Laziness

Lazy evaluation enables efficient HOF chains:

```haskell
-- Only computes what's needed
take 5 $ filter even $ map (*2) [1..]
-- Result: [4, 8, 12, 16, 20]
-- Doesn't try to process the infinite list
```

## Key Takeaways

- Higher-order functions take or return other functions
- Map, filter, and reduce are fundamental building blocks
- Left and right folds have different semantics and performance characteristics
- Composition builds complex transformations from simple functions
- Currying enables elegant partial application
- HOFs abstract common patterns like iteration and error handling
- Compiler optimizations like fusion make HOF chains efficient
- Laziness allows working with potentially infinite data

Higher-order functions shift thinking from "how to loop" to "what transformation to apply." This declarative style makes code more readable, composable, and often more correct. Master these patterns, and you'll write better code in any language.
