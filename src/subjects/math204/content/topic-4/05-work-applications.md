---
id: math204-t4-work
title: "Work Applications"
order: 5
---

# Work and Integration

Work is a fundamental concept in physics that quantifies energy transfer. When force varies with position—as in stretching a spring or pumping water from a tank—calculating work requires integration. This application demonstrates how calculus extends simple physics formulas to handle continuously varying quantities.

## Work: The Basic Concept

In physics, **work** is defined as force applied over a distance:

$$W = F \cdot d$$

This formula assumes constant force $F$ applied over distance $d$. But what if the force changes as the object moves? Integration handles this naturally.

### Variable Force

If force $F(x)$ varies with position $x$ as an object moves from $x = a$ to $x = b$:

$$W = \int_a^b F(x) \, dx$$

**Interpretation:** Divide the motion into infinitesimal displacements $dx$. The work done over each small displacement is $dW = F(x) \, dx$. Sum these contributions to get total work.

**Units:** In SI units:
- Force in newtons (N)
- Distance in meters (m)
- Work in joules (J), where 1 J = 1 N·m

In US customary units:
- Force in pounds (lb)
- Distance in feet (ft)
- Work in foot-pounds (ft-lb)

## Hooke's Law and Springs

A spring exerts a restoring force proportional to its displacement from natural length. **Hooke's Law** states:

$$F(x) = kx$$

where:
- $x$ is the displacement from natural (equilibrium) position
- $k$ is the spring constant (stiffness), measured in N/m or lb/ft

The force opposes the displacement: stretching or compressing a spring requires work.

### Work to Stretch a Spring

To stretch a spring from $x = a$ to $x = b$ (where $x$ is measured from natural length):

$$W = \int_a^b kx \, dx = k \int_a^b x \, dx = k \cdot \frac{x^2}{2}\bigg|_a^b = \frac{k}{2}(b^2 - a^2)$$

**Example 1:** A spring has natural length 0.5 m. A force of 10 N stretches it to 0.7 m. How much work is required to stretch it from 0.7 m to 0.9 m?

**Solution:** First, find the spring constant. When stretched 0.2 m, force is 10 N:
$$10 = k \cdot 0.2 \implies k = 50 \text{ N/m}$$

To stretch from 0.7 m to 0.9 m means stretching from $x = 0.2$ to $x = 0.4$ (measured from natural length):

$$W = \int_{0.2}^{0.4} 50x \, dx = 50 \cdot \frac{x^2}{2}\bigg|_{0.2}^{0.4} = 25(0.16 - 0.04) = 25 \cdot 0.12 = 3 \text{ J}$$

**Example 2:** A spring requires 2 J of work to stretch from 0 m to 0.1 m beyond natural length. How much work is needed to stretch from 0.1 m to 0.2 m?

**Solution:** Using $W = \frac{k}{2}(b^2 - a^2)$ from 0 to 0.1 m:
$$2 = \frac{k}{2}(0.01 - 0) \implies k = 400 \text{ N/m}$$

Work from 0.1 m to 0.2 m:
$$W = \frac{400}{2}(0.04 - 0.01) = 200 \cdot 0.03 = 6 \text{ J}$$

Notice: stretching the second 0.1 m requires three times as much work as the first 0.1 m, because the force increases linearly.

## Pumping Liquids

Pumping water (or other liquids) from a tank requires work against gravity. The key insight: different layers of liquid must be lifted different distances.

### Setup for Pumping Problems

1. **Choose a coordinate system**: Often, place origin at the bottom or top of the tank, with $y$ pointing up
2. **Consider a thin slice** of liquid at height $y$ with thickness $dy$
3. **Compute the volume** of the slice: $dV = A(y) \, dy$, where $A(y)$ is cross-sectional area
4. **Compute the weight/force**: $F = \rho g \cdot dV = \rho g A(y) \, dy$
   - $\rho$ = density (kg/m³ or lb/ft³)
   - $g$ = gravitational acceleration (9.8 m/s² or 32 ft/s²)
   - Often use weight density $\delta = \rho g$ directly
5. **Compute the distance** the slice must be lifted: $d(y)$
6. **Integrate**: $W = \int dW = \int F \cdot d(y) \, dy$

**Water density:**
- 1000 kg/m³ (weight density: 9800 N/m³)
- 62.5 lb/ft³

**Example 3:** A cylindrical tank with radius 2 m and height 5 m is filled with water. How much work is required to pump all the water to the top of the tank?

**Solution:** Place origin at the bottom of the tank, with $y$ pointing up.

A thin horizontal slice at height $y$ has:
- Thickness: $dy$
- Cross-sectional area: $A = \pi r^2 = 4\pi$ m²
- Volume: $dV = 4\pi \, dy$ m³
- Weight: $F = 9800 \cdot 4\pi \, dy = 39200\pi \, dy$ N
- Distance to lift to top: $d = 5 - y$ m

Work to lift this slice:
$$dW = 39200\pi(5 - y) \, dy$$

Total work:
$$W = \int_0^5 39200\pi(5 - y) \, dy = 39200\pi \int_0^5 (5 - y) \, dy$$

$$= 39200\pi \left[5y - \frac{y^2}{2}\right]_0^5 = 39200\pi\left(25 - \frac{25}{2}\right) = 39200\pi \cdot \frac{25}{2}$$

$$= 490000\pi \approx 1,539,000 \text{ J} = 1539 \text{ kJ}$$

**Example 4:** A conical tank (vertex down) has height 6 ft and top radius 3 ft. It's filled with water to a depth of 4 ft. How much work is required to pump all the water to the top of the tank?

**Solution:** Place origin at the vertex, with $y$ pointing up.

The radius at height $y$ is proportional to height. At the top ($y = 6$), $r = 3$, so:
$$\frac{r}{y} = \frac{3}{6} = \frac{1}{2} \implies r = \frac{y}{2}$$

A thin slice at height $y$ (for $0 \leq y \leq 4$) has:
- Cross-sectional area: $A = \pi r^2 = \pi\left(\frac{y}{2}\right)^2 = \frac{\pi y^2}{4}$
- Volume: $dV = \frac{\pi y^2}{4} \, dy$
- Weight: $F = 62.5 \cdot \frac{\pi y^2}{4} \, dy$
- Distance to lift: $d = 6 - y$

$$W = \int_0^4 62.5 \cdot \frac{\pi y^2}{4}(6 - y) \, dy = \frac{62.5\pi}{4} \int_0^4 y^2(6 - y) \, dy$$

$$= \frac{62.5\pi}{4} \int_0^4 (6y^2 - y^3) \, dy = \frac{62.5\pi}{4}\left[2y^3 - \frac{y^4}{4}\right]_0^4$$

$$= \frac{62.5\pi}{4}\left(128 - 64\right) = \frac{62.5\pi}{4} \cdot 64 = 1000\pi \approx 3142 \text{ ft-lb}$$

## Pumping to an External Location

If water is pumped to a height $h$ above the tank (e.g., over the rim and out a spout), adjust the distance:
$$d(y) = h - y$$

**Example 5:** Redo Example 3, but pump water to a point 2 m above the top of the tank.

**Solution:** Now the distance is $d = (5 + 2) - y = 7 - y$.

$$W = \int_0^5 39200\pi(7 - y) \, dy = 39200\pi\left[7y - \frac{y^2}{2}\right]_0^5$$

$$= 39200\pi\left(35 - \frac{25}{2}\right) = 39200\pi \cdot \frac{45}{2} = 882000\pi \approx 2,770,000 \text{ J}$$

## Lifting Cables and Chains

When lifting a cable or chain, its weight varies as more of it is lifted.

**Example 6:** A 50-ft cable weighing 2 lb/ft hangs from a windlass. How much work is required to wind up the entire cable?

**Solution:** Consider a small segment at distance $y$ from the top (where $0 \leq y \leq 50$).

When the windlass has wound up to position $x$ (so $x$ feet have been wound up), the remaining cable has length $50 - x$ and weight $2(50 - x)$ lb.

To lift the cable from position $x$ to $x + dx$, the work is:
$$dW = 2(50 - x) \, dx$$

Total work:
$$W = \int_0^{50} 2(50 - x) \, dx = 2\left[50x - \frac{x^2}{2}\right]_0^{50} = 2\left(2500 - 1250\right) = 2500 \text{ ft-lb}$$

**Example 7:** A bucket weighing 5 lb is attached to a 40-ft rope weighing 0.5 lb/ft. How much work is required to lift the bucket from the bottom to the top?

**Solution:** Two components:
1. **Bucket**: constant weight 5 lb, lifted 40 ft: $W_1 = 5 \cdot 40 = 200$ ft-lb
2. **Rope**: varies as in Example 6

For the rope:
$$W_2 = \int_0^{40} 0.5(40 - x) \, dx = 0.5\left[40x - \frac{x^2}{2}\right]_0^{40} = 0.5(1600 - 800) = 400 \text{ ft-lb}$$

Total work: $W = 200 + 400 = 600$ ft-lb.

## Strategy for Work Problems

1. **Identify the type**: spring, pumping, lifting, or other
2. **Set up coordinates**: Choose origin and direction carefully
3. **Find the force function** $F(x)$ or $F(y)$
4. **For pumping**: determine volume, weight, and distance for a slice
5. **Set up the integral**: $W = \int F(x) \, dx$ or $\int F \cdot d \, dy$
6. **Evaluate and interpret** with correct units

## Summary

- **Work with variable force**: $W = \int_a^b F(x) \, dx$
- **Hooke's Law**: $F = kx$ for springs, giving $W = \frac{k}{2}(b^2 - a^2)$
- **Pumping liquids**: Integrate weight of slices times distance lifted
- **Key principle**: Slice the problem into infinitesimal pieces, compute work for each, integrate
- Always pay attention to units (N·m = J, or ft-lb)
- Sketching the setup helps identify limits and the integrand
