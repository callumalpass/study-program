import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'cs103-ex-5',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Implement a Simple Singleton Pattern',
    difficulty: 3,
    description: 'Implement a DatabaseConnection class using the Singleton pattern. Only one instance should exist.',
    starterCode: 'class DatabaseConnection:\n    _instance = None\n    \n    def __init__(self):\n        pass\n    \n    @classmethod\n    def get_instance(cls):\n        pass\n    \n    def connect(self):\n        return "Connected to database"',
    testCases: [
      { input: 'db1 = DatabaseConnection.get_instance()\ndb2 = DatabaseConnection.get_instance()\nprint(db1 is db2)', expectedOutput: 'True', isHidden: false, description: 'Same instance returned' },
      { input: 'db = DatabaseConnection.get_instance()\nprint(db.connect())', expectedOutput: 'Connected to database', isHidden: false, description: 'Connect method works' }
    ],
    hints: ['Check if _instance is None in get_instance()', 'Store the instance in _instance before returning'],
    solution: 'class DatabaseConnection:\n    _instance = None\n    \n    def __init__(self):\n        pass\n    \n    @classmethod\n    def get_instance(cls):\n        if cls._instance is None:\n            cls._instance = cls()\n        return cls._instance\n    \n    def connect(self):\n        return "Connected to database"',
    language: 'python'
  },
  {
    id: 'cs103-t5-ex02',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Simple Factory Pattern',
    difficulty: 2,
    description: 'Create a ShapeFactory that creates different shape objects based on a type string.',
    starterCode: 'class Circle:\n    def draw(self):\n        return "Drawing circle"\n\nclass Square:\n    def draw(self):\n        return "Drawing square"\n\nclass ShapeFactory:\n    @staticmethod\n    def create(shape_type):\n        pass\n\nshape = ShapeFactory.create("circle")\nprint(shape.draw())',
    solution: 'class Circle:\n    def draw(self):\n        return "Drawing circle"\n\nclass Square:\n    def draw(self):\n        return "Drawing square"\n\nclass ShapeFactory:\n    @staticmethod\n    def create(shape_type):\n        if shape_type == "circle":\n            return Circle()\n        elif shape_type == "square":\n            return Square()\n        return None\n\nshape = ShapeFactory.create("circle")\nprint(shape.draw())',
    testCases: [
      { input: 'ShapeFactory.create("circle").draw()', expectedOutput: 'Drawing circle', isHidden: false, description: 'Create circle' },
      { input: 'ShapeFactory.create("square").draw()', expectedOutput: 'Drawing square', isHidden: true, description: 'Create square' }
    ],
    hints: ['Use if/elif to check shape_type', 'Return the appropriate class instance'],
    language: 'python'
  },
  {
    id: 'cs103-t5-ex03',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Observer Pattern - Basic',
    difficulty: 3,
    description: 'Implement a simple Observer pattern with a Subject that notifies observers of changes.',
    starterCode: 'class Subject:\n    def __init__(self):\n        self._observers = []\n        self._state = None\n    \n    def attach(self, observer):\n        pass\n    \n    def set_state(self, state):\n        pass\n    \n    def notify(self):\n        pass\n\nclass Observer:\n    def __init__(self, name):\n        pass\n    \n    def update(self, state):\n        pass\n\ns = Subject()\no1 = Observer("A")\ns.attach(o1)\ns.set_state("new")',
    solution: 'class Subject:\n    def __init__(self):\n        self._observers = []\n        self._state = None\n    \n    def attach(self, observer):\n        self._observers.append(observer)\n    \n    def set_state(self, state):\n        self._state = state\n        self.notify()\n    \n    def notify(self):\n        for observer in self._observers:\n            observer.update(self._state)\n\nclass Observer:\n    def __init__(self, name):\n        self.name = name\n        self.last_state = None\n    \n    def update(self, state):\n        self.last_state = state\n        print(f"{self.name} received: {state}")\n\ns = Subject()\no1 = Observer("A")\ns.attach(o1)\ns.set_state("new")',
    testCases: [
      { input: 's = Subject(); o = Observer("X"); s.attach(o); s.set_state("test"); o.last_state', expectedOutput: 'test', isHidden: false, description: 'Observer updated' }
    ],
    hints: ['set_state should call notify()', 'notify loops through observers and calls update()'],
    language: 'python'
  },
  {
    id: 'cs103-t5-ex04',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Strategy Pattern',
    difficulty: 3,
    description: 'Implement a Strategy pattern for different sorting algorithms.',
    starterCode: 'class BubbleSort:\n    def sort(self, data):\n        pass\n\nclass QuickSort:\n    def sort(self, data):\n        pass\n\nclass Sorter:\n    def __init__(self, strategy):\n        pass\n    \n    def sort(self, data):\n        pass\n\nsorter = Sorter(BubbleSort())\nprint(sorter.sort([3, 1, 2]))',
    solution: 'class BubbleSort:\n    def sort(self, data):\n        arr = data.copy()\n        n = len(arr)\n        for i in range(n):\n            for j in range(n-1-i):\n                if arr[j] > arr[j+1]:\n                    arr[j], arr[j+1] = arr[j+1], arr[j]\n        return arr\n\nclass QuickSort:\n    def sort(self, data):\n        return sorted(data)\n\nclass Sorter:\n    def __init__(self, strategy):\n        self.strategy = strategy\n    \n    def sort(self, data):\n        return self.strategy.sort(data)\n\nsorter = Sorter(BubbleSort())\nprint(sorter.sort([3, 1, 2]))',
    testCases: [
      { input: 'Sorter(BubbleSort()).sort([3, 1, 2])', expectedOutput: '[1, 2, 3]', isHidden: false, description: 'Bubble sort' },
      { input: 'Sorter(QuickSort()).sort([5, 3, 4])', expectedOutput: '[3, 4, 5]', isHidden: true, description: 'Quick sort' }
    ],
    hints: ['Sorter delegates to strategy.sort()', 'Strategy can be swapped at runtime'],
    language: 'python'
  },
  {
    id: 'cs103-t5-ex05',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Decorator Pattern',
    difficulty: 4,
    description: 'Implement a Decorator pattern to add features to a Coffee object.',
    starterCode: 'class Coffee:\n    def cost(self):\n        return 2.0\n    \n    def description(self):\n        return "Coffee"\n\nclass MilkDecorator:\n    def __init__(self, coffee):\n        pass\n    \n    def cost(self):\n        pass\n    \n    def description(self):\n        pass\n\ncoffee = Coffee()\nwith_milk = MilkDecorator(coffee)\nprint(with_milk.description())\nprint(with_milk.cost())',
    solution: 'class Coffee:\n    def cost(self):\n        return 2.0\n    \n    def description(self):\n        return "Coffee"\n\nclass MilkDecorator:\n    def __init__(self, coffee):\n        self._coffee = coffee\n    \n    def cost(self):\n        return self._coffee.cost() + 0.5\n    \n    def description(self):\n        return self._coffee.description() + " + Milk"\n\ncoffee = Coffee()\nwith_milk = MilkDecorator(coffee)\nprint(with_milk.description())\nprint(with_milk.cost())',
    testCases: [
      { input: 'MilkDecorator(Coffee()).cost()', expectedOutput: '2.5', isHidden: false, description: 'Coffee + milk cost' },
      { input: 'MilkDecorator(Coffee()).description()', expectedOutput: 'Coffee + Milk', isHidden: true, description: 'Coffee + milk description' }
    ],
    hints: ['Decorator wraps the original object', 'Add to the original cost/description'],
    language: 'python'
  },
  {
    id: 'cs103-t5-ex06',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Builder Pattern',
    difficulty: 4,
    description: 'Implement a Builder pattern for creating Pizza objects with various toppings.',
    starterCode: 'class Pizza:\n    def __init__(self):\n        self.size = "medium"\n        self.toppings = []\n    \n    def __str__(self):\n        return f"{self.size} pizza with {self.toppings}"\n\nclass PizzaBuilder:\n    def __init__(self):\n        self.pizza = Pizza()\n    \n    def set_size(self, size):\n        pass\n    \n    def add_topping(self, topping):\n        pass\n    \n    def build(self):\n        pass\n\np = PizzaBuilder().set_size("large").add_topping("cheese").build()\nprint(p)',
    solution: 'class Pizza:\n    def __init__(self):\n        self.size = "medium"\n        self.toppings = []\n    \n    def __str__(self):\n        return f"{self.size} pizza with {self.toppings}"\n\nclass PizzaBuilder:\n    def __init__(self):\n        self.pizza = Pizza()\n    \n    def set_size(self, size):\n        self.pizza.size = size\n        return self\n    \n    def add_topping(self, topping):\n        self.pizza.toppings.append(topping)\n        return self\n    \n    def build(self):\n        return self.pizza\n\np = PizzaBuilder().set_size("large").add_topping("cheese").build()\nprint(p)',
    testCases: [
      { input: 'str(PizzaBuilder().set_size("large").build())', expectedOutput: "large pizza with []", isHidden: false, description: 'Large pizza' }
    ],
    hints: ['Return self from each method for chaining', 'build() returns the finished product'],
    language: 'python'
  },
  {
    id: 'cs103-t5-ex07',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Command Pattern',
    difficulty: 5,
    description: 'Implement a Command pattern with undo functionality for a text editor.',
    starterCode: 'class TextEditor:\n    def __init__(self):\n        self.text = ""\n    \n    def write(self, text):\n        self.text += text\n\nclass WriteCommand:\n    def __init__(self, editor, text):\n        pass\n    \n    def execute(self):\n        pass\n    \n    def undo(self):\n        pass\n\nclass CommandManager:\n    def __init__(self):\n        self.history = []\n    \n    def execute(self, command):\n        pass\n    \n    def undo(self):\n        pass\n\neditor = TextEditor()\nmgr = CommandManager()\nmgr.execute(WriteCommand(editor, "Hello"))\nmgr.undo()\nprint(editor.text)',
    solution: 'class TextEditor:\n    def __init__(self):\n        self.text = ""\n    \n    def write(self, text):\n        self.text += text\n\nclass WriteCommand:\n    def __init__(self, editor, text):\n        self.editor = editor\n        self.text = text\n    \n    def execute(self):\n        self.editor.write(self.text)\n    \n    def undo(self):\n        self.editor.text = self.editor.text[:-len(self.text)]\n\nclass CommandManager:\n    def __init__(self):\n        self.history = []\n    \n    def execute(self, command):\n        command.execute()\n        self.history.append(command)\n    \n    def undo(self):\n        if self.history:\n            command = self.history.pop()\n            command.undo()\n\neditor = TextEditor()\nmgr = CommandManager()\nmgr.execute(WriteCommand(editor, "Hello"))\nmgr.undo()\nprint(editor.text)',
    testCases: [
      { input: 'e = TextEditor(); m = CommandManager(); m.execute(WriteCommand(e, "Hi")); e.text', expectedOutput: 'Hi', isHidden: false, description: 'Execute write' },
      { input: 'e = TextEditor(); m = CommandManager(); m.execute(WriteCommand(e, "X")); m.undo(); e.text', expectedOutput: '', isHidden: true, description: 'Undo write' }
    ],
    hints: ['Command stores enough info to undo', 'Manager keeps history of commands'],
    language: 'python'
  },
  {
    id: 'cs103-t5-ex08',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Adapter Pattern',
    difficulty: 4,
    description: 'Create an Adapter to make an old API work with a new interface.',
    starterCode: 'class OldPrinter:\n    def print_text(self, text):\n        return f"OLD: {text}"\n\nclass NewPrinterInterface:\n    def print(self, text):\n        pass\n\nclass PrinterAdapter(NewPrinterInterface):\n    def __init__(self, old_printer):\n        pass\n    \n    def print(self, text):\n        pass\n\nold = OldPrinter()\nadapter = PrinterAdapter(old)\nprint(adapter.print("Hello"))',
    solution: 'class OldPrinter:\n    def print_text(self, text):\n        return f"OLD: {text}"\n\nclass NewPrinterInterface:\n    def print(self, text):\n        pass\n\nclass PrinterAdapter(NewPrinterInterface):\n    def __init__(self, old_printer):\n        self.old_printer = old_printer\n    \n    def print(self, text):\n        return self.old_printer.print_text(text)\n\nold = OldPrinter()\nadapter = PrinterAdapter(old)\nprint(adapter.print("Hello"))',
    testCases: [
      { input: 'PrinterAdapter(OldPrinter()).print("Hi")', expectedOutput: 'OLD: Hi', isHidden: false, description: 'Adapter works' }
    ],
    hints: ['Adapter wraps old interface', 'print() calls print_text() internally'],
    language: 'python'
  }
];
