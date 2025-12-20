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
  {
    id: 'cs402-ex-6-2',
    subjectId: 'cs402',
    topicId: 'cs402-topic-6',
    title: 'Calculate Silhouette Score',
    difficulty: 2,
    description: `Compute silhouette score to evaluate clustering quality.

Requirements:
- For each point, compute a(i) = average distance to points in same cluster
- Compute b(i) = min average distance to points in other clusters
- Silhouette = (b(i) - a(i)) / max(a(i), b(i))
- Return mean silhouette score across all points`,
    starterCode: `import numpy as np

def silhouette_score(X, labels):
    """
    Compute silhouette score.

    Args:
        X: data points (n_samples, n_features)
        labels: cluster assignments (n_samples,)

    Returns:
        mean silhouette score
    """
    # TODO: Implement
    pass`,
    solution: `import numpy as np

def silhouette_score(X, labels):
    """
    Compute silhouette score.

    Args:
        X: data points (n_samples, n_features)
        labels: cluster assignments (n_samples,)

    Returns:
        mean silhouette score
    """
    n_samples = len(X)
    silhouette_vals = np.zeros(n_samples)

    for i in range(n_samples):
        # Get cluster of current point
        cluster_i = labels[i]

        # Points in same cluster
        same_cluster = X[labels == cluster_i]

        # a(i): mean distance to points in same cluster
        if len(same_cluster) > 1:
            a_i = np.mean([np.linalg.norm(X[i] - x) for x in same_cluster if not np.array_equal(x, X[i])])
        else:
            a_i = 0

        # b(i): min mean distance to points in other clusters
        b_i = float('inf')
        for cluster_j in np.unique(labels):
            if cluster_j != cluster_i:
                other_cluster = X[labels == cluster_j]
                mean_dist = np.mean([np.linalg.norm(X[i] - x) for x in other_cluster])
                b_i = min(b_i, mean_dist)

        # Compute silhouette
        if max(a_i, b_i) > 0:
            silhouette_vals[i] = (b_i - a_i) / max(a_i, b_i)
        else:
            silhouette_vals[i] = 0

    return np.mean(silhouette_vals)`,
    testCases: [],
    hints: [
      'a(i) measures cohesion: how close point is to its cluster',
      'b(i) measures separation: distance to nearest other cluster',
      'Silhouette ranges from -1 (wrong cluster) to +1 (perfect)',
      'Handle single-point clusters by setting a(i) = 0',
      'Use Euclidean distance for distance calculations'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-6-3',
    subjectId: 'cs402',
    topicId: 'cs402-topic-6',
    title: 'Implement Elbow Method',
    difficulty: 1,
    description: `Determine optimal number of clusters using elbow method.

Requirements:
- Run k-means for k = 1 to max_k
- Compute within-cluster sum of squares (WCSS) for each k
- Plot WCSS vs k to find "elbow"
- Return WCSS values for all k`,
    starterCode: `import numpy as np
from sklearn.cluster import KMeans

def elbow_method(X, max_k=10):
    """
    Apply elbow method to find optimal k.

    Args:
        X: data points
        max_k: maximum k to try

    Returns:
        wcss: list of WCSS for each k
    """
    # TODO: Implement
    pass`,
    solution: `import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt

def elbow_method(X, max_k=10):
    """
    Apply elbow method to find optimal k.

    Args:
        X: data points
        max_k: maximum k to try

    Returns:
        wcss: list of WCSS for each k
    """
    wcss = []

    for k in range(1, max_k + 1):
        kmeans = KMeans(n_clusters=k, random_state=42)
        kmeans.fit(X)

        # Compute within-cluster sum of squares
        wcss.append(kmeans.inertia_)

    return wcss

# Usage with plotting
X = np.random.randn(300, 2)
wcss = elbow_method(X, max_k=10)

plt.plot(range(1, 11), wcss, marker='o')
plt.xlabel('Number of clusters (k)')
plt.ylabel('WCSS')
plt.title('Elbow Method')
plt.show()`,
    testCases: [],
    hints: [
      'WCSS is the sum of squared distances from points to their centroids',
      'KMeans.inertia_ gives the WCSS directly',
      'Plot shows decreasing WCSS as k increases',
      'Look for "elbow" where improvement slows down',
      'Optimal k is at the elbow point'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-6-4',
    subjectId: 'cs402',
    topicId: 'cs402-topic-6',
    title: 'Build Hierarchical Clustering',
    difficulty: 3,
    description: `Implement agglomerative hierarchical clustering.

Requirements:
- Start with each point as its own cluster
- Use single linkage (minimum distance between clusters)
- Merge closest clusters iteratively
- Build dendrogram structure
- Support different linkage methods`,
    starterCode: `import numpy as np

class HierarchicalClustering:
    def __init__(self, linkage='single'):
        self.linkage = linkage

    def fit(self, X, n_clusters=2):
        """
        Perform hierarchical clustering.

        Args:
            X: data points
            n_clusters: number of final clusters

        Returns:
            cluster labels
        """
        # TODO: Implement
        pass`,
    solution: `import numpy as np

class HierarchicalClustering:
    def __init__(self, linkage='single'):
        self.linkage = linkage

    def compute_distance(self, cluster1, cluster2):
        """Compute distance between two clusters."""
        if self.linkage == 'single':
            # Minimum distance
            return np.min([np.linalg.norm(p1 - p2)
                          for p1 in cluster1 for p2 in cluster2])
        elif self.linkage == 'complete':
            # Maximum distance
            return np.max([np.linalg.norm(p1 - p2)
                          for p1 in cluster1 for p2 in cluster2])
        elif self.linkage == 'average':
            # Average distance
            return np.mean([np.linalg.norm(p1 - p2)
                           for p1 in cluster1 for p2 in cluster2])

    def fit(self, X, n_clusters=2):
        """
        Perform hierarchical clustering.

        Args:
            X: data points (n_samples, n_features)
            n_clusters: number of final clusters

        Returns:
            cluster labels
        """
        # Initialize: each point is a cluster
        clusters = [[i] for i in range(len(X))]

        # Merge until we have n_clusters
        while len(clusters) > n_clusters:
            # Find closest pair of clusters
            min_dist = float('inf')
            merge_i, merge_j = 0, 1

            for i in range(len(clusters)):
                for j in range(i + 1, len(clusters)):
                    cluster_i = X[clusters[i]]
                    cluster_j = X[clusters[j]]
                    dist = self.compute_distance(cluster_i, cluster_j)

                    if dist < min_dist:
                        min_dist = dist
                        merge_i, merge_j = i, j

            # Merge closest clusters
            clusters[merge_i].extend(clusters[merge_j])
            clusters.pop(merge_j)

        # Create label array
        labels = np.zeros(len(X), dtype=int)
        for cluster_id, cluster in enumerate(clusters):
            for point_id in cluster:
                labels[point_id] = cluster_id

        return labels`,
    testCases: [],
    hints: [
      'Start with n clusters (one per point)',
      'Single linkage: distance = min distance between any two points',
      'Complete linkage: distance = max distance between any two points',
      'Average linkage: distance = mean of all pairwise distances',
      'Merge closest clusters until reaching desired number'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-6-5',
    subjectId: 'cs402',
    topicId: 'cs402-topic-6',
    title: 'Implement DBSCAN',
    difficulty: 4,
    description: `Build DBSCAN density-based clustering from scratch.

Requirements:
- Find core points (points with >= min_samples neighbors within eps)
- Expand clusters from core points
- Mark border points and noise
- Handle arbitrary cluster shapes`,
    starterCode: `import numpy as np

class DBSCAN:
    def __init__(self, eps=0.5, min_samples=5):
        self.eps = eps
        self.min_samples = min_samples

    def fit_predict(self, X):
        """
        Perform DBSCAN clustering.

        Args:
            X: data points

        Returns:
            labels (-1 for noise)
        """
        # TODO: Implement
        pass`,
    solution: `import numpy as np

class DBSCAN:
    def __init__(self, eps=0.5, min_samples=5):
        self.eps = eps
        self.min_samples = min_samples

    def get_neighbors(self, X, point_idx):
        """Find all neighbors within eps distance."""
        neighbors = []
        for i in range(len(X)):
            if np.linalg.norm(X[point_idx] - X[i]) <= self.eps:
                neighbors.append(i)
        return neighbors

    def expand_cluster(self, X, labels, point_idx, neighbors, cluster_id):
        """Expand cluster from a core point."""
        labels[point_idx] = cluster_id

        i = 0
        while i < len(neighbors):
            neighbor_idx = neighbors[i]

            # If noise, change to border point
            if labels[neighbor_idx] == -1:
                labels[neighbor_idx] = cluster_id

            # If unvisited
            elif labels[neighbor_idx] == 0:
                labels[neighbor_idx] = cluster_id

                # Check if neighbor is core point
                neighbor_neighbors = self.get_neighbors(X, neighbor_idx)
                if len(neighbor_neighbors) >= self.min_samples:
                    neighbors.extend(neighbor_neighbors)

            i += 1

    def fit_predict(self, X):
        """
        Perform DBSCAN clustering.

        Args:
            X: data points (n_samples, n_features)

        Returns:
            labels (-1 for noise, 0+ for clusters)
        """
        n_samples = len(X)
        labels = np.zeros(n_samples, dtype=int)  # 0 = unvisited
        cluster_id = 0

        for point_idx in range(n_samples):
            # Skip if already processed
            if labels[point_idx] != 0:
                continue

            # Find neighbors
            neighbors = self.get_neighbors(X, point_idx)

            # Mark as noise if not enough neighbors
            if len(neighbors) < self.min_samples:
                labels[point_idx] = -1
            else:
                # Create new cluster
                cluster_id += 1
                self.expand_cluster(X, labels, point_idx, neighbors, cluster_id)

        return labels`,
    testCases: [],
    hints: [
      'Core point: has at least min_samples neighbors within eps',
      'Border point: not core but within eps of a core point',
      'Noise point: neither core nor border',
      'Use breadth-first search to expand clusters',
      'Label noise as -1, clusters as 1, 2, 3, ...'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-6-6',
    subjectId: 'cs402',
    topicId: 'cs402-topic-6',
    title: 'Implement PCA from Scratch',
    difficulty: 3,
    description: `Build Principal Component Analysis without sklearn.

Requirements:
- Center the data by subtracting mean
- Compute covariance matrix
- Find eigenvectors and eigenvalues
- Sort by eigenvalues (descending)
- Project data onto top k components`,
    starterCode: `import numpy as np

class PCA:
    def __init__(self, n_components=2):
        self.n_components = n_components
        self.components = None
        self.mean = None

    def fit(self, X):
        # TODO: Implement
        pass

    def transform(self, X):
        # TODO: Implement
        pass`,
    solution: `import numpy as np

class PCA:
    def __init__(self, n_components=2):
        self.n_components = n_components
        self.components = None
        self.mean = None
        self.explained_variance = None

    def fit(self, X):
        """
        Fit PCA model.

        Args:
            X: data matrix (n_samples, n_features)
        """
        # Center the data
        self.mean = np.mean(X, axis=0)
        X_centered = X - self.mean

        # Compute covariance matrix
        cov_matrix = np.cov(X_centered.T)

        # Compute eigenvectors and eigenvalues
        eigenvalues, eigenvectors = np.linalg.eig(cov_matrix)

        # Sort by eigenvalues (descending)
        idx = np.argsort(eigenvalues)[::-1]
        eigenvalues = eigenvalues[idx]
        eigenvectors = eigenvectors[:, idx]

        # Store top k components
        self.components = eigenvectors[:, :self.n_components]
        self.explained_variance = eigenvalues[:self.n_components]

        return self

    def transform(self, X):
        """
        Project data onto principal components.

        Args:
            X: data matrix

        Returns:
            transformed data
        """
        # Center and project
        X_centered = X - self.mean
        return X_centered @ self.components

    def fit_transform(self, X):
        """Fit and transform in one step."""
        self.fit(X)
        return self.transform(X)

    def explained_variance_ratio(self):
        """Return proportion of variance explained by each component."""
        total_var = np.sum(self.explained_variance)
        return self.explained_variance / total_var`,
    testCases: [],
    hints: [
      'Center data by subtracting mean before computing covariance',
      'Covariance matrix: C = (1/n) * X^T * X',
      'Use np.linalg.eig to compute eigenvectors and eigenvalues',
      'Sort eigenvectors by eigenvalues in descending order',
      'Project data: X_transformed = X_centered @ eigenvectors',
      'Explained variance is proportional to eigenvalues'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-6-7',
    subjectId: 'cs402',
    topicId: 'cs402-topic-6',
    title: 'Calculate Explained Variance',
    difficulty: 1,
    description: `Compute explained variance ratio for PCA components.

Requirements:
- Use eigenvalues from PCA
- Calculate proportion of variance for each component
- Return cumulative explained variance
- Help determine number of components needed`,
    starterCode: `import numpy as np

def explained_variance_ratio(eigenvalues, n_components=None):
    """
    Compute explained variance ratio.

    Args:
        eigenvalues: eigenvalues from PCA
        n_components: number of components (or None for all)

    Returns:
        individual and cumulative explained variance
    """
    # TODO: Implement
    pass`,
    solution: `import numpy as np

def explained_variance_ratio(eigenvalues, n_components=None):
    """
    Compute explained variance ratio.

    Args:
        eigenvalues: eigenvalues from PCA
        n_components: number of components (or None for all)

    Returns:
        individual and cumulative explained variance
    """
    # Sort eigenvalues descending
    eigenvalues = np.sort(eigenvalues)[::-1]

    if n_components is not None:
        eigenvalues = eigenvalues[:n_components]

    # Compute total variance
    total_var = np.sum(eigenvalues)

    # Individual explained variance
    explained_var = eigenvalues / total_var

    # Cumulative explained variance
    cumulative_var = np.cumsum(explained_var)

    return explained_var, cumulative_var

# Example usage
eigenvalues = np.array([50, 30, 15, 5])
individual, cumulative = explained_variance_ratio(eigenvalues)

print("Individual:", individual)
# Output: [0.5  0.3  0.15 0.05]

print("Cumulative:", cumulative)
# Output: [0.5  0.8  0.95 1.0]

# First 2 components explain 80% of variance`,
    testCases: [],
    hints: [
      'Total variance is sum of all eigenvalues',
      'Each component explains: eigenvalue / total_variance',
      'Cumulative variance: running sum of explained variance',
      'Use np.cumsum for cumulative sum',
      'Common threshold: keep components until 95% variance explained'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-6-8',
    subjectId: 'cs402',
    topicId: 'cs402-topic-6',
    title: 'Implement Kernel PCA',
    difficulty: 4,
    description: `Build kernel PCA for non-linear dimensionality reduction.

Requirements:
- Support RBF (Gaussian) kernel
- Compute kernel matrix K
- Center kernel matrix
- Perform eigendecomposition
- Project new data using kernel trick`,
    starterCode: `import numpy as np

class KernelPCA:
    def __init__(self, n_components=2, kernel='rbf', gamma=1.0):
        self.n_components = n_components
        self.kernel = kernel
        self.gamma = gamma

    def fit(self, X):
        # TODO: Implement
        pass

    def transform(self, X):
        # TODO: Implement
        pass`,
    solution: `import numpy as np

class KernelPCA:
    def __init__(self, n_components=2, kernel='rbf', gamma=1.0):
        self.n_components = n_components
        self.kernel = kernel
        self.gamma = gamma
        self.X_fit = None
        self.alphas = None

    def rbf_kernel(self, X1, X2):
        """Compute RBF kernel matrix."""
        sq_dists = np.sum(X1**2, axis=1, keepdims=True) + \
                   np.sum(X2**2, axis=1) - 2 * X1 @ X2.T
        return np.exp(-self.gamma * sq_dists)

    def fit(self, X):
        """
        Fit kernel PCA.

        Args:
            X: data matrix (n_samples, n_features)
        """
        self.X_fit = X
        n_samples = X.shape[0]

        # Compute kernel matrix
        K = self.rbf_kernel(X, X)

        # Center kernel matrix
        one_n = np.ones((n_samples, n_samples)) / n_samples
        K_centered = K - one_n @ K - K @ one_n + one_n @ K @ one_n

        # Compute eigenvectors
        eigenvalues, eigenvectors = np.linalg.eigh(K_centered)

        # Sort by eigenvalues (descending)
        idx = np.argsort(eigenvalues)[::-1]
        eigenvalues = eigenvalues[idx]
        eigenvectors = eigenvectors[:, idx]

        # Normalize eigenvectors
        # alphas = eigenvectors / sqrt(eigenvalues)
        self.alphas = eigenvectors[:, :self.n_components] / \
                      np.sqrt(eigenvalues[:self.n_components])

        return self

    def transform(self, X):
        """
        Project data onto principal components.

        Args:
            X: data matrix

        Returns:
            transformed data
        """
        K = self.rbf_kernel(X, self.X_fit)

        # Center kernel matrix
        n_samples = self.X_fit.shape[0]
        one_n = np.ones((len(X), n_samples)) / n_samples
        K_fit = self.rbf_kernel(self.X_fit, self.X_fit)

        K_centered = K - one_n @ K_fit - \
                     K @ (np.ones((n_samples, n_samples)) / n_samples) + \
                     one_n @ K_fit @ (np.ones((n_samples, n_samples)) / n_samples)

        # Project
        return K_centered @ self.alphas`,
    testCases: [],
    hints: [
      'RBF kernel: K(x,y) = exp(-gamma * ||x-y||^2)',
      'Center kernel matrix using: K_c = K - 1*K - K*1 + 1*K*1',
      'Eigenvectors must be normalized: alpha = v / sqrt(lambda)',
      'For new data, compute kernel with training data',
      'Kernel PCA can capture non-linear structure'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-6-9',
    subjectId: 'cs402',
    topicId: 'cs402-topic-6',
    title: 'Implement t-SNE Gradient',
    difficulty: 5,
    description: `Implement core gradient computation for t-SNE.

Requirements:
- Compute pairwise similarities in high dimension (Gaussian)
- Compute pairwise similarities in low dimension (t-distribution)
- Calculate KL divergence gradient
- Support perplexity parameter`,
    starterCode: `import numpy as np

def tsne_gradient(X_high, X_low, perplexity=30):
    """
    Compute t-SNE gradient.

    Args:
        X_high: high-dimensional data
        X_low: current low-dimensional embedding
        perplexity: perplexity parameter

    Returns:
        gradient with respect to X_low
    """
    # TODO: Implement
    pass`,
    solution: `import numpy as np

def compute_p_matrix(X, perplexity=30):
    """Compute pairwise affinities in high dimension."""
    n = len(X)
    P = np.zeros((n, n))

    # Target entropy from perplexity
    target_entropy = np.log(perplexity)

    for i in range(n):
        # Binary search for sigma
        sigma = 1.0
        for _ in range(50):
            # Compute p_j|i
            diff = X[i] - X
            distances = np.sum(diff**2, axis=1)
            exp_vals = np.exp(-distances / (2 * sigma**2))
            exp_vals[i] = 0  # Set p_i|i = 0

            sum_exp = np.sum(exp_vals)
            if sum_exp == 0:
                p_i = np.zeros(n)
            else:
                p_i = exp_vals / sum_exp

            # Compute entropy
            p_i_nonzero = p_i[p_i > 0]
            entropy = -np.sum(p_i_nonzero * np.log2(p_i_nonzero))

            # Adjust sigma based on entropy
            if entropy > target_entropy:
                sigma *= 1.1
            else:
                sigma *= 0.9

        P[i] = p_i

    # Symmetrize
    P = (P + P.T) / (2 * n)
    return np.maximum(P, 1e-12)

def compute_q_matrix(X_low):
    """Compute pairwise affinities in low dimension (t-distribution)."""
    n = len(X_low)
    diff = X_low[:, np.newaxis] - X_low
    distances = np.sum(diff**2, axis=2)

    # t-distribution with 1 degree of freedom
    Q = 1 / (1 + distances)
    np.fill_diagonal(Q, 0)

    Q = Q / np.sum(Q)
    return np.maximum(Q, 1e-12)

def tsne_gradient(X_high, X_low, perplexity=30):
    """
    Compute t-SNE gradient.

    Args:
        X_high: high-dimensional data (n_samples, n_features_high)
        X_low: current low-dimensional embedding (n_samples, n_features_low)
        perplexity: perplexity parameter

    Returns:
        gradient with respect to X_low
    """
    n = len(X_high)

    # Compute P and Q matrices
    P = compute_p_matrix(X_high, perplexity)
    Q = compute_q_matrix(X_low)

    # Compute gradient
    PQ_diff = P - Q
    grad = np.zeros_like(X_low)

    for i in range(n):
        diff = X_low[i] - X_low
        distances = np.sum(diff**2, axis=1)
        weights = PQ_diff[i] * (1 / (1 + distances))
        grad[i] = 4 * np.sum(weights[:, np.newaxis] * diff, axis=0)

    return grad`,
    testCases: [],
    hints: [
      'High-dim similarities use Gaussian kernel',
      'Low-dim similarities use t-distribution (heavy tails)',
      'Perplexity controls effective number of neighbors',
      'Use binary search to find appropriate sigma for each point',
      'Gradient: 4 * sum((p_ij - q_ij) * (y_i - y_j) / (1 + ||y_i - y_j||^2))',
      't-SNE minimizes KL divergence between P and Q'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-6-10',
    subjectId: 'cs402',
    topicId: 'cs402-topic-6',
    title: 'Build Gaussian Mixture Model',
    difficulty: 4,
    description: `Implement GMM using Expectation-Maximization algorithm.

Requirements:
- E-step: compute responsibilities (posterior probabilities)
- M-step: update means, covariances, and mixing coefficients
- Handle multiple Gaussian components
- Support diagonal covariance matrices`,
    starterCode: `import numpy as np

class GaussianMixture:
    def __init__(self, n_components=3, max_iter=100):
        self.n_components = n_components
        self.max_iter = max_iter

    def fit(self, X):
        # TODO: Implement EM algorithm
        pass`,
    solution: `import numpy as np

class GaussianMixture:
    def __init__(self, n_components=3, max_iter=100):
        self.n_components = n_components
        self.max_iter = max_iter
        self.means = None
        self.covs = None
        self.mixing_coefs = None

    def gaussian_pdf(self, X, mean, cov):
        """Compute Gaussian PDF."""
        n_features = X.shape[1]
        diff = X - mean
        cov_inv = np.linalg.inv(cov)
        cov_det = np.linalg.det(cov)

        norm_const = 1 / np.sqrt((2 * np.pi)**n_features * cov_det)
        exponent = -0.5 * np.sum((diff @ cov_inv) * diff, axis=1)

        return norm_const * np.exp(exponent)

    def fit(self, X):
        """
        Fit GMM using EM algorithm.

        Args:
            X: data matrix (n_samples, n_features)
        """
        n_samples, n_features = X.shape

        # Initialize parameters
        # Random initialization of means
        idx = np.random.choice(n_samples, self.n_components, replace=False)
        self.means = X[idx]

        # Initialize covariances as identity
        self.covs = [np.eye(n_features) for _ in range(self.n_components)]

        # Initialize mixing coefficients uniformly
        self.mixing_coefs = np.ones(self.n_components) / self.n_components

        for iteration in range(self.max_iter):
            # E-step: compute responsibilities
            responsibilities = np.zeros((n_samples, self.n_components))

            for k in range(self.n_components):
                responsibilities[:, k] = self.mixing_coefs[k] * \
                    self.gaussian_pdf(X, self.means[k], self.covs[k])

            # Normalize responsibilities
            responsibilities /= responsibilities.sum(axis=1, keepdims=True)

            # M-step: update parameters
            N_k = responsibilities.sum(axis=0)

            # Update means
            for k in range(self.n_components):
                self.means[k] = (responsibilities[:, k:k+1] * X).sum(axis=0) / N_k[k]

            # Update covariances
            for k in range(self.n_components):
                diff = X - self.means[k]
                self.covs[k] = (responsibilities[:, k:k+1] * diff).T @ diff / N_k[k]
                # Add small value to diagonal for numerical stability
                self.covs[k] += np.eye(n_features) * 1e-6

            # Update mixing coefficients
            self.mixing_coefs = N_k / n_samples

        return self

    def predict_proba(self, X):
        """Return probability of each component."""
        n_samples = X.shape[0]
        probs = np.zeros((n_samples, self.n_components))

        for k in range(self.n_components):
            probs[:, k] = self.mixing_coefs[k] * \
                self.gaussian_pdf(X, self.means[k], self.covs[k])

        return probs / probs.sum(axis=1, keepdims=True)

    def predict(self, X):
        """Return most likely component."""
        return np.argmax(self.predict_proba(X), axis=1)`,
    testCases: [],
    hints: [
      'E-step: compute gamma_ik = pi_k * N(x_i | mu_k, Sigma_k)',
      'Normalize responsibilities to sum to 1',
      'M-step: update means as weighted average of points',
      'Update covariances using weighted outer products',
      'Mixing coefficients: pi_k = N_k / N (proportion of points)',
      'Add small value to covariance diagonal for numerical stability'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-6-11',
    subjectId: 'cs402',
    topicId: 'cs402-topic-6',
    title: 'Implement Anomaly Detection',
    difficulty: 3,
    description: `Build statistical anomaly detection using Gaussian distribution.

Requirements:
- Fit Gaussian distribution to training data
- Compute probability density for new points
- Flag points below threshold as anomalies
- Support multivariate Gaussian`,
    starterCode: `import numpy as np

class AnomalyDetector:
    def __init__(self, threshold=0.01):
        self.threshold = threshold
        self.mean = None
        self.cov = None

    def fit(self, X):
        # TODO: Implement
        pass

    def predict(self, X):
        # TODO: Implement
        pass`,
    solution: `import numpy as np

class AnomalyDetector:
    def __init__(self, threshold=0.01):
        self.threshold = threshold
        self.mean = None
        self.cov = None

    def fit(self, X):
        """
        Fit Gaussian distribution to data.

        Args:
            X: training data (normal examples)
        """
        self.mean = np.mean(X, axis=0)
        self.cov = np.cov(X.T)

        # Ensure covariance is positive definite
        self.cov += np.eye(len(self.cov)) * 1e-6

        return self

    def probability_density(self, X):
        """
        Compute probability density under Gaussian.

        Args:
            X: data points

        Returns:
            probability densities
        """
        n_features = X.shape[1]

        # Compute multivariate Gaussian PDF
        diff = X - self.mean
        cov_inv = np.linalg.inv(self.cov)
        cov_det = np.linalg.det(self.cov)

        norm_const = 1 / np.sqrt((2 * np.pi)**n_features * cov_det)
        exponent = -0.5 * np.sum((diff @ cov_inv) * diff, axis=1)

        return norm_const * np.exp(exponent)

    def predict(self, X):
        """
        Predict anomalies.

        Args:
            X: data points

        Returns:
            labels (1 = normal, -1 = anomaly)
        """
        probabilities = self.probability_density(X)
        return np.where(probabilities >= self.threshold, 1, -1)

    def decision_function(self, X):
        """Return anomaly scores (negative log probability)."""
        probabilities = self.probability_density(X)
        return -np.log(probabilities + 1e-10)`,
    testCases: [],
    hints: [
      'Fit multivariate Gaussian to normal training data',
      'Probability density: p(x) = N(x | mu, Sigma)',
      'Points with low probability are anomalies',
      'Choose threshold based on validation set',
      'Can also use negative log probability as anomaly score',
      'Add small value to covariance diagonal for stability'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-6-12',
    subjectId: 'cs402',
    topicId: 'cs402-topic-6',
    title: 'Build Isolation Forest',
    difficulty: 4,
    description: `Implement Isolation Forest for anomaly detection.

Requirements:
- Build random isolation trees
- Anomalies are easier to isolate (shorter paths)
- Compute anomaly score based on path length
- Support multiple trees (ensemble)`,
    starterCode: `import numpy as np

class IsolationTree:
    def __init__(self, height_limit):
        self.height_limit = height_limit

    def fit(self, X, current_height=0):
        # TODO: Implement
        pass

class IsolationForest:
    def __init__(self, n_trees=100):
        self.n_trees = n_trees
        self.trees = []

    def fit(self, X):
        # TODO: Implement
        pass`,
    solution: `import numpy as np

class IsolationTree:
    def __init__(self, height_limit):
        self.height_limit = height_limit
        self.split_feature = None
        self.split_value = None
        self.left = None
        self.right = None
        self.size = 0

    def fit(self, X, current_height=0):
        """
        Build isolation tree.

        Args:
            X: data points
            current_height: current depth in tree
        """
        self.size = len(X)

        # Stop if height limit reached or only one point
        if current_height >= self.height_limit or len(X) <= 1:
            return self

        # Random split
        n_features = X.shape[1]
        self.split_feature = np.random.randint(0, n_features)

        feature_values = X[:, self.split_feature]
        min_val, max_val = feature_values.min(), feature_values.max()

        if min_val == max_val:
            return self

        self.split_value = np.random.uniform(min_val, max_val)

        # Split data
        left_mask = feature_values < self.split_value
        right_mask = ~left_mask

        if left_mask.sum() > 0:
            self.left = IsolationTree(self.height_limit)
            self.left.fit(X[left_mask], current_height + 1)

        if right_mask.sum() > 0:
            self.right = IsolationTree(self.height_limit)
            self.right.fit(X[right_mask], current_height + 1)

        return self

    def path_length(self, x, current_height=0):
        """Compute path length for a point."""
        if self.split_feature is None:
            # External node
            return current_height + self._c(self.size)

        if x[self.split_feature] < self.split_value:
            if self.left is not None:
                return self.left.path_length(x, current_height + 1)
        else:
            if self.right is not None:
                return self.right.path_length(x, current_height + 1)

        return current_height + self._c(self.size)

    def _c(self, n):
        """Average path length of unsuccessful search in BST."""
        if n <= 1:
            return 0
        return 2 * (np.log(n - 1) + 0.5772156649) - 2 * (n - 1) / n

class IsolationForest:
    def __init__(self, n_trees=100, sample_size=256):
        self.n_trees = n_trees
        self.sample_size = sample_size
        self.trees = []

    def fit(self, X):
        """
        Build isolation forest.

        Args:
            X: training data
        """
        n_samples = len(X)
        height_limit = int(np.ceil(np.log2(self.sample_size)))

        self.trees = []
        for _ in range(self.n_trees):
            # Sample subset
            sample_idx = np.random.choice(n_samples,
                                         min(self.sample_size, n_samples),
                                         replace=False)
            X_sample = X[sample_idx]

            # Build tree
            tree = IsolationTree(height_limit)
            tree.fit(X_sample)
            self.trees.append(tree)

        return self

    def anomaly_score(self, X):
        """
        Compute anomaly scores.

        Args:
            X: data points

        Returns:
            scores (higher = more anomalous)
        """
        avg_path_lengths = np.zeros(len(X))

        for tree in self.trees:
            for i, x in enumerate(X):
                avg_path_lengths[i] += tree.path_length(x)

        avg_path_lengths /= len(self.trees)

        # Normalize
        c = self.trees[0]._c(self.sample_size)
        scores = 2 ** (-avg_path_lengths / c)

        return scores

    def predict(self, X, threshold=0.5):
        """Predict anomalies (score > threshold)."""
        scores = self.anomaly_score(X)
        return np.where(scores > threshold, -1, 1)`,
    testCases: [],
    hints: [
      'Isolation trees use random splits on random features',
      'Anomalies have shorter average path lengths',
      'Height limit: ceil(log2(sample_size))',
      'Sample subset of data for each tree (default 256 points)',
      'Anomaly score: 2^(-E[h(x)] / c(n))',
      'Score close to 1 indicates anomaly, close to 0 indicates normal'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-6-13',
    subjectId: 'cs402',
    topicId: 'cs402-topic-6',
    title: 'Implement Autoencoder for Anomaly Detection',
    difficulty: 4,
    description: `Build autoencoder neural network for unsupervised anomaly detection.

Requirements:
- Encoder: compress input to lower-dimensional latent space
- Decoder: reconstruct input from latent representation
- Train to minimize reconstruction error
- Use reconstruction error as anomaly score`,
    starterCode: `import torch
import torch.nn as nn

class Autoencoder(nn.Module):
    def __init__(self, input_dim, latent_dim):
        super().__init__()
        # Define encoder and decoder

    def forward(self, x):
        # TODO: Implement
        pass

def detect_anomalies(model, X, threshold):
    # TODO: Implement
    pass`,
    solution: `import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np

class Autoencoder(nn.Module):
    def __init__(self, input_dim, latent_dim):
        super().__init__()

        # Encoder
        self.encoder = nn.Sequential(
            nn.Linear(input_dim, 64),
            nn.ReLU(),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, latent_dim)
        )

        # Decoder
        self.decoder = nn.Sequential(
            nn.Linear(latent_dim, 32),
            nn.ReLU(),
            nn.Linear(32, 64),
            nn.ReLU(),
            nn.Linear(64, input_dim)
        )

    def forward(self, x):
        """Forward pass through autoencoder."""
        latent = self.encoder(x)
        reconstruction = self.decoder(latent)
        return reconstruction

def train_autoencoder(model, X_train, epochs=50, lr=0.001):
    """
    Train autoencoder.

    Args:
        model: autoencoder model
        X_train: training data (normal examples)
        epochs: number of training epochs
        lr: learning rate
    """
    optimizer = optim.Adam(model.parameters(), lr=lr)
    criterion = nn.MSELoss()

    X_train_tensor = torch.FloatTensor(X_train)

    for epoch in range(epochs):
        model.train()
        optimizer.zero_grad()

        # Forward pass
        reconstruction = model(X_train_tensor)
        loss = criterion(reconstruction, X_train_tensor)

        # Backward pass
        loss.backward()
        optimizer.step()

        if (epoch + 1) % 10 == 0:
            print(f'Epoch {epoch+1}/{epochs}, Loss: {loss.item():.4f}')

def detect_anomalies(model, X, threshold):
    """
    Detect anomalies using reconstruction error.

    Args:
        model: trained autoencoder
        X: data points
        threshold: reconstruction error threshold

    Returns:
        labels (1 = normal, -1 = anomaly)
        reconstruction errors
    """
    model.eval()
    with torch.no_grad():
        X_tensor = torch.FloatTensor(X)
        reconstruction = model(X_tensor)

        # Compute reconstruction error for each sample
        errors = torch.mean((X_tensor - reconstruction)**2, dim=1)
        errors = errors.numpy()

    # Flag high error as anomalies
    labels = np.where(errors < threshold, 1, -1)

    return labels, errors

# Example usage
input_dim = 10
latent_dim = 3

model = Autoencoder(input_dim, latent_dim)
X_train = np.random.randn(1000, input_dim)

train_autoencoder(model, X_train)

# Determine threshold from training data
_, train_errors = detect_anomalies(model, X_train, threshold=float('inf'))
threshold = np.percentile(train_errors, 95)  # 95th percentile

# Detect anomalies in test data
X_test = np.random.randn(100, input_dim)
labels, errors = detect_anomalies(model, X_test, threshold)`,
    testCases: [],
    hints: [
      'Train autoencoder only on normal data',
      'Encoder compresses to latent dimension (bottleneck)',
      'Decoder reconstructs from latent representation',
      'Use MSE loss for reconstruction error',
      'Anomalies have high reconstruction error',
      'Set threshold based on validation data (e.g., 95th percentile)'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-6-14',
    subjectId: 'cs402',
    topicId: 'cs402-topic-6',
    title: 'Implement Davies-Bouldin Index',
    difficulty: 2,
    description: `Compute Davies-Bouldin index to evaluate clustering quality.

Requirements:
- For each cluster, compute average distance to cluster center
- Compute cluster similarity (sum of spreads / distance between centers)
- Lower DB index indicates better clustering
- Compare different clustering solutions`,
    starterCode: `import numpy as np

def davies_bouldin_index(X, labels):
    """
    Compute Davies-Bouldin index.

    Args:
        X: data points
        labels: cluster assignments

    Returns:
        DB index (lower is better)
    """
    # TODO: Implement
    pass`,
    solution: `import numpy as np

def davies_bouldin_index(X, labels):
    """
    Compute Davies-Bouldin index.

    Args:
        X: data points (n_samples, n_features)
        labels: cluster assignments

    Returns:
        DB index (lower is better)
    """
    n_clusters = len(np.unique(labels))

    # Compute cluster centers
    centers = np.array([X[labels == k].mean(axis=0)
                       for k in range(n_clusters)])

    # Compute average distance within each cluster (spread)
    spreads = np.zeros(n_clusters)
    for k in range(n_clusters):
        cluster_points = X[labels == k]
        if len(cluster_points) > 0:
            spreads[k] = np.mean([np.linalg.norm(x - centers[k])
                                 for x in cluster_points])

    # Compute DB index
    db_scores = np.zeros(n_clusters)

    for i in range(n_clusters):
        max_ratio = 0
        for j in range(n_clusters):
            if i != j:
                # Distance between centers
                center_dist = np.linalg.norm(centers[i] - centers[j])

                if center_dist > 0:
                    # Ratio of spreads to separation
                    ratio = (spreads[i] + spreads[j]) / center_dist
                    max_ratio = max(max_ratio, ratio)

        db_scores[i] = max_ratio

    # Average over all clusters
    return np.mean(db_scores)`,
    testCases: [],
    hints: [
      'Spread S_i: average distance from points to cluster center',
      'Separation M_ij: distance between cluster centers i and j',
      'Similarity R_ij = (S_i + S_j) / M_ij',
      'For each cluster i, find max R_ij over all other clusters j',
      'DB index is average of these max values',
      'Lower DB index means better separated, compact clusters'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-6-15',
    subjectId: 'cs402',
    topicId: 'cs402-topic-6',
    title: 'Build Mean Shift Clustering',
    difficulty: 4,
    description: `Implement mean shift algorithm for clustering.

Requirements:
- Iteratively shift points toward density maxima
- Use kernel (Gaussian) for weighting neighbors
- Merge points that converge to same mode
- Support bandwidth parameter`,
    starterCode: `import numpy as np

class MeanShift:
    def __init__(self, bandwidth=1.0, max_iter=300):
        self.bandwidth = bandwidth
        self.max_iter = max_iter

    def fit_predict(self, X):
        # TODO: Implement
        pass`,
    solution: `import numpy as np

class MeanShift:
    def __init__(self, bandwidth=1.0, max_iter=300, tol=1e-3):
        self.bandwidth = bandwidth
        self.max_iter = max_iter
        self.tol = tol
        self.cluster_centers = None

    def gaussian_kernel(self, distance):
        """Gaussian kernel for weighting."""
        return np.exp(-(distance**2) / (2 * self.bandwidth**2))

    def shift_point(self, point, X):
        """Shift point toward density maximum."""
        for _ in range(self.max_iter):
            # Compute distances to all points
            distances = np.linalg.norm(X - point, axis=1)

            # Compute weights using Gaussian kernel
            weights = self.gaussian_kernel(distances)

            # Compute weighted mean
            new_point = np.sum(weights[:, np.newaxis] * X, axis=0) / np.sum(weights)

            # Check convergence
            if np.linalg.norm(new_point - point) < self.tol:
                break

            point = new_point

        return point

    def fit_predict(self, X):
        """
        Perform mean shift clustering.

        Args:
            X: data points (n_samples, n_features)

        Returns:
            cluster labels
        """
        n_samples = len(X)

        # Shift each point to find modes
        modes = np.zeros_like(X)
        for i in range(n_samples):
            modes[i] = self.shift_point(X[i].copy(), X)

        # Merge nearby modes
        cluster_centers = []
        labels = np.zeros(n_samples, dtype=int)

        for i in range(n_samples):
            # Check if mode is close to existing cluster center
            is_new_cluster = True

            for j, center in enumerate(cluster_centers):
                if np.linalg.norm(modes[i] - center) < self.bandwidth:
                    labels[i] = j
                    is_new_cluster = False
                    break

            if is_new_cluster:
                cluster_centers.append(modes[i])
                labels[i] = len(cluster_centers) - 1

        self.cluster_centers = np.array(cluster_centers)
        return labels`,
    testCases: [],
    hints: [
      'Mean shift moves points toward highest density region',
      'Use Gaussian kernel to weight nearby points',
      'New position: weighted average of neighbors',
      'Iterate until convergence (small movement)',
      'Points converging to same mode belong to same cluster',
      'Bandwidth controls neighborhood size (similar to KDE)'
    ],
    language: 'python'
  },
  {
    id: 'cs402-ex-6-16',
    subjectId: 'cs402',
    topicId: 'cs402-topic-6',
    title: 'Implement Spectral Clustering',
    difficulty: 5,
    description: `Build spectral clustering using graph Laplacian.

Requirements:
- Construct similarity graph (RBF kernel)
- Compute graph Laplacian matrix
- Find eigenvectors of Laplacian
- Apply k-means to eigenvector representation
- Handle non-convex clusters`,
    starterCode: `import numpy as np

class SpectralClustering:
    def __init__(self, n_clusters=3, gamma=1.0):
        self.n_clusters = n_clusters
        self.gamma = gamma

    def fit_predict(self, X):
        # TODO: Implement
        pass`,
    solution: `import numpy as np
from sklearn.cluster import KMeans

class SpectralClustering:
    def __init__(self, n_clusters=3, gamma=1.0):
        self.n_clusters = n_clusters
        self.gamma = gamma

    def rbf_kernel(self, X):
        """Compute RBF (Gaussian) similarity matrix."""
        sq_dists = np.sum(X**2, axis=1, keepdims=True) + \
                   np.sum(X**2, axis=1) - 2 * X @ X.T
        return np.exp(-self.gamma * sq_dists)

    def fit_predict(self, X):
        """
        Perform spectral clustering.

        Args:
            X: data points (n_samples, n_features)

        Returns:
            cluster labels
        """
        n_samples = len(X)

        # Step 1: Compute similarity matrix
        W = self.rbf_kernel(X)

        # Step 2: Compute degree matrix
        D = np.diag(np.sum(W, axis=1))

        # Step 3: Compute normalized graph Laplacian
        # L = D^(-1/2) * (D - W) * D^(-1/2)
        D_sqrt_inv = np.diag(1.0 / np.sqrt(np.diag(D) + 1e-10))
        L = D_sqrt_inv @ (D - W) @ D_sqrt_inv

        # Step 4: Compute eigenvectors
        eigenvalues, eigenvectors = np.linalg.eigh(L)

        # Step 5: Use first k eigenvectors (smallest eigenvalues)
        U = eigenvectors[:, :self.n_clusters]

        # Step 6: Normalize rows to unit length
        U_normalized = U / (np.linalg.norm(U, axis=1, keepdims=True) + 1e-10)

        # Step 7: Apply k-means to the eigenvector representation
        kmeans = KMeans(n_clusters=self.n_clusters, random_state=42)
        labels = kmeans.fit_predict(U_normalized)

        return labels`,
    testCases: [],
    hints: [
      'Construct affinity matrix using RBF kernel: W_ij = exp(-gamma * ||x_i - x_j||^2)',
      'Degree matrix D is diagonal with D_ii = sum_j W_ij',
      'Normalized Laplacian: L = D^(-1/2) * (D - W) * D^(-1/2)',
      'Use eigenvectors corresponding to k smallest eigenvalues',
      'Normalize eigenvector rows before k-means',
      'Spectral clustering can find non-convex clusters'
    ],
    language: 'python'
  }
];
