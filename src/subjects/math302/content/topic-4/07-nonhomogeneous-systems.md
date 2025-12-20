---
title: "Nonhomogeneous Systems and Variation of Parameters"
---

# Nonhomogeneous Systems and Variation of Parameters

## Nonhomogeneous Linear Systems

A **nonhomogeneous linear system** has the form:

$$\mathbf{x}' = A(t)\mathbf{x} + \mathbf{f}(t)$$

where:
- $A(t)$ is an $n \times n$ matrix of coefficients
- $\mathbf{f}(t)$ is an $n$-dimensional forcing vector
- $\mathbf{f}(t) \neq \mathbf{0}$

When $\mathbf{f}(t) = \mathbf{0}$, the system is **homogeneous**.

## Solution Structure

**Theorem**: The general solution to a nonhomogeneous system is:

$$\mathbf{x}(t) = \mathbf{x}_h(t) + \mathbf{x}_p(t)$$

where:
- $\mathbf{x}_h(t)$ is the general solution to the homogeneous system $\mathbf{x}' = A(t)\mathbf{x}$
- $\mathbf{x}_p(t)$ is any particular solution to the nonhomogeneous system

**Proof**: If $\mathbf{x}$ is any solution to $\mathbf{x}' = A\mathbf{x} + \mathbf{f}$ and $\mathbf{x}_p$ is a particular solution:

$$(\mathbf{x} - \mathbf{x}_p)' = \mathbf{x}' - \mathbf{x}_p' = (A\mathbf{x} + \mathbf{f}) - (A\mathbf{x}_p + \mathbf{f}) = A(\mathbf{x} - \mathbf{x}_p)$$

Therefore $\mathbf{x} - \mathbf{x}_p$ solves the homogeneous equation, so $\mathbf{x} - \mathbf{x}_p = \mathbf{x}_h$.

## Method 1: Undetermined Coefficients

For **constant coefficient** systems $\mathbf{x}' = A\mathbf{x} + \mathbf{f}(t)$ with special forms of $\mathbf{f}(t)$, guess the form of $\mathbf{x}_p$.

### Trial Solutions

| Form of $\mathbf{f}(t)$ | Trial $\mathbf{x}_p$ |
|------------------------|---------------------|
| Constant vector $\mathbf{a}$ | Constant vector $\mathbf{b}$ |
| $t^k\mathbf{a}$ | $t^k\mathbf{b}_k + \cdots + t\mathbf{b}_1 + \mathbf{b}_0$ |
| $e^{\alpha t}\mathbf{a}$ | $e^{\alpha t}\mathbf{b}$ |
| $\cos(\beta t)\mathbf{a}$ or $\sin(\beta t)\mathbf{a}$ | $\cos(\beta t)\mathbf{b} + \sin(\beta t)\mathbf{c}$ |

**Modification rule**: If any part of the trial solution solves the homogeneous equation, multiply by $t$ (or $t^k$ as needed).

### Example 1: Constant Forcing

Solve:
$$\mathbf{x}' = \begin{pmatrix} 1 & 2 \\ 3 & 2 \end{pmatrix}\mathbf{x} + \begin{pmatrix} 4 \\ -1 \end{pmatrix}$$

**Homogeneous solution** (from earlier work):
$$\mathbf{x}_h = c_1e^{4t}\begin{pmatrix} 2 \\ 3 \end{pmatrix} + c_2e^{-t}\begin{pmatrix} 1 \\ -1 \end{pmatrix}$$

**Particular solution**: Try $\mathbf{x}_p = \begin{pmatrix} a \\ b \end{pmatrix}$ (constant).

Then $\mathbf{x}_p' = \mathbf{0}$.

Substitute:
$$\mathbf{0} = \begin{pmatrix} 1 & 2 \\ 3 & 2 \end{pmatrix}\begin{pmatrix} a \\ b \end{pmatrix} + \begin{pmatrix} 4 \\ -1 \end{pmatrix}$$

$$\begin{pmatrix} a + 2b \\ 3a + 2b \end{pmatrix} = \begin{pmatrix} -4 \\ 1 \end{pmatrix}$$

System:
$$a + 2b = -4$$
$$3a + 2b = 1$$

Subtract first from second: $2a = 5 \Rightarrow a = \frac{5}{2}$

Substitute: $\frac{5}{2} + 2b = -4 \Rightarrow b = -\frac{13}{4}$

$$\mathbf{x}_p = \begin{pmatrix} 5/2 \\ -13/4 \end{pmatrix}$$

**General solution**:
$$\mathbf{x}(t) = c_1e^{4t}\begin{pmatrix} 2 \\ 3 \end{pmatrix} + c_2e^{-t}\begin{pmatrix} 1 \\ -1 \end{pmatrix} + \begin{pmatrix} 5/2 \\ -13/4 \end{pmatrix}$$

### Example 2: Exponential Forcing

Solve:
$$\mathbf{x}' = \begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix}\mathbf{x} + \begin{pmatrix} e^t \\ 0 \end{pmatrix}$$

**Find homogeneous solution**:

Eigenvalues: $\det(A - \lambda I) = (1-\lambda)^2 + 1 = \lambda^2 - 2\lambda + 2 = 0$

$$\lambda = 1 \pm i$$

So $\alpha = 1$, $\beta = 1$.

(Complete solution omitted for brevity; involves complex eigenvalues.)

**Particular solution**: Try $\mathbf{x}_p = e^t\begin{pmatrix} a \\ b \end{pmatrix}$.

$$\mathbf{x}_p' = e^t\begin{pmatrix} a \\ b \end{pmatrix}$$

Substitute:
$$e^t\begin{pmatrix} a \\ b \end{pmatrix} = \begin{pmatrix} 1 & -1 \\ 1 & 1 \end{pmatrix}e^t\begin{pmatrix} a \\ b \end{pmatrix} + \begin{pmatrix} e^t \\ 0 \end{pmatrix}$$

$$\begin{pmatrix} a \\ b \end{pmatrix} = \begin{pmatrix} a - b + 1 \\ a + b \end{pmatrix}$$

System:
$$a = a - b + 1 \Rightarrow b = 1$$
$$b = a + b \Rightarrow a = 0$$

$$\mathbf{x}_p = e^t\begin{pmatrix} 0 \\ 1 \end{pmatrix}$$

## Method 2: Variation of Parameters

For general forcing $\mathbf{f}(t)$, **variation of parameters** provides a systematic method.

### Formula

If $\Phi(t)$ is a fundamental matrix for $\mathbf{x}' = A(t)\mathbf{x}$, then a particular solution is:

$$\mathbf{x}_p(t) = \Phi(t)\int \Phi^{-1}(s)\mathbf{f}(s)\,ds$$

or with limits:
$$\mathbf{x}_p(t) = \Phi(t)\int_{t_0}^t \Phi^{-1}(s)\mathbf{f}(s)\,ds$$

### Derivation

Assume $\mathbf{x}_p = \Phi(t)\mathbf{u}(t)$ where $\mathbf{u}(t)$ is to be determined.

Then:
$$\mathbf{x}_p' = \Phi'(t)\mathbf{u}(t) + \Phi(t)\mathbf{u}'(t)$$

Since $\Phi' = A\Phi$:
$$\mathbf{x}_p' = A\Phi(t)\mathbf{u}(t) + \Phi(t)\mathbf{u}'(t)$$

For $\mathbf{x}_p$ to satisfy $\mathbf{x}' = A\mathbf{x} + \mathbf{f}$:
$$A\Phi(t)\mathbf{u}(t) + \Phi(t)\mathbf{u}'(t) = A\Phi(t)\mathbf{u}(t) + \mathbf{f}(t)$$

Cancel $A\Phi\mathbf{u}$:
$$\Phi(t)\mathbf{u}'(t) = \mathbf{f}(t)$$

Multiply by $\Phi^{-1}(t)$:
$$\mathbf{u}'(t) = \Phi^{-1}(t)\mathbf{f}(t)$$

Integrate:
$$\mathbf{u}(t) = \int \Phi^{-1}(s)\mathbf{f}(s)\,ds$$

Therefore:
$$\mathbf{x}_p(t) = \Phi(t)\int \Phi^{-1}(s)\mathbf{f}(s)\,ds$$

### Example 3: Variation of Parameters

Solve:
$$\mathbf{x}' = \begin{pmatrix} 3 & -2 \\ 2 & -2 \end{pmatrix}\mathbf{x} + \begin{pmatrix} t \\ 1 \end{pmatrix}$$

**Fundamental matrix** (from earlier):
$$\Phi(t) = \begin{pmatrix} 2e^{2t} & e^{-t} \\ e^{2t} & 2e^{-t} \end{pmatrix}$$

**Inverse**:
$$\Phi^{-1}(t) = \frac{1}{3}\begin{pmatrix} 2e^{-2t} & -e^{-2t} \\ -e^{t} & 2e^{t} \end{pmatrix}$$

**Compute integral**:
$$\Phi^{-1}(t)\mathbf{f}(t) = \frac{1}{3}\begin{pmatrix} 2e^{-2t} & -e^{-2t} \\ -e^{t} & 2e^{t} \end{pmatrix}\begin{pmatrix} t \\ 1 \end{pmatrix} = \frac{1}{3}\begin{pmatrix} 2te^{-2t} - e^{-2t} \\ -te^{t} + 2e^{t} \end{pmatrix}$$

Integrate term by term (using integration by parts as needed):
$$\int \Phi^{-1}(s)\mathbf{f}(s)\,ds = \frac{1}{3}\begin{pmatrix} -te^{-2t} - \frac{1}{2}e^{-2t} + \frac{1}{2}e^{-2t} \\ -(t-1)e^{t} + 2e^{t} \end{pmatrix} + \mathbf{C}$$

(Detailed integration omitted; involves integration by parts.)

Simplify and multiply by $\Phi(t)$ to get $\mathbf{x}_p(t)$.

(Full computation lengthy; method is systematic even if algebraically intensive.)

## Initial Value Problems

To solve $\mathbf{x}' = A\mathbf{x} + \mathbf{f}(t)$ with $\mathbf{x}(t_0) = \mathbf{x}_0$:

**Method 1**: Find $\mathbf{x}_h$ and $\mathbf{x}_p$, then:
$$\mathbf{x}(t) = \mathbf{x}_h(t) + \mathbf{x}_p(t)$$

Apply initial condition to determine constants in $\mathbf{x}_h$.

**Method 2**: Use variation of parameters with limits:
$$\mathbf{x}(t) = \Phi(t)\Phi^{-1}(t_0)\mathbf{x}_0 + \Phi(t)\int_{t_0}^t \Phi^{-1}(s)\mathbf{f}(s)\,ds$$

This directly gives the solution satisfying $\mathbf{x}(t_0) = \mathbf{x}_0$.

## Superposition

If $\mathbf{f}(t) = \mathbf{f}_1(t) + \mathbf{f}_2(t)$, then:
$$\mathbf{x}_p = \mathbf{x}_{p1} + \mathbf{x}_{p2}$$

where $\mathbf{x}_{p1}$ solves $\mathbf{x}' = A\mathbf{x} + \mathbf{f}_1$ and $\mathbf{x}_{p2}$ solves $\mathbf{x}' = A\mathbf{x} + \mathbf{f}_2$.

This allows solving systems with complicated forcing by breaking $\mathbf{f}$ into simpler parts.

## Comparison: Undetermined Coefficients vs Variation of Parameters

| Feature | Undetermined Coefficients | Variation of Parameters |
|---------|--------------------------|-------------------------|
| Applicability | Special forms of $\mathbf{f}$ | Any continuous $\mathbf{f}$ |
| Coefficients | Constant only | Variable or constant |
| Computation | Algebraic | Integration |
| Difficulty | Usually simpler | More involved |
| Generality | Limited | Universal |

**Strategy**: Use undetermined coefficients when possible (faster); use variation of parameters for general cases.

## Applications

### Forced Oscillations

Coupled oscillators with external forcing:
$$\mathbf{x}' = A\mathbf{x} + \mathbf{F}(t)$$

where $\mathbf{F}(t) = \begin{pmatrix} F_1(t) \\ F_2(t) \end{pmatrix}$ represents external forces.

### Control Systems

Input-output systems:
$$\mathbf{x}' = A\mathbf{x} + B\mathbf{u}(t)$$

where $\mathbf{u}(t)$ is the control input and $B$ is the input matrix.

## Conclusion

Nonhomogeneous systems extend linear theory to include forcing terms. The solution structure (homogeneous + particular) parallels single equations. Undetermined coefficients provides an efficient algebraic method for special forcing functions, while variation of parameters offers a general integral formula applicable to any continuous forcing. Understanding both methods—when to use each and how to compute them—is essential for solving real-world dynamical systems with external inputs.
