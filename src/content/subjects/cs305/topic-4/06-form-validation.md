# Form Validation

Form validation ensures that users provide correct and complete information before submitting data. Client-side validation improves user experience by providing immediate feedback, though server-side validation is always necessary for security.

## HTML5 Built-in Validation

HTML5 provides several attributes for basic validation without JavaScript.

### Required Attribute

```html
<form>
  <label>
    Name (required):
    <input type="text" name="name" required>
  </label>
  <button type="submit">Submit</button>
</form>
```

### Input Types with Validation

```html
<form>
  <!-- Email validation -->
  <input type="email" name="email" required>

  <!-- URL validation -->
  <input type="url" name="website">

  <!-- Number validation -->
  <input type="number" name="age" min="0" max="120">

  <!-- Date validation -->
  <input type="date" name="birthdate" min="1900-01-01" max="2024-12-31">

  <!-- Tel validation (pattern-based) -->
  <input type="tel" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
</form>
```

### Pattern Attribute

Use regular expressions for custom validation.

```html
<form>
  <!-- Username: 3-16 alphanumeric characters -->
  <input
    type="text"
    name="username"
    pattern="[a-zA-Z0-9]{3,16}"
    title="Username must be 3-16 alphanumeric characters">

  <!-- Postal code: 5 digits -->
  <input
    type="text"
    name="zip"
    pattern="[0-9]{5}"
    title="Enter a 5-digit ZIP code">

  <!-- Phone: (123) 456-7890 format -->
  <input
    type="tel"
    name="phone"
    pattern="\([0-9]{3}\) [0-9]{3}-[0-9]{4}"
    title="Format: (123) 456-7890">
</form>
```

### Min, Max, and Maxlength

```html
<form>
  <!-- Minimum and maximum values -->
  <input type="number" name="quantity" min="1" max="100">

  <!-- Minimum and maximum length -->
  <input type="text" name="username" minlength="3" maxlength="20">

  <!-- Textarea with character limit -->
  <textarea name="bio" maxlength="500"></textarea>
</form>
```

## The Constraint Validation API

JavaScript provides a powerful API for validating forms programmatically.

### Validity State

Every form control has a `validity` property that contains validation state information.

```javascript
const input = document.getElementById('email');

console.log(input.validity);
// ValidityState object with properties:
// - valueMissing: required field is empty
// - typeMismatch: value doesn't match type (e.g., invalid email)
// - patternMismatch: value doesn't match pattern
// - tooLong: value exceeds maxlength
// - tooShort: value is less than minlength
// - rangeUnderflow: value is less than min
// - rangeOverflow: value is greater than max
// - stepMismatch: value doesn't match step
// - badInput: browser can't convert input
// - customError: custom error set via setCustomValidity()
// - valid: all validation constraints are met
```

```html
<form id="myForm">
  <label>
    Email:
    <input type="email" id="email" name="email" required>
  </label>
  <span id="emailError"></span>
  <button type="submit">Submit</button>
</form>

<script>
  const email = document.getElementById('email');
  const emailError = document.getElementById('emailError');

  email.addEventListener('input', () => {
    if (email.validity.valueMissing) {
      emailError.textContent = 'Email is required';
    } else if (email.validity.typeMismatch) {
      emailError.textContent = 'Please enter a valid email address';
    } else {
      emailError.textContent = '';
    }
  });
</script>
```

### Validation Methods

#### checkValidity()

Returns true if the element passes validation, false otherwise.

```javascript
const input = document.getElementById('email');

if (input.checkValidity()) {
  console.log('Input is valid');
} else {
  console.log('Input is invalid');
}

// Check entire form
const form = document.getElementById('myForm');
if (form.checkValidity()) {
  console.log('Form is valid');
}
```

#### reportValidity()

Like `checkValidity()`, but also shows validation messages to the user.

```javascript
const form = document.getElementById('myForm');

// Validate and show messages
if (!form.reportValidity()) {
  console.log('Form has validation errors');
}
```

#### setCustomValidity()

Set a custom error message for an input.

```javascript
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

confirmPassword.addEventListener('input', () => {
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity('Passwords do not match');
  } else {
    confirmPassword.setCustomValidity(''); // Clear error
  }
});
```

### validationMessage Property

Returns the browser's validation message for the element.

```javascript
const input = document.getElementById('email');

input.addEventListener('invalid', () => {
  console.log(input.validationMessage);
  // e.g., "Please include an '@' in the email address"
});
```

## Custom Validation

### Basic Form Validation Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Form Validation</title>
  <style>
    .form-group {
      margin: 15px 0;
    }
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }
    input {
      padding: 8px;
      width: 100%;
      max-width: 300px;
      border: 1px solid #ddd;
    }
    input.invalid {
      border-color: #f44336;
    }
    input.valid {
      border-color: #4CAF50;
    }
    .error-message {
      color: #f44336;
      font-size: 14px;
      margin-top: 5px;
      display: none;
    }
    .error-message.visible {
      display: block;
    }
    button {
      padding: 10px 20px;
      background: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 16px;
    }
    button:hover {
      background: #45a049;
    }
  </style>
</head>
<body>
  <form id="registrationForm" novalidate>
    <div class="form-group">
      <label for="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        required
        minlength="3"
        maxlength="20">
      <div class="error-message" id="usernameError"></div>
    </div>

    <div class="form-group">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        required>
      <div class="error-message" id="emailError"></div>
    </div>

    <div class="form-group">
      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        required
        minlength="8">
      <div class="error-message" id="passwordError"></div>
    </div>

    <div class="form-group">
      <label for="confirmPassword">Confirm Password:</label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        required>
      <div class="error-message" id="confirmPasswordError"></div>
    </div>

    <button type="submit">Register</button>
  </form>

  <script>
    const form = document.getElementById('registrationForm');
    const username = document.getElementById('username');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    // Validation functions
    function validateUsername() {
      const error = document.getElementById('usernameError');
      const value = username.value.trim();

      if (value === '') {
        showError(username, error, 'Username is required');
        return false;
      } else if (value.length < 3) {
        showError(username, error, 'Username must be at least 3 characters');
        return false;
      } else if (value.length > 20) {
        showError(username, error, 'Username must be less than 20 characters');
        return false;
      } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
        showError(username, error, 'Username can only contain letters, numbers, and underscores');
        return false;
      } else {
        showSuccess(username, error);
        return true;
      }
    }

    function validateEmail() {
      const error = document.getElementById('emailError');
      const value = email.value.trim();

      if (value === '') {
        showError(email, error, 'Email is required');
        return false;
      } else if (!isValidEmail(value)) {
        showError(email, error, 'Please enter a valid email address');
        return false;
      } else {
        showSuccess(email, error);
        return true;
      }
    }

    function validatePassword() {
      const error = document.getElementById('passwordError');
      const value = password.value;

      if (value === '') {
        showError(password, error, 'Password is required');
        return false;
      } else if (value.length < 8) {
        showError(password, error, 'Password must be at least 8 characters');
        return false;
      } else if (!/[A-Z]/.test(value)) {
        showError(password, error, 'Password must contain at least one uppercase letter');
        return false;
      } else if (!/[a-z]/.test(value)) {
        showError(password, error, 'Password must contain at least one lowercase letter');
        return false;
      } else if (!/[0-9]/.test(value)) {
        showError(password, error, 'Password must contain at least one number');
        return false;
      } else {
        showSuccess(password, error);
        return true;
      }
    }

    function validateConfirmPassword() {
      const error = document.getElementById('confirmPasswordError');
      const value = confirmPassword.value;

      if (value === '') {
        showError(confirmPassword, error, 'Please confirm your password');
        return false;
      } else if (value !== password.value) {
        showError(confirmPassword, error, 'Passwords do not match');
        return false;
      } else {
        showSuccess(confirmPassword, error);
        return true;
      }
    }

    function showError(input, errorElement, message) {
      input.classList.remove('valid');
      input.classList.add('invalid');
      errorElement.textContent = message;
      errorElement.classList.add('visible');
    }

    function showSuccess(input, errorElement) {
      input.classList.remove('invalid');
      input.classList.add('valid');
      errorElement.textContent = '';
      errorElement.classList.remove('visible');
    }

    function isValidEmail(email) {
      // Basic email regex
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Real-time validation
    username.addEventListener('blur', validateUsername);
    email.addEventListener('blur', validateEmail);
    password.addEventListener('blur', validatePassword);
    confirmPassword.addEventListener('blur', validateConfirmPassword);

    // Also validate on input for password match
    password.addEventListener('input', () => {
      if (confirmPassword.value) {
        validateConfirmPassword();
      }
    });

    confirmPassword.addEventListener('input', validateConfirmPassword);

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate all fields
      const isUsernameValid = validateUsername();
      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();
      const isConfirmPasswordValid = validateConfirmPassword();

      if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
        console.log('Form is valid! Submitting...');
        // Submit form data here
        alert('Form submitted successfully!');
        form.reset();
      } else {
        console.log('Form has errors');
      }
    });
  </script>
</body>
</html>
```

## Advanced Validation Patterns

### Async Validation

Validate against server data (e.g., check if username is available).

```javascript
const username = document.getElementById('username');
const usernameError = document.getElementById('usernameError');
let validationTimeout;

username.addEventListener('input', () => {
  // Debounce the validation
  clearTimeout(validationTimeout);
  validationTimeout = setTimeout(async () => {
    const value = username.value.trim();

    if (value.length < 3) return;

    try {
      const response = await fetch(`/api/check-username?username=${value}`);
      const data = await response.json();

      if (!data.available) {
        showError(username, usernameError, 'Username is already taken');
      } else {
        showSuccess(username, usernameError);
      }
    } catch (error) {
      console.error('Validation error:', error);
    }
  }, 500); // Wait 500ms after user stops typing
});
```

### Conditional Validation

Validate based on other field values.

```javascript
const shippingAddress = document.getElementById('shippingAddress');
const billingAddress = document.getElementById('billingAddress');
const sameAsShipping = document.getElementById('sameAsShipping');

sameAsShipping.addEventListener('change', () => {
  if (sameAsShipping.checked) {
    // Remove validation requirements
    billingAddress.removeAttribute('required');
    billingAddress.disabled = true;
    billingAddress.value = '';
  } else {
    // Add validation requirements
    billingAddress.setAttribute('required', '');
    billingAddress.disabled = false;
  }
});
```

### Field Dependencies

```javascript
const country = document.getElementById('country');
const state = document.getElementById('state');
const province = document.getElementById('province');

country.addEventListener('change', () => {
  if (country.value === 'US') {
    state.style.display = 'block';
    state.required = true;
    province.style.display = 'none';
    province.required = false;
  } else if (country.value === 'CA') {
    province.style.display = 'block';
    province.required = true;
    state.style.display = 'none';
    state.required = false;
  }
});
```

## Disabling HTML5 Validation

Use `novalidate` attribute to disable browser validation and handle everything with JavaScript.

```html
<form novalidate>
  <!-- Your form fields -->
</form>
```

Or disable for specific buttons:

```html
<button type="submit">Submit</button>
<button type="submit" formnovalidate>Save Draft</button>
```

## Best Practices

1. **Always validate on the server** - Client-side validation can be bypassed
2. **Provide clear error messages** - Tell users exactly what's wrong
3. **Validate in real-time** - Give immediate feedback as users type
4. **Show positive feedback** - Indicate when fields are correct
5. **Disable submit until valid** - Prevent submission of invalid forms
6. **Use appropriate input types** - Let the browser help with validation
7. **Be accessible** - Use ARIA attributes and associate labels properly
8. **Sanitize input** - Protect against XSS and injection attacks

```javascript
// Good: Clear, specific error messages
"Password must contain at least 8 characters, including one uppercase letter and one number"

// Bad: Vague error messages
"Invalid password"
```

## Summary

Form validation is essential for data quality and user experience:

- **HTML5 validation**: Built-in attributes like `required`, `pattern`, `min`, `max`
- **Constraint Validation API**: `checkValidity()`, `setCustomValidity()`, `validity` object
- **Custom validation**: JavaScript functions for complex requirements
- **Real-time feedback**: Validate as users type or when fields lose focus
- **Server-side validation**: Always required for security

Effective form validation combines HTML5 features with JavaScript for a robust, user-friendly experience while maintaining security through server-side checks.
