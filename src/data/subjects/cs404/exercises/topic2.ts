import { CodingExercise } from '../../../../core/types';

export const topic2Exercises: CodingExercise[] = [
  {
    id: 'cs404-ex-2-1',
    subjectId: 'cs404',
    topicId: 'topic-2',
    title: 'Implement Repository Pattern',
    difficulty: 3,
    description: 'Create a repository class that abstracts database operations for a User entity. Implement a UserRepository class with CRUD operations that can work with any database implementation.',
    starterCode: `interface User {
  id: string;
  email: string;
  name: string;
  created_at: Date;
}

interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: Omit<User, 'id' | 'created_at'>): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}

// TODO: Implement UserRepository class
class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();

  async findById(id: string): Promise<User | null> {
    // TODO
    return null;
  }

  async findByEmail(email: string): Promise<User | null> {
    // TODO
    return null;
  }

  async create(userData: Omit<User, 'id' | 'created_at'>): Promise<User> {
    // TODO
    throw new Error('Not implemented');
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    // TODO
    throw new Error('Not implemented');
  }

  async delete(id: string): Promise<void> {
    // TODO
  }
}`,
    solution: `interface User {
  id: string;
  email: string;
  name: string;
  created_at: Date;
}

interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: Omit<User, 'id' | 'created_at'>): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}

class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const users = Array.from(this.users.values());
    return users.find(user => user.email === email) || null;
  }

  async create(userData: Omit<User, 'id' | 'created_at'>): Promise<User> {
    const user: User = {
      id: crypto.randomUUID(),
      ...userData,
      created_at: new Date()
    };

    this.users.set(user.id, user);
    return user;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const existing = await this.findById(id);
    if (!existing) {
      throw new Error('User not found');
    }

    const updated = { ...existing, ...data };
    this.users.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.users.delete(id);
  }
}

// Usage example
async function main() {
  const repo = new InMemoryUserRepository();

  // Create user
  const user = await repo.create({
    email: 'test@example.com',
    name: 'Test User'
  });
  console.log('Created:', user);

  // Find by ID
  const found = await repo.findById(user.id);
  console.log('Found:', found);

  // Update
  const updated = await repo.update(user.id, { name: 'Updated Name' });
  console.log('Updated:', updated);

  // Find by email
  const byEmail = await repo.findByEmail('test@example.com');
  console.log('By email:', byEmail);

  // Delete
  await repo.delete(user.id);
  const deleted = await repo.findById(user.id);
  console.log('After delete:', deleted); // null
}

main();`,
    hints: [
      'Use Map to store users in memory',
      'Generate UUIDs for new users',
      'Return null when user not found',
      'Throw error on update if user doesn\'t exist'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-ex-2-2',
    subjectId: 'cs404',
    topicId: 'topic-2',
    title: 'Strategy Pattern for Calculations',
    difficulty: 3,
    description: 'Implement the Strategy pattern for different carbon emission calculations. Create different calculation strategies for different transportation types.',
    starterCode: `interface CarbonCalculationStrategy {
  calculate(miles: number): number;
}

// TODO: Implement strategies for car, bus, and plane
class CarStrategy implements CarbonCalculationStrategy {
  calculate(miles: number): number {
    // TODO: 0.404 kg CO2 per mile
    return 0;
  }
}

class Calculator {
  private strategy: CarbonCalculationStrategy;

  setStrategy(strategy: CarbonCalculationStrategy) {
    this.strategy = strategy;
  }

  calculate(miles: number): number {
    return this.strategy.calculate(miles);
  }
}`,
    solution: `interface CarbonCalculationStrategy {
  calculate(miles: number): number;
}

class CarStrategy implements CarbonCalculationStrategy {
  calculate(miles: number): number {
    return miles * 0.404; // kg CO2 per mile
  }
}

class BusStrategy implements CarbonCalculationStrategy {
  calculate(miles: number): number {
    return miles * 0.089; // kg CO2 per mile
  }
}

class PlaneStrategy implements CarbonCalculationStrategy {
  calculate(miles: number): number {
    return miles * 0.257; // kg CO2 per mile
  }
}

class CarbonCalculator {
  private strategy: CarbonCalculationStrategy;

  constructor(strategy: CarbonCalculationStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: CarbonCalculationStrategy) {
    this.strategy = strategy;
  }

  calculate(miles: number): number {
    return Math.round(this.strategy.calculate(miles) * 100) / 100;
  }
}

// Usage
const calculator = new CarbonCalculator(new CarStrategy());
console.log('Car 100 miles:', calculator.calculate(100), 'kg CO2');

calculator.setStrategy(new BusStrategy());
console.log('Bus 100 miles:', calculator.calculate(100), 'kg CO2');

calculator.setStrategy(new PlaneStrategy());
console.log('Plane 1000 miles:', calculator.calculate(1000), 'kg CO2');

/*
Output:
Car 100 miles: 40.4 kg CO2
Bus 100 miles: 8.9 kg CO2
Plane 1000 miles: 257 kg CO2
*/`,
    hints: [
      'Each strategy implements the same interface',
      'Calculator can switch strategies at runtime',
      'Round results to 2 decimal places'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t2-ex03',
    subjectId: 'cs404',
    topicId: 'topic-2',
    title: 'Layered Architecture - Three Tier System',
    difficulty: 1,
    description: `Implement a simple three-tier architecture with Presentation, Business Logic, and Data Access layers. Create a basic user authentication system that demonstrates separation of concerns across layers.

The presentation layer handles input/output, the business layer contains authentication logic, and the data layer manages user storage.`,
    starterCode: `// Data Access Layer
class UserDataAccess {
  private users: Map<string, { username: string; password: string }> = new Map();

  findByUsername(username: string) {
    // TODO: Return user or undefined
  }

  save(username: string, password: string) {
    // TODO: Save user to storage
  }
}

// Business Logic Layer
class AuthService {
  constructor(private dataAccess: UserDataAccess) {}

  register(username: string, password: string): boolean {
    // TODO: Check if user exists, validate, and save
    return false;
  }

  login(username: string, password: string): boolean {
    // TODO: Verify credentials
    return false;
  }
}

// Presentation Layer
class AuthController {
  constructor(private authService: AuthService) {}

  handleRegister(username: string, password: string): string {
    // TODO: Call service and return user-friendly message
    return '';
  }

  handleLogin(username: string, password: string): string {
    // TODO: Call service and return user-friendly message
    return '';
  }
}`,
    solution: `// Data Access Layer
class UserDataAccess {
  private users: Map<string, { username: string; password: string }> = new Map();

  findByUsername(username: string) {
    return this.users.get(username);
  }

  save(username: string, password: string) {
    this.users.set(username, { username, password });
  }
}

// Business Logic Layer
class AuthService {
  constructor(private dataAccess: UserDataAccess) {}

  register(username: string, password: string): boolean {
    if (username.length < 3 || password.length < 6) {
      return false;
    }

    if (this.dataAccess.findByUsername(username)) {
      return false;
    }

    this.dataAccess.save(username, password);
    return true;
  }

  login(username: string, password: string): boolean {
    const user = this.dataAccess.findByUsername(username);
    return user !== undefined && user.password === password;
  }
}

// Presentation Layer
class AuthController {
  constructor(private authService: AuthService) {}

  handleRegister(username: string, password: string): string {
    const success = this.authService.register(username, password);
    return success
      ? \`User \${username} registered successfully\`
      : 'Registration failed: invalid credentials or user exists';
  }

  handleLogin(username: string, password: string): string {
    const success = this.authService.login(username, password);
    return success
      ? \`Welcome, \${username}!\`
      : 'Login failed: invalid credentials';
  }
}

// Usage
const dataAccess = new UserDataAccess();
const authService = new AuthService(dataAccess);
const controller = new AuthController(authService);

console.log(controller.handleRegister('john', 'pass123'));
console.log(controller.handleLogin('john', 'pass123'));
console.log(controller.handleLogin('john', 'wrongpass'));`,
    hints: [
      'Each layer should only communicate with adjacent layers',
      'Data layer only handles storage, no validation',
      'Business layer validates and enforces rules',
      'Presentation layer handles user interaction and formatting'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t2-ex04',
    subjectId: 'cs404',
    topicId: 'topic-2',
    title: 'MVC Pattern Implementation',
    difficulty: 2,
    description: `Implement the Model-View-Controller pattern for a simple Todo application. The Model manages data, the View handles display logic, and the Controller coordinates between them.

Create a TodoMVC that can add, remove, and list todos while maintaining separation of concerns.`,
    starterCode: `interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Model: Manages data and business logic
class TodoModel {
  private todos: Todo[] = [];
  private nextId = 1;

  addTodo(text: string): Todo {
    // TODO: Create and add todo
    return null as any;
  }

  removeTodo(id: number): boolean {
    // TODO: Remove todo by id
    return false;
  }

  toggleTodo(id: number): boolean {
    // TODO: Toggle completed status
    return false;
  }

  getAllTodos(): Todo[] {
    // TODO: Return all todos
    return [];
  }
}

// View: Handles presentation
class TodoView {
  displayTodos(todos: Todo[]): void {
    // TODO: Format and display todos
  }

  displayMessage(message: string): void {
    console.log(message);
  }
}

// Controller: Coordinates Model and View
class TodoController {
  constructor(
    private model: TodoModel,
    private view: TodoView
  ) {}

  addTodo(text: string): void {
    // TODO: Add todo via model, update view
  }

  removeTodo(id: number): void {
    // TODO: Remove todo via model, update view
  }

  showTodos(): void {
    // TODO: Get todos from model, display via view
  }
}`,
    solution: `interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Model: Manages data and business logic
class TodoModel {
  private todos: Todo[] = [];
  private nextId = 1;

  addTodo(text: string): Todo {
    const todo: Todo = {
      id: this.nextId++,
      text,
      completed: false
    };
    this.todos.push(todo);
    return todo;
  }

  removeTodo(id: number): boolean {
    const index = this.todos.findIndex(t => t.id === id);
    if (index === -1) return false;
    this.todos.splice(index, 1);
    return true;
  }

  toggleTodo(id: number): boolean {
    const todo = this.todos.find(t => t.id === id);
    if (!todo) return false;
    todo.completed = !todo.completed;
    return true;
  }

  getAllTodos(): Todo[] {
    return [...this.todos];
  }
}

// View: Handles presentation
class TodoView {
  displayTodos(todos: Todo[]): void {
    console.log('\\n=== Todo List ===');
    if (todos.length === 0) {
      console.log('No todos yet!');
      return;
    }

    todos.forEach(todo => {
      const status = todo.completed ? '✓' : ' ';
      console.log(\`[\${status}] \${todo.id}. \${todo.text}\`);
    });
  }

  displayMessage(message: string): void {
    console.log(message);
  }
}

// Controller: Coordinates Model and View
class TodoController {
  constructor(
    private model: TodoModel,
    private view: TodoView
  ) {}

  addTodo(text: string): void {
    const todo = this.model.addTodo(text);
    this.view.displayMessage(\`Added: \${todo.text}\`);
    this.showTodos();
  }

  removeTodo(id: number): void {
    const success = this.model.removeTodo(id);
    if (success) {
      this.view.displayMessage(\`Removed todo #\${id}\`);
      this.showTodos();
    } else {
      this.view.displayMessage(\`Todo #\${id} not found\`);
    }
  }

  showTodos(): void {
    const todos = this.model.getAllTodos();
    this.view.displayTodos(todos);
  }
}

// Usage
const model = new TodoModel();
const view = new TodoView();
const controller = new TodoController(model, view);

controller.addTodo('Learn MVC pattern');
controller.addTodo('Build a web app');
controller.removeTodo(1);`,
    hints: [
      'Model should not know about View or Controller',
      'View should only handle presentation logic',
      'Controller mediates between Model and View',
      'Model returns data, View formats it for display'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t2-ex05',
    subjectId: 'cs404',
    topicId: 'topic-2',
    title: 'Factory Pattern for Multi-Database Support',
    difficulty: 1,
    description: `Implement the Factory pattern to create different database connection objects. Support multiple database types (PostgreSQL, MySQL, MongoDB) through a unified factory interface.

The factory should return database-specific implementations that conform to a common interface.`,
    starterCode: `interface Database {
  connect(): string;
  query(sql: string): string;
  disconnect(): string;
}

class PostgresDatabase implements Database {
  connect(): string {
    // TODO
    return '';
  }

  query(sql: string): string {
    // TODO
    return '';
  }

  disconnect(): string {
    // TODO
    return '';
  }
}

// TODO: Implement MySQLDatabase and MongoDatabase

class DatabaseFactory {
  static create(type: 'postgres' | 'mysql' | 'mongo'): Database {
    // TODO: Return appropriate database instance
    throw new Error('Not implemented');
  }
}`,
    solution: `interface Database {
  connect(): string;
  query(sql: string): string;
  disconnect(): string;
}

class PostgresDatabase implements Database {
  connect(): string {
    return 'Connected to PostgreSQL on port 5432';
  }

  query(sql: string): string {
    return \`PostgreSQL executing: \${sql}\`;
  }

  disconnect(): string {
    return 'Disconnected from PostgreSQL';
  }
}

class MySQLDatabase implements Database {
  connect(): string {
    return 'Connected to MySQL on port 3306';
  }

  query(sql: string): string {
    return \`MySQL executing: \${sql}\`;
  }

  disconnect(): string {
    return 'Disconnected from MySQL';
  }
}

class MongoDatabase implements Database {
  connect(): string {
    return 'Connected to MongoDB on port 27017';
  }

  query(sql: string): string {
    return \`MongoDB executing: \${sql}\`;
  }

  disconnect(): string {
    return 'Disconnected from MongoDB';
  }
}

class DatabaseFactory {
  static create(type: 'postgres' | 'mysql' | 'mongo'): Database {
    switch (type) {
      case 'postgres':
        return new PostgresDatabase();
      case 'mysql':
        return new MySQLDatabase();
      case 'mongo':
        return new MongoDatabase();
      default:
        throw new Error(\`Unknown database type: \${type}\`);
    }
  }
}

// Usage
const db1 = DatabaseFactory.create('postgres');
console.log(db1.connect());
console.log(db1.query('SELECT * FROM users'));

const db2 = DatabaseFactory.create('mongo');
console.log(db2.connect());
console.log(db2.query('db.users.find()'));`,
    hints: [
      'All database classes implement the same interface',
      'Factory method uses switch or if-else to determine type',
      'Each database has different connection details',
      'Client code works with Database interface, not concrete classes'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t2-ex06',
    subjectId: 'cs404',
    topicId: 'topic-2',
    title: 'Observer Pattern for Event System',
    difficulty: 2,
    description: `Implement the Observer pattern for a real-time notification system. Create a subject that notifies multiple observers when events occur.

Build a stock price tracker that notifies different types of observers (email, SMS, dashboard) when prices change.`,
    starterCode: `interface Observer {
  update(stock: string, price: number): void;
}

class Subject {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    // TODO
  }

  detach(observer: Observer): void {
    // TODO
  }

  notify(stock: string, price: number): void {
    // TODO
  }
}

class StockTracker extends Subject {
  private prices: Map<string, number> = new Map();

  setPrice(stock: string, price: number): void {
    // TODO: Update price and notify observers
  }

  getPrice(stock: string): number | undefined {
    return this.prices.get(stock);
  }
}

// TODO: Implement EmailObserver, SMSObserver, DashboardObserver`,
    solution: `interface Observer {
  update(stock: string, price: number): void;
}

class Subject {
  private observers: Observer[] = [];

  attach(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(stock: string, price: number): void {
    this.observers.forEach(observer => observer.update(stock, price));
  }
}

class StockTracker extends Subject {
  private prices: Map<string, number> = new Map();

  setPrice(stock: string, price: number): void {
    this.prices.set(stock, price);
    this.notify(stock, price);
  }

  getPrice(stock: string): number | undefined {
    return this.prices.get(stock);
  }
}

class EmailObserver implements Observer {
  constructor(private email: string) {}

  update(stock: string, price: number): void {
    console.log(\`[EMAIL to \${this.email}] \${stock} is now $\${price}\`);
  }
}

class SMSObserver implements Observer {
  constructor(private phone: string) {}

  update(stock: string, price: number): void {
    console.log(\`[SMS to \${this.phone}] \${stock}: $\${price}\`);
  }
}

class DashboardObserver implements Observer {
  update(stock: string, price: number): void {
    console.log(\`[DASHBOARD] Updated \${stock} = $\${price}\`);
  }
}

// Usage
const tracker = new StockTracker();

const emailObs = new EmailObserver('investor@example.com');
const smsObs = new SMSObserver('+1234567890');
const dashObs = new DashboardObserver();

tracker.attach(emailObs);
tracker.attach(smsObs);
tracker.attach(dashObs);

tracker.setPrice('AAPL', 150.25);
tracker.setPrice('GOOGL', 2800.50);

tracker.detach(smsObs);
tracker.setPrice('AAPL', 151.00);`,
    hints: [
      'Subject maintains a list of observers',
      'attach() adds observer to the list',
      'notify() calls update() on all observers',
      'Each observer implements update() differently'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t2-ex07',
    subjectId: 'cs404',
    topicId: 'topic-2',
    title: 'Database Schema Design - E-Commerce',
    difficulty: 3,
    description: `Design a normalized database schema for an e-commerce platform. Create TypeScript interfaces representing database tables for users, products, orders, and order items.

Implement proper relationships (one-to-many, many-to-many) and demonstrate CRUD operations with referential integrity.`,
    starterCode: `// TODO: Define interfaces for User, Product, Order, OrderItem

class ECommerceDB {
  private users: Map<string, any> = new Map();
  private products: Map<string, any> = new Map();
  private orders: Map<string, any> = new Map();
  private orderItems: Map<string, any> = new Map();

  // User operations
  createUser(email: string, name: string) {
    // TODO
  }

  // Product operations
  createProduct(name: string, price: number, stock: number) {
    // TODO
  }

  // Order operations
  createOrder(userId: string) {
    // TODO
  }

  addOrderItem(orderId: string, productId: string, quantity: number) {
    // TODO: Check stock, update quantities
  }

  getOrderDetails(orderId: string) {
    // TODO: Return order with all items and user info
  }
}`,
    solution: `interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  total: number;
  createdAt: Date;
}

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  priceAtPurchase: number;
}

class ECommerceDB {
  private users: Map<string, User> = new Map();
  private products: Map<string, Product> = new Map();
  private orders: Map<string, Order> = new Map();
  private orderItems: Map<string, OrderItem> = new Map();
  private nextId = 1;

  // User operations
  createUser(email: string, name: string): User {
    const user: User = {
      id: \`user_\${this.nextId++}\`,
      email,
      name,
      createdAt: new Date()
    };
    this.users.set(user.id, user);
    return user;
  }

  // Product operations
  createProduct(name: string, price: number, stock: number): Product {
    const product: Product = {
      id: \`prod_\${this.nextId++}\`,
      name,
      price,
      stock
    };
    this.products.set(product.id, product);
    return product;
  }

  // Order operations
  createOrder(userId: string): Order {
    const user = this.users.get(userId);
    if (!user) throw new Error('User not found');

    const order: Order = {
      id: \`order_\${this.nextId++}\`,
      userId,
      status: 'pending',
      total: 0,
      createdAt: new Date()
    };
    this.orders.set(order.id, order);
    return order;
  }

  addOrderItem(orderId: string, productId: string, quantity: number): OrderItem {
    const order = this.orders.get(orderId);
    const product = this.products.get(productId);

    if (!order) throw new Error('Order not found');
    if (!product) throw new Error('Product not found');
    if (product.stock < quantity) throw new Error('Insufficient stock');

    const orderItem: OrderItem = {
      id: \`item_\${this.nextId++}\`,
      orderId,
      productId,
      quantity,
      priceAtPurchase: product.price
    };

    // Update stock and order total
    product.stock -= quantity;
    order.total += product.price * quantity;

    this.orderItems.set(orderItem.id, orderItem);
    return orderItem;
  }

  getOrderDetails(orderId: string) {
    const order = this.orders.get(orderId);
    if (!order) throw new Error('Order not found');

    const user = this.users.get(order.userId);
    const items = Array.from(this.orderItems.values())
      .filter(item => item.orderId === orderId)
      .map(item => {
        const product = this.products.get(item.productId);
        return {
          ...item,
          productName: product?.name,
          subtotal: item.priceAtPurchase * item.quantity
        };
      });

    return {
      order,
      user,
      items
    };
  }
}

// Usage
const db = new ECommerceDB();

const user = db.createUser('alice@example.com', 'Alice');
const laptop = db.createProduct('Laptop', 999.99, 10);
const mouse = db.createProduct('Mouse', 29.99, 50);

const order = db.createOrder(user.id);
db.addOrderItem(order.id, laptop.id, 1);
db.addOrderItem(order.id, mouse.id, 2);

console.log(db.getOrderDetails(order.id));`,
    hints: [
      'Use foreign keys (IDs) to establish relationships',
      'Store price at purchase time to preserve historical data',
      'Update stock levels when adding order items',
      'Calculate order total by summing item subtotals'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t2-ex08',
    subjectId: 'cs404',
    topicId: 'topic-2',
    title: 'RESTful API Design',
    difficulty: 3,
    description: `Design a RESTful API for a blog platform. Create endpoint definitions with proper HTTP methods, URL structures, request/response formats, and status codes.

Implement a mock API handler that demonstrates REST principles: resource-based URLs, proper HTTP verbs, and stateless operations.`,
    starterCode: `interface BlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ApiResponse<T = any> {
  status: number;
  data?: T;
  error?: string;
}

class BlogAPI {
  private posts: Map<string, BlogPost> = new Map();
  private nextId = 1;

  // GET /api/posts
  getAllPosts(): ApiResponse<BlogPost[]> {
    // TODO
    return { status: 200 };
  }

  // GET /api/posts/:id
  getPost(id: string): ApiResponse<BlogPost> {
    // TODO
    return { status: 200 };
  }

  // POST /api/posts
  createPost(title: string, content: string, authorId: string): ApiResponse<BlogPost> {
    // TODO
    return { status: 201 };
  }

  // PUT /api/posts/:id
  updatePost(id: string, updates: Partial<BlogPost>): ApiResponse<BlogPost> {
    // TODO
    return { status: 200 };
  }

  // DELETE /api/posts/:id
  deletePost(id: string): ApiResponse {
    // TODO
    return { status: 204 };
  }
}`,
    solution: `interface BlogPost {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ApiResponse<T = any> {
  status: number;
  data?: T;
  error?: string;
}

class BlogAPI {
  private posts: Map<string, BlogPost> = new Map();
  private nextId = 1;

  // GET /api/posts - List all posts
  getAllPosts(): ApiResponse<BlogPost[]> {
    return {
      status: 200,
      data: Array.from(this.posts.values())
    };
  }

  // GET /api/posts/:id - Get single post
  getPost(id: string): ApiResponse<BlogPost> {
    const post = this.posts.get(id);
    if (!post) {
      return {
        status: 404,
        error: 'Post not found'
      };
    }
    return {
      status: 200,
      data: post
    };
  }

  // POST /api/posts - Create new post
  createPost(title: string, content: string, authorId: string): ApiResponse<BlogPost> {
    if (!title || !content || !authorId) {
      return {
        status: 400,
        error: 'Missing required fields'
      };
    }

    const post: BlogPost = {
      id: \`post_\${this.nextId++}\`,
      title,
      content,
      authorId,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.posts.set(post.id, post);
    return {
      status: 201,
      data: post
    };
  }

  // PUT /api/posts/:id - Update existing post
  updatePost(id: string, updates: Partial<BlogPost>): ApiResponse<BlogPost> {
    const post = this.posts.get(id);
    if (!post) {
      return {
        status: 404,
        error: 'Post not found'
      };
    }

    const updated: BlogPost = {
      ...post,
      ...updates,
      id: post.id, // Prevent ID change
      createdAt: post.createdAt, // Preserve creation date
      updatedAt: new Date()
    };

    this.posts.set(id, updated);
    return {
      status: 200,
      data: updated
    };
  }

  // DELETE /api/posts/:id - Delete post
  deletePost(id: string): ApiResponse {
    if (!this.posts.has(id)) {
      return {
        status: 404,
        error: 'Post not found'
      };
    }

    this.posts.delete(id);
    return {
      status: 204 // No content
    };
  }
}

// Usage demonstration
const api = new BlogAPI();

// Create posts
console.log('Creating post:', api.createPost('First Post', 'Hello World', 'user1'));
console.log('Creating post:', api.createPost('Second Post', 'REST API', 'user1'));

// Get all posts
console.log('All posts:', api.getAllPosts());

// Get single post
console.log('Get post:', api.getPost('post_1'));

// Update post
console.log('Update post:', api.updatePost('post_1', { title: 'Updated Title' }));

// Delete post
console.log('Delete post:', api.deletePost('post_2'));

// Try to get deleted post
console.log('Get deleted post:', api.getPost('post_2'));`,
    hints: [
      'Use appropriate HTTP status codes: 200 OK, 201 Created, 204 No Content, 404 Not Found',
      'Resource URLs should be nouns (posts), not verbs',
      'PUT updates should preserve id and createdAt',
      'Return error messages for 4xx responses'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t2-ex09',
    subjectId: 'cs404',
    topicId: 'topic-2',
    title: 'GraphQL vs REST Comparison',
    difficulty: 3,
    description: `Implement both REST and GraphQL-style APIs for the same data model to understand the differences. Create a user/posts system that demonstrates over-fetching in REST vs precise queries in GraphQL.

Show how GraphQL allows clients to request exactly the data they need.`,
    starterCode: `interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

// REST API - Returns all fields
class RestAPI {
  private users: Map<string, User> = new Map();
  private posts: Map<string, Post> = new Map();

  getUser(id: string) {
    // TODO: Returns entire user object
  }

  getUserPosts(userId: string) {
    // TODO: Returns all posts by user
  }
}

// GraphQL-style API - Returns only requested fields
class GraphQLAPI {
  private users: Map<string, User> = new Map();
  private posts: Map<string, Post> = new Map();

  query(queryString: string) {
    // TODO: Parse query and return only requested fields
    // Example query: "user(id: '1') { name, posts { title } }"
  }
}`,
    solution: `interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

// REST API - Returns all fields (over-fetching)
class RestAPI {
  private users: Map<string, User> = new Map();
  private posts: Map<string, Post> = new Map();

  constructor() {
    // Seed data
    this.users.set('1', {
      id: '1',
      name: 'Alice',
      email: 'alice@example.com',
      bio: 'Software engineer'
    });
    this.posts.set('1', {
      id: '1',
      title: 'First Post',
      content: 'Long content here...',
      authorId: '1'
    });
  }

  getUser(id: string) {
    return this.users.get(id); // Returns ALL user fields
  }

  getUserPosts(userId: string) {
    return Array.from(this.posts.values())
      .filter(p => p.authorId === userId); // Returns ALL post fields
  }
}

// GraphQL-style API - Returns only requested fields
class GraphQLAPI {
  private users: Map<string, User> = new Map();
  private posts: Map<string, Post> = new Map();

  constructor() {
    // Seed data
    this.users.set('1', {
      id: '1',
      name: 'Alice',
      email: 'alice@example.com',
      bio: 'Software engineer'
    });
    this.posts.set('1', {
      id: '1',
      title: 'First Post',
      content: 'Long content here...',
      authorId: '1'
    });
  }

  query(fields: { user?: { id: string; fields: string[] }; posts?: boolean }) {
    const result: any = {};

    if (fields.user) {
      const user = this.users.get(fields.user.id);
      if (user) {
        result.user = {};
        fields.user.fields.forEach(field => {
          if (field in user) {
            result.user[field] = user[field as keyof User];
          }
        });

        if (fields.posts && result.user) {
          result.user.posts = Array.from(this.posts.values())
            .filter(p => p.authorId === user.id)
            .map(p => ({ id: p.id, title: p.title }));
        }
      }
    }

    return result;
  }
}

// Usage comparison
console.log('=== REST API (Over-fetching) ===');
const restApi = new RestAPI();
console.log('Get user (only need name):');
console.log(restApi.getUser('1')); // Returns all fields including email, bio

console.log('\\n=== GraphQL API (Precise) ===');
const graphqlApi = new GraphQLAPI();
console.log('Get user (only need name):');
console.log(graphqlApi.query({
  user: { id: '1', fields: ['name'] }
})); // Returns only name

console.log('\\nGet user name and post titles:');
console.log(graphqlApi.query({
  user: { id: '1', fields: ['name'] },
  posts: true
})); // Returns only requested fields

/*
REST returns everything:
{ id: '1', name: 'Alice', email: 'alice@example.com', bio: 'Software engineer' }

GraphQL returns only what you need:
{ user: { name: 'Alice' } }
{ user: { name: 'Alice', posts: [{ id: '1', title: 'First Post' }] } }
*/`,
    hints: [
      'REST always returns the complete resource',
      'GraphQL allows specifying exactly which fields to return',
      'GraphQL can fetch related data in a single request',
      'Over-fetching wastes bandwidth and processing'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t2-ex10',
    subjectId: 'cs404',
    topicId: 'topic-2',
    title: 'JWT Authentication System',
    difficulty: 4,
    description: `Implement a JWT (JSON Web Token) based authentication system. Create functions to generate tokens, verify tokens, and protect routes.

Build a complete auth flow: login generates JWT, protected routes verify JWT, and tokens expire after a set time.`,
    starterCode: `interface JWTPayload {
  userId: string;
  email: string;
  exp: number; // Expiration timestamp
  iat: number; // Issued at timestamp
}

class JWTAuth {
  private secret = 'your-secret-key';
  private expirationMinutes = 60;

  // Simple base64 encoding (in production, use crypto libraries)
  private encode(data: string): string {
    return Buffer.from(data).toString('base64');
  }

  private decode(data: string): string {
    return Buffer.from(data, 'base64').toString('utf-8');
  }

  generateToken(userId: string, email: string): string {
    // TODO: Create JWT with header, payload, signature
    return '';
  }

  verifyToken(token: string): JWTPayload | null {
    // TODO: Verify signature and expiration
    return null;
  }

  isTokenExpired(payload: JWTPayload): boolean {
    // TODO: Check if current time > expiration
    return true;
  }
}

class ProtectedAPI {
  constructor(private auth: JWTAuth) {}

  login(email: string, password: string): { token: string } | { error: string } {
    // TODO: Validate credentials and return token
    return { error: 'Not implemented' };
  }

  getProfile(token: string): { user: any } | { error: string } {
    // TODO: Verify token and return user data
    return { error: 'Not implemented' };
  }
}`,
    solution: `interface JWTPayload {
  userId: string;
  email: string;
  exp: number; // Expiration timestamp
  iat: number; // Issued at timestamp
}

class JWTAuth {
  private secret = 'your-secret-key';
  private expirationMinutes = 60;

  // Simple base64 encoding (in production, use crypto libraries)
  private encode(data: string): string {
    return Buffer.from(data).toString('base64');
  }

  private decode(data: string): string {
    return Buffer.from(data, 'base64').toString('utf-8');
  }

  private sign(data: string): string {
    // Simple signature (in production, use HMAC-SHA256)
    return this.encode(data + this.secret);
  }

  private verify(data: string, signature: string): boolean {
    return this.sign(data) === signature;
  }

  generateToken(userId: string, email: string): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000);
    const payload: JWTPayload = {
      userId,
      email,
      iat: now,
      exp: now + (this.expirationMinutes * 60)
    };

    const encodedHeader = this.encode(JSON.stringify(header));
    const encodedPayload = this.encode(JSON.stringify(payload));
    const signature = this.sign(\`\${encodedHeader}.\${encodedPayload}\`);

    return \`\${encodedHeader}.\${encodedPayload}.\${signature}\`;
  }

  verifyToken(token: string): JWTPayload | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const [encodedHeader, encodedPayload, signature] = parts;

      // Verify signature
      if (!this.verify(\`\${encodedHeader}.\${encodedPayload}\`, signature)) {
        return null;
      }

      // Decode payload
      const payload: JWTPayload = JSON.parse(this.decode(encodedPayload));

      // Check expiration
      if (this.isTokenExpired(payload)) {
        return null;
      }

      return payload;
    } catch {
      return null;
    }
  }

  isTokenExpired(payload: JWTPayload): boolean {
    const now = Math.floor(Date.now() / 1000);
    return now > payload.exp;
  }
}

class ProtectedAPI {
  private users = new Map([
    ['alice@example.com', { userId: '1', email: 'alice@example.com', password: 'pass123', name: 'Alice' }]
  ]);

  constructor(private auth: JWTAuth) {}

  login(email: string, password: string): { token: string } | { error: string } {
    const user = this.users.get(email);
    if (!user || user.password !== password) {
      return { error: 'Invalid credentials' };
    }

    const token = this.auth.generateToken(user.userId, user.email);
    return { token };
  }

  getProfile(token: string): { user: any } | { error: string } {
    const payload = this.auth.verifyToken(token);
    if (!payload) {
      return { error: 'Invalid or expired token' };
    }

    const user = this.users.get(payload.email);
    if (!user) {
      return { error: 'User not found' };
    }

    const { password, ...safeUser } = user;
    return { user: safeUser };
  }
}

// Usage
const auth = new JWTAuth();
const api = new ProtectedAPI(auth);

// Login
const loginResult = api.login('alice@example.com', 'pass123');
console.log('Login:', loginResult);

if ('token' in loginResult) {
  // Access protected route
  console.log('Profile:', api.getProfile(loginResult.token));

  // Try invalid token
  console.log('Invalid token:', api.getProfile('invalid.token.here'));
}`,
    hints: [
      'JWT structure: header.payload.signature (all base64 encoded)',
      'Include expiration timestamp in payload',
      'Verify both signature and expiration',
      'Never store sensitive data in JWT payload (it\'s not encrypted)'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t2-ex11',
    subjectId: 'cs404',
    topicId: 'topic-2',
    title: 'Role-Based Access Control (RBAC)',
    difficulty: 4,
    description: `Implement a Role-Based Access Control system with roles, permissions, and resource protection. Create an authorization system that checks if users have the required permissions to perform actions.

Support multiple roles (admin, editor, viewer) with different permission sets.`,
    starterCode: `type Permission = 'create' | 'read' | 'update' | 'delete';
type Role = 'admin' | 'editor' | 'viewer';

interface User {
  id: string;
  name: string;
  role: Role;
}

class RBAC {
  private rolePermissions: Map<Role, Permission[]> = new Map();

  constructor() {
    // TODO: Define role permissions
    // admin: all permissions
    // editor: create, read, update
    // viewer: read only
  }

  hasPermission(user: User, permission: Permission): boolean {
    // TODO: Check if user's role has the permission
    return false;
  }

  authorize(user: User, action: Permission): void {
    // TODO: Throw error if user lacks permission
  }
}

class DocumentService {
  private documents: Map<string, any> = new Map();

  constructor(private rbac: RBAC) {}

  createDocument(user: User, title: string, content: string) {
    // TODO: Check permission, then create
  }

  readDocument(user: User, id: string) {
    // TODO: Check permission, then read
  }

  updateDocument(user: User, id: string, updates: any) {
    // TODO: Check permission, then update
  }

  deleteDocument(user: User, id: string) {
    // TODO: Check permission, then delete
  }
}`,
    solution: `type Permission = 'create' | 'read' | 'update' | 'delete';
type Role = 'admin' | 'editor' | 'viewer';

interface User {
  id: string;
  name: string;
  role: Role;
}

class RBAC {
  private rolePermissions: Map<Role, Permission[]> = new Map();

  constructor() {
    // Define role permissions
    this.rolePermissions.set('admin', ['create', 'read', 'update', 'delete']);
    this.rolePermissions.set('editor', ['create', 'read', 'update']);
    this.rolePermissions.set('viewer', ['read']);
  }

  hasPermission(user: User, permission: Permission): boolean {
    const permissions = this.rolePermissions.get(user.role);
    return permissions ? permissions.includes(permission) : false;
  }

  authorize(user: User, action: Permission): void {
    if (!this.hasPermission(user, action)) {
      throw new Error(\`User \${user.name} (\${user.role}) is not authorized to \${action}\`);
    }
  }
}

class DocumentService {
  private documents: Map<string, any> = new Map();
  private nextId = 1;

  constructor(private rbac: RBAC) {}

  createDocument(user: User, title: string, content: string) {
    this.rbac.authorize(user, 'create');

    const doc = {
      id: \`doc_\${this.nextId++}\`,
      title,
      content,
      createdBy: user.id,
      createdAt: new Date()
    };

    this.documents.set(doc.id, doc);
    return doc;
  }

  readDocument(user: User, id: string) {
    this.rbac.authorize(user, 'read');

    const doc = this.documents.get(id);
    if (!doc) throw new Error('Document not found');
    return doc;
  }

  updateDocument(user: User, id: string, updates: any) {
    this.rbac.authorize(user, 'update');

    const doc = this.documents.get(id);
    if (!doc) throw new Error('Document not found');

    const updated = { ...doc, ...updates, updatedAt: new Date() };
    this.documents.set(id, updated);
    return updated;
  }

  deleteDocument(user: User, id: string) {
    this.rbac.authorize(user, 'delete');

    if (!this.documents.has(id)) {
      throw new Error('Document not found');
    }

    this.documents.delete(id);
    return { message: 'Document deleted' };
  }
}

// Usage
const rbac = new RBAC();
const docService = new DocumentService(rbac);

const admin: User = { id: '1', name: 'Admin User', role: 'admin' };
const editor: User = { id: '2', name: 'Editor User', role: 'editor' };
const viewer: User = { id: '3', name: 'Viewer User', role: 'viewer' };

// Admin can do everything
const doc = docService.createDocument(admin, 'First Doc', 'Content');
console.log('Created:', doc);

// Editor can read and update
console.log('Read:', docService.readDocument(editor, doc.id));
console.log('Update:', docService.updateDocument(editor, doc.id, { content: 'New content' }));

// Viewer can only read
console.log('Read:', docService.readDocument(viewer, doc.id));

try {
  // Viewer cannot delete
  docService.deleteDocument(viewer, doc.id);
} catch (err: any) {
  console.log('Error:', err.message);
}

// Admin can delete
console.log('Delete:', docService.deleteDocument(admin, doc.id));`,
    hints: [
      'Map roles to their allowed permissions',
      'Check permissions before executing actions',
      'Throw errors for unauthorized actions',
      'More restrictive roles should have fewer permissions'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t2-ex12',
    subjectId: 'cs404',
    topicId: 'topic-2',
    title: 'Microservices vs Monolith Decision Framework',
    difficulty: 4,
    description: `Create a decision framework that helps evaluate whether to use microservices or monolithic architecture. Implement a scoring system based on various factors.

Consider team size, deployment frequency, scalability needs, and complexity to recommend an architecture.`,
    starterCode: `interface ProjectRequirements {
  teamSize: number;
  deploymentFrequency: 'daily' | 'weekly' | 'monthly';
  expectedScale: 'small' | 'medium' | 'large';
  serviceDiversity: 'low' | 'medium' | 'high'; // Different tech needs
  timeline: 'short' | 'medium' | 'long';
  budget: 'low' | 'medium' | 'high';
}

interface ArchitectureRecommendation {
  recommendation: 'monolith' | 'microservices' | 'modular-monolith';
  score: number; // -10 to +10 (negative = monolith, positive = microservices)
  reasoning: string[];
  risks: string[];
}

class ArchitectureDecisionFramework {
  evaluate(requirements: ProjectRequirements): ArchitectureRecommendation {
    // TODO: Implement scoring logic
    // Consider:
    // - Small teams favor monolith
    // - High deployment frequency favors microservices
    // - Large scale favors microservices
    // - High service diversity favors microservices
    // - Short timeline favors monolith
    // - Low budget favors monolith

    return {
      recommendation: 'monolith',
      score: 0,
      reasoning: [],
      risks: []
    };
  }
}`,
    solution: `interface ProjectRequirements {
  teamSize: number;
  deploymentFrequency: 'daily' | 'weekly' | 'monthly';
  expectedScale: 'small' | 'medium' | 'large';
  serviceDiversity: 'low' | 'medium' | 'high';
  timeline: 'short' | 'medium' | 'long';
  budget: 'low' | 'medium' | 'high';
}

interface ArchitectureRecommendation {
  recommendation: 'monolith' | 'microservices' | 'modular-monolith';
  score: number;
  reasoning: string[];
  risks: string[];
}

class ArchitectureDecisionFramework {
  evaluate(requirements: ProjectRequirements): ArchitectureRecommendation {
    let score = 0;
    const reasoning: string[] = [];
    const risks: string[] = [];

    // Team size factor
    if (requirements.teamSize < 5) {
      score -= 3;
      reasoning.push('Small team size favors monolith for simpler coordination');
    } else if (requirements.teamSize > 15) {
      score += 3;
      reasoning.push('Large team can manage distributed microservices');
    } else {
      score += 1;
      reasoning.push('Medium team size can handle either architecture');
    }

    // Deployment frequency
    const deploymentScores = { daily: 2, weekly: 1, monthly: -2 };
    score += deploymentScores[requirements.deploymentFrequency];
    reasoning.push(\`\${requirements.deploymentFrequency} deployments \${
      deploymentScores[requirements.deploymentFrequency] > 0
        ? 'benefit from microservices independence'
        : 'acceptable with monolith'
    }\`);

    // Scale requirements
    const scaleScores = { small: -2, medium: 0, large: 3 };
    score += scaleScores[requirements.expectedScale];
    reasoning.push(\`\${requirements.expectedScale} scale \${
      scaleScores[requirements.expectedScale] > 0
        ? 'requires independent scaling of microservices'
        : 'manageable with monolith'
    }\`);

    // Service diversity (different tech stacks)
    const diversityScores = { low: -1, medium: 1, high: 3 };
    score += diversityScores[requirements.serviceDiversity];
    reasoning.push(\`\${requirements.serviceDiversity} service diversity \${
      diversityScores[requirements.serviceDiversity] > 0
        ? 'benefits from polyglot microservices'
        : 'suits unified monolith stack'
    }\`);

    // Timeline
    const timelineScores = { short: -3, medium: 0, long: 2 };
    score += timelineScores[requirements.timeline];
    reasoning.push(\`\${requirements.timeline} timeline \${
      timelineScores[requirements.timeline] < 0
        ? 'requires fast monolith development'
        : 'allows time for microservices setup'
    }\`);

    // Budget
    const budgetScores = { low: -2, medium: 0, high: 1 };
    score += budgetScores[requirements.budget];
    reasoning.push(\`\${requirements.budget} budget \${
      budgetScores[requirements.budget] < 0
        ? 'limits infrastructure for microservices'
        : 'supports distributed infrastructure'
    }\`);

    // Determine recommendation
    let recommendation: 'monolith' | 'microservices' | 'modular-monolith';
    if (score <= -3) {
      recommendation = 'monolith';
      risks.push('May face scaling challenges as system grows');
      risks.push('Deployment of entire application required for any change');
    } else if (score >= 5) {
      recommendation = 'microservices';
      risks.push('Increased operational complexity');
      risks.push('Network latency and distributed system challenges');
      risks.push('Higher infrastructure costs');
    } else {
      recommendation = 'modular-monolith';
      reasoning.push('Balanced approach: modular design with monolith simplicity');
      risks.push('Must maintain strong module boundaries');
    }

    return {
      recommendation,
      score,
      reasoning,
      risks
    };
  }

  printRecommendation(rec: ArchitectureRecommendation): void {
    console.log(\`\\n=== Architecture Recommendation ===\`);
    console.log(\`Recommendation: \${rec.recommendation.toUpperCase()}\`);
    console.log(\`Score: \${rec.score}\`);
    console.log(\`\\nReasoning:\`);
    rec.reasoning.forEach((r, i) => console.log(\`  \${i + 1}. \${r}\`));
    console.log(\`\\nRisks to Consider:\`);
    rec.risks.forEach((r, i) => console.log(\`  \${i + 1}. \${r}\`));
  }
}

// Usage examples
const framework = new ArchitectureDecisionFramework();

// Startup scenario - favor monolith
const startup = framework.evaluate({
  teamSize: 3,
  deploymentFrequency: 'weekly',
  expectedScale: 'small',
  serviceDiversity: 'low',
  timeline: 'short',
  budget: 'low'
});
framework.printRecommendation(startup);

// Enterprise scenario - favor microservices
const enterprise = framework.evaluate({
  teamSize: 50,
  deploymentFrequency: 'daily',
  expectedScale: 'large',
  serviceDiversity: 'high',
  timeline: 'long',
  budget: 'high'
});
framework.printRecommendation(enterprise);`,
    hints: [
      'Assign positive scores for factors favoring microservices',
      'Assign negative scores for factors favoring monolith',
      'Consider modular monolith for borderline cases',
      'Include both benefits and risks in the recommendation'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t2-ex13',
    subjectId: 'cs404',
    topicId: 'topic-2',
    title: 'Caching Strategy Implementation',
    difficulty: 3,
    description: `Implement multiple caching strategies: LRU (Least Recently Used), LFU (Least Frequently Used), and TTL (Time To Live). Create a cache manager that supports different eviction policies.

Demonstrate how different strategies behave under various access patterns.`,
    starterCode: `interface CacheEntry<T> {
  key: string;
  value: T;
  accessCount: number;
  lastAccessed: number;
  expiresAt?: number;
}

interface CacheStrategy {
  get(key: string): any;
  set(key: string, value: any, ttl?: number): void;
  evict(): void; // Remove one item based on strategy
}

class LRUCache<T> implements CacheStrategy {
  private cache: Map<string, CacheEntry<T>> = new Map();

  constructor(private maxSize: number) {}

  get(key: string): T | null {
    // TODO: Update last accessed, return value
    return null;
  }

  set(key: string, value: T): void {
    // TODO: Add/update entry, evict if needed
  }

  evict(): void {
    // TODO: Remove least recently used
  }
}

// TODO: Implement LFUCache and TTLCache`,
    solution: `interface CacheEntry<T> {
  key: string;
  value: T;
  accessCount: number;
  lastAccessed: number;
  expiresAt?: number;
}

interface CacheStrategy {
  get(key: string): any;
  set(key: string, value: any, ttl?: number): void;
  evict(): void;
}

// Least Recently Used Cache
class LRUCache<T> implements CacheStrategy {
  private cache: Map<string, CacheEntry<T>> = new Map();

  constructor(private maxSize: number) {}

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Update last accessed
    entry.lastAccessed = Date.now();
    return entry.value;
  }

  set(key: string, value: T): void {
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evict();
    }

    this.cache.set(key, {
      key,
      value,
      accessCount: 0,
      lastAccessed: Date.now()
    });
  }

  evict(): void {
    let lruKey = '';
    let oldestTime = Infinity;

    for (const [key, entry] of this.cache) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        lruKey = key;
      }
    }

    if (lruKey) {
      this.cache.delete(lruKey);
      console.log(\`[LRU] Evicted: \${lruKey}\`);
    }
  }
}

// Least Frequently Used Cache
class LFUCache<T> implements CacheStrategy {
  private cache: Map<string, CacheEntry<T>> = new Map();

  constructor(private maxSize: number) {}

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Increment access count
    entry.accessCount++;
    entry.lastAccessed = Date.now();
    return entry.value;
  }

  set(key: string, value: T): void {
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evict();
    }

    this.cache.set(key, {
      key,
      value,
      accessCount: 0,
      lastAccessed: Date.now()
    });
  }

  evict(): void {
    let lfuKey = '';
    let lowestCount = Infinity;

    for (const [key, entry] of this.cache) {
      if (entry.accessCount < lowestCount) {
        lowestCount = entry.accessCount;
        lfuKey = key;
      }
    }

    if (lfuKey) {
      this.cache.delete(lfuKey);
      console.log(\`[LFU] Evicted: \${lfuKey}\`);
    }
  }
}

// Time To Live Cache
class TTLCache<T> implements CacheStrategy {
  private cache: Map<string, CacheEntry<T>> = new Map();

  constructor(private maxSize: number, private defaultTTL: number = 60000) {}

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check expiration
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      console.log(\`[TTL] Expired: \${key}\`);
      return null;
    }

    entry.lastAccessed = Date.now();
    return entry.value;
  }

  set(key: string, value: T, ttl?: number): void {
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evict();
    }

    const expiresAt = Date.now() + (ttl || this.defaultTTL);
    this.cache.set(key, {
      key,
      value,
      accessCount: 0,
      lastAccessed: Date.now(),
      expiresAt
    });
  }

  evict(): void {
    // Evict expired entries first
    for (const [key, entry] of this.cache) {
      if (entry.expiresAt && Date.now() > entry.expiresAt) {
        this.cache.delete(key);
        console.log(\`[TTL] Evicted expired: \${key}\`);
        return;
      }
    }

    // If no expired, evict oldest
    let oldestKey = '';
    let oldestTime = Infinity;
    for (const [key, entry] of this.cache) {
      if ((entry.expiresAt || 0) < oldestTime) {
        oldestTime = entry.expiresAt || 0;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      console.log(\`[TTL] Evicted: \${oldestKey}\`);
    }
  }
}

// Usage comparison
console.log('=== LRU Cache ===');
const lru = new LRUCache<string>(3);
lru.set('a', 'value_a');
lru.set('b', 'value_b');
lru.set('c', 'value_c');
lru.get('a'); // Access 'a' to make it recently used
lru.set('d', 'value_d'); // Should evict 'b' (least recently used)

console.log('\\n=== LFU Cache ===');
const lfu = new LFUCache<string>(3);
lfu.set('a', 'value_a');
lfu.set('b', 'value_b');
lfu.set('c', 'value_c');
lfu.get('a'); // Access 'a' twice
lfu.get('a');
lfu.set('d', 'value_d'); // Should evict 'b' or 'c' (least frequently used)

console.log('\\n=== TTL Cache ===');
const ttl = new TTLCache<string>(3, 1000); // 1 second TTL
ttl.set('a', 'value_a', 500); // 500ms TTL
ttl.set('b', 'value_b', 2000); // 2s TTL
setTimeout(() => {
  console.log('After 600ms:', ttl.get('a')); // Should be null (expired)
  console.log('After 600ms:', ttl.get('b')); // Should exist
}, 600);`,
    hints: [
      'LRU evicts items not accessed for longest time',
      'LFU evicts items with lowest access count',
      'TTL evicts items past their expiration time',
      'Track both lastAccessed and accessCount for different strategies'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t2-ex14',
    subjectId: 'cs404',
    topicId: 'topic-2',
    title: 'Load Balancer Implementation',
    difficulty: 5,
    description: `Implement a load balancer with multiple distribution strategies: Round Robin, Least Connections, and Weighted Round Robin. Track server health and distribute requests accordingly.

Create a simulation that demonstrates how different strategies distribute load across servers.`,
    starterCode: `interface Server {
  id: string;
  url: string;
  activeConnections: number;
  weight?: number; // For weighted strategies
  healthy: boolean;
}

interface LoadBalancerStrategy {
  selectServer(servers: Server[]): Server | null;
}

class RoundRobinStrategy implements LoadBalancerStrategy {
  private currentIndex = 0;

  selectServer(servers: Server[]): Server | null {
    // TODO: Select next server in rotation
    return null;
  }
}

// TODO: Implement LeastConnectionsStrategy and WeightedRoundRobinStrategy

class LoadBalancer {
  private servers: Server[] = [];

  constructor(private strategy: LoadBalancerStrategy) {}

  addServer(server: Server): void {
    // TODO
  }

  handleRequest(requestId: string): string {
    // TODO: Select server, track connection, simulate request
    return '';
  }

  completeRequest(serverId: string): void {
    // TODO: Decrement active connections
  }
}`,
    solution: `interface Server {
  id: string;
  url: string;
  activeConnections: number;
  weight?: number;
  healthy: boolean;
}

interface LoadBalancerStrategy {
  selectServer(servers: Server[]): Server | null;
}

class RoundRobinStrategy implements LoadBalancerStrategy {
  private currentIndex = 0;

  selectServer(servers: Server[]): Server | null {
    const healthyServers = servers.filter(s => s.healthy);
    if (healthyServers.length === 0) return null;

    const server = healthyServers[this.currentIndex % healthyServers.length];
    this.currentIndex++;
    return server;
  }
}

class LeastConnectionsStrategy implements LoadBalancerStrategy {
  selectServer(servers: Server[]): Server | null {
    const healthyServers = servers.filter(s => s.healthy);
    if (healthyServers.length === 0) return null;

    return healthyServers.reduce((min, server) =>
      server.activeConnections < min.activeConnections ? server : min
    );
  }
}

class WeightedRoundRobinStrategy implements LoadBalancerStrategy {
  private currentIndex = 0;
  private currentWeight = 0;

  selectServer(servers: Server[]): Server | null {
    const healthyServers = servers.filter(s => s.healthy);
    if (healthyServers.length === 0) return null;

    const maxWeight = Math.max(...healthyServers.map(s => s.weight || 1));

    while (true) {
      this.currentIndex = (this.currentIndex + 1) % healthyServers.length;

      if (this.currentIndex === 0) {
        this.currentWeight = this.currentWeight - 1;
        if (this.currentWeight <= 0) {
          this.currentWeight = maxWeight;
        }
      }

      const server = healthyServers[this.currentIndex];
      if ((server.weight || 1) >= this.currentWeight) {
        return server;
      }
    }
  }
}

class LoadBalancer {
  private servers: Server[] = [];

  constructor(private strategy: LoadBalancerStrategy) {}

  addServer(server: Server): void {
    this.servers.push(server);
  }

  removeServer(serverId: string): void {
    this.servers = this.servers.filter(s => s.id !== serverId);
  }

  setServerHealth(serverId: string, healthy: boolean): void {
    const server = this.servers.find(s => s.id === serverId);
    if (server) {
      server.healthy = healthy;
      console.log(\`Server \${serverId} marked as \${healthy ? 'healthy' : 'unhealthy'}\`);
    }
  }

  handleRequest(requestId: string): string {
    const server = this.strategy.selectServer(this.servers);

    if (!server) {
      return \`Request \${requestId}: No healthy servers available\`;
    }

    server.activeConnections++;
    return \`Request \${requestId} -> \${server.id} (connections: \${server.activeConnections})\`;
  }

  completeRequest(serverId: string): void {
    const server = this.servers.find(s => s.id === serverId);
    if (server && server.activeConnections > 0) {
      server.activeConnections--;
    }
  }

  getStatus(): void {
    console.log('\\n=== Server Status ===');
    this.servers.forEach(server => {
      console.log(\`\${server.id}: \${server.activeConnections} active, \${
        server.healthy ? 'healthy' : 'UNHEALTHY'
      }\${server.weight ? \`, weight: \${server.weight}\` : ''}\`);
    });
  }
}

// Usage comparison
console.log('=== Round Robin Strategy ===');
const rrLB = new LoadBalancer(new RoundRobinStrategy());
rrLB.addServer({ id: 'server1', url: 'http://server1', activeConnections: 0, healthy: true });
rrLB.addServer({ id: 'server2', url: 'http://server2', activeConnections: 0, healthy: true });
rrLB.addServer({ id: 'server3', url: 'http://server3', activeConnections: 0, healthy: true });

for (let i = 1; i <= 5; i++) {
  console.log(rrLB.handleRequest(\`req\${i}\`));
}
rrLB.getStatus();

console.log('\\n=== Least Connections Strategy ===');
const lcLB = new LoadBalancer(new LeastConnectionsStrategy());
lcLB.addServer({ id: 'server1', url: 'http://server1', activeConnections: 3, healthy: true });
lcLB.addServer({ id: 'server2', url: 'http://server2', activeConnections: 1, healthy: true });
lcLB.addServer({ id: 'server3', url: 'http://server3', activeConnections: 5, healthy: true });

for (let i = 1; i <= 3; i++) {
  console.log(lcLB.handleRequest(\`req\${i}\`));
}
lcLB.getStatus();

console.log('\\n=== Weighted Round Robin Strategy ===');
const wrrLB = new LoadBalancer(new WeightedRoundRobinStrategy());
wrrLB.addServer({ id: 'server1', url: 'http://server1', activeConnections: 0, healthy: true, weight: 3 });
wrrLB.addServer({ id: 'server2', url: 'http://server2', activeConnections: 0, healthy: true, weight: 1 });

for (let i = 1; i <= 8; i++) {
  console.log(wrrLB.handleRequest(\`req\${i}\`));
}
wrrLB.getStatus();`,
    hints: [
      'Round Robin cycles through servers sequentially',
      'Least Connections selects server with fewest active requests',
      'Weighted Round Robin favors servers with higher weights',
      'Always filter out unhealthy servers before selection'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t2-ex15',
    subjectId: 'cs404',
    topicId: 'topic-2',
    title: 'Horizontal vs Vertical Scaling Simulator',
    difficulty: 5,
    description: `Create a simulator that demonstrates the differences between horizontal and vertical scaling. Model server capacity, request handling, and scaling decisions.

Implement auto-scaling logic that decides when to scale horizontally (add servers) or vertically (increase server capacity).`,
    starterCode: `interface ServerInstance {
  id: string;
  cpu: number; // cores
  memory: number; // GB
  maxRequests: number;
  currentRequests: number;
  utilizationPercent: number;
}

class VerticalScaling {
  private server: ServerInstance;

  constructor(initialCPU: number, initialMemory: number) {
    // TODO: Initialize server
  }

  scaleUp(): void {
    // TODO: Increase CPU and memory
  }

  canHandle(requests: number): boolean {
    // TODO: Check if server can handle load
    return false;
  }
}

class HorizontalScaling {
  private servers: ServerInstance[] = [];

  addServer(): void {
    // TODO: Add new server instance
  }

  removeServer(): void {
    // TODO: Remove least utilized server
  }

  distributeLoad(totalRequests: number): void {
    // TODO: Distribute requests across servers
  }
}

class AutoScaler {
  decide(currentLoad: number, capacity: number): 'scale-up' | 'scale-out' | 'none' {
    // TODO: Decide scaling strategy
    return 'none';
  }
}`,
    solution: `interface ServerInstance {
  id: string;
  cpu: number;
  memory: number;
  maxRequests: number;
  currentRequests: number;
  utilizationPercent: number;
}

class VerticalScaling {
  private server: ServerInstance;
  private scaleCount = 0;

  constructor(initialCPU: number, initialMemory: number) {
    this.server = {
      id: 'vertical-server',
      cpu: initialCPU,
      memory: initialMemory,
      maxRequests: initialCPU * 100,
      currentRequests: 0,
      utilizationPercent: 0
    };
  }

  scaleUp(): void {
    this.scaleCount++;
    this.server.cpu *= 2;
    this.server.memory *= 2;
    this.server.maxRequests = this.server.cpu * 100;
    console.log(\`[Vertical] Scaled UP to \${this.server.cpu} CPU, \${this.server.memory}GB RAM\`);
    console.log(\`[Vertical] Max requests: \${this.server.maxRequests}\`);
  }

  handleLoad(requests: number): void {
    this.server.currentRequests = requests;
    this.server.utilizationPercent = (requests / this.server.maxRequests) * 100;
  }

  canHandle(requests: number): boolean {
    return requests <= this.server.maxRequests;
  }

  getStatus(): string {
    return \`Vertical: \${this.server.cpu} CPU, \${this.server.memory}GB, \${
      this.server.currentRequests
    }/\${this.server.maxRequests} requests (\${
      this.server.utilizationPercent.toFixed(1)
    }% utilized)\`;
  }

  getCost(): number {
    // Cost increases exponentially with vertical scaling
    return Math.pow(this.server.cpu, 1.5) * 10;
  }
}

class HorizontalScaling {
  private servers: ServerInstance[] = [];
  private nextId = 1;
  private serverCPU = 2;
  private serverMemory = 8;

  constructor() {
    this.addServer(); // Start with one server
  }

  addServer(): void {
    const server: ServerInstance = {
      id: \`horizontal-server-\${this.nextId++}\`,
      cpu: this.serverCPU,
      memory: this.serverMemory,
      maxRequests: this.serverCPU * 100,
      currentRequests: 0,
      utilizationPercent: 0
    };
    this.servers.push(server);
    console.log(\`[Horizontal] Added \${server.id}\`);
  }

  removeServer(): void {
    if (this.servers.length <= 1) return;

    const removed = this.servers.pop();
    console.log(\`[Horizontal] Removed \${removed?.id}\`);
  }

  distributeLoad(totalRequests: number): void {
    const requestsPerServer = Math.ceil(totalRequests / this.servers.length);

    this.servers.forEach(server => {
      server.currentRequests = Math.min(requestsPerServer, server.maxRequests);
      server.utilizationPercent = (server.currentRequests / server.maxRequests) * 100;
    });
  }

  canHandle(requests: number): boolean {
    const totalCapacity = this.servers.reduce((sum, s) => sum + s.maxRequests, 0);
    return requests <= totalCapacity;
  }

  getStatus(): string {
    const total = this.servers.reduce((sum, s) => sum + s.currentRequests, 0);
    const capacity = this.servers.reduce((sum, s) => sum + s.maxRequests, 0);
    const avgUtil = (total / capacity) * 100;

    return \`Horizontal: \${this.servers.length} servers, \${total}/\${capacity} requests (\${
      avgUtil.toFixed(1)
    }% avg utilized)\`;
  }

  getCost(): number {
    // Cost increases linearly with horizontal scaling
    return this.servers.length * this.serverCPU * 10;
  }
}

class AutoScaler {
  decide(
    currentLoad: number,
    capacity: number,
    costVertical: number,
    costHorizontal: number
  ): 'scale-up' | 'scale-out' | 'none' {
    const utilization = (currentLoad / capacity) * 100;

    if (utilization < 60) {
      return 'none'; // Underutilized
    }

    if (utilization > 80) {
      // Need to scale - decide which approach
      if (costHorizontal < costVertical * 0.8) {
        return 'scale-out'; // Horizontal is more cost-effective
      } else {
        return 'scale-up'; // Vertical is more cost-effective
      }
    }

    return 'none';
  }
}

// Simulation
console.log('=== Scaling Comparison Simulation ===\\n');

const vertical = new VerticalScaling(2, 8);
const horizontal = new HorizontalScaling();
const autoScaler = new AutoScaler();

const loadLevels = [100, 200, 500, 1000, 2000];

loadLevels.forEach(load => {
  console.log(\`\\n--- Load: \${load} requests ---\`);

  // Vertical scaling
  while (!vertical.canHandle(load)) {
    vertical.scaleUp();
  }
  vertical.handleLoad(load);
  console.log(vertical.getStatus());
  console.log(\`Vertical cost: $\${vertical.getCost().toFixed(2)}\`);

  // Horizontal scaling
  while (!horizontal.canHandle(load)) {
    horizontal.addServer();
  }
  horizontal.distributeLoad(load);
  console.log(horizontal.getStatus());
  console.log(\`Horizontal cost: $\${horizontal.getCost().toFixed(2)}\`);
});

console.log(\`\\n=== Summary ===\`);
console.log('Vertical Scaling:');
console.log('  Pros: Simple, no distributed system complexity');
console.log('  Cons: Hardware limits, downtime during scaling, exponential cost');
console.log('\\nHorizontal Scaling:');
console.log('  Pros: No hardware limits, high availability, linear cost');
console.log('  Cons: Distributed system complexity, load balancing needed');`,
    hints: [
      'Vertical scaling increases single server capacity',
      'Horizontal scaling adds more server instances',
      'Vertical scaling has hardware limits and downtime',
      'Horizontal scaling provides redundancy and fault tolerance'
    ],
    testCases: [],
    language: 'typescript'
  },
  {
    id: 'cs404-t2-ex16',
    subjectId: 'cs404',
    topicId: 'topic-2',
    title: 'Technology Stack Evaluation Matrix',
    difficulty: 5,
    description: `Create a comprehensive technology stack evaluation system that scores different tech stacks based on project requirements. Consider factors like performance, developer experience, ecosystem, scalability, and cost.

Build a decision matrix that recommends the best stack for different project types (startup MVP, enterprise app, high-traffic service).`,
    starterCode: `interface TechStack {
  name: string;
  frontend: string;
  backend: string;
  database: string;
  deployment: string;
}

interface ProjectRequirements {
  projectType: 'mvp' | 'enterprise' | 'high-traffic';
  teamExpertise: string[]; // Languages/frameworks team knows
  budget: 'low' | 'medium' | 'high';
  timeToMarket: 'fast' | 'medium' | 'slow';
  scalabilityNeeds: 'low' | 'medium' | 'high';
  performanceCritical: boolean;
}

interface StackEvaluation {
  stack: TechStack;
  score: number;
  strengths: string[];
  weaknesses: string[];
  estimatedCost: number;
  learningCurve: 'low' | 'medium' | 'high';
}

class StackEvaluator {
  private stacks: TechStack[] = [];

  addStack(stack: TechStack): void {
    // TODO
  }

  evaluate(requirements: ProjectRequirements): StackEvaluation[] {
    // TODO: Score each stack based on requirements
    return [];
  }

  recommend(requirements: ProjectRequirements): StackEvaluation {
    // TODO: Return best stack
    return null as any;
  }
}`,
    solution: `interface TechStack {
  name: string;
  frontend: string;
  backend: string;
  database: string;
  deployment: string;
  maturity: number; // 1-10
  communitySize: number; // 1-10
  performance: number; // 1-10
  scalability: number; // 1-10
  devSpeed: number; // 1-10 (how fast to develop)
  hostingCost: number; // 1-10 (10 = most expensive)
  learningCurve: 'low' | 'medium' | 'high';
}

interface ProjectRequirements {
  projectType: 'mvp' | 'enterprise' | 'high-traffic';
  teamExpertise: string[];
  budget: 'low' | 'medium' | 'high';
  timeToMarket: 'fast' | 'medium' | 'slow';
  scalabilityNeeds: 'low' | 'medium' | 'high';
  performanceCritical: boolean;
}

interface StackEvaluation {
  stack: TechStack;
  score: number;
  strengths: string[];
  weaknesses: string[];
  estimatedCost: number;
  learningCurve: 'low' | 'medium' | 'high';
}

class StackEvaluator {
  private stacks: TechStack[] = [];

  constructor() {
    // Define common tech stacks
    this.addStack({
      name: 'MERN (MongoDB, Express, React, Node.js)',
      frontend: 'React',
      backend: 'Node.js/Express',
      database: 'MongoDB',
      deployment: 'Vercel/Heroku',
      maturity: 8,
      communitySize: 10,
      performance: 7,
      scalability: 7,
      devSpeed: 9,
      hostingCost: 4,
      learningCurve: 'medium'
    });

    this.addStack({
      name: 'Django/PostgreSQL',
      frontend: 'React/Vue',
      backend: 'Django/Python',
      database: 'PostgreSQL',
      deployment: 'AWS/GCP',
      maturity: 10,
      communitySize: 9,
      performance: 8,
      scalability: 8,
      devSpeed: 8,
      hostingCost: 6,
      learningCurve: 'medium'
    });

    this.addStack({
      name: 'Spring Boot/Java Enterprise',
      frontend: 'Angular',
      backend: 'Spring Boot/Java',
      database: 'Oracle/PostgreSQL',
      deployment: 'Enterprise servers',
      maturity: 10,
      communitySize: 8,
      performance: 9,
      scalability: 10,
      devSpeed: 6,
      hostingCost: 8,
      learningCurve: 'high'
    });

    this.addStack({
      name: 'Jamstack (Next.js, Serverless)',
      frontend: 'Next.js/React',
      backend: 'Serverless Functions',
      database: 'Firebase/Supabase',
      deployment: 'Vercel/Netlify',
      maturity: 7,
      communitySize: 9,
      performance: 9,
      scalability: 9,
      devSpeed: 10,
      hostingCost: 3,
      learningCurve: 'low'
    });

    this.addStack({
      name: 'Go Microservices',
      frontend: 'React/Vue',
      backend: 'Go',
      database: 'PostgreSQL/Redis',
      deployment: 'Kubernetes',
      maturity: 8,
      communitySize: 7,
      performance: 10,
      scalability: 10,
      devSpeed: 7,
      hostingCost: 7,
      learningCurve: 'high'
    });
  }

  addStack(stack: TechStack): void {
    this.stacks.push(stack);
  }

  evaluate(requirements: ProjectRequirements): StackEvaluation[] {
    return this.stacks.map(stack => {
      let score = 0;
      const strengths: string[] = [];
      const weaknesses: string[] = [];

      // Project type scoring
      if (requirements.projectType === 'mvp') {
        score += stack.devSpeed * 3; // Fast development is critical
        score += stack.hostingCost * -1; // Low cost is important
        if (stack.devSpeed >= 8) strengths.push('Fast development for MVP');
        if (stack.learningCurve === 'high') weaknesses.push('Steep learning curve slows MVP');
      } else if (requirements.projectType === 'enterprise') {
        score += stack.maturity * 2;
        score += stack.scalability * 2;
        if (stack.maturity >= 9) strengths.push('Battle-tested for enterprise');
        if (stack.communitySize < 7) weaknesses.push('Smaller community support');
      } else if (requirements.projectType === 'high-traffic') {
        score += stack.performance * 3;
        score += stack.scalability * 3;
        if (stack.performance >= 9) strengths.push('Excellent performance characteristics');
        if (stack.scalability < 8) weaknesses.push('May struggle at high scale');
      }

      // Team expertise bonus
      const stackTechs = [stack.frontend, stack.backend, stack.database].join(' ').toLowerCase();
      const expertiseMatch = requirements.teamExpertise.some(skill =>
        stackTechs.includes(skill.toLowerCase())
      );
      if (expertiseMatch) {
        score += 10;
        strengths.push('Team has relevant expertise');
      } else {
        weaknesses.push('Team needs to learn new technologies');
      }

      // Budget constraints
      const budgetScores = { low: 3, medium: 6, high: 10 };
      if (stack.hostingCost <= budgetScores[requirements.budget]) {
        score += 5;
        strengths.push('Fits within budget constraints');
      } else {
        score -= 5;
        weaknesses.push('Higher hosting costs than budget allows');
      }

      // Time to market
      if (requirements.timeToMarket === 'fast' && stack.devSpeed >= 8) {
        score += 8;
        strengths.push('Enables rapid development');
      }

      // Scalability needs
      const scalabilityScores = { low: 5, medium: 7, high: 9 };
      if (stack.scalability >= scalabilityScores[requirements.scalabilityNeeds]) {
        score += 5;
        strengths.push('Meets scalability requirements');
      } else {
        weaknesses.push('May not scale to requirements');
      }

      // Performance critical
      if (requirements.performanceCritical && stack.performance >= 8) {
        score += 10;
        strengths.push('High-performance capabilities');
      } else if (requirements.performanceCritical && stack.performance < 7) {
        score -= 5;
        weaknesses.push('Performance may not meet requirements');
      }

      const estimatedCost = stack.hostingCost * 100; // Monthly cost estimate

      return {
        stack,
        score,
        strengths,
        weaknesses,
        estimatedCost,
        learningCurve: stack.learningCurve
      };
    }).sort((a, b) => b.score - a.score);
  }

  recommend(requirements: ProjectRequirements): StackEvaluation {
    const evaluations = this.evaluate(requirements);
    return evaluations[0];
  }

  printEvaluation(evaluation: StackEvaluation): void {
    console.log(\`\\n=== \${evaluation.stack.name} ===\`);
    console.log(\`Score: \${evaluation.score}\`);
    console.log(\`Frontend: \${evaluation.stack.frontend}\`);
    console.log(\`Backend: \${evaluation.stack.backend}\`);
    console.log(\`Database: \${evaluation.stack.database}\`);
    console.log(\`Estimated Monthly Cost: $\${evaluation.estimatedCost}\`);
    console.log(\`Learning Curve: \${evaluation.learningCurve}\`);
    console.log(\`\\nStrengths:\`);
    evaluation.strengths.forEach(s => console.log(\`  + \${s}\`));
    console.log(\`\\nWeaknesses:\`);
    evaluation.weaknesses.forEach(w => console.log(\`  - \${w}\`));
  }
}

// Usage examples
const evaluator = new StackEvaluator();

console.log('=== Startup MVP Scenario ===');
const mvpRequirements: ProjectRequirements = {
  projectType: 'mvp',
  teamExpertise: ['JavaScript', 'React'],
  budget: 'low',
  timeToMarket: 'fast',
  scalabilityNeeds: 'low',
  performanceCritical: false
};

const mvpRecommendation = evaluator.recommend(mvpRequirements);
evaluator.printEvaluation(mvpRecommendation);

console.log('\\n\\n=== Enterprise Application Scenario ===');
const enterpriseRequirements: ProjectRequirements = {
  projectType: 'enterprise',
  teamExpertise: ['Java', 'Spring'],
  budget: 'high',
  timeToMarket: 'medium',
  scalabilityNeeds: 'high',
  performanceCritical: true
};

const enterpriseRecommendation = evaluator.recommend(enterpriseRequirements);
evaluator.printEvaluation(enterpriseRecommendation);

console.log('\\n\\n=== High-Traffic Service Scenario ===');
const highTrafficRequirements: ProjectRequirements = {
  projectType: 'high-traffic',
  teamExpertise: ['Go', 'Kubernetes'],
  budget: 'medium',
  timeToMarket: 'medium',
  scalabilityNeeds: 'high',
  performanceCritical: true
};

const highTrafficRecommendation = evaluator.recommend(highTrafficRequirements);
evaluator.printEvaluation(highTrafficRecommendation);`,
    hints: [
      'Score stacks differently based on project type',
      'Give bonus points for team expertise matches',
      'Consider both technical and business requirements',
      'Balance immediate needs with long-term scalability'
    ],
    testCases: [],
    language: 'typescript'
  }
];
