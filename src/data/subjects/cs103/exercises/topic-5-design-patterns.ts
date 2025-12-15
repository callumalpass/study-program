import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'cs103-ex-5',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Singleton Config',
    difficulty: 3,
    description:
      'Implement a `Config` class using the Singleton pattern: every call to `Config()` should return the same instance. Store a `settings` dict on the instance.',
    starterCode:
      'class Config:\n' +
      '    _instance = None\n' +
      '\n' +
      '    def __new__(cls):\n' +
      '        # TODO\n' +
      '        pass\n' +
      '\n' +
      '    def __init__(self):\n' +
      '        # TODO: initialize settings once\n' +
      '        pass\n',
    solution:
      'class Config:\n' +
      '    _instance = None\n' +
      '\n' +
      '    def __new__(cls):\n' +
      '        if cls._instance is None:\n' +
      '            cls._instance = super().__new__(cls)\n' +
      '            cls._instance._initialized = False\n' +
      '        return cls._instance\n' +
      '\n' +
      '    def __init__(self):\n' +
      '        if getattr(self, "_initialized", False):\n' +
      '            return\n' +
      '        self.settings = {}\n' +
      '        self._initialized = True\n',
    testCases: [
      { input: 'a = Config(); b = Config(); print(a is b)', isHidden: false, description: 'Same instance' },
      { input: 'a = Config(); a.settings["x"] = 1; b = Config(); print(b.settings["x"])', isHidden: false, description: 'Shared state' },
      { input: 'a = Config(); print(isinstance(a.settings, dict))', isHidden: true, description: 'settings is dict' },
    ],
    hints: ['Override `__new__` to control instance creation', 'Initialize settings only once'],
    language: 'python',
  },
  {
    id: 'cs103-t5-ex02',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Factory: Create Shapes',
    difficulty: 3,
    description:
      'Create `Circle` and `Square` classes and a `ShapeFactory` with method `create(kind, size)` returning the correct shape. Each shape must have `area()` (pi=3.14159).',
    starterCode:
      'class Circle:\n' +
      '    def __init__(self, r):\n' +
      '        pass\n' +
      '    def area(self):\n' +
      '        pass\n' +
      '\n' +
      'class Square:\n' +
      '    def __init__(self, side):\n' +
      '        pass\n' +
      '    def area(self):\n' +
      '        pass\n' +
      '\n' +
      'class ShapeFactory:\n' +
      '    def create(self, kind, size):\n' +
      '        pass\n',
    solution:
      'class Circle:\n' +
      '    def __init__(self, r):\n' +
      '        self.r = r\n' +
      '    def area(self):\n' +
      '        pi = 3.14159\n' +
      '        return pi * (self.r ** 2)\n' +
      '\n' +
      'class Square:\n' +
      '    def __init__(self, side):\n' +
      '        self.side = side\n' +
      '    def area(self):\n' +
      '        return self.side * self.side\n' +
      '\n' +
      'class ShapeFactory:\n' +
      '    def create(self, kind, size):\n' +
      '        if kind == "circle":\n' +
      '            return Circle(size)\n' +
      '        if kind == "square":\n' +
      '            return Square(size)\n' +
      '        raise ValueError("unknown kind")\n',
    testCases: [
      { input: 'f = ShapeFactory(); print(round(f.create("circle", 2).area(), 5))', isHidden: false, description: 'Circle created' },
      { input: 'f = ShapeFactory(); print(f.create("square", 3).area())', isHidden: false, description: 'Square created' },
      { input: 'f = ShapeFactory();\ntry:\n    f.create("x", 1)\n    print("no")\nexcept ValueError:\n    print("yes")', isHidden: true, description: 'Unknown kind raises' },
    ],
    hints: ['Factory chooses which class to instantiate based on `kind`', 'Raise on unknown kind'],
    language: 'python',
  },
  {
    id: 'cs103-t5-ex03',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Observer: Simple Event Bus',
    difficulty: 3,
    description:
      'Create an `EventBus` class that supports `subscribe(fn)` and `publish(message)`. All subscribers should be called with the message.',
    starterCode:
      'class EventBus:\n' +
      '    def __init__(self):\n' +
      '        pass\n' +
      '    def subscribe(self, fn):\n' +
      '        pass\n' +
      '    def publish(self, message):\n' +
      '        pass\n',
    solution:
      'class EventBus:\n' +
      '    def __init__(self):\n' +
      '        self._subs = []\n' +
      '    def subscribe(self, fn):\n' +
      '        self._subs.append(fn)\n' +
      '    def publish(self, message):\n' +
      '        for fn in self._subs:\n' +
      '            fn(message)\n',
    testCases: [
      {
        input:
          'bus = EventBus(); out = []\n' +
          'bus.subscribe(lambda m: out.append("A:" + m))\n' +
          'bus.subscribe(lambda m: out.append("B:" + m))\n' +
          'bus.publish("hi")\n' +
          'print(out)',
        isHidden: false,
        description: 'Both subscribers notified',
      },
      { input: 'bus = EventBus(); out = []; bus.publish("x"); print(out)', isHidden: true, description: 'No subscribers ok' },
      { input: 'bus = EventBus(); out = []; bus.subscribe(lambda m: out.append(m)); bus.publish(""); print(out)', isHidden: true, description: 'Empty message delivered' },
    ],
    hints: ['Store subscribers in a list', 'Loop and call each function'],
    language: 'python',
  },
  {
    id: 'cs103-t5-ex04',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Strategy: Sorting Policies',
    difficulty: 4,
    description:
      'Create `Ascending` and `Descending` strategy classes each with `sort(nums)` returning a new sorted list. Create `Sorter` that composes a strategy.',
    starterCode:
      'class Ascending:\n' +
      '    def sort(self, nums):\n' +
      '        pass\n' +
      '\n' +
      'class Descending:\n' +
      '    def sort(self, nums):\n' +
      '        pass\n' +
      '\n' +
      'class Sorter:\n' +
      '    def __init__(self, strategy):\n' +
      '        pass\n' +
      '    def run(self, nums):\n' +
      '        pass\n',
    solution:
      'class Ascending:\n' +
      '    def sort(self, nums):\n' +
      '        return sorted(nums)\n' +
      '\n' +
      'class Descending:\n' +
      '    def sort(self, nums):\n' +
      '        return sorted(nums, reverse=True)\n' +
      '\n' +
      'class Sorter:\n' +
      '    def __init__(self, strategy):\n' +
      '        self.strategy = strategy\n' +
      '    def run(self, nums):\n' +
      '        return self.strategy.sort(nums)\n',
    testCases: [
      { input: 'print(Sorter(Ascending()).run([3,1,2]))', isHidden: false, description: 'Ascending' },
      { input: 'print(Sorter(Descending()).run([3,1,2]))', isHidden: false, description: 'Descending' },
      { input: 'print(Sorter(Ascending()).run([]))', isHidden: true, description: 'Empty list' },
    ],
    hints: ['Return a new list (don’t mutate input)', 'Delegate to the strategy'],
    language: 'python',
  },
  {
    id: 'cs103-t5-ex05',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Decorator: Logging Service',
    difficulty: 4,
    description:
      'Create a `Service` class with `run()` returning `"ok"`. Create a `LoggingDecorator` that wraps any service and returns `"LOG:" + service.run()`.',
    starterCode:
      'class Service:\n' +
      '    def run(self):\n' +
      '        pass\n' +
      '\n' +
      'class LoggingDecorator:\n' +
      '    def __init__(self, svc):\n' +
      '        pass\n' +
      '    def run(self):\n' +
      '        pass\n',
    solution:
      'class Service:\n' +
      '    def run(self):\n' +
      '        return "ok"\n' +
      '\n' +
      'class LoggingDecorator:\n' +
      '    def __init__(self, svc):\n' +
      '        self._svc = svc\n' +
      '    def run(self):\n' +
      '        return "LOG:" + self._svc.run()\n',
    testCases: [
      { input: 'print(LoggingDecorator(Service()).run())', isHidden: false, description: 'Decorates output' },
      { input: 'print(Service().run())', isHidden: true, description: 'Base service ok' },
      { input: 'print(LoggingDecorator(LoggingDecorator(Service())).run())', isHidden: true, description: 'Decorator can stack' },
    ],
    hints: ['Store wrapped service in `__init__`', 'Delegate to wrapped `run()`'],
    language: 'python',
  },
  {
    id: 'cs103-t5-ex06',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Adapter: LegacyPrinter to Printer',
    difficulty: 4,
    description:
      'Create a `LegacyPrinter` with method `old_print(text)` and a `PrinterAdapter` that provides `print(text)` by delegating to `old_print`.',
    starterCode:
      'class LegacyPrinter:\n' +
      '    def old_print(self, text):\n' +
      '        pass\n' +
      '\n' +
      'class PrinterAdapter:\n' +
      '    def __init__(self, legacy):\n' +
      '        pass\n' +
      '    def print(self, text):\n' +
      '        pass\n',
    solution:
      'class LegacyPrinter:\n' +
      '    def old_print(self, text):\n' +
      '        return "OLD:" + text\n' +
      '\n' +
      'class PrinterAdapter:\n' +
      '    def __init__(self, legacy):\n' +
      '        self.legacy = legacy\n' +
      '    def print(self, text):\n' +
      '        return self.legacy.old_print(text)\n',
    testCases: [
      { input: 'print(PrinterAdapter(LegacyPrinter()).print("hi"))', isHidden: false, description: 'Adapter delegates' },
      { input: 'print(LegacyPrinter().old_print("x"))', isHidden: true, description: 'Legacy still works' },
      { input: 'print(PrinterAdapter(LegacyPrinter()).print(""))', isHidden: true, description: 'Empty string' },
    ],
    hints: ['Adapter wraps the legacy instance', 'Expose the new interface expected by callers'],
    language: 'python',
  },
  {
    id: 'cs103-t5-ex07',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Facade: Simple API Client',
    difficulty: 3,
    description:
      'Create internal classes `Authenticator` and `Requester`. Build a `ApiClient` facade with `get(token, path)` that authenticates then requests.',
    starterCode:
      'class Authenticator:\n' +
      '    def is_valid(self, token):\n' +
      '        pass\n' +
      '\n' +
      'class Requester:\n' +
      '    def get(self, path):\n' +
      '        pass\n' +
      '\n' +
      'class ApiClient:\n' +
      '    def __init__(self):\n' +
      '        pass\n' +
      '    def get(self, token, path):\n' +
      '        pass\n',
    solution:
      'class Authenticator:\n' +
      '    def is_valid(self, token):\n' +
      '        return token == "token"\n' +
      '\n' +
      'class Requester:\n' +
      '    def get(self, path):\n' +
      '        return "GET:" + path\n' +
      '\n' +
      'class ApiClient:\n' +
      '    def __init__(self):\n' +
      '        self._auth = Authenticator()\n' +
      '        self._req = Requester()\n' +
      '    def get(self, token, path):\n' +
      '        if not self._auth.is_valid(token):\n' +
      '            return "401"\n' +
      '        return self._req.get(path)\n',
    testCases: [
      { input: 'c = ApiClient(); print(c.get("token", "/x"))', isHidden: false, description: 'Valid token succeeds' },
      { input: 'c = ApiClient(); print(c.get("bad", "/x"))', isHidden: false, description: 'Invalid token returns 401' },
      { input: 'c = ApiClient(); print(c.get("token", ""))', isHidden: true, description: 'Empty path' },
    ],
    hints: ['Facade hides subsystem complexity', 'ApiClient should coordinate authenticator and requester'],
    language: 'python',
  },
  {
    id: 'cs103-t5-ex08',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Command Pattern: Light Switch',
    difficulty: 4,
    description:
      'Create `Light` with `on()` and `off()`. Create commands `OnCommand` and `OffCommand` with `execute()`. Create `Remote` that runs a command.',
    starterCode:
      'class Light:\n' +
      '    def __init__(self):\n' +
      '        pass\n' +
      '    def on(self):\n' +
      '        pass\n' +
      '    def off(self):\n' +
      '        pass\n' +
      '\n' +
      'class OnCommand:\n' +
      '    def __init__(self, light):\n' +
      '        pass\n' +
      '    def execute(self):\n' +
      '        pass\n' +
      '\n' +
      'class OffCommand:\n' +
      '    def __init__(self, light):\n' +
      '        pass\n' +
      '    def execute(self):\n' +
      '        pass\n' +
      '\n' +
      'class Remote:\n' +
      '    def run(self, command):\n' +
      '        pass\n',
    solution:
      'class Light:\n' +
      '    def __init__(self):\n' +
      '        self.is_on = False\n' +
      '    def on(self):\n' +
      '        self.is_on = True\n' +
      '    def off(self):\n' +
      '        self.is_on = False\n' +
      '\n' +
      'class OnCommand:\n' +
      '    def __init__(self, light):\n' +
      '        self.light = light\n' +
      '    def execute(self):\n' +
      '        self.light.on()\n' +
      '\n' +
      'class OffCommand:\n' +
      '    def __init__(self, light):\n' +
      '        self.light = light\n' +
      '    def execute(self):\n' +
      '        self.light.off()\n' +
      '\n' +
      'class Remote:\n' +
      '    def run(self, command):\n' +
      '        command.execute()\n',
    testCases: [
      { input: 'l = Light(); r = Remote(); r.run(OnCommand(l)); print(l.is_on)', isHidden: false, description: 'On command' },
      { input: 'l = Light(); r = Remote(); r.run(OnCommand(l)); r.run(OffCommand(l)); print(l.is_on)', isHidden: false, description: 'Off command' },
      { input: 'l = Light(); print(l.is_on)', isHidden: true, description: 'Default off' },
    ],
    hints: ['Commands wrap an action as an object', 'Remote calls execute()'],
    language: 'python',
  },
  {
    id: 'cs103-t5-ex09',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Observer: Unsubscribe',
    difficulty: 4,
    description:
      'Extend an `EventBus` to support `unsubscribe(fn)` removing the subscriber if present.',
    starterCode:
      'class EventBus:\n' +
      '    def __init__(self):\n' +
      '        pass\n' +
      '    def subscribe(self, fn):\n' +
      '        pass\n' +
      '    def unsubscribe(self, fn):\n' +
      '        pass\n' +
      '    def publish(self, message):\n' +
      '        pass\n',
    solution:
      'class EventBus:\n' +
      '    def __init__(self):\n' +
      '        self._subs = []\n' +
      '    def subscribe(self, fn):\n' +
      '        self._subs.append(fn)\n' +
      '    def unsubscribe(self, fn):\n' +
      '        self._subs = [s for s in self._subs if s is not fn]\n' +
      '    def publish(self, message):\n' +
      '        for fn in list(self._subs):\n' +
      '            fn(message)\n',
    testCases: [
      {
        input:
          'bus = EventBus(); out = []\n' +
          'def f(m): out.append("f:" + m)\n' +
          'bus.subscribe(f); bus.publish("a"); bus.unsubscribe(f); bus.publish("b")\n' +
          'print(out)',
        isHidden: false,
        description: 'Unsubscribe prevents further notifications',
      },
      { input: 'bus = EventBus(); out = []; bus.unsubscribe(lambda m: None); bus.publish("x"); print(out)', isHidden: true, description: 'Unsubscribe missing ok' },
      { input: 'bus = EventBus(); out = []; bus.publish("x"); print(out)', isHidden: true, description: 'No subscribers ok' },
    ],
    hints: ['Filter the list of subscribers', 'Use identity (`is`) to match the function object'],
    language: 'python',
  },
  {
    id: 'cs103-t5-ex10',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Factory: Parse JSON-like Values',
    difficulty: 5,
    description:
      'Create classes `JsonString`, `JsonNumber`, and `JsonBool` each with `value`. Create `JsonFactory.create(x)` that returns the right wrapper based on Python type.',
    starterCode:
      'class JsonString:\n' +
      '    def __init__(self, value):\n' +
      '        pass\n' +
      '\n' +
      'class JsonNumber:\n' +
      '    def __init__(self, value):\n' +
      '        pass\n' +
      '\n' +
      'class JsonBool:\n' +
      '    def __init__(self, value):\n' +
      '        pass\n' +
      '\n' +
      'class JsonFactory:\n' +
      '    def create(self, x):\n' +
      '        pass\n',
    solution:
      'class JsonString:\n' +
      '    def __init__(self, value):\n' +
      '        self.value = value\n' +
      '\n' +
      'class JsonNumber:\n' +
      '    def __init__(self, value):\n' +
      '        self.value = value\n' +
      '\n' +
      'class JsonBool:\n' +
      '    def __init__(self, value):\n' +
      '        self.value = value\n' +
      '\n' +
      'class JsonFactory:\n' +
      '    def create(self, x):\n' +
      '        if isinstance(x, bool):\n' +
      '            return JsonBool(x)\n' +
      '        if isinstance(x, (int, float)):\n' +
      '            return JsonNumber(x)\n' +
      '        if isinstance(x, str):\n' +
      '            return JsonString(x)\n' +
      '        raise ValueError("unsupported")\n',
    testCases: [
      { input: 'f = JsonFactory(); print(type(f.create("x")).__name__, f.create("x").value)', isHidden: false, description: 'String wrapper' },
      { input: 'f = JsonFactory(); print(type(f.create(1)).__name__, f.create(1).value)', isHidden: false, description: 'Number wrapper' },
      { input: 'f = JsonFactory(); print(type(f.create(True)).__name__, f.create(True).value)', isHidden: true, description: 'Bool wrapper' },
    ],
    hints: ['Check bool before int (bool is a subclass of int)', 'Raise for unsupported types'],
    language: 'python',
  },
  {
    id: 'cs103-t5-ex11',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Decorator: Timing Wrapper',
    difficulty: 5,
    description:
      'Create `TimedDecorator` that wraps an object with method `run()` and stores the last run duration (seconds) in `last_seconds`.',
    starterCode:
      'import time\n' +
      '\n' +
      'class TimedDecorator:\n' +
      '    def __init__(self, svc):\n' +
      '        pass\n' +
      '    def run(self):\n' +
      '        pass\n',
    solution:
      'import time\n' +
      '\n' +
      'class TimedDecorator:\n' +
      '    def __init__(self, svc):\n' +
      '        self._svc = svc\n' +
      '        self.last_seconds = 0.0\n' +
      '    def run(self):\n' +
      '        start = time.time()\n' +
      '        result = self._svc.run()\n' +
      '        self.last_seconds = max(0.0, time.time() - start)\n' +
      '        return result\n',
    testCases: [
      { input: 'class S:\n    def run(self):\n        return "ok"\n\nt = TimedDecorator(S()); print(t.run(), isinstance(t.last_seconds, float))', isHidden: false, description: 'Runs and records time' },
      { input: 'class S:\n    def run(self):\n        return "x"\n\nt = TimedDecorator(S()); t.run(); print(t.last_seconds >= 0.0)', isHidden: true, description: 'Non-negative time' },
      { input: 'class S:\n    def run(self):\n        return ""\n\nt = TimedDecorator(S()); print(t.run())', isHidden: true, description: 'Returns wrapped result' },
    ],
    hints: ['Record time before and after calling wrapped run()', 'Store duration on the decorator instance'],
    language: 'python',
  },
  {
    id: 'cs103-t5-ex12',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Builder: Simple HTML Tag',
    difficulty: 4,
    description:
      'Create an `HtmlBuilder` that builds a `<tag>content</tag>` string. It should support `set_tag(tag)`, `set_content(content)`, and `build()`.',
    starterCode:
      'class HtmlBuilder:\n' +
      '    def __init__(self):\n' +
      '        pass\n' +
      '    def set_tag(self, tag):\n' +
      '        pass\n' +
      '    def set_content(self, content):\n' +
      '        pass\n' +
      '    def build(self):\n' +
      '        pass\n',
    solution:
      'class HtmlBuilder:\n' +
      '    def __init__(self):\n' +
      '        self._tag = "div"\n' +
      '        self._content = ""\n' +
      '    def set_tag(self, tag):\n' +
      '        self._tag = tag\n' +
      '        return self\n' +
      '    def set_content(self, content):\n' +
      '        self._content = content\n' +
      '        return self\n' +
      '    def build(self):\n' +
      '        return f"<{self._tag}>{self._content}</{self._tag}>"\n',
    testCases: [
      { input: 'b = HtmlBuilder().set_tag("p").set_content("hi")\nprint(b.build())', isHidden: false, description: 'Build tag' },
      { input: 'b = HtmlBuilder().set_content("x")\nprint(b.build())', isHidden: true, description: 'Default tag' },
      { input: 'b = HtmlBuilder().set_tag("span").set_content("")\nprint(b.build())', isHidden: true, description: 'Empty content ok' },
    ],
    hints: ['Builder collects values then builds final string', 'Optional: return self for chaining'],
    language: 'python',
  },
  {
    id: 'cs103-t5-ex13',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Null Object: Safe Logger',
    difficulty: 4,
    description:
      'Create `ConsoleLogger` and `NullLogger` each with `log(msg)`. NullLogger should do nothing. Create a `Worker` that uses any logger.',
    starterCode:
      'class ConsoleLogger:\n' +
      '    def log(self, msg):\n' +
      '        pass\n' +
      '\n' +
      'class NullLogger:\n' +
      '    def log(self, msg):\n' +
      '        pass\n' +
      '\n' +
      'class Worker:\n' +
      '    def __init__(self, logger):\n' +
      '        pass\n' +
      '    def do(self):\n' +
      '        pass\n',
    solution:
      'class ConsoleLogger:\n' +
      '    def log(self, msg):\n' +
      '        print(msg)\n' +
      '\n' +
      'class NullLogger:\n' +
      '    def log(self, msg):\n' +
      '        return None\n' +
      '\n' +
      'class Worker:\n' +
      '    def __init__(self, logger):\n' +
      '        self.logger = logger\n' +
      '    def do(self):\n' +
      '        self.logger.log("work")\n',
    testCases: [
      { input: 'w = Worker(NullLogger()); w.do(); print("ok")', isHidden: false, description: 'NullLogger prevents errors' },
      { input: 'w = Worker(NullLogger()); w.do(); w.do(); print("ok")', isHidden: true, description: 'Multiple calls' },
      { input: 'print(hasattr(NullLogger(), "log"))', isHidden: true, description: 'Has log method' },
    ],
    hints: ['Null Object avoids checking for None everywhere', 'Worker delegates to logger'],
    language: 'python',
  },
  {
    id: 'cs103-t5-ex14',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Simple Dependency Injection Container',
    difficulty: 5,
    description:
      'Create a `Container` class with `register(name, value)` and `resolve(name)` returning the registered value or raising KeyError.',
    starterCode:
      'class Container:\n' +
      '    def __init__(self):\n' +
      '        pass\n' +
      '    def register(self, name, value):\n' +
      '        pass\n' +
      '    def resolve(self, name):\n' +
      '        pass\n',
    solution:
      'class Container:\n' +
      '    def __init__(self):\n' +
      '        self._services = {}\n' +
      '    def register(self, name, value):\n' +
      '        self._services[name] = value\n' +
      '    def resolve(self, name):\n' +
      '        return self._services[name]\n',
    testCases: [
      { input: 'c = Container(); c.register("x", 1); print(c.resolve("x"))', isHidden: false, description: 'Resolve returns value' },
      { input: 'c = Container();\ntry:\n    c.resolve("missing")\n    print("no")\nexcept KeyError:\n    print("yes")', isHidden: false, description: 'Missing raises KeyError' },
      { input: 'c = Container(); c.register("a", "b"); c.register("a", "c"); print(c.resolve("a"))', isHidden: true, description: 'Re-register overwrites' },
    ],
    hints: ['Use a dict internally', 'Raise KeyError for missing'],
    language: 'python',
  },
  {
    id: 'cs103-t5-drill-1',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Recognize a Pattern',
    difficulty: 1,
    description: 'Create a `Factory` class with a `create()` method that returns a string `"created"`.',
    starterCode:
      'class Factory:\n' +
      '    def create(self):\n' +
      '        pass\n',
    solution:
      'class Factory:\n' +
      '    def create(self):\n' +
      '        return "created"\n',
    testCases: [
      { input: 'print(Factory().create())', isHidden: false, description: 'Returns created' },
      { input: 'print(Factory().create().upper())', isHidden: true, description: 'String' },
      { input: 'print(isinstance(Factory().create(), str))', isHidden: true, description: 'Type' },
    ],
    hints: ['Return the required string'],
    language: 'python',
  },
  {
    id: 'cs103-t5-drill-2',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Observer Skeleton',
    difficulty: 1,
    description: 'Create a `Subject` class that stores subscribers and can notify them with a message.',
    starterCode:
      'class Subject:\n' +
      '    def __init__(self):\n' +
      '        pass\n' +
      '    def subscribe(self, fn):\n' +
      '        pass\n' +
      '    def notify(self, msg):\n' +
      '        pass\n',
    solution:
      'class Subject:\n' +
      '    def __init__(self):\n' +
      '        self._subs = []\n' +
      '    def subscribe(self, fn):\n' +
      '        self._subs.append(fn)\n' +
      '    def notify(self, msg):\n' +
      '        for fn in self._subs:\n' +
      '            fn(msg)\n',
    testCases: [
      { input: 's = Subject(); out = []; s.subscribe(lambda m: out.append(m)); s.notify("x"); print(out)', isHidden: false, description: 'Notifies subscriber' },
      { input: 's = Subject(); s.notify("x"); print("ok")', isHidden: true, description: 'No subs ok' },
      { input: 's = Subject(); out = []; s.subscribe(lambda m: out.append(m)); s.notify(""); print(out)', isHidden: true, description: 'Empty message ok' },
    ],
    hints: ['Store subscribers in a list', 'Loop and call each subscriber'],
    language: 'python',
  },
];

