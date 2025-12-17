import { CodingExercise } from '../../../../core/types';

export const topic7Exercises: CodingExercise[] = [
  {
    id: 'math302-t7-ex01',
    subjectId: 'math302',
    topicId: 'math302-topic-7',
    title: 'Euler Method Step',
    difficulty: 1,
    description: 'Implement a single step of Euler\'s method for solving y\' = f(t,y). Given current (t,y) and step size h, compute the next value: y_new = y + h*f(t,y).',
    starterCode: `def euler_step(f, t, y, h):
    """
    Perform one step of Euler's method.

    Args:
        f: Function f(t, y) defining y' = f(t,y)
        t: Current time
        y: Current y value
        h: Step size

    Returns:
        New y value after one step
    """
    pass`,
    solution: `def euler_step(f, t, y, h):
    """
    Perform one step of Euler's method.

    Args:
        f: Function f(t, y) defining y' = f(t,y)
        t: Current time
        y: Current y value
        h: Step size

    Returns:
        New y value after one step
    """
    # Euler's method: y_new = y + h * f(t, y)
    return y + h * f(t, y)`,
    testCases: [
      { input: 'lambda t, y: y, 0, 1, 0.1', expectedOutput: '1.1', isHidden: false, description: 'y\' = y, exponential growth' },
      { input: 'lambda t, y: t, 0, 0, 0.1', expectedOutput: '0.0', isHidden: false, description: 'y\' = t at t=0' },
      { input: 'lambda t, y: -y, 1, 2, 0.1', expectedOutput: '1.8', isHidden: false, description: 'y\' = -y, exponential decay' },
      { input: 'lambda t, y: 2*t + y, 0, 1, 0.5', expectedOutput: '1.5', isHidden: true, description: 'Linear combination' },
      { input: 'lambda t, y: t**2, 1, 0, 0.2', expectedOutput: '0.2', isHidden: true, description: 'y\' = t²' }
    ],
    hints: [
      'Euler\'s method formula: y_new = y + h * f(t, y)',
      'Evaluate f at the current point (t, y)',
      'Multiply by step size h and add to current y'
    ],
    language: 'python'
  },
  {
    id: 'math302-t7-ex02',
    subjectId: 'math302',
    topicId: 'math302-topic-7',
    title: 'Euler Method Full Solution',
    difficulty: 2,
    description: 'Implement Euler\'s method to solve an IVP from t0 to tf with step size h. Return the final y value.',
    starterCode: `def euler_method(f, t0, y0, tf, h):
    """
    Solve y' = f(t,y) using Euler's method.

    Args:
        f: Function f(t, y)
        t0: Initial time
        y0: Initial value
        tf: Final time
        h: Step size

    Returns:
        Final y value at tf
    """
    pass`,
    solution: `def euler_method(f, t0, y0, tf, h):
    """
    Solve y' = f(t,y) using Euler's method.

    Args:
        f: Function f(t, y)
        t0: Initial time
        y0: Initial value
        tf: Final time
        h: Step size

    Returns:
        Final y value at tf
    """
    t = t0
    y = y0

    while t < tf:
        # Ensure we don't overshoot tf
        step = min(h, tf - t)
        y = y + step * f(t, y)
        t = t + step

    return y`,
    testCases: [
      { input: 'lambda t, y: y, 0, 1, 1, 0.1', expectedOutput: '2.5937424601000023', isHidden: false, description: 'Approximate e' },
      { input: 'lambda t, y: -y, 0, 1, 1, 0.1', expectedOutput: '0.3486784401000001', isHidden: false, description: 'Exponential decay' },
      { input: 'lambda t, y: t, 0, 0, 2, 0.1', expectedOutput: '1.9000000000000001', isHidden: false, description: 'Integrate t' },
      { input: 'lambda t, y: 1, 0, 0, 1, 0.25', expectedOutput: '1.0', isHidden: true, description: 'Constant rate' },
      { input: 'lambda t, y: 2*t, 0, 1, 1, 0.2', expectedOutput: '1.8', isHidden: true, description: 'Linear growth' }
    ],
    hints: [
      'Start with t = t0, y = y0',
      'Repeatedly apply Euler step: y = y + h*f(t,y)',
      'Stop when t reaches tf'
    ],
    language: 'python'
  },
  {
    id: 'math302-t7-ex03',
    subjectId: 'math302',
    topicId: 'math302-topic-7',
    title: 'RK4 Single Step',
    difficulty: 3,
    description: 'Implement one step of the 4th-order Runge-Kutta method (RK4). Compute k1, k2, k3, k4 and return y_new = y + (h/6)(k1 + 2k2 + 2k3 + k4).',
    starterCode: `def rk4_step(f, t, y, h):
    """
    Perform one step of RK4 method.

    Args:
        f: Function f(t, y) defining y' = f(t,y)
        t: Current time
        y: Current y value
        h: Step size

    Returns:
        New y value after one RK4 step
    """
    pass`,
    solution: `def rk4_step(f, t, y, h):
    """
    Perform one step of RK4 method.

    Args:
        f: Function f(t, y) defining y' = f(t,y)
        t: Current time
        y: Current y value
        h: Step size

    Returns:
        New y value after one RK4 step
    """
    # Compute the four slopes
    k1 = f(t, y)
    k2 = f(t + h/2, y + h*k1/2)
    k3 = f(t + h/2, y + h*k2/2)
    k4 = f(t + h, y + h*k3)

    # Weighted average
    y_new = y + (h/6) * (k1 + 2*k2 + 2*k3 + k4)

    return y_new`,
    testCases: [
      { input: 'lambda t, y: y, 0, 1, 0.1', expectedOutput: '1.1051709180756477', isHidden: false, description: 'RK4 for exponential' },
      { input: 'lambda t, y: -y, 0, 1, 0.1', expectedOutput: '0.9048374180359595', isHidden: false, description: 'RK4 for decay' },
      { input: 'lambda t, y: t, 0, 0, 0.2', expectedOutput: '0.004000000000000001', isHidden: false, description: 'RK4 for y\'=t' },
      { input: 'lambda t, y: 1, 0, 0, 0.5', expectedOutput: '0.5', isHidden: true, description: 'RK4 constant rate' },
      { input: 'lambda t, y: t + y, 0, 1, 0.1', expectedOutput: '1.1103418333333333', isHidden: true, description: 'RK4 for y\'=t+y' }
    ],
    hints: [
      'k1 = f(t, y)',
      'k2 = f(t + h/2, y + h*k1/2)',
      'k3 = f(t + h/2, y + h*k2/2)',
      'k4 = f(t + h, y + h*k3)',
      'y_new = y + (h/6)(k1 + 2k2 + 2k3 + k4)'
    ],
    language: 'python'
  },
  {
    id: 'math302-t7-ex04',
    subjectId: 'math302',
    topicId: 'math302-topic-7',
    title: 'RK4 Full Solution',
    difficulty: 3,
    description: 'Implement the complete RK4 method to solve an IVP from t0 to tf with step size h.',
    starterCode: `def rk4_method(f, t0, y0, tf, h):
    """
    Solve y' = f(t,y) using RK4 method.

    Args:
        f: Function f(t, y)
        t0: Initial time
        y0: Initial value
        tf: Final time
        h: Step size

    Returns:
        Final y value at tf
    """
    pass`,
    solution: `def rk4_method(f, t0, y0, tf, h):
    """
    Solve y' = f(t,y) using RK4 method.

    Args:
        f: Function f(t, y)
        t0: Initial time
        y0: Initial value
        tf: Final time
        h: Step size

    Returns:
        Final y value at tf
    """
    t = t0
    y = y0

    while t < tf:
        # Ensure we don't overshoot
        step = min(h, tf - t)

        # RK4 step
        k1 = f(t, y)
        k2 = f(t + step/2, y + step*k1/2)
        k3 = f(t + step/2, y + step*k2/2)
        k4 = f(t + step, y + step*k3)

        y = y + (step/6) * (k1 + 2*k2 + 2*k3 + k4)
        t = t + step

    return y`,
    testCases: [
      { input: 'lambda t, y: y, 0, 1, 1, 0.1', expectedOutput: '2.7182818011463845', isHidden: false, description: 'Accurate approximation of e' },
      { input: 'lambda t, y: -y, 0, 1, 1, 0.1', expectedOutput: '0.36787944534743756', isHidden: false, description: 'Approximation of 1/e' },
      { input: 'lambda t, y: t, 0, 0, 2, 0.2', expectedOutput: '1.9999999999999998', isHidden: false, description: 'Integral of t from 0 to 2' },
      { input: 'lambda t, y: 2*t + 1, 0, 0, 1, 0.1', expectedOutput: '1.9999999999999998', isHidden: true, description: 'Linear ODE' },
      { input: 'lambda t, y: t**2, 0, 0, 1, 0.1', expectedOutput: '0.33333333333333326', isHidden: true, description: 'Quadratic rate' }
    ],
    hints: [
      'Similar to Euler but use RK4 step',
      'Compute k1, k2, k3, k4 for each step',
      'Update y using weighted average'
    ],
    language: 'python'
  },
  {
    id: 'math302-t7-ex05',
    subjectId: 'math302',
    topicId: 'math302-topic-7',
    title: 'Exponential Population Model',
    difficulty: 2,
    description: 'Model exponential population growth dP/dt = rP with P(0) = P0. Solve using Euler\'s method and return population at time t.',
    starterCode: `def exponential_growth(r, P0, t, h):
    """
    Solve exponential growth model dP/dt = rP.

    Args:
        r: Growth rate
        P0: Initial population
        t: Time to evaluate
        h: Step size

    Returns:
        Population at time t
    """
    pass`,
    solution: `def exponential_growth(r, P0, t, h):
    """
    Solve exponential growth model dP/dt = rP.

    Args:
        r: Growth rate
        P0: Initial population
        t: Time to evaluate
        h: Step size

    Returns:
        Population at time t
    """
    # Define the ODE
    def f(time, P):
        return r * P

    # Solve using Euler's method
    time = 0
    P = P0

    while time < t:
        step = min(h, t - time)
        P = P + step * f(time, P)
        time = time + step

    return P`,
    testCases: [
      { input: '0.1, 100, 10, 0.1', expectedOutput: '259.37424601000025', isHidden: false, description: 'Growth over 10 time units' },
      { input: '0.5, 50, 2, 0.1', expectedOutput: '135.91408994949374', isHidden: false, description: 'Fast growth' },
      { input: '0, 100, 5, 0.1', expectedOutput: '100.0', isHidden: false, description: 'No growth (r=0)' },
      { input: '0.05, 200, 20, 0.5', expectedOutput: '490.40247467978976', isHidden: true, description: 'Slow growth long time' },
      { input: '-0.1, 100, 10, 0.1', expectedOutput: '38.57801144698511', isHidden: true, description: 'Exponential decay' }
    ],
    hints: [
      'The ODE is dP/dt = rP',
      'Use Euler\'s method to integrate',
      'Start with P = P0 at time = 0'
    ],
    language: 'python'
  },
  {
    id: 'math302-t7-ex06',
    subjectId: 'math302',
    topicId: 'math302-topic-7',
    title: 'Logistic Population Model',
    difficulty: 3,
    description: 'Model logistic growth dP/dt = rP(1 - P/K) where K is carrying capacity. Solve using RK4.',
    starterCode: `def logistic_growth(r, K, P0, t, h):
    """
    Solve logistic growth model dP/dt = rP(1 - P/K).

    Args:
        r: Growth rate
        K: Carrying capacity
        P0: Initial population
        t: Time to evaluate
        h: Step size

    Returns:
        Population at time t
    """
    pass`,
    solution: `def logistic_growth(r, K, P0, t, h):
    """
    Solve logistic growth model dP/dt = rP(1 - P/K).

    Args:
        r: Growth rate
        K: Carrying capacity
        P0: Initial population
        t: Time to evaluate
        h: Step size

    Returns:
        Population at time t
    """
    # Define the logistic ODE
    def f(time, P):
        return r * P * (1 - P / K)

    # Solve using RK4
    time = 0
    P = P0

    while time < t:
        step = min(h, t - time)

        # RK4 step
        k1 = f(time, P)
        k2 = f(time + step/2, P + step*k1/2)
        k3 = f(time + step/2, P + step*k2/2)
        k4 = f(time + step, P + step*k3)

        P = P + (step/6) * (k1 + 2*k2 + 2*k3 + k4)
        time = time + step

    return P`,
    testCases: [
      { input: '0.1, 1000, 100, 50, 0.5', expectedOutput: '990.0996013327823', isHidden: false, description: 'Approach carrying capacity' },
      { input: '0.5, 500, 50, 10, 0.1', expectedOutput: '437.7653266858862', isHidden: false, description: 'Fast growth toward K' },
      { input: '0.2, 1000, 1000, 10, 0.5', expectedOutput: '1000.0', isHidden: false, description: 'At carrying capacity' },
      { input: '0.1, 2000, 100, 100, 1', expectedOutput: '1973.9894868033924', isHidden: true, description: 'Long time evolution' },
      { input: '0.3, 800, 200, 20, 0.2', expectedOutput: '785.1951999493063', isHidden: true, description: 'Moderate growth' }
    ],
    hints: [
      'Logistic ODE: dP/dt = rP(1 - P/K)',
      'Use RK4 method for accuracy',
      'Population should approach K as t increases'
    ],
    language: 'python'
  },
  {
    id: 'math302-t7-ex07',
    subjectId: 'math302',
    topicId: 'math302-topic-7',
    title: 'Predator-Prey System',
    difficulty: 4,
    description: 'Solve the Lotka-Volterra predator-prey system: dx/dt = ax - bxy, dy/dt = -cy + dxy. Use RK4 for systems and return prey population x at time t.',
    starterCode: `def predator_prey(a, b, c, d, x0, y0, t, h):
    """
    Solve Lotka-Volterra system using RK4.
    dx/dt = ax - bxy (prey)
    dy/dt = -cy + dxy (predator)

    Args:
        a, b, c, d: Model parameters
        x0, y0: Initial populations
        t: Time to evaluate
        h: Step size

    Returns:
        Prey population x at time t
    """
    pass`,
    solution: `def predator_prey(a, b, c, d, x0, y0, t, h):
    """
    Solve Lotka-Volterra system using RK4.
    dx/dt = ax - bxy (prey)
    dy/dt = -cy + dxy (predator)

    Args:
        a, b, c, d: Model parameters
        x0, y0: Initial populations
        t: Time to evaluate
        h: Step size

    Returns:
        Prey population x at time t
    """
    # Define the system of ODEs
    def f(time, x, y):
        dx = a * x - b * x * y
        dy = -c * y + d * x * y
        return dx, dy

    # Solve using RK4 for systems
    time = 0
    x, y = x0, y0

    while time < t:
        step = min(h, t - time)

        # RK4 for systems
        k1_x, k1_y = f(time, x, y)
        k2_x, k2_y = f(time + step/2, x + step*k1_x/2, y + step*k1_y/2)
        k3_x, k3_y = f(time + step/2, x + step*k2_x/2, y + step*k2_y/2)
        k4_x, k4_y = f(time + step, x + step*k3_x, y + step*k3_y)

        x = x + (step/6) * (k1_x + 2*k2_x + 2*k3_x + k4_x)
        y = y + (step/6) * (k1_y + 2*k2_y + 2*k3_y + k4_y)
        time = time + step

    return x`,
    testCases: [
      { input: '0.1, 0.02, 0.1, 0.01, 50, 10, 50, 0.5', expectedOutput: '64.73538166695312', isHidden: false, description: 'Predator-prey dynamics' },
      { input: '0.5, 0.1, 0.2, 0.05, 40, 5, 20, 0.1', expectedOutput: '42.25766782653406', isHidden: false, description: 'Different parameters' },
      { input: '0.2, 0.01, 0.1, 0.005, 100, 20, 10, 0.5', expectedOutput: '95.70464433677767', isHidden: false, description: 'Weak interaction' },
      { input: '0.3, 0.05, 0.2, 0.02, 60, 15, 30, 0.2', expectedOutput: '67.16912866677076', isHidden: true, description: 'Medium term evolution' },
      { input: '0.15, 0.03, 0.15, 0.015, 70, 12, 40, 0.5', expectedOutput: '63.56549892264116', isHidden: true, description: 'Balanced coefficients' }
    ],
    hints: [
      'This is a system of 2 ODEs',
      'Extend RK4 to handle both x and y',
      'Compute k1, k2, k3, k4 for both variables',
      'Return only the prey population x'
    ],
    language: 'python'
  },
  {
    id: 'math302-t7-ex08',
    subjectId: 'math302',
    topicId: 'math302-topic-7',
    title: 'RC Circuit Voltage',
    difficulty: 3,
    description: 'For an RC circuit, Kirchhoff\'s law gives V_C\' = (V_in - V_C)/(RC). Solve for capacitor voltage V_C at time t given constant input V_in.',
    starterCode: `def rc_circuit(R, C, V_in, V0, t, h):
    """
    Solve RC circuit ODE: V_C' = (V_in - V_C)/(RC).

    Args:
        R: Resistance (ohms)
        C: Capacitance (farads)
        V_in: Input voltage (constant)
        V0: Initial capacitor voltage
        t: Time to evaluate
        h: Step size

    Returns:
        Capacitor voltage at time t
    """
    pass`,
    solution: `def rc_circuit(R, C, V_in, V0, t, h):
    """
    Solve RC circuit ODE: V_C' = (V_in - V_C)/(RC).

    Args:
        R: Resistance (ohms)
        C: Capacitance (farads)
        V_in: Input voltage (constant)
        V0: Initial capacitor voltage
        t: Time to evaluate
        h: Step size

    Returns:
        Capacitor voltage at time t
    """
    # Define the ODE
    def f(time, V_C):
        return (V_in - V_C) / (R * C)

    # Solve using RK4
    time = 0
    V_C = V0

    while time < t:
        step = min(h, t - time)

        k1 = f(time, V_C)
        k2 = f(time + step/2, V_C + step*k1/2)
        k3 = f(time + step/2, V_C + step*k2/2)
        k4 = f(time + step, V_C + step*k3)

        V_C = V_C + (step/6) * (k1 + 2*k2 + 2*k3 + k4)
        time = time + step

    return V_C`,
    testCases: [
      { input: '1000, 0.001, 5, 0, 5, 0.1', expectedOutput: '4.966206226227899', isHidden: false, description: 'Charging toward 5V' },
      { input: '100, 0.01, 10, 0, 10, 0.1', expectedOutput: '9.999546086676577', isHidden: false, description: 'Nearly full charge' },
      { input: '500, 0.002, 3, 3, 5, 0.1', expectedOutput: '3.0', isHidden: false, description: 'Already at steady state' },
      { input: '2000, 0.0005, 12, 0, 3, 0.1', expectedOutput: '11.276923654237617', isHidden: true, description: 'Large time constant' },
      { input: '100, 0.001, 5, 2, 1, 0.05', expectedOutput: '4.481689016888569', isHidden: true, description: 'Starting from 2V' }
    ],
    hints: [
      'ODE: V_C\' = (V_in - V_C)/(RC)',
      'RC is the time constant',
      'V_C approaches V_in exponentially'
    ],
    language: 'python'
  },
  {
    id: 'math302-t7-ex09',
    subjectId: 'math302',
    topicId: 'math302-topic-7',
    title: 'RLC Circuit Current',
    difficulty: 4,
    description: 'For an RLC series circuit, L*I\'\' + R*I\' + I/C = V\'_in. Convert to system and solve for current I at time t with V_in = 0 (free oscillation).',
    starterCode: `def rlc_circuit(R, L, C, I0, I0_prime, t, h):
    """
    Solve RLC circuit: LI'' + RI' + I/C = 0 (free oscillation).
    Convert to system: I' = J, J' = -(R/L)J - I/(LC)

    Args:
        R: Resistance
        L: Inductance
        C: Capacitance
        I0: Initial current
        I0_prime: Initial current derivative
        t: Time to evaluate
        h: Step size

    Returns:
        Current at time t
    """
    pass`,
    solution: `def rlc_circuit(R, L, C, I0, I0_prime, t, h):
    """
    Solve RLC circuit: LI'' + RI' + I/C = 0 (free oscillation).
    Convert to system: I' = J, J' = -(R/L)J - I/(LC)

    Args:
        R: Resistance
        L: Inductance
        C: Capacitance
        I0: Initial current
        I0_prime: Initial current derivative
        t: Time to evaluate
        h: Step size

    Returns:
        Current at time t
    """
    # Convert second-order to system of first-order
    # Let I' = J, then J' = -(R/L)J - I/(LC)
    def f(time, I, J):
        dI = J
        dJ = -(R/L) * J - I / (L * C)
        return dI, dJ

    # Solve using RK4 for systems
    time = 0
    I = I0
    J = I0_prime

    while time < t:
        step = min(h, t - time)

        k1_I, k1_J = f(time, I, J)
        k2_I, k2_J = f(time + step/2, I + step*k1_I/2, J + step*k1_J/2)
        k3_I, k3_J = f(time + step/2, I + step*k2_I/2, J + step*k2_J/2)
        k4_I, k4_J = f(time + step, I + step*k3_I, J + step*k3_J)

        I = I + (step/6) * (k1_I + 2*k2_I + 2*k3_I + k4_I)
        J = J + (step/6) * (k1_J + 2*k2_J + 2*k3_J + k4_J)
        time = time + step

    return I`,
    testCases: [
      { input: '10, 1, 0.01, 1, 0, 1, 0.01', expectedOutput: '0.00016701700690318285', isHidden: false, description: 'Damped oscillation' },
      { input: '0.1, 1, 0.1, 1, 0, 3.14159, 0.01', expectedOutput: '-0.9999999815470737', isHidden: false, description: 'Lightly damped' },
      { input: '5, 0.5, 0.02, 0.5, 0, 0.5, 0.01', expectedOutput: '0.00011744051665811624', isHidden: false, description: 'Moderate damping' },
      { input: '1, 1, 0.1, 1, 0, 2, 0.01', expectedOutput: '-0.14972202011948614', isHidden: true, description: 'Weak damping' },
      { input: '20, 2, 0.005, 1, 0, 0.2, 0.01', expectedOutput: '0.10516527826998538', isHidden: true, description: 'Heavy damping' }
    ],
    hints: [
      'Convert to system: let I\' = J',
      'Then J\' = -(R/L)J - I/(LC)',
      'Use RK4 for the system of two equations',
      'Return the current I'
    ],
    language: 'python'
  },
  {
    id: 'math302-t7-ex10',
    subjectId: 'math302',
    topicId: 'math302-topic-7',
    title: 'Simple Harmonic Oscillator',
    difficulty: 3,
    description: 'Solve the simple harmonic oscillator x\'\' + ω²x = 0 with initial conditions x(0) = x0, x\'(0) = v0. Return position at time t.',
    starterCode: `def harmonic_oscillator(omega, x0, v0, t, h):
    """
    Solve x'' + ω²x = 0 using RK4.
    Convert to system: x' = v, v' = -ω²x

    Args:
        omega: Angular frequency
        x0: Initial position
        v0: Initial velocity
        t: Time to evaluate
        h: Step size

    Returns:
        Position at time t
    """
    pass`,
    solution: `def harmonic_oscillator(omega, x0, v0, t, h):
    """
    Solve x'' + ω²x = 0 using RK4.
    Convert to system: x' = v, v' = -ω²x

    Args:
        omega: Angular frequency
        x0: Initial position
        v0: Initial velocity
        t: Time to evaluate
        h: Step size

    Returns:
        Position at time t
    """
    # Convert to system
    def f(time, x, v):
        dx = v
        dv = -omega**2 * x
        return dx, dv

    # Solve using RK4
    time = 0
    x = x0
    v = v0

    while time < t:
        step = min(h, t - time)

        k1_x, k1_v = f(time, x, v)
        k2_x, k2_v = f(time + step/2, x + step*k1_x/2, v + step*k1_v/2)
        k3_x, k3_v = f(time + step/2, x + step*k2_x/2, v + step*k2_v/2)
        k4_x, k4_v = f(time + step, x + step*k3_x, v + step*k3_v)

        x = x + (step/6) * (k1_x + 2*k2_x + 2*k3_x + k4_x)
        v = v + (step/6) * (k1_v + 2*k2_v + 2*k3_v + k4_v)
        time = time + step

    return x`,
    testCases: [
      { input: '1, 1, 0, 3.141592653589793, 0.01', expectedOutput: '-0.9999999999996649', isHidden: false, description: 'Half period of oscillation' },
      { input: '2, 0, 1, 1.5707963267948966, 0.01', expectedOutput: '1.015085670674116e-14', isHidden: false, description: 'Quarter period' },
      { input: '1, 1, 0, 0, 0.01', expectedOutput: '1.0', isHidden: false, description: 'At t=0' },
      { input: '0.5, 2, 0, 6.283185307179586, 0.05', expectedOutput: '1.9999999999991564', isHidden: true, description: 'Full period ω=0.5' },
      { input: '3, 1, 1, 1, 0.01', expectedOutput: '-0.8488724712829723', isHidden: true, description: 'Non-zero initial velocity' }
    ],
    hints: [
      'Convert to system: x\' = v, v\' = -ω²x',
      'Use RK4 for the coupled system',
      'The solution should be periodic with period 2π/ω'
    ],
    language: 'python'
  },
  {
    id: 'math302-t7-ex11',
    subjectId: 'math302',
    topicId: 'math302-topic-7',
    title: 'Damped Oscillator',
    difficulty: 3,
    description: 'Solve the damped oscillator x\'\' + 2γx\' + ω²x = 0. Convert to system and solve using RK4.',
    starterCode: `def damped_oscillator(gamma, omega, x0, v0, t, h):
    """
    Solve x'' + 2γx' + ω²x = 0 using RK4.
    System: x' = v, v' = -2γv - ω²x

    Args:
        gamma: Damping coefficient
        omega: Angular frequency
        x0: Initial position
        v0: Initial velocity
        t: Time to evaluate
        h: Step size

    Returns:
        Position at time t
    """
    pass`,
    solution: `def damped_oscillator(gamma, omega, x0, v0, t, h):
    """
    Solve x'' + 2γx' + ω²x = 0 using RK4.
    System: x' = v, v' = -2γv - ω²x

    Args:
        gamma: Damping coefficient
        omega: Angular frequency
        x0: Initial position
        v0: Initial velocity
        t: Time to evaluate
        h: Step size

    Returns:
        Position at time t
    """
    # Convert to system
    def f(time, x, v):
        dx = v
        dv = -2 * gamma * v - omega**2 * x
        return dx, dv

    # Solve using RK4
    time = 0
    x = x0
    v = v0

    while time < t:
        step = min(h, t - time)

        k1_x, k1_v = f(time, x, v)
        k2_x, k2_v = f(time + step/2, x + step*k1_x/2, v + step*k1_v/2)
        k3_x, k3_v = f(time + step/2, x + step*k2_x/2, v + step*k2_v/2)
        k4_x, k4_v = f(time + step, x + step*k3_x, v + step*k3_v)

        x = x + (step/6) * (k1_x + 2*k2_x + 2*k3_x + k4_x)
        v = v + (step/6) * (k1_v + 2*k2_v + 2*k3_v + k4_v)
        time = time + step

    return x`,
    testCases: [
      { input: '0.1, 1, 1, 0, 3.141592653589793, 0.01', expectedOutput: '-0.5422463977796717', isHidden: false, description: 'Light damping' },
      { input: '0.5, 2, 1, 0, 1, 0.01', expectedOutput: '0.22313016049817688', isHidden: false, description: 'Moderate damping' },
      { input: '0, 1, 1, 0, 3.141592653589793, 0.01', expectedOutput: '-0.9999999999996649', isHidden: false, description: 'No damping (simple harmonic)' },
      { input: '1, 3, 2, 0, 2, 0.01', expectedOutput: '0.037457118667024534', isHidden: true, description: 'Heavy damping' },
      { input: '0.2, 1.5, 1, 1, 3, 0.01', expectedOutput: '-0.09604867720624506', isHidden: true, description: 'With initial velocity' }
    ],
    hints: [
      'System: x\' = v, v\' = -2γv - ω²x',
      'The damping term is -2γv',
      'Amplitude decays exponentially with time'
    ],
    language: 'python'
  },
  {
    id: 'math302-t7-ex12',
    subjectId: 'math302',
    topicId: 'math302-topic-7',
    title: 'SIR Epidemic Model',
    difficulty: 4,
    description: 'Solve the SIR model: S\' = -βSI, I\' = βSI - γI, R\' = γI. Return the number of infected individuals at time t.',
    starterCode: `def sir_model(beta, gamma, S0, I0, R0, t, h):
    """
    Solve SIR epidemic model using RK4.
    S' = -βSI, I' = βSI - γI, R' = γI

    Args:
        beta: Infection rate
        gamma: Recovery rate
        S0, I0, R0: Initial populations
        t: Time to evaluate
        h: Step size

    Returns:
        Number of infected at time t
    """
    pass`,
    solution: `def sir_model(beta, gamma, S0, I0, R0, t, h):
    """
    Solve SIR epidemic model using RK4.
    S' = -βSI, I' = βSI - γI, R' = γI

    Args:
        beta: Infection rate
        gamma: Recovery rate
        S0, I0, R0: Initial populations
        t: Time to evaluate
        h: Step size

    Returns:
        Number of infected at time t
    """
    # Define the SIR system
    def f(time, S, I, R):
        dS = -beta * S * I
        dI = beta * S * I - gamma * I
        dR = gamma * I
        return dS, dI, dR

    # Solve using RK4
    time = 0
    S, I, R = S0, I0, R0

    while time < t:
        step = min(h, t - time)

        k1_S, k1_I, k1_R = f(time, S, I, R)
        k2_S, k2_I, k2_R = f(time + step/2, S + step*k1_S/2, I + step*k1_I/2, R + step*k1_R/2)
        k3_S, k3_I, k3_R = f(time + step/2, S + step*k2_S/2, I + step*k2_I/2, R + step*k2_R/2)
        k4_S, k4_I, k4_R = f(time + step, S + step*k3_S, I + step*k3_I, R + step*k3_R)

        S = S + (step/6) * (k1_S + 2*k2_S + 2*k3_S + k4_S)
        I = I + (step/6) * (k1_I + 2*k2_I + 2*k3_I + k4_I)
        R = R + (step/6) * (k1_R + 2*k2_R + 2*k3_R + k4_R)
        time = time + step

    return I`,
    testCases: [
      { input: '0.001, 0.1, 990, 10, 0, 50, 0.5', expectedOutput: '135.56229853866827', isHidden: false, description: 'Epidemic progression' },
      { input: '0.0005, 0.05, 995, 5, 0, 100, 1', expectedOutput: '194.33890031863943', isHidden: false, description: 'Slower spread' },
      { input: '0.002, 0.2, 980, 20, 0, 30, 0.5', expectedOutput: '52.73750740766933', isHidden: false, description: 'Fast recovery' },
      { input: '0.0008, 0.08, 990, 10, 0, 80, 0.5', expectedOutput: '107.85699768078656', isHidden: true, description: 'Medium term' },
      { input: '0.0015, 0.15, 985, 15, 0, 40, 0.5', expectedOutput: '84.62634899748466', isHidden: true, description: 'Balanced rates' }
    ],
    hints: [
      'System of 3 equations: S\', I\', R\'',
      'S + I + R should remain constant (total population)',
      'Use RK4 for all three variables',
      'Return only I (infected)'
    ],
    language: 'python'
  },
  {
    id: 'math302-t7-ex13',
    subjectId: 'math302',
    topicId: 'math302-topic-7',
    title: 'Van der Pol Oscillator',
    difficulty: 5,
    description: 'Solve the Van der Pol equation x\'\' - μ(1-x²)x\' + x = 0, a nonlinear oscillator. Convert to system and use RK4.',
    starterCode: `def van_der_pol(mu, x0, v0, t, h):
    """
    Solve Van der Pol equation x'' - μ(1-x²)x' + x = 0.
    System: x' = v, v' = μ(1-x²)v - x

    Args:
        mu: Nonlinearity parameter
        x0: Initial position
        v0: Initial velocity
        t: Time to evaluate
        h: Step size

    Returns:
        Position at time t
    """
    pass`,
    solution: `def van_der_pol(mu, x0, v0, t, h):
    """
    Solve Van der Pol equation x'' - μ(1-x²)x' + x = 0.
    System: x' = v, v' = μ(1-x²)v - x

    Args:
        mu: Nonlinearity parameter
        x0: Initial position
        v0: Initial velocity
        t: Time to evaluate
        h: Step size

    Returns:
        Position at time t
    """
    # Convert to system: x' = v, v' = μ(1-x²)v - x
    def f(time, x, v):
        dx = v
        dv = mu * (1 - x**2) * v - x
        return dx, dv

    # Solve using RK4
    time = 0
    x = x0
    v = v0

    while time < t:
        step = min(h, t - time)

        k1_x, k1_v = f(time, x, v)
        k2_x, k2_v = f(time + step/2, x + step*k1_x/2, v + step*k1_v/2)
        k3_x, k3_v = f(time + step/2, x + step*k2_x/2, v + step*k2_v/2)
        k4_x, k4_v = f(time + step, x + step*k3_x, v + step*k3_v)

        x = x + (step/6) * (k1_x + 2*k2_x + 2*k3_x + k4_x)
        v = v + (step/6) * (k1_v + 2*k2_v + 2*k3_v + k4_v)
        time = time + step

    return x`,
    testCases: [
      { input: '1, 0.1, 0, 10, 0.01', expectedOutput: '1.864030975663976', isHidden: false, description: 'Standard Van der Pol' },
      { input: '0.1, 1, 0, 5, 0.01', expectedOutput: '0.28355713628632925', isHidden: false, description: 'Weak nonlinearity' },
      { input: '2, 0.5, 0, 8, 0.01', expectedOutput: '-1.8873806693664253', isHidden: false, description: 'Strong nonlinearity' },
      { input: '0.5, 1, 1, 10, 0.01', expectedOutput: '1.802099302832395', isHidden: true, description: 'With initial velocity' },
      { input: '1.5, 0.2, 0, 15, 0.02', expectedOutput: '1.9230767334103932', isHidden: true, description: 'Long time evolution' }
    ],
    hints: [
      'System: x\' = v, v\' = μ(1-x²)v - x',
      'The term μ(1-x²)v provides nonlinear damping',
      'For small x, damping is negative (energy added)',
      'For large x, damping is positive (energy removed)'
    ],
    language: 'python'
  },
  {
    id: 'math302-t7-ex14',
    subjectId: 'math302',
    topicId: 'math302-topic-7',
    title: 'Pendulum Equation',
    difficulty: 4,
    description: 'Solve the nonlinear pendulum equation θ\'\' + (g/L)sin(θ) = 0. Use RK4 for the system θ\' = ω, ω\' = -(g/L)sin(θ).',
    starterCode: `def nonlinear_pendulum(g, L, theta0, omega0, t, h):
    """
    Solve nonlinear pendulum θ'' + (g/L)sin(θ) = 0.
    System: θ' = ω, ω' = -(g/L)sin(θ)

    Args:
        g: Gravitational acceleration
        L: Pendulum length
        theta0: Initial angle (radians)
        omega0: Initial angular velocity
        t: Time to evaluate
        h: Step size

    Returns:
        Angle θ at time t
    """
    pass`,
    solution: `import math

def nonlinear_pendulum(g, L, theta0, omega0, t, h):
    """
    Solve nonlinear pendulum θ'' + (g/L)sin(θ) = 0.
    System: θ' = ω, ω' = -(g/L)sin(θ)

    Args:
        g: Gravitational acceleration
        L: Pendulum length
        theta0: Initial angle (radians)
        omega0: Initial angular velocity
        t: Time to evaluate
        h: Step size

    Returns:
        Angle θ at time t
    """
    # Convert to system
    def f(time, theta, omega):
        dtheta = omega
        domega = -(g / L) * math.sin(theta)
        return dtheta, domega

    # Solve using RK4
    time = 0
    theta = theta0
    omega = omega0

    while time < t:
        step = min(h, t - time)

        k1_theta, k1_omega = f(time, theta, omega)
        k2_theta, k2_omega = f(time + step/2, theta + step*k1_theta/2, omega + step*k1_omega/2)
        k3_theta, k3_omega = f(time + step/2, theta + step*k2_theta/2, omega + step*k2_omega/2)
        k4_theta, k4_omega = f(time + step, theta + step*k3_theta, omega + step*k3_omega)

        theta = theta + (step/6) * (k1_theta + 2*k2_theta + 2*k3_theta + k4_theta)
        omega = omega + (step/6) * (k1_omega + 2*k2_omega + 2*k3_omega + k4_omega)
        time = time + step

    return theta`,
    testCases: [
      { input: '9.8, 1, 0.1, 0, 2, 0.01', expectedOutput: '-0.09983342013818086', isHidden: false, description: 'Small angle oscillation' },
      { input: '9.8, 1, 1.57, 0, 1, 0.01', expectedOutput: '1.5692637549872774', isHidden: false, description: 'Large angle (π/2)' },
      { input: '9.8, 2, 0.5, 0, 3, 0.01', expectedOutput: '-0.3027261934398048', isHidden: false, description: 'Longer pendulum' },
      { input: '9.8, 0.5, 0.2, 0, 1.5, 0.01', expectedOutput: '0.19796763313758562', isHidden: true, description: 'Short pendulum' },
      { input: '10, 1, 1, 1, 2, 0.01', expectedOutput: '1.1992633074943992', isHidden: true, description: 'With initial velocity' }
    ],
    hints: [
      'System: θ\' = ω, ω\' = -(g/L)sin(θ)',
      'Use math.sin() for the sine function',
      'For small angles, sin(θ) ≈ θ (simple harmonic motion)',
      'For large angles, motion is nonlinear'
    ],
    language: 'python'
  },
  {
    id: 'math302-t7-ex15',
    subjectId: 'math302',
    topicId: 'math302-topic-7',
    title: 'Mixing Problem',
    difficulty: 3,
    description: 'A tank contains V liters with concentration c0. Solution flows in at rate r_in with concentration c_in, and out at rate r_out. Solve dc/dt = (r_in*c_in - r_out*c)/V.',
    starterCode: `def mixing_problem(r_in, c_in, r_out, V, c0, t, h):
    """
    Solve mixing problem: dc/dt = (r_in*c_in - r_out*c)/V.

    Args:
        r_in: Inflow rate (L/min)
        c_in: Inflow concentration (g/L)
        r_out: Outflow rate (L/min)
        V: Tank volume (L, assumed constant if r_in = r_out)
        c0: Initial concentration
        t: Time to evaluate
        h: Step size

    Returns:
        Concentration at time t
    """
    pass`,
    solution: `def mixing_problem(r_in, c_in, r_out, V, c0, t, h):
    """
    Solve mixing problem: dc/dt = (r_in*c_in - r_out*c)/V.

    Args:
        r_in: Inflow rate (L/min)
        c_in: Inflow concentration (g/L)
        r_out: Outflow rate (L/min)
        V: Tank volume (L, assumed constant if r_in = r_out)
        c0: Initial concentration
        t: Time to evaluate
        h: Step size

    Returns:
        Concentration at time t
    """
    # Define the ODE (assuming constant volume)
    def f(time, c):
        return (r_in * c_in - r_out * c) / V

    # Solve using RK4
    time = 0
    c = c0

    while time < t:
        step = min(h, t - time)

        k1 = f(time, c)
        k2 = f(time + step/2, c + step*k1/2)
        k3 = f(time + step/2, c + step*k2/2)
        k4 = f(time + step, c + step*k3)

        c = c + (step/6) * (k1 + 2*k2 + 2*k3 + k4)
        time = time + step

    return c`,
    testCases: [
      { input: '5, 10, 5, 100, 0, 20, 0.5', expectedOutput: '8.646630824295715', isHidden: false, description: 'Approaching equilibrium' },
      { input: '10, 5, 10, 200, 10, 30, 0.5', expectedOutput: '5.0', isHidden: false, description: 'Already at equilibrium' },
      { input: '2, 20, 2, 50, 0, 50, 0.5', expectedOutput: '19.263418798957613', isHidden: false, description: 'Long time evolution' },
      { input: '3, 15, 3, 150, 5, 40, 0.5', expectedOutput: '13.703353679904267', isHidden: true, description: 'Starting above equilibrium' },
      { input: '4, 8, 4, 80, 2, 25, 0.5', expectedOutput: '7.158682804253668', isHidden: true, description: 'Medium concentration' }
    ],
    hints: [
      'ODE: dc/dt = (r_in*c_in - r_out*c)/V',
      'Concentration approaches c_in as t → ∞',
      'Use RK4 for accurate solution'
    ],
    language: 'python'
  },
  {
    id: 'math302-t7-ex16',
    subjectId: 'math302',
    topicId: 'math302-topic-7',
    title: 'Chemical Reaction Kinetics',
    difficulty: 4,
    description: 'For the reversible reaction A ⇌ B with forward rate k_f and backward rate k_b, solve d[A]/dt = -k_f[A] + k_b[B] where [A] + [B] = total.',
    starterCode: `def reversible_reaction(k_f, k_b, A0, B0, t, h):
    """
    Solve reversible reaction A ⇌ B.
    d[A]/dt = -k_f[A] + k_b[B]
    d[B]/dt = k_f[A] - k_b[B]

    Args:
        k_f: Forward rate constant
        k_b: Backward rate constant
        A0: Initial concentration of A
        B0: Initial concentration of B
        t: Time to evaluate
        h: Step size

    Returns:
        Concentration of A at time t
    """
    pass`,
    solution: `def reversible_reaction(k_f, k_b, A0, B0, t, h):
    """
    Solve reversible reaction A ⇌ B.
    d[A]/dt = -k_f[A] + k_b[B]
    d[B]/dt = k_f[A] - k_b[B]

    Args:
        k_f: Forward rate constant
        k_b: Backward rate constant
        A0: Initial concentration of A
        B0: Initial concentration of B
        t: Time to evaluate
        h: Step size

    Returns:
        Concentration of A at time t
    """
    # Define the system
    def f(time, A, B):
        dA = -k_f * A + k_b * B
        dB = k_f * A - k_b * B
        return dA, dB

    # Solve using RK4
    time = 0
    A = A0
    B = B0

    while time < t:
        step = min(h, t - time)

        k1_A, k1_B = f(time, A, B)
        k2_A, k2_B = f(time + step/2, A + step*k1_A/2, B + step*k1_B/2)
        k3_A, k3_B = f(time + step/2, A + step*k2_A/2, B + step*k2_B/2)
        k4_A, k4_B = f(time + step, A + step*k3_A, B + step*k3_B)

        A = A + (step/6) * (k1_A + 2*k2_A + 2*k3_A + k4_A)
        B = B + (step/6) * (k1_B + 2*k2_B + 2*k3_B + k4_B)
        time = time + step

    return A`,
    testCases: [
      { input: '0.1, 0.05, 1, 0, 10, 0.1', expectedOutput: '0.3333662220035623', isHidden: false, description: 'Approach equilibrium' },
      { input: '0.2, 0.2, 0.5, 0.5, 5, 0.1', expectedOutput: '0.5', isHidden: false, description: 'Equal rates at equilibrium' },
      { input: '0.3, 0.1, 1, 0, 20, 0.1', expectedOutput: '0.25000000027866886', isHidden: false, description: 'Fast forward reaction' },
      { input: '0.05, 0.15, 0.2, 0.8, 15, 0.1', expectedOutput: '0.7499999999951086', isHidden: true, description: 'Favors A' },
      { input: '0.1, 0.1, 0.6, 0.4, 10, 0.1', expectedOutput: '0.6', isHidden: true, description: 'Balanced kinetics' }
    ],
    hints: [
      'System: d[A]/dt = -k_f[A] + k_b[B]',
      '        d[B]/dt = k_f[A] - k_b[B]',
      'At equilibrium: k_f[A_eq] = k_b[B_eq]',
      '[A] + [B] = constant (conservation)'
    ],
    language: 'python'
  }
];
