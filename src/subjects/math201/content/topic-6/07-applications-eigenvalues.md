# Applications of Eigenvalues and Eigenvectors

## Introduction

Eigenvalues and eigenvectors are not just abstract mathematical concepts—they're fundamental tools used across science, engineering, economics, and computer science. They reveal the "natural modes" of systems, allowing us to understand long-term behavior, optimize algorithms, and extract meaningful patterns from data.

This section explores four major applications: Google's PageRank algorithm, population dynamics, differential equations, and an introduction to Principal Component Analysis (PCA).

---

## Application 1: Google PageRank

### The Web as a Graph

The World Wide Web can be modeled as a directed graph where:
- **Nodes** represent web pages
- **Edges** represent hyperlinks

Google's challenge: How do we rank the importance of billions of web pages?

### The PageRank Idea

A page is important if:
1. Many pages link to it
2. Those pages are themselves important

This recursive definition leads to an eigenvector problem!

### The Link Matrix

For $n$ web pages, create the **link matrix** $L$ where:

$$L_{ij} = \begin{cases} 1 & \text{if page } j \text{ links to page } i \\ 0 & \text{otherwise} \end{cases}$$

Normalize each column to create the **transition matrix** $M$:

$$M_{ij} = \frac{L_{ij}}{\sum_{k=1}^n L_{kj}}$$

Each column sums to 1. Entry $M_{ij}$ is the probability of moving from page $j$ to page $i$ by clicking a random link.

### Example: 4-Page Web

Consider 4 pages with links:
- Page 1 → Pages 2, 3
- Page 2 → Page 3
- Page 3 → Page 1
- Page 4 → Pages 1, 2, 3

Link matrix:
$$L = \begin{bmatrix} 0 & 0 & 1 & 1 \\ 1 & 0 & 0 & 1 \\ 1 & 1 & 0 & 1 \\ 0 & 0 & 0 & 0 \end{bmatrix}$$

Transition matrix (normalize columns):
$$M = \begin{bmatrix} 0 & 0 & 1 & 1/3 \\ 1/2 & 0 & 0 & 1/3 \\ 1/2 & 1 & 0 & 1/3 \\ 0 & 0 & 0 & 0 \end{bmatrix}$$

### The PageRank Vector

The **PageRank vector** $\mathbf{r}$ satisfies:

$$M\mathbf{r} = \mathbf{r}$$

This is an eigenvector equation with eigenvalue $\lambda = 1$!

The PageRank vector represents the steady-state probability distribution of a random surfer who:
- Starts at a random page
- Repeatedly clicks random outgoing links
- Eventually settles into a stable distribution

**Key Theorem:** For a connected web graph, the transition matrix has eigenvalue $\lambda = 1$, and the corresponding eigenvector (normalized so entries sum to 1) is the unique PageRank vector.

### Computing PageRank

For our 4-page example, solve $(M - I)\mathbf{r} = \mathbf{0}$:

$$M - I = \begin{bmatrix} -1 & 0 & 1 & 1/3 \\ 1/2 & -1 & 0 & 1/3 \\ 1/2 & 1 & -1 & 1/3 \\ 0 & 0 & 0 & -1 \end{bmatrix}$$

After row reduction and normalization:

$$\mathbf{r} = \begin{bmatrix} 0.387 \\ 0.194 \\ 0.387 \\ 0 \end{bmatrix}$$

**Interpretation:**
- Pages 1 and 3 are most important (rank ≈ 0.387)
- Page 2 is moderately important (rank ≈ 0.194)
- Page 4 has no incoming links (rank = 0)

Page 3 links to page 1, and page 1 links to pages 2 and 3, creating a cycle that concentrates importance.

### The Power Method

For large webs, Google uses the **power method**: start with an initial guess $\mathbf{r}_0$ and iterate:

$$\mathbf{r}_{k+1} = M\mathbf{r}_k$$

This converges to the dominant eigenvector (eigenvalue 1)!

**Why it works:** As $k \to \infty$, $M^k\mathbf{r}_0$ approaches the eigenspace of $\lambda = 1$.

---

## Application 2: Population Dynamics

### Age-Structured Population Models

Consider a population divided into age groups with different survival and reproduction rates. The **Leslie matrix** models population change over discrete time steps.

**Example:** A species with three life stages:
- Juveniles (0-1 year)
- Young adults (1-2 years)
- Adults (2+ years)

Demographics:
- Juveniles: 50% survive to young adults, don't reproduce
- Young adults: 80% survive to adults, each produces 1 juvenile on average
- Adults: 70% survive year-to-year, each produces 2 juveniles on average

Leslie matrix:
$$L = \begin{bmatrix} 0 & 1 & 2 \\ 0.5 & 0 & 0 \\ 0 & 0.8 & 0.7 \end{bmatrix}$$

Starting with $\mathbf{x}_0 = \begin{bmatrix} 100 \\ 50 \\ 30 \end{bmatrix}$, the population after $n$ years is:

$$\mathbf{x}_n = L^n\mathbf{x}_0$$

### Long-Term Behavior

**Find eigenvalues:**

$$\det(L - \lambda I) = -\lambda^3 + 0.7\lambda^2 + 0.5\lambda + 0.8 = 0$$

One real eigenvalue: $\lambda_1 \approx 1.22$ (dominant)

**Find eigenvector for $\lambda_1 = 1.22$:**

After solving $(L - 1.22I)\mathbf{v} = \mathbf{0}$:

$$\mathbf{v}_1 \approx \begin{bmatrix} 1 \\ 0.41 \\ 0.27 \end{bmatrix}$$

(normalized arbitrarily)

### Interpretation

1. **Growth rate:** $\lambda_1 = 1.22$ means the population grows by 22% per year

2. **Stable age distribution:** As $n \to \infty$:

$$\mathbf{x}_n \approx c \cdot 1.22^n \begin{bmatrix} 1 \\ 0.41 \\ 0.27 \end{bmatrix}$$

The population grows exponentially while the proportions stabilize to the eigenvector ratios.

3. **Conservation implications:** If $\lambda < 1$, the species is declining toward extinction. If $\lambda > 1$, it's growing. Management strategies aim to keep $\lambda \geq 1$ for endangered species.

---

## Application 3: Systems of Differential Equations

### The General Form

Consider a system:

$$\frac{d\mathbf{x}}{dt} = A\mathbf{x}$$

where $\mathbf{x}(t)$ is a vector-valued function and $A$ is a constant matrix.

**Examples:**
- Coupled oscillators (springs connected in series)
- Chemical reaction networks
- Predator-prey models
- Electrical circuits with multiple components

### Solution via Eigenvalues

If $A$ is diagonalizable with $A = PDP^{-1}$, the general solution is:

$$\mathbf{x}(t) = Pe^{Dt}P^{-1}\mathbf{x}_0 = \sum_{i=1}^n c_i e^{\lambda_i t}\mathbf{v}_i$$

where:
- $\lambda_i$ are eigenvalues
- $\mathbf{v}_i$ are eigenvectors
- $c_i$ are constants determined by initial conditions $\mathbf{x}_0$

Each term $e^{\lambda_i t}\mathbf{v}_i$ is an **eigenmode**: an independent solution that grows or decays exponentially.

### Example: Coupled Tanks

Two tanks contain salt water. Water flows between them:
- Tank 1 → Tank 2 at 3 L/min
- Tank 2 → Tank 1 at 2 L/min
- Fresh water enters Tank 1 at 1 L/min
- Solution leaves Tank 2 at 1 L/min

Let $x_1(t)$ and $x_2(t)$ be the salt concentrations (kg) in each tank.

The system:
$$\frac{d\mathbf{x}}{dt} = \begin{bmatrix} -3/V_1 & 2/V_2 \\ 3/V_1 & -3/V_2 \end{bmatrix}\mathbf{x}$$

For equal volumes $V_1 = V_2 = 100$ L:

$$A = \begin{bmatrix} -0.03 & 0.02 \\ 0.03 & -0.03 \end{bmatrix}$$

**Eigenvalues:**

$$\det(A - \lambda I) = (-0.03-\lambda)^2 - 0.0006 = \lambda^2 + 0.06\lambda + 0.0003 = 0$$

$$\lambda_1 = 0, \quad \lambda_2 = -0.06$$

**Interpretation:**
- $\lambda_1 = 0$: equilibrium state (constant salt distribution)
- $\lambda_2 = -0.06$: transient mode that decays

**General solution:**

$$\mathbf{x}(t) = c_1\mathbf{v}_1 + c_2 e^{-0.06t}\mathbf{v}_2$$

As $t \to \infty$, the second term vanishes, and the system approaches equilibrium $c_1\mathbf{v}_1$.

---

## Application 4: Principal Component Analysis (PCA)

### The Data Analysis Problem

Given a dataset with many variables (features), how do we:
- Reduce dimensionality while preserving information?
- Find the "most important" directions in the data?
- Visualize high-dimensional data?

**Answer:** PCA uses eigenvectors of the covariance matrix!

### The Mathematics

Given $n$ data points in $\mathbb{R}^d$, form the **data matrix** $X$ (each row is a data point, centered to have mean zero).

The **covariance matrix** is:

$$C = \frac{1}{n}X^TX$$

$C$ is symmetric and positive semidefinite.

**Principal components** are the eigenvectors of $C$:
- 1st principal component: eigenvector with largest eigenvalue
- 2nd principal component: eigenvector with 2nd largest eigenvalue
- And so on...

**Variance explained:** The eigenvalue $\lambda_i$ equals the variance of the data projected onto the $i$th principal component.

### Example: 2D Data

Dataset of student heights (cm) and weights (kg):

$$X = \begin{bmatrix} 170 & 65 \\ 180 & 75 \\ 160 & 55 \\ 175 & 70 \\ 165 & 60 \end{bmatrix}$$

After centering (subtract column means):

$$X_{\text{centered}} = \begin{bmatrix} 0 & 0 \\ 10 & 10 \\ -10 & -10 \\ 5 & 5 \\ -5 & -5 \end{bmatrix}$$

Covariance matrix:

$$C = \frac{1}{5}X^TX = \frac{1}{5}\begin{bmatrix} 250 & 250 \\ 250 & 250 \end{bmatrix} = \begin{bmatrix} 50 & 50 \\ 50 & 50 \end{bmatrix}$$

**Eigenvalues:**

$$\det(C - \lambda I) = (50-\lambda)^2 - 2500 = \lambda^2 - 100\lambda = \lambda(\lambda - 100)$$

$$\lambda_1 = 100, \quad \lambda_2 = 0$$

**Eigenvectors:**

For $\lambda_1 = 100$: $\mathbf{v}_1 = \frac{1}{\sqrt{2}}\begin{bmatrix} 1 \\ 1 \end{bmatrix}$

For $\lambda_2 = 0$: $\mathbf{v}_2 = \frac{1}{\sqrt{2}}\begin{bmatrix} 1 \\ -1 \end{bmatrix}$

**Interpretation:**
- **PC1** ($\mathbf{v}_1$): Points along the diagonal (height and weight together). Captures 100% of variance!
- **PC2** ($\mathbf{v}_2$): Points along the anti-diagonal (height vs. weight). Captures 0% of variance (data lies on a line).

The data is essentially 1-dimensional! We can reduce from 2 features to 1 without losing information.

### Dimensionality Reduction

To reduce from $d$ dimensions to $k < d$ dimensions:
1. Find eigenvectors of covariance matrix
2. Sort by eigenvalue (largest first)
3. Keep top $k$ eigenvectors
4. Project data onto these $k$ directions

**Variance retained:**

$$\frac{\sum_{i=1}^k \lambda_i}{\sum_{i=1}^d \lambda_i}$$

Commonly, we keep enough components to retain 90-95% of variance.

### Real-World PCA Applications

1. **Image compression:** Faces can be represented with ~100 principal components instead of 10,000+ pixels

2. **Genomics:** Reduce thousands of gene expression measurements to a few principal components

3. **Finance:** Identify common factors driving returns across many stocks

4. **Natural language:** Reduce high-dimensional word vectors (embeddings) for visualization

---

## Summary

**Google PageRank:**
- Models web as Markov chain with transition matrix $M$
- PageRank vector is eigenvector for eigenvalue $\lambda = 1$
- Power method iteratively computes: $\mathbf{r}_{k+1} = M\mathbf{r}_k$

**Population Dynamics:**
- Leslie matrix models age-structured populations
- Dominant eigenvalue determines growth/decline rate
- Dominant eigenvector gives stable age distribution

**Differential Equations:**
- System $\frac{d\mathbf{x}}{dt} = A\mathbf{x}$ solved using eigenmodes
- Solution: $\mathbf{x}(t) = \sum c_i e^{\lambda_i t}\mathbf{v}_i$
- Eigenvalues determine stability and long-term behavior

**Principal Component Analysis:**
- Eigenvectors of covariance matrix are principal components
- Eigenvalues measure variance explained
- Reduces dimensionality while preserving information
- Foundation of many machine learning techniques

**Common Theme:**
Eigenvalues and eigenvectors reveal the "natural directions" of a system—whether it's importance flow through the web, population dynamics, oscillation modes, or variance in data. They transform complex systems into simpler, independent components.
