/**
 * CS407 Topics
 *
 * Uses glob imports and frontmatter for automatic content discovery.
 */

import type { Topic } from '../../core/types';
import { buildTopicsFromGlob } from '../loader';

// Glob import all markdown content
const content = import.meta.glob('./content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

// Topic configuration (titles and IDs for quizzes/exercises)
const topicConfigs = [
  {
    number: 1,
    title: 'Data Collection and APIs',
  },
  {
    number: 1,
    title: 'Introduction to Data Collection',
  },
  {
    number: 1,
    title: 'Introduction to Data Cleaning',
  },
  {
    number: 1,
    title: 'Introduction to EDA',
  },
  {
    number: 1,
    title: 'Introduction to Feature Engineering',
  },
  {
    number: 1,
    title: 'Introduction to Data Visualization',
  },
  {
    number: 1,
    title: 'Introduction to Big Data',
  },
  {
    number: 1,
    title: 'Introduction to Data Ethics',
  },
  {
    number: 2,
    title: 'Working with Web APIs',
  },
  {
    number: 2,
    title: 'Data Cleaning',
  },
  {
    number: 2,
    title: 'Handling Missing Data',
  },
  {
    number: 2,
    title: 'Descriptive Statistics',
  },
  {
    number: 2,
    title: 'Feature Creation',
  },
  {
    number: 2,
    title: 'Matplotlib and Seaborn',
  },
  {
    number: 2,
    title: 'Hadoop Ecosystem',
  },
  {
    number: 2,
    title: 'Privacy and Data Protection',
  },
  {
    number: 3,
    title: 'Web Scraping Techniques',
  },
  {
    number: 3,
    title: 'Outlier Detection and Treatment',
  },
  {
    number: 3,
    title: 'Exploratory Data Analysis',
  },
  {
    number: 3,
    title: 'Data Distributions',
  },
  {
    number: 3,
    title: 'Feature Selection Methods',
  },
  {
    number: 3,
    title: 'Chart Types and When to Use Them',
  },
  {
    number: 3,
    title: 'Apache Spark for Data Science',
  },
  {
    number: 3,
    title: 'Bias and Fairness in Data',
  },
  {
    number: 4,
    title: 'Data Formats (JSON, XML, CSV)',
  },
  {
    number: 4,
    title: 'Data Transformation',
  },
  {
    number: 4,
    title: 'Correlation Analysis',
  },
  {
    number: 4,
    title: 'Feature Engineering',
  },
  {
    number: 4,
    title: 'Feature Extraction',
  },
  {
    number: 4,
    title: 'Interactive Visualizations (Plotly)',
  },
  {
    number: 4,
    title: 'Distributed Computing Concepts',
  },
  {
    number: 4,
    title: 'Data Governance',
  },
  {
    number: 5,
    title: 'Databases as Data Sources',
  },
  {
    number: 5,
    title: 'Data Normalization and Standardization',
  },
  {
    number: 5,
    title: 'Dimensionality Reduction (PCA)',
  },
  {
    number: 5,
    title: 'Encoding Categorical Variables',
  },
  {
    number: 5,
    title: 'Data Visualization',
  },
  {
    number: 5,
    title: 'Building Dashboards',
  },
  {
    number: 5,
    title: 'Data Lakes and Data Warehouses',
  },
  {
    number: 5,
    title: 'GDPR and Compliance',
  },
  {
    number: 6,
    title: 'Streaming Data Collection',
  },
  {
    number: 6,
    title: 'Data Validation',
  },
  {
    number: 6,
    title: 'Pattern Discovery',
  },
  {
    number: 6,
    title: 'Time Series Feature Engineering',
  },
  {
    number: 6,
    title: 'Geospatial Visualization',
  },
  {
    number: 6,
    title: 'Big Data Technologies',
  },
  {
    number: 6,
    title: 'Stream Processing (Kafka, Flink)',
  },
  {
    number: 6,
    title: 'Responsible AI Practices',
  },
  {
    number: 7,
    title: 'Data Quality Assessment',
    quizIds: ['cs407-quiz-1-1', 'cs407-quiz-1-2', 'cs407-quiz-1-3'],
  },
  {
    number: 7,
    title: 'Data Cleaning with Pandas',
    quizIds: ['cs407-quiz-2-1', 'cs407-quiz-2-2', 'cs407-quiz-2-3'],
  },
  {
    number: 7,
    title: 'Hypothesis Testing',
    quizIds: ['cs407-quiz-3-1', 'cs407-quiz-3-2', 'cs407-quiz-3-3'],
  },
  {
    number: 7,
    title: 'Feature Scaling and Normalization',
    quizIds: ['cs407-quiz-4-1', 'cs407-quiz-4-2', 'cs407-quiz-4-3'],
  },
  {
    number: 7,
    title: 'Data Storytelling',
    quizIds: ['cs407-quiz-5-1', 'cs407-quiz-5-2', 'cs407-quiz-5-3'],
  },
  {
    number: 7,
    title: 'Cloud Big Data Services',
    quizIds: ['cs407-quiz-6-1', 'cs407-quiz-6-2', 'cs407-quiz-6-3'],
  },
  {
    number: 7,
    title: 'Ethics in Data Science',
  },
  {
    number: 7,
    title: 'Ethical Frameworks for Data Science',
    quizIds: ['cs407-quiz-7-1', 'cs407-quiz-7-2', 'cs407-quiz-7-3'],
  },
];

export const cs407Topics: Topic[] = buildTopicsFromGlob('cs407', content, topicConfigs);
