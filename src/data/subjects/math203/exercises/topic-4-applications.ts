import type { WrittenExercise } from '../../../../core/types';

export const topic4Exercises: WrittenExercise[] = [
  // --- DRILLS ---
  {
    id: 'math203-t4-drill-1',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Finding Critical Points',
    description: 'Find the critical points of $f(x) = x^3 - 3x$.',
    hints: ['Set f\'(x) = 0 and solve.'],
    solution: '$f\'(x) = 3x^2 - 3 = 3(x^2 - 1) = 3(x-1)(x+1) = 0$\nCritical points: $x = -1$ and $x = 1$'
  },
  {
    id: 'math203-t4-drill-2',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Increasing/Decreasing',
    description: 'If $f\'(x) = x - 2$, on what interval is $f$ increasing?',
    hints: ['f is increasing where f\'(x) > 0.'],
    solution: '$f\'(x) > 0$ when $x - 2 > 0$, i.e., $x > 2$.\nf is increasing on $(2, \\infty)$.'
  },
  {
    id: 'math203-t4-drill-3',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Concavity',
    description: 'If $f\'\'(x) = 6x$, where is $f$ concave up?',
    hints: ['f is concave up where f\'\'(x) > 0.'],
    solution: '$f\'\'(x) > 0$ when $6x > 0$, i.e., $x > 0$.\nf is concave up on $(0, \\infty)$.'
  },
  {
    id: 'math203-t4-drill-4',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Second Derivative Test',
    description: 'If $f\'(2) = 0$ and $f\'\'(2) = -5$, classify the critical point at $x = 2$.',
    hints: ['f\'\'(c) < 0 means the function is concave down there.'],
    solution: 'Since $f\'\'(2) = -5 < 0$, the function is concave down at $x = 2$.\nTherefore, $x = 2$ is a **local maximum**.'
  },

  // --- CORE EXERCISES ---
  {
    id: 'math203-t4-ex01',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    type: 'written',
    difficulty: 2,
    title: 'Finding Intervals of Increase and Decrease',
    description: 'For $f(x) = x^3 - 12x + 1$:\n\n(a) Find all critical points.\n(b) Determine where $f$ is increasing and where it is decreasing.\n(c) Identify local maxima and minima.',
    hints: [
      'Find f\'(x) and set it equal to zero.',
      'Make a sign chart for f\'(x).',
      'f increases where f\' > 0 and decreases where f\' < 0.'
    ],
    solution: `(a) $f'(x) = 3x^2 - 12 = 3(x^2 - 4) = 3(x-2)(x+2)$
Critical points: $x = -2$ and $x = 2$

(b) Sign chart for $f'(x) = 3(x-2)(x+2)$:
- For $x < -2$: $(-)(-) = +$, so $f' > 0$ → increasing
- For $-2 < x < 2$: $(+)(-) = -$, so $f' < 0$ → decreasing
- For $x > 2$: $(+)(+) = +$, so $f' > 0$ → increasing

$f$ increasing on $(-\\infty, -2)$ and $(2, \\infty)$
$f$ decreasing on $(-2, 2)$

(c) At $x = -2$: $f'$ changes from + to − → **local maximum**
$f(-2) = -8 + 24 + 1 = 17$

At $x = 2$: $f'$ changes from − to + → **local minimum**
$f(2) = 8 - 24 + 1 = -15$

Local max at $(-2, 17)$, local min at $(2, -15)$`
  },
  {
    id: 'math203-t4-ex02',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    type: 'written',
    difficulty: 2,
    title: 'Concavity and Inflection Points',
    description: 'For $f(x) = x^4 - 4x^3$:\n\n(a) Find all inflection points.\n(b) Determine intervals of concavity.',
    hints: [
      'Find f\'\'(x) and set it equal to zero.',
      'Check for sign changes in f\'\'(x).',
      'Inflection points require a sign change in f\'\'.'
    ],
    solution: `$f'(x) = 4x^3 - 12x^2 = 4x^2(x - 3)$
$f''(x) = 12x^2 - 24x = 12x(x - 2)$

(a) $f''(x) = 0$ when $x = 0$ or $x = 2$.

Sign chart for $f''(x) = 12x(x-2)$:
- For $x < 0$: $(-)(-)=+$ → concave up
- For $0 < x < 2$: $(+)(-)=-$ → concave down
- For $x > 2$: $(+)(+)=+$ → concave up

Sign changes at $x = 0$ and $x = 2$, so both are **inflection points**.

$f(0) = 0$, $f(2) = 16 - 32 = -16$

**Inflection points:** $(0, 0)$ and $(2, -16)$

(b) Concave up on $(-\\infty, 0) \\cup (2, \\infty)$
Concave down on $(0, 2)$`
  },
  {
    id: 'math203-t4-ex03',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    type: 'written',
    difficulty: 2,
    title: 'Second Derivative Test',
    description: 'Use the second derivative test to classify the critical points of:\n\n(a) $f(x) = x^3 - 3x^2 - 9x + 5$\n\n(b) $g(x) = x^4 - 4x^2$',
    hints: [
      'Find critical points from f\'(x) = 0.',
      'Evaluate f\'\'(x) at each critical point.',
      'If f\'\'(c) > 0 → min; if f\'\'(c) < 0 → max; if f\'\'(c) = 0 → inconclusive.'
    ],
    solution: `(a) $f'(x) = 3x^2 - 6x - 9 = 3(x^2 - 2x - 3) = 3(x-3)(x+1) = 0$
Critical points: $x = -1, x = 3$

$f''(x) = 6x - 6$
$f''(-1) = -6 - 6 = -12 < 0$ → **local maximum** at $x = -1$
$f''(3) = 18 - 6 = 12 > 0$ → **local minimum** at $x = 3$

(b) $g'(x) = 4x^3 - 8x = 4x(x^2 - 2) = 0$
Critical points: $x = 0, x = \\pm\\sqrt{2}$

$g''(x) = 12x^2 - 8$
$g''(0) = -8 < 0$ → **local maximum** at $x = 0$
$g''(\\sqrt{2}) = 24 - 8 = 16 > 0$ → **local minimum** at $x = \\sqrt{2}$
$g''(-\\sqrt{2}) = 24 - 8 = 16 > 0$ → **local minimum** at $x = -\\sqrt{2}$`
  },
  {
    id: 'math203-t4-ex04',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    type: 'written',
    difficulty: 2,
    title: 'Absolute Extrema on Closed Intervals',
    description: 'Find the absolute maximum and minimum of each function on the given interval:\n\n(a) $f(x) = x^3 - 3x + 2$ on $[-2, 3]$\n\n(b) $g(x) = x^2 e^{-x}$ on $[0, 4]$',
    hints: [
      'Find critical points in the interior of the interval.',
      'Evaluate f at critical points and endpoints.',
      'Compare all values to find absolute max and min.'
    ],
    solution: `(a) $f'(x) = 3x^2 - 3 = 0 \\Rightarrow x = \\pm 1$
Both are in $[-2, 3]$.

Evaluate:
- $f(-2) = -8 + 6 + 2 = 0$
- $f(-1) = -1 + 3 + 2 = 4$
- $f(1) = 1 - 3 + 2 = 0$
- $f(3) = 27 - 9 + 2 = 20$

**Absolute max:** $f(3) = 20$
**Absolute min:** $f(-2) = f(1) = 0$

(b) $g'(x) = 2xe^{-x} + x^2(-e^{-x}) = e^{-x}(2x - x^2) = xe^{-x}(2-x) = 0$
Critical points: $x = 0$ and $x = 2$ (both in $[0, 4]$)

Evaluate:
- $g(0) = 0$
- $g(2) = 4e^{-2} \\approx 0.541$
- $g(4) = 16e^{-4} \\approx 0.293$

**Absolute max:** $g(2) = 4e^{-2}$
**Absolute min:** $g(0) = 0$`
  },
  {
    id: 'math203-t4-ex05',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    type: 'written',
    difficulty: 3,
    title: 'Mean Value Theorem',
    description: 'Verify that the Mean Value Theorem applies and find the value(s) of $c$:\n\n(a) $f(x) = x^3 - x$ on $[0, 2]$\n\n(b) $f(x) = \\sqrt{x}$ on $[0, 4]$',
    hints: [
      'Check that f is continuous on [a,b] and differentiable on (a,b).',
      'Find the slope of the secant: (f(b) - f(a))/(b - a).',
      'Solve f\'(c) = secant slope.'
    ],
    solution: `(a) $f(x) = x^3 - x$ is a polynomial, so continuous and differentiable everywhere. ✓

Secant slope: $\\frac{f(2) - f(0)}{2 - 0} = \\frac{(8-2) - 0}{2} = 3$

$f'(x) = 3x^2 - 1$
$f'(c) = 3 \\Rightarrow 3c^2 - 1 = 3 \\Rightarrow c^2 = \\frac{4}{3} \\Rightarrow c = \\frac{2}{\\sqrt{3}} = \\frac{2\\sqrt{3}}{3}$
(taking positive value since $c \\in (0, 2)$)

(b) $f(x) = \\sqrt{x}$ is continuous on $[0, 4]$ and differentiable on $(0, 4)$. ✓

Secant slope: $\\frac{f(4) - f(0)}{4 - 0} = \\frac{2 - 0}{4} = \\frac{1}{2}$

$f'(x) = \\frac{1}{2\\sqrt{x}}$
$f'(c) = \\frac{1}{2} \\Rightarrow \\frac{1}{2\\sqrt{c}} = \\frac{1}{2} \\Rightarrow \\sqrt{c} = 1 \\Rightarrow c = 1$`
  },
  {
    id: 'math203-t4-ex06',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    type: 'written',
    difficulty: 3,
    title: 'Applications of MVT',
    description: 'Use the Mean Value Theorem to prove:\n\n(a) $|\\sin a - \\sin b| \\leq |a - b|$ for all $a, b$.\n\n(b) If $f\'(x) = 0$ for all $x$ in an interval, then $f$ is constant on that interval.',
    hints: [
      'Apply MVT and use the bound on the derivative.',
      'For (a), what is the maximum value of |cos c|?',
      'For (b), apply MVT between any two points in the interval.'
    ],
    solution: `(a) Let $f(x) = \\sin x$. By MVT, there exists $c$ between $a$ and $b$ such that:
$\\frac{\\sin b - \\sin a}{b - a} = \\cos c$

Therefore: $|\\sin b - \\sin a| = |\\cos c| \\cdot |b - a|$

Since $|\\cos c| \\leq 1$ for all $c$:
$|\\sin b - \\sin a| \\leq |b - a|$ ∎

(b) Let $a < b$ be any two points in the interval. By MVT, there exists $c \\in (a, b)$ such that:
$f'(c) = \\frac{f(b) - f(a)}{b - a}$

Since $f'(x) = 0$ for all $x$, we have $f'(c) = 0$:
$0 = \\frac{f(b) - f(a)}{b - a}$
$f(b) - f(a) = 0$
$f(b) = f(a)$

Since this holds for any two points in the interval, $f$ is constant. ∎`
  },
  {
    id: 'math203-t4-ex07',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    type: 'written',
    difficulty: 2,
    title: 'First Derivative Test in Detail',
    description: 'For $f(x) = x^4 - 4x^3 + 4x^2$:\n\n(a) Factor $f\'(x)$ completely.\n(b) Find all critical points.\n(c) Use the first derivative test to classify each.\n(d) Sketch the general shape of $f$.',
    hints: [
      'Factor out common terms.',
      'Check sign of f\' on each interval between critical points.',
      'No sign change means neither max nor min.'
    ],
    solution: `(a) $f'(x) = 4x^3 - 12x^2 + 8x = 4x(x^2 - 3x + 2) = 4x(x-1)(x-2)$

(b) Critical points: $x = 0, 1, 2$

(c) Sign chart for $f'(x) = 4x(x-1)(x-2)$:
- $x < 0$: $(-)(-)(-)= -$ → decreasing
- $0 < x < 1$: $(+)(-)(-)= +$ → increasing
- $1 < x < 2$: $(+)(+)(-)= -$ → decreasing
- $x > 2$: $(+)(+)(+)= +$ → increasing

At $x = 0$: − to + → **local minimum**, $f(0) = 0$
At $x = 1$: + to − → **local maximum**, $f(1) = 1 - 4 + 4 = 1$
At $x = 2$: − to + → **local minimum**, $f(2) = 16 - 32 + 16 = 0$

(d) Shape: Starts high (as $x \\to -\\infty$, $f \\to +\\infty$), decreases to local min at (0,0), increases to local max at (1,1), decreases to local min at (2,0), then increases to infinity.`
  },
  {
    id: 'math203-t4-ex08',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    type: 'written',
    difficulty: 3,
    title: 'Critical Points Where Derivative Doesn\'t Exist',
    description: 'Find all critical points and classify them:\n\n(a) $f(x) = |x^2 - 4|$\n\n(b) $g(x) = x^{2/3}(x - 5)$',
    hints: [
      'Critical points occur where f\' = 0 OR f\' doesn\'t exist.',
      'For (a), consider where x² - 4 changes sign.',
      'For (b), find where g\'(x) = 0 or undefined.'
    ],
    solution: `(a) $f(x) = |x^2 - 4| = \\begin{cases} x^2 - 4 & |x| \\geq 2 \\\\ -(x^2 - 4) = 4 - x^2 & |x| < 2 \\end{cases}$

For $|x| > 2$: $f'(x) = 2x$
For $|x| < 2$: $f'(x) = -2x$
At $x = \\pm 2$: $f'$ doesn't exist (corner)

Critical points: $x = 0$ (where $f' = 0$) and $x = \\pm 2$ (where $f'$ DNE)

At $x = 0$: local max ($f(0) = 4$)
At $x = \\pm 2$: local min ($f(\\pm 2) = 0$)

(b) $g(x) = x^{2/3}(x - 5)$
$g'(x) = \\frac{2}{3}x^{-1/3}(x-5) + x^{2/3} = \\frac{2(x-5)}{3x^{1/3}} + x^{2/3}$
$= \\frac{2(x-5) + 3x}{3x^{1/3}} = \\frac{5x - 10}{3x^{1/3}} = \\frac{5(x-2)}{3x^{1/3}}$

$g'(x) = 0$ when $x = 2$
$g'(x)$ undefined when $x = 0$

Critical points: $x = 0$ and $x = 2$

Sign analysis:
- $x < 0$: $(-)/(-)= +$
- $0 < x < 2$: $(-)/(+)= -$
- $x > 2$: $(+)/(+)= +$

At $x = 0$: local max (cusp), $g(0) = 0$
At $x = 2$: local min, $g(2) = 2^{2/3}(-3) = -3\\sqrt[3]{4}$`
  },
  {
    id: 'math203-t4-ex09',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    type: 'written',
    difficulty: 3,
    title: 'Rolle\'s Theorem Application',
    description: 'Show that the equation $x^3 + 3x - 5 = 0$ has exactly one real root.',
    hints: [
      'Use IVT to show at least one root exists.',
      'Use Rolle\'s Theorem (or derivative analysis) to show at most one root.',
      'If there were two roots, what would Rolle\'s Theorem say about f\'?'
    ],
    solution: `Let $f(x) = x^3 + 3x - 5$.

**At least one root (IVT):**
$f(1) = 1 + 3 - 5 = -1 < 0$
$f(2) = 8 + 6 - 5 = 9 > 0$
By IVT, there is at least one root in $(1, 2)$.

**At most one root (via Rolle's Theorem):**
Suppose there were two roots $a < b$ with $f(a) = f(b) = 0$.
By Rolle's Theorem, there would exist $c \\in (a, b)$ with $f'(c) = 0$.

But $f'(x) = 3x^2 + 3 = 3(x^2 + 1) \\geq 3 > 0$ for all $x$.

This is a contradiction! So there cannot be two roots.

**Conclusion:** The equation has exactly one real root. ∎`
  },
  {
    id: 'math203-t4-ex10',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    type: 'written',
    difficulty: 2,
    title: 'Motion Analysis',
    description: 'A particle moves along a line with position $s(t) = t^3 - 6t^2 + 9t + 2$ for $t \\geq 0$.\n\n(a) Find velocity and acceleration functions.\n(b) When is the particle at rest?\n(c) When is it moving to the right (positive direction)?\n(d) When is it speeding up?',
    hints: [
      'Velocity = s\'(t), Acceleration = s\'\'(t).',
      'At rest means velocity = 0.',
      'Moving right means v(t) > 0.',
      'Speeding up means v and a have the same sign.'
    ],
    solution: `(a) $v(t) = s'(t) = 3t^2 - 12t + 9 = 3(t^2 - 4t + 3) = 3(t-1)(t-3)$
$a(t) = v'(t) = 6t - 12 = 6(t - 2)$

(b) At rest when $v(t) = 0$: $t = 1$ and $t = 3$

(c) Moving right when $v(t) > 0$:
$v(t) = 3(t-1)(t-3) > 0$ when $t < 1$ or $t > 3$
(For $t \\geq 0$: on $[0, 1) \\cup (3, \\infty)$)

(d) Speeding up when $v$ and $a$ have the same sign:
- $v(t) > 0$ on $(0, 1) \\cup (3, \\infty)$
- $a(t) > 0$ on $(2, \\infty)$
- $v(t) < 0$ on $(1, 3)$
- $a(t) < 0$ on $(0, 2)$

Same sign: $(1, 2)$ (both negative) and $(3, \\infty)$ (both positive)

**Speeding up on $(1, 2) \\cup (3, \\infty)$**`
  },
  {
    id: 'math203-t4-ex11',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    type: 'written',
    difficulty: 3,
    title: 'Complete Function Analysis',
    description: 'Analyze $f(x) = \\frac{x^2}{x^2 - 1}$ completely:\n\n(a) Domain\n(b) Intercepts\n(c) Symmetry\n(d) Asymptotes\n(e) Intervals of increase/decrease\n(f) Local extrema\n(g) Concavity and inflection points',
    hints: [
      'Domain excludes where denominator = 0.',
      'Check if f(-x) = f(x) or f(-x) = -f(x).',
      'Use quotient rule for derivatives.'
    ],
    solution: `(a) **Domain:** $x \\neq \\pm 1$, i.e., $(-\\infty, -1) \\cup (-1, 1) \\cup (1, \\infty)$

(b) **Intercepts:**
y-intercept: $f(0) = 0$, so $(0, 0)$
x-intercept: $x^2 = 0 \\Rightarrow x = 0$, so $(0, 0)$

(c) **Symmetry:** $f(-x) = \\frac{(-x)^2}{(-x)^2 - 1} = \\frac{x^2}{x^2 - 1} = f(x)$
Even function (symmetric about y-axis)

(d) **Asymptotes:**
Vertical: $x = 1$ and $x = -1$
Horizontal: $\\lim_{x \\to \\pm\\infty} \\frac{x^2}{x^2 - 1} = 1$, so $y = 1$

(e) $f'(x) = \\frac{2x(x^2-1) - x^2(2x)}{(x^2-1)^2} = \\frac{-2x}{(x^2-1)^2}$
Critical point: $x = 0$
$f' > 0$ for $x < 0$ (increasing)
$f' < 0$ for $x > 0$ (decreasing)

(f) **Local max at $x = 0$:** $f(0) = 0$

(g) $f''(x) = \\frac{-2(x^2-1)^2 - (-2x) \\cdot 2(x^2-1)(2x)}{(x^2-1)^4} = \\frac{-2(x^2-1) + 8x^2}{(x^2-1)^3} = \\frac{6x^2 + 2}{(x^2-1)^3}$

$f'' > 0$ when $(x^2-1)^3 > 0$, i.e., $|x| > 1$: concave up on $(-\\infty, -1) \\cup (1, \\infty)$
$f'' < 0$ when $|x| < 1$: concave down on $(-1, 1)$

No inflection points (concavity changes only at asymptotes)`
  },
  {
    id: 'math203-t4-ex12',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    type: 'written',
    difficulty: 3,
    title: 'L\'Hôpital\'s Rule with Derivatives',
    description: 'Use L\'Hôpital\'s Rule to evaluate:\n\n(a) $\\lim_{x \\to 0} \\frac{e^x - 1 - x}{x^2}$\n\n(b) $\\lim_{x \\to 0} \\frac{\\tan x - x}{x^3}$\n\n(c) $\\lim_{x \\to \\infty} x \\ln\\left(1 + \\frac{1}{x}\\right)$',
    hints: [
      'Check indeterminate form before applying.',
      'May need to apply L\'Hôpital multiple times.',
      'For (c), rewrite as a quotient first.'
    ],
    solution: `(a) Form: $\\frac{0}{0}$
$\\lim_{x \\to 0} \\frac{e^x - 1 - x}{x^2} = \\lim_{x \\to 0} \\frac{e^x - 1}{2x}$ (still $\\frac{0}{0}$)
$= \\lim_{x \\to 0} \\frac{e^x}{2} = \\frac{1}{2}$

(b) Form: $\\frac{0}{0}$
$\\lim_{x \\to 0} \\frac{\\tan x - x}{x^3} = \\lim_{x \\to 0} \\frac{\\sec^2 x - 1}{3x^2}$ (still $\\frac{0}{0}$)
$= \\lim_{x \\to 0} \\frac{2\\sec^2 x \\tan x}{6x}$ (still $\\frac{0}{0}$)
$= \\lim_{x \\to 0} \\frac{2\\sec^2 x \\cdot \\sec^2 x + 2\\tan x \\cdot 2\\sec^2 x \\tan x}{6}$
At $x = 0$: $= \\frac{2 \\cdot 1 + 0}{6} = \\frac{1}{3}$

(c) Rewrite: $\\frac{\\ln(1 + 1/x)}{1/x}$ as $x \\to \\infty$
Let $u = 1/x \\to 0^+$:
$\\lim_{u \\to 0^+} \\frac{\\ln(1 + u)}{u}$ (form $\\frac{0}{0}$)
$= \\lim_{u \\to 0^+} \\frac{1/(1+u)}{1} = 1$`
  },
  {
    id: 'math203-t4-ex13',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    type: 'written',
    difficulty: 4,
    title: 'Proving Inequalities with Derivatives',
    description: 'Use calculus to prove:\n\n(a) $e^x \\geq 1 + x$ for all $x$\n\n(b) $\\ln x \\leq x - 1$ for $x > 0$\n\n(c) $\\sin x \\leq x$ for $x \\geq 0$',
    hints: [
      'Consider the function f(x) = (left side) - (right side).',
      'Show f has a minimum at the point where equality holds.',
      'Use the sign of f\' to analyze f\'s behavior.'
    ],
    solution: `(a) Let $f(x) = e^x - 1 - x$
$f'(x) = e^x - 1 = 0 \\Rightarrow x = 0$
$f''(x) = e^x > 0$ always, so $f$ is concave up everywhere.

$f(0) = 1 - 1 - 0 = 0$ is the minimum.
Therefore $f(x) \\geq 0$ for all $x$, i.e., $e^x \\geq 1 + x$. ∎

(b) Let $f(x) = \\ln x - (x - 1) = \\ln x - x + 1$ for $x > 0$
$f'(x) = \\frac{1}{x} - 1 = 0 \\Rightarrow x = 1$
$f''(x) = -\\frac{1}{x^2} < 0$ always, so $f$ is concave down.

$f(1) = 0 - 1 + 1 = 0$ is the maximum.
Therefore $f(x) \\leq 0$ for $x > 0$, i.e., $\\ln x \\leq x - 1$. ∎

(c) Let $f(x) = x - \\sin x$ for $x \\geq 0$
$f'(x) = 1 - \\cos x \\geq 0$ for all $x$ (since $\\cos x \\leq 1$)

$f$ is increasing on $[0, \\infty)$ and $f(0) = 0$.
Therefore $f(x) \\geq 0$ for $x \\geq 0$, i.e., $x \\geq \\sin x$. ∎`
  },
  {
    id: 'math203-t4-ex14',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    type: 'written',
    difficulty: 3,
    title: 'Analyzing Exponential and Logarithmic Functions',
    description: 'Analyze $f(x) = x e^{-x}$ for $x \\geq 0$:\n\n(a) Find critical points and determine local extrema.\n(b) Find inflection points.\n(c) Find limits as $x \\to 0^+$ and $x \\to \\infty$.\n(d) Sketch the graph.',
    hints: [
      'Use the product rule.',
      'Remember lim x→∞ of x/e^x = 0.',
      'Factor the derivatives to analyze signs.'
    ],
    solution: `(a) $f'(x) = e^{-x} + x(-e^{-x}) = e^{-x}(1 - x)$
$f'(x) = 0$ when $x = 1$

$f' > 0$ for $x < 1$ (increasing)
$f' < 0$ for $x > 1$ (decreasing)

**Local maximum at $x = 1$:** $f(1) = e^{-1} = \\frac{1}{e}$

(b) $f''(x) = -e^{-x}(1-x) + e^{-x}(-1) = e^{-x}(x - 2)$
$f''(x) = 0$ when $x = 2$

$f'' < 0$ for $x < 2$ (concave down)
$f'' > 0$ for $x > 2$ (concave up)

**Inflection point at $(2, 2e^{-2})$**

(c) $\\lim_{x \\to 0^+} xe^{-x} = 0 \\cdot 1 = 0$
$\\lim_{x \\to \\infty} xe^{-x} = \\lim_{x \\to \\infty} \\frac{x}{e^x} = 0$ (by L'Hôpital)

(d) Starts at origin, increases to max at $(1, 1/e)$, decreases through inflection at $(2, 2/e^2)$, approaches 0 as $x \\to \\infty$.`
  },
  {
    id: 'math203-t4-ex15',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    type: 'written',
    difficulty: 3,
    title: 'Antiderivative Reasoning',
    description: 'If $f\'(x) = 6x^2 - 4x + 3$ and $f(0) = 5$, find $f(x)$.',
    hints: [
      'Integrate f\'(x) to get f(x) + C.',
      'Use the initial condition to find C.',
      'Verify by differentiating your answer.'
    ],
    solution: `Integrate $f'(x) = 6x^2 - 4x + 3$:
$f(x) = \\int (6x^2 - 4x + 3) dx = 2x^3 - 2x^2 + 3x + C$

Use initial condition $f(0) = 5$:
$f(0) = 0 - 0 + 0 + C = C = 5$

Therefore: $\\boxed{f(x) = 2x^3 - 2x^2 + 3x + 5}$

Verification: $f'(x) = 6x^2 - 4x + 3$ ✓`
  },
  {
    id: 'math203-t4-ex16',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    type: 'written',
    difficulty: 3,
    title: 'Graphical Interpretation of Derivatives',
    description: 'Given that $f$ is continuous and differentiable everywhere with:\n- $f(0) = 2$\n- $f\'(x) > 0$ for $x < 1$ and $x > 3$\n- $f\'(x) < 0$ for $1 < x < 3$\n- $f\'(1) = f\'(3) = 0$\n- $f\'\'(x) > 0$ for $x > 2$\n- $f\'\'(x) < 0$ for $x < 2$\n\nDescribe the behavior of $f$ and sketch a possible graph.',
    hints: [
      'f\' > 0 means increasing, f\' < 0 means decreasing.',
      'Critical points where f\' = 0.',
      'f\'\' > 0 means concave up, f\'\' < 0 means concave down.'
    ],
    solution: `**Analysis:**

**Critical points:** $x = 1$ and $x = 3$ (where $f' = 0$)

**Increasing/Decreasing:**
- Increasing on $(-\\infty, 1)$ and $(3, \\infty)$
- Decreasing on $(1, 3)$

**Local extrema:**
- At $x = 1$: changes from increasing to decreasing → **local maximum**
- At $x = 3$: changes from decreasing to increasing → **local minimum**

**Concavity:**
- Concave down on $(-\\infty, 2)$
- Concave up on $(2, \\infty)$
- **Inflection point at $x = 2$** (concavity changes)

**Key points:**
- $(0, 2)$ is on the graph
- Local max somewhere above the point $(1, f(1))$
- Inflection at $x = 2$ (on the decreasing part)
- Local min at $x = 3$

**Sketch description:** The function starts low on the left, increases (concave down) to a local max at $x=1$, decreases through an inflection at $x=2$, reaches a local min at $x=3$, then increases (concave up) toward infinity.`
  }
];
