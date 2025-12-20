# Test Automation

Test automation uses software tools to execute tests automatically, comparing actual outcomes with expected results. Effective test automation accelerates testing cycles, improves consistency, and enables continuous delivery by providing rapid feedback on code quality.

## Why Automate Testing?

Manual testing has inherent limitations:
- **Time-consuming**: Running comprehensive test suites manually takes hours or days
- **Error-prone**: Humans make mistakes, miss steps, or test inconsistently
- **Expensive**: Requires significant human resources
- **Not repeatable**: Difficult to execute exactly the same way each time
- **Blocks CI/CD**: Cannot test every commit without automation

Automated testing solves these problems by executing tests quickly, consistently, and repeatedly without human intervention.

## The Test Automation Pyramid

The test automation pyramid guides how to distribute testing effort:

```
        /\
       /  \
      / UI \      Slow, Brittle, Expensive
     /------\
    /        \
   /Integration\ Medium Speed, Medium Cost
  /------------\
 /              \
/   Unit Tests   \  Fast, Stable, Cheap
/________________\
```

**Unit Tests (Base)**: 70% of tests
- Fast execution (milliseconds)
- Test individual functions/methods
- Easy to write and maintain
- Provide rapid feedback

**Integration Tests (Middle)**: 20% of tests
- Moderate speed (seconds)
- Test component interactions
- More realistic scenarios
- Moderate complexity

**UI/End-to-End Tests (Top)**: 10% of tests
- Slow execution (minutes)
- Test complete workflows
- Brittle and expensive
- Realistic user scenarios

## Automation Frameworks

### Python: pytest + pytest-cov

```python
# conftest.py - Shared fixtures
import pytest
from app import create_app, db
from app.models import User

@pytest.fixture(scope='session')
def app():
    """Create application for testing."""
    app = create_app('testing')
    return app

@pytest.fixture
def client(app):
    """Create test client."""
    return app.test_client()

@pytest.fixture
def database(app):
    """Create clean database for each test."""
    with app.app_context():
        db.create_all()
        yield db
        db.drop_all()

@pytest.fixture
def authenticated_user(client, database):
    """Create and login a test user."""
    user = User(
        email='test@example.com',
        username='testuser'
    )
    user.set_password('password')
    database.session.add(user)
    database.session.commit()

    # Login
    client.post('/auth/login', json={
        'email': 'test@example.com',
        'password': 'password'
    })

    return user

# test_api.py - API tests
def test_get_user_profile(client, authenticated_user):
    """Test retrieving user profile."""
    response = client.get(f'/api/users/{authenticated_user.id}')

    assert response.status_code == 200
    data = response.get_json()
    assert data['email'] == 'test@example.com'
    assert data['username'] == 'testuser'

def test_update_user_profile(client, authenticated_user):
    """Test updating user profile."""
    response = client.put(
        f'/api/users/{authenticated_user.id}',
        json={'username': 'newusername'}
    )

    assert response.status_code == 200
    data = response.get_json()
    assert data['username'] == 'newusername'

def test_unauthorized_access(client):
    """Test unauthenticated requests are rejected."""
    response = client.get('/api/users/1')
    assert response.status_code == 401

# pytest.ini - Configuration
[pytest]
testpaths = tests
python_files = test_*.py
python_classes = Test*
python_functions = test_*
addopts =
    --verbose
    --cov=app
    --cov-report=html
    --cov-report=term-missing
    --cov-fail-under=80
```

### JavaScript: Jest + Testing Library

```javascript
// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '\\.(css|less|scss)$': 'identity-obj-proxy',
    },
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/*.stories.{js,jsx,ts,tsx}',
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
};

// jest.setup.js
import '@testing-library/jest-dom';

// Mock fetch globally
global.fetch = jest.fn();

// test/components/UserProfile.test.jsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserProfile } from '@/components/UserProfile';

describe('UserProfile', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('displays user information', async () => {
        fetch.mockResolvedValueOnce({
            json: async () => ({
                name: 'Alice Smith',
                email: 'alice@example.com',
            }),
        });

        render(<UserProfile userId={1} />);

        await waitFor(() => {
            expect(screen.getByText('Alice Smith')).toBeInTheDocument();
            expect(screen.getByText('alice@example.com')).toBeInTheDocument();
        });
    });

    it('handles edit mode', async () => {
        const user = userEvent.setup();

        fetch.mockResolvedValueOnce({
            json: async () => ({
                name: 'Alice Smith',
                email: 'alice@example.com',
            }),
        });

        render(<UserProfile userId={1} />);

        // Wait for load
        await screen.findByText('Alice Smith');

        // Click edit button
        await user.click(screen.getByRole('button', { name: /edit/i }));

        // Edit name
        const nameInput = screen.getByLabelText(/name/i);
        await user.clear(nameInput);
        await user.type(nameInput, 'Alice Jones');

        // Save
        fetch.mockResolvedValueOnce({ ok: true });
        await user.click(screen.getByRole('button', { name: /save/i }));

        await waitFor(() => {
            expect(screen.getByText('Alice Jones')).toBeInTheDocument();
        });
    });

    it('displays error message on fetch failure', async () => {
        fetch.mockRejectedValueOnce(new Error('Network error'));

        render(<UserProfile userId={1} />);

        await waitFor(() => {
            expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
        });
    });
});
```

### Java: JUnit + Mockito + Spring Test

```java
// UserServiceTest.java
import org.junit.jupiter.api.*;
import org.mockito.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserServiceTest {

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private EmailService emailService;

    @Autowired
    private UserService userService;

    @Test
    @DisplayName("Should create new user successfully")
    void testCreateUser() {
        // Arrange
        User newUser = new User("alice@example.com", "Alice Smith");
        when(userRepository.save(any(User.class)))
            .thenReturn(newUser);

        // Act
        User created = userService.createUser(
            "alice@example.com",
            "Alice Smith"
        );

        // Assert
        assertNotNull(created);
        assertEquals("alice@example.com", created.getEmail());
        verify(userRepository).save(any(User.class));
        verify(emailService).sendWelcomeEmail(
            eq("alice@example.com"),
            anyString()
        );
    }

    @Test
    @DisplayName("Should throw exception for duplicate email")
    void testDuplicateEmail() {
        // Arrange
        when(userRepository.existsByEmail("existing@example.com"))
            .thenReturn(true);

        // Act & Assert
        assertThrows(
            DuplicateEmailException.class,
            () -> userService.createUser(
                "existing@example.com",
                "Duplicate User"
            )
        );

        verify(userRepository, never()).save(any(User.class));
        verify(emailService, never()).sendWelcomeEmail(
            anyString(),
            anyString()
        );
    }
}

// Integration test with test containers
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@SpringBootTest
@Testcontainers
class UserRepositoryIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres =
        new PostgreSQLContainer<>("postgres:13");

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        userRepository.deleteAll();
    }

    @Test
    void testSaveAndRetrieveUser() {
        User user = new User("alice@example.com", "Alice Smith");
        User saved = userRepository.save(user);

        Optional<User> retrieved = userRepository.findById(saved.getId());

        assertTrue(retrieved.isPresent());
        assertEquals("alice@example.com", retrieved.get().getEmail());
    }

    @Test
    void testFindByEmail() {
        User user = new User("alice@example.com", "Alice Smith");
        userRepository.save(user);

        Optional<User> found =
            userRepository.findByEmail("alice@example.com");

        assertTrue(found.isPresent());
        assertEquals("Alice Smith", found.get().getName());
    }
}
```

## UI Test Automation

### Selenium WebDriver

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pytest

class TestWebApplication:
    @pytest.fixture
    def driver(self):
        """Setup Chrome driver."""
        options = webdriver.ChromeOptions()
        options.add_argument('--headless')  # Run without GUI
        options.add_argument('--no-sandbox')
        driver = webdriver.Chrome(options=options)
        driver.implicitly_wait(10)
        yield driver
        driver.quit()

    def test_user_login(self, driver):
        """Test user can login successfully."""
        driver.get("http://localhost:3000/login")

        # Enter credentials
        email_input = driver.find_element(By.ID, "email")
        password_input = driver.find_element(By.ID, "password")

        email_input.send_keys("test@example.com")
        password_input.send_keys("password123")

        # Submit form
        submit_btn = driver.find_element(
            By.CSS_SELECTOR,
            "button[type='submit']"
        )
        submit_btn.click()

        # Wait for redirect to dashboard
        WebDriverWait(driver, 10).until(
            EC.url_contains("/dashboard")
        )

        # Verify login success
        welcome_msg = driver.find_element(By.CLASS_NAME, "welcome-message")
        assert "Welcome" in welcome_msg.text

    def test_form_validation(self, driver):
        """Test form shows validation errors."""
        driver.get("http://localhost:3000/register")

        # Submit empty form
        submit_btn = driver.find_element(
            By.CSS_SELECTOR,
            "button[type='submit']"
        )
        submit_btn.click()

        # Check validation errors appear
        errors = driver.find_elements(By.CLASS_NAME, "error-message")
        assert len(errors) > 0

        error_texts = [e.text for e in errors]
        assert any("email" in text.lower() for text in error_texts)
        assert any("password" in text.lower() for text in error_texts)
```

### Playwright (Modern Alternative)

```javascript
// playwright.config.js
module.exports = {
    testDir: './tests',
    timeout: 30000,
    retries: 2,
    use: {
        baseURL: 'http://localhost:3000',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },
    projects: [
        { name: 'Chrome', use: { browserName: 'chromium' } },
        { name: 'Firefox', use: { browserName: 'firefox' } },
        { name: 'Safari', use: { browserName: 'webkit' } },
    ],
};

// tests/login.spec.js
const { test, expect } = require('@playwright/test');

test.describe('User Authentication', () => {
    test('user can login successfully', async ({ page }) => {
        await page.goto('/login');

        // Fill login form
        await page.fill('#email', 'test@example.com');
        await page.fill('#password', 'password123');
        await page.click('button[type="submit"]');

        // Wait for navigation
        await page.waitForURL('**/dashboard');

        // Verify successful login
        const welcomeMsg = await page.textContent('.welcome-message');
        expect(welcomeMsg).toContain('Welcome');
    });

    test('shows error for invalid credentials', async ({ page }) => {
        await page.goto('/login');

        await page.fill('#email', 'invalid@example.com');
        await page.fill('#password', 'wrongpassword');
        await page.click('button[type="submit"]');

        // Check error message
        const error = await page.textContent('.error-message');
        expect(error).toContain('Invalid credentials');
    });

    test('redirects to login when accessing protected page', async ({ page }) => {
        await page.goto('/dashboard');

        // Should redirect to login
        await page.waitForURL('**/login');
        expect(page.url()).toContain('/login');
    });
});
```

## API Test Automation

### REST API Testing

```python
import requests
import pytest

class TestUserAPI:
    BASE_URL = "http://api.example.com"

    @pytest.fixture
    def api_client(self):
        """Setup API client with authentication."""
        session = requests.Session()
        # Login and get token
        response = session.post(
            f"{self.BASE_URL}/auth/login",
            json={
                "email": "admin@example.com",
                "password": "admin123"
            }
        )
        token = response.json()["token"]
        session.headers.update({"Authorization": f"Bearer {token}"})
        return session

    def test_create_user(self, api_client):
        """Test creating a new user via API."""
        payload = {
            "name": "Alice Smith",
            "email": "alice@example.com",
            "role": "user"
        }

        response = api_client.post(
            f"{self.BASE_URL}/api/users",
            json=payload
        )

        assert response.status_code == 201
        data = response.json()
        assert data["name"] == "Alice Smith"
        assert data["email"] == "alice@example.com"
        assert "id" in data

    def test_get_user(self, api_client):
        """Test retrieving user details."""
        # Create user first
        create_response = api_client.post(
            f"{self.BASE_URL}/api/users",
            json={"name": "Bob", "email": "bob@example.com"}
        )
        user_id = create_response.json()["id"]

        # Get user
        response = api_client.get(
            f"{self.BASE_URL}/api/users/{user_id}"
        )

        assert response.status_code == 200
        data = response.json()
        assert data["id"] == user_id
        assert data["email"] == "bob@example.com"

    def test_update_user(self, api_client):
        """Test updating user information."""
        # Create user
        create_response = api_client.post(
            f"{self.BASE_URL}/api/users",
            json={"name": "Charlie", "email": "charlie@example.com"}
        )
        user_id = create_response.json()["id"]

        # Update user
        response = api_client.put(
            f"{self.BASE_URL}/api/users/{user_id}",
            json={"name": "Charlie Updated"}
        )

        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "Charlie Updated"

    @pytest.mark.parametrize("invalid_email", [
        "notanemail",
        "@example.com",
        "missing.com",
        ""
    ])
    def test_invalid_email_rejected(self, api_client, invalid_email):
        """Test API rejects invalid email formats."""
        response = api_client.post(
            f"{self.BASE_URL}/api/users",
            json={
                "name": "Test User",
                "email": invalid_email
            }
        )

        assert response.status_code == 400
        assert "email" in response.json()["errors"]
```

## Continuous Integration Integration

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  unit-tests:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        python-version: [3.8, 3.9, '3.10', 3.11]

    steps:
    - uses: actions/checkout@v3

    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: ${{ matrix.python-version }}

    - name: Cache dependencies
      uses: actions/cache@v3
      with:
        path: ~/.cache/pip
        key: ${{ runner.os }}-pip-${{ hashFiles('**/requirements.txt') }}

    - name: Install dependencies
      run: |
        pip install -r requirements.txt
        pip install -r requirements-dev.txt

    - name: Run unit tests
      run: |
        pytest tests/unit \
          --cov=src \
          --cov-report=xml \
          --cov-report=term

    - name: Upload coverage
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage.xml

  integration-tests:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:13
        env:
          POSTGRES_PASSWORD: postgres
          POSTGRES_DB: testdb
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 5432:5432

      redis:
        image: redis:6
        options: >-
          --health-cmd "redis-cli ping"
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 6379:6379

    steps:
    - uses: actions/checkout@v3

    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.10'

    - name: Install dependencies
      run: |
        pip install -r requirements.txt
        pip install -r requirements-dev.txt

    - name: Run integration tests
      env:
        DATABASE_URL: postgresql://postgres:postgres@localhost:5432/testdb
        REDIS_URL: redis://localhost:6379
      run: |
        pytest tests/integration -v

  e2e-tests:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'

    - name: Install dependencies
      run: npm ci

    - name: Install Playwright
      run: npx playwright install --with-deps

    - name: Start application
      run: |
        npm run build
        npm start &
        npx wait-on http://localhost:3000

    - name: Run E2E tests
      run: npx playwright test

    - name: Upload test results
      if: failure()
      uses: actions/upload-artifact@v3
      with:
        name: playwright-results
        path: test-results/
```

## Test Automation Best Practices

### Page Object Model (POM)

```python
# pages/base_page.py
class BasePage:
    def __init__(self, driver):
        self.driver = driver

    def find_element(self, by, value):
        return self.driver.find_element(by, value)

    def click(self, by, value):
        self.find_element(by, value).click()

    def type(self, by, value, text):
        element = self.find_element(by, value)
        element.clear()
        element.send_keys(text)

# pages/login_page.py
from selenium.webdriver.common.by import By
from pages.base_page import BasePage

class LoginPage(BasePage):
    EMAIL_INPUT = (By.ID, "email")
    PASSWORD_INPUT = (By.ID, "password")
    SUBMIT_BUTTON = (By.CSS_SELECTOR, "button[type='submit']")
    ERROR_MESSAGE = (By.CLASS_NAME, "error-message")

    def login(self, email, password):
        self.type(*self.EMAIL_INPUT, email)
        self.type(*self.PASSWORD_INPUT, password)
        self.click(*self.SUBMIT_BUTTON)

    def get_error_message(self):
        return self.find_element(*self.ERROR_MESSAGE).text

# tests/test_login.py
def test_successful_login(driver):
    login_page = LoginPage(driver)
    login_page.login("test@example.com", "password123")

    dashboard = DashboardPage(driver)
    assert dashboard.is_loaded()

def test_invalid_credentials(driver):
    login_page = LoginPage(driver)
    login_page.login("invalid@example.com", "wrong")

    error = login_page.get_error_message()
    assert "Invalid credentials" in error
```

### Data-Driven Testing

```python
import pytest
import csv

def load_test_data():
    """Load test data from CSV file."""
    with open('testdata/users.csv', 'r') as f:
        reader = csv.DictReader(f)
        return list(reader)

@pytest.mark.parametrize("user_data", load_test_data())
def test_user_creation(api_client, user_data):
    """Test user creation with various inputs."""
    response = api_client.post('/api/users', json=user_data)

    if user_data['should_succeed'] == 'true':
        assert response.status_code == 201
    else:
        assert response.status_code == 400
```

## Summary

Test automation is essential for modern software development, enabling rapid feedback, consistent quality, and continuous delivery. By following the test automation pyramid, using appropriate frameworks, and integrating tests into CI/CD pipelines, teams can build robust automated test suites. The Page Object Model and data-driven testing improve maintainability, while proper CI integration ensures tests run automatically on every change. Effective test automation balances coverage with speed and maintainability, focusing automation efforts where they provide the most value.
