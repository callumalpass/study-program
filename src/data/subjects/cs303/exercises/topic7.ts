import { CodingExercise } from '../../../../core/types';

export const topic7Exercises: CodingExercise[] = [
  {
    id: 'cs303-ex-7-1',
    subjectId: 'cs303',
    topicId: 'cs303-topic-7',
    title: 'First-Class Functions',
    difficulty: 1,
    description: 'Work with functions as first-class values.',
    starterCode: `def apply_twice(f, x):
    """Apply function f to x twice."""
    pass

def make_adder(n):
    """Return a function that adds n to its argument."""
    pass

def compose(f, g):
    """Return composition f(g(x))."""
    pass`,
    solution: `def apply_twice(f, x):
    return f(f(x))

def make_adder(n):
    return lambda x: x + n

def compose(f, g):
    return lambda x: f(g(x))`,
    testCases: [
      { input: 'apply_twice(lambda x: x * 2, 3)', isHidden: false, description: 'Test case' },
      { input: 'make_adder(5)(10)', isHidden: false, description: 'Test case' },
      { input: 'compose(lambda x: x + 1, lambda x: x * 2)(3)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Functions can be passed as arguments',
      'Functions can be returned from functions',
      'Use lambda for anonymous functions'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-7-2',
    subjectId: 'cs303',
    topicId: 'cs303-topic-7',
    title: 'Closures',
    difficulty: 1,
    description: 'Implement and use closures.',
    starterCode: `def make_counter():
    """Return a counter function that increments each call."""
    pass

def make_password_checker(password):
    """Return a function that checks if input matches password."""
    pass`,
    solution: `def make_counter():
    count = 0
    def counter():
        nonlocal count
        count += 1
        return count
    return counter

def make_password_checker(password):
    attempts = 0
    def check(guess):
        nonlocal attempts
        attempts += 1
        return guess == password
    return check`,
    testCases: [
      { input: 'c = make_counter(); [c(), c(), c()]', isHidden: false, description: 'Test case' },
      { input: 'checker = make_password_checker("secret"); checker("wrong")', isHidden: false, description: 'Test case' },
      { input: 'checker = make_password_checker("secret"); checker("secret")', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Closures capture variables from enclosing scope',
      'Use nonlocal to modify captured variables',
      'Each call to make_counter creates new closure'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-7-3',
    subjectId: 'cs303',
    topicId: 'cs303-topic-7',
    title: 'Decorators',
    difficulty: 1,
    description: 'Implement function decorators.',
    starterCode: `def trace(func):
    """Decorator that prints function calls."""
    pass

def memoize(func):
    """Decorator that caches results."""
    pass

def retry(times):
    """Decorator factory for retrying failed functions."""
    pass`,
    solution: `def trace(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with {args}, {kwargs}")
        result = func(*args, **kwargs)
        print(f"Returned {result}")
        return result
    return wrapper

def memoize(func):
    cache = {}
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper

def retry(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            last_error = None
            for _ in range(times):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_error = e
            raise last_error
        return wrapper
    return decorator`,
    testCases: [
      { input: '@memoize\\ndef fib(n): return n if n<=1 else fib(n-1)+fib(n-2)\\nfib(30)', isHidden: false, description: 'Test case' },
      { input: '@retry(3)\\ndef fail(): raise ValueError()\\ntry:\\n  fail()\\nexcept: pass', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Decorators wrap functions',
      'Decorator factories return decorators',
      'Use *args and **kwargs for flexibility'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-7-4',
    subjectId: 'cs303',
    topicId: 'cs303-topic-7',
    title: 'Generators and Iterators',
    difficulty: 3,
    description: 'Implement custom generators and iterators.',
    starterCode: `def infinite_sequence(start=0):
    """Generate infinite sequence of integers."""
    pass

class Range:
    """Custom range iterator."""
    def __init__(self, start, stop, step=1):
        pass

    def __iter__(self):
        pass

    def __next__(self):
        pass`,
    solution: `def infinite_sequence(start=0):
    n = start
    while True:
        yield n
        n += 1

class Range:
    def __init__(self, start, stop, step=1):
        self.start = start
        self.stop = stop
        self.step = step
        self.current = start

    def __iter__(self):
        self.current = self.start
        return self

    def __next__(self):
        if (self.step > 0 and self.current >= self.stop) or \\
           (self.step < 0 and self.current <= self.stop):
            raise StopIteration
        value = self.current
        self.current += self.step
        return value`,
    testCases: [
      { input: 'gen = infinite_sequence(); [next(gen) for _ in range(5)]', isHidden: false, description: 'Test case' },
      { input: 'list(Range(0, 5))', isHidden: false, description: 'Test case' },
      { input: 'list(Range(10, 0, -2))', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'yield pauses generator and returns value',
      '__iter__ returns iterator',
      '__next__ returns next value or raises StopIteration'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-7-5',
    subjectId: 'cs303',
    topicId: 'cs303-topic-7',
    title: 'Context Managers',
    difficulty: 3,
    description: 'Implement context managers for resource management.',
    starterCode: `class Timer:
    """Context manager that measures execution time."""

    def __enter__(self):
        pass

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass

from contextlib import contextmanager

@contextmanager
def suppress_exceptions(*exceptions):
    """Suppress specified exception types."""
    pass`,
    solution: `import time

class Timer:
    def __enter__(self):
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.end = time.time()
        self.elapsed = self.end - self.start
        return False  # Don't suppress exceptions

from contextlib import contextmanager

@contextmanager
def suppress_exceptions(*exceptions):
    try:
        yield
    except exceptions:
        pass`,
    testCases: [
      { input: 'with Timer() as t: pass; t.elapsed >= 0', isHidden: false, description: 'Test case' },
      { input: 'with suppress_exceptions(ValueError): raise ValueError(); True', isHidden: false, description: 'Test case' }
    ],
    hints: [
      '__enter__ sets up context',
      '__exit__ cleans up and handles exceptions',
      '@contextmanager simplifies implementation'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-7-6',
    subjectId: 'cs303',
    topicId: 'cs303-topic-7',
    title: 'Coroutines',
    difficulty: 3,
    description: 'Implement coroutines using generators.',
    starterCode: `def averager():
    """Coroutine that computes running average."""
    pass

def grep(pattern):
    """Coroutine that filters lines matching pattern."""
    pass`,
    solution: `def averager():
    total = 0.0
    count = 0
    average = None
    while True:
        value = yield average
        if value is None:
            break
        total += value
        count += 1
        average = total / count

def grep(pattern):
    while True:
        line = yield
        if line is None:
            break
        if pattern in line:
            print(f"Match: {line}")`,
    testCases: [
      { input: 'avg = averager(); next(avg); avg.send(10); avg.send(20); avg.send(30)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Coroutines receive values via send()',
      'yield both receives and produces values',
      'Prime coroutine with next() before send()'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-7-7',
    subjectId: 'cs303',
    topicId: 'cs303-topic-7',
    title: 'Async/Await',
    difficulty: 3,
    description: 'Implement asynchronous functions with async/await.',
    starterCode: `import asyncio

async def fetch_data(url, delay):
    """Simulate async data fetch."""
    pass

async def fetch_all(urls):
    """Fetch all URLs concurrently."""
    pass`,
    solution: `import asyncio

async def fetch_data(url, delay):
    await asyncio.sleep(delay)
    return f"Data from {url}"

async def fetch_all(urls):
    tasks = [fetch_data(url, 0.1) for url in urls]
    return await asyncio.gather(*tasks)`,
    testCases: [
      { input: 'asyncio.run(fetch_data("http://example.com", 0))', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'async def creates coroutine function',
      'await suspends until awaitable completes',
      'asyncio.gather runs tasks concurrently'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-7-8',
    subjectId: 'cs303',
    topicId: 'cs303-topic-7',
    title: 'Metaclasses',
    difficulty: 5,
    description: 'Use metaclasses to customize class creation.',
    starterCode: `class SingletonMeta(type):
    """Metaclass that creates singleton classes."""
    pass

class RegisteredMeta(type):
    """Metaclass that registers all subclasses."""
    pass`,
    solution: `class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class RegisteredMeta(type):
    registry = {}

    def __new__(mcs, name, bases, namespace):
        cls = super().__new__(mcs, name, bases, namespace)
        mcs.registry[name] = cls
        return cls

    @classmethod
    def get_registered(mcs):
        return dict(mcs.registry)`,
    testCases: [
      { input: 'class S(metaclass=SingletonMeta): pass\\nS() is S()', isHidden: false, description: 'Test case' },
      { input: 'class R(metaclass=RegisteredMeta): pass\\n"R" in RegisteredMeta.registry', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Metaclass controls class creation',
      '__call__ intercepts instantiation',
      '__new__ creates class object'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-7-9',
    subjectId: 'cs303',
    topicId: 'cs303-topic-7',
    title: 'Descriptors',
    difficulty: 5,
    description: 'Implement descriptors for attribute access.',
    starterCode: `class Validated:
    """Descriptor with validation."""

    def __init__(self, validator):
        pass

    def __get__(self, obj, objtype=None):
        pass

    def __set__(self, obj, value):
        pass

class Lazy:
    """Descriptor for lazy computation."""

    def __init__(self, func):
        pass

    def __get__(self, obj, objtype=None):
        pass`,
    solution: `class Validated:
    def __init__(self, validator, name=None):
        self.validator = validator
        self.name = name

    def __set_name__(self, owner, name):
        self.name = name

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return obj.__dict__.get(self.name)

    def __set__(self, obj, value):
        if not self.validator(value):
            raise ValueError(f"Invalid value for {self.name}: {value}")
        obj.__dict__[self.name] = value

class Lazy:
    def __init__(self, func):
        self.func = func
        self.name = None

    def __set_name__(self, owner, name):
        self.name = name

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        if self.name not in obj.__dict__:
            obj.__dict__[self.name] = self.func(obj)
        return obj.__dict__[self.name]`,
    testCases: [
      { input: 'class C:\\n  x = Validated(lambda v: v > 0)\\nc = C(); c.x = 5; c.x', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Descriptors customize attribute access',
      '__get__ for reading, __set__ for writing',
      '__set_name__ provides attribute name'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-7-10',
    subjectId: 'cs303',
    topicId: 'cs303-topic-7',
    title: 'Pattern Matching',
    difficulty: 5,
    description: 'Implement structural pattern matching.',
    starterCode: `def match(value, *cases):
    """
    Match value against patterns.
    Each case is (pattern, handler).
    """
    pass

def pattern_var(name):
    """Create a variable pattern."""
    pass

def pattern_tuple(*patterns):
    """Create a tuple pattern."""
    pass`,
    solution: `class PatternVar:
    def __init__(self, name):
        self.name = name

def pattern_var(name):
    return PatternVar(name)

def pattern_tuple(*patterns):
    return ('tuple', patterns)

def match_pattern(pattern, value, bindings=None):
    if bindings is None:
        bindings = {}

    if isinstance(pattern, PatternVar):
        bindings[pattern.name] = value
        return bindings

    if pattern == '_':
        return bindings

    if isinstance(pattern, tuple) and pattern[0] == 'tuple':
        if not isinstance(value, tuple):
            return None
        patterns = pattern[1]
        if len(patterns) != len(value):
            return None
        for p, v in zip(patterns, value):
            result = match_pattern(p, v, bindings)
            if result is None:
                return None
        return bindings

    if pattern == value:
        return bindings

    return None

def match(value, *cases):
    for pattern, handler in cases:
        bindings = match_pattern(pattern, value)
        if bindings is not None:
            if callable(handler):
                return handler(**bindings)
            return handler
    raise ValueError(f"No pattern matched: {value}")`,
    testCases: [
      { input: 'match(5, (5, "five"), (pattern_var("x"), lambda x: x*2))', isHidden: false, description: 'Test case' },
      { input: 'match((1, 2), (pattern_tuple(pattern_var("a"), pattern_var("b")), lambda a, b: a+b))', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Try patterns in order',
      'Bind variables during matching',
      'Return None for failed match'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-7-11',
    subjectId: 'cs303',
    topicId: 'cs303-topic-7',
    title: 'Macro System',
    difficulty: 5,
    description: 'Implement a simple macro system.',
    starterCode: `class MacroExpander:
    """Expand macros in code."""

    def __init__(self):
        self.macros = {}

    def define_macro(self, name, transformer):
        pass

    def expand(self, expr):
        pass`,
    solution: `class MacroExpander:
    def __init__(self):
        self.macros = {}

    def define_macro(self, name, transformer):
        self.macros[name] = transformer

    def expand(self, expr):
        if isinstance(expr, (int, float, str, bool)):
            return expr

        if isinstance(expr, tuple) and len(expr) > 0:
            head = expr[0]
            if head in self.macros:
                transformed = self.macros[head](expr)
                return self.expand(transformed)
            return tuple(self.expand(e) for e in expr)

        if isinstance(expr, list):
            return [self.expand(e) for e in expr]

        return expr

# Example macros
def unless_macro(expr):
    _, cond, then_expr = expr
    return ('if', ('not', cond), then_expr, None)

def when_macro(expr):
    _, cond, *body = expr
    return ('if', cond, ('begin', *body), None)

def let_star_macro(expr):
    _, bindings, body = expr
    if not bindings:
        return body
    first = bindings[0]
    rest = bindings[1:]
    return ('let', [first], ('let*', rest, body) if rest else body)`,
    testCases: [
      { input: 'me = MacroExpander(); me.define_macro("unless", unless_macro); me.expand(("unless", True, "x"))', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Macros transform syntax',
      'Expand recursively after transformation',
      'Check for macro name at head of expression'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-7-12',
    subjectId: 'cs303',
    topicId: 'cs303-topic-7',
    title: 'Type Classes',
    difficulty: 5,
    description: 'Implement type class dispatch in Python.',
    starterCode: `class TypeClass:
    """Base for type class definitions."""

    _instances = {}

    @classmethod
    def register(cls, type_arg, instance):
        pass

    @classmethod
    def dispatch(cls, value):
        pass`,
    solution: `class TypeClass:
    _instances = {}

    @classmethod
    def register(cls, type_arg, instance):
        if cls not in cls._instances:
            cls._instances[cls] = {}
        cls._instances[cls][type_arg] = instance

    @classmethod
    def dispatch(cls, value):
        type_map = cls._instances.get(cls, {})
        for t, instance in type_map.items():
            if isinstance(value, t):
                return instance
        raise TypeError(f"No instance for {type(value)}")

class Show(TypeClass):
    @classmethod
    def show(cls, value):
        instance = cls.dispatch(value)
        return instance.show(value)

class IntShow:
    def show(self, value):
        return f"Int({value})"

class StrShow:
    def show(self, value):
        return f'Str("{value}")'

Show.register(int, IntShow())
Show.register(str, StrShow())`,
    testCases: [
      { input: 'Show.show(42)', isHidden: false, description: 'Test case' },
      { input: 'Show.show("hello")', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Type classes provide ad-hoc polymorphism',
      'Dispatch based on value type',
      'Register instances for each type'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-7-13',
    subjectId: 'cs303',
    topicId: 'cs303-topic-7',
    title: 'Delimited Continuations',
    difficulty: 5,
    description: 'Implement delimited continuations.',
    starterCode: `class Prompt:
    """Delimits continuation capture."""
    pass

class Shift:
    """Captures continuation up to prompt."""
    def __init__(self, handler):
        self.handler = handler

def reset(thunk):
    """Delimit continuation."""
    pass

def shift(handler):
    """Capture current continuation."""
    pass`,
    solution: `class Prompt(Exception):
    def __init__(self, value):
        self.value = value

class Shift(Exception):
    def __init__(self, handler):
        self.handler = handler

def reset(thunk):
    try:
        return thunk()
    except Shift as s:
        def continuation(value):
            return reset(lambda: value)
        return s.handler(continuation)

def shift(handler):
    raise Shift(handler)

# Example: non-deterministic choice
def amb(choices):
    def handler(k):
        results = []
        for choice in choices:
            results.append(k(choice))
        return results
    return shift(handler)

# Example: state
def get_state():
    return shift(lambda k: lambda s: k(s)(s))

def put_state(new_state):
    return shift(lambda k: lambda s: k(None)(new_state))

def run_state(thunk, initial):
    return reset(thunk)(initial)`,
    testCases: [
      { input: 'reset(lambda: 1 + shift(lambda k: k(5)))', isHidden: false, description: 'Test case' },
      { input: 'reset(lambda: shift(lambda k: k(k(1))))', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Delimited continuations capture partial computation',
      'reset delimits the captured continuation',
      'shift captures continuation up to enclosing reset'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-7-14',
    subjectId: 'cs303',
    topicId: 'cs303-topic-7',
    title: 'Effect System',
    difficulty: 5,
    description: 'Implement an effect system for tracking side effects.',
    starterCode: `class Effect:
    """Base class for effects."""
    pass

class Reader(Effect):
    """Read from environment effect."""
    pass

class State(Effect):
    """Stateful computation effect."""
    pass

class EffectfulComputation:
    """Computation with tracked effects."""

    def __init__(self, func, effects):
        pass

    def run(self, handlers):
        pass`,
    solution: `class Effect:
    pass

class Reader(Effect):
    @staticmethod
    def ask():
        return ('effect', 'reader', 'ask')

class State(Effect):
    @staticmethod
    def get():
        return ('effect', 'state', 'get')

    @staticmethod
    def put(value):
        return ('effect', 'state', 'put', value)

class EffectfulComputation:
    def __init__(self, func, effects=None):
        self.func = func
        self.effects = effects or set()

    def run(self, handlers):
        def handle_effects(value):
            if isinstance(value, tuple) and value[0] == 'effect':
                effect_type = value[1]
                operation = value[2]
                if effect_type in handlers:
                    return handlers[effect_type](operation, value[3:] if len(value) > 3 else ())
                raise ValueError(f"Unhandled effect: {effect_type}")
            return value

        return self.func(handle_effects)

    def map(self, f):
        def new_func(handle):
            result = self.func(handle)
            return f(result)
        return EffectfulComputation(new_func, self.effects)

    def flat_map(self, f):
        def new_func(handle):
            result = self.func(handle)
            return f(result).func(handle)
        combined_effects = self.effects
        return EffectfulComputation(new_func, combined_effects)`,
    testCases: [
      { input: 'ec = EffectfulComputation(lambda h: h(Reader.ask()), {"reader"}); ec.run({"reader": lambda op, args: 42})', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Effects are typed operations',
      'Handlers interpret effects',
      'Track which effects computation uses'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-7-15',
    subjectId: 'cs303',
    topicId: 'cs303-topic-7',
    title: 'Multimethods',
    difficulty: 5,
    description: 'Implement multiple dispatch.',
    starterCode: `class MultiMethod:
    """Function with multiple dispatch based on argument types."""

    def __init__(self, name):
        pass

    def register(self, *types):
        """Decorator to register implementation for types."""
        pass

    def __call__(self, *args):
        pass`,
    solution: `class MultiMethod:
    def __init__(self, name):
        self.name = name
        self.implementations = {}

    def register(self, *types):
        def decorator(func):
            self.implementations[types] = func
            return func
        return decorator

    def __call__(self, *args):
        types = tuple(type(arg) for arg in args)

        # Exact match
        if types in self.implementations:
            return self.implementations[types](*args)

        # Try with inheritance
        for registered_types, func in self.implementations.items():
            if len(registered_types) == len(types):
                if all(issubclass(actual, expected)
                       for actual, expected in zip(types, registered_types)):
                    return func(*args)

        raise TypeError(f"No implementation for {self.name} with types {types}")

# Example usage
add = MultiMethod('add')

@add.register(int, int)
def add_int(a, b):
    return a + b

@add.register(str, str)
def add_str(a, b):
    return a + b

@add.register(list, list)
def add_list(a, b):
    return a + b`,
    testCases: [
      { input: 'add(1, 2)', isHidden: false, description: 'Test case' },
      { input: 'add("a", "b")', isHidden: false, description: 'Test case' },
      { input: 'add([1], [2])', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Dispatch on types of all arguments',
      'Try exact match first',
      'Fall back to inheritance-based match'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-7-16',
    subjectId: 'cs303',
    topicId: 'cs303-topic-7',
    title: 'Object Capabilities',
    difficulty: 5,
    description: 'Implement object-capability security.',
    starterCode: `class Capability:
    """A capability granting specific access."""

    def __init__(self, permissions):
        pass

    def can(self, permission):
        pass

    def attenuate(self, *permissions):
        """Create restricted capability."""
        pass

class SecureObject:
    """Object accessed only through capabilities."""

    def __init__(self, value):
        pass

    def read(self, cap):
        pass

    def write(self, cap, value):
        pass`,
    solution: `class Capability:
    def __init__(self, permissions):
        self.permissions = frozenset(permissions)

    def can(self, permission):
        return permission in self.permissions

    def attenuate(self, *permissions):
        new_perms = self.permissions & set(permissions)
        return Capability(new_perms)

    def combine(self, other):
        return Capability(self.permissions | other.permissions)

class SecureObject:
    def __init__(self, value):
        self._value = value

    def read(self, cap):
        if not cap.can('read'):
            raise PermissionError("No read permission")
        return self._value

    def write(self, cap, value):
        if not cap.can('write'):
            raise PermissionError("No write permission")
        self._value = value

    def get_full_cap(self):
        return Capability(['read', 'write', 'delete'])

    def get_readonly_cap(self):
        return Capability(['read'])`,
    testCases: [
      { input: 'cap = Capability(["read", "write"]); cap.can("read")', isHidden: false, description: 'Test case' },
      { input: 'cap = Capability(["read", "write"]); cap.attenuate("read").can("write")', isHidden: false, description: 'Test case' },
      { input: 'obj = SecureObject(42); obj.read(obj.get_readonly_cap())', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Capabilities are unforgeable permissions',
      'Attenuation reduces permissions',
      'Access requires appropriate capability'
    ],
    language: 'python'
  }
];
