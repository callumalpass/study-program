# Pattern Matching

Pattern matching is a powerful control flow construct that combines conditional logic, destructuring, and type checking into a single expressive mechanism. While similar to switch statements, pattern matching is far more sophisticated, enabling elegant solutions to problems that would require verbose code in languages without it.

## Basic Pattern Matching

Pattern matching checks a value against a series of patterns, executing code associated with the first matching pattern:

**OCaml Example**:
```ocaml
match value with
| 0 -> "zero"
| 1 -> "one"
| 2 -> "two"
| _ -> "many"
```

The underscore `_` is a wildcard pattern matching anything.

**Rust Example**:
```rust
fn describe_number(n: i32) -> &'static str {
    match n {
        0 => "zero",
        1 => "one",
        2 => "two",
        _ => "many",
    }
}
```

Unlike switch statements, pattern matching is an expression that returns a value.

## Destructuring Patterns

Patterns can destructure complex data:

**Tuples**:
```rust
fn describe_point(point: (i32, i32)) -> String {
    match point {
        (0, 0) => "origin".to_string(),
        (x, 0) => format!("on x-axis at {}", x),
        (0, y) => format!("on y-axis at {}", y),
        (x, y) => format!("at ({}, {})", x, y),
    }
}
```

**Structs**:
```rust
struct Point {
    x: i32,
    y: i32,
}

fn process_point(p: Point) {
    match p {
        Point { x: 0, y: 0 } => println!("origin"),
        Point { x, y: 0 } => println!("x-axis: {}", x),
        Point { x: 0, y } => println!("y-axis: {}", y),
        Point { x, y } => println!("({}, {})", x, y),
    }
}
```

**Enums/Algebraic Data Types**:
```rust
enum Shape {
    Circle { radius: f64 },
    Rectangle { width: f64, height: f64 },
    Triangle { base: f64, height: f64 },
}

fn area(shape: Shape) -> f64 {
    match shape {
        Shape::Circle { radius } => 3.14159 * radius * radius,
        Shape::Rectangle { width, height } => width * height,
        Shape::Triangle { base, height } => 0.5 * base * height,
    }
}
```

## Nested Patterns

Patterns can be arbitrarily nested:

```rust
enum Option<T> {
    Some(T),
    None,
}

enum Result<T, E> {
    Ok(T),
    Err(E),
}

fn process(result: Result<Option<i32>, String>) -> i32 {
    match result {
        Ok(Some(n)) => n,
        Ok(None) => 0,
        Err(_) => -1,
    }
}
```

**Nested Data Structures**:
```ocaml
type tree = Leaf of int | Node of tree * tree

let rec sum tree =
  match tree with
  | Leaf n -> n
  | Node(left, right) -> sum left + sum right
```

## Guards and Conditionals

Guards add conditional logic to patterns:

```rust
fn classify_number(n: i32) -> &'static str {
    match n {
        x if x < 0 => "negative",
        0 => "zero",
        x if x < 10 => "single digit",
        x if x < 100 => "double digit",
        _ => "large",
    }
}
```

**Multiple Conditions**:
```rust
fn describe_point(x: i32, y: i32) -> &'static str {
    match (x, y) {
        (x, y) if x == y => "diagonal",
        (x, y) if x == -y => "anti-diagonal",
        (x, _) if x > 0 => "right side",
        (x, _) if x < 0 => "left side",
        _ => "center",
    }
}
```

## Ranges and OR Patterns

**Range Patterns**:
```rust
fn classify_age(age: u32) -> &'static str {
    match age {
        0..=12 => "child",
        13..=19 => "teenager",
        20..=59 => "adult",
        60.. => "senior",
    }
}
```

**OR Patterns**:
```rust
fn is_vowel(c: char) -> bool {
    match c {
        'a' | 'e' | 'i' | 'o' | 'u' => true,
        _ => false,
    }
}
```

```scala
def classify(x: Any): String = x match {
  case 0 | 1 => "small"
  case _: String => "text"
  case _: Int => "number"
  case _ => "other"
}
```

## Exhaustiveness Checking

Pattern matching enforces handling all cases:

```rust
enum TrafficLight {
    Red,
    Yellow,
    Green,
}

fn action(light: TrafficLight) -> &'static str {
    match light {
        TrafficLight::Red => "stop",
        TrafficLight::Yellow => "slow down",
        // Missing Green case!
    }
}
// Compiler error: non-exhaustive patterns
```

The compiler ensures all possibilities are covered, preventing bugs from unhandled cases.

**Adding New Variants**:
```rust
enum TrafficLight {
    Red,
    Yellow,
    Green,
    Flashing,  // New variant
}

// All existing match statements now fail to compile
// Must update to handle Flashing case
```

This makes refactoring safer - the compiler finds all code that needs updating.

## As-Patterns (Binding)

Bind matched values to names:

```rust
fn process_option(opt: Option<Box<i32>>) {
    match opt {
        Some(boxed @ Box(value)) if value > 0 => {
            println!("Positive value in box: {:?}", boxed);
        }
        Some(boxed) => {
            println!("Non-positive value in box: {:?}", boxed);
        }
        None => println!("No value"),
    }
}
```

```ocaml
match list with
| (first :: rest) as full_list ->
    (* Have access to both first, rest, and full_list *)
    process first rest full_list
| [] -> empty_case ()
```

## Recursive Pattern Matching

Pattern matching naturally handles recursive data structures:

```ocaml
type 'a list =
  | Nil
  | Cons of 'a * 'a list

let rec length lst =
  match lst with
  | Nil -> 0
  | Cons(_, tail) -> 1 + length tail

let rec map f lst =
  match lst with
  | Nil -> Nil
  | Cons(head, tail) -> Cons(f head, map f tail)
```

**Binary Tree Traversal**:
```rust
enum Tree<T> {
    Leaf(T),
    Node(Box<Tree<T>>, Box<Tree<T>>),
}

fn sum_tree(tree: &Tree<i32>) -> i32 {
    match tree {
        Tree::Leaf(n) => *n,
        Tree::Node(left, right) => {
            sum_tree(left) + sum_tree(right)
        }
    }
}

fn depth<T>(tree: &Tree<T>) -> usize {
    match tree {
        Tree::Leaf(_) => 1,
        Tree::Node(left, right) => {
            1 + std::cmp::max(depth(left), depth(right))
        }
    }
}
```

## Advanced Patterns

**Slice Patterns**:
```rust
fn describe_slice(slice: &[i32]) {
    match slice {
        [] => println!("empty"),
        [x] => println!("one element: {}", x),
        [x, y] => println!("two elements: {}, {}", x, y),
        [first, .., last] => {
            println!("many elements, first: {}, last: {}", first, last);
        }
    }
}
```

**Rest Patterns**:
```rust
let numbers = vec![1, 2, 3, 4, 5];

match &numbers[..] {
    [first, second, rest @ ..] => {
        println!("First: {}, Second: {}", first, second);
        println!("Rest: {:?}", rest);
    }
    _ => {}
}
```

**Reference Patterns**:
```rust
fn process(value: &Option<String>) {
    match value {
        Some(ref s) if s.len() > 10 => {
            println!("Long string: {}", s);
        }
        Some(s) => {
            println!("Short string: {}", s);
        }
        None => println!("No string"),
    }
}
```

## Pattern Matching in Function Parameters

Functions can pattern match their arguments:

```rust
fn head_and_tail<T>(vec: &Vec<T>) -> Option<(&T, &[T])> {
    match vec.as_slice() {
        [] => None,
        [head, tail @ ..] => Some((head, tail)),
    }
}
```

**Direct Parameter Matching**:
```ocaml
let fst (x, _) = x
let snd (_, y) = y

let add_points (x1, y1) (x2, y2) = (x1 + x2, y1 + y2)
```

**Tuple Destructuring**:
```python
def divide_with_remainder(numerator, denominator):
    return (numerator // denominator, numerator % denominator)

quotient, remainder = divide_with_remainder(17, 5)
```

## Let-Binding Patterns

Pattern matching in variable bindings:

```rust
let (x, y, z) = (1, 2, 3);

let Point { x, y } = point;

if let Some(value) = option {
    println!("Got value: {}", value);
}

while let Some(item) = iterator.next() {
    process(item);
}
```

**Irrefutable Patterns**:
```rust
// Always matches
let (x, y) = (1, 2);

// May fail - compile error in let binding
// let Some(x) = option;  // Error: refutable pattern

// OK in if let (only executes if matches)
if let Some(x) = option {
    println!("{}", x);
}
```

## Pattern Matching vs Switch

Pattern matching is more powerful than switch:

**Switch (C/Java)**:
```c
switch (value) {
    case 0:
        printf("zero\n");
        break;
    case 1:
        printf("one\n");
        break;
    default:
        printf("other\n");
}
```

Limitations:
- Only matches constants
- No destructuring
- Fall-through requires explicit break
- Not an expression

**Pattern Match (Rust)**:
```rust
let result = match value {
    (0, _) => "zero",
    (_, 0) => "second zero",
    (x, y) if x == y => "equal",
    (x, y) => "different",
};
```

Benefits:
- Destructuring
- Guards
- Exhaustiveness checking
- Expression (returns value)
- No fall-through bugs

## Pattern Matching in Different Languages

**Haskell**:
```haskell
factorial :: Int -> Int
factorial 0 = 1
factorial n = n * factorial (n - 1)

map :: (a -> b) -> [a] -> [b]
map _ [] = []
map f (x:xs) = f x : map f xs
```

**Scala**:
```scala
def eval(expr: Expr): Int = expr match {
  case Number(n) => n
  case Add(l, r) => eval(l) + eval(r)
  case Multiply(l, r) => eval(l) * eval(r)
}
```

**Erlang**:
```erlang
factorial(0) -> 1;
factorial(N) -> N * factorial(N-1).

length([]) -> 0;
length([_|Tail]) -> 1 + length(Tail).
```

**Python** (3.10+):
```python
match value:
    case 0:
        print("zero")
    case int(x) if x > 0:
        print(f"positive: {x}")
    case _:
        print("other")
```

## Performance

Pattern matching compiles to efficient code:

**Decision Trees**: Compiler optimizes pattern matching into decision trees that minimize comparisons.

**Jump Tables**: For dense integer patterns, compiles to jump tables (like switch).

**Inlining**: Pattern matches are often inlined, eliminating function call overhead.

Well-written pattern matches often compile to code as efficient as manually written if-else chains, while being more readable and maintainable.

Pattern matching is a cornerstone of functional programming but increasingly appears in multi-paradigm languages, demonstrating its value for writing clear, correct, and maintainable code.
