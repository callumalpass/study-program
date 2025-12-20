# Accessibility

Web accessibility ensures that websites and applications are usable by everyone, including people with disabilities. Accessible design is not just ethical - it's often required by law and benefits all users.

## Why Accessibility Matters

### The Impact

- **1 billion people** worldwide have disabilities
- **Aging populations** increasingly need accessibility features
- **Legal requirements** - ADA, Section 508, European Accessibility Act
- **SEO benefits** - Accessible sites rank better
- **Better UX** - Benefits all users, not just those with disabilities

### Types of Disabilities

1. **Visual** - Blindness, low vision, color blindness
2. **Auditory** - Deafness, hard of hearing
3. **Motor** - Limited dexterity, tremors, paralysis
4. **Cognitive** - Learning disabilities, memory issues, attention disorders
5. **Seizure disorders** - Photosensitive epilepsy
6. **Temporary** - Broken arm, bright sunlight, noisy environment

## WCAG (Web Content Accessibility Guidelines)

WCAG provides standards for web accessibility, organized around four principles:

### POUR Principles

#### 1. Perceivable

Information must be presentable to users in ways they can perceive.

```html
<!-- Bad: Image without alt text -->
<img src="chart.png">

<!-- Good: Descriptive alt text -->
<img src="sales-chart.png" alt="Sales chart showing 20% increase in Q4">

<!-- Decorative images -->
<img src="decorative-line.png" alt="" role="presentation">
```

#### 2. Operable

Users must be able to operate the interface.

```html
<!-- Bad: Click-only button -->
<div onclick="submit()">Submit</div>

<!-- Good: Keyboard accessible button -->
<button type="submit">Submit</button>

<!-- Good: Custom interactive element with proper role -->
<div role="button" tabindex="0" onclick="submit()" onkeypress="handleKey(event)">
  Submit
</div>
```

#### 3. Understandable

Information and operation must be understandable.

```html
<!-- Bad: Unclear error -->
<span class="error">Invalid input</span>

<!-- Good: Specific error message -->
<span class="error" role="alert">
  Email address must include an @ symbol
</span>

<!-- Bad: No label -->
<input type="email" placeholder="Email">

<!-- Good: Explicit label -->
<label for="email">Email address</label>
<input type="email" id="email" placeholder="example@email.com">
```

#### 4. Robust

Content must work with current and future technologies.

```html
<!-- Use semantic HTML -->
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

<!-- Valid HTML -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Page Title</title>
</head>
<body>
  <!-- Content -->
</body>
</html>
```

## WCAG Conformance Levels

- **Level A** - Minimum level (essential)
- **Level AA** - Target level (recommended)
- **Level AAA** - Highest level (ideal)

Most organizations aim for **WCAG 2.1 Level AA** compliance.

## Semantic HTML

Use the correct HTML elements for their intended purpose.

### Document Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessible Page Title</title>
</head>
<body>
  <header>
    <nav aria-label="Main navigation">
      <!-- Navigation links -->
    </nav>
  </header>

  <main>
    <article>
      <h1>Article Heading</h1>
      <p>Content...</p>
    </article>

    <aside>
      <h2>Related Content</h2>
      <!-- Sidebar content -->
    </aside>
  </main>

  <footer>
    <p>&copy; 2024 Company Name</p>
  </footer>
</body>
</html>
```

### Heading Hierarchy

```html
<!-- Bad: Skipping levels -->
<h1>Main Title</h1>
<h3>Subsection</h3> <!-- Skipped h2 -->

<!-- Good: Logical hierarchy -->
<h1>Main Title</h1>
<h2>Section</h2>
<h3>Subsection</h3>
<h3>Another Subsection</h3>
<h2>Another Section</h2>
```

### Lists

```html
<!-- Navigation -->
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>

<!-- Ordered steps -->
<ol>
  <li>First step</li>
  <li>Second step</li>
  <li>Third step</li>
</ol>

<!-- Description list -->
<dl>
  <dt>Term</dt>
  <dd>Definition</dd>
</dl>
```

## ARIA (Accessible Rich Internet Applications)

ARIA attributes provide additional semantic information to assistive technologies.

### ARIA Roles

```html
<!-- Landmark roles -->
<div role="banner">Header content</div>
<div role="navigation">Navigation</div>
<div role="main">Main content</div>
<div role="complementary">Sidebar</div>
<div role="contentinfo">Footer</div>

<!-- Widget roles -->
<div role="button" tabindex="0">Custom Button</div>
<div role="tab" aria-selected="true">Tab 1</div>
<div role="dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Dialog Title</h2>
</div>

<!-- Live region roles -->
<div role="alert">Important message</div>
<div role="status" aria-live="polite">Status update</div>
```

### ARIA States and Properties

```html
<!-- aria-label: Provides accessible name -->
<button aria-label="Close dialog">×</button>

<!-- aria-labelledby: References another element for label -->
<div role="dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Confirm Action</h2>
</div>

<!-- aria-describedby: Additional description -->
<input
  type="password"
  id="password"
  aria-describedby="password-requirements">
<p id="password-requirements">
  Password must be at least 8 characters
</p>

<!-- aria-expanded: Collapsible content state -->
<button aria-expanded="false" aria-controls="menu">
  Menu
</button>
<ul id="menu" hidden>
  <!-- Menu items -->
</ul>

<!-- aria-hidden: Hide from screen readers -->
<span aria-hidden="true">★</span>
<span class="sr-only">Rating: 5 stars</span>

<!-- aria-current: Current item in navigation -->
<nav>
  <a href="/" aria-current="page">Home</a>
  <a href="/about">About</a>
</nav>

<!-- aria-disabled: Disabled state -->
<button aria-disabled="true">Submit</button>

<!-- aria-required: Required field -->
<input type="text" aria-required="true">

<!-- aria-invalid: Validation state -->
<input type="email" aria-invalid="true" aria-describedby="email-error">
<span id="email-error">Please enter a valid email</span>
```

### ARIA Live Regions

```html
<!-- Polite: Announce when convenient -->
<div aria-live="polite" aria-atomic="true">
  <p>Item added to cart</p>
</div>

<!-- Assertive: Announce immediately -->
<div role="alert" aria-live="assertive">
  <p>Error: Connection lost</p>
</div>

<!-- Status updates -->
<div role="status" aria-live="polite">
  <p>Saving changes...</p>
</div>
```

## Keyboard Navigation

All interactive elements must be keyboard accessible.

### Tab Order

```html
<!-- Natural tab order -->
<form>
  <input type="text" id="name">      <!-- tabindex 1 -->
  <input type="email" id="email">    <!-- tabindex 2 -->
  <button type="submit">Submit</button> <!-- tabindex 3 -->
</form>

<!-- Custom tab order (avoid when possible) -->
<button tabindex="3">Last</button>
<button tabindex="1">First</button>
<button tabindex="2">Second</button>

<!-- Remove from tab order -->
<div tabindex="-1">Not keyboard focusable</div>

<!-- Add to tab order -->
<div tabindex="0" role="button">Custom button</div>
```

### Keyboard Event Handling

```html
<div
  role="button"
  tabindex="0"
  onclick="handleClick()"
  onkeypress="handleKeyPress(event)">
  Custom Button
</div>

<script>
function handleKeyPress(event) {
  // Enter or Space activates button
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleClick();
  }
}

function handleClick() {
  console.log('Button activated');
}
</script>
```

### Skip Links

Allow keyboard users to skip repetitive content.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Skip Link Example</title>
  <style>
    .skip-link {
      position: absolute;
      top: -40px;
      left: 0;
      background: #000;
      color: #fff;
      padding: 8px;
      z-index: 100;
    }

    .skip-link:focus {
      top: 0;
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">
    Skip to main content
  </a>

  <header>
    <nav>
      <!-- Many navigation links -->
    </nav>
  </header>

  <main id="main-content">
    <!-- Main content -->
  </main>
</body>
</html>
```

## Screen Reader Support

### Alt Text for Images

```html
<!-- Informative image -->
<img src="chart.png" alt="Sales increased 25% in Q4 2024">

<!-- Functional image (link/button) -->
<a href="/search">
  <img src="search-icon.png" alt="Search">
</a>

<!-- Decorative image -->
<img src="decorative.png" alt="" role="presentation">

<!-- Complex image -->
<img src="complex-chart.png" alt="Sales data chart" aria-describedby="chart-description">
<div id="chart-description">
  <p>Detailed description of chart data...</p>
</div>
```

### Forms

```html
<form>
  <!-- Label association -->
  <label for="username">Username</label>
  <input type="text" id="username" name="username" required>

  <!-- Fieldset for grouped inputs -->
  <fieldset>
    <legend>Contact Method</legend>
    <label>
      <input type="radio" name="contact" value="email"> Email
    </label>
    <label>
      <input type="radio" name="contact" value="phone"> Phone
    </label>
  </fieldset>

  <!-- Error messages -->
  <label for="email">Email</label>
  <input
    type="email"
    id="email"
    aria-invalid="true"
    aria-describedby="email-error">
  <span id="email-error" role="alert">
    Please enter a valid email address
  </span>

  <!-- Required fields -->
  <label for="password">
    Password <span aria-label="required">*</span>
  </label>
  <input type="password" id="password" required aria-required="true">
</form>
```

### Screen Reader Only Text

```css
/* Visually hidden but available to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

```html
<button>
  <span aria-hidden="true">×</span>
  <span class="sr-only">Close dialog</span>
</button>

<a href="/cart">
  <span aria-hidden="true">🛒</span>
  <span class="sr-only">Shopping cart</span>
  <span class="sr-only">(3 items)</span>
</a>
```

## Color and Contrast

### Contrast Requirements

WCAG requires specific contrast ratios:
- **Normal text** - 4.5:1 (Level AA), 7:1 (Level AAA)
- **Large text** - 3:1 (Level AA), 4.5:1 (Level AAA)
- **UI components** - 3:1

```css
/* Bad: Insufficient contrast */
.text {
  color: #999; /* Light gray */
  background: #fff; /* White */
  /* Contrast ratio: 2.8:1 - FAIL */
}

/* Good: Sufficient contrast */
.text {
  color: #595959; /* Dark gray */
  background: #fff; /* White */
  /* Contrast ratio: 7:1 - PASS AAA */
}
```

### Don't Rely on Color Alone

```html
<!-- Bad: Color only -->
<p style="color: red;">Error: Invalid input</p>
<p style="color: green;">Success: Saved</p>

<!-- Good: Color + text/icon -->
<p class="error">
  <span aria-hidden="true">⚠</span> Error: Invalid input
</p>
<p class="success">
  <span aria-hidden="true">✓</span> Success: Saved
</p>
```

## Focus Indicators

Visible focus indicators help keyboard users know where they are.

```css
/* Bad: Removing focus outline */
button:focus {
  outline: none; /* Don't do this! */
}

/* Good: Custom focus indicator */
button:focus {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* Modern focus-visible (keyboard only) */
button:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

button:focus:not(:focus-visible) {
  outline: none;
}
```

## Responsive Accessibility

### Touch Targets

Minimum touch target size: 44x44 pixels

```css
/* Mobile touch targets */
@media (max-width: 768px) {
  button,
  a {
    min-height: 44px;
    min-width: 44px;
    padding: 12px 16px;
  }
}
```

### Zoom and Reflow

Support 200% zoom without horizontal scrolling.

```css
/* Use relative units */
body {
  font-size: 16px; /* Base size */
}

h1 {
  font-size: 2rem; /* Scales with zoom */
}

/* Avoid fixed widths */
.container {
  max-width: 1200px;
  width: 100%;
  padding: 0 1rem;
}
```

## Testing for Accessibility

### Automated Tools

- **Lighthouse** (Chrome DevTools) - Accessibility audit
- **WAVE** - Web accessibility evaluation tool
- **axe DevTools** - Browser extension
- **Pa11y** - Command-line tool

### Manual Testing

1. **Keyboard navigation** - Tab through entire page
2. **Screen reader** - NVDA (Windows), JAWS, VoiceOver (Mac/iOS)
3. **Zoom** - Test at 200% zoom
4. **Color blindness** - Use simulators
5. **Contrast checker** - Verify color contrast

### Screen Reader Testing

```javascript
// Test with screen reader
// - NVDA (Windows, free)
// - JAWS (Windows, paid)
// - VoiceOver (Mac/iOS, built-in)

// Common screen reader commands:
// - Tab: Next interactive element
// - Shift+Tab: Previous interactive element
// - Arrow keys: Navigate content
// - H: Next heading
// - Enter/Space: Activate element
```

## Complete Accessible Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessible Form Example</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 600px;
      margin: 2rem auto;
      padding: 0 1rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }

    input,
    textarea {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
    }

    input:focus,
    textarea:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
      border-color: #0066cc;
    }

    .error {
      color: #d32f2f;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: none;
    }

    .error.visible {
      display: block;
    }

    input[aria-invalid="true"] {
      border-color: #d32f2f;
    }

    .required {
      color: #d32f2f;
    }

    button {
      background: #0066cc;
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      font-size: 1rem;
      border-radius: 4px;
      cursor: pointer;
      min-height: 44px;
    }

    button:hover {
      background: #0052a3;
    }

    button:focus {
      outline: 2px solid #0066cc;
      outline-offset: 2px;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
  </style>
</head>
<body>
  <main>
    <h1>Contact Form</h1>
    <p>All fields marked with <span class="required" aria-label="required">*</span> are required.</p>

    <form id="contactForm" novalidate>
      <div class="form-group">
        <label for="name">
          Name <span class="required" aria-label="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          aria-required="true"
          aria-describedby="name-error">
        <div id="name-error" class="error" role="alert">
          Please enter your name
        </div>
      </div>

      <div class="form-group">
        <label for="email">
          Email <span class="required" aria-label="required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          aria-required="true"
          aria-describedby="email-error">
        <div id="email-error" class="error" role="alert">
          Please enter a valid email address
        </div>
      </div>

      <div class="form-group">
        <label for="message">
          Message <span class="required" aria-label="required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          aria-required="true"
          aria-describedby="message-error"></textarea>
        <div id="message-error" class="error" role="alert">
          Please enter a message
        </div>
      </div>

      <button type="submit">
        Send Message
        <span class="sr-only">(all fields are required)</span>
      </button>
    </form>

    <div id="form-status" role="status" aria-live="polite" aria-atomic="true"></div>
  </main>

  <script>
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fields = ['name', 'email', 'message'];
      let isValid = true;

      fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const error = document.getElementById(`${fieldName}-error`);

        if (!field.value.trim()) {
          field.setAttribute('aria-invalid', 'true');
          error.classList.add('visible');
          isValid = false;
        } else {
          field.setAttribute('aria-invalid', 'false');
          error.classList.remove('visible');
        }
      });

      if (isValid) {
        formStatus.textContent = 'Form submitted successfully!';
        form.reset();
      } else {
        formStatus.textContent = 'Please correct the errors above.';
      }
    });

    // Clear errors on input
    form.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('input', () => {
        const error = document.getElementById(`${field.id}-error`);
        field.setAttribute('aria-invalid', 'false');
        error.classList.remove('visible');
      });
    });
  </script>
</body>
</html>
```

## Best Practices Summary

1. **Use semantic HTML** - Proper elements for proper purposes
2. **Provide text alternatives** - Alt text, labels, ARIA labels
3. **Ensure keyboard accessibility** - All interactive elements
4. **Maintain sufficient contrast** - 4.5:1 for normal text
5. **Make focus visible** - Clear focus indicators
6. **Use ARIA appropriately** - Enhance, don't replace HTML
7. **Test with real users** - Including those with disabilities
8. **Support zoom** - Up to 200% without issues
9. **Provide skip links** - For keyboard navigation
10. **Write clear content** - Simple language, clear instructions

## Summary

Web accessibility is essential for inclusive design:

- **WCAG** provides standards (aim for Level AA)
- **POUR principles** - Perceivable, Operable, Understandable, Robust
- **Semantic HTML** - Foundation of accessibility
- **ARIA** - Enhances semantics when needed
- **Keyboard navigation** - Must support all functionality
- **Screen readers** - Test with actual assistive technology
- **Color and contrast** - Ensure readability
- **Testing** - Use automated tools and manual testing

Building accessible websites benefits everyone and is the right thing to do. Start with semantic HTML, test regularly, and continuously improve.
