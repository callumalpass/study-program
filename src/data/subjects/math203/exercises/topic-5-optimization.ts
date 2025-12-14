import type { WrittenExercise } from '../../../../core/types';

export const topic5Exercises: WrittenExercise[] = [
  // --- DRILLS ---
  {
    id: 'math203-t5-drill-1',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Identifying Objective Function',
    description: 'A farmer wants to maximize the area of a rectangular pen with 100 m of fencing. What is the objective function to maximize?',
    hints: ['Area of rectangle = length × width.'],
    solution: 'If the sides are $x$ and $y$ with constraint $2x + 2y = 100$, then $y = 50 - x$ and the objective function is $A = xy = x(50 - x) = 50x - x^2$.'
  },
  {
    id: 'math203-t5-drill-2',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Setting Up Constraint',
    description: 'Write the constraint equation: A box with a square base and open top has surface area 300 cm². Let $x$ = side of base, $h$ = height.',
    hints: ['Surface area = base + 4 sides (no top).'],
    solution: 'Surface area $= x^2 + 4xh = 300$'
  },
  {
    id: 'math203-t5-drill-3',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Critical Point Check',
    description: 'If $A(x) = 100x - x^2$ for $0 < x < 100$, find the value of $x$ that maximizes $A$.',
    hints: ['Set A\'(x) = 0.'],
    solution: '$A\'(x) = 100 - 2x = 0 \\Rightarrow x = 50$\n$A\'\'(x) = -2 < 0$, confirming maximum at $x = 50$.'
  },
  {
    id: 'math203-t5-drill-4',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Verify Domain',
    description: 'If $x$ is the length of one side of a rectangle with perimeter 20, what is the domain for $x$?',
    hints: ['Both sides must be positive.'],
    solution: 'With perimeter $2x + 2y = 20$, we have $y = 10 - x$.\nFor both $x > 0$ and $y > 0$: $x > 0$ and $10 - x > 0$, so $0 < x < 10$.'
  },

  // --- CORE EXERCISES ---
  {
    id: 'math203-t5-ex01',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    type: 'written',
    difficulty: 2,
    title: 'Maximum Area Rectangle',
    description: 'A farmer has 400 meters of fencing to enclose a rectangular field. What dimensions will maximize the enclosed area?',
    hints: [
      'Let x = length, y = width.',
      'Constraint: 2x + 2y = 400.',
      'Objective: Maximize A = xy.'
    ],
    solution: `**Variables:** $x$ = length, $y$ = width

**Constraint:** $2x + 2y = 400 \\Rightarrow y = 200 - x$

**Objective:** $A = xy = x(200 - x) = 200x - x^2$

**Domain:** $0 < x < 200$

**Optimize:**
$A'(x) = 200 - 2x = 0 \\Rightarrow x = 100$
$A''(x) = -2 < 0$ ✓ (confirms maximum)

**Solution:** $x = 100$ m, $y = 100$ m

**The field should be a square with sides of 100 m.**
Maximum area: $A = 10,000$ m²`
  },
  {
    id: 'math203-t5-ex02',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    type: 'written',
    difficulty: 2,
    title: 'Minimum Perimeter',
    description: 'A rectangular garden must have an area of 1600 m². What dimensions minimize the amount of fencing needed (perimeter)?',
    hints: [
      'Constraint: xy = 1600.',
      'Objective: Minimize P = 2x + 2y.',
      'Express P in terms of one variable.'
    ],
    solution: `**Variables:** $x$ = length, $y$ = width

**Constraint:** $xy = 1600 \\Rightarrow y = \\frac{1600}{x}$

**Objective:** $P = 2x + 2y = 2x + \\frac{3200}{x}$

**Domain:** $x > 0$

**Optimize:**
$P'(x) = 2 - \\frac{3200}{x^2} = 0$
$x^2 = 1600 \\Rightarrow x = 40$ (positive)

$P''(x) = \\frac{6400}{x^3} > 0$ for $x > 0$ ✓ (confirms minimum)

**Solution:** $x = 40$ m, $y = 40$ m

**The garden should be a 40 m × 40 m square.**
Minimum perimeter: $P = 160$ m`
  },
  {
    id: 'math203-t5-ex03',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    type: 'written',
    difficulty: 3,
    title: 'Box with Maximum Volume',
    description: 'An open-top box is made from a 24 cm × 24 cm square of cardboard by cutting squares of side $x$ from each corner and folding up the sides. Find the value of $x$ that maximizes the volume.',
    hints: [
      'After cutting, the base is (24-2x) × (24-2x).',
      'Height of the box is x.',
      'Domain: 0 < x < 12.'
    ],
    solution: `**Setup:** After cutting squares of side $x$ from corners:
- Base: $(24 - 2x) \\times (24 - 2x)$
- Height: $x$

**Objective:** $V = x(24 - 2x)^2$

**Domain:** $0 < x < 12$

**Expand and differentiate:**
$V = x(576 - 96x + 4x^2) = 4x^3 - 96x^2 + 576x$
$V'(x) = 12x^2 - 192x + 576 = 12(x^2 - 16x + 48) = 12(x - 4)(x - 12)$

**Critical points:** $x = 4$ and $x = 12$

Only $x = 4$ is in the domain $(0, 12)$.

**Verify:** $V''(x) = 24x - 192$, $V''(4) = 96 - 192 = -96 < 0$ ✓

**Solution:** Cut squares of side $x = 4$ cm.
Maximum volume: $V = 4(16)^2 = 1024$ cm³`
  },
  {
    id: 'math203-t5-ex04',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    type: 'written',
    difficulty: 3,
    title: 'Minimum Surface Area Cylinder',
    description: 'A cylindrical can must hold 1000 cm³ of liquid. Find the dimensions that minimize the amount of material used (surface area of top, bottom, and sides).',
    hints: [
      'Volume: πr²h = 1000.',
      'Surface area: 2πr² + 2πrh.',
      'Express h in terms of r.'
    ],
    solution: `**Variables:** $r$ = radius, $h$ = height

**Constraint:** $\\pi r^2 h = 1000 \\Rightarrow h = \\frac{1000}{\\pi r^2}$

**Objective:** $S = 2\\pi r^2 + 2\\pi rh = 2\\pi r^2 + 2\\pi r \\cdot \\frac{1000}{\\pi r^2}$
$S = 2\\pi r^2 + \\frac{2000}{r}$

**Domain:** $r > 0$

**Optimize:**
$S'(r) = 4\\pi r - \\frac{2000}{r^2} = 0$
$4\\pi r = \\frac{2000}{r^2}$
$r^3 = \\frac{500}{\\pi}$
$r = \\sqrt[3]{\\frac{500}{\\pi}} \\approx 5.42$ cm

$h = \\frac{1000}{\\pi r^2} = \\frac{1000}{\\pi \\cdot (500/\\pi)^{2/3}} = \\frac{1000 \\cdot \\pi^{-1/3}}{500^{2/3}}$

Simplifying: $h = 2r$ (the height equals the diameter!)

**Solution:** $r \\approx 5.42$ cm, $h \\approx 10.84$ cm`
  },
  {
    id: 'math203-t5-ex05',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    type: 'written',
    difficulty: 3,
    title: 'Closest Point on a Curve',
    description: 'Find the point on the parabola $y = x^2$ that is closest to the point $(3, 0)$.',
    hints: [
      'Distance from (x, x²) to (3, 0) is √[(x-3)² + x⁴].',
      'Minimize D² instead of D (easier calculus).',
      'Set derivative equal to zero and solve.'
    ],
    solution: `**Point on parabola:** $(x, x^2)$

**Distance squared:** $D^2 = (x - 3)^2 + (x^2 - 0)^2 = (x-3)^2 + x^4$

**Objective:** Minimize $f(x) = (x-3)^2 + x^4$

**Optimize:**
$f'(x) = 2(x-3) + 4x^3 = 2x - 6 + 4x^3 = 0$
$4x^3 + 2x - 6 = 0$
$2x^3 + x - 3 = 0$

Testing $x = 1$: $2 + 1 - 3 = 0$ ✓

Factor: $(x - 1)(2x^2 + 2x + 3) = 0$

The quadratic $2x^2 + 2x + 3$ has discriminant $4 - 24 < 0$, so no real roots.

**Solution:** $x = 1$, so $y = 1$.

**Closest point: $(1, 1)$**

Distance: $D = \\sqrt{(1-3)^2 + 1^2} = \\sqrt{5}$`
  },
  {
    id: 'math203-t5-ex06',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    type: 'written',
    difficulty: 3,
    title: 'Maximum Profit',
    description: 'A company\'s profit from selling $x$ units is $P(x) = -0.01x^2 + 50x - 10000$. Find the production level that maximizes profit and the maximum profit.',
    hints: [
      'This is a parabola opening downward.',
      'Maximum at vertex.',
      'Set P\'(x) = 0.'
    ],
    solution: `**Objective:** $P(x) = -0.01x^2 + 50x - 10000$

**Optimize:**
$P'(x) = -0.02x + 50 = 0$
$x = \\frac{50}{0.02} = 2500$

**Verify:** $P''(x) = -0.02 < 0$ ✓ (maximum)

**Maximum profit:**
$P(2500) = -0.01(6250000) + 50(2500) - 10000$
$= -62500 + 125000 - 10000$
$= 52500$

**Produce 2500 units for a maximum profit of $52,500.**`
  },
  {
    id: 'math203-t5-ex07',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    type: 'written',
    difficulty: 3,
    title: 'Fencing with River',
    description: 'A rectangular field is bounded on one side by a river and on the other three sides by 1000 m of fencing. What dimensions maximize the area?',
    hints: [
      'Only three sides need fencing.',
      'Let x = side perpendicular to river, y = side parallel to river.',
      'Constraint: 2x + y = 1000.'
    ],
    solution: `**Variables:** $x$ = perpendicular sides (2 of them), $y$ = parallel to river (1 side)

**Constraint:** $2x + y = 1000 \\Rightarrow y = 1000 - 2x$

**Objective:** $A = xy = x(1000 - 2x) = 1000x - 2x^2$

**Domain:** $0 < x < 500$

**Optimize:**
$A'(x) = 1000 - 4x = 0 \\Rightarrow x = 250$
$A''(x) = -4 < 0$ ✓

**Solution:** $x = 250$ m, $y = 500$ m

**Dimensions: 250 m × 500 m (with 500 m side along river)**
Maximum area: $A = 125,000$ m²`
  },
  {
    id: 'math203-t5-ex08',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    type: 'written',
    difficulty: 3,
    title: 'Maximum Area Triangle',
    description: 'A right triangle has a hypotenuse of length 10. Find the lengths of the legs that maximize the area.',
    hints: [
      'If legs are a and b, then a² + b² = 100.',
      'Area = (1/2)ab.',
      'Express b in terms of a (or use implicit differentiation).'
    ],
    solution: `**Variables:** legs $a$ and $b$

**Constraint:** $a^2 + b^2 = 100 \\Rightarrow b = \\sqrt{100 - a^2}$

**Objective:** $A = \\frac{1}{2}ab = \\frac{1}{2}a\\sqrt{100 - a^2}$

**Domain:** $0 < a < 10$

**Optimize** (easier to maximize $A^2$):
$A^2 = \\frac{1}{4}a^2(100 - a^2) = 25a^2 - \\frac{1}{4}a^4$

$\\frac{d(A^2)}{da} = 50a - a^3 = a(50 - a^2) = 0$
$a = \\sqrt{50} = 5\\sqrt{2}$ (positive solution)

Then $b = \\sqrt{100 - 50} = \\sqrt{50} = 5\\sqrt{2}$

**Solution:** Both legs have length $5\\sqrt{2} \\approx 7.07$.

The maximum area right triangle with hypotenuse 10 is **isoceles**.
Maximum area: $A = \\frac{1}{2}(5\\sqrt{2})^2 = 25$`
  },
  {
    id: 'math203-t5-ex09',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    type: 'written',
    difficulty: 4,
    title: 'Minimum Cost Container',
    description: 'A rectangular box with a square base and open top must have a volume of 32,000 cm³. The material for the base costs $0.20 per cm² and the material for the sides costs $0.10 per cm². Find the dimensions that minimize the total cost.',
    hints: [
      'Let x = side of square base, h = height.',
      'Volume: x²h = 32000.',
      'Cost = 0.20x² + 0.10(4xh).'
    ],
    solution: `**Variables:** $x$ = base side, $h$ = height

**Constraint:** $x^2 h = 32000 \\Rightarrow h = \\frac{32000}{x^2}$

**Objective (Cost):**
$C = 0.20x^2 + 0.10(4xh) = 0.20x^2 + 0.40xh$
$C = 0.20x^2 + 0.40x \\cdot \\frac{32000}{x^2} = 0.20x^2 + \\frac{12800}{x}$

**Domain:** $x > 0$

**Optimize:**
$C'(x) = 0.40x - \\frac{12800}{x^2} = 0$
$0.40x = \\frac{12800}{x^2}$
$x^3 = 32000$
$x = \\sqrt[3]{32000} = 20\\sqrt[3]{4} \\approx 31.75$ cm

Wait, let me recalculate:
$x^3 = \\frac{12800}{0.40} = 32000$
$x = \\sqrt[3]{32000} = 20 \\cdot \\sqrt[3]{4}$

Actually: $32000 = 32 \\times 1000$, and $\\sqrt[3]{32000} = \\sqrt[3]{32} \\cdot 10 = 3.17... \\times 10 \\approx 31.7$

$h = \\frac{32000}{x^2} = \\frac{32000}{(31.75)^2} \\approx 31.75$ cm

**Solution:** Base side $x \\approx 31.75$ cm, height $h \\approx 31.75$ cm

Interestingly, the box is nearly cubic despite different costs!`
  },
  {
    id: 'math203-t5-ex10',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    type: 'written',
    difficulty: 3,
    title: 'Maximum Rectangle Under a Curve',
    description: 'Find the dimensions of the largest rectangle that can be inscribed under the curve $y = 4 - x^2$ with its base on the x-axis.',
    hints: [
      'By symmetry, the rectangle extends from -x to x.',
      'The width is 2x and height is y = 4 - x².',
      'Maximize area A = 2x(4 - x²).'
    ],
    solution: `**Setup:** Rectangle from $(-x, 0)$ to $(x, 0)$ to $(x, y)$ to $(-x, y)$
where $y = 4 - x^2$

**Objective:** $A = (2x) \\cdot (4 - x^2) = 8x - 2x^3$

**Domain:** $0 < x < 2$ (where the parabola is above x-axis)

**Optimize:**
$A'(x) = 8 - 6x^2 = 0$
$x^2 = \\frac{4}{3}$
$x = \\frac{2}{\\sqrt{3}} = \\frac{2\\sqrt{3}}{3}$

$A''(x) = -12x < 0$ for $x > 0$ ✓

**Dimensions:**
Width: $2x = \\frac{4\\sqrt{3}}{3} \\approx 2.31$
Height: $y = 4 - \\frac{4}{3} = \\frac{8}{3} \\approx 2.67$

**Maximum area:** $A = \\frac{4\\sqrt{3}}{3} \\cdot \\frac{8}{3} = \\frac{32\\sqrt{3}}{9} \\approx 6.16$`
  },
  {
    id: 'math203-t5-ex11',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    type: 'written',
    difficulty: 3,
    title: 'Minimum Distance',
    description: 'Find the point on the line $y = 2x + 3$ that is closest to the origin.',
    hints: [
      'Distance from (x, 2x+3) to origin is √[x² + (2x+3)²].',
      'Minimize D² = x² + (2x+3)².',
      'Or use the formula for distance from point to line.'
    ],
    solution: `**Point on line:** $(x, 2x + 3)$

**Distance squared:** $D^2 = x^2 + (2x + 3)^2 = x^2 + 4x^2 + 12x + 9 = 5x^2 + 12x + 9$

**Optimize:**
$\\frac{d(D^2)}{dx} = 10x + 12 = 0$
$x = -\\frac{6}{5}$

$y = 2(-\\frac{6}{5}) + 3 = -\\frac{12}{5} + \\frac{15}{5} = \\frac{3}{5}$

**Closest point:** $\\left(-\\frac{6}{5}, \\frac{3}{5}\\right)$

**Minimum distance:** $D = \\sqrt{\\frac{36}{25} + \\frac{9}{25}} = \\sqrt{\\frac{45}{25}} = \\frac{3\\sqrt{5}}{5}$

*Alternative:* Using distance formula: $d = \\frac{|Ax_0 + By_0 + C|}{\\sqrt{A^2 + B^2}}$
Line: $2x - y + 3 = 0$, point $(0, 0)$:
$d = \\frac{|0 - 0 + 3|}{\\sqrt{4 + 1}} = \\frac{3}{\\sqrt{5}} = \\frac{3\\sqrt{5}}{5}$ ✓`
  },
  {
    id: 'math203-t5-ex12',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    type: 'written',
    difficulty: 4,
    title: 'Cone of Maximum Volume',
    description: 'A cone is inscribed in a sphere of radius $R$. Find the ratio of the height to the radius of the cone that maximizes its volume.',
    hints: [
      'Place sphere centered at origin.',
      'If apex is at top of sphere, apex at (0, R).',
      'Base circle at height y, with radius r where r² + y² = R².'
    ],
    solution: `**Setup:** Sphere centered at origin with radius $R$.
Cone with apex at $(0, R)$, base at height $y$ (where $-R \\leq y < R$).

At height $y$, the sphere has radius $r = \\sqrt{R^2 - y^2}$.
Cone height: $h = R - y$

**Objective:** $V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi (R^2 - y^2)(R - y)$

Let $u = R - y$ (so $y = R - u$ and $R^2 - y^2 = R^2 - (R-u)^2 = 2Ru - u^2$):
$V = \\frac{\\pi}{3}(2Ru - u^2)u = \\frac{\\pi}{3}(2Ru^2 - u^3)$

**Optimize:**
$V'(u) = \\frac{\\pi}{3}(4Ru - 3u^2) = \\frac{\\pi u}{3}(4R - 3u) = 0$
$u = \\frac{4R}{3}$ (taking positive value)

So $h = u = \\frac{4R}{3}$

$y = R - \\frac{4R}{3} = -\\frac{R}{3}$
$r = \\sqrt{R^2 - \\frac{R^2}{9}} = R\\sqrt{\\frac{8}{9}} = \\frac{2\\sqrt{2}R}{3}$

**Ratio:** $\\frac{h}{r} = \\frac{4R/3}{2\\sqrt{2}R/3} = \\frac{4}{2\\sqrt{2}} = \\sqrt{2}$`
  },
  {
    id: 'math203-t5-ex13',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    type: 'written',
    difficulty: 3,
    title: 'Optimal Pricing',
    description: 'A store sells 200 items per week at $50 each. For each $5 price reduction, 20 more items are sold per week. What price maximizes weekly revenue?',
    hints: [
      'Let x = number of $5 reductions.',
      'Price = 50 - 5x, Quantity = 200 + 20x.',
      'Revenue = Price × Quantity.'
    ],
    solution: `**Variables:** Let $x$ = number of $5 reductions

**Price:** $p = 50 - 5x$
**Quantity:** $q = 200 + 20x$

**Revenue:** $R = pq = (50 - 5x)(200 + 20x)$
$R = 10000 + 1000x - 1000x - 100x^2 = 10000 - 100x^2$

Wait, let me recalculate:
$R = 50(200) + 50(20x) - 5x(200) - 5x(20x)$
$= 10000 + 1000x - 1000x - 100x^2 = 10000 - 100x^2$

This is maximized at $x = 0$... Let me recheck.

Actually: $(50 - 5x)(200 + 20x) = 10000 + 1000x - 1000x - 100x^2$

The cross terms cancel! So revenue is maximized at $x = 0$.

**Hmm, this suggests no price reduction.** But let me verify the original model makes sense by trying a different approach.

$R = (50 - 5x)(200 + 20x)$
$R' = -5(200 + 20x) + (50 - 5x)(20) = -1000 - 100x + 1000 - 100x = -200x$

$R' = 0$ when $x = 0$.

**The maximum revenue is at the original price of $50.**
Maximum revenue: $R = 50 × 200 = $10,000`
  },
  {
    id: 'math203-t5-ex14',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    type: 'written',
    difficulty: 4,
    title: 'Pipeline Problem',
    description: 'An oil rig is 4 km offshore. A refinery is 8 km down the coast. Underwater pipe costs $1 million per km, and land pipe costs $500,000 per km. Where should the pipe come ashore to minimize cost?',
    hints: [
      'Let x = distance from the point on shore closest to the rig to where pipe comes ashore.',
      'Underwater distance: √(4² + x²) = √(16 + x²).',
      'Land distance: 8 - x.'
    ],
    solution: `**Variables:** Let $x$ = distance along shore from closest point to rig

**Underwater distance:** $\\sqrt{16 + x^2}$ km
**Land distance:** $(8 - x)$ km

**Cost (in millions):**
$C = 1 \\cdot \\sqrt{16 + x^2} + 0.5 \\cdot (8 - x)$
$C = \\sqrt{16 + x^2} + 4 - 0.5x$

**Domain:** $0 \\leq x \\leq 8$

**Optimize:**
$C'(x) = \\frac{x}{\\sqrt{16 + x^2}} - 0.5 = 0$
$\\frac{x}{\\sqrt{16 + x^2}} = 0.5$
$x = 0.5\\sqrt{16 + x^2}$
$x^2 = 0.25(16 + x^2)$
$x^2 = 4 + 0.25x^2$
$0.75x^2 = 4$
$x^2 = \\frac{16}{3}$
$x = \\frac{4}{\\sqrt{3}} = \\frac{4\\sqrt{3}}{3} \\approx 2.31$ km

**The pipe should come ashore approximately 2.31 km from the closest point to the rig.**

Minimum cost: $C = \\sqrt{16 + 16/3} + 4 - 0.5(4/\\sqrt{3}) \\approx \\$7.93$ million`
  },
  {
    id: 'math203-t5-ex15',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    type: 'written',
    difficulty: 3,
    title: 'Inscribed Rectangle in Circle',
    description: 'Find the dimensions of the rectangle of maximum area that can be inscribed in a circle of radius 5.',
    hints: [
      'Place circle at origin: x² + y² = 25.',
      'Rectangle with vertices at (±a, ±b).',
      'Constraint: a² + b² = 25.'
    ],
    solution: `**Setup:** Rectangle with vertices at $(\\pm a, \\pm b)$

**Constraint:** $a^2 + b^2 = 25$ (vertices on circle)

**Objective:** $A = (2a)(2b) = 4ab$

Using constraint: $b = \\sqrt{25 - a^2}$
$A = 4a\\sqrt{25 - a^2}$

**Optimize** (maximize $A^2 = 16a^2(25 - a^2) = 400a^2 - 16a^4$):
$\\frac{d(A^2)}{da} = 800a - 64a^3 = 0$
$a(800 - 64a^2) = 0$
$a^2 = \\frac{800}{64} = 12.5$
$a = \\sqrt{12.5} = \\frac{5}{\\sqrt{2}} = \\frac{5\\sqrt{2}}{2}$

By symmetry: $b = \\frac{5\\sqrt{2}}{2}$

**The rectangle is a square!**

**Dimensions:** $2a \\times 2b = 5\\sqrt{2} \\times 5\\sqrt{2}$

**Maximum area:** $A = 50$`
  },
  {
    id: 'math203-t5-ex16',
    subjectId: 'math203',
    topicId: 'math203-topic-5',
    type: 'written',
    difficulty: 4,
    title: 'Norman Window',
    description: 'A Norman window has the shape of a rectangle topped by a semicircle. If the perimeter is 10 m, find the dimensions that maximize the area.',
    hints: [
      'Let r = radius of semicircle (= half the width).',
      'Let h = height of rectangular part.',
      'Perimeter: 2h + 2r + πr = 10.',
      'Area: 2rh + (1/2)πr².'
    ],
    solution: `**Variables:** $r$ = radius of semicircle, $h$ = height of rectangle
Width of rectangle = $2r$

**Constraint:** $2h + 2r + \\pi r = 10$
$h = \\frac{10 - 2r - \\pi r}{2} = 5 - r - \\frac{\\pi r}{2}$

**Objective:** $A = 2rh + \\frac{1}{2}\\pi r^2$
$A = 2r\\left(5 - r - \\frac{\\pi r}{2}\\right) + \\frac{\\pi r^2}{2}$
$A = 10r - 2r^2 - \\pi r^2 + \\frac{\\pi r^2}{2}$
$A = 10r - 2r^2 - \\frac{\\pi r^2}{2}$
$A = 10r - r^2\\left(2 + \\frac{\\pi}{2}\\right)$

**Optimize:**
$A'(r) = 10 - 2r\\left(2 + \\frac{\\pi}{2}\\right) = 0$
$r = \\frac{10}{4 + \\pi} = \\frac{10}{4 + \\pi}$

$h = 5 - r\\left(1 + \\frac{\\pi}{2}\\right) = 5 - \\frac{10(1 + \\pi/2)}{4 + \\pi} = 5 - \\frac{10 + 5\\pi}{4 + \\pi}$
$= \\frac{5(4 + \\pi) - 10 - 5\\pi}{4 + \\pi} = \\frac{20 + 5\\pi - 10 - 5\\pi}{4 + \\pi} = \\frac{10}{4 + \\pi}$

**So $h = r$!**

**Dimensions:** $r = h = \\frac{10}{4 + \\pi} \\approx 1.40$ m
Width = $2r \\approx 2.80$ m`
  }
];
