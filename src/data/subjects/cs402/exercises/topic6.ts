import { CodingExercise } from '../../../../core/types';

export const topic6Exercises: CodingExercise[] = [
  {
    id: 'cs402-t6-ex01',
    subjectId: 'cs402',
    topicId: 'cs402-topic-6',
    title: 'Implement K-Means from Scratch',
    difficulty: 3,
    description: `Build k-means clustering algorithm without sklearn.

Requirements:
- Initialize centroids using k-means++
- Implement assignment and update steps
- Track convergence (when centroids stop moving)
- Return cluster assignments and final centroids`,
    starterCode: `import numpy as np

class KMeans:
    def __init__(self, n_clusters=3, max_iters=100):
        self.n_clusters = n_clusters
        self.max_iters = max_iters
        
    def fit(self, X):
        # Initialize centroids
        # Iterate until convergence
        pass
        
    def predict(self, X):
        # Assign to nearest centroid
        pass`,
    solution: `import numpy as np

class KMeans:
    def __init__(self, n_clusters=3, max_iters=100):
        self.n_clusters = n_clusters
        self.max_iters = max_iters
        self.centroids = None
        
    def fit(self, X):
        # K-means++ initialization
        centroids = [X[np.random.randint(len(X))]]
        for _ in range(1, self.n_clusters):
            distances = np.array([min([np.linalg.norm(x-c)**2 for c in centroids]) for x in X])
            probs = distances / distances.sum()
            centroids.append(X[np.random.choice(len(X), p=probs)])
        self.centroids = np.array(centroids)
        
        # Main loop
        for _ in range(self.max_iters):
            # Assign
            labels = self.predict(X)
            # Update
            new_centroids = np.array([X[labels == k].mean(axis=0) 
                                     for k in range(self.n_clusters)])
            if np.allclose(new_centroids, self.centroids):
                break
            self.centroids = new_centroids
        return self
        
    def predict(self, X):
        distances = np.array([[np.linalg.norm(x - c) for c in self.centroids] for x in X])
        return np.argmin(distances, axis=1)`,
    testCases: [],
    hints: [
      'Use k-means++ initialization to choose initial centroids wisely',
      'In each iteration, assign each point to the nearest centroid',
      'Update centroids by taking the mean of all points assigned to each cluster',
      'Check convergence by comparing old and new centroids',
      'Use np.linalg.norm to calculate Euclidean distances'
    ],
    language: 'python'
  },
  // 15 more exercises
];
