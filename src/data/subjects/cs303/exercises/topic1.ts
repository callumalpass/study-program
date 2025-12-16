import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  {
    id: 'cs303-ex-1-1',
    subjectId: 'cs303',
    topicId: 'cs303-topic-1',
    title: 'Pure Function Implementation',
    difficulty: 1,
    description: 'Write a pure function that calculates the factorial of a number without side effects.',
    starterCode: `def factorial(n):
    """
    Calculate the factorial of n using pure functional style.
    The function should:
    - Not modify any external state
    - Return the same output for the same input
    - Use recursion or reduce/fold pattern

    Args:
        n: A non-negative integer
    Returns:
        The factorial of n (n!)
    """
    # Your implementation here
    pass`,
    solution: `def factorial(n):
    """
    Calculate the factorial of n using pure functional style.
    """
    if n <= 1:
        return 1
    return n * factorial(n - 1)`,
    testCases: [
      { input: '0', isHidden: false, description: 'Test case' },
      { input: '1', isHidden: false, description: 'Test case' },
      { input: '5', isHidden: false, description: 'Test case' },
      { input: '10', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'A pure function always returns the same output for the same input',
      'Use recursion: factorial(n) = n * factorial(n-1)',
      'Base case: factorial(0) = factorial(1) = 1'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-1-2',
    subjectId: 'cs303',
    topicId: 'cs303-topic-1',
    title: 'Imperative to Functional Conversion',
    difficulty: 1,
    description: 'Convert an imperative loop-based sum function to a functional style using reduce.',
    starterCode: `from functools import reduce

# Original imperative version (for reference):
# def sum_squares_imperative(numbers):
#     total = 0
#     for n in numbers:
#         total += n * n
#     return total

def sum_squares(numbers):
    """
    Calculate the sum of squares using functional programming.
    Use map/reduce or list comprehension instead of explicit loops.

    Args:
        numbers: A list of integers
    Returns:
        The sum of squares of all numbers
    """
    # Your implementation here
    pass`,
    solution: `from functools import reduce

def sum_squares(numbers):
    """
    Calculate the sum of squares using functional programming.
    """
    return reduce(lambda acc, x: acc + x * x, numbers, 0)`,
    testCases: [
      { input: '[]', isHidden: false, description: 'Test case' },
      { input: '[1, 2, 3]', isHidden: false, description: 'Test case' },
      { input: '[4, 5]', isHidden: false, description: 'Test case' },
      { input: '[1, 1, 1, 1]', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Use reduce from functools to combine elements',
      'The lambda takes an accumulator and current element',
      'Start with initial value 0'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-1-3',
    subjectId: 'cs303',
    topicId: 'cs303-topic-1',
    title: 'Higher-Order Function Implementation',
    difficulty: 1,
    description: 'Implement a higher-order function that composes two functions together.',
    starterCode: `def compose(f, g):
    """
    Return a new function that applies g first, then f.
    compose(f, g)(x) should equal f(g(x))

    Args:
        f: A function
        g: A function
    Returns:
        A new function that is the composition of f and g
    """
    # Your implementation here
    pass`,
    solution: `def compose(f, g):
    """
    Return a new function that applies g first, then f.
    """
    return lambda x: f(g(x))`,
    testCases: [
      { input: 'compose(lambda x: x + 1, lambda x: x * 2)(3)', isHidden: false, description: 'Test case' },
      { input: 'compose(str, abs)(-5)', isHidden: false, description: 'Test case' },
      { input: 'compose(lambda x: x ** 2, lambda x: x + 1)(2)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'A higher-order function returns a function',
      'The returned function should take an argument x',
      'Apply g(x) first, then f to the result'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-1-4',
    subjectId: 'cs303',
    topicId: 'cs303-topic-1',
    title: 'Object-Oriented Counter',
    difficulty: 1,
    description: 'Implement a Counter class demonstrating encapsulation with private state.',
    starterCode: `class Counter:
    """
    A counter class that encapsulates its state.
    The internal count should not be directly accessible.
    """

    def __init__(self, initial=0):
        """Initialize the counter with an optional starting value."""
        # Your implementation here
        pass

    def increment(self):
        """Increase the count by 1 and return new value."""
        pass

    def decrement(self):
        """Decrease the count by 1 and return new value."""
        pass

    def get_value(self):
        """Return the current count."""
        pass`,
    solution: `class Counter:
    """
    A counter class that encapsulates its state.
    """

    def __init__(self, initial=0):
        self._count = initial

    def increment(self):
        self._count += 1
        return self._count

    def decrement(self):
        self._count -= 1
        return self._count

    def get_value(self):
        return self._count`,
    testCases: [
      { input: 'c = Counter(); c.increment(); c.get_value()', isHidden: false, description: 'Test case' },
      { input: 'c = Counter(10); c.decrement(); c.get_value()', isHidden: false, description: 'Test case' },
      { input: 'c = Counter(); [c.increment() for _ in range(5)]; c.get_value()', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Use underscore prefix for private attributes (_count)',
      'Each method should modify or return the internal state',
      'Encapsulation hides implementation details'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-1-5',
    subjectId: 'cs303',
    topicId: 'cs303-topic-1',
    title: 'Polymorphism with Duck Typing',
    difficulty: 3,
    description: 'Implement multiple classes that share a common interface through duck typing.',
    starterCode: `class Rectangle:
    """A rectangle shape."""
    def __init__(self, width, height):
        # Your implementation here
        pass

    def area(self):
        """Return the area of the rectangle."""
        pass

    def perimeter(self):
        """Return the perimeter of the rectangle."""
        pass

class Circle:
    """A circle shape."""
    import math

    def __init__(self, radius):
        # Your implementation here
        pass

    def area(self):
        """Return the area of the circle."""
        pass

    def perimeter(self):
        """Return the circumference of the circle."""
        pass

def total_area(shapes):
    """
    Calculate total area of all shapes.
    Uses duck typing - any object with an area() method works.
    """
    # Your implementation here
    pass`,
    solution: `import math

class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * self.radius ** 2

    def perimeter(self):
        return 2 * math.pi * self.radius

def total_area(shapes):
    return sum(shape.area() for shape in shapes)`,
    testCases: [
      { input: 'Rectangle(3, 4).area()', isHidden: false, description: 'Test case' },
      { input: 'round(Circle(1).area(), 5)', isHidden: false, description: 'Test case' },
      { input: 'total_area([Rectangle(2, 3), Rectangle(4, 5)])', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Duck typing: if it has area(), it can be used as a shape',
      'Circle area = π * r²',
      'Use sum() with a generator expression for total_area'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-1-6',
    subjectId: 'cs303',
    topicId: 'cs303-topic-1',
    title: 'Inheritance Hierarchy',
    difficulty: 3,
    description: 'Create a class hierarchy demonstrating inheritance and method overriding.',
    starterCode: `class Animal:
    """Base class for all animals."""

    def __init__(self, name):
        # Your implementation here
        pass

    def speak(self):
        """Return the sound the animal makes."""
        raise NotImplementedError("Subclass must implement")

    def describe(self):
        """Return a description including the animal's sound."""
        pass

class Dog(Animal):
    """A dog that barks."""

    def speak(self):
        pass

class Cat(Animal):
    """A cat that meows."""

    def speak(self):
        pass

class Cow(Animal):
    """A cow that moos."""

    def speak(self):
        pass`,
    solution: `class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        raise NotImplementedError("Subclass must implement")

    def describe(self):
        return f"{self.name} says {self.speak()}"

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

class Cow(Animal):
    def speak(self):
        return "Moo!"`,
    testCases: [
      { input: 'Dog("Rex").speak()', isHidden: false, description: 'Test case' },
      { input: 'Cat("Whiskers").describe()', isHidden: false, description: 'Test case' },
      { input: 'Cow("Bessie").speak()', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Store name in self.name in __init__',
      'Override speak() in each subclass',
      'describe() can call self.speak()'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-1-7',
    subjectId: 'cs303',
    topicId: 'cs303-topic-1',
    title: 'Closure and State',
    difficulty: 3,
    description: 'Implement a function that returns a closure maintaining internal state.',
    starterCode: `def make_accumulator(initial=0):
    """
    Return a function that accumulates values.
    Each call adds to the running total.

    Example:
        acc = make_accumulator(10)
        acc(5)  # returns 15
        acc(3)  # returns 18

    Args:
        initial: Starting value for the accumulator
    Returns:
        A function that takes a value and returns the new total
    """
    # Your implementation here
    pass`,
    solution: `def make_accumulator(initial=0):
    """
    Return a function that accumulates values.
    """
    total = initial

    def accumulate(value):
        nonlocal total
        total += value
        return total

    return accumulate`,
    testCases: [
      { input: 'acc = make_accumulator(); acc(5)', isHidden: false, description: 'Test case' },
      { input: 'acc = make_accumulator(10); acc(5); acc(3)', isHidden: false, description: 'Test case' },
      { input: 'acc = make_accumulator(); acc(1); acc(2); acc(3)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Use nonlocal to modify the outer variable',
      'The inner function closes over the total variable',
      'Each call to the returned function updates and returns total'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-1-8',
    subjectId: 'cs303',
    topicId: 'cs303-topic-1',
    title: 'Declarative List Processing',
    difficulty: 3,
    description: 'Process a list of dictionaries using declarative style with filter, map, and sorted.',
    starterCode: `def process_people(people):
    """
    Process a list of people dictionaries.
    1. Filter to only adults (age >= 18)
    2. Extract just their names
    3. Sort alphabetically
    4. Return as a list

    Args:
        people: List of dicts with 'name' and 'age' keys
    Returns:
        Sorted list of adult names

    Example:
        people = [
            {'name': 'Alice', 'age': 25},
            {'name': 'Bob', 'age': 17},
            {'name': 'Charlie', 'age': 30}
        ]
        # Returns ['Alice', 'Charlie']
    """
    # Your implementation here (use filter, map, sorted)
    pass`,
    solution: `def process_people(people):
    """
    Process a list of people dictionaries.
    """
    adults = filter(lambda p: p['age'] >= 18, people)
    names = map(lambda p: p['name'], adults)
    return sorted(names)`,
    testCases: [
      { input: "process_people([{'name': 'Alice', 'age': 25}, {'name': 'Bob', 'age': 17}])", isHidden: false, description: 'Test case' },
      { input: "process_people([{'name': 'Zoe', 'age': 20}, {'name': 'Amy', 'age': 22}])", isHidden: false, description: 'Test case' },
      { input: "process_people([])", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'filter(predicate, iterable) keeps elements where predicate is True',
      'map(function, iterable) transforms each element',
      'sorted() returns a new sorted list'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-1-9',
    subjectId: 'cs303',
    topicId: 'cs303-topic-1',
    title: 'Curried Function',
    difficulty: 3,
    description: 'Implement a curried version of a multi-argument function.',
    starterCode: `def curry_add():
    """
    Return a curried addition function.
    Instead of add(a, b, c), use curry_add()(a)(b)(c)

    Example:
        add_curried = curry_add()
        add_curried(1)(2)(3)  # returns 6

        add_five = curry_add()(5)
        add_five(3)(2)  # returns 10

    Returns:
        A curried function that adds three numbers
    """
    # Your implementation here
    pass`,
    solution: `def curry_add():
    """
    Return a curried addition function.
    """
    def add_first(a):
        def add_second(b):
            def add_third(c):
                return a + b + c
            return add_third
        return add_second
    return add_first`,
    testCases: [
      { input: 'curry_add()(1)(2)(3)', isHidden: false, description: 'Test case' },
      { input: 'curry_add()(10)(20)(30)', isHidden: false, description: 'Test case' },
      { input: 'add_five = curry_add()(5); add_five(3)(2)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Currying transforms f(a,b,c) into f(a)(b)(c)',
      'Each call returns a function waiting for the next argument',
      'The innermost function computes the final result'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-1-10',
    subjectId: 'cs303',
    topicId: 'cs303-topic-1',
    title: 'Strategy Pattern',
    difficulty: 3,
    description: 'Implement the Strategy pattern using first-class functions.',
    starterCode: `def process_data(data, strategy):
    """
    Process data using the provided strategy function.

    Args:
        data: A list of numbers
        strategy: A function that takes a list and returns a value
    Returns:
        Result of applying strategy to data
    """
    # Your implementation here
    pass

def sum_strategy(data):
    """Strategy: return sum of data."""
    pass

def max_strategy(data):
    """Strategy: return maximum of data."""
    pass

def mean_strategy(data):
    """Strategy: return arithmetic mean of data."""
    pass`,
    solution: `def process_data(data, strategy):
    """
    Process data using the provided strategy function.
    """
    return strategy(data)

def sum_strategy(data):
    return sum(data)

def max_strategy(data):
    return max(data) if data else None

def mean_strategy(data):
    return sum(data) / len(data) if data else 0`,
    testCases: [
      { input: 'process_data([1, 2, 3, 4, 5], sum_strategy)', isHidden: false, description: 'Test case' },
      { input: 'process_data([1, 5, 3, 9, 2], max_strategy)', isHidden: false, description: 'Test case' },
      { input: 'process_data([2, 4, 6, 8], mean_strategy)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Functions are first-class citizens in Python',
      'Pass the strategy function as an argument',
      'Call the strategy with the data'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-1-11',
    subjectId: 'cs303',
    topicId: 'cs303-topic-1',
    title: 'Immutable Data Transformation',
    difficulty: 5,
    description: 'Implement functions that transform data structures immutably.',
    starterCode: `def update_nested(data, path, value):
    """
    Return a new dictionary with a nested value updated.
    Does not modify the original dictionary.

    Args:
        data: A nested dictionary
        path: List of keys to traverse
        value: New value to set
    Returns:
        A new dictionary with the value updated

    Example:
        data = {'a': {'b': {'c': 1}}}
        update_nested(data, ['a', 'b', 'c'], 2)
        # Returns {'a': {'b': {'c': 2}}}
        # Original data unchanged
    """
    # Your implementation here
    pass`,
    solution: `def update_nested(data, path, value):
    """
    Return a new dictionary with a nested value updated.
    """
    if not path:
        return value

    key = path[0]
    rest = path[1:]

    new_data = dict(data)
    new_data[key] = update_nested(data.get(key, {}), rest, value)
    return new_data`,
    testCases: [
      { input: "update_nested({'a': 1}, ['a'], 2)", isHidden: false, description: 'Test case' },
      { input: "update_nested({'a': {'b': 1}}, ['a', 'b'], 5)", isHidden: false, description: 'Test case' },
      { input: "d = {'x': 1}; update_nested(d, ['x'], 2); d['x']", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Create copies at each level, do not modify in place',
      'Use recursion to handle nested structures',
      'dict(data) creates a shallow copy'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-1-12',
    subjectId: 'cs303',
    topicId: 'cs303-topic-1',
    title: 'Abstract Base Class',
    difficulty: 5,
    description: 'Create an abstract base class enforcing interface implementation.',
    starterCode: `from abc import ABC, abstractmethod

class Serializable(ABC):
    """Abstract base class for serializable objects."""

    @abstractmethod
    def to_json(self):
        """Convert object to JSON-compatible dict."""
        pass

    @abstractmethod
    def from_json(cls, data):
        """Create object from JSON-compatible dict."""
        pass

class Person(Serializable):
    """A person that can be serialized."""

    def __init__(self, name, age):
        # Your implementation here
        pass

    def to_json(self):
        # Your implementation here
        pass

    @classmethod
    def from_json(cls, data):
        # Your implementation here
        pass`,
    solution: `from abc import ABC, abstractmethod

class Serializable(ABC):
    @abstractmethod
    def to_json(self):
        pass

    @classmethod
    @abstractmethod
    def from_json(cls, data):
        pass

class Person(Serializable):
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def to_json(self):
        return {'name': self.name, 'age': self.age}

    @classmethod
    def from_json(cls, data):
        return cls(data['name'], data['age'])`,
    testCases: [
      { input: "Person('Alice', 30).to_json()", isHidden: false, description: 'Test case' },
      { input: "Person.from_json({'name': 'Bob', 'age': 25}).name", isHidden: false, description: 'Test case' },
      { input: "p = Person('Eve', 20); Person.from_json(p.to_json()).age", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Use @abstractmethod decorator for abstract methods',
      '@classmethod receives the class as first argument',
      'from_json should return a new instance of the class'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-1-13',
    subjectId: 'cs303',
    topicId: 'cs303-topic-1',
    title: 'Monad-like Pipeline',
    difficulty: 5,
    description: 'Implement a Maybe-like container for safe chained operations.',
    starterCode: `class Maybe:
    """
    A container that handles None values gracefully.
    Allows chaining operations without explicit None checks.
    """

    def __init__(self, value):
        # Your implementation here
        pass

    def map(self, func):
        """
        Apply func to the value if it exists.
        Return Maybe(None) if value is None.
        """
        pass

    def flat_map(self, func):
        """
        Apply func (which returns a Maybe) and flatten.
        """
        pass

    def get_or_default(self, default):
        """Return value if it exists, otherwise default."""
        pass`,
    solution: `class Maybe:
    def __init__(self, value):
        self._value = value

    def map(self, func):
        if self._value is None:
            return Maybe(None)
        return Maybe(func(self._value))

    def flat_map(self, func):
        if self._value is None:
            return Maybe(None)
        return func(self._value)

    def get_or_default(self, default):
        return self._value if self._value is not None else default`,
    testCases: [
      { input: 'Maybe(5).map(lambda x: x * 2).get_or_default(0)', isHidden: false, description: 'Test case' },
      { input: 'Maybe(None).map(lambda x: x * 2).get_or_default(0)', isHidden: false, description: 'Test case' },
      { input: "Maybe('hello').map(str.upper).get_or_default('')", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Check if value is None before applying operations',
      'map wraps result in a new Maybe',
      'flat_map expects func to return a Maybe'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-1-14',
    subjectId: 'cs303',
    topicId: 'cs303-topic-1',
    title: 'Visitor Pattern',
    difficulty: 5,
    description: 'Implement the Visitor pattern for processing heterogeneous data structures.',
    starterCode: `class Expression:
    """Base class for expressions."""
    def accept(self, visitor):
        raise NotImplementedError

class Number(Expression):
    def __init__(self, value):
        self.value = value

    def accept(self, visitor):
        # Your implementation here
        pass

class BinaryOp(Expression):
    def __init__(self, left, op, right):
        self.left = left
        self.op = op
        self.right = right

    def accept(self, visitor):
        # Your implementation here
        pass

class EvalVisitor:
    """Visitor that evaluates expressions."""

    def visit_number(self, node):
        pass

    def visit_binary_op(self, node):
        pass

class PrintVisitor:
    """Visitor that creates string representation."""

    def visit_number(self, node):
        pass

    def visit_binary_op(self, node):
        pass`,
    solution: `class Expression:
    def accept(self, visitor):
        raise NotImplementedError

class Number(Expression):
    def __init__(self, value):
        self.value = value

    def accept(self, visitor):
        return visitor.visit_number(self)

class BinaryOp(Expression):
    def __init__(self, left, op, right):
        self.left = left
        self.op = op
        self.right = right

    def accept(self, visitor):
        return visitor.visit_binary_op(self)

class EvalVisitor:
    def visit_number(self, node):
        return node.value

    def visit_binary_op(self, node):
        left = node.left.accept(self)
        right = node.right.accept(self)
        ops = {'+': lambda a, b: a + b, '-': lambda a, b: a - b,
               '*': lambda a, b: a * b, '/': lambda a, b: a / b}
        return ops[node.op](left, right)

class PrintVisitor:
    def visit_number(self, node):
        return str(node.value)

    def visit_binary_op(self, node):
        left = node.left.accept(self)
        right = node.right.accept(self)
        return f"({left} {node.op} {right})"`,
    testCases: [
      { input: 'Number(5).accept(EvalVisitor())', isHidden: false, description: 'Test case' },
      { input: 'BinaryOp(Number(3), "+", Number(4)).accept(EvalVisitor())', isHidden: false, description: 'Test case' },
      { input: 'BinaryOp(Number(2), "*", Number(3)).accept(PrintVisitor())', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'accept() calls the appropriate visitor method',
      'Visitor methods process the node and return a result',
      'For BinaryOp, recursively visit children'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-1-15',
    subjectId: 'cs303',
    topicId: 'cs303-topic-1',
    title: 'Lazy Evaluation',
    difficulty: 5,
    description: 'Implement a lazy sequence that computes values on demand.',
    starterCode: `class LazySequence:
    """
    A lazy sequence that generates values on demand.
    Values are computed only when accessed.
    """

    def __init__(self, generator_func):
        """
        Initialize with a generator function.
        generator_func takes an index and returns the value at that index.
        """
        # Your implementation here
        pass

    def __getitem__(self, index):
        """Get item at index, computing if necessary."""
        pass

    def take(self, n):
        """Return first n elements as a list."""
        pass

    def map(self, func):
        """Return a new lazy sequence with func applied."""
        pass

def naturals():
    """Return lazy sequence of natural numbers 0, 1, 2, ..."""
    pass

def fibonacci():
    """Return lazy sequence of Fibonacci numbers."""
    pass`,
    solution: `class LazySequence:
    def __init__(self, generator_func):
        self._generator = generator_func
        self._cache = {}

    def __getitem__(self, index):
        if index not in self._cache:
            self._cache[index] = self._generator(index)
        return self._cache[index]

    def take(self, n):
        return [self[i] for i in range(n)]

    def map(self, func):
        return LazySequence(lambda i: func(self[i]))

def naturals():
    return LazySequence(lambda i: i)

def fibonacci():
    def fib(n):
        if n <= 1:
            return n
        a, b = 0, 1
        for _ in range(n - 1):
            a, b = b, a + b
        return b
    return LazySequence(fib)`,
    testCases: [
      { input: 'naturals().take(5)', isHidden: false, description: 'Test case' },
      { input: 'fibonacci().take(8)', isHidden: false, description: 'Test case' },
      { input: 'naturals().map(lambda x: x ** 2).take(4)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Store generator function, compute values lazily',
      'Cache computed values to avoid recomputation',
      'map returns a new LazySequence with transformed generator'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-1-16',
    subjectId: 'cs303',
    topicId: 'cs303-topic-1',
    title: 'Multi-Paradigm Calculator',
    difficulty: 5,
    description: 'Build a calculator demonstrating multiple programming paradigms.',
    starterCode: `# Functional approach: operations as functions
def make_calculator():
    """
    Create a calculator using functional programming.
    Returns a dict of operation functions.
    """
    pass

# OOP approach: calculator as object
class Calculator:
    """
    Calculator using object-oriented programming.
    Maintains history of operations.
    """

    def __init__(self):
        pass

    def calculate(self, a, op, b):
        """Perform operation and store in history."""
        pass

    def get_history(self):
        """Return list of past calculations."""
        pass

# Declarative approach: expression evaluation
def evaluate_expression(expr):
    """
    Evaluate a simple arithmetic expression string.
    Supports +, -, *, / with two operands.
    Example: "3 + 4" -> 7
    """
    pass`,
    solution: `# Functional approach
def make_calculator():
    return {
        '+': lambda a, b: a + b,
        '-': lambda a, b: a - b,
        '*': lambda a, b: a * b,
        '/': lambda a, b: a / b if b != 0 else float('inf')
    }

# OOP approach
class Calculator:
    def __init__(self):
        self._history = []
        self._ops = make_calculator()

    def calculate(self, a, op, b):
        result = self._ops[op](a, b)
        self._history.append(f"{a} {op} {b} = {result}")
        return result

    def get_history(self):
        return self._history.copy()

# Declarative approach
def evaluate_expression(expr):
    parts = expr.split()
    a, op, b = float(parts[0]), parts[1], float(parts[2])
    ops = make_calculator()
    return ops[op](a, b)`,
    testCases: [
      { input: "make_calculator()['+' ](3, 4)", isHidden: false, description: 'Test case' },
      { input: 'c = Calculator(); c.calculate(10, "-", 4)', isHidden: false, description: 'Test case' },
      { input: 'evaluate_expression("6 * 7")', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Functional: store operations as lambda functions in a dict',
      'OOP: maintain history list, use operation dict internally',
      'Declarative: parse string and dispatch to appropriate operation'
    ],
    language: 'python'
  }
];
