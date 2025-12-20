# Metaprogramming: Macros, Reflection, and Code Generation

Metaprogramming is the practice of writing programs that manipulate other programs as data. This powerful technique enables code generation, compile-time computation, and runtime introspection. Metaprogramming mechanisms include macros, reflection, and various code generation approaches that extend a language's expressiveness while maintaining performance and safety.

## Textual Macros and Preprocessing

The simplest form of metaprogramming is textual substitution, exemplified by C preprocessor macros:

```c
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define SQUARE(x) ((x) * (x))

int result = MAX(5, 10);  // Expands to: ((5) > (10) ? (5) : (10))
```

While simple, textual macros have serious limitations:

**Multiple Evaluation**:
```c
int x = 5;
int y = SQUARE(x++);  // Expands to: ((x++) * (x++))
// x is incremented twice! Unexpected behavior
```

**Lack of Scope**:
```c
#define BEGIN {
#define END }

BEGIN
    int x = 5;
END  // Expands to { int x = 5; }
```

This violates scoping rules and can cause subtle bugs.

**No Type Safety**:
```c
#define SWAP(a, b) { auto tmp = a; a = b; b = tmp; }
SWAP(int_var, float_var);  // Type mismatch not caught
```

Despite limitations, C preprocessor macros remain useful for:
- Conditional compilation
- Include guards
- Simple constants
- Platform-specific code

## Syntactic Macros (Hygienic Macros)

Modern languages provide syntactic macros that operate on abstract syntax trees rather than text. Lisp pioneered this with homoiconic syntax where code and data have the same representation.

**Scheme Macros**:
```scheme
(define-syntax when
  (syntax-rules ()
    ((when condition body ...)
     (if condition
         (begin body ...)))))

; Usage:
(when (> x 0)
  (display "positive")
  (newline))

; Expands to:
(if (> x 0)
    (begin
      (display "positive")
      (newline)))
```

Advantages:
- Operates on syntax trees, not text
- Hygienic (respects scope, prevents variable capture)
- Type-checked after expansion
- Composable

**Rust Macros**:
```rust
// Declarative macro
macro_rules! vec {
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}

// Usage:
let v = vec![1, 2, 3, 4];
```

Rust macros:
- Match on token trees, not text
- Hygienic by default
- Expand before type checking
- Can generate arbitrary code

**Procedural Macros**:
```rust
#[derive(Debug, Clone, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

// Macro generates implementations automatically
```

Procedural macros are full Rust programs that transform syntax trees:

```rust
use proc_macro::TokenStream;

#[proc_macro_derive(Builder)]
pub fn derive_builder(input: TokenStream) -> TokenStream {
    // Parse input AST
    let ast = syn::parse(input).unwrap();

    // Generate builder implementation
    impl_builder(&ast)
}
```

This enables powerful compile-time code generation with full language support.

## Template Metaprogramming

C++ templates provide Turing-complete compile-time computation:

**Compile-Time Factorial**:
```cpp
template<int N>
struct Factorial {
    static const int value = N * Factorial<N-1>::value;
};

template<>
struct Factorial<0> {
    static const int value = 1;
};

int main() {
    int result = Factorial<5>::value;  // Computed at compile time: 120
}
```

**Type-Level Programming**:
```cpp
template<typename T>
struct is_pointer {
    static const bool value = false;
};

template<typename T>
struct is_pointer<T*> {
    static const bool value = true;
};

// Usage:
static_assert(is_pointer<int*>::value, "Should be true");
static_assert(!is_pointer<int>::value, "Should be false");
```

**SFINAE (Substitution Failure Is Not An Error)**:
```cpp
template<typename T>
typename std::enable_if<std::is_integral<T>::value, T>::type
increment(T value) {
    return value + 1;
}

template<typename T>
typename std::enable_if<std::is_floating_point<T>::value, T>::type
increment(T value) {
    return value + 0.1;
}
```

This enables compile-time dispatching based on type properties.

**Variadic Templates**:
```cpp
template<typename... Args>
void print(Args... args) {
    (std::cout << ... << args) << '\n';  // C++17 fold expression
}

print(1, 2.5, "hello", true);  // Works with any number of arguments
```

Modern C++ templates enable sophisticated metaprogramming, though readability suffers.

## Reflection

Reflection allows programs to inspect and modify their own structure at runtime.

**Java Reflection**:
```java
class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

// Inspect class structure
Class<?> cls = Person.class;
Field[] fields = cls.getDeclaredFields();
for (Field field : fields) {
    System.out.println(field.getName() + ": " + field.getType());
}

// Create instance dynamically
Constructor<?> ctor = cls.getConstructor(String.class, int.class);
Object person = ctor.newInstance("Alice", 30);

// Access private field
Field nameField = cls.getDeclaredField("name");
nameField.setAccessible(true);
String name = (String) nameField.get(person);
```

**Python Reflection**:
```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        print(f"Hello, I'm {self.name}")

# Inspect attributes
p = Person("Alice", 30)
print(dir(p))  # List all attributes

# Dynamic attribute access
print(getattr(p, 'name'))  # "Alice"
setattr(p, 'age', 31)

# Inspect methods
import inspect
print(inspect.getmembers(p, predicate=inspect.ismethod))

# Dynamic method call
method = getattr(p, 'greet')
method()  # Calls greet()
```

**Use Cases**:
- Serialization/deserialization
- ORM (Object-Relational Mapping)
- Dependency injection
- Testing frameworks
- IDE auto-completion

**Performance Cost**: Reflection is typically slower than direct access and prevents optimizations.

## Code Generation

Generating code programmatically enables powerful abstractions:

**String-Based Code Generation** (simple but fragile):
```python
def generate_class(class_name, fields):
    code = f"class {class_name}:\n"
    code += "    def __init__(self"

    for field in fields:
        code += f", {field}"

    code += "):\n"

    for field in fields:
        code += f"        self.{field} = {field}\n"

    return code

code = generate_class("Point", ["x", "y"])
exec(code)  # Create class dynamically

p = Point(10, 20)
```

**AST-Based Code Generation** (robust):
```python
import ast

def generate_class_ast(class_name, fields):
    # Build AST for __init__ method
    init_args = [ast.arg(arg='self', annotation=None)]
    for field in fields:
        init_args.append(ast.arg(arg=field, annotation=None))

    init_body = []
    for field in fields:
        init_body.append(
            ast.Assign(
                targets=[ast.Attribute(
                    value=ast.Name(id='self', ctx=ast.Store()),
                    attr=field, ctx=ast.Store())],
                value=ast.Name(id=field, ctx=ast.Load())))

    # Create class AST
    class_def = ast.ClassDef(
        name=class_name,
        bases=[],
        keywords=[],
        body=[
            ast.FunctionDef(
                name='__init__',
                args=ast.arguments(
                    args=init_args,
                    defaults=[]),
                body=init_body,
                decorator_list=[])
        ],
        decorator_list=[])

    # Compile and execute
    module = ast.Module(body=[class_def], type_ignores=[])
    code = compile(module, '<generated>', 'exec')
    namespace = {}
    exec(code, namespace)
    return namespace[class_name]

Point = generate_class_ast("Point", ["x", "y"])
p = Point(10, 20)
```

**Template-Based Code Generation**:
```python
from jinja2 import Template

template = Template("""
class {{ class_name }}:
    def __init__(self, {% for field in fields %}{{ field }}{% if not loop.last %}, {% endif %}{% endfor %}):
        {% for field in fields %}
        self.{{ field }} = {{ field }}
        {% endfor %}
""")

code = template.render(class_name="Point", fields=["x", "y"])
```

## Quasiquotation and Splicing

Lisp-family languages support quasiquotation for building code:

```scheme
(define-syntax make-adder
  (syntax-rules ()
    ((make-adder n)
     (lambda (x) (+ x n)))))

(define add5 (make-adder 5))
(add5 10)  ; Returns 15
```

**Unquote and Splice**:
```scheme
(define x 10)
`(1 2 ,x 4)       ; => (1 2 10 4)
`(1 2 ,@(list 3 4) 5)  ; => (1 2 3 4 5)
```

This makes code generation syntactically convenient.

## Multi-Stage Programming

Explicit staging separates compile-time and runtime:

**MetaOCaml**:
```ocaml
let power n =
  let rec aux n x =
    if n = 0 then .<1>.
    else if n mod 2 = 0 then
      .<let y = .~(aux (n/2) x) in y * y>.
    else .<.~x * .~(aux (n-1) x)>.
  in .<fun x -> .~(aux n .<x>.)>.

let power7 = .! (power 7)  (* Generate specialized power function *)
```

The brackets `.<...>.` quote code, `.~` splices it, and `.!` evaluates it. This generates optimized code at compile time.

## Practical Metaprogramming Patterns

**Generic Serialization**:
```rust
#[derive(Serialize, Deserialize)]
struct User {
    id: u64,
    name: String,
    email: String,
}

// Macro generates serialization code automatically
```

**DSL Implementation**:
```ruby
class Routes
  def self.get(path, &block)
    # Register route at compile time
  end
end

Routes.get "/users" do
  User.all.to_json
end
```

**Aspect-Oriented Programming**:
```python
def log_execution(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

@log_execution
def add(a, b):
    return a + b
```

Metaprogramming is powerful but should be used judiciously. It can reduce boilerplate and enable elegant abstractions, but can also obscure code behavior and complicate debugging. The key is finding the right balance between metaprogramming power and code clarity.
