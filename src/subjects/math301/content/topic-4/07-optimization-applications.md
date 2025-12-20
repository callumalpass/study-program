---
id: math301-topic-4-7
title: "Optimization Applications"
order: 7
---

# Applications of Optimization in Economics, Physics, and Geometry

## Introduction

Optimization is one of the most powerful and practical applications of multivariable calculus, appearing throughout science, engineering, economics, and everyday decision-making. From maximizing profit and minimizing cost to finding equilibrium states in physical systems and solving geometric problems, optimization techniques provide rigorous methods for finding optimal solutions. This topic explores diverse applications of unconstrained and constrained optimization, demonstrating how the theoretical tools of critical points, Lagrange multipliers, and extrema analysis solve real-world problems.

## Economic Applications

### Profit Maximization

Firms seek to maximize profit $\pi(q_1, q_2)$ where $q_1, q_2$ are quantities produced.

**Example 1: Two-Product Firm**

A company produces products A and B with profit:

$$\pi(q_A, q_B) = 100q_A + 80q_B - q_A^2 - q_B^2 - q_Aq_B$$

Find the production levels that maximize profit.

$$\frac{\partial \pi}{\partial q_A} = 100 - 2q_A - q_B = 0$$
$$\frac{\partial \pi}{\partial q_B} = 80 - 2q_B - q_A = 0$$

Solving:
$$2q_A + q_B = 100$$
$$q_A + 2q_B = 80$$

Multiply first by 2: $4q_A + 2q_B = 200$

Subtract second: $3q_A = 120 \implies q_A = 40$

Substitute: $q_B = 20$

Check second derivative test:
$$\pi_{q_Aq_A} = -2, \quad \pi_{q_Bq_B} = -2, \quad \pi_{q_Aq_B} = -1$$

$$D = (-2)(-2) - 1 = 3 > 0$$

Since $D > 0$ and $\pi_{q_Aq_A} < 0$, $(40, 20)$ is a **maximum**.

**Maximum profit**: $\pi(40, 20) = 4000 + 1600 - 1600 - 400 - 800 = 2800$

### Utility Maximization

Consumers maximize utility $U(x, y)$ subject to budget constraint $p_xx + p_yy = I$.

**Example 2: Cobb-Douglas Utility**

Maximize $U(x, y) = x^{0.6}y^{0.4}$ subject to $2x + 3y = 100$.

Using Lagrange multipliers:

$$\nabla U = \langle 0.6x^{-0.4}y^{0.4}, 0.4x^{0.6}y^{-0.6} \rangle$$

$$\nabla g = \langle 2, 3 \rangle \quad (g = 2x + 3y)$$

$$0.6x^{-0.4}y^{0.4} = 2\lambda$$
$$0.4x^{0.6}y^{-0.6} = 3\lambda$$

Dividing:

$$\frac{0.6y}{0.4x} = \frac{2}{3} \implies \frac{3y}{2x} = \frac{2}{3} \implies y = \frac{4x}{9}$$

Substitute into budget:

$$2x + 3 \cdot \frac{4x}{9} = 100 \implies 2x + \frac{4x}{3} = 100 \implies \frac{10x}{3} = 100 \implies x = 30$$

$$y = \frac{4(30)}{9} = \frac{40}{3} \approx 13.33$$

**Optimal consumption**: $(30, 13.33)$ with $U \approx 21.5$

### Cost Minimization

Firms minimize cost $C(L, K) = wL + rK$ subject to production requirement $Q(L, K) = q_0$.

**Example 3: Minimize Production Cost**

Minimize $C = 20L + 30K$ subject to $L^{0.5}K^{0.5} = 100$.

Using Lagrange multipliers leads to:

$$\frac{K}{L} = \frac{w}{r} = \frac{20}{30} = \frac{2}{3}$$

Combined with the constraint, we find $L$ and $K$.

## Physics Applications

### Minimum Potential Energy

Physical systems settle into states of minimum potential energy. Finding these states involves optimization.

**Example 4: Particle on a Surface**

A bead slides frictionlessly on the surface $z = x^2 + y^2$ under gravity. Find equilibrium positions.

Potential energy: $U = mgz = mg(x^2 + y^2)$

$$\nabla U = \langle 2mgx, 2mgy \rangle = \mathbf{0}$$

Equilibrium: $x = y = 0$ (bottom of paraboloid).

Second derivative test confirms this is a minimum.

### Least Action Principle

In classical mechanics, the path taken by a particle minimizes the action integral, leading to the Euler-Lagrange equations.

### Optics: Fermat's Principle

Light travels along paths that minimize travel time, leading to Snell's law of refraction.

**Example 5: Shortest Path with Different Media**

Light travels from $(0, a)$ in medium 1 (speed $v_1$) to $(d, -b)$ in medium 2 (speed $v_2$), crossing the interface at $(x, 0)$.

Total time:

$$T(x) = \frac{\sqrt{x^2 + a^2}}{v_1} + \frac{\sqrt{(d-x)^2 + b^2}}{v_2}$$

Minimize by setting $T'(x) = 0$, leading to:

$$\frac{\sin\theta_1}{v_1} = \frac{\sin\theta_2}{v_2}$$

(Snell's law)

### Thermodynamics: Entropy Maximization

At equilibrium, entropy is maximized subject to energy constraints.

## Geometric Applications

### Closest Point Problems

Find the point on a curve or surface closest to a given point.

**Example 6: Closest Point on Plane**

Find the point on $2x + 3y + 4z = 12$ closest to the origin.

Minimize $f(x, y, z) = x^2 + y^2 + z^2$ subject to $2x + 3y + 4z = 12$.

$$\nabla f = \langle 2x, 2y, 2z \rangle = \lambda\langle 2, 3, 4 \rangle$$

$$x = \lambda, \quad y = \frac{3\lambda}{2}, \quad z = 2\lambda$$

Substitute:

$$2\lambda + 3 \cdot \frac{3\lambda}{2} + 4 \cdot 2\lambda = 12$$

$$2\lambda + \frac{9\lambda}{2} + 8\lambda = 12$$

$$\frac{29\lambda}{2} = 12 \implies \lambda = \frac{24}{29}$$

Point: $\left(\frac{24}{29}, \frac{36}{29}, \frac{48}{29}\right)$

Distance: $\sqrt{x^2 + y^2 + z^2} = \frac{12}{\sqrt{29}}$

### Maximum Volume Problems

**Example 7: Box with Maximum Volume**

Find the dimensions of a rectangular box with maximum volume inscribed in the ellipsoid:

$$\frac{x^2}{a^2} + \frac{y^2}{b^2} + \frac{z^2}{c^2} = 1$$

(Box has vertices at $(\pm x, \pm y, \pm z)$ in the first octant.)

Maximize $V = 8xyz$ subject to the constraint.

By symmetry and Lagrange multipliers:

$$x = \frac{a}{\sqrt{3}}, \quad y = \frac{b}{\sqrt{3}}, \quad z = \frac{c}{\sqrt{3}}$$

$$V_{\max} = \frac{8abc}{3\sqrt{3}}$$

### Surface Area Minimization

**Example 8: Can Design**

Design a cylindrical can with volume $V = \pi r^2h = 1000$ cm³ minimizing surface area $S = 2\pi r^2 + 2\pi rh$.

Using substitution: $h = 1000/(\pi r^2)$

$$S(r) = 2\pi r^2 + \frac{2000}{r}$$

$$S'(r) = 4\pi r - \frac{2000}{r^2} = 0$$

$$r^3 = \frac{500}{\pi} \implies r = \left(\frac{500}{\pi}\right)^{1/3} \approx 5.42 \text{ cm}$$

$$h = \frac{1000}{\pi r^2} \approx 10.84 \text{ cm}$$

Interestingly, $h = 2r$ (height equals diameter) for minimum surface area.

## Engineering Applications

### Structural Optimization

Minimize weight subject to strength constraints.

**Example 9: Beam Design**

A beam must support load $L$ with strength proportional to $wh^2$ (width × height²). Minimize cross-sectional area $A = wh$ subject to $wh^2 = k$.

Using Lagrange multipliers or substitution yields optimal proportions.

### Circuit Design

Minimize power loss subject to resistance constraints.

### Control Systems

Minimize error or energy in feedback systems.

## Machine Learning and Data Science

### Linear Regression

Minimize sum of squared errors:

$$E(\beta_0, \beta_1) = \sum_{i=1}^{n}(y_i - \beta_0 - \beta_1 x_i)^2$$

$$\frac{\partial E}{\partial \beta_0} = 0, \quad \frac{\partial E}{\partial \beta_1} = 0$$

Leads to normal equations and least-squares estimates.

### Neural Networks

Training minimizes loss function $L(\mathbf{w})$ using gradient descent:

$$\mathbf{w}_{k+1} = \mathbf{w}_k - \alpha\nabla L(\mathbf{w}_k)$$

### Support Vector Machines

Maximize margin subject to classification constraints.

## Environmental and Resource Management

**Example 10: Fishery Management**

Maximize sustainable yield $H(E, S)$ (harvest as function of effort $E$ and stock $S$) subject to population dynamics constraint.

## Summary of Optimization Techniques

| Problem Type | Method |
|--------------|--------|
| Unconstrained | Set $\nabla f = \mathbf{0}$, use second derivative test |
| Single equality constraint | Lagrange multipliers: $\nabla f = \lambda \nabla g$ |
| Multiple equality constraints | $\nabla f = \sum \lambda_i \nabla g_i$ |
| Inequality constraints | Karush-Kuhn-Tucker (KKT) conditions |
| Linear objective and constraints | Linear programming (simplex method) |
| Nonlinear general | Numerical methods (Newton, gradient descent) |

## Summary

Optimization applications span economics (profit maximization, utility maximization, cost minimization), physics (minimum energy, Fermat's principle, thermodynamics), geometry (closest points, maximum volume, minimum surface area), engineering (structural design, circuits), and machine learning (regression, neural networks). The tools of multivariable calculus—critical points, gradients, Hessians, and Lagrange multipliers—provide systematic methods for finding optimal solutions. Understanding these applications demonstrates the power and ubiquity of optimization in solving real-world problems across diverse fields.
