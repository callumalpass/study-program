import { CodingExercise } from '../../../core/types';

export const cs103Exercises: CodingExercise[] = [
  {
    id: 'cs103-ex-1',
    subjectId: 'cs103',
    topicId: 'cs103-1',
    title: 'Create a BankAccount Class',
    description: 'Create a BankAccount class with an account holder name and balance. Implement methods to deposit, withdraw, and check the balance. The withdraw method should not allow the balance to go negative.',
    starterCode: 'class BankAccount:\n    def __init__(self, account_holder, initial_balance=0):\n        # Your code here\n        pass\n    \n    def deposit(self, amount):\n        # Your code here\n        pass\n    \n    def withdraw(self, amount):\n        # Your code here\n        pass\n    \n    def get_balance(self):\n        # Your code here\n        pass',
    testCases: [
      {
        input: 'account = BankAccount("Alice", 100)\naccount.deposit(50)\nprint(account.get_balance())',
        expectedOutput: '150',
        isHidden: false,
        description: 'Test deposit functionality'
      },
      {
        input: 'account = BankAccount("Bob", 100)\naccount.withdraw(30)\nprint(account.get_balance())',
        expectedOutput: '70',
        isHidden: false,
        description: 'Test withdraw functionality'
      },
      {
        input: 'account = BankAccount("Charlie", 50)\naccount.withdraw(100)\nprint(account.get_balance())',
        expectedOutput: '50',
        isHidden: true,
        description: 'Test that withdraw prevents negative balance'
      }
    ],
    hints: [
      'Store account_holder and balance as instance variables in __init__',
      'For deposit, add the amount to the balance',
      'For withdraw, check if amount <= balance before subtracting',
      'Return the current balance in get_balance'
    ],
    solution: 'class BankAccount:\n    def __init__(self, account_holder, initial_balance=0):\n        self.account_holder = account_holder\n        self.balance = initial_balance\n    \n    def deposit(self, amount):\n        self.balance += amount\n    \n    def withdraw(self, amount):\n        if amount <= self.balance:\n            self.balance -= amount\n    \n    def get_balance(self):\n        return self.balance',
    language: 'python'
  },
  {
    id: 'cs103-ex-2',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Implement Encapsulation with Properties',
    description: 'Create a Temperature class that stores temperature in Celsius but prevents invalid temperatures below absolute zero (-273.15°C). Use a property to encapsulate the temperature attribute with validation.',
    starterCode: 'class Temperature:\n    def __init__(self, celsius):\n        # Your code here\n        pass\n    \n    @property\n    def celsius(self):\n        # Your code here\n        pass\n    \n    @celsius.setter\n    def celsius(self, value):\n        # Your code here\n        pass',
    testCases: [
      {
        input: 'temp = Temperature(25)\nprint(temp.celsius)',
        expectedOutput: '25',
        isHidden: false,
        description: 'Test setting valid temperature'
      },
      {
        input: 'temp = Temperature(0)\ntemp.celsius = 100\nprint(temp.celsius)',
        expectedOutput: '100',
        isHidden: false,
        description: 'Test updating temperature'
      },
      {
        input: 'temp = Temperature(20)\ntemp.celsius = -300\nprint(temp.celsius)',
        expectedOutput: '20',
        isHidden: true,
        description: 'Test that invalid temperature is rejected'
      }
    ],
    hints: [
      'Use a private variable like _celsius to store the actual value',
      'In the setter, check if value >= -273.15 before setting',
      'If the value is invalid, keep the current temperature unchanged',
      'The @property decorator makes celsius accessible like an attribute'
    ],
    solution: 'class Temperature:\n    def __init__(self, celsius):\n        self._celsius = celsius if celsius >= -273.15 else 0\n    \n    @property\n    def celsius(self):\n        return self._celsius\n    \n    @celsius.setter\n    def celsius(self, value):\n        if value >= -273.15:\n            self._celsius = value',
    language: 'python'
  },
  {
    id: 'cs103-ex-3',
    subjectId: 'cs103',
    topicId: 'cs103-3',
    title: 'Create a Vehicle Inheritance Hierarchy',
    description: 'Create a base Vehicle class with make, model, and year attributes. Then create a Car subclass that adds a num_doors attribute and overrides a describe() method to include door information.',
    starterCode: 'class Vehicle:\n    def __init__(self, make, model, year):\n        # Your code here\n        pass\n    \n    def describe(self):\n        # Your code here\n        pass\n\nclass Car(Vehicle):\n    def __init__(self, make, model, year, num_doors):\n        # Your code here\n        pass\n    \n    def describe(self):\n        # Your code here\n        pass',
    testCases: [
      {
        input: 'vehicle = Vehicle("Toyota", "Camry", 2020)\nprint(vehicle.describe())',
        expectedOutput: '2020 Toyota Camry',
        isHidden: false,
        description: 'Test base Vehicle class'
      },
      {
        input: 'car = Car("Honda", "Civic", 2021, 4)\nprint(car.describe())',
        expectedOutput: '2021 Honda Civic (4 doors)',
        isHidden: false,
        description: 'Test Car subclass'
      },
      {
        input: 'car = Car("Tesla", "Model 3", 2022, 4)\nprint(car.year)',
        expectedOutput: '2022',
        isHidden: true,
        description: 'Test that Car inherits Vehicle attributes'
      }
    ],
    hints: [
      'Use super().__init__() in Car to call the Vehicle constructor',
      'Store make, model, and year in the Vehicle __init__',
      'Return a formatted string from describe() methods',
      'In Car.describe(), include the num_doors information'
    ],
    solution: 'class Vehicle:\n    def __init__(self, make, model, year):\n        self.make = make\n        self.model = model\n        self.year = year\n    \n    def describe(self):\n        return f"{self.year} {self.make} {self.model}"\n\nclass Car(Vehicle):\n    def __init__(self, make, model, year, num_doors):\n        super().__init__(make, model, year)\n        self.num_doors = num_doors\n    \n    def describe(self):\n        return f"{self.year} {self.make} {self.model} ({self.num_doors} doors)"',
    language: 'python'
  },
  {
    id: 'cs103-ex-4',
    subjectId: 'cs103',
    topicId: 'cs103-4',
    title: 'Implement Polymorphism with Shapes',
    description: 'Create a Shape base class with an area() method. Create Circle and Rectangle subclasses that implement area() differently. Each shape should calculate its area correctly.',
    starterCode: 'import math\n\nclass Shape:\n    def area(self):\n        # Your code here\n        pass\n\nclass Circle(Shape):\n    def __init__(self, radius):\n        # Your code here\n        pass\n    \n    def area(self):\n        # Your code here\n        pass\n\nclass Rectangle(Shape):\n    def __init__(self, width, height):\n        # Your code here\n        pass\n    \n    def area(self):\n        # Your code here\n        pass',
    testCases: [
      {
        input: 'circle = Circle(5)\nprint(round(circle.area(), 2))',
        expectedOutput: '78.54',
        isHidden: false,
        description: 'Test circle area calculation'
      },
      {
        input: 'rectangle = Rectangle(4, 6)\nprint(rectangle.area())',
        expectedOutput: '24',
        isHidden: false,
        description: 'Test rectangle area calculation'
      },
      {
        input: 'shapes = [Circle(3), Rectangle(5, 5)]\ntotal = sum(s.area() for s in shapes)\nprint(round(total, 2))',
        expectedOutput: '53.27',
        isHidden: true,
        description: 'Test polymorphism with list of shapes'
      }
    ],
    hints: [
      'Circle area formula: π * radius²',
      'Rectangle area formula: width * height',
      'Use math.pi for the π constant',
      'Each subclass should override the area() method with its own implementation'
    ],
    solution: 'import math\n\nclass Shape:\n    def area(self):\n        return 0\n\nclass Circle(Shape):\n    def __init__(self, radius):\n        self.radius = radius\n    \n    def area(self):\n        return math.pi * self.radius ** 2\n\nclass Rectangle(Shape):\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    \n    def area(self):\n        return self.width * self.height',
    language: 'python'
  },
  {
    id: 'cs103-ex-5',
    subjectId: 'cs103',
    topicId: 'cs103-5',
    title: 'Implement a Simple Singleton Pattern',
    description: 'Implement a DatabaseConnection class using the Singleton pattern. The class should ensure only one instance exists and provide a get_instance() class method to access it.',
    starterCode: 'class DatabaseConnection:\n    _instance = None\n    \n    def __init__(self):\n        # Your code here\n        pass\n    \n    @classmethod\n    def get_instance(cls):\n        # Your code here\n        pass\n    \n    def connect(self):\n        return "Connected to database"',
    testCases: [
      {
        input: 'db1 = DatabaseConnection.get_instance()\ndb2 = DatabaseConnection.get_instance()\nprint(db1 is db2)',
        expectedOutput: 'True',
        isHidden: false,
        description: 'Test that same instance is returned'
      },
      {
        input: 'db = DatabaseConnection.get_instance()\nprint(db.connect())',
        expectedOutput: 'Connected to database',
        isHidden: false,
        description: 'Test database connection method'
      },
      {
        input: 'instances = [DatabaseConnection.get_instance() for _ in range(5)]\nprint(all(i is instances[0] for i in instances))',
        expectedOutput: 'True',
        isHidden: true,
        description: 'Test multiple calls return same instance'
      }
    ],
    hints: [
      'Check if _instance is None in get_instance()',
      'If _instance is None, create a new instance using cls()',
      'Store the instance in _instance before returning it',
      'Always return _instance from get_instance()'
    ],
    solution: 'class DatabaseConnection:\n    _instance = None\n    \n    def __init__(self):\n        pass\n    \n    @classmethod\n    def get_instance(cls):\n        if cls._instance is None:\n            cls._instance = cls()\n        return cls._instance\n    \n    def connect(self):\n        return "Connected to database"',
    language: 'python'
  }
];
