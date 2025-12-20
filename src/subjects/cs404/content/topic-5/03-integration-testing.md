# Integration Testing

## Introduction

While unit tests verify that individual components work correctly in isolation, integration tests validate that different parts of your system work together properly. They test the interactions between modules, verify API contracts, ensure database queries execute correctly, and confirm that services integrate as expected. Integration tests catch a different class of bugs than unit tests—issues that only appear when components interact.

For capstone projects, integration testing is critical for backend APIs, database operations, and third-party service integrations. These tests provide confidence that your application works as a cohesive system, not just as isolated functions. Although integration tests run slower than unit tests and require more setup, they catch issues that unit tests miss entirely—incorrect API responses, SQL query errors, authentication failures, and data serialization problems.

## API Integration Testing

Testing HTTP APIs requires verifying the entire request/response cycle: route handling, middleware execution, request validation, business logic, database queries, and response formatting. Integration tests for APIs use actual HTTP requests rather than testing handlers in isolation.

The supertest library integrates seamlessly with Express applications, allowing you to make HTTP requests against your API without starting a server. This approach tests your API as clients will use it while keeping tests fast and isolated.

```typescript
// api/users.ts - Express API endpoint
import express from 'express';
import { UserRepository } from '../repositories/user-repository';

const router = express.Router();
const userRepo = new UserRepository();

router.post('/users', async (req, res) => {
  const { email, name } = req.body;

  if (!email || !name) {
    return res.status(400).json({ error: 'Email and name are required' });
  }

  const existingUser = await userRepo.findByEmail(email);
  if (existingUser) {
    return res.status(409).json({ error: 'Email already exists' });
  }

  const user = await userRepo.create({ email, name });
  res.status(201).json(user);
});

router.get('/users/:id', async (req, res) => {
  const user = await userRepo.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

export default router;

// api/users.test.ts - Integration tests
import request from 'supertest';
import express from 'express';
import userRouter from './users';
import { setupTestDatabase, teardownTestDatabase } from '../test-utils/db';

const app = express();
app.use(express.json());
app.use('/api', userRouter);

describe('User API', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  afterAll(async () => {
    await teardownTestDatabase();
  });

  beforeEach(async () => {
    // Clear users table before each test
    await clearUsersTable();
  });

  describe('POST /api/users', () => {
    test('creates new user with valid data', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ email: 'test@example.com', name: 'Test User' });

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        email: 'test@example.com',
        name: 'Test User'
      });
      expect(response.body.id).toBeDefined();
    });

    test('returns 400 for missing email', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ name: 'Test User' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Email and name are required');
    });

    test('returns 409 for duplicate email', async () => {
      await request(app)
        .post('/api/users')
        .send({ email: 'test@example.com', name: 'First User' });

      const response = await request(app)
        .post('/api/users')
        .send({ email: 'test@example.com', name: 'Second User' });

      expect(response.status).toBe(409);
      expect(response.body.error).toBe('Email already exists');
    });
  });

  describe('GET /api/users/:id', () => {
    test('retrieves existing user', async () => {
      const createResponse = await request(app)
        .post('/api/users')
        .send({ email: 'test@example.com', name: 'Test User' });

      const userId = createResponse.body.id;

      const response = await request(app).get(`/api/users/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        id: userId,
        email: 'test@example.com',
        name: 'Test User'
      });
    });

    test('returns 404 for non-existent user', async () => {
      const response = await request(app).get('/api/users/99999');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('User not found');
    });
  });
});
```

## Database Integration Testing

Database integration tests verify that queries, transactions, constraints, and migrations work correctly. Unlike unit tests that mock database calls, integration tests execute actual SQL against a test database. This catches query errors, constraint violations, and transaction issues that mocks can't detect.

Use a separate test database that mirrors your production schema. For each test, start with a known state by seeding data or clearing tables. After tests complete, clean up to prevent tests from affecting each other.

```typescript
// repositories/order-repository.ts
import { db } from '../database';

export interface Order {
  id: string;
  userId: string;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  createdAt: Date;
}

export class OrderRepository {
  async create(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const result = await db.query(
      `INSERT INTO orders (user_id, total, status)
       VALUES ($1, $2, $3)
       RETURNING id, user_id, total, status, created_at`,
      [order.userId, order.total, order.status]
    );

    return this.mapRow(result.rows[0]);
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const result = await db.query(
      `SELECT id, user_id, total, status, created_at
       FROM orders
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );

    return result.rows.map(this.mapRow);
  }

  async updateStatus(orderId: string, status: Order['status']): Promise<void> {
    await db.query(
      'UPDATE orders SET status = $1 WHERE id = $2',
      [status, orderId]
    );
  }

  private mapRow(row: any): Order {
    return {
      id: row.id,
      userId: row.user_id,
      total: parseFloat(row.total),
      status: row.status,
      createdAt: new Date(row.created_at)
    };
  }
}

// repositories/order-repository.test.ts
import { OrderRepository } from './order-repository';
import { setupTestDatabase, clearDatabase } from '../test-utils/db';

describe('OrderRepository', () => {
  let repository: OrderRepository;

  beforeAll(async () => {
    await setupTestDatabase();
    repository = new OrderRepository();
  });

  beforeEach(async () => {
    await clearDatabase();
  });

  test('creates order with correct data', async () => {
    const orderData = {
      userId: 'user-123',
      total: 99.99,
      status: 'pending' as const
    };

    const order = await repository.create(orderData);

    expect(order.id).toBeDefined();
    expect(order.userId).toBe('user-123');
    expect(order.total).toBe(99.99);
    expect(order.status).toBe('pending');
    expect(order.createdAt).toBeInstanceOf(Date);
  });

  test('retrieves orders by user ID', async () => {
    const userId = 'user-456';

    await repository.create({ userId, total: 50.0, status: 'pending' });
    await repository.create({ userId, total: 75.0, status: 'paid' });
    await repository.create({ userId: 'other-user', total: 100.0, status: 'pending' });

    const orders = await repository.findByUserId(userId);

    expect(orders).toHaveLength(2);
    expect(orders[0].total).toBe(75.0); // Most recent first
    expect(orders[1].total).toBe(50.0);
  });

  test('updates order status', async () => {
    const order = await repository.create({
      userId: 'user-789',
      total: 125.0,
      status: 'pending'
    });

    await repository.updateStatus(order.id, 'paid');

    const updated = await repository.findByUserId('user-789');
    expect(updated[0].status).toBe('paid');
  });

  test('returns empty array for user with no orders', async () => {
    const orders = await repository.findByUserId('non-existent-user');
    expect(orders).toEqual([]);
  });
});
```

## Testing Database Transactions

Transactions ensure that multiple database operations either all succeed or all fail together. Testing transactions requires verifying that successful operations commit changes and that failures roll back all changes, leaving the database in its original state.

```typescript
// services/order-service.ts
import { db } from '../database';
import { OrderRepository } from '../repositories/order-repository';
import { InventoryRepository } from '../repositories/inventory-repository';

export class OrderService {
  constructor(
    private orderRepo: OrderRepository,
    private inventoryRepo: InventoryRepository
  ) {}

  async createOrder(userId: string, items: Array<{ productId: string; quantity: number }>): Promise<Order> {
    const client = await db.connect();

    try {
      await client.query('BEGIN');

      // Calculate total and reserve inventory
      let total = 0;
      for (const item of items) {
        const product = await this.inventoryRepo.findById(item.productId, client);

        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        if (product.quantity < item.quantity) {
          throw new Error(`Insufficient inventory for product ${item.productId}`);
        }

        total += product.price * item.quantity;

        await this.inventoryRepo.decrementQuantity(
          item.productId,
          item.quantity,
          client
        );
      }

      // Create order
      const order = await this.orderRepo.create(
        { userId, total, status: 'pending' },
        client
      );

      await client.query('COMMIT');
      return order;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

// services/order-service.test.ts
describe('OrderService', () => {
  let service: OrderService;
  let orderRepo: OrderRepository;
  let inventoryRepo: InventoryRepository;

  beforeEach(async () => {
    await clearDatabase();
    orderRepo = new OrderRepository();
    inventoryRepo = new InventoryRepository();
    service = new OrderService(orderRepo, inventoryRepo);

    // Seed test inventory
    await inventoryRepo.create({ id: 'prod-1', name: 'Widget', price: 10.0, quantity: 100 });
    await inventoryRepo.create({ id: 'prod-2', name: 'Gadget', price: 25.0, quantity: 50 });
  });

  test('creates order and decrements inventory', async () => {
    const items = [
      { productId: 'prod-1', quantity: 5 },
      { productId: 'prod-2', quantity: 2 }
    ];

    const order = await service.createOrder('user-123', items);

    expect(order.total).toBe(100); // (10 * 5) + (25 * 2)
    expect(order.status).toBe('pending');

    const product1 = await inventoryRepo.findById('prod-1');
    const product2 = await inventoryRepo.findById('prod-2');

    expect(product1.quantity).toBe(95); // 100 - 5
    expect(product2.quantity).toBe(48); // 50 - 2
  });

  test('rolls back transaction when inventory insufficient', async () => {
    const items = [
      { productId: 'prod-1', quantity: 5 },
      { productId: 'prod-2', quantity: 100 } // Exceeds available quantity
    ];

    await expect(service.createOrder('user-123', items)).rejects.toThrow(
      'Insufficient inventory for product prod-2'
    );

    // Verify no order was created
    const orders = await orderRepo.findByUserId('user-123');
    expect(orders).toHaveLength(0);

    // Verify inventory wasn't decremented
    const product1 = await inventoryRepo.findById('prod-1');
    const product2 = await inventoryRepo.findById('prod-2');

    expect(product1.quantity).toBe(100); // Unchanged
    expect(product2.quantity).toBe(50);  // Unchanged
  });
});
```

## Testing External Service Integration

When your application integrates with external services like payment processors, email providers, or third-party APIs, integration tests verify that your code correctly handles the service's API. For tests, use the service's sandbox/test environment or create a test double that mimics the service's behavior.

```typescript
// services/payment-service.ts
import Stripe from 'stripe';

export class PaymentService {
  private stripe: Stripe;

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey, { apiVersion: '2023-10-16' });
  }

  async createPaymentIntent(amount: number, currency: string = 'usd'): Promise<string> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency
    });

    return paymentIntent.client_secret!;
  }

  async confirmPayment(paymentIntentId: string): Promise<boolean> {
    const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent.status === 'succeeded';
  }
}

// services/payment-service.test.ts
import { PaymentService } from './payment-service';

// Use Stripe test API key
const STRIPE_TEST_KEY = process.env.STRIPE_TEST_KEY!;

describe('PaymentService', () => {
  let service: PaymentService;

  beforeAll(() => {
    service = new PaymentService(STRIPE_TEST_KEY);
  });

  test('creates payment intent successfully', async () => {
    const clientSecret = await service.createPaymentIntent(50.0, 'usd');

    expect(clientSecret).toBeDefined();
    expect(typeof clientSecret).toBe('string');
    expect(clientSecret).toContain('pi_'); // Stripe payment intent prefix
  });

  test('confirms successful payment', async () => {
    // Create and confirm a payment using Stripe test card
    const stripe = new Stripe(STRIPE_TEST_KEY, { apiVersion: '2023-10-16' });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 5000,
      currency: 'usd',
      payment_method: 'pm_card_visa',
      confirm: true,
      return_url: 'https://example.com/return'
    });

    const isConfirmed = await service.confirmPayment(paymentIntent.id);
    expect(isConfirmed).toBe(true);
  });
});
```

## Test Database Setup and Teardown

Proper test database management ensures tests run reliably and independently. Use a dedicated test database, run migrations before tests start, and provide utilities for seeding data and clearing tables between tests.

```typescript
// test-utils/db.ts
import { Pool } from 'pg';
import { migrate } from '../database/migrations';

let testPool: Pool;

export async function setupTestDatabase(): Promise<void> {
  testPool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'capstone_test',
    user: 'test_user',
    password: 'test_password'
  });

  // Run migrations to create schema
  await migrate(testPool);
}

export async function teardownTestDatabase(): Promise<void> {
  if (testPool) {
    await testPool.end();
  }
}

export async function clearDatabase(): Promise<void> {
  // Clear all tables in reverse dependency order
  await testPool.query('TRUNCATE orders, users, products RESTART IDENTITY CASCADE');
}

export async function seedTestData(data: any): Promise<void> {
  // Helper to insert test data
  if (data.users) {
    for (const user of data.users) {
      await testPool.query(
        'INSERT INTO users (id, email, name) VALUES ($1, $2, $3)',
        [user.id, user.email, user.name]
      );
    }
  }

  if (data.products) {
    for (const product of data.products) {
      await testPool.query(
        'INSERT INTO products (id, name, price, quantity) VALUES ($1, $2, $3, $4)',
        [product.id, product.name, product.price, product.quantity]
      );
    }
  }
}

// Export pool for use in repositories
export { testPool };
```

## Key Takeaways

- Integration tests verify that components work together correctly as a system
- Test APIs using actual HTTP requests with supertest to validate the complete request/response cycle
- Use a dedicated test database and run real SQL queries to catch database-related issues
- Test transactions to ensure they properly commit on success and rollback on failure
- Clear database state between tests to prevent test interdependence
- For external services, use sandbox environments or test API keys when available
- Integration tests run slower than unit tests but catch different types of bugs
- Organize test setup and teardown code into reusable utilities
- Seed test data programmatically to create reproducible scenarios
- Run integration tests before merging code but less frequently than unit tests

## Common Mistakes

### Mistake 1: Sharing Database State Between Tests
**Problem:** Tests that don't clean up after themselves or rely on data from previous tests create interdependencies. Tests pass or fail based on execution order, making debugging extremely difficult.

**Solution:** Clear relevant tables in `beforeEach` hooks to ensure each test starts with a clean slate. Use database transactions that roll back after each test, or truncate tables before tests run.

### Mistake 2: Not Using a Dedicated Test Database
**Problem:** Running tests against a development or production database risks data corruption, makes tests non-deterministic, and can interfere with ongoing development work.

**Solution:** Create a separate test database with identical schema to production. Configure your test environment to use the test database exclusively. Never point tests at production databases.

### Mistake 3: Testing Too Much in Integration Tests
**Problem:** Using integration tests to verify logic that unit tests could cover makes test suites slow and difficult to maintain. Integration tests should focus on integration points, not business logic.

**Solution:** Test business logic with unit tests. Use integration tests to verify that components interact correctly—API routing, database queries, service communication. If a test doesn't involve multiple components, it should probably be a unit test.

### Mistake 4: Hardcoding Test Data
**Problem:** Hardcoded test data scattered across test files makes tests brittle and difficult to update. Changing schema or validation rules requires updating dozens of test files.

**Solution:** Create test data factories or fixtures that generate valid test objects. Centralize test data creation so schema changes only require updating one location. Use builders or factory functions for flexibility.

## Additional Resources

- Supertest documentation: https://github.com/visionmedia/supertest
- PostgreSQL testing guide: https://www.postgresql.org/docs/current/regress.html
- "Testing Node.js Applications" by Liz Parody
- Database testing patterns: https://martinfowler.com/articles/nonDeterminism.html
- Integration testing best practices: https://phauer.com/2019/modern-best-practices-testing-java/
