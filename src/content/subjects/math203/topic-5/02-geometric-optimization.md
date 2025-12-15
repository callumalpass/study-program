# Geometric Optimization Problems

Many classic optimization problems involve finding optimal dimensions for geometric shapes—maximizing area, minimizing surface area, or optimizing volume. These problems develop the core optimization skills.

## Maximum Area Problems

### Fenced Region Against a Wall

**Problem:** A farmer uses 200 m of fencing to enclose a rectangular field against a river (no fence needed on the river side). What dimensions maximize the area?

**Setup:**
- Let $x$ = width (sides perpendicular to river)
- Let $y$ = length (parallel to river)
- Constraint: $2x + y = 200$ (two widths, one length)
- Objective: $A = xy$

**Reduce to one variable:**
$y = 200 - 2x$
$A(x) = x(200 - 2x) = 200x - 2x^2$

**Domain:** $0 < x < 100$

**Optimize:**
$A'(x) = 200 - 4x = 0$
$x = 50$

$A''(x) = -4 < 0$ → maximum

**Solution:** $x = 50$ m, $y = 100$ m, Area = 5000 m²

**Notice:** Without the river, optimal was a square. With one side free, optimal is a different ratio (2:1).

### Rectangle Inscribed in a Circle

**Problem:** Find the rectangle of maximum area inscribed in a circle of radius $r$.

**Setup:**
- Place circle at origin: $x^2 + y^2 = r^2$
- Rectangle vertices at $(\pm a, \pm b)$
- Constraint: $a^2 + b^2 = r^2$
- Objective: $A = (2a)(2b) = 4ab$

**Reduce to one variable:**
$b = \sqrt{r^2 - a^2}$
$A(a) = 4a\sqrt{r^2 - a^2}$

**Optimize:** (Using product rule and chain rule)
$A'(a) = 4\sqrt{r^2 - a^2} + 4a \cdot \frac{-2a}{2\sqrt{r^2 - a^2}}$
$= 4\sqrt{r^2 - a^2} - \frac{4a^2}{\sqrt{r^2 - a^2}}$
$= \frac{4(r^2 - a^2) - 4a^2}{\sqrt{r^2 - a^2}} = \frac{4r^2 - 8a^2}{\sqrt{r^2 - a^2}}$

Set equal to 0: $4r^2 - 8a^2 = 0$, so $a = \frac{r}{\sqrt{2}}$

Then $b = \sqrt{r^2 - r^2/2} = \frac{r}{\sqrt{2}}$

**Solution:** The optimal rectangle is a **square** with side $\frac{2r}{\sqrt{2}} = r\sqrt{2}$.

## Minimum Perimeter Problems

### Fixed Area Rectangle

**Problem:** Among all rectangles with area 100 cm², find the one with minimum perimeter.

**Setup:**
- Constraint: $xy = 100$
- Objective: $P = 2x + 2y$

**Reduce:** $y = \frac{100}{x}$
$P(x) = 2x + \frac{200}{x}$

**Domain:** $x > 0$

**Optimize:**
$P'(x) = 2 - \frac{200}{x^2} = 0$
$x^2 = 100$
$x = 10$ (positive only)

$P''(x) = \frac{400}{x^3} > 0$ for $x > 0$ → minimum

**Solution:** $x = y = 10$ cm, perimeter = 40 cm (a square)

## Volume Optimization

### Open-Top Box from a Sheet

**Problem:** A square sheet of metal with side 12 inches has squares cut from each corner. The sides are folded up to make an open-top box. What size squares maximize the volume?

**Setup:**
- Let $x$ = side of cut squares
- After folding: base is $(12-2x) \times (12-2x)$, height is $x$
- Objective: $V = x(12-2x)^2$

**Domain:** $0 < x < 6$

**Optimize:**
$V = x(144 - 48x + 4x^2) = 4x^3 - 48x^2 + 144x$
$V' = 12x^2 - 96x + 144 = 12(x^2 - 8x + 12) = 12(x-2)(x-6)$

Critical points: $x = 2$ and $x = 6$

$x = 6$ is at boundary (volume = 0)
At $x = 2$: $V = 2(8)^2 = 128$ cubic inches

**Solution:** Cut 2-inch squares for maximum volume of 128 in³.

### Cylindrical Can

**Problem:** A cylindrical can must hold 1000 cm³. What dimensions minimize the surface area?

**Setup:**
- Let $r$ = radius, $h$ = height
- Constraint: $V = \pi r^2 h = 1000$
- Objective: $S = 2\pi r^2 + 2\pi rh$ (top, bottom, and side)

**Reduce:** $h = \frac{1000}{\pi r^2}$
$S(r) = 2\pi r^2 + 2\pi r \cdot \frac{1000}{\pi r^2} = 2\pi r^2 + \frac{2000}{r}$

**Optimize:**
$S'(r) = 4\pi r - \frac{2000}{r^2} = 0$
$4\pi r^3 = 2000$
$r^3 = \frac{500}{\pi}$
$r = \sqrt[3]{\frac{500}{\pi}} \approx 5.42$ cm

$h = \frac{1000}{\pi r^2} = \frac{1000}{\pi \cdot (500/\pi)^{2/3}} \approx 10.84$ cm

**Key relationship:** $h = 2r$ (height equals diameter)

**Solution:** For a closed cylinder with fixed volume, minimum surface area occurs when height = diameter.

## Summary of Common Results

| Problem | Optimal Shape |
|---------|---------------|
| Max area rectangle, fixed perimeter | Square |
| Max area rectangle in circle | Square |
| Min perimeter rectangle, fixed area | Square |
| Open-top box from square sheet | Cut squares of side $\frac{\text{sheet side}}{6}$ |
| Closed cylinder, fixed volume | Height = diameter |

## Summary

- Geometric optimization combines calculus with geometry formulas
- Always identify the constraint and objective function
- Reduce to one variable before differentiating
- Check domain restrictions based on physical constraints
- Verify with second derivative test or reasoning
- Many problems have elegant optimal ratios (squares, height = diameter)
