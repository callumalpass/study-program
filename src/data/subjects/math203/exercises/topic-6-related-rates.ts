import type { WrittenExercise } from '../../../../core/types';

export const topic6Exercises: WrittenExercise[] = [
  // --- DRILLS ---
  {
    id: 'math203-t6-drill-1',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Implicit Differentiation with Time',
    description: 'If $x^2 + y^2 = 25$ and $\\frac{dx}{dt} = 3$, find $\\frac{dy}{dt}$ when $x = 3$ and $y = 4$.',
    hints: ['Differentiate both sides with respect to t.'],
    solution: 'Differentiating: $2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0$\n\nAt $(3, 4)$ with $\\frac{dx}{dt} = 3$:\n$2(3)(3) + 2(4)\\frac{dy}{dt} = 0$\n$18 + 8\\frac{dy}{dt} = 0$\n$\\frac{dy}{dt} = -\\frac{9}{4}$'
  },
  {
    id: 'math203-t6-drill-2',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Rate of Area Change',
    description: 'The radius of a circle is increasing at 2 cm/sec. How fast is the area changing when $r = 5$ cm?',
    hints: ['A = πr², differentiate with respect to t.'],
    solution: '$A = \\pi r^2$\n$\\frac{dA}{dt} = 2\\pi r \\frac{dr}{dt}$\n\nWhen $r = 5$ and $\\frac{dr}{dt} = 2$:\n$\\frac{dA}{dt} = 2\\pi(5)(2) = 20\\pi$ cm²/sec'
  },
  {
    id: 'math203-t6-drill-3',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Volume Rate',
    description: 'A cube has side length $s$. If $s$ is increasing at 0.5 cm/min, how fast is the volume increasing when $s = 4$ cm?',
    hints: ['V = s³, differentiate with respect to t.'],
    solution: '$V = s^3$\n$\\frac{dV}{dt} = 3s^2 \\frac{ds}{dt}$\n\nWhen $s = 4$ and $\\frac{ds}{dt} = 0.5$:\n$\\frac{dV}{dt} = 3(16)(0.5) = 24$ cm³/min'
  },
  {
    id: 'math203-t6-drill-4',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    type: 'written',
    difficulty: 1,
    title: 'Drill: Pythagorean Relation',
    description: 'Two cars start from the same point. One goes north at 40 mph, the other goes east at 30 mph. After 2 hours, how fast is the distance between them changing?',
    hints: ['After 2 hours: x = 60 miles east, y = 80 miles north.'],
    solution: 'Let $x$ = east distance, $y$ = north distance, $D$ = distance between.\n$D^2 = x^2 + y^2$\n$2D\\frac{dD}{dt} = 2x\\frac{dx}{dt} + 2y\\frac{dy}{dt}$\n\nAfter 2 hours: $x = 60$, $y = 80$, $D = 100$\n$\\frac{dx}{dt} = 30$, $\\frac{dy}{dt} = 40$\n\n$100\\frac{dD}{dt} = 60(30) + 80(40) = 1800 + 3200 = 5000$\n$\\frac{dD}{dt} = 50$ mph'
  },

  // --- CORE EXERCISES ---
  {
    id: 'math203-t6-ex01',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    type: 'written',
    difficulty: 2,
    title: 'The Ladder Problem',
    description: 'A 13-foot ladder leans against a wall. The bottom of the ladder is pulled away from the wall at 2 ft/sec. How fast is the top of the ladder sliding down when the bottom is 5 feet from the wall?',
    hints: [
      'Use Pythagorean theorem: x² + y² = 169.',
      'Differentiate with respect to t.',
      'Find y when x = 5.'
    ],
    solution: `**Setup:** Let $x$ = distance from wall to base, $y$ = height of top.

**Equation:** $x^2 + y^2 = 169$

**Find y when x = 5:**
$25 + y^2 = 169 \\Rightarrow y = 12$

**Differentiate with respect to t:**
$2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0$

**Substitute:** $x = 5$, $y = 12$, $\\frac{dx}{dt} = 2$:
$2(5)(2) + 2(12)\\frac{dy}{dt} = 0$
$20 + 24\\frac{dy}{dt} = 0$
$\\frac{dy}{dt} = -\\frac{20}{24} = -\\frac{5}{6}$

**The top slides down at $\\frac{5}{6}$ ft/sec.**`
  },
  {
    id: 'math203-t6-ex02',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    type: 'written',
    difficulty: 2,
    title: 'Conical Tank',
    description: 'Water is poured into a conical tank at 5 m³/min. The tank has a height of 10 m and a base radius of 4 m. How fast is the water level rising when the water is 5 m deep?',
    hints: [
      'Similar triangles: r/h = 4/10 = 2/5.',
      'Volume of cone: V = (1/3)πr²h.',
      'Express V in terms of h only.'
    ],
    solution: `**Setup:** Cone with radius $r$, height $h$.
Similar triangles: $\\frac{r}{h} = \\frac{4}{10} = \\frac{2}{5}$, so $r = \\frac{2h}{5}$

**Volume in terms of h:**
$V = \\frac{1}{3}\\pi r^2 h = \\frac{1}{3}\\pi \\left(\\frac{2h}{5}\\right)^2 h = \\frac{1}{3}\\pi \\cdot \\frac{4h^2}{25} \\cdot h = \\frac{4\\pi h^3}{75}$

**Differentiate:**
$\\frac{dV}{dt} = \\frac{4\\pi}{75} \\cdot 3h^2 \\frac{dh}{dt} = \\frac{4\\pi h^2}{25}\\frac{dh}{dt}$

**Substitute:** $\\frac{dV}{dt} = 5$, $h = 5$:
$5 = \\frac{4\\pi (25)}{25}\\frac{dh}{dt} = 4\\pi \\frac{dh}{dt}$
$\\frac{dh}{dt} = \\frac{5}{4\\pi} \\approx 0.398$ m/min

**The water level rises at $\\frac{5}{4\\pi}$ m/min ≈ 0.40 m/min.**`
  },
  {
    id: 'math203-t6-ex03',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    type: 'written',
    difficulty: 2,
    title: 'Expanding Sphere',
    description: 'A spherical balloon is being inflated at 100 cm³/sec. How fast is the radius increasing when the radius is 10 cm? How fast is the surface area increasing at that moment?',
    hints: [
      'V = (4/3)πr³, S = 4πr².',
      'Differentiate each with respect to t.',
      'First find dr/dt, then dS/dt.'
    ],
    solution: `**Volume:** $V = \\frac{4}{3}\\pi r^3$
$\\frac{dV}{dt} = 4\\pi r^2 \\frac{dr}{dt}$

When $r = 10$ and $\\frac{dV}{dt} = 100$:
$100 = 4\\pi (100) \\frac{dr}{dt}$
$\\frac{dr}{dt} = \\frac{100}{400\\pi} = \\frac{1}{4\\pi}$ cm/sec

**Surface Area:** $S = 4\\pi r^2$
$\\frac{dS}{dt} = 8\\pi r \\frac{dr}{dt}$

$\\frac{dS}{dt} = 8\\pi (10) \\cdot \\frac{1}{4\\pi} = 20$ cm²/sec

**Answers:**
- Radius increases at $\\frac{1}{4\\pi} \\approx 0.08$ cm/sec
- Surface area increases at 20 cm²/sec`
  },
  {
    id: 'math203-t6-ex04',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    type: 'written',
    difficulty: 3,
    title: 'Shadow Problem',
    description: 'A 6-foot tall person walks away from a 15-foot lamppost at 4 ft/sec. How fast is the person\'s shadow lengthening? How fast is the tip of the shadow moving?',
    hints: [
      'Let x = distance from post, s = shadow length.',
      'Use similar triangles: 15/(x+s) = 6/s.',
      'The tip moves at dx/dt + ds/dt.'
    ],
    solution: `**Setup:** Let $x$ = person's distance from post, $s$ = shadow length.

**Similar triangles:**
$\\frac{15}{x + s} = \\frac{6}{s}$
$15s = 6(x + s) = 6x + 6s$
$9s = 6x$
$s = \\frac{2x}{3}$

**Differentiate:**
$\\frac{ds}{dt} = \\frac{2}{3}\\frac{dx}{dt} = \\frac{2}{3}(4) = \\frac{8}{3}$ ft/sec

**Shadow lengthening: $\\frac{8}{3}$ ft/sec ≈ 2.67 ft/sec**

**Tip of shadow speed:**
Tip is at distance $x + s$ from the post.
$\\frac{d(x+s)}{dt} = \\frac{dx}{dt} + \\frac{ds}{dt} = 4 + \\frac{8}{3} = \\frac{20}{3}$ ft/sec

**Tip moves at $\\frac{20}{3}$ ft/sec ≈ 6.67 ft/sec**

Note: The shadow length rate is constant (doesn't depend on x)!`
  },
  {
    id: 'math203-t6-ex05',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    type: 'written',
    difficulty: 3,
    title: 'Two Moving Objects',
    description: 'Ship A is 150 km due west of ship B. A sails east at 35 km/hr and B sails north at 25 km/hr. How fast is the distance between them changing after 3 hours?',
    hints: [
      'After t hours: A has moved 35t km east, B has moved 25t km north.',
      'Distance between depends on positions.',
      'Set up coordinates carefully.'
    ],
    solution: `**Setup:** At time $t$:
- A starts at (-150, 0), moves east at 35 km/hr: position $(-150 + 35t, 0)$
- B starts at (0, 0), moves north at 25 km/hr: position $(0, 25t)$

**Distance:**
$D^2 = (-150 + 35t - 0)^2 + (0 - 25t)^2$
$D^2 = (35t - 150)^2 + (25t)^2$

**After 3 hours:**
$35(3) - 150 = 105 - 150 = -45$ (A is still west of B)
$25(3) = 75$
$D = \\sqrt{45^2 + 75^2} = \\sqrt{2025 + 5625} = \\sqrt{7650} = 15\\sqrt{34}$

**Differentiate:**
$2D\\frac{dD}{dt} = 2(35t - 150)(35) + 2(25t)(25)$
$D\\frac{dD}{dt} = 35(35t - 150) + 625t$

At $t = 3$:
$15\\sqrt{34} \\cdot \\frac{dD}{dt} = 35(-45) + 625(3) = -1575 + 1875 = 300$
$\\frac{dD}{dt} = \\frac{300}{15\\sqrt{34}} = \\frac{20}{\\sqrt{34}} = \\frac{20\\sqrt{34}}{34} \\approx 3.43$ km/hr

**The ships are getting closer at about 3.43 km/hr.**`
  },
  {
    id: 'math203-t6-ex06',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    type: 'written',
    difficulty: 3,
    title: 'Angle of Elevation',
    description: 'A rocket rises vertically at 300 m/sec. An observer is 2 km from the launch pad. How fast is the angle of elevation of the rocket changing when the rocket is 1.5 km high?',
    hints: [
      'tan(θ) = h/2000 where h is height in meters.',
      'Differentiate: sec²(θ) dθ/dt = (1/2000) dh/dt.',
      'Find θ when h = 1500.'
    ],
    solution: `**Setup:** Let $h$ = height (m), $\\theta$ = angle of elevation.
Observer is 2000 m from launch pad.

**Equation:**
$\\tan\\theta = \\frac{h}{2000}$

**Differentiate:**
$\\sec^2\\theta \\cdot \\frac{d\\theta}{dt} = \\frac{1}{2000}\\frac{dh}{dt}$

**At h = 1500 m:**
$\\tan\\theta = \\frac{1500}{2000} = \\frac{3}{4}$
$\\sec^2\\theta = 1 + \\tan^2\\theta = 1 + \\frac{9}{16} = \\frac{25}{16}$

**Substitute:** $\\frac{dh}{dt} = 300$ m/sec:
$\\frac{25}{16} \\cdot \\frac{d\\theta}{dt} = \\frac{300}{2000} = \\frac{3}{20}$
$\\frac{d\\theta}{dt} = \\frac{3}{20} \\cdot \\frac{16}{25} = \\frac{48}{500} = \\frac{12}{125}$ rad/sec

**Converting:** $\\frac{12}{125} \\times \\frac{180}{\\pi} \\approx 5.5°$/sec

**The angle changes at $\\frac{12}{125}$ rad/sec ≈ 0.096 rad/sec ≈ 5.5°/sec**`
  },
  {
    id: 'math203-t6-ex07',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    type: 'written',
    difficulty: 3,
    title: 'Sliding Ladder with Constant Speed',
    description: 'A 10-foot ladder slides down a wall. The top moves down at a constant 3 ft/sec. How fast is the bottom moving when the top is 6 feet above the ground?',
    hints: [
      'x² + y² = 100.',
      'Given dy/dt = -3 (negative because moving down).',
      'Find dx/dt.'
    ],
    solution: `**Setup:** $x$ = distance of base from wall, $y$ = height of top.
$x^2 + y^2 = 100$

**When y = 6:**
$x^2 + 36 = 100 \\Rightarrow x = 8$

**Differentiate:**
$2x\\frac{dx}{dt} + 2y\\frac{dy}{dt} = 0$

**Substitute:** $x = 8$, $y = 6$, $\\frac{dy}{dt} = -3$:
$2(8)\\frac{dx}{dt} + 2(6)(-3) = 0$
$16\\frac{dx}{dt} - 36 = 0$
$\\frac{dx}{dt} = \\frac{36}{16} = \\frac{9}{4} = 2.25$ ft/sec

**The bottom moves away at 2.25 ft/sec.**

Note: As the top gets lower, the bottom speeds up (try y = 2 to see this)!`
  },
  {
    id: 'math203-t6-ex08',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    type: 'written',
    difficulty: 3,
    title: 'Filling a Trough',
    description: 'A trough is 10 m long with a triangular cross-section (isosceles, 2 m wide at top, 1 m deep). Water is pumped in at 0.5 m³/min. How fast is the water level rising when the water is 0.5 m deep?',
    hints: [
      'Width of water surface at depth h: use similar triangles.',
      'Volume = (1/2)(base)(height)(length).',
      'Express V in terms of h.'
    ],
    solution: `**Setup:** At water depth $h$:
Similar triangles: $\\frac{w}{h} = \\frac{2}{1}$, so $w = 2h$

**Cross-sectional area:** $A = \\frac{1}{2}(w)(h) = \\frac{1}{2}(2h)(h) = h^2$

**Volume:** $V = 10 \\cdot h^2 = 10h^2$

**Differentiate:**
$\\frac{dV}{dt} = 20h\\frac{dh}{dt}$

**Substitute:** $\\frac{dV}{dt} = 0.5$, $h = 0.5$:
$0.5 = 20(0.5)\\frac{dh}{dt} = 10\\frac{dh}{dt}$
$\\frac{dh}{dt} = 0.05$ m/min = 5 cm/min

**The water level rises at 5 cm/min.**`
  },
  {
    id: 'math203-t6-ex09',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    type: 'written',
    difficulty: 3,
    title: 'Airplane Distance',
    description: 'An airplane flies horizontally at 500 mph at an altitude of 3 miles. It passes directly over a radar station. How fast is the distance from the plane to the station changing when the plane is 4 miles from the station (slant distance)?',
    hints: [
      'Horizontal distance x, altitude 3, slant distance D.',
      'D² = x² + 9.',
      'When D = 4, find x.'
    ],
    solution: `**Setup:** Let $x$ = horizontal distance, $D$ = slant distance.
$D^2 = x^2 + 9$ (altitude = 3 miles)

**When D = 4:**
$16 = x^2 + 9 \\Rightarrow x = \\sqrt{7}$

**Differentiate:**
$2D\\frac{dD}{dt} = 2x\\frac{dx}{dt}$
$D\\frac{dD}{dt} = x\\frac{dx}{dt}$

**Substitute:** $D = 4$, $x = \\sqrt{7}$, $\\frac{dx}{dt} = 500$:
$4\\frac{dD}{dt} = \\sqrt{7}(500)$
$\\frac{dD}{dt} = \\frac{500\\sqrt{7}}{4} = 125\\sqrt{7} \\approx 331$ mph

**The distance is increasing at $125\\sqrt{7}$ mph ≈ 331 mph.**`
  },
  {
    id: 'math203-t6-ex10',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    type: 'written',
    difficulty: 4,
    title: 'Draining Hemispherical Tank',
    description: 'A hemispherical tank of radius 10 m is being drained at 2 m³/min. How fast is the water level dropping when the water is 5 m deep?\n\n(Volume of spherical cap: $V = \\pi h^2(R - \\frac{h}{3})$ where $R$ is sphere radius, $h$ is cap height)',
    hints: [
      'The tank is a hemisphere, so R = 10.',
      'Use the given formula for volume.',
      'Differentiate with respect to t.'
    ],
    solution: `**Setup:** $R = 10$, $h$ = water depth.
$V = \\pi h^2\\left(10 - \\frac{h}{3}\\right) = \\pi\\left(10h^2 - \\frac{h^3}{3}\\right)$

**Differentiate:**
$\\frac{dV}{dt} = \\pi\\left(20h - h^2\\right)\\frac{dh}{dt}$

**Substitute:** $\\frac{dV}{dt} = -2$ (draining), $h = 5$:
$-2 = \\pi(20(5) - 25)\\frac{dh}{dt} = \\pi(100 - 25)\\frac{dh}{dt} = 75\\pi\\frac{dh}{dt}$

$\\frac{dh}{dt} = -\\frac{2}{75\\pi} \\approx -0.0085$ m/min

**The water level drops at $\\frac{2}{75\\pi}$ m/min ≈ 0.85 cm/min.**`
  },
  {
    id: 'math203-t6-ex11',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    type: 'written',
    difficulty: 3,
    title: 'Spotlight on Moving Object',
    description: 'A spotlight on the ground shines on a wall 30 m away. A person 2 m tall walks toward the wall at 2 m/sec. How fast is the height of the shadow changing when the person is 10 m from the wall?',
    hints: [
      'Let x = distance from person to wall.',
      'Use similar triangles with the spotlight.',
      'The person is 30 - x meters from the spotlight.'
    ],
    solution: `**Setup:** Let $x$ = distance from person to wall.
Person is $30 - x$ meters from spotlight.
Shadow height on wall = $y$.

**Similar triangles:**
$\\frac{y}{30} = \\frac{2}{30 - x}$
$y = \\frac{60}{30 - x}$

**Differentiate:**
$\\frac{dy}{dt} = \\frac{60}{(30-x)^2} \\cdot \\frac{dx}{dt}$

Note: Person walks toward wall, so $\\frac{dx}{dt} = -2$ (x decreasing).

**When x = 10:**
$\\frac{dy}{dt} = \\frac{60}{(20)^2} \\cdot (-2) = \\frac{60}{400} \\cdot (-2) = -0.3$ m/sec

Wait, this seems wrong. Let me reconsider the sign.

As person gets closer to wall (x decreases), shadow gets smaller.
$\\frac{dx}{dt} = -2$ (walking toward wall)
$\\frac{dy}{dt} = \\frac{60}{400}(-2) = -0.3$ m/sec

**The shadow shrinks at 0.3 m/sec (30 cm/sec).**`
  },
  {
    id: 'math203-t6-ex12',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    type: 'written',
    difficulty: 3,
    title: 'Car on Circular Track',
    description: 'A car travels counterclockwise around a circular track of radius 200 m at 20 m/sec. A searchlight at the center tracks the car. How fast is the beam of light rotating (in radians per second)?',
    hints: [
      'Arc length s = rθ.',
      'Differentiate: ds/dt = r(dθ/dt).',
      'ds/dt is the car\'s speed.'
    ],
    solution: `**Setup:** Arc length $s$ and angle $\\theta$ related by:
$s = r\\theta = 200\\theta$

**Differentiate:**
$\\frac{ds}{dt} = 200\\frac{d\\theta}{dt}$

**Substitute:** $\\frac{ds}{dt} = 20$ m/sec:
$20 = 200\\frac{d\\theta}{dt}$
$\\frac{d\\theta}{dt} = \\frac{20}{200} = 0.1$ rad/sec

**The searchlight rotates at 0.1 rad/sec.**

In other units: $0.1 \\times \\frac{180}{\\pi} \\approx 5.73°$/sec
Or: $0.1 \\times \\frac{60}{2\\pi} \\approx 0.955$ RPM`
  },
  {
    id: 'math203-t6-ex13',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    type: 'written',
    difficulty: 4,
    title: 'Kite Problem',
    description: 'A kite is 100 ft high and moves horizontally at 8 ft/sec away from the person holding the string. How fast is the string being let out when 200 ft of string is out?',
    hints: [
      'Height is constant at 100 ft.',
      'Let x = horizontal distance, s = string length.',
      's² = x² + 100².'
    ],
    solution: `**Setup:** Height $h = 100$ (constant), $x$ = horizontal distance, $s$ = string length.
$s^2 = x^2 + 10000$

**When s = 200:**
$40000 = x^2 + 10000 \\Rightarrow x = \\sqrt{30000} = 100\\sqrt{3}$

**Differentiate:**
$2s\\frac{ds}{dt} = 2x\\frac{dx}{dt}$
$s\\frac{ds}{dt} = x\\frac{dx}{dt}$

**Substitute:** $s = 200$, $x = 100\\sqrt{3}$, $\\frac{dx}{dt} = 8$:
$200\\frac{ds}{dt} = 100\\sqrt{3}(8) = 800\\sqrt{3}$
$\\frac{ds}{dt} = 4\\sqrt{3} \\approx 6.93$ ft/sec

**String is let out at $4\\sqrt{3}$ ft/sec ≈ 6.93 ft/sec.**`
  },
  {
    id: 'math203-t6-ex14',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    type: 'written',
    difficulty: 4,
    title: 'Two Rates Given',
    description: 'A particle moves along the curve $y = x^2$. At a certain instant, $x = 2$, $\\frac{dx}{dt} = 3$. Find $\\frac{dy}{dt}$ and the rate of change of the distance from the origin at that instant.',
    hints: [
      'From y = x², differentiate to get dy/dt.',
      'Distance D = √(x² + y²).',
      'Use chain rule for D.'
    ],
    solution: `**Part 1: Find dy/dt**
$y = x^2$
$\\frac{dy}{dt} = 2x\\frac{dx}{dt} = 2(2)(3) = 12$

**Part 2: Find rate of change of distance**
At $x = 2$: $y = 4$
$D = \\sqrt{x^2 + y^2}$
$D^2 = x^2 + y^2$
$2D\\frac{dD}{dt} = 2x\\frac{dx}{dt} + 2y\\frac{dy}{dt}$
$D\\frac{dD}{dt} = x\\frac{dx}{dt} + y\\frac{dy}{dt}$

At $(2, 4)$: $D = \\sqrt{4 + 16} = \\sqrt{20} = 2\\sqrt{5}$

$2\\sqrt{5} \\cdot \\frac{dD}{dt} = 2(3) + 4(12) = 6 + 48 = 54$
$\\frac{dD}{dt} = \\frac{54}{2\\sqrt{5}} = \\frac{27}{\\sqrt{5}} = \\frac{27\\sqrt{5}}{5} \\approx 12.07$

**Answers:**
- $\\frac{dy}{dt} = 12$
- Distance changes at $\\frac{27\\sqrt{5}}{5}$ ≈ 12.07 units/time`
  },
  {
    id: 'math203-t6-ex15',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    type: 'written',
    difficulty: 3,
    title: 'Melting Ice Cube',
    description: 'An ice cube melts so that its volume decreases at a rate proportional to its surface area. If the edge length is $s$, show that $\\frac{ds}{dt}$ is constant.',
    hints: [
      'V = s³, Surface area = 6s².',
      'Given: dV/dt = -k(6s²) for some constant k > 0.',
      'Relate dV/dt to ds/dt.'
    ],
    solution: `**Setup:** Edge length $s$, Volume $V = s^3$, Surface area $A = 6s^2$

**Given condition:** $\\frac{dV}{dt} = -kA = -6ks^2$ for some $k > 0$
(negative because volume is decreasing)

**Relate to ds/dt:**
$\\frac{dV}{dt} = 3s^2\\frac{ds}{dt}$

**Equate:**
$3s^2\\frac{ds}{dt} = -6ks^2$

**Solve for ds/dt:**
$\\frac{ds}{dt} = -2k$ (a constant!)

**Conclusion:** The edge shrinks at a constant rate of $2k$.

This makes physical sense: as the cube gets smaller, it has less surface area (slower melting) but also less volume to lose per unit of shrinkage. These effects balance to give constant $\\frac{ds}{dt}$.`
  },
  {
    id: 'math203-t6-ex16',
    subjectId: 'math203',
    topicId: 'math203-topic-6',
    type: 'written',
    difficulty: 4,
    title: 'Baseball Diamond',
    description: 'A baseball diamond is a square with 90-foot sides. A batter hits the ball and runs to first base at 25 ft/sec. How fast is the distance from the batter to second base changing when the batter is halfway to first base?',
    hints: [
      'Set up coordinates: home at origin, first base at (90, 0), second at (90, 90).',
      'Let x = distance run toward first base.',
      'Distance to second base: D = √[(90-x)² + 90²].'
    ],
    solution: `**Setup:** Home plate at origin.
- First base at $(90, 0)$
- Second base at $(90, 90)$
- Batter at $(x, 0)$ after running $x$ feet toward first

**Distance to second base:**
$D = \\sqrt{(90 - x)^2 + 90^2}$
$D^2 = (90 - x)^2 + 8100$

**Differentiate:**
$2D\\frac{dD}{dt} = 2(90 - x)(-1)\\frac{dx}{dt}$
$D\\frac{dD}{dt} = -(90 - x)\\frac{dx}{dt}$

**When x = 45 (halfway):**
$D = \\sqrt{45^2 + 90^2} = \\sqrt{2025 + 8100} = \\sqrt{10125} = 45\\sqrt{5}$

$45\\sqrt{5} \\cdot \\frac{dD}{dt} = -(45)(25) = -1125$
$\\frac{dD}{dt} = \\frac{-1125}{45\\sqrt{5}} = \\frac{-25}{\\sqrt{5}} = -5\\sqrt{5} \\approx -11.18$ ft/sec

**The distance to second base is decreasing at $5\\sqrt{5}$ ft/sec ≈ 11.18 ft/sec.**`
  }
];
