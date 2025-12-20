---
id: math201-t4-applications
title: "Applications of Basis"
order: 7
---

# Applications of Basis

## Introduction

The concepts of linear independence, basis, and dimension are not merely abstract mathematical ideas - they have profound practical applications across science, engineering, computer science, and data analysis. Understanding bases allows us to efficiently represent data, compress information, solve complex systems, and extract meaningful patterns from high-dimensional datasets.

## Data Representation and Compression

### Coordinate Systems

A basis provides a coordinate system for a vector space. Once we choose a basis, every vector can be uniquely represented by its coordinates, which are just scalars.

**Example 1: Image Representation**

A grayscale image with $m \times n$ pixels can be viewed as a vector in $\mathbb{R}^{mn}$. The standard basis represents each pixel independently:

$$\text{Image} = \sum_{i,j} p_{ij} \mathbf{e}_{ij}$$

where $p_{ij}$ is the intensity of pixel $(i,j)$.

However, we can choose different bases that capture image structure more efficiently.

### JPEG Compression

JPEG compression uses the **Discrete Cosine Transform (DCT)** basis instead of the pixel basis. This basis represents images as combinations of cosine waves at different frequencies.

**Key Insight**: Most natural images have most of their "energy" in a small number of low-frequency DCT basis vectors. By keeping only the significant coefficients and discarding near-zero ones, we achieve compression.

**Example 2: DCT Compression**

Consider an $8 \times 8$ image block. In the pixel basis, we need 64 coefficients. After DCT transformation:
- Perhaps only 10-15 coefficients are significant
- We can discard the rest with minimal visual quality loss
- Compression ratio: 64/12 ≈ 5:1

### Dimensionality Reduction

When data lies approximately in a lower-dimensional subspace, we can find a basis for that subspace and represent data using fewer coordinates.

**Example 3: Color Images**

RGB color images have three channels (red, green, blue). For each pixel:

$$\text{Color} = r\begin{bmatrix} 1 \\ 0 \\ 0 \end{bmatrix} + g\begin{bmatrix} 0 \\ 1 \\ 0 \end{bmatrix} + b\begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}$$

But if we analyze a specific image, we might find that all colors lie approximately in a 2D subspace of RGB space. A basis for this subspace allows representation with just 2 numbers per pixel instead of 3.

## Principal Component Analysis (PCA)

PCA is one of the most important applications of basis theory in data science and machine learning.

### The Idea

Given high-dimensional data, PCA finds a new basis (the principal components) where:
1. The first basis vector points in the direction of maximum variance
2. The second basis vector points in the direction of maximum remaining variance (orthogonal to the first)
3. And so on...

This new basis reveals the intrinsic dimensionality of the data.

### Example 4: Student Performance Data

Suppose we measure 100 features for students (test scores, homework grades, attendance, etc.). PCA might reveal:
- First principal component: "Overall academic ability" (explains 60% of variance)
- Second principal component: "Math vs. Language skills" (explains 20% of variance)
- Remaining 98 components: Mostly noise

We can represent each student using just 2 coordinates instead of 100, capturing 80% of the information.

**Mathematical Framework**:

Given data vectors $\mathbf{x}_1, \ldots, \mathbf{x}_N$ in $\mathbb{R}^n$:
1. Center the data: $\tilde{\mathbf{x}}_i = \mathbf{x}_i - \bar{\mathbf{x}}$
2. Form the covariance matrix $C = \frac{1}{N}\sum_{i=1}^N \tilde{\mathbf{x}}_i \tilde{\mathbf{x}}_i^T$
3. Find eigenvectors of $C$ (these form the principal component basis)
4. Project data onto the top $k$ eigenvectors

The rank of the data matrix tells us the maximum number of meaningful principal components.

## Change of Basis

Different bases are useful for different purposes. Change of basis allows us to convert between coordinate systems.

### Coordinate Transformation

If $\mathcal{B} = \{\mathbf{b}_1, \ldots, \mathbf{b}_n\}$ and $\mathcal{C} = \{\mathbf{c}_1, \ldots, \mathbf{c}_n\}$ are two bases for $\mathbb{R}^n$, the **change of basis matrix** from $\mathcal{B}$ to $\mathcal{C}$ is:

$$P_{\mathcal{C} \leftarrow \mathcal{B}} = \begin{bmatrix} [\mathbf{b}_1]_\mathcal{C} & [\mathbf{b}_2]_\mathcal{C} & \cdots & [\mathbf{b}_n]_\mathcal{C} \end{bmatrix}$$

If $[\mathbf{v}]_\mathcal{B}$ are the coordinates of $\mathbf{v}$ in basis $\mathcal{B}$, then:

$$[\mathbf{v}]_\mathcal{C} = P_{\mathcal{C} \leftarrow \mathcal{B}} [\mathbf{v}]_\mathcal{B}$$

**Example 5: Rotation in Graphics**

In computer graphics, we often want to rotate objects. Given a point with coordinates $(x, y)$ in the standard basis, we can find its coordinates in a rotated basis using a change of basis matrix:

$$R_\theta = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$$

This is more efficient than rotating each object independently.

### Diagonalization

A matrix $A$ is diagonalizable if there exists a basis of eigenvectors. In this eigenvector basis, $A$ becomes diagonal:

$$A = PDP^{-1}$$

where $D$ is diagonal and $P$ contains eigenvectors.

**Application**: Computing $A^{1000}$ is hard, but $D^{1000}$ is easy (just raise diagonal entries to the 1000th power).

**Example 6: Population Dynamics**

A population with multiple age groups evolves according to:

$$\mathbf{p}_{n+1} = A\mathbf{p}_n$$

where $A$ is the Leslie matrix. In the eigenvector basis:
- The dominant eigenvector gives the stable age distribution
- The dominant eigenvalue gives the long-term growth rate

After many generations: $\mathbf{p}_n \approx c\lambda^n \mathbf{v}$ where $\lambda$ is the dominant eigenvalue and $\mathbf{v}$ is its eigenvector.

## Signal Processing

### Fourier Basis

The Fourier basis represents signals as combinations of sine and cosine waves. For a signal space, a Fourier basis is:

$$\{1, \cos(t), \sin(t), \cos(2t), \sin(2t), \cos(3t), \sin(3t), \ldots\}$$

**Example 7: Audio Compression (MP3)**

Audio signals are transformed to the Fourier (or related) basis:
- Low frequencies: Human-audible bass and mid-range
- High frequencies: Less perceptible details

By discarding high-frequency components that humans barely hear, MP3 achieves 10:1 compression while maintaining apparent quality.

### Wavelet Basis

Wavelets provide a basis that captures both time and frequency information, unlike Fourier which is purely frequency-based.

**Application**: Image denoising, JPEG2000 compression, signal analysis in biomedical engineering.

## Machine Learning and Feature Engineering

### Feature Spaces

In machine learning, we often represent objects as vectors in a feature space. The choice of features (basis) dramatically affects learning performance.

**Example 8: Polynomial Features**

For regression with input $x$, we might use the basis:

$$\mathcal{B} = \{1, x, x^2, x^3, \ldots, x^d\}$$

A linear combination gives polynomial regression:

$$y = c_0 + c_1 x + c_2 x^2 + \cdots + c_d x^d$$

The dimension $d+1$ determines model complexity.

### Kernel Methods

Support Vector Machines (SVMs) implicitly work in high-dimensional feature spaces through kernel functions, exploiting basis theory without explicitly computing coordinates.

## Solving Differential Equations

### Solution Spaces

The solution set to a homogeneous linear differential equation forms a vector space.

**Example 9: Second-Order ODE**

Consider $y'' + y = 0$. The solution space is 2-dimensional with basis:

$$\mathcal{B} = \{\cos(t), \sin(t)\}$$

The general solution is:

$$y(t) = c_1 \cos(t) + c_2 \sin(t)$$

The constants $c_1, c_2$ are determined by initial conditions.

**Example 10: System of ODEs**

For the system $\mathbf{x}' = A\mathbf{x}$, if $A$ has eigenbasis $\{\mathbf{v}_1, \ldots, \mathbf{v}_n\}$ with eigenvalues $\lambda_1, \ldots, \lambda_n$, the general solution is:

$$\mathbf{x}(t) = c_1 e^{\lambda_1 t}\mathbf{v}_1 + c_2 e^{\lambda_2 t}\mathbf{v}_2 + \cdots + c_n e^{\lambda_n t}\mathbf{v}_n$$

The eigenvector basis decouples the system.

## Quantum Mechanics

### State Spaces

In quantum mechanics, physical states are vectors in a Hilbert space (infinite-dimensional vector space with inner product).

**Example 11: Spin-1/2 Particle**

A spin-1/2 particle (like an electron) has a 2-dimensional state space. Common bases:

**$z$-basis**: $\left\{|{\uparrow}\rangle, |{\downarrow}\rangle\right\}$ (spin up/down along $z$-axis)

**$x$-basis**: $\left\{|{\rightarrow}\rangle, |{\leftarrow}\rangle\right\}$ (spin right/left along $x$-axis)

A general state: $|\psi\rangle = \alpha|{\uparrow}\rangle + \beta|{\downarrow}\rangle$ where $|\alpha|^2 + |\beta|^2 = 1$

Different measurement bases give different observable properties.

### Quantum Computing

Quantum algorithms leverage different basis representations:
- Computational basis: $\{|0\rangle, |1\rangle\}$
- Hadamard basis: $\{|+\rangle, |-\rangle\}$ where $|+\rangle = \frac{1}{\sqrt{2}}(|0\rangle + |1\rangle)$

Quantum Fourier Transform uses yet another basis, enabling fast quantum algorithms.

## Computer Graphics and Animation

### 3D Transformations

3D graphics use homogeneous coordinates (4D vectors) to represent points and transformations uniformly.

**Standard basis in homogeneous coordinates**:

$$\mathcal{B} = \left\{\begin{bmatrix} 1 \\ 0 \\ 0 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 1 \\ 0 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 0 \\ 1 \\ 0 \end{bmatrix}, \begin{bmatrix} 0 \\ 0 \\ 0 \\ 1 \end{bmatrix}\right\}$$

Transformations (rotation, translation, scaling, projection) are $4 \times 4$ matrices in this basis.

### Animation and Morphing

Character animation uses basis shapes (blend shapes) to create facial expressions.

**Example 12**: A face model might have basis shapes:
- Neutral face
- Smile
- Frown
- Raised eyebrows
- ...

Any expression is a linear combination:

$$\text{Expression} = c_1 \cdot \text{Neutral} + c_2 \cdot \text{Smile} + c_3 \cdot \text{Frown} + \cdots$$

The coefficients $c_i$ (coordinates in the blend shape basis) are animated over time.

## Network Analysis and PageRank

### Graph Laplacian

For a graph, the Laplacian matrix's eigenvectors form a basis that reveals graph structure.

**Application**: Community detection in social networks uses eigenvectors of the graph Laplacian to find clusters.

### PageRank Algorithm

Google's PageRank algorithm finds the dominant eigenvector of a modified adjacency matrix. This eigenvector gives the "importance" of each webpage.

The iteration $\mathbf{r}_{n+1} = A\mathbf{r}_n$ converges to the dominant eigenvector, which serves as a natural basis vector for ranking.

## Error Correction and Coding Theory

### Linear Codes

Error-correcting codes use bases of subspaces to encode and decode information.

**Example 13: Hamming Code**

The [7,4] Hamming code embeds 4 data bits into 7 bits such that single-bit errors can be corrected. The code is a 4-dimensional subspace of $\mathbb{F}_2^7$ (binary 7-dimensional space).

A basis for this subspace generates all valid codewords. The null space of the parity check matrix identifies errors.

## Database and Recommendation Systems

### Latent Factor Models

Recommendation systems (like Netflix) represent:
- Users as vectors in a feature space
- Movies as vectors in the same space

The rating user $i$ gives movie $j$ is approximately:

$$r_{ij} \approx \mathbf{u}_i^T \mathbf{m}_j$$

This is equivalent to finding a low-rank approximation of the rating matrix. The rank tells us the number of "latent factors" (dimensions of taste space like "action-loving", "romance-loving", etc.).

**Example 14**: If the rating matrix has rank 20, we can represent each user and movie with just 20 numbers, capturing the essential preference patterns.

## Practical Considerations

### Computational Efficiency

- **Sparse bases**: In many applications, most coordinates are zero, enabling efficient storage and computation
- **Orthogonal bases**: Simplify many calculations (finding coordinates becomes inner products)
- **Structured bases**: FFT exploits structure in Fourier basis for $O(n \log n)$ transforms instead of $O(n^2)$

### Numerical Stability

The choice of basis affects numerical stability. Ill-conditioned basis matrices lead to large rounding errors.

**Example**: The monomial basis $\{1, x, x^2, x^3, \ldots\}$ for polynomials is numerically unstable for high degrees. Orthogonal polynomial bases (Legendre, Chebyshev) are much more stable.

## Summary

Basis theory is fundamental to countless applications across science and engineering. Key applications include:

- **Data compression**: Using bases where information is sparse (JPEG, MP3)
- **Dimensionality reduction**: Finding low-dimensional subspaces that capture data (PCA)
- **Change of basis**: Transforming to coordinates where problems simplify (diagonalization, Fourier analysis)
- **Signal processing**: Representing signals in frequency domain (Fourier, wavelets)
- **Machine learning**: Feature engineering and kernel methods
- **Differential equations**: Eigenvector bases decouple systems
- **Quantum mechanics**: Different bases for different observables
- **Computer graphics**: Coordinate systems for transformations
- **Network analysis**: Eigenvector bases reveal structure (PageRank, clustering)

Understanding how to choose, find, and work with appropriate bases is essential for efficiently solving real-world problems. The theoretical concepts of linear independence, span, and dimension directly translate into practical tools for representing and manipulating data, signals, and systems.
