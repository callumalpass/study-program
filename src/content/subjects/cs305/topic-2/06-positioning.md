# CSS Positioning

CSS positioning controls how elements are placed on the page. Understanding the different positioning schemes—static, relative, absolute, fixed, and sticky—is essential for creating complex layouts, overlays, navigation bars, and interactive elements. Each positioning type has specific use cases and behaviors.

## The Position Property

The `position` property determines how an element is positioned in the document flow. It works with offset properties: `top`, `right`, `bottom`, and `left`.

```css
.element {
    position: value;
    top: 10px;
    right: 20px;
    bottom: 30px;
    left: 40px;
}
```

## Static Positioning (Default)

Elements are positioned according to the normal document flow. Offset properties have no effect.

```css
.element {
    position: static;  /* Default, can be omitted */
}
```

This is the default behavior. Elements appear in the order they appear in HTML.

```html
<div class="box1">Box 1</div>
<div class="box2">Box 2</div>
<div class="box3">Box 3</div>
```

Boxes stack vertically (for block elements) or horizontally (for inline elements) in source order.

## Relative Positioning

Element is positioned relative to its normal position. The space it originally occupied is preserved.

```css
.element {
    position: relative;
    top: 20px;     /* Move down 20px from normal position */
    left: 30px;    /* Move right 30px from normal position */
}
```

### Key Characteristics

- Element moves relative to where it would normally be
- Original space remains reserved
- Doesn't affect surrounding elements
- Creates positioning context for absolute children

```html
<div class="box1">Box 1</div>
<div class="box2" style="position: relative; top: 20px; left: 20px;">Box 2</div>
<div class="box3">Box 3</div>
```

Box 2 moves down and right, but Box 3 remains where it would have been.

### Use Cases

**Minor position adjustments**:
```css
.icon {
    position: relative;
    top: 2px;  /* Align with text */
}
```

**Creating positioning context**:
```css
.container {
    position: relative;  /* For absolute children */
}

.badge {
    position: absolute;
    top: 0;
    right: 0;
}
```

**Z-index without offset**:
```css
.overlay {
    position: relative;
    z-index: 10;
}
```

## Absolute Positioning

Element is removed from normal document flow and positioned relative to its nearest positioned ancestor (not static). If none exists, it's positioned relative to the initial containing block (viewport).

```css
.element {
    position: absolute;
    top: 0;
    right: 0;
}
```

### Key Characteristics

- Removed from document flow (doesn't affect other elements)
- Positioned relative to nearest positioned ancestor
- Width shrinks to fit content (unless specified)
- Creates new stacking context

```html
<div class="container" style="position: relative; width: 300px; height: 200px;">
    <div class="box" style="position: absolute; top: 10px; right: 10px;">
        Absolute Box
    </div>
</div>
```

The box is positioned 10px from the top and right of the container.

### Positioning Reference

```css
/* Container provides positioning context */
.container {
    position: relative;
}

/* Child positioned relative to container */
.child {
    position: absolute;
    top: 20px;
    left: 30px;
}
```

Without a positioned ancestor:
```css
/* No positioned parent - uses viewport */
.element {
    position: absolute;
    top: 0;
    left: 0;  /* Top-left corner of viewport */
}
```

### Use Cases

**Overlays and modals**:
```css
.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);  /* Center */
}
```

**Badges and notifications**:
```css
.notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background-color: red;
    border-radius: 50%;
}
```

**Dropdown menus**:
```css
.dropdown {
    position: relative;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
}
```

**Tooltips**:
```css
.tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
}
```

## Fixed Positioning

Element is positioned relative to the viewport and stays in the same position when scrolling.

```css
.element {
    position: fixed;
    top: 0;
    left: 0;
}
```

### Key Characteristics

- Removed from document flow
- Positioned relative to viewport
- Stays fixed during scrolling
- Creates new stacking context

### Use Cases

**Fixed headers**:
```css
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
}

/* Add padding to body to prevent content from hiding under header */
body {
    padding-top: 60px;  /* Header height */
}
```

**Fixed sidebars**:
```css
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100vh;
}
```

**Back-to-top buttons**:
```css
.back-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
}
```

**Cookie notices**:
```css
.cookie-notice {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
}
```

## Sticky Positioning

Element toggles between relative and fixed positioning depending on scroll position. It's relative until a scroll threshold is met, then becomes fixed.

```css
.element {
    position: sticky;
    top: 0;
}
```

### Key Characteristics

- Acts as relative until scroll threshold
- Becomes fixed at threshold
- Requires one offset value (top, bottom, left, or right)
- Stays within parent container

### Use Cases

**Sticky headers**:
```css
.section-header {
    position: sticky;
    top: 0;
    background-color: white;
    z-index: 10;
}
```

**Table headers**:
```css
thead {
    position: sticky;
    top: 0;
    background-color: #f0f0f0;
}
```

**Sidebar navigation**:
```css
.sidebar-nav {
    position: sticky;
    top: 20px;
}
```

### Example

```html
<div class="container">
    <h2 style="position: sticky; top: 0; background: white;">Section 1</h2>
    <p>Content...</p>
    <h2 style="position: sticky; top: 0; background: white;">Section 2</h2>
    <p>Content...</p>
</div>
```

Each heading sticks to the top until the next heading reaches it.

## Z-Index and Stacking Context

The `z-index` property controls the stacking order of positioned elements. Higher values appear in front.

```css
.element1 {
    position: relative;
    z-index: 1;
}

.element2 {
    position: absolute;
    z-index: 10;  /* Appears in front of element1 */
}
```

### Z-Index Requirements

- Only works on positioned elements (not static)
- Creates stacking context

### Stacking Context

Certain properties create a new stacking context:
- `position: absolute/relative/fixed/sticky` with `z-index` other than auto
- `opacity` less than 1
- `transform`, `filter`, `perspective`
- Flexbox/Grid items with z-index

```css
.parent {
    position: relative;
    z-index: 1;
}

.child {
    position: absolute;
    z-index: 9999;  /* Only compared within parent's stacking context */
}
```

### Common Z-Index Values

```css
.background {
    z-index: -1;
}

.content {
    z-index: 1;
}

.dropdown {
    z-index: 100;
}

.modal {
    z-index: 1000;
}

.tooltip {
    z-index: 1100;
}

.notification {
    z-index: 2000;
}
```

## Offset Properties

### Top, Right, Bottom, Left

Control the position of positioned elements:

```css
/* Distance from edges */
.element {
    position: absolute;
    top: 10px;     /* 10px from top */
    right: 20px;   /* 20px from right */
    bottom: 30px;  /* 30px from bottom */
    left: 40px;    /* 40px from left */
}

/* Negative values */
.element {
    position: relative;
    top: -10px;    /* Move up */
    left: -20px;   /* Move left */
}

/* Centering */
.element {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;  /* Centers element */
}

/* Alternative centering */
.element {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

## Practical Examples

### Modal Dialog

```css
/* Overlay */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

/* Modal */
.modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 30px;
    border-radius: 8px;
    z-index: 1001;
    max-width: 500px;
    width: 90%;
}
```

### Fixed Header with Content

```html
<style>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: #333;
    color: white;
    z-index: 100;
}

.content {
    padding-top: 60px;  /* Prevent hiding under header */
}
</style>

<div class="header">Fixed Header</div>
<div class="content">Main content...</div>
```

### Notification Badge

```css
.icon-container {
    position: relative;
    display: inline-block;
}

.badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background-color: red;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}
```

### Sticky Navigation

```css
.nav {
    position: sticky;
    top: 0;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 100;
}
```

### Dropdown Menu

```css
.dropdown {
    position: relative;
}

.dropdown-toggle {
    cursor: pointer;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    border: 1px solid #ddd;
    display: none;
    min-width: 200px;
    z-index: 10;
}

.dropdown:hover .dropdown-menu {
    display: block;
}
```

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Positioning</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
        }

        /* Fixed header */
        .header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color: #333;
            color: white;
            padding: 20px;
            z-index: 1000;
        }

        /* Content with padding for fixed header */
        .content {
            padding: 80px 20px 20px;
        }

        /* Sticky sidebar */
        .sidebar {
            position: sticky;
            top: 80px;
            float: left;
            width: 200px;
            background-color: #f0f0f0;
            padding: 20px;
            margin-right: 20px;
        }

        /* Relative positioning example */
        .relative-box {
            position: relative;
            top: 20px;
            left: 20px;
            background-color: lightblue;
            padding: 20px;
            margin: 20px 0;
        }

        /* Absolute positioning example */
        .container {
            position: relative;
            width: 300px;
            height: 200px;
            border: 2px solid #333;
            margin: 20px 0;
        }

        .absolute-box {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: orange;
            padding: 10px;
        }

        /* Back to top button */
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            z-index: 100;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>CSS Positioning Demo</h1>
    </div>

    <div class="content">
        <div class="sidebar">
            <h3>Sticky Sidebar</h3>
            <p>I stick to the top when scrolling</p>
        </div>

        <div style="margin-left: 240px;">
            <h2>Relative Positioning</h2>
            <div class="relative-box">
                This box is positioned relative to its normal position.
            </div>

            <h2>Absolute Positioning</h2>
            <div class="container">
                <div class="absolute-box">
                    Absolute
                </div>
                <p>This container has position: relative</p>
            </div>

            <p style="margin-top: 800px;">
                Scroll down to see sticky and fixed positioning in action.
            </p>
        </div>
    </div>

    <div class="back-to-top">
        ↑ Top
    </div>
</body>
</html>
```

## Best Practices

**Use relative for positioning context**: Create containers for absolute children.

**Avoid overusing absolute**: Can make layouts fragile and hard to maintain.

**Always set z-index thoughtfully**: Create a z-index scale for your project.

**Test sticky positioning**: Has good browser support but may need fallbacks for old browsers.

**Consider fixed positioning impact**: Add padding to prevent content from hiding under fixed elements.

**Use transform for centering**: More reliable than margin auto for absolute elements.

**Organize z-index values**: Use a consistent scale (100, 200, 1000, etc.).

## Common Pitfalls

**Forgetting positioning context**: Absolute elements need a positioned ancestor.

**Z-index without positioning**: Only works on positioned elements.

**Fixed elements and mobile**: Can cause issues on small screens.

**Sticky without offset**: Requires top, bottom, left, or right.

**Overusing position**: Many layouts are better with Flexbox or Grid.

## Conclusion

CSS positioning provides powerful tools for placing elements precisely on the page. Static is the default, relative creates positioning contexts, absolute removes elements from flow, fixed stays put during scrolling, and sticky combines the best of relative and fixed. Understanding when and how to use each positioning scheme, combined with z-index for stacking order, enables you to create complex, interactive layouts and UI components.
