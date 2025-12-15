import { CodingExercise } from '../../../../core/types';

export const topic6Exercises: CodingExercise[] = [
  {
    id: 'cs103-ex-6',
    subjectId: 'cs103',
    topicId: 'cs103-6',
    title: 'Abstract Storage Interface (ABC)',
    difficulty: 3,
    description:
      'Define an abstract base class `Storage` with abstract methods `save(key, value)` and `load(key)`. Implement `InMemoryStorage` using a dict.',
    starterCode:
      'from abc import ABC, abstractmethod\n' +
      '\n' +
      'class Storage(ABC):\n' +
      '    @abstractmethod\n' +
      '    def save(self, key, value):\n' +
      '        pass\n' +
      '\n' +
      '    @abstractmethod\n' +
      '    def load(self, key):\n' +
      '        pass\n' +
      '\n' +
      'class InMemoryStorage(Storage):\n' +
      '    def __init__(self):\n' +
      '        pass\n' +
      '    def save(self, key, value):\n' +
      '        pass\n' +
      '    def load(self, key):\n' +
      '        pass\n',
    solution:
      'from abc import ABC, abstractmethod\n' +
      '\n' +
      'class Storage(ABC):\n' +
      '    @abstractmethod\n' +
      '    def save(self, key, value):\n' +
      '        raise NotImplementedError\n' +
      '\n' +
      '    @abstractmethod\n' +
      '    def load(self, key):\n' +
      '        raise NotImplementedError\n' +
      '\n' +
      'class InMemoryStorage(Storage):\n' +
      '    def __init__(self):\n' +
      '        self._data = {}\n' +
      '    def save(self, key, value):\n' +
      '        self._data[key] = value\n' +
      '    def load(self, key):\n' +
      '        return self._data.get(key)\n',
    testCases: [
      { input: 's = InMemoryStorage(); s.save("a", "1"); print(s.load("a"))', isHidden: false, description: 'Save then load' },
      { input: 's = InMemoryStorage(); print(s.load("missing"))', isHidden: true, description: 'Missing key returns None' },
      { input: 'from abc import ABC\nprint(isinstance(InMemoryStorage(), Storage))', isHidden: true, description: 'Implements Storage' },
    ],
    hints: ['Use `abc.ABC` + `@abstractmethod`', 'Use a dict for the in-memory implementation'],
    language: 'python',
  },
  {
    id: 'cs103-t6-ex02',
    subjectId: 'cs103',
    topicId: 'cs103-6',
    title: 'Template Method: Report Rendering',
    difficulty: 4,
    description:
      'Create an abstract class `Report` with method `render()` that calls abstract methods `title()` and `body()`. Implement `SalesReport`.',
    starterCode:
      'from abc import ABC, abstractmethod\n' +
      '\n' +
      'class Report(ABC):\n' +
      '    def render(self):\n' +
      '        # TODO: use title() and body()\n' +
      '        pass\n' +
      '\n' +
      '    @abstractmethod\n' +
      '    def title(self):\n' +
      '        pass\n' +
      '\n' +
      '    @abstractmethod\n' +
      '    def body(self):\n' +
      '        pass\n' +
      '\n' +
      'class SalesReport(Report):\n' +
      '    def title(self):\n' +
      '        pass\n' +
      '    def body(self):\n' +
      '        pass\n',
    solution:
      'from abc import ABC, abstractmethod\n' +
      '\n' +
      'class Report(ABC):\n' +
      '    def render(self):\n' +
      '        return f"=== {self.title()} ===\\n{self.body()}\\n"\n' +
      '\n' +
      '    @abstractmethod\n' +
      '    def title(self):\n' +
      '        raise NotImplementedError\n' +
      '\n' +
      '    @abstractmethod\n' +
      '    def body(self):\n' +
      '        raise NotImplementedError\n' +
      '\n' +
      'class SalesReport(Report):\n' +
      '    def title(self):\n' +
      '        return "Sales"\n' +
      '    def body(self):\n' +
      '        return "Total: $1234"\n',
    testCases: [
      { input: 'print(SalesReport().render())', isHidden: false, description: 'Render includes title and body' },
      { input: 'print(SalesReport().title(), SalesReport().body())', isHidden: true, description: 'Concrete methods exist' },
      { input: 'try:\n    Report()\n    print("no")\nexcept TypeError:\n    print("yes")', isHidden: true, description: 'Cannot instantiate abstract base' },
    ],
    hints: ['`render()` should call `self.title()` and `self.body()`', 'Mark abstract methods with `@abstractmethod`'],
    language: 'python',
  },
  {
    id: 'cs103-t6-ex03',
    subjectId: 'cs103',
    topicId: 'cs103-6',
    title: 'Dependency Injection: Notifier',
    difficulty: 3,
    description:
      'Create `EmailSender` with `send(to, msg)` returning a string, and `Notifier` that receives a sender in its constructor and uses it in `welcome(email)`.',
    starterCode:
      'class EmailSender:\n' +
      '    def send(self, to, msg):\n' +
      '        pass\n' +
      '\n' +
      'class Notifier:\n' +
      '    def __init__(self, sender):\n' +
      '        pass\n' +
      '    def welcome(self, email):\n' +
      '        pass\n',
    solution:
      'class EmailSender:\n' +
      '    def send(self, to, msg):\n' +
      '        return f"email:{to}:{msg}"\n' +
      '\n' +
      'class Notifier:\n' +
      '    def __init__(self, sender):\n' +
      '        self.sender = sender\n' +
      '    def welcome(self, email):\n' +
      '        return self.sender.send(email, "Welcome")\n',
    testCases: [
      { input: 'print(Notifier(EmailSender()).welcome("a@b"))', isHidden: false, description: 'Uses injected sender' },
      { input: 'class Fake:\n    def __init__(self): self.calls=[]\n    def send(self, to, msg): self.calls.append((to,msg)); return "ok"\n\nf=Fake(); n=Notifier(f); print(n.welcome("x"), f.calls)', isHidden: false, description: 'Fake sender captures calls' },
      { input: 'print(Notifier(EmailSender()).welcome(""))', isHidden: true, description: 'Empty email still delegated' },
    ],
    hints: ['Store sender on `self`', 'Delegate inside `welcome`'],
    language: 'python',
  },
  {
    id: 'cs103-t6-ex04',
    subjectId: 'cs103',
    topicId: 'cs103-6',
    title: 'Protocol-Style Interface (Duck Typing)',
    difficulty: 2,
    description:
      'Create `ConsoleWriter` and `BufferWriter` each with `write(text)`. `BufferWriter` should store written text in `buffer`. Create `Logger` that accepts any writer.',
    starterCode:
      'class ConsoleWriter:\n' +
      '    def write(self, text):\n' +
      '        pass\n' +
      '\n' +
      'class BufferWriter:\n' +
      '    def __init__(self):\n' +
      '        pass\n' +
      '    def write(self, text):\n' +
      '        pass\n' +
      '\n' +
      'class Logger:\n' +
      '    def __init__(self, writer):\n' +
      '        pass\n' +
      '    def log(self, msg):\n' +
      '        pass\n',
    solution:
      'class ConsoleWriter:\n' +
      '    def write(self, text):\n' +
      '        print(text, end="")\n' +
      '\n' +
      'class BufferWriter:\n' +
      '    def __init__(self):\n' +
      '        self.buffer = ""\n' +
      '    def write(self, text):\n' +
      '        self.buffer += text\n' +
      '\n' +
      'class Logger:\n' +
      '    def __init__(self, writer):\n' +
      '        self.writer = writer\n' +
      '    def log(self, msg):\n' +
      '        self.writer.write(msg + "\\n")\n',
    testCases: [
      { input: 'w = BufferWriter(); Logger(w).log("hi"); print(w.buffer)', isHidden: false, description: 'Buffer captures output' },
      { input: 'w = BufferWriter(); Logger(w).log(""); print(w.buffer)', isHidden: true, description: 'Empty message still newline' },
      { input: 'w = BufferWriter(); l = Logger(w); l.log("a"); l.log("b"); print(w.buffer)', isHidden: true, description: 'Multiple logs' },
    ],
    hints: ['Logger should not care about concrete writer type', 'BufferWriter stores text instead of printing'],
    language: 'python',
  },
  {
    id: 'cs103-t6-ex05',
    subjectId: 'cs103',
    topicId: 'cs103-6',
    title: 'Small Interface: Cache Contract',
    difficulty: 3,
    description:
      'Create a `Cache` base class with methods `get(key)` and `set(key, value)` raising NotImplementedError. Implement `DictCache`.',
    starterCode:
      'class Cache:\n' +
      '    def get(self, key):\n' +
      '        pass\n' +
      '    def set(self, key, value):\n' +
      '        pass\n' +
      '\n' +
      'class DictCache(Cache):\n' +
      '    def __init__(self):\n' +
      '        pass\n' +
      '    def get(self, key):\n' +
      '        pass\n' +
      '    def set(self, key, value):\n' +
      '        pass\n',
    solution:
      'class Cache:\n' +
      '    def get(self, key):\n' +
      '        raise NotImplementedError\n' +
      '    def set(self, key, value):\n' +
      '        raise NotImplementedError\n' +
      '\n' +
      'class DictCache(Cache):\n' +
      '    def __init__(self):\n' +
      '        self._data = {}\n' +
      '    def get(self, key):\n' +
      '        return self._data.get(key)\n' +
      '    def set(self, key, value):\n' +
      '        self._data[key] = value\n',
    testCases: [
      { input: 'c = DictCache(); c.set("a", 1); print(c.get("a"))', isHidden: false, description: 'Set/get' },
      { input: 'c = DictCache(); print(c.get("missing"))', isHidden: true, description: 'Missing is None' },
      { input: 'try:\n    Cache().get("a")\n    print("no")\nexcept NotImplementedError:\n    print("yes")', isHidden: true, description: 'Base raises' },
    ],
    hints: ['Define a small contract in the base', 'Implement using a dict'],
    language: 'python',
  },
  {
    id: 'cs103-t6-ex06',
    subjectId: 'cs103',
    topicId: 'cs103-6',
    title: 'Interface Segregation: Split Responsibilities',
    difficulty: 4,
    description:
      'Create `Reader` with `read()` and `Writer` with `write(text)`. Implement `MemoryFile` that supports both (stores text internally).',
    starterCode:
      'class Reader:\n' +
      '    def read(self):\n' +
      '        pass\n' +
      '\n' +
      'class Writer:\n' +
      '    def write(self, text):\n' +
      '        pass\n' +
      '\n' +
      'class MemoryFile(Reader, Writer):\n' +
      '    def __init__(self):\n' +
      '        pass\n' +
      '    def read(self):\n' +
      '        pass\n' +
      '    def write(self, text):\n' +
      '        pass\n',
    solution:
      'class Reader:\n' +
      '    def read(self):\n' +
      '        raise NotImplementedError\n' +
      '\n' +
      'class Writer:\n' +
      '    def write(self, text):\n' +
      '        raise NotImplementedError\n' +
      '\n' +
      'class MemoryFile(Reader, Writer):\n' +
      '    def __init__(self):\n' +
      '        self._buf = ""\n' +
      '    def read(self):\n' +
      '        return self._buf\n' +
      '    def write(self, text):\n' +
      '        self._buf += text\n',
    testCases: [
      { input: 'f = MemoryFile(); f.write("a"); f.write("b"); print(f.read())', isHidden: false, description: 'Writes then reads' },
      { input: 'f = MemoryFile(); print(f.read())', isHidden: true, description: 'Starts empty' },
      { input: 'f = MemoryFile(); f.write(""); print(f.read())', isHidden: true, description: 'Empty write ok' },
    ],
    hints: ['Split interfaces by responsibility', 'Use a buffer string to store data'],
    language: 'python',
  },
  {
    id: 'cs103-t6-ex07',
    subjectId: 'cs103',
    topicId: 'cs103-6',
    title: 'LSP: Subclass Must Preserve Contract',
    difficulty: 4,
    description:
      'Create base class `Counter` with `inc()` returning the new count. Create `NonNegativeCounter` that never goes below 0 and still returns an int from `inc`/`dec`.',
    starterCode:
      'class Counter:\n' +
      '    def __init__(self):\n' +
      '        pass\n' +
      '    def inc(self):\n' +
      '        pass\n' +
      '    def dec(self):\n' +
      '        pass\n' +
      '\n' +
      'class NonNegativeCounter(Counter):\n' +
      '    def dec(self):\n' +
      '        pass\n',
    solution:
      'class Counter:\n' +
      '    def __init__(self):\n' +
      '        self._n = 0\n' +
      '    def inc(self):\n' +
      '        self._n += 1\n' +
      '        return self._n\n' +
      '    def dec(self):\n' +
      '        self._n -= 1\n' +
      '        return self._n\n' +
      '\n' +
      'class NonNegativeCounter(Counter):\n' +
      '    def dec(self):\n' +
      '        if self._n > 0:\n' +
      '            self._n -= 1\n' +
      '        return self._n\n',
    testCases: [
      { input: 'c = Counter(); print(c.inc(), c.inc())', isHidden: false, description: 'Base increments' },
      { input: 'c = NonNegativeCounter(); c.dec(); print(c.dec())', isHidden: false, description: 'Does not go below 0' },
      { input: 'c = NonNegativeCounter(); c.inc(); c.dec(); print(c.dec())', isHidden: true, description: 'Clamps at 0 after decrement' },
    ],
    hints: ['NonNegativeCounter should inherit base init', 'Override only dec() and preserve return type'],
    language: 'python',
  },
  {
    id: 'cs103-t6-ex08',
    subjectId: 'cs103',
    topicId: 'cs103-6',
    title: 'Abstract Property',
    difficulty: 5,
    description: 'Create an abstract base class `Animal` with an abstract property `sound`. Implement `Dog` and `Cat`.',
    starterCode:
      'from abc import ABC, abstractmethod\n' +
      '\n' +
      'class Animal(ABC):\n' +
      '    @property\n' +
      '    @abstractmethod\n' +
      '    def sound(self):\n' +
      '        pass\n' +
      '\n' +
      'class Dog(Animal):\n' +
      '    @property\n' +
      '    def sound(self):\n' +
      '        pass\n' +
      '\n' +
      'class Cat(Animal):\n' +
      '    @property\n' +
      '    def sound(self):\n' +
      '        pass\n',
    solution:
      'from abc import ABC, abstractmethod\n' +
      '\n' +
      'class Animal(ABC):\n' +
      '    @property\n' +
      '    @abstractmethod\n' +
      '    def sound(self):\n' +
      '        raise NotImplementedError\n' +
      '\n' +
      'class Dog(Animal):\n' +
      '    @property\n' +
      '    def sound(self):\n' +
      '        return "woof"\n' +
      '\n' +
      'class Cat(Animal):\n' +
      '    @property\n' +
      '    def sound(self):\n' +
      '        return "meow"\n',
    testCases: [
      { input: 'print(Dog().sound, Cat().sound)', isHidden: false, description: 'Concrete sounds' },
      { input: 'try:\n    Animal()\n    print("no")\nexcept TypeError:\n    print("yes")', isHidden: false, description: 'Animal abstract' },
      { input: 'print(isinstance(Dog(), Animal))', isHidden: true, description: 'Dog is Animal' },
    ],
    hints: ['Use `@property` + `@abstractmethod`', 'Concrete subclasses return strings'],
    language: 'python',
  },
  {
    id: 'cs103-t6-ex09',
    subjectId: 'cs103',
    topicId: 'cs103-6',
    title: 'Replace Inheritance with Composition',
    difficulty: 4,
    description:
      'Create `Compressor` objects with `compress(text)`. Create `GzipCompressor` and `NoOpCompressor`. Create `Archiver` that composes a compressor and calls it.',
    starterCode:
      'class GzipCompressor:\n' +
      '    def compress(self, text):\n' +
      '        pass\n' +
      '\n' +
      'class NoOpCompressor:\n' +
      '    def compress(self, text):\n' +
      '        pass\n' +
      '\n' +
      'class Archiver:\n' +
      '    def __init__(self, compressor):\n' +
      '        pass\n' +
      '    def archive(self, text):\n' +
      '        pass\n',
    solution:
      'class GzipCompressor:\n' +
      '    def compress(self, text):\n' +
      '        return "gz:" + text\n' +
      '\n' +
      'class NoOpCompressor:\n' +
      '    def compress(self, text):\n' +
      '        return text\n' +
      '\n' +
      'class Archiver:\n' +
      '    def __init__(self, compressor):\n' +
      '        self.compressor = compressor\n' +
      '    def archive(self, text):\n' +
      '        return self.compressor.compress(text)\n',
    testCases: [
      { input: 'print(Archiver(NoOpCompressor()).archive("a"))', isHidden: false, description: 'No-op' },
      { input: 'print(Archiver(GzipCompressor()).archive("a"))', isHidden: false, description: 'Gzip-like prefix' },
      { input: 'print(Archiver(GzipCompressor()).archive(""))', isHidden: true, description: 'Empty text' },
    ],
    hints: ['Archiver should not subclass compressor', 'Delegate to the injected compressor'],
    language: 'python',
  },
  {
    id: 'cs103-t6-ex10',
    subjectId: 'cs103',
    topicId: 'cs103-6',
    title: 'Open/Closed: Add New Rule Without Changes',
    difficulty: 5,
    description:
      'Create rule objects with `check(text)` returning True/False. Implement `MinLengthRule(n)` and `ContainsRule(substr)`. Create `Validator` that accepts a list of rules and returns True only if all pass.',
    starterCode:
      'class MinLengthRule:\n' +
      '    def __init__(self, n):\n' +
      '        pass\n' +
      '    def check(self, text):\n' +
      '        pass\n' +
      '\n' +
      'class ContainsRule:\n' +
      '    def __init__(self, substr):\n' +
      '        pass\n' +
      '    def check(self, text):\n' +
      '        pass\n' +
      '\n' +
      'class Validator:\n' +
      '    def __init__(self, rules):\n' +
      '        pass\n' +
      '    def is_valid(self, text):\n' +
      '        pass\n',
    solution:
      'class MinLengthRule:\n' +
      '    def __init__(self, n):\n' +
      '        self.n = n\n' +
      '    def check(self, text):\n' +
      '        return len(text) >= self.n\n' +
      '\n' +
      'class ContainsRule:\n' +
      '    def __init__(self, substr):\n' +
      '        self.substr = substr\n' +
      '    def check(self, text):\n' +
      '        return self.substr in text\n' +
      '\n' +
      'class Validator:\n' +
      '    def __init__(self, rules):\n' +
      '        self.rules = list(rules)\n' +
      '    def is_valid(self, text):\n' +
      '        return all(r.check(text) for r in self.rules)\n',
    testCases: [
      { input: 'v = Validator([MinLengthRule(3), ContainsRule("a")]); print(v.is_valid("cat"))', isHidden: false, description: 'Passes all rules' },
      { input: 'v = Validator([MinLengthRule(3), ContainsRule("a")]); print(v.is_valid("hi"))', isHidden: false, description: 'Fails length' },
      { input: 'v = Validator([ContainsRule("x")]); print(v.is_valid("abc"))', isHidden: true, description: 'Fails contains' },
    ],
    hints: ['Rules share the same method name: check()', 'Validator loops over rules and combines results'],
    language: 'python',
  },
  {
    id: 'cs103-t6-ex11',
    subjectId: 'cs103',
    topicId: 'cs103-6',
    title: 'Adapter for Different Interface',
    difficulty: 3,
    description:
      'Create `LegacyStore` with `put(k,v)` and `fetch(k)`. Create `StoreAdapter` that provides `save(k,v)` and `load(k)` by delegating.',
    starterCode:
      'class LegacyStore:\n' +
      '    def __init__(self):\n' +
      '        pass\n' +
      '    def put(self, k, v):\n' +
      '        pass\n' +
      '    def fetch(self, k):\n' +
      '        pass\n' +
      '\n' +
      'class StoreAdapter:\n' +
      '    def __init__(self, legacy):\n' +
      '        pass\n' +
      '    def save(self, k, v):\n' +
      '        pass\n' +
      '    def load(self, k):\n' +
      '        pass\n',
    solution:
      'class LegacyStore:\n' +
      '    def __init__(self):\n' +
      '        self._d = {}\n' +
      '    def put(self, k, v):\n' +
      '        self._d[k] = v\n' +
      '    def fetch(self, k):\n' +
      '        return self._d.get(k)\n' +
      '\n' +
      'class StoreAdapter:\n' +
      '    def __init__(self, legacy):\n' +
      '        self.legacy = legacy\n' +
      '    def save(self, k, v):\n' +
      '        self.legacy.put(k, v)\n' +
      '    def load(self, k):\n' +
      '        return self.legacy.fetch(k)\n',
    testCases: [
      { input: 'legacy = LegacyStore(); store = StoreAdapter(legacy); store.save("a", 1); print(store.load("a"))', isHidden: false, description: 'Adapter works' },
      { input: 'legacy = LegacyStore(); store = StoreAdapter(legacy); print(store.load("x"))', isHidden: true, description: 'Missing returns None' },
      { input: 'legacy = LegacyStore(); legacy.put("k","v"); store = StoreAdapter(legacy); print(store.load("k"))', isHidden: true, description: 'Sees legacy data' },
    ],
    hints: ['Adapter changes method names, not storage semantics', 'Delegate calls to the legacy object'],
    language: 'python',
  },
  {
    id: 'cs103-t6-ex12',
    subjectId: 'cs103',
    topicId: 'cs103-6',
    title: 'Composition of Behaviors (Policies)',
    difficulty: 4,
    description:
      'Create `RetryPolicy` with `should_retry(attempt)` and `FixedRetries(n)`. Create `Requester` that uses a policy and returns how many attempts it would make.',
    starterCode:
      'class FixedRetries:\n' +
      '    def __init__(self, n):\n' +
      '        pass\n' +
      '    def should_retry(self, attempt):\n' +
      '        pass\n' +
      '\n' +
      'class Requester:\n' +
      '    def __init__(self, policy):\n' +
      '        pass\n' +
      '    def attempts(self):\n' +
      '        # returns number of attempts including the first try\n' +
      '        pass\n',
    solution:
      'class FixedRetries:\n' +
      '    def __init__(self, n):\n' +
      '        self.n = n\n' +
      '    def should_retry(self, attempt):\n' +
      '        return attempt <= self.n\n' +
      '\n' +
      'class Requester:\n' +
      '    def __init__(self, policy):\n' +
      '        self.policy = policy\n' +
      '    def attempts(self):\n' +
      '        attempt = 1\n' +
      '        while self.policy.should_retry(attempt):\n' +
      '            attempt += 1\n' +
      '        return attempt\n',
    testCases: [
      { input: 'print(Requester(FixedRetries(0)).attempts())', isHidden: false, description: '0 retries => 1 attempt' },
      { input: 'print(Requester(FixedRetries(2)).attempts())', isHidden: false, description: '2 retries => 3 attempts' },
      { input: 'print(Requester(FixedRetries(5)).attempts())', isHidden: true, description: 'More retries' },
    ],
    hints: ['Requester should not inherit policy', 'Count attempts including the initial try'],
    language: 'python',
  },
  {
    id: 'cs103-t6-ex13',
    subjectId: 'cs103',
    topicId: 'cs103-6',
    title: 'Interface as Contract: Payment Gateways',
    difficulty: 4,
    description:
      'Create `FakeGateway` with `charge(amount)` returning `"charged:<amount>"`. Create `PaymentService` that accepts any gateway and uses it in `charge(amount)`.',
    starterCode:
      'class FakeGateway:\n' +
      '    def charge(self, amount):\n' +
      '        pass\n' +
      '\n' +
      'class PaymentService:\n' +
      '    def __init__(self, gateway):\n' +
      '        pass\n' +
      '    def charge(self, amount):\n' +
      '        pass\n',
    solution:
      'class FakeGateway:\n' +
      '    def charge(self, amount):\n' +
      '        return f"charged:{amount}"\n' +
      '\n' +
      'class PaymentService:\n' +
      '    def __init__(self, gateway):\n' +
      '        self.gateway = gateway\n' +
      '    def charge(self, amount):\n' +
      '        return self.gateway.charge(amount)\n',
    testCases: [
      { input: 'print(PaymentService(FakeGateway()).charge(10))', isHidden: false, description: 'Delegates to gateway' },
      { input: 'print(PaymentService(FakeGateway()).charge(0))', isHidden: true, description: 'Zero amount' },
      { input: 'print(PaymentService(FakeGateway()).charge(-1))', isHidden: true, description: 'Negative passes through (no validation here)' },
    ],
    hints: ['Accept the gateway as a dependency', 'Delegate from service to gateway'],
    language: 'python',
  },
  {
    id: 'cs103-t6-ex14',
    subjectId: 'cs103',
    topicId: 'cs103-6',
    title: 'Prefer Protocols: Any “Writer” Works',
    difficulty: 5,
    description:
      'Create a `FileWriter` that writes into a string attribute `contents` via `write(text)`. Create a `ReportWriter` that accepts any writer and writes two lines.',
    starterCode:
      'class FileWriter:\n' +
      '    def __init__(self):\n' +
      '        pass\n' +
      '    def write(self, text):\n' +
      '        pass\n' +
      '\n' +
      'class ReportWriter:\n' +
      '    def __init__(self, writer):\n' +
      '        pass\n' +
      '    def write_report(self):\n' +
      '        pass\n',
    solution:
      'class FileWriter:\n' +
      '    def __init__(self):\n' +
      '        self.contents = ""\n' +
      '    def write(self, text):\n' +
      '        self.contents += text\n' +
      '\n' +
      'class ReportWriter:\n' +
      '    def __init__(self, writer):\n' +
      '        self.writer = writer\n' +
      '    def write_report(self):\n' +
      '        self.writer.write("line1\\n")\n' +
      '        self.writer.write("line2\\n")\n',
    testCases: [
      { input: 'w = FileWriter(); rw = ReportWriter(w); rw.write_report(); print(w.contents)', isHidden: false, description: 'Writes two lines' },
      { input: 'w = FileWriter(); ReportWriter(w).write_report(); print(w.contents.count("\\n"))', isHidden: true, description: 'Contains newlines' },
      { input: 'w = FileWriter(); ReportWriter(w).write_report(); print(w.contents.startswith("line1"))', isHidden: true, description: 'Starts with line1' },
    ],
    hints: ['Writer is a “protocol”: any object with write(text) works', 'FileWriter accumulates content'],
    language: 'python',
  },
  {
    id: 'cs103-t6-drill-1',
    subjectId: 'cs103',
    topicId: 'cs103-6',
    title: 'Abstract Method Basics',
    difficulty: 1,
    description: 'Create an abstract base class `Animal` with an abstract method `speak()`.',
    starterCode:
      'from abc import ABC, abstractmethod\n' +
      '\n' +
      'class Animal(ABC):\n' +
      '    @abstractmethod\n' +
      '    def speak(self):\n' +
      '        pass\n',
    solution:
      'from abc import ABC, abstractmethod\n' +
      '\n' +
      'class Animal(ABC):\n' +
      '    @abstractmethod\n' +
      '    def speak(self):\n' +
      '        raise NotImplementedError\n',
    testCases: [
      { input: 'try:\n    Animal()\n    print("no")\nexcept TypeError:\n    print("yes")', isHidden: false, description: 'Cannot instantiate' },
      { input: 'print(hasattr(Animal, "speak"))', isHidden: true, description: 'Has method' },
      { input: 'print(Animal.__mro__[0].__name__ == "Animal")', isHidden: true, description: 'Class exists' },
    ],
    hints: ['Use `ABC` and `@abstractmethod`', 'Abstract classes cannot be instantiated'],
    language: 'python',
  },
  {
    id: 'cs103-t6-drill-2',
    subjectId: 'cs103',
    topicId: 'cs103-6',
    title: 'Inject a Dependency',
    difficulty: 1,
    description: 'Create a `Greeter` that accepts a `writer` and uses it in `hello(name)`.',
    starterCode:
      'class Greeter:\n' +
      '    def __init__(self, writer):\n' +
      '        pass\n' +
      '    def hello(self, name):\n' +
      '        pass\n',
    solution:
      'class Greeter:\n' +
      '    def __init__(self, writer):\n' +
      '        self.writer = writer\n' +
      '    def hello(self, name):\n' +
      '        self.writer.write("Hello, " + name)\n',
    testCases: [
      { input: 'class W:\n    def __init__(self): self.buf=""\n    def write(self, t): self.buf += t\n\nw=W(); Greeter(w).hello("Ada"); print(w.buf)', isHidden: false, description: 'Writes greeting' },
      { input: 'class W:\n    def __init__(self): self.buf=""\n    def write(self, t): self.buf += t\n\nw=W(); Greeter(w).hello(""); print(w.buf)', isHidden: true, description: 'Empty name' },
      { input: 'print(True)', isHidden: true, description: 'Sanity' },
    ],
    hints: ['Store writer on `self`', 'Call `writer.write(...)` in hello'],
    language: 'python',
  },
];

