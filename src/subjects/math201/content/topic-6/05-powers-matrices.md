---
id: math201-t6-powers
title: "Powers of Matrices"
order: 5
---

# Computing Matrix Powers Using Diagonalization

## The Power of Diagonalization

One of the most practical applications of diagonalization is computing high powers of matrices. Without diagonalization, computing $A^{100}$ requires 99 matrix multiplications—tedious and error-prone. With diagonalization, it becomes remarkably simple.

**Key Idea:** If $A = PDP^{-1}$, then:

$$A^n = PD^nP^{-1}$$

And computing $D^n$ is trivial—just raise each diagonal entry to the $n$th power!

**Why this works:**

$$A^2 = AA = (PDP^{-1})(PDP^{-1}) = PD(P^{-1}P)DP^{-1} = PDIDP^{-1} = PD^2P^{-1}$$

$$A^3 = A^2A = (PD^2P^{-1})(PDP^{-1}) = PD^2DP^{-1} = PD^3P^{-1}$$

By induction: $A^n = PD^nP^{-1}$ for any positive integer $n$.

---

## Example 1: Computing $A^{10}$

Compute $A^{10}$ where:

$$A = \begin{bmatrix} 5 & 2 \\ 2 & 2 \end{bmatrix}$$

**Step 1: Diagonalize $A$**

From our previous work:
- Eigenvalues: $\lambda_1 = 6, \lambda_2 = 1$
- Eigenvectors: $\mathbf{v}_1 = \begin{bmatrix} 2 \\ 1 \end{bmatrix}, \mathbf{v}_2 = \begin{bmatrix} 1 \\ -2 \end{bmatrix}$

$$P = \begin{bmatrix} 2 & 1 \\ 1 & -2 \end{bmatrix}, \quad D = \begin{bmatrix} 6 & 0 \\ 0 & 1 \end{bmatrix}, \quad P^{-1} = \begin{bmatrix} 2/5 & 1/5 \\ 1/5 & -2/5 \end{bmatrix}$$

**Step 2: Compute $D^{10}$**

$$D^{10} = \begin{bmatrix} 6^{10} & 0 \\ 0 & 1^{10} \end{bmatrix} = \begin{bmatrix} 60466176 & 0 \\ 0 & 1 \end{bmatrix}$$

**Step 3: Compute $A^{10} = PD^{10}P^{-1}$**

$$A^{10} = \begin{bmatrix} 2 & 1 \\ 1 & -2 \end{bmatrix}\begin{bmatrix} 60466176 & 0 \\ 0 & 1 \end{bmatrix}\begin{bmatrix} 2/5 & 1/5 \\ 1/5 & -2/5 \end{bmatrix}$$

$$= \begin{bmatrix} 120932352 & 1 \\ 60466176 & -2 \end{bmatrix}\begin{bmatrix} 2/5 & 1/5 \\ 1/5 & -2/5 \end{bmatrix}$$

$$= \begin{bmatrix} 48372941.2 & 24186470.2 \\ 24186470.2 & 12093234.8 \end{bmatrix}$$

Wait, let me recalculate more carefully:

$$PD^{10} = \begin{bmatrix} 2 & 1 \\ 1 & -2 \end{bmatrix}\begin{bmatrix} 60466176 & 0 \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} 120932352 & 1 \\ 60466176 & -2 \end{bmatrix}$$

$$A^{10} = \begin{bmatrix} 120932352 & 1 \\ 60466176 & -2 \end{bmatrix}\begin{bmatrix} 2/5 & 1/5 \\ 1/5 & -2/5 \end{bmatrix}$$

$$= \begin{bmatrix} \frac{241864704 + 1}{5} & \frac{120932352 - 2}{5} \\ \frac{120932352 - 2}{5} & \frac{60466176 + 4}{5} \end{bmatrix}$$

$$= \begin{bmatrix} 48372941 & 24186470 \\ 24186470 & 12093236 \end{bmatrix}$$

Imagine computing this by multiplying $A$ by itself 10 times!

---

## Example 2: Fibonacci Numbers

The Fibonacci sequence satisfies:
$$F_0 = 0, \quad F_1 = 1, \quad F_{n+1} = F_n + F_{n-1}$$

We can express this as a matrix equation:

$$\begin{bmatrix} F_{n+1} \\ F_n \end{bmatrix} = \begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix}\begin{bmatrix} F_n \\ F_{n-1} \end{bmatrix}$$

Therefore:

$$\begin{bmatrix} F_n \\ F_{n-1} \end{bmatrix} = \begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix}^{n-1}\begin{bmatrix} 1 \\ 0 \end{bmatrix}$$

Let $A = \begin{bmatrix} 1 & 1 \\ 1 & 0 \end{bmatrix}$. To find a formula for $F_n$, we diagonalize $A$.

**Find eigenvalues:**

$$\det(A - \lambda I) = \det\begin{bmatrix} 1-\lambda & 1 \\ 1 & -\lambda \end{bmatrix} = \lambda^2 - \lambda - 1 = 0$$

$$\lambda = \frac{1 \pm \sqrt{5}}{2}$$

These are the golden ratio $\phi = \frac{1+\sqrt{5}}{2} \approx 1.618$ and $\hat{\phi} = \frac{1-\sqrt{5}}{2} \approx -0.618$!

**Find eigenvectors:**

For $\lambda_1 = \phi$:
$$\mathbf{v}_1 = \begin{bmatrix} \phi \\ 1 \end{bmatrix}$$

For $\lambda_2 = \hat{\phi}$:
$$\mathbf{v}_2 = \begin{bmatrix} \hat{\phi} \\ 1 \end{bmatrix}$$

**Diagonalization:**

$$P = \begin{bmatrix} \phi & \hat{\phi} \\ 1 & 1 \end{bmatrix}, \quad D = \begin{bmatrix} \phi & 0 \\ 0 & \hat{\phi} \end{bmatrix}$$

$$P^{-1} = \frac{1}{\phi - \hat{\phi}}\begin{bmatrix} 1 & -\hat{\phi} \\ -1 & \phi \end{bmatrix} = \frac{1}{\sqrt{5}}\begin{bmatrix} 1 & -\hat{\phi} \\ -1 & \phi \end{bmatrix}$$

**Binet's Formula:**

After computing $A^{n-1} = PD^{n-1}P^{-1}$ and extracting the first component:

$$F_n = \frac{\phi^n - \hat{\phi}^n}{\sqrt{5}} = \frac{1}{\sqrt{5}}\left[\left(\frac{1+\sqrt{5}}{2}\right)^n - \left(\frac{1-\sqrt{5}}{2}\right)^n\right]$$

This is **Binet's formula**—a closed-form expression for the $n$th Fibonacci number!

Since $|\hat{\phi}| < 1$, for large $n$:

$$F_n \approx \frac{\phi^n}{\sqrt{5}}$$

---

## Example 3: Population Dynamics

Consider a simplified population model with juveniles (J) and adults (A):
- Each year, 30% of juveniles survive to become adults
- Each year, 80% of adults survive
- Each adult produces 2 juveniles on average

The transition matrix is:

$$M = \begin{bmatrix} 0 & 2 \\ 0.3 & 0.8 \end{bmatrix}$$

Starting with $\begin{bmatrix} J_0 \\ A_0 \end{bmatrix} = \begin{bmatrix} 100 \\ 50 \end{bmatrix}$, the population after $n$ years is:

$$\begin{bmatrix} J_n \\ A_n \end{bmatrix} = M^n\begin{bmatrix} 100 \\ 50 \end{bmatrix}$$

**Find eigenvalues:**

$$\det(M - \lambda I) = \det\begin{bmatrix} -\lambda & 2 \\ 0.3 & 0.8-\lambda \end{bmatrix} = \lambda^2 - 0.8\lambda - 0.6 = 0$$

$$\lambda = \frac{0.8 \pm \sqrt{0.64 + 2.4}}{2} = \frac{0.8 \pm \sqrt{3.04}}{2}$$

$$\lambda_1 \approx 1.27, \quad \lambda_2 \approx -0.47$$

Since $\lambda_1 > 1$, the population grows exponentially! The long-term growth rate is approximately $1.27$ per year (27% annual growth).

For $\lambda_2 < 0$, this component oscillates and decays, contributing less over time.

**Long-term behavior:** The population is dominated by the eigenvector corresponding to $\lambda_1$, growing exponentially at rate $\lambda_1^n$.

---

## Computing $A^n$ for Large $n$: Dominant Eigenvalue

When $A = PDP^{-1}$ and eigenvalues are ordered $|\lambda_1| > |\lambda_2| \geq \cdots \geq |\lambda_n|$:

$$D^n = \begin{bmatrix} \lambda_1^n & 0 & \cdots \\ 0 & \lambda_2^n & \cdots \\ \vdots & \vdots & \ddots \end{bmatrix}$$

For large $n$, if $|\lambda_1|$ is strictly largest:

$$D^n \approx \lambda_1^n \begin{bmatrix} 1 & 0 & \cdots \\ 0 & 0 & \cdots \\ \vdots & \vdots & \ddots \end{bmatrix}$$

Therefore:

$$A^n \approx \lambda_1^n \mathbf{v}_1\mathbf{w}_1^T$$

where $\mathbf{v}_1$ is the eigenvector of $A$ and $\mathbf{w}_1$ is the corresponding row of $P^{-1}$.

**Consequence:** For large $n$, $A^n\mathbf{x}$ points in the direction of $\mathbf{v}_1$ (the dominant eigenvector) and grows/decays at rate $\lambda_1^n$.

---

## Example 4: Markov Chains and Steady State

Consider a Markov chain with transition matrix:

$$P = \begin{bmatrix} 0.7 & 0.3 \\ 0.2 & 0.8 \end{bmatrix}$$

This could model weather: if today is sunny (state 1), tomorrow has 70% chance of sunny and 30% chance of rainy. If today is rainy (state 2), tomorrow has 20% chance of sunny and 80% chance of rainy.

**Find eigenvalues:**

$$\det(P - \lambda I) = (0.7-\lambda)(0.8-\lambda) - 0.06 = \lambda^2 - 1.5\lambda + 0.5 = 0$$

$$\lambda_1 = 1, \quad \lambda_2 = 0.5$$

**Key insight:** Markov transition matrices always have $\lambda = 1$ as an eigenvalue!

**Find eigenvector for $\lambda = 1$:**

$$P - I = \begin{bmatrix} -0.3 & 0.3 \\ 0.2 & -0.2 \end{bmatrix}$$

This gives $-0.3x + 0.3y = 0$, so $x = y$. Normalizing so $x + y = 1$:

$$\mathbf{v}_1 = \begin{bmatrix} 0.4 \\ 0.6 \end{bmatrix}$$

This is the **steady-state distribution**: in the long run, 40% of days are sunny and 60% are rainy!

As $n \to \infty$:

$$P^n \to \begin{bmatrix} 0.4 & 0.4 \\ 0.6 & 0.6 \end{bmatrix}$$

No matter the initial state, the distribution converges to the steady state.

---

## Matrix Exponential: $e^{At}$

In continuous-time systems (differential equations), we encounter $e^{At}$, defined as:

$$e^{At} = I + At + \frac{(At)^2}{2!} + \frac{(At)^3}{3!} + \cdots$$

If $A = PDP^{-1}$:

$$e^{At} = Pe^{Dt}P^{-1}$$

where:

$$e^{Dt} = \begin{bmatrix} e^{\lambda_1 t} & 0 & \cdots \\ 0 & e^{\lambda_2 t} & \cdots \\ \vdots & \vdots & \ddots \end{bmatrix}$$

**Example:** For $A = \begin{bmatrix} -2 & 0 \\ 0 & -3 \end{bmatrix}$ (already diagonal):

$$e^{At} = \begin{bmatrix} e^{-2t} & 0 \\ 0 & e^{-3t} \end{bmatrix}$$

This appears in the solution to $\frac{d\mathbf{x}}{dt} = A\mathbf{x}$:

$$\mathbf{x}(t) = e^{At}\mathbf{x}_0$$

---

## Practical Tips

### Tip 1: Check if Diagonalizable First

Before computing $A^n$, verify that $A$ is diagonalizable. If not, you'll need Jordan normal form or other methods.

### Tip 2: Use Symbolic Computation

For general $n$, leave expressions in terms of $n$ rather than computing specific powers.

### Tip 3: Dominant Eigenvalue for Asymptotics

For large $n$, focus on the eigenvalue with largest absolute value—it dominates the behavior.

### Tip 4: Special Matrices

- **Symmetric matrices:** Always diagonalizable, orthogonal eigenvectors
- **Markov matrices:** Always have $\lambda = 1$; long-term behavior determined by corresponding eigenvector
- **Stochastic matrices:** Similar properties to Markov matrices

---

## Summary

**Matrix Powers via Diagonalization:**
- $A^n = PD^nP^{-1}$
- $D^n$ is trivial: raise diagonal entries to power $n$
- Converts $n$ matrix multiplications into one matrix power on diagonal

**Applications:**
- **Fibonacci numbers:** Binet's formula from diagonalization
- **Population dynamics:** Long-term growth/decay rates from eigenvalues
- **Markov chains:** Steady-state from eigenvalue $\lambda = 1$
- **Differential equations:** $e^{At} = Pe^{Dt}P^{-1}$

**Asymptotic Behavior:**
- Dominant eigenvalue $\lambda_1$ (largest $|\lambda|$) determines long-term behavior
- $A^n \approx \lambda_1^n \mathbf{v}_1\mathbf{w}_1^T$ for large $n$
- Growth if $|\lambda_1| > 1$, decay if $|\lambda_1| < 1$, steady if $\lambda_1 = 1$

**Key Insight:**
Diagonalization reveals the natural modes of a system. Each eigenvector represents an independent mode that evolves simply (exponential growth/decay), and the full solution is a superposition of these modes.
