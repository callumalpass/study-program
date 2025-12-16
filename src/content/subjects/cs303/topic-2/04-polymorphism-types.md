# Polymorphism in Type Systems

Polymorphism enables code to work with values of multiple types, providing both flexibility and reusability while maintaining type safety. Understanding the different forms of polymorphism and their implications for type systems is essential for language design and effective programming.

## What is Type Polymorphism?

The word polymorphism comes from Greek, meaning "many forms." In programming, it refers to the ability of code to operate on values of different types. Without polymorphism, we would need to write separate functions for every type combination:

```c
// Without polymorphism - repetitive code
int max_int(int a, int b) { return a > b ? a : b; }
float max_float(float a, float b) { return a > b ? a : b; }
double max_double(double a, double b) { return a > b ? a : b; }
```

Polymorphism allows a single definition to work across types:

```haskell
-- With polymorphism - one function works for all orderable types
max :: Ord a => a -> a -> a
max a b = if a > b then a else b
```

## Parametric Polymorphism

Parametric polymorphism allows functions and data structures to be written generically, with types specified as parameters. The code works uniformly for all type arguments.

### Universal Quantification

Parametrically polymorphic types are universally quantified over type variables:

```haskell
-- The identity function works for ANY type
id :: forall a. a -> a
id x = x

-- Usage at different types
id 42        -- id @Int : Int -> Int
id "hello"   -- id @String : String -> String
id [1,2,3]   -- id @[Int] : [Int] -> [Int]
```

### Parametricity and Free Theorems

Parametric polymorphism provides strong guarantees through parametricity. A function with type `forall a. [a] -> [a]` cannot inspect the elements—it can only rearrange them:

```haskell
-- What can a function of type [a] -> [a] do?
-- It can only: return [], return the input, reverse it,
-- duplicate elements, drop elements, etc.
-- It CANNOT: sort (would need Ord), filter by value, modify elements
```

This leads to "free theorems"—properties that hold for all implementations of a type.

### Polymorphic Data Structures

Generic containers are a common use of parametric polymorphism:

```rust
// Rust generic types
struct Stack<T> {
    elements: Vec<T>,
}

impl<T> Stack<T> {
    fn push(&mut self, item: T) { self.elements.push(item); }
    fn pop(&mut self) -> Option<T> { self.elements.pop() }
}
```

## Ad-Hoc Polymorphism

Ad-hoc polymorphism allows different implementations for different types, unlike parametric polymorphism which has uniform behavior.

### Function Overloading

The simplest form is function overloading, where multiple functions share a name but differ by parameter types:

```java
// Java method overloading
class Printer {
    void print(int x) { System.out.println("Int: " + x); }
    void print(String s) { System.out.println("String: " + s); }
    void print(double d) { System.out.println("Double: " + d); }
}
```

### Type Classes

Type classes (Haskell) or traits (Rust) provide principled ad-hoc polymorphism:

```haskell
-- Type class definition
class Eq a where
    (==) :: a -> a -> Bool
    (/=) :: a -> a -> Bool
    x /= y = not (x == y)  -- Default implementation

-- Instance for a specific type
instance Eq Bool where
    True == True = True
    False == False = True
    _ == _ = False

-- Using the type class
same :: Eq a => a -> a -> Bool
same x y = x == y
```

### Bounded Polymorphism

Type classes allow bounded polymorphism—polymorphism constrained to types satisfying certain requirements:

```rust
// Rust trait bounds
fn largest<T: Ord>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}
```

## Subtype Polymorphism

Subtype polymorphism allows using a value of a subtype wherever a supertype is expected. This is the classic OOP polymorphism.

### Liskov Substitution

The Liskov Substitution Principle states that if S is a subtype of T, then objects of type T can be replaced with objects of type S without altering program correctness:

```java
// Java subtype polymorphism
class Animal { void speak() { } }
class Dog extends Animal { void speak() { System.out.println("Woof!"); } }
class Cat extends Animal { void speak() { System.out.println("Meow!"); } }

void makeSpeak(Animal a) {
    a.speak();  // Works with any Animal subtype
}
```

### Variance

Variance describes how subtyping of compound types relates to subtyping of their components:

```java
// Covariance: if Dog <: Animal, then List<Dog> <: List<? extends Animal>
// Contravariance: if Dog <: Animal, then Consumer<Animal> <: Consumer<? super Dog>
// Invariance: List<Dog> is not related to List<Animal>

List<Dog> dogs = new ArrayList<>();
List<? extends Animal> animals = dogs;  // Covariant - read only
animals.get(0);  // OK - returns Animal
// animals.add(new Cat());  // Error - cannot add
```

### Structural vs Nominal Subtyping

Languages differ in how they determine subtype relationships:

```typescript
// TypeScript - structural subtyping
interface HasName { name: string; }
interface Person { name: string; age: number; }
// Person is a subtype of HasName because it has all required fields

let x: HasName = { name: "Alice", age: 30 };  // OK
```

```java
// Java - nominal subtyping
interface HasName { String getName(); }
class Person { String getName() { return "Alice"; } }
// Person is NOT a subtype of HasName unless it explicitly implements it
```

## Row Polymorphism

Row polymorphism allows polymorphism over record types with different fields:

```purescript
-- PureScript row polymorphism
getName :: forall r. { name :: String | r } -> String
getName record = record.name

-- Works with any record that has a name field
getName { name: "Alice" }
getName { name: "Bob", age: 30 }
getName { name: "Carol", email: "carol@example.com" }
```

## Higher-Kinded Polymorphism

Higher-kinded polymorphism abstracts over type constructors, not just types:

```haskell
-- Functor abstracts over type constructors of kind * -> *
class Functor f where
    fmap :: (a -> b) -> f a -> f b

instance Functor [] where
    fmap = map

instance Functor Maybe where
    fmap f Nothing = Nothing
    fmap f (Just x) = Just (f x)

-- Works with any Functor
double :: Functor f => f Int -> f Int
double = fmap (* 2)
```

## Rank-N Polymorphism

Higher-rank polymorphism allows polymorphic functions as arguments:

```haskell
-- Rank-1: polymorphism at the outermost level
rank1 :: forall a. a -> a

-- Rank-2: polymorphic function as argument
rank2 :: (forall a. a -> a) -> (Int, Bool)
rank2 f = (f 42, f True)

-- Requires explicit type annotation
rank2 id  -- Returns (42, True)
```

## Intersection and Union Types

Some type systems support combining types through intersection and union:

```typescript
// TypeScript intersection types
type Employee = Person & HasId;
// Employee must satisfy both Person and HasId

// TypeScript union types
type StringOrNumber = string | number;
function process(x: StringOrNumber) {
    if (typeof x === "string") {
        return x.toUpperCase();
    }
    return x * 2;
}
```

## Polymorphism and Performance

Different forms of polymorphism have different runtime characteristics:

### Monomorphization

Languages like Rust generate specialized code for each type:

```rust
// Each use generates separate machine code
fn add<T: Add<Output=T>>(a: T, b: T) -> T { a + b }

add(1i32, 2i32);  // Generates add_i32
add(1.0f64, 2.0); // Generates add_f64
```

### Boxing and Dynamic Dispatch

Other languages use boxing and vtables:

```java
// Java uses vtable dispatch for polymorphic calls
interface Shape { double area(); }
Shape[] shapes = new Shape[] { new Circle(1), new Rectangle(2, 3) };
for (Shape s : shapes) {
    s.area();  // Virtual method call
}
```

## Key Takeaways

- Parametric polymorphism provides uniform behavior across all types
- Ad-hoc polymorphism (type classes, overloading) allows type-specific implementations
- Subtype polymorphism enables treating subtypes as their supertypes
- Variance determines how generic type subtyping works (covariance, contravariance)
- Row polymorphism extends polymorphism to record types
- Higher-kinded polymorphism abstracts over type constructors
- Rank-N polymorphism allows polymorphic functions as arguments
- Performance varies: monomorphization is fast, boxing adds overhead

Mastering these forms of polymorphism is crucial for designing flexible, type-safe APIs and understanding the tradeoffs different languages make in their type systems.
