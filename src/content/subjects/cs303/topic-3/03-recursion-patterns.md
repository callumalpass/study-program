# Recursion and Fold Patterns

Recursion is the primary control structure in functional programming, replacing the loops found in imperative languages. Understanding common recursion patterns and their generalizations through folds is essential for writing elegant, maintainable functional code.

## Recursion Basics

A recursive function calls itself to solve subproblems:

```haskell
-- The classic factorial example
factorial :: Integer -> Integer
factorial 0 = 1                    -- Base case
factorial n = n * factorial (n - 1) -- Recursive case

-- How it evaluates:
-- factorial 4
-- = 4 * factorial 3
-- = 4 * (3 * factorial 2)
-- = 4 * (3 * (2 * factorial 1))
-- = 4 * (3 * (2 * (1 * factorial 0)))
-- = 4 * (3 * (2 * (1 * 1)))
-- = 24
```

Every recursive function needs:
1. **Base case(s)**: Conditions that stop recursion
2. **Recursive case(s)**: The function calling itself with "smaller" arguments
3. **Progress**: Each recursive call must move toward a base case

## Structural Recursion

The most common pattern: the recursion structure follows the data structure.

### List Recursion

```haskell
-- Length follows list structure
length :: [a] -> Int
length []     = 0          -- Empty list base case
length (_:xs) = 1 + length xs  -- Cons cell recursive case

-- Sum follows list structure
sum :: Num a => [a] -> a
sum []     = 0
sum (x:xs) = x + sum xs

-- Map follows list structure
map :: (a -> b) -> [a] -> [b]
map _ []     = []
map f (x:xs) = f x : map f xs
```

### Tree Recursion

```haskell
data Tree a = Empty | Node (Tree a) a (Tree a)

-- Size follows tree structure
size :: Tree a -> Int
size Empty = 0
size (Node left _ right) = 1 + size left + size right

-- Sum follows tree structure
sumTree :: Num a => Tree a -> a
sumTree Empty = 0
sumTree (Node left x right) = sumTree left + x + sumTree right
```

## Tail Recursion

A function is tail recursive if the recursive call is the last operation:

```haskell
-- Not tail recursive: multiplication happens AFTER recursive call
factorial n = n * factorial (n - 1)

-- Tail recursive: recursive call is the final operation
factorial n = go n 1
  where
    go 0 acc = acc
    go n acc = go (n - 1) (n * acc)  -- Last operation is the call

-- Comparison of evaluation:
-- Non-tail: builds up: n * (n-1) * ... * 1
-- Tail: acc accumulates: 1 * 2 * ... * n
```

### Accumulator Pattern

Transforming recursion to tail recursion using an accumulator:

```haskell
-- Non-tail recursive reverse
reverse :: [a] -> [a]
reverse []     = []
reverse (x:xs) = reverse xs ++ [x]  -- ++ happens after recursion

-- Tail recursive with accumulator
reverse :: [a] -> [a]
reverse xs = go xs []
  where
    go []     acc = acc
    go (x:xs) acc = go xs (x:acc)  -- Recursive call is last
```

### Tail Call Optimization

Many functional languages optimize tail calls to use constant stack space:

```python
# Python doesn't optimize tail calls, but the pattern is still useful
def sum_tail(numbers):
    def go(nums, acc):
        if not nums:
            return acc
        return go(nums[1:], acc + nums[0])  # Last operation
    return go(numbers, 0)
```

## Folds: Generalizing Recursion

Folds capture the pattern of structural recursion over lists.

### Foldr (Right Fold)

```haskell
foldr :: (a -> b -> b) -> b -> [a] -> b
foldr _ z []     = z
foldr f z (x:xs) = f x (foldr f z xs)

-- Visualized: foldr f z [1,2,3] = f 1 (f 2 (f 3 z))
--             = 1 `f` (2 `f` (3 `f` z))
```

Many functions are foldr in disguise:

```haskell
sum     = foldr (+) 0
product = foldr (*) 1
length  = foldr (\_ n -> n + 1) 0
map f   = foldr (\x xs -> f x : xs) []
filter p = foldr (\x xs -> if p x then x:xs else xs) []
(++)     = \xs ys -> foldr (:) ys xs
```

### Foldl (Left Fold)

```haskell
foldl :: (b -> a -> b) -> b -> [a] -> b
foldl _ z []     = z
foldl f z (x:xs) = foldl f (f z x) xs

-- Visualized: foldl f z [1,2,3] = f (f (f z 1) 2) 3
--             = ((z `f` 1) `f` 2) `f` 3
```

### Choosing Between Folds

```haskell
-- Use foldr when:
-- - Building data structures (like lists)
-- - The combining function can short-circuit
-- - Working with potentially infinite lists

-- Use foldl' (strict foldl) when:
-- - Computing a single value (sum, product)
-- - Consuming the entire list
-- - Need constant space

import Data.List (foldl')
sum = foldl' (+) 0  -- More efficient than foldr for sums
```

## Tree Folds (Catamorphisms)

The fold pattern generalizes to any recursive data type:

```haskell
data Tree a = Empty | Node (Tree a) a (Tree a)

foldTree :: b -> (b -> a -> b -> b) -> Tree a -> b
foldTree empty node = go
  where
    go Empty = empty
    go (Node l x r) = node (go l) x (go r)

-- Now many tree functions are just foldTree
size    = foldTree 0 (\l _ r -> 1 + l + r)
sumTree = foldTree 0 (\l x r -> l + x + r)
height  = foldTree 0 (\l _ r -> 1 + max l r)
```

## Common Recursion Patterns

### Generate and Test

Generate possibilities, then filter:

```haskell
-- Find all pairs that sum to n
pairsSum :: Int -> [(Int, Int)]
pairsSum n = [(x, y) | x <- [0..n], y <- [0..n], x + y == n]
```

### Divide and Conquer

Split problem, solve parts, combine:

```haskell
-- Merge sort
mergeSort :: Ord a => [a] -> [a]
mergeSort []  = []
mergeSort [x] = [x]
mergeSort xs  = merge (mergeSort left) (mergeSort right)
  where
    (left, right) = splitAt (length xs `div` 2) xs

    merge [] ys = ys
    merge xs [] = xs
    merge (x:xs) (y:ys)
      | x <= y    = x : merge xs (y:ys)
      | otherwise = y : merge (x:xs) ys
```

### Mutual Recursion

Two functions that call each other:

```haskell
-- Checking even/odd via mutual recursion
isEven :: Int -> Bool
isEven 0 = True
isEven n = isOdd (n - 1)

isOdd :: Int -> Bool
isOdd 0 = False
isOdd n = isEven (n - 1)
```

### Generative Recursion

Recursion that generates new subproblems not directly from structure:

```haskell
-- Greatest common divisor (Euclidean algorithm)
gcd :: Int -> Int -> Int
gcd a 0 = a
gcd a b = gcd b (a `mod` b)

-- Quicksort generates subproblems based on pivot
quicksort :: Ord a => [a] -> [a]
quicksort [] = []
quicksort (p:xs) = quicksort smaller ++ [p] ++ quicksort larger
  where
    smaller = [x | x <- xs, x < p]
    larger  = [x | x <- xs, x >= p]
```

## Unfolds: The Dual of Folds

While folds consume structures, unfolds produce them:

```haskell
-- unfoldr produces a list from a seed
unfoldr :: (b -> Maybe (a, b)) -> b -> [a]
unfoldr f seed = case f seed of
    Nothing      -> []
    Just (x, s') -> x : unfoldr f s'

-- Generate a countdown
countdown = unfoldr (\n -> if n == 0 then Nothing else Just (n, n-1)) 10
-- Result: [10,9,8,7,6,5,4,3,2,1]

-- Iterate is a simpler unfold
iterate :: (a -> a) -> a -> [a]
iterate f x = x : iterate f (f x)

-- Powers of 2
powersOf2 = iterate (*2) 1  -- [1, 2, 4, 8, 16, ...]
```

## Corecursion and Infinite Structures

With lazy evaluation, we can define infinite structures:

```haskell
-- Infinite list of ones
ones = 1 : ones

-- Natural numbers
nats = 0 : map (+1) nats

-- Fibonacci sequence
fibs = 0 : 1 : zipWith (+) fibs (tail fibs)

-- Only compute what's needed
take 10 fibs  -- [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

## Key Takeaways

- Recursion replaces iteration in functional programming
- Every recursive function needs base cases and progress toward them
- Structural recursion follows the shape of the data
- Tail recursion enables constant stack space
- The accumulator pattern transforms non-tail to tail recursion
- Folds generalize structural recursion patterns
- Foldr works for building structures and lazy evaluation
- Foldl' works for strict accumulation
- Unfolds are the dual of folds, producing structures
- Lazy evaluation enables infinite recursive structures

Understanding these patterns allows you to recognize common structures in problems and apply well-known solutions. When you see recursion over a list, think fold. When you're generating a sequence, think unfold. This pattern recognition is a key skill in functional programming.
