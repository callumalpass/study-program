import { Quiz } from '../../../core/types';

export const cs407Quizzes: Quiz[] = [
  // Topic 1: Data Collection and APIs
  {
    id: 'cs407-quiz-1-1',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'Data Collection Fundamentals',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Which type of data source provides data collected directly from the original source?',
        options: ['Primary data', 'Secondary data', 'Tertiary data', 'Derived data'],
        correctAnswer: 0,
        explanation: 'Primary data is collected firsthand from the original source for a specific purpose.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What does API stand for in the context of data collection?',
        options: [
          'Application Programming Interface',
          'Advanced Programming Integration',
          'Automated Process Interface',
          'Application Process Integration'
        ],
        correctAnswer: 0,
        explanation: 'API (Application Programming Interface) allows programmatic access to data and services.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'Which HTTP method is typically used to retrieve data from a REST API?',
        options: ['GET', 'POST', 'PUT', 'DELETE'],
        correctAnswer: 0,
        explanation: 'GET requests retrieve data from a server without modifying it.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What file format is most commonly used for configuration files and human-readable data?',
        options: ['Parquet', 'Avro', 'JSON', 'Protocol Buffers'],
        correctAnswer: 2,
        explanation: 'JSON (JavaScript Object Notation) is text-based, human-readable, and widely used for configuration and data exchange.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'Which data quality dimension refers to the proportion of non-missing values?',
        options: ['Accuracy', 'Completeness', 'Consistency', 'Timeliness'],
        correctAnswer: 1,
        explanation: 'Completeness measures the extent to which all required data is present.'
      }
    ]
  },
  {
    id: 'cs407-quiz-1-2',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'APIs and Data Formats',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the primary advantage of using REST APIs for data collection?',
        options: [
          'They only work with JSON',
          'They are stateless and scalable',
          'They require authentication',
          'They are slower than other methods'
        ],
        correctAnswer: 1,
        explanation: 'REST APIs are stateless, making them highly scalable and easier to maintain.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'Which data format is most efficient for storing large datasets with schema evolution?',
        options: ['CSV', 'JSON', 'Parquet', 'XML'],
        correctAnswer: 2,
        explanation: 'Parquet is a columnar storage format optimized for big data, supporting schema evolution and efficient compression.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What does rate limiting in APIs prevent?',
        options: [
          'Data duplication',
          'Server overload from excessive requests',
          'Authentication failures',
          'Data corruption'
        ],
        correctAnswer: 1,
        explanation: 'Rate limiting restricts the number of requests to prevent server overload and ensure fair usage.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'Which authentication method uses tokens that expire after a set time?',
        options: ['Basic Auth', 'API Key', 'OAuth 2.0', 'Digest Auth'],
        correctAnswer: 2,
        explanation: 'OAuth 2.0 uses access tokens with expiration times for secure, temporary authorization.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is web scraping primarily used for?',
        options: [
          'Cleaning data',
          'Extracting data from websites without APIs',
          'Storing data in databases',
          'Visualizing data'
        ],
        correctAnswer: 1,
        explanation: 'Web scraping extracts data from websites that do not provide APIs for data access.'
      }
    ]
  },
  {
    id: 'cs407-quiz-1-3',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'Data Quality and Collection Methods',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Which data quality dimension ensures data values are correct and reliable?',
        options: ['Completeness', 'Accuracy', 'Consistency', 'Validity'],
        correctAnswer: 1,
        explanation: 'Accuracy measures whether data values correctly represent the real-world entities they describe.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is the main benefit of streaming data collection over batch processing?',
        options: [
          'Lower storage costs',
          'Real-time or near-real-time insights',
          'Simpler implementation',
          'Better data quality'
        ],
        correctAnswer: 1,
        explanation: 'Streaming allows processing data as it arrives, enabling real-time analytics and faster decision-making.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'Which HTTP status code indicates successful data retrieval?',
        options: ['404', '500', '200', '301'],
        correctAnswer: 2,
        explanation: 'HTTP 200 OK indicates the request was successful and the server returned the requested data.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is pagination used for in API requests?',
        options: [
          'Encrypting data',
          'Breaking large datasets into manageable chunks',
          'Authenticating users',
          'Compressing responses'
        ],
        correctAnswer: 1,
        explanation: 'Pagination divides large result sets into pages to improve performance and reduce server load.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'Which Python library is commonly used for making HTTP requests to APIs?',
        options: ['pandas', 'numpy', 'requests', 'matplotlib'],
        correctAnswer: 2,
        explanation: 'The requests library provides a simple interface for making HTTP requests in Python.'
      }
    ]
  },

  // Topic 2: Data Cleaning
  {
    id: 'cs407-quiz-2-1',
    subjectId: 'cs407',
    topicId: 'cs407-t2',
    title: 'Missing Data and Imputation',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What does MCAR stand for in missing data analysis?',
        options: [
          'Missing Completely At Random',
          'Missing Conditionally At Random',
          'Missing Continuously At Random',
          'Missing Categorically At Random'
        ],
        correctAnswer: 0,
        explanation: 'MCAR means missingness is independent of both observed and unobserved data.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'Which imputation method uses nearby observations to estimate missing values?',
        options: ['Mean imputation', 'KNN imputation', 'Forward fill', 'Mode imputation'],
        correctAnswer: 1,
        explanation: 'K-Nearest Neighbors imputation uses values from similar observations.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is the IQR method used for?',
        options: [
          'Missing data imputation',
          'Outlier detection',
          'Feature scaling',
          'Data validation'
        ],
        correctAnswer: 1,
        explanation: 'The Interquartile Range (IQR) method identifies outliers based on quartile statistics.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'Which transformation is best for reducing right-skewed data?',
        options: ['Square transformation', 'Logarithmic transformation', 'Exponential transformation', 'Linear transformation'],
        correctAnswer: 1,
        explanation: 'Log transformation compresses large values more than small ones, reducing right skew.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What does StandardScaler in sklearn do?',
        options: [
          'Scales to [0, 1] range',
          'Scales to zero mean and unit variance',
          'Removes outliers',
          'Fills missing values'
        ],
        correctAnswer: 1,
        explanation: 'StandardScaler standardizes features by removing the mean and scaling to unit variance.'
      }
    ]
  },
  {
    id: 'cs407-quiz-2-2',
    subjectId: 'cs407',
    topicId: 'cs407-t2',
    title: 'Outlier Detection and Handling',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the IQR rule for identifying outliers?',
        options: [
          'Values beyond mean ± 2 standard deviations',
          'Values beyond Q1 - 1.5×IQR or Q3 + 1.5×IQR',
          'Values in the top and bottom 5%',
          'Values beyond the median ± IQR'
        ],
        correctAnswer: 1,
        explanation: 'The IQR rule defines outliers as values below Q1 - 1.5×IQR or above Q3 + 1.5×IQR.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'Which method is best for detecting outliers in multivariate data?',
        options: ['Z-score', 'IQR method', 'Mahalanobis distance', 'Visual inspection'],
        correctAnswer: 2,
        explanation: 'Mahalanobis distance measures how far a point is from the center of a multivariate distribution.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is winsorization?',
        options: [
          'Removing all outliers',
          'Replacing outliers with mean values',
          'Capping extreme values at specified percentiles',
          'Transforming data to remove outliers'
        ],
        correctAnswer: 2,
        explanation: 'Winsorization caps extreme values at specified percentiles instead of removing them.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'Which imputation method preserves the original distribution best?',
        options: ['Mean imputation', 'Median imputation', 'Multiple imputation', 'Zero imputation'],
        correctAnswer: 2,
        explanation: 'Multiple imputation creates several plausible values, preserving uncertainty and distribution characteristics.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What does MAR stand for in missing data terminology?',
        options: [
          'Missing At Random',
          'Missing After Removal',
          'Missing And Removed',
          'Missing All Records'
        ],
        correctAnswer: 0,
        explanation: 'MAR (Missing At Random) means missingness depends on observed data but not on the missing values themselves.'
      }
    ]
  },
  {
    id: 'cs407-quiz-2-3',
    subjectId: 'cs407',
    topicId: 'cs407-t2',
    title: 'Data Transformation and Normalization',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the purpose of Min-Max scaling?',
        options: [
          'Remove outliers',
          'Scale features to a specific range (usually 0-1)',
          'Center data around zero',
          'Reduce skewness'
        ],
        correctAnswer: 1,
        explanation: 'Min-Max scaling transforms features to a specified range, typically [0, 1].'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'When should you use robust scaling instead of standard scaling?',
        options: [
          'When data is normally distributed',
          'When data contains many outliers',
          'When features are categorical',
          'When data is already normalized'
        ],
        correctAnswer: 1,
        explanation: 'Robust scaling uses median and IQR, making it resistant to outliers unlike standard scaling.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is the Box-Cox transformation used for?',
        options: [
          'Detecting outliers',
          'Making data more normally distributed',
          'Encoding categorical variables',
          'Splitting datasets'
        ],
        correctAnswer: 1,
        explanation: 'Box-Cox transformation stabilizes variance and makes data more normally distributed.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'Which technique is used to check if data follows a normal distribution?',
        options: ['T-test', 'Chi-square test', 'Shapiro-Wilk test', 'F-test'],
        correctAnswer: 2,
        explanation: 'The Shapiro-Wilk test is specifically designed to test for normality in a dataset.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is data deduplication?',
        options: [
          'Removing duplicate records',
          'Creating backup copies',
          'Splitting data into training and test sets',
          'Merging multiple datasets'
        ],
        correctAnswer: 0,
        explanation: 'Data deduplication identifies and removes duplicate records to ensure data quality.'
      }
    ]
  },

  // Topic 3: Exploratory Data Analysis
  {
    id: 'cs407-quiz-3-1',
    subjectId: 'cs407',
    topicId: 'cs407-t3',
    title: 'Descriptive Statistics',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Which measure of central tendency is most resistant to outliers?',
        options: ['Mean', 'Median', 'Mode', 'Range'],
        correctAnswer: 1,
        explanation: 'The median is not affected by extreme values, making it robust to outliers.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What does a correlation coefficient of 0 indicate?',
        options: [
          'Perfect positive correlation',
          'Perfect negative correlation',
          'No linear relationship',
          'Strong relationship'
        ],
        correctAnswer: 2,
        explanation: 'A correlation of 0 indicates no linear relationship between variables.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'In hypothesis testing, what is the null hypothesis typically designed to show?',
        options: [
          'A significant difference exists',
          'No difference or effect exists',
          'The alternative is true',
          'The sample is biased'
        ],
        correctAnswer: 1,
        explanation: 'The null hypothesis (H0) typically states there is no effect or difference.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is the purpose of a confidence interval?',
        options: [
          'To test hypotheses',
          'To estimate population parameters',
          'To remove outliers',
          'To transform data'
        ],
        correctAnswer: 1,
        explanation: 'Confidence intervals provide a range of plausible values for population parameters.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'Which plot is best for visualizing the distribution of a continuous variable?',
        options: ['Bar chart', 'Pie chart', 'Histogram', 'Line plot'],
        correctAnswer: 2,
        explanation: 'Histograms show the frequency distribution of continuous data.'
      }
    ]
  },
  {
    id: 'cs407-quiz-3-2',
    subjectId: 'cs407',
    topicId: 'cs407-t3',
    title: 'Correlation and Relationships',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the range of Pearson correlation coefficient?',
        options: ['0 to 1', '-1 to 1', '0 to 100', '-100 to 100'],
        correctAnswer: 1,
        explanation: 'Pearson correlation ranges from -1 (perfect negative) to +1 (perfect positive).'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'Which correlation method is used for ordinal data?',
        options: ['Pearson', 'Spearman', 'Chi-square', 'ANOVA'],
        correctAnswer: 1,
        explanation: 'Spearman rank correlation is appropriate for ordinal or non-linear monotonic relationships.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What does a covariance matrix show?',
        options: [
          'Mean values of variables',
          'Variance and covariance between variables',
          'Frequency distributions',
          'Missing data patterns'
        ],
        correctAnswer: 1,
        explanation: 'A covariance matrix shows variances on the diagonal and covariances between pairs of variables.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is the primary limitation of correlation analysis?',
        options: [
          'It is computationally expensive',
          'It does not imply causation',
          'It only works with categorical data',
          'It requires large sample sizes'
        ],
        correctAnswer: 1,
        explanation: 'Correlation measures association but does not establish causal relationships between variables.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'Which plot is best for visualizing correlation between two continuous variables?',
        options: ['Bar chart', 'Scatter plot', 'Pie chart', 'Histogram'],
        correctAnswer: 1,
        explanation: 'Scatter plots show the relationship between two continuous variables visually.'
      }
    ]
  },
  {
    id: 'cs407-quiz-3-3',
    subjectId: 'cs407',
    topicId: 'cs407-t3',
    title: 'Hypothesis Testing and Statistical Inference',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is a p-value in hypothesis testing?',
        options: [
          'The probability the null hypothesis is true',
          'The probability of observing results as extreme as those observed if the null hypothesis is true',
          'The power of the test',
          'The confidence level'
        ],
        correctAnswer: 1,
        explanation: 'The p-value is the probability of obtaining results at least as extreme as observed, assuming H0 is true.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is a Type I error?',
        options: [
          'Failing to reject a false null hypothesis',
          'Rejecting a true null hypothesis',
          'Using the wrong test',
          'Having insufficient sample size'
        ],
        correctAnswer: 1,
        explanation: 'Type I error (false positive) occurs when we reject the null hypothesis when it is actually true.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'Which test is appropriate for comparing means of two independent groups?',
        options: ['Paired t-test', 'Independent t-test', 'Chi-square test', 'ANOVA'],
        correctAnswer: 1,
        explanation: 'Independent t-test compares means between two unrelated groups.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What does a 95% confidence interval mean?',
        options: [
          '95% of data falls within the interval',
          'We are 95% confident the interval contains the true parameter',
          'The probability the parameter is in the interval is 95%',
          'The margin of error is 5%'
        ],
        correctAnswer: 1,
        explanation: 'A 95% confidence interval means if we repeated sampling, 95% of intervals would contain the true parameter.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is the Central Limit Theorem?',
        options: [
          'Data must be normally distributed',
          'Sample means approach normal distribution as sample size increases',
          'Outliers should be removed',
          'Variance equals mean'
        ],
        correctAnswer: 1,
        explanation: 'The CLT states that sampling distributions of means approach normal distribution with large enough samples.'
      }
    ]
  },

  // Topic 4: Feature Engineering
  {
    id: 'cs407-quiz-4-1',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'Feature Creation and Extraction',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is feature engineering?',
        options: [
          'Removing features from a dataset',
          'Creating new features from existing data to improve model performance',
          'Normalizing all features',
          'Collecting more data'
        ],
        correctAnswer: 1,
        explanation: 'Feature engineering involves creating, transforming, and selecting features to improve model accuracy.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is the purpose of polynomial features?',
        options: [
          'Reduce dimensionality',
          'Capture non-linear relationships',
          'Remove outliers',
          'Encode categorical variables'
        ],
        correctAnswer: 1,
        explanation: 'Polynomial features create interaction and higher-degree terms to model non-linear relationships.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What does PCA (Principal Component Analysis) do?',
        options: [
          'Removes missing values',
          'Reduces dimensionality while preserving variance',
          'Encodes categorical variables',
          'Detects outliers'
        ],
        correctAnswer: 1,
        explanation: 'PCA transforms features into uncorrelated principal components, reducing dimensionality while retaining variance.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is a derived feature?',
        options: [
          'A feature from external data sources',
          'A feature calculated from existing features',
          'A randomly generated feature',
          'A feature selected by the model'
        ],
        correctAnswer: 1,
        explanation: 'Derived features are created by combining or transforming existing features (e.g., BMI from height and weight).'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is domain knowledge used for in feature engineering?',
        options: [
          'Automating the process',
          'Creating meaningful features based on expertise',
          'Removing features',
          'Scaling features'
        ],
        correctAnswer: 1,
        explanation: 'Domain knowledge helps identify and create features that capture important relationships in the specific problem domain.'
      }
    ]
  },
  {
    id: 'cs407-quiz-4-2',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'Feature Selection and Encoding',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the curse of dimensionality?',
        options: [
          'Too few features',
          'Performance degradation with too many features',
          'Missing data problems',
          'Categorical encoding issues'
        ],
        correctAnswer: 1,
        explanation: 'The curse of dimensionality refers to problems that arise when working with high-dimensional data, including sparsity and overfitting.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is one-hot encoding used for?',
        options: [
          'Normalizing numerical features',
          'Converting categorical variables to binary vectors',
          'Removing outliers',
          'Feature selection'
        ],
        correctAnswer: 1,
        explanation: 'One-hot encoding converts categorical variables into binary vectors, creating a column for each category.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'When should you use label encoding instead of one-hot encoding?',
        options: [
          'For nominal categories with no order',
          'For ordinal categories with meaningful order',
          'For numerical features',
          'For datetime features'
        ],
        correctAnswer: 1,
        explanation: 'Label encoding assigns integers to categories and is suitable for ordinal data where order matters.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is the purpose of feature selection?',
        options: [
          'Create more features',
          'Identify and keep only relevant features',
          'Scale features',
          'Handle missing data'
        ],
        correctAnswer: 1,
        explanation: 'Feature selection reduces dimensionality by identifying and retaining only the most informative features.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is target encoding?',
        options: [
          'Encoding the target variable',
          'Replacing categories with the mean target value for that category',
          'Creating target features',
          'Selecting features based on target correlation'
        ],
        correctAnswer: 1,
        explanation: 'Target encoding replaces categorical values with statistics (like mean) of the target variable for each category.'
      }
    ]
  },
  {
    id: 'cs407-quiz-4-3',
    subjectId: 'cs407',
    topicId: 'cs407-t4',
    title: 'Feature Scaling and Transformation',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Why is feature scaling important for distance-based algorithms?',
        options: [
          'It improves accuracy',
          'It prevents features with larger scales from dominating distance calculations',
          'It removes outliers',
          'It encodes categorical variables'
        ],
        correctAnswer: 1,
        explanation: 'Feature scaling ensures all features contribute proportionally to distance calculations in algorithms like KNN and K-means.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is the difference between normalization and standardization?',
        options: [
          'They are the same',
          'Normalization scales to [0,1], standardization to mean=0 and std=1',
          'Normalization removes outliers, standardization does not',
          'Standardization scales to [0,1], normalization to mean=0'
        ],
        correctAnswer: 1,
        explanation: 'Normalization (Min-Max) scales to a range, while standardization (Z-score) centers around mean 0 with unit variance.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is binning in feature engineering?',
        options: [
          'Removing bins of data',
          'Converting continuous variables into discrete intervals',
          'Encoding categorical variables',
          'Selecting features'
        ],
        correctAnswer: 1,
        explanation: 'Binning groups continuous values into discrete intervals or categories (e.g., age groups).'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is feature hashing used for?',
        options: [
          'Encrypting features',
          'Reducing dimensionality of categorical features with many levels',
          'Detecting duplicates',
          'Normalizing features'
        ],
        correctAnswer: 1,
        explanation: 'Feature hashing (hashing trick) maps categorical features to a fixed-size vector, handling high-cardinality efficiently.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What are interaction features?',
        options: [
          'Features that interact with users',
          'Products or combinations of two or more features',
          'Features selected by the model',
          'Features from external sources'
        ],
        correctAnswer: 1,
        explanation: 'Interaction features capture relationships between features (e.g., feature1 × feature2) to model combined effects.'
      }
    ]
  },

  // Topic 5: Data Visualization
  {
    id: 'cs407-quiz-5-1',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Visualization Fundamentals and Chart Types',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'Which chart type is best for showing the distribution of a single continuous variable?',
        options: ['Bar chart', 'Histogram', 'Scatter plot', 'Pie chart'],
        correctAnswer: 1,
        explanation: 'Histograms display frequency distributions of continuous data by grouping values into bins.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is the primary purpose of a box plot?',
        options: [
          'Show exact values',
          'Display distribution, quartiles, and outliers',
          'Compare categories',
          'Show trends over time'
        ],
        correctAnswer: 1,
        explanation: 'Box plots visualize the five-number summary (min, Q1, median, Q3, max) and identify outliers.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'When should you use a heatmap?',
        options: [
          'To show trends over time',
          'To visualize correlation matrices or 2D density data',
          'To compare categories',
          'To show distributions'
        ],
        correctAnswer: 1,
        explanation: 'Heatmaps use color intensity to represent values in a matrix, ideal for correlation and 2D patterns.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is the main advantage of violin plots over box plots?',
        options: [
          'They are simpler to understand',
          'They show the full distribution shape',
          'They take less space',
          'They work better with categorical data'
        ],
        correctAnswer: 1,
        explanation: 'Violin plots combine box plots with kernel density plots, showing the complete distribution shape.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'Which chart type should be avoided for comparing more than 5-7 categories?',
        options: ['Bar chart', 'Pie chart', 'Scatter plot', 'Line chart'],
        correctAnswer: 1,
        explanation: 'Pie charts become difficult to interpret with many slices; bar charts are more effective for multiple categories.'
      }
    ]
  },
  {
    id: 'cs407-quiz-5-2',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Matplotlib and Seaborn',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the relationship between matplotlib and seaborn?',
        options: [
          'They are competing libraries',
          'Seaborn is built on top of matplotlib',
          'Matplotlib is built on top of seaborn',
          'They are unrelated'
        ],
        correctAnswer: 1,
        explanation: 'Seaborn is a high-level interface built on matplotlib, providing enhanced statistical visualizations.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'Which seaborn function creates a grid of plots based on categorical variables?',
        options: ['pairplot', 'FacetGrid', 'jointplot', 'relplot'],
        correctAnswer: 1,
        explanation: 'FacetGrid creates a matrix of plots conditioned on one or more categorical variables.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is the purpose of plt.figure() in matplotlib?',
        options: [
          'Create a plot',
          'Create a new figure object',
          'Save a figure',
          'Display a figure'
        ],
        correctAnswer: 1,
        explanation: 'plt.figure() creates a new figure object that can contain one or more subplots.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'Which seaborn function creates a scatter plot with regression line?',
        options: ['scatterplot', 'regplot', 'lineplot', 'residplot'],
        correctAnswer: 1,
        explanation: 'regplot creates a scatter plot with a fitted regression line and confidence interval.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What does the alpha parameter control in matplotlib plots?',
        options: ['Size', 'Color', 'Transparency', 'Position'],
        correctAnswer: 2,
        explanation: 'The alpha parameter controls transparency, with 0 being fully transparent and 1 being fully opaque.'
      }
    ]
  },
  {
    id: 'cs407-quiz-5-3',
    subjectId: 'cs407',
    topicId: 'cs407-t5',
    title: 'Dashboards and Data Storytelling',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the primary goal of data storytelling?',
        options: [
          'Create complex visualizations',
          'Communicate insights effectively to stakeholders',
          'Use as many charts as possible',
          'Show all available data'
        ],
        correctAnswer: 1,
        explanation: 'Data storytelling combines data, visualizations, and narrative to effectively communicate insights and drive decisions.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'Which Python library is commonly used for creating interactive dashboards?',
        options: ['matplotlib', 'seaborn', 'Plotly Dash', 'pandas'],
        correctAnswer: 2,
        explanation: 'Plotly Dash is a framework for building interactive web-based dashboards with Python.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is the inverted pyramid structure in data storytelling?',
        options: [
          'Start with details, end with conclusions',
          'Start with key findings, then provide supporting details',
          'Use pyramid charts',
          'Organize data hierarchically'
        ],
        correctAnswer: 1,
        explanation: 'The inverted pyramid presents the most important information first, followed by supporting details.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What makes a dashboard effective?',
        options: [
          'Maximum number of charts',
          'Complex interactions',
          'Clear focus on key metrics and easy interpretation',
          'Colorful design'
        ],
        correctAnswer: 2,
        explanation: 'Effective dashboards focus on key metrics, use clear visualizations, and enable quick decision-making.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is the purpose of color in data visualization?',
        options: [
          'Make charts pretty',
          'Encode information and draw attention',
          'Fill empty space',
          'Match company branding'
        ],
        correctAnswer: 1,
        explanation: 'Color should encode meaningful information, highlight important elements, and guide viewer attention purposefully.'
      }
    ]
  },

  // Topic 6: Big Data Technologies
  {
    id: 'cs407-quiz-6-1',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'Hadoop and Distributed Storage',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What does HDFS stand for?',
        options: [
          'Hadoop Data File System',
          'Hadoop Distributed File System',
          'High-Density File System',
          'Hierarchical Data File System'
        ],
        correctAnswer: 1,
        explanation: 'HDFS (Hadoop Distributed File System) is designed for storing large files across multiple machines.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is the primary advantage of distributed computing?',
        options: [
          'Lower cost',
          'Process large datasets by dividing work across multiple nodes',
          'Simpler programming',
          'Better security'
        ],
        correctAnswer: 1,
        explanation: 'Distributed computing enables parallel processing of large datasets across multiple machines for scalability.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is MapReduce?',
        options: [
          'A database system',
          'A programming model for processing large datasets in parallel',
          'A data visualization tool',
          'A machine learning algorithm'
        ],
        correctAnswer: 1,
        explanation: 'MapReduce is a programming paradigm that divides tasks into Map (process) and Reduce (aggregate) phases.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is data replication in HDFS used for?',
        options: [
          'Increase storage capacity',
          'Fault tolerance and reliability',
          'Faster writing',
          'Data compression'
        ],
        correctAnswer: 1,
        explanation: 'HDFS replicates data blocks across multiple nodes to ensure availability if nodes fail.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is the typical block size in HDFS?',
        options: ['4 KB', '64 KB', '128 MB', '1 GB'],
        correctAnswer: 2,
        explanation: 'HDFS uses large block sizes (typically 128 MB or 256 MB) optimized for large file storage and sequential access.'
      }
    ]
  },
  {
    id: 'cs407-quiz-6-2',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'Apache Spark and Data Lakes',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is the main advantage of Apache Spark over Hadoop MapReduce?',
        options: [
          'Lower cost',
          'In-memory processing for faster computation',
          'Better security',
          'Easier installation'
        ],
        correctAnswer: 1,
        explanation: 'Spark performs in-memory processing, making it much faster than disk-based MapReduce for iterative tasks.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is an RDD in Spark?',
        options: [
          'Relational Database Driver',
          'Resilient Distributed Dataset',
          'Rapid Data Delivery',
          'Remote Data Directory'
        ],
        correctAnswer: 1,
        explanation: 'RDD (Resilient Distributed Dataset) is Spark\'s fundamental data structure for distributed computation.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is a data lake?',
        options: [
          'A traditional database',
          'A centralized repository for storing structured and unstructured data at scale',
          'A visualization tool',
          'A data cleaning service'
        ],
        correctAnswer: 1,
        explanation: 'Data lakes store vast amounts of raw data in native format until needed, unlike structured data warehouses.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is the difference between a data lake and a data warehouse?',
        options: [
          'No difference',
          'Lakes store raw data, warehouses store processed/structured data',
          'Lakes are smaller',
          'Warehouses are faster'
        ],
        correctAnswer: 1,
        explanation: 'Data lakes store raw, unprocessed data while data warehouses contain structured, processed data for specific use cases.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What does ETL stand for in data engineering?',
        options: [
          'Export, Transfer, Load',
          'Extract, Transform, Load',
          'Evaluate, Test, Launch',
          'Encode, Transmit, Log'
        ],
        correctAnswer: 1,
        explanation: 'ETL (Extract, Transform, Load) is the process of extracting data from sources, transforming it, and loading into a target system.'
      }
    ]
  },
  {
    id: 'cs407-quiz-6-3',
    subjectId: 'cs407',
    topicId: 'cs407-t6',
    title: 'Stream Processing and Big Data Workflows',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is stream processing?',
        options: [
          'Processing historical data',
          'Processing data in real-time as it arrives',
          'Downloading data streams',
          'Compressing data'
        ],
        correctAnswer: 1,
        explanation: 'Stream processing analyzes and acts on data continuously as it flows, enabling real-time insights.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'Which technology is commonly used for stream processing?',
        options: ['MySQL', 'Apache Kafka', 'Excel', 'SQLite'],
        correctAnswer: 1,
        explanation: 'Apache Kafka is a distributed streaming platform for building real-time data pipelines and applications.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is the CAP theorem in distributed systems?',
        options: [
          'A database optimization technique',
          'You can only guarantee 2 of 3: Consistency, Availability, Partition tolerance',
          'A security protocol',
          'A data compression algorithm'
        ],
        correctAnswer: 1,
        explanation: 'CAP theorem states distributed systems can only guarantee two of: Consistency, Availability, Partition tolerance.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is Apache Airflow used for?',
        options: [
          'Data visualization',
          'Workflow orchestration and scheduling',
          'Machine learning',
          'Data storage'
        ],
        correctAnswer: 1,
        explanation: 'Apache Airflow orchestrates complex data workflows and pipelines through directed acyclic graphs (DAGs).'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is horizontal scaling in big data systems?',
        options: [
          'Increasing storage vertically',
          'Adding more machines to the cluster',
          'Upgrading existing hardware',
          'Reducing data size'
        ],
        correctAnswer: 1,
        explanation: 'Horizontal scaling (scale-out) adds more nodes to the system, unlike vertical scaling which upgrades existing nodes.'
      }
    ]
  },

  // Topic 7: Ethics in Data Science
  {
    id: 'cs407-quiz-7-1',
    subjectId: 'cs407',
    topicId: 'cs407-t7',
    title: 'Privacy and Data Protection',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What does GDPR stand for?',
        options: [
          'General Data Protection Regulation',
          'Global Data Privacy Rules',
          'Government Data Processing Requirements',
          'General Database Protection Rights'
        ],
        correctAnswer: 0,
        explanation: 'GDPR is the EU regulation that governs data protection and privacy for individuals.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is personally identifiable information (PII)?',
        options: [
          'Public information',
          'Data that can identify a specific individual',
          'Encrypted data',
          'Statistical summaries'
        ],
        correctAnswer: 1,
        explanation: 'PII is any data that could potentially identify a specific individual (name, SSN, email, etc.).'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is data anonymization?',
        options: [
          'Encrypting data',
          'Removing identifying information to prevent individual identification',
          'Deleting data',
          'Backing up data'
        ],
        correctAnswer: 1,
        explanation: 'Anonymization removes or modifies PII so individuals cannot be identified from the data.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is the "right to be forgotten" under GDPR?',
        options: [
          'Right to delete your own files',
          'Right to request deletion of personal data',
          'Right to encrypted storage',
          'Right to anonymous browsing'
        ],
        correctAnswer: 1,
        explanation: 'The right to erasure allows individuals to request deletion of their personal data under certain conditions.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is differential privacy?',
        options: [
          'Different privacy levels for different users',
          'A technique that adds noise to data to protect individual privacy while preserving utility',
          'Privacy settings in software',
          'Encryption method'
        ],
        correctAnswer: 1,
        explanation: 'Differential privacy adds controlled randomness to data to prevent identification of individuals in datasets.'
      }
    ]
  },
  {
    id: 'cs407-quiz-7-2',
    subjectId: 'cs407',
    topicId: 'cs407-t7',
    title: 'Bias and Fairness in AI',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is algorithmic bias?',
        options: [
          'Preference for certain algorithms',
          'Systematic errors that create unfair outcomes for certain groups',
          'Random errors in algorithms',
          'Computational efficiency'
        ],
        correctAnswer: 1,
        explanation: 'Algorithmic bias occurs when systems produce systematically prejudiced results due to biased training data or design.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is selection bias in data collection?',
        options: [
          'Choosing the best algorithm',
          'When the sample is not representative of the population',
          'Selecting relevant features',
          'Choosing test data'
        ],
        correctAnswer: 1,
        explanation: 'Selection bias occurs when the data sample does not accurately represent the target population.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is fairness in machine learning?',
        options: [
          'Equal accuracy for all models',
          'Ensuring models do not discriminate against protected groups',
          'Fast training times',
          'High accuracy'
        ],
        correctAnswer: 1,
        explanation: 'Fairness ensures ML models treat individuals and groups equitably without discrimination.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is disparate impact?',
        options: [
          'Different model versions',
          'When a policy/model disproportionately affects a protected group',
          'Impact on model performance',
          'Data distribution differences'
        ],
        correctAnswer: 1,
        explanation: 'Disparate impact occurs when a seemingly neutral practice has a disproportionately negative effect on a protected group.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'How can you mitigate bias in training data?',
        options: [
          'Use more data',
          'Ensure diverse, representative samples and audit for bias',
          'Use complex models',
          'Remove all demographic features'
        ],
        correctAnswer: 1,
        explanation: 'Bias mitigation requires diverse data collection, regular audits, and techniques to balance representation across groups.'
      }
    ]
  },
  {
    id: 'cs407-quiz-7-3',
    subjectId: 'cs407',
    topicId: 'cs407-t7',
    title: 'Responsible AI and Ethical Frameworks',
    questions: [
      {
        id: 'q1',
        type: 'multiple_choice',
        prompt: 'What is explainable AI (XAI)?',
        options: [
          'AI that is easy to program',
          'AI systems whose decisions can be understood and interpreted by humans',
          'AI documentation',
          'AI training tutorials'
        ],
        correctAnswer: 1,
        explanation: 'XAI focuses on making AI decision-making processes transparent and interpretable to users and stakeholders.'
      },
      {
        id: 'q2',
        type: 'multiple_choice',
        prompt: 'What is the purpose of an ethics review board for AI projects?',
        options: [
          'Increase project budget',
          'Evaluate potential ethical risks and ensure responsible development',
          'Speed up development',
          'Market the AI system'
        ],
        correctAnswer: 1,
        explanation: 'Ethics review boards assess AI projects for potential harms, bias, privacy issues, and ensure ethical alignment.'
      },
      {
        id: 'q3',
        type: 'multiple_choice',
        prompt: 'What is informed consent in data collection?',
        options: [
          'Legal documentation',
          'Users knowingly agree to data collection with understanding of how it will be used',
          'Automatic consent',
          'Government approval'
        ],
        correctAnswer: 1,
        explanation: 'Informed consent requires clear communication about data collection, use, and obtaining voluntary agreement from individuals.'
      },
      {
        id: 'q4',
        type: 'multiple_choice',
        prompt: 'What is model interpretability?',
        options: [
          'Model documentation',
          'The degree to which humans can understand model predictions',
          'Model accuracy',
          'Model training time'
        ],
        correctAnswer: 1,
        explanation: 'Interpretability refers to how easily humans can understand why a model made a particular prediction or decision.'
      },
      {
        id: 'q5',
        type: 'multiple_choice',
        prompt: 'What is the dual-use dilemma in AI ethics?',
        options: [
          'Using two models',
          'Technology developed for beneficial purposes could be misused for harmful ones',
          'Dual licensing',
          'Running models on two platforms'
        ],
        correctAnswer: 1,
        explanation: 'The dual-use dilemma addresses how beneficial technologies can potentially be repurposed for harmful applications.'
      }
    ]
  }
];
