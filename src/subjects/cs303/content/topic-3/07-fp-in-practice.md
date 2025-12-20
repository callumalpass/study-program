# Functional Programming in Practice

Functional programming principles have moved from academic languages into mainstream software development. Understanding how to apply FP concepts effectively in real-world projects—and when to use alternative approaches—is essential for modern developers.

## FP in Mainstream Languages

### JavaScript

JavaScript has embraced functional features, especially with ES6+:

```javascript
// First-class functions and closures
const multiplier = factor => value => value * factor;
const double = multiplier(2);
double(5);  // 10

// Array methods for functional processing
const users = [
  { name: 'Alice', age: 30, active: true },
  { name: 'Bob', age: 25, active: false },
  { name: 'Carol', age: 35, active: true }
];

const activeNames = users
  .filter(u => u.active)
  .map(u => u.name)
  .sort();
// ['Alice', 'Carol']

// Immutability with spread operators
const original = { a: 1, b: 2 };
const updated = { ...original, b: 3 };  // { a: 1, b: 3 }

const arr = [1, 2, 3];
const extended = [...arr, 4, 5];  // [1, 2, 3, 4, 5]
```

### Python

Python supports functional programming alongside other paradigms:

```python
from functools import reduce, partial
from itertools import islice, takewhile

# Higher-order functions
def compose(*functions):
    def composed(x):
        for f in reversed(functions):
            x = f(x)
        return x
    return composed

# Functional processing
numbers = range(1, 11)
evens = filter(lambda x: x % 2 == 0, numbers)
squared = map(lambda x: x ** 2, evens)
total = reduce(lambda acc, x: acc + x, squared, 0)

# List comprehensions (Pythonic functional style)
total = sum(x**2 for x in range(1, 11) if x % 2 == 0)

# Immutable data with dataclasses
from dataclasses import dataclass, replace

@dataclass(frozen=True)
class Point:
    x: float
    y: float

p1 = Point(1, 2)
p2 = replace(p1, x=10)  # Point(10, 2)
```

### Java

Java added functional features in Java 8:

```java
// Lambdas and streams
List<String> names = users.stream()
    .filter(u -> u.isActive())
    .map(User::getName)
    .sorted()
    .collect(Collectors.toList());

// Optional for null safety
Optional<User> user = findUserById(id);
String name = user
    .map(User::getName)
    .orElse("Anonymous");

// Method references
list.forEach(System.out::println);

// Immutable collections (Java 9+)
List<Integer> numbers = List.of(1, 2, 3);  // Immutable
```

### Rust

Rust combines FP with systems programming:

```rust
// Iterator methods (lazy evaluation)
let result: Vec<i32> = (1..=100)
    .filter(|x| x % 2 == 0)
    .map(|x| x * x)
    .take(5)
    .collect();
// [4, 16, 36, 64, 100]

// Option and Result for error handling
fn divide(a: f64, b: f64) -> Option<f64> {
    if b == 0.0 { None } else { Some(a / b) }
}

let result = divide(10.0, 2.0)
    .map(|x| x + 1.0)
    .unwrap_or(0.0);

// Pattern matching
match value {
    Some(x) if x > 0 => println!("Positive: {}", x),
    Some(x) => println!("Non-positive: {}", x),
    None => println!("No value"),
}

// Closures capture environment
let threshold = 5;
let above: Vec<_> = numbers.into_iter()
    .filter(|x| *x > threshold)
    .collect();
```

## Functional Architecture Patterns

### Functional Core, Imperative Shell

Separate pure business logic from I/O:

```python
# Pure functional core
def calculate_discount(order, rules):
    """Pure function: same input always gives same output"""
    applicable_rules = [r for r in rules if r.applies(order)]
    discounts = [r.calculate(order) for r in applicable_rules]
    return max(discounts, default=0)

def process_order(order, rules):
    """Pure function: computes new state"""
    discount = calculate_discount(order, rules)
    return {
        **order,
        'discount': discount,
        'total': order['subtotal'] - discount
    }

# Imperative shell
def handle_order_request(order_id):
    """Impure: does I/O"""
    order = database.get_order(order_id)      # I/O
    rules = database.get_discount_rules()     # I/O
    processed = process_order(order, rules)   # Pure
    database.save_order(processed)            # I/O
    email.send_confirmation(processed)        # I/O
    return processed
```

### Event Sourcing

Store events rather than state:

```javascript
// Events are immutable facts
const events = [
  { type: 'USER_CREATED', data: { id: 1, name: 'Alice' }, timestamp: t1 },
  { type: 'EMAIL_CHANGED', data: { id: 1, email: 'alice@new.com' }, timestamp: t2 },
  { type: 'USER_DEACTIVATED', data: { id: 1 }, timestamp: t3 }
];

// Reconstruct state by folding events
function applyEvent(state, event) {
  switch (event.type) {
    case 'USER_CREATED':
      return { ...state, [event.data.id]: { ...event.data, active: true } };
    case 'EMAIL_CHANGED':
      return { ...state, [event.data.id]: { ...state[event.data.id], email: event.data.email } };
    case 'USER_DEACTIVATED':
      return { ...state, [event.data.id]: { ...state[event.data.id], active: false } };
    default:
      return state;
  }
}

const currentState = events.reduce(applyEvent, {});
```

### Redux Pattern

State management using reducers:

```javascript
// State is immutable
const initialState = { count: 0, history: [] };

// Reducer is a pure function
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
        history: [...state.history, 'increment']
      };
    case 'DECREMENT':
      return {
        count: state.count - 1,
        history: [...state.history, 'decrement']
      };
    default:
      return state;
  }
}

// Actions describe what happened
const actions = [
  { type: 'INCREMENT' },
  { type: 'INCREMENT' },
  { type: 'DECREMENT' }
];

const finalState = actions.reduce(counterReducer, initialState);
// { count: 1, history: ['increment', 'increment', 'decrement'] }
```

## Testing Functional Code

Pure functions are trivially testable:

```python
# Property-based testing
from hypothesis import given, strategies as st

@given(st.lists(st.integers()))
def test_sort_idempotent(xs):
    """Sorting twice equals sorting once"""
    assert sorted(sorted(xs)) == sorted(xs)

@given(st.lists(st.integers()))
def test_sort_preserves_length(xs):
    """Sorting preserves length"""
    assert len(sorted(xs)) == len(xs)

@given(st.lists(st.integers()))
def test_sort_ordered(xs):
    """Result is ordered"""
    result = sorted(xs)
    for i in range(len(result) - 1):
        assert result[i] <= result[i + 1]

# Simple unit tests - no mocking needed
def test_calculate_discount():
    order = {'subtotal': 100, 'items': 5}
    rules = [FlatDiscount(10), PercentDiscount(5)]
    assert calculate_discount(order, rules) == 10
```

## Performance Considerations

### Structural Sharing

Efficient immutable updates:

```javascript
// Immer.js: efficient immutable updates
import produce from 'immer';

const newState = produce(state, draft => {
    draft.users[0].name = 'New Name';  // Looks like mutation
});
// Only the changed path is copied; rest is shared

// Immutable.js: persistent data structures
import { Map, List } from 'immutable';

const map1 = Map({ a: 1, b: 2 });
const map2 = map1.set('b', 3);
// map1 and map2 share structure where possible
```

### Lazy Evaluation

Process data without building intermediate collections:

```rust
// Rust: lazy iterator chain
let sum: i32 = (1..1_000_000)
    .filter(|x| x % 2 == 0)
    .map(|x| x * 2)
    .take(100)
    .sum();
// Only processes first 100 even numbers
```

### Memoization

Cache expensive computations:

```python
from functools import lru_cache

@lru_cache(maxsize=1000)
def expensive_computation(n):
    # Complex calculation
    return result

# Python 3.9+: cache decorator (unlimited)
from functools import cache

@cache
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
```

## When Not to Use FP

Functional programming isn't always the best choice:

### Stateful Algorithms

```python
# Graph algorithms often need mutable state
def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    visited = set()

    while len(visited) < len(graph):
        # Mutation is natural here
        current = min(
            (d, n) for n, d in distances.items() if n not in visited
        )[1]
        visited.add(current)
        # Update neighbors
        for neighbor, weight in graph[current]:
            distances[neighbor] = min(
                distances[neighbor],
                distances[current] + weight
            )
    return distances
```

### Performance-Critical Inner Loops

```rust
// Mutation in hot path
fn sum_array(arr: &[i32]) -> i32 {
    let mut total = 0;
    for x in arr {
        total += x;  // Mutation is faster here
    }
    total
}
```

### Simple Scripts

Over-engineering with FP patterns can hurt readability:

```python
# Over-engineered
result = reduce(
    lambda acc, x: acc + x,
    filter(
        lambda x: x > 0,
        map(lambda x: x * 2, numbers)
    ),
    0
)

# Simple and clear
result = 0
for x in numbers:
    if x > 0:
        result += x * 2
```

## Key Takeaways

- FP concepts are available in all major languages
- Use immutable data by default; mutate only when necessary
- Separate pure logic from I/O (functional core, imperative shell)
- Pure functions enable easy testing and reasoning
- Structural sharing makes immutability efficient
- Lazy evaluation avoids unnecessary computation
- Know when FP adds value vs. when it adds complexity
- Combine FP with other paradigms as appropriate

Functional programming is not all-or-nothing. The key is recognizing when FP patterns make code clearer and more reliable, and when simpler approaches suffice. Start by making functions pure where possible, use immutable data structures, and reach for higher-order functions when they improve clarity.
