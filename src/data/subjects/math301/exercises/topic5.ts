import { CodingExercise } from '../../../../core/types';

export const topic5Exercises: CodingExercise[] = [
  {
    id: 'math301-t5-ex01',
    subjectId: 'math301',
    topicId: 'math301-topic-5',
    title: 'Double Integral over Rectangle',
    difficulty: 1,
    description: 'Compute a double integral ∫∫_R f(x,y) dA over a rectangular region using numerical integration.',
    starterCode: `import numpy as np
from scipy import integrate

def double_integral_rectangle(f, x_bounds, y_bounds):
    """
    Compute double integral of f over rectangle [a,b] x [c,d].

    Args:
        f: Function of two variables f(x, y)
        x_bounds: Tuple (a, b) for x limits
        y_bounds: Tuple (c, d) for y limits
    Returns:
        The value of the double integral
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np
from scipy import integrate

def double_integral_rectangle(f, x_bounds, y_bounds):
    """
    Compute double integral of f over rectangle [a,b] x [c,d].
    """
    result, _ = integrate.dblquad(f, x_bounds[0], x_bounds[1],
                                   y_bounds[0], y_bounds[1])
    return result`,
    testCases: [
      { input: 'double_integral_rectangle(lambda y, x: x + y, (0, 1), (0, 1))', isHidden: false, description: 'Test case' },
      { input: 'double_integral_rectangle(lambda y, x: x*y, (0, 2), (0, 2))', isHidden: false, description: 'Test case' },
      { input: 'double_integral_rectangle(lambda y, x: 1, (0, 1), (0, 2))', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Use scipy.integrate.dblquad for numerical integration',
      'Note that dblquad takes the integrand as f(y, x), not f(x, y)',
      'The function returns (result, error_estimate)'
    ],
    language: 'python'
  },
  {
    id: 'math301-t5-ex02',
    subjectId: 'math301',
    topicId: 'math301-topic-5',
    title: 'Iterated Integral Order',
    difficulty: 1,
    description: 'Compute the same iterated integral in both orders (dx dy and dy dx) and verify they give the same result.',
    starterCode: `import numpy as np
from scipy import integrate

def compare_integral_orders(f, x_bounds, y_bounds):
    """
    Compute integral in both orders and return (result_dxdy, result_dydx).

    Args:
        f: Function f(x, y)
        x_bounds: (a, b)
        y_bounds: (c, d)
    Returns:
        Tuple of (integral with dx dy, integral with dy dx)
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np
from scipy import integrate

def compare_integral_orders(f, x_bounds, y_bounds):
    """
    Compute integral in both orders and return (result_dxdy, result_dydx).
    """
    # Order: dy dx (integrate y first, then x)
    result_dydx, _ = integrate.dblquad(lambda y, x: f(x, y),
                                        x_bounds[0], x_bounds[1],
                                        y_bounds[0], y_bounds[1])

    # Order: dx dy (integrate x first, then y)
    result_dxdy, _ = integrate.dblquad(lambda x, y: f(x, y),
                                        y_bounds[0], y_bounds[1],
                                        x_bounds[0], x_bounds[1])

    return (result_dxdy, result_dydx)`,
    testCases: [
      { input: 'compare_integral_orders(lambda x, y: x*y, (0, 1), (0, 1))', isHidden: false, description: 'Test case' },
      { input: 'compare_integral_orders(lambda x, y: x**2 + y**2, (0, 2), (0, 2))', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'dblquad integrates the first variable over the inner limits',
      'Swap the order of integration by swapping the bounds',
      'Fubini\'s theorem guarantees both orders give the same result for continuous functions'
    ],
    language: 'python'
  },
  {
    id: 'math301-t5-ex03',
    subjectId: 'math301',
    topicId: 'math301-topic-5',
    title: 'Double Integral over General Region',
    difficulty: 2,
    description: 'Compute a double integral over a region bounded by y=g1(x) and y=g2(x).',
    starterCode: `import numpy as np
from scipy import integrate

def double_integral_general(f, x_bounds, y_lower, y_upper):
    """
    Compute ∫∫_D f(x,y) dA where D = {(x,y): a ≤ x ≤ b, g1(x) ≤ y ≤ g2(x)}.

    Args:
        f: Function f(x, y)
        x_bounds: (a, b)
        y_lower: Function g1(x) for lower y bound
        y_upper: Function g2(x) for upper y bound
    Returns:
        Value of the double integral
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np
from scipy import integrate

def double_integral_general(f, x_bounds, y_lower, y_upper):
    """
    Compute ∫∫_D f(x,y) dA where D = {(x,y): a ≤ x ≤ b, g1(x) ≤ y ≤ g2(x)}.
    """
    result, _ = integrate.dblquad(f, x_bounds[0], x_bounds[1],
                                   y_lower, y_upper)
    return result`,
    testCases: [
      { input: 'double_integral_general(lambda y, x: 1, (0, 1), lambda x: 0, lambda x: x)', isHidden: false, description: 'Test case' },
      { input: 'double_integral_general(lambda y, x: x*y, (0, 1), lambda x: 0, lambda x: x**2)', isHidden: false, description: 'Test case' },
      { input: 'double_integral_general(lambda y, x: x+y, (-1, 1), lambda x: -np.sqrt(1-x**2), lambda x: np.sqrt(1-x**2))', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'dblquad accepts functions for the inner limits',
      'The integrand should be f(y, x) due to dblquad convention',
      'Make sure y_lower and y_upper are functions of x'
    ],
    language: 'python'
  },
  {
    id: 'math301-t5-ex04',
    subjectId: 'math301',
    topicId: 'math301-topic-5',
    title: 'Polar Coordinates Double Integral',
    difficulty: 2,
    description: 'Convert a double integral to polar coordinates and compute it.',
    starterCode: `import numpy as np
from scipy import integrate

def polar_double_integral(f, r_bounds, theta_bounds):
    """
    Compute ∫∫ f(r,θ) r dr dθ in polar coordinates.

    Args:
        f: Function f(r, theta)
        r_bounds: (r_min, r_max)
        theta_bounds: (theta_min, theta_max)
    Returns:
        Value of the integral
    """
    # Your implementation here (remember the Jacobian r!)
    pass`,
    solution: `import numpy as np
from scipy import integrate

def polar_double_integral(f, r_bounds, theta_bounds):
    """
    Compute ∫∫ f(r,θ) r dr dθ in polar coordinates.
    """
    # Include Jacobian r in the integrand
    integrand = lambda theta, r: f(r, theta) * r
    result, _ = integrate.dblquad(integrand,
                                   r_bounds[0], r_bounds[1],
                                   theta_bounds[0], theta_bounds[1])
    return result`,
    testCases: [
      { input: 'polar_double_integral(lambda r, theta: 1, (0, 1), (0, 2*np.pi))', isHidden: false, description: 'Test case' },
      { input: 'polar_double_integral(lambda r, theta: r, (0, 2), (0, np.pi))', isHidden: false, description: 'Test case' },
      { input: 'polar_double_integral(lambda r, theta: np.cos(theta), (0, 1), (0, 2*np.pi))', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'The Jacobian for polar coordinates is r',
      'Multiply the integrand by r before integrating',
      'Common bounds: θ ∈ [0, 2π] for full circle'
    ],
    language: 'python'
  },
  {
    id: 'math301-t5-ex05',
    subjectId: 'math301',
    topicId: 'math301-topic-5',
    title: 'Area Using Double Integral',
    difficulty: 2,
    description: 'Calculate the area of a region using a double integral.',
    starterCode: `import numpy as np
from scipy import integrate

def calculate_area(x_bounds, y_lower, y_upper):
    """
    Calculate area of region using ∫∫ 1 dA.

    Args:
        x_bounds: (a, b)
        y_lower: Function for lower y boundary
        y_upper: Function for upper y boundary
    Returns:
        Area of the region
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np
from scipy import integrate

def calculate_area(x_bounds, y_lower, y_upper):
    """
    Calculate area of region using ∫∫ 1 dA.
    """
    result, _ = integrate.dblquad(lambda y, x: 1,
                                   x_bounds[0], x_bounds[1],
                                   y_lower, y_upper)
    return result`,
    testCases: [
      { input: 'calculate_area((0, 2), lambda x: 0, lambda x: 3)', isHidden: false, description: 'Test case' },
      { input: 'calculate_area((0, 1), lambda x: 0, lambda x: x)', isHidden: false, description: 'Test case' },
      { input: 'round(calculate_area((0, 1), lambda x: 0, lambda x: np.sqrt(1-x**2)), 5)', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'Area is the integral of 1 over the region',
      'Use the same setup as general region integrals',
      'For a quarter circle: y goes from 0 to √(1-x²)'
    ],
    language: 'python'
  },
  {
    id: 'math301-t5-ex06',
    subjectId: 'math301',
    topicId: 'math301-topic-5',
    title: 'Triple Integral over Box',
    difficulty: 3,
    description: 'Compute a triple integral over a rectangular box.',
    starterCode: `import numpy as np
from scipy import integrate

def triple_integral_box(f, x_bounds, y_bounds, z_bounds):
    """
    Compute ∫∫∫ f(x,y,z) dV over box [a,b] x [c,d] x [e,f].

    Args:
        f: Function f(x, y, z)
        x_bounds: (a, b)
        y_bounds: (c, d)
        z_bounds: (e, f)
    Returns:
        Value of the triple integral
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np
from scipy import integrate

def triple_integral_box(f, x_bounds, y_bounds, z_bounds):
    """
    Compute ∫∫∫ f(x,y,z) dV over box [a,b] x [c,d] x [e,f].
    """
    result, _ = integrate.tplquad(f,
                                   x_bounds[0], x_bounds[1],
                                   y_bounds[0], y_bounds[1],
                                   z_bounds[0], z_bounds[1])
    return result`,
    testCases: [
      { input: 'triple_integral_box(lambda z, y, x: 1, (0, 1), (0, 1), (0, 1))', isHidden: false, description: 'Test case' },
      { input: 'triple_integral_box(lambda z, y, x: x*y*z, (0, 2), (0, 2), (0, 2))', isHidden: false, description: 'Test case' },
      { input: 'triple_integral_box(lambda z, y, x: x+y+z, (0, 1), (0, 1), (0, 1))', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'Use scipy.integrate.tplquad for triple integrals',
      'Note: tplquad takes f(z, y, x) as the integrand',
      'The function signature is tplquad(f, x_min, x_max, y_min, y_max, z_min, z_max)'
    ],
    language: 'python'
  },
  {
    id: 'math301-t5-ex07',
    subjectId: 'math301',
    topicId: 'math301-topic-5',
    title: 'Volume Using Triple Integral',
    difficulty: 3,
    description: 'Calculate the volume of a 3D region using triple integration.',
    starterCode: `import numpy as np
from scipy import integrate

def volume_under_surface(x_bounds, y_bounds, z_upper):
    """
    Calculate volume under surface z = f(x,y) using ∫∫∫ 1 dV.
    Region: a ≤ x ≤ b, c ≤ y ≤ d, 0 ≤ z ≤ f(x,y)

    Args:
        x_bounds: (a, b)
        y_bounds: (c, d)
        z_upper: Function f(x, y) for upper z bound
    Returns:
        Volume of the region
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np
from scipy import integrate

def volume_under_surface(x_bounds, y_bounds, z_upper):
    """
    Calculate volume under surface z = f(x,y) using ∫∫∫ 1 dV.
    """
    result, _ = integrate.tplquad(lambda z, y, x: 1,
                                   x_bounds[0], x_bounds[1],
                                   y_bounds[0], y_bounds[1],
                                   lambda x, y: 0, z_upper)
    return result`,
    testCases: [
      { input: 'volume_under_surface((0, 2), (0, 3), lambda x, y: 4)', isHidden: false, description: 'Test case' },
      { input: 'volume_under_surface((0, 1), (0, 1), lambda x, y: x+y)', isHidden: false, description: 'Test case' },
      { input: 'volume_under_surface((0, 1), (0, 1), lambda x, y: 1-x-y)', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'Volume is the triple integral of 1',
      'z_upper should be a function of both x and y',
      'Lower z bound is typically 0'
    ],
    language: 'python'
  },
  {
    id: 'math301-t5-ex08',
    subjectId: 'math301',
    topicId: 'math301-topic-5',
    title: 'Cylindrical Coordinates Integration',
    difficulty: 3,
    description: 'Compute a triple integral in cylindrical coordinates.',
    starterCode: `import numpy as np
from scipy import integrate

def cylindrical_integral(f, r_bounds, theta_bounds, z_bounds):
    """
    Compute ∫∫∫ f(r,θ,z) r dr dθ dz in cylindrical coordinates.

    Args:
        f: Function f(r, theta, z)
        r_bounds: (r_min, r_max)
        theta_bounds: (theta_min, theta_max)
        z_bounds: (z_min, z_max)
    Returns:
        Value of the integral
    """
    # Your implementation here (remember Jacobian r!)
    pass`,
    solution: `import numpy as np
from scipy import integrate

def cylindrical_integral(f, r_bounds, theta_bounds, z_bounds):
    """
    Compute ∫∫∫ f(r,θ,z) r dr dθ dz in cylindrical coordinates.
    """
    # Jacobian for cylindrical coordinates is r
    integrand = lambda z, theta, r: f(r, theta, z) * r
    result, _ = integrate.tplquad(integrand,
                                   r_bounds[0], r_bounds[1],
                                   theta_bounds[0], theta_bounds[1],
                                   z_bounds[0], z_bounds[1])
    return result`,
    testCases: [
      { input: 'cylindrical_integral(lambda r, theta, z: 1, (0, 1), (0, 2*np.pi), (0, 1))', isHidden: false, description: 'Test case' },
      { input: 'cylindrical_integral(lambda r, theta, z: z, (0, 2), (0, 2*np.pi), (0, 3))', isHidden: false, description: 'Test case' },
      { input: 'round(cylindrical_integral(lambda r, theta, z: r*np.cos(theta), (0, 1), (0, 2*np.pi), (0, 1)), 10)', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'Cylindrical coordinates: x = r cos θ, y = r sin θ, z = z',
      'The Jacobian is r',
      'Common: θ ∈ [0, 2π] for full rotation around z-axis'
    ],
    language: 'python'
  },
  {
    id: 'math301-t5-ex09',
    subjectId: 'math301',
    topicId: 'math301-topic-5',
    title: 'Spherical Coordinates Integration',
    difficulty: 4,
    description: 'Compute a triple integral in spherical coordinates.',
    starterCode: `import numpy as np
from scipy import integrate

def spherical_integral(f, rho_bounds, theta_bounds, phi_bounds):
    """
    Compute ∫∫∫ f(ρ,θ,φ) ρ²sin(φ) dρ dθ dφ in spherical coordinates.
    Convention: ρ = distance, θ = azimuthal, φ = polar angle from z-axis

    Args:
        f: Function f(rho, theta, phi)
        rho_bounds: (rho_min, rho_max)
        theta_bounds: (theta_min, theta_max)
        phi_bounds: (phi_min, phi_max)
    Returns:
        Value of the integral
    """
    # Your implementation here (remember Jacobian ρ²sin(φ)!)
    pass`,
    solution: `import numpy as np
from scipy import integrate

def spherical_integral(f, rho_bounds, theta_bounds, phi_bounds):
    """
    Compute ∫∫∫ f(ρ,θ,φ) ρ²sin(φ) dρ dθ dφ in spherical coordinates.
    """
    # Jacobian for spherical coordinates is ρ²sin(φ)
    integrand = lambda phi, theta, rho: f(rho, theta, phi) * rho**2 * np.sin(phi)
    result, _ = integrate.tplquad(integrand,
                                   rho_bounds[0], rho_bounds[1],
                                   theta_bounds[0], theta_bounds[1],
                                   phi_bounds[0], phi_bounds[1])
    return result`,
    testCases: [
      { input: 'round(spherical_integral(lambda rho, theta, phi: 1, (0, 1), (0, 2*np.pi), (0, np.pi)), 5)', isHidden: false, description: 'Test case' },
      { input: 'spherical_integral(lambda rho, theta, phi: rho, (0, 2), (0, 2*np.pi), (0, np.pi))', isHidden: false, description: 'Test case' },
      { input: 'round(spherical_integral(lambda rho, theta, phi: rho**2, (0, 1), (0, 2*np.pi), (0, np.pi)), 5)', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'Spherical: x = ρsin(φ)cos(θ), y = ρsin(φ)sin(θ), z = ρcos(φ)',
      'The Jacobian is ρ²sin(φ)',
      'Full sphere: ρ ∈ [0, R], θ ∈ [0, 2π], φ ∈ [0, π]'
    ],
    language: 'python'
  },
  {
    id: 'math301-t5-ex10',
    subjectId: 'math301',
    topicId: 'math301-topic-5',
    title: 'Volume of Sphere',
    difficulty: 4,
    description: 'Calculate the volume of a sphere using spherical coordinates.',
    starterCode: `import numpy as np
from scipy import integrate

def sphere_volume(radius):
    """
    Calculate volume of sphere using spherical coordinates.
    Should return (4/3)πR³

    Args:
        radius: Radius of the sphere
    Returns:
        Volume of the sphere
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np
from scipy import integrate

def sphere_volume(radius):
    """
    Calculate volume of sphere using spherical coordinates.
    """
    # Integrate 1 with Jacobian ρ²sin(φ)
    integrand = lambda phi, theta, rho: rho**2 * np.sin(phi)
    result, _ = integrate.tplquad(integrand,
                                   0, radius,
                                   0, 2*np.pi,
                                   0, np.pi)
    return result`,
    testCases: [
      { input: 'round(sphere_volume(1), 5)', isHidden: false, description: 'Test case' },
      { input: 'round(sphere_volume(2), 5)', isHidden: false, description: 'Test case' },
      { input: 'round(sphere_volume(3), 5)', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'Integrate 1 with the Jacobian ρ²sin(φ)',
      'ρ ∈ [0, R], θ ∈ [0, 2π], φ ∈ [0, π]',
      'Result should be (4/3)πR³'
    ],
    language: 'python'
  },
  {
    id: 'math301-t5-ex11',
    subjectId: 'math301',
    topicId: 'math301-topic-5',
    title: 'Jacobian Calculation',
    difficulty: 4,
    description: 'Compute the Jacobian determinant for a coordinate transformation.',
    starterCode: `import numpy as np

def compute_jacobian(u, v, x_func, y_func):
    """
    Compute Jacobian determinant ∂(x,y)/∂(u,v) at point (u, v).

    Args:
        u: u-coordinate
        v: v-coordinate
        x_func: Function x(u, v)
        y_func: Function y(u, v)
    Returns:
        Jacobian determinant at (u, v)
    """
    # Use numerical derivatives with small h
    h = 1e-6
    # Your implementation here
    pass`,
    solution: `import numpy as np

def compute_jacobian(u, v, x_func, y_func):
    """
    Compute Jacobian determinant ∂(x,y)/∂(u,v) at point (u, v).
    """
    h = 1e-6

    # Partial derivatives
    dx_du = (x_func(u + h, v) - x_func(u - h, v)) / (2 * h)
    dx_dv = (x_func(u, v + h) - x_func(u, v - h)) / (2 * h)
    dy_du = (y_func(u + h, v) - y_func(u - h, v)) / (2 * h)
    dy_dv = (y_func(u, v + h) - y_func(u, v - h)) / (2 * h)

    # Jacobian determinant
    jacobian = dx_du * dy_dv - dx_dv * dy_du
    return jacobian`,
    testCases: [
      { input: 'round(compute_jacobian(1, 0, lambda u, v: u*np.cos(v), lambda u, v: u*np.sin(v)), 5)', isHidden: false, description: 'Test case' },
      { input: 'round(compute_jacobian(2, np.pi/4, lambda u, v: u*np.cos(v), lambda u, v: u*np.sin(v)), 5)', isHidden: false, description: 'Test case' },
      { input: 'compute_jacobian(1, 1, lambda u, v: 2*u+v, lambda u, v: u-3*v)', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'Jacobian matrix: [[∂x/∂u, ∂x/∂v], [∂y/∂u, ∂y/∂v]]',
      'Determinant: (∂x/∂u)(∂y/∂v) - (∂x/∂v)(∂y/∂u)',
      'Use centered differences for numerical derivatives'
    ],
    language: 'python'
  },
  {
    id: 'math301-t5-ex12',
    subjectId: 'math301',
    topicId: 'math301-topic-5',
    title: 'Change of Variables in Double Integral',
    difficulty: 5,
    description: 'Apply a change of variables transformation with the Jacobian.',
    starterCode: `import numpy as np
from scipy import integrate

def integral_change_variables(f_xy, u_bounds, v_bounds, x_func, y_func, jacobian_func):
    """
    Compute ∫∫ f(x,y) dx dy using change of variables to (u,v).
    ∫∫ f(x(u,v), y(u,v)) |J| du dv

    Args:
        f_xy: Function f(x, y)
        u_bounds: (u_min, u_max)
        v_bounds: (v_min, v_max)
        x_func: Transformation x(u, v)
        y_func: Transformation y(u, v)
        jacobian_func: Function |J(u, v)|
    Returns:
        Value of the integral
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np
from scipy import integrate

def integral_change_variables(f_xy, u_bounds, v_bounds, x_func, y_func, jacobian_func):
    """
    Compute ∫∫ f(x,y) dx dy using change of variables to (u,v).
    """
    # Transform integrand: f(x(u,v), y(u,v)) * |J(u,v)|
    def transformed_integrand(v, u):
        x = x_func(u, v)
        y = y_func(u, v)
        J = jacobian_func(u, v)
        return f_xy(x, y) * abs(J)

    result, _ = integrate.dblquad(transformed_integrand,
                                   u_bounds[0], u_bounds[1],
                                   v_bounds[0], v_bounds[1])
    return result`,
    testCases: [
      { input: 'round(integral_change_variables(lambda x, y: 1, (0, 1), (0, 2*np.pi), lambda u, v: u*np.cos(v), lambda u, v: u*np.sin(v), lambda u, v: u), 5)', isHidden: false, description: 'Test case' },
      { input: 'integral_change_variables(lambda x, y: x+y, (0, 1), (0, 1), lambda u, v: u, lambda u, v: v, lambda u, v: 1)', isHidden: false, description: 'Test case' }
    ],
    hints: [
      'Transform f(x,y) to f(x(u,v), y(u,v))',
      'Multiply by the absolute value of the Jacobian',
      'Integrate over the new region in (u,v) space'
    ],
    language: 'python'
  },
  {
    id: 'math301-t5-ex13',
    subjectId: 'math301',
    topicId: 'math301-topic-5',
    title: 'Mass of 2D Plate',
    difficulty: 5,
    description: 'Calculate the mass of a 2D plate with variable density using double integration.',
    starterCode: `import numpy as np
from scipy import integrate

def plate_mass(density, x_bounds, y_bounds):
    """
    Calculate mass of 2D plate: M = ∫∫ ρ(x,y) dA

    Args:
        density: Density function ρ(x, y)
        x_bounds: (a, b)
        y_bounds: (c, d)
    Returns:
        Total mass of the plate
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np
from scipy import integrate

def plate_mass(density, x_bounds, y_bounds):
    """
    Calculate mass of 2D plate: M = ∫∫ ρ(x,y) dA
    """
    result, _ = integrate.dblquad(density,
                                   x_bounds[0], x_bounds[1],
                                   y_bounds[0], y_bounds[1])
    return result`,
    testCases: [
      { input: 'plate_mass(lambda y, x: 1, (0, 2), (0, 3))', isHidden: false, description: 'Test case' },
      { input: 'plate_mass(lambda y, x: x+y, (0, 1), (0, 1))', isHidden: false, description: 'Test case' },
      { input: 'plate_mass(lambda y, x: x**2 + y**2, (0, 1), (0, 1))', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'Mass = ∫∫ ρ(x,y) dA where ρ is density',
      'For uniform density ρ = c, mass = c × area',
      'Use dblquad with the density function'
    ],
    language: 'python'
  },
  {
    id: 'math301-t5-ex14',
    subjectId: 'math301',
    topicId: 'math301-topic-5',
    title: 'Center of Mass 2D',
    difficulty: 5,
    description: 'Find the center of mass (x̄, ȳ) of a 2D region with variable density.',
    starterCode: `import numpy as np
from scipy import integrate

def center_of_mass_2d(density, x_bounds, y_bounds):
    """
    Calculate center of mass (x̄, ȳ) where:
    x̄ = (1/M) ∫∫ x ρ(x,y) dA
    ȳ = (1/M) ∫∫ y ρ(x,y) dA
    M = ∫∫ ρ(x,y) dA

    Args:
        density: Density function ρ(x, y)
        x_bounds: (a, b)
        y_bounds: (c, d)
    Returns:
        Tuple (x_bar, y_bar)
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np
from scipy import integrate

def center_of_mass_2d(density, x_bounds, y_bounds):
    """
    Calculate center of mass (x̄, ȳ).
    """
    # Total mass
    M, _ = integrate.dblquad(density,
                              x_bounds[0], x_bounds[1],
                              y_bounds[0], y_bounds[1])

    # Moment about y-axis (M_y = ∫∫ x ρ dA)
    M_y, _ = integrate.dblquad(lambda y, x: x * density(y, x),
                                x_bounds[0], x_bounds[1],
                                y_bounds[0], y_bounds[1])

    # Moment about x-axis (M_x = ∫∫ y ρ dA)
    M_x, _ = integrate.dblquad(lambda y, x: y * density(y, x),
                                x_bounds[0], x_bounds[1],
                                y_bounds[0], y_bounds[1])

    x_bar = M_y / M
    y_bar = M_x / M

    return (x_bar, y_bar)`,
    testCases: [
      { input: 'center_of_mass_2d(lambda y, x: 1, (0, 2), (0, 4))', isHidden: false, description: 'Test case' },
      { input: 'center_of_mass_2d(lambda y, x: 1, (0, 1), (0, 1))', isHidden: false, description: 'Test case' },
      { input: 'tuple(round(c, 5) for c in center_of_mass_2d(lambda y, x: x+1, (0, 2), (0, 2)))', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'First calculate total mass M = ∫∫ ρ dA',
      'x̄ = M_y / M where M_y = ∫∫ x ρ dA',
      'ȳ = M_x / M where M_x = ∫∫ y ρ dA'
    ],
    language: 'python'
  },
  {
    id: 'math301-t5-ex15',
    subjectId: 'math301',
    topicId: 'math301-topic-5',
    title: 'Moment of Inertia',
    difficulty: 5,
    description: 'Calculate the moment of inertia of a 2D plate about the origin.',
    starterCode: `import numpy as np
from scipy import integrate

def moment_of_inertia(density, x_bounds, y_bounds):
    """
    Calculate moment of inertia about origin: I_0 = ∫∫ (x²+y²) ρ(x,y) dA

    Args:
        density: Density function ρ(x, y)
        x_bounds: (a, b)
        y_bounds: (c, d)
    Returns:
        Moment of inertia about the origin
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np
from scipy import integrate

def moment_of_inertia(density, x_bounds, y_bounds):
    """
    Calculate moment of inertia about origin: I_0 = ∫∫ (x²+y²) ρ(x,y) dA
    """
    integrand = lambda y, x: (x**2 + y**2) * density(y, x)
    result, _ = integrate.dblquad(integrand,
                                   x_bounds[0], x_bounds[1],
                                   y_bounds[0], y_bounds[1])
    return result`,
    testCases: [
      { input: 'moment_of_inertia(lambda y, x: 1, (0, 1), (0, 1))', isHidden: false, description: 'Test case' },
      { input: 'round(moment_of_inertia(lambda y, x: 1, (-1, 1), (-1, 1)), 5)', isHidden: false, description: 'Test case' },
      { input: 'round(moment_of_inertia(lambda y, x: x+y+1, (0, 1), (0, 1)), 5)', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'Moment of inertia measures resistance to rotation',
      'I_0 = ∫∫ r² ρ dA where r² = x² + y²',
      'Multiply distance squared by density and integrate'
    ],
    language: 'python'
  },
  {
    id: 'math301-t5-ex16',
    subjectId: 'math301',
    topicId: 'math301-topic-5',
    title: 'Average Value of Function',
    difficulty: 3,
    description: 'Calculate the average value of a function over a region.',
    starterCode: `import numpy as np
from scipy import integrate

def average_value(f, x_bounds, y_bounds):
    """
    Calculate average value: f_avg = (1/A) ∫∫ f(x,y) dA
    where A is the area of the region.

    Args:
        f: Function f(x, y)
        x_bounds: (a, b)
        y_bounds: (c, d) or functions for bounds
    Returns:
        Average value of f over the region
    """
    # Your implementation here
    pass`,
    solution: `import numpy as np
from scipy import integrate

def average_value(f, x_bounds, y_bounds):
    """
    Calculate average value: f_avg = (1/A) ∫∫ f(x,y) dA
    """
    # Calculate area
    if callable(y_bounds[0]):
        # General region
        area, _ = integrate.dblquad(lambda y, x: 1,
                                     x_bounds[0], x_bounds[1],
                                     y_bounds[0], y_bounds[1])
        integral, _ = integrate.dblquad(f,
                                         x_bounds[0], x_bounds[1],
                                         y_bounds[0], y_bounds[1])
    else:
        # Rectangle
        area = (x_bounds[1] - x_bounds[0]) * (y_bounds[1] - y_bounds[0])
        integral, _ = integrate.dblquad(f,
                                         x_bounds[0], x_bounds[1],
                                         y_bounds[0], y_bounds[1])

    return integral / area`,
    testCases: [
      { input: 'average_value(lambda y, x: x+y, (0, 2), (0, 2))', isHidden: false, description: 'Test case' },
      { input: 'average_value(lambda y, x: x*y, (0, 1), (0, 1))', isHidden: false, description: 'Test case' },
      { input: 'average_value(lambda y, x: 5, (0, 3), (0, 4))', isHidden: true, description: 'Hidden test' }
    ],
    hints: [
      'Average = (Total integral) / (Area)',
      'For rectangles, area = (b-a)(d-c)',
      'For general regions, calculate area with ∫∫ 1 dA'
    ],
    language: 'python'
  }
];
