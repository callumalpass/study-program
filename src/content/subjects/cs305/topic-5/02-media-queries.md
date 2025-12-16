# Media Queries

Media queries are a CSS technique that allows you to apply styles based on device characteristics like screen size, resolution, orientation, and more. They are the cornerstone of responsive web design.

## Basic Syntax

```css
@media media-type and (condition) {
  /* CSS rules */
}
```

```css
/* Example: Apply styles for screens 768px and wider */
@media screen and (min-width: 768px) {
  body {
    font-size: 18px;
  }
}
```

## Media Types

### Common Media Types

```css
/* All devices (default) */
@media all {
  /* Styles for all media types */
}

/* Screen devices (computers, tablets, phones) */
@media screen {
  /* Most common media type */
}

/* Print (when printing page) */
@media print {
  /* Hide navigation when printing */
  nav {
    display: none;
  }
}

/* Speech (screen readers) */
@media speech {
  /* Styles for screen readers */
}
```

## Width-Based Media Queries

The most commonly used media query condition.

### Min-Width (Mobile-First)

Start with mobile styles, then add styles for larger screens.

```css
/* Base styles (mobile) */
.container {
  width: 100%;
  padding: 10px;
}

/* Tablets and above */
@media (min-width: 768px) {
  .container {
    width: 750px;
    padding: 20px;
  }
}

/* Desktops and above */
@media (min-width: 1024px) {
  .container {
    width: 960px;
    padding: 30px;
  }
}

/* Large desktops */
@media (min-width: 1200px) {
  .container {
    width: 1140px;
  }
}
```

### Max-Width (Desktop-First)

Start with desktop styles, then override for smaller screens.

```css
/* Base styles (desktop) */
.sidebar {
  width: 25%;
  float: left;
}

/* Tablets and smaller */
@media (max-width: 1023px) {
  .sidebar {
    width: 30%;
  }
}

/* Mobile devices */
@media (max-width: 767px) {
  .sidebar {
    width: 100%;
    float: none;
  }
}
```

### Range Queries

Target specific ranges of screen sizes.

```css
/* Only tablets (between 768px and 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .content {
    font-size: 16px;
  }
}

/* Modern syntax (more readable) */
@media (768px <= width <= 1023px) {
  .content {
    font-size: 16px;
  }
}
```

## Height-Based Media Queries

Useful for viewport height considerations.

```css
/* Short viewports (less than 600px tall) */
@media (max-height: 600px) {
  header {
    padding: 10px 0;
  }

  .hero {
    min-height: 300px;
  }
}

/* Tall viewports */
@media (min-height: 800px) {
  .hero {
    min-height: 600px;
  }
}
```

## Orientation

Detect device orientation (portrait vs landscape).

```css
/* Portrait orientation (height > width) */
@media (orientation: portrait) {
  .grid {
    grid-template-columns: 1fr;
  }
}

/* Landscape orientation (width > height) */
@media (orientation: landscape) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

```css
/* Practical example: Mobile landscape adjustments */
@media (max-width: 767px) and (orientation: landscape) {
  .hero {
    min-height: 50vh; /* Shorter hero on mobile landscape */
  }

  nav {
    padding: 5px 0; /* Compact navigation */
  }
}
```

## Resolution and Pixel Density

Target high-resolution displays (Retina, 4K, etc.).

```css
/* Standard resolution */
.logo {
  background-image: url('logo.png');
}

/* High resolution displays (2x) */
@media (min-resolution: 192dpi),
       (min-resolution: 2dppx) {
  .logo {
    background-image: url('logo@2x.png');
    background-size: 100px 50px;
  }
}

/* Very high resolution (3x) */
@media (min-resolution: 288dpi),
       (min-resolution: 3dppx) {
  .logo {
    background-image: url('logo@3x.png');
    background-size: 100px 50px;
  }
}
```

## Aspect Ratio

Target specific aspect ratios.

```css
/* Widescreen displays (16:9) */
@media (aspect-ratio: 16/9) {
  .video-container {
    max-width: 1920px;
  }
}

/* Minimum aspect ratio */
@media (min-aspect-ratio: 16/9) {
  .content {
    max-width: 1200px;
  }
}
```

## Combining Conditions

### AND Operator

All conditions must be true.

```css
/* Tablets in landscape orientation */
@media (min-width: 768px) and (max-width: 1023px) and (orientation: landscape) {
  .content {
    column-count: 2;
  }
}

/* Touch devices with adequate screen size */
@media (min-width: 768px) and (hover: none) and (pointer: coarse) {
  button {
    min-height: 44px; /* Larger touch targets */
  }
}
```

### OR Operator (Comma)

Any condition can be true.

```css
/* Mobile OR tablets */
@media (max-width: 767px), (min-width: 768px) and (max-width: 1023px) {
  .sidebar {
    display: none;
  }
}

/* Portrait mobile OR landscape mobile */
@media (max-width: 767px) and (orientation: portrait),
       (max-width: 767px) and (orientation: landscape) {
  .mobile-only {
    display: block;
  }
}
```

### NOT Operator

Negate a condition.

```css
/* Not screen devices (e.g., print) */
@media not screen {
  .interactive {
    display: none;
  }
}

/* Not mobile devices */
@media not (max-width: 767px) {
  .desktop-nav {
    display: flex;
  }
}
```

## Interaction Media Features

Detect device input capabilities.

### Hover

```css
/* Devices that can hover (mouse) */
@media (hover: hover) {
  button:hover {
    background-color: #ddd;
  }

  .tooltip {
    display: none;
  }

  .tooltip-trigger:hover .tooltip {
    display: block;
  }
}

/* Devices that cannot hover (touch) */
@media (hover: none) {
  button:active {
    background-color: #ddd;
  }

  .tooltip {
    display: block; /* Always visible on touch */
  }
}
```

### Pointer

```css
/* Coarse pointer (touch, less precise) */
@media (pointer: coarse) {
  button {
    min-height: 44px; /* Larger touch targets */
    min-width: 44px;
  }

  a {
    padding: 12px;
  }
}

/* Fine pointer (mouse, more precise) */
@media (pointer: fine) {
  button {
    min-height: 32px;
    min-width: 32px;
  }
}
```

## Prefers Color Scheme

Detect user's preferred color scheme.

```css
/* Light mode (default) */
:root {
  --bg-color: white;
  --text-color: black;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-color: #1a1a1a;
    --text-color: #ffffff;
  }

  body {
    background-color: var(--bg-color);
    color: var(--text-color);
  }

  img {
    opacity: 0.9;
  }
}
```

## Prefers Reduced Motion

Respect user's motion preferences for accessibility.

```css
/* Standard animations */
.element {
  transition: transform 0.3s ease;
}

.element:hover {
  transform: scale(1.1);
}

/* Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .element:hover {
    transform: none;
  }
}
```

## Practical Examples

### Responsive Grid

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Grid</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background: #f5f5f5;
    }

    .grid {
      display: grid;
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Mobile: 1 column */
    .grid {
      grid-template-columns: 1fr;
    }

    /* Small tablets: 2 columns */
    @media (min-width: 600px) {
      .grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    /* Tablets: 3 columns */
    @media (min-width: 900px) {
      .grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    /* Desktops: 4 columns */
    @media (min-width: 1200px) {
      .grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .card h3 {
      margin-bottom: 10px;
      color: #333;
    }

    .card p {
      color: #666;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="grid">
    <div class="card">
      <h3>Card 1</h3>
      <p>Responsive grid that adapts from 1 to 4 columns.</p>
    </div>
    <div class="card">
      <h3>Card 2</h3>
      <p>Uses media queries to change layout at breakpoints.</p>
    </div>
    <div class="card">
      <h3>Card 3</h3>
      <p>Optimized for mobile, tablet, and desktop screens.</p>
    </div>
    <div class="card">
      <h3>Card 4</h3>
      <p>Clean and modern card design.</p>
    </div>
  </div>
</body>
</html>
```

### Responsive Navigation

```css
/* Desktop navigation */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #333;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-toggle {
  display: none;
}

/* Mobile navigation */
@media (max-width: 768px) {
  .nav-links {
    position: fixed;
    left: -100%;
    top: 70px;
    flex-direction: column;
    background-color: #333;
    width: 100%;
    text-align: center;
    transition: left 0.3s;
    padding: 2rem 0;
  }

  .nav-links.active {
    left: 0;
  }

  .nav-toggle {
    display: block;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
  }
}
```

### Print Styles

```css
/* Screen styles */
@media screen {
  .no-print {
    display: block;
  }

  .print-only {
    display: none;
  }
}

/* Print styles */
@media print {
  /* Hide unnecessary elements */
  nav,
  footer,
  .no-print,
  button,
  .ad {
    display: none !important;
  }

  /* Show print-specific content */
  .print-only {
    display: block;
  }

  /* Optimize for printing */
  body {
    font-size: 12pt;
    color: black;
    background: white;
  }

  a {
    color: black;
    text-decoration: underline;
  }

  /* Show URLs after links */
  a[href]::after {
    content: " (" attr(href) ")";
  }

  /* Page breaks */
  h1, h2, h3 {
    page-break-after: avoid;
  }

  img {
    page-break-inside: avoid;
  }

  /* Ensure proper margins */
  @page {
    margin: 2cm;
  }
}
```

## Media Query Best Practices

### 1. Mobile-First Approach

```css
/* ✓ Good: Mobile-first */
.element {
  width: 100%;
}

@media (min-width: 768px) {
  .element {
    width: 50%;
  }
}

@media (min-width: 1024px) {
  .element {
    width: 33.333%;
  }
}

/* ✗ Bad: Desktop-first (more overrides needed) */
.element {
  width: 33.333%;
}

@media (max-width: 1023px) {
  .element {
    width: 50%;
  }
}

@media (max-width: 767px) {
  .element {
    width: 100%;
  }
}
```

### 2. Use Relative Units

```css
/* ✓ Good: Relative units */
@media (min-width: 48em) { /* 768px at 16px base */
  .container {
    max-width: 75rem; /* 1200px */
  }
}

/* ✗ Avoid: Pixel breakpoints (harder to scale) */
@media (min-width: 768px) {
  .container {
    max-width: 1200px;
  }
}
```

### 3. Organize Media Queries

```css
/* Option 1: Group by breakpoint */
/* Mobile styles */
.header { /* ... */ }
.content { /* ... */ }

@media (min-width: 768px) {
  /* Tablet styles */
  .header { /* ... */ }
  .content { /* ... */ }
}

@media (min-width: 1024px) {
  /* Desktop styles */
  .header { /* ... */ }
  .content { /* ... */ }
}

/* Option 2: Group by component (if using preprocessor) */
.header {
  /* Mobile styles */

  @media (min-width: 768px) {
    /* Tablet styles */
  }

  @media (min-width: 1024px) {
    /* Desktop styles */
  }
}
```

### 4. Test Thoroughly

Test your media queries:
- On real devices
- In browser DevTools
- At various sizes between breakpoints
- In different orientations
- With different zoom levels

## Summary

Media queries are essential for responsive design:

- **Width queries** (`min-width`, `max-width`) - Most common
- **Height queries** - For viewport height considerations
- **Orientation** - Portrait vs landscape
- **Resolution** - High DPI displays
- **Interaction features** - Hover, pointer capabilities
- **User preferences** - Dark mode, reduced motion
- **Combining conditions** - AND, OR, NOT operators
- **Print styles** - Optimize for printing

Understanding media queries allows you to create truly responsive websites that adapt to any device and user preference.
