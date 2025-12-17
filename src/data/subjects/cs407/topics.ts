import type { Topic } from '../../../core/types';

import topic1_1 from '../../../content/subjects/cs407/topic-1/01-data-sources.md?raw';
import topic1_2 from '../../../content/subjects/cs407/topic-1/02-web-scraping.md?raw';
import topic1_3 from '../../../content/subjects/cs407/topic-1/03-apis.md?raw';
import topic1_4 from '../../../content/subjects/cs407/topic-1/04-databases.md?raw';
import topic1_5 from '../../../content/subjects/cs407/topic-1/05-data-formats.md?raw';
import topic1_6 from '../../../content/subjects/cs407/topic-1/06-data-quality.md?raw';
import topic1_7 from '../../../content/subjects/cs407/topic-1/07-data-governance.md?raw';

import topic2_1 from '../../../content/subjects/cs407/topic-2/01-missing-data.md?raw';
import topic2_2 from '../../../content/subjects/cs407/topic-2/02-outliers.md?raw';
import topic2_3 from '../../../content/subjects/cs407/topic-2/03-data-transformation.md?raw';
import topic2_4 from '../../../content/subjects/cs407/topic-2/04-normalization.md?raw';
import topic2_5 from '../../../content/subjects/cs407/topic-2/05-encoding.md?raw';
import topic2_6 from '../../../content/subjects/cs407/topic-2/06-data-validation.md?raw';
import topic2_7 from '../../../content/subjects/cs407/topic-2/07-data-pipelines.md?raw';

import topic3_1 from '../../../content/subjects/cs407/topic-3/01-descriptive-statistics.md?raw';
import topic3_2 from '../../../content/subjects/cs407/topic-3/02-distributions.md?raw';
import topic3_3 from '../../../content/subjects/cs407/topic-3/03-correlation.md?raw';
import topic3_4 from '../../../content/subjects/cs407/topic-3/04-hypothesis-testing.md?raw';
import topic3_5 from '../../../content/subjects/cs407/topic-3/05-statistical-inference.md?raw';
import topic3_6 from '../../../content/subjects/cs407/topic-3/06-eda-process.md?raw';
import topic3_7 from '../../../content/subjects/cs407/topic-3/07-eda-tools.md?raw';

import topic4_1 from '../../../content/subjects/cs407/topic-4/01-feature-creation.md?raw';
import topic4_2 from '../../../content/subjects/cs407/topic-4/02-feature-selection.md?raw';
import topic4_3 from '../../../content/subjects/cs407/topic-4/03-feature-extraction.md?raw';
import topic4_4 from '../../../content/subjects/cs407/topic-4/04-dimensionality-reduction.md?raw';
import topic4_5 from '../../../content/subjects/cs407/topic-4/05-feature-scaling.md?raw';
import topic4_6 from '../../../content/subjects/cs407/topic-4/06-encoding-features.md?raw';
import topic4_7 from '../../../content/subjects/cs407/topic-4/07-automated-fe.md?raw';

import topic5_1 from '../../../content/subjects/cs407/topic-5/01-visualization-principles.md?raw';
import topic5_2 from '../../../content/subjects/cs407/topic-5/02-matplotlib-seaborn.md?raw';
import topic5_3 from '../../../content/subjects/cs407/topic-5/03-interactive-viz.md?raw';
import topic5_4 from '../../../content/subjects/cs407/topic-5/04-dashboards.md?raw';
import topic5_5 from '../../../content/subjects/cs407/topic-5/05-storytelling.md?raw';
import topic5_6 from '../../../content/subjects/cs407/topic-5/06-geospatial-viz.md?raw';
import topic5_7 from '../../../content/subjects/cs407/topic-5/07-advanced-viz.md?raw';

import topic6_1 from '../../../content/subjects/cs407/topic-6/01-big-data-intro.md?raw';
import topic6_2 from '../../../content/subjects/cs407/topic-6/02-hadoop.md?raw';
import topic6_3 from '../../../content/subjects/cs407/topic-6/03-spark-data.md?raw';
import topic6_4 from '../../../content/subjects/cs407/topic-6/04-data-lakes.md?raw';
import topic6_5 from '../../../content/subjects/cs407/topic-6/05-data-warehouses.md?raw';
import topic6_6 from '../../../content/subjects/cs407/topic-6/06-etl.md?raw';
import topic6_7 from '../../../content/subjects/cs407/topic-6/07-real-time-analytics.md?raw';

import topic7_1 from '../../../content/subjects/cs407/topic-7/01-data-ethics.md?raw';
import topic7_2 from '../../../content/subjects/cs407/topic-7/02-privacy.md?raw';
import topic7_3 from '../../../content/subjects/cs407/topic-7/03-bias-fairness.md?raw';
import topic7_4 from '../../../content/subjects/cs407/topic-7/04-transparency.md?raw';
import topic7_5 from '../../../content/subjects/cs407/topic-7/05-regulations.md?raw';
import topic7_6 from '../../../content/subjects/cs407/topic-7/06-responsible-ai.md?raw';
import topic7_7 from '../../../content/subjects/cs407/topic-7/07-case-studies.md?raw';

export const cs407Topics: Topic[] = [
  {
    id: 'cs407-topic-1',
    title: 'Data Collection and APIs',
    content: 'Data collection methods, web APIs, web scraping, data formats, and data quality.',
    subtopics: [
      { id: 'cs407-topic-1-1', slug: 'data-collection-intro', order: 1, title: 'Introduction to Data Collection', content: topic1_1 },
      { id: 'cs407-topic-1-2', slug: 'web-apis', order: 2, title: 'Working with Web APIs', content: topic1_2 },
      { id: 'cs407-topic-1-3', slug: 'web-scraping', order: 3, title: 'Web Scraping Techniques', content: topic1_3 },
      { id: 'cs407-topic-1-4', slug: 'data-formats', order: 4, title: 'Data Formats (JSON, XML, CSV)', content: topic1_4 },
      { id: 'cs407-topic-1-5', slug: 'databases-data-sources', order: 5, title: 'Databases as Data Sources', content: topic1_5 },
      { id: 'cs407-topic-1-6', slug: 'streaming-data', order: 6, title: 'Streaming Data Collection', content: topic1_6 },
      { id: 'cs407-topic-1-7', slug: 'data-quality', order: 7, title: 'Data Quality Assessment', content: topic1_7 }
    ],
    quizIds: ['cs407-quiz-1-1', 'cs407-quiz-1-2', 'cs407-quiz-1-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs407-t1-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs407-topic-2',
    title: 'Data Cleaning',
    content: 'Data cleaning techniques, handling missing data, outlier detection, and data transformation.',
    subtopics: [
      { id: 'cs407-topic-2-1', slug: 'data-cleaning-intro', order: 1, title: 'Introduction to Data Cleaning', content: topic2_1 },
      { id: 'cs407-topic-2-2', slug: 'missing-data', order: 2, title: 'Handling Missing Data', content: topic2_2 },
      { id: 'cs407-topic-2-3', slug: 'outlier-detection', order: 3, title: 'Outlier Detection and Treatment', content: topic2_3 },
      { id: 'cs407-topic-2-4', slug: 'data-transformation', order: 4, title: 'Data Transformation', content: topic2_4 },
      { id: 'cs407-topic-2-5', slug: 'data-normalization', order: 5, title: 'Data Normalization and Standardization', content: topic2_5 },
      { id: 'cs407-topic-2-6', slug: 'data-validation', order: 6, title: 'Data Validation', content: topic2_6 },
      { id: 'cs407-topic-2-7', slug: 'pandas-cleaning', order: 7, title: 'Data Cleaning with Pandas', content: topic2_7 }
    ],
    quizIds: ['cs407-quiz-2-1', 'cs407-quiz-2-2', 'cs407-quiz-2-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs407-t2-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs407-topic-3',
    title: 'Exploratory Data Analysis',
    content: 'Descriptive statistics, data distributions, correlation analysis, and pattern discovery.',
    subtopics: [
      { id: 'cs407-topic-3-1', slug: 'eda-intro', order: 1, title: 'Introduction to EDA', content: topic3_1 },
      { id: 'cs407-topic-3-2', slug: 'descriptive-statistics', order: 2, title: 'Descriptive Statistics', content: topic3_2 },
      { id: 'cs407-topic-3-3', slug: 'data-distributions', order: 3, title: 'Data Distributions', content: topic3_3 },
      { id: 'cs407-topic-3-4', slug: 'correlation-analysis', order: 4, title: 'Correlation Analysis', content: topic3_4 },
      { id: 'cs407-topic-3-5', slug: 'dimensionality-reduction', order: 5, title: 'Dimensionality Reduction (PCA)', content: topic3_5 },
      { id: 'cs407-topic-3-6', slug: 'pattern-discovery', order: 6, title: 'Pattern Discovery', content: topic3_6 },
      { id: 'cs407-topic-3-7', slug: 'hypothesis-testing', order: 7, title: 'Hypothesis Testing', content: topic3_7 }
    ],
    quizIds: ['cs407-quiz-3-1', 'cs407-quiz-3-2', 'cs407-quiz-3-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs407-t3-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs407-topic-4',
    title: 'Feature Engineering',
    content: 'Feature creation, selection, extraction, encoding categorical variables, and feature scaling.',
    subtopics: [
      { id: 'cs407-topic-4-1', slug: 'feature-engineering-intro', order: 1, title: 'Introduction to Feature Engineering', content: topic4_1 },
      { id: 'cs407-topic-4-2', slug: 'feature-creation', order: 2, title: 'Feature Creation', content: topic4_2 },
      { id: 'cs407-topic-4-3', slug: 'feature-selection', order: 3, title: 'Feature Selection Methods', content: topic4_3 },
      { id: 'cs407-topic-4-4', slug: 'feature-extraction', order: 4, title: 'Feature Extraction', content: topic4_4 },
      { id: 'cs407-topic-4-5', slug: 'encoding-categorical', order: 5, title: 'Encoding Categorical Variables', content: topic4_5 },
      { id: 'cs407-topic-4-6', slug: 'time-series-features', order: 6, title: 'Time Series Feature Engineering', content: topic4_6 },
      { id: 'cs407-topic-4-7', slug: 'feature-scaling', order: 7, title: 'Feature Scaling and Normalization', content: topic4_7 }
    ],
    quizIds: ['cs407-quiz-4-1', 'cs407-quiz-4-2', 'cs407-quiz-4-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs407-t4-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs407-topic-5',
    title: 'Data Visualization',
    content: 'Visualization principles, matplotlib, seaborn, chart types, and interactive dashboards.',
    subtopics: [
      { id: 'cs407-topic-5-1', slug: 'data-visualization-intro', order: 1, title: 'Introduction to Data Visualization', content: topic5_1 },
      { id: 'cs407-topic-5-2', slug: 'matplotlib-seaborn', order: 2, title: 'Matplotlib and Seaborn', content: topic5_2 },
      { id: 'cs407-topic-5-3', slug: 'chart-types', order: 3, title: 'Chart Types and When to Use Them', content: topic5_3 },
      { id: 'cs407-topic-5-4', slug: 'interactive-visualization', order: 4, title: 'Interactive Visualizations (Plotly)', content: topic5_4 },
      { id: 'cs407-topic-5-5', slug: 'dashboards', order: 5, title: 'Building Dashboards', content: topic5_5 },
      { id: 'cs407-topic-5-6', slug: 'geospatial-visualization', order: 6, title: 'Geospatial Visualization', content: topic5_6 },
      { id: 'cs407-topic-5-7', slug: 'storytelling-data', order: 7, title: 'Data Storytelling', content: topic5_7 }
    ],
    quizIds: ['cs407-quiz-5-1', 'cs407-quiz-5-2', 'cs407-quiz-5-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs407-t5-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs407-topic-6',
    title: 'Big Data Technologies',
    content: 'Big data concepts, Hadoop, Spark, distributed computing, and data lakes.',
    subtopics: [
      { id: 'cs407-topic-6-1', slug: 'big-data-intro', order: 1, title: 'Introduction to Big Data', content: topic6_1 },
      { id: 'cs407-topic-6-2', slug: 'hadoop-ecosystem', order: 2, title: 'Hadoop Ecosystem', content: topic6_2 },
      { id: 'cs407-topic-6-3', slug: 'apache-spark', order: 3, title: 'Apache Spark for Data Science', content: topic6_3 },
      { id: 'cs407-topic-6-4', slug: 'distributed-computing', order: 4, title: 'Distributed Computing Concepts', content: topic6_4 },
      { id: 'cs407-topic-6-5', slug: 'data-lakes', order: 5, title: 'Data Lakes and Data Warehouses', content: topic6_5 },
      { id: 'cs407-topic-6-6', slug: 'stream-processing', order: 6, title: 'Stream Processing (Kafka, Flink)', content: topic6_6 },
      { id: 'cs407-topic-6-7', slug: 'cloud-big-data', order: 7, title: 'Cloud Big Data Services', content: topic6_7 }
    ],
    quizIds: ['cs407-quiz-6-1', 'cs407-quiz-6-2', 'cs407-quiz-6-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs407-t6-ex${String(i + 1).padStart(2, '0')}`)
  },
  {
    id: 'cs407-topic-7',
    title: 'Ethics in Data Science',
    content: 'Data ethics, privacy, bias and fairness, data governance, and responsible AI.',
    subtopics: [
      { id: 'cs407-topic-7-1', slug: 'data-ethics-intro', order: 1, title: 'Introduction to Data Ethics', content: topic7_1 },
      { id: 'cs407-topic-7-2', slug: 'privacy-protection', order: 2, title: 'Privacy and Data Protection', content: topic7_2 },
      { id: 'cs407-topic-7-3', slug: 'bias-fairness', order: 3, title: 'Bias and Fairness in Data', content: topic7_3 },
      { id: 'cs407-topic-7-4', slug: 'data-governance', order: 4, title: 'Data Governance', content: topic7_4 },
      { id: 'cs407-topic-7-5', slug: 'gdpr-compliance', order: 5, title: 'GDPR and Compliance', content: topic7_5 },
      { id: 'cs407-topic-7-6', slug: 'responsible-ai', order: 6, title: 'Responsible AI Practices', content: topic7_6 },
      { id: 'cs407-topic-7-7', slug: 'ethical-frameworks', order: 7, title: 'Ethical Frameworks for Data Science', content: topic7_7 }
    ],
    quizIds: ['cs407-quiz-7-1', 'cs407-quiz-7-2', 'cs407-quiz-7-3'],
    exerciseIds: Array.from({ length: 16 }, (_, i) => `cs407-t7-ex${String(i + 1).padStart(2, '0')}`)
  }
];
