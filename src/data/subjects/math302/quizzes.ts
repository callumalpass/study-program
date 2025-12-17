import type { Quiz, QuizQuestion } from '../../../core/types';

const questions: QuizQuestion[] = [
  // Topic 1: First-Order DEs - Quiz 1 (Separable and Linear)
  {
    id: 'math302-q1',
    type: 'multiple_choice',
    prompt: 'Which of the following differential equations is separable?',
    options: [
      'dy/dx = xy',
      'dy/dx + y = x²',
      'dy/dx = x + y',
      'dy/dx + xy = x'
    ],
    correctAnswer: 'dy/dx = xy',
    explanation: 'A separable equation can be written as dy/dx = g(x)h(y). The equation dy/dx = xy separates as dy/y = x dx.'
  },
  {
    id: 'math302-q2',
    type: 'multiple_choice',
    prompt: 'Solve the separable equation dy/dx = 2xy with initial condition y(0) = 1.',
    options: [
      'y = e^(x²)',
      'y = e^(2x)',
      'y = x² + 1',
      'y = 2e^x'
    ],
    correctAnswer: 'y = e^(x²)',
    explanation: 'Separating variables: dy/y = 2x dx. Integrating: ln|y| = x² + C. With y(0) = 1, we get C = 0, so y = e^(x²).'
  },
  {
    id: 'math302-q3',
    type: 'multiple_choice',
    prompt: 'What is the integrating factor for the linear equation dy/dx + 2y = x?',
    options: [
      'e^(2x)',
      'e^(-2x)',
      '2e^x',
      'e^(x²)'
    ],
    correctAnswer: 'e^(2x)',
    explanation: 'For the standard form dy/dx + P(x)y = Q(x), the integrating factor is μ(x) = e^(∫P dx) = e^(∫2 dx) = e^(2x).'
  },
  {
    id: 'math302-q4',
    type: 'multiple_choice',
    prompt: 'The general solution of dy/dx + y = e^x is:',
    options: [
      'y = (x/2)e^x + Ce^(-x)',
      'y = xe^x + Ce^(-x)',
      'y = e^x + C',
      'y = (1/2)e^x + Ce^(-x)'
    ],
    correctAnswer: 'y = (x/2)e^x + Ce^(-x)',
    explanation: 'Using integrating factor e^x: d/dx(ye^x) = e^(2x). Integrating gives ye^x = (1/2)e^(2x) + C, so y = (x/2)e^x + Ce^(-x).'
  },
  {
    id: 'math302-q5',
    type: 'multiple_choice',
    prompt: 'Which method would you use first to solve dy/dx = (x² + y²)/xy?',
    options: [
      'Homogeneous substitution v = y/x',
      'Separation of variables',
      'Integrating factor',
      'Exact equation method'
    ],
    correctAnswer: 'Homogeneous substitution v = y/x',
    explanation: 'The equation can be written as dy/dx = x/y + y/x, which is homogeneous of degree 0. Use the substitution v = y/x.'
  },

  // Topic 1: First-Order DEs - Quiz 2 (Exact Equations)
  {
    id: 'math302-q6',
    type: 'multiple_choice',
    prompt: 'For M dx + N dy = 0 to be exact, what condition must hold?',
    options: [
      '∂M/∂y = ∂N/∂x',
      '∂M/∂x = ∂N/∂y',
      'M = N',
      '∂M/∂x + ∂N/∂y = 0'
    ],
    correctAnswer: '∂M/∂y = ∂N/∂x',
    explanation: 'An equation M dx + N dy = 0 is exact if and only if ∂M/∂y = ∂N/∂x. This ensures the existence of a potential function F(x,y).'
  },
  {
    id: 'math302-q7',
    type: 'multiple_choice',
    prompt: 'Is the equation (2xy + 3) dx + (x² - 1) dy = 0 exact?',
    options: [
      'Yes, because ∂M/∂y = ∂N/∂x = 2x',
      'No, because ∂M/∂y ≠ ∂N/∂x',
      'Yes, because M and N are polynomials',
      'Cannot determine without solving'
    ],
    correctAnswer: 'Yes, because ∂M/∂y = ∂N/∂x = 2x',
    explanation: 'M = 2xy + 3, so ∂M/∂y = 2x. N = x² - 1, so ∂N/∂x = 2x. Since they are equal, the equation is exact.'
  },
  {
    id: 'math302-q8',
    type: 'multiple_choice',
    prompt: 'If an equation is not exact but (1/N)(∂M/∂y - ∂N/∂x) depends only on x, what is the integrating factor?',
    options: [
      'μ(x) = e^(∫[(∂M/∂y - ∂N/∂x)/N] dx)',
      'μ(y) = e^(∫[(∂N/∂x - ∂M/∂y)/M] dy)',
      'μ(x) = e^(∫N dx)',
      'μ(y) = e^(∫M dy)'
    ],
    correctAnswer: 'μ(x) = e^(∫[(∂M/∂y - ∂N/∂x)/N] dx)',
    explanation: 'When (1/N)(∂M/∂y - ∂N/∂x) is a function of x only, the integrating factor μ(x) = exp(∫[(∂M/∂y - ∂N/∂x)/N] dx).'
  },
  {
    id: 'math302-q9',
    type: 'multiple_choice',
    prompt: 'For the exact equation 2x dx + 2y dy = 0, the implicit solution is:',
    options: [
      'x² + y² = C',
      'x² - y² = C',
      '2x² + 2y² = C',
      'xy = C'
    ],
    correctAnswer: 'x² + y² = C',
    explanation: 'Since ∂/∂x(x²) = 2x and ∂/∂y(y²) = 2y, the potential function is F(x,y) = x² + y², giving the solution x² + y² = C.'
  },
  {
    id: 'math302-q10',
    type: 'multiple_choice',
    prompt: 'What is the first step in solving an exact equation M dx + N dy = 0?',
    options: [
      'Find F such that ∂F/∂x = M and ∂F/∂y = N',
      'Separate variables',
      'Find an integrating factor',
      'Apply Laplace transform'
    ],
    correctAnswer: 'Find F such that ∂F/∂x = M and ∂F/∂y = N',
    explanation: 'For exact equations, we find the potential function F where ∂F/∂x = M and ∂F/∂y = N. The solution is then F(x,y) = C.'
  },

  // Topic 1: First-Order DEs - Quiz 3 (Existence and Uniqueness)
  {
    id: 'math302-q11',
    type: 'multiple_choice',
    prompt: 'The Picard-Lindelöf theorem (existence and uniqueness) requires that f and ∂f/∂y be:',
    options: [
      'Continuous in a region containing (x₀, y₀)',
      'Differentiable everywhere',
      'Polynomial functions',
      'Bounded for all x and y'
    ],
    correctAnswer: 'Continuous in a region containing (x₀, y₀)',
    explanation: 'The theorem states that if f(x,y) and ∂f/∂y are continuous in a rectangle containing (x₀, y₀), then the IVP has a unique solution.'
  },
  {
    id: 'math302-q12',
    type: 'multiple_choice',
    prompt: 'For the IVP dy/dx = y^(1/3), y(0) = 0, what can we conclude?',
    options: [
      'Solution exists but may not be unique',
      'Solution exists and is unique',
      'No solution exists',
      'Infinitely many solutions exist'
    ],
    correctAnswer: 'Solution exists but may not be unique',
    explanation: 'f(x,y) = y^(1/3) is continuous, but ∂f/∂y = (1/3)y^(-2/3) is not continuous at y = 0. Existence is guaranteed but not uniqueness.'
  },
  {
    id: 'math302-q13',
    type: 'multiple_choice',
    prompt: 'Which initial value problem is guaranteed to have a unique solution?',
    options: [
      'dy/dx = x² + y², y(0) = 1',
      'dy/dx = |y|^(1/2), y(0) = 0',
      'dy/dx = y^(2/3), y(0) = 0',
      'dy/dx = 1/y, y(0) = 0'
    ],
    correctAnswer: 'dy/dx = x² + y², y(0) = 1',
    explanation: 'For f(x,y) = x² + y², both f and ∂f/∂y = 2y are continuous everywhere, including at (0,1), guaranteeing a unique solution.'
  },
  {
    id: 'math302-q14',
    type: 'multiple_choice',
    prompt: 'A direction field (slope field) is useful for:',
    options: [
      'Visualizing solution behavior without solving',
      'Computing exact solutions',
      'Proving existence theorems',
      'Finding integrating factors'
    ],
    correctAnswer: 'Visualizing solution behavior without solving',
    explanation: 'Direction fields show small line segments with slopes given by dy/dx = f(x,y), allowing us to visualize solution curves qualitatively.'
  },
  {
    id: 'math302-q15',
    type: 'multiple_choice',
    prompt: 'An autonomous equation is one where:',
    options: [
      'f depends only on y, not x',
      'f depends only on x, not y',
      'f is constant',
      'f is linear'
    ],
    correctAnswer: 'f depends only on y, not x',
    explanation: 'An autonomous equation has the form dy/dx = f(y), where the right side depends only on y. These equations have important qualitative properties.'
  },

  // Topic 2: Second-Order Linear - Quiz 1 (Characteristic Equation)
  {
    id: 'math302-q16',
    type: 'multiple_choice',
    prompt: 'The characteristic equation for y″ - 5y′ + 6y = 0 is:',
    options: [
      'r² - 5r + 6 = 0',
      'r² + 5r + 6 = 0',
      'r² - 5r - 6 = 0',
      '5r² - 6r + 1 = 0'
    ],
    correctAnswer: 'r² - 5r + 6 = 0',
    explanation: 'For ay″ + by′ + cy = 0, the characteristic equation is ar² + br + c = 0. Here: r² - 5r + 6 = 0, giving r = 2, 3.'
  },
  {
    id: 'math302-q17',
    type: 'multiple_choice',
    prompt: 'If the characteristic equation has roots r = -2 ± 3i, the general solution is:',
    options: [
      'y = e^(-2x)(C₁cos(3x) + C₂sin(3x))',
      'y = C₁e^(-2x) + C₂e^(3x)',
      'y = e^(3x)(C₁cos(2x) + C₂sin(2x))',
      'y = C₁cos(3x) + C₂sin(3x)'
    ],
    correctAnswer: 'y = e^(-2x)(C₁cos(3x) + C₂sin(3x))',
    explanation: 'For complex roots α ± βi, the solution is y = e^(αx)(C₁cos(βx) + C₂sin(βx)). Here α = -2, β = 3.'
  },
  {
    id: 'math302-q18',
    type: 'multiple_choice',
    prompt: 'The general solution of y″ - 6y′ + 9y = 0 is:',
    options: [
      'y = (C₁ + C₂x)e^(3x)',
      'y = C₁e^(3x) + C₂e^(-3x)',
      'y = C₁cos(3x) + C₂sin(3x)',
      'y = C₁e^(3x) + C₂e^(9x)'
    ],
    correctAnswer: 'y = (C₁ + C₂x)e^(3x)',
    explanation: 'The characteristic equation r² - 6r + 9 = (r - 3)² = 0 has a repeated root r = 3. For repeated roots, y = (C₁ + C₂x)e^(rx).'
  },
  {
    id: 'math302-q19',
    type: 'multiple_choice',
    prompt: 'What type of behavior does y″ + 4y′ + 5y = 0 exhibit?',
    options: [
      'Damped oscillation',
      'Pure oscillation',
      'Exponential growth',
      'Overdamped decay'
    ],
    correctAnswer: 'Damped oscillation',
    explanation: 'Characteristic equation: r² + 4r + 5 = 0 gives r = -2 ± i. Complex roots with negative real part indicate damped oscillation.'
  },
  {
    id: 'math302-q20',
    type: 'multiple_choice',
    prompt: 'Which equation has solutions that grow without bound as x → ∞?',
    options: [
      'y″ - 4y = 0',
      'y″ + 4y = 0',
      'y″ + 4y′ + 4y = 0',
      'y″ + y′ + y = 0'
    ],
    correctAnswer: 'y″ - 4y = 0',
    explanation: 'Characteristic equation r² - 4 = 0 gives r = ±2. The positive root r = 2 produces an e^(2x) term that grows exponentially.'
  },

  // Topic 2: Second-Order Linear - Quiz 2 (Undetermined Coefficients)
  {
    id: 'math302-q21',
    type: 'multiple_choice',
    prompt: 'For y″ + 4y = 8x², what form should the particular solution take?',
    options: [
      'Ax² + Bx + C',
      'Ax²',
      'Ae^(2x)',
      'Acos(2x) + Bsin(2x)'
    ],
    correctAnswer: 'Ax² + Bx + C',
    explanation: 'For a polynomial forcing function of degree n, try a polynomial of the same degree. For 8x², use Ax² + Bx + C.'
  },
  {
    id: 'math302-q22',
    type: 'multiple_choice',
    prompt: 'For y″ - 3y′ = 6e^(3x), what particular solution form should you try?',
    options: [
      'Axe^(3x)',
      'Ae^(3x)',
      'Ax²e^(3x)',
      'Ae^(3x) + Bx'
    ],
    correctAnswer: 'Axe^(3x)',
    explanation: 'Since e^(3x) is a solution to the homogeneous equation (r = 0, 3), we multiply by x to get the particular solution form Axe^(3x).'
  },
  {
    id: 'math302-q23',
    type: 'multiple_choice',
    prompt: 'What particular solution form is appropriate for y″ + 9y = sin(3x)?',
    options: [
      'x(Acos(3x) + Bsin(3x))',
      'Acos(3x) + Bsin(3x)',
      'Asin(3x)',
      'Ae^(3x)'
    ],
    correctAnswer: 'x(Acos(3x) + Bsin(3x))',
    explanation: 'The characteristic equation r² + 9 = 0 gives r = ±3i, so sin(3x) is in the homogeneous solution. Multiply by x.'
  },
  {
    id: 'math302-q24',
    type: 'multiple_choice',
    prompt: 'For y″ + y = xe^x, the particular solution form is:',
    options: [
      '(Ax + B)e^x',
      'Axe^x',
      'Ae^x',
      'x²e^x'
    ],
    correctAnswer: '(Ax + B)e^x',
    explanation: 'For a product of polynomial and exponential, use (polynomial of same degree) × exponential. For xe^x, try (Ax + B)e^x.'
  },
  {
    id: 'math302-q25',
    type: 'multiple_choice',
    prompt: 'The method of undetermined coefficients works when the forcing function is:',
    options: [
      'A combination of polynomials, exponentials, sines, and cosines',
      'Any continuous function',
      'Only polynomial functions',
      'Any differentiable function'
    ],
    correctAnswer: 'A combination of polynomials, exponentials, sines, and cosines',
    explanation: 'Undetermined coefficients applies to forcing functions that are linear combinations of polynomials, e^(ax), cos(bx), and sin(bx).'
  },

  // Topic 2: Second-Order Linear - Quiz 3 (Variation of Parameters)
  {
    id: 'math302-q26',
    type: 'multiple_choice',
    prompt: 'Variation of parameters is useful when:',
    options: [
      'Undetermined coefficients doesn\'t apply',
      'The equation has constant coefficients',
      'The forcing function is polynomial',
      'The equation is homogeneous'
    ],
    correctAnswer: 'Undetermined coefficients doesn\'t apply',
    explanation: 'Variation of parameters works for any continuous forcing function, making it more general than undetermined coefficients.'
  },
  {
    id: 'math302-q27',
    type: 'multiple_choice',
    prompt: 'For y″ + P(x)y′ + Q(x)y = f(x) with solutions y₁, y₂ to the homogeneous equation, the Wronskian is:',
    options: [
      'W = y₁y₂′ - y₁′y₂',
      'W = y₁y₂',
      'W = y₁′y₂′',
      'W = y₁ + y₂'
    ],
    correctAnswer: 'W = y₁y₂′ - y₁′y₂',
    explanation: 'The Wronskian is defined as W(y₁, y₂) = y₁y₂′ - y₁′y₂. It determines if solutions are linearly independent (W ≠ 0).'
  },
  {
    id: 'math302-q28',
    type: 'multiple_choice',
    prompt: 'In variation of parameters, if y_h = C₁y₁ + C₂y₂, the particular solution is:',
    options: [
      'y_p = u₁y₁ + u₂y₂ where u₁ and u₂ are functions',
      'y_p = Ay₁ + By₂ where A and B are constants',
      'y_p = y₁ + y₂',
      'y_p = xy₁ + xy₂'
    ],
    correctAnswer: 'y_p = u₁y₁ + u₂y₂ where u₁ and u₂ are functions',
    explanation: 'Variation of parameters replaces constants C₁, C₂ with functions u₁(x), u₂(x), giving y_p = u₁y₁ + u₂y₂.'
  },
  {
    id: 'math302-q29',
    type: 'multiple_choice',
    prompt: 'For variation of parameters, u₁′ is given by:',
    options: [
      'u₁′ = -y₂f/W',
      'u₁′ = y₁f/W',
      'u₁′ = f/W',
      'u₁′ = -y₁f/W'
    ],
    correctAnswer: 'u₁′ = -y₂f/W',
    explanation: 'The formulas for variation of parameters are u₁′ = -y₂f/W and u₂′ = y₁f/W, where W is the Wronskian.'
  },
  {
    id: 'math302-q30',
    type: 'multiple_choice',
    prompt: 'If W(y₁, y₂) = 0 for all x, then y₁ and y₂ are:',
    options: [
      'Linearly dependent',
      'Linearly independent',
      'Orthogonal',
      'Equal'
    ],
    correctAnswer: 'Linearly dependent',
    explanation: 'When the Wronskian is zero everywhere, the solutions are linearly dependent, meaning one is a constant multiple of the other.'
  },

  // Topic 3: Higher-Order Linear - Quiz 1 (Operator Methods)
  {
    id: 'math302-q31',
    type: 'multiple_choice',
    prompt: 'The differential operator D is defined as:',
    options: [
      'D = d/dx',
      'D = ∫ dx',
      'D = x d/dx',
      'D = d²/dx²'
    ],
    correctAnswer: 'D = d/dx',
    explanation: 'The differential operator D represents differentiation: Dy = dy/dx, D²y = d²y/dx², etc.'
  },
  {
    id: 'math302-q32',
    type: 'multiple_choice',
    prompt: 'The equation (D² - 3D + 2)y = 0 factors as:',
    options: [
      '(D - 1)(D - 2)y = 0',
      '(D + 1)(D + 2)y = 0',
      '(D - 2)(D + 1)y = 0',
      'D(D - 3)y = 0'
    ],
    correctAnswer: '(D - 1)(D - 2)y = 0',
    explanation: 'The operator D² - 3D + 2 factors like a polynomial: (D - 1)(D - 2). This gives characteristic roots r = 1, 2.'
  },
  {
    id: 'math302-q33',
    type: 'multiple_choice',
    prompt: 'For a third-order equation y‴ + 6y″ + 11y′ + 6y = 0, how many linearly independent solutions exist?',
    options: [
      '3',
      '2',
      '6',
      '1'
    ],
    correctAnswer: '3',
    explanation: 'An nth-order linear homogeneous equation has exactly n linearly independent solutions. For third-order, n = 3.'
  },
  {
    id: 'math302-q34',
    type: 'multiple_choice',
    prompt: 'If the characteristic equation has roots 1, 2, 2, 2, the general solution contains:',
    options: [
      'e^x, e^(2x), xe^(2x), x²e^(2x)',
      'e^x, e^(2x), e^(3x), e^(4x)',
      'e^x, 2e^(2x), 3e^(2x), 4e^(2x)',
      'e^x, e^(2x), e^(4x)'
    ],
    correctAnswer: 'e^x, e^(2x), xe^(2x), x²e^(2x)',
    explanation: 'A root of multiplicity k contributes solutions e^(rx), xe^(rx), ..., x^(k-1)e^(rx). Root 1: e^x. Root 2 (multiplicity 3): e^(2x), xe^(2x), x²e^(2x).'
  },
  {
    id: 'math302-q35',
    type: 'multiple_choice',
    prompt: 'The annihilator of e^(3x) is:',
    options: [
      'D - 3',
      'D + 3',
      'D² - 9',
      'D³'
    ],
    correctAnswer: 'D - 3',
    explanation: 'An annihilator L is an operator such that L[f] = 0. Since (D - 3)e^(3x) = 3e^(3x) - 3e^(3x) = 0, the annihilator is D - 3.'
  },

  // Topic 3: Higher-Order Linear - Quiz 2 (Cauchy-Euler)
  {
    id: 'math302-q36',
    type: 'multiple_choice',
    prompt: 'A Cauchy-Euler equation has the form:',
    options: [
      'x²y″ + axy′ + by = 0',
      'y″ + axy′ + by = 0',
      'y″ + ay′ + bxy = 0',
      'x²y″ + xy′ + y = x'
    ],
    correctAnswer: 'x²y″ + axy′ + by = 0',
    explanation: 'Cauchy-Euler equations have the form x²y″ + axy′ + by = 0, where the power of x matches the order of derivative.'
  },
  {
    id: 'math302-q37',
    type: 'multiple_choice',
    prompt: 'For Cauchy-Euler equations, we try solutions of the form:',
    options: [
      'y = x^r',
      'y = e^(rx)',
      'y = r^x',
      'y = ln(x)'
    ],
    correctAnswer: 'y = x^r',
    explanation: 'For Cauchy-Euler equations, we substitute y = x^r to obtain an algebraic equation (indicial equation) for r.'
  },
  {
    id: 'math302-q38',
    type: 'multiple_choice',
    prompt: 'The indicial equation for x²y″ - 2xy′ + 2y = 0 is:',
    options: [
      'r² - 3r + 2 = 0',
      'r² - 2r + 2 = 0',
      'r² + 2r - 2 = 0',
      'r² - r + 2 = 0'
    ],
    correctAnswer: 'r² - 3r + 2 = 0',
    explanation: 'Substituting y = x^r gives r(r-1) - 2r + 2 = 0, which simplifies to r² - 3r + 2 = 0, giving r = 1, 2.'
  },
  {
    id: 'math302-q39',
    type: 'multiple_choice',
    prompt: 'If the indicial equation has a repeated root r, the second solution is:',
    options: [
      'x^r ln(x)',
      'x^(r+1)',
      'x^r e^x',
      'rx^(r-1)'
    ],
    correctAnswer: 'x^r ln(x)',
    explanation: 'For a repeated root r in a Cauchy-Euler equation, the solutions are y₁ = x^r and y₂ = x^r ln(x).'
  },
  {
    id: 'math302-q40',
    type: 'multiple_choice',
    prompt: 'If the indicial equation has complex roots α ± βi, the solutions are:',
    options: [
      'x^α cos(β ln x) and x^α sin(β ln x)',
      'x^α cos(βx) and x^α sin(βx)',
      'e^(αx) cos(β ln x) and e^(αx) sin(β ln x)',
      'x^α e^(βx) and x^α e^(-βx)'
    ],
    correctAnswer: 'x^α cos(β ln x) and x^α sin(β ln x)',
    explanation: 'For complex roots α ± βi in Cauchy-Euler equations, the real solutions are x^α cos(β ln x) and x^α sin(β ln x).'
  },

  // Topic 3: Higher-Order Linear - Quiz 3 (Advanced Topics)
  {
    id: 'math302-q41',
    type: 'multiple_choice',
    prompt: 'Reduction of order is used when:',
    options: [
      'One solution to the homogeneous equation is known',
      'The equation has constant coefficients',
      'The forcing function is zero',
      'All solutions are known'
    ],
    correctAnswer: 'One solution to the homogeneous equation is known',
    explanation: 'Reduction of order finds a second independent solution y₂ when one solution y₁ is already known, using the substitution y₂ = vy₁.'
  },
  {
    id: 'math302-q42',
    type: 'multiple_choice',
    prompt: 'For y″ + P(x)y′ + Q(x)y = 0 with known solution y₁, the substitution y = vy₁ leads to:',
    options: [
      'A first-order equation in v′',
      'A second-order equation in v',
      'An algebraic equation in v',
      'A separable equation in v'
    ],
    correctAnswer: 'A first-order equation in v′',
    explanation: 'Substituting y = vy₁ and simplifying gives a first-order linear equation in w = v′, which can be solved by integration.'
  },
  {
    id: 'math302-q43',
    type: 'multiple_choice',
    prompt: 'The general nth-order linear homogeneous equation requires:',
    options: [
      'n linearly independent solutions',
      '2n solutions',
      'n + 1 solutions',
      '1 solution'
    ],
    correctAnswer: 'n linearly independent solutions',
    explanation: 'The solution space of an nth-order linear homogeneous equation is n-dimensional, requiring n linearly independent solutions.'
  },
  {
    id: 'math302-q44',
    type: 'multiple_choice',
    prompt: 'Abel\'s formula for the Wronskian W of an equation y″ + P(x)y′ + Q(x)y = 0 is:',
    options: [
      'W = Ce^(-∫P dx)',
      'W = Ce^(∫P dx)',
      'W = Ce^(-∫Q dx)',
      'W = Ce^(Px)'
    ],
    correctAnswer: 'W = Ce^(-∫P dx)',
    explanation: 'Abel\'s formula states that W(x) = Ce^(-∫P(x)dx), showing the Wronskian either is always zero or never zero.'
  },
  {
    id: 'math302-q45',
    type: 'multiple_choice',
    prompt: 'For the equation y⁽⁴⁾ - y = 0, how many distinct characteristic roots are there?',
    options: [
      '4',
      '2',
      '1',
      '3'
    ],
    correctAnswer: '4',
    explanation: 'The characteristic equation r⁴ - 1 = 0 factors as (r² - 1)(r² + 1) = 0, giving r = ±1, ±i (four distinct roots).'
  },

  // Topic 4: Systems of DEs - Quiz 1 (Eigenvalue Method)
  {
    id: 'math302-q46',
    type: 'multiple_choice',
    prompt: 'A linear system X′ = AX has the form:',
    options: [
      'X′ = AX where X is a vector and A is a matrix',
      'X′ = AX + B where X and B are vectors',
      'dx/dt = ax + by, dy/dt = cx + dy',
      'Both the first and third options'
    ],
    correctAnswer: 'Both the first and third options',
    explanation: 'X′ = AX is vector notation for a system. For 2D: dx/dt = ax + by, dy/dt = cx + dy, where A = [[a,b],[c,d]].'
  },
  {
    id: 'math302-q47',
    type: 'multiple_choice',
    prompt: 'For X′ = AX, if λ is an eigenvalue with eigenvector v, then a solution is:',
    options: [
      'X = ve^(λt)',
      'X = λe^(vt)',
      'X = e^(λt)',
      'X = v + λt'
    ],
    correctAnswer: 'X = ve^(λt)',
    explanation: 'Each eigenvalue-eigenvector pair (λ, v) generates a solution X = ve^(λt) to the system X′ = AX.'
  },
  {
    id: 'math302-q48',
    type: 'multiple_choice',
    prompt: 'If A has eigenvalues λ₁ = -2, λ₂ = -3 with eigenvectors v₁, v₂, the general solution is:',
    options: [
      'X = c₁v₁e^(-2t) + c₂v₂e^(-3t)',
      'X = c₁v₁e^(2t) + c₂v₂e^(3t)',
      'X = (c₁v₁ + c₂v₂)e^(-2t)',
      'X = c₁e^(-2t) + c₂e^(-3t)'
    ],
    correctAnswer: 'X = c₁v₁e^(-2t) + c₂v₂e^(-3t)',
    explanation: 'The general solution is a linear combination of all fundamental solutions: X = c₁v₁e^(λ₁t) + c₂v₂e^(λ₂t).'
  },
  {
    id: 'math302-q49',
    type: 'multiple_choice',
    prompt: 'For complex eigenvalues λ = α ± βi, the solutions involve:',
    options: [
      'e^(αt)cos(βt) and e^(αt)sin(βt)',
      'e^(αt) and e^(βt)',
      'cos(αt) and sin(βt)',
      'e^(βt)cos(αt) and e^(βt)sin(αt)'
    ],
    correctAnswer: 'e^(αt)cos(βt) and e^(αt)sin(βt)',
    explanation: 'Complex eigenvalues α ± βi give oscillatory solutions with exponential factor: e^(αt)cos(βt) and e^(αt)sin(βt).'
  },
  {
    id: 'math302-q50',
    type: 'multiple_choice',
    prompt: 'An equilibrium point (critical point) of X′ = AX occurs at:',
    options: [
      'X = 0',
      'X = A',
      'X = 1',
      'AX = 1'
    ],
    correctAnswer: 'X = 0',
    explanation: 'Equilibrium points satisfy X′ = 0. For X′ = AX, this gives AX = 0, so X = 0 (assuming A is non-singular).'
  },

  // Topic 4: Systems of DEs - Quiz 2 (Phase Portraits)
  {
    id: 'math302-q51',
    type: 'multiple_choice',
    prompt: 'A node (stable or unstable) occurs when eigenvalues are:',
    options: [
      'Real with the same sign',
      'Real with opposite signs',
      'Complex conjugates',
      'Zero'
    ],
    correctAnswer: 'Real with the same sign',
    explanation: 'A node occurs when both eigenvalues are real and have the same sign (both negative: stable node; both positive: unstable node).'
  },
  {
    id: 'math302-q52',
    type: 'multiple_choice',
    prompt: 'A saddle point occurs when eigenvalues are:',
    options: [
      'Real with opposite signs',
      'Real with the same sign',
      'Complex conjugates',
      'Both zero'
    ],
    correctAnswer: 'Real with opposite signs',
    explanation: 'A saddle point (unstable) occurs when eigenvalues are real with opposite signs (one positive, one negative).'
  },
  {
    id: 'math302-q53',
    type: 'multiple_choice',
    prompt: 'A spiral (stable or unstable) occurs when eigenvalues are:',
    options: [
      'Complex with non-zero real part',
      'Pure imaginary',
      'Real and distinct',
      'Real and equal'
    ],
    correctAnswer: 'Complex with non-zero real part',
    explanation: 'Spiral behavior occurs with complex eigenvalues α ± βi where α ≠ 0. Stable if α < 0, unstable if α > 0.'
  },
  {
    id: 'math302-q54',
    type: 'multiple_choice',
    prompt: 'A center occurs when eigenvalues are:',
    options: [
      'Pure imaginary (±βi)',
      'Real and negative',
      'Real and positive',
      'Complex with negative real part'
    ],
    correctAnswer: 'Pure imaginary (±βi)',
    explanation: 'A center (neutrally stable) occurs when eigenvalues are pure imaginary λ = ±βi, producing periodic orbits.'
  },
  {
    id: 'math302-q55',
    type: 'multiple_choice',
    prompt: 'The trace and determinant of matrix A = [[a,b],[c,d]] are:',
    options: [
      'tr(A) = a + d, det(A) = ad - bc',
      'tr(A) = ad, det(A) = a + d',
      'tr(A) = a - d, det(A) = ad + bc',
      'tr(A) = ac + bd, det(A) = ad - bc'
    ],
    correctAnswer: 'tr(A) = a + d, det(A) = ad - bc',
    explanation: 'For 2×2 matrix A, trace = sum of diagonal elements = a + d, determinant = ad - bc. These relate to eigenvalues.'
  },

  // Topic 4: Systems of DEs - Quiz 3 (Advanced Systems)
  {
    id: 'math302-q56',
    type: 'multiple_choice',
    prompt: 'For a repeated eigenvalue λ with only one eigenvector v, the second solution is:',
    options: [
      'X = (vt + w)e^(λt) where (A - λI)w = v',
      'X = ve^(2λt)',
      'X = tv e^(λt)',
      'X = we^(λt) for any vector w'
    ],
    correctAnswer: 'X = (vt + w)e^(λt) where (A - λI)w = v',
    explanation: 'For a defective eigenvalue, the second solution has form X = (vt + w)e^(λt) where w is a generalized eigenvector.'
  },
  {
    id: 'math302-q57',
    type: 'multiple_choice',
    prompt: 'The fundamental matrix Φ(t) for X′ = AX satisfies:',
    options: [
      'Φ′ = AΦ and Φ(0) = I',
      'Φ′ = Φ + A',
      'Φ = e^(At)',
      'Both the first and third options'
    ],
    correctAnswer: 'Both the first and third options',
    explanation: 'The fundamental matrix satisfies Φ′ = AΦ with Φ(0) = I. It equals the matrix exponential: Φ(t) = e^(At).'
  },
  {
    id: 'math302-q58',
    type: 'multiple_choice',
    prompt: 'For a nonhomogeneous system X′ = AX + F(t), the general solution is:',
    options: [
      'X = X_h + X_p',
      'X = X_h',
      'X = X_p',
      'X = AX + F'
    ],
    correctAnswer: 'X = X_h + X_p',
    explanation: 'Like scalar equations, the solution to a nonhomogeneous system is the sum of homogeneous solution X_h and particular solution X_p.'
  },
  {
    id: 'math302-q59',
    type: 'multiple_choice',
    prompt: 'Variation of parameters for systems gives X_p as:',
    options: [
      'X_p = Φ(t)∫Φ^(-1)(t)F(t) dt',
      'X_p = ∫F(t) dt',
      'X_p = Φ(t)F(t)',
      'X_p = A^(-1)F(t)'
    ],
    correctAnswer: 'X_p = Φ(t)∫Φ^(-1)(t)F(t) dt',
    explanation: 'The particular solution by variation of parameters is X_p = Φ(t)∫Φ^(-1)(s)F(s) ds, where Φ is the fundamental matrix.'
  },
  {
    id: 'math302-q60',
    type: 'multiple_choice',
    prompt: 'A Lyapunov function V(X) is useful for:',
    options: [
      'Determining stability without solving',
      'Finding exact solutions',
      'Computing eigenvalues',
      'Calculating the Wronskian'
    ],
    correctAnswer: 'Determining stability without solving',
    explanation: 'A Lyapunov function is a scalar function V(X) that helps prove stability of equilibrium points without explicitly solving the system.'
  },

  // Topic 5: Laplace Transforms - Quiz 1 (Definition and Properties)
  {
    id: 'math302-q61',
    type: 'multiple_choice',
    prompt: 'The Laplace transform of f(t) is defined as:',
    options: [
      'L{f(t)} = ∫₀^∞ e^(-st)f(t) dt',
      'L{f(t)} = ∫₋∞^∞ e^(-st)f(t) dt',
      'L{f(t)} = ∫₀^∞ e^(st)f(t) dt',
      'L{f(t)} = d/dt[f(t)]'
    ],
    correctAnswer: 'L{f(t)} = ∫₀^∞ e^(-st)f(t) dt',
    explanation: 'The Laplace transform is L{f(t)} = F(s) = ∫₀^∞ e^(-st)f(t) dt, converting a function of t to a function of s.'
  },
  {
    id: 'math302-q62',
    type: 'multiple_choice',
    prompt: 'What is L{e^(at)}?',
    options: [
      '1/(s - a) for s > a',
      '1/(s + a) for s > -a',
      'a/(s - a)',
      'e^(a/s)'
    ],
    correctAnswer: '1/(s - a) for s > a',
    explanation: 'L{e^(at)} = ∫₀^∞ e^(-st)e^(at) dt = ∫₀^∞ e^(-(s-a)t) dt = 1/(s-a) for s > a.'
  },
  {
    id: 'math302-q63',
    type: 'multiple_choice',
    prompt: 'The first translation theorem states L{e^(at)f(t)} =',
    options: [
      'F(s - a)',
      'F(s + a)',
      'e^a F(s)',
      'F(s)/a'
    ],
    correctAnswer: 'F(s - a)',
    explanation: 'The first translation (shifting) theorem: L{e^(at)f(t)} = F(s-a), where F(s) = L{f(t)}. This shifts in the s-domain.'
  },
  {
    id: 'math302-q64',
    type: 'multiple_choice',
    prompt: 'What is L{f′(t)}?',
    options: [
      'sF(s) - f(0)',
      'F′(s)',
      'sF(s)',
      '1/s F(s)'
    ],
    correctAnswer: 'sF(s) - f(0)',
    explanation: 'The transform of the derivative: L{f′(t)} = sF(s) - f(0). This property makes Laplace transforms useful for solving DEs.'
  },
  {
    id: 'math302-q65',
    type: 'multiple_choice',
    prompt: 'What is L{f″(t)}?',
    options: [
      's²F(s) - sf(0) - f′(0)',
      's²F(s) - f(0)',
      'F″(s)',
      'sF(s) - f(0)'
    ],
    correctAnswer: 's²F(s) - sf(0) - f′(0)',
    explanation: 'L{f″(t)} = s²F(s) - sf(0) - f′(0). This incorporates initial conditions, making it ideal for IVPs.'
  },

  // Topic 5: Laplace Transforms - Quiz 2 (Inverse Transform)
  {
    id: 'math302-q66',
    type: 'multiple_choice',
    prompt: 'What is L^(-1){1/s²}?',
    options: [
      't',
      '1',
      't²/2',
      'e^t'
    ],
    correctAnswer: 't',
    explanation: 'Since L{t^n} = n!/s^(n+1), we have L{t} = 1/s², so L^(-1){1/s²} = t.'
  },
  {
    id: 'math302-q67',
    type: 'multiple_choice',
    prompt: 'To find L^(-1){1/(s² + 4)}, recognize it as:',
    options: [
      '(1/2)sin(2t)',
      'sin(4t)',
      'cos(2t)',
      'e^(-2t)'
    ],
    correctAnswer: '(1/2)sin(2t)',
    explanation: 'Since L{sin(at)} = a/(s² + a²), we have L{sin(2t)} = 2/(s² + 4), so L^(-1){1/(s² + 4)} = (1/2)sin(2t).'
  },
  {
    id: 'math302-q68',
    type: 'multiple_choice',
    prompt: 'Partial fractions are used when:',
    options: [
      'F(s) is a rational function with denominator degree > numerator',
      'F(s) is exponential',
      'F(s) is trigonometric',
      'F(s) has no inverse'
    ],
    correctAnswer: 'F(s) is a rational function with denominator degree > numerator',
    explanation: 'Partial fraction decomposition breaks down rational functions into simpler terms whose inverse transforms are known.'
  },
  {
    id: 'math302-q69',
    type: 'multiple_choice',
    prompt: 'What is L^(-1){1/((s-2)(s-3))}?',
    options: [
      'e^(3t) - e^(2t)',
      'e^(2t) - e^(3t)',
      'e^(5t)',
      '1/(e^(2t) + e^(3t))'
    ],
    correctAnswer: 'e^(3t) - e^(2t)',
    explanation: 'Using partial fractions: 1/((s-2)(s-3)) = -1/(s-2) + 1/(s-3). Taking inverse: -e^(2t) + e^(3t) = e^(3t) - e^(2t).'
  },
  {
    id: 'math302-q70',
    type: 'multiple_choice',
    prompt: 'The second translation theorem (shift in t) states L{u_c(t)f(t-c)} =',
    options: [
      'e^(-cs)F(s)',
      'e^(cs)F(s)',
      'F(s - c)',
      'F(s + c)'
    ],
    correctAnswer: 'e^(-cs)F(s)',
    explanation: 'The second translation theorem: L{u_c(t)f(t-c)} = e^(-cs)F(s), where u_c is the unit step function at t = c.'
  },

  // Topic 5: Laplace Transforms - Quiz 3 (Solving IVPs)
  {
    id: 'math302-q71',
    type: 'multiple_choice',
    prompt: 'To solve y″ + 4y = 0, y(0) = 1, y′(0) = 0 using Laplace transforms, first:',
    options: [
      'Take L of both sides: s²Y - s - 0 + 4Y = 0',
      'Find the characteristic equation',
      'Use undetermined coefficients',
      'Integrate both sides'
    ],
    correctAnswer: 'Take L of both sides: s²Y - s - 0 + 4Y = 0',
    explanation: 'Apply Laplace transform to both sides: L{y″} + 4L{y} = 0 becomes (s²Y - sy(0) - y′(0)) + 4Y = 0.'
  },
  {
    id: 'math302-q72',
    type: 'multiple_choice',
    prompt: 'For the transform Y(s) = s/(s² + 4) from the previous problem, y(t) is:',
    options: [
      'cos(2t)',
      'sin(2t)',
      'e^(2t)',
      '(1/2)cos(2t)'
    ],
    correctAnswer: 'cos(2t)',
    explanation: 'Since L{cos(at)} = s/(s² + a²), we have Y(s) = s/(s² + 4) = L{cos(2t)}, so y(t) = cos(2t).'
  },
  {
    id: 'math302-q73',
    type: 'multiple_choice',
    prompt: 'The convolution theorem states L{f * g} =',
    options: [
      'F(s)G(s)',
      'F(s) + G(s)',
      'F(s)/G(s)',
      '∫f(t)g(t) dt'
    ],
    correctAnswer: 'F(s)G(s)',
    explanation: 'The convolution theorem: L{(f * g)(t)} = F(s)G(s), where (f * g)(t) = ∫₀^t f(τ)g(t-τ) dτ.'
  },
  {
    id: 'math302-q74',
    type: 'multiple_choice',
    prompt: 'The unit step function u_c(t) equals:',
    options: [
      '0 for t < c, 1 for t ≥ c',
      '1 for t < c, 0 for t ≥ c',
      'c for all t',
      '1 for all t'
    ],
    correctAnswer: '0 for t < c, 1 for t ≥ c',
    explanation: 'The unit step (Heaviside) function u_c(t) = 0 for t < c and u_c(t) = 1 for t ≥ c. It "turns on" at t = c.'
  },
  {
    id: 'math302-q75',
    type: 'multiple_choice',
    prompt: 'The Dirac delta function δ(t - c) satisfies:',
    options: [
      '∫₋∞^∞ δ(t-c)f(t) dt = f(c)',
      'δ(t-c) = 0 everywhere',
      'δ(t-c) = 1 at t = c',
      '∫δ(t-c) dt = 0'
    ],
    correctAnswer: '∫₋∞^∞ δ(t-c)f(t) dt = f(c)',
    explanation: 'The Dirac delta satisfies the sifting property: ∫δ(t-c)f(t) dt = f(c). Also, L{δ(t-c)} = e^(-cs).'
  },

  // Topic 6: Series Solutions - Quiz 1 (Power Series)
  {
    id: 'math302-q76',
    type: 'multiple_choice',
    prompt: 'A power series solution has the form:',
    options: [
      'y = Σ(n=0 to ∞) a_n x^n',
      'y = e^x',
      'y = sin(x)',
      'y = a₀ + a₁x'
    ],
    correctAnswer: 'y = Σ(n=0 to ∞) a_n x^n',
    explanation: 'A power series solution is an infinite series y = Σa_n x^n, where coefficients a_n are determined by the differential equation.'
  },
  {
    id: 'math302-q77',
    type: 'multiple_choice',
    prompt: 'A point x₀ is an ordinary point of y″ + P(x)y′ + Q(x)y = 0 if:',
    options: [
      'P(x) and Q(x) are analytic at x₀',
      'P(x₀) = Q(x₀) = 0',
      'P(x) and Q(x) are undefined at x₀',
      'The equation has no solution at x₀'
    ],
    correctAnswer: 'P(x) and Q(x) are analytic at x₀',
    explanation: 'x₀ is ordinary if P(x) and Q(x) are analytic (have convergent power series) at x₀. Otherwise, it\'s a singular point.'
  },
  {
    id: 'math302-q78',
    type: 'multiple_choice',
    prompt: 'For a series solution y = Σa_n x^n, y′ equals:',
    options: [
      'Σ(n=1 to ∞) na_n x^(n-1)',
      'Σ(n=0 to ∞) na_n x^n',
      'Σ(n=0 to ∞) a_n x^(n-1)',
      'Σ(n=0 to ∞) (n+1)a_n x^n'
    ],
    correctAnswer: 'Σ(n=1 to ∞) na_n x^(n-1)',
    explanation: 'Differentiating term by term: y′ = Σna_n x^(n-1), starting from n=1 since the n=0 term has zero derivative.'
  },
  {
    id: 'math302-q79',
    type: 'multiple_choice',
    prompt: 'When substituting a series into a DE, we typically:',
    options: [
      'Shift indices to align powers of x',
      'Integrate each term',
      'Set x = 0',
      'Use L\'Hôpital\'s rule'
    ],
    correctAnswer: 'Shift indices to align powers of x',
    explanation: 'To combine series, we shift indices so all terms have the same power x^k, then equate coefficients to find recurrence relations.'
  },
  {
    id: 'math302-q80',
    type: 'multiple_choice',
    prompt: 'A recurrence relation determines:',
    options: [
      'Coefficients a_n in terms of previous coefficients',
      'The exact solution immediately',
      'The radius of convergence',
      'The singular points'
    ],
    correctAnswer: 'Coefficients a_n in terms of previous coefficients',
    explanation: 'Equating coefficients of like powers gives a recurrence relation, expressing a_n in terms of a_(n-1), a_(n-2), etc.'
  },

  // Topic 6: Series Solutions - Quiz 2 (Frobenius Method)
  {
    id: 'math302-q81',
    type: 'multiple_choice',
    prompt: 'The Frobenius method is used near:',
    options: [
      'A regular singular point',
      'An ordinary point',
      'An irregular singular point',
      'Any point'
    ],
    correctAnswer: 'A regular singular point',
    explanation: 'The Frobenius method finds series solutions near regular singular points, using the form y = x^r Σa_n x^n.'
  },
  {
    id: 'math302-q82',
    type: 'multiple_choice',
    prompt: 'In the Frobenius method, we assume a solution of the form:',
    options: [
      'y = x^r Σ(n=0 to ∞) a_n x^n with a₀ ≠ 0',
      'y = Σ(n=0 to ∞) a_n x^n',
      'y = e^(rx)',
      'y = r^x'
    ],
    correctAnswer: 'y = x^r Σ(n=0 to ∞) a_n x^n with a₀ ≠ 0',
    explanation: 'Frobenius method assumes y = x^r Σa_n x^n = Σa_n x^(n+r), where r is determined by the indicial equation.'
  },
  {
    id: 'math302-q83',
    type: 'multiple_choice',
    prompt: 'The indicial equation determines:',
    options: [
      'The exponent r in the Frobenius solution',
      'All coefficients a_n',
      'The radius of convergence',
      'Whether the point is singular'
    ],
    correctAnswer: 'The exponent r in the Frobenius solution',
    explanation: 'The indicial equation, obtained from the lowest power of x, determines the possible values of r in y = x^r Σa_n x^n.'
  },
  {
    id: 'math302-q84',
    type: 'multiple_choice',
    prompt: 'If the indicial equation has roots r₁ and r₂ with r₁ - r₂ = integer, then:',
    options: [
      'The second solution may involve logarithms',
      'Both solutions are power series',
      'No solution exists',
      'The solutions are identical'
    ],
    correctAnswer: 'The second solution may involve logarithms',
    explanation: 'When roots differ by an integer, the second solution may contain logarithmic terms: y₂ = y₁ ln(x) + x^r₂ Σb_n x^n.'
  },
  {
    id: 'math302-q85',
    type: 'multiple_choice',
    prompt: 'A point x₀ is a regular singular point if:',
    options: [
      '(x-x₀)P(x) and (x-x₀)²Q(x) are analytic at x₀',
      'P(x) and Q(x) are analytic at x₀',
      'P(x₀) = ∞',
      'The equation has no solution at x₀'
    ],
    correctAnswer: '(x-x₀)P(x) and (x-x₀)²Q(x) are analytic at x₀',
    explanation: 'x₀ is regular singular if (x-x₀)P(x) and (x-x₀)²Q(x) are analytic at x₀. Otherwise, it\'s irregular singular.'
  },

  // Topic 6: Series Solutions - Quiz 3 (Special Functions)
  {
    id: 'math302-q86',
    type: 'multiple_choice',
    prompt: 'Bessel\'s equation of order ν is:',
    options: [
      'x²y″ + xy′ + (x² - ν²)y = 0',
      'y″ + xy′ + y = 0',
      'x²y″ - 2xy′ + 2y = 0',
      '(1 - x²)y″ - 2xy′ + ν(ν+1)y = 0'
    ],
    correctAnswer: 'x²y″ + xy′ + (x² - ν²)y = 0',
    explanation: 'Bessel\'s equation is x²y″ + xy′ + (x² - ν²)y = 0. It has regular singular point at x = 0 and arises in cylindrical coordinate problems.'
  },
  {
    id: 'math302-q87',
    type: 'multiple_choice',
    prompt: 'The Bessel function of the first kind J_ν(x) is:',
    options: [
      'A series solution to Bessel\'s equation',
      'A polynomial',
      'An exponential function',
      'Always zero at x = 0'
    ],
    correctAnswer: 'A series solution to Bessel\'s equation',
    explanation: 'J_ν(x) is a fundamental solution to Bessel\'s equation, given by a power series. For integer ν, it\'s bounded at x = 0.'
  },
  {
    id: 'math302-q88',
    type: 'multiple_choice',
    prompt: 'Legendre\'s equation is:',
    options: [
      '(1 - x²)y″ - 2xy′ + n(n+1)y = 0',
      'x²y″ + xy′ + (x² - n²)y = 0',
      'y″ + xy = 0',
      'y″ - 2xy′ + 2ny = 0'
    ],
    correctAnswer: '(1 - x²)y″ - 2xy′ + n(n+1)y = 0',
    explanation: 'Legendre\'s equation is (1-x²)y″ - 2xy′ + n(n+1)y = 0, arising in spherical coordinate problems. Has singular points at x = ±1.'
  },
  {
    id: 'math302-q89',
    type: 'multiple_choice',
    prompt: 'When n is a non-negative integer, Legendre\'s equation has a polynomial solution called:',
    options: [
      'Legendre polynomial P_n(x)',
      'Bessel function J_n(x)',
      'Hermite polynomial',
      'Chebyshev polynomial'
    ],
    correctAnswer: 'Legendre polynomial P_n(x)',
    explanation: 'For integer n ≥ 0, one solution to Legendre\'s equation is the Legendre polynomial P_n(x), a polynomial of degree n.'
  },
  {
    id: 'math302-q90',
    type: 'multiple_choice',
    prompt: 'The Legendre polynomials satisfy the orthogonality relation:',
    options: [
      '∫₋₁¹ P_m(x)P_n(x) dx = 0 for m ≠ n',
      '∫₀^∞ P_m(x)P_n(x) dx = 0 for m ≠ n',
      'P_m(x)P_n(x) = 0 for all x',
      '∫₋₁¹ P_n(x) dx = 0'
    ],
    correctAnswer: '∫₋₁¹ P_m(x)P_n(x) dx = 0 for m ≠ n',
    explanation: 'Legendre polynomials are orthogonal on [-1,1]: ∫₋₁¹ P_m(x)P_n(x) dx = 0 when m ≠ n, important for expansions.'
  },

  // Topic 7: Applications - Quiz 1 (Population and Growth Models)
  {
    id: 'math302-q91',
    type: 'multiple_choice',
    prompt: 'The exponential growth model dP/dt = kP has solution:',
    options: [
      'P(t) = P₀e^(kt)',
      'P(t) = P₀ + kt',
      'P(t) = k/t',
      'P(t) = P₀sin(kt)'
    ],
    correctAnswer: 'P(t) = P₀e^(kt)',
    explanation: 'This separable equation gives P(t) = P₀e^(kt), where k > 0 for growth, k < 0 for decay. Models unconstrained population growth.'
  },
  {
    id: 'math302-q92',
    type: 'multiple_choice',
    prompt: 'The logistic equation dP/dt = kP(1 - P/M) models:',
    options: [
      'Population growth with carrying capacity M',
      'Exponential decay',
      'Harmonic motion',
      'Radioactive decay'
    ],
    correctAnswer: 'Population growth with carrying capacity M',
    explanation: 'The logistic model includes a carrying capacity M. Growth slows as P approaches M, modeling limited resources.'
  },
  {
    id: 'math302-q93',
    type: 'multiple_choice',
    prompt: 'For the logistic equation, the equilibrium solutions are:',
    options: [
      'P = 0 (unstable) and P = M (stable)',
      'P = M (unstable) and P = 0 (stable)',
      'P = k and P = M',
      'No equilibrium exists'
    ],
    correctAnswer: 'P = 0 (unstable) and P = M (stable)',
    explanation: 'Setting dP/dt = 0 gives P = 0 and P = M. P = 0 is unstable (populations grow from small values), P = M is stable.'
  },
  {
    id: 'math302-q94',
    type: 'multiple_choice',
    prompt: 'Radioactive decay follows the equation dN/dt = -λN, where λ is:',
    options: [
      'The decay constant (λ > 0)',
      'The growth rate',
      'The half-life',
      'The initial amount'
    ],
    correctAnswer: 'The decay constant (λ > 0)',
    explanation: 'Radioactive decay: dN/dt = -λN, solution N(t) = N₀e^(-λt). The decay constant λ relates to half-life: t₁/₂ = ln(2)/λ.'
  },
  {
    id: 'math302-q95',
    type: 'multiple_choice',
    prompt: 'Newton\'s law of cooling states that dT/dt is proportional to:',
    options: [
      'T - T_ambient',
      'T',
      't',
      'T²'
    ],
    correctAnswer: 'T - T_ambient',
    explanation: 'Newton\'s law: dT/dt = -k(T - T_m), where T_m is ambient temperature. The rate of cooling is proportional to the temperature difference.'
  },

  // Topic 7: Applications - Quiz 2 (Mechanical and Electrical Systems)
  {
    id: 'math302-q96',
    type: 'multiple_choice',
    prompt: 'The spring-mass system mx″ + bx′ + kx = 0 represents:',
    options: [
      'Damped harmonic motion',
      'Exponential growth',
      'Logistic growth',
      'Steady-state flow'
    ],
    correctAnswer: 'Damped harmonic motion',
    explanation: 'This is the damped harmonic oscillator: m = mass, b = damping coefficient, k = spring constant. Describes vibrating systems.'
  },
  {
    id: 'math302-q97',
    type: 'multiple_choice',
    prompt: 'For the undamped oscillator x″ + ω²x = 0, the general solution is:',
    options: [
      'x = C₁cos(ωt) + C₂sin(ωt)',
      'x = Ce^(ωt)',
      'x = C₁e^(ωt) + C₂e^(-ωt)',
      'x = Ct²'
    ],
    correctAnswer: 'x = C₁cos(ωt) + C₂sin(ωt)',
    explanation: 'With b = 0, we get simple harmonic motion: x″ + ω²x = 0, where ω² = k/m. Solution: x = C₁cos(ωt) + C₂sin(ωt).'
  },
  {
    id: 'math302-q98',
    type: 'multiple_choice',
    prompt: 'An RLC circuit satisfies the equation LI″ + RI′ + (1/C)I = E′(t), where:',
    options: [
      'L = inductance, R = resistance, C = capacitance',
      'L = length, R = radius, C = current',
      'L = Laplace transform, R = recurrence, C = constant',
      'L = limit, R = rate, C = coefficient'
    ],
    correctAnswer: 'L = inductance, R = resistance, C = capacitance',
    explanation: 'RLC circuit equation: LI″ + RI′ + I/C = E′(t) is analogous to spring-mass system. I = current, E(t) = voltage source.'
  },
  {
    id: 'math302-q99',
    type: 'multiple_choice',
    prompt: 'Critical damping occurs when the damping coefficient b equals:',
    options: [
      '2√(mk)',
      '√(mk)',
      'mk',
      '2mk'
    ],
    correctAnswer: '2√(mk)',
    explanation: 'Critical damping: b = 2√(mk), giving repeated characteristic roots. System returns to equilibrium fastest without oscillation.'
  },
  {
    id: 'math302-q100',
    type: 'multiple_choice',
    prompt: 'Resonance occurs when the forcing frequency equals:',
    options: [
      'The natural frequency of the system',
      'Zero',
      'Infinity',
      'The damping coefficient'
    ],
    correctAnswer: 'The natural frequency of the system',
    explanation: 'Resonance occurs when external forcing frequency matches natural frequency ω₀ = √(k/m), causing amplitude to grow dramatically.'
  },

  // Topic 7: Applications - Quiz 3 (Numerical Methods)
  {
    id: 'math302-q101',
    type: 'multiple_choice',
    prompt: 'Euler\'s method approximates y(x + h) as:',
    options: [
      'y(x) + hf(x, y)',
      'y(x) + f(x, y)',
      'y(x)·f(x, y)',
      'y(x) + h²f(x, y)'
    ],
    correctAnswer: 'y(x) + hf(x, y)',
    explanation: 'Euler\'s method: y_{n+1} = y_n + hf(x_n, y_n), using the tangent line approximation. Simple but has O(h) local error.'
  },
  {
    id: 'math302-q102',
    type: 'multiple_choice',
    prompt: 'The improved Euler (Heun) method is a:',
    options: [
      'Predictor-corrector method',
      'Implicit method',
      'Series solution method',
      'Separation of variables'
    ],
    correctAnswer: 'Predictor-corrector method',
    explanation: 'Improved Euler predicts using Euler\'s method, then corrects using average of slopes. Better accuracy than basic Euler method.'
  },
  {
    id: 'math302-q103',
    type: 'multiple_choice',
    prompt: 'The classical Runge-Kutta method (RK4) has local truncation error of order:',
    options: [
      'O(h⁵)',
      'O(h)',
      'O(h²)',
      'O(h³)'
    ],
    correctAnswer: 'O(h⁵)',
    explanation: 'Fourth-order Runge-Kutta (RK4) has local error O(h⁵), global error O(h⁴). Very accurate and widely used numerical method.'
  },
  {
    id: 'math302-q104',
    type: 'multiple_choice',
    prompt: 'The main advantage of numerical methods is:',
    options: [
      'They work when analytical solutions are unavailable',
      'They give exact solutions',
      'They are faster than analytical methods',
      'They require no initial conditions'
    ],
    correctAnswer: 'They work when analytical solutions are unavailable',
    explanation: 'Numerical methods approximate solutions for equations that cannot be solved analytically, though they introduce discretization error.'
  },
  {
    id: 'math302-q105',
    type: 'multiple_choice',
    prompt: 'Stability of a numerical method means:',
    options: [
      'Errors do not grow unboundedly as steps progress',
      'The method always converges',
      'The step size can be arbitrarily large',
      'The solution is exact'
    ],
    correctAnswer: 'Errors do not grow unboundedly as steps progress',
    explanation: 'A stable method controls error propagation. Unstable methods can produce growing errors even with small step size h.'
  }
];

export const math302Quizzes: Quiz[] = [
  // Topic 1: First-Order DEs
  {
    id: 'math302-quiz-1-1',
    subjectId: 'math302',
    topicId: 'math302-topic-1',
    title: 'First-Order ODEs - Separable and Linear',
    questions: questions.slice(0, 5)
  },
  {
    id: 'math302-quiz-1-2',
    subjectId: 'math302',
    topicId: 'math302-topic-1',
    title: 'First-Order ODEs - Exact Equations',
    questions: questions.slice(5, 10)
  },
  {
    id: 'math302-quiz-1-3',
    subjectId: 'math302',
    topicId: 'math302-topic-1',
    title: 'First-Order ODEs - Existence and Uniqueness',
    questions: questions.slice(10, 15)
  },

  // Topic 2: Second-Order Linear
  {
    id: 'math302-quiz-2-1',
    subjectId: 'math302',
    topicId: 'math302-topic-2',
    title: 'Second-Order Linear - Characteristic Equation',
    questions: questions.slice(15, 20)
  },
  {
    id: 'math302-quiz-2-2',
    subjectId: 'math302',
    topicId: 'math302-topic-2',
    title: 'Second-Order Linear - Undetermined Coefficients',
    questions: questions.slice(20, 25)
  },
  {
    id: 'math302-quiz-2-3',
    subjectId: 'math302',
    topicId: 'math302-topic-2',
    title: 'Second-Order Linear - Variation of Parameters',
    questions: questions.slice(25, 30)
  },

  // Topic 3: Higher-Order Linear
  {
    id: 'math302-quiz-3-1',
    subjectId: 'math302',
    topicId: 'math302-topic-3',
    title: 'Higher-Order Linear - Operator Methods',
    questions: questions.slice(30, 35)
  },
  {
    id: 'math302-quiz-3-2',
    subjectId: 'math302',
    topicId: 'math302-topic-3',
    title: 'Higher-Order Linear - Cauchy-Euler Equations',
    questions: questions.slice(35, 40)
  },
  {
    id: 'math302-quiz-3-3',
    subjectId: 'math302',
    topicId: 'math302-topic-3',
    title: 'Higher-Order Linear - Advanced Topics',
    questions: questions.slice(40, 45)
  },

  // Topic 4: Systems of DEs
  {
    id: 'math302-quiz-4-1',
    subjectId: 'math302',
    topicId: 'math302-topic-4',
    title: 'Systems of DEs - Eigenvalue Method',
    questions: questions.slice(45, 50)
  },
  {
    id: 'math302-quiz-4-2',
    subjectId: 'math302',
    topicId: 'math302-topic-4',
    title: 'Systems of DEs - Phase Portraits',
    questions: questions.slice(50, 55)
  },
  {
    id: 'math302-quiz-4-3',
    subjectId: 'math302',
    topicId: 'math302-topic-4',
    title: 'Systems of DEs - Advanced Systems',
    questions: questions.slice(55, 60)
  },

  // Topic 5: Laplace Transforms
  {
    id: 'math302-quiz-5-1',
    subjectId: 'math302',
    topicId: 'math302-topic-5',
    title: 'Laplace Transforms - Definition and Properties',
    questions: questions.slice(60, 65)
  },
  {
    id: 'math302-quiz-5-2',
    subjectId: 'math302',
    topicId: 'math302-topic-5',
    title: 'Laplace Transforms - Inverse Transform',
    questions: questions.slice(65, 70)
  },
  {
    id: 'math302-quiz-5-3',
    subjectId: 'math302',
    topicId: 'math302-topic-5',
    title: 'Laplace Transforms - Solving IVPs',
    questions: questions.slice(70, 75)
  },

  // Topic 6: Series Solutions
  {
    id: 'math302-quiz-6-1',
    subjectId: 'math302',
    topicId: 'math302-topic-6',
    title: 'Series Solutions - Power Series Method',
    questions: questions.slice(75, 80)
  },
  {
    id: 'math302-quiz-6-2',
    subjectId: 'math302',
    topicId: 'math302-topic-6',
    title: 'Series Solutions - Frobenius Method',
    questions: questions.slice(80, 85)
  },
  {
    id: 'math302-quiz-6-3',
    subjectId: 'math302',
    topicId: 'math302-topic-6',
    title: 'Series Solutions - Bessel and Legendre Functions',
    questions: questions.slice(85, 90)
  },

  // Topic 7: Applications
  {
    id: 'math302-quiz-7-1',
    subjectId: 'math302',
    topicId: 'math302-topic-7',
    title: 'Applications - Population and Growth Models',
    questions: questions.slice(90, 95)
  },
  {
    id: 'math302-quiz-7-2',
    subjectId: 'math302',
    topicId: 'math302-topic-7',
    title: 'Applications - Mechanical and Electrical Systems',
    questions: questions.slice(95, 100)
  },
  {
    id: 'math302-quiz-7-3',
    subjectId: 'math302',
    topicId: 'math302-topic-7',
    title: 'Applications - Numerical Methods',
    questions: questions.slice(100, 105)
  }
];
