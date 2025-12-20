# CSS Frameworks

CSS frameworks provide pre-written, standardized code to help developers build responsive websites quickly. They include grid systems, components, utilities, and design patterns that speed up development.

## What Are CSS Frameworks?

CSS frameworks are collections of CSS files that provide:
- Grid systems for layout
- Pre-styled components (buttons, forms, cards)
- Utility classes for common styles
- Responsive breakpoints
- Typography systems
- Color palettes

## Bootstrap

Bootstrap is the most popular CSS framework, known for its comprehensive component library and extensive documentation.

### Getting Started with Bootstrap

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bootstrap Example</title>

  <!-- Bootstrap CSS -->
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
    rel="stylesheet">
</head>
<body>
  <div class="container">
    <h1>Hello Bootstrap</h1>
    <p class="lead">A responsive website built with Bootstrap</p>
  </div>

  <!-- Bootstrap JS (optional, for interactive components) -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
```

### Bootstrap Grid System

Bootstrap uses a 12-column grid system.

```html
<div class="container">
  <div class="row">
    <!-- Full width on mobile, half width on tablets and up -->
    <div class="col-12 col-md-6">
      <p>Column 1</p>
    </div>
    <div class="col-12 col-md-6">
      <p>Column 2</p>
    </div>
  </div>

  <div class="row">
    <!-- Three equal columns on desktop -->
    <div class="col-12 col-sm-6 col-lg-4">
      <p>Column 1</p>
    </div>
    <div class="col-12 col-sm-6 col-lg-4">
      <p>Column 2</p>
    </div>
    <div class="col-12 col-lg-4">
      <p>Column 3</p>
    </div>
  </div>
</div>
```

### Bootstrap Breakpoints

```
xs: < 576px (extra small, default)
sm: ≥ 576px (small)
md: ≥ 768px (medium)
lg: ≥ 992px (large)
xl: ≥ 1200px (extra large)
xxl: ≥ 1400px (extra extra large)
```

### Bootstrap Components

```html
<!-- Navigation -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container">
    <a class="navbar-brand" href="#">MyWebsite</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link active" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</nav>

<!-- Cards -->
<div class="row">
  <div class="col-md-4">
    <div class="card">
      <img src="image.jpg" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card Title</h5>
        <p class="card-text">Some quick example text.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  </div>
</div>

<!-- Buttons -->
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>

<!-- Forms -->
<form>
  <div class="mb-3">
    <label for="email" class="form-label">Email address</label>
    <input type="email" class="form-control" id="email">
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### Bootstrap Utilities

```html
<!-- Spacing utilities -->
<div class="p-3">Padding on all sides</div>
<div class="pt-3">Padding top</div>
<div class="m-4">Margin on all sides</div>
<div class="mb-5">Margin bottom</div>

<!-- Display utilities -->
<div class="d-none d-md-block">Hidden on mobile, visible on tablets+</div>
<div class="d-block d-lg-none">Visible on mobile, hidden on desktop</div>

<!-- Text utilities -->
<p class="text-center">Centered text</p>
<p class="text-primary">Primary color text</p>
<p class="fs-1">Large text</p>
<p class="fw-bold">Bold text</p>

<!-- Background utilities -->
<div class="bg-primary text-white p-3">Primary background</div>
<div class="bg-light p-3">Light background</div>

<!-- Flexbox utilities -->
<div class="d-flex justify-content-between align-items-center">
  <span>Left</span>
  <span>Right</span>
</div>
```

## Tailwind CSS

Tailwind is a utility-first CSS framework that provides low-level utility classes instead of pre-designed components.

### Getting Started with Tailwind

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind Example</title>

  <!-- Tailwind CSS CDN (for development only) -->
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="container mx-auto px-4">
    <h1 class="text-4xl font-bold">Hello Tailwind</h1>
    <p class="text-lg text-gray-600">A utility-first CSS framework</p>
  </div>
</body>
</html>
```

### Tailwind Utility Classes

```html
<!-- Layout -->
<div class="container mx-auto px-4">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </div>
</div>

<!-- Typography -->
<h1 class="text-4xl font-bold text-gray-900">Heading</h1>
<p class="text-base text-gray-600 leading-relaxed">Paragraph text</p>

<!-- Spacing -->
<div class="p-4">Padding 1rem</div>
<div class="px-6 py-3">Padding x and y</div>
<div class="mt-4">Margin top</div>
<div class="space-y-4">Vertical spacing between children</div>

<!-- Colors -->
<button class="bg-blue-500 text-white">Blue button</button>
<div class="bg-gray-100 text-gray-800">Gray background</div>

<!-- Flexbox -->
<div class="flex justify-between items-center">
  <span>Left</span>
  <span>Right</span>
</div>

<!-- Responsive -->
<div class="w-full md:w-1/2 lg:w-1/3">
  Responsive width
</div>

<!-- Hover and states -->
<button class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2 rounded">
  Button
</button>
```

### Tailwind Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

Usage:
```html
<!-- Hidden on mobile, visible on md and up -->
<div class="hidden md:block">Content</div>

<!-- Full width on mobile, half on lg -->
<div class="w-full lg:w-1/2">Content</div>

<!-- Stack on mobile, horizontal on md -->
<div class="flex flex-col md:flex-row">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### Complete Tailwind Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tailwind Example</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
  <!-- Navigation -->
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <div class="text-xl font-bold text-gray-800">MyWebsite</div>
        <div class="hidden md:flex space-x-8">
          <a href="#" class="text-gray-600 hover:text-gray-900">Home</a>
          <a href="#" class="text-gray-600 hover:text-gray-900">About</a>
          <a href="#" class="text-gray-600 hover:text-gray-900">Contact</a>
        </div>
      </div>
    </div>
  </nav>

  <!-- Hero -->
  <div class="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
    <div class="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 class="text-4xl md:text-6xl font-bold mb-4">Welcome to Tailwind</h1>
      <p class="text-lg md:text-xl mb-8 text-purple-100">
        Build modern websites with utility-first CSS
      </p>
      <button class="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition">
        Get Started
      </button>
    </div>
  </div>

  <!-- Cards Grid -->
  <div class="max-w-7xl mx-auto px-4 py-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card 1 -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
        <img src="https://via.placeholder.com/400x200" alt="Card" class="w-full h-48 object-cover">
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2 text-gray-800">Card Title</h3>
          <p class="text-gray-600 mb-4">
            This is a card component built with Tailwind CSS.
          </p>
          <button class="text-blue-600 font-semibold hover:text-blue-800">
            Read More →
          </button>
        </div>
      </div>

      <!-- Card 2 -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
        <img src="https://via.placeholder.com/400x200" alt="Card" class="w-full h-48 object-cover">
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2 text-gray-800">Another Card</h3>
          <p class="text-gray-600 mb-4">
            Responsive cards that stack on mobile and grid on desktop.
          </p>
          <button class="text-blue-600 font-semibold hover:text-blue-800">
            Read More →
          </button>
        </div>
      </div>

      <!-- Card 3 -->
      <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
        <img src="https://via.placeholder.com/400x200" alt="Card" class="w-full h-48 object-cover">
        <div class="p-6">
          <h3 class="text-xl font-semibold mb-2 text-gray-800">Third Card</h3>
          <p class="text-gray-600 mb-4">
            Easy to customize with Tailwind's utility classes.
          </p>
          <button class="text-blue-600 font-semibold hover:text-blue-800">
            Read More →
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <footer class="bg-gray-800 text-white mt-16">
    <div class="max-w-7xl mx-auto px-4 py-8 text-center">
      <p>&copy; 2024 MyWebsite. All rights reserved.</p>
    </div>
  </footer>
</body>
</html>
```

## Bootstrap vs Tailwind

### Bootstrap

**Pros:**
- Pre-designed components
- Faster initial development
- Consistent design out of the box
- Great for prototypes
- Extensive documentation
- Large community

**Cons:**
- Larger file size
- Sites can look similar ("Bootstrap-y")
- Less flexibility
- More difficult to customize
- Requires learning component classes

**Best for:**
- Rapid prototyping
- Teams wanting consistency
- Projects with standard UI needs
- Developers new to CSS

### Tailwind CSS

**Pros:**
- Highly customizable
- Smaller production builds (with purging)
- No opinionated designs
- Utility-first approach
- Great for unique designs
- Easy to maintain

**Cons:**
- Steeper learning curve
- Verbose HTML
- Requires build process for production
- Need to build components yourself
- Can be overwhelming initially

**Best for:**
- Custom designs
- Performance-critical apps
- Experienced developers
- Projects requiring flexibility
- Design systems

## Other Popular Frameworks

### Foundation

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/foundation-sites@6.7.5/dist/css/foundation.min.css">

<div class="grid-container">
  <div class="grid-x grid-margin-x">
    <div class="cell small-12 medium-6 large-4">Cell</div>
    <div class="cell small-12 medium-6 large-4">Cell</div>
    <div class="cell small-12 medium-6 large-4">Cell</div>
  </div>
</div>
```

### Bulma

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">

<div class="columns">
  <div class="column">Column 1</div>
  <div class="column">Column 2</div>
  <div class="column">Column 3</div>
</div>

<button class="button is-primary">Primary Button</button>
```

### Materialize

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

<div class="row">
  <div class="col s12 m6 l4">Column</div>
  <div class="col s12 m6 l4">Column</div>
  <div class="col s12 m12 l4">Column</div>
</div>

<a class="waves-effect waves-light btn">Button</a>
```

## When to Use CSS Frameworks

### Use a Framework When:

1. **Rapid prototyping** - Need to build quickly
2. **Consistent design** - Want standardized UI
3. **Team collaboration** - Common vocabulary helps
4. **Limited CSS expertise** - Framework provides structure
5. **Responsive requirements** - Built-in responsive systems
6. **Browser compatibility** - Frameworks handle quirks

### Don't Use a Framework When:

1. **Highly custom design** - Framework might limit you
2. **Performance critical** - Want minimal CSS
3. **Learning CSS** - Should learn fundamentals first
4. **Simple project** - Framework is overkill
5. **Complete control needed** - Framework abstracts too much

## Customizing Frameworks

### Bootstrap Customization

```scss
// Override Bootstrap variables
$primary: #007bff;
$secondary: #6c757d;
$font-family-base: 'Roboto', sans-serif;

// Import Bootstrap
@import "bootstrap/scss/bootstrap";
```

### Tailwind Customization

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#007bff',
        secondary: '#6c757d',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
}
```

## Best Practices

1. **Learn CSS fundamentals first** - Understand what frameworks abstract
2. **Don't include entire framework** - Use only what you need
3. **Customize default styles** - Make it your own
4. **Follow framework conventions** - Don't fight the system
5. **Keep frameworks updated** - Security and features
6. **Consider build size** - Remove unused CSS
7. **Test across devices** - Framework doesn't guarantee perfection
8. **Document custom components** - Maintain consistency
9. **Use semantic HTML** - Don't rely only on classes
10. **Plan for maintenance** - Consider long-term updates

## Summary

CSS frameworks accelerate development and provide structure:

- **Bootstrap** - Comprehensive, component-rich, great for prototypes
- **Tailwind** - Utility-first, highly customizable, great for custom designs
- **Other options** - Foundation, Bulma, Materialize
- **When to use** - Based on project needs and team expertise
- **Customization** - Make frameworks match your brand
- **Trade-offs** - Speed vs flexibility, file size vs features

Choose a framework based on your project requirements, team expertise, and design goals. Sometimes custom CSS is better, sometimes a framework saves significant time.
