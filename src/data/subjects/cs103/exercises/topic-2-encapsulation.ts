import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'cs103-ex-2',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Validated Temperature',
    difficulty: 2,
    description:
      'Create a `Temperature` class storing a temperature in Celsius. Use a property `celsius` with a setter that rejects values below -273.15 (absolute zero).',
    starterCode:
      'class Temperature:\n' +
      '    def __init__(self, celsius):\n' +
      '        # TODO\n' +
      '        pass\n' +
      '\n' +
      '    @property\n' +
      '    def celsius(self):\n' +
      '        pass\n' +
      '\n' +
      '    @celsius.setter\n' +
      '    def celsius(self, value):\n' +
      '        # TODO: raise ValueError if value < -273.15\n' +
      '        pass\n',
    solution:
      'class Temperature:\n' +
      '    def __init__(self, celsius):\n' +
      '        self.celsius = celsius\n' +
      '\n' +
      '    @property\n' +
      '    def celsius(self):\n' +
      '        return self._celsius\n' +
      '\n' +
      '    @celsius.setter\n' +
      '    def celsius(self, value):\n' +
      '        if value < -273.15:\n' +
      '            raise ValueError("Temperature below absolute zero")\n' +
      '        self._celsius = value\n',
    testCases: [
      { input: 't = Temperature(0)\nprint(t.celsius)', isHidden: false, description: 'Initial value stored' },
      {
        input: 't = Temperature(1)\nt.celsius = 10\nprint(t.celsius)',
        isHidden: false,
        description: 'Setter updates',
      },
      {
        input: 'try:\n    Temperature(-300)\n    print("no")\nexcept ValueError:\n    print("yes")',
        isHidden: true,
        description: 'Reject below absolute zero',
      },
    ],
    hints: ['Use a backing field like `self._celsius`', 'In `__init__`, assign through the property to reuse validation'],
    language: 'python',
  },
  {
    id: 'cs103-t2-ex02',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Read-Only Full Name',
    difficulty: 1,
    description: 'Create a `User` class with `first_name` and `last_name` and a read-only property `full_name`.',
    starterCode:
      'class User:\n' +
      '    def __init__(self, first_name, last_name):\n' +
      '        pass\n' +
      '\n' +
      '    @property\n' +
      '    def full_name(self):\n' +
      '        pass\n',
    solution:
      'class User:\n' +
      '    def __init__(self, first_name, last_name):\n' +
      '        self.first_name = first_name\n' +
      '        self.last_name = last_name\n' +
      '\n' +
      '    @property\n' +
      '    def full_name(self):\n' +
      '        return f"{self.first_name} {self.last_name}".strip()\n',
    testCases: [
      { input: 'u = User("Ada", "Lovelace")\nprint(u.full_name)', isHidden: false, description: 'Combines names' },
      { input: 'u = User("Ada", "")\nprint(u.full_name)', isHidden: true, description: 'Handles missing last name' },
      { input: 'u = User("", "Lovelace")\nprint(u.full_name)', isHidden: true, description: 'Handles missing first name' },
    ],
    hints: ['Use `@property` for a computed attribute', 'Return a string built from first/last name'],
    language: 'python',
  },
  {
    id: 'cs103-t2-ex03',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Protected Balance with Methods',
    difficulty: 2,
    description:
      'Create an `Account` class that stores its balance in `_balance` and only changes it through `deposit(amount)` and `withdraw(amount)`. Reject negative deposits/withdrawals.',
    starterCode:
      'class Account:\n' +
      '    def __init__(self, initial_balance=0):\n' +
      '        pass\n' +
      '\n' +
      '    def deposit(self, amount):\n' +
      '        pass\n' +
      '\n' +
      '    def withdraw(self, amount):\n' +
      '        pass\n' +
      '\n' +
      '    def get_balance(self):\n' +
      '        pass\n',
    solution:
      'class Account:\n' +
      '    def __init__(self, initial_balance=0):\n' +
      '        self._balance = initial_balance\n' +
      '\n' +
      '    def deposit(self, amount):\n' +
      '        if amount < 0:\n' +
      '            raise ValueError("amount must be >= 0")\n' +
      '        self._balance += amount\n' +
      '\n' +
      '    def withdraw(self, amount):\n' +
      '        if amount < 0:\n' +
      '            raise ValueError("amount must be >= 0")\n' +
      '        if amount > self._balance:\n' +
      '            return False\n' +
      '        self._balance -= amount\n' +
      '        return True\n' +
      '\n' +
      '    def get_balance(self):\n' +
      '        return self._balance\n',
    testCases: [
      { input: 'a = Account(10)\na.deposit(5)\nprint(a.get_balance())', isHidden: false, description: 'Deposit works' },
      { input: 'a = Account(10)\nprint(a.withdraw(7), a.get_balance())', isHidden: false, description: 'Withdraw returns True and updates balance' },
      { input: 'a = Account(10)\nprint(a.withdraw(99), a.get_balance())', isHidden: true, description: 'Over-withdraw returns False' },
    ],
    hints: ['Use `_balance` backing field', 'Raise for negative amounts', 'Return False if insufficient funds'],
    language: 'python',
  },
  {
    id: 'cs103-t2-ex04',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Email Property Validation',
    difficulty: 3,
    description: 'Create a `Profile` class with an `email` property. Reject emails that do not contain exactly one `@`.',
    starterCode:
      'class Profile:\n' +
      '    def __init__(self, email):\n' +
      '        pass\n' +
      '\n' +
      '    @property\n' +
      '    def email(self):\n' +
      '        pass\n' +
      '\n' +
      '    @email.setter\n' +
      '    def email(self, value):\n' +
      '        pass\n',
    solution:
      'class Profile:\n' +
      '    def __init__(self, email):\n' +
      '        self.email = email\n' +
      '\n' +
      '    @property\n' +
      '    def email(self):\n' +
      '        return self._email\n' +
      '\n' +
      '    @email.setter\n' +
      '    def email(self, value):\n' +
      '        if value.count("@") != 1:\n' +
      '            raise ValueError("invalid email")\n' +
      '        self._email = value\n',
    testCases: [
      { input: 'p = Profile("a@b")\nprint(p.email)', isHidden: false, description: 'Valid email' },
      {
        input: 'try:\n    Profile("ab")\n    print("no")\nexcept ValueError:\n    print("yes")',
        isHidden: false,
        description: 'Missing @ invalid',
      },
      {
        input: 'p = Profile("a@b")\np.email = "x@y"\nprint(p.email)',
        isHidden: true,
        description: 'Setter re-validates',
      },
    ],
    hints: ['Store backing field like `_email`', 'Use `value.count("@")` to validate'],
    language: 'python',
  },
  {
    id: 'cs103-t2-ex05',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Defensive Copy for List',
    difficulty: 3,
    description:
      'Create a `Bag` class that stores items internally and exposes an `items` property that returns a copy (so callers cannot mutate internal state directly).',
    starterCode:
      'class Bag:\n' +
      '    def __init__(self, items=None):\n' +
      '        pass\n' +
      '\n' +
      '    def add(self, item):\n' +
      '        pass\n' +
      '\n' +
      '    @property\n' +
      '    def items(self):\n' +
      '        pass\n',
    solution:
      'class Bag:\n' +
      '    def __init__(self, items=None):\n' +
      '        self._items = list(items) if items is not None else []\n' +
      '\n' +
      '    def add(self, item):\n' +
      '        self._items.append(item)\n' +
      '\n' +
      '    @property\n' +
      '    def items(self):\n' +
      '        return list(self._items)\n',
    testCases: [
      { input: 'b = Bag([1, 2]); copy = b.items; copy.append(3)\nprint(b.items)', isHidden: false, description: 'Mutation of copy does not affect bag' },
      { input: 'b = Bag(); b.add("x"); print(b.items)', isHidden: false, description: 'Add works' },
      { input: 'b = Bag(None); print(b.items)', isHidden: true, description: 'None initializes to empty' },
    ],
    hints: ['Store internal list as `_items`', 'Return `list(self._items)` from the property'],
    language: 'python',
  },
  {
    id: 'cs103-t2-ex06',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Read-Only ID with Name Mangling',
    difficulty: 2,
    description: 'Create a `Ticket` class with a “private” `__id` field set in `__init__` and a read-only `id` property.',
    starterCode:
      'class Ticket:\n' +
      '    def __init__(self, ticket_id):\n' +
      '        pass\n' +
      '\n' +
      '    @property\n' +
      '    def id(self):\n' +
      '        pass\n',
    solution:
      'class Ticket:\n' +
      '    def __init__(self, ticket_id):\n' +
      '        self.__id = ticket_id\n' +
      '\n' +
      '    @property\n' +
      '    def id(self):\n' +
      '        return self.__id\n',
    testCases: [
      { input: 't = Ticket(123)\nprint(t.id)', isHidden: false, description: 'Expose id via property' },
      { input: 't = Ticket(1)\nprint(hasattr(t, "__id"), hasattr(t, "_Ticket__id"))', isHidden: true, description: 'Name mangling' },
      { input: 't = Ticket("x")\nprint(t.id)', isHidden: true, description: 'Works for any value type' },
    ],
    hints: ['Store as `self.__id`', 'Expose via `@property def id(self): return ...`'],
    language: 'python',
  },
  {
    id: 'cs103-t2-ex07',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Clamped Volume (0–100)',
    difficulty: 3,
    description: 'Create a `Speaker` class with a `volume` property that clamps values into the range 0..100.',
    starterCode:
      'class Speaker:\n' +
      '    def __init__(self, volume=50):\n' +
      '        pass\n' +
      '\n' +
      '    @property\n' +
      '    def volume(self):\n' +
      '        pass\n' +
      '\n' +
      '    @volume.setter\n' +
      '    def volume(self, value):\n' +
      '        pass\n',
    solution:
      'class Speaker:\n' +
      '    def __init__(self, volume=50):\n' +
      '        self.volume = volume\n' +
      '\n' +
      '    @property\n' +
      '    def volume(self):\n' +
      '        return self._volume\n' +
      '\n' +
      '    @volume.setter\n' +
      '    def volume(self, value):\n' +
      '        if value < 0:\n' +
      '            value = 0\n' +
      '        if value > 100:\n' +
      '            value = 100\n' +
      '        self._volume = value\n',
    testCases: [
      { input: 's = Speaker(-10)\nprint(s.volume)', isHidden: false, description: 'Clamps low' },
      { input: 's = Speaker(999)\nprint(s.volume)', isHidden: false, description: 'Clamps high' },
      { input: 's = Speaker(); s.volume = 80\nprint(s.volume)', isHidden: true, description: 'Setter works' },
    ],
    hints: ['Assign through the property in `__init__`', 'Clamp values below 0 and above 100'],
    language: 'python',
  },
  {
    id: 'cs103-t2-ex08',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Immutable Money Value Object',
    difficulty: 4,
    description:
      'Create a `Money` class with `amount` and `currency`. Prevent changing these after initialization by making them read-only properties.',
    starterCode:
      'class Money:\n' +
      '    def __init__(self, amount, currency):\n' +
      '        pass\n' +
      '\n' +
      '    @property\n' +
      '    def amount(self):\n' +
      '        pass\n' +
      '\n' +
      '    @property\n' +
      '    def currency(self):\n' +
      '        pass\n',
    solution:
      'class Money:\n' +
      '    def __init__(self, amount, currency):\n' +
      '        self._amount = amount\n' +
      '        self._currency = currency\n' +
      '\n' +
      '    @property\n' +
      '    def amount(self):\n' +
      '        return self._amount\n' +
      '\n' +
      '    @property\n' +
      '    def currency(self):\n' +
      '        return self._currency\n',
    testCases: [
      { input: 'm = Money(10, "USD")\nprint(m.amount, m.currency)', isHidden: false, description: 'Stores values' },
      {
        input: 'm = Money(1, "USD")\ntry:\n    m.amount = 2\n    print("no")\nexcept AttributeError:\n    print("yes")',
        isHidden: false,
        description: 'Read-only amount',
      },
      {
        input: 'm = Money(1, "USD")\ntry:\n    m.currency = "EUR"\n    print("no")\nexcept AttributeError:\n    print("yes")',
        isHidden: true,
        description: 'Read-only currency',
      },
    ],
    hints: ['Expose read-only properties (no setters)', 'Store backing fields like `_amount`'],
    language: 'python',
  },
  {
    id: 'cs103-t2-ex09',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Lazy Computed Property',
    difficulty: 4,
    description:
      'Create a `Text` class with a string `value`. Provide a property `word_count` that computes the count of words (split by whitespace).',
    starterCode:
      'class Text:\n' +
      '    def __init__(self, value):\n' +
      '        pass\n' +
      '\n' +
      '    @property\n' +
      '    def word_count(self):\n' +
      '        pass\n',
    solution:
      'class Text:\n' +
      '    def __init__(self, value):\n' +
      '        self.value = value\n' +
      '\n' +
      '    @property\n' +
      '    def word_count(self):\n' +
      '        parts = self.value.split()\n' +
      '        return len(parts)\n',
    testCases: [
      { input: 't = Text("hello world")\nprint(t.word_count)', isHidden: false, description: 'Two words' },
      { input: 't = Text("  a   b c  ")\nprint(t.word_count)', isHidden: true, description: 'Multiple spaces' },
      { input: 't = Text("")\nprint(t.word_count)', isHidden: true, description: 'Empty string' },
    ],
    hints: ['Use `split()` without arguments', 'Return `len(...)`'],
    language: 'python',
  },
  {
    id: 'cs103-t2-ex10',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Validated Age (0–130)',
    difficulty: 3,
    description: 'Create a `Person` class with an `age` property that must be between 0 and 130 (inclusive).',
    starterCode:
      'class Person:\n' +
      '    def __init__(self, age):\n' +
      '        pass\n' +
      '\n' +
      '    @property\n' +
      '    def age(self):\n' +
      '        pass\n' +
      '\n' +
      '    @age.setter\n' +
      '    def age(self, value):\n' +
      '        pass\n',
    solution:
      'class Person:\n' +
      '    def __init__(self, age):\n' +
      '        self.age = age\n' +
      '\n' +
      '    @property\n' +
      '    def age(self):\n' +
      '        return self._age\n' +
      '\n' +
      '    @age.setter\n' +
      '    def age(self, value):\n' +
      '        if value < 0 or value > 130:\n' +
      '            raise ValueError("invalid age")\n' +
      '        self._age = value\n',
    testCases: [
      { input: 'p = Person(0)\nprint(p.age)', isHidden: false, description: 'Lower bound' },
      { input: 'p = Person(130)\nprint(p.age)', isHidden: true, description: 'Upper bound' },
      { input: 'try:\n    Person(131)\n    print("no")\nexcept ValueError:\n    print("yes")', isHidden: false, description: 'Out of range raises' },
    ],
    hints: ['Validate in the setter', 'Assign through the property in `__init__`'],
    language: 'python',
  },
  {
    id: 'cs103-t2-ex11',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Settings with Dependent Values',
    difficulty: 4,
    description:
      'Create a `Settings` class with a boolean `debug` property. When `debug` is set to True, also set `log_level` to `"DEBUG"`. Otherwise set it to `"INFO"`.',
    starterCode:
      'class Settings:\n' +
      '    def __init__(self):\n' +
      '        pass\n' +
      '\n' +
      '    @property\n' +
      '    def debug(self):\n' +
      '        pass\n' +
      '\n' +
      '    @debug.setter\n' +
      '    def debug(self, value):\n' +
      '        pass\n' +
      '\n' +
      '    @property\n' +
      '    def log_level(self):\n' +
      '        pass\n',
    solution:
      'class Settings:\n' +
      '    def __init__(self):\n' +
      '        self._debug = False\n' +
      '        self._log_level = "INFO"\n' +
      '\n' +
      '    @property\n' +
      '    def debug(self):\n' +
      '        return self._debug\n' +
      '\n' +
      '    @debug.setter\n' +
      '    def debug(self, value):\n' +
      '        self._debug = bool(value)\n' +
      '        self._log_level = "DEBUG" if self._debug else "INFO"\n' +
      '\n' +
      '    @property\n' +
      '    def log_level(self):\n' +
      '        return self._log_level\n',
    testCases: [
      { input: 's = Settings()\nprint(s.debug, s.log_level)', isHidden: false, description: 'Default values' },
      { input: 's = Settings(); s.debug = True\nprint(s.debug, s.log_level)', isHidden: false, description: 'Debug toggles level' },
      { input: 's = Settings(); s.debug = True; s.debug = False\nprint(s.log_level)', isHidden: true, description: 'Back to INFO' },
    ],
    hints: ['Update dependent state in the setter', 'Expose `log_level` as read-only'],
    language: 'python',
  },
  {
    id: 'cs103-t2-ex12',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Rate Limited Counter',
    difficulty: 4,
    description:
      'Create a `RateLimitedCounter` with a max value `limit`. The `increment()` method increases the counter but must never exceed the limit.',
    starterCode:
      'class RateLimitedCounter:\n' +
      '    def __init__(self, limit):\n' +
      '        pass\n' +
      '\n' +
      '    def increment(self):\n' +
      '        pass\n' +
      '\n' +
      '    def value(self):\n' +
      '        pass\n',
    solution:
      'class RateLimitedCounter:\n' +
      '    def __init__(self, limit):\n' +
      '        self._limit = limit\n' +
      '        self._value = 0\n' +
      '\n' +
      '    def increment(self):\n' +
      '        if self._value < self._limit:\n' +
      '            self._value += 1\n' +
      '\n' +
      '    def value(self):\n' +
      '        return self._value\n',
    testCases: [
      { input: 'c = RateLimitedCounter(2)\nc.increment(); c.increment(); c.increment()\nprint(c.value())', isHidden: false, description: 'Stops at limit' },
      { input: 'c = RateLimitedCounter(0)\nc.increment()\nprint(c.value())', isHidden: true, description: 'Zero limit' },
      { input: 'c = RateLimitedCounter(1)\nprint(c.value())', isHidden: true, description: 'Starts at 0' },
    ],
    hints: ['Store `_limit` and `_value`', 'Only increment while `_value < _limit`'],
    language: 'python',
  },
  {
    id: 'cs103-t2-ex13',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Sanitized Username',
    difficulty: 5,
    description:
      'Create an `Account` class with a `username` property. The setter should strip whitespace and reject empty usernames.',
    starterCode:
      'class Account:\n' +
      '    def __init__(self, username):\n' +
      '        pass\n' +
      '\n' +
      '    @property\n' +
      '    def username(self):\n' +
      '        pass\n' +
      '\n' +
      '    @username.setter\n' +
      '    def username(self, value):\n' +
      '        pass\n',
    solution:
      'class Account:\n' +
      '    def __init__(self, username):\n' +
      '        self.username = username\n' +
      '\n' +
      '    @property\n' +
      '    def username(self):\n' +
      '        return self._username\n' +
      '\n' +
      '    @username.setter\n' +
      '    def username(self, value):\n' +
      '        value = str(value).strip()\n' +
      '        if value == "":\n' +
      '            raise ValueError("username cannot be empty")\n' +
      '        self._username = value\n',
    testCases: [
      { input: 'a = Account("  alice  ")\nprint(a.username)', isHidden: false, description: 'Strips whitespace' },
      { input: 'try:\n    Account("   ")\n    print("no")\nexcept ValueError:\n    print("yes")', isHidden: false, description: 'Rejects empty after strip' },
      { input: 'a = Account("bob"); a.username = "  bobby "\\nprint(a.username)', isHidden: true, description: 'Setter sanitizes too' },
    ],
    hints: ['Use `strip()`', 'Validate after stripping', 'Store a backing field like `_username`'],
    language: 'python',
  },
  {
    id: 'cs103-t2-ex14',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Safe Dictionary Exposure',
    difficulty: 5,
    description:
      'Create a `Headers` class that stores a dict of headers internally. Expose a `data` property that returns a copy so callers can’t mutate internal state.',
    starterCode:
      'class Headers:\n' +
      '    def __init__(self, initial=None):\n' +
      '        pass\n' +
      '\n' +
      '    def set(self, key, value):\n' +
      '        pass\n' +
      '\n' +
      '    @property\n' +
      '    def data(self):\n' +
      '        pass\n',
    solution:
      'class Headers:\n' +
      '    def __init__(self, initial=None):\n' +
      '        self._data = dict(initial) if initial is not None else {}\n' +
      '\n' +
      '    def set(self, key, value):\n' +
      '        self._data[key] = value\n' +
      '\n' +
      '    @property\n' +
      '    def data(self):\n' +
      '        return dict(self._data)\n',
    testCases: [
      { input: 'h = Headers({"a": "1"}); d = h.data; d["a"] = "9"; print(h.data["a"])', isHidden: false, description: 'Copy prevents mutation' },
      { input: 'h = Headers(); h.set("x", "y"); print(h.data)', isHidden: false, description: 'Set adds key' },
      { input: 'h = Headers({"a": "1"}); print(sorted(list(h.data.keys())))', isHidden: true, description: 'Keys preserved' },
    ],
    hints: ['Use `dict(...)` to copy a dict', 'Never return the internal dict directly'],
    language: 'python',
  },
  {
    id: 'cs103-t2-drill-1',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Getter-Only Property',
    difficulty: 1,
    description: 'Create a `Config` class with a read-only `version` property set in the constructor.',
    starterCode:
      'class Config:\n' +
      '    def __init__(self, version):\n' +
      '        pass\n' +
      '\n' +
      '    @property\n' +
      '    def version(self):\n' +
      '        pass\n',
    solution:
      'class Config:\n' +
      '    def __init__(self, version):\n' +
      '        self._version = version\n' +
      '\n' +
      '    @property\n' +
      '    def version(self):\n' +
      '        return self._version\n',
    testCases: [
      { input: 'c = Config("1.0")\nprint(c.version)', isHidden: false, description: 'Read version' },
      { input: 'c = Config(2)\nprint(c.version)', isHidden: true, description: 'Any type' },
      { input: 'c = Config("x")\ntry:\n    c.version = "y"\n    print("no")\nexcept AttributeError:\n    print("yes")', isHidden: true, description: 'No setter' },
    ],
    hints: ['Store a backing field', 'Provide a property without a setter'],
    language: 'python',
  },
  {
    id: 'cs103-t2-drill-2',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Simple Validation',
    difficulty: 1,
    description: 'Create a `Percentage` class with a `value` property that must be between 0 and 100 inclusive.',
    starterCode:
      'class Percentage:\n' +
      '    def __init__(self, value):\n' +
      '        pass\n' +
      '\n' +
      '    @property\n' +
      '    def value(self):\n' +
      '        pass\n' +
      '\n' +
      '    @value.setter\n' +
      '    def value(self, v):\n' +
      '        pass\n',
    solution:
      'class Percentage:\n' +
      '    def __init__(self, value):\n' +
      '        self.value = value\n' +
      '\n' +
      '    @property\n' +
      '    def value(self):\n' +
      '        return self._value\n' +
      '\n' +
      '    @value.setter\n' +
      '    def value(self, v):\n' +
      '        if v < 0 or v > 100:\n' +
      '            raise ValueError("out of range")\n' +
      '        self._value = v\n',
    testCases: [
      { input: 'p = Percentage(50)\nprint(p.value)', isHidden: false, description: 'Stores 50' },
      { input: 'try:\n    Percentage(-1)\n    print("no")\nexcept ValueError:\n    print("yes")', isHidden: false, description: 'Rejects -1' },
      { input: 'p = Percentage(0); p.value = 100\nprint(p.value)', isHidden: true, description: 'Setter accepts bounds' },
    ],
    hints: ['Validate in setter', 'Assign through property in `__init__`'],
    language: 'python',
  },
];

