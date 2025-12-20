# Applied Optimization

Beyond geometry, optimization appears in economics, physics, engineering, and everyday decision-making. These problems follow the same calculus framework but require translating real-world scenarios into mathematical models.

## Economic Optimization

### Maximizing Revenue

**Revenue** is price times quantity: $R = p \cdot q$

If demand depends on price (demand function), we can express $R$ in terms of one variable.

**Example:** The demand for a product is $q = 500 - 2p$ units when the price is $p$ dollars. What price maximizes revenue?

$R = p \cdot q = p(500 - 2p) = 500p - 2p^2$

$R'(p) = 500 - 4p = 0$
$p = 125$

At $p = \$125$: $q = 250$ units, $R = \$31,250$

$R''(p) = -4 < 0$ → maximum

### Minimizing Cost

**Example:** A company needs to build a pipeline from an offshore oil rig to a refinery. The rig is 5 km offshore, and the refinery is 8 km along the coast. Underwater pipe costs \$500,000/km; land pipe costs \$300,000/km. Where should the pipeline come ashore?

**Setup:**
- Let $x$ = distance along coast from refinery to landing point
- Underwater distance: $\sqrt{25 + x^2}$
- Land distance: $8 - x$

**Cost:**
$C(x) = 500\sqrt{25 + x^2} + 300(8-x)$ (thousands)

**Optimize:**
$C'(x) = \frac{500x}{\sqrt{25 + x^2}} - 300 = 0$

$\frac{500x}{\sqrt{25+x^2}} = 300$
$\frac{5x}{3} = \sqrt{25+x^2}$
$\frac{25x^2}{9} = 25 + x^2$
$25x^2 = 225 + 9x^2$
$16x^2 = 225$
$x = 3.75$ km

**Solution:** Come ashore 3.75 km from the refinery (4.25 km from closest point).

### Profit Maximization

**Profit** = Revenue − Cost: $P = R - C$

**Example:** A manufacturer's cost function is $C(x) = 0.1x^2 + 5x + 500$ and demand is $p = 50 - 0.05x$. Find the production level that maximizes profit.

$R(x) = x \cdot p = x(50 - 0.05x) = 50x - 0.05x^2$

$P(x) = R(x) - C(x) = 50x - 0.05x^2 - 0.1x^2 - 5x - 500$
$= 45x - 0.15x^2 - 500$

$P'(x) = 45 - 0.3x = 0$
$x = 150$ units

Maximum profit: $P(150) = 45(150) - 0.15(150)^2 - 500 = 6750 - 3375 - 500 = \$2875$

## Physics Applications

### Projectile Range

**Problem:** At what angle should a projectile be launched to maximize horizontal range (assuming no air resistance)?

The range formula is $R = \frac{v_0^2 \sin(2\theta)}{g}$

$\frac{dR}{d\theta} = \frac{v_0^2 \cdot 2\cos(2\theta)}{g} = 0$

$\cos(2\theta) = 0$
$2\theta = 90°$
$\theta = 45°$

**Solution:** Launch at 45° for maximum range.

### Minimum Energy

Many physical systems minimize energy. The shape of a hanging chain (catenary), soap bubbles, and orbital paths all result from energy minimization principles.

## Engineering Applications

### Beam Strength

**Problem:** A rectangular beam is cut from a cylindrical log of radius $R$. The strength of the beam is proportional to $S = wh^2$ where $w$ is width and $h$ is height. Find optimal dimensions.

**Constraint:** $w^2 + h^2 = (2R)^2 = 4R^2$ (beam fits in circle)

$w = \sqrt{4R^2 - h^2}$

$S(h) = h^2\sqrt{4R^2 - h^2}$

This requires careful differentiation (product rule + chain rule):

$S'(h) = 2h\sqrt{4R^2 - h^2} + h^2 \cdot \frac{-2h}{2\sqrt{4R^2 - h^2}}$
$= 2h\sqrt{4R^2 - h^2} - \frac{h^3}{\sqrt{4R^2 - h^2}}$

Set to zero and solve:
$2h(4R^2 - h^2) = h^3$
$8R^2h - 2h^3 = h^3$
$8R^2 = 3h^2$
$h = \frac{2\sqrt{2}R}{\sqrt{3}}$

Then $w = \sqrt{4R^2 - \frac{8R^2}{3}} = \frac{2R}{\sqrt{3}}$

Ratio: $h:w = \sqrt{2}:1$

### Optimal Viewing Angle

**Problem:** A painting 3 m tall hangs with its bottom 2 m above your eye level. How far should you stand to maximize the viewing angle?

**Setup:** Let $x$ = distance from wall.

The viewing angle is $\theta = \arctan\frac{5}{x} - \arctan\frac{2}{x}$

$\frac{d\theta}{dx} = \frac{-5/x^2}{1+(5/x)^2} - \frac{-2/x^2}{1+(2/x)^2}$
$= \frac{-5}{x^2+25} + \frac{2}{x^2+4}$

Set to zero: $\frac{2}{x^2+4} = \frac{5}{x^2+25}$

$2(x^2+25) = 5(x^2+4)$
$2x^2 + 50 = 5x^2 + 20$
$30 = 3x^2$
$x = \sqrt{10} \approx 3.16$ m

## General Problem-Solving Tips

1. **Draw a diagram** — visualize the setup
2. **List knowns and unknowns** — what's given, what's asked
3. **Identify the objective** — what to maximize/minimize
4. **Find relationships** — physics formulas, geometry, economics
5. **Reduce to one variable** — use constraints
6. **Apply calculus** — differentiate, find critical points
7. **Check your answer** — does it make sense?

## Summary

- Economic optimization: maximize profit/revenue, minimize cost
- Revenue = price × quantity; Profit = Revenue − Cost
- Physics problems use physical laws as constraints
- Engineering problems balance competing factors
- The calculus framework (reduce to one variable, differentiate, find critical points) applies universally
- Always verify answers make physical/economic sense
