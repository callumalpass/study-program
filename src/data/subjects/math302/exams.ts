import type { Exam, QuizQuestion } from '../../../core/types';

const midtermQuestions: QuizQuestion[] = [
  // Topic 1: First-Order DEs - Separable
  {
    id: 'math302-mid-q1',
    type: 'multiple_choice',
    prompt: 'Solve the separable differential equation dy/dx = xy² with initial condition y(0) = 1.',
    options: [
      'y = 1/(1 - x²/2)',
      'y = 1/(1 + x²/2)',
      'y = e^(x²/2)',
      'y = 1/(2 - x²)'
    ],
    correctAnswer: 'y = 1/(1 - x²/2)',
    explanation: 'Separating variables: dy/y² = x dx. Integrating: -1/y = x²/2 + C. Using y(0) = 1 gives C = -1, so y = 1/(1 - x²/2).'
  },
  {
    id: 'math302-mid-q2',
    type: 'multiple_choice',
    prompt: 'Which of the following differential equations is separable?',
    options: [
      'dy/dx = x + y',
      'dy/dx = xy + x',
      'dy/dx = x² + y²',
      'dy/dx = sin(x + y)'
    ],
    correctAnswer: 'dy/dx = xy + x',
    explanation: 'dy/dx = xy + x = x(y + 1) can be separated as dy/(y + 1) = x dx. The others cannot be written as g(y)dy = f(x)dx.'
  },
  {
    id: 'math302-mid-q3',
    type: 'multiple_choice',
    prompt: 'The general solution to dy/dx = 3y is:',
    options: [
      'y = Ce^(3x)',
      'y = C + 3x',
      'y = 3Ce^x',
      'y = Ce^(x/3)'
    ],
    correctAnswer: 'y = Ce^(3x)',
    explanation: 'Separating: dy/y = 3dx. Integrating: ln|y| = 3x + C₁, so y = Ce^(3x).'
  },
  // Topic 1: First-Order DEs - Linear
  {
    id: 'math302-mid-q4',
    type: 'multiple_choice',
    prompt: 'What is the integrating factor for the linear DE: dy/dx + 2y = e^x?',
    options: [
      'e^(2x)',
      'e^x',
      'e^(-2x)',
      '2e^x'
    ],
    correctAnswer: 'e^(2x)',
    explanation: 'For a linear DE dy/dx + P(x)y = Q(x), the integrating factor is μ(x) = e^(∫P(x)dx) = e^(∫2dx) = e^(2x).'
  },
  {
    id: 'math302-mid-q5',
    type: 'multiple_choice',
    prompt: 'Solve dy/dx + y/x = x with y(1) = 2.',
    options: [
      'y = x²/2 + 3/(2x)',
      'y = x²/3 + 2/x',
      'y = x² + 1/x',
      'y = x²/2 + 1/x'
    ],
    correctAnswer: 'y = x²/2 + 3/(2x)',
    explanation: 'Integrating factor μ = e^(∫1/x dx) = x. Multiplying: d/dx(xy) = x². So xy = x³/3 + C. Using y(1) = 2 gives C = 5/3, thus y = x²/3 + 5/(3x) = x²/2 + 3/(2x).'
  },
  {
    id: 'math302-mid-q6',
    type: 'multiple_choice',
    prompt: 'Which form represents a first-order linear differential equation?',
    options: [
      'dy/dx + P(x)y = Q(x)',
      'dy/dx = f(x)g(y)',
      'M(x,y)dx + N(x,y)dy = 0',
      'dy/dx + y² = x'
    ],
    correctAnswer: 'dy/dx + P(x)y = Q(x)',
    explanation: 'A first-order linear DE has the standard form dy/dx + P(x)y = Q(x), where y appears to the first power only.'
  },
  // Topic 1: Exact Equations
  {
    id: 'math302-mid-q7',
    type: 'multiple_choice',
    prompt: 'For the equation (2xy + 3)dx + (x² + 4y)dy = 0, what condition must hold for exactness?',
    options: [
      '∂M/∂y = ∂N/∂x',
      '∂M/∂x = ∂N/∂y',
      'M = N',
      '∂²M/∂x∂y = 0'
    ],
    correctAnswer: '∂M/∂y = ∂N/∂x',
    explanation: 'An equation M dx + N dy = 0 is exact if ∂M/∂y = ∂N/∂x. Here ∂M/∂y = 2x and ∂N/∂x = 2x, so it is exact.'
  },
  {
    id: 'math302-mid-q8',
    type: 'multiple_choice',
    prompt: 'Is the equation (3x² + 2y)dx + (2x + 4y)dy = 0 exact?',
    options: [
      'Yes, because ∂M/∂y = ∂N/∂x = 2',
      'No, because ∂M/∂y ≠ ∂N/∂x',
      'Yes, because M and N are polynomials',
      'No, because it is nonlinear'
    ],
    correctAnswer: 'Yes, because ∂M/∂y = ∂N/∂x = 2',
    explanation: 'M = 3x² + 2y gives ∂M/∂y = 2. N = 2x + 4y gives ∂N/∂x = 2. Since these are equal, the equation is exact.'
  },
  // Topic 1: Integrating Factors
  {
    id: 'math302-mid-q9',
    type: 'multiple_choice',
    prompt: 'If an equation is not exact but (∂M/∂y - ∂N/∂x)/N is a function of x only, what is the integrating factor?',
    options: [
      'μ(x) = e^(∫[(∂M/∂y - ∂N/∂x)/N]dx)',
      'μ(y) = e^(∫[(∂N/∂x - ∂M/∂y)/M]dy)',
      'μ(x) = e^(∫N dx)',
      'μ(x) = e^(∫M dx)'
    ],
    correctAnswer: 'μ(x) = e^(∫[(∂M/∂y - ∂N/∂x)/N]dx)',
    explanation: 'When (∂M/∂y - ∂N/∂x)/N = f(x) depends only on x, the integrating factor is μ(x) = e^(∫f(x)dx).'
  },
  {
    id: 'math302-mid-q10',
    type: 'multiple_choice',
    prompt: 'For y dx - x dy = 0, which integrating factor makes it exact?',
    options: [
      '1/y²',
      '1/x²',
      'xy',
      'e^(x+y)'
    ],
    correctAnswer: '1/y²',
    explanation: 'Multiplying by 1/y² gives (1/y)dx - (x/y²)dy = 0. Now M = 1/y, N = -x/y², and ∂M/∂y = -1/y² = ∂N/∂x, so it is exact.'
  },
  // Topic 2: Second-Order Linear - Characteristic Equations
  {
    id: 'math302-mid-q11',
    type: 'multiple_choice',
    prompt: 'What is the general solution to y\'\' - 5y\' + 6y = 0?',
    options: [
      'y = C₁e^(2x) + C₂e^(3x)',
      'y = C₁e^(-2x) + C₂e^(-3x)',
      'y = C₁e^(2x) + C₂xe^(2x)',
      'y = e^(2x)(C₁cos(x) + C₂sin(x))'
    ],
    correctAnswer: 'y = C₁e^(2x) + C₂e^(3x)',
    explanation: 'The characteristic equation is r² - 5r + 6 = 0, which factors as (r - 2)(r - 3) = 0. Roots are r = 2, 3, giving y = C₁e^(2x) + C₂e^(3x).'
  },
  {
    id: 'math302-mid-q12',
    type: 'multiple_choice',
    prompt: 'For y\'\' + 4y\' + 4y = 0, the roots of the characteristic equation are:',
    options: [
      'r = -2 (repeated)',
      'r = 2 (repeated)',
      'r = ±2i',
      'r = -2, -2i'
    ],
    correctAnswer: 'r = -2 (repeated)',
    explanation: 'The characteristic equation r² + 4r + 4 = 0 factors as (r + 2)² = 0, giving a repeated root r = -2.'
  },
  {
    id: 'math302-mid-q13',
    type: 'multiple_choice',
    prompt: 'What is the general solution when the characteristic equation has roots r = -1 ± 2i?',
    options: [
      'y = e^(-x)(C₁cos(2x) + C₂sin(2x))',
      'y = e^x(C₁cos(2x) + C₂sin(2x))',
      'y = C₁e^(-x) + C₂e^(2ix)',
      'y = e^(-x)(C₁e^(2x) + C₂e^(-2x))'
    ],
    correctAnswer: 'y = e^(-x)(C₁cos(2x) + C₂sin(2x))',
    explanation: 'Complex roots r = α ± βi give the solution y = e^(αx)(C₁cos(βx) + C₂sin(βx)). Here α = -1 and β = 2.'
  },
  {
    id: 'math302-mid-q14',
    type: 'multiple_choice',
    prompt: 'For a repeated root r = 3, what is the general solution?',
    options: [
      'y = C₁e^(3x) + C₂xe^(3x)',
      'y = C₁e^(3x) + C₂e^(-3x)',
      'y = (C₁ + C₂x)e^(6x)',
      'y = C₁e^(3x) + C₂e^(3x²)'
    ],
    correctAnswer: 'y = C₁e^(3x) + C₂xe^(3x)',
    explanation: 'For a repeated root r, the general solution is y = C₁e^(rx) + C₂xe^(rx). Here r = 3.'
  },
  // Topic 2: Undetermined Coefficients
  {
    id: 'math302-mid-q15',
    type: 'multiple_choice',
    prompt: 'For y\'\' + y = sin(2x), what form should the particular solution take?',
    options: [
      'yₚ = A cos(2x) + B sin(2x)',
      'yₚ = A sin(x)',
      'yₚ = Ax sin(2x)',
      'yₚ = A cos(x) + B sin(x)'
    ],
    correctAnswer: 'yₚ = A cos(2x) + B sin(2x)',
    explanation: 'For a forcing function sin(2x), we try yₚ = A cos(2x) + B sin(2x) since both cos and sin terms arise from derivatives.'
  },
  {
    id: 'math302-mid-q16',
    type: 'multiple_choice',
    prompt: 'For y\'\' - 3y\' + 2y = 4e^x, what is the appropriate form for yₚ?',
    options: [
      'yₚ = Axe^x',
      'yₚ = Ae^x',
      'yₚ = Ax²e^x',
      'yₚ = A + Be^x'
    ],
    correctAnswer: 'yₚ = Axe^x',
    explanation: 'The characteristic roots are r = 1, 2. Since e^x is a solution to the homogeneous equation (r = 1), we multiply by x: yₚ = Axe^x.'
  },
  {
    id: 'math302-mid-q17',
    type: 'multiple_choice',
    prompt: 'For y\'\' + 4y = 8, what form should yₚ take?',
    options: [
      'yₚ = A (constant)',
      'yₚ = Ax',
      'yₚ = Ax²',
      'yₚ = A cos(2x)'
    ],
    correctAnswer: 'yₚ = A (constant)',
    explanation: 'For a constant forcing function, we try a constant particular solution yₚ = A.'
  },
  {
    id: 'math302-mid-q18',
    type: 'multiple_choice',
    prompt: 'For y\'\' + y = x² + 3x, the form of yₚ should be:',
    options: [
      'yₚ = Ax² + Bx + C',
      'yₚ = Ax²',
      'yₚ = Ax + B',
      'yₚ = Ax³ + Bx² + Cx'
    ],
    correctAnswer: 'yₚ = Ax² + Bx + C',
    explanation: 'For a polynomial forcing function of degree n, we try a polynomial of degree n: yₚ = Ax² + Bx + C.'
  },
  // Topic 2: Variation of Parameters
  {
    id: 'math302-mid-q19',
    type: 'multiple_choice',
    prompt: 'Variation of parameters is preferred over undetermined coefficients when:',
    options: [
      'The forcing function is not of a form suitable for undetermined coefficients',
      'The equation has constant coefficients',
      'The forcing function is a polynomial',
      'The homogeneous solution is known'
    ],
    correctAnswer: 'The forcing function is not of a form suitable for undetermined coefficients',
    explanation: 'Variation of parameters works for any forcing function, while undetermined coefficients only works for specific forms (polynomials, exponentials, sines/cosines).'
  },
  {
    id: 'math302-mid-q20',
    type: 'multiple_choice',
    prompt: 'In variation of parameters, if y₁ and y₂ are homogeneous solutions, the Wronskian W is:',
    options: [
      'W = y₁y₂\' - y₁\'y₂',
      'W = y₁y₂',
      'W = y₁\' + y₂\'',
      'W = y₁²y₂²'
    ],
    correctAnswer: 'W = y₁y₂\' - y₁\'y₂',
    explanation: 'The Wronskian is defined as W(y₁, y₂) = y₁y₂\' - y₁\'y₂, which is the determinant of the matrix with rows [y₁, y₂] and [y₁\', y₂\'].'
  },
  // Topic 3: Higher-Order Linear
  {
    id: 'math302-mid-q21',
    type: 'multiple_choice',
    prompt: 'For the third-order equation y\'\'\' - 6y\'\' + 11y\' - 6y = 0, the characteristic equation is:',
    options: [
      'r³ - 6r² + 11r - 6 = 0',
      'r³ + 6r² + 11r + 6 = 0',
      'r² - 6r + 11 = 0',
      '3r² - 12r + 11 = 0'
    ],
    correctAnswer: 'r³ - 6r² + 11r - 6 = 0',
    explanation: 'Substituting y = e^(rx) into the DE gives the characteristic equation r³ - 6r² + 11r - 6 = 0.'
  },
  {
    id: 'math302-mid-q22',
    type: 'multiple_choice',
    prompt: 'A Cauchy-Euler equation has the form:',
    options: [
      'x²y\'\' + axy\' + by = 0',
      'y\'\' + axy\' + by = 0',
      'x²y\'\' + xy\' + y = 0 with constant a, b',
      'y\'\' + ay\' + by = 0'
    ],
    correctAnswer: 'x²y\'\' + axy\' + by = 0',
    explanation: 'A Cauchy-Euler equation has the form x²y\'\' + axy\' + by = 0, where coefficients are powers of x matching derivative orders.'
  },
  {
    id: 'math302-mid-q23',
    type: 'multiple_choice',
    prompt: 'To solve a Cauchy-Euler equation, we typically substitute:',
    options: [
      'y = x^r',
      'y = e^(rx)',
      'y = r^x',
      'y = ln(x)'
    ],
    correctAnswer: 'y = x^r',
    explanation: 'For Cauchy-Euler equations, we substitute y = x^r, which transforms the equation into an algebraic equation for r.'
  },
  // Topic 4: Systems of DEs
  {
    id: 'math302-mid-q24',
    type: 'multiple_choice',
    prompt: 'For the system x\' = Ax, if A has eigenvalues λ₁ = 2, λ₂ = -3, the general solution involves:',
    options: [
      'e^(2t) and e^(-3t)',
      'e^(2t) only',
      't·e^(2t) and t·e^(-3t)',
      'cos(2t) and sin(3t)'
    ],
    correctAnswer: 'e^(2t) and e^(-3t)',
    explanation: 'For distinct real eigenvalues λ₁ and λ₂, the solution includes terms e^(λ₁t) and e^(λ₂t), here e^(2t) and e^(-3t).'
  },
  {
    id: 'math302-mid-q25',
    type: 'multiple_choice',
    prompt: 'If a 2×2 matrix has complex eigenvalues λ = 1 ± 2i, the origin is a:',
    options: [
      'Spiral source (unstable)',
      'Spiral sink (stable)',
      'Center',
      'Saddle point'
    ],
    correctAnswer: 'Spiral source (unstable)',
    explanation: 'Complex eigenvalues with positive real part (1 > 0) indicate a spiral source (unstable spiral). The imaginary part causes rotation.'
  },
  {
    id: 'math302-mid-q26',
    type: 'multiple_choice',
    prompt: 'A saddle point occurs when the eigenvalues are:',
    options: [
      'Real with opposite signs',
      'Real and both positive',
      'Real and both negative',
      'Complex conjugates'
    ],
    correctAnswer: 'Real with opposite signs',
    explanation: 'A saddle point (unstable) occurs when the eigenvalues are real with opposite signs, causing trajectories to approach along one direction and diverge along another.'
  }
];

const finalQuestions: QuizQuestion[] = [
  // All midterm questions plus additional topics 5-7
  ...midtermQuestions,

  // Topic 5: Laplace Transforms - Definition and Basic Properties
  {
    id: 'math302-final-q1',
    type: 'multiple_choice',
    prompt: 'What is the Laplace transform of f(t) = 1?',
    options: [
      'F(s) = 1/s',
      'F(s) = s',
      'F(s) = 1',
      'F(s) = e^(-s)'
    ],
    correctAnswer: 'F(s) = 1/s',
    explanation: 'L{1} = ∫₀^∞ e^(-st) dt = [-1/s · e^(-st)]₀^∞ = 1/s for s > 0.'
  },
  {
    id: 'math302-final-q2',
    type: 'multiple_choice',
    prompt: 'What is L{e^(at)}?',
    options: [
      '1/(s - a) for s > a',
      '1/(s + a) for s > -a',
      'a/(s - a)',
      'e^a/s'
    ],
    correctAnswer: '1/(s - a) for s > a',
    explanation: 'L{e^(at)} = ∫₀^∞ e^(at)e^(-st) dt = ∫₀^∞ e^(-(s-a)t) dt = 1/(s - a) for s > a.'
  },
  {
    id: 'math302-final-q3',
    type: 'multiple_choice',
    prompt: 'The Laplace transform of sin(ωt) is:',
    options: [
      'ω/(s² + ω²)',
      's/(s² + ω²)',
      '1/(s² + ω²)',
      'ω/(s² - ω²)'
    ],
    correctAnswer: 'ω/(s² + ω²)',
    explanation: 'L{sin(ωt)} = ω/(s² + ω²), which can be derived using integration by parts or from the definition.'
  },
  {
    id: 'math302-final-q4',
    type: 'multiple_choice',
    prompt: 'What is L{cos(ωt)}?',
    options: [
      's/(s² + ω²)',
      'ω/(s² + ω²)',
      '1/(s² + ω²)',
      's/(s - ω)'
    ],
    correctAnswer: 's/(s² + ω²)',
    explanation: 'L{cos(ωt)} = s/(s² + ω²), complementing the Laplace transform of sin(ωt).'
  },
  {
    id: 'math302-final-q5',
    type: 'multiple_choice',
    prompt: 'The first shifting theorem states L{e^(at)f(t)} equals:',
    options: [
      'F(s - a)',
      'F(s + a)',
      'e^a F(s)',
      'F(s)/a'
    ],
    correctAnswer: 'F(s - a)',
    explanation: 'The first shifting theorem: L{e^(at)f(t)} = F(s - a), where F(s) = L{f(t)}. This shifts the transform in the s-domain.'
  },
  // Topic 5: Laplace Transforms - Solving IVPs
  {
    id: 'math302-final-q6',
    type: 'multiple_choice',
    prompt: 'What is L{y\'}?',
    options: [
      'sY(s) - y(0)',
      'sY(s) + y(0)',
      'Y\'(s)',
      's²Y(s) - y(0)'
    ],
    correctAnswer: 'sY(s) - y(0)',
    explanation: 'The Laplace transform of the first derivative is L{y\'} = sY(s) - y(0), where Y(s) = L{y}.'
  },
  {
    id: 'math302-final-q7',
    type: 'multiple_choice',
    prompt: 'What is L{y\'\'}?',
    options: [
      's²Y(s) - sy(0) - y\'(0)',
      's²Y(s) - y(0) - y\'(0)',
      'sY(s) - y(0)',
      's²Y(s) + sy(0) + y\'(0)'
    ],
    correctAnswer: 's²Y(s) - sy(0) - y\'(0)',
    explanation: 'L{y\'\'} = s²Y(s) - sy(0) - y\'(0), which incorporates both initial conditions y(0) and y\'(0).'
  },
  {
    id: 'math302-final-q8',
    type: 'multiple_choice',
    prompt: 'To solve y\'\' + 4y = 0 with y(0) = 1, y\'(0) = 0 using Laplace transforms, we get:',
    options: [
      'Y(s) = s/(s² + 4)',
      'Y(s) = 1/(s² + 4)',
      'Y(s) = 2/(s² + 4)',
      'Y(s) = 4/(s² + 4)'
    ],
    correctAnswer: 'Y(s) = s/(s² + 4)',
    explanation: 'Taking Laplace: s²Y - s + 4Y = 0. So Y(s² + 4) = s, giving Y = s/(s² + 4), which transforms back to y = cos(2t).'
  },
  {
    id: 'math302-final-q9',
    type: 'multiple_choice',
    prompt: 'The unit step function u(t - a) has Laplace transform:',
    options: [
      'e^(-as)/s',
      'e^(as)/s',
      '1/(s - a)',
      'a/s'
    ],
    correctAnswer: 'e^(-as)/s',
    explanation: 'L{u(t - a)} = e^(-as)/s, where u(t - a) is 0 for t < a and 1 for t ≥ a. This is the second shifting theorem.'
  },
  {
    id: 'math302-final-q10',
    type: 'multiple_choice',
    prompt: 'The inverse Laplace transform of 1/(s - 3) is:',
    options: [
      'e^(3t)',
      'e^(-3t)',
      '1/3',
      't·e^(3t)'
    ],
    correctAnswer: 'e^(3t)',
    explanation: 'L⁻¹{1/(s - a)} = e^(at). Here a = 3, so L⁻¹{1/(s - 3)} = e^(3t).'
  },
  // Topic 5: Convolution
  {
    id: 'math302-final-q11',
    type: 'multiple_choice',
    prompt: 'The convolution of f and g is defined as:',
    options: [
      '(f * g)(t) = ∫₀^t f(τ)g(t - τ) dτ',
      '(f * g)(t) = ∫₀^∞ f(τ)g(τ) dτ',
      '(f * g)(t) = f(t)·g(t)',
      '(f * g)(t) = f(t) + g(t)'
    ],
    correctAnswer: '(f * g)(t) = ∫₀^t f(τ)g(t - τ) dτ',
    explanation: 'The convolution is (f * g)(t) = ∫₀^t f(τ)g(t - τ) dτ. Note: both forms ∫₀^t f(τ)g(t - τ) dτ and ∫₀^t f(t - τ)g(τ) dτ are equivalent.'
  },
  {
    id: 'math302-final-q12',
    type: 'multiple_choice',
    prompt: 'The convolution theorem states L{f * g} equals:',
    options: [
      'F(s)·G(s)',
      'F(s) + G(s)',
      'F(s)/G(s)',
      '∫F(s)G(s) ds'
    ],
    correctAnswer: 'F(s)·G(s)',
    explanation: 'The convolution theorem: L{f * g} = F(s)·G(s), where F(s) = L{f} and G(s) = L{g}. Convolution in time domain = multiplication in s-domain.'
  },
  // Topic 6: Series Solutions - Power Series
  {
    id: 'math302-final-q13',
    type: 'multiple_choice',
    prompt: 'A power series solution has the form:',
    options: [
      'y = Σ aₙ(x - x₀)ⁿ',
      'y = Σ aₙe^(nx)',
      'y = Σ aₙ sin(nx)',
      'y = Σ aₙ/n!'
    ],
    correctAnswer: 'y = Σ aₙ(x - x₀)ⁿ',
    explanation: 'A power series solution is y = Σ aₙ(x - x₀)ⁿ, centered at x₀. The coefficients aₙ are determined by substituting into the DE.'
  },
  {
    id: 'math302-final-q14',
    type: 'multiple_choice',
    prompt: 'An ordinary point x₀ of a DE y\'\' + P(x)y\' + Q(x)y = 0 is one where:',
    options: [
      'Both P(x) and Q(x) are analytic at x₀',
      'P(x₀) = 0',
      'Q(x₀) = 0',
      'P(x) or Q(x) has a singularity at x₀'
    ],
    correctAnswer: 'Both P(x) and Q(x) are analytic at x₀',
    explanation: 'An ordinary point is where both P(x) and Q(x) are analytic (have convergent power series). Otherwise, x₀ is a singular point.'
  },
  {
    id: 'math302-final-q15',
    type: 'multiple_choice',
    prompt: 'A regular singular point requires:',
    options: [
      '(x - x₀)P(x) and (x - x₀)²Q(x) are analytic at x₀',
      'P(x) and Q(x) both have poles at x₀',
      'P(x) is analytic but Q(x) is not',
      'The DE cannot be solved near x₀'
    ],
    correctAnswer: '(x - x₀)P(x) and (x - x₀)²Q(x) are analytic at x₀',
    explanation: 'A singular point x₀ is regular if (x - x₀)P(x) and (x - x₀)²Q(x) are both analytic at x₀. Otherwise, it is irregular.'
  },
  // Topic 6: Frobenius Method
  {
    id: 'math302-final-q16',
    type: 'multiple_choice',
    prompt: 'The Frobenius method assumes a solution of the form:',
    options: [
      'y = (x - x₀)^r Σ aₙ(x - x₀)ⁿ',
      'y = e^r Σ aₙx^n',
      'y = Σ aₙx^(n+r)',
      'y = x^r·e^x'
    ],
    correctAnswer: 'y = (x - x₀)^r Σ aₙ(x - x₀)ⁿ',
    explanation: 'The Frobenius method uses y = (x - x₀)^r Σ aₙ(x - x₀)ⁿ where r is found from the indicial equation and may not be an integer.'
  },
  {
    id: 'math302-final-q17',
    type: 'multiple_choice',
    prompt: 'The indicial equation is obtained by:',
    options: [
      'Finding the coefficient of the lowest power of x in the series',
      'Setting the leading coefficient equal to zero',
      'Differentiating the DE twice',
      'Taking the Laplace transform'
    ],
    correctAnswer: 'Finding the coefficient of the lowest power of x in the series',
    explanation: 'After substituting the Frobenius series, the indicial equation comes from the coefficient of the lowest power of (x - x₀), determining possible values of r.'
  },
  {
    id: 'math302-final-q18',
    type: 'multiple_choice',
    prompt: 'If the indicial equation has roots r₁ and r₂ with r₁ - r₂ = integer, the solutions:',
    options: [
      'May involve logarithmic terms',
      'Are always two independent power series',
      'Cannot be found by Frobenius method',
      'Are always identical'
    ],
    correctAnswer: 'May involve logarithmic terms',
    explanation: 'When r₁ - r₂ is an integer, the second solution may involve logarithmic terms: y₂ = y₁ ln(x) + power series.'
  },
  // Topic 6: Bessel Functions
  {
    id: 'math302-final-q19',
    type: 'multiple_choice',
    prompt: 'Bessel\'s equation of order ν is:',
    options: [
      'x²y\'\' + xy\' + (x² - ν²)y = 0',
      'x²y\'\' + xy\' - (x² + ν²)y = 0',
      'y\'\' + xy\' + ν²y = 0',
      'x²y\'\' - xy\' + (x² - ν²)y = 0'
    ],
    correctAnswer: 'x²y\'\' + xy\' + (x² - ν²)y = 0',
    explanation: 'The standard form of Bessel\'s equation is x²y\'\' + xy\' + (x² - ν²)y = 0, where ν is the order.'
  },
  {
    id: 'math302-final-q20',
    type: 'multiple_choice',
    prompt: 'The general solution to Bessel\'s equation of order ν (ν not an integer) is:',
    options: [
      'y = C₁Jᵥ(x) + C₂J₋ᵥ(x)',
      'y = C₁Jᵥ(x) + C₂Yᵥ(x)',
      'y = C₁Jᵥ(x) only',
      'y = C₁Jᵥ(x) + C₂Iᵥ(x)'
    ],
    correctAnswer: 'y = C₁Jᵥ(x) + C₂J₋ᵥ(x)',
    explanation: 'When ν is not an integer, Jᵥ(x) and J₋ᵥ(x) are linearly independent, giving y = C₁Jᵥ(x) + C₂J₋ᵥ(x).'
  },
  {
    id: 'math302-final-q21',
    type: 'multiple_choice',
    prompt: 'Bessel functions of the first kind Jᵥ(x) behave near x = 0 as:',
    options: [
      'Jᵥ(x) ∼ x^ν for small x',
      'Jᵥ(x) ∼ ln(x) for small x',
      'Jᵥ(x) ∼ 1/x^ν for small x',
      'Jᵥ(x) ∼ e^x for small x'
    ],
    correctAnswer: 'Jᵥ(x) ∼ x^ν for small x',
    explanation: 'Near x = 0, Jᵥ(x) ∼ (x/2)^ν / Γ(ν + 1), so Jᵥ(x) behaves like x^ν for small x.'
  },
  {
    id: 'math302-final-q22',
    type: 'multiple_choice',
    prompt: 'The Bessel function of the second kind Yᵥ(x) (also called Neumann function):',
    options: [
      'Is singular at x = 0',
      'Is regular at x = 0',
      'Equals Jᵥ(x)',
      'Is only defined for integer ν'
    ],
    correctAnswer: 'Is singular at x = 0',
    explanation: 'Yᵥ(x) is singular (unbounded) at x = 0, typically behaving like ln(x) or 1/x^ν near the origin.'
  },
  // Topic 7: Applications - Population Models
  {
    id: 'math302-final-q23',
    type: 'multiple_choice',
    prompt: 'The logistic equation for population growth is:',
    options: [
      'dP/dt = rP(1 - P/K)',
      'dP/dt = rP',
      'dP/dt = r(K - P)',
      'dP/dt = rP + K'
    ],
    correctAnswer: 'dP/dt = rP(1 - P/K)',
    explanation: 'The logistic equation is dP/dt = rP(1 - P/K), where r is growth rate and K is carrying capacity. Growth slows as P approaches K.'
  },
  {
    id: 'math302-final-q24',
    type: 'multiple_choice',
    prompt: 'In the logistic model dP/dt = rP(1 - P/K), the carrying capacity is:',
    options: [
      'K',
      'r',
      'rK',
      'r/K'
    ],
    correctAnswer: 'K',
    explanation: 'K is the carrying capacity, the maximum sustainable population. As P → K, dP/dt → 0.'
  },
  {
    id: 'math302-final-q25',
    type: 'multiple_choice',
    prompt: 'The simple exponential growth model dP/dt = rP has solution:',
    options: [
      'P(t) = P₀e^(rt)',
      'P(t) = P₀(1 + rt)',
      'P(t) = P₀/(1 + e^(-rt))',
      'P(t) = K(1 - e^(-rt))'
    ],
    correctAnswer: 'P(t) = P₀e^(rt)',
    explanation: 'The exponential model dP/dt = rP has solution P(t) = P₀e^(rt), showing unlimited exponential growth.'
  },
  // Topic 7: Applications - RLC Circuits
  {
    id: 'math302-final-q26',
    type: 'multiple_choice',
    prompt: 'For a series RLC circuit, the DE for charge Q is:',
    options: [
      'L(d²Q/dt²) + R(dQ/dt) + Q/C = E(t)',
      'L(dQ/dt) + RQ + Q/C = E(t)',
      'L(d²Q/dt²) + R(dQ/dt) + CQ = E(t)',
      'LQ + R(dQ/dt) + Q/C = E(t)'
    ],
    correctAnswer: 'L(d²Q/dt²) + R(dQ/dt) + Q/C = E(t)',
    explanation: 'Kirchhoff\'s voltage law gives L(d²Q/dt²) + R(dQ/dt) + Q/C = E(t), where L is inductance, R is resistance, C is capacitance, E(t) is voltage.'
  },
  {
    id: 'math302-final-q27',
    type: 'multiple_choice',
    prompt: 'In an RLC circuit, the current I is related to charge Q by:',
    options: [
      'I = dQ/dt',
      'I = Q',
      'I = d²Q/dt²',
      'I = ∫Q dt'
    ],
    correctAnswer: 'I = dQ/dt',
    explanation: 'Current is the rate of change of charge: I = dQ/dt.'
  },
  {
    id: 'math302-final-q28',
    type: 'multiple_choice',
    prompt: 'An LC circuit (R = 0) with no external voltage exhibits:',
    options: [
      'Simple harmonic oscillation',
      'Exponential decay',
      'Exponential growth',
      'Constant charge'
    ],
    correctAnswer: 'Simple harmonic oscillation',
    explanation: 'With R = 0 and E = 0, the equation becomes L(d²Q/dt²) + Q/C = 0, giving oscillatory solutions (simple harmonic motion).'
  },
  {
    id: 'math302-final-q29',
    type: 'multiple_choice',
    prompt: 'Overdamping in an RLC circuit occurs when:',
    options: [
      'R² > 4L/C',
      'R² < 4L/C',
      'R² = 4L/C',
      'R = 0'
    ],
    correctAnswer: 'R² > 4L/C',
    explanation: 'The characteristic equation gives distinct real roots (overdamping) when R² > 4L/C, causing the circuit to return to equilibrium without oscillating.'
  },
  {
    id: 'math302-final-q30',
    type: 'multiple_choice',
    prompt: 'Critical damping in an RLC circuit occurs when:',
    options: [
      'R² = 4L/C',
      'R² > 4L/C',
      'R² < 4L/C',
      'R = L = C'
    ],
    correctAnswer: 'R² = 4L/C',
    explanation: 'Critical damping occurs when R² = 4L/C, giving a repeated real root and the fastest return to equilibrium without oscillation.'
  },
  // Topic 7: Numerical Methods
  {
    id: 'math302-final-q31',
    type: 'multiple_choice',
    prompt: 'Euler\'s method for solving dy/dx = f(x, y) uses the approximation:',
    options: [
      'yₙ₊₁ = yₙ + h·f(xₙ, yₙ)',
      'yₙ₊₁ = yₙ + h·f(xₙ₊₁, yₙ₊₁)',
      'yₙ₊₁ = yₙ + h²·f(xₙ, yₙ)',
      'yₙ₊₁ = yₙ·f(xₙ, yₙ)'
    ],
    correctAnswer: 'yₙ₊₁ = yₙ + h·f(xₙ, yₙ)',
    explanation: 'Euler\'s method: yₙ₊₁ = yₙ + h·f(xₙ, yₙ), where h is step size. This approximates the solution using the tangent line.'
  },
  {
    id: 'math302-final-q32',
    type: 'multiple_choice',
    prompt: 'The improved Euler method (Heun\'s method) is:',
    options: [
      'A second-order Runge-Kutta method',
      'The same as standard Euler method',
      'A fourth-order method',
      'Only applicable to linear DEs'
    ],
    correctAnswer: 'A second-order Runge-Kutta method',
    explanation: 'The improved Euler (Heun\'s) method is a second-order Runge-Kutta method, using a predictor-corrector approach for better accuracy.'
  },
  {
    id: 'math302-final-q33',
    type: 'multiple_choice',
    prompt: 'The classical fourth-order Runge-Kutta method (RK4) uses how many evaluations of f per step?',
    options: [
      '4',
      '2',
      '1',
      '8'
    ],
    correctAnswer: '4',
    explanation: 'RK4 uses four evaluations of f (denoted k₁, k₂, k₃, k₄) per step to achieve fourth-order accuracy.'
  },
  {
    id: 'math302-final-q34',
    type: 'multiple_choice',
    prompt: 'The local truncation error of Euler\'s method is:',
    options: [
      'O(h²)',
      'O(h)',
      'O(h³)',
      'O(h⁴)'
    ],
    correctAnswer: 'O(h²)',
    explanation: 'Euler\'s method has local truncation error O(h²) and global error O(h), where h is the step size.'
  },
  {
    id: 'math302-final-q35',
    type: 'multiple_choice',
    prompt: 'Compared to Euler\'s method, RK4 is:',
    options: [
      'More accurate but requires more computation per step',
      'Less accurate but faster',
      'Equally accurate with same computational cost',
      'Only applicable to second-order DEs'
    ],
    correctAnswer: 'More accurate but requires more computation per step',
    explanation: 'RK4 has O(h⁴) local error vs. O(h²) for Euler, but requires 4 function evaluations per step instead of 1.'
  },
  // Additional Topic Coverage
  {
    id: 'math302-final-q36',
    type: 'multiple_choice',
    prompt: 'For the DE y\'\' + p(x)y\' + q(x)y = 0, if y₁ is a known solution, the second solution can be found using:',
    options: [
      'Reduction of order: y₂ = v(x)y₁',
      'Separation of variables',
      'Laplace transforms',
      'Power series only'
    ],
    correctAnswer: 'Reduction of order: y₂ = v(x)y₁',
    explanation: 'Reduction of order assumes y₂ = v(x)y₁, substitutes into the DE, and solves for v(x) to find the second linearly independent solution.'
  },
  {
    id: 'math302-final-q37',
    type: 'multiple_choice',
    prompt: 'The Dirac delta function δ(t - a) satisfies:',
    options: [
      '∫₀^∞ δ(t - a)f(t) dt = f(a) for a > 0',
      'δ(t - a) = 0 for all t',
      '∫₀^∞ δ(t - a) dt = 0',
      'δ(t - a) = 1 for all t'
    ],
    correctAnswer: '∫₀^∞ δ(t - a)f(t) dt = f(a) for a > 0',
    explanation: 'The Dirac delta has the sifting property: ∫₀^∞ δ(t - a)f(t) dt = f(a). Its Laplace transform is L{δ(t - a)} = e^(-as).'
  },
  {
    id: 'math302-final-q38',
    type: 'multiple_choice',
    prompt: 'A predator-prey model (Lotka-Volterra) is an example of:',
    options: [
      'A system of nonlinear first-order DEs',
      'A single second-order linear DE',
      'A separable equation',
      'An exact equation'
    ],
    correctAnswer: 'A system of nonlinear first-order DEs',
    explanation: 'The Lotka-Volterra equations form a system of two coupled nonlinear first-order DEs modeling predator and prey populations.'
  },
  {
    id: 'math302-final-q39',
    type: 'multiple_choice',
    prompt: 'The method of Frobenius is used when:',
    options: [
      'The DE has a regular singular point',
      'The DE has constant coefficients',
      'The DE is first-order',
      'The DE is linear with ordinary points everywhere'
    ],
    correctAnswer: 'The DE has a regular singular point',
    explanation: 'Frobenius method is specifically designed for DEs with regular singular points, where standard power series may fail.'
  },
  {
    id: 'math302-final-q40',
    type: 'multiple_choice',
    prompt: 'The Laplace transform L{t^n} equals:',
    options: [
      'n!/s^(n+1)',
      'n/s^n',
      's^n/n!',
      '1/s^n'
    ],
    correctAnswer: 'n!/s^(n+1)',
    explanation: 'L{t^n} = n!/s^(n+1) for n = 0, 1, 2, ... This can be derived by repeated integration by parts or from the gamma function.'
  },
  {
    id: 'math302-final-q41',
    type: 'multiple_choice',
    prompt: 'For a stable node in a phase portrait, the eigenvalues must be:',
    options: [
      'Real and both negative',
      'Real and both positive',
      'Complex with positive real part',
      'Pure imaginary'
    ],
    correctAnswer: 'Real and both negative',
    explanation: 'A stable node occurs when both eigenvalues are real and negative, causing all trajectories to approach the equilibrium point.'
  },
  {
    id: 'math302-final-q42',
    type: 'multiple_choice',
    prompt: 'A center (neutrally stable) occurs when eigenvalues are:',
    options: [
      'Pure imaginary (λ = ±bi)',
      'Real and positive',
      'Real and negative',
      'Complex with nonzero real part'
    ],
    correctAnswer: 'Pure imaginary (λ = ±bi)',
    explanation: 'A center occurs with purely imaginary eigenvalues λ = ±bi, creating closed elliptical trajectories around the equilibrium (neutrally stable).'
  }
];

export const math302Exams: Exam[] = [
  {
    id: 'math302-midterm',
    subjectId: 'math302',
    title: 'MATH302 Midterm Exam',
    questions: midtermQuestions
  },
  {
    id: 'math302-final',
    subjectId: 'math302',
    title: 'MATH302 Final Exam',
    questions: finalQuestions
  }
];
