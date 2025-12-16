import type { WrittenExercise } from '../../../../core/types';

export const topic5Exercises: WrittenExercise[] = [
  {
    id: 'math204-t5-drill-1',
    subjectId: 'math204',
    topicId: 'math204-5',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Improper Integral Definition',
    description: 'What makes an integral "improper"?',
    hints: ['Two main reasons.'],
    solution: 'An integral is improper if: (1) one or both limits of integration are infinite, or (2) the integrand has an infinite discontinuity in the interval.'
  },
  {
    id: 'math204-t5-drill-2',
    subjectId: 'math204',
    topicId: 'math204-5',
    type: 'written',
    difficulty: 1,
    title: 'Drill: p-Test',
    description: 'For what values of $p$ does $\\int_1^\\infty \\frac{1}{x^p} \\, dx$ converge?',
    hints: ['The p-test.'],
    solution: 'Converges if and only if $p > 1$.'
  },
  {
    id: 'math204-t5-drill-3',
    subjectId: 'math204',
    topicId: 'math204-5',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Basic Convergence',
    description: 'Does $\\int_1^\\infty \\frac{1}{x} \\, dx$ converge or diverge?',
    hints: ['Use the p-test with $p = 1$.'],
    solution: 'Diverges (by p-test with $p = 1$).'
  },
  {
    id: 'math204-t5-drill-4',
    subjectId: 'math204',
    topicId: 'math204-5',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Evaluating Improper Integrals',
    description: 'To evaluate $\\int_1^\\infty f(x) \\, dx$, we compute the limit of what?',
    hints: ['Replace infinity with a variable.'],
    solution: '$\\lim_{t \\to \\infty} \\int_1^t f(x) \\, dx$'
  },
  {
    id: 'math204-t5-ex01',
    subjectId: 'math204',
    topicId: 'math204-5',
    type: 'written',
    difficulty: 2,
    title: 'Evaluating Improper Integrals',
    description: 'Evaluate: $\\int_1^\\infty \\frac{1}{x^2} \\, dx$',
    hints: ['Take the limit as upper bound approaches infinity.'],
    solution: '$\\int_1^\\infty \\frac{1}{x^2} \\, dx = \\lim_{t \\to \\infty} \\int_1^t x^{-2} \\, dx = \\lim_{t \\to \\infty} \\left[-\\frac{1}{x}\\right]_1^t$\\n\\n$= \\lim_{t \\to \\infty} \\left(-\\frac{1}{t} + 1\\right) = 0 + 1 = 1$'
  },
  {
    id: 'math204-t5-ex02',
    subjectId: 'math204',
    topicId: 'math204-5',
    type: 'written',
    difficulty: 2,
    title: 'Exponential Improper Integral',
    description: 'Evaluate: $\\int_0^\\infty e^{-x} \\, dx$',
    hints: ['Exponential decay converges.'],
    solution: '$\\int_0^\\infty e^{-x} \\, dx = \\lim_{t \\to \\infty} \\int_0^t e^{-x} \\, dx = \\lim_{t \\to \\infty} [-e^{-x}]_0^t$\\n\\n$= \\lim_{t \\to \\infty} (-e^{-t} + 1) = 0 + 1 = 1$'
  },
  {
    id: 'math204-t5-ex03',
    subjectId: 'math204',
    topicId: 'math204-5',
    type: 'written',
    difficulty: 3,
    title: 'Discontinuity at Endpoint',
    description: 'Evaluate: $\\int_0^1 \\frac{1}{\\sqrt{x}} \\, dx$',
    hints: ['Infinite discontinuity at $x = 0$.'],
    solution: '$\\int_0^1 \\frac{1}{\\sqrt{x}} \\, dx = \\lim_{t \\to 0^+} \\int_t^1 x^{-1/2} \\, dx = \\lim_{t \\to 0^+} [2\\sqrt{x}]_t^1$\\n\\n$= \\lim_{t \\to 0^+} (2 - 2\\sqrt{t}) = 2 - 0 = 2$'
  },
  {
    id: 'math204-t5-ex04',
    subjectId: 'math204',
    topicId: 'math204-5',
    type: 'written',
    difficulty: 3,
    title: 'Direct Comparison Test',
    description: 'Show that $\\int_1^\\infty \\frac{1}{x^2+1} \\, dx$ converges using comparison.',
    hints: ['Compare to $\\frac{1}{x^2}$.'],
    solution: 'For $x \\geq 1$: $x^2 + 1 > x^2$, so $\\frac{1}{x^2+1} < \\frac{1}{x^2}$\\n\\nSince $\\int_1^\\infty \\frac{1}{x^2} \\, dx$ converges (p-test with $p=2>1$), and $0 \\leq \\frac{1}{x^2+1} \\leq \\frac{1}{x^2}$, by Direct Comparison Test, $\\int_1^\\infty \\frac{1}{x^2+1} \\, dx$ converges.'
  },
  {
    id: 'math204-t5-ex05',
    subjectId: 'math204',
    topicId: 'math204-5',
    type: 'written',
    difficulty: 4,
    title: 'Limit Comparison Test',
    description: 'Determine if $\\int_1^\\infty \\frac{\\sqrt{x}}{x^2+1} \\, dx$ converges using limit comparison.',
    hints: ['Compare to $\\frac{1}{x^{3/2}}$.'],
    solution: 'For large $x$, $\\frac{\\sqrt{x}}{x^2+1} \\approx \\frac{\\sqrt{x}}{x^2} = \\frac{1}{x^{3/2}}$\\n\\nLet $f(x) = \\frac{\\sqrt{x}}{x^2+1}$ and $g(x) = \\frac{1}{x^{3/2}}$\\n\\n$L = \\lim_{x \\to \\infty} \\frac{f(x)}{g(x)} = \\lim_{x \\to \\infty} \\frac{\\sqrt{x} \\cdot x^{3/2}}{x^2+1} = \\lim_{x \\to \\infty} \\frac{x^2}{x^2+1} = 1$\\n\\nSince $\\int_1^\\infty \\frac{1}{x^{3/2}} \\, dx$ converges ($p = 3/2 > 1$) and $L = 1 > 0$, by Limit Comparison Test, $\\int_1^\\infty \\frac{\\sqrt{x}}{x^2+1} \\, dx$ converges.'
  },
  {
    id: 'math204-t5-ex06',
    subjectId: 'math204',
    topicId: 'math204-5',
    type: 'written',
    difficulty: 3,
    title: 'Both Limits Infinite',
    description: 'Evaluate: $\\int_{-\\infty}^\\infty \\frac{1}{1+x^2} \\, dx$',
    hints: ['Split at 0: $\\int_{-\\infty}^0 + \\int_0^\\infty$.'],
    solution: 'By symmetry: $\\int_{-\\infty}^\\infty \\frac{1}{1+x^2} \\, dx = 2\\int_0^\\infty \\frac{1}{1+x^2} \\, dx$\\n\\n$= 2\\lim_{t \\to \\infty} [\\arctan x]_0^t = 2\\lim_{t \\to \\infty} (\\arctan t - 0) = 2 \\cdot \\frac{\\pi}{2} = \\pi$'
  },
  {
    id: 'math204-t5-ex07',
    subjectId: 'math204',
    topicId: 'math204-5',
    type: 'written',
    difficulty: 4,
    title: 'Interior Discontinuity',
    description: 'Evaluate: $\\int_0^3 \\frac{1}{x-1} \\, dx$',
    hints: ['Discontinuity at $x = 1$. Must split there.'],
    solution: 'Discontinuity at $x = 1$, so:\\n\\n$\\int_0^3 \\frac{1}{x-1} \\, dx = \\lim_{t \\to 1^-} \\int_0^t \\frac{1}{x-1} \\, dx + \\lim_{s \\to 1^+} \\int_s^3 \\frac{1}{x-1} \\, dx$\\n\\n$= \\lim_{t \\to 1^-} [\\ln|x-1|]_0^t + \\lim_{s \\to 1^+} [\\ln|x-1|]_s^3$\\n\\n$= \\lim_{t \\to 1^-} (\\ln|t-1| - \\ln 1) + \\lim_{s \\to 1^+} (\\ln 2 - \\ln|s-1|)$\\n\\nBoth limits are $-\\infty$, so the integral **diverges**.'
  },
  {
    id: 'math204-t5-ex08',
    subjectId: 'math204',
    topicId: 'math204-5',
    type: 'written',
    difficulty: 4,
    title: 'Comparison with Polynomial',
    description: 'Determine if $\\int_2^\\infty \\frac{x+1}{x^3-1} \\, dx$ converges.',
    hints: ['For large $x$, behaves like $\\frac{x}{x^3} = \\frac{1}{x^2}$.'],
    solution: 'For large $x$: $\\frac{x+1}{x^3-1} \\approx \\frac{x}{x^3} = \\frac{1}{x^2}$\\n\\nSince $\\int_2^\\infty \\frac{1}{x^2} \\, dx$ converges ($p=2>1$), and the behavior at infinity matches, by Limit Comparison Test, $\\int_2^\\infty \\frac{x+1}{x^3-1} \\, dx$ **converges**.'
  },
  {
    id: 'math204-t5-ex09',
    subjectId: 'math204',
    topicId: 'math204-5',
    type: 'written',
    difficulty: 5,
    title: 'Gamma Function',
    description: 'Evaluate: $\\int_0^\\infty x e^{-x} \\, dx$',
    hints: ['Use integration by parts.'],
    solution: 'Let $u = x$, $dv = e^{-x} \\, dx$. Then $du = dx$, $v = -e^{-x}$.\\n\\n$\\int_0^\\infty x e^{-x} \\, dx = \\lim_{t \\to \\infty} \\left[-xe^{-x}\\right]_0^t + \\int_0^\\infty e^{-x} \\, dx$\\n\\n$= \\lim_{t \\to \\infty} (-te^{-t} + 0) + [-e^{-x}]_0^\\infty$\\n\\n$= 0 + (0 - (-1)) = 1$'
  },
  {
    id: 'math204-t5-ex10',
    subjectId: 'math204',
    topicId: 'math204-5',
    type: 'written',
    difficulty: 4,
    title: 'Recognizing Divergence',
    description: 'Does $\\int_1^\\infty \\frac{\\ln x}{x} \\, dx$ converge?',
    hints: ['Substitute $u = \\ln x$.'],
    solution: 'Let $u = \\ln x$, then $du = \\frac{1}{x} \\, dx$. When $x = 1$, $u = 0$; as $x \\to \\infty$, $u \\to \\infty$.\\n\\n$\\int_1^\\infty \\frac{\\ln x}{x} \\, dx = \\int_0^\\infty u \\, du = \\lim_{t \\to \\infty} \\left[\\frac{u^2}{2}\\right]_0^t = \\lim_{t \\to \\infty} \\frac{t^2}{2} = \\infty$\\n\\nThe integral **diverges**.'
  },
  {
    id: 'math204-t5-ex11',
    subjectId: 'math204',
    topicId: 'math204-5',
    type: 'written',
    difficulty: 5,
    title: 'Laplace Transform',
    description: 'Evaluate: $\\int_0^\\infty e^{-2x} \\sin x \\, dx$',
    hints: ['Use integration by parts twice.'],
    solution: 'Let $I = \\int e^{-2x} \\sin x \\, dx$\\n\\nFirst by parts: $u = \\sin x$, $dv = e^{-2x} \\, dx$\\n$I = -\\frac{1}{2}e^{-2x}\\sin x + \\frac{1}{2}\\int e^{-2x}\\cos x \\, dx$\\n\\nSecond by parts on $\\int e^{-2x}\\cos x \\, dx$: $u = \\cos x$, $dv = e^{-2x} \\, dx$\\n$\\int e^{-2x}\\cos x \\, dx = -\\frac{1}{2}e^{-2x}\\cos x - \\frac{1}{2}I$\\n\\nSubstitute back:\\n$I = -\\frac{1}{2}e^{-2x}\\sin x + \\frac{1}{2}\\left(-\\frac{1}{2}e^{-2x}\\cos x - \\frac{1}{2}I\\right)$\\n$I = -\\frac{1}{2}e^{-2x}\\sin x - \\frac{1}{4}e^{-2x}\\cos x - \\frac{1}{4}I$\\n$\\frac{5}{4}I = -\\frac{e^{-2x}}{4}(2\\sin x + \\cos x)$\\n$I = -\\frac{e^{-2x}(2\\sin x + \\cos x)}{5}$\\n\\nEvaluate from 0 to $\\infty$:\\n$\\int_0^\\infty e^{-2x} \\sin x \\, dx = \\left[-\\frac{e^{-2x}(2\\sin x + \\cos x)}{5}\\right]_0^\\infty = 0 - \\left(-\\frac{1}{5}\\right) = \\frac{1}{5}$'
  },
  {
    id: 'math204-t5-ex12',
    subjectId: 'math204',
    topicId: 'math204-5',
    type: 'written',
    difficulty: 5,
    title: 'Challenge: Parameter Dependency',
    description: 'For what values of $a$ does $\\int_0^1 \\frac{1}{x^a} \\, dx$ converge?',
    hints: ['Discontinuity at $x = 0$. Evaluate the limit.'],
    solution: '$\\int_0^1 \\frac{1}{x^a} \\, dx = \\lim_{t \\to 0^+} \\int_t^1 x^{-a} \\, dx$\\n\\nIf $a \\neq 1$:\\n$= \\lim_{t \\to 0^+} \\left[\\frac{x^{1-a}}{1-a}\\right]_t^1 = \\lim_{t \\to 0^+} \\frac{1 - t^{1-a}}{1-a}$\\n\\nThis converges if $1-a > 0$, i.e., $a < 1$.\\n\\nIf $a = 1$: $\\int_0^1 \\frac{1}{x} \\, dx = \\lim_{t \\to 0^+} [\\ln x]_t^1 = \\lim_{t \\to 0^+} (0 - \\ln t) = \\infty$, diverges.\\n\\n**Answer**: Converges for $a < 1$.'
  }
];
