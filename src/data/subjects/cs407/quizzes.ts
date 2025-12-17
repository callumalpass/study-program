import { Quiz } from '../../../core/types';

export const cs407Quizzes: Quiz[] = [
  {
    id: 'cs407-data-collection-quiz',
    subjectId: 'cs407',
    topicId: 'cs407-t1',
    title: 'Data Collection Quiz',
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
    id: 'cs407-data-cleaning-quiz',
    subjectId: 'cs407',
    topicId: 'cs407-t2',
    title: 'Data Cleaning Quiz',
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
    id: 'cs407-eda-quiz',
    subjectId: 'cs407',
    topicId: 'cs407-t3',
    title: 'Exploratory Data Analysis Quiz',
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
  }
];
