# CSS Variables (Custom Properties)

CSS Variables, officially called Custom Properties, allow you to store and reuse values throughout your stylesheets. They make CSS more maintainable, enable theming, reduce repetition, and can be manipulated with JavaScript. Understanding CSS variables is essential for modern, scalable web development.

## What are CSS Variables?

CSS Variables are custom properties you define once and reference multiple times. They follow the cascade and inheritance like regular CSS properties.

```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --font-size-base: 16px;
}

.button {
    background-color: var(--primary-color);
    font-size: var(--font-size-base);
}
```

## Declaring CSS Variables

Variables must begin with two dashes (`--`) and are case-sensitive.

```css
/* Valid variable names */
--color: blue;
--main-color: red;
--fontSize: 16px;
--font_size: 18px;
--color-1: #333;
--bgColor: white;

/* Invalid (doesn't start with --) */
color: blue;
```

### Global Variables

Declare in `:root` (the `<html>` element) for global scope:

```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --text-color: #333;
    --background-color: #ffffff;
    --border-radius: 4px;
    --spacing-unit: 8px;
}
```

### Local Variables

Declare within specific selectors for local scope:

```css
.card {
    --card-padding: 20px;
    --card-border: 1px solid #ddd;
    padding: var(--card-padding);
    border: var(--card-border);
}

.button {
    --button-color: blue;
    background-color: var(--button-color);
}
```

## Using CSS Variables

Access variables with the `var()` function:

```css
.element {
    color: var(--primary-color);
    font-size: var(--font-size-base);
}
```

### Fallback Values

Provide fallback values if the variable isn't defined:

```css
.element {
    color: var(--primary-color, blue);  /* Falls back to blue */
    font-size: var(--font-size, 16px);
}

/* Multiple fallbacks */
.element {
    color: var(--primary-color, var(--fallback-color, red));
}
```

### Using Variables in calc()

Variables work with calc() and other CSS functions:

```css
:root {
    --spacing: 20px;
}

.element {
    padding: calc(var(--spacing) * 2);  /* 40px */
    margin: calc(var(--spacing) / 2);   /* 10px */
}
```

## Variable Inheritance

CSS variables follow the cascade and inherit like regular properties:

```css
:root {
    --color: blue;
}

body {
    --color: red;  /* Overrides for body and descendants */
}

.container {
    color: var(--color);  /* Inherits from nearest ancestor */
}
```

### Scoping Example

```css
:root {
    --spacing: 20px;
}

.card {
    --spacing: 10px;  /* Local override */
    padding: var(--spacing);  /* Uses 10px */
}

.card .title {
    margin: var(--spacing);  /* Inherits 10px from .card */
}

.other {
    margin: var(--spacing);  /* Uses 20px from :root */
}
```

## Practical Use Cases

### Color Theming

```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    --info-color: #17a2b8;
}

.btn-primary {
    background-color: var(--primary-color);
}

.btn-danger {
    background-color: var(--danger-color);
}

.alert-success {
    border-color: var(--success-color);
    color: var(--success-color);
}
```

### Spacing System

```css
:root {
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
}

.card {
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
}

.button {
    padding: var(--spacing-sm) var(--spacing-md);
}
```

### Typography Scale

```css
:root {
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
}

h1 { font-size: var(--font-size-3xl); }
h2 { font-size: var(--font-size-2xl); }
h3 { font-size: var(--font-size-xl); }
p  { font-size: var(--font-size-base); }
```

### Consistent Border Radius

```css
:root {
    --radius-sm: 2px;
    --radius-md: 4px;
    --radius-lg: 8px;
    --radius-xl: 16px;
    --radius-full: 50%;
}

.card {
    border-radius: var(--radius-lg);
}

.button {
    border-radius: var(--radius-md);
}

.avatar {
    border-radius: var(--radius-full);
}
```

## Dark Mode Implementation

CSS variables excel at theming and dark mode:

```css
:root {
    --bg-color: #ffffff;
    --text-color: #333333;
    --border-color: #dddddd;
}

[data-theme="dark"] {
    --bg-color: #1a1a1a;
    --text-color: #ffffff;
    --border-color: #444444;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
}

.card {
    border: 1px solid var(--border-color);
}
```

HTML:
```html
<html data-theme="dark">
<!-- Theme switches by changing data-theme attribute -->
</html>
```

### Automatic Dark Mode

Use media queries for system preference:

```css
:root {
    --bg-color: #ffffff;
    --text-color: #333333;
}

@media (prefers-color-scheme: dark) {
    :root {
        --bg-color: #1a1a1a;
        --text-color: #ffffff;
    }
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
}
```

## JavaScript Integration

CSS variables can be manipulated with JavaScript:

### Getting Variable Values

```javascript
// Get computed value
const root = document.documentElement;
const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color');
console.log(primaryColor);  // "#007bff"
```

### Setting Variable Values

```javascript
// Set variable value
const root = document.documentElement;
root.style.setProperty('--primary-color', '#ff0000');
```

### Dynamic Theming

```javascript
function setTheme(theme) {
    const root = document.documentElement;

    if (theme === 'dark') {
        root.style.setProperty('--bg-color', '#1a1a1a');
        root.style.setProperty('--text-color', '#ffffff');
    } else {
        root.style.setProperty('--bg-color', '#ffffff');
        root.style.setProperty('--text-color', '#333333');
    }
}

// Toggle theme
document.getElementById('theme-toggle').addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
});
```

### Interactive Color Picker

```html
<input type="color" id="color-picker" value="#007bff">

<script>
document.getElementById('color-picker').addEventListener('input', (e) => {
    document.documentElement.style.setProperty('--primary-color', e.target.value);
});
</script>
```

## Advanced Patterns

### Component Variations

```css
.button {
    --button-bg: var(--primary-color);
    --button-color: white;
    background-color: var(--button-bg);
    color: var(--button-color);
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-md);
}

.button--secondary {
    --button-bg: var(--secondary-color);
}

.button--large {
    padding: var(--spacing-md) var(--spacing-lg);
}
```

### Responsive Variables

```css
:root {
    --container-width: 90%;
    --font-size: 14px;
}

@media (min-width: 768px) {
    :root {
        --container-width: 720px;
        --font-size: 16px;
    }
}

@media (min-width: 1024px) {
    :root {
        --container-width: 960px;
        --font-size: 18px;
    }
}

.container {
    width: var(--container-width);
    margin: 0 auto;
}

body {
    font-size: var(--font-size);
}
```

### Complex Calculations

```css
:root {
    --base-size: 16px;
    --scale: 1.5;
}

h1 {
    font-size: calc(var(--base-size) * var(--scale) * var(--scale));
}

h2 {
    font-size: calc(var(--base-size) * var(--scale));
}
```

## Design System Example

```css
:root {
    /* Colors */
    --color-primary: #007bff;
    --color-secondary: #6c757d;
    --color-success: #28a745;
    --color-danger: #dc3545;
    --color-warning: #ffc107;
    --color-info: #17a2b8;

    /* Neutral colors */
    --color-white: #ffffff;
    --color-gray-100: #f8f9fa;
    --color-gray-200: #e9ecef;
    --color-gray-300: #dee2e6;
    --color-gray-400: #ced4da;
    --color-gray-500: #adb5bd;
    --color-gray-600: #6c757d;
    --color-gray-700: #495057;
    --color-gray-800: #343a40;
    --color-gray-900: #212529;
    --color-black: #000000;

    /* Spacing */
    --space-0: 0;
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-5: 1.25rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-10: 2.5rem;
    --space-12: 3rem;
    --space-16: 4rem;

    /* Typography */
    --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    --font-mono: "Courier New", monospace;
    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-base: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 1.875rem;
    --font-size-4xl: 2.25rem;

    /* Border radius */
    --radius-none: 0;
    --radius-sm: 0.125rem;
    --radius-base: 0.25rem;
    --radius-md: 0.375rem;
    --radius-lg: 0.5rem;
    --radius-xl: 0.75rem;
    --radius-2xl: 1rem;
    --radius-full: 9999px;

    /* Shadows */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

    /* Transitions */
    --transition-fast: 150ms;
    --transition-base: 300ms;
    --transition-slow: 500ms;
}
```

## Browser Support

CSS Variables are supported in all modern browsers:
- Chrome 49+
- Firefox 31+
- Safari 9.1+
- Edge 15+
- Not supported in IE 11

### Fallback for Older Browsers

```css
.element {
    color: #007bff;  /* Fallback for IE 11 */
    color: var(--primary-color);
}
```

## Best Practices

**Use descriptive names**: `--primary-color` not `--color1`.

**Organize by category**: Group related variables together.

**Establish naming conventions**: Use consistent prefixes or patterns.

**Create a design system**: Define all variables in one place.

**Use fallback values**: Provide defaults with `var()`.

**Scope appropriately**: Global variables in `:root`, local in components.

**Document your variables**: Comment variable purposes and values.

**Test without variables**: Ensure fallbacks work in older browsers.

## Common Patterns

### Theme Toggle

```css
:root {
    --theme-bg: #ffffff;
    --theme-text: #333333;
}

.dark-theme {
    --theme-bg: #1a1a1a;
    --theme-text: #ffffff;
}

body {
    background-color: var(--theme-bg);
    color: var(--theme-text);
    transition: background-color 0.3s, color 0.3s;
}
```

### Spacing Scale

```css
:root {
    --spacing-unit: 8px;
}

.mt-1 { margin-top: calc(var(--spacing-unit) * 1); }
.mt-2 { margin-top: calc(var(--spacing-unit) * 2); }
.mt-3 { margin-top: calc(var(--spacing-unit) * 3); }
.mt-4 { margin-top: calc(var(--spacing-unit) * 4); }
```

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Variables Demo</title>
    <style>
        :root {
            /* Colors */
            --primary-color: #007bff;
            --text-color: #333;
            --bg-color: #ffffff;
            --border-color: #ddd;

            /* Spacing */
            --spacing-sm: 8px;
            --spacing-md: 16px;
            --spacing-lg: 24px;

            /* Typography */
            --font-size-base: 16px;
            --font-size-lg: 20px;

            /* Border radius */
            --radius: 8px;
        }

        [data-theme="dark"] {
            --text-color: #ffffff;
            --bg-color: #1a1a1a;
            --border-color: #444;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            padding: var(--spacing-lg);
            transition: background-color 0.3s, color 0.3s;
        }

        .card {
            background-color: var(--bg-color);
            border: 1px solid var(--border-color);
            border-radius: var(--radius);
            padding: var(--spacing-md);
            margin-bottom: var(--spacing-md);
        }

        .button {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: var(--radius);
            cursor: pointer;
            font-size: var(--font-size-base);
        }

        h1 {
            font-size: var(--font-size-lg);
            margin-bottom: var(--spacing-md);
        }
    </style>
</head>
<body>
    <h1>CSS Variables Demo</h1>

    <div class="card">
        <h2>Card Title</h2>
        <p>This card uses CSS variables for theming.</p>
    </div>

    <button class="button" onclick="toggleTheme()">Toggle Theme</button>

    <script>
        function toggleTheme() {
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
        }
    </script>
</body>
</html>
```

## Conclusion

CSS Variables (Custom Properties) are a powerful feature that makes CSS more maintainable, flexible, and dynamic. They enable theming, reduce repetition, work seamlessly with JavaScript, and create scalable design systems. By declaring variables in `:root` for global scope or within selectors for local scope, and accessing them with `var()`, you can build consistent, themeable, and maintainable stylesheets for modern web applications.
