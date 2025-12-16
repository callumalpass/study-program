# Type Inference

Type inference is a feature of type systems that allows the compiler or interpreter to automatically deduce the types of expressions without explicit type annotations from the programmer. This powerful capability combines the safety benefits of static typing with the conciseness of dynamically typed languages.

## The Problem Type Inference Solves

In traditional statically typed languages like C or Java, programmers must explicitly declare the type of every variable:

```java
// Java - explicit type annotations everywhere
ArrayList<Map<String, Integer>> counts = new ArrayList<Map<String, Integer>>();
```

This verbosity can be tedious and sometimes obscures the actual logic. Type inference allows the compiler to figure out types automatically:

```scala
// Scala - type inference in action
val counts = List(Map("a" -> 1, "b" -> 2))  // Type inferred as List[Map[String, Int]]
```

## How Type Inference Works

Type inference algorithms analyze the program to collect constraints on what types must be and then solve those constraints to find concrete types.

### Constraint Generation

When analyzing an expression, the inference algorithm generates constraints based on how values are used:

```python
# Pseudocode showing constraint generation
def infer(expr):
    match expr:
        case Var(name):
            return lookup_type(name)
        case Lambda(param, body):
            param_type = fresh_type_variable()
            body_type = infer(body)  # Infer body with param in scope
            return FunctionType(param_type, body_type)
        case Apply(func, arg):
            func_type = infer(func)
            arg_type = infer(arg)
            result_type = fresh_type_variable()
            add_constraint(func_type, FunctionType(arg_type, result_type))
            return result_type
```

### Unification

The core algorithm for solving type constraints is unification, which finds a substitution that makes two types equal:

```python
def unify(type1, type2, substitution):
    # Apply existing substitutions
    type1 = apply_substitution(type1, substitution)
    type2 = apply_substitution(type2, substitution)

    if type1 == type2:
        return substitution
    elif is_type_variable(type1):
        return extend_substitution(type1, type2, substitution)
    elif is_type_variable(type2):
        return extend_substitution(type2, type1, substitution)
    elif is_function_type(type1) and is_function_type(type2):
        sub1 = unify(type1.param, type2.param, substitution)
        return unify(type1.result, type2.result, sub1)
    else:
        raise TypeError(f"Cannot unify {type1} and {type2}")
```

## The Hindley-Milner Type System

The Hindley-Milner (HM) type system, used in languages like ML, Haskell, and Rust, provides the theoretical foundation for practical type inference. It has several remarkable properties.

### Algorithm W

Algorithm W is the classic algorithm for HM type inference, developed by Robin Milner:

1. Fresh type variables are generated for unknown types
2. Constraints are collected by traversing the syntax tree
3. Unification solves the constraints to produce a substitution
4. The substitution is applied to get concrete types

```haskell
-- Haskell infers the type of this function
compose f g x = f (g x)
-- Inferred type: (b -> c) -> (a -> b) -> a -> c
```

### Let-Polymorphism

A key feature of HM is let-polymorphism, which allows locally defined values to have polymorphic types:

```haskell
let id = \x -> x
in (id 42, id "hello")  -- id is used at two different types
```

Without let-polymorphism, `id` would have to have a single monomorphic type, making this code illegal.

### Principal Types

The HM system guarantees that every well-typed expression has a unique most general type called the principal type. This means inference always finds the most flexible type possible:

```haskell
-- length has principal type [a] -> Int
-- It works on lists of any element type
length [1, 2, 3]        -- [Int] -> Int
length ["a", "b", "c"]  -- [String] -> Int
```

## Local vs Global Inference

Different languages take different approaches to how much inference they perform.

### Local Type Inference

Local inference only deduces types from immediately available information:

```java
// Java uses local inference with 'var'
var numbers = new ArrayList<Integer>();  // Type inferred from right side
var sum = numbers.stream().mapToInt(x -> x).sum();  // Lambda parameter type inferred
```

### Bidirectional Type Checking

Bidirectional type checking combines inference (synthesizing types from expressions) with checking (verifying expressions against expected types):

```typescript
// TypeScript uses bidirectional checking
const fn: (x: number) => string = x => x.toString();
// The type annotation for fn propagates inward to type x
```

### Global Type Inference

Global inference considers the entire program to determine types:

```ocaml
(* OCaml infers across function boundaries *)
let apply_twice f x = f (f x)
let increment n = n + 1
let result = apply_twice increment 0
(* All types inferred from how values are used *)
```

## Limitations of Type Inference

While powerful, type inference has important limitations.

### Undecidability

For sufficiently expressive type systems, type inference becomes undecidable. System F (the polymorphic lambda calculus) has undecidable type inference, which is why languages like Haskell restrict polymorphism in certain ways.

### Subtyping Complications

Adding subtyping to a type system significantly complicates inference because there may not be a unique best type:

```typescript
// What type should x have?
const x = condition ? new Dog() : new Cat();
// Could be Dog | Cat, Animal, or Object
```

### Higher-Rank Polymorphism

Inference becomes difficult or impossible with higher-rank polymorphism:

```haskell
-- This requires explicit annotation
runST :: (forall s. ST s a) -> a
-- The 'forall' inside the argument cannot be inferred
```

## Modern Inference Techniques

Contemporary languages employ sophisticated techniques beyond basic HM inference.

### Constraint-Based Inference

Modern systems separate constraint generation from solving, allowing more flexibility:

```rust
// Rust uses constraint-based inference
let mut vec = Vec::new();  // Type unknown
vec.push(1);               // Constrains element type to i32
// Type of vec resolved to Vec<i32>
```

### Flow-Sensitive Typing

Some languages track type changes through control flow:

```typescript
function process(x: string | number) {
    if (typeof x === "string") {
        // Type of x narrowed to string here
        console.log(x.toUpperCase());
    }
}
```

### Type Argument Inference

Inferring type arguments for generic functions is a common practical need:

```java
// Java infers type arguments in method calls
List<String> strings = Arrays.asList("a", "b", "c");
// asList<String> inferred from context
```

## Practical Implications

Type inference affects how we write and maintain code in significant ways.

### Code Readability

Inference can improve readability by reducing noise but can also harm it by hiding important type information:

```scala
// Clear - types visible
def process(items: List[Item]): Map[String, Int]

// Potentially confusing without IDE support
def process(items) = items.groupBy(_.category).mapValues(_.size)
```

### Error Messages

Inference-related errors can be confusing because the error may appear far from the actual mistake:

```haskell
-- The error about (+) might appear far from the real problem
let f = \x -> x + 1
let result = f "hello"  -- Error here, but message might be cryptic
```

### API Design

Library authors must consider how their APIs interact with inference:

```rust
// Using turbofish to help inference when necessary
let parsed = "42".parse::<i32>().unwrap();
```

## Key Takeaways

- Type inference automatically deduces types without explicit annotations
- The Hindley-Milner system provides decidable, complete inference for polymorphic types
- Unification is the core algorithm that solves type constraints
- Principal types guarantee the most general type is always found
- Advanced features like subtyping and higher-rank polymorphism complicate inference
- Modern languages blend local and global inference with flow-sensitive typing
- Good inference improves code conciseness while maintaining type safety

Understanding type inference helps you write cleaner code and debug type errors more effectively. The balance between explicit annotations and inference varies by language, and knowing when to add annotations is an important practical skill.
