---
id: math201-t2-applications
title: "Matrix Applications"
order: 7
---

# Matrix Applications

Matrices are not just abstract mathematical objects—they are powerful computational tools that model real-world phenomena across science, engineering, economics, and computer science. This section explores three important applications: computer graphics transformations, Markov chains, and economic input-output models. These applications demonstrate how matrix operations solve practical problems.

## Computer Graphics Transformations

Modern computer graphics—from video games to animation to CAD software—rely heavily on matrix transformations. Every movement, rotation, and scaling operation can be represented as matrix multiplication.

### 2D Transformations

Points in 2D space are represented as column vectors: $\begin{bmatrix} x \\ y \end{bmatrix}$. Transformations are $2 \times 2$ matrices that map points to new locations.

#### Scaling

To scale by factor $s_x$ horizontally and $s_y$ vertically:

$$S = \begin{bmatrix} s_x & 0 \\ 0 & s_y \end{bmatrix}$$

**Example:** Double the width and triple the height of the point $(2, 3)$:

$$\begin{bmatrix} 2 & 0 \\ 0 & 3 \end{bmatrix}\begin{bmatrix} 2 \\ 3 \end{bmatrix} = \begin{bmatrix} 4 \\ 9 \end{bmatrix}$$

**Uniform scaling** (same factor in all directions): $S = \begin{bmatrix} s & 0 \\ 0 & s \end{bmatrix}$

#### Rotation

To rotate counterclockwise by angle $\theta$ about the origin:

$$R_\theta = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$$

**Example:** Rotate the point $(1, 0)$ by $90°$ (where $\theta = \pi/2$):

$$R_{90°} = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}, \quad R_{90°}\begin{bmatrix} 1 \\ 0 \end{bmatrix} = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$$

The point moves from $(1, 0)$ to $(0, 1)$ as expected for a $90°$ rotation.

**Example:** Rotate $(1, 1)$ by $45°$ (where $\cos 45° = \sin 45° = \frac{\sqrt{2}}{2}$):

$$\begin{bmatrix} \frac{\sqrt{2}}{2} & -\frac{\sqrt{2}}{2} \\ \frac{\sqrt{2}}{2} & \frac{\sqrt{2}}{2} \end{bmatrix}\begin{bmatrix} 1 \\ 1 \end{bmatrix} = \begin{bmatrix} 0 \\ \sqrt{2} \end{bmatrix} \approx \begin{bmatrix} 0 \\ 1.414 \end{bmatrix}$$

#### Reflection

Reflection across the $x$-axis: $\begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}$

Reflection across the $y$-axis: $\begin{bmatrix} -1 & 0 \\ 0 & 1 \end{bmatrix}$

Reflection across the line $y = x$: $\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$

**Example:** Reflect $(3, 2)$ across the $x$-axis:

$$\begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}\begin{bmatrix} 3 \\ 2 \end{bmatrix} = \begin{bmatrix} 3 \\ -2 \end{bmatrix}$$

#### Shearing

Horizontal shear (tilts vertical lines):

$$H = \begin{bmatrix} 1 & k \\ 0 & 1 \end{bmatrix}$$

**Example:** Apply horizontal shear with $k = 0.5$ to the unit square vertices:

$$\begin{bmatrix} 1 & 0.5 \\ 0 & 1 \end{bmatrix}\begin{bmatrix} 0 \\ 1 \end{bmatrix} = \begin{bmatrix} 0.5 \\ 1 \end{bmatrix}$$

The top-left corner $(0, 1)$ moves to $(0.5, 1)$, creating a parallelogram.

### Composing Transformations

Multiple transformations are composed by **matrix multiplication**. To rotate then scale, multiply: $S \cdot R_\theta$.

**Critical:** Order matters! Rotating then scaling differs from scaling then rotating.

**Example:** Rotate by $90°$ then scale by 2:

$$S \cdot R_{90°} = \begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix}\begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix} = \begin{bmatrix} 0 & -2 \\ 2 & 0 \end{bmatrix}$$

Apply to $(1, 0)$:

$$\begin{bmatrix} 0 & -2 \\ 2 & 0 \end{bmatrix}\begin{bmatrix} 1 \\ 0 \end{bmatrix} = \begin{bmatrix} 0 \\ 2 \end{bmatrix}$$

If we reverse the order (scale then rotate):

$$R_{90°} \cdot S = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}\begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix} = \begin{bmatrix} 0 & -2 \\ 2 & 0 \end{bmatrix}$$

In this case, the result is the same because scaling is uniform. But for non-uniform scaling or other combinations, order matters!

### 3D Graphics (Homogeneous Coordinates)

For translation (shifting position), we use $3 \times 3$ matrices in **homogeneous coordinates**, representing 2D points as $\begin{bmatrix} x \\ y \\ 1 \end{bmatrix}$.

**Translation** by $(t_x, t_y)$:

$$T = \begin{bmatrix} 1 & 0 & t_x \\ 0 & 1 & t_y \\ 0 & 0 & 1 \end{bmatrix}$$

**Example:** Translate $(2, 3)$ by $(5, -1)$:

$$\begin{bmatrix} 1 & 0 & 5 \\ 0 & 1 & -1 \\ 0 & 0 & 1 \end{bmatrix}\begin{bmatrix} 2 \\ 3 \\ 1 \end{bmatrix} = \begin{bmatrix} 7 \\ 2 \\ 1 \end{bmatrix}$$

The result represents the point $(7, 2)$.

Homogeneous coordinates allow rotation, scaling, **and** translation to be unified as matrix multiplication—crucial for efficient graphics pipelines.

## Markov Chains

A **Markov chain** is a stochastic process where the future state depends only on the current state, not the past. Markov chains model weather patterns, stock prices, genetics, web page ranking (PageRank), and more.

### State Transition Matrices

A Markov chain with $n$ states is described by an $n \times n$ **transition matrix** $P$ where:
- Entry $p_{ij}$ is the probability of moving from state $i$ to state $j$
- Each row sums to 1 (probabilities of all possible transitions)

**Example:** A simplified weather model with two states: Sunny (S) and Rainy (R).

Suppose:
- If today is sunny, tomorrow is sunny with probability 0.8, rainy with probability 0.2
- If today is rainy, tomorrow is sunny with probability 0.4, rainy with probability 0.6

Transition matrix:
$$P = \begin{bmatrix} 0.8 & 0.2 \\ 0.4 & 0.6 \end{bmatrix}$$

(Row 1: transitions from Sunny; Row 2: transitions from Rainy)

### State Vectors

The **state vector** $\mathbf{x}$ represents the probability distribution over states. For our weather example:

$$\mathbf{x} = \begin{bmatrix} p_S \\ p_R \end{bmatrix}$$

where $p_S$ is the probability of being in state Sunny, $p_R$ for Rainy, and $p_S + p_R = 1$.

### Time Evolution

If today's state is $\mathbf{x}_0$, tomorrow's state is:

$$\mathbf{x}_1 = P^T \mathbf{x}_0$$

(Note: Some formulations use $P\mathbf{x}$ with different matrix convention. We use row-stochastic matrices here.)

**Example:** Suppose today is sunny for certain: $\mathbf{x}_0 = \begin{bmatrix} 1 \\ 0 \end{bmatrix}$.

Tomorrow:
$$\mathbf{x}_1 = \begin{bmatrix} 0.8 & 0.4 \\ 0.2 & 0.6 \end{bmatrix}\begin{bmatrix} 1 \\ 0 \end{bmatrix} = \begin{bmatrix} 0.8 \\ 0.2 \end{bmatrix}$$

80% chance sunny, 20% chance rainy tomorrow.

The day after tomorrow:
$$\mathbf{x}_2 = P^T\mathbf{x}_1 = \begin{bmatrix} 0.8 & 0.4 \\ 0.2 & 0.6 \end{bmatrix}\begin{bmatrix} 0.8 \\ 0.2 \end{bmatrix} = \begin{bmatrix} 0.72 \\ 0.28 \end{bmatrix}$$

72% chance sunny, 28% chance rainy in two days.

Alternatively, compute $\mathbf{x}_2 = (P^T)^2 \mathbf{x}_0 = (P^2)^T \mathbf{x}_0$.

### Steady-State Distribution

As $n \to \infty$, many Markov chains converge to a **steady-state** or **stationary distribution** $\mathbf{x}_\infty$ satisfying:

$$P^T \mathbf{x}_\infty = \mathbf{x}_\infty$$

This is an **eigenvector equation** with eigenvalue 1.

**Example:** Find the steady-state for our weather model.

We need $(P^T - I)\mathbf{x} = \mathbf{0}$:

$$\begin{bmatrix} -0.2 & 0.4 \\ 0.2 & -0.4 \end{bmatrix}\begin{bmatrix} p_S \\ p_R \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix}$$

First equation: $-0.2p_S + 0.4p_R = 0 \Rightarrow p_S = 2p_R$

With constraint $p_S + p_R = 1$: $2p_R + p_R = 1 \Rightarrow p_R = 1/3, p_S = 2/3$

Steady-state:
$$\mathbf{x}_\infty = \begin{bmatrix} 2/3 \\ 1/3 \end{bmatrix}$$

In the long run, it's sunny 2/3 of the time and rainy 1/3 of the time, regardless of today's weather!

**Application:** Google's PageRank algorithm models the web as a Markov chain where states are web pages and transitions are links. The steady-state gives page importance rankings.

## Input-Output Economic Models

**Leontief input-output analysis** uses matrices to model economic interdependencies between sectors. This framework helps answer questions like: "If demand for cars increases, how much extra steel, rubber, and electronics production is needed?"

### The Model

Consider an economy with $n$ sectors. Let:
- $x_i$ = total output of sector $i$
- $d_i$ = external demand for sector $i$ (final consumers)
- $a_{ij}$ = amount of sector $i$ output needed to produce one unit of sector $j$ output

The **consumption matrix** (or **technology matrix**) is $A = [a_{ij}]$.

### The Fundamental Equation

For each sector $i$, total output equals internal consumption plus external demand:

$$x_i = \sum_{j=1}^{n} a_{ij} x_j + d_i$$

In matrix form:
$$\mathbf{x} = A\mathbf{x} + \mathbf{d}$$

Solving for $\mathbf{x}$:
$$\mathbf{x} - A\mathbf{x} = \mathbf{d}$$
$$(I - A)\mathbf{x} = \mathbf{d}$$
$$\mathbf{x} = (I - A)^{-1}\mathbf{d}$$

The matrix $(I - A)^{-1}$ is called the **Leontief inverse** or **total requirements matrix**.

### Example: Three-Sector Economy

Consider an economy with three sectors: Agriculture (A), Manufacturing (M), and Services (S).

Consumption matrix (entries are fractions):
$$A = \begin{bmatrix} 0.2 & 0.3 & 0.1 \\ 0.3 & 0.1 & 0.2 \\ 0.1 & 0.2 & 0.3 \end{bmatrix}$$

Interpretation: Producing 1 unit of Manufacturing requires 0.3 units of Agriculture, 0.1 units of Manufacturing, and 0.2 units of Services.

Suppose external demand is:
$$\mathbf{d} = \begin{bmatrix} 100 \\ 200 \\ 150 \end{bmatrix}$$

(100 units of Agriculture for final consumers, 200 Manufacturing, 150 Services)

**Question:** What total output is needed from each sector?

**Solution:**

Compute $I - A$:
$$I - A = \begin{bmatrix} 0.8 & -0.3 & -0.1 \\ -0.3 & 0.9 & -0.2 \\ -0.1 & -0.2 & 0.7 \end{bmatrix}$$

Find $(I - A)^{-1}$ using row reduction (computational details omitted):
$$(I - A)^{-1} \approx \begin{bmatrix} 1.515 & 0.606 & 0.364 \\ 0.606 & 1.394 & 0.485 \\ 0.364 & 0.485 & 1.697 \end{bmatrix}$$

Then:
$$\mathbf{x} = (I - A)^{-1}\mathbf{d} \approx \begin{bmatrix} 1.515 & 0.606 & 0.364 \\ 0.606 & 1.394 & 0.485 \\ 0.364 & 0.485 & 1.697 \end{bmatrix}\begin{bmatrix} 100 \\ 200 \\ 150 \end{bmatrix} \approx \begin{bmatrix} 318 \\ 412 \\ 391 \end{bmatrix}$$

**Interpretation:** To meet external demand, the economy needs total output of approximately:
- 318 units from Agriculture (100 for consumers + 218 for internal use)
- 412 units from Manufacturing (200 for consumers + 212 for internal use)
- 391 units from Services (150 for consumers + 241 for internal use)

The Leontief inverse captures all the **direct and indirect** requirements rippling through the economy.

### Economic Insights

The $(I - A)^{-1}$ matrix reveals **economic multipliers**. For example, if entry $(1,2)$ of $(I - A)^{-1}$ is 0.606, then increasing Manufacturing demand by 1 unit requires an additional 0.606 units of Agriculture output (accounting for all cascading effects).

This model has applications in:
- Economic planning and policy
- Environmental impact assessment (carbon footprint of production)
- Supply chain optimization
- Regional economic analysis

## Summary

**Computer Graphics:**
- Matrices represent geometric transformations: scaling, rotation, reflection, shearing
- Matrix multiplication composes transformations; order matters
- Homogeneous coordinates unify all transformations including translation

**Markov Chains:**
- Transition matrix $P$ describes state probabilities
- State evolution: $\mathbf{x}_{n+1} = P^T \mathbf{x}_n$
- Steady-state: eigenvector with eigenvalue 1
- Applications: weather, finance, PageRank, genetics

**Input-Output Models:**
- Consumption matrix $A$ describes inter-sector dependencies
- Production levels: $\mathbf{x} = (I - A)^{-1}\mathbf{d}$
- Leontief inverse reveals economic multipliers
- Applications: economic planning, environmental analysis

These applications demonstrate that matrices are not mere abstractions—they are powerful tools for modeling and solving real-world problems across diverse fields.
