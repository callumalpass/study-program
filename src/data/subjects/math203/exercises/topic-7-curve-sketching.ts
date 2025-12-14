import type { WrittenExercise } from '../../../../core/types';

export const topic7Exercises: WrittenExercise[] = [
  // --- DRILLS ---
  {
    id: 'math203-t7-drill-1',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Finding Domain',
    description: 'Find the domain of $f(x) = \\frac{x}{x^2 - 4}$.',
    hints: ['Set denominator ≠ 0.'],
    solution: '$x^2 - 4 \\neq 0 \\Rightarrow x \\neq \\pm 2$\n\nDomain: $(-\\infty, -2) \\cup (-2, 2) \\cup (2, \\infty)$'
  },
  {
    id: 'math203-t7-drill-2',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Vertical Asymptotes',
    description: 'Find the vertical asymptotes of $f(x) = \\frac{1}{x-3}$.',
    hints: ['Vertical asymptotes where denominator = 0.'],
    solution: 'Denominator = 0 when $x = 3$.\n\nVertical asymptote: $x = 3$'
  },
  {
    id: 'math203-t7-drill-3',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Horizontal Asymptotes',
    description: 'Find the horizontal asymptote of $f(x) = \\frac{3x^2 + 1}{x^2 - 5}$.',
    hints: ['Compare degrees; take ratio of leading coefficients.'],
    solution: 'Degrees equal (both 2). Horizontal asymptote: $y = \\frac{3}{1} = 3$'
  },
  {
    id: 'math203-t7-drill-4',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Symmetry',
    description: 'Is $f(x) = x^3 - x$ even, odd, or neither?',
    hints: ['Check if f(-x) = f(x) or f(-x) = -f(x).'],
    solution: '$f(-x) = (-x)^3 - (-x) = -x^3 + x = -(x^3 - x) = -f(x)$\n\n$f$ is **odd** (symmetric about origin).'
  },

  // --- CORE EXERCISES ---
  {
    id: 'math203-t7-ex01',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    type: 'written',
    difficulty: 2,
    title: 'Complete Analysis: Polynomial',
    description: 'Analyze and sketch $f(x) = x^3 - 3x^2$:\n\n(a) Domain\n(b) Intercepts\n(c) Critical points and local extrema\n(d) Inflection points\n(e) End behavior\n(f) Sketch the graph',
    hints: [
      'Factor: f(x) = x²(x - 3).',
      'Find f\' and f\'\' for extrema and inflection.',
      'For end behavior, dominant term is x³.'
    ],
    solution: `(a) **Domain:** All real numbers

(b) **Intercepts:**
- y-intercept: $f(0) = 0$
- x-intercepts: $x^2(x - 3) = 0 \\Rightarrow x = 0$ (double) and $x = 3$

(c) **Critical points:**
$f'(x) = 3x^2 - 6x = 3x(x - 2) = 0$
Critical points: $x = 0$, $x = 2$

- At $x = 0$: $f'$ changes from + to − → local max, $f(0) = 0$
- At $x = 2$: $f'$ changes from − to + → local min, $f(2) = 8 - 12 = -4$

(d) **Inflection points:**
$f''(x) = 6x - 6 = 0 \\Rightarrow x = 1$
$f(1) = 1 - 3 = -2$
Inflection point: $(1, -2)$

(e) **End behavior:**
- As $x \\to -\\infty$: $f(x) \\to -\\infty$
- As $x \\to \\infty$: $f(x) \\to \\infty$

(f) **Sketch:** Curve passes through (0,0), rises to local max at (0,0), falls to local min at (2,-4), crosses x-axis at (3,0), then rises to infinity. Inflection at (1,-2).`
  },
  {
    id: 'math203-t7-ex02',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    type: 'written',
    difficulty: 3,
    title: 'Complete Analysis: Rational Function',
    description: 'Analyze and sketch $f(x) = \\frac{x^2 - 1}{x^2 - 4}$:\n\n(a) Domain and asymptotes\n(b) Intercepts\n(c) Symmetry\n(d) First derivative analysis\n(e) Sketch the graph',
    hints: [
      'Factor both numerator and denominator.',
      'Check for holes vs. asymptotes.',
      'Horizontal asymptote since degrees are equal.'
    ],
    solution: `**Factor:** $f(x) = \\frac{(x-1)(x+1)}{(x-2)(x+2)}$

(a) **Domain:** $x \\neq \\pm 2$

**Asymptotes:**
- Vertical: $x = 2$ and $x = -2$
- Horizontal: $y = 1$ (ratio of leading coefficients)

(b) **Intercepts:**
- y-intercept: $f(0) = \\frac{-1}{-4} = \\frac{1}{4}$
- x-intercepts: $x = \\pm 1$

(c) **Symmetry:** $f(-x) = \\frac{(-x)^2 - 1}{(-x)^2 - 4} = \\frac{x^2 - 1}{x^2 - 4} = f(x)$
**Even function** (symmetric about y-axis)

(d) **First derivative:**
$f'(x) = \\frac{2x(x^2-4) - (x^2-1)(2x)}{(x^2-4)^2} = \\frac{2x(x^2 - 4 - x^2 + 1)}{(x^2-4)^2} = \\frac{-6x}{(x^2-4)^2}$

$f'(x) = 0$ when $x = 0$
$f' > 0$ for $x < 0$ (excluding asymptotes): increasing
$f' < 0$ for $x > 0$: decreasing

**Local max at $(0, 1/4)$**

(e) **Sketch:**
- Approaches $y = 1$ as $x \\to \\pm\\infty$
- Vertical asymptotes at $x = \\pm 2$
- Crosses x-axis at $\\pm 1$
- Local max at $(0, 1/4)$
- Between asymptotes: U-shaped with max at (0, 1/4)`
  },
  {
    id: 'math203-t7-ex03',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    type: 'written',
    difficulty: 3,
    title: 'Oblique Asymptote',
    description: 'Find all asymptotes and sketch $f(x) = \\frac{x^2 + 1}{x}$.',
    hints: [
      'Degree of numerator = degree of denominator + 1.',
      'Perform polynomial division.',
      'The quotient gives the oblique asymptote.'
    ],
    solution: `**Polynomial division:**
$\\frac{x^2 + 1}{x} = x + \\frac{1}{x}$

**Asymptotes:**
- Vertical: $x = 0$ (denominator = 0)
- Oblique: $y = x$ (as $x \\to \\pm\\infty$, $1/x \\to 0$)

**Analysis:**
$f(x) = x + \\frac{1}{x}$

$f'(x) = 1 - \\frac{1}{x^2} = \\frac{x^2 - 1}{x^2}$
$f'(x) = 0$ when $x = \\pm 1$

- At $x = -1$: local max, $f(-1) = -1 - 1 = -2$
- At $x = 1$: local min, $f(1) = 1 + 1 = 2$

**Behavior near asymptote $x = 0$:**
- As $x \\to 0^+$: $f(x) \\to +\\infty$
- As $x \\to 0^-$: $f(x) \\to -\\infty$

**Sketch:** Two branches, each approaching the line $y = x$ and the vertical asymptote. Local max at $(-1, -2)$ on left branch, local min at $(1, 2)$ on right branch.`
  },
  {
    id: 'math203-t7-ex04',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    type: 'written',
    difficulty: 2,
    title: 'Exponential Function Analysis',
    description: 'Analyze and sketch $f(x) = xe^{-x}$ for all real $x$.',
    hints: [
      'Find domain, intercepts, asymptotes.',
      'Use product rule for derivatives.',
      'Find limits as x → ±∞.'
    ],
    solution: `**Domain:** All real numbers

**Intercepts:**
- $f(0) = 0$ (origin)
- $f(x) = 0$ when $x = 0$

**Asymptotes:**
- As $x \\to \\infty$: $f(x) = \\frac{x}{e^x} \\to 0$ (horizontal: $y = 0$)
- As $x \\to -\\infty$: $f(x) \\to -\\infty$ (no asymptote)

**First derivative:**
$f'(x) = e^{-x} - xe^{-x} = e^{-x}(1 - x)$
$f'(x) = 0$ when $x = 1$
- $f' > 0$ for $x < 1$: increasing
- $f' < 0$ for $x > 1$: decreasing
**Local max at $x = 1$:** $f(1) = e^{-1} = \\frac{1}{e}$

**Second derivative:**
$f''(x) = -e^{-x}(1-x) + e^{-x}(-1) = e^{-x}(x - 2)$
$f''(x) = 0$ when $x = 2$
**Inflection point at $(2, 2e^{-2})$**

**Sketch:** Passes through origin, rises to max at $(1, 1/e)$, decreases through inflection at $(2, 2/e^2)$, approaches y = 0 as $x \\to \\infty$. Goes to $-\\infty$ as $x \\to -\\infty$.`
  },
  {
    id: 'math203-t7-ex05',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    type: 'written',
    difficulty: 3,
    title: 'Logarithmic Function Analysis',
    description: 'Analyze and sketch $f(x) = x - \\ln x$ for $x > 0$.',
    hints: [
      'Domain is x > 0 only.',
      'Find critical points and concavity.',
      'Check limits at boundary (x → 0⁺) and infinity.'
    ],
    solution: `**Domain:** $x > 0$

**Intercepts:**
- y-intercept: None ($x = 0$ not in domain)
- x-intercepts: $x - \\ln x = 0$ has solution $x = 1$? $1 - 0 = 1 \\neq 0$. Need to solve numerically: $x \\approx 0.567$ (this is actually impossible since $\\ln x < x$ for all $x > 0$)

Actually: For $x > 0$, $x > \\ln x$ always, so $f(x) > 0$ always. No x-intercepts!

**Limits:**
- As $x \\to 0^+$: $\\ln x \\to -\\infty$, so $f(x) \\to +\\infty$
- As $x \\to \\infty$: $f(x) \\to \\infty$ (x dominates)

**First derivative:**
$f'(x) = 1 - \\frac{1}{x} = \\frac{x - 1}{x}$
$f'(x) = 0$ when $x = 1$
- $f' < 0$ for $0 < x < 1$: decreasing
- $f' > 0$ for $x > 1$: increasing
**Local min at $x = 1$:** $f(1) = 1 - 0 = 1$

**Second derivative:**
$f''(x) = \\frac{1}{x^2} > 0$ for all $x > 0$
**Concave up everywhere**

**Sketch:** Comes down from $+\\infty$ as $x \\to 0^+$, decreases to min at $(1, 1)$, then increases to $\\infty$. Always concave up.`
  },
  {
    id: 'math203-t7-ex06',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    type: 'written',
    difficulty: 3,
    title: 'Rational Function with Hole',
    description: 'Analyze $f(x) = \\frac{x^2 - x - 2}{x - 2}$. Find any holes, asymptotes, and sketch.',
    hints: [
      'Factor the numerator.',
      'Look for common factors (holes).',
      'Simplify and analyze the result.'
    ],
    solution: `**Factor:** $f(x) = \\frac{(x-2)(x+1)}{x-2}$

**Simplify:** For $x \\neq 2$: $f(x) = x + 1$

**Domain:** $x \\neq 2$

**Hole:** At $x = 2$, the function is undefined, but:
$\\lim_{x \\to 2} f(x) = 2 + 1 = 3$

So there's a **hole at $(2, 3)$**.

**Asymptotes:** None! The simplified function is a line.

**Intercepts:**
- y-intercept: $f(0) = 1$
- x-intercept: $x + 1 = 0 \\Rightarrow x = -1$

**Sketch:** The graph is the line $y = x + 1$ with a **hole at $(2, 3)$**.

This is a classic example of a removable discontinuity.`
  },
  {
    id: 'math203-t7-ex07',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    type: 'written',
    difficulty: 3,
    title: 'Quartic Polynomial',
    description: 'Analyze $f(x) = x^4 - 4x^3$ completely.',
    hints: [
      'Factor: f(x) = x³(x - 4).',
      'Find first and second derivatives.',
      'Be careful classifying x = 0.'
    ],
    solution: `**Factor:** $f(x) = x^3(x - 4)$

**Domain:** All real numbers

**Intercepts:**
- $f(0) = 0$ (y and x-intercept)
- $x$-intercepts: $x = 0$ (triple root) and $x = 4$

**First derivative:**
$f'(x) = 4x^3 - 12x^2 = 4x^2(x - 3)$
Critical points: $x = 0$, $x = 3$

**Sign analysis of $f'$:**
- For $x < 0$: $(+)(-) = -$ (decreasing)
- For $0 < x < 3$: $(+)(-) = -$ (decreasing)
- For $x > 3$: $(+)(+) = +$ (increasing)

At $x = 0$: No sign change → neither max nor min (horizontal inflection)
At $x = 3$: − to + → **local min**, $f(3) = 81 - 108 = -27$

**Second derivative:**
$f''(x) = 12x^2 - 24x = 12x(x - 2)$
$f''(x) = 0$ when $x = 0$ or $x = 2$

- For $x < 0$: concave up
- For $0 < x < 2$: concave down
- For $x > 2$: concave up

**Inflection points:** $(0, 0)$ and $(2, -16)$

**End behavior:** As $x \\to \\pm\\infty$: $f(x) \\to +\\infty$

**Sketch:** Starts high (left), decreases through inflection at origin, continues decreasing to min at (3, -27), then rises through (4, 0) to infinity.`
  },
  {
    id: 'math203-t7-ex08',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    type: 'written',
    difficulty: 3,
    title: 'Function with Absolute Value',
    description: 'Analyze and sketch $f(x) = x|x|$.',
    hints: [
      'Rewrite as piecewise: f(x) = x² for x ≥ 0, f(x) = -x² for x < 0.',
      'Check continuity and differentiability at x = 0.',
      'Find derivatives on each piece.'
    ],
    solution: `**Rewrite:**
$f(x) = \\begin{cases} x^2 & x \\geq 0 \\\\ -x^2 & x < 0 \\end{cases}$

**Domain:** All real numbers

**Continuity at $x = 0$:**
$\\lim_{x \\to 0^+} x^2 = 0 = \\lim_{x \\to 0^-} (-x^2) = 0 = f(0)$ ✓

**Differentiability at $x = 0$:**
- Right: $\\lim_{h \\to 0^+} \\frac{h^2 - 0}{h} = 0$
- Left: $\\lim_{h \\to 0^-} \\frac{-h^2 - 0}{h} = 0$
Both equal, so $f'(0) = 0$. ✓

**Derivative:**
$f'(x) = \\begin{cases} 2x & x \\geq 0 \\\\ -2x & x < 0 \\end{cases} = 2|x|$

**Second derivative:** $f''(x) = \\pm 2$ (doesn't exist at $x = 0$)

**Critical point:** $x = 0$ (local and global minimum, $f(0) = 0$)

**Symmetry:** $f(-x) = (-x)|-x| = -x|x| = -f(x)$
**Odd function** (origin symmetry)

**Sketch:** Smooth curve through origin, looks like $x^2$ for $x > 0$ and like $-x^2$ for $x < 0$. Tangent is horizontal at origin.`
  },
  {
    id: 'math203-t7-ex09',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    type: 'written',
    difficulty: 4,
    title: 'Complex Rational Function',
    description: 'Analyze $f(x) = \\frac{x^3}{x^2 - 1}$ completely.',
    hints: [
      'Domain excludes x = ±1.',
      'Perform polynomial division for oblique asymptote.',
      'Check symmetry.'
    ],
    solution: `**Domain:** $x \\neq \\pm 1$

**Polynomial division:**
$\\frac{x^3}{x^2 - 1} = x + \\frac{x}{x^2 - 1}$

**Asymptotes:**
- Vertical: $x = 1$ and $x = -1$
- Oblique: $y = x$

**Symmetry:** $f(-x) = \\frac{-x^3}{x^2 - 1} = -f(x)$
**Odd function**

**Intercepts:**
- Origin: $f(0) = 0$

**First derivative:**
$f'(x) = \\frac{3x^2(x^2-1) - x^3(2x)}{(x^2-1)^2} = \\frac{3x^4 - 3x^2 - 2x^4}{(x^2-1)^2} = \\frac{x^4 - 3x^2}{(x^2-1)^2} = \\frac{x^2(x^2-3)}{(x^2-1)^2}$

$f'(x) = 0$ when $x = 0$ or $x = \\pm\\sqrt{3}$

**Analysis:**
- $f'(x) > 0$ for $|x| > \\sqrt{3}$ (increasing)
- $f'(x) < 0$ for $0 < |x| < \\sqrt{3}$, $|x| \\neq 1$ (decreasing)

At $x = \\sqrt{3}$: local min, $f(\\sqrt{3}) = \\frac{3\\sqrt{3}}{2} = \\frac{3\\sqrt{3}}{2}$
At $x = -\\sqrt{3}$: local max, $f(-\\sqrt{3}) = -\\frac{3\\sqrt{3}}{2}$
At $x = 0$: neither (horizontal inflection by symmetry)

**Sketch:** Odd function with oblique asymptote $y = x$, vertical asymptotes at $\\pm 1$, passing through origin, with local min/max at $\\pm\\sqrt{3}$.`
  },
  {
    id: 'math203-t7-ex10',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    type: 'written',
    difficulty: 3,
    title: 'Trigonometric Function',
    description: 'Analyze $f(x) = \\sin x + \\cos x$ on $[0, 2\\pi]$.',
    hints: [
      'Rewrite as R·sin(x + φ) form, or just use calculus.',
      'Find critical points where f\'(x) = 0.',
      'Check endpoints.'
    ],
    solution: `**Domain:** $[0, 2\\pi]$

**Alternate form:** $f(x) = \\sqrt{2}\\sin\\left(x + \\frac{\\pi}{4}\\right)$

**First derivative:**
$f'(x) = \\cos x - \\sin x = 0$
$\\cos x = \\sin x$
$\\tan x = 1$
$x = \\frac{\\pi}{4}, \\frac{5\\pi}{4}$ in $[0, 2\\pi]$

**Values:**
- $f(0) = 0 + 1 = 1$
- $f(\\pi/4) = \\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{2}}{2} = \\sqrt{2}$
- $f(5\\pi/4) = -\\frac{\\sqrt{2}}{2} - \\frac{\\sqrt{2}}{2} = -\\sqrt{2}$
- $f(2\\pi) = 0 + 1 = 1$

**Extrema:**
- Absolute max: $\\sqrt{2}$ at $x = \\pi/4$
- Absolute min: $-\\sqrt{2}$ at $x = 5\\pi/4$

**Second derivative:**
$f''(x) = -\\sin x - \\cos x = -f(x)$
$f''(x) = 0$ when $f(x) = 0$: $\\sin x + \\cos x = 0 \\Rightarrow \\tan x = -1$
$x = \\frac{3\\pi}{4}, \\frac{7\\pi}{4}$

**Inflection points:** $(3\\pi/4, 0)$ and $(7\\pi/4, 0)$

**Sketch:** Sinusoidal wave with amplitude $\\sqrt{2}$, shifted by $\\pi/4$.`
  },
  {
    id: 'math203-t7-ex11',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    type: 'written',
    difficulty: 3,
    title: 'Gaussian-like Function',
    description: 'Analyze $f(x) = e^{-x^2}$.',
    hints: [
      'This is the famous bell curve (without normalization).',
      'Find critical point and inflection points.',
      'Note: always positive.'
    ],
    solution: `**Domain:** All real numbers

**Symmetry:** $f(-x) = e^{-(-x)^2} = e^{-x^2} = f(x)$
**Even function**

**Range:** $(0, 1]$ (always positive, max at $x = 0$)

**Limits:**
- $\\lim_{x \\to \\pm\\infty} e^{-x^2} = 0$ (horizontal asymptote $y = 0$)

**First derivative:**
$f'(x) = e^{-x^2} \\cdot (-2x) = -2xe^{-x^2}$
$f'(x) = 0$ when $x = 0$
- $f' > 0$ for $x < 0$: increasing
- $f' < 0$ for $x > 0$: decreasing
**Global max at $x = 0$:** $f(0) = 1$

**Second derivative:**
$f''(x) = -2e^{-x^2} + (-2x)(-2x)e^{-x^2} = e^{-x^2}(-2 + 4x^2) = 2e^{-x^2}(2x^2 - 1)$

$f''(x) = 0$ when $x^2 = \\frac{1}{2}$, i.e., $x = \\pm\\frac{1}{\\sqrt{2}}$

**Inflection points:** $\\left(\\pm\\frac{1}{\\sqrt{2}}, e^{-1/2}\\right) = \\left(\\pm\\frac{\\sqrt{2}}{2}, \\frac{1}{\\sqrt{e}}\\right)$

**Sketch:** Bell-shaped curve, peak at $(0, 1)$, symmetric, approaches but never touches y = 0.`
  },
  {
    id: 'math203-t7-ex12',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    type: 'written',
    difficulty: 4,
    title: 'Matching Graph to Derivatives',
    description: 'The graph of $f\'(x)$ is given by $f\'(x) = x^2 - 4$. Determine:\n\n(a) Where is $f$ increasing/decreasing?\n(b) Location and nature of critical points\n(c) Where is $f$ concave up/down?\n(d) Location of inflection points\n(e) Sketch a possible graph of $f$',
    hints: [
      'f increasing where f\' > 0.',
      'Critical points where f\' = 0.',
      'For concavity, find f\'\' from f\'.'
    ],
    solution: `Given: $f'(x) = x^2 - 4 = (x-2)(x+2)$

**(a) Increasing/Decreasing:**
$f'(x) > 0$ when $|x| > 2$: $f$ increasing on $(-\\infty, -2) \\cup (2, \\infty)$
$f'(x) < 0$ when $|x| < 2$: $f$ decreasing on $(-2, 2)$

**(b) Critical points:**
$f'(x) = 0$ at $x = -2$ and $x = 2$
- At $x = -2$: $f'$ changes from + to − → **local maximum**
- At $x = 2$: $f'$ changes from − to + → **local minimum**

**(c) Concavity:**
$f''(x) = 2x$
$f'' > 0$ when $x > 0$: concave up on $(0, \\infty)$
$f'' < 0$ when $x < 0$: concave down on $(-\\infty, 0)$

**(d) Inflection point:**
$f''(x) = 0$ at $x = 0$
Sign changes from − to +: **inflection point at $x = 0$**

**(e) Sketch:** Rises from $-\\infty$, reaches local max at $x = -2$, decreases through inflection at $x = 0$, reaches local min at $x = 2$, then rises to $\\infty$. The curve is concave down for $x < 0$ and concave up for $x > 0$.`
  },
  {
    id: 'math203-t7-ex13',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    type: 'written',
    difficulty: 3,
    title: 'Reciprocal Function',
    description: 'Analyze $f(x) = x + \\frac{4}{x}$ for $x > 0$.',
    hints: [
      'This is like the earlier problem but restricted to x > 0.',
      'Find critical point and classify.',
      'Check behavior at boundaries (0 and ∞).'
    ],
    solution: `**Domain:** $x > 0$

**Limits:**
- As $x \\to 0^+$: $f(x) \\to +\\infty$
- As $x \\to \\infty$: $f(x) \\to \\infty$

**Asymptote:** Oblique asymptote $y = x$ (as $x \\to \\infty$)

**First derivative:**
$f'(x) = 1 - \\frac{4}{x^2} = \\frac{x^2 - 4}{x^2}$
$f'(x) = 0$ when $x = 2$ (only positive solution)

- $f' < 0$ for $0 < x < 2$: decreasing
- $f' > 0$ for $x > 2$: increasing
**Local min at $x = 2$:** $f(2) = 2 + 2 = 4$

**Second derivative:**
$f''(x) = \\frac{8}{x^3} > 0$ for $x > 0$
**Concave up everywhere** (no inflection)

**Sketch:** Comes down from $+\\infty$ (near $x = 0$), reaches minimum at $(2, 4)$, then rises along the line $y = x$.

Note: $f(x) \\geq 4$ for all $x > 0$ (AM-GM inequality: $x + 4/x \\geq 2\\sqrt{4} = 4$)`
  },
  {
    id: 'math203-t7-ex14',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    type: 'written',
    difficulty: 4,
    title: 'Function with Multiple Asymptotes',
    description: 'Analyze $f(x) = \\frac{x^2 - 4}{x^2 - x - 2}$ completely.',
    hints: [
      'Factor both: (x-2)(x+2) / (x-2)(x+1).',
      'Look for holes vs. asymptotes.',
      'The simplified form reveals structure.'
    ],
    solution: `**Factor:**
$f(x) = \\frac{(x-2)(x+2)}{(x-2)(x+1)}$

**For $x \\neq 2$:** $f(x) = \\frac{x+2}{x+1}$

**Domain:** $x \\neq 2$ and $x \\neq -1$

**Hole:** At $x = 2$, $\\lim_{x \\to 2} \\frac{x+2}{x+1} = \\frac{4}{3}$
Hole at $(2, \\frac{4}{3})$

**Vertical asymptote:** $x = -1$

**Horizontal asymptote:**
$\\lim_{x \\to \\pm\\infty} \\frac{x+2}{x+1} = 1$
Asymptote: $y = 1$

**Intercepts:**
- y-intercept: $f(0) = \\frac{2}{1} = 2$
- x-intercept: $x + 2 = 0 \\Rightarrow x = -2$

**First derivative** (of simplified form):
$f'(x) = \\frac{(x+1) - (x+2)}{(x+1)^2} = \\frac{-1}{(x+1)^2} < 0$ always

**Always decreasing** (where defined)

**Sketch:** Decreasing function, approaches $y = 1$ at both ends, has vertical asymptote at $x = -1$, passes through $(-2, 0)$ and $(0, 2)$, with a hole at $(2, 4/3)$.`
  },
  {
    id: 'math203-t7-ex15',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    type: 'written',
    difficulty: 3,
    title: 'Sketching from Derivative Information',
    description: 'Sketch a function $f$ satisfying all of the following:\n- $f(0) = 0$, $f(2) = 1$, $f(4) = 0$\n- $f\'(x) > 0$ for $x < 2$, $f\'(x) < 0$ for $x > 2$\n- $f\'\'(x) < 0$ for all $x$',
    hints: [
      'f\' > 0 means increasing, f\' < 0 means decreasing.',
      'f\'\' < 0 everywhere means always concave down.',
      'Plot the known points first.'
    ],
    solution: `**Analysis:**

**Known points:** $(0, 0)$, $(2, 1)$, $(4, 0)$

**From f\' conditions:**
- Increasing for $x < 2$
- Decreasing for $x > 2$
- Local maximum at $x = 2$ (value = 1)

**From f\'\' < 0:**
- Concave down everywhere
- Graph curves like an inverted parabola

**Sketch description:**
1. Start at $(0, 0)$
2. Curve upward but always bending down (concave down + increasing)
3. Reach maximum at $(2, 1)$
4. Curve downward, still concave down (decreasing + concave down)
5. Pass through $(4, 0)$
6. Continue decreasing and concave down

The shape resembles an inverted parabola or a smooth hill, symmetric-looking but passing through the specified points.

**End behavior:** As the function continues to decrease with negative concavity, it must eventually go to $-\\infty$ as $x \\to \\pm\\infty$.`
  },
  {
    id: 'math203-t7-ex16',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    type: 'written',
    difficulty: 4,
    title: 'Complete Analysis Challenge',
    description: 'Perform a complete analysis of $f(x) = \\frac{x^2 + 1}{x}$ and sketch the graph.',
    hints: [
      'Rewrite as x + 1/x.',
      'Odd function.',
      'Has both vertical and oblique asymptotes.'
    ],
    solution: `**Rewrite:** $f(x) = x + \\frac{1}{x}$

**Domain:** $x \\neq 0$

**Symmetry:** $f(-x) = -x - \\frac{1}{x} = -\\left(x + \\frac{1}{x}\\right) = -f(x)$
**Odd function** (origin symmetry)

**Asymptotes:**
- Vertical: $x = 0$
- Oblique: $y = x$ (as $x \\to \\pm\\infty$)

**Intercepts:** None (never crosses axes)

**First derivative:**
$f'(x) = 1 - \\frac{1}{x^2} = \\frac{x^2 - 1}{x^2}$
$f'(x) = 0$ when $x = \\pm 1$

- For $|x| > 1$: $f' > 0$ (increasing)
- For $0 < |x| < 1$: $f' < 0$ (decreasing)

**Critical points:**
- At $x = 1$: local min, $f(1) = 2$
- At $x = -1$: local max, $f(-1) = -2$

**Second derivative:**
$f''(x) = \\frac{2}{x^3}$
- $f'' > 0$ for $x > 0$: concave up
- $f'' < 0$ for $x < 0$: concave down

**No inflection points** (concavity only changes at asymptote)

**Behavior near $x = 0$:**
- As $x \\to 0^+$: $f(x) \\to +\\infty$
- As $x \\to 0^-$: $f(x) \\to -\\infty$

**Sketch:** Two branches:
- Right ($x > 0$): comes from $+\\infty$ near 0, decreases to min at $(1, 2)$, increases toward line $y = x$
- Left ($x < 0$): comes from $-\\infty$ near 0, increases to max at $(-1, -2)$, decreases toward line $y = x$ (from below)`
  }
];
