# Motion and Distance Problems

Related rates problems involving motion typically use the Pythagorean theorem or distance formulas. These problems track moving objects and ask how fast distances or angles change.

## The Ladder Problem Family

### Classic Ladder Problem

**Problem:** A 13-foot ladder rests against a wall. The base slides away from the wall at 2 ft/s. How fast is the top sliding down when the base is 5 feet from the wall?

**Relationship:** $x^2 + y^2 = 169$

**Differentiate:**
$$2x\frac{dx}{dt} + 2y\frac{dy}{dt} = 0$$

$$x\frac{dx}{dt} + y\frac{dy}{dt} = 0$$

**Find $y$ when $x = 5$:**
$25 + y^2 = 169$, so $y = 12$

**Substitute:**
$(5)(2) + (12)\frac{dy}{dt} = 0$

$\frac{dy}{dt} = -\frac{10}{12} = -\frac{5}{6}$ ft/s

The top slides down at $\frac{5}{6}$ ft/s.

### What Happens Near the Ground?

As $y \to 0$ (ladder nearly horizontal):
- $x \to 13$
- $\frac{dy}{dt} = -\frac{x}{y}\frac{dx}{dt}$

As $y$ gets small, $\frac{dy}{dt}$ becomes very large (in magnitude). The top accelerates downward as it approaches the ground.

## Two Moving Objects

### Cars at an Intersection

**Problem:** Car A travels north at 60 mph. Car B travels east at 80 mph. Both started at the intersection. How fast is the distance between them increasing after 1 hour?

**Setup:**
- After $t$ hours: Car A is at $(0, 60t)$, Car B is at $(80t, 0)$
- Distance: $D^2 = (60t)^2 + (80t)^2 = 3600t^2 + 6400t^2 = 10000t^2$
- $D = 100t$ (distance at time $t$)

**Differentiate:**
$\frac{dD}{dt} = 100$ mph

The distance increases at a constant 100 mph (regardless of time).

**Alternative approach (general method):**
Let $x$ = position of car B, $y$ = position of car A
$D^2 = x^2 + y^2$

$$2D\frac{dD}{dt} = 2x\frac{dx}{dt} + 2y\frac{dy}{dt}$$

$$\frac{dD}{dt} = \frac{x\frac{dx}{dt} + y\frac{dy}{dt}}{D}$$

At $t = 1$: $x = 80$, $y = 60$, $D = 100$

$$\frac{dD}{dt} = \frac{(80)(80) + (60)(60)}{100} = \frac{6400 + 3600}{100} = 100 \text{ mph}$$

### Approaching Each Other

**Problem:** Two cars start 100 miles apart. Car A travels east at 40 mph, Car B travels west at 60 mph. How fast is the distance between them decreasing?

Since they approach each other:
$\frac{dD}{dt} = -(40 + 60) = -100$ mph

The distance decreases at 100 mph. They meet in 1 hour.

### Cars Not at Right Angles

**Problem:** Car A is 3 miles east of an intersection, heading east at 50 mph. Car B is 4 miles north, heading north at 40 mph. How fast is the distance between them changing?

**Setup:**
- A at $(3 + 50t, 0)$, B at $(0, 4 + 40t)$
- $D^2 = (3 + 50t)^2 + (4 + 40t)^2$

**At $t = 0$:**
- $x = 3$, $y = 4$, $D = 5$
- $\frac{dx}{dt} = 50$, $\frac{dy}{dt} = 40$

**Differentiate $D^2 = x^2 + y^2$:**
$$\frac{dD}{dt} = \frac{x\frac{dx}{dt} + y\frac{dy}{dt}}{D} = \frac{(3)(50) + (4)(40)}{5} = \frac{150 + 160}{5} = 62 \text{ mph}$$

They're moving apart at 62 mph.

## Shadow Problems

### Walking Away from a Lamppost

**Problem:** A 6-foot person walks away from a 15-foot lamppost at 4 ft/s. How fast is:
(a) the shadow lengthening?
(b) the tip of the shadow moving?

**Setup with similar triangles:**
```
      *  (light at 15 ft)
     /|
    / |
   /  | 15
  /   |
 /    |
*-----+--------+-----*
      |  x     |  s  | tip
      person   |     |
      (6 ft)   |
```

Let $x$ = distance from post to person, $s$ = shadow length

**Similar triangles:**
$$\frac{15}{x + s} = \frac{6}{s}$$

Cross multiply: $15s = 6(x + s) = 6x + 6s$

$9s = 6x$

$s = \frac{2x}{3}$

**(a) Shadow lengthening:**
$$\frac{ds}{dt} = \frac{2}{3}\frac{dx}{dt} = \frac{2}{3}(4) = \frac{8}{3} \text{ ft/s}$$

**(b) Tip of shadow moving:**
The tip is at position $x + s$ from the post.

$$\frac{d(x+s)}{dt} = \frac{dx}{dt} + \frac{ds}{dt} = 4 + \frac{8}{3} = \frac{20}{3} \text{ ft/s}$$

**Observation:** Both rates are constant—they don't depend on $x$.

### Walking Toward a Lamppost

Same setup, but $\frac{dx}{dt} = -4$ ft/s (approaching):

$\frac{ds}{dt} = \frac{2}{3}(-4) = -\frac{8}{3}$ ft/s (shadow shortening)

## Ship and Lighthouse

**Problem:** A ship sails north at 20 km/h past a lighthouse that is 5 km offshore. How fast is the distance from the ship to the lighthouse changing when the ship is 12 km north of the point closest to the lighthouse?

**Setup:**
- Lighthouse at origin (on shore)
- Ship at $(5, y)$ where $y$ = distance north of closest point
- Distance: $D^2 = 25 + y^2$

**Differentiate:**
$$2D\frac{dD}{dt} = 2y\frac{dy}{dt}$$

**When $y = 12$:** $D = \sqrt{25 + 144} = 13$

$$\frac{dD}{dt} = \frac{y\frac{dy}{dt}}{D} = \frac{(12)(20)}{13} = \frac{240}{13} \approx 18.5 \text{ km/h}$$

## Airplane Problems

**Problem:** A plane flies horizontally at altitude 2 miles, at 500 mph. It passes directly over a radar station. How fast is the distance from the plane to the station increasing 30 seconds later?

**Setup:**
- After $t$ hours: plane at horizontal distance $x = 500t$ from overhead point
- Altitude: $h = 2$ miles (constant)
- Distance: $D^2 = x^2 + 4$

**Differentiate:**
$$\frac{dD}{dt} = \frac{x\frac{dx}{dt}}{D} = \frac{x \cdot 500}{\sqrt{x^2 + 4}}$$

**After 30 seconds = $\frac{1}{120}$ hour:**
$x = 500 \times \frac{1}{120} = \frac{25}{6}$ miles

$D = \sqrt{\frac{625}{36} + 4} = \sqrt{\frac{625 + 144}{36}} = \frac{\sqrt{769}}{6}$

$$\frac{dD}{dt} = \frac{\frac{25}{6} \times 500}{\frac{\sqrt{769}}{6}} = \frac{12500}{\sqrt{769}} \approx 451 \text{ mph}$$

## Summary

- Motion problems typically use $D^2 = x^2 + y^2$
- Differentiate to get $D\frac{dD}{dt} = x\frac{dx}{dt} + y\frac{dy}{dt}$
- Shadow problems use similar triangles to relate quantities
- Moving apart: positive $\frac{dD}{dt}$; approaching: negative
- The rate of distance change varies with position
