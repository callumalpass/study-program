import type { Quiz, QuizQuestion } from '../../../core/types';

const questions: QuizQuestion[] = [
  // Topic 1: Complex Numbers - Quiz 1
  {
    id: 'math401-q1',
    type: 'multiple_choice',
    prompt: 'What is the modulus of the complex number z = 3 + 4i?',
    options: ['3', '4', '5', '7'],
    correctAnswer: '5',
    explanation: 'The modulus is |z| = √(3² + 4²) = √(9 + 16) = √25 = 5'
  },
  {
    id: 'math401-q2',
    type: 'multiple_choice',
    prompt: 'Express z = 1 + i in polar form.',
    options: ['√2 e^(iπ/4)', '2 e^(iπ/4)', 'e^(iπ/4)', '√2 e^(iπ/2)'],
    correctAnswer: '√2 e^(iπ/4)',
    explanation: 'r = |z| = √(1² + 1²) = √2, θ = arctan(1/1) = π/4, so z = √2 e^(iπ/4)'
  },
  {
    id: 'math401-q3',
    type: 'multiple_choice',
    prompt: 'What is the conjugate of z = 2 - 3i?',
    options: ['2 + 3i', '-2 + 3i', '-2 - 3i', '3 - 2i'],
    correctAnswer: '2 + 3i',
    explanation: 'The conjugate of a + bi is a - bi, so conjugate of 2 - 3i is 2 + 3i'
  },
  {
    id: 'math401-q4',
    type: 'true_false',
    prompt: 'The product of a complex number and its conjugate is always a real number.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'z·z̄ = (a + bi)(a - bi) = a² + b², which is always real'
  },
  {
    id: 'math401-q5',
    type: 'multiple_choice',
    prompt: 'Using De Moivre\'s theorem, what is (1 + i)^4?',
    options: ['-4', '4', '-4i', '4i'],
    correctAnswer: '-4',
    explanation: '1 + i = √2 e^(iπ/4), so (1 + i)^4 = (√2)^4 e^(i4π/4) = 4e^(iπ) = 4(-1) = -4'
  },

  // Topic 1: Complex Numbers - Quiz 2
  {
    id: 'math401-q6',
    type: 'multiple_choice',
    prompt: 'How many distinct 4th roots does the number 16 have in the complex plane?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '4',
    explanation: 'Every non-zero complex number has exactly n distinct nth roots. 16 has 4 distinct 4th roots: 2, -2, 2i, -2i'
  },
  {
    id: 'math401-q7',
    type: 'true_false',
    prompt: 'The set {z : |z - 1| < 2} is an open set in the complex plane.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'This is an open disk centered at 1 with radius 2, which is an open set'
  },
  {
    id: 'math401-q8',
    type: 'multiple_choice',
    prompt: 'On the Riemann sphere, what point corresponds to ∞ in the complex plane?',
    options: ['North pole', 'South pole', 'Equator', 'Origin'],
    correctAnswer: 'North pole',
    explanation: 'In stereographic projection, the north pole of the Riemann sphere corresponds to the point at infinity'
  },
  {
    id: 'math401-q9',
    type: 'multiple_choice',
    prompt: 'What is e^(iπ) equal to?',
    options: ['1', '-1', 'i', '-i'],
    correctAnswer: '-1',
    explanation: 'By Euler\'s formula: e^(iπ) = cos(π) + i·sin(π) = -1 + 0i = -1'
  },
  {
    id: 'math401-q10',
    type: 'multiple_choice',
    prompt: 'Which set is the boundary of the open disk D = {z : |z| < 1}?',
    options: ['{z : |z| = 1}', '{z : |z| ≤ 1}', '{z : |z| > 1}', '∅'],
    correctAnswer: '{z : |z| = 1}',
    explanation: 'The boundary consists of points that are limits of both interior and exterior points: the unit circle'
  },

  // Topic 2: Analytic Functions - Quiz 1
  {
    id: 'math401-q11',
    type: 'multiple_choice',
    prompt: 'Which of the following is NOT a Cauchy-Riemann equation?',
    options: ['∂u/∂x = ∂v/∂y', '∂u/∂y = -∂v/∂x', '∂u/∂x = -∂v/∂y', '∂v/∂x = -∂u/∂y'],
    correctAnswer: '∂u/∂x = -∂v/∂y',
    explanation: 'The Cauchy-Riemann equations are: ∂u/∂x = ∂v/∂y and ∂u/∂y = -∂v/∂x'
  },
  {
    id: 'math401-q12',
    type: 'true_false',
    prompt: 'Every analytic function is continuous.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'Analyticity implies differentiability, which implies continuity in complex analysis'
  },
  {
    id: 'math401-q13',
    type: 'multiple_choice',
    prompt: 'If f(z) = u + iv is analytic, what PDE does u satisfy?',
    options: ['∂²u/∂x² + ∂²u/∂y² = 0', '∂²u/∂x² - ∂²u/∂y² = 0', '∂u/∂x = ∂u/∂y', '∂²u/∂x∂y = 0'],
    correctAnswer: '∂²u/∂x² + ∂²u/∂y² = 0',
    explanation: 'The real and imaginary parts of an analytic function are harmonic: they satisfy Laplace\'s equation'
  },
  {
    id: 'math401-q14',
    type: 'multiple_choice',
    prompt: 'What is the derivative of f(z) = z²?',
    options: ['z', '2z', 'z²', '2'],
    correctAnswer: '2z',
    explanation: 'Using the power rule (which applies to analytic functions): d/dz(z²) = 2z'
  },
  {
    id: 'math401-q15',
    type: 'true_false',
    prompt: 'The function f(z) = z̄ (complex conjugate) is nowhere analytic.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'f(z) = z̄ does not satisfy the Cauchy-Riemann equations anywhere, so it is nowhere analytic'
  },

  // Topic 2: Analytic Functions - Quiz 2
  {
    id: 'math401-q16',
    type: 'multiple_choice',
    prompt: 'Which function is entire (analytic everywhere in ℂ)?',
    options: ['1/z', 'tan(z)', 'e^z', 'log(z)'],
    correctAnswer: 'e^z',
    explanation: 'e^z is entire (analytic everywhere). 1/z has a pole at 0, tan(z) has poles, log(z) has a branch cut'
  },
  {
    id: 'math401-q17',
    type: 'multiple_choice',
    prompt: 'What is the real part of f(z) = z³ where z = x + iy?',
    options: ['x³', 'x³ - 3xy²', 'x³ + 3xy²', '3x²y - y³'],
    correctAnswer: 'x³ - 3xy²',
    explanation: 'z³ = (x + iy)³ = x³ + 3x²(iy) + 3x(iy)² + (iy)³ = x³ - 3xy² + i(3x²y - y³), so Re(z³) = x³ - 3xy²'
  },
  {
    id: 'math401-q18',
    type: 'true_false',
    prompt: 'If f is analytic and |f| is constant, then f is constant.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'This is a consequence of the maximum modulus principle and Cauchy-Riemann equations'
  },
  {
    id: 'math401-q19',
    type: 'multiple_choice',
    prompt: 'The principal branch of log(z) has a branch cut along which ray?',
    options: ['Positive real axis', 'Negative real axis', 'Positive imaginary axis', 'Negative imaginary axis'],
    correctAnswer: 'Negative real axis',
    explanation: 'The principal branch is defined with argument in (-π, π], requiring a cut along the negative real axis'
  },
  {
    id: 'math401-q20',
    type: 'multiple_choice',
    prompt: 'What is sin(i)?',
    options: ['i sinh(1)', 'sinh(1)', 'i cosh(1)', 'cosh(1)'],
    correctAnswer: 'i sinh(1)',
    explanation: 'sin(iz) = i sinh(z), so sin(i) = i sinh(1)'
  },

  // Topic 3: Complex Integration - Quiz 1
  {
    id: 'math401-q21',
    type: 'multiple_choice',
    prompt: 'What is ∫_γ dz where γ is the unit circle traversed once counterclockwise?',
    options: ['0', '2πi', '1', '2π'],
    correctAnswer: '0',
    explanation: 'The antiderivative of 1 is z, and since γ is a closed curve, ∫_γ dz = z(end) - z(start) = 0'
  },
  {
    id: 'math401-q22',
    type: 'multiple_choice',
    prompt: 'What does the ML inequality estimate?',
    options: ['|∫_γ f| ≤ ML', '|∫_γ f| ≥ ML', '∫_γ |f| ≤ ML', '∫_γ f = ML'],
    correctAnswer: '|∫_γ f| ≤ ML',
    explanation: 'ML inequality: |∫_γ f(z)dz| ≤ ML where M = max|f| on γ and L = length of γ'
  },
  {
    id: 'math401-q23',
    type: 'true_false',
    prompt: 'The Cauchy-Goursat theorem states that the integral of an analytic function over a closed contour is zero.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'If f is analytic in a simply connected domain, then ∫_γ f(z)dz = 0 for any closed contour γ in that domain'
  },
  {
    id: 'math401-q24',
    type: 'multiple_choice',
    prompt: 'What is ∫_γ 1/z dz where γ is the unit circle counterclockwise?',
    options: ['0', 'πi', '2πi', '4πi'],
    correctAnswer: '2πi',
    explanation: 'This is a standard result: ∫_{|z|=1} dz/z = 2πi, related to the winding number'
  },
  {
    id: 'math401-q25',
    type: 'multiple_choice',
    prompt: 'If f is analytic on and inside a simple closed contour γ, what is the winding number n(γ, a) for any point a inside γ?',
    options: ['0', '1', '-1', '2'],
    correctAnswer: '1',
    explanation: 'For a simple closed contour traversed once counterclockwise, the winding number is 1 for interior points'
  },

  // Topic 3: Complex Integration - Quiz 2
  {
    id: 'math401-q26',
    type: 'true_false',
    prompt: 'If f has an antiderivative on a domain D, then ∫_γ f(z)dz = 0 for all closed contours γ in D.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'If F\' = f, then ∫_γ f = F(end) - F(start) = 0 for closed γ'
  },
  {
    id: 'math401-q27',
    type: 'multiple_choice',
    prompt: 'Parameterize the line segment from 0 to 1 + i.',
    options: ['z(t) = t + it, t ∈ [0,1]', 'z(t) = (1+i)t, t ∈ [0,1]', 'z(t) = t(1-i), t ∈ [0,1]', 'z(t) = e^(it), t ∈ [0,π/4]'],
    correctAnswer: 'z(t) = (1+i)t, t ∈ [0,1]',
    explanation: 'Line from z₀ to z₁ is parameterized as z(t) = (1-t)z₀ + tz₁ = t(1+i) for t ∈ [0,1]'
  },
  {
    id: 'math401-q28',
    type: 'multiple_choice',
    prompt: 'If |f(z)| ≤ 3 on a contour γ of length 5, what is the ML inequality bound?',
    options: ['8', '15', '5', '3'],
    correctAnswer: '15',
    explanation: 'ML inequality gives |∫_γ f| ≤ ML = 3 × 5 = 15'
  },
  {
    id: 'math401-q29',
    type: 'true_false',
    prompt: 'Deformation of contours theorem: if f is analytic between two contours, their integrals are equal.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'Contours can be continuously deformed in regions where f is analytic without changing the integral'
  },
  {
    id: 'math401-q30',
    type: 'multiple_choice',
    prompt: 'What is ∫_γ z² dz where γ is any path from 0 to 1?',
    options: ['1/3', '1', '0', 'Depends on path'],
    correctAnswer: '1/3',
    explanation: 'z² is entire with antiderivative z³/3, so integral = [z³/3]₀¹ = 1/3, independent of path'
  },

  // Topic 4: Cauchy's Formula - Quiz 1
  {
    id: 'math401-q31',
    type: 'multiple_choice',
    prompt: 'Cauchy\'s integral formula: if f is analytic inside and on γ, what is (1/2πi)∫_γ f(z)/(z-a) dz?',
    options: ['f(a)', 'f\'(a)', '0', '2πif(a)'],
    correctAnswer: 'f(a)',
    explanation: 'Cauchy\'s integral formula: f(a) = (1/2πi)∫_γ f(z)/(z-a) dz for a inside γ'
  },
  {
    id: 'math401-q32',
    type: 'multiple_choice',
    prompt: 'What is f\'(a) using Cauchy\'s formula for derivatives?',
    options: ['(1/2πi)∫_γ f(z)/(z-a) dz', '(1/2πi)∫_γ f(z)/(z-a)² dz', '(2/2πi)∫_γ f(z)/(z-a)² dz', '∫_γ f(z)/(z-a) dz'],
    correctAnswer: '(1/2πi)∫_γ f(z)/(z-a)² dz',
    explanation: 'f\'(a) = (1/2πi)∫_γ f(z)/(z-a)² dz by Cauchy\'s formula for the first derivative'
  },
  {
    id: 'math401-q33',
    type: 'true_false',
    prompt: 'Liouville\'s theorem: every bounded entire function is constant.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'If f is entire and |f| ≤ M for all z, then f is constant. This is Liouville\'s theorem'
  },
  {
    id: 'math401-q34',
    type: 'multiple_choice',
    prompt: 'Which theorem states that a non-constant analytic function on a domain cannot have a local maximum of |f|?',
    options: ['Fundamental theorem', 'Maximum modulus principle', 'Liouville\'s theorem', 'Cauchy\'s theorem'],
    correctAnswer: 'Maximum modulus principle',
    explanation: 'The maximum modulus principle: |f| attains maximum on the boundary, not in the interior'
  },
  {
    id: 'math401-q35',
    type: 'multiple_choice',
    prompt: 'How many times differentiable is an analytic function?',
    options: ['Once', 'Twice', 'Finitely many', 'Infinitely many'],
    correctAnswer: 'Infinitely many',
    explanation: 'Analytic functions are infinitely differentiable (this follows from Cauchy\'s integral formula)'
  },

  // Topic 4: Cauchy's Formula - Quiz 2
  {
    id: 'math401-q36',
    type: 'multiple_choice',
    prompt: 'Morera\'s theorem is the converse of which theorem?',
    options: ['Liouville\'s', 'Cauchy-Goursat', 'Maximum modulus', 'Fundamental theorem of algebra'],
    correctAnswer: 'Cauchy-Goursat',
    explanation: 'Morera: if ∫_γ f = 0 for all closed γ, then f is analytic (converse of Cauchy-Goursat)'
  },
  {
    id: 'math401-q37',
    type: 'true_false',
    prompt: 'The fundamental theorem of algebra states that every non-constant polynomial has a root in ℂ.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'This is proven using Liouville\'s theorem: a polynomial without roots would give a bounded entire function 1/p(z)'
  },
  {
    id: 'math401-q38',
    type: 'multiple_choice',
    prompt: 'If f is analytic on the closed disk |z| ≤ 1 and |f(z)| ≤ 5 for |z| = 1, what can we say about |f(0)|?',
    options: ['|f(0)| = 5', '|f(0)| > 5', '|f(0)| ≤ 5', '|f(0)| ≥ 5'],
    correctAnswer: '|f(0)| ≤ 5',
    explanation: 'By maximum modulus principle, maximum is on boundary, so |f(0)| ≤ max_{|z|=1}|f(z)| ≤ 5'
  },
  {
    id: 'math401-q39',
    type: 'multiple_choice',
    prompt: 'What is the nth derivative f^(n)(a) using Cauchy\'s formula?',
    options: ['(n!/2πi)∫_γ f(z)/(z-a)^n dz', '(n!/2πi)∫_γ f(z)/(z-a)^(n+1) dz', '(1/2πi)∫_γ f(z)/(z-a)^n dz', '∫_γ f(z)/(z-a)^(n+1) dz'],
    correctAnswer: '(n!/2πi)∫_γ f(z)/(z-a)^(n+1) dz',
    explanation: 'General Cauchy formula: f^(n)(a) = (n!/2πi)∫_γ f(z)/(z-a)^(n+1) dz'
  },
  {
    id: 'math401-q40',
    type: 'true_false',
    prompt: 'Cauchy\'s inequality: if |f| ≤ M on |z-a| = R, then |f^(n)(a)| ≤ n!M/R^n.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'Cauchy\'s inequality bounds derivatives in terms of maximum modulus on circles'
  },

  // Topic 5: Power Series - Quiz 1
  {
    id: 'math401-q41',
    type: 'multiple_choice',
    prompt: 'What is the radius of convergence of Σ(z^n/n!)?',
    options: ['0', '1', 'e', '∞'],
    correctAnswer: '∞',
    explanation: 'This is the series for e^z, which is entire. Using ratio test: lim(1/(n+1)!) / (1/n!) = 0, so R = ∞'
  },
  {
    id: 'math401-q42',
    type: 'multiple_choice',
    prompt: 'The Taylor series of f around a has radius R. What is R?',
    options: ['Distance to nearest pole', 'Distance to nearest zero', '1', '∞'],
    correctAnswer: 'Distance to nearest pole',
    explanation: 'The radius of convergence is the distance from the center to the nearest singularity'
  },
  {
    id: 'math401-q43',
    type: 'true_false',
    prompt: 'A Laurent series can have both positive and negative powers of (z - a).',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'Laurent series: f(z) = Σ_{n=-∞}^∞ aₙ(z-a)^n, including negative powers'
  },
  {
    id: 'math401-q44',
    type: 'multiple_choice',
    prompt: 'What type of singularity does f(z) = 1/z have at z = 0?',
    options: ['Removable', 'Pole of order 1', 'Pole of order 2', 'Essential'],
    correctAnswer: 'Pole of order 1',
    explanation: 'f(z) = 1/z has Laurent series with leading term z^(-1), so it\'s a simple pole'
  },
  {
    id: 'math401-q45',
    type: 'multiple_choice',
    prompt: 'A removable singularity at z = a means that lim_{z→a} f(z) is:',
    options: ['0', '∞', 'Finite', 'Undefined'],
    correctAnswer: 'Finite',
    explanation: 'Removable singularity: limit exists and is finite, allowing f to be extended continuously'
  },

  // Topic 5: Power Series - Quiz 2
  {
    id: 'math401-q46',
    type: 'multiple_choice',
    prompt: 'What type of singularity does f(z) = e^(1/z) have at z = 0?',
    options: ['Removable', 'Pole', 'Essential', 'None'],
    correctAnswer: 'Essential',
    explanation: 'e^(1/z) = Σ(1/(n!z^n)) has infinitely many negative powers, so z = 0 is an essential singularity'
  },
  {
    id: 'math401-q47',
    type: 'true_false',
    prompt: 'The Laurent series is unique for a given annular region.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'For a given function and annular region, the Laurent series coefficients are uniquely determined'
  },
  {
    id: 'math401-q48',
    type: 'multiple_choice',
    prompt: 'Analytic continuation extends a function beyond its:',
    options: ['Domain of analyticity', 'Range', 'Zeros', 'Poles'],
    correctAnswer: 'Domain of analyticity',
    explanation: 'Analytic continuation extends an analytic function to a larger domain while preserving analyticity'
  },
  {
    id: 'math401-q49',
    type: 'multiple_choice',
    prompt: 'What is the order of the pole of f(z) = 1/(z²(z-1)) at z = 0?',
    options: ['1', '2', '3', '0'],
    correctAnswer: '2',
    explanation: 'Near z = 0: f(z) ≈ 1/z² × 1/(0-1) = -1/z², so pole of order 2'
  },
  {
    id: 'math401-q50',
    type: 'true_false',
    prompt: 'Within the radius of convergence, a power series can be differentiated term by term.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'Power series can be differentiated term by term within their radius of convergence'
  },

  // Topic 6: Residues - Quiz 1
  {
    id: 'math401-q51',
    type: 'multiple_choice',
    prompt: 'What is the residue of f(z) = 1/z at z = 0?',
    options: ['0', '1', '-1', '2πi'],
    correctAnswer: '1',
    explanation: 'f(z) = 1/z has Laurent series 1/z, so the coefficient of z^(-1) (the residue) is 1'
  },
  {
    id: 'math401-q52',
    type: 'multiple_choice',
    prompt: 'The residue theorem: ∫_γ f(z)dz = 2πi × what?',
    options: ['Sum of residues inside γ', 'Product of residues', 'Largest residue', 'Number of poles'],
    correctAnswer: 'Sum of residues inside γ',
    explanation: 'Residue theorem: ∫_γ f = 2πi Σ Res(f, aₖ) where aₖ are poles inside γ'
  },
  {
    id: 'math401-q53',
    type: 'true_false',
    prompt: 'The residue at a simple pole z = a is lim_{z→a} (z-a)f(z).',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'For a simple pole, Res(f, a) = lim_{z→a} (z-a)f(z)'
  },
  {
    id: 'math401-q54',
    type: 'multiple_choice',
    prompt: 'What is ∫_{-∞}^∞ dx/(1+x²) using residues?',
    options: ['π/2', 'π', '2π', 'π/4'],
    correctAnswer: 'π',
    explanation: 'f(z) = 1/(1+z²) has poles at ±i. Using residue at i in upper half-plane: 2πi × (1/2i) = π'
  },
  {
    id: 'math401-q55',
    type: 'multiple_choice',
    prompt: 'For f(z) = g(z)/h(z) with h(a) = 0, h\'(a) ≠ 0, what is Res(f, a)?',
    options: ['g(a)/h(a)', 'g(a)/h\'(a)', 'g\'(a)/h\'(a)', '0'],
    correctAnswer: 'g(a)/h\'(a)',
    explanation: 'For simple pole at zero of denominator: Res(g/h, a) = g(a)/h\'(a)'
  },

  // Topic 6: Residues - Quiz 2
  {
    id: 'math401-q56',
    type: 'multiple_choice',
    prompt: 'The residue at a pole of order n is found using which derivative?',
    options: ['0th', '1st', '(n-1)th', 'nth'],
    correctAnswer: '(n-1)th',
    explanation: 'Res(f, a) = (1/(n-1)!) lim_{z→a} d^(n-1)/dz^(n-1) [(z-a)^n f(z)]'
  },
  {
    id: 'math401-q57',
    type: 'true_false',
    prompt: 'Jordan\'s lemma helps evaluate improper integrals involving e^(iaz) by showing semicircular contributions vanish.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'Jordan\'s lemma: if f→0 on semicircle and a>0, then ∫_{C_R} f·e^(iaz) → 0 as R→∞'
  },
  {
    id: 'math401-q58',
    type: 'multiple_choice',
    prompt: 'What contour is typically used for integrals like ∫_0^∞ log(x)/(1+x²) dx?',
    options: ['Semicircle', 'Rectangle', 'Keyhole', 'Triangle'],
    correctAnswer: 'Keyhole',
    explanation: 'Keyhole contour avoids branch cut of logarithm, allowing evaluation of such integrals'
  },
  {
    id: 'math401-q59',
    type: 'multiple_choice',
    prompt: 'Principal value integrals handle singularities on the real axis by:',
    options: ['Ignoring them', 'Indenting around them', 'Removing them', 'Changing variables'],
    correctAnswer: 'Indenting around them',
    explanation: 'P.V. uses small semicircular indents around real axis singularities'
  },
  {
    id: 'math401-q60',
    type: 'true_false',
    prompt: 'Residue theory can be used to sum certain infinite series.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'Functions like π cot(πz) have poles at integers, allowing series summation via residues'
  },

  // Topic 7: Conformal Maps - Quiz 1
  {
    id: 'math401-q61',
    type: 'true_false',
    prompt: 'A conformal map preserves angles between curves.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'Conformal maps preserve both magnitude and orientation of angles'
  },
  {
    id: 'math401-q62',
    type: 'multiple_choice',
    prompt: 'If f is analytic at z₀ and f\'(z₀) ≠ 0, then f is:',
    options: ['Constant', 'Conformal at z₀', 'Zero', 'Unbounded'],
    correctAnswer: 'Conformal at z₀',
    explanation: 'Analytic with non-zero derivative implies conformal'
  },
  {
    id: 'math401-q63',
    type: 'multiple_choice',
    prompt: 'A Möbius transformation has the form:',
    options: ['f(z) = az + b', 'f(z) = z²', 'f(z) = (az+b)/(cz+d)', 'f(z) = e^z'],
    correctAnswer: 'f(z) = (az+b)/(cz+d)',
    explanation: 'Möbius transformation: f(z) = (az+b)/(cz+d) with ad-bc ≠ 0'
  },
  {
    id: 'math401-q64',
    type: 'true_false',
    prompt: 'Möbius transformations map circles to circles (including lines as circles through ∞).',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'Möbius maps preserve the family of circles and lines (generalized circles)'
  },
  {
    id: 'math401-q65',
    type: 'multiple_choice',
    prompt: 'How many points are needed to uniquely determine a Möbius transformation?',
    options: ['1', '2', '3', '4'],
    correctAnswer: '3',
    explanation: 'A Möbius transformation is uniquely determined by specifying the images of three points'
  },

  // Topic 7: Conformal Maps - Quiz 2
  {
    id: 'math401-q66',
    type: 'multiple_choice',
    prompt: 'The function w = z² maps the upper half-plane to:',
    options: ['Upper half-plane', 'Full plane', 'Unit disk', 'Right half-plane'],
    correctAnswer: 'Full plane',
    explanation: 'z² doubles angles, so upper half-plane (angle π) maps to full plane (angle 2π), minus negative real axis'
  },
  {
    id: 'math401-q67',
    type: 'multiple_choice',
    prompt: 'The exponential map w = e^z sends vertical lines to:',
    options: ['Circles', 'Rays', 'Lines', 'Spirals'],
    correctAnswer: 'Circles',
    explanation: 'Vertical line x = c maps to |w| = e^c (circle centered at origin)'
  },
  {
    id: 'math401-q68',
    type: 'true_false',
    prompt: 'The Riemann Mapping Theorem states that any simply connected domain (except ℂ) can be conformally mapped to the unit disk.',
    options: ['True', 'False'],
    correctAnswer: 'True',
    explanation: 'This is the statement of the Riemann Mapping Theorem'
  },
  {
    id: 'math401-q69',
    type: 'multiple_choice',
    prompt: 'Schwarz-Christoffel formula maps the upper half-plane to:',
    options: ['Circle', 'Polygon', 'Ellipse', 'Annulus'],
    correctAnswer: 'Polygon',
    explanation: 'Schwarz-Christoffel provides explicit formula for conformal maps to polygonal regions'
  },
  {
    id: 'math401-q70',
    type: 'multiple_choice',
    prompt: 'Which physical problem is NOT typically solved using conformal mapping?',
    options: ['Electrostatics', 'Fluid flow', 'Heat conduction', 'Quantum tunneling'],
    correctAnswer: 'Quantum tunneling',
    explanation: 'Conformal mapping solves 2D Laplace equation problems: electrostatics, fluid flow, heat conduction. Quantum tunneling involves different equations'
  },
];

export const math401Quizzes: Quiz[] = [
  {
    id: 'math401-quiz-1',
    subjectId: 'math401',
    topicId: 'math401-topic-1',
    title: 'Complex Numbers Fundamentals',
    questions: questions.slice(0, 10),
  },
  {
    id: 'math401-quiz-2',
    subjectId: 'math401',
    topicId: 'math401-topic-2',
    title: 'Analytic Functions',
    questions: questions.slice(10, 20),
  },
  {
    id: 'math401-quiz-3',
    subjectId: 'math401',
    topicId: 'math401-topic-3',
    title: 'Complex Integration',
    questions: questions.slice(20, 30),
  },
  {
    id: 'math401-quiz-4',
    subjectId: 'math401',
    topicId: 'math401-topic-4',
    title: 'Cauchy\'s Formula and Applications',
    questions: questions.slice(30, 40),
  },
  {
    id: 'math401-quiz-5',
    subjectId: 'math401',
    topicId: 'math401-topic-5',
    title: 'Power Series and Laurent Series',
    questions: questions.slice(40, 50),
  },
  {
    id: 'math401-quiz-6',
    subjectId: 'math401',
    topicId: 'math401-topic-6',
    title: 'Residue Theory',
    questions: questions.slice(50, 60),
  },
  {
    id: 'math401-quiz-7',
    subjectId: 'math401',
    topicId: 'math401-topic-7',
    title: 'Conformal Mappings',
    questions: questions.slice(60, 70),
  },
];
