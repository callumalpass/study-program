# Volumes by Cylindrical Shells

The **shell method** provides an alternative approach to finding volumes of solids of revolution. Instead of slicing perpendicular to the axis of revolution (as in the disk/washer method), we slice parallel to the axis, creating thin cylindrical shells. This method is often easier when the disk/washer method would require solving for the inverse function or splitting the region.

## The Shell Method Concept

Imagine taking a thin vertical rectangle in the region and rotating it about the y-axis. It sweeps out a thin cylindrical shell—like a soup can with the top and bottom removed.

For a shell at distance $x$ from the axis with:
- **Radius**: $r = x$ (distance from axis)
- **Height**: $h = f(x)$ (length of the rectangle)
- **Thickness**: $dx$ (width of the rectangle)

The volume of this thin shell is approximately:
$$dV = 2\pi \cdot (\text{radius}) \cdot (\text{height}) \cdot (\text{thickness}) = 2\pi x f(x) \, dx$$

Think of "unwrapping" the shell into a thin rectangular slab: its length is the circumference $2\pi r$, height is $h$, and thickness is $dx$.

## Shell Method Formula

### Rotation About the y-axis

For the region under $y = f(x)$ from $x = a$ to $x = b$ rotated about the y-axis:

$$V = \int_a^b 2\pi x f(x) \, dx$$

The integrand breaks down as:
- $2\pi x$ = circumference of shell at radius $x$
- $f(x)$ = height of shell
- $dx$ = thickness

**Example 1:** Find the volume when the region under $y = x^2$ from $x = 0$ to $x = 2$ is rotated about the y-axis.

**Solution:** Using the shell method:
$$V = \int_0^2 2\pi x \cdot x^2 \, dx = 2\pi \int_0^2 x^3 \, dx = 2\pi \left[\frac{x^4}{4}\right]_0^2 = 2\pi \cdot \frac{16}{4} = 8\pi$$

Compare this to the disk method: we'd need to write $x = \sqrt{y}$ and integrate from $y = 0$ to $y = 4$:
$$V = \int_0^4 \pi (\sqrt{y})^2 \, dy = \pi \int_0^4 y \, dy = \pi \cdot \frac{16}{2} = 8\pi$$

Both methods work, but shell method is more direct here.

### Rotation About the x-axis

For rotation about the x-axis using horizontal shells, integrate with respect to $y$. If the region is bounded by $x = g(y)$ from $y = c$ to $y = d$:

$$V = \int_c^d 2\pi y g(y) \, dy$$

**Example 2:** Rotate the region bounded by $y = x^3$, $y = 8$, and $x = 0$ about the x-axis using shells.

**Solution:** Express $x$ in terms of $y$: $x = y^{1/3}$. The region extends from $y = 0$ to $y = 8$.

$$V = \int_0^8 2\pi y \cdot y^{1/3} \, dy = 2\pi \int_0^8 y^{4/3} \, dy = 2\pi \left[\frac{3y^{7/3}}{7}\right]_0^8$$

$$= 2\pi \cdot \frac{3 \cdot 8^{7/3}}{7} = 2\pi \cdot \frac{3 \cdot 128}{7} = \frac{768\pi}{7}$$

## Shells vs. Disks: When to Use Which Method

The choice between methods depends on the geometry and which setup is simpler.

### Use Shells When:

1. **Rotating about an axis parallel to the rectangles**
   - Region under $y = f(x)$, rotate about y-axis: shells are natural
   - Region left of $x = g(y)$, rotate about x-axis: shells are natural

2. **Avoiding inverse functions**
   - Example: Rotating $y = e^x$ about the y-axis with shells avoids solving for $x = \ln y$

3. **Avoiding multiple integrals**
   - Region might require splitting into pieces with disks but not with shells

### Use Disks/Washers When:

1. **Rotating about an axis perpendicular to the rectangles**
   - Region under $y = f(x)$, rotate about x-axis: disks are natural

2. **The function is already in the convenient form**
   - If already expressed as $x = g(y)$ and rotating about y-axis, disks work well

### Example Comparison

**Problem:** Rotate the region bounded by $y = x^2$ and $y = 2x$ about the y-axis.

**Solution with Shells:**
Intersections: $x^2 = 2x \Rightarrow x = 0$ or $x = 2$.

For $0 \leq x \leq 2$, we have $2x \geq x^2$. Using shells:
$$V = \int_0^2 2\pi x(2x - x^2) \, dx = 2\pi \int_0^2 (2x^2 - x^3) \, dx$$

$$= 2\pi\left[\frac{2x^3}{3} - \frac{x^4}{4}\right]_0^2 = 2\pi\left(\frac{16}{3} - 4\right) = 2\pi \cdot \frac{4}{3} = \frac{8\pi}{3}$$

**Solution with Washers:**
We'd need to express both curves as $x = g(y)$:
- From $y = x^2$: $x = \sqrt{y}$
- From $y = 2x$: $x = y/2$

The curves intersect at $y = 0$ and $y = 4$. For $0 \leq y \leq 4$:
- Which is outer? At $y = 2$: $\sqrt{2} \approx 1.41$ vs. $2/2 = 1$, so $\sqrt{y}$ is outer.

$$V = \int_0^4 \pi\left[(\sqrt{y})^2 - (y/2)^2\right] \, dy = \pi \int_0^4 \left(y - \frac{y^2}{4}\right) \, dy$$

$$= \pi\left[\frac{y^2}{2} - \frac{y^3}{12}\right]_0^4 = \pi\left(8 - \frac{16}{3}\right) = \pi \cdot \frac{8}{3} = \frac{8\pi}{3}$$

Both work, but shells avoid the inverse function.

## Rotation About Lines Other Than the Axes

### Rotation About $x = k$

When rotating about a vertical line $x = k$ (not the y-axis), the radius of each shell changes:

$$\text{radius} = |x - k|$$

**Example 3:** Rotate the region under $y = \sqrt{x}$ from $x = 0$ to $x = 4$ about the line $x = -1$.

**Solution:** Each shell at position $x$ has radius $x - (-1) = x + 1$:

$$V = \int_0^4 2\pi(x+1)\sqrt{x} \, dx = 2\pi \int_0^4 (x^{3/2} + x^{1/2}) \, dx$$

$$= 2\pi\left[\frac{2x^{5/2}}{5} + \frac{2x^{3/2}}{3}\right]_0^4 = 2\pi\left(\frac{2 \cdot 32}{5} + \frac{2 \cdot 8}{3}\right)$$

$$= 2\pi\left(\frac{64}{5} + \frac{16}{3}\right) = 2\pi \cdot \frac{192 + 80}{15} = \frac{544\pi}{15}$$

### Rotation About $y = k$

For rotation about a horizontal line $y = k$, use horizontal shells with radius $|y - k|$.

**Example 4:** Rotate the region between $y = x$ and $y = x^2$ about the line $y = -2$.

**Solution:** The region is bounded by $x = 0$ and $x = 1$. We can use vertical shells, but now each shell at height $y$ has radius $y - (-2) = y + 2$.

This is trickier—we need to think of horizontal shells. For $0 \leq y \leq 1$:
- From $y = x^2$: $x = \sqrt{y}$ (right boundary)
- From $y = x$: $x = y$ (left boundary)

Actually, for different $y$ values, the boundaries change. At $y = 0.5$: $\sqrt{0.5} \approx 0.707$ and $0.5$, so $\sqrt{y}$ is right boundary when both apply.

Wait—let's reconsider. The region is between $y = x$ and $y = x^2$ for $0 \leq x \leq 1$. Using vertical shells about $y = -2$:

At position $x$, the shell extends from $y = x^2$ (bottom) to $y = x$ (top), with height $x - x^2$. But the radius isn't just $x$—we need the distance from the "center of mass" of the shell to the axis.

Actually, this is where shells become complicated. Let's use washers instead or reconsider the setup.

**Better approach**: Convert to $y$ as the integration variable. For $0 \leq y \leq 1$:
- If $0 \leq y \leq 1$: right boundary is $x = \sqrt{y}$, left boundary is $x = y$
- Shell radius: $y + 2$
- Shell "height" (horizontal length): $\sqrt{y} - y$

$$V = \int_0^1 2\pi(y+2)(\sqrt{y} - y) \, dy = 2\pi \int_0^1 (y^{3/2} - y^2 + 2y^{1/2} - 2y) \, dy$$

$$= 2\pi\left[\frac{2y^{5/2}}{5} - \frac{y^3}{3} + \frac{4y^{3/2}}{3} - y^2\right]_0^1$$

$$= 2\pi\left(\frac{2}{5} - \frac{1}{3} + \frac{4}{3} - 1\right) = 2\pi\left(\frac{2}{5} + 1 - 1\right) = 2\pi \cdot \frac{2}{5} = \frac{4\pi}{5}$$

## Common Mistakes

1. **Forgetting the $2\pi r$ factor**: Shell volume is $2\pi \cdot \text{radius} \cdot \text{height} \cdot \text{thickness}$

2. **Using wrong variable for radius**: When rotating about the y-axis with vertical rectangles, radius is $x$, not $y$

3. **Confusing shell height with radius**: Height is the length of the rectangle; radius is the distance from the axis

4. **Wrong sign on radius**: When rotating about $x = k$, radius is $|x - k|$. Determine which is larger.

## Summary

- **Shell method**: $V = \int_a^b 2\pi (\text{radius})(\text{height}) \, dx$ or $dy$
- **For y-axis rotation**: $V = \int_a^b 2\pi x f(x) \, dx$
- **For x-axis rotation**: $V = \int_c^d 2\pi y g(y) \, dy$
- **Choose shells over disks** when it avoids inverse functions or multiple integrals
- **Both methods give the same answer**—use whichever is simpler for the problem
- Shells slice parallel to the axis; disks slice perpendicular to it
