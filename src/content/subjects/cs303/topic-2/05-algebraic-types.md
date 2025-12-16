# Algebraic Data Types

Algebraic Data Types (ADTs) are composite types formed by combining other types using two fundamental operations: products (combining types together) and sums (choosing between types). They provide a powerful, type-safe way to model data structures and are fundamental to functional programming languages.

## The Algebra of Types

Types can be viewed through an algebraic lens where type constructors correspond to arithmetic operations:

| Algebra | Types | Example |
|---------|-------|---------|
| 0 | Void/Never | Uninhabited type |
| 1 | Unit/() | Single value |
| a + b | Sum/Either | Choice between types |
| a × b | Product/Tuple | Combination of types |
| b^a | Function | a → b |

This correspondence is not merely an analogy—algebraic laws hold for types just as for numbers.

## Product Types

Product types combine multiple types into one, containing a value from each component type simultaneously. The number of inhabitants equals the product of inhabitants of the component types.

### Tuples

The simplest product type is a tuple:

```haskell
-- Haskell tuple types
type Point = (Float, Float)        -- 2 floats
type RGB = (Int, Int, Int)         -- 3 ints

-- Creating and using tuples
origin :: Point
origin = (0.0, 0.0)

distance :: Point -> Point -> Float
distance (x1, y1) (x2, y2) = sqrt ((x2-x1)^2 + (y2-y1)^2)
```

### Records

Records are named products, providing labeled access to fields:

```rust
// Rust struct (record type)
struct Person {
    name: String,
    age: u32,
    email: String,
}

let alice = Person {
    name: String::from("Alice"),
    age: 30,
    email: String::from("alice@example.com"),
};

// Accessing fields
println!("{} is {} years old", alice.name, alice.age);
```

### Product Type Cardinality

If type A has n values and type B has m values, then (A, B) has n × m values:

```haskell
-- Bool has 2 values: True, False
-- (Bool, Bool) has 2 × 2 = 4 values:
-- (False, False), (False, True), (True, False), (True, True)
```

## Sum Types

Sum types represent a choice between alternatives—a value is one of several possible variants. The number of inhabitants equals the sum of inhabitants of the variants.

### Enumerations

Simple sum types are enumerations:

```rust
// Rust enum
enum Direction {
    North,
    South,
    East,
    West,
}

// 4 possible values
let heading = Direction::North;
```

### Tagged Unions

Sum types become powerful when variants carry data:

```rust
// Each variant can carry different data
enum Shape {
    Circle { radius: f64 },
    Rectangle { width: f64, height: f64 },
    Triangle { base: f64, height: f64 },
}

fn area(shape: &Shape) -> f64 {
    match shape {
        Shape::Circle { radius } => std::f64::consts::PI * radius * radius,
        Shape::Rectangle { width, height } => width * height,
        Shape::Triangle { base, height } => 0.5 * base * height,
    }
}
```

### The Option/Maybe Type

Perhaps the most important sum type is Option (or Maybe), representing optional values:

```haskell
-- Haskell Maybe type
data Maybe a = Nothing | Just a

-- Safe division
safeDiv :: Int -> Int -> Maybe Int
safeDiv _ 0 = Nothing
safeDiv x y = Just (x `div` y)

-- Using Maybe
case safeDiv 10 2 of
    Nothing -> "Division by zero"
    Just result -> "Result: " ++ show result
```

### The Either Type

Either represents success or failure with different types:

```haskell
data Either a b = Left a | Right b

-- Parsing with error information
parseAge :: String -> Either String Int
parseAge s = case reads s of
    [(n, "")] | n >= 0 -> Right n
    _ -> Left ("Invalid age: " ++ s)
```

## Recursive Types

ADTs can reference themselves, enabling recursive data structures:

### Lists

```haskell
-- A list is either empty or an element followed by another list
data List a = Nil | Cons a (List a)

-- Example: [1, 2, 3]
example = Cons 1 (Cons 2 (Cons 3 Nil))

-- Length function
length :: List a -> Int
length Nil = 0
length (Cons _ rest) = 1 + length rest
```

### Trees

```rust
// Binary tree in Rust
enum Tree<T> {
    Empty,
    Node {
        value: T,
        left: Box<Tree<T>>,
        right: Box<Tree<T>>,
    },
}

impl<T: Ord> Tree<T> {
    fn insert(&mut self, new_value: T) {
        match self {
            Tree::Empty => {
                *self = Tree::Node {
                    value: new_value,
                    left: Box::new(Tree::Empty),
                    right: Box::new(Tree::Empty),
                }
            }
            Tree::Node { value, left, right } => {
                if new_value < *value {
                    left.insert(new_value);
                } else {
                    right.insert(new_value);
                }
            }
        }
    }
}
```

## Pattern Matching

Pattern matching is the natural way to work with ADTs, allowing exhaustive case analysis:

```haskell
-- Expression type
data Expr
    = Lit Int
    | Add Expr Expr
    | Mul Expr Expr
    | Neg Expr

-- Evaluation with pattern matching
eval :: Expr -> Int
eval (Lit n) = n
eval (Add e1 e2) = eval e1 + eval e2
eval (Mul e1 e2) = eval e1 * eval e2
eval (Neg e) = -(eval e)

-- The compiler warns if patterns are non-exhaustive
```

### Deep Pattern Matching

Patterns can be nested for complex data:

```haskell
-- Simplify nested negation
simplify :: Expr -> Expr
simplify (Neg (Neg e)) = simplify e
simplify (Add e1 e2) = Add (simplify e1) (simplify e2)
simplify (Mul e1 e2) = Mul (simplify e1) (simplify e2)
simplify (Neg e) = Neg (simplify e)
simplify e = e
```

## GADTs: Generalized Algebraic Data Types

GADTs extend ADTs by allowing constructors to specify more precise return types:

```haskell
{-# LANGUAGE GADTs #-}

-- A typed expression language
data Expr a where
    LitInt  :: Int -> Expr Int
    LitBool :: Bool -> Expr Bool
    Add     :: Expr Int -> Expr Int -> Expr Int
    IsZero  :: Expr Int -> Expr Bool
    If      :: Expr Bool -> Expr a -> Expr a -> Expr a

-- Type-safe evaluation - no runtime type errors possible
eval :: Expr a -> a
eval (LitInt n)    = n
eval (LitBool b)   = b
eval (Add e1 e2)   = eval e1 + eval e2
eval (IsZero e)    = eval e == 0
eval (If c t e)    = if eval c then eval t else eval e
```

## Phantom Types

Phantom types are type parameters that appear in the type but not in the runtime representation:

```haskell
-- USD and EUR don't appear in the Value constructor
newtype Money a = Value Double

data USD
data EUR

-- Type-safe currency operations
usd :: Double -> Money USD
usd = Value

eur :: Double -> Money EUR
eur = Value

-- Can only add same currencies
addMoney :: Money a -> Money a -> Money a
addMoney (Value x) (Value y) = Value (x + y)

-- These work:
addMoney (usd 10) (usd 20)  -- OK
addMoney (eur 10) (eur 20)  -- OK

-- This fails at compile time:
-- addMoney (usd 10) (eur 20)  -- Type error!
```

## Smart Constructors

ADTs can enforce invariants through smart constructors:

```haskell
module NonEmpty (NonEmpty, fromList, head, tail) where

-- Abstract type - constructor not exported
data NonEmpty a = NE a [a]

-- Smart constructor ensures non-emptiness
fromList :: [a] -> Maybe (NonEmpty a)
fromList []     = Nothing
fromList (x:xs) = Just (NE x xs)

-- Safe operations
head :: NonEmpty a -> a
head (NE x _) = x

tail :: NonEmpty a -> [a]
tail (NE _ xs) = xs
```

## Making Illegal States Unrepresentable

A key benefit of ADTs is modeling domains such that invalid states cannot be constructed:

```rust
// Instead of:
struct Connection {
    is_connected: bool,
    socket: Option<Socket>,  // Must remember to check is_connected
}

// Use:
enum Connection {
    Disconnected,
    Connected { socket: Socket },  // Socket guaranteed when connected
}

// The type system enforces valid states
fn send_data(conn: &Connection, data: &[u8]) -> Result<(), Error> {
    match conn {
        Connection::Disconnected => Err(Error::NotConnected),
        Connection::Connected { socket } => socket.send(data),
    }
}
```

## Key Takeaways

- Product types combine types (AND): tuples, records, structs
- Sum types choose between types (OR): enums, variants, tagged unions
- The algebra of types follows arithmetic laws
- Option/Maybe eliminates null pointer errors
- Either encodes success or failure with typed error information
- Recursive types model lists, trees, and other inductive structures
- Pattern matching enables exhaustive, type-safe case analysis
- GADTs provide more precise typing for complex domains
- Phantom types add compile-time safety without runtime cost
- ADTs help make illegal states unrepresentable

Algebraic data types are one of the most powerful features of modern type systems, enabling precise domain modeling where the compiler enforces invariants that would otherwise require careful programmer discipline.
