import type { Topic } from '../../../core/types';

export const topics: Topic[] = [
  {
    id: 'topic-1',
    title: 'Problem Formulation',
    quizIds: ['math404-quiz-1'],
    exerciseIds: ['math404-t1-ex1', 'math404-t1-ex2', 'math404-t1-ex3'],
    content: `# Problem Formulation

## Introduction to Optimization

Optimization is the mathematical discipline of finding the best solution from a set of feasible alternatives. At its core, every optimization problem involves three fundamental components:

1. **Decision Variables**: The quantities we can control or choose
2. **Objective Function**: The measure of quality we want to optimize (minimize or maximize)
3. **Constraints**: The restrictions that define feasible solutions

### Mathematical Formulation

The general form of an optimization problem is:

$$\\min_{x \\in \\mathbb{R}^n} f(x) \\quad \\text{subject to} \\quad g_i(x) \\leq 0, \\quad h_j(x) = 0$$

Where:
- $x$ is the vector of decision variables
- $f(x)$ is the objective function
- $g_i(x) \\leq 0$ are inequality constraints
- $h_j(x) = 0$ are equality constraints

## Feasibility and Constraint Qualifications

A point $x$ is **feasible** if it satisfies all constraints. The **feasible set** or **feasible region** is the set of all feasible points.

### Linear Independence Constraint Qualification (LICQ)

At a feasible point $x^*$, LICQ holds if the gradients of active inequality constraints and all equality constraints are linearly independent.

## Convexity Basics

A set $S$ is **convex** if for any two points $x, y \\in S$ and any $\\lambda \\in [0,1]$:
$$\\lambda x + (1-\\lambda)y \\in S$$

A function $f$ is **convex** if its domain is convex and:
$$f(\\lambda x + (1-\\lambda)y) \\leq \\lambda f(x) + (1-\\lambda)f(y)$$

## Local vs Global Optimality

- **Local minimum**: $f(x^*) \\leq f(x)$ for all $x$ in a neighborhood of $x^*$
- **Global minimum**: $f(x^*) \\leq f(x)$ for all feasible $x$

For convex problems, every local minimum is a global minimum.

## First-Order Optimality Conditions

For unconstrained optimization:
- **Necessary condition**: $\\nabla f(x^*) = 0$
- **Sufficient condition** (for convex $f$): $\\nabla f(x^*) = 0$

For constrained optimization, the KKT conditions generalize these.`
  },
  {
    id: 'topic-2',
    title: 'Linear Programming',
    quizIds: ['math404-quiz-2'],
    exerciseIds: ['math404-t2-ex1', 'math404-t2-ex2', 'math404-t2-ex3'],
    content: `# Linear Programming

## LP Formulation

A **Linear Program (LP)** has a linear objective and linear constraints:

$$\\min c^T x \\quad \\text{s.t.} \\quad Ax \\leq b, \\quad x \\geq 0$$

### Standard Form

The standard form is:
$$\\min c^T x \\quad \\text{s.t.} \\quad Ax = b, \\quad x \\geq 0$$

Any LP can be converted to standard form using slack variables.

## Graphical Method (2D)

For two-variable LPs:
1. Plot each constraint as a line
2. Identify the feasible region
3. Find corner points (vertices)
4. Evaluate objective at each vertex
5. The optimal solution is at a vertex

## The Simplex Algorithm

The simplex algorithm moves from vertex to vertex, improving the objective at each step.

### Basic Feasible Solutions

A **basic feasible solution (BFS)** corresponds to a vertex of the feasible polytope. With $n$ variables and $m$ equality constraints, a BFS has $n-m$ variables set to zero (nonbasic variables).

### Simplex Steps

1. Start at a BFS
2. Select entering variable (most negative reduced cost)
3. Select leaving variable (minimum ratio test)
4. Pivot to move to adjacent vertex
5. Repeat until optimal (all reduced costs non-negative)

## Degeneracy

Degeneracy occurs when a BFS has more than $n-m$ zero variables. This can cause cycling, which anti-cycling rules prevent.

## Sensitivity Analysis

Analyzes how the optimal solution changes with small perturbations:
- **Range of optimality**: How much can $c$ change?
- **Shadow prices**: The dual variables give the marginal value of constraints

## Interior-Point Methods

Alternative to simplex that moves through the interior of the feasible region, achieving polynomial worst-case complexity.`
  },
  {
    id: 'topic-3',
    title: 'Duality Theory',
    quizIds: ['math404-quiz-3'],
    exerciseIds: ['math404-t3-ex1', 'math404-t3-ex2', 'math404-t3-ex3'],
    content: `# Duality Theory

## The Dual Problem

Every LP has an associated **dual LP**:

**Primal**: $\\max c^T x$ s.t. $Ax \\leq b$, $x \\geq 0$
**Dual**: $\\min b^T y$ s.t. $A^T y \\geq c$, $y \\geq 0$

### Construction Rules

| Primal (max) | Dual (min) |
|--------------|------------|
| ≤ constraint | ≥ 0 variable |
| = constraint | free variable |
| ≥ 0 variable | ≥ constraint |

## Weak Duality

For any feasible primal $x$ and dual $y$:
$$c^T x \\leq b^T y$$

This gives bounds: any dual feasible solution bounds the primal optimal from above.

## Strong Duality

If either problem has an optimal solution, both do, and:
$$c^T x^* = b^T y^*$$

The duality gap is zero at optimality.

## Complementary Slackness

At optimality:
- $y_i^*(b_i - a_i^T x^*) = 0$ for all $i$
- $x_j^*(a_j^T y^* - c_j) = 0$ for all $j$

Either a constraint is tight or its multiplier is zero.

## Farkas' Lemma

Exactly one of the following systems has a solution:
1. $Ax \\leq b$ with $x \\geq 0$
2. $A^T y \\geq 0$, $b^T y < 0$ with $y \\geq 0$

This is fundamental for proving LP duality.

## Economic Interpretation

Dual variables are **shadow prices** - the marginal value of relaxing a constraint. If $y_i^* = 5$, increasing $b_i$ by 1 increases the optimal objective by 5.`
  },
  {
    id: 'topic-4',
    title: 'Convex Sets and Functions',
    quizIds: ['math404-quiz-4'],
    exerciseIds: ['math404-t4-ex1', 'math404-t4-ex2', 'math404-t4-ex3'],
    content: `# Convex Sets and Functions

## Convex Sets

A set $C \\subseteq \\mathbb{R}^n$ is **convex** if:
$$x, y \\in C, \\lambda \\in [0,1] \\Rightarrow \\lambda x + (1-\\lambda)y \\in C$$

### Examples of Convex Sets
- Hyperplanes: $\\{x : a^T x = b\\}$
- Halfspaces: $\\{x : a^T x \\leq b\\}$
- Balls: $\\{x : \\|x - c\\| \\leq r\\}$
- Polyhedra: $\\{x : Ax \\leq b\\}$
- Positive semidefinite cone: $\\{X : X \\succeq 0\\}$

### Operations Preserving Convexity
- Intersection of convex sets
- Affine transformations
- Perspective mappings

## Convex Functions

A function $f: \\mathbb{R}^n \\to \\mathbb{R}$ is **convex** if:
$$f(\\lambda x + (1-\\lambda)y) \\leq \\lambda f(x) + (1-\\lambda)f(y)$$

### Characterizations
1. **First-order**: $f(y) \\geq f(x) + \\nabla f(x)^T(y-x)$
2. **Second-order**: $\\nabla^2 f(x) \\succeq 0$ (positive semidefinite Hessian)

### Examples of Convex Functions
- Linear: $f(x) = a^T x + b$
- Quadratic: $f(x) = x^T Qx$ for $Q \\succeq 0$
- Norms: $f(x) = \\|x\\|$
- Exponential: $f(x) = e^x$
- Log-sum-exp: $f(x) = \\log(\\sum_i e^{x_i})$

## Operations Preserving Convexity
- Nonnegative weighted sums
- Pointwise maximum
- Composition with affine functions
- Perspective

## Conjugate Functions

The **conjugate** of $f$ is:
$$f^*(y) = \\sup_x (y^T x - f(x))$$

The conjugate of a convex function is always convex.`
  },
  {
    id: 'topic-5',
    title: 'Convex Optimization',
    quizIds: ['math404-quiz-5'],
    exerciseIds: ['math404-t5-ex1', 'math404-t5-ex2', 'math404-t5-ex3'],
    content: `# Convex Optimization

## Convex Optimization Problems

A **convex optimization problem** has:
- Convex objective function $f_0$
- Convex inequality constraints $f_i(x) \\leq 0$
- Affine equality constraints $h_j(x) = 0$

### Key Property
Every local minimum is a global minimum.

## Semidefinite Programming (SDP)

SDP extends LP to matrix variables:
$$\\min \\text{tr}(CX) \\quad \\text{s.t.} \\quad \\text{tr}(A_i X) = b_i, \\quad X \\succeq 0$$

Applications: Max-cut relaxation, control, combinatorial optimization.

## Second-Order Cone Programming (SOCP)

SOCP has constraints:
$$\\|A_i x + b_i\\| \\leq c_i^T x + d_i$$

More general than LP but more tractable than SDP.

## Geometric Programming

Standard form:
$$\\min f_0(x) \\quad \\text{s.t.} \\quad f_i(x) \\leq 1, \\quad g_j(x) = 1$$

Where $f_i$ are posynomials and $g_j$ are monomials.

Becomes convex after logarithmic transformation.

## Quasiconvex Optimization

A function is **quasiconvex** if its sublevel sets are convex:
$$\\{x : f(x) \\leq \\alpha\\} \\text{ is convex for all } \\alpha$$

Can be solved by bisection on the optimal value.

## Robust Optimization

Handles uncertainty in data:
$$\\min_x \\max_{a \\in \\mathcal{U}} f(x, a)$$

Where $\\mathcal{U}$ is the uncertainty set.`
  },
  {
    id: 'topic-6',
    title: 'Gradient Methods',
    quizIds: ['math404-quiz-6'],
    exerciseIds: ['math404-t6-ex1', 'math404-t6-ex2', 'math404-t6-ex3'],
    content: `# Gradient Methods

## Gradient Descent

The basic update:
$$x_{k+1} = x_k - \\alpha_k \\nabla f(x_k)$$

### Step Size Selection
- **Fixed**: $\\alpha_k = \\alpha$ (requires $\\alpha < 2/L$ for convergence)
- **Exact line search**: $\\alpha_k = \\arg\\min_\\alpha f(x_k - \\alpha \\nabla f(x_k))$
- **Backtracking**: Start large, reduce until Armijo condition holds

## Convergence Analysis

For $L$-smooth convex functions:
$$f(x_k) - f(x^*) \\leq \\frac{L\\|x_0 - x^*\\|^2}{2k}$$

For $\\mu$-strongly convex:
$$\\|x_k - x^*\\| \\leq \\left(\\frac{\\kappa - 1}{\\kappa + 1}\\right)^k \\|x_0 - x^*\\|$$

Where $\\kappa = L/\\mu$ is the condition number.

## Line Search Methods

### Armijo Condition
$$f(x - \\alpha d) \\leq f(x) - c \\alpha \\nabla f(x)^T d$$

### Wolfe Conditions
Add curvature condition to ensure sufficient progress.

## Newton's Method

Uses second-order information:
$$x_{k+1} = x_k - [\\nabla^2 f(x_k)]^{-1} \\nabla f(x_k)$$

**Advantages**: Quadratic convergence near optimum, affine invariant
**Disadvantages**: Requires Hessian computation and inversion

## Quasi-Newton Methods

Approximate Hessian using gradient information:
- **BFGS**: Builds positive definite approximation
- **L-BFGS**: Limited memory version for large-scale

## Stochastic Gradient Descent

For minimizing expectations:
$$x_{k+1} = x_k - \\alpha_k g_k$$

Where $g_k$ is a stochastic estimate of the gradient.

Crucial for machine learning with large datasets.`
  },
  {
    id: 'topic-7',
    title: 'Constrained Optimization',
    quizIds: ['math404-quiz-7'],
    exerciseIds: ['math404-t7-ex1', 'math404-t7-ex2', 'math404-t7-ex3'],
    content: `# Constrained Optimization

## Lagrangian Methods

The **Lagrangian** is:
$$L(x, \\lambda, \\mu) = f(x) + \\sum_i \\lambda_i g_i(x) + \\sum_j \\mu_j h_j(x)$$

## KKT Conditions

For a local minimum $x^*$ with multipliers $\\lambda^*, \\mu^*$:

1. **Stationarity**: $\\nabla_x L(x^*, \\lambda^*, \\mu^*) = 0$
2. **Primal feasibility**: $g_i(x^*) \\leq 0$, $h_j(x^*) = 0$
3. **Dual feasibility**: $\\lambda_i^* \\geq 0$
4. **Complementary slackness**: $\\lambda_i^* g_i(x^*) = 0$

For convex problems with constraint qualification, KKT conditions are necessary AND sufficient.

## Augmented Lagrangian Method

Adds quadratic penalty:
$$L_\\rho(x, \\lambda) = f(x) + \\lambda^T g(x) + \\frac{\\rho}{2}\\|g(x)\\|^2$$

Algorithm:
1. Minimize $L_\\rho$ over $x$
2. Update $\\lambda \\leftarrow \\lambda + \\rho g(x)$
3. Optionally increase $\\rho$

Better conditioning than pure penalty methods.

## Penalty Methods

**Quadratic penalty**:
$$P_\\rho(x) = f(x) + \\frac{\\rho}{2}\\sum_i [\\max(0, g_i(x))]^2$$

As $\\rho \\to \\infty$, solutions converge to constrained optimum.

## Interior-Point Methods for NLP

Generalize LP interior-point to nonlinear:
- Use barrier function for inequality constraints
- Follow central path to optimum
- Newton steps for subproblems

## Sequential Quadratic Programming (SQP)

Solve sequence of QP subproblems:
$$\\min_d \\nabla f(x_k)^T d + \\frac{1}{2} d^T H_k d$$
$$\\text{s.t. } \\nabla g_i(x_k)^T d + g_i(x_k) \\leq 0$$

Each QP approximates the original problem locally.`
  }
];

export default topics;
