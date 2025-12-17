import { CodingExercise } from '../../../../core/types';

export const topic7Exercises: CodingExercise[] = [
  {
    id: 'cs406-t7-ex01',
    subjectId: 'cs406',
    topicId: 'cs406-topic-7',
    title: 'Bayesian Network Inference',
    difficulty: 2,
    description: `Implement exact inference in a simple Bayesian network.

Your implementation should:
- Represent conditional probability tables (CPTs)
- Compute joint probabilities
- Perform inference using enumeration
- Calculate P(X|evidence)`,
    starterCode: `class BayesianNetwork:
    def __init__(self):
        self.variables = []
        self.parents = {}  # var -> list of parents
        self.cpts = {}  # var -> CPT

    def add_variable(self, var, parents, cpt):
        # Add variable with its CPT
        pass

    def probability(self, var, value, evidence):
        # Compute P(var=value | evidence)
        pass

# Example: Simple alarm network
# Burglary -> Alarm <- Earthquake
# Alarm -> Call`,
    solution: `from itertools import product

class BayesianNetwork:
    def __init__(self):
        self.variables = []
        self.parents = {}
        self.cpts = {}

    def add_variable(self, var, parents, cpt):
        """Add variable with parents and CPT."""
        self.variables.append(var)
        self.parents[var] = parents
        self.cpts[var] = cpt

    def get_probability(self, var, value, parent_values):
        """Get P(var=value | parent_values) from CPT."""
        cpt = self.cpts[var]

        if not self.parents[var]:
            # No parents, unconditional probability
            return cpt.get(value, 0.0)

        # Convert parent values to tuple key
        key = tuple(parent_values[p] for p in self.parents[var])

        return cpt.get((key, value), 0.0)

    def enumerate_all(self, variables, evidence):
        """Enumerate all assignments consistent with evidence."""
        if not variables:
            return 1.0

        var = variables[0]
        rest = variables[1:]

        if var in evidence:
            # Variable is observed
            parent_vals = evidence
            prob = self.get_probability(var, evidence[var], parent_vals)
            return prob * self.enumerate_all(rest, evidence)
        else:
            # Sum over all possible values
            total = 0.0

            for value in [True, False]:
                extended = evidence.copy()
                extended[var] = value

                parent_vals = extended
                prob = self.get_probability(var, value, parent_vals)
                total += prob * self.enumerate_all(rest, extended)

            return total

    def probability(self, query_var, query_value, evidence):
        """Compute P(query_var=query_value | evidence) using enumeration."""

        # P(X|e) = P(X,e) / P(e)

        # Compute P(query_var=query_value, evidence)
        extended = evidence.copy()
        extended[query_var] = query_value
        p_x_e = self.enumerate_all(self.variables, extended)

        # Compute P(evidence)
        p_e = self.enumerate_all(self.variables, evidence)

        if p_e == 0:
            return 0.0

        return p_x_e / p_e

# Build alarm network
# Burglary -> Alarm <- Earthquake
#              |
#              v
#            Call

bn = BayesianNetwork()

# P(Burglary)
bn.add_variable('Burglary', [], {
    True: 0.001,
    False: 0.999
})

# P(Earthquake)
bn.add_variable('Earthquake', [], {
    True: 0.002,
    False: 0.998
})

# P(Alarm | Burglary, Earthquake)
bn.add_variable('Alarm', ['Burglary', 'Earthquake'], {
    ((True, True), True): 0.95,
    ((True, True), False): 0.05,
    ((True, False), True): 0.94,
    ((True, False), False): 0.06,
    ((False, True), True): 0.29,
    ((False, True), False): 0.71,
    ((False, False), True): 0.001,
    ((False, False), False): 0.999
})

# P(Call | Alarm)
bn.add_variable('Call', ['Alarm'], {
    ((True,), True): 0.70,
    ((True,), False): 0.30,
    ((False,), True): 0.05,
    ((False,), False): 0.95
})

# Queries
print("Alarm Network Inference")
print("="*50)

# Prior probability of burglary
p_b = bn.probability('Burglary', True, {})
print(f"P(Burglary) = {p_b:.4f}")

# P(Burglary | Call)
p_b_call = bn.probability('Burglary', True, {'Call': True})
print(f"P(Burglary | Call) = {p_b_call:.4f}")

# P(Burglary | Call, ¬Earthquake)
p_b_call_no_eq = bn.probability('Burglary', True, {'Call': True, 'Earthquake': False})
print(f"P(Burglary | Call, ¬Earthquake) = {p_b_call_no_eq:.4f}")

# P(Alarm | Burglary, ¬Earthquake)
p_a_b = bn.probability('Alarm', True, {'Burglary': True, 'Earthquake': False})
print(f"P(Alarm | Burglary, ¬Earthquake) = {p_a_b:.4f}")

print("\\nNote: Burglary probability increases from prior when we observe Call")`  ,
    testCases: [
      { input: 'bn.probability("Burglary", True, {})', isHidden: false, description: 'Test prior probability calculation' },
      { input: 'bn.probability("Burglary", True, {"Call": True})', isHidden: false, description: 'Test posterior probability given evidence' },
      { input: 'bn.enumerate_all(variables, evidence)', isHidden: false, description: 'Test enumeration over all variables' }
    ],
    hints: [
      'Use enumeration: sum over all possible assignments consistent with evidence',
      'P(X|e) = P(X,e) / P(e) where P(X,e) and P(e) are computed by enumeration',
      'For each variable, if observed use its value, otherwise sum over both True and False'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t7-ex02',
    subjectId: 'cs406',
    topicId: 'cs406-topic-7',
    title: 'Hidden Markov Model - Viterbi Algorithm',
    difficulty: 3,
    description: `Implement the Viterbi algorithm for HMMs to find the most likely state sequence.

Your implementation should:
- Represent HMM with transition and emission probabilities
- Use dynamic programming to find best path
- Backtrack to recover full state sequence
- Handle log probabilities to avoid underflow`,
    starterCode: `class HMM:
    def __init__(self, states, observations):
        self.states = states
        self.observations = observations
        self.start_prob = {}
        self.trans_prob = {}
        self.emit_prob = {}

    def viterbi(self, observations):
        # Find most likely state sequence
        # Returns: (probability, state_sequence)
        pass`,
    solution: `import math

class HMM:
    def __init__(self, states, observations):
        self.states = states
        self.observations = observations
        self.start_prob = {}  # state -> probability
        self.trans_prob = {}  # (state, state) -> probability
        self.emit_prob = {}   # (state, observation) -> probability

    def viterbi(self, observations):
        """
        Viterbi algorithm to find most likely state sequence.
        Returns: (log_probability, state_sequence)
        """
        T = len(observations)
        N = len(self.states)

        # DP table: viterbi[t][state] = (max_prob, best_prev_state)
        viterbi = [{} for _ in range(T)]
        backpointer = [{} for _ in range(T)]

        # Initialize (t=0)
        for state in self.states:
            start_p = self.start_prob.get(state, 1e-10)
            emit_p = self.emit_prob.get((state, observations[0]), 1e-10)

            # Use log probabilities to avoid underflow
            viterbi[0][state] = math.log(start_p) + math.log(emit_p)
            backpointer[0][state] = None

        # Forward pass (t=1 to T-1)
        for t in range(1, T):
            for curr_state in self.states:
                max_prob = float('-inf')
                best_prev = None

                for prev_state in self.states:
                    trans_p = self.trans_prob.get((prev_state, curr_state), 1e-10)
                    prob = viterbi[t-1][prev_state] + math.log(trans_p)

                    if prob > max_prob:
                        max_prob = prob
                        best_prev = prev_state

                emit_p = self.emit_prob.get((curr_state, observations[t]), 1e-10)
                viterbi[t][curr_state] = max_prob + math.log(emit_p)
                backpointer[t][curr_state] = best_prev

        # Find best final state
        max_prob = float('-inf')
        best_final = None

        for state in self.states:
            if viterbi[T-1][state] > max_prob:
                max_prob = viterbi[T-1][state]
                best_final = state

        # Backtrack to recover path
        path = [best_final]
        for t in range(T-1, 0, -1):
            path.insert(0, backpointer[t][path[0]])

        return max_prob, path

    def forward(self, observations):
        """
        Forward algorithm to compute P(observations).
        Returns: log probability
        """
        T = len(observations)

        # Forward table: forward[t][state] = P(o_1:t, state_t)
        forward = [{} for _ in range(T)]

        # Initialize
        for state in self.states:
            start_p = self.start_prob.get(state, 1e-10)
            emit_p = self.emit_prob.get((state, observations[0]), 1e-10)
            forward[0][state] = math.log(start_p) + math.log(emit_p)

        # Forward pass
        for t in range(1, T):
            for curr_state in self.states:
                log_sum = float('-inf')

                for prev_state in self.states:
                    trans_p = self.trans_prob.get((prev_state, curr_state), 1e-10)
                    prob = forward[t-1][prev_state] + math.log(trans_p)

                    # Log-sum-exp trick
                    if log_sum == float('-inf'):
                        log_sum = prob
                    else:
                        log_sum = max(log_sum, prob) + math.log(1 + math.exp(min(log_sum, prob) - max(log_sum, prob)))

                emit_p = self.emit_prob.get((curr_state, observations[t]), 1e-10)
                forward[t][curr_state] = log_sum + math.log(emit_p)

        # Sum over final states
        total = float('-inf')
        for state in self.states:
            if total == float('-inf'):
                total = forward[T-1][state]
            else:
                p = forward[T-1][state]
                total = max(total, p) + math.log(1 + math.exp(min(total, p) - max(total, p)))

        return total

# Example: Weather HMM
# States: Sunny, Rainy
# Observations: Walk, Shop, Clean

hmm = HMM(
    states=['Sunny', 'Rainy'],
    observations=['Walk', 'Shop', 'Clean']
)

# Start probabilities
hmm.start_prob = {
    'Sunny': 0.6,
    'Rainy': 0.4
}

# Transition probabilities
hmm.trans_prob = {
    ('Sunny', 'Sunny'): 0.7,
    ('Sunny', 'Rainy'): 0.3,
    ('Rainy', 'Sunny'): 0.4,
    ('Rainy', 'Rainy'): 0.6
}

# Emission probabilities
hmm.emit_prob = {
    ('Sunny', 'Walk'): 0.6,
    ('Sunny', 'Shop'): 0.3,
    ('Sunny', 'Clean'): 0.1,
    ('Rainy', 'Walk'): 0.1,
    ('Rainy', 'Shop'): 0.4,
    ('Rainy', 'Clean'): 0.5
}

# Observations
obs = ['Walk', 'Shop', 'Clean']

print("Weather HMM")
print("="*50)
print(f"Observations: {obs}")
print()

# Viterbi - most likely state sequence
log_prob, path = hmm.viterbi(obs)
print(f"Most likely state sequence: {path}")
print(f"Log probability: {log_prob:.4f}")
print(f"Probability: {math.exp(log_prob):.6e}")
print()

# Forward algorithm - total probability
total_log_prob = hmm.forward(obs)
print(f"Total P(observations) [log]: {total_log_prob:.4f}")
print(f"Total P(observations): {math.exp(total_log_prob):.6e}")

# Try different observation sequence
obs2 = ['Clean', 'Clean', 'Clean']
log_prob2, path2 = hmm.viterbi(obs2)
print(f"\\nObservations: {obs2}")
print(f"Most likely state sequence: {path2}")
print(f"Probability: {math.exp(log_prob2):.6e}")`  ,
    testCases: [
      { input: 'hmm.viterbi(observations)', isHidden: false, description: 'Test Viterbi finds most likely state sequence' },
      { input: 'hmm.forward(observations)', isHidden: false, description: 'Test forward algorithm computes total probability' },
      { input: 'viterbi with different observations', isHidden: false, description: 'Test Viterbi produces sensible paths' }
    ],
    hints: [
      'Use dynamic programming: viterbi[t][s] = max probability of path ending in state s at time t',
      'Use log probabilities to avoid numerical underflow (multiply becomes add in log space)',
      'Store backpointers to recover the best path after forward pass completes',
      'Backtrack from the best final state to reconstruct the complete path'
    ],
    language: 'python'
  },
  {
    id: 'cs406-t7-ex03',
    subjectId: 'cs406',
    topicId: 'cs406-topic-7',
    title: 'Particle Filter for Robot Localization',
    difficulty: 4,
    description: `Implement a particle filter for robot localization.

Your implementation should:
- Represent belief as a set of weighted particles
- Implement prediction step (motion model)
- Implement update step (sensor model)
- Resample particles based on weights
- Estimate position from particle cloud`,
    starterCode: `import random
import math

class Particle:
    def __init__(self, x, y, weight=1.0):
        self.x = x
        self.y = y
        self.weight = weight

class ParticleFilter:
    def __init__(self, num_particles, world_size):
        self.particles = []
        self.world_size = world_size

    def predict(self, motion):
        # Move particles according to motion model
        pass

    def update(self, measurement, landmarks):
        # Update particle weights based on sensor measurement
        pass

    def resample(self):
        # Resample particles based on weights
        pass

    def estimate(self):
        # Estimate robot position from particles
        pass`,
    solution: `import random
import math

class Particle:
    def __init__(self, x, y, weight=1.0):
        self.x = x
        self.y = y
        self.weight = weight

    def __repr__(self):
        return f"Particle({self.x:.2f}, {self.y:.2f}, w={self.weight:.4f})"

class ParticleFilter:
    def __init__(self, num_particles, world_size):
        self.num_particles = num_particles
        self.world_size = world_size

        # Initialize particles uniformly
        self.particles = []
        for _ in range(num_particles):
            x = random.uniform(0, world_size[0])
            y = random.uniform(0, world_size[1])
            self.particles.append(Particle(x, y, 1.0 / num_particles))

    def predict(self, motion, noise_std=1.0):
        """
        Move particles according to motion model.
        motion: (dx, dy) movement
        noise_std: standard deviation of motion noise
        """
        dx, dy = motion

        for particle in self.particles:
            # Add noise to motion
            noise_x = random.gauss(0, noise_std)
            noise_y = random.gauss(0, noise_std)

            particle.x += dx + noise_x
            particle.y += dy + noise_y

            # Keep particles in world bounds (wrap around or clip)
            particle.x = particle.x % self.world_size[0]
            particle.y = particle.y % self.world_size[1]

    def update(self, measurement, landmarks, sensor_noise=2.0):
        """
        Update particle weights based on sensor measurement.
        measurement: list of distances to landmarks
        landmarks: list of (x, y) landmark positions
        sensor_noise: standard deviation of sensor noise
        """
        weights = []

        for particle in self.particles:
            # Compute expected measurements for this particle
            weight = 1.0

            for i, (lx, ly) in enumerate(landmarks):
                # Expected distance to landmark
                expected_dist = math.sqrt((particle.x - lx)**2 + (particle.y - ly)**2)

                # Actual measured distance
                measured_dist = measurement[i]

                # Compute likelihood using Gaussian
                diff = expected_dist - measured_dist
                weight *= math.exp(-(diff**2) / (2 * sensor_noise**2))

            particle.weight = weight
            weights.append(weight)

        # Normalize weights
        total_weight = sum(weights)

        if total_weight > 0:
            for particle in self.particles:
                particle.weight /= total_weight

    def resample(self):
        """Resample particles based on weights (importance sampling)."""
        weights = [p.weight for p in self.particles]

        # Systematic resampling
        new_particles = []

        # Compute cumulative weights
        cumulative = []
        cum_sum = 0
        for w in weights:
            cum_sum += w
            cumulative.append(cum_sum)

        # Generate uniform random samples
        step = 1.0 / self.num_particles
        start = random.uniform(0, step)

        for i in range(self.num_particles):
            target = start + i * step

            # Find particle
            for j, cum_w in enumerate(cumulative):
                if target <= cum_w:
                    # Copy particle
                    p = self.particles[j]
                    new_particles.append(Particle(p.x, p.y, 1.0 / self.num_particles))
                    break

        self.particles = new_particles

    def estimate(self):
        """Estimate robot position as weighted mean of particles."""
        x_est = sum(p.x * p.weight for p in self.particles)
        y_est = sum(p.y * p.weight for p in self.particles)

        return (x_est, y_est)

    def effective_sample_size(self):
        """Compute effective sample size (measure of particle diversity)."""
        return 1.0 / sum(p.weight**2 for p in self.particles)

# Simulation
print("Particle Filter for Robot Localization")
print("="*50)

# World setup
world_size = (100, 100)
landmarks = [(20, 20), (80, 20), (20, 80), (80, 80)]

# True robot position
true_x, true_y = 50, 50

# Create particle filter
pf = ParticleFilter(num_particles=1000, world_size=world_size)

print(f"World size: {world_size}")
print(f"Landmarks: {landmarks}")
print(f"True position: ({true_x}, {true_y})")
print()

# Initial estimate
est_x, est_y = pf.estimate()
error = math.sqrt((est_x - true_x)**2 + (est_y - true_y)**2)
print(f"Initial estimate: ({est_x:.2f}, {est_y:.2f})")
print(f"Initial error: {error:.2f}")
print(f"Effective sample size: {pf.effective_sample_size():.1f}")
print()

# Simulate robot motion and sensing
motions = [(5, 0), (0, 5), (-5, 0), (0, -5)]

for step, motion in enumerate(motions):
    print(f"Step {step + 1}: Motion {motion}")

    # Update true position
    true_x += motion[0]
    true_y += motion[1]

    # Predict step
    pf.predict(motion, noise_std=1.0)

    # Generate measurement (with noise)
    measurement = []
    for lx, ly in landmarks:
        true_dist = math.sqrt((true_x - lx)**2 + (true_y - ly)**2)
        noisy_dist = true_dist + random.gauss(0, 2.0)
        measurement.append(noisy_dist)

    # Update step
    pf.update(measurement, landmarks, sensor_noise=2.0)

    # Resample if needed (when particle diversity is low)
    if pf.effective_sample_size() < pf.num_particles / 2:
        pf.resample()

    # Estimate
    est_x, est_y = pf.estimate()
    error = math.sqrt((est_x - true_x)**2 + (est_y - true_y)**2)

    print(f"  True position: ({true_x:.2f}, {true_y:.2f})")
    print(f"  Estimated position: ({est_x:.2f}, {est_y:.2f})")
    print(f"  Error: {error:.2f}")
    print(f"  Effective sample size: {pf.effective_sample_size():.1f}")
    print()

print("Note: Error decreases as particles converge to true position")`  ,
    testCases: [
      { input: 'pf.predict(motion, noise_std)', isHidden: false, description: 'Test prediction step moves particles according to motion model' },
      { input: 'pf.update(measurement, landmarks, sensor_noise)', isHidden: false, description: 'Test update step weights particles by measurement likelihood' },
      { input: 'pf.resample()', isHidden: false, description: 'Test resampling concentrates particles in high-probability regions' }
    ],
    hints: [
      'Prediction: move each particle according to motion command plus Gaussian noise',
      'Update: weight each particle by how well its expected measurements match actual measurements',
      'Use Gaussian likelihood: exp(-(difference²)/(2*sigma²)) for sensor model',
      'Resample when effective sample size drops below threshold to avoid particle depletion'
    ],
    language: 'python'
  }
];
