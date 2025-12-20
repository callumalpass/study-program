# System Testing

System testing validates complete, integrated software systems against specified requirements. Unlike unit and integration testing that focus on individual components and their interactions, system testing evaluates the entire application in an environment that closely mirrors production.

## What is System Testing?

System testing is a high-level testing phase that verifies the fully integrated application meets both functional and non-functional requirements. It treats the software as a black box, testing it from an end-user perspective without knowledge of internal implementation details.

### System Testing vs. Integration Testing

| Aspect | Integration Testing | System Testing |
|--------|-------------------|----------------|
| **Scope** | Component interactions | Complete system |
| **Focus** | Interfaces between modules | End-to-end functionality |
| **Knowledge** | May use white-box approaches | Black-box testing |
| **Environment** | Often in development | Production-like environment |
| **Performed by** | Developers | QA team or testers |

## Types of System Testing

### Functional System Testing

Verifies the system performs its intended functions correctly.

```python
# E-commerce system functional test
class TestEcommerceSystem:
    def test_complete_purchase_flow(self):
        """Test end-to-end purchase workflow."""
        # 1. User registration
        user = self.register_user(
            email="customer@example.com",
            password="SecurePass123!"
        )
        assert user.is_registered()

        # 2. Login
        session = self.login(user.email, "SecurePass123!")
        assert session.is_authenticated()

        # 3. Browse catalog
        products = self.search_products("laptop")
        assert len(products) > 0

        # 4. Add to cart
        self.add_to_cart(session, products[0].id, quantity=1)
        cart = self.get_cart(session)
        assert cart.item_count == 1

        # 5. Apply discount
        self.apply_coupon(session, "WELCOME10")
        cart = self.get_cart(session)
        assert cart.discount_applied

        # 6. Checkout
        order = self.checkout(
            session,
            payment_method="credit_card",
            card_number="4111111111111111",
            shipping_address=self.get_test_address()
        )
        assert order.status == "CONFIRMED"

        # 7. Verify order details
        order_details = self.get_order(session, order.id)
        assert order_details.total > 0
        assert len(order_details.items) == 1

        # 8. Verify email notification
        emails = self.get_test_emails(user.email)
        assert any("Order Confirmation" in e.subject for e in emails)

    def test_wishlist_functionality(self):
        """Test wishlist feature."""
        session = self.login_test_user()

        # Add items to wishlist
        self.add_to_wishlist(session, product_id=123)
        self.add_to_wishlist(session, product_id=456)

        # Verify wishlist
        wishlist = self.get_wishlist(session)
        assert len(wishlist.items) == 2

        # Move from wishlist to cart
        self.move_to_cart(session, wishlist_item_id=123)

        cart = self.get_cart(session)
        wishlist = self.get_wishlist(session)
        assert cart.item_count == 1
        assert len(wishlist.items) == 1
```

### Performance Testing

Evaluates system behavior under various load conditions.

```python
from locust import HttpUser, task, between
import time

class PerformanceTest(HttpUser):
    wait_time = between(1, 3)

    def on_start(self):
        """Login before starting tests."""
        response = self.client.post("/login", json={
            "email": "test@example.com",
            "password": "password"
        })
        self.token = response.json()["token"]

    @task(3)  # 3x weight - common operation
    def view_product_list(self):
        """Test product listing performance."""
        with self.client.get(
            "/api/products",
            headers={"Authorization": f"Bearer {self.token}"},
            catch_response=True
        ) as response:
            if response.elapsed.total_seconds() > 1.0:
                response.failure(
                    f"Request took {response.elapsed.total_seconds()}s"
                )
            elif response.status_code != 200:
                response.failure(f"Got status {response.status_code}")
            else:
                response.success()

    @task(1)
    def search_products(self):
        """Test search performance."""
        start_time = time.time()
        response = self.client.get(
            "/api/search?q=laptop",
            headers={"Authorization": f"Bearer {self.token}"}
        )
        duration = time.time() - start_time

        assert response.status_code == 200
        assert duration < 2.0, f"Search took {duration}s, expected < 2s"

    @task(2)
    def add_to_cart(self):
        """Test cart operations performance."""
        response = self.client.post(
            "/api/cart/items",
            json={"product_id": 123, "quantity": 1},
            headers={"Authorization": f"Bearer {self.token}"}
        )
        assert response.status_code == 200

# Stress test configuration
class StressTest:
    def test_concurrent_checkouts(self):
        """Test system under heavy concurrent load."""
        import concurrent.futures

        def checkout_operation(user_id):
            session = create_session(user_id)
            try:
                order = checkout(session, test_cart, test_payment)
                return order.status == "CONFIRMED"
            except Exception as e:
                return False

        # Simulate 100 concurrent checkouts
        with concurrent.futures.ThreadPoolExecutor(max_workers=100) as executor:
            futures = [
                executor.submit(checkout_operation, i)
                for i in range(100)
            ]
            results = [f.result() for f in futures]

        # Verify success rate
        success_rate = sum(results) / len(results)
        assert success_rate > 0.95, f"Only {success_rate*100}% succeeded"
```

### Security Testing

Identifies vulnerabilities and security weaknesses.

```python
class TestSystemSecurity:
    def test_sql_injection_prevention(self):
        """Verify protection against SQL injection."""
        # Attempt SQL injection in search
        malicious_input = "'; DROP TABLE users; --"

        response = requests.get(
            f"{BASE_URL}/search",
            params={"q": malicious_input}
        )

        # Should not execute SQL injection
        assert response.status_code in [200, 400]

        # Verify database still intact
        users = db.query("SELECT COUNT(*) FROM users").scalar()
        assert users > 0  # Table still exists

    def test_xss_prevention(self):
        """Verify protection against XSS attacks."""
        malicious_script = "<script>alert('XSS')</script>"

        # Attempt to inject script via comment
        response = requests.post(
            f"{BASE_URL}/products/123/reviews",
            json={
                "rating": 5,
                "comment": malicious_script
            },
            headers=auth_headers
        )

        # Retrieve review
        reviews = requests.get(
            f"{BASE_URL}/products/123/reviews"
        ).json()

        # Verify script is escaped in output
        assert "<script>" not in reviews[0]["comment"]
        assert "&lt;script&gt;" in reviews[0]["comment"]

    def test_authentication_required(self):
        """Verify protected endpoints require authentication."""
        protected_endpoints = [
            "/api/profile",
            "/api/orders",
            "/api/cart"
        ]

        for endpoint in protected_endpoints:
            response = requests.get(f"{BASE_URL}{endpoint}")
            assert response.status_code == 401, \
                f"{endpoint} should require authentication"

    def test_authorization_enforcement(self):
        """Verify users can only access their own data."""
        user1_token = login("user1@example.com", "password")
        user2_token = login("user2@example.com", "password")

        # Create order as user1
        order = create_order(user1_token)

        # Attempt to access user1's order as user2
        response = requests.get(
            f"{BASE_URL}/api/orders/{order.id}",
            headers={"Authorization": f"Bearer {user2_token}"}
        )

        assert response.status_code == 403  # Forbidden

    def test_password_requirements(self):
        """Verify strong password policy enforcement."""
        weak_passwords = [
            "123456",
            "password",
            "abc",
            "11111111"
        ]

        for weak_pwd in weak_passwords:
            response = requests.post(
                f"{BASE_URL}/register",
                json={
                    "email": "test@example.com",
                    "password": weak_pwd
                }
            )
            assert response.status_code == 400
            assert "password" in response.json()["errors"]
```

### Usability Testing

Evaluates user experience and interface design.

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class TestUsability:
    def setup_method(self):
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(10)

    def teardown_method(self):
        self.driver.quit()

    def test_navigation_intuitive(self):
        """Test navigation is clear and intuitive."""
        self.driver.get(BASE_URL)

        # Main navigation should be visible
        nav = self.driver.find_element(By.CSS_SELECTOR, "nav.main-nav")
        assert nav.is_displayed()

        # Important links should be accessible
        assert self.find_link_by_text("Products")
        assert self.find_link_by_text("Cart")
        assert self.find_link_by_text("Account")

    def test_form_validation_feedback(self):
        """Test forms provide helpful validation messages."""
        self.driver.get(f"{BASE_URL}/register")

        # Submit empty form
        submit_btn = self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        submit_btn.click()

        # Validation messages should appear
        errors = self.driver.find_elements(By.CSS_SELECTOR, ".error-message")
        assert len(errors) > 0

        # Messages should be specific
        error_texts = [e.text for e in errors]
        assert any("email" in text.lower() for text in error_texts)
        assert any("password" in text.lower() for text in error_texts)

    def test_responsive_design(self):
        """Test layout adapts to different screen sizes."""
        viewports = [
            (1920, 1080),  # Desktop
            (768, 1024),   # Tablet
            (375, 667)     # Mobile
        ]

        for width, height in viewports:
            self.driver.set_window_size(width, height)
            self.driver.get(BASE_URL)

            # Navigation should be accessible
            nav = self.driver.find_element(By.CSS_SELECTOR, "nav")
            assert nav.is_displayed()

            # Content should not overflow
            body = self.driver.find_element(By.TAG_NAME, "body")
            assert body.size['width'] <= width

    def test_loading_indicators(self):
        """Test loading states are communicated to users."""
        self.driver.get(BASE_URL)

        # Click button that triggers async operation
        search_btn = self.driver.find_element(By.ID, "search-button")
        search_btn.click()

        # Loading indicator should appear
        WebDriverWait(self.driver, 2).until(
            EC.presence_of_element_located((By.CLASS_NAME, "loading"))
        )

        # Then disappear when complete
        WebDriverWait(self.driver, 10).until(
            EC.invisibility_of_element_located((By.CLASS_NAME, "loading"))
        )
```

### Compatibility Testing

Verifies system works across different environments.

```python
import pytest
from selenium import webdriver

class TestCompatibility:
    @pytest.mark.parametrize("browser", ["chrome", "firefox", "safari"])
    def test_browser_compatibility(self, browser):
        """Test application works in different browsers."""
        driver = self.get_driver(browser)

        try:
            driver.get(BASE_URL)

            # Core functionality should work
            assert "E-commerce" in driver.title

            # Login should work
            self.login(driver, "test@example.com", "password")
            assert self.is_logged_in(driver)

        finally:
            driver.quit()

    def test_database_compatibility(self):
        """Test with different database engines."""
        databases = ["postgresql", "mysql", "sqlite"]

        for db_type in databases:
            with self.setup_database(db_type) as db:
                # Run critical operations
                user = create_user(db, "alice", "alice@example.com")
                assert user.id is not None

                retrieved = get_user(db, user.id)
                assert retrieved.email == "alice@example.com"

    @pytest.mark.parametrize("os", ["linux", "windows", "macos"])
    def test_os_compatibility(self, os):
        """Test deployment on different operating systems."""
        # This would typically run in CI/CD on different OS agents
        result = deploy_application(target_os=os)
        assert result.success

        health_check = requests.get(f"{result.url}/health")
        assert health_check.status_code == 200
```

## End-to-End Testing

Complete user workflows from start to finish.

```python
class TestE2EUserJourneys:
    def test_new_customer_first_purchase(self):
        """Test complete journey of new customer making first purchase."""
        # 1. Land on homepage
        self.visit_homepage()
        assert self.see_hero_banner()

        # 2. Search for product
        self.search("wireless headphones")
        assert self.see_search_results()

        # 3. View product details
        product = self.select_first_product()
        assert self.see_product_details(product)

        # 4. Add to cart
        self.click_add_to_cart()
        assert self.see_cart_notification()

        # 5. View cart
        self.go_to_cart()
        assert self.cart_contains(product)

        # 6. Proceed to checkout
        self.click_checkout()

        # 7. Create account (required for checkout)
        self.register_new_account(
            email="newcustomer@example.com",
            password="SecurePass123!"
        )

        # 8. Enter shipping information
        self.enter_shipping_address({
            "name": "John Doe",
            "address": "123 Main St",
            "city": "Springfield",
            "zip": "12345"
        })

        # 9. Enter payment information
        self.enter_payment_details({
            "card_number": "4111111111111111",
            "expiry": "12/25",
            "cvv": "123"
        })

        # 10. Review and place order
        self.review_order()
        order = self.place_order()

        # 11. Verify order confirmation
        assert order.status == "CONFIRMED"
        assert self.see_order_confirmation_page()

        # 12. Verify confirmation email
        email = self.get_latest_email("newcustomer@example.com")
        assert "Order Confirmation" in email.subject
        assert str(order.id) in email.body

    def test_returning_customer_reorder(self):
        """Test returning customer reordering previous purchase."""
        # Login as existing customer
        self.login("returning@example.com", "password")

        # View order history
        self.go_to_order_history()
        past_orders = self.get_past_orders()
        assert len(past_orders) > 0

        # Reorder previous purchase
        self.reorder(past_orders[0].id)

        # Cart should be populated with previous items
        cart = self.get_cart()
        assert cart.item_count > 0

        # Quick checkout (saved payment/shipping)
        order = self.quick_checkout()

        assert order.status == "CONFIRMED"
```

## System Testing Best Practices

### Test in Production-Like Environment

```python
# Configuration for production-like test environment
TEST_CONFIG = {
    'database': 'postgresql://testdb:5432/ecommerce',
    'cache': 'redis://testredis:6379',
    'message_queue': 'rabbitmq://testmq:5672',
    'environment': 'staging',  # Mirrors production
    'load_balancer': True,
    'cdn': True,
    'ssl': True
}
```

### Use Realistic Test Data

```python
from faker import Faker

fake = Faker()

def generate_realistic_user():
    """Generate realistic test user data."""
    return {
        'name': fake.name(),
        'email': fake.email(),
        'phone': fake.phone_number(),
        'address': {
            'street': fake.street_address(),
            'city': fake.city(),
            'state': fake.state(),
            'zip': fake.postcode()
        },
        'credit_card': {
            'number': fake.credit_card_number(),
            'expiry': fake.credit_card_expire(),
            'cvv': fake.credit_card_security_code()
        }
    }

def test_with_realistic_data():
    """Test with realistic, varied data."""
    # Generate 100 realistic users
    users = [generate_realistic_user() for _ in range(100)]

    for user_data in users:
        user = register_user(user_data)
        assert user.is_active
```

### Monitor System Resources

```python
import psutil
import pytest

class TestSystemResources:
    def test_memory_usage_under_load(self):
        """Verify system doesn't leak memory under load."""
        initial_memory = psutil.Process().memory_info().rss

        # Simulate load
        for i in range(1000):
            process_request(generate_test_request())

        final_memory = psutil.Process().memory_info().rss
        memory_increase = final_memory - initial_memory

        # Memory increase should be reasonable
        assert memory_increase < 100 * 1024 * 1024  # < 100MB

    def test_cpu_usage_remains_reasonable(self):
        """Verify CPU usage stays within limits."""
        cpu_samples = []

        for i in range(10):
            handle_concurrent_requests(100)
            cpu_percent = psutil.cpu_percent(interval=1)
            cpu_samples.append(cpu_percent)

        avg_cpu = sum(cpu_samples) / len(cpu_samples)
        assert avg_cpu < 80  # Average CPU < 80%
```

## Summary

System testing validates the complete, integrated application against requirements in production-like environments. By testing functional correctness, performance, security, usability, and compatibility, system testing provides confidence that the software is ready for release. End-to-end tests simulate real user workflows, ensuring the system delivers value to actual users. Effective system testing combines automated and manual testing techniques to thoroughly evaluate software quality before deployment.
