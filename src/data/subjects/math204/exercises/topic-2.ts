import type { WrittenExercise } from '../../../../core/types';

export const topic2Exercises: WrittenExercise[] = [
  {
    id: 'math204-t2-drill-1',
    subjectId: 'math204',
    topicId: 'math204-2',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Basic Definite Integral',
    description: 'Evaluate: $\\int_0^2 x \\, dx$',
    hints: ['Use the Fundamental Theorem: find the antiderivative and evaluate at the limits.'],
    solution: '$\\int_0^2 x \\, dx = \\left[\\frac{x^2}{2}\\right]_0^2 = \\frac{4}{2} - 0 = 2$'
  },
  {
    id: 'math204-t2-drill-2',
    subjectId: 'math204',
    topicId: 'math204-2',
    type: 'written',
    difficulty: 1,
    title: 'Drill: FTC Part 1',
    description: 'If $F(x) = \\int_0^x t^2 \\, dt$, find $F\'(x)$.',
    hints: ['By FTC Part 1, the derivative of an integral is the integrand.'],
    solution: 'By the Fundamental Theorem of Calculus Part 1: $F\'(x) = x^2$'
  },
  {
    id: 'math204-t2-drill-3',
    subjectId: 'math204',
    topicId: 'math204-2',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Constant Integration',
    description: 'Evaluate: $\\int_1^4 5 \\, dx$',
    hints: ['The integral of a constant c is cx.'],
    solution: '$\\int_1^4 5 \\, dx = [5x]_1^4 = 20 - 5 = 15$'
  },
  {
    id: 'math204-t2-drill-4',
    subjectId: 'math204',
    topicId: 'math204-2',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Negative Area',
    description: 'What is $\\int_2^0 x \\, dx$?',
    hints: ['Reversing the limits changes the sign.'],
    solution: '$\\int_2^0 x \\, dx = -\\int_0^2 x \\, dx = -\\left[\\frac{x^2}{2}\\right]_0^2 = -2$'
  },
  {
    id: 'math204-t2-ex01',
    subjectId: 'math204',
    topicId: 'math204-2',
    type: 'written',
    difficulty: 2,
    title: 'Definite Integrals with FTC',
    description: 'Evaluate:\n\n(a) $\\int_1^3 (2x - 1) \\, dx$\n\n(b) $\\int_0^{\\pi/2} \\sin x \\, dx$\n\n(c) $\\int_1^e \\frac{1}{x} \\, dx$',
    hints: ['Find the antiderivative, then evaluate at the bounds.', 'Remember: $\\int_a^b f(x) \\, dx = F(b) - F(a)$.'],
    solution: `(a) $\\int_1^3 (2x - 1) \\, dx = [x^2 - x]_1^3 = (9 - 3) - (1 - 1) = 6$

(b) $\\int_0^{\\pi/2} \\sin x \\, dx = [-\\cos x]_0^{\\pi/2} = -\\cos(\\pi/2) - (-\\cos 0) = 0 + 1 = 1$

(c) $\\int_1^e \\frac{1}{x} \\, dx = [\\ln x]_1^e = \\ln e - \\ln 1 = 1 - 0 = 1$`
  },
  {
    id: 'math204-t2-ex02',
    subjectId: 'math204',
    topicId: 'math204-2',
    type: 'written',
    difficulty: 3,
    title: 'FTC Part 1 Applications',
    description: 'Find the derivative:\n\n(a) $\\frac{d}{dx}\\int_0^x (t^2 + 1) \\, dt$\n\n(b) $\\frac{d}{dx}\\int_1^{x^2} \\sin t \\, dt$\n\n(c) $\\frac{d}{dx}\\int_x^2 e^t \\, dt$',
    hints: ['For (b), use chain rule with FTC Part 1.', 'For (c), use the property that $\\int_x^a = -\\int_a^x$.'],
    solution: `(a) By FTC Part 1: $\\frac{d}{dx}\\int_0^x (t^2 + 1) \\, dt = x^2 + 1$

(b) Let $u = x^2$. By FTC and chain rule: $\\frac{d}{dx}\\int_1^{x^2} \\sin t \\, dt = \\sin(x^2) \\cdot 2x$

(c) $\\int_x^2 e^t \\, dt = -\\int_2^x e^t \\, dt$, so $\\frac{d}{dx}\\int_x^2 e^t \\, dt = -e^x$`
  },
  {
    id: 'math204-t2-ex03',
    subjectId: 'math204',
    topicId: 'math204-2',
    type: 'written',
    difficulty: 2,
    title: 'Substitution in Definite Integrals',
    description: 'Evaluate $\\int_0^1 2x(x^2 + 1)^2 \\, dx$',
    hints: ['Use u-substitution with $u = x^2 + 1$.', 'Don\'t forget to change the limits of integration!'],
    solution: `Let $u = x^2 + 1$, then $du = 2x \\, dx$.
When $x = 0$: $u = 1$
When $x = 1$: $u = 2$

$\\int_0^1 2x(x^2 + 1)^2 \\, dx = \\int_1^2 u^2 \\, du = \\left[\\frac{u^3}{3}\\right]_1^2 = \\frac{8}{3} - \\frac{1}{3} = \\frac{7}{3}$`
  },
  {
    id: 'math204-t2-ex04',
    subjectId: 'math204',
    topicId: 'math204-2',
    type: 'written',
    difficulty: 3,
    title: 'Average Value',
    description: 'Find the average value of $f(x) = x^2$ on the interval $[0, 3]$.',
    hints: ['Average value = $\\frac{1}{b-a}\\int_a^b f(x) \\, dx$.'],
    solution: `Average value $= \\frac{1}{3-0}\\int_0^3 x^2 \\, dx = \\frac{1}{3}\\left[\\frac{x^3}{3}\\right]_0^3$
$= \\frac{1}{3} \\cdot \\frac{27}{3} = \\frac{1}{3} \\cdot 9 = 3$`
  },
  {
    id: 'math204-t2-ex05',
    subjectId: 'math204',
    topicId: 'math204-2',
    type: 'written',
    difficulty: 3,
    title: 'Properties of Integrals',
    description: 'If $\\int_0^4 f(x) \\, dx = 10$ and $\\int_0^4 g(x) \\, dx = 6$, find:\n\n(a) $\\int_0^4 [2f(x) + 3g(x)] \\, dx$\n\n(b) $\\int_0^4 [f(x) - g(x)] \\, dx$',
    hints: ['Use linearity: $\\int [af(x) + bg(x)] \\, dx = a\\int f(x) \\, dx + b\\int g(x) \\, dx$.'],
    solution: `(a) $\\int_0^4 [2f(x) + 3g(x)] \\, dx = 2\\int_0^4 f(x) \\, dx + 3\\int_0^4 g(x) \\, dx = 2(10) + 3(6) = 20 + 18 = 38$

(b) $\\int_0^4 [f(x) - g(x)] \\, dx = \\int_0^4 f(x) \\, dx - \\int_0^4 g(x) \\, dx = 10 - 6 = 4$`
  },
  {
    id: 'math204-t2-ex06',
    subjectId: 'math204',
    topicId: 'math204-2',
    type: 'written',
    difficulty: 4,
    title: 'Symmetric Functions',
    description: 'Evaluate:\n\n(a) $\\int_{-2}^2 x^3 \\, dx$\n\n(b) $\\int_{-\\pi}^{\\pi} \\cos x \\, dx$',
    hints: ['Odd functions integrate to 0 over symmetric intervals.', 'Even functions: $\\int_{-a}^a f(x) \\, dx = 2\\int_0^a f(x) \\, dx$.'],
    solution: `(a) $x^3$ is an odd function, so $\\int_{-2}^2 x^3 \\, dx = 0$

(b) $\\cos x$ is an even function, so $\\int_{-\\pi}^{\\pi} \\cos x \\, dx = 2\\int_0^{\\pi} \\cos x \\, dx = 2[\\sin x]_0^{\\pi} = 2(0 - 0) = 0$`
  },
  {
    id: 'math204-t2-ex07',
    subjectId: 'math204',
    topicId: 'math204-2',
    type: 'written',
    difficulty: 4,
    title: 'Area and Sign',
    description: 'Compute $\\int_{-1}^1 x \\, dx$ and explain its geometric meaning.',
    hints: ['Graph $y = x$ from -1 to 1.', 'Consider the signed area.'],
    solution: `$\\int_{-1}^1 x \\, dx = \\left[\\frac{x^2}{2}\\right]_{-1}^1 = \\frac{1}{2} - \\frac{1}{2} = 0$

Geometrically: the line $y = x$ creates a triangle below the x-axis from -1 to 0 (area = -1/2) and above from 0 to 1 (area = +1/2). The signed areas cancel, giving 0.`
  },
  {
    id: 'math204-t2-ex08',
    subjectId: 'math204',
    topicId: 'math204-2',
    type: 'written',
    difficulty: 3,
    title: 'Exponential Definite Integrals',
    description: 'Evaluate $\\int_0^{\\ln 2} e^x \\, dx$',
    hints: ['The antiderivative of $e^x$ is $e^x$.'],
    solution: `$\\int_0^{\\ln 2} e^x \\, dx = [e^x]_0^{\\ln 2} = e^{\\ln 2} - e^0 = 2 - 1 = 1$`
  },
  {
    id: 'math204-t2-ex09',
    subjectId: 'math204',
    topicId: 'math204-2',
    type: 'written',
    difficulty: 4,
    title: 'Substitution with Trig',
    description: 'Evaluate $\\int_0^{\\pi/4} \\tan x \\sec^2 x \\, dx$',
    hints: ['Let $u = \\tan x$, then $du = \\sec^2 x \\, dx$.'],
    solution: `Let $u = \\tan x$, then $du = \\sec^2 x \\, dx$.
When $x = 0$: $u = 0$
When $x = \\pi/4$: $u = 1$

$\\int_0^{\\pi/4} \\tan x \\sec^2 x \\, dx = \\int_0^1 u \\, du = \\left[\\frac{u^2}{2}\\right]_0^1 = \\frac{1}{2}$`
  },
  {
    id: 'math204-t2-ex10',
    subjectId: 'math204',
    topicId: 'math204-2',
    type: 'written',
    difficulty: 4,
    title: 'Splitting Intervals',
    description: 'If $\\int_0^5 f(x) \\, dx = 12$ and $\\int_5^8 f(x) \\, dx = 7$, find $\\int_0^8 f(x) \\, dx$.',
    hints: ['Use additivity: $\\int_a^c f = \\int_a^b f + \\int_b^c f$.'],
    solution: `By the additivity property:
$\\int_0^8 f(x) \\, dx = \\int_0^5 f(x) \\, dx + \\int_5^8 f(x) \\, dx = 12 + 7 = 19$`
  },
  {
    id: 'math204-t2-ex11',
    subjectId: 'math204',
    topicId: 'math204-2',
    type: 'written',
    difficulty: 5,
    title: 'Area Under Curve',
    description: 'Find the exact area under the curve $y = \\sin x$ from $x = 0$ to $x = \\pi$.',
    hints: ['Area = $\\int_0^{\\pi} \\sin x \\, dx$.'],
    solution: `Area $= \\int_0^{\\pi} \\sin x \\, dx = [-\\cos x]_0^{\\pi} = -\\cos(\\pi) - (-\\cos 0) = -(-1) + 1 = 1 + 1 = 2$`
  },
  {
    id: 'math204-t2-ex12',
    subjectId: 'math204',
    topicId: 'math204-2',
    type: 'written',
    difficulty: 5,
    title: 'Challenge: Complex Substitution',
    description: 'Evaluate $\\int_1^4 \\frac{1}{2\\sqrt{x}} \\, dx$ using substitution.',
    hints: ['Let $u = \\sqrt{x}$, so $x = u^2$ and $dx = 2u \\, du$.'],
    solution: `Let $u = \\sqrt{x}$, so $x = u^2$ and $dx = 2u \\, du$.
When $x = 1$: $u = 1$
When $x = 4$: $u = 2$

$\\int_1^4 \\frac{1}{2\\sqrt{x}} \\, dx = \\int_1^2 \\frac{1}{2u} \\cdot 2u \\, du = \\int_1^2 1 \\, du = [u]_1^2 = 2 - 1 = 1$

Alternative: $\\int_1^4 \\frac{1}{2\\sqrt{x}} \\, dx = \\int_1^4 \\frac{1}{2}x^{-1/2} \\, dx = \\frac{1}{2}\\left[\\frac{x^{1/2}}{1/2}\\right]_1^4 = [\\sqrt{x}]_1^4 = 2 - 1 = 1$`
  }
];
