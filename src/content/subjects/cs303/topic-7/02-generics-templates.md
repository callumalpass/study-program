# Generics and Templates

Generics and templates enable writing code that works with multiple types while maintaining type safety. They are fundamental to modern programming, enabling reusable data structures, algorithms, and abstractions. Different languages take different approaches, from Java's type erasure to C++'s template instantiation to Rust's monomorphization.

## Parametric Polymorphism

Parametric polymorphism allows functions and data structures to be written generically, with type parameters filled in later:

```java
// Generic class in Java
public class Box<T> {
    private T value;

    public void set(T value) {
        this.value = value;
    }

    public T get() {
        return value;
    }
}

// Usage with different types
Box<Integer> intBox = new Box<>();
intBox.set(42);

Box<String> strBox = new Box<>();
strBox.set("hello");
```

The type parameter `T` is a placeholder that gets replaced with concrete types at use sites.

**Generic Functions**:
```java
public static <T> T identity(T value) {
    return value;
}

Integer x = identity(42);
String s = identity("hello");
```

The compiler infers type arguments from context, reducing verbosity.

## Bounded Type Parameters

Constraints on type parameters enable operations on generic types:

```java
public class NumericBox<T extends Number> {
    private T value;

    public double doubleValue() {
        return value.doubleValue();  // OK: T is a Number
    }
}

// Valid:
NumericBox<Integer> intBox = new NumericBox<>();
NumericBox<Double> doubleBox = new NumericBox<>();

// Invalid:
// NumericBox<String> strBox = new NumericBox<>();  // String is not a Number
```

**Multiple Bounds**:
```java
public class ComparableBox<T extends Comparable<T> & Serializable> {
    private T value;

    public boolean isGreaterThan(T other) {
        return value.compareTo(other) > 0;
    }
}
```

## C++ Templates

C++ templates are more powerful than Java generics, supporting compile-time computation and specialization:

**Function Templates**:
```cpp
template<typename T>
T max(T a, T b) {
    return (a > b) ? a : b;
}

int x = max(10, 20);        // Instantiates max<int>
double y = max(1.5, 2.7);   // Instantiates max<double>
```

**Class Templates**:
```cpp
template<typename T>
class Stack {
private:
    std::vector<T> elements;

public:
    void push(const T& elem) {
        elements.push_back(elem);
    }

    T pop() {
        T elem = elements.back();
        elements.pop_back();
        return elem;
    }

    bool empty() const {
        return elements.empty();
    }
};

Stack<int> intStack;
Stack<std::string> strStack;
```

**Template Specialization**:
```cpp
// General template
template<typename T>
class TypeInfo {
public:
    static const char* name() {
        return "Unknown";
    }
};

// Specialized for int
template<>
class TypeInfo<int> {
public:
    static const char* name() {
        return "Integer";
    }
};

// Specialized for pointers
template<typename T>
class TypeInfo<T*> {
public:
    static const char* name() {
        return "Pointer";
    }
};

std::cout << TypeInfo<int>::name();     // "Integer"
std::cout << TypeInfo<double>::name();  // "Unknown"
std::cout << TypeInfo<int*>::name();    // "Pointer"
```

**Non-Type Template Parameters**:
```cpp
template<typename T, size_t N>
class Array {
private:
    T elements[N];

public:
    size_t size() const { return N; }

    T& operator[](size_t index) {
        return elements[index];
    }
};

Array<int, 10> arr10;
Array<double, 100> arr100;
```

The size is part of the type, enabling compile-time bounds checking.

## Type Erasure vs Monomorphization

Different languages implement generics differently:

**Type Erasure (Java)**:
```java
// Generic code:
public class Box<T> {
    private T value;
    public T get() { return value; }
}

// After erasure (simplified):
public class Box {
    private Object value;
    public Object get() { return value; }
}
```

Type information is erased at runtime. One implementation serves all types:
- Smaller binary size
- Slower due to boxing/unboxing
- Can't specialize for specific types
- Type information not available at runtime

**Monomorphization (C++, Rust)**:
```rust
fn identity<T>(x: T) -> T {
    x
}

let a = identity(42);      // Generates identity::<i32>
let b = identity("hello"); // Generates identity::<&str>
```

Separate code generated for each type:
- Larger binary size (code duplication)
- Faster (no indirection, optimized per type)
- Can specialize implementations
- No runtime type information needed

## Variance and Subtyping

Generics interact with subtyping through variance:

**Covariance**: If `Dog extends Animal`, is `Box<Dog>` a subtype of `Box<Animal>`?

```java
// Covariant (read-only)
List<? extends Animal> animals = new ArrayList<Dog>();
Animal a = animals.get(0);  // OK: returns Animal
// animals.add(new Dog());  // ERROR: might not be List<Dog>
```

**Contravariance**: `Box<Animal>` is a subtype of `Box<? super Dog>`.

```java
// Contravariant (write-only)
List<? super Dog> dogs = new ArrayList<Animal>();
dogs.add(new Dog());  // OK: Dog is subtype of Animal
// Dog d = dogs.get(0);  // ERROR: might return Animal
```

**Invariance**: No subtyping relationship.

```java
// Invariant (read-write)
List<Dog> dogs = new ArrayList<>();
// List<Animal> animals = dogs;  // ERROR: invariant
```

The PECS principle: **Producer Extends, Consumer Super**
- Use `? extends T` when getting values (covariant)
- Use `? super T` when putting values (contravariant)

## Rust Traits and Generic Constraints

Rust uses traits to constrain generic types:

```rust
// Define trait
trait Drawable {
    fn draw(&self);
}

// Generic function with trait bound
fn render<T: Drawable>(item: T) {
    item.draw();
}

// Alternative syntax
fn render_alt<T>(item: T)
where
    T: Drawable
{
    item.draw();
}

// Multiple trait bounds
fn process<T: Drawable + Clone>(item: T) {
    let copy = item.clone();
    copy.draw();
}
```

**Associated Types**:
```rust
trait Container {
    type Item;

    fn add(&mut self, item: Self::Item);
    fn get(&self, index: usize) -> Option<&Self::Item>;
}

impl Container for Vec<String> {
    type Item = String;

    fn add(&mut self, item: String) {
        self.push(item);
    }

    fn get(&self, index: usize) -> Option<&String> {
        self.get(index)
    }
}
```

Associated types avoid specifying types at every use site.

## Default Type Parameters

Generic types can have default type arguments:

```cpp
template<typename T, typename Allocator = std::allocator<T>>
class Vector {
    // ...
};

Vector<int> vec1;  // Uses default allocator
Vector<int, CustomAllocator<int>> vec2;  // Custom allocator
```

```rust
struct HashMap<K, V, S = RandomState> {
    // S is the hasher, defaults to RandomState
}

let map1: HashMap<String, i32> = HashMap::new();  // Default hasher
let map2: HashMap<String, i32, MyHasher> = HashMap::with_hasher(MyHasher);
```

## Variadic Generics

Some languages support variable numbers of type parameters:

**C++ Variadic Templates**:
```cpp
template<typename... Args>
void print(Args... args) {
    (std::cout << ... << args) << '\n';
}

print(1, 2.5, "hello");  // Works with any types and count
```

**Tuple Implementation**:
```cpp
template<typename... Types>
class Tuple;

template<>
class Tuple<> {
    // Empty tuple
};

template<typename Head, typename... Tail>
class Tuple<Head, Tail...> : private Tuple<Tail...> {
    Head value;
public:
    Tuple(Head h, Tail... t)
        : Tuple<Tail...>(t...), value(h) {}

    Head get_head() const { return value; }
};

Tuple<int, double, std::string> t(42, 3.14, "hello");
```

## Higher-Kinded Types

Higher-kinded types are type constructors that take type constructors as parameters:

```haskell
-- Haskell example
class Functor f where
    fmap :: (a -> b) -> f a -> f b

instance Functor [] where
    fmap = map

instance Functor Maybe where
    fmap f Nothing = Nothing
    fmap f (Just x) = Just (f x)

-- f is a type constructor (like [] or Maybe)
-- Not just a type (like Int or String)
```

Most languages don't support this (Java, C++), though Scala does:

```scala
trait Functor[F[_]] {
  def map[A, B](fa: F[A])(f: A => B): F[B]
}

implicit val listFunctor = new Functor[List] {
  def map[A, B](fa: List[A])(f: A => B): List[B] = fa.map(f)
}
```

## Compile-Time Computation with Generics

Templates enable compile-time computation:

```cpp
template<int N>
struct Fibonacci {
    static const int value = Fibonacci<N-1>::value + Fibonacci<N-2>::value;
};

template<>
struct Fibonacci<0> {
    static const int value = 0;
};

template<>
struct Fibonacci<1> {
    static const int value = 1;
};

int main() {
    constexpr int fib10 = Fibonacci<10>::value;  // Computed at compile time
    std::cout << fib10 << '\n';  // 55
}
```

**Constexpr Functions** (modern C++):
```cpp
constexpr int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

constexpr int fib10 = fibonacci(10);  // Compile-time evaluation
```

## Generic Data Structures

Generics enable type-safe collections:

**Generic Linked List**:
```rust
pub struct List<T> {
    head: Option<Box<Node<T>>>,
}

struct Node<T> {
    value: T,
    next: Option<Box<Node<T>>>,
}

impl<T> List<T> {
    pub fn new() -> Self {
        List { head: None }
    }

    pub fn push(&mut self, value: T) {
        let new_node = Box::new(Node {
            value,
            next: self.head.take(),
        });
        self.head = Some(new_node);
    }

    pub fn pop(&mut self) -> Option<T> {
        self.head.take().map(|node| {
            self.head = node.next;
            node.value
        })
    }
}
```

**Generic Binary Tree**:
```java
class BinaryTree<T extends Comparable<T>> {
    private static class Node<T> {
        T value;
        Node<T> left, right;

        Node(T value) {
            this.value = value;
        }
    }

    private Node<T> root;

    public void insert(T value) {
        root = insertRec(root, value);
    }

    private Node<T> insertRec(Node<T> node, T value) {
        if (node == null) {
            return new Node<>(value);
        }

        int cmp = value.compareTo(node.value);
        if (cmp < 0) {
            node.left = insertRec(node.left, value);
        } else if (cmp > 0) {
            node.right = insertRec(node.right, value);
        }

        return node;
    }
}
```

## Performance Considerations

**Monomorphization Costs**:
- Code bloat from multiple instantiations
- Longer compile times
- But better runtime performance

**Type Erasure Costs**:
- Boxing/unboxing overhead
- Virtual dispatch for operations
- But smaller binaries

**Best Practices**:
- Use generics for type safety and reusability
- Avoid excessive nesting of generic types
- Profile to identify performance bottlenecks
- Consider monomorphization vs type erasure trade-offs
- Use constexpr/const generics when possible

Generics and templates are essential tools for modern programming, enabling type-safe, reusable code while maintaining performance. Understanding their implementations and trade-offs is crucial for effective use.
