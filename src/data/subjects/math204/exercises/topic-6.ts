import type { WrittenExercise } from '../../../../core/types';

export const topic6Exercises: WrittenExercise[] = [
  {
    id: 'math204-t6-drill-1',
    subjectId: 'math204',
    topicId: 'math204-6',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Sequence Limit',
    description: 'Find $\\lim_{n \\to \\infty} \\frac{1}{n}$.',
    hints: ['As n grows, what happens to 1/n?'],
    solution: '$\\lim_{n \\to \\infty} \\frac{1}{n} = 0$'
  },
  {
    id: 'math204-t6-drill-2',
    subjectId: 'math204',
    topicId: 'math204-6',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Geometric Series',
    description: 'What is the sum of $\\sum_{n=0}^\\infty r^n$ when $|r| < 1$?',
    hints: ['Geometric series formula.'],
    solution: '$\\frac{1}{1-r}$'
  },
  {
    id: 'math204-t6-drill-3',
    subjectId: 'math204',
    topicId: 'math204-6',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Divergence Test',
    description: 'If $\\lim_{n \\to \\infty} a_n \\neq 0$, what can we conclude about $\\sum a_n$?',
    hints: ['The nth term test.'],
    solution: 'The series $\\sum a_n$ diverges.'
  },
  {
    id: 'math204-t6-drill-4',
    subjectId: 'math204',
    topicId: 'math204-6',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Ratio Test',
    description: 'In the Ratio Test, if $L < 1$, what do we conclude?',
    hints: ['Ratio test conclusion.'],
    solution: 'The series converges absolutely.'
  },
  {
    id: 'math204-t6-ex01',
    subjectId: 'math204',
    topicId: 'math204-6',
    type: 'written',
    difficulty: 2,
    title: 'Sequence Limits',
    description: 'Find the following limits:\n\n(a) $\\lim_{n \\to \\infty} \\frac{n}{n+1}$\n\n(b) $\\lim_{n \\to \\infty} \\frac{n^2}{2n^2+1}$',
    hints: ['Divide numerator and denominator by highest power of n.'],
    solution: '(a) $\\lim_{n \\to \\infty} \\frac{n}{n+1} = \\lim_{n \\to \\infty} \\frac{1}{1+1/n} = \\frac{1}{1+0} = 1$\\n\\n(b) $\\lim_{n \\to \\infty} \\frac{n^2}{2n^2+1} = \\lim_{n \\to \\infty} \\frac{1}{2+1/n^2} = \\frac{1}{2}$'
  },
  {
    id: 'math204-t6-ex02',
    subjectId: 'math204',
    topicId: 'math204-6',
    type: 'written',
    difficulty: 2,
    title: 'Geometric Series Sum',
    description: 'Find the sum: $\\sum_{n=0}^\\infty \\left(\\frac{1}{3}\\right)^n$',
    hints: ['Use the geometric series formula with $r = 1/3$.'],
    solution: 'This is a geometric series with $a = 1$ and $r = 1/3$.\\n\\nSince $|r| = 1/3 < 1$, it converges to:\\n\\n$S = \\frac{a}{1-r} = \\frac{1}{1-1/3} = \\frac{1}{2/3} = \\frac{3}{2}$'
  },
  {
    id: 'math204-t6-ex03',
    subjectId: 'math204',
    topicId: 'math204-6',
    type: 'written',
    difficulty: 3,
    title: 'Divergence Test',
    description: 'Determine if $\\sum_{n=1}^\\infty \\frac{n}{n+1}$ converges or diverges.',
    hints: ['Check if the terms approach 0.'],
    solution: '$\\lim_{n \\to \\infty} \\frac{n}{n+1} = 1 \\neq 0$\\n\\nBy the Divergence Test (nth Term Test), the series **diverges**.'
  },
  {
    id: 'math204-t6-ex04',
    subjectId: 'math204',
    topicId: 'math204-6',
    type: 'written',
    difficulty: 3,
    title: 'Integral Test',
    description: 'Use the Integral Test to determine if $\\sum_{n=1}^\\infty \\frac{1}{n^2}$ converges.',
    hints: ['Compare to $\\int_1^\\infty \\frac{1}{x^2} \\, dx$.'],
    solution: 'Let $f(x) = \\frac{1}{x^2}$, which is positive, continuous, and decreasing for $x \\geq 1$.\\n\\n$\\int_1^\\infty \\frac{1}{x^2} \\, dx = \\lim_{t \\to \\infty} [-\\frac{1}{x}]_1^t = \\lim_{t \\to \\infty} (-\\frac{1}{t} + 1) = 1$\\n\\nSince the integral converges, by the Integral Test, $\\sum_{n=1}^\\infty \\frac{1}{n^2}$ **converges**.'
  },
  {
    id: 'math204-t6-ex05',
    subjectId: 'math204',
    topicId: 'math204-6',
    type: 'written',
    difficulty: 3,
    title: 'Comparison Test',
    description: 'Determine if $\\sum_{n=1}^\\infty \\frac{1}{2^n + n}$ converges.',
    hints: ['Compare to $\\sum \\frac{1}{2^n}$.'],
    solution: 'For $n \\geq 1$: $2^n + n \\geq 2^n$, so $\\frac{1}{2^n+n} \\leq \\frac{1}{2^n}$\\n\\n$\\sum_{n=1}^\\infty \\frac{1}{2^n}$ is a geometric series with $r = 1/2 < 1$, so it converges.\\n\\nBy the Direct Comparison Test, $\\sum_{n=1}^\\infty \\frac{1}{2^n+n}$ **converges**.'
  },
  {
    id: 'math204-t6-ex06',
    subjectId: 'math204',
    topicId: 'math204-6',
    type: 'written',
    difficulty: 4,
    title: 'Alternating Series Test',
    description: 'Determine if $\\sum_{n=1}^\\infty \\frac{(-1)^n}{n}$ converges.',
    hints: ['Use the Alternating Series Test.'],
    solution: 'The series alternates. Check: (1) $a_n = \\frac{1}{n} > 0$, (2) $a_n$ is decreasing, (3) $\\lim_{n \\to \\infty} a_n = 0$.\\n\\nAll conditions satisfied, so by the Alternating Series Test, the series **converges**.\\n\\n(This is the alternating harmonic series.)'
  },
  {
    id: 'math204-t6-ex07',
    subjectId: 'math204',
    topicId: 'math204-6',
    type: 'written',
    difficulty: 4,
    title: 'Ratio Test',
    description: 'Use the Ratio Test to determine if $\\sum_{n=1}^\\infty \\frac{n!}{n^n}$ converges.',
    hints: ['Compute $\\lim |a_{n+1}/a_n|$.'],
    solution: '$a_n = \\frac{n!}{n^n}$, so:\\n\\n$\\frac{a_{n+1}}{a_n} = \\frac{(n+1)!}{(n+1)^{n+1}} \\cdot \\frac{n^n}{n!} = \\frac{(n+1)n^n}{(n+1)^{n+1}} = \\frac{n^n}{(n+1)^n} = \\left(\\frac{n}{n+1}\\right)^n = \\left(\\frac{1}{1+1/n}\\right)^n$\\n\\n$L = \\lim_{n \\to \\infty} \\left(\\frac{1}{1+1/n}\\right)^n = \\frac{1}{e} < 1$\\n\\nBy the Ratio Test, the series **converges**.'
  },
  {
    id: 'math204-t6-ex08',
    subjectId: 'math204',
    topicId: 'math204-6',
    type: 'written',
    difficulty: 4,
    title: 'Root Test',
    description: 'Use the Root Test on $\\sum_{n=1}^\\infty \\left(\\frac{2n+1}{3n+2}\\right)^n$.',
    hints: ['Compute $\\lim \\sqrt[n]{|a_n|}$.'],
    solution: '$a_n = \\left(\\frac{2n+1}{3n+2}\\right)^n$\\n\\n$\\sqrt[n]{|a_n|} = \\frac{2n+1}{3n+2}$\\n\\n$L = \\lim_{n \\to \\infty} \\frac{2n+1}{3n+2} = \\lim_{n \\to \\infty} \\frac{2+1/n}{3+2/n} = \\frac{2}{3} < 1$\\n\\nBy the Root Test, the series **converges**.'
  },
  {
    id: 'math204-t6-ex09',
    subjectId: 'math204',
    topicId: 'math204-6',
    type: 'written',
    difficulty: 5,
    title: 'Absolute vs Conditional Convergence',
    description: 'Determine if $\\sum_{n=1}^\\infty \\frac{(-1)^n}{n}$ converges absolutely or conditionally.',
    hints: ['Check if $\\sum |a_n|$ converges.'],
    solution: 'We know $\\sum_{n=1}^\\infty \\frac{(-1)^n}{n}$ converges (alternating harmonic series).\\n\\nCheck absolute convergence: $\\sum_{n=1}^\\infty \\left|\\frac{(-1)^n}{n}\\right| = \\sum_{n=1}^\\infty \\frac{1}{n}$\\n\\nThis is the harmonic series, which **diverges**.\\n\\nSince the original series converges but the absolute series diverges, the series is **conditionally convergent**.'
  },
  {
    id: 'math204-t6-ex10',
    subjectId: 'math204',
    topicId: 'math204-6',
    type: 'written',
    difficulty: 4,
    title: 'Limit Comparison Test',
    description: 'Use Limit Comparison to test $\\sum_{n=1}^\\infty \\frac{n+1}{n^3+2}$.',
    hints: ['Compare to $\\sum \\frac{1}{n^2}$.'],
    solution: 'For large $n$, $\\frac{n+1}{n^3+2} \\approx \\frac{n}{n^3} = \\frac{1}{n^2}$\\n\\nLet $a_n = \\frac{n+1}{n^3+2}$ and $b_n = \\frac{1}{n^2}$:\\n\\n$L = \\lim_{n \\to \\infty} \\frac{a_n}{b_n} = \\lim_{n \\to \\infty} \\frac{(n+1)n^2}{n^3+2} = \\lim_{n \\to \\infty} \\frac{n^3+n^2}{n^3+2} = 1$\\n\\nSince $\\sum \\frac{1}{n^2}$ converges (p-series, $p=2>1$) and $L = 1$ (finite and positive), by Limit Comparison Test, $\\sum_{n=1}^\\infty \\frac{n+1}{n^3+2}$ **converges**.'
  },
  {
    id: 'math204-t6-ex11',
    subjectId: 'math204',
    topicId: 'math204-6',
    type: 'written',
    difficulty: 5,
    title: 'Telescoping Series',
    description: 'Find the sum: $\\sum_{n=1}^\\infty \\left(\\frac{1}{n} - \\frac{1}{n+1}\\right)$',
    hints: ['Write out the first few partial sums.'],
    solution: 'Partial sums:\\n$S_1 = \\frac{1}{1} - \\frac{1}{2}$\\n$S_2 = \\left(\\frac{1}{1} - \\frac{1}{2}\\right) + \\left(\\frac{1}{2} - \\frac{1}{3}\\right) = 1 - \\frac{1}{3}$\\n$S_3 = 1 - \\frac{1}{4}$\\n\\nGeneral: $S_n = 1 - \\frac{1}{n+1}$\\n\\n$\\sum_{n=1}^\\infty \\left(\\frac{1}{n} - \\frac{1}{n+1}\\right) = \\lim_{n \\to \\infty} S_n = \\lim_{n \\to \\infty} \\left(1 - \\frac{1}{n+1}\\right) = 1$'
  },
  {
    id: 'math204-t6-ex12',
    subjectId: 'math204',
    topicId: 'math204-6',
    type: 'written',
    difficulty: 5,
    title: 'Challenge: Multiple Tests',
    description: 'Determine if $\\sum_{n=2}^\\infty \\frac{1}{n(\\ln n)^2}$ converges.',
    hints: ['Use the Integral Test with $u = \\ln x$.'],
    solution: 'Let $f(x) = \\frac{1}{x(\\ln x)^2}$ for $x \\geq 2$. This is positive, continuous, and decreasing.\\n\\n$\\int_2^\\infty \\frac{1}{x(\\ln x)^2} \\, dx$\\n\\nLet $u = \\ln x$, then $du = \\frac{1}{x} \\, dx$. When $x = 2$, $u = \\ln 2$; as $x \\to \\infty$, $u \\to \\infty$.\\n\\n$= \\int_{\\ln 2}^\\infty \\frac{1}{u^2} \\, du = \\lim_{t \\to \\infty} \\left[-\\frac{1}{u}\\right]_{\\ln 2}^t = \\lim_{t \\to \\infty} \\left(-\\frac{1}{t} + \\frac{1}{\\ln 2}\\right) = \\frac{1}{\\ln 2}$\\n\\nSince the integral converges, by the Integral Test, $\\sum_{n=2}^\\infty \\frac{1}{n(\\ln n)^2}$ **converges**.'
  }
];
