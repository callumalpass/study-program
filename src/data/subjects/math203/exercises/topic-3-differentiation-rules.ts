import type { WrittenExercise } from '../../../../core/types';

export const topic3Exercises: WrittenExercise[] = [
  // --- DRILLS ---
  {
    id: 'math203-t3-drill-1',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Power Rule',
    description: 'Differentiate: $f(x) = x^7$',
    hints: ['Use the power rule: d/dx[x^n] = nx^(n-1).'],
    solution: '$f\'(x) = 7x^6$'
  },
  {
    id: 'math203-t3-drill-2',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Sum Rule',
    description: 'Differentiate: $f(x) = x^3 + 5x^2 - 2x + 7$',
    hints: ['Differentiate each term separately.'],
    solution: '$f\'(x) = 3x^2 + 10x - 2$'
  },
  {
    id: 'math203-t3-drill-3',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Chain Rule (Simple)',
    description: 'Differentiate: $f(x) = (3x + 1)^5$',
    hints: ['Use the chain rule: d/dx[u^n] = n·u^(n-1)·u\'.'],
    solution: '$f\'(x) = 5(3x + 1)^4 \\cdot 3 = 15(3x + 1)^4$'
  },
  {
    id: 'math203-t3-drill-4',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Product Rule',
    description: 'Differentiate: $f(x) = x^2 \\sin x$',
    hints: ['Product rule: (fg)\' = f\'g + fg\'.'],
    solution: '$f\'(x) = 2x \\sin x + x^2 \\cos x$'
  },

  // --- CORE EXERCISES ---
  {
    id: 'math203-t3-ex01',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    type: 'written',
    difficulty: 2,
    title: 'Power Rule with Fractional and Negative Exponents',
    description: 'Differentiate each function:\n\n(a) $f(x) = x^{3/2}$\n\n(b) $g(x) = x^{-4}$\n\n(c) $h(x) = \\sqrt[3]{x^2}$\n\n(d) $k(x) = \\frac{1}{x^5}$',
    hints: [
      'Rewrite roots and fractions as powers: √x = x^(1/2), 1/x^n = x^(-n).',
      '∛(x²) = x^(2/3).',
      'Apply the power rule: d/dx[x^n] = nx^(n-1).'
    ],
    solution: `(a) $f(x) = x^{3/2}$
$f'(x) = \\frac{3}{2}x^{1/2} = \\frac{3}{2}\\sqrt{x}$

(b) $g(x) = x^{-4}$
$g'(x) = -4x^{-5} = -\\frac{4}{x^5}$

(c) $h(x) = x^{2/3}$
$h'(x) = \\frac{2}{3}x^{-1/3} = \\frac{2}{3\\sqrt[3]{x}}$

(d) $k(x) = x^{-5}$
$k'(x) = -5x^{-6} = -\\frac{5}{x^6}$`
  },
  {
    id: 'math203-t3-ex02',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    type: 'written',
    difficulty: 2,
    title: 'Product Rule',
    description: 'Use the product rule to differentiate:\n\n(a) $f(x) = x^3 e^x$\n\n(b) $g(x) = (2x + 1)(x^2 - 3)$\n\n(c) $h(x) = \\sqrt{x} \\ln x$\n\n(d) $k(x) = e^x \\sin x$',
    hints: [
      'Product rule: (fg)\' = f\'g + fg\'.',
      'Remember: d/dx[e^x] = e^x, d/dx[ln x] = 1/x.',
      'd/dx[sin x] = cos x.'
    ],
    solution: `(a) $f'(x) = 3x^2 \\cdot e^x + x^3 \\cdot e^x = e^x(3x^2 + x^3) = x^2 e^x(3 + x)$

(b) $g'(x) = 2(x^2 - 3) + (2x + 1)(2x) = 2x^2 - 6 + 4x^2 + 2x = 6x^2 + 2x - 6$

(c) $h'(x) = \\frac{1}{2\\sqrt{x}} \\cdot \\ln x + \\sqrt{x} \\cdot \\frac{1}{x} = \\frac{\\ln x}{2\\sqrt{x}} + \\frac{1}{\\sqrt{x}} = \\frac{\\ln x + 2}{2\\sqrt{x}}$

(d) $k'(x) = e^x \\sin x + e^x \\cos x = e^x(\\sin x + \\cos x)$`
  },
  {
    id: 'math203-t3-ex03',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    type: 'written',
    difficulty: 2,
    title: 'Quotient Rule',
    description: 'Use the quotient rule to differentiate:\n\n(a) $f(x) = \\frac{x^2}{x + 1}$\n\n(b) $g(x) = \\frac{e^x}{x^2}$\n\n(c) $h(x) = \\frac{\\sin x}{\\cos x}$\n\n(d) $k(x) = \\frac{x - 1}{x + 1}$',
    hints: [
      'Quotient rule: (f/g)\' = (f\'g - fg\')/g².',
      'For (c), this should give you the derivative of tan x.',
      'Simplify your answers when possible.'
    ],
    solution: `(a) $f'(x) = \\frac{2x(x+1) - x^2(1)}{(x+1)^2} = \\frac{2x^2 + 2x - x^2}{(x+1)^2} = \\frac{x^2 + 2x}{(x+1)^2} = \\frac{x(x+2)}{(x+1)^2}$

(b) $g'(x) = \\frac{e^x \\cdot x^2 - e^x \\cdot 2x}{x^4} = \\frac{e^x(x^2 - 2x)}{x^4} = \\frac{e^x(x - 2)}{x^3}$

(c) $h'(x) = \\frac{\\cos x \\cdot \\cos x - \\sin x \\cdot (-\\sin x)}{\\cos^2 x} = \\frac{\\cos^2 x + \\sin^2 x}{\\cos^2 x} = \\frac{1}{\\cos^2 x} = \\sec^2 x$
(This confirms d/dx[tan x] = sec² x)

(d) $k'(x) = \\frac{1(x+1) - (x-1)(1)}{(x+1)^2} = \\frac{x + 1 - x + 1}{(x+1)^2} = \\frac{2}{(x+1)^2}$`
  },
  {
    id: 'math203-t3-ex04',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    type: 'written',
    difficulty: 2,
    title: 'Chain Rule',
    description: 'Use the chain rule to differentiate:\n\n(a) $f(x) = (x^2 + 1)^{10}$\n\n(b) $g(x) = \\sin(3x)$\n\n(c) $h(x) = e^{x^2}$\n\n(d) $k(x) = \\ln(x^2 + 1)$',
    hints: [
      'Chain rule: d/dx[f(g(x))] = f\'(g(x)) · g\'(x).',
      'Identify the "outer" and "inner" functions.',
      'd/dx[e^u] = e^u · u\', d/dx[ln u] = (1/u) · u\'.'
    ],
    solution: `(a) Outer: u^10, Inner: u = x² + 1
$f'(x) = 10(x^2 + 1)^9 \\cdot 2x = 20x(x^2 + 1)^9$

(b) Outer: sin u, Inner: u = 3x
$g'(x) = \\cos(3x) \\cdot 3 = 3\\cos(3x)$

(c) Outer: e^u, Inner: u = x²
$h'(x) = e^{x^2} \\cdot 2x = 2xe^{x^2}$

(d) Outer: ln u, Inner: u = x² + 1
$k'(x) = \\frac{1}{x^2 + 1} \\cdot 2x = \\frac{2x}{x^2 + 1}$`
  },
  {
    id: 'math203-t3-ex05',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    type: 'written',
    difficulty: 3,
    title: 'Combining Rules',
    description: 'Differentiate using multiple rules:\n\n(a) $f(x) = x^2 \\sin(3x)$\n\n(b) $g(x) = \\frac{e^{2x}}{x^2 + 1}$\n\n(c) $h(x) = (x^2 + 1)^3 (x^3 - 1)^2$',
    hints: [
      'Identify which rules to use: product, quotient, chain.',
      'Apply rules in the correct order.',
      'Simplify carefully.'
    ],
    solution: `(a) Product rule + chain rule:
$f'(x) = 2x \\sin(3x) + x^2 \\cdot \\cos(3x) \\cdot 3 = 2x\\sin(3x) + 3x^2\\cos(3x)$

(b) Quotient rule + chain rule:
$g'(x) = \\frac{e^{2x} \\cdot 2 \\cdot (x^2+1) - e^{2x} \\cdot 2x}{(x^2+1)^2} = \\frac{2e^{2x}(x^2 + 1 - x)}{(x^2+1)^2} = \\frac{2e^{2x}(x^2 - x + 1)}{(x^2+1)^2}$

(c) Product rule + chain rule:
Let $u = (x^2+1)^3$ and $v = (x^3-1)^2$
$u' = 3(x^2+1)^2 \\cdot 2x = 6x(x^2+1)^2$
$v' = 2(x^3-1) \\cdot 3x^2 = 6x^2(x^3-1)$
$h'(x) = 6x(x^2+1)^2(x^3-1)^2 + (x^2+1)^3 \\cdot 6x^2(x^3-1)$
$= 6x(x^2+1)^2(x^3-1)[(x^3-1) + x(x^2+1)]$
$= 6x(x^2+1)^2(x^3-1)(2x^3 + x - 1)$`
  },
  {
    id: 'math203-t3-ex06',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    type: 'written',
    difficulty: 2,
    title: 'Trigonometric Derivatives',
    description: 'Differentiate:\n\n(a) $f(x) = \\sin^2 x$\n\n(b) $g(x) = \\cos(x^2)$\n\n(c) $h(x) = \\tan(2x)$\n\n(d) $k(x) = \\sec x \\tan x$',
    hints: [
      'sin²x = (sin x)², so use chain rule.',
      'd/dx[tan x] = sec²x, d/dx[sec x] = sec x tan x.',
      'For (d), use the product rule.'
    ],
    solution: `(a) $f(x) = (\\sin x)^2$
$f'(x) = 2\\sin x \\cdot \\cos x = \\sin(2x)$

(b) $g'(x) = -\\sin(x^2) \\cdot 2x = -2x\\sin(x^2)$

(c) $h'(x) = \\sec^2(2x) \\cdot 2 = 2\\sec^2(2x)$

(d) $k'(x) = \\sec x \\tan x \\cdot \\tan x + \\sec x \\cdot \\sec^2 x$
$= \\sec x \\tan^2 x + \\sec^3 x = \\sec x(\\tan^2 x + \\sec^2 x)$
Or: $= \\sec x(\\sec^2 x - 1 + \\sec^2 x) = \\sec x(2\\sec^2 x - 1)$`
  },
  {
    id: 'math203-t3-ex07',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    type: 'written',
    difficulty: 2,
    title: 'Exponential and Logarithmic Derivatives',
    description: 'Differentiate:\n\n(a) $f(x) = e^{3x+1}$\n\n(b) $g(x) = 2^x$\n\n(c) $h(x) = \\ln(\\sin x)$\n\n(d) $k(x) = x^x$ (for $x > 0$)',
    hints: [
      'd/dx[a^x] = a^x ln(a).',
      'd/dx[ln u] = u\'/u.',
      'For (d), use logarithmic differentiation: take ln of both sides.'
    ],
    solution: `(a) $f'(x) = e^{3x+1} \\cdot 3 = 3e^{3x+1}$

(b) $g'(x) = 2^x \\ln 2$

(c) $h'(x) = \\frac{1}{\\sin x} \\cdot \\cos x = \\frac{\\cos x}{\\sin x} = \\cot x$

(d) Let $y = x^x$. Take ln: $\\ln y = x \\ln x$
Differentiate implicitly:
$\\frac{1}{y} \\cdot y' = \\ln x + x \\cdot \\frac{1}{x} = \\ln x + 1$
$y' = y(\\ln x + 1) = x^x(\\ln x + 1)$`
  },
  {
    id: 'math203-t3-ex08',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    type: 'written',
    difficulty: 3,
    title: 'Inverse Trigonometric Derivatives',
    description: 'Differentiate:\n\n(a) $f(x) = \\arcsin(2x)$\n\n(b) $g(x) = \\arctan(x^2)$\n\n(c) $h(x) = x \\arcsin x$\n\n(d) $k(x) = \\arccos(e^x)$',
    hints: [
      'd/dx[arcsin x] = 1/√(1-x²), d/dx[arctan x] = 1/(1+x²).',
      'd/dx[arccos x] = -1/√(1-x²).',
      'Combine with chain rule and product rule as needed.'
    ],
    solution: `(a) $f'(x) = \\frac{1}{\\sqrt{1-(2x)^2}} \\cdot 2 = \\frac{2}{\\sqrt{1-4x^2}}$

(b) $g'(x) = \\frac{1}{1+(x^2)^2} \\cdot 2x = \\frac{2x}{1+x^4}$

(c) Product rule:
$h'(x) = 1 \\cdot \\arcsin x + x \\cdot \\frac{1}{\\sqrt{1-x^2}} = \\arcsin x + \\frac{x}{\\sqrt{1-x^2}}$

(d) $k'(x) = -\\frac{1}{\\sqrt{1-(e^x)^2}} \\cdot e^x = -\\frac{e^x}{\\sqrt{1-e^{2x}}}$`
  },
  {
    id: 'math203-t3-ex09',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    type: 'written',
    difficulty: 3,
    title: 'Implicit Differentiation',
    description: 'Find $\\frac{dy}{dx}$ using implicit differentiation:\n\n(a) $x^2 + y^2 = 25$\n\n(b) $x^3 + y^3 = 6xy$\n\n(c) $\\sin(xy) = x$',
    hints: [
      'Differentiate both sides with respect to x.',
      'Remember y is a function of x: d/dx[y²] = 2y · dy/dx.',
      'Collect terms with dy/dx on one side.'
    ],
    solution: `(a) $2x + 2y\\frac{dy}{dx} = 0$
$\\frac{dy}{dx} = -\\frac{x}{y}$

(b) $3x^2 + 3y^2\\frac{dy}{dx} = 6y + 6x\\frac{dy}{dx}$
$3y^2\\frac{dy}{dx} - 6x\\frac{dy}{dx} = 6y - 3x^2$
$\\frac{dy}{dx}(3y^2 - 6x) = 6y - 3x^2$
$\\frac{dy}{dx} = \\frac{6y - 3x^2}{3y^2 - 6x} = \\frac{2y - x^2}{y^2 - 2x}$

(c) $\\cos(xy) \\cdot (y + x\\frac{dy}{dx}) = 1$
$y\\cos(xy) + x\\cos(xy)\\frac{dy}{dx} = 1$
$\\frac{dy}{dx} = \\frac{1 - y\\cos(xy)}{x\\cos(xy)}$`
  },
  {
    id: 'math203-t3-ex10',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    type: 'written',
    difficulty: 3,
    title: 'Logarithmic Differentiation',
    description: 'Use logarithmic differentiation to find $\\frac{dy}{dx}$:\n\n(a) $y = \\frac{x^2 \\sqrt{x+1}}{(x-1)^3}$\n\n(b) $y = (\\sin x)^x$ for $0 < x < \\pi$\n\n(c) $y = x^{\\sin x}$ for $x > 0$',
    hints: [
      'Take ln of both sides, then use properties of logarithms.',
      'Differentiate implicitly, then solve for dy/dx.',
      'Remember d/dx[ln f] = f\'/f.'
    ],
    solution: `(a) $\\ln y = 2\\ln x + \\frac{1}{2}\\ln(x+1) - 3\\ln(x-1)$
$\\frac{1}{y}\\frac{dy}{dx} = \\frac{2}{x} + \\frac{1}{2(x+1)} - \\frac{3}{x-1}$
$\\frac{dy}{dx} = \\frac{x^2\\sqrt{x+1}}{(x-1)^3}\\left(\\frac{2}{x} + \\frac{1}{2(x+1)} - \\frac{3}{x-1}\\right)$

(b) $\\ln y = x \\ln(\\sin x)$
$\\frac{1}{y}\\frac{dy}{dx} = \\ln(\\sin x) + x \\cdot \\frac{\\cos x}{\\sin x}$
$\\frac{dy}{dx} = (\\sin x)^x \\left(\\ln(\\sin x) + x\\cot x\\right)$

(c) $\\ln y = \\sin x \\cdot \\ln x$
$\\frac{1}{y}\\frac{dy}{dx} = \\cos x \\cdot \\ln x + \\sin x \\cdot \\frac{1}{x}$
$\\frac{dy}{dx} = x^{\\sin x}\\left(\\cos x \\ln x + \\frac{\\sin x}{x}\\right)$`
  },
  {
    id: 'math203-t3-ex11',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    type: 'written',
    difficulty: 3,
    title: 'Second Derivatives',
    description: 'Find $f\'\'(x)$:\n\n(a) $f(x) = x^4 - 3x^2 + 2x - 1$\n\n(b) $f(x) = e^{2x}$\n\n(c) $f(x) = \\sin(3x)$\n\n(d) $f(x) = \\ln x$',
    hints: [
      'Find f\'(x) first, then differentiate again.',
      'The second derivative describes concavity.',
      'Look for patterns.'
    ],
    solution: `(a) $f'(x) = 4x^3 - 6x + 2$
$f''(x) = 12x^2 - 6$

(b) $f'(x) = 2e^{2x}$
$f''(x) = 4e^{2x}$

(c) $f'(x) = 3\\cos(3x)$
$f''(x) = -9\\sin(3x)$

(d) $f'(x) = \\frac{1}{x} = x^{-1}$
$f''(x) = -x^{-2} = -\\frac{1}{x^2}$`
  },
  {
    id: 'math203-t3-ex12',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    type: 'written',
    difficulty: 3,
    title: 'Nested Chain Rules',
    description: 'Differentiate:\n\n(a) $f(x) = \\sin(\\cos(x^2))$\n\n(b) $g(x) = e^{\\sin(3x)}$\n\n(c) $h(x) = \\ln(\\ln x)$\n\n(d) $k(x) = \\sqrt{1 + \\sqrt{x}}$',
    hints: [
      'Work from outside to inside.',
      'Multiply derivatives at each layer.',
      'Be careful to track all the pieces.'
    ],
    solution: `(a) $f'(x) = \\cos(\\cos(x^2)) \\cdot (-\\sin(x^2)) \\cdot 2x$
$= -2x\\sin(x^2)\\cos(\\cos(x^2))$

(b) $g'(x) = e^{\\sin(3x)} \\cdot \\cos(3x) \\cdot 3 = 3\\cos(3x)e^{\\sin(3x)}$

(c) $h'(x) = \\frac{1}{\\ln x} \\cdot \\frac{1}{x} = \\frac{1}{x\\ln x}$

(d) $k(x) = (1 + x^{1/2})^{1/2}$
$k'(x) = \\frac{1}{2}(1 + \\sqrt{x})^{-1/2} \\cdot \\frac{1}{2}x^{-1/2}$
$= \\frac{1}{4\\sqrt{x}\\sqrt{1 + \\sqrt{x}}} = \\frac{1}{4\\sqrt{x + x\\sqrt{x}}}$`
  },
  {
    id: 'math203-t3-ex13',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    type: 'written',
    difficulty: 3,
    title: 'Equations of Tangent Lines',
    description: 'Find the equation of the tangent line:\n\n(a) To $y = e^x$ at $x = 0$\n\n(b) To $y = \\ln x$ at $x = e$\n\n(c) To $y = \\tan x$ at $x = \\pi/4$',
    hints: [
      'Find the point (a, f(a)) and slope f\'(a).',
      'Use point-slope form: y - f(a) = f\'(a)(x - a).',
      'Remember tan(π/4) = 1, sec(π/4) = √2.'
    ],
    solution: `(a) Point: $(0, e^0) = (0, 1)$
$y' = e^x$, so slope $= e^0 = 1$
Tangent: $y - 1 = 1(x - 0)$
$\\boxed{y = x + 1}$

(b) Point: $(e, \\ln e) = (e, 1)$
$y' = \\frac{1}{x}$, so slope $= \\frac{1}{e}$
Tangent: $y - 1 = \\frac{1}{e}(x - e)$
$\\boxed{y = \\frac{1}{e}x}$ or $\\boxed{y = \\frac{x}{e}}$

(c) Point: $(\\pi/4, \\tan(\\pi/4)) = (\\pi/4, 1)$
$y' = \\sec^2 x$, so slope $= \\sec^2(\\pi/4) = (\\sqrt{2})^2 = 2$
Tangent: $y - 1 = 2(x - \\pi/4)$
$\\boxed{y = 2x + 1 - \\frac{\\pi}{2}}$`
  },
  {
    id: 'math203-t3-ex14',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    type: 'written',
    difficulty: 4,
    title: 'Implicit Second Derivative',
    description: 'For the curve $x^2 + y^2 = 25$:\n\n(a) Find $\\frac{dy}{dx}$ by implicit differentiation.\n\n(b) Find $\\frac{d^2y}{dx^2}$ in terms of $x$ and $y$.\n\n(c) Evaluate $\\frac{d^2y}{dx^2}$ at the point $(3, 4)$.',
    hints: [
      'For the second derivative, differentiate dy/dx with respect to x.',
      'Remember dy/dx appears in the expression, so use the chain rule.',
      'Substitute the expression for dy/dx to simplify.'
    ],
    solution: `(a) $2x + 2y\\frac{dy}{dx} = 0$
$\\frac{dy}{dx} = -\\frac{x}{y}$

(b) Differentiate $\\frac{dy}{dx} = -\\frac{x}{y}$ with respect to x:
$\\frac{d^2y}{dx^2} = -\\frac{y \\cdot 1 - x \\cdot \\frac{dy}{dx}}{y^2} = -\\frac{y - x(-\\frac{x}{y})}{y^2}$
$= -\\frac{y + \\frac{x^2}{y}}{y^2} = -\\frac{y^2 + x^2}{y^3}$

Since $x^2 + y^2 = 25$:
$\\frac{d^2y}{dx^2} = -\\frac{25}{y^3}$

(c) At $(3, 4)$: $y = 4$
$\\frac{d^2y}{dx^2} = -\\frac{25}{64}$`
  },
  {
    id: 'math203-t3-ex15',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    type: 'written',
    difficulty: 3,
    title: 'Derivatives and Tangent Lines to Implicit Curves',
    description: 'Find the equation of the tangent line to the curve $x^3 + y^3 = 9$ at the point $(1, 2)$.',
    hints: [
      'Use implicit differentiation to find dy/dx.',
      'Evaluate dy/dx at the given point.',
      'Use point-slope form for the tangent line.'
    ],
    solution: `Implicit differentiation:
$3x^2 + 3y^2 \\frac{dy}{dx} = 0$
$\\frac{dy}{dx} = -\\frac{x^2}{y^2}$

At $(1, 2)$:
$\\frac{dy}{dx} = -\\frac{1}{4}$

Tangent line:
$y - 2 = -\\frac{1}{4}(x - 1)$
$y = -\\frac{1}{4}x + \\frac{1}{4} + 2$
$\\boxed{y = -\\frac{1}{4}x + \\frac{9}{4}}$`
  },
  {
    id: 'math203-t3-ex16',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    type: 'written',
    difficulty: 4,
    title: 'Parametric Differentiation',
    description: 'A curve is given parametrically by $x = t^2 - 1$ and $y = t^3 - t$.\n\n(a) Find $\\frac{dy}{dx}$ in terms of $t$.\n\n(b) Find the equation of the tangent line at $t = 2$.\n\n(c) At what point(s) is the tangent horizontal?',
    hints: [
      'dy/dx = (dy/dt)/(dx/dt).',
      'For (b), find x and y when t = 2.',
      'Horizontal tangent means dy/dx = 0, so dy/dt = 0.'
    ],
    solution: `(a) $\\frac{dx}{dt} = 2t$, $\\frac{dy}{dt} = 3t^2 - 1$
$\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} = \\frac{3t^2 - 1}{2t}$

(b) At $t = 2$:
$x = 4 - 1 = 3$, $y = 8 - 2 = 6$
$\\frac{dy}{dx} = \\frac{12 - 1}{4} = \\frac{11}{4}$

Tangent line: $y - 6 = \\frac{11}{4}(x - 3)$
$\\boxed{y = \\frac{11}{4}x - \\frac{9}{4}}$

(c) Horizontal tangent when $\\frac{dy}{dt} = 0$:
$3t^2 - 1 = 0 \\Rightarrow t = \\pm\\frac{1}{\\sqrt{3}}$

At $t = \\frac{1}{\\sqrt{3}}$: $x = \\frac{1}{3} - 1 = -\\frac{2}{3}$, $y = \\frac{1}{3\\sqrt{3}} - \\frac{1}{\\sqrt{3}} = -\\frac{2}{3\\sqrt{3}}$

At $t = -\\frac{1}{\\sqrt{3}}$: $x = -\\frac{2}{3}$, $y = \\frac{2}{3\\sqrt{3}}$

Points: $\\left(-\\frac{2}{3}, -\\frac{2\\sqrt{3}}{9}\\right)$ and $\\left(-\\frac{2}{3}, \\frac{2\\sqrt{3}}{9}\\right)$`
  }
];
