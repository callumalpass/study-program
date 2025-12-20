## Introduction

Related rates problems involve finding how fast one quantity changes given information about how fast another related quantity changes. These problems require translating physical scenarios into mathematical relationships and then using implicit differentiation with respect to time.

**Why This Matters:**
Related rates appear throughout physics and engineering: fluid flowing into a tank, a ladder sliding down a wall, shadows lengthening, objects moving on paths. They model how interconnected quantities evolve together—essential for understanding dynamic systems.

**Learning Objectives:**
- Identify the rates and relationships in a physical scenario
- Write equations relating quantities
- Differentiate implicitly with respect to time
- Substitute known values to find unknown rates
- Interpret answers in physical context

---

## Core Concepts

### The Key Insight

If two quantities $x$ and $y$ are related by an equation, and both change with time $t$, then their rates of change are also related:

$$\frac{d}{dt}[\text{equation relating } x \text{ and } y]$$

This gives an equation relating $\frac{dx}{dt}$ and $\frac{dy}{dt}$.

### The Strategy

**Step 1: Draw and Label**
- Sketch the situation
- Assign variables to changing quantities
- Identify what's given (known rates) and what's asked (unknown rate)

**Step 2: Write an Equation**
- Find a relationship between the variables
- Common sources: Pythagorean theorem, similar triangles, area/volume formulas, trigonometry

**Step 3: Differentiate with Respect to Time**
- Use implicit differentiation
- Every variable gets $\frac{d(\cdot)}{dt}$
- Apply chain rule: $\frac{d}{dt}[f(x)] = f'(x) \cdot \frac{dx}{dt}$

**Step 4: Substitute and Solve**
- Plug in known values (at the specific instant)
- Solve for the unknown rate

**Step 5: Interpret**
- Include units
- Explain sign (increasing vs. decreasing)

---

## Classic Problem Types

### The Ladder Problem

A 10-foot ladder leans against a wall. The base slides away from the wall at 2 ft/sec. How fast is the top sliding down when the base is 6 feet from the wall?

**Setup:**
- Let $x$ = distance from wall to base of ladder
- Let $y$ = height of top of ladder
- Pythagorean theorem: $x^2 + y^2 = 100$

**Given:** $\frac{dx}{dt} = 2$ ft/sec
**Find:** $\frac{dy}{dt}$ when $x = 6$

**Differentiate:**
$$2x\frac{dx}{dt} + 2y\frac{dy}{dt} = 0$$

**Find $y$ when $x = 6$:**
$$36 + y^2 = 100 \implies y = 8$$

**Substitute and solve:**
$$2(6)(2) + 2(8)\frac{dy}{dt} = 0$$
$$24 + 16\frac{dy}{dt} = 0$$
$$\frac{dy}{dt} = -\frac{3}{2} \text{ ft/sec}$$

**Answer:** The top is sliding down at $\frac{3}{2}$ ft/sec.

### The Conical Tank Problem

Water flows into a conical tank at 2 m³/min. The tank has a height of 10 m and base radius 5 m. How fast is the water level rising when the water is 4 m deep?

**Setup:**
- Volume of cone: $V = \frac{1}{3}\pi r^2 h$
- Similar triangles: $\frac{r}{h} = \frac{5}{10} = \frac{1}{2}$, so $r = \frac{h}{2}$

**Substitute to get $V$ in terms of $h$:**
$$V = \frac{1}{3}\pi \left(\frac{h}{2}\right)^2 h = \frac{\pi h^3}{12}$$

**Given:** $\frac{dV}{dt} = 2$ m³/min
**Find:** $\frac{dh}{dt}$ when $h = 4$

**Differentiate:**
$$\frac{dV}{dt} = \frac{\pi}{12} \cdot 3h^2 \cdot \frac{dh}{dt} = \frac{\pi h^2}{4} \frac{dh}{dt}$$

**Substitute and solve:**
$$2 = \frac{\pi (16)}{4} \frac{dh}{dt} = 4\pi \frac{dh}{dt}$$
$$\frac{dh}{dt} = \frac{1}{2\pi} \approx 0.159 \text{ m/min}$$

### The Shadow Problem

A 6-foot person walks away from a 15-foot lamppost at 4 ft/sec. How fast is the shadow lengthening?

**Setup:**
- Let $x$ = distance from person to lamppost
- Let $s$ = length of shadow

**Similar triangles:**
$$\frac{15}{x + s} = \frac{6}{s}$$
$$15s = 6(x + s) = 6x + 6s$$
$$9s = 6x$$
$$s = \frac{2x}{3}$$

**Differentiate:**
$$\frac{ds}{dt} = \frac{2}{3}\frac{dx}{dt} = \frac{2}{3}(4) = \frac{8}{3} \text{ ft/sec}$$

**Note:** This rate is constant—it doesn't depend on where the person is!

### The Balloon Problem

A spherical balloon is being inflated at 100 cm³/sec. How fast is the radius increasing when the radius is 5 cm?

**Setup:**
- Volume of sphere: $V = \frac{4}{3}\pi r^3$

**Given:** $\frac{dV}{dt} = 100$
**Find:** $\frac{dr}{dt}$ when $r = 5$

**Differentiate:**
$$\frac{dV}{dt} = 4\pi r^2 \frac{dr}{dt}$$

**Substitute and solve:**
$$100 = 4\pi(25)\frac{dr}{dt}$$
$$\frac{dr}{dt} = \frac{100}{100\pi} = \frac{1}{\pi} \approx 0.318 \text{ cm/sec}$$

### The Distance Problem

Two cars start from the same point. Car A travels north at 60 mph; Car B travels east at 80 mph. How fast is the distance between them increasing after 2 hours?

**Setup:**
- After $t$ hours: $x = 80t$ (B's distance east), $y = 60t$ (A's distance north)
- Distance: $D^2 = x^2 + y^2$

**At $t = 2$:** $x = 160$, $y = 120$, $D = \sqrt{160^2 + 120^2} = 200$

**Differentiate:**
$$2D\frac{dD}{dt} = 2x\frac{dx}{dt} + 2y\frac{dy}{dt}$$
$$D\frac{dD}{dt} = x\frac{dx}{dt} + y\frac{dy}{dt}$$

**Substitute:**
$$200\frac{dD}{dt} = 160(80) + 120(60) = 12800 + 7200 = 20000$$
$$\frac{dD}{dt} = 100 \text{ mph}$$

### The Angle Problem

A camera at ground level is 4000 feet from a rocket launch pad. The rocket rises vertically. How fast is the camera's angle of elevation changing when the rocket is 3000 feet high and rising at 600 ft/sec?

**Setup:**
- Let $h$ = height of rocket
- Let $\theta$ = angle of elevation
- $\tan\theta = \frac{h}{4000}$

**Differentiate:**
$$\sec^2\theta \cdot \frac{d\theta}{dt} = \frac{1}{4000}\frac{dh}{dt}$$

**When $h = 3000$:**
- $\tan\theta = \frac{3}{4}$
- $\sec^2\theta = 1 + \tan^2\theta = 1 + \frac{9}{16} = \frac{25}{16}$

**Substitute:**
$$\frac{25}{16} \cdot \frac{d\theta}{dt} = \frac{600}{4000} = \frac{3}{20}$$
$$\frac{d\theta}{dt} = \frac{3}{20} \cdot \frac{16}{25} = \frac{48}{500} = 0.096 \text{ rad/sec}$$

---

## Common Relationships

| Scenario | Equation |
|----------|----------|
| Right triangle | $a^2 + b^2 = c^2$ |
| Similar triangles | $\frac{a}{b} = \frac{c}{d}$ |
| Circle area | $A = \pi r^2$ |
| Sphere volume | $V = \frac{4}{3}\pi r^3$ |
| Cone volume | $V = \frac{1}{3}\pi r^2 h$ |
| Cylinder volume | $V = \pi r^2 h$ |
| Angle (tangent) | $\tan\theta = \frac{\text{opposite}}{\text{adjacent}}$ |

---

## Common Mistakes and Debugging

### Mistake 1: Substituting Before Differentiating
Don't plug in numerical values until after you've differentiated. The relationship must hold for all time, not just one instant.

### Mistake 2: Forgetting Chain Rule
Every variable is a function of $t$. When differentiating $x^2$, you get $2x \frac{dx}{dt}$, not just $2x$.

### Mistake 3: Wrong Sign
Decreasing quantities have negative rates. A shrinking radius has $\frac{dr}{dt} < 0$.

### Mistake 4: Mixing Up Variables
Clearly define what each variable represents. Don't confuse total distance with rate of change.

### Mistake 5: Ignoring Units
Keep track of units throughout. This helps catch errors.

---

## Best Practices

1. **Draw a clear diagram** with all quantities labeled
2. **List what's given and what's asked** before starting
3. **Write the relationship first**, then differentiate
4. **Use the chain rule** on every term
5. **Substitute values only after differentiating**
6. **Check the sign** of your answer—does it make sense?
7. **Include units** in your final answer

---

## Summary

- **Related rates connect** rates of change of related quantities
- **Set up:** Draw, label, find equation, differentiate with respect to $t$
- **Chain rule is essential:** $\frac{d}{dt}[f(x)] = f'(x) \frac{dx}{dt}$
- **Classic problems:** Ladders, cones, shadows, balloons, distances, angles
- **Substitute after differentiating**, not before
- **Interpret the sign** of your answer in context

---

## Further Exploration

- **Differential Equations:** When rates depend on the quantity itself
- **Parametric Curves:** Position as functions of time
- **Physics Applications:** Circular motion, projectile motion
- **Fluid Mechanics:** Flow rates and pressure changes
