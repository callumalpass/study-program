# Effect Systems

Effect systems are type systems that track computational effects - operations that do more than just compute and return values. By making effects explicit in types, effect systems enable better reasoning about program behavior, improved optimization, and safer composition of code. They represent an important trend in modern programming language design.

## What Are Effects?

Effects are operations that interact with the world beyond pure computation:

**Common Effects**:
- **I/O**: Reading/writing files, network communication
- **State**: Mutable variables, references
- **Exceptions**: Throwing and catching errors
- **Non-determinism**: Random number generation, ambiguity
- **Concurrency**: Spawning threads, synchronization
- **Resource management**: Memory allocation, locks

A **pure function** has no effects - it always produces the same output for the same input and doesn't interact with external state:

```haskell
-- Pure: no effects
add :: Int -> Int -> Int
add x y = x + y

-- Impure: has I/O effect
readNumber :: IO Int
readNumber = do
    line <- getLine
    return (read line :: Int)
```

## Effect Types and Annotations

Effect systems annotate types with the effects a computation might perform:

**Haskell's IO Monad**:
```haskell
-- Pure function
double :: Int -> Int
double x = x * 2

-- Effectful computation (I/O)
printNumber :: Int -> IO ()
printNumber n = print n

-- Cannot mix pure and effectful without explicit sequencing
main :: IO ()
main = do
    let x = double 5
    printNumber x
```

The `IO` type constructor marks functions that perform I/O. You cannot accidentally use an IO function where a pure function is expected.

**Scala's ZIO**:
```scala
import zio._

// Effect type: ZIO[R, E, A]
// R: required environment
// E: error type
// A: success type

def readFile(path: String): ZIO[Any, IOException, String] = {
    // Implementation
}

def processData(data: String): ZIO[Any, Nothing, Int] = {
    // Pure computation (Nothing means no errors)
    ZIO.succeed(data.length)
}

val program: ZIO[Any, IOException, Int] = for {
    content <- readFile("data.txt")
    result <- processData(content)
} yield result
```

## Algebraic Effects

Algebraic effects provide a general framework for effect handling:

**Effect Definition**:
```ocaml
(* Effect declaration *)
effect Read : unit -> string
effect Write : string -> unit

(* Handler *)
let console_handler comp =
  try comp () with
  | effect (Read ()) k ->
      let line = read_line () in
      continue k line
  | effect (Write s) k ->
      print_endline s;
      continue k ()

(* Usage *)
let program () =
  let name = perform (Read ()) in
  perform (Write ("Hello, " ^ name))

let () = console_handler program
```

Effects can be:
1. Declared as operations
2. Performed in computations
3. Handled by custom handlers

This separates effect specification from implementation.

**Multiple Handlers**:
```ocaml
(* Same effects, different handlers *)
let test_handler comp =
  try comp () with
  | effect (Read ()) k ->
      continue k "test_user"
  | effect (Write s) k ->
      (* Log instead of printing *)
      log s;
      continue k ()

(* Run with different handler for testing *)
let () = test_handler program
```

## Effect Tracking and Inference

**Effect Inference** automatically determines what effects a function performs:

```kotlin
// Kotlin (experimental)
suspend fun fetchData(): String {
    delay(1000)  // Suspension effect
    return "data"
}

fun processData(data: String): Int {
    return data.length  // No effects
}

// Compiler infers this needs suspension
suspend fun pipeline(): Int {
    val data = fetchData()  // Suspension effect propagates
    return processData(data)
}
```

**Effect Polymorphism**:
```scala
// Generic over effects
def map[F[_]: Functor, A, B](fa: F[A])(f: A => B): F[B] =
  Functor[F].map(fa)(f)

// Works with any effect F
val listResult: List[Int] = map(List(1, 2, 3))(_ + 1)
val optionResult: Option[Int] = map(Some(5))(_ + 1)
val ioResult: IO[Int] = map(IO(5))(_ + 1)
```

## Checked Exceptions as Effects

Java's checked exceptions are a simple effect system:

```java
// Method signature declares IOException effect
public String readFile(String path) throws IOException {
    return Files.readString(Paths.get(path));
}

// Caller must handle or propagate
public void process() {
    try {
        String content = readFile("data.txt");
        System.out.println(content);
    } catch (IOException e) {
        System.err.println("Error: " + e.getMessage());
    }
}
```

Limitations:
- Only tracks exceptions, not other effects
- Verbose (must declare all exception types)
- Subverted by unchecked exceptions
- No effect polymorphism

## Monadic Effect Systems

Monads provide structure for effect handling:

**State Monad**:
```haskell
import Control.Monad.State

type Counter = State Int

increment :: Counter ()
increment = modify (+1)

decrement :: Counter ()
decrement = modify (subtract 1)

getCount :: Counter Int
getCount = get

program :: Counter Int
program = do
    increment
    increment
    decrement
    getCount

-- Run with initial state
result = runState program 0  -- (1, 1): final count and state
```

**Reader Monad** (environment/configuration):
```haskell
import Control.Monad.Reader

type Config = String

greet :: Reader Config String
greet = do
    name <- ask  -- Get configuration
    return ("Hello, " ++ name)

program :: Reader Config String
program = do
    greeting1 <- greet
    greeting2 <- greet
    return (greeting1 ++ " and " ++ greeting2)

result = runReader program "Alice"  -- "Hello, Alice and Hello, Alice"
```

**Monad Transformers** combine multiple effects:
```haskell
import Control.Monad.State
import Control.Monad.Except

type Computation = StateT Int (Except String)

computation :: Computation Int
computation = do
    x <- get  -- State effect
    when (x < 0) $ throwError "Negative value"  -- Exception effect
    put (x + 1)  -- State effect
    return x

result = runExcept (runStateT computation 5)
-- Right (5, 6): success with result and final state
```

## Effect Handlers and Delimited Continuations

Effect handlers use delimited continuations to intercept and handle effects:

```ocaml
(* Nondeterminism effect *)
effect Choice : unit -> bool

let handler_all comp =
  try [comp ()] with
  | effect (Choice ()) k ->
      continue k true @ continue k false

let program () =
  let x = if perform (Choice ()) then 1 else 2 in
  let y = if perform (Choice ()) then 10 else 20 in
  x + y

(* Explore all choices *)
let results = handler_all program
(* Returns: [11; 21; 12; 22] - all combinations *)
```

This enables backtracking, generators, async/await, and more.

## Row Polymorphism for Effects

Row types allow open effect sets:

```
// Hypothetical syntax
fun readAndWrite<effects: {Read, Write | rest}>(
    file: String
): String with effects {
    let content = read(file);  // Read effect
    write(file, content);       // Write effect
    content
}

// Can be called with more effects
fun complexOperation<effects: {Read, Write, Network}>(
    file: String
): String with effects {
    readAndWrite(file)  // OK: has required effects
}
```

The `| rest` allows additional effects, enabling effect-polymorphic code.

## Tracking Resource Usage

Effect systems can enforce resource protocols:

**Koka Language**:
```koka
effect state<s> {
  fun get(): s
  fun put(x: s): ()
}

fun counter(): <state<int>> int {
  val x = get()
  put(x + 1)
  x
}

fun main() {
  with handler {
    return(x) -> x
    fun get() -> resume(0)
    fun put(x) -> resume(())
  }
  counter()
}
```

**Linear Types for Resources**:
```rust
// File must be closed exactly once
struct File(/* ... */);

impl File {
    fn open(path: &str) -> File { /* ... */ }

    // Consumes self, ensuring file is closed
    fn close(self) { /* ... */ }
}

fn use_file() {
    let f = File::open("data.txt");
    // ... use f ...
    f.close();  // Must close
    // f.close();  // ERROR: already consumed
}
```

## Practical Benefits

**Reasoning**: Effect types document what functions do beyond their return values.

```haskell
-- Clear from type: pure computation
calculateTax :: Money -> TaxRate -> Money

-- Clear from type: performs I/O
saveTaxRecord :: TaxRecord -> IO ()
```

**Optimization**: Compilers can optimize pure code more aggressively.

**Testing**: Pure functions are easier to test (no mocking needed).

**Parallelization**: Pure computations can be safely parallelized.

**Refactoring**: Effect types prevent accidentally introducing effects.

## Effect Systems in Practice

**Haskell**: IO monad separates pure and impure code.

**Scala**: ZIO, Cats Effect provide sophisticated effect systems.

**Kotlin**: Coroutines track suspension effects.

**Rust**: Async/await, Result type for error effects.

**Koka**: First-class algebraic effects with handlers.

**OCaml**: Experimental algebraic effects.

**Java**: Checked exceptions (limited effect system).

## Async/Await as Effect

Async/await is an effect system for asynchronous computation:

**JavaScript**:
```javascript
// async function returns Promise (effect type)
async function fetchUser(id) {
    const response = await fetch(`/users/${id}`);
    return await response.json();
}

// await only allowed in async functions
async function main() {
    const user = await fetchUser(1);
    console.log(user);
}
```

**Rust**:
```rust
async fn fetch_user(id: u32) -> Result<User, Error> {
    let response = reqwest::get(&format!("/users/{}", id)).await?;
    response.json().await
}

#[tokio::main]
async fn main() {
    match fetch_user(1).await {
        Ok(user) => println!("{:?}", user),
        Err(e) => eprintln!("Error: {}", e),
    }
}
```

The `async` keyword marks functions that can suspend, and `await` performs the suspension effect.

## Future Directions

Effect systems are an active research area:

- **Automatic effect inference**: No manual annotations
- **Effect subtyping**: Fine-grained effect hierarchies
- **Effect systems for parallelism**: Track data races
- **Resource effects**: Track memory, time, energy usage
- **Capability-based effects**: Combine with security

As languages evolve, effect systems will likely become more sophisticated, providing stronger guarantees about program behavior while remaining practical for everyday use.
