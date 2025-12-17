# Naive Bayes

## Introduction

Naive Bayes classifiers are a family of simple probabilistic classifiers based on applying Bayes' theorem with strong (naive) independence assumptions between features. Despite this unrealistic assumption, Naive Bayes often performs surprisingly well and is widely used for text classification, spam filtering, and recommendation systems.

The algorithm is called "naive" because it assumes features are conditionally independent given the class label. In reality, features are often correlated, yet Naive Bayes still achieves good performance because the independence assumption, while incorrect, is often "correct enough" for classification purposes.

Naive Bayes classifiers are fast, require small amounts of training data to estimate parameters, and scale well to very high-dimensional problems. Understanding Naive Bayes provides essential insights into probabilistic classification and Bayesian reasoning.

## Bayes' Theorem

### Fundamental Formula

$$P(C|X) = \frac{P(X|C)P(C)}{P(X)}$$

where:
- $$P(C|X)$$: Posterior probability of class $$C$$ given features $$X$$
- $$P(X|C)$$: Likelihood of features $$X$$ given class $$C$$
- $$P(C)$$: Prior probability of class $$C$$
- $$P(X)$$: Evidence (marginal probability of $$X$$)

### For Classification

**Classify as:**

$$\hat{y} = \arg\max_{C} P(C|X) = \arg\max_{C} \frac{P(X|C)P(C)}{P(X)}$$

**Since $$P(X)$$ constant for all classes:**

$$\hat{y} = \arg\max_{C} P(X|C)P(C)$$

## Naive Bayes Assumption

### Conditional Independence

**Given class $$C$$, features are independent:**

$$P(X|C) = P(x_1, x_2, ..., x_d|C) = \prod_{i=1}^{d}P(x_i|C)$$

**This is the "naive" assumption!**

**Classification becomes:**

$$\hat{y} = \arg\max_{C} P(C)\prod_{i=1}^{d}P(x_i|C)$$

**Log probabilities (numerical stability):**

$$\hat{y} = \arg\max_{C} \left[\log P(C) + \sum_{i=1}^{d}\log P(x_i|C)\right]$$

## Gaussian Naive Bayes

### For Continuous Features

**Assume features follow Gaussian distribution:**

$$P(x_i|C) = \frac{1}{\sqrt{2\pi\sigma_{C,i}^2}}\exp\left(-\frac{(x_i - \mu_{C,i})^2}{2\sigma_{C,i}^2}\right)$$

where:
- $$\mu_{C,i}$$: Mean of feature $$i$$ in class $$C$$
- $$\sigma_{C,i}^2$$: Variance of feature $$i$$ in class $$C$$

### Parameter Estimation

**From training data, estimate:**

**Prior:**

$$P(C) = \frac{\text{Number of examples in class } C}{\text{Total examples}}$$

**Mean:**

$$\mu_{C,i} = \frac{1}{n_C}\sum_{j: y^{(j)}=C}x_i^{(j)}$$

**Variance:**

$$\sigma_{C,i}^2 = \frac{1}{n_C}\sum_{j: y^{(j)}=C}(x_i^{(j)} - \mu_{C,i})^2$$

### Implementation

```python
from sklearn.naive_bayes import GaussianNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

# Create and train
gnb = GaussianNB()
gnb.fit(X_train, y_train)

# Predict
y_pred = gnb.predict(X_test)

# Get probabilities
y_prob = gnb.predict_proba(X_test)

# Evaluate
accuracy = accuracy_score(y_test, y_pred)
print(f'Accuracy: {accuracy:.4f}')
print(classification_report(y_test, y_pred))

# View learned parameters
print(f'Class priors: {gnb.class_prior_}')
print(f'Means: {gnb.theta_}')
print(f'Variances: {gnb.var_}')
```

## Multinomial Naive Bayes

### For Count Data

**Used for:** Text classification, document categorization

**Features:** Word counts, term frequencies

**Likelihood:**

$$P(x_i|C) = \frac{N_{C,i} + \alpha}{N_C + \alpha d}$$

where:
- $$N_{C,i}$$: Count of feature $$i$$ in class $$C$$
- $$N_C$$: Total count of all features in class $$C$$
- $$\alpha$$: Smoothing parameter (Laplace smoothing)
- $$d$$: Number of features

### Implementation

```python
from sklearn.naive_bayes import MultinomialNB
from sklearn.feature_extraction.text import CountVectorizer

# Text classification example
texts = ['great movie', 'terrible film', 'awesome show', 'boring movie']
labels = [1, 0, 1, 0]  # 1: positive, 0: negative

# Convert text to counts
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(texts)

# Train
mnb = MultinomialNB(alpha=1.0)  # alpha is smoothing
mnb.fit(X, labels)

# Predict new text
new_texts = ['amazing film']
X_new = vectorizer.transform(new_texts)
prediction = mnb.predict(X_new)
prob = mnb.predict_proba(X_new)

print(f'Prediction: {prediction}')
print(f'Probabilities: {prob}')
```

### Laplace Smoothing

**Problem:** Zero probabilities for unseen feature values.

**If word never appears in class:** $$P(x_i|C) = 0 \Rightarrow P(C|X) = 0$$

**Solution:** Add-one (Laplace) smoothing

$$P(x_i|C) = \frac{N_{C,i} + \alpha}{N_C + \alpha d}$$

**Effect:** Prevents zero probabilities, smooths estimates.

**Parameter $$\alpha$$:**
- $$\alpha = 1$$: Laplace smoothing
- $$\alpha < 1$$: Less smoothing
- $$\alpha > 1$$: More smoothing

## Bernoulli Naive Bayes

### For Binary Features

**Features:** Binary indicators (present/absent)

**Likelihood:**

$$P(x_i|C) = P(i|C)x_i + (1 - P(i|C))(1 - x_i)$$

where $$P(i|C)$$ is probability of feature $$i$$ being present in class $$C$$.

### Use Case

**Text classification with binary features:**
- Feature = 1 if word appears
- Feature = 0 if word absent

**Difference from Multinomial:**
- Multinomial: Counts matter
- Bernoulli: Only presence/absence matters

### Implementation

```python
from sklearn.naive_bayes import BernoulliNB

# Binary features
bnb = BernoulliNB(alpha=1.0)
bnb.fit(X_train, y_train)
y_pred = bnb.predict(X_test)
```

## Text Classification Example

### Spam Filter

```python
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score

# Sample data
emails = [
    'Get rich quick! Buy now!',
    'Meeting tomorrow at 3pm',
    'Win free money!!!',
    'Project deadline reminder',
    'Claim your prize now!',
    'Lunch next week?'
]

labels = [1, 0, 1, 0, 1, 0]  # 1: spam, 0: not spam

# Create pipeline
pipeline = Pipeline([
    ('vectorizer', CountVectorizer()),
    ('classifier', MultinomialNB())
])

# Train
pipeline.fit(emails, labels)

# Predict
new_emails = ['Free money awaits!', 'Meeting at 2pm']
predictions = pipeline.predict(new_emails)
probabilities = pipeline.predict_proba(new_emails)

for email, pred, prob in zip(new_emails, predictions, probabilities):
    label = 'SPAM' if pred == 1 else 'NOT SPAM'
    confidence = prob[pred]
    print(f'"{email}" -> {label} ({confidence:.2%} confidence)')
```

### With TF-IDF

```python
# Use TF-IDF instead of counts
pipeline_tfidf = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('classifier', MultinomialNB())
])

pipeline_tfidf.fit(emails, labels)
```

## Advantages of Naive Bayes

**Fast training and prediction:** Linear time complexity.

**Small training data:** Works well with limited examples.

**Handles high dimensions:** Scales to many features.

**Multiclass naturally:** No modification needed.

**Probabilistic:** Provides probability estimates.

**Simple:** Easy to implement and understand.

**Baseline:** Good starting point for classification.

## Disadvantages of Naive Bayes

**Independence assumption:** Rarely true in practice.

**Poor probability estimates:** Probabilities often poorly calibrated.

**Sensitive to feature representation:** Performance depends on feature engineering.

**Zero-frequency problem:** Requires smoothing.

**Continuous features:** Gaussian assumption may not hold.

## When to Use Naive Bayes

**Text classification:** Spam filtering, sentiment analysis, document categorization.

**Small datasets:** Works with limited training data.

**High-dimensional data:** Many features (e.g., bag-of-words).

**Real-time prediction:** Fast prediction needed.

**Baseline model:** Quick first model to establish performance.

**Multi-class problems:** Naturally handles many classes.

## Calibration

**Problem:** Naive Bayes probabilities often not well-calibrated.

**Solution:** Calibration methods

```python
from sklearn.calibration import CalibratedClassifierCV

# Train Naive Bayes
nb = MultinomialNB()
nb.fit(X_train, y_train)

# Calibrate probabilities
calibrated_nb = CalibratedClassifierCV(nb, cv=5, method='sigmoid')
calibrated_nb.fit(X_train, y_train)

# Now probabilities more accurate
y_prob_calibrated = calibrated_nb.predict_proba(X_test)
```

## Comparison of Variants

| Variant | Features | Use Case | Example |
|---------|----------|----------|---------|
| Gaussian | Continuous | General classification | Iris dataset |
| Multinomial | Counts | Text classification | Document categorization |
| Bernoulli | Binary | Binary features | Presence/absence of words |
| Complement | Counts | Imbalanced text | Skewed document classes |

## Handling Imbalanced Data

**Class priors automatically account for imbalance:**

$$P(C) = \frac{n_C}{n}$$

**For severe imbalance:**

```python
from sklearn.utils.class_weight import compute_class_weight

# Compute balanced weights
class_weights = compute_class_weight('balanced',
                                      classes=np.unique(y_train),
                                      y=y_train)

# Note: Naive Bayes doesn't directly support class_weight
# Instead, can oversample minority class or adjust priors
```

## Feature Selection

**Naive Bayes benefits from relevant features:**

```python
from sklearn.feature_selection import SelectKBest, chi2

# Select top K features
selector = SelectKBest(chi2, k=100)

# Pipeline with feature selection
pipeline = Pipeline([
    ('vectorizer', CountVectorizer()),
    ('selector', SelectKBest(chi2, k=100)),
    ('classifier', MultinomialNB())
])

pipeline.fit(X_train, y_train)
```

## Practical Tips

**Use appropriate variant:** Gaussian for continuous, Multinomial for counts, Bernoulli for binary.

**Tune smoothing parameter:** Cross-validate $$\alpha$$ in [0.1, 1, 10].

**Feature engineering:** Good features crucial despite "naive" assumption.

**Compare to other models:** Naive Bayes is baseline; try Random Forest, SVM, etc.

**Calibrate probabilities:** If probability estimates important.

**Handle missing values:** Impute or treat as separate category.

## Applications

**Email spam filtering:** Classic application, very effective.

**Sentiment analysis:** Classify reviews as positive/negative.

**Document categorization:** News articles into topics.

**Medical diagnosis:** Given symptoms, predict disease.

**Recommendation systems:** Collaborative filtering with Naive Bayes.

**Real-time classification:** Fast prediction for streaming data.

## Comparison with Other Algorithms

| Aspect | Naive Bayes | Logistic Regression | Random Forest | SVM |
|--------|-------------|---------------------|---------------|-----|
| Speed | Very fast | Fast | Medium | Slow |
| Accuracy | Good | Very good | Excellent | Very good |
| Interpretability | High | High | Medium | Low |
| Assumptions | Strong | Moderate | Few | Moderate |
| High dimensions | Excellent | Good | Good | Good |
| Small data | Excellent | Good | Poor | Good |

## Conclusion

Naive Bayes classifiers, despite their simplistic independence assumption, remain powerful tools for classification, particularly for text data and high-dimensional problems. Their speed, simplicity, and effectiveness with small training sets make them valuable for many applications.

**Key takeaways:**

- **Bayes' theorem:** Foundation of probabilistic classification
- **Naive assumption:** Conditional independence given class
- **Variants:** Gaussian (continuous), Multinomial (counts), Bernoulli (binary)
- **Fast and scalable:** Linear time training and prediction
- **Text classification:** Particularly effective for document categorization
- **Smoothing:** Prevents zero probabilities
- **Good baseline:** Quick first model for classification

While more sophisticated methods often achieve higher accuracy, Naive Bayes provides a strong baseline and sometimes matches or exceeds complex models, especially for text classification. Understanding the probabilistic reasoning behind Naive Bayes provides essential foundations for machine learning and Bayesian methods.