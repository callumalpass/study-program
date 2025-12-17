---
title: "Autonomous Equations and Qualitative Analysis"
---

# Autonomous Equations and Qualitative Analysis

## Definition of Autonomous Equations

An **autonomous differential equation** is one in which the independent variable does not appear explicitly on the right-hand side:

$$\frac{dy}{dt} = f(y)$$

The term "autonomous" means "self-governing"—the rate of change depends only on the current state $y$, not on the time $t$. This contrasts with **non-autonomous equations** like $\frac{dy}{dt} = ty$ where time appears explicitly.

**Examples of autonomous equations**:
- $\frac{dy}{dt} = y(1-y)$ (logistic growth)
- $\frac{dy}{dt} = -ky$ (exponential decay)
- $\frac{dy}{dt} = \sin y$

**Examples of non-autonomous equations**:
- $\frac{dy}{dt} = ty$
- $\frac{dy}{dt} = e^t - y$

## Equilibrium Solutions

An **equilibrium solution** (or **critical point**, **fixed point**, **stationary point**) is a constant solution $y(t) = y^*$ where:

$$f(y^*) = 0$$

At an equilibrium, $\frac{dy}{dt} = 0$, so the solution doesn't change with time.

**Example 1**: For $\frac{dy}{dt} = y(1-y)$, find equilibria.

Set $f(y) = y(1-y) = 0$:
$$y = 0 \quad \text{or} \quad y = 1$$

The equilibria are $y^* = 0$ and $y^* = 1$.

**Example 2**: For $\frac{dy}{dt} = y^2 - 4$, find equilibria.

Set $y^2 - 4 = 0$:
$$y = \pm 2$$

The equilibria are $y^* = -2$ and $y^* = 2$.

## Phase Line Analysis

The **phase line** is a one-dimensional representation showing:
- Equilibrium points
- Direction of motion between equilibria
- Stability of equilibria

### Constructing a Phase Line

**Step 1**: Find all equilibria by solving $f(y) = 0$

**Step 2**: Determine the sign of $f(y)$ in each interval between equilibria:
- If $f(y) > 0$, then $\frac{dy}{dt} > 0$, so $y$ increases (upward arrow)
- If $f(y) < 0$, then $\frac{dy}{dt} < 0$, so $y$ decreases (downward arrow)

**Step 3**: Mark equilibria and arrows on a vertical line (the phase line)

**Example 3**: Phase line for $\frac{dy}{dt} = y(1-y)$.

Equilibria: $y = 0$ and $y = 1$

Test intervals:
- $y < 0$: $f(y) = y(1-y) = (-)(\text{positive}) < 0$ → arrows point down
- $0 < y < 1$: $f(y) = y(1-y) = (+)(\text{positive}) > 0$ → arrows point up
- $y > 1$: $f(y) = y(1-y) = (+)(\text{negative}) < 0$ → arrows point down

Phase line:
```
  ↓  y > 1
  • y = 1  (stable)
  ↑  0 < y < 1
  • y = 0  (unstable)
  ↓  y < 0
```

## Stability of Equilibria

The stability of an equilibrium $y^*$ describes what happens to nearby solutions:

### Types of Stability

**Stable (Attracting)**: Solutions starting near $y^*$ approach $y^*$ as $t \to \infty$
- Arrows on both sides point toward the equilibrium

**Unstable (Repelling)**: Solutions starting near $y^*$ move away from $y^*$
- Arrows on both sides point away from the equilibrium

**Semi-stable**: Solutions on one side approach $y^*$, while those on the other side move away
- Arrows point toward the equilibrium on one side and away on the other

### Stability Criterion

For $\frac{dy}{dt} = f(y)$, the equilibrium $y^*$ is:
- **Stable** if $f'(y^*) < 0$
- **Unstable** if $f'(y^*) > 0$
- **Semi-stable** (or requires further analysis) if $f'(y^*) = 0$

This criterion comes from linearization: near $y^*$, the equation behaves approximately like:
$$\frac{d(y-y^*)}{dt} \approx f'(y^*)(y-y^*)$$

which has solution $(y-y^*) \sim e^{f'(y^*)t}$. If $f'(y^*) < 0$, this decays to zero.

**Example 4**: Analyze stability for $\frac{dy}{dt} = y(1-y)$.

$f(y) = y(1-y)$, so $f'(y) = 1 - 2y$.

At $y^* = 0$: $f'(0) = 1 > 0$ → **unstable**

At $y^* = 1$: $f'(1) = -1 < 0$ → **stable**

This confirms our phase line analysis.

**Example 5**: Analyze $\frac{dy}{dt} = (y-1)^2$.

Equilibrium: $(y-1)^2 = 0$ gives $y^* = 1$.

$f(y) = (y-1)^2$, so $f'(y) = 2(y-1)$.

At $y^* = 1$: $f'(1) = 0$ → stability inconclusive from derivative test.

Check the phase line:
- $y < 1$: $f(y) = (y-1)^2 > 0$ → $y$ increases (↑)
- $y > 1$: $f(y) = (y-1)^2 > 0$ → $y$ increases (↑)

Both arrows point upward, away from $y = 1$ on the left and continuing upward on the right. Actually, on the right, solutions move away from $y=1$. On the left, solutions approach $y=1$ from below. This is **semi-stable**.

## Applications

### Population Dynamics

The logistic equation with harvesting:
$$\frac{dP}{dt} = rP\left(1 - \frac{P}{K}\right) - h$$

where $r$ is the growth rate, $K$ is the carrying capacity, and $h$ is the harvesting rate.

Expanding:
$$\frac{dP}{dt} = rP - \frac{r}{K}P^2 - h$$

Equilibria satisfy:
$$-\frac{r}{K}P^2 + rP - h = 0$$

Using the quadratic formula:
$$P^* = \frac{K}{2}\left(1 \pm \sqrt{1 - \frac{4h}{rK}}\right)$$

For real equilibria, we need $h \leq \frac{rK}{4}$ (sustainable harvesting).

**Critical harvesting rate**: When $h = \frac{rK}{4}$, the two equilibria merge into one semi-stable equilibrium at $P = K/2$. Above this rate, no equilibrium exists, and the population will collapse to extinction.

### Phase Line Analysis of Harvesting

For $r = 1$, $K = 100$, $h = 20$:
$$\frac{dP}{dt} = P - \frac{P^2}{100} - 20$$

Equilibria:
$$P^* = 50 \pm \sqrt{2500 - 2000} = 50 \pm \sqrt{500} \approx 50 \pm 22.4$$
$$P_1 \approx 27.6, \quad P_2 \approx 72.4$$

Phase line analysis shows:
- $P_1 \approx 27.6$ is unstable
- $P_2 \approx 72.4$ is stable

If the population drops below $27.6$, it will decline to extinction even with the same harvesting rate. This is a **threshold effect**.

### Chemical Reactions

For the autocatalytic reaction $A + B \to 2B$, the concentration $b$ of $B$ satisfies:
$$\frac{db}{dt} = kb(a_0 - b)$$

where $a_0$ is the initial concentration of $A$ and $k$ is the rate constant.

Equilibria: $b = 0$ (no reaction) and $b = a_0$ (reaction complete).

$f(b) = kb(a_0 - b)$, so $f'(b) = k(a_0 - 2b)$.

At $b = 0$: $f'(0) = ka_0 > 0$ → **unstable**

At $b = a_0$: $f'(a_0) = -ka_0 < 0$ → **stable**

The reaction proceeds from no product to complete conversion, as expected physically.

### Thermal Dynamics

Newton's law of cooling for an object in an environment with time-varying temperature $T_e(t)$ is non-autonomous:
$$\frac{dT}{dt} = -k(T - T_e(t))$$

However, if the environment temperature is constant ($T_e(t) = T_e$), it becomes autonomous:
$$\frac{dT}{dt} = -k(T - T_e)$$

The equilibrium is $T^* = T_e$ (thermal equilibrium).

$f(T) = -k(T - T_e)$, so $f'(T) = -k < 0$ → **stable**

Any initial temperature approaches the environmental temperature, as expected.

## Bifurcations

A **bifurcation** occurs when a small change in a parameter causes a qualitative change in the behavior of solutions, such as the creation or destruction of equilibria or a change in their stability.

### Saddle-Node Bifurcation

Consider the family of equations:
$$\frac{dy}{dt} = r - y^2$$

where $r$ is a parameter.

**Case 1**: $r > 0$

Equilibria: $y^2 = r$ gives $y^* = \pm\sqrt{r}$

$f'(y) = -2y$
- At $y = \sqrt{r}$: $f'(\sqrt{r}) = -2\sqrt{r} < 0$ → stable
- At $y = -\sqrt{r}$: $f'(-\sqrt{r}) = 2\sqrt{r} > 0$ → unstable

**Case 2**: $r = 0$

Equilibrium: $y^* = 0$ (semi-stable)

**Case 3**: $r < 0$

No equilibria (no real solutions to $y^2 = r < 0$)

As $r$ decreases through zero, two equilibria collide and annihilate. This is a **saddle-node bifurcation** (also called a **fold bifurcation**).

### Transcritical Bifurcation

Consider:
$$\frac{dy}{dt} = ry - y^2$$

Equilibria: $y(r - y) = 0$ gives $y^* = 0$ and $y^* = r$.

$f'(y) = r - 2y$

At $y = 0$: $f'(0) = r$
- If $r < 0$: stable
- If $r > 0$: unstable

At $y = r$: $f'(r) = -r$
- If $r < 0$: unstable
- If $r > 0$: stable

At $r = 0$, the two equilibria coincide. As $r$ passes through zero, the equilibria "exchange" stability. This is a **transcritical bifurcation**.

### Pitchfork Bifurcation

Consider:
$$\frac{dy}{dt} = ry - y^3$$

Equilibria: $y(r - y^2) = 0$ gives $y^* = 0$ and (for $r > 0$) $y^* = \pm\sqrt{r}$.

At $r = 0$: only $y = 0$ is an equilibrium.

For $r > 0$: three equilibria exist. The central equilibrium at $y = 0$ becomes unstable, and two stable equilibria appear at $y = \pm\sqrt{r}$.

This is a **supercritical pitchfork bifurcation**, common in symmetric systems.

## Time-Independent Solutions and Phase Portraits

For autonomous equations, solutions are **time-translation invariant**: if $y(t)$ is a solution, then $y(t + t_0)$ is also a solution for any constant $t_0$. This means solution curves in the $(t, y)$ plane can be shifted horizontally.

The **phase portrait** shows solutions in the phase line (one-dimensional) or phase plane (for systems). For scalar autonomous equations, the phase portrait is simply the phase line with equilibria and flow directions.

### Geometric Interpretation

Solutions to $\frac{dy}{dt} = f(y)$ cannot cross each other in the $(t,y)$ plane (by uniqueness). They approach equilibria asymptotically or diverge to infinity.

**Example 6**: For $\frac{dy}{dt} = y^2 - 1$:

Equilibria: $y = \pm 1$

Phase line:
```
  ↑  y > 1    (solutions increase without bound)
  • y = 1     (unstable)
  ↓  -1 < y < 1  (solutions decrease to -1)
  • y = -1    (stable)
  ↑  y < -1   (solutions increase to -1)
```

Solutions starting in $(-1, 1)$ approach $y = -1$. Solutions starting above $y = 1$ increase to infinity in finite time.

## Qualitative vs Quantitative Analysis

**Quantitative analysis**: Solving the equation explicitly to find $y(t)$.

**Qualitative analysis**: Determining long-term behavior, stability, and bifurcations without solving explicitly.

Autonomous equations are particularly amenable to qualitative analysis. Often, knowing the equilibria and their stability provides sufficient information for applications, without needing explicit solutions.

**Example 7**: For the equation $\frac{dy}{dt} = \sin y$:

Equilibria: $\sin y = 0$ gives $y = n\pi$ for integer $n$.

$f'(y) = \cos y$

At $y = 0, \pm 2\pi, \pm 4\pi, \ldots$: $\cos(2n\pi) = 1 > 0$ → unstable

At $y = \pm\pi, \pm 3\pi, \ldots$: $\cos((2n+1)\pi) = -1 < 0$ → stable

Even without an explicit solution, we know solutions oscillate between stable and unstable equilibria, settling into a stable equilibrium depending on the initial condition.

## Conclusion

Autonomous differential equations possess a rich qualitative structure that can be analyzed through equilibria, phase lines, and stability theory. The independence from the time variable allows for powerful geometric and graphical methods that reveal the long-term behavior of solutions without explicit integration. Phase line analysis provides immediate insight into which initial conditions lead to growth, decay, or equilibration. Bifurcation theory extends this analysis to understand how system behavior changes with parameters. These qualitative techniques are indispensable in applications where explicit solutions are difficult or impossible to obtain, yet understanding the system's behavior remains essential.
