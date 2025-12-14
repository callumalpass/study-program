import { CodingExercise } from '../../../../core/types';

export const topic1Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'cs103-ex-1',
    subjectId: 'cs103',
    topicId: 'cs103-1',
    title: 'Create a BankAccount Class',
    difficulty: 2,
    description: 'Create a BankAccount class with an account holder name and balance. Implement methods to deposit, withdraw, and check the balance. The withdraw method should not allow the balance to go negative.',
    starterCode: 'class BankAccount:\n    def __init__(self, account_holder, initial_balance=0):\n        # Your code here\n        pass\n    \n    def deposit(self, amount):\n        pass\n    \n    def withdraw(self, amount):\n        pass\n    \n    def get_balance(self):\n        pass',
    testCases: [
      { input: 'account = BankAccount("Alice", 100)\naccount.deposit(50)\nprint(account.get_balance())', expectedOutput: '150', isHidden: false, description: 'Test deposit functionality' },
      { input: 'account = BankAccount("Bob", 100)\naccount.withdraw(30)\nprint(account.get_balance())', expectedOutput: '70', isHidden: false, description: 'Test withdraw functionality' },
      { input: 'account = BankAccount("Charlie", 50)\naccount.withdraw(100)\nprint(account.get_balance())', expectedOutput: '50', isHidden: true, description: 'Test that withdraw prevents negative balance' }
    ],
    hints: ['Store account_holder and balance as instance variables in __init__', 'For withdraw, check if amount <= balance before subtracting'],
    solution: 'class BankAccount:\n    def __init__(self, account_holder, initial_balance=0):\n        self.account_holder = account_holder\n        self.balance = initial_balance\n    \n    def deposit(self, amount):\n        self.balance += amount\n    \n    def withdraw(self, amount):\n        if amount <= self.balance:\n            self.balance -= amount\n    \n    def get_balance(self):\n        return self.balance',
    language: 'python'
  },
  {
    id: 'cs103-t1-ex02',
    subjectId: 'cs103',
    topicId: 'cs103-1',
    title: 'Simple Counter Class',
    difficulty: 1,
    description: 'Create a Counter class that starts at 0 and has methods to increment, decrement, and get the current count.',
    starterCode: 'class Counter:\n    def __init__(self):\n        pass\n    \n    def increment(self):\n        pass\n    \n    def decrement(self):\n        pass\n    \n    def get_count(self):\n        pass\n\nc = Counter()\nc.increment()\nc.increment()\nprint(c.get_count())',
    solution: 'class Counter:\n    def __init__(self):\n        self.count = 0\n    \n    def increment(self):\n        self.count += 1\n    \n    def decrement(self):\n        self.count -= 1\n    \n    def get_count(self):\n        return self.count\n\nc = Counter()\nc.increment()\nc.increment()\nprint(c.get_count())',
    testCases: [
      { input: 'c = Counter(); c.increment(); c.increment(); c.get_count()', expectedOutput: '2', isHidden: false, description: 'Increment twice' },
      { input: 'c = Counter(); c.decrement(); c.get_count()', expectedOutput: '-1', isHidden: true, description: 'Decrement from 0' }
    ],
    hints: ['Initialize count to 0 in __init__', 'Use self.count to access the instance variable'],
    language: 'python'
  },
  {
    id: 'cs103-t1-ex03',
    subjectId: 'cs103',
    topicId: 'cs103-1',
    title: 'Person Class',
    difficulty: 1,
    description: 'Create a Person class with name and age attributes. Add a greet() method that returns "Hello, my name is [name]".',
    starterCode: 'class Person:\n    def __init__(self, name, age):\n        pass\n    \n    def greet(self):\n        pass\n\np = Person("Alice", 30)\nprint(p.greet())',
    solution: 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    \n    def greet(self):\n        return f"Hello, my name is {self.name}"\n\np = Person("Alice", 30)\nprint(p.greet())',
    testCases: [
      { input: 'p = Person("Alice", 30); p.greet()', expectedOutput: 'Hello, my name is Alice', isHidden: false, description: 'Greet Alice' },
      { input: 'p = Person("Bob", 25); p.age', expectedOutput: '25', isHidden: true, description: 'Access age' }
    ],
    hints: ['Store both name and age in __init__', 'Use an f-string in greet()'],
    language: 'python'
  },
  {
    id: 'cs103-t1-ex04',
    subjectId: 'cs103',
    topicId: 'cs103-1',
    title: 'Rectangle Class',
    difficulty: 2,
    description: 'Create a Rectangle class with width and height. Add methods to calculate area and perimeter.',
    starterCode: 'class Rectangle:\n    def __init__(self, width, height):\n        pass\n    \n    def area(self):\n        pass\n    \n    def perimeter(self):\n        pass\n\nr = Rectangle(5, 3)\nprint(r.area())\nprint(r.perimeter())',
    solution: 'class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    \n    def area(self):\n        return self.width * self.height\n    \n    def perimeter(self):\n        return 2 * (self.width + self.height)\n\nr = Rectangle(5, 3)\nprint(r.area())\nprint(r.perimeter())',
    testCases: [
      { input: 'r = Rectangle(5, 3); r.area()', expectedOutput: '15', isHidden: false, description: 'Area of 5x3' },
      { input: 'r = Rectangle(5, 3); r.perimeter()', expectedOutput: '16', isHidden: false, description: 'Perimeter of 5x3' }
    ],
    hints: ['Area = width * height', 'Perimeter = 2 * (width + height)'],
    language: 'python'
  },
  {
    id: 'cs103-t1-ex05',
    subjectId: 'cs103',
    topicId: 'cs103-1',
    title: 'Student Class',
    difficulty: 2,
    description: 'Create a Student class with name and a list of grades. Add methods to add a grade and calculate the average.',
    starterCode: 'class Student:\n    def __init__(self, name):\n        pass\n    \n    def add_grade(self, grade):\n        pass\n    \n    def get_average(self):\n        pass\n\ns = Student("Alice")\ns.add_grade(90)\ns.add_grade(80)\nprint(s.get_average())',
    solution: 'class Student:\n    def __init__(self, name):\n        self.name = name\n        self.grades = []\n    \n    def add_grade(self, grade):\n        self.grades.append(grade)\n    \n    def get_average(self):\n        if not self.grades:\n            return 0\n        return sum(self.grades) / len(self.grades)\n\ns = Student("Alice")\ns.add_grade(90)\ns.add_grade(80)\nprint(s.get_average())',
    testCases: [
      { input: 's = Student("A"); s.add_grade(90); s.add_grade(80); s.get_average()', expectedOutput: '85.0', isHidden: false, description: 'Average of 90 and 80' },
      { input: 's = Student("B"); s.get_average()', expectedOutput: '0', isHidden: true, description: 'Empty grades' }
    ],
    hints: ['Initialize grades as empty list', 'Handle empty list case in get_average'],
    language: 'python'
  },
  {
    id: 'cs103-t1-ex06',
    subjectId: 'cs103',
    topicId: 'cs103-1',
    title: 'Book Class',
    difficulty: 3,
    description: 'Create a Book class with title, author, and pages. Add a __str__ method and a method to check if the book is long (>300 pages).',
    starterCode: 'class Book:\n    def __init__(self, title, author, pages):\n        pass\n    \n    def __str__(self):\n        pass\n    \n    def is_long(self):\n        pass\n\nb = Book("Python Guide", "Author", 450)\nprint(b)\nprint(b.is_long())',
    solution: 'class Book:\n    def __init__(self, title, author, pages):\n        self.title = title\n        self.author = author\n        self.pages = pages\n    \n    def __str__(self):\n        return f"{self.title} by {self.author}"\n    \n    def is_long(self):\n        return self.pages > 300\n\nb = Book("Python Guide", "Author", 450)\nprint(b)\nprint(b.is_long())',
    testCases: [
      { input: 'b = Book("Test", "Author", 450); str(b)', expectedOutput: 'Test by Author', isHidden: false, description: 'String representation' },
      { input: 'b = Book("Short", "X", 100); b.is_long()', expectedOutput: 'False', isHidden: true, description: 'Short book' }
    ],
    hints: ['__str__ is called when you print() or str() an object', 'is_long() should return a boolean'],
    language: 'python'
  },
  {
    id: 'cs103-t1-ex07',
    subjectId: 'cs103',
    topicId: 'cs103-1',
    title: 'Stack Class',
    difficulty: 3,
    description: 'Create a Stack class that implements push, pop, peek (view top without removing), and is_empty methods.',
    starterCode: 'class Stack:\n    def __init__(self):\n        pass\n    \n    def push(self, item):\n        pass\n    \n    def pop(self):\n        pass\n    \n    def peek(self):\n        pass\n    \n    def is_empty(self):\n        pass\n\ns = Stack()\ns.push(1)\ns.push(2)\nprint(s.pop())\nprint(s.peek())',
    solution: 'class Stack:\n    def __init__(self):\n        self.items = []\n    \n    def push(self, item):\n        self.items.append(item)\n    \n    def pop(self):\n        if self.items:\n            return self.items.pop()\n        return None\n    \n    def peek(self):\n        if self.items:\n            return self.items[-1]\n        return None\n    \n    def is_empty(self):\n        return len(self.items) == 0\n\ns = Stack()\ns.push(1)\ns.push(2)\nprint(s.pop())\nprint(s.peek())',
    testCases: [
      { input: 's = Stack(); s.push(1); s.push(2); s.pop()', expectedOutput: '2', isHidden: false, description: 'Pop returns last pushed' },
      { input: 's = Stack(); s.is_empty()', expectedOutput: 'True', isHidden: true, description: 'Empty stack' }
    ],
    hints: ['Use a list internally to store items', 'Pop and peek should handle empty stack'],
    language: 'python'
  },
  {
    id: 'cs103-t1-ex08',
    subjectId: 'cs103',
    topicId: 'cs103-1',
    title: 'Shopping Cart',
    difficulty: 4,
    description: 'Create Item and ShoppingCart classes. Item has name and price. Cart can add items, remove items, and calculate total.',
    starterCode: 'class Item:\n    def __init__(self, name, price):\n        pass\n\nclass ShoppingCart:\n    def __init__(self):\n        pass\n    \n    def add_item(self, item):\n        pass\n    \n    def remove_item(self, name):\n        pass\n    \n    def get_total(self):\n        pass\n\ncart = ShoppingCart()\ncart.add_item(Item("Apple", 1.50))\ncart.add_item(Item("Bread", 2.00))\nprint(cart.get_total())',
    solution: 'class Item:\n    def __init__(self, name, price):\n        self.name = name\n        self.price = price\n\nclass ShoppingCart:\n    def __init__(self):\n        self.items = []\n    \n    def add_item(self, item):\n        self.items.append(item)\n    \n    def remove_item(self, name):\n        self.items = [i for i in self.items if i.name != name]\n    \n    def get_total(self):\n        return sum(item.price for item in self.items)\n\ncart = ShoppingCart()\ncart.add_item(Item("Apple", 1.50))\ncart.add_item(Item("Bread", 2.00))\nprint(cart.get_total())',
    testCases: [
      { input: 'cart = ShoppingCart(); cart.add_item(Item("A", 1.50)); cart.add_item(Item("B", 2.00)); cart.get_total()', expectedOutput: '3.5', isHidden: false, description: 'Total of cart' },
      { input: 'cart = ShoppingCart(); cart.add_item(Item("A", 5)); cart.remove_item("A"); cart.get_total()', expectedOutput: '0', isHidden: true, description: 'After removal' }
    ],
    hints: ['Store items as a list in ShoppingCart', 'Use list comprehension to filter when removing'],
    language: 'python'
  }
];
