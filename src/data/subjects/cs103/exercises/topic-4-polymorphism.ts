import { CodingExercise } from '../../../../core/types';

export const topic4Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'cs103-ex-4',
    subjectId: 'cs103',
    topicId: 'cs103-4',
    title: 'Implement Polymorphism with Shapes',
    difficulty: 2,
    description: 'Create a Shape base class with an area() method. Create Circle and Rectangle subclasses that implement area() differently.',
    starterCode: 'import math\n\nclass Shape:\n    def area(self):\n        pass\n\nclass Circle(Shape):\n    def __init__(self, radius):\n        pass\n    \n    def area(self):\n        pass\n\nclass Rectangle(Shape):\n    def __init__(self, width, height):\n        pass\n    \n    def area(self):\n        pass',
    testCases: [
      { input: 'circle = Circle(5)\nprint(round(circle.area(), 2))', expectedOutput: '78.54', isHidden: false, description: 'Test circle area' },
      { input: 'rectangle = Rectangle(4, 6)\nprint(rectangle.area())', expectedOutput: '24', isHidden: false, description: 'Test rectangle area' }
    ],
    hints: ['Circle area: π * radius²', 'Rectangle area: width * height'],
    solution: 'import math\n\nclass Shape:\n    def area(self):\n        return 0\n\nclass Circle(Shape):\n    def __init__(self, radius):\n        self.radius = radius\n    \n    def area(self):\n        return math.pi * self.radius ** 2\n\nclass Rectangle(Shape):\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    \n    def area(self):\n        return self.width * self.height',
    language: 'python'
  },
  {
    id: 'cs103-t4-ex02',
    subjectId: 'cs103',
    topicId: 'cs103-4',
    title: 'Duck Typing Example',
    difficulty: 1,
    description: 'Create Duck and Person classes with walk() method. Write a function that works with any object that can walk().',
    starterCode: 'class Duck:\n    def walk(self):\n        pass\n\nclass Person:\n    def walk(self):\n        pass\n\ndef make_it_walk(thing):\n    pass\n\nd = Duck()\np = Person()\nprint(make_it_walk(d))\nprint(make_it_walk(p))',
    solution: 'class Duck:\n    def walk(self):\n        return "Duck waddles"\n\nclass Person:\n    def walk(self):\n        return "Person strides"\n\ndef make_it_walk(thing):\n    return thing.walk()\n\nd = Duck()\np = Person()\nprint(make_it_walk(d))\nprint(make_it_walk(p))',
    testCases: [
      { input: 'make_it_walk(Duck())', expectedOutput: 'Duck waddles', isHidden: false, description: 'Duck walks' },
      { input: 'make_it_walk(Person())', expectedOutput: 'Person strides', isHidden: true, description: 'Person walks' }
    ],
    hints: ['Duck typing: if it walks like a duck...', 'Function doesn\'t care about type, just that walk() exists'],
    language: 'python'
  },
  {
    id: 'cs103-t4-ex03',
    subjectId: 'cs103',
    topicId: 'cs103-4',
    title: 'Operator Overloading - __add__',
    difficulty: 2,
    description: 'Create a Vector class that supports addition using the + operator.',
    starterCode: 'class Vector:\n    def __init__(self, x, y):\n        pass\n    \n    def __add__(self, other):\n        pass\n    \n    def __repr__(self):\n        return f"Vector({self.x}, {self.y})"\n\nv1 = Vector(1, 2)\nv2 = Vector(3, 4)\nprint(v1 + v2)',
    solution: 'class Vector:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    \n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\n    \n    def __repr__(self):\n        return f"Vector({self.x}, {self.y})"\n\nv1 = Vector(1, 2)\nv2 = Vector(3, 4)\nprint(v1 + v2)',
    testCases: [
      { input: 'v1 = Vector(1, 2); v2 = Vector(3, 4); repr(v1 + v2)', expectedOutput: 'Vector(4, 6)', isHidden: false, description: 'Add vectors' }
    ],
    hints: ['__add__ is called when you use +', 'Return a new Vector with summed components'],
    language: 'python'
  },
  {
    id: 'cs103-t4-ex04',
    subjectId: 'cs103',
    topicId: 'cs103-4',
    title: 'Operator Overloading - __len__ and __str__',
    difficulty: 2,
    description: 'Create a Playlist class that supports len() and str().',
    starterCode: 'class Playlist:\n    def __init__(self, name):\n        self.name = name\n        self.songs = []\n    \n    def add_song(self, song):\n        pass\n    \n    def __len__(self):\n        pass\n    \n    def __str__(self):\n        pass\n\np = Playlist("My Hits")\np.add_song("Song A")\np.add_song("Song B")\nprint(len(p))\nprint(str(p))',
    solution: 'class Playlist:\n    def __init__(self, name):\n        self.name = name\n        self.songs = []\n    \n    def add_song(self, song):\n        self.songs.append(song)\n    \n    def __len__(self):\n        return len(self.songs)\n    \n    def __str__(self):\n        return f"{self.name} ({len(self.songs)} songs)"\n\np = Playlist("My Hits")\np.add_song("Song A")\np.add_song("Song B")\nprint(len(p))\nprint(str(p))',
    testCases: [
      { input: 'p = Playlist("X"); p.add_song("A"); len(p)', expectedOutput: '1', isHidden: false, description: 'Len of playlist' },
      { input: 'p = Playlist("Y"); p.add_song("A"); str(p)', expectedOutput: 'Y (1 songs)', isHidden: true, description: 'Str of playlist' }
    ],
    hints: ['__len__ is called by len()', '__str__ is called by str() or print()'],
    language: 'python'
  },
  {
    id: 'cs103-t4-ex05',
    subjectId: 'cs103',
    topicId: 'cs103-4',
    title: 'Comparison Overloading',
    difficulty: 3,
    description: 'Create a Student class that can be compared by GPA using <, >, and ==.',
    starterCode: 'class Student:\n    def __init__(self, name, gpa):\n        pass\n    \n    def __lt__(self, other):\n        pass\n    \n    def __gt__(self, other):\n        pass\n    \n    def __eq__(self, other):\n        pass\n\ns1 = Student("Alice", 3.5)\ns2 = Student("Bob", 3.8)\nprint(s1 < s2)',
    solution: 'class Student:\n    def __init__(self, name, gpa):\n        self.name = name\n        self.gpa = gpa\n    \n    def __lt__(self, other):\n        return self.gpa < other.gpa\n    \n    def __gt__(self, other):\n        return self.gpa > other.gpa\n    \n    def __eq__(self, other):\n        return self.gpa == other.gpa\n\ns1 = Student("Alice", 3.5)\ns2 = Student("Bob", 3.8)\nprint(s1 < s2)',
    testCases: [
      { input: 's1 = Student("A", 3.5); s2 = Student("B", 3.8); s1 < s2', expectedOutput: 'True', isHidden: false, description: '3.5 < 3.8' },
      { input: 's1 = Student("A", 4.0); s2 = Student("B", 4.0); s1 == s2', expectedOutput: 'True', isHidden: true, description: 'Equal GPAs' }
    ],
    hints: ['__lt__ handles <, __gt__ handles >', 'Compare GPAs, not names'],
    language: 'python'
  },
  {
    id: 'cs103-t4-ex06',
    subjectId: 'cs103',
    topicId: 'cs103-4',
    title: 'Polymorphic Payment Processing',
    difficulty: 3,
    description: 'Create payment types that all have pay() method. Write function to process any payment type.',
    starterCode: 'class Cash:\n    def pay(self, amount):\n        pass\n\nclass CreditCard:\n    def __init__(self, number):\n        pass\n    \n    def pay(self, amount):\n        pass\n\nclass Crypto:\n    def __init__(self, wallet):\n        pass\n    \n    def pay(self, amount):\n        pass\n\ndef process_payment(method, amount):\n    pass\n\nprint(process_payment(Cash(), 50))',
    solution: 'class Cash:\n    def pay(self, amount):\n        return f"Paid ${amount} in cash"\n\nclass CreditCard:\n    def __init__(self, number):\n        self.number = number\n    \n    def pay(self, amount):\n        return f"Charged ${amount} to card ending {self.number[-4:]}"\n\nclass Crypto:\n    def __init__(self, wallet):\n        self.wallet = wallet\n    \n    def pay(self, amount):\n        return f"Sent ${amount} to wallet {self.wallet[:8]}..."\n\ndef process_payment(method, amount):\n    return method.pay(amount)\n\nprint(process_payment(Cash(), 50))',
    testCases: [
      { input: 'process_payment(Cash(), 50)', expectedOutput: 'Paid $50 in cash', isHidden: false, description: 'Cash payment' },
      { input: 'process_payment(CreditCard("1234567890"), 100)', expectedOutput: 'Charged $100 to card ending 7890', isHidden: true, description: 'Card payment' }
    ],
    hints: ['All payment types have pay() method', 'process_payment works with any payment type'],
    language: 'python'
  },
  {
    id: 'cs103-t4-ex07',
    subjectId: 'cs103',
    topicId: 'cs103-4',
    title: 'Iterator Protocol',
    difficulty: 4,
    description: 'Create a Range class that works with for loops (implement __iter__ and __next__).',
    starterCode: 'class Range:\n    def __init__(self, start, end):\n        pass\n    \n    def __iter__(self):\n        pass\n    \n    def __next__(self):\n        pass\n\nfor i in Range(1, 4):\n    print(i)',
    solution: 'class Range:\n    def __init__(self, start, end):\n        self.start = start\n        self.end = end\n        self.current = start\n    \n    def __iter__(self):\n        self.current = self.start\n        return self\n    \n    def __next__(self):\n        if self.current >= self.end:\n            raise StopIteration\n        value = self.current\n        self.current += 1\n        return value\n\nfor i in Range(1, 4):\n    print(i)',
    testCases: [
      { input: 'list(Range(1, 4))', expectedOutput: '[1, 2, 3]', isHidden: false, description: 'Range 1 to 4' },
      { input: 'list(Range(0, 0))', expectedOutput: '[]', isHidden: true, description: 'Empty range' }
    ],
    hints: ['__iter__ returns self and resets position', '__next__ raises StopIteration when done'],
    language: 'python'
  },
  {
    id: 'cs103-t4-ex08',
    subjectId: 'cs103',
    topicId: 'cs103-4',
    title: 'Context Manager Protocol',
    difficulty: 5,
    description: 'Create a Timer context manager that measures code execution time.',
    starterCode: 'import time\n\nclass Timer:\n    def __enter__(self):\n        pass\n    \n    def __exit__(self, *args):\n        pass\n    \n    def elapsed(self):\n        pass\n\nwith Timer() as t:\n    time.sleep(0.1)\nprint(f"Took about {t.elapsed():.1f} seconds")',
    solution: 'import time\n\nclass Timer:\n    def __enter__(self):\n        self.start = time.time()\n        return self\n    \n    def __exit__(self, *args):\n        self.end = time.time()\n    \n    def elapsed(self):\n        return self.end - self.start\n\nwith Timer() as t:\n    time.sleep(0.1)\nprint(f"Took about {t.elapsed():.1f} seconds")',
    testCases: [
      { input: 'with Timer() as t:\n    pass\nt.elapsed() >= 0', expectedOutput: 'True', isHidden: false, description: 'Timer works' }
    ],
    hints: ['__enter__ starts timing, __exit__ stops', 'Return self from __enter__ to use as t'],
    language: 'python'
  },
  {
    id: 'cs103-t4-ex09',
    subjectId: 'cs103',
    topicId: 'cs103-4',
    title: 'Callable Objects',
    difficulty: 4,
    description: 'Create a Multiplier class that can be called like a function using __call__.',
    starterCode: 'class Multiplier:\n    def __init__(self, factor):\n        pass\n    \n    def __call__(self, value):\n        pass\n\ndouble = Multiplier(2)\ntriple = Multiplier(3)\nprint(double(5))\nprint(triple(5))',
    solution: 'class Multiplier:\n    def __init__(self, factor):\n        self.factor = factor\n    \n    def __call__(self, value):\n        return value * self.factor\n\ndouble = Multiplier(2)\ntriple = Multiplier(3)\nprint(double(5))\nprint(triple(5))',
    testCases: [
      { input: 'Multiplier(2)(5)', expectedOutput: '10', isHidden: false, description: 'Double 5' },
      { input: 'Multiplier(10)(3)', expectedOutput: '30', isHidden: true, description: '10x multiplier' }
    ],
    hints: ['__call__ makes instances callable', 'double(5) invokes double.__call__(5)'],
    language: 'python'
  },
  {
    id: 'cs103-t4-ex10',
    subjectId: 'cs103',
    topicId: 'cs103-4',
    title: 'Indexing and Slicing',
    difficulty: 4,
    description: 'Create a Sentence class that supports indexing to get words and len() to get word count.',
    starterCode: 'class Sentence:\n    def __init__(self, text):\n        pass\n    \n    def __getitem__(self, index):\n        pass\n    \n    def __len__(self):\n        pass\n\ns = Sentence("Hello world from Python")\nprint(s[0])\nprint(s[2])\nprint(len(s))',
    solution: 'class Sentence:\n    def __init__(self, text):\n        self.words = text.split()\n    \n    def __getitem__(self, index):\n        return self.words[index]\n    \n    def __len__(self):\n        return len(self.words)\n\ns = Sentence("Hello world from Python")\nprint(s[0])\nprint(s[2])\nprint(len(s))',
    testCases: [
      { input: 's = Sentence("a b c"); s[1]', expectedOutput: 'b', isHidden: false, description: 'Index word' },
      { input: 's = Sentence("one two three"); len(s)', expectedOutput: '3', isHidden: true, description: 'Word count' }
    ],
    hints: ['Split text into words in __init__', '__getitem__ enables indexing with []'],
    language: 'python'
  },
  {
    id: 'cs103-t4-drill-1',
    subjectId: 'cs103',
    topicId: 'cs103-4',
    title: 'Basic Method Override',
    difficulty: 1,
    description: 'Create Animal base class with speak(). Create Dog that overrides speak() to return "Woof".',
    starterCode: 'class Animal:\n    def speak(self):\n        return "..."\n\nclass Dog(Animal):\n    def speak(self):\n        pass\n\nd = Dog()\nprint(d.speak())',
    solution: 'class Animal:\n    def speak(self):\n        return "..."\n\nclass Dog(Animal):\n    def speak(self):\n        return "Woof"\n\nd = Dog()\nprint(d.speak())',
    testCases: [
      { input: 'Dog().speak()', expectedOutput: 'Woof', isHidden: false, description: 'Dog speaks' },
      { input: 'Animal().speak()', expectedOutput: '...', isHidden: true, description: 'Animal speaks' }
    ],
    hints: ['Override means redefine the method in child class', 'Child method replaces parent method'],
    language: 'python'
  },
  {
    id: 'cs103-t4-drill-2',
    subjectId: 'cs103',
    topicId: 'cs103-4',
    title: '__eq__ Override',
    difficulty: 1,
    description: 'Create a Point class where two points are equal if they have same x and y.',
    starterCode: 'class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    \n    def __eq__(self, other):\n        pass\n\np1 = Point(1, 2)\np2 = Point(1, 2)\np3 = Point(3, 4)\nprint(p1 == p2)\nprint(p1 == p3)',
    solution: 'class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    \n    def __eq__(self, other):\n        return self.x == other.x and self.y == other.y\n\np1 = Point(1, 2)\np2 = Point(1, 2)\np3 = Point(3, 4)\nprint(p1 == p2)\nprint(p1 == p3)',
    testCases: [
      { input: 'Point(1, 2) == Point(1, 2)', expectedOutput: 'True', isHidden: false, description: 'Equal points' },
      { input: 'Point(1, 2) == Point(3, 4)', expectedOutput: 'False', isHidden: true, description: 'Different points' }
    ],
    hints: ['__eq__ is called when you use ==', 'Compare both x and y values'],
    language: 'python'
  }
];
