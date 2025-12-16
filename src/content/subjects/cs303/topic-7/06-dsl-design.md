# Domain-Specific Languages and Embedded DSLs

Domain-Specific Languages (DSLs) are programming languages tailored to a specific application domain. Unlike general-purpose languages, DSLs trade broad applicability for expressiveness in their target domain. They enable domain experts to work more effectively by providing abstractions and syntax that match domain concepts directly.

## What Are DSLs?

A DSL provides specialized notation and abstractions for a particular problem domain. DSLs exist along a spectrum from standalone languages with custom syntax to libraries that use host language features to create domain-specific abstractions.

**Examples of Standalone DSLs**:
- **SQL**: Database queries
- **HTML/CSS**: Document structure and styling
- **Regular Expressions**: Pattern matching
- **Make**: Build automation
- **LaTeX**: Document typesetting
- **Verilog/VHDL**: Hardware description

**SQL Example**:
```sql
SELECT customers.name, COUNT(orders.id) as order_count
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id
WHERE customers.country = 'USA'
GROUP BY customers.name
HAVING order_count > 5
ORDER BY order_count DESC;
```

This expresses a complex data query concisely in domain terms.

## Internal vs External DSLs

**External DSLs** have their own syntax and require a parser/compiler:

```regex
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$
```

This regular expression is a complete language with its own grammar.

Advantages:
- Complete syntactic freedom
- Can be optimized for domain
- Tooling can be domain-specific

Disadvantages:
- Requires implementing parser, compiler/interpreter
- Tooling (IDE support, debuggers) must be built from scratch
- Learning curve for new syntax
- Integration with host language can be awkward

**Internal DSLs** (Embedded DSLs) use host language syntax but provide domain-specific abstractions:

**Ruby DSL Example**:
```ruby
# Rails routing DSL
Rails.application.routes.draw do
  root 'welcome#index'

  resources :articles do
    resources :comments
  end

  get 'about', to: 'pages#about'
  post 'contact', to: 'pages#contact'
end
```

This uses Ruby syntax but provides routing-specific abstractions.

Advantages:
- Leverage host language's parser, type system, tooling
- Easier integration with application code
- Users already know the syntax
- Can gradually adopt (start with library, evolve to DSL)

Disadvantages:
- Constrained by host language syntax
- May not be as natural as external DSL
- Performance may be limited by host language

## Designing an Embedded DSL

Key principles for embedded DSL design:

### 1. Identify Domain Concepts

Map domain concepts to language constructs:

**Build System DSL** (Gradle):
```kotlin
plugins {
    kotlin("jvm") version "1.8.0"
    application
}

dependencies {
    implementation("org.jetbrains.kotlin:kotlin-stdlib")
    testImplementation("org.junit.jupiter:junit-jupiter:5.8.1")
}

tasks.test {
    useJUnitPlatform()
}

application {
    mainClass.set("com.example.MainKt")
}
```

Domain concepts (plugins, dependencies, tasks) map to DSL constructs.

### 2. Choose Appropriate Abstractions

**Fluent Interfaces** for chaining operations:

```kotlin
// HTTP client DSL
val response = client.get("https://api.example.com/users") {
    parameter("page", 1)
    parameter("size", 10)
    header("Authorization", "Bearer $token")
}.body<List<User>>()
```

**Builder Pattern** for complex construction:

```java
Pizza pizza = new Pizza.Builder()
    .size(Size.LARGE)
    .cheese(true)
    .pepperoni(true)
    .mushrooms(false)
    .build();
```

**Method Chaining** for sequential operations:

```java
List<String> result = users.stream()
    .filter(user -> user.isActive())
    .map(user -> user.getName())
    .sorted()
    .collect(Collectors.toList());
```

### 3. Leverage Host Language Features

**Kotlin DSLs** use lambda with receivers:

```kotlin
fun html(init: HTML.() -> Unit): HTML {
    val html = HTML()
    html.init()
    return html
}

class HTML {
    fun head(init: Head.() -> Unit) { /* ... */ }
    fun body(init: Body.() -> Unit) { /* ... */ }
}

class Body {
    fun h1(text: String) { /* ... */ }
    fun p(text: String) { /* ... */ }
}

// Usage
val page = html {
    head {
        title("My Page")
    }
    body {
        h1("Welcome")
        p("Hello, world!")
    }
}
```

**Scala DSLs** use implicits and operator overloading:

```scala
// ScalaTest DSL
class CalculatorSpec extends FlatSpec with Matchers {
  "A Calculator" should "add two numbers" in {
    val result = 2 + 2
    result shouldEqual 4
  }

  it should "subtract numbers" in {
    val result = 5 - 3
    result should be (2)
  }
}
```

**Ruby DSLs** use blocks and method_missing:

```ruby
# RSpec testing DSL
describe Calculator do
  describe "#add" do
    it "adds two numbers" do
      calc = Calculator.new
      expect(calc.add(2, 2)).to eq(4)
    end
  end

  describe "#subtract" do
    it "subtracts numbers" do
      calc = Calculator.new
      expect(calc.subtract(5, 3)).to eq(2)
    end
  end
end
```

## DSL Implementation Techniques

### Fluent Interface Pattern

```java
public class QueryBuilder {
    private String table;
    private List<String> columns = new ArrayList<>();
    private String whereClause;

    public QueryBuilder from(String table) {
        this.table = table;
        return this;
    }

    public QueryBuilder select(String... columns) {
        this.columns.addAll(Arrays.asList(columns));
        return this;
    }

    public QueryBuilder where(String condition) {
        this.whereClause = condition;
        return this;
    }

    public String build() {
        StringBuilder sql = new StringBuilder("SELECT ");
        sql.append(String.join(", ", columns));
        sql.append(" FROM ").append(table);
        if (whereClause != null) {
            sql.append(" WHERE ").append(whereClause);
        }
        return sql.toString();
    }
}

// Usage
String query = new QueryBuilder()
    .select("id", "name", "email")
    .from("users")
    .where("age > 18")
    .build();
```

### Expression Builder Pattern

```python
# SQLAlchemy query DSL
from sqlalchemy import select, and_, or_

query = select(User.name, User.email).where(
    and_(
        User.age > 18,
        or_(
            User.country == 'USA',
            User.country == 'Canada'
        )
    )
).order_by(User.name)
```

### Macro-Based DSLs

**Rust Macros**:
```rust
// Declarative macro for JSON
macro_rules! json {
    ($($key:expr => $value:expr),* $(,)?) => {
        {
            let mut map = HashMap::new();
            $(map.insert($key, $value);)*
            map
        }
    };
}

// Usage
let config = json! {
    "host" => "localhost",
    "port" => "8080",
    "debug" => "true"
};
```

**Lisp Macros**:
```lisp
(defmacro when (condition &body body)
  `(if ,condition
       (progn ,@body)))

;; Usage
(when (> x 0)
  (print "positive")
  (increment-counter))

;; Expands to:
(if (> x 0)
    (progn
      (print "positive")
      (increment-counter)))
```

## Parser Combinators for External DSLs

Build parsers compositionally:

```scala
import scala.util.parsing.combinator._

class JSONParser extends RegexParsers {
  def value: Parser[Any] = obj | arr | string | number | bool | nul

  def obj: Parser[Map[String, Any]] =
    "{" ~> repsep(member, ",") <~ "}" ^^ (Map() ++ _)

  def arr: Parser[List[Any]] =
    "[" ~> repsep(value, ",") <~ "]"

  def member: Parser[(String, Any)] =
    string ~ ":" ~ value ^^ { case k ~ ":" ~ v => (k, v) }

  def string: Parser[String] =
    "\"" ~> """[^"]*""".r <~ "\""

  def number: Parser[Double] =
    """-?\d+(\.\d+)?""".r ^^ (_.toDouble)

  def bool: Parser[Boolean] =
    "true" ^^ (_ => true) | "false" ^^ (_ => false)

  def nul: Parser[Null] =
    "null" ^^ (_ => null)
}
```

## Template-Based DSLs

Use templates for declarative specification:

**Jinja2 Templates**:
```jinja2
<!DOCTYPE html>
<html>
<head>
    <title>{{ title }}</title>
</head>
<body>
    <h1>{{ heading }}</h1>
    <ul>
    {% for item in items %}
        <li>{{ item.name }}: {{ item.description }}</li>
    {% endfor %}
    </ul>
</body>
</html>
```

## DSL Best Practices

**1. Keep It Simple**: Don't add features you don't need. DSL should be smaller than general-purpose languages.

**2. Be Consistent**: Use consistent naming, structure, and conventions.

**3. Provide Good Errors**: Error messages should use domain terminology.

```
Bad:  "Syntax error at line 5, column 12"
Good: "Missing closing tag for 'div' element starting at line 3"
```

**4. Document Well**: Examples are crucial for DSL adoption.

**5. Version Carefully**: DSL changes affect many users. Provide migration paths.

**6. Consider Tooling**: IDE support, syntax highlighting, and linting improve usability.

**7. Test Extensively**: DSLs should have comprehensive test suites.

## DSL Applications

**Configuration**:
```yaml
# Kubernetes DSL
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
  template:
    spec:
      containers:
      - name: app
        image: my-app:1.0
        ports:
        - containerPort: 8080
```

**Testing**:
```python
# Pytest DSL
@pytest.fixture
def database():
    db = create_database()
    yield db
    db.close()

@pytest.mark.parametrize("input,expected", [
    (1, 2),
    (2, 4),
    (3, 6),
])
def test_double(input, expected):
    assert double(input) == expected
```

**Data Processing**:
```python
# Pandas DSL
result = (df
    .query('age > 18')
    .groupby('country')
    .agg({'salary': 'mean', 'id': 'count'})
    .sort_values('salary', ascending=False)
    .head(10)
)
```

**UI Definition**:
```swift
// SwiftUI DSL
struct ContentView: View {
    var body: some View {
        VStack {
            Text("Hello, World!")
                .font(.largeTitle)
            Button("Click Me") {
                print("Button clicked")
            }
            .foregroundColor(.blue)
        }
        .padding()
    }
}
```

## When to Build a DSL

Build a DSL when:
- Domain has stable, well-understood concepts
- Many similar tasks need to be performed
- Domain experts aren't programmers (external DSL)
- Improving code clarity is worth the investment
- Domain operations are frequently composed

Don't build a DSL when:
- Domain is still evolving rapidly
- Few users or use cases
- General-purpose language is sufficient
- Maintenance burden outweighs benefits

DSLs are powerful tools for making code more expressive and maintainable in specific domains. The key is choosing the right level of specialization and implementation approach for your needs.
