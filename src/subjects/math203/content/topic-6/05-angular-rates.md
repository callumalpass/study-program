---
id: math203-t6-angular
title: "Angular Related Rates"
order: 5
---

# Angular Related Rates

Some problems involve angles that change with time. These problems use trigonometric functions to relate angles to other quantities, then differentiate to find angular rates.

## Basic Setup

When a point moves and we track an angle:
- Define the angle clearly (from what reference?)
- Express the angle using $\tan$, $\sin$, or $\cos$
- Differentiate using chain rule

**Key derivatives:**
- $\frac{d}{dt}[\tan\theta] = \sec^2\theta \cdot \frac{d\theta}{dt}$
- $\frac{d}{dt}[\sin\theta] = \cos\theta \cdot \frac{d\theta}{dt}$
- $\frac{d}{dt}[\cos\theta] = -\sin\theta \cdot \frac{d\theta}{dt}$

## Rotating Searchlight

**Problem:** A searchlight rotates at 2 revolutions per minute. The light is 1 km from a straight shoreline. How fast is the light beam moving along the shore when it makes a 45° angle with the perpendicular to the shore?

**Setup:**
```
  shore
--------*-------
        |θ\
        |  \
    1km |   \  beam
        |    \
        o (light)
```

Let $x$ = distance along shore from the closest point.

**Relationship:** $\tan\theta = \frac{x}{1} = x$

**Differentiate:**
$$\sec^2\theta \cdot \frac{d\theta}{dt} = \frac{dx}{dt}$$

**Given:** $\frac{d\theta}{dt} = 2$ rev/min $= 4\pi$ rad/min

**At $\theta = 45°$:** $\sec^2(45°) = 2$

$$\frac{dx}{dt} = 2 \cdot 4\pi = 8\pi \text{ km/min} \approx 25.1 \text{ km/min}$$

The beam moves faster along the shore as the angle increases (reaches toward infinity as $\theta \to 90°$).

## Camera Tracking a Rocket

**Problem:** A camera 3000 feet from a launch pad tracks a rocket rising vertically. The rocket rises at 800 ft/s. How fast must the camera angle change when the rocket is 4000 feet high?

**Setup:**
- Camera at ground level, 3000 ft from launch pad
- Rocket at height $h$
- Angle of elevation: $\theta$

**Relationship:** $\tan\theta = \frac{h}{3000}$

**Differentiate:**
$$\sec^2\theta \cdot \frac{d\theta}{dt} = \frac{1}{3000}\frac{dh}{dt}$$

**At $h = 4000$:**
- $\tan\theta = \frac{4000}{3000} = \frac{4}{3}$
- Distance to rocket: $\sqrt{3000^2 + 4000^2} = 5000$
- $\sec\theta = \frac{5000}{3000} = \frac{5}{3}$
- $\sec^2\theta = \frac{25}{9}$

**Solve:**
$$\frac{25}{9} \cdot \frac{d\theta}{dt} = \frac{800}{3000} = \frac{4}{15}$$

$$\frac{d\theta}{dt} = \frac{4}{15} \cdot \frac{9}{25} = \frac{36}{375} = \frac{12}{125} = 0.096 \text{ rad/s}$$

Convert to degrees: $0.096 \times \frac{180}{\pi} \approx 5.5°/\text{s}$

## Ladder Angle

**Problem:** In the classic ladder problem (13-ft ladder, base sliding at 2 ft/s), how fast is the angle between ladder and ground changing when the base is 5 feet from the wall?

**Setup:** $\cos\theta = \frac{x}{13}$

**Differentiate:**
$$-\sin\theta \cdot \frac{d\theta}{dt} = \frac{1}{13}\frac{dx}{dt}$$

**At $x = 5$:** $y = 12$, $\sin\theta = \frac{12}{13}$

$$-\frac{12}{13} \cdot \frac{d\theta}{dt} = \frac{1}{13}(2)$$

$$\frac{d\theta}{dt} = -\frac{2}{12} = -\frac{1}{6} \text{ rad/s}$$

The angle decreases at $\frac{1}{6}$ rad/s (about 9.5°/s).

## Rotating Rod

**Problem:** A rod of length 10 meters rotates about one end, which is fixed at the origin. The other end moves along the positive x-axis. If the angle with the x-axis decreases at 0.1 rad/s, how fast is the endpoint moving when the angle is 60°?

**Setup:** The endpoint is at $(10\cos\theta, 0)$ where $\theta$ is measured from x-axis.

Actually, if the end stays on the x-axis: $x = 10\cos\theta$

**Differentiate:**
$$\frac{dx}{dt} = -10\sin\theta \cdot \frac{d\theta}{dt}$$

**At $\theta = 60°$:**
$$\frac{dx}{dt} = -10 \cdot \frac{\sqrt{3}}{2} \cdot (-0.1) = 0.5\sqrt{3} \approx 0.866 \text{ m/s}$$

The endpoint moves right at about 0.866 m/s.

## Angle Between Moving Objects

**Problem:** Ship A is 5 km south of a lighthouse, sailing east at 15 km/h. Ship B is at the lighthouse, sailing south at 10 km/h. How fast is the angle at ship B (angle between the ships as seen from B's position) changing after 1 hour?

**After $t$ hours:**
- A is at $(15t, -5)$ (started 5 south, moved east)
- B is at $(0, -10t)$ (moved south)

**Vector from B to A:** $(15t, -5 + 10t)$

The angle $\theta$ from south direction (negative y-axis):
$$\tan\theta = \frac{15t}{5 - 10t}$$

At $t = 1$: B is at $(0, -10)$, A is at $(15, -5)$

Vector from B to A: $(15, 5)$

$\tan\theta = \frac{15}{5} = 3$

**Differentiate** $\tan\theta = \frac{15t}{5-10t}$:

$$\sec^2\theta \cdot \frac{d\theta}{dt} = \frac{15(5-10t) - 15t(-10)}{(5-10t)^2} = \frac{75 - 150t + 150t}{(5-10t)^2} = \frac{75}{(5-10t)^2}$$

At $t = 1$: $(5 - 10)^2 = 25$

$\sec^2\theta = 1 + \tan^2\theta = 1 + 9 = 10$

$$10 \cdot \frac{d\theta}{dt} = \frac{75}{25} = 3$$

$$\frac{d\theta}{dt} = 0.3 \text{ rad/h}$$

## Using Inverse Trig Functions

Alternative approach: If $\tan\theta = f(t)$, then $\theta = \arctan(f(t))$

$$\frac{d\theta}{dt} = \frac{f'(t)}{1 + [f(t)]^2}$$

**Example:** In the rocket problem:
$\theta = \arctan\left(\frac{h}{3000}\right)$

$$\frac{d\theta}{dt} = \frac{\frac{1}{3000}\frac{dh}{dt}}{1 + \frac{h^2}{9000000}} = \frac{\frac{dh}{dt}}{3000 + \frac{h^2}{3000}}$$

At $h = 4000$:
$$\frac{d\theta}{dt} = \frac{800}{3000 + \frac{16000000}{3000}} = \frac{800}{3000 + \frac{16000}{3}} = \frac{800}{\frac{25000}{3}} = \frac{2400}{25000} = 0.096 \text{ rad/s}$$

Same answer as before.

## Common Mistakes

**Mistake 1: Mixing units**

Make sure all angles are in radians when differentiating, since the calculus formulas ($\frac{d}{d\theta}[\sin\theta] = \cos\theta$) assume radians. Convert at the end if degrees are needed.

**Mistake 2: Forgetting the secant squared**

When differentiating $\tan\theta$, you get $\sec^2\theta \cdot \frac{d\theta}{dt}$. Don't drop the $\sec^2\theta$ factor.

**Mistake 3: Wrong trig identity**

$\sec^2\theta = 1 + \tan^2\theta$, NOT $1 - \tan^2\theta$. This lets you find $\sec^2\theta$ from $\tan\theta$ without calculating the angle itself.

## Summary

- Angular rates use trig functions to relate angles to distances
- Differentiate using chain rule: $\frac{d}{dt}[\tan\theta] = \sec^2\theta \cdot \frac{d\theta}{dt}$
- Convert angular rates: $1$ rev/min $= 2\pi$ rad/min
- $\sec^2\theta$ can be computed from $1 + \tan^2\theta$ without finding $\theta$
- Inverse trig formulas provide an alternative approach
- Units matter: radians vs. degrees vs. revolutions
