---
title: "EDA Process"
description: "Systematic approach to exploratory data analysis"
---

# EDA Process

Exploratory Data Analysis (EDA) is a systematic, iterative approach to investigating datasets to discover patterns, detect anomalies, test hypotheses, and check assumptions. Unlike confirmatory data analysis, which tests specific hypotheses, EDA is an open-ended process of discovery that helps data scientists understand the structure, relationships, and peculiarities of their data before applying formal modeling techniques.

The EDA process is fundamentally iterative. As you explore your data, you'll uncover new questions that lead to deeper investigation. Each insight you gain informs the next step of your analysis, creating a feedback loop that gradually builds a comprehensive understanding of your dataset. This chapter presents a structured seven-step framework for conducting thorough exploratory data analysis.

## Step 1: Data Overview

The first step in any EDA process is to get a high-level understanding of your dataset's structure. This involves examining the shape of the data, identifying the columns present, understanding data types, and getting a sense of the overall size and complexity of the dataset.

```python
import pandas as pd
import numpy as np

# Load dataset
df = pd.read_csv('data.csv')

# Basic information
print(f"Dataset Shape: {df.shape}")
print(f"Number of rows: {df.shape[0]}")
print(f"Number of columns: {df.shape[1]}")
print(f"\nColumn Names:\n{df.columns.tolist()}")

# Display first and last rows
print("\nFirst 5 rows:")
print(df.head())
print("\nLast 5 rows:")
print(df.tail())

# Data types and memory usage
print("\nData Types and Memory:")
print(df.info())

# Get a random sample to see variety
print("\nRandom Sample:")
print(df.sample(5))
```

This initial overview helps you understand what you're working with. Pay attention to whether the number of rows makes sense for your domain, whether all expected columns are present, and whether the data types are appropriate for each column. For example, a date column stored as a string will need type conversion before temporal analysis.

## Step 2: Missing Data Assessment

Missing data is one of the most common data quality issues and can significantly impact your analysis. Understanding the pattern and extent of missing data is crucial for deciding how to handle it.

```python
# Count missing values
missing_counts = df.isnull().sum()
missing_percentages = (df.isnull().sum() / len(df)) * 100

# Create a comprehensive missing data report
missing_report = pd.DataFrame({
    'Missing_Count': missing_counts,
    'Missing_Percentage': missing_percentages
}).sort_values('Missing_Percentage', ascending=False)

print("Missing Data Report:")
print(missing_report[missing_report['Missing_Count'] > 0])

# Visualize missing data patterns
import matplotlib.pyplot as plt
import seaborn as sns

# Missing data heatmap
plt.figure(figsize=(12, 8))
sns.heatmap(df.isnull(), cbar=True, yticklabels=False, cmap='viridis')
plt.title('Missing Data Pattern')
plt.tight_layout()
plt.show()

# Check for patterns in missing data
# Are certain rows missing multiple values?
rows_with_missing = df.isnull().sum(axis=1)
print(f"\nRows with no missing values: {sum(rows_with_missing == 0)}")
print(f"Rows with 1+ missing values: {sum(rows_with_missing > 0)}")
print(f"Rows with 5+ missing values: {sum(rows_with_missing > 5)}")
```

Understanding missing data patterns is essential. Is the data Missing Completely At Random (MCAR), Missing At Random (MAR), or Missing Not At Random (MNAR)? This distinction will inform your imputation strategy or whether you should remove the affected rows or columns.

## Step 3: Univariate Analysis

Univariate analysis examines each variable individually to understand its distribution, central tendency, spread, and shape. This step is critical for identifying data quality issues and understanding individual variable behavior.

```python
# For numerical variables
numerical_cols = df.select_dtypes(include=[np.number]).columns

for col in numerical_cols:
    print(f"\n=== Analysis of {col} ===")

    # Descriptive statistics
    print(df[col].describe())

    # Additional statistics
    print(f"Skewness: {df[col].skew():.3f}")
    print(f"Kurtosis: {df[col].kurtosis():.3f}")
    print(f"Coefficient of Variation: {(df[col].std() / df[col].mean()):.3f}")

    # Visualizations
    fig, axes = plt.subplots(1, 3, figsize=(15, 4))

    # Histogram
    df[col].hist(bins=30, ax=axes[0], edgecolor='black')
    axes[0].set_title(f'{col} - Histogram')
    axes[0].set_xlabel(col)
    axes[0].set_ylabel('Frequency')

    # Box plot
    df.boxplot(column=col, ax=axes[1])
    axes[1].set_title(f'{col} - Box Plot')

    # Q-Q plot for normality
    from scipy import stats
    stats.probplot(df[col].dropna(), dist="norm", plot=axes[2])
    axes[2].set_title(f'{col} - Q-Q Plot')

    plt.tight_layout()
    plt.show()

# For categorical variables
categorical_cols = df.select_dtypes(include=['object', 'category']).columns

for col in categorical_cols:
    print(f"\n=== Analysis of {col} ===")

    # Value counts
    value_counts = df[col].value_counts()
    print(f"Unique values: {df[col].nunique()}")
    print(f"\nTop 10 categories:")
    print(value_counts.head(10))

    # Visualization
    if df[col].nunique() <= 20:
        plt.figure(figsize=(10, 6))
        value_counts.plot(kind='bar')
        plt.title(f'Distribution of {col}')
        plt.xlabel(col)
        plt.ylabel('Count')
        plt.xticks(rotation=45)
        plt.tight_layout()
        plt.show()
```

## Step 4: Bivariate Analysis

Bivariate analysis explores relationships between pairs of variables. This step helps identify correlations, dependencies, and potential predictive relationships.

```python
# Numerical-Numerical relationships
# Correlation matrix
correlation_matrix = df[numerical_cols].corr()

plt.figure(figsize=(10, 8))
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0,
            square=True, linewidths=1, cbar_kws={"shrink": 0.8})
plt.title('Correlation Matrix')
plt.tight_layout()
plt.show()

# Pairplot for key variables
sns.pairplot(df[numerical_cols], diag_kind='kde')
plt.show()

# Numerical-Categorical relationships
# Example: comparing numerical variable across categories
categorical_col = 'category'  # Replace with actual column name
numerical_col = 'value'  # Replace with actual column name

plt.figure(figsize=(10, 6))
df.boxplot(column=numerical_col, by=categorical_col)
plt.title(f'{numerical_col} by {categorical_col}')
plt.suptitle('')  # Remove default title
plt.tight_layout()
plt.show()

# Statistical test (ANOVA)
from scipy.stats import f_oneway
groups = [group[numerical_col].dropna() for name, group in df.groupby(categorical_col)]
f_stat, p_value = f_oneway(*groups)
print(f"ANOVA F-statistic: {f_stat:.3f}, p-value: {p_value:.4f}")

# Categorical-Categorical relationships
# Cross-tabulation
cat1, cat2 = 'category1', 'category2'  # Replace with actual column names
crosstab = pd.crosstab(df[cat1], df[cat2])
print("\nCross-tabulation:")
print(crosstab)

# Chi-square test
from scipy.stats import chi2_contingency
chi2, p_value, dof, expected = chi2_contingency(crosstab)
print(f"Chi-square: {chi2:.3f}, p-value: {p_value:.4f}")
```

## Step 5: Multivariate Analysis

Multivariate analysis examines relationships among three or more variables simultaneously, revealing complex patterns that bivariate analysis might miss.

```python
# 3D scatter plot
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')

x, y, z = 'var1', 'var2', 'var3'  # Replace with actual column names
ax.scatter(df[x], df[y], df[z], c=df['target'], cmap='viridis')
ax.set_xlabel(x)
ax.set_ylabel(y)
ax.set_zlabel(z)
plt.title('3D Scatter Plot')
plt.show()

# Parallel coordinates plot
from pandas.plotting import parallel_coordinates

plt.figure(figsize=(12, 6))
parallel_coordinates(df[['var1', 'var2', 'var3', 'category']], 'category')
plt.title('Parallel Coordinates Plot')
plt.legend(loc='best')
plt.tight_layout()
plt.show()

# Grouped analysis
grouped_stats = df.groupby(['cat1', 'cat2']).agg({
    'num1': ['mean', 'std', 'count'],
    'num2': ['mean', 'std', 'count']
})
print("\nGrouped Statistics:")
print(grouped_stats)
```

## Step 6: Outlier Detection and Assessment

Outliers can significantly impact statistical analyses and machine learning models. Identifying and understanding outliers is crucial for data quality and model performance.

```python
# Statistical methods for outlier detection
def detect_outliers_iqr(df, column):
    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR

    outliers = df[(df[column] < lower_bound) | (df[column] > upper_bound)]
    return outliers, lower_bound, upper_bound

def detect_outliers_zscore(df, column, threshold=3):
    z_scores = np.abs((df[column] - df[column].mean()) / df[column].std())
    outliers = df[z_scores > threshold]
    return outliers

# Apply to each numerical column
for col in numerical_cols:
    iqr_outliers, lower, upper = detect_outliers_iqr(df, col)
    z_outliers = detect_outliers_zscore(df, col)

    print(f"\n{col}:")
    print(f"  IQR outliers: {len(iqr_outliers)} ({len(iqr_outliers)/len(df)*100:.2f}%)")
    print(f"  Z-score outliers: {len(z_outliers)} ({len(z_outliers)/len(df)*100:.2f}%)")
    print(f"  Valid range (IQR): [{lower:.2f}, {upper:.2f}]")

# Multivariate outlier detection using Isolation Forest
from sklearn.ensemble import IsolationForest

iso_forest = IsolationForest(contamination=0.05, random_state=42)
outlier_predictions = iso_forest.fit_predict(df[numerical_cols].dropna())
outlier_indices = np.where(outlier_predictions == -1)[0]

print(f"\nMultivariate outliers detected: {len(outlier_indices)}")
```

## Step 7: Feature Insights and Recommendations

The final step synthesizes all previous analyses into actionable insights and recommendations for data preprocessing, feature engineering, and modeling.

```python
def generate_eda_insights(df):
    insights = []

    # Check for high cardinality categorical features
    for col in df.select_dtypes(include=['object']).columns:
        unique_ratio = df[col].nunique() / len(df)
        if unique_ratio > 0.5:
            insights.append(f"High cardinality in '{col}': Consider encoding strategy or removal")

    # Check for low variance features
    for col in numerical_cols:
        cv = df[col].std() / df[col].mean() if df[col].mean() != 0 else 0
        if cv < 0.1:
            insights.append(f"Low variance in '{col}': May not be useful for modeling")

    # Check for highly correlated features
    corr_matrix = df[numerical_cols].corr().abs()
    upper_triangle = corr_matrix.where(
        np.triu(np.ones(corr_matrix.shape), k=1).astype(bool)
    )
    for column in upper_triangle.columns:
        for index in upper_triangle.index:
            if upper_triangle.loc[index, column] > 0.95:
                insights.append(f"High correlation between '{column}' and '{index}': Consider removing one")

    # Check for skewed distributions
    for col in numerical_cols:
        skewness = df[col].skew()
        if abs(skewness) > 1:
            insights.append(f"'{col}' is highly skewed ({skewness:.2f}): Consider transformation")

    return insights

insights = generate_eda_insights(df)
print("\n=== EDA Insights and Recommendations ===")
for i, insight in enumerate(insights, 1):
    print(f"{i}. {insight}")
```

## The Iterative Nature of EDA

EDA is not a linear process. As you progress through these steps, you'll often need to circle back to earlier stages. For example, discovering outliers in Step 6 might prompt you to revisit Step 3 to examine distributions more carefully, or findings in Step 4 might suggest new groupings to explore in Step 5.

This iterative nature is a strength, not a weakness. Each cycle through the process deepens your understanding and reveals new questions worth investigating. A thorough EDA might involve several complete cycles before you feel ready to proceed to modeling.

## Documentation and Reporting Best Practices

Documenting your EDA process is crucial for reproducibility and communication. Follow these best practices:

1. **Use Jupyter notebooks** to combine code, visualizations, and narrative explanations
2. **Create summary tables** that highlight key findings from each analysis step
3. **Annotate visualizations** with clear titles, labels, and interpretations
4. **Document anomalies** and explain how you handled them
5. **Record assumptions** you made during the analysis
6. **Maintain a findings log** listing each insight and its implications
7. **Create an executive summary** that distills the most important discoveries

```python
# Example: Creating a comprehensive EDA report
def create_eda_report(df, output_file='eda_report.txt'):
    with open(output_file, 'w') as f:
        f.write("=== EXPLORATORY DATA ANALYSIS REPORT ===\n\n")

        f.write(f"Dataset Shape: {df.shape}\n")
        f.write(f"Analysis Date: {pd.Timestamp.now()}\n\n")

        f.write("1. MISSING DATA SUMMARY\n")
        missing = df.isnull().sum()
        f.write(missing[missing > 0].to_string())

        f.write("\n\n2. NUMERICAL VARIABLES SUMMARY\n")
        f.write(df.describe().to_string())

        f.write("\n\n3. CATEGORICAL VARIABLES SUMMARY\n")
        for col in df.select_dtypes(include=['object']).columns:
            f.write(f"\n{col}: {df[col].nunique()} unique values\n")
            f.write(df[col].value_counts().head(5).to_string())

        f.write("\n\n4. KEY INSIGHTS\n")
        insights = generate_eda_insights(df)
        for i, insight in enumerate(insights, 1):
            f.write(f"{i}. {insight}\n")

# create_eda_report(df)
```

By following this systematic seven-step process, you'll develop a deep understanding of your data that informs every subsequent stage of your data science project. Remember that EDA is both an art and a science—while this framework provides structure, your domain knowledge and curiosity will guide you to the most valuable insights.
