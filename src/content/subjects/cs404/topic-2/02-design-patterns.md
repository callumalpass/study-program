# Design Patterns

## Introduction

Design patterns are proven solutions to common software design problems. They're not code you can copy-paste, but rather templates for structuring your code to solve recurring challenges. Understanding and applying design patterns makes your code more maintainable, flexible, and communicates design intent clearly to other developers.

For capstone projects, you don't need to use every pattern, but recognizing common scenarios where patterns apply demonstrates software engineering maturity. The key is knowing when a pattern helps versus when it adds unnecessary complexity.

## Learning Objectives

By the end of this lesson, you will be able to:

- Identify common design problems and appropriate patterns
- Apply creational, structural, and behavioral patterns
- Implement patterns in your chosen programming language
- Recognize when patterns add value vs. complexity
- Refactor code to introduce patterns incrementally
- Explain pattern trade-offs and alternatives
- Use patterns to improve code testability and maintainability

## Pattern Categories

### Creational Patterns
Control object creation mechanisms.

### Structural Patterns  
Compose objects and classes into larger structures.

### Behavioral Patterns
Define communication between objects and responsibility assignment.

## Common Patterns for Web Applications

### Singleton Pattern

**Purpose:** Ensure a class has only one instance with global access.

**When to Use:**
- Database connection pools
- Configuration objects
- Logging services
- Application-wide state

**TypeScript Example:**
\`\`\`typescript
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: any;

  private constructor() {
    // Initialize database connection
    this.connection = createConnection();
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public query(sql: string) {
    return this.connection.query(sql);
  }
}

// Usage
const db = DatabaseConnection.getInstance();
\`\`\`

**Pros:**
- Controlled access to single instance
- Reduced memory footprint
- Global state management

**Cons:**
- Can hide dependencies
- Harder to test (global state)
- Can become anti-pattern if overused

**Testing Consideration:**
\`\`\`typescript
// Make testable with dependency injection instead
class UserService {
  constructor(private db: DatabaseConnection) {}
}

// Test
const mockDb = new MockDatabase();
const service = new UserService(mockDb);
\`\`\`

### Factory Pattern

**Purpose:** Create objects without specifying exact class.

**When to Use:**
- Object creation logic is complex
- Need to switch between different implementations
- Want to encapsulate object creation

**TypeScript Example:**
\`\`\`typescript
interface PaymentProcessor {
  processPayment(amount: number): Promise<void>;
}

class StripeProcessor implements PaymentProcessor {
  async processPayment(amount: number) {
    // Stripe-specific logic
  }
}

class PayPalProcessor implements PaymentProcessor {
  async processPayment(amount: number) {
    // PayPal-specific logic
  }
}

class PaymentProcessorFactory {
  static create(type: 'stripe' | 'paypal'): PaymentProcessor {
    switch (type) {
      case 'stripe':
        return new StripeProcessor();
      case 'paypal':
        return new PayPalProcessor();
      default:
        throw new Error('Unknown payment processor');
    }
  }
}

// Usage
const processor = PaymentProcessorFactory.create('stripe');
await processor.processPayment(100);
\`\`\`

**Benefits:**
- Decouples client from concrete classes
- Easy to add new types
- Centralized creation logic

### Repository Pattern

**Purpose:** Separate data access logic from business logic.

**When to Use:**
- Working with databases
- Need to swap data sources
- Want testable business logic

**TypeScript Example:**
\`\`\`typescript
interface User {
  id: string;
  email: string;
  name: string;
}

interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: Omit<User, 'id'>): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}

class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}

// Business logic doesn't know about Prisma
class UserService {
  constructor(private userRepo: UserRepository) {}

  async registerUser(email: string, name: string) {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) {
      throw new Error('Email already registered');
    }
    return this.userRepo.create({ email, name });
  }
}
\`\`\`

**Benefits:**
- Business logic independent of data access
- Easy to test with mock repositories
- Can swap databases without changing business logic
- Centralizes data access patterns

### Dependency Injection

**Purpose:** Provide dependencies from outside rather than creating them internally.

**When to Use:**
- Want testable code
- Need to swap implementations
- Following SOLID principles

**TypeScript Example:**
\`\`\`typescript
// Without DI (hard to test)
class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService(); // Tight coupling
  }
}

// With DI (testable)
class UserController {
  constructor(private userService: UserService) {}
  
  async createUser(req: Request, res: Response) {
    const user = await this.userService.registerUser(
      req.body.email,
      req.body.name
    );
    res.json(user);
  }
}

// Production
const userRepo = new PrismaUserRepository(prisma);
const userService = new UserService(userRepo);
const userController = new UserController(userService);

// Testing
const mockService = new MockUserService();
const controller = new UserController(mockService);
\`\`\`

**Benefits:**
- Loose coupling
- Easy testing
- Flexible configuration
- Clear dependencies

### Strategy Pattern

**Purpose:** Define family of algorithms, make them interchangeable.

**When to Use:**
- Multiple ways to perform operation
- Want to switch algorithms at runtime
- Avoid conditional logic

**TypeScript Example:**
\`\`\`typescript
interface CarbonCalculationStrategy {
  calculate(quantity: number): number;
}

class CarCarbonStrategy implements CarbonCalculationStrategy {
  calculate(miles: number): number {
    return miles * 0.404; // kg CO2 per mile
  }
}

class BusCarbonStrategy implements CarbonCalculationStrategy {
  calculate(miles: number): number {
    return miles * 0.089; // kg CO2 per mile
  }
}

class FlightCarbonStrategy implements CarbonCalculationStrategy {
  calculate(miles: number): number {
    return miles * 0.257; // kg CO2 per mile
  }
}

class ActivityCarbonCalculator {
  private strategy: CarbonCalculationStrategy;

  setStrategy(strategy: CarbonCalculationStrategy) {
    this.strategy = strategy;
  }

  calculate(quantity: number): number {
    return this.strategy.calculate(quantity);
  }
}

// Usage
const calculator = new ActivityCarbonCalculator();

calculator.setStrategy(new CarCarbonStrategy());
const carEmissions = calculator.calculate(100); // 40.4 kg CO2

calculator.setStrategy(new BusCarbonStrategy());
const busEmissions = calculator.calculate(100); // 8.9 kg CO2
\`\`\`

**Benefits:**
- Eliminates conditional statements
- Easy to add new strategies
- Testable in isolation
- Clear separation of algorithms

### Observer Pattern

**Purpose:** Define one-to-many dependency where state changes notify dependents.

**When to Use:**
- Event handling
- Real-time updates
- Decoupled communication

**TypeScript Example:**
\`\`\`typescript
interface Observer {
  update(data: any): void;
}

class Subject {
  private observers: Observer[] = [];

  attach(observer: Observer) {
    this.observers.push(observer);
  }

  detach(observer: Observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(data: any) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class ActivityLogger extends Subject {
  logActivity(activity: Activity) {
    // Save activity
    console.log('Activity logged');
    
    // Notify all observers
    this.notify(activity);
  }
}

class AnalyticsUpdater implements Observer {
  update(activity: Activity) {
    console.log('Updating analytics...');
    // Recalculate statistics
  }
}

class GoalChecker implements Observer {
  update(activity: Activity) {
    console.log('Checking goals...');
    // Check if goals achieved
  }
}

// Usage
const logger = new ActivityLogger();
logger.attach(new AnalyticsUpdater());
logger.attach(new GoalChecker());

logger.logActivity(newActivity); // Both observers notified
\`\`\`

**Modern Alternative: Event Emitters**
\`\`\`typescript
import { EventEmitter } from 'events';

const activityEvents = new EventEmitter();

activityEvents.on('activity_created', (activity) => {
  // Update analytics
});

activityEvents.on('activity_created', (activity) => {
  // Check goals
});

activityEvents.emit('activity_created', newActivity);
\`\`\`

### Decorator Pattern

**Purpose:** Add behavior to objects dynamically.

**When to Use:**
- Need to add functionality without modifying class
- Want composable behavior
- Following open/closed principle

**TypeScript Example:**
\`\`\`typescript
interface Coffee {
  cost(): number;
  description(): string;
}

class SimpleCoffee implements Coffee {
  cost(): number {
    return 5;
  }

  description(): string {
    return 'Simple coffee';
  }
}

abstract class CoffeeDecorator implements Coffee {
  constructor(protected coffee: Coffee) {}

  abstract cost(): number;
  abstract description(): string;
}

class MilkDecorator extends CoffeeDecorator {
  cost(): number {
    return this.coffee.cost() + 1;
  }

  description(): string {
    return this.coffee.description() + ', milk';
  }
}

class SugarDecorator extends CoffeeDecorator {
  cost(): number {
    return this.coffee.cost() + 0.5;
  }

  description(): string {
    return this.coffee.description() + ', sugar';
  }
}

// Usage
let coffee: Coffee = new SimpleCoffee();
console.log(coffee.description()); // "Simple coffee"
console.log(coffee.cost()); // 5

coffee = new MilkDecorator(coffee);
console.log(coffee.description()); // "Simple coffee, milk"
console.log(coffee.cost()); // 6

coffee = new SugarDecorator(coffee);
console.log(coffee.description()); // "Simple coffee, milk, sugar"
console.log(coffee.cost()); // 6.5
\`\`\`

**Practical Use - Middleware:**
\`\`\`typescript
// Express middleware is decorator pattern
app.use(loggingMiddleware);
app.use(authenticationMiddleware);
app.use(validationMiddleware);
app.use(routeHandler);
\`\`\`

### Adapter Pattern

**Purpose:** Convert interface of class to another interface clients expect.

**When to Use:**
- Integrating third-party libraries
- Making incompatible interfaces work together
- Wrapping legacy code

**TypeScript Example:**
\`\`\`typescript
// Third-party email service interface
class SendGridService {
  sendMail(to: string, subject: string, body: string) {
    // SendGrid-specific implementation
  }
}

// Our application's email interface
interface EmailService {
  send(email: Email): Promise<void>;
}

interface Email {
  recipient: string;
  subject: string;
  content: string;
}

// Adapter
class SendGridAdapter implements EmailService {
  constructor(private sendGrid: SendGridService) {}

  async send(email: Email): Promise<void> {
    this.sendGrid.sendMail(
      email.recipient,
      email.subject,
      email.content
    );
  }
}

// Business logic uses our interface
class UserService {
  constructor(private emailService: EmailService) {}

  async registerUser(user: User) {
    // ... registration logic
    
    await this.emailService.send({
      recipient: user.email,
      subject: 'Welcome!',
      content: 'Thanks for registering'
    });
  }
}

// Can swap email providers easily
const sendGrid = new SendGridService();
const emailAdapter = new SendGridAdapter(sendGrid);
const userService = new UserService(emailAdapter);
\`\`\`

## Anti-Patterns to Avoid

### God Object

**Problem:** One class does too much.

**Bad:**
\`\`\`typescript
class Application {
  authenticateUser() {}
  logActivity() {}
  calculateCarbon() {}
  generateReport() {}
  sendEmail() {}
  updateDatabase() {}
  validateInput() {}
  formatOutput() {}
}
\`\`\`

**Solution:** Single Responsibility Principle
\`\`\`typescript
class AuthService { authenticateUser() {} }
class ActivityService { logActivity() {} }
class CarbonCalculator { calculate() {} }
class ReportGenerator { generate() {} }
\`\`\`

### Spaghetti Code

**Problem:** No structure, everything connected to everything.

**Solution:** Use layered architecture, dependency injection, clear interfaces.

### Golden Hammer

**Problem:** Using one pattern/technology for everything.

**Example:** Using Singleton for every service.

**Solution:** Choose appropriate pattern for each scenario.

### Premature Optimization

**Problem:** Adding complex patterns before they're needed.

**Solution:** Start simple, refactor when complexity demands it.

## When to Use Patterns

### Pattern Decision Tree

\`\`\`
Need to create objects?
├─ Complex creation logic → Factory
├─ Only one instance needed → Singleton  
└─ Defer creation → Builder

Need to organize code structure?
├─ Multiple algorithms → Strategy
├─ Wrap external library → Adapter
├─ Add behavior dynamically → Decorator
└─ Separate data access → Repository

Need to manage behavior?
├─ Event notifications → Observer
├─ Sequential operations → Chain of Responsibility
└─ State changes → State Pattern
\`\`\`

### Pattern Checklist

**Before applying a pattern, ask:**
- [ ] Does this solve a real problem in my code?
- [ ] Is the code complex enough to warrant a pattern?
- [ ] Will this make the code more maintainable?
- [ ] Do I understand the pattern well enough?
- [ ] Are there simpler alternatives?
- [ ] Will team/advisor understand this?

**Apply patterns when:**
- Code is getting complex and hard to understand
- You're repeating similar logic in multiple places
- You need flexibility to swap implementations
- You want to improve testability
- You're following SOLID principles

**Avoid patterns when:**
- Code is simple and clear without them
- You're just starting the project (premature)
- You don't fully understand the pattern
- It's adding complexity without clear benefit

## Practical Application

### Typical Capstone Architecture with Patterns

\`\`\`typescript
// Repository Pattern
interface ActivityRepository {
  findAll(userId: string): Promise<Activity[]>;
  create(activity: Activity): Promise<Activity>;
}

class PrismaActivityRepository implements ActivityRepository {
  // Implementation
}

// Strategy Pattern  
interface CarbonCalculator {
  calculate(activity: Activity): number;
}

class TransportCalculator implements CarbonCalculator {}
class EnergyCalculator implements CarbonCalculator {}
class FoodCalculator implements CarbonCalculator {}

// Factory Pattern
class CalculatorFactory {
  static getCalculator(category: string): CarbonCalculator {
    switch (category) {
      case 'transport': return new TransportCalculator();
      case 'energy': return new EnergyCalculator();
      case 'food': return new FoodCalculator();
    }
  }
}

// Dependency Injection
class ActivityService {
  constructor(
    private activityRepo: ActivityRepository,
    private calculatorFactory: CalculatorFactory
  ) {}

  async logActivity(activity: Activity): Promise<Activity> {
    // Get appropriate calculator
    const calculator = CalculatorFactory.getCalculator(activity.category);
    
    // Calculate carbon
    activity.carbonKg = calculator.calculate(activity);
    
    // Save
    return this.activityRepo.create(activity);
  }
}

// Service Layer Pattern
class ActivityController {
  constructor(private activityService: ActivityService) {}

  async createActivity(req: Request, res: Response) {
    const activity = await this.activityService.logActivity(req.body);
    res.json(activity);
  }
}
\`\`\`

## Summary

Design patterns are tools, not rules. For capstone projects, focus on a few key patterns that solve your actual problems: Repository for data access, Dependency Injection for testability, Strategy for algorithms, Factory for object creation.

Don't force patterns where they don't fit. Start with simple, clear code and refactor to patterns when complexity demands it. The goal is maintainable, testable code—patterns are a means to that end, not an end in themselves.

Document which patterns you use and why. In your final presentation, explaining thoughtful pattern application demonstrates software engineering maturity.

## Additional Resources

- "Design Patterns" by Gang of Four (classic reference)
- "Head First Design Patterns" (beginner-friendly)
- Refactoring.Guru (visual pattern explanations)
- "Patterns of Enterprise Application Architecture" by Martin Fowler
- TypeScript pattern examples: github.com/torokmark/design_patterns_in_typescript
