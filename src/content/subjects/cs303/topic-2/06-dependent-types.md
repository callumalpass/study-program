# Dependent Types

Dependent types represent one of the most powerful developments in type theory, allowing types to depend on values. This capability enables expressing precise specifications directly in the type system, catching errors that would be impossible to detect with conventional types. While complex, understanding dependent types illuminates the frontier of type system design.

## Types Depending on Values

In most type systems, there is a clear separation: values live at runtime, types live at compile time. Dependent types blur this boundary by allowing types to be parameterized by values:

```idris
-- Idris: Vector with length encoded in the type
data Vect : Nat -> Type -> Type where
    Nil  : Vect 0 a
    (::) : a -> Vect n a -> Vect (S n) a

-- The type tracks the exact length
v1 : Vect 3 Int
v1 = 1 :: 2 :: 3 :: Nil

-- This would be a type error:
-- v2 : Vect 4 Int
-- v2 = 1 :: 2 :: 3 :: Nil  -- Error: expected Vect 4, got Vect 3
```

## The Power of Dependent Types

### Length-Indexed Vectors

The classic example is vectors with statically known lengths:

```idris
-- Safe head - only works on non-empty vectors
head : Vect (S n) a -> a
head (x :: _) = x

-- Concatenation with precise type
append : Vect n a -> Vect m a -> Vect (n + m) a
append Nil ys = ys
append (x :: xs) ys = x :: append xs ys

-- Zip requires equal lengths - enforced by types
zip : Vect n a -> Vect n b -> Vect n (a, b)
zip Nil Nil = Nil
zip (x :: xs) (y :: ys) = (x, y) :: zip xs ys
```

### Matrix Dimensions

Matrix operations can be typed to ensure dimensional compatibility:

```idris
-- Matrix with dimensions in the type
data Matrix : Nat -> Nat -> Type -> Type

-- Multiplication requires compatible dimensions
mult : Matrix m n a -> Matrix n p a -> Matrix m p a
-- An m×n matrix times an n×p matrix yields an m×p matrix
```

### Bounds Checking at Compile Time

Array access can be proven safe:

```idris
-- Fin n represents natural numbers less than n
data Fin : Nat -> Type where
    FZ : Fin (S n)           -- Zero is less than any successor
    FS : Fin n -> Fin (S n)  -- If k < n then k+1 < n+1

-- Provably safe indexing
index : Fin n -> Vect n a -> a
index FZ (x :: _) = x
index (FS k) (_ :: xs) = index k xs
-- No bounds check needed at runtime - types ensure validity
```

## Propositions as Types

The Curry-Howard correspondence reveals a deep connection: types correspond to propositions, and programs correspond to proofs.

### Encoding Logical Propositions

```idris
-- Equality as a type
data (=) : a -> b -> Type where
    Refl : x = x  -- The only way to construct equality is reflexivity

-- Proving 2 + 2 = 4
twoPlusTwo : 2 + 2 = 4
twoPlusTwo = Refl  -- Typechecker computes 2+2, verifies it equals 4

-- A false proposition has no inhabitants
-- There's no way to construct a value of type 0 = 1
```

### Proofs About Programs

We can prove properties of our programs:

```idris
-- Prove that appending nil doesn't change the vector
appendNilRightNeutral : (xs : Vect n a) -> append xs Nil = xs
appendNilRightNeutral Nil = Refl
appendNilRightNeutral (x :: xs) =
    rewrite appendNilRightNeutral xs in Refl

-- Prove that reverse is an involution
reverseInvolutive : (xs : Vect n a) -> reverse (reverse xs) = xs
```

## Pi Types and Sigma Types

Dependent types are built from two fundamental type formers.

### Pi Types (Dependent Functions)

Pi types generalize function types where the return type depends on the input value:

```
Π(x : A). B(x)

-- Read as: for all x of type A, there exists a value of type B(x)
-- This is a function that takes x and returns something of type B(x)
```

```idris
-- replicate creates a vector of the given length
replicate : (n : Nat) -> a -> Vect n a
--          ^^^^^^^^^
--          The return type Vect n a depends on the input n
```

### Sigma Types (Dependent Pairs)

Sigma types are pairs where the type of the second component depends on the value of the first:

```
Σ(x : A). B(x)

-- A pair (a, b) where a : A and b : B(a)
```

```idris
-- A vector of unknown length
data DPair : (a : Type) -> (a -> Type) -> Type where
    MkDPair : (x : a) -> p x -> DPair a p

-- Filter returns a vector of unknown (but bounded) length
filter : (a -> Bool) -> Vect n a -> DPair Nat (\m => Vect m a)
```

## Refinement Types

A practical application of dependent types is refinement types, which constrain existing types with predicates:

```liquid-haskell
-- Liquid Haskell refinement types
{-@ type Nat = {v:Int | v >= 0} @-}
{-@ type Pos = {v:Int | v > 0} @-}

{-@ divide :: Int -> Pos -> Int @-}
divide :: Int -> Int -> Int
divide x y = x `div` y

-- This would be rejected:
-- divide 10 0  -- Error: 0 is not positive
```

## Linear and Affine Types

Dependent types can also track resource usage:

```rust
// Rust's ownership system is related to linear types
// Resources must be used exactly once

fn consume(s: String) {
    println!("{}", s);
    // s is consumed here
}

let s = String::from("hello");
consume(s);
// consume(s);  // Error: s was already moved
```

More advanced systems can track precise resource states:

```idris
-- A door that can be opened and closed
data DoorState = Opened | Closed

data Door : DoorState -> Type

-- Can only open a closed door
openDoor : Door Closed -> Door Opened

-- Can only close an open door
closeDoor : Door Opened -> Door Closed

-- The types ensure correct door protocol
```

## Proof Assistants

Languages with full dependent types are often used as proof assistants:

```coq
(* Coq proof that addition is commutative *)
Theorem plus_comm : forall n m : nat, n + m = m + n.
Proof.
  intros n m.
  induction n as [| n' IHn'].
  - (* Base case: 0 + m = m + 0 *)
    simpl. rewrite <- plus_n_O. reflexivity.
  - (* Inductive case *)
    simpl. rewrite IHn'. rewrite plus_n_Sm. reflexivity.
Qed.
```

## Practical Dependent Types

Several languages bring dependent types to practical programming.

### Idris

Idris is designed for practical dependently-typed programming:

```idris
-- A printf that checks format strings at compile time
printf : (fmt : String) -> interpFormat fmt
printf fmt = ...

-- Usage
printf "%s is %d years old" "Alice" 30  -- OK
-- printf "%s is %d years old" "Alice"  -- Type error: missing argument
```

### Agda

Agda is closer to a proof assistant but supports programming:

```agda
-- Proving that sorted insert maintains sortedness
insert : (x : Nat) → SortedList → SortedList
insert x [] = [ x ]
insert x (y ∷ ys) with x ≤? y
... | yes _ = x ∷ y ∷ ys
... | no  _ = y ∷ insert x ys
```

### Lightweight Dependent Types

Some languages add limited dependent type features:

```typescript
// TypeScript template literal types
type Greeting<Name extends string> = `Hello, ${Name}!`;
type G = Greeting<"World">;  // type G = "Hello, World!"

// Conditional types
type NonNullable<T> = T extends null | undefined ? never : T;
```

## Trade-offs and Challenges

### Type Checking Complexity

Type checking with dependent types may require evaluating arbitrary code:

```idris
-- Is this well-typed? Depends on the result of fib 1000
foo : Vect (fib 1000) Int
```

### Annotation Burden

More expressive types often require more annotations:

```idris
-- Simple function requires proof terms
append : (xs : Vect n a) -> (ys : Vect m a) -> Vect (n + m) a
append Nil ys = ys
append (x :: xs) ys = x :: append xs ys
-- Compiler must prove (n + m) = (S n' + m) for the recursive case
```

### Decidability

Full dependent type checking is undecidable in general. Practical systems impose restrictions or allow non-terminating type checking.

## Key Takeaways

- Dependent types allow types to depend on values
- Pi types are functions where the return type depends on the input
- Sigma types are pairs where the second type depends on the first value
- The Curry-Howard correspondence connects types to propositions
- Length-indexed vectors demonstrate statically enforced invariants
- Refinement types add predicates to existing types
- Proof assistants use dependent types for formal verification
- Trade-offs include complexity, annotation burden, and decidability
- Languages like Idris, Agda, and Coq fully support dependent types
- Some dependent type ideas appear in mainstream languages in limited forms

Dependent types represent the theoretical maximum of what type systems can express. While full dependent types remain primarily in research languages, their ideas increasingly influence mainstream type system design, from TypeScript's conditional types to Rust's const generics.
