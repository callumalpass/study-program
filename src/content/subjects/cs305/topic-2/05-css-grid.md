# CSS Grid

CSS Grid is a powerful two-dimensional layout system that enables complex layouts with rows and columns. Unlike Flexbox which handles one dimension at a time, Grid excels at creating sophisticated page layouts, magazine-style designs, and responsive grids. Grid is essential for modern web development and provides precise control over element positioning.

## Understanding CSS Grid

Grid consists of two main components:

**Grid Container**: The parent element with `display: grid` or `display: inline-grid`.

**Grid Items**: The direct children of the grid container.

```html
<div class="grid-container">  <!-- Grid container -->
    <div>Item 1</div>         <!-- Grid item -->
    <div>Item 2</div>         <!-- Grid item -->
    <div>Item 3</div>         <!-- Grid item -->
</div>
```

```css
.grid-container {
    display: grid;
}
```

## Grid Terminology

**Grid Line**: The dividing lines that make up the structure (horizontal and vertical).

**Grid Track**: The space between two grid lines (a row or column).

**Grid Cell**: The space between four grid lines (like a table cell).

**Grid Area**: Rectangular space surrounded by four grid lines, can span multiple cells.

```
Grid Lines (numbered)
1   2   3   4
├───┼───┼───┤ 1
│   │   │   │
├───┼───┼───┤ 2
│   │   │   │
├───┼───┼───┤ 3

Grid Tracks: rows and columns
Grid Cells: individual boxes
Grid Areas: groups of cells
```

## Grid Container Properties

### Display

Create a grid container:

```css
/* Block-level grid */
.container {
    display: grid;
}

/* Inline grid */
.container {
    display: inline-grid;
}
```

### Grid Template Columns

Define column tracks:

```css
/* Three equal columns */
.container {
    grid-template-columns: 200px 200px 200px;
}

/* Different sized columns */
.container {
    grid-template-columns: 100px 200px 300px;
}

/* Using fr (fraction) units */
.container {
    grid-template-columns: 1fr 2fr 1fr;  /* 1/4, 2/4, 1/4 */
}

/* Mixed units */
.container {
    grid-template-columns: 200px 1fr 2fr;
}

/* Using repeat() */
.container {
    grid-template-columns: repeat(3, 200px);  /* Same as 200px 200px 200px */
    grid-template-columns: repeat(4, 1fr);    /* Four equal columns */
}

/* Auto columns */
.container {
    grid-template-columns: auto auto auto;
}

/* Minimum and maximum */
.container {
    grid-template-columns: minmax(100px, 300px) 1fr 1fr;
}
```

### Grid Template Rows

Define row tracks:

```css
/* Three rows */
.container {
    grid-template-rows: 100px 200px 100px;
}

/* Using fr units */
.container {
    grid-template-rows: 1fr 2fr 1fr;
}

/* Auto rows */
.container {
    grid-template-rows: auto;
}

/* With repeat */
.container {
    grid-template-rows: repeat(3, 150px);
}
```

### Grid Template Areas

Define named grid areas:

```css
.container {
    grid-template-areas:
        "header header header"
        "sidebar content content"
        "footer footer footer";
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.content { grid-area: content; }
.footer  { grid-area: footer; }
```

Use `.` for empty cells:

```css
.container {
    grid-template-areas:
        "header header header"
        "sidebar content ."
        "footer footer footer";
}
```

### Gap (Grid Gap)

Spacing between grid cells:

```css
/* Both row and column gap */
.container {
    gap: 20px;
}

/* Separate row and column gap */
.container {
    row-gap: 10px;
    column-gap: 20px;
}

/* Shorthand */
.container {
    gap: 10px 20px;  /* row-gap column-gap */
}

/* Legacy syntax (still supported) */
.container {
    grid-gap: 20px;
    grid-row-gap: 10px;
    grid-column-gap: 20px;
}
```

### Justify Items

Align items horizontally within their cells:

```css
.container {
    justify-items: start;    /* Left align */
    justify-items: end;      /* Right align */
    justify-items: center;   /* Center */
    justify-items: stretch;  /* Fill width (default) */
}
```

### Align Items

Align items vertically within their cells:

```css
.container {
    align-items: start;    /* Top align */
    align-items: end;      /* Bottom align */
    align-items: center;   /* Center */
    align-items: stretch;  /* Fill height (default) */
}
```

### Place Items

Shorthand for align-items and justify-items:

```css
.container {
    place-items: center;           /* Both centered */
    place-items: start end;        /* align-items start, justify-items end */
}
```

### Justify Content

Align entire grid horizontally within container:

```css
.container {
    justify-content: start;
    justify-content: end;
    justify-content: center;
    justify-content: stretch;
    justify-content: space-between;
    justify-content: space-around;
    justify-content: space-evenly;
}
```

### Align Content

Align entire grid vertically within container:

```css
.container {
    align-content: start;
    align-content: end;
    align-content: center;
    align-content: stretch;
    align-content: space-between;
    align-content: space-around;
    align-content: space-evenly;
}
```

### Place Content

Shorthand for align-content and justify-content:

```css
.container {
    place-content: center;
    place-content: space-between center;
}
```

### Grid Auto Flow

Control auto-placement algorithm:

```css
/* Row (default): fill rows first */
.container {
    grid-auto-flow: row;
}

/* Column: fill columns first */
.container {
    grid-auto-flow: column;
}

/* Dense: fill holes in grid */
.container {
    grid-auto-flow: dense;
}

/* Row dense */
.container {
    grid-auto-flow: row dense;
}
```

### Grid Auto Columns / Rows

Set size for implicitly created tracks:

```css
.container {
    grid-auto-columns: 100px;
    grid-auto-rows: 150px;
}

/* With minmax */
.container {
    grid-auto-rows: minmax(100px, auto);
}
```

## Grid Item Properties

### Grid Column Start / End

Position items by column lines:

```css
.item {
    grid-column-start: 1;
    grid-column-end: 3;  /* Spans from line 1 to 3 */
}

/* Shorthand */
.item {
    grid-column: 1 / 3;  /* Start / end */
}

/* Span keyword */
.item {
    grid-column: 1 / span 2;  /* Start at 1, span 2 columns */
    grid-column: span 2;      /* Span 2 columns from auto position */
}
```

### Grid Row Start / End

Position items by row lines:

```css
.item {
    grid-row-start: 1;
    grid-row-end: 3;
}

/* Shorthand */
.item {
    grid-row: 1 / 3;
    grid-row: span 2;
}
```

### Grid Area

Shorthand for all positioning:

```css
/* grid-row-start / grid-column-start / grid-row-end / grid-column-end */
.item {
    grid-area: 1 / 1 / 3 / 3;
}

/* Or use named area */
.item {
    grid-area: header;
}
```

### Justify Self

Override justify-items for individual item:

```css
.item {
    justify-self: start;
    justify-self: end;
    justify-self: center;
    justify-self: stretch;
}
```

### Align Self

Override align-items for individual item:

```css
.item {
    align-self: start;
    align-self: end;
    align-self: center;
    align-self: stretch;
}
```

### Place Self

Shorthand for align-self and justify-self:

```css
.item {
    place-self: center;
    place-self: start end;
}
```

## Common Grid Patterns

### Basic Grid Layout

```css
.grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}
```

### Responsive Grid (Auto-Fit)

```css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
}
```

Items automatically adjust based on available space.

### Page Layout

```css
.container {
    display: grid;
    grid-template-areas:
        "header header header"
        "nav content sidebar"
        "footer footer footer";
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
    gap: 10px;
}

.header  { grid-area: header; }
.nav     { grid-area: nav; }
.content { grid-area: content; }
.sidebar { grid-area: sidebar; }
.footer  { grid-area: footer; }
```

### Card Grid with Different Sizes

```css
.grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.card-large {
    grid-column: span 2;
    grid-row: span 2;
}

.card-wide {
    grid-column: span 2;
}

.card-tall {
    grid-row: span 2;
}
```

### Holy Grail Layout

```css
.container {
    display: grid;
    grid-template-areas:
        "header header header"
        "left content right"
        "footer footer footer";
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}
```

### Magazine Layout

```css
.magazine {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: 200px;
    gap: 10px;
}

.feature {
    grid-column: span 3;
    grid-row: span 2;
}

.article {
    grid-column: span 2;
}
```

## Auto-Responsive Grids

### Auto-Fit

Fit as many items as possible:

```css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}
```

### Auto-Fill

Create as many tracks as possible:

```css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
}
```

**Difference**:
- `auto-fit`: Collapses empty tracks
- `auto-fill`: Keeps empty tracks

## Advanced Techniques

### Overlapping Grid Items

```css
.item1 {
    grid-area: 1 / 1 / 3 / 3;
    z-index: 1;
}

.item2 {
    grid-area: 2 / 2 / 4 / 4;
    z-index: 2;
}
```

### Asymmetric Grid

```css
.grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: 100px auto 100px;
}
```

### Nested Grids

```css
.outer-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}

.inner-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
```

## Responsive Grid

```css
.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

@media (min-width: 768px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (min-width: 1440px) {
    .grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
```

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Grid Layout</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
        }

        .container {
            display: grid;
            grid-template-areas:
                "header header header"
                "sidebar content content"
                "footer footer footer";
            grid-template-columns: 200px 1fr 1fr;
            grid-template-rows: auto 1fr auto;
            gap: 10px;
            min-height: 100vh;
            padding: 10px;
        }

        .header {
            grid-area: header;
            background-color: #333;
            color: white;
            padding: 20px;
            text-align: center;
        }

        .sidebar {
            grid-area: sidebar;
            background-color: #f0f0f0;
            padding: 20px;
        }

        .content {
            grid-area: content;
            padding: 20px;
        }

        .footer {
            grid-area: footer;
            background-color: #333;
            color: white;
            padding: 20px;
            text-align: center;
        }

        /* Card grid inside content */
        .card-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .card {
            background-color: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .card-featured {
            grid-column: span 2;
            background-color: #007bff;
            color: white;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .container {
                grid-template-areas:
                    "header"
                    "content"
                    "sidebar"
                    "footer";
                grid-template-columns: 1fr;
            }

            .card-featured {
                grid-column: span 1;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>CSS Grid Layout</h1>
        </header>

        <aside class="sidebar">
            <h3>Sidebar</h3>
            <ul>
                <li>Link 1</li>
                <li>Link 2</li>
                <li>Link 3</li>
            </ul>
        </aside>

        <main class="content">
            <h2>Main Content</h2>
            <p>This layout uses CSS Grid with named areas.</p>

            <div class="card-grid">
                <div class="card card-featured">
                    <h3>Featured Card</h3>
                    <p>This card spans two columns.</p>
                </div>
                <div class="card">
                    <h3>Card 1</h3>
                    <p>Regular card content.</p>
                </div>
                <div class="card">
                    <h3>Card 2</h3>
                    <p>Regular card content.</p>
                </div>
                <div class="card">
                    <h3>Card 3</h3>
                    <p>Regular card content.</p>
                </div>
            </div>
        </main>

        <footer class="footer">
            <p>&copy; 2025 Grid Layout Demo</p>
        </footer>
    </div>
</body>
</html>
```

## Grid vs Flexbox

**Use Grid for**:
- Two-dimensional layouts (rows AND columns)
- Page-level layouts
- Complex grids
- When you need precise placement

**Use Flexbox for**:
- One-dimensional layouts (row OR column)
- Navigation bars
- Card layouts
- Centering content
- When order matters

**Use Both**:
Grid for page layout, Flexbox for components within grid items.

## Browser Support

CSS Grid is supported in all modern browsers:
- Chrome 57+
- Firefox 52+
- Safari 10.1+
- Edge 16+
- IE 11 (partial, with -ms- prefix)

## Best Practices

**Use fr units**: More flexible than percentages.

**Name grid areas**: Makes code more readable and maintainable.

**Use gap instead of margins**: Cleaner spacing.

**Mobile-first**: Start with single column, add complexity for larger screens.

**Use auto-fit/auto-fill**: Create responsive grids without media queries.

**Combine with Flexbox**: Use Grid for layout, Flexbox for components.

**Test in DevTools**: All browsers have grid visualization tools.

## Conclusion

CSS Grid is the most powerful layout system in CSS, enabling complex two-dimensional layouts with clean, semantic code. By mastering grid container properties (grid-template-columns, grid-template-areas, gap) and grid item properties (grid-column, grid-row, grid-area), you can create sophisticated layouts that were previously impossible or required extensive hacks. Grid, combined with Flexbox, provides complete control over modern web layouts.
