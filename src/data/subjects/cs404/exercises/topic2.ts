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
  }
];
