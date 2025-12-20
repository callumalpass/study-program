# Association Rules and Market Basket Analysis

Association rule mining discovers interesting relationships in large datasets, famously exemplified by market basket analysis: "Customers who buy X also tend to buy Y." These patterns enable recommendations, cross-selling, inventory optimization, and understanding customer behavior.

## Concepts and Definitions

**Itemset**: Collection of items. {bread, milk} is a 2-itemset.

**Support**: Fraction of transactions containing an itemset.  
```support({bread, milk}) = count({bread, milk}) / total_transactions```

**Association Rule**: Implication X → Y where X and Y are itemsets.  
Example: {bread, butter} → {milk}

**Confidence**: Probability of Y given X.  
```confidence(X → Y) = support(X ∪ Y) / support(X)```

**Lift**: How much more likely Y is given X, compared to Y's baseline probability.  
```lift(X → Y) = confidence(X → Y) / support(Y)```

### Interpreting Metrics

**Support**: Frequency. Rare itemsets have low support.

**Confidence**: Strength. High confidence means X strongly implies Y.

**Lift**: Correlation. Lift > 1 means positive correlation, < 1 negative, = 1 independent.

Example:
- support({diapers, beer}) = 0.004 (0.4% of transactions)
- confidence({diapers} → {beer}) = 0.6 (60% of diaper buyers buy beer)
- lift({diapers} → {beer}) = 4.0 (beer 4x more likely with diapers than baseline)

## The Apriori Algorithm

Apriori efficiently finds frequent itemsets using a "bottom-up" approach with the apriori principle:

**Apriori Principle**: If an itemset is frequent, all its subsets must be frequent. Conversely, if an itemset is infrequent, all its supersets are infrequent.

This allows pruning: don't consider supersets of infrequent itemsets.

### Algorithm

```
1. Find frequent 1-itemsets (items with support ≥ min_support)
2. For k = 2, 3, 4, ...:
   a. Generate candidate k-itemsets from frequent (k-1)-itemsets
   b. Prune candidates using apriori principle
   c. Count support of remaining candidates by scanning database
   d. Keep candidates with support ≥ min_support
   e. If no frequent k-itemsets found, stop
3. Generate association rules from frequent itemsets
4. Keep rules with confidence ≥ min_confidence
```

### Example

Transactions: {A,B,C}, {A,B}, {A,C}, {B,C}, {B,C}  
min_support = 0.4 (2/5)

**Step 1**: Frequent 1-itemsets:  
{A}: 3/5, {B}: 4/5, {C}: 4/5 → all frequent

**Step 2**: Candidate 2-itemsets:  
{A,B}, {A,C}, {B,C}  
Counts: {A,B}: 2/5, {A,C}: 2/5, {B,C}: 3/5 → all frequent

**Step 3**: Candidate 3-itemsets:  
{A,B,C}: 1/5 → infrequent, stop

**Rules from {B,C} (support 0.6)**:  
{B} → {C}: confidence = 0.6/0.8 = 0.75  
{C} → {B}: confidence = 0.6/0.8 = 0.75

### Computational Challenges

Apriori requires multiple database scans (one per k). For large databases, this is expensive. The number of candidate itemsets can explode.

**Optimizations**:
- Hash trees for efficient counting
- Transaction reduction (remove transactions not containing frequent itemsets)
- Sampling (approximate counts on sample)

## FP-Growth: Faster Alternative

FP-Growth builds a compact tree structure (FP-tree) representing transactions, enabling frequent itemset mining without candidate generation.

**Advantages over Apriori**:
- Only two database scans
- No candidate generation
- Compact representation

**Disadvantages**:
- More complex implementation
- Higher memory usage

For large datasets, FP-Growth significantly outperforms Apriori.

## Applications Beyond Retail

**Cross-Selling**: "Customers who bought X might also like Y."

**Product Placement**: Place associated items nearby to increase sales.

**Medical Diagnosis**: Symptoms co-occurring indicate diseases.

**Web Usage Mining**: Pages visited together suggest navigation patterns.

**Bioinformatics**: Gene co-expression patterns.

**Recommender Systems**: Items purchased/viewed together inform recommendations.

## Practical Considerations

**Minimum Support**: Too high misses rare but interesting patterns; too low yields too many spurious patterns. Adaptive thresholds help.

**Minimum Confidence**: Similar tradeoffs. Use lift to filter spurious high-confidence, low-lift rules.

**Computational Cost**: Scales with number of unique items and average transaction size. Preprocessing (removing very frequent or very rare items) helps.

**Actionability**: Not all discovered rules are useful. Domain experts must evaluate practical relevance.

**Causation vs. Correlation**: Association rules show correlation, not causation. Don't assume X causes Y.

## Implementation Example

```python
from mlxtend.frequent_patterns import apriori, association_rules
import pandas as pd

# Transaction data (one-hot encoded)
basket = pd.DataFrame({
    'milk': [1, 0, 1, 1, 0],
    'bread': [1, 1, 0, 1, 1],
    'butter': [1, 1, 1, 0, 0],
    'beer': [0, 1, 0, 1, 1]
})

# Find frequent itemsets
frequent_itemsets = apriori(basket, min_support=0.4, use_colnames=True)

# Generate rules
rules = association_rules(frequent_itemsets, metric="lift", min_threshold=1.0)
rules = rules[rules['confidence'] >= 0.5]

print(rules[['antecedents', 'consequents', 'support', 'confidence', 'lift']])
```

## Advanced Topics

**Multi-level Association Rules**: Hierarchical items (milk → dairy → food).

**Quantitative Association Rules**: Numerical attributes (age → purchase).

**Sequential Patterns**: Temporal order matters (A, then B, then C).

**Constraint-Based Mining**: User-defined constraints on rules.

## Conclusion

Association rule mining discovers valuable patterns in transactional data. The Apriori algorithm, though simple, efficiently finds frequent itemsets using the apriori principle. Understanding support, confidence, and lift enables interpreting discovered rules and filtering for actionable insights. While originating in retail, association rules apply broadly wherever understanding co-occurrence patterns provides value. Effective application requires balancing computational efficiency with pattern interestingness, and validating discoveries through domain expertise.
