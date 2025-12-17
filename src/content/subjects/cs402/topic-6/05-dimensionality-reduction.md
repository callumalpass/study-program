# Advanced Dimensionality Reduction

Beyond PCA, numerous dimensionality reduction techniques capture different aspects of data structure. t-SNE and UMAP excel at visualization, autoencoders learn nonlinear representations, and specialized methods address specific data characteristics.

## t-SNE: t-Distributed Stochastic Neighbor Embedding

t-SNE preserves local structure by maintaining pairwise similarities between points. Unlike PCA (global variance), t-SNE focuses on keeping similar points close and dissimilar points apart.

### How t-SNE Works

t-SNE models pairwise similarities in high and low dimensions, minimizing their divergence:

**High-dimensional similarities**: Convert distances to probabilities using Gaussian kernel  
**Low-dimensional similarities**: Use Student t-distribution (heavier tails prevent crowding)  
**Optimization**: Minimize KL divergence between distributions using gradient descent

The t-distribution's heavier tails solve the "crowding problem"—in low dimensions, there isn't enough space for moderately distant points. Heavy tails allow these points to spread out.

### Parameters

**Perplexity**: Balances local vs. global structure (5-50, typically 30). Small perplexity focuses on very local structure; large perplexity considers broader context.

**Learning rate**: Too high causes crowding; too low causes fragmented clusters.

**Iterations**: Typically 1000-5000 for convergence.

### Limitations

- **Slow**: O(n²) complexity limits to ~10,000 points without approximations  
- **Non-parametric**: Cannot transform new points without refitting  
- **Non-convex optimization**: Different runs give different results  
- **Hyperparameter sensitive**: Results vary significantly with perplexity  
- **Distances meaningless**: Cluster sizes and distances in t-SNE plots aren't meaningful; only local groupings matter

## UMAP: Uniform Manifold Approximation and Projection

UMAP provides faster, more scalable visualization with better preservation of global structure than t-SNE.

### Advantages Over t-SNE

**Speed**: ~10x faster, handles 100,000+ points  
**Global structure**: Preserves both local and global relationships better  
**Scalability**: Efficient implementations for large datasets  
**New data**: Can transform new points without refitting

### How UMAP Works

UMAP constructs a fuzzy topological representation of high-dimensional data, then optimizes a low-dimensional layout to match this topology using differential geometry and algebraic topology.

Practical usage similar to t-SNE but with additional flexibility in preserving different scales of structure.

## Autoencoders for Dimensionality Reduction

Neural networks provide powerful nonlinear dimensionality reduction through autoencoders.

### Basic Autoencoder Architecture

```
Input → Encoder → Bottleneck → Decoder → Reconstruction
  (d)     (...)      (k)        (...)         (d)
```

The bottleneck layer forces compression. Encoder learns embedding; decoder learns reconstruction. Training minimizes reconstruction error.

### Advantages

- **Nonlinear**: Captures complex relationships PCA cannot  
- **Flexible**: Deep architectures learn hierarchical features  
- **Scalable**: GPU acceleration enables large datasets  
- **Parametric**: Easy to encode new data

### Limitations

- **Data hungry**: Requires substantial training data  
- **Computational cost**: Training neural networks is expensive  
- **Hyperparameters**: Architecture, learning rate, etc. require tuning  
- **Interpretability**: Learned representations are black-box

### Variational Autoencoders

VAEs regularize the latent space to be continuous and smooth, enabling generation and better interpolation.

## Manifold Learning Methods

Several methods assume data lies on a low-dimensional manifold embedded in high dimensions.

### Isomap

Extends MDS (Multidimensional Scaling) by using geodesic distances (shortest path on manifold) instead of Euclidean distances. Good for "unrolling" curved manifolds.

### Locally Linear Embedding (LLE)

Reconstructs each point from neighbors, preserving these local reconstructions in low dimensions. Particularly good for discovering intrinsic dimensionality.

### Laplacian Eigenmaps

Builds a graph of neighbors and finds low-dimensional representation preserving graph structure. Related to spectral clustering.

## Choosing a Dimensionality Reduction Method

**Use PCA when**:
- Linear relationships suffice
- Speed is critical
- Interpretability matters
- Preserving variance is the goal

**Use t-SNE/UMAP when**:
- Visualization is the goal (2-3D)
- Preserving local structure matters
- Nonlinear relationships exist
- Global distances are less important

**Use Autoencoders when**:
- Abundant training data exists
- Highly nonlinear relationships exist
- Need to encode new data efficiently
- Deep hierarchical features are valuable

**Use Manifold Learning when**:
- Data lies on low-dimensional manifold
- Preserving geodesic distances matters
- Dataset is moderate size

## Practical Recommendations

**Start with PCA**: Fast baseline, interpretable, often sufficient.

**Try UMAP for visualization**: Better than t-SNE in most cases—faster, preserves more structure.

**Consider supervised methods**: If labels exist, supervised DR (LDA, NCA) may outperform unsupervised.

**Combine methods**: PCA for initial reduction, then t-SNE/UMAP for final visualization.

**Validate results**: Different methods reveal different structure; cross-validate findings.

## Conclusion

Modern machine learning offers diverse dimensionality reduction tools beyond PCA. t-SNE and UMAP excel at visualization, autoencoders provide flexible nonlinear reduction, and manifold learning methods capture intrinsic geometry. Understanding each method's strengths guides effective application for exploration, preprocessing, and understanding complex high-dimensional data.
