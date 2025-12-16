import { CodingExercise } from '../../../../core/types';

export const topic6Exercises: CodingExercise[] = [
  {
    id: 'math301-t6-ex01',
    subjectId: 'math301',
    topicId: 'math301-topic-6',
    title: 'Scalar Line Integral',
    difficulty: 1,
    description: 'Compute a line integral of a scalar function ∫_C f ds along a parametric curve.',
    starterCode: `import numpy as np
from scipy import integrate

def scalar_line_integral(f, r, t_bounds, n_points=1000):
    """
    Compute ∫_C f(x,y) ds where C is parametrized by r(t).

    Args:
        f: Scalar function f(x, y)
        r: Parametric curve r(t) returns [x(t), y(t)]
        t_bounds: (t_min, t_max)
        n_points: Number of points for discretization
    Returns:
        Value of the line integral
    """
    # Your implementation here
    # Remember: ds = |r'(t)| dt
    pass`,
    solution: `import numpy as np
from scipy import integrate

def scalar_line_integral(f, r, t_bounds, n_points=1000):
    """
    Compute ∫_C f(x,y) ds where C is parametrized by r(t).
    """
    def integrand(t):
        # Get position
        pos = r(t)
        x, y = pos[0], pos[1]

        # Compute derivative numerically
        h = 1e-6
        r_plus = r(t + h)
        r_minus = r(t - h)
        dr_dt = [(r_plus[i] - r_minus[i]) / (2 * h) for i in range(len(pos))]

        # Magnitude of derivative
        ds_dt = np.sqrt(sum(comp**2 for comp in dr_dt))

        return f(x, y) * ds_dt

    result, _ = integrate.quad(integrand, t_bounds[0], t_bounds[1])
    return result`,
    testCases: [
      { input: 'round(scalar_line_integral(lambda x, y: 1, lambda t: [t, 0], (0, 1)), 5)', isHidden: false, description: 'Test case' },
      { input: 'round(scalar_line_integral(lambda x, y: x+y, lambda t: [t, t], (0, 1)), 5)', isHidden: false, description: 'Test case' },
      { input: 'round(scalar_line_integral(lambda x, y: x**2+y**2, lambda t: [np.cos(t), np.sin(t)], (0, 2*np.pi)), 5)', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'ds = |r\'(t)| dt is the arc length element',
      'Compute r\'(t) numerically using finite differences',
      '|r\'(t)| = √((dx/dt)² + (dy/dt)²)'
    ],
    language: 'python'
  },
  {
    id: 'math301-t6-ex02',
    subjectId: 'math301',
    topicId: 'math301-topic-6',
    title: 'Arc Length',
    difficulty: 1,
    description: 'Calculate the arc length of a parametric curve using line integrals.',
    starterCode: `import numpy as np
from scipy import integrate

def arc_length(r, t_bounds):
    """
    Compute arc length L = ∫_C ds = ∫ |r'(t)| dt

    Args:
        r: Parametric curve r(t) returns [x(t), y(t)]
        t_bounds: (t_min, t_max)
    Returns:
        Arc length of the curve
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np
from scipy import integrate

def arc_length(r, t_bounds):
    """
    Compute arc length L = ∫_C ds = ∫ |r'(t)| dt
    """
    def integrand(t):
        h = 1e-6
        r_plus = r(t + h)
        r_minus = r(t - h)
        dr_dt = [(r_plus[i] - r_minus[i]) / (2 * h) for i in range(len(r_plus))]
        return np.sqrt(sum(comp**2 for comp in dr_dt))

    result, _ = integrate.quad(integrand, t_bounds[0], t_bounds[1])
    return result`,
    testCases: [
      { input: 'round(arc_length(lambda t: [t, 0], (0, 5)), 5)', isHidden: false, description: 'Test case' },
      { input: 'round(arc_length(lambda t: [np.cos(t), np.sin(t)], (0, np.pi)), 5)', isHidden: false, description: 'Test case' },
      { input: 'round(arc_length(lambda t: [t, t**2], (0, 1)), 5)', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'Arc length is the integral of the speed |r\'(t)|',
      'For a circle of radius R, arc length = Rθ',
      'Use numerical differentiation for r\'(t)'
    ],
    language: 'python'
  },
  {
    id: 'math301-t6-ex03',
    subjectId: 'math301',
    topicId: 'math301-topic-6',
    title: 'Vector Line Integral',
    difficulty: 2,
    description: 'Compute a line integral of a vector field ∫_C F·dr.',
    starterCode: `import numpy as np
from scipy import integrate

def vector_line_integral(F, r, t_bounds):
    """
    Compute ∫_C F·dr where F is a vector field and C is parametrized by r(t).

    Args:
        F: Vector field F(x, y) returns [F_x, F_y]
        r: Parametric curve r(t) returns [x(t), y(t)]
        t_bounds: (t_min, t_max)
    Returns:
        Value of the line integral
    """
    # Your implementation here
    # Remember: F·dr = F·(dr/dt) dt
    pass`,
    solution: `import numpy as np
from scipy import integrate

def vector_line_integral(F, r, t_bounds):
    """
    Compute ∫_C F·dr where F is a vector field and C is parametrized by r(t).
    """
    def integrand(t):
        # Get position
        pos = r(t)
        x, y = pos[0], pos[1]

        # Get field value
        field = F(x, y)

        # Compute dr/dt numerically
        h = 1e-6
        r_plus = r(t + h)
        r_minus = r(t - h)
        dr_dt = [(r_plus[i] - r_minus[i]) / (2 * h) for i in range(len(pos))]

        # Dot product F · (dr/dt)
        dot_product = sum(field[i] * dr_dt[i] for i in range(len(field)))
        return dot_product

    result, _ = integrate.quad(integrand, t_bounds[0], t_bounds[1])
    return result`,
    testCases: [
      { input: 'vector_line_integral(lambda x, y: [1, 0], lambda t: [t, 0], (0, 1))', isHidden: false, description: 'Test case' },
      { input: 'vector_line_integral(lambda x, y: [y, x], lambda t: [t, t], (0, 1))', isHidden: false, description: 'Test case' },
      { input: 'round(vector_line_integral(lambda x, y: [-y, x], lambda t: [np.cos(t), np.sin(t)], (0, 2*np.pi)), 5)', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'Line integral: ∫_C F·dr = ∫ F·(dr/dt) dt',
      'Compute the dot product F(r(t)) · r\'(t)',
      'Integrate the scalar result over the parameter interval'
    ],
    language: 'python'
  },
  {
    id: 'math301-t6-ex04',
    subjectId: 'math301',
    topicId: 'math301-topic-6',
    title: 'Work Done by Force Field',
    difficulty: 2,
    description: 'Calculate the work done by a force field along a path.',
    starterCode: `import numpy as np
from scipy import integrate

def work_done(F, r, t_bounds):
    """
    Calculate work W = ∫_C F·dr done by force F along path r(t).

    Args:
        F: Force field F(x, y) returns [F_x, F_y]
        r: Path r(t) returns [x(t), y(t)]
        t_bounds: (t_min, t_max)
    Returns:
        Work done by the force
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np
from scipy import integrate

def work_done(F, r, t_bounds):
    """
    Calculate work W = ∫_C F·dr done by force F along path r(t).
    """
    def integrand(t):
        pos = r(t)
        x, y = pos[0], pos[1]
        field = F(x, y)

        h = 1e-6
        r_plus = r(t + h)
        r_minus = r(t - h)
        dr_dt = [(r_plus[i] - r_minus[i]) / (2 * h) for i in range(len(pos))]

        return sum(field[i] * dr_dt[i] for i in range(len(field)))

    result, _ = integrate.quad(integrand, t_bounds[0], t_bounds[1])
    return result`,
    testCases: [
      { input: 'work_done(lambda x, y: [1, 1], lambda t: [t, t], (0, 1))', isHidden: false, description: 'Test case' },
      { input: 'work_done(lambda x, y: [x, y], lambda t: [t, 0], (0, 2))', isHidden: false, description: 'Test case' },
      { input: 'round(work_done(lambda x, y: [y**2, x**2], lambda t: [np.cos(t), np.sin(t)], (0, np.pi/2)), 5)', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'Work is the line integral of force: W = ∫_C F·dr',
      'Same computation as vector line integral',
      'Positive work means force helps motion, negative means it opposes'
    ],
    language: 'python'
  },
  {
    id: 'math301-t6-ex05',
    subjectId: 'math301',
    topicId: 'math301-topic-6',
    title: 'Conservative Field Test',
    difficulty: 3,
    description: 'Test if a vector field is conservative by checking if ∂P/∂y = ∂Q/∂x.',
    starterCode: `import numpy as np

def is_conservative(P, Q, test_points):
    """
    Test if F = [P, Q] is conservative by checking ∂P/∂y = ∂Q/∂x
    at multiple test points.

    Args:
        P: Component function P(x, y)
        Q: Component function Q(x, y)
        test_points: List of (x, y) points to test
    Returns:
        True if conservative (within tolerance), False otherwise
    """
    # Your implementation here
    # Use numerical partial derivatives
    pass`,
    solution: `import numpy as np

def is_conservative(P, Q, test_points):
    """
    Test if F = [P, Q] is conservative by checking ∂P/∂y = ∂Q/∂x.
    """
    h = 1e-6
    tolerance = 1e-4

    for x, y in test_points:
        # ∂P/∂y
        dP_dy = (P(x, y + h) - P(x, y - h)) / (2 * h)

        # ∂Q/∂x
        dQ_dx = (Q(x + h, y) - Q(x - h, y)) / (2 * h)

        # Check if equal within tolerance
        if abs(dP_dy - dQ_dx) > tolerance:
            return False

    return True`,
    testCases: [
      { input: 'is_conservative(lambda x, y: 2*x*y, lambda x, y: x**2, [(0, 0), (1, 1), (2, 3)])', isHidden: false, description: 'Test case' },
      { input: 'is_conservative(lambda x, y: y, lambda x, y: -x, [(1, 1), (2, 2)])', isHidden: false, description: 'Test case' },
      { input: 'is_conservative(lambda x, y: y, lambda x, y: x, [(0, 1), (1, 0), (1, 1)])', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'A field F = [P, Q] is conservative if ∂P/∂y = ∂Q/∂x',
      'Use central differences for numerical partial derivatives',
      'Check the condition at multiple points for robustness'
    ],
    language: 'python'
  },
  {
    id: 'math301-t6-ex06',
    subjectId: 'math301',
    topicId: 'math301-topic-6',
    title: 'Find Potential Function',
    difficulty: 3,
    description: 'Find a potential function f such that ∇f = F for a conservative field.',
    starterCode: `import numpy as np
from scipy import integrate

def find_potential(P, Q, reference_point=(0, 0)):
    """
    Find potential function f(x,y) such that ∇f = [P, Q].
    Returns a function f(x, y).

    Args:
        P: Component P(x, y) where ∂f/∂x = P
        Q: Component Q(x, y) where ∂f/∂y = Q
        reference_point: Point where f = 0
    Returns:
        Function f(x, y) such that ∇f = [P, Q]
    """
    # Your implementation here
    # Integrate P with respect to x, then add g(y) from integrating Q
    pass`,
    solution: `import numpy as np
from scipy import integrate

def find_potential(P, Q, reference_point=(0, 0)):
    """
    Find potential function f(x,y) such that ∇f = [P, Q].
    """
    x0, y0 = reference_point

    def f(x, y):
        # Integrate P from x0 to x along y = y0
        path1, _ = integrate.quad(lambda t: P(t, y0), x0, x)

        # Integrate Q from y0 to y along x = x
        path2, _ = integrate.quad(lambda t: Q(x, t), y0, y)

        return path1 + path2

    return f`,
    testCases: [
      { input: 'f = find_potential(lambda x, y: 2*x, lambda x, y: 2*y); round(f(1, 1), 5)', isHidden: false, description: 'Test case' },
      { input: 'f = find_potential(lambda x, y: y, lambda x, y: x); round(f(2, 3), 5)', isHidden: false, description: 'Test case' },
      { input: 'f = find_potential(lambda x, y: 2*x*y, lambda x, y: x**2); round(f(2, 2), 5)', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'For conservative F, line integral is path-independent',
      'f(x,y) = ∫ P dx + ∫ Q dy along any path from reference to (x,y)',
      'Use a simple L-shaped path: (x0,y0) → (x,y0) → (x,y)'
    ],
    language: 'python'
  },
  {
    id: 'math301-t6-ex07',
    subjectId: 'math301',
    topicId: 'math301-topic-6',
    title: 'Fundamental Theorem for Line Integrals',
    difficulty: 3,
    description: 'Use the Fundamental Theorem: ∫_C ∇f·dr = f(B) - f(A) for conservative fields.',
    starterCode: `import numpy as np

def line_integral_conservative(f, point_A, point_B):
    """
    Compute ∫_C ∇f·dr using Fundamental Theorem.
    For conservative field, integral = f(B) - f(A).

    Args:
        f: Potential function f(x, y)
        point_A: Starting point (x_A, y_A)
        point_B: Ending point (x_B, y_B)
    Returns:
        Value of the line integral
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np

def line_integral_conservative(f, point_A, point_B):
    """
    Compute ∫_C ∇f·dr using Fundamental Theorem.
    """
    x_A, y_A = point_A
    x_B, y_B = point_B

    return f(x_B, y_B) - f(x_A, y_A)`,
    testCases: [
      { input: 'line_integral_conservative(lambda x, y: x**2 + y**2, (0, 0), (1, 1))', isHidden: false, description: 'Test case' },
      { input: 'line_integral_conservative(lambda x, y: x*y, (1, 2), (3, 4))', isHidden: false, description: 'Test case' },
      { input: 'line_integral_conservative(lambda x, y: np.sin(x) + np.cos(y), (0, 0), (np.pi/2, np.pi/2))', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'Fundamental Theorem: ∫_C ∇f·dr = f(B) - f(A)',
      'The integral is path-independent for conservative fields',
      'Only depends on endpoints, not the path taken'
    ],
    language: 'python'
  },
  {
    id: 'math301-t6-ex08',
    subjectId: 'math301',
    topicId: 'math301-topic-6',
    title: 'Parametric Surface',
    difficulty: 2,
    description: 'Create a parametric representation of a surface and evaluate it at points.',
    starterCode: `import numpy as np

def parametric_surface(surface_type, u, v):
    """
    Return point [x, y, z] on parametric surface at parameters (u, v).

    Args:
        surface_type: 'plane', 'cylinder', or 'sphere'
        u: First parameter
        v: Second parameter
    Returns:
        [x, y, z] position on surface
    """
    # Your implementation here
    # plane: [u, v, 0]
    # cylinder (radius 1): [cos(u), sin(u), v]
    # sphere (radius 1): [sin(v)*cos(u), sin(v)*sin(u), cos(v)]
    pass`,
    solution: `import numpy as np

def parametric_surface(surface_type, u, v):
    """
    Return point [x, y, z] on parametric surface at parameters (u, v).
    """
    if surface_type == 'plane':
        return [u, v, 0]
    elif surface_type == 'cylinder':
        return [np.cos(u), np.sin(u), v]
    elif surface_type == 'sphere':
        return [np.sin(v) * np.cos(u), np.sin(v) * np.sin(u), np.cos(v)]
    else:
        raise ValueError("Unknown surface type")`,
    testCases: [
      { input: 'parametric_surface("plane", 1, 2)', isHidden: false, description: 'Test case' },
      { input: '[round(x, 5) for x in parametric_surface("cylinder", 0, 1)]', isHidden: false, description: 'Test case' },
      { input: '[round(x, 5) for x in parametric_surface("sphere", np.pi/4, np.pi/4)]', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'Plane in xy-plane: r(u,v) = [u, v, 0]',
      'Cylinder: r(u,v) = [R cos u, R sin u, v]',
      'Sphere: r(u,v) = [R sin v cos u, R sin v sin u, R cos v]'
    ],
    language: 'python'
  },
  {
    id: 'math301-t6-ex09',
    subjectId: 'math301',
    topicId: 'math301-topic-6',
    title: 'Surface Normal Vector',
    difficulty: 3,
    description: 'Compute the normal vector to a parametric surface using the cross product.',
    starterCode: `import numpy as np

def surface_normal(r, u, v):
    """
    Compute normal vector n = r_u × r_v at point (u, v).

    Args:
        r: Parametric surface r(u, v) returns [x, y, z]
        u: First parameter value
        v: Second parameter value
    Returns:
        Normal vector [n_x, n_y, n_z]
    """
    # Your implementation here
    # Compute r_u and r_v numerically, then cross product
    pass`,
    solution: `import numpy as np

def surface_normal(r, u, v):
    """
    Compute normal vector n = r_u × r_v at point (u, v).
    """
    h = 1e-6

    # Compute r_u numerically
    r_u_plus = r(u + h, v)
    r_u_minus = r(u - h, v)
    r_u = [(r_u_plus[i] - r_u_minus[i]) / (2 * h) for i in range(3)]

    # Compute r_v numerically
    r_v_plus = r(u, v + h)
    r_v_minus = r(u, v - h)
    r_v = [(r_v_plus[i] - r_v_minus[i]) / (2 * h) for i in range(3)]

    # Cross product r_u × r_v
    normal = [
        r_u[1] * r_v[2] - r_u[2] * r_v[1],
        r_u[2] * r_v[0] - r_u[0] * r_v[2],
        r_u[0] * r_v[1] - r_u[1] * r_v[0]
    ]

    return normal`,
    testCases: [
      { input: '[round(x, 5) for x in surface_normal(lambda u, v: [u, v, 0], 0, 0)]', isHidden: false, description: 'Test case' },
      { input: '[round(x, 5) for x in surface_normal(lambda u, v: [np.cos(u), np.sin(u), v], 0, 0)]', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Normal vector: n = r_u × r_v',
      'Compute partial derivatives r_u and r_v numerically',
      'Cross product: [a×b]_i = a_j b_k - a_k b_j (cyclic)'
    ],
    language: 'python'
  },
  {
    id: 'math301-t6-ex10',
    subjectId: 'math301',
    topicId: 'math301-topic-6',
    title: 'Surface Area',
    difficulty: 4,
    description: 'Compute the surface area using ∫∫ |r_u × r_v| du dv.',
    starterCode: `import numpy as np
from scipy import integrate

def surface_area(r, u_bounds, v_bounds):
    """
    Compute surface area A = ∫∫ |r_u × r_v| du dv.

    Args:
        r: Parametric surface r(u, v) returns [x, y, z]
        u_bounds: (u_min, u_max)
        v_bounds: (v_min, v_max)
    Returns:
        Surface area
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np
from scipy import integrate

def surface_area(r, u_bounds, v_bounds):
    """
    Compute surface area A = ∫∫ |r_u × r_v| du dv.
    """
    def integrand(v, u):
        h = 1e-6

        # r_u
        r_u_plus = r(u + h, v)
        r_u_minus = r(u - h, v)
        r_u = [(r_u_plus[i] - r_u_minus[i]) / (2 * h) for i in range(3)]

        # r_v
        r_v_plus = r(u, v + h)
        r_v_minus = r(u, v - h)
        r_v = [(r_v_plus[i] - r_v_minus[i]) / (2 * h) for i in range(3)]

        # Cross product
        cross = [
            r_u[1] * r_v[2] - r_u[2] * r_v[1],
            r_u[2] * r_v[0] - r_u[0] * r_v[2],
            r_u[0] * r_v[1] - r_u[1] * r_v[0]
        ]

        # Magnitude
        return np.sqrt(sum(c**2 for c in cross))

    result, _ = integrate.dblquad(integrand,
                                   u_bounds[0], u_bounds[1],
                                   v_bounds[0], v_bounds[1])
    return result`,
    testCases: [
      { input: 'round(surface_area(lambda u, v: [u, v, 0], (0, 1), (0, 1)), 5)', isHidden: false, description: 'Test case' },
      { input: 'round(surface_area(lambda u, v: [np.cos(u), np.sin(u), v], (0, 2*np.pi), (0, 1)), 5)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Surface area element: dS = |r_u × r_v| du dv',
      'Compute the cross product r_u × r_v',
      'Integrate its magnitude over the parameter domain'
    ],
    language: 'python'
  },
  {
    id: 'math301-t6-ex11',
    subjectId: 'math301',
    topicId: 'math301-topic-6',
    title: 'Surface Integral of Scalar',
    difficulty: 4,
    description: 'Compute a surface integral ∫∫_S f dS of a scalar function.',
    starterCode: `import numpy as np
from scipy import integrate

def scalar_surface_integral(f, r, u_bounds, v_bounds):
    """
    Compute ∫∫_S f(x,y,z) dS where S is parametrized by r(u,v).

    Args:
        f: Scalar function f(x, y, z)
        r: Parametric surface r(u, v) returns [x, y, z]
        u_bounds: (u_min, u_max)
        v_bounds: (v_min, v_max)
    Returns:
        Value of the surface integral
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np
from scipy import integrate

def scalar_surface_integral(f, r, u_bounds, v_bounds):
    """
    Compute ∫∫_S f(x,y,z) dS where S is parametrized by r(u,v).
    """
    def integrand(v, u):
        pos = r(u, v)
        x, y, z = pos[0], pos[1], pos[2]

        h = 1e-6

        # r_u
        r_u_plus = r(u + h, v)
        r_u_minus = r(u - h, v)
        r_u = [(r_u_plus[i] - r_u_minus[i]) / (2 * h) for i in range(3)]

        # r_v
        r_v_plus = r(u, v + h)
        r_v_minus = r(u, v - h)
        r_v = [(r_v_plus[i] - r_v_minus[i]) / (2 * h) for i in range(3)]

        # Cross product magnitude
        cross = [
            r_u[1] * r_v[2] - r_u[2] * r_v[1],
            r_u[2] * r_v[0] - r_u[0] * r_v[2],
            r_u[0] * r_v[1] - r_u[1] * r_v[0]
        ]
        dS = np.sqrt(sum(c**2 for c in cross))

        return f(x, y, z) * dS

    result, _ = integrate.dblquad(integrand,
                                   u_bounds[0], u_bounds[1],
                                   v_bounds[0], v_bounds[1])
    return result`,
    testCases: [
      { input: 'round(scalar_surface_integral(lambda x, y, z: 1, lambda u, v: [u, v, 0], (0, 1), (0, 1)), 5)', isHidden: false, description: 'Test case' },
      { input: 'round(scalar_surface_integral(lambda x, y, z: z, lambda u, v: [u, v, u+v], (0, 1), (0, 1)), 5)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Surface integral: ∫∫_S f dS = ∫∫ f(r(u,v)) |r_u × r_v| du dv',
      'Evaluate f at the parametric position r(u,v)',
      'Multiply by the surface area element |r_u × r_v|'
    ],
    language: 'python'
  },
  {
    id: 'math301-t6-ex12',
    subjectId: 'math301',
    topicId: 'math301-topic-6',
    title: 'Flux Through Surface',
    difficulty: 4,
    description: 'Compute the flux of a vector field through a surface: ∫∫_S F·n dS.',
    starterCode: `import numpy as np
from scipy import integrate

def flux_through_surface(F, r, u_bounds, v_bounds):
    """
    Compute flux ∫∫_S F·n dS = ∫∫ F·(r_u × r_v) du dv.

    Args:
        F: Vector field F(x, y, z) returns [F_x, F_y, F_z]
        r: Parametric surface r(u, v) returns [x, y, z]
        u_bounds: (u_min, u_max)
        v_bounds: (v_min, v_max)
    Returns:
        Flux through the surface
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np
from scipy import integrate

def flux_through_surface(F, r, u_bounds, v_bounds):
    """
    Compute flux ∫∫_S F·n dS = ∫∫ F·(r_u × r_v) du dv.
    """
    def integrand(v, u):
        pos = r(u, v)
        x, y, z = pos[0], pos[1], pos[2]

        # Get field value
        field = F(x, y, z)

        h = 1e-6

        # r_u
        r_u_plus = r(u + h, v)
        r_u_minus = r(u - h, v)
        r_u = [(r_u_plus[i] - r_u_minus[i]) / (2 * h) for i in range(3)]

        # r_v
        r_v_plus = r(u, v + h)
        r_v_minus = r(u, v - h)
        r_v = [(r_v_plus[i] - r_v_minus[i]) / (2 * h) for i in range(3)]

        # Normal vector (r_u × r_v)
        normal = [
            r_u[1] * r_v[2] - r_u[2] * r_v[1],
            r_u[2] * r_v[0] - r_u[0] * r_v[2],
            r_u[0] * r_v[1] - r_u[1] * r_v[0]
        ]

        # Dot product F · (r_u × r_v)
        return sum(field[i] * normal[i] for i in range(3))

    result, _ = integrate.dblquad(integrand,
                                   u_bounds[0], u_bounds[1],
                                   v_bounds[0], v_bounds[1])
    return result`,
    testCases: [
      { input: 'round(flux_through_surface(lambda x, y, z: [0, 0, 1], lambda u, v: [u, v, 0], (0, 1), (0, 1)), 5)', isHidden: false, description: 'Test case' },
      { input: 'round(flux_through_surface(lambda x, y, z: [x, y, z], lambda u, v: [u, v, 1], (0, 1), (0, 1)), 5)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Flux = ∫∫_S F·n̂ dS where n̂ is unit normal',
      'Can write as ∫∫ F·(r_u × r_v) du dv',
      'The normal r_u × r_v includes the dS factor'
    ],
    language: 'python'
  },
  {
    id: 'math301-t6-ex13',
    subjectId: 'math301',
    topicId: 'math301-topic-6',
    title: 'Oriented Surface Normal',
    difficulty: 3,
    description: 'Compute unit normal vector with specified orientation (outward or inward).',
    starterCode: `import numpy as np

def oriented_normal(r, u, v, orientation='outward'):
    """
    Compute unit normal vector with specified orientation.

    Args:
        r: Parametric surface r(u, v) returns [x, y, z]
        u: First parameter
        v: Second parameter
        orientation: 'outward' or 'inward'
    Returns:
        Unit normal vector
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np

def oriented_normal(r, u, v, orientation='outward'):
    """
    Compute unit normal vector with specified orientation.
    """
    h = 1e-6

    # r_u
    r_u_plus = r(u + h, v)
    r_u_minus = r(u - h, v)
    r_u = [(r_u_plus[i] - r_u_minus[i]) / (2 * h) for i in range(3)]

    # r_v
    r_v_plus = r(u, v + h)
    r_v_minus = r(u, v - h)
    r_v = [(r_v_plus[i] - r_v_minus[i]) / (2 * h) for i in range(3)]

    # Normal r_u × r_v
    normal = [
        r_u[1] * r_v[2] - r_u[2] * r_v[1],
        r_u[2] * r_v[0] - r_u[0] * r_v[2],
        r_u[0] * r_v[1] - r_u[1] * r_v[0]
    ]

    # Normalize
    magnitude = np.sqrt(sum(n**2 for n in normal))
    unit_normal = [n / magnitude for n in normal]

    # Check orientation (for sphere-like surfaces, outward points away from origin)
    pos = r(u, v)
    dot_with_position = sum(unit_normal[i] * pos[i] for i in range(3))

    if orientation == 'outward':
        if dot_with_position < 0:
            unit_normal = [-n for n in unit_normal]
    else:  # inward
        if dot_with_position > 0:
            unit_normal = [-n for n in unit_normal]

    return unit_normal`,
    testCases: [
      { input: '[round(x, 5) for x in oriented_normal(lambda u, v: [np.sin(v)*np.cos(u), np.sin(v)*np.sin(u), np.cos(v)], 0, np.pi/4, "outward")]', isHidden: false, description: 'Test case' },
      { input: '[round(x, 5) for x in oriented_normal(lambda u, v: [u, v, 0], 0, 0, "outward")]', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Compute n = r_u × r_v, then normalize to get unit vector',
      'For closed surfaces, outward normal points away from interior',
      'May need to flip sign: -n instead of n'
    ],
    language: 'python'
  },
  {
    id: 'math301-t6-ex14',
    subjectId: 'math301',
    topicId: 'math301-topic-6',
    title: 'Mass of Surface',
    difficulty: 4,
    description: 'Calculate the mass of a surface with variable density.',
    starterCode: `import numpy as np
from scipy import integrate

def surface_mass(density, r, u_bounds, v_bounds):
    """
    Calculate mass M = ∫∫_S ρ(x,y,z) dS.

    Args:
        density: Density function ρ(x, y, z)
        r: Parametric surface r(u, v) returns [x, y, z]
        u_bounds: (u_min, u_max)
        v_bounds: (v_min, v_max)
    Returns:
        Total mass of the surface
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np
from scipy import integrate

def surface_mass(density, r, u_bounds, v_bounds):
    """
    Calculate mass M = ∫∫_S ρ(x,y,z) dS.
    """
    def integrand(v, u):
        pos = r(u, v)
        x, y, z = pos[0], pos[1], pos[2]

        h = 1e-6

        # r_u
        r_u_plus = r(u + h, v)
        r_u_minus = r(u - h, v)
        r_u = [(r_u_plus[i] - r_u_minus[i]) / (2 * h) for i in range(3)]

        # r_v
        r_v_plus = r(u, v + h)
        r_v_minus = r(u, v - h)
        r_v = [(r_v_plus[i] - r_v_minus[i]) / (2 * h) for i in range(3)]

        # dS
        cross = [
            r_u[1] * r_v[2] - r_u[2] * r_v[1],
            r_u[2] * r_v[0] - r_u[0] * r_v[2],
            r_u[0] * r_v[1] - r_u[1] * r_v[0]
        ]
        dS = np.sqrt(sum(c**2 for c in cross))

        return density(x, y, z) * dS

    result, _ = integrate.dblquad(integrand,
                                   u_bounds[0], u_bounds[1],
                                   v_bounds[0], v_bounds[1])
    return result`,
    testCases: [
      { input: 'round(surface_mass(lambda x, y, z: 1, lambda u, v: [u, v, 0], (0, 1), (0, 1)), 5)', isHidden: false, description: 'Test case' },
      { input: 'round(surface_mass(lambda x, y, z: z+1, lambda u, v: [u, v, u+v], (0, 1), (0, 1)), 5)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Mass = ∫∫_S ρ dS (surface integral of density)',
      'Same as scalar surface integral with f = ρ',
      'For uniform density ρ = c, mass = c × surface area'
    ],
    language: 'python'
  },
  {
    id: 'math301-t6-ex15',
    subjectId: 'math301',
    topicId: 'math301-topic-6',
    title: 'Electric Flux',
    difficulty: 5,
    description: 'Calculate electric flux through a closed surface (Gauss\' law application).',
    starterCode: `import numpy as np
from scipy import integrate

def electric_flux(charge_density, r, u_bounds, v_bounds):
    """
    Calculate electric flux for field E due to charge at origin.
    E = (q / (4πε₀r²)) r̂  (use ε₀ = 1 for simplicity)

    Args:
        charge_density: Total charge q
        r: Parametric surface r(u, v) returns [x, y, z]
        u_bounds: (u_min, u_max)
        v_bounds: (v_min, v_max)
    Returns:
        Electric flux through the surface
    """
    # Your implementation here
    # E = (q/(4π)) * (r/|r|³) where r is position vector
    pass`,
    solution: `import numpy as np
from scipy import integrate

def electric_flux(charge_density, r, u_bounds, v_bounds):
    """
    Calculate electric flux for field E due to charge at origin.
    """
    q = charge_density

    def integrand(v_param, u_param):
        pos = r(u_param, v_param)
        x, y, z = pos[0], pos[1], pos[2]

        # Electric field E = (q/(4π)) * r/|r|³
        r_mag = np.sqrt(x**2 + y**2 + z**2)
        if r_mag < 1e-10:
            return 0
        E = [q / (4 * np.pi) * pos[i] / r_mag**3 for i in range(3)]

        h = 1e-6

        # r_u
        r_u_plus = r(u_param + h, v_param)
        r_u_minus = r(u_param - h, v_param)
        r_u = [(r_u_plus[i] - r_u_minus[i]) / (2 * h) for i in range(3)]

        # r_v
        r_v_plus = r(u_param, v_param + h)
        r_v_minus = r(u_param, v_param - h)
        r_v = [(r_v_plus[i] - r_v_minus[i]) / (2 * h) for i in range(3)]

        # Normal
        normal = [
            r_u[1] * r_v[2] - r_u[2] * r_v[1],
            r_u[2] * r_v[0] - r_u[0] * r_v[2],
            r_u[0] * r_v[1] - r_u[1] * r_v[0]
        ]

        # E · n
        return sum(E[i] * normal[i] for i in range(3))

    result, _ = integrate.dblquad(integrand,
                                   u_bounds[0], u_bounds[1],
                                   v_bounds[0], v_bounds[1])
    return result`,
    testCases: [
      { input: 'round(electric_flux(1.0, lambda u, v: [np.sin(v)*np.cos(u), np.sin(v)*np.sin(u), np.cos(v)], (0, 2*np.pi), (0, np.pi)), 5)', isHidden: false, description: 'Test case' },
      { input: 'round(electric_flux(2.0, lambda u, v: [2*np.sin(v)*np.cos(u), 2*np.sin(v)*np.sin(u), 2*np.cos(v)], (0, 2*np.pi), (0, np.pi)), 5)', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'Gauss\' law: flux through closed surface = q/ε₀',
      'E = (q/(4πε₀)) r̂/r² for point charge',
      'Flux should be independent of sphere radius'
    ],
    language: 'python'
  },
  {
    id: 'math301-t6-ex16',
    subjectId: 'math301',
    topicId: 'math301-topic-6',
    title: 'Circulation Around Curve',
    difficulty: 3,
    description: 'Compute the circulation of a vector field around a closed curve.',
    starterCode: `import numpy as np
from scipy import integrate

def circulation(F, r, t_bounds):
    """
    Compute circulation ∮_C F·dr around closed curve C.

    Args:
        F: Vector field F(x, y) returns [F_x, F_y]
        r: Closed curve r(t) returns [x(t), y(t)]
        t_bounds: (t_min, t_max) where r(t_min) = r(t_max)
    Returns:
        Circulation around the curve
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np
from scipy import integrate

def circulation(F, r, t_bounds):
    """
    Compute circulation ∮_C F·dr around closed curve C.
    """
    def integrand(t):
        pos = r(t)
        x, y = pos[0], pos[1]
        field = F(x, y)

        h = 1e-6
        r_plus = r(t + h)
        r_minus = r(t - h)
        dr_dt = [(r_plus[i] - r_minus[i]) / (2 * h) for i in range(len(pos))]

        return sum(field[i] * dr_dt[i] for i in range(len(field)))

    result, _ = integrate.quad(integrand, t_bounds[0], t_bounds[1])
    return result`,
    testCases: [
      { input: 'round(circulation(lambda x, y: [-y, x], lambda t: [np.cos(t), np.sin(t)], (0, 2*np.pi)), 5)', isHidden: false, description: 'Test case' },
      { input: 'round(circulation(lambda x, y: [y, x], lambda t: [np.cos(t), np.sin(t)], (0, 2*np.pi)), 10)', isHidden: false, description: 'Test case' },
      { input: 'round(circulation(lambda x, y: [x, y], lambda t: [2*np.cos(t), 2*np.sin(t)], (0, 2*np.pi)), 10)', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'Circulation = ∮_C F·dr (line integral around closed curve)',
      'Related to curl by Green\'s theorem',
      'For conservative fields, circulation = 0'
    ],
    language: 'python'
  }
];
