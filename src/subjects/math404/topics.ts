import type { Topic, Subtopic } from '../../core/types';

// Import subtopic markdown content
// Topic 1: Problem Formulation
import t1s1 from './content/topic-1/01-optimization-intro.md?raw';
import t1s2 from './content/topic-1/02-mathematical-formulation.md?raw';
import t1s3 from './content/topic-1/03-feasibility.md?raw';
import t1s4 from './content/topic-1/04-convexity-intro.md?raw';
import t1s5 from './content/topic-1/05-local-global.md?raw';
import t1s6 from './content/topic-1/06-optimality-conditions.md?raw';
import t1s7 from './content/topic-1/07-applications-overview.md?raw';

// Topic 2: Linear Programming
import t2s1 from './content/topic-2/01-lp-formulation.md?raw';
import t2s2 from './content/topic-2/02-graphical-method.md?raw';
import t2s3 from './content/topic-2/03-simplex-algorithm.md?raw';
import t2s4 from './content/topic-2/04-simplex-tableau.md?raw';
import t2s5 from './content/topic-2/05-degeneracy.md?raw';
import t2s6 from './content/topic-2/06-sensitivity-analysis.md?raw';
import t2s7 from './content/topic-2/07-interior-point.md?raw';

// Topic 3: Duality Theory
import t3s1 from './content/topic-3/01-dual-problem.md?raw';
import t3s2 from './content/topic-3/02-weak-duality.md?raw';
import t3s3 from './content/topic-3/03-strong-duality.md?raw';
import t3s4 from './content/topic-3/04-complementary-slackness.md?raw';
import t3s5 from './content/topic-3/05-farkas-lemma.md?raw';
import t3s6 from './content/topic-3/06-economic-interpretation.md?raw';
import t3s7 from './content/topic-3/07-dual-simplex.md?raw';

// Topic 4: Convex Sets and Functions
import t4s1 from './content/topic-4/01-convex-sets.md?raw';
import t4s2 from './content/topic-4/02-convex-combinations.md?raw';
import t4s3 from './content/topic-4/03-convex-functions.md?raw';
import t4s4 from './content/topic-4/04-operations-preserving.md?raw';
import t4s5 from './content/topic-4/05-conjugate-functions.md?raw';
import t4s6 from './content/topic-4/06-sublevel-sets.md?raw';
import t4s7 from './content/topic-4/07-separation-theorems.md?raw';

// Topic 5: Convex Optimization
import t5s1 from './content/topic-5/01-convex-programs.md?raw';
import t5s2 from './content/topic-5/02-global-optimality.md?raw';
import t5s3 from './content/topic-5/03-sdp.md?raw';
import t5s4 from './content/topic-5/04-socp.md?raw';
import t5s5 from './content/topic-5/05-geometric-programming.md?raw';
import t5s6 from './content/topic-5/06-quasiconvex.md?raw';
import t5s7 from './content/topic-5/07-robust-optimization.md?raw';

// Topic 6: Gradient Methods
import t6s1 from './content/topic-6/01-gradient-descent.md?raw';
import t6s2 from './content/topic-6/02-convergence-analysis.md?raw';
import t6s3 from './content/topic-6/03-line-search.md?raw';
import t6s4 from './content/topic-6/04-newton-method-opt.md?raw';
import t6s5 from './content/topic-6/05-quasi-newton.md?raw';
import t6s6 from './content/topic-6/06-coordinate-descent.md?raw';
import t6s7 from './content/topic-6/07-stochastic-gradient.md?raw';

// Topic 7: Constrained Optimization
import t7s1 from './content/topic-7/01-lagrangian.md?raw';
import t7s2 from './content/topic-7/02-kkt-conditions.md?raw';
import t7s3 from './content/topic-7/03-kkt-examples.md?raw';
import t7s4 from './content/topic-7/04-augmented-lagrangian.md?raw';
import t7s5 from './content/topic-7/05-penalty-methods.md?raw';
import t7s6 from './content/topic-7/06-interior-point-nonlinear.md?raw';
import t7s7 from './content/topic-7/07-sqp.md?raw';

// Define subtopics arrays
const topic1Subtopics: Subtopic[] = [
  { id: 'math404-t1-optimization-intro', slug: 'optimization-intro', title: 'Introduction to Optimization', content: t1s1, order: 1 },
  { id: 'math404-t1-mathematical-formulation', slug: 'mathematical-formulation', title: 'Mathematical Formulation', content: t1s2, order: 2 },
  { id: 'math404-t1-feasibility', slug: 'feasibility', title: 'Feasibility and Constraint Qualification', content: t1s3, order: 3 },
  { id: 'math404-t1-convexity-intro', slug: 'convexity-intro', title: 'Introduction to Convexity', content: t1s4, order: 4 },
  { id: 'math404-t1-local-global', slug: 'local-global', title: 'Local vs Global Optimality', content: t1s5, order: 5 },
  { id: 'math404-t1-optimality-conditions', slug: 'optimality-conditions', title: 'Optimality Conditions', content: t1s6, order: 6 },
  { id: 'math404-t1-applications-overview', slug: 'applications-overview', title: 'Applications Overview', content: t1s7, order: 7 },
];

const topic2Subtopics: Subtopic[] = [
  { id: 'math404-t2-lp-formulation', slug: 'lp-formulation', title: 'Linear Programming Formulation', content: t2s1, order: 1 },
  { id: 'math404-t2-graphical-method', slug: 'graphical-method', title: 'Graphical Method for Linear Programming', content: t2s2, order: 2 },
  { id: 'math404-t2-simplex-algorithm', slug: 'simplex-algorithm', title: 'The Simplex Algorithm', content: t2s3, order: 3 },
  { id: 'math404-t2-simplex-tableau', slug: 'simplex-tableau', title: 'Simplex Tableau Method', content: t2s4, order: 4 },
  { id: 'math404-t2-degeneracy', slug: 'degeneracy', title: 'Degeneracy in Linear Programming', content: t2s5, order: 5 },
  { id: 'math404-t2-sensitivity-analysis', slug: 'sensitivity-analysis', title: 'Sensitivity Analysis', content: t2s6, order: 6 },
  { id: 'math404-t2-interior-point', slug: 'interior-point', title: 'Interior-Point Methods for Linear Programming', content: t2s7, order: 7 },
];

const topic3Subtopics: Subtopic[] = [
  { id: 'math404-t3-dual-problem', slug: 'dual-problem', title: 'The Dual Problem', content: t3s1, order: 1 },
  { id: 'math404-t3-weak-duality', slug: 'weak-duality', title: 'Weak Duality', content: t3s2, order: 2 },
  { id: 'math404-t3-strong-duality', slug: 'strong-duality', title: 'Strong Duality', content: t3s3, order: 3 },
  { id: 'math404-t3-complementary-slackness', slug: 'complementary-slackness', title: 'Complementary Slackness', content: t3s4, order: 4 },
  { id: 'math404-t3-farkas-lemma', slug: 'farkas-lemma', title: 'Farkas\' Lemma', content: t3s5, order: 5 },
  { id: 'math404-t3-economic-interpretation', slug: 'economic-interpretation', title: 'Economic Interpretation of Duality', content: t3s6, order: 6 },
  { id: 'math404-t3-dual-simplex', slug: 'dual-simplex', title: 'Dual Simplex Method', content: t3s7, order: 7 },
];

const topic4Subtopics: Subtopic[] = [
  { id: 'math404-t4-convex-sets', slug: 'convex-sets', title: 'Convex Sets', content: t4s1, order: 1 },
  { id: 'math404-t4-convex-combinations', slug: 'convex-combinations', title: 'Convex Combinations and Hulls', content: t4s2, order: 2 },
  { id: 'math404-t4-convex-functions', slug: 'convex-functions', title: 'Convex Functions', content: t4s3, order: 3 },
  { id: 'math404-t4-operations-preserving', slug: 'operations-preserving', title: 'Operations Preserving Convexity', content: t4s4, order: 4 },
  { id: 'math404-t4-conjugate-functions', slug: 'conjugate-functions', title: 'Conjugate Functions', content: t4s5, order: 5 },
  { id: 'math404-t4-sublevel-sets', slug: 'sublevel-sets', title: 'Sublevel Sets and Epigraphs', content: t4s6, order: 6 },
  { id: 'math404-t4-separation-theorems', slug: 'separation-theorems', title: 'Separation Theorems', content: t4s7, order: 7 },
];

const topic5Subtopics: Subtopic[] = [
  { id: 'math404-t5-convex-programs', slug: 'convex-programs', title: 'Convex Programs', content: t5s1, order: 1 },
  { id: 'math404-t5-global-optimality', slug: 'global-optimality', title: 'Global Optimality in Convex Programs', content: t5s2, order: 2 },
  { id: 'math404-t5-sdp', slug: 'sdp', title: 'Semidefinite Programming', content: t5s3, order: 3 },
  { id: 'math404-t5-socp', slug: 'socp', title: 'Second-Order Cone Programming', content: t5s4, order: 4 },
  { id: 'math404-t5-geometric-programming', slug: 'geometric-programming', title: 'Geometric Programming', content: t5s5, order: 5 },
  { id: 'math404-t5-quasiconvex', slug: 'quasiconvex', title: 'Quasiconvex Optimization', content: t5s6, order: 6 },
  { id: 'math404-t5-robust-optimization', slug: 'robust-optimization', title: 'Robust Optimization', content: t5s7, order: 7 },
];

const topic6Subtopics: Subtopic[] = [
  { id: 'math404-t6-gradient-descent', slug: 'gradient-descent', title: 'Gradient Descent', content: t6s1, order: 1 },
  { id: 'math404-t6-convergence-analysis', slug: 'convergence-analysis', title: 'Convergence Analysis', content: t6s2, order: 2 },
  { id: 'math404-t6-line-search', slug: 'line-search', title: 'Line Search Methods', content: t6s3, order: 3 },
  { id: 'math404-t6-newton-method-opt', slug: 'newton-method-opt', title: 'Newton\'s Method', content: t6s4, order: 4 },
  { id: 'math404-t6-quasi-newton', slug: 'quasi-newton', title: 'Quasi-Newton Methods', content: t6s5, order: 5 },
  { id: 'math404-t6-coordinate-descent', slug: 'coordinate-descent', title: 'Coordinate Descent', content: t6s6, order: 6 },
  { id: 'math404-t6-stochastic-gradient', slug: 'stochastic-gradient', title: 'Stochastic Gradient Descent', content: t6s7, order: 7 },
];

const topic7Subtopics: Subtopic[] = [
  { id: 'math404-t7-lagrangian', slug: 'lagrangian', title: 'Lagrangian Methods', content: t7s1, order: 1 },
  { id: 'math404-t7-kkt-conditions', slug: 'kkt-conditions', title: 'KKT Conditions', content: t7s2, order: 2 },
  { id: 'math404-t7-kkt-examples', slug: 'kkt-examples', title: 'KKT Examples', content: t7s3, order: 3 },
  { id: 'math404-t7-augmented-lagrangian', slug: 'augmented-lagrangian', title: 'Augmented Lagrangian Method', content: t7s4, order: 4 },
  { id: 'math404-t7-penalty-methods', slug: 'penalty-methods', title: 'Penalty Methods', content: t7s5, order: 5 },
  { id: 'math404-t7-interior-point-nonlinear', slug: 'interior-point-nonlinear', title: 'Interior-Point Methods for Nonlinear Programming', content: t7s6, order: 6 },
  { id: 'math404-t7-sqp', slug: 'sqp', title: 'Sequential Quadratic Programming', content: t7s7, order: 7 },
];

export const topics: Topic[] = [
  {
    id: 'math404-topic-1',
    title: 'Problem Formulation',
    subtopics: topic1Subtopics,
    quizIds: ['math404-quiz-1a', 'math404-quiz-1b', 'math404-quiz-1c'],
    exerciseIds: [
      'math404-t1-ex01', 'math404-t1-ex02', 'math404-t1-ex03', 'math404-t1-ex04',
      'math404-t1-ex05', 'math404-t1-ex06', 'math404-t1-ex07', 'math404-t1-ex08',
      'math404-t1-ex09', 'math404-t1-ex10', 'math404-t1-ex11', 'math404-t1-ex12',
      'math404-t1-ex13', 'math404-t1-ex14', 'math404-t1-ex15', 'math404-t1-ex16'
    ],
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
    id: 'math404-topic-2',
    title: 'Linear Programming',
    subtopics: topic2Subtopics,
    quizIds: ['math404-quiz-2a', 'math404-quiz-2b', 'math404-quiz-2c'],
    exerciseIds: [
      'math404-t2-ex01', 'math404-t2-ex02', 'math404-t2-ex03', 'math404-t2-ex04',
      'math404-t2-ex05', 'math404-t2-ex06', 'math404-t2-ex07', 'math404-t2-ex08',
      'math404-t2-ex09', 'math404-t2-ex10', 'math404-t2-ex11', 'math404-t2-ex12',
      'math404-t2-ex13', 'math404-t2-ex14', 'math404-t2-ex15', 'math404-t2-ex16'
    ],
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
    id: 'math404-topic-3',
    title: 'Duality Theory',
    subtopics: topic3Subtopics,
    quizIds: ['math404-quiz-3a', 'math404-quiz-3b', 'math404-quiz-3c'],
    exerciseIds: [
      'math404-t3-ex01', 'math404-t3-ex02', 'math404-t3-ex03', 'math404-t3-ex04',
      'math404-t3-ex05', 'math404-t3-ex06', 'math404-t3-ex07', 'math404-t3-ex08',
      'math404-t3-ex09', 'math404-t3-ex10', 'math404-t3-ex11', 'math404-t3-ex12',
      'math404-t3-ex13', 'math404-t3-ex14', 'math404-t3-ex15', 'math404-t3-ex16'
    ],
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
    id: 'math404-topic-4',
    title: 'Convex Sets and Functions',
    subtopics: topic4Subtopics,
    quizIds: ['math404-quiz-4a', 'math404-quiz-4b', 'math404-quiz-4c'],
    exerciseIds: [
      'math404-t4-ex01', 'math404-t4-ex02', 'math404-t4-ex03', 'math404-t4-ex04',
      'math404-t4-ex05', 'math404-t4-ex06', 'math404-t4-ex07', 'math404-t4-ex08',
      'math404-t4-ex09', 'math404-t4-ex10', 'math404-t4-ex11', 'math404-t4-ex12',
      'math404-t4-ex13', 'math404-t4-ex14', 'math404-t4-ex15', 'math404-t4-ex16'
    ],
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
    id: 'math404-topic-5',
    title: 'Convex Optimization',
    subtopics: topic5Subtopics,
    quizIds: ['math404-quiz-5a', 'math404-quiz-5b', 'math404-quiz-5c'],
    exerciseIds: [
      'math404-t5-ex01', 'math404-t5-ex02', 'math404-t5-ex03', 'math404-t5-ex04',
      'math404-t5-ex05', 'math404-t5-ex06', 'math404-t5-ex07', 'math404-t5-ex08',
      'math404-t5-ex09', 'math404-t5-ex10', 'math404-t5-ex11', 'math404-t5-ex12',
      'math404-t5-ex13', 'math404-t5-ex14', 'math404-t5-ex15', 'math404-t5-ex16'
    ],
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
    id: 'math404-topic-6',
    title: 'Gradient Methods',
    subtopics: topic6Subtopics,
    quizIds: ['math404-quiz-6a', 'math404-quiz-6b', 'math404-quiz-6c'],
    exerciseIds: [
      'math404-t6-ex01', 'math404-t6-ex02', 'math404-t6-ex03', 'math404-t6-ex04',
      'math404-t6-ex05', 'math404-t6-ex06', 'math404-t6-ex07', 'math404-t6-ex08',
      'math404-t6-ex09', 'math404-t6-ex10', 'math404-t6-ex11', 'math404-t6-ex12',
      'math404-t6-ex13', 'math404-t6-ex14', 'math404-t6-ex15', 'math404-t6-ex16'
    ],
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
    id: 'math404-topic-7',
    title: 'Constrained Optimization',
    subtopics: topic7Subtopics,
    quizIds: ['math404-quiz-7a', 'math404-quiz-7b', 'math404-quiz-7c'],
    exerciseIds: [
      'math404-t7-ex01', 'math404-t7-ex02', 'math404-t7-ex03', 'math404-t7-ex04',
      'math404-t7-ex05', 'math404-t7-ex06', 'math404-t7-ex07', 'math404-t7-ex08',
      'math404-t7-ex09', 'math404-t7-ex10', 'math404-t7-ex11', 'math404-t7-ex12',
      'math404-t7-ex13', 'math404-t7-ex14', 'math404-t7-ex15', 'math404-t7-ex16'
    ],
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
