import type { Quiz, QuizQuestion } from '../../../core/types';

const questions: QuizQuestion[] = [
  // Topic 1: Machine Learning Overview - Quiz 1a: Fundamentals
  {
    id: 'cs402-q1',
    type: 'multiple_choice',
    prompt: 'What is the primary difference between supervised and unsupervised learning?',
    options: [
      'Supervised learning uses labeled data, unsupervised learning does not',
      'Supervised learning is faster than unsupervised learning',
      'Unsupervised learning is more accurate',
      'Supervised learning requires more computational power'
    ],
    correctAnswer: 'Supervised learning uses labeled data, unsupervised learning does not',
    explanation: 'The key distinction is that supervised learning trains on labeled examples (input-output pairs), while unsupervised learning finds patterns in unlabeled data without predefined target values.'
  },
  {
    id: 'cs402-q2',
    type: 'multiple_choice',
    prompt: 'Which of the following is NOT a step in the typical ML workflow?',
    options: [
      'Manual code optimization for production',
      'Data collection and preprocessing',
      'Model training and validation',
      'Feature engineering'
    ],
    correctAnswer: 'Manual code optimization for production',
    explanation: 'The typical ML workflow includes data collection, preprocessing, feature engineering, model selection, training, validation, and deployment. Manual code optimization is not a standard ML workflow step.'
  },
  {
    id: 'cs402-q3',
    type: 'multiple_choice',
    prompt: 'What does the bias-variance tradeoff describe?',
    options: [
      'The balance between model simplicity (high bias) and flexibility (high variance)',
      'The choice between accuracy and speed',
      'The tradeoff between training and test set size',
      'The balance between false positives and false negatives'
    ],
    correctAnswer: 'The balance between model simplicity (high bias) and flexibility (high variance)',
    explanation: 'The bias-variance tradeoff describes how simple models have high bias (underfitting) but low variance, while complex models have low bias but high variance (overfitting). The goal is to minimize total error.'
  },
  {
    id: 'cs402-q4',
    type: 'multiple_choice',
    prompt: 'What is feature engineering?',
    options: [
      'Creating new features from raw data to improve model performance',
      'Reducing the number of features in a dataset',
      'Normalizing feature values',
      'Selecting the best machine learning algorithm'
    ],
    correctAnswer: 'Creating new features from raw data to improve model performance',
    explanation: 'Feature engineering is the process of using domain knowledge to create new, informative features from raw data that help machine learning models learn better patterns.'
  },
  {
    id: 'cs402-q5',
    type: 'multiple_choice',
    prompt: 'Which ML framework is known for dynamic computational graphs and is widely used in research?',
    options: [
      'PyTorch',
      'Scikit-learn',
      'XGBoost',
      'TensorFlow 1.x'
    ],
    correctAnswer: 'PyTorch',
    explanation: 'PyTorch uses dynamic computational graphs (define-by-run), making it flexible and intuitive for research. TensorFlow 2.x also adopted this approach, but PyTorch was the pioneer in this area.'
  },

  // Topic 1: Machine Learning Overview - Quiz 1b: Application
  {
    id: 'cs402-q6',
    type: 'multiple_choice',
    prompt: 'You have a dataset with 100 features and 200 samples. What problem might you face?',
    options: [
      'Overfitting due to the curse of dimensionality',
      'Underfitting due to too few features',
      'Computational efficiency will be excellent',
      'The model will always generalize well'
    ],
    correctAnswer: 'Overfitting due to the curse of dimensionality',
    explanation: 'With more features than samples (p > n), models can easily overfit. This is the curse of dimensionality - as dimensions increase, data becomes sparse and patterns harder to find reliably.'
  },
  {
    id: 'cs402-q7',
    type: 'multiple_choice',
    prompt: 'When should you use stratified sampling for train-test split?',
    options: [
      'When you have imbalanced classes and want to preserve class proportions',
      'When you have too much data',
      'When features are highly correlated',
      'When the dataset is perfectly balanced'
    ],
    correctAnswer: 'When you have imbalanced classes and want to preserve class proportions',
    explanation: 'Stratified sampling ensures that train and test sets have the same proportion of classes as the original dataset, which is crucial for imbalanced datasets to avoid biased evaluation.'
  },
  {
    id: 'cs402-q8',
    type: 'multiple_choice',
    prompt: 'What is the purpose of data normalization/standardization?',
    options: [
      'To put features on similar scales so they contribute equally to distance-based models',
      'To remove outliers from the dataset',
      'To increase the size of the training set',
      'To reduce computational complexity'
    ],
    correctAnswer: 'To put features on similar scales so they contribute equally to distance-based models',
    explanation: 'Normalization (scaling to [0,1]) or standardization (zero mean, unit variance) ensures features with different scales don\'t dominate distance calculations or gradient descent.'
  },
  {
    id: 'cs402-q9',
    type: 'multiple_choice',
    prompt: 'Your model performs well on training data but poorly on validation data. What is this called?',
    options: [
      'Overfitting',
      'Underfitting',
      'Good generalization',
      'High bias'
    ],
    correctAnswer: 'Overfitting',
    explanation: 'Overfitting occurs when a model learns the training data too well, including noise and specific patterns that don\'t generalize to new data, resulting in poor validation/test performance.'
  },
  {
    id: 'cs402-q10',
    type: 'multiple_choice',
    prompt: 'Which technique helps prevent overfitting?',
    options: [
      'Regularization (L1/L2)',
      'Adding more features',
      'Increasing model complexity',
      'Training for more epochs'
    ],
    correctAnswer: 'Regularization (L1/L2)',
    explanation: 'Regularization adds a penalty term to the loss function that discourages complex models, helping prevent overfitting. L1 (Lasso) and L2 (Ridge) are common regularization techniques.'
  },

  // Topic 1: Machine Learning Overview - Quiz 1c: Mastery
  {
    id: 'cs402-q11',
    type: 'multiple_choice',
    prompt: 'In the bias-variance decomposition, what does the irreducible error represent?',
    options: [
      'Noise inherent in the data that no model can eliminate',
      'Error from using wrong model architecture',
      'Error from insufficient training data',
      'Error from poor hyperparameter tuning'
    ],
    correctAnswer: 'Noise inherent in the data that no model can eliminate',
    explanation: 'Irreducible error (Bayes error) comes from noise in the data itself - random variation that cannot be predicted by any model. Total error = bias² + variance + irreducible error.'
  },
  {
    id: 'cs402-q12',
    type: 'multiple_choice',
    prompt: 'What is the VC dimension?',
    options: [
      'A measure of model capacity - the maximum number of points that can be shattered',
      'The number of features in a dataset',
      'The depth of a neural network',
      'The training time complexity'
    ],
    correctAnswer: 'A measure of model capacity - the maximum number of points that can be shattered',
    explanation: 'VC (Vapnik-Chervonenkis) dimension measures hypothesis class complexity. A set of n points is "shattered" if the classifier can realize all 2^n possible labelings. Higher VC dimension means more capacity but higher overfitting risk.'
  },
  {
    id: 'cs402-q13',
    type: 'multiple_choice',
    prompt: 'According to PAC learning theory, what does "probably approximately correct" mean?',
    options: [
      'With high probability, the learned hypothesis has low error',
      'The algorithm always finds the optimal solution',
      'The model is approximately 100% accurate',
      'Predictions are always correct within a small margin'
    ],
    correctAnswer: 'With high probability, the learned hypothesis has low error',
    explanation: 'PAC learning provides probabilistic guarantees: with probability ≥(1-δ), the learned hypothesis has error ≤ε, given sufficient samples. It doesn\'t guarantee perfect learning, just good learning with high probability.'
  },
  {
    id: 'cs402-q14',
    type: 'multiple_choice',
    prompt: 'What is the sample complexity bound for learning?',
    options: [
      'The number of training examples needed to achieve a given error with given confidence',
      'The computational time required for training',
      'The number of parameters in the model',
      'The memory required to store the dataset'
    ],
    correctAnswer: 'The number of training examples needed to achieve a given error with given confidence',
    explanation: 'Sample complexity bounds (from PAC theory) specify how many training examples m are needed to learn a concept with error ≤ε and confidence ≥(1-δ). Generally m = O((1/ε)log(1/δ)log|H|).'
  },
  {
    id: 'cs402-q15',
    type: 'multiple_choice',
    prompt: 'What does the No Free Lunch theorem state?',
    options: [
      'Averaged over all possible problems, no algorithm outperforms random guessing',
      'Free data is always worse than paid data',
      'Simple models always outperform complex ones',
      'Neural networks are always the best choice'
    ],
    correctAnswer: 'Averaged over all possible problems, no algorithm outperforms random guessing',
    explanation: 'The No Free Lunch theorem proves that no single algorithm is universally best. Every algorithm has inductive biases that make it excel on some problems but fail on others. This motivates domain-specific algorithm selection.'
  },

  // Topic 2: Linear and Logistic Regression - Quiz 2a: Fundamentals
  {
    id: 'cs402-q16',
    type: 'multiple_choice',
    prompt: 'What is the hypothesis function for linear regression?',
    options: [
      'h(x) = θ₀ + θ₁x₁ + θ₂x₂ + ... + θₙxₙ',
      'h(x) = 1/(1 + e^(-θᵀx))',
      'h(x) = max(0, θᵀx)',
      'h(x) = sign(θᵀx)'
    ],
    correctAnswer: 'h(x) = θ₀ + θ₁x₁ + θ₂x₂ + ... + θₙxₙ',
    explanation: 'Linear regression uses a linear combination of features: h(x) = θᵀx where θ are parameters to learn. This represents a hyperplane in feature space.'
  },
  {
    id: 'cs402-q17',
    type: 'multiple_choice',
    prompt: 'What loss function is typically used for linear regression?',
    options: [
      'Mean Squared Error (MSE)',
      'Cross-entropy',
      'Hinge loss',
      '0-1 loss'
    ],
    correctAnswer: 'Mean Squared Error (MSE)',
    explanation: 'Linear regression minimizes MSE: (1/2m)Σ(h(x⁽ⁱ⁾) - y⁽ⁱ⁾)². This is equivalent to maximum likelihood estimation under Gaussian noise assumptions.'
  },
  {
    id: 'cs402-q18',
    type: 'multiple_choice',
    prompt: 'What does gradient descent do?',
    options: [
      'Iteratively updates parameters in the direction that decreases the loss function',
      'Computes the exact optimal solution analytically',
      'Randomly searches for good parameters',
      'Increases the loss function to find maximum'
    ],
    correctAnswer: 'Iteratively updates parameters in the direction that decreases the loss function',
    explanation: 'Gradient descent updates parameters as θⱼ := θⱼ - α(∂J/∂θⱼ), moving downhill on the loss surface. The learning rate α controls step size.'
  },
  {
    id: 'cs402-q19',
    type: 'multiple_choice',
    prompt: 'What is the purpose of the sigmoid function in logistic regression?',
    options: [
      'To map linear predictions to probability range [0,1]',
      'To increase model accuracy',
      'To speed up training',
      'To handle missing values'
    ],
    correctAnswer: 'To map linear predictions to probability range [0,1]',
    explanation: 'The sigmoid function σ(z) = 1/(1+e^(-z)) squashes any real number to (0,1), allowing interpretation as probability. Logistic regression uses h(x) = σ(θᵀx).'
  },
  {
    id: 'cs402-q20',
    type: 'multiple_choice',
    prompt: 'What is L2 regularization (Ridge) also known as?',
    options: [
      'Weight decay',
      'Feature selection',
      'Lasso',
      'Dropout'
    ],
    correctAnswer: 'Weight decay',
    explanation: 'L2 regularization adds λΣθⱼ² to the loss, penalizing large weights. This is equivalent to weight decay in gradient descent: weights shrink toward zero at each step.'
  },

  // Topic 2: Linear and Logistic Regression - Quiz 2b: Application
  {
    id: 'cs402-q21',
    type: 'multiple_choice',
    prompt: 'Your gradient descent is oscillating and not converging. What should you do?',
    options: [
      'Decrease the learning rate',
      'Increase the learning rate',
      'Add more features',
      'Use fewer training iterations'
    ],
    correctAnswer: 'Decrease the learning rate',
    explanation: 'Oscillation indicates the learning rate is too high, causing overshooting. Decreasing α makes smaller, more stable steps toward the minimum.'
  },
  {
    id: 'cs402-q22',
    type: 'multiple_choice',
    prompt: 'When would you use L1 (Lasso) regularization over L2 (Ridge)?',
    options: [
      'When you want feature selection by driving some weights to exactly zero',
      'When all features are important',
      'When you have no multicollinearity',
      'When you want all weights to be small but non-zero'
    ],
    correctAnswer: 'When you want feature selection by driving some weights to exactly zero',
    explanation: 'L1 regularization (λΣ|θⱼ|) creates sparse solutions with many exact zeros due to its non-differentiable corners, effectively performing feature selection. L2 only shrinks weights.'
  },
  {
    id: 'cs402-q23',
    type: 'multiple_choice',
    prompt: 'You are using batch gradient descent and training is very slow. What could speed it up?',
    options: [
      'Use mini-batch or stochastic gradient descent',
      'Increase the number of features',
      'Decrease the learning rate',
      'Use a more complex model'
    ],
    correctAnswer: 'Use mini-batch or stochastic gradient descent',
    explanation: 'Batch GD computes gradients over the entire dataset, which is slow for large datasets. Mini-batch GD uses small batches for faster, noisier updates that often converge faster in practice.'
  },
  {
    id: 'cs402-q24',
    type: 'multiple_choice',
    prompt: 'For multiclass logistic regression, which approach uses multiple binary classifiers?',
    options: [
      'One-vs-All (OvA)',
      'Softmax regression',
      'Binary cross-entropy',
      'Sigmoid activation'
    ],
    correctAnswer: 'One-vs-All (OvA)',
    explanation: 'One-vs-All trains K binary classifiers (one per class vs rest), then selects the class with highest confidence. Softmax regression directly models all K classes in one model.'
  },
  {
    id: 'cs402-q25',
    type: 'multiple_choice',
    prompt: 'What is the closed-form solution for linear regression called?',
    options: [
      'Normal equation: θ = (XᵀX)⁻¹Xᵀy',
      'Gradient descent',
      'Newton\'s method',
      'Backpropagation'
    ],
    correctAnswer: 'Normal equation: θ = (XᵀX)⁻¹Xᵀy',
    explanation: 'The normal equation provides an analytical solution by setting gradient to zero and solving. It works well for small n but is O(n³) due to matrix inversion, while gradient descent is O(kn²) for k iterations.'
  },

  // Topic 2: Linear and Logistic Regression - Quiz 2c: Mastery
  {
    id: 'cs402-q26',
    type: 'multiple_choice',
    prompt: 'What is the probabilistic interpretation of linear regression?',
    options: [
      'Maximum likelihood estimation assuming Gaussian noise: y = θᵀx + ε where ε ~ N(0,σ²)',
      'Maximum a posteriori estimation with uniform prior',
      'Minimizing KL divergence',
      'Bayesian inference with conjugate prior'
    ],
    correctAnswer: 'Maximum likelihood estimation assuming Gaussian noise: y = θᵀx + ε where ε ~ N(0,σ²)',
    explanation: 'Under Gaussian noise assumptions, minimizing MSE is equivalent to maximum likelihood estimation. This explains why squared loss is natural for regression.'
  },
  {
    id: 'cs402-q27',
    type: 'multiple_choice',
    prompt: 'What is the gradient of logistic regression loss with respect to θⱼ?',
    options: [
      '(1/m)Σ(h(x⁽ⁱ⁾) - y⁽ⁱ⁾)xⱼ⁽ⁱ⁾',
      '(1/m)Σ(y⁽ⁱ⁾ - h(x⁽ⁱ⁾))xⱼ⁽ⁱ⁾',
      'Σ(h(x⁽ⁱ⁾) - y⁽ⁱ⁾)²',
      '-Σy⁽ⁱ⁾log(h(x⁽ⁱ⁾))'
    ],
    correctAnswer: '(1/m)Σ(h(x⁽ⁱ⁾) - y⁽ⁱ⁾)xⱼ⁽ⁱ⁾',
    explanation: 'Remarkably, logistic regression has the same gradient form as linear regression, even though h(x) = σ(θᵀx) is nonlinear. This comes from the cancellation between sigmoid derivative and log-likelihood.'
  },
  {
    id: 'cs402-q28',
    type: 'multiple_choice',
    prompt: 'What does the condition number of XᵀX indicate?',
    options: [
      'Numerical stability of the normal equation; high condition number indicates ill-conditioning',
      'The rank of the design matrix',
      'The number of features',
      'The optimal learning rate'
    ],
    correctAnswer: 'Numerical stability of the normal equation; high condition number indicates ill-conditioning',
    explanation: 'Condition number κ(XᵀX) = λ_max/λ_min measures sensitivity to numerical errors. High κ (near-singular matrix) makes (XᵀX)⁻¹ unstable. Regularization improves conditioning by adding λI to XᵀX.'
  },
  {
    id: 'cs402-q29',
    type: 'multiple_choice',
    prompt: 'What is the relationship between ridge regression and MAP estimation?',
    options: [
      'Ridge is MAP with Gaussian prior on weights: p(θ) ~ N(0, σ²I)',
      'Ridge is MAP with Laplace prior',
      'Ridge is unrelated to Bayesian inference',
      'Ridge is maximum likelihood estimation'
    ],
    correctAnswer: 'Ridge is MAP with Gaussian prior on weights: p(θ) ~ N(0, σ²I)',
    explanation: 'L2 regularization emerges naturally from Bayesian inference with Gaussian prior on weights. The penalty term λΣθⱼ² corresponds to -log p(θ) for a Gaussian prior.'
  },
  {
    id: 'cs402-q30',
    type: 'multiple_choice',
    prompt: 'Why is logistic regression a convex optimization problem?',
    options: [
      'The negative log-likelihood loss is convex, guaranteeing global minimum',
      'It uses linear features',
      'The sigmoid function is convex',
      'It always converges in one iteration'
    ],
    correctAnswer: 'The negative log-likelihood loss is convex, guaranteeing global minimum',
    explanation: 'The negative log-likelihood J(θ) = -Σ[y log h(x) + (1-y)log(1-h(x))] is convex in θ. Convexity means any local minimum is global, so gradient descent is guaranteed to find the optimal solution.'
  },

  // Topic 3: Classification Algorithms - Quiz 3a: Fundamentals
  {
    id: 'cs402-q31',
    type: 'multiple_choice',
    prompt: 'What criterion does a decision tree use to split nodes?',
    options: [
      'Information gain or Gini impurity',
      'Mean squared error',
      'Cross-entropy with softmax',
      'Euclidean distance'
    ],
    correctAnswer: 'Information gain or Gini impurity',
    explanation: 'Decision trees select splits that maximize information gain (entropy reduction) or minimize Gini impurity. Both measure how well a split separates classes.'
  },
  {
    id: 'cs402-q32',
    type: 'multiple_choice',
    prompt: 'What is the main idea behind Random Forests?',
    options: [
      'Train multiple decision trees on random subsets of data and features, then aggregate predictions',
      'Randomly select features at test time',
      'Use random initial weights',
      'Randomly prune trees'
    ],
    correctAnswer: 'Train multiple decision trees on random subsets of data and features, then aggregate predictions',
    explanation: 'Random Forests use bootstrap sampling (bagging) to create diverse trees and random feature subsets at each split. Averaging predictions reduces variance and improves generalization.'
  },
  {
    id: 'cs402-q33',
    type: 'multiple_choice',
    prompt: 'What does SVM maximize?',
    options: [
      'The margin between classes',
      'The number of support vectors',
      'Training accuracy',
      'The distance from origin'
    ],
    correctAnswer: 'The margin between classes',
    explanation: 'SVM finds the hyperplane that maximizes the margin (distance) to the nearest training points of each class. This maximum-margin principle often leads to good generalization.'
  },
  {
    id: 'cs402-q34',
    type: 'multiple_choice',
    prompt: 'How does k-NN make predictions?',
    options: [
      'Finds k nearest training examples and returns majority class',
      'Uses k different models and combines them',
      'Trains k separate neural networks',
      'Performs k iterations of gradient descent'
    ],
    correctAnswer: 'Finds k nearest training examples and returns majority class',
    explanation: 'k-Nearest Neighbors is a non-parametric method that classifies based on the k closest training examples in feature space, using majority vote for classification or mean for regression.'
  },
  {
    id: 'cs402-q35',
    type: 'multiple_choice',
    prompt: 'What assumption does Naive Bayes make?',
    options: [
      'Features are conditionally independent given the class',
      'Classes are equally likely',
      'Features are normally distributed',
      'The decision boundary is linear'
    ],
    correctAnswer: 'Features are conditionally independent given the class',
    explanation: 'Naive Bayes assumes P(x₁,...,xₙ|y) = ∏P(xᵢ|y), i.e., features are independent given class. This "naive" assumption simplifies computation and often works well despite being unrealistic.'
  },

  // Topic 3: Classification Algorithms - Quiz 3b: Application
  {
    id: 'cs402-q36',
    type: 'multiple_choice',
    prompt: 'Your decision tree is overfitting. What should you do?',
    options: [
      'Prune the tree or limit max depth',
      'Add more features',
      'Increase tree depth',
      'Use pure leaf nodes'
    ],
    correctAnswer: 'Prune the tree or limit max depth',
    explanation: 'Deep trees overfit by creating complex decision boundaries. Pruning (removing branches) or limiting depth (min_samples_split, max_depth) creates simpler trees that generalize better.'
  },
  {
    id: 'cs402-q37',
    type: 'multiple_choice',
    prompt: 'When would you choose Random Forest over a single decision tree?',
    options: [
      'When you want better generalization and lower variance',
      'When you need a simple, interpretable model',
      'When you have very little data',
      'When training time must be minimal'
    ],
    correctAnswer: 'When you want better generalization and lower variance',
    explanation: 'Random Forests reduce variance through ensemble averaging, leading to better generalization. The tradeoff is less interpretability and longer training time compared to a single tree.'
  },
  {
    id: 'cs402-q38',
    type: 'multiple_choice',
    prompt: 'Your data is not linearly separable. How can SVM handle this?',
    options: [
      'Use a kernel (e.g., RBF) to map data to higher dimensional space',
      'Increase the number of support vectors',
      'Decrease the margin',
      'Use more training data'
    ],
    correctAnswer: 'Use a kernel (e.g., RBF) to map data to higher dimensional space',
    explanation: 'The kernel trick allows SVM to implicitly map data to higher dimensions where it may be linearly separable, without explicitly computing the transformation. RBF (Gaussian) kernel is popular for non-linear problems.'
  },
  {
    id: 'cs402-q39',
    type: 'multiple_choice',
    prompt: 'What is a key disadvantage of k-NN?',
    options: [
      'Slow prediction time since it requires computing distances to all training points',
      'Cannot handle multi-class problems',
      'Requires extensive training',
      'Cannot handle continuous features'
    ],
    correctAnswer: 'Slow prediction time since it requires computing distances to all training points',
    explanation: 'k-NN has zero training time (lazy learning) but O(nm) prediction time where n is training set size. For large datasets, this becomes prohibitive. Solutions include KD-trees or approximate nearest neighbors.'
  },
  {
    id: 'cs402-q40',
    type: 'multiple_choice',
    prompt: 'When does Naive Bayes work well despite its independence assumption being violated?',
    options: [
      'When the violation doesn\'t strongly affect the rank ordering of class probabilities',
      'Never - the assumption must hold',
      'Only with binary features',
      'Only with small datasets'
    ],
    correctAnswer: 'When the violation doesn\'t strongly affect the rank ordering of class probabilities',
    explanation: 'Naive Bayes only needs correct rank ordering of P(y|x) for classification, not accurate probability estimates. It often works well even when features are correlated, especially for text classification.'
  },

  // Topic 3: Classification Algorithms - Quiz 3c: Mastery
  {
    id: 'cs402-q41',
    type: 'multiple_choice',
    prompt: 'What is the information gain formula?',
    options: [
      'IG(D,A) = H(D) - Σ(|Dᵥ|/|D|)H(Dᵥ) where H is entropy',
      'IG = 1 - Σpᵢ²',
      'IG = -Σpᵢ log pᵢ',
      'IG = max(0, margin)'
    ],
    correctAnswer: 'IG(D,A) = H(D) - Σ(|Dᵥ|/|D|)H(Dᵥ) where H is entropy',
    explanation: 'Information gain measures entropy reduction from splitting on attribute A. It\'s the parent entropy H(D) minus weighted average of children entropies. Higher IG means better split.'
  },
  {
    id: 'cs402-q42',
    type: 'multiple_choice',
    prompt: 'What is the primal optimization problem for hard-margin SVM?',
    options: [
      'min (1/2)||w||² subject to yᵢ(wᵀxᵢ + b) ≥ 1',
      'min Σ(yᵢ - wᵀxᵢ)²',
      'max Σαᵢ - (1/2)ΣΣαᵢαⱼyᵢyⱼxᵢᵀxⱼ',
      'min -log p(y|x)'
    ],
    correctAnswer: 'min (1/2)||w||² subject to yᵢ(wᵀxᵢ + b) ≥ 1',
    explanation: 'Hard-margin SVM minimizes ||w||² (maximizes margin 2/||w||) subject to correct classification with margin ≥1. This is a convex quadratic program solved via Lagrangian duality.'
  },
  {
    id: 'cs402-q43',
    type: 'multiple_choice',
    prompt: 'What is the dual formulation of SVM important?',
    options: [
      'It enables the kernel trick by expressing solution in terms of dot products xᵢᵀxⱼ',
      'It makes training faster',
      'It improves accuracy',
      'It reduces memory usage'
    ],
    correctAnswer: 'It enables the kernel trick by expressing solution in terms of dot products xᵢᵀxⱼ',
    explanation: 'The dual formulation max Σαᵢ - (1/2)ΣΣαᵢαⱼyᵢyⱼxᵢᵀxⱼ depends only on dot products. Replacing xᵢᵀxⱼ with k(xᵢ,xⱼ) enables implicit feature mapping without computing φ(x).'
  },
  {
    id: 'cs402-q44',
    type: 'multiple_choice',
    prompt: 'What is the out-of-bag (OOB) error in Random Forests?',
    options: [
      'Validation error estimated using samples not in each tree\'s bootstrap sample',
      'Test error on held-out data',
      'Training error on all data',
      'Error from trees that didn\'t converge'
    ],
    correctAnswer: 'Validation error estimated using samples not in each tree\'s bootstrap sample',
    explanation: 'Since each tree uses ~63% of data (bootstrap), the remaining ~37% provide validation. OOB error averages predictions on these out-of-bag samples, providing unbiased error estimate without separate validation set.'
  },
  {
    id: 'cs402-q45',
    type: 'multiple_choice',
    prompt: 'How does AdaBoost adjust weights?',
    options: [
      'Increases weight on misclassified examples so subsequent models focus on hard cases',
      'Decreases weight on all examples equally',
      'Randomly adjusts weights',
      'Uses gradient descent'
    ],
    correctAnswer: 'Increases weight on misclassified examples so subsequent models focus on hard cases',
    explanation: 'AdaBoost updates weights as wᵢ *= exp(α) for misclassified examples, where α depends on classifier error. This forces the next weak learner to focus on previously misclassified examples.'
  },

  // Topic 4: Neural Networks - Quiz 4a: Fundamentals
  {
    id: 'cs402-q46',
    type: 'multiple_choice',
    prompt: 'What is a perceptron?',
    options: [
      'A binary linear classifier: output = sign(wᵀx + b)',
      'A multi-layer neural network',
      'A kernel method',
      'A decision tree variant'
    ],
    correctAnswer: 'A binary linear classifier: output = sign(wᵀx + b)',
    explanation: 'The perceptron is the simplest neural unit, computing a weighted sum and applying a threshold/sign function. It can only learn linearly separable functions.'
  },
  {
    id: 'cs402-q47',
    type: 'multiple_choice',
    prompt: 'Why do neural networks need non-linear activation functions?',
    options: [
      'Without them, multiple layers collapse to a single linear transformation',
      'To speed up training',
      'To prevent overfitting',
      'To handle missing data'
    ],
    correctAnswer: 'Without them, multiple layers collapse to a single linear transformation',
    explanation: 'Composing linear transformations yields another linear transformation: f(Wx + b) = Wx + b without non-linearity. Activation functions enable learning complex non-linear functions.'
  },
  {
    id: 'cs402-q48',
    type: 'multiple_choice',
    prompt: 'What is the most commonly used activation function in modern deep learning?',
    options: [
      'ReLU (Rectified Linear Unit)',
      'Sigmoid',
      'Tanh',
      'Step function'
    ],
    correctAnswer: 'ReLU (Rectified Linear Unit)',
    explanation: 'ReLU(x) = max(0,x) is popular because it\'s computationally efficient, doesn\'t saturate for positive values, and enables sparse activations. It largely replaced sigmoid/tanh in hidden layers.'
  },
  {
    id: 'cs402-q49',
    type: 'multiple_choice',
    prompt: 'What algorithm is used to train neural networks?',
    options: [
      'Backpropagation with gradient descent',
      'Decision tree induction',
      'K-means clustering',
      'Genetic algorithms'
    ],
    correctAnswer: 'Backpropagation with gradient descent',
    explanation: 'Backpropagation efficiently computes gradients by applying the chain rule backward through the network. These gradients are used with gradient descent (or variants) to update weights.'
  },
  {
    id: 'cs402-q50',
    type: 'multiple_choice',
    prompt: 'What problem can occur with sigmoid/tanh activations in deep networks?',
    options: [
      'Vanishing gradients',
      'Exploding gradients',
      'Too fast convergence',
      'Memory overflow'
    ],
    correctAnswer: 'Vanishing gradients',
    explanation: 'Sigmoid and tanh have small derivatives (<0.25) near their saturation regions. When multiplied across many layers during backprop, gradients exponentially decay, preventing learning in early layers.'
  },

  // Topic 4: Neural Networks - Quiz 4b: Application
  {
    id: 'cs402-q51',
    type: 'multiple_choice',
    prompt: 'Your neural network isn\'t learning. What should you check first?',
    options: [
      'Learning rate and weight initialization',
      'Number of layers',
      'Activation functions',
      'Dataset size'
    ],
    correctAnswer: 'Learning rate and weight initialization',
    explanation: 'Learning rate too high causes divergence, too low means no progress. Poor initialization can cause dead neurons or gradient issues. These are the most common culprits for failed training.'
  },
  {
    id: 'cs402-q52',
    type: 'multiple_choice',
    prompt: 'What is dropout?',
    options: [
      'Randomly deactivating neurons during training to prevent co-adaptation',
      'Removing layers from the network',
      'Stopping training early',
      'Removing features from input'
    ],
    correctAnswer: 'Randomly deactivating neurons during training to prevent co-adaptation',
    explanation: 'Dropout randomly sets neuron outputs to 0 with probability p during training, forcing the network to learn redundant representations. At test time, all neurons are active but scaled by (1-p).'
  },
  {
    id: 'cs402-q53',
    type: 'multiple_choice',
    prompt: 'When should you use batch normalization?',
    options: [
      'To stabilize training by normalizing layer inputs and enable higher learning rates',
      'To reduce model size',
      'To speed up inference',
      'To handle imbalanced classes'
    ],
    correctAnswer: 'To stabilize training by normalizing layer inputs and enable higher learning rates',
    explanation: 'Batch normalization normalizes layer inputs to have mean 0 and variance 1 per mini-batch, reducing internal covariate shift. This stabilizes training and allows higher learning rates.'
  },
  {
    id: 'cs402-q54',
    type: 'multiple_choice',
    prompt: 'How many hidden units should you use?',
    options: [
      'Start with a reasonable size and tune via validation performance',
      'Always use 100 hidden units',
      'Use exactly as many as input features',
      'Use as many as possible'
    ],
    correctAnswer: 'Start with a reasonable size and tune via validation performance',
    explanation: 'There\'s no universal rule. Start with a moderate size (e.g., similar to input dimension), then increase if underfitting or decrease/regularize if overfitting, guided by validation error.'
  },
  {
    id: 'cs402-q55',
    type: 'multiple_choice',
    prompt: 'What is the advantage of using Adam optimizer over SGD?',
    options: [
      'Adapts learning rate per parameter using momentum and RMSprop',
      'Guaranteed to find global minimum',
      'Requires no hyperparameters',
      'Always faster than SGD'
    ],
    correctAnswer: 'Adapts learning rate per parameter using momentum and RMSprop',
    explanation: 'Adam combines momentum (exponential moving average of gradients) and RMSprop (adaptive learning rates). This often works well out-of-the-box with default hyperparameters β₁=0.9, β₂=0.999, α=0.001.'
  },

  // Topic 4: Neural Networks - Quiz 4c: Mastery
  {
    id: 'cs402-q56',
    type: 'multiple_choice',
    prompt: 'What is the universal approximation theorem?',
    options: [
      'A neural network with one hidden layer can approximate any continuous function',
      'Neural networks can learn any function',
      'Deep networks are always better than shallow ones',
      'Backpropagation always finds the global minimum'
    ],
    correctAnswer: 'A neural network with one hidden layer can approximate any continuous function',
    explanation: 'The UAT states a 2-layer network with enough hidden units can approximate any continuous function on a compact domain arbitrarily well. However, depth can make learning much more efficient.'
  },
  {
    id: 'cs402-q57',
    type: 'multiple_choice',
    prompt: 'What is the backpropagation chain rule for a neuron?',
    options: [
      '∂L/∂wᵢⱼ = ∂L/∂zⱼ · ∂zⱼ/∂wᵢⱼ = δⱼ · aᵢ',
      '∂L/∂wᵢⱼ = zⱼ - yⱼ',
      '∂L/∂wᵢⱼ = Σwᵢⱼ²',
      '∂L/∂wᵢⱼ = log(aⱼ)'
    ],
    correctAnswer: '∂L/∂wᵢⱼ = ∂L/∂zⱼ · ∂zⱼ/∂wᵢⱼ = δⱼ · aᵢ',
    explanation: 'Backprop applies chain rule: gradient w.r.t. weight wᵢⱼ is the error term δⱼ = ∂L/∂zⱼ times the input activation aᵢ. Error terms propagate backward via δⱼ = (Σwⱼₖδₖ)·f\'(zⱼ).'
  },
  {
    id: 'cs402-q58',
    type: 'multiple_choice',
    prompt: 'Why is Xavier/Glorot initialization important?',
    options: [
      'Keeps variance of activations and gradients consistent across layers',
      'Ensures all weights start at zero',
      'Makes all neurons identical',
      'Speeds up convergence to global minimum'
    ],
    correctAnswer: 'Keeps variance of activations and gradients consistent across layers',
    explanation: 'Xavier initialization sets weights from N(0, 1/n_in) or U(-√(6/(n_in+n_out)), √(6/(n_in+n_out))). This maintains activation variance through layers, preventing vanishing/exploding activations.'
  },
  {
    id: 'cs402-q59',
    type: 'multiple_choice',
    prompt: 'What is the gradient of ReLU?',
    options: [
      '∂ReLU(z)/∂z = 1 if z>0, else 0 (undefined at 0)',
      '∂ReLU(z)/∂z = z',
      '∂ReLU(z)/∂z = 1/(1+e^(-z))',
      '∂ReLU(z)/∂z = 1-tanh²(z)'
    ],
    correctAnswer: '∂ReLU(z)/∂z = 1 if z>0, else 0 (undefined at 0)',
    explanation: 'ReLU gradient is simple: 1 for positive inputs (allows gradient flow) and 0 for negative (blocks gradient). This simplicity and lack of saturation for positive values helps deep networks train.'
  },
  {
    id: 'cs402-q60',
    type: 'multiple_choice',
    prompt: 'What is the dying ReLU problem?',
    options: [
      'Neurons can get stuck outputting 0 for all inputs due to large negative bias',
      'ReLU causes overfitting',
      'ReLU is too slow to compute',
      'ReLU requires too much memory'
    ],
    correctAnswer: 'Neurons can get stuck outputting 0 for all inputs due to large negative bias',
    explanation: 'A neuron with large negative weighted sum will output 0, receive gradient 0, and never recover. This "dies" the neuron. Leaky ReLU (small negative slope) prevents this by allowing small gradient for negative inputs.'
  },

  // Topic 5: Deep Learning - Quiz 5a: Fundamentals
  {
    id: 'cs402-q61',
    type: 'multiple_choice',
    prompt: 'What is a Convolutional Neural Network (CNN) primarily designed for?',
    options: [
      'Processing grid-like data such as images',
      'Processing sequential data like text',
      'Processing tabular data',
      'Processing graph-structured data'
    ],
    correctAnswer: 'Processing grid-like data such as images',
    explanation: 'CNNs use convolutional layers with local connectivity and weight sharing, making them ideal for grid-like data (images, videos) where spatial relationships matter.'
  },
  {
    id: 'cs402-q62',
    type: 'multiple_choice',
    prompt: 'What does a convolutional layer learn?',
    options: [
      'Filters (kernels) that detect local patterns in the input',
      'Global statistics of the entire image',
      'Individual pixel values',
      'Image metadata'
    ],
    correctAnswer: 'Filters (kernels) that detect local patterns in the input',
    explanation: 'Each filter in a convolutional layer learns to detect specific local patterns (edges, textures, shapes). Early layers detect simple patterns, deeper layers detect complex patterns.'
  },
  {
    id: 'cs402-q63',
    type: 'multiple_choice',
    prompt: 'What is the purpose of pooling layers in CNNs?',
    options: [
      'Reduce spatial dimensions while retaining important features',
      'Increase model capacity',
      'Add non-linearity',
      'Normalize activations'
    ],
    correctAnswer: 'Reduce spatial dimensions while retaining important features',
    explanation: 'Pooling layers downsample feature maps, reducing computation and providing some translation invariance. Max pooling and average pooling are common strategies.'
  },
  {
    id: 'cs402-q64',
    type: 'multiple_choice',
    prompt: 'What architectural pattern do ResNet and other modern CNNs use to train very deep networks?',
    options: [
      'Skip/residual connections that bypass layers',
      'Larger learning rates',
      'Smaller batch sizes',
      'Removing batch normalization'
    ],
    correctAnswer: 'Skip/residual connections that bypass layers',
    explanation: 'Residual connections (skip connections) allow gradients to flow directly through the network, solving the degradation problem and enabling training of networks with 100+ layers.'
  },
  {
    id: 'cs402-q65',
    type: 'multiple_choice',
    prompt: 'What is transfer learning in the context of CNNs?',
    options: [
      'Using a pre-trained model and fine-tuning it for a new task',
      'Transferring data between training and test sets',
      'Converting between different model architectures',
      'Transferring weights randomly'
    ],
    correctAnswer: 'Using a pre-trained model and fine-tuning it for a new task',
    explanation: 'Transfer learning leverages models pre-trained on large datasets (e.g., ImageNet) and fine-tunes them for specific tasks, dramatically reducing training time and data requirements.'
  },

  // Topic 5: Deep Learning - Quiz 5b: Application
  {
    id: 'cs402-q66',
    type: 'multiple_choice',
    prompt: 'What is a Recurrent Neural Network (RNN) best suited for?',
    options: [
      'Sequential data with temporal dependencies',
      'Static images',
      'Tabular data',
      'Graph-structured data'
    ],
    correctAnswer: 'Sequential data with temporal dependencies',
    explanation: 'RNNs have recurrent connections that maintain hidden state across time steps, making them ideal for sequences like text, speech, and time series where order matters.'
  },
  {
    id: 'cs402-q67',
    type: 'multiple_choice',
    prompt: 'What problem do LSTM and GRU architectures solve?',
    options: [
      'Vanishing gradients in long sequences',
      'Overfitting',
      'Slow training speed',
      'High memory usage'
    ],
    correctAnswer: 'Vanishing gradients in long sequences',
    explanation: 'LSTMs and GRUs use gating mechanisms to control information flow, allowing them to maintain long-term dependencies without suffering from vanishing gradients like vanilla RNNs.'
  },
  {
    id: 'cs402-q68',
    type: 'multiple_choice',
    prompt: 'What are the three gates in an LSTM cell?',
    options: [
      'Forget gate, input gate, output gate',
      'Read gate, write gate, erase gate',
      'Entry gate, exit gate, memory gate',
      'Start gate, middle gate, end gate'
    ],
    correctAnswer: 'Forget gate, input gate, output gate',
    explanation: 'LSTM cells use forget gate (what to remove from cell state), input gate (what new information to add), and output gate (what to output based on cell state).'
  },
  {
    id: 'cs402-q69',
    type: 'multiple_choice',
    prompt: 'What key innovation do Transformers use instead of recurrence?',
    options: [
      'Self-attention mechanism',
      'Larger batch sizes',
      'More layers',
      'Different activation functions'
    ],
    correctAnswer: 'Self-attention mechanism',
    explanation: 'Transformers use self-attention to compute relationships between all positions in parallel, eliminating sequential dependencies and enabling much better parallelization than RNNs.'
  },
  {
    id: 'cs402-q70',
    type: 'multiple_choice',
    prompt: 'Why are Transformers more efficient to train than RNNs?',
    options: [
      'They process all sequence positions in parallel rather than sequentially',
      'They have fewer parameters',
      'They use simpler operations',
      'They require less memory'
    ],
    correctAnswer: 'They process all sequence positions in parallel rather than sequentially',
    explanation: 'Unlike RNNs that process sequences step-by-step, Transformers compute attention over all positions simultaneously, fully utilizing parallel computing hardware like GPUs.'
  },

  // Topic 5: Deep Learning - Quiz 5c: Mastery
  {
    id: 'cs402-q71',
    type: 'multiple_choice',
    prompt: 'What is the formula for scaled dot-product attention in Transformers?',
    options: [
      'Attention(Q,K,V) = softmax(QK^T/√d_k)V',
      'Attention(Q,K,V) = QKV',
      'Attention(Q,K,V) = softmax(Q+K)V',
      'Attention(Q,K,V) = sigmoid(QK^T)V'
    ],
    correctAnswer: 'Attention(Q,K,V) = softmax(QK^T/√d_k)V',
    explanation: 'Scaled dot-product attention computes similarity between queries and keys (QK^T), scales by √d_k for stability, applies softmax, and uses the result to weight values V.'
  },
  {
    id: 'cs402-q72',
    type: 'multiple_choice',
    prompt: 'What does the positional encoding in Transformers provide?',
    options: [
      'Information about the position of tokens in the sequence',
      'Better gradient flow',
      'Faster training',
      'Regularization'
    ],
    correctAnswer: 'Information about the position of tokens in the sequence',
    explanation: 'Since Transformers have no inherent notion of sequence order, positional encodings (often sinusoidal) are added to embeddings to inject positional information.'
  },
  {
    id: 'cs402-q73',
    type: 'multiple_choice',
    prompt: 'What training strategy involves pre-training on unlabeled data then fine-tuning on labeled data?',
    options: [
      'Transfer learning / Pre-training and fine-tuning',
      'Supervised learning',
      'Reinforcement learning',
      'Active learning'
    ],
    correctAnswer: 'Transfer learning / Pre-training and fine-tuning',
    explanation: 'Modern NLP models like BERT and GPT use pre-training on large unlabeled corpora (self-supervised) followed by fine-tuning on specific tasks with smaller labeled datasets.'
  },
  {
    id: 'cs402-q74',
    type: 'multiple_choice',
    prompt: 'What is the main difference between BERT and GPT architectures?',
    options: [
      'BERT is bidirectional (encoder), GPT is unidirectional (decoder)',
      'BERT uses RNNs, GPT uses Transformers',
      'BERT is smaller than GPT',
      'BERT is faster than GPT'
    ],
    correctAnswer: 'BERT is bidirectional (encoder), GPT is unidirectional (decoder)',
    explanation: 'BERT uses the Transformer encoder with bidirectional context (masked language modeling), while GPT uses the decoder with causal (left-to-right) attention for autoregressive generation.'
  },
  {
    id: 'cs402-q75',
    type: 'multiple_choice',
    prompt: 'What technique allows models like GPT-3 to perform tasks with few examples?',
    options: [
      'In-context learning / few-shot learning',
      'Transfer learning',
      'Meta-learning',
      'Curriculum learning'
    ],
    correctAnswer: 'In-context learning / few-shot learning',
    explanation: 'Large language models can perform new tasks by providing examples in the prompt (in-context learning), without updating weights, demonstrating emergent few-shot learning capabilities.'
  },

  // Topic 6: Unsupervised Learning - Quiz 6a: Fundamentals
  {
    id: 'cs402-q76',
    type: 'multiple_choice',
    prompt: 'What is the goal of K-means clustering?',
    options: [
      'Partition data into K clusters minimizing within-cluster variance',
      'Find K nearest neighbors',
      'Reduce dimensionality to K dimensions',
      'Select K best features'
    ],
    correctAnswer: 'Partition data into K clusters minimizing within-cluster variance',
    explanation: 'K-means aims to minimize the sum of squared distances between points and their assigned cluster centroids, creating K compact clusters.'
  },
  {
    id: 'cs402-q77',
    type: 'multiple_choice',
    prompt: 'How does the K-means algorithm work?',
    options: [
      'Alternates between assigning points to nearest centroids and updating centroids',
      'Builds a tree of clusters',
      'Uses density-based connectivity',
      'Applies principal component analysis'
    ],
    correctAnswer: 'Alternates between assigning points to nearest centroids and updating centroids',
    explanation: 'K-means iteratively: (1) assigns each point to the nearest centroid, (2) recomputes centroids as cluster means. This process repeats until convergence.'
  },
  {
    id: 'cs402-q78',
    type: 'multiple_choice',
    prompt: 'What is a major limitation of K-means?',
    options: [
      'Requires specifying K beforehand and sensitive to initialization',
      'Cannot handle large datasets',
      'Only works with binary features',
      'Requires labeled data'
    ],
    correctAnswer: 'Requires specifying K beforehand and sensitive to initialization',
    explanation: 'K-means requires knowing K in advance and can converge to poor local minima depending on initialization. K-means++ initialization helps, but the algorithm remains sensitive to initial centroids.'
  },
  {
    id: 'cs402-q79',
    type: 'multiple_choice',
    prompt: 'What does hierarchical clustering produce?',
    options: [
      'A dendrogram showing nested cluster relationships',
      'A single flat partition',
      'K fixed clusters',
      'A probability distribution over clusters'
    ],
    correctAnswer: 'A dendrogram showing nested cluster relationships',
    explanation: 'Hierarchical clustering creates a tree structure (dendrogram) showing how clusters merge (agglomerative) or split (divisive), allowing different granularities of clustering.'
  },
  {
    id: 'cs402-q80',
    type: 'multiple_choice',
    prompt: 'What does DBSCAN use to define clusters?',
    options: [
      'Density: regions with sufficient nearby points',
      'Distance to centroids',
      'Hierarchical merging',
      'Gaussian distributions'
    ],
    correctAnswer: 'Density: regions with sufficient nearby points',
    explanation: 'DBSCAN defines clusters as dense regions (points with many neighbors within radius ε) separated by sparse regions. It can find arbitrary-shaped clusters and identify outliers.'
  },

  // Topic 6: Unsupervised Learning - Quiz 6b: Application
  {
    id: 'cs402-q81',
    type: 'multiple_choice',
    prompt: 'How can you choose the optimal number of clusters K?',
    options: [
      'Use the elbow method or silhouette analysis on validation data',
      'Always use K=3',
      'Use the number of features',
      'Use the square root of data size'
    ],
    correctAnswer: 'Use the elbow method or silhouette analysis on validation data',
    explanation: 'The elbow method plots within-cluster sum of squares vs K (look for the "elbow"). Silhouette analysis measures how well points fit their clusters. Both help select K.'
  },
  {
    id: 'cs402-q82',
    type: 'multiple_choice',
    prompt: 'What is Principal Component Analysis (PCA) used for?',
    options: [
      'Dimensionality reduction while preserving maximum variance',
      'Clustering',
      'Classification',
      'Feature selection'
    ],
    correctAnswer: 'Dimensionality reduction while preserving maximum variance',
    explanation: 'PCA finds orthogonal directions (principal components) of maximum variance in the data, enabling projection to lower dimensions while retaining most information.'
  },
  {
    id: 'cs402-q83',
    type: 'multiple_choice',
    prompt: 'What are the steps of PCA?',
    options: [
      'Center data, compute covariance, find eigenvectors, project',
      'Compute distances, cluster, reduce',
      'Normalize, classify, validate',
      'Sample, train, test'
    ],
    correctAnswer: 'Center data, compute covariance, find eigenvectors, project',
    explanation: 'PCA: (1) center data (subtract mean), (2) compute covariance matrix, (3) find eigenvectors/eigenvalues, (4) project onto top k eigenvectors. Eigenvectors with largest eigenvalues are principal components.'
  },
  {
    id: 'cs402-q84',
    type: 'multiple_choice',
    prompt: 'When would DBSCAN be preferred over K-means?',
    options: [
      'When clusters have arbitrary shapes or there are outliers',
      'When K is known',
      'When clusters are spherical',
      'When speed is critical'
    ],
    correctAnswer: 'When clusters have arbitrary shapes or there are outliers',
    explanation: 'DBSCAN handles non-spherical clusters and automatically identifies outliers as noise. K-means assumes spherical clusters and is sensitive to outliers.'
  },
  {
    id: 'cs402-q85',
    type: 'multiple_choice',
    prompt: 'What are the two key parameters of DBSCAN?',
    options: [
      'ε (radius) and MinPts (minimum points for core)',
      'K (clusters) and iterations',
      'Learning rate and momentum',
      'Depth and width'
    ],
    correctAnswer: 'ε (radius) and MinPts (minimum points for core)',
    explanation: 'DBSCAN requires ε (neighborhood radius) and MinPts (minimum points to form a dense region). Points with ≥MinPts neighbors within ε are core points that form clusters.'
  },

  // Topic 6: Unsupervised Learning - Quiz 6c: Mastery
  {
    id: 'cs402-q86',
    type: 'multiple_choice',
    prompt: 'What is the K-means objective function?',
    options: [
      'J = Σᵢ Σₓ∈Cᵢ ||x - μᵢ||² (minimize within-cluster sum of squares)',
      'J = Σᵢ ||μᵢ||² (minimize centroid norms)',
      'J = Σᵢ Σⱼ ||μᵢ - μⱼ||² (maximize between-cluster distance)',
      'J = log Σᵢ |Cᵢ| (balance cluster sizes)'
    ],
    correctAnswer: 'J = Σᵢ Σₓ∈Cᵢ ||x - μᵢ||² (minimize within-cluster sum of squares)',
    explanation: 'K-means minimizes WCSS (within-cluster sum of squares), the sum of squared distances from each point to its cluster centroid. This is equivalent to maximizing cluster compactness.'
  },
  {
    id: 'cs402-q87',
    type: 'multiple_choice',
    prompt: 'What does the explained variance ratio tell you in PCA?',
    options: [
      'The proportion of total variance captured by each principal component',
      'The number of clusters',
      'The classification accuracy',
      'The outlier score'
    ],
    correctAnswer: 'The proportion of total variance captured by each principal component',
    explanation: 'Explained variance ratio = λᵢ/Σλⱼ where λᵢ is the eigenvalue of component i. It shows how much information each component retains, helping choose the number of components.'
  },
  {
    id: 'cs402-q88',
    type: 'multiple_choice',
    prompt: 'How does t-SNE differ from PCA for visualization?',
    options: [
      't-SNE preserves local structure (neighborhoods), PCA preserves global variance',
      't-SNE is faster than PCA',
      't-SNE is linear, PCA is non-linear',
      't-SNE requires labels, PCA does not'
    ],
    correctAnswer: 't-SNE preserves local structure (neighborhoods), PCA preserves global variance',
    explanation: 't-SNE uses probabilistic neighborhoods to preserve local relationships, making it better for visualization. PCA is linear and preserves global variance structure. t-SNE is slower and non-deterministic.'
  },
  {
    id: 'cs402-q89',
    type: 'multiple_choice',
    prompt: 'What is the Gaussian Mixture Model (GMM) approach to clustering?',
    options: [
      'Assumes data comes from K Gaussian distributions and uses EM to find parameters',
      'Uses K-means with Gaussian kernels',
      'Applies Gaussian noise to data',
      'Normalizes data to Gaussian distribution'
    ],
    correctAnswer: 'Assumes data comes from K Gaussian distributions and uses EM to find parameters',
    explanation: 'GMM models data as mixture of K Gaussians. The EM algorithm iteratively: E-step computes probability of each point belonging to each cluster; M-step updates means, covariances, and mixture weights.'
  },
  {
    id: 'cs402-q90',
    type: 'multiple_choice',
    prompt: 'What is an autoencoder?',
    options: [
      'A neural network that learns to compress and reconstruct data',
      'A clustering algorithm',
      'A classification model',
      'A data augmentation technique'
    ],
    correctAnswer: 'A neural network that learns to compress and reconstruct data',
    explanation: 'Autoencoders have encoder (compresses input to latent representation) and decoder (reconstructs from latent). They learn useful representations in an unsupervised manner by minimizing reconstruction error.'
  },

  // Topic 7: Model Evaluation - Quiz 7a: Fundamentals
  {
    id: 'cs402-q91',
    type: 'multiple_choice',
    prompt: 'Why do we split data into training and test sets?',
    options: [
      'To evaluate model generalization on unseen data',
      'To speed up training',
      'To increase accuracy',
      'To reduce overfitting during training'
    ],
    correctAnswer: 'To evaluate model generalization on unseen data',
    explanation: 'The test set provides an unbiased estimate of model performance on new data. Training accuracy can be misleading due to overfitting; test accuracy measures true generalization.'
  },
  {
    id: 'cs402-q92',
    type: 'multiple_choice',
    prompt: 'What is the typical train/test split ratio?',
    options: [
      '70-80% training, 20-30% test',
      '50% training, 50% test',
      '90% training, 10% test',
      '30% training, 70% test'
    ],
    correctAnswer: '70-80% training, 20-30% test',
    explanation: 'Common splits are 70/30 or 80/20 (train/test). This balances having enough training data for learning with enough test data for reliable evaluation. Very large datasets might use 90/10.'
  },
  {
    id: 'cs402-q93',
    type: 'multiple_choice',
    prompt: 'What is k-fold cross-validation?',
    options: [
      'Split data into k folds, train on k-1 folds, test on 1, repeat k times',
      'Train k different models',
      'Use k different datasets',
      'Split features into k groups'
    ],
    correctAnswer: 'Split data into k folds, train on k-1 folds, test on 1, repeat k times',
    explanation: 'k-fold CV divides data into k equal parts. Each fold serves as test set once while others are training. Final metric is averaged over k runs, providing robust performance estimate.'
  },
  {
    id: 'cs402-q94',
    type: 'multiple_choice',
    prompt: 'What is leave-one-out cross-validation (LOOCV)?',
    options: [
      'k-fold CV where k equals the number of data points',
      'Removing one feature at a time',
      'Removing one class at a time',
      'Testing one model at a time'
    ],
    correctAnswer: 'k-fold CV where k equals the number of data points',
    explanation: 'LOOCV is k-fold CV with k=n (dataset size). Each point is the test set once. It\'s unbiased but computationally expensive for large datasets.'
  },
  {
    id: 'cs402-q95',
    type: 'multiple_choice',
    prompt: 'What is a confusion matrix?',
    options: [
      'A table showing true vs predicted classes for evaluating classification',
      'A matrix of correlated features',
      'A visualization of model architecture',
      'A plot of training loss'
    ],
    correctAnswer: 'A table showing true vs predicted classes for evaluating classification',
    explanation: 'A confusion matrix has true labels as rows and predicted labels as columns (or vice versa). Diagonal elements are correct predictions; off-diagonal are errors. It shows which classes are confused.'
  },

  // Topic 7: Model Evaluation - Quiz 7b: Application
  {
    id: 'cs402-q96',
    type: 'multiple_choice',
    prompt: 'For a binary classifier, what is precision?',
    options: [
      'TP / (TP + FP) - fraction of positive predictions that are correct',
      'TP / (TP + FN) - fraction of actual positives found',
      '(TP + TN) / Total - overall accuracy',
      'TN / (TN + FP) - fraction of actual negatives found'
    ],
    correctAnswer: 'TP / (TP + FP) - fraction of positive predictions that are correct',
    explanation: 'Precision = TP/(TP+FP) measures "when the model predicts positive, how often is it correct?" High precision means few false positives.'
  },
  {
    id: 'cs402-q97',
    type: 'multiple_choice',
    prompt: 'What is recall (sensitivity)?',
    options: [
      'TP / (TP + FN) - fraction of actual positives correctly identified',
      'TP / (TP + FP) - fraction of positive predictions that are correct',
      'TN / (TN + FP) - fraction of actual negatives found',
      '(TP + TN) / Total - overall accuracy'
    ],
    correctAnswer: 'TP / (TP + FN) - fraction of actual positives correctly identified',
    explanation: 'Recall = TP/(TP+FN) measures "of all actual positive cases, how many did we find?" High recall means few false negatives. Also called sensitivity or true positive rate.'
  },
  {
    id: 'cs402-q98',
    type: 'multiple_choice',
    prompt: 'What does the F1 score balance?',
    options: [
      'Precision and recall (harmonic mean)',
      'Accuracy and speed',
      'Bias and variance',
      'Training and test error'
    ],
    correctAnswer: 'Precision and recall (harmonic mean)',
    explanation: 'F1 = 2×(precision×recall)/(precision+recall) is the harmonic mean of precision and recall. It provides a single metric balancing both, useful when classes are imbalanced.'
  },
  {
    id: 'cs402-q99',
    type: 'multiple_choice',
    prompt: 'When is high recall more important than high precision?',
    options: [
      'When false negatives are costly (e.g., disease detection)',
      'When false positives are costly (e.g., spam detection)',
      'When classes are balanced',
      'When training time is limited'
    ],
    correctAnswer: 'When false negatives are costly (e.g., disease detection)',
    explanation: 'Prioritize recall when missing positive cases is dangerous (medical diagnosis, fraud detection). Prioritize precision when false alarms are costly (spam filters, recommendation systems).'
  },
  {
    id: 'cs402-q100',
    type: 'multiple_choice',
    prompt: 'What metric should you use for imbalanced classification problems?',
    options: [
      'Precision, recall, F1, or AUC-ROC rather than accuracy',
      'Accuracy is always best',
      'Mean squared error',
      'R² score'
    ],
    correctAnswer: 'Precision, recall, F1, or AUC-ROC rather than accuracy',
    explanation: 'With imbalanced classes (e.g., 95% negative), a model predicting all negative achieves 95% accuracy but is useless. Precision/recall/F1/AUC better capture performance on minority class.'
  },

  // Topic 7: Model Evaluation - Quiz 7c: Mastery
  {
    id: 'cs402-q101',
    type: 'multiple_choice',
    prompt: 'What does the ROC curve plot?',
    options: [
      'True Positive Rate vs False Positive Rate at various thresholds',
      'Precision vs Recall',
      'Accuracy vs Threshold',
      'Loss vs Epochs'
    ],
    correctAnswer: 'True Positive Rate vs False Positive Rate at various thresholds',
    explanation: 'ROC curve plots TPR (recall) on y-axis vs FPR (1-specificity) on x-axis as classification threshold varies. It shows the tradeoff between true and false positives.'
  },
  {
    id: 'cs402-q102',
    type: 'multiple_choice',
    prompt: 'What does AUC (Area Under the ROC Curve) represent?',
    options: [
      'Probability that the model ranks a random positive higher than a random negative',
      'Overall accuracy',
      'Average precision',
      'Training time'
    ],
    correctAnswer: 'Probability that the model ranks a random positive higher than a random negative',
    explanation: 'AUC ranges from 0 to 1 (0.5 = random, 1 = perfect). It measures ranking quality: probability that a randomly chosen positive example scores higher than a randomly chosen negative.'
  },
  {
    id: 'cs402-q103',
    type: 'multiple_choice',
    prompt: 'What is the precision-recall curve useful for?',
    options: [
      'Evaluating performance on imbalanced datasets',
      'Tuning learning rate',
      'Selecting features',
      'Choosing network architecture'
    ],
    correctAnswer: 'Evaluating performance on imbalanced datasets',
    explanation: 'PR curves show precision vs recall tradeoff. They\'re more informative than ROC curves for imbalanced datasets because they focus on the positive class performance.'
  },
  {
    id: 'cs402-q104',
    type: 'multiple_choice',
    prompt: 'What is grid search for hyperparameter tuning?',
    options: [
      'Exhaustively trying all combinations of hyperparameter values',
      'Randomly sampling hyperparameters',
      'Using gradient descent on hyperparameters',
      'Manually adjusting one hyperparameter at a time'
    ],
    correctAnswer: 'Exhaustively trying all combinations of hyperparameter values',
    explanation: 'Grid search defines a grid of hyperparameter values and evaluates all combinations via cross-validation. It\'s thorough but expensive. Random search samples randomly and is often more efficient.'
  },
  {
    id: 'cs402-q105',
    type: 'multiple_choice',
    prompt: 'What is the bootstrap method in model evaluation?',
    options: [
      'Resampling with replacement to estimate sampling distribution of a statistic',
      'A weight initialization technique',
      'A data augmentation method',
      'A neural network architecture'
    ],
    correctAnswer: 'Resampling with replacement to estimate sampling distribution of a statistic',
    explanation: 'Bootstrap creates multiple datasets by sampling with replacement, trains models on each, and computes statistics (e.g., confidence intervals). It estimates variability without assumptions about data distribution.'
  },
];

export const cs402Quizzes: Quiz[] = [
  // Topic 1: Machine Learning Overview (3 quizzes)
  {
    id: 'cs402-quiz-1-1',
    subjectId: 'cs402',
    topicId: 'cs402-topic-1',
    title: 'ML Fundamentals',
    questions: questions.slice(0, 5)
  },
  {
    id: 'cs402-quiz-1-2',
    subjectId: 'cs402',
    topicId: 'cs402-topic-1',
    title: 'ML Workflow & Data Preparation',
    questions: questions.slice(5, 10)
  },
  {
    id: 'cs402-quiz-1-3',
    subjectId: 'cs402',
    topicId: 'cs402-topic-1',
    title: 'Learning Theory',
    questions: questions.slice(10, 15)
  },

  // Topic 2: Linear and Logistic Regression (3 quizzes)
  {
    id: 'cs402-quiz-2-1',
    subjectId: 'cs402',
    topicId: 'cs402-topic-2',
    title: 'Regression Fundamentals',
    questions: questions.slice(15, 20)
  },
  {
    id: 'cs402-quiz-2-2',
    subjectId: 'cs402',
    topicId: 'cs402-topic-2',
    title: 'Gradient Descent & Regularization',
    questions: questions.slice(20, 25)
  },
  {
    id: 'cs402-quiz-2-3',
    subjectId: 'cs402',
    topicId: 'cs402-topic-2',
    title: 'Advanced Regression Theory',
    questions: questions.slice(25, 30)
  },

  // Topic 3: Tree-Based and Traditional Models (3 quizzes)
  {
    id: 'cs402-quiz-3-1',
    subjectId: 'cs402',
    topicId: 'cs402-topic-3',
    title: 'Decision Trees & Ensembles',
    questions: questions.slice(30, 35)
  },
  {
    id: 'cs402-quiz-3-2',
    subjectId: 'cs402',
    topicId: 'cs402-topic-3',
    title: 'SVM, KNN & Naive Bayes',
    questions: questions.slice(35, 40)
  },
  {
    id: 'cs402-quiz-3-3',
    subjectId: 'cs402',
    topicId: 'cs402-topic-3',
    title: 'Advanced Classification Theory',
    questions: questions.slice(40, 45)
  },

  // Topic 4: Neural Networks (3 quizzes)
  {
    id: 'cs402-quiz-4-1',
    subjectId: 'cs402',
    topicId: 'cs402-topic-4',
    title: 'Neural Network Basics',
    questions: questions.slice(45, 50)
  },
  {
    id: 'cs402-quiz-4-2',
    subjectId: 'cs402',
    topicId: 'cs402-topic-4',
    title: 'Training & Regularization',
    questions: questions.slice(50, 55)
  },
  {
    id: 'cs402-quiz-4-3',
    subjectId: 'cs402',
    topicId: 'cs402-topic-4',
    title: 'Backpropagation & Optimization',
    questions: questions.slice(55, 60)
  },

  // Topic 5: Deep Learning (3 quizzes)
  {
    id: 'cs402-quiz-5-1',
    subjectId: 'cs402',
    topicId: 'cs402-topic-5',
    title: 'CNNs & Computer Vision',
    questions: questions.slice(60, 65)
  },
  {
    id: 'cs402-quiz-5-2',
    subjectId: 'cs402',
    topicId: 'cs402-topic-5',
    title: 'RNNs & Sequence Models',
    questions: questions.slice(65, 70)
  },
  {
    id: 'cs402-quiz-5-3',
    subjectId: 'cs402',
    topicId: 'cs402-topic-5',
    title: 'Transformers & Transfer Learning',
    questions: questions.slice(70, 75)
  },

  // Topic 6: Unsupervised Learning (3 quizzes)
  {
    id: 'cs402-quiz-6-1',
    subjectId: 'cs402',
    topicId: 'cs402-topic-6',
    title: 'Clustering Fundamentals',
    questions: questions.slice(75, 80)
  },
  {
    id: 'cs402-quiz-6-2',
    subjectId: 'cs402',
    topicId: 'cs402-topic-6',
    title: 'Dimensionality Reduction',
    questions: questions.slice(80, 85)
  },
  {
    id: 'cs402-quiz-6-3',
    subjectId: 'cs402',
    topicId: 'cs402-topic-6',
    title: 'Advanced Unsupervised Methods',
    questions: questions.slice(85, 90)
  },

  // Topic 7: Model Evaluation (3 quizzes)
  {
    id: 'cs402-quiz-7-1',
    subjectId: 'cs402',
    topicId: 'cs402-topic-7',
    title: 'Validation Strategies',
    questions: questions.slice(90, 95)
  },
  {
    id: 'cs402-quiz-7-2',
    subjectId: 'cs402',
    topicId: 'cs402-topic-7',
    title: 'Classification Metrics',
    questions: questions.slice(95, 100)
  },
  {
    id: 'cs402-quiz-7-3',
    subjectId: 'cs402',
    topicId: 'cs402-topic-7',
    title: 'ROC, AUC & Model Selection',
    questions: questions.slice(100, 105)
  },
];
