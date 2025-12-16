import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  {
    id: 'cs303-ex-3-1',
    subjectId: 'cs303',
    topicId: 'cs303-topic-3',
    title: 'Map Implementation',
    difficulty: 1,
    description: 'Implement the map higher-order function from scratch.',
    starterCode: `def my_map(func, iterable):
    """
    Apply func to each element of iterable.
    Return a list of results.

    Args:
        func: A function to apply
        iterable: An iterable of elements
    Returns:
        List of transformed elements
    """
    # Your implementation here (no using built-in map)
    pass`,
    solution: `def my_map(func, iterable):
    result = []
    for item in iterable:
        result.append(func(item))
    return result`,
    testCases: [
      { input: 'my_map(lambda x: x * 2, [1, 2, 3])', isHidden: false, description: 'Test case' },
      { input: 'my_map(str.upper, ["a", "b"])', isHidden: false, description: 'Test case' },
      { input: 'my_map(lambda x: x, [])', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Iterate through each element',
      'Apply the function to each element',
      'Collect results in a list'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-3-2',
    subjectId: 'cs303',
    topicId: 'cs303-topic-3',
    title: 'Filter Implementation',
    difficulty: 1,
    description: 'Implement the filter higher-order function from scratch.',
    starterCode: `def my_filter(predicate, iterable):
    """
    Keep only elements where predicate returns True.

    Args:
        predicate: A function returning bool
        iterable: An iterable of elements
    Returns:
        List of elements satisfying predicate
    """
    # Your implementation here
    pass`,
    solution: `def my_filter(predicate, iterable):
    result = []
    for item in iterable:
        if predicate(item):
            result.append(item)
    return result`,
    testCases: [
      { input: 'my_filter(lambda x: x > 0, [-1, 0, 1, 2])', isHidden: false, description: 'Test case' },
      { input: 'my_filter(lambda x: x % 2 == 0, [1, 2, 3, 4])', isHidden: false, description: 'Test case' },
      { input: 'my_filter(lambda x: True, [])', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Test each element with the predicate',
      'Only include elements where predicate returns True',
      'Handle empty iterables'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-3-3',
    subjectId: 'cs303',
    topicId: 'cs303-topic-3',
    title: 'Reduce Implementation',
    difficulty: 1,
    description: 'Implement the reduce (fold) higher-order function.',
    starterCode: `def my_reduce(func, iterable, initial=None):
    """
    Reduce iterable to single value by applying func cumulatively.

    Args:
        func: Function taking (accumulator, element) -> new_accumulator
        iterable: An iterable of elements
        initial: Optional initial value
    Returns:
        Final accumulated value
    """
    # Your implementation here
    pass`,
    solution: `def my_reduce(func, iterable, initial=None):
    it = iter(iterable)
    if initial is None:
        try:
            accumulator = next(it)
        except StopIteration:
            raise TypeError("reduce of empty sequence with no initial value")
    else:
        accumulator = initial

    for item in it:
        accumulator = func(accumulator, item)
    return accumulator`,
    testCases: [
      { input: 'my_reduce(lambda a, b: a + b, [1, 2, 3, 4])', isHidden: false, description: 'Test case' },
      { input: 'my_reduce(lambda a, b: a * b, [1, 2, 3, 4], 1)', isHidden: false, description: 'Test case' },
      { input: 'my_reduce(lambda a, b: a + b, [], 0)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Start with initial value (or first element if not provided)',
      'Apply func to accumulator and each element',
      'Handle empty sequences'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-3-4',
    subjectId: 'cs303',
    topicId: 'cs303-topic-3',
    title: 'Function Composition',
    difficulty: 1,
    description: 'Compose multiple functions into a single function.',
    starterCode: `def compose(*funcs):
    """
    Compose multiple functions right-to-left.
    compose(f, g, h)(x) = f(g(h(x)))

    Args:
        *funcs: Variable number of functions
    Returns:
        A single composed function
    """
    # Your implementation here
    pass`,
    solution: `def compose(*funcs):
    def composed(x):
        result = x
        for func in reversed(funcs):
            result = func(result)
        return result
    return composed`,
    testCases: [
      { input: 'compose(lambda x: x + 1, lambda x: x * 2)(3)', isHidden: false, description: 'Test case' },
      { input: 'compose(str, abs, int)("-5")', isHidden: false, description: 'Test case' },
      { input: 'compose()(5)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Apply functions from right to left',
      'Use reversed() to iterate in correct order',
      'Handle empty function list (identity)'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-3-5',
    subjectId: 'cs303',
    topicId: 'cs303-topic-3',
    title: 'Partial Application',
    difficulty: 3,
    description: 'Implement partial function application.',
    starterCode: `def partial(func, *args, **kwargs):
    """
    Return a new function with some arguments pre-filled.

    Args:
        func: The function to partially apply
        *args: Positional arguments to pre-fill
        **kwargs: Keyword arguments to pre-fill
    Returns:
        A new function with fewer required arguments
    """
    # Your implementation here
    pass`,
    solution: `def partial(func, *args, **kwargs):
    def wrapper(*more_args, **more_kwargs):
        all_kwargs = {**kwargs, **more_kwargs}
        return func(*args, *more_args, **all_kwargs)
    return wrapper`,
    testCases: [
      { input: 'partial(pow, 2)(10)', isHidden: false, description: 'Test case' },
      { input: "partial('{} {}'.format, 'Hello')('World')", isHidden: false, description: 'Test case' },
      { input: 'partial(lambda x, y, z: x + y + z, 1, 2)(3)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Store the pre-filled arguments',
      'Return a function that accepts remaining arguments',
      'Combine pre-filled and new arguments'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-3-6',
    subjectId: 'cs303',
    topicId: 'cs303-topic-3',
    title: 'Memoization Decorator',
    difficulty: 3,
    description: 'Implement a memoization decorator for caching function results.',
    starterCode: `def memoize(func):
    """
    Cache function results based on arguments.
    Return cached result for repeated calls with same arguments.

    Args:
        func: The function to memoize
    Returns:
        A memoized version of the function
    """
    # Your implementation here
    pass

@memoize
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)`,
    solution: `def memoize(func):
    cache = {}

    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]

    return wrapper

@memoize
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)`,
    testCases: [
      { input: 'fibonacci(10)', isHidden: false, description: 'Test case' },
      { input: 'fibonacci(20)', isHidden: false, description: 'Test case' },
      { input: 'fibonacci(0)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Use a dictionary to store cached results',
      'Use arguments as cache keys',
      'Check cache before calling function'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-3-7',
    subjectId: 'cs303',
    topicId: 'cs303-topic-3',
    title: 'Recursive List Operations',
    difficulty: 3,
    description: 'Implement list operations using recursion only.',
    starterCode: `def length(lst):
    """Return length of list using recursion."""
    # Your implementation here
    pass

def reverse(lst):
    """Return reversed list using recursion."""
    # Your implementation here
    pass

def flatten(lst):
    """Flatten nested lists using recursion."""
    # Your implementation here
    pass`,
    solution: `def length(lst):
    if not lst:
        return 0
    return 1 + length(lst[1:])

def reverse(lst):
    if not lst:
        return []
    return reverse(lst[1:]) + [lst[0]]

def flatten(lst):
    if not lst:
        return []
    first, rest = lst[0], lst[1:]
    if isinstance(first, list):
        return flatten(first) + flatten(rest)
    return [first] + flatten(rest)`,
    testCases: [
      { input: 'length([1, 2, 3, 4, 5])', isHidden: false, description: 'Test case' },
      { input: 'reverse([1, 2, 3])', isHidden: false, description: 'Test case' },
      { input: 'flatten([1, [2, [3, 4]], 5])', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Base case: empty list',
      'Recursive case: process first element, recurse on rest',
      'For flatten, check if element is a list'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-3-8',
    subjectId: 'cs303',
    topicId: 'cs303-topic-3',
    title: 'Lazy Evaluation with Generators',
    difficulty: 3,
    description: 'Implement lazy operations using Python generators.',
    starterCode: `def lazy_map(func, iterable):
    """Lazy version of map using a generator."""
    # Your implementation here
    pass

def lazy_filter(predicate, iterable):
    """Lazy version of filter using a generator."""
    # Your implementation here
    pass

def take(n, iterable):
    """Take first n elements from an iterable."""
    # Your implementation here
    pass

def infinite_counter(start=0):
    """Generate infinite sequence of integers."""
    # Your implementation here
    pass`,
    solution: `def lazy_map(func, iterable):
    for item in iterable:
        yield func(item)

def lazy_filter(predicate, iterable):
    for item in iterable:
        if predicate(item):
            yield item

def take(n, iterable):
    for i, item in enumerate(iterable):
        if i >= n:
            break
        yield item

def infinite_counter(start=0):
    n = start
    while True:
        yield n
        n += 1`,
    testCases: [
      { input: 'list(lazy_map(lambda x: x*2, [1,2,3]))', isHidden: false, description: 'Test case' },
      { input: 'list(lazy_filter(lambda x: x>0, [-1,0,1,2]))', isHidden: false, description: 'Test case' },
      { input: 'list(take(5, infinite_counter()))', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Use yield to create generators',
      'Generators evaluate lazily on demand',
      'Take should work with infinite sequences'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-3-9',
    subjectId: 'cs303',
    topicId: 'cs303-topic-3',
    title: 'Fold-Based Implementations',
    difficulty: 3,
    description: 'Implement common operations using fold/reduce.',
    starterCode: `from functools import reduce

def sum_fold(numbers):
    """Implement sum using reduce."""
    pass

def product_fold(numbers):
    """Implement product using reduce."""
    pass

def max_fold(numbers):
    """Implement max using reduce."""
    pass

def map_fold(func, lst):
    """Implement map using reduce."""
    pass

def filter_fold(predicate, lst):
    """Implement filter using reduce."""
    pass`,
    solution: `from functools import reduce

def sum_fold(numbers):
    return reduce(lambda acc, x: acc + x, numbers, 0)

def product_fold(numbers):
    return reduce(lambda acc, x: acc * x, numbers, 1)

def max_fold(numbers):
    if not numbers:
        raise ValueError("max of empty sequence")
    return reduce(lambda acc, x: x if x > acc else acc, numbers)

def map_fold(func, lst):
    return reduce(lambda acc, x: acc + [func(x)], lst, [])

def filter_fold(predicate, lst):
    return reduce(lambda acc, x: acc + [x] if predicate(x) else acc, lst, [])`,
    testCases: [
      { input: 'sum_fold([1, 2, 3, 4])', isHidden: false, description: 'Test case' },
      { input: 'product_fold([1, 2, 3, 4])', isHidden: false, description: 'Test case' },
      { input: 'max_fold([3, 1, 4, 1, 5])', isHidden: false, description: 'Test case' },
      { input: 'map_fold(lambda x: x*2, [1, 2, 3])', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'reduce combines elements with an accumulator',
      'Choose appropriate initial values',
      'Build lists by appending to accumulator'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-3-10',
    subjectId: 'cs303',
    topicId: 'cs303-topic-3',
    title: 'Immutable Data Updates',
    difficulty: 3,
    description: 'Work with immutable data structures functionally.',
    starterCode: `from typing import NamedTuple, List

class Person(NamedTuple):
    name: str
    age: int

def update_age(person: Person, new_age: int) -> Person:
    """Return new Person with updated age."""
    pass

def add_year_to_all(people: List[Person]) -> List[Person]:
    """Return new list with everyone aged by 1 year."""
    pass

def get_adults(people: List[Person]) -> List[Person]:
    """Return new list containing only adults (age >= 18)."""
    pass

def average_age(people: List[Person]) -> float:
    """Calculate average age without mutation."""
    pass`,
    solution: `from typing import NamedTuple, List

class Person(NamedTuple):
    name: str
    age: int

def update_age(person: Person, new_age: int) -> Person:
    return Person(person.name, new_age)

def add_year_to_all(people: List[Person]) -> List[Person]:
    return [Person(p.name, p.age + 1) for p in people]

def get_adults(people: List[Person]) -> List[Person]:
    return [p for p in people if p.age >= 18]

def average_age(people: List[Person]) -> float:
    if not people:
        return 0.0
    return sum(p.age for p in people) / len(people)`,
    testCases: [
      { input: "update_age(Person('Alice', 30), 31).age", isHidden: false, description: 'Test case' },
      { input: "add_year_to_all([Person('A', 10), Person('B', 20)])[0].age", isHidden: false, description: 'Test case' },
      { input: "len(get_adults([Person('A', 17), Person('B', 18)]))", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'NamedTuple is immutable by default',
      'Create new instances instead of modifying',
      'Use list comprehensions for transformations'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-3-11',
    subjectId: 'cs303',
    topicId: 'cs303-topic-3',
    title: 'Functor Pattern',
    difficulty: 5,
    description: 'Implement the Functor pattern (mappable containers).',
    starterCode: `from abc import ABC, abstractmethod
from typing import TypeVar, Generic, Callable

A = TypeVar('A')
B = TypeVar('B')

class Functor(ABC, Generic[A]):
    """Abstract base class for functors."""

    @abstractmethod
    def map(self, func: Callable[[A], B]) -> 'Functor[B]':
        """Apply function inside the context."""
        pass

class Maybe(Functor[A]):
    """Maybe functor for optional values."""

    def __init__(self, value: A = None, is_nothing: bool = False):
        pass

    def map(self, func: Callable[[A], B]) -> 'Maybe[B]':
        pass

    def get_or_else(self, default: A) -> A:
        pass

class List(Functor[A]):
    """List as a functor."""

    def __init__(self, values: list):
        pass

    def map(self, func: Callable[[A], B]) -> 'List[B]':
        pass

def Just(value: A) -> Maybe[A]:
    pass

def Nothing() -> Maybe:
    pass`,
    solution: `from abc import ABC, abstractmethod
from typing import TypeVar, Generic, Callable

A = TypeVar('A')
B = TypeVar('B')

class Functor(ABC, Generic[A]):
    @abstractmethod
    def map(self, func: Callable[[A], B]) -> 'Functor[B]':
        pass

class Maybe(Functor[A]):
    def __init__(self, value: A = None, is_nothing: bool = False):
        self._value = value
        self._is_nothing = is_nothing or (value is None and not is_nothing)

    def map(self, func: Callable[[A], B]) -> 'Maybe[B]':
        if self._is_nothing:
            return Maybe(None, is_nothing=True)
        return Maybe(func(self._value))

    def get_or_else(self, default: A) -> A:
        return default if self._is_nothing else self._value

class List(Functor[A]):
    def __init__(self, values: list):
        self._values = values

    def map(self, func: Callable[[A], B]) -> 'List[B]':
        return List([func(x) for x in self._values])

def Just(value: A) -> Maybe[A]:
    return Maybe(value, is_nothing=False)

def Nothing() -> Maybe:
    return Maybe(None, is_nothing=True)`,
    testCases: [
      { input: 'Just(5).map(lambda x: x * 2).get_or_else(0)', isHidden: false, description: 'Test case' },
      { input: 'Nothing().map(lambda x: x * 2).get_or_else(0)', isHidden: false, description: 'Test case' },
      { input: 'List([1,2,3]).map(lambda x: x*2)._values', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Functor provides map to transform contained values',
      'Maybe handles the case of missing values',
      'Map should preserve the container structure'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-3-12',
    subjectId: 'cs303',
    topicId: 'cs303-topic-3',
    title: 'Monad Pattern',
    difficulty: 5,
    description: 'Implement the Monad pattern (flatMappable containers).',
    starterCode: `from typing import TypeVar, Generic, Callable

A = TypeVar('A')
B = TypeVar('B')

class Monad(Generic[A]):
    """Abstract monad with unit and flatMap."""

    @staticmethod
    def unit(value: A) -> 'Monad[A]':
        """Wrap value in monad context."""
        raise NotImplementedError

    def flat_map(self, func: Callable[[A], 'Monad[B]']) -> 'Monad[B]':
        """Apply function and flatten result."""
        raise NotImplementedError

class Result(Monad[A]):
    """Result monad for error handling."""

    def __init__(self, value: A = None, error: str = None):
        pass

    @staticmethod
    def success(value: A) -> 'Result[A]':
        pass

    @staticmethod
    def failure(error: str) -> 'Result':
        pass

    def flat_map(self, func: Callable[[A], 'Result[B]']) -> 'Result[B]':
        pass

    def map(self, func: Callable[[A], B]) -> 'Result[B]':
        """Map for convenience."""
        pass

    def get_or_raise(self) -> A:
        pass`,
    solution: `from typing import TypeVar, Generic, Callable

A = TypeVar('A')
B = TypeVar('B')

class Monad(Generic[A]):
    @staticmethod
    def unit(value: A) -> 'Monad[A]':
        raise NotImplementedError

    def flat_map(self, func: Callable[[A], 'Monad[B]']) -> 'Monad[B]':
        raise NotImplementedError

class Result(Monad[A]):
    def __init__(self, value: A = None, error: str = None):
        self._value = value
        self._error = error

    @staticmethod
    def success(value: A) -> 'Result[A]':
        return Result(value=value)

    @staticmethod
    def failure(error: str) -> 'Result':
        return Result(error=error)

    def flat_map(self, func: Callable[[A], 'Result[B]']) -> 'Result[B]':
        if self._error:
            return Result.failure(self._error)
        return func(self._value)

    def map(self, func: Callable[[A], B]) -> 'Result[B]':
        return self.flat_map(lambda x: Result.success(func(x)))

    def get_or_raise(self) -> A:
        if self._error:
            raise Exception(self._error)
        return self._value`,
    testCases: [
      { input: 'Result.success(5).map(lambda x: x*2).get_or_raise()', isHidden: false, description: 'Test case' },
      { input: "Result.failure('error').map(lambda x: x*2)._error", isHidden: false, description: 'Test case' },
      { input: 'Result.success(5).flat_map(lambda x: Result.success(x+1)).get_or_raise()', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Monad adds flatMap to Functor',
      'flatMap chains operations that return monads',
      'Errors should propagate through the chain'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-3-13',
    subjectId: 'cs303',
    topicId: 'cs303-topic-3',
    title: 'Continuation Passing Style',
    difficulty: 5,
    description: 'Convert functions to continuation passing style (CPS).',
    starterCode: `def factorial_cps(n, continuation):
    """
    Factorial in continuation passing style.
    Instead of returning, pass result to continuation.

    Args:
        n: Number to compute factorial of
        continuation: Function to call with result
    """
    # Your implementation here
    pass

def fibonacci_cps(n, continuation):
    """Fibonacci in CPS."""
    # Your implementation here
    pass

def map_cps(func, lst, continuation):
    """Map in CPS."""
    # Your implementation here
    pass`,
    solution: `def factorial_cps(n, continuation):
    if n <= 1:
        return continuation(1)
    return factorial_cps(n - 1, lambda result: continuation(n * result))

def fibonacci_cps(n, continuation):
    if n <= 1:
        return continuation(n)
    return fibonacci_cps(n - 1, lambda a:
        fibonacci_cps(n - 2, lambda b:
            continuation(a + b)))

def map_cps(func, lst, continuation):
    if not lst:
        return continuation([])
    return map_cps(func, lst[1:], lambda rest:
        continuation([func(lst[0])] + rest))`,
    testCases: [
      { input: 'factorial_cps(5, lambda x: x)', isHidden: false, description: 'Test case' },
      { input: 'fibonacci_cps(10, lambda x: x)', isHidden: false, description: 'Test case' },
      { input: 'map_cps(lambda x: x*2, [1,2,3], lambda x: x)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'CPS passes computation forward via continuations',
      'Base case calls continuation with result',
      'Recursive case wraps continuation with more computation'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-3-14',
    subjectId: 'cs303',
    topicId: 'cs303-topic-3',
    title: 'Trampolined Recursion',
    difficulty: 5,
    description: 'Implement trampolining for stack-safe recursion.',
    starterCode: `class Thunk:
    """Delayed computation for trampolining."""

    def __init__(self, func, *args):
        pass

    def evaluate(self):
        """Execute the delayed computation."""
        pass

def trampoline(thunk_or_value):
    """
    Execute thunks until we get a final value.
    Enables stack-safe recursion.
    """
    # Your implementation here
    pass

def factorial_trampolined(n, acc=1):
    """Stack-safe factorial using trampolining."""
    # Your implementation here
    pass

def sum_list_trampolined(lst, acc=0):
    """Stack-safe list sum using trampolining."""
    # Your implementation here
    pass`,
    solution: `class Thunk:
    def __init__(self, func, *args):
        self.func = func
        self.args = args

    def evaluate(self):
        return self.func(*self.args)

def trampoline(thunk_or_value):
    while isinstance(thunk_or_value, Thunk):
        thunk_or_value = thunk_or_value.evaluate()
    return thunk_or_value

def factorial_trampolined(n, acc=1):
    if n <= 1:
        return acc
    return Thunk(factorial_trampolined, n - 1, acc * n)

def sum_list_trampolined(lst, acc=0):
    if not lst:
        return acc
    return Thunk(sum_list_trampolined, lst[1:], acc + lst[0])`,
    testCases: [
      { input: 'trampoline(factorial_trampolined(10))', isHidden: false, description: 'Test case' },
      { input: 'trampoline(sum_list_trampolined([1,2,3,4,5]))', isHidden: false, description: 'Test case' },
      { input: 'trampoline(factorial_trampolined(100)) > 0', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Thunk wraps a delayed function call',
      'Trampoline loops until non-Thunk value',
      'Return Thunk instead of recursive call'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-3-15',
    subjectId: 'cs303',
    topicId: 'cs303-topic-3',
    title: 'Algebraic Data Types',
    difficulty: 5,
    description: 'Implement algebraic data types and pattern matching.',
    starterCode: `from typing import TypeVar, Generic, Callable, Union

A = TypeVar('A')

class List:
    """Algebraic list: either Nil or Cons(head, tail)."""
    pass

class Nil(List):
    """Empty list constructor."""
    pass

class Cons(List):
    """Non-empty list: head element and tail list."""

    def __init__(self, head, tail: List):
        pass

def match_list(lst: List, nil_case: Callable, cons_case: Callable):
    """Pattern match on list structure."""
    # Your implementation here
    pass

def list_length(lst: List) -> int:
    """Calculate length using pattern matching."""
    # Your implementation here
    pass

def list_map(func: Callable, lst: List) -> List:
    """Map function over list using pattern matching."""
    # Your implementation here
    pass

def to_python_list(lst: List) -> list:
    """Convert algebraic list to Python list."""
    # Your implementation here
    pass

def from_python_list(py_list: list) -> List:
    """Convert Python list to algebraic list."""
    # Your implementation here
    pass`,
    solution: `from typing import TypeVar, Callable

class List:
    pass

class Nil(List):
    pass

class Cons(List):
    def __init__(self, head, tail: List):
        self.head = head
        self.tail = tail

def match_list(lst: List, nil_case: Callable, cons_case: Callable):
    if isinstance(lst, Nil):
        return nil_case()
    elif isinstance(lst, Cons):
        return cons_case(lst.head, lst.tail)
    raise TypeError("Expected List type")

def list_length(lst: List) -> int:
    return match_list(lst,
        lambda: 0,
        lambda h, t: 1 + list_length(t))

def list_map(func: Callable, lst: List) -> List:
    return match_list(lst,
        lambda: Nil(),
        lambda h, t: Cons(func(h), list_map(func, t)))

def to_python_list(lst: List) -> list:
    return match_list(lst,
        lambda: [],
        lambda h, t: [h] + to_python_list(t))

def from_python_list(py_list: list) -> List:
    if not py_list:
        return Nil()
    return Cons(py_list[0], from_python_list(py_list[1:]))`,
    testCases: [
      { input: 'list_length(from_python_list([1,2,3]))', isHidden: false, description: 'Test case' },
      { input: 'to_python_list(list_map(lambda x: x*2, from_python_list([1,2,3])))', isHidden: false, description: 'Test case' },
      { input: 'list_length(Nil())', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'ADTs have multiple constructors (Nil, Cons)',
      'Pattern matching dispatches based on constructor',
      'Use isinstance to determine which case'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-3-16',
    subjectId: 'cs303',
    topicId: 'cs303-topic-3',
    title: 'Free Monad',
    difficulty: 5,
    description: 'Implement a simple Free Monad for DSL interpretation.',
    starterCode: `from typing import TypeVar, Generic, Callable, List as PyList
from abc import ABC, abstractmethod

A = TypeVar('A')
B = TypeVar('B')

class Free(ABC, Generic[A]):
    """Free monad for building DSLs."""

    @abstractmethod
    def flat_map(self, func: Callable[[A], 'Free[B]']) -> 'Free[B]':
        pass

class Pure(Free[A]):
    """Pure value in the free monad."""

    def __init__(self, value: A):
        pass

    def flat_map(self, func: Callable[[A], Free[B]]) -> Free[B]:
        pass

class Suspend(Free[A]):
    """Suspended computation."""

    def __init__(self, instruction, next_func: Callable):
        pass

    def flat_map(self, func: Callable[[A], Free[B]]) -> Free[B]:
        pass

# Console DSL instructions
class Print:
    def __init__(self, message: str):
        self.message = message

class Read:
    pass

def print_line(message: str) -> Free[None]:
    """DSL instruction to print."""
    pass

def read_line() -> Free[str]:
    """DSL instruction to read."""
    pass

def interpret_console(program: Free, inputs: PyList[str]) -> tuple:
    """
    Interpret console DSL, returning (outputs, final_value).
    """
    pass`,
    solution: `from typing import TypeVar, Generic, Callable, List as PyList

A = TypeVar('A')
B = TypeVar('B')

class Free(Generic[A]):
    def flat_map(self, func: Callable[[A], 'Free[B]']) -> 'Free[B]':
        raise NotImplementedError

class Pure(Free[A]):
    def __init__(self, value: A):
        self.value = value

    def flat_map(self, func: Callable[[A], Free[B]]) -> Free[B]:
        return func(self.value)

class Suspend(Free[A]):
    def __init__(self, instruction, next_func: Callable):
        self.instruction = instruction
        self.next_func = next_func

    def flat_map(self, func: Callable[[A], Free[B]]) -> Free[B]:
        return Suspend(self.instruction,
            lambda x: self.next_func(x).flat_map(func))

class Print:
    def __init__(self, message: str):
        self.message = message

class Read:
    pass

def print_line(message: str) -> Free[None]:
    return Suspend(Print(message), lambda _: Pure(None))

def read_line() -> Free[str]:
    return Suspend(Read(), lambda x: Pure(x))

def interpret_console(program: Free, inputs: PyList[str]) -> tuple:
    outputs = []
    input_idx = 0

    while isinstance(program, Suspend):
        inst = program.instruction
        if isinstance(inst, Print):
            outputs.append(inst.message)
            program = program.next_func(None)
        elif isinstance(inst, Read):
            if input_idx < len(inputs):
                value = inputs[input_idx]
                input_idx += 1
            else:
                value = ""
            program = program.next_func(value)

    return (outputs, program.value if isinstance(program, Pure) else None)`,
    testCases: [
      { input: 'interpret_console(print_line("Hi"), [])', isHidden: false, description: 'Test case' },
      { input: 'interpret_console(read_line(), ["test"])', isHidden: false, description: 'Test case' },
      { input: 'interpret_console(print_line("A").flat_map(lambda _: print_line("B")), [])', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Free monad separates program structure from interpretation',
      'Pure wraps final values',
      'Suspend captures instructions with continuations'
    ],
    language: 'python'
  }
];
