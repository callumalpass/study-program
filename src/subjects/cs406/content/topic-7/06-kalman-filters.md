---
title: "Kalman Filters"
slug: "kalman-filters"
description: "Kalman filtering for continuous state estimation, including prediction and update equations, Extended Kalman Filter, and robotics applications"
---

# Kalman Filters

The Kalman filter is an optimal recursive algorithm for estimating the state of a linear dynamic system from noisy measurements. Developed by Rudolf Kalman in 1960, it has become one of the most widely used algorithms in control theory, robotics, navigation, and signal processing. The Kalman filter elegantly combines predictions from a system model with noisy observations to produce optimal state estimates.

## Introduction to Kalman Filtering

Unlike Hidden Markov Models which handle discrete states, Kalman filters work with continuous state spaces. They maintain a Gaussian belief distribution over the state, characterized by a mean (state estimate) and covariance (uncertainty).

**Key Assumptions:**

1. **Linear dynamics**: State evolves according to linear equations
2. **Linear observations**: Measurements are linear functions of state
3. **Gaussian noise**: Process and measurement noise are Gaussian
4. **Markov property**: Current state depends only on previous state

**Why Kalman Filters?**

- **Optimality**: Minimizes mean squared error under Gaussian assumptions
- **Efficiency**: Closed-form recursive updates in $O(n^3)$ time
- **Handles uncertainty**: Explicitly tracks estimate confidence
- **Real-time**: Processes measurements incrementally

## State Space Model

A Kalman filter models a system using state space representation:

**State Equation (Prediction):**

$$\mathbf{x}_t = F_t \mathbf{x}_{t-1} + B_t \mathbf{u}_t + \mathbf{w}_t$$

Where:
- $\mathbf{x}_t \in \mathbb{R}^n$ is the state vector at time $t$
- $F_t$ is the state transition matrix
- $B_t$ is the control input matrix
- $\mathbf{u}_t$ is the control vector
- $\mathbf{w}_t \sim \mathcal{N}(0, Q_t)$ is process noise

**Observation Equation (Measurement):**

$$\mathbf{z}_t = H_t \mathbf{x}_t + \mathbf{v}_t$$

Where:
- $\mathbf{z}_t \in \mathbb{R}^m$ is the measurement vector
- $H_t$ is the observation matrix
- $\mathbf{v}_t \sim \mathcal{N}(0, R_t)$ is measurement noise

**Gaussian Belief:**

The Kalman filter maintains belief as a Gaussian: $\text{bel}(\mathbf{x}_t) = \mathcal{N}(\boldsymbol{\mu}_t, \Sigma_t)$

```python
import numpy as np

class KalmanFilter:
    """Kalman Filter for linear systems."""

    def __init__(self, state_dim, measurement_dim):
        """
        Initialize Kalman filter.

        Args:
            state_dim: Dimension of state vector
            measurement_dim: Dimension of measurement vector
        """
        self.n = state_dim
        self.m = measurement_dim

        # State estimate and covariance
        self.x = np.zeros((state_dim, 1))  # State mean
        self.P = np.eye(state_dim)         # State covariance

        # System matrices (to be set by user)
        self.F = np.eye(state_dim)         # State transition
        self.B = None                       # Control input (optional)
        self.H = np.eye(measurement_dim, state_dim)  # Observation
        self.Q = np.eye(state_dim) * 0.01  # Process noise
        self.R = np.eye(measurement_dim) * 0.1  # Measurement noise

    def predict(self, u=None):
        """
        Prediction step (time update).

        Args:
            u: Control input (optional)
        """
        # Predict state
        self.x = self.F @ self.x
        if u is not None and self.B is not None:
            self.x += self.B @ u

        # Predict covariance
        self.P = self.F @ self.P @ self.F.T + self.Q

    def update(self, z):
        """
        Update step (measurement update).

        Args:
            z: Measurement vector
        """
        # Innovation (measurement residual)
        y = z - self.H @ self.x

        # Innovation covariance
        S = self.H @ self.P @ self.H.T + self.R

        # Kalman gain
        K = self.P @ self.H.T @ np.linalg.inv(S)

        # Update state estimate
        self.x = self.x + K @ y

        # Update covariance estimate
        I = np.eye(self.n)
        self.P = (I - K @ self.H) @ self.P

    def get_state(self):
        """Get current state estimate."""
        return self.x.copy()

    def get_covariance(self):
        """Get current covariance estimate."""
        return self.P.copy()


# Example: 1D position tracking
print("Kalman Filter initialized for continuous state estimation")
```

## Prediction and Update Equations

The Kalman filter operates in a two-step cycle:

### Prediction Step (Time Update)

**Predicted State Mean:**

$$\bar{\boldsymbol{\mu}}_t = F_t \boldsymbol{\mu}_{t-1} + B_t \mathbf{u}_t$$

**Predicted State Covariance:**

$$\bar{\Sigma}_t = F_t \Sigma_{t-1} F_t^T + Q_t$$

This step projects the current state estimate forward in time using the system dynamics model. Uncertainty increases due to process noise $Q_t$.

### Update Step (Measurement Update)

**Kalman Gain:**

$$K_t = \bar{\Sigma}_t H_t^T (H_t \bar{\Sigma}_t H_t^T + R_t)^{-1}$$

The Kalman gain determines how much to trust the new measurement versus the prediction. High measurement noise $R_t$ reduces the gain.

**Updated State Mean:**

$$\boldsymbol{\mu}_t = \bar{\boldsymbol{\mu}}_t + K_t (\mathbf{z}_t - H_t \bar{\boldsymbol{\mu}}_t)$$

**Updated State Covariance:**

$$\Sigma_t = (I - K_t H_t) \bar{\Sigma}_t$$

The update step incorporates the measurement, reducing uncertainty.

```python
def demonstrate_kalman_filter():
    """Demonstrate Kalman filter for 1D position tracking."""

    # System: tracking position and velocity in 1D
    # State: [position, velocity]
    # Measurement: position only

    dt = 0.1  # Time step

    # Initialize filter
    kf = KalmanFilter(state_dim=2, measurement_dim=1)

    # State transition matrix (constant velocity model)
    kf.F = np.array([
        [1, dt],
        [0, 1]
    ])

    # Observation matrix (measure position only)
    kf.H = np.array([[1, 0]])

    # Process noise (small uncertainty in dynamics)
    kf.Q = np.array([
        [0.001, 0],
        [0, 0.001]
    ])

    # Measurement noise (sensor uncertainty)
    kf.R = np.array([[0.5]])

    # Initial state
    kf.x = np.array([[0], [1]])  # Start at position 0, velocity 1
    kf.P = np.eye(2) * 0.1

    # Simulate trajectory
    true_positions = []
    measurements = []
    estimates = []

    true_state = np.array([[0], [1]])  # True state

    for t in range(50):
        # True dynamics (with noise)
        true_state = kf.F @ true_state + np.random.multivariate_normal(
            [0, 0], kf.Q
        ).reshape(-1, 1)

        # Noisy measurement
        z = kf.H @ true_state + np.random.normal(0, np.sqrt(kf.R[0, 0]))

        # Kalman filter steps
        kf.predict()
        kf.update(z)

        # Record
        true_positions.append(true_state[0, 0])
        measurements.append(z[0, 0])
        estimates.append(kf.x[0, 0])

    # Print statistics
    errors = np.array(estimates) - np.array(true_positions)
    rmse = np.sqrt(np.mean(errors**2))
    print(f"Tracking RMSE: {rmse:.4f}")

    return true_positions, measurements, estimates


# Run demonstration
true_pos, meas, est = demonstrate_kalman_filter()
print(f"Tracked {len(est)} time steps")
```

## Kalman Gain Interpretation

The Kalman gain $K_t$ is the optimal weighting between prediction and measurement:

- **High $K_t$**: Trust measurement more (low $R_t$ or high $\bar{\Sigma}_t$)
- **Low $K_t$**: Trust prediction more (high $R_t$ or low $\bar{\Sigma}_t$)

At extremes:
- $K_t \rightarrow 0$: Ignore measurements, follow prediction
- $K_t \rightarrow H_t^{-1}$: Ignore prediction, trust measurements completely

The filter automatically balances these based on relative uncertainties, making it optimally adaptive.

## Extended Kalman Filter (EKF)

Real-world systems are often nonlinear. The Extended Kalman Filter handles nonlinear dynamics and observations by linearization.

**Nonlinear System:**

$$\mathbf{x}_t = f(\mathbf{x}_{t-1}, \mathbf{u}_t) + \mathbf{w}_t$$

$$\mathbf{z}_t = h(\mathbf{x}_t) + \mathbf{v}_t$$

**EKF Approach:**

Linearize using first-order Taylor expansion (Jacobian matrices):

$$F_t = \frac{\partial f}{\partial \mathbf{x}}\Big|_{\boldsymbol{\mu}_{t-1}, \mathbf{u}_t}$$

$$H_t = \frac{\partial h}{\partial \mathbf{x}}\Big|_{\bar{\boldsymbol{\mu}}_t}$$

Then apply standard Kalman filter equations with these time-varying matrices.

```python
class ExtendedKalmanFilter:
    """Extended Kalman Filter for nonlinear systems."""

    def __init__(self, state_dim, measurement_dim, f, h, F_jacobian, H_jacobian):
        """
        Initialize EKF.

        Args:
            state_dim: State dimension
            measurement_dim: Measurement dimension
            f: Nonlinear state transition function
            h: Nonlinear observation function
            F_jacobian: Function to compute Jacobian of f
            H_jacobian: Function to compute Jacobian of h
        """
        self.n = state_dim
        self.m = measurement_dim

        self.f = f  # State transition
        self.h = h  # Observation
        self.F_jacobian = F_jacobian
        self.H_jacobian = H_jacobian

        # State and covariance
        self.x = np.zeros((state_dim, 1))
        self.P = np.eye(state_dim)

        # Noise covariances
        self.Q = np.eye(state_dim) * 0.01
        self.R = np.eye(measurement_dim) * 0.1

    def predict(self, u=None):
        """EKF prediction step."""
        # Predict state using nonlinear function
        self.x = self.f(self.x, u)

        # Linearize dynamics
        F = self.F_jacobian(self.x, u)

        # Predict covariance
        self.P = F @ self.P @ F.T + self.Q

    def update(self, z):
        """EKF update step."""
        # Linearize observation
        H = self.H_jacobian(self.x)

        # Innovation
        y = z - self.h(self.x)

        # Innovation covariance
        S = H @ self.P @ H.T + self.R

        # Kalman gain
        K = self.P @ H.T @ np.linalg.inv(S)

        # Update state
        self.x = self.x + K @ y

        # Update covariance
        I = np.eye(self.n)
        self.P = (I - K @ H) @ self.P


# Example: Tracking with bearing-only measurements
def f_nonlinear(x, u):
    """Nonlinear dynamics: constant velocity."""
    dt = 0.1
    F = np.array([[1, 0, dt, 0],
                  [0, 1, 0, dt],
                  [0, 0, 1, 0],
                  [0, 0, 0, 1]])
    return F @ x

def h_nonlinear(x):
    """Nonlinear observation: bearing angle to target."""
    px, py = x[0, 0], x[1, 0]
    bearing = np.arctan2(py, px)
    return np.array([[bearing]])

def F_jac(x, u):
    """Jacobian of state transition (just F for linear dynamics)."""
    dt = 0.1
    return np.array([[1, 0, dt, 0],
                     [0, 1, 0, dt],
                     [0, 0, 1, 0],
                     [0, 0, 0, 1]])

def H_jac(x):
    """Jacobian of observation function."""
    px, py = x[0, 0], x[1, 0]
    r_squared = px**2 + py**2
    return np.array([[-py/r_squared, px/r_squared, 0, 0]])

# Initialize EKF
ekf = ExtendedKalmanFilter(4, 1, f_nonlinear, h_nonlinear, F_jac, H_jac)
print("Extended Kalman Filter handles nonlinear systems via linearization")
```

## Applications in Robotics and Navigation

**1. Robot Localization:**
- **State**: Robot pose $(x, y, \theta)$
- **Measurements**: Sensor readings (GPS, odometry, landmarks)
- **Goal**: Estimate robot position and orientation

**2. Sensor Fusion:**
- Combine multiple sensors (IMU, GPS, camera)
- Each sensor has different noise characteristics
- Kalman filter optimally fuses information

**3. Target Tracking:**
- **State**: Target position and velocity
- **Measurements**: Radar or camera detections
- **Goal**: Track moving objects

**4. Attitude Estimation:**
- **State**: Orientation (quaternion or Euler angles)
- **Measurements**: Gyroscope, accelerometer, magnetometer
- **Goal**: Determine device orientation

```python
def robot_localization_example():
    """Simple robot localization with Kalman filter."""

    # State: [x, y, vx, vy] - position and velocity in 2D
    # Measurement: [x, y] - GPS position

    kf = KalmanFilter(state_dim=4, measurement_dim=2)

    dt = 1.0  # 1 second time steps

    # State transition (constant velocity model)
    kf.F = np.array([
        [1, 0, dt, 0],
        [0, 1, 0, dt],
        [0, 0, 1, 0],
        [0, 0, 0, 1]
    ])

    # Observe position only
    kf.H = np.array([
        [1, 0, 0, 0],
        [0, 1, 0, 0]
    ])

    # Process noise (acceleration uncertainty)
    q = 0.1
    kf.Q = np.array([
        [dt**4/4, 0, dt**3/2, 0],
        [0, dt**4/4, 0, dt**3/2],
        [dt**3/2, 0, dt**2, 0],
        [0, dt**3/2, 0, dt**2]
    ]) * q

    # GPS measurement noise (meters)
    kf.R = np.eye(2) * 5.0

    # Initial state: at origin, moving at 1 m/s in x direction
    kf.x = np.array([[0], [0], [1], [0]])
    kf.P = np.eye(4) * 1.0

    print("Robot localization filter configured")
    return kf

robot_kf = robot_localization_example()
```

## Advantages and Limitations

**Advantages:**

1. **Optimal**: Minimizes mean squared error for linear Gaussian systems
2. **Efficient**: Closed-form solution, no iteration needed
3. **Real-time**: Processes measurements as they arrive
4. **Explicit uncertainty**: Maintains covariance matrix
5. **Proven**: Decades of successful applications

**Limitations:**

1. **Linearity assumption**: Standard KF requires linear dynamics (EKF addresses this)
2. **Gaussian assumption**: Non-Gaussian noise degrades performance
3. **Known models**: Requires accurate system matrices $F$, $H$
4. **EKF issues**: Linearization can fail for highly nonlinear systems
5. **Computational cost**: $O(n^3)$ for $n$-dimensional state

**Alternatives:**

- **Unscented Kalman Filter (UKF)**: Better nonlinear handling than EKF
- **Particle Filter**: Handles non-Gaussian, multi-modal distributions
- **H-infinity Filter**: Robust to model uncertainties

## Key Takeaways

1. **Kalman filters** provide optimal state estimation for linear Gaussian systems
2. **Two-step recursion**: Predict using dynamics model, update using measurements
3. **Kalman gain** automatically balances prediction and measurement based on uncertainties
4. **Gaussian belief** is maintained with mean (state estimate) and covariance (uncertainty)
5. **Closed-form solution** makes Kalman filtering efficient and real-time capable
6. **Extended Kalman Filter** handles nonlinear systems through linearization
7. **Sensor fusion** is a natural application - combine multiple noisy sensors optimally
8. **Robotics applications** include localization, tracking, and attitude estimation
9. **Optimality** holds only under linear, Gaussian assumptions
10. **Covariance matrix** grows without measurements but shrinks when measurements are incorporated

The Kalman filter remains one of the most important algorithms in estimation theory. Its elegant mathematical framework, optimality properties, and computational efficiency make it the method of choice for state estimation in countless applications from aerospace to autonomous vehicles. Understanding Kalman filtering is essential for anyone working with sensor data, control systems, or probabilistic robotics.
