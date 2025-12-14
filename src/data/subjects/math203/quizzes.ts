import { Quiz } from '../../../core/types';

export const math203Quizzes: Quiz[] = [
  {
    id: 'math203-quiz-1',
    subjectId: 'math203',
    topicId: 'math203-topic-1',
    title: 'Limits and Continuity Quiz',
    questions: [
      {
        id: 'math203-q1-1',
        type: 'multiple_choice',
        prompt: 'What is $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}$?',
        options: ['0', '2', '4', 'Does not exist'],
        correctAnswer: 2,
        explanation:
          'Factor the numerator: $\\frac{(x-2)(x+2)}{x-2} = x + 2$ for $x \\neq 2$. As $x \\to 2$, this approaches $4$.'
      },
      {
        id: 'math203-q1-2',
        type: 'true_false',
        prompt:
          'If $\\lim_{x \\to a} f(x)$ exists, then $f(a)$ must be defined.',
        correctAnswer: false,
        explanation:
          'False. A limit can exist at a point where the function is undefined. For example, $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ even though $f(0)$ is undefined.'
      },
      {
        id: 'math203-q1-3',
        type: 'multiple_choice',
        prompt:
          'Which of the following is an indeterminate form where L\'Hôpital\'s Rule can be applied directly?',
        options: ['$\\frac{1}{0}$', '$\\frac{0}{0}$', '$\\frac{\\infty}{0}$', '$\\frac{1}{\\infty}$'],
        correctAnswer: 1,
        explanation:
          "L'Hôpital's Rule applies directly to $\\frac{0}{0}$ and $\\frac{\\infty}{\\infty}$ forms. $\\frac{1}{0}$ is not indeterminate (it's infinite), and $\\frac{1}{\\infty} = 0$."
      },
      {
        id: 'math203-q1-4',
        type: 'multiple_choice',
        prompt:
          'A function $f$ is continuous at $x = a$ if and only if:',
        options: [
          '$f(a)$ is defined',
          '$\\lim_{x \\to a} f(x)$ exists',
          'Both of the above',
          '$f(a)$ is defined, $\\lim_{x \\to a} f(x)$ exists, and $\\lim_{x \\to a} f(x) = f(a)$'
        ],
        correctAnswer: 3,
        explanation:
          'Continuity requires all three conditions: the function value exists, the limit exists, and they are equal.'
      }
    ]
  },
  {
    id: 'math203-quiz-2',
    subjectId: 'math203',
    topicId: 'math203-topic-2',
    title: 'Definition of the Derivative Quiz',
    questions: [
      {
        id: 'math203-q2-1',
        type: 'multiple_choice',
        prompt:
          'The derivative of $f(x)$ at $x = a$ is defined as:',
        options: [
          '$\\frac{f(a+h) - f(a)}{h}$',
          '$\\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}$',
          '$\\lim_{x \\to a} f(x)$',
          '$\\frac{f(b) - f(a)}{b - a}$'
        ],
        correctAnswer: 1,
        explanation:
          'The derivative is the limit of the difference quotient as h approaches 0, not just the difference quotient itself.'
      },
      {
        id: 'math203-q2-2',
        type: 'true_false',
        prompt: 'If a function is differentiable at a point, it must be continuous at that point.',
        correctAnswer: true,
        explanation:
          'True. Differentiability implies continuity. However, the converse is false: a function can be continuous but not differentiable (e.g., |x| at x = 0).'
      },
      {
        id: 'math203-q2-3',
        type: 'multiple_choice',
        prompt:
          'At which type of point is a function NOT differentiable?',
        options: [
          'A point where the function is continuous',
          'A corner or cusp',
          'An interior point of the domain',
          'A point where f\'(x) = 0'
        ],
        correctAnswer: 1,
        explanation:
          'Functions are not differentiable at corners, cusps, vertical tangents, and discontinuities. A corner or cusp has different left and right derivatives.'
      },
      {
        id: 'math203-q2-4',
        type: 'multiple_choice',
        prompt:
          'Using the limit definition, what is the derivative of $f(x) = x^2$?',
        options: ['$x$', '$2x$', '$x^2$', '$2$'],
        correctAnswer: 1,
        explanation:
          '$f\'(x) = \\lim_{h \\to 0} \\frac{(x+h)^2 - x^2}{h} = \\lim_{h \\to 0} \\frac{2xh + h^2}{h} = \\lim_{h \\to 0} (2x + h) = 2x$'
      }
    ]
  },
  {
    id: 'math203-quiz-3',
    subjectId: 'math203',
    topicId: 'math203-topic-3',
    title: 'Differentiation Rules Quiz',
    questions: [
      {
        id: 'math203-q3-1',
        type: 'multiple_choice',
        prompt: 'What is $\\frac{d}{dx}[x^5]$?',
        options: ['$x^4$', '$5x^4$', '$5x^5$', '$4x^5$'],
        correctAnswer: 1,
        explanation: 'By the power rule: $\\frac{d}{dx}[x^n] = nx^{n-1}$, so $\\frac{d}{dx}[x^5] = 5x^4$.'
      },
      {
        id: 'math203-q3-2',
        type: 'multiple_choice',
        prompt: 'What is $\\frac{d}{dx}[\\sin(3x)]$?',
        options: ['$\\cos(3x)$', '$3\\cos(3x)$', '$-3\\sin(3x)$', '$\\cos(x)$'],
        correctAnswer: 1,
        explanation:
          'By the chain rule: derivative of outer function times derivative of inner. $\\cos(3x) \\cdot 3 = 3\\cos(3x)$.'
      },
      {
        id: 'math203-q3-3',
        type: 'true_false',
        prompt: 'The derivative of $e^x$ is $xe^{x-1}$.',
        correctAnswer: false,
        explanation:
          'False. The derivative of $e^x$ is $e^x$ itself. The power rule does not apply to exponential functions where the variable is in the exponent.'
      },
      {
        id: 'math203-q3-4',
        type: 'multiple_choice',
        prompt: 'Using the product rule, what is $\\frac{d}{dx}[x \\cdot e^x]$?',
        options: ['$e^x$', '$xe^x$', '$e^x + xe^x$', '$e^x - xe^x$'],
        correctAnswer: 2,
        explanation:
          'Product rule: $(fg)\' = f\'g + fg\'$. Here: $1 \\cdot e^x + x \\cdot e^x = e^x + xe^x = e^x(1 + x)$.'
      }
    ]
  },
  {
    id: 'math203-quiz-4',
    subjectId: 'math203',
    topicId: 'math203-topic-4',
    title: 'Applications of Derivatives Quiz',
    questions: [
      {
        id: 'math203-q4-1',
        type: 'multiple_choice',
        prompt:
          'If $f\'(c) = 0$ and $f\'\'(c) > 0$, then $x = c$ is:',
        options: [
          'A local maximum',
          'A local minimum',
          'An inflection point',
          'Cannot be determined'
        ],
        correctAnswer: 1,
        explanation:
          'The second derivative test: if $f\'(c) = 0$ and $f\'\'(c) > 0$ (concave up), then c is a local minimum.'
      },
      {
        id: 'math203-q4-2',
        type: 'true_false',
        prompt:
          'If $f\'(x) > 0$ on an interval, then $f$ is increasing on that interval.',
        correctAnswer: true,
        explanation:
          'True. A positive derivative means the function is increasing. This is a fundamental theorem of calculus.'
      },
      {
        id: 'math203-q4-3',
        type: 'multiple_choice',
        prompt:
          'An inflection point occurs where:',
        options: [
          '$f\'(x) = 0$',
          '$f\'\'(x) = 0$ and $f\'\'$ changes sign',
          '$f(x) = 0$',
          'The function has a maximum'
        ],
        correctAnswer: 1,
        explanation:
          'An inflection point is where concavity changes. This requires $f\'\'$ to change sign, which typically occurs where $f\'\'(x) = 0$ or is undefined.'
      },
      {
        id: 'math203-q4-4',
        type: 'multiple_choice',
        prompt:
          'The Mean Value Theorem guarantees that for a function continuous on $[a,b]$ and differentiable on $(a,b)$:',
        options: [
          '$f(a) = f(b)$',
          'There exists $c \\in (a,b)$ where $f\'(c) = \\frac{f(b) - f(a)}{b - a}$',
          '$f$ has a maximum on $[a,b]$',
          '$f\'(x) = 0$ somewhere in $(a,b)$'
        ],
        correctAnswer: 1,
        explanation:
          'MVT states that there is a point where the instantaneous rate of change equals the average rate of change over the interval.'
      }
    ]
  },
  {
    id: 'math203-quiz-5',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    title: 'Optimization Problems Quiz',
    questions: [
      {
        id: 'math203-q5-1',
        type: 'multiple_choice',
        prompt:
          'To find the maximum area of a rectangle with a fixed perimeter, you should:',
        options: [
          'Make it as long as possible',
          'Make it as wide as possible',
          'Make it a square',
          'Make all sides different'
        ],
        correctAnswer: 2,
        explanation:
          'A square maximizes area for a given perimeter. This can be proven using calculus by setting up the area function and finding its maximum.'
      },
      {
        id: 'math203-q5-2',
        type: 'true_false',
        prompt:
          'In optimization problems, the maximum or minimum always occurs at a critical point.',
        correctAnswer: false,
        explanation:
          'False. On a closed interval, the absolute extremum can occur at an endpoint, not just at critical points. Always check both.'
      },
      {
        id: 'math203-q5-3',
        type: 'multiple_choice',
        prompt:
          'In an optimization problem, the constraint equation is used to:',
        options: [
          'Find the critical points directly',
          'Reduce the objective function to one variable',
          'Determine the domain',
          'Both B and C'
        ],
        correctAnswer: 3,
        explanation:
          'The constraint helps express the objective function in terms of one variable AND often determines the valid domain for that variable.'
      },
      {
        id: 'math203-q5-4',
        type: 'multiple_choice',
        prompt:
          'An open-top box is made from a square sheet by cutting corners. To maximize volume:',
        options: [
          'Cut the largest possible squares',
          'Cut the smallest possible squares',
          'Cut squares whose side is 1/6 of the sheet side',
          'Cut squares whose side is 1/4 of the sheet side'
        ],
        correctAnswer: 2,
        explanation:
          'For a square sheet of side $s$, the optimal cut is $x = s/6$. This can be verified by setting $V\'(x) = 0$.'
      }
    ]
  },
  {
    id: 'math203-quiz-6',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    title: 'Related Rates Quiz',
    questions: [
      {
        id: 'math203-q6-1',
        type: 'multiple_choice',
        prompt:
          'In a related rates problem, you should substitute known values:',
        options: [
          'Before differentiating',
          'After differentiating',
          'It doesn\'t matter',
          'Only for constant values'
        ],
        correctAnswer: 1,
        explanation:
          'Always differentiate first, then substitute. Substituting before differentiating treats changing quantities as constants, giving wrong results.'
      },
      {
        id: 'math203-q6-2',
        type: 'true_false',
        prompt:
          'If a balloon\'s volume is increasing at a constant rate, its radius is also increasing at a constant rate.',
        correctAnswer: false,
        explanation:
          'False. Since $V = \\frac{4}{3}\\pi r^3$, differentiating gives $\\frac{dV}{dt} = 4\\pi r^2 \\frac{dr}{dt}$. Even with constant $\\frac{dV}{dt}$, as $r$ increases, $\\frac{dr}{dt}$ must decrease.'
      },
      {
        id: 'math203-q6-3',
        type: 'multiple_choice',
        prompt:
          'A ladder slides down a wall. The relationship between x (base distance) and y (height) is:',
        options: [
          '$x + y = L$',
          '$xy = L$',
          '$x^2 + y^2 = L^2$',
          '$x^2 - y^2 = L^2$'
        ],
        correctAnswer: 2,
        explanation:
          'The Pythagorean theorem applies: $x^2 + y^2 = L^2$ where $L$ is the (constant) ladder length.'
      },
      {
        id: 'math203-q6-4',
        type: 'multiple_choice',
        prompt:
          'When differentiating $x^2 + y^2 = 25$ with respect to time $t$:',
        options: [
          '$2x + 2y = 0$',
          '$2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0$',
          '$x^2 \\frac{dx}{dt} + y^2 \\frac{dy}{dt} = 0$',
          '$\\frac{dx}{dt} + \\frac{dy}{dt} = 0$'
        ],
        correctAnswer: 1,
        explanation:
          'Apply the chain rule to each term: $\\frac{d}{dt}[x^2] = 2x\\frac{dx}{dt}$ and similarly for $y^2$. The constant 25 differentiates to 0.'
      }
    ]
  },
  {
    id: 'math203-quiz-7',
    subjectId: 'math203',
    topicId: 'math203-topic-7',
    title: 'Curve Sketching Quiz',
    questions: [
      {
        id: 'math203-q7-1',
        type: 'multiple_choice',
        prompt:
          'For $f(x) = \\frac{2x^2 + 1}{x^2 - 1}$, the horizontal asymptote is:',
        options: ['$y = 0$', '$y = 1$', '$y = 2$', 'There is no horizontal asymptote'],
        correctAnswer: 2,
        explanation:
          'When degrees of numerator and denominator are equal, the horizontal asymptote is the ratio of leading coefficients: $y = 2/1 = 2$.'
      },
      {
        id: 'math203-q7-2',
        type: 'true_false',
        prompt: 'If $f(-x) = -f(x)$, the function is symmetric about the y-axis.',
        correctAnswer: false,
        explanation:
          'False. $f(-x) = -f(x)$ means the function is odd, which gives symmetry about the origin. Symmetry about the y-axis requires $f(-x) = f(x)$ (even function).'
      },
      {
        id: 'math203-q7-3',
        type: 'multiple_choice',
        prompt: 'A function has a vertical asymptote at $x = a$ when:',
        options: [
          '$f(a) = 0$',
          '$\\lim_{x \\to a} f(x) = \\pm\\infty$',
          '$f\'(a) = 0$',
          '$\\lim_{x \\to \\infty} f(x) = a$'
        ],
        correctAnswer: 1,
        explanation:
          'A vertical asymptote occurs where the function approaches infinity. This typically happens where the denominator approaches zero but the numerator doesn\'t.'
      },
      {
        id: 'math203-q7-4',
        type: 'multiple_choice',
        prompt:
          'When $f\'(x) > 0$ and $f\'\'(x) > 0$, the graph is:',
        options: [
          'Increasing and concave up',
          'Increasing and concave down',
          'Decreasing and concave up',
          'Decreasing and concave down'
        ],
        correctAnswer: 0,
        explanation:
          '$f\' > 0$ means increasing, $f\'\' > 0$ means concave up. The graph rises while curving upward (like the right side of a parabola opening up).'
      }
    ]
  }
];
