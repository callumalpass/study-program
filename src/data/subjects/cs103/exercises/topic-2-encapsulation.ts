import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  // EXISTING exercise - preserve ID
  {
    id: 'cs103-ex-2',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Implement Encapsulation with Properties',
    difficulty: 3,
    description: 'Create a Temperature class that stores temperature in Celsius but prevents invalid temperatures below absolute zero (-273.15°C). Use a property to encapsulate the temperature attribute with validation.',
    starterCode: 'class Temperature:\n    def __init__(self, celsius):\n        pass\n    \n    @property\n    def celsius(self):\n        pass\n    \n    @celsius.setter\n    def celsius(self, value):\n        pass',
    testCases: [
      { input: 'temp = Temperature(25)\nprint(temp.celsius)', expectedOutput: '25', isHidden: false, description: 'Test setting valid temperature' },
      { input: 'temp = Temperature(0)\ntemp.celsius = 100\nprint(temp.celsius)', expectedOutput: '100', isHidden: false, description: 'Test updating temperature' },
      { input: 'temp = Temperature(20)\ntemp.celsius = -300\nprint(temp.celsius)', expectedOutput: '20', isHidden: true, description: 'Test that invalid temperature is rejected' }
    ],
    hints: ['Use a private variable like _celsius', 'In the setter, check if value >= -273.15'],
    solution: 'class Temperature:\n    def __init__(self, celsius):\n        self._celsius = celsius if celsius >= -273.15 else 0\n    \n    @property\n    def celsius(self):\n        return self._celsius\n    \n    @celsius.setter\n    def celsius(self, value):\n        if value >= -273.15:\n            self._celsius = value',
    language: 'python'
  },
  {
    id: 'cs103-t2-ex02',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Private Counter',
    difficulty: 1,
    description: 'Create a Counter class with a private count variable. Provide a get_count method and an increment method.',
    starterCode: 'class Counter:\n    def __init__(self):\n        # Use _count for private variable\n        pass\n    \n    def get_count(self):\n        pass\n    \n    def increment(self):\n        pass\n\nc = Counter()\nc.increment()\nprint(c.get_count())',
    solution: 'class Counter:\n    def __init__(self):\n        self._count = 0\n    \n    def get_count(self):\n        return self._count\n    \n    def increment(self):\n        self._count += 1\n\nc = Counter()\nc.increment()\nprint(c.get_count())',
    testCases: [
      { input: 'c = Counter(); c.increment(); c.get_count()', expectedOutput: '1', isHidden: false, description: 'Increment and get' },
      { input: 'c = Counter(); c.get_count()', expectedOutput: '0', isHidden: true, description: 'Initial count' }
    ],
    hints: ['Use _ prefix for private variables', 'External code should use get_count() not _count'],
    language: 'python'
  },
  {
    id: 'cs103-t2-ex03',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Read-Only Property',
    difficulty: 2,
    description: 'Create a Circle class where radius can be set but area is read-only (calculated property).',
    starterCode: 'import math\n\nclass Circle:\n    def __init__(self, radius):\n        pass\n    \n    @property\n    def area(self):\n        # Read-only: no setter\n        pass\n\nc = Circle(5)\nprint(round(c.area, 2))',
    solution: 'import math\n\nclass Circle:\n    def __init__(self, radius):\n        self.radius = radius\n    \n    @property\n    def area(self):\n        return math.pi * self.radius ** 2\n\nc = Circle(5)\nprint(round(c.area, 2))',
    testCases: [
      { input: 'c = Circle(5); round(c.area, 2)', expectedOutput: '78.54', isHidden: false, description: 'Area of radius 5' },
      { input: 'c = Circle(1); round(c.area, 2)', expectedOutput: '3.14', isHidden: true, description: 'Area of radius 1' }
    ],
    hints: ['@property without setter makes it read-only', 'Use math.pi for calculations'],
    language: 'python'
  },
  {
    id: 'cs103-t2-ex04',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Age Validation',
    difficulty: 2,
    description: 'Create a Person class where age is validated (must be 0-150). Invalid ages should be ignored.',
    starterCode: 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self._age = 0\n        self.age = age  # Use setter\n    \n    @property\n    def age(self):\n        pass\n    \n    @age.setter\n    def age(self, value):\n        pass\n\np = Person("Alice", 30)\nprint(p.age)',
    solution: 'class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self._age = 0\n        self.age = age\n    \n    @property\n    def age(self):\n        return self._age\n    \n    @age.setter\n    def age(self, value):\n        if 0 <= value <= 150:\n            self._age = value\n\np = Person("Alice", 30)\nprint(p.age)',
    testCases: [
      { input: 'p = Person("A", 30); p.age', expectedOutput: '30', isHidden: false, description: 'Valid age' },
      { input: 'p = Person("B", 200); p.age', expectedOutput: '0', isHidden: true, description: 'Invalid age ignored' }
    ],
    hints: ['Check 0 <= value <= 150 in setter', 'Invalid values should not change _age'],
    language: 'python'
  },
  {
    id: 'cs103-t2-ex05',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Bank Account with Balance Protection',
    difficulty: 3,
    description: 'Create a BankAccount where balance can only be modified through deposit/withdraw methods, not directly.',
    starterCode: 'class BankAccount:\n    def __init__(self, initial):\n        self.__balance = initial\n    \n    @property\n    def balance(self):\n        pass\n    \n    def deposit(self, amount):\n        pass\n    \n    def withdraw(self, amount):\n        pass\n\nacc = BankAccount(100)\nacc.deposit(50)\nprint(acc.balance)',
    solution: 'class BankAccount:\n    def __init__(self, initial):\n        self.__balance = initial\n    \n    @property\n    def balance(self):\n        return self.__balance\n    \n    def deposit(self, amount):\n        if amount > 0:\n            self.__balance += amount\n    \n    def withdraw(self, amount):\n        if 0 < amount <= self.__balance:\n            self.__balance -= amount\n\nacc = BankAccount(100)\nacc.deposit(50)\nprint(acc.balance)',
    testCases: [
      { input: 'a = BankAccount(100); a.deposit(50); a.balance', expectedOutput: '150', isHidden: false, description: 'Deposit works' },
      { input: 'a = BankAccount(100); a.withdraw(200); a.balance', expectedOutput: '100', isHidden: true, description: 'Overdraft prevented' }
    ],
    hints: ['Use __ prefix for name mangling', 'No setter for balance = truly protected'],
    language: 'python'
  },
  {
    id: 'cs103-t2-ex06',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Email Validation',
    difficulty: 3,
    description: 'Create a User class with email property that validates email contains @ symbol.',
    starterCode: 'class User:\n    def __init__(self, name, email):\n        self.name = name\n        self._email = ""\n        self.email = email\n    \n    @property\n    def email(self):\n        pass\n    \n    @email.setter\n    def email(self, value):\n        pass\n\nu = User("Alice", "alice@test.com")\nprint(u.email)',
    solution: 'class User:\n    def __init__(self, name, email):\n        self.name = name\n        self._email = ""\n        self.email = email\n    \n    @property\n    def email(self):\n        return self._email\n    \n    @email.setter\n    def email(self, value):\n        if "@" in value:\n            self._email = value\n\nu = User("Alice", "alice@test.com")\nprint(u.email)',
    testCases: [
      { input: 'u = User("A", "a@b.com"); u.email', expectedOutput: 'a@b.com', isHidden: false, description: 'Valid email' },
      { input: 'u = User("B", "invalid"); u.email', expectedOutput: '', isHidden: true, description: 'Invalid email rejected' }
    ],
    hints: ['Check if "@" in value', 'Reject emails without @'],
    language: 'python'
  },
  {
    id: 'cs103-t2-ex07',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Immutable Point',
    difficulty: 4,
    description: 'Create a Point class where x and y are set once in constructor and cannot be changed afterward.',
    starterCode: 'class Point:\n    def __init__(self, x, y):\n        self.__x = x\n        self.__y = y\n    \n    @property\n    def x(self):\n        pass\n    \n    @property\n    def y(self):\n        pass\n    \n    def distance_from_origin(self):\n        pass\n\np = Point(3, 4)\nprint(p.distance_from_origin())',
    solution: 'class Point:\n    def __init__(self, x, y):\n        self.__x = x\n        self.__y = y\n    \n    @property\n    def x(self):\n        return self.__x\n    \n    @property\n    def y(self):\n        return self.__y\n    \n    def distance_from_origin(self):\n        return (self.__x ** 2 + self.__y ** 2) ** 0.5\n\np = Point(3, 4)\nprint(p.distance_from_origin())',
    testCases: [
      { input: 'p = Point(3, 4); p.distance_from_origin()', expectedOutput: '5.0', isHidden: false, description: '3-4-5 triangle' },
      { input: 'p = Point(0, 0); p.distance_from_origin()', expectedOutput: '0.0', isHidden: true, description: 'Origin' }
    ],
    hints: ['Read-only properties = no setter', 'Distance = sqrt(x^2 + y^2)'],
    language: 'python'
  },
  {
    id: 'cs103-t2-ex08',
    subjectId: 'cs103',
    topicId: 'cs103-2',
    title: 'Password Hasher',
    difficulty: 5,
    description: 'Create a UserAccount class where password is stored hashed (use simple hash for demo). Password can only be verified, not retrieved.',
    starterCode: 'class UserAccount:\n    def __init__(self, username, password):\n        self.username = username\n        self.__password_hash = self._hash(password)\n    \n    def _hash(self, value):\n        # Simple hash for demo\n        return sum(ord(c) for c in value)\n    \n    def verify_password(self, password):\n        pass\n    \n    def change_password(self, old_pw, new_pw):\n        pass\n\nu = UserAccount("alice", "secret")\nprint(u.verify_password("secret"))',
    solution: 'class UserAccount:\n    def __init__(self, username, password):\n        self.username = username\n        self.__password_hash = self._hash(password)\n    \n    def _hash(self, value):\n        return sum(ord(c) for c in value)\n    \n    def verify_password(self, password):\n        return self._hash(password) == self.__password_hash\n    \n    def change_password(self, old_pw, new_pw):\n        if self.verify_password(old_pw):\n            self.__password_hash = self._hash(new_pw)\n            return True\n        return False\n\nu = UserAccount("alice", "secret")\nprint(u.verify_password("secret"))',
    testCases: [
      { input: 'u = UserAccount("a", "pass"); u.verify_password("pass")', expectedOutput: 'True', isHidden: false, description: 'Correct password' },
      { input: 'u = UserAccount("b", "x"); u.verify_password("y")', expectedOutput: 'False', isHidden: true, description: 'Wrong password' }
    ],
    hints: ['Never store or return the actual password', 'Compare hashes instead'],
    language: 'python'
  }
];
