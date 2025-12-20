# Unit Testing

## Introduction

Unit tests form the foundation of any comprehensive testing strategy. They verify that individual functions, methods, and components work correctly in isolation, independent of external dependencies like databases, APIs, or file systems. Because unit tests are fast, focused, and deterministic, they provide immediate feedback during development and catch bugs at the earliest possible stage when they're cheapest to fix.

For capstone projects, unit testing offers the highest return on investment. A well-tested utility function, business logic module, or algorithm gives you confidence to refactor fearlessly, prevents regressions when adding features, and documents expected behavior for future developers. Jest, the most popular JavaScript testing framework, combined with modern practices like mocking and test organization, makes writing effective unit tests straightforward and even enjoyable.

## Jest Fundamentals

Jest is a comprehensive testing framework created by Facebook that requires minimal configuration and includes everything needed for unit testing: a test runner, assertion library, mocking capabilities, and coverage reporting. To add Jest to your project, install it as a development dependency and add a test script to your package.json.

```typescript
// Installation
npm install --save-dev jest @types/jest ts-jest

// package.json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

The basic structure of a Jest test uses `describe` blocks to group related tests and `test` (or `it`) blocks to define individual test cases. Each test follows the Arrange-Act-Assert pattern: set up test data, execute the code being tested, and verify the results.

```typescript
// math.ts - function to test
export function add(a: number, b: number): number {
  return a + b;
}

export function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

// math.test.ts - unit tests
describe('Math utilities', () => {
  describe('add', () => {
    test('adds two positive numbers', () => {
      // Arrange
      const a = 5;
      const b = 3;

      // Act
      const result = add(a, b);

      // Assert
      expect(result).toBe(8);
    });

    test('adds negative numbers', () => {
      expect(add(-5, -3)).toBe(-8);
    });

    test('adds positive and negative numbers', () => {
      expect(add(5, -3)).toBe(2);
    });
  });

  describe('divide', () => {
    test('divides two numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    test('throws error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
    });
  });
});
```

## Testing Business Logic

Business logic represents the core value of your application—the algorithms and rules that differentiate your product. This code deserves thorough testing with multiple scenarios covering normal cases, edge cases, and error conditions. Well-tested business logic allows you to refactor implementation details confidently.

```typescript
// discount.ts
export interface DiscountRule {
  code: string;
  percentOff: number;
  minimumPurchase: number;
  expiryDate: Date;
}

export class DiscountCalculator {
  constructor(private rules: DiscountRule[]) {}

  calculateFinalPrice(
    originalPrice: number,
    code: string,
    currentDate: Date = new Date()
  ): number {
    const rule = this.rules.find(r => r.code === code);

    if (!rule) {
      return originalPrice;
    }

    if (currentDate > rule.expiryDate) {
      throw new Error('Discount code has expired');
    }

    if (originalPrice < rule.minimumPurchase) {
      return originalPrice;
    }

    const discount = originalPrice * (rule.percentOff / 100);
    return originalPrice - discount;
  }
}

// discount.test.ts
describe('DiscountCalculator', () => {
  const validRule: DiscountRule = {
    code: 'SAVE20',
    percentOff: 20,
    minimumPurchase: 50,
    expiryDate: new Date('2025-12-31')
  };

  const expiredRule: DiscountRule = {
    code: 'EXPIRED',
    percentOff: 10,
    minimumPurchase: 0,
    expiryDate: new Date('2020-01-01')
  };

  let calculator: DiscountCalculator;

  beforeEach(() => {
    calculator = new DiscountCalculator([validRule, expiredRule]);
  });

  test('applies discount when conditions are met', () => {
    const finalPrice = calculator.calculateFinalPrice(
      100,
      'SAVE20',
      new Date('2025-06-01')
    );
    expect(finalPrice).toBe(80);
  });

  test('does not apply discount below minimum purchase', () => {
    const finalPrice = calculator.calculateFinalPrice(
      30,
      'SAVE20',
      new Date('2025-06-01')
    );
    expect(finalPrice).toBe(30);
  });

  test('returns original price for invalid code', () => {
    const finalPrice = calculator.calculateFinalPrice(
      100,
      'INVALID',
      new Date('2025-06-01')
    );
    expect(finalPrice).toBe(100);
  });

  test('throws error for expired discount code', () => {
    expect(() =>
      calculator.calculateFinalPrice(100, 'EXPIRED', new Date('2025-06-01'))
    ).toThrow('Discount code has expired');
  });

  test('applies discount exactly at minimum purchase', () => {
    const finalPrice = calculator.calculateFinalPrice(
      50,
      'SAVE20',
      new Date('2025-06-01')
    );
    expect(finalPrice).toBe(40);
  });
});
```

## Mocking Dependencies

Unit tests should run in isolation without relying on external systems. Mocking replaces real dependencies with controlled substitutes, allowing you to test code paths independently and simulate scenarios that would be difficult to create with real dependencies.

Jest provides powerful mocking capabilities through `jest.fn()` for creating mock functions, `jest.mock()` for mocking entire modules, and `jest.spyOn()` for spying on existing methods while preserving their implementation.

```typescript
// user-service.ts
import { UserRepository } from './user-repository';
import { EmailService } from './email-service';

export class UserService {
  constructor(
    private userRepo: UserRepository,
    private emailService: EmailService
  ) {}

  async registerUser(email: string, password: string): Promise<void> {
    const existingUser = await this.userRepo.findByEmail(email);

    if (existingUser) {
      throw new Error('Email already registered');
    }

    const user = await this.userRepo.create({ email, password });
    await this.emailService.sendWelcomeEmail(user.email);
  }
}

// user-service.test.ts
import { UserService } from './user-service';
import { UserRepository } from './user-repository';
import { EmailService } from './email-service';

// Mock the module dependencies
jest.mock('./user-repository');
jest.mock('./email-service');

describe('UserService', () => {
  let userService: UserService;
  let mockUserRepo: jest.Mocked<UserRepository>;
  let mockEmailService: jest.Mocked<EmailService>;

  beforeEach(() => {
    // Create fresh mocks before each test
    mockUserRepo = new UserRepository() as jest.Mocked<UserRepository>;
    mockEmailService = new EmailService() as jest.Mocked<EmailService>;
    userService = new UserService(mockUserRepo, mockEmailService);

    // Reset mock state
    jest.clearAllMocks();
  });

  test('successfully registers new user', async () => {
    // Arrange
    mockUserRepo.findByEmail.mockResolvedValue(null);
    mockUserRepo.create.mockResolvedValue({
      id: '123',
      email: 'test@example.com',
      password: 'hashed_password'
    });

    // Act
    await userService.registerUser('test@example.com', 'password123');

    // Assert
    expect(mockUserRepo.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(mockUserRepo.create).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(mockEmailService.sendWelcomeEmail).toHaveBeenCalledWith(
      'test@example.com'
    );
  });

  test('throws error when email already exists', async () => {
    // Arrange
    mockUserRepo.findByEmail.mockResolvedValue({
      id: '456',
      email: 'test@example.com',
      password: 'existing_password'
    });

    // Act & Assert
    await expect(
      userService.registerUser('test@example.com', 'password123')
    ).rejects.toThrow('Email already registered');

    expect(mockUserRepo.create).not.toHaveBeenCalled();
    expect(mockEmailService.sendWelcomeEmail).not.toHaveBeenCalled();
  });

  test('does not send email if user creation fails', async () => {
    // Arrange
    mockUserRepo.findByEmail.mockResolvedValue(null);
    mockUserRepo.create.mockRejectedValue(new Error('Database error'));

    // Act & Assert
    await expect(
      userService.registerUser('test@example.com', 'password123')
    ).rejects.toThrow('Database error');

    expect(mockEmailService.sendWelcomeEmail).not.toHaveBeenCalled();
  });
});
```

## Testing Asynchronous Code

Modern JavaScript applications heavily use promises and async/await for asynchronous operations. Jest fully supports testing async code—simply return a promise from your test or use async/await syntax. Jest will wait for the promise to resolve before completing the test.

```typescript
// api-client.ts
export async function fetchUserData(userId: string): Promise<User> {
  const response = await fetch(`/api/users/${userId}`);

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

// api-client.test.ts
describe('fetchUserData', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = jest.fn();
  });

  test('fetches user data successfully', async () => {
    const mockUser = { id: '123', name: 'John Doe' };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockUser
    });

    const result = await fetchUserData('123');

    expect(result).toEqual(mockUser);
    expect(global.fetch).toHaveBeenCalledWith('/api/users/123');
  });

  test('throws error for failed requests', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });

    await expect(fetchUserData('999')).rejects.toThrow('HTTP 404: Not Found');
  });
});
```

## Test Organization and Best Practices

Well-organized tests are easier to maintain and understand. Group related tests using nested `describe` blocks, use descriptive test names that explain the scenario being tested, and follow consistent naming conventions. Test file names should mirror the source file they test with a `.test.ts` or `.spec.ts` suffix.

Use `beforeEach` and `afterEach` hooks to set up common test data and clean up after tests. This keeps tests DRY (Don't Repeat Yourself) while ensuring each test starts with a clean slate. Use `beforeAll` and `afterAll` sparingly—only for expensive setup that can be safely shared across tests.

```typescript
describe('ShoppingCart', () => {
  let cart: ShoppingCart;

  beforeEach(() => {
    // Fresh cart for each test
    cart = new ShoppingCart();
  });

  describe('adding items', () => {
    test('adds item to empty cart', () => {
      cart.addItem({ id: '1', name: 'Widget', price: 10 });
      expect(cart.itemCount()).toBe(1);
    });

    test('increments quantity for duplicate items', () => {
      const item = { id: '1', name: 'Widget', price: 10 };
      cart.addItem(item);
      cart.addItem(item);
      expect(cart.itemCount()).toBe(1);
      expect(cart.getItem('1')?.quantity).toBe(2);
    });
  });

  describe('calculating total', () => {
    test('returns zero for empty cart', () => {
      expect(cart.total()).toBe(0);
    });

    test('sums item prices correctly', () => {
      cart.addItem({ id: '1', name: 'Widget', price: 10 });
      cart.addItem({ id: '2', name: 'Gadget', price: 15 });
      expect(cart.total()).toBe(25);
    });
  });
});
```

## Key Takeaways

- Unit tests verify individual functions and components in isolation from external dependencies
- Jest provides a complete testing solution with minimal configuration required
- Follow the Arrange-Act-Assert pattern for clear, readable tests
- Mock external dependencies to keep tests fast, deterministic, and focused
- Test business logic thoroughly with normal cases, edge cases, and error conditions
- Use descriptive test names that explain what scenario is being tested
- Organize related tests with nested describe blocks for better structure
- Use beforeEach to set up fresh test data and ensure test isolation
- Test asynchronous code using async/await and return promises from tests
- Prioritize testing code that contains complexity and business value

## Common Mistakes

### Mistake 1: Testing Implementation Details
**Problem:** Tests that verify private methods, internal state, or specific implementation approaches break whenever code is refactored. This makes tests fragile and discourages improving code structure.

**Solution:** Test public APIs and observable behavior only. If you feel compelled to test a private method, it might deserve to be its own public function with its own tests. Focus on what the code does, not how it does it.

### Mistake 2: Not Resetting Mocks Between Tests
**Problem:** Mock state carries over between tests, causing tests to pass or fail based on execution order. This creates flaky tests that are difficult to debug and erodes confidence in the test suite.

**Solution:** Use `jest.clearAllMocks()` in `beforeEach` to reset mock call history and return values. This ensures each test starts with a clean slate and tests remain independent.

### Mistake 3: Testing Too Much in One Test
**Problem:** Tests that verify multiple unrelated behaviors become difficult to understand and fail for multiple reasons. When they fail, it's unclear which specific behavior broke.

**Solution:** Each test should verify one specific behavior or scenario. If your test name includes "and", it's probably testing too much. Split into multiple focused tests that each verify a single aspect.

### Mistake 4: Unclear Test Names
**Problem:** Test names like "test1" or "it works" provide no information about what's being tested. When they fail, developers must read the test code to understand what broke.

**Solution:** Use descriptive names that form readable sentences: "calculates total price with discount applied" or "throws error when user email is invalid". Test names should explain the scenario and expected outcome.

## Additional Resources

- Jest documentation: https://jestjs.io/docs/getting-started
- Jest cheat sheet: https://github.com/sapegin/jest-cheat-sheet
- "The Art of Unit Testing" by Roy Osherove
- Kent C. Dodds blog on testing: https://kentcdodds.com/blog/
- Jest mock functions guide: https://jestjs.io/docs/mock-functions
