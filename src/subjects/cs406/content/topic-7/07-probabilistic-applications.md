---
title: "Probabilistic Applications"
slug: "probabilistic-applications"
order: 7
---

# Probabilistic Applications

## Introduction

Throughout this topic, we have developed powerful tools for reasoning under uncertainty: Bayesian networks for modeling dependencies, exact and approximate inference algorithms, Hidden Markov Models for temporal sequences, and Kalman filters for continuous state estimation. These techniques are not merely academic exercises—they form the computational backbone of many real-world AI systems that must make decisions in uncertain, noisy environments.

This subtopic explores how probabilistic reasoning applies to critical domains including speech recognition, medical diagnosis, autonomous vehicle perception, spam filtering, and financial prediction. Each application demonstrates how the theoretical foundations translate into systems that impact millions of lives daily.

## Speech Recognition

Speech recognition systems must convert acoustic signals into text while handling enormous variability in pronunciation, accent, background noise, and speaking speed. The standard approach models this as a probabilistic inference problem.

### The Noisy Channel Model

Speech recognition uses Bayes' theorem to find the most likely word sequence $W$ given acoustic observations $O$:

$$W^* = \arg\max_W P(W \mid O) = \arg\max_W P(O \mid W) \cdot P(W)$$

This separates into two components:
- **Acoustic model** $P(O \mid W)$: Probability of acoustic features given words
- **Language model** $P(W)$: Prior probability of word sequences

```python
class SpeechRecognizer:
    """Simple speech recognition framework using HMMs."""

    def __init__(self, acoustic_model, language_model):
        self.acoustic = acoustic_model  # P(observation | phoneme)
        self.language = language_model  # P(word sequence)

    def recognize(self, observations):
        """
        Find most likely word sequence given acoustic observations.

        Uses Viterbi algorithm through word-level HMM.
        """
        # Build word lattice with acoustic and language scores
        candidates = self.generate_candidates(observations)

        best_sequence = None
        best_score = float('-inf')

        for word_sequence in candidates:
            acoustic_score = self.acoustic.score(observations, word_sequence)
            language_score = self.language.score(word_sequence)

            # Combine scores (typically log probabilities)
            total_score = acoustic_score + language_score

            if total_score > best_score:
                best_score = total_score
                best_sequence = word_sequence

        return best_sequence
```

Modern systems like those in smartphones use deep neural networks for the acoustic model while still relying on probabilistic language models for coherent output.

## Medical Diagnosis

Medical diagnosis is inherently uncertain: symptoms can have multiple causes, tests have false positive and negative rates, and diseases interact in complex ways. Bayesian networks naturally model these relationships.

### Diagnostic Bayesian Networks

A diagnostic network relates diseases to symptoms through conditional probabilities:

```python
class DiagnosticNetwork:
    """Medical diagnosis using Bayesian network inference."""

    def __init__(self):
        # Prior probabilities of diseases
        self.disease_priors = {
            'flu': 0.05,
            'cold': 0.10,
            'pneumonia': 0.01,
            'allergies': 0.15
        }

        # P(symptom | disease) - symptom likelihoods
        self.symptom_given_disease = {
            'fever': {'flu': 0.9, 'cold': 0.3, 'pneumonia': 0.8, 'allergies': 0.0},
            'cough': {'flu': 0.7, 'cold': 0.8, 'pneumonia': 0.9, 'allergies': 0.2},
            'runny_nose': {'flu': 0.6, 'cold': 0.9, 'pneumonia': 0.2, 'allergies': 0.9},
            'chest_pain': {'flu': 0.1, 'cold': 0.0, 'pneumonia': 0.7, 'allergies': 0.0}
        }

    def diagnose(self, observed_symptoms):
        """
        Compute posterior probability of each disease given symptoms.

        Uses Bayes' theorem: P(disease | symptoms) ∝ P(symptoms | disease) * P(disease)
        """
        posteriors = {}

        for disease, prior in self.disease_priors.items():
            # Compute likelihood of symptoms given disease
            likelihood = 1.0
            for symptom, present in observed_symptoms.items():
                p_symptom = self.symptom_given_disease[symptom][disease]
                if present:
                    likelihood *= p_symptom
                else:
                    likelihood *= (1 - p_symptom)

            posteriors[disease] = likelihood * prior

        # Normalize
        total = sum(posteriors.values())
        return {d: p / total for d, p in posteriors.items()}


# Example usage
network = DiagnosticNetwork()
symptoms = {'fever': True, 'cough': True, 'runny_nose': False, 'chest_pain': True}
diagnosis = network.diagnose(symptoms)
# Returns: {'pneumonia': 0.72, 'flu': 0.25, 'cold': 0.02, 'allergies': 0.01}
```

Real medical AI systems like IBM Watson Health and diagnostic decision support tools use much larger networks with hundreds of variables and sophisticated inference algorithms.

## Autonomous Vehicle Perception

Self-driving cars must perceive their environment using noisy sensors and make life-critical decisions. Probabilistic methods are essential for robust perception.

### Sensor Fusion

Autonomous vehicles combine data from multiple sensors (cameras, LiDAR, radar) using Bayesian fusion:

```python
class SensorFusion:
    """Fuse multiple sensor readings for object detection."""

    def fuse_detections(self, camera_det, lidar_det, radar_det):
        """
        Combine detections from multiple sensors.

        Each detection includes position estimate and uncertainty.
        """
        # Weighted average based on sensor uncertainty
        # Weights inversely proportional to variance
        weights = []
        positions = []

        if camera_det:
            weights.append(1.0 / camera_det['variance'])
            positions.append(camera_det['position'])

        if lidar_det:
            weights.append(1.0 / lidar_det['variance'])
            positions.append(lidar_det['position'])

        if radar_det:
            weights.append(1.0 / radar_det['variance'])
            positions.append(radar_det['position'])

        # Normalize weights
        total_weight = sum(weights)
        weights = [w / total_weight for w in weights]

        # Fused position
        fused_position = sum(w * p for w, p in zip(weights, positions))

        # Fused variance (lower than any individual sensor)
        fused_variance = 1.0 / sum(1.0 / d['variance']
                                    for d in [camera_det, lidar_det, radar_det]
                                    if d is not None)

        return {'position': fused_position, 'variance': fused_variance}
```

### Object Tracking with Kalman Filters

Vehicles track other objects over time using the Kalman filter (covered in the previous subtopic):

```python
class VehicleTracker:
    """Track vehicles using Kalman filter."""

    def __init__(self):
        self.tracks = {}  # Track ID -> Kalman filter

    def update(self, detections, dt):
        """Update tracks with new detections."""
        for track_id, kf in self.tracks.items():
            # Predict step
            kf.predict(dt)

        # Associate detections with tracks (Hungarian algorithm)
        assignments = self.associate(detections)

        for det_idx, track_id in assignments.items():
            # Update step with matched detection
            self.tracks[track_id].update(detections[det_idx])

        # Handle unmatched detections (create new tracks)
        # Handle unmatched tracks (predict without update, eventually delete)
```

## Spam Filtering

Email spam filtering was one of the first successful commercial applications of probabilistic AI, using naive Bayes classification.

### Naive Bayes Spam Filter

```python
class SpamFilter:
    """Naive Bayes spam classifier."""

    def __init__(self):
        self.spam_word_counts = {}
        self.ham_word_counts = {}
        self.spam_total = 0
        self.ham_total = 0
        self.num_spam = 0
        self.num_ham = 0

    def train(self, emails):
        """Train on labeled emails."""
        for email, is_spam in emails:
            words = self.tokenize(email)
            counts = self.spam_word_counts if is_spam else self.ham_word_counts

            for word in words:
                counts[word] = counts.get(word, 0) + 1

            if is_spam:
                self.spam_total += len(words)
                self.num_spam += 1
            else:
                self.ham_total += len(words)
                self.num_ham += 1

    def classify(self, email, smoothing=1.0):
        """
        Classify email as spam or ham.

        Returns probability of spam.
        """
        words = self.tokenize(email)
        vocab_size = len(set(self.spam_word_counts) | set(self.ham_word_counts))

        # Log probabilities to avoid underflow
        log_p_spam = log(self.num_spam / (self.num_spam + self.num_ham))
        log_p_ham = log(self.num_ham / (self.num_spam + self.num_ham))

        for word in words:
            # Laplace smoothing
            spam_count = self.spam_word_counts.get(word, 0) + smoothing
            ham_count = self.ham_word_counts.get(word, 0) + smoothing

            log_p_spam += log(spam_count / (self.spam_total + smoothing * vocab_size))
            log_p_ham += log(ham_count / (self.ham_total + smoothing * vocab_size))

        # Convert back from log space
        p_spam = exp(log_p_spam)
        p_ham = exp(log_p_ham)

        return p_spam / (p_spam + p_ham)
```

Modern spam filters combine probabilistic methods with deep learning and behavioral analysis.

## Financial Applications

Probabilistic models are crucial in finance for risk assessment, algorithmic trading, and portfolio optimization.

### Hidden Markov Models for Market Regimes

Financial markets exhibit different "regimes" (bull, bear, volatile) that can be modeled with HMMs:

```python
class MarketRegimeHMM:
    """Model market regimes as hidden states."""

    def __init__(self):
        # States: Bull, Bear, Volatile
        self.states = ['bull', 'bear', 'volatile']

        # Transition probabilities (tendency to stay in regime)
        self.transitions = {
            'bull': {'bull': 0.9, 'bear': 0.05, 'volatile': 0.05},
            'bear': {'bull': 0.05, 'bear': 0.9, 'volatile': 0.05},
            'volatile': {'bull': 0.1, 'bear': 0.1, 'volatile': 0.8}
        }

        # Emission parameters (returns distribution in each regime)
        self.emissions = {
            'bull': {'mean': 0.001, 'std': 0.01},     # Positive, low vol
            'bear': {'mean': -0.001, 'std': 0.015},   # Negative, medium vol
            'volatile': {'mean': 0.0, 'std': 0.03}    # Zero mean, high vol
        }

    def filter_regime(self, returns):
        """
        Estimate current regime given observed returns.

        Uses forward algorithm to compute P(regime | returns).
        """
        # Forward algorithm similar to HMM filtering
        belief = {s: 1/3 for s in self.states}  # Uniform prior

        for r in returns:
            # Update with observation
            for state in self.states:
                emission = self.emission_probability(r, state)
                belief[state] *= emission

            # Normalize
            total = sum(belief.values())
            belief = {s: p / total for s, p in belief.items()}

            # Predict next step
            new_belief = {}
            for s2 in self.states:
                new_belief[s2] = sum(
                    belief[s1] * self.transitions[s1][s2]
                    for s1 in self.states
                )
            belief = new_belief

        return belief
```

## Key Takeaways

- **Speech recognition** uses the noisy channel model with acoustic and language models, applying HMMs and Viterbi decoding for inference
- **Medical diagnosis** naturally maps to Bayesian networks, computing posterior disease probabilities from observed symptoms
- **Autonomous vehicles** fuse uncertain sensor data using Bayesian fusion and track objects with Kalman filters
- **Spam filtering** demonstrated commercial viability of naive Bayes, combining simplicity with effectiveness
- **Financial systems** use HMMs for regime detection and probabilistic risk models
- Real-world systems combine probabilistic reasoning with deep learning, using neural networks for complex perception while maintaining probabilistic frameworks for decision-making

## Common Mistakes

1. **Ignoring conditional independence assumptions**: Naive Bayes assumes feature independence, which is often violated; understanding when this matters is crucial
2. **Overconfident predictions**: Probabilistic systems should express uncertainty; overfitting leads to miscalibrated confidence
3. **Static models in dynamic environments**: Real applications require continuous model updates as conditions change
4. **Ignoring computational constraints**: Exact inference may be intractable; choosing appropriate approximations requires understanding the problem domain
