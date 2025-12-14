import { CodingExercise } from '../../../../core/types';

export const topic3Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'cs103-ex-3',
    subjectId: 'cs103',
    topicId: 'cs103-3',
    title: 'Create a Vehicle Inheritance Hierarchy',
    difficulty: 2,
    description: 'Create a base Vehicle class with make, model, and year attributes. Then create a Car subclass that adds a num_doors attribute and overrides a describe() method.',
    starterCode: 'class Vehicle:\n    def __init__(self, make, model, year):\n        pass\n    \n    def describe(self):\n        pass\n\nclass Car(Vehicle):\n    def __init__(self, make, model, year, num_doors):\n        pass\n    \n    def describe(self):\n        pass',
    testCases: [
      { input: 'vehicle = Vehicle("Toyota", "Camry", 2020)\nprint(vehicle.describe())', expectedOutput: '2020 Toyota Camry', isHidden: false, description: 'Test base Vehicle' },
      { input: 'car = Car("Honda", "Civic", 2021, 4)\nprint(car.describe())', expectedOutput: '2021 Honda Civic (4 doors)', isHidden: false, description: 'Test Car subclass' }
    ],
    hints: ['Use super().__init__() in Car', 'Override describe() in Car to add door info'],
    solution: 'class Vehicle:\n    def __init__(self, make, model, year):\n        self.make = make\n        self.model = model\n        self.year = year\n    \n    def describe(self):\n        return f"{self.year} {self.make} {self.model}"\n\nclass Car(Vehicle):\n    def __init__(self, make, model, year, num_doors):\n        super().__init__(make, model, year)\n        self.num_doors = num_doors\n    \n    def describe(self):\n        return f"{self.year} {self.make} {self.model} ({self.num_doors} doors)"',
    language: 'python'
  },
  {
    id: 'cs103-t3-ex02',
    subjectId: 'cs103',
    topicId: 'cs103-3',
    title: 'Animal Hierarchy',
    difficulty: 1,
    description: 'Create an Animal base class with name and speak() method. Create Dog and Cat subclasses that override speak().',
    starterCode: 'class Animal:\n    def __init__(self, name):\n        pass\n    \n    def speak(self):\n        pass\n\nclass Dog(Animal):\n    def speak(self):\n        pass\n\nclass Cat(Animal):\n    def speak(self):\n        pass\n\nd = Dog("Buddy")\nprint(d.speak())',
    solution: 'class Animal:\n    def __init__(self, name):\n        self.name = name\n    \n    def speak(self):\n        return "..."\n\nclass Dog(Animal):\n    def speak(self):\n        return f"{self.name} says Woof!"\n\nclass Cat(Animal):\n    def speak(self):\n        return f"{self.name} says Meow!"\n\nd = Dog("Buddy")\nprint(d.speak())',
    testCases: [
      { input: 'd = Dog("Buddy"); d.speak()', expectedOutput: 'Buddy says Woof!', isHidden: false, description: 'Dog speaks' },
      { input: 'c = Cat("Whiskers"); c.speak()', expectedOutput: 'Whiskers says Meow!', isHidden: true, description: 'Cat speaks' }
    ],
    hints: ['Dog and Cat inherit name from Animal', 'Each subclass has its own speak() implementation'],
    language: 'python'
  },
  {
    id: 'cs103-t3-ex03',
    subjectId: 'cs103',
    topicId: 'cs103-3',
    title: 'Employee Hierarchy',
    difficulty: 2,
    description: 'Create Employee base class with name and salary. Create Manager subclass that adds department attribute.',
    starterCode: 'class Employee:\n    def __init__(self, name, salary):\n        pass\n    \n    def get_info(self):\n        pass\n\nclass Manager(Employee):\n    def __init__(self, name, salary, department):\n        pass\n    \n    def get_info(self):\n        pass\n\nm = Manager("Alice", 80000, "Engineering")\nprint(m.get_info())',
    solution: 'class Employee:\n    def __init__(self, name, salary):\n        self.name = name\n        self.salary = salary\n    \n    def get_info(self):\n        return f"{self.name}: ${self.salary}"\n\nclass Manager(Employee):\n    def __init__(self, name, salary, department):\n        super().__init__(name, salary)\n        self.department = department\n    \n    def get_info(self):\n        return f"{self.name}: ${self.salary}, {self.department} dept"\n\nm = Manager("Alice", 80000, "Engineering")\nprint(m.get_info())',
    testCases: [
      { input: 'm = Manager("A", 80000, "Eng"); m.get_info()', expectedOutput: 'A: $80000, Eng dept', isHidden: false, description: 'Manager info' },
      { input: 'e = Employee("B", 50000); e.get_info()', expectedOutput: 'B: $50000', isHidden: true, description: 'Employee info' }
    ],
    hints: ['Use super() to initialize Employee attributes', 'Override get_info() to include department'],
    language: 'python'
  },
  {
    id: 'cs103-t3-ex04',
    subjectId: 'cs103',
    topicId: 'cs103-3',
    title: 'Shape Hierarchy with Method Extension',
    difficulty: 2,
    description: 'Create Shape base class with color. Create Rectangle subclass that adds width, height and area() method.',
    starterCode: 'class Shape:\n    def __init__(self, color):\n        pass\n    \n    def describe(self):\n        pass\n\nclass Rectangle(Shape):\n    def __init__(self, color, width, height):\n        pass\n    \n    def area(self):\n        pass\n    \n    def describe(self):\n        pass\n\nr = Rectangle("red", 4, 5)\nprint(r.describe())',
    solution: 'class Shape:\n    def __init__(self, color):\n        self.color = color\n    \n    def describe(self):\n        return f"A {self.color} shape"\n\nclass Rectangle(Shape):\n    def __init__(self, color, width, height):\n        super().__init__(color)\n        self.width = width\n        self.height = height\n    \n    def area(self):\n        return self.width * self.height\n    \n    def describe(self):\n        return f"A {self.color} rectangle ({self.width}x{self.height})"\n\nr = Rectangle("red", 4, 5)\nprint(r.describe())',
    testCases: [
      { input: 'r = Rectangle("red", 4, 5); r.describe()', expectedOutput: 'A red rectangle (4x5)', isHidden: false, description: 'Rectangle describe' },
      { input: 'r = Rectangle("blue", 3, 3); r.area()', expectedOutput: '9', isHidden: true, description: 'Rectangle area' }
    ],
    hints: ['Call super().__init__(color)', 'area() is new method in Rectangle'],
    language: 'python'
  },
  {
    id: 'cs103-t3-ex05',
    subjectId: 'cs103',
    topicId: 'cs103-3',
    title: 'Using super() for Method Extension',
    difficulty: 3,
    description: 'Create a Logger class with log() method. Create TimestampLogger that extends log() to add timestamp prefix.',
    starterCode: 'from datetime import datetime\n\nclass Logger:\n    def log(self, message):\n        pass\n\nclass TimestampLogger(Logger):\n    def log(self, message):\n        # Call parent log with timestamp prefix\n        pass\n\nlogger = TimestampLogger()\nprint(logger.log("Hello"))',
    solution: 'from datetime import datetime\n\nclass Logger:\n    def log(self, message):\n        return f"LOG: {message}"\n\nclass TimestampLogger(Logger):\n    def log(self, message):\n        timestamp = datetime.now().strftime("%H:%M:%S")\n        return f"[{timestamp}] {super().log(message)}"\n\nlogger = TimestampLogger()\nprint(logger.log("Hello"))',
    testCases: [
      { input: 'l = Logger(); l.log("test")', expectedOutput: 'LOG: test', isHidden: false, description: 'Basic log' }
    ],
    hints: ['Use super().log(message) to get parent result', 'Add timestamp before the parent message'],
    language: 'python'
  },
  {
    id: 'cs103-t3-ex06',
    subjectId: 'cs103',
    topicId: 'cs103-3',
    title: 'Bank Account Types',
    difficulty: 3,
    description: 'Create BankAccount base class. Create SavingsAccount with interest rate and add_interest() method.',
    starterCode: 'class BankAccount:\n    def __init__(self, balance):\n        pass\n    \n    def deposit(self, amount):\n        pass\n    \n    def get_balance(self):\n        pass\n\nclass SavingsAccount(BankAccount):\n    def __init__(self, balance, interest_rate):\n        pass\n    \n    def add_interest(self):\n        pass\n\ns = SavingsAccount(1000, 0.05)\ns.add_interest()\nprint(s.get_balance())',
    solution: 'class BankAccount:\n    def __init__(self, balance):\n        self.balance = balance\n    \n    def deposit(self, amount):\n        self.balance += amount\n    \n    def get_balance(self):\n        return self.balance\n\nclass SavingsAccount(BankAccount):\n    def __init__(self, balance, interest_rate):\n        super().__init__(balance)\n        self.interest_rate = interest_rate\n    \n    def add_interest(self):\n        interest = self.balance * self.interest_rate\n        self.deposit(interest)\n\ns = SavingsAccount(1000, 0.05)\ns.add_interest()\nprint(s.get_balance())',
    testCases: [
      { input: 's = SavingsAccount(1000, 0.05); s.add_interest(); s.get_balance()', expectedOutput: '1050.0', isHidden: false, description: '5% interest' },
      { input: 's = SavingsAccount(100, 0.1); s.add_interest(); s.get_balance()', expectedOutput: '110.0', isHidden: true, description: '10% interest' }
    ],
    hints: ['SavingsAccount inherits deposit() from BankAccount', 'add_interest() uses self.deposit()'],
    language: 'python'
  },
  {
    id: 'cs103-t3-ex07',
    subjectId: 'cs103',
    topicId: 'cs103-3',
    title: 'Multi-level Inheritance',
    difficulty: 4,
    description: 'Create Person -> Student -> GraduateStudent hierarchy. Each level adds attributes.',
    starterCode: 'class Person:\n    def __init__(self, name):\n        pass\n\nclass Student(Person):\n    def __init__(self, name, student_id):\n        pass\n\nclass GraduateStudent(Student):\n    def __init__(self, name, student_id, thesis_topic):\n        pass\n    \n    def describe(self):\n        pass\n\ng = GraduateStudent("Alice", "G123", "AI Research")\nprint(g.describe())',
    solution: 'class Person:\n    def __init__(self, name):\n        self.name = name\n\nclass Student(Person):\n    def __init__(self, name, student_id):\n        super().__init__(name)\n        self.student_id = student_id\n\nclass GraduateStudent(Student):\n    def __init__(self, name, student_id, thesis_topic):\n        super().__init__(name, student_id)\n        self.thesis_topic = thesis_topic\n    \n    def describe(self):\n        return f"{self.name} ({self.student_id}): {self.thesis_topic}"\n\ng = GraduateStudent("Alice", "G123", "AI Research")\nprint(g.describe())',
    testCases: [
      { input: 'g = GraduateStudent("A", "123", "ML"); g.describe()', expectedOutput: 'A (123): ML', isHidden: false, description: 'Grad student' },
      { input: 'g = GraduateStudent("B", "456", "NLP"); g.name', expectedOutput: 'B', isHidden: true, description: 'Inherited name' }
    ],
    hints: ['Each level calls super().__init__() with appropriate args', 'GraduateStudent has access to all parent attributes'],
    language: 'python'
  },
  {
    id: 'cs103-t3-ex08',
    subjectId: 'cs103',
    topicId: 'cs103-3',
    title: 'Abstract Base Class Simulation',
    difficulty: 5,
    description: 'Create a PaymentProcessor base class. Subclasses CreditCard and PayPal implement process_payment() differently.',
    starterCode: 'class PaymentProcessor:\n    def process_payment(self, amount):\n        raise NotImplementedError("Subclass must implement")\n    \n    def validate_amount(self, amount):\n        return amount > 0\n\nclass CreditCard(PaymentProcessor):\n    def __init__(self, card_number):\n        pass\n    \n    def process_payment(self, amount):\n        pass\n\nclass PayPal(PaymentProcessor):\n    def __init__(self, email):\n        pass\n    \n    def process_payment(self, amount):\n        pass\n\ncc = CreditCard("1234")\nprint(cc.process_payment(100))',
    solution: 'class PaymentProcessor:\n    def process_payment(self, amount):\n        raise NotImplementedError("Subclass must implement")\n    \n    def validate_amount(self, amount):\n        return amount > 0\n\nclass CreditCard(PaymentProcessor):\n    def __init__(self, card_number):\n        self.card_number = card_number\n    \n    def process_payment(self, amount):\n        if self.validate_amount(amount):\n            return f"Charged ${amount} to card {self.card_number[-4:]}"\n        return "Invalid amount"\n\nclass PayPal(PaymentProcessor):\n    def __init__(self, email):\n        self.email = email\n    \n    def process_payment(self, amount):\n        if self.validate_amount(amount):\n            return f"Paid ${amount} via PayPal ({self.email})"\n        return "Invalid amount"\n\ncc = CreditCard("1234567890")\nprint(cc.process_payment(100))',
    testCases: [
      { input: 'cc = CreditCard("1234567890"); cc.process_payment(100)', expectedOutput: 'Charged $100 to card 7890', isHidden: false, description: 'Credit card payment' },
      { input: 'pp = PayPal("a@b.com"); pp.process_payment(50)', expectedOutput: 'Paid $50 via PayPal (a@b.com)', isHidden: true, description: 'PayPal payment' }
    ],
    hints: ['Base class defines interface with NotImplementedError', 'Subclasses must implement process_payment()'],
    language: 'python'
  },
  {
    id: 'cs103-t3-ex09',
    subjectId: 'cs103',
    topicId: 'cs103-3',
    title: 'Mixin Classes',
    difficulty: 4,
    description: 'Create a JSONMixin that adds a to_json() method. Create a Product class that uses this mixin alongside regular inheritance.',
    starterCode: 'import json\n\nclass JSONMixin:\n    def to_json(self):\n        pass\n\nclass Item:\n    def __init__(self, name):\n        self.name = name\n\nclass Product(Item, JSONMixin):\n    def __init__(self, name, price):\n        pass\n\np = Product("Widget", 9.99)\nprint(p.to_json())',
    solution: 'import json\n\nclass JSONMixin:\n    def to_json(self):\n        return json.dumps(self.__dict__)\n\nclass Item:\n    def __init__(self, name):\n        self.name = name\n\nclass Product(Item, JSONMixin):\n    def __init__(self, name, price):\n        super().__init__(name)\n        self.price = price\n\np = Product("Widget", 9.99)\nprint(p.to_json())',
    testCases: [
      { input: 'import json; p = Product("X", 5); json.loads(p.to_json())["name"]', expectedOutput: 'X', isHidden: false, description: 'JSON has name' },
      { input: 'import json; p = Product("Y", 10); json.loads(p.to_json())["price"]', expectedOutput: '10', isHidden: true, description: 'JSON has price' }
    ],
    hints: ['Mixin provides reusable functionality', 'self.__dict__ contains all instance attributes'],
    language: 'python'
  },
  {
    id: 'cs103-t3-ex10',
    subjectId: 'cs103',
    topicId: 'cs103-3',
    title: 'Method Resolution Order',
    difficulty: 5,
    description: 'Create a diamond inheritance pattern and use super() correctly. Classes A -> B, A -> C, and D inherits from both B and C.',
    starterCode: 'class A:\n    def greet(self):\n        return "A"\n\nclass B(A):\n    def greet(self):\n        return "B-" + super().greet()\n\nclass C(A):\n    def greet(self):\n        return "C-" + super().greet()\n\nclass D(B, C):\n    def greet(self):\n        return "D-" + super().greet()\n\nd = D()\nprint(d.greet())\nprint([c.__name__ for c in D.__mro__])',
    solution: 'class A:\n    def greet(self):\n        return "A"\n\nclass B(A):\n    def greet(self):\n        return "B-" + super().greet()\n\nclass C(A):\n    def greet(self):\n        return "C-" + super().greet()\n\nclass D(B, C):\n    def greet(self):\n        return "D-" + super().greet()\n\nd = D()\nprint(d.greet())\nprint([c.__name__ for c in D.__mro__])',
    testCases: [
      { input: 'd = D(); d.greet()', expectedOutput: 'D-B-C-A', isHidden: false, description: 'MRO followed' },
      { input: '[c.__name__ for c in D.__mro__]', expectedOutput: "['D', 'B', 'C', 'A', 'object']", isHidden: true, description: 'MRO list' }
    ],
    hints: ['MRO follows C3 linearization', 'super() follows MRO, not just parent'],
    language: 'python'
  },
  {
    id: 'cs103-t3-drill-1',
    subjectId: 'cs103',
    topicId: 'cs103-3',
    title: 'Basic Inheritance',
    difficulty: 1,
    description: 'Create a Child class that inherits from Parent. Child should inherit the greet() method.',
    starterCode: 'class Parent:\n    def greet(self):\n        return "Hello from Parent"\n\nclass Child(Parent):\n    pass\n\nc = Child()\nprint(c.greet())',
    solution: 'class Parent:\n    def greet(self):\n        return "Hello from Parent"\n\nclass Child(Parent):\n    pass\n\nc = Child()\nprint(c.greet())',
    testCases: [
      { input: 'Child().greet()', expectedOutput: 'Hello from Parent', isHidden: false, description: 'Inherited method' },
      { input: 'isinstance(Child(), Parent)', expectedOutput: 'True', isHidden: true, description: 'Is instance of Parent' }
    ],
    hints: ['Put parent class name in parentheses after class name', 'Child inherits all methods from Parent'],
    language: 'python'
  },
  {
    id: 'cs103-t3-drill-2',
    subjectId: 'cs103',
    topicId: 'cs103-3',
    title: 'Calling super()',
    difficulty: 1,
    description: 'Create a Square class that inherits from Rectangle. Use super() to initialize width and height to the same value.',
    starterCode: 'class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    \n    def area(self):\n        return self.width * self.height\n\nclass Square(Rectangle):\n    def __init__(self, side):\n        pass\n\ns = Square(5)\nprint(s.area())',
    solution: 'class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    \n    def area(self):\n        return self.width * self.height\n\nclass Square(Rectangle):\n    def __init__(self, side):\n        super().__init__(side, side)\n\ns = Square(5)\nprint(s.area())',
    testCases: [
      { input: 'Square(5).area()', expectedOutput: '25', isHidden: false, description: 'Square area' },
      { input: 'Square(3).width', expectedOutput: '3', isHidden: true, description: 'Width inherited' }
    ],
    hints: ['Call super().__init__(side, side)', 'Square is a Rectangle with equal sides'],
    language: 'python'
  }
];
