import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  {
    id: 'cs303-ex-2-1',
    subjectId: 'cs303',
    topicId: 'cs303-topic-2',
    title: 'Type Annotations',
    difficulty: 1,
    description: 'Add type annotations to Python functions using the typing module.',
    starterCode: `from typing import List, Optional, Dict, Tuple

def find_max(numbers):
    """Find the maximum value in a list."""
    if not numbers:
        return None
    return max(numbers)

def word_count(text):
    """Count occurrences of each word."""
    words = text.lower().split()
    counts = {}
    for word in words:
        counts[word] = counts.get(word, 0) + 1
    return counts

def parse_coordinate(s):
    """Parse 'x,y' string into coordinate tuple."""
    parts = s.split(',')
    return (int(parts[0]), int(parts[1]))

# TODO: Add type annotations to the functions above`,
    solution: `from typing import List, Optional, Dict, Tuple

def find_max(numbers: List[int]) -> Optional[int]:
    """Find the maximum value in a list."""
    if not numbers:
        return None
    return max(numbers)

def word_count(text: str) -> Dict[str, int]:
    """Count occurrences of each word."""
    words = text.lower().split()
    counts: Dict[str, int] = {}
    for word in words:
        counts[word] = counts.get(word, 0) + 1
    return counts

def parse_coordinate(s: str) -> Tuple[int, int]:
    """Parse 'x,y' string into coordinate tuple."""
    parts = s.split(',')
    return (int(parts[0]), int(parts[1]))`,
    testCases: [
      { input: 'find_max([1, 5, 3])', isHidden: false, description: 'Test case' },
      { input: "word_count('a b a')['a']", isHidden: false, description: 'Test case' },
      { input: "parse_coordinate('3,4')", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Use List[T] for list types',
      'Use Optional[T] for values that might be None',
      'Use Dict[K, V] for dictionary types'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-2-2',
    subjectId: 'cs303',
    topicId: 'cs303-topic-2',
    title: 'Generic Type Parameter',
    difficulty: 1,
    description: 'Implement a generic container class using TypeVar.',
    starterCode: `from typing import TypeVar, Generic, Optional

T = TypeVar('T')

class Box(Generic[T]):
    """
    A generic container that holds a single value.
    Type parameter T specifies the type of the contained value.
    """

    def __init__(self, value: T):
        # Your implementation here
        pass

    def get(self) -> T:
        """Return the contained value."""
        pass

    def map(self, func):
        """Apply func to the value and return a new Box."""
        pass`,
    solution: `from typing import TypeVar, Generic, Callable

T = TypeVar('T')
U = TypeVar('U')

class Box(Generic[T]):
    def __init__(self, value: T):
        self._value = value

    def get(self) -> T:
        return self._value

    def map(self, func: Callable[[T], U]) -> 'Box[U]':
        return Box(func(self._value))`,
    testCases: [
      { input: 'Box(42).get()', isHidden: false, description: 'Test case' },
      { input: "Box('hello').map(str.upper).get()", isHidden: false, description: 'Test case' },
      { input: 'Box(3).map(lambda x: x * 2).get()', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'TypeVar creates a type variable',
      'Generic[T] makes the class generic over T',
      'map should return a new Box with transformed value'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-2-3',
    subjectId: 'cs303',
    topicId: 'cs303-topic-2',
    title: 'Union Types',
    difficulty: 1,
    description: 'Use Union types to handle multiple possible input types.',
    starterCode: `from typing import Union, List

def stringify(value: Union[int, float, str, List]) -> str:
    """
    Convert various types to string representation.
    - int/float: convert to string
    - str: return as-is
    - list: join elements with commas

    Args:
        value: An int, float, string, or list
    Returns:
        String representation
    """
    # Your implementation here
    pass`,
    solution: `from typing import Union, List

def stringify(value: Union[int, float, str, List]) -> str:
    if isinstance(value, (int, float)):
        return str(value)
    elif isinstance(value, str):
        return value
    elif isinstance(value, list):
        return ', '.join(str(item) for item in value)
    return str(value)`,
    testCases: [
      { input: 'stringify(42)', isHidden: false, description: 'Test case' },
      { input: 'stringify(3.14)', isHidden: false, description: 'Test case' },
      { input: "stringify('hello')", isHidden: false, description: 'Test case' },
      { input: 'stringify([1, 2, 3])', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Use isinstance() to check the actual type',
      'You can check multiple types with isinstance(x, (type1, type2))',
      'Union[A, B] means the type can be either A or B'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-2-4',
    subjectId: 'cs303',
    topicId: 'cs303-topic-2',
    title: 'Protocol Types',
    difficulty: 3,
    description: 'Define and use a Protocol for structural subtyping.',
    starterCode: `from typing import Protocol, List

class Comparable(Protocol):
    """Protocol for objects that can be compared."""

    def __lt__(self, other) -> bool:
        """Return True if self < other."""
        ...

def find_minimum(items: List[Comparable]) -> Comparable:
    """
    Find the minimum item in a list.
    Works with any type that implements __lt__.

    Args:
        items: List of comparable items
    Returns:
        The minimum item
    """
    # Your implementation here
    pass

class Point:
    """A 2D point that can be compared by distance from origin."""

    def __init__(self, x: float, y: float):
        # Your implementation here
        pass

    def __lt__(self, other: 'Point') -> bool:
        # Compare by distance from origin
        pass`,
    solution: `from typing import Protocol, List
import math

class Comparable(Protocol):
    def __lt__(self, other) -> bool:
        ...

def find_minimum(items: List[Comparable]) -> Comparable:
    if not items:
        raise ValueError("Cannot find minimum of empty list")
    result = items[0]
    for item in items[1:]:
        if item < result:
            result = item
    return result

class Point:
    def __init__(self, x: float, y: float):
        self.x = x
        self.y = y

    def __lt__(self, other: 'Point') -> bool:
        self_dist = math.sqrt(self.x**2 + self.y**2)
        other_dist = math.sqrt(other.x**2 + other.y**2)
        return self_dist < other_dist`,
    testCases: [
      { input: 'find_minimum([3, 1, 4, 1, 5])', isHidden: false, description: 'Test case' },
      { input: "find_minimum(['c', 'a', 'b'])", isHidden: false, description: 'Test case' },
      { input: 'p = find_minimum([Point(3,4), Point(1,0), Point(2,2)]); (p.x, p.y)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Protocol defines a structural interface',
      'Any class with __lt__ satisfies Comparable',
      'Point distance from origin = sqrt(x² + y²)'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-2-5',
    subjectId: 'cs303',
    topicId: 'cs303-topic-2',
    title: 'Type Guards',
    difficulty: 3,
    description: 'Implement type narrowing with TypeGuard.',
    starterCode: `from typing import TypeGuard, Union, List, Dict

def is_string_list(value: List[Union[str, int]]) -> TypeGuard[List[str]]:
    """
    Check if all elements in the list are strings.
    This is a type guard that narrows the type.
    """
    # Your implementation here
    pass

def is_valid_person(data: Dict) -> TypeGuard[Dict[str, Union[str, int]]]:
    """
    Check if dict has 'name' (str) and 'age' (int) keys.
    """
    # Your implementation here
    pass

def process_items(items: List[Union[str, int]]) -> str:
    """
    Process items: if all strings, join them; otherwise sum numbers.
    """
    # Your implementation using is_string_list
    pass`,
    solution: `from typing import TypeGuard, Union, List, Dict

def is_string_list(value: List[Union[str, int]]) -> TypeGuard[List[str]]:
    return all(isinstance(item, str) for item in value)

def is_valid_person(data: Dict) -> TypeGuard[Dict[str, Union[str, int]]]:
    return (
        'name' in data and isinstance(data['name'], str) and
        'age' in data and isinstance(data['age'], int)
    )

def process_items(items: List[Union[str, int]]) -> str:
    if is_string_list(items):
        return ' '.join(items)  # Type narrowed to List[str]
    else:
        return str(sum(x for x in items if isinstance(x, int)))`,
    testCases: [
      { input: "is_string_list(['a', 'b', 'c'])", isHidden: false, description: 'Test case' },
      { input: "is_string_list(['a', 1, 'b'])", isHidden: false, description: 'Test case' },
      { input: "process_items(['hello', 'world'])", isHidden: false, description: 'Test case' },
      { input: 'process_items([1, 2, 3])', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'TypeGuard[T] narrows the type to T when True',
      'Use all() to check all elements',
      'After a successful guard, the type checker knows the narrowed type'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-2-6',
    subjectId: 'cs303',
    topicId: 'cs303-topic-2',
    title: 'Covariance and Contravariance',
    difficulty: 3,
    description: 'Understand variance with generic types.',
    starterCode: `from typing import TypeVar, Generic, Callable, List

# Covariant type variable (for "producers")
T_co = TypeVar('T_co', covariant=True)

# Contravariant type variable (for "consumers")
T_contra = TypeVar('T_contra', contravariant=True)

class Reader(Generic[T_co]):
    """
    A covariant reader - produces values of type T.
    If Cat is subtype of Animal, Reader[Cat] is subtype of Reader[Animal].
    """

    def __init__(self, value: T_co):
        self._value = value

    def read(self) -> T_co:
        pass

class Writer(Generic[T_contra]):
    """
    A contravariant writer - consumes values of type T.
    If Cat is subtype of Animal, Writer[Animal] is subtype of Writer[Cat].
    """

    def __init__(self, handler: Callable[[T_contra], None]):
        self._handler = handler

    def write(self, value: T_contra) -> None:
        pass`,
    solution: `from typing import TypeVar, Generic, Callable

T_co = TypeVar('T_co', covariant=True)
T_contra = TypeVar('T_contra', contravariant=True)

class Reader(Generic[T_co]):
    def __init__(self, value: T_co):
        self._value = value

    def read(self) -> T_co:
        return self._value

class Writer(Generic[T_contra]):
    def __init__(self, handler: Callable[[T_contra], None]):
        self._handler = handler

    def write(self, value: T_contra) -> None:
        self._handler(value)`,
    testCases: [
      { input: "Reader('hello').read()", isHidden: false, description: 'Test case' },
      { input: 'Reader(42).read()', isHidden: false, description: 'Test case' },
      { input: 'output = []; Writer(output.append).write(5); output', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Covariant: output positions (return types)',
      'Contravariant: input positions (parameter types)',
      'Reader produces values, Writer consumes them'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-2-7',
    subjectId: 'cs303',
    topicId: 'cs303-topic-2',
    title: 'TypedDict',
    difficulty: 3,
    description: 'Use TypedDict for structured dictionaries with specific keys.',
    starterCode: `from typing import TypedDict, List, Optional

class Address(TypedDict):
    """A typed dictionary for addresses."""
    street: str
    city: str
    zip_code: str

class Person(TypedDict, total=False):
    """
    A typed dictionary for person data.
    total=False means fields are optional.
    """
    name: str
    age: int
    address: Address

def format_address(addr: Address) -> str:
    """Format an address as a single string."""
    # Your implementation here
    pass

def get_person_summary(person: Person) -> str:
    """
    Get a summary string for a person.
    Handle optional fields gracefully.
    """
    # Your implementation here
    pass`,
    solution: `from typing import TypedDict

class Address(TypedDict):
    street: str
    city: str
    zip_code: str

class Person(TypedDict, total=False):
    name: str
    age: int
    address: Address

def format_address(addr: Address) -> str:
    return f"{addr['street']}, {addr['city']} {addr['zip_code']}"

def get_person_summary(person: Person) -> str:
    name = person.get('name', 'Unknown')
    age = person.get('age')
    age_str = f", {age} years old" if age is not None else ""
    addr = person.get('address')
    addr_str = f" - {format_address(addr)}" if addr else ""
    return f"{name}{age_str}{addr_str}"`,
    testCases: [
      { input: "format_address({'street': '123 Main', 'city': 'NYC', 'zip_code': '10001'})", isHidden: false, description: 'Test case' },
      { input: "get_person_summary({'name': 'Alice'})", isHidden: false, description: 'Test case' },
      { input: "get_person_summary({'name': 'Bob', 'age': 30})", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'TypedDict creates a dict with specific key types',
      'total=False makes all fields optional',
      'Use .get() with defaults for optional fields'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-2-8',
    subjectId: 'cs303',
    topicId: 'cs303-topic-2',
    title: 'Literal Types',
    difficulty: 3,
    description: 'Use Literal types for precise string and int literals.',
    starterCode: `from typing import Literal, Union

Direction = Literal['north', 'south', 'east', 'west']
Priority = Literal[1, 2, 3]

def move(direction: Direction, steps: int = 1) -> tuple:
    """
    Calculate new position after moving.
    Starting from (0, 0), return new (x, y) position.

    north: y increases
    south: y decreases
    east: x increases
    west: x decreases
    """
    # Your implementation here
    pass

def get_priority_label(priority: Priority) -> str:
    """
    Convert numeric priority to label.
    1 -> 'high', 2 -> 'medium', 3 -> 'low'
    """
    # Your implementation here
    pass`,
    solution: `from typing import Literal

Direction = Literal['north', 'south', 'east', 'west']
Priority = Literal[1, 2, 3]

def move(direction: Direction, steps: int = 1) -> tuple:
    moves = {
        'north': (0, steps),
        'south': (0, -steps),
        'east': (steps, 0),
        'west': (-steps, 0)
    }
    return moves[direction]

def get_priority_label(priority: Priority) -> str:
    labels = {1: 'high', 2: 'medium', 3: 'low'}
    return labels[priority]`,
    testCases: [
      { input: "move('north', 3)", isHidden: false, description: 'Test case' },
      { input: "move('east', 2)", isHidden: false, description: 'Test case' },
      { input: 'get_priority_label(1)', isHidden: false, description: 'Test case' },
      { input: 'get_priority_label(3)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Literal restricts to specific values',
      'Type checkers will flag invalid literals',
      'Use dict mapping for clean dispatch'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-2-9',
    subjectId: 'cs303',
    topicId: 'cs303-topic-2',
    title: 'Recursive Types',
    difficulty: 5,
    description: 'Define recursive type aliases for tree structures.',
    starterCode: `from typing import Union, List, Dict, Any

# JSON can be: null, bool, int, float, str, list of JSON, or dict of JSON
JSON = Union[None, bool, int, float, str, List['JSON'], Dict[str, 'JSON']]

def flatten_json(data: JSON, prefix: str = '') -> Dict[str, Any]:
    """
    Flatten nested JSON to a single-level dict with dot-notation keys.

    Example:
        {'a': {'b': 1, 'c': 2}} -> {'a.b': 1, 'a.c': 2}
        [1, 2, 3] -> {'0': 1, '1': 2, '2': 3}
    """
    # Your implementation here
    pass

def json_depth(data: JSON) -> int:
    """
    Calculate the maximum nesting depth of JSON data.
    Primitive values have depth 1.
    """
    # Your implementation here
    pass`,
    solution: `from typing import Union, List, Dict, Any

JSON = Union[None, bool, int, float, str, List['JSON'], Dict[str, 'JSON']]

def flatten_json(data: JSON, prefix: str = '') -> Dict[str, Any]:
    result: Dict[str, Any] = {}

    if isinstance(data, dict):
        for key, value in data.items():
            new_key = f"{prefix}.{key}" if prefix else key
            result.update(flatten_json(value, new_key))
    elif isinstance(data, list):
        for i, value in enumerate(data):
            new_key = f"{prefix}.{i}" if prefix else str(i)
            result.update(flatten_json(value, new_key))
    else:
        if prefix:
            result[prefix] = data
        else:
            result[''] = data

    return result

def json_depth(data: JSON) -> int:
    if isinstance(data, dict):
        if not data:
            return 1
        return 1 + max(json_depth(v) for v in data.values())
    elif isinstance(data, list):
        if not data:
            return 1
        return 1 + max(json_depth(v) for v in data)
    else:
        return 1`,
    testCases: [
      { input: "flatten_json({'a': 1, 'b': 2})", isHidden: false, description: 'Test case' },
      { input: "flatten_json({'a': {'b': 1}})", isHidden: false, description: 'Test case' },
      { input: "json_depth({'a': {'b': {'c': 1}}})", isHidden: false, description: 'Test case' },
      { input: 'json_depth([1, 2, 3])', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Use forward reference string for recursive types',
      'Handle dict, list, and primitive cases separately',
      'Recursively process nested structures'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-2-10',
    subjectId: 'cs303',
    topicId: 'cs303-topic-2',
    title: 'Dependent Types Simulation',
    difficulty: 5,
    description: 'Simulate dependent types using overloading.',
    starterCode: `from typing import overload, Literal, Tuple

@overload
def create_array(size: Literal[1]) -> Tuple[int]: ...

@overload
def create_array(size: Literal[2]) -> Tuple[int, int]: ...

@overload
def create_array(size: Literal[3]) -> Tuple[int, int, int]: ...

def create_array(size: int) -> tuple:
    """
    Create a tuple of zeros with the given size.
    The return type depends on the input value.
    """
    # Your implementation here
    pass

@overload
def safe_divide(a: int, b: Literal[0]) -> None: ...

@overload
def safe_divide(a: int, b: int) -> float: ...

def safe_divide(a: int, b: int):
    """
    Divide a by b safely.
    Returns None if b is 0, otherwise returns the result.
    """
    # Your implementation here
    pass`,
    solution: `from typing import overload, Literal, Tuple, Union

@overload
def create_array(size: Literal[1]) -> Tuple[int]: ...

@overload
def create_array(size: Literal[2]) -> Tuple[int, int]: ...

@overload
def create_array(size: Literal[3]) -> Tuple[int, int, int]: ...

@overload
def create_array(size: int) -> tuple: ...

def create_array(size: int) -> tuple:
    return tuple(0 for _ in range(size))

@overload
def safe_divide(a: int, b: Literal[0]) -> None: ...

@overload
def safe_divide(a: int, b: int) -> float: ...

def safe_divide(a: int, b: int) -> Union[float, None]:
    if b == 0:
        return None
    return a / b`,
    testCases: [
      { input: 'create_array(1)', isHidden: false, description: 'Test case' },
      { input: 'create_array(3)', isHidden: false, description: 'Test case' },
      { input: 'safe_divide(10, 2)', isHidden: false, description: 'Test case' },
      { input: 'safe_divide(10, 0)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      '@overload lets you specify different return types',
      'The actual implementation handles all cases',
      'Type checkers use overloads for type inference'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-2-11',
    subjectId: 'cs303',
    topicId: 'cs303-topic-2',
    title: 'Type Erasure Implementation',
    difficulty: 5,
    description: 'Understand type erasure by implementing runtime type checking.',
    starterCode: `from typing import TypeVar, Generic, Type, get_type_hints
import inspect

T = TypeVar('T')

class TypedList(Generic[T]):
    """
    A list that enforces type checking at runtime.
    Demonstrates that Python generics are erased at runtime.
    """

    def __init__(self, item_type: Type[T]):
        # Store the type for runtime checking
        pass

    def append(self, item: T) -> None:
        """Add item, raising TypeError if wrong type."""
        pass

    def extend(self, items) -> None:
        """Add multiple items with type checking."""
        pass

    def __getitem__(self, index: int) -> T:
        pass

    def __len__(self) -> int:
        pass`,
    solution: `from typing import TypeVar, Generic, Type

T = TypeVar('T')

class TypedList(Generic[T]):
    def __init__(self, item_type: Type[T]):
        self._item_type = item_type
        self._items: list = []

    def append(self, item: T) -> None:
        if not isinstance(item, self._item_type):
            raise TypeError(
                f"Expected {self._item_type.__name__}, got {type(item).__name__}"
            )
        self._items.append(item)

    def extend(self, items) -> None:
        for item in items:
            self.append(item)

    def __getitem__(self, index: int) -> T:
        return self._items[index]

    def __len__(self) -> int:
        return len(self._items)`,
    testCases: [
      { input: 'lst = TypedList(int); lst.append(1); lst[0]', isHidden: false, description: 'Test case' },
      { input: 'lst = TypedList(str); lst.extend(["a", "b"]); len(lst)', isHidden: false, description: 'Test case' },
      { input: 'lst = TypedList(int); lst.append("x")', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Store the type as an instance variable',
      'Use isinstance() for runtime type checking',
      'Generic[T] provides static typing, but T is erased at runtime'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-2-12',
    subjectId: 'cs303',
    topicId: 'cs303-topic-2',
    title: 'Phantom Types',
    difficulty: 5,
    description: 'Implement phantom types for compile-time safety without runtime overhead.',
    starterCode: `from typing import TypeVar, Generic, NewType

# Phantom type markers (never instantiated)
class Meters: pass
class Feet: pass

Unit = TypeVar('Unit')

class Distance(Generic[Unit]):
    """
    A distance value with unit tracking at type level.
    The Unit parameter is phantom - it doesn't exist at runtime.
    """

    def __init__(self, value: float):
        # Your implementation here
        pass

    def get_value(self) -> float:
        pass

    def __add__(self, other: 'Distance[Unit]') -> 'Distance[Unit]':
        # Can only add distances with same unit
        pass

def meters(value: float) -> Distance[Meters]:
    """Create a distance in meters."""
    pass

def feet(value: float) -> Distance[Feet]:
    """Create a distance in feet."""
    pass

def to_meters(d: Distance[Feet]) -> Distance[Meters]:
    """Convert feet to meters."""
    pass`,
    solution: `from typing import TypeVar, Generic

class Meters: pass
class Feet: pass

Unit = TypeVar('Unit')

class Distance(Generic[Unit]):
    def __init__(self, value: float):
        self._value = value

    def get_value(self) -> float:
        return self._value

    def __add__(self, other: 'Distance[Unit]') -> 'Distance[Unit]':
        return Distance(self._value + other._value)

def meters(value: float) -> Distance[Meters]:
    return Distance(value)

def feet(value: float) -> Distance[Feet]:
    return Distance(value)

def to_meters(d: Distance[Feet]) -> Distance[Meters]:
    return meters(d.get_value() * 0.3048)`,
    testCases: [
      { input: 'meters(100).get_value()', isHidden: false, description: 'Test case' },
      { input: '(meters(10) + meters(20)).get_value()', isHidden: false, description: 'Test case' },
      { input: 'round(to_meters(feet(10)).get_value(), 4)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Phantom types exist only at compile time',
      'The Unit parameter is never used at runtime',
      'Type checker prevents adding meters to feet'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-2-13',
    subjectId: 'cs303',
    topicId: 'cs303-topic-2',
    title: 'Nominal vs Structural Typing',
    difficulty: 5,
    description: 'Compare nominal and structural typing approaches.',
    starterCode: `from typing import Protocol, NewType, runtime_checkable

# Nominal typing with NewType
UserId = NewType('UserId', int)
ProductId = NewType('ProductId', int)

def get_user(user_id: UserId) -> str:
    """Get user by nominal UserId type."""
    # Your implementation - return f"User {user_id}"
    pass

# Structural typing with Protocol
@runtime_checkable
class Printable(Protocol):
    def to_string(self) -> str:
        ...

class User:
    def __init__(self, name: str):
        self.name = name

    def to_string(self) -> str:
        pass

class Product:
    def __init__(self, title: str):
        self.title = title

    def to_string(self) -> str:
        pass

def print_item(item: Printable) -> str:
    """Print any Printable item structurally."""
    pass`,
    solution: `from typing import Protocol, NewType, runtime_checkable

UserId = NewType('UserId', int)
ProductId = NewType('ProductId', int)

def get_user(user_id: UserId) -> str:
    return f"User {user_id}"

@runtime_checkable
class Printable(Protocol):
    def to_string(self) -> str:
        ...

class User:
    def __init__(self, name: str):
        self.name = name

    def to_string(self) -> str:
        return f"User: {self.name}"

class Product:
    def __init__(self, title: str):
        self.title = title

    def to_string(self) -> str:
        return f"Product: {self.title}"

def print_item(item: Printable) -> str:
    return item.to_string()`,
    testCases: [
      { input: 'get_user(UserId(42))', isHidden: false, description: 'Test case' },
      { input: "print_item(User('Alice'))", isHidden: false, description: 'Test case' },
      { input: "print_item(Product('Widget'))", isHidden: false, description: 'Test case' },
      { input: "isinstance(User('Test'), Printable)", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'NewType creates a distinct type for type checking',
      'Protocol enables duck typing with type safety',
      '@runtime_checkable allows isinstance() checks'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-2-14',
    subjectId: 'cs303',
    topicId: 'cs303-topic-2',
    title: 'Type Inference',
    difficulty: 5,
    description: 'Implement a simple type inference engine.',
    starterCode: `from typing import Dict, Optional, Union

# Simple type representation
Type = Union[str, tuple]  # 'int', 'bool', ('func', arg_type, ret_type)

def infer_literal(value) -> Type:
    """Infer type of a literal value."""
    # Your implementation here
    pass

def infer_binary_op(op: str, left_type: Type, right_type: Type) -> Optional[Type]:
    """
    Infer result type of binary operation.
    Supports: +, -, *, / for int; and, or for bool; == for any
    Returns None if types are incompatible.
    """
    # Your implementation here
    pass

def infer_expression(expr, env: Dict[str, Type] = None) -> Optional[Type]:
    """
    Infer type of an expression.
    expr can be:
    - literal: 42, True, etc.
    - variable: ('var', 'x')
    - binary: ('binop', op, left, right)
    - if-then-else: ('if', cond, then_expr, else_expr)
    """
    # Your implementation here
    pass`,
    solution: `from typing import Dict, Optional, Union

Type = Union[str, tuple]

def infer_literal(value) -> Type:
    if isinstance(value, bool):
        return 'bool'
    elif isinstance(value, int):
        return 'int'
    elif isinstance(value, float):
        return 'float'
    elif isinstance(value, str):
        return 'str'
    return 'unknown'

def infer_binary_op(op: str, left_type: Type, right_type: Type) -> Optional[Type]:
    if op in ['+', '-', '*']:
        if left_type == 'int' and right_type == 'int':
            return 'int'
    if op == '/':
        if left_type == 'int' and right_type == 'int':
            return 'float'
    if op in ['and', 'or']:
        if left_type == 'bool' and right_type == 'bool':
            return 'bool'
    if op == '==':
        if left_type == right_type:
            return 'bool'
    return None

def infer_expression(expr, env: Dict[str, Type] = None) -> Optional[Type]:
    if env is None:
        env = {}

    if isinstance(expr, (int, bool, float, str)) and not isinstance(expr, tuple):
        return infer_literal(expr)

    if not isinstance(expr, tuple):
        return None

    tag = expr[0]

    if tag == 'var':
        return env.get(expr[1])

    if tag == 'binop':
        _, op, left, right = expr
        left_type = infer_expression(left, env)
        right_type = infer_expression(right, env)
        if left_type and right_type:
            return infer_binary_op(op, left_type, right_type)

    if tag == 'if':
        _, cond, then_expr, else_expr = expr
        cond_type = infer_expression(cond, env)
        if cond_type != 'bool':
            return None
        then_type = infer_expression(then_expr, env)
        else_type = infer_expression(else_expr, env)
        if then_type == else_type:
            return then_type

    return None`,
    testCases: [
      { input: 'infer_literal(42)', isHidden: false, description: 'Test case' },
      { input: "infer_binary_op('+', 'int', 'int')", isHidden: false, description: 'Test case' },
      { input: "infer_expression(('binop', '+', 1, 2))", isHidden: false, description: 'Test case' },
      { input: "infer_expression(('if', True, 1, 2))", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Pattern match on expression structure',
      'Propagate types through subexpressions',
      'Return None for type errors'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-2-15',
    subjectId: 'cs303',
    topicId: 'cs303-topic-2',
    title: 'Gradual Typing',
    difficulty: 5,
    description: 'Implement consistent-with relation for gradual typing.',
    starterCode: `from typing import Any, Union, Optional

# Type representation
# 'Any' = dynamic type
# 'int', 'str', 'bool' = base types
# ('list', T) = list of T
# ('func', [arg_types], ret_type) = function type

def consistent(t1, t2) -> bool:
    """
    Check if two types are consistent (gradual typing).
    Any is consistent with everything.
    Two non-Any types are consistent if they're equal
    or their structure matches with consistent components.
    """
    # Your implementation here
    pass

def join_types(t1, t2):
    """
    Find the join (least upper bound) of two types.
    Returns Any if types are inconsistent.
    """
    # Your implementation here
    pass

def check_assignment(declared_type, value_type) -> bool:
    """
    Check if a value of value_type can be assigned to declared_type.
    Uses consistency checking.
    """
    # Your implementation here
    pass`,
    solution: `from typing import Any, Union, Optional

def consistent(t1, t2) -> bool:
    # Any is consistent with everything
    if t1 == 'Any' or t2 == 'Any':
        return True

    # Same types are consistent
    if t1 == t2:
        return True

    # Check structural types
    if isinstance(t1, tuple) and isinstance(t2, tuple):
        if t1[0] != t2[0]:
            return False

        if t1[0] == 'list':
            return consistent(t1[1], t2[1])

        if t1[0] == 'func':
            _, args1, ret1 = t1
            _, args2, ret2 = t2
            if len(args1) != len(args2):
                return False
            return (all(consistent(a1, a2) for a1, a2 in zip(args1, args2))
                    and consistent(ret1, ret2))

    return False

def join_types(t1, t2):
    if t1 == t2:
        return t1
    if t1 == 'Any' or t2 == 'Any':
        return 'Any'
    if consistent(t1, t2):
        # For consistent non-equal types, return Any
        return 'Any'
    return 'Any'

def check_assignment(declared_type, value_type) -> bool:
    return consistent(declared_type, value_type)`,
    testCases: [
      { input: "consistent('int', 'int')", isHidden: false, description: 'Test case' },
      { input: "consistent('Any', 'str')", isHidden: false, description: 'Test case' },
      { input: "consistent('int', 'str')", isHidden: false, description: 'Test case' },
      { input: "consistent(('list', 'int'), ('list', 'Any'))", isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Any is consistent with all types',
      'Structural types require recursive consistency check',
      'Join returns most general type covering both inputs'
    ],
    language: 'python'
  },
  {
    id: 'cs303-ex-2-16',
    subjectId: 'cs303',
    topicId: 'cs303-topic-2',
    title: 'Type Class Simulation',
    difficulty: 5,
    description: 'Simulate Haskell-style type classes in Python.',
    starterCode: `from typing import TypeVar, Generic, Dict, Type, Callable
from abc import ABC, abstractmethod

T = TypeVar('T')

class Eq(ABC, Generic[T]):
    """Type class for equality comparison."""

    @staticmethod
    @abstractmethod
    def eq(a: T, b: T) -> bool:
        pass

class Ord(Eq[T], Generic[T]):
    """Type class for ordering (extends Eq)."""

    @staticmethod
    @abstractmethod
    def lt(a: T, b: T) -> bool:
        pass

    @staticmethod
    def lte(a: T, b: T) -> bool:
        """Less than or equal - default implementation."""
        pass

# Type class instances registry
_instances: Dict[tuple, type] = {}

def register_instance(typeclass: type, for_type: type, instance: type):
    """Register a type class instance."""
    pass

def get_instance(typeclass: type, for_type: type):
    """Get type class instance for a type."""
    pass

# Implement instances for int
class IntEq(Eq[int]):
    @staticmethod
    def eq(a: int, b: int) -> bool:
        pass

class IntOrd(Ord[int]):
    @staticmethod
    def eq(a: int, b: int) -> bool:
        pass

    @staticmethod
    def lt(a: int, b: int) -> bool:
        pass`,
    solution: `from typing import TypeVar, Generic, Dict, Type
from abc import ABC, abstractmethod

T = TypeVar('T')

class Eq(ABC, Generic[T]):
    @staticmethod
    @abstractmethod
    def eq(a: T, b: T) -> bool:
        pass

class Ord(Eq[T], Generic[T]):
    @staticmethod
    @abstractmethod
    def lt(a: T, b: T) -> bool:
        pass

    @classmethod
    def lte(cls, a: T, b: T) -> bool:
        return cls.lt(a, b) or cls.eq(a, b)

_instances: Dict[tuple, type] = {}

def register_instance(typeclass: type, for_type: type, instance: type):
    _instances[(typeclass, for_type)] = instance

def get_instance(typeclass: type, for_type: type):
    return _instances.get((typeclass, for_type))

class IntEq(Eq[int]):
    @staticmethod
    def eq(a: int, b: int) -> bool:
        return a == b

class IntOrd(Ord[int]):
    @staticmethod
    def eq(a: int, b: int) -> bool:
        return a == b

    @staticmethod
    def lt(a: int, b: int) -> bool:
        return a < b

register_instance(Eq, int, IntEq)
register_instance(Ord, int, IntOrd)`,
    testCases: [
      { input: 'IntEq.eq(1, 1)', isHidden: false, description: 'Test case' },
      { input: 'IntOrd.lt(1, 2)', isHidden: false, description: 'Test case' },
      { input: 'IntOrd.lte(2, 2)', isHidden: false, description: 'Test case' },
      { input: 'get_instance(Eq, int).__name__', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Type classes define interfaces with default implementations',
      'Instances implement type classes for specific types',
      'Registry maps (typeclass, type) pairs to instances'
    ],
    language: 'python'
  }
];
